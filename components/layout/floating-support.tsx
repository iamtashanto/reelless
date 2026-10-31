import { HeartHandIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

export function FloatingSupport() {
  return (
    <aside
      aria-label="Support the creator"
      className="fixed bottom-5 end-5 z-50 transition-transform duration-200 hover:scale-105"
    >
      <a
        href={siteConfig.supportKoriUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-accent/40 bg-surface/90 px-4 py-2.5 text-xs font-semibold text-fg shadow-lg backdrop-blur-md transition-all hover:border-accent hover:bg-surface hover:shadow-xl sm:text-sm"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent-text group-hover:scale-110 transition-transform">
          <HeartHandIcon className="size-3.5" />
        </span>
        <span className="flex items-center gap-1">
          <span>Support Kori</span>
          <span className="text-muted text-[11px] font-normal hidden sm:inline">· সাপোর্ট করুন</span>
        </span>
      </a>
    </aside>
  );
}

