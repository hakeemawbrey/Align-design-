// r2a0568: star_advice, ADVICE SOLO (sagittarius), "How to thank | *a Sagittarius.*" (signs3kit social cut, music: lofi · C).
// Ending: lesson (lesson beat, then the last line).
//   skip the speech, plan an adventure · laugh at the jokes, all of them · be honest, they love it · a postcard from
//   anywhere · a snack for the road · say "tell me more" · ask about their sign, clear your afternoon · make the hug a
//   high five · best thank-you: say yes to the next trip.
//   group "Free spirit. | *Big heart.*"  lesson "Thank them with joy. | *They feel it.*"  last "Pack light. | *Snacks: covered.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'sagittarius', ACC = '#c9a6ff', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

function card(x, cx, cy, w, h, k, rot, fn, face = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
// a folded map with a dotted route drawing itself to a red X
function map(x, cx, cy, k, f) {
  card(x, cx, cy, 380, 300, k, 0.05, x => {
    x.fillStyle = '#d9ecc4'; x.fillRect(-190, -150, 380, 300)
    x.fillStyle = '#9fd3f0'; x.beginPath(); x.ellipse(90, 60, 90, 60, 0.4, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(27,18,54,0.12)'; x.fillRect(-64, -150, 4, 300); x.fillRect(62, -150, 4, 300)
    x.fillStyle = '#8bbf6a'; for (const [a, b] of [[-120, -80], [-40, 70], [140, -90]]) { x.beginPath(); x.moveTo(a - 30, b + 20); x.lineTo(a, b - 24); x.lineTo(a + 30, b + 20); x.fill() }
    const pts = Array.from({ length: 18 }, (_, i) => { const u = i / 17; return [-150 + u * 290, 90 - Math.sin(u * 5) * 60 - u * 120] })
    x.fillStyle = RED; pts.forEach(([px, py], i) => { if (i / 17 <= f) x.fillRect(px - 4, py - 4, 8, 8) })
    if (f > 0.95) { x.fillStyle = RED; x.save(); x.translate(140, -30); x.rotate(0.785); x.fillRect(-22, -5, 44, 10); x.fillRect(-5, -22, 10, 44); x.restore() }
  })
}
const POSTCARD_STAMP = ['GGGGGG', 'GSSSSG', 'GSYSSG', 'GSSSSG', 'GGGGGG']
const PACK = [
  '...BBBBBB...',
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBPPPPPPPPBB',
  'BBPPPPPPPPBB',
  'BBPPPPPPPPBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const PACK_C = { B: '#c97bff', P: '#a35ee0' }
const BAG = ['.KKKK.', 'KYYYYK', 'KYRYYK', 'KYYYRK', 'KYYYYK', 'KKKKKK']
const HAND = [
  '.F.F.F....',
  '.F.F.F.F..',
  '.F.F.F.F..',
  '.FFFFFFF..',
  'FFFFFFFF..',
  '.FFFFFFF..',
  '..FFFFF...',
  '..FFFFF...',
]
function ticket(x, cx, cy, k, rot, text) {
  card(x, cx, cy, 300, 130, k, rot, x => {
    x.fillStyle = ACC; x.fillRect(-150, -65, 70, 130)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('ADMIT 2', 40, -30)
    x.font = `800 32px ${INTER}`; x.fillText(text, 40, 18)
    x.fillStyle = CREAM; for (let i = 0; i < 5; i++) x.fillRect(-84, -56 + i * 26, 8, 12)
  })
}

const ST = { x: -180 }
const CAMEOS = [
  // 1 · plan an adventure
  { sign: S, cap: 'Skip the speech. | *Plan an adventure.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      map(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.4) / 1.0))
      L(x, 790, 1080, 'THANK-YOU TRIP', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  // 2 · laugh at the jokes
  { sign: S, cap: 'Laugh at their jokes. | *All of them.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = 30 + Math.floor(clamp((lt - 0.3) / 1.6) * 12)
      L(x, 790, 660, `JOKE #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), ORANGE, 0.05, 40)
      bubble(x, 790, 850, 'HA! HAHA!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, tail: 'bc', col: '#ffe7a8' })
      L(x, 790, 1060, 'STILL FUNNY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  // 3 · be honest
  { sign: S, cap: 'Keep it honest. | *They’ll love that.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you were great. | truly.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 920, 'FLUFF: 0%', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.05, 36)
      L(x, 790, 1040, 'HEART: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.05, 36)
    } },
  // 4 · a postcard
  { sign: S, cap: 'Send a postcard | *from anywhere.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 380, 260, pop01(t, P.t0 + 0.2, 0.35, 2), -0.05, x => {
        x.fillStyle = INK; x.fillRect(0, -110, 4, 220)
        drawBits(x, POSTCARD_STAMP, { G: RED, S: '#ffd0c8', Y: GOLD }, 140, -80, 10)
        x.fillStyle = '#6b62a8'; x.font = `italic 600 30px Georgia, serif`; x.textAlign = 'left'
        x.fillText('thank you!', -170, -40); x.fillText('wish you', -170, 10); x.fillText('were here', -170, 54)
        x.fillStyle = 'rgba(27,18,54,0.3)'; for (let i = 0; i < 3; i++) x.fillRect(24, -10 + i * 40, 150, 3)
      })
      L(x, 790, 1080, 'FROM: THE CORNER SHOP', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  // 5 · a snack for the road
  { sign: S, cap: 'Give them a snack | *for the road.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k2 = pop01(t, P.t0 + 0.8, 0.3, 2.2)
      drawBits(x, BAG, { K: INK, Y: '#ffd23a', R: '#b5713a' }, 790, 760 + (1 - k2) * -80, 12 * k2, { rot: 0.1 })
      L(x, 790, 1110, 'PACKED: TRAIL MIX', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  // 6 · tell me more
  { sign: S, cap: 'Skip “calm down.” | *Say “tell me more.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'tell me more!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      const m = Math.floor(clamp((lt - 0.6) / 1.4) * 45)
      L(x, 790, 900, `STORY: ${m} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 40)
      L(x, 790, 1050, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.05, 34)
    } },
  // 7 · Align nod: ask about their sign
  { sign: S, cap: 'Ask about their sign. | *Clear your afternoon.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = '#2a2350'; x.fillRect(-165, -190, 330, 380)
        x.fillStyle = ACC; x.font = `700 110px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.fillText('♐︎', 0, -90)
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('SAGITTARIUS', 0, -10)
        x.fillStyle = 'rgba(239,230,214,0.5)'; const n = Math.floor(clamp((lt - 0.4) / 1.4) * 6)
        for (let i = 0; i < n; i++) x.fillRect(-130, 30 + i * 24, 260 - (i % 3) * 40, 10)
      })
      L(x, 790, 1100, 'PART 1 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  // 8 · high five
  { sign: S, cap: 'Thank-you hug? | *Make it a high five.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const meet = ease.outBack ? ease.outBack(prog(lt, 0.5, 1.0)) : ease.outCubic(prog(lt, 0.5, 1.0))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, HAND, { F: '#ffd0a0' }, lerp(620, 740, meet), 830, 14 * k)
      drawBits(x, HAND, { F: '#e0a56a' }, lerp(960, 840, meet), 830, 14 * k, { sx: -1 })
      sparkles(x, t, 790, 830, P.t0 + 1.0 * 1.29, 8, 130, 0.5)
      L(x, 790, 1060, 'HIGH FIVE: LEGENDARY', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, -0.04, 28)
    } },
  // 9 · say yes to the next trip
  { sign: S, cap: 'Best thank-you? | *Say yes to the next trip.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      ticket(x, 790, 790, pop01(t, P.t0 + 0.2, 0.35, 2), -0.06, 'YOU + ME')
      ticket(x, 800, 960, pop01(t, P.t0 + 0.5, 0.35, 2), 0.05, 'ANYWHERE')
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 6, life: 1.8, spread: 240, cell: 7, seed: 5 })
      L(x, 790, 1120, 'BAGS: PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0568', key: 'C', accent: ACC, solo: S,
  title: 'How to thank | *a Sagittarius.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Thank them with joy. | *They feel it.*', chip: 'GRATITUDE: SENT' },
  last: { text: 'Pack light. | *Snacks: covered.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
