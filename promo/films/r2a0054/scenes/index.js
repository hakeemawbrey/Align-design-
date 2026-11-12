// r2a0054: star_advice, ADVICE ROLLCALL, "Each sign’s | houseplant match." (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each matched with a houseplant: one warm, specific line and one light plant gag per sign.
//   0.0–3.6    "Each sign’s | *houseplant match.*"  the twelve line up.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries a cactus (tough outside, soft inside) · Taurus a fern (slow growth counts) · Gemini a spider plant
//              (always making new friends) · Cancer a peace lily (droops, bounces back) · Leo a sunflower (finds the light)
//              · Virgo a bonsai (lovingly trimmed, daily) · Libra an orchid (gorgeous, needs balance) · Scorpio a snake
//              plant (thrives in the shade) · Sagittarius an air plant (no pot, free spirit) · Capricorn a jade plant
//              (grows slow, lasts forever) · Aquarius a flytrap (weird and wonderful) · Pisces a water lily (feels
//              everything, blooms anyway)
//  49.2        group: "Twelve signs. | *All thriving.*"
//  52.4        LESSON: "Like your plant, | you *grow at your pace.*"  STATUS: THRIVING
//  58.3        "Water your plant. | *And yourself.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEAF = '#5fd068', LEAF2 = '#a6f08a', DEEP = '#2f9a4a', CREAM = '#fff4e2', TERRA = '#e07a4a', RED = '#e23d4e'

// ── plants (each sits on its own pot; the pot is drawn by pot())
const CACTUS = [
  '....GG....',
  '...GGGG...',
  'G..GgGG..G',
  'GG.GGGG.GG',
  'GGGGGgGGGG',
  '.GGGGGGGG.',
  '...GGgG...',
  '...GGGG...',
  '...GgGG...',
]
const FERN = [
  'G.....G.....G',
  '.G...GgG...G.',
  '.GG..GGG..GG.',
  '..GG.GgG.GG..',
  '...GGGGGGG...',
  '....GGgGG....',
  '.....GGG.....',
]
const SPIDER = [
  'G..........G',
  '.G..G..G..G.',
  '..G.G..G.G..',
  '...GGGGGG...',
  '....GGGG....',
]
const LILY_UP = [
  '....WW....',
  '...WWWW...',
  '...WYWW...',
  '....WW....',
  '.G..G...G.',
  '.GG.G..GG.',
  '..GGGGGG..',
  '...GGGG...',
]
const LILY_DOWN = [
  '..........',
  '..........',
  'WW........',
  'WWW.......',
  '.WG.......',
  '..GGG...G.',
  '...GGGGGG.',
  '...GGGG...',
]
const SUNFLOWER = [
  '...YY.YY...',
  '..YYYYYYY..',
  '.YYBBBBBYY.',
  'YYYBBBBBYYY',
  '.YYBBBBBYY.',
  '..YYYYYYY..',
  '...YY.YY...',
  '.....G.....',
  '..GG.G.....',
  '...GGG.GG..',
  '.....GGG...',
  '.....G.....',
]
const BONSAI = [
  '..GGGG...GGG..',
  '.GGgGGG.GGgGG.',
  '..GGGGGGGGGG..',
  '.....TTGGG....',
  '......TT......',
  '.....TT.......',
  '......TT......',
]
const ORCHID = [
  '.......PP.',
  '...PP.PWWP',
  '..PWWP.PP.',
  '...PP...T.',
  '....T..T..',
  '.....TT...',
  '.....T....',
  '..GG.T.GG.',
  '.GGGGTGGG.',
]
const SNAKE = [
  '.G...G...G.',
  '.G..gG...G.',
  'GG..GG..GG.',
  'Gg..GG..gG.',
  'GG.GgG..GG.',
  'GGGGGGGGGG.',
  '.GGgGGGgG..',
]
const AIRPLANT = [
  'G...G...G',
  '.G..G..G.',
  '..G.G.G..',
  'GG.GGG.GG',
  '..GGGGG..',
  '...GgG...',
]
const JADE = [
  '..GG..GG..',
  '.GGGGGGGG.',
  '..GGTTGG..',
  'GG..TT..GG',
  'GGG.TT.GGG',
  '....TT....',
]
const TRAP_OPEN = [
  'R.R.R..R.R.R',
  'RRRR....RRRR',
  '.RRRR..RRRR.',
  '..GRRRRRRG..',
  '....GGGG....',
  '.....GG.....',
  '..GG.GG.GG..',
  '...GGGGGG...',
]
const TRAP_SHUT = [
  '............',
  '...R.R.R....',
  '..RRRRRRRR..',
  '..RRRRRRRR..',
  '...GRRRRG...',
  '.....GG.....',
  '..GG.GG.GG..',
  '...GGGGGG...',
]
const WATERLILY = [
  '....P.P....',
  '...PPWPP...',
  '..PWWYWWP..',
  '...PPPPP...',
  'GGGGGGGGGG.',
  'GGgGGGGGGGG',
  '.GGGGGGgGG.',
]
const PC = { G: LEAF, g: LEAF2, W: '#ffffff', Y: GOLD, B: '#8a4a2e', T: '#8a4a2e', P: PINK, R: '#ff6f6f' }

function pot(x, cx, cy, k, { w = 150, col = TERRA, band = '#c95f2a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 8, -8); x.lineTo(w / 2 + 8, -8); x.lineTo(w / 2 - 14, 128); x.lineTo(-w / 2 + 14, 128); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2, 0); x.lineTo(w / 2, 0); x.lineTo(w / 2 - 20, 120); x.lineTo(-w / 2 + 20, 120); x.closePath(); x.fill()
  x.fillStyle = band; x.fillRect(-w / 2 - 2, 0, w + 4, 26)
  x.restore()
}
// plant on a pot at (cx, potY); bm drawn so its bottom sits on the pot rim
function potted(x, bm, cx, potY, cell, k, { rot = 0, cols = PC, potCol, sx = 1, sy = 1 } = {}) {
  pot(x, cx, potY, k, potCol ? { col: potCol, band: potCol } : {})
  drawBits(x, bm, cols, cx, potY - bm.length * cell * k / 2 + 6, cell * k, { rot, sx, sy })
}

const CAMEOS = [
  { sign: 'aries', cap: 'A cactus. | *Spiky. Secretly soft.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      potted(x, CACTUS, 790, 900, 20, k)
      if (lt > 1.2) { const f = pop01(t, t - lt + 1.2, 0.3, 2.4); drawBits(x, ['.P.', 'PYP', '.P.'], { P: PINK, Y: GOLD }, 790, 900 - 9 * 20 - 20, 16 * f) }
      label(x, 790, 1100, 'SURPRISE BLOOM ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A fern. | *Slow growth counts.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), g = lerp(0.7, 1, ease.outCubic(prog(lt, 0.6, 1.8)))
      potted(x, FERN, 790, 920, 22, k, { sy: g })
      label(x, 790, 640, '+1 LEAF. HUGE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A spider plant. | *Makes new friends.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      potted(x, SPIDER, 780, 860, 22, k)
      for (let i = 0; i < 3; i++) {
        const b = pop01(t, P.t0 + 0.8 + i * 0.25, 0.3, 2.2)
        if (b <= 0.01) continue
        const bx = 780 + (i - 1) * 130, by = 1040 + (i % 2) * 30
        x.save(); x.strokeStyle = DEEP; x.lineWidth = 5; x.beginPath(); x.moveTo(780 + (i - 1) * 60, 800); x.quadraticCurveTo(bx, 900, bx, by - 30); x.stroke(); x.restore()
        drawBits(x, ['G.G.G', '.GGG.', '..G..'], PC, bx, by, 14 * b)
      }
      bubble(x, 790, 620, 'hi! hi! hi!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'A peace lily. | *Droops. Bounces back.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.35],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), up = lt > 1.3
      potted(x, up ? LILY_UP : LILY_DOWN, 790, 920, 22, k)
      if (up) sparkles(x, t, 790, 760, t - lt + 1.3, 7, 150, 0.3)
      label(x, 790, 640, up ? 'MATCH: MADE ♡' : 'one sad day…', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 30, bg: up ? PINK : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A sunflower. | *Always finds the light.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(900, 470); x.lineTo(960, 470); x.lineTo(900, 1100); x.lineTo(640, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      potted(x, SUNFLOWER, 790, 980, 20, k, { rot: lerp(-0.3, 0.12, ease.inOutCubic(prog(lt, 0.6, 1.4))) })
      label(x, 790, 640, 'FACING: SUN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A bonsai. | *Lovingly trimmed. Daily.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      pot(x, 790, 920, k, { w: 230, col: '#3a6fd0', band: '#2a4fa0' })
      drawBits(x, BONSAI, { ...PC, G: DEEP, g: LEAF }, 790, 920 - 7 * 20 * k / 2 + 6, 20 * k)
      const snip = Math.floor(lt * 4) % 2
      label(x, 900, 720, snip ? '✂ snip' : '✂ snip.', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: CREAM, rot: snip ? 0.08 : -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'LEAF 4: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'An orchid. | *Gorgeous. Needs balance.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.35],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      potted(x, ORCHID, 790, 940, 22, k, { potCol: '#f4f6ff' })
      label(x, 790, 640, 'IT’S A MATCH ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A snake plant. | *Thrives in the shade.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.45 * k; x.fillStyle = '#05040c'; x.fillRect(580, 470, 390, 760); x.restore() }
    },
    front(x, t, lt, P) {
      potted(x, SNAKE, 790, 920, 22, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'LIGHT: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'An air plant. | *No pot. Free spirit.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, AIRPLANT, PC, 780 + Math.sin(t * 1.6) * 40, 860 + Math.sin(t * 2.3) * 30, 30 * k, { rot: Math.sin(t * 1.3) * 0.2 })
      label(x, 790, 1080, 'ADDRESS: WHEREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A jade plant. | *Built to last.*', mood: 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      potted(x, JADE, 790, 920, 24, pop01(t, P.t0 + 0.2, 0.35, 2), { potCol: '#d8dbe8' })
      label(x, 790, 640, 'LONG-TERM ASSET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A flytrap. | *Weird, wonderful, yours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      const shut = lt > 1.15
      potted(x, shut ? TRAP_SHUT : TRAP_OPEN, 790, 940, 20, pop01(t, P.t0 + 0.2, 0.35, 2), { potCol: '#4fd1c5' })
      if (!shut) drawBits(x, ['K.K', '.K.'], { K: INK }, lerp(940, 790, prog(lt, 0.3, 1.1)) + Math.sin(t * 20) * 6, 780 + Math.sin(t * 13) * 10, 8)
      label(x, 790, 640, shut ? 'CHOMP.' : 'bzz…', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A water lily. | *Blooms through tears.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.beginPath(); x.ellipse(790, 960, 190, 60, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a8adf'; x.beginPath(); x.ellipse(790, 960, 180, 52, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, WATERLILY, PC, 790, 920, 20 * k)
      label(x, 790, 1100, 'WATERED BY TEARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0054', key: 'E', accent: LEAF, ending: 'lesson',
  title: 'Each sign’s | *houseplant match.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *All thriving.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'squint', 'sparkle', 'happy', 'sparkle', 'heart'] },
  lesson: { text: 'Like your plant, | you *grow at your pace.*', chip: 'STATUS: THRIVING' },
  last: { text: 'Water your plant. | *And yourself.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
