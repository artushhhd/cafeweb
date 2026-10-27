"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import { Field } from "@/app/ui/field";
import { dictionary } from "@/lib/i18n";

const initialState = {};

export function RegisterForm({ locale }) {
  const t = dictionary(locale);
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      {state.error ? <p className="form-error">{state.error}</p> : null}

      <Field
        name="name"
        label={t.auth.name}
        autoComplete="name"
        error={state.fieldErrors?.name}
        required
      />
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
        autoComplete="new-password"
        error={state.fieldErrors?.password}
        required
      />
      <Field
        name="passwordRepeat"
        label={t.auth.passwordRepeat}
        type="password"
        autoComplete="new-password"
        error={state.fieldErrors?.passwordRepeat}
        required
      />

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? t.auth.pendingRegister : t.auth.submitRegister}
      </button>
    </form>
  );
}
