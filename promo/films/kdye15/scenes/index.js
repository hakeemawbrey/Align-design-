// kdye15: DATE YOURSELF, "The Free Show Upstairs" (22.6 s vertical, star_advice post, cinematic · E, LOOP).
// Row: promo/films/month2/m16.md. Feeling: lonely at night, the 2 a.m. scroll. Engine: ../../kdye01/dykit.js.
// Real astronomy only: on December evenings (northern hemisphere) Orion is up in the east; its three belt stars point
// up and to the right toward Aldebaran, the bright orange star marking the bull's eye in the constellation Taurus, with
// the Pleiades cluster beyond it. Astrology stays a lens; the sky facts are true.
//   0.0–3.0   FRAME 0: ♉ Taurus mid-gasp, a telescope view whip-zooming onto the Moon. Whip at 0.12.
//             Hook "Taurus, the sky's | *free* tonight." Stamp at 1.3.
//   3.0–8.4   STOP 1 a blanket and a thermos: a hill at night, cocoa steam.
//   8.4–14.0  STOP 2 find Orion: the belt lights up, a dotted line runs to Aldebaran ("the bull's eye").
//  14.0–20.4  STOP 3 the free show: the Pleiades sparkle; Pisces, on the next hill, cries at the stars.
//  20.6–end   last line "The sky was never | a *couples thing.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar, drawMoon } from '../../sky.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, shadow, glow, drawBits, mug,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 22.6
const S1 = [3.0, 8.4], S2 = [8.4, 14.0], S3 = [14.0, 20.5]
const TAU = '#7fe0a0'
// Orion + Taurus, a simplified but faithful layout (screen coords): belt runs lower-left → upper-right toward Aldebaran.
const ORION = { betel: [300, 620], bella: [500, 600], belt: [[360, 820], [410, 800], [460, 780]], saiph: [330, 1000], rigel: [520, 980] }
const ALDEB = [760, 560], PLEIADES = [[900, 420], [920, 400], [940, 425], [915, 440], [935, 385], [955, 410]]
const HYADES = [[720, 520], [745, 505], [700, 545]]

function hill(x, t) {
  R(x, '#0e0a26', 0, 0, 1080, 1920)
  for (let i = 0; i < 60; i++) drawPixelStar(x, (i * 191) % 1080, (i * 113) % 1100, 6 + (i % 3) * 3, 1, i % 4 ? 'rgba(239,230,214,0.7)' : GOLD)
  x.fillStyle = '#1f3a2e'; x.beginPath(); x.ellipse(540, 1500, 900, 300, 0, Math.PI, 0); x.fill(); R(x, '#1f3a2e', 0, 1500, 1080, 420)
  x.fillStyle = '#2a4a3a'; x.beginPath(); x.ellipse(980, 1360, 300, 120, 0, Math.PI, 0); x.fill()
}
function blanket(x, cx, cy) { for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) R(x, (i + j) % 2 ? '#e8504a' : BONE, cx - 210 + i * 70, cy + j * 26, 70, 26); R(x, INK, cx - 214, cy - 4, 428, 4) }
function constellations(x, t, k, belt, line, pleiades) {
  const st = (p, sz, c) => { sz *= 1.9; drawPixelStar(x, p[0], p[1], sz, 2, c); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, p[0], p[1], sz * 2.4, '255,240,210', 0.18 * k); x.restore() }
  x.save(); x.globalAlpha = k
  st(ORION.betel, 30, '#ffb07a'); st(ORION.bella, 22, '#cfe0ff'); st(ORION.saiph, 22, '#cfe0ff'); st(ORION.rigel, 30, '#cfe8ff')
  ORION.belt.forEach(p => st(p, belt > 0 ? 26 + 8 * belt : 22, belt > 0 ? GOLD : '#cfe0ff'))
  st(ALDEB, 34, '#ff9a5a'); HYADES.forEach(p => st(p, 16, '#ffe0c0'))
  // the dotted line belt → Aldebaran
  if (line > 0) {
    const [ax, ay] = ORION.belt[0], [bx, by] = ALDEB
    for (let i = 0; i < 18 * line; i++) { const f = i / 18; R(x, GOLD, lerp(ax, bx, f) - 4, lerp(ay, by, f) - 4, 8, 8) }
  }
  if (pleiades > 0) PLEIADES.forEach((p, i) => drawPixelStar(x, p[0], p[1], 26 + 8 * Math.sin(t * 5 + i), 2, '#cfe8ff'))
  x.restore()
}

function opener(x, t, S) {
  R(x, '#05040c', 0, 0, 1080, 1920)
  // the telescope view: a big circle with the Moon
  x.save(); x.beginPath(); x.arc(540, 900, 380, 0, Math.PI * 2); x.clip()
  R(x, '#0e0a26', 0, 0, 1080, 1920); for (let i = 0; i < 20; i++) drawPixelStar(x, 200 + (i * 131) % 700, 400 + (i * 89) % 700, 8, 1, BONE)
  drawMoon(x, 600, 880, 220, 0.35, { alpha: 1, glow: 2, earthshine: 1, darkAlpha: 0.6 })
  x.restore()
  x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.arc(540, 900, 390, 0, Math.PI * 2); x.stroke()
  R(x, 'rgba(239,230,214,0.35)', 535, 530, 10, 740); R(x, 'rgba(239,230,214,0.35)', 170, 895, 740, 10)
  S.hero(x, t, { x: 260, y: 1420, s: 260, mood: 'wide', look: [0.6, -1], squash: -0.08 })
  S.pis(x, t, { x: 900, y: 1440, s: 140, mood: 'wide', look: [-1, -0.8] }, 2)
}

function thermos(x, t, S) {
  const { u } = S
  hill(x, t)
  blanket(x, 500, 1260)
  box(x, 690, 1110, 60, 140, '#5a7ab0', { b: 5, hi: '#7a9ad0' })
  mug(x, 620, 1250, { col: '#e8504a', steam: 1, t })
  S.hero(x, t, { x: 440, y: 1130, s: 260, mood: u > 2.6 ? 'happy' : 'neutral', look: u > 2.6 ? [0, -1] : [1, 0.6], hops: [S.a + 2.6] })
  // the abandoned phone, face down on the blanket
  box(x, 300, 1250, 90, 40, '#4a3e78', { b: 4 })
}

function orion(x, t, S) {
  const { u } = S
  hill(x, t)
  constellations(x, t, clamp(prog(u, 0, 0.6)), clamp(prog(u, 0.8, 1.2)), clamp(prog(u, 2.8, 3.8)), 0)
  if (u > 1.2) label(x, 'the belt', 410, 870, { size: 30, col: GOLD, alpha: clamp(prog(u, 1.2, 1.5)) })
  if (u > 3.8) label(x, 'ALDEBARAN · the bull’s eye', 700, 640, { size: 28, col: '#ffb07a', alpha: clamp(prog(u, 3.8, 4.1)) })
  blanket(x, 500, 1300)
  S.hero(x, t, { x: 440, y: 1170, s: 240, mood: u > 3.8 ? 'sparkle' : 'wide', look: [0.4, -1], hops: [S.a + 3.9] })
}

function freeShow(x, t, S) {
  const { u } = S
  hill(x, t)
  constellations(x, t, 1, 0.3, 1, clamp(prog(u, 0.6, 1.2)))
  if (u > 1.2) label(x, 'the Pleiades', 900, 500, { size: 28, col: '#cfe8ff', alpha: clamp(prog(u, 1.2, 1.5)) * outK(t, [20.2, 20.5]) })
  sparkles(x, t, 920, 410, S.a + 0.8, 8, 80, 1, ['#cfe8ff', BONE])
  blanket(x, 460, 1300)
  S.hero(x, t, { x: 420, y: 1180, s: 240, mood: u > 2 ? 'heart' : 'sparkle', look: [0.6, -1] })
  S.pis(x, t, { x: 950, y: 1220, s: 150, mood: 'sparkle', look: [-0.4, -1] }, 3)
  bubble(x, t, 880, 1060, S.a + 1.8, S.b - 0.2, "they're SO sparkly", { size: 26, col: '#c9ecfb' })
}

const EP = makeDate({
  id: 'kdye15', sign: 'taurus', name: 'Taurus', D, ending: 'loop',
  hook: "Taurus, the sky's | *free* tonight.", hookSize: 112, hookAccent: TAU,
  stampTop: 1220,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.5, from: 1.6 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'a blanket, a *thermos*', draw: thermos, cues: [['pop', 2.6, 880, 0.03, 0]] },
    { a: S2[0], b: S2[1], sticker: 'find *Orion*', draw: orion,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['glitter', 0, 0.6], ...[0.8, 0.95, 1.1].map((a, i) => ['bell', a, [1318.51, 1567.98, 1760][i], 0.03, 1.0, 0]), ['riser', 2.8, 3.8, 0.02], ['bell', 3.9, 2093, 0.035, 1.4, 0.3]] },
    { a: S3[0], b: S3[1], sticker: 'the *free show*', draw: freeShow,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['glitter', 0.6, 1.4], ['pluck', 2.0, 1174.66, 0.04, 0.5, 0], ['pop', 1.8, 880, 0.03, 0.4]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'the 2 a.m. scroll, or… *this?*' },
    { t: 5.9, who: 'stars', text: "this. it's *free.* no login." },
    { t: 9.0, who: 'stars', text: 'find the *belt:* three in a row.' },
    { t: 11.4, who: 'stars', text: 'it points to *Aldebaran.*' },
    { t: 14.6, who: 'hero', text: 'that was up there *all along?*' },
    { t: 17.0, who: 'stars', text: 'every clear night. *front row.*' },
  ],
  boxes: [[3.4, 8.25, [0, 1]], [8.8, 13.85, [2, 3]], [14.4, 20.3, [4, 5]]],
  last: { t: 20.6, text: 'The sky was never | a *couples thing.*', top: 300, size: 100, accent: TAU },
  cues: [['whoosh', 0.12, 0.5, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, INTER, MONO, shadow, hearts, outK, pop01, r3, ease]
