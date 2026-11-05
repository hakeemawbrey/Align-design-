// kdye07: DATE YOURSELF, "No Audience" (20.9 s vertical, star_advice post, funk · Am). Row: promo/films/month2/m16.md.
// Feeling: it only counts if someone sees it. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♌ Leo mid-pose in a camera flash, the flash mid-pop. Whip at 0.15. Hook "Leo, no photos. |
//             *Just vibes.* Try it." Stamp at 1.3.
//   3.0–8.2   STOP 1 phone face down: the phone flips over on the counter; a ghost "post this?" fades.
//   8.2–13.6  STOP 2 the kitchen dance: lights pulse, music notes, a spatula microphone. Nobody watching.
//  13.6–19.1  STOP 3 a sunset it doesn't film: the balcony; Pisces sobs on the next balcony.
//  19.3–end   last line "Some moments are | *just for you.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, R, box, room, phone, shadow, glow, drawBits, sun, plant,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 20.9
const S1 = [3.0, 8.2], S2 = [8.2, 13.6], S3 = [13.6, 19.1]
const LEO = '#ffb04a'
const NOTE = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']
function kitchen(x, t, pulse = 0) {
  room(x, { wall: '#2f4a5a', wall2: '#2a4352', floor: '#3a2a3a', floorY: 1300, stripes: false })
  for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) R(x, (i + j) % 2 ? '#e8e2d0' : '#cfc6b0', 60 + i * 110, 700 + j * 60, 106, 56)
  box(x, 40, 940, 1000, 40, '#c9b8a0', { b: 7 }); box(x, 60, 980, 960, 320, '#6a8aa0', { b: 7 })
  for (let i = 0; i < 4; i++) R(x, INK, 150 + i * 240, 1050, 60, 10)
  box(x, 120, 340, 240, 220, '#4a6a7a', { b: 6 }); box(x, 720, 340, 240, 220, '#4a6a7a', { b: 6 })
  if (pulse > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const cols = ['255,90,160', '90,200,255', '255,210,90']
    cols.forEach((c, i) => glow(x, 200 + i * 340, 600 + 120 * Math.sin(t * 3 + i), 420, c, 0.18 * pulse * (0.6 + 0.4 * Math.sin(t * 8 + i * 2))))
    x.restore()
  }
}

function opener(x, t, S) {
  room(x, { wall: '#3a2a5a', wall2: '#33264f', floor: '#2a2040', floorY: 1320, stripes: false })
  // the flash, mid-pop
  const f = 1 - clamp(t / 0.6)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 820, 700, 900, '255,255,255', 0.55 * (0.4 + 0.6 * f)); x.restore()
  drawBits(x, ['..W..', '.WWW.', 'WWWWW', '.WWW.', '..W..'], { W: '#fffbea' }, 820, 700, 30 * (0.8 + 0.4 * f), { outline: null })
  phone(x, 840, 860, { s: 1.0, rot: 0.15, screen: '#fffbea' })
  shadow(x, 460, 1320, 280)
  S.hero(x, t, { x: 460, y: 1100, s: 300, mood: 'wink', look: [1, -0.4], squash: 0.06 })
  label(x, 'CLICK', 820, 560, { size: 54, col: GOLD, font: INTER, weight: 800, rot: 0.1 })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'sparkle', look: [-1, -0.6] }, 2)
}

function faceDown(x, t, S) {
  const { u } = S
  kitchen(x, t)
  const flip = ease.inOutCubic(prog(u, 0.6, 1.0))
  if (flip < 0.5) phone(x, 700, 860, { s: 0.8, rot: 1.57, screen: '#7fd0ff' })
  else phone(x, 700, 880, { faceDown: true, s: 0.8, rot: 1.57 })
  if (u > 0.95 && u < 1.5) label(x, 'flip.', 700, 760, { size: 40, col: BONE, font: INTER, weight: 800 })
  const twitch = u > 1.6 && u < 3.0
  S.hero(x, t, { x: 360 + (twitch ? 6 * Math.sin(t * 40) : 0), y: 820, s: 250, mood: u > 3.0 ? 'happy' : twitch ? 'squint' : 'neutral', look: twitch ? [1, 0.6] : [-0.6, -0.4], hops: [S.a + 3.0] })
  x.save(); x.globalAlpha = 0.6 * outK(t, [S.a + 2.6, S.a + 3.0]); bubble(x, t, 700, 640, S.a + 1.6, S.a + 3.1, 'post this?', { size: 30, col: '#d8d0f0' }); x.restore()
}

function dance(x, t, S) {
  const { u } = S
  kitchen(x, t, 1)
  const beat = Math.floor(u * 2.2)
  const pose = beat % 4
  S.hero(x, t, { x: 540 + [0, -60, 0, 60][pose], y: 820, s: 280, mood: ['happy', 'wink', 'sparkle', 'happy'][pose], look: [0, 0], squash: [0.1, -0.08, 0.12, -0.08][pose], hops: Array.from({ length: 12 }, (_, i) => S.a + i * 0.455) })
  // spatula microphone
  x.save(); x.translate(680 + [0, -60, 0, 60][pose], 720); x.rotate(-0.5); R(x, INK, -6, 0, 12, 140); box(x, -26, -50, 52, 60, '#c9c2d8', { b: 4 }); x.restore()
  for (let i = 0; i < 5; i++) { const p = ((t * 0.5 + i / 5) % 1); drawBits(x, NOTE, { N: [GOLD, PINK, '#7fd0ff'][i % 3] }, 200 + i * 170, 900 - p * 500, 9, { alpha: Math.sin(Math.PI * p) }) }
  box(x, 270, 1180, 540, 80, INK, { b: 4 }); label(x, 'AUDIENCE: 0 · VIBES: MAX', 540, 1222, { size: 34, col: GOLD })
}

function balcony(x, t, S) {
  const { u } = S
  const g = x.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#2a1f5a'); g.addColorStop(0.65, '#ff7a6a'); g.addColorStop(1, '#ffc88a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1200)
  sun(x, 420, lerp(900, 1060, prog(u, 0, 5)), 120, 1)
  for (let i = 0; i < 7; i++) R(x, '#3a2a5a', i * 160, 1060 - ((i * 97) % 200), 150, 300)
  // two balconies
  R(x, '#4a3a6a', 0, 1200, 1080, 720)
  for (const [bx, bw] of [[40, 620], [760, 300]]) { R(x, INK, bx, 1180, bw, 12); for (let i = 0; i < bw; i += 40) R(x, INK, bx + i, 1180, 8, 170); R(x, INK, bx, 1340, bw, 12) }
  plant(x, 600, 1180, 0.6, t)
  const twitch = u > 1.2 && u < 2.4
  S.hero(x, t, { x: 330, y: 1010, s: 270, mood: u > 2.4 ? 'sparkle' : twitch ? 'squint' : 'happy', look: twitch ? [0.4, 1] : [0.3, -0.6] })
  if (twitch) bubble(x, t, 330, 760, S.a + 1.2, S.a + 2.4, '(film it?)', { size: 28, col: '#d8d0f0' })
  if (u > 2.4 && u < 3.4) label(x, 'nah.', 330, 760, { size: 44, col: GOLD, font: INTER, weight: 800, alpha: outK(t, [S.a + 3.1, S.a + 3.4]) })
  S.pis(x, t, { x: 900, y: 1060, s: 150, mood: 'sparkle', look: [-0.8, -0.6] }, 3)
}

const EP = makeDate({
  id: 'kdye07', sign: 'leo', name: 'Leo', D, ending: 'cut',
  hook: 'Leo, no photos. | *Just vibes.* Try it.', hookSize: 108, hookAccent: LEO,
  fx: [{ kind: 'whip', o: { at: 0.15, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'phone *face down*', draw: faceDown,
      cues: [['whoosh', 0.6, 0.3, 0.03], ['tick', 1.0, 0.07], ['pop', 1.6, 659.25, 0.03, 0.3], ['pop', 3.0, 987.77, 0.04, -0.3]] },
    { a: S2[0], b: S2[1], sticker: 'the kitchen *dance*', draw: dance,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 11 }, (_, i) => ['tick', r3(i * 0.455), 0.03]), ['glitter', 0.4, 1.0]] },
    { a: S3[0], b: S3[1], sticker: "a sunset it *doesn't film*", draw: balcony,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pop', 1.2, 659.25, 0.03, -0.3], ['pluck', 2.4, 1174.66, 0.04, 0.5, -0.2], ['bell', 3.0, 1760, 0.025, 1.4, 0.3]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'but if nobody *sees* it…' },
    { t: 5.9, who: 'stars', text: "then it's *all* yours." },
    { t: 9.0, who: 'stars', text: "dance like the camera's *off.*" },
    { t: 11.2, who: 'hero', text: "it's *off.* I'm FREE." },
    { t: 14.2, who: 'stars', text: 'no filter on this one.' },
    { t: 16.4, who: 'hero', text: "…okay, it's *better* live." },
  ],
  boxes: [[3.4, 8.05, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.1, [4, 5]]],
  last: { t: 19.3, text: 'Some moments are | *just for you.*', top: 300, size: 100, accent: LEO },
  cues: [['pop', 0.0, 1760, 0.04, 0.3], ['whoosh', 0.15, 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, hearts, sparkles, pop01]
