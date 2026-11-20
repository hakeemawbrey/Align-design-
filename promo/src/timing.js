// Global timeline: the mystery-card → reveal beat (S3) was stretched by EXTRA seconds.
// S1–S3 run on real time. Everything authored after the split (S4–S8, their fx and
// sound cues) keeps its original numbers and is shifted by EXTRA at playback.
export const EXTRA = 1.5
export const SPLIT = 9.5            // original-timeline time where the stretch is inserted
// The opening (S1–S3: hook, intro, the mystery card and its reveal) plays slower than authored:
// the first SLOW_TO seconds of S1–S3 time run at 1/SLOW_K speed, adding SLOW_EXTRA seconds.
export const SLOW_TO = 11.5
export const SLOW_K = 1.35
export const SLOW_EXTRA = SLOW_TO * (SLOW_K - 1)
export const DURATION = 30 + EXTRA + SLOW_EXTRA
/** playback time → S1–S3 time (undo the slow opening) */
export const warp = (r) => (r < SLOW_TO * SLOW_K ? r / SLOW_K : r - SLOW_EXTRA)
/** S1–S3 time → playback time */
export const unwarp = (a) => (a < SLOW_TO ? a * SLOW_K : a + SLOW_EXTRA)
/** S1–S3 time → original (authored) time for post-split material */
export const late = (t) => t - EXTRA
/** original (authored) time of a cue → playback time */
export const shift = (t) => unwarp(t > SPLIT ? t + EXTRA : t)
