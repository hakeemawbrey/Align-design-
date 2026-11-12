// r2a0481: star_advice, ADVICE SOLO, "Signs a Gemini | likes you." (~51 s vertical, signs3kit social cut, music: lofi · D).
// One sign the whole way: nine little Gemini tells, each a relatable truth with a warm reframe and one light gag.
// Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Signs a Gemini | *likes you.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              every meme goes to you · they kept your random fact · they let you finish the story · a playlist
//              for you · both of them like you · never bored with you · forty questions (Aquarius answers them all)
//              · you've met all their friends · they checked your chart, twice
//  37.8        "Curious about you? | *That's the sign.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "The way they *listen* | is how they love."  VIBE: MUTUAL
//  46.9        "Question forty-one: | *dinner?*" over the match card: Gemini + Aquarius (the forty questions, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', YEL = '#ffd23a'

const TAPE = [
  'KKKKKKKKKKKKKK',
  'KPPPPPPPPPPPPK',
  'KPWWWWWWWWWWPK',
  'KPWKKWWWWKKWPK',
  'KPWKKWWWWKKWPK',
  'KPWWWWWWWWWWPK',
  'KPPPPPPPPPPPPK',
  'KPPKKKKKKKKPPK',
  'KKKKKKKKKKKKKK',
]
const TAPE_C = { K: '#2a2350', P: PINK, W: PAPER }
const OTTER = [
  '..BB....BB..',
  '.BBBB..BBBB.',
  '.BWKB..BWKB.',
  '.BBBB..BBBB.',
  'BBBBBHHBBBBB',
  'BBBBBHHBBBBB',
  '.BBBB..BBBB.',
  '.BB.B..B.BB.',
]
const OTTER_C = { B: '#a8714a', W: '#fff4e2', K: INK, H: PINK }
const QMARK = [
  '.QQQ.',
  'Q...Q',
  '...Q.',
  '..Q..',
  '..Q..',
  '.....',
  '..Q..',
]

// a phone screen with a bubble thread drawn in
function phone(x, cx, cy, k, rows, lt, { rot = 0.05, down = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -210, 260, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -200, 240, 400)
  if (down) { x.fillStyle = '#6b62a8'; x.fillRect(-40, -150, 80, 80); x.restore(); return }
  x.fillStyle = '#140c30'; x.fillRect(-108, -176, 216, 352)
  x.font = `700 22px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  rows.forEach((m, i) => {
    if (lt < m.at) return
    const w = x.measureText(m.text).width + 26, by = -150 + i * 64
    const bx = m.me ? 96 - w : -96
    x.fillStyle = m.me ? '#5b8cff' : BONE; x.fillRect(bx, by, w, 44)
    x.fillStyle = m.me ? '#fff' : INK; x.fillText(m.text, bx + 13, by + 23)
  })
  x.restore()
}
/** a little birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'gemini', cap: 'Every meme goes to you. | *A love letter.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 930, pop01(t, P.t0 + 0.2, 0.3, 2), [{ at: 0.4, text: 'lol this is u', me: true }, { at: 0.7, text: 'and this', me: true }, { at: 1.0, text: 'THIS ONE', me: true }, { at: 1.5, text: 'stop, ha', me: false }], lt)
      label(x, 790, 680, 'SENT TO: ONLY YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Kept your random fact. | *For months.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, OTTER, OTTER_C, 790, 990, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 720, 'otters hold | hands, right?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 790, 920, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'They let you | *finish the story.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: STAR, squash: lt => lt > 0.5 && lt < 1.5 ? 0.04 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'and then?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 1000, 'INTERRUPTIONS: 0', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, '(A PERSONAL BEST)', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 26, bg: LAV, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'A playlist? | *They picked every song.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, TAPE, TAPE_C, 790, 950, 20 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: -0.06 })
      label(x, 790, 760, 'FOR YOU · 63 SONGS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      x.save(); x.globalAlpha = clamp((lt - 0.8) * 2); x.restore()
      if (lt > 1.0) for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); drawBits(x, ['..XX', '..XX', '..X.', 'XXX.', 'XXX.'], { X: i % 2 ? GOLD : BONE }, 720 + i * 70, 1080 - ph * 200, 7, { alpha: Math.sin(Math.PI * ph) }) }
    } },
  { sign: 'gemini', cap: 'Both of them like you. | *Both. Of them.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 780, 900, 260 * k, { mood: lt > 1.2 ? 'heart' : 'wink', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.6] })
      label(x, 600, 680, 'TWINS: AGREE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 860, P.t0 + 1.4, { n: 6, life: 1.6, spread: 320, cell: 7, seed: 6 })
    } },
  { sign: 'gemini', cap: 'Bored of everything. | *Never of you.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      const items = ['hobby #14', 'new app idea', 'the gym']
      items.forEach((s, i) => label(x, 790, 700 + i * 90, s, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2) * (1 - prog(lt, 0.9 + i * 0.1, 1.1 + i * 0.1)), { size: 30, bg: '#9aa5c4', rot: (i % 2 ? 0.05 : -0.05) }))
      label(x, 790, 1050, 'YOU: STILL FUN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forty questions? | *They’re into you.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 990, 220 * k, { mood: lt > 1.6 ? 'happy' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      for (let i = 0; i < 5; i++) { const kk = pop01(t, P.t0 + 0.5 + i * 0.22, 0.25, 2); drawBits(x, QMARK, { Q: [GOLD, MINT, PINK, SKYB, LAV][i] }, 560 + i * 80, 720 - (i % 2) * 50, 9 * kk) }
      label(x, 800, 1160, 'QUESTION 40 OF 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Met all their friends. | *In one night.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      const IDS = ['leo', 'libra', 'sagittarius', 'aries', 'taurus', 'virgo']
      IDS.forEach((id, i) => { const kk = pop01(t, P.t0 + 0.25 + i * 0.14, 0.3, 2); if (kk > 0.01) signChar(x, t, id, 680 + (i % 3) * 110, 880 + Math.floor(i / 3) * 130, 104 * kk, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.5, look: [-1, 0] }) })
      bubble(x, 790, 680, 'this is them!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1150, 'FRIENDS MET: ALL', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'They checked your chart. | *Twice.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: STAR, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 900, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 700, 'CHECK #2', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'RESULT: CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0481', key: 'D', accent: YEL, solo: 'gemini', ending: 'card',
  title: 'Signs a Gemini | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aquarius', chip: "IT'S A MATCH" },
  group: { cap: 'Curious about you? | *That’s the sign.*', mood: 'heart' },
  lesson: { text: 'The way they *listen* | is how they love.', chip: 'VIBE: MUTUAL' },
  last: { text: 'Question forty-one: | *dinner?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
