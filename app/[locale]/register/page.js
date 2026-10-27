import Link from "next/link";
import { RegisterForm } from "@/app/ui/register-form";
import { getDictionary } from "@/lib/locale";
import { localize } from "@/lib/i18n";

export async function generateMetadata() {
  const t = await getDictionary();

  return { title: t.nav.register };
}

export default async function RegisterPage() {
  const t = await getDictionary();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t.auth.registerHeading}
        </h1>
        <p className="text-sm text-muted">{t.auth.registerNote}</p>
      </header>

      <div className="card p-6">
        <RegisterForm locale={t.locale} />
      </div>

      <p className="text-sm text-muted">
        {t.auth.hasAccount}{" "}
        <Link href={localize(t.locale, "/login")} className="text-brand">
          {t.auth.loginLink}
        </Link>
      </p>
    </div>
  );
}
