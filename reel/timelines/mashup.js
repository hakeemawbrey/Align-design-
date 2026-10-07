/* Mashup — an imagery-led collage edit in the spirit of the client's reference reels.
 * mashup.html?pace=fast (beat cuts) | ?pace=dreamy (slower, dissolves) */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  const pace = A.param ? A.param('pace', 'fast') : 'fast'
  A.TL = { hook: { start: 999, duration: 0 } /* keeps the vortex helpers' own scene off-screen */, fps: 30, duration: 15, bpm: 120, main: { start: 0, duration: 15 }, pace, audio: `out/audio/mashup-${pace}.wav` }
})()
