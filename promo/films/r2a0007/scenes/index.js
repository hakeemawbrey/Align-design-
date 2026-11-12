// r2a0007: star_advice ADVICE ROLLCALL, "What each sign | needs to unlearn." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order: one old belief each sign can put down, said kindly, with one light visual gag:
//   ♈ that slow means losing (the turtle finished) · ♉ that new means scary (the new mug is nice) · ♊ that you're
//   "too much" · ♋ that you have to feed everyone (twelve packed lunches) · ♌ that applause equals love · ♍ that good
//   has to be perfect (crooked frame, still cute) · ♎ that every "no" breaks a heart · ♏ that trust is a trap (unlocked)
//   · ♐ that staying means stuck (the plant lived) · ♑ that worth is output (nap: checked) · ♒ that needing people is
//   uncool (two mugs) · ♓ that feeling a lot is a flaw (big heart: a feature)
//  49.2   GROUP ENDING: "Drop the old script. | *Keep you.*"  group photo, the old scripts flutter away.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dd3a8'
const TURTLE = [
  '....GGGGG.....',
  '...GDGDGDG....',
  '..GGDGGGDGG.HH',
  '.GDGGDGDGGDGHK',
  'GGGGGGGGGGGGHH',
  '.HH.HH..HH.HH.',
]
const TURTLE_C = { G: '#5fd068', D: '#3f9e4a', H: '#c7e8a0', K: INK }
const MUG = [
  'WWWWWWWWW..',
  'WWWWWWWWWWW',
  'WPPWPPWPW.W',
  'WPPWPPWPW.W',
  'WWWWWWWWWWW',
  'WWWWWWWWW..',
  '.WWWWWWW...',
]
const MUG_C = { W: '#fff4e2', P: PINK }
const LUNCH = ['RRRRRR', 'RYYYYR', 'RRRRRR']
const FRAME = [
  'BBBBBBBBBBBB',
  'BSSSSSSSSSSB',
  'BSSSSYSSSSSB',
  'BSSSYYYSSSSB',
  'BSSGGGGGGSSB',
  'BSGGGGGGGGSB',
  'BBBBBBBBBBBB',
]
const FRAME_C = { B: '#c98f2a', S: '#8fe3ff', Y: '#ffd23a', G: '#5fd068' }
const LOCK = [
  '...GGGG.....',
  '..G....G....',
  '..G.....G...',
  '..G......G..',
  '.YYYYYYY....',
  '.YYYYYYY....',
  '.YYYKYYY....',
  '.YYYKYYY....',
  '.YYYYYYY....',
]
const LOCK_C = { G: '#9aa5c4', Y: GOLD, K: INK }
const PLANT = [
  '.L.L.L.',
  'LLLLLLL',
  '.LLLLL.',
  '...S...',
  '.PPPPP.',
  '.PPPPP.',
  '..PPP..',
]
const PLANT_C = { L: '#5fd068', S: '#3f9e4a', P: '#c96a3a' }
const SCROLL = ['WWWWWW', 'WKKKKW', 'WWWWWW', 'WKKKWW', 'WWWWWW']

/** a paper list with tickable rows */
function list(x, cx, cy, k, rows, ticks, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = 330, H = 70 + rows.length * 62
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#fff4e2'; x.fillRect(-W / 2, -H / 2, W, H)
  x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  rows.forEach((r, i) => {
    const y = -H / 2 + 60 + i * 62
    x.fillStyle = INK; x.fillRect(-W / 2 + 22, y - 16, 32, 32); x.fillStyle = '#fff4e2'; x.fillRect(-W / 2 + 26, y - 12, 24, 24)
    if (ticks[i]) { x.fillStyle = '#2fc79a'; x.fillRect(-W / 2 + 28, y - 10, 20, 20) }
    x.fillStyle = INK; x.fillText(r, -W / 2 + 72, y + 2)
  })
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'That slow | means *losing.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inOutQuad(prog(lt, 0.2, 1.6))
      drawBits(x, TURTLE, TURTLE_C, lerp(640, 820, p), 1000, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.fillStyle = BONE; x.fillRect(900, 880, 10, 200); x.fillStyle = INK; x.fillRect(872, 880, 28, 28)
      label(x, 780, 700, 'THE TURTLE FINISHED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'That new | means *scary.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'NEW MUG', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04 })
      bubble(x, 790, 1120, 'oh. it’s nice.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'That you’re | *“too much.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ['and also—', 'oh! and—', 'wait, wait—'].forEach((s, i) => bubble(x, 760 + (i % 2) * 50, 640 + i * 130, s, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2), { size: 36, tail: i % 2 ? 'br' : 'bl' }))
      label(x, 790, 1130, 'JUST ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.05 })
    } },
  { sign: 'cancer', cap: 'That you must | *feed everyone.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, LUNCH, { R: i % 2 ? '#ff8fb1' : '#8fe3ff', Y: '#fff4e2' }, 790 + ((i % 2) * 2 - 1) * 10, 1050 - i * 52, 22 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      label(x, 790, 640, 'PACKED: 12 LUNCHES', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04 })
      bubble(x, 790, 1170, 'eat yours too.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'That applause | *equals love.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const off = lt > 0.9
      label(x, 790, 700, 'APPLAUSE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: off ? '#4a3f86' : '#ff4f86', color: off ? '#9aa5c4' : '#fff4e2', rot: 0, font: MONO, weight: 700 })
      label(x, 790, 920, 'STILL LOVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.05 })
      hearts(x, t, 370, 820, P.t0 + 1.4, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'virgo', cap: 'That good | has to be *perfect.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FRAME, FRAME_C, 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.14 })
      label(x, 790, 1080, 'CROOKED. STILL CUTE.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'That every “no” | *breaks a heart.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'no, thank you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 780, 900, 'oh, cool!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      label(x, 790, 1120, 'STILL FRIENDS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'That trust | is *a trap.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = ease.outBack ? ease.outCubic(prog(lt, 0.8, 1.2)) : 0
      x.save(); x.translate(800, 880); x.translate(0, -open * 30); x.translate(-800, -880)
      drawBits(x, LOCK, LOCK_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      label(x, 790, 1130, 'UNLOCKED (GENTLY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 6, 160, 0.3)
    } },
  { sign: 'sagittarius', cap: 'That staying | means *stuck.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'DAY 300', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'THE PLANT LIVED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'That your worth | is *your output.*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      list(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['work', 'work', 'more work', 'nap'], [lt > 0.6, lt > 0.8, lt > 1.0, lt > 1.6])
      label(x, 790, 1150, 'NAP: COUNTS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'That needing people | is *uncool.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: '#8fe3ff', P: '#fff4e2' }, 720, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUG, MUG_C, 880, 900, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 700, 'TABLE FOR TWO', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
      hearts(x, t, 800, 840, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: 'pisces', cap: 'That feeling a lot | is *a flaw.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, 'BIG HEART:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: 0.03 })
      label(x, 790, 940, 'A FEATURE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 48, bg: PINK, rot: -0.04 })
      hearts(x, t, 370, 800, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0007', key: 'F', accent: ACC, ending: 'group',
  title: 'What each sign | *needs to unlearn.*',
  cameos: CAMEOS,
  group: {
    cap: 'Drop the old script. | *Keep you.*',
    draw(x, t, lt) {
      for (let i = 0; i < 6; i++) {
        const p = prog(lt, 1.4 + i * 0.12, 3.6 + i * 0.12)
        if (p <= 0 || p >= 1) continue
        drawBits(x, SCROLL, { W: '#fff4e2', K: '#9aa5c4' }, 200 + i * 140 + Math.sin(p * 9 + i) * 40, 1000 - p * 700, 12, { rot: Math.sin(p * 6 + i) * 0.6, alpha: 1 - p })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
