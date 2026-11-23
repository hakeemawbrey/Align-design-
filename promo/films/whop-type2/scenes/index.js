// whop-type2 · Align Houston Beta, product-page film (polish pass of whop-type; 16:9 or 9:16 with &v)
// A type-led sibling of the 30s launch film: big type beats answered by card beats.
//    0.00– 3.45  "The stars have aligned in Space City." word by word, colour shimmer, over the nebula → stair wipe
//    3.35– 6.40  { now ▣ in Houston }: bracket line, corner ticks, a chip flicking through cards
//    6.05–10.00  glass pill: zoom onto the caret, types "Houston, TX · tonight’s deck", tap send → disc
//    9.75–13.45  circle opens on a deck being dealt into a 3D stack · "a new deck / every night"
//   13.25–16.20  { card first · face last } → the ticks open out round Juniper's mystery card
//   15.50–22.10  mystery card turns · pixel wipe into her founders card · slow push · close-up on FOUNDER № 0112
//   21.80–24.95  talk cards fan out · "then you talk / in cards"
//   24.60–27.20  gradient tagline in ticks: "Dating, dealt by the stars" → stair wipe from the bottom
//   27.00–29.80  the Align mark draws in · Align · HOUSTON BETA → black
import { clamp, lerp, prog, ease, rng, el, mix, C } from '../../../src/lib.js'
import { W, H, VERT, A, SANS, SERIF, MONO, fill, img, spaceBackdrop } from '../../../src/scenes/common.js'
import { fxStairWipe } from '../../../src/scenes/s1-imagine.js'

export const DURATION = 29.8
const U = Math.min(W, H) / 1080
const BONE = C.bone, ROSE = '#ff8fb1', GOLD = '#f2c75c'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const sine = (x) => -(Math.cos(Math.PI * x) - 1) / 2
const FI = (t) => Math.round(t * 30)
const inOutQuart = x => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
const SERIF_Q = SERIF.replace(/"/g, "'")

// section times
const T = {
  s1: 0, wipe1: 2.85,
  br1: 3.35, pill: 6.05, deck: 9.75, br2: 13.25, card: 15.5, wipe2: 18.0, founder: 18.6, talk: 21.8, tag: 24.6, wipe3: 26.75, end: 27.0,
}

// ── card geometry (body box inside each PNG's glow padding) ──
const PROF = { iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 }
const TALK = { iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 }
const G = {
  p1: { src: 'card-profile-1.png', ...PROF }, p2: { src: 'card-profile-2.png', ...PROF }, p3: { src: 'card-profile-3.png', ...PROF },
  p4: { src: 'card-profile-4.png', ...PROF }, p5: { src: 'card-profile-5.png', ...PROF }, p6: { src: 'card-profile-6.png', ...PROF },
  peek: { src: 'card-profile-peek.png', ...PROF, b: [120, 114, 1374, 2115] },
  ev: { src: 'card-event.png', ...PROF },
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227], r: 0.067 },
  t1: { src: 'card-talk-1.png', ...TALK }, t2: { src: 'card-talk-2.png', ...TALK }, t3: { src: 'card-talk-3.png', ...TALK },
  t4: { src: 'card-talk-4.png', ...TALK }, t5: { src: 'card-talk-5.png', ...TALK }, t6: { src: 'card-talk-6.png', ...TALK },
  td: { src: 'card-talk-daily.png', iw: 1178, ih: 1891, b: [96, 96, 1082, 1795], r: 0.075 },
  founder: { src: 'card-founder-juniper.png', iw: 2992, ih: 4466, b: [240, 218, 2748, 4223], r: 0.075 },
}
const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

/** one card face clipped to its body, `w` px wide */
function face(parent, g, w, style = {}) {
  const bw = g.b[2] - g.b[0], k = w / bw, h = bodyH(g, w), rad = g.r * w
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: rad + 'px', overflow: 'hidden', ...style }, parent)
  const im = img(f, A + g.src, { left: -g.b[0] * k + 'px', top: -g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' })
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, im, glint, w, h, k }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }
const CARD_SHADOW = '0 30px 60px -14px rgba(4,2,16,0.85), 0 0 0 1px rgba(196,170,255,0.22), 0 0 26px 2px rgba(154,123,224,0.28)'

// ── pixel sprites (fx canvas, coarse grid) ──
const PIX = VERT ? 7 : 6
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
].map((rows) => rows.map((r) => [...r]))
function pstar(ctx, x, y, size, color) {
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#ffffff' : color; ctx.fillRect(cx + c - o, cy + r - o, 1, 1) }
}
function twinkleField(ctx, t, t0, t1, box, seed, n = 14) {
  if (t < t0 || t > t1) return
  const r = rng(seed), f = Math.floor(t * 15)
  for (let i = 0; i < n; i++) {
    const x = (box[0] + r() * box[2]) / PIX, y = (box[1] + r() * box[3]) / PIX, c = SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 6), at = t0 + r() * Math.max(0.1, t1 - t0 - 0.6)
    if (t < at || t > at + 1.4) continue
    pstar(ctx, x, y, [0, 1, 2, 3, 2, 1][(f + ph) % 6], c)
  }
}

// ── the Align mark ──
const R0 = 20
const PET = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R0, Math.sin(a) * R0] })]
const CIRC = [...PET.map(([x, y]) => ({ x, y, r: R0 })), { x: 0, y: 0, r: 40 }]
function markSVG(parent, size, cx, cy, id) {
  const defs = CHAKRAS.map((c, i) => `<radialGradient id="${id}g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="${id}c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const m = el('div', { position: 'absolute', left: (cx - size / 2) + 'px', top: (cy - size / 2) + 'px', width: size + 'px', height: size + 'px' }, parent,
    `<svg width="${size}" height="${size}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.9" stroke-width="1.0" stroke-linecap="round">${CIRC.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHAKRAS.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}c${i})"/>`).join('')}</svg>`)
  const rings = [...m.querySelectorAll('.ring')], halos = [...m.querySelectorAll('.halo')], cores = [...m.querySelectorAll('.core')]
  return {
    m,
    draw(lt) {
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.035, 0.6 + i * 0.035)))))
      // chakra dots pop bottom → top after the rings
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.45 + i * 0.07, 0.95 + i * 0.07)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.45 + i * 0.07, 0.8 + i * 0.07); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}

/** four corner ticks, each lagging a touch, positions stepped at 10 Hz (the feature's bracket ticks) */
function makeTicks(parent, color, size) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: color, opacity: 0, zIndex: 50 }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]], delays = [0, 0.07, 0.11, 0.04]
  return {
    update(t, box) {
      s.forEach((d, i) => {
        const q = Math.floor(FI(t - delays[i]) / 3) * 3 / 30
        const b = box(q)
        d.style.left = Math.round(b.cx + pts[i][0] * b.w / 2 - size / 2) + 'px'
        d.style.top = Math.round(b.cy + pts[i][1] * b.h / 2 - size / 2) + 'px'
        d.style.opacity = String(clamp(b.op))
      })
    },
  }
}

/** "{ … }" line: tokens spring open (their width grows), an optional image chip flicks through cards */
function bracketLine(parent, tokens, { fs, chip }) {
  const row = el('div', { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center',
    fontFamily: SANS, fontWeight: 500, fontSize: fs + 'px', color: BONE, whiteSpace: 'nowrap', letterSpacing: '-0.01em', textShadow: '0 2px 22px rgba(8,4,24,0.7)' }, parent)
  const mk = (html, extra = {}) => el('span', { display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', ...extra }, row, html)
  const gap = Math.round(fs * 0.3)
  const lb = mk('{', { padding: `0 ${gap}px ${fs * 0.11}px 0` })
  const items = tokens.map((tk) => {
    if (tk.chip) {
      const c = el('span', { display: 'inline-block', position: 'relative', height: chip.h + 'px', overflow: 'hidden', borderRadius: chip.h * 0.1 + 'px', verticalAlign: 'middle', flexShrink: 0 }, row)
      const tiles = chip.cards.map((g) => {
        const tile = el('div', { position: 'absolute', top: 0, width: chip.w + 'px', height: chip.h + 'px', overflow: 'hidden', borderRadius: chip.w * 0.08 + 'px' }, c)
        // whole card body squeezed into the tile (cards keep their own borders)
        const bw = g.b[2] - g.b[0], bh = g.b[3] - g.b[1], k = Math.max(chip.w / bw, chip.h / bh)
        img(tile, A + g.src, { left: (chip.w - bw * k) / 2 - g.b[0] * k + 'px', top: (chip.h - bh * k) / 2 - g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' })
        return tile
      })
      return { ...tk, e: c, tiles }
    }
    return { ...tk, e: mk(tk.html, tk.style || {}) }
  })
  const rb = mk('}', { padding: `0 0 ${fs * 0.11}px ${gap}px` })
  let nat = null
  const measure = () => {
    nat = { lb: lb.getBoundingClientRect().width, rb: rb.getBoundingClientRect().width }
    items.forEach((it, i) => { if (!it.chip) { it.e.style.width = 'auto'; nat[i] = it.e.getBoundingClientRect().width / (window.__stageScale || 1) } })
  }
  const CHIPW = 3 * chip.w + 2 * (chip.step - chip.w), CM = Math.round(fs * 0.2)
  const fOf = (it, tt) => ease.spring(prog(tt, it.at, it.at + 0.5), 0.08) * (1 - ease.inOutCubic(prog(tt, it.out ?? 1e9, (it.out ?? 1e9) + 0.22)))
  return {
    row,
    width(tt) {
      if (!nat) measure()
      return nat.lb + nat.rb + items.reduce((a, it, i) => a + (it.chip ? (CHIPW + 2 * CM) * clamp(fOf(it, tt)) : nat[i] * clamp(fOf(it, tt))), 0)
    },
    update(t) {
      if (!nat) measure()
      items.forEach((it, i) => {
        const f = fOf(it, t)
        if (it.chip) {
          it.e.style.width = CHIPW * clamp(f) + 'px'; it.e.style.margin = `0 ${CM * clamp(f)}px`; it.e.style.opacity = String(clamp(f * 3))
          const NT = it.tiles.length, shift = Math.floor(FI(t) / 3)
          it.tiles.forEach((tile, j) => { const slot = ((j - shift) % NT + NT) % NT; tile.style.left = ((slot - 1) * chip.step) + 'px' })
          return
        }
        it.e.style.width = nat[i] * clamp(f) + 'px'
        it.e.style.opacity = String(clamp(f * 1.6))
        if (it.color) it.e.style.color = mix(it.color[0], it.color[1], ease.inOutQuad(prog(t, it.at, it.at + 0.6)))
      })
    },
  }
}

function caption(parent, eyebrowText, line, layout, pool = 0.75) {
  const box = el('div', { position: 'absolute', ...layout, opacity: 0, isolation: 'isolate', zIndex: 60 }, parent)
  el('div', { position: 'absolute', left: -160 * U + 'px', right: -160 * U + 'px', top: -110 * U + 'px', bottom: -110 * U + 'px', zIndex: -1,
    background: `radial-gradient(closest-side, rgba(11,6,32,${pool}), rgba(11,6,32,${pool * 0.75}) 55%, rgba(11,6,32,0) 100%)` }, box)
  el('div', { fontFamily: MONO, fontSize: (VERT ? 30 : 28) * U + 'px', letterSpacing: '0.26em', color: 'rgba(239,230,214,0.92)', textTransform: 'uppercase', marginBottom: 16 * U + 'px', textShadow: '0 0 18px rgba(8,4,24,0.85)' }, box, eyebrowText)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 88 : 80) * U + 'px', lineHeight: 1.04, color: '#fff6ea', textShadow: '0 0 30px rgba(8,4,24,0.8), 0 2px 3px rgba(4,2,14,0.5)' }, box, line)
  return box
}
const capIn = (box, t, t0, t1) => {
  const i = ease.outCubic(prog(t, t0, t0 + 0.7)), o = ease.inQuad(prog(t, t1 - 0.45, t1))
  box.style.opacity = String(Math.min(i, 1 - o))
  box.style.transform = `translateY(${lerp(24, 0, i) - 16 * o}px)`
  box.style.filter = i < 1 || o > 0 ? `blur(${lerp(6, 0, i) + 4 * o}px)` : 'none'
}

// ───────────────────────────────────────────── the feature's nebula (S1), copied so the opener matches
const BGW = Math.round(W * 1.2), BGH = Math.round(H * 1.2)
function hash2(x, y, seed) { let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 982451653); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }
function vnoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, seed), b = hash2(ix + 1, iy, seed), c = hash2(ix, iy + 1, seed), d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, seed, oct = 5) { let v = 0, amp = 0.5, f = 1, n = 0; for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, seed + o * 17); n += amp; amp *= 0.5; f *= 2.03 } return v / n }
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
function buildNebula() {
  const R = 3, w = Math.ceil(BGW / R), h = Math.ceil(BGH / R)
  const lo = canvas(w, h), lx = lo.getContext('2d'), id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e'), pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => { const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i; return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f) }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w, nx = VERT ? u * 2.6 : u * 4.6, ny = VERT ? v * 4.6 : v * 2.6
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4), qx = nx + 2.4 * wx, qy = ny + 2.4 * wy
      const d = fbm(qx, qy, 37, 5)
      // luminous arc kept off the centre band where the opening line sits
      const arc = VERT ? Math.exp(-Math.pow((u - (0.12 + 0.8 * v * v * 0.95)) / 0.3, 2)) : Math.exp(-Math.pow((v - (0.18 + 0.75 * u * u * 0.9)) / 0.32, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.78) / 0.28, 2) + Math.pow((v - 0.84) / 0.24, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.2) / 0.3, 2) + Math.pow((v - 0.14) / 0.22, 2)))
      const mask = clamp(0.08 + 0.85 * arc + 1.1 * lowR + 0.8 * upL, 0, 1.7)
      const fr = 1 - Math.abs(fbm(qx * 2.1 + 5.5, qy * 2.1 + 0.7, 89, 4) - 0.5) * 2
      const cloud = smooth(0.4, 0.82, d)
      let e = mask * (0.55 * cloud * cloud + 0.75 * Math.pow(fr, 7) * smooth(0.3, 0.7, d) + 0.06 * smooth(0.25, 0.6, d))
      e = 1 - Math.exp(-e * 1.8)
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.05 + 0.6 * u + 0.45 * v + (cn - 0.5) * 1.2) * 0.9)
      const ridge = 1 - Math.abs(fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 4) - 0.5) * 2
      const dust = smooth(0.66, 0.95, ridge) * 0.95, k = 1 - dust, o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) { const base = top[c] + (bot[c] - top[c]) * v; px[o + c] = clamp((base * (1 - dust * 0.35) + col[c] * e * 0.78 * k) / 255) * 255 }
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'; nx.filter = 'blur(1.5px)'; nx.drawImage(lo, 0, 0, BGW, BGH); nx.filter = 'none'
  const bl = canvas(BGW / 4, BGH / 4), blx = bl.getContext('2d'); blx.filter = 'blur(10px)'; blx.drawImage(neb, 0, 0, BGW / 4, BGH / 4)
  nx.globalCompositeOperation = 'screen'; nx.globalAlpha = 0.42; nx.drawImage(bl, 0, 0, BGW, BGH); nx.globalAlpha = 1
  // stars
  const r = rng(101), tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236']
  for (let i = 0; i < (VERT ? 4200 : 6000); i++) {
    const s = 0.45 + Math.pow(r(), 2.4) * 1.6
    nx.fillStyle = `rgba(${tints[Math.floor(r() * 4)]},${0.3 + r() * 0.65})`; nx.beginPath(); nx.arc(r() * BGW, r() * BGH, s, 0, Math.PI * 2); nx.fill()
  }
  nx.globalCompositeOperation = 'source-over'
  return neb
}
function starSprite() {
  const S = 160, c = canvas(S, S), x = c.getContext('2d'), m = S / 2, g = x.createRadialGradient(m, m, 0, m, m, m)
  g.addColorStop(0, 'rgba(255,250,240,1)'); g.addColorStop(0.04, 'rgba(255,246,232,0.95)'); g.addColorStop(0.12, 'rgba(226,206,255,0.35)'); g.addColorStop(0.35, 'rgba(180,140,255,0.08)'); g.addColorStop(1, 'rgba(180,140,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, S, S)
  x.globalCompositeOperation = 'lighter'
  for (const [dx, dy, len] of [[1, 0, 1], [0, 1, 1], [0.707, 0.707, 0.35], [0.707, -0.707, 0.35]]) {
    const L = m * len, lg = x.createLinearGradient(m - dx * L, m - dy * L, m + dx * L, m + dy * L)
    lg.addColorStop(0, 'rgba(255,240,230,0)'); lg.addColorStop(0.5, `rgba(255,244,236,${len > 0.5 ? 0.7 : 0.3})`); lg.addColorStop(1, 'rgba(255,240,230,0)')
    x.strokeStyle = lg; x.lineWidth = len > 0.5 ? 1.6 : 1; x.beginPath(); x.moveTo(m - dx * L, m - dy * L); x.lineTo(m + dx * L, m + dy * L); x.stroke()
  }
  return c
}

// ───────────────────────────────────────────── scenes
function bg(stage) {
  const root = fill(stage, { background: C.void })
  const rose = spaceBackdrop(root, 'rose', { seed: 2, grain: 0.18 })
  const violet = spaceBackdrop(root, 'aurora', { seed: 5, grain: 0.18, stars: 200 })
  const deep = fill(root, { background: 'radial-gradient(80% 60% at 50% 48%, rgba(11,6,32,0.25) 0%, rgba(11,6,32,0.6) 100%)' })
  return {
    start: 0, end: DURATION, root,
    update(t) {
      rose.update(t); violet.update(t * 0.8)
      // rose ground for the type beats, violet for Juniper and the talk deck
      violet.root.style.opacity = String(ease.inOutQuad(prog(t, T.card, T.card + 1.2)))
      const k = prog(t, 0, DURATION)
      rose.root.style.transform = violet.root.style.transform = `scale(${1.03 + 0.05 * k})`
      deep.style.opacity = String(0.8 + 0.2 * Math.sin(t * 0.5))
    },
  }
}

// S1 · "The stars have aligned in Space City."
const S1_WORDS = [['The', 0.35], ['stars', 0.6], ['have', 0.85], ['aligned', 1.1], ['in', 1.45], ['Space', 1.7, true], ['City.', 1.9, true]]
function opener(stage) {
  const root = fill(stage, { background: C.void })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); cv.width = W; cv.height = H
  const bx = cv.getContext('2d')
  const neb = buildNebula(), spr = starSprite()
  const rb = rng(404), bright = []
  while (bright.length < 26) {
    const x = rb() * W, y = rb() * H
    if (VERT ? (y > 700 && y < 1220) : (y > 400 && y < 680 && x > 100 && x < 1820)) continue
    bright.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 110, sp: 1.4 + rb() * 2.5, ph: rb() * 6.28, depth: rb() })
  }
  // a soft indigo pocket behind the line (bone type holds ≥ 4.5:1 over the wisps)
  const pocket = el('div', { position: 'absolute', left: (W / 2 - (VERT ? 640 : 1100)) + 'px', top: (H / 2 - (VERT ? 330 : 220)) + 'px', width: (VERT ? 1280 : 2200) + 'px', height: (VERT ? 660 : 440) + 'px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.62), rgba(11,6,32,0.34) 60%, rgba(11,6,32,0) 100%)' }, root)
  void pocket
  const fs = VERT ? 104 : 96
  const line = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center', fontFamily: SANS, fontWeight: 500, fontSize: fs + 'px', letterSpacing: '-0.018em', lineHeight: 1.16, color: BONE,
    textShadow: '-0.7px 0 0 rgba(232,98,138,0.32), 0.7px 0 0 rgba(140,170,255,0.28), 0 2px 26px rgba(11,6,32,0.75)' }, root)
  const ACC = [C.rub, C.amber, C.gold, C.plum]
  const words = S1_WORDS.map(([w, at, accent], i) => {
    const span = el('span', { display: 'inline-block', whiteSpace: 'pre', opacity: 0, ...(accent ? { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: '1.16em', letterSpacing: '0', color: ROSE } : {}) }, line)
    const chars = [...w].map(ch => el('span', {}, span, ch))
    if (i < S1_WORDS.length - 1) line.appendChild(document.createTextNode(' '))
    if (VERT && (w === 'stars' || w === 'aligned')) line.appendChild(el('br'))
    return { span, chars, at, accent }
  })
  return {
    start: 0, end: T.wipe1 + 0.62, root,
    update(t) {
      const k = prog(t, 0, 3.4), cam = lerp(1.0, 1.08, 0.25 * k + 0.75 * ease.inOutQuad(k))
      const dx = lerp(-16, 20, k), dy = lerp(10, -10, k), fade = lerp(0.3, 1, ease.outCubic(prog(t, 0, 0.6)))
      bx.globalAlpha = 1; bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
      bx.globalAlpha = fade
      bx.drawImage(neb, W / 2 - BGW * cam / 2 + dx, H / 2 - BGH * cam / 2 + dy, BGW * cam, BGH * cam)
      bx.globalCompositeOperation = 'lighter'
      for (const b of bright) {
        const s = cam * (1 + 0.04 * b.depth * k), x = W / 2 + (b.x - W / 2) * s + dx * 1.4, y = H / 2 + (b.y - H / 2) * s + dy * 1.4
        const tw = 0.6 + 0.4 * Math.sin(t * b.sp + b.ph), sz = b.size * (0.85 + 0.2 * tw)
        bx.globalAlpha = fade * tw; bx.drawImage(spr, x - sz / 2, y - sz / 2, sz, sz)
      }
      bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
      // word by word: each rises out of a blur, its letters shimmering accent → final
      words.forEach((w) => {
        const p = ease.outCubic(prog(t, w.at, w.at + 0.55))
        w.span.style.opacity = String(p)
        w.span.style.transform = `translateY(${lerp(22, 0, p)}px)`
        w.span.style.filter = p < 1 ? `blur(${lerp(10, 0, p).toFixed(2)}px)` : 'none'
        w.chars.forEach((c, j) => {
          const q = prog(t, w.at + j * 0.035, w.at + j * 0.035 + 0.5)
          c.style.color = q >= 1 ? (w.accent ? ROSE : BONE) : mix(ACC[(j + w.at * 10) % 4 | 0], w.accent ? ROSE : BONE, ease.inQuad(q))
        })
      })
      line.style.transform = `translateY(-50%) scale(${lerp(1, 1.035, ease.inOutQuad(prog(t, 0.3, 3.4)))})`
    },
  }
}

// S2 · { now ▣ in Houston }
function bracket1(stage) {
  const root = fill(stage, { background: 'transparent' })
  const fs = VERT ? 78 : 92
  const chip = VERT ? { w: 66, h: 104, step: 72 } : { w: 74, h: 116, step: 81 }
  const AT = { now: 3.6, chip: 3.82, in: 4.05, hou: 4.2, out: 6.0 }
  const L = bracketLine(root, [
    { html: 'now', at: AT.now },
    { chip: true, at: AT.chip },
    { html: 'in', at: AT.in },
    { html: `&nbsp;<span style="font-family:${SERIF_Q};font-style:italic;font-size:1.16em;letter-spacing:0;padding-right:0.04em">Houston</span>`, at: AT.hou, color: [GOLD, ROSE] },
  ], { fs, chip: { ...chip, cards: [G.p1, G.t2, G.back, G.p4, G.t5, G.ev, G.p6, G.t3, G.peek, G.p2, G.t6, G.p5] } })
  const ticks = makeTicks(root, BONE, VERT ? 22 : 18)
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: fs * 0.8 + 'px', color: 'rgba(239,230,214,0.34)' }, root, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: fs * 0.8 + 'px', color: 'rgba(239,230,214,0.34)' }, root, '⟶')
  const CONV = 5.92
  return {
    start: T.br1, end: T.pill + 0.4, root,
    update(t) {
      L.update(t)
      const outF = 1 - ease.inCubic(prog(t, 5.78, 5.96))
      L.row.style.opacity = String(Math.min(ease.outQuad(prog(t, 3.45, 3.6)), outF))
      L.row.style.transform = `translate(-50%,-50%) scale(${lerp(1, 1.04, prog(t, 3.5, 5.9))})`
      ticks.update(t, (tt) => {
        const rw = L.width(tt)
        const grow = ease.spring(prog(tt, 3.55, 4.25), 0.1), conv = ease.inOutCubic(prog(tt, CONV, CONV + 0.25))
        const bw = VERT ? Math.min(rw * lerp(1.02, 1.08, grow) + 40, 1000) : rw * lerp(1.05, 1.36, grow) + 60
        const bh = VERT ? 120 + 300 * grow : 100 + 280 * grow
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: ease.outCubic(prog(tt, 3.5, 3.9)) * (1 - prog(tt, CONV + 0.2, CONV + 0.28)) }
      })
      const rw = L.width(t), ap = ease.outCubic(prog(t, 4.2, 4.9))
      if (VERT) {
        const off = lerp(430, 300, ap)
        arrL.style.left = arrR.style.left = (W / 2) + 'px'
        arrL.style.transform = `translate(-50%, calc(-55% - ${off}px)) rotate(90deg)`
        arrR.style.transform = `translate(-50%, calc(-55% + ${off}px)) rotate(90deg)`
      } else {
        arrL.style.left = (W / 2 - rw / 2 - lerp(300, 160, ap) - 56) + 'px'
        arrR.style.left = (W / 2 + rw / 2 + lerp(300, 160, ap) - 4) + 'px'
        arrL.style.transform = arrR.style.transform = 'translateY(-55%)'
      }
      arrL.style.opacity = arrR.style.opacity = String(ap * outF)
    },
  }
}

// S3 · glass pill typing "Houston, TX · tonight’s deck"
const PILL_TEXT = 'Houston, TX · tonight’s deck'
const TY0 = 6.95, TY1 = 8.45
function typedAt() {
  const r = rng(42), times = []; let acc = 0
  for (let i = 0; i < PILL_TEXT.length; i++) { acc += 0.6 + r() * 0.8 + (PILL_TEXT[i] === ' ' ? 0.6 : 0); times.push(acc) }
  return times.map(v => TY0 + (v / acc) * (TY1 - TY0))
}
export const PILL_KEYS = typedAt()
function pillScene(stage) {
  const root = fill(stage, { background: 'transparent' })
  const L = VERT ? { PW: 560, PH: 72, FS: 25, CARET_H: 28, ZMAX: 6.0, ZREST: 1.62, ANCHOR: 0.7 } : { PW: 800, PH: 72, FS: 26, CARET_H: 30, ZMAX: 8.5, ZREST: 1.7, ANCHOR: 0.66 }
  const { PW, PH } = L
  const glow = fill(root, { background: 'radial-gradient(60% 55% at 50% 52%, rgba(154,123,224,0.32), rgba(20,10,46,0) 70%)', opacity: 0 })
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '0 0' }, root)
  // a ghost "Houston" in huge serif behind the pill (the feature's ghost "Align")
  const big = el('div', { position: 'absolute', left: '50%', top: '50%', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 420 : 400) + 'px', lineHeight: 1, color: 'rgba(214,196,255,0.16)', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
    transform: VERT ? 'translate(calc(-50% - 40px),-50%) rotate(-90deg)' : 'translate(-50%,-54%)' }, world, 'Houston')
  const pill = el('div', { position: 'absolute', left: (W / 2 - PW / 2) + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '999px',
    background: 'linear-gradient(180deg, rgba(52,30,108,0.78) 0%, rgba(40,20,90,0.82) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1.5px rgba(196,182,228,0.35), inset 0 -1px 0 rgba(11,6,32,0.35), 0 20px 60px rgba(11,6,32,0.5)',
    backdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden', opacity: 0 }, world)
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0))' }, pill)
  const glint = el('div', { position: 'absolute', top: '-20px', width: '90px', height: (PH + 40) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.07), rgba(255,255,255,0))', transform: 'skewX(-22deg)' }, pill)
  const disc = el('div', { position: 'absolute', inset: 0, borderRadius: '999px', background: '#2a1d4f', boxShadow: 'inset 0 0 0 1.5px rgba(239,230,214,0.5)', opacity: 0 }, pill)
  const eyebrow = el('div', { position: 'absolute', left: '50%', top: (H / 2 - PH / 2 - 62) + 'px', transform: 'translateX(-50%)', fontFamily: MONO, fontSize: '22px', letterSpacing: '0.24em', color: 'rgba(239,230,214,0.9)', whiteSpace: 'nowrap', opacity: 0, textShadow: '0 1px 12px rgba(11,6,32,0.8)' }, world, 'WHERE ARE THE STARS TONIGHT?')
  const field = el('div', { position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: L.FS + 'px', color: BONE, whiteSpace: 'pre' }, pill)
  const caret = el('span', { display: 'inline-block', width: '2px', height: L.CARET_H + 'px', background: BONE, marginLeft: '2px', verticalAlign: '-5px' })
  const hint = el('div', { position: 'absolute', left: '42px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: L.FS + 'px', color: C.label3, whiteSpace: 'pre' }, pill, 'Your city')
  const send = el('div', { position: 'absolute', right: '12px', top: '12px', width: '48px', height: '48px', borderRadius: '999px', background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: '22px', fontWeight: 600 }, pill, '↑')
  const spinner = el('div', { position: 'absolute', left: '50%', top: '50%', width: '30px', height: '30px', margin: '-15px 0 0 -15px', borderRadius: '50%', border: '2.5px solid rgba(239,230,214,0.2)', borderTopColor: BONE, opacity: 0 }, pill)
  const TAP = 44
  const ripple = el('div', { position: 'absolute', width: TAP + 'px', height: TAP + 'px', margin: (-TAP / 2) + 'px 0 0 ' + (-TAP / 2) + 'px', borderRadius: '50%', border: '2.5px solid rgba(255,247,236,0.95)', opacity: 0 }, world)
  const tap = el('div', { position: 'absolute', width: TAP + 'px', height: TAP + 'px', margin: (-TAP / 2) + 'px 0 0 ' + (-TAP / 2) + 'px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 34%), linear-gradient(135deg, #f8edff 0%, #fff7ec 34%, #dfe9fb 64%, #ffeaf4 100%)',
    boxShadow: 'inset 0 -3px 6px rgba(120,96,170,0.28), 0 10px 26px rgba(11,6,32,0.45)' }, world)
  let xs = null
  const measure = () => {
    const probe = el('span', { position: 'absolute', visibility: 'hidden', fontFamily: SANS, fontSize: L.FS + 'px', whiteSpace: 'pre' }, pill)
    xs = [0]; for (let i = 1; i <= PILL_TEXT.length; i++) { probe.textContent = PILL_TEXT.slice(0, i); xs.push(probe.getBoundingClientRect().width / (window.__stageScale || 1)) }
    probe.remove()
  }
  const P = { zin: [6.45, 6.95], zout: [8.6, 9.1], tapIn: [8.95, 9.2], press: 9.25, morph: [9.38, 9.8], back: [9.38, 9.8] }
  return {
    start: T.pill, end: T.deck + 0.55, root,
    update(t) {
      if (!xs) measure()
      const n = PILL_KEYS.filter(v => v <= t).length
      field.textContent = PILL_TEXT.slice(0, n)
      const blink = t < TY0 - 0.05 || t > TY1 + 0.1 ? Math.floor(t * 2.2) % 2 === 0 : true
      caret.style.opacity = blink && t < P.morph[0] ? '1' : '0'
      field.appendChild(caret)
      hint.style.opacity = n === 0 ? String(ease.outQuad(prog(t, 6.2, 6.45))) : '0'
      const ZMAX = L.ZMAX, ZREST = Math.log(L.ZREST) / Math.log(ZMAX)
      const zIn = inOutQuart(prog(t, ...P.zin)), zOut = inOutQuart(prog(t, ...P.zout)), zBack = ease.inOutCubic(prog(t, ...P.back))
      const zf = zIn * (1 - zOut)
      const z = Math.pow(ZMAX, zf + zOut * ZREST * (1 - zBack))
      const kp = n > 0 ? ease.outCubic(prog(t, PILL_KEYS[n - 1], PILL_KEYS[n - 1] + 0.1)) : 1
      const cx = n > 0 ? lerp(xs[n - 1], xs[n], kp) : 0
      const caretX = W / 2 - PW / 2 + 32 + cx
      const focusX = lerp(W / 2, caretX, zf), anchorX = lerp(W / 2, W * L.ANCHOR, zf)
      world.style.transform = `translate(${anchorX - focusX * z}px, ${H / 2 - H / 2 * z}px) scale(${z})`
      const inP = ease.spring(prog(t, 6.08, 6.5), 0.06)
      pill.style.opacity = String(clamp(inP * 2))
      pill.style.transform = `scale(${lerp(0.7, 1, clamp(inP))})`
      const m = ease.inOutExpo(prog(t, ...P.morph)), w = lerp(PW, PH, m)
      pill.style.width = w + 'px'; pill.style.left = (W / 2 - w / 2) + 'px'
      const sendX = W / 2 + w / 2 - 36, sendY = H / 2
      const ap = ease.outCubic(prog(t, ...P.tapIn))
      const press = t < P.press - 0.05 ? 0 : t < P.press ? ease.outQuad(prog(t, P.press - 0.05, P.press)) : 1 - ease.inOutQuad(prog(t, P.press, P.press + 0.16))
      tap.style.left = lerp(sendX + 200, sendX + 12, ap) + 'px'; tap.style.top = lerp(sendY + 170, sendY + 14, ap) + 'px'
      tap.style.opacity = String(0.8 * prog(t, P.tapIn[0], P.tapIn[0] + 0.12) * (1 - ease.inQuad(prog(t, 9.45, 9.65))))
      tap.style.transform = `scale(${lerp(1.12, 1, ap) * (1 - 0.24 * press) * lerp(1, 0.7, prog(t, 9.45, 9.65))})`
      const rp = prog(t, P.press, P.press + 0.48)
      ripple.style.left = sendX + 'px'; ripple.style.top = sendY + 'px'
      ripple.style.opacity = rp > 0 && rp < 1 ? String(0.95 * (1 - ease.outQuad(rp))) : '0'
      ripple.style.transform = `scale(${lerp(0.8, 2.8, ease.outCubic(rp))})`
      send.style.transform = `scale(${(1 - 0.14 * press) * (1 - m)})`
      field.style.opacity = String(1 - prog(t, P.morph[0], P.morph[0] + 0.15))
      spinner.style.opacity = String(prog(t, 9.62, 9.72)); spinner.style.transform = `rotate(${t * 520}deg)`
      disc.style.opacity = String(ease.inOutQuad(prog(t, 9.55, 9.75)))
      glint.style.left = lerp(-140, PW + 60, prog(t, 7.0, 8.6)) + 'px'
      eyebrow.style.opacity = String(ease.outQuad(prog(t, 8.75, 9.0)) * (1 - prog(t, 9.38, 9.5)))
      big.style.opacity = String(ease.outQuad(prog(t, 6.05, 6.5)) * (1 - prog(t, 9.6, 9.9)))
      glow.style.opacity = String(ease.outQuad(prog(t, 6.05, 6.5)) * (0.75 + 0.25 * Math.sin(t * 1.3)))
    },
  }
}

// S4 · a new deck, every night (opens out of the pill's disc)
const DEAL = ['back', 'p1', 't2', 'p4', 't5', 'p6', 'ev', 't3', 'p2', 'peek', 't1', 'p5']
const DEAL_T = DEAL.map((_, i) => 9.95 + (i === 0 ? 0 : 0.3 + i * 0.19))
export const DEAL_SOUNDS = DEAL_T.slice(1)
function deckScene(stage) {
  const root = fill(stage, { background: C.void })
  const space = spaceBackdrop(root, 'amber', { seed: 6, grain: 0.18 })
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const BODY = VERT ? 900 : 620, ENTER = 0.42
  const cards = DEAL.map((k, i) => {
    const g = G[k], h = BODY, w = h * (g.b[2] - g.b[0]) / (g.b[3] - g.b[1])
    const wrap = el('div', { position: 'absolute', left: (W / 2 - w / 2) + 'px', top: (H / 2 - h / 2) + 'px', width: w + 'px', height: h + 'px', borderRadius: g.r * w + 'px', boxShadow: CARD_SHADOW, willChange: 'transform' }, persp)
    face(wrap, g, w)
    return { wrap, w, h, at: DEAL_T[i] }
  })
  const word = (txt) => el('div', { position: 'absolute', fontFamily: SANS, fontWeight: 500, fontSize: (VERT ? 92 : 84) + 'px', color: BONE, whiteSpace: 'nowrap', letterSpacing: '-0.015em', opacity: 0, lineHeight: 1, textShadow: '0 2px 22px rgba(8,4,24,0.75)' }, root, txt)
  const wTop = word('a new deck'), wBot = word('every night')
  wBot.style.fontFamily = SERIF; wBot.style.fontStyle = 'italic'; wBot.style.fontSize = (VERT ? 108 : 100) + 'px'; wBot.style.letterSpacing = '0'; wBot.style.color = ROSE
  return {
    start: T.deck, end: T.br2 + 0.25, root,
    update(t) {
      space.update(t)
      // the pill's disc opens into the deck
      const cp = ease.inOutQuad(prog(t, T.deck, T.deck + 0.55))
      root.style.clipPath = cp >= 1 ? 'none' : `circle(${36 + cp * Math.hypot(W, H) * 0.55}px at 50% 50%)`
      const pull = ease.inOutCubic(prog(t, 10.5, 11.9))
      const drift = ease.inOutQuad(prog(t, 11.9, 13.4))
      const S0 = lerp(1, VERT ? 0.8 : 0.76, pull) * lerp(1, 1.04, drift)
      const Zd = lerp(40, 200, pull)
      const baseX = VERT ? lerp(0, 120, pull) : lerp(0, 290, pull) + 20 * drift
      const baseY = VERT ? lerp(0, 150, pull) : lerp(0, -20, pull)
      const e = cards.map((c, i) => i === 0 ? 1 : ease.outCubic(prog(t, c.at, c.at + ENTER)))
      cards.forEach((c, i) => {
        if (t < c.at) { c.wrap.style.display = 'none'; return }
        let d = 0
        for (let j = i + 1; j < cards.length; j++) d += e[j]
        const s = S0 * 1400 / (1400 + Zd * d)
        let x, y, yaw, shade = 1
        if (VERT) {
          x = baseX - (lerp(16, 24, pull) * d + lerp(0, 1.4, pull) * d * d)
          y = baseY - (lerp(10, 30, pull) * d + lerp(0, 1.6, pull) * d * d)
          yaw = lerp(0, lerp(10, 14, pull), clamp(d))
        } else {
          x = baseX - (lerp(16, 76, pull) * d + lerp(0, 4.0, pull) * d * d)
          y = baseY + lerp(4, 30, pull) * d
          yaw = lerp(0, lerp(14, 28, pull), clamp(d))
        }
        let op = 1
        if (i === 0) op = ease.outQuad(prog(t, c.at, c.at + 0.3))
        else if (e[i] < 1) {
          const p = e[i]
          x += (1 - p) * (W / 2 - baseX + c.w * s * 0.6 + 80)
          yaw = lerp(-60, yaw, p)
          shade = lerp(0.55, 1, ease.inOutQuad(clamp(p * 1.25)))
        }
        const left = W / 2 + x - c.w * s / 2, top = H / 2 + y - c.h * s / 2
        const vis = left + c.w * s > -40 && left < W + 40 && top + c.h * s > -60 && top < H + 60
        c.wrap.style.display = vis ? 'block' : 'none'
        if (!vis) return
        c.wrap.style.opacity = String(op)
        c.wrap.style.filter = shade < 0.999 ? `brightness(${shade.toFixed(3)})` : 'none'
        c.wrap.style.transform = `translate(${x}px, ${y}px) perspective(2400px) rotateY(${yaw}deg) scale(${s})`
        c.wrap.style.zIndex = String(2000 - Math.round(d * 40))
      })
      const cardH = BODY * S0, fxw = W / 2 + baseX
      const showA = (a) => ease.outCubic(prog(t, a, a + 0.5))
      const hide = ease.inCubic(prog(t, 12.85, 13.2))
      if (VERT) {
        wTop.style.left = (W / 2) + 'px'; wTop.style.top = '170px'
        wBot.style.left = (W / 2) + 'px'; wBot.style.top = (H - 300) + 'px'
        wTop.style.transform = `translateX(-50%) translateY(${(1 - showA(11.0)) * 24 - 10 * hide}px)`
        wBot.style.transform = `translateX(-50%) translateY(${(1 - showA(11.35)) * 24 + 14 * hide}px)`
      } else {
        wTop.style.left = (fxw - 80) + 'px'; wTop.style.top = Math.max(60, H / 2 + baseY - cardH / 2 - 56 - 84) + 'px'
        wBot.style.left = (fxw - 40) + 'px'; wBot.style.top = (H / 2 + baseY + cardH / 2 + 44) + 'px'
        wTop.style.transform = `translateY(${(1 - showA(11.0)) * 24 - 10 * hide}px)`
        wBot.style.transform = `translateY(${(1 - showA(11.35)) * 24 + 14 * hide}px)`
      }
      wTop.style.opacity = String(showA(11.0) * (1 - hide)); wBot.style.opacity = String(showA(11.35) * (1 - hide))
      // out: the deck softens and dissolves into the rose ground of the next type beat
      const out = ease.inOutQuad(prog(t, 12.95, T.br2 + 0.25))
      persp.style.filter = out > 0.001 ? `blur(${(22 * out).toFixed(2)}px)` : 'none'
      persp.style.transform = `scale(${lerp(1, 1.06, out)})`
      root.style.opacity = String(1 - out)
    },
  }
}

// S5–S7 · { card first · face last } → Juniper's mystery card → pixel wipe → founders card (one rig)
function juniper(stage) {
  const root = fill(stage, { background: 'transparent' })
  // bracket line
  const fs = VERT ? 78 : 92
  const L = bracketLine(root, [
    { html: 'card', at: 13.45, out: 15.3 },
    { html: '&nbsp;first', at: 13.6, out: 15.33 },
    { html: `&nbsp;<span style="color:${ROSE}">·</span>&nbsp;`, at: 13.8, out: 15.36 },
    { html: `<span style="font-family:${SERIF_Q};font-style:italic;font-size:1.16em;letter-spacing:0;padding-right:0.04em">face last</span>`, at: 13.95, out: 15.39, color: [GOLD, ROSE] },
  ], { fs, chip: { w: 1, h: 1, step: 1, cards: [] } })
  const ticks = makeTicks(root, BONE, VERT ? 22 : 18)

  // card rig: cam places the focus point on screen, rig scales, the card turns in 3D inside it
  const g = G.p3
  const cw = (VERT ? 600 : 440) * U, ch = bodyH(g, cw)
  const cam = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, root)
  const rig = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, perspective: (2800 * U) + 'px' }, cam)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: cw + 'px', height: ch + 'px' }, rig)
  const shadow = el('div', { position: 'absolute', left: '8%', right: '8%', top: '92%', height: '14%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(4,2,14,0.65), rgba(4,2,14,0))', filter: `blur(${18 * U}px)` }, holder)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d', willChange: 'transform' }, holder)
  const glowE = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${60 * U}px ${8 * U}px rgba(214,170,255,0.30), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)` }, body)
  const fM = face(body, G.p3, cw)
  const fF = face(body, G.founder, cw)
  fF.face.style.opacity = '0'
  // holo shimmer round the founders border
  const ring = el('div', { position: 'absolute', inset: 0, borderRadius: G.founder.r * cw + 'px', mixBlendMode: 'screen', opacity: 0,
    padding: (0.034 * cw) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, body)
  // gold-foil sweep over the founders card
  const foil = el('div', { position: 'absolute', inset: 0, borderRadius: G.founder.r * cw + 'px', overflow: 'hidden', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    backgroundImage: 'linear-gradient(115deg, rgba(169,128,46,0) 40%, #a9802e 44%, #f2c75c 47%, #fff4cf 50%, #f2c75c 53%, #a9802e 56%, rgba(169,128,46,0) 60%)', backgroundSize: '300% 300%', backgroundRepeat: 'no-repeat' }, body)
  // pixel wipe canvas, inside the card so it rides every turn
  const CELL = 22 * U
  const wcv = el('canvas', { position: 'absolute', left: 0, top: 0, width: cw + 'px', height: ch + 'px', borderRadius: g.r * cw + 'px', imageRendering: 'pixelated' }, body)
  wcv.width = Math.round(cw); wcv.height = Math.round(ch)
  const wctx = wcv.getContext('2d')
  let grids = null
  const sampleGrids = () => {
    const grid = (imgEl, gg, cell) => {
      const cols = Math.ceil(cw / cell), rows = Math.ceil(ch / cell), c = canvas(cols, rows), x = c.getContext('2d')
      x.imageSmoothingQuality = 'high'
      x.drawImage(imgEl, gg.b[0], gg.b[1], gg.b[2] - gg.b[0], gg.b[3] - gg.b[1], 0, 0, cw / cell, ch / cell)
      return { c, cols, rows, cell }
    }
    grids = { f: [1, 0.5, 0.25].map(k => grid(fF.im, G.founder, CELL * k)), m: grid(fM.im, G.p3, CELL) }
  }
  const WP = { a: 18.0, b: 18.5, res: [18.5, 18.6, 18.7], done: 18.8 }
  const drawWipe = (t) => {
    wctx.clearRect(0, 0, wcv.width, wcv.height)
    if (t < WP.a || t >= WP.done) return
    if (!grids) sampleGrids()
    wctx.imageSmoothingEnabled = false
    if (t >= WP.b) {
      // the mosaic resolves 22 → 11 → 5.5 px, then the real card shows
      const k = t < WP.res[1] ? 0 : t < WP.res[2] ? 1 : 2, gr = grids.f[k]
      wctx.drawImage(gr.c, 0, 0, gr.cols * gr.cell, gr.rows * gr.cell)
      return
    }
    // stepped diagonal front (top-left → bottom-right); a sparkle edge leads, founder cells fill in behind
    const gr = grids.f[0], { cols, rows, cell } = gr
    const p = ease.inOutQuad(prog(t, WP.a, WP.b)), span = cols + rows + 6, front = p * span
    const tick = FI(t) >> 1
    for (let cx = 0; cx < cols; cx++) for (let cy = 0; cy < rows; cy++) {
      const stair = Math.floor((cx + cy) / 2) * 2 + rng(cx * 31 + cy * 7)() * 1.5
      const d = front - stair
      if (d <= 0) continue
      const x0 = cx * cell, y0 = cy * cell
      if (d > 2.2) { wctx.drawImage(gr.c, cx, cy, 1, 1, x0, y0, cell + 0.5, cell + 0.5); continue }
      const r = rng(cx * 977 + cy * 131), h = r(), col = SPARKS[Math.floor(r() * 5)], blink = (tick + Math.floor(r() * 4)) & 1
      if (d > 1.1) { wctx.drawImage(gr.c, cx, cy, 1, 1, x0, y0, cell + 0.5, cell + 0.5); if (h < 0.35) { wctx.fillStyle = '#fff4cf'; wctx.fillRect(x0 + cell * 0.375, y0 + cell * 0.375, cell / 4, cell / 4) } continue }
      if (h > 0.7) continue
      // a pixel star in the cell (plus shape)
      const u = cell / 5
      wctx.fillStyle = col
      wctx.fillRect(x0 + 2 * u, y0 + u * (blink ? 0 : 1), u, u * (blink ? 5 : 3)); wctx.fillRect(x0 + u * (blink ? 0 : 1), y0 + 2 * u, u * (blink ? 5 : 3), u)
      wctx.fillStyle = '#ffffff'; wctx.fillRect(x0 + 2 * u, y0 + 2 * u, u, u)
    }
  }
  // captions sit beside the card (16:9) or above / below it (9:16), never over it, so her face stays clear
  const capM = caption(root, 'Tonight’s mystery card', 'Both align.<br>Then the veil lifts.',
    VERT ? { left: 0, width: W + 'px', top: (H * 0.43 + 600 * U * 1.6 / 2 + 70) + 'px', textAlign: 'center' } : { left: W * 0.575 + 'px', top: (H / 2 - 110 * U) + 'px', textAlign: 'left' }, 0.6)
  const capF = caption(root, '✦ Founders edition', 'And there she is.',
    VERT ? { left: 0, width: W + 'px', top: 200 + 'px', textAlign: 'center' } : { left: W * 0.575 + 'px', top: (H * 0.42 - 70 * U) + 'px', textAlign: 'left' }, 0.6)
  Object.assign(capF.children[1].style, { color: GOLD, textShadow: '0 0 26px rgba(242,199,92,0.35), 0 0 30px rgba(8,4,24,0.8)' })
  // camera keys: [t, cardX, cardY, zoom, turnY, screenX, screenY] — one continuous push (monotone cubic, no stops between keys)
  const SX = VERT ? W / 2 : W * 0.34, SY = VERT ? H * 0.43 : H / 2
  const KEYS = VERT ? [
    [15.4, 0.5, 0.5, 0.86, -18, SX, SY],
    [17.7, 0.5, 0.5, 1.0, 6, SX, SY],
    [18.1, 0.5, 0.5, 1.0, 0, SX, SY],
    [19.5, 0.5, 0.44, 1.14, -3, W / 2, H * 0.46],
    [20.5, 0.5, 0.3, 1.52, 0, W / 2, H * 0.48],
    [21.4, 0.5, 0.3, 1.6, 0, W / 2, H * 0.48],
    [22.15, 0.5, 0.5, 0.9, 10, W / 2, H / 2],
  ] : [
    [15.4, 0.5, 0.5, 0.86, -18, SX, SY],
    [17.7, 0.5, 0.5, 1.0, 6, SX, SY],
    [18.1, 0.5, 0.5, 1.0, 0, SX, SY],
    [19.5, 0.5, 0.44, 1.24, -3, W * 0.33, H * 0.48],
    [20.5, 0.5, 0.3, 1.86, 0, W * 0.32, H * 0.45],
    [21.4, 0.5, 0.3, 1.95, 0, W * 0.32, H * 0.45],
    [22.15, 0.5, 0.5, 0.9, 10, W / 2, H / 2],
  ]
  // Fritsch–Carlson monotone cubic per channel (zoom in log space): velocity carries through keys, no overshoot
  const CH = [1, 2, 3, 4, 5, 6].map((c) => {
    const ts = KEYS.map(k => k[0]), vs = KEYS.map(k => c === 3 ? Math.log(k[c]) : k[c]), n = ts.length
    const d = ts.slice(1).map((t, i) => (vs[i + 1] - vs[i]) / (t - ts[i]))
    const m = vs.map((_, i) => i === 0 || i === n - 1 ? 0 : (d[i - 1] * d[i] <= 0 ? 0 : (3 * (ts[i + 1] - ts[i - 1])) / ((2 * ts[i + 1] - ts[i] - ts[i - 1]) / d[i - 1] + (ts[i + 1] + ts[i] - 2 * ts[i - 1]) / d[i])))
    return (t) => {
      if (t <= ts[0]) return vs[0]
      if (t >= ts[n - 1]) return vs[n - 1]
      let i = 0; while (t > ts[i + 1]) i++
      const h = ts[i + 1] - ts[i], u = (t - ts[i]) / h, u2 = u * u, u3 = u2 * u
      return (2 * u3 - 3 * u2 + 1) * vs[i] + (u3 - 2 * u2 + u) * h * m[i] + (-2 * u3 + 3 * u2) * vs[i + 1] + (u3 - u2) * h * m[i + 1]
    }
  })
  const camAt = (t) => ({ x: CH[0](t), y: CH[1](t), z: Math.exp(CH[2](t)), r: CH[3](t), sx: CH[4](t), sy: CH[5](t) })
  const IN = 15.3
  return {
    start: T.br2, end: 22.2, root,
    update(t) {
      // ── bracket line
      L.update(t)
      L.row.style.opacity = String(ease.outQuad(prog(t, 13.3, 13.45)) * (1 - prog(t, 15.35, 15.55)))
      L.row.style.transform = `translate(-50%,-50%) scale(${lerp(1, 1.04, prog(t, 13.4, 15.4))})`
      const k = camAt(t)
      // ticks: the line's box, then they open out to the card's corners
      ticks.update(t, (tt) => {
        const rw = L.width(tt), grow = ease.spring(prog(tt, 13.4, 14.1), 0.1)
        const bw = VERT ? Math.min(rw * lerp(1.02, 1.08, grow) + 40, 1000) : rw * lerp(1.05, 1.3, grow) + 60
        const bh = VERT ? 120 + 260 * grow : 100 + 240 * grow
        const kk = camAt(tt), mo = ease.inOutCubic(prog(tt, IN, IN + 0.55))
        const cwS = cw * kk.z * 1.1, chS = ch * kk.z * 1.06
        const ccx = kk.sx + (0.5 - kk.x) * cw * kk.z, ccy = kk.sy + (0.5 - kk.y) * ch * kk.z
        return { cx: lerp(W / 2, ccx, mo), cy: lerp(H / 2, ccy, mo), w: lerp(bw, cwS, mo), h: lerp(bh, chS, mo), op: ease.outCubic(prog(tt, 13.35, 13.7)) * (1 - prog(tt, 16.3, 16.6)) }
      })
      // ── card
      const cin = ease.outCubic(prog(t, IN + 0.1, IN + 0.75))
      cam.style.transform = `translate(${k.sx}px, ${k.sy}px)`
      rig.style.transform = `scale(${k.z * lerp(0.9, 1, cin)}) translate(${-k.x * cw}px, ${-k.y * ch}px)`
      const flat = clamp((k.z - 1.1) / 1.0), lt = t - IN
      body.style.transform = `rotateY(${k.r * (1 - 0.8 * flat)}deg) rotateX(${(4 * Math.sin(lt * 0.6) - 2) * (1 - flat)}deg) translateY(${-10 * Math.sin(lt * 0.8) * (1 - flat)}px)`
      shadow.style.opacity = String(0.8 * clamp(1 - (k.z - 1) * 8) * cin)
      const out = ease.inOutQuad(prog(t, 21.7, 22.2))
      holder.style.opacity = String(cin * (1 - out))
      holder.style.filter = cin < 1 || out > 0 ? `blur(${(lerp(10, 0, cin) + 14 * out).toFixed(2)}px)` : 'none'
      sweep(fM.glint, cw, prog(t, 16.4, 17.6))
      drawWipe(t)
      const isF = t >= WP.b
      fF.face.style.opacity = isF ? '1' : '0'
      fM.face.style.opacity = t >= WP.done ? '0' : '1'
      ring.style.opacity = String(0.55 * ease.outQuad(prog(t, WP.done, WP.done + 0.5)))
      ring.style.background = `conic-gradient(from ${(t * 80) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,214,255,0.95) 14deg, rgba(190,240,255,0.9) 26deg, rgba(255,255,255,0) 44deg, rgba(255,255,255,0) 360deg)`
      const gp = prog(t, 18.85, 19.75)
      foil.style.opacity = String(0.55 * clamp(Math.sin(Math.PI * gp) * 2.5))
      foil.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(gp))}% ${lerp(100, 0, ease.inOutQuad(gp))}%`
      glowE.style.boxShadow = isF ? `0 0 ${70 * U}px ${10 * U}px rgba(242,199,92,${0.18 + 0.1 * Math.sin(t * 2)}), 0 0 ${40 * U}px ${4 * U}px rgba(214,170,255,0.3), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)`
        : `0 0 ${60 * U}px ${8 * U}px rgba(214,170,255,0.30), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)`
      capIn(capM, t, 16.15, 17.95)
      capIn(capF, t, 20.25, 21.75)
    },
    fx(ctx, t) {
      if (t > 16.2 && t < 19.4) { const k = camAt(t); twinkleField(ctx, t, 16.2, 19.4, [k.sx - cw * 0.85, k.sy - ch * 0.62, cw * 1.7, ch * 1.24], 61, 16) }
    },
  }
}

// S8 · talk cards fan out · "then you talk / in cards"
function talkScene(stage) {
  const root = fill(stage, { background: 'transparent' })
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: (2400 * U) + 'px', perspectiveOrigin: '50% 50%' }, root)
  const CY = VERT ? H * 0.5 : H * 0.52
  const scene = el('div', { position: 'absolute', left: W / 2 + 'px', top: CY + 'px', width: 0, height: 0, transformStyle: 'preserve-3d' }, persp)
  const cw = (VERT ? 400 : 270) * U
  const SET = ['t1', 't3', 'td', 't5', 't6']
  const cards = SET.map((k, i) => {
    const g = G[k], h = bodyH(g, cw)
    const box = el('div', { position: 'absolute', left: -cw / 2 + 'px', top: -h / 2 + 'px', width: cw + 'px', height: h + 'px', transformOrigin: '50% 150%', zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2) }, scene)
    el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${46 * U}px ${5 * U}px rgba(242,199,92,0.22), 0 ${30 * U}px ${70 * U}px rgba(4,2,14,0.65)` }, box)
    const f = face(box, g, cw)
    return { box, i, ...f }
  })
  const word = (txt) => el('div', { position: 'absolute', fontFamily: SANS, fontWeight: 500, fontSize: (VERT ? 92 : 78) + 'px', color: BONE, whiteSpace: 'nowrap', letterSpacing: '-0.015em', opacity: 0, lineHeight: 1, textShadow: '0 2px 22px rgba(8,4,24,0.8)' }, root, txt)
  const wA = word('then you talk'), wB = word('in cards')
  wB.style.fontFamily = SERIF; wB.style.fontStyle = 'italic'; wB.style.fontSize = (VERT ? 112 : 96) + 'px'; wB.style.letterSpacing = '0'; wB.style.color = ROSE
  const S = T.talk
  return {
    start: S, end: T.tag + 0.5, root,
    update(t) {
      const inp = ease.outCubic(prog(t, S + 0.05, S + 0.6))
      const fan = ease.inOutCubic(prog(t, S + 0.35, S + 1.25))
      const lt = t - S
      scene.style.transform = `translateY(${lerp(140, 0, inp) * U}px) rotateX(${lerp(14, 6, inp) + 2 * Math.sin(lt * 0.6)}deg) rotateY(${lerp(-12, 10, sine(prog(t, S, T.tag + 0.4)))}deg) scale(${lerp(0.9, 1, inp) * lerp(1, 1.05, prog(t, S + 1, T.tag + 0.4))})`
      cards.forEach((c) => {
        const o = c.i - 2
        const ang = o * (VERT ? 11 : 12) * fan
        const z = -Math.abs(o) * 30 * fan
        c.box.style.transform = `translateZ(${z * U}px) translateY(${(-Math.abs(o) * 6 + Math.sin(lt * 0.9 + c.i) * 4) * U}px) rotateZ(${ang}deg)`
        c.box.style.opacity = String(inp)
        sweep(c.glint, cw, prog(t, S + 1.1 + c.i * 0.18, S + 2.2 + c.i * 0.18))
      })
      const show = (a) => ease.outCubic(prog(t, a, a + 0.55))
      const out = ease.inOutQuad(prog(t, T.tag - 0.3, T.tag + 0.25))
      if (VERT) {
        wA.style.left = wB.style.left = (W / 2) + 'px'
        wA.style.top = '250px'; wB.style.top = (H - 360) + 'px'
        wA.style.transform = `translateX(-50%) translateY(${(1 - show(S + 0.9)) * -24}px)`
        wB.style.transform = `translateX(-50%) translateY(${(1 - show(S + 1.25)) * 24}px)`
      } else {
        wA.style.left = (W / 2 - 400) + 'px'; wA.style.top = (CY - 42) + 'px'
        wB.style.left = (W / 2 + 400) + 'px'; wB.style.top = (CY - 56) + 'px'
        wA.style.transform = `translateX(-100%) translateX(${(1 - show(S + 0.9)) * -30}px)`
        wB.style.transform = `translateX(${(1 - show(S + 1.25)) * 30}px)`
      }
      wA.style.opacity = String(show(S + 0.9) * (1 - out)); wB.style.opacity = String(show(S + 1.25) * (1 - out))
      persp.style.filter = out > 0.001 ? `blur(${(24 * out).toFixed(2)}px)` : 'none'
      persp.style.opacity = String(1 - out * 0.9)
    },
    fx(ctx, t) { twinkleField(ctx, t, S + 0.5, T.tag, VERT ? [80, H * 0.2, W - 160, H * 0.6] : [W * 0.25, H * 0.1, W * 0.5, H * 0.8], 73, 14) },
  }
}

// S9 · "Dating, dealt by the stars" — typed with shimmer, then the gradient washes through, in ticks
function taglineScene(stage) {
  const root = fill(stage, { background: 'transparent' })
  const sky = fill(root, { background: 'transparent' })
  const aur = spaceBackdrop(sky, 'aurora', { seed: 7, grain: 0.2, stars: 190 })
  fill(sky, { background: 'radial-gradient(70% 62% at 50% 46%, rgba(9,4,26,0.72) 0%, rgba(9,4,26,0.45) 60%, rgba(9,4,26,0.1) 100%)' })
  const BLOOM = [['232,98,138', 0.3, 760], ['180,92,255', 0.7, 820], ['242,154,74', 0.52, 560]].map(([c, x, r], i) => ({ x, r, i,
    e: el('div', { position: 'absolute', width: r * 2 + 'px', height: r * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen', background: `radial-gradient(closest-side, rgba(${c},0.62), rgba(${c},0.25) 48%, rgba(${c},0) 100%)` }, sky) }))
  const TXT = VERT ? 'Dating, dealt\nby the stars' : 'Dating, dealt by the stars'
  const fs = VERT ? 96 : 92
  const base = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'pre', fontFamily: SANS, fontWeight: 500, fontSize: fs + 'px', letterSpacing: '-0.02em', lineHeight: VERT ? 1.12 : 1, textAlign: 'center' }
  const plain = el('div', { ...base, textShadow: '0 0 38px rgba(232,98,138,0.28), 0 2px 18px rgba(8,4,24,0.75)' }, root)
  const chars = [...TXT].map(ch => ch === '\n' ? (plain.appendChild(el('br')), null) : el('span', { opacity: 0 }, plain, ch === ' ' ? ' ' : ch)).filter(Boolean)
  const grad = el('div', { ...base, color: 'transparent', backgroundImage: 'linear-gradient(90deg, #ff8fb1 0%, #ffd9a0 30%, #f2c75c 50%, #e3c8ff 72%, #b9a0ff 100%)', backgroundSize: '220% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', opacity: 0 }, root, TXT.replace('\n', '<br>'))
  const ticks = makeTicks(root, BONE, VERT ? 20 : 16)
  const S = T.tag, TY = S + 0.12, PER = 0.034
  let tw = 0, th = 0
  return {
    start: S - 0.1, end: T.end + 0.4, root,
    update(t) {
      const rp = ease.outCubic(prog(t, S - 0.1, S + 0.6))
      if (rp >= 1) sky.style.webkitMaskImage = sky.style.maskImage = 'none'
      else { const e1 = lerp(-32, 100, rp), m = `linear-gradient(0deg, #000 ${e1.toFixed(1)}%, transparent ${(e1 + 32).toFixed(1)}%)`; sky.style.webkitMaskImage = sky.style.maskImage = m }
      aur.update(t)
      BLOOM.forEach(b => {
        const up = ease.outCubic(prog(t, S + b.i * 0.06, S + 0.9 + b.i * 0.06))
        b.e.style.transform = `translate(${b.x * W - b.r + Math.sin(t * 0.4 + b.i * 2) * 60}px, ${lerp(1.5, VERT ? 0.95 : 1.05, up) * H - b.r}px)`
        b.e.style.opacity = String(lerp(0.9, 0.45, prog(t, S + 0.6, S + 1.6)))
      })
      if (!tw) { tw = plain.offsetWidth; th = plain.offsetHeight }
      const ACC = ['#ffffff', '#ffe3c4', '#ecdcff']
      chars.forEach((c, i) => {
        const p = prog(t - TY, i * PER, i * PER + 0.28)
        c.style.opacity = String(ease.outQuad(p))
        c.style.color = p >= 1 ? '#fff6ea' : mix(ACC[i % 3], '#fff6ea', ease.inQuad(p))
      })
      const done = TY + chars.length * PER + 0.25
      const gp = ease.inOutQuad(prog(t, done, done + 0.6))
      grad.style.opacity = String(gp); plain.style.opacity = String(1 - 0.85 * gp)
      grad.style.backgroundPosition = `${lerp(100, 0, prog(t, done, T.wipe3))}% 0`
      const push = 1 + 0.03 * prog(t, TY, T.wipe3 + 0.4)
      plain.style.transform = grad.style.transform = `translate(-50%,-50%) scale(${push})`
      ticks.update(t, (tt) => {
        const o = ease.outCubic(prog(tt, TY - 0.05, TY + 0.4))
        return { cx: W / 2, cy: H / 2, w: (tw + (VERT ? 110 : 130)) * push, h: VERT ? lerp(th - 30, th + 70, o) : lerp(100, 170, o), op: prog(tt, TY - 0.05, TY + 0.05) }
      })
    },
  }
}

// S10 · the Align mark
function endCard(stage) {
  const root = fill(stage, { background: C.void })
  const stars = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); stars.width = W; stars.height = H
  { const x = stars.getContext('2d'), r = rng(77); for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(255,247,236,${0.15 + r() * 0.5})`; x.beginPath(); x.arc(r() * W, r() * H, 0.4 + r() * 1.3, 0, 7); x.fill() } }
  const cy = VERT ? 720 : 400
  const S = (VERT ? 460 : 330) / 88
  const glow = el('div', { position: 'absolute', left: (W / 2 - 800 * U) + 'px', top: (cy - 700 * U) + 'px', width: 1600 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(201,166,255,0.32), rgba(180,92,255,0) 100%)' }, root)
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${cy + 120}px` })
  const mark = markSVG(lock, 88 * S, W / 2, cy, 'em')
  const wy = cy + 44 * S + (VERT ? 40 : 22)
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wy + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 180 : 136) + 'px', lineHeight: 1, color: BONE, textShadow: '0 0 40px rgba(239,230,214,0.25)', opacity: 0 }, lock, 'Align')
  const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 228 : 176)) + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: (VERT ? 42 : 34) + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: GOLD, textShadow: '0 0 18px rgba(242,199,92,0.45), 0 1px 2px rgba(4,2,14,0.6)', opacity: 0 }, lock, 'HOUSTON BETA')
  const black = fill(root, { background: '#000', opacity: 0 })
  const E = T.end
  return {
    start: E, end: DURATION, root,
    update(t) {
      const lt = t - E
      mark.draw(lt - 0.1)
      glow.style.opacity = String(ease.outQuad(prog(lt, 0.4, 1.4)))
      const wp = ease.outCubic(prog(lt, 0.95, 1.6))
      word.style.opacity = String(wp); word.style.letterSpacing = lerp(0.14, 0.01, wp) + 'em'; word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      const tp = ease.outQuad(prog(lt, 1.35, 1.9))
      tag.style.opacity = String(tp); tag.style.letterSpacing = tag.style.textIndent = lerp(0.6, 0.42, tp) + 'em'
      lock.style.transform = `scale(${1 + 0.035 * ease.inOutQuad(prog(lt, 0, DURATION - E))})`
      black.style.opacity = String(ease.inQuad(prog(t, DURATION - 0.45, DURATION - 0.05)))
    },
    fx(ctx, t) { twinkleField(ctx, t, E + 0.6, DURATION - 0.5, [W * 0.15, cy - 300 * U, W * 0.7, 640 * U], 97, 10) },
  }
}

/** shared fx: pixel twinkles on one coarse grid (blown up), plus the feature's stair wipes */
function fxScene(built) {
  const cv = document.createElement('canvas'); cv.width = Math.ceil(W / PIX); cv.height = Math.ceil(H / PIX)
  const c = cv.getContext('2d')
  return {
    start: 0, end: DURATION, root: null, update() {},
    fx(ctx, t) {
      c.clearRect(0, 0, cv.width, cv.height)
      for (const s of built) if (s.fx && t >= s.start && t < s.end) s.fx(c, t)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(cv, 0, 0, cv.width * PIX, cv.height * PIX)
      fxStairWipe(ctx, t, { start: T.wipe1, dur: 0.6, color: '#140a30' })
      fxStairWipe(ctx, t, { start: T.wipe3, dur: 0.36, color: '#0b0620', fromBottom: true, seed: 9 })
    },
  }
}

const builders = [bg, bracket1, pillScene, deckScene, juniper, talkScene, taglineScene, opener, endCard]
export const SCENES = [
  (stage) => {
    // build every scene here so z-order is explicit (main.js only sets it for top-level scenes)
    const Z = { bg: 1, bracket1: 20, pillScene: 21, deckScene: 22, juniper: 24, talkScene: 25, taglineScene: 26, opener: 30, endCard: 40 }
    const built = builders.map((b) => { const s = b(stage); s.root.style.zIndex = String(Z[b.name]); return s })
    const fx = fxScene(built)
    return {
      start: 0, end: DURATION, root: null,
      update(t) { for (const s of built) { const on = t >= s.start && t < s.end; s.root.style.display = on ? 'block' : 'none'; if (on) s.update(t) } },
      fx: fx.fx,
    }
  },
]

// ── sound cues (teaser-sound format)
const D = [293.66, 369.99, 440, 554.37, 587.33, 739.99, 880]
export const CUES = [
  // S1: a soft pluck as each word lands (a rising line), a shimmer under "Space City."
  ...S1_WORDS.map(([, at], i) => ['pluck', at + 0.04, [587.33, 659.25, 739.99, 880, 739.99, 987.77, 1174.66][i], 0.04, 0.6, (i - 3) * 0.15]),
  ['glitter', 1.95, 2.5],
  ['whoosh', T.wipe1 + 0.3, 0.7, 0.12],
  ...[0, 0.12, 0.24, 0.36, 0.48].map((d, i) => ['tick', T.wipe1 + 0.05 + d, 0.05 + i * 0.006]),
  // S2: bracket pops + chip flick ticks
  ['pop', 3.6, 660, 0.05], ['pop', 3.82, 880, 0.045], ['pop', 4.05, 740, 0.05], ['pop', 4.2, 990, 0.055],
  ...Array.from({ length: 10 }, (_, i) => ['tick', 3.9 + i * 0.1, 0.025]),
  ['bell', 4.32, 1174.66, 0.03, 1.4, 0.2],
  ['whoosh', 5.98, 0.5, 0.08],
  // S3: pill rises, zoom whoosh, typing, send
  ['pop', 6.12, 520, 0.05], ['whoosh', 6.85, 0.6, 0.1],
  ...PILL_KEYS.map((k) => ['tick', k, 0.07]),
  ['whoosh', 9.0, 0.55, 0.08], ['tick', 9.25, 0.16], ['pop', 9.26, 1040, 0.06],
  ['riser', 9.3, 9.8, 0.05],
  // S4: circle opens, cards dealt
  ['whoosh', 9.95, 0.8, 0.14], ['bell', 10.0, 587.33, 0.04, 1.6, 0],
  ...DEAL_SOUNDS.map((d, i) => ['tick', d + 0.18, 0.09 - i * 0.003]),
  ['whoosh', 10.7, 1.1, 0.06],
  ['pluck', 11.02, 739.99, 0.04, 0.6, -0.2], ['pluck', 11.37, 987.77, 0.04, 0.6, 0.2],
  ['whoosh', 13.2, 0.8, 0.09],
  // S5: second bracket line
  ['pop', 13.45, 660, 0.05], ['pop', 13.6, 740, 0.05], ['pop', 13.8, 1320, 0.035], ['pop', 13.95, 990, 0.055],
  ['whoosh', 15.6, 0.8, 0.1], ['bell', 15.9, 493.88, 0.04, 2.0, -0.2], ['bell', 16.0, 739.99, 0.03, 2.0, 0.2],
  ['glitter', 16.5, 17.4],
  // S6/S7: pixel wipe, reveal, foil, push, badge
  ...Array.from({ length: 8 }, (_, i) => ['tick', 18.0 + i * 0.065, 0.05]),
  ['glitter', 18.0, 18.6],
  ['bell', 18.55, 739.99, 0.06, 2.4, -0.25], ['bell', 18.63, 1108.73, 0.045, 2.4, 0.25], ['boom', 18.55, 0.18],
  ...[1174.66, 1318.51, 1479.98, 1760, 1975.53, 2349.32].map((f, k) => ['bell', 18.95 + k * 0.08, f, 0.018, 0.6, k / 3 - 1]),
  ['whoosh', 19.9, 1.2, 0.08],
  ['bell', 20.45, 587.33, 0.05, 2.4, -0.2], ['bell', 20.65, 880, 0.04, 2.4, 0.2],
  ['whoosh', 21.95, 0.9, 0.1],
  // S8: talk cards fan
  ...[0, 1, 2, 3, 4].map((i) => ['tick', T.talk + 0.45 + i * 0.12, 0.05]),
  ['pluck', T.talk + 0.95, 659.25, 0.04, 0.6, -0.2], ['pluck', T.talk + 1.3, 880, 0.045, 0.6, 0.2],
  // S9: tagline typing + shimmer
  ['whoosh', T.tag + 0.1, 0.9, 0.1],
  ...'Dating, dealt by the stars'.split('').map((ch, i) => ch === ' ' ? null : ['tick', T.tag + 0.12 + i * 0.034, 0.035]).filter(Boolean),
  ['glitter', T.tag + 1.4, T.tag + 2.0],
  ['whoosh', T.wipe3 + 0.2, 0.5, 0.1],
  // S10: end mark
  ...D.map((f, i) => ['bell', T.end + 0.35 + i * 0.07, f, 0.05, 2.4, (i - 3) * 0.12]),
  ['bell', T.end + 1.0, 293.66, 0.05, 3.2, 0], ['bell', T.end + 1.0, 440, 0.04, 3.2, 0],
]
