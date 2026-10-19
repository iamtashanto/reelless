import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" | "li" | "section" }) {
  return (
    <Tag
      className={cn("rounded-2xl border border-border bg-surface p-6 shadow-card", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
