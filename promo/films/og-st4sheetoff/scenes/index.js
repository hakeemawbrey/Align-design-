// og-st4sheetoff — social rework of st4sheetoff (the ghost takes the sheet off). --social: story 0–10.6, no end card.
//   HOOK (static, main.js) on screen 0–4.6; the film's own animated title H0 is removed so nothing overlaps it.
//   0.00–2.80  (hook up.) A candlelit café table for two, there from frame 0. The ghost sits across from its date (a bone
//              star); its eyes dart, then it grabs the hem and the sheet slides off: underneath, a little blue star, blushing.
//   2.82–7.60  THE DATE: "wait. you're *cute?!*"  → THE GHOST: "i'm *staying.* i ordered dessert."
//              "No more *hiding.*"  The sheet is folded neatly on the table.
//   7.85–end   "Nobody hides | *forever.*"  The two stars clink cups. Held to the last frame (no pop-out, no end card).
//   Safe zones: dialogue box at y 1300 (860 wide, 240 high).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const HOOK = 'First date. | Sheet *comes off.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 4.6

export const DURATION = 15
export const EP = 88
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const GHOST = '#cfe3ff', SHY = '#a9d4ff', DATE = '#f3e7cf'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.7, h0Out: [4.55, 4.75],
  scene: -0.7, dart: [0.6, 1.0, 1.35], grab: 1.55, sheetOff: [1.75, 2.45],
  open: 2.62, l1: BEAT(4),                                     // 2.82
  l2: 4.95, h1: 4.85, h1Land: 5.2, scoot: [5.0, 5.5], folded: 6.2,
  close: 7.6, h1Out: [7.4, 7.6],
  cut: 7.75,
  h2: 7.85, h2Land: 8.2, clink: 8.9,
  h2Out: [11.5, 11.6], out: [11.5, 11.6],   // social: hold the payoff to the last frame
}
const DS = 'THE DATE', GS = 'THE GHOST'
const LINES = [
  { t: T.l1, speaker: DS, text: 'wait. you’re *cute?!*', color: PINK },
  { t: T.l2, speaker: GS, text: 'i’m *staying.* i ordered dessert.', color: SHY },
]
const CPS = 24
const LT = lineTimes(LINES, { cps: CPS })
const G_HOPS = talkHops(LINES, GS, { cps: CPS }), D_HOPS = talkHops(LINES, DS, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── places
const TABLE = { x0: 150, x1: 930, y: 1170 }
const GH = { x: 300, y: 985 }, DT = { x: 790, y: 1005, s: 320 }
const ghostX = t => GH.x + 40 * ease.inOutCubic(prog(t, ...T.scoot))

function ghostLook(t) {
  if (t < T.dart[0]) return { look: [1, 0] }
  if (t < T.dart[1]) return { look: [-1, -0.4] }                // the door
  if (t < T.dart[2]) return { look: [0.4, 1] }                  // the candle
  if (t < T.grab) return { look: [1, 0], wide: true }
  return { look: [0, -1], wide: true }
}
function shyState(t) {
  if (t < T.l1) return { mood: 'wide', look: [0, 0], blush: 1 }
  if (t < LT[0].done + 0.5) return { mood: 'happy', blush: 1 }
  if (t < T.l2) return { mood: 'sparkle', look: [1, 0], blush: 1 }
  if (t < T.cut) return { mood: 'happy', blush: 1 }
  if (t < T.clink + 0.4) return { mood: 'sparkle', look: [1, 0], blush: 1 }
  return { mood: 'happy', blush: 1 }
}
function dateState(t) {
  if (t < T.grab) return { mood: 'happy', look: [-1, 0] }
  if (t < T.sheetOff[1] + 0.1) return { mood: 'wide', look: [-1, -0.5] }
  if (t < T.l2) return { mood: 'heart', look: [-1, 0] }
  if (t < LT[1].done) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.cut) return { mood: 'heart', look: [-1, 0] }
  return { mood: t < T.clink + 0.4 ? 'sparkle' : 'happy', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H1 = popText(root, 'No more *hiding.*', { top: 230, size: 112, accentSize: 164, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: SHY })
  const H2 = popText(root, 'Nobody hides | *forever.*', { top: 200, size: 116, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1300, width: 860, height: 240, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  const R = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }

  // ── the café table: pixel top + legs, a candle, two cups (each cup clinks at T.clink), the folded sheet
  function drawTable(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const { x0, x1, y } = TABLE
    // candle glow
    const fl = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3)
    glow(540, y - 70, 330, '#ffb35c', 0.55 * fl)
    // legs + top
    R(x0 + 60, y + 30, 26, 300, '#2a1840'); R(x1 - 86, y + 30, 26, 300, '#2a1840')
    R(x0 + 40, y + 300, 66, 14, '#2a1840'); R(x1 - 106, y + 300, 66, 14, '#2a1840')
    R(x0, y, x1 - x0, 34, '#5b3a6e'); R(x0, y, x1 - x0, 8, '#8a5c97'); R(x0, y + 34, x1 - x0, 8, '#1c1030')
    R(x0 - 6, y + 2, 6, 30, '#4a2e5c'); R(x1, y + 2, 6, 30, '#4a2e5c')
    // candle
    R(526, y - 66, 28, 66, '#efe6d6'); R(526, y - 66, 8, 66, '#ffffff'); R(522, y - 8, 36, 8, '#c9b9a0')
    const fh = 30 + 6 * Math.sin(t * 11)
    R(533, y - 66 - fh, 14, fh, '#ff9a3c'); R(536, y - 66 - fh * 0.7, 8, fh * 0.7, '#ffe08a'); R(538, y - 66 - fh - 6 + Math.sin(t * 9) * 3, 4, 8, '#ff9a3c')
    // cups: slide together for the clink
    const ck = ease.inOutCubic(prog(t, T.clink - 0.35, T.clink)) * (1 - ease.inOutCubic(prog(t, T.clink + 0.25, T.clink + 0.7)))
    const cup = (cx, col, dir) => {
      const X = cx + dir * ck * 62, lift = ck * 22
      R(X - 28, y - 52 - lift, 56, 52, col); R(X - 28, y - 52 - lift, 56, 8, '#ffffff'); R(X + (dir < 0 ? 28 : -42), y - 40 - lift, 14, 26, col)
      R(X - 20, y - 46 - lift, 40, 6, '#6b3f2a')
    }
    cup(430, '#ff9ec4', 1); cup(650, '#9fd2ff', -1)
    // the folded sheet (pops onto the table at "i'm staying")
    const fk = pop01(t, T.folded, 0.32, 2.4)
    if (fk > 0.01) {
      x.save(); x.translate(235, y - 4); x.scale(fk, fk)
      R(-60, -36, 120, 36, '#f4f7ff'); R(-60, -36, 120, 6, '#ffffff'); R(-60, -14, 120, 4, '#c9d6f2'); R(-60, -26, 120, 3, '#dde6fa'); R(58, -36, 4, 36, '#c9d6f2')
      x.restore()
    }
    // the clink sparkle
    if (t > T.clink && t < T.clink + 0.6) {
      const p = (t - T.clink) / 0.6
      x.globalAlpha = a * (1 - p)
      for (let i = 0; i < 6; i++) { const th = i * Math.PI / 3; drawPixelStar(x, 540 + Math.cos(th) * 60 * (0.5 + p), y - 90 + Math.sin(th) * 50 * (0.5 + p), 22, 1, i % 2 ? GOLD : '#fff3e0') }
    }
    x.restore()
  }

  function drawGhost(t, a) {
    const pin = pop01(t, T.scene, 0.45, 1.6)
    const off = prog(t, ...T.sheetOff)
    if (pin <= 0.01 || off >= 1 || a <= 0) return
    const tug = t > T.grab && t < T.sheetOff[0] ? Math.sin((t - T.grab) * 40) * 0.04 : 0
    const e = ease.inCubic(off)
    const fx = GH.x + Math.sin(t * 1.4) * 6 - e * 120, fy = GH.y + Math.sin(t * 2.2) * 6 - e * 760
    x.save(); x.globalAlpha = a
    glow(GH.x, GH.y, 380, GHOST, 0.4 * pin)
    const E = ghostLook(t)
    drawGhostSheet(x, t, fx, fy, Math.round(12 * pin) || 1, { look: E.look, wide: E.wide, blush: t > T.dart[2] ? 0.8 : 0, alpha: 1 - ease.inQuad(prog(t, T.sheetOff[0] + 0.3, T.sheetOff[1])), rot: -e * 0.7 + tug })
    x.restore()
  }
  function drawShy(t, a) {
    if (t < T.sheetOff[0] + 0.02 || a <= 0) return
    const pk = clamp(prog(t, T.sheetOff[0] + 0.02, T.sheetOff[0] + 0.2)) * a
    const hops = [T.sheetOff[1] + 0.05, ...G_HOPS, T.scoot[1], T.h2Land, T.clink + 0.15, T.clink + 0.75]
    glow(ghostX(t), GH.y + 10, 260, SHY, 0.6 * pk)
    drawStarChar(x, ghostX(t), GH.y + 25, 300, t, { color: SHY, ...shyState(t), hops, seed: 6, pop: pk, glow: 1.1 })
  }
  function drawDate(t, a) {
    const pk = pop01(t, T.scene + 0.1, 0.45, 1.8) * a
    if (pk <= 0.02) return
    const hops = [...D_HOPS, T.h2Land + 0.1, T.clink + 0.2, T.clink + 0.8]
    drawStarChar(x, DT.x, DT.y, DT.s, t, { color: DATE, ...dateState(t), hops, seed: 12, pop: pk, glow: 0.9 })
  }
  function sparkles(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, SHY]) {
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
      // (no seed-of-life corner logo in the social cut)
      if (t < T.out[1] + 0.02) {
        const a = clamp(popOut(t, T.out))   // social: the café is there from frame 0
        drawShy(t, a)
        drawDate(t, a)
        drawGhost(t, a)
        drawTable(t, a)
        sparkles(t, GH.x, GH.y, T.sheetOff[0] + 0.25, 12, 280, 1)
      }
      box.update(t)
      black.style.opacity = '0'   // frame 0 already shows the scene
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...T.dart.map(t0 => ['tick', t0, 0.025]),
  ['pop', T.grab, 392, 0.03, -0.3], ['whoosh', T.sheetOff[0], 0.5, 0.045], ['glitter', T.sheetOff[0] + 0.25, T.sheetOff[0] + 0.8], ['bell', T.sheetOff[0] + 0.3, 1567.98, 0.03, 1.4, 0],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [DS]: 740, [GS]: 1040 } }),
  ['pluck', T.l1 + 0.5, 1318.51, 0.03, 0.5, 0.3],
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['tick', T.scoot[0] + 0.1, 0.03], ['tick', T.scoot[0] + 0.25, 0.03], ['pop', T.folded, 880, 0.035, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['bell', T.clink, 2093, 0.035, 1.2, 0], ['bell', T.clink + 0.02, 2637, 0.025, 1.0, 0], ['glitter', T.clink, T.clink + 0.5],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
