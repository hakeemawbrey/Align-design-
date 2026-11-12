// r2a0398: star_advice ADVICE SOLO (cancer), "Signs a Cancer | needs a break." (signs3kit social cut, music: lofi · C). Ending: callback.
//   nine cards, each a sign of Cancer burnout + a warm reframe: hosting again, let someone else cook · rereading old texts,
//   phone down tea up · mothering the group chat, mute it · stay in, it counts · remembered every birthday, remember yours
//   · "no" is a full sentence · carrying everyone's feelings, set the bag down · the chart says nap · said sorry to the toaster
//   group: "Caring for everyone? | Start with you."  callback: "The toaster | forgives you."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7fd4ff', RED = '#e23d4e', CREAM = '#fff4e2'
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
const LADLE = ['..SSS', '..S.S', '..SSS', '..S..', '..S..', '..S..', '.S...', 'SSS..', 'SSS..']
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSWWWSSK', 'KSSSSSSK', 'KSSWWWSK', 'KSSSSSSK', 'KSWWSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#fff4e2', G: '#6b62a8' }
const MUG = ['..W.W...', '.W.W....', 'BBBBBB..', 'BTTTTBBB', 'BTTTTB.B', 'BTTTTBBB', 'BTTTTB..', '.BBBB...']
const BELL = ['...YY...', '..YYYY..', '.YYYYYY.', '.YYYYYY.', '.YYYYYY.', 'YYYYYYYY', '...KK...']
const BAG = ['..KKKKK..', '.K.....K.', 'BBBBBBBBB', 'BBBBBBBBB', 'BBBWWWBBB', 'BBBBBBBBB', 'BBBBBBBBB', 'BBBBBBBBB', 'BBBBBBBBB', '.BBBBBBB.']
const TOAST = ['..TT..TT..', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSWSSSSWSK', 'KSSSSSSSSK', 'KSSSKKSSSK', 'KSSSSSSSKS', 'KKKKKKKKKK']
const TOAST_C = { T: '#e8a24a', K: INK, S: '#d8dbe8', W: '#2a2350' }
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 114, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 88, Math.sin(a) * 88); x.lineTo(Math.cos(a) * 114, Math.sin(a) * 114); x.stroke() }
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2a2350'; x.beginPath(); x.arc(16, -10, 36, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Hosting everyone, again? | *Let someone else cook.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 8; i++) { if (k < 0.01) break; x.fillStyle = INK; x.fillRect(560 - 80 * k, 1080 - i * 22 - 4, 160 * k, 20); x.fillStyle = '#ffffff'; x.fillRect(564 - 76 * k, 1080 - i * 22, 152 * k, 12) }
      const f = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (f > 0.01) signChar(x, t, 'taurus', 830, 960, 170 * f, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      if (lt > 0.9) drawBits(x, LADLE, { S: '#d8dbe8' }, 920, 900, 14 * f, { rot: 0.3 * Math.sin(t * 6) })
      L(x, 760, 680, 'CHEF: NOT YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Rereading old texts? | *Phone down, tea up.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.1) { drawBits(x, PHONE, PHONE_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)); L(x, 800, 660, 'READ: 9TH TIME', 1, LAV, -0.04, 32) }
      else { drawBits(x, MUG, { W: '#ffffff', B: PINK, T: '#c98f5a' }, 800, 900, 24 * pop01(t, P.t0 + 1.15, 0.3, 2.2)); L(x, 800, 660, 'STEEPING. RELAX.', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32) }
    } },
  { sign: S, cap: 'Parenting the group chat? | *You can mute it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(99, 3 + Math.floor(clamp((lt - 0.2) / 1.0) * 96))
      L(x, 800, 680, `${n} UNREAD`, pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.05, 44, CREAM)
      drawBits(x, BELL, { Y: GOLD, K: INK }, 800, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt < 1.3 ? 0.25 * Math.sin(t * 30) : 0 })
      if (lt > 1.3) { x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; const p = clamp((lt - 1.3) / 0.25); x.beginPath(); x.moveTo(700, 800); x.lineTo(700 + 200 * p, 800 + 200 * p); x.stroke() }
      L(x, 800, 1120, 'MUTED. GUILT-FREE.', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Craving the couch? | *Staying in counts.*', mood: 'sleepy', look: [1, 0], star: ST,
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(F.x, F.cy + 90); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-200, -70, 400, 150); x.fillStyle = '#a35ce0'; x.fillRect(-192, -62, 384, 134); x.fillStyle = '#c97bff'; x.fillRect(-150, -62, 300, 60)
      x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 70); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -20, 340, 110); x.fillStyle = '#ffd6e4'; x.fillRect(-162, -12, 324, 94); x.fillStyle = PINK; for (let i = 0; i < 6; i++) x.fillRect(-150 + i * 56, 10, 28, 28); x.restore() }
      L(x, 800, 760, 'OUT OF OFFICE:', pop01(t, P.t0 + 1.1, 0.3, 2), BONE, -0.04, 30)
      L(x, 800, 860, 'THE SOFA', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 44)
    } },
  { sign: S, cap: 'Remembered every birthday? | *Remember yours too.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.03 }, () => {
        const N = ['MOM', 'DAD', 'NANA', 'BESTIE', 'COWORKER', 'THE DOG', 'ME']
        x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const n = Math.floor(clamp((lt - 0.4) / 0.9) * 6)
        N.forEach((s, i) => {
          const y = -160 + i * 54, done = i < n || (i === 6 && lt > 1.6)
          x.fillStyle = i === 6 ? PINK : INK; x.fillText(s, -70, y)
          x.fillStyle = INK; x.fillRect(-124, y - 16, 32, 32); x.fillStyle = CREAM; x.fillRect(-120, y - 12, 24, 24)
          if (done) { x.fillStyle = i === 6 ? PINK : '#2f9d4a'; x.fillRect(-116, y - 8, 16, 16) }
        })
      })
      if (lt > 1.6) hearts(x, t, 480, 1000, t - lt + 1.6, { n: 5, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Saying yes to everything? | *“No” is a sentence.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ASK = ['can you…?', 'one more…?', 'quick favour?']
      ASK.forEach((a, i) => bubble(x, 800, 620 + i * 110, a, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2) * (lt > 1.2 ? 0.55 : 1), { size: 30, col: LAV, tail: 'br' }))
      const k = pop01(t, P.t0 + 1.3, 0.3, 3)
      if (k > 0.01) label(x, 800, 1040, 'NO. ♡', k, { size: 80, bg: MINT, rot: -0.08, font: INTER, weight: 800 })
    } },
  { sign: S, cap: 'Carrying everyone’s feelings? | *Set the bag down.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 1.0, 1.4)) : ease.outCubic(prog(lt, 1.0, 1.4))
      drawBits(x, BAG, { K: '#8a4a2e', B: '#6b62a8', W: BONE }, lerp(F.x + 170, 830, d), lerp(F.cy - 60, 1020, d), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.2, 0, d) })
      L(x, 830, 660, 'EVERYONE’S STUFF', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.04, 30)
      if (lt > 1.4) L(x, 830, 1180, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Checked your chart? | It says *“nap.”*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1040, 'MOON: IN NAP', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, -0.04, 36)
    } },
  { sign: S, cap: 'Said sorry to the toaster? | *You’re just tired.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 820, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 680, 'sorry, toaster.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 820, 1140, 'BEDTIME: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0398', key: 'C', accent: ACC, solo: 'cancer', ending: 'callback',
  title: 'Signs a Cancer | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Caring for everyone? | *Start with you.*', mood: 'heart' },
  last: {
    text: 'The toaster | *forgives you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'wide', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, TOAST, TOAST_C, 750, 1100, 26 * pop01(t, t0 + 0.6, 0.4, 2), { rot: 0.05 * Math.sin(t * 3) })
      if (lt > 1.0) bubble(x, 760, 880, 'all good ♡', pop01(t, t0 + 1.0, 0.25, 2.4), { size: 42, tail: 'bc' })
      if (lt > 1.4) hearts(x, t, 380, 960, t0 + 1.4, { n: 6, life: 1.6, spread: 200, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
