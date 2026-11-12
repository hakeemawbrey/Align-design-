// r2a0168: star_advice, ADVICE SOLO, "Leo, it's okay | to start over." (~49 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe.
//   0.0–3.6    "Leo, it’s okay | *to start over.*"
//   3.6–37.8   new city, no audience yet (be your own front row) · changed careers (main characters get sequels)
//              · the comeback feels slow (royalty strolls: a snail in a crown) · closed a chapter (write a better one)
//              · haircut regret (it grows, you glow) · beginner again (beginners still shine) · starting over in love
//              (your heart's still gold) · lost the crown (it was never the crown) · day one again (still the star)
//  37.8        "New start. | *Same shine.*"
//  41.0        LESSON: "Starting over isn’t losing. | It’s your *second act.*"  STATUS: ENCORE
//  46.9        "Take a bow. | *Then begin.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'leo', ACC = '#ffb34a'
const ST = { x: -190 }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const SEAT = ['.RRRRR.', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR', 'KKKKKKK', 'K.....K']
const SNAIL = ['....SSSS...', '...SsSSsS..', '..SSsssSS..', '..SSsSSsS..', 'BB.SSSSS...', 'BBBBBBBBBBB']
const CLAP = ['WKWKWKWKWK', 'KWKWKWKWKW', 'KKKKKKKKKK', 'KKKKKKKKKK', 'KKKKKKKKKK', 'KKKKKKKKKK', 'KKKKKKKKKK']
const SCISSORS = ['G.....G', '.G...G.', '..G.G..', '...G...', '..R.R..', '.R...R.', 'RR...RR']
const GHEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const CAMEOS = [
  // 1 · front row
  { sign: S, cap: 'New city, no audience yet? | *Be your own front row.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SEAT, { R: '#b03a52', K: INK }, 680 + (i % 3) * 110, 860 + Math.floor(i / 3) * 110, 12 * pop01(t, P.t0 + 0.2 + i * 0.06, 0.25, 2))
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 680, 830, 110 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false })
      label(x, 790, 680, 'FRONT ROW: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 2 · sequels
  { sign: S, cap: 'Changed careers? | *Main characters get sequels.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), snap = lt > 1.0 ? 0 : 0.35
      drawBits(x, CLAP.slice(0, 2), { W: CREAM, K: INK }, 790, 800 - 30 * snap, 24 * k, { rot: -snap })
      drawBits(x, CLAP.slice(2), { K: INK }, 790, 900, 24 * k, { outline: '#3a2f6a' })
      if (k > 0.01) txt(x, 'TAKE 2', 790, 905, { size: 44, font: MONO, weight: 700, color: CREAM })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 180, 0.4)
      label(x, 790, 1100, 'PART TWO: BETTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 3 · the slow comeback
  { sign: S, cap: 'The comeback feels slow? | *Royalty strolls.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sx = lerp(860, 760, prog(lt, 0.3, 2.4))
      drawBits(x, SNAIL, { S: '#e8a24a', s: '#c4782e', B: '#8fd18a' }, sx, 980, 20 * k)
      drawBits(x, CROWN, CROWN_C, sx - 60, 880, 8 * pop01(t, P.t0 + 0.9, 0.3, 2.4), { rot: -0.1 })
      label(x, 790, 700, 'PACE: ROYAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 4 · a new chapter
  { sign: S, cap: 'Closed a chapter? | *Write a better one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = INK; x.fillRect(-3, -140, 6, 280)
        txt(x, 'CH. 1', -90, -90, { size: 30, font: MONO, weight: 700, color: GREY })
        x.strokeStyle = GREY; x.lineWidth = 6; x.beginPath(); x.moveTo(-150, -90); x.lineTo(-30, -90); x.stroke()
        if (lt > 0.9) { txt(x, 'CH. 2', 90, -90, { size: 32, font: MONO, weight: 700, color: RED }); txt(x, 'Leo', 90, -10, { size: 44 }); txt(x, 'THRIVES', 90, 50, { size: 36, color: '#e07a00' }) }
      })
      sparkles(x, t, 880, 840, P.t0 + 1.2, 6, 140, 0.6)
    } },
  // 5 · the haircut
  { sign: S, cap: 'Haircut regret? | *It grows. You glow.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCISSORS, { G: '#c9c9d8', R: RED }, 790, 780, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 + Math.sin(t * 9) * 0.1 * (lt < 1.0 ? 1 : 0) })
      const n = Math.floor(prog(lt, 1.0, 2.2) * 100)
      label(x, 790, 1000, `MANE: ${n}%`, pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 6 · beginner again
  { sign: S, cap: 'Beginner again? | *Beginners still shine.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff1b0', rot: -0.04 }, () => {
        txt(x, 'HELLO, I’M', 0, -40, { size: 26, font: MONO, weight: 700 })
        txt(x, 'THE NEW ONE', 0, 20, { size: 34 })
      })
      sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 200, 0.2, [GOLD, ACC, BONE])
      label(x, 790, 1040, 'SPARKLE: INCLUDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 7 · Align: starting over in love
  { sign: S, cap: 'Starting over in love? | *Your heart’s still gold.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.shadowColor = GOLD; x.shadowBlur = 30
      drawBits(x, GHEART, { H: GOLD, W: '#fff6c8' }, 790, 860, 26 * k, { rot: Math.sin(t * 2) * 0.05 })
      x.restore()
      label(x, 790, 670, '✦ NEW PROFILE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1070, 'CONDITION: MINT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · lost the crown
  { sign: S, cap: 'Lost the crown? | *It was never the crown.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: lt => lt > 1.4 ? [0, 0] : [1, 1], star: ST,
    front(x, t, lt, P, F) {
      const fall = ease.inQuad(prog(lt, 0.4, 0.9))
      drawBits(x, CROWN, CROWN_C, lerp(F.x, F.x + 230, fall), lerp(F.top - 30, 1100, fall), 13, { rot: fall * 1.4, alpha: pop01(t, P.t0 + 0.1, 0.2, 2) })
      if (lt > 1.4) sparkles(x, t, F.x, F.cy, P.t0 + 1.45, 9, 200, 0.4)
      label(x, 790, 720, 'SHINE: UNCHANGED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 9 · day one
  { sign: S, cap: 'Day one again? | *Still the star.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-130, -140, 260, 70); txt(x, 'TODAY', 0, -104, { size: 32, color: CREAM })
        txt(x, 'DAY 1', 0, 30, { size: 64 })
      })
      confetti(x, t, 640, 860, P.t0 + 1.1, { n: 18, spread: 300, h: 500 })
    } },
]

const F = makeFilm({
  id: 'r2a0168', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leo, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'New start. | *Same shine.*', mood: 'sparkle' },
  lesson: { text: 'Starting over isn’t losing. | It’s your *second act.*', chip: 'STATUS: ENCORE' },
  last: {
    text: 'Take a bow. | *Then begin.*',
    draw(x, t, lt) {
      sparkles(x, t, 540, 860, t - lt + 0.9, 9, 240, 0.3)
      label(x, 540, 1160, 'CURTAIN: UP', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
