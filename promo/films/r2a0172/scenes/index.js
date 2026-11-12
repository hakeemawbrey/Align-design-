// r2a0172: star_advice, ADVICE SOLO, "Cancer, not every | goodbye *is forever.*" (~52 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine goodbyes a Cancer feels deeply, each a relatable truth + a warm reframe. Ending: lesson.
//   0.0–3.6    "Cancer, not every | goodbye *is forever.*"
//   3.6–37.8   nine cards: three goodbye hugs (with a crying Pisces) · a friend moved away · packing an old room
//              · last day at a job (the plant comes too) · the show ended (play again) · summer's over
//              · a fight isn't goodbye (two mugs) · their train left · outgrew an old version of you (growth chart)
//  37.8        "Soft heart. | *Strong roots.*"
//  41.2        LESSON: "Love doesn't leave. | It *changes shape.*"  STATUS: HELD
//  47.1        "Not goodbye. | *See you soon.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', SILVER = '#c9d3e8', BROWN = '#c98f5a'

// ── props
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.WWWWWWWW.', '.WBWWWWBW.', '.WWWDDWWW.', '.WWWDDWWW.']
function houses(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, HOUSE, { R: RED, W: BONE, B: SKYB, D: BROWN }, -130, 70, 17)
  drawBits(x, HOUSE, { R: '#3d8fd8', W: BONE, B: GOLD, D: BROWN }, 130, -70, 17)
  const p = clamp((lt - 0.4) / 1.0)
  x.setLineDash([14, 12]); x.strokeStyle = PINK; x.lineWidth = 6; x.beginPath(); x.moveTo(-80, 0)
  x.quadraticCurveTo(0, -120 * p, 80 * p - 80 * (1 - p), -30); x.stroke(); x.setLineDash([])
  x.restore()
}
function box(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -110, 320, 230); x.fillStyle = BROWN; x.fillRect(-152, -102, 304, 214)
  x.fillStyle = '#a8742a'; x.fillRect(-152, -102, 304, 40); x.fillStyle = 'rgba(255,235,190,0.6)'; x.fillRect(-30, -102, 60, 214)
  x.fillStyle = BONE; x.fillRect(-120, 0, 240, 74); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.forEach((l, i) => x.fillText(l, 0, 22 + i * 30))
  x.restore()
}
const PLANT = ['..G.G..', '.GGGGG.', 'GGgGgGG', '.GGGGG.', '..GGG..', '.KKKKK.', '.KRRRK.', '.KRRRK.', '..KKK..']
function tv(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = '#4a3a6a'; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = '#140c30'; x.fillRect(-140, -100, 280, 190)
  x.fillStyle = INK; x.fillRect(-60, 120, 20, 40); x.fillRect(40, 120, 20, 40)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (lt < 1.2) { x.fillStyle = BONE; x.font = `italic 600 46px Georgia, serif`; x.fillText('The End', 0, -5) }
  else {
    x.fillStyle = MINT; x.beginPath(); x.moveTo(-30, -50); x.lineTo(40, -5); x.lineTo(-30, 40); x.fill()
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('episode 1', 0, 68)
  }
  x.restore()
}
function sunset(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const y = cy + 60 * clamp((lt - 0.3) / 1.2)
  x.save(); x.globalAlpha = clamp(k)
  x.beginPath(); x.rect(cx - 180, cy - 220, 360, 260); x.clip()
  x.fillStyle = '#ff9a5a'; x.beginPath(); x.arc(cx, y, 130, 0, 7); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(cx, y, 90, 0, 7); x.fill()
  x.restore()
  x.save(); x.globalAlpha = clamp(k); x.fillStyle = '#3d8fd8'; x.fillRect(cx - 180, cy + 40, 360, 60)
  x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(cx - 160 + i * 90, cy + 60 + (i % 2) * 18, 50, 6)
  x.restore()
}
const MUG = ['.SSSSS..', '.SSSSS..', 'KKKKKKKK.', 'KCCCCCKKK', 'KCCCCCK.K', 'KCCCCCKKK', 'KCCCCCK..', '.KKKKK...']
function steam(x, t, cx, cy) {
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 5
  for (let i = 0; i < 2; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = cy - j * 9, xx = cx + i * 26 + Math.sin(t * 3 + j * 0.6 + i) * 8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}
function train(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const dx = 150 * ease.inQuad(clamp((lt - 0.6) / 1.4))
  x.save(); x.beginPath(); x.rect(120, cy - 200, 840, 360); x.clip()
  x.translate(cx + dx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 40, 420, 10)
  for (let c = 0; c < 2; c++) {
    const ox = -180 + c * 210
    x.fillStyle = INK; x.fillRect(ox, -90, 196, 130); x.fillStyle = c ? '#3d8fd8' : RED; x.fillRect(ox + 6, -84, 184, 118)
    x.fillStyle = '#fff1b0'; for (let w = 0; w < 3; w++) x.fillRect(ox + 20 + w * 56, -66, 40, 40)
    x.fillStyle = INK; x.beginPath(); x.arc(ox + 40, 40, 18, 0, 7); x.arc(ox + 156, 40, 18, 0, 7); x.fill()
  }
  x.restore()
}
function chart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.02); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-70, -230, 140, 460); x.fillStyle = '#fff8ea'; x.fillRect(-62, -222, 124, 444)
  x.fillStyle = INK; for (let i = 0; i < 10; i++) x.fillRect(-62, -200 + i * 44, i % 2 ? 24 : 40, 4)
  const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 4)
  for (let i = 0; i < n; i++) { const y = 180 - i * 90; x.fillStyle = [PINK, GOLD, MINT, SKYB, LAV][i]; x.fillRect(-20, y - 6, 80, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: 'cancer', cap: 'You hug goodbye three times. | Each one *counts.*', mood: 'heart', look: [1, 0], star: { x: -150 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 740, 900, 230 * k, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false, tears: 2, hops: [P.t0 + 0.9, P.t0 + 1.8] })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 2)
      label(x, 740, 1120, `HUG ${n} OF 3`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 0.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'Your friend moved away. | Distance *isn’t the end.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      houses(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, 'STILL CLOSE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packing up your old room? | The memories *come too.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      box(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ['MEMORIES', 'handle with love'])
      sparkles(x, t, 790, 780, P.t0 + 1.4, 7, 180, 0.6)
    } },
  { sign: 'cancer', cap: 'Last day at the job? | New *lunch friends* are coming.', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PLANT, { G: '#4ac77d', g: '#2f9a5a', K: INK, R: '#c96a3a' }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'THE PLANT COMES TOO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Your favourite show ended. | You can *start it again.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tv(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'PLAY AGAIN?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Summer’s over. | It *comes back around.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      sunset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.4, 1.6), lt)
      label(x, 790, 1110, 'SEE YOU NEXT JUNE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A fight isn’t goodbye. | *Sorry* opens doors.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MUG, { S: 'rgba(0,0,0,0)', K: INK, C: PINK }, 720, 920, 20 * k)
      drawBits(x, MUG, { S: 'rgba(0,0,0,0)', K: INK, C: SKYB }, 880, 920, 20 * pop01(t, P.t0 + 0.6, 0.35, 2), { sx: -1 })
      if (lt > 0.9) { steam(x, t, 690, 820); steam(x, t, 860, 820) }
      bubble(x, 790, 660, 'tea and talk?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1110, 'MADE UP ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Their train just left. | You’ll *wave hello* again.', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      train(x, 660, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 760, 660, 'text me when you land!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 760, 1110, 'NEXT VISIT: SOON', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Outgrew an old you? | *Growth* looks good on you.', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1120, 'STILL GROWING ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 700, P.t0 + 1.9, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0172', key: 'F', accent: SILVER, solo: 'cancer', ending: 'lesson',
  title: 'Cancer, not every | goodbye *is forever.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong roots.*', mood: 'heart' },
  lesson: { text: 'Love doesn’t leave. | It *changes shape.*', chip: 'STATUS: HELD' },
  last: { text: 'Not goodbye. | *See you soon.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
