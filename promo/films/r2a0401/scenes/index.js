// r2a0401: star_advice, ADVICE SOLO, "Cancer, you don't have | to be perfect." (~45 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole way: nine relatable Cancer truths, each with a warm reframe and one light gag.
// Ending: callback.
//   0.0–3.6    "Cancer, you don't have | *to be perfect.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              burnt cookies, all eaten · a late birthday text still counts · messy house, friends came for you
//              · said no, still loved · cried at work, human confirmed · tiny gift, the card lives on the fridge
//              · can't host, pizza is a feast · took a nap, nobody fell apart · your turn to be looked after
//  37.8        "Not perfect. | *Perfectly loved.*"  Cancer comes back, big.
//  41.2        CALLBACK: "The burnt cookies? | *Gone in a minute.*"  The cookie tray is back: crumbs only.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', SILVER = '#cfe3ff'

const COOKIE = [
  '.BBBB.',
  'BbBBkB',
  'BBkBBB',
  'BBBBbB',
  'BkBBBB',
  '.BBBB.',
]
const COOKIE_C = { B: '#6b3a1e', b: '#3a1e10', k: '#1a0e08' }
const TISSUE = [
  '...WWW....',
  '..WWWWW...',
  '...WWW....',
  'BBBBBBBBBB',
  'BbBBBBBBbB',
  'BBBHBBHBBB',
  'BBBBHHBBBB',
  'BbBBBBBBbB',
  'BBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: '#8fb0ff', b: '#b9ccff', H: PINK }
const GIFT = [
  '..R...R..',
  '...R.R...',
  'GGGGRGGGG',
  'GGGGRGGGG',
  'RRRRRRRRR',
  'GGGGRGGGG',
  'GGGGRGGGG',
]
const GIFT_C = { G: MINT, R: RED }
const PILLOW = [
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  'WWWLWWWWLWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const PILLOW_C = { W: '#e8e2ff', L: LAV }
const LAUNDRY = [
  '.....PP.....',
  '...PPPPMM...',
  '..YYPPMMMM..',
  '.YYYYSSMMBB.',
  'YYYSSSSSBBBB',
  'GGGSSSRRBBBB',
  'GGGGGRRRRBBB',
]
const LAUNDRY_C = { P: PINK, M: MINT, Y: GOLD, S: SKYB, B: LAV, G: '#9ae58a', R: '#ff9a7a' }
const SOUP = [
  '..W...W...W..',
  '...W...W...W.',
  'OOOOOOOOOOOOO',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
  '....BBBBB....',
]
const SOUP_C = { W: '#d8dbe8', O: '#ffcf6a', B: '#ff8fb1' }

// a baking tray with cookies; `eaten` 0…1 takes them away one by one, leaving crumbs
function tray(x, cx, cy, k, { burnt = 1, eaten = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -96, 352, 192)
  x.fillStyle = '#9aa5c4'; x.fillRect(-168, -88, 336, 176)
  x.fillStyle = '#c3cbe0'; x.fillRect(-156, -76, 312, 152)
  const left = Math.round(6 * (1 - eaten))
  for (let i = 0; i < 6; i++) {
    const px = -104 + (i % 3) * 104, py = -36 + Math.floor(i / 3) * 76
    if (i < left) drawBits(x, COOKIE, burnt ? COOKIE_C : { B: '#e8a24a', b: '#c97a2a', k: '#5b2e1a' }, px, py, 10)
    else { x.fillStyle = '#6b3a1e'; for (let q = 0; q < 4; q++) x.fillRect(px - 16 + q * 11, py + (q % 2) * 8, 7, 7) }
  }
  x.restore()
}
// a phone with a message thread
function phone(x, cx, cy, k, msgs, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -230, 300, 460)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -220, 280, 440)
  x.fillStyle = '#140c30'; x.fillRect(-126, -190, 252, 380)
  x.font = `700 22px ${INTER}`; x.textBaseline = 'middle'
  msgs.forEach((m, i) => {
    if (lt < m.at) return
    const w = Math.max(...m.text.split('|').map(s => x.measureText(s.trim()).width)) + 30, lines = m.text.split('|'), h = lines.length * 28 + 18
    const bx = m.me ? 110 - w : -110, by = -160 + i * 112
    x.fillStyle = m.me ? '#5b8cff' : BONE; x.fillRect(bx, by, w, h)
    x.fillStyle = m.me ? '#fff' : INK; x.textAlign = 'left'
    lines.forEach((l, j) => x.fillText(l.trim(), bx + 15, by + 22 + j * 28))
  })
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 200, 60, 10)
  x.restore()
}
// a flat pizza box with a steam curl
function pizzaBox(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -46, 332, 112)
  x.fillStyle = '#d9a25a'; x.fillRect(-158, -38, 316, 96)
  x.fillStyle = '#b97f3a'; x.fillRect(-158, -38, 316, 18)
  x.fillStyle = RED; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOT & READY', 0, 20)
  x.fillStyle = 'rgba(239,230,214,0.6)'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.fillRect(-60 + i * 60 + Math.sin(ph * 6) * 8, -70 - ph * 90, 10, 22) }
  x.restore()
}
// a fridge door with a little card stuck on it
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -226, 272, 452)
  x.fillStyle = '#e8eefc'; x.fillRect(-128, -218, 256, 436)
  x.fillStyle = '#c3cbe0'; x.fillRect(-128, -60, 256, 8); x.fillRect(90, -180, 14, 90); x.fillRect(90, 0, 14, 120)
  const d = ease.outBack ? ease.outBack(clamp((lt - 0.9) / 0.4)) : clamp((lt - 0.9) / 0.4)
  if (lt > 0.9) {
    x.save(); x.translate(-20, -150 + (1 - d) * -60); x.rotate(-0.08)
    x.fillStyle = INK; x.fillRect(-74, -54, 148, 108); x.fillStyle = PAPER; x.fillRect(-68, -48, 136, 96)
    x.fillStyle = PINK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('thank', 0, -12); x.fillText('you ♥︎', 0, 18)
    x.fillStyle = RED; x.fillRect(-10, -62, 20, 20)
    x.restore()
  }
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'cancer', cap: 'Burnt the cookies? | *Still all eaten.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      tray(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { eaten: clamp((lt - 1.0) / 1.0) })
      label(x, 790, 720, 'A LITTLE BURNT', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: '#ff9a7a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'EATEN: ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Missed their birthday? | *A late text counts.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.6],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), [
        { text: 'happy birthday!! | (one day late)', me: true, at: 0.5 },
        { text: 'omg you | remembered!!', at: 1.3 },
        { text: 'love you ♥︎', at: 1.8 },
      ], lt)
    } },
  { sign: 'cancer', cap: 'House a mess? | They came *for you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      drawBits(x, LAUNDRY, LAUNDRY_C, 800, 1040, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 760, 170 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 800, 600, 'NOBODY NOTICED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Said no this time? | *Still a good friend.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: STAR, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'can you help | me move? again?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      bubble(x, 700, 900, 'not this time ♥︎', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1100, 'FRIENDSHIP: INTACT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Cried at work? | *Feelings are allowed.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: lt => lt > 1.5 ? [1, 0] : [0, 1], star: STAR, tears: lt => lt < 1.5 ? 1 : 0,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'HUMAN: CONFIRMED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.5, 6, 160, 0.4)
    } },
  { sign: 'cancer', cap: 'A tiny gift? | They *kept the card.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      fridge(x, 820, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      drawBits(x, GIFT, GIFT_C, 600, 1110, 8 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 820, 1150, 'ON THE FRIDGE. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: PINK, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Can’t host this year? | *Pizza is a feast.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      pizzaBox(x, t, 790, 1010, pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 720, 'best night | EVER', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'cancer', cap: 'You took a nap. | *Nobody fell apart.*', mood: lt => lt > 1.7 ? 'happy' : 'sleepy', star: STAR, hops: [1.7],
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'EVERYONE: FINE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 800, 'YOU: RESTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You look after everyone. | *Your turn now.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 950, 220 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false })
      drawBits(x, SOUP, SOUP_C, lerp(820, 640, ease.inOutCubic(prog(lt, 0.8, 1.3))), 1100, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 820, 660, 'sit. i’ve | got you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 560, 860, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0401', key: 'D', accent: SILVER, solo: 'cancer', ending: 'callback',
  title: 'Cancer, you don’t | have *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly loved.*', mood: 'heart' },
  last: {
    text: 'The burnt cookies? | *Gone in a minute.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 380, 1110, 260 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      tray(x, 730, 1130, pop01(t, t - lt + 0.6, 0.35, 2), { eaten: 1 })
      label(x, 730, 1270, 'CRUMBS ONLY', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 1060, t - lt + 1.4, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
