/* Teaser 3 — countdown to launch + founding members. launch.html (?date=NOV%2011 to show a date) */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  A.TL = {
    fps: 30, duration: 15, bpm: 120,
    countdown: { start: 0, duration: 7.5, each: 1 }, // 0.5 s lead-in, then 7…1 on the chakras, root → crown, 1 s each
    opens: { start: 7.5, duration: 2.5 },  // "THE SKY OPENS" + date or "SOON"
    founders: { start: 10, duration: 5 },  // founding-member card stamps in; waitlist CTA
    date: A.param ? A.param('date', '') : '', // empty → "SOON". Never invent a date.
    audio: 'out/audio/launch.wav',
  }
})()
