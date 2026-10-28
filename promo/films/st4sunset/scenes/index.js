// st4sunset (15 s vertical Align ad, Star Talk season 4, EP 042, thread A) · story 0–10.6, then the shared end card
// with "JOIN THE TEXAS BETA".
//   0.00–4.85  "Texas *sunsets* | are unfair."  The road-trip van has pulled over on a Hill Country road; the sky turns
//              orange and pink over rolling hills and a striped pixel sun. ♓ Pisces is crying (happy tears), ♌ Leo, crown on,
//              snaps selfies with its back to the view (flash, flash, flash on the drop), ♒ Aquarius, headphones on, just
//              watches. THE STARS: "put the phone down." Leo goes wide-eyed and lowers the phone.
//   4.90–7.80  "No filter | *needed.*"  THE STARS: "watch the sky *with* someone." Leo pockets the phone and scoots over
//              next to Aquarius; both look up. The ghost peeks over a far hilltop (6.4–7.6).
//   7.85 cut → "Eyes up. | *Sky's* out."  Dusk: the first stars come out, all three look up, sparkle-eyed. Everything pops
//              out by 10.4; the end card takes over at 10.6.
// HELLO TEXAS (drop 5): this last line is the E. One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { drawVan } from '../van.js'

export const EP = 42
export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', PEACH = '#ffb27a'
const PIS = signStar('pisces'), LEO = signStar('leo'), AQU = signStar('aquarius')

// ── the timeline (drop on 2.82)
const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [4.7, 4.88],
  starsIn: [0.35, 0.6, 0.85], flashes: [1.7, 2.25, 2.82],
  open: 2.95, l1: 3.15, gasp: 3.5, lower: [3.7, 4.2],
  h1: 4.92, h1Land: 5.3, l2: 5.05, scoot: [5.6, 6.3], ghost: 6.4, close: 7.75, h1Out: [7.6, 7.8],
  cut: 7.85, h2: 7.95, h2Land: 8.3, h2Out: [10.12, 10.38], out: [10.05, 10.42],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'put the phone down.' },
  { t: T.l2, speaker: SPEAK, text: 'watch the sky *with* someone.', color: PINK },
]
const CPS = 28

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
const CROWN = ['G.G.G.G', 'GGGGGGG', 'GrGGGbG', 'GGGGGGG']
const CROWN_C = { G: '#f2c75c', r: '#ff5a7a', b: '#7fdcff' }
const PHONE = ['KKKKK', 'KsssK', 'KsssK', 'KsssK', 'KsssK', 'KsssK', 'KKcKK']
const PHONE_C = { K: '#2a2156', s: '#7fdcff', c: '#efe6d6' }
const TEAR = ['.T.', 'TTT', 'TWT', '.T.']
const TEAR_C = { T: '#7fdcff', W: '#e8fbff' }

// ── layout
const HORIZON = 1060
const P_PIS = { x: 200, y: 1250, s: 250 }, P_AQU = { x: 540, y: 1240, s: 270 }
const P_LEO_A = { x: 880, y: 1250, s: 260 }, P_LEO_B = { x: 735, y: 1244, s: 260 }
const AQU_B = { x: 470 }

// the hills: three layers of pixel-stepped sine ridges (pure)
const ridge = (xx, k) => {
  const L = [[0.0062, 70, 0.9, 0.011, 30, 2.1], [0.0048, 60, 2.4, 0.013, 26, 0.4], [0.0039, 54, 4.1, 0.009, 22, 1.3]][k]
  const base = [HORIZON - 40, HORIZON + 30, HORIZON + 110][k]
  return base - L[1] * (0.5 + 0.5 * Math.sin(xx * L[0] + L[2])) - L[4] * Math.sin(xx * L[3] + L[5])
}
const HILL_COL = ['#7a3d6e', '#4b2457', '#2a1640']
const GHOST_X = 862

function sunsetK(t) { return t < T.cut ? lerp(0.45, 1, ease.inOutCubic(prog(t, 0, 3.2))) : lerp(1, 0.55, ease.inOutCubic(prog(t, T.cut, T.cut + 1.2))) }

function leoState(t) {
  if (t < T.starsIn[2] + 0.3) return { mood: 'happy' }
  if (t < T.l1) return { mood: t % 0.55 < 0.28 ? 'wink' : 'happy', look: [-1, 0] }      // posing for the selfie
  if (t < T.lower[1]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.scoot[1]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.cut) return { mood: 'sparkle', look: [-1, -1] }
  return { mood: 'sparkle', look: [0, -1] }
}
function aquState(t) {
  if (t < T.scoot[1]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cut) return { mood: 'happy', blush: 0.6 }
  return { mood: 'sparkle', look: [0, -1] }
}
function pisState(t) {
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1] }
  return { mood: 'happy' }
}
const LEO_HOPS = [T.starsIn[2] + 0.3, ...T.flashes, T.gasp, T.scoot[0] + 0.1, T.scoot[0] + 0.45, T.h2Land]
const PIS_HOPS = [T.starsIn[0] + 0.3, 3.9, 6.9, T.h2Land + 0.1]
const AQU_HOPS = [T.starsIn[1] + 0.3, T.scoot[1], T.h2Land + 0.2]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Texas *sunsets* | are unfair.', { top: 196, size: 120, accentSize: 172, at: T.h0, gap: 0.1, accentColor: PEACH, wobble: true, late: 0 })
  const H1 = popText(root, 'No filter | *needed.*', { top: 200, size: 128, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, "Eyes up. | *Sky's* out.", { top: 196, size: 136, accentSize: 210, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1470, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6e6', opacity: 0, pointerEvents: 'none' }, root)

  function sunsetWash(t) {
    const k = sunsetK(t)
    const g = x.createLinearGradient(0, 0, 0, HORIZON + 60)
    g.addColorStop(0, `rgba(40,20,80,${0.2 * k})`)
    g.addColorStop(0.45, `rgba(170,60,130,${0.55 * k})`)
    g.addColorStop(0.78, `rgba(240,110,110,${0.8 * k})`)
    g.addColorStop(1, `rgba(255,170,90,${0.95 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, HORIZON + 60)
  }
  function sun(t) {
    const sy = lerp(930, 1050, ease.inOutSine ? ease.inOutSine(prog(t, 0, STORY_END)) : prog(t, 0, STORY_END)), R = 150, c = 10
    x.save()
    const g = x.createRadialGradient(540, sy, 0, 540, sy, R * 2.6)
    g.addColorStop(0, `rgba(255,210,120,${0.55 * sunsetK(t)})`); g.addColorStop(1, 'rgba(255,170,90,0)')
    x.fillStyle = g; x.fillRect(540 - R * 2.6, sy - R * 2.6, R * 5.2, R * 5.2)
    for (let j = -R; j < R; j += c) for (let i = -R; i < R; i += c) {
      if (Math.hypot(i + c / 2, j + c / 2) > R) continue
      const band = j > 20 && Math.floor((j - 20) / 10) % 3 === 0          // retro stripes in the lower half
      if (band) continue
      x.fillStyle = j < -R * 0.4 ? '#fff0b0' : j < 20 ? '#ffd27a' : '#ffa45c'
      x.fillRect(540 + i, Math.round(sy + j), c, c)
    }
    x.restore()
  }
  function hills(t, k) {
    const c = 8
    x.fillStyle = HILL_COL[k]
    for (let xx = 0; xx < W; xx += c) { const y = Math.round(ridge(xx + c / 2, k) / c) * c; x.fillRect(xx, y, c, 1920 - y) }
    // little live-oak tufts on the near ridges
    if (k > 0) for (let xx = 40 + k * 70; xx < W; xx += 230 + k * 40) {
      const y = Math.round(ridge(xx, k) / c) * c
      x.fillStyle = k === 1 ? '#3a1a48' : '#1f0f30'
      x.fillRect(xx - 3 * c, y - 3 * c, 6 * c, 2 * c); x.fillRect(xx - 2 * c, y - 4 * c, 4 * c, c); x.fillRect(xx - c / 2, y - c, c, c)
    }
  }
  function road() {
    // a two-lane road along the near hill, a dashed yellow line
    x.fillStyle = '#1a1030'; x.fillRect(0, 1180, W, 120)
    x.fillStyle = 'rgba(255,209,102,0.8)'
    for (let i = 0; i < 8; i++) x.fillRect(20 + i * 150, 1236, 80, 8)
    x.fillStyle = '#2a1640'; x.fillRect(0, 1300, W, 620)
    // bluebonnet clumps on the shoulder
    for (let i = 0; i < 9; i++) {
      const bx = 40 + i * 120 + (i % 2) * 30, by = 1340 + (i % 3) * 30
      x.fillStyle = '#2f5a3a'; x.fillRect(bx + 6, by + 8, 4, 18); x.fillRect(bx + 22, by + 4, 4, 22)
      x.fillStyle = '#5b7be8'; x.fillRect(bx, by, 16, 10); x.fillRect(bx + 16, by - 6, 16, 12)
      x.fillStyle = '#efe6d6'; x.fillRect(bx + 4, by - 4, 6, 6); x.fillRect(bx + 20, by - 10, 6, 6)
    }
  }
  function headphones(cx, cy, s, a = 1) {
    x.save(); x.globalAlpha *= a
    x.lineWidth = s * 0.05; x.strokeStyle = INK
    x.beginPath(); x.arc(cx, cy - s * 0.02, s * 0.3, Math.PI * 1.12, Math.PI * 1.88); x.stroke()
    x.lineWidth = s * 0.028; x.strokeStyle = '#7fe0b8'; x.stroke()
    for (const sgn of [-1, 1]) {
      x.fillStyle = INK; x.fillRect(cx + sgn * s * 0.3 - s * 0.06, cy - s * 0.1, s * 0.12, s * 0.17)
      x.fillStyle = '#7fe0b8'; x.fillRect(cx + sgn * s * 0.3 - s * 0.045, cy - s * 0.085, s * 0.09, s * 0.14)
    }
    x.restore()
  }
  function tears(t, r, s) {
    for (let k = 0; k < 6; k++) {
      const ph = ((t * 0.9 + k / 6) % 1), side = k % 2 ? 1 : -1
      const tx = r.x + side * (s * 0.13 + ph * s * 0.08), ty = r.y - s * 0.02 + ph * s * 0.42
      drawBits(x, TEAR, TEAR_C, Math.round(tx), Math.round(ty), Math.max(4, s / 36), { alpha: Math.sin(Math.PI * ph) })
    }
  }
  function duskStars(t) {
    const k = prog(t, T.cut + 0.2, T.cut + 1.6)
    if (k <= 0) return
    for (let i = 0; i < 18; i++) {
      const sx = 60 + ((i * 263) % 960), sy = 520 + ((i * 151) % 360)
      if (k < i / 18) continue
      x.save(); x.globalAlpha = (0.55 + 0.45 * Math.sin(t * 3 + i)) * clamp((k - i / 18) * 6)
      drawPixelStar(x, sx, sy, 16 + (i % 3) * 6, i % 2, i % 4 ? BONE : GOLD); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      sunsetWash(t)
      drawSeedConstellation(x, t, EP)
      duskStars(t)
      sun(t)
      hills(t, 0)
      // the ghost peeks over the far ridge (drawn after it; the nearer ridges stay below its edge)
      drawGhostCameo(x, t, { x: GHOST_X, y: Math.round(ridge(GHOST_X, 0) / 8) * 8 + 2, at: T.ghost, dur: 1.2, from: 'below', cell: 3 })
      hills(t, 1)
      hills(t, 2)
      road()
      // the van, pulled over at the left, doors-open energy
      drawVan(x, -170, 1180 - 28.7 * 9, 9, t, { glare: 1 })

      const ok = popOut(t, T.out)
      if (ok > 0) {
        // Pisces
        const pp = pop01(t, T.starsIn[0], 0.36, 2) * ok
        const rp = drawStarChar(x, P_PIS.x, P_PIS.y, P_PIS.s, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, pop: pp, seed: 2, glow: 1.1 })
        if (pp > 0.5 && t < T.cut + 0.6) tears(t, rp, P_PIS.s * pp)
        // Aquarius (+ headphones)
        const ap = pop01(t, T.starsIn[1], 0.36, 2) * ok
        const ax = lerp(P_AQU.x, AQU_B.x, ease.inOutCubic(prog(t, ...T.scoot)))
        const ra = drawStarChar(x, ax, P_AQU.y, P_AQU.s, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 6, glow: 1 })
        if (ap > 0.05) headphones(ra.x, ra.y, P_AQU.s * ap, clamp(ap * 2))
        // Leo (+ crown, + phone)
        const lp = pop01(t, T.starsIn[2], 0.36, 2) * ok
        const sk = ease.inOutCubic(prog(t, ...T.scoot))
        const lx = lerp(P_LEO_A.x, P_LEO_B.x, sk), ly = P_LEO_A.y - Math.sin(Math.PI * sk) * 60
        const rl = drawStarChar(x, lx, ly, P_LEO_A.s, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 9, glow: 1.1 })
        if (lp > 0.05) {
          drawBits(x, CROWN, CROWN_C, Math.round(rl.x), Math.round(rl.top - 4), P_LEO_A.s * lp / 26, { rot: 0.1 })
          // the phone: up for selfies, lowered after "put the phone down", gone when it scoots
          const down = ease.inOutCubic(prog(t, ...T.lower)), gone = prog(t, T.scoot[0] - 0.1, T.scoot[0] + 0.15)
          if (gone < 1) {
            const px = rl.x + P_LEO_A.s * lerp(0.42, 0.36, down), py = rl.y + lerp(-P_LEO_A.s * 0.25, P_LEO_A.s * 0.3, down)
            drawBits(x, PHONE, PHONE_C, Math.round(px), Math.round(py), P_LEO_A.s * lp / 26 * (1 - gone), { rot: lerp(-0.25, 0.5, down) })
            // flash at the lens
            for (const f of T.flashes) {
              const u = t - f
              if (u > 0 && u < 0.3) { x.save(); x.globalAlpha = 1 - u / 0.3; drawPixelStar(x, px, py - P_LEO_A.s * 0.1, 90 * (1 - u / 0.3) + 30, 2, '#ffffff'); x.restore() }
            }
          }
        }
      }
      box.update(t)
      let fl = 0
      for (const f of T.flashes) { const u = t - f; if (u > 0 && u < 0.25) fl = Math.max(fl, 0.16 * (1 - u / 0.25)) }
      flash.style.opacity = fl.toFixed(3)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.9 (H0 out → "No filter needed") and 7.85 (box shut → "Eyes up. Sky's out."). cardfx keeps 7.85.
const CUTS = [4.9, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.024),
  ...T.starsIn.map((s, i) => ['pop', s + 0.1, NOTE[i + 2], 0.035, -0.4 + i * 0.4]),
  ...T.flashes.map(f => ['tick', f, 0.05]), ...T.flashes.map(f => ['pop', f + 0.01, 1760, 0.02, 0.4]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.gasp, 440, 0.035, 0.4],
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.scoot[0], 0.6, 0.02], ['pluck', T.scoot[1], 987.77, 0.035, 0.6, 0],
  ['tick', T.ghost + 0.3, 0.018],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['glitter', T.cut + 0.3, T.cut + 1.5], ['bell', T.cut + 0.6, 1760, 0.025, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
