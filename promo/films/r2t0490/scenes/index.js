// r2t0490: star_talk, BE LIKE (twelve signs), "Zodiacs when they're introduced | *be like.*" → hook "Getting
// introduced? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · F). Ending: callback (Aries' handshake: the hand
// comes back bandaged).
//   ♈ shook your hand, crushed it · ♉ said hi, found the snacks · ♊ forgot your name mid-sentence · ♋ met you for five
//   seconds, saved your birthday · ♌ brought their own intro music · ♍ corrected the spelling of their own name · ♎ asked
//   your sign, complimented it · ♏ said nothing, read the whole room · ♐ "hi, I just quit my job" · ♑ opened with "so,
//   what do you do?" · ♒ introduced themselves as a fun fact · ♓ a new friend, teared up
//   group "Twelve intros. | Zero names kept."   last "And your hand? | Still recovering."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4', SKIN = '#ffd9a8'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
const HAND = [
  '.SS.SS.SS.',
  '.SS.SS.SS.',
  '.SSSSSSSS.',
  'SSSSSSSSSS',
  'SSSSSSSSS.',
  '.SSSSSSS..',
  '..SSSSS...',
  '..CCCCC...',
]
const HAND_C = { S: SKIN, C: SKYB }
const BAND_HAND = [
  '.WW.WW.WW.',
  '.WW.WW.WW.',
  '.WWWWWWWW.',
  'SSWWWWWWSS',
  'SSWWWWWWS.',
  '.SSSSSSS..',
  '..SSSSS...',
  '..CCCCC...',
]
const BAND_C = { S: SKIN, W: '#ffffff', C: SKYB }
const CHIPS = [
  '.RRRRRR.',
  'RRYYYYRR',
  'RYYRRYYR',
  'RYYYYYYR',
  'RRRRRRRR',
]
const CHIPS_C = { R: RED, Y: GOLD }
const CALENDAR = (x, cx, cy, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -140, 260, 280); x.fillStyle = CREAM; x.fillRect(-122, -132, 244, 264)
  x.fillStyle = RED; x.fillRect(-122, -132, 244, 64)
  x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MARCH', 0, -100)
  x.fillStyle = INK; x.font = `800 96px ${INTER}`; x.fillText('3', 0, 20)
  x.fillStyle = PINK; x.font = `700 24px ${MONO}`; x.fillText('your bday ♡', 0, 100)
  x.restore()
}
const SPEAKER = [
  'KKKKKKK',
  'KSSSSSK',
  'KSKKKSK',
  'KSKSKSK',
  'KSKKKSK',
  'KSSSSSK',
  'KSKKKSK',
  'KSKSKSK',
  'KSKKKSK',
  'KKKKKKK',
]
const SPEAKER_C = { K: INK, S: '#6b62a8' }

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Shook your hand. | *Crushed it. Literally.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sq = lt > 0.7 ? 1 - 0.25 * clamp((lt - 0.7) * 4) : 1
      drawBits(x, HAND, HAND_C, 790 + (lt > 0.7 ? Math.sin(t * 30) * 4 : 0), 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: sq })
      L(x, 790, 650, 'GRIP: TOO STRONG', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, -0.04, 34)
      bubble(x, 790, 1110, 'NICE TO MEET YOU!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Said hi. | Then *found the snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'hi.', pop01(t, P.t0 + 0.2, 0.22, 2.2), { size: 46, tail: 'bl' })
      drawBits(x, CHIPS, CHIPS_C, 800, 900, 24 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1110, 'SNACKS: LOCATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Forgot your name | *mid-sentence.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, lt < 1.1 ? 'so great to meet' : 'so great to meet… | uh… you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      L(x, 790, 1000, 'NAME: GONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 36)
    } },
  { sign: 'cancer', cap: 'Met you for five seconds. | *Saved your birthday.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      CALENDAR(x, 800, 850, pop01(t, P.t0 + 0.3, 0.3, 2))
      hearts(x, t, 380, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Brought their own | *intro music.*', mood: 'sparkle', look: [1, 0], star: { x: -150, y: -10 }, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, SPEAKER, SPEAKER_C, 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 + 0.04 * Math.sin(t * 16) })
      notes(x, t, 820, 760, { n: 4, cell: 9, col: GOLD, alpha: clamp(lt * 2) })
      L(x, 790, 640, 'NOW ENTERING: LEO', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Corrected the spelling | *of their own name.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'HELLO, I’M: VIRGOH', pop01(t, P.t0 + 0.2, 0.3, 2.4), CREAM, -0.04, 32)
      if (lt > 0.9) { x.save(); x.fillStyle = RED; x.fillRect(900, 752, 50 * clamp((lt - 0.9) * 4), 8); x.restore() }
      bubble(x, 790, 980, 'no H. thank you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Asked your sign. | *Complimented it.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 690, 'a Taurus? stunning.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
      L(x, 790, 1110, 'CHARM: MAXED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Read the whole room.*', mood: 'squint', look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 690, '…', pop01(t, P.t0 + 0.3, 0.22, 2.2), { size: 60, tail: 'bl' })
      L(x, 790, 920, 'VIBES: ALL READ', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.04, 34)
      L(x, 790, 1060, 'WORDS SPOKEN: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: '“Hi! I just | *quit my job.*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bubble(x, 770, 690, 'moving to | the coast. you?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      L(x, 790, 1000, 'KNOWN: 30 SECONDS', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ff9a4a', 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Opened with | *“So, what do you do?”*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'and your | five-year plan?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1000, 'NETWORKING: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), SLATE, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Introduced themselves | *with a fun fact.*', mood: 'wink', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'i can talk | to crows. hi.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 790, 1000, 'NAME: LATER', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#6fc3ff', 0.04, 36)
    } },
  { sign: 'pisces', cap: 'A new friend? | Pisces *teared up.*', mood: lt => lt > 0.8 ? 'heart' : 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 690, 'i love you | already', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 1000, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0490', key: 'F', accent: ACC, ending: 'callback',
  title: 'Getting introduced? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve intros. | *Zero names kept.*' },
  last: {
    text: 'And your hand? | *Still recovering.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, BAND_HAND, BAND_C, 540, 1050, 30 * k, { rot: 0.05 * Math.sin(t * 2) })
      label(x, 540, 1330, 'ARIES SAYS SORRY', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 36, bg: RED, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
