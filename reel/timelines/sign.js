/* Teaser 1 — "Calling all <SIGN>": one 15 s video per sign. sign.html?sign=leo */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  const sign = A.param ? A.param('sign', 'taurus') : 'taurus'
  A.TL = {
    fps: 30, duration: 15, bpm: 120,
    hook: { start: 0, duration: 2.5 },     // "Calling all LEO" — glyph slams in
    sky: { start: 2.5, duration: 5.5 },    // constellation, element, ruler, chakra, traits on the beat
    matches: { start: 8, duration: 4 },    // compatible signs orbit in: "your matches are already aligning"
    end: { start: 12, duration: 3 },       // LEO × ALIGN end card, "coming soon"
    sign,
    audio: `out/audio/sign-${sign}.wav`,
  }
})()
