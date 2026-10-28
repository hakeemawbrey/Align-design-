// st4stowaway (15 s vertical Align ad, Star Talk season 4, EP 045, thread C4: the ghost's redemption) · story 0–10.6,
// then the shared end card with "JOIN THE TEXAS BETA". The ghost is the star of this one (drawGhostSheet, no cameo).
//   0.00–6.40  "There's a | *stowaway.*"  The road-trip van from behind, parked. Thump… thump: the trunk lid rattles.
//              ♐ Sagittarius and ♍ Virgo trade a wide-eyed look, then the lid swings up (on the drop, 2.82): between the
//              suitcase and the cooler sits the ghost, in its sheet. It freezes, blushes and gives a tiny wave.
//              GHOST: "i didn't want to ask. i thought you'd say no."
//   6.42 cut → THE STARS: "just ask. worst case is a *kind* no."  The ghost looks up; at 8.95 it says it out loud in a
//              little speech bubble: "can i come?" The two stars go heart-eyed and hop: yes.
//   7.90       "Out loud | is *brave.*" lands over it and holds alone once the box shuts (9.85); everything pops out by 10.42.
// HELLO TEXAS (drop 5): this last line is the O. One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const EP = 45
export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', ICE = '#c9d6f2'
const MONO = "'Space Mono', ui-monospace, monospace"
const SAG = signStar('sagittarius'), VIR = signStar('virgo')

// ── the timeline (drop on 2.82)
const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [6.2, 6.4],
  thumps: [0.75, 1.3], look: 1.55, lid: [2.3, 2.82], freeze: 2.82, wave: [3.25, 4.6],
  open: 2.95, g1: 3.1,
  cut: 6.42, s2: 6.62, up: 7.0, ask: 8.95, yes: 9.4,
  h2: 7.9, h2Land: 8.25, close: 9.85, h2Out: [10.12, 10.38], out: [10.02, 10.42],
}
const GH = 'GHOST', SPEAK = 'THE STARS'
const LINES = [
  { t: T.g1, speaker: GH, color: ICE, text: 'i didn’t want to ask. i thought you’d say no.' },
  { t: T.s2, speaker: SPEAK, text: 'just ask. worst case is a *kind* no.', color: PINK },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const SUITCASE = ['...HHHH...', '..H....H..', 'BBBBBBBBBB', 'BbbbbbbbbB', 'BbSbbbbSbB', 'BbSbbbbSbB', 'BbbbbbbbbB', 'BbbbbbbbbB', 'BBBBBBBBBB']
const SUIT_C = { H: '#3a2a1e', B: '#a0643a', b: '#c47a3a', S: '#5a3a1e' }
const COOLER = ['WWWWWWWW', 'WCCCCCCW', 'CCCCCCCC', 'CccccccC', 'CccccccC', 'CccccccC', 'CCCCCCCC']
const COOL_C = { W: '#f5f1ff', C: '#4a7bd6', c: '#7fa8f0' }
const CHIPS = ['..KKKKKKK..', '.KOOOOOOOK.', 'KOOOOOOOOOK', 'KOYYYYYYYOK', 'KOYOOOOOYOK', 'KOYYYYYYYOK', 'KOOOOOOOOOK', '.KOOOOOOOK.', '..KKKKKKK..']
const CHIP_C = { K: '#c4562a', O: '#f29a4a', Y: '#ffd166' }
const HAND = ['.WW.', 'WWWW', 'WWWW', '.WW.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout: the van from behind
const V = { x0: 230, x1: 850, top: 620, bot: 1330 }
const LID = { x0: 262, x1: 818, hinge: 650, h: 450 }
const GHOST = { x: 540, y: 960, cell: 8 }
const SAGP = { x: 128, y: 1318, s: 236 }, VIRP = { x: 952, y: 1318, s: 236 }

const lidAngle = t => lerp(0, 100, easeOutBack(prog(t, ...T.lid), 1.4)) * Math.PI / 180
function lidShake(t) { let k = 0; for (const th of T.thumps) { const u = t - th; if (u > 0 && u < 0.35) k += Math.exp(-u * 12) * Math.sin(u * 60) } return k }

function sagState(t) {
  if (t < T.thumps[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.look) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.lid[0]) return { mood: 'wide', look: [1, 0], blink: false }                // looks at Virgo
  if (t < T.wave[0]) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.yes) return { mood: 'neutral', look: [1, -1] }
  return { mood: 'heart' }
}
function virState(t) {
  if (t < T.thumps[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.look) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.lid[0]) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.wave[0]) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.yes) return { mood: 'happy', look: [-1, -1] }
  return { mood: 'heart' }
}
function ghostState(t) {
  if (t < T.freeze + 0.4) return { look: [0, 0], wide: true, blush: 0 }
  if (t < T.wave[0]) return { look: [-1, 0], wide: true, blush: 0.4 }
  if (t < T.s2) return { look: [0, 1], wide: false, blush: 1 }                         // embarrassed, eyes down
  if (t < T.ask) return { look: [0, -1], wide: true, blush: 0.6 }
  return { look: [0, 0], wide: false, blush: 1 }
}
const HOPS = [T.lid[1] + 0.1, T.yes, T.yes + 0.45, T.yes + 0.9]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 36px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "There's a | *stowaway.*", { top: 196, size: 124, accentSize: 196, at: T.h0, gap: 0.1, accentColor: ICE, wobble: true, late: 1, lateAt: T.h0Land, lineHeight: 0.98 })
  const H2 = popText(root, 'Out loud | is *brave.*', { top: 196, size: 136, accentSize: 214, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1490, width: 960, height: 260, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const ink = '#140c2c'
  const rr = (x0, y0, w, h, r, col) => { x.fillStyle = col; x.beginPath(); x.roundRect(x0, y0, w, h, r); x.fill() }
  function ground() {
    x.fillStyle = '#120c2a'; x.fillRect(0, 1250, W, 670)
    x.fillStyle = 'rgba(239,230,214,0.3)'; x.fillRect(0, 1250, W, 4)
    // a parking-lot line + a tiny roadside mesquite
    x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(60, 1420, 8, 120); x.fillRect(1012, 1420, 8, 120)
    x.fillStyle = '#1f1440'; x.fillRect(0, 1180, W, 70)
  }
  function vanBody(t, shake) {
    x.save(); x.translate(Math.round(shake * 4), 0)
    x.fillStyle = ink; x.fillRect(270, 1310, 120, 70); x.fillRect(690, 1310, 120, 70)                // tires
    rr(V.x0 - 8, V.top - 8, V.x1 - V.x0 + 16, V.bot - V.top + 16, 60, ink)
    rr(V.x0, V.top, V.x1 - V.x0, V.bot - V.top, 54, '#efe3c8')
    x.fillStyle = '#3fb6a0'; x.fillRect(V.x0, 1120, V.x1 - V.x0, 140); rr(V.x0, 1200, V.x1 - V.x0, V.bot - 1200, 40, '#3fb6a0')
    x.fillStyle = '#f28a3c'; x.fillRect(V.x0, 1092, V.x1 - V.x0, 16); x.fillStyle = '#ffd166'; x.fillRect(V.x0, 1108, V.x1 - V.x0, 12)
    for (const lx of [V.x0 + 6, V.x1 - 46]) { x.fillStyle = ink; x.fillRect(lx - 4, 1136, 48, 100); x.fillStyle = '#ff5a5a'; x.fillRect(lx, 1140, 40, 92); x.fillStyle = '#ffb3b3'; x.fillRect(lx + 6, 1146, 12, 20) }
    x.fillStyle = ink; x.fillRect(V.x0 + 6, 1272, V.x1 - V.x0 - 12, 56); x.fillStyle = '#c9c3d8'; x.fillRect(V.x0 + 12, 1278, V.x1 - V.x0 - 24, 44)
    x.fillStyle = ink; x.fillRect(450, 1150, 180, 50); x.fillStyle = '#f5f1ff'; x.fillRect(456, 1156, 168, 38)
    x.fillStyle = ink; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TX', 540, 1176)
    // the roof rack peeking over the top
    x.fillStyle = ink; x.fillRect(300, V.top - 26, 480, 18); x.fillStyle = '#c9c3d8'; x.fillRect(304, V.top - 22, 472, 10)
    x.restore()
  }
  function cargo(t, shake, gk) {
    // the open hatch: the dark cargo bay, the luggage, the ghost
    x.save(); x.translate(Math.round(shake * 4), 0)
    rr(LID.x0, LID.hinge, LID.x1 - LID.x0, LID.h, 20, '#1a1236')
    x.fillStyle = '#251a4a'; x.fillRect(LID.x0, LID.hinge + LID.h - 70, LID.x1 - LID.x0, 70)
    x.save(); x.beginPath(); x.rect(LID.x0, LID.hinge, LID.x1 - LID.x0, LID.h); x.clip()
    drawBits(x, SUITCASE, SUIT_C, 340, 980, 14)
    drawBits(x, COOLER, COOL_C, 742, 1000, 13)
    drawBits(x, CHIPS, CHIP_C, 668, 1048, 6, { rot: 0.3 })
    // the ghost, in its sheet
    if (gk > 0) {
      const G = ghostState(t)
      const bob = Math.sin(t * 2.4) * 6 - (t > T.yes ? Math.abs(Math.sin((t - T.yes) * 7)) * 18 * Math.exp(-(t - T.yes) * 1.2) : 0)
      const shy = t > T.wave[0] && t < T.s2 ? 0.08 * Math.sin(t * 2) : 0
      drawGhostSheet(x, t, GHOST.x, GHOST.y + bob, GHOST.cell, { look: G.look, wide: G.wide, blush: G.blush, rot: shy, alpha: gk })
      // the tiny wave (a sheet-hand nub at its right side)
      const wv = prog(t, T.wave[0], T.wave[0] + 0.2) * (1 - prog(t, T.wave[1] - 0.2, T.wave[1]))
      if (wv > 0) {
        const a = Math.sin((t - T.wave[0]) * 12) * 0.5
        drawBits(x, HAND, { W: '#f4f7ff' }, Math.round(GHOST.x + 15 * GHOST.cell + Math.sin(a) * 10), Math.round(GHOST.y + bob - 6 * GHOST.cell - wv * 20), GHOST.cell, { rot: a, outline: '#2a2156', alpha: wv })
      }
    }
    x.restore()
    x.restore()
  }
  function lid(t, shake) {
    const a = lidAngle(t), c = Math.cos(a), hh = LID.h * c
    x.save(); x.translate(Math.round(shake * 4), Math.round(shake * -3))
    if (c >= 0) {
      // the lid's outside face, foreshortened as it rises: rear window over a cream panel with a handle
      const y0 = LID.hinge, y1 = LID.hinge + hh
      x.fillStyle = ink; x.fillRect(LID.x0 - 6, y0 - 6, LID.x1 - LID.x0 + 12, hh + 12)
      x.fillStyle = '#e8dcc0'; x.fillRect(LID.x0, y0, LID.x1 - LID.x0, hh)
      const wy0 = y0 + 30 * c, wh = 230 * c
      x.fillStyle = '#cdbd9c'; x.fillRect(LID.x0 + 30, wy0 - 8 * c, LID.x1 - LID.x0 - 60, wh + 16 * c)
      x.fillStyle = '#221a48'; x.fillRect(LID.x0 + 38, wy0, LID.x1 - LID.x0 - 76, wh)
      x.fillStyle = 'rgba(255,255,255,0.1)'; x.fillRect(LID.x0 + 90, wy0, 50, wh); x.fillRect(LID.x0 + 160, wy0, 20, wh)
      x.fillStyle = ink; x.fillRect(500, y0 + 330 * c, 80, 22 * c); x.fillStyle = '#c9c3d8'; x.fillRect(506, y0 + 334 * c, 68, 14 * c)
    } else {
      // swung up past the roof: we see its dark underside above the hinge
      const y1 = LID.hinge, y0 = LID.hinge + hh
      x.fillStyle = ink; x.fillRect(LID.x0 - 6, y0 - 6, LID.x1 - LID.x0 + 12, -hh + 12)
      x.fillStyle = '#3a2e6e'; x.fillRect(LID.x0, y0, LID.x1 - LID.x0, -hh)
      x.fillStyle = '#2a2156'; x.fillRect(LID.x0 + 20, y0 + 10, LID.x1 - LID.x0 - 40, -hh - 20)
      // two gas struts
      x.strokeStyle = '#5a5470'; x.lineWidth = 8
      for (const sx of [LID.x0 + 20, LID.x1 - 20]) { x.beginPath(); x.moveTo(sx, y0 + 10); x.lineTo(sx + (sx < 540 ? -4 : 4), y1 + 120); x.stroke() }
    }
    x.restore()
  }
  function thumpMarks(t) {
    for (const th of T.thumps) {
      const u = t - th
      if (u < 0 || u > 0.45) continue
      x.save(); x.globalAlpha = 1 - u / 0.45; x.fillStyle = BONE
      const d = 20 + u * 120
      for (const [dx, dy] of [[-1, -0.4], [1, -0.4], [-1, 0.3], [1, 0.3]]) x.fillRect(Math.round(540 + dx * (300 + d)), Math.round(860 + dy * (80 + d)), 30, 8)
      x.restore()
    }
  }
  function bubble(t) {
    const p = pop01(t, T.ask, 0.3, 2.6) * outK(t, [T.out[0], T.out[0] + 0.2])
    if (p <= 0.01) return
    const bx = 540, by = 640
    x.save(); x.translate(bx, by); x.scale(p, p)
    x.font = `700 46px ${MONO}`; x.letterSpacing = '1px'
    const label = 'can i come?', w = Math.ceil(x.measureText(label).width) + 64, h = 92
    x.fillStyle = ink; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#f4f7ff'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = ink; x.fillRect(-12, h / 2, 24, 18); x.fillStyle = '#f4f7ff'; x.fillRect(-6, h / 2, 12, 12)
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 4)
    x.restore()
  }
  function hearts(t, cx, cy) {
    for (let i = 0; i < 5; i++) {
      const born = T.yes + i * 0.22, life = 1.1
      if (t < born || t > born + life) continue
      const p = (t - born) / life
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + (i % 3 - 1) * 40), Math.round(cy - p * 160), 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      ground()
      const ok = popOut(t, T.out), va = clamp(ok)
      if (va > 0.01) {
        const shake = lidShake(t)
        x.save(); x.globalAlpha = va
        x.translate(540, 1330); x.scale(lerp(0.9, 1, va), lerp(0.9, 1, va)); x.translate(-540, -1330)
        vanBody(t, shake)
        const open = t >= T.lid[0]
        if (open) cargo(t, shake, clamp(prog(t, T.lid[0] + 0.15, T.lid[1])) * va)
        lid(t, shake)
        thumpMarks(t)
        x.restore()
        // the two stars on either side
        const sp = pop01(t, 0.25, 0.36, 2) * ok, vp = pop01(t, 0.45, 0.36, 2) * ok
        const rs = drawStarChar(x, SAGP.x, SAGP.y, SAGP.s, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: HOPS, pop: sp, seed: 11, glow: 1 })
        const rv = drawStarChar(x, VIRP.x, VIRP.y, VIRP.s, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: HOPS.map(h => h + 0.08), pop: vp, seed: 8, glow: 1 })
        if (t > T.yes && t < T.out[0]) { hearts(t, rs.x, rs.top); hearts(t, rv.x, rv.top) }
        bubble(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card-motif cut: 6.42 (H0 out, the ghost's line → the stars' answer).
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', 0.35, 739.99, 0.03, -0.4], ['pop', 0.55, 880, 0.03, 0.4],
  ...T.thumps.flatMap(th => [['tick', th, 0.07], ['pop', th + 0.01, 196, 0.06, 0]]),
  ['tick', T.look, 0.025],
  ['whoosh', T.lid[0], 0.5, 0.03], ['pop', T.lid[1], 1174.66, 0.04, 0], ['glitter', T.lid[1], T.lid[1] + 0.5],
  ['pluck', T.wave[0], 987.77, 0.035, 0.6, 0.1],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GH]: 1046.5 } }),
  ['pop', T.up, 880, 0.03, 0],
  ...wordPops(T.h2, 3, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['pop', T.ask, 1046.5, 0.04, 0], ['pop', T.ask + 0.08, 1318.51, 0.035, 0],
  ['bell', T.yes, 1760, 0.03, 1.2, 0], ['pop', T.yes + 0.05, 880, 0.035, -0.4], ['pop', T.yes + 0.13, 1108.73, 0.035, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
