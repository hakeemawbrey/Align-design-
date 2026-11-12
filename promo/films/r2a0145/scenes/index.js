// r2a0145: star_advice, ADVICE ROLL CALL, "What each sign | should learn next." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: group.
//   0.0–3.6    "What each sign | *should learn next.*"
//   3.6–49.2   ♈ pottery (slow hands, fast heart) · ♉ baking bread · ♊ a new language (more people to chat with)
//              · ♋ saying no, kindly · ♌ acting class (the stage missed you) · ♍ painting badly on purpose
//              · ♎ picking first, your taste is great · ♏ saying how you feel, out loud · ♐ a new recipe, travel by taste
//              · ♑ how to nap, it counts · ♒ asking for help, geniuses do · ♓ swimming, born for it (happy tears)
//  49.2        "Never too late | *to learn.*"  The twelve fly up into a group photo, caps in the air.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WATER = '#3d8fd8', ORANGE = '#ffb34a'

// ── props
function wheel(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 120); x.fillStyle = '#6b62a8'; x.fillRect(-160, 70, 320, 100)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 60, 150, 30, 0, 0, 7); x.fill(); x.fillStyle = '#9aa5c4'; x.beginPath(); x.ellipse(0, 56, 140, 24, 0, 0, 7); x.fill()
  const h = 80 + 60 * clamp((lt - 0.3) / 1.2), w = 70 + 10 * Math.sin(t * 8)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w - 8, 56); x.quadraticCurveTo(-w - 30, 56 - h / 2, -w * 0.6 - 8, 50 - h); x.lineTo(w * 0.6 + 8, 50 - h); x.quadraticCurveTo(w + 30, 56 - h / 2, w + 8, 56); x.closePath(); x.fill()
  x.fillStyle = '#c96a3a'; x.beginPath(); x.moveTo(-w, 52); x.quadraticCurveTo(-w - 22, 56 - h / 2, -w * 0.6, 56 - h); x.lineTo(w * 0.6, 56 - h); x.quadraticCurveTo(w + 22, 56 - h / 2, w, 52); x.closePath(); x.fill()
  x.fillStyle = '#a8542a'; for (let i = 0; i < 3; i++) x.fillRect(-w * 0.8, 30 - i * h / 3.5 + ((t * 40) % 10), w * 1.6, 5)
  x.restore()
}
const BREAD = ['..BBBBBB..', '.BBbBBbBB.', 'BBBBBBBBBB', 'BbBBbBBbBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const BREAD_C = { B: '#e8a24a', b: '#fff1c8' }
function curtains(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -200, 400, 30)
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(s * 200, -180); x.lineTo(s * 80, -180); x.quadraticCurveTo(s * 120, 40, s * 70, 220); x.lineTo(s * 200, 220); x.closePath(); x.fill()
    x.fillStyle = RED; x.beginPath(); x.moveTo(s * 192, -172); x.lineTo(s * 88, -172); x.quadraticCurveTo(s * 128, 40, s * 80, 212); x.lineTo(s * 192, 212); x.closePath(); x.fill()
  }
  x.fillStyle = 'rgba(255,241,200,0.25)'; x.beginPath(); x.moveTo(-40, -170); x.lineTo(40, -170); x.lineTo(80, 210); x.lineTo(-80, 210); x.closePath(); x.fill()
  x.restore()
}
function canvasArt(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 150, 12, 120); x.fillRect(110, 150, 12, 120)
  x.fillStyle = INK; x.fillRect(-170, -160, 340, 320); x.fillStyle = '#c98f2a'; x.fillRect(-162, -152, 324, 304)
  x.fillStyle = '#fff4e2'; x.fillRect(-146, -136, 292, 272)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 7)
  const SPL = [[-60, -50, 50, '#ff6b5a'], [50, -70, 40, '#6fc3ff'], [0, 40, 60, '#ffd23a'], [-80, 70, 30, '#5fd068'], [80, 60, 45, '#c9a6ff'], [-20, -90, 26, PINK], [60, 0, 20, INK]]
  for (let i = 0; i < n; i++) { const [a, b, r, c] = SPL[i]; x.fillStyle = c; x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); x.fillRect(a - 4, b, 8, r * 1.4) }
  x.restore()
}
function pan(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillRect(-60 + i * 50, -40 - ph * 140, 16, 36) }
  x.globalAlpha = 1
  x.fillStyle = INK; x.fillRect(150, -16, 170, 32); x.fillStyle = '#6b62a8'; x.fillRect(156, -10, 160, 20)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 50, 0, 0, 7); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.ellipse(0, 0, 158, 40, 0, 0, 7); x.fill()
  x.fillStyle = '#ff6b5a'; x.beginPath(); x.arc(-50, -6, 24, 0, 7); x.fill(); x.fillStyle = '#5fd068'; x.beginPath(); x.arc(20, -10, 18, 0, 7); x.fill(); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(70, 0, 20, 0, 7); x.fill()
  x.restore()
}
function bed(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-300, -40, 600, 130); x.fillRect(-300, -140, 40, 260); x.fillRect(260, -80, 40, 200)
  x.fillStyle = '#6b62a8'; x.fillRect(-290, -30, 580, 110)
  x.fillStyle = BONE; x.fillRect(-250, -70, 140, 60)
  x.fillStyle = '#2fc79a'; x.fillRect(-100, -40, 380, 100)
  x.restore()
}
const CAP = ['....K....', '..KKKKK..', 'KKKKKKKKK', '..KKKKK..', '..KKKKKY.', '.......Y.', '.......Y.']

const CAMEOS = [
  { sign: 'aries', cap: 'Pottery. Slow hands, | *fast heart.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wheel(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'PATIENCE: +1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Baking bread. | *Unstoppable.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const rise = 1 + 0.25 * ease.outCubic(prog(lt, 0.4, 1.4))
      drawBits(x, BREAD, BREAD_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: rise })
      label(x, 790, 1110, 'FRESH OUT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) sparkles(x, t, 790, 880, P.t0 + 1.2 * 1.29, 7, 180, 0.4)
    } },
  { sign: 'gemini', cap: 'A new language. | *More people to chat with.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;[['hola!', MINT], ['ciao!', SKYB], ['salut!', PINK], ['hallo!', GOLD]].forEach(([s, c], i) =>
        bubble(x, 740 + (i % 2) * 110, 680 + i * 120, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 38, col: c, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Saying *no.* | Kindly.', mood: lt => lt > 1.0 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'can you help me | move… again?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      bubble(x, 800, 990, 'no, but I love you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: '#8fd3ff', tail: 'bl' })
      if (lt > 1.2) hearts(x, t, 560, 900, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Acting class. | The stage *missed you.*', mood: 'sparkle', star: { x: 0, y: 40, s: 260 }, hops: [1.2],
    back(x, t, lt, P) { curtains(x, t, 540, 880, 1.6 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 620, 'STANDING OVATION', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) sparkles(x, t, 540, 880, P.t0 + 1.2 * 1.29, 8, 220, 0.2)
    } },
  { sign: 'virgo', cap: 'Painting badly. | *On purpose.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      canvasArt(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'MASTERPIECE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking first. | *Your taste is great.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      ;[['PASTA', ORANGE], ['TACOS', MINT], ['SUSHI', SKYB]].forEach(([s, c], i) =>
        label(x, 790, 720 + i * 140, s, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.4) * (lt > 1.0 && i !== 0 ? 0.6 : 1), { size: 36, bg: lt > 1.0 && i !== 0 ? '#6b62a8' : c, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
      label(x, 790, 1150, 'DECIDED: 3 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Saying how you feel. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'TO: MY MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'I really like you.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 800, 980, P.t0 + 1.3 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'A new recipe. | *Travel by taste.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      pan(x, t, 700, 940, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'PASSPORT: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'How to nap. | *It counts.*', mood: lt => lt > 0.8 ? 'sleepy' : 'neutral', star: { x: -120, y: 30, s: 260 },
    back(x, t, lt, P) { bed(x, 540, 1050, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 760, 700, 'PRODUCTIVITY: REST', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asking for help. | *Geniuses do.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'um… help?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: '#6fc3ff', tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 990, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 9, glyph: false })
      bubble(x, 860, 1150, 'of course!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Swimming. | *Born for it.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, look: [1, 0], star: { x: -170, y: -40 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(110, 1050, 860, 170); x.fillStyle = WATER; x.fillRect(118, 1058, 844, 158)
      x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) x.fillRect(150 + ((i * 140 + t * 60) % 780), 1080 + (i % 2) * 50, 50, 6)
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'GOLD STAR ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'happy tears!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0145', key: 'G', accent: GOLD, ending: 'group',
  title: 'What each sign | *should learn next.*',
  cameos: CAMEOS,
  group: {
    cap: 'Never too late | *to learn.*',
    draw(x, t, lt) {
      for (let i = 0; i < 6; i++) {
        const p = prog(lt, 1.1 + i * 0.08, 2.6 + i * 0.08)
        if (p <= 0 || p >= 1) continue
        drawBits(x, CAP, { K: INK, Y: GOLD }, 200 + i * 136, 1000 - Math.sin(Math.PI * p) * 420, 12, { rot: p * 6 + i })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
