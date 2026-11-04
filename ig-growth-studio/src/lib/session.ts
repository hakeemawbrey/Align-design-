// Works in both the Edge (middleware) and Node runtimes: Web Crypto only.

export const SESSION_COOKIE = "studio_session";
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 30;

async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
  let bin = "";
  for (const b of sig) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Cookie value: "<issuedAtSeconds>.<hmac>" signed with APP_PASSWORD. */
export async function issueSession(password: string, now = Date.now()): Promise<string> {
  const iat = Math.floor(now / 1000).toString();
  return `${iat}.${await hmac(password, `session:${iat}`)}`;
}

export async function verifySession(password: string, value: string | undefined, now = Date.now()): Promise<boolean> {
  if (!password || !value) return false;
  const [iat, sig] = value.split(".");
  if (!iat || !sig || !/^\d+$/.test(iat)) return false;
  if (Math.floor(now / 1000) - Number(iat) > SESSION_MAX_AGE_S) return false;
  return safeEqual(sig, await hmac(password, `session:${iat}`));
}

export async function checkPassword(expected: string, given: string): Promise<boolean> {
  if (!expected) return false;
  // Compare digests so the comparison time does not depend on the password length.
  return safeEqual(await hmac("pw", expected), await hmac("pw", given));
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_S,
  secure: process.env.NODE_ENV === "production",
};
