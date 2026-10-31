// st12venus — Star Talk S12 "Hot Takes" E56 (20 s vertical, music: dreamy · Eb). Story 0–15.6, then the end card.
//   0.00   🔥 HOT TAKE "Check their *Venus* sign, | not their sun."  ♀ Venus (left, pink, mid-smirk). HEAT 4/5.
//   2.6    OBJECTION! ☉ the Sun flares in: "EXCUSE ME? *again?*"  VENUS: "you're the core. i'm how you *love.*"
//          (in astrology the Sun is the core self and Venus is love and relationships; the verdict says so.)
//   last   "Charts help. | *Asking* helps more."  Both turn to a little star with the same bubble: "how do you like to be loved?"
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "EXCUSE ME? *again?* i was in E16!" }, { who: "pro", text: "you're the core. i'm how you *love.*" }], verdict: "in astrology Venus is about how you | love. asking is still *faster.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E56', duration: 20, key: 'Eb',
  take: { text: "Check their *Venus* | sign, not their sun.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: { name: '♀︎ VENUS', color: '#ff8fc8', glyph: '♀', textColor: '#ffc0e0', x: 290, y: 1170, size: 340, seed: 2 },
  con: { name: '☉︎ THE SUN', color: '#ffc24a', glyph: '☉', textColor: '#ffe08a', x: 800, y: 1170, size: 330, seed: 7 },
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Charts help. | *Asking* helps more.", gap: 0.1 },
  moods: { con: [[OBJ, { mood: 'wide', look: [-1, 0], squash: 0.12 }], [OBJ + 1.4, { mood: 'squint', look: [-1, 0] }], [LAST + 0.3, { mood: 'happy', look: [0, 1] }]], pro: [[LAST + 0.3, { mood: 'happy', look: [0, 1] }]] },
  back: (x, t, T) => { if (t > T.last + 0.2) { const k = clamp((t - T.last - 0.2) / 0.3); x.save(); x.globalAlpha = k; x.fillStyle = HOT.gold; for (let a = 0; a < 10; a++) { const rr = a % 2 ? 22 : 50, an = -Math.PI / 2 + a * Math.PI / 5; if (!a) x.beginPath(); x.lineTo(540 + Math.cos(an) * rr, 1180 + Math.sin(an) * rr) } x.closePath(); x.fill(); x.restore() }
    for (let i = 0; i < 6; i++) { const an = t * 0.5 + i * 1.05; R(x, rgba('#ff8fc8', 0.5), 540 + Math.cos(an) * 380 - 4, 780 + Math.sin(an) * 80 - 4, 8, 8) } },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 540, y: 1000, text: 'how do you like to be loved?', at: T.last + 0.5, color: '#ffe0f0', size: 26 }) },
  cues: [['pop', LAST + 0.2, 1244.51, 0.035, 0], ['bell', LAST + 0.5, 1567.98, 0.02, 0.8, 0]],
})
export const { SCENES, CUES, DURATION } = EP
