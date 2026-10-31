// st12opposites — Star Talk S12 "Hot Takes" E57 (20 s vertical, music: house · Bm). Story 0–15.6, then the end card.
//   0.00   🔥 HOT TAKE "Opposite signs aren't doomed. | They're *balanced*."  ♎ Libra (left, mid-smirk) in front of a zodiac
//          wheel with a line drawn across it from ♎ to ♈ (they really are opposite on the wheel). HEAT 4/5.
//   2.6    OBJECTION! ♈ Aries: "opposites? we're *doomed.*"  LIBRA: "we're across the wheel. that's *balance.*"
//   last   "Opposites? | *Partners*."  A seesaw between them settles level (rewatch: the wheel turns one notch per beat).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "opposites? we're *doomed.* obviously." }, { who: "pro", text: "we're across the wheel. that's *balance.*" }], verdict: "no pairing is doomed or destined. | people make it *work.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E57', duration: 20, key: 'Bm',
  take: { text: "Opposite signs aren't | doomed. They're *balanced*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('libra', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('aries', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Opposites? | *Partners*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const cx = 540, cy = 800, rr = 150, rot = Math.floor(t * 1.8) * (Math.PI / 30)
    x.save(); x.strokeStyle = rgba(HOT.bone, 0.5); x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.stroke()
    for (let i = 0; i < 12; i++) { const a = rot + i * Math.PI / 6; x.beginPath(); x.moveTo(cx + Math.cos(a) * rr * 0.8, cy + Math.sin(a) * rr * 0.8); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); x.stroke() }
    const a0 = rot + Math.PI / 12; x.strokeStyle = HOT.gold; x.lineWidth = 6; x.beginPath(); x.moveTo(cx + Math.cos(a0) * rr * 0.9, cy + Math.sin(a0) * rr * 0.9); x.lineTo(cx - Math.cos(a0) * rr * 0.9, cy - Math.sin(a0) * rr * 0.9); x.stroke(); x.restore()
    if (t > T.last) { const tilt = 0.25 * Math.exp(-(t - T.last) * 3) * Math.cos((t - T.last) * 8); x.save(); x.translate(540, 1300); x.rotate(tilt); R(x, HOT.ink, -330, -10, 660, 20); R(x, HOT.gold, -326, -6, 652, 12); x.restore(); R(x, HOT.ink, 520, 1300, 40, 60) } },
  front: (x, t, T, rp, rc) => {  },
  cues: [['whoosh', LAST, 0.4, 0.02], ['pop', LAST + 0.6, 1174.66, 0.035, 0]],
})
export const { SCENES, CUES, DURATION } = EP
