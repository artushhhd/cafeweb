import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";

export const SESSION_COOKIE = "shop_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export async function startSession(userId) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + SESSION_TTL_MS;

  getDb()
    .prepare(
      "insert into sessions (token_hash, user_id, expires_at) values (?, ?, ?)"
    )
    .run(hashToken(token), userId, expiresAt);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (token) {
    getDb()
      .prepare("delete from sessions where token_hash = ?")
      .run(hashToken(token));
  }

  store.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const row = getDb()
    .prepare(
      `select u.id, u.name, u.email, u.role
       from sessions s
       join users u on u.id = s.user_id
       where s.token_hash = ? and s.expires_at > ?`
    )
    .get(hashToken(token), Date.now());

  if (!row) {
    return null;
  }

  return { id: Number(row.id), name: row.name, email: row.email, role: row.role };
}
