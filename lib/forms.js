import { dictionary, isLocale, DEFAULT_LOCALE } from "./i18n";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  passwordMin: 8,
  descriptionMin: 10,
  descriptionMax: 600,
  categoryMax: 60,
  priceMax: 100_000_000,
  stockMax: 100_000,
  imageMax: 200,
  urlMax: 300,
};

function text(formData, field) {
  return String(formData.get(field) ?? "").trim();
}

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function formLocale(formData) {
  const value = text(formData, "locale");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function hasErrors(fieldErrors) {
  return Object.keys(fieldErrors).length > 0;
}

export function parseRegistration(formData, locale) {
  const errors = dictionary(locale).errors;
  const name = text(formData, "name");
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const passwordRepeat = String(formData.get("passwordRepeat") ?? "");
  const fieldErrors = {};

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) {
    fieldErrors.name = errors.nameLength(LIMITS.nameMin, LIMITS.nameMax);
  }
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = errors.emailInvalid;
  }
  if (password.length < LIMITS.passwordMin) {
    fieldErrors.password = errors.passwordShort(LIMITS.passwordMin);
  } else if (!/[\p{L}]/u.test(password) || !/[0-9]/.test(password)) {
    fieldErrors.password = errors.passwordPattern;
  }
  if (passwordRepeat !== password) {
    fieldErrors.passwordRepeat = errors.passwordMismatch;
  }

  if (hasErrors(fieldErrors)) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { name, email, password } };
}

export function parseLogin(formData, locale) {
  const errors = dictionary(locale).errors;
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const fieldErrors = {};

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = errors.emailInvalid;
  }
  if (password.length === 0) {
    fieldErrors.password = errors.passwordShort(LIMITS.passwordMin);
  }

  if (hasErrors(fieldErrors)) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { email, password } };
}

function parseInteger(value, label, max, fieldErrors, errors) {
  const raw = String(value ?? "").trim();

  if (!/^\d+$/.test(raw)) {
    fieldErrors[label] = errors.integerExpected;
    return null;
  }

  const number = Number(raw);
  if (!Number.isSafeInteger(number) || number > max) {
    fieldErrors[label] = errors.tooBig(max);
    return null;
  }

  return number;
}

const IMAGE_PATTERN = /^\/[\w][\w./-]*\.(svg|jpg|jpeg|png|webp)$/i;

function parseImage(formData, fieldErrors, errors) {
  const raw = text(formData, "image");

  if (raw.length === 0) {
    return null;
  }

  if (raw.length > LIMITS.imageMax || !IMAGE_PATTERN.test(raw)) {
    fieldErrors.image = errors.imagePath;
    return null;
  }

  return raw;
}

const URL_PATTERN = /^https:\/\/[\w-]+(\.[\w-]+)+(:\d{2,5})?(\/[^\s]*)?$/i;

function parseUrl(formData, fieldErrors, errors) {
  const raw = text(formData, "url");

  if (raw.length === 0) {
    return null;
  }

  if (raw.length > LIMITS.urlMax || !URL_PATTERN.test(raw)) {
    fieldErrors.url = errors.urlHttps;
    return null;
  }

  return raw;
}

function parseOptionalText(formData, field, max, fieldErrors, message) {
  const raw = text(formData, field);

  if (raw.length === 0) {
    return null;
  }
  if (raw.length > max) {
    fieldErrors[field] = message(max);
    return null;
  }

  return raw;
}

export function parseProduct(formData, locale) {
  const errors = dictionary(locale).errors;
  const name = text(formData, "name");
  const description = text(formData, "description");
  const category = text(formData, "category");
  const rawId = text(formData, "id");
  const fieldErrors = {};

  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) {
    fieldErrors.name = errors.titleLength(LIMITS.nameMin, LIMITS.nameMax);
  }
  if (
    description.length < LIMITS.descriptionMin ||
    description.length > LIMITS.descriptionMax
  ) {
    fieldErrors.description = errors.descriptionLength(
      LIMITS.descriptionMin,
      LIMITS.descriptionMax
    );
  }
  if (category.length === 0 || category.length > LIMITS.categoryMax) {
    fieldErrors.category = errors.categoryRequired(LIMITS.categoryMax);
  }

  const nameEn = parseOptionalText(
    formData,
    "name_en",
    LIMITS.nameMax,
    fieldErrors,
    errors.titleLength
  );
  const descriptionEn = parseOptionalText(
    formData,
    "description_en",
    LIMITS.descriptionMax,
    fieldErrors,
    errors.descriptionLength
  );
  const categoryEn = parseOptionalText(
    formData,
    "category_en",
    LIMITS.categoryMax,
    fieldErrors,
    errors.categoryRequired
  );

  const price = parseInteger(
    text(formData, "price"),
    "price",
    LIMITS.priceMax,
    fieldErrors,
    errors
  );
  const stock = parseInteger(
    text(formData, "stock"),
    "stock",
    LIMITS.stockMax,
    fieldErrors,
    errors
  );
  const id =
    rawId.length > 0
      ? parseInteger(rawId, "id", Number.MAX_SAFE_INTEGER, fieldErrors, errors)
      : null;
  const image = parseImage(formData, fieldErrors, errors);
  const url = parseUrl(formData, fieldErrors, errors);

  if (hasErrors(fieldErrors)) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    id,
    data: {
      name,
      description,
      category,
      name_en: nameEn,
      description_en: descriptionEn,
      category_en: categoryEn,
      price,
      stock,
      image,
      url,
    },
  };
}

export function parseProductId(formData, locale) {
  const fieldErrors = {};
  return parseInteger(
    text(formData, "id"),
    "id",
    Number.MAX_SAFE_INTEGER,
    fieldErrors,
    dictionary(locale).errors
  );
}
