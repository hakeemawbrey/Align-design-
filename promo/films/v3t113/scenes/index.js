// v3t113: THE SIGNS AS… v3, "The signs in | a heatwave." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs in | a *heatwave.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one heatwave per sign (3.8 s each), each pushed to the extreme:
//              ♈ went for a run at noon · ♉ moved into the freezer aisle · ♊ talked so much the fan quit
//              · ♋ packed ice pops for the whole street · ♌ saw the sun, took it personally · ♍ sorted the ice cubes by size
//              · ♎ fan or A/C? melted deciding · ♏ wore all black, refused to sweat · ♐ heatwave here? went somewhere hotter
//              · ♑ still wore the full suit · ♒ invented a hat with a fan · ♓ named an ice cube, it melted
//  49.2        "Everyone melted. | *Except Scorpio.*"  The twelve fly up into a group photo.
//  52.6        callback: "Aquarius made | *twelve more hats.*"  (the fan hat, paid off: a row of spinning hats)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SIGN_IDS,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', ICE = '#cfefff', SIGNCOL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']

const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....OOOOO....',
  'Y..OOOOOOO..Y',
  '...OKKOKKO...',
  'Y..OKKOKKO..Y',
  '...OOOOOOO...',
  '....OOOOO....',
  '.Y.........Y.',
  '...Y..Y..Y...',
]
const SUN_C = { Y: GOLD, O: ORANGE, K: INK }
const SWEAT = ['.S.', 'SSS', 'SWS', '.S.']
const FREEZER = [
  'KKKKKKKKKKKK',
  'KIIIIIIIIIIK',
  'KIWIIIIIWIIK',
  'KIIIIIIIIIIK',
  'KKKKKKKKKKKK',
  'KIIIIIIIIIIK',
  'KIIIWIIIIIIK',
  'KIIIIIIIIIIK',
  'KKKKKKKKKKKK',
]
const POP = ['.CC.', 'CCCC', 'CCCC', 'CCCC', 'CCCC', '.SS.', '.SS.']
const CUBE = ['WWW', 'WIW', 'WWW']
const PUDDLE = ['..PPPPPP..', '.PPPPPPPP.', 'PPPPPPPPPP', '.PPPPPPPP.']
const SHADES = ['KKKKK.KKKKK', 'KKKKKKKKKKK', '.KKK...KKK.']
const CACTUS = [
  '...G...',
  '..GGG..',
  'G.GGG..',
  'G.GGG.G',
  'GGGGG.G',
  '..GGGGG',
  '..GGG..',
  '..GGG..',
  'SSSSSSS',
]
const TIE = ['.RR.', 'RRRR', '.RR.', '.RR.', 'RRRR', 'RRRR', '.RR.']

/** a little fan: blades spin at rate (1 = full, 0 = stopped) */
function fan(x, cx, cy, k, t, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 60, 20, 120); x.fillRect(-60, 170, 120, 22)
  x.fillStyle = '#9aa5c4'; x.fillRect(-6, 60, 12, 116)
  x.strokeStyle = '#9aa5c4'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 95, 0, Math.PI * 2); x.stroke()
  x.rotate(spin)
  for (let i = 0; i < 3; i++) { x.rotate(Math.PI * 2 / 3); x.fillStyle = SKYB; x.beginPath(); x.ellipse(0, -45, 22, 42, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a beanie with a little fan on top */
function fanHat(x, cx, cy, s, t, col = '#6fc3ff') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 54, Math.PI, 0); x.fill(); x.fillRect(-62, -4, 124, 18)
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 48, Math.PI, 0); x.fill(); x.fillStyle = GOLD; x.fillRect(-56, 0, 112, 10)
  x.fillStyle = INK; x.fillRect(-4, -76, 8, 26)
  const w = 60 * Math.cos(t * 18)
  x.fillStyle = PINK; x.fillRect(Math.min(0, w), -84, Math.abs(w), 12); x.fillStyle = MINT; x.fillRect(Math.min(0, -w), -84, Math.abs(w), 12)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Went for a run. | *At noon.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P, F) {
      drawBits(x, SUN, SUN_C, 800, 660, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = ((lt * 1.4 + i / 3) % 1); if (lt > 0.6) drawBits(x, SWEAT, { S: SKYB, W: '#fff' }, F.x + 120 + i * 20, F.cy - 60 + ph * 120, 7, { alpha: 1 - ph }) }
      label(x, 790, 900, 'NOON · FULL SUN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'lap ten!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Moved into | *the freezer aisle.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    back(x, t, lt, P) { drawBits(x, FREEZER, { K: '#9aa5c4', I: ICE, W: '#fff' }, 790, 900, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'NEW ADDRESS: AISLE 7', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'never leaving', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Talked so much | *the fan quit.*', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const sp = 1 - clamp((lt - 0.5) / 1.1)
      fan(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), t, t * 14 * sp + (sp <= 0 ? 0 : 0))
      bubble(x, 380, 590, 'so ANYWAY…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 1120, 'FAN: RESIGNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed ice pops | for *the whole street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 12; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2.2)
        drawBits(x, POP, { C: SIGNCOL[i], S: '#e8c48a' }, 660 + (i % 4) * 85, 720 + Math.floor(i / 4) * 140, 10 * k)
      }
      label(x, 790, 1150, 'ONE PER SIGN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Saw the sun. | *Took it personally.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 790, 720, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 * Math.sin(t * 3) })
      bubble(x, 790, 960, 'one star | per sky.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'RIVALRY: ON', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted the ice cubes. | *By size.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + (r * 4 + i) * 0.09, 0.3, 2.2)
        drawBits(x, CUBE, { W: '#ffffff', I: ICE }, 680 + i * 80, 760 + r * 120, (6 + r * 4) * k)
      }
      label(x, 790, 640, 'S · M · L', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'LABELLED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Fan or A/C? | Melted *deciding.*', mood: lt => lt > 1.6 ? 'sleepy' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], squash: lt => 0.3 * clamp((lt - 1.0) / 1.0), star: { x: -150, y: 30 },
    back(x, t, lt, P, F) { drawBits(x, PUDDLE, { P: '#ff8fb1' }, F.x, F.cy + 140, 22 * clamp((lt - 0.9) / 0.8), { alpha: 0.8 }) },
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2 ? 'the A/C?' : 'the fan?'
      bubble(x, 790, 680, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, 'DECIDING… 2 HRS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Wore all black. | *Refused to sweat.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, { K: INK }, F.x, F.cy - 10, 13 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 720, 'SWEAT: DENIED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 880, 'CHART: 100% SHADE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Heatwave here? | Went *somewhere hotter.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      drawBits(x, CACTUS, { G: '#5fd068', S: '#e8c48a' }, 330, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 330, 650, 'BRB: DESERT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1130, 'it’s a dry heat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Still wore | *the full suit.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, TIE, { R: RED }, F.x, F.cy + 90, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 1.0) for (let i = 0; i < 2; i++) { const ph = ((lt + i / 2) % 1); drawBits(x, SWEAT, { S: SKYB, W: '#fff' }, F.x - 90 + i * 180, F.cy - 70 + ph * 80, 7, { alpha: 1 - ph }) }
      label(x, 790, 720, 'DRESS CODE: ALWAYS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'I’m fine.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Invented a hat | *with a fan.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) fanHat(x, F.x, F.top + 6, 1.1 * k, t)
      label(x, 790, 760, 'PATENT: PENDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'genius, right?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Named an ice cube. | *It melted.*', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      const m = clamp((lt - 0.7) / 1.0)
      drawBits(x, CUBE, { W: '#ffffff', I: ICE }, 790, 900 + 30 * m, 24 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - m * 0.8))
      if (m > 0) drawBits(x, PUDDLE, { P: ICE }, 790, 940, 16 * m, { alpha: 0.7 })
      label(x, 790, 700, 'THIS IS CUBEY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'RIP CUBEY', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t113', key: 'E', accent: ORANGE, ending: 'callback',
  title: 'The signs in | a *heatwave.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone melted. | *Except Scorpio.*' },
  last: {
    text: 'Aquarius made | *twelve more hats.*',
    draw(x, t, lt) {
      for (let i = 0; i < 12; i++) {
        const k = pop01(t, t - lt + 0.6 + i * 0.08, 0.35, 2)
        if (k <= 0.01) continue
        const cx = 540 + ((i % 6) - 2.5) * 150, cy = 980 + Math.floor(i / 6) * 230
        const Fh = signChar(x, t, SIGN_IDS[i], cx, cy, 130 * k, { mood: i === 11 ? 'wide' : 'happy', seed: 50 + i, tears: i === 11 ? 2 : 0, glyph: false, glow: 0.8 })
        fanHat(x, cx, Fh.top + 4, 0.62 * k, t + i * 0.3, SIGNCOL[i])
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
