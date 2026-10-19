import { CheckIcon } from "@/components/icons";

/** Inline, polite status message with a short CSS fade-up (`.fade-up` in globals.css). */
export function Toast({
  message,
  tone = "success",
}: {
  message: string | null;
  tone?: "success" | "error";
}) {
  return (
    <div aria-live="polite" role="status" className="min-h-0">
      {message ? (
        <div
          key={message}
          className={
            tone === "success"
              ? "fade-up border-calm/40 bg-calm-soft text-fg mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm"
              : "fade-up border-accent/40 bg-accent-soft text-fg mt-4 rounded-xl border p-4 text-sm"
          }
        >
          {tone === "success" ? (
            <CheckIcon className="text-calm-text mt-0.5 size-4 shrink-0" />
          ) : null}
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}
