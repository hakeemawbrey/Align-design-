/* Align reel — the master timeline (seconds). Scene files read their slot from here
 * so timing can be retuned in one place. Audio (tools/soundtrack.mjs) reads it too. */
;(function (root) {
  const TL = {
    fps: 30,
    duration: 31,
    intro: { start: 0, duration: 3 },
    chakras: { start: 3, duration: 14, each: 2 }, // 7 × 2s, root → crown
    zodiac: { start: 17, duration: 6 },
    montage: { start: 23, duration: 4 },
    outro: { start: 27, duration: 4 },
    /** musical grid the cuts land on: 120 bpm → a beat every 0.5s */
    bpm: 120,
  }
  if (typeof module !== 'undefined') module.exports = TL
  else (root.ALIGN = root.ALIGN || {}).TL = TL
})(typeof window !== 'undefined' ? window : globalThis)
