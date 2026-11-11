// v3a001: zodiac.advice444, ADVICE SOLO, "Leo, read this | before your date." (~44 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Leo dating truth with a warm reframe, one gag each.
// Ending: group (the group beat is the punchline; no lesson, no last line).
//   0.0–3.6    "Leo, read this | *before your date.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a red carpet rolls out for a coffee date (JUST SAY HI) · outfit #11, the first one worked
//              · nervous? a pounding heart: CUTE, ACTUALLY · asks a question, the date lights up
//              · the APPLAUSE light switches off: not needed · charts said yes (Leo + Sagittarius), now relax
//              · hands over the menu: THEIR PICK · texts first after: "had fun! again soon?" SENT
//              · laughs too loud, the date laughs louder
//  37.8        "Less show. | *More you.*"  Leo comes back, big, and the film ends there.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ff9a3c'
const S = 'leo'

// ── props
const HEART_BIG = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const SHIRT = ['.CC..CC.', 'CCCCCCCC', 'CCCCCCCC', '.CCCCCC.', '.CCCCCC.', '.CCCCCC.', '.CCCCCC.']
const QMARK = ['.YYYY.', 'YY..YY', '....YY', '...YY.', '..YY..', '..YY..', '......', '..YY..']
// a phone with a sent message
function phone(x, cx, cy, k, lines, sent) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  if (sent > 0.01) {
    x.save(); x.translate(10, -40); x.scale(sent, sent)
    x.fillStyle = ORANGE; x.fillRect(-96, -56, 196, 112)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    lines.forEach((l, i) => x.fillText(l, 2, -18 + i * 38))
    x.restore()
  }
  x.restore()
}
// a theatre "APPLAUSE" light box that switches off
function applause(x, t, cx, cy, k, on) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -60, 380, 120)
  x.fillStyle = on ? RED : '#4a2030'; x.fillRect(-180, -50, 360, 100)
  if (on) { x.shadowColor = RED; x.shadowBlur = 30 }
  x.fillStyle = on ? '#fff4e2' : '#7a5060'; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('APPLAUSE', 0, 4)
  x.restore()
}
// a two-card compatibility read-out (Leo + Sagittarius)
function charts(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = '#140c30'; x.fillRect(-160, -140, 320, 280)
  x.fillStyle = MINT; x.fillRect(-160, -140, 320, 52)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ COMPATIBLE', 0, -113)
  x.restore()
  signChar(x, t, 'leo', cx - 70, cy + 30, 110 * k, { mood: 'happy', seed: 33, glyph: false })
  signChar(x, t, 'sagittarius', cx + 70, cy + 30, 110 * k, { mood: 'happy', seed: 34, glyph: false })
  if (lt > 1.0) hearts(x, t, cx, cy + 140, t - lt + 1.0, { n: 4, life: 1.4, spread: 80, cell: 6, seed: 5 })
}

const CAMEOS = [
  { sign: S, cap: 'Skip the red carpet. | *You’re enough.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -220 },
    back(x, t, lt, P) {
      const roll = ease.outCubic(prog(lt, 0.2, 0.9))
      if (roll <= 0.01) return
      x.fillStyle = INK; x.fillRect(200, 1060, 700 * roll + 10, 70)
      x.fillStyle = RED; x.fillRect(205, 1066, 700 * roll, 58)
      x.fillStyle = '#ff6b78'; x.fillRect(205, 1066, 700 * roll, 8)
      x.fillStyle = INK; x.beginPath(); x.arc(205 + 700 * roll, 1095, 40 * (1 - roll) + 22, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#b52a3a'; x.beginPath(); x.arc(205 + 700 * roll, 1095, 40 * (1 - roll) + 16, 0, Math.PI * 2); x.fill()
    },
    front(x, t, lt, P) {
      label(x, 780, 700, 'IT’S A COFFEE.', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04 })
      label(x, 780, 820, 'JUST SAY HI', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Outfit number eleven? | *The first one worked.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const C = [PINK, SKYB, MINT, GOLD, LAV, RED]
      C.forEach((c, i) => drawBits(x, SHIRT, { C: c }, 690 + (i % 3) * 110, 1080 - Math.floor(i / 3) * 70, 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: (i % 2 ? 0.25 : -0.2) }))
      label(x, 800, 860, 'OUTFIT #11', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 760, 690, '#1 WAS PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Nervous? | *It’s cute on you.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [0, 1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const beat = 1 + 0.18 * Math.max(0, Math.sin(t * 14))
      drawBits(x, HEART_BIG, { H: RED, W: '#fff' }, 790, 860, 30 * beat * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 3; i++) { const ph = ((lt * 1.3 + i / 3) % 1); x.fillStyle = INK; x.fillRect(430 + i * 30, 700 + ph * 90, 16, 22); x.fillStyle = SKYB; x.fillRect(433 + i * 30, 703 + ph * 90, 10, 16) }
      label(x, 790, 1100, 'CUTE, ACTUALLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about them. | *They’re fascinating too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      drawBits(x, QMARK, { Y: GOLD }, 520, 640, 13 * pop01(t, P.t0 + 0.4, 0.3, 2.2), { rot: 0.1 })
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 960, 210 * k, { mood: lt > 1.2 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 25, glyph: false, hops: [P.t0 + 1.5, P.t0 + 1.8] })
      sparkles(x, t, 800, 930, P.t0 + 1.5, 7, 150, 0.3)
      label(x, 800, 1150, 'THEY LIT UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No applause needed. | *Just be there.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, -1], star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      const on = lt < 1.2 || (lt < 1.4 && Math.floor(lt * 20) % 2)
      applause(x, t, 720, 640, pop01(t, P.t0 + 0.2, 0.35, 2), on)
      if (lt > 1.4) { const k = pop01(t, P.t0 + 1.4 * 1.29, 0.35, 2); if (k > 0.01) signChar(x, t, 'sagittarius', 820, 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 26, glyph: false }) }
      bubble(x, 800, 830, 'hi!', pop01(t, P.t0 + 2.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'The charts said yes. | *Now just relax.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      charts(x, t, 780, 820, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1080, 'BREATHE. IT’S FINE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them pick | *the place.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), hand = ease.inOutCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(lerp(560, 780, hand), 860); x.rotate(lerp(-0.2, 0.08, hand)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -170, 240, 340); x.fillStyle = '#7a2e3c'; x.fillRect(-112, -162, 224, 324)
        x.fillStyle = GOLD; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -100)
        x.fillStyle = 'rgba(242,199,92,0.5)'; for (let i = 0; i < 5; i++) x.fillRect(-80, -40 + i * 36, 160 - (i % 2) * 40, 10)
        x.restore()
      }
      label(x, 790, 1120, 'THEIR PICK. NICE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Had fun? | *Text first.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['had fun!', 'again soon?'], pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 780, 1110, 'PRIDE CAN WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laugh loud. | *The right one laughs louder.*', mood: 'happy', star: { x: -200 }, hops: [0.4, 0.7, 1.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 8 + i); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(340, 860, 160 + i * 40, -0.5, 0.5); x.stroke(); x.restore() }
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 27, glyph: false, hops: [P.t0 + 1.3, P.t0 + 1.6, P.t0 + 1.9] })
      bubble(x, 560, 640, 'HAHAHA', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 810, 700, 'HAHAHAHA!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc', col: GOLD })
    } },
]

const F = makeFilm({
  id: 'v3a001', key: 'D', accent: ORANGE, solo: S, ending: 'group',
  title: 'Leo, read this | *before your date.*',
  cameos: CAMEOS,
  group: { cap: 'Less show. | *More you.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
