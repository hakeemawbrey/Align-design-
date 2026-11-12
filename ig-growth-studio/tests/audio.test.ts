import { beforeEach, describe, expect, it } from "vitest";
import { getAudioSetting, setAudioSetting } from "../src/lib/audio";
import { type DB, createPost, getPost, openDb, upsertAccounts } from "../src/lib/db";
import { publishDuePosts } from "../src/lib/publisher";
import { fakeGraph, graphError } from "./helpers";

const NOW = new Date("2026-11-01T12:00:00Z");
let db: DB;

beforeEach(async () => {
  db = await openDb(":memory:");
  await upsertAccounts(db, [{ igUserId: "17841", username: "me", pageName: "Me", token: "TOKEN", tokenExpiresAt: null }]);
});

const reel = (n = 0) =>
  createPost(db, {
    igUserId: "17841",
    type: "REELS",
    mediaUrl: `https://cdn.example.com/${n}.mp4`,
    caption: "hi",
    shareToFeed: true,
    scheduledAt: new Date(NOW.getTime() - 1000 + n),
  });

// The shape Instagram really returns: tracks under "audio", not "data".
const TRENDING = { audio: [{ audio_id: "A1", title: "Song One", display_artist: "Artist" }, { audio_id: "A2", title: "Song Two" }] };

function graph(media: (body: URLSearchParams | null) => unknown = () => ({ id: "C1" })) {
  return fakeGraph({
    "GET ig_audio": () => TRENDING,
    "POST 17841/media": (_u, body) => media(body),
    "GET C1": () => ({ status_code: "FINISHED" }),
    "POST 17841/media_publish": () => ({ id: "M1" }),
    "GET M1": () => ({ id: "M1", permalink: "https://instagram.com/reel/x" }),
  });
}

describe("Reels audio", () => {
  it("is off by default: no audio lookup, no audio_configuration", async () => {
    const id = await reel();
    const { client, calls } = graph();
    await publishDuePosts(db, { now: NOW, client });
    expect(calls.some((c) => c.path === "ig_audio")).toBe(false);
    expect(calls.find((c) => c.path === "17841/media")?.params.audio_configuration).toBeUndefined();
    expect((await getPost(db, id))!.status).toBe("published");
  });

  it("attaches the top trending track and records it", async () => {
    await setAudioSetting(db, "17841", { mode: "trending", videoVolume: 20 });
    const id = await reel();
    const { client, calls } = graph();
    await publishDuePosts(db, { now: NOW, client });
    const lookup = calls.find((c) => c.path === "ig_audio")!;
    expect(lookup.params).toMatchObject({ user_id: "17841", audio_type: "music" });
    expect(lookup.params.search_query).toBeUndefined();
    const cfg = JSON.parse(calls.find((c) => c.path === "17841/media")!.params.audio_configuration);
    expect(cfg).toEqual({ audio_id: "A1", video_volume: 20 });
    const post = (await getPost(db, id))!;
    expect(post).toMatchObject({ status: "published", audio_id: "A1", audio_title: "Song One · Artist", audio_error: null });
  });

  it("mutes the video's own sound when asked", async () => {
    await setAudioSetting(db, "17841", { mode: "trending", videoVolume: 40, muteVideo: true });
    await reel();
    const { client, calls } = graph();
    await publishDuePosts(db, { now: NOW, client });
    const cfg = JSON.parse(calls.find((c) => c.path === "17841/media")!.params.audio_configuration);
    expect(cfg).toEqual({ audio_id: "A1", video_volume: 1 });
  });

  it("rotates so the next Reel gets a different track, and reuses the cached list", async () => {
    await setAudioSetting(db, "17841", { mode: "trending" });
    const first = await reel(0);
    const second = await reel(1);
    const { client, calls } = graph();
    await publishDuePosts(db, { now: NOW, client, maxNewPerAccount: 2 });
    expect((await getPost(db, first))!.audio_id).toBe("A1");
    expect((await getPost(db, second))!.audio_id).toBe("A2");
    expect(calls.filter((c) => c.path === "ig_audio")).toHaveLength(1);
  });

  it("uses a keyword search in search mode", async () => {
    await setAudioSetting(db, "17841", { mode: "search", query: "lofi" });
    await reel();
    const { client, calls } = graph();
    await publishDuePosts(db, { now: NOW, client });
    expect(calls.find((c) => c.path === "ig_audio")!.params.search_query).toBe("lofi");
  });

  it("posts without music when Instagram refuses the track", async () => {
    await setAudioSetting(db, "17841", { mode: "trending" });
    const id = await reel();
    const { client, calls } = graph((body) => (body?.get("audio_configuration") ? graphError(100, "Audio not available") : { id: "C1" }));
    await publishDuePosts(db, { now: NOW, client });
    const creates = calls.filter((c) => c.path === "17841/media");
    expect(creates).toHaveLength(2);
    expect(creates[1].params.audio_configuration).toBeUndefined();
    const post = (await getPost(db, id))!;
    expect(post.status).toBe("published");
    expect(post.audio_id).toBeNull();
    expect(post.audio_error).toMatch(/Posted without "Song One · Artist": Audio not available/);
  });

  it("posts without music when the audio lookup is not allowed", async () => {
    await setAudioSetting(db, "17841", { mode: "trending" });
    const id = await reel();
    const { client } = fakeGraph({
      "GET ig_audio": () => graphError(10, "Application does not have permission"),
      "POST 17841/media": () => ({ id: "C1" }),
      "GET C1": () => ({ status_code: "FINISHED" }),
      "POST 17841/media_publish": () => ({ id: "M1" }),
      "GET M1": () => ({ id: "M1" }),
    });
    await publishDuePosts(db, { now: NOW, client });
    const post = (await getPost(db, id))!;
    expect(post.status).toBe("published");
    expect(post.audio_error).toMatch(/No audio: Application does not have permission/);
  });

  it("says why when Instagram returns no tracks, and still posts", async () => {
    await setAudioSetting(db, "17841", { mode: "trending" });
    const id = await reel();
    const { client } = fakeGraph({
      "GET ig_audio": () => ({ audio: [], paging: { cursors: {} } }),
      "POST 17841/media": () => ({ id: "C1" }),
      "GET C1": () => ({ status_code: "FINISHED" }),
      "POST 17841/media_publish": () => ({ id: "M1" }),
      "GET M1": () => ({ id: "M1" }),
    });
    await publishDuePosts(db, { now: NOW, client });
    const post = (await getPost(db, id))!;
    expect(post.status).toBe("published");
    expect(post.audio_error).toMatch(/no trending music/);
  });

  it("validates settings", async () => {
    await expect(setAudioSetting(db, "17841", { mode: "search", query: " " })).rejects.toThrow(/search term/);
    expect(await setAudioSetting(db, "17841", { mode: "trending", videoVolume: 500 })).toMatchObject({ videoVolume: 100, muteVideo: false });
    await setAudioSetting(db, "17841", { mode: "off" });
    expect(await getAudioSetting(db, "17841")).toEqual({ mode: "off" });
  });
});
