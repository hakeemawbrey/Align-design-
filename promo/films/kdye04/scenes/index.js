// kdye04: DATE YOURSELF, "The Slow Lap" (19.9 s vertical, star_advice post, synthwave · E). Row: promo/films/month2/m16.md.
// Feeling: always rushing, even through rest. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.2   FRAME 0: ♈ Aries mid-sprint down a dawn street, speed lines. Record scratch + freeze at 0.35, a "caught"
//             circle ("yep. rushing my *day off.*"). Hook "Aries. Slow down. | That *IS* the date." Stamp at 1.85.
//   3.2–8.0   STOP 1 slowing down…: a loading bar stalls at 12 %; a snail overtakes Aries.
//   8.0–12.8  STOP 2 the sunrise, the bench: a dog sits beside it; Pisces cries at the sunrise.
//  12.8–18.0  STOP 3 a tiny plant, named: "I'm calling it *Pace.*"
//  18.2–end   last line "The win is just | *being there.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, R, box, park, street, bench, plant, shadow, glow, drawBits, sun, plateText,
  sparkles, hearts, bubble, label, speedLines, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 19.9
const S1 = [3.2, 8.0], S2 = [8.0, 12.8], S3 = [12.8, 18.0]
const ARI = '#ff6b5a'
const SNAIL = ['....SSS.', '...SBBBS', '..SBBSBS', '..SBSSBS', 'EESSBBS.', 'EYEEEEEE', '.EEEEEEE']
function snail(x, cx, cy, cell = 9) { drawBits(x, SNAIL, { S: '#b86a3a', B: '#e8a060', E: '#9fe6b0', Y: INK }, cx, cy, cell) }
const DOG = ['B.....BB.', 'BB...BBBB', 'BBBBBBBYB', 'BBBBBBBBN', 'BBBBBBB..', 'B.B..B.B.']
function dog(x, cx, cy, t) { drawBits(x, DOG, { B: '#c88a4a', Y: INK, N: INK }, cx, cy + 3 * Math.sin(t * 4), 14) }

function dawnSky(x, k = 0.4) { const g = x.createLinearGradient(0, 0, 0, 1180); g.addColorStop(0, '#3b3a8a'); g.addColorStop(1, lerp(0, 1, k) > 0.5 ? '#ffb38a' : '#c98aa8'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1180) }

function opener(x, t, S) {
  dawnSky(x, 0.3)
  street(x, t, { horizon: 1180, sky: 'night', lamps: [160, 920], tint: '#2b2150' })
  speedLines(x, t, { a: 0.8, dir: 1, y0: 700, y1: 1500 })
  shadow(x, 540, 1300, 260)
  S.hero(x, t, { x: 540, y: 1100, s: 300, mood: 'wide', look: [1, 0], squash: -0.14, hops: [0.05, 0.3, 2.1, 2.4, 2.7] })
  // to-do list flapping behind like a cape
  x.save(); x.translate(380, 1040); x.rotate(-0.4 + 0.1 * Math.sin(t * 20)); box(x, -90, -40, 180, 110, BONE, { b: 5 }); for (let i = 0; i < 3; i++) R(x, RED, -70, -22 + i * 26, 130, 6); x.restore()
  S.pis(x, t, { x: 930, y: 1460, s: 130, mood: 'wide', look: [-1, -0.5] }, 1)
}

function slowing(x, t, S) {
  const { u } = S
  park(x, t, { horizon: 1080, top: '#4a4a9a', bottom: '#ffb38a', sun: 0.3, trees: [100, 1000] })
  R(x, '#c8b090', 0, 1250, 1080, 70); R(x, INK, 0, 1246, 1080, 6)
  // Aries takes tiny, deliberate steps; the snail overtakes
  const ax = 420 + u * 18
  shadow(x, ax, 1270, 220)
  S.hero(x, t, { x: ax, y: 1080, s: 250, mood: u > 3.2 ? 'happy' : 'squint', look: u > 2.0 && u < 3.2 ? [1, 0.8] : [1, -0.2], hops: [S.a + 0.4, S.a + 1.4, S.a + 2.4, S.a + 3.4] })
  const sx = lerp(180, 760, ease.inOutQuad(prog(u, 0.6, 3.6)))
  snail(x, sx, 1230)
  if (u > 2.6 && u < 4.4) bubble(x, t, sx + 40, 1110, S.a + 2.6, S.a + 4.4, 'on your left', { size: 26, col: '#c9f2d4', tail: -0.3 })
}

function sunrise(x, t, S) {
  const { u } = S
  const k = ease.inOutCubic(prog(u, 0, 4.4))
  const g = x.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#5a4aa8'); g.addColorStop(0.6, '#ff9f7a'); g.addColorStop(1, '#ffe0a0'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1100)
  sun(x, 540, lerp(1120, 760, k), 120, 1)
  R(x, '#2f6e48', 0, 1060, 1080, 60); R(x, '#3f8f5a', 0, 1100, 1080, 820)
  bench(x, 540, 1420, 640)
  S.hero(x, t, { x: 420, y: 1220, s: 230, mood: u > 1.5 ? 'sparkle' : 'happy', look: [0.3, -1] })
  const dk = pop01(t, S.a + 1.6, 0.3, 2)
  if (dk > 0.01) dog(x, lerp(1200, 600, ease.outCubic(prog(u, 1.4, 2.2))), 1240, t)
  if (u > 2.3) hearts(x, t, S.a + 2.3, 600, 1170, { n: 3 })
  S.pis(x, t, { x: 800, y: 1230, s: 170, mood: 'sparkle', look: [-0.6, -1] }, u > 1.6 ? 3 : 2)
}

function plantStall(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [80], tint: '#3a3260' })
  // the stall: awning + crates of plants
  for (let i = 0; i < 6; i++) R(x, i % 2 ? BONE : '#5fd38a', 280 + i * 120, 760, 120, 90)
  R(x, INK, 280, 846, 720, 10)
  box(x, 300, 1100, 680, 160, '#6b4428', { b: 6, hi: '#8a5a3a' })
  for (let i = 0; i < 5; i++) plant(x, 360 + i * 130, 1100, 0.7, t, { pot: [CORAL(), '#7fd0ff', GOLD, '#c9a6ff', CORAL()][i] })
  const pick = u > 1.4
  S.hero(x, t, { x: 200, y: 1160, s: 240, mood: pick ? 'sparkle' : 'neutral', look: [1, 0.3], hops: [S.a + 1.4] })
  if (pick) { plant(x, 300, 1270, 0.6, t, { pot: '#ff8fb1' }); plateText(x, 'PACE', 300, 1330, { size: 28, bg: INK, col: GOLD, alpha: clamp(prog(u, 2.6, 2.9)) }) }
  sparkles(x, t, 300, 1220, S.a + 2.7, 10, 120, 1)
  S.npc(x, t, { sign: 'virgo', x: 760, y: 960, s: 130, mood: 'happy', look: [-1, 0] })
  S.pis(x, t, { x: 930, y: 1360, s: 130, mood: 'happy', look: [-1, -0.6] }, 2)
}
function CORAL() { return '#ff8a6a' }

const EP = makeDate({
  id: 'kdye04', sign: 'aries', name: 'Aries', D, ending: 'cut',
  hook: 'Aries. Slow down. | That *IS* the date.', hookSize: 104, hookAccent: '#ff9a7a',
  stampAt: 1.85,
  fx: [
    { kind: 'scratch', o: { at: 0.35, len: 1.15, caption: 'yep. rushing my *day off.*', top: 1560 } },
    { kind: 'caught', o: { at: 0.45, x: 540, y: 1080, r: 190, out: [1.4, 1.5], label: null, arrow: null } },
    { kind: 'loading', o: { at: 3.6, len: 3.4, label: 'slowing down…', stallAt: 12, error: 'Error: still speed-walking', y: 560 } },
  ],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: null, draw: slowing, cues: [['pluck', 2.6, 659.25, 0.03, 0.5, -0.2]] },
    { a: S2[0], b: S2[1], sticker: 'the *sunrise,* the bench', draw: sunrise,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['riser', 0, 4.4, 0.012], ['pop', 1.7, 880, 0.04, 0.4], ['pluck', 2.3, 1174.66, 0.04, 0.5, 0]] },
    { a: S3[0], b: S3[1], sticker: 'a tiny plant, *named*', draw: plantStall,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pop', 1.4, 987.77, 0.045, -0.3], ['pop', 2.7, 1318.51, 0.04, -0.3], ['glitter', 2.7, 3.1]] },
  ],
  lines: [
    { t: 3.7, who: 'stars', text: "walk like there's *nowhere* to be." },
    { t: 5.9, who: 'hero', text: 'is this… *walking?*' },
    { t: 8.6, who: 'stars', text: 'no finish line. just *the sky.*' },
    { t: 10.8, who: 'hero', text: "it's doing a *gradient!*" },
    { t: 13.4, who: 'stars', text: 'pick something that grows *slowly.*' },
    { t: 15.6, who: 'hero', text: "I'm calling it *Pace.*" },
  ],
  boxes: [[3.5, 7.95, [0, 1]], [8.4, 12.65, [2, 3]], [13.2, 17.9, [4, 5]]],
  last: { t: 18.2, text: 'The win is just | *being there.*', top: 300, size: 100, accent: ARI },
  cues: [],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, INTER, glow, label, outK, r3]
