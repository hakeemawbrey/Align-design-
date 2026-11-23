import fs from "node:fs";
import path from "node:path";

/**
 * Videos kept on this computer instead of at a public URL. A post's media URL is then "local:<file>", relative to the
 * media folder, and the publisher uploads the file itself (Instagram and Facebook resumable uploads).
 * Only works where the worker runs on this machine (not on Vercel).
 */
export const LOCAL_PREFIX = "local:";

export function mediaDir() {
  return path.resolve(process.env.MEDIA_DIR || path.join(process.cwd(), "data", "media"));
}

export const isLocalMedia = (url: string) => url.startsWith(LOCAL_PREFIX);

/** Absolute path of a "local:" media URL, or null if it points outside the media folder or the file is missing. */
export function localMediaPath(url: string): string | null {
  if (!isLocalMedia(url)) return null;
  const root = mediaDir();
  const p = path.resolve(root, url.slice(LOCAL_PREFIX.length));
  if (p !== root && !p.startsWith(root + path.sep)) return null;
  return fs.existsSync(p) && fs.statSync(p).isFile() ? p : null;
}
