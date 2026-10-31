// st12hobbies — Star Talk S12 "Hot Takes" E47 (15 s vertical, music: pop · E). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Couples don't need the | *same* hobbies."  ♒ Aquarius (left, mid-smirk) with a pixel telescope. HEAT 2/5.
//   2.6    OBJECTION! ♎ Libra with two matching tennis rackets: "matching rackets. *matching* lives."
//   last   "Different *hobbies*. | Same team."  They swap: Libra peeks through the telescope, Aquarius holds a racket.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "matching rackets. *matching* lives." }], verdict: "share some things, keep some things. | more to *talk* about." })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const SCOPE = ['......KK', '....KKWK', '..KKBBK.', 'KKBBBK..', 'KBBK....', '.KK.....', '..K.K...', '.K...K..']
const RACKET = ['.KKK.', 'KGGGK', 'KGKGK', 'KGGGK', '.KKK.', '..K..', '..K..', '..K..']

const EP = hotEpisode({
  numeral: 'S12 E47', duration: 15, key: 'E',
  take: { text: "Couples don't need the | *same* hobbies.", out: [2.5, 2.65] },
  heat: { level: 2, at: -1 },
  pro: castSign('aquarius', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { if (t < T.last) bits(x, SCOPE, { K: HOT.ink, B: '#3f6fd8', W: '#bfe8ff' }, r.x + r.size * 0.3, r.y - r.size * 0.35, 13); else bits(x, RACKET, { K: HOT.ink, G: '#7dd06a' }, r.x + r.size * 0.4, r.y - r.size * 0.2, 12) } }),
  con: castSign('libra', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t < T.last) { bits(x, RACKET, { K: HOT.ink, G: '#7dd06a' }, r.x - r.size * 0.7, r.y - r.size * 0.2, 12); bits(x, RACKET, { K: HOT.ink, G: '#7dd06a' }, r.x - r.size * 0.55, r.y - r.size * 0.15, 12) } else bits(x, SCOPE, { K: HOT.ink, B: '#3f6fd8', W: '#bfe8ff' }, r.x - r.size * 0.75, r.y - r.size * 0.35, 13) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Different *hobbies*. | Same team.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => {  },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 800, y: 870, text: 'whoa. saturn!', at: T.last + 0.5, color: '#d0e8ff', size: 28 }) },
  cues: [['pop', LAST + 0.5, 1318.51, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION } = EP
