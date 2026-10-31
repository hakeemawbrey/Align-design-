// st12libra — Star Talk S12 "Hot Takes" E50 (15 s vertical, music: jazzy · F#m). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Libras aren't indecisive. | They're *fair*."  ♎ Libra (left, mid-smirk) balances two menus on its scales.
//          HEAT 3/5.
//   2.6    OBJECTION! ♈ Aries: "just PICK a *restaurant.*"
//   last   "Weigh it. | Then *pick*."  One menu drops: the board above reads TONIGHT: NOODLES ✓ (rewatch: a coin spins all episode).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "just PICK a *restaurant.*" }], verdict: "weighing things is kind. so is | choosing, then *trusting* it." })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const SCALES = ['....K....', 'KKKKKKKKK', 'K...K...K', 'K...K...K', 'GGG.K.GGG', '....K....', '...KKK...']

const EP = hotEpisode({
  numeral: 'S12 E50', duration: 15, key: 'F#m',
  take: { text: "Libras aren't indecisive. | They're *fair*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('libra', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { const done = t > T.last + 0.2, tip = done ? 0.25 : Math.sin(t * 2.4) * 0.15; x.save(); x.translate(r.x + r.size * 0.55, r.y - r.size * 0.12); x.rotate(tip); bits(x, SCALES, { K: HOT.ink, G: HOT.gold }, -58, -45, 13); R(x, '#fffbea', -66, -88, 50, 46); if (!done) R(x, '#ffe0c0', 22, -88, 50, 46); x.restore() } }),
  con: castSign('aries', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Weigh it. | Then *pick*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { card(x, 540, 800, 460, 110, '#140c2c', HOT.bone); const done = t > T.last + 0.2
    txt(x, done ? 'TONIGHT: NOODLES ✓' : 'TONIGHT: ???', 540, 802, 38, done ? '#7dffb0' : HOT.gold)
    const sp = Math.abs(Math.cos(t * 9)); R(x, HOT.gold, 820 - 18 * sp, 760, 36 * sp + 2, 36) },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.2, 1108.73, 0.035, -0.3], ['tick', LAST + 0.25, 0.03]],
})
export const { SCENES, CUES, DURATION } = EP
