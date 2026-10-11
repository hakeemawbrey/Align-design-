// Global timeline: the mystery-card → reveal beat (S3) was stretched by EXTRA seconds.
// S1–S3 run on real time. Everything authored after the split (S4–S8, their fx and
// sound cues) keeps its original numbers and is shifted by EXTRA at playback.
export const EXTRA = 1.5
export const SPLIT = 9.5            // original-timeline time where the stretch is inserted
export const DURATION = 30 + EXTRA
/** real time → original (authored) time for post-split material */
export const late = (t) => t - EXTRA
/** original (authored) time of a post-split cue → real time */
export const shift = (t) => (t > SPLIT ? t + EXTRA : t)
