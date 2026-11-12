// r2t0666: star_talk, SOLO (cancer), "Cancer birthdays | *be like.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine birthday moments, each the most extreme Cancer version. Ending: group.
//   blew out the candles, cried · a slideshow of every past birthday · party at home, in pajamas · called mom first,
//   three hours · kept the wrapping paper, all of it · checked their birth chart: still emotional · cooked for everyone
//   at their own party · read your card nine times · forgot their birthday? noted, forever
//   group "Big feelings. | *Bigger cake.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, confetti, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9d6ff', S = 'cancer', ST = { x: -190 }
const CAKE = ['...F..F..F...', '...C..C..C...', '..PPPPPPPPP..', '.WWWWWWWWWWW.', '.PPPPPPPPPPP.', '.WWWWWWWWWWW.', '.PPPPPPPPPPP.', 'DDDDDDDDDDDDD']
const CAKE_C = { F: GOLD, C: BONE, P: PINK, W: CREAM, D: STEEL }
const POT = ['..KKKKKKKK..', 'KKKKKKKKKKKK', '.SSSSSSSSSS.', '.SSSSSSSSSS.', '.SSSSSSSSSS.', '.SSSSSSSSSS.', '..SSSSSSSS..']
const POT_C = { K: '#5a5f7a', S: STEEL }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#c9d6ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.rotate(-t * 0.25); drawBits(x, ['..YYY.', '.YY...', 'YY....', 'YY....', '.YY...', '..YYY.'], { Y: '#fff1b0' }, 0, 0, r * 0.11)
  x.restore()
}
// a slideshow screen: a year flips by, faster and faster
function slideshow(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -120, 360, 260)
  x.fillStyle = INK; x.fillRect(-180, -134, 360, 250); x.fillStyle = PLUM; x.fillRect(-170, -124, 340, 230)
  const n = Math.floor(clamp((lt - 0.3) / 1.8) ** 1.6 * 28)
  x.fillStyle = ['#ffd6e4', '#d8e6ff', '#fff1b0', '#d7ffe6'][n % 4]; x.fillRect(-156, -110, 312, 202)
  drawBits(x, CAKE, CAKE_C, 0, -10, 13)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`BDAY ${1998 + n}`, 0, 70)
  x.fillStyle = INK; x.fillRect(-30, 116, 60, 40); x.fillRect(-90, 150, 180, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Blew out the candles. | *Cried* immediately.', mood: lt => lt > 1.1 ? 'wide' : 'happy', tears: lt => lt > 1.1 ? 3 : 0, look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const lit = lt < 0.9
      drawBits(x, lit ? CAKE : CAKE.map((r, j) => j === 0 ? r.replace(/F/g, '.') : r), CAKE_C, 790, 900, 24 * k)
      if (!lit) for (let i = 0; i < 3; i++) steam(x, t, 790 + (i - 1) * 72, 790, { n: 1, alpha: 0.6, h: 90 })
      bubble(x, 790, 640, 'it’s just… | so beautiful', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'A slideshow of | *every* past birthday.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      slideshow(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1090, 'RUNTIME: 4 HOURS', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Party? At home. | In *pajamas.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    back(x, t, lt, P, F) { bits(x, 'BLANKET', F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.9, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 790, 34 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1040, 'DRESS CODE: PJs', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 38)
    } },
  { sign: S, cap: 'Called mom first. | Talked *three hours.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 790, 820, 1.15 * k, { head: 'MOM ♡', headCol: PINK, lines: [['hi sweetie!!', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['MOM. it’s my day', MINT, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['I know ♡ tell me', BONE, pop01(t, P.t0 + 1.4, 0.25, 2)]] })
      const s = Math.floor(clamp((lt - 0.4) / 2) * 10799)
      L(x, 790, 1110, `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, k, GOLD, 0.04, 40)
    } },
  { sign: S, cap: 'Kept the wrapping paper. | *All of it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'GIFT', 700 + (i % 2) * 170, 1000 - Math.floor(i / 2) * 160, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: (i - 1.5) * 0.06 })
      L(x, 790, 650, 'ARCHIVE: 2004–NOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), CREAM, -0.04, 34)
    } },
  { sign: S, cap: 'Checked their birth chart. | *Still emotional.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', tears: lt => lt > 1.3 ? 1 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 160, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1070, 'MOON: VERY ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 36)
    } },
  { sign: S, cap: 'Cooked for everyone. | At *their own* party.', mood: 'happy', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 790, 900, 22 * k)
      if (k > 0.5) steam(x, t, 790, 790, { n: 4, alpha: 0.75, h: 140 })
      L(x, 790, 1080, 'SERVES: 40', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 40)
      bubble(x, 790, 640, 'eat! eat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Opened your card. | Read it *nine times.*', mood: 'heart', tears: lt => lt > 1.0 ? 2 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, rot: 0.05, head: 'HAPPY BDAY', headBg: PINK, headInk: INK, lines: ['love you,', 'weirdo ♡'], size: 40 })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 8)
      L(x, 790, 1060, `READ x${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Forgot their birthday? | *Noted.* Forever.', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, rot: -0.04, head: 'THE BOOK', headBg: INK, headInk: BONE, lines: ['2019: Dave', '2022: Dave', ['2026: you', RED]], size: 36, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 790, 1080, 'NEVER FORGETS', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0666', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Cancer birthdays | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Big feelings. | *Bigger cake.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
