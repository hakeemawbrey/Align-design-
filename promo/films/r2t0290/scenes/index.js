// r2t0290: star_talk, ROLLCALL, "The signs | *on ice.*" (topic: the signs ice skating) (~62 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself at the ice rink. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ fastest on the rink, no brakes · ♉ one lap, then the hot chocolate stand · ♊ skating backwards, texting a match
//              · ♋ holding the wall and your hand · ♌ one spin, bowed for ten minutes · ♍ judged everyone's form (6.1)
//              · ♎ couples skate? already matched · ♏ one silent perfect figure eight · ♐ fell twelve times, laughed thirteen
//              · ♑ secretly took lessons first · ♒ skating to music only they can hear · ♓ cried at how pretty the snow was
//  49.2        "Nobody stayed | *upright.*"
//  52.4        LESSON: "Fall, laugh, | *go again.*"  BALANCE: FOUND
//  58.3        "Cocoa run? | *Taurus: twelve.*" (card 2, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ICE = '#bfe9ff', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#c98f5a'

// ── props
/** the ice under every star: a pale glossy ellipse with a couple of skate scratches */
function ice(x, t, P) {
  x.save(); x.globalAlpha = 0.85 * clamp(P.k)
  x.fillStyle = 'rgba(191,233,255,0.28)'; x.beginPath(); x.ellipse(540, 1150, 400, 70, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 3
  x.beginPath(); x.ellipse(500, 1150, 260, 34, 0.02, 0.2, 2.6); x.stroke()
  x.beginPath(); x.ellipse(600, 1158, 180, 24, -0.03, 3.4, 5.8); x.stroke()
  x.restore()
}
const MUG = ['.KKKKK...', 'KWWWWWK..', 'KCCCCCKKK', 'KCCCCCK.K', 'KCCCCCK.K', 'KCCCCCKKK', 'KCCCCCK..', '.KKKKK...']
const MUG_C = { W: '#fff8ea', K: '#e9dcc6', C: '#a8652e' }
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
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
/** a judge's score card on a stick */
function scoreCard(x, cx, cy, k, txt, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 50, 16, 110); x.fillStyle = BROWN; x.fillRect(-4, 54, 8, 104)
  x.fillStyle = INK; x.fillRect(-80, -70, 160, 130); x.fillStyle = '#fff8ea'; x.fillRect(-72, -62, 144, 114)
  x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -4)
  x.restore()
}
/** a figure eight traced on the ice */
function eight(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const p = clamp((lt - 0.3) / 1.3)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 8; x.lineCap = 'round'
  x.beginPath()
  const N = 80
  for (let i = 0; i <= N * p; i++) { const a = (i / N) * Math.PI * 2; const px = Math.sin(a) * 120, py = Math.sin(a) * Math.cos(a) * 160; i ? x.lineTo(py, px) : x.moveTo(py, px) }
  x.stroke()
  x.restore()
}
/** a framed certificate */
function certificate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -112, 316, 240)
  x.fillStyle = INK; x.fillRect(-166, -126, 332, 252); x.fillStyle = GOLD; x.fillRect(-158, -118, 316, 236)
  x.fillStyle = '#fff8ea'; x.fillRect(-140, -100, 280, 200)
  x.fillStyle = INK; x.font = `italic 600 36px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Certificate', 0, -56)
  x.font = `700 26px ${MONO}`; x.fillText('SKATING · LEVEL 4', 0, -6)
  x.fillStyle = RED; x.beginPath(); x.arc(80, 56, 28, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9bfae'; x.fillRect(-110, 50, 130, 6)
  x.restore()
}
function snow(x, t, cx, cy, w, h, n = 18) {
  x.save(); x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) { const ph = ((t * 0.25 + i * 0.137) % 1 + 1) % 1, px = cx - w / 2 + ((i * 97) % w) + Math.sin(t * 2 + i) * 10, py = cy - h / 2 + ph * h; x.fillRect(px, py, 12, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fastest on the rink. | *No brakes.*', mood: 'wide', star: { x: -150 }, hops: [0.5, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0], back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      x.save(); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 8; x.lineCap = 'round'
      for (let i = 0; i < 5; i++) { const y = 800 + i * 40, o = ((lt * 600 + i * 90) % 200); x.beginPath(); x.moveTo(560 + o, y); x.lineTo(660 + o, y); x.stroke() }
      x.restore()
      label(x, 790, 680, 'SPEED: YES · BRAKES: NO', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 28, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1000, 'MOVE!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 52, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Skated one lap. | Then *hot chocolate.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 800, 900, 26 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 680, 'LAPS: 1 · MUGS: 3', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Skating backwards. | *Texting a match.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'IT’S A MATCH', headCol: PINK, lines: [
        ['guess where', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['i am rn', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2), true],
        ['BACKWARDS!!', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2.2), true],
      ] })
    } },
  { sign: 'cancer', cap: 'Holding the wall. | *And your hand.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(150, 990, 780, 30); x.fillStyle = '#c9d3e8'; x.fillRect(156, 996, 768, 18)
      for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(190 + i * 140, 1014, 16, 110) } x.restore()
      label(x, 790, 700, 'GRIP: MAXIMUM', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 400, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Did one spin. | *Bowed for ten minutes.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.4], back: (x, t, lt, P) => ice(x, t, P),
    squash: lt => lt > 1.0 ? 0.08 * Math.sin(lt * 6) : 0,
    front(x, t, lt, P) {
      label(x, 790, 720, 'APPLAUSE: SELF', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'thank you, | thank you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 390, 880, P.t0 + 0.6, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Judged everyone’s form. | *Average: 6.1.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      scoreCard(x, 680, 850, pop01(t, P.t0 + 0.3, 0.3, 2), '6.1', -0.08)
      scoreCard(x, 880, 820, pop01(t, P.t0 + 0.7, 0.3, 2), '5.9', 0.08)
      label(x, 790, 640, 'FORM: CONCERNING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couples skate? | *Already matched.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      label(x, 790, 720, '♥ COUPLES SKATE ♥', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'it’s a match | on ice.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      hearts(x, t, 400, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'One perfect figure eight. | *Didn’t explain.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      eight(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1120, 'SCORE: 10.0 (SILENT)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#c97bff', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Fell twelve times. | Laughed *thirteen.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'happy' : 'wide', star: { x: -150 }, hops: [0.5, 1.0, 1.5], back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.12))
      label(x, 790, 760, `FALLS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'HAHAHA', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Secretly took lessons | *first.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      certificate(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 760, 650, 'beginner’s luck.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Skating to music | *only they can hear.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.2, 1.8], back: (x, t, lt, P) => ice(x, t, P),
    front(x, t, lt, P) {
      notes(x, t, 420, 760, { n: 6, cell: 8, col: SKYB, alpha: clamp((lt - 0.3) / 0.3) })
      label(x, 790, 860, 'SONG: UNKNOWN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 680, 'you hear it?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at how pretty | *the snow was.*', mood: 'heart', tears: lt => lt > 0.6 ? 3 : 2, star: { x: -150 }, back: (x, t, lt, P) => ice(x, t, P),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = clamp(lt / 0.4); snow(x, t, 540, 850, 860, 740, 26); x.restore()
      label(x, 790, 1100, 'IT’S SO PRETTY', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0290', key: 'F', accent: ICE, ending: 'lesson',
  title: 'The signs | *on ice.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody stayed | *upright.*' },
  lesson: { text: 'Fall, laugh, | *go again.*', chip: 'BALANCE: FOUND' },
  last: {
    text: 'Cocoa run? | *Taurus: twelve.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 6; i++) drawBits(x, MUG, MUG_C, 240 + i * 120, 1500 - (i % 2) * 30, 14 * pop01(t, t0 + 0.6 + i * 0.1, 0.3, 2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
