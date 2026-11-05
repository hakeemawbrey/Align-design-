// khee08: HEALING ERA, Ep 8 "The 2 a.m. check" (20 s vertical, Month 2 boost m15, star_advice post, screwed · C#m).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: the dark kitchen at 2:07 AM, Scorpio under a blanket on the floor, lit only by the phone, eyes huge,
//          thumb mid-scroll on the ex's page. DAY 8. Hook: "Day 8. 2 a.m. Checking *their* page."
//   0.6    record scratch + freeze: "zooming into a photo… *again.*" + a red "caught" circle on the thumb.
//          "just checking." / "who is THAT in the background"  Pisces sniffles in the dark.
//   6.4    THE STARS: "every look keeps the ache *open.*" / "mute them. not to punish. to *rest.*"
//   12.4   Scorpio taps MUTE (a tiny lock clicks), plugs the phone in across the room, curls up and sleeps; sunrise.
//          The calendar tears to DAY 9.
//   17.7   Last line: "Mute is *self-care.*"  (accent lands at 19.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, ink, glow } from '../../khee01/healkit.js'
import { kitchen, bigPhone, blanket } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
function faceGlow(x, cx, cy, k = 1) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 300, 0.32 * k, '120,150,255'); x.restore() }
function lock(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -30, -10, 60, 50); R(x, '#f2c75c', -26, -6, 52, 42); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, -12, 20, Math.PI, 0); x.stroke(); x.restore() }

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 8 }, stoveClock: '2:07', dim: 0.62 })
  faceGlow(x, 440, 1220)
  shadow(x, 400, FLOOR + 4, 320)
  hero(x, t, { x: 400, y: fy(300), s: 300, mood: 'wide', look: [1, 0.3], blink: false, squash: 0.05 })
  blanket(x, 400, 1405, 360, 90, { col: '#3a3478', col2: '#4a4490' })
  bigPhone(x, t, 640, 1180, { w: 200, h: 340, rot: 0.08, mode: 'profile', scroll: u < 0.6 ? u * 200 : 120, col: '#9a6ad0' })
  // the thumb
  R(x, INK, 680, 1300 - (u < 0.6 ? (u * 6 % 1) * 80 : 30), 30, 40); R(x, '#d65a8a', 684, 1304 - (u < 0.6 ? (u * 6 % 1) * 80 : 30), 22, 32)
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 8 }, stoveClock: '2:12', dim: 0.7 })
  shadow(x, 540, 1300, 260)
  faceGlow(x, 540, 1185, 0.5)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
  blanket(x, 540, 1280, 300, 90, { col: '#3a3478', col2: '#4a4490' })
}
function s3(x, t, S) {
  const { u, hero } = S
  const sun = prog(u, 2.4, 3.6)
  kitchen(x, t, { cal: { day: 9 }, stoveClock: u < 2.4 ? '2:15' : '7:40', dim: lerp(0.6, 0, sun), morning: 0.7 * sun })
  // the phone, charging on the counter (across the room) from 1.2
  const moved = u > 1.2
  if (moved) { bigPhone(x, t, 900, 990, { w: 90, h: 150, rot: 0, mode: 'blank' }); R(x, INK, 900, 1062, 6, 120); R(x, '#5a5a7a', 902, 1062, 2, 118) }
  shadow(x, 400, FLOOR + 4, 300)
  const asleep = u > 1.8
  hero(x, t, { x: 400, y: fy(300) + (asleep ? 20 : 0), s: 300, mood: asleep ? (sun > 0.9 ? 'happy' : 'sleepy') : u < 0.6 ? 'neutral' : 'wide', look: [1, 0], squash: asleep ? 0.12 : 0 })
  blanket(x, 400, 1405, 360, 90, { col: '#3a3478', col2: '#4a4490' })
  if (!moved) { faceGlow(x, 440, 1220, 0.8); bigPhone(x, t, 640, 1180, { w: 200, h: 340, rot: 0.08, mode: 'profile', scroll: 120, col: '#9a6ad0' }); const k = pop01(t, S.t0 + 0.35, 0.25, 2.6); x.save(); x.translate(640, 1300); x.scale(k, k); R(x, INK, -80, -26, 160, 52); R(x, '#5a5a7a', -74, -20, 148, 40); ink(x, 'MUTE', 0, 1, { size: 28, col: BONE }); x.restore(); lock(x, 640, 1120, pop01(t, S.t0 + 0.7, 0.3, 2.6)) }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 9 }, stoveClock: '7:45', morning: 0.75, dim: 0.25 })
  bigPhone(x, t, 900, 990, { w: 90, h: 150, rot: 0, mode: 'blank' })
  shadow(x, 520, 1290, 290)
  hero(x, t, { x: 520, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  blanket(x, 520, 1275, 330, 70, { col: '#3a3478', col2: '#4a4490' })
}

const EP = makeHeal({
  id: 'khee08', sign: 'scorpio', name: 'Scorpio', len: 20, ending: 'cut',
  hook: 'Day 8. 2 a.m. | Checking *their* page.',
  brk: { kind: 'scratch', at: 0.6, len: 1.4, text: 'zooming into a photo… *again.*' },
  caught: { at: 0.85, x: 720, y: 1240, r: 110, out: [1.9, 2.0], label: 'THE THUMB', arrow: 'tl' },
  whip: { x: 600, y: 1150 },
  h1: 'The scroll *won’t* heal it.', h2: 'Mute. Charge. *Sleep.*',
  lines: ['every look keeps the ache *open.*', 'mute them. not to punish. to *rest.*'],
  last: 'Mute is | *self-care.*', day: 8, dayTo: 9,
  bubbles: [
    { t0: 2.2, t1: 3.9, x: 440, y: 960, text: 'just checking.', size: 42, tail: -0.2 },
    { t0: 4.0, t1: 6.2, x: 480, y: 960, text: 'who is THAT in the background', size: 34, tail: -0.3 },
  ],
  pis1: { x: 920, y: 1350, s: 150 }, pis3: null,
  s1, s2, s3, fin,
  cues: [...Array.from({ length: 4 }, (_, i) => ['tick', 0.05 + i * 0.15, 0.02]), ['pop', 12.75, 523.25, 0.04, 0], ['tick', 13.1, 0.08], ['pop', 13.12, 1567.98, 0.04, 0], ['whoosh', 13.5, 0.4, 0.03], ['pop', 13.65, 262, 0.04, 0.4], ['bell', 15.0, 1567.98, 0.025, 1.4, 0], ['glitter', 15.0, 15.5]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
