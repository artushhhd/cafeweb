"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import { Field } from "@/app/ui/field";
import { dictionary } from "@/lib/i18n";

const initialState = {};

export function LoginForm({ locale }) {
  const t = dictionary(locale);
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      {state.error ? <p className="form-error">{state.error}</p> : null}

      <Field
        name="email"
        label={t.auth.email}
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email}
        required
      />
      <Field
        name="password"
        label={t.auth.password}
        type="password"
        autoComplete="current-password"
        error={state.fieldErrors?.password}
        required
      />

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? t.auth.pendingLogin : t.auth.submitLogin}
      </button>
    </form>
  );
}
