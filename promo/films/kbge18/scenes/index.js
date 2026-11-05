// kbge18: BIO GLOW-UP, "Draft forty-seven" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Virgo's profile, a draft counter in the header mid-spin to 47, crumpled drafts flying; hook "Virgo is on | *draft 47.*"
//   0.35  record scratch + freeze: "it was fine at *draft 3.*" · 1.35 circle "(edited)" → DRAFT 47 · 1.9 loading bar
//         "perfecting…" stalls at 99% · THE STARS: "post *draft 3.* it was sweet." · 2.75 strike
//   3.5   the glow-up: "Organised. Laughs at my own puns. Will *plan the picnic.*" · POSTED stamp · Pisces sobs · 8.5 last line. Hard cut.
import { makeBio, signStar, R, INK, INTER, KIT, prog, ease, lerp } from '../../kbge01/biokit.js'
const LIB = signStar('libra')
const LOAD = { at: 1.75, len: 1.05, label: 'perfecting…', stallAt: 99, error: null, y: 760 }
function counter(x, t, S) {
  const n = t < 0.3 ? Math.floor(lerp(40, 47, prog(t, -0.3, 0.3))) : 47
  if (t > S.T.glow) return
  x.save(); x.translate(S.CARD.x + 120, S.CARD.y + 46)
  R(x, INK, -66, -24, 170, 48); R(x, '#f2c75c', -62, -20, 162, 40)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRAFT ' + n, 19, 2)
  x.restore()
  // crumpled drafts flying out of the card on frame 0
  for (let i = 0; i < 4; i++) {
    const p = prog(t, -0.4 + i * 0.12, 0.5 + i * 0.12)
    if (p <= 0 || p >= 1) continue
    const px = lerp(540, [140, 940, 220, 880][i], ease.outCubic(p)), py = lerp(900, [520, 600, 1300, 1250][i], ease.outCubic(p)) + 200 * p * p
    x.save(); x.translate(px, py); x.rotate(p * 6 + i); R(x, INK, -26, -22, 52, 44); R(x, '#f7f0e4', -22, -18, 44, 36); R(x, '#cfc6b6', -10, -8, 22, 4); R(x, '#cfc6b6', -14, 4, 26, 4); x.restore()
  }
}
const EP = makeBio({
  id: 'kbge18', sign: 'virgo', name: 'Virgo', age: 28, D: 10,
  hook: 'Virgo is on | *draft 47.*', hookColor: '#9fe6b0',
  bad: 'Hello. I am a normal person who is normal. (edited)',
  circle: { word: '(edited)', label: 'DRAFT 47' },
  says: [{ t: 2.0, text: 'post *draft 3.* it was sweet.' }],
  good: 'Organised. Laughs at my own puns. Will *plan the picnic.*',
  fx: 'scratch', fxOpts: { caption: 'it was fine at *draft 3.*' }, cps: 28,
  stampText: 'POSTED',
  reply: { body: 'I’ll bring the *puns*. and the blanket.', glyph: LIB.glyph, color: LIB.color },
  kit: [[KIT.loadingBar, KIT.loadingBarCues, LOAD]],
  over: counter,
  last: 'Good enough | is *ready.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
