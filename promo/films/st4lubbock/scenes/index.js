// st4lubbock (EP 053, 20 s vertical, Star Talk season 4, thread A: the Texas road trip) · story 0–15.6, then the end card.
//   0.00–5.20  "Dear *Lubbock:* | look up."  Flat cotton fields to a low horizon, a windmill turning, a round hay bale, and
//              a huge sky that fills up with more and more stars. ♊ Gemini and ♐ Sagittarius look up, wide-eyed; little
//              relatives in the sky blink awake and wave (hop) back. One calls down: "you never visit!"
//              THE STARS: "out here, you can see *all* of us."
//   5.20–10.4  "No city glow. | *Nothing* to hide."  THE STARS: "be someone your date can see *clearly*, too." The two
//              stars turn to each other: heart eyes.
//   10.4 cut → "No games. | Just *stars.*"  The pair side by side under the whole crowded sky; a shooting star.
//              Out by 15.4; end card at 15.6 (JOIN THE TEXAS BETA).
// Easter eggs: seed constellation (EP 53) top-left, EP 053 in the frame cartouche, the ghost peeks over the hay bale.
// One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 53
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const GEM = signStar('gemini'), SAG = signStar('sagittarius')
const ACC = '#ffd98a'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.05, 5.22],
  fillSky: [0.4, 3.2], wake: 1.7, waves: [2.0, 2.45, 2.9], visit: 2.6, open: 3.25, l1: 3.45,
  h1: 5.28, h1Land: 5.8, l2: 6.6, turn: 8.5, close: 10.1, h1Out: [10.05, 10.25],
  cut: 10.4,
  h2: 10.45, h2Land: 10.95, shoot: [12.1, 12.9], out: [15.0, 15.4], h2Out: [15.15, 15.4],
  ghost: 13.3,
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'out here, you can see *all* of us.', color: ACC },
  { t: T.l2, speaker: SPEAK, text: 'be someone your date can see *clearly*, too.', color: ACC },
]
const CPS = 28

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
function bubble(x, cx, cy, text, { size = 34, fill = BONE, k = 1, side = 'left' } = {}) {
  if (k <= 0.01) return
  x.save(); x.font = `700 ${size}px 'Space Mono', monospace`
  const tw = x.measureText(text).width, P = 6
  const w = Math.round((tw + 44) / P) * P, h = Math.round((size + 32) / P) * P
  x.translate(Math.round(cx), Math.round(cy)); x.scale(k, k)
  const ox = -w / 2, oy = -h / 2
  const slab = (o, col) => { x.fillStyle = col; x.fillRect(ox - o + P, oy - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(ox - o, oy - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  slab(P, INK); slab(0, fill)
  const tx = side === 'left' ? ox + 3 * P : ox + w - 5 * P, dir = side === 'left' ? -1 : 1
  x.fillStyle = INK; x.fillRect(tx - P, oy + h, 4 * P, 2 * P); x.fillRect(tx + (dir < 0 ? -P : 2 * P), oy + h + 2 * P, 2 * P, 2 * P)
  x.fillStyle = fill; x.fillRect(tx, oy + h - P, 2 * P, 2 * P); x.fillRect(tx + (dir < 0 ? 0 : P), oy + h + P, P, P)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── layout
const HORIZON = 1190
const GEMS = { x: 290, y: 1300, size: 270 }, SAGS = { x: 790, y: 1300, size: 270 }
const FIN = { gem: 400, sag: 680 }
const BALE = { x: 130, y: 1214, r: 64 }
const MILL = { x: 905, top: 830 }
// the crowd: a deterministic scatter of tiny stars, revealed in order as the sky "fills up"
const CROWD = Array.from({ length: 240 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12345.678
  const fx = a - Math.floor(a), fy = b - Math.floor(b)
  return { x: 20 + fx * 1040, y: 80 + Math.pow(fy, 1.25) * (HORIZON - 120), s: 10 + ((i * 7) % 4) * 5, c: i % 9 === 0 ? GOLD : i % 7 === 0 ? '#c9a6ff' : i % 11 === 0 ? '#9fdcff' : BONE }
})
// the relatives: little eyed stars in sign colours, who wave back
const KIN = [
  { x: 150, y: 640, s: 92, id: 'leo' }, { x: 360, y: 560, s: 78, id: 'pisces' }, { x: 560, y: 690, s: 104, id: 'taurus' },
  { x: 760, y: 590, s: 84, id: 'virgo' }, { x: 960, y: 700, s: 96, id: 'aries' }, { x: 260, y: 880, s: 72, id: 'libra' },
  { x: 690, y: 900, s: 70, id: 'scorpio' }, { x: 470, y: 960, s: 64, id: 'aquarius' },
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Lubbock:* | look up.', { top: 235, size: 112, accentSize: 168, at: T.h0, gap: 0.12, accentColor: ACC, wobble: true, late: 2, lateAt: T.h0 + 0.7, lateGap: 0.14 })
  const H1 = popText(root, 'No city glow. | *Nothing* to hide.', { top: 225, size: 96, accentSize: 140, at: T.h1, late: 0, wobble: true, gap: 0.09, accentColor: ACC, fit: true })
  const H2 = popText(root, 'No games. | Just *stars.*', { top: 200, size: 140, accentSize: 220, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: ACC, lineHeight: 0.98, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ACC]) {
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

  function crowd(t) {
    const n = Math.floor(CROWD.length * ease.inOutQuad(prog(t, ...T.fillSky)))
    x.save()
    for (let i = 0; i < n; i++) {
      const c = CROWD[i], born = lerp(T.fillSky[0], T.fillSky[1], i / CROWD.length)
      const tw = 0.55 + 0.45 * Math.sin(t * 2.3 + i * 1.7)
      x.globalAlpha = Math.min(1, (t - born) * 4) * tw
      drawPixelStar(x, c.x, c.y, c.s, (i + Math.floor(t * 2)) % 3, c.c, '#ffffff')
    }
    x.restore()
  }
  function shootingStar(t) {
    const p = prog(t, ...T.shoot)
    if (p <= 0 || p >= 1) return
    const hx = lerp(980, 260, ease.inQuad(p)), hy = lerp(520, 760, ease.inQuad(p))
    x.save()
    for (let k = 0; k < 16; k++) { x.globalAlpha = (1 - k / 16) * (1 - p * 0.6); x.fillStyle = k < 3 ? '#fff6e6' : GOLD; x.fillRect(Math.round((hx + k * 18) / 6) * 6, Math.round((hy - k * 6) / 6) * 6, 12, 6) }
    x.restore()
    drawPixelStar(x, hx, hy, 26, 0, GOLD, '#fff6e6')
  }

  // ── the fields: dark earth, furrows converging on the horizon, cotton dots in rows, a windmill and a round hay bale
  function fields(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, HORIZON, 0, 1920)
    g.addColorStop(0, '#3a2a30'); g.addColorStop(1, '#6a4630')
    x.fillStyle = g; x.fillRect(0, HORIZON, 1080, 1920 - HORIZON)
    x.fillStyle = 'rgba(255,214,160,0.12)'; x.fillRect(0, HORIZON - 4, 1080, 6)        // the last glow on the horizon
    for (let r = -16; r <= 16; r++) {
      for (let s = 0; s <= 140; s++) {
        const u = s / 140, yy = HORIZON + 6 + u * u * (1920 - HORIZON), xx = 540 + r * 34 * (0.12 + u * u * 5)
        if (xx < -20 || xx > 1100) continue
        const sz = Math.max(3, Math.round(2 + u * u * 14))
        x.fillStyle = 'rgba(14,8,20,0.7)'; x.fillRect(Math.round(xx), Math.round(yy), sz, Math.max(2, Math.round(sz / 2)))
        if (s % 7 === 3 && u > 0.18) { x.fillStyle = '#f2eef6'; x.fillRect(Math.round(xx + sz * 0.6), Math.round(yy - sz), sz, sz); x.fillStyle = '#5c8a4a'; x.fillRect(Math.round(xx + sz * 0.6), Math.round(yy), Math.max(2, sz / 3), Math.max(2, sz / 2)) }
      }
    }
    // windmill: lattice tower, a turning wheel of blades, tail vane
    x.fillStyle = '#07040f'
    const { x: mx, top } = MILL
    for (let yy = top + 60; yy < HORIZON; yy += 6) { const w = 6 + (yy - top - 60) * 0.12; x.fillRect(Math.round(mx - w), yy, 6, 6); x.fillRect(Math.round(mx + w - 6), yy, 6, 6) }
    for (let yy = top + 100; yy < HORIZON - 20; yy += 60) { const w = 6 + (yy - top - 60) * 0.12; x.fillRect(Math.round(mx - w), yy, Math.round(w * 2), 4) }
    x.fillRect(mx + 4, top + 46, 70, 8); x.fillRect(mx + 64, top + 26, 16, 40)
    const spin = t * 1.4
    for (let b = 0; b < 12; b++) {
      const a = spin + b * Math.PI / 6
      for (let r = 14; r < 64; r += 6) { x.fillRect(Math.round(mx + Math.cos(a) * r) - 4, Math.round(top + 50 + Math.sin(a) * r) - 4, r > 30 ? 10 : 6, r > 30 ? 10 : 6) }
    }
    x.fillStyle = '#2b2245'; x.fillRect(mx - 8, top + 42, 16, 16)
    // hay bale (the ghost peeks over it later)
    const { x: bx, y: by, r } = BALE
    for (let j = -r; j <= 0; j += 6) for (let i = -r; i <= r; i += 6) {
      if ((i / r) ** 2 + (j / (r * 0.95)) ** 2 > 1) continue
      x.fillStyle = (Math.abs(i) + Math.abs(j)) % 18 === 0 ? '#8c6a35' : j < -r * 0.55 ? '#d8b569' : i > r * 0.4 ? '#9e7a3c' : '#c29a50'
      x.fillRect(bx + i, by + j + 30, 6, 6)
    }
    x.restore()
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    crowd(t)
    // relatives wake up and wave (hop) back at their family on the ground
    KIN.forEach((k, i) => {
      const wk = prog(t, T.wake + i * 0.08, T.wake + i * 0.08 + 0.3)
      if (wk <= 0) return
      const s = SIGNS.find(z => z.id === k.id)
      const fin = t > T.cut ? lerp(1, 0.75, prog(t, T.cut, T.cut + 0.5)) : 1
      drawStarChar(x, k.x, k.y, k.s * fin, t, { color: s.color, mood: t < T.wake + 0.5 + i * 0.08 ? 'wide' : i % 3 === 0 ? 'wink' : 'happy', blink: lerp(1, 0, wk) > 0.05 ? lerp(1, 0, wk) : undefined, hops: T.waves.map(w => w + i * 0.07), seed: 20 + i, glow: 0.8, pop: ok, tips: false, zzz: false })
    })
    const vk = easeOutBack(prog(t, T.visit, T.visit + 0.3), 2.4) * outK(t, [4.9, 5.1])
    if (vk > 0.01) bubble(x, 560 + 90, 690 - 110, 'you never visit!', { size: 32, k: vk, fill: '#fff1d0', side: 'left' })
    shootingStar(t)
    fields(t, ease.outCubic(prog(t, 0.05, 0.5)))
    drawGhostCameo(x, t, { x: BALE.x + 6, y: BALE.y - BALE.r * 0.95 + 36, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
    // the two on the ground
    const sit = ease.inOutCubic(prog(t, T.cut - 0.1, T.cut + 0.35))
    const lookUp = t < T.turn
    const gMood = t < T.wake ? { mood: 'wide', look: [0, -1], blink: false } : lookUp ? { mood: t < T.l2 ? 'sparkle' : 'neutral', look: [0.6, -1] } : { mood: 'heart', look: [1, 0] }
    const sMood = t < T.wake ? { mood: 'wide', look: [0, -1], blink: false } : lookUp ? { mood: t < T.l2 ? 'happy' : 'neutral', look: [-0.6, -1] } : { mood: 'heart', look: [-1, 0] }
    if (t > T.cut + 0.3) { gMood.look = [0.4, -1]; sMood.look = [-0.4, -1]; gMood.mood = 'sparkle'; sMood.mood = 'happy' }
    const pk = easeOutBack(prog(t, 0.25, 0.6), 2) * ok
    drawStarChar(x, lerp(GEMS.x, FIN.gem, sit), GEMS.y, GEMS.size, t, { color: GEM.color, glyph: GEM.glyph, ...gMood, pop: pk, hops: [T.waves[0], T.waves[2], T.turn, T.h2Land], seed: 3, glow: 1.1 })
    drawStarChar(x, lerp(SAGS.x, FIN.sag, sit), SAGS.y, SAGS.size, t, { color: SAG.color, glyph: SAG.glyph, ...sMood, pop: pk, hops: [T.waves[1], T.turn + 0.1, T.h2Land + 0.1], seed: 8, glow: 1.1 })
    const hk = easeOutBack(prog(t, T.turn + 0.2, T.turn + 0.5), 2.6) * outK(t, [T.cut - 0.2, T.cut])
    if (hk > 0.01) drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, 1180 + Math.sin(t * 2.2) * 6, 12 * hk * (1 + 0.08 * Math.max(0, Math.sin((t - T.turn) * 7))))
    sparkles(t, 540, 1180, T.turn + 0.2, 10, 170, 2)
    sparkles(t, 540, 1240, T.h2Land, 12, 330, 4)
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

// card-motif candidates: 5.24 (H0 out → "No city glow") and 10.4 (box shut → "No games. Just stars.").
const CUTS = [5.24, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.12, 0, 0.026), ['pop', T.h0 + 0.7, 1174.66, 0.04, 0], ['pop', T.h0 + 0.84, 1318.51, 0.045, 0],
  ['glitter', T.fillSky[0], T.fillSky[0] + 1.2], ['glitter', T.fillSky[0] + 1.4, T.fillSky[1]],
  ...KIN.map((k, i) => ['pop', +(T.wake + i * 0.08).toFixed(3), NOTE[i % 7] * 2, 0.018, (k.x - 540) / 600]),
  ...T.waves.map((w, i) => ['tick', w, 0.03]),
  ['pop', T.visit, 1318.51, 0.035, 0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 6, 0.09, 1, 0.022),
  ['pluck', T.turn + 0.2, 1174.66, 0.04, 0.6, 0], ['bell', T.turn + 0.25, 1568, 0.022, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['whoosh', T.shoot[0], 0.7, 0.025], ['bell', T.shoot[1] - 0.2, 1760, 0.02, 1.4, -0.4],
  ['pop', T.ghost + 0.1, 1318.51, 0.012, -0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
