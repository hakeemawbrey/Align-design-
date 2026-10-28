// st4corpus (EP 052, 15 s vertical, Star Talk season 4, thread A: the Texas road trip) · story 0–10.6, then the end card.
//   0.00–5.60  "Dear *Corpus Christi:* | it's windy."  The bayfront on a breezy night: the bay with little sailboats, the
//              stepped seawall, wind streaks. The three air signs (♊ Gemini, ♎ Libra, ♒ Aquarius) fly pixel kites. Each
//              starts a sentence in a speech bubble ("so about dinner, i was—") and the wind snatches it mid-word.
//              GEMINI: "my whole message blew away!"
//   5.60–8.70  "Corpus wind: | *undefeated.*"  THE STARS: "say the important part *first*." → Gemini tries again with
//              just "dinner friday?" and this time the bubble holds; Libra pops back "yes!".
//   8.70 cut → "Lead with the | *point.*"  The kites fly high, the two bubbles hold in the wind. Out by 10.45.
// Easter eggs: seed constellation (EP 52) top-left, EP 052 in the frame cartouche, the ghost leans out from behind a sail.
// One canvas (sky + bay + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 52
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const GEM = signStar('gemini'), LIB = signStar('libra'), AQU = signStar('aquarius')
const SKYC = '#8fe3ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.45, 5.62],
  open: 2.85, l1: 3.05,
  h1: 5.68, h1Land: 6.1, l2: 5.75, retry: 7.25, yes: 7.85, close: 8.55, h1Out: [8.4, 8.6],
  cut: 8.7,
  h2: 8.75, h2Land: 9.1, out: [10.05, 10.45], h2Out: [10.2, 10.42],
  ghost: 4.0,
}
// the bubbles the wind steals: [who, text typed so far is cut at `blow`, start, blow]
const GUSTS = [
  { who: 1, text: 'so about dinner, i was—', t0: 0.6, blow: 1.45 },
  { who: 2, text: 'random thought, but what if—', t0: 1.15, blow: 2.1 },
  { who: 0, text: 'ok the real reason i texted—', t0: 1.75, blow: 2.7 },
]
const GEMINI = '♊ GEMINI STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: GEMINI, text: 'my whole message *blew away!*', color: GEM.color },
  { t: T.l2, speaker: SPEAK, text: 'say the important part *first*.', color: SKYC },
]
const CPS = 28

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bone pixel speech bubble with text, tail on `side`, centred on (cx, cy) */
function bubble(x, cx, cy, text, { size = 34, fill = BONE, ink = INK, k = 1, side = 'left', rot = 0, alpha = 1, minW = 0 } = {}) {
  if (k <= 0.01 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px 'Space Mono', monospace`
  const tw = Math.max(x.measureText(text).width, minW), P = 6
  const w = Math.round((tw + 44) / P) * P, h = Math.round((size + 32) / P) * P
  x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(k, k)
  const ox = -w / 2, oy = -h / 2
  const slab = (o, col) => { x.fillStyle = col; x.fillRect(ox - o + P, oy - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(ox - o, oy - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  slab(P, INK); slab(0, fill)
  if (side) {
    const tx = side === 'left' ? ox + 3 * P : side === 'mid' ? -P : ox + w - 5 * P, dir = side === 'left' ? -1 : 1
    x.fillStyle = INK; x.fillRect(tx - P, oy + h, 4 * P, 2 * P); x.fillRect(tx + (dir < 0 ? -P : 2 * P), oy + h + 2 * P, 2 * P, 2 * P)
    x.fillStyle = fill; x.fillRect(tx, oy + h - P, 2 * P, 2 * P); x.fillRect(tx + (dir < 0 ? 0 : P), oy + h + P, P, P)
  }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 2)
  x.restore()
}

// ── layout
const HORIZON = 900, WALL = 1172, WALK = 1236
const STARS = [
  { ...GEM, x: 200, y: 1300, size: 250, seed: 3, kite: { x: 170, y: 740 } },
  { ...LIB, x: 540, y: 1290, size: 250, seed: 7, kite: { x: 560, y: 680 } },
  { ...AQU, x: 880, y: 1300, size: 250, seed: 11, kite: { x: 900, y: 760 } },
]
const KITE = ['....X....', '...XXX...', '..XXXXX..', '.XXXXXXX.', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....']
const BOATS = [{ x: 330, y: 990, s: 1 }, { x: 770, y: 960, s: 1.25 }, { x: 980, y: 1050, s: 0.8 }]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Corpus Christi:* | it\'s windy.', { top: 235, size: 96, accentSize: 132, at: T.h0, gap: 0.1, accentColor: SKYC, wobble: true, fit: true })
  const H1 = popText(root, 'Corpus wind: | *undefeated.*', { top: 225, size: 100, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: SKYC })
  const H2 = popText(root, 'Lead with the | *point.*', { top: 190, size: 124, accentSize: 220, fit: true, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.08, accentColor: SKYC, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const GEM_HOPS = [...talkHops(LINES, GEMINI, { cps: CPS }), T.retry, T.h2Land]

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, SKYC]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── the bay: a far shore, little sailboats rocking, wind ripples, the stepped seawall and the walk
  function drawBay(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    // far shore: a low generic skyline on the left, a long causeway line of lights on the right
    x.fillStyle = '#1c1638'
    ;[[40, 70], [96, 120], [150, 90], [196, 150], [252, 80], [300, 104]].forEach(([bx, bh]) => x.fillRect(bx, HORIZON - bh, 48, bh))
    x.fillStyle = 'rgba(255,214,140,0.7)'
    for (let i = 0; i < 26; i++) x.fillRect(46 + (i * 37) % 290, HORIZON - 14 - ((i * 53) % 110), 6, 6)
    for (let px = 360; px < 1080; px += 30) { x.fillStyle = px % 60 ? '#ffd98a' : '#f4f7ff'; x.fillRect(px, HORIZON - 10 + ((px / 30) % 2) * 2, 4, 4) }
    // water
    const g = x.createLinearGradient(0, HORIZON, 0, WALL)
    g.addColorStop(0, '#24335f'); g.addColorStop(1, '#1a4a6e')
    x.fillStyle = g; x.fillRect(0, HORIZON, 1080, WALL - HORIZON)
    for (let r = 0; r < 9; r++) {
      const yy = HORIZON + 18 + r * 28, off = (t * (60 + r * 12) + r * 77) % 200
      x.fillStyle = `rgba(190,225,250,${0.15 + r * 0.02})`
      for (let px = -200 + off; px < 1080; px += 200) x.fillRect(Math.round(px / 6) * 6, yy, 36 + r * 6, 6)
    }
    // sailboats, heeled over by the wind
    BOATS.forEach((b, i) => {
      const rock = Math.sin(t * 2 + i * 1.7) * 0.06 + 0.12
      x.save(); x.translate(b.x, b.y); x.rotate(rock); x.scale(b.s, b.s)
      x.fillStyle = INK; x.fillRect(-46, -6, 92, 22)
      x.fillStyle = '#e8e2f0'; x.fillRect(-40, -2, 80, 12)
      x.fillStyle = INK; x.fillRect(-3, -130, 6, 128)
      for (let j = 0; j < 20; j++) { const w = Math.round((j + 1) * 3.3); x.fillStyle = INK; x.fillRect(4, -128 + j * 6, w + 4, 6); x.fillStyle = j % 7 === 3 ? '#cfd6ee' : '#f4f2fb'; x.fillRect(4, -128 + j * 6, w, 6) }
      x.restore()
    })
    // stepped seawall + the walk
    const steps = ['#8d89a8', '#7a7696', '#6a6686', '#5a5676']
    steps.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, WALL + i * 16, 1080, 16); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(0, WALL + i * 16, 1080, 3) })
    const wg = x.createLinearGradient(0, WALK, 0, 1920)
    wg.addColorStop(0, '#4a4568'); wg.addColorStop(1, '#2a2546')
    x.fillStyle = wg; x.fillRect(0, WALK, 1080, 1920 - WALK)
    x.fillStyle = 'rgba(20,14,40,0.4)'
    for (let px = 0; px < 1080; px += 120) x.fillRect(px, WALK, 4, 1920 - WALK)
    x.restore()
  }
  function wind(t, k) {
    x.save(); x.globalAlpha = 0.5 * k; x.fillStyle = '#e9f3ff'
    for (let i = 0; i < 14; i++) {
      const yy = 470 + ((i * 131) % 760), sp = 900 + (i % 4) * 260, len = 80 + (i * 37) % 120
      const px = ((t * sp + i * 397) % 1500) - 300
      x.fillRect(Math.round(px / 6) * 6, yy, len, 5); x.fillRect(Math.round(px / 6) * 6 + len + 18, yy, 24, 5)
    }
    x.restore()
  }
  function kite(t, s, i, k) {
    const sx = s.x + 40, sy = s.y - 10
    const kx = s.kite.x + Math.sin(t * 2.3 + i * 2) * 26 + Math.sin(t * 5.1 + i) * 8, ky = s.kite.y + Math.cos(t * 1.9 + i * 1.3) * 22 
    // string (a sagging pixel line)
    x.save(); x.globalAlpha = k * 0.85; x.fillStyle = BONE
    for (let n = 0; n <= 40; n++) { const u = n / 40, px = lerp(sx, kx, u), py = lerp(sy, ky + 50, u) + Math.sin(Math.PI * u) * 60; x.fillRect(Math.round(px / 3) * 3, Math.round(py / 3) * 3, 3, 3) }
    x.restore()
    const rot = Math.sin(t * 3.1 + i) * 0.18
    drawBitsKite(kx, ky, rot, s.color, k)
    // tail with bows streaming downwind
    for (let b = 0; b < 5; b++) {
      const bx = kx + 20 + b * 26, by = ky + 60 + b * 18 + Math.sin(t * 7 + b + i) * 10
      x.fillStyle = INK; x.fillRect(bx - 9, by - 6, 18, 12); x.fillStyle = b % 2 ? BONE : s.color; x.fillRect(bx - 6, by - 3, 12, 6)
    }
  }
  function drawBitsKite(cx, cy, rot, col, k) {
    const c = 12 * k
    x.save(); x.translate(cx, cy); x.rotate(rot)
    const ox = -4.5 * c, oy = -4.5 * c
    x.fillStyle = INK
    KITE.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') x.fillRect(ox + i * c - c / 2, oy + j * c - c / 2, c * 2, c * 2) }))
    KITE.forEach((r, j) => [...r].forEach((ch, i) => {
      if (ch !== 'X') return
      x.fillStyle = i === 4 || j === 4 ? '#fff6e6' : (i < 4) === (j < 4) ? col : shade(col)
      x.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5)
    }))
    x.restore()
  }
  const shade = hex => { const n = parseInt(hex.slice(1), 16); const f = v => Math.round(v * 0.68); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})` }

  // the gusts: each bubble types on, then the wind rips it away to the right, tumbling
  function gusts(t) {
    for (const g of GUSTS) {
      if (t < g.t0) continue
      const s = STARS[g.who], bx = s.x + [100, 0, -190][g.who], by = s.y - [200, 300, 200][g.who]
      const typed = Math.floor((Math.min(t, g.blow) - g.t0) * 30)
      const txt = g.text.slice(0, Math.max(1, Math.min(g.text.length, typed))) + (t >= g.blow ? '—' : '')
      const d = Math.max(0, t - g.blow)
      if (d > 1.1) continue
      const k = easeOutBack(prog(t, g.t0, g.t0 + 0.25), 2.2)
      bubble(x, bx + d * d * 1400 + d * 200, by - d * 160, txt.replace(/—+$/, '—'), { size: 32, k, rot: d * 1.4, side: g.who === 2 ? 'right' : 'left', alpha: 1 - prog(d, 0.7, 1.1) })
    }
  }

  function moodFor(i, t) {
    const hitBy = GUSTS.find(g => g.who === i)
    if (t < hitBy.t0) return { mood: 'happy', look: [0, -1] }
    if (t < hitBy.blow) return { mood: 'neutral', look: [i === 2 ? -1 : 1, 0] }
    if (t < T.l2) return { mood: 'wide', look: [1, -1], blink: false }
    if (t < T.retry) return i === 0 ? { mood: 'squint', look: [0, 0] } : { mood: 'neutral', look: [-1, 0] }
    if (t < T.yes) return i === 0 ? { mood: 'neutral', look: [1, 0] } : { mood: 'wide', look: [-1, 0] }
    return i === 2 ? { mood: 'happy' } : { mood: 'heart', look: i === 0 ? [1, 0] : [-1, 0] }
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const land = ease.outCubic(prog(t, 0.05, 0.5))
    drawBay(t, land)
    drawGhostCameo(x, t, { x: BOATS[1].x + 16, y: BOATS[1].y - 90, at: T.ghost, dur: 1.4, from: 'right', cell: 3 })   // behind the big sail
    wind(t, land)
    STARS.forEach((s, i) => {
      const pk = easeOutBack(prog(t, 0.2 + i * 0.12, 0.55 + i * 0.12), 2) * ok
      kite(t, s, i, pk)
      const lean = t < T.l2 ? -0.05 : 0
      drawStarChar(x, s.x, s.y, s.size, t, { color: s.color, glyph: s.glyph, ...moodFor(i, t), pop: pk, squash: lean + Math.sin(t * 9 + i) * 0.015, hops: i === 0 ? GEM_HOPS : i === 1 ? [T.yes, T.h2Land + 0.1] : [T.yes + 0.1], seed: s.seed, glow: 1 })
    })
    gusts(t)
    // the retry: short and to the point, and the wind can't take it
    const rk = easeOutBack(prog(t, T.retry, T.retry + 0.3), 2.4) * ok
    if (rk > 0.01) bubble(x, STARS[0].x + 90, STARS[0].y - 220 + Math.sin(t * 4) * 4, 'dinner friday?', { size: 40, k: rk, rot: Math.sin(t * 6) * 0.03, side: 'left' })
    const yk = easeOutBack(prog(t, T.yes, T.yes + 0.3), 2.6) * ok
    if (yk > 0.01) bubble(x, STARS[1].x + 110, STARS[1].y - 300 + Math.sin(t * 4 + 1) * 4, 'yes!', { size: 40, k: yk, fill: '#ffe1f6', side: 'left' })
    sparkles(t, STARS[0].x + 90, STARS[0].y - 220, T.retry + 0.2, 8, 150, 1)
    sparkles(t, STARS[1].x + 110, STARS[1].y - 300, T.yes + 0.1, 8, 110, 2, [LIB.color, BONE, GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.64 (H0 out → "Corpus wind") and 8.7 (box shut → "Lead with the point.").
const CUTS = [5.64, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.1, 0, 0.024),
  ['whoosh', 0.2, 0.8, 0.03],
  ...GUSTS.flatMap((g, i) => [['pop', g.t0, NOTE[2 + i], 0.03, (g.who - 1) * 0.4], ['whoosh', g.blow - 0.05, 0.4, 0.045], ['tick', g.blow, 0.04]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 2, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['whoosh', T.h1Land, 0.5, 0.03],
  ['pop', T.retry, 880, 0.045, -0.3], ['pluck', T.retry + 0.2, 1174.66, 0.035, 0.5, -0.2],
  ['pop', T.yes, 1318.51, 0.05, 0.1], ['bell', T.yes + 0.05, 1760, 0.025, 1.0, 0.1], ['glitter', T.yes, T.yes + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
