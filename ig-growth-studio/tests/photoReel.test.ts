import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { setAudioSetting } from "../src/lib/audio";
import { createPost, getPost, openDb, upsertAccounts } from "../src/lib/db";
import { ffmpegPath, isPhoto, photoToReel } from "../src/lib/photoReel";
import { publishDuePosts } from "../src/lib/publisher";
import { fakeGraph } from "./helpers";

let dir: string;

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "igs-photo-"));
  process.env.MEDIA_DIR = dir;
  // A 1080x1440 test photo.
  execFileSync(ffmpegPath(), ["-v", "error", "-f", "lavfi", "-i", "testsrc2=s=1080x1440", "-frames:v", "1", path.join(dir, "art.jpg")]);
});

function probe(file: string) {
  try {
    execFileSync(ffmpegPath(), ["-hide_banner", "-i", file], { stdio: "pipe" });
  } catch (err) {
    return String((err as { stderr?: Buffer }).stderr ?? "");
  }
  return "";
}

describe("photo Reels", () => {
  it("recognises photos", () => {
    expect(isPhoto("local:art.jpg")).toBe(true);
    expect(isPhoto("https://cdn.example.com/a/b.PNG?x=1")).toBe(true);
    expect(isPhoto("https://cdn.example.com/a/b.mp4")).toBe(false);
  });

  it("turns a photo into a 3:4 H.264 video with a silent AAC track", async () => {
    const url = await photoToReel("local:art.jpg", 42);
    expect(url).toBe("local:photo-reels/42.mp4");
    const info = probe(path.join(dir, "photo-reels", "42.mp4"));
    expect(info).toMatch(/Duration: 00:00:10/);
    expect(info).toMatch(/h264.*1080x1440/);
    expect(info).toMatch(/Audio: aac/);
  }, 60_000);

  it("publishes a photo queued as a Reel as a video, with trending music", async () => {
    const db = await openDb(":memory:");
    await upsertAccounts(db, [{ igUserId: "17841", username: "me", pageName: "Me", token: "TOKEN", tokenExpiresAt: null }]);
    await setAudioSetting(db, "17841", { mode: "trending", muteVideo: true });
    const now = new Date("2026-11-01T12:00:00Z");
    const id = await createPost(db, {
      igUserId: "17841", type: "REELS", mediaUrl: "local:art.jpg", caption: "hi", shareToFeed: true,
      scheduledAt: new Date(now.getTime() - 1000),
    });
    const { client, calls } = fakeGraph({
      "GET ig_audio": () => ({ data: [{ audio_id: "A1", title: "Song" }] }),
      "POST 17841/media": () => ({ id: "C1" }),
      "POST /ig-api-upload/v26.0/C1": () => ({ success: true }),
      "GET C1": () => ({ status_code: "FINISHED" }),
      "POST 17841/media_publish": () => ({ id: "M1" }),
      "GET M1": () => ({ id: "M1" }),
    });
    const res = await publishDuePosts(db, { now, client });
    expect(res.published).toEqual([id]);
    const create = calls.find((c) => c.path === "17841/media")!;
    expect(create.params).toMatchObject({ media_type: "REELS", upload_type: "resumable" });
    expect(JSON.parse(create.params.audio_configuration)).toEqual({ audio_id: "A1", video_volume: 1 });
    expect(calls.some((c) => c.path === "/ig-api-upload/v26.0/C1")).toBe(true);
    expect((await getPost(db, id))!.media_url).toBe(`local:photo-reels/${id}.mp4`);
  }, 60_000);
});
