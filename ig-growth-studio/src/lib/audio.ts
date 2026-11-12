import { type DB, audioUseCounts, getSetting, setSetting } from "./db";
import type { AudioConfiguration, GraphClient, IgAudio } from "./graph";

/**
 * Music on Reels, per account (Instagram Audio API).
 * - off: Reels go up with the video's own sound.
 * - trending: each Reel gets a track from Instagram's trending list, rotating so the same song is not on every post.
 * - search: like trending, but from a keyword search (a mood, artist or genre) instead.
 */
export type AudioMode = "off" | "trending" | "search";

export interface AudioSetting {
  mode: AudioMode;
  query?: string | null;
  /** 1–100. */
  audioVolume?: number | null;
  /** 1–100: the video's own sound under the music. Lower it when the video already has music. */
  videoVolume?: number | null;
  /** Silence the video's own sound under the music (Instagram's lowest level, 1 of 100; 0 is not accepted). */
  muteVideo?: boolean;
}

/** The lowest video volume Instagram accepts; effectively silent under a music track. */
export const MUTED_VIDEO_VOLUME = 1;

export const DEFAULT_AUDIO: AudioSetting = { mode: "off" };
/** How long a fetched trending or search list is reused before asking Instagram again. */
export const AUDIO_CACHE_MS = 60 * 60 * 1000;
/** Rotation window: prefer tracks this account has not used in this long. */
export const ROTATION_MS = 7 * 24 * 60 * 60 * 1000;

const settingKey = (igUserId: string) => `reel_audio:${igUserId}`;
const cacheKey = (igUserId: string, s: AudioSetting) => `reel_audio_cache:${igUserId}:${s.mode}:${s.query ?? ""}`;

export async function getAudioSetting(db: DB, igUserId: string): Promise<AudioSetting> {
  const raw = await getSetting(db, settingKey(igUserId));
  if (!raw) return DEFAULT_AUDIO;
  try {
    return { ...DEFAULT_AUDIO, ...(JSON.parse(raw) as AudioSetting) };
  } catch {
    return DEFAULT_AUDIO;
  }
}

export async function setAudioSetting(db: DB, igUserId: string, s: AudioSetting) {
  const clean: AudioSetting = {
    mode: s.mode,
    query: s.mode === "search" ? (s.query ?? "").trim() || null : null,
    audioVolume: clampVolume(s.audioVolume),
    videoVolume: clampVolume(s.videoVolume),
    muteVideo: Boolean(s.muteVideo),
  };
  if (clean.mode === "search" && !clean.query) throw new Error("Search mode needs a search term");
  await setSetting(db, settingKey(igUserId), clean.mode === "off" && clean.audioVolume == null && clean.videoVolume == null && !clean.muteVideo ? null : JSON.stringify(clean));
  return clean;
}

function clampVolume(v: number | null | undefined) {
  if (v == null || Number.isNaN(Number(v))) return null;
  return Math.min(100, Math.max(1, Math.round(Number(v))));
}

/** The current trending (or search) list for an account, cached for an hour. */
export async function audioCandidates(db: DB, client: GraphClient, igUserId: string, s: AudioSetting, now: Date): Promise<IgAudio[]> {
  const key = cacheKey(igUserId, s);
  const cached = await getSetting(db, key);
  if (cached) {
    try {
      const c = JSON.parse(cached) as { at: string; items: IgAudio[] };
      if (now.getTime() - Date.parse(c.at) < AUDIO_CACHE_MS && c.items.length) return c.items;
    } catch {
      // refetch
    }
  }
  const res = await client.searchAudio(igUserId, { type: "music", query: s.mode === "search" ? (s.query ?? undefined) : undefined });
  const items = (res.data ?? []).filter((a) => a.audio_id);
  await setSetting(db, key, JSON.stringify({ at: now.toISOString(), items }));
  return items;
}

/**
 * Picks the track for the next Reel: the highest-ranked one this account has used least in the last week,
 * so a run of posts walks down the trending list instead of repeating the top song.
 */
export async function pickAudio(
  db: DB,
  client: GraphClient,
  igUserId: string,
  now: Date,
): Promise<{ config: AudioConfiguration; title: string } | null> {
  const s = await getAudioSetting(db, igUserId);
  if (s.mode === "off") return null;
  const items = await audioCandidates(db, client, igUserId, s, now);
  // Recorded on the post (the Reel still goes out with its own sound), so an empty list is never silent.
  if (!items.length) throw new Error(s.mode === "search" ? `Instagram found no music for "${s.query}"` : "Instagram returned no trending music");
  const used = await audioUseCounts(db, igUserId, new Date(now.getTime() - ROTATION_MS));
  let best = items[0];
  for (const a of items) if ((used.get(a.audio_id) ?? 0) < (used.get(best.audio_id) ?? 0)) best = a;
  return {
    config: { audioId: best.audio_id, audioVolume: s.audioVolume ?? null, videoVolume: s.muteVideo ? MUTED_VIDEO_VOLUME : (s.videoVolume ?? null) },
    title: [best.title, best.display_artist].filter(Boolean).join(" · ") || best.audio_id,
  };
}
