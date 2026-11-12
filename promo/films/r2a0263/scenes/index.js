// r2a0263: star_advice, ADVICE SOLO, "Virgo, you can't fix | everyone." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine moments the helper in Virgo wants to fix, each with a warm reframe and one soft gag.
//   0.0–3.6    "Virgo, you can’t fix | *everyone.*"
//   3.6–37.8   nine cards: their mess isn't your homework · listening helps more than fixing · some things stay crooked
//              · you can't edit people · is YOU on your to-do list · boundaries are love too · not every leak needs your
//              wrench · good enough is often great · you're loved, not just useful
//  37.8        "Helper, off duty. | *Still loved.*"
//  41.2        ending 'callback': "That crooked frame? | *Still crooked. Fine.*"  the frame from card 3 is back, still tilted.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff9fc6'
const ST = { x: -170 }
const TOOLBOX = ['...KKKKKK...', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRYYRRRRR', 'RRRRRYYRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const PEN = ['..........RR', '.........RRR', '........RRR.', '.......RRR..', '......RRR...', '.....RRR....', '....RRR.....', '...RRR......', '..WRR.......', '.KW.........', 'K...........']
const FENCE = ['W...W...W...W', 'WW.WWW.WWW.WW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WW.WWW.WWW.WW', 'WWWWWWWWWWWWW', 'WW.WWW.WWW.WW', 'WW.WWW.WWW.WW']
const TAP = ['KKKKKK....', 'KGGGGK....', 'KGGGGGGGGK', 'KGGGGGGGGK', 'KKKKKKKGGK', '.......GGK', '.......KKK']
const WRENCH = ['.GG...', 'GG.G..', 'G...G.', '.G.GG.', '..GGG.', '...GGG', '....GGG', '.....GG']

/** a picture frame tilted by `rot` */
function frame(x, cx, cy, k, rot) {
  card(x, cx, cy, 240, 180, k, { bg: GOLD, rot }, () => {
    x.fillStyle = '#2a2350'; x.fillRect(-96, -66, 192, 132)
    x.fillStyle = SUN; x.beginPath(); x.arc(-30, -14, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-96, 66); x.lineTo(-20, 10); x.lineTo(40, 40); x.lineTo(96, 0); x.lineTo(96, 66); x.closePath(); x.fill()
  })
}

const CAMEOS = [
  { sign: 'virgo', cap: 'Their mess | *isn’t your homework.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) card(x, 790 + (i % 2 ? 16 : -16), 1000 - i * 40, 280, 60, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { bg: [CREAM, '#ffe7a8', BONE, '#ffd0dc', CREAM][i], rot: (i % 3 - 1) * 0.12 })
      label(x, 790, 1110, 'NOT YOURS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 700, 'returning this.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Listening helps | *more than fixing.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, { K: INK, R: '#e23d4e', Y: GOLD }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'CLOSED TODAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 720, 'I’m just here.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Some things stay crooked. | *Let them.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, squash: lt => lt < 1.4 ? 0.03 * Math.sin(lt * 40) : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.16)
      label(x, 790, 1060, 'LEAVING IT.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt < 1.4) bubble(x, 560, 600, '…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'You can’t edit people. | *Just love them.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), drop = ease.inOutCubic(prog(lt, 1.0, 1.4))
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, PEN, { R: '#e23d4e', W: CREAM, K: INK }, lerp(640, 600, drop), lerp(780, 1100, drop), 10 * k, { rot: drop * 1.2 })
      hearts(x, t, 830, 820, P.t0 + 1.4, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 4 })
      label(x, 830, 660, 'NO NOTES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Is *you* on | your to-do list?', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        const items = ['fix Leo’s CV', 'Mom’s taxes', 'Gemini’s move', 'ME: REST']
        items.forEach((s, i) => {
          const y = -140 + i * 90, last = i === 3
          if (last && lt < 1.3) return
          x.fillStyle = INK; x.fillRect(-140, y - 18, 36, 36); x.fillStyle = last ? MINT : CREAM; x.fillRect(-134, y - 12, 24, 24)
          txt(x, s, -90, y + 2, { size: last ? 36 : 28, align: 'left', color: last ? '#1f7a44' : INK })
          if (!last) { x.fillStyle = INK; x.fillRect(-140, y, 36, 6) }
        })
      })
      sparkles(x, t, 790, 1000, P.t0 + 1.35, 6, 140, 0.4)
    } },
  { sign: 'virgo', cap: 'Boundaries are | *love too.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, FENCE, { W: CREAM }, 790, 990, 20 * k)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 800, 12 * pop01(t, P.t0 + 0.9, 0.35, 2) * (1 + 0.04 * Math.sin(t * 7)))
      label(x, 790, 1140, 'GATE OPENS BOTH WAYS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Not every leak | *needs your wrench.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, TAP, { K: INK, G: GREY }, 780, 740, 26 * k)
      x.fillStyle = SKYB; const ph = (t * 1.3) % 1; x.globalAlpha = k * (1 - ph); x.fillRect(872, 830 + ph * 160, 16, 26); x.globalAlpha = 1
      drawBits(x, WRENCH, { G: '#c9c9d8' }, 720, 1030, 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 1.4 })
      label(x, 860, 1110, 'drip. (it’s fine.)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Good enough | *is often great.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'PROJECT', 0, -110, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'B+', 0, 0, { size: 120, color: GREEN })
        txt(x, 'nice work!', 0, 100, { size: 30, color: RED })
      })
      label(x, 790, 1100, 'GOING ON THE FRIDGE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You’re loved, | *not just useful.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'cancer', 700, 990, 170 * k, { mood: 'heart', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.2] })
        signChar(x, t, 'leo', 880, 990, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.4] })
      }
      bubble(x, 790, 700, 'no chores. just us.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0263', key: 'C', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgo, you can’t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Helper, off duty. | *Still loved.*', mood: 'heart' },
  last: {
    text: 'That crooked frame? | *Still crooked. Fine.*',
    draw(x, t, lt) {
      frame(x, 700, 880, pop01(t, t - lt + 0.6, 0.35, 2), 0.16)
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 960, 280 * k, { mood: lt > 2.0 ? 'happy' : 'squint', look: [1, -1], seed: 54, squash: lt < 2.0 ? 0.03 * Math.sin(lt * 40) : 0 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
