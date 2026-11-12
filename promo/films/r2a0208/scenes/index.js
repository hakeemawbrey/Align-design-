// r2a0208: star_advice, ADVICE SOLO, "Aries, have you | eaten today?" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the sign that runs on fire, gently fed.
//   0.0–3.6    "Aries, have you | *eaten today?*"
//   3.6–37.8   nine cards (3.8 s each): ran out the door, breakfast can come too · hangry, that's just hunger talking
//              · workout before food, muscles need fuel · ate standing up, sit for five minutes · racing through
//              lunch, it's not a contest · forgot to eat mid-project, the project can wait · burnt the toast, still
//              counts as cooking · microwave too slow, thirty seconds, you've got this · fed everyone, grab a plate too
//  37.8        GROUP ENDING: "Fierce on the outside. | *Fed on the inside.*"  Aries comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, laptop, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aries', ACC = '#ff6b5a'
const ST = { x: -190 }

const TOAST = ['.TTTTTT.', 'TTTTTTTT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TBBBBBBT', 'TTTTTTTT']
const TOAST_C = { T: '#c98f2a', B: '#f2cf8a' }
const BURNT_C = { T: '#2a1a14', B: '#4a3226' }
const APPLE = ['....S...', '...SL...', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const APPLE_C = { S: '#8a4a2e', L: GREEN, R: '#e23d4e', W: '#fff' }
const DUMB = ['KK......KK', 'KK......KK', 'KKGGGGGGKK', 'KK......KK', 'KK......KK']
const BANANA = ['.......YB', '......YY.', '.....YY..', 'Y..YYY...', 'YYYYY....', '.YYY.....']
const BOWL = ['.N..N..N.', '..N..N...', 'OOOOOOOOO', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const BOWL_C = { N: '#ffd86b', O: ORANGE, W: '#fff4e2', K: INK }
const CHAIR = ['RR........', 'RR........', 'RR........', 'RR........', 'RRrrrrrrrr', 'RRRRRRRRRR', 'RR......RR', 'RR......RR', 'RR......RR']
const PLATE = ['..WWWWWWWWW..', '.WWGGWRRWYYW.', 'WWWGGWRRWYYWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2', G: GREEN, R: '#e23d4e', Y: '#ffd86b' }

/** a microwave with a countdown */
function microwave(x, cx, cy, k, secs) {
  card(x, cx, cy, 340, 220, k, { bg: '#9aa5c4', rot: 0 }, () => {
    x.fillStyle = INK; x.fillRect(-150, -90, 210, 180); x.fillStyle = '#2a2350'; x.fillRect(-140, -80, 190, 160)
    x.fillStyle = 'rgba(255,214,107,0.35)'; x.fillRect(-140, -80, 190, 160)
    x.fillStyle = INK; x.fillRect(74, -80, 66, 40); txt(x, `0:${String(Math.max(0, Math.ceil(secs))).padStart(2, '0')}`, 107, -60, { size: 22, font: MONO, weight: 700, color: MINT })
    for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(82 + (i % 2) * 28, -20 + Math.floor(i / 2) * 30, 20, 20) }
  })
}

const CAMEOS = [
  { sign: S, cap: 'Ran out the door? | *Breakfast can come too.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outBack(prog(lt, 0.4, 1.0))
      if (lt > 0.35) drawBits(x, TOAST, TOAST_C, lerp(900, 620, d), lerp(620, 900, d) - Math.sin(Math.PI * d) * 120, 22, { rot: lt * 4 * (1 - d) })
      label(x, 790, 1100, 'TOAST: TO GO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hangry again? | *That’s just hunger talking.*', mood: lt => lt > 1.3 ? 'happy' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      if (lt < 1.2) { x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; for (let i = 0; i < 4; i++) { const ph = (t * 1.2 + i / 4) % 1; x.beginPath(); x.arc(F.x + (i - 1.5) * 50, F.top - 20 - ph * 120, 16 + 14 * ph, 0, Math.PI * 2); x.fill() } x.restore() }
      drawBits(x, APPLE, APPLE_C, 790, 880, 20 * pop01(t, P.t0 + 0.7, 0.35, 2))
      label(x, 790, 650, lt > 1.2 ? 'MOOD: FIXED' : 'MOOD: GRR', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 38, bg: lt > 1.2 ? MINT : ACC, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gym before food? | *Muscles need fuel too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      drawBits(x, DUMB, { K: INK, G: '#9aa5c4' }, 760, 820 - Math.abs(Math.sin(lt * 5)) * 60 * (lt < 1.1 ? 1 : 0), 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { outline: '#55507a' })
      drawBits(x, BANANA, { Y: '#ffd86b', B: '#8a4a2e' }, 800, 1030, 18 * pop01(t, P.t0 + 1.1, 0.35, 2))
      label(x, 790, 640, 'REPS: 200 · FOOD: 0', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ate standing up? | *Sit for five minutes.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { R: '#8a4a2e', r: '#c98f2a' }, 800, 1000, 26 * pop01(t, P.t0 + 0.6, 0.35, 2))
      clock(x, 820, 690, 80, pop01(t, P.t0 + 0.3, 0.35, 2), 12, lt > 1.2 ? 5 : 0)
      label(x, 790, 1170, 'SIT: 5 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Racing through lunch? | *It’s not a contest.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 680, 'LUNCH TIME: 0:40', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'i won!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 50, tail: 'bl' })
      bubble(x, 790, 1070, 'slow down, love', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: S, cap: 'Forgot to eat mid-project? | *The project can wait.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), () => { txt(x, `TASK ${1 + Math.floor(lt * 6)}/40`, 0, 0, { size: 30, font: MONO, weight: 700, color: MINT }) })
      drawBits(x, BOWL, BOWL_C, 790, 1070, 16 * pop01(t, P.t0 + 1.1, 0.35, 2))
      label(x, 790, 640, 'LAST MEAL: ???', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the toast again? | *Still counts as cooking.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, BURNT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { outline: '#55507a' })
      x.save(); x.globalAlpha = 0.5; x.fillStyle = GREY; for (let i = 0; i < 5; i++) { const ph = (t * 0.8 + i / 5) % 1; x.beginPath(); x.arc(790 + Math.sin(i * 2) * 50, 800 - ph * 200, 18 + 18 * ph, 0, Math.PI * 2); x.fill() } x.restore()
      label(x, 790, 1100, 'CHEF: ARIES ★', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Microwave too slow? | *You’ve got this.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST, squash: lt => lt < 1.6 ? 0.04 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      microwave(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 30 - lt * 13)
      if (lt > 2.2) sparkles(x, t, 790, 880, P.t0 + 2.2 * 1.29, 6, 170, 0.4)
      label(x, 790, 1100, 'PATIENCE: LOADING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fed everyone at the party? | *Grab a plate too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['taurus', 'leo', 'pisces'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 110, 720, 100 * k, { mood: 'heart', seed: 50 + i, glyph: false, tears: id === 'pisces' ? 2 : 0 }) })
      drawBits(x, PLATE, PLATE_C, 790, 960, 20 * pop01(t, P.t0 + 1.0, 0.35, 2))
      label(x, 790, 1100, 'THIS PLATE: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0208', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Aries, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Fierce on the outside. | *Fed on the inside.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
