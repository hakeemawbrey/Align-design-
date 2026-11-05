// ksre11: FALLING IN LOVE: SPEEDRUN · Aquarius: The Friend Zone Clip (18 s vertical, star_talk post, Month 2 boost m03)
// music: synthwave · F#. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Aquarius mid-clip, half inside a glitching pixel wall labelled FRIENDS; the hook line.
//   1.5   BONK: clip failed · 3.0 again, higher · BONK · 4.4 a running jump · BONK · Pisces sobbing "it's like a movie"
//   6.2   loading bar "what if it ruins everything…" → "Error: scared" · 9.0 the best friend opens a DOOR in the wall
//   9.5   "you could just ask?" · 10.5 "do you… want to go on a date?" · 11.5 "I was hoping you'd ask." · splits gold
//   13.0  achievement · 15.2 "The wall | was a door." · 17.6 loop-back.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK } from '../../ksre01/srkit.js'

const D = 18
const T = { b1: 1.5, j2: 2.6, b2: 3.1, j3: 4.0, b3: 4.6, beg: 4.9, load: 6.2, door: 9.0, ask0: 9.5, ask: 10.5, yes: 11.5, s3: 11.9, s4: 12.3, ach: 13.0, last: 15.2 }
const SPLITS = [
  { name: 'BEST FRIENDS', at: -1, time: '3 YRS', state: 'gold', delta: '' },
  { name: 'CATCH FEELINGS', at: -1, time: '3 YRS 2 MO', state: 'green', delta: '' },
  { name: 'GET PAST "FRIENDS"', at: T.s3, time: 'DOOR', state: 'gold', delta: '' },
  { name: 'ASK', at: T.s4, time: 'TODAY', state: 'gold', delta: 'PB' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 41.2], [D, 41.2 + D]], t)), col: t > T.s4 ? GOLD : t < T.door ? RED : GREEN, sub: t < T.door ? `CLIP ATTEMPTS: ${t > T.b3 ? 4 : t > T.b2 ? 3 : t > T.b1 ? 2 : 1}` : 'NEW ROUTE FOUND', subCol: t < T.door ? RED : GOLD })
const cam = t => {
  if (t < T.b3) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.door) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 3, say: "it's like a MOVIE", sayAt: T.beg, sayEnd: T.load - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.yes ? 'heart' : 'sparkle', tears: 3, look: [-1, 0.6], hops: [T.door, T.yes, T.s4] }
}
const WX = 600
function wall(x, t, S) {
  const open = ease.inOutCubic(prog(t, T.door, T.door + 0.7))
  const gl = t < 1.2 || [T.b1, T.b2, T.b3].some(b => t > b && t < b + 0.25)
  for (let r = 0; r < 14; r++) for (let c = 0; c < 2; c++) {
    const by = 740 + r * 40, bx = WX - 60 + c * 60 + (r % 2 ? -30 : 0)
    const inDoor = by > 1020 && by < 1300 && bx > WX - 70 && bx < WX + 40
    if (inDoor && open > 0) continue
    const j = gl ? Math.round(Math.sin(r * 7 + t * 40) * 6) : 0
    x.fillStyle = INK; x.fillRect(bx + j - 2, by - 2, 64, 44)
    x.fillStyle = (r + c) % 3 ? '#5a4aa0' : '#6b5ab8'; x.fillRect(bx + j, by, 58, 36)
  }
  x.fillStyle = INK; x.fillRect(WX - 92, 1296, 184, 8)
  // the door: swings open (a dark frame + the door panel turning)
  if (open > 0) {
    x.fillStyle = '#120c2a'; x.fillRect(WX - 62, 1020, 124, 280)
    x.fillStyle = INK; x.fillRect(WX - 66, 1016, 132, 6)
    const w = 124 * (1 - open * 0.85)
    x.fillStyle = INK; x.fillRect(WX + 62 - w - 4, 1016, w + 8, 288); x.fillStyle = '#c9855a'; x.fillRect(WX + 62 - w, 1020, w, 280)
    x.fillStyle = GOLD; x.fillRect(WX + 62 - w + 10, 1160, 12, 12)
  }
  // the FRIENDS label, vertical
  x.save(); x.translate(WX, 900); x.font = `900 40px ${INTER}`; x.letterSpacing = '8px'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText('FRIENDS', 3, 3); x.fillStyle = BONE; x.rotate(0); x.fillText('FRIENDS', 0, 0); x.restore()
}
function world(x, t, S) {
  S.level(x, t, { theme: 'night', floor: 1300 })
  wall(x, t, S)
  // Aquarius: clipping / bonking / sitting / walking through the door
  let ax = 470, ay = 1170, rot = 0, mood = 'squint', look = [1, 0], sq = 0, al = 1
  if (t < 1.2) { ax = 540 + 6 * Math.sin(t * 50); mood = 'wide'; rot = 0.1 }
  const bonk = b => { const d = t - b; return d > 0 && d < 0.6 ? d : -1 }
  for (const b of [T.b1, T.b2, T.b3]) { const d = bonk(b); if (d >= 0) { ax = 470 - 140 * Math.sin(Math.min(1, d / 0.35) * Math.PI / 2); rot = -0.4 * (1 - d / 0.6); mood = 'wide'; sq = 0.1 * (1 - d / 0.6) } }
  if (t > T.b1 + 0.6 && t < T.j2) { ax = 330; mood = 'squint' }
  if (t > T.j2 && t < T.b2) { ax = lerp(330, 470, prog(t, T.j2, T.b2)); ay = 1170 - 220 * Math.sin(Math.PI * prog(t, T.j2, T.b2)) }
  if (t > T.b2 + 0.6 && t < T.j3) { ax = 330; mood = 'squint' }
  if (t > T.j3 && t < T.b3) { ax = lerp(200, 470, prog(t, T.j3, T.b3)); ay = 1170 - 80 * Math.sin(Math.PI * prog(t, T.j3, T.b3)); S.speedLines(x, t, ax, 1130, { n: 7 }) }
  if (t > T.b3 + 0.6) { ax = 330; mood = 'neutral'; look = [1, 0.3]; sq = 0.1 }
  if (t > T.load) { mood = 'squint'; look = [0, 1] }
  if (t > T.door) { mood = 'wide'; look = [1, 0]; sq = 0 }
  if (t > T.ask0 + 0.4) { ax = lerp(330, 440, ease.inOutCubic(prog(t, T.ask0 + 0.4, T.ask - 0.1))); mood = 'happy' }
  if (t > T.yes) mood = 'heart'
  if (t > T.s4) { ax = lerp(440, 640, ease.inOutCubic(prog(t, T.ach, T.ach + 0.9))) }
  S.shadow(x, ax, 1302, 210)
  if (t < 1.2) { x.save(); x.beginPath(); x.rect(0, 0, WX - 20, 1920); x.clip() }
  S.star(x, t, { id: 'aquarius', x: ax, y: ay, s: 220, mood, look, rot, squash: sq, alpha: al, seed: 4, hops: [T.yes, T.s4] })
  if (t < 1.2) x.restore()
  // the best friend on the other side
  const fx = t > T.ach ? lerp(720, 860, ease.inOutCubic(prog(t, T.ach, T.ach + 0.9))) : t < T.door + 0.5 ? 840 : lerp(840, 720, ease.inOutCubic(prog(t, T.door + 0.3, T.ask0 + 0.3)))
  S.shadow(x, fx, 1302, 200)
  S.star(x, t, { id: 'leo', x: fx, y: 1180, s: 210, mood: t > T.yes - 0.2 ? 'heart' : t > T.door ? 'happy' : 'neutral', look: [-1, 0], seed: 7, blush: t > T.ask ? 1 : 0, hops: [T.door + 0.1, T.ask0, T.yes] })
  for (const b of [T.b1, T.b2, T.b3]) S.txt(x, 'BONK', WX - 130, 960, { size: 54, col: GOLD, rot: -0.2, scale: pop01(t, b, 0.15, 2.8) * outK(t, [b + 0.5, b + 0.65]) })
  S.bubble(x, t, 760, 960, T.ask0, T.ask - 0.1, 'you could just ask?', { size: 36, col: '#ffd9e8', tail: 0.3 })
  S.bubble(x, t, 380, 960, T.ask, T.yes - 0.05, 'do you… want to go on a date?', { size: 34, tail: -0.2, maxW: 560 })
  S.bubble(x, t, 800, 940, T.yes, T.last - 0.3, "I was hoping you'd ask.", { size: 36, col: '#ffd9e8', tail: 0.3, maxW: 520 })
}
function over(x, t, S) {
  for (const b of [T.b1, T.b2, T.b3]) S.stamp(x, 'CLIP FAILED', 540, 830, pop01(t, b + 0.1, 0.2, 2.8) * outK(t, [b + 0.8, b + 0.95]), { size: 60, col: RED, rot: 0.06 })
}
const HOOK = { at: -1, text: 'AQUARIUS CLIPPED INTO | *the friend zone.*', top: 600, size: 92, out: [1.35, 1.55] }
const GL = { at: -0.3, len: 1.4, dialog: false, amp: 0.7 }
const LOAD = { at: T.load, len: 2.6, label: 'what if it ruins it…', stallAt: 99, error: 'Error: scared', y: 860 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'asked your *best friend* out', y: 1520 }
const LAST = { at: T.last, text: 'The wall | *was a door.*', top: 600, size: 116, out: [17.3, 17.55] }
const EP = makeRun({
  id: 'ksre11', duration: D, runner: 'aquarius', category: 'FRIENDS TO MORE%',
  fx: [['glitch', GL], ['slamTitle', HOOK, true], ['loadingBar', LOAD], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: t => t < T.s3 ? 2 : 3, ending: { type: 'loop', len: 0.4 },
  camera: t => ({ zoom: 1, dx: [T.b1, T.b2, T.b3].reduce((a, b) => a + shake(t, b, 16), 0) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ...[T.b1, T.b2, T.b3].flatMap(b => [['tom', b, 120, { gain: 0.3, decay: 0.25 }], ['pop', b, 330, 0.05, 0], ['pluck', b + 0.1, 233.08, 0.04, 0.3, 0]]),
  ['whoosh', T.j2, 0.5, 0.05], ['whoosh', T.j3, 0.6, 0.06], ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['pluck', T.door, 146.83, 0.05, 0.8, 0], ['pluck', T.door + 0.25, 164.81, 0.045, 0.8, 0], ['bell', T.door + 0.6, 1760, 0.04, 1, 0],
  ['pop', T.ask0, 1174.66, 0.04, 0.3], ['pop', T.ask, 880, 0.045, -0.2], ['pop', T.yes, 1318.51, 0.05, 0.3], ['glitter', T.yes, T.yes + 0.7],
]
void [PINK, GREEN, BLUE, MONO, clamp]
