import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "@/lib/locale";
import { localize, localized } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";
import { LanguageSwitcher } from "@/app/ui/language-switcher";
import { SessionNav } from "@/app/ui/session-nav";

export async function Header() {
  const t = await getDictionary();
  const settings = await getSettings();
  const shopName = localized(settings, "shop_name", t.locale);

  return (
    <header className="site-header">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        <Link href={localize(t.locale, "/")} className="brand-link">
          {shopName}
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1">
          <Link href={localize(t.locale, "/")} className="nav-link">
            {t.nav.home}
          </Link>
          <Link href={localize(t.locale, "/shop")} className="nav-link">
            {t.nav.shop}
          </Link>
          <LanguageSwitcher locale={t.locale} />
          <Suspense fallback={<span className="nav-link">{t.nav.profilePending}</span>}>
            <SessionNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
