// ksre01: FALLING IN LOVE: SPEEDRUN · Aries: Any%, No Resets (16 s vertical, star_talk post, Month 2 boost m03)
// music: chiptune · E. Hard cut. No end card, no card cut. The show look lives in ../srkit.js.
//   0.0   frame 0: Aries mid-sprint, timer already running, EYE CONTACT flashing gold; "ARIES. ANY%. NO RESETS."
//   0.3   pattern break: colour flash + whip zoom on the runner.
//   0.9   FIRST TEXT 0:02 (gold) · 1.9 "WE SHOULD HANG OUT" 0:03 (gold): the premise lands by 3 s.
//   3.2   the split nobody can skip: WAIT FOR REPLY. Aries skids to a stop; the timer keeps running.
//   4.6   fast-forward (×60, ×600): Aries checks, sleeps, a snail overtakes; Pisces sobbing on cam; "DELIVERED".
//   10.4  ding: "yes!! sorry, phone died". Aries floors it; FIRST DATE gold; RUN COMPLETE.
//   14.6  "Fastest heart. | Slowest reply." · hold · hard cut at 16.0.
import {
  makeRun, clockTimer, fmtClock, runAt, splitCues, wordPops, blips, whip, shake, notif, SNAIL,
  GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, sparkles, drawBits, drawPhone, colOf,
} from '../srkit.js'

const D = 16
const T = {
  flash: 0.3, s1: 0, s2: 0.9, s3: 1.9, stop: 3.2, ff: 4.6, ff2: 6.0, sleep: 6.0, snail: 7.2, sob: 8.6, ding: 10.4,
  go: 10.7, meet: 12.3, s5: 12.6, done: 13.6, last: 14.6,
}
const WAIT_END = 4 * 3600 + 12 * 60 + 9
const KEYS = [[0, 0.8], [T.stop, 4.0], [T.ff, 5.4], [T.ff2, 5.4 + 1.4 * 60], [T.ding, WAIT_END], [T.done, WAIT_END + 3.2]]
const SPLITS = [
  { name: 'EYE CONTACT', at: T.s1, time: '0:00.80', state: 'gold', delta: '-0:01' },
  { name: 'FIRST TEXT', at: T.s2, time: '0:01.70', state: 'gold', delta: '-0:02' },
  { name: 'WE SHOULD HANG OUT', at: T.s3, time: '0:02.70', state: 'gold', delta: '-0:03' },
  { name: 'WAIT FOR REPLY', at: T.ding, time: fmtClock(WAIT_END, { cs: false }), state: 'red', delta: '+4:12' },
  { name: 'FIRST DATE', at: T.s5, time: fmtClock(WAIT_END + 2.2, { cs: false }), state: 'gold', delta: '' },
]
const timer = t => {
  const v = runAt(KEYS, t)
  const done = t >= T.done
  let col = GREEN
  if (t > T.ff) col = RED
  if (done) col = GOLD
  const sub = t < T.ff ? 'PB 0:05.00' : t < T.ff2 ? 'FAST-FORWARD ×60' : t < T.ding ? 'FAST-FORWARD ×600' : done ? 'RUN COMPLETE' : 'GO GO GO'
  return { text: fmtClock(v, { cs: v < 3600 }), col, sub, subCol: t > T.ff && t < T.ding ? RED : done ? GOLD : undefined }
}
const cam = t => {
  if (t < T.stop) return { mood: 'sparkle', tears: 1, look: [-1, 0.6] }
  if (t < T.sob) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.ding) return { mood: 'wide', tears: 3, look: [-1, 0.6], shake: 3, say: 'it’s been FOUR HOURS', sayAt: T.sob + 0.1, sayEnd: T.ding - 0.1, sayX: 690, sayY: 660 }
  return { mood: t > T.s5 ? 'heart' : 'happy', tears: 3, look: [-1, 0.6], hops: [T.ding + 0.1, T.s5, T.done] }
}

function phone(x, t, cx, cy, s, msgs, k) {
  if (k <= 0.01) return
  drawPhone(x, t, { cx, top: cy - 230 * s, w: 300, h: 460, s, title: '♎︎ Libra', msgs, font: 24, alpha: clamp(k) })
}

function world(x, t, S) {
  const run = t < T.stop ? 1 : t < T.go ? 0 : 1
  const stopK = ease.outCubic(prog(t, T.stop - 0.05, T.stop + 0.35))
  // scroll: runs before the stop (with a skid), stands still while waiting, floors it after the ding
  let scroll = t * 1100
  if (t >= T.stop) scroll = T.stop * 1100 + 160 * stopK
  if (t >= T.go) scroll = T.stop * 1100 + 160 + (t - T.go) * 1400 * Math.min(1, (t - T.go) * 3)
  if (t >= T.meet) scroll = T.stop * 1100 + 160 + (T.meet - T.go) * 1400 * Math.min(1, (T.meet - T.go) * 3)
  // night falls while waiting
  const night = clamp(prog(t, T.ff, T.ff2 + 1)) * (1 - clamp(prog(t, T.ding, T.ding + 0.6)))
  S.level(x, t, { theme: 'street', scroll, floor: 1300 })
  if (night > 0) { x.save(); x.fillStyle = `rgba(6,4,22,${0.45 * night})`; x.fillRect(0, 560, 1080, 1360); x.restore() }

  // Aries
  let ax = 400, ay = 1170, mood = 'squint', look = [1, 0], rot = 0, squash = 0
  if (t < T.stop) { rot = 0.12; squash = -0.04 * Math.sin(t * 22) }
  if (t >= T.stop && t < T.go) {
    ax = 400 + 60 * stopK; rot = lerp(0.12, -0.08, stopK) * (1 - prog(t, T.stop + 0.4, T.stop + 0.8)); mood = 'neutral'; look = [0.4, 1]
    if (t > T.stop + 0.4) { mood = 'neutral'; look = [0.3, 1] }
    if (t > T.ff + 0.2) { mood = 'eyeroll' }
    if (t > T.sleep) { mood = 'sleepy'; look = [0, 0] }
    if (t > T.sob + 0.6) { mood = 'neutral'; look = [0.3, 1] }
  }
  if (t >= T.ding) { mood = 'wide'; look = [0.3, 1] }
  if (t >= T.go) { mood = 'squint'; look = [1, 0]; rot = 0.14; squash = -0.05 * Math.sin(t * 24); ax = lerp(460, 360, ease.outCubic(prog(t, T.go, T.go + 0.4))) }
  if (t >= T.meet) { ax = lerp(360, 410, ease.outCubic(prog(t, T.meet, T.meet + 0.3))); rot = 0; squash = 0; mood = t > T.s5 ? 'heart' : 'happy'; look = [1, 0] }
  if (t < T.stop || (t > T.go && t < T.meet)) S.speedLines(x, t, ax, 1120, { n: 10, alpha: t < T.stop ? 1 : clamp((t - T.go) * 4) })
  // the skid: dust puffs
  if (t > T.stop && t < T.stop + 0.7) for (let i = 0; i < 5; i++) { const p = prog(t, T.stop + i * 0.05, T.stop + 0.5 + i * 0.05); if (p <= 0 || p >= 1) continue; x.save(); x.globalAlpha = 0.6 * (1 - p); x.fillStyle = '#cfc8e8'; x.fillRect(ax - 60 - p * 120 - i * 18, 1270 - p * 50 - i * 8, 26, 26); x.restore() }
  S.shadow(x, ax, 1302, 230)
  const sleepBob = t > T.sleep && t < T.sob + 0.6 ? 1 : 0
  S.star(x, t, { id: 'aries', x: ax, y: ay + sleepBob * 8, s: 250, mood, look, rot: rot + sleepBob * 0.05, squash, seed: 4, hops: [T.s2, T.s3, T.ding + 0.05, T.ding + 0.3, T.s5] })

  // the phone in Aries's hand (from the first text through the wait)
  const pk = pop01(t, T.s2 - 0.15, 0.25, 2.2) * outK(t, [T.go - 0.05, T.go + 0.15])
  const msgs = [{ at: T.s2, side: 'R', text: 'hi!! coffee??' }, { at: T.s3, side: 'R', text: 'we should hang out' }, { at: T.ding, side: 'L', text: 'yes!! sorry, phone died' }]
  phone(x, t, ax + 230, 1010, lerp(0.7, 0.85, clamp(prog(t, T.stop, T.stop + 0.4))), msgs, pk)
  // DELIVERED tag under the phone while waiting
  if (t > T.stop + 0.5 && t < T.ding) S.txt(x, 'DELIVERED', ax + 230, 1230, { size: 24, font: MONO, weight: 700, col: '#b9b0dc', ls: 3, alpha: 0.6 + 0.4 * Math.sin(t * 3) })
  // the zzz… during the nap
  // the snail overtakes
  if (t > T.snail && t < T.ding + 0.6) {
    const sx = lerp(-120, 1180, prog(t, T.snail, T.snail + 3.6))
    drawBits(x, SNAIL, { S: '#f2c75c', B: '#c9a6ff' }, sx, 1278, 9)
    if (t < T.snail + 2.4) S.bubble(x, t, sx + 40, 1180, T.snail + 0.5, T.snail + 2.2, 'excuse me', { size: 24, tail: -0.4 })
  }
  // the crush: waiting at the café door at the end of the street
  if (t > T.go) {
    const cx = lerp(1250, 720, ease.outCubic(prog(t, T.go + 0.6, T.meet)))
    S.shadow(x, cx, 1302, 210)
    S.star(x, t, { id: 'libra', x: cx, y: 1180, s: 220, mood: t > T.s5 ? 'heart' : 'happy', look: [-1, 0], seed: 7, hops: [T.meet + 0.05, T.s5 + 0.1] })
    if (t > T.s5) S.heartBits(x, 560, 960 - 40 * prog(t, T.s5, T.s5 + 1), 9, PINK, outK(t, [T.s5 + 1, T.s5 + 1.4]))
  }
}

function over(x, t, S) {
  // "WAIT FOR REPLY": the wall stamp
  S.stamp(x, 'UNSKIPPABLE', 540, 790, pop01(t, T.stop + 0.2, 0.25, 2.8) * outK(t, [T.ff - 0.2, T.ff]), { size: 72, col: RED, rot: -0.08 })
  // fast-forward stamps
  S.stamp(x, '▶▶ ×60', 540, 790, pop01(t, T.ff, 0.22, 2.8) * outK(t, [T.ff2 - 0.15, T.ff2]), { size: 64, col: BLUE, rot: 0.05, font: MONO })
  S.stamp(x, '▶▶ ×600', 540, 790, pop01(t, T.ff2, 0.22, 2.8) * outK(t, [T.ding - 0.2, T.ding]), { size: 64, col: BLUE, rot: -0.05, font: MONO })
  // the ding
  // the finish
  S.stamp(x, 'RUN COMPLETE', 540, 830, pop01(t, T.done, 0.25, 2.8) * outK(t, [T.last - 0.1, T.last + 0.1]), { size: 70, col: GOLD, rot: -0.06 })
  sparkles(x, t, 540, 830, T.done + 0.05, 12, 300, 1, [GOLD, BONE, PINK])
}

const camera = t => ({ zoom: 1, dx: shake(t, T.stop, 16), dy: 0 })
const HOOK = { at: -1, text: 'ARIES. ANY%. | *No resets.*', top: 640, size: 112, out: [2.6, 2.85] }
const LAST = { at: T.last, text: 'Fastest heart. | *Slowest reply.*', top: 660, size: 112 }
const WHIP = { at: T.flash, len: 0.45, from: 1.55, cx: 400, cy: 1150 }
const NOTIF = { at: T.ding, out: [T.go + 1.0, T.go + 1.25], title: 'texts', body: 'Libra: yes!! sorry, *phone died*', glyph: '♎', time: 'now', y: 600 }

const EP = makeRun({
  id: 'ksre01', duration: D, runner: 'aries', category: 'ANY% · NO RESETS',
  fx: [['slamTitle', HOOK, true], ['whipZoom', WHIP], ['notification', NOTIF], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, camera,
  ending: { type: 'cut' },
  current: t => t < T.s2 ? 1 : t < T.s3 ? 2 : t < T.ding ? 3 : 4,
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ['whoosh', 0.0, 0.5, 0.05],
  ...splitCues(SPLITS),
  ['pop', T.s2 + 0.05, 1174.66, 0.035, 0.4], ['pop', T.s3 + 0.05, 1318.51, 0.035, 0.4],
  // the skid + the wall
  ['whoosh', T.stop - 0.05, 0.45, 0.06], ['tick', T.stop, 0.07], ['tick', T.stop + 0.08, 0.05], ['tom', T.stop + 0.2, 110, { gain: 0.22, decay: 0.3 }],
  // fast-forward chatter
  ['whoosh', T.ff, 0.3, 0.04], ...blips(T.ff, 1.4, 0.1, 1318.51, 0.012), ['whoosh', T.ff2, 0.3, 0.045], ...blips(T.ff2, 4.2, 0.05, 1760, 0.01),
  ['pluck', T.sleep + 0.2, 392, 0.03, 0.6, 0], ['pop', T.snail + 0.5, 659.25, 0.03, -0.3], ['pop', T.snail + 0.62, 587.33, 0.03, -0.3],
  ['pluck', T.sob + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.sob + 0.3, 415.3, 0.035, 0.5, 0.4],
  // the ding + floor it
  ['whoosh', T.go, 0.6, 0.07], ['riser', T.go, T.meet, 0.03],
  ['pluck', T.s5 + 0.1, 1174.66, 0.04, 0.5, 0.2], ['pluck', T.s5 + 0.22, 1567.98, 0.035, 0.5, 0.2],
  ['bell', T.done, 1760, 0.05, 1.2, 0], ['glitter', T.done, T.done + 0.6],
]
void [INK, INTER, lerp, GOLD, colOf]
