import Link from "next/link";
import { Suspense } from "react";
import { logoutAction } from "@/app/actions/auth";
import { requireUser } from "@/lib/dal";
import { getDictionary } from "@/lib/locale";
import { localize } from "@/lib/i18n";

export async function generateMetadata() {
  const t = await getDictionary();

  return { title: t.account.title };
}

export default async function AccountPage() {
  const t = await getDictionary();

  return (
    <Suspense fallback={<p className="py-10 text-muted">{t.nav.profilePending}</p>}>
      <AccountView />
    </Suspense>
  );
}

async function AccountView() {
  const t = await getDictionary();
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-8 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t.account.title}</h1>
        <p className="text-muted">{t.account.note}</p>
      </header>

      <dl className="card grid gap-5 p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted">{t.account.nameLabel}</dt>
          <dd className="font-medium">{user.name}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted">{t.account.emailLabel}</dt>
          <dd className="font-medium">{user.email}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted">{t.account.roleLabel}</dt>
          <dd className="font-medium">{t.account.roles[user.role] ?? user.role}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted">{t.account.idLabel}</dt>
          <dd className="font-medium">#{user.id}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        {user.role === "admin" ? (
          <Link href={localize(t.locale, "/admin")} className="btn btn-primary">
            {t.account.manageCta}
          </Link>
        ) : null}
        <Link href={localize(t.locale, "/shop")} className="btn btn-ghost">
          {t.account.catalogCta}
        </Link>
        <form action={logoutAction}>
          <input type="hidden" name="locale" value={t.locale} />
          <button type="submit" className="btn btn-ghost">
            {t.account.logoutCta}
          </button>
        </form>
      </div>
    </div>
  );
}
