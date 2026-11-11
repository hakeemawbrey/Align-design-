// v3t122: THE SIGNS AS… v3, "Zodiacs on Friday | be like." (~59 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   the end of a long week, every sign pushed to the extreme:
//              ♈ exhausted, booked a race anyway · ♉ 5:01 p.m., already in pyjamas · ♊ too tired to talk, talked for
//              three hours · ♋ long week, made soup for the whole street · ♌ survived the week, gave a speech about it
//              · ♍ weekend plan: a colour-coded nap · ♎ too tired to choose, dinner still pending · ♏ phone off, lights
//              off, unreachable · ♐ said "quiet weekend", packed a backpack · ♑ the week ended, started next week early
//              · ♒ recharging, literally plugged in · ♓ the week is over, cried from relief
//  49.2        "Running on | *empty.*"
//  52.4        LESSON UNLOCKED: "Rest isn’t lazy. | You *earned it.*"  STATUS: OFF DUTY
//  58.3        "See you *Monday.* | Maybe."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e'

const MEDAL = [
  'RR...RR',
  '.RR.RR.',
  '..RRR..',
  '..GGG..',
  '.GGGGG.',
  'GGGWGGG',
  'GGWGGGG',
  '.GGGGG.',
  '..GGG..',
]
const MEDAL_C = { R: RED, G: GOLD, W: '#fff1b0' }
const POT = [
  '.S..S..S.',
  '..S..S...',
  '.S..S..S.',
  'KKKKKKKKK',
  'KOOOOOOOK',
  'KOOOOOOOK',
  'KOOOOOOOK',
  '.KKKKKKK.',
]
const POT_C = { S: '#e8e1f4', K: STEEL, O: '#ffb34a' }
const BOWL = [
  'OOOOOOO',
  'WWWWWWW',
  '.WWWWW.',
  '..WWW..',
]
const BOWL_C = { O: '#ffb34a', W: BONE }
const MIC = [
  '.KKK.',
  'KSSSK',
  'KSSSK',
  '.KKK.',
  '..K..',
  '..K..',
  '..K..',
  '.KKK.',
]
const MIC_C = { K: DARK, S: STEEL }
const PHONE = [
  'KKKKKKK',
  'KDDDDDK',
  'KDRDRDK',
  'KDDRDDK',
  'KDRDRDK',
  'KDDDDDK',
  'KDDDDDK',
  'KKKGKKK',
]
const PHONE_C = { K: DARK, D: '#140c30', R: RED, G: STEEL }
const PACK = [
  '..KKKKK..',
  '.KGGGGGK.',
  'KGGGGGGGK',
  'KGGWWWGGK',
  'KGGGGGGGK',
  'KGOOOOOGK',
  'KGOOOOOGK',
  'KGGGGGGGK',
  '.KKKKKKK.',
]
const PACK_C = { K: INK, G: '#5fd068', W: BONE, O: '#2fc79a' }
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSWWSWWWSK.',
  '.KSSSSSSSSK.',
  '.KSWWWSWWSK.',
  '.KSSSSSSSSK.',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGGK',
]
const LAPTOP_C = { K: DARK, S: SKYB, W: BONE, G: STEEL }
const BATT = [
  'KKKKKKKKKK.',
  'K........KK',
  'K........KK',
  'K........KK',
  'KKKKKKKKKK.',
]

// a colour-coded nap schedule
function napPlan(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380)
  x.fillStyle = BONE; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -150)
  const rows = [['NAP', MINT], ['NAP', SKYB], ['SNACK', GOLD], ['NAP', LAV], ['NAP', PINK]]
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * rows.length + 0.001)
  x.font = `700 26px ${MONO}`
  for (let i = 0; i < Math.min(n + 1, rows.length); i++) {
    x.fillStyle = rows[i][1]; x.fillRect(-120, -110 + i * 58, 240, 46)
    x.fillStyle = INK; x.fillText(rows[i][0], 0, -87 + i * 58)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Totally exhausted. | Booked *a race anyway.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', star: { x: -150 }, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, 790, 900, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.08 })
      label(x, 790, 680, 'RACE: TOMORROW', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: RED, color: BONE, rot: 0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 130, 0.4)
    } },
  { sign: 'taurus', cap: 'Friday, 5:01 p.m. | Already *in pyjamas.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 700, '5:01 P.M.', pop01(t, P.t0 + 0.25, 0.3, 2), { size: 52, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'do not | disturb', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Too tired to talk. | Talked *for three hours.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const W = ['so tired.', 'anyway—', 'and THEN—', 'wait, also—', 'one more thing']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 790, 700, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, `HOUR ${Math.min(3, 1 + Math.floor(lt / 0.7))}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Long week. | Made soup *for the street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) drawBits(x, BOWL, BOWL_C, 670 + i * 80, 1020 - (i % 2) * 20, 13 * pop01(t, P.t0 + 0.8 + i * 0.2, 0.3, 2))
      label(x, 790, 1130, 'BOWLS: 40', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Survived the week. | Gave *a speech* about it.', mood: 'sparkle', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 140, F.cy, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 790, 700, 'i’d like to | thank me', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 1050, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'virgo', cap: 'Weekend plan: | a *colour-coded* nap.', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { napPlan(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Too tired to choose. | Dinner *still pending.*', mood: lt => lt > 1.6 ? 'sleepy' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const w = ['pizza?', 'pasta?', 'soup?', 'pizza??'][Math.min(3, Math.floor(lt * 1.8))]
      bubble(x, 790, 700, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'ORDER: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Phone off. Lights off. | *Unreachable.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -160 },
    back(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 1.0, 1.6))
      if (d > 0) { x.fillStyle = `rgba(6,4,18,${(0.55 * d).toFixed(3)})`; x.fillRect(110, 480, 860, 740) }
    },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1110, 'SEE YOU MONDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Said “quiet weekend.” | Packed *a backpack.*', mood: 'sparkle', star: { x: -160 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'quiet one!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      drawBits(x, PACK, PACK_C, 790, 930, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: -0.06 })
    } },
  { sign: 'capricorn', cap: 'The week ended. | Started *next week early.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'MONDAY: DONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: '#2fc79a', rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Recharging. | *Literally* plugged in.', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', star: { x: -170 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(F.x + 90, F.cy + 60); x.bezierCurveTo(600, 1150, 760, 1150, 800, 1100); x.stroke()
      x.strokeStyle = STEEL; x.lineWidth = 8; x.stroke()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, BATT, { K: BONE }, 790, 760, 22 * k)
      const f = clamp((lt - 0.5) / 1.4)
      if (k > 0.9) { x.fillStyle = f > 0.8 ? MINT : GOLD; x.fillRect(790 - 88 + 6, 760 - 33, 176 * f - 12, 22 * 3) }
      label(x, 790, 920, 'CHARGING', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The week is over. | Cried *from relief.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'it’s | FRIDAY', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t122', key: 'D', accent: LAV, ending: 'lesson',
  title: 'Zodiacs on Friday | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Running on | *empty.*', moods: Array(12).fill('sleepy') },
  lesson: { text: 'Rest isn’t lazy. | You *earned it.*', chip: 'STATUS: OFF DUTY' },
  last: {
    text: 'See you *Monday.* | Maybe.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
