// srl06constellation (20 s vertical, Star Talk Remix of the L06 "Constellation" loop) · story 0–15.6, then the end card.
// The loop's image: a turning network of stars with constellation lines drawing between them on the beat.
// Here the network is the twelve sign stars, and THE STARS run the join-the-dots.
//   0.00–5.00  "Connect the | *stars.*"  The twelve sign stars turn on a slow 3D shell; gold lines draw between neighbours
//              on the beat. THE STARS (bottom right): "we've been connecting dots for *ages.*"
//   5.04–7.85  "Sag knows | *everyone.*"  ♐ Sag (friends with everyone) grabs the pen: lines shoot from it to everyone, faster and faster.
//              ♐: "I know him! and her! and *HIM!*"
//   7.85–9.50  "Now it's a | *knot.*"  The network is pulled into a tangled spaghetti ball, every star wide-eyed, Pisces crying.
//   9.50–12.8  "Okay. | *Snip.*"  THE STARS hops: every line drops away, the stars spring back. THE STARS: "you don't need
//              everyone. just *one line.*" ♋ Cancer and ♏ Scorpio (water, a 120° trine) step forward; one gold line joins them.
//  12.85 cut → "It only takes | *two.*"  The two stars blush under their gold line. Out by 15.5; the end card at 15.6.
// One canvas (sky + network + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const TAU = Math.PI * 2
const BEAT = 60 / 108
const MONO = "'Space Mono', ui-monospace, monospace"

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.15, h0Land: 0.6, h0Out: [4.86, 5.02],
  stars: 1.45, open: 1.7, l1: 1.9,
  h1: 5.1, h1Land: 5.55, h1Out: [7.7, 7.84], l2: 5.4, chaos: [5.04, 9.4],
  h2: 7.9, h2Land: 8.3, h2Out: [9.36, 9.48], knot: [6.6, 8.6],
  snip: 9.49, h5: 9.56, h5Land: 9.95, h5Out: [12.6, 12.78], l3: 9.7,
  step: [10.4, 11.0], line: 11.15, close: 12.75,
  cut: 12.85,
  h3: 12.9, h3Land: 13.35, wink: [14.1, 14.5],
  h3Out: [15.2, 15.45], out: [15.05, 15.5],
}
const SKY = 'THE STARS', GEMT = '♐ SAG STAR'
const GEM = signStar('sagittarius')
const LINES = [
  { t: T.l1, speaker: SKY, text: "we've been connecting dots for *ages.*", color: GOLD },
  { t: T.l2, speaker: GEMT, text: 'I know him! and her! and *HIM!*', color: GEM.color },
  { t: T.l3, speaker: SKY, text: "you don't need everyone. just *one line.*", color: GOLD },
]
const CPS = 30
const SKY_HOPS = talkHops(LINES, SKY, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GEMT, { cps: CPS, gap: 0.22 })

// ── the network: the 12 sign stars on a tall spheroid (fibonacci lattice), turning
const CX = 540, CY = 905, F = 1500
const r0 = rng(606)
const NODES = SIGNS.map((s, i) => {
  const N = 12, y = 1 - (2 * (i + 0.5)) / N
  const a = i * 2.39996 + 0.4
  const rad = 330 * (0.5 + 0.5 * Math.sqrt(1 - y * y)) * (0.92 + r0() * 0.16)
  return { ...s, i, x: Math.cos(a) * rad, y: y * 360 + (r0() - 0.5) * 40, z: Math.sin(a) * rad }
})
const EDGES = []
NODES.forEach((a, i) => {
  NODES.map((b, j) => [j, (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2]).filter(([j]) => j !== i).sort((p, q) => p[1] - q[1]).slice(0, 3)
    .forEach(([j]) => { if (!EDGES.some(e => (e.a === i && e.b === j) || (e.a === j && e.b === i))) EDGES.push({ a: i, b: j }) })
})
EDGES.forEach((e, k) => { e.t = 0.75 + k * (BEAT / 2) * (4.0 / (EDGES.length * BEAT / 2)) })   // spread over 0.75–4.75, on half-beats-ish
// Sag's spaghetti: from Sag to everyone, then between everyone and everyone, faster and faster
const GI = 8, TI = 3, VI = 7, PI_ = 11
const r1 = rng(77)
const SPAG = Array.from({ length: 46 }, (_, k) => {
  const a = k < 11 ? GI : Math.floor(r1() * 12)
  let b = k < 11 ? (k >= GI ? k + 1 : k) : Math.floor(r1() * 12)
  if (b === a) b = (a + 5) % 12
  return { a, b, t: T.chaos[0] + 0.08 + 3.6 * (k / 46) ** 0.75, wig: r1() * TAU, amp: 40 + r1() * 120 }
})
const spin = t => 0.22 * t + 1.4 * ease.inQuad(prog(t, T.chaos[0], T.snip)) * (t - T.chaos[0]) * (t < T.snip ? 1 : 0)
  + (t >= T.snip ? 1.4 * (T.snip - T.chaos[0]) + 0.6 * ease.outCubic(prog(t, T.snip, T.snip + 1)) : 0)
const squeeze = t => t < T.snip ? 1 - 0.42 * ease.inOutCubic(prog(t, ...T.knot)) : lerp(0.58, 1, easeOutBack(prog(t, T.snip, T.snip + 0.55), 2.2))
function project(n, t) {
  const sq = squeeze(t)
  const a = spin(t), ca = Math.cos(a), sa = Math.sin(a)
  let x = n.x * ca - n.z * sa, z = n.x * sa + n.z * ca, y = n.y
  const tl = 0.28, ct = Math.cos(tl), st = Math.sin(tl)
  const y2 = y * ct - z * st, z2 = y * st + z * ct
  // the knot: everyone jitters in
  const jit = t > T.knot[0] && t < T.snip ? (1 - sq) * 60 : 0
  x = x * sq + Math.sin(t * 13 + n.i * 2.1) * jit
  const yy = y2 * sq + Math.cos(t * 11 + n.i * 1.3) * jit
  const s = F / (F - z2 * sq)
  return { x: CX + x * s, y: CY + yy * s, z: z2, s }
}

const SKYSTAR = { x: 880, y: 1390, size: 200 }
const PAIR = { tx: 280, vx: 800, y: 960, size: 230 }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Connect the | *stars.*', { top: 150, size: 116, accentSize: 180, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1 })
  const H1 = popText(root, 'Sag knows | *everyone.*', { top: 150, size: 112, accentSize: 164, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: GEM.color })
  const H2 = popText(root, "Now it's a | *knot.*", { top: 150, size: 116, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.08, accentColor: PINK })
  const H5 = popText(root, 'Okay. | *Snip.*', { top: 150, size: 116, accentSize: 190, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, gap: 0.1 })
  const H3 = popText(root, 'It only takes | *two.*', { top: 150, size: 116, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, gap: 0.1 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H5, T.h5Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1505, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, '#7fe0ff']) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // a dotted-gold constellation line drawn from a to b up to progress k
  function goldLine(ax, ay, bx, by, k, alpha, w = 4, col = GOLD) {
    if (k <= 0 || alpha <= 0) return
    const ex = lerp(ax, bx, k), ey = lerp(ay, by, k)
    x.save(); x.globalAlpha = alpha
    x.strokeStyle = rgba(col, 0.28); x.lineWidth = w * 3.5; x.lineCap = 'round'
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke()
    x.strokeStyle = col; x.lineWidth = w
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke()
    if (k < 1) drawPixelStar(x, ex, ey, 18, 1, BONE)
    x.restore()
  }

  // which stars are still in the network (Cancer & Scorpio step out of it in beat 3)
  const stepK = t => ease.inOutCubic(prog(t, ...T.step))
  function nodeMood(n, t) {
    if (t > T.knot[0] + 0.3 && t < T.snip + 0.3) return n.i === PI_ ? { mood: 'sleepy', blink: 1, zzz: false } : { mood: 'wide', blink: false }
    if (t >= T.snip + 0.3 && t < T.cut && n.i === GI) return { mood: 'neutral', look: [1, 1] }      // sheepish
    if (t >= T.cut) return { mood: 'happy' }
    return { mood: 'neutral' }
  }

  function drawNetwork(t, ok) {
    const fade = 1 - 0.8 * stepK(t)                            // the crowd drops back when the pair steps forward
    const P = NODES.map(n => project(n, t))
    // Sag comes forward with the pen during the chaos (its lines start from where it's drawn)
    const sagK = ease.inOutCubic(prog(t, T.chaos[0] - 0.2, T.chaos[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, T.snip, T.snip + 0.5)))
    const SAG = { x: lerp(P[GI].x, 540, sagK), y: lerp(P[GI].y, 1220, sagK), size: lerp(92 * P[GI].s, 190, sagK) }
    const PL = P.map((p, i) => i === GI ? { ...p, x: SAG.x, y: SAG.y } : p)
    const pk = i => easeOutBack(prog(t, 0.2 + i * 0.05, 0.6 + i * 0.05), 2) * ok
    // calm gold edges (beat 1), undrawn as the chaos starts, back faintly after the snip
    EDGES.forEach(e => {
      const a = P[e.a], b = P[e.b]
      const k = ease.outCubic(prog(t, e.t, e.t + 0.35))
      const off = t < T.chaos[0] ? 1 : 1 - prog(t, T.chaos[0], T.chaos[0] + 0.3)
      const back = t > T.snip + 0.6 ? 0.35 * prog(t, T.snip + 0.6, T.snip + 1.2) * fade : 0
      if (e.a === TI || e.b === TI || e.a === VI || e.b === VI) { if (t > T.step[0]) return }
      goldLine(a.x, a.y, b.x, b.y, t < T.chaos[0] ? k : 1, Math.max(off * clamp(k * 3), back) * ok * (0.5 + 0.5 * (a.s + b.s - 1.6)), 3)
    })
    // Sag's spaghetti: wiggly multicolour lines, faster and faster; after the snip they fall away
    SPAG.forEach((L, k) => {
      if (t < L.t) return
      const a = PL[L.a], b = PL[L.b]
      const g = ease.outCubic(prog(t, L.t, L.t + 0.18))
      const fall = t > T.snip ? prog(t, T.snip + (k % 7) * 0.02, T.snip + 0.6 + (k % 7) * 0.02) : 0
      if (fall >= 1) return
      const dy = fall * fall * 900
      const col = SIGNS[L.a === GI ? L.b : L.a].color
      x.save(); x.globalAlpha = (1 - fall) * 0.9 * ok
      x.strokeStyle = col; x.lineWidth = 5; x.lineCap = 'round'
      const mx = (a.x + b.x) / 2 + Math.cos(L.wig + t * 3) * L.amp, my = (a.y + b.y) / 2 + Math.sin(L.wig + t * 2.4) * L.amp
      x.beginPath(); x.moveTo(a.x, a.y + dy)
      const ex = lerp(a.x, b.x, g), ey = lerp(a.y, b.y, g)
      x.quadraticCurveTo(lerp(a.x, mx, g), lerp(a.y, my, g) + dy, ex, ey + dy * 1.2)
      x.stroke(); x.restore()
    })
    // the stars, back to front
    const order = NODES.map((n, i) => i).sort((p, q) => P[p].z - P[q].z)
    for (const i of order) {
      if ((i === TI || i === VI) && t > T.step[0]) continue
      const n = NODES[i], p = P[i]
      let size = 92 * p.s, sx = p.x, sy = p.y
      let alpha = fade
      // Sag comes forward with the pen during the chaos
      if (i === GI) { sx = SAG.x; sy = SAG.y; size = SAG.size; alpha = lerp(fade, 1, sagK) }
      drawStarChar(x, sx, sy, size, t, { color: n.color, glyph: size > 120 ? n.glyph : null, ...nodeMood(n, t), alpha, pop: pk(i), hops: i === GI ? GEM_HOPS : null, seed: i + 3, bob: 4, glow: 0.8 })
      if (i === PI_ && t > T.knot[0] + 0.3 && t < T.snip + 0.4) tears(t, sx, sy, size, T.knot[0] + 0.3)
    }
    return P
  }

  function tears(t, px, py, size, t0) {
    for (let n = 0; n < 16; n++) {
      const born = t0 + (n >> 1) * 0.22, d = t - born
      if (d < 0 || d > 0.8) continue
      const side = n % 2 ? 1 : -1
      const dx = px + side * (size * 0.16 + d * 80), dy = py + d * d * 300
      x.save(); x.globalAlpha = 1 - d / 0.8
      x.fillStyle = INK; x.fillRect(Math.round(dx - 8), Math.round(dy - 10), 16, 20)
      x.fillStyle = '#bfe8ff'; x.fillRect(Math.round(dx - 5), Math.round(dy - 7), 10, 14)
      x.restore()
    }
  }

  // Cancer and Scorpio step out of the network and get one gold line
  function drawPair(t, P, ok) {
    if (t < T.step[0]) return
    const k = stepK(t)
    const pair = [[TI, PAIR.tx, -1], [VI, PAIR.vx, 1]]
    const pos = pair.map(([i, fx, side]) => {
      const p = P[i]
      return { i, x: lerp(p.x, fx, k), y: lerp(p.y, PAIR.y, k) - Math.sin(Math.PI * k) * 60, size: lerp(92 * p.s, PAIR.size, k), side }
    })
    // the line between them (behind the stars)
    const lk = ease.inOutCubic(prog(t, T.line, T.line + 0.6))
    goldLine(pos[0].x + 70, pos[0].y, pos[1].x - 70, pos[1].y, lk, ok, 7)
    if (lk >= 1) {
      // trine chip on the line
      const mx = (pos[0].x + pos[1].x) / 2, my = pos[0].y + 62
      const ck = easeOutBack(prog(t, T.line + 0.6, T.line + 0.9), 2.4) * ok
      if (ck > 0) {
        x.save(); x.translate(mx, my); x.scale(ck, ck)
        x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-104, -24, 208, 48)
        x.fillStyle = GOLD; x.fillRect(-104, -24, 208, 4); x.fillRect(-104, 20, 208, 4); x.fillRect(-104, -24, 4, 48); x.fillRect(100, -24, 4, 48)
        x.font = `700 23px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
        x.fillText('120° · EASY', 0, 2)
        x.restore()
      }
    }
    pos.forEach(p => {
      const n = NODES[p.i]
      let mood = 'neutral', look = [-p.side, 0]
      if (t > T.line + 0.4) { mood = t > T.cut ? 'heart' : 'happy'; look = [-p.side, 0] }
      if (p.i === TI && t >= T.wink[0] && t < T.wink[1]) mood = 'wink'
      drawStarChar(x, p.x, p.y, p.size, t, { color: n.color, glyph: n.glyph, mood, look, blush: t > T.line + 0.4 ? 1 : 0, alpha: ok, seed: p.i + 3, bob: 6 })
    })
    sparkles(t, (pos[0].x + pos[1].x) / 2, pos[0].y, T.line + 0.6, 12, 200, 0.4)
    sparkles(t, (pos[0].x + pos[1].x) / 2, pos[0].y, T.h3Land, 14, 260, 1.4, [GOLD, BONE, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      const ok = popOut(t, T.out)
      if (ok > 0) {
        const P = drawNetwork(t, ok)
        drawPair(t, P, ok)
        // THE STARS, bottom right (hops and snips at 9.49)
        const sk = easeOutBack(prog(t, T.stars, T.stars + 0.4), 2) * ok
        if (sk > 0) {
          let mood = 'happy', look = [0, 0]
          if (t > T.l2 - 0.1 && t < T.knot[1]) { mood = 'wide'; look = [-1, -1] }
          else if (t >= T.knot[1] && t < T.snip + 0.25) { mood = 'squint'; look = [-1, -1] }
          else if (t >= T.snip + 0.25 && t < T.cut) mood = 'neutral'
          else if (t >= T.wink[0] && t < T.wink[1]) mood = 'wink'
          let sq = 0
          const sn = t - T.snip
          if (sn > -0.1 && sn < 0.6) sq += -0.18 * Math.exp(-Math.max(0, sn) * 7) * Math.cos(sn * 20)
          drawStarChar(x, SKYSTAR.x, SKYSTAR.y, SKYSTAR.size, t, { color: STAR.sky, mood, look, pop: sk, squash: sq, hops: [...SKY_HOPS, T.snip - 0.08], seed: 1, glow: 1.1 })
        }
        // the snip: a pixel scissor flash
        const sn = t - T.snip
        if (sn > 0 && sn < 0.4) {
          x.save(); x.globalAlpha = 1 - sn / 0.4
          drawPixelStar(x, CX, CY, 90 + sn * 200, 0, BONE)
          x.restore()
        }
      }
      sparkles(t, SKYSTAR.x, SKYSTAR.y, T.stars, 8, 140, 0.5)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 12.85 (box shut → "It only takes two."). One cut for a 20 s film. End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const headCues = (t0, land, n, base) => [...wordPops(t0, n, 0.1, base, 0.024), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1318.51, 0.04, 0.45, 0]]
export const CUES = [
  ...headCues(T.h0, T.h0Land, 2, 0),
  // calm constellation lines, a soft pluck per line
  ...EDGES.map((e, k) => ['pluck', +(e.t + 0.3).toFixed(3), NOTE[k % NOTE.length], 0.018, 0.5, (k % 2 ? 0.3 : -0.3)]),
  ['pop', T.stars, 880, 0.035, 0.3], ['glitter', T.stars, T.stars + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GEMT]: 987.77 } }),
  // Sag's spaghetti: a tick per line, accelerating
  ...headCues(T.h1, T.h1Land, 2, 2), ['whoosh', T.chaos[0] - 0.2, 0.4, 0.04],
  ...SPAG.map((L, k) => ['tick', +(L.t + 0.05).toFixed(3), 0.022 + 0.0006 * k]),
  ['riser', T.knot[0], T.snip, 0.06],
  ...headCues(T.h2, T.h2Land, 2, 3),
  // snip
  ['tick', T.snip, 0.09], ['tick', T.snip + 0.07, 0.07], ['boom', T.snip, 0.1], ['whoosh', T.snip + 0.05, 0.6, 0.05], ['glitter', T.snip, T.snip + 0.5],
  ...headCues(T.h5, T.h5Land, 1, 4),
  // the pair + the gold line
  ['whoosh', T.step[0], 0.5, 0.035], ['riser', T.line - 0.1, T.line + 0.6, 0.04], ['bell', T.line + 0.6, 1318.51, 0.03, 1.6, 0], ['glitter', T.line + 0.6, T.line + 1.0], ['pop', T.line + 0.75, 987.77, 0.035, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...headCues(T.h3, T.h3Land, 3, 1), ['glitter', T.h3Land, T.h3Land + 0.45], ['bell', T.h3Land + 0.1, 1760, 0.02, 1.2, 0],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
