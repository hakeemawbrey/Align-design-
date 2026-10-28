// st4live5th (EP 089, 20 s vertical Align ad, Star Talk season 4, thread A: the vote) · story 0–15.6, then the shared
// end card ("come" + the Align logo, CTA "SIGN UP TO VOTE YOUR CITY").
// The 5th-house sports booth from stlive5th is back (♊ GEMINI and ♐ SAG in headsets behind the desk, one shared mic,
// the chunky CRT), this time calling the city vote like a game, with no numbers and no leader.
//   0.00–4.20  "LIVE from the | *campaign trail.*"  The CRT clicks on (the drop, 1.71): a vote map (line art), Texas glowing
//              gold, the eight candidate cities as stars, a ticker naming all eight. GEMINI: "AND SEATTLE *PULSES!*"
//              (Seattle flares on screen) → SAG: "NEW YORK *ANSWERS!*" (New York flares back).
//   4.30–11.6  "No numbers. | Just *stars.*"  Every city pulses in turn, round-robin; the booth whips its heads side to
//              side. THE STARS (sitting on the TV): "no winner *yet.*" → "it's still anyone's *game.*" The box shuts.
//  11.75       card cut (flip).
//  11.85–15.5  "Anyone's *game.*"  All eight cities pulse together; the chyron reads STAY TUNED. The booth bops to the
//              groove. The ghost pops up behind the desk next to the mic. Everything pops out by 15.5.
// One canvas (sky + TV + booth), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { starFrame, inSprite, headsetCells, drawMic, drawTV, drawDesk } from './props.js'

export const DURATION = 20
export const EP = 89
const CTA = 'SIGN UP TO VOTE YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#e8344e', CYAN = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid
const GEM = signStar('gemini'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  tvIn: 0.18, deskIn: 0.32, gemIn: 0.45, sagIn: 0.58, micIn: 0.7, narrIn: 0.9,
  h0: 0.15, h0Land: 0.8, h0Out: [4.05, 4.25],
  on: BEAT(2),                                                 // 1.71 the TV clicks on
  open: 1.85, l1: 2.05, l2: 4.45,
  h1: 4.3, h1Land: 4.75, robin: [5.4, 8.6], l3: 6.95, l4: 8.95, close: 11.55, h1Out: [11.35, 11.55],
  cut: 11.75,
  h2: 11.85, h2Land: 12.2, all: 12.3,
  ghost: 13.2,
  h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const GT = `${GEM.glyph}︎ GEMINI`, ST = `${SAG.glyph}︎ SAG`, NARR = 'THE STARS'
const GC = '#ffd95a', SCOL = LAV
const LINES = [
  { t: T.l1, speaker: GT, text: 'AND SEATTLE *PULSES!*', color: GC },
  { t: T.l2, speaker: ST, text: 'NEW YORK *ANSWERS!*', color: SCOL },
  { t: T.l3, speaker: NARR, text: 'no winner *yet.*' },
  { t: T.l4, speaker: NARR, text: 'it’s still anyone’s *game.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GT, { cps: CPS }), SAG_HOPS = talkHops(LINES, ST, { cps: CPS }), NARR_HOPS = talkHops(LINES, NARR, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── geometry (the booth from stlive5th)
const TV = { x0: 120, y0: 500, w: 840, h: 660, sx0: 160, sy0: 530, sw: 760, sh: 520 }
const TVC = { x: 540, y: 830 }
const DESK = { x0: 140, x1: 940, y: 1392, h: 74 }
const G_DESK = { x: 300, y: 1278, s: 250 }, S_DESK = { x: 780, y: 1278, s: 250 }
const NARR_AT = { x: 858, s: 148 }
const MIC = { x: 540, y: DESK.y }
const GHOST_AT = { x: 616, y: DESK.y - 6 }

// ── the vote map on the CRT (lon/lat → screen px; a stylised outline, not exact geography)
const SCR = { cx: TV.sx0 + TV.sw / 2, cy: TV.sy0 + 228 }
const MP = (lon, lat) => ({ x: SCR.cx + (lon + 96) * 11.6, y: SCR.cy + (38 - lat) * 15.6 })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => MP(lo, la))
const TEXAS = [
  [-106.6, 32.0], [-103.05, 32.0], [-103.05, 36.5], [-100, 36.5], [-100, 34.56], [-98.5, 34.1], [-97.1, 33.8], [-95.6, 33.9], [-94.05, 33.55],
  [-94.05, 31.0], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3], [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8],
  [-103, 29], [-104.5, 29.7], [-106.6, 32.0],
].map(([lo, la]) => MP(lo, la))
const CITIES = [
  { n: 'SEATTLE', p: MP(-122.3, 47.6) },
  { n: 'NEW YORK', p: MP(-74, 40.7) },
  { n: 'LA', p: MP(-118.2, 34.05) },
  { n: 'MIAMI', p: MP(-80.2, 25.8) },
  { n: 'CHICAGO', p: MP(-87.6, 41.9) },
  { n: 'NEW ORLEANS', p: MP(-90.1, 30.0) },
  { n: 'NASHVILLE', p: MP(-86.9, 36.3) },
  { n: 'ATLANTA', p: MP(-84.4, 33.75) },
]
const NC = CITIES.length
const TICKER = CITIES.map(c => c.n).join('  ✦  ') + '  ✦  '
// every city's pulse: Seattle on line 1, New York on line 2, round-robin through the middle, all together at the end
function cityPulse(t, i) {
  let p = 0
  if (i === 0) p = Math.max(p, bump(t, LT[0].chars[13] ?? T.l1 + 0.5, 1.4))
  if (i === 1) p = Math.max(p, bump(t, LT[1].chars[9] ?? T.l2 + 0.4, 1.4))
  if (inR(t, ...T.robin)) { const per = 0.4, k = (t - T.robin[0]) / per; if (Math.floor(k) % NC === i) p = Math.max(p, Math.sin(Math.PI * (k % 1))) }
  if (t > T.all) p = Math.max(p, 0.55 + 0.45 * Math.sin((t - T.all) * 5.6))
  return p
}

// the groove: everyone bops on the beat once the TV is on
function grooveAt(t) {
  if (t < T.on) return { dy: 0, sq: 0 }
  const ph = (((t - 0.6) / BL) % 1 + 1) % 1
  return { dy: -11 * Math.sin(Math.PI * ph) ** 2, sq: 0.05 * Math.exp(-ph * 12) }
}
function talkWeight(t, who) {
  let w = 0
  LINES.forEach((L, i) => {
    if (L.speaker !== who) return
    w = Math.max(w, prog(t, L.t - 0.25, L.t) * (1 - prog(t, LT[i].done + 0.4, LT[i].done + 0.8)))
  })
  return ease.inOutQuad(w)
}
// the booth's heads follow the action: Seattle (left) → New York (right) → the round-robin → each other → you
function lookFor(t, isG) {
  if (t < T.on) return [0, -1]
  if (t < T.l2 - 0.2) return [-1, -1]
  if (t < T.robin[0]) return [1, -1]
  if (inR(t, ...T.robin)) { const k = Math.floor((t - T.robin[0]) / 0.4) % NC; return [CITIES[k].p.x < SCR.cx ? -1 : 1, -1] }
  if (t < T.l4) return [isG ? 1 : -1, 0]                       // at each other: no winner yet
  return [0, 0]
}
function gemState(t) {
  const look = lookFor(t, true)
  if (t < T.on) return { mood: 'neutral', look }
  if (t < LT[0].done + 0.3) return { mood: 'wide', look }
  if (t < T.l2) return { mood: 'sparkle', look: [0, 0] }
  if (inR(t, ...T.robin)) return { mood: 'wide', look }
  if (t < T.l4) return { mood: 'squint', look }
  if (t < T.cut) return { mood: 'happy', look }
  return { mood: t % 1.1 < 0.55 ? 'happy' : 'sparkle', look: [0, 0] }
}
function sagState(t) {
  const look = lookFor(t, false)
  if (t < T.on) return { mood: 'neutral', look }
  if (t < T.l2) return { mood: 'wide', look }
  if (t < LT[1].done + 0.3) return { mood: 'wide', look }
  if (inR(t, ...T.robin)) return { mood: 'wide', look }
  if (t < T.l4) return { mood: 'squint', look }
  if (t < T.cut) return { mood: 'sparkle', look }
  return { mood: t % 1.1 < 0.55 ? 'sparkle' : 'happy', look: [0, 0] }
}
function narrState(t) {
  if (t < T.l3) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.l4) return { mood: 'wink', look: [0, 0] }
  if (t < T.cut) return { mood: 'happy', look: [0, 0] }
  return { mood: 'sparkle', look: [-1, 1] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 20px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'LIVE from the | *campaign trail.*', { top: 118, size: 92, accentSize: 124, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.09, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'No numbers. | Just *stars.*', { top: 118, size: 96, accentSize: 136, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.09, accentColor: CYAN, lineHeight: 1.0 })
  const H2 = popText(root, 'Anyone’s *game.*', { top: 150, size: 100, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const poly = pts => { x.beginPath(); x.moveTo(pts[0].x, pts[0].y); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i].x, pts[i].y); x.closePath() }

  // ── the CRT picture: static until it clicks on, then the vote map + LIVE bug + chyron ticker; scanlines on top
  function drawScreen(t) {
    const { sx0, sy0, sw, sh } = TV
    x.save(); x.beginPath(); x.roundRect(sx0, sy0, sw, sh, 30); x.clip()
    x.fillStyle = '#0c0a24'; x.fillRect(sx0, sy0, sw, sh)
    if (t < T.on) {
      for (let j = 0; j < sh; j += 8) for (let i = 0; i < sw; i += 8) { const v = (Math.sin(i * 12.9898 + j * 78.233 + Math.floor(t * 24) * 3.1) * 43758.5) % 1; x.fillStyle = `rgba(200,200,230,${Math.abs(v) * 0.35})`; x.fillRect(sx0 + i, sy0 + j, 8, 8) }
    } else {
      const on = ease.outCubic(prog(t, T.on, T.on + 0.25))
      x.globalAlpha = on
      // a faint grid
      x.fillStyle = 'rgba(143,216,246,0.07)'
      for (let yy = sy0 + 12; yy < sy0 + sh; yy += 26) for (let xx = sx0 + 12; xx < sx0 + sw; xx += 26) x.fillRect(xx, yy, 3, 3)
      // the land
      poly(OUTLINE); x.fillStyle = 'rgba(58,42,122,0.55)'; x.fill()
      x.lineJoin = 'round'; x.lineWidth = 4; x.strokeStyle = LAV; x.stroke()
      // Texas
      const br = 0.8 + 0.2 * Math.sin(t * 2.4)
      poly(TEXAS); x.fillStyle = rgba(GOLD, 0.55 * br); x.fill(); x.lineWidth = 3; x.strokeStyle = '#ffe7a8'; x.stroke()
      // the cities
      CITIES.forEach((C, i) => {
        const p = cityPulse(t, i)
        glow(C.p.x, C.p.y, 30 + 60 * p, GOLD, 0.5 + 0.5 * p)
        if (p > 0.05) { x.lineWidth = 3; x.strokeStyle = rgba('#fff3e0', p); x.beginPath(); x.arc(C.p.x, C.p.y, 14 + (1 - p) * 34, 0, Math.PI * 2); x.stroke() }
        drawPixelStar(x, C.p.x, C.p.y, 20 + 14 * p, p > 0.5 ? 0 : 1, p > 0.4 ? '#fff3e0' : GOLD)
        // the called city gets its name tag on screen
        if (p > 0.3 && t < T.all) {
          x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
          const ty = C.p.y - 34, w = x.measureText(C.n).width + 18
          x.globalAlpha = on * clamp((p - 0.3) * 3)
          x.fillStyle = 'rgba(12,10,36,0.9)'; x.fillRect(C.p.x - w / 2, ty - 15, w, 30)
          x.fillStyle = BONE; x.fillText(C.n, C.p.x, ty + 1)
          x.globalAlpha = on
        }
      })
      // LIVE bug
      const bl = Math.floor(t * 2) % 2
      const ly = sy0 + sh - 124
      x.fillStyle = RED; x.fillRect(sx0 + 28, ly, 140, 46)
      x.fillStyle = '#ffffff'; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      if (bl) { x.beginPath(); x.arc(sx0 + 50, ly + 23, 8, 0, Math.PI * 2); x.fill() }
      x.fillText('LIVE', sx0 + 68, ly + 24)
      // chyron: label + ticker naming every candidate (STAY TUNED in the last beat)
      const cy0 = sy0 + sh - 64
      x.fillStyle = 'rgba(8,6,22,0.94)'; x.fillRect(sx0, cy0, sw, 64)
      x.fillStyle = GOLD; x.fillRect(sx0, cy0, 8, 64); x.fillRect(sx0, cy0, sw, 3)
      x.fillStyle = GOLD; x.fillRect(sx0 + 8, cy0 + 3, 190, 61)
      x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('THE VOTE', sx0 + 26, cy0 + 35)
      x.save(); x.beginPath(); x.rect(sx0 + 198, cy0 + 3, sw - 198, 61); x.clip()
      x.fillStyle = BONE; x.font = `700 24px ${MONO}`
      if (t < T.all) {
        const tw = x.measureText(TICKER).width, off = ((t - T.on) * 150) % tw
        for (let k = 0; k < 3; k++) x.fillText(TICKER, sx0 + 220 - off + k * tw, cy0 + 35)
      } else {
        x.textAlign = 'center'; x.fillStyle = bl ? '#ffe7a8' : BONE; x.fillText('★  STAY TUNED  ★', sx0 + 198 + (sw - 198) / 2, cy0 + 35)
      }
      x.restore()
      x.globalAlpha = 1
    }
    // scanlines + vignette
    x.fillStyle = 'rgba(0,0,0,0.16)'
    for (let j = 0; j < sh; j += 6) x.fillRect(sx0, sy0 + j, sw, 2)
    const vg = x.createRadialGradient(TVC.x, sy0 + sh / 2, sh * 0.35, TVC.x, sy0 + sh / 2, sh * 0.85)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.45)')
    x.fillStyle = vg; x.fillRect(sx0, sy0, sw, sh)
    x.restore()
  }

  function drawBoothStar(t, who, k) {
    const isG = who === 'g'
    const D = isG ? G_DESK : S_DESK, st = isG ? gemState(t) : sagState(t)
    const spk = talkWeight(t, isG ? GT : ST)
    const gv = grooveAt(t)
    const lean = (isG ? 1 : -1) * 18 * spk
    // the head whip during the round-robin
    const whip = inR(t, ...T.robin) ? Math.sin((t - T.robin[0]) / 0.4 * Math.PI) * 6 : 0
    const hops = isG ? [...GEM_HOPS, T.h2Land, T.all + BL * 2] : [...SAG_HOPS, T.h2Land + 0.1, T.all + BL * 2 + 0.1]
    const opts = { color: isG ? GEM.color : SAG.color, glyph: isG ? GEM.glyph : SAG.glyph, mood: st.mood, look: st.look, squash: gv.sq, hops, seed: isG ? 3 : 8, pop: k, bob: 0, glow: 0.9 }
    x.save(); x.translate(D.x + lean + whip, D.y + gv.dy)
    drawStarChar(x, 0, 0, D.s, t, opts)
    const F = starFrame(0, 0, D.s, t, opts)
    inSprite(x, F, () => headsetCells(x, isG ? GC : '#b07cff'))
    x.restore()
  }
  function drawNarrator(t, k) {
    if (k <= 0.02) return
    const y = TV.y0 - 60
    drawStarChar(x, NARR_AT.x, y, NARR_AT.s, t, { color: STAR.sky, ...narrState(t), hops: NARR_HOPS, seed: 12, pop: k, bob: 0, glow: 0.8 })
  }
  function sparkles(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(th) * R0 * (0.7 + 0.5 * p), cy + Math.sin(th) * R0 * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const outP = popOut(t, T.out)
        const tvK = pop01(t, T.tvIn, 0.42, 1.7) * outP
        if (tvK > 0.01) {
          x.save(); x.translate(TVC.x, TVC.y); x.scale(tvK, tvK); x.translate(-TVC.x, -TVC.y)
          drawTV(x, TV, t, { led: 'CH 05', antennaWiggle: bump(t, T.on, 0.5) + (t > T.all ? 0.4 * bump(t, T.all, 1.2) : 0) })
          drawScreen(t)
          x.restore()
        }
        drawNarrator(t, pop01(t, T.narrIn, 0.38, 2.2) * outP)
        const micK = pop01(t, T.micIn, 0.34, 2) * outP
        const ang = -0.38 * talkWeight(t, GT) + 0.38 * talkWeight(t, ST)
        if (micK > 0.02) drawMic(x, MIC.x, MIC.y - (1 - micK) * 40, ang, micK)
        const gk = pop01(t, T.gemIn, 0.36, 2.2) * outP, sk = pop01(t, T.sagIn, 0.36, 2.2) * outP
        if (gk > 0.02) drawBoothStar(t, 'g', gk)
        if (sk > 0.02) drawBoothStar(t, 's', sk)
        const dk = pop01(t, T.deskIn, 0.36, 1.8) * outP
        if (dk > 0.02) { x.save(); x.translate(540, DESK.y + DESK.h); x.scale(dk, dk); x.translate(-540, -(DESK.y + DESK.h)); drawDesk(x, DESK.x0, DESK.x1, DESK.y, DESK.h); x.restore() }
        drawGhostCameo(x, t, { x: GHOST_AT.x, y: GHOST_AT.y, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
        sparkles(t, TVC.x, TVC.y - 40, T.all, 16, 420, 1)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const airhorn = (t0, gain = 0.035) => [0, 0.16, 0.32].map((d, i) => ['lead', +(t0 + d).toFixed(3), 466.16, i === 2 ? 0.5 : 0.12, { wave: 'saw', gain, cutoff: 2400, env: 600, envDecay: 3, decay: 0.1, sustain: 0.9, release: 0.08, rev: 0.12, dly: 0, bus: 'fx' }])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.tvIn, 0.5, 0.03], ['pop', T.deskIn, 220, 0.04, 0], ['pop', T.gemIn, 739.99, 0.03, -0.4], ['pop', T.sagIn, 880, 0.03, 0.4], ['tick', T.micIn, 0.04], ['pop', T.narrIn, 987.77, 0.03, 0.5],
  ['chip', T.on - 0.02, 1600, 0.08, { wave: 'noise', slide: -40, gain: 0.04, decay: 0.05, sustain: 0.6 }], ['bell', T.on, 1318.51, 0.03, 1.2, 0],
  ...airhorn(T.l1 - 0.05),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 740, [ST]: 620, [NARR]: 880 } }),
  ['bell', LT[0].chars[13] ?? T.l1 + 0.5, 1567.98, 0.035, 1.2, -0.5], ['bell', LT[1].chars[9] ?? T.l2 + 0.4, 1567.98, 0.035, 1.2, 0.5],
  ...wordPops(T.h1, 3, 0.09, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...Array.from({ length: Math.floor((T.robin[1] - T.robin[0]) / 0.4) }, (_, n) => ['pop', +(T.robin[0] + n * 0.4 + 0.2).toFixed(3), NOTE[n % NOTE.length] * 2, 0.014, (CITIES[n % NC].p.x - 540) / 500]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['glitter', T.all, T.all + 0.8], ['bell', T.all + 0.05, 1567.98, 0.035, 1.6, 0], ...airhorn(T.all + 0.4, 0.03),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
