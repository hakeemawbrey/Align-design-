// og-kbge06: social rework of kbge06 (static HOOK outline 0–3.0 replaces the slammed hook; social kit copy
// ../../og-kbge02/biokit.js: no bug, no flashes/shakes/glitch, hosts inside the safe zones; crazier Virgo; the receipt stays above the caption band). Was:
// kbge06: BIO GLOW-UP, "The requirements checklist" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Virgo's bio mid-print, a long checklist receipt unrolling out of the card's bottom edge;
//         hook "Virgo wrote | *terms and conditions.*"   0.35 record scratch + freeze: "page *one* of four."
//   1.35  circle "full sentences." → RULES · 2.75 strike, the receipt tears off and drops
//   3.5   the glow-up: "I’ll remember your coffee order by *date two.*" · glow: Pisces sobs · 8.5 last line. Hard cut.
import { makeBio, R, INK, INTER, prog, ease, lerp } from '../../og-kbge02/biokit.js'
const RULES = ['must be 10 min early', 'must fold in thirds', 'must reply in full sentences', 'must alphabetize spices', 'must…', 'must…']
function receipt(x, t, S) {
  const { CARD } = S
  const tear = ease.inCubic(prog(t, S.T.strike[1] - 0.1, S.T.strike[1] + 0.5))
  if (tear >= 1) return
  const len = lerp(170, 200, ease.outCubic(prog(t, -0.6, 1.4))) + 20 * Math.sin(t * 6) * (1 - prog(t, 0, 2))
  const x0 = CARD.x + 190, y0 = CARD.y + CARD.h - 6 + tear * 900, w = 400
  x.save(); x.translate(x0 + w / 2, y0); x.rotate(0.04 + tear * 0.4); x.translate(-w / 2, 0)
  R(x, INK, -5, 0, w + 10, len + 5); R(x, '#fffdf6', 0, 0, w, len)
  for (let i = 0; i * 18 < w; i++) R(x, INK, i * 18, len, 9, 6)
  x.font = `700 26px ${INTER}`; x.fillStyle = '#3a3150'; x.textBaseline = 'middle'
  RULES.forEach((r, i) => { const yy = 34 + i * 42; if (yy > len - 20) return; R(x, '#3a3150', 18, yy - 9, 18, 18); R(x, '#fffdf6', 22, yy - 5, 10, 10); x.fillStyle = '#3a3150'; x.fillText(r, 48, yy) })
  x.restore()
}
const EP = makeBio({
  id: 'og-kbge06', sign: 'virgo', name: 'Virgo', age: 31, D: 10,
  hook: 'Virgo wrote | *terms and conditions.*', hookColor: '#9fe6b0', hookSize: 94,
  bad: 'Must be 10 minutes early. Must fold laundry in thirds. Must reply in full sentences.',
  circle: { word: 'full sentences.', label: 'CLAUSE 14' },
  good: 'I’ll know your coffee order by *date two.* Laminated.',
  says: [{ t: 1.95, text: 'sweetie, this needs a *lawyer.*' }],
  fx: 'scratch', fxOpts: { caption: 'page *one* | of eleven.' }, cps: 26,
  under: receipt,
  last: 'Swap the checklist | for a *clue.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
export const HOOK = 'Virgo’s bio has | *fine print.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
