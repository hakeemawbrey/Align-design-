// kdye12: DATE YOURSELF, "Be Your Own Crush" (22.4 s vertical, star_advice post, dreamy · F, LOOP). Row: promo/films/month2/m16.md.
// Feeling: lonely on a Friday night, missing someone. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// The hero IS Pisces here (it cries through the whole film, sad tears first, happy tears by the end).
//   0.0–3.0   FRAME 0: ♓ Pisces mid-sob, a tower of tissues mid-collapse. Whip at 0.12.
//             Hook "Pisces, treat yourself | like *your crush.*" Stamp at 1.3.
//   3.0–8.4   STOP 1 the face mask and candles: music notes, a cucumber-green face mask.
//   8.4–13.8  STOP 2 the fancy pasta: a twirl, plated properly, a candle.
//  13.8–20.0  STOP 3 a note from you: "you looked cute today" stuck on the mirror; happy fountains.
//  20.2–end   last line "Be the crush who | *texts you back.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, plate, candle, tissues, shadow, glow, drawBits, inSprite,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 22.4
const S1 = [3.0, 8.4], S2 = [8.4, 13.8], S3 = [13.8, 20.1]
const PIS = '#9a8aff'
const NOTE = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']
function cosyRoom(x) { room(x, { wall: '#5a3a6a', wall2: '#52345f', floor: '#3a2a4a', floorY: 1320, win: { x: 740, y: 600, w: 240, h: 220, sky: 'night' } }) }
function mask(x, F, k) { if (k <= 0) return; inSprite(x, F, () => { x.globalAlpha = k * 0.85; x.fillStyle = '#9fe6b0'; x.fillRect(8, 12, 20, 13); x.fillStyle = '#7fcf90'; for (const [i, j] of [[10, 22], [24, 22], [17, 14]]) x.fillRect(i, j, 2, 2); x.globalAlpha = 1 }) }

function opener(x, t, S) {
  cosyRoom(x)
  // the tissue tower, mid-collapse
  for (let i = 0; i < 8; i++) {
    const tt = t + 0.3, lean = tt * 0.35 * (i / 8)
    x.save(); x.translate(760 + Math.sin(lean) * i * 70, 1300 - i * 60 * Math.cos(lean) + (i > 5 ? 200 * tt * tt * (i - 5) : 0)); x.rotate(lean * 1.4); tissues(x, 0, 0, 100); x.restore()
  }
  shadow(x, 400, 1330, 280)
  S.hero(x, t, { x: 400, y: 1100, s: 300, mood: 'wide', look: [0.4, -0.6], tears: 3, squash: 0.05 })
}

function maskStop(x, t, S) {
  const { u } = S
  cosyRoom(x)
  // the mirror
  box(x, 300, 620, 480, 440, '#a8d8f0', { b: 10 })
  x.save(); x.globalAlpha = 0.3; R(x, BONE, 330, 650, 120, 380); x.restore()
  for (let i = 0; i < 3; i++) candle(x, 220 + i * 320, 1180, t, { h: 70 + i * 10 })
  const F = S.hero(x, t, { x: 540, y: 1110, s: 270, mood: u > 2.6 ? 'happy' : 'sparkle', look: [0, 0], tears: 1, hops: [S.a + 2.6] })
  mask(x, F, clamp(prog(u, 0.6, 1.2)))
  for (let i = 0; i < 4; i++) { const p = ((t * 0.45 + i / 4) % 1); drawBits(x, NOTE, { N: [GOLD, PINK, '#7fd0ff'][i % 3] }, 160 + i * 250, 1000 - p * 400, 9, { alpha: Math.sin(Math.PI * p) }) }
}

function pasta(x, t, S) {
  const { u } = S
  cosyRoom(x)
  box(x, 120, 1160, 840, 36, '#c9b8a0', { b: 7 })
  candle(x, 260, 1160, t, { h: 80 })
  const plated = u > 2.4
  plate(x, 560, 1150, 240, { food: plated ? (c, px, py) => drawBits(c, ['..YYYY..', '.YYRYYY.', 'YYYYYRYY', '.YGYYYG.'], { Y: '#ffe08a', R: '#e8504a', G: '#5fd38a' }, px, py - 6, 10) : null })
  // the fork twirl
  if (!plated) { const a = t * 8; x.save(); x.translate(560, 980); for (let i = 0; i < 6; i++) R(x, '#ffe08a', Math.cos(a + i) * 40 - 6, Math.sin(a + i) * 20 + i * 10, 12, 12); R(x, '#c9c2d8', -5, -120, 10, 120); x.restore() }
  sparkles(x, t, 560, 1110, S.a + 2.4, 12, 180, 1)
  S.hero(x, t, { x: 840, y: 980, s: 240, mood: plated ? 'heart' : 'happy', look: [-1, 0.6], tears: plated ? 2 : 1, hops: [S.a + 2.4] })
  if (plated) hearts(x, t, S.a + 2.5, 840, 820, { n: 4 })
}

function noteStop(x, t, S) {
  const { u } = S
  cosyRoom(x)
  box(x, 300, 620, 480, 440, '#a8d8f0', { b: 10 })
  x.save(); x.globalAlpha = 0.3; R(x, BONE, 330, 650, 120, 380); x.restore()
  // the sticky note, written then stuck on the mirror
  const msg = 'you looked cute today'
  const typed = Math.floor(msg.length * clamp(prog(u, 0.5, 2.2)))
  const stick = ease.outBack(prog(u, 2.5, 2.9))
  const nx = lerp(540, 600, stick), ny = lerp(1180, 800, stick), rot = lerp(0, 0.06, stick)
  x.save(); x.translate(nx, ny); x.rotate(rot)
  box(x, -170, -90, 340, 180, '#ffd0e4', { b: 6 })
  x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const s = msg.slice(0, typed); x.fillText(s.slice(0, 11), 0, -26); x.fillText(s.slice(11), 0, 18)
  if (u > 2.2) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 120, 54, 5)
  x.restore()
  S.hero(x, t, { x: 300, y: 1230, s: 260, mood: u > 2.9 ? 'heart' : 'sparkle', look: [1, -0.6], tears: u > 2.9 ? 3 : 2, hops: [S.a + 2.9] })
  hearts(x, t, S.a + 3.0, 300, 1060, { n: 6 })
}

const EP = makeDate({
  id: 'kdye12', sign: 'pisces', name: 'Pisces', D, ending: 'loop',
  hook: 'Pisces, treat yourself | like *your crush.*', hookSize: 108, hookAccent: '#c9b8ff',
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the face mask and *candles*', draw: maskStop,
      cues: [['pop', 0.6, 880, 0.03, 0], ['glitter', 0.6, 1.2], ['pop', 2.6, 1174.66, 0.04, 0]] },
    { a: S2[0], b: S2[1], sticker: 'the *fancy* pasta', draw: pasta,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pop', 2.4, 1318.51, 0.045, 0], ['glitter', 2.4, 2.8], ['pluck', 2.5, 1174.66, 0.04, 0.5, 0.3]] },
    { a: S3[0], b: S3[1], sticker: 'a note from *you*', draw: noteStop,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.5 + i * 0.17), 0.02]), ['whoosh', 2.5, 0.3, 0.03], ['pop', 2.9, 1567.98, 0.05, 0], ['bell', 3.0, 2093, 0.03, 1.2, 0]] },
  ],
  lines: [
    { t: 3.6, who: 'stars', text: 'what would you do for a *crush?*' },
    { t: 5.9, who: 'hero', text: 'light candles. *obviously.*' },
    { t: 9.0, who: 'stars', text: "cook like it's a *second date.*" },
    { t: 11.4, who: 'hero', text: 'for… *me?*' },
    { t: 14.5, who: 'stars', text: 'now leave a *sweet* note.' },
    { t: 17.0, who: 'hero', text: "I'm crying. *happy* crying." },
  ],
  boxes: [[3.4, 8.25, [0, 1]], [8.8, 13.65, [2, 3]], [14.3, 19.9, [4, 5]]],
  last: { t: 20.2, text: 'Be the crush who | *texts you back.*', top: 300, size: 100, accent: '#c9b8ff' },
  cues: [['pluck', 0.0, 440, 0.03, 0.6, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, INTER, PIS, glow, label, bubble, pop01, outK]
