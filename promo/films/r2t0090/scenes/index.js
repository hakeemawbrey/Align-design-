// r2t0090: star_talk SOLO, "Capricorn bosses | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards), every card the most extreme Capricorn-as-your-boss moment:
//   meeting at 9, they got there at 7 · asked for a raise, got a five-year plan · the holiday party has an agenda
//   · smiled once, the office went silent · out sick, still on the call · found your typo from across the room
//   · team bonding: a quarterly review · your birthday? scheduled, cake at 3:00 · you messed up, they stayed late to help
//  37.8   "Strict. | *Weirdly the best.*"
//  41.0   LESSON: "Tough on the work. | *Soft on you.*"  BOSS: SECRETLY SWEET
//  46.9   "Raise approved. | *Effective 2031.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAPC = '#9aa5c4', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#2fc79a'

function clock(x, cx, cy, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 106, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 88 - 4, Math.sin(a) * 88 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineCap = 'round'
  const ah = (h % 12 + m / 60) / 12 * Math.PI * 2, am = m / 60 * Math.PI * 2
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ah) * 50, -Math.cos(ah) * 50); x.stroke()
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(am) * 80, -Math.cos(am) * 80); x.stroke()
  x.restore()
}
function sheet(x, cx, cy, w, h, k, rot = 0.04) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
const CAKE = ['.....F.....', '.....W.....', 'PPPPPPPPPPP', 'BBBBBBBBBBB', 'BPBPBPBPBPB', 'BBBBBBBBBBB', '.GGGGGGGGG.']
const CAKE_C = { F: '#ffb34a', W: '#fff4e2', P: PINK, B: '#fff4e2', G: GOLD }
const LAMP = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....K....', '....K....', '....K....', '..KKKKK..']

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Meeting at 9. | They got there *at 7.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), 7, 0)
      label(x, 790, 1080, 'EARLY. ALWAYS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked for a raise. | Got *a five-year plan.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 860, 300, 360, pop01(t, P.t0 + 0.2, 0.3, 2))) {
        txt(x, 'THE PLAN', 0, -140, 34)
        for (let i = 0; i < 5; i++) { const on = lt > 0.5 + i * 0.2; txt(x, `YEAR ${i + 1}`, -110, -82 + i * 54, 24, '#6b62a8', MONO, 700, 'left'); x.fillStyle = on ? GREEN : '#d8d0c0'; x.fillRect(10, -96 + i * 54, 30 + i * 20, 28) }
        txt(x, '→ raise', 60, 160, 26, RED)
        x.restore()
      }
    } },
  { sign: S, cap: 'Holiday party? | *Has an agenda.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 860, 310, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04)) {
        txt(x, 'PARTY AGENDA', 0, -126, 30)
        const L = ['6:00 arrive', '6:05 mingle', '6:20 fun', '6:25 recap']
        L.forEach((s, i) => txt(x, s, -120, -66 + i * 50, 26, i === 2 ? RED : '#2a2350', MONO, 700, 'left'))
        x.restore()
      }
      label(x, 790, 1100, 'FUN: 5 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Smiled once. | *Office went silent.*', mood: lt => lt > 0.9 ? 'happy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      for (let i = 0; i < 2; i++) if (k > 0.01) signChar(x, t, ['gemini', 'libra'][i], 730 + i * 150, 1010, 150 * k, { mood: 'wide', look: [-1, 0], seed: 30 + i, glyph: false })
      label(x, 790, 700, 'SIGHTING CONFIRMED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Out sick. | *Still on the call.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        // a cosy blanket tucked up to the chin, a phone held up to the ear
        x.save(); x.translate(F.x, F.cy + 90); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -50, 340, 120); x.fillStyle = LAV; x.fillRect(-162, -42, 324, 104)
        x.fillStyle = 'rgba(255,255,255,0.3)'; for (let j = 0; j < 5; j++) x.fillRect(-140 + j * 64, -30, 26, 80)
        x.restore()
      }
      bubble(x, 790, 760, 'quick update—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1060, 'MUTED: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Found your typo | *from across the room.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (sheet(x, 870, 900, 200, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0.06)) {
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 8; i++) x.fillRect(-76, -100 + i * 26, 140 - (i % 3) * 20, 10)
        if (lt > 0.8) { x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.ellipse(-20, -22, 50, 18, 0, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      if (lt > 0.6) { x.save(); x.globalAlpha = clamp((lt - 0.6) * 3); x.strokeStyle = RED; x.setLineDash([16, 12]); x.lineWidth = 6; x.beginPath(); x.moveTo(470, 860); x.lineTo(840, 875); x.stroke(); x.restore() }
      label(x, 760, 650, 'PAGE 4, LINE 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Team bonding? | *A quarterly review.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 284)
        const H = [80, 130, 110, 190]
        for (let i = 0; i < 4; i++) { const h = H[i] * ease.outCubic(prog(lt, 0.4 + i * 0.15, 0.9 + i * 0.15)); x.fillStyle = INK; x.fillRect(-114 + i * 62, 100 - h - 4, 48, h + 4); x.fillStyle = [CAPC, SKYB, GREEN, GOLD][i]; x.fillRect(-110 + i * 62, 100 - h, 40, h) }
        x.restore()
      }
      label(x, 790, 650, 'TRUST FALL: Q3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your birthday? | *Scheduled. Cake at 3.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 800, 760, 0.6 * pop01(t, P.t0 + 0.15, 0.3, 2), 3, 0)
      drawBits(x, CAKE, CAKE_C, 800, 1010, 18 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      sparkles(x, t, 800, 1000, P.t0 + 1.0, 6, 130, 0.4)
      label(x, 600, 1140, 'ON TIME, OBVIOUSLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You messed up. | They *stayed late to help.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 760, 1000, 180 * k, { mood: lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], seed: 33, glyph: false, tears: lt > 1.2 ? 1 : 2 })
      drawBits(x, LAMP, { Y: GOLD, K: INK }, 900, 820, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 760, 650, '9 PM. STILL HERE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0090', key: 'F', accent: GREEN, solo: 'capricorn', ending: 'lesson',
  title: 'Capricorn bosses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict. | *Weirdly the best.*', mood: 'happy' },
  lesson: { text: 'Tough on the work. | *Soft on you.*', chip: 'BOSS: SECRETLY SWEET' },
  last: {
    text: 'Raise approved. | *Effective 2031.*',
    draw(x, t, lt) { label(x, 540, 1240, 'YEAR 1 OF 5', pop01(t, t - lt + 0.9, 0.3, 2.4), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
