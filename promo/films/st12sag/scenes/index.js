// st12sag — Star Talk S12 "Hot Takes" E48 (15 s vertical, music: synthwave · Em). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Sagittarius isn't scared | of *commitment*."  ♐ Sagittarius (left, mid-smirk) with a big backpack under
//          a road sign ADVENTURES →. HEAT 4/5.
//   2.6    OBJECTION! ♉ Taurus: "then *unpack* the bag."
//   last   "Free, | and *here*."  The sign now reads ADVENTURES → (FOR 2); Taurus wears a matching little backpack.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "then *unpack* the bag." }], verdict: "freedom and commitment can live | together. talk about *both.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const PACK = ['.KKKK.', 'KGGGGK', 'KGYYGK', 'KGGGGK', 'KGGGGK', '.KKKK.']

const EP = hotEpisode({
  numeral: 'S12 E48', duration: 15, key: 'Em',
  take: { text: "Sagittarius isn't scared | of *commitment*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('sagittarius', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, PACK, { K: HOT.ink, G: '#3f8a5a', Y: HOT.gold }, r.x - r.size * 0.62, r.y - r.size * 0.25, 16) } }),
  con: castSign('taurus', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t > T.last + 0.3) bits(x, PACK, { K: HOT.ink, G: '#3f8a5a', Y: HOT.gold }, r.x + r.size * 0.32, r.y - r.size * 0.2, 11) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Free, | and *here*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { card(x, 540, 800, 420, 110, '#2a8a4a', HOT.ink); R(x, '#5a5470', 532, 860, 16, 300)
    txt(x, t > T.last + 0.3 ? 'ADVENTURES → (FOR 2)' : 'ADVENTURES →', 540, 802, 36, '#fffbea') },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.3, 1318.51, 0.035, 0.3], ['glitter', LAST + 0.3, LAST + 0.8]],
})
export const { SCENES, CUES, DURATION } = EP
