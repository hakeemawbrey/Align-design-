// whop-oneshot · Align Houston Beta, product-page film (28.5s, 16:9 or 9:16 with &v)
// ONE CONTINUOUS SHOT: a single eased camera journey through a 3D starfield where the story's cards hang in space.
//   0.0–4.2   "The stars have aligned in Space City." word by word with a colour shimmer, the camera drifting forward
//   4.2–8.4   the camera glides through a drifting deck of mystery cards · "{ every night, a new deck }" in corner ticks
//   8.4–12.0  it banks around Juniper's mystery card as it turns · MYSTERY CARD / "Card first. Face last."
//  12.0–13.2  pushes in through a stepped pixel wipe …
//  13.2–17.6  … into her founders card: holo border, FOUNDER № 0112 badge in gold ticks, slow push and a glint · IT'S MUTUAL / "Both align. Then you see them."
//  17.6–21.6  trucks across to a fan of talk cards · THE TALK DECK / "Then you talk in cards."
//  21.6–25.4  pulls back: every card glides into the Align mark's constellation, shrinks to a point, the mark draws in
//  25.0–28.5  "Align", HOUSTON BETA, "Dating, dealt by the stars." in ticks; the camera keeps a slow push → black
// Every frame is a pure function of t. The camera is a Hermite spline; cards are DOM planes placed by our own projection
// (so the 3D starfield on canvas and the cards share one camera).
import { clamp, lerp, prog, ease, rng, el, mix } from '../../../src/lib.js'
import { W, H, VERT, A, SANS, SERIF, MONO, fill, img, spaceBackdrop } from '../../../src/scenes/common.js'

export const DURATION = 28.5
const BONE = '#efe6d6', GOLD = '#f2c75c'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const F = 1000                                    // focal length (px at 1 world unit / 1000 units away)
const T = { deck: 4.2, bank: 8.4, wipe: 12.05, wipeMid: 12.58, wipeEnd: 13.2, founder: 13.2, fan: 17.6, pull: 21.6, mark: 24.5, end: 25.2 }

// ── card geometry (body box inside the PNG's glow padding) ──
const P = (src, b, r = 0.067, iw = 1496, ih = 2237) => ({ src, iw, ih, b, r })
const G = {
  p1: P('card-profile-1.png', [120, 114, 1374, 2115]), p2: P('card-profile-2.png', [120, 114, 1374, 2115]),
  p4: P('card-profile-4.png', [120, 114, 1374, 2115]), p5: P('card-profile-5.png', [120, 114, 1374, 2115]),
  p6: P('card-profile-6.png', [120, 114, 1374, 2115]), juniper: P('card-profile-3.png', [120, 114, 1374, 2115]),
  back: P('card-back.png', [120, 119, 1440, 2227], 0.067, 1528, 2347),
  event: P('card-event.png', [120, 114, 1374, 2116], 0.067, 1496, 2238),
  founder: P('card-founder-juniper.png', [240, 218, 2748, 4223], 0.075, 2992, 4466),
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map(i => [`t${i}`, P(`card-talk-${i}.png`, [60, 60, 684, 1134], 0.075, 744, 1194)])),
}
const aspect = (g) => (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

// ── camera: Hermite spline over [x, y, z, yaw, roll] with monotone (Fritsch–Carlson) tangents, so it never overshoots ──
const CW = 360                                     // world width of a profile card
const J = { x: 0, y: 0, z: 5000 }                  // Juniper's card
const TF = { x: 1500, y: -40, z: 5750 }            // centre of the talk fan
const M = { x: 700, y: 0, z: 5400 }                // centre of the mark constellation
const K = 12                                       // world units per mark unit (the mark's viewBox is 88 units)
const END_PXU = VERT ? 5.2 : 3.6                   // final px per mark unit (mark ≈ 317px / 458px)
const END_CY = VERT ? 700 : 372                    // final screen y of the mark centre
const D_END = F * K / END_PXU
const sxL = VERT ? W / 2 : W * 0.36, sxR = VERT ? W / 2 : W * 0.635, syC = VERT ? H * 0.40 : H / 2
/** camera pose that puts `tg` at screen (sx, sy), R away, heading `phi` (rad) */
function look(tg, R, phi, sx = W / 2, sy = H / 2, roll = 0) {
  const f = [Math.sin(phi), Math.cos(phi)], r = [Math.cos(phi), -Math.sin(phi)]
  const rr = (sx - W / 2) * R / F, u = (sy - H / 2) * R / F
  return [tg.x - f[0] * R - r[0] * rr, tg.y - u, tg.z - f[1] * R - r[1] * rr, phi, roll * Math.PI / 180]
}
const camY = (D) => M.y - (END_CY - H / 2) * D / F
const FOUNDER_TG = VERT ? J : { x: J.x, y: J.y - 70, z: J.z }
const KEYS = [
  [0.0, [0, 30, -1700, 0, 0]],
  [4.0, [0, 0, 250, 0, 0.012]],
  [6.3, [60, -20, 2150, -0.06, 0.03]],
  [T.bank, look(J, VERT ? 1250 : 1080, -0.38, sxL, syC, -3)],
  [10.1, look(J, VERT ? 1060 : 920, -0.06, sxL, syC, 1.5)],
  [11.7, look(J, VERT ? 900 : 800, 0.2, sxL, syC, 2.5)],
  [12.6, look(J, VERT ? 680 : 680, 0.08, sxL, syC, 0.5)],
  [13.6, look(J, VERT ? 610 : 645, 0.02, sxL, syC, 0)],
  [17.2, look(FOUNDER_TG, VERT ? 545 : 575, -0.07, sxL, syC, -1)],
  [19.2, look(TF, VERT ? 1180 : 1000, 0.14, sxR, syC, -2)],
  [21.4, look(TF, VERT ? 1060 : 900, -0.03, sxR, syC, 1)],
  [23.4, [M.x - 50, camY(D_END * 0.5), M.z - D_END * 0.5, -0.01, 0.006]],
  [24.5, [M.x, camY(D_END * 0.62), M.z - D_END * 0.62, 0, 0]],
  [25.7, [M.x, camY(D_END), M.z - D_END, 0, 0]],
  [DURATION, [M.x, camY(D_END * 0.92), M.z - D_END * 0.92, 0, 0]],
]
const TAN = (() => {
  const n = KEYS.length, m = KEYS.map(() => [0, 0, 0, 0, 0])
  for (let c = 0; c < 5; c++) for (let i = 1; i < n - 1; i++) {
    const d0 = (KEYS[i][1][c] - KEYS[i - 1][1][c]) / (KEYS[i][0] - KEYS[i - 1][0]), d1 = (KEYS[i + 1][1][c] - KEYS[i][1][c]) / (KEYS[i + 1][0] - KEYS[i][0])
    if (d0 * d1 <= 0) continue
    const v = (KEYS[i + 1][1][c] - KEYS[i - 1][1][c]) / (KEYS[i + 1][0] - KEYS[i - 1][0])
    m[i][c] = Math.sign(v) * Math.min(Math.abs(v), 3 * Math.abs(d0), 3 * Math.abs(d1))
  }
  return m
})()
function camera(t) {
  let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++
  const [t0, p0] = KEYS[i], [t1, p1] = KEYS[i + 1], h = t1 - t0, u = clamp((t - t0) / h)
  const h00 = 2 * u ** 3 - 3 * u * u + 1, h10 = u ** 3 - 2 * u * u + u, h01 = -2 * u ** 3 + 3 * u * u, h11 = u ** 3 - u * u
  const v = p0.map((a, c) => h00 * a + h10 * h * TAN[i][c] + h01 * p1[c] + h11 * h * TAN[i + 1][c])
  return { x: v[0], y: v[1], z: v[2], yaw: v[3], roll: v[4], cy: Math.cos(v[3]), sy: Math.sin(v[3]), cr: Math.cos(v[4]), sr: Math.sin(v[4]) }
}
/** world point → screen { x, y, s (px per world unit), z (depth) } */
function proj(c, px, py, pz) {
  const dx = px - c.x, dy = py - c.y, dz = pz - c.z
  const x = dx * c.cy - dz * c.sy, z = dx * c.sy + dz * c.cy
  const s = F / Math.max(z, 1), X = x * s, Y = dy * s
  return { x: W / 2 + X * c.cr - Y * c.sr, y: H / 2 + X * c.sr + Y * c.cr, s, z }
}

// ── pixel-art sprites (the beta site's stars) ──
const PIX = VERT ? 5 : 5
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
].map((rows) => rows.map((r) => [...r]))
function pstar(ctx, x, y, size, color) {
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#ffffff' : color; ctx.fillRect(cx + c - o, cy + r - o, 1, 1) }
}

// ── the Align mark: seed-of-life rings + the chakra column ──
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
    draw(lt) {
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.06, 0.9 + i * 0.06)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.05 + i * 0.06, 0.6 + i * 0.06)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, i * 0.06, 0.4 + i * 0.06); c.setAttribute('r', String(p <= 0 ? 0 : p < 0.6 ? lerp(2.2, 5.5, p / 0.6) : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}
// constellation slots in mark units: the 7 chakra dots, and the 6 outer tips where the seed-of-life petals meet
const CHAKRA_SLOTS = CHAKRAS.map((c, i) => ({ x: 0, y: 31.8 - 10.6 * i, c }))
const TIP_SLOTS = [0, 60, 120, 180, 240, 300].map((a) => ({ x: 34.64 * Math.cos(a * Math.PI / 180), y: 34.64 * Math.sin(a * Math.PI / 180), c: '#fff4cf' }))

// ── type ──
/** a line revealed word by word, each glyph shimmering from an accent colour to bone */
function shimmerLine(parent, text, style, { perWord = 0.2, perChar = 0.02, fade = 0.34, accent = ['#ff8fb1', '#ffd98a', '#c9a6ff'], final = '#fff6ea' } = {}) {
  const root = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const lines = text.split('\n')
  const words = []
  lines.forEach((ln, li) => {
    const row = el('div', {}, root)
    ln.split(' ').forEach((w, wi) => {
      const ws = el('span', { display: 'inline-block', whiteSpace: 'pre' }, row)
      const chars = [...(wi ? ' ' : '') + w].map((ch) => el('span', { opacity: 0 }, ws, ch === ' ' ? ' ' : ch))
      words.push({ ws, chars, line: li })
    })
  })
  return {
    root, words,
    update(lt) {
      let n = 0
      words.forEach((w, wi) => {
        const t0 = wi * perWord
        const wp = ease.outCubic(prog(lt, t0, t0 + 0.45))
        w.ws.style.transform = `translateY(${lerp(14, 0, wp)}px)`
        w.ws.style.filter = wp < 1 ? `blur(${lerp(6, 0, wp)}px)` : 'none'
        w.chars.forEach((s, j) => {
          const p = prog(lt, t0 + j * perChar, t0 + j * perChar + fade)
          s.style.opacity = String(ease.outQuad(p))
          s.style.color = p >= 1 ? final : mix(accent[(n + j) % accent.length], final, ease.inQuad(p))
        })
        n += w.chars.length
      })
    },
    doneAt: words.length * perWord + 0.5,
  }
}
/** four square corner ticks around a box; positions sampled at 10 Hz (stepped, like the feature) */
function ticks(parent, color, size) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', left: 0, top: 0, width: size + 'px', height: size + 'px', background: color, opacity: 0 }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]], delays = [0, 0.07, 0.11, 0.04]
  return {
    update(t, box) {
      s.forEach((d, i) => {
        const q = Math.floor(Math.round((t - delays[i]) * 30) / 3) * 3 / 30
        const b = box(q)
        d.style.transform = `translate(${Math.round(b.cx + pts[i][0] * b.w / 2 - size / 2)}px, ${Math.round(b.cy + pts[i][1] * b.h / 2 - size / 2)}px)`
        d.style.opacity = String(clamp(b.op))
      })
    },
  }
}
/** a soft dark pool so type stays readable over the art */
function pool(parent, cx, cy, w, h, a = 0.8) {
  return el('div', { position: 'absolute', left: (cx - w / 2) + 'px', top: (cy - h / 2) + 'px', width: w + 'px', height: h + 'px', borderRadius: '50%', opacity: 0, pointerEvents: 'none',
    background: `radial-gradient(closest-side, rgba(11,6,32,${a}), rgba(11,6,32,${a * 0.8}) 50%, rgba(11,6,32,0) 100%)` }, parent)
}
/** mono eyebrow + serif italic line */
function caption(parent, eyebrow, line, layout) {
  const box = el('div', { position: 'absolute', ...layout, opacity: 0, willChange: 'transform' }, parent)
  el('div', { fontFamily: MONO, fontSize: (VERT ? 30 : 25) + 'px', letterSpacing: '0.28em', color: GOLD, textTransform: 'uppercase', marginBottom: 16 + 'px', textShadow: '0 0 18px rgba(8,4,24,0.9)' }, box, eyebrow)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 92 : 84) + 'px', lineHeight: 1.04, color: '#fff6ea', textShadow: '0 0 30px rgba(8,4,24,0.85), 0 2px 3px rgba(4,2,14,0.5)' }, box, line)
  return box
}
function capIn(box, t, t0, t1, drift = -26) {
  const i = ease.outCubic(prog(t, t0, t0 + 0.8)), o = ease.inQuad(prog(t, t1 - 0.5, t1))
  box.style.opacity = String(Math.min(i, 1 - o))
  // the type drifts a touch with the camera the whole time it is up
  box.style.transform = `translate(${drift * prog(t, t0, t1)}px, ${lerp(24, 0, i) - 14 * o}px)`
  box.style.filter = i < 1 || o > 0 ? `blur(${lerp(6, 0, i) + 5 * o}px)` : 'none'
  return Math.min(i, 1 - o)
}

// ── cards: DOM planes placed by proj() ──
function makeCard(parent, g, ew, glow) {
  const eh = ew * aspect(g)
  const outer = el('div', { position: 'absolute', left: 0, top: 0, width: ew + 'px', height: eh + 'px', transformOrigin: '50% 50%', display: 'none' }, parent)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d', borderRadius: g.r * ew + 'px', boxShadow: `0 0 ${ew * 0.12}px ${ew * 0.015}px ${glow}, 0 ${ew * 0.08}px ${ew * 0.2}px rgba(4,2,14,0.6)` }, outer)
  const addFace = (gg) => {
    const k = ew / (gg.b[2] - gg.b[0])
    const f = el('div', { position: 'absolute', inset: 0, borderRadius: gg.r * ew + 'px', overflow: 'hidden', backfaceVisibility: 'hidden' }, body)
    img(f, A + gg.src, { left: -gg.b[0] * k + 'px', top: -gg.b[1] * k + 'px', width: gg.iw * k + 'px', height: gg.ih * k + 'px' })
    return f
  }
  const face = addFace(g)
  const fog = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * ew + 'px', background: '#0b0620', opacity: 0, pointerEvents: 'none' }, body)
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (ew * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, el('div', { position: 'absolute', inset: 0, borderRadius: g.r * ew + 'px', overflow: 'hidden', pointerEvents: 'none' }, body))
  return { outer, body, face, fog, glint, ew, eh, addFace, g }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }

// the story's cards: [key, home position(t), base rotation, world width, glow, constellation slot, slot width (mark units), morph start]
const r0 = rng(17)
const SXV = VERT ? 0.5 : 1, SYV = VERT ? 1.7 : 1
const DECK = [
  ['p1', -900, -330, 2350], ['back', 860, 300, 2650], ['p4', -640, 420, 3050], ['p5', 980, -380, 3350], ['event', -1050, -60, 3700], ['p6', 700, 120, 3950],
].map(([k, x, y, z], i) => ({ k, x: x * SXV, y: y * SYV, z, ry: (r0() - 0.5) * 50, rz: (r0() - 0.5) * 14, ph: r0() * 6.28, slot: TIP_SLOTS[[3, 0, 2, 5, 4, 1][i]], sw: 10, m0: 21.3 + i * 0.1 }))

// ── pixel wipe that passes over the screen: covers top→bottom, then uncovers top→bottom (stars ride both edges) ──
function passWipe(ctx, t, { start, mid, end, color = '#140a30', size = 48, seed = 3 }) {
  if (t <= start || t >= end) return
  const cover = t < mid, p = cover ? prog(t, start, mid) : prog(t, mid, end)
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size), r = rng(seed)
  const jitter = Array.from({ length: cols }, () => r())
  const maxStair = 14, front = ease.inOutQuad(p) * (rows + maxStair + 2.4)
  const tick = Math.round(t * 30) >> 1
  for (let cx = 0; cx < cols; cx++) {
    const stair = Math.floor(cx / 4) * 1.4 + jitter[cx] * 1.2
    for (let cy = 0; cy < rows; cy++) {
      const d = front - (cy + stair), x0 = cx * size, y0 = cy * size
      const cr = rng(seed * 131 + cx * 977 + cy * 31), hh = cr(), col = SPARKS[Math.floor(cr() * SPARKS.length)], blink = (tick + Math.floor(cr() * 4)) & 1
      const solid = () => { ctx.fillStyle = color; ctx.fillRect(x0, y0, size + 1, size + 1) }
      const star = (lvl) => { ctx.save(); ctx.translate(x0 + size / 2, y0 + size / 2); ctx.scale(size / 9, size / 9); pstar(ctx, 0, 0, lvl, col); ctx.restore() }
      if (cover) {
        if (d <= 0) continue
        if (d >= 2.2) { solid(); continue }
        if (d < 0.6) { if (hh < 0.4) star(blink ? 2 : 1) } else if (d < 1.4) { if (hh < 0.8) star(blink ? 3 : 1) } else { solid(); if (hh < 0.5) star(blink ? 1 : 2) }
      } else {
        if (d <= 0) { solid(); continue }
        if (d >= 2.2) continue
        if (d < 0.8) { solid(); if (hh < 0.5) star(blink ? 1 : 2) } else if (d < 1.5) { if (hh < 0.8) star(blink ? 3 : 1) } else if (hh < 0.35) star(blink ? 2 : 1)
      }
    }
  }
}

function world(stage) {
  const root = fill(stage, { background: '#0b0620' })
  // nebula backdrop, oversized so the camera can pan across it
  const neb = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '50% 50%' }, root)
  const space = spaceBackdrop(neb, 'aurora', { seed: 11, grain: 0.16, stars: 0 })
  const dim = fill(root, { background: 'radial-gradient(100% 80% at 50% 50%, rgba(11,6,32,0) 0%, rgba(11,6,32,0.5) 100%)' })
  // 3D starfield
  const sc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); sc.width = W; sc.height = H
  const sctx = sc.getContext('2d')
  const pc = document.createElement('canvas'); pc.width = Math.ceil(W / PIX); pc.height = Math.ceil(H / PIX)
  const pctx = pc.getContext('2d')
  const rs = rng(5)
  const STARS = Array.from({ length: 3200 }, () => ({ x: -3400 + rs() * 8200, y: (-2000 + rs() * 4000) * (VERT ? 1.6 : 1), z: -2200 + rs() * 12500, c: rs() < 0.18 ? SPARKS[Math.floor(rs() * 5)] : '#fff7ec', ph: rs() * 6.28, sp: 1.2 + rs() * 2.4, b: 0.5 + rs() * 0.5 }))

  // cards
  const layer = fill(root, { background: 'transparent', isolation: 'isolate' })
  const cards = []
  const add = (g, ew, glow, o) => { const c = makeCard(layer, G[g], ew, glow); Object.assign(c, o); cards.push(c); return c }
  DECK.forEach((d) => add(d.k, 440, 'rgba(201,166,255,0.28)', { home: (t) => ({ x: d.x + 14 * Math.sin(t * 0.5 + d.ph), y: d.y + 18 * Math.sin(t * 0.7 + d.ph), z: d.z }),
    rot: (t) => ({ ry: d.ry + 16 * Math.sin(t * 0.35 + d.ph), rx: 6 * Math.sin(t * 0.5 + d.ph), rz: d.rz + 3 * Math.sin(t * 0.4 + d.ph) }), w: CW, slot: d.slot, sw: d.sw, m0: d.m0, show: 4.6, blur: true }))
  // Juniper: mystery face, the founders face stacked behind it (swapped while the pixel wipe covers the screen)
  const jun = add('juniper', VERT ? 760 : 700, 'rgba(232,140,255,0.34)', {
    home: (t) => ({ x: J.x, y: J.y + 10 * Math.sin(t * 0.8) * (1 - prog(t, 12, 13)), z: J.z }),
    rot: (t) => {
      const turn = t < T.wipeMid ? lerp(30, -12, ease.inOutSine ? ease.inOutSine(prog(t, 7.6, 12.0)) : ease.inOutQuad(prog(t, 7.6, 12.0))) * (1 - ease.inOutQuad(prog(t, 11.9, 12.6))) : 3 * Math.sin((t - T.wipeMid) * 0.6)
      return { ry: turn, rx: t < T.wipeMid ? 4 * Math.sin(t * 0.7) : 0, rz: t < T.wipeMid ? -2 + 1.5 * Math.sin(t * 0.5) : 0 }
    }, w: CW, slot: CHAKRA_SLOTS[3], sw: 8, m0: 21.9, show: 4.6 })
  const fFace = jun.addFace(G.founder); fFace.style.opacity = 0
  jun.body.appendChild(jun.fog); jun.body.appendChild(jun.glint.parentNode)
  // holo shimmer round the founders border
  const ring = el('div', { position: 'absolute', inset: 0, borderRadius: G.founder.r * jun.ew + 'px', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    padding: (0.034 * jun.ew) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, jun.body)
  // the talk fan
  const FAN = [1, 2, 3, 4, 5, 6].map((n, i) => add(`t${n}`, 400, 'rgba(242,199,92,0.26)', {
    home: (t) => {
      const spread = lerp(7, 11, ease.inOutCubic(prog(t, 17.4, 20.0))), a = (i - 2.5) * spread * Math.PI / 180, Rf = 560
      return { x: TF.x + Rf * Math.sin(a), y: TF.y + 470 - Rf * Math.cos(a) + 8 * Math.sin(t * 0.8 + i), z: TF.z - i * 10 }
    },
    rot: (t) => ({ ry: 6 * Math.sin(t * 0.5 + i * 0.7) - 6, rx: 0, rz: (i - 2.5) * lerp(7, 11, ease.inOutCubic(prog(t, 17.4, 20.0))) }), w: 300, slot: CHAKRA_SLOTS[[0, 1, 2, 4, 5, 6][i]], sw: 6.6, m0: 21.8 + i * 0.08, show: 16.9 }))

  // mark (projected into the world at M), constellation hairlines on the fx canvas
  const markWrap = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformOrigin: '0 0' }, root)
  const MS = 88 * 6
  const mark = markSVG(markWrap, MS, 0, 0, 'om')
  const endBox = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformOrigin: '0 0' }, root)
  const wGap = VERT ? 24 : 14
  const word = el('div', { position: 'absolute', left: -W / 2 + 'px', width: W + 'px', top: wGap + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 170 : 124) + 'px', lineHeight: 1, color: BONE, textShadow: '0 0 50px rgba(239,230,214,0.25)', opacity: 0 }, endBox, 'Align')
  const tag = el('div', { position: 'absolute', left: -W / 2 + 'px', width: W + 'px', top: (wGap + (VERT ? 200 : 146)) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 38 : 30) + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: GOLD, textShadow: '0 0 24px rgba(242,199,92,0.4)', opacity: 0 }, endBox, 'HOUSTON BETA')
  const TL_Y = wGap + (VERT ? 330 : 238)
  const tline = shimmerLine(endBox, 'Dating, dealt by the stars.', { left: '0', top: TL_Y + 'px', transform: 'translateX(-50%)', fontFamily: SANS, fontWeight: 500, fontSize: (VERT ? 50 : 40) + 'px', letterSpacing: '-0.01em', textShadow: '0 2px 18px rgba(8,4,24,0.8)' },
    { perWord: 0.09, perChar: 0.016, fade: 0.2, accent: ['#ffffff', '#ffe3c4', '#ecdcff'] })
  const tlTicks = ticks(endBox, BONE, VERT ? 14 : 12)

  // ── type layer (screen space) ──
  const txt = fill(root, { background: 'transparent' })
  const openPool = pool(txt, W / 2, H / 2, VERT ? 1100 : 1700, VERT ? 520 : 360, 0.55)
  const opener = shimmerLine(txt, VERT ? 'The stars have aligned\nin Space City.' : 'The stars have aligned in Space City.', {
    left: W / 2 + 'px', top: H / 2 + 'px', textAlign: 'center', fontFamily: SANS, fontWeight: 500, fontSize: (VERT ? 76 : 72) + 'px', letterSpacing: '-0.015em', lineHeight: 1.12,
    textShadow: '0 0 36px rgba(232,98,138,0.22), 0 2px 18px rgba(8,4,24,0.8)' }, { perWord: 0.24 })
  const deckPool = pool(txt, W / 2, H / 2, VERT ? 1150 : 1500, VERT ? 360 : 330, 0.72)
  const deckLine = shimmerLine(txt, '{ every night, a new deck }', { left: W / 2 + 'px', top: H / 2 + 'px', textAlign: 'center', fontFamily: SANS, fontWeight: 500, fontSize: (VERT ? 60 : 66) + 'px', letterSpacing: '-0.01em',
    textShadow: '0 2px 18px rgba(8,4,24,0.85)' }, { perWord: 0.17, accent: ['#ffffff', '#ffe3c4', '#ecdcff'] })
  const deckTicks = ticks(txt, BONE, VERT ? 16 : 16)
  const capLayout = (side) => VERT ? { left: 0, width: W + 'px', top: (H * 0.705) + 'px', textAlign: 'center' }
    : side === 'right' ? { left: W * 0.585 + 'px', top: (H / 2 - 112) + 'px', textAlign: 'left' } : { left: W * 0.085 + 'px', top: (H / 2 - 112) + 'px', textAlign: 'left' }
  const capPoolR = VERT ? pool(txt, W / 2, H * 0.77, 1200, 520, 0.7) : pool(txt, W * 0.73, H / 2, 1000, 640, 0.72)
  const capPoolL = VERT ? capPoolR : pool(txt, W * 0.24, H / 2, 1000, 640, 0.72)
  const capBank = caption(txt, 'Mystery card', 'Card first.<br>Face last.', capLayout('right'))
  const capFounder = caption(txt, 'It’s mutual', VERT ? 'Both align.<br>Then you see them.' : 'Both align.<br>Then you<br>see them.', capLayout('right'))
  const capTalk = caption(txt, 'The talk deck', 'Then you talk<br>in cards.', capLayout('left'))
  const badgeTicks = ticks(txt, GOLD, VERT ? 12 : 11)
  const black = fill(root, { background: '#000', opacity: 1 })

  let deckW = 0, deckH = 0, tlW = 0, tlH = 0
  const cam0 = { v: null }
  return {
    start: 0, end: DURATION, root,
    update(t) {
      const c = camera(t); cam0.v = c
      // backdrop: pans opposite the heading, breathes with the depth travelled
      space.update(t * 0.6)
      neb.style.transform = `translate(${-c.yaw * W * 0.45 - c.x * 0.03}px, ${-c.y * 0.04}px) rotate(${c.roll * 57.3}deg) scale(${1.32 + 0.05 * c.z / 6000})`
      // starfield
      sctx.clearRect(0, 0, W, H); pctx.clearRect(0, 0, pc.width, pc.height)
      const f15 = Math.floor(t * 15)
      for (const s of STARS) {
        const p = proj(c, s.x, s.y, s.z)
        if (p.z < 40 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) continue
        const near = clamp((2600 - p.z) / 2400), tw_ = 0.65 + 0.35 * Math.sin(t * s.sp + s.ph)
        const a = s.b * tw_ * clamp(p.z / 120) * (0.5 + 0.5 * clamp(1 - p.z / 11000))
        if (near > 0.45) {
          const lvl = near > 0.9 ? 3 : near > 0.7 ? 2 : 1
          pctx.globalAlpha = clamp(a * 1.3); pstar(pctx, p.x / PIX, p.y / PIX, (f15 + Math.floor(s.ph * 3)) % 7 === 0 ? Math.max(0, lvl - 1) : lvl, s.c)
        } else {
          const sz = 1.4 + near * 2.6
          sctx.globalAlpha = clamp(a); sctx.fillStyle = s.c; sctx.fillRect(Math.round(p.x), Math.round(p.y), sz, sz)
        }
      }
      pctx.globalAlpha = 1; sctx.globalAlpha = 1
      sctx.imageSmoothingEnabled = false; sctx.drawImage(pc, 0, 0, pc.width * PIX, pc.height * PIX)

      // cards
      for (const cd of cards) {
        let h = cd.home(t), r = cd.rot(t), w = cd.w
        // the finale: glide into the mark's constellation, shrink, face the camera
        const m = ease.inOutCubic(prog(t, cd.m0, cd.m0 + 2.1))
        if (m > 0) {
          const sx = M.x + cd.slot.x * K, sy = M.y + cd.slot.y * K, sz = M.z
          h = { x: lerp(h.x, sx, m), y: lerp(h.y, sy, m), z: lerp(h.z, sz, m) }
          w = Math.exp(lerp(Math.log(w), Math.log(cd.sw * K), m)); r = { ry: r.ry * (1 - m), rx: r.rx * (1 - m), rz: r.rz * (1 - m) }
        }
        const p = proj(c, h.x, h.y, h.z)
        const fadeIn = prog(t, cd.show - 0.9, cd.show), out = 1 - prog(t, T.mark, T.mark + 0.6)
        const op = clamp(prog(p.z, 90, 420)) * fadeIn * out * clamp(1.4 - p.z / 7000)
        const k = p.s * w / cd.ew, rad = k * cd.eh * 0.62
        if (op <= 0.002 || p.z < 60 || p.x + rad < -40 || p.x - rad > W + 40 || p.y + rad < -40 || p.y - rad > H + 40) { cd.outer.style.display = 'none'; continue }
        cd.outer.style.display = 'block'
        cd.outer.style.filter = cd.blur && p.z < 800 ? `blur(${((800 - p.z) / 70).toFixed(2)}px)` : 'none'
        const dx = h.x - c.x, dy = h.y - c.y, dz = h.z - c.z
        const bear = 0.75 * Math.atan2(dx, dz) * 57.3, tilt = -0.4 * Math.atan2(dy, Math.hypot(dx, dz)) * 57.3   // softened: reads calmer than true perspective
        cd.outer.style.transform = `translate(${p.x - cd.ew / 2}px, ${p.y - cd.eh / 2}px) rotate(${c.roll * 57.3}deg) scale(${k})`
        cd.outer.style.perspective = (p.z * cd.ew / w) + 'px'
        cd.outer.style.opacity = String(op)
        cd.outer.style.zIndex = String(Math.round(1e6 / p.z))
        cd.body.style.transform = `rotateY(${clamp(r.ry + bear, -70, 70)}deg) rotateX(${r.rx + tilt}deg) rotateZ(${r.rz}deg)`
        cd.fog.style.opacity = String(clamp((p.z - 1600) / 6000) * 0.65 * (1 - m))
        cd.p = p; cd.k = k; cd.wNow = w
      }
      // Juniper: mystery → founders under the wipe
      const fo = t >= T.wipeMid ? 1 : 0
      fFace.style.opacity = String(fo); jun.face.style.opacity = String(1 - fo)
      ring.style.opacity = String(fo * 0.55)
      ring.style.background = `conic-gradient(from ${(t * 70) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 16deg, rgba(255,255,255,0) 38deg, rgba(255,255,255,0) 360deg)`
      sweep(jun.glint, jun.ew, t < 12 ? prog(t, 9.4, 11.0) : t < 16 ? prog(t, 13.5, 15.1) : prog(t, 16.4, 17.6))
      DECK.forEach((d, i) => sweep(cards[i].glint, cards[i].ew, prog(t, 4.8 + i * 0.45, 6.2 + i * 0.45)))
      FAN.forEach((cd, i) => sweep(cd.glint, cd.ew, prog(t, 18.6 + i * 0.22, 19.9 + i * 0.22)))

      // ── type ──
      opener.update(t - 0.35)
      const oo = ease.inCubic(prog(t, 3.55, 4.35))
      opener.root.style.transform = `translate(-50%, -50%) scale(${1 + 0.02 * prog(t, 0.3, 3.6) + 0.22 * oo})`
      opener.root.style.opacity = String(1 - oo)
      opener.root.style.filter = oo > 0 ? `blur(${8 * oo}px)` : 'none'
      openPool.style.opacity = String(0.45 * (1 - oo) * prog(t, 0, 0.5))
      // { every night, a new deck }
      const d0 = T.deck + 0.35, dOut = ease.inCubic(prog(t, 7.75, 8.35))
      deckLine.update(t - d0)
      deckLine.root.style.transform = `translate(-50%, -50%) scale(${1 + 0.03 * prog(t, d0, 8.3) + 0.12 * dOut})`
      deckLine.root.style.opacity = String(1 - dOut); deckLine.root.style.filter = dOut > 0 ? `blur(${6 * dOut}px)` : 'none'
      deckPool.style.opacity = String(prog(t, d0 - 0.2, d0 + 0.4) * (1 - dOut))
      if (!deckW && t > d0) { deckW = deckLine.root.offsetWidth; deckH = deckLine.root.offsetHeight }
      deckTicks.update(t, (q) => {
        const g = ease.outBack(prog(q, d0 + 0.05, d0 + 0.6)), sc = 1 + 0.03 * prog(q, d0, 8.3)
        return { cx: W / 2, cy: H / 2, w: ((deckW || 900) + (VERT ? 60 : 80)) * lerp(0.5, 1, g) * sc, h: ((deckH || 80) + (VERT ? 50 : 56)) * lerp(0.6, 1, g) * sc, op: prog(q, d0, d0 + 0.15) * (1 - ease.inQuad(prog(q, 7.7, 8.1))) }
      })
      // captions
      const aB = capIn(capBank, t, 9.0, 11.85), aF = capIn(capFounder, t, 13.7, 17.45), aT = capIn(capTalk, t, 18.7, 21.7, 22)
      capPoolR.style.opacity = String(Math.max(aB, aF, VERT ? aT : 0))
      if (!VERT) capPoolL.style.opacity = String(aT)
      // gold ticks round the FOUNDER № 0112 badge (card coords 0.12–0.42 × 0.137–0.165)
      badgeTicks.update(t, (q) => {
        if (!jun.p) return { cx: 0, cy: 0, w: 0, h: 0, op: 0 }
        const p = jun.p, cw = jun.wNow * p.s, ch = cw * aspect(G.founder), g = ease.outBack(prog(q, 15.0, 15.5))
        const bx = p.x + (0.27 - 0.5) * cw, by = p.y + (0.151 - 0.5) * ch
        return { cx: bx, cy: by, w: (0.32 * cw) * lerp(1.5, 1, g), h: (0.05 * ch) * lerp(2.4, 1, g), op: prog(q, 15.0, 15.1) * (1 - prog(q, 17.0, 17.3)) }
      })

      // ── the mark, projected at M ──
      const pm = proj(c, M.x, M.y, M.z), pxu = pm.s * K
      markWrap.style.transform = `translate(${pm.x}px, ${pm.y}px) rotate(${c.roll * 57.3}deg) scale(${pxu / 6})`
      markWrap.style.display = t > T.mark - 0.2 ? 'block' : 'none'
      mark.draw(t - (T.mark + 0.1))
      const ek = pxu / END_PXU
      endBox.style.transform = `translate(${pm.x}px, ${pm.y + 44 * pxu}px) scale(${ek})`
      const wp = ease.outCubic(prog(t, T.end, T.end + 0.8))
      word.style.opacity = String(wp); word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'; word.style.filter = wp < 1 ? `blur(${lerp(10, 0, wp)}px)` : 'none'
      const tp = ease.outQuad(prog(t, T.end + 0.5, T.end + 1.1))
      tag.style.opacity = String(tp); tag.style.letterSpacing = lerp(0.6, 0.42, tp) + 'em'
      const tl0 = T.end + 1.1
      tline.update(t - tl0)
      if (!tlW && t > tl0) { tlW = tline.root.offsetWidth; tlH = tline.root.offsetHeight }
      tlTicks.update(t, (q) => { const g = ease.outBack(prog(q, tl0, tl0 + 0.55)); return { cx: 0, cy: TL_Y + (tlH || 48) / 2, w: ((tlW || 560) + 56) * lerp(0.5, 1, g), h: ((tlH || 48) + 34) * lerp(0.6, 1, g), op: prog(q, tl0, tl0 + 0.12) } })
      black.style.opacity = String(Math.max(1 - ease.outQuad(prog(t, 0, 0.8)), ease.inQuad(prog(t, DURATION - 0.45, DURATION))))
    },
    fx(ctx, t) {
      const c = cam0.v || camera(t)
      // constellation hairlines + points while the cards settle into the mark
      const lk = prog(t, 23.2, 24.2) * (1 - prog(t, T.mark + 0.5, T.mark + 1.3))
      const slotP = (s) => proj(c, M.x + s.x * K, M.y + s.y * K, M.z)
      if (lk > 0) {
        ctx.save(); ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(239,230,214,${0.38 * lk})`; ctx.beginPath()
        const col = CHAKRA_SLOTS.map(slotP), tip = TIP_SLOTS.map(slotP)
        ctx.moveTo(col[0].x, col[0].y); ctx.lineTo(col[6].x, col[6].y)
        tip.forEach((p, i) => { const q = tip[(i + 1) % 6]; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y) })
        ctx.stroke(); ctx.restore()
      }
      // each card resolves to a point of light (chakra colours on the column, warm white on the tips)
      const dk = prog(t, T.mark - 0.1, T.mark + 0.4) * (1 - prog(t, T.mark + 0.7, T.mark + 1.6))
      if (dk > 0) {
        for (const s of [...CHAKRA_SLOTS, ...TIP_SLOTS]) {
          const p = slotP(s), rr = 26 * p.s * K / 6
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr)
          g.addColorStop(0, `rgba(255,255,255,${dk})`); g.addColorStop(0.25, s.c); g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.globalAlpha = dk; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 6.283); ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      // pixel twinkles round the tips once the mark is drawn, and round the founders card
      ctx.imageSmoothingEnabled = false
      const f15 = Math.floor(t * 15)
      if (t > T.mark + 0.6) TIP_SLOTS.forEach((s, i) => { const p = slotP(s), ph = (f15 + i * 2) % 8; if (ph < 5) { ctx.save(); ctx.translate(p.x, p.y); ctx.scale(PIX, PIX); pstar(ctx, 0, 0, [0, 1, 2, 1, 0][ph], SPARKS[i % 5]); ctx.restore() } })
      if (t > 13.4 && t < 17.6 && jun.p) {
        const r = rng(89), p = jun.p, cw = jun.wNow * p.s, ch = cw * aspect(G.founder)
        for (let i = 0; i < 14; i++) {
          const ang = r() * 6.28, x = p.x + Math.cos(ang) * (cw * (0.55 + r() * 0.2)), y = p.y + Math.sin(ang) * (ch * (0.5 + r() * 0.12)), at = 13.4 + r() * 3.6, ph = Math.floor(r() * 6)
          if (t < at || t > at + 1.2) continue
          ctx.save(); ctx.translate(Math.round(x / PIX) * PIX, Math.round(y / PIX) * PIX); ctx.scale(PIX, PIX); pstar(ctx, 0, 0, [0, 1, 2, 3, 2, 1][(f15 + ph) % 6], SPARKS[i % 5]); ctx.restore()
        }
      }
      passWipe(ctx, t, { start: T.wipe, mid: T.wipeMid, end: T.wipeEnd })
    },
  }
}

export const SCENES = [world]

// sound cues (teaser-sound format)
const NOTES = [293.66, 329.63, 369.99, 440, 493.88, 554.37, 587.33]
export const CUES = [
  ['riser', 0.1, 2.2, 0.035],
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => ['pluck', 0.4 + i * 0.24, [587.33, 659.25, 739.99, 880, 739.99, 987.77, 880][i], 0.035, 0.6, (i - 3) * 0.12]),
  ['whoosh', 3.7, 1.1, 0.07],
  ...[0, 1, 2, 3, 4].map((i) => ['pop', 4.6 + i * 0.17, [880, 987.77, 1108.73, 1174.66, 1318.51][i], 0.03, (i - 2) * 0.2]),
  ['whoosh', 5.7, 0.8, 0.045], ['whoosh', 6.6, 0.8, 0.045], ['whoosh', 7.5, 0.8, 0.045],
  ['whoosh', 8.1, 1.2, 0.06],
  ['glitter', 9.4, 10.8],
  ['bell', 9.1, 739.99, 0.04, 1.8, 0.3],
  ['whoosh', 11.6, 1.0, 0.09],
  ['glitter', T.wipe, T.wipeEnd],
  ['boom', T.wipeMid, 0.16],
  ['bell', T.wipeMid + 0.1, 739.99, 0.05, 2.2, -0.2], ['bell', T.wipeMid + 0.2, 1108.73, 0.04, 2.2, 0.2],
  ['glitter', 13.5, 15.1],
  ['bell', 15.05, 587.33, 0.045, 2.0, -0.3], ['bell', 15.25, 880, 0.04, 2.0, 0.3],
  ['whoosh', 17.3, 1.4, 0.07],
  ...[0, 1, 2, 3, 4, 5].map((i) => ['pluck', 18.3 + i * 0.16, [440, 493.88, 554.37, 659.25, 739.99, 880][i], 0.03, 0.5, (i - 2.5) * 0.15]),
  ['whoosh', 21.4, 1.8, 0.08],
  ['riser', 22.4, 24.4, 0.045],
  ...NOTES.map((f, i) => ['bell', 23.6 + i * 0.11, f * 2, 0.03, 1.4, (i - 3) * 0.12]),
  ['boom', T.mark + 0.1, 0.22],
  ['glitter', T.mark + 0.1, T.mark + 1.4],
  ...CHAKRAS.map((_, i) => ['bell', T.mark + 0.15 + i * 0.06, [293.66, 369.99, 440, 554.37, 587.33, 739.99, 880][i], 0.05, 2.4, (i - 3) * 0.12]),
  ['bell', T.end + 0.5, 1174.66, 0.03, 2.4, 0],
]
