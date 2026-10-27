import { redirect } from "next/navigation";
import { localize } from "./i18n";
import { localeCode } from "./locale";
import { getSessionUser } from "./sessions";

export async function getCurrentUser() {
  "use cache: private";
  return getSessionUser();
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(localize(await localeCode(), "/login"));
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") {
    redirect(localize(await localeCode(), "/account"));
  }
  return user;
}

export async function requireAdminSession() {
  const user = await getSessionUser();
  return user && user.role === "admin" ? user : null;
}
