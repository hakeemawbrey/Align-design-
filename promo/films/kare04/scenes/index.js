// kare04 — THE ALMOST RELATIONSHIP, Ep 4: "Couple on Saturday, strangers by Monday" (20 s vertical, star_advice; funk · E; loop).
//   0.0–3.0   split screen. SAT: Aries mid-twirl with Virgo under the lane lamps. MON: Virgo alone in bed, staring at a
//             silent phone ("0 new messages"). Hook "Couple on Saturday. | *Strangers on Monday?*"
//   3.0–9.0   whip cuts back and forth: SAT pancakes at the café · MON "busy week!" · SAT matching scarves in the snow ·
//             MON the thread just sits there ("seen").
//   9.0–12.8  the split flickers faster and faster; Pisces is crying on BOTH sides: "it's the same person!!"
//  12.8–20.0  THE STARS: "Notice the *pattern.* Then name it, kindly." · "Ask for the *Monday* version too."
//             The last 0.45 s blend back into the frame-0 split.
import { makeAlmost, drawLane, LANE, drawCafe, drawCafeTable, CAFE, bedroom, star, stars, standY, split, tag, say, lockPhone, bigPhone, snow, sparkles, prog, ease, pop01, R, box, INK, RED, MINT, PINK, BONE } from '../../kare01/scenes/almostkit.js'

const D = 20
const T = { beats: [3.0, 4.5, 6.0, 7.5], flick: 9.0, pisSay: 10.6, stars: 12.8, l1: 13.2, l2: 16.0 }

function scarf(x, cx, cy, s, col) { const w = s * 0.62; R(x, INK, cx - w / 2 - 5, cy - 5, w + 10, s * 0.12 + 10); R(x, col, cx - w / 2, cy, w, s * 0.12); R(x, INK, cx + w * 0.18 - 5, cy, s * 0.12 + 10, s * 0.3); R(x, col, cx + w * 0.18, cy + 4, s * 0.12, s * 0.28) }

// SAT: the lane at night, dancing
function zoomAt(x, cx, z, fn) { x.save(); x.translate(cx, 1300); x.scale(z, z); x.translate(-cx, -1300); fn(); x.restore() }
function sat(x, t, ox = 0, o = {}) { zoomAt(x, 540 + ox, 1.4, () => sat0(x, t, ox, o)) }
function mon(x, t, ox = 0, o = {}) { zoomAt(x, 540 + ox, 1.3, () => mon0(x, t, ox, o)) }
function sat0(x, t, ox = 0, { scarves = false, snowy = false, pis = false } = {}) {
  drawLane(x, t, { time: 'night', pan: 380 - ox })
  if (snowy) snow(x, t, { n: 50 })
  const spin = Math.sin(t * 5) * 0.25
  const F = standY(200, LANE.feet)
  star(x, 'aries', 440 + ox, F, 200, t, { mood: 'happy', look: [1, 0], rot: spin, hops: [Math.floor(t * 2) / 2] })
  star(x, 'virgo', 640 + ox, F, 200, t, { mood: 'heart', look: [-1, 0], hops: [Math.floor(t * 2) / 2 + 0.25] })
  if (scarves) { scarf(x, 440 + ox, F + 20, 200, RED); scarf(x, 640 + ox, F + 20, 200, RED) }
  if (pis) star(x, 'pisces', 290 + ox, standY(130, LANE.feet), 130, t, { tears: 3, mood: 'sparkle', look: [1, -0.5], box: false })
}
// MON: Virgo alone in bed with the phone
function mon0(x, t, ox = 0, { note = null, pis = false } = {}) {
  bedroom(x, t, { lamp: 0.1 })
  star(x, 'virgo', 430 + ox, 1250, 220, t, { mood: 'neutral', look: [0.6, -0.4], bob: 1 })
  lockPhone(x, t, 650 + ox, 1080, { w: 200, h: 360, time: '9:14', note, noteAt: -1, glow: 0.6 })
  if (pis) star(x, 'pisces', 330 + ox, 1330, 120, t, { tears: 3, mood: 'wide', look: [1, -0.4], box: false })
}
function splitFrame(x, t, opts = {}) {
  split(x, c => sat(c, t, -270, opts), c => mon(c, t, 270, opts), { labels: ['SATURDAY', 'MONDAY'] })
}

const shots = [
  { a: 0, b: T.beats[0], draw(x, t) { splitFrame(x, t) } },
  { a: T.beats[0], b: T.beats[1], draw(x, t, S) {
    drawCafe(x, t, {})
    star(x, 'aries', CAFE.seats[0].x, standY(240, CAFE.seats[0].y), 240, t, { mood: 'happy', look: [1, 0], hops: [S.a + 0.4, S.a + 0.9] })
    star(x, 'virgo', CAFE.seats[1].x, standY(240, CAFE.seats[1].y), 240, t, { mood: 'heart', look: [-1, 0] })
    drawCafeTable(x, t, { cups: 2, pastry: 'bun' })
    tag(x, t, S.a + 0.15, 540, 520, 'SAT: PANCAKES FOR TWO', { size: 46, rot: -0.04 })
  } },
  { a: T.beats[1], b: T.beats[2], draw(x, t, S) {
    bedroom(x, t, { lamp: 0.1 })
    bigPhone(x, t, 540, 960, { w: 440, h: 700, k: 1.45, title: 'aries', msgs: [{ at: S.a - 1, side: 'R', text: 'hey! fun weekend :) free tuesday?' }, { at: S.a + 0.5, side: 'L', text: 'busy week!' }] })
    tag(x, t, S.a + 0.15, 540, 330, 'MON: “BUSY WEEK!”', { size: 46, rot: 0.04, col: '#d9d4ec' })
  } },
  { a: T.beats[2], b: T.beats[3], draw(x, t, S) {
    sat(x, t, 0, { scarves: true, snowy: true })
    tag(x, t, S.a + 0.15, 540, 520, 'SAT: MATCHING SCARVES', { size: 46, rot: -0.03 })
  } },
  { a: T.beats[3], b: T.flick, draw(x, t, S) {
    bedroom(x, t, { lamp: 0.05 })
    bigPhone(x, t, 540, 960, { w: 440, h: 700, k: 1.45, title: 'aries', msgs: [{ at: S.a - 1, side: 'R', text: 'how’s the week going?' }, { at: S.a + 0.4, side: 'R', text: 'seen 9:02' }] })
    tag(x, t, S.a + 0.15, 540, 330, 'MON: …', { size: 52, rot: 0.03, col: '#d9d4ec' })
  } },
  { a: T.flick, b: T.stars, draw(x, t, S) {
    const rate = 2 + S.u * 4, side = Math.floor(S.u * rate) % 2
    if (S.u < 1.4) { if (side) mon(x, t, 0, { pis: true }); else sat(x, t, 0, { pis: true }) }
    else splitFrame(x, t, { pis: true })
    if (S.u >= 1.4) {
      star(x, 'pisces', 540, 1300, 260, t, { tears: 3, mood: 'wide', look: [0, 0], hops: [T.pisSay, T.pisSay + 0.5], box: false })
      say(x, t, 540, 1020, T.pisSay, T.stars, 'it’s the same person!!', { size: 38 })
    }
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    splitFrame(x, t)
    stars(x, 540, 760, 190, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.4 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
    star(x, 'pisces', 900, 1160, 120, t, { tears: 2, mood: 'sparkle', look: [-1, -0.5], box: false })
  } },
]
function cam(t) {
  const cuts = [...T.beats, T.flick, T.stars]
  const hit = cuts.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -150 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1 + 0.1 * k, dx: 90 * k * (cuts.indexOf(hit) % 2 ? -1 : 1), dy: up }
}
const E = makeAlmost({
  id: 'kare04', duration: D, ending: 'loop',
  hook: 'Couple on Saturday. | *Strangers on Monday?*', hookOut: [2.8, 3.0], hookTop: 1530, hookSize: 96,
  shots, cam,
  fx: [['whipZoom', { at: 0.12, from: 1.35, blur: 12 }], ...T.beats.map(a => ['whipZoom', { at: a, len: 0.3, from: 1.2, blur: 16, flash: 0.2 }]), ['screenShake', { at: T.pisSay, len: 0.5, amp: 16 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Notice the *pattern.* Then name it, kindly.' },
    { t: T.l2, speaker: 'THE STARS', text: 'Ask for the *Monday* version too.' },
  ],
  cues: [
    ...T.beats.map((a, i) => ['pop', a + 0.15, [1174.66, 659.25, 1318.51, 587.33][i], 0.045, 0]),
    ...Array.from({ length: 6 }, (_, i) => ['tick', T.flick + i * 0.22, 0.04]), ['pop', T.pisSay, 1318.51, 0.035, 0.3],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [sparkles, box, MINT, PINK, BONE]
