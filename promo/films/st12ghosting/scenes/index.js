// st12ghosting — Star Talk S12 "Hot Takes" E46 (15 s vertical, music: screwed · C#m). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Ghosting is never the | *chill* option."  ♍ Virgo (left, mid-smirk) taps an unanswered chat. HEAT 5/5.
//   2.6    OBJECTION! A pale star slides in and keeps fading: "i was just gonna… *fade.*"
//   last   "Two lines. | *Kind* ones."  The star is solid again and its message lands: "hey, not for me. thank you ♡".
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "i was just gonna… *fade.*" }], verdict: "one kind 'not for me' text | is enough. it's a *gift.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E46', duration: 15, key: 'C#m',
  take: { text: "Ghosting is never the | *chill* option.", out: [2.5, 2.65] },
  heat: { level: 5, at: -1 },
  pro: castSign('virgo', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: { name: 'THE FADER', color: '#c9c2e0', glyph: null, textColor: '#d8d0ff', x: 800, y: 1170, size: 330, seed: 7 },
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Two lines. | *Kind* ones.", gap: 0.1 },
  moods: { con: [[0, { mood: 'sleepy', zzz: false }], [OBJ + 1.0, { mood: 'sleepy', zzz: false, alpha: 0.8 }], [OBJ + 2.0, { mood: 'sleepy', zzz: false, alpha: 0.6 }], [OBJ + 3.0, { mood: 'sleepy', zzz: false, alpha: 0.4 }], [LAST, { mood: 'happy', alpha: 1, look: [-1, 0] }]] },
  back: (x, t, T) => { const cx = 540, cy = 810
    card(x, cx, cy, 560, 200, '#140c2c', HOT.bone)
    R(x, '#d8d0ff', cx - 250, cy - 70, 300, 40); txt(x, 'had fun tonight!', cx - 235, cy - 49, 24, HOT.ink, 'left')
    if (t < T.last + 0.4) txt(x, 'seen 3 days ago', cx + 240, cy - 10, 22, '#8a80a8', 'right')
    else { R(x, '#c8f2e0', cx - 30, cy - 10, 280, 70); txt(x, 'hey, not for me.', cx - 15, cy + 10, 22, HOT.ink, 'left'); txt(x, 'thank you ♡', cx - 15, cy + 40, 22, HOT.ink, 'left') } },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.4, 1108.73, 0.035, 0], ['bell', LAST + 0.45, 1661.22, 0.02, 0.8, 0]],
})
export const { SCENES, CUES, DURATION } = EP
