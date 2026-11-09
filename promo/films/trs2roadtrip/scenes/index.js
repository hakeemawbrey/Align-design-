// trs2roadtrip: THE SIGNS ON… a road trip. (v2 calm cut, ~64 s vertical, music: lofi · C · −20 LUFS)
// Built on promo/films/signs2kit.js (safe area, 3.8 s per sign, quiet cues). See promo/films/SIGNS2-BUILD.md.
//   0.0–3.6    "The signs on | a *road trip.*"  The twelve line up (Pisces already misty), then dive into the pips.
//   3.6–49.2   the roll call, one stage card per sign:
//              ♈ wants to drive the whole way · ♉ packed no clothes, only snacks · ♊ skips every song after ten seconds
//              · ♋ brought a blanket for everyone · ♌ needs a photo at every stop · ♍ made a laminated itinerary
//              · ♎ can't decide where to eat · ♏ knows a secret shortcut · ♐ already planning the next trip
//              · ♑ checked the tyres, twice · ♒ suggests a random detour · ♓ cried at the sunset
//  49.2       "Everyone *made it* | to the beach."  The twelve fly up into a group photo.
//  52.4       LESSON UNLOCKED: "The best part is | *who's in the car.*"  MEMORIES: SAVED
//  58.3       "*Window seat* energy."  Hearts rise off the photo.
import { prog } from '../../../src/lib.js'
import {
  makeFilm, drawBits, hearts, bubble, label, inSprite, pop01,
  GOLD, BONE, INK, MONO,
} from '../../signs2kit.js'

// ── props (one clear joke per card)
const WHEEL = [
  '...WWWWW...',
  '..WW...WW..',
  '.WW.....WW.',
  'WW.......WW',
  'W...GGG...W',
  'WWWWGRGWWWW',
  'W...GGG...W',
  'W....W....W',
  'WW...W...WW',
  '.WW..W..WW.',
  '..WW.W.WW..',
  '...WWWWW...',
]
const WHEEL_C = { W: '#c9c4d8', G: GOLD, R: '#ff4f6d' }
const BAG = [
  '..Y.OO.RR..',
  '.YYYOORRRP.',
  'BBBBBBBBBBB',
  'BLLLLLLLLLB',
  'BLLLRRRLLLB',
  'BLLRRYRRLLB',
  'BLLLRRRLLLB',
  'BLLLLLLLLLB',
  'BBBBBBBBBBB',
]
const BAG_C = { B: '#a0784a', L: '#d9b98a', R: '#ff4f6d', Y: '#ffe27a', O: '#ffb34a', P: '#ff8fb1' }
const BLANKETS = [
  'PPPPPPPPPP',
  'PWPWPWPWPP',
  'PPPPPPPPPP',
  'BBBBBBBBBB',
  'BYBYBYBYBB',
  'BBBBBBBBBB',
  'GGGGGGGGGG',
  'GWGWGWGWGG',
  'GGGGGGGGGG',
]
const BLANKETS_C = { P: '#ffb3c8', B: '#7fc4ff', G: '#7fd39a', W: '#ffffff', Y: '#ffe27a' }
const CAMERA = ['..KKK...', 'KKKKKKKK', 'KGGKKGGK', 'KGWWWWGK', 'KGWBBWGK', 'KGWWWWGK', 'KKKKKKKK']
const CAMERA_C = { K: '#6b62a8', G: '#c9c4d8', W: '#ffffff', B: '#2a2350' }
const MAP = [
  'TTTTTTTTTTTT',
  'TGGTTTTTTBBT',
  'TGTTDDDTTTBT',
  'TTTDTTTDTTTT',
  'TTDTTTTTDTTT',
  'TDTTTGGTTDTT',
  'TDTTGGGTTRTR',
  'TTDTTTTTTTRT',
  'TTTTTTTTTRTR',
]
const MAP_C = { T: '#f4e8cc', G: '#7fd39a', B: '#7fc4ff', D: '#a0784a', R: '#e23d4e' }
const GLOBE = [
  '...BBBBB...',
  '.BBBGGBBBB.',
  '.BBGGGBBBB.',
  'BBBGGBBBGGB',
  'BBBBGBBGGGB',
  'BBBBBBBGGBB',
  'BGGBBBBBGBB',
  '.BGGBBBBBB.',
  '.BBBBBBBBB.',
  '...BBBBB...',
]
const GLOBE_C = { B: '#5fb6ff', G: '#5fd38a' }
const TYRE = [
  '...KKKKK...',
  '.KKKKKKKKK.',
  '.KKGGGGGKK.',
  'KKGGGWGGGKK',
  'KKGGWWWGGKK',
  'KKGWWWWWGKK',
  'KKGGWWWGGKK',
  'KKGGGWGGGKK',
  '.KKGGGGGKK.',
  '.KKKKKKKKK.',
  '...KKKKK...',
]
const TYRE_C = { K: '#5a5478', G: '#c9c4d8', W: '#ffffff' }
const SUNSET = [
  '....YYYY....',
  '..YYYYYYYY..',
  '.YYYOOOOYYY.',
  'YYOOOOOOOOYY',
  'OOOOOOOOOOOO',
  '............',
  'PPPPPPPPPPPP',
  '............',
  '.PPPPPPPPPP.',
]
const SUNSET_C = { Y: '#ffe27a', O: '#ffb34a', P: '#ff8fb1' }

const CAMEOS = [
  { sign: 'aries', cap: 'Wants to drive | the *whole* way.', mood: 'sparkle', hops: [0.6, 1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, WHEEL, WHEEL_C, F.x, F.cy + 95, 14 * k, { rot: 0.22 * Math.sin(lt * 3.2) })
    } },
  { sign: 'taurus', cap: 'Packed no clothes. | Only *snacks.*', mood: 'heart', look: [1, 0], star: { x: -140 },
    back(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 770, 1030, 18 * pop01(t, P.t0 + 0.25, 0.35, 2))
    } },
  { sign: 'gemini', cap: 'Skips every song | after *ten seconds.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: { x: -120 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.24))
      label(x, 770, 640, `SKIPPED: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: '#ffe27a', rot: 0.06 })
    } },
  { sign: 'cancer', cap: 'Brought a blanket | for *everyone.*', mood: 'heart', star: { x: 120 },
    back(x, t, lt, P) {
      drawBits(x, BLANKETS, BLANKETS_C, 300, 1060, 18 * pop01(t, P.t0 + 0.25, 0.35, 2))
    } },
  { sign: 'leo', cap: 'Needs a photo | at *every* stop.', mood: lt => (Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle'), star: { x: 120 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 300, 720, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 })
      for (const d of [0.7, 1.4, 2.0]) {
        const q = lt - d
        if (q > 0 && q < 0.25) { x.save(); x.globalAlpha = 1 - q / 0.25; x.fillStyle = '#fffbea'; x.beginPath(); x.arc(300, 720, 60 + q * 260, 0, Math.PI * 2); x.fill(); x.restore() }
      }
    } },
  { sign: 'virgo', cap: 'Made a *laminated* | itinerary.', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 890); x.scale(k, k); x.rotate(-0.06)
      x.fillStyle = INK; x.fillRect(-140, -180, 280, 360)
      x.fillStyle = '#f4e8cc'; x.fillRect(-130, -170, 260, 340)
      x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      const rows = ['8:00 GO', '9:15 SNACK', '11:30 VIEW', '1:00 LUNCH', '3:45 BEACH']
      rows.forEach((r, i) => {
        const y = -125 + i * 62
        x.fillStyle = INK; x.fillText(r, -112, y)
        if (lt > 0.5 + i * 0.25) drawBits(x, ['....R', '...R.', 'R.R..', '.R...'], { R: '#e23d4e' }, 98, y, 6, { outline: null })
      })
      // the lamination shine
      x.globalAlpha = 0.35; x.fillStyle = '#ffffff'
      x.beginPath(); x.moveTo(-130, 40); x.lineTo(-40, -170); x.lineTo(0, -170); x.lineTo(-130, 120); x.fill()
      x.restore()
    } },
  { sign: 'libra', cap: 'Can’t decide | *where* to eat.', mood: 'squint', look: [1, -1], star: { x: -120 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'tacos? | noodles? | pancakes?', pop01(t, P.t0 + 0.35, 0.3, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Knows a *secret* | shortcut.', mood: 'neutral', look: [1, 0], star: { x: -130 },
    front(x, t, lt, P, F) {
      inSprite(x, F, () => {
        x.fillStyle = '#100a24'; x.fillRect(9.4, 16.6, 8, 5.4); x.fillRect(18.6, 16.6, 8, 5.4); x.fillRect(17.2, 17.4, 1.6, 1.2)
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(10.4, 17.4, 2, 1); x.fillRect(19.6, 17.4, 2, 1)
      })
      drawBits(x, MAP, MAP_C, 770, 1010, 16 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 })
    } },
  { sign: 'sagittarius', cap: 'Already planning | the *next* trip.', mood: 'sparkle', look: [-1, -1], star: { x: 150 }, hops: [1.2],
    back(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 300, 720, 18 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.15 * Math.sin(lt * 2) })
    } },
  { sign: 'capricorn', cap: 'Checked the *tyres.* | Twice.', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [-1, 1], star: { x: 150 },
    back(x, t, lt, P) {
      drawBits(x, TYRE, TYRE_C, 300, 1070, 15 * pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 300, 880, 'CHECKED x2', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: -0.06 })
    } },
  { sign: 'aquarius', cap: 'Suggests a *random* | detour.', mood: 'wink', star: { x: -140 }, hops: [0.6, 1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(780, 1180); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-16, -440, 32, 440)
      x.fillStyle = '#a0784a'; x.fillRect(-10, -436, 20, 432)
      x.restore()
      label(x, 780, 740, 'GIANT ROCK  >', k, { size: 34, bg: GOLD, rot: -0.08 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the sunset.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, star: { x: -110 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.8)
      drawBits(x, SUNSET, SUNSET_C, 770, 700 + (1 - Math.min(1, prog(lt, 0, 2.4))) * 40, 17 * k)
    } },
]

const F = makeFilm({
  id: 'trs2roadtrip', key: 'C', accent: '#7dffb0',
  title: 'The signs on | a *road trip.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *made it* | to the beach.' },
  lesson: { text: 'The best part is | *who’s in the car.*', chip: 'MEMORIES: SAVED' },
  last: {
    text: '*Window seat* energy.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
