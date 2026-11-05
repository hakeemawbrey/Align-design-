// ksre13: FALLING IN LOVE: SPEEDRUN · Taurus × Libra: Co-op, Nobody Texts First (18 s vertical, star_talk post, Month 2 boost m03)
// music: lofi · Db. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: split screen, both runners mid-hover over SEND, two P1/P2 timers ticking; the hook line.
//   0.3   whip zoom · 1.4 both type · 2.4 both delete · 3.6 both type again · 4.8 both put the phone down
//   6.0   Pisces crying "they BOTH want to" · 8.4 a 3-2-1 countdown · 10.2 both hit SEND in the same frame
//   10.4  the two "hi" bubbles fly to the middle and collide · CO-OP gold · 11.8 achievement · 14.4 last line · 17.6 loop.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, glyphOf } from '../../ksre01/srkit.js'

const D = 18
const T = { whip: 0.3, type1: 1.4, del: 2.4, type2: 3.6, down: 4.8, beg: 6.0, up: 7.6, cd: 8.4, send: 10.2, hit: 10.7, s: 11.0, ach: 11.8, last: 14.4 }
const SPLITS = [
  { name: 'SWAPPED NUMBERS', at: -1, time: '0:00.50', state: 'gold', delta: '' },
  { name: 'WAIT FOR THEM TO TEXT', at: -1, time: 'BOTH', state: 'red', delta: '+∞' },
  { name: 'TEXT FIRST (CO-OP)', at: T.s, time: '0:12.20', state: 'gold', delta: 'PB' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 1.2], [D, 1.2 + D]], t)), col: t > T.s ? GOLD : GREEN, sub: t > T.s ? 'CO-OP CLEAR' : 'CO-OP · 2 PLAYERS', subCol: t > T.s ? GOLD : undefined })
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.send) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 3, say: 'they BOTH want to', sayAt: T.beg, sayEnd: T.cd - 0.1, sayX: 690, sayY: 650 }
  return { mood: 'heart', tears: 3, look: [-1, 0.6], hops: [T.hit, T.s] }
}
const draftAt = t => {
  if (t < T.type1) return 'hi'
  if (t < T.del) return 'hey!! how are'.slice(0, Math.floor(clamp((t - T.type1) / 0.7) * 13))
  if (t < T.type2) return 'hey!! how are'.slice(0, Math.floor(13 * (1 - clamp((t - T.del) / 0.5))))
  if (t < T.down) return 'so I was think'.slice(0, Math.floor(clamp((t - T.type2) / 0.7) * 14))
  if (t < T.up) return ''
  if (t < T.send) return 'hi'
  return ''
}
function half(x, t, S, side) {
  const cx = side < 0 ? 270 : 810, id = side < 0 ? 'taurus' : 'libra'
  // phone + draft bar
  const down = t > T.down && t < T.up ? ease.inOutCubic(prog(t, T.down, T.down + 0.4)) * (1 - ease.inOutCubic(prog(t, T.up - 0.4, T.up))) : 0
  const py = 940 + down * 260
  S.pbox(x, cx - 130, py - 150, 260, 300, '#2a2148', { b: 7 })
  x.fillStyle = '#120c2a'; x.fillRect(cx - 112, py - 132, 224, 264)
  x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(side < 0 ? '♎︎ Libra' : '♉︎ Taurus', cx, py - 108)
  S.pbox(x, cx - 104, py + 60, 208, 56, '#f4eefc', { b: 5 })
  const d = draftAt(t)
  x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK; x.fillText(d, cx - 92, py + 89)
  if (Math.sin(t * 12) > 0 && t < T.send) x.fillRect(cx - 90 + x.measureText(d).width, py + 74, 3, 30)
  // the send button, the hovering thumb
  const hover = t < T.type1 || (t > T.up && t < T.send)
  x.fillStyle = hover ? GOLD : BLUE; x.fillRect(cx + 60, py + 66, 38, 44)
  if (hover) { const bob = 10 * Math.sin(t * 9 + side); x.fillStyle = INK; x.fillRect(cx + 62, py + 120 + bob, 36, 50); x.fillStyle = side < 0 ? '#f6d27a' : '#f2a6e8'; x.fillRect(cx + 66, py + 124 + bob, 28, 42) }
  if (t > T.send && t < T.send + 0.15) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - 130, py - 150, 260, 300) }
  // the runner
  let mood = 'squint', look = [0, -1]
  if (t > T.del && t < T.type2) mood = 'wide'
  if (t > T.down && t < T.up) { mood = 'sleepy'; look = [0, 0] }
  if (t > T.cd) mood = 'squint'
  if (t > T.hit) { mood = 'heart'; look = [-side, -0.5] }
  S.shadow(x, cx - side * 70, 1302, 170)
  S.star(x, t, { id, x: cx - side * 70, y: 1220, s: 180, mood, look, seed: side < 0 ? 2 : 7, hops: [T.send, T.hit, T.s] })
  // the P1 / P2 mini timer
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = side < 0 ? '#f6d27a' : '#f2a6e8'
  x.fillText(`${side < 0 ? 'P1' : 'P2'} ${fmtClock(1.2 + t)}`, cx, 1370)
}
function world(x, t, S) {
  S.level(x, t, { theme: 'room', floor: 1300 })
  for (const sd of [-1, 1]) { x.save(); x.beginPath(); x.rect(sd < 0 ? 0 : 544, 0, 536, 1920); x.clip(); half(x, t, S, sd); x.restore() }
  x.fillStyle = INK; x.fillRect(536, 770, 8, 530); x.fillStyle = GOLD; x.fillRect(538, 770, 4, 530)
  // the two "hi" bubbles fly in and collide in the middle
  if (t > T.send) {
    const f = ease.inCubic(prog(t, T.send, T.hit))
    const bounce = t > T.hit ? 30 * Math.exp(-(t - T.hit) * 5) * Math.sin((t - T.hit) * 20) : 0
    S.bubble(x, t, lerp(270, 455, f) - bounce, 700, T.send, T.last - 0.2, 'hi', { size: 50, col: '#9fd0ff', tail: -0.3 })
    S.bubble(x, t, lerp(810, 625, f) + bounce, 700, T.send, T.last - 0.2, 'hi', { size: 50, col: '#ffd9e8', tail: 0.3 })
    if (t > T.hit) { S.heartBits(x, 540, 630 - 60 * prog(t, T.hit, T.hit + 1.2), 9, PINK, outK(t, [T.hit + 1, T.hit + 1.3])); S.txt(x, 'BONK', 540, 790, { size: 44, col: GOLD, scale: pop01(t, T.hit, 0.15, 2.8) * outK(t, [T.hit + 0.6, T.hit + 0.8]) }) }
  }
}
const CHAT = ['JUST SEND', 'send it!!', 'SOMEONE SEND', 'they are both typing', 'HELLO??', 'JUST SEND']
function over(x, t, S) {
  for (const sd of [-1, 1]) S.stamp(x, 'DELETED', sd < 0 ? 270 : 810, 960, pop01(t, T.del + 0.5, 0.2, 2.8) * outK(t, [T.type2 - 0.2, T.type2]), { size: 46, col: RED, rot: sd * 0.08 })
  if (t > T.down && t < T.cd) for (let i = 0; i < 7; i++) { const ph = ((t * 0.5 + i / 7) % 1); S.txt(x, CHAT[(i + Math.floor(t * 0.5 + i / 7) * 2) % CHAT.length], 100 + (i % 3) * 330, 1720 - ph * 280, { size: 28, font: MONO, weight: 700, col: i % 2 ? GOLD : '#cfc8ef', align: 'left', alpha: Math.sin(Math.PI * ph) * 0.9, ls: 1 }) }
}
const HOOK = { at: -1, text: 'TWO RUNNERS. | *Nobody texts first.*', top: 630, size: 92, out: [1.2, 1.4] }
const WHIP = { at: T.whip, len: 0.45, from: 1.4, cx: 540, cy: 1000 }
const COUNT = { at: T.cd, from: 3, gap: 0.45, go: 'SEND!', y: 980 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], title: 'CO-OP ACHIEVEMENT', text: 'texted first. *together.*', y: 1520 }
const LAST = { at: T.last, text: 'Same second. | *Same “hi.”*', top: 620, size: 104, out: [17.3, 17.55] }
const EP = makeRun({
  id: 'ksre13', duration: D, runner: 'taurus', runnerLabel: 'TAURUS × LIBRA', category: 'CO-OP%', label: 'FALLING FOR EACH OTHER',
  fx: [['slamTitle', HOOK, true], ['whipZoom', WHIP], ['countdown', COUNT], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: () => 2, ending: { type: 'loop', len: 0.4 },
  camera: t => ({ zoom: 1, dx: shake(t, T.hit, 14) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
const typing = (a, n, d) => Array.from({ length: n }, (_, i) => ['tick', +(a + i * d / n).toFixed(3), 0.025])
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ...typing(T.type1, 13, 0.7), ...typing(T.del, 13, 0.5), ...typing(T.type2, 14, 0.7), ['whoosh', T.down, 0.4, 0.04], ['whoosh', T.up - 0.4, 0.4, 0.04],
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['whoosh', T.send, 0.4, 0.06], ['pop', T.send, 1318.51, 0.05, -0.4], ['pop', T.send, 1318.51, 0.05, 0.4], ['tom', T.hit, 120, { gain: 0.28, decay: 0.3 }], ['pop', T.hit, 1760, 0.05, 0], ['glitter', T.hit, T.hit + 0.7],
]
void [GREEN, lerp]
