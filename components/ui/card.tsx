import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" | "li" | "section" }) {
  return (
    <Tag
      className={cn("border-border bg-surface shadow-card rounded-2xl border p-6", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
