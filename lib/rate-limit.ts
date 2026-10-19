import "server-only";

/**
 * Fixed-window rate limiter. The default store is in-memory (fine for a single PM2
 * instance). For multiple instances, implement `RateLimitStore` on Redis/Upstash
 * (INCR + EXPIRE) and pass it to `createRateLimiter`.
 */
export interface RateLimitStore {
  /** Increment the counter for `key`, creating it with `windowMs` TTL. Returns the new count. */
  increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }>;
}

class MemoryStore implements RateLimitStore {
  private hits = new Map<string, { count: number; resetAt: number }>();

  async increment(key: string, windowMs: number) {
    const now = Date.now();
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      const fresh = { count: 1, resetAt: now + windowMs };
      this.hits.set(key, fresh);
      if (this.hits.size > 10_000) this.sweep(now);
      return fresh;
    }
    entry.count += 1;
    return entry;
  }

  private sweep(now: number) {
    for (const [k, v] of this.hits) if (v.resetAt <= now) this.hits.delete(k);
  }
}

const sharedStore = new MemoryStore();

export function createRateLimiter({
  limit,
  windowMs,
  prefix,
  store = sharedStore,
}: {
  limit: number;
  windowMs: number;
  prefix: string;
  store?: RateLimitStore;
}) {
  return async (identifier: string) => {
    const { count, resetAt } = await store.increment(`${prefix}:${identifier}`, windowMs);
    return { ok: count <= limit, remaining: Math.max(0, limit - count), resetAt };
  };
}

export const waitlistLimiter = createRateLimiter({
  prefix: "waitlist",
  limit: 5,
  windowMs: 60_000,
});
export const contactLimiter = createRateLimiter({ prefix: "contact", limit: 3, windowMs: 60_000 });
