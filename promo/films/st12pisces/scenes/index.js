// st12pisces — Star Talk S12 "Hot Takes" E51 (15 s vertical, music: dreamy · Db). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Pisces aren't too soft. | Soft is *strong*."  ♓ Pisces (left, mid-smirk) holds a pixel flower. HEAT 4/5.
//   2.6    OBJECTION! ♑ Capricorn: "toughen *up.* feelings are slow."
//   last   "Soft. *Strong*. | Both."  Capricorn holds the flower now, smiling (rewatch: a second bud opens on the stem).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "toughen *up.* feelings are slow." }], verdict: "gentleness takes courage. | so does saying *no.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..', '..G..']
const BUD = ['.P.P.', 'PPYPP', '.PPP.']

const EP = hotEpisode({
  numeral: 'S12 E51', duration: 15, key: 'Db',
  take: { text: "Pisces aren't too soft. | Soft is *strong*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('pisces', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { if (t < T.last) bits(x, FLOWER, { P: '#ff8fc8', Y: HOT.gold, G: '#5fb84f' }, r.x + r.size * 0.4, r.y - r.size * 0.3, 15) } }),
  con: castSign('capricorn', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t >= T.last) { bits(x, FLOWER, { P: '#ff8fc8', Y: HOT.gold, G: '#5fb84f' }, r.x - r.size * 0.7, r.y - r.size * 0.3, 15); if (t > T.last + 0.8) bits(x, BUD, { P: '#ffc0e0', Y: HOT.gold }, r.x - r.size * 0.7 + 30, r.y - r.size * 0.3 + 40, 9) } } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Soft. *Strong*. | Both.", gap: 0.1 },
  moods: { con: [[LAST + 0.2, { mood: 'happy', look: [-1, 0], blush: 1 }]] },
  back: (x, t, T) => {  },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.2, 1108.73, 0.035, 0.3], ['bell', LAST + 0.8, 1661.22, 0.02, 0.8, 0.3]],
})
export const { SCENES, CUES, DURATION } = EP
