import { localized } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";
import { getSettings } from "@/lib/settings";

export async function Footer() {
  const t = await getDictionary();
  const settings = await getSettings();

  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted">
        <p className="font-medium">{localized(settings, "shop_name", t.locale)}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span>{settings.phone}</span>
          <span>{localized(settings, "address", t.locale)}</span>
          <span>{localized(settings, "working_hours", t.locale)}</span>
        </div>
      </div>
    </footer>
  );
}
