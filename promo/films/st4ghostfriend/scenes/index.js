// st4ghostfriend (15 s vertical Align ad, Star Talk season 4, EP 062, thread C5) · story 0–10.6, then the shared end card.
//   0.00–4.90  "The ghost made | a *friend.*"  A roadside diner at night: a neon DINER sign, a red booth, two mugs steaming.
//              The ghost (stghost's sheet) sits on one side; a shy bone-coloured star slides in opposite and asks, in a
//              little bubble: "wanna hang out?"  The ghost's eyes go wide and it starts to fade out (old habit).
//              Drop (2.82): GHOST: "i usually disappear here."  It hangs there, see-through, flickering.
//   5.00–7.90  "Old habit. | *Stay.*"  THE STARS: "stay. *awkward* beats gone."  The ghost pops back solid, blushes, and
//              the two clink mugs (sparkles). Box shuts.
//   8.05       card cut (flip).
//   8.15–10.4  "Awkward beats | *absent.*"  The two in the booth, happy, the ghost still blushing. Out by 10.45.
// The ghost is the star of this one, so no cameo: it's drawn with drawGhostSheet. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 62
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', NEON = '#ff5fa2', TEAL = '#7fe8e0'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  h0: 0.12, h0Out: [4.78, 4.96],
  diner: 0.2, ghostIn: 0.35, shyIn: 0.9, ask: [1.25, 3.4], gulp: 2.05, fade: [2.3, 2.85],
  open: 2.66, l1: 2.85,
  h1: 5.02, h1Land: 5.42, l2: 5.25, back: [5.4, 5.75], blush: 5.85, clink: 6.75, h1Out: [7.72, 7.9], close: 7.9,
  cut: 8.05, h2: 8.15, h2Land: 8.55, h2Out: [10.18, 10.42], out: [10.05, 10.45],
}
const GHOSTTAG = 'THE GHOST', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: GHOSTTAG, text: 'i usually disappear here.', color: TEAL },
  { t: T.l2, speaker: SPEAK, text: 'stay. *awkward* beats gone.' },
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
const MUG = ['.MMMMMM..', 'MWMMMMMHH', 'MWMMMMM.H', 'MMMMMMM.H', 'MMMMMMMHH', 'MMMMMMM..', '.MMMMM...']
const MUG_C = { M: '#f4efe4', W: '#ffffff', H: '#d9cfbd' }
const STEAM = ['.S', 'S.', '.S', 'S.']

// ── layout
const BOOTH_TOP = 830, TABLE_Y = 1150
const GHOST = { x: 330, y: 1010 }, SHY = { x: 760, y: 1040, size: 250 }

function ghostState(t) {
  if (t < T.shyIn + 0.3) return { look: [0, 0] }
  if (t < T.gulp) return { look: [1, 0] }
  if (t < T.back[0]) return { look: [t < T.l1 ? 1 : 0, t < T.l1 ? 0 : 1], wide: true }   // eyes wide, then down at the table
  if (t < T.blush) return { look: [0, 0], wide: true }
  return { look: [1, 0], blush: 1 }
}
function shyState(t) {
  if (t < T.ask[0]) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.fade[1]) return { mood: 'happy', look: [-1, 0] }
  if (t < T.back[1]) return { mood: 'wide', look: [-1, 0], blink: false }
  return { mood: t > T.clink ? 'heart' : 'happy', look: [-1, 0] }
}
const SHY_HOPS = [T.shyIn + 0.3, T.ask[0], T.back[1], T.clink, T.h2Land]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The ghost made | a *friend.*', { top: 200, size: 100, accentSize: 160, at: T.h0, gap: 0.1, accentColor: TEAL, wobble: true, late: 1, lateAt: T.h0 + 0.5 })
  const H1 = popText(root, 'Old habit. | *Stay.*', { top: 200, size: 104, accentSize: 164, at: T.h1, gap: 0.12, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Awkward beats | *absent.*', { top: 200, size: 100, accentSize: 164, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function neon(t, k) {
    const flick = (Math.floor(t * 9) % 23 === 0 ? 0.45 : 1) * k
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 92px ${MONO}`; x.letterSpacing = '0.16em'
    x.shadowColor = NEON; x.shadowBlur = 36 * flick; x.fillStyle = `rgba(255,95,162,${0.95 * flick})`
    x.fillText('DINER', 552, 622); x.shadowBlur = 14 * flick; x.fillText('DINER', 552, 622)
    x.font = `700 30px ${MONO}`; x.letterSpacing = '0.3em'; x.shadowColor = TEAL; x.fillStyle = `rgba(127,232,224,${0.9 * k})`
    x.fillText('OPEN ALL NIGHT', 558, 702)
    x.restore()
    // neon tube frame
    x.save(); x.globalAlpha = 0.7 * flick; x.strokeStyle = NEON; x.lineWidth = 5; x.shadowColor = NEON; x.shadowBlur = 20
    x.strokeRect(330, 562, 420, 170); x.restore()
  }
  function booth(t, k) {
    // the window behind: a night road to the horizon
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(10,6,26,0.55)'; x.fillRect(120, BOOTH_TOP - 40, 840, 60)
    // booth back: red vinyl with tufted pixel buttons
    const B = 10
    for (let j = 0; j < 34; j++) for (let i = 0; i < 82; i++) {
      const top = j < 2 && (i < 2 || i > 79)
      if (top) continue
      let col = '#c23a4e'
      if (j === 0 || j === 1) col = '#e0646f'
      else if (i % 20 === 10 && j % 8 === 5) col = '#8e2236'
      else if (i === 40 || i === 41) col = '#9c2a3d'
      else if (j > 30) col = '#a02e42'
      x.fillStyle = col; x.fillRect(130 + i * B, BOOTH_TOP + j * B, B + 0.5, B + 0.5)
    }
    x.fillStyle = INK; x.fillRect(120, BOOTH_TOP - 10, 840, 10); x.fillRect(120, BOOTH_TOP, 10, 340); x.fillRect(950, BOOTH_TOP, 10, 340)
    x.restore()
  }
  function table(t, k) {
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(90, TABLE_Y - 10, 900, 80)
    x.fillStyle = '#d7dde8'; x.fillRect(100, TABLE_Y, 880, 22)
    x.fillStyle = '#ffffff'; x.fillRect(100, TABLE_Y, 880, 6)
    x.fillStyle = '#9aa6bd'; x.fillRect(100, TABLE_Y + 22, 880, 38)
    for (let i = 0; i < 22; i++) { x.fillStyle = i % 2 ? '#b8c2d6' : '#8893ab'; x.fillRect(100 + i * 40, TABLE_Y + 30, 40, 8) }   // chrome trim
    x.fillStyle = INK; x.fillRect(510, TABLE_Y + 70, 60, 170); x.fillStyle = '#6b7690'; x.fillRect(520, TABLE_Y + 70, 40, 170)
    x.restore()
  }
  function mugs(t, k) {
    const cl = t > T.clink - 0.3 && t < T.clink + 0.5 ? Math.sin(Math.PI * prog(t, T.clink - 0.3, T.clink + 0.5)) : 0
    const mx = [[420, 1], [660, -1]]
    for (const [m, s] of mx) {
      const cx = m + s * cl * 50, cy = TABLE_Y - 34 - cl * 70
      drawBits(x, MUG, MUG_C, cx, cy, 8 * k, { rot: s * cl * 0.35, alpha: k })
      for (let i = 0; i < 2; i++) {
        const p = (t * 0.5 + i * 0.5 + (s > 0 ? 0 : 0.25)) % 1
        drawBits(x, STEAM, { S: 'rgba(255,255,255,0.8)' }, cx - 6 + i * 16, cy - 50 - p * 60, 6, { alpha: Math.sin(Math.PI * p) * 0.7 * k, outline: null })
      }
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, TEAL]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function askBubble(t) {
    const a = pop01(t, T.ask[0], 0.3, 2.2) * (1 - prog(t, T.ask[1] - 0.15, T.ask[1]))
    if (a <= 0.01) return
    const cx = 735, cy = 792, w = 400 * a, h = 100 * a
    x.save()
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12)
    x.fillStyle = BONE; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    x.fillStyle = INK; x.fillRect(cx + 40 * a - 6, cy + h / 2, 30 * a, 30 * a); x.fillStyle = BONE; x.fillRect(cx + 40 * a, cy + h / 2, 18 * a, 22 * a)
    x.font = `700 ${Math.round(40 * a)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('wanna hang out?', cx, cy + 2)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out), k = clamp(pop01(t, T.diner, 0.45, 1.3)) * clamp(ok)
        // warm diner glow
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(540, 1000, 0, 540, 1000, 620); g.addColorStop(0, `rgba(255,150,170,${0.14 * k})`); g.addColorStop(1, 'rgba(255,150,170,0)')
        x.fillStyle = g; x.fillRect(0, 380, 1080, 1240); x.restore()
        const dy = t >= T.cut ? 150 : 0                     // box shut: the booth drops into the freed space (under the cut)
        x.save(); x.translate(0, dy)
        neon(t, k)
        booth(t, k)
        // the ghost: fades out (old habit), flickers see-through, then comes back solid
        const gp = pop01(t, T.ghostIn, 0.4, 1.8) * ok
        const fade = ease.inOutCubic(prog(t, ...T.fade)) * (1 - ease.outCubic(prog(t, ...T.back)))
        const flick = fade > 0.5 ? 0.05 * Math.sin(t * 40) : 0
        const gs = ghostState(t)
        if (gp > 0.02) {
          const jit = fade > 0.3 ? Math.round(Math.sin(t * 33) * 3) : 0
          drawGhostSheet(x, t, GHOST.x + jit, GHOST.y + Math.sin(t * 2) * 6, 7 * gp, { ...gs, alpha: clamp(1 - 0.82 * fade + flick) })
          if (t > T.back[0]) sparkles(t, GHOST.x, GHOST.y - 40, T.back[0] + 0.1, 10, 150, 0.5, [TEAL, BONE, GOLD])
        }
        const sp = pop01(t, T.shyIn, 0.38, 2.1) * ok
        if (sp > 0.02) {
          const slide = (1 - ease.outCubic(prog(t, T.shyIn - 0.1, T.shyIn + 0.35))) * 300
          drawStarChar(x, SHY.x + slide, SHY.y, SHY.size, t, { color: STAR.bone, ...shyState(t), hops: SHY_HOPS, pop: sp, seed: 5, glow: 0.9, blush: 0.9 })
        }
        table(t, k)
        mugs(t, k)
        sparkles(t, 540, TABLE_Y - 110, T.clink, 10, 110, 2)
        x.restore()
        askBubble(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [4.98, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.024), ['pop', T.h0 + 0.5, 1046.5, 0.042, 0],
  ['tick', T.diner + 0.1, 0.04], ['tick', T.diner + 0.2, 0.03],
  ['pop', T.ghostIn + 0.1, 783.99, 0.035, -0.4], ['whoosh', T.shyIn - 0.1, 0.35, 0.03], ['pop', T.shyIn + 0.2, 659.25, 0.035, 0.4],
  ['pop', T.ask[0], 880, 0.035, 0.3], ['pop', T.ask[0] + 0.08, 1174.66, 0.03, 0.3],
  ['pop', T.gulp, 392, 0.035, -0.3], ['whoosh', T.fade[0], 0.6, 0.035],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GHOSTTAG]: 520 } }),
  ...wordPops(T.h1, 2, 0.12, 2, 0.024), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['pluck', T.back[0] + 0.1, 1046.5, 0.045, 0.6, -0.3], ['glitter', T.back[0] + 0.1, T.back[0] + 0.5],
  ['bell', T.clink, 2093, 0.03, 0.8, 0], ['bell', T.clink + 0.03, 2637, 0.02, 0.8, 0], ['glitter', T.clink, T.clink + 0.4],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['bell', T.h2Land + 0.05, 1568, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
