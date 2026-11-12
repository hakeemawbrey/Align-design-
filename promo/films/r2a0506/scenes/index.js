// r2a0506: star_advice ADVICE SOLO (Scorpio), "Scorpio, you're doing | *better than you think.*" (signs3kit, lofi · D).
// Ending: callback. Nine small Scorpio wins, each a truth + a warm reframe:
//   crossed a name off the grudge list · opened up a little (curtains 3% open) · texted back in under a day · intensity is
//   how you care · cried in front of someone · asked for help out loud · showed someone your chart · in bed before 3am
//   · still healing, still growing.   group: "Quietly winning. | Every day."   callback: "The grudge list? | Down to zero."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const S = 'scorpio', ACC = '#c97bff', PURPLE = '#c97bff'
/** the grudge notebook: n names, the first 'crossed' of them struck out */
function grudges(x, cx, cy, k, crossed, names = ['KYLE (2019)', 'THE BUS', 'MONDAYS', 'THAT GUY']) {
  card(x, cx, cy, 300, 380, k, { rot: 0.05, bg: CREAM }, () => {
    x.fillStyle = PURPLE; x.fillRect(-150, -190, 300, 70)
    x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE LIST', 0, -155)
    names.forEach((n, i) => {
      const y = -80 + i * 64
      x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(n, 0, y)
      const c = clamp(crossed - i)
      if (c > 0) { x.fillStyle = RED; x.fillRect(-120, y - 3, 240 * c, 7) }
    })
  })
}
const CURTAIN = ['KKKKKKKKKKKKKK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KPPPPPPYPPPPPK', 'KKKKKKKKKKKKKK']
const THERMO = ['.KKK.', 'KWRWK', 'KWRWK', 'KWRWK', 'KWRWK', 'KWRWK', 'KWRWK', 'KRRRK', 'KRRRK', '.KKK.']
const TISSUE = ['...WW...', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBWBBWBK', 'KBBBBBBK', 'KKKKKKKK']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const SPROUT = ['..G...G..', '.GGG.GGG.', '..GGGGG..', '....G....', '....G....', '.KKKKKKK.', '.KRRRRRK.', '..KRRRK..', '..KKKKK..']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.2; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(-r * 0.4, -r * 0.3); x.lineTo(r * 0.45, r * 0.1); x.lineTo(-r * 0.1, r * 0.45); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You let one go. | *That took strength.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      grudges(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.8, 1.2)))
      L(x, 790, 1130, 'FORGIVEN: KYLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'You opened up. | *Even a little counts.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const o = ease.outCubic(prog(lt, 0.6, 1.2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.fillStyle = '#ffe7a8'; x.fillRect(790 - 8 * o * 3, 760, 16 * o * 3 + 1, 260); x.restore()
        drawBits(x, CURTAIN, { K: INK, P: '#6b3fa0', Y: o > 0.1 ? '#ffe7a8' : '#6b3fa0' }, 790, 890, 22 * k, { sx: 1 })
      }
      L(x, 790, 700, 'OPEN: 3%', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 38)
      L(x, 790, 1120, 'HUGE, ACTUALLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'You texted back. | *Same day.* Growth.', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        bubble(x, -20, -90, 'u ok?', 1, { size: 30, col: BONE, tail: 'bl' })
        if (lt > 0.8) bubble(x, 20, 30, 'yes :)', pop01(lt, 0.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      })
      L(x, 790, 1130, 'REPLY TIME: 6 HRS', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Your intensity? | It’s *how you care.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, THERMO, { K: INK, W: '#e8f0ff', R: RED }, 790, 880, 30 * k)
      L(x, 790, 1110, 'CARE LEVEL: MAX', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'You cried in front | of someone. *Brave.*', mood: 'happy', tears: lt => lt < 1.4 ? 1 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', K: INK, B: SKYB }, 790, 920, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 690, 'here, take one.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      L(x, 790, 1120, 'WALLS: STILL STANDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: S, cap: 'You asked for help. | *Out loud.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'can you… | help me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, col: BONE, tail: 'bl' })
      bubble(x, 830, 920, 'OF COURSE!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 50, col: MINT, tail: 'br' })
      sparkles(x, t, 830, 920, P.t0 + 1.05, 7, 150, 0.3)
    } },
  { sign: S, cap: 'You showed someone | *your chart.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 650, 'TOP SECRET', pop01(t, P.t0 + 0.3, 0.3, 2), RED, -0.04, 32, CREAM)
      L(x, 790, 1100, 'SHARED: 1 PERSON', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'In bed | *before 3am.* Iconic.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 700, 740, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 830, 880, 250, 130, pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.04, bg: INK }, () => lines(x, ['11:58'], { size: 70, color: MINT }))
      L(x, 790, 1110, 'NEW RECORD', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: S, cap: 'Still healing? | *Still growing.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.3, 1.2))
      drawBits(x, SPROUT, { G: GREEN, K: INK, R: '#c98f5a' }, 790, 1000 - 60 * g, 14 + 14 * g)
      L(x, 790, 680, 'PROGRESS: REAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 150, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0506', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Scorpio, you’re | *doing better.*',
  cameos: CAMEOS,
  group: { cap: 'Quietly winning. | *Every day.*', mood: 'heart' },
  last: {
    text: 'The grudge list? | *Down to zero.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 370, 1080, 260 * k, { mood: lt > 1.5 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.6] })
      grudges(x, 720, 1060, pop01(t, t0 + 0.5, 0.4, 2), 1 + ease.inOutCubic(prog(lt, 0.9, 1.5)) * 3)
      if (lt > 1.5) L(x, 720, 1300, 'LIST: EMPTY', pop01(t, t0 + 1.5, 0.3, 2.4), MINT, -0.05, 40)
      if (lt > 1.6) hearts(x, t, 540, 880, t0 + 1.6, { n: 6, life: 1.8, spread: 400, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
