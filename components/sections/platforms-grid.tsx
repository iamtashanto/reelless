import { getTranslations } from "next-intl/server";
import { BrowserIcon, MonitorIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { platforms } from "@/lib/platforms";

export async function PlatformsGrid() {
  const t = await getTranslations("platformData");
  const common = await getTranslations("common");
  const home = await getTranslations("home.platforms");
  const browsers = (await getTranslations()).raw("browsers") as string[];

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map(({ id, beta, Icon, landing }) => {
          const blocks = (t.raw(`${id}.blocks`) as string[]).slice(0, 3);
          const body = (
            <>
              <div className="flex items-center gap-3">
                <span className="bg-accent-soft text-accent-text grid size-11 place-items-center rounded-xl">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-sans text-lg font-semibold tracking-normal">
                  {t(`${id}.name`)}
                </h3>
                {beta ? (
                  <Badge tone="outline" className="ms-auto">
                    {common("beta")}
                  </Badge>
                ) : null}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {blocks.map((b) => (
                  <li key={b} className="bg-surface-2 text-muted rounded-full px-2.5 py-1 text-xs">
                    {b}
                  </li>
                ))}
              </ul>
            </>
          );
          return (
            <li key={id}>
              {landing ? (
                <Link
                  href={landing}
                  className="border-border bg-surface shadow-card hover:border-border-strong block h-full rounded-2xl border p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5"
                >
                  {body}
                </Link>
              ) : (
                <div className="border-border bg-surface shadow-card h-full rounded-2xl border p-5">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="border-border bg-surface shadow-card mt-3 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center">
        <span className="bg-calm-soft text-calm-text grid size-11 shrink-0 place-items-center rounded-xl">
          <BrowserIcon className="size-5" />
        </span>
        <div className="sm:me-auto">
          <h3 className="font-sans text-lg font-semibold tracking-normal">
            {home("browsersTitle")}
          </h3>
          <p className="text-muted text-sm">{home("browsersBody")}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {browsers.map((b) => (
            <li key={b} className="bg-surface-2 text-muted rounded-full px-2.5 py-1 text-xs">
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-border bg-surface shadow-card mt-3 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center">
        <span className="bg-accent-soft text-accent-text grid size-11 shrink-0 place-items-center rounded-xl">
          <MonitorIcon className="size-5" />
        </span>
        <div>
          <h3 className="font-sans text-lg font-semibold tracking-normal">{home("chromeTitle")}</h3>
          <p className="text-muted text-sm">{home("chromeBody")}</p>
        </div>
      </div>
    </>
  );
}
