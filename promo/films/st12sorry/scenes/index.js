// st12sorry — Star Talk S12 "Hot Takes" E38 (15 s vertical, music: jazzy · Eb). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "'Sorry you feel that way' | isn't an *apology*."  ♎ Libra (left, mid-smirk, scales) beside a big card
//          quoting the non-apology, stamped ✗. HEAT 4/5.
//   2.6    OBJECTION! ♊ Gemini: "technically it *has* sorry in it."
//   last   "Say *what*. | Then say sorry."  The card flips to a real one (✓); the scales tip level (rewatch bait).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "technically it *has* sorry in it." }], verdict: "a real sorry names what happened | and what *changes.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const SCALES = ['....K....', 'KKKKKKKKK', 'K...K...K', 'K...K...K', 'GGG.K.GGG', '....K....', '...KKK...']

const EP = hotEpisode({
  numeral: 'S12 E38', duration: 15, key: 'Eb',
  take: { text: "'Sorry you feel that way' | isn't an *apology*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('libra', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { const tip = t < T.last ? Math.sin(t * 2) * 0.12 : 0; x.save(); x.translate(r.x + r.size * 0.55, r.y - r.size * 0.1); x.rotate(tip); bits(x, SCALES, { K: HOT.ink, G: HOT.gold }, -58, -45, 13); x.restore() } }),
  con: castSign('gemini', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Say *what*. | Then say sorry.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const real = t > T.last + 0.3
    card(x, 540, 820, 640, 170, real ? '#e8ffe8' : '#fffbea')
    if (!real) { txt(x, '"SORRY YOU FEEL', 540, 790, 40, HOT.ink); txt(x, 'THAT WAY."', 540, 842, 40, HOT.ink); txt(x, '✗', 820, 820, 90, HOT.red) }
    else { txt(x, '"SORRY I WAS LATE.', 540, 790, 38, HOT.ink); txt(x, 'NEXT TIME I\'LL TEXT."', 540, 842, 38, HOT.ink); txt(x, '✓', 830, 820, 90, '#2a8a4a') } },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.3, 1046.5, 0.035, 0], ['bell', LAST + 0.35, 1567.98, 0.02, 0.8, 0]],
})
export const { SCENES, CUES, DURATION } = EP
