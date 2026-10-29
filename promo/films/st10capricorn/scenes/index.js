// st10capricorn (60 s vertical, Star Talk season 10 "Little Stars", S10 E10) · story 0–55.6, then the end card.
//   HOOK   "Capricorn was born *forty*."  Frame 0: the Star Nursery, baby Capricorn in its cloud crib in a tiny tie and
//          reading glasses, typing on a toy laptop, a tiny briefcase beside it. AGE 1. "per my *last* babble…"
//   WANT   AGE 5, the Academy sandbox, with a clipboard spreadsheet CASTLE.xlsx (MOAT · MON, TOWER · TUE …, FUN · ???):
//          "i want the *best* castle." "on *schedule.*"
//   TRY    a whistle and "team! *meeting!*" — the kids are just playing ("we’re *playing!*"). It builds alone, ruler and
//          all ("tower one: *on time.*"), then Aries's ball flattens it ("*sorry!*"). Alone in the sand: "the *deadline*…"
//   TURN   Saturn the principal (glasses): "recess is the *assignment.*" "it… *is?*" ★ IN THE MYTH: some stories link the
//          sea-goat to Amalthea, the goat who nursed baby Zeus. "you’ve cared for people since *day one.*" The sheet gets
//          a new row: FUN · NOW ✓.
//   WIN    Leo takes its hand ("come *on!*"); everyone builds one lopsided castle together, badly and happily; Saturn takes
//          the photo ("say *sand!*"). growUp in the sandbox: today's Capricorn, tie loose, a bucket in its hand.
//          "Play is *practice*, too."
//   Rewatch bait: the baby's crib has the "BOOKED TILL 2031" calendar (season 4), and the castle sheet's last row is
//   "FRI · FREE?" (the free Friday). Ghost: a baby ghost (cell 2) peeks out of the castle tower's window.
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
import { drawCap, drawSheet, wallCalendar } from '../../st9caphome.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse, drawCloudCrib, drawHomeVideo, NURSERY, KIDS_FONTS } from '../../st10kids.js'
import { ageCaptionSafe, drawSandbox, crayonText, burst, r3, PLAY_FONTS } from '../../st10play.js'

export const DURATION = 60
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c', INK = '#1b1236'
const CA = signStar('capricorn'), LE = signStar('leo'), AR = signStar('aries'), PI = signStar('pisces')

export const T = {
  hookOut: 2.75, yard: 6.4, sheet: 8.9, meet: 12.2, alone: 17.0, ball: 21.6, smash: 22.4, sad: 25.6,
  saturn: 30.0, chip: 35.0, fun: 40.0, win: 42.0, build: 44.2, photo: 47.4, grow: 49.8, last: 51.9,
  ghost: 18.6, lastOut: [55.0, 55.25], fade: [55.2, 55.6],
}
const CUTS = [T.yard, T.meet, T.alone, T.sad, T.saturn, T.win, T.build]
const PUNCH = [
  { at: T.smash, out: 24.4, zoom: 1.3, x: 640, y: 1180 },
  { at: 33.0, out: 34.7, zoom: 1.2, x: 420, y: 1150 },
  { at: T.photo, out: T.photo + 0.9, zoom: 1.15, x: 540, y: 1150 },
]
const SAY = [
  { text: 'per my *last* babble…', at: 2.9, out: 4.6, who: 'cap' },
  { text: 'it’s *nap* time, sir.', at: 4.75, out: 6.25, who: 'moon' },
  { text: 'i want the *best* castle.', at: 6.75, out: 8.75, who: 'cap' },
  { text: 'on *schedule.*', at: 10.0, out: 12.05, who: 'cap' },
  { text: 'team! *meeting!*', at: 12.7, out: 14.55, who: 'cap' },
  { text: 'we’re *playing!*', at: 14.75, out: 16.8, who: 'leo' },
  { text: 'tower one: *on time.*', at: 18.2, out: 20.2, who: 'cap' },
  { text: '*sorry!*', at: 22.75, out: 24.5, who: 'aries' },
  { text: 'the *deadline*…', at: 26.5, out: 28.7, who: 'cap' },
  { text: 'recess is the *assignment.*', at: 30.55, out: 32.8, who: 'saturn' },
  { text: 'it… *is?*', at: 33.0, out: 34.6, who: 'cap' },
  { text: 'know the sea-goat *story?*', at: 34.8, out: 36.6, who: 'saturn' },
  { text: 'you’ve cared for people since *day one.*', at: 37.5, out: 39.85, who: 'saturn' },
  { text: 'come *on!*', at: 42.4, out: 44.0, who: 'leo' },
  { text: 'more *moat!*', at: 44.5, out: 46.2, who: 'pisces' },
  { text: 'say *sand!*', at: 46.4, out: 48.2, who: 'saturn' },
]
const WHO = {
  cap: { name: '♑ CAP', color: CA.color, pitch: 587.33 },
  moon: { name: '☾ THE MOON', color: '#d9d0ff', pitch: 523.25 },
  leo: { name: '♌ LEO', color: LE.color, pitch: 783.99 },
  aries: { name: '♈ ARIES', color: AR.color, pitch: 880 },
  pisces: { name: '♓ PISCES', color: PI.color, pitch: 987.77 },
  saturn: { name: '♄ SATURN', color: '#e9c46a', pitch: 349.23 },
}
const TAGS = [
  { text: 'AGE 1', at: 0, out: 6.25 },
  { text: 'AGE 5', sub: 'the sandbox', at: 6.55, out: 16.85 },
  { text: 'AGE 5', sub: 'recess · 10 min left', at: 17.15, out: 25.45 },
  { text: 'AGE 5', sub: 'recess · 4 min left', at: 25.75, out: 29.7 },
  { text: 'AGE 5', sub: 'recess · 2 min left', at: 42.15, out: 48.6 },
]
const FACT = { text: 'Some stories link the sea-goat to Amalthea, the goat who nursed baby Zeus.', at: T.chip, dur: 4.4, y: 330, label: '★ IN THE MYTH', w: 860 }
export const GHOST = { at: T.ghost, x: 640, y: 1150, where: 'peeks out of the sandcastle tower’s window while Capricorn measures it (a baby ghost, cell 2)' }
const ROWS = [
  { at: 9.3, cells: ['MOAT', 'MON'], check: true },
  { at: 9.75, cells: ['TOWER', 'TUE'] },
  { at: 10.2, cells: ['FLAGS', 'WED'] },
  { at: 10.65, cells: ['FUN', '???'], hl: { at: 11.2, color: '#ffd0d8' } },
  { at: 11.1, cells: ['FRI', 'FREE?'], color: '#9a8fb8' },
]
const ROWS2 = [...ROWS.slice(0, 3), { at: 0, cells: ['FUN', 'NOW'], check: true, hl: { at: T.fun + 0.6, color: '#bff0c8' } }, ROWS[4]]

// props
function briefcase(x, cx, cy, s) {
  x.fillStyle = INK; x.fillRect(cx - 9 * s, cy - 7 * s, 18 * s, 14 * s); x.fillRect(cx - 4 * s, cy - 10 * s, 8 * s, 4 * s)
  x.fillStyle = '#8a5a32'; x.fillRect(cx - 8 * s, cy - 6 * s, 16 * s, 12 * s); x.fillStyle = '#a8723f'; x.fillRect(cx - 8 * s, cy - 6 * s, 16 * s, 3 * s)
  x.fillStyle = '#8a5a32'; x.fillRect(cx - 3 * s, cy - 9 * s, 6 * s, 1.6 * s)
  x.fillStyle = GOLD; x.fillRect(cx - 1.5 * s, cy - 2 * s, 3 * s, 2 * s)
}
function glasses(x, cx, cy, s) {
  x.strokeStyle = INK; x.lineWidth = Math.max(3, s * 0.9)
  x.strokeRect(cx - 9 * s, cy - 3 * s, 7 * s, 5.5 * s); x.strokeRect(cx + 2 * s, cy - 3 * s, 7 * s, 5.5 * s)
  x.beginPath(); x.moveTo(cx - 2 * s, cy - 1 * s); x.lineTo(cx + 2 * s, cy - 1 * s); x.stroke()
  x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(cx - 8 * s, cy - 2 * s, 2 * s, 2 * s); x.fillRect(cx + 3 * s, cy - 2 * s, 2 * s, 2 * s)
}
function tie(x, cx, cy, s, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-3 * s, -1 * s, 6 * s, 4 * s); x.beginPath(); x.moveTo(-3.6 * s, 2 * s); x.lineTo(3.6 * s, 2 * s); x.lineTo(0, 14 * s); x.closePath(); x.fill()
  x.fillStyle = '#c94a4a'; x.fillRect(-2 * s, 0, 4 * s, 2.4 * s); x.beginPath(); x.moveTo(-2.4 * s, 2.6 * s); x.lineTo(2.4 * s, 2.6 * s); x.lineTo(0, 12 * s); x.closePath(); x.fill()
  x.restore()
}
function toyLaptop(x, cx, cy, s, t) {
  x.fillStyle = INK; x.fillRect(cx - 13 * s, cy - 10 * s, 26 * s, 12 * s); x.fillRect(cx - 15 * s, cy + 1 * s, 30 * s, 5 * s)
  x.fillStyle = '#ff9fc8'; x.fillRect(cx - 12 * s, cy - 9 * s, 24 * s, 10 * s); x.fillStyle = '#bff0e0'; x.fillRect(cx - 10 * s, cy - 7 * s, 20 * s, 6 * s)
  // a tiny spreadsheet on the toy screen
  x.fillStyle = '#1f7a4f'; x.fillRect(cx - 10 * s, cy - 7 * s, 20 * s, 1.5 * s)
  for (let j = 0; j < 3; j++) { x.fillStyle = (Math.floor(t * 4) + j) % 3 ? '#5aa080' : '#1f7a4f'; x.fillRect(cx - 9 * s, cy - 4.5 * s + j * 1.6 * s, 18 * s * (0.4 + 0.2 * j), s * 0.8) }
  x.fillStyle = '#ffc1dc'; x.fillRect(cx - 14 * s, cy + 2 * s, 28 * s, 3 * s)
}
/** the sandcastle: build 0…1 grows it from the base; crooked 0…1 = the friends' lopsided version (flags, a crown, shells) */
function castle(x, t, cx, by, s, { build = 1, squash = 0, crooked = 0 } = {}) {
  if (build <= 0) return
  const S = '#c98f4a', Sl = '#dca75e', Sd = '#b27a3c'
  const h = s * 34 * build * (1 - squash * 0.85)
  x.save()
  if (crooked > 0) { x.translate(cx, by); x.rotate(-0.08 * crooked); x.translate(-cx, -by) }
  const blkS = (x0, y0, w, hh, c) => { x.fillStyle = INK; x.fillRect(x0 - 4, y0 - 4, w + 8, hh + 4); x.fillStyle = c; x.fillRect(x0, y0, w, hh) }
  // base
  blkS(cx - 26 * s, by - Math.min(h, 12 * s), 52 * s, Math.min(h, 12 * s), S)
  if (h > 12 * s) {
    const th = Math.min(h - 12 * s, 22 * s)
    blkS(cx - 9 * s, by - 12 * s - th, 18 * s, th, Sl)
    // crenellations
    if (th > 18 * s) for (let i = 0; i < 3; i++) blkS(cx - 9 * s + i * 7 * s, by - 12 * s - th - 4 * s, 4 * s, 4 * s, Sl)
    // the window (the ghost's spot)
    x.fillStyle = '#3a2a2a'; x.fillRect(cx - 3 * s, by - 12 * s - th * 0.6, 6 * s, 7 * s)
    // the friends' additions
    if (crooked > 0) {
      blkS(cx - 24 * s, by - 26 * s, 11 * s, 14 * s, Sd); blkS(cx + 14 * s, by - 22 * s, 12 * s, 10 * s, Sd)
      x.fillStyle = '#6b4a2a'; x.fillRect(cx + 19 * s, by - 34 * s, 1.5 * s, 12 * s); x.fillStyle = '#ff6fa8'; x.fillRect(cx + 20 * s, by - 34 * s, 7 * s, 4 * s)
      x.fillStyle = '#6b4a2a'; x.fillRect(cx - 20 * s, by - 38 * s, 1.5 * s, 12 * s); x.fillStyle = '#7fd0ff'; x.fillRect(cx - 18.5 * s, by - 38 * s, 7 * s, 4 * s)
      // Leo's paper crown on top
      x.fillStyle = INK; x.fillRect(cx - 7 * s, by - 12 * s - th - 11 * s, 14 * s, 7 * s)
      x.fillStyle = '#ffd36e'; x.fillRect(cx - 6 * s, by - 12 * s - th - 8 * s, 12 * s, 3 * s)
      for (let i = 0; i < 3; i++) x.fillRect(cx - 6 * s + i * 5 * s, by - 12 * s - th - 10.5 * s, 2 * s, 3 * s)
      // shells
      for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#ffb3cc' : '#fff4e0'; x.fillRect(cx - 20 * s + i * 11 * s, by - 6 * s, 3 * s, 2.5 * s) }
    }
  }
  if (squash > 0) { x.fillStyle = Sd; x.fillRect(cx - 34 * s, by - 3 * s, 68 * s, 3 * s) }
  x.restore()
  return { top: by - h, win: [cx, by - 12 * s - Math.min(h - 12 * s, 22 * s) * 0.6 + 3 * s] }
}
function moat(x, t, cx, by, s, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.fillStyle = INK; x.fillRect(cx - 40 * s, by + 2 * s, 80 * s, 6 * s)
  x.fillStyle = '#5a7f9a'; x.fillRect(cx - 39 * s, by + 3 * s, 78 * s, 4 * s)
  x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) x.fillRect(cx - 36 * s + ((i * 13 * s + t * 30) % (72 * s)), by + 4 * s, 4 * s, s)
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, ...PLAY_FONTS, "800 112px Inter", "italic 500 156px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Capricorn was | born *forty*.', out: T.hookOut, top: 330, accentColor: '#8ff0c8' })
  const last = popText(root, 'Play is | *practice*, too.', { top: 300, size: 116, accentSize: 160, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: '#8ff0c8', wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const pos = {}

  function kidCap(t, X, Y, size, o = {}) {
    const { case: hasCase = false, glasses: gl = false, ...rest } = o
    if (hasCase) briefcase(x, X - size * 0.5, Y + size * 0.3, Math.max(3, size / 40))
    const r = drawBabyStar(x, X, Y, size, t, { sign: 'capricorn', age: 'kid', seed: 10, ...rest })
    tie(x, r.x, r.y + size * 0.16, Math.max(3, size / 46))
    if (gl) glasses(x, r.x, r.y + size * 0.02, Math.max(3, size / 40))
    return r
  }
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.66 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.4 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }

  function nursery(t) {
    drawNursery(x, t, { cribs: false, night: 0.25 })
    const [cx, cy] = NURSERY.cribs[1], W = 300
    for (const c of [NURSERY.cribs[0], NURSERY.cribs[2]]) { drawCloudCrib(x, c[0], c[1], 240, t); drawCloudCrib(x, c[0], c[1], 240, t, { front: true }) }
    // the BOOKED TILL 2031 calendar, taped to the crib's back rail (rewatch bait)
    wallCalendar(x, cx + 60, cy - 330, 150, 120, t, { friday: 'free', glow: 0.6 })
    drawCloudCrib(x, cx, cy, W, t)
    const by = cy - 270 * 0.62
    briefcase(x, cx - 130, by + 60, 5)
    const b = drawBabyStar(x, cx, by, 270, t, { sign: 'capricorn', age: 'baby', mood: t < 2.9 ? 'determined' : t < 4.7 ? 'squint' : 'determined', look: [0, 1], hops: [2.95, 3.7], seed: 10 })
    tie(x, b.x, b.y + 46, 5)
    glasses(x, b.x, b.y + 10, 7)
    toyLaptop(x, cx + 150, by + 70, 5, t)
    drawCloudCrib(x, cx, cy, W, t, { front: true })
    // typing clicks: little crayon "tap" marks
    if (t < 6 && Math.floor(t * 6) % 2) crayonText(x, 'tap', cx + 150, by + 30, { size: 30, color: '#3d2a6e', seed: Math.floor(t * 6), rot: 0.2 })
    pos.cap = [b.x, b.top - 4]
    const m = drawMoonNurse(x, 830, 830, 92, t, { mood: t < 4.7 ? 'neutral' : 'wink', look: [-1, 0.6], hops: [4.8], seed: 4 })
    pos.moon = [m.x - 20, m.top - 6]
  }

  function sandboxSet(t, o = {}) {
    drawAcademy(x, t, { room: 'yard' })
    drawSandbox(x, t, 40, 1140, 1000, 420, { dunes: 0.4 })
    if (o.dim) { x.fillStyle = `rgba(16,10,44,${o.dim})`; x.fillRect(0, 0, 1080, 1920) }
  }

  function scene(t) {
    // ── the sandbox: the plan
    if (t < T.meet) {
      sandboxSet(t)
      drawSheet(x, t, { x: 540, y: 780, w: 640, h: 440, title: 'CASTLE.xlsx', cols: ['TASK', 'DUE'], rows: ROWS, pop: easeOutBack(prog(t, T.sheet, T.sheet + 0.35), 1.8), size: 32 })
      const r = kidCap(t, 520, 1310, 270, { case: true, glasses: true, mood: t < T.sheet ? 'determined' : 'happy', look: t < T.sheet ? [0, 0] : [0, -1], hops: [6.8, 7.4, 10.05] })
      pos.cap = [r.x, r.top]
      return
    }
    // ── the meeting nobody came to
    if (t < T.alone) {
      sandboxSet(t)
      const k = (i) => [Math.sin(t * 3 + i) * 30, Math.abs(Math.sin(t * 4 + i)) * -30]
      const [ax, ay] = k(1), [lx, ly] = k(2), [px, py] = k(3)
      drawBabyStar(x, 200 + ax, 1300 + ay, 190, t, { sign: 'aries', age: 'kid', mood: 'laugh', seed: 1 })
      const le = drawBabyStar(x, 820 + lx, 1330 + ly, 200, t, { sign: 'leo', age: 'kid', mood: t < 14.7 ? 'laugh' : 'happy', look: [-1, -0.2], seed: 5, hops: [14.8] })
      drawBabyStar(x, 600 + px, 1440 + py * 0.3, 170, t, { sign: 'pisces', age: 'kid', mood: 'happy', seed: 12 })
      pos.leo = [le.x, le.top]
      const r = kidCap(t, 380, 1250, 250, { case: true, mood: t < 14.7 ? 'determined' : 'pout', look: [1, 0], hops: [12.3, 12.75, 13.3] })
      pos.cap = [r.x, r.top]
      // the whistle
      if (t < 14.3) crayonText(x, 'TWEET!', 470, 1000, { size: 64, color: '#ff6fa8', rot: -0.15, seed: 2, alpha: prog(t, 12.25, 12.4) })
      return
    }
    // ── building alone, then the ball
    if (t < T.saturn) {
      const lonely = t >= T.sad
      sandboxSet(t, { dim: lonely ? 0.18 * prog(t, T.sad, T.sad + 1) : 0 })
      const smashK = prog(t, T.smash, T.smash + 0.25)
      const c = castle(x, t, 660, 1460, 7, { build: lonely ? 1 : ease.outCubic(prog(t, T.alone + 0.2, 19.6)), squash: smashK })
      if (c && !smashK) drawGhostCameo(x, t, { x: c.win[0], y: c.win[1] + 18, at: GHOST.at, dur: 1.4, from: 'below', cell: 2 })
      // the ruler
      if (t < T.smash) { x.fillStyle = INK; x.fillRect(786, 1180, 26, 290); x.fillStyle = '#ffd36e'; x.fillRect(790, 1184, 18, 282); for (let i = 0; i < 12; i++) x.fillRect(790, 1190 + i * 23, 10, 3) }
      // Aries's ball
      if (t > T.ball && t < T.sad) {
        const p = prog(t, T.ball, T.smash), q = prog(t, T.smash, T.smash + 0.9)
        const bx = t < T.smash ? lerp(-80, 620, p) : lerp(620, 1200, q), byy = t < T.smash ? 1300 - Math.abs(Math.sin(p * Math.PI * 2.5)) * 160 : 1330 - Math.sin(q * Math.PI) * 220
        x.fillStyle = INK; x.beginPath(); x.arc(bx, byy, 52, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ff5a5a'; x.beginPath(); x.arc(bx, byy, 46, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffffff'; x.fillRect(bx - 46, byy - 6, 92, 12); x.fillRect(bx - 20, byy - 30, 12, 10)
        const ar = drawBabyStar(x, t < T.smash ? lerp(-260, 170, p) : 170, 1250, 200, t, { sign: 'aries', age: 'kid', mood: t < T.smash ? 'determined' : 'wide', look: [1, 0], seed: 1, hops: [T.smash + 0.1, 22.8, 23.5] })
        pos.aries = [ar.x, ar.top]
      }
      burst(x, t, 660, 1380, T.smash, 12, 180, ['#f3d58f', '#e7c477', '#fff4e0'])
      const r = kidCap(t, lonely ? 520 : 440, lonely ? 1360 : 1250, 250, { glasses: !lonely, mood: lonely ? (t < 26.4 ? 'pout' : 'cry') : t < T.smash ? 'determined' : 'wide', look: lonely ? [0.3, 0.8] : [1, 0.2], hops: [18.25, 19.0], squash: lonely ? 0.12 : 0 })
      pos.cap = [r.x, r.top]
      if (lonely) drawSheet(x, t, { x: 260, y: 1520, w: 300, h: 220, title: 'CASTLE.xlsx', cols: ['TASK', 'DUE'], rows: ROWS.map(r0 => ({ ...r0, at: 0, hl: undefined })), pop: 1, size: 18 })
      return
    }
    // ── Saturn the principal
    if (t < T.win) {
      sandboxSet(t, { dim: 0.18 * (1 - prog(t, T.saturn, T.saturn + 1.5)) })
      castle(x, t, 660, 1460, 7, { build: 1, squash: 1 })
      const sIn = ease.outCubic(prog(t, T.saturn, T.saturn + 0.7))
      const s = drawSaturn(x, lerp(1300, 780, sIn), 1080, 300, t, { mood: t < 34.8 ? 'neutral' : 'happy', look: [-1, 0.4], pointer: t > 34.8 && t < 37.4, hops: [30.6, 34.85, 37.55], seed: 4 })
      pos.saturn = [s.x, s.top]
      const typing = t >= T.fun
      drawSheet(x, t, { x: 300, y: 1530, w: 400, h: 280, title: 'CASTLE.xlsx', cols: ['TASK', 'DUE'], rows: typing ? ROWS2.map((r0, i) => i === 3 ? { ...r0, at: T.fun + 0.1 } : { ...r0, at: 0 }) : ROWS.map(r0 => ({ ...r0, at: 0, hl: undefined })), pop: easeOutBack(prog(t, T.fun - 0.3, T.fun), 1.6) * 0.4 + 0.6, size: 24 })
      const r = kidCap(t, 360, 1250, 250, { mood: t < 33.0 ? 'pout' : t < 37.4 ? 'wide' : 'happy', look: [1, -0.4], hops: [33.05, T.fun + 0.15] })
      pos.cap = [r.x, r.top]
      return
    }
    // ── together
    sandboxSet(t)
    const together = t >= T.build
    const buildK = together ? ease.outCubic(prog(t, T.build, 46.6)) : 0
    moat(x, t, 560, 1460, 7, buildK)
    castle(x, t, 560, 1460, 7, { build: together ? buildK : 0, crooked: together ? 1 : 0 })
    const bounce = i => (together ? -Math.abs(Math.sin(t * 5 + i)) * 20 : 0)
    const ar = drawBabyStar(x, 170, 1330 + bounce(1), 180, t, { sign: 'aries', age: 'kid', mood: 'happy', seed: 1 })
    void ar
    const pi = drawBabyStar(x, 900, 1400 + bounce(2), 180, t, { sign: 'pisces', age: 'kid', mood: t > T.photo && t < T.photo + 0.6 ? 'happy' : 'laugh', look: [-1, 0], seed: 12, hops: [44.55] })
    pos.pisces = [pi.x, pi.top]
    // Leo pulls Capricorn in by the hand (the emotional beat), then they build side by side
    const pull = ease.inOutQuad(prog(t, 43.0, T.build))
    const capX = together ? 330 : lerp(250, 320, pull), capY = 1300
    const leX = together ? 760 : lerp(560, 480, pull)
    const le = drawBabyStar(x, leX, 1290 + bounce(3), 210, t, { sign: 'leo', age: 'kid', mood: 'happy', look: [-1, 0], seed: 5, hops: [42.45, 43.1] })
    pos.leo = [le.x, le.top]
    if (t < T.grow) {
      const r = kidCap(t, capX, capY + bounce(4), 240, { mood: t < 43.0 ? 'wide' : together ? 'laugh' : 'happy', look: [1, 0], hops: [43.05] })
      pos.cap = [r.x, r.top]
      if (!together) {
        // the held hands
        x.fillStyle = INK; x.fillRect(capX + 90, 1318, leX - capX - 170, 22); x.fillStyle = '#ffd6a0'; x.fillRect(capX + 94, 1322, leX - capX - 178, 14)
        if (t > 42.6) crayonText(x, '♥', (capX + leX) / 2, 1270 - Math.sin(t * 4) * 6, { size: 52, color: '#ff4f86', seed: 3 })
      }
    } else {
      // growUp: today's Capricorn in the sandbox, tie loose, a bucket instead of a briefcase
      const gx = 330, gy = 1290
      if (t < T.grow + 1.5) growUp(x, t, { sign: 'capricorn', at: T.grow, x: gx, y: gy, size: 280, look: [1, -0.2], seed: 10 })
      else drawCap(x, gx, gy, 280, t, { tie: 'loose', mood: 'happy', look: [1, -0.2], seed: 10 })
      if (t > T.grow + 0.85) { x.fillStyle = INK; x.fillRect(gx - 196, gy + 50, 76, 70); x.fillStyle = '#ff6fa8'; x.fillRect(gx - 190, gy + 56, 64, 58); x.fillStyle = '#ffb3cc'; x.fillRect(gx - 190, gy + 56, 64, 10) }
    }
    // Saturn takes the photo
    const sIn = ease.outCubic(prog(t, 46.1, 46.5)) * (1 - ease.inCubic(prog(t, 48.6, 49.2)))
    if (sIn > 0) { const s = drawSaturn(x, lerp(1260, 840, sIn), 900, 220, t, { mood: 'happy', prop: 'camera', pointer: false, look: [-1, 0.5], hops: [46.45], seed: 4 }); pos.saturn = [s.x, s.top] }
    burst(x, t, 560, 1200, T.build + 0.2, 10, 220)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const Z = t < T.yard ? { z: 1.08, cx: 540, cy: 1250 } : { z: 1.16, cx: 540, cy: 1300 }
      x.translate(Z.cx, Z.cy); x.scale(Z.z, Z.z); x.translate(-Z.cx, -Z.cy)
      for (const k in pos) delete pos[k]
      if (t < T.yard) nursery(t)
      else scene(t)
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
      for (const g of TAGS) ageCaptionSafe(ageCaption, x, t, { ...g, y: 1650, color: '#a8f5d6' })
      factChip(x, t, FACT)
      if (t > T.photo && t < T.photo + 0.5) { x.save(); x.globalAlpha = 0.85 * (1 - prog(t, T.photo, T.photo + 0.5)); x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawHomeVideo(x, t, { alpha: t < T.hookOut ? 0 : 1 - prog(t, T.last - 0.3, T.last) })
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#fff4fb'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [T.yard, T.meet, T.alone, T.sad, T.saturn, T.win]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E10' }), cardCuts(CARD_CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: WHO[s.who].pitch })),
  ...TAGS.filter(g => g.at > 0).flatMap(g => ageCaptionCues(g.at)),
  ...[0.3, 0.5, 0.8, 1.1, 1.3, 1.9, 2.2, 3.4, 3.6, 4.0, 5.2, 5.5].map(d => ['tick', d, 0.012]),
  ['glitter', T.sheet, T.sheet + 0.7], ['pop', T.sheet + 0.05, 1046.5, 0.03, 0],
  ...ROWS.map(r => ['tick', r.at, 0.016]),
  ['pop', 12.25, 2793.83, 0.04, 0], ['pop', 12.32, 2637.02, 0.035, 0], ['pop', 12.4, 2793.83, 0.03, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.ball, 0.6, 0.03], ['tick', 21.95, 0.02], ['tick', 22.15, 0.02],
  ['boom', T.smash, 0.12], ['whoosh', T.smash, 0.4, 0.04], ['glitter', T.smash, T.smash + 0.6],
  ['bell', T.sad + 0.1, 392, 0.025, 2.4, 0],
  ['whoosh', T.saturn, 0.6, 0.03], ['bell', T.saturn + 0.5, 523.25, 0.03, 2.2, 0],
  ...factChipCues(FACT.at, FACT),
  ['pop', T.fun + 0.1, 1318.51, 0.03, 0], ['glitter', T.fun + 0.6, T.fun + 1.2],
  ['bell', 42.5, 783.99, 0.03, 2.2, 0], ['bell', 42.65, 1046.5, 0.025, 2.2, 0],
  ['glitter', T.build, T.build + 1.6], ...[0, 0.4, 0.8, 1.2, 1.6, 2.0].map(d => ['pop', r3(T.build + d), [523.25, 587.33, 659.25, 783.99, 880, 1046.5][d * 2.5 | 0], 0.022, 0]),
  ['tick', T.photo - 0.05, 0.04], ['whoosh', T.photo, 0.3, 0.03], ['pop', T.photo + 0.02, 2093, 0.03, 0],
  ...growUpCues(T.grow),
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [523.25, 622.25, 698.46, 783.99][i], 0.038, 0]), ['pluck', T.last + 0.35, 783.99, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
