import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { mainNav, waitlistHref } from "@/lib/nav";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const t = await getTranslations("nav");
  const items = mainNav.map((item) => ({ href: item.href, label: t(item.key) }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/75 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(1px))]:bg-bg">
      <nav aria-label={t("primary")} className="container-page flex h-16 items-center gap-2">
        <Link href="/" className="me-auto inline-flex min-h-11 items-center gap-2 rounded-lg lg:me-4" aria-label={t("home")}>
          <LogoMark className="size-7" />
          <span className="font-display text-lg font-bold tracking-tight">Reelless</span>
        </Link>
        <NavLinks items={items} />
        <div className="flex items-center gap-0.5 lg:ms-auto">
          <LanguageSwitcher label={t("changeLanguage")} />
          <ThemeToggle label={t("toggleTheme")} />
          <span className="ms-2 hidden sm:inline-flex">
            <Magnetic>
              <ButtonLink href={waitlistHref} size="md">
                {t("cta")}
              </ButtonLink>
            </Magnetic>
          </span>
          <MobileMenu
            items={items}
            labels={{
              open: t("openMenu"),
              close: t("closeMenu"),
              title: t("menu"),
              cta: t("cta"),
              theme: {
                legend: t("theme"),
                system: t("themeSystem"),
                light: t("themeLight"),
                dark: t("themeDark"),
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
}
