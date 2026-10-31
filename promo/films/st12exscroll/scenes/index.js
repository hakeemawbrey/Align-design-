// st12exscroll — Star Talk S12 "Hot Takes" E37 (20 s vertical, music: screwed · C#m). Story 0–15.6, then the end card.
//   0.00   🔥 HOT TAKE "Checking your ex's profile | is *not* closure."  ♏ Scorpio (left, mid-smirk) sets its phone face-down;
//          a wall clock reads 2:07 A.M. HEAT 5/5.
//   2.6    OBJECTION! ♓ Pisces floats in, scrolling a glowing phone. Two lines, then THE VERDICT.
//   last   "Close the *app*. | Open your life."  Pisces taps MUTE; the clock jumps to 10:00 A.M. (rewatch bait), sunlight.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "just one more scroll. for *closure.*" }, { who: "pro", text: "that's the *opposite* of closure." }], verdict: "closure comes from you, not their feed. | mute it, then *rest.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const PHONE = ['KKKKKK', 'KLLLLK', 'KLLLLK', 'KLLLLK', 'KLLLLK', 'KLLLLK', 'KKWWKK', 'KKKKKK']

const EP = hotEpisode({
  numeral: 'S12 E37', duration: 20, key: 'C#m',
  take: { text: "Checking your ex's profile | is *not* closure.", out: [2.5, 2.65] },
  heat: { level: 5, at: -1 },
  pro: castSign('scorpio', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, PHONE, { K: HOT.ink, L: '#3a2e5a', W: '#5a5470' }, r.x + r.size * 0.34, r.y + r.size * 0.0, 15) } }),
  con: castSign('pisces', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { const on = t < T.last; bits(x, PHONE, { K: HOT.ink, L: on ? '#bfe8ff' : '#3a2e5a', W: '#fffbea' }, r.x - r.size * 0.72, r.y - r.size * 0.2, 15); if (on) { const g = x.createRadialGradient(r.x - r.size * 0.45, r.y, 0, r.x - r.size * 0.45, r.y, 160); g.addColorStop(0, 'rgba(160,220,255,0.35)'); g.addColorStop(1, 'rgba(160,220,255,0)'); x.fillStyle = g; x.fillRect(r.x - r.size * 0.45 - 160, r.y - 160, 320, 320) } } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Close the *app*. | Open your life.", gap: 0.1 },
  moods: { con: [[0, { mood: 'sleepy', zzz: false, look: [-1, 1] }], [OBJ + 0.4, { mood: 'squint', look: [-1, 1] }], [LAST + 0.6, { mood: 'happy', look: [-1, 0] }]] },
  back: (x, t, T) => { const am = t > T.last + 0.6; if (am) { const g = x.createLinearGradient(0, 0, 0, 1290); g.addColorStop(0, 'rgba(255,214,140,0.0)'); g.addColorStop(1, 'rgba(255,214,140,0.25)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1290) }
    card(x, 540, 820, 300, 120, '#fffbea'); txt(x, am ? '10:00 AM' : '2:07 AM', 540, 822, 56, am ? '#2a8a4a' : HOT.red) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 800, y: 900, text: 'muted. ♡', at: T.last + 0.5, color: '#d8d0ff' }) },
  cues: [['tick', LAST + 0.5, 0.03], ['bell', LAST + 0.6, 1567.98, 0.025, 1.0, 0]],
})
export const { SCENES, CUES, DURATION } = EP
