// st9scorpioam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E36) · story 0–17.6, then the shared end card.
//   MORNING. "POV: a Scorpio's morning. *All* black."  Scorpio's bedroom (st9scorpiohome, ep 'am': a tall new candle,
//   the curtains half shut). The wardrobe is open: six identical black hoodies. Scorpio squints at them.
//   2.6   the clock rolls to 7:06; the hangers slide past, each tagged: BLACK · ALSO BLACK · BLACK (FORMAL) …
//         SCORPIO: "today's vibe: *black.*"   5.2 punch-in: "no. the *other* black."
//   7.8   punch on the nightstand: the drawer slides open, a pink sock. Scorpio checks left, right.
//         "nobody needs to know about *this.*"
//   10.8  dressed: black beanie, black scarf… and one pink sock. "…okay. one pink sock. for *me.*"
//         Fact chip: Scorpio is ruled by Mars traditionally, Pluto in modern astrology.
//   14.0  frame 0's framing, wardrobe shut, Scorpio winks.   14.6 last line: "Dress dark. *Love* loud."
//   Rewatch bait: the last hoodie's tag reads "BLACK (PINK INSIDE)"; the sock stays in this home for the rest of the
//   season (st9scorpiohome). The ghost leans out from behind the wardrobe at 8.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawScorpioHome, drawPinkSock, SCORPIO } from '../../st9scorpiohome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 22
const T = { hookOut: 2.6, ff: 2.6, l1: 3.0, flip: 2.9, punch: 5.2, l2: 5.4, drawer: 7.8, l3: 8.0, ghost: 8.6, wear: 10.8, l4: 11.0, fact: 10.4, rhyme: 14.0, wink: 14.3, last: 14.6 }
const SCO = tag('scorpio')
const LINES = [
  { t: T.l1, speaker: SCO, text: 'today’s vibe: *black.*', color: SCORPIO.redHi },
  { t: T.l2, speaker: SCO, text: 'no. the *other* black.', color: SCORPIO.redHi },
  { t: T.l3, speaker: SCO, text: 'nobody needs to know about *this.*', color: SCORPIO.pink },
  { t: T.l4, speaker: SCO, text: '…okay. one pink sock. for *me.*', color: SCORPIO.pink },
]
const INK = '#0c0710', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const HOOD = ['..hhhh..', '.hhkkhh.', 'hhhkkhhh', 'hhhhhhhh', 'hhhhhhhh', '.hhhhhh.', '.hhhhhh.', '.hhhhhh.']
const TAGS = ['BLACK', 'ALSO BLACK', 'BLACK (FORMAL)', 'BLACK (SAD)', 'BLACK (HAPPY)', 'BLACK (PINK INSIDE)']
const WR = { x0: 480, x1: 800, y0: 720, y1: 1240 }

function wardrobe(x, t) {
  const shut = t > T.rhyme
  R(x, INK, WR.x0 - 8, WR.y0 - 8, WR.x1 - WR.x0 + 16, WR.y1 - WR.y0 + 8)
  R(x, '#2a1a22', WR.x0, WR.y0, WR.x1 - WR.x0, WR.y1 - WR.y0)
  if (shut) {
    R(x, '#3a2430', WR.x0 + 6, WR.y0 + 6, (WR.x1 - WR.x0) / 2 - 9, WR.y1 - WR.y0 - 12); R(x, '#3a2430', (WR.x0 + WR.x1) / 2 + 3, WR.y0 + 6, (WR.x1 - WR.x0) / 2 - 9, WR.y1 - WR.y0 - 12)
    R(x, SCORPIO.steelHi, (WR.x0 + WR.x1) / 2 - 18, 980, 8, 40); R(x, SCORPIO.steelHi, (WR.x0 + WR.x1) / 2 + 10, 980, 8, 40)
    return
  }
  R(x, '#140a10', WR.x0 + 12, WR.y0 + 12, WR.x1 - WR.x0 - 24, WR.y1 - WR.y0 - 24)
  R(x, SCORPIO.steel, WR.x0 + 12, WR.y0 + 50, WR.x1 - WR.x0 - 24, 8)                // the rod
  // the open doors
  for (const s of [-1, 1]) { const dx = s < 0 ? WR.x0 - 70 : WR.x1; R(x, INK, dx - 4, WR.y0 + 6, 74, WR.y1 - WR.y0 - 6); R(x, '#3a2430', dx, WR.y0 + 10, 66, WR.y1 - WR.y0 - 14) }
  // the hoodies slide along the rod after T.flip, one step per 0.4 s (they all look the same)
  const step = t < T.flip ? 0 : Math.min(5, Math.floor((t - T.flip) / 0.42))
  const slide = t < T.flip ? 0 : ease.outCubic(prog((t - T.flip) % 0.42, 0, 0.2))
  for (let i = 0; i < 6; i++) {
    const cx = WR.x0 + 50 + i * 44 - (i <= step ? 0 : 0)
    const lift = i === step && t > T.flip ? -10 * (1 - slide) : 0
    drawBits(x, HOOD, { h: '#231c2a', k: '#3a3048' }, rr(cx), rr(WR.y0 + 100 + lift), 6, { outline: '#6a5a7a' })
    R(x, SCORPIO.steelHi, cx - 2, WR.y0 + 50, 4, 22)
  }
  // the tag of the current hoodie
  if (t > T.flip && t < T.drawer) {
    const s = Math.min(5, Math.floor((t - T.flip) / 0.42)), cx = WR.x0 + 50 + s * 44
    x.save(); x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'
    const w = x.measureText(TAGS[s]).width + 24
    R(x, INK, cx - w / 2 - 3, WR.y0 + 170, w + 6, 40); R(x, BONE, cx - w / 2, WR.y0 + 173, w, 34)
    x.fillStyle = s === 5 ? SCORPIO.pinkLo : INK; x.fillText(TAGS[s], cx, WR.y0 + 198); x.restore()
  }
  // a pile of black on the floor of the wardrobe
  for (let i = 0; i < 4; i++) R(x, '#151018', WR.x0 + 30 + i * 60, WR.y1 - 90 + (i % 2) * 10, 70, 60)
}
/** the nightstand drawer (draw over the home's nightstand): open → the pink sock */
function drawer(x, t, a) {
  const k = ease.outCubic(prog(t, T.drawer + 0.2, T.drawer + 0.6)) * (1 - prog(t, T.wear - 0.3, T.wear))
  if (k <= 0) return
  const n = a.spots.nightstand, y = 1150
  R(x, INK, n.x - 104, y - 10 + k * 30, 208, 70); R(x, '#4a2a34', n.x - 98, y - 4 + k * 30, 196, 58)
  drawPinkSock(x, n.x, y + 4 + k * 26, 9)
  if (k > 0.9) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.4 + 0.2 * Math.sin(t * 8); const g = x.createRadialGradient(n.x, y + 20, 0, n.x, y + 20, 140); g.addColorStop(0, 'rgba(255,154,200,0.6)'); g.addColorStop(1, 'rgba(255,154,200,0)'); x.fillStyle = g; x.fillRect(n.x - 140, y - 120, 280, 280); x.restore() }
}
/** Scorpio dressed: a black beanie, a black scarf, one pink sock on the left foot */
function outfit(x, r, t) {
  const s = r.size, cx = rr(r.x)
  // beanie on the top point
  R(x, INK, cx - s * 0.11 - 6, r.top + s * 0.02 - 6, s * 0.22 + 12, s * 0.1 + 12); R(x, '#2a2232', cx - s * 0.11, r.top + s * 0.02, s * 0.22, s * 0.1)
  R(x, '#3e3448', cx - s * 0.11, r.top + s * 0.1, s * 0.22, 6); R(x, INK, cx - 7, r.top - 10, 14, 14); R(x, SCORPIO.red, cx - 4, r.top - 7, 8, 8)
  // scarf
  const sy = rr(r.y + s * 0.17)
  R(x, INK, cx - s * 0.28 - 6, sy - 6, s * 0.56 + 12, s * 0.11 + 12); R(x, '#2a2232', cx - s * 0.28, sy, s * 0.56, s * 0.11)
  // the pink sock on the lower-left point
  drawPinkSock(x, r.x - s * 0.27, r.y + s * 0.4, Math.max(3, rr(s / 60)), { rot: 0.5 })
  void t
}
function scoState(t) {
  if (t < T.flip) return { mood: 'squint', look: [1, -1] }
  if (t < T.punch) return { mood: 'squint', look: [1, 0] }
  if (t < T.drawer) return { mood: 'eyeroll' }
  if (t < T.l3) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.wear) return { mood: 'squint', look: [Math.sin((t - T.l3) * 5) > 0 ? -1 : 1, 0] }
  if (t < T.rhyme) return { mood: 'sparkle', look: [0, 1] }
  if (t < T.wink) return { mood: 'neutral' }
  return { mood: t < T.wink + 1 ? 'wink' : 'happy' }
}

const EP = makeDay({
  numeral: 'S9 E36', sign: 'scorpio', ep: 'am', home: drawScorpioHome, duration: DUR, key: 'Cm',
  hook: { text: 'POV: a Scorpio’s morning. *All* black.', out: [T.hookOut - 0.2, T.hookOut], accentColor: SCORPIO.redHi },
  shots: [
    { at: 0, room: 'bedroom', hour: 6.9, zoom: { x: 540, y: 1000, s: 1.15 } },
    { at: T.punch, room: 'bedroom', hour: 7.1, zoom: { x: 640, y: 1000, s: 1.5 } },
    { at: T.drawer, room: 'bedroom', hour: 7.2, zoom: { x: 860, y: 1080, s: 1.55 } },
    { at: T.wear, room: 'bedroom', hour: 7.3, zoom: { x: 400, y: 1050, s: 1.35 } },
    { at: T.rhyme, room: 'bedroom', hour: 7.4, zoom: { x: 540, y: 1000, s: 1.15 } },
  ],
  clock: [{ at: 0, from: '6:58' }, { at: T.ff, dur: 0.6, from: '6:58', to: '7:06' }, { at: T.drawer, dur: 0.6, from: '7:06', to: '7:14' }, { at: T.rhyme, dur: 0.5, from: '7:14', to: '7:19' }],
  stamps: [
    { at: T.ff + 0.2, out: T.punch - 0.1, time: '7:06 AM', text: 'choosing an *outfit*' },
    { at: T.drawer + 0.2, out: T.wear - 0.1, time: '7:14 AM', text: 'the *secret*' },
  ],
  lines: LINES, box: { close: 14.4 },
  fact: { at: T.fact, dur: 3.6, label: '★ ASTROLOGY SAYS', text: 'Scorpio is ruled by Mars traditionally, and by Pluto in modern astrology.', color: SCORPIO.red },
  ghost: { room: 'bedroom', at: T.ghost, x: 800, y: 1000, from: 'left' },
  battery: 0.95,
  pitch: { [SCO]: 523.25 },
  cuts: [{ t: T.wear, kind: 'flip' }],
  draw(x, t, a, sh) {
    wardrobe(x, t)
    drawer(x, t, a)
    const r = star(x, 'scorpio', 300, 1150, 270, t, { ...scoState(t), seed: 6, hops: [T.l1, T.l2, T.l3, T.wear, T.l4, T.wink] })
    if (t > T.wear) outfit(x, r, t)
    void sh; void clamp; void lerp; void pop01
  },
  last: { at: T.last, text: 'Dress dark. *Love* loud.', accentColor: SCORPIO.pink },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.flip + i * 0.42).toFixed(3), 0.04]),
    ['whoosh', T.drawer + 0.2, 0.3, 0.03], ['pluck', T.drawer + 0.6, 1318.51, 0.045, 0.6, 0], ['glitter', T.drawer + 0.6, T.drawer + 1.2],
    ['pop', T.wear, 659.25, 0.05, 0], ['pop', T.wear + 0.1, 880, 0.04, 0],
    ['pluck', T.wink, 1567.98, 0.04, 0.5, 0],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
