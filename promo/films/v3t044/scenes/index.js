// v3t044: THE SIGNS AS… v3, "Zodiacs, seat taken | be like." (~63 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Zodiacs, seat taken | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   what each sign does when someone takes their seat (3.8 s each), pushed to the extreme:
//              ♈ challenged them to a race for it · ♉ stood there until sunset · ♊ now best friends with the thief
//              · ♋ said nothing, told their diary · ♌ no seat? brought a throne · ♍ showed them the seating chart
//              · ♎ apologised to them · ♏ will remember it for ten years · ♐ sat on the floor, loved it
//              · ♑ booked that seat through 2030 · ♒ seats are a construct, hovered · ♓ said "it's fine", sobbed
//  49.2        "Musical chairs | got *serious.*"
//  52.4        LESSON UNLOCKED: "It's just a chair. | *Share the view.*"  SEAT: SHARED
//  58.3        "Except Leo's. | That's *a throne.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'

const CHAIR = [
  'BBBBBBB..',
  'BWWWWWB..',
  'BWWWWWB..',
  'BWWWWWB..',
  'BBBBBBBBB',
  'BBBBBBBBB',
  'B.......B',
  'B.......B',
  'B.......B',
]
const CHAIR_C = { B: BROWN, W: '#e8a24a' }
const THRONE = [
  'Y...YYY...Y',
  'YY.YYYYY.YY',
  'YYYYRRRYYYY',
  'YYYRRRRRYYY',
  'YYYRRRRRYYY',
  'YYYRRRRRYYY',
  'YYYYYYYYYYY',
  'YYYYYYYYYYY',
  'YRRRRRRRRRY',
  'YYYYYYYYYYY',
  'YY.......YY',
  'YY.......YY',
]
const THRONE_C = { Y: GOLD, R: RED }
const SUN = [
  '...OOO...',
  '.OOOOOOO.',
  'OOOOOOOOO',
  'RRRRRRRRR',
  '.RRRRRRR.',
]
const SUN_C = { O: ORANGE, R: '#ff6b5a' }
const DIARY = [
  'PPPPPPPPPP',
  'PWWWWWWWWP',
  'PWPPPPPPWP',
  'PWWWWWWWWP',
  'PWPPPPWWWP',
  'PWWWWWWWWP',
  'PWPPPPPWWP',
  'PPPPPPPPPP',
]
const DIARY_C = { P: PINK, W: '#fff4e2' }

const THIEF = (x, t, cx, cy, s, k, mood = 'happy', seed = 11) => {
  if (k <= 0.01) return
  drawBits(x, CHAIR, CHAIR_C, cx, cy + s * 0.25, s / 13 * k)
  signChar(x, t, 'libra', cx, cy - s * 0.1, s * 0.8 * k, { mood, look: [-1, 0], seed, glyph: false, glow: 0.6 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Seat taken? | *Race for it.*', mood: 'squint', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 680, 'ON YOUR MARKS', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: RED, color: '#fff4e2', rot: -0.05 })
      label(x, 800, 1110, 'BEST OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t move. | Stood there *till sunset.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) { drawBits(x, SUN, SUN_C, 800, lerp(620, 760, clamp(lt / 2.2)), 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      const h = Math.floor(lerp(9, 19, clamp(lt / 2.0)))
      label(x, 800, 1080, `${h}:00`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'i’ll wait.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Took their seat? | Now *best friends.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      THIEF(x, t, 820, 880, 220, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 'heart' : 'happy')
      bubble(x, 560, 620, 'omg, same!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 820, 1140, 'BFF SINCE 3:02', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Said nothing. | *Told their diary.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 800, 820, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      label(x, 800, 1060, 'dear diary: the AUDACITY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'No seat? | Brought *a throne.*', mood: 'sparkle', star: { x: -180, y: -20 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { drawBits(x, THRONE, THRONE_C, F.x, F.cy + 40, 30 * pop01(t, P.t0 + 0.4, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 760, 'VIP SEATING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 360, 860, P.t0 + 1.2, 8, 200, 0.2)
      bubble(x, 800, 980, 'you can stand.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Showed them | *the seating chart.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATS', 0, -126)
        for (let i = 0; i < 9; i++) { const c = i % 3, r = Math.floor(i / 3); x.fillStyle = i === 4 ? RED : '#b9b0a0'; x.fillRect(-100 + c * 70, -76 + r * 76, 56, 56) }
        x.fillStyle = '#fff4e2'; x.font = `800 24px ${INTER}`; x.fillText('ME', -2, 2)
        x.restore()
      }
      label(x, 800, 1100, 'ROW B, SEAT 5', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Seat stolen. | *Libra apologised.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      THIEF(x, t, 820, 900, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 'neutral', 15)
      bubble(x, 560, 620, 'so sorry!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 820, 1140, 'SORRY ×6', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Not a word. | Remembers *in 2036.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'NOTED.', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 52, bg: BONE, rot: -0.05 })
      label(x, 800, 900, 'FILE: SEAT, 2026', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, 'KEPT: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sat on the floor. | *Loved it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -160, y: 90, s: 280 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      label(x, 800, 720, 'FLOOR SEATS', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 42, bg: GOLD, rot: 0.05 })
      bubble(x, 800, 940, 'best view here', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Booked that seat | *through 2030.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const y = Math.floor(lerp(2026, 2030, clamp((lt - 0.6) / 1.2)))
      label(x, 800, 680, `RESERVED: ${y}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Seats? | *A social construct.*', mood: 'sparkle', look: [0, -1], star: { x: -180, y: -100 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 360, 1100, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { alpha: 0.7 })
      label(x, 800, 820, 'HOVERING', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 360, 760, P.t0 + 1.0, 7, 160, 0.5)
    } },
  { sign: 'pisces', cap: 'Said “it’s fine.” | *Sobbed in the hallway.*', mood: 'happy', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'it’s fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 960, 'NOT FINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: LAV, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t044', key: 'F', accent: GOLD, ending: 'lesson',
  title: 'Zodiacs, seat taken | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Musical chairs | got *serious.*' },
  lesson: { text: 'It’s just a chair. | *Share the view.*', chip: 'SEAT: SHARED' },
  last: {
    text: 'Except Leo’s. | That’s *a throne.*',
    draw(x, t, lt) { drawBits(x, THRONE, THRONE_C, 540, 760, 18 * pop01(t, t - lt + 0.6, 0.35, 2)); sparkles(x, t, 540, 760, t - lt + 0.9, 9, 220, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
