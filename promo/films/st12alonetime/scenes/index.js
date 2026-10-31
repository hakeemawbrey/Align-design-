// st12alonetime — Star Talk S12 "Hot Takes" E41 (15 s vertical, music: synthwave · Dm). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Wanting alone time isn't | a *red flag*."  ♒ Aquarius (left, mid-smirk, headphones) with a social
//          battery meter above it at 1 bar. HEAT 3/5.
//   2.6    OBJECTION! ♌ Leo: "but i miss you *ALREADY.*"
//   last   "Take space. | *Come back*."  The battery is full (rewatch: it charges bar by bar); Aquarius comes back, heart-eyed.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "but i miss you *ALREADY.*" }], verdict: "space refills you. | say when you'll be *back.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E41', duration: 15, key: 'Dm',
  take: { text: "Wanting alone time isn't | a *red flag*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('aquarius', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { x.save(); x.lineWidth = r.size * 0.05; x.strokeStyle = HOT.ink; x.beginPath(); x.arc(r.x, r.y - r.size * 0.02, r.size * 0.3, Math.PI * 1.12, Math.PI * 1.88); x.stroke(); x.lineWidth = r.size * 0.028; x.strokeStyle = '#7fe0b8'; x.stroke(); x.restore(); for (const s of [-1, 1]) { R(x, HOT.ink, r.x + s * r.size * 0.3 - r.size * 0.06, r.y - r.size * 0.12, r.size * 0.12, r.size * 0.17); R(x, '#7fe0b8', r.x + s * r.size * 0.3 - r.size * 0.045, r.y - r.size * 0.105, r.size * 0.09, r.size * 0.14) } } }),
  con: castSign('leo', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Take space. | *Come back*.", gap: 0.1 },
  moods: { pro: [[LAST + 0.4, { mood: 'heart', look: [1, 0] }]], con: [[OBJ + 0.4, { mood: 'squint', look: [-1, 0], blush: 1 }], [LAST + 0.4, { mood: 'heart', look: [-1, 0] }]] },
  back: (x, t, T) => { const lvl = Math.min(5, 1 + Math.floor(clamp((t - 0.5) / (LAST - 0.5)) * 5))
    card(x, 290, 830, 200, 90, '#140c2c', HOT.bone); R(x, HOT.bone, 392, 815, 12, 30)
    for (let i = 0; i < 5; i++) R(x, i < lvl ? (lvl >= 5 ? '#7dffb0' : lvl > 2 ? HOT.gold : HOT.red) : '#2a2156', 204 + i * 36, 800, 28, 60) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 900, text: 'back. missed you.', at: T.last + 0.4, color: '#c8f2e0', size: 28 }) },
  cues: [['pop', LAST + 0.4, 1174.66, 0.035, -0.3], ['glitter', LAST + 0.4, LAST + 0.9]],
})
export const { SCENES, CUES, DURATION } = EP
