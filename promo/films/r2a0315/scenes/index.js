// r2a0315: star_advice, ADVICE ROLLCALL, "How each sign | enjoys alone time." (~63 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific way each can enjoy being alone, each with one light visual gag. Ending: lesson.
//   0.0–3.6    "How each sign | *enjoys alone time.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ a solo project, no one to beat (a birdhouse) · ♉ cook for one, fancy plates anyway · ♊ talk to yourself, great chat
//              · ♋ take yourself on a date, table for one · ♌ be your own biggest fan (a foam finger) · ♍ one sock on the floor, fine
//              · ♎ every choice today, just yours · ♏ journal every last feeling · ♐ teach yourself a weird skill (juggling)
//              · ♑ do nothing on purpose · ♒ phone face down, quiet on · ♓ sad movie night, tissues for one
//  49.2        "Alone? | *Good company.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Alone can feel | like *coming home.*"  STATUS: RECHARGED
//  58.3        "Table for one? | *Best seat.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e', SAGE = '#9ae5c0'

// ── props
const BIRDHOUSE = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '..WWWWWWWW..',
  '..WWWKKWWW..',
  '..WWKKKKWW..',
  '..WWWKKWWW..',
  '..WWWWWWWW..',
  '.....B......',
  '.....B......',
]
const BIRDHOUSE_C = { R: '#ff6b5a', W: '#e8b77e', K: INK, B: WOOD }
const PLATE = [
  '......F......',
  '.....FYF.....',
  '......C......',
  '..WWWWCWWWW..',
  '.WWGGWWWRRWW.',
  'WWWGGWWWRRWWW',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
]
const PLATE_C = { F: '#ffb34a', Y: '#fff1b0', C: PAPER, W: '#e8e2ff', G: '#5fd068', R: RED }
const TABLE = [
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWW',
  '......B......',
  '......B......',
  '.....BBB.....',
]
const TABLE_C = { W: PAPER, B: WOOD }
const ROSE = ['.RR.', 'RRRR', '.RR.', '..G.', '.GG.', '..G.']
const ROSE_C = { R: '#ff4f86', G: '#5fd068' }
const FINGER = [
  '....YY....',
  '....YY....',
  '....YY....',
  '..YYYYYY..',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '...YYYY...',
  '...BBBB...',
  '...BBBB...',
]
const FINGER_C = { Y: '#ffb34a', B: WOOD }
const SOCK = [
  '..PPPP',
  '..WWWW',
  '..PPPP',
  '..WWWW',
  '.PPPPP',
  'PPPPPP',
  'PPPPP.',
]
const SOCK_C = { P: PINK, W: '#fff' }
const DIARY = [
  'KKKKKKKKKKKK',
  'KRRRRRRRRRRK',
  'KRRRRRRRRRWK',
  'KRRRGGGGRRWK',
  'KRRRGGGGRRWK',
  'KRRRRRRRRRWK',
  'KRRRRRRRRRWK',
  'KRRRRRRRRRWK',
  'KKKKKKKKKKKK',
]
const DIARY_C = { K: INK, R: '#c97bff', W: PAPER, G: GOLD }
const PHONE = [
  'GGGGGGGGGGGGGG',
  'GWWGGGGGGGGGGG',
  'GWWGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
]
const PHONE_C = { G: '#b7a6ff', W: '#2a2350' }
const TISSUE = [
  '....WW.W....',
  '...WWWWW....',
  'BBBBBBBBBBBB',
  'BLLBBBBBBLLB',
  'BBBBBBBBBBBB',
  'BBLLBBBBLLBB',
  'BBBBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, L: '#cfefff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Start a solo project. | *No one to beat.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, BIRDHOUSE, BIRDHOUSE_C, 790, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'BUILT: 1 BIRDHOUSE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'RIVALS: 0. BLISS.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Cook for one. | *Use the fancy plates.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'GUESTS: JUST ME', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 930, P.t0 + 1.3, 6, 160, 0.3)
    } },
  { sign: 'gemini', cap: 'Talk to yourself. | *Great conversation.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'you’re so right', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: '#ffd23a', tail: 'bl' })
      bubble(x, 820, 830, 'i KNOW, right?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      label(x, 790, 1030, 'BEST CHAT ALL WEEK', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Take yourself | *on a date.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TABLE, TABLE_C, 790, 1020, 20 * k)
      drawBits(x, ROSE, ROSE_C, 790, 940, 14 * k)
      label(x, 790, 720, 'TABLE FOR 1', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1150, 'great company', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Be your own | *biggest fan.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, FINGER, FINGER_C, F.x + 170, F.cy - 30, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 * Math.sin(t * 5) })
      label(x, 820, 950, 'ME!', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 44, bg: RED, color: '#fff4e2', rot: 0.08 })
      label(x, 790, 1120, 'FAN CLUB: 1 (LOUD)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Let the house | *be a little messy.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      label(x, 790, 720, 'MESS LEVEL:', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 830, 'ONE SOCK', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04 })
      if (lt > 1.4) bubble(x, 790, 950, 'it’s fine!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Every choice today? | *Just yours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 720, 'MOVIE: MINE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'SNACK: MINE', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'BLANKET: MINE', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1070, 'VOTES NEEDED: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Journal it out. | *Every last feeling.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 13)
      label(x, 790, 700, `PAGES TODAY: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'LIGHTER NOW', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Teach yourself | *a weird skill.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const COLS = ['#ff6b5a', '#ffd23a', SKYB]
      for (let i = 0; i < 3; i++) {
        const a = t * 4 + i * 2.1
        x.save(); x.globalAlpha = k; x.fillStyle = INK; x.beginPath(); x.arc(790 + Math.cos(a) * 110, 860 - Math.abs(Math.sin(a)) * 170, 38, 0, Math.PI * 2); x.fill()
        x.fillStyle = COLS[i]; x.beginPath(); x.arc(790 + Math.cos(a) * 110, 860 - Math.abs(Math.sin(a)) * 170, 32, 0, Math.PI * 2); x.fill(); x.restore()
      }
      label(x, 790, 1000, 'JUGGLING: DAY 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'DROPPED: SOME', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Do nothing. | *On purpose.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 296, 296)
        x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = PAPER; x.fillRect(-144, -144, 288, 288)
        x.fillStyle = '#2fc79a'; x.fillRect(-144, -144, 288, 56)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -116)
        x.fillStyle = '#d9cfbd'; for (let i = 0; i < 4; i++) x.fillRect(-120, -60 + i * 50, 240, 6)
        x.restore()
      }
      label(x, 790, 900, 'PLANS: NONE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'SCHEDULED, OF COURSE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Phone face down. | *Enjoy the quiet.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'QUIET: ON', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 840, 'BRAIN: HUMMING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Sad movie night. | *Tissues for one.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(0, Math.floor((lt - 0.5) / 0.15))
      label(x, 790, 720, `TISSUES: ${Math.min(n, 12)}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'BEST NIGHT EVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0315', key: 'G', accent: SAGE, ending: 'lesson',
  title: 'How each sign | *enjoys alone time.*',
  cameos: CAMEOS,
  group: { cap: 'Alone? | *Good company.*' },
  lesson: { text: 'Alone can feel | like *coming home.*', chip: 'STATUS: RECHARGED' },
  last: { text: 'Table for one? | *Best seat.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
