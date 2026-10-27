"use server";

import { redirect } from "next/navigation";
import { formLocale, parseLogin, parseRegistration } from "@/lib/forms";
import { dictionary, localize } from "@/lib/i18n";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { endSession, startSession } from "@/lib/sessions";
import { createUser, findUserByEmail, isEmailTaken } from "@/lib/users";

export async function registerAction(state, formData) {
  const locale = formLocale(formData);
  const parsed = parseRegistration(formData, locale);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  const { name, email, password } = parsed.data;
  const takenMessage = dictionary(locale).auth.emailTaken;

  if (isEmailTaken(email)) {
    return { fieldErrors: { email: takenMessage } };
  }

  const user = createUser({ name, email, passwordHash: hashPassword(password) });
  if (!user) {
    return { fieldErrors: { email: takenMessage } };
  }

  await startSession(user.id);
  redirect(localize(locale, "/account"));
}

export async function loginAction(state, formData) {
  const locale = formLocale(formData);
  const parsed = parseLogin(formData, locale);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  const { email, password } = parsed.data;
  const user = findUserByEmail(email);

  if (!user || !verifyPassword(password, user.password_hash)) {
    return { error: dictionary(locale).auth.badCredentials };
  }

  await startSession(user.id);
  redirect(localize(locale, "/account"));
}

export async function logoutAction(formData) {
  await endSession();
  redirect(localize(formLocale(formData), "/"));
}
