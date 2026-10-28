// st4dancehall (15 s vertical Align ad, Star Talk season 4, EP 063, thread F) · story 0–10.6, then the shared end card.
//   0.00–4.90  "Texas dance hall: | *two-step* night."  A wooden dance floor under string lights. The ♑ Capricorn star (tie
//              loosened: it's its free Friday) and the ♋ Cancer star (its little crab shell on its head) two-step side by
//              side in pixel cowboy boots… and keep stepping on each other's boots: STOMP, "OW!", squeezed eyes, sorry hops.
//              Drop (2.82): THE STARS: "nobody's good at this the first time."
//   5.00–8.25  "Capricorn's | free *Friday.*"  THE STARS: "be *new* at something together."  Another stomp — and this time
//              they both crack up. Box shuts. (Ghost: peeks up from behind a hay bale at the edge of the floor.)
//   8.40       card cut (flip).
//   8.50–10.4  "Two left boots. | One great *night.*"  Dancing, laughing, one last stomp, hearts. Out by 10.45.
// One canvas (sky + lights + floor + stars + boots), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 63
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAP = signStar('capricorn'), CAN = signStar('cancer')
const BEAT = 0.5556                             // 108 bpm

const T = {
  h0: 0.12, h0Out: [4.78, 4.96], floor: 0.2, capIn: 0.4, canIn: 0.55,
  open: 2.66, l1: 2.85,
  h1: 5.02, h1Land: 5.42, l2: 5.6, laugh: 7.25, h1Out: [8.08, 8.26], close: 8.25,
  cut: 8.4, h2: 8.5, h2Land: 9.1, hearts: 9.0, h2Out: [10.18, 10.42], out: [10.05, 10.45],
  ghost: 5.9,
}
// the stomps: who steps on whom (cap = Capricorn's boot lands on Cancer's)
const STOMPS = [{ t: 1.55, by: 'cap' }, { t: 3.4, by: 'can' }, { t: 7.0, by: 'cap' }, { t: 9.55, by: 'can' }]
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "nobody's good at this the first time." },
  { t: T.l2, speaker: SPEAK, text: 'be *new* at something together.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
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
// a cowboy boot (toe to the right): shaft, stitching, heel, pointed toe
const BOOT = ['.BBBB....', '.BsBB....', '.BBBB....', '.BsBB....', '.BBBBB...', '.BBBBBBB.', 'BBBBBBBBB', 'HH.....dd']
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
const SHELL = ['...SSSS...', '.SSsSSSS..', 'SSSSSSsSS.', 'SsSSSSSSSS', 'RRRRRRRRRR']
const SHELL_C = { S: '#f2734f', s: '#ffd2b0', R: '#8f2f2a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const NOTE_BM = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const BALE = (() => { const r = []; for (let j = 0; j < 9; j++) { let s = ''; for (let i = 0; i < 14; i++) s += j === 2 || j === 6 ? 'b' : (i + j * 3) % 5 === 0 ? 'l' : 'Y'; r.push(s) } return r })()

// ── layout
const FLOOR_Y = 1130, STAR_Y = 948, SIZE = 280
function stompK(t) {                                 // 0…1: how far the pair has leaned in for a stomp
  let k = 0
  for (const s of STOMPS) k = Math.max(k, Math.sin(Math.PI * clamp((t - s.t + 0.3) / 0.75)))
  return k
}
function lastStomp(t) { let s = null; for (const v of STOMPS) if (v.t <= t) s = v; return s }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Texas dance hall: | *two-step* night.', { top: 214, size: 96, accentSize: 156, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0 + 0.36 })
  const H1 = popText(root, "Capricorn's | free *Friday.*", { top: 214, size: 104, accentSize: 168, at: T.h1, gap: 0.12, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#c9a6ff' })
  const H2 = popText(root, 'Two left boots. | One great *night.*', { top: 214, size: 100, accentSize: 160, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function lights(t, k) {
    const cols = ['#ffd36b', '#ff8fb1', '#7fe8e0', '#ffffff']
    for (let s = 0; s < 2; s++) {
      const y0 = 560 + s * 70, sag = 70
      x.save(); x.globalAlpha = 0.6 * k; x.strokeStyle = '#2a1f45'; x.lineWidth = 3
      x.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const xx = -20 + u * 1120, yy = y0 + Math.sin(Math.PI * u) * sag; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke(); x.restore()
      for (let i = 0; i < 13; i++) {
        const u = (i + 0.5 + s * 0.5) / 13.5, xx = -20 + u * 1120, yy = y0 + Math.sin(Math.PI * u) * sag + 10
        const tw = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7 + s)
        const c = cols[(i + s) % 4]
        x.save(); x.globalAlpha = k; x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(xx, yy, 0, xx, yy, 34); g.addColorStop(0, c + '88'); g.addColorStop(1, c + '00')
        x.fillStyle = g; x.fillRect(xx - 34, yy - 34, 68, 68); x.restore()
        x.save(); x.globalAlpha = k * tw; x.fillStyle = c; x.fillRect(Math.round(xx) - 6, Math.round(yy) - 6, 12, 12); x.restore()
      }
    }
  }
  function floor(t, k) {
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, FLOOR_Y, 0, 1920); g.addColorStop(0, '#6a3a22'); g.addColorStop(0.35, '#4a2616'); g.addColorStop(1, '#1d0f0a')
    x.fillStyle = g; x.fillRect(0, FLOOR_Y, 1080, 1920 - FLOOR_Y)
    x.strokeStyle = 'rgba(20,8,4,0.6)'; x.lineWidth = 3
    for (let i = -12; i <= 12; i++) { x.beginPath(); x.moveTo(540 + i * 50, FLOOR_Y); x.lineTo(540 + i * 210, 1920); x.stroke() }
    for (let j = 1; j < 8; j++) { const yy = FLOOR_Y + (j * j) * 12; x.fillStyle = 'rgba(255,200,140,0.06)'; x.fillRect(0, yy, 1080, 3) }
    x.fillStyle = 'rgba(255,214,150,0.5)'; x.fillRect(0, FLOOR_Y, 1080, 4)
    // a pool of warm light on the floor
    x.globalCompositeOperation = 'lighter'; x.translate(540, FLOOR_Y + 40); x.scale(1, 0.18)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, 520); p.addColorStop(0, 'rgba(255,200,130,0.35)'); p.addColorStop(1, 'rgba(255,200,130,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, 520, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function bale(k) {
    drawBits(x, BALE, { Y: '#e5b84c', l: '#c99a2e', b: '#8a5a1e' }, 92, FLOOR_Y - 26, 10 * k, { alpha: k })
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, '#7fe8e0']) {
    const tt = t - t0
    if (tt < 0 || tt > 0.6) return
    const p = ease.outCubic(tt / 0.6)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.6)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function ow(t, cx, cy, t0, word) {
    const tt = t - t0
    if (tt < 0 || tt > 0.95) return
    const k = easeOutBack(clamp(tt / 0.2), 3) * (1 - ease.inQuad(prog(tt, 0.7, 0.95)))
    x.save(); x.translate(cx, cy - tt * 50); x.rotate(-0.12); x.scale(k, k)
    x.font = `800 64px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText(word, 0, 0); x.fillStyle = '#ffd36b'; x.fillText(word, 0, 0)
    x.restore()
    // impact burst
    const p = clamp(tt / 0.35)
    if (p < 1) { x.save(); x.globalAlpha = 1 - p; x.fillStyle = '#fff6d8'; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; x.fillRect(cx + Math.cos(a) * (30 + p * 60) - 5, FLOOR_Y - 18 + Math.sin(a) * (14 + p * 30) - 5, 10, 10) } x.restore() }
  }
  function notes(t, k) {
    for (let i = 0; i < 6; i++) {
      const p = (t * 0.32 + i / 6) % 1
      const nx = 160 + ((i * 173) % 760) + Math.sin(p * 6 + i) * 24, ny = 900 - p * 220
      drawBits(x, NOTE_BM, { X: ['#ffd36b', '#7fe8e0', '#ff8fb1'][i % 3] }, Math.round(nx), Math.round(ny), 6, { alpha: Math.sin(Math.PI * p) * 0.75 * k })
    }
  }

  function dancers(t, ok) {
    const cp = pop01(t, T.capIn, 0.38, 2.1) * ok, np = pop01(t, T.canIn, 0.38, 2.1) * ok
    if (cp <= 0.02 && np <= 0.02) return
    // the two-step: quick-quick-slow-slow, travelling left and right together
    const beatN = t / BEAT
    const travel = Math.sin(t * Math.PI / (BEAT * 6)) * 90
    const sk = stompK(t)
    const gap = lerp(172, 112, sk)
    const big = t >= T.cut ? 1.08 : 1
    const cx = 540 + travel
    const CP = { x: cx - gap, y: STAR_Y }, NP = { x: cx + gap, y: STAR_Y }
    const st = lastStomp(t), sinceSt = st ? t - st.t : 9
    const hurt = sinceSt < 0.7
    const laughing = t > T.laugh
    const capMood = hurt && st.by === 'can' ? (laughing ? 'happy' : 'squint') : hurt && st.by === 'cap' ? (laughing ? 'happy' : 'wide') : t > T.hearts ? 'heart' : laughing ? 'happy' : t > T.l1 + 1.2 && t < T.l2 ? 'neutral' : 'happy'
    const canMood = hurt && st.by === 'cap' ? (laughing ? 'happy' : 'squint') : hurt && st.by === 'can' ? (laughing ? 'happy' : 'wide') : t > T.hearts + 0.2 ? 'heart' : laughing ? 'happy' : 'happy'
    const bounce = i => Math.abs(Math.sin(Math.PI * (beatN + i * 0.5))) * 10
    const laughSq = laughing && hurt ? 0.06 * Math.sin(t * 40) : 0
    // stars
    const rC = drawStarChar(x, CP.x, CP.y - bounce(0), SIZE * big, t, { color: CAP.color, glyph: CAP.glyph, mood: capMood, look: hurt ? [1, 1] : [1, 0], pop: cp, seed: 4, bob: 0, squash: laughSq + (hurt && st.by === 'can' && !laughing ? -0.08 * Math.exp(-sinceSt * 5) : 0), blink: hurt ? false : undefined })
    const rN = drawStarChar(x, NP.x, NP.y - bounce(1), SIZE * big, t, { color: CAN.color, glyph: CAN.glyph, mood: canMood, look: hurt ? [-1, 1] : [-1, 0], pop: np, seed: 9, bob: 0, squash: laughSq + (hurt && st.by === 'cap' && !laughing ? -0.08 * Math.exp(-sinceSt * 5) : 0), blink: hurt ? false : undefined })
    // Capricorn's loosened tie (free Friday), Cancer's shell hat
    const s = SIZE * big
    if (cp > 0.02) drawBits(x, TIE, TIE_C, Math.round(rC.x + s * 0.04), Math.round(rC.y + s * 0.29), s / 28 * cp, { rot: 0.35 + Math.sin(t * 6) * 0.08 })
    if (np > 0.02) drawBits(x, SHELL, SHELL_C, Math.round(rN.x + s * 0.03), Math.round(rN.top - s * 0.04), s / 22 * np, { rot: 0.15 + Math.sin(t * 5) * 0.05 })
    // boots: each star has two; feet alternate on the beat (quick-quick-slow)
    const bc = Math.round(7 * big)
    const boot = (bx, lift, col, flip, alpha) => drawBits(x, BOOT, { B: col, s: '#ffe1a8', H: '#2a1408', d: '#2a1408' }, Math.round(bx), Math.round(FLOOR_Y - 26 - lift), bc, { flip, alpha })
    const feet = (r, col, side, pop) => {
      if (pop <= 0.02) return []
      const out = []
      for (const f of [-1, 1]) {
        const ph = (beatN + (f > 0 ? 0.5 : 0)) % 2
        let lift = ph < 0.5 ? Math.sin(Math.PI * ph / 0.5) * 22 : 0
        let bx = r.x + f * 50
        // the inner boot on a stomp
        const inner = f === side
        if (st && hurt && inner && st.by === (side > 0 ? 'cap' : 'can')) { bx = r.x + side * 50 + side * 56 * Math.sin(Math.PI * clamp(sinceSt / 0.7)); lift = 0 }
        out.push({ bx, lift, inner, f })
      }
      return out.map(o => ({ ...o, col, pop }))
    }
    const fC = feet(rC, '#7a4a2a', 1, cp), fN = feet(rN, '#b0513a', -1, np)
    // the stomped boot underneath, the stomper on top
    const all = [...fC.map(o => ({ ...o, who: 'cap' })), ...fN.map(o => ({ ...o, who: 'can' }))]
    all.sort((a, b) => (st && hurt && a.inner && a.who === st.by ? 1 : 0) - (st && hurt && b.inner && b.who === st.by ? 1 : 0))
    for (const o of all) boot(o.bx, o.lift, o.col, o.who === 'can', clamp(o.pop))
    // OW! (and later, laughing "HA!")
    for (const sp of STOMPS) {
      const victim = sp.by === 'cap' ? rN : rC
      ow(t, (rC.x + rN.x) / 2 + (sp.by === 'cap' ? 40 : -40), victim.y - s * 0.62, sp.t, sp.t > T.laugh - 0.5 ? 'HA!' : 'OW!')
    }
    if (t > T.hearts) {
      for (let i = 0; i < 8; i++) {
        const born = T.hearts + i * 0.22, p = (t - born) / 1.2
        if (p <= 0 || p >= 1) continue
        const side = ((i * 37) % 7) / 6 - 0.5
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 360), Math.round(STAR_Y - 120 - p * 260), 7, { alpha: Math.sin(Math.PI * p) })
      }
    }
    sparkles(t, cx, STAR_Y, T.laugh, 10, 240, 1)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out), k = clamp(pop01(t, T.floor, 0.45, 1.3)) * clamp(ok)
        lights(t, k)
        x.save(); if (t >= T.cut) x.translate(0, 150)            // box shut: the floor drops into the freed space (under the cut)
        floor(t, k)
        notes(t, k)
        bale(k)
        drawGhostCameo(x, t, { x: 92, y: FLOOR_Y - 26 - 45, at: T.ghost, dur: 1.35, from: 'below', cell: 3 })
        dancers(t, ok)
        x.restore()
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

const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const BOOT_TAPS = []
for (let b = 0; b * BEAT + 0.6 < 10.3; b++) BOOT_TAPS.push(['tick', +(0.6 + b * BEAT).toFixed(3), b % 2 ? 0.014 : 0.02])
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0 + 0.36, 1174.66, 0.04, 0], ['pop', T.h0 + 0.46, 1318.51, 0.04, 0],
  ['tick', T.floor + 0.1, 0.03], ['pop', T.capIn + 0.1, 659.25, 0.035, -0.3], ['pop', T.canIn + 0.1, 880, 0.035, 0.3],
  ...BOOT_TAPS,
  ...STOMPS.flatMap(s => [['boom', s.t, 0.1], ['tick', s.t, 0.05], s.t > T.laugh - 0.5 ? ['pluck', s.t + 0.08, 1318.51, 0.04, 0.4, 0] : ['pop', s.t + 0.08, 392, 0.04, s.by === 'cap' ? 0.3 : -0.3]]),
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 2, 0.12, 2, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.ghost + 0.1, 1318.51, 0.016, -0.6],
  ['glitter', T.laugh, T.laugh + 0.4], ['pluck', T.laugh, 987.77, 0.035, 0.5, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 5, 0.1, 1, 0.024), ['pop', T.h2Land, 1318.51, 0.05, 0], ['bell', T.hearts, 1760, 0.024, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
