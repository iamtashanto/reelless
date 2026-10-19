import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  band = false,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  band?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 md:py-28", band && "bg-bg-elev", className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent-text",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "start",
  as: Tag = "h2",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        "mb-12 md:mb-16",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
        {title}
      </Tag>
      {subtitle ? <p className="mt-5 text-lead text-muted">{subtitle}</p> : null}
    </div>
  );
}
