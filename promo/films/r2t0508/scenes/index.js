// r2t0508: star_talk BELIKE, "Zodiacs losing keys | *be like.*" (signs3kit social cut, music: lofi · G). Ending: group.
//   ♈ kicked the door, it was unlocked · ♉ won't leave the couch, the keys will come · ♊ asked twelve friends, got twelve
//   theories · ♋ calls Mom, she knows · ♌ keychain bigger than the door · ♍ checked the labelled hook nine times
//   · ♎ can't pick which drawer to check · ♏ retraces every step, with evidence · ♐ lost the keys, moved cities
//   · ♑ has a spare of the spare · ♒ built a key-finding robot, lost the robot · ♓ cries, keys were in the fridge.
//   group: "Keys: lost. | Dignity: also." with a giant keyring dropping in over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const ACC = '#f2c75c'
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y..Y.Y.', '.YYY...Y.Y.']
const KEY_C = { Y: GOLD }
const DOOR = ['KKKKKKKKK', 'KBBBBBBBK', 'KBKKBKKBK', 'KBKKBKKBK', 'KBBBBBBBK', 'KBBBBBYBK', 'KBKKBKKBK', 'KBKKBKKBK', 'KBBBBBBBK', 'KKKKKKKKK']
const DOOR_C = { K: INK, B: '#c98f5a', Y: GOLD }
const FRIDGE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWWWWWWHK', 'KKKKKKKKK', 'KWWWWWWWK', 'KWWWWWWHK', 'KWWWWWWHK', 'KWWWWWWWK', 'KKKKKKKKK']
const ROBOT = ['...R...', '..KKK..', '.KSSSK.', '.KSYSK.', '.KSSSK.', 'KKKKKKK', 'KSSSSSK', 'KSKSKSK', '.K...K.']
const LENS = ['..KKKK..', '.KWWWWK.', 'KWWBBWWK', 'KWBBBBWK', 'KWWBBWWK', '.KWWWWK.', '..KKKKKK', '......KK']
const SUIT = ['...KKK...', '..K...K..', 'KKKKKKKKK', 'KOOOOOOOK', 'KOYOOOYOK', 'KOOOOOOOK', 'KOYOOOYOK', 'KKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Kicked the door in. | It was *unlocked.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.6 && lt < 0.9 ? 0.06 * Math.sin(t * 50) : 0 })
      L(x, 790, 680, 'BAM!', pop01(t, P.t0 + 0.6, 0.25, 2.6), RED, -0.08, 44, CREAM)
      L(x, 790, 1130, 'UNLOCKED. ALL ALONG.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Won’t get up. | *The keys will come.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'keys. come here.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 940, 'SEARCH RADIUS: 0', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 32)
      L(x, 790, 1100, 'COUCH: OCCUPIED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Asked twelve friends. | *Got twelve theories.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['ghosts?', 'your car!', 'a raccoon', 'the moon'].forEach((s, i) => bubble(x, 700 + (i % 2) * 180, 650 + i * 120, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 32, col: i % 2 ? '#ffe36a' : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Calls Mom. | *She knows exactly.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'left jacket pocket, | sweetie.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      L(x, 790, 960, 'MOM: NEVER WRONG', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
      hearts(x, t, 470, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Their keychain | is *bigger than the door.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, KEY, KEY_C, 790, 880, 34 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.3 })
      L(x, 790, 1110, 'SIZE: UNLOSABLE', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 0.6, 8, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Checks the labeled hook. | *Nine times.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 800, 260, 120, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0, bg: CREAM }, () => lines(x, ['KEYS GO HERE'], { size: 26 }))
      x.fillStyle = INK; x.fillRect(782, 870, 16, 50)
      const n = 1 + Math.floor(clamp(prog(lt, 0.5, 2.0)) * 8)
      L(x, 790, 1100, `CHECK ${n} OF 9`, pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Can’t pick | *which drawer to check.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      L(x, 690, 820, 'DRAWER A', pop01(t, P.t0 + 0.2, 0.3, 2) * (pick ? 0.9 : 1.15), BONE, -0.04, 42)
      L(x, 880, 960, 'DRAWER B', pop01(t, P.t0 + 0.4, 0.3, 2) * (pick ? 1.15 : 0.9), BONE, 0.04, 42)
      L(x, 790, 1130, 'MINUTES SPENT: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Retraces every step. | *With evidence.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LENS, { K: INK, W: SKYB, B: '#e8f0ff' }, 790 + 40 * Math.sin(t * 2), 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'CASE #4: THE KEYS', pop01(t, P.t0 + 0.7, 0.3, 2.2), '#c97bff', -0.04, 30, CREAM)
      L(x, 790, 1120, 'SUSPECT: THE CAT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Lost the keys. | *Moved to a new city.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SUIT, { K: INK, O: '#ffb34a', Y: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 690, 'NEW KEYS. NEW LIFE.', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 30)
      L(x, 790, 1110, 'NO REGRETS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Has a spare. | And *a spare spare.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, KEY, KEY_C, 790, 680 + i * 75, 13 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: -0.1 + i * 0.05 })
      L(x, 790, 1130, 'SPARES: 7. LOST: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Built a key-finding robot. | *Lost the robot.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const gone = ease.inCubic(prog(lt, 1.0, 1.5))
      drawBits(x, ROBOT, { K: INK, S: '#9aa5c4', R: RED, Y: SKYB }, 790 + gone * 300, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - gone })
      L(x, 790, 690, 'KEYBOT 3000', pop01(t, P.t0 + 0.4, 0.3, 2.2), SKYB, -0.04, 34)
      if (lt > 1.4) L(x, 790, 1100, 'KEYBOT: MISSING', pop01(t, t - lt + 1.4, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cries for an hour. | Keys: *in the fridge.*', mood: 'wide', tears: lt => lt < 1.3 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FRIDGE, { K: INK, W: '#e8f0ff', H: '#9aa5c4' }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, KEY, KEY_C, 790, 860, 10 * pop01(t, P.t0 + 1.2, 0.3, 2.4), { rot: -0.2 })
      L(x, 790, 1130, 'NEXT TO THE CHEESE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0508', key: 'G', accent: ACC, ending: 'group',
  title: 'Zodiacs losing keys | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Keys: lost. | *Dignity: also.*',
    draw(x, t, lt) {
      const d = ease.outBack(clamp(prog(lt, 1.6, 2.2)))
      if (d > 0.01) drawBits(x, KEY, KEY_C, 540, lerp(300, 640, d), 26, { rot: -0.2 + 0.08 * Math.sin(t * 3) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
