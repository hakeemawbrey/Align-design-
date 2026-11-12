// r2a0175: star_advice, ADVICE ROLL CALL, "How signs handle | *a crowded room.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: lesson.
//   0.0–3.6    "How signs handle | *a crowded room.*"
//   3.6–49.2   ♈ says hi to everyone first · ♉ finds the snack table (a home base) · ♊ remembers every name (name tags)
//              · ♋ finds the one person alone · ♌ lights up the middle (share the glow) · ♍ helps the host (enjoy it too)
//              · ♎ introduces everyone (match made) · ♏ one deep talk in the corner · ♐ ends up dancing
//              · ♑ leaves at a good time · ♒ hangs out with the dog · ♓ cries at the slideshow
//  49.2        "Every way is | *the right way.*"
//  52.4        LESSON: "Big room or small, | *you belong.*"  STATUS: WELCOME
//  58.3        "Find your corner. | *Find your people.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
function plate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 200, 64, 0, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 34, 188, 54, 0, 0, 7); x.fill()
  const items = [[-100, 10, GOLD], [-40, -6, PINK], [24, 8, '#e8a84a'], [86, -4, MINT], [-70, 44, '#c98f5a'], [0, 40, LAV], [70, 40, RED]]
  for (const [a, b, col] of items) { x.fillStyle = INK; x.fillRect(a - 26, b - 20, 52, 40); x.fillStyle = col; x.fillRect(a - 20, b - 14, 40, 28) }
  x.restore()
}
function nameTag(x, cx, cy, k, name, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -70, 240, 140); x.fillStyle = RED; x.fillRect(-114, -64, 228, 50); x.fillStyle = '#fff8ea'; x.fillRect(-114, -14, 228, 78)
  x.fillStyle = '#fff4e2'; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO my name is', 0, -39)
  x.fillStyle = INK; x.font = `italic 700 38px Georgia, serif`; x.fillText(name, 0, 26)
  x.restore()
}
function tray(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, 30, 360, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-174, 34, 348, 20)
  for (let i = 0; i < 4; i++) { const px = -120 + i * 80; x.fillStyle = INK; x.fillRect(px - 28, -60, 56, 92); x.fillStyle = ['#ffd23a', '#ff8fb1', '#7dffb0', '#8fe3ff'][i]; x.fillRect(px - 22, -40, 44, 66); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(px - 22, -54, 44, 14) }
  x.restore()
}
function chairs(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 110, 0); x.scale(s, 1)
    x.fillStyle = BONE; x.fillRect(-70, -150, 30, 260); x.fillRect(-70, 0, 140, 30); x.fillRect(40, 0, 20, 110); x.fillRect(-70, 0, 20, 110)
    x.fillStyle = '#7d5ad8'; x.fillRect(-64, -144, 18, 140); x.fillRect(-64, 6, 128, 18)
    x.restore()
  }
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 70, 70, 20, 0, 0, 7); x.fill(); x.fillRect(-8, 70, 16, 60)
  x.restore()
}
const COAT = ['...KK...', '..K..K..', '.KCCCCK.', 'KCCCLCCCK', 'KCCWLCCCK', 'KKCCLCCKK', '.KCWLCCK.', '.KCCLCCK.', '.KCCLCCK.', '.KKKKKKK.']
function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill()
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillRect(-w / 2, -len, w, len); x.restore() }
  x.fillStyle = INK; hand((h % 12 + m / 60) / 12 * Math.PI * 2, 42, 12); hand(m / 60 * Math.PI * 2, 64, 8)
  x.restore()
}
const DOG = ['KK......KK', 'KBK....KBK', 'KBBKKKKBBK', 'KBBBBBBBBK', 'KBWKBBKWBK', 'KBBBBBBBBK', '.KBBNNBBK.', '..KBBBBK..', '...KKKK...']
function screen(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -140, 380, 250); x.fillStyle = '#fff8ea'; x.fillRect(-180, -130, 360, 230)
  x.fillStyle = '#ffd0dc'; x.fillRect(-160, -110, 320, 190)
  signChar(x, t, 'cancer', -60, -10, 120, { mood: 'heart', seed: 51, glyph: false, glow: 0.4 })
  signChar(x, t, 'leo', 60, -10, 120, { mood: 'heart', seed: 52, glyph: false, glow: 0.4 })
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('best friends since 2nd grade', 0, 62)
  x.fillStyle = INK; x.fillRect(-10, 110, 20, 60); x.fillRect(-80, 166, 160, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Says hi to everyone first. | *Brave and kind.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 700 + i * 90, 700 + i * 150, 'hi!', pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 44, tail: 'bl', col: [BONE, GOLD, PINK][i] })
      label(x, 790, 1140, 'NEW FRIENDS: MANY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Finds the snack table. | A *home base* helps.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      plate(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'SAFE SPOT ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talks to ten people. | *Remembers every name.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      ;['Sam', 'Jo', 'Priya', 'Lee'].forEach((n, i) => nameTag(x, 760 + (i % 2) * 70, 700 + i * 120, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2) * 0.85, n, (i % 2 ? 0.08 : -0.08)))
    } },
  { sign: 'cancer', cap: 'Finds the one person alone. | *What a gift.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 930, 190 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.7] })
      bubble(x, 760, 680, 'want to sit with us?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Lights up the middle. | *Share the glow.*', mood: 'sparkle', look: [1, 0], star: { x: 0 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = clamp(pop01(t, P.t0 + 0.2, 0.5, 1.4))
      const g = x.createRadialGradient(540, 880, 60, 540, 880, 420); g.addColorStop(0, `rgba(255,220,140,${0.45 * k})`); g.addColorStop(1, 'rgba(255,220,140,0)')
      x.fillStyle = g; x.fillRect(100, 470, 880, 760)
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.9 + i * 0.2, 0.35, 2); if (k > 0.01) signChar(x, t, ['aries', 'virgo', 'libra', 'aquarius'][i], [250, 830, 260, 820][i], [700, 700, 1080, 1080][i], 120 * k, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.8 }) }
    } },
  { sign: 'virgo', cap: 'Helps the host. | *Enjoy it too.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      tray(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1090, 'OFF DUTY: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Introduces everyone. | *Natural connector.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'you two would get on!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 700, 950, 140 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 33, glyph: false }); signChar(x, t, 'scorpio', 880, 950, 140 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 34, glyph: false }) }
      label(x, 790, 1130, 'FRIENDSHIP: MATCHED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Finds one deep talk. | *Quality over quantity.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      chairs(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9)
      label(x, 790, 650, 'ONE REAL CHAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Ends up dancing. | *Joy is contagious.*', mood: 'sparkle', look: [1, 0], star: { x: -190, y: -20 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      notes(x, t, 760, 760, { n: 5, cell: 9, col: GOLD, seed: 5 })
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.8 + i * 0.25, 0.35, 2); if (k > 0.01) signChar(x, t, ['gemini', 'leo', 'aries'][i], 660 + i * 130, 980, 110 * k, { mood: 'sparkle', seed: 40 + i, glyph: false, glow: 0.7, hops: [P.t0 + 1.4 + i * 0.1, P.t0 + 1.9 + i * 0.1] }) }
      label(x, 790, 1140, 'DANCE FLOOR: OPEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Leaves at a good time. | *Rest is wise.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, COAT, { K: INK, C: '#c98f5a', L: '#8a5a3a', W: GOLD }, 720, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      clock(x, 880, 760, pop01(t, P.t0 + 0.5, 0.35, 2), 10, 0)
      label(x, 800, 1120, 'HOME BY 10 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Hangs out with the dog. | *Recharging counts.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, DOG, { K: INK, B: '#c98f5a', W: '#fff', N: '#2a2350' }, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 4) * 0.05 })
      label(x, 800, 660, 'BEST GUEST HERE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: 'pisces', cap: 'Cries at the slideshow. | *Soft hearts are strong.*', mood: 'happy', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 790, 1120, 'SO SWEET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0175', key: 'G', accent: LAV, ending: 'lesson',
  title: 'How signs handle | *a crowded room.*',
  cameos: CAMEOS,
  group: { cap: 'Every way is | *the right way.*' },
  lesson: { text: 'Big room or small, | *you belong.*', chip: 'STATUS: WELCOME' },
  last: { text: 'Find your corner. | *Find your people.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
