// r2a0180: star_advice, ADVICE ROLL CALL, "Each sign's | flower to grow." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: lesson.
//   0.0–3.6    "Each sign’s | *flower to grow.*"
//   3.6–49.2   ♈ sunflowers (growth: speedrun) · ♉ roses, worth every slow week · ♊ a wildflower mix · ♋ lavender, smells
//              like home · ♌ marigolds, impossible to ignore · ♍ herbs, useful and lovely · ♎ peonies, pretty in every
//              pairing · ♏ night jasmine, opens after dark · ♐ dandelions, they go everywhere · ♑ an oak (year 1 of 100)
//              · ♒ a cactus that blooms out of nowhere · ♓ water lilies, floating and dreaming (happy tears)
//  49.2        "One garden. | *Twelve blooms.*"
//  52.4        LESSON: "Grow at | *your own pace.*"  STATUS: BLOOMING
//  58.3        "Water yourself | *too.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', LEAF = '#5fd068', SOIL = '#8a5a3a'

/** a pot at (cx, by) with a flower growing g 0…1: petals n, colour c, centre cc */
function pot(x, cx, by, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-82, -8); x.lineTo(82, -8); x.lineTo(62, 112); x.lineTo(-62, 112); x.closePath(); x.fill()
  x.fillStyle = '#d0784a'; x.beginPath(); x.moveTo(-74, 0); x.lineTo(74, 0); x.lineTo(56, 104); x.lineTo(-56, 104); x.closePath(); x.fill()
  x.fillStyle = '#b8603a'; x.fillRect(-84, -10, 168, 28); x.fillStyle = INK; x.fillRect(-88, -14, 176, 6)
  x.restore()
}
function flower(x, t, cx, by, g, { c = PINK, cc = GOLD, n = 6, r = 44, h = 240, sway = 1 } = {}) {
  if (g <= 0.01) return
  const sh = h * clamp(g * 1.6), top = by - sh, sw = Math.sin(t * 1.6) * 8 * sway
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(cx, by); x.quadraticCurveTo(cx + sw, by - sh / 2, cx + sw, top); x.stroke()
  x.strokeStyle = LEAF; x.lineWidth = 9; x.beginPath(); x.moveTo(cx, by); x.quadraticCurveTo(cx + sw, by - sh / 2, cx + sw, top); x.stroke()
  const lg = clamp(g * 2)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx + 34, by - sh * 0.35, 34 * lg, 16 * lg, -0.5, 0, 7); x.fill()
  x.fillStyle = LEAF; x.beginPath(); x.ellipse(cx + 34, by - sh * 0.35, 28 * lg, 11 * lg, -0.5, 0, 7); x.fill()
  const b = ease.outBack ? ease.outBack(clamp((g - 0.55) / 0.45)) : clamp((g - 0.55) / 0.45)
  if (b <= 0.01) return
  const R = r * b
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + t * 0.2; x.fillStyle = INK; x.beginPath(); x.arc(cx + sw + Math.cos(a) * R * 0.9, top + Math.sin(a) * R * 0.9, R * 0.62, 0, 7); x.fill() }
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + t * 0.2; x.fillStyle = c; x.beginPath(); x.arc(cx + sw + Math.cos(a) * R * 0.9, top + Math.sin(a) * R * 0.9, R * 0.54, 0, 7); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(cx + sw, top, R * 0.52, 0, 7); x.fill()
  x.fillStyle = cc; x.beginPath(); x.arc(cx + sw, top, R * 0.44, 0, 7); x.fill()
}
const G = (lt, a = 0.2, b = 1.6) => clamp((lt - a) / (b - a))

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Sunflowers. Bold, fast, | *always facing forward.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      flower(x, t, 790, 1040, G(lt, 0.2, 0.9), { c: '#ffd23a', cc: '#5a3420', n: 10, r: 70, h: 330 })
      label(x, 790, 1170, 'GROWTH: SPEEDRUN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Roses. Worth | *every slow week.*', mood: lt => lt > 1.7 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      flower(x, t, 790, 1040, G(lt, 0.3, 2.0), { c: RED, cc: '#ff6b8a', n: 7, r: 56, h: 300 })
      const w = 1 + Math.floor(G(lt, 0.3, 2.0) * 5)
      label(x, 790, 640, w >= 6 ? 'WEEK 6: BLOOM!' : `WEEK ${w}…`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A wildflower mix. | *A surprise every day.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const cs = [[PINK, GOLD], [SKYB, '#fff'], ['#ff9a4a', INK], [LAV, GOLD]]
      cs.forEach(([c, cc], i) => flower(x, t + i, 670 + i * 85, 1090, G(lt, 0.2 + i * 0.2, 1.2 + i * 0.2), { c, cc, n: 5 + i, r: 34, h: 220 + (i % 2) * 70, sway: 1 }))
      bubble(x, 790, 640, 'what’s THAT one?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Lavender. | *Smells like home.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      for (let s = -1; s <= 1; s++) { const g = G(lt, 0.3, 1.4); for (let j = 0; j < 6; j++) { const k = clamp(g * 6 - j); if (k > 0) drawBits(x, ['.LL.', 'LLLL', '.LL.'], { L: '#b7a6ff' }, 790 + s * 50, 1010 - j * 36 - (s === 0 ? 30 : 0), 9 * k) } x.fillStyle = LEAF; x.fillRect(786 + s * 50, 1040 - 220 * g, 8, 220 * g) }
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 3 })
      label(x, 790, 640, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Marigolds. *Impossible* | to ignore.', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      flower(x, t, 760, 1040, G(lt, 0.2, 1.2), { c: ORANGE, cc: '#ff6b2a', n: 12, r: 60, h: 260 })
      flower(x, t + 1, 840, 1040, G(lt, 0.4, 1.4), { c: '#ffd23a', cc: ORANGE, n: 12, r: 46, h: 200 })
      sparkles(x, t, 790, 760, P.t0 + 1.6, 8, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'Herbs. *Useful,* | and quietly lovely.', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      const g = G(lt, 0.2, 1.4)
      for (let i = 0; i < 9; i++) { const k = clamp(g * 9 - i); if (k > 0) drawBits(x, ['.GG.', 'GGGG', 'GGGG', '.GG.'], { G: i % 2 ? LEAF : '#3fae58' }, 730 + (i % 3) * 60, 1000 - Math.floor(i / 3) * 60, 12 * k) }
      label(x, 790, 680, 'BASIL: THRIVING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Peonies. Pretty | *in every pairing.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      flower(x, t, 790, 1040, G(lt, 0.2, 1.3), { c: '#ffb7cf', cc: '#ff8fb1', n: 9, r: 64, h: 270 })
      label(x, 790, 640, 'MATCHES EVERYTHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Night jasmine. | *Opens after dark.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, -1], star: ST,
    back(x, t, lt, P) {
      const d = G(lt, 0.2, 1.0)
      x.save(); x.globalAlpha = 0.55 * d; x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore()
      drawBits(x, ['..YYY.', '.YY...', 'YY....', 'YY....', '.YY...', '..YYY.'], { Y: GOLD }, 900, 600, 14 * d)
    },
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      flower(x, t, 790, 1040, G(lt, 0.8, 1.8), { c: '#ffffff', cc: GOLD, n: 5, r: 54, h: 260 })
      sparkles(x, t, 790, 790, P.t0 + 2.2, 6, 120, 0.2, [BONE, GOLD])
    } },
  { sign: 'sagittarius', cap: 'Dandelions. | *They go everywhere.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      const g = G(lt, 0.2, 0.9); flower(x, t, 790, 1040, Math.min(g, 0.5), { h: 260 })
      if (g > 0.4) { x.fillStyle = 'rgba(255,255,255,0.95)'; x.beginPath(); x.arc(790, 1040 - 260 * 0.8, 40, 0, 7); x.fill() }
      const f = G(lt, 1.0, 2.2)
      for (let i = 0; i < 12; i++) { const a = -1.2 + i * 0.12; if (f > 0) { x.fillStyle = '#fff'; x.fillRect(790 + Math.cos(a) * 150 * f + i * 5, 832 - Math.sin(-a) * 120 * f - i * 12 * f, 8, 8) } }
      label(x, 790, 1170, 'SEE YOU IN SPAIN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'An oak. | *Long game. Big shade.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      const g = G(lt, 0.3, 1.2)
      x.fillStyle = '#8a5a3a'; x.fillRect(782, 1040 - 120 * g, 16, 120 * g)
      drawBits(x, ['.GG.', 'GGGG', '.GG.'], { G: LEAF }, 790, 1040 - 130 * g, 14 * g)
      label(x, 790, 700, 'YEAR 1 OF 100', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1170, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A cactus that | *blooms out of nowhere.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      pot(x, 790, 1040, pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, ['..GG..', '.GGGG.', '.GGGG.', 'GGGGGG', 'GGGGGG', '.GGGG.', '.GGGG.', '.GGGG.'], { G: '#3fae58' }, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      flower(x, t, 790, 880, G(lt, 1.0, 1.6) > 0 ? 0.55 + 0.45 * G(lt, 1.2, 1.6) : 0, { c: '#ff6bb4', cc: GOLD, n: 7, r: 46, h: 30, sway: 0 })
      label(x, 790, 640, 'SURPRISE!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: '#6fc3ff', rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Water lilies. | *Floating, dreaming.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.6)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.beginPath(); x.ellipse(780, 1060, 230, 70, 0, 0, 7); x.fill()
      x.fillStyle = '#3d8fd8'; x.beginPath(); x.ellipse(780, 1060, 220, 62, 0, 0, 7); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.4 + i * 0.3, 0.35, 2); if (k <= 0.01) continue; const cx = 690 + i * 90, cy = 1050 + Math.sin(t * 1.5 + i) * 6
        x.fillStyle = '#3fae58'; x.beginPath(); x.ellipse(cx, cy + 10, 50 * k, 16 * k, 0, 0, 7); x.fill()
        flower(x, t, cx, cy, 0.55 + 0.45 * k, { c: '#ffc0dc', cc: GOLD, n: 7, r: 30, h: 8, sway: 0 }) }
      label(x, 790, 700, 'HAPPY TEARS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0180', key: 'G', accent: MINT, ending: 'lesson',
  title: 'Each sign’s | *flower to grow.*',
  cameos: CAMEOS,
  group: { cap: 'One garden. | *Twelve blooms.*' },
  lesson: { text: 'Grow at | *your own pace.*', chip: 'STATUS: BLOOMING' },
  last: { text: 'Water yourself | *too.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
