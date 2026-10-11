import { clamp, lerp, prog, ease, rng } from '../lib.js'
import { W, H } from './common.js'

// ──────────────────────────────────────── global stardust layer (drawn by main.js on #fx, under the transitions)
// Pure function of t. Per-scene star fields cross-fade at scene boundaries; transitions paint over them.
// Hero moments (for sound):
//   shooting stars   S1 1.00–1.55 · small ones S2 4.25–4.65, S4 11.70–12.15, S5 15.90–16.30, S6 19.70–20.15 · end card 28.80–29.30
//   sparkle bursts   8.36 aura-cam resolve · 21.85 ALIGNED stamp · 24.30 match phone lands ·
//                    27.40–27.82 chakra lights (one twin-sparkle per chakra, 0.07 apart, bottom→top)
//   whole layer fades with the end 29.50–29.85.

// 7×7 pixel-art sprites, identical to the stair-wipe stars in s1-imagine.js (X = body, C = bright centre)
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],   // 0 big 4-point sparkle
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],   // 1 medium plus
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],   // 2 tiny twinkle
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],   // 3 diagonal glint
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))

/** sprite centred on (cx, cy), px = size of one art pixel; integer coords only */
function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) {
    ctx.fillStyle = c ? centre : color
    ctx.fillRect(x0 + x * px, y0 + y * px, px, px)
  }
}

const BONE = '#efe6d6', GOLD = '#f2c75c', VIOLET = '#c9a6ff', ROSE = '#ff8fb1', HOT = '#fff3e0'

// keep-out rects [x, y, w, h, (t0, t1)] — stars fade to 0 inside and within `soft` px of them
const PROFILES = [
  { // S1 · space
    a: 0, b: 3.56, fin: 0.35, fout: 0.01, seed: 11, sprites: 26, dots: 80, px: [3, 4], drift: [-14, -3],
    pal: [BONE, BONE, GOLD, VIOLET, ROSE], centre: HOT, dot: '255,247,236', alpha: 1,
    keep: [[220, 450, 1480, 190]],
  },
  { // S2 · rose space "{ in your stars }" / "{ intro▣ducing }" — sparse, edges
    a: 3.55, b: 6.9, fin: 0.4, fout: 0.25, seed: 23, sprites: 20, dots: 60, px: [3, 4], drift: [-10, -2], edge: true,
    pal: [BONE, BONE, GOLD, VIOLET, ROSE], centre: HOT, dot: '255,247,236', alpha: 0.95,
    keep: [[400, 230, 1120, 620]],
  },
  { // S3 · mystery card / thermal → real → gilded card
    a: 6.86, b: 10.02, fin: 0.45, fout: 0.15, seed: 37, sprites: 20, dots: 60, px: [3, 4], drift: [-8, -5], edge: true,
    pal: [BONE, GOLD, BONE, VIOLET], centre: HOT, dot: '255,247,236', alpha: 0.95,
    keep: [[560, 0, 800, 840, 6.8, 9.0], [420, 830, 1080, 170, 6.8, 9.0], [660, 40, 600, 1000, 8.9, 10.1]],
  },
  { // S4 · halftone aura sky, giant Align, zoomed pill typing
    a: 9.95, b: 14.12, fin: 0.4, fout: 0.2, seed: 41, sprites: 28, dots: 90, px: [3, 4], drift: [-18, -4],
    pal: [BONE, BONE, GOLD, VIOLET, ROSE], centre: HOT, dot: '255,247,236', alpha: 1,
    keep: [[0, 320, 1920, 440, 10.2, 13.25], [260, 170, 1400, 760, 13.1, 14.2]],
  },
  { // S5 · teal space "Reading your sky"
    a: 14.3, b: 17.35, fin: 0.5, fout: 0.25, seed: 53, sprites: 18, dots: 55, px: [3, 4], drift: [-9, 2], edge: true,
    pal: [BONE, BONE, GOLD, VIOLET, ROSE], centre: HOT, dot: '255,247,236', alpha: 0.95,
    keep: [[220, 200, 1540, 660]],
  },
  { // S6 · amber space deck / "every night a new deck" / "you ▣ align"
    a: 17.5, b: 22.6, fin: 0.5, fout: 0.3, seed: 67, sprites: 20, dots: 60, px: [3, 4], drift: [-12, -3], edge: true,
    pal: [BONE, BONE, GOLD, VIOLET, ROSE], centre: HOT, dot: '255,247,236', alpha: 0.95,
    keep: [[240, 150, 1640, 780]],
  },
  { // S7 · aurora space, tagline (+ people constellation 22.66–24.45) → match phone + caption A → chat phone + caption B
    a: 22.5, b: 26.94, fin: 0.5, fout: 0.01, seed: 79, sprites: 16, dots: 50, px: [3, 4], drift: [8, -6], edge: true,
    pal: ['#ffffff', BONE, '#ffe6a0', GOLD, VIOLET], centre: '#ffffff', dot: '255,250,240', alpha: 0.95,
    keep: [
      [380, 400, 1160, 260, 22.5, 24.3],                                   // tagline in ticks
      [440, 60, 510, 1000, 24.2, 25.9], [960, 400, 680, 280, 24.2, 25.65],  // match phone · "It's mutual / You both aligned."
      [1030, 60, 500, 1000, 25.45, 27], [220, 400, 840, 280, 25.55, 27],    // chat phone · "Then you talk in cards."
    ],
  },
  { // S8 · end card
    a: 26.94, b: 30, fin: 0.45, fout: 0.01, seed: 89, sprites: 16, dots: 45, px: [3, 4], drift: [-10, -3],
    pal: [BONE, BONE, GOLD, VIOLET, BONE], centre: HOT, dot: '255,247,236', alpha: 1,
    keep: [[540, 210, 840, 710]],   // lockup: mark + wordmark + sub-line
  },
]

const PAD = 60
const inRect = (x, y, r, m = 0) => x > r[0] - m && x < r[0] + r[2] + m && y > r[1] - m && y < r[1] + r[3] + m
/** 0 inside a rect, ramps to 1 at `soft` px outside */
function keepFade(x, y, keep, t, soft) {
  let f = 1
  for (const r of keep) {
    if (r.length > 4 && (t < r[4] || t >= r[5])) continue
    const dx = Math.max(r[0] - x, 0, x - (r[0] + r[2])), dy = Math.max(r[1] - y, 0, y - (r[1] + r[3]))
    f = Math.min(f, clamp(Math.hypot(dx, dy) / soft))
  }
  return f
}

// precompute star constants per profile (deterministic)
for (const P of PROFILES) {
  const fixed = P.keep.filter(r => r.length === 4)
  const pick = (r, edge) => {
    let x, y
    for (let k = 0; k < 24; k++) {
      x = r() * (W + 2 * PAD) - PAD; y = r() * H
      if (edge && fixed.some(q => inRect(x, y, q, 30))) continue
      break
    }
    return [x, y]
  }
  const r = rng(P.seed * 7919)
  P.S = Array.from({ length: P.sprites }, (_, i) => {
    const [x, y] = pick(r, true)
    const z = 0.35 + r() * 0.65
    return {
      x, y, z, px: z > 0.88 ? P.px[1] + 1 : z > 0.65 ? P.px[1] : P.px[0],
      kind: [1, 2, 2, 3, 1, 0][Math.floor(r() * 6)],
      col: P.pal[Math.floor(r() * P.pal.length)],
      ph: r() * 6.283, w: 1.6 + r() * 2.4, flashP: 2.2 + r() * 3, flashO: r() * 5, wob: r() * 6.283,
    }
  })
  P.D = Array.from({ length: P.dots }, () => {
    const [x, y] = pick(r, P.edge)
    const z = 0.15 + r() * 0.6
    return { x, y, z, rad: 0.6 + r() * 1.3, a: 0.25 + r() * 0.6, ph: r() * 6.283, w: 1 + r() * 3 }
  })
}

const wrapX = x => ((x + PAD) % (W + 2 * PAD) + (W + 2 * PAD)) % (W + 2 * PAD) - PAD
const wrapY = y => ((y + PAD) % (H + 2 * PAD) + (H + 2 * PAD)) % (H + 2 * PAD) - PAD

function drawField(ctx, P, t, wgt) {
  const f = Math.round(t * 30), tq = f / 30
  const lt = tq - P.a
  const soft = P.edge ? 90 : 70
  // soft dot stars (behind sprites)
  for (const d of P.D) {
    const x = wrapX(d.x + P.drift[0] * d.z * lt), y = wrapY(d.y + P.drift[1] * d.z * lt)
    const k = keepFade(x, y, P.keep, t, soft)
    if (k <= 0) continue
    const tw = 0.55 + 0.45 * Math.sin(tq * d.w + d.ph)
    const a = wgt * k * d.a * tw * (P.dotAlpha ?? 1)
    if (a < 0.02) continue
    ctx.fillStyle = `rgba(${P.dot},${(a * 0.22).toFixed(3)})`
    ctx.beginPath(); ctx.arc(x, y, d.rad * 2.6, 0, 6.2832); ctx.fill()
    ctx.fillStyle = `rgba(${P.dot},${a.toFixed(3)})`
    ctx.beginPath(); ctx.arc(x, y, d.rad, 0, 6.2832); ctx.fill()
  }
  // pixel sprites
  for (const s of P.S) {
    const x = wrapX(s.x + P.drift[0] * s.z * lt + Math.sin(tq * 0.6 + s.wob) * 4 * s.z)
    const y = wrapY(s.y + P.drift[1] * s.z * lt + Math.cos(tq * 0.5 + s.wob) * 3 * s.z)
    const k = keepFade(x, y, P.keep, t, soft)
    if (k <= 0) continue
    const tw = 0.5 + 0.5 * Math.sin(tq * s.w + s.ph)
    // occasional flash: a short window where the star blooms into the big sparkle, blinking every 2 frames
    const fp = ((tq + s.flashO) % s.flashP) / s.flashP
    const flashing = fp < 0.07
    let kind = s.kind
    if (flashing) kind = ((f >> 1) & 1) ? 0 : 3
    else if (tw < 0.22) kind = 2
    const a = wgt * k * P.alpha * (flashing ? 1 : 0.45 + 0.55 * tw)
    if (a < 0.03) continue
    ctx.globalAlpha = a
    if (P.shadow) sprite(ctx, x + s.px, y + s.px, s.px, kind, P.shadow, P.shadow)
    sprite(ctx, x, y, s.px, kind, s.col, P.centre)
  }
  ctx.globalAlpha = 1
}

// ── hero bursts: sparkles fly out from a ring and step down big → glint → tiny
const BURSTS = [
  { t: 8.36, x: 960, y: 400, r0: 380, r1: 760, n: 18, px: 5, life: 0.95, pal: [BONE, GOLD, VIOLET, ROSE], centre: HOT, sy: 0.62, seed: 3 },
  { t: 21.85, x: 1230, y: 395, r0: 60, r1: 250, n: 12, px: 4, life: 0.75, pal: [GOLD, BONE, VIOLET, ROSE], centre: HOT, sy: 0.42, seed: 5 },
  { t: 24.3, x: 690, y: 560, r0: 390, r1: 520, n: 16, px: 4, life: 0.85, pal: ['#ffffff', '#ffe6a0', '#ffffff', BONE], centre: '#ffffff', sx: 0.62, sy: 1.08, avoid: [960, 430, 700, 220], seed: 7 },
]
function drawBurst(ctx, B, t) {
  const r = rng(B.seed * 104729)
  const f = Math.round(t * 30)
  for (let i = 0; i < B.n; i++) {
    const ang = (i / B.n) * 6.2832 + r() * 0.35, delay = r() * 0.12, rr = r(), col = B.pal[Math.floor(r() * B.pal.length)]
    const lp = (t - B.t - delay) / B.life
    if (lp <= 0 || lp >= 1) continue
    const rad = lerp(B.r0, B.r1 * (0.8 + 0.3 * rr), ease.outCubic(lp))
    const x = B.x + Math.cos(ang) * rad * (B.sx ?? 1), y = B.y + Math.sin(ang) * rad * B.sy
    if (B.avoid && inRect(x, y, B.avoid)) continue
    const kind = lp < 0.3 ? 0 : lp < 0.6 ? (((f + i) >> 1) & 1 ? 3 : 1) : 2
    ctx.globalAlpha = lp < 0.08 ? lp / 0.08 : 1 - ease.inQuad(prog(lp, 0.55, 1))
    const bp = rr > 0.5 ? B.px : B.px - 1
    if (B.shadow) sprite(ctx, x + bp, y + bp, bp, kind, B.shadow, B.shadow)
    sprite(ctx, x, y, bp, kind, col, B.centre)
  }
  ctx.globalAlpha = 1
}

// chakra lights 27.40 + i*0.07: twin sparkles beside each chakra dot (S8 mark centre 960,410; dot y = 410 + (31.8 - i*10.6)*3.864)
function drawChakra(ctx, t) {
  const f = Math.round(t * 30)
  const CH = ['#ff6b74', '#ffa25e', '#ffd23f', '#8be37f', '#6fdcf0', '#8ea6ff', '#c98cff']
  for (let i = 0; i < 7; i++) {
    const lp = (t - (27.4 + i * 0.07)) / 0.55
    if (lp <= 0 || lp >= 1) continue
    const cy = 410 + (31.8 - i * 10.6) * 3.864
    for (const side of [-1, 1]) {
      const r = rng(i * 31 + (side + 2) * 7)
      const dx = side * lerp(40, 120 + r() * 50, ease.outCubic(lp)), dy = lerp(0, (r() - 0.5) * 50, lp)
      const kind = lp < 0.35 ? (((f + i) >> 1) & 1 ? 0 : 1) : lp < 0.65 ? 3 : 2
      ctx.globalAlpha = lp < 0.1 ? lp / 0.1 : 1 - ease.inQuad(prog(lp, 0.5, 1))
      sprite(ctx, 960 + dx, cy + dy, side > 0 ? 4 : 3, kind, CH[i], HOT)
    }
  }
  ctx.globalAlpha = 1
}

// ── shooting stars: gradient streak with a pixel-sparkle head and a few dropping pixel crumbs
const SHOOTS = [
  { t0: 1.0, t1: 1.55, x0: 260, y0: 70, x1: 1420, y1: 360, len: 320, px: 4, rgb: '255,243,224', col: BONE, seed: 2 },
  { t0: 4.25, t1: 4.65, x0: 120, y0: 60, x1: 640, y1: 210, len: 200, px: 3, rgb: '255,243,224', col: BONE, seed: 8 },
  { t0: 11.7, t1: 12.15, x0: 1700, y0: 60, x1: 1120, y1: 260, len: 200, px: 3, rgb: '255,243,224', col: GOLD, seed: 4 },
  { t0: 15.9, t1: 16.3, x0: 1880, y0: 40, x1: 1380, y1: 160, len: 200, px: 3, rgb: '255,243,224', col: GOLD, seed: 10 },
  { t0: 19.7, t1: 20.15, x0: 260, y0: 960, x1: 900, y1: 1040, len: 220, px: 3, rgb: '255,243,224', col: BONE, seed: 12 },
  { t0: 28.8, t1: 29.3, x0: 1900, y0: 40, x1: 1400, y1: 190, len: 240, px: 4, rgb: '255,243,224', col: GOLD, seed: 6 },
]
function drawShoot(ctx, S, t) {
  const p = prog(t, S.t0, S.t1)
  if (p <= 0 || p >= 1) return
  const e = ease.inOutQuad(p)
  const hx = lerp(S.x0, S.x1, e), hy = lerp(S.y0, S.y1, e)
  const dx = S.x1 - S.x0, dy = S.y1 - S.y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
  const len = S.len * Math.sin(Math.PI * Math.min(1, p * 1.15))   // tail grows then shrinks
  const env = Math.min(1, p / 0.12) * (1 - ease.inQuad(prog(p, 0.75, 1)))
  const tx = hx - ux * len, ty = hy - uy * len
  const g = ctx.createLinearGradient(tx, ty, hx, hy)
  g.addColorStop(0, `rgba(${S.rgb},0)`); g.addColorStop(1, `rgba(${S.rgb},${(0.9 * env).toFixed(3)})`)
  ctx.strokeStyle = g; ctx.lineCap = 'round'
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke()
  ctx.lineWidth = 7; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(hx - ux * len * 0.4, hy - uy * len * 0.4); ctx.lineTo(hx, hy); ctx.stroke()
  // pixel crumbs left behind the head
  const r = rng(S.seed * 7717), f = Math.round(t * 30)
  for (let k = 0; k < 7; k++) {
    const q = r(), off = (r() - 0.5) * 14
    const pk = e - (0.04 + q * 0.18)
    if (pk <= 0) continue
    const cx = lerp(S.x0, S.x1, pk) - uy * off, cy = lerp(S.y0, S.y1, pk) + ux * off + (e - pk) * 60
    ctx.globalAlpha = env * (1 - (e - pk) / 0.22)
    if (ctx.globalAlpha <= 0) continue
    sprite(ctx, cx, cy, S.px - 1, 2, S.col, HOT)
  }
  ctx.globalAlpha = env
  sprite(ctx, hx, hy, S.px, (f >> 1) & 1 ? 0 : 1, S.col, HOT)
  ctx.globalAlpha = 1
}

const weightOf = (P, t) => {
  const fin = P.a === 0 ? 1 : ease.inOutQuad(prog(t, P.a, P.a + P.fin))
  const fout = 1 - ease.inOutQuad(prog(t, P.b - P.fout, P.b))
  return Math.min(fin, fout)
}

export function fxStardust(ctx, t) {
  const end = 1 - ease.inOutQuad(prog(t, 29.5, 29.85))
  if (end <= 0) return
  ctx.save()
  ctx.imageSmoothingEnabled = false
  for (const P of PROFILES) {
    if (t < P.a || t >= P.b) continue
    const w = weightOf(P, t) * end
    if (w > 0.005) drawField(ctx, P, t, w)
  }
  ctx.globalAlpha = 1
  for (const B of BURSTS) if (t > B.t && t < B.t + B.life + 0.15) drawBurst(ctx, B, t)
  if (t > 27.4 && t < 28.4) drawChakra(ctx, t)
  for (const S of SHOOTS) drawShoot(ctx, S, t)
  ctx.restore()
}
