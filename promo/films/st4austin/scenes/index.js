// st4austin (20 s vertical Align ad, Star Talk season 4, EP 043, thread A) · story 0–15.6, then the shared end card
// with "JOIN THE TEXAS BETA".
//   0.00–5.60  "Dear | *Austin.*"  A small live-music stage under string lights: a bone star plays a pixel guitar, notes
//              float up. In front, ♒ Aquarius has its headphones on; on the drop (2.82) it slides them down round its neck,
//              closes its eyes and sways. ♒ AQUARIUS: "this city listens to music like it *matters.*"
//   5.65–10.45 "Live Music | *Capital.*" (Austin's real nickname)  THE STARS: "listen to your date like that, too." Aquarius
//              opens its eyes and turns to the bone date star beside it, who's talking ("…"); Aquarius nods along, rapt.
//              The ghost leans out from behind the amp on stage (8.9–10.2).
//  10.52 cut → "Listen like | it's *live.*"  A spotlight finds the two of them facing each other, notes and hearts.
//              Everything pops out by 15.4; the end card takes over at 15.6.
// HELLO TEXAS (drop 5): this last line is the first L. One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 43
export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff', MAG = '#ff5fd2'
const AQU = signStar('aquarius')

// ── the timeline (drop on 2.82; synthwave ~0.469 s beats)
const T = {
  h0: 0.15, h0Land: 0.6, h0Out: [5.45, 5.62],
  aquIn: 0.45, dateIn: 0.7, slide: [2.82, 3.25],
  open: 3.25, a1: 3.45,
  h1: 5.65, h1Land: 6.05, s2: 7.25, turn: 8.0, nods: [8.5, 9.0, 9.5, 10.0], ghost: 8.9, close: 10.35, h1Out: [10.25, 10.45],
  cut: 10.52, h2: 10.62, h2Land: 11.0, spot: [10.7, 11.2], hearts: 11.6, h2Out: [15.08, 15.35], out: [15.0, 15.4],
}
const AQ = '♒ AQUARIUS', SPEAK = 'THE STARS'
const LINES = [
  { t: T.a1, speaker: AQ, text: 'this city listens to music like it *matters.*', color: CYAN },
  { t: T.s2, speaker: SPEAK, text: 'listen to your date like that, too.' },
]
const CPS = 27
const BEATS = []
for (let b = 0.48; b < STORY_END - 0.3; b += 0.469) BEATS.push(+b.toFixed(3))

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

// ── props
const GUITAR = [
  '..................KK',
  '.................KKK',
  '................KK..',
  '...............nn...',
  '..............nn....',
  '.............nn.....',
  '..BBBB......nn......',
  '.BbbbbB....nn.......',
  'BbbbbbbBBBnn........',
  'BbbHHbbbbnB.........',
  'BbHkkHbbbbB.........',
  'BbHkkHbbbbB.........',
  'BbbHHbbbbB..........',
  '.BbbbbbbB...........',
  '..BBBBBB............',
]
const GUITAR_C = { K: '#2a2156', n: '#8a5a2a', B: '#c4562a', b: '#f28a3c', H: '#ffd166', k: '#1b1236' }
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const STAGE = { x0: 110, x1: 970, top: 1010, face: 84 }
const AMP = { x: 170, y: 846, w: 150, h: 164 }
const PLAYER = { x: 590, y: 880, s: 210 }
const AQ_P = { x: 330, y: 1290, s: 290 }, DATE_P = { x: 770, y: 1300, s: 250 }

function aquState(t) {
  if (t < T.slide[0]) return { mood: 'happy', look: [1, -1] }
  if (t < T.turn) return { mood: 'sleepy', zzz: false, blush: 0.7 }                    // eyes closed, listening
  if (t < T.cut) return { mood: 'sparkle', look: [1, 0] }                             // listening to the date like that
  return { mood: t > T.hearts ? 'heart' : 'sparkle', look: [1, 0] }
}
function dateState(t) {
  if (t < T.turn) return { mood: 'happy', look: [-1, -1] }
  if (t < T.cut) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'sparkle', look: [-1, 0], blush: 0.9 }
}
const SWAY = BEATS.filter(b => b > T.slide[1] && b < T.turn && Math.round((b - 0.48) / 0.469) % 2 === 0)
const AQ_HOPS = [T.aquIn + 0.3, ...talkHops(LINES, AQ, { cps: CPS }), ...T.nods, T.h2Land]
const DATE_HOPS = [T.dateIn + 0.3, 8.3, 8.75, 9.25, 9.7, T.h2Land + 0.15]
const PLAYER_HOPS = BEATS.filter((b, i) => i % 2 === 0)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *Austin.*', { top: 176, size: 128, accentSize: 210, at: T.h0, gap: 0.12, accentColor: CYAN, wobble: true, late: 1, lateAt: T.h0Land, lineHeight: 0.98 })
  const H1 = popText(root, 'Live Music | *Capital.*', { top: 190, size: 124, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: MAG })
  const H2 = popText(root, "Listen like | it's *live.*", { top: 190, size: 132, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 260, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const beatK = t => { let k = 0; for (const b of BEATS) { const u = t - b; if (u >= 0 && u < 0.4) k = Math.max(k, Math.exp(-u * 8)) } return k }

  function stringLights(t) {
    const strands = [[540, 130, 0], [690, 90, 1]]
    for (const [y0, sag, s] of strands) {
      x.strokeStyle = '#140c2c'; x.lineWidth = 4; x.beginPath()
      for (let xx = -20; xx <= 1100; xx += 20) { const u = (xx + 20) / 1120, y = y0 + sag * 4 * u * (1 - u); xx === -20 ? x.moveTo(xx, y) : x.lineTo(xx, y) }
      x.stroke()
      for (let i = 0; i < 16; i++) {
        const xx = -10 + i * 72 + s * 36, u = (xx + 20) / 1120, y = y0 + sag * 4 * u * (1 - u)
        const tw = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.7 + s), col = ['#ffd98a', '#ff9f6b', '#fff1c8', '#ffb3cc'][(i + s) % 4]
        const g = x.createRadialGradient(xx, y + 12, 0, xx, y + 12, 34)
        g.addColorStop(0, `rgba(255,217,138,${0.45 * tw})`); g.addColorStop(1, 'rgba(255,217,138,0)')
        x.fillStyle = g; x.fillRect(xx - 34, y - 22, 68, 68)
        x.fillStyle = '#140c2c'; x.fillRect(xx - 4, y, 8, 6)
        x.fillStyle = col; x.fillRect(xx - 7, y + 6, 14, 14); x.fillRect(xx - 4, y + 20, 8, 4)
      }
    }
  }
  function backdrop(t) {
    // a neon synthwave grid floor glow behind the stage + a sunset-stripe disc on the backdrop
    const g = x.createLinearGradient(0, 760, 0, STAGE.top)
    g.addColorStop(0, 'rgba(255,95,210,0)'); g.addColorStop(1, 'rgba(255,95,210,0.22)')
    x.fillStyle = g; x.fillRect(0, 760, W, STAGE.top - 760)
    // stage lights: two coloured cones swinging with the beat
    const bk = beatK(t)
    for (const [lx, col, ph] of [[260, '255,95,210', 0], [820, '127,224,255', 1.7]]) {
      const a = Math.sin(t * 1.1 + ph) * 0.25
      x.save(); x.translate(lx, 720); x.rotate(a)
      const cg = x.createLinearGradient(0, 0, 0, 330)
      cg.addColorStop(0, `rgba(${col},${0.32 + 0.18 * bk})`); cg.addColorStop(1, `rgba(${col},0)`)
      x.fillStyle = cg; x.beginPath(); x.moveTo(-14, 0); x.lineTo(14, 0); x.lineTo(130, 330); x.lineTo(-130, 330); x.fill()
      x.fillStyle = '#2a2156'; x.fillRect(-22, -18, 44, 26)
      x.restore()
    }
  }
  function stageBox() {
    x.fillStyle = '#140c2c'; x.fillRect(STAGE.x0 - 6, STAGE.top - 6, STAGE.x1 - STAGE.x0 + 12, STAGE.face + 12)
    x.fillStyle = '#6b4024'; x.fillRect(STAGE.x0, STAGE.top, STAGE.x1 - STAGE.x0, 14)
    x.fillStyle = '#4a2a18'; x.fillRect(STAGE.x0, STAGE.top + 14, STAGE.x1 - STAGE.x0, STAGE.face - 14)
    x.fillStyle = '#3a2012'
    for (let xx = STAGE.x0 + 70; xx < STAGE.x1; xx += 110) x.fillRect(xx, STAGE.top + 14, 6, STAGE.face - 14)
    // the floor in front (a dance-floor glow)
    x.fillStyle = '#100a24'; x.fillRect(0, STAGE.top + STAGE.face, W, 1920)
    x.strokeStyle = 'rgba(255,95,210,0.25)'; x.lineWidth = 3
    for (let k = 0; k < 9; k++) { const y = STAGE.top + STAGE.face + 20 + k * k * 9; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke() }
    for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(540 + k * 40, STAGE.top + STAGE.face); x.lineTo(540 + k * 260, 1920); x.stroke() }
  }
  function amp(t) {
    const { x: ax, y: ay, w, h } = AMP, bk = beatK(t)
    x.fillStyle = INK; x.fillRect(ax - 6, ay - 6, w + 12, h + 12)
    x.fillStyle = '#2a2156'; x.fillRect(ax, ay, w, h)
    x.fillStyle = '#3a2e6e'; x.fillRect(ax + 10, ay + 10, w - 20, 22)
    for (const [i, c] of [[0, GOLD], [1, BONE], [2, BONE]]) { x.fillStyle = c; x.fillRect(ax + 20 + i * 22, ay + 17, 8, 8) }
    x.fillStyle = '#140c2c'; x.fillRect(ax + 14, ay + 42, w - 28, h - 56)
    // the speaker cone pumps on the beat
    const r = 40 + bk * 5
    x.fillStyle = '#4b3f80'; x.beginPath(); x.arc(ax + w / 2, ay + 42 + (h - 56) / 2, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#140c2c'; x.beginPath(); x.arc(ax + w / 2, ay + 42 + (h - 56) / 2, 13, 0, Math.PI * 2); x.fill()
  }
  function micStand() {
    x.fillStyle = '#5a5470'; x.fillRect(PLAYER.x - 150, 830, 7, 180); x.fillRect(PLAYER.x - 175, 1004, 56, 7)
    x.save(); x.translate(PLAYER.x - 146, 830); x.rotate(0.5); x.fillRect(0, 0, 7, 60); x.restore()
    x.fillStyle = '#2a2156'; x.fillRect(PLAYER.x - 128, 870, 18, 26)
  }
  function headphones(cx, cy, s, k, a = 1) {
    // k 0 → on the head, 1 → resting round the neck (the band flips under)
    const oy = lerp(-0.02, 0.34, ease.inOutCubic(k)) * s
    x.save(); x.globalAlpha *= a
    x.lineWidth = s * 0.05; x.strokeStyle = INK
    x.beginPath()
    if (k < 0.5) x.arc(cx, cy + oy, s * 0.3, Math.PI * 1.12, Math.PI * 1.88)
    else x.arc(cx, cy + oy - s * 0.1, s * 0.3, Math.PI * 0.12, Math.PI * 0.88)
    x.stroke(); x.lineWidth = s * 0.028; x.strokeStyle = '#7fe0b8'; x.stroke()
    for (const sgn of [-1, 1]) {
      x.fillStyle = INK; x.fillRect(cx + sgn * s * 0.3 - s * 0.06, cy + oy - s * 0.1, s * 0.12, s * 0.17)
      x.fillStyle = '#7fe0b8'; x.fillRect(cx + sgn * s * 0.3 - s * 0.045, cy + oy - s * 0.085, s * 0.09, s * 0.14)
    }
    x.restore()
  }
  function notes(t, cx, cy, t0, t1, n = 7) {
    for (let i = 0; i < n; i++) {
      const period = 2.2, born = t0 + i * (period / n)
      if (t < born || t > t1) continue
      const p = ((t - born) % period) / period
      drawBits(x, NOTE, { X: [CYAN, MAG, BONE, GOLD][i % 4] }, Math.round(cx + (i % 3 - 1) * 90 + Math.sin(p * 6 + i) * 24), Math.round(cy - p * 170), 7, { alpha: Math.sin(Math.PI * p) * 0.95 })
    }
  }
  function talkDots(t, cx, cy) {
    if (t < T.turn + 0.15 || t > T.cut) return
    const p = pop01(t, T.turn + 0.15, 0.3, 2.4)
    x.save(); x.translate(cx, cy); x.scale(p, p)
    x.fillStyle = INK; x.fillRect(-64, -40, 128, 80); x.fillStyle = BONE; x.fillRect(-58, -34, 116, 68)
    x.fillRect(-30, 34, 18, 14); x.fillStyle = INK; x.fillRect(-36, 40, 6, 14)
    for (let k = 0; k < 3; k++) { const on = Math.floor(t * 4) % 4 > k; x.fillStyle = on ? INK : 'rgba(27,18,54,0.3)'; x.fillRect(-40 + k * 30, -8, 16, 16) }
    x.restore()
  }
  function spotlight(t, cx) {
    const k = prog(t, ...T.spot) * outK(t, T.out)
    if (k <= 0) return
    const g = x.createLinearGradient(0, 760, 0, 1480)
    g.addColorStop(0, `rgba(255,241,200,${0.05 * k})`); g.addColorStop(1, `rgba(255,241,200,${0.22 * k})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(cx - 70, 760); x.lineTo(cx + 70, 760); x.lineTo(cx + 420, 1480); x.lineTo(cx - 420, 1480); x.fill()
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.36, life = 1.4
      if (t < born || t > born + life || t > T.out[0]) continue
      const p = (t - born) / life
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + (i % 3 - 1) * 70 + Math.sin(p * 6 + i) * 20), Math.round(cy - p * 220), 8, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      drawSeedConstellation(x, t, EP)
      backdrop(t)
      stringLights(t)
      const ok = popOut(t, T.out)
      // the player on stage
      micStand()
      const pr = drawStarChar(x, PLAYER.x, PLAYER.y, PLAYER.s, t, { color: STAR.bone, mood: 'happy', look: [0, 0], hops: PLAYER_HOPS, seed: 4, glow: 0.8, alpha: ok })
      drawBits(x, GUITAR, GUITAR_C, Math.round(pr.x + 6), Math.round(pr.y + PLAYER.s * 0.16), 9, { rot: -0.15 + 0.06 * Math.sin(t * 13.4), alpha: ok })
      notes(t, PLAYER.x + 40, pr.top - 10, 0.5, T.out[0])
      amp(t)
      // the ghost leans out past the amp's left edge (drawn after the amp, clipped to its left)
      drawGhostCameo(x, t, { x: AMP.x - 2, y: AMP.y + 70, at: T.ghost, dur: 1.3, from: 'right', cell: 3 })
      stageBox()
      spotlight(t, 550)
      if (ok > 0) {
        const sway = t > T.slide[1] && t < T.turn ? Math.sin((t - T.slide[1]) * Math.PI / 0.938) * 12 : 0
        const ap = pop01(t, T.aquIn, 0.36, 2) * ok
        const leanA = t > T.turn ? ease.inOutCubic(prog(t, T.turn, T.turn + 0.4)) * 40 : 0
        const ra = drawStarChar(x, AQ_P.x + sway + leanA, AQ_P.y, AQ_P.s, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQ_HOPS, pop: ap, seed: 6, glow: 1.1 })
        if (ap > 0.05) headphones(ra.x, ra.y, AQ_P.s * ap, prog(t, ...T.slide), clamp(ap * 2))
        const dp = pop01(t, T.dateIn, 0.36, 2) * ok
        const rd = drawStarChar(x, DATE_P.x - leanA * 0.5, DATE_P.y, DATE_P.s, t, { color: STAR.bone, ...dateState(t), hops: DATE_HOPS, pop: dp, seed: 12, glow: 0.9 })
        talkDots(t, rd.x + 40, rd.top - 70)
        if (t > T.hearts) floatHearts(t, (ra.x + rd.x) / 2, ra.top - 20, T.hearts)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.63 (H0 out → "Live Music Capital") and 10.52 (box shut → "Listen like it's live."). cardfx keeps 10.52.
const CUTS = [5.63, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.aquIn + 0.1, 739.99, 0.035, -0.4], ['pop', T.dateIn + 0.1, 880, 0.035, 0.4],
  ['whoosh', T.slide[0], 0.4, 0.025], ['pluck', T.slide[1], 987.77, 0.04, 0.8, -0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [AQ]: 880 } }),
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.turn, 659.25, 0.03, 0.2], ...T.nods.map(n => ['tick', n + 0.2, 0.018]),
  ['tick', T.ghost + 0.3, 0.018],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.07, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.spot[0], 0.5, 0.02], ['bell', T.hearts, 1760, 0.025, 1.2, 0], ['glitter', T.hearts, T.hearts + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
