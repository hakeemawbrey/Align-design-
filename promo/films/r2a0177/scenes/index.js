// r2a0177: star_advice, ADVICE SOLO (Libra), "Libra, you're doing | better than you think." (~43 s vertical, signs3kit social cut, music: lofi · F)
// Nine cards, each a relatable Libra truth + a warm reframe, one gag each. Ending: group.
//   0.0–3.6    "Libra, you’re | doing *better.*"
//   3.6–37.8   an hour to choose = choosing with care · kept the peace (the scales) · changed your mind = growth
//              · said no once, the world is fine · three outfits, iconic each · everyone feels welcome (the mat)
//              · unread messages: rest first · a match says you're easy to talk to · dessert: get both
//  37.8        GROUP (the ending): "Not perfect. | *Still brilliant.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'libra', ST = { x: -170 }, ROSE = '#ff8fb1'

const SCALES = ['.....G.....', '....GGG....', 'GGGGGGGGGGG', 'G....G....G', 'G....G....G', 'G....G....G', 'PP...G...PP', 'PPP..G..PPP', '.....G.....', '...GGGGG...']
const SCALES_C = { G: GOLD, P: PINK }
const GLOBE = ['..BBBB..', '.BGGBBB.', 'BGGGBBGB', 'BBGBBGGB', 'BBBBBGGB', 'BGBBBBBB', '.BGGBBB.', '..BBBB..']
const GLOBE_C = { B: '#3d8fd8', G: '#5fd068' }
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: '#6b62a8', G: '#9aa5c4' }
const CAKE = ['......PP', '....PPPP', '..PPPPPP', 'WWWWWWWW', 'CCCCCCCC', 'WWWWWWWW', 'CCCCCCCC']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

function mat(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -70, 380, 140); x.fillStyle = '#c98f2a'; x.fillRect(-180, -60, 360, 120)
  x.fillStyle = '#a8742a'; for (let i = 0; i < 9; i++) x.fillRect(-172 + i * 40, -52, 6, 104)
  x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WELCOME', 0, 4)
  x.restore()
}
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, 7); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 170, 0, 0, 7); x.fill()
  x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 100, 150, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-60, -100, 16, 80); x.fillRect(-36, -110, 10, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'An hour to choose? | You chose *with care.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => lt < 1.4 ? [Math.sin(lt * 6) > 0 ? 1 : -1, 0] : [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const pick = lt > 1.4
      label(x, 720, 780, 'SOUP', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: pick ? MINT : BONE, rot: -0.06, font: MONO, weight: 700 })
      label(x, 870, 920, 'SALAD', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: BONE, rot: 0.06, font: MONO, weight: 700 })
      if (pick) sparkles(x, t, 720, 780, P.t0 + 1.4 * 1.29, 6, 110, 0.3)
      label(x, 790, 1120, 'CHOSEN WITH LOVE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: ROSE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept the peace again? | That’s *a superpower.*', mood: 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const w = 0.25 * Math.sin(Math.max(0, 1.4 - lt) * 6) * clamp(1.4 - lt)
      drawBits(x, SCALES, SCALES_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: w })
      label(x, 790, 1110, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changed your mind? | That’s *growth,* not flaking.', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.8, 1.1))
      x.save(); x.translate(790, 860); x.scale(Math.abs(1 - 2 * f) * pop01(t, P.t0 + 0.2, 0.3, 2) || 0.001, pop01(t, P.t0 + 0.2, 0.3, 2) || 0.001)
      label(x, 0, 0, f < 0.5 ? 'PLAN A' : 'PLAN B ✓', 1, { size: 56, bg: f < 0.5 ? BONE : MINT, rot: 0, font: MONO, weight: 700 })
      x.restore()
      bubble(x, 790, 1080, 'better fit!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Said no once. | The world is *totally fine.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'no, thank you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: ROSE, tail: 'bl' })
      drawBits(x, GLOBE, GLOBE_C, 790, 900, 22 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: t * 0.3 })
      label(x, 790, 1110, 'WORLD: STILL SPINNING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Three outfits later? | *Iconic* every time.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      mirror(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.min(2, Math.floor(clamp((lt - 0.3) / 1.2) * 3))
      label(x, 790, 1110, `LOOK ${n} OF 3: YES`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: [PINK, LAV, GOLD][n - 1], rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 850, P.t0 + 1.6, 7, 190, 0.6)
    } },
  { sign: S, cap: 'Everyone feels welcome | *because of you.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: -40 },
    front(x, t, lt, P) {
      mat(x, 640, 1110, pop01(t, P.t0 + 0.2, 0.3, 2))
      const ids = ['aries', 'cancer', 'scorpio']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.6 + i * 0.3, 0.35, 2); if (k > 0.01) signChar(x, t, id, 700 + i * 110, 820 + (i % 2) * 40, 110 * k, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.6 }) })
    } },
  { sign: S, cap: 'Unread messages? | *Rest first.* Reply later.', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 860, 760, '12', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 40, bg: '#e23d4e', color: '#fff4e2', rot: 0, font: MONO, weight: 700 })
      drawBits(x, MOON, { Y: GOLD }, 400, 640, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1130, 'DO NOT DISTURB', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match says you’re | *easy to talk to.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      label(x, 790, 650, 'NEW MESSAGE', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'talking to you | is so easy', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: ROSE, tail: 'br' })
      hearts(x, t, 370, 780, P.t0 + 1.3, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Can’t pick dessert? | *Get both.* You earned it.', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { P: PINK, W: '#fff4e2', C: '#c98f2a' }, 720, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAKE, { P: MINT, W: '#fff4e2', C: '#5a3420' }, 880, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: -1 })
      label(x, 790, 1100, 'ORDER: BOTH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0177', key: 'F', accent: ROSE, solo: S, ending: 'group',
  title: 'Libra, you’re | doing *better.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Still brilliant.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
