// ksre08: FALLING IN LOVE: SPEEDRUN · Scorpio: Playing It Cool (17 s vertical, star_talk post, Month 2 boost m03)
// music: synthwave · C#. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Scorpio mid-turn away from the crush, the picture glitching, a red +0:30 penalty dropping; hook line.
//   1.5   every "act uninterested" move adds time: checks phone (+0:30) · 3.0 "cool." (+0:30) · 4.5 fake yawn (+0:30)
//   6.0   leaves first (+1:00) · 6.6 the crush, sad: "they're not into me" · Pisces bawling.
//   7.8   STRAT TIP: "say it. out loud. once." · 9.6 "I like talking to you." · 10.4 the timer races · SAY IT gold
//   11.2  "wait. me too!!" · 12.0 achievement · 15.2 "Cool is slow. | Honest is fast." · cut 17.0.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, clamp, lerp, prog, ease, pop01, outK } from '../../ksre01/srkit.js'

const D = 17
const T = { p0: 0, p1: 1.5, p2: 3.0, p3: 4.5, p4: 6.0, sad: 6.6, tip: 7.8, turn: 9.4, say: 9.6, race: 10.4, s3: 10.7, me: 11.2, ach: 12.0, last: 15.2 }
const PEN = [[T.p0, '+0:30'], [T.p1, '+0:30'], [T.p2, '+0:30'], [T.p3, '+0:30'], [T.p4, '+1:00']]
const SPLITS = [
  { name: 'NOTICED THEM', at: -1, time: '0:01.20', state: 'gold', delta: '-0:02' },
  { name: 'ACT CASUAL', at: -1, time: '1:40.00', state: 'red', delta: '+1:30' },
  { name: 'SAY IT', at: T.s3, time: '4:10.00', state: 'gold', delta: '' },
]
const KEYS = [[-0.2, 100], [0.3, 130], [T.p1, 132], [T.p1 + 0.3, 162], [T.p2, 164], [T.p2 + 0.3, 194], [T.p3, 196], [T.p3 + 0.3, 226], [T.p4, 228], [T.p4 + 0.3, 288], [T.race, 296], [T.s3, 250]]
const timer = t => ({ text: fmtClock(runAt(KEYS, t)), col: t > T.s3 ? GOLD : RED, sub: t < T.tip ? 'COOL PENALTY ×5' : t < T.s3 ? 'HONEST ROUTE' : 'TIME SAVED', subCol: t < T.tip ? RED : t > T.s3 ? GOLD : undefined, scale: t > T.race && t < T.s3 ? 1.08 : 1 })
const cam = t => {
  if (t < T.p3) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.tip) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 3, say: 'just TELL them', sayAt: T.p3 + 0.2, sayEnd: T.tip - 0.2, sayX: 690, sayY: 650 }
  return { mood: t > T.me ? 'heart' : 'wide', tears: 3, look: [-1, 0.6], hops: [T.say, T.me] }
}
function world(x, t, S) {
  S.level(x, t, { theme: 'night', floor: 1300 })
  // Scorpio
  let sx = 330, mood = 'squint', look = [-1, 0], rot = 0
  if (t < 0.4) rot = -0.18 * (1 - t / 0.4)
  if (t > T.p1 && t < T.p2) { look = [0, 1]; mood = 'neutral' }
  if (t > T.p2 && t < T.p3) { look = [-1, -0.4]; mood = 'squint' }
  if (t > T.p3 && t < T.p4) { mood = 'sleepy' }
  if (t > T.p4) { sx = lerp(330, 160, ease.inOutCubic(prog(t, T.p4, T.p4 + 0.5))); mood = 'neutral'; look = [-1, 0] }
  if (t > T.tip) { mood = 'neutral'; look = [1, 0.3] }
  if (t > T.turn) { sx = lerp(160, 380, ease.inOutCubic(prog(t, T.turn, T.turn + 0.4))); mood = 'happy'; look = [1, 0] }
  if (t > T.me) mood = 'heart'
  S.shadow(x, sx, 1302, 220)
  S.star(x, t, { id: 'scorpio', x: sx, y: 1170, s: 240, mood, look, rot, blush: t > T.say ? 1 : 0, seed: 3, hops: [T.p2, T.turn + 0.1, T.say, T.me + 0.2] })
  // the phone it pretends to check
  if (t > T.p1 && t < T.p2) { S.pbox(x, sx + 70, 1100, 80, 130, '#2a2148', { b: 6 }); x.fillStyle = '#9fe6b0'; x.fillRect(sx + 82, 1112, 56, 90) }
  S.bubble(x, t, sx + 20, 930, T.p2, T.p3 - 0.1, 'cool.', { size: 44, tail: 0 })
  if (t > T.p3 && t < T.p4) S.txt(x, '*fake yawn*', sx, 960, { size: 34, col: BONE })
  // the crush
  let cm = 'happy', cl = [-1, 0]
  if (t > T.p2 + 0.4) cm = 'neutral'
  if (t > T.sad) { cm = 'neutral'; cl = [0, 1] }
  if (t > T.say + 0.3) { cm = 'wide'; cl = [-1, 0] }
  if (t > T.me) cm = 'heart'
  S.shadow(x, 800, 1302, 210)
  S.star(x, t, { id: 'gemini', x: 800, y: 1180, s: 220, mood: cm, look: cl, seed: 9, squash: t > T.sad && t < T.say ? 0.08 : 0, hops: [T.me, T.me + 0.3] })
  S.bubble(x, t, 780, 960, T.sad, T.tip + 1.4, "they're not into me…", { size: 32, col: '#d9d3ff', tail: 0.1 })
  S.bubble(x, t, 400, 930, T.say, T.ach + 1.5, 'I like talking to you.', { size: 38, tail: -0.1 })
  S.bubble(x, t, 780, 1000, T.me, T.last - 0.3, 'wait. me too!!', { size: 40, col: '#ffd9e8', tail: 0.1 })
  if (t > T.me) S.heartBits(x, 590, 990 - 40 * prog(t, T.me, T.me + 1.2), 9, PINK, outK(t, [T.me + 1.1, T.me + 1.4]))
}
function over(x, t, S) {
  PEN.forEach(([a, s], i) => {
    const k = a <= 0 ? (t < 0.9 ? 1 : 0) : pop01(t, a, 0.2, 2.8) * outK(t, [a + 0.9, a + 1.1])
    const yy = a <= 0 ? 975 : lerp(820, 900, ease.outCubic(prog(t, a, a + 0.3)))
    S.stamp(x, s, 760, yy, k * (a <= 0 ? 1 : 1), { size: 64, col: RED, rot: 0.08 - i * 0.03, font: 'Space Mono' })
  })
  S.toast(x, t, T.tip, T.say - 0.1, 'STRAT TIP', 'say it. out loud. once.', { cy: 900, col: '#7fd0ff', icon: 'star' })
  S.stamp(x, '▶▶ TIME SAVED', 540, 850, pop01(t, T.race, 0.2, 2.8) * outK(t, [T.me - 0.1, T.me + 0.1]), { size: 56, col: GOLD, rot: -0.05, font: 'Space Mono' })
}
const HOOK = { at: -1, text: 'PLAYING IT COOL | *adds time.*', top: 612, size: 112, out: [2.0, 2.2] }
const GL = { at: -0.35, len: 0.9, dialog: false, amp: 0.7 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'dropped the *act*', y: 1520 }
const LAST = { at: T.last, text: 'Cool is slow. | *Honest is fast.*', top: 620, size: 108 }
const EP = makeRun({
  id: 'ksre08', duration: D, runner: 'scorpio', category: 'ACT NATURAL%',
  fx: [['glitch', GL], ['slamTitle', HOOK, true], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: () => 2, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: PEN.slice(1).reduce((a, [p]) => a + shake(t, p, 12), 0) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ...PEN.slice(1).flatMap(([a]) => [['pluck', a, 233.08, 0.05, 0.3, 0], ['pluck', a + 0.1, 220, 0.05, 0.35, 0], ['tom', a, 82, { gain: 0.22, decay: 0.3 }]]),
  ['pluck', T.p3 + 0.2, 440, 0.035, 0.5, 0.4], ['pluck', T.p3 + 0.4, 415.3, 0.035, 0.5, 0.4], ['pluck', T.sad, 330, 0.035, 0.6, 0.3],
  ['bell', T.tip, 1318.51, 0.04, 0.9, 0], ['whoosh', T.turn, 0.4, 0.05], ['pop', T.say, 880, 0.045, -0.2],
  ['riser', T.race - 0.3, T.s3, 0.04], ['whoosh', T.race, 0.5, 0.06], ['pop', T.me, 1174.66, 0.05, 0.3], ['pop', T.me + 0.1, 1567.98, 0.04, 0.3], ['glitter', T.me, T.me + 0.7],
]
void [BLUE, GREEN, MONO, INK, clamp]
