// r2t0553: star_talk, SOLO (cancer), "Your Cancer roommate | be like." (signs3kit social cut, music: lofi · G).
// Nine cards, each the most extreme caring Cancer roommate. Ending: callback (you moved out; the letters still come).
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
const SCARF = ['RRRRRRRRRRRRRR', 'RWRRWRRWRRWRRW', 'RRRRRRRRRRRRRR', '..........RRR.', '..........RWR.', '..........RRR.', '..........RWR.', '..........RRR.', '..........R.R.']
const SCARF_C = { R: '#ff8fb1', W: CREAM }
const FERN = ['..G...G..', '.GG.G.GG.', 'GG.GGG.GG', '.G.GGG.G.', '...GGG...', '....G....', '.KKKKKKK.', '.KBBBBBK.', '..KBBBK..']
const FERN_C = { G: '#4fbf6a', K: INK, B: '#c96a3a' }
const letter = (x, cx, cy, k, o = {}) => sheet(x, cx, cy, k, { w: 300, h: 330, head: 'DEAR ROOMIE', headBg: PINK, headInk: INK, lines: ['the mug looked', 'so lonely…', '(page 1 of 2)'], size: 28, ...o })

const CAMEOS = [
  { sign: 'cancer', cap: 'Left one dish out. | Got a *two-page letter.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      letter(x, 800, 830, pop01(t, P.t0 + 0.3, 0.35, 2), { progress: clamp((lt - 0.5) / 1.0) })
      bits(x, 'MUG', 650, 1060, 9 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 830, 1080, 'SIGNED: ♥', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'You coughed once. | They *knitted a scarf.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const g = clamp((lt - 0.3) / 1.2)
      drawBits(x, SCARF.map(r => r.slice(0, Math.max(1, Math.round(r.length * g)))), SCARF_C, 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1060, 'WEAR IT. NOW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Knows your mom’s birthday. | *Better than you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 800, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 650, 'MOM: TOMORROW!', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, 0.05, 32)
      bubble(x, 800, 1070, 'card’s signed. by you.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'The fern drooped. | They *read it a poem.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const up = clamp((lt - 1.4) / 0.5)
      drawBits(x, FERN, FERN_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.35 * (1 - up) })
      bubble(x, 800, 660, 'O fern, my fern…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 1090, 'FERN: THRIVING', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Movie night. | Cried at *the trailer.*', mood: 'wide', tears: lt => lt > 0.8 ? 2 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 810, 'COMING SOON', pop01(t, P.t0 + 0.4, 0.3, 2.2), BONE, 0, 26)
      bits(x, 'TISSUE', 800, 1050, 10 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 800, 660, 'TISSUES USED: 9', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Did your laundry. | *Folded in hearts.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'PILLOW', 800, 980 - i * 60, 14 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2))
      bits(x, 'HEARTB', 800, 760, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.4))
      L(x, 800, 1110, 'IRONED: SOCKS TOO', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'You came home late. | They *waited up.*', mood: lt => lt > 1.3 ? 'wide' : 'sleepy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'LAMP', 700, 900, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 880, 760, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 880, 880, '2:14 AM', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 30)
      bubble(x, 800, 1090, 'TEXT ME NEXT TIME', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Labeled your fridge shelf: | *“loved.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, bg: '#e8f0ff', head: 'FRIDGE', headBg: STEEL, headInk: INK, lines: ['TOP: mine', 'MIDDLE: yours', 'BOTTOM: also yours'], size: 26, align: 'left' })
      L(x, 800, 1070, 'SNACKS: REFILLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 640, 1000, P.t0 + 1.3, { n: 4, life: 1.6, spread: 90, cell: 6, seed: 8 })
    } },
  { sign: 'cancer', cap: 'You had a bad day. | They *built a fort.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 960); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-190, 60); x.lineTo(0, -190); x.lineTo(190, 60); x.fill()
        x.fillStyle = '#c9a6ff'; x.beginPath(); x.moveTo(-176, 54); x.lineTo(0, -176); x.lineTo(176, 54); x.fill()
        x.fillStyle = PINK; for (let i = 0; i < 4; i++) x.fillRect(-90 + i * 50, -40 + (i % 2) * 40, 18, 18)
        x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(-50, 54); x.lineTo(0, -40); x.lineTo(50, 54); x.fill()
        x.restore()
      }
      L(x, 800, 690, 'FORT: OPEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 800, 1110, 'SNACKS INSIDE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0553', key: 'G', accent: ACC, solo: 'cancer', ending: 'callback',
  title: 'Your Cancer | roommate *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Roommate? | *More like mom.*', mood: 'heart' },
  last: {
    text: 'You moved out. | Letters *still come.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 3; i++) letter(x, 540 + (i - 1) * 60, 1120 - i * 30, pop01(t, t0 + 0.4 + i * 0.35, 0.35, 2), { rot: (i - 1) * 0.08, lines: ['miss you!', 'how’s the mug?', `(page 1 of ${2 + i * 3})`] })
      hearts(x, t, 780, 1180, t0 + 1.5, { n: 5, life: 1.8, spread: 90, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
