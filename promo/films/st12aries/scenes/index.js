// st12aries — Star Talk S12 "Hot Takes" E55 (15 s vertical, music: funk · A). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Aries isn't impatient. | It's *excited*."  ♈ Aries (left, mid-smirk) bouncing by the door, keys up.
//          HEAT 3/5.
//   2.6    OBJECTION! ♉ Taurus, one shoe on: "five *more* minutes. maybe ten."
//   last   "Excited. | *And* patient."  Aries sits and helps tie the second shoe (rewatch: the door clock never moves).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "five *more* minutes. maybe ten." }], verdict: "excitement is sweet. so is | letting someone *catch up.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const KEYS = ['.KK..', 'K..K.', '.KK..', '..GGG', '..G.G']
const SHOE = ['....KK', 'KKKKRK', 'KRRRRK', 'KKKKKK']

const EP = hotEpisode({
  numeral: 'S12 E55', duration: 15, key: 'A',
  take: { text: "Aries isn't impatient. | It's *excited*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('aries', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { if (t < T.last) bits(x, KEYS, { K: HOT.gold, G: HOT.gold }, r.x + r.size * 0.42, r.y - r.size * 0.3 + Math.abs(Math.sin(t * 9)) * -10, 13) } }),
  con: castSign('taurus', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { bits(x, SHOE, { K: HOT.ink, R: '#c8352c' }, r.x - r.size * 0.32, r.y + r.size * 0.3, 11); if (t > T.last + 0.5) bits(x, SHOE, { K: HOT.ink, R: '#c8352c' }, r.x + r.size * 0.08, r.y + r.size * 0.3, 11) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Excited. | *And* patient.", gap: 0.1 },
  moods: { pro: [[0, { mood: 'wink', look: [1, 0], hops: [0.2, 0.6, 1.0, 1.4, 1.8, 2.2] }], [LAST, { mood: 'happy', look: [1, 1] }]] },
  back: (x, t, T) => { R(x, HOT.ink, 60, 780, 170, 510); R(x, '#6b4024', 68, 788, 154, 502); R(x, HOT.gold, 196, 1030, 14, 14)
    card(x, 540, 760, 160, 90, '#fffbea'); txt(x, '6:58', 540, 762, 44, HOT.ink) },
  front: (x, t, T, rp, rc) => {  },
  cues: [...[0.2, 0.6, 1.0, 1.4, 1.8, 2.2].map(a => ['tick', a, 0.015]), ['pop', LAST + 0.5, 880, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION } = EP
