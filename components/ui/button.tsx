import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out-soft disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_6px_24px_-8px_var(--accent)] hover:shadow-[0_10px_32px_-8px_var(--accent)] hover:brightness-105",
  secondary: "border border-border-strong bg-surface text-fg hover:border-fg/40 hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-[0.95rem]",
  lg: "px-6 text-base sm:px-7 min-h-12",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  // In-page anchors don't need locale-aware routing.
  if (typeof href === "string" && href.startsWith("#")) {
    const { prefetch: _prefetch, locale: _locale, ...rest } = props;
    void _prefetch;
    void _locale;
    return (
      <a
        href={href}
        className={buttonClasses(variant, size, className)}
        {...(rest as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={buttonClasses(variant, size, className)} {...props} />;
}
