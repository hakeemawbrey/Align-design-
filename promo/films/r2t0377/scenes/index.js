// r2t0377: star_talk SOLO (virgo), "How to spot | *a Virgo.*" (~50 s vertical, signs3kit social cut, lofi · E)
// Nine tell-tale signs, each the most extreme Virgo version:
//   sorted your spice rack at your own party · a spreadsheet for their spreadsheets · fixed the typo in your birthday card
//   · read all 48 pages of the terms · straightened a picture at a stranger's house · proofread your birth chart
//   · packing cubes, labelled by day · "relaxing" = colour-coding socks · tidied the panel they're standing in
//  37.8   "Notices everything. | *Fixes it all.*"  Virgo comes back, big.
//  41.0   LESSON UNLOCKED: "Virgos fix things | *because they care.*"  STATUS: HELPED
//  46.9   "They’ve already | *proofread this.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9ee6c9', RED = '#e23d4e'
const JAR = ['.KKKK.', 'GGGGGG', 'GWWWWG', 'GWWWWG', 'GCCCCG', 'GGGGGG']
// spice jars that shuffle into A-B-C-D order
function spices(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const order = ['C', 'A', 'D', 'B'], fin = ['A', 'B', 'C', 'D'], COL = { A: '#ff6b5a', B: GOLD, C: '#5fd07a', D: '#c97bff' }
  const p = ease.inOutCubic(prog(lt, 0.7, 1.4))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 70, 400, 22); x.fillStyle = '#a8743f'; x.fillRect(-194, 74, 388, 14)
  for (const L of fin) {
    const a = order.indexOf(L), b = fin.indexOf(L), px = lerp(-150 + a * 100, -150 + b * 100, p), py = -Math.sin(Math.PI * p) * 50 * (a !== b)
    drawBits(x, JAR, { K: INK, G: '#c4f0ff', W: '#fff4e2', C: COL[L] }, px, py, 14)
    x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L, px, py + 4)
  }
  x.restore()
}
// a spreadsheet inside a spreadsheet
function sheet(x, cx, cy, k, lt, depth = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const W = 300, H = 230
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#5fd07a'; x.fillRect(-W / 2, -H / 2, W, 30)
  x.strokeStyle = '#9aa5c4'; x.lineWidth = 2
  for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(-W / 2, -H / 2 + 30 + i * 34); x.lineTo(W / 2, -H / 2 + 30 + i * 34); x.stroke() }
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(-W / 2 + i * 60, -H / 2 + 30); x.lineTo(-W / 2 + i * 60, H / 2); x.stroke() }
  x.restore()
  if (depth < 2 && lt > 0.6 + depth * 0.5) sheet(x, cx + 30, cy + 26, k * 0.55, lt, depth + 1)
}
// a birthday card: "Hapy Birthday!" gets a red correction
function card(x, cx, cy, k, lt, text, fix) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 210)
  x.fillStyle = INK; x.fillRect(-166, -112, 332, 224)
  x.fillStyle = '#ffe1ec'; x.fillRect(-158, -104, 316, 208)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 6)
  if (lt > 1.0) {
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-58, 6, 74, 34, 0, 0, Math.PI * 2); x.stroke()
    x.fillStyle = RED; x.font = `800 34px ${INTER}`; x.fillText(fix, -58, -64)
  }
  x.restore()
}
// a scroll of terms that unrolls downwards
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const h = lerp(80, 400, ease.outCubic(prog(lt, 0.3, 1.5)))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -200, 252, h + 8)
  x.fillStyle = '#fff4e2'; x.fillRect(-120, -196, 240, h)
  x.fillStyle = '#9aa5c4'; for (let y = -176; y < -196 + h - 16; y += 20) x.fillRect(-100, y, 160 + ((y * 7) % 40), 8)
  x.fillStyle = '#c98f5a'; x.fillRect(-140, -214, 280, 28); x.fillRect(-140, -196 + h - 8, 280, 28)
  x.restore()
}
// a crooked picture frame that levels out
function frame(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const rot = lerp(0.28, 0, ease.outBack ? ease.outBack(prog(lt, 0.9, 1.4)) : ease.outCubic(prog(lt, 0.9, 1.4)))
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -106, 272, 212)
  x.fillStyle = '#c98f2a'; x.fillRect(-128, -98, 256, 196)
  x.fillStyle = '#8fe3ff'; x.fillRect(-104, -74, 208, 148)
  x.fillStyle = '#5fd07a'; x.fillRect(-104, 20, 208, 54)
  x.fillStyle = '#fff1b0'; x.fillRect(40, -54, 36, 36)
  x.restore()
}
// a pixel birth chart wheel with one planet circled in red pen
function chart(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 166, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 158, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3
  x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 110, Math.sin(a) * 110); x.lineTo(Math.cos(a) * 158, Math.sin(a) * 158); x.stroke() }
  const PL = [[0.3, GOLD], [1.4, '#c4f0ff'], [2.6, PINK], [3.9, '#ff6b5a'], [5.1, MINT]]
  for (const [a, c] of PL) { x.fillStyle = c; x.fillRect(Math.cos(a) * 70 - 9, Math.sin(a) * 70 - 9, 18, 18) }
  if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(Math.cos(1.4) * 70, Math.sin(1.4) * 70, 30, 0, Math.PI * 2); x.stroke() }
  x.restore()
}
// a suitcase full of labelled packing cubes
function suitcase(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -126, 352, 252)
  x.fillStyle = '#6b62a8'; x.fillRect(-168, -118, 336, 236)
  const L = ['MON', 'TUE', 'WED', 'SOCKS', 'SPARE', 'SPARE²'], C = ['#ff6b5a', GOLD, MINT, SKYB, LAV, PINK]
  for (let i = 0; i < 6; i++) {
    if (lt < 0.4 + i * 0.2) continue
    const px = -110 + (i % 3) * 110, py = -56 + Math.floor(i / 3) * 112
    x.fillStyle = INK; x.fillRect(px - 50, py - 48, 100, 96); x.fillStyle = C[i]; x.fillRect(px - 46, py - 44, 92, 88)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L[i], px, py)
  }
  x.restore()
}
const SOCK = ['.SS.', '.SS.', '.SS.', '.SSS', 'SSSS', 'SSS.']
function socks(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const C = ['#ff6b5a', '#ff9a4a', GOLD, MINT, SKYB, LAV, PINK]
  const n = Math.min(7, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
  for (let i = 0; i < n; i++) drawBits(x, SOCK, { S: C[i] }, cx - 156 + i * 52, cy, 12 * k)
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'virgo', cap: 'Sorted your spice rack. | *At your party.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      spices(x, 775, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * 1.1, lt)
      label(x, 790, 650, 'MUCH BETTER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'A spreadsheet | for *their spreadsheets.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'MASTER_FINAL_v9', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Fixed the typo | in *your* birthday card.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'Hapy B-day!', 'Happy')
      bubble(x, 790, 1090, 'you’re welcome', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Read all 48 pages | of *the terms.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'PAGE 48 OF 48', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Straightened a frame | at *a stranger’s* house.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'LEVEL: PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Proofread | your *birth chart.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.95, lt)
      bubble(x, 790, 1110, 'your moon is off', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: '#ffe1ec', tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Weekend trip. | *Six* labelled cubes.', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      suitcase(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'TRIP: 2 DAYS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: '#ff9a4a', rot: -0.04 })
    } },
  { sign: 'virgo', cap: '“Relaxing.” | *Colour-coding socks.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      socks(x, 770, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 680, 'DAY OFF :)', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Tidied the card | they’re *standing in.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [-1, 1], star: ST, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      // a little broom sweeping a few crumbs off the panel floor
      const n = 6
      for (let i = 0; i < n; i++) {
        const gone = lt > 0.5 + i * 0.18, px = 620 + i * 50, py = 1150 + (i % 2) * 14
        if (!gone) { x.fillStyle = '#c98f5a'; x.fillRect(px, py, 14, 14) }
      }
      const bx = lerp(620, 880, prog(lt, 0.4, 1.7))
      x.fillStyle = INK; x.fillRect(bx - 4, 960, 12, 190); x.fillStyle = '#a8743f'; x.fillRect(bx - 1, 964, 6, 182)
      x.fillStyle = INK; x.fillRect(bx - 40, 1136, 84, 40); x.fillStyle = GOLD; x.fillRect(bx - 36, 1140, 76, 32)
      label(x, 790, 720, 'SPOTLESS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04 })
      sparkles(x, t, 790, 900, P.t0 + 2.0, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0377', key: 'E', accent: ACC, solo: 'virgo', ending: 'lesson',
  title: 'How to spot | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Notices everything. | *Fixes it all.*', mood: 'sparkle' },
  lesson: { text: 'Virgos fix things | *because they care.*', chip: 'STATUS: HELPED' },
  last: { text: 'They’ve already | *proofread this.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
