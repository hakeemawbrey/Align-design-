// st10aquarius (60 s vertical, Star Talk season 10 "Little Stars", S10 E11) · story 0–55.6, then the end card.
//   HOOK   "Aquarius invented a *weird* thing."  Frame 0: the Academy science fair, kid Aquarius (big pink headphones)
//          cranking THE EVERY-PLANT WATERER, water arcs flying. AGE 7.
//   (flashback) AGE 1, the nursery: the crib mobile, taken apart and rebuilt as a contraption. "is that… the *mobile?*"
//          "*better.*"
//   WANT   "it waters *every* plant at once!" "i want them to *get* it."
//   TRY    the demo: crank, dominoes, a rubber duck, a balloon… and it soaks Leo's poster and the judge. The kids laugh;
//          headphones on. Saturn, judging: "most… *unique?*" Alone by the class garden: "they *laughed.*"
//   TURN   Saturn sits with it and opens a book. ★ REAL SKY: the Helix Nebula in Aquarius is what's left when a star like
//          our Sun gets old; it looks like a giant eye. "and it’s still *beautiful.*" Then it rains on the fair, but the class
//          garden is under the roof and the rain can't reach it. Headphones off: "…but my machine *can.*" Gutter →
//          funnel → pipes → every plant at once. The plants stand up.
//   WIN    The kids line up to build VERSION 2 ("can i hold the *duck?*", "i’ll make the *labels.*"); Leo hugs it.
//          growUp at the machine: today's Aquarius, headphones round its neck. "Weird *works*. Ask Aquarius."
//   Rewatch bait: the fair poster says THEORY #1 (adult Aquarius's whiteboard is at #47–#51, st9aquahome) and the balloon
//   in the machine is the same pink as the headphones. Ghost: a baby ghost (cell 2) pops out of the machine's funnel.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawAquaHeadphones } from '../../st9aquahome.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse, drawCloudCrib, drawHomeVideo, NURSERY, KIDS_FONTS } from '../../st10kids.js'
import { ageCaptionSafe, crayonText, burst, r3, PLAY_FONTS } from '../../st10play.js'

export const DURATION = 60
const KEY = 'Am'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c', INK = '#1b1236'
const AQ = signStar('aquarius'), LE = signStar('leo'), VI = signStar('virgo'), PI = signStar('pisces')

export const T = {
  hookOut: 2.75, flash: 3.0, fair: 7.2, demo: 12.2, splash: 13.6, ribbon: 18.2, alone: 20.6, book: 26.0,
  rain: 30.0, can: 35.3, water: 37.4, win: 42.0, hug: 46.5, grow: 49.8, last: 51.9,
  ghost: 13.0, lastOut: [55.0, 55.25], fade: [55.2, 55.6],
}
const CUTS = [T.flash, T.fair, T.demo, T.ribbon, T.alone, T.rain, T.water, T.win]
const PUNCH = [
  { at: T.splash, out: 15.4, zoom: 1.25, x: 760, y: 1060 },
  { at: T.can, out: 37.2, zoom: 1.25, x: 420, y: 1150 },
  { at: T.hug, out: 48.2, zoom: 1.15, x: 520, y: 1150 },
]
const SAY = [
  { text: 'is that… the *mobile?*', at: 3.5, out: 5.3, who: 'moon' },
  { text: '*better.*', at: 5.5, out: 7.05, who: 'aqua' },
  { text: 'it waters *every* plant at once!', at: 7.6, out: 9.8, who: 'aqua' },
  { text: 'i want them to *get* it.', at: 10.0, out: 12.05, who: 'aqua' },
  { text: 'it watered *me!*', at: 15.6, out: 17.6, who: 'leo' },
  { text: 'most… *unique?*', at: 18.5, out: 20.4, who: 'saturn' },
  { text: 'they *laughed.*', at: 21.3, out: 23.3, who: 'aqua' },
  { text: 'can i *sit?*', at: 23.9, out: 25.8, who: 'saturn' },
  { text: 'and it’s still *beautiful.*', at: 28.3, out: 29.85, who: 'saturn' },
  { text: 'the garden’s under the *roof!*', at: 31.0, out: 33.0, who: 'virgo' },
  { text: 'the rain can’t *reach* it!', at: 33.2, out: 35.1, who: 'pisces' },
  { text: '…but my machine *can.*', at: 35.35, out: 37.25, who: 'aqua' },
  { text: 'can i hold the *duck?*', at: 42.4, out: 44.2, who: 'leo' },
  { text: 'i’ll make the *labels.*', at: 44.4, out: 46.3, who: 'virgo' },
  { text: 'you guys *get* it.', at: 46.6, out: 48.9, who: 'aqua' },
]
const WHO = {
  aqua: { name: '♒ AQUARIUS', color: AQ.color, pitch: 880 },
  moon: { name: '☾ THE MOON', color: '#d9d0ff', pitch: 523.25 },
  leo: { name: '♌ LEO', color: LE.color, pitch: 659.25 },
  virgo: { name: '♍ VIRGO', color: VI.color, pitch: 783.99 },
  pisces: { name: '♓ PISCES', color: PI.color, pitch: 987.77 },
  saturn: { name: '♄ SATURN', color: '#e9c46a', pitch: 349.23 },
}
const TAGS = [
  { text: 'AGE 7', sub: 'the science fair', at: 0, out: 2.85 },
  { text: 'AGE 1', sub: 'the crib mobile', at: 3.15, out: 7.05 },
  { text: 'AGE 7', sub: 'the science fair', at: 7.35, out: 20.4 },
  { text: 'AGE 7', sub: 'the class garden', at: 20.75, out: 25.8 },
  { text: 'AGE 7', sub: 'version 2', at: 42.15, out: 48.9 },
]
const FACT = { text: 'The Helix Nebula in Aquarius is what’s left when a star like our Sun gets old. It looks like a giant eye.', at: 26.2, dur: 4.3, y: 330, label: '★ REAL SKY', w: 860 }
export const GHOST = { at: T.ghost, x: 770, y: 890, where: 'pops up out of the machine’s funnel as the demo starts (a baby ghost, cell 2)' }

// ─────────────────────────────── the EVERY-PLANT WATERER: a crank, dominoes, a rubber duck, a pink balloon, a funnel on top,
// pipes and six sprinkler heads. (cx, by) = the base centre, s = cell. spray 0…1 = water arcs; aim: where the arcs land.
function machine(x, t, cx, by, s, { spray = 0, crank = 0, v2 = false, rainIn = 0 } = {}) {
  const box = (x0, y0, w, h, c) => { x.fillStyle = INK; x.fillRect(x0 - 4, y0 - 4, w + 8, h + 8); x.fillStyle = c; x.fillRect(x0, y0, w, h) }
  // the frame + table
  box(cx - 36 * s, by - 4 * s, 72 * s, 4 * s, '#6b4a8a')
  box(cx - 34 * s, by - 34 * s, 4 * s, 30 * s, '#8a6ab0'); box(cx + 30 * s, by - 34 * s, 4 * s, 30 * s, '#8a6ab0')
  box(cx - 34 * s, by - 36 * s, 68 * s, 3 * s, '#8a6ab0')
  // the funnel on top (rain / water goes in here)
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 14 * s, by - 58 * s); x.lineTo(cx + 14 * s, by - 58 * s); x.lineTo(cx + 3 * s, by - 44 * s); x.lineTo(cx - 3 * s, by - 44 * s); x.closePath(); x.fill()
  x.fillStyle = '#38c4ec'; x.beginPath(); x.moveTo(cx - 12 * s, by - 57 * s); x.lineTo(cx + 12 * s, by - 57 * s); x.lineTo(cx + 2 * s, by - 45 * s); x.lineTo(cx - 2 * s, by - 45 * s); x.closePath(); x.fill()
  if (rainIn > 0) { x.fillStyle = `rgba(150,220,255,${0.8 * rainIn})`; x.fillRect(cx - 10 * s, by - 56 * s, 20 * s, 3 * s) }
  box(cx - 2 * s, by - 44 * s, 4 * s, 8 * s, '#38c4ec')
  // pipes: a zig-zag in three colours
  const pipe = (pts, c) => { x.lineCap = 'square'; x.lineJoin = 'miter'; x.strokeStyle = INK; x.lineWidth = 3.4 * s; x.beginPath(); pts.forEach(([u, v], i) => i ? x.lineTo(cx + u * s, by + v * s) : x.moveTo(cx + u * s, by + v * s)); x.stroke(); x.strokeStyle = c; x.lineWidth = 2 * s; x.stroke() }
  pipe([[0, -36], [0, -30], [-24, -30], [-24, -20], [24, -20], [24, -12]], '#ff8fb1')
  pipe([[-24, -30], [-30, -30], [-30, -44]], '#7fe0a8')
  pipe([[24, -20], [30, -20], [30, -44]], '#ffd36e')
  // the crank wheel (left)
  const a = crank * Math.PI * 6
  x.save(); x.translate(cx - 44 * s, by - 18 * s); x.rotate(a)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 9 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffd36e'; x.beginPath(); x.arc(0, 0, 7.4 * s, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-1 * s, -7 * s, 2 * s, 14 * s); x.fillRect(-7 * s, -1 * s, 14 * s, 2 * s); x.fillRect(4 * s, -9 * s, 3 * s, 6 * s)
  x.restore()
  // dominoes on the table (fall as it runs)
  for (let i = 0; i < 5; i++) {
    const f = clamp(crank * 6 - i * 0.6)
    x.save(); x.translate(cx - 22 * s + i * 5 * s, by - 4 * s); x.rotate(f * 1.2)
    x.fillStyle = INK; x.fillRect(-1.6 * s, -9 * s, 3.2 * s, 9 * s); x.fillStyle = '#f7f5ef'; x.fillRect(-1 * s, -8.4 * s, 2 * s, 7.8 * s)
    x.restore()
  }
  // the rubber duck + the pink balloon (rewatch: headphone pink)
  const duckY = by - 9 * s - (crank > 0.6 ? Math.abs(Math.sin(t * 12)) * 2 * s : 0)
  box(cx + 4 * s, duckY, 7 * s, 5 * s, '#ffd36e'); box(cx + 9 * s, duckY - 4 * s, 4 * s, 4 * s, '#ffd36e'); x.fillStyle = '#ff8f4a'; x.fillRect(cx + 13 * s, duckY - 2.5 * s, 2.4 * s, 1.4 * s)
  x.fillStyle = INK; x.fillRect(cx + 11 * s, duckY - 3 * s, s, s)
  const bl = 1 + 0.25 * clamp(crank * 2) + 0.05 * Math.sin(t * 3)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx + 20 * s, by - 50 * s, 7 * s * bl + 3, 8.5 * s * bl + 3, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff6f9f'; x.beginPath(); x.ellipse(cx + 20 * s, by - 50 * s, 7 * s * bl, 8.5 * s * bl, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffd1de'; x.fillRect(cx + 16 * s, by - 55 * s, 2 * s, 3 * s)
  x.strokeStyle = INK; x.lineWidth = 2; x.beginPath(); x.moveTo(cx + 20 * s, by - 41 * s); x.lineTo(cx + 22 * s, by - 36 * s); x.stroke()
  // six sprinkler heads along the top bar
  const heads = []
  for (let i = 0; i < 6; i++) { const hx = cx - 30 * s + i * 12 * s, hy = by - 37 * s; box(hx - 1.5 * s, hy - 3 * s, 3 * s, 3 * s, '#c9d2e8'); heads.push([hx, hy - 3 * s]) }
  if (v2) crayonText(x, 'V2', cx, by - 64 * s, { size: 12 * s, color: '#ff6fa8', seed: 9, rot: -0.1 })
  return heads
}
/** water arcs from each head to its target (dotted blue drops travelling) */
function sprays(x, t, heads, targets, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k * 1.5)
  heads.forEach(([hx, hy], i) => {
    const [tx, ty] = targets[i % targets.length], top = Math.min(hy, ty) - 160
    for (let d = 0; d < 14; d++) {
      const p = ((d / 14 + t * 1.6 + i * 0.13) % 1)
      if (p > k) continue
      const px = lerp(hx, tx, p), py = (1 - p) * (1 - p) * hy + 2 * (1 - p) * p * top + p * p * ty
      x.fillStyle = '#1b3a6a'; x.fillRect(px - 7, py - 7, 14, 14); x.fillStyle = d % 3 ? '#7fd8ff' : '#e6f8ff'; x.fillRect(px - 5, py - 5, 10, 10)
    }
  })
  x.restore()
}
/** a row of potted plants: wilt 0…1 droops them grey; bloom 0…1 opens flowers */
function plants(x, t, xs, by, s, { wilt = 0, bloom = 0 } = {}) {
  xs.forEach((px, i) => {
    x.fillStyle = INK; x.fillRect(px - 9 * s, by - 10 * s, 18 * s, 11 * s); x.fillStyle = '#c96a4a'; x.fillRect(px - 8 * s, by - 9 * s, 16 * s, 9 * s); x.fillStyle = '#e08a62'; x.fillRect(px - 8 * s, by - 9 * s, 16 * s, 2 * s)
    const stem = lerp(1.7, 0.9, wilt), droop = wilt * 1.2 * (i % 2 ? 1 : -1)
    const col = wilt > 0.5 ? '#9a9a6a' : '#3fbf6a'
    x.save(); x.translate(px, by - 10 * s)
    x.strokeStyle = INK; x.lineWidth = 3.4 * s; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(0, -14 * s * stem, Math.sin(droop) * 12 * s, -20 * s * stem + Math.abs(droop) * 8 * s); x.stroke()
    x.strokeStyle = col; x.lineWidth = 2 * s; x.stroke()
    const tx = Math.sin(droop) * 12 * s, ty = -20 * s * stem + Math.abs(droop) * 8 * s
    for (const sd of [-1, 1]) { x.fillStyle = INK; x.fillRect(tx * 0.5 + sd * 5 * s - 3 * s, ty * 0.5 - 2 * s, 6 * s + 2, 4 * s + 2); x.fillStyle = col; x.fillRect(tx * 0.5 + sd * 5 * s - 2.5 * s, ty * 0.5 - 1.5 * s, 5 * s, 3 * s) }
    if (bloom > 0) { const b = easeOutBack(clamp(bloom * 1.4 - i * 0.08), 2); x.fillStyle = INK; x.fillRect(tx - 5 * s * b, ty - 5 * s * b, 10 * s * b, 10 * s * b); x.fillStyle = ['#ff6fa8', '#ffd36e', '#c9a2ff', '#7fd8ff', '#ff8f4a', '#ff6fa8'][i % 6]; x.fillRect(tx - 4 * s * b, ty - 4 * s * b, 8 * s * b, 8 * s * b); x.fillStyle = '#fff4e0'; x.fillRect(tx - 1.5 * s * b, ty - 1.5 * s * b, 3 * s * b, 3 * s * b) }
    x.restore()
  })
}
function awning(x, t, y) {
  x.fillStyle = INK; x.fillRect(80, y - 8, 920, 60)
  for (let i = 0; i < 23; i++) { x.fillStyle = i % 2 ? '#ffffff' : '#38c4ec'; x.fillRect(84 + i * 40, y - 4, 40, 44) }
  for (let i = 0; i < 23; i++) { x.fillStyle = INK; x.beginPath(); x.arc(104 + i * 40, y + 40, 22, 0, Math.PI); x.fill(); x.fillStyle = i % 2 ? '#ffffff' : '#38c4ec'; x.beginPath(); x.arc(104 + i * 40, y + 40, 18, 0, Math.PI); x.fill() }
  x.fillStyle = INK; x.fillRect(110, y + 40, 14, 640); x.fillRect(956, y + 40, 14, 640)
  // the gutter along the front
  x.fillStyle = INK; x.fillRect(70, y - 22, 940, 20); x.fillStyle = '#c9d2e8'; x.fillRect(74, y - 18, 932, 12)
}
function rain(x, t, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.fillStyle = 'rgba(20,16,60,0.35)'; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 90; i++) {
    const rx = ((i * 137.5) % 1120) - 20 + (t * 60) % 40, ry = ((i * 211 + t * 1500) % 2000) - 80
    x.fillStyle = 'rgba(180,220,255,0.7)'; x.fillRect(rx, ry, 4, 34)
  }
  x.restore()
}
function poster(x, cx, cy, w, h, title, col, t, wet = 0) {
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 5, cy - h / 2 - 5, w + 10, h + 10); x.fillStyle = '#fbf3df'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  crayonText(x, title, cx, cy - h * 0.22, { size: 40, color: col, seed: title.length })
  if (wet > 0) { x.fillStyle = `rgba(80,140,220,${0.35 * wet})`; for (let i = 0; i < 5; i++) x.fillRect(cx - w / 2 + 10 + i * w / 5, cy - h / 2, w / 8, h * (0.4 + 0.5 * ((i * 7) % 3) / 2) * wet) }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, ...PLAY_FONTS, "800 112px Inter", "italic 500 156px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Aquarius invented | a *weird* thing.', out: T.hookOut, top: 330, accentColor: '#7fe4ff' })
  const last = popText(root, 'Weird *works*. | Ask Aquarius.', { top: 300, size: 112, accentSize: 160, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: '#7fe4ff', wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const pos = {}

  function kidAqua(t, X, Y, size, o = {}) {
    const { phones = 0, ...rest } = o
    const r = drawBabyStar(x, X, Y, size, t, { sign: 'aquarius', age: 'kid', seed: 11, ...rest })
    drawAquaHeadphones(x, r, size * 1.08, { k: phones })
    return r
  }
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.66 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.4 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }

  // the science fair (frame 0 and the demo): the hall, three tables
  function fair(t) {
    drawAcademy(x, t, { room: 'hall' })
    crayonText(x, '★ SCIENCE FAIR ★', 540, 720, { size: 56, color: '#ffd36e', seed: 4, rot: -0.03 })
    const demo = t >= T.demo
    const crank = t < T.flash ? prog(t, -1, 2.8) : demo ? prog(t, T.demo, T.splash + 0.4) : 0
    const spray = t < T.flash ? 1 : demo ? clamp((t - T.splash) / 0.5) * (1 - prog(t, 17.0, 17.6)) : 0
    // Leo's poster (gets soaked) + Virgo's labelled volcano, left
    poster(x, 240, 1020, 200, 150, 'ME!', '#f39a3a', t, spray > 0 ? clamp(spray * 2) : t > 17.6 && t < T.ribbon ? 1 : 0)
    // the machine table, right
    const heads = machine(x, t, 770, 1330, 6.5, { crank, spray })
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y + 60, at: GHOST.at, dur: 1.4, from: 'below', cell: 2 })
    poster(x, 780, 1400, 330, 100, 'THEORY #1', '#38c4ec', t)
    crayonText(x, 'THE EVERY-PLANT WATERER', 780, 1478, { size: 26, color: '#3d2a6e', seed: 12, weight: 700 })
    const targets = t < T.flash ? [[150, 1000], [240, 1080], [420, 900], [980, 820], [130, 1300], [600, 860]] : [[150, 1020], [210, 1080], [280, 1000], [900, 820], [170, 1330], [600, 900]]
    sprays(x, t, heads, targets, spray)
    // the crowd: Leo (soaked), Virgo, Pisces, laughing
    const laugh = demo && t > 14.6
    const le = drawBabyStar(x, 170, 1400, 200, t, { sign: 'leo', age: 'kid', mood: t < T.flash ? 'laugh' : laugh ? (t < 15.6 ? 'wide' : 'laugh') : 'happy', look: [1, 0], seed: 5, hops: [15.65, 16.4] })
    pos.leo = [le.x, le.top]
    drawBabyStar(x, 330, 1590, 170, t, { sign: 'virgo', age: 'kid', mood: laugh || t < T.flash ? 'laugh' : 'neutral', look: [1, 0], seed: 6 })
    drawBabyStar(x, 560, 1610, 170, t, { sign: 'pisces', age: 'kid', mood: laugh || t < T.flash ? 'laugh' : 'happy', look: [1, -0.3], seed: 12 })
    if (laugh || t < T.flash) for (let i = 0; i < 3; i++) crayonText(x, 'HA', 150 + i * 190, 1500 + Math.sin(t * 9 + i) * 10, { size: 44, color: '#ff6fa8', seed: i + 2, rot: -0.2 + i * 0.15 })
    // Aquarius at the crank
    const sad = laugh
    const r = kidAqua(t, 420, 1300, 250, { mood: t < T.flash ? 'determined' : demo ? (sad ? 'pout' : 'determined') : 'sparkle', look: [1, -0.2], phones: sad ? Math.max(0, 1 - prog(t, 15.8, 16.3)) : 1, hops: [7.65, 8.4, 10.05, T.demo + 0.1] })
    pos.aqua = [r.x, r.top]
  }

  function flashback(t) {
    drawNursery(x, t, { cribs: false, mobile: false, night: 0.2 })
    const [cx, cy] = NURSERY.cribs[1]
    drawCloudCrib(x, cx, cy, 300, t)
    // the mobile, re-built as a contraption: its stars on a spinning wheel, a spring and a bell
    const k = easeOutBack(prog(t, T.flash + 0.1, T.flash + 0.5), 1.8)
    x.save(); x.translate(540, 820); x.scale(k, k)
    x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -260); x.lineTo(0, -60); x.stroke()
    x.save(); x.rotate(t * 2)
    for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; x.strokeStyle = '#c9d2e8'; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 60); x.stroke(); x.fillStyle = ['#ffd36e', '#ff8fb1', '#7fe0a8', '#7fd8ff', '#c9a2ff'][i]; x.fillRect(Math.cos(a) * 110 - 16, Math.sin(a) * 60 - 16, 32, 32) }
    x.restore()
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffd36e'; x.beginPath(); x.arc(0, 0, 20, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#ff6f9f' : '#ffffff'; x.fillRect(-14 + (i % 2) * 6, 30 + i * 12, 22, 8) }
    x.restore()
    const b = drawBabyStar(x, cx, cy - 165, 260, t, { sign: 'aquarius', age: 'baby', mood: t < 5.5 ? 'sparkle' : 'happy', look: [0, -1], hops: [5.55, 6.1], seed: 11 })
    pos.aqua = [b.x, b.top]
    // little loose screws on the crib floor
    for (let i = 0; i < 4; i++) { x.fillStyle = '#9aa0b8'; x.fillRect(cx - 100 + i * 60, cy - 30, 10, 10) }
    drawCloudCrib(x, cx, cy, 300, t, { front: true })
    const m = drawMoonNurse(x, 860, 760, 90, t, { mood: t < 5.5 ? 'wide' : 'happy', look: [-1, 0.5], hops: [3.55], seed: 4 })
    pos.moon = [m.x - 20, m.top - 6]
  }

  // the class garden under the awning (the yard), alone → Saturn → rain → the machine saves it
  function garden(t) {
    drawAcademy(x, t, { room: 'yard' })
    const raining = prog(t, T.rain, T.rain + 0.6)
    rain(x, t, raining * 0.6)
    awning(x, t, 820)
    const watering = prog(t, T.water + 0.5, T.water + 2.6)
    plants(x, t, [180, 300, 420, 660, 780, 900], 1440, 7, { wilt: 1 - watering, bloom: prog(t, T.water + 2.2, T.water + 3.4) })
    // rain drips off the gutter in front (the plants are behind it, under the roof)
    if (raining > 0) for (let i = 0; i < 14; i++) { const dx = 90 + i * 66, dy = 800 + ((t * 900 + i * 97) % 300); x.fillStyle = 'rgba(180,220,255,0.8)'; x.fillRect(dx, dy, 5, 22) }
    const fixed = t >= T.water
    let heads = null
    if (fixed) {
      heads = machine(x, t, 540, 1480, 6, { crank: prog(t, T.water, T.water + 1.5), rainIn: 1 })
      // the drainpipe from the gutter into the funnel
      x.fillStyle = INK; x.fillRect(522, 800, 36, 335); x.fillStyle = '#c9d2e8'; x.fillRect(528, 800, 24, 335)
      x.fillStyle = 'rgba(127,216,255,0.9)'; for (let i = 0; i < 6; i++) x.fillRect(532, 820 + ((t * 600 + i * 55) % 300), 16, 24)
      sprays(x, t, heads, [[180, 1300], [300, 1300], [420, 1300], [660, 1300], [780, 1300], [900, 1300]], clamp((t - T.water - 0.4) / 0.6))
    }
    if (t < T.rain) {
      // alone, then Saturn and the book
      const r = kidAqua(t, 640, 1240, 240, { mood: t < T.book ? 'pout' : 'sparkle', look: t < T.book ? [0, 0.8] : [-1, 0], phones: 0, hops: [21.35, 26.3] })
      pos.aqua = [r.x, r.top]
      const sIn = ease.outCubic(prog(t, 23.4, 24.0))
      const s = drawSaturn(x, lerp(1260, 360, sIn), 1190, 260, t, { mood: 'happy', prop: t > T.book ? 'book' : null, look: [1, 0.3], hops: [23.95, 28.35], seed: 4 })
      pos.saturn = [s.x, s.top]
      // the book's picture: the Helix Nebula (a ring like a giant eye)
      const bk = easeOutBack(prog(t, T.book, T.book + 0.4), 1.8)
      if (bk > 0) {
        x.save(); x.translate(470, 980); x.scale(bk, bk)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#fbf3df'; x.fillRect(-164, -114, 160, 228); x.fillRect(4, -114, 160, 228)
        x.fillStyle = '#0c0a24'; x.fillRect(-150, -96, 300, 192)
        const g = x.createRadialGradient(0, 0, 10, 0, 0, 90); g.addColorStop(0, 'rgba(120,200,255,0.5)'); g.addColorStop(0.45, 'rgba(80,140,255,0.5)'); g.addColorStop(0.62, 'rgba(255,120,90,0.95)'); g.addColorStop(0.8, 'rgba(255,80,60,0.5)'); g.addColorStop(1, 'rgba(255,80,60,0)')
        x.fillStyle = g; x.beginPath(); x.ellipse(0, 0, 100, 80, 0.2, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffffff'; x.fillRect(-3, -3, 6, 6)
        x.restore()
      }
    } else if (t < T.win) {
      // everyone ducks under the awning; Aquarius takes the headphones off and hooks the machine up
      const v = drawBabyStar(x, 840, 1260, 200, t, { sign: 'virgo', age: 'kid', mood: t < T.water + 1.5 ? 'wide' : 'happy', look: [-1, 0.5], seed: 6, hops: [31.05, T.water + 2] })
      const p = drawBabyStar(x, 980, 1350, 180, t, { sign: 'pisces', age: 'kid', mood: t < T.water + 1.5 ? 'cry' : 'happy', look: [-1, 0.5], seed: 12, hops: [33.25, T.water + 2.1] })
      pos.virgo = [v.x, v.top]; pos.pisces = [p.x, p.top]
      const le = drawBabyStar(x, fixed ? 80 : 140, 1270, 190, t, { sign: 'leo', age: 'kid', mood: t < T.water + 1.5 ? 'neutral' : 'laugh', look: [1, 0.3], seed: 5, hops: [T.water + 2.2] })
      void le
      const r = kidAqua(t, fixed ? 220 : 420, 1200, 240, { mood: t < T.can ? 'neutral' : fixed ? 'happy' : 'determined', look: [1, 0.2], phones: t < T.can ? 0 : 1 + 0.9 * prog(t, T.can, T.can + 0.5), hops: [T.can + 0.05, T.water + 0.1, T.water + 2.3] })
      pos.aqua = [r.x, r.top]
      if (fixed) { crayonText(x, 'WHOA!', 760, 1000, { size: 70, color: '#7fe4ff', seed: 6, rot: 0.08, alpha: prog(t, T.water + 2.2, T.water + 2.5) }); burst(x, t, 540, 1220, T.water + 2.3, 12, 260) }
    }
  }

  // version 2: the line-up, the hug, growUp
  function v2(t) {
    drawAcademy(x, t, { room: 'hall' })
    crayonText(x, 'VERSION 2 · TEAM', 540, 770, { size: 54, color: '#7fe4ff', seed: 7, rot: -0.03 })
    crayonText(x, '♒ ♌ ♍ ♓', 540, 850, { size: 48, color: '#ffd36e', seed: 8 })
    machine(x, t, 850, 1230, 6, { crank: 0, v2: true })
    const hug = prog(t, T.hug, T.hug + 0.35) * (1 - prog(t, 48.4, 48.8))
    const lx = lerp(160, 330, hug)
    const le = drawBabyStar(x, lx, 1300, 210, t, { sign: 'leo', age: 'kid', mood: t < T.hug ? 'sparkle' : 'happy', look: [1, 0], seed: 5, hops: [42.45, T.hug] })
    pos.leo = [le.x, le.top]
    const v = drawBabyStar(x, 680, 1420, 190, t, { sign: 'virgo', age: 'kid', mood: 'happy', look: [-1, -0.3], seed: 6, hops: [44.45] })
    pos.virgo = [v.x, v.top]
    drawBabyStar(x, 960, 1440, 170, t, { sign: 'pisces', age: 'kid', mood: 'happy', look: [-1, 0], seed: 12 })
    // tools in hands: a wrench, a label maker, a sparkly duck
    x.fillStyle = INK; x.fillRect(lx + 60, 1330, 70, 18); x.fillStyle = '#c9d2e8'; x.fillRect(lx + 64, 1334, 62, 10)
    x.fillStyle = INK; x.fillRect(740, 1450, 64, 40); x.fillStyle = '#ef5c94'; x.fillRect(744, 1454, 56, 32)
    if (t < T.grow) {
      const r = kidAqua(t, 440, 1250, 250, { mood: t < T.hug ? 'happy' : 'heart', look: [-1, 0], phones: 1, hops: [46.65, 47.4] })
      pos.aqua = [r.x, r.top]
      if (hug > 0.5) burst(x, t, 420, 1180, T.hug + 0.25, 10, 160, ['#ff6fa8', '#ffd6ec', GOLD])
    } else {
      const r = growUp(x, t, { sign: 'aquarius', at: T.grow, x: 440, y: 1240, size: 280, look: [1, -0.2], seed: 11, kidOpts: {} })
      if (t > T.grow + 0.85) drawAquaHeadphones(x, r, 280 * 1.05, { k: 1 })
      else drawAquaHeadphones(x, r, (r.size || 250) * 1.08, { k: 1 })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const Z = { z: 1.1, cx: 540, cy: 1250 }
      x.translate(Z.cx, Z.cy); x.scale(Z.z, Z.z); x.translate(-Z.cx, -Z.cy)
      for (const k in pos) delete pos[k]
      if (t < T.flash || (t >= T.fair && t < T.alone)) {
        if (t >= T.ribbon && t < T.alone) {
          fair(t)
          // the judge: Saturn with a ribbon, dripping
          const s = drawSaturn(x, 330, 860, 220, t, { mood: 'squint', look: [-1, 0.4], hops: [18.55], seed: 4 })
          pos.saturn = [s.x, s.top]
          const rk = easeOutBack(prog(t, 18.3, 18.6), 2)
          if (rk > 0) { x.save(); x.translate(560, 1180); x.scale(rk, rk); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fd8ff'; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fd8ff'; x.fillRect(-30, 30, 22, 70); x.fillRect(8, 30, 22, 70); crayonText(x, '?', 0, 2, { size: 54, color: INK, seed: 3 }); x.restore() }
        } else fair(t)
      } else if (t < T.fair) flashback(t)
      else if (t < T.win) garden(t)
      else v2(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      topScrim(t)
      for (const s of SAY) {
        if (t < s.at - 0.05 || t > s.out + 0.4) continue
        const w = WHO[s.who], p0 = pos[s.who]
        if (!p0) continue
        const p = [Z.cx + (p0[0] - Z.cx) * Z.z, Z.cy + (p0[1] - Z.cy) * Z.z]
        speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: clamp(p[0], 160, 920), y: Math.max(560, p[1]), name: w.name, color: w.color, side: p[0] > 700 ? -0.4 : p[0] < 380 ? 0.4 : 0, size: 46, w: 640 })
      }
      for (const g of TAGS) ageCaptionSafe(ageCaption, x, t, { ...g, y: 1650, color: '#a8ecff' })
      factChip(x, t, FACT)
      drawHomeVideo(x, t, { alpha: t < T.hookOut ? 0 : 1 - prog(t, T.last - 0.3, T.last) })
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#eafcff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      if (t > T.rain && t < T.rain + 0.35) { x.save(); x.globalAlpha = 0.7 * (1 - prog(t, T.rain, T.rain + 0.35)); x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [T.flash, T.fair, T.demo, T.alone, T.rain, T.win]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E11' }), cardCuts(CARD_CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: WHO[s.who].pitch })),
  ...TAGS.filter(g => g.at > 0).flatMap(g => ageCaptionCues(g.at)),
  ['bell', T.flash + 0.3, 1318.51, 0.025, 1.6, 0], ['glitter', T.flash + 0.1, T.flash + 0.8],
  ...[0, 0.25, 0.5, 0.75, 1.0].map(d => ['tick', r3(T.demo + 0.2 + d), 0.02]),
  ['pop', 12.9, 1567.98, 0.03, 0.3], ['pop', 13.0, 1760, 0.025, 0.3],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.splash, 0.8, 0.045], ['glitter', T.splash, T.splash + 1.2], ['boom', T.splash + 0.1, 0.08],
  ...[0, 0.2, 0.4, 0.6].map(d => ['pop', r3(15.0 + d), 1046.5 - d * 300, 0.02, 0]),
  ['bell', 18.3, 659.25, 0.03, 1.8, 0], ['pop', 18.32, 392, 0.03, 0],
  ['bell', T.book, 1046.5, 0.025, 2.2, 0], ...factChipCues(FACT.at, FACT),
  ['boom', T.rain, 0.14], ['crash', T.rain + 0.05, { gain: 0.05 }], ['whoosh', T.rain, 1.6, 0.04],
  ['whoosh', T.can, 0.4, 0.03], ['pop', T.can + 0.3, 1318.51, 0.03, 0],
  ['tick', T.water + 0.1, 0.03], ['whoosh', T.water + 0.4, 1.0, 0.04], ['glitter', T.water + 0.6, T.water + 2.6],
  ...[0, 0.12, 0.24, 0.36, 0.48, 0.6].map((d, i) => ['pop', r3(T.water + 2.2 + d), [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98][i], 0.025, (i - 2.5) * 0.15]),
  ['bell', T.hug + 0.2, 783.99, 0.03, 2.2, 0], ['bell', T.hug + 0.35, 1046.5, 0.025, 2.2, 0],
  ...growUpCues(T.grow),
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [659.25, 783.99, 880, 1046.5][i], 0.038, 0]), ['pluck', T.last + 0.35, 1046.5, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
