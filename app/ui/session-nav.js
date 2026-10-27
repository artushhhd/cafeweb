import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/dal";
import { localize } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";

export async function SessionNav() {
  const t = await getDictionary();
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Link href={localize(t.locale, "/login")} className="nav-link">
          {t.nav.login}
        </Link>
        <Link href={localize(t.locale, "/register")} className="btn btn-primary">
          {t.nav.register}
        </Link>
      </>
    );
  }

  return (
    <>
      {user.role === "admin" ? (
        <Link href={localize(t.locale, "/admin")} className="nav-link">
          {t.nav.admin}
        </Link>
      ) : null}
      <Link href={localize(t.locale, "/account")} className="nav-link">
        {user.name}
      </Link>
      <form action={logoutAction}>
        <input type="hidden" name="locale" value={t.locale} />
        <button type="submit" className="btn btn-ghost">
          {t.nav.logout}
        </button>
      </form>
    </>
  );
}
