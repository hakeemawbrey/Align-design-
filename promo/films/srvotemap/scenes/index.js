// srvotemap (30 s, vertical) — Star Talk Remix of votemap, "Align starts in Houston."  CTA: VOTE FOR YOUR CITY
// The guide is the HOUSTON STAR: the first star lit, a gold star with eyes sitting on Houston on the map.
//   0.00–5.25  HOOK  "Align starts | in *Houston.*" A line-art US map draws itself on; on the drop (2.82) Houston ignites and
//              the gold star pops up there, wide-eyed, with a "LAUNCH CITY #1" tag. HOUSTON STAR: "first city lit. hi, *Houston!*"
//   5.45–11.0  "Then the stars | pick a | *second city.*" Constellation lines reach out to ten candidate cities, each a little
//              star FAST ASLEEP (zzz). HOUSTON STAR: "hello? other cities? anyone *up?*" … crickets. It squints.
//  11.05       card-motif cut.
//  11.2–15.6   "Every vote | wakes a *star.*" Votes rise from the bottom as sparks; every hit wakes a city a little more
//              (asleep → groggy → awake → happy). Every city gets the same number, in shuffled rounds: no counts, no leader.
//              HOUSTON STAR: "aww. they're waking *up.*"
//  15.4–19.4   "Which city | lights up *next?*" HOUSTON STAR: "they won't wake up on their *own.*" A light chases round all ten
//              twice and the Houston star's eyes chase it, then all ten flare together.
//  19.45       card-motif cut.
//  19.6–25.35  "Vote your city | into the *sky.*" The ten stars hop off the map and rise into the sky, the Houston star joins
//              them, heart-eyed. HOUSTON STAR: "your vote = their *wake-up call.*" The map fades; plain sky by 25.35.
//  25.6        end card ("come" + the logo + VOTE FOR YOUR CITY).
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { BONE, GOLD, PINK, BLUE, LAV, rgba, ink, sparkle, orb, chip } from './props.js'
import { popText, pop01 } from './kit.js'

export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const MINT = '#7fe0b5'

export const T = {
  h0: 0.12, draw: [0.15, 2.55], drop: BEAT(4), tag: BEAT(4.6), tagOut: [4.95, 5.25], h0Out: [5.05, 5.25],
  h1: 5.45, h1Last: BEAT(10), lines0: 6.05, lineGap: 0.235, crickets: [10.45, 11.1], h1Out: [10.85, 11.0],
  h2: 11.2, h2Last: BEAT(20), votes: [11.4, 15.2], h2Out: [15.45, 15.62],
  h5: 15.8, h5Last: BEAT(28), chase: [16.6, 18.6], flare: 18.66, h5Out: [19.2, 19.38],
  h6: 19.6, h6Last: BEAT(35), rise: 20.7, houRise: [21.5, 22.7], heart: 23.0, fade: [23.6, 24.9], out: [24.95, 25.35],
}
const SPEAK = '★ HOUSTON STAR'
const CPS = 28
const L1 = [{ t: 3.5, speaker: SPEAK, text: 'first city lit. hi, *Houston!*' }]
const L2 = [
  { t: 8.9, speaker: SPEAK, text: 'hello? other cities? anyone *up?*' },
  { t: 12.6, speaker: SPEAK, text: "aww. they're waking *up.*" },
  { t: 15.4, speaker: SPEAK, text: "they won't wake up on their *own.*" },
]
const L5 = [{ t: 20.4, speaker: SPEAK, text: 'your vote = their *wake-up call.*' }]
const ALL_LINES = [...L1, ...L2, ...L5]
const HOPS = talkHops(ALL_LINES, SPEAK, { cps: CPS })
const BOX = { y: 1590, close: [6.4, 18.2, 23.4] }

// ── the map: a stylised lower-48 outline (lon/lat → px; not exact geography)
const MAP = { cx: 540, cy: 1085, k: 15.6, ky: 25.5, lon0: -96, lat0: 38 }
const P = (lon, lat) => ({ x: MAP.cx + (lon - MAP.lon0) * MAP.k, y: MAP.cy + (MAP.lat0 - lat) * MAP.ky })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => P(lo, la))
const SEG = (() => { const a = [0]; for (let i = 1; i < OUTLINE.length; i++) a.push(a[i - 1] + Math.hypot(OUTLINE[i].x - OUTLINE[i - 1].x, OUTLINE[i].y - OUTLINE[i - 1].y)); return a })()
const HOU = P(-95.4, 29.8)
const HOU_C = { x: HOU.x, y: HOU.y - 34, size: 140 }
// candidates (the Texas/Gulf ones nudged out so the Houston star has room); lx/ly = label offset
const CITIES = [
  { n: 'NEW YORK', p: P(-74, 40.7), lx: 0, ly: -58 },
  { n: 'LA', p: P(-118.2, 34.05), lx: 0, ly: 58 },
  { n: 'CHICAGO', p: P(-87.6, 41.9), lx: 0, ly: -58 },
  { n: 'AUSTIN', p: { x: 412, y: 1296 }, lx: -50, ly: 58 },
  { n: 'MIAMI', p: P(-80.2, 25.8), lx: 0, ly: 56 },
  { n: 'ATLANTA', p: P(-84.4, 33.75), lx: 110, ly: 4 },
  { n: 'NASHVILLE', p: P(-86.9, 36.3), lx: 0, ly: -56 },
  { n: 'SEATTLE', p: P(-122.3, 47.6), lx: 34, ly: 58 },
  { n: 'DALLAS', p: { x: 468, y: 1150 }, lx: -118, ly: -10 },
  { n: 'NEW ORLEANS', p: { x: 690, y: 1300 }, lx: 54, ly: 58 },
]
const CITY_COL = [GOLD, PINK, BLUE, '#c9a6ff', MINT, '#ffb86b', PINK, BLUE, '#c9a6ff', MINT]
const LINE_ORDER = [8, 3, 9, 1, 2, 5, 7, 0, 6, 4]
CITIES.forEach(c => { c.lineAt = T.lines0 + LINE_ORDER.indexOf(CITIES.indexOf(c)) * T.lineGap })
CITIES.forEach(c => { c.popAt = c.lineAt + 0.3 })
// votes: every city gets the same number of sparks, in shuffled rounds → even waking, no winner
const VPC = 3
const VOTES = (() => {
  const r = rng(57), out = []
  for (let round = 0; round < VPC; round++) {
    const ord = CITIES.map((_, i) => i).sort(() => r() - 0.5)
    ord.forEach(ci => out.push({ ci, sx: 90 + r() * 900, bend: (r() - 0.5) * 500 }))
  }
  const n = out.length
  out.forEach((v, i) => { v.arrive = r3(lerp(T.votes[0], T.votes[1], i / (n - 1))); v.launch = r3(v.arrive - 0.62) })
  return out
})()
CITIES.forEach((c, i) => { c.hits = VOTES.filter(v => v.ci === i).map(v => v.arrive) })
const CHASE = (() => {
  const ring = [7, 1, 3, 8, 9, 4, 5, 6, 2, 0], out = []
  const n = ring.length * 2
  for (let i = 0; i < n; i++) out.push({ ci: ring[i % ring.length], t: r3(lerp(T.chase[0], T.chase[1], i / (n - 1))) })
  return out
})()
// rise targets in "into the sky": a loose double arc round the Houston star's spot
const SKY_SPOT = { x: 540, y: 930 }
const RISE = CITIES.map((c, i) => {
  const a = Math.PI + (i + 0.5) * Math.PI / 10, rr = i % 2 ? 300 : 400
  return { t0: T.rise + [3, 7, 1, 5, 9, 2, 6, 0, 4, 8][i] * 0.09, tx: SKY_SPOT.x + Math.cos(a) * rr * 1.05, ty: SKY_SPOT.y + 40 + Math.sin(a) * rr * 0.62 }
})
const wakeLevel = (c, t) => c.hits.filter(h => t >= h).length          // 0 asleep … 3 wide awake
const chaseCity = t => { let ci = -1; for (const s of CHASE) if (t >= s.t - 0.02) ci = s.ci; return t < T.chase[1] + 0.1 ? ci : -1 }

function houState(t) {
  if (t < T.drop + 0.4) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.lines0) return { mood: 'happy' }
  if (t < L2[0].t) {
    let ci = -1; for (const c of CITIES) if (t >= c.lineAt) ci = CITIES.indexOf(c)
    const c = ci >= 0 ? CITIES[ci] : null
    return { mood: 'sparkle', look: c ? [clamp((c.p.x - HOU.x) / 200, -1, 1), clamp((c.p.y - HOU.y) / 200, -1, 1)] : [0, -1] }
  }
  if (t < T.crickets[0]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.votes[0]) return { mood: 'squint', look: [0, 0] }
  if (t < L2[1].t) return { mood: 'wide', look: [clamp(Math.sin(t * 3), -1, 1), -1], blink: false }
  if (t < L2[2].t) return { mood: 'happy' }
  if (t < T.chase[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.flare) { const ci = chaseCity(t); const c = ci >= 0 ? CITIES[ci] : null; return { mood: 'wide', look: c ? [clamp((c.p.x - HOU.x) / 200, -1, 1), clamp((c.p.y - HOU.y) / 200, -1, 1)] : [0, 0], blink: false } }
  if (t < T.h6) return { mood: 'heart', look: [0, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "italic 500 170px 'EB Garamond'", "700 34px 'Space Mono'", "700 25px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Align starts | in *Houston.*', { top: 196, size: 124, weight: 800, accentSize: 180, at: T.h0, gap: 0.1, accentColor: GOLD, lastAt: T.drop, wobble: true })
  const H1 = popText(root, 'Then the stars | pick a | *second city.*', { top: 190, size: 108, weight: 800, accentSize: 160, at: T.h1, gap: 0.08, accentColor: PINK, lastAt: T.h1Last, wobble: true })
  const H2 = popText(root, 'Every vote | wakes a *star.*', { top: 196, size: 120, weight: 800, accentSize: 180, at: T.h2, gap: 0.09, accentColor: GOLD, lastAt: T.h2Last, wobble: true })
  const H5 = popText(root, 'Which city | lights up *next?*', { top: 196, size: 120, weight: 800, accentSize: 180, at: T.h5, gap: 0.08, accentColor: GOLD, lastAt: T.h5Last, wobble: true })
  const H6 = popText(root, 'Vote your city | into the *sky.*', { top: 196, size: 116, weight: 800, accentSize: 176, at: T.h6, gap: 0.08, accentColor: PINK, lastAt: T.h6Last, wobble: true })
  const TEXTS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H5, T.h5Out], [H6, T.out]]
  const boxes = [L1, L2, L5].map((L, i) => dialogueBox(root, { lines: L, y: BOX.y, width: 960, height: 280, close: BOX.close[i], cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function outlinePath(frac = 1) {
    const L = SEG[SEG.length - 1] * frac
    x.beginPath(); x.moveTo(OUTLINE[0].x, OUTLINE[0].y)
    for (let i = 1; i < OUTLINE.length; i++) {
      if (SEG[i] <= L) { x.lineTo(OUTLINE[i].x, OUTLINE[i].y); continue }
      const f = (L - SEG[i - 1]) / (SEG[i] - SEG[i - 1])
      x.lineTo(lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f))
      return { x: lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), y: lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f) }
    }
    x.closePath()
    return null
  }
  function drawMap(t, a) {
    if (a <= 0.004) return
    const dp = ease.inOutCubic(prog(t, ...T.draw))
    if (dp <= 0) return
    x.save(); x.globalAlpha = a
    const fk = ease.outCubic(prog(t, T.draw[1] - 0.25, T.draw[1] + 0.5))
    if (fk > 0) {
      x.save(); outlinePath(1)
      x.fillStyle = rgba('#3a2a7a', 0.42 * fk); x.fill(); x.clip()
      x.fillStyle = rgba(LAV, 0.16 * fk)
      for (let yy = 780; yy < 1430; yy += 24) for (let xx = 80 + ((yy / 24) % 2) * 12; xx < 1000; xx += 24) x.fillRect(xx - 2, yy - 2, 4, 4)
      x.restore()
    }
    const tip = outlinePath(dp)
    ink(x, LAV, { w: 6, fa: 0, glow: 18 })
    if (tip) { orb(x, tip.x, tip.y, 9, '#fff3e0', 1, 5); drawPixelStar(x, tip.x, tip.y, 30, 0, '#fff3e0') }
    x.restore()
  }
  // Houston: a faint dot while the map draws, then the burst on the drop (the star character draws separately)
  function drawHouston(t, a) {
    if (a <= 0.004) return
    x.save(); x.globalAlpha = a
    const pre = clamp((t - 0.6) * 2) * (t < T.drop ? 1 : 0)
    if (pre > 0) { const pr = 1 + 0.25 * Math.sin(t * 10); orb(x, HOU.x, HOU.y, 6 * pr, GOLD, pre * 0.8, 4) }
    if (t >= T.drop - 0.05) {
      const k = pop01(t, T.drop - 0.05, 0.5)
      x.save(); x.globalCompositeOperation = 'lighter'; x.translate(HOU_C.x, HOU_C.y); x.rotate(t * 0.3)
      for (let i = 0; i < 10; i++) {
        x.rotate(TAU / 10)
        const L = 200 * k * (i % 2 ? 0.7 : 1)
        const g = x.createLinearGradient(0, 0, 0, -L); g.addColorStop(0, rgba(GOLD, 0.22)); g.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = g; x.beginPath(); x.moveTo(-7, 0); x.lineTo(-22, -L); x.lineTo(22, -L); x.lineTo(7, 0); x.fill()
      }
      x.restore()
      for (const [d, col] of [[0, GOLD], [0.12, '#fff3e0']]) {
        const p = prog(t, T.drop + d, T.drop + d + 0.8)
        if (p > 0 && p < 1) { x.save(); x.globalAlpha = a * (1 - p); x.beginPath(); x.arc(HOU.x, HOU.y, 30 + 420 * ease.outCubic(p), 0, TAU); ink(x, col, { w: 8 * (1 - p) + 2, fa: 0, glow: 22 }); x.restore() }
      }
      orb(x, HOU.x, HOU.y, 12 * k, GOLD, 1, 5)
      sparkle(x, HOU_C.x, HOU_C.y, t, T.drop, { n: 16, R: 340, seed: 11, size: 34, dur: 0.9 })
    }
    x.restore()
  }
  function drawTag(t) {
    const k = pop01(t, T.tag, 0.4) * (1 - ease.inQuad(prog(t, ...T.tagOut)))
    if (k <= 0) return
    chip(x, HOU.x, HOU.y + 70, 'LAUNCH CITY #1', k, { size: 28, col: '#ffe6a8', edge: GOLD })
  }
  // the ten candidate stars: lines from Houston, then little sleeping stars that the votes wake up
  function drawCities(t, mapA) {
    for (const c of CITIES) {
      const p = ease.inOutQuad(prog(t, c.lineAt, c.lineAt + 0.34))
      if (p <= 0 || mapA <= 0.004) continue
      const ex = lerp(HOU.x, c.p.x, p), ey = lerp(HOU.y, c.p.y, p)
      x.save(); x.setLineDash([3, 13]); x.globalAlpha = mapA * 0.75
      x.beginPath(); x.moveTo(HOU.x, HOU.y); x.lineTo(ex, ey); ink(x, '#ffe2a0', { w: 4, fa: 0, glow: 10 })
      x.restore()
      if (p < 1) orb(x, ex, ey, 7, '#fff3e0', mapA, 4)
    }
    const outK = 1 - ease.inCubic(prog(t, ...T.out))
    CITIES.forEach((c, i) => {
      const k = pop01(t, c.popAt, 0.4) * outK
      if (k <= 0) return
      const lvl = wakeLevel(c, t)
      let ch = 0
      for (const s of CHASE) if (s.ci === i && t >= s.t) ch = Math.max(ch, Math.exp(-(t - s.t) * 7))
      const fl = t >= T.flare ? Math.exp(-(t - T.flare) * 2.2) : 0
      const R = RISE[i], rp = ease.inOutCubic(prog(t, R.t0, R.t0 + 1.25))
      const px = lerp(c.p.x, R.tx, rp), py = lerp(c.p.y, R.ty, rp) - Math.sin(Math.PI * rp) * 90
      if (rp > 0 && rp < 1) {
        x.save(); x.globalCompositeOperation = 'lighter'
        for (let j = 1; j <= 6; j++) { const q = Math.max(0, rp - j * 0.05), qx = lerp(c.p.x, R.tx, q), qy = lerp(c.p.y, R.ty, q) - Math.sin(Math.PI * q) * 90; x.globalAlpha = 0.25 * (1 - j / 7); orb(x, qx, qy, 14 * (1 - j / 8), PINK, 1, 2.5) }
        x.restore()
      }
      const bright = 0.25 + 0.25 * lvl + 0.6 * ch + 0.6 * fl
      orb(x, px, py, 8 + 4 * lvl, ch > 0.3 || fl > 0.2 ? GOLD : '#d9e4ff', clamp(k) * Math.min(1, bright), 4 + 2 * lvl)
      // the face: asleep → groggy → awake → happy (then wide during the chase, sparkly in the sky)
      let mood = ['sleepy', 'squint', 'neutral', 'happy'][lvl]
      if (t >= T.chase[0] && t < T.flare) mood = ch > 0.4 ? 'wide' : 'happy'
      if (t >= T.flare) mood = rp > 0 && rp < 1 ? 'wide' : t > T.heart ? 'sparkle' : 'happy'
      const hit = c.hits.reduce((m, h) => t >= h && t < h + 0.6 ? Math.max(m, Math.exp(-(t - h) * 8) * Math.cos((t - h) * 22)) : m, 0)
      const size = (96 + 12 * ch + 10 * fl + 10 * ease.outCubic(rp)) * (0.75 + 0.25 * Math.min(1, (lvl + 1) / 2))
      drawStarChar(x, px, py, size, t, { color: CITY_COL[i], mood, look: [clamp((HOU.x - c.p.x) / 300, -1, 1) * (lvl > 1 ? 1 : 0), 0], pop: k, seed: 40 + i, alpha: clamp(0.45 + 0.2 * lvl + ch + fl + rp), squash: 0.25 * hit, tips: false, glow: 0.4 + 0.3 * lvl + ch + fl })
      const lk = pop01(t, c.popAt + 0.06, 0.36) * (1 - ease.inQuad(prog(t, R.t0, R.t0 + 0.35))) * mapA
      if (lk > 0) chip(x, c.p.x + c.lx, c.p.y + c.ly, c.n, lk, { size: 24, col: BONE, edge: ch > 0.3 || fl > 0.2 ? GOLD : LAV })
      sparkle(x, c.p.x, c.p.y, t, c.popAt, { n: 6, R: 70, seed: 20 + i, size: 18, dur: 0.5 })
      for (const h of c.hits) sparkle(x, c.p.x, c.p.y, t, h, { n: 5, R: 60, seed: 100 + i + Math.round(h * 10), size: 16, dur: 0.45 })
      sparkle(x, px, py, t, T.flare, { n: 7, R: 90, seed: 140 + i, size: 20, dur: 0.6 })
    })
  }
  function drawVotes(t) {
    if (t < T.votes[0] - 0.7 || t > T.votes[1] + 0.1) return
    for (const v of VOTES) {
      const p = prog(t, v.launch, v.arrive)
      if (p <= 0 || p >= 1) continue
      const c = CITIES[v.ci].p, q = ease.inOutQuad(p)
      const sx = v.sx, sy = H + 30
      const cx = (sx + c.x) / 2 + v.bend, cy = (sy + c.y) / 2
      const pt = qq => [(1 - qq) * (1 - qq) * sx + 2 * (1 - qq) * qq * cx + qq * qq * c.x, (1 - qq) * (1 - qq) * sy + 2 * (1 - qq) * qq * cy + qq * qq * c.y]
      x.save(); x.globalCompositeOperation = 'lighter'
      for (let j = 1; j <= 5; j++) { const [tx, ty] = pt(Math.max(0, q - j * 0.035)); x.globalAlpha = 0.35 * (1 - j / 6); x.fillStyle = j % 2 ? GOLD : PINK; x.fillRect(tx - 4, ty - 4, 8, 8) }
      x.restore()
      const [bx, by] = pt(q)
      drawPixelStar(x, bx, by, 22, (v.ci + 1) % 3, v.ci % 2 ? '#ffd98a' : '#ffc2d8')
    }
  }
  // crickets: tiny "…" notes while nobody answers
  function drawCrickets(t) {
    if (t < T.crickets[0] || t > T.crickets[1] + 0.3) return
    for (let i = 0; i < 3; i++) {
      const s0 = T.crickets[0] + i * 0.22, d = t - s0
      if (d < 0 || d > 0.9) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * d / 0.9)
      x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = BONE
      x.fillText('chirp', [230, 850, 540][i], [720, 750, 1520][i] - d * 40)
      x.restore()
    }
  }
  // THE HOUSTON STAR
  function houston(t) {
    if (t < T.drop - 0.05) return
    const st = houState(t)
    const k = easeOutBack(prog(t, T.drop - 0.05, T.drop + 0.4), 2.6) * (1 - ease.inCubic(prog(t, ...T.out)))
    if (k <= 0) return
    const rp = ease.inOutCubic(prog(t, ...T.houRise))
    const cx = lerp(HOU_C.x, SKY_SPOT.x, rp), cy = lerp(HOU_C.y, SKY_SPOT.y, rp) - Math.sin(Math.PI * rp) * 120
    const size = lerp(HOU_C.size, 200, rp)
    let sq = 0
    const sd = t - T.drop
    if (sd > 0 && sd < 0.7) sq += 0.3 * Math.exp(-sd * 7) * Math.cos(sd * 22)
    const fl = t - T.flare
    if (fl > 0 && fl < 0.7) sq += -0.2 * Math.exp(-fl * 6) * Math.cos(fl * 20)
    if (rp > 0 && rp < 1) sq += -0.1
    drawStarChar(x, cx, cy, size, t, { color: STAR.sky, ...st, squash: sq, pop: k, hops: HOPS, seed: 5, glow: 1.2 })
    if (t > T.heart) sparkle(x, cx, cy, t, T.heart, { n: 12, R: 220, seed: 77, size: 26, dur: 0.8 })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.05) {
        const mapA = 1 - ease.inOutQuad(prog(t, ...T.fade))
        drawMap(t, mapA); drawHouston(t, mapA); drawTag(t)
        drawCities(t, mapA); drawVotes(t); drawCrickets(t); houston(t)
      }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [h, o] of TEXTS) h.update(t, 1 - ease.inQuad(prog(t, ...o)))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts, each where one headline clears and the next pops in:
//   5.35 hook → "Then the stars…" · 11.05 "second city" → "Every vote wakes a star." · 15.7 → "Which city…" · 19.45 → "Vote your city…"
// cardfx keeps two for a 30 s film (11.05 and 19.45).
const CUTS = [5.35, { t: 11.05, kind: 'deal' }, 15.7, { t: 19.45, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (pitched in D, re-keyed by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const pan = px => +((px - 540) / 600).toFixed(2)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.h0, 3, 0.1, 0, 0.03),
  ['glitter', 0.2, 2.5], ['whoosh', 0.2, 2.3, 0.03],
  ['riser', r3(T.drop - 0.8), T.drop, 0.05], ['boom', T.drop, 0.11], ['bell', T.drop, 880, 0.05, 2.4, 0], ['bell', r3(T.drop + 0.06), 1318.51, 0.04, 2.2, 0.15],
  ['pop', r3(T.drop + 0.05), 1174.66, 0.05, 0],
  ['tick', T.tag, 0.05], ['pop', T.tag, 1318.51, 0.04, 0],
  // the lines reach out to ten sleeping cities
  ['whoosh', 5.25, 0.6, 0.04],
  ...wordPops(T.h1, 5, 0.08, 1, 0.026), ['pop', T.h1Last, 880, 0.05, 0],
  ...CITIES.map(c => ['tick', r3(c.lineAt + 0.05), 0.03]),
  ...CITIES.map((c, i) => ['pop', r3(c.popAt), NOTE[LINE_ORDER.indexOf(i) % 7] * (LINE_ORDER.indexOf(i) > 6 ? 2 : 1), 0.03, pan(c.p.x)]),
  // crickets (chiptune chirps)
  ...[0, 1, 2].flatMap(i => [['pop', r3(T.crickets[0] + i * 0.22), 2349.32, 0.014, [-0.5, 0.5, 0][i]], ['pop', r3(T.crickets[0] + i * 0.22 + 0.06), 2349.32, 0.012, [-0.5, 0.5, 0][i]]]),
  // every vote wakes a star
  ['riser', 10.9, 11.4, 0.03],
  ...wordPops(T.h2, 4, 0.09, 2, 0.026), ['pop', T.h2Last, 1318.51, 0.055, 0], ['bell', r3(T.h2Last + 0.03), 1760, 0.03, 1.2, 0],
  ['glitter', r3(T.votes[0] - 0.3), T.votes[1]],
  ...VOTES.map((v, i) => ['pop', v.arrive, NOTE[i % 7] * 2, 0.015, pan(CITIES[v.ci].p.x)]),
  // which city lights up next
  ...wordPops(T.h5, 4, 0.08, 0, 0.026), ['pop', T.h5Last, 1174.66, 0.055, 0],
  ...CHASE.map(s => ['tick', s.t, 0.022]),
  ['riser', r3(T.chase[0] + 0.3), T.flare, 0.04],
  ['boom', T.flare, 0.06], ['bell', T.flare, 1174.66, 0.05, 2.0, -0.2], ['bell', r3(T.flare + 0.07), 1479.98, 0.04, 2.0, 0.2], ['glitter', T.flare, r3(T.flare + 0.9)],
  // into the sky
  ...wordPops(T.h6, 5, 0.08, 2, 0.026), ['pop', T.h6Last, 1318.51, 0.055, 0], ['bell', r3(T.h6Last + 0.03), 1760, 0.035, 1.4, 0],
  ['whoosh', T.rise, 1.6, 0.045], ['glitter', T.rise, 23.2],
  ...RISE.map((R, i) => ['pop', r3(R.t0 + 1.2), NOTE[(i * 3) % 7] * 2, 0.015, pan(R.tx)]),
  ['whoosh', T.houRise[0], 0.8, 0.035], ['pop', T.houRise[1], 880, 0.045, 0],
  ['pluck', T.heart, 1318.51, 0.04, 0.6, 0], ['glitter', T.heart, r3(T.heart + 0.8)],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
