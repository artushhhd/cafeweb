"use client";

import { useActionState } from "react";
import { Field, TextAreaField } from "@/app/ui/field";
import { dictionary } from "@/lib/i18n";

const initialState = {};

export function ProductForm({ product, action, submitLabel, formId, locale }) {
  const t = dictionary(locale).admin;
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      {state.error ? <p className="form-error">{state.error}</p> : null}

      <Field
        name="name"
        id={`${formId}-name`}
        label={t.nameLabel}
        defaultValue={product?.name}
        error={state.fieldErrors?.name}
        required
      />
      <Field
        name="name_en"
        id={`${formId}-name-en`}
        label={t.nameEnLabel}
        defaultValue={product?.name_en ?? ""}
        error={state.fieldErrors?.name_en}
      />
      <TextAreaField
        name="description"
        id={`${formId}-description`}
        label={t.descriptionLabel}
        defaultValue={product?.description}
        error={state.fieldErrors?.description}
        required
      />
      <TextAreaField
        name="description_en"
        id={`${formId}-description-en`}
        label={t.descriptionEnLabel}
        defaultValue={product?.description_en ?? ""}
        error={state.fieldErrors?.description_en}
      />
      <Field
        name="category"
        id={`${formId}-category`}
        label={t.categoryLabel}
        list="shop-categories"
        defaultValue={product?.category}
        error={state.fieldErrors?.category}
        required
      />
      <Field
        name="category_en"
        id={`${formId}-category-en`}
        label={t.categoryEnLabel}
        defaultValue={product?.category_en ?? ""}
        error={state.fieldErrors?.category_en}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="price"
          id={`${formId}-price`}
          label={t.priceLabel}
          type="number"
          min="0"
          step="1"
          defaultValue={product?.price}
          error={state.fieldErrors?.price}
          required
        />
        <Field
          name="stock"
          id={`${formId}-stock`}
          label={t.stockLabel}
          type="number"
          min="0"
          step="1"
          defaultValue={product?.stock}
          error={state.fieldErrors?.stock}
          required
        />
      </div>

      <Field
        name="image"
        id={`${formId}-image`}
        label={t.imageLabel}
        placeholder="/products/coffee-irgacheffe.jpg"
        defaultValue={product?.image ?? ""}
        error={state.fieldErrors?.image}
      />

      <Field
        name="url"
        id={`${formId}-url`}
        label={t.urlLabel}
        type="url"
        placeholder="https://shop-example.com/coffee"
        defaultValue={product?.url ?? ""}
        error={state.fieldErrors?.url}
      />

      <button type="submit" className="btn btn-primary self-start" disabled={isPending}>
        {isPending ? t.saving : submitLabel}
      </button>
    </form>
  );
}
