"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/dal";
import { formLocale, parseProduct, parseProductId } from "@/lib/forms";
import { dictionary, localize } from "@/lib/i18n";
import { deleteProduct, insertProduct, updateProduct } from "@/lib/products";

export async function saveProductAction(state, formData) {
  const locale = formLocale(formData);
  const admin = await requireAdminSession();
  if (!admin) {
    return { error: dictionary(locale).admin.adminOnly };
  }

  const parsed = parseProduct(formData, locale);
  if (!parsed.ok) {
    return { fieldErrors: parsed.fieldErrors };
  }

  if (parsed.id === null) {
    insertProduct(parsed.data);
  } else {
    const updated = updateProduct(parsed.id, parsed.data);
    if (!updated) {
      return { error: dictionary(locale).admin.productGone };
    }
  }

  updateTag("products");
  redirect(localize(locale, "/admin"));
}

export async function removeProductAction(formData) {
  const locale = formLocale(formData);
  const admin = await requireAdminSession();
  if (!admin) {
    return { error: dictionary(locale).admin.adminOnly };
  }

  const id = parseProductId(formData, locale);
  if (id === null) {
    return { error: dictionary(locale).admin.noId };
  }

  const removed = deleteProduct(id);
  if (!removed) {
    return { error: dictionary(locale).admin.productGone };
  }

  updateTag("products");
  redirect(localize(locale, "/admin"));
}
