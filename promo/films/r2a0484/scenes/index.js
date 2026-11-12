// r2a0484: star_advice, ADVICE ROLLCALL, "What each sign | is outgrowing." (~62 s vertical, signs3kit social cut,
// music: lofi · E). One warm, specific line per sign with a light visual gag. Ending: lesson.
//   0.0–3.6    "What each sign | *is outgrowing.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one thing per sign (3.8 s each):
//              ♈ rushing everything (a snail sets the pace) · ♉ the old pot (the plant needs a bigger one)
//              · ♊ explaining yourself to everyone · ♋ saying sorry for feelings · ♌ needing applause to feel
//              enough · ♍ fixing what isn't broken · ♎ yes just to keep the peace · ♏ testing people who stayed
//              · ♐ running from hard talks · ♑ earning your rest · ♒ hiding the soft side · ♓ crying alone
//  49.2        "Outgrown. | *In the best way.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "You don’t lose yourself. | You *make room.*"  GROWTH: UNLOCKED
//  58.3        "Taurus finally got | *the bigger pot.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#7dffb0'

const SNAIL = [
  '.K...K......',
  '..K.K.......',
  '..GGG..SSS..',
  '..GWG.SSsSS.',
  '..GGGSSsSsSS',
  '..GGGSSsssSS',
  'GGGGGGGGGGGG',
]
const SNAIL_C = { K: INK, G: '#9ae58a', W: PAPER, S: '#e8a24a', s: '#a8714a' }
const POT = [
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.OOOOOOOO.',
  '..OOOOOO..',
  '..OOOOOO..',
]
const POT_C = { O: '#d8754a' }
const BIGPOT = [
  'OOOOOOOOOOOOOO',
  '.OOOOOOOOOOOO.',
  '.OOOOOOOOOOOO.',
  '..OOOOOOOOOO..',
  '..OOOOOOOOOO..',
  '...OOOOOOOO...',
]
const LEAF = ['..GG', '.GGG', 'GGG.', 'GG..']
const MUG = [
  'WWWWWWW..',
  'WPPPPPW..',
  'WPPPPPWWW',
  'WPPPPPW.W',
  'WPPPPPWWW',
  'WWWWWWW..',
]
const MUG_C = { W: PAPER, P: PINK }
const WRENCH = ['.GG.GG', '.GGGGG', '..GGG.', '..GG..', '.GG...', 'GG....']
const KEY = ['.YYY......', 'Y...Y.....', 'Y...YYYYYY', 'Y...Y..Y.Y', '.YYY......']
const SHOE = ['....RRR.', '...RRRRR', 'RRRRRRRR', 'WWWWWWWW']
const BED = [
  'B.........B',
  'BWWWPPPPPPB',
  'BWWWPPPPPPB',
  'BBBBBBBBBBB',
  'B.........B',
]
const BED_C = { B: '#8a4a2e', W: PAPER, P: LAV }
const SEAT = ['RRRR', 'RRRR', 'R..R']
const BOX = ['..WWW...', '.WWWWW..', 'BBBBBBBB', 'BBBHBBBB', 'BBBBBBBB', 'BBBBBBBB']

// a phone with an incoming call card
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 + (lt > 0.4 && lt < 1.0 ? 0.04 * Math.sin(lt * 60) : 0)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = '#140c30'; x.fillRect(-98, -146, 196, 292)
  x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BEST FRIEND', 0, -90)
  x.fillStyle = '#2fc79a'; x.beginPath(); x.arc(0, 40, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('call', 0, 42)
  x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Rushing everything. | *The view’s better slow.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', star: L, hops: [0.4],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(730, 820, prog(lt, 0.3, 2.4)), 1050, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'PACE: GENTLE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'oh, flowers!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'The old comfort zone. | *You need a bigger pot.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: L, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = ease.outCubic(prog(lt, 0.4, 1.4))
      drawBits(x, POT, POT_C, 790, 1080, 16 * k)
      x.fillStyle = '#5fd068'; x.fillRect(782, 1040 - 250 * g, 16, 250 * g)
      for (let i = 0; i < 4; i++) if (g > i * 0.22) drawBits(x, LEAF, { G: '#5fd068' }, 790 + (i % 2 ? 40 : -40), 1000 - i * 60, 10 * k, { sx: i % 2 ? 1 : -1 })
      label(x, 790, 700, 'POT: TOO SMALL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Explaining yourself | *to everyone.*', mood: lt => lt > 1.5 ? 'happy' : 'wink', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'so basically, | what i meant—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1000, 'YOU WERE CLEAR.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'THE FIRST TIME.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Sorry for feeling things? | *Never needed.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOX, { W: '#ffffff', B: '#8fb0ff', H: PINK }, 790, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(0, 3 - Math.floor(Math.max(0, lt - 0.6) / 0.3))
      label(x, 790, 760, `SORRYS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, 'FEELINGS: WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Needing applause. | *You shine either way.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: L, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SEAT, { R: '#c84a5a' }, 700 + (i % 3) * 90, 1000 + Math.floor(i / 3) * 70, 12 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2))
      label(x, 790, 760, 'AUDIENCE: 0', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 870, 'STILL GLOWING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.4, 7, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Fixing what | *isn’t broken.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, WRENCH, { G: '#9aa5c4' }, 700 + 20 * Math.sin(lt * 5), 860, 16 * pop01(t, P.t0 + 0.5, 0.3, 2) * (1 - prog(lt, 1.3, 1.6)), { rot: 0.3 })
      label(x, 790, 1150, 'IT WAS ALREADY FINE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Yes to keep the peace? | *Try “no.”*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'actually… | no, thanks.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1020, 'PEACE: STILL HERE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 6, 180, 0.3)
    } },
  { sign: 'scorpio', cap: 'Testing people | *who already stayed.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, KEY, { Y: GOLD }, 790, 940, 18 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.1 })
      label(x, 790, 760, 'TEST #31: CANCELLED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'MATCH: STAYED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Running from hard talks. | *Stay. It’s okay.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', star: R, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      const stop = ease.outCubic(prog(lt, 0.2, 1.0))
      drawBits(x, SHOE, { R: '#ff9a4a', W: PAPER }, lerp(160, 310, stop), 1080, 20 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bubble(x, 320, 760, 'okay. let’s | talk.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 320, 950, 'LEFT THE ROOM: NO', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Earning your rest. | *It’s free.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 320, 1000, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 320, 760, 'REST: NO RECEIPT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1150, 'PRICE: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Hiding the soft side. | *We see it.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: lt => lt > 1.2 ? [0, 0] : [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i’m not | emotional.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      label(x, 790, 1040, 'SOFT: CONFIRMED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 400, 820, P.t0 + 1.1, { n: 6, life: 1.6, spread: 200, cell: 8, seed: 8 })
    } },
  { sign: 'pisces', cap: 'Crying alone. | *Call a friend.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt < 1.4 ? 3 : 2, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 930, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 700, 'on my way!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0484', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign | *is outgrowing.*',
  cameos: CAMEOS,
  group: { cap: 'Outgrown. | *In the best way.*' },
  lesson: { text: 'You don’t lose yourself. | You *make room.*', chip: 'GROWTH: UNLOCKED' },
  last: { text: 'Taurus finally got | *the bigger pot.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
