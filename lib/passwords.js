import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

export function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const key = scryptSync(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);
  return `scrypt:${salt}:${key.toString("hex")}`;
}

export function verifyPassword(password, storedHash) {
  const parts = String(storedHash ?? "").split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") {
    return false;
  }

  const expected = Buffer.from(parts[2], "hex");
  const actual = scryptSync(password, parts[1], expected.length, SCRYPT_OPTIONS);
  return timingSafeEqual(actual, expected);
}
