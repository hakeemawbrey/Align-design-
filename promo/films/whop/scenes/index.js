// whop · Align Houston Beta, product-page film (22.5s, 16:9 or 9:16 with &v)
//   0.0–5.2   intro: pixel stars swirl in, the seven chakra stars line up, rings burst, the Align mark draws in,
//             "Align" + HOUSTON BETA
//   5.0–9.6   shot 1 · Juniper's mystery card turning slowly in 3D · "Card first. Face last."
//   9.4–14.0  shot 2 · three talk cards drifting at different depths · "Then you talk in cards."
//  13.8–18.8  shot 3 · two cards flip in slow motion to reveal both photos · "Both align. Then you see them."
//  18.6–22.5  end: mark + wordmark, HOUSTON BETA · NOW OPEN, "Dating, dealt by the stars." → black
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT, A, SERIF, MONO, fill, img, spaceBackdrop } from '../../../src/scenes/common.js'

export const DURATION = 22.5
const BONE = '#efe6d6'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const U = Math.min(W, H) / 1080                       // layout unit: 1 at 1080 on the short side
const T = { s1: 5.0, s2: 9.4, s3: 13.8, end: 18.6 }   // shot starts
const X = 0.5                                          // crossfade length

// ── card geometry (measured in the PNGs: body box inside the glow padding) ──
const G = {
  mystery: { src: 'card-profile-3.png', iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 },
  talk2: { src: 'card-talk-2.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  talk3: { src: 'card-talk-3.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  talk4: { src: 'card-talk-4.png', iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 },
  back: { src: 'card-match-back.png', iw: 1152, ih: 1548, b: [84, 84, 1068, 1461], r: 0.08 },
  me: { src: 'card-match-me.png', iw: 1152, ih: 1548, b: [84, 84, 1068, 1461], r: 0.08 },
  them: { src: 'card-match-them.png', iw: 1152, ih: 1548, b: [84, 84, 1068, 1461], r: 0.08 },
}
const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

/** one card face clipped to its body, `w` px wide; returns { face, glint } (glint = a light band to sweep) */
function face(parent, g, w, style = {}) {
  const bw = g.b[2] - g.b[0], k = w / bw, h = bodyH(g, w), rad = g.r * w
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: rad + 'px', overflow: 'hidden', ...style }, parent)
  img(f, A + g.src, { left: -g.b[0] * k + 'px', top: -g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' })
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, glint, w, h }
}
/** a standalone 3D card: a holder (position it), a body you rotate in 3D, a soft shadow */
function card3d(parent, g, w) {
  const h = bodyH(g, w)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', perspective: (2600 * U) + 'px' }, parent)
  const shadow = el('div', { position: 'absolute', left: '8%', right: '8%', top: '92%', height: '14%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(4,2,14,0.65), rgba(4,2,14,0))', filter: `blur(${18 * U}px)` }, holder)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d', willChange: 'transform' }, holder)
  const glow = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: `0 0 ${60 * U}px ${8 * U}px rgba(214,170,255,0.30), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)` }, body)
  const f = face(body, g, w)
  return { holder, body, shadow, glow, ...f }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }

// ── pixel stars (the beta website's "stars aligned" moment, same sprites and 15fps stepping) ──
const PIX = VERT ? 7 : 6
const PA = { t0: 0.55, first: 1.05, step: 0.07, beam: 1.54, rings: 1.6, end: 3.4, fps: 15 }
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '...XWX...', '..X.W.X..', 'XXWWWWWXX', '..X.W.X..', '...XWX...', '....X....', '....X....'],
].map((rows) => rows.map((r) => [...r]))
function pstar(ctx, x, y, size, color) {
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#ffffff' : color; ctx.fillRect(cx + c - o, cy + r - o, 1, 1) }
}
function pring(ctx, x, y, rad, color) {
  const n = Math.max(12, Math.round(rad * 2.2)); ctx.fillStyle = color
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ctx.fillRect(Math.round(x + Math.cos(a) * rad), Math.round(y + Math.sin(a) * rad * 0.86), 1, 1) }
}
const MARK_CY = VERT ? 760 : 430                      // the mark's centre (screen px); the column lines up on it
const MARK_S = (VERT ? 520 : 420) / 88                // mark scale: its 88-unit viewBox → px
const pset = (() => {
  const r = rng(29), cx = W / 2 / PIX, cy = MARK_CY / PIX
  const gap = 10.6 * MARK_S / PIX                     // chakra spacing = the mark's own dot spacing
  const seven = CHAKRAS.map((c, i) => ({ x: cx, y: cy + (3 - i) * gap, c, at: PA.first + i * PA.step }))
  const rx = (VERT ? 520 : 760) / PIX, ry = (VERT ? 760 : 460) / PIX
  return {
    cx, cy, gap, seven, rx, ry,
    swirl: Array.from({ length: 42 }, (_, i) => ({ a: r() * Math.PI * 2, d: 0.55 + r() * 0.45, spin: (r() < 0.5 ? -1 : 1) * (1.6 + r() * 1.4), slot: seven[i % 7], c: SPARKS[i % 5], born: r() * 0.4, ph: Math.floor(r() * 4) })),
    debris: seven.flatMap((s) => Array.from({ length: 10 }, () => { const a = r() * Math.PI * 2, v = 50 + r() * 80; return { x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 14, c: r() < 0.3 ? '#fff4cf' : s.c, life: 0.9 + r() * 0.9 } })),
    twinkles: Array.from({ length: 22 }, () => ({ x: cx + (r() - 0.5) * rx * 2.2, y: cy + (r() - 0.5) * ry * 2, c: SPARKS[Math.floor(r() * 5)], ph: Math.floor(r() * 6), at: 0.2 + r() * 1.2 })),
  }
})()
function drawPixels(ctx, time) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const local = time - PA.t0
  if (local < 0 || local >= PA.end) return false
  const f = Math.floor(local * PA.fps), t = f / PA.fps
  const { cx, cy, gap, seven, swirl, debris, twinkles, rx, ry } = pset
  if (t < PA.rings) {
    for (const s of swirl) {
      if (t < s.born || t >= s.slot.at) continue
      const p = clamp((t - s.born) / (s.slot.at - s.born)) ** 2.4, a = s.a + s.spin * p * Math.PI
      pstar(ctx, s.slot.x + Math.cos(a) * rx * s.d * (1 - p), s.slot.y + Math.sin(a) * ry * s.d * (1 - p), p > 0.7 ? 2 : [1, 2, 3, 2][(f + s.ph) % 4], p > 0.55 ? s.slot.c : s.c)
    }
    for (const s of seven) {
      if (t < s.at) continue
      const since = t - s.at
      pstar(ctx, s.x, s.y, since < 0.07 ? 4 : 3, s.c)
      if (since < 0.2) { const k = 6 + Math.round(since * 60); ctx.fillStyle = s.c; ctx.fillRect(s.x - k, s.y, 2, 1); ctx.fillRect(s.x + k - 1, s.y, 2, 1) }
    }
    if (t >= PA.beam) {
      const top = seven[6].y - gap * 0.9, bot = seven[0].y + gap * 0.9, even = f % 2 === 0
      ctx.fillStyle = even ? '#ffffff' : '#fff4cf'; ctx.fillRect(Math.round(cx), Math.round(top), 1, Math.round(bot - top))
      for (const s of seven) pstar(ctx, s.x, s.y, 4, s.c)
    }
  } else {
    const tb = t - PA.rings, k = rx / 110
    if (tb < 0.6) { pring(ctx, cx, cy, (8 + tb * 230) * k, tb < 0.3 ? '#fff4cf' : '#f2c75c'); if (tb > 0.08) pring(ctx, cx, cy, (4 + (tb - 0.08) * 170) * k, '#ffbdf6') }
    for (const d of debris) {
      const life = 1 - tb / d.life
      if (life <= 0 || (life < 0.25 && f % 2)) continue
      const x = d.x + d.vx * k * tb, y = d.y + (d.vy * tb + 26 * tb * tb) * k
      ctx.fillStyle = d.c
      for (let j = 1; j <= 3; j++) ctx.fillRect(Math.round(x - d.vx * k * 0.022 * j), Math.round(y - (d.vy + 52 * tb) * k * 0.022 * j), 1, 1)
      pstar(ctx, x, y, life > 0.7 ? 3 : life > 0.4 ? 2 : 1, d.c)
    }
    for (const s of twinkles) { if (tb < s.at || (tb > 1.6 && f % 2)) continue; pstar(ctx, s.x, s.y, [0, 1, 2, 3, 2, 1][(f + s.ph) % 6], s.c) }
  }
  return true
}
/** a few pixel twinkles that pop around a box (screen px) during [t0, t1] */
function twinkleField(ctx, t, t0, t1, box, seed, n = 14) {
  if (t < t0 || t > t1) return
  const r = rng(seed), f = Math.floor(t * 15)
  for (let i = 0; i < n; i++) {
    const x = (box[0] + r() * box[2]) / PIX, y = (box[1] + r() * box[3]) / PIX, c = SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 6), at = t0 + r() * (t1 - t0 - 0.6)
    if (t < at || t > at + 1.4) continue
    pstar(ctx, x, y, [0, 1, 2, 3, 2, 1][(f + ph) % 6], c)
  }
}

// ── the Align mark: seed-of-life rings + the chakra column (same drawing as the teaser end tag) ──
const R0 = 20
const PET = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R0, Math.sin(a) * R0] })]
const CIRC = [...PET.map(([x, y]) => ({ x, y, r: R0 })), { x: 0, y: 0, r: 40 }]
function markSVG(parent, size, cx, cy, id) {
  const defs = CHAKRAS.map((c, i) => `<radialGradient id="${id}g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="${id}c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const m = el('div', { position: 'absolute', left: (cx - size / 2) + 'px', top: (cy - size / 2) + 'px', width: size + 'px', height: size + 'px' }, parent,
    `<svg width="${size}" height="${size}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.85" stroke-width="0.9" stroke-linecap="round">${CIRC.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHAKRAS.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}c${i})"/>`).join('')}</svg>`)
  const rings = [...m.querySelectorAll('.ring')], halos = [...m.querySelectorAll('.halo')], cores = [...m.querySelectorAll('.core')]
  return {
    m,
    /** lt: seconds since the mark starts drawing */
    draw(lt) {
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.04, 0.6 + i * 0.04)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.1 + i * 0.05, 0.6 + i * 0.05)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.1 + i * 0.05, 0.45 + i * 0.05); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}

function caption(parent, eyebrowText, line, layout) {
  const box = el('div', { position: 'absolute', ...layout, opacity: 0 }, parent)
  el('div', { fontFamily: MONO, fontSize: (VERT ? 30 : 26) * U + 'px', letterSpacing: '0.26em', color: 'rgba(239,230,214,0.9)', textTransform: 'uppercase', marginBottom: 16 * U + 'px', textShadow: '0 0 18px rgba(8,4,24,0.85)' }, box, eyebrowText)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 92 : 84) * U + 'px', lineHeight: 1.04, color: '#fff6ea', textShadow: '0 0 30px rgba(8,4,24,0.8), 0 2px 3px rgba(4,2,14,0.5)' }, box, line)
  return box
}
const capIn = (box, t, t0, t1) => {
  const i = ease.outCubic(prog(t, t0, t0 + 0.7)), o = ease.inQuad(prog(t, t1 - 0.45, t1))
  box.style.opacity = String(Math.min(i, 1 - o))
  box.style.transform = `translateY(${lerp(24, 0, i) - 16 * o}px)`
  box.style.filter = `blur(${lerp(6, 0, i) + 4 * o}px)`
}
const shotAlpha = (t, a, b) => Math.min(ease.inOutQuad(prog(t, a, a + X)), 1 - ease.inOutQuad(prog(t, b - X, b)))

// ───────────────────────────────────────────── scenes
function bg(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const space = spaceBackdrop(root, 'aurora', { seed: 11, grain: 0.18, stars: 220 })
  const deep = fill(root, { background: 'radial-gradient(80% 60% at 50% 45%, rgba(11,6,32,0) 0%, rgba(11,6,32,0.55) 100%)' })
  const black = fill(root, { background: '#000', opacity: 1 })
  return {
    start: 0, end: DURATION, root,
    update(t) {
      space.update(t * 0.6)
      // a slow dolly through the nebula the whole way
      space.root.style.transform = `scale(${1.04 + 0.06 * t / DURATION}) translateY(${-t * 3}px)`
      deep.style.opacity = String(0.7 + 0.3 * Math.sin(t * 0.4))
      black.style.opacity = String(Math.max(1 - ease.outQuad(prog(t, 0, 0.7)), ease.inQuad(prog(t, DURATION - 0.6, DURATION))))
    },
  }
}

function intro(stage) {
  const root = fill(stage, { background: 'transparent' })
  const pcv = el('canvas', { position: 'absolute', left: 0, top: 0, width: Math.ceil(W / PIX) * PIX + 'px', height: Math.ceil(H / PIX) * PIX + 'px', imageRendering: 'pixelated' }, root)
  pcv.width = Math.ceil(W / PIX); pcv.height = Math.ceil(H / PIX)
  const pctx = pcv.getContext('2d')
  const lock = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: `${W / 2}px ${MARK_CY}px` }, root)
  const bloom = el('div', { position: 'absolute', left: (W / 2 - 700 * U) + 'px', top: (MARK_CY - 700 * U) + 'px', width: 1400 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,246,232,0.55), rgba(201,166,255,0.28) 40%, rgba(180,92,255,0) 100%)' }, lock)
  const mark = markSVG(lock, 88 * MARK_S, W / 2, MARK_CY, 'im')
  const wordY = MARK_CY + 44 * MARK_S + (VERT ? 40 : 20)
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wordY + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 190 : 150) * U + 'px', lineHeight: 1, color: BONE, textShadow: '0 0 50px rgba(239,230,214,0.3)', opacity: 0 }, lock, 'Align')
  const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wordY + (VERT ? 230 : 180) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 40 : 34) * U + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: '#f2c75c', textShadow: '0 0 24px rgba(242,199,92,0.45)', opacity: 0 }, lock, 'HOUSTON BETA')
  return {
    start: 0, end: T.s1 + X, root,
    update(t) {
      drawPixels(pctx, t)
      const lt = t - 2.05
      mark.draw(lt)
      mark.m.style.opacity = String(prog(t, 2.0, 2.2))
      bloom.style.opacity = String(Math.sin(Math.PI * prog(t, 2.1, 3.4)) * 0.9)
      bloom.style.transform = `scale(${lerp(0.6, 1.2, ease.outCubic(prog(t, 2.1, 3.4)))})`
      const wp = ease.outCubic(prog(t, 2.6, 3.3))
      word.style.opacity = String(wp); word.style.letterSpacing = lerp(0.14, 0.01, wp) + 'em'; word.style.filter = `blur(${lerp(10, 0, wp)}px)`
      const tp = ease.outQuad(prog(t, 3.1, 3.6))
      tag.style.opacity = String(tp); tag.style.letterSpacing = lerp(0.6, 0.42, tp) + 'em'
      // slow push while it holds, then lift away into the first card
      const out = ease.inCubic(prog(t, T.s1 - 0.4, T.s1 + X))
      lock.style.transform = `scale(${(1 + 0.04 * prog(t, 2.2, T.s1)) * (1 + 0.35 * out)})`
      lock.style.opacity = String(1 - out)
      lock.style.filter = out > 0 ? `blur(${10 * out}px)` : 'none'
    },
  }
}

function shot1(stage) {
  const root = fill(stage, { background: 'transparent' })
  const cw = VERT ? 620 * U : 460 * U, ch = bodyH(G.mystery, cw)
  const c = card3d(root, G.mystery, cw)
  const cx = VERT ? W / 2 : W * 0.34, cy = VERT ? H * 0.43 : H / 2
  c.holder.style.left = (cx - cw / 2) + 'px'; c.holder.style.top = (cy - ch / 2) + 'px'
  const cap = caption(root, 'Tonight’s deck', VERT ? 'Card first.<br>Face last.' : 'Card first.<br>Face last.',
    VERT ? { left: 0, width: W + 'px', top: (cy + ch / 2 + 90 * U) + 'px', textAlign: 'center' } : { left: W * 0.6 + 'px', top: (H / 2 - 120 * U) + 'px', textAlign: 'left' })
  return {
    start: T.s1, end: T.s2 + X, root,
    update(t) {
      const a = shotAlpha(t, T.s1, T.s2 + X), lt = t - T.s1, p = lt / (T.s2 + X - T.s1)
      root.style.opacity = String(a)
      // slow motion: a long, smooth half-turn from left to right with a gentle float
      const ry = lerp(-32, 24, ease.inOutSine ? ease.inOutSine(p) : ease.inOutQuad(p))
      const rx = 8 * Math.sin(lt * 0.7) - 4, rz = -3 + 2 * Math.sin(lt * 0.5)
      const s = lerp(0.92, 1.04, ease.outQuad(p))
      c.body.style.transform = `translateY(${-14 * Math.sin(lt * 0.9)}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`
      c.shadow.style.opacity = String(0.8 - 0.2 * Math.sin(lt * 0.9))
      sweep(c.glint, cw, prog(t, T.s1 + 1.2, T.s1 + 3.4))
      capIn(cap, t, T.s1 + 0.7, T.s2 + X * 0.6)
    },
    fx(ctx, t) { twinkleField(ctx, t, T.s1 + 0.3, T.s2, [cx - cw * 0.8, cy - ch * 0.62, cw * 1.6, ch * 1.24], 61) },
  }
}

function shot2(stage) {
  const root = fill(stage, { background: 'transparent' })
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: (2200 * U) + 'px', perspectiveOrigin: VERT ? '50% 42%' : '42% 50%' }, root)
  const scene = el('div', { position: 'absolute', left: (VERT ? W / 2 : W * 0.35) + 'px', top: (VERT ? H * 0.42 : H / 2) + 'px', width: 0, height: 0, transformStyle: 'preserve-3d' }, persp)
  const cw = VERT ? 360 * U : 320 * U, SP = VERT ? 0.74 : 0.95
  // [card, x, y, z, base rotY, bob phase]
  const SET = [[G.talk3, -cw * SP, cw * 0.18, -260 * U, 16, 0], [G.talk4, cw * SP, -cw * 0.12, -160 * U, -14, 1.7], [G.talk2, 0, 0, 120 * U, 0, 3.1]]
  const cards = SET.map(([g, x, y, z, r0, ph]) => {
    const h = bodyH(g, cw)
    const box = el('div', { position: 'absolute', left: -cw / 2 + 'px', top: -h / 2 + 'px', width: cw + 'px', height: h + 'px', transformStyle: 'preserve-3d' }, scene)
    el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${50 * U}px ${6 * U}px rgba(242,199,92,0.26), 0 ${36 * U}px ${80 * U}px rgba(4,2,14,0.6)` }, box)
    const f = face(box, g, cw)
    return { box, x, y, z, r0, ph, ...f }
  })
  const cap = caption(root, 'The talk deck', 'Then you talk<br>in cards.',
    VERT ? { left: 0, width: W + 'px', top: (H * 0.42 + cw * 1.05 + 40 * U) + 'px', textAlign: 'center' } : { left: W * 0.68 + 'px', top: (H / 2 - 120 * U) + 'px', textAlign: 'left' })
  return {
    start: T.s2, end: T.s3 + X, root,
    update(t) {
      root.style.opacity = String(shotAlpha(t, T.s2, T.s3 + X))
      const lt = t - T.s2, p = lt / (T.s3 + X - T.s2)
      // the whole little constellation of cards turns slowly as the camera drifts past
      scene.style.transform = `rotateY(${lerp(22, -18, ease.inOutQuad(p))}deg) rotateX(${lerp(8, -4, p)}deg) translateZ(${lerp(-120, 40, ease.outQuad(p)) * U}px)`
      cards.forEach((c, i) => {
        const bob = Math.sin(lt * 0.8 + c.ph)
        c.box.style.transform = `translate3d(${c.x}px, ${c.y + bob * 16 * U}px, ${c.z}px) rotateY(${c.r0 + 6 * Math.sin(lt * 0.5 + c.ph)}deg) rotateZ(${2.5 * Math.sin(lt * 0.6 + c.ph)}deg)`
        sweep(c.glint, cw, prog(t, T.s2 + 1.0 + i * 0.45, T.s2 + 2.8 + i * 0.45))
      })
      capIn(cap, t, T.s2 + 0.8, T.s3 + X * 0.6)
    },
    fx(ctx, t) { twinkleField(ctx, t, T.s2 + 0.3, T.s3, VERT ? [80, H * 0.18, W - 160, H * 0.5] : [W * 0.1, H * 0.12, W * 0.6, H * 0.76], 73) },
  }
}

function shot3(stage) {
  const root = fill(stage, { background: 'transparent' })
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: (2400 * U) + 'px' }, root)
  const cw = VERT ? 440 * U : 360 * U, ch = bodyH(G.back, cw), gap = 40 * U
  const cy = VERT ? H * 0.42 : H * 0.47
  const glowL = el('div', { position: 'absolute', left: (W / 2 - 900 * U) + 'px', top: (cy - 600 * U) + 'px', width: 1800 * U + 'px', height: 1200 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(40% 50% at 32% 50%, rgba(242,199,92,0.5), rgba(242,199,92,0) 70%), radial-gradient(40% 50% at 68% 50%, rgba(255,140,220,0.5), rgba(255,140,220,0) 70%)' }, persp)
  const pair = el('div', { position: 'absolute', left: (W / 2) + 'px', top: cy + 'px', width: 0, height: 0, transformStyle: 'preserve-3d' }, persp)
  const cards = [G.me, G.them].map((g, i) => {
    const box = el('div', { position: 'absolute', left: (i ? gap / 2 : -gap / 2 - cw) + 'px', top: -ch / 2 + 'px', width: cw + 'px', height: ch + 'px', transformStyle: 'preserve-3d' }, pair)
    const fl = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }, box)
    el('div', { position: 'absolute', inset: 0, borderRadius: G.back.r * cw + 'px', boxShadow: `0 0 ${50 * U}px ${6 * U}px rgba(214,170,255,0.28), 0 ${36 * U}px ${80 * U}px rgba(4,2,14,0.6)` }, fl)
    const back = face(fl, G.back, cw, { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' })
    const front = face(fl, g, cw, { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' })
    return { box, fl, back, front }
  })
  const cap = caption(root, 'It’s mutual', 'Both align.<br>Then you see them.',
    VERT ? { left: 0, width: W + 'px', top: (cy + ch / 2 + 80 * U) + 'px', textAlign: 'center' } : { left: 0, width: W + 'px', top: (cy + ch / 2 + 46 * U) + 'px', textAlign: 'center' })
  if (!VERT) cap.querySelector('div:last-child').innerHTML = 'Both align. Then you see them.'
  const FLIP = T.s3 + 1.3, FD = 2.2                       // the flip, in slow motion
  return {
    start: T.s3, end: T.end + X, root,
    update(t) {
      root.style.opacity = String(shotAlpha(t, T.s3, T.end + X))
      const lt = t - T.s3, p = lt / (T.end + X - T.s3)
      pair.style.transform = `rotateY(${lerp(-10, 8, ease.inOutQuad(p))}deg) rotateX(${lerp(10, 2, p)}deg) translateZ(${lerp(-60, 60, ease.outQuad(p)) * U}px)`
      cards.forEach((c, i) => {
        const f0 = FLIP + i * 0.25, fp = ease.inOutSine ? ease.inOutSine(prog(t, f0, f0 + FD)) : ease.inOutQuad(prog(t, f0, f0 + FD))
        const lift = Math.sin(Math.PI * fp)
        c.fl.style.transform = `translateZ(${90 * U * lift}px) rotateY(${180 * fp}deg)`
        c.box.style.transform = `translateY(${-10 * U * Math.sin(lt * 0.8 + i * 1.6) - 26 * U * lift}px) rotateZ(${(i ? 1 : -1) * lerp(5, 2.5, fp)}deg)`
        sweep(c.front.glint, cw, prog(t, f0 + FD - 0.2, f0 + FD + 1.4))
      })
      glowL.style.opacity = String(ease.inOutQuad(prog(t, FLIP + 1.2, FLIP + 2.6)) * 0.85)
      capIn(cap, t, FLIP + FD - 0.3, T.end + X * 0.6)
    },
    fx(ctx, t) { twinkleField(ctx, t, FLIP + FD - 0.4, T.end + 0.2, [W / 2 - cw - gap - 80 * U, cy - ch / 2 - 60 * U, (cw + gap) * 2 + 160 * U, ch + 120 * U], 89, 18) },
  }
}

function endCard(stage) {
  const root = fill(stage, { background: 'transparent' })
  const cy = VERT ? 700 : 360
  const S = (VERT ? 400 : 300) / 88
  const glow = el('div', { position: 'absolute', left: (W / 2 - 800 * U) + 'px', top: (cy - 700 * U) + 'px', width: 1600 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(201,166,255,0.35), rgba(180,92,255,0) 100%)' }, root)
  const mark = markSVG(root, 88 * S, W / 2, cy, 'em')
  const wy = cy + 44 * S + (VERT ? 30 : 14)
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wy + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 170 : 130) * U + 'px', lineHeight: 1, color: BONE, opacity: 0 }, root, 'Align')
  const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 210 : 160) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 36 : 30) * U + 'px', letterSpacing: '0.34em', textIndent: '0.34em', color: '#f2c75c', opacity: 0 }, root, 'HOUSTON BETA · NOW OPEN')
  const line = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 300 : 230) * U) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 64 : 56) * U + 'px', color: 'rgba(239,230,214,0.92)', opacity: 0 }, root, 'Dating, dealt by the stars.')
  return {
    start: T.end, end: DURATION, root,
    update(t) {
      const lt = t - T.end
      root.style.opacity = String(ease.outQuad(prog(t, T.end, T.end + X)))
      mark.draw(lt - 0.2)
      glow.style.opacity = String(ease.outQuad(prog(lt, 0.4, 1.4)))
      const wp = ease.outCubic(prog(lt, 0.8, 1.4))
      word.style.opacity = String(wp); word.style.letterSpacing = lerp(0.14, 0.01, wp) + 'em'; word.style.filter = `blur(${lerp(8, 0, wp)}px)`
      tag.style.opacity = String(ease.outQuad(prog(lt, 1.2, 1.6)))
      line.style.opacity = String(ease.outQuad(prog(lt, 1.6, 2.1)))
      root.style.transform = `scale(${1 + 0.03 * prog(lt, 0, DURATION - T.end)})`
    },
    fx(ctx, t) { twinkleField(ctx, t, T.end + 0.5, DURATION - 0.4, [W * 0.15, cy - 300 * U, W * 0.7, 600 * U], 97, 10) },
  }
}

/** pixel fx for every shot, drawn on one coarse grid and blown up onto the #fx canvas */
function fxLayer() {
  const cv = document.createElement('canvas'); cv.width = Math.ceil(W / PIX); cv.height = Math.ceil(H / PIX)
  const c = cv.getContext('2d')
  const parts = []
  return {
    start: 0, end: DURATION, root: null, update() {}, add(s) { parts.push(s) },
    fx(ctx, t) {
      c.clearRect(0, 0, cv.width, cv.height)
      for (const s of parts) if (t >= s.start && t < s.end) s.fx(c, t)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(cv, 0, 0, cv.width * PIX, cv.height * PIX)
    },
  }
}

const builders = [shot1, shot2, shot3, endCard]
export const SCENES = [
  bg, intro,
  (stage) => {
    const layer = fxLayer()
    const built = builders.map((b) => b(stage))
    built.forEach((s, i) => { layer.add(s); s.root.style.zIndex = String(30 + i) })
    // the shots render through this one scene so their pixel fx share a canvas
    const parts = built.map((s) => ({ ...s, fx: undefined }))
    return {
      start: 0, end: DURATION, root: null,
      update(t) { for (const s of parts) { const on = t >= s.start && t < s.end; s.root.style.display = on ? 'block' : 'none'; if (on) s.update(t) } },
      fx: layer.fx,
    }
  },
]

// sound cues (teaser-sound format)
export const CUES = [
  ['riser', 0.2, 1.6, 0.05],
  ...CHAKRAS.map((_, i) => ['bell', PA.t0 + PA.first + i * PA.step, [293.66, 329.63, 369.99, 440, 493.88, 554.37, 587.33][i], 0.05, 1.6, (i - 3) * 0.12]),
  ['boom', PA.t0 + PA.rings, 0.32],
  ['glitter', PA.t0 + PA.rings, PA.t0 + PA.rings + 1.2],
  ['whoosh', T.s1 - 0.3, 0.9, 0.12],
  ['glitter', T.s1 + 1.3, T.s1 + 2.6],
  ['whoosh', T.s2 - 0.3, 0.9, 0.12],
  ['glitter', T.s2 + 1.1, T.s2 + 2.4],
  ['whoosh', T.s3 - 0.3, 0.9, 0.12],
  ['whoosh', T.s3 + 1.3, 2.2, 0.08],
  ['bell', T.s3 + 3.5, 587.33, 0.06, 2.4, -0.3], ['bell', T.s3 + 3.75, 739.99, 0.05, 2.4, 0.3],
  ['glitter', T.s3 + 3.4, T.s3 + 4.6],
  ['whoosh', T.end - 0.3, 0.8, 0.1],
  ...CHAKRAS.map((_, i) => ['bell', T.end + 0.3 + i * 0.05, [293.66, 369.99, 440, 554.37, 587.33, 739.99, 880][i], 0.05, 2.2, (i - 3) * 0.12]),
]
