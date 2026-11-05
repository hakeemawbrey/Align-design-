// ksre10: FALLING IN LOVE: SPEEDRUN · Capricorn: Love, Scheduled (17 s vertical, star_talk post, Month 2 boost m03)
// music: cinematic · Eb. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Capricorn mid-stamp on a packed calendar, the block FALL IN LOVE: LATER slamming in; the hook line.
//   0.1   screen shake · 1.2 more blocks pile in · 3.2 notification: "free saturday?" · 4.2 glitch: NO FREE SLOT FOUND
//   5.6   Capricorn stares; Pisces crying "move SOMETHING" · 7.2 drags OPTIONAL PLANNING SYNC off the calendar
//   8.2   "yes." · FIND A FREE SLOT gold · SAY YES gold · 9.6 SATURDAY ♡ stamps in · 10.4 achievement
//   15.4  "Moved one meeting. | Worth it." · cut 17.0.
import { makeRun, splitCues, fmtClock, runAt, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK } from '../../ksre01/srkit.js'

const D = 17
const T = { stamp: 0, more: 1.2, ask: 3.2, err: 4.2, stare: 5.6, beg: 6.0, drag: 7.2, yes: 8.2, s3: 8.6, s4: 9.0, sat: 9.6, ach: 10.4, last: 15.4 }
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
// [day, row, label, colour, t]
const BLOCKS = [
  [0, 0, 'WORK', '#6fb8ff', -1], [1, 0, 'WORK', '#6fb8ff', -1], [2, 0, 'WORK', '#6fb8ff', -1], [3, 0, 'WORK', '#6fb8ff', -1], [4, 0, 'WORK', '#6fb8ff', -1],
  [0, 1, 'GYM', GREEN, -1], [2, 1, 'GYM', GREEN, -1], [4, 1, 'GYM', GREEN, -1],
  [6, 0, 'LOVE: LATER', PINK, 0],
  [1, 1, 'MEAL PREP', '#ffb86f', 1.25], [3, 1, 'TAXES', '#c9a6ff', 1.45], [6, 1, 'PLAN THE PLAN', '#c9a6ff', 1.65], [0, 2, 'ADMIN', '#6fb8ff', 1.85], [1, 2, 'ADMIN', '#6fb8ff', 2.0], [2, 2, 'CALL MOM', GREEN, 2.15], [3, 2, 'ADMIN', '#6fb8ff', 2.3], [4, 2, 'LAUNDRY', '#ffb86f', 2.45], [6, 2, 'REST?', '#8f88ad', 2.6],
]
const MEET = [5, 1, 'OPTIONAL SYNC', '#ff8a96']
const SPLITS = [
  { name: 'MET THEM', at: -1, time: 'Q1 WK2', state: 'gold', delta: '' },
  { name: 'THEY TEXTED', at: T.ask, time: 'Q1 WK3', state: 'gold', delta: '' },
  { name: 'FIND A FREE SLOT', at: T.s3, time: 'Q1 WK3', state: 'green', delta: '' },
  { name: 'SAY YES', at: T.s4, time: 'Q1 WK3', state: 'gold', delta: 'PB' },
]
const timer = t => ({ text: t < T.s4 ? `Q3 · WK ${t < T.yes ? 38 : 3}` : 'THIS SAT', col: t > T.s4 ? GOLD : t > T.err ? RED : '#9fe6b0', sub: t < T.drag ? 'CALENDAR: FULL' : t < T.s4 ? 'SLOT FOUND' : 'AHEAD OF SCHEDULE', subCol: t < T.drag ? RED : t > T.s4 ? GOLD : undefined })
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 1, look: [-1, 0.8] }
  if (t < T.drag) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 3, say: 'move SOMETHING', sayAt: T.beg, sayEnd: T.drag + 0.4, sayX: 690, sayY: 650 }
  return { mood: t > T.s4 ? 'heart' : 'sparkle', tears: 3, look: [-1, 0.6], hops: [T.yes, T.s4, T.sat] }
}
const CAL = { x: 100, y: 750, w: 880, h: 330 }
function calendar(x, t, S) {
  S.pbox(x, CAL.x, CAL.y, CAL.w, CAL.h, '#f4eefc', { b: 8 })
  const cw = (CAL.w - 24) / 7
  DAYS.forEach((d, i) => {
    const glow = i === 5 && t > T.sat ? 0.4 + 0.2 * Math.sin(t * 6) : 0
    if (glow) { x.fillStyle = `rgba(255,143,177,${glow})`; x.fillRect(CAL.x + 12 + i * cw, CAL.y + 12, cw - 4, CAL.h - 24) }
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = i === 5 ? RED : '#6a6290'; x.fillText(d, CAL.x + 12 + i * cw + cw / 2, CAL.y + 34)
    x.fillStyle = 'rgba(27,18,54,0.12)'; x.fillRect(CAL.x + 12 + i * cw + cw - 3, CAL.y + 56, 2, CAL.h - 70)
  })
  const block = (d, r, lab, col, k, dx = 0, dy = 0, rot = 0) => {
    if (k <= 0.01) return
    const bx = CAL.x + 16 + d * cw + cw / 2 + dx, by = CAL.y + 98 + r * 84 + dy
    x.save(); x.translate(bx, by); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-cw / 2 + 2, -34, cw - 8, 68); x.fillStyle = col; x.fillRect(-cw / 2 + 6, -30, cw - 16, 60)
    x.font = `800 17px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    const words = lab.split(' '); if (words.length > 1 && x.measureText(lab).width > cw - 24) { x.fillText(words.slice(0, Math.ceil(words.length / 2)).join(' '), -2, -10); x.fillText(words.slice(Math.ceil(words.length / 2)).join(' '), -2, 12) } else x.fillText(lab, -2, 1)
    x.restore()
  }
  const fly = ease.inCubic(prog(t, T.ach + 2.4, T.ach + 3.0))
  for (const [d, r, lab, col, t0] of BLOCKS) { const f = lab === 'PLAN THE PLAN' ? fly : 0; block(d, r, lab, col, (t0 < 0 ? 1 : t0 === 0 ? (t < 0.25 ? 1.35 - t * 1.4 : 1) : pop01(t, t0, 0.2, 2.6)) * (1 - prog(t, T.ach + 2.9, T.ach + 3.0)) ** (f > 0 ? 1 : 0), f * 500, -f * 600, f * 1.4) }
  // the optional sync (dragged off at T.drag)
  const dg = ease.inCubic(prog(t, T.drag, T.drag + 0.6))
  block(MEET[0], MEET[1], MEET[2], MEET[3], pop01(t, 1.1, 0.2, 2.6) * (1 - prog(t, T.drag + 0.5, T.drag + 0.7)), dg * 700, -dg * 500, dg * 1.2)
  block(5, 0, 'WORK?', '#8f88ad', pop01(t, 2.75, 0.2, 2.6) * (t < T.sat ? 1 : 0))
  if (t > T.sat) { block(5, 0, 'DATE ♡', PINK, pop01(t, T.sat, 0.25, 2.8)); block(5, 1, 'DATE ♡', PINK, pop01(t, T.sat + 0.1, 0.25, 2.8)) }
}
function world(x, t, S) {
  S.level(x, t, { theme: 'room', floor: 1300 })
  calendar(x, t, S)
  let mood = 'squint', look = [1, -1], cx = 260, sq = 0, cy = 1190
  if (t < 0.25) { cy -= 30 * (1 - t / 0.25); sq = 0.12 }
  if (t > T.ask) { mood = 'wide'; look = [1, -1] }
  if (t > T.err) { mood = 'wide' }
  if (t > T.stare) { mood = 'squint'; look = [1, -1] }
  if (t > T.drag) { mood = 'neutral' }
  if (t > T.yes) mood = 'happy'
  if (t > T.sat) mood = 'heart'
  S.shadow(x, cx, 1302, 200)
  S.star(x, t, { id: 'capricorn', x: cx, y: cy, s: 200, mood, look, squash: sq, seed: 4, hops: [T.more, T.drag, T.yes, T.sat] })
  S.bubble(x, t, 470, 1150, T.yes, T.ach + 1.2, 'yes.', { size: 44, tail: -0.8 })
  S.bubble(x, t, 760, 1140, T.ach + 1.4, T.ach + 2.8, 'see you saturday!!', { size: 34, col: '#ffd9e8', tail: 0.6 })
  S.bubble(x, t, 430, 1150, T.ach + 3.0, T.last - 0.3, 'free time? groundbreaking.', { size: 30, tail: -0.8 })
  S.star(x, t, { id: 'gemini', x: 860, y: 1210, s: 160, mood: t > T.yes ? 'heart' : 'happy', look: [-1, -0.3], seed: 9, pop: pop01(t, T.ask, 0.3, 2.2), hops: [T.ask + 0.1, T.yes + 0.3] })
}
function over(x, t, S) { void x; void t; void S }
const HOOK = { at: -1, text: 'CAPRICORN BOOKED LOVE | *for later.*', top: 600, size: 96, out: [2.9, 3.15] }
const SHK = { at: 0.08, len: 0.45, amp: 24 }
const NOTIF = { at: T.ask, out: [T.err - 0.1, T.err + 0.1], title: 'texts', body: 'Gemini: free *saturday?*', glyph: '♊', time: 'now', y: 600 }
const GL = { at: T.err, len: 1.3, text: 'CALENDAR.EXE: no *free slot* found', buttons: ['OK', 'OK'] }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'made *time* on purpose', y: 1520 }
const LAST = { at: T.last, text: 'Moved one meeting. | *Worth it.*', top: 600, size: 104 }
const EP = makeRun({
  id: 'ksre10', duration: D, runner: 'capricorn', category: 'SCHEDULED%',
  fx: [['screenShake', SHK], ['slamTitle', HOOK, true], ['notification', NOTIF], ['glitch', GL], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: t => t < T.ask ? 1 : t < T.s3 ? 2 : 3, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['tom', 0.02, 95, { gain: 0.3, decay: 0.3 }], ['tick', 0.02, 0.08],
  ...BLOCKS.filter(b => b[4] > 0).map(b => ['tick', b[4], 0.05]), ['tick', 1.1, 0.05], ['tick', 2.75, 0.05],
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['whoosh', T.drag, 0.6, 0.07], ['pop', T.yes, 880, 0.05, -0.2], ['bell', T.sat, 1760, 0.05, 1.0, 0], ['pop', T.sat + 0.1, 1318.51, 0.04, 0], ['glitter', T.sat, T.sat + 0.6], ['pop', T.ach + 1.4, 1174.66, 0.04, 0.3], ['whoosh', T.ach + 2.4, 0.6, 0.06], ['pop', T.ach + 3.0, 880, 0.04, -0.2],
]
void [BONE, BLUE, fmtClock, runAt, lerp, clamp, outK]
