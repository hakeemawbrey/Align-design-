// r2t0373: star_talk, BE LIKE, "Zodiacs on coffee | *be like.*" (topic: when the coffee kicks in; signs3kit social cut, music: lofi · G). Ending: callback.
//   ♈ did the whole week by 9 a.m. · ♉ still not moving, but happier · ♊ replied to every match in one minute
//   · ♋ made coffee for the whole street · ♌ their name on the cup, in gold · ♍ cleaned the office, and the vents
//   · ♎ picked a lunch spot, un-picked it · ♏ ran their match's full birth chart · ♐ learned guitar, quit by noon
//   · ♑ cup one: plan, cup two: empire · ♒ invented a gadget, it makes coffee · ♓ the latte art was a heart, sobbing
//   Callback: Aries at 9:05, "…now what?"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#e0a060', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

const MUG = ['.S..S....', '..S..S...', '.S..S....', 'KKKKKKK..', 'KMMMMMKKK', 'KMWMMMK.K', 'KMMMMMK.K', 'KMMMMMKKK', 'KMMMMMK..', '.KKKKK...']
const mug = (x, cx, cy, cell, col, k = 1, rot = 0) => drawBits(x, MUG, { K: INK, M: col, W: CREAM, S: 'rgba(255,255,255,0.55)' }, cx, cy, cell * k, { rot })
const CUP = ['.KKKKKKKKK.', 'KWWWWWWWWWK', '.KCCCCCCCK.', '.KCCCCCCCK.', '.KCCCCCCCK.', '..KCCCCCK..', '..KCCCCCK..', '...KKKKK...']
const GUITAR = ['........KK', '.......KK.', '......KK..', '.....KK...', '..OOKK....', '.OOOOO....', 'OOOWOOO...', 'OOOOOOO...', '.OOOOO....', '..OOO.....']
const VENT = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']
const GEAR = ['..G.G.G..', '.GGGGGGG.', 'GGGGGGGGG', '.GGG.GGG.', 'GGG...GGG', '.GGG.GGG.', 'GGGGGGGGG', '.GGGGGGG.', '..G.G.G..']
const CLOCK = ['..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']

/** a pixel phone with a header bar and rows: [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.18, k * 1.18)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.6)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = MINT, toBg = '#9aa5c4' } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  L(x, cx, cy, from, 1, fromBg, -0.04, size)
  x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
  if (p >= 1) L(x, cx, cy + 100, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a little zoom line burst (the caffeine) */
function zoom(x, t, cx, cy, n = 6, col = CREAM) {
  x.save(); x.fillStyle = col; x.globalAlpha = 0.7
  for (let i = 0; i < n; i++) { const ph = ((t * 2.2 + i / n) % 1 + 1) % 1; x.fillRect(cx - 60 - ph * 120, cy - 60 + i * 22, 50, 6) }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Did the whole week | *by 9 a.m.*', mood: 'wide', star: { x: -150 }, hops: [0.3, 0.6, 0.9, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      zoom(x, t, F.x - 40, F.cy - 20)
      const DAYS = ['MON ✓', 'TUE ✓', 'WED ✓', 'THU ✓', 'FRI ✓']
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.28) + 1)
      for (let i = 0; i < n; i++) L(x, 790, 600 + i * 92, DAYS[i], pop01(lt, 0.2 + i * 0.28, 0.25, 2.2), [MINT, GOLD, PINK, SKYB, LAV][i], i % 2 ? 0.04 : -0.04, 40)
      L(x, 790, 1110, '8:59 A.M.', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, -0.05, 34, CREAM)
    } },
  { sign: 'taurus', cap: 'Still not moving. | *But happier.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      mug(x, F.x + 150, F.cy + 60, 16, ACC, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'SPEED: SAME', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 800, 'MOOD: GREAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, F.x, F.cy - 80, P.t0 + 1.1, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Replied to every match. | *In one minute.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      zoom(x, t, F.x - 40, F.cy - 20)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCHES', headCol: GOLD, lines: [
        ['hiii!!', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2), true],
        ['omg hiii!!', BONE, pop01(t, P.t0 + 0.6, 0.2, 2.2), true],
        ['HELLO!!!', BONE, pop01(t, P.t0 + 0.8, 0.2, 2.2), true],
      ] })
      L(x, 790, 1150, 'SENT: 23 IN 0:58', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'Made coffee | *for the whole street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.2) / 0.15) + 1)
      for (let i = 0; i < n; i++) mug(x, 660 + (i % 3) * 130, 1030 - Math.floor(i / 3) * 150, 10, [ACC, PINK, SKYB, MINT, GOLD, LAV][i % 6], pop01(lt, 0.2 + i * 0.15, 0.2, 2))
      L(x, 790, 610, 'NEIGHBOURS: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Their name on the cup? | *In gold.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, CUP, { K: INK, W: CREAM, C: '#fff' }, 790, 880, 30 * k)
      if (k > 0.6) { x.save(); x.globalAlpha = clamp((k - 0.6) * 2.5); x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('LEO', 793, 913); x.fillStyle = GOLD; x.fillText('LEO', 790, 910); x.restore() }
      sparkles(x, t, 790, 880, P.t0 + 1.1, 8, 200, 0.3)
      bubble(x, 560, 610, 'spelled | right!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Cleaned the office. | *And the vents.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VENT, { K: INK, S: '#cfd6ea' }, 790, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 720, P.t0 + 1.0, 8, 170, 0.6, [CREAM, SKYB, MINT])
      L(x, 790, 900, 'VENTS: SPOTLESS', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 32)
      L(x, 790, 990, 'IT’S 9:40', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Picked a lunch spot! | *Un-picked it.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) { if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 780, lt, 1.1, 'LUNCH: NOODLES!', 'LUNCH: ???', { size: 34 }) } },
  { sign: 'scorpio', cap: 'Ran their match’s | *full birth chart.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1000, 'MATCH: MOON IN ?', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, -0.04, 30)
      L(x, 790, 1090, 'NOTES: 9 PAGES', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c97bff', 0.04, 30, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Learned the guitar. | *Quit by noon.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: ST, hops: [0.5],
    front(x, t, lt, P, F) {
      const quit = ease.inOutCubic(prog(lt, 1.3, 1.8))
      drawBits(x, GUITAR, { K: BROWN, O: '#ff9a4a', W: INK }, lerp(F.x + 140, 860, quit), lerp(F.cy + 20, 1100, quit), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.2, 1.4, quit) })
      L(x, 800, 640, quit > 0.5 ? 'NEXT: POTTERY' : 'ROCK STAR', pop01(t, P.t0 + (quit > 0.5 ? 1.6 : 0.5), 0.3, 2.4), quit > 0.5 ? MINT : GOLD, 0.05, 36)
    } },
  { sign: 'capricorn', cap: 'Cup one: plan. | Cup two: *empire.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, 700, 980, 14, ACC, pop01(t, P.t0 + 0.2, 0.3, 2))
      mug(x, 880, 980, 14, '#2fc79a', pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 700, 820, 'PLAN', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.05, 34)
      L(x, 880, 700, 'EMPIRE', pop01(t, P.t0 + 1.2, 0.3, 2.6), GOLD, 0.05, 44)
    } },
  { sign: 'aquarius', cap: 'Invented a gadget. | It *makes coffee.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -120, 280, 240); x.fillStyle = '#6fc3ff'; x.fillRect(-130, -110, 260, 220)
        x.fillStyle = INK; x.fillRect(-20, 110, 40, 40)
        x.restore()
        drawBits(x, GEAR, { G: GOLD }, 730, 780, 9, { rot: t * 2 })
        drawBits(x, GEAR, { G: PINK }, 850, 840, 9, { rot: -t * 2 })
      }
      if (lt > 1.1) mug(x, 790, 1040, 12, ACC, pop01(t, P.t0 + 1.1, 0.3, 2.4))
      L(x, 790, 620, 'PATENT PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'The latte art | was a heart. *Sobbing.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 110, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, 158, 98, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = BROWN; x.beginPath(); x.ellipse(0, -6, 130, 74, 0, 0, Math.PI * 2); x.fill()
        x.restore()
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: CREAM }, 790, 874, 12 * k, { outline: null })
      }
      L(x, 790, 640, 'IT LOVES ME', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0373', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs on coffee | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero chill.*' },
  last: {
    text: 'Aries, 9:05 a.m.: | *“…now what?”*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1060, 300 * k, { mood: lt > 1.2 ? 'neutral' : 'wide', look: [1, -1], seed: 9, hops: [t0 + 0.6, t0 + 0.9] })
      drawBits(x, CLOCK, { K: INK, W: CREAM }, 780, 900, 16 * pop01(t, t0 + 0.6, 0.35, 2))
      L(x, 780, 1080, 'WEEK: DONE', pop01(t, t0 + 1.0, 0.3, 2.4), MINT, 0.04, 34)
      if (lt > 1.6) bubble(x, 780, 1220, 'bored.', pop01(t, t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
