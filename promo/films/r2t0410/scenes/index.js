// r2t0410: star_talk, SOLO (aries), "Your Aries sibling | *be like.*" (signs3kit social cut, music: lofi · F).
// Ending: callback (the board-game rematch is still going).
//   nine cards: shotgun since birth · "pass the salt" became a race · labelled your leftovers with their name
//   · still "protecting" you at 30 · lost the board game, rematch #9 · your hoodie is theirs now · up at 6 am, excited
//   · opened your birthday gifts "to help" · bad day? at your door with the good blanket
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, clock, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#ff6b5a'
const ST = { x: -170 }
const S = 'aries'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const SALT = ['.KKKK.', 'KWKWKK', 'KWWWWK', 'KWWWWK', 'KWWWWK', 'KWWWWK', 'KKKKKK']
const CAR = ['....RRRRRR......', '...RWWRRWWWR....', '..RRWWRRWWWWR...', 'RRRRRRRRRRRRRRRR', 'RYRRRRRRRRRRRRYR', 'RRRRRRRRRRRRRRRR', '..KKK......KKK..', '..KGK......KGK..', '..KKK......KKK..']
const GIFT = ['...Y..Y...', '....YY....', 'KKKKKKKKKK', 'KPPPYYPPPK', 'KKKKKKKKKK', '.KPPYYPPK.', '.KPPYYPPK.', '.KPPYYPPK.', '.KKKKKKKK.']
const DIE = ['KKKKKKK', 'KWWWWWK', 'KWKWWWK', 'KWWKWWK', 'KWWWKWK', 'KWWWWWK', 'KKKKKKK']

/** a hoodie with a little name tag */
function hoodie(x, cx, cy, k, col, tag) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -100, 220, 230); x.fillRect(-170, -90, 70, 180); x.fillRect(100, -90, 70, 180); x.beginPath(); x.arc(0, -100, 70, Math.PI, 0); x.fill()
  x.fillStyle = col; x.fillRect(-102, -92, 204, 214); x.fillRect(-162, -82, 62, 164); x.fillRect(100, -82, 62, 164); x.beginPath(); x.arc(0, -100, 62, Math.PI, 0); x.fill()
  x.fillStyle = INK; x.fillRect(-60, 40, 120, 60); x.fillStyle = col; x.fillRect(-54, 46, 108, 48)
  x.fillStyle = BONE; x.fillRect(-24, -60, 8, 50); x.fillRect(16, -60, 8, 50)
  if (tag) { x.fillStyle = INK; x.fillRect(-76, -26, 152, 52); x.fillStyle = BONE; x.fillRect(-70, -20, 140, 40); txt(x, tag, 0, 2, { size: 24, font: MONO, weight: 700 }) }
  x.restore()
}
/** a board-game board with a die */
function board(x, t, cx, cy, k, n) {
  card(x, cx, cy, 300, 220, k, { bg: '#e8fbd8', rot: -0.04 }, () => {
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#9fd6a0' : CREAM; x.fillRect(-130 + i * 44, -90 + j * 44, 40, 40) }
    x.fillStyle = RED; x.fillRect(-110, -70, 24, 24); x.fillStyle = '#5fa8ff'; x.fillRect(70, 20, 24, 24)
  })
  if (k > 0.5) drawBits(x, DIE, { K: INK, W: '#ffffff' }, cx + 120, cy - 120 - Math.abs(Math.sin(t * 7)) * 30, 10, { rot: t * 3, outline: null })
}

const CAMEOS = [
  { sign: S, cap: 'Called shotgun | *at birth.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7],
    front(x, t, lt, P) {
      drawBits(x, CAR, { K: INK, R: RED, W: SKYB, Y: SUN, G: GREY }, 790, 920, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 860, 800, 'SHOTGUN!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      lab(x, 790, 660, 'FRONT SEAT: FOREVER', pop01(t, P.t0 + 0.9, 0.3, 2.4), { bg: GOLD, rot: 0.04, size: 30 })
      lab(x, 790, 1120, 'YOU: BACK, MIDDLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GREY, rot: -0.04, size: 30 })
    } },
  { sign: S, cap: '“Pass the salt” | became *a race.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.0))
      drawBits(x, SALT, { K: INK, W: '#ffffff' }, lerp(900, 640, p), 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, lerp(900, 640, p), 1090, 'SALT', pop01(t, P.t0 + 0.3, 0.3, 2), { bg: BONE, rot: 0, size: 30 })
      if (lt > 0.4 && lt < 1.1) { x.fillStyle = 'rgba(239,230,214,0.6)'; for (let i = 0; i < 3; i++) x.fillRect(lerp(900, 640, p) + 70 + i * 30, 930 + i * 24, 60, 8) }
      lab(x, 790, 680, 'NEW RECORD: 0.8 S', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: RED, color: BONE, rot: 0.04 })
    } },
  { sign: S, cap: 'Your leftovers? | *Labelled theirs.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 300, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SKYB, rot: 0.03 }, () => {
        x.fillStyle = INK; x.fillRect(-150, -100, 300, 30)
        const swap = lt > 1.0
        x.fillStyle = BONE; x.fillRect(-110, -20, 220, 70)
        txt(x, swap ? 'ARIES' : 'YOURS', 0, 16, { size: 40, font: MONO, weight: 700, color: swap ? RED : INK })
        if (lt > 0.8 && lt < 1.0) { x.fillStyle = RED; x.fillRect(-110, 12, 220 * (lt - 0.8) / 0.2, 8) }
      })
      lab(x, 790, 680, 'FRIDGE LAW', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: 0.04, size: 36 })
    } },
  { sign: S, cap: 'Still “protecting” you. | *You’re 30.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'WHO UPSET | MY SIBLING?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 990, 160 * k, { mood: 'wide', look: [-1, 0], seed: 13, glyph: false })
      lab(x, 790, 1150, 'IT WAS A PRINTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: S, cap: 'Lost one board game. | *Rematch. Rematch.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0)
      const n = 2 + Math.floor(clamp((lt - 0.6) / 1.4) * 7)
      lab(x, 790, 680, `REMATCH #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: RED, color: BONE, rot: 0.04, size: 40 })
      lab(x, 790, 1120, 'BEDTIME: IGNORED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Borrowed your hoodie. | *It’s theirs now.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      hoodie(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), '#5fa8ff', lt > 1.0 ? 'ARIES' : 'YOU')
      lab(x, 790, 1120, 'OWNER: DISPUTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SUN, rot: -0.04 })
    } },
  { sign: S, cap: '6 am. Saturday. | *Wide awake. Excited.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      clock(x, 820, 700, 90, pop01(t, P.t0 + 0.2, 0.35, 2), 6, 0)
      bubble(x, 790, 960, 'WHO WANTS | PANCAKES?!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      lab(x, 790, 1140, 'HOUSE: ASLEEP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: S, cap: 'Your birthday? | They *opened your gifts.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GIFT, { K: RED, P: PINK, Y: GOLD }, 790, 920, 26 * k)
      confetti(x, t, 790, 860, P.t0 + 1.0, { n: 18, spread: 200, h: 440 })
      lab(x, 790, 680, '“JUST HELPING”', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: GOLD, rot: 0.04, size: 36 })
    } },
  { sign: S, cap: 'Bad day? | They’re *at your door.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 820, 870, 220, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: BROWN, rot: 0 }, () => { x.fillStyle = SUN; x.beginPath(); x.arc(70, 20, 14, 0, Math.PI * 2); x.fill() })
      bubble(x, 760, 620, 'open up! | brought the good | blanket', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bl' })
      lab(x, 790, 1130, 'ON THEIR WAY: ALWAYS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: PINK, rot: -0.04, size: 28 })
      hearts(x, t, 560, 900, P.t0 + 1.6, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0410', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Aries sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos sibling. | *Best sibling.*', mood: 'sparkle' },
  last: {
    text: 'That board game? | *Rematch #47.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 340, 1110, 250 * k, { mood: lt > 1.4 ? 'squint' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 1.9] })
      board(x, t, 730, 1110, pop01(t, t0 + 0.6, 0.4, 2), 0)
      lab(x, 560, 1330, 'BEST OF 101?', pop01(t, t0 + 1.5, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
