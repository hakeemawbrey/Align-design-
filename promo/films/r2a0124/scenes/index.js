// r2a0124: ADVICE ROLLCALL, "What each sign | is building now." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific "you're building this" line each, with one light visual gag.
//   0.0–3.6    "What each sign | is building *now.*"
//   3.6–49.2   ♈ a fresh start (again, proudly) · ♉ a cozy home, one plant at a time · ♊ ten ideas (one will fly)
//              · ♋ a soft heart with a little fence · ♌ confidence without applause · ♍ rest (it counts as progress)
//              · ♎ decisions, like a second date · ♏ trust, one fun fact at a time · ♐ a plan (an actual plan)
//              · ♑ an empire with lunch breaks · ♒ their own weird, wonderful people · ♓ a dream, out loud (happy tears)
//  49.2        GROUP ENDING: "Slow build. | *Still building.*"  WORK IN PROGRESS sign over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#7ee08a', ORANGE = '#ffb34a'

// ── props
const FLAG = ['PRRRRRR', 'PRRRRRR', 'PRRRRRR', 'P......', 'P......', 'P......', 'P......', 'P......', 'PP.....']
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', '..G..', 'PPPPP', '.PPP.']
const PLANT_C = { G: '#5fd068', P: '#c96a3a' }
const PLANE = ['W.......', 'WWW.....', 'WWWWW...', 'WWWWWWWW', 'WWWWW...', 'WWW.....', 'W.......']
const FENCE = ['W..W..W..W', 'WWWWWWWWWW', 'W..W..W..W', 'W..W..W..W', 'WWWWWWWWWW', 'W..W..W..W']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const SEAT = ['.RRRR.', 'RRRRRR', 'RRRRRR', 'K....K']
const PACK = ['..BBBB..', '.B....B.', 'BBBBBBBB', 'BGGGGGGB', 'BBBBBBBB', 'BBBBBBBB', 'BBBYYBBB', 'BBBBBBBB']
const CLOUD = ['...WWWW.....', '..WWWWWWW...', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const CASTLE = ['P.P...P.P', 'PPP...PPP', 'PPPP.PPPP', 'PPPPPPPPP', 'PPPPDPPPP', 'PPPPDPPPP']

function bar(x, cx, cy, w, k, fillK, col, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -34, w + 16, 68)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -26, w, 52)
  x.fillStyle = col; x.fillRect(-w / 2, -26, w * fillK, 52)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
// a profile card that reveals one fun fact
function factCard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -150, 300, 310)
  x.fillStyle = INK; x.fillRect(-156, -164, 312, 322)
  x.fillStyle = '#2a2350'; x.fillRect(-148, -156, 296, 306)
  x.fillStyle = '#c97bff'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏︎ SCORPIO', 0, -118)
  x.fillStyle = '#140c30'; x.fillRect(-124, -90, 248, 200)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`
  x.fillText('fun facts:', 0, -56)
  const rows = lt > 1.2 ? ['likes: dogs ✓', '█████', '█████'] : ['█████', '█████', '█████']
  rows.forEach((r, i) => { x.fillStyle = i === 0 && lt > 1.2 ? GREEN : '#6b62a8'; x.fillText(r, 0, -10 + i * 40) })
  x.restore()
}
// a little map with a dotted route that draws itself
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = '#f2e3bd'; x.fillRect(-162, -122, 324, 244)
  x.fillStyle = '#9fd8a0'; x.fillRect(-140, -90, 100, 80); x.fillRect(40, 20, 110, 80)
  x.fillStyle = '#8fd8ff'; x.fillRect(-20, -110, 60, 70)
  const pts = [[-130, 90], [-60, 40], [0, 70], [60, -20], [130, -80]]
  const n = clamp((lt - 0.4) / 1.2) * (pts.length - 1)
  x.fillStyle = RED
  for (let i = 0; i < Math.floor(n); i++) { const [a, b] = pts[i], [c, d] = pts[i + 1]; for (let s = 0; s < 1; s += 0.2) x.fillRect(a + (c - a) * s - 4, b + (d - b) * s - 4, 8, 8) }
  if (n >= pts.length - 1.01) { x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 130, -80) }
  x.restore()
}
// a ring of tiny stars, holding hands
function ring(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const ids = ['gemini', 'libra', 'sagittarius', 'pisces', 'leo', 'cancer']
  ids.forEach((id, i) => { const a = i / 6 * Math.PI * 2 + t * 0.4; signChar(x, t, id, cx + Math.cos(a) * 140 * k, cy + Math.sin(a) * 110 * k, 100 * k, { mood: 'happy', seed: 60 + i, glyph: false, glow: 0.6, tears: id === 'pisces' ? 1 : 0 }) })
}

const CAMEOS = [
  { sign: 'aries', cap: 'A fresh start. | *Again. Proudly.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { P: BONE, R: RED }, 800, 860, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1080, 'ATTEMPT #9 ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A cozy home, | *one plant at a time.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, PLANT, PLANT_C, 660 + (i % 3) * 120, 1000 - Math.floor(i / 3) * 170, 18 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2))
      label(x, 800, 680, 'PLANTS: 5. HOME: YES.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ten ideas. | *One will fly.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const f = i === 3 ? ease.inOutCubic(prog(lt, 1.2, 2.2)) : 0; drawBits(x, PLANE, { W: CREAM }, 700 + (i % 2) * 140 + f * 40, 1040 - Math.floor(i / 2) * 120 - f * 220, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: i === 3 ? -0.4 * f : 0.1 * i }) }
      label(x, 790, 1110, 'THIS ONE ✦', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A soft heart | *with a little fence.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FENCE, { W: CREAM }, 790, 1000, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 640, 'BOUNDARIES ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Confidence that | *doesn’t need applause.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SEAT, { R: '#c4507a', K: INK }, 680 + (i % 3) * 110, 940 + Math.floor(i / 3) * 90, 14 * pop01(t, P.t0 + 0.2 + i * 0.06, 0.3, 2))
      label(x, 790, 760, 'AUDIENCE: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 880, P.t0 + 1.3, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Rest. Yes, | *it counts as progress.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bar(x, 790, 860, 320, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.3) / 1.6), GREEN, 'REST')
      label(x, 790, 1000, 'PROGRESS ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Decisions. Like | *a second date.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'same place? ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: '#ffd6e4' })
      label(x, 790, 940, 'SAID YES ✓', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 44, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 400, 740, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Trust. | *One fun fact at a time.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { factCard(x, 780, 870, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'sagittarius', cap: 'A plan. | An *actual* plan.', mood: lt => lt > 1.6 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'NO DETOURS (MAYBE ONE)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'An empire. | Now *with lunch breaks.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(720, 1040 - (i + 1) * 70, 140, 74); x.fillStyle = '#9aa5c4'; x.fillRect(726, 1046 - (i + 1) * 70, 128, 62); x.fillStyle = GOLD; for (let w = 0; w < 3; w++) x.fillRect(740 + w * 40, 1060 - (i + 1) * 70, 22, 26); x.restore() }
      label(x, 790, 660, 'LUNCH: 12–1 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their people. | *Weird and wonderful.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      ring(x, t, 790, 880, pop01(t, P.t0 + 0.3, 0.4, 2))
      label(x, 790, 1100, 'FOUND THEM ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#5fd0c8', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A dream. | *Out loud, at last.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CLOUD, { W: CREAM }, 790, 920, 26 * k)
      drawBits(x, CASTLE, { P: LAV, D: INK }, 790, 800, 16 * k)
      label(x, 790, 1080, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0124', key: 'E', accent: GOLD, ending: 'group',
  title: 'What each sign | is building *now.*',
  cameos: CAMEOS,
  group: {
    cap: 'Slow build. | *Still building.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'sleepy', 'heart', 'wink', 'sparkle', 'happy', 'heart', 'sparkle'],
    draw(x, t, lt) { label(x, 540, 700, '✦ WORK IN PROGRESS ✦', pop01(t, t - lt + 1.4, 0.35, 2.2), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
