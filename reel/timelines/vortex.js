/* Teaser 4 — "Into the vortex": a cinematic fall through a tunnel of sacred geometry. vortex.html */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  A.TL = {
    fps: 30, duration: 20, bpm: 120,
    hook: { start: 0, duration: 2 },       // a spark in the dark, then the fall begins
    descent: { start: 2, duration: 14, each: 2 }, // 7 chapters × 2 s: one sacred form each, then it becomes tunnel
    emerge: { start: 16, duration: 4 },    // out of the fire into calm indigo: the Align mark, "Fall into alignment."
    /** chapter order; ids from ALIGN.geo.FORMS */
    chapters: ['seed', 'vesica', 'flower', 'metatron', 'sriYantra', 'merkaba', 'goldenSpiral'],
    audio: 'out/audio/vortex.wav',
  }
})()
