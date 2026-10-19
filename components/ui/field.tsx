import { cn } from "@/lib/utils";

export const inputClasses =
  "block w-full min-h-12 rounded-xl border border-border-strong bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/80 transition-colors focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-accent-text";

export function Label({ htmlFor, children, className }: { htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-2 block text-sm font-medium", className)}>
      {children}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} className="mt-2 min-h-5 text-sm text-accent-text" aria-live="polite">
      {message ?? ""}
    </p>
  );
}

export function Input(props: React.ComponentProps<"input">) {
  return <input {...props} className={cn(inputClasses, props.className)} />;
}

export function Textarea(props: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(inputClasses, "min-h-36 resize-y", props.className)} />;
}

export function Select(props: React.ComponentProps<"select">) {
  return <select {...props} className={cn(inputClasses, "appearance-none pe-10", props.className)} />;
}

/** Visually hidden honeypot field — real people never see or fill it. */
export function Honeypot({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="absolute -start-[10000px] h-px w-px overflow-hidden">
      <label htmlFor="website">{label}</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
