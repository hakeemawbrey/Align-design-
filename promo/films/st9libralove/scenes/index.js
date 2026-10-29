// st9libralove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E33) · story 0–25.6, then the shared end card.
//   DATE NIGHT. "Libra on a date: matching outfits, *by accident*."  A taco spot at 7:58 PM: Libra and Aries (its canon
//   partner, season 4/5) sit down in the SAME mint scarf. Both gasp.
//   3.0   40 min earlier, Libra's bedroom (st9librahome, flowers in full bloom): the scale weighs rose vs mint, Libra picks.
//         LIBRA: "tonight i'm *decisive.* mint scarf. done."
//   6.6   meanwhile, Aries' place: a stopwatch HUD, scarf grabbed in 0.4 s. ARIES: "scarf. go. *GO.*"
//   8.6   back at the table. ARIES: "i ordered for us. tacos. *both* kinds." (season-4 tacos callback) · LIBRA: "you…
//         *picked?*" (punch-in) · "thank you. next time, *i* pick dessert." · ARIES: "deal. you get *forty* minutes."
//   17.0  fact chip: the September equinox, when day and night are about equal.
//   20.4  frame 0's framing again: same scarves, now laughing, a taco on each pan of the scale on Libra's head.
//   22.2  last line: "Balance is a *team* sport."
//   Rewatch bait: the chalkboard special reads "TACOS ↔ TACOS"; in the bedroom shot the vases are in full bloom. The ghost
//   leans out from behind the chalkboard at 15.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawLibraHome, drawLibraScale, LIBRA } from '../../st9librahome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 30
const T = { hookOut: 2.8, flash: 3.0, l1: 3.4, pick: 5.0, aries: 6.6, l2: 7.0, grab: 7.4, table: 8.6, l3: 9.4, food: 10.6, punch: 12.4, l4: 12.6, wide: 14.6, l5: 14.8, ghost: 15.6, fact: 16.6, ariesP: 17.8, l6: 18.0, laugh: 19.6, rhyme: 20.4, last: 22.2 }
const LIB = tag('libra'), ARI = tag('aries')
const LINES = [
  { t: T.l1, speaker: LIB, text: 'tonight i’m *decisive.* mint scarf. done.', color: LIBRA.mint },
  { t: T.l2, speaker: ARI, text: 'scarf. go. *GO.*', color: '#ff8a6a' },
  { t: T.l3, speaker: ARI, text: 'i ordered for us. tacos. *both* kinds.', color: '#ff8a6a' },
  { t: T.l4, speaker: LIB, text: 'you… *picked?*', color: LIBRA.rose },
  { t: T.l5, speaker: LIB, text: 'thank you. next time, *i* pick dessert.', color: LIBRA.rose },
  { t: T.l6, speaker: ARI, text: 'deal. you get *forty* minutes.', color: '#ff8a6a' },
]
const INK = '#1b1236', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const block = (x, X, Y, W, H, c, hi, lo, o = 6) => { R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o); R(x, c, X, Y, W, H); if (hi) R(x, hi, X, Y, W, 6); if (lo) R(x, lo, X, Y + H - 6, W, 6) }
function label(x, text, cx, cy, size, col, font = "700 SIZEpx 'Space Mono', monospace") {
  x.save(); x.font = font.replace('SIZE', size); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(text, cx + 2, cy + 3); x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}
const TACO = ['..yyyyy..', '.yGrGrGy.', 'yGrGrGrGy', 'yyyyyyyyy']
const TACO_C = { y: '#f2c75c', G: '#6fbf4a', r: '#e8382c' }

/** a mint scarf round a star's middle (r = drawStarChar's return) */
function scarf(x, r, k = 1, col = LIBRA.mint, lo = LIBRA.mintLo) {
  if (k <= 0.02) return
  const cx = rr(r.x), cy = rr(r.y + r.size * 0.17), w = r.size * 0.56 * k, h = r.size * 0.11 * k
  R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, h + 12); R(x, INK, cx + w * 0.16 - 6, cy + h - 6, w * 0.18 + 12, h * 1.8 + 12)
  R(x, col, cx - w / 2, cy, w, h); R(x, col, cx + w * 0.16, cy + h, w * 0.18, h * 1.8)
  R(x, lo, cx - w / 2, cy + h - 6, w, 6); R(x, '#d9fff2', cx - w / 2, cy, w, 5)
}

/** the taco spot: dusk window, string lights, a chalkboard, the two-top */
function tacoSpot(x, t, sh) {
  const FL = 1240
  const g = x.createLinearGradient(0, 0, 0, FL); g.addColorStop(0, '#1e1020'); g.addColorStop(1, '#4a2434')
  x.fillStyle = g; x.fillRect(0, 0, 1080, FL)
  for (let yy = 0; yy < FL; yy += 48) for (let xx = (yy / 48) % 2 ? 0 : 60; xx < 1080; xx += 120) R(x, 'rgba(0,0,0,0.12)', xx, yy, 112, 42)   // brick
  const win = { x0: 200, y0: 540, x1: 700, y1: 900 }
  R(x, INK, win.x0 - 14, win.y0 - 14, win.x1 - win.x0 + 28, win.y1 - win.y0 + 28)
  x.save(); x.beginPath(); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip(); sh.sky(x); x.restore()
  R(x, '#6a3a3a', win.x0 - 8, win.y0 - 8, win.x1 - win.x0 + 16, 8); R(x, '#6a3a3a', (win.x0 + win.x1) / 2 - 4, win.y0, 8, win.y1 - win.y0)
  // the chalkboard (right)
  block(x, 790, 580, 230, 260, '#1e2a24', null, null, 8); R(x, '#8a5a2c', 782, 572, 246, 8)
  label(x, 'TONIGHT', 905, 625, 28, BONE); label(x, 'TACOS', 905, 690, 34, '#f2c75c'); label(x, '↔', 905, 735, 30, LIBRA.mint); label(x, 'TACOS', 905, 785, 34, '#f2c75c')
  // string lights
  for (let i = 0; i < 14; i++) {
    const lx = 30 + i * 78, ly = 470 + Math.sin(i / 13 * Math.PI) * 50
    R(x, INK, lx - 2, ly - 30, 3, 30)
    const on = 0.7 + 0.3 * Math.sin(t * 3 + i)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * on
    const gg = x.createRadialGradient(lx, ly, 0, lx, ly, 40); gg.addColorStop(0, '#ffd98a'); gg.addColorStop(1, 'rgba(255,217,138,0)')
    x.fillStyle = gg; x.fillRect(lx - 40, ly - 40, 80, 80); x.restore()
    R(x, '#ffe7a8', lx - 7, ly - 2, 14, 16)
  }
  R(x, '#2a1820', 0, FL, 1080, 680); R(x, INK, 0, FL - 6, 1080, 6)
  for (let yy = FL + 40, k = 0; yy < 1920; yy += 60 + k * 10, k++) R(x, '#3a2230', 0, yy, 1080, 4)
  return { win, floor: FL }
}
/** the table, in front of the two stars */
function table(x, t) {
  x.save(); x.translate(540, 1215); x.scale(1, 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 330, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 320, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8382c'
  for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) if ((i + j) % 2 === 0 && i * i + j * j < 24) x.fillRect(i * 64 - 32, j * 64 - 32, 64, 64)
  x.restore()
  R(x, INK, 400, 1270, 280, 150); R(x, '#d8cfc0', 406, 1270, 268, 144); for (let k = 0; k < 4; k++) R(x, '#e8382c', 420 + k * 64, 1280, 32, 130)
  // the candle
  R(x, INK, 526, 1106, 28, 70); R(x, BONE, 530, 1110, 20, 62)
  const f = Math.sin(t * 17) * 2
  R(x, '#ffb347', 534 + f, 1084, 12, 20); R(x, '#fff1b8', 538 + f, 1090, 4, 8)
  x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(540, 1090, 0, 540, 1090, 220); gg.addColorStop(0, 'rgba(255,179,71,0.35)'); gg.addColorStop(1, 'rgba(255,179,71,0)'); x.fillStyle = gg; x.fillRect(320, 870, 440, 440); x.restore()
  // the plates arrive
  const k = pop01(t, T.food, 0.35, 2.2) * (t > T.table ? 1 : 0)
  for (const px of [420, 660]) {
    if (k > 0.02) { x.save(); x.translate(px, 1185); x.scale(k, k); x.fillStyle = INK; x.fillRect(-74, -14, 148, 30); x.fillStyle = BONE; x.fillRect(-68, -10, 136, 22); x.restore(); drawBits(x, TACO, TACO_C, px - 22, rr(1170 - 4 * k), 6 * k); drawBits(x, TACO, TACO_C, px + 26, rr(1172 - 4 * k), 6 * k) }
  }
  if (t < T.food && t > 0) for (const px of [430, 650]) { R(x, INK, px - 34, 1150, 68, 42); R(x, '#6a3a3a', px - 30, 1154, 60, 34); R(x, BONE, px - 20, 1162, 40, 4) }
}

/** Aries' place: a red wall, a hook with one scarf, the stopwatch */
function ariesRoom(x, t, sh) {
  const g = x.createLinearGradient(0, 0, 0, 1240); g.addColorStop(0, '#2a0e0c'); g.addColorStop(1, '#6a2a1e')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1240); R(x, '#3a1a14', 0, 1240, 1080, 680); R(x, INK, 0, 1234, 1080, 6)
  for (let xx = 60; xx < 1080; xx += 160) R(x, 'rgba(0,0,0,0.15)', xx, 0, 10, 1240)
  // a punching bag in the corner, a dumbbell: Aries
  R(x, INK, 880, 400, 8, 260); block(x, 830, 660, 110, 260, '#c0392b', '#e05a4a', '#8a2a20')
  block(x, 80, 1180, 160, 24, '#4a4a60', null, null, 4); block(x, 60, 1160, 30, 64, '#2b2b3a', null, null, 4); block(x, 230, 1160, 30, 64, '#2b2b3a', null, null, 4)
  // the hook: the scarf hangs there until it's grabbed
  R(x, INK, 640, 760, 40, 12)
  if (t < T.grab) { R(x, INK, 640, 772, 46, 160); R(x, LIBRA.mint, 646, 772, 34, 154) }
  return { win: { x0: 0, y0: 0, x1: 1, y1: 1 }, floor: 1240 }
}

function libraState(t) {
  if (t < T.flash) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.pick) return { mood: 'squint', look: [1, -1] }
  if (t < T.aries) return { mood: 'happy' }
  if (t < T.food) return { mood: 'neutral', look: [1, 0] }
  if (t < T.wide) return { mood: t < T.l4 ? 'neutral' : 'wide', look: [1, 0], blink: t < T.l4 }
  if (t < T.laugh) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'happy' }
}
function ariesState(t) {
  if (t < T.flash) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.table) return { mood: 'squint', look: [1, 0] }
  if (t < T.laugh) return { mood: t < T.l5 ? 'happy' : 'heart', look: [-1, 0] }
  return { mood: 'happy' }
}
const headTilt = t => t < T.pick ? Math.sin(t * 4) * 0.8 : t < T.laugh ? 0.5 * Math.exp(-(t - T.pick) * 2) * Math.cos((t - T.pick) * 10) : 0.06 * Math.sin(t * 2)

const EP = makeDay({
  numeral: 'S9 E33', sign: 'libra', ep: 'love', home: drawLibraHome, duration: DUR, key: 'Bb',
  hook: { text: 'Libra on a date: matching outfits, *by accident.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: LIBRA.mint, size: 88, accentSize: 128 },
  shots: [
    { at: 0, room: 'taco', set: tacoSpot, hour: 19.9, zoom: { x: 540, y: 1010, s: 1.15 } },
    { at: T.flash, room: 'bedroom', hour: 19.2, zoom: { x: 700, y: 990, s: 1.3 } },
    { at: T.aries, room: 'aries', set: ariesRoom, hour: 19.3, zoom: { x: 540, y: 1000, s: 1.1 } },
    { at: T.table, room: 'taco', set: tacoSpot, hour: 20, zoom: { x: 540, y: 1010, s: 1.15 } },
    { at: T.punch, room: 'taco', set: tacoSpot, hour: 20.1, zoom: { x: 360, y: 1050, s: 1.45 } },
    { at: T.wide, room: 'taco', set: tacoSpot, hour: 20.2, zoom: { x: 540, y: 1010, s: 1.15 } },
    { at: T.ariesP, room: 'taco', set: tacoSpot, hour: 20.3, zoom: { x: 720, y: 1050, s: 1.4 } },
    { at: T.rhyme, room: 'taco', set: tacoSpot, hour: 20.4, zoom: { x: 540, y: 1010, s: 1.15 } },
  ],
  homeOpts: (t, sh) => sh.room === 'bedroom' ? { tilt: -headTilt(t) * 0.5 } : {},
  clock: [{ at: 0, from: '7:58', ampm: 'PM' }, { at: T.flash, from: '7:15', ampm: 'PM' }, { at: T.aries, from: '7:16', ampm: 'PM' }, { at: T.table, dur: 0.6, from: '7:58', to: '8:03', ampm: 'PM' }, { at: T.rhyme, dur: 0.8, from: '8:03', to: '8:41', ampm: 'PM' }],
  stamps: [
    { at: T.flash + 0.15, out: T.aries - 0.1, time: '7:15 PM', text: '40 minutes *earlier*' },
    { at: T.aries + 0.1, out: T.table - 0.1, time: '7:16 PM', text: 'meanwhile, *Aries*' },
    { at: T.table + 0.15, out: T.l3 + 2.4, time: '8:03 PM', text: 'the *date*' },
  ],
  lines: LINES, box: { close: 22.0 },
  fact: { at: T.fact, dur: 4.8, label: '★ REAL SKY', text: 'Libra season starts near the September equinox, when day and night are about equal.', color: LIBRA.mint },
  ghost: { room: 'taco', at: T.ghost, x: 790, y: 700, from: 'right' },
  battery: 0.45,
  pitch: { [LIB]: 880, [ARI]: 660 },
  cuts: [{ t: T.table, kind: 'deal' }],
  draw(x, t, a, sh) {
    if (sh.room === 'taco') {
      const rL = star(x, 'libra', 330, 1040, 250, t, { ...libraState(t), seed: 3, hops: [T.l1, T.l4, T.l5, T.laugh, T.laugh + 0.5] })
      const rA = star(x, 'aries', 750, 1040, 250, t, { ...ariesState(t), seed: 2, hops: [T.l3, T.l3 + 0.5, T.l6, T.laugh + 0.1, T.laugh + 0.6] })
      scarf(x, rL); scarf(x, rA)
      const tc = (dx) => (c, px, py) => drawBits(c, TACO, TACO_C, rr(px), rr(py - 14), 5)
      drawLibraScale(x, t, rr(rL.x), rr(rL.top + 8), 5, headTilt(t), t > T.rhyme ? { left: tc(), right: tc() } : {})
      table(x, t)
      // the gasp at frame 0: two little "!" pops
      if (t < T.hookOut) for (const r of [rL, rA]) label(x, '!', r.x + (r === rL ? 80 : -80), r.top - 10, 70, '#f2c75c', "800 SIZEpx Inter")
      if (t > T.laugh) for (let i = 0; i < 4; i++) { const p = ((t - T.laugh) * 0.7 + i / 4) % 1; label(x, 'ha', lerp(540, i % 2 ? 760 : 320, p), 960 - p * 160, 34, '#ffd98a', "800 SIZEpx Inter") }
    } else if (sh.room === 'bedroom') {
      // Libra at the mirror; rose vs mint on the scale; picks mint at T.pick
      const r = star(x, 'libra', 560, 1130, 260, t, { ...libraState(t), seed: 3, hops: [T.l1, T.pick] })
      const sw = (col) => (c, px, py) => { R(c, INK, px - 34, py - 22, 68, 26); R(c, col, px - 30, py - 18, 60, 18) }
      drawLibraScale(x, t, rr(r.x), rr(r.top + 8), 6, headTilt(t), t < T.pick ? { left: sw(LIBRA.rose), right: sw(LIBRA.mint) } : { left: sw(LIBRA.rose) })
      scarf(x, r, pop01(t, T.pick, 0.35, 2.4))
    } else {
      const r = star(x, 'aries', 520, 1130, 280, t, { ...ariesState(t), seed: 2, hops: [T.l2, T.grab, T.grab + 0.35] })
      scarf(x, r, t > T.grab ? 1 : 0)
      // the stopwatch HUD
      const el = clamp(t - T.aries - 0.4, 0, 0.4)
      block(x, 300, 560, 480, 120, '#14101e', null, null, 6)
      label(x, '⏱ ' + el.toFixed(1).padStart(4, '0') + ' s', 540, 620, 64, t > T.grab ? '#6fdc6a' : '#ff8a6a')
    }
    void a; void ease
  },
  last: { at: T.last, text: 'Balance is a *team* sport.', accentColor: LIBRA.mint },
  cues: [
    ['pop', 0.3, 1567.98, 0.04, -0.4], ['pop', 0.36, 1760, 0.04, 0.4],
    ['pop', T.pick, 1318.51, 0.05, 0], ['glitter', T.pick, T.pick + 0.6],
    ['whoosh', T.grab - 0.1, 0.25, 0.04], ['pop', T.grab, 1046.5, 0.05, 0.2], ['tick', T.grab + 0.05, 0.08],
    ['pop', T.food, 880, 0.04, -0.3], ['pop', T.food + 0.08, 987.77, 0.04, 0.3],
    ['pluck', T.l4 + 0.4, 1318.51, 0.04, 0.6, -0.3],
    ['pop', T.laugh, 1174.66, 0.035, -0.3], ['pop', T.laugh + 0.2, 1318.51, 0.035, 0.3], ['pop', T.laugh + 0.45, 1567.98, 0.03, 0],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
