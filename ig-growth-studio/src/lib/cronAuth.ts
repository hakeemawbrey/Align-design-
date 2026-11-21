import crypto from "node:crypto";

/**
 * True when a request carries the cron key: "Authorization: Bearer <key>", tolerant of stray whitespace,
 * a repeated "Bearer " and quotes from copy-paste, or ?key=<key> for schedulers that cannot send headers.
 */
export function hasCronKey(key: string, header: string | null, queryKey: string | null): boolean {
  if (!key) return false;
  const clean = (v: string) =>
    v
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/^(bearer\s+)+/i, "")
      .trim();
  const candidates = [header ? clean(header) : "", queryKey ? clean(queryKey) : ""].filter(Boolean);
  const want = crypto.createHash("sha256").update(key).digest();
  return candidates.some((c) => crypto.timingSafeEqual(want, crypto.createHash("sha256").update(c).digest()));
}
