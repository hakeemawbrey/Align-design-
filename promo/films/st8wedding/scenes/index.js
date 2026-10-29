// st8wedding (60 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E25, the season finale: a wedding) · story
// 0–55.6, then the shared end card.
//   "They *waited.* | Today's the day."  Leo × Aquarius marry on the Houston rooftop (season 5's), under a flower arch,
//   AFTER Venus went direct, on purpose ("yes. slowly.", season 5). Saturn officiates, the ghost is the ring bearer,
//   Ophiuchus does the flowers, the Aunties cry on their doily, Pluto and Mars send cards, Venus gives the toast as the
//   Morning Star, the vows call back seasons 4 and 5, and the Moon catches the bouquet.
//   0.00       frame 0: the hook card is up; the couple under the arch, Ophiuchus mid-throw, petals in the air, SEASON
//              FINALE bug. The loop it opens: did they really wait, and is today the day?
//   2.35       PREVIOUSLY ON ★ EX RETROGRADE: six genre titles flip by (E01 news … E23 airport), the day chip racing from
//              DAY 01 to DIRECT.
//   5.40       the rooftop, everyone. "Leo × *Aquarius.*"  SATURN: "they waited for Venus to go direct. *on purpose.*"
//              (7.6: the ghost peeks from behind the arch's right pillar, nervous.)  SATURN: "the rings, please."  The ghost
//              floats in with the ring pillow.
//   12.3       "The *vows.*"  LEO: "you're my favorite *person.*" (S4 E099) · AQUARIUS: "you're my favorite *spotlight.*" (S4
//              E099) · LEO: "you said yes. *slowly.* worth it." (S5 E10) · AQUARIUS: "fixed means *committed.*" (S4 E099)
//              SATURN: "then i pronounce you *married.*"
//   25.0       "*Married.*"  Bells, confetti, the Aunties' tears turn into fountains.
//   28.4       "The *cards.*"  Pluto's card ("congrats. genuinely.") and Mars's ("wishing you both well. respectfully, from
//              far away."), each with its sender as the stamp.
//   33.2       "The *toast.*"  Venus, the gold-rimmed Morning Star: "six weeks i spent looking *backwards.*"  →  "to you two:
//              choosing each other, *daily.*"  Clink.
//   39.5       "The *bouquet…*"  Aquarius tosses it high, and the Moon drifts down and catches it (gasp zoom).
//              MOON: "oh! …okay. i'll take it *slowly.*"
//   45.0       "Choose *forward.* | Together."  The last shot rhymes with frame 0 (the couple under the arch, Ophiuchus
//              throwing petals), now married; the sky warms to dawn and the Morning Star rises over the skyline; fireworks.
// Hidden comet: a far, tiny one crosses the top of the sky at 20.3 (not ours; ours left in E24 for about 76 years).
// Rewatch bait: the cake topper is a tiny Saturn; and in the PREVIOUSLY montage, the day chip passes DAY 37 (E21's).
// Real: Venus retrograde lasts about six weeks, then stations direct; after inferior conjunction Venus is the Morning
// Star, rising before the Sun (hence dawn at the end). Leo is ruled by the Sun; Aquarius by Saturn (traditional) and
// Uranus (modern): fitting that Saturn officiates. No compatibility verdicts; the advice is the vows.
// One canvas (sky + rooftop + cast), DOM type, the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, drawGhostSheet } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { OPH, SATURN, drawOphiuchus, drawSaturn, drawTwin, drawPluto, drawBits, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { VENUS, drawVenus, drawMars, drawComet, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { CROWN, CROWN_C, makeSkyline, drawRooftop, floatHearts } from './roof.js'
import { auntie, makeDoily, drawDoily, drawTears } from './props.js'

export const DURATION = 60
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const W = 1080
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff', MINT = '#7fe0b8', DAWN = '#ffb26b'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"

// ── the timeline
const T = {
  hookOut: 2.3, prev: [2.35, 5.4],
  roof: 5.4, cast: 5.45, hR: 5.6, hRLand: 6.0, hROut: [12.0, 12.2],
  open1: 5.8, l1: 6.0, peek: 7.6, l2: 9.6, ring: [10.0, 11.3],
  hV: 12.3, hVLand: 12.7, hVOut: [25.2, 25.4], l3: 12.5, l4: 15.2, l5: 18.0, l6: 21.0, l7: 23.5, close1: 26.3,
  comet: 20.3, married: 25.0, hM: 25.45, hMOut: [28.15, 28.35],
  hC: 28.45, hCLand: 28.85, hCOut: [32.95, 33.15], card1: 28.7, card2: 29.9, cardsOut: [32.8, 33.1],
  venus: 33.2, hT: 33.3, hTLand: 33.7, hTOut: [39.2, 39.4], open2: 33.35, l8: 33.5, l9: 36.6, clink: 38.75,
  hB: 39.5, hBLand: 39.9, hBOut: [44.6, 44.8], toss: [39.7, 41.2], moonIn: [40.1, 41.1], catch: 41.2, gasp: 41.3, l10: 42.0, close2: 44.7,
  last: 45.0, confetti2: 47.4, dawn: [48.6, 52.0], rise: [49.6, 52.6], fireworks: [52.4, 53.3], lastOut: [55.0, 55.35], out: [55.0, 55.4],
}
const LEON = '♌ LEO', AQUN = '♒ AQUARIUS', SATN = SATURN.tag, VEN = VENUS.tag, MON = '☽ THE MOON'
const COL = id => signStar(id).color
const LINES1 = [
  { t: T.l1, speaker: SATN, text: 'they waited for Venus to go direct. *on purpose.*', color: SATURN.tagColor },
  { t: T.l2, speaker: SATN, text: 'the rings, please.', color: SATURN.tagColor },
  { t: T.l3, speaker: LEON, text: 'you’re my favorite *person.*', color: COL('leo') },
  { t: T.l4, speaker: AQUN, text: 'you’re my favorite *spotlight.*', color: COL('aquarius') },
  { t: T.l5, speaker: LEON, text: 'you said yes. *slowly.* worth it.', color: COL('leo') },
  { t: T.l6, speaker: AQUN, text: 'fixed means *committed.*', color: COL('aquarius') },
  { t: T.l7, speaker: SATN, text: 'then i pronounce you *married.*', color: SATURN.tagColor },
]
const LINES2 = [
  { t: T.l8, speaker: VEN, text: 'six weeks i spent looking *backwards.*', color: VENUS.tagColor },
  { t: T.l9, speaker: VEN, text: 'to you two: choosing each other, *daily.*', color: VENUS.tagColor },
  { t: T.l10, speaker: MON, text: 'oh! …okay. i’ll take it *slowly.*', color: MOONLIGHT },
]
const CPS = 28
const LT1 = lineTimes(LINES1, { cps: CPS })
const HOOK = 'They *waited.* | Today’s the day.'
const LAST = 'Choose *forward.* | Together.'
const PREV = [['BREAKING NEWS', 'E01'], ['HORROR TRAILER', 'E02'], ['NATURE DOC', 'E03'], ['GAME SHOW', 'E05'], ['FILM NOIR', 'E16'], ['AIRPORT SPRINT', 'E23']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inPrev = t => t >= T.prev[0] && t < T.prev[1]

// ── layout
const ROOF_Y = 1420
const ARCH = { x: 540, r: 250, top: 730 }                       // a flower arch: semicircle on two flower pillars
const SAT0 = { x: 540, y: 1118, size: 196 }
const LEO = { x: 396, y: 1306, size: 240, seed: 82 }
const AQU = { x: 684, y: 1306, size: 240, seed: 83 }
const OPH0 = { x: 128, y: 1266, size: 180 }
const VEN0 = { x: 912, y: 1276, size: 220 }
const GUESTS = [
  ['aries', 64, 942], ['taurus', 160, 912], ['gemini', 250, 950], ['twin', 120, 1020], ['cancer', 212, 1030],
  ['virgo', 830, 950], ['libra', 920, 912], ['scorpio', 1012, 946], ['sagittarius', 868, 1030], ['capricorn', 962, 1022], ['pisces', 1040, 1060],
].map(([id, x, y], i) => ({ id, x, y: y + 90, size: 88, seed: 90 + i, at: T.cast + 0.04 * i }))
const DOILY = { x: 880, y: 680, rx: 186, ry: 44 }
const AUN_C = { x: 814, y: 608, s: 122 }, AUN_T = { x: 952, y: 614, s: 116 }
const MOON0 = { x: 250, y: 850 }
const PILLOW = { x: 540, y: 1420 }
export const GHOST = { at: T.peek, x: ARCH.x + ARCH.r + 20, y: 1050, where: 'peeking out from behind the flower arch’s right pillar, nervous, just before it brings the rings' }
export const COMET = { at: T.comet }

const FLOWER = ['.p.w.p.', 'pPpwpPp', '.p.y.p.', 'w.gPg.w', 'wyw.yYw', '.wgggw.', '..ggg..', '...r...', '..rRr..', '...g...', '...g...']
const FLOWER_C = { p: '#ff8fb1', P: '#ff4f86', w: '#fff3f8', y: '#f7c948', Y: '#ffe08a', g: '#5fc46a', r: '#c9a6ff', R: '#a46cff' }
const BLOOM = ['.pp.', 'pPPp', 'pPPp', '.pp.']
const RING = ['.yy.', 'y..y', 'y..y', '.yy.']
const PETAL_COLS = ['#ff8fb1', '#fff3f8', '#ffb3cc', '#f7c948']

function coupleState(t, who) {
  if (inPrev(t)) return { mood: 'happy' }
  if (t < T.l3) return { mood: 'sparkle', look: [who === 'leo' ? 1 : -1, 0] }
  if (t < T.married) return { mood: (who === 'leo' && t >= T.l3 && t < T.l4) || (who === 'aqu' && t >= T.l4 && t < T.l5) ? 'heart' : 'sparkle', look: [who === 'leo' ? 1 : -1, 0] }
  if (t < T.hC) return { mood: 'heart' }
  if (t < T.toss[0]) return { mood: 'happy' }
  if (t < T.catch + 1.5) return { mood: 'wide', look: [-1, -1], blink: false }
  return { mood: t < T.last + 1 ? 'happy' : 'heart' }
}
const LEO_HOPS = [0.1, T.cast + 0.3, ...talkHops(LINES1, LEON, { cps: CPS }), T.married, T.married + 0.45, T.last + 0.6]
const AQU_HOPS = [0.2, T.cast + 0.35, ...talkHops(LINES1, AQUN, { cps: CPS }), T.married, T.married + 0.45, T.toss[0], T.last + 0.7]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const SKYLINE = makeSkyline(2508, { base: ROOF_Y, lo: 80, hi: 300 })
  const DOILY_IMG = makeDoily(document, 66)

  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, accentColor: GOLD })
  const HR = popText(root, 'Leo × *Aquarius.*', { top: 236, size: 112, accentSize: 172, at: T.hR, gap: 0.09, accentColor: CYAN, wobble: true, late: 1, lateAt: T.hRLand, fit: true })
  const HV = popText(root, 'The *vows.*', { top: 236, size: 124, accentSize: 190, at: T.hV, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.hVLand, fit: true })
  const HM = popText(root, '*Married.*', { top: 226, size: 124, accentSize: 210, at: T.hM, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.hM, fit: true })
  const HC = popText(root, 'The *cards.*', { top: 236, size: 124, accentSize: 190, at: T.hC, gap: 0.09, accentColor: LAV, wobble: true, late: 1, lateAt: T.hCLand, fit: true })
  const HT = popText(root, 'The *toast.*', { top: 236, size: 124, accentSize: 190, at: T.hT, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.hTLand, fit: true })
  const HB = popText(root, 'The *bouquet…*', { top: 236, size: 124, accentSize: 190, at: T.hB, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.hBLand, fit: true })
  const HEADS = [[HR, T.hROut], [HV, T.hVOut], [HM, T.hMOut], [HC, T.hCOut], [HT, T.hTOut], [HB, T.hBOut]]
  const last = hookCard(root, { text: LAST, at: T.last, out: T.lastOut, size: 116, accentSize: 176, accentColor: MINT })
  const box1 = dialogueBox(root, { lines: LINES1, y: 1452, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1452, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // the Moon's crescent sprite (stmoon / st4moon1): a 34-cell disc minus an offset disc, shaded + craters
  const CG = 34
  const cres = document.createElement('canvas'); cres.width = cres.height = CG + 2
  {
    const o = cres.getContext('2d'), h = CG / 2
    const on = (i, j) => { const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h; return Math.hypot(u, v) <= 1 && Math.hypot(u - 0.62, v + 0.1) > 0.78 }
    for (let j = -1; j <= CG; j++) for (let i = -1; i <= CG; i++) {
      if (on(i, j)) {
        const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h
        let c = u + v < -0.5 ? '#fffbea' : u * 0.3 + v > 0.45 ? '#c9bfe6' : '#f1ecff'
        if ([[-0.62, -0.1, 0.12], [-0.4, 0.5, 0.09], [-0.25, -0.62, 0.08]].some(([a, b, r]) => Math.hypot(u - a, v - b) < r)) c = '#d6cdf2'
        o.fillStyle = c; o.fillRect(i + 1, j + 1, 1, 1)
      } else if (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) { o.fillStyle = '#3a2a6e'; o.fillRect(i + 1, j + 1, 1, 1) }
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function mono(text, cx, cy, size, col, { align = 'center', shadow = true, ls = 0 } = {}) {
    x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.letterSpacing = ls + 'px'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, cx + 2, cy + 3) }
    x.fillStyle = col; x.fillText(text, cx, cy); x.letterSpacing = '0px'
  }

  // ── the flower arch: blooms along a semicircle and down two pillars, on green vines
  const ARCH_PTS = (() => {
    const out = [], { x: cx, r, top } = ARCH, cy = top + r
    for (let i = 0; i <= 18; i++) { const a = Math.PI + i / 18 * Math.PI; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, i]) }
    for (let yy = cy + 40; yy < ROOF_Y - 20; yy += 46) { out.push([cx - r, yy, out.length]); out.push([cx + r, yy, out.length]) }
    return out
  })()
  function arch(t, k = 1) {
    if (k <= 0) return
    const { x: cx, r, top } = ARCH, cy = top + r
    x.save(); x.globalAlpha = k
    x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(cx, cy, r, Math.PI, 0); x.stroke()
    x.strokeStyle = '#3f8a4a'; x.lineWidth = 12; x.beginPath(); x.arc(cx, cy, r, Math.PI, 0); x.stroke()
    for (const sx of [cx - r, cx + r]) { x.fillStyle = INK; x.fillRect(sx - 11, cy, 22, ROOF_Y - cy); x.fillStyle = '#3f8a4a'; x.fillRect(sx - 6, cy, 12, ROOF_Y - cy) }
    for (const [ax, ay, i] of ARCH_PTS) {
      const sway = Math.sin(t * 1.8 + i) * 2
      drawBits(x, i % 3 === 0 ? FLOWER.slice(0, 6) : BLOOM, i % 3 === 0 ? FLOWER_C : { p: i % 2 ? '#ffb3cc' : '#fff3f8', P: i % 2 ? '#ff4f86' : '#f7c948' }, Math.round(ax + sway), Math.round(ay), 6)
    }
    x.restore()
  }
  // the aisle runner with petals, down the middle of the roof
  function aisle(t) {
    x.fillStyle = 'rgba(255,143,177,0.22)'
    x.beginPath(); x.moveTo(470, ROOF_Y + 22); x.lineTo(610, ROOF_Y + 22); x.lineTo(790, 1920); x.lineTo(290, 1920); x.closePath(); x.fill()
    x.strokeStyle = rgba(GOLD, 0.6); x.lineWidth = 4; x.stroke()
    const r = rng(77)
    for (let i = 0; i < 40; i++) { const v = r(), yy = ROOF_Y + 30 + v * (1920 - ROOF_Y - 30), half = lerp(70, 250, v); x.fillStyle = PETAL_COLS[i % 4]; x.fillRect(Math.round(540 + (r() - 0.5) * 2 * half), Math.round(yy), 10, 8) }
  }
  // Ophiuchus's petals: thrown in arcs from its hand toward the arch
  function petals(t, t0, t1, ox, oy) {
    for (let b = Math.max(t0, Math.floor((t - 1.6 - t0) / 0.18) * 0.18 + t0); b < Math.min(t, t1); b += 0.18) {
      const p = (t - b) / 1.6; if (p < 0 || p > 1) continue
      const k = Math.round(b * 100), dx = 260 + (k % 7) * 40, up = 260 + (k % 5) * 50
      const px = ox + dx * p, py = oy - up * Math.sin(Math.PI * p * 0.9) + p * 120
      x.globalAlpha = 1 - ease.inQuad(prog(p, 0.7, 1)); x.fillStyle = PETAL_COLS[k % 4]; x.fillRect(Math.round(px), Math.round(py), 10, 8); x.globalAlpha = 1
    }
  }
  function confetti(t, t0, life = 3.2, n = 60) {
    const p = (t - t0) / life
    if (p < 0 || p > 1) return
    for (let i = 0; i < n; i++) {
      const r = rng(i * 31 + Math.round(t0 * 10)), cx = r() * W, vy = 300 + r() * 500
      const yy = 440 + (vy * (t - t0)) % 1400 - 200 * (1 - p), sx = Math.sin(t * 5 + i) * 20
      x.globalAlpha = 1 - ease.inQuad(prog(p, 0.75, 1)); x.fillStyle = [GOLD, PINK, MINT, LAV, BONE][i % 5]
      x.fillRect(Math.round(cx + sx), Math.round(yy), 12, i % 2 ? 8 : 14); x.globalAlpha = 1
    }
  }
  function fireworks(t, t0, cx, cy, col, seed) {
    const p = (t - t0) / 1.4
    if (p < 0 || p > 1) return
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + seed, d = 30 + 170 * ease.outCubic(p); x.globalAlpha = 1 - p; drawPixelStar(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d + p * p * 40, 18, 1, col) }
    x.globalAlpha = 1
    glow(cx, cy, 200, col, 0.6 * (1 - p))
  }
  // the ring bearer: the ghost floats in from the left with a little pillow and two gold rings
  function ringBearer(t) {
    if (t < T.ring[0] || inPrev(t)) return
    const p = ease.outCubic(prog(t, ...T.ring))
    const gx2 = lerp(-80, PILLOW.x, p), gy2 = PILLOW.y - 70 + Math.sin(t * 2.2) * 8 - Math.sin(Math.PI * p) * 90
    const leave = ease.inCubic(prog(t, T.married + 0.3, T.married + 1.5))
    const fx = lerp(gx2, 990, leave), fy = lerp(gy2, 1350, leave)
    drawGhostSheet(x, t, fx, fy, 4, { look: t < T.ring[1] ? [1, 0] : [0, -1], blush: t > T.ring[1] ? 1 : 0 })
    // the pillow + rings (rings go to the couple at the pronouncement)
    if (t < T.married) {
      x.fillStyle = INK; x.fillRect(fx - 46, fy + 54, 92, 34); x.fillStyle = '#fff3f8'; x.fillRect(fx - 42, fy + 58, 84, 26)
      drawBits(x, RING, { y: '#f7c948' }, fx - 14, fy + 56, 4); drawBits(x, RING, { y: '#ffe08a' }, fx + 14, fy + 56, 4)
      if (Math.floor(t * 3) % 3 === 0) drawPixelStar(x, fx + 22, fy + 44, 16, 1, '#fff6c8')
    }
  }
  // the two cards (Pluto's and Mars's), each with its sender as the stamp
  function card(t, at, cx, cy, rot, lines, stamp) {
    const k = pop01(t, at, 0.4, 2.0) * outK(t, T.cardsOut)
    if (k <= 0.01 || t < at || t > T.cardsOut[1]) return
    x.save(); x.translate(cx, cy + (1 - k) * 60); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-206, -146, 412, 292); x.fillStyle = '#fff6ea'; x.fillRect(-198, -138, 396, 276)
    x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-184, -124, 368, 248)
    lines.forEach(([txt, font, col], i) => { x.font = font; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(txt, -164, -70 + i * 52) })
    // the stamp
    x.fillStyle = INK; x.fillRect(96, -118, 84, 96); x.fillStyle = '#efe6f6'; x.fillRect(100, -114, 76, 88)
    stamp(138, -70)
    x.restore()
  }
  function moon(t) {
    const a = prog(t, ...T.moonIn)
    if (a <= 0 || inPrev(t)) return
    const p = ease.outCubic(a)
    const cx = lerp(-160, MOON0.x, p), cy = lerp(600, MOON0.y, p) + Math.sin(t * 1.6) * 8
    const R = 110, cell = Math.max(2, Math.round(2 * R / CG))
    glow(cx - 30, cy, R * 2, MOONLIGHT, 0.7)
    x.save(); x.imageSmoothingEnabled = false; x.translate(Math.round(cx - 30), Math.round(cy)); x.rotate(-0.18)
    x.drawImage(cres, -cell * (CG / 2 + 1), -cell * (CG / 2 + 1), cell * (CG + 2), cell * (CG + 2)); x.restore()
    const held = t >= T.catch
    const st = !held ? { mood: 'sleepy' } : t < T.gasp + 1.3 ? { mood: 'wide', look: [0, -1], blink: false } : t < T.l10 + 1.2 ? { mood: 'happy' } : { mood: 'heart' }
    const r = drawStarChar(x, cx + 30, cy + 20, 150, t, { color: MOONC, glyph: '☽', ...st, blush: held, hops: [T.catch, ...talkHops(LINES2, MON, { cps: CPS })], seed: 7, glow: 1.1 })
    if (held) drawBits(x, FLOWER, FLOWER_C, r.x + 70, r.y - 20, 7, { rot: 0.3 })
    return r
  }
  // PREVIOUSLY ON ★ EX RETROGRADE: the season's genres flip by; the day chip races to DIRECT
  function previously(t) {
    if (!inPrev(t)) return
    const [a, b] = T.prev, p = prog(t, a, b)
    x.fillStyle = 'rgba(6,4,16,0.94)'; x.fillRect(0, 0, W, 1920)
    for (let yy = 0; yy < 1920; yy += 6) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect(0, yy, W, 2) }
    mono('PREVIOUSLY ON', 540, 640, 34, BONE, { ls: 6 })
    x.save(); x.translate(540, 730); x.fillStyle = INK; x.fillRect(-380, -46, 760, 92); x.fillStyle = GOLD; x.fillRect(-372, -38, 744, 76)
    x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('★ EX RETROGRADE ★', 0, 3); x.restore()
    const n = PREV.length, i = Math.min(n - 1, Math.floor((t - a - 0.25) / ((b - a - 0.5) / n)))
    if (i >= 0) {
      const ti = a + 0.25 + i * ((b - a - 0.5) / n), k = easeOutBack(prog(t, ti, ti + 0.18), 2.6)
      x.save(); x.translate(540, 960); x.rotate((i % 2 ? 1 : -1) * 0.04); x.scale(k, k)
      x.font = `800 96px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(PREV[i][0], 5, 7); x.fillStyle = BONE; x.fillText(PREV[i][0], 0, 0)
      x.font = `italic 500 64px ${SERIF}`; x.fillStyle = [PINK, CYAN, MINT, GOLD, LAV, DAWN][i]; x.fillText(PREV[i][1], 0, 96)
      x.restore()
    }
    // the day counter
    const day = Math.min(42, Math.max(1, Math.round(lerp(1, 42, prog(t, a + 0.2, b - 0.5)))))
    const done = t > b - 0.5
    x.save(); x.translate(540, 1240)
    x.fillStyle = INK; x.fillRect(-250, -48, 500, 96); x.fillStyle = done ? '#123a2c' : '#3a1230'; x.fillRect(-242, -40, 484, 80)
    mono(done ? '♀ DIRECT ✓' : `♀ Rx · DAY ${String(day).padStart(2, '0')}`, 0, 2, 44, done ? MINT : PINK, { shadow: false })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = popOut(t, T.out)
      // the dawn, warming the sky behind the skyline at the end (the Morning Star's hour)
      const dawn = ease.inOutCubic(prog(t, ...T.dawn))
      if (dawn > 0) { const g = x.createLinearGradient(0, 700, 0, ROOF_Y); g.addColorStop(0, rgba(DAWN, 0)); g.addColorStop(0.6, rgba('#ff8fb1', 0.35 * dawn)); g.addColorStop(1, rgba(DAWN, 0.8 * dawn)); x.fillStyle = g; x.fillRect(0, 700, W, ROOF_Y - 700) }
      // Venus rising as the Morning Star over the skyline (drawn before the buildings, so she rises from behind them)
      const rise = ease.outCubic(prog(t, ...T.rise))
      if (rise > 0) { const vy = lerp(1180, 860, rise); glow(700, vy, 300, GOLD, rise); drawVenus(x, 700, vy, 120, t, { mood: 'happy', morning: 1, retro: 0, seed: 5, alpha: ok }); if (rise > 0.6) mono('★ THE MORNING STAR', 700, vy - 112, 24, GOLD) }
      // the far, tiny comet (not ours)
      const cp = prog(t, T.comet, T.comet + 2)
      drawComet(x, lerp(1140, -60, cp), lerp(470, 540, cp), 24, t, { aura: false, exPin: false, tail: 70, mood: 'happy', sunDir: [-0.3, 1], alpha: cp > 0 && cp < 1 ? 0.7 : 0 })

      const zG = gaspZoom(t, { at: T.gasp, dur: 1.3, x: MOON0.x, y: MOON0.y, amount: 0.3, follow: 0.6, cy: 960 })
      x.save(); zG.apply(x)
      drawRooftop(x, t, SKYLINE, 1)
      aisle(t)
      arch(t, 1)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      const castK = t < T.prev[0] ? 1 : pop01(t, T.cast, 0.4, 1.8)
      // the guests
      for (const m of GUESTS) {
        const p = (t < T.prev[0] ? 1 : pop01(t, m.at, 0.35, 2.2)) * ok
        if (p <= 0.02) continue
        const look = t >= T.toss[0] && t < T.catch + 1.5 ? [-1, -1] : [clamp((540 - m.x) / 400, -1, 1), 0.5]
        const mood = t >= T.married && t < T.married + 3 ? 'heart' : t >= T.toss[0] && t < T.catch + 1.5 ? 'wide' : 'happy'
        const o = { mood, look, pop: p, seed: m.seed, glow: 0.7, hops: [m.at + 0.3, T.married + (m.seed % 4) * 0.08, T.catch + 0.1 + (m.seed % 3) * 0.05], blink: mood === 'wide' ? false : undefined }
        if (m.id === 'twin') drawTwin(x, m.x, m.y, m.size, t, o)
        else { const st = signStar(m.id); drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: null, ...o }) }
      }
      // the Aunties on their doily, crying fountains at the pronouncement
      const ap = castK * ok, dy = Math.sin(t * 1.4) * 8
      drawDoily(x, DOILY_IMG, DOILY.x, DOILY.y + dy, DOILY.rx * ap, DOILY.ry * ap, clamp(ap))
      const CAN = signStar('cancer'), TAU = signStar('taurus')
      const aMood = t >= T.married && t < T.hC ? 'heart' : t >= T.toss[0] && t < T.catch + 1.5 ? 'wide' : 'sparkle'
      const rc = auntie(x, AUN_C.x, AUN_C.y + dy, AUN_C.s, t, { color: CAN.color, glyph: null, mood: aMood, look: [-1, 1], hops: [T.married, T.married + 0.4], seed: 3, pop: ap, glasses: { frame: '#b3203f', hi: '#ffe08a', chain: true, down: 0, fog: 0.2 } })
      const rt = auntie(x, AUN_T.x, AUN_T.y + dy, AUN_T.s, t, { color: TAU.color, glyph: null, mood: aMood, look: [-1, 1], hops: [T.married + 0.1, T.married + 0.5], seed: 8, pop: ap, glasses: { frame: '#5a2e14', hi: '#ffd98a', down: 0, fog: 0.2 } })
      if (t > T.married - 0.2 && t < T.hC + 0.5) for (const [r, sd] of [[rc, 2], [rt, 5]]) if (r.eyeY) drawTears(x, t, r.x, r.eyeY + r.cell * 3, r.eyeDX, Math.max(7, r.cell * 1.7), { amount: clamp(prog(t, T.married - 0.2, T.married + 0.3)) * (1 - prog(t, T.hC, T.hC + 0.5)), seed: sd, fountain: t > T.married + 0.6 })
      // Saturn, officiating, with the book; a tiny Saturn cake topper on the cake by the arch (rewatch bait)
      drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { mood: t >= T.married && t < T.married + 2.5 ? 'happy' : 'neutral', look: [0, 1], prop: 'book', pointer: false, pop: castK * ok, hops: [T.cast + 0.4, ...talkHops(LINES1, SATN, { cps: CPS }), T.married] })
      x.fillStyle = INK; x.fillRect(946, 1318, 112, 104); x.fillStyle = '#fff3f8'; x.fillRect(952, 1362, 100, 56); x.fillStyle = '#ffd1de'; x.fillRect(962, 1326, 80, 40); x.fillStyle = PINK; x.fillRect(952, 1362, 100, 8)
      drawSaturn(x, 1002, 1300, 52, t, { mood: 'happy', pointer: false, bob: 2, pop: castK * ok })
      // Ophiuchus, doing the flowers: petals at frame 0, and again in the last shot
      drawOphiuchus(x, OPH0.x, OPH0.y, OPH0.size, t, { mood: t >= T.toss[0] && t < T.catch + 1.5 ? 'wide' : 'sparkle', look: [1, -0.5], snake: 'heart', pop: castK * ok, hops: [0.35, 0.95, 1.55, T.married, T.last + 0.3, T.last + 0.9] })
      petals(t, -2, T.prev[0], OPH0.x + 60, OPH0.y - 60); petals(t, T.married, T.married + 1.8, OPH0.x + 60, OPH0.y - 60); petals(t, T.last - 0.2, STORY_END - 1, OPH0.x + 60, OPH0.y - 60)
      // the couple: Leo (crown) and Aquarius, under the arch
      const lk = castK * ok
      const rL = drawStarChar(x, LEO.x, LEO.y, LEO.size, t, { color: COL('leo'), glyph: '♌', ...coupleState(t, 'leo'), pop: lk, hops: LEO_HOPS, seed: LEO.seed, glow: 1 })
      drawBits(x, CROWN, CROWN_C, Math.round(rL.x), Math.round(rL.top + 2), 7 * lk, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
      drawStarChar(x, AQU.x, AQU.y, AQU.size, t, { color: COL('aquarius'), glyph: '♒', ...coupleState(t, 'aqu'), pop: lk, hops: AQU_HOPS, seed: AQU.seed, glow: 1 })
      if (t >= T.married && !inPrev(t)) { floatHearts(x, t, 540, 1150, T.married, T.married + 3, 4, 6, 260); for (const [hx, hy] of [[LEO.x + 70, LEO.y + 40], [AQU.x - 70, AQU.y + 40]]) { drawBits(x, RING, { y: '#f7c948' }, hx, hy, 4); if (Math.floor(t * 2 + hx) % 4 === 0) drawPixelStar(x, hx + 10, hy - 12, 16, 1, '#fff6c8') } }
      ringBearer(t)
      // Venus arrives for the toast, glass in hand
      if (t >= T.venus && t < T.last) {
        const vk = pop01(t, T.venus, 0.4, 1.8) * (1 - prog(t, T.last - 0.4, T.last))
        const rv = drawVenus(x, VEN0.x, VEN0.y, VEN0.size, t, { mood: t < T.l9 ? 'sparkle' : t < T.clink + 0.6 ? 'happy' : 'heart', look: [-1, 0], morning: 1, retro: 0, pop: vk, hops: [T.venus + 0.3, ...talkHops(LINES2, VEN, { cps: CPS }), T.clink], seed: 5 })
        const raise = ease.outBack(prog(t, T.clink - 0.4, T.clink))
        const gx3 = rv.x - 120, gy3 = rv.y + 10 - raise * 110
        x.fillStyle = INK; x.fillRect(gx3 - 18, gy3 - 40, 36, 64); x.fillStyle = 'rgba(255,236,170,0.9)'; x.fillRect(gx3 - 13, gy3 - 34, 26, 30); x.fillStyle = BONE; x.fillRect(gx3 - 3, gy3 - 4, 6, 24); x.fillRect(gx3 - 14, gy3 + 18, 28, 6)
        if (t > T.clink && t < T.clink + 0.6) for (let i = 0; i < 6; i++) drawPixelStar(x, gx3 + Math.cos(i) * 50, gy3 - 50 + Math.sin(i) * 30, 22, 1, GOLD)
      }
      // the bouquet toss: up from Aquarius, over the crowd, into the Moon's arms
      const bp = prog(t, ...T.toss)
      if (bp > 0 && bp < 1) {
        const bx = lerp(AQU.x, MOON0.x + 100, bp), by = lerp(AQU.y - 140, MOON0.y, bp) - Math.sin(Math.PI * bp) * 520
        drawBits(x, FLOWER, FLOWER_C, bx, by, 8, { rot: bp * 9 })
      }
      moon(t)
      confetti(t, T.married, 3.4); confetti(t, T.confetti2, 3.4, 40)
      fireworks(t, T.fireworks[0], 300, 760, PINK, 0.2); fireworks(t, T.fireworks[1], 760, 700, GOLD, 0.7); fireworks(t, T.fireworks[1] + 0.9, 520, 620, MINT, 1.3)
      x.restore()
      drawGaspLines(x, t, { at: T.gasp, dur: 1.3, x: MOON0.x, y: MOON0.y, follow: 0.6, cy: 960, color: MOONLIGHT })
      // the cards from Pluto and Mars
      card(t, T.card1, 300, 980, -0.07, [['congrats.', `italic 500 52px ${SERIF}`, INK], ['genuinely.', `italic 500 52px ${SERIF}`, INK], ['— Pluto', `800 30px ${INTER}`, '#6a6080']],
        (sx, sy) => drawPluto(x, sx, sy, 60, t, { mood: 'happy', crownSlip: 0, bob: 0 }))
      card(t, T.card2, 780, 1080, 0.06, [['wishing you', `italic 500 46px ${SERIF}`, INK], ['both well.', `italic 500 46px ${SERIF}`, INK], ['respectfully, from', `800 28px ${INTER}`, '#8a3a24'], ['far away. — Mars', `800 28px ${INTER}`, '#8a3a24']],
        (sx, sy) => drawMars(x, sx, sy, 56, t, { mood: 'happy', moons: false, bob: 0 }))
      previously(t)
      genreBug(x, t, { text: inPrev(t) ? 'PREVIOUSLY' : 'SEASON FINALE', x: 70, y: 470, color: inPrev(t) ? LAV : PINK, alpha: ok })
      drawDayChip(x, t, { day: 42, phase: 'direct', text: 'DIRECT · WEDDING DAY' })
      box1.update(t); box2.update(t)
      hook.update(t); last.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.38 (PREVIOUSLY → the rooftop) and 44.85 (the bouquet → the last shot); cardfx keeps one.
const CUTS = [{ t: 5.38, kind: 'flip' }, { t: 44.85, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E25' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const PREV_T = PREV.map((_, i) => r3(T.prev[0] + 0.25 + i * ((T.prev[1] - T.prev[0] - 0.5) / PREV.length)))
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...[0.35, 0.95, 1.55].map(h => ['glitter', h, h + 0.4]),
  ['whoosh', T.prev[0], 0.3, 0.05], ...PREV_T.map((p, i) => ['tom', p, 140 - i * 10, { gain: 0.22 }]), ...PREV_T.map((p, i) => ['pop', p, NOTE[i], 0.035, 0]),
  ...Array.from({ length: 20 }, (_, i) => ['tick', r3(T.prev[0] + 0.2 + i * 0.12), 0.015]), ['bell', T.prev[1] - 0.5, 1318.51, 0.04, 1.2, 0],
  ...stingerCues(T.roof, { key: KEY, kind: 'wedding' }),
  ...wordPops(T.hR, 2, 0.09, 0, 0.026), ['pop', T.hRLand, 1046.5, 0.045, 0],
  ['pop', T.open1, 880, 0.04, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SATN]: 520, [LEON]: 784, [AQUN]: 659.25 } }),
  ['tick', T.peek + 0.05, 0.014],
  ['glitter', T.ring[0], T.ring[1]], ['bell', T.ring[1], 1760, 0.035, 1.6, 0],
  ...wordPops(T.hV, 1, 0.09, 1, 0.026), ['pop', T.hVLand, 1174.66, 0.045, 0],
  ['tick', T.comet + 1, 0.012],
  ...stingerCues(T.married, { key: KEY, kind: 'wedding' }), ['crash', T.married, { gain: 0.06, len: 2.4 }], ['glitter', T.married, T.married + 2],
  ['pop', T.hM, 1396.91, 0.05, 0],
  ['pop', T.close1, 880, 0.03, 0],
  ...wordPops(T.hC, 1, 0.09, 2, 0.026), ['pop', T.hCLand, 1046.5, 0.045, 0],
  ['whoosh', T.card1 - 0.2, 0.35, 0.035], ['pop', T.card1 + 0.3, 783.99, 0.045, -0.4], ['whoosh', T.card2 - 0.2, 0.35, 0.035], ['pop', T.card2 + 0.3, 932.33, 0.045, 0.4],
  ...wordPops(T.hT, 1, 0.09, 3, 0.026), ['pop', T.hTLand, 1174.66, 0.045, 0],
  ['pop', T.open2, 880, 0.04, 0],
  ...talkCues(LINES2, { cps: CPS, pitch: { [VEN]: 1046.5, [MON]: 880 } }),
  ['bell', T.clink, 2637.02, 0.05, 1.4, 0], ['bell', T.clink + 0.04, 3135.96, 0.035, 1.2, 0.2],
  ...wordPops(T.hB, 1, 0.09, 4, 0.026), ['pop', T.hBLand, 1318.51, 0.045, 0],
  ['whoosh', T.toss[0], 1.4, 0.05], ['riser', T.toss[0], T.catch, 0.05],
  ...gaspCues(T.gasp, { key: KEY }),
  ['pop', T.close2, 880, 0.03, 0],
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['glitter', T.confetti2, T.confetti2 + 1.2], ['swell', T.dawn[0], T.dawn[1], { gain: 0.04 }],
  ['bell', T.rise[0] + 1, 1396.91, 0.04, 2.6, 0], ['bell', T.rise[0] + 1.3, 1760, 0.03, 2.6, 0.2],
  ['boom', T.fireworks[0], 0.2], ['crash', T.fireworks[0] + 0.05, { gain: 0.04, len: 1.6 }], ['boom', T.fireworks[1], 0.18], ['boom', T.fireworks[1] + 0.9, 0.16],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
