// st12aquarius — Star Talk S12 "Hot Takes" E52 (15 s vertical, music: synthwave · Gm). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Aquarius isn't cold. | It's just *thinking*."  ♒ Aquarius (left, mid-smirk) under a thought bubble of
//          turning gears. HEAT 3/5.
//   2.6    OBJECTION! ♋ Cancer holds out a hug: "cold. *frosty.* where's my hug?"
//   last   "Ask how | they *care*."  The gears were drawing a star map: Aquarius hands it over, MADE YOU THIS; Cancer heart-eyed.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "cold. *frosty.* where's my hug?" }], verdict: "people show care differently. | ask what theirs *looks like.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E52', duration: 15, key: 'Gm',
  take: { text: "Aquarius isn't cold. | It's just *thinking*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('aquarius', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('cancer', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Ask how | they *care*.", gap: 0.1 },
  moods: { con: [[LAST + 0.3, { mood: 'heart', look: [-1, 0] }]] },
  back: (x, t, T) => { const made = t > T.last + 0.3
    if (!made) { card(x, 330, 790, 260, 160, '#fffbea'); for (let k = 0; k < 2; k++) { x.save(); x.translate(290 + k * 80, 790); x.rotate(t * (k ? -2 : 2)); R(x, '#5a5470', -26, -8, 52, 16); R(x, '#5a5470', -8, -26, 16, 52); x.restore() } }
    else { card(x, 540, 800, 330, 200, '#140c2c', HOT.gold); [[460, 760], [520, 820], [590, 770], [640, 840]].forEach(([a, b], i, arr) => { R(x, HOT.gold, a - 6, b - 6, 12, 12); if (i) { x.strokeStyle = rgba(HOT.gold, 0.6); x.lineWidth = 3; x.beginPath(); x.moveTo(arr[i - 1][0], arr[i - 1][1]); x.lineTo(a, b); x.stroke() } }); txt(x, 'MADE YOU THIS', 540, 880, 24, HOT.bone) } },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.3, 1174.66, 0.035, 0], ['glitter', LAST + 0.3, LAST + 0.8]],
})
export const { SCENES, CUES, DURATION } = EP
