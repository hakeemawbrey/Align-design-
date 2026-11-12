// r2a0162: star_advice, ADVICE SOLO, "Leo, have you | eaten today?" (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): Leo, busy shining and hosting, gently reminded to eat.
//   0.0–3.6    "Leo, have you | *eaten today?*"
//   3.6–37.8   nine cards (3.8 s each):
//              hosting everyone, fill your plate first · too fabulous to eat, fabulous needs fuel · lunch photoshoot,
//              eat it warm · hair took all morning, toast is quick · rehearsing, snack between takes · stomach roaring
//              louder than you · fancy dinner or nothing, cereal is royal too · no water since sunrise · fed and glowing
//  37.8        group ending: "Royalty eats. | *Every single day.*"  Leo comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'leo'
const ST = { x: -190 }

const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const TOASTER = ['..TT...TT...', '..TT...TT...', 'GGGGGGGGGGGG', 'GKKGGGGGKKGG', 'GGGGGGGGGGGG', 'GGGGGGGGGGRG', 'GGGGGGGGGGGG', '.BB......BB.']
const TOAST_C = { T: '#e8a24a', G: '#c9c9d8', K: INK, R: RED, B: '#6b62a8' }
const CLAP = ['KWKWKWKWKWKW', 'WKWKWKWKWKWK', 'KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const BAR = ['KKKKKKKKKK', 'KOOOOOOOOK', 'KOWOWOWOOK', 'KOOOOOOOOK', 'KKKKKKKKKK']
const BOWL = ['WWWWWWWWWWWWWW', 'WYOYPYOYYPYOYW', '.WWWWWWWWWWWW.', '..WSSSSSSSSW..', '...WWWWWWWW...']
const BOWL_C = { W: CREAM, Y: GOLD, O: ORANGE, P: PINK, S: SKYB }

/** a plate (with or without food) at (cx, cy) */
function plate(x, cx, cy, k, food, { r = 70 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, r + 6, r * 0.45 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8dfcf'; x.beginPath(); x.ellipse(0, 0, r * 0.65, r * 0.28, 0, 0, Math.PI * 2); x.fill()
  if (food > 0.01) {
    x.save(); x.scale(food, food)
    x.fillStyle = '#5fd068'; x.fillRect(-36, -18, 26, 16); x.fillStyle = ORANGE; x.fillRect(-8, -24, 30, 22); x.fillStyle = '#c98f6a'; x.fillRect(18, -16, 22, 14)
    x.restore()
  }
  x.restore()
}
/** a round gauge, needle from E (0) to F (1) */
function gauge(x, cx, cy, k, v, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.fill()
  x.fillStyle = DEEP; x.beginPath(); x.arc(0, 0, 138, Math.PI, 0); x.lineTo(138, 20); x.lineTo(-138, 20); x.fill()
  for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI; x.fillStyle = i < 2 ? RED : i > 6 ? MINT : BONE; x.fillRect(Math.cos(a) * 112 - 5, Math.sin(a) * 112 - 5, 10, 10) }
  txt(x, 'E', -110, 0, { size: 30, color: RED, font: MONO, weight: 700 }); txt(x, 'F', 110, 0, { size: 30, color: MINT, font: MONO, weight: 700 })
  x.save(); x.rotate(Math.PI + v * Math.PI); x.fillStyle = ORANGE; x.fillRect(0, -6, 100, 12); x.restore()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
  txt(x, title, 0, 70, { size: 30, color: BONE, font: MONO, weight: 700 })
  x.restore()
}
/** a tall glass filling with water to level f */
function glass(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-76, -150, 152, 300)
  x.fillStyle = 'rgba(185,230,242,0.35)'; x.fillRect(-66, -140, 132, 280)
  const h = 270 * clamp(f); x.fillStyle = SKYB; x.fillRect(-66, 140 - h, 132, h)
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-50, -120, 14, 220)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Hosting everyone’s dinner? | *Fill your plate first.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 790, 900, 380, 30, k, { bg: WOOD, rot: 0 })
      for (let i = 0; i < 3; i++) plate(x, 680 + i * 110, 860, pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2), 1, { r: 46 })
      plate(x, 790, 1010, pop01(t, P.t0 + 0.6, 0.3, 2), pop01(t, P.t0 + 1.5, 0.35, 2.2), { r: 70 })
      label(x, 790, 1120, 'LEO’S PLATE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 700, 'seconds, anyone?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Too busy being fabulous? | *Fabulous needs fuel.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gauge(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lerp(0.04, 0.95, ease.inOutCubic(prog(lt, 1.0, 1.9))), 'GLAMOUR TANK')
      label(x, 790, 1080, 'REFUEL: ONE SANDWICH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lunch-break photoshoot? | *Eat it while it’s warm.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      plate(x, 790, 940, 1.3 * k, 1, { r: 100 })
      if (lt > 0.3 && Math.floor(t * 3) % 3 === 0 && lt < 1.3) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#fff'; x.fillRect(640, 640, 300, 420); x.restore() }
      label(x, 790, 700, `PHOTO ${40 + Math.floor(prog(lt, 0.2, 1.3) * 8)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'STATUS: STILL WARM', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hair took all morning? | *Toast takes two minutes.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), up = ease.outCubic(prog(lt, 1.0, 1.25))
      if (k > 0.01) for (const d of [-1, 1]) { x.save(); x.translate(790 + d * 70, 900 - up * 130); x.rotate(up * d * 0.3); x.fillStyle = INK; x.fillRect(-40, -46, 80, 92); x.fillStyle = '#e8a24a'; x.fillRect(-34, -40, 68, 80); x.fillStyle = '#fff1b0'; x.fillRect(-24, -30, 48, 60); x.restore() }
      drawBits(x, TOASTER, TOAST_C, 790, 950, 20 * k)
      if (up > 0.9) sparkles(x, t, 790, 760, P.t0 + 1.25 * 1.29, 6, 150, 0.3)
      label(x, 790, 1120, 'HAIR: PERFECT', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rehearsing again? | *Snack between takes.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CLAP, { K: INK, W: CREAM }, 790, 800, 22 * k, { rot: 0.04 })
      if (k > 0.01) { x.save(); x.translate(790, 800); x.scale(k, k); txt(x, 'TAKE 12', 0, 30, { size: 40, font: MONO, weight: 700 }); x.restore() }
      drawBits(x, BAR, { K: INK, O: ORANGE, W: CREAM }, 790, 1000, 24 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: -0.1 })
      label(x, 790, 1120, 'SNACK SCENE: ADDED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stomach roaring? | *Listen to it.*', mood: lt => lt > 0.7 ? 'wide' : 'happy', look: [0, 1], star: ST, hops: [0.8],
    front(x, t, lt, P, F) {
      const r = pop01(t, P.t0 + 0.9, 0.3, 2.6)
      bubble(x, 760, 820, 'GRRRROWL', r * (1 + 0.05 * Math.sin(t * 30)), { size: 64, col: ORANGE, tail: 'bl' })
      for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = r * 0.8; x.strokeStyle = ORANGE; x.lineWidth = 8; x.beginPath(); x.arc(F.x, F.cy + 40, 150 + i * 30 + 20 * Math.sin(t * 8 + i), -0.6, 0.6); x.stroke(); x.restore() }
      label(x, 790, 1060, 'EVEN THE LION AGREES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fancy dinner or nothing? | *Cereal is royal too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOWL, BOWL_C, 790, 950, 22 * k)
      const c = ease.outCubic(prog(lt, 0.9, 1.3))
      drawBits(x, CROWN, CROWN_C, 790, lerp(620, 860, c), 16, { alpha: clamp(c * 4), rot: 0.06 })
      if (c >= 1) sparkles(x, t, 790, 860, P.t0 + 1.3 * 1.29, 6, 160, 0.4)
      label(x, 790, 1110, 'BY ROYAL DECREE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No water since sunrise? | *Even suns hydrate.*', mood: lt => lt > 1.6 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      glass(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.6, 1.8)))
      label(x, 790, 1100, 'GLASS #1 OF THE DAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fed and glowing. | *That’s the look.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      plate(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), 0, { r: 90 })
      label(x, 790, 760, 'PLATE: CLEAN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'GLOW: RESTORED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0162', key: 'F', accent: ORANGE, solo: S, ending: 'group',
  title: 'Leo, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Royalty eats. | *Every single day.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
