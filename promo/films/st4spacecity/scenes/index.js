// st4spacecity (20 s vertical Align ad, Star Talk season 4, EP 037, thread A: Houston → Texas) · story 0–15.6, then the end card.
//   0.00–2.80  "Space City, | you *did* it."  Mission Control (generic consoles, no marks): four sign stars at their desks
//              look up as the big wall screen powers on, a pixel Texas outline draws itself and a gold pin drops on Houston.
//   2.82–5.60  Box (THE STARS): "Houston, you were *first.*"  Status strip: HOUSTON ✓. The room cheers (paper confetti).
//   5.86–8.60  "Next mission: | *Texas.*"  THE STARS: "next: the *whole* state."  Dotted lines pulse out from Houston to the
//              edges of the state; city dots light up one by one (no labels, no numbers); every star goes wide-eyed.
//   8.75–11.2  ♐ SAGITTARIUS (the traveller, backpack on): "i already packed the *van.*"  Everyone turns to look at it.
//  11.30       card cut (flip, box shut). The room drops into the freed space.
//  11.40–15.45 "Texas, | you're *next.*"  The whole state glows; a tiny van pip sets off up the dotted line from Houston.
//              Everyone salutes, heart-eyed. The ghost rises from behind the middle console (13.0). Out by 15.45.
// One canvas (sky + constellation + wall screen + consoles + stars), the wall map drawn on a small pixel canvas and
// blown up crisp, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 37
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', CYAN = '#7fe0ff', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556
const VIR = signStar('virgo'), CAN = signStar('cancer'), CAP = signStar('capricorn'), SAG = signStar('sagittarius')

const SPEAK = 'THE STARS', SAGT = '♐ SAGITTARIUS STAR'
const CPS = 26
const LINES = [
  { t: BEAT(4), speaker: SPEAK, text: 'Houston, you were *first.*' },
  { t: 5.92, speaker: SPEAK, text: 'next: the *whole* state.', color: MINT },
  { t: 8.78, speaker: SAGT, text: 'i already packed the *van.*', color: LAV },
]
const LT = lineTimes(LINES, { cps: CPS })

const T = {
  h0: 0.12, h0Out: [5.4, 5.58],
  desks: 0.15, screen: 0.8, outline: [1.0, 2.25], pin: 2.3, open: 2.66,
  check: LT[0].done + 0.05, cheer: LT[0].done + 0.15,
  h1: 5.86, h1Out: [10.95, 11.15],
  lines: [LT[1].chars[11], LT[1].chars[11] + 1.6], glow: LT[1].done + 0.3,
  turn: 8.78, pack: 8.95, close: 11.2,
  h2: 11.4, h2Land: 11.8, van: [12.0, 15.0], salute: 12.3, ghost: 13.05,
  out: [15.08, 15.45],
}
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = (i, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── layout (screen px before the drop)
const SCR = { x0: 70, x1: 1010, y0: 512, y1: 1122 }           // the wall screen
const PX = 6                                                     // map pixel size
const MW = Math.round((SCR.x1 - SCR.x0) / PX), MH = Math.round((SCR.y1 - SCR.y0) / PX)
const DESK_Y = 1268                                              // console tops
const LOW = 150, lowK = t => ease.inOutCubic(prog(t, 11.25, 11.35))
const CREW = [
  { ...VIR, x: 170, seed: 3 }, { ...CAN, x: 400, seed: 5 }, { ...CAP, x: 680, seed: 8 }, { ...SAG, x: 910, seed: 11 },
]
const STAR_Y = 1200, STAR_S = 168

// ── Texas (lon, lat), simplified; projected into the map canvas
const TX = [[-106.6, 32.0], [-103.06, 32.0], [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.2, 34.4], [-98.0, 34.1], [-96.5, 33.8],
  [-95.2, 33.9], [-94.04, 33.55], [-94.04, 31.99], [-93.7, 31.0], [-93.84, 29.7], [-94.7, 29.35], [-95.9, 28.6], [-96.9, 28.1],
  [-97.4, 27.4], [-97.2, 26.0], [-98.2, 26.1], [-99.1, 26.5], [-99.5, 27.5], [-100.3, 28.3], [-101.4, 29.77], [-102.4, 29.8],
  [-103.1, 29.0], [-103.9, 29.3], [-104.7, 29.9], [-105.0, 30.7], [-106.0, 31.4], [-106.6, 32.0]]
const HOU = [-95.37, 29.76]
const CITIES = [[-97.74, 30.27], [-98.49, 29.42], [-96.8, 32.78], [-97.4, 27.8], [-101.85, 33.58], [-106.44, 31.76], [-104.0, 30.31], [-94.8, 29.3], [-101.0, 35.6]]
const K = 42, LAT_K = 1.18
const proj = ([lon, lat]) => [MW / 2 + (lon + 100.3) * K / PX, MH / 2 + 4 + (31.25 - lat) * K * LAT_K / PX]
const TXP = TX.map(proj)
const SEG = TXP.slice(1).map((p, i) => Math.hypot(p[0] - TXP[i][0], p[1] - TXP[i][1]))
const PERIM = SEG.reduce((a, b) => a + b, 0)
const HOUP = proj(HOU), CITYP = CITIES.map(proj)
const toScr = ([u, v]) => [SCR.x0 + u * PX, SCR.y0 + v * PX]

// ── pixel bits
const PACK = ['...SSSSSS...', '..S......S..', '.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PppppppppppP', 'PPPPPPPPPPPP', 'PPPFFFFFFPPP', 'PPPFffffFPPP', 'PPPFFFFFFPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const PACK_C = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
const VAN = ['.WWWWWW..', 'WWbbWbbW.', 'WWWWWWWWW', 'WRRRRRRRW', '.k...k...']
const VAN_C = { W: '#fff3dc', b: '#7fe0ff', R: '#ff8fb1', k: INK }
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, alpha = 1, outline = INK } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2, on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

const SAG_HOPS = [...talkHops(LINES, SAGT, { cps: CPS }), T.pack]
const CHEER = [T.cheer, T.cheer + 0.56, T.glow, T.salute, T.salute + 1.1, T.salute + 2.2]

function crewState(t, i) {
  const sag = i === 3
  if (t < T.pin) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cheer) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < LINES[1].t) return { mood: i === 1 ? 'sparkle' : i === 2 ? 'wink' : 'happy' }
  if (t < T.glow) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.turn) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.h2) {
    if (sag) return { mood: t < T.pack + 0.6 ? 'happy' : 'wink' }
    return { mood: i === 0 ? 'eyeroll' : 'wide', look: [1, 0], blink: false }
  }
  if (t < T.salute) return { mood: 'happy' }
  return { mood: i % 2 ? 'heart' : 'sparkle' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const mc = document.createElement('canvas'); mc.width = MW; mc.height = MH
  const m = mc.getContext('2d')

  const H0 = popText(root, 'Space City, | you *did* it.', { top: 160, size: 112, accentSize: 160, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, fit: true })
  const H1 = popText(root, 'Next mission: | *Texas.*', { top: 160, size: 108, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1 + 0.36, wobble: true, accentColor: MINT, fit: true })
  const H2 = popText(root, 'Texas, | you’re *next.*', { top: 180, size: 132, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the wall map, drawn small then blown up crisp
  function drawMap(t) {
    m.clearRect(0, 0, MW, MH)
    m.fillStyle = '#071a24'; m.fillRect(0, 0, MW, MH)
    m.fillStyle = '#0c2a36'
    for (let i = 0; i < MW; i += 12) m.fillRect(i, 0, 1, MH)
    for (let j = 0; j < MH; j += 12) m.fillRect(0, j, MW, 1)
    const on = prog(t, T.screen, T.screen + 0.4)
    if (on <= 0) return
    // the outline draws on
    const L = PERIM * ease.inOutCubic(prog(t, ...T.outline))
    const glow = ease.outCubic(prog(t, T.glow, T.glow + 0.8))
    if (L >= PERIM - 0.01) {
      m.fillStyle = glow > 0 ? rgba(GOLD, 0.16 + 0.22 * glow * (0.8 + 0.2 * Math.sin(t * 3))) : rgba(MINT, 0.12)
      m.beginPath(); TXP.forEach(([a, b], i) => i ? m.lineTo(a, b) : m.moveTo(a, b)); m.fill()
    }
    m.strokeStyle = glow > 0.5 ? GOLD : MINT; m.lineWidth = 1.6; m.lineJoin = 'round'
    m.beginPath(); m.moveTo(...TXP[0])
    let acc = 0
    for (let i = 0; i < SEG.length; i++) {
      if (acc + SEG[i] <= L) { m.lineTo(...TXP[i + 1]); acc += SEG[i]; continue }
      const f = (L - acc) / SEG[i]
      m.lineTo(lerp(TXP[i][0], TXP[i + 1][0], f), lerp(TXP[i][1], TXP[i + 1][1], f)); break
    }
    m.stroke()
    // dotted lines out to the edges + city dots
    const lk = prog(t, ...T.lines)
    CITYP.forEach((c, i) => {
      const k = clamp(lk * 1.8 - i * 0.09)
      if (k <= 0) return
      m.save(); m.setLineDash([2, 2]); m.lineDashOffset = -t * 8
      m.strokeStyle = rgba(GOLD, 0.9); m.lineWidth = 1
      m.beginPath(); m.moveTo(...HOUP); m.lineTo(lerp(HOUP[0], c[0], k), lerp(HOUP[1], c[1], k)); m.stroke(); m.restore()
      if (k >= 1) { const p = 0.6 + 0.4 * Math.sin(t * 5 + i); m.fillStyle = rgba(BONE, p); m.fillRect(Math.round(c[0]) - 1, Math.round(c[1]) - 1, 3, 3) }
    })
    // Houston: the pin and its ripples
    if (t > T.pin) {
      for (let r = 0; r < 3; r++) {
        const ph = ((t - T.pin) * 0.7 + r / 3) % 1
        m.strokeStyle = rgba(GOLD, (1 - ph) * 0.8); m.lineWidth = 1
        m.beginPath(); m.arc(HOUP[0], HOUP[1], 2 + ph * 16, 0, Math.PI * 2); m.stroke()
      }
      const pk = pop01(t, T.pin, 0.3, 2.4)
      m.fillStyle = GOLD; m.fillRect(Math.round(HOUP[0] - 2 * pk), Math.round(HOUP[1] - 2 * pk), Math.round(5 * pk), Math.round(5 * pk))
    }
    // scanline sweep
    const sy = ((t * 0.35) % 1) * MH
    m.fillStyle = 'rgba(127,224,255,0.07)'; m.fillRect(0, sy, MW, 4)
    m.globalAlpha = 1
  }

  function drawScreen(t) {
    const k = pop01(t, T.desks, 0.45, 1.4)
    if (k <= 0) return
    const { x0, x1, y0, y1 } = SCR
    x.fillStyle = INK; x.fillRect(x0 - 16, y0 - 16, x1 - x0 + 32, y1 - y0 + 32)
    x.fillStyle = '#3a2f73'; x.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20)
    drawMap(t)
    const on = prog(t, T.screen, T.screen + 0.4)
    const flick = on < 1 ? (Math.sin(t * 90) > 0 ? on : on * 0.3) : 1
    x.save(); x.globalAlpha = flick; x.imageSmoothingEnabled = false
    x.drawImage(mc, x0, y0, MW * PX, MH * PX)
    x.restore()
    if (on <= 0) { x.fillStyle = '#071a24'; x.fillRect(x0, y0, x1 - x0, y1 - y0) }
    // status strip
    if (t > T.screen + 0.3) {
      x.fillStyle = 'rgba(7,26,36,0.92)'; x.fillRect(x0, y0, x1 - x0, 52)
      x.fillStyle = rgba(MINT, 0.6); x.fillRect(x0, y0 + 52, x1 - x0, 3)
      x.font = `700 26px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      const blinkOn = Math.sin(t * 6) > -0.3
      x.fillStyle = MINT; x.fillText('STATUS', x0 + 24, y0 + 27)
      x.textAlign = 'right'
      if (t < T.check) { x.fillStyle = rgba(BONE, blinkOn ? 0.9 : 0.4); x.fillText('HOUSTON ...', x1 - 24, y0 + 27) }
      else if (t < T.lines[0]) { x.fillStyle = GOLD; x.fillText('HOUSTON ✓', x1 - 24, y0 + 27) }
      else { x.fillStyle = GOLD; x.fillText('HOUSTON ✓   NEXT: TEXAS', x1 - 24, y0 + 27) }
    }
    // Houston tag
    if (t > T.pin + 0.2) {
      const [hx, hy] = toScr(HOUP)
      x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      const a = clamp((t - T.pin - 0.2) * 4)
      x.fillStyle = rgba(INK, 0.85 * a); x.fillRect(hx + 22, hy + 24, 150, 34)
      x.fillStyle = rgba(GOLD, a); x.fillText('HOUSTON', hx + 32, hy + 42)
    }
    // the van pip heading out of Houston toward Austin
    const vk = prog(t, ...T.van)
    if (vk > 0 && vk < 1) {
      const tgt = CITYP[0]
      const [vx, vy] = toScr([lerp(HOUP[0], tgt[0], ease.inOutQuad(vk)), lerp(HOUP[1], tgt[1], ease.inOutQuad(vk))])
      drawBits(x, VAN, VAN_C, Math.round(vx), Math.round(vy - 22 + Math.sin(t * 18) * 2), 6, { alpha: clamp(vk * 8) * clamp((1 - vk) * 8) })
    }
  }

  function drawDesks(t) {
    const k = pop01(t, T.desks + 0.1, 0.4, 1.5)
    if (k <= 0) return
    const y = DESK_Y + (1 - k) * 200
    for (let d = 0; d < 4; d++) {
      const dx0 = 30 + d * 260, w = 240
      x.fillStyle = INK; x.fillRect(dx0 - 6, y - 6, w + 12, 160)
      x.fillStyle = '#2e2560'; x.fillRect(dx0, y, w, 150)
      x.fillStyle = '#463a8a'; x.fillRect(dx0, y, w, 14)
      // two small screens with traces + a row of buttons
      for (let s = 0; s < 2; s++) {
        const sx = dx0 + 18 + s * 110, sy = y + 30
        x.fillStyle = '#071a24'; x.fillRect(sx, sy, 96, 56)
        x.fillStyle = s ? MINT : CYAN
        for (let i = 0; i < 22; i++) { const v = Math.sin(i * 0.7 + t * (3 + d) + s * 2 + d) * 14 * (0.5 + 0.5 * hash(i + d * 9, s)); x.fillRect(sx + 4 + i * 4, sy + 28 + Math.round(v / 2) * 2, 3, 3) }
      }
      for (let b = 0; b < 6; b++) {
        const lit = hash(b + d * 7, Math.floor(t * 3 + b)) > 0.5
        x.fillStyle = lit ? [GOLD, PINK, MINT, CYAN][(b + d) % 4] : '#1d1546'
        x.fillRect(dx0 + 22 + b * 34, y + 106, 22, 16)
      }
    }
  }

  function drawPaper(t) {
    if (t < T.cheer || t > T.cheer + 2.2) return
    for (let i = 0; i < 30; i++) {
      const p = (t - T.cheer - hash(i, 3) * 0.4) / 1.7
      if (p < 0 || p > 1) continue
      const px = 80 + hash(i, 1) * 920 + Math.sin(p * 8 + i) * 30, py = 1150 - Math.sin(Math.PI * Math.min(1, p * 1.5)) * (260 + 200 * hash(i, 2)) + p * 120
      x.globalAlpha = 1 - p
      x.fillStyle = i % 3 ? BONE : GOLD; x.fillRect(Math.round(px), Math.round(py), 14, 10)
    }
    x.globalAlpha = 1
  }

  function drawCrew(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    CREW.forEach((c, i) => {
      const pk = pop01(t, T.desks + 0.25 + i * 0.07, 0.4, 2) * o
      const st = crewState(t, i)
      const hops = i === 3 ? [...CHEER, ...SAG_HOPS] : CHEER.map(h => h + i * 0.05)
      const sx = c.x
      if (i === 3 && t > T.pack - 0.1) {
        const pp = pop01(t, T.pack, 0.3, 2.4)
        drawBits(x, PACK, PACK_C, Math.round(sx + 78), Math.round(STAR_Y + 10), 7 * pp, { rot: 0.12 + Math.sin(t * 5) * 0.05, alpha: clamp(o * 2) })
      }
      drawStarChar(x, sx, STAR_Y, STAR_S, t, { color: c.color, glyph: c.glyph, ...st, hops, seed: c.seed, pop: pk, glow: 0.9 })
      // salute: a little pixel hand-flash at the brow
      if (t > T.salute && t < T.salute + 0.5) { x.globalAlpha = 1 - (t - T.salute) / 0.5; drawPixelStar(x, sx + 50, STAR_Y - 70, 26, 2, GOLD); x.globalAlpha = 1 }
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * 0.8 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const o = clamp(popOut(t, T.out) * 1.4)
        x.save(); x.globalAlpha = o; x.translate(0, LOW * lowK(t))
        drawScreen(t)
        drawCrew(t)
        drawDesks(t)
        drawGhostCameo(x, t, { x: 545, y: DESK_Y - 6, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })
        drawPaper(t)
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cuts: 5.62 (H0 out → "Next mission") and 11.3 (box shut → "Texas, you're next."); a 20 s film keeps one (11.3).
const CUTS = [5.62, { t: 11.3, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.09, 0, 0.024),
  ['whoosh', T.desks, 0.5, 0.03], ['tick', T.screen, 0.04], ['tick', T.screen + 0.08, 0.03], ['bell', T.screen + 0.3, 880, 0.02, 1.2, 0],
  ['riser', T.outline[0], T.outline[1], 0.04],
  ['boom', T.pin, 0.2], ['bell', T.pin, 1318.51, 0.04, 1.8, 0], ['pop', T.open, 659.25, 0.035, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SAGT]: 520 } }),
  ['pluck', T.check, 1046.5, 0.04, 0.5, 0.3], ['pluck', T.check + 0.1, 1567.98, 0.035, 0.5, 0.3],
  ['glitter', T.cheer, T.cheer + 0.7], ['whoosh', T.cheer, 0.4, 0.03],
  ...wordPops(T.h1, 2, 0.08, 2, 0.024), ['pop', T.h1 + 0.36, 1174.66, 0.045, 0],
  ...Array.from({ length: 9 }, (_, i) => ['pop', +(T.lines[0] + (i * 0.09 + 0.55) * 1.6 / 1.8).toFixed(3), NOTE[i % 7] * 1.5, 0.018, (i % 2 ? 0.3 : -0.3)]),
  ['glitter', T.glow, T.glow + 0.8], ['bell', T.glow, 1567.98, 0.03, 1.6, 0],
  ['whoosh', T.pack - 0.1, 0.3, 0.03], ['pop', T.pack + 0.1, 440, 0.04, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.05, 0.7, 0],
  ['tick', T.van[0], 0.03], ['pop', T.salute, 987.77, 0.03, 0], ['glitter', T.salute, T.salute + 0.6],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.1],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
