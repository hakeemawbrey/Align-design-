// st4finale (30 s vertical Align ad, Star Talk season 4, EP 100, the finale) · story 0–25.6, then the shared end card.
//   "Houston, we have a match." opened EP 001 and closes EP 100. The 100-star constellation completes into the
//   seed-of-life and hands off to the end card's logo.
//   0.00–12.0  "Houston, we have | a *match.*"  Everyone gathers over a generic Houston skyline: the six couples (the
//              twelve sign stars, each pair side by side), and floating above them the Moon, Venus, Saturn (glasses),
//              Retro (the ☿ orb, spinning backwards) and two Aunties in reading glasses; the ghost, sheet off since
//              EP 088, stands shyly in front. THE STARS: "we came down to give advice." → "Houston first. Texas
//              next." → "then wherever *you* vote us." (The ghost, sheet on, peeks over the dialogue box.)
//   12.2 cut → "Every episode, | *one star.*"  The camera pulls up into the sky: the gathering sinks out of frame, and
//              the corner constellation (99 stars) glides to the centre and grows to the end card's logo size. The
//              100th star rises from Houston like a comet and lands: the rings close, the lavender glow blooms.
//   19.0–25.6  "Where should we | land *next?*"  The finished seed-of-life breathes. 25.0–25.55 it gathers into one
//              point of light at the logo's centre, exactly where the end card's own light appears and re-blooms.
// One canvas (sky + constellation + skyline + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral, SEED_POINTS } from '../../stlore.js'
import { popText } from '../../lesson.js'

export const DURATION = 30
const EP = 100
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#d9cdf0', SHY = '#a9d4ff'
const SERIF = "'EB Garamond', Georgia, serif"

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.75, h0Out: [11.6, 11.85],
  city: 0.2, cast: 0.45, open: 2.66, l1: 2.82, l2: 5.9, l3: 9.0, hearts: 9.6, ghost: 6.9, close: 12.0,
  cut: 12.2,
  pull: [12.1, 14.8], move: [12.5, 15.8], h1: 12.3, h1Land: 12.8, h1Out: [18.6, 18.8],
  comet: [15.9, 17.0], lines: [17.0, 18.0], glow: [17.15, 18.4],
  h2: 19.0, h2Land: 19.55, h2Out: [24.75, 25.0], gather: [25.0, 25.5], pointOut: [25.42, 25.58],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'we came down to give *advice.*' },
  { t: T.l2, speaker: NARR, text: 'Houston first. Texas *next.*' },
  { t: T.l3, speaker: NARR, text: 'then wherever *you* vote us.', color: PINK },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── the constellation hand-off: corner spot (stlore's default) → the end card's mark (centre 540,820; outer ring 248 px)
const CORNER = { x: 150, y: 122, r: 62 }, MARK = { x: 540, y: 820, r: 248 }
const P100 = (() => { const p = SEED_POINTS[99], u = MARK.r / 40; return { x: MARK.x + p.x * u, y: MARK.y + p.y * u } })()

// ── the cast
const PAIRS = [['aries', 'libra'], ['gemini', 'sagittarius'], ['cancer', 'capricorn'], ['leo', 'aquarius'], ['virgo', 'pisces'], ['taurus', 'scorpio']]
const PAIR_X = [210, 540, 870]
const COUPLES = PAIRS.flatMap((pr, k) => {
  const row = k < 3 ? 0 : 1, cx = PAIR_X[k % 3], y = row ? 1236 : 1022, size = row ? 134 : 120
  return pr.map((id, j) => ({ id, x: cx + (j ? 62 : -62), y, size, side: j ? -1 : 1, seed: 30 + k * 2 + j, at: T.cast + 0.12 * (k * 2 + j) / 1.4 }))
})
const SKYROW = 770
const SHYG = { x: 375, y: 1318, size: 84 }
export const GHOST = { at: T.ghost, x: 930, y: 1446, where: 'peeking over the top of the dialogue box' }
const TOWERS = [[70, 110, 300], [175, 90, 420], [285, 120, 360], [395, 90, 480], [505, 130, 560], [630, 100, 440], [735, 120, 520], [850, 90, 380], [950, 120, 460], [1040, 90, 320]]
const CITY_BASE = 1380

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "italic 500 48px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston, we have | a *match.*', { top: 200, size: 112, accentSize: 190, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Every episode, | *one star.*', { top: 200, size: 108, accentSize: 176, at: T.h1, gap: 0.09, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: LAV })
  const H2 = popText(root, 'Where should | we land *next?*', { top: 190, size: 112, accentSize: 180, fit: true, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV], dur = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  const disc = (cx, cy, r, c, col) => { for (let j = -Math.ceil(r / c); j <= Math.ceil(r / c); j++) for (let i = -Math.ceil(r / c); i <= Math.ceil(r / c); i++) if ((i * c) ** 2 + (j * c) ** 2 <= r * r) { x.fillStyle = typeof col === 'function' ? col(i, j) : col; x.fillRect(cx + i * c - c / 2, cy + j * c - c / 2, c + 0.5, c + 0.5) } }

  function drawSkyline(dy, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k)
    TOWERS.forEach(([cx, w, h], n) => {
      const x0 = Math.round(cx - w / 2), y0 = CITY_BASE - h + dy
      x.fillStyle = n % 2 ? '#1d1840' : '#231d4c'; x.fillRect(x0, y0, w, h + 200)
      x.fillStyle = '#2c2560'; x.fillRect(x0, y0, 6, h)
      for (let wy = y0 + 18; wy < CITY_BASE + dy - 20; wy += 26) for (let wx = x0 + 14; wx < x0 + w - 12; wx += 20) {
        if (((wx * 7 + wy * 3 + n * 11) % 7) < 2) { x.fillStyle = 'rgba(255,217,138,0.5)'; x.fillRect(wx, wy, 8, 10) }
      }
    })
    x.restore()
  }
  /** Saturn the teacher: ringed planet with glasses and a pointer */
  function drawSaturn(t, cx, cy, p) {
    if (p <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(p, p); x.rotate(-0.18)
    const ring = (front) => { for (let a = 0; a < Math.PI * 2; a += 0.05) { const s = Math.sin(a); if ((s > 0) !== front) continue; const rx = Math.cos(a) * 104, ry = s * 24; x.fillStyle = INK; x.fillRect(rx - 6, ry - 6, 12, 12); x.fillStyle = '#f7dca0'; x.fillRect(rx - 4, ry - 4, 8, 8) } }
    ring(false)
    disc(0, 0, 58, 6, INK)
    disc(0, 0, 52, 6, (i, j) => (j % 4 === 0 ? '#d6a35a' : i + j < -6 ? '#f7dca0' : '#e8c27a'))
    ring(true)
    x.rotate(0.18)
    // glasses + eyes
    for (const s of [-1, 1]) {
      x.fillStyle = INK; x.fillRect(s * 22 - 15, -22, 30, 26); x.fillStyle = 'rgba(191,233,255,0.85)'; x.fillRect(s * 22 - 11, -18, 22, 18)
      const blink = (t + 0.7) % 3.4 < 0.12
      x.fillStyle = INK; if (blink) x.fillRect(s * 22 - 6, -9, 12, 3); else x.fillRect(s * 22 - 4, -14, 8, 10)
    }
    x.fillStyle = INK; x.fillRect(-7, -14, 14, 4)
    // pointer
    x.fillStyle = INK; x.fillRect(54, -6, 70, 8); x.fillStyle = '#c98f5f'; x.fillRect(56, -4, 66, 4); x.fillStyle = PINK; x.fillRect(118, -6, 8, 8)
    x.restore()
  }
  /** Retro: the ☿ orb, spinning backwards */
  function drawRetro(t, cx, cy, p) {
    if (p <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(p, p)
    disc(0, 0, 44, 6, INK); disc(0, 0, 38, 6, (i, j) => (i + j < -3 ? '#ffe7a3' : '#f2c75c'))
    x.font = `italic 500 48px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿', 0, 2)
    const a0 = -t * 3.2
    for (let k = 0; k < 2; k++) for (let i = 0; i < 9; i++) {
      const a = a0 + k * Math.PI + i * 0.15
      x.fillStyle = i === 8 ? BONE : 'rgba(239,230,214,0.6)'; x.fillRect(Math.cos(a) * 62 - 4, Math.sin(a) * 62 - 4, 8, 8)
    }
    x.restore()
  }
  function glasses(r, size) {
    const w = size * 0.2, h = size * 0.13, y = r.y - size * 0.06
    for (const s of [-1, 1]) { x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(r.x + s * size * 0.15 - w / 2, y - h / 2, w, h); x.fillStyle = 'rgba(191,233,255,0.35)'; x.fillRect(r.x + s * size * 0.15 - w / 2, y - h / 2, w, h) }
    x.fillStyle = INK; x.fillRect(r.x - size * 0.05, y - 2, size * 0.1, 4)
  }

  const TALK = talkHops(LINES, NARR, { cps: CPS })
  function drawCast(t, dy, k) {
    if (k <= 0) return
    const lookUp = t > T.pull[0] - 0.1
    const mood = (i) => lookUp ? { mood: 'wide', look: [0, -1], blink: false } : t > T.hearts ? { mood: i % 3 ? 'heart' : 'happy' } : null
    // the sky row: Moon, Venus, Saturn, Retro, the Aunties
    const sp = (i) => pop01(t, T.cast + 1.1 + i * 0.12, 0.4, 2.2) * k
    drawStarChar(x, 160, SKYROW + dy, 132, t, { color: '#f4ecd8', glyph: '☽', mood: 'sleepy', zzz: false, ...(mood(1) || {}), pop: sp(0), seed: 51, glow: 1.2, hops: [T.cast + 1.4, ...TALK.slice(0, 2)] })
    drawStarChar(x, 330, SKYROW - 20 + dy, 112, t, { color: '#ff8fb1', glyph: null, mood: 'happy', ...(mood(2) || {}), pop: sp(1), seed: 52, glow: 1.1, hops: [T.cast + 1.5, T.hearts] })
    drawSaturn(t, 545, SKYROW + dy, sp(2))
    drawRetro(t, 745, SKYROW - 10 + dy, sp(3))
    for (let a = 0; a < 2; a++) {
      const r = drawStarChar(x, 872 + a * 92, SKYROW + 14 + a * 22 + dy, 88, t, { color: BONE, glyph: null, mood: a ? 'squint' : 'happy', look: [-1, 0], ...(mood(a) || {}), pop: sp(4 + a), seed: 60 + a, glow: 0.7, tips: false, hops: [T.cast + 1.7 + a * 0.1, T.l2 + 0.2, T.hearts + 0.1] })
      if (sp(4 + a) > 0.5) glasses(r, 88)
    }
    // the six couples, each pair snug and turned toward each other
    COUPLES.forEach((c, i) => {
      const p = pop01(t, c.at, 0.38, 2.2) * k
      if (p <= 0.02) return
      const st = signStar(c.id)
      const m = mood(i) || { mood: (i % 4 === 0 ? 'sparkle' : 'happy'), look: [c.side, 0] }
      drawStarChar(x, c.x, c.y + dy, c.size, t, { color: st.color, glyph: st.glyph, ...m, pop: p, seed: c.seed, glow: 0.95, tips: false, hops: [c.at + 0.3, ...TALK.filter((_, j) => (j + i) % 3 === 0), T.hearts + (i % 4) * 0.08] })
    })
    // the ghost, sheet off (since EP 088): a shy little star, blushing, waving in front
    const gp = pop01(t, T.cast + 1.9, 0.4, 2.2) * k
    if (gp > 0.02) drawStarChar(x, SHYG.x, SHYG.y + dy, SHYG.size, t, { color: SHY, glyph: null, mood: lookUp ? 'wide' : 'happy', look: lookUp ? [0, -1] : [0, 0], blush: 1, pop: gp, seed: 70, glow: 0.9, tips: false, hops: [T.cast + 2.2, T.l3 + 0.3, T.hearts + 0.2] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      // the camera pulls up: the sky drifts down a little and comes back to SKY_H by the hand-off
      const pull = ease.inOutCubic(prog(t, ...T.pull))
      const skyDy = 180 * Math.sin(Math.PI * prog(t, T.pull[0], 24.5)) ** 2
      drawSky(x, t, { ...SKY_H, dy: skyDy })
      // the constellation: corner → centre (logo size), 99 → 100 stars, the rings close, the glow blooms, then it gathers
      const mv = ease.inOutCubic(prog(t, ...T.move))
      const ga = ease.inCubic(prog(t, ...T.gather))
      const done = t >= T.comet[1]
      const cx = lerp(CORNER.x, MARK.x, mv), cy = lerp(CORNER.y, MARK.y, mv)
      const r = lerp(CORNER.r, MARK.r, mv) * (1 - 0.92 * ga)
      const lines = lerp(0.32, 0.72, ease.outCubic(prog(t, ...T.lines)))
      const breathe = done ? 0.08 * Math.sin((t - T.glow[1]) * 2.2) * prog(t, T.glow[1], T.glow[1] + 0.4) : 0
      const glow = clamp(ease.outCubic(prog(t, ...T.glow)) + breathe) * (1 - ga)
      drawSeedConstellation(x, t, done ? EP : EP - 1, { x: cx, y: cy, r, lines, glow, today: done, alpha: 1 - prog(t, T.gather[1] - 0.25, T.gather[1]) })
      // the 100th star: a comet rising from Houston to its place on the outer ring
      const cp = prog(t, ...T.comet)
      if (cp > 0 && cp < 1) {
        const e = ease.inOutCubic(cp)
        const px = lerp(540, P100.x, e) + Math.sin(Math.PI * e) * 220, py = lerp(1900, P100.y, e)
        x.save()
        for (let i = 1; i <= 8; i++) { const ee = ease.inOutCubic(clamp(cp - i * 0.03)); x.globalAlpha = (1 - i / 9) * 0.6; drawPixelStar(x, lerp(540, P100.x, ee) + Math.sin(Math.PI * ee) * 220, lerp(1900, P100.y, ee), 22 - i * 1.5, 0, GOLD, '#fff6e6') }
        x.globalAlpha = 1; drawPixelStar(x, px, py, 34, 0, GOLD, '#fff6e6')
        x.restore()
      }
      sparkles(t, P100.x, P100.y, T.comet[1], 12, 90, 1, [GOLD, BONE, LAV])
      sparkles(t, MARK.x, MARK.y, T.lines[0] + 0.3, 18, 320, 2, [LAV, GOLD, BONE, PINK], 1.0)
      // the gathered point of light at the mark's centre (where the end card's own light appears)
      const pt = Math.sin(Math.PI * prog(t, T.gather[0] + 0.2, T.pointOut[1])) * (t < T.pointOut[0] ? 1 : 1 - prog(t, ...T.pointOut))
      if (pt > 0.01) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(MARK.x, MARK.y, 0, MARK.x, MARK.y, 90 * pt)
        g.addColorStop(0, `rgba(255,250,240,${0.95 * pt})`); g.addColorStop(0.2, `rgba(255,236,200,${0.6 * pt})`); g.addColorStop(1, 'rgba(201,166,255,0)')
        x.fillStyle = g; x.fillRect(MARK.x - 90, MARK.y - 90, 180, 180); x.restore()
      }
      // the gathering, sinking out of frame as the camera pulls up
      const dy = 1500 * ease.inCubic(pull)
      if (dy < 1400) {
        drawSkyline(dy, ease.outCubic(prog(t, T.city, T.city + 0.5)))
        drawCast(t, dy, 1)
      }
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'below', cell: 3 })
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut, as the box shuts and the camera starts to pull up; the end card's own flip takes the logo hand-off
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['bell', T.h0Land + 0.05, 1318.51, 0.025, 1.2, 0],
  ...COUPLES.map((c, i) => ['pop', +(c.at + 0.05).toFixed(3), NOTE[i % NOTE.length], 0.028, (c.x - 540) / 600]),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.cast + 1.15 + i * 0.12).toFixed(3), NOTE[(i + 3) % NOTE.length], 0.026, (i - 2.5) / 4]),
  ['pop', T.cast + 1.95, 1567.98, 0.025, -0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', T.hearts, T.hearts + 0.6], ['pluck', T.hearts, 1174.66, 0.04, 0.6, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.pull[0], 2.2, 0.05], ...wordPops(T.h1, 2, 0.09, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.045, 0],
  ['whoosh', T.comet[0], 1.1, 0.045], ['glitter', T.comet[0] + 0.5, T.comet[1]],
  ['pop', T.comet[1], 1567.98, 0.06, 0.3], ['bell', T.comet[1] + 0.02, 1760, 0.04, 1.6, 0.2], ['boom', T.lines[0] + 0.05, 0.14],
  ['glitter', T.lines[0] + 0.3, T.lines[0] + 1.2], ['bell', T.glow[1] - 0.4, 1318.51, 0.03, 1.8, 0],
  ...wordPops(T.h2, 3, 0.09, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.gather[0], 0.5, 0.03], ['bell', T.gather[1] - 0.1, 2093, 0.022, 1.0, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
