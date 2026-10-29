// st9libraam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E31) · story 0–17.6, then the shared end card.
//   MORNING. "POV: a Libra picks an outfit. Day *three*."  Libra's bedroom (st9librahome). Libra wears its season-3
//   scale on its head; a pink dress and a mint jacket ride the two pans and the scale see-saws, eyes darting.
//   2.6   the clock fast-forwards 7:02 → 7:40. LIBRA: "pink says *confident*. mint says approachable."
//   6.3   THE RUNWAY: outfits swap on the pans every half second, the OUTFIT # counter climbs. "what if i wear *both*?"
//   9.3   punch-in on the mirror: the reflection wears both, half and half. "okay. that's a *lot*."
//   11.4  back to frame 0's framing at 8:58. Fact chip: Libra is ruled by Venus. "wait. which one feels like *me*?"
//   13.9  both outfits fly off, the scale settles level, and Libra wraps on its own lavender scarf.
//   14.6  last line: "Pick the one that feels like *you*."
//   Rewatch bait: the sticky note on the mirror tallies the days (DAY | → DAY |||), and the little brass scale on the
//   shelf tips whenever the one on Libra's head does. The ghost leans out from behind the mirror at 4.4.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawLibraHome, drawLibraScale, LIBRA } from '../../st9librahome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 22
const T = { hookOut: 2.6, l1: 3.2, runway: 6.3, l2: 6.8, mirror: 9.3, l3: 9.6, back: 11.4, l4: 12.0, fly: 13.9, last: 14.6 }
const LIB = tag('libra'), COL = LIBRA.color
const LINES = [
  { t: T.l1, speaker: LIB, text: 'pink says *confident.* mint says approachable.', color: LIBRA.rose },
  { t: T.l2, speaker: LIB, text: 'what if i wear *both?*', color: LIBRA.mint },
  { t: T.l3, speaker: LIB, text: 'okay. that’s a *lot.*', color: LIBRA.rose },
  { t: T.l4, speaker: LIB, text: 'wait. which one feels like *me?*', color: LIBRA.brass },
]

const DRESS = ['...hh...', '..h..h..', '.dddddd.', '..dDdd..', '..dddd..', '.dddddd.', 'dddddddd', 'dDdddDdd']
const JACKET = ['...hh...', '..h..h..', 'jjjj.jjj', 'jjjjjjjj', 'jj.jj.jj', 'jj.jj.jj', '.j.jj.j.', '...jj...']
const OUTFITS = [['d', LIBRA.rose], ['j', LIBRA.mint], ['d', '#f2c75c'], ['j', '#7fb2ff'], ['d', '#ffffff'], ['j', '#ff6a5a'], ['d', '#b48cff'], ['j', '#f39a3a'], ['d', LIBRA.mint], ['j', LIBRA.rose]]
const fit = (k, col) => (x, cx, cy) => drawBits(x, k === 'd' ? DRESS : JACKET, { h: '#cfc4b4', d: col, D: shade(col), j: col }, Math.round(cx), Math.round(cy - 34), 8)
function shade(h) { const n = parseInt(h.slice(1), 16); const f = v => Math.round(v * 0.75); return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})` }
const SWAP = 0.42
const swapN = t => clamp(Math.floor((t - T.runway) / SWAP), 0, 40)

function tiltAt(t) {
  if (t < T.runway) return Math.sin(t * 4.2) * 0.85
  if (t < T.back) return (swapN(t) % 2 ? 0.7 : -0.7) * (1 - 0.4 * prog(t - T.runway - swapN(t) * SWAP, 0, SWAP))
  if (t < T.fly) return Math.sin(t * 3) * 0.5
  return 0.6 * Math.exp(-(t - T.fly) * 3) * Math.cos((t - T.fly) * 12)
}
function pans(t) {
  if (t < T.runway) return [fit('d', LIBRA.rose), fit('j', LIBRA.mint)]
  if (t < T.back) { const n = swapN(t) * 2; const a = OUTFITS[n % OUTFITS.length], b = OUTFITS[(n + 1) % OUTFITS.length]; return [fit(...a), fit(...b)] }
  if (t < T.fly) return [fit('d', LIBRA.rose), fit('j', LIBRA.mint)]
  return [null, null]
}
function libraState(t) {
  if (t < T.runway) return { mood: 'neutral', look: [Math.sin(t * 4.2) > 0 ? 1 : -1, -1] }
  if (t < T.mirror) return { mood: t > T.l2 ? 'sparkle' : 'wide', look: [swapN(t) % 2 ? 1 : -1, -1], blink: false }
  if (t < T.back) return { mood: 'squint', look: [1, 0] }
  if (t < T.fly) return { mood: 'neutral', look: [0, 0] }
  return { mood: 'happy', look: [0, 0] }
}

const EP = makeDay({
  numeral: 'S9 E31', sign: 'libra', ep: 'am', home: drawLibraHome, duration: DUR, key: 'F',
  hook: { text: 'POV: a Libra picks an outfit. Day *three.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: LIBRA.rose },
  shots: [
    { at: 0, room: 'bedroom', hour: 7, zoom: { x: 540, y: 940, s: 1.1 } },
    { at: T.runway, room: 'bedroom', hour: 7.6, zoom: { x: 540, y: 930, s: 1.14 } },
    { at: T.mirror, room: 'bedroom', hour: 8.3, zoom: { x: 880, y: 980, s: 1.55 } },
    { at: T.back, room: 'bedroom', hour: 8.9, zoom: { x: 540, y: 940, s: 1.1 } },
  ],
  homeOpts: t => ({ tilt: -tiltAt(t) * 0.6 }),
  clock: [{ at: 0, from: '7:02' }, { at: T.hookOut, dur: 0.8, from: '7:02', to: '7:40' }, { at: T.runway, dur: 2.6, from: '7:40', to: '8:31' }, { at: T.back, dur: 0.8, from: '8:31', to: '8:58' }],
  stamps: [
    { at: 2.9, out: 6.1, time: '7:40 AM', text: 'outfit #1 vs outfit #2' },
    { at: 6.5, out: 9.1, time: '7:58 AM', text: 'the *runway*' },
    { at: 11.6, out: 14.4, time: '8:58 AM', text: 'still day *three*' },
  ],
  lines: LINES, box: { close: 15.0 },
  fact: { at: 10.6, dur: 3.6, label: '★ ASTROLOGY SAYS', text: 'Libra is ruled by Venus, named for the Roman goddess of love.', color: COL },
  ghost: { room: 'bedroom', at: 4.4, x: 820, y: 1060, from: 'right' },
  battery: 0.92,
  pitch: { [LIB]: 880 },
  cuts: [{ t: T.back, kind: 'flip' }],
  draw(x, t, a, sh) {
    // the sticky note on the mirror: the day tally
    const m = a.spots.mirrorBox, days = t < T.back ? 'DAY |||' : 'DAY |||'
    x.save(); x.translate(m.x0 + 46, m.y0 + 70); x.rotate(-0.06)
    x.fillStyle = '#1b1236'; x.fillRect(-4, -4, 96, 60); x.fillStyle = '#fff3a8'; x.fillRect(0, 0, 88, 52)
    x.fillStyle = '#5a3a1e'; x.font = "700 18px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.fillText(days, 8, 27); x.restore()
    if (sh.at === T.mirror) {
      // the reflection: Libra in both, half and half
      const g = a.spots.mirror
      x.save(); x.beginPath(); x.rect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); x.clip(); x.globalAlpha = 0.9
      const r = star(x, 'libra', (g.x0 + g.x1) / 2, 1080, 170, t, { mood: 'wide', look: [-1, 0], blink: false, glow: 0.4, seed: 9 })
      const cx = Math.round(r.x), cy = Math.round(r.y + 34)
      x.fillStyle = '#1b1236'; x.fillRect(cx - 62, cy - 6, 124, 36)
      x.fillStyle = LIBRA.rose; x.fillRect(cx - 56, cy, 56, 24); x.fillStyle = LIBRA.mint; x.fillRect(cx, cy, 56, 24)
      x.restore()
    }
    // Libra (in the mirror shot it stands off to the left, looking in)
    const px = sh.at === T.mirror ? 640 : 540
    const hops = [T.l1, T.l2, T.l3, T.l4, T.fly + 0.05, ...Array.from({ length: 12 }, (_, i) => T.runway + i * SWAP * 2)]
    const r = star(x, 'libra', px, 1120, 300, t, { ...libraState(t), hops, seed: 3, glow: 0.9 })
    if (sh.at !== T.mirror) {
      const [L, Rr] = pans(t)
      drawLibraScale(x, t, Math.round(r.x), Math.round(r.top + 12), 8, tiltAt(t), { left: L, right: Rr })
      // the counter over the runway
      if (sh.at === T.runway) {
        const n = 1 + swapN(t) * 2
        x.save(); x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'
        x.fillStyle = '#1b1236'; x.fillText(`OUTFIT #${n}–${n + 1}`, 543, 1023 - 380); x.fillStyle = LIBRA.brass; x.fillText(`OUTFIT #${n}–${n + 1}`, 540, 1020 - 380); x.restore()
      }
      // the flying outfits + the cardigan
      if (t >= T.fly) {
        const p = prog(t, T.fly, T.fly + 0.7)
        if (p < 1) for (const s of [-1, 1]) {
          x.save(); x.globalAlpha = 1 - p
          fit(s < 0 ? 'd' : 'j', s < 0 ? LIBRA.rose : LIBRA.mint)(x, r.x + s * lerp(90, 520, ease.outQuad(p)), r.top - 60 - Math.sin(Math.PI * p) * 200)
          x.restore()
        }
        const k = pop01(t, T.fly + 0.15, 0.4, 2.4)
        if (k > 0.02) {   // its own lavender scarf, with a little brass ♎ pin
          const cx = Math.round(r.x), cy = Math.round(r.y + 52), w = 170 * k, h = 34 * k
          x.fillStyle = '#1b1236'; x.fillRect(cx - w / 2 - 6, cy - 6, w + 12, h + 12); x.fillRect(cx + w * 0.18 - 6, cy + h - 6, 40 * k + 12, 60 * k + 12)
          x.fillStyle = '#b9a0ff'; x.fillRect(cx - w / 2, cy, w, h); x.fillRect(cx + w * 0.18, cy + h, 40 * k, 60 * k)
          x.fillStyle = '#d9cdf0'; x.fillRect(cx - w / 2, cy, w, 6 * k)
          x.fillStyle = LIBRA.brass; x.fillRect(cx - 40 * k, cy + 8 * k, 16 * k, 16 * k)
        }
      }
    }
  },
  last: { at: T.last, text: 'Pick the one that | feels like *you.*', accentColor: LIBRA.rose },
  cues: [
    ...Array.from({ length: 7 }, (_, i) => ['pop', +(T.runway + i * SWAP).toFixed(3), [880, 987.77, 1046.5, 1174.66][i % 4], 0.03, (i % 2 ? 0.4 : -0.4)]),
    ['pluck', T.l2 + 0.1, 1318.51, 0.035, 0.5, 0],
    ['whoosh', T.fly, 0.4, 0.04], ['tom', T.fly + 0.1, 0.07], ['pop', T.fly + 0.2, 1567.98, 0.05, 0], ['glitter', T.fly + 0.15, T.fly + 0.8],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
