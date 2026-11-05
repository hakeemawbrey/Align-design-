// kbge21: BIO GLOW-UP, "Brutally honest. Deal with it." (9 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Sagittarius' bio mid-slam: chunky pixel bricks bouncing off the card; hook "‘Brutally honest’ is | *just brutal.*"
//   0.35  screen shake · 1.35 circle "Brutally" → DROP THIS · 1.9 THE STARS: "drop the *brutal.*" · 2.75 strike
//   3.2   the glow-up: "Honest, but kind about it. I'll *laugh at your jokes.*" · Pisces cries "both!!" · 7.5 last line. Hard cut.
import { makeBio, signStar, drawBits, prog, ease, lerp } from '../../kbge01/biokit.js'
const GEM = signStar('gemini')
const BRICK = ['RRRRRR', 'RLRRRR', 'RRRRRR', 'DDDDDD']
const BR = [[250, 1035, 0.0], [840, 1045, 0.06], [520, 1405, 0.12], [900, 1400, -0.05]]
function bricks(x, t, S) {
  const out = ease.inCubic(prog(t, S.T.strike[0], S.T.strike[0] + 0.45))
  if (out >= 1) return
  BR.forEach(([px, py, at], i) => {
    const d = t - at
    let cy = d < 0 ? lerp(py - 500, py, ease.inQuad(prog(t, at - 0.35, at))) : py - 60 * Math.abs(Math.sin(d * 8)) * Math.exp(-d * 4)
    cy += out * 800
    drawBits(x, BRICK, { R: '#b8503a', L: '#e07a5a', D: '#7a3020' }, px + (px > 540 ? 1 : -1) * out * 300, cy, 14, { rot: 0.3 * Math.sin(i + d * 3) })
  })
}
const EP = makeBio({
  id: 'kbge21', sign: 'sagittarius', name: 'Sagittarius', age: 30, D: 9,
  hook: '‘Brutally honest’ is | *just brutal.*', hookColor: '#ff9a6a',
  bad: 'Brutally honest. Deal with it.',
  circle: { word: 'Brutally', label: 'DROP THIS' },
  says: [{ t: 1.9, text: 'drop the *brutal*, keep the honest.' }],
  good: 'Honest, but kind about it. I’ll *laugh at your jokes.*',
  fx: 'shake', fxOpts: { at: 0.05, amp: 30 }, cps: 30,
  T: { fx: 0.05, strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'ok I have *so* many jokes', glyph: GEM.glyph, color: GEM.color },
  top: bricks,
  last: 'Honest *and* kind. | You can do both.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
