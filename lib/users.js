import { getDb } from "./db";

const UNIQUE_EMAIL_MESSAGE = "UNIQUE constraint failed: users.email";

function isUniqueEmailError(error) {
  return String(error?.message ?? "").includes(UNIQUE_EMAIL_MESSAGE);
}

export function findUserByEmail(email) {
  return (
    getDb()
      .prepare(
        "select id, name, email, password_hash, role from users where email = ?"
      )
      .get(email) ?? null
  );
}

export function createUser({ name, email, passwordHash }) {
  try {
    getDb()
      .prepare("insert into users (name, email, password_hash) values (?, ?, ?)")
      .run(name, email, passwordHash);
  } catch (error) {
    if (isUniqueEmailError(error)) {
      return null;
    }
    throw error;
  }

  return findUserByEmail(email);
}

export function isEmailTaken(email) {
  return Boolean(
    getDb().prepare("select 1 as taken from users where email = ?").get(email)
  );
}
