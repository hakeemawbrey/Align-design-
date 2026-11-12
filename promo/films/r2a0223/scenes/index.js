// r2a0223: star_advice, ADVICE SOLO, "Capricorn, this is your sign | to slow down." (~43 s vertical, signs3kit, lofi · C)
// One sign the whole way through (solo mode, 9 cards): Capricorn's non-stop drive, gently reframed toward rest.
//   0.0–3.6    "Capricorn, this is | your sign | *to slow down.*"
//   3.6–37.8   emails at dinner, the inbox can wait · ten-year plan, plan one nap · rest is maintenance · climbed the
//              mountain, enjoy the view · a holiday laptop, leave it home · a productive bath is just a bath · celebrate
//              the win (with cake) · even Saturn takes it slow · slow is still forward (a winning snail)
//  37.8        group ending: "Still the boss. | *Now well-rested.*"  
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, laptop, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'capricorn', ST = { x: -190 }, TEAL = '#2fc79a'

const TUB = ['W..............', 'W..............', 'WBBBBBBBBBBBBBW', 'WSSSSSSSSSSSSSW', 'WSSSSSSSSSSSSSW', '.WSSSSSSSSSSSW.', '..WWWWWWWWWWW..', '..K.........K..']
const TUB_C = { W: '#e8eef8', B: '#bfe9ff', S: SKYB, K: GREY }
const DUCK = ['.YY.', 'YYKO', 'YYYY', '.YYY']
const DUCK_C = { Y: SUN, K: INK, O: ORANGE }
const CAKE = ['..R.R.R..', '..Y.Y.Y..', 'PPPPPPPPP', 'WWWWWWWWW', 'PPPPPPPPP', 'PPPPPPPPP', 'BBBBBBBBB']
const CAKE_C = { R: RED, Y: SUN, P: PINK, W: CREAM, B: BROWN }
const SNAIL = ['...SSSS.......', '..SSssSS......', '.SSsSSsSS.....', '.SSsSSSSS..KK.', '.SSSsssSS..GG.', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.']
const SNAIL_C = { S: ORANGE, s: '#c98f2a', G: '#b9e8a0', K: INK }
const UMBRELLA = ['....RRRRR....', '..RRWWRRWWR..', '.RRWWRRWWRRR.', 'RRRRRRRRRRRRR', '......B......', '......B......', '......B......', '......B......', '......B......']
const UMBRELLA_C = { R: RED, W: CREAM, B: BROWN }

/** a pixel Saturn with its ring, sleepy */
function saturn(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.25); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 186, 46, 0, Math.PI, Math.PI * 2); x.fill()
  x.fillStyle = '#ffe7a8'; x.beginPath(); x.ellipse(0, 0, 176, 36, 0, Math.PI, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 98, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8c27a'; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c98f2a'; x.fillRect(-88, -30, 176, 14); x.fillRect(-80, 24, 160, 12)
  x.fillStyle = INK; x.fillRect(-46, -6, 30, 8); x.fillRect(16, -6, 30, 8); x.fillRect(-14, 40, 28, 6)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 186, 46, 0, 0, Math.PI); x.fill()
  x.fillStyle = '#ffe7a8'; x.beginPath(); x.ellipse(0, 0, 176, 36, 0, 0, Math.PI); x.fill()
  x.fillStyle = '#ffe7a8'; x.fillRect(-90, 0, 180, 2)
  x.restore()
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * k; x.fillStyle = BONE; x.font = `800 ${30 + i * 8}px ${INTER}`; x.fillText('z', cx + 110 + ph * 60, cy - 110 - ph * 120); x.restore() }
}
/** a simple pixel mountain with a flag and a bench on top */
function mountain(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-210, 170); x.lineTo(0, -170); x.lineTo(210, 170); x.closePath(); x.fill()
  x.fillStyle = '#7a86a8'; x.beginPath(); x.moveTo(-196, 162); x.lineTo(0, -156); x.lineTo(196, 162); x.closePath(); x.fill()
  x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-56, -66); x.lineTo(0, -156); x.lineTo(56, -66); x.lineTo(20, -80); x.lineTo(0, -60); x.lineTo(-24, -82); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-4, -230, 8, 76); x.fillStyle = TEAL; x.fillRect(4, -230, 50, 30)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Emails at dinner? | *The inbox can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const off = lt > 1.2
      laptop(x, 780, 950, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        if (off) { txt(x, 'OUT OF', 0, -22, { size: 30, color: MINT, font: MONO, weight: 700 }); txt(x, 'OFFICE', 0, 20, { size: 30, color: MINT, font: MONO, weight: 700 }); return }
        txt(x, 'INBOX', 0, -40, { size: 28, color: BONE, font: MONO, weight: 700 })
        txt(x, String(1204 + Math.floor(lt * 40)), 0, 20, { size: 44, color: RED, font: MONO, weight: 700 })
      })
      label(x, 790, 650, 'DINNER: ACTUALLY EATEN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten-year plan by Tuesday? | *Plan one nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, lt > 1.2 ? 'TODAY’S PLAN' : '10-YEAR PLAN', 0, -140, { size: 30, font: MONO, weight: 700 })
        if (lt <= 1.2) for (let i = 0; i < 7; i++) { x.fillStyle = ['#6b62a8', TEAL, RED][i % 3]; x.fillRect(-130 + (i % 3) * 20, -90 + i * 34, 160 + (i % 2) * 60, 20) }
        else { x.fillStyle = LAV; x.fillRect(-120, -40, 240, 90); txt(x, '1. NAP', 0, 5, { size: 46, font: MONO, weight: 700 }) }
      })
      if (lt > 1.2) sparkles(x, t, 790, 860, P.t0 + 1.25 * 1.29, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Rest isn’t lazy. | *It’s maintenance.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 250, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffe7a8', rot: -0.04 }, () => {
        txt(x, 'SERVICE DUE:', 0, -60, { size: 30, font: MONO, weight: 700 })
        txt(x, '8 HRS SLEEP', 0, 0, { size: 38, font: MONO, weight: 700, color: RED })
        txt(x, 'part no. ♑', 0, 58, { size: 24, font: MONO, weight: 700, color: '#6e6658' })
      })
      label(x, 790, 1080, '✓ SERVICED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reached the top? | *Enjoy the view.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      mountain(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 790, 640, lt > 1.2 ? 'oh. pretty.' : 'next mountain?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1130, 'VIEW: ENJOYED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laptop at the beach? | *Leave it home.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, UMBRELLA, UMBRELLA_C, 820, 860, 24 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.9, 1.4))
      if (fly < 1) laptop(x, lerp(790, 1100, fly), lerp(1080, 700, fly), 0.6 * pop01(t, P.t0 + 0.3, 0.35, 2), null, { rot: fly * 2 })
      label(x, 790, 1120, 'LAPTOP: STAYS HOME', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A productive bath? | *It’s just a bath.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190, y: -30 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, DUCK, DUCK_C, 720 + Math.sin(t * 2) * 20, 905, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 680, lt > 1.3 ? 'AGENDA: NONE' : 'AGENDA: 9 ITEMS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: lt > 1.3 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hit a goal? | *Have the cake first.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.4) for (let i = 0; i < 3; i++) { x.fillStyle = Math.sin(t * 12 + i) > 0 ? SUN : ORANGE; x.fillRect(790 - 48 + i * 48 - 6, 920 - 3.5 * 24 - 30, 12, 18) }
      bubble(x, 790, 680, lt > 1.1 ? '…after cake.' : 'next goal—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      confetti(x, t, 640, 860, P.t0 + 1.3, { n: 16, spread: 260, h: 460 })
    } },
  { sign: S, cap: 'Even Saturn | *takes it slow.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      saturn(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.4, 2))
      label(x, 790, 1090, 'YOUR RULER: NAPPING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow is still | *moving forward.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 2.0)
      drawBits(x, SNAIL, SNAIL_C, lerp(640, 800, p), 1000, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.fillStyle = INK; x.fillRect(900, 880, 10, 170); for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(910, 880 + i * 14, 40, 14) }
      label(x, 790, 720, 'PACE: PERFECT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 760, 940, P.t0 + 1.6, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0223', key: 'C', accent: TEAL, solo: S, ending: 'group',
  title: 'Capricorn, this is | your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Still the boss. | *Now well-rested.*', mood: 'sleepy' },
})
export const DURATION = F.DURATION
// the hook is three lines: shrink the title box a little so it clears the solo star
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.78)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
