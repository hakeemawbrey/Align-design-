// r2a0330: star_advice, ADVICE ROLL CALL, "How each sign | rebuilds trust." (signs3kit social cut, music: lofi · G). Ending: lesson.
// Twelve signs in zodiac order, one warm line each with a light visual gag:
//   ♈ wants it fixed today (trust grows slowly: a seedling) · ♉ slow to trust (one brick a day) · ♊ talks it through
//   (then shows it) · ♋ hurt but caring (the door open a crack) · ♌ pride in the way (sorry is royal) · ♍ the mental list
//   (let some go: balloons) · ♎ rushing to make peace (bridge under repair) · ♏ hard to let back in (small steps)
//   · ♐ fast promises (keep the small ones) · ♑ earning it back (a stamp card) · ♒ pulled away to think (say when you're
//   back) · ♓ forgives too fast (your heart deserves care too)
//   Lesson: "Trust grows back | promise by promise." · Last: "Aries’ seedling | is a tree now." 
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, HEART,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8', BROWN = '#8a4a2e', GREEN = '#5fd068'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a pot with a plant that grows with g (0…1); big = a small tree */
function plant(x, cx, cy, k, g, { big = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-64, -6, 128, 96); x.fillStyle = '#d0703a'; x.fillRect(-56, 0, 112, 84); x.fillStyle = '#e8925a'; x.fillRect(-64, -6, 128, 22)
  const h = (big ? 300 : 120) * g
  x.fillStyle = INK; x.fillRect(-9, -h - 4, 18, h + 4); x.fillStyle = big ? BROWN : GREEN; x.fillRect(-5, -h, 10, h)
  if (big) { x.fillStyle = INK; x.beginPath(); x.arc(0, -h - 40, 128 * g, 0, Math.PI * 2); x.fill(); x.fillStyle = GREEN; x.beginPath(); x.arc(0, -h - 40, 118 * g, 0, Math.PI * 2); x.fill(); x.fillStyle = '#86e08c'; x.beginPath(); x.arc(-34 * g, -h - 74 * g, 40 * g, 0, Math.PI * 2); x.fill() }
  else if (g > 0.3) { const s = clamp((g - 0.3) / 0.7); x.fillStyle = GREEN; x.beginPath(); x.ellipse(-26 * s, -h + 10, 30 * s, 14 * s, -0.5, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(26 * s, -h + 30, 30 * s, 14 * s, 0.5, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const BRICK = ['RRRRRRRR', 'RRRRRRRR', 'KKKKKKKK']
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYBY', 'YYYYYYY']
const BALLOON = ['.PPP.', 'PPPPP', 'PPWPP', 'PPPPP', '.PPP.', '..K..', '..K..', '..K..']
const DOOR = ['KKKKKKKK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBYBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK']
const BANDAGE = ['..TTTTTT..', '.TTWTTWTT.', 'TTTTTTTTTT', '.TTWTTWTT.', '..TTTTTT..']

const CAMEOS = [
  { sign: 'aries', cap: 'Want it fixed today? | Trust *grows slowly.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -170 }, hops: [0.4, 1.5],
    front(x, t, lt, P) {
      plant(x, 800, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), 0.15 + 0.85 * ease.outCubic(clamp((lt - 0.4) / 1.4)))
      L(x, 800, 700, lt < 1.0 ? 'DAY 1' : 'DAY 30', pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.04, 40)
    } },
  { sign: 'taurus', cap: 'Slow to trust again? | *Steady works.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2)
        drawBits(x, BRICK, { R: '#c9604a', K: INK }, 600 + (i % 3) * 120 + (Math.floor(i / 3) % 2) * 60, 1080 - Math.floor(i / 3) * 48, 15 * k)
      }
      L(x, 800, 760, 'ONE BRICK A DAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Talked it through? | Now *show it too.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'i’ll be there.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 850, '…AND SHOWED UP', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 36)
      L(x, 800, 1000, 'WORDS + ACTIONS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Hurt, but still caring? | *Open the door a crack.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      const op = ease.outCubic(clamp((lt - 0.6) / 0.6))
      x.save(); x.fillStyle = '#ffe9a8'; x.globalAlpha = 0.8 * op * k; x.fillRect(760, 670, 160 * op * 0.4 + 6, 340); x.restore()
      drawBits(x, DOOR, { K: INK, B: BROWN, Y: GOLD }, 840, 840, 34 * k, { sx: 1 - 0.35 * op })
    },
    front(x, t, lt, P) { L(x, 800, 1110, 'JUST A LITTLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 32) } },
  { sign: 'leo', cap: 'Pride in the way? | *Sorry is royal too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, F.x, F.top - 30, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 760, 'i’m sorry.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 960, 'STILL A KING', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Keeping a mental list? | *Let some go.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const L3 = ['late, 2019', 'the mug thing', 'that tone']
      L3.forEach((s, i) => {
        const fly = 0.75 * clamp((lt - 0.7 - i * 0.25) / 0.9)
        const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2.2)
        const cx = 800 + (i - 1) * 110, cy = 1000 - fly * 380
        drawBits(x, BALLOON, { P: [PINK, LAV, SKYB][i], W: '#fff', K: INK }, cx, cy - 90, 16 * k * clamp(fly * 4))
        L(x, cx, cy, s, k * (1 - 0.3 * fly), CREAM, (i - 1) * 0.08, 24)
      })
    } },
  { sign: 'libra', cap: 'Rushing to make peace? | *Real talk first.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 920); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -10, 380, 40)
        const n = Math.min(8, Math.floor(lt * 4))
        for (let i = 0; i < 8; i++) { x.fillStyle = i < n ? '#c98f5a' : 'rgba(201,143,90,0.2)'; x.fillRect(-184 + i * 46, -4, 40, 28) }
        x.fillStyle = INK; x.fillRect(-190, 30, 20, 120); x.fillRect(170, 30, 20, 120)
        x.restore()
      }
      L(x, 800, 760, 'BRIDGE: UNDER REPAIR', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Hard to let them back? | *Small steps count.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = Math.min(3, Math.floor(lt * 2))
      for (let i = 0; i < 4; i++) { const k = i <= s ? 1 : 0.25; x.save(); x.globalAlpha = k * pop01(t, P.t0 + 0.15, 0.3, 2); x.fillStyle = INK; x.fillRect(660 + i * 80, 1080 - i * 70, 86, 30); x.fillStyle = LAV; x.fillRect(664 + i * 80, 1084 - i * 70, 78, 22); x.restore() }
      L(x, 800, 700, `STEP ${s + 1} OF MANY`, pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Promise big things? | *Keep the small ones.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const items = ['call back ✓', 'be on time ✓', 'bring snacks ✓']
      items.forEach((s, i) => L(x, 800, 720 + i * 120, s, pop01(t, P.t0 + 0.4 + i * 0.35, 0.3, 2.4), [MINT, GOLD, PINK][i], (i - 1) * -0.04, 32))
      sparkles(x, t, 800, 960, P.t0 + 1.5, 6, 170, 0.2)
    } },
  { sign: 'capricorn', cap: 'Earning it back? | *Show up. Every time.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(300, 860); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -120, 360, 240); x.fillStyle = CREAM; x.fillRect(-172, -112, 344, 224)
        x.fillStyle = TEAL; x.fillRect(-172, -112, 344, 48); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRUST CARD', 0, -88)
        const n = Math.min(8, Math.floor(lt * 4))
        for (let i = 0; i < 8; i++) { const cx = -120 + (i % 4) * 80, cy = -20 + Math.floor(i / 4) * 76; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, 28, 0, Math.PI * 2); x.stroke(); if (i < n) { x.fillStyle = PINK; x.beginPath(); x.arc(cx, cy, 22, 0, Math.PI * 2); x.fill() } }
        x.restore()
      }
      L(x, 300, 1100, 'SHOWED UP: 8/8', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Pulled away to think? | *Say when you’re back.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: SKYB, lines: [
        ['i needed space', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        ['i’m back now', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['welcome back ♡', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
    } },
  { sign: 'pisces', cap: 'Forgive too fast? | *Your heart counts too.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 1, look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 800, 860, 26 * k)
      drawBits(x, BANDAGE, { T: '#ffd9a8', W: '#e0b088' }, 800, 860, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.4), { rot: -0.5 })
      L(x, 800, 1090, 'HEALING. GENTLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0330', key: 'G', accent: '#7dffb0', ending: 'lesson',
  title: 'How each sign | *rebuilds trust.*',
  cameos: CAMEOS,
  group: { cap: 'Different speeds. | *Same direction.*', moods: ['happy', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'happy', 'happy', 'sparkle', 'sparkle', 'happy', 'heart'] },
  lesson: { text: 'Trust grows back, | *promise by promise.*', chip: 'TRUST: GROWING' },
  last: { text: 'Aries’ seedling | *is a tree now.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
