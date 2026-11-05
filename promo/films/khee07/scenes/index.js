// khee07: HEALING ERA, Ep 7 "“Was it my fault?”" (22 s vertical, Month 2 boost m15, star_advice post, dreamy · Bb).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
//   0.0    frame 0: Libra on the kitchen floor, three phones fanned out, mid-voice-note to all of them at once (sound
//          waves flying), a balance scale tipping wildly overhead. DAY 7. Hook: "Day 7. Polling every friend: *my fault?*"
//   0.6    whip zoom + shake; the kit's news desk: "POLL RESULTS: *inconclusive.*" with a ticker of replies
//          ("Taurus: no!", "Gemini: a little?", "Sag: who cares, come out", "Virgo: define fault"). Pisces cries reading them.
//   6.4    THE STARS: "friends can comfort you. they can't *decide* for you." / "ask yourself: what do *I* need now?"
//   13.9   Libra puts the phones down and writes on the fridge: "rest. walks. people who stay." The scale settles level.
//          The calendar tears to DAY 11.
//   19.1   Last line: "Your answer counts *too.*"  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD } from '../../khee01/healkit.js'
import { kitchen, bigPhone } from '../../khee01/healset.js'
import { newsDesk, newsDeskCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const NEWS = { at: 1.5, out: [5.9, 6.15], tag: 'POLL', channel: 'FRIEND NEWS', headline: 'Was it my fault? *Inconclusive.*', ticker: ['Taurus: no!', 'Gemini: a little?', 'Sag: who cares, come out', 'Virgo: define fault', 'Cancer: sending soup'], live: true, clock: '12:40' }

function scale(x, t, cx, cy, tilt) {
  R(x, INK, cx - 8, cy, 16, 120); R(x, GOLD, cx - 4, cy + 4, 8, 112); R(x, INK, cx - 50, cy + 116, 100, 16)
  x.save(); x.translate(cx, cy); x.rotate(tilt)
  R(x, INK, -170, -8, 340, 16); R(x, GOLD, -166, -4, 332, 8)
  for (const d of [-150, 150]) {
    x.save(); x.translate(d, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-44, 70); x.moveTo(0, 0); x.lineTo(44, 70); x.stroke()
    R(x, INK, -56, 66, 112, 20); R(x, GOLD, -52, 70, 104, 12); x.restore()
  }
  x.restore()
}
function waves(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const p = ((t * 1.6 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, 40 + p * 120, -0.7, 0.7); x.stroke(); x.restore() } }

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 7 }, stoveClock: '12:40' })
  scale(x, t, 420, 820, 0.45 * Math.sin(t * 5))
  shadow(x, 420, FLOOR + 4, 300)
  hero(x, t, { x: 420, y: fy(300), s: 300, mood: u < 1.5 ? 'wide' : 'squint', look: [1, -0.5], blink: false, hops: [0.05, 0.4] })
  const ph = [[640, 1180, 0.25], [720, 1230, 0.05], [600, 1290, -0.15]]
  ph.forEach(([px, py, r], i) => bigPhone(x, t, px, py, { w: 140, h: 230, rot: r, mode: 'chat', scroll: 300 + i * 200 + t * 60 }))
  waves(x, t, 560, 1180)
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 7 }, stoveClock: '12:46', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
}
function s3(x, t, S) {
  const { u, hero } = S
  const write = pop01(t, S.t0 + 1.0, 0.35, 2.2)
  kitchen(x, t, { cal: { day: 11 }, stoveClock: u < 1.4 ? '12:50' : '8:15', morning: lerp(0, 0.5, prog(u, 1.4, 2.6)), fridgeNote: 'rest. walks.|people who stay.', noteK: write })
  scale(x, t, 620, 820, 0.45 * Math.sin(t * 5) * (1 - ease.inOutCubic(prog(u, 0.4, 2.0))))
  shadow(x, 420, FLOOR + 4, 280)
  hero(x, t, { x: 420, y: fy(280), s: 280, mood: u < 1 ? 'neutral' : 'happy', look: [-1, -0.6], hops: [S.t0 + 1.0, S.t0 + 1.4] })
  // the phones, face down on the floor
  for (let i = 0; i < 3; i++) { R(x, INK, 640 + i * 80, 1400, 70, 22); R(x, '#2a2148', 644 + i * 80, 1404, 62, 14) }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 11 }, stoveClock: '8:20', morning: 0.5, dim: 0.3, fridgeNote: 'rest. walks.|people who stay.' })
  scale(x, t, 700, 820, 0)
  shadow(x, 460, 1290, 290)
  hero(x, t, { x: 460, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
}

const EP = makeHeal({
  id: 'khee07', sign: 'libra', name: 'Libra', len: 22, ending: 'loop',
  hook: 'Day 7. Polling every | friend: *my fault?*',
  brk: { kind: 'whip', at: 0.6, x: 600, y: 1150, shake: 0.62 },
  whip: { x: 540, y: 1150 },
  kit: [newsDesk(NEWS)], kitCues: newsDeskCues(NEWS),
  h1: 'One more *vote* to count.', h2: 'Ask *yourself.*',
  lines: ['friends can comfort you. they can’t *decide* for you.', 'ask yourself: what do *I* need now?'],
  last: 'Your answer | counts *too.*', day: 7, dayTo: 11,
  bubbles: [
    { t0: 14.4, t1: 16.4, x: 460, y: 930, text: 'okay. what do i need?', size: 40, tail: -0.2 },
  ],
  pis1: { x: 930, y: 1350, s: 150 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [...Array.from({ length: 8 }, (_, i) => ['pop', 0.1 + i * 0.16, 880 + (i % 3) * 110, 0.02, (i % 2 ? 0.3 : -0.3)]), ['pop', 14.0, 330, 0.04, 0.3], ['pop', 14.9, 1174.66, 0.04, -0.3], ['tick', 15.0, 0.05], ['glitter', 15.0, 15.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
