/* Teaser 2 — "Two skies": a love/compatibility story. love.html?a=taurus&b=scorpio */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  A.TL = {
    fps: 30, duration: 20, bpm: 90, // slower, heartbeat tempo: a beat every 0.667 s
    apart: { start: 0, duration: 4 },     // two galaxies, two signs, far apart
    orbit: { start: 4, duration: 5 },     // they circle closer; synastry lines; heart chakras glow
    union: { start: 9, duration: 5 },     // vesica piscis forms; heartbeat; collision at 13.33 s
    aligned: { start: 14, duration: 3 },  // "You both aligned."
    end: { start: 17, duration: 3 },      // end card
    hit: 13.333,                          // the collision, on beat 21 at 90 bpm
    a: A.param ? A.param('a', 'taurus') : 'taurus',
    b: A.param ? A.param('b', 'scorpio') : 'scorpio',
    audio: 'out/audio/love.wav',
  }
})()
