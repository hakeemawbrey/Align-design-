import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { localMediaPath } from "../src/lib/media";
import { fakeGraph } from "./helpers";

describe("videos from this computer", () => {
  beforeAll(() => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "igs-media-"));
    fs.mkdirSync(path.join(dir, "exp"));
    fs.writeFileSync(path.join(dir, "exp", "a.mp4"), Buffer.from("video-bytes"));
    process.env.MEDIA_DIR = dir;
  });

  it("only resolves existing files inside the media folder", () => {
    expect(localMediaPath("local:exp/a.mp4")).toMatch(/exp\/a\.mp4$/);
    expect(localMediaPath("local:exp/missing.mp4")).toBeNull();
    expect(localMediaPath("local:../../etc/passwd")).toBeNull();
    expect(localMediaPath("https://x/a.mp4")).toBeNull();
  });

  it("sends a local Reel to Instagram with a resumable upload", async () => {
    const { client, calls } = fakeGraph({
      "POST 9/media": () => ({ id: "C1" }),
      "POST /ig-api-upload/v26.0/C1": () => ({ success: true }),
    });
    expect(await client.createReelContainer("9", "local:exp/a.mp4", "cap", true, null, 1000)).toEqual({ id: "C1" });
    expect(calls[0].params).toMatchObject({ media_type: "REELS", upload_type: "resumable", thumb_offset: "1000" });
    expect(calls[0].params.video_url).toBeUndefined();
    expect(calls[1].path).toBe("/ig-api-upload/v26.0/C1");
  });

  it("uploads a local Reel to a Facebook Page", async () => {
    const { client, calls } = fakeGraph({
      "POST P1/video_reels": () => ({ video_id: "V1", success: true }),
      "POST /video-upload/v26.0/V1": () => ({ success: true }),
    });
    expect(await client.publishPageReel("P1", "local:exp/a.mp4", "hi")).toEqual({ videoId: "V1" });
    expect(calls.map((c) => c.path)).toEqual(["P1/video_reels", "/video-upload/v26.0/V1", "P1/video_reels"]);
    expect(calls[2].params).toMatchObject({ upload_phase: "finish", video_state: "PUBLISHED" });
  });

  it("refuses a missing local file", async () => {
    const { client } = fakeGraph({});
    await expect(client.createReelContainer("9", "local:exp/nope.mp4", "", true)).rejects.toThrow(/not found/);
  });
});
