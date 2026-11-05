// kbge22: BIO GLOW-UP, "Nothing serious" (it's serious) (11 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Capricorn's bio mid-flicker between two lines, a heart monitor beeping across the photo; hook "Capricorn, | *your bio is lying.*"
//   0.35  record scratch + freeze: "*beep.* *beep.*" · 1.35 circle "anything serious." → REALLY? the monitor jumps, Capricorn blushes
//   1.9   THE STARS: "say what you *want.*" · 2.75 strike · 3.4 the glow-up: "Looking for something *real.* Slowly is fine."
//   glow: the monitor draws a heart, Pisces sobs hard · a message · 9.5 last line. Hard cut.
import { makeBio, signStar, R, INK, prog } from '../../kbge01/biokit.js'
const TAU = signStar('taurus')
function monitor(x, t, S) {
  const P = S.PHOTO, y0 = P.y + P.h - 48
  R(x, 'rgba(5,3,14,0.55)', P.x, y0 - 40, P.w, 80)
  x.save(); x.strokeStyle = '#7dffb0'; x.lineWidth = 5; x.shadowColor = '#7dffb0'; x.shadowBlur = 10; x.beginPath()
  const jump = (t > S.T.circle && t < S.T.circle + 0.6) ? 2.4 : 1
  for (let i = 0; i <= 120; i++) {
    const u = i / 120, px = P.x + u * P.w, ph = ((u * 3 - t * 1.4) % 1 + 1) % 1
    let v = ph > 0.45 && ph < 0.5 ? -30 : ph >= 0.5 && ph < 0.55 ? 22 : 0
    if (t > S.T.glow && Math.abs(u - 0.5) < 0.08) { const q = (u - 0.42) / 0.16; v = -26 * Math.sin(Math.PI * q) * (q < 0.5 ? 1.4 : 1.4) }
    i ? x.lineTo(px, y0 + v * jump) : x.moveTo(px, y0 + v * jump)
  }
  x.stroke(); x.restore()
  void INK; void prog
}
const EP = makeBio({
  id: 'kbge22', sign: 'capricorn', name: 'Capricorn', age: 30, D: 11,
  hook: 'Capricorn, | *your bio is lying.*', hookColor: '#ff8fb1',
  bad: 'Not looking for anything serious.',
  circle: { word: 'anything serious.', label: 'REALLY?' },
  says: [{ t: 1.9, text: 'say what you *want*, love.' }],
  good: 'Looking for something *real.* Slowly is fine.',
  fx: 'scratch', fxOpts: { caption: '*beep.* *beep.*' }, cps: 24,
  T: { swap: 3.4 },
  reply: { body: 'slowly is *perfect*, actually.', glyph: TAU.glyph, color: TAU.color },
  starOpts: (t, S) => ({ blush: t > S.T.circle ? 1 : 0 }),
  mood: (t, S) => t >= S.T.glow ? 'heart' : t >= S.T.circle ? 'wide' : 'neutral',
  photo: monitor,
  last: 'Want it? Then | *write* it.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
