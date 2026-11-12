// r2t0178: THE SIGNS AS… v3, BE LIKE, "Zodiacs at a red light | be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Zodiacs at a red light | *be like.*"
//   3.6–49.2   ♈ honked before it turned red · ♉ ate a three-course meal · ♊ asked the next car for their sign
//              · ♋ stopped for ducks, named all six · ♌ full concert, windows down · ♍ fixed the mirror eleven times
//              · ♎ green for two minutes, still deciding · ♏ stared down the light, it blinked first · ♐ got out, joined a
//              parade · ♑ closed a deal · ♒ has a theory about the timing · ♓ cried at a beautiful pigeon
//  49.2        "Forty seconds. | *Twelve whole lives.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Green light. | Taurus: *dessert.*"  Taurus is back with a cake.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#3ee07a'

/** a pixel traffic light; state 'r' | 'y' | 'g' */
function light(x, cx, cy, k, state, { s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-74, -194, 148, 388); x.fillRect(-14, 194, 28, 120)
  x.fillStyle = '#2a2350'; x.fillRect(-64, -184, 128, 368)
  const on = { r: 0, y: 1, g: 2 }[state]
  ;[RED, GOLD, GREEN].forEach((c, i) => {
    x.fillStyle = i === on ? c : 'rgba(255,255,255,0.08)'
    if (i === on) { x.shadowColor = c; x.shadowBlur = 30 }
    x.beginPath(); x.arc(0, -120 + i * 120, 46, 0, Math.PI * 2); x.fill(); x.shadowBlur = 0
  })
  x.restore()
}
const PLATE = ['..WWWWWWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const SOUP = ['..SSSSSSS..', '.SSSSSSSSS.', '.KKKKKKKKK.', '..KKKKKKK..', '...KKKKK...']
const DUCK = ['.YY..', 'YYKO.', 'YYY..', 'YYYYY', '.YYYY']
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', 'KGGGK', '.KKK.', '..B..', '..B..', '..B..', '..B..']
const MIC_C = { K: INK, G: '#9aa5c4', B: '#3a3060' }
const MIRROR = ['KKKKKKKKK', 'KSSSSSSSK', 'KSWSSSSSK', 'KSSSSSSSK', 'KKKKKKKKK', '....K....', '....K....']
const MIRROR_C = { K: INK, S: '#bfe8ff', W: '#fff' }
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSGGSSSSSK.', '.KSSSSGGSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const LAPTOP_C = { K: INK, S: '#8fe3ff', G: '#9aa5c4' }
const PIGEON = ['..GGG.....', '.GGKGO....', '.GGGG.....', '..PPGGG...', '..GGGGGGG.', '...GGGGGGG', '....GGGG..', '....O..O..']
const PIGEON_C = { G: '#9aa5c4', K: INK, O: '#ff9a4a', P: '#7dffb0' }
const CAKE = ['....FF....', '....RR....', 'PPPPPPPPPP', 'WWWWWWWWWW', 'CCCCCCCCCC', 'WWWWWWWWWW', 'CCCCCCCCCC']
const CAKE_C = { F: GOLD, R: RED, P: PINK, W: '#fff4e2', C: '#c98f2a' }
function confetti(x, t, cx, cy, t0) {
  if (t < t0) return
  const p = t - t0
  const cols = [PINK, GOLD, MINT, SKYB, LAV]
  for (let i = 0; i < 22; i++) { const a = i * 2.4; x.fillStyle = cols[i % 5]; x.fillRect(cx + Math.cos(a) * 220 * Math.min(1, p) + Math.sin(t * 3 + i) * 10, cy - 160 + p * 120 + (i % 7) * 30, 12, 18) }
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Honked *before* | it turned red.', mood: 'squint', look: [1, 0], star: ST, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      light(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'r' : 'g', { s: 0.75 })
      bubble(x, 640, 640, 'HONK!', pop01(t, P.t0 + 0.6, 0.25, 2.6), { size: 52, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Red light? | *Three-course meal.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(2, Math.floor(clamp((lt - 0.3) / 1.5) * 3))
      drawBits(x, PLATE, { W: '#fff4e2' }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (n === 1) drawBits(x, SOUP, { S: '#ff9a4a', K: '#c98f2a' }, 790, 910, 18)
      else if (n === 2) drawBits(x, ['.MMMMMM.', 'GGGGGGGG', 'MMMMMMMM'], { M: '#8a4a2e', G: '#5fd068' }, 790, 920, 22)
      else drawBits(x, CAKE, CAKE_C, 790, 900, 14)
      label(x, 790, 680, `COURSE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'LIGHT: STILL RED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked the next car | *for their sign.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'what’s your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 960, 150 * k, { mood: lt > 1.4 ? 'happy' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 830, 1150, 'capricorn?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: '#9aa5c4', tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Stopped for ducks. | *Named all six.*', mood: 'heart', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const names = ['BOB', 'SUE', 'PIP', 'DOT', 'GUS', 'MO']
      for (let i = 0; i < 6; i++) { const w = clamp((lt - i * 0.18) / 2); if (w > 0) drawBits(x, DUCK, DUCK_C, 980 - w * 500 + i * 60, 1090 + (i % 2) * 20, 11) }
      const n = Math.min(5, Math.floor(clamp((lt - 0.4) / 1.6) * 6))
      label(x, 790, 760, `THIS IS ${names[n]}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Windows down. | *Full concert.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      notes(x, t, 790, 900, { n: 5, cell: 9, col: ORANGE, seed: 2 })
      label(x, 790, 1120, 'ENCORE AT THE LIGHT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Fixed the mirror | *eleven times.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 * Math.sin(lt * 12) })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.7) * 10)
      label(x, 790, 1110, `ADJUSTMENT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'It’s green. | *Still choosing a lane.*', mood: 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      light(x, 820, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'g', { s: 0.6 })
      label(x, 700, 1080, '← LEFT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 46, bg: Math.sin(lt * 5) < 0 ? PINK : BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 1150, 'RIGHT →', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 46, bg: Math.sin(lt * 5) > 0 ? PINK : BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stared down the light. | *It blinked first.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      light(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.4 ? 'g' : 'r', { s: 0.75 })
      label(x, 790, 1150, lt > 1.4 ? 'LIGHT: GAVE UP' : 'STARING CONTEST', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: lt > 1.4 ? MINT : '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Got out. | *Joined a parade.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      confetti(x, t, 790, 860, P.t0 + 0.5)
      label(x, 790, 760, 'PARADE?!', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 56, bg: '#ff9a4a', rot: 0.05 })
      bubble(x, 790, 1040, 'see you later!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Forty seconds. | *Closed a deal.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, lt > 1.4 ? 'DEAL: CLOSED' : 'TYPING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: lt > 1.4 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Has a theory | about *the timing.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      light(x, 700, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'r', { s: 0.55 })
      bubble(x, 860, 720, 'it’s the | moon.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      label(x, 800, 1120, 'THEORY #47', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#6fc3ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at a | *beautiful pigeon.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      sparkles(x, t, 800, 880, P.t0 + 0.9, 7, 180, 0.3)
      label(x, 800, 1120, 'SO MAJESTIC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0178', key: 'G', accent: GREEN, ending: 'callback',
  title: 'Zodiacs at | a red light *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Forty seconds. | *Twelve whole lives.*' },
  last: {
    text: 'Green light. | Taurus: *dessert.*',
    draw(x, t, lt) {
      const t0 = t - lt
      light(x, 820, 1020, pop01(t, t0 + 0.3, 0.35, 2), 'g', { s: 0.9 })
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 420, 1100, 400 * s, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 44, hops: [t0 + 1.6] })
      drawBits(x, CAKE, CAKE_C, 680, 1300, 26 * pop01(t, t0 + 1.2, 0.3, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
