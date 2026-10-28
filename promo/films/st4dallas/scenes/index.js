// st4dallas (EP 049 · 20 s vertical · Star Talk season 4, drop 5 "Road trip", thread B5: the Leo × Aquarius clash) ·
// story 0–15.6, then the shared end card (cta JOIN THE TEXAS BETA).
//   0.00–5.70  "Dear | *Dallas.*"  A rooftop under a glittering generic skyline (lit tower outlines, window sparkle; no
//              landmarks, no logos). Split stage: on the left the orange ♌ Leo star in its crown, its spotlight snapping on,
//              party lights pulsing; on the right the cyan ♒ Aquarius star on a beanbag in its pink headphones, a little
//              plant, music notes drifting, cool and quiet. Drop (2.82): LEO (squint, stomping hops): "you never want to go out!"
//   5.70–11.8  "Fire wants out. | Air wants *air.*"  AQUARIUS (looking away): "i need space. it's not about *you*." Leo,
//              wide-eyed, deflates; the party lights stall. THE STARS: "two fixed signs. nobody's wrong." (both badges glint)
//   11.8 cut → "Ask what they | *need.*"  Leo dims its own spotlight to a soft glow and floats a "?" toward Aquarius, who
//              looks back and softens. (Not fixed yet: they make up in EP 061.) Everything pops out by 15.45.
// Easter eggs: seed constellation (EP 49) top-left, "EP 049" in the frame, the ghost peeks over a rooftop AC unit.
// HELLO TEXAS: this last line is the A. One canvas, DOM type + the box on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, drawBits, sparkles, glow, mark, NOTE, wordPops } from './kit.js'

export const DURATION = 20
export const EP = 49
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const LEO = signStar('leo'), AQU = signStar('aquarius')
const LEO_TAG = `${LEO.glyph} LEO STAR`, AQU_TAG = `${AQU.glyph} AQUARIUS STAR`, SKY_TAG = 'THE STARS'
const HOT = '#ff4fd8', ACC = '#8af0ff'

const T = {
  h0: 0.12, h0Out: [5.45, 5.68],
  sky: 0.25, leoIn: 0.4, spot: 0.62, aquIn: 0.7, notes: 1.0,
  open: 2.66, l1: BEAT(4) + 0.02, stomp: [3.0, 3.9],
  h1: 5.86, h1Land: 6.3, l2: 5.92, deflate: 7.3, stall: 7.3,
  l3: 8.9, glint: 10.3,
  ghost: 9.1,
  close: 11.72, h1Out: [11.52, 11.7],
  h2: 11.88, h2Land: 12.28, dim: [12.4, 13.0], ask: 13.0, look: 13.6, soften: 14.1, h2Out: [15.15, 15.42], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: LEO_TAG, color: LEO.color, text: 'you *never* want to go out!' },
  { t: T.l2, speaker: AQU_TAG, color: ACC, text: "i need space. it's not about *you*." },
  { t: T.l3, speaker: SKY_TAG, text: "two fixed signs. *nobody's* wrong." },
]
const CPS = 30

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const PLANT = ['..g.g..', '.ggGgg.', 'gGg.gGg', '.gGgGg.', '..gGg..', '...g...', '.PPPPP.', '.PpppP.', '..PPP..']
const PLANT_C = { g: '#4fbf6a', G: '#7dff8a', P: '#c96a3a', p: '#8a4a2a' }
const Q = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']

// ── layout
const ROOF_Y = 1090
const LEO0 = { x: 300, y: 1250, size: 280 }, AQU0 = { x: 790, y: 1262, size: 262 }
const LOW = 100, lowK = t => ease.inOutCubic(prog(t, 11.73, 11.83))
const AC = { x0: 900, x1: 1060, top: 1010 }
const GHOST = { x: 975, y: AC.top, at: T.ghost, dur: 1.4, from: 'below', cell: 3 }
const TOWERS = [
  { x: -20, w: 150, top: 700, edge: '#7dff8a' }, { x: 120, w: 110, top: 610, edge: '#8af0ff' }, { x: 240, w: 170, top: 760, edge: '#ffd27a' },
  { x: 420, w: 120, top: 560, edge: '#7dff8a' }, { x: 550, w: 160, top: 680, edge: '#ff8fb1' }, { x: 720, w: 110, top: 590, edge: '#8af0ff' },
  { x: 840, w: 150, top: 720, edge: '#ffd27a' }, { x: 990, w: 120, top: 640, edge: '#7dff8a' },
]

function leoState(t) {
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'squint', look: [1, 0] }
  if (t < T.deflate) return { mood: 'wide', look: [1, 0], blink: false }      // …oh
  if (t < T.l3) return { mood: 'neutral', look: [0, 1] }
  if (t < T.h2) return { mood: 'neutral', look: [1, 0] }
  if (t < T.soften) return { mood: 'neutral', look: [1, 0] }
  return { mood: 'happy' }
}
function aquState(t) {
  if (t < T.l1 + 0.3) return { mood: 'sleepy', zzz: false }
  if (t < T.l2) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l3) return { mood: 'neutral', look: [1, -1] }                     // looks away
  if (t < T.look) return { mood: 'neutral', look: [1, 0] }
  if (t < T.soften) return { mood: 'wide', look: [-1, 0], blink: false }
  return { mood: 'happy', blush: 0.6 }
}
const LEO_HOPS = [T.leoIn + 0.3, T.l1, T.stomp[0], T.stomp[0] + 0.3, T.stomp[0] + 0.6, T.stomp[1], T.ask]
const AQU_HOPS = [T.aquIn + 0.3, T.l2, T.l2 + 0.6, T.soften]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Dear | *Dallas.*', { top: 222, size: 132, accentSize: 200, at: T.h0, gap: 0.14, accentColor: LEO.color, wobble: true, late: 1, lateAt: T.h0 + 0.26, fit: true })
  const H1 = popText(root, 'Fire wants out. | Air wants *air.*', { top: 214, size: 108, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ACC, fit: true })
  const H2 = popText(root, 'Ask what they | *need.*', { top: 214, size: 128, accentSize: 200, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the static set: generic towers, the roof, the AC unit
  const set = document.createElement('canvas'); set.width = W; set.height = 1920
  const WIN = []
  {
    const s = set.getContext('2d'), c = 10
    const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h >>> 8) / 16777216 }
    TOWERS.forEach((B, n) => {
      s.fillStyle = n % 2 ? '#1a1440' : '#151034'; s.fillRect(B.x, B.top, B.w, ROOF_Y - B.top)
      if (n % 3 === 1) { s.fillStyle = s.fillStyle; s.fillRect(B.x + B.w / 2 - 6, B.top - 60, 12, 60) }   // a spire
      for (let y = B.top + 20; y < ROOF_Y - 10; y += 2 * c) for (let xx = B.x + 12; xx < B.x + B.w - 12; xx += 2 * c) {
        const h = hash(xx + n * 7, y)
        if (h < 0.42) { s.fillStyle = h < 0.1 ? '#ffe9a8' : '#3a3070'; s.fillRect(xx, y, c, c); if (h < 0.1) WIN.push([xx, y, h]) }
      }
    })
    // the roof deck + parapet
    s.fillStyle = '#2a2448'; s.fillRect(0, ROOF_Y, W, 1920 - ROOF_Y)
    for (let y = ROOF_Y + 40; y < 1920; y += 60) { s.fillStyle = '#241f40'; s.fillRect(0, y, W, 4) }
    s.fillStyle = '#4a4270'; s.fillRect(0, ROOF_Y - 20, W, 24); s.fillStyle = '#6a62a0'; s.fillRect(0, ROOF_Y - 20, W, 6)
    // the AC unit (right)
    s.fillStyle = INK; s.fillRect(AC.x0 - 6, AC.top - 6, AC.x1 - AC.x0 + 12, ROOF_Y - AC.top + 6)
    s.fillStyle = '#8a8aa8'; s.fillRect(AC.x0, AC.top, AC.x1 - AC.x0, ROOF_Y - AC.top - 10)
    for (let k = 0; k < 6; k++) { s.fillStyle = '#5a5a78'; s.fillRect(AC.x0 + 12, AC.top + 14 + k * 12, AC.x1 - AC.x0 - 24, 4) }
  }

  function drawSkyline(t, party) {
    x.drawImage(set, 0, 0)
    // lit outlines along the tower edges (a slow chase), and window glitter
    x.save(); x.globalCompositeOperation = 'lighter'
    TOWERS.forEach((B, n) => {
      const on = clamp((t - T.sky - n * 0.09) / 0.2)
      if (on <= 0) return
      x.globalAlpha = on * (0.55 + 0.25 * Math.sin(t * 1.6 + n))
      x.fillStyle = B.edge
      x.fillRect(B.x, B.top, B.w, 4); x.fillRect(B.x, B.top, 4, ROOF_Y - B.top); x.fillRect(B.x + B.w - 4, B.top, 4, ROOF_Y - B.top)
      const ch = ((t * 0.4 + n * 0.13) % 1) * (ROOF_Y - B.top)
      x.globalAlpha = on; x.fillRect(B.x - 2, B.top + ch, 8, 30)
    })
    x.restore()
    for (const [wx, wy, h] of WIN) {
      const tw = Math.sin(t * (2 + h * 30) + wx * 0.1)
      if (tw > 0.7) { x.save(); x.globalAlpha = (tw - 0.7) / 0.3; drawPixelStar(x, wx + 5, wy + 5, 22, 2, '#fff6e6'); x.restore() }
    }
    // party light wash on the left half (pink/gold pulses), cool blue on the right
    const beat = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 1.8)
    glow(x, 260, 1150, 520, '255,79,216', party * (0.35 + 0.35 * beat))
    glow(x, 360, 1000, 380, '242,199,92', party * (0.25 + 0.25 * (1 - beat)))
    glow(x, 820, 1150, 420, '56,196,236', 0.35)
  }
  function drawSpot(t, R, on, cx, poolY) {
    if (on <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 560, 0, poolY + 40)
    g.addColorStop(0, `rgba(255,236,190,${0.16 * on})`); g.addColorStop(1, `rgba(255,190,120,${0.14 * on})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 560); x.lineTo(cx + 40, 560); x.lineTo(cx + R, poolY + 40); x.lineTo(cx - R, poolY + 40); x.closePath(); x.fill()
    x.translate(cx, poolY); x.scale(1, 0.2)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, R); p.addColorStop(0, `rgba(255,214,150,${0.45 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function headphones(r, s) {
    const c = Math.max(4, Math.round(s / 30))
    const cupY = r.y - s * 0.06, cupX = s * 0.4, ry = -s * 0.44
    for (const [col, k] of [[INK, 1.5], ['#3a2a6e', 1]]) for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = col; x.fillRect(Math.round(bx - c * k), Math.round(by - c * k), c * 2 * k, c * 2 * k)
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
    }
  }
  function notes(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.45
      if (t < born || born > t1) continue
      const p = ((t - born) % 3.6) / 1.8
      if (p >= 1) continue
      drawBits(x, NOTE_BM, { X: i % 2 ? ACC : HOT }, Math.round(cx + 60 + Math.sin(p * 5 + i) * 30), Math.round(cy - 80 - p * 200), 6, { alpha: Math.sin(Math.PI * p) * 0.9 })
    }
  }
  function beanbag(cx, cy) {
    for (let j = 0; j < 9; j++) {
      const hw = 150 - Math.abs(j - 5) * 12
      x.fillStyle = j === 0 ? INK : j < 3 ? '#4a7bd6' : '#2f569e'
      x.fillRect(Math.round(cx - hw), Math.round(cy + j * 12), Math.round(2 * hw), 12)
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const dy = LOW * lowK(t)
    const lp = pop01(t, T.leoIn, 0.38, 2.2) * ok, ap = pop01(t, T.aquIn, 0.38, 2.2) * ok
    // Leo's spotlight: snaps on, then Leo dims it itself to a soft glow
    const sk = t - T.spot
    let on = sk < 0 ? 0 : sk < 0.05 ? 1 : sk < 0.1 ? 0.25 : 1
    on *= lerp(1, 0.35, ease.inOutCubic(prog(t, ...T.dim))) * ok
    drawSpot(t, 230, on, LEO0.x, LEO0.y + 120 + dy)
    beanbag(AQU0.x, AQU0.y + 70 + dy)
    drawBits(x, PLANT, PLANT_C, 1000, 1190 + dy, 10, { alpha: clamp(ap * 2) })
    const deflate = t > T.deflate && t < T.h2 ? 0.08 * ease.outCubic(prog(t, T.deflate, T.deflate + 0.4)) : 0
    const stomp = t > T.stomp[0] && t < T.stomp[1] + 0.3 ? 0.05 * Math.abs(Math.sin((t - T.stomp[0]) * 10)) : 0
    const rL = drawStarChar(x, LEO0.x, LEO0.y + dy, LEO0.size, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, squash: deflate + stomp, glow: lerp(1.2, 0.8, deflate / 0.08) })
    const rA = drawStarChar(x, AQU0.x, AQU0.y + dy, AQU0.size, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 8, glow: 0.9 })
    // crown on Leo's tip
    const cell = Math.max(1, Math.round(LEO0.size * lp / 36)) * 0.95
    drawBits(x, CROWN, CROWN_C, Math.round(rL.x), Math.round(rL.top + cell * 1.2), cell, { rot: -0.16 + 0.04 * Math.sin(t * 3) - deflate * 2, alpha: clamp(lp) })
    if (ap > 0.05) headphones(rA, AQU0.size * ap)
    if (t < T.l1 + 0.2 || t > T.soften) notes(t, rA.x, rA.y, t < T.l1 + 0.2 ? T.notes : T.soften, t < T.l1 + 0.2 ? T.l1 : T.out[0] - 0.5)
    // effects
    mark(x, t, '!!', rA.x + 30, rA.top - 40, T.l1 + 0.3, 0.8, 9)
    mark(x, t, '!', rL.x, rL.top - 60, T.deflate - 0.1, 0.8, 9)
    if (t > T.glint && t < T.glint + 0.6) {
      for (const r of [rL, rA]) sparkles(x, t, r.x + r.size * 0.27, r.y + r.size * 0.32, T.glint, 6, 50, 1, [GOLD, BONE])
    }
    // the question, floated over
    const qk = prog(t, T.ask, T.ask + 0.9)
    if (qk > 0 && t < T.out[0]) {
      const qx = lerp(rL.x + 80, (rL.x + rA.x) / 2 + 40, ease.outCubic(qk)), qy = lerp(rL.top - 20, rL.top - 120, ease.outCubic(qk)) + Math.sin(t * 3) * 6
      x.save(); x.globalAlpha = clamp(qk * 4)
      x.fillStyle = INK; x.fillRect(Math.round(qx - 66), Math.round(qy - 76), 132, 152)
      x.fillStyle = BONE; x.fillRect(Math.round(qx - 58), Math.round(qy - 68), 116, 136)
      x.fillStyle = BONE; x.fillRect(Math.round(qx - 70), Math.round(qy + 60), 24, 24)
      x.restore()
      drawBits(x, Q, { X: LEO.color }, Math.round(qx), Math.round(qy), 18 * easeOutBack(clamp(qk * 3), 2.4), { outline: null })
    }
    if (t > T.soften && t < T.soften + 0.7) sparkles(x, t, rA.x, rA.y, T.soften, 8, 160, 3, [ACC, HOT, BONE])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const party = clamp((t - T.spot) / 0.3) * lerp(1, 0.25, ease.inOutCubic(prog(t, T.stall, T.stall + 0.5))) * lerp(1, 0.6, prog(t, ...T.dim))
      drawSkyline(t, party)
      drawGhostCameo(x, t, GHOST)        // peeks over the rooftop AC unit
      if (t < T.out[1] + 0.02) drawStars(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.78 (H0 → H1) and 11.78 (box shut → the last line). cardfx keeps the 11.78 flip.
const CUTS = [5.78, { t: 11.78, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

export const CUES = [
  ...wordPops(T.h0, 1, 0.14, 0, 0.026), ['pop', T.h0 + 0.26, 1174.66, 0.045, 0],
  ['glitter', T.sky, T.sky + 1.0],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, -0.3], ['boom', T.spot, 0.14], ['tick', T.spot, 0.05], ['tick', T.spot + 0.11, 0.03],
  ['pop', T.aquIn + 0.05, 659.25, 0.04, 0.3], ['pluck', T.notes, 1318.51, 0.025, 0.6, 0.5], ['pluck', T.notes + 0.45, 1174.66, 0.022, 0.6, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEO_TAG]: 739.99, [AQU_TAG]: 987.77 } }),
  ['tick', T.stomp[0] + 0.05, 0.04], ['tick', T.stomp[0] + 0.35, 0.04], ['tick', T.stomp[0] + 0.65, 0.04],
  ['pop', T.l1 + 0.3, 523.25, 0.03, 0.3],
  ...wordPops(T.h1, 4, 0.07, 2, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.deflate, 440, 0.035, -0.3], ['pop', T.deflate + 0.12, 392, 0.03, -0.3], ['whoosh', T.stall, 0.5, 0.025],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.6],
  ['bell', T.glint, 1318.51, 0.03, 1.2, -0.3], ['bell', T.glint + 0.08, 1567.98, 0.025, 1.2, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['whoosh', T.dim[0], 0.5, 0.02], ['pop', T.ask + 0.1, 987.77, 0.04, 0], ['pop', T.ask + 0.25, 1174.66, 0.035, 0.1],
  ['bell', T.soften, 1760, 0.025, 1.2, 0.3], ['glitter', T.soften, T.soften + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
