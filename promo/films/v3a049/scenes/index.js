// v3a049: star_advice, ADVICE SOLO, "Virgo, read this | before the date." (~45 s vertical, signs3kit social cut, music: lofi · G)
// (topic: "Virgo, read this | before your next date."; shortened so the accent fits on one line)
// One sign the whole way through (solo mode, 9 cards): gentle pre-date advice for a Virgo, one gag each.
// Ending: 'callback' (no lesson): the typo from card 1 comes back, and this time it's simply cute.
//   0.0–3.6    "Virgo, read this | *before the date.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              "your so cute" circled in red pen: IT'S CUTE. LET IT GO. · three backup outfits fade to one: CHOSEN
//              · the spray bottle: TABLE: ALREADY CLEAN · QUESTION 14 / 30: a date, not an interview
//              · map pins everywhere: REVIEWS READ: ALL · peas lined up in a grid: CUTE, ACTUALLY
//              · a sauce drop on the shirt: STAIN: IGNORED · dancing: FUN, UNPLANNED · DRAFT 9 → draft 1: SENT
//  37.8        "Picky? | *Worth it.*"  Virgo comes back, big.
//  41.2        "They texted first: | *“your so cute.”*"  The phone comes back, the typo, a heart.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', SAGE = '#9fe0a0', VPINK = '#ff7fae'
const S = 'virgo'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// the phone with their message (card 1 and the callback). circ: red-pen circle 0…1, heart: 0…1
function phone(x, cx, cy, k, circ, heart, rot = 0.04) {
  if (!slab(x, cx, cy, 280, 400, k, { bg: '#2a2350', inner: '#140c30', rot })) return
  x.fillStyle = LAV; x.fillRect(-116, -120, 232, 80); txt(x, 'your so cute', 0, -80, 32)
  if (circ > 0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-58, -80, 56, 30, -0.1, 0, Math.PI * 2 * circ); x.stroke() }
  if (heart > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 90, -20, 10 * heart)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  x.restore()
}
const HANGER = ['...KK...', '..K..K..', '...K....', '..KKK...', '.K...K..', 'KKKKKKK.']
const DRESS = ['..DDDD..', '.DDDDDD.', '..DDDD..', '..DDDD..', '.DDDDDD.', 'DDDDDDDD', 'DDDDDDDD']
const SPRAY = ['..KKKK.', 'KKKKK..', '..BB...', '.BBBB..', 'BBBBBB.', 'BWWWWB.', 'BWWWWB.', 'BBBBBB.']
const SPRAY_C = { K: '#9aa5c4', B: '#6fc3ff', W: '#fff4e2' }
const PEA = ['.GG.', 'GgGG', 'GGGG', '.GG.']

const CAMEOS = [
  { sign: S, cap: 'Not every typo | is a *red flag.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.5, 0.9), 0)
      label(x, 800, 1130, "IT'S CUTE. LET IT GO.", pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t need | *three backup outfits.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(600, 700, 380, 14)
      const COLS = [VPINK, SAGE, LAV]
      COLS.forEach((c, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), fade = i === 1 ? 1 : 1 - prog(lt, 1.0, 1.3)
        if (k > 0.01 && fade > 0.01) { drawBits(x, HANGER, { K: '#9aa5c4' }, 670 + i * 120, 730, 8 * k, { alpha: fade }); drawBits(x, DRESS, { D: c }, 670 + i * 120, 830, 16 * k, { alpha: fade }) }
      })
      label(x, 790, 1060, 'OUTFIT: CHOSEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The table | is *already clean.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 1000); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -14, 340, 36); x.fillStyle = '#fff4e2'; x.fillRect(-164, -8, 328, 24); x.fillStyle = INK; x.fillRect(-140, 22, 24, 120); x.fillRect(116, 22, 24, 120); x.restore() }
      const sq = lt > 0.5 && lt < 1.3 && Math.floor(t * 6) % 2
      drawBits(x, SPRAY, SPRAY_C, 760, 880, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.2 })
      if (sq) { x.fillStyle = 'rgba(200,240,255,0.8)'; for (let i = 0; i < 8; i++) x.fillRect(820 + i * 12, 840 + Math.sin(i * 2) * 20, 8, 8) }
      sparkles(x, t, 800, 980, P.t0 + 0.9, 8, 160, 0.3, [BONE, SKYB, GOLD])
      label(x, 740, 650, 'IT WAS ALREADY CLEAN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask a question. | *Not thirty.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      if (slab(x, 780, 860, 280, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#c98f2a', rot: 0.04 })) {
        x.fillStyle = '#fff4e2'; x.fillRect(-120, -150, 240, 310); x.fillStyle = '#9aa5c4'; x.fillRect(-50, -176, 100, 40)
        const q = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 13)
        txt(x, `Q ${q} / 30`, 0, -100, 40, INK, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-90, -40 + i * 40, 180 - (i % 2) * 40, 12)
        x.restore()
      }
      label(x, 720, 1140, 'A DATE. NOT AN INTERVIEW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them pick. | *Skip the reviews.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 320, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#d9efc0', rot: -0.03 })) {
        x.fillStyle = '#b9b0a0'; x.fillRect(-160, -30, 320, 22); x.fillRect(-20, -160, 22, 320)
        const n = Math.floor(clamp((lt - 0.3) / 1.0) * 14)
        for (let i = 0; i < n; i++) { const px = -130 + ((i * 73) % 260), py = -130 + ((i * 47) % 250); x.fillStyle = INK; x.fillRect(px - 10, py - 10, 20, 20); x.fillStyle = RED; x.fillRect(px - 7, py - 7, 14, 14) }
        x.restore()
      }
      label(x, 800, 650, 'REVIEWS READ: ALL', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'you choose!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Your quirks | are *charming.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 1], star: { x: -240, y: 20, s: 260 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(560, 1080); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 64, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(0, 0, 160, 56, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      const n = Math.floor(clamp((lt - 0.3) / 0.9) * 12)
      for (let i = 0; i < n; i++) drawBits(x, PEA, { G: '#5fd068', g: '#a8f0a0' }, 465 + (i % 6) * 38, 1062 + Math.floor(i / 6) * 36, 8)
      const d = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (d > 0.01) signChar(x, t, 'scorpio', 830, 930, 190 * d, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 1], seed: 91, glyph: false })
      label(x, 830, 650, 'CUTE, ACTUALLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A spill | won’t *ruin* the night.', mood: lt => lt > 1.4 ? 'happy' : lt > 0.8 ? 'wide' : 'happy', look: [0, 1], star: { x: -150 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const d = ease.inCubic(prog(lt, 0.4, 0.8))
      if (lt > 0.35) { x.fillStyle = INK; const y = lerp(560, F.cy + 50, d); if (d < 1) { x.fillRect(F.x - 56, y - 4, 24, 30); x.fillStyle = RED; x.fillRect(F.x - 52, y, 16, 22) } else { x.fillRect(F.x - 76, F.cy + 34, 64, 46); x.fillStyle = RED; x.fillRect(F.x - 70, F.cy + 40, 52, 34); x.fillStyle = '#ff8f8f'; x.fillRect(F.x - 62, F.cy + 44, 14, 10) } }
      label(x, 780, 700, 'STAIN: IGNORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 1080, 'eh. it’s fine.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'You’re allowed | to *have fun.*', mood: 'sparkle', star: { x: -150 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      notes(x, t, 540, 800, { n: 5, cell: 8, col: VPINK, seed: 4 })
      if (slab(x, 800, 860, 260, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.04 })) {
        txt(x, 'PLAN', 0, -110, 34, INK, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-90, -50 + i * 44, 180, 12)
        if (lt > 0.9) { x.save(); x.rotate(-0.2); x.fillStyle = 'rgba(255,244,226,0.9)'; x.fillRect(-120, -36, 240, 72); x.strokeStyle = TEAL; x.lineWidth = 6; x.strokeRect(-120, -36, 240, 72); txt(x, 'IGNORED', 0, 2, 44, TEAL, MONO, 700); x.restore() }
        x.restore()
      }
      label(x, 800, 1120, 'FUN: UNPLANNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text them after. | Draft *one* is fine.', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 280, 400, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', inner: '#140c30', rot: 0.04 })) {
        const sent = lt > 1.1
        x.fillStyle = sent ? VPINK : '#3a3260'; x.fillRect(-110, -120, 220, 110)
        txt(x, 'had fun :)', 0, -66, 32, sent ? INK : '#9aa5c4')
        txt(x, sent ? 'SENT' : 'DRAFT 9', 0, 40, 36, sent ? TEAL : RED, MONO, 700)
        x.restore()
      }
      label(x, 800, 1130, 'NO EDITS. BRAVE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a049', key: 'G', accent: VPINK, solo: S, ending: 'callback',
  title: 'Virgo, read this | *before the date.*',
  cameos: CAMEOS,
  group: { cap: 'Picky? | *Worth it.*', mood: 'sparkle' },
  last: {
    text: 'They texted first: | *“your so cute.”*',
    draw(x, t, lt) {
      phone(x, 540, 1010, 1.3 * pop01(t, t - lt + 0.5, 0.35, 2), 0, pop01(t, t - lt + 1.4, 0.3, 2.4), -0.03)
      hearts(x, t, 540, 770, t - lt + 1.5, { n: 8, life: 2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
