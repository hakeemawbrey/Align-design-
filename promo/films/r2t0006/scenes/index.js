// r2t0006: star_talk SOLO, "Scorpio red flags | we love." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Scorpio red flags | *we love.*"  One big Scorpio pops in, then dives away.
//   3.6–37.8   nine "red flags" that are secretly the best thing about them:
//              remembers your coffee order from 2019 · jealous of your houseplant · banned small talk, asked about your soul
//              · holds a grudge since third grade · vanished for a week, came back with a gift · "it's fine" (it's not)
//              · day two, introduced you as "my person" · matched with you, unmatched everyone else
//              · would fight a pigeon for your honour
//  37.8        "Red flags? | *Red roses.*"  The big Scorpio comes back.
//  41.0        LESSON UNLOCKED: "Deep feelings are | *loyal* feelings."  FLAGS: GREEN
//  46.9        "Match count: | *one. Forever.*" over the match card: Scorpio + Pisces (the unmatch-everyone card, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', PURPLE = '#c97bff'

const CUP = [
  '.WWWWWWWW.',
  'BBBBBBBBBB',
  '.CCCCCCCCHH',
  '.CCCCCCCC.H',
  '.CCKKKKCC.H',
  '.CCCCCCCCHH',
  '..CCCCCC..',
  '...CCCC...',
]
const CUP_C = { W: '#fff4e2', B: '#8a4a2e', C: '#e8dcc6', K: '#8a4a2e', H: '#e8dcc6' }
const PLANT = [
  '..L...L..L..',
  '.LLL.LLL.LL.',
  'LLLLLLLLLLL.',
  '.LLLLLLLLLL.',
  '..LLLLLLLL..',
  '....LLLL....',
  '.....SS.....',
  '..PPPPPPPP..',
  '..PPPPPPPP..',
  '...PPPPPP...',
  '...PPPPPP...',
]
const PLANT_C = { L: '#5fd068', S: '#3f9e4a', P: '#c96a3a' }
const GIFT = [
  '...RR.RR...',
  '....RRR....',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
  'RRRRRRRRRRR',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
]
const GIFT_C = { R: RED, G: PURPLE }
const PIGEON = [
  '....GGG.......',
  '...GGKGO......',
  '...GGGGOO.....',
  '....GPG.......',
  '...GGPGGGG....',
  '..GGGGGGGGGG..',
  '.GGGGGWWGGGGGG',
  '..GGGGGGGGGG..',
  '....GGGGG.....',
  '.....O..O.....',
  '....OO.OO.....',
]
const PIGEON_C = { G: '#9aa5c4', K: INK, O: '#ffb34a', P: '#7dffb0', W: '#e8eef8' }

/** a phone showing a list of matches, all of them but one getting unmatched */
function matchList(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -212, 260, 430)
  x.fillStyle = INK; x.fillRect(-130, -220, 260, 430)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -210, 240, 410)
  x.fillStyle = '#140c30'; x.fillRect(-108, -182, 216, 350)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('MATCHES', 0, -156)
  const COLS = ['#ff6b5a', '#5fd068', '#ffd23a', '#ff8fb1', '#6fc3ff']
  for (let i = 0; i < 5; i++) {
    const y = -110 + i * 58
    const gone = i > 0 ? ease.inCubic(prog(lt, 0.6 + i * 0.22, 0.8 + i * 0.22)) : 0
    x.save(); x.globalAlpha = 1 - gone; x.translate(gone * 220, 0)
    x.fillStyle = COLS[i]; x.fillRect(-90, y - 18, 36, 36)
    x.fillStyle = i === 0 ? MINT : '#9aa5c4'; x.fillRect(-42, y - 6, i === 0 ? 120 : 100, 12)
    x.restore()
  }
  if (lt > 1.6) { x.fillStyle = MINT; x.font = `800 30px ${INTER}`; x.fillText('just you.', 0, 120) }
  x.restore()
}
/** a long unrolling scroll of grudges */
function grudges(x, cx, top, k, lt) {
  if (k <= 0.01) return
  const roll = ease.outCubic(prog(lt, 0.3, 1.4))
  const H = 80 + 380 * roll, W = 300
  x.save(); x.translate(cx, top); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -5, W + 10, H + 10)
  x.fillStyle = '#f3e2b8'; x.fillRect(-W / 2, 0, W, H)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGES', 0, 42)
  const ROWS = ['took my crayon', 'said hi. weird.', 'sat in my seat', 'spoiled a show', 'laughed (why?)']
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  ROWS.forEach((r, i) => { const y = 100 + i * 64; if (y + 20 < H) { x.fillStyle = RED; x.fillText('✗', -W / 2 + 20, y); x.fillStyle = INK; x.fillText(r, -W / 2 + 52, y) } })
  x.fillStyle = '#d9c28e'; x.fillRect(-W / 2 - 14, H - 12, W + 28, 26)
  x.restore()
}
/** a thermometer of "fine": the needle drops while Scorpio insists */
function fineMeter(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-46, -200, 92, 330); x.beginPath(); x.arc(0, 150, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.fillRect(-34, -188, 68, 320); x.beginPath(); x.arc(0, 150, 58, 0, Math.PI * 2); x.fill()
  const lvl = lerp(1, 0.08, ease.inOutCubic(prog(lt, 0.6, 1.8)))
  x.fillStyle = RED; x.fillRect(-22, 120 - 300 * lvl, 44, 300 * lvl + 30); x.beginPath(); x.arc(0, 150, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(16, -170 + i * 52, 18, 5)
  x.restore()
}

const S = 'scorpio'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Remembers your coffee order. | *From 2019.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 660, 'OAT. NO FOAM. 2019.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: PURPLE, color: '#fff4e2', rot: -0.05 })
      label(x, 790, 1120, 'STILL CORRECT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Jealous of | your *houseplant.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 990, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 760, 650, 'who is | THIS?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 54, col: LAV, tail: 'bl' })
      label(x, 800, 1180, 'IT’S A FERN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Banned small talk. | Asked about *your soul.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.25, 0.25, 2.2)
      bubble(x, 760, 650, 'nice weather, huh', a, { size: 36, col: BONE, tail: 'br' })
      if (lt > 0.7 && a > 0.9) { x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(600, 650); x.lineTo(920, 650); x.stroke(); x.restore() }
      bubble(x, 780, 900, 'what’s your | deepest dream?', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 50, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Holding a grudge | since *third grade.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { grudges(x, 790, 560, pop01(t, P.t0 + 0.15, 0.3, 2), lt) } },
  { sign: S, cap: 'Vanished for a week. | Came back *with a gift.*', mood: lt => lt < 0.8 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 780, 640, 'WHERE WERE YOU?', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04 })
      drawBits(x, GIFT, GIFT_C, 790, 900, 24 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      bubble(x, 790, 1120, 'it’s for you.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 0.9, 6, 160, 0.3)
    } },
  { sign: S, cap: '“It’s fine.” | It is *not fine.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 600, 620, 'it’s fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      fineMeter(x, 830, 860, pop01(t, P.t0 + 0.4, 0.3, 2), lt)
      label(x, 760, 1170, 'FINE-O-METER', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Day two. | Called you *“my person.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, 'DAY 2', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.4)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -90, 340, 180); x.fillStyle = RED; x.fillRect(-162, -82, 324, 164)
        x.fillStyle = '#fff4e2'; x.fillRect(-150, -24, 300, 94)
        x.fillStyle = '#fff4e2'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO, THIS IS', 0, -52)
        x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.fillText('MY PERSON', 0, 24)
        x.restore()
      }
      hearts(x, t, 790, 790, P.t0 + 1.3, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Matched with you. | Unmatched *everyone else.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { matchList(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), lt) } },
  { sign: S, cap: 'Would fight a pigeon | for *your honour.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), fly = ease.inCubic(prog(lt, 1.7, 2.3))
      drawBits(x, PIGEON, PIGEON_C, 800 + 260 * fly, 1010 - 380 * fly, 18 * k, { rot: -0.4 * fly })
      bubble(x, 760, 660, 'apologise | to them.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 1160, 'PIGEON: SORRY', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0006', key: 'C', accent: RED, solo: 'scorpio', ending: 'card',
  title: 'Scorpio red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'pisces', chip: "IT'S A MATCH" },
  group: { cap: 'Red flags? | *Red roses.*', mood: 'heart' },
  lesson: { text: 'Deep feelings are | *loyal* feelings.', chip: 'FLAGS: GREEN' },
  last: {
    text: 'Match count: | *one. Forever.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
