// r2a0234: star_advice, ADVICE ROLLCALL, "Each sign's | inner child." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm and specific inner-child truth each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *inner child.*"
//   3.6–49.2   ♈ still races you to the car · ♉ still needs a snack and a nap · ♊ still asks "but why?" · ♋ still sleeps
//              with the old teddy · ♌ still wants a gold star · ♍ still colours inside the lines (a zodiac wheel)
//              · ♎ still plays dress-up · ♏ still keeps a secret diary · ♐ still jumps in every puddle · ♑ still runs
//              a lemonade stand · ♒ still talks to the moon · ♓ still cries at cartoons
//  49.2        "Twelve grown-ups. | *Twelve kids inside.*"
//  52.4        LESSON UNLOCKED: "Be kind to the kid | *you used to be.*"  STATUS: PLAYFUL
//  58.3        "Recess is | *never over.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffc2d6'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const CAR = ['...RRRRR....', '..RWWRWWR...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK.....KK..', '.KK.....KK..']
const JUICE = ['..K..', '.KK..', 'GGGGG', 'GWWWG', 'GWOWG', 'GWWWG', 'GGGGG']
const TEDDY = ['.BB...BB.', 'BBBBBBBBB', '.BKBBBKB.', '.BBBPBBB.', '..BBBBB..', '.BBLLLBB.', 'BBBLLLBBB', '.BBBBBBB.', '.BB...BB.']
const STAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YY...YY.']
const CROWN = ['Y..Y..Y', 'YYYYYYY', 'YPYBYPY', 'YYYYYYY']
const DIARY = ['KKKKKKKKK', 'KPPPPPPPK', 'KPPPPPPGG', 'KPPPPPPGG', 'KPPPPPPPK', 'KPPPPPPPK', 'KKKKKKKKK']
const BOOT = ['.YYY.', '.YYY.', '.YYY.', 'YYYYY', 'YYYYYY']
const MOON = ['..YYYY.', '.YY.K..', 'YY.....', 'YY..KK.', 'YY.....', '.YY....', '..YYYY.']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']

const CAMEOS = [
  { sign: 'aries', cap: 'Still races you | *to the car.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CAR, { R: RED, W: SKYB, K: INK }, 790, 1030, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 820, 'FIRST!', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.05, ...M })
      bubble(x, 790, 660, 'let them win', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Still needs | *a snack and a nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JUICE, { K: INK, G: GREEN, W: CREAM, O: ORANGE }, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 750, 'NAP TIME: NOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, ...M })
    } },
  { sign: 'gemini', cap: 'Still asks | *“but why?”*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 760 + i * 40, 680 + i * 160, 'but why?', pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 40 + i * 4, col: [CREAM, GOLD, MINT][i], tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Still sleeps | *with the old teddy.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P) {
      drawBits(x, TEDDY, { B: '#c98f6a', K: INK, P: PINK, L: '#e6c09a' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 720, 'SINCE: AGE 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, ...M })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Still wants | *a gold star.*', mood: 'sparkle', star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 890, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'GREAT JOB!', 0, -110, { size: 30, ...M })
        for (let i = 0; i < 6; i++) { x.fillStyle = '#e6dccb'; x.fillRect(-120 + (i % 3) * 84, -60 + Math.floor(i / 3) * 90, 72, 72); if (lt > 0.5 + i * 0.15) drawBits(x, STAR, { Y: GOLD }, -84 + (i % 3) * 84, -24 + Math.floor(i / 3) * 90, 7) }
      })
      sparkles(x, t, 390, 860, P.t0 + 1.4, 7, 170, 0.3)
      label(x, 790, 1110, 'GIVE THEM ONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: -0.04, ...M })
    } },
  { sign: 'virgo', cap: 'Still colours | *inside the lines.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 320, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 12)
        for (let i = 0; i < 12; i++) { x.fillStyle = i < n ? WHEEL[i] : CREAM; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 120, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke() }
      })
      label(x, 790, 680, '0 SMUDGES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: 'libra', cap: 'Still plays | *dress-up.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, { Y: GOLD, P: PINK, B: SKYB }, 370, F.top - 40, 22 * pop01(t, P.t0 + 0.4, 0.3, 2.4))
      label(x, 790, 820, 'OUTFIT 6 OF 6', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, ...M })
      bubble(x, 790, 980, 'a princess. | obviously.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 370, 760, P.t0 + 0.6, 6, 120, 0.3)
    } },
  { sign: 'scorpio', cap: 'Still keeps | *a secret diary.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DIARY, { K: INK, P: '#7a2e5e', G: GOLD }, 790, 950, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      label(x, 790, 720, 'KEEP OUT ♥', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Still jumps | *in every puddle.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.5, 1.1, 1.7],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.beginPath(); x.ellipse(700, 1080, 220, 46, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#6fc3ff'; x.beginPath(); x.ellipse(700, 1080, 210, 38, 0, 0, Math.PI * 2); x.fill()
    },
    front(x, t, lt, P) {
      for (const h of [0.5, 1.1, 1.7]) { const d = lt - h; if (d > 0.2 && d < 0.6) { x.fillStyle = SKYB; for (let i = 0; i < 7; i++) { const a = Math.PI + i / 6 * Math.PI; x.fillRect(700 + Math.cos(a) * 180 * (d - 0.1) * 2.5, 1060 + Math.sin(a) * 120 * (d - 0.1) * 2.5, 16, 16) } } }
      drawBits(x, BOOT, { Y: GOLD }, 330, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 640, 'SPLASH ×3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'Still runs | *a lemonade stand.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(770, 960); x.scale(0.85 * k, 0.85 * k)
        x.fillStyle = INK; x.fillRect(-170, -40, 340, 200); x.fillStyle = '#ffd86b'; x.fillRect(-160, -30, 320, 180)
        x.fillStyle = INK; x.fillRect(-170, -190, 16, 160); x.fillRect(154, -190, 16, 160)
        for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-190 + i * 64, -220, 64, 50); x.fillStyle = i % 2 ? CREAM : PINK; x.fillRect(-186 + i * 64, -216, 56, 42) }
        txt(x, 'LEMONADE', 0, 30, { size: 40 }); txt(x, 'business: booming', 0, 90, { size: 24, weight: 700 })
        x.restore() }
      label(x, 790, 1170, 'CEO, AGE 7', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Still talks | *to the moon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD, K: INK }, 820, 680, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 920, 'hi moon. | it’s me again', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      sparkles(x, t, 820, 680, P.t0 + 1.5, 6, 120, 0.3, [GOLD, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Still cries | *at cartoons.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 900, 300, 230, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-130, -95, 260, 190)
        x.fillStyle = '#ffffff'; x.fillRect(-20, -60, 18, 50); x.fillRect(8, -60, 18, 50); x.beginPath(); x.arc(3, 10, 44, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.fillRect(-14, 0, 8, 8); x.fillRect(12, 0, 8, 8); x.fillStyle = SKYB; x.fillRect(-14, 12, 6, 14)
      })
      label(x, 790, 690, 'THE BUNNY WAS SAD', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0234', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *inner child.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve grown-ups. | *Twelve kids inside.*' },
  lesson: { text: 'Be kind to the kid | *you used to be.*', chip: 'STATUS: PLAYFUL' },
  last: { text: 'Recess is | *never over.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
