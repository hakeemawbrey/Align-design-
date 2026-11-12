import { execFile } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { promisify } from "node:util";
import { LOCAL_PREFIX, localMediaPath, mediaDir } from "./media";

/**
 * Photo Reels: Instagram only takes music on Reels, and a Reel must be a video of at least 3 seconds.
 * A Reel whose media is a photo is turned into a short video (the photo held still for 10 seconds, silent track) on this computer just
 * (the photo held still) before publishing, then uploaded like any local video, so Reels audio (trending music) can go on it.
 */
export const PHOTO_REEL_SECONDS = Number(process.env.PHOTO_REEL_SECONDS || 10);
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const run = promisify(execFile);

/** True when a Reel's media URL points at a photo instead of a video. */
export function isPhoto(mediaUrl: string) {
  const p = mediaUrl.startsWith(LOCAL_PREFIX) ? mediaUrl : safePath(mediaUrl);
  return IMAGE_EXT.test(p);
}

function safePath(url: string) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

/** FFMPEG_PATH, else the bundled ffmpeg-static binary, else ffmpeg on the PATH. */
export function ffmpegPath(): string {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const p = createRequire(import.meta.url)("ffmpeg-static") as string | null;
    if (p && fs.existsSync(p)) return p;
  } catch {
    // not installed
  }
  return "ffmpeg";
}

/**
 * Makes the video for a photo Reel and returns its "local:" media URL. Remote photos are downloaded first.
 * Keeps the photo's shape (width 1080), H.264 + silent AAC, 30 fps, moov atom at the front, as Instagram requires.
 */
export async function photoToReel(
  mediaUrl: string,
  postId: number,
  opts: { seconds?: number; fetchImpl?: typeof fetch } = {},
): Promise<string> {
  const seconds = Math.max(3, opts.seconds ?? PHOTO_REEL_SECONDS);
  const dir = path.join(mediaDir(), "photo-reels");
  await fs.promises.mkdir(dir, { recursive: true });
  let src = localMediaPath(mediaUrl);
  if (mediaUrl.startsWith(LOCAL_PREFIX) && !src) throw new Error(`Photo not found: ${mediaUrl}`);
  if (!src) {
    const res = await (opts.fetchImpl ?? fetch)(mediaUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not download the photo (HTTP ${res.status})`);
    src = path.join(dir, `${postId}-photo${path.extname(safePath(mediaUrl)) || ".jpg"}`);
    await fs.promises.writeFile(src, Buffer.from(await res.arrayBuffer()));
  }
  const name = `photo-reels/${postId}.mp4`;
  const out = path.join(mediaDir(), name);
  const fps = 30;
  const size = await imageSize(src);
  const h = 2 * Math.round((1080 * size.h) / size.w / 2);
  // The photo as it is, held still for the whole clip, at 1080 wide.
  const vf = `scale=1080:${h}:flags=lanczos,format=yuv420p`;
  await run(
    ffmpegPath(),
    [
      "-v", "error", "-y",
      "-loop", "1", "-framerate", String(fps), "-i", src,
      "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
      "-vf", vf,
      "-t", String(seconds), "-r", String(fps),
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "20", "-g", String(fps * 2),
      "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart",
      out,
    ],
    { maxBuffer: 1 << 24 },
  );
  return LOCAL_PREFIX + name;
}

/** Width and height of a JPEG/PNG/WebP via ffmpeg's own probe (no extra dependency). */
async function imageSize(file: string): Promise<{ w: number; h: number }> {
  try {
    await run(ffmpegPath(), ["-hide_banner", "-i", file], { maxBuffer: 1 << 20 });
  } catch (err) {
    // ffmpeg exits non-zero without an output file, but prints the stream info to stderr.
    const m = String((err as { stderr?: string }).stderr ?? "").match(/Video:.*?(\d{2,5})x(\d{2,5})/);
    if (m) return { w: Number(m[1]), h: Number(m[2]) };
  }
  throw new Error("Could not read the photo");
}
