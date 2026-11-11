// v3t006: THE SIGNS AS… v3, "Zodiacs in love | be like." (~63 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Zodiacs in love | *be like.*"
//   3.6–49.2   one in-love moment per sign (3.8 s each), each pushed to the extreme:
//              ♈ defended your honour from a goose · ♉ gave you the last bite · ♊ texts you from the same couch
//              · ♋ week one? match-iversary · ♌ commissioned a statue of you two · ♍ packs your lunch, with a vitamin
//              · ♎ picking a couple name took a month · ♏ let you see their phone · ♐ moved in together, in a van
//              · ♑ booked every date night till next year · ♒ says "I love you" in binary · ♓ you said good night, Pisces wept
//  49.2        "Hopeless | *romantics.*"
//  52.4        LESSON UNLOCKED: "Love out loud. | *Love kindly.*"  STATUS: SMITTEN
//  58.3        "Gemini replied. | *In binary.*" (lesson ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const GOOSE = [
  '..WWW.....',
  '.WKWWO....',
  '..WWWOO...',
  '...WW.....',
  '...WW.....',
  '..WWWWWWW.',
  '.WWWWWWWWW',
  'WWWWWWWWW.',
  '.WWWWWWW..',
  '...O..O...',
]
const GOOSE_C = { W: '#f4f4f8', K: INK, O: ORANGE }
const FORK = [
  '.CCC.',
  'CCCCC',
  '.CCC.',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
]
const FORK_C = { C: '#d8a0c0', S: '#d8dbe8' }
const COUCH = [
  'PP..........PP',
  'PPPPPPPPPPPPPP',
  'PPppppppppppPP',
  'PPppppppppppPP',
  'PPPPPPPPPPPPPP',
  '.K..........K.',
]
const COUCH_C = { P: '#6b62a8', p: '#8a80c8', K: '#2a2350' }
const STATUE = [
  '.......GGG......GGG.......',
  '......GGGGG....GGGGG......',
  '.......GGG......GGG.......',
  '......GGGGG....GGGGG......',
  '.....GGGGGGGGGGGGGGGG.....',
  '......GGGGG....GGGGG......',
  '......GG.GG....GG.GG......',
  '..SSSSSSSSSSSSSSSSSSSSSS..',
  '..SSSSSSSSSSSSSSSSSSSSSS..',
  '..SSSSSSSSSSSSSSSSSSSSSS..',
]
const STATUE_C = { G: '#c9c9d8', S: '#9a97b8' }
const LUNCH = [
  '....KK....',
  '...K..K...',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRWWWWWWRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
]
const LUNCH_C = { K: '#6b62a8', R: '#2fc79a', W: '#fff4e2' }
const PILL = ['.YYPP.', 'YYYPPP', '.YYPP.']
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: SKYB, W: '#fff4e2', G: '#6b62a8' }
const VAN = [
  '..WWWWWWWWWWWW....',
  '.WWSSWWSSWWSSWWW..',
  '.WWSSWWSSWWSSWWWW.',
  'PPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPP',
  'WWWWWWWWWWWWWWWWWW',
  '..KK........KK....',
]
const VAN_C = { W: '#fff4e2', S: SKYB, P: '#ff8fb1', K: INK }

// a wall calendar with every week circled
function calendarYear(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -160, 336, 336)
  x.fillStyle = INK; x.fillRect(-172, -172, 344, 344)
  x.fillStyle = BONE; x.fillRect(-164, -164, 328, 328)
  x.fillStyle = '#2fc79a'; x.fillRect(-164, -164, 328, 60)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DATE NIGHTS', 0, -134)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 30)
  for (let d = 0; d < 30; d++) {
    const c = d % 6, r = Math.floor(d / 6), px = -130 + c * 52, py = -70 + r * 50
    x.fillStyle = '#b9b0a0'; x.fillRect(px - 4, py - 4, 8, 8)
    if (d < n) drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, px, py, 6, { outline: null })
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Defended your honour. | From *a goose.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const run = ease.inCubic(prog(lt, 1.3, 1.8))
      drawBits(x, GOOSE, GOOSE_C, 800 + run * 260, 920 - run * 40, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1, alpha: 1 - run })
      bubble(x, 800, 650, 'HONK', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: BONE, tail: 'bc' })
      label(x, 760, 1100, 'GOOSE: DEFEATED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Gave you | *the last bite.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FORK, FORK_C, lerp(560, 780, ease.inOutCubic(prog(lt, 0.6, 1.2))), 850, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      label(x, 800, 660, 'THE LAST BITE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: 0.05 })
      label(x, 800, 1060, 'IT’S SERIOUS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.05 })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Texts you. | From *the same couch.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: -110, y: -30, s: 240 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 560, 1000, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 720, 850, 220 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      const msgs = ['hi', 'hiii', 'look up :)']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.45) + 1)
      for (let i = 0; i < n; i++) label(x, 790, 580 + i * 72, `✉ ${msgs[i]}`, 1, { size: 32, bg: MINT, rot: 0.03 * (i % 2 ? 1 : -1), font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Week one? | *Match-iversary.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 800, 660, '✦ MATCHED: 7 DAYS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -40, 260, 150); x.fillStyle = PINK; x.fillRect(-122, -32, 244, 134)
        x.fillStyle = BONE; x.fillRect(-122, -32, 244, 30); x.fillStyle = '#ff4f86'; for (let i = 0; i < 6; i++) x.fillRect(-110 + i * 40, 40, 20, 20)
        x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-60 + i * 60 - 4, -88, 8, 50)
        x.fillStyle = GOLD; for (let i = 0; i < 3; i++) x.fillRect(-60 + i * 60 - 6, -108, 12, 18)
        x.restore()
      }
      sparkles(x, t, 800, 820, P.t0 + 1.2, 6, 150, 0.3)
    } },
  { sign: 'leo', cap: 'Commissioned a statue. | Of *you two.*', mood: 'sparkle', star: { x: -190, s: 260 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.fillStyle = INK; x.fillRect(760 - 170 * k, 1000, 340 * k, 70 * k); x.fillStyle = '#9a97b8'; x.fillRect(760 - 162 * k, 1006, 324 * k, 58 * k)
        x.filter = 'grayscale(1) brightness(1.25)'
        signChar(x, t, 'leo', 690, 900, 170 * k, { mood: 'happy', seed: 61, glyph: false, glow: 0, bob: 0 })
        signChar(x, t, 'libra', 830, 900, 170 * k, { mood: 'heart', seed: 62, glyph: false, glow: 0, bob: 0 })
        x.restore()
      }
      label(x, 760, 1130, 'US. IN MARBLE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 760, 860, P.t0 + 0.9, 7, 210, 0.4)
    } },
  { sign: 'virgo', cap: 'Packs your lunch. | With *a vitamin.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LUNCH, LUNCH_C, 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PILL, { Y: GOLD, P: PINK }, 800, 770, 16 * pop01(t, P.t0 + 0.9, 0.3, 2.4), { rot: 0.4 })
      bubble(x, 800, 620, 'take it ♡', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Picking a couple name. | *Week four.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const N = ['LIBRYOU?', 'YOUBRA?', 'LIB+U?', 'LUBRA?']
      bubble(x, 800, 720, N[Math.min(3, Math.floor(lt / 0.55))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 960, 'WEEK 4', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Let you see | *their phone.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 800, 640, 'TRUST: UNLOCKED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 180, 0.5)
      label(x, 800, 1110, '(FOR 3 SECONDS)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Moved in together. | Into *a van.*', mood: 'sparkle', star: { x: 170, y: -60 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      drawBits(x, VAN, VAN_C, lerp(-60, 370, ease.outCubic(prog(lt, 0.1, 0.7))), 1030, 22)
    },
    front(x, t, lt, P) {
      label(x, 340, 700, 'HOME: EVERYWHERE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Booked every date night. | Until *next year.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      calendarYear(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'ROMANCE: SCHEDULED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Says “I love you” | *in binary.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const B = ['01001001', '01001100', '01011001']
      B.forEach((b, i) => label(x, 800, 700 + i * 110, b, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { size: 36, bg: [SKYB, MINT, LAV][i], rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
      bubble(x, 800, 1080, '(= I LOVE YOU)', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You said “good night.” | Pisces *wept with joy.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'good night ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 800, 920, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05 })
      hearts(x, t, 560, 900, P.t0 + 1.0, { n: 6, life: 1.8, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t006', key: 'C', accent: PINK,
  title: 'Zodiacs in love | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Hopeless | *romantics.*' },
  lesson: { text: 'Love out loud. | *Love kindly.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Gemini replied. | *In binary.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
