// v3t125: THE SIGNS AS… v3, "Happy zodiacs | be like." (~62 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   every sign in a great mood, pushed to the extreme:
//              ♈ good news, ran laps round the office · ♉ ordered dessert first · ♊ started three new hobbies
//              · ♋ baked for the whole building · ♌ glowing, literally · ♍ let one crumb stay · ♎ redecorated the flat
//              · ♏ smiled once, everyone panicked · ♐ laughed for an hour straight · ♑ allowed a five-minute break
//              · ♒ danced to no music · ♓ so happy they cried
//  49.2        "Pure joy. | *All twelve.*"
//  52.4        LESSON UNLOCKED: "Your joy is yours. | *Let it be loud.*"  MOOD: GOLDEN
//  58.3        "Scorpio is | *still smiling.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e'

const CAKE = [
  '......C...',
  '.....PPP..',
  '...PPWPPP.',
  '.PPPPPPPPP',
  'BBBBBBBBBB',
  'WWWWWWWWWW',
  'BBBBBBBBBB',
]
const CAKE_C = { C: RED, P: PINK, W: BONE, B: '#c98a5a' }
const GUITAR = [
  '......KK',
  '.....KK.',
  '....KK..',
  '.OOOK...',
  'OOOOOO..',
  'OOKOOO..',
  'OOOOOO..',
  '.OOOO...',
]
const BRUSH = [
  '....PP',
  '...PP.',
  '..KK..',
  '.KK...',
  'BB....',
  'B.....',
]
const POT = [
  '..LLL..',
  '.LLLLL.',
  '..LLL..',
  '...L...',
  '.TTTTT.',
  '..TTT..',
]
const TRAY = [
  '.C..C..C..C.',
  'CCC.CCC.CCC.',
  '.C..C..C..C.',
  'SSSSSSSSSSSS',
]
const TRAY_C = { C: '#c98a5a', S: STEEL }
const ROLLER = [
  'PPPPPPPP',
  'PPPPPPPP',
  '......K.',
  '......K.',
  '.....KK.',
  '.....K..',
  '.....K..',
]
const FRAME = [
  'GGGGGG',
  'GSSSSG',
  'GSMMSG',
  'GSSSSG',
  'GGGGGG',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Got good news. | *Ran laps* round the office.', mood: 'sparkle', star: { x: -150 }, hops: [0.2, 0.4, 0.6, 0.8, 1.0],
    back(x, t, lt, P, F) {
      x.fillStyle = 'rgba(255,107,90,0.55)'
      for (let i = 0; i < 3; i++) x.fillRect(F.x - 260 + Math.sin(t * 12 + i) * 10, F.cy - 40 + i * 40, 90, 10)
    },
    front(x, t, lt, P) {
      label(x, 790, 760, `LAP ${Math.min(9, 1 + Math.floor(lt / 0.27))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'WOOO!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'In a great mood. | Ordered *dessert first.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'STARTER: CAKE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'So happy they started | *three new hobbies.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { O: '#ffb34a', K: BROWN }, 680, 760, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BRUSH, { P: PINK, K: STEEL, B: BROWN }, 880, 760, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      drawBits(x, POT, { L: '#5fd068', T: '#e8865a' }, 780, 960, 16 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 790, 1120, 'HOBBIES: 3 (TODAY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Feeling great. | Baked for *every floor.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, TRAY, TRAY_C, 790, 980 - i * 90, 15 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2))
      label(x, 790, 660, 'FLOORS: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Good mood? | *Glowing.* Literally.', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.4, 1.0))
      if (k <= 0) return
      x.save(); x.translate(F.x, F.cy); x.rotate(t * 0.4); x.fillStyle = `rgba(255,214,120,${(0.35 * k).toFixed(3)})`
      for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.fillRect(-14, 140, 28, 160 * k) }
      x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'sunglasses | advised', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 0.8, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'So happy | they *let a crumb stay.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.7))
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(760, 520); x.lineTo(820, 520); x.lineTo(900, 1060); x.lineTo(680, 1060); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(766, 1010, 48, 40); x.fillStyle = '#c98a5a'; x.fillRect(772, 1016, 36, 28)
      label(x, 790, 760, 'ONE CRUMB', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'you can stay.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'In a good mood. | *Redecorated* the flat.', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ROLLER, { P: PINK, K: STEEL }, 860, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 6) * 0.2 })
      for (let i = 0; i < 3; i++) drawBits(x, FRAME, { G: GOLD, S: BONE, M: [MINT, LAV, PINK][i] }, 680 + i * 70, 680 + (i % 2) * 40, 12 * pop01(t, P.t0 + 0.8 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.1 })
      label(x, 760, 1100, 'NEW VIBE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05 })
    } },
  { sign: 'scorpio', cap: 'Smiled once. | *Everyone panicked.*', mood: lt => lt > 0.5 ? 'happy' : 'neutral', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'is that… | a smile?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 940, 'ALERT: SMILE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Heard a joke. | Laughed *for an hour.*', mood: 'happy', star: { x: -160 }, hops: [0.4, 0.7, 1.0, 1.3], squash: lt => 0.06 * Math.sin(lt * 30),
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'HA HA HA | HA HA', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 940, 'MINUTE 59', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Feeling great. | Took *a five-minute break.*', mood: lt => lt > 0.8 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = Math.max(0, 300 - Math.floor(lt * 40))
      label(x, 790, 760, `0${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 56, bg: '#2fc79a', rot: 0, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'don’t get | used to it', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'So happy | they *danced to no music.*', mood: 'sparkle', look: lt => [Math.sin(lt * 6) > 0 ? 1 : -1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5], squash: lt => 0.08 * Math.sin(lt * 12),
    front(x, t, lt, P) {
      label(x, 790, 760, 'MUSIC: NONE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'i hear it.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'So happy | they *cried.* Obviously.', mood: 'heart', tears: 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hearts(x, t, 790, 1000, P.t0 + 0.4, { n: 7, life: 2.0, spread: 220, cell: 8, seed: 5 })
      bubble(x, 790, 720, 'i’m just | SO happy', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t125', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'Happy zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Pure joy. | *All twelve.*', moods: Array(12).fill('sparkle') },
  lesson: { text: 'Your joy is yours. | *Let it be loud.*', chip: 'MOOD: GOLDEN' },
  last: {
    text: 'Scorpio is | *still smiling.*',
    draw(x, t, lt) {
            hearts(x, t, 540, 1250, t - lt + 0.8, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
