// r2t0482: star_talk, SOLO, "Scorpio first date | be like." (~51 s vertical, signs3kit social cut, music: lofi · E).
// One sign the whole film, nine first-date moments pushed to the extreme. Ending: card (lesson + last line + match card).
//   0.0–3.6    "Scorpio first date | *be like.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              sunglasses on, indoors · every answer is a question · "the usual" on their first visit · your biggest
//              fear, before the bread · laughed once, legendary · all black to brunch · the bill vanished, paid
//              · "had fun!" "I know." · already picked your nickname (Leo blushes: "sunshine")
//  37.8        "Mysterious. | *Also very into you.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "Slow to open. | *Worth the wait.*"  TRUST: LOADING
//  46.9        "Sunshine said | *yes to date two.*" over the match card: Scorpio + Leo (the nickname, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, inSprite,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#c97bff'
const S = 'scorpio'

const BREAD = [
  '..BBBBBB..',
  '.BBbBBbBB.',
  'BBBBBBBBBB',
  '.BBBBBBBB.',
]
const BREAD_C = { B: '#e8a24a', b: PAPER }
const PANCAKES = [
  '....YY....',
  '...YYYY...',
  '.MMMMMMMM.',
  'PPPPPPPPPP',
  '.MMMMMMMM.',
  'PPPPPPPPPP',
  '.MMMMMMMM.',
  'PPPPPPPPPP',
  'WWWWWWWWWWWW'.slice(0, 10),
]
const PANCAKES_C = { Y: '#fff1a0', M: '#8a4a2e', P: '#e8a24a', W: PAPER }
const CUP = [
  'WWWWWWW..',
  'WKKKKKW..',
  'WKKKKKWWW',
  'WKKKKKW.W',
  'WKKKKKWWW',
  'WWWWWWW..',
  '.WWWWW...',
]
const CUP_C = { W: PAPER, K: '#2a1a12' }

// dark glasses drawn in the star's own sprite cells, so they ride its bob and hops
function shades(x, F, k) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(6.5, 16.5, 9.5, 6.5); x.fillRect(20, 16.5, 9.5, 6.5); x.fillRect(15, 17.5, 6, 1.6)
    x.fillStyle = '#1a1230'; x.fillRect(7.5, 17.5, 7.5, 4.5); x.fillRect(21, 17.5, 7.5, 4.5)
    x.fillStyle = '#6b62a8'; x.fillRect(8.3, 18.2, 2, 1.2); x.fillRect(21.8, 18.2, 2, 1.2)
  })
}
// a receipt that turns to smoke and comes back stamped
function receipt(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const gone = prog(lt, 0.7, 1.0), back = prog(lt, 1.2, 1.5)
  x.save(); x.translate(cx, cy); x.rotate(0.05)
  if (gone < 1 || back > 0) {
    const a = back > 0 ? back : 1 - gone
    x.globalAlpha = a; x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-96, -146, 192, 292); x.fillStyle = PAPER; x.fillRect(-88, -138, 176, 276)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('THE BILL', 0, -104)
    for (let i = 0; i < 4; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-64, -60 + i * 34, 128, 10) }
    if (back > 0) { x.save(); x.rotate(-0.2); x.strokeStyle = '#2fc79a'; x.lineWidth = 6; x.strokeRect(-70, 50, 140, 60); x.fillStyle = '#2fc79a'; x.font = `800 34px ${INTER}`; x.fillText('PAID', 0, 82); x.restore() }
  }
  x.restore()
  if (gone > 0 && back < 1) {   // a little puff of smoke where it vanished
    x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * clamp((lt - 0.7) / 0.8))
    x.fillStyle = '#b7a6d8'
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; x.beginPath(); x.arc(cx + Math.cos(a) * 60 * (0.6 + gone), cy + Math.sin(a) * 60 * (0.6 + gone), 34, 0, Math.PI * 2); x.fill() }
    x.restore()
  }
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Sunglasses on. | *Indoors.*', mood: 'neutral', look: [1, 0], star: STAR, hideStar: false,
    front(x, t, lt, P, F) {
      shades(x, F, pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 760, 'TABLE: BACK CORNER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'LIGHTING: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Every answer: | *another question.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'where are you from?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: PAPER, tail: 'br' })
      bubble(x, 780, 900, 'why do | you ask?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'ANSWERS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ordered “the usual.” | *First visit.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: STAR,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'the usual.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
      drawBits(x, CUP, CUP_C, 790, 960, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1120, 'WAITER: …OK?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Asked your deepest fear. | *Before the bread.*', mood: 'wide', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so. your | deepest fear?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      drawBits(x, BREAD, BREAD_C, 790, 980, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1120, 'MINUTE: 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughed once. | *You’ll never forget it.*', mood: lt => lt > 0.9 && lt < 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: STAR, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'ha.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 72, tail: 'bl' })
      sparkles(x, t, 400, 820, P.t0 + 1.2, 8, 190, 0.3)
      label(x, 790, 1030, 'LAUGHS: 1 · ICONIC', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wore all black. | *To brunch.*', mood: 'neutral', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 790, 980, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 740, 'DRESS CODE: VOID', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: '#9aa5c4', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'love the syrup', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Paid the bill. | *Nobody saw how.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      receipt(x, t, 790, 930, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 680, 'HOW?? (NO ONE KNOWS)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: '“Had fun!” | They replied *“I know.”*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'had fun!! :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: PAPER, tail: 'br' })
      bubble(x, 780, 920, 'i know.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'REPLY TIME: 4 HRS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Already picked | *your nickname.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 990, 220 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      label(x, 790, 720, 'CODE NAME: SUNSHINE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0482', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Scorpio first date | *be like.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'leo', chip: "IT'S A MATCH" },
  group: { cap: 'Mysterious. | *Also very into you.*', mood: 'heart' },
  lesson: { text: 'Slow to open. | *Worth the wait.*', chip: 'TRUST: LOADING' },
  last: { text: 'Sunshine said | *yes to date two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
