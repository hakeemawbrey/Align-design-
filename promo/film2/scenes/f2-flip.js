// F2 · THE FLIP (4.0–6.7s). The last face card has just slammed to a stop (pose shared with f1). It holds a beat
// while "What if we flipped it?" lands, winds up, and FLIPS in 3D: its back is Align's mystery card (Juniper's veiled
// card). At the edge-on frame the cold world inverts — a flash, the grainy deep-space nebula (S1's look, 16:9) blooms
// out from the card, a pixel-star burst and a shock ring. The card settles to the agreed hand-off pose for f3:
//   card BODY 520 × 830 px, centred at (960, 470), no rotation, from 5.55s to 6.7s (static).
import { clamp, lerp, prog, ease, rng, noise1, el, C, PIXEL_PALETTE } from '../../src/lib.js'
import { W, H, A, SERIF, fill, img } from '../../src/scenes/common.js'
import { drawMoon } from '../../src/scenes/fx-moon.js'
import { CARD_W, CARD_H, SLAM, LAST_FACE, coldBackdrop, makeFaceCard, lastCardPose, grainLayer, blurDefs } from './f1-old.js'

const START = 4.0, END = 6.7
export const END_X = 960, END_Y = 470, END_W = 520                 // hand-off pose (card body)
const WIND = 4.5, FLIP0 = 4.62, FLIP1 = 5.1, SETTLE = 5.55
const EDGE = 4.865                                                 // card edge-on → the world inverts
const BONE = '#efe6d6'

// ─────────────────────────────── nebula (copied from s1-imagine.js buildNebula, 16:9 branch only)
const BGW = 2304, BGH = 1296, NEB_RES = 2, BAND_A = -0.42
function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function vnoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, seed), b = hash2(ix + 1, iy, seed), c = hash2(ix, iy + 1, seed), d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, seed, oct = 5) {
  let v = 0, amp = 0.5, f = 1, norm = 0
  for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, seed + o * 17); norm += amp; amp *= 0.5; f *= 2.03 }
  return v / norm
}
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

let NEB = null
/** S1's nebula plate (2304×1296, indigo void, violet→rose→amber emission, dust lanes). Cached; exported for reuse. */
export function buildNebula() {
  if (NEB) return NEB
  const w = Math.ceil(BGW / NEB_RES), h = Math.ceil(BGH / NEB_RES)
  const lo = canvas(w, h), lx = lo.getContext('2d')
  const id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e')
  const pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => { const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i; return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f) }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w, nx = u * 4.6, ny = v * 2.6
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4)
      const qx = nx + 2.4 * wx, qy = ny + 2.4 * wy
      const d = fbm(qx, qy, 37, 6)
      const arc = Math.exp(-Math.pow((v - (0.18 + 0.75 * u * u * 0.9)) / 0.32, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.78) / 0.28, 2) + Math.pow((v - 0.82) / 0.26, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.2) / 0.3, 2) + Math.pow((v - 0.16) / 0.24, 2)))
      const mask = clamp(0.08 + 0.85 * arc + 1.1 * lowR + 0.8 * upL, 0, 1.7)
      const fr = 1 - Math.abs(fbm(qx * 2.1 + 5.5, qy * 2.1 + 0.7, 89, 5) - 0.5) * 2
      const cloud = smooth(0.4, 0.82, d)
      let e = mask * (0.55 * cloud * cloud + 0.75 * Math.pow(fr, 7) * smooth(0.3, 0.7, d) + 0.06 * smooth(0.25, 0.6, d))
      e = 1 - Math.exp(-e * 1.8)
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.05 + 0.6 * u + 0.45 * v + (cn - 0.5) * 1.2) * 0.9)
      const dn = fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 5)
      const dust = smooth(0.66, 0.95, 1 - Math.abs(dn - 0.5) * 2) * 0.95
      const k = 1 - dust, o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) { const base = top[c] + (bot[c] - top[c]) * v; px[o + c] = clamp((base * (1 - dust * 0.35) + col[c] * e * 0.78 * k) / 255) * 255 }
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'; nx.filter = 'blur(1.2px)'; nx.drawImage(lo, 0, 0, BGW, BGH); nx.filter = 'none'
  const bl = canvas(BGW / 4, BGH / 4), blx = bl.getContext('2d')
  blx.filter = 'blur(10px)'; blx.drawImage(neb, 0, 0, BGW / 4, BGH / 4)
  nx.globalCompositeOperation = 'screen'; nx.globalAlpha = 0.42; nx.drawImage(bl, 0, 0, BGW, BGH)
  nx.globalAlpha = 1
  const glow = (x, y, r, rgba) => { const g = nx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba); g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)')); nx.fillStyle = g; nx.fillRect(x - r, y - r, 2 * r, 2 * r) }
  glow(BGW * 0.80, BGH * 0.84, 520, 'rgba(232,98,138,0.26)')
  glow(BGW * 0.86, BGH * 0.90, 260, 'rgba(242,154,74,0.2)')
  glow(BGW * 0.18, BGH * 0.14, 560, 'rgba(154,123,224,0.20)')
  glow(BGW * 0.30, BGH * 0.22, 300, 'rgba(180,92,255,0.12)')
  glow(BGW * 0.62, BGH * 0.12, 380, 'rgba(154,123,224,0.08)')
  const GL = Math.max(BGW, BGH)
  nx.save(); nx.translate(BGW * 0.5, BGH * 0.5); nx.rotate(BAND_A); nx.scale(1, 0.14)
  const gb = nx.createRadialGradient(0, 0, 0, 0, 0, GL * 0.62)
  gb.addColorStop(0, 'rgba(201,166,255,0.09)'); gb.addColorStop(0.6, 'rgba(154,123,224,0.04)'); gb.addColorStop(1, 'rgba(154,123,224,0)')
  nx.fillStyle = gb; nx.fillRect(-GL, -GL, GL * 2, GL * 2); nx.restore()
  nx.globalCompositeOperation = 'source-over'
  NEB = neb
  return neb
}
function buildStars(n, seed, { rMin, rMax, aMin, aMax, band = 0 }) {
  const c = canvas(BGW, BGH), x = c.getContext('2d'), r = rng(seed)
  const tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236', '255,236,205']
  for (let i = 0; i < n; i++) {
    let sx = r() * BGW, sy = r() * BGH
    if (band && r() < band) {
      const t = r() * 2 - 1, off = (r() + r() + r() - 1.5) * 90, GL = Math.max(BGW, BGH)
      sx = BGW * 0.5 + t * GL * 0.6 * Math.cos(BAND_A) - off * Math.sin(BAND_A)
      sy = BGH * 0.5 + t * GL * 0.6 * Math.sin(BAND_A) + off * Math.cos(BAND_A)
    }
    const s = rMin + Math.pow(r(), 2.2) * (rMax - rMin), a = aMin + r() * (aMax - aMin)
    x.fillStyle = `rgba(${tints[Math.floor(r() * tints.length)]},${a})`
    x.beginPath(); x.arc(sx, sy, s, 0, Math.PI * 2); x.fill()
  }
  return c
}
function buildStarSprite(spikes) {
  const S = 160, c = canvas(S, S), x = c.getContext('2d'), m = S / 2
  const g = x.createRadialGradient(m, m, 0, m, m, m)
  g.addColorStop(0, 'rgba(255,250,240,1)'); g.addColorStop(0.04, 'rgba(255,246,232,0.95)')
  g.addColorStop(0.12, 'rgba(226,206,255,0.35)'); g.addColorStop(0.35, 'rgba(180,140,255,0.08)'); g.addColorStop(1, 'rgba(180,140,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, S, S)
  if (spikes) {
    x.globalCompositeOperation = 'lighter'
    for (const [dx, dy, len] of [[1, 0, 1], [0, 1, 1], [0.707, 0.707, 0.35], [0.707, -0.707, 0.35]]) {
      const L = m * len, lg = x.createLinearGradient(m - dx * L, m - dy * L, m + dx * L, m + dy * L)
      lg.addColorStop(0, 'rgba(255,240,230,0)'); lg.addColorStop(0.5, `rgba(255,244,236,${len > 0.5 ? 0.7 : 0.3})`); lg.addColorStop(1, 'rgba(255,240,230,0)')
      x.strokeStyle = lg; x.lineWidth = len > 0.5 ? 1.6 : 1
      x.beginPath(); x.moveTo(m - dx * L, m - dy * L); x.lineTo(m + dx * L, m + dy * L); x.stroke()
    }
  }
  return c
}

// ─────────────────────────────── pixel-art star sprites (same art as fx-stars.js)
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}
const HOT = '#fff3e0', STAR_PAL = [BONE, BONE, C.gold, '#c9a6ff', '#ff8fb1', ...PIXEL_PALETTE]

// burst: pixel stars thrown out from the card's rim at the inversion
const BURST = (() => {
  const r = rng(4242)
  return Array.from({ length: 110 }, (_, i) => {
    const a = r() * Math.PI * 2
    const rim = 1 / Math.max(Math.abs(Math.cos(a)) / 250, Math.abs(Math.sin(a)) / 400)   // start on the card's outline
    return { a, rim, v: 500 + Math.pow(r(), 1.6) * 1500, life: 0.7 + r() * 1.1, px: 3 + Math.floor(r() * 4), kind: r() < 0.35 ? 0 : (r() < 0.5 ? 1 : 3),
      col: STAR_PAL[Math.floor(r() * STAR_PAL.length)], d: r() * 0.12, ph: Math.floor(r() * 4) }
  })
})()
// ambient pixel stars that settle into the new sky (kept clear of the card + caption)
const AMBIENT = (() => {
  const r = rng(777), out = []
  while (out.length < 34) {
    const x = 40 + r() * (W - 80), y = 30 + r() * (H - 60)
    if (x > 600 && x < 1320) continue
    out.push({ x, y, px: 3 + Math.floor(r() * 2), kind: r() < 0.25 ? 0 : (r() < 0.6 ? 1 : 2), col: STAR_PAL[Math.floor(r() * 5)], t0: EDGE + 0.12 + r() * 0.7, sp: 1.5 + r() * 3, seed: out.length * 7 + 3 })
  }
  return out
})()

export default function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // cold world (identical to f1's, shown once f1 is gone at 4.2)
  const cold = coldBackdrop(root)
  // the new sky: nebula + stars + moon on a canvas, revealed by a radial bloom from the card
  const skyC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', opacity: 0 }, root)
  skyC.width = W; skyC.height = H
  const bx = skyC.getContext('2d')
  const neb = buildNebula()
  const far = buildStars(7000, 101, { rMin: 0.45, rMax: 1.0, aMin: 0.3, aMax: 0.8, band: 0.45 })
  const mid = buildStars(1600, 202, { rMin: 0.7, rMax: 1.5, aMin: 0.5, aMax: 1 })
  const near = buildStars(160, 303, { rMin: 1.1, rMax: 2.2, aMin: 0.75, aMax: 1 })
  const spriteS = buildStarSprite(true), spriteG = buildStarSprite(false)
  const rb = rng(404), bright = []
  while (bright.length < 30) {
    const x = rb() * W, y = rb() * H
    if (x > 620 && x < 1300) continue
    bright.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 110, spike: bright.length < 7, seed: 500 + bright.length, sp: 1.6 + rb() * 3, depth: rb() })
  }
  const vig = canvas(W, H), vx = vig.getContext('2d')
  const vg = vx.createRadialGradient(W / 2, H * 0.46, H * 0.3, W / 2, H * 0.5, H * 1.08)
  vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.65, 'rgba(11,6,32,0.35)'); vg.addColorStop(1, 'rgba(8,4,24,0.85)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  // behind-card halo + caption pocket (keeps bone type ≥ 4.5:1 over the nebula)
  const pocket = canvas(W, H), pk = pocket.getContext('2d')
  pk.save(); pk.translate(W / 2, 968); pk.scale(1, 0.13)
  const pg = pk.createRadialGradient(0, 0, 0, 0, 0, 760)
  pg.addColorStop(0, 'rgba(11,6,32,0.6)'); pg.addColorStop(0.7, 'rgba(11,6,32,0.3)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
  pk.fillStyle = pg; pk.fillRect(-1000, -1000, 2000, 2000); pk.restore()

  // ── the card (3D): front = cold face card, back = Align mystery card (card-profile-3 body 120..1374 × 114..2116)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, root)
  const card3d = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }, holder)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, card3d)
  const face = makeFaceCard(front, LAST_FACE, 5)
  const fLight = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px', borderRadius: '30px', overflow: 'hidden', pointerEvents: 'none' }, front)
  const fGlint = el('div', { position: 'absolute', left: 0, top: '-25%', width: '55%', height: '150%', mixBlendMode: 'screen',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(230,236,255,0.55) 50%, rgba(255,255,255,0) 100%)', opacity: 0 }, fLight)
  const fWash = el('div', { position: 'absolute', inset: 0, background: '#dfe6ff', mixBlendMode: 'screen', opacity: 0 }, fLight)

  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, card3d)
  const SC = CARD_W / 1254                                   // card-profile-3 px → stage px (body 1254 → 520)
  const R = 84 * SC
  const bGlow = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px', borderRadius: R + 'px',
    boxShadow: '0 0 46px 8px rgba(190,140,255,0.42), 0 36px 90px rgba(5,2,18,0.6)' }, back)
  const bBody = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px', borderRadius: R + 'px', overflow: 'hidden' }, back)
  img(bBody, A + 'card-profile-3.png', { left: -120 * SC + 'px', top: -114 * SC + 'px', width: 1496 * SC + 'px', height: 2238 * SC + 'px' })
  const bGlint = el('div', { position: 'absolute', left: 0, top: '-25%', width: '34%', height: '150%', mixBlendMode: 'screen',
    background: 'linear-gradient(90deg, rgba(255,220,150,0) 0%, rgba(255,226,170,0.3) 42%, rgba(255,250,235,0.62) 50%, rgba(255,226,170,0.3) 58%, rgba(255,220,150,0) 100%)', opacity: 0 }, bBody)
  const bWash = el('div', { position: 'absolute', inset: 0, background: '#f3e6ff', mixBlendMode: 'screen', opacity: 0 }, bBody)
  const [mbF, mbB] = blurDefs(root, 2, 'f2mb')
  face.card.style.filter = 'url(#f2mb0)'
  bBody.style.filter = 'url(#f2mb1)'

  // caption
  const capBox = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '928px', textAlign: 'center', whiteSpace: 'nowrap',
    fontFamily: SERIF, fontStyle: 'italic', fontSize: '76px', lineHeight: 1, color: BONE, textShadow: '0 2px 30px rgba(5,4,16,0.9), 0 0 2px rgba(5,4,16,0.6)' }, root)
  const capWords = 'What if we flipped it?'.split(' ').map((w, i) => ({ t: 4.14 + i * 0.075, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, capBox, w) }))

  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(60% 75% at 50% 44%, rgba(255,246,236,0.95) 0%, rgba(201,166,255,0.6) 40%, rgba(120,70,220,0.15) 75%, rgba(0,0,0,0) 100%)' }, root)
  const slamFlash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
    background: 'radial-gradient(50% 70% at 50% 46%, rgba(220,230,255,0.9) 0%, rgba(160,175,210,0.25) 60%, rgba(0,0,0,0) 100%)', mixBlendMode: 'screen' }, root)
  const grain = grainLayer(root, 0.6)

  const flipAngle = t => {
    if (t < WIND) return 0
    if (t < FLIP0) return -11 * ease.outQuad(prog(t, WIND, FLIP0))
    if (t < FLIP1) return lerp(-11, 188, ease.inOutCubic(prog(t, FLIP0, FLIP1)))
    const u = prog(t, FLIP1, SETTLE)
    return 180 + 8 * Math.exp(-u * 5) * Math.cos(u * 9.5)
  }

  return {
    start: START, end: END, root,
    fxStart: EDGE - 0.02, fxEnd: END,
    update(t) {
      const fr = Math.round(t * 30)
      // cold world on until the bloom has covered it
      const showCold = t >= 4.19 && t < 5.45
      cold.root.style.display = showCold ? 'block' : 'none'
      if (showCold) cold.update(t)

      // ── card pose: f1's slam pose → hold → wind-up → flip (lift) → settle at the hand-off pose
      const p0 = lastCardPose(Math.min(t, WIND))
      const k = ease.inOutCubic(prog(t, FLIP0, SETTLE - 0.1))
      const ang = flipAngle(t)
      const fu = prog(t, FLIP0, FLIP1), lift = Math.sin(Math.PI * fu)
      const x = lerp(p0.x, END_X, k), y = lerp(p0.y, END_Y, k) - 34 * lift
      const s = lerp(p0.s, 1, k) * (1 + 0.1 * lift) * (t > FLIP1 ? 1 + 0.025 * Math.exp(-(t - FLIP1) * 9) * Math.sin((t - FLIP1) * 20) : 1)
      const rz = lerp(p0.rot, 0, k) - 4 * lift
      const rx = 7 * lift
      holder.style.transform = `translate(${x}px, ${y}px) rotate(${rz}deg) scale(${s})`
      card3d.style.transform = `perspective(2000px) rotateX(${rx}deg) rotateY(${ang}deg)`
      // motion blur ∝ angular speed (horizontal smear of the card's turning edge)
      const dAng = Math.abs(flipAngle(t + 1 / 60) - flipAngle(t - 1 / 60))     // deg per frame
      const smear = t < FLIP0 ? 0 : Math.min(26, dAng * Math.PI / 180 * 260 * 0.32 * Math.abs(Math.sin(ang * Math.PI / 180)) + dAng * 0.2)
      mbF.setAttribute('stdDeviation', `${smear.toFixed(1)} 0.5`); mbB.setAttribute('stdDeviation', `${smear.toFixed(1)} 0.5`)
      // light: front catches a cold glint as it turns away; back gets a warm gold glint as it lands, then a second slow pass
      const ca = Math.cos(ang * Math.PI / 180)
      fGlint.style.opacity = String(clamp(1 - Math.abs(ang - 45) / 45))
      fGlint.style.transform = `translateX(${lerp(-110, 230, clamp(ang / 90))}%) rotate(16deg)`
      fWash.style.opacity = String(0.55 * clamp(1 - ca) * (ang < 90 ? 1 : 0))
      const g1 = prog(t, EDGE, FLIP1 + 0.18), g2 = prog(t, 5.62, 6.2)
      const gl = g1 > 0 && g1 < 1 ? g1 : g2
      bGlint.style.opacity = String((g1 > 0 && g1 < 1) ? 1 : (g2 > 0 && g2 < 1 ? 0.55 * Math.sin(Math.PI * g2) : 0))
      bGlint.style.transform = `translateX(${lerp(240, -140, gl)}%) rotate(16deg)`
      bWash.style.opacity = String(ang > 90 ? 0.75 * clamp(1 + ca) * (1 - prog(t, EDGE, FLIP1 + 0.1)) + 0.45 * clamp(1 + ca) : 0)
      bGlow.style.opacity = String(ease.outQuad(prog(t, EDGE, 5.3)))

      // ── the new sky: bloom from the card at the edge-on frame
      const bloom = prog(t, EDGE, EDGE + 0.62)
      if (bloom > 0) {
        skyC.style.opacity = '1'
        const rad = 40 + 2300 * ease.outCubic(bloom)
        skyC.style.webkitMaskImage = skyC.style.maskImage = bloom >= 1 ? 'none'
          : `radial-gradient(circle at ${END_X}px ${END_Y}px, #000 ${rad * 0.55}px, rgba(0,0,0,0.55) ${rad * 0.8}px, transparent ${rad}px)`
        const ex = 1 + 0.9 * Math.exp(-prog(t, EDGE, EDGE + 1.0) * 4)                    // over-exposed bloom settling
        skyC.style.filter = `brightness(${ex.toFixed(3)}) saturate(${(1 + 0.3 * (ex - 1)).toFixed(3)})`
        drawSky(t)
      } else skyC.style.opacity = '0'

      // slam impact: a cold pop on the stop; the cold world flashes negative for two frames right before it inverts
      slamFlash.style.opacity = String(t >= SLAM ? 0.32 * Math.exp(-(t - SLAM) * 16) : 0)
      cold.root.style.filter = (t >= EDGE - 0.1 && t < EDGE - 0.035) ? 'invert(1) hue-rotate(180deg) brightness(0.8)' : ''
      // flash: a hard white-violet pop at the inversion (2 frames), decaying
      const fl = t >= EDGE - 0.035 ? Math.exp(-(t - EDGE + 0.035) * 7) : 0
      flash.style.opacity = String(clamp(fl * 0.95))

      // caption: lands in the hold, stays through the flip, clears for f3
      const out = 1 - ease.inOutQuad(prog(t, 6.18, 6.45))
      for (const w of capWords) {
        const p = prog(t, w.t, w.t + 0.2), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 20}px)`
        w.e.style.filter = p < 1 ? `blur(${(1 - e) * 7}px)` : 'none'
      }
      grain.el.style.display = t >= 4.19 ? 'block' : 'none'
      if (t >= 4.19) grain.update(t)
      void fr
    },
    fx(ctx, t) {
      ctx.save()
      ctx.imageSmoothingEnabled = false
      const dt = t - EDGE
      const tick = Math.round(t * 30) >> 1
      // shock ring (soft violet) + pixel ring of sparks riding it
      if (dt > 0 && dt < 0.75) {
        const u = dt / 0.75, rr = 300 + 1700 * ease.outCubic(u), a = Math.pow(1 - u, 2)
        ctx.globalCompositeOperation = 'lighter'
        ctx.filter = 'blur(6px)'
        ctx.strokeStyle = `rgba(201,166,255,${0.45 * a})`; ctx.lineWidth = 10 + 40 * (1 - u)
        ctx.beginPath(); ctx.ellipse(END_X, END_Y, rr, rr * 0.9, 0, 0, Math.PI * 2); ctx.stroke()
        ctx.filter = 'none'
        ctx.strokeStyle = `rgba(255,243,224,${0.35 * a})`; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.ellipse(END_X, END_Y, rr * 0.985, rr * 0.885, 0, 0, Math.PI * 2); ctx.stroke()
        ctx.globalCompositeOperation = 'source-over'
      }
      // burst
      for (const b of BURST) {
        const lt = dt - b.d
        if (lt <= 0 || lt > b.life) continue
        const u = lt / b.life
        const dist = b.rim * 0.9 + b.v * (1 - Math.exp(-lt * 3.2)) / 3.2
        const x = END_X + Math.cos(b.a) * dist, y = END_Y + Math.sin(b.a) * dist * 0.92 + 40 * lt * lt
        ctx.globalAlpha = clamp((1 - u) * 1.6) * (((tick + b.ph) & 3) === 0 ? 0.55 : 1)
        sprite(ctx, x, y, b.px, ((tick + b.ph) & 1) ? b.kind : 2, b.col, HOT)
      }
      // ambient pixel stars twinkle on in the new sky (fade before the hand-off so f3 owns its own)
      const amb = 1 - prog(t, 6.3, 6.62)
      for (const a of AMBIENT) {
        const on = ease.outQuad(prog(t, a.t0, a.t0 + 0.25)) * amb
        if (on <= 0.01) continue
        const tw2 = 0.55 + 0.45 * noise1(t * a.sp, a.seed)
        ctx.globalAlpha = on * tw2
        sprite(ctx, a.x, a.y, a.px, tw2 > 0.82 ? 0 : a.kind, a.col, HOT)
      }
      ctx.restore()
    },
  }

  /** nebula plate + parallax star layers + bright stars + crescent moon (S1's recipe), slow push */
  function drawSky(t) {
    const k = prog(t, EDGE, END + 0.6)
    const cam = lerp(1.07, 1.0, ease.outCubic(prog(t, EDGE, EDGE + 1.2))) * lerp(1, 1.02, k)
    const dX = lerp(10, -14, k), dY = lerp(-6, 6, k)
    const layer = (im, sc, dx, dy) => { const w = BGW * sc, h = BGH * sc; bx.drawImage(im, W / 2 - w / 2 + dx, H / 2 - h / 2 + dy, w, h) }
    bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
    bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
    const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.06
    bx.globalAlpha = flick
    layer(neb, cam, dX * 0.5, dY * 0.5)
    bx.globalCompositeOperation = 'lighter'
    bx.globalAlpha = 0.9; layer(far, cam, dX * 0.7, dY * 0.7)
    bx.globalAlpha = 1; layer(mid, cam * 1.01, dX, dY); layer(near, cam * 1.03, dX * 1.6, dY * 1.6)
    for (const b of bright) {
      const s = cam * (1.02 + 0.03 * b.depth)
      const x = W / 2 + (b.x - W / 2) * s + dX * (1 + b.depth * 0.6), y = H / 2 + (b.y - H / 2) * s + dY * (1 + b.depth * 0.6)
      const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed)
      const sz = b.size * (0.85 + 0.25 * tw2)
      bx.globalAlpha = clamp(tw2)
      bx.drawImage(b.spike ? spriteS : spriteG, x - sz / 2, y - sz / 2, sz, sz)
    }
    bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
    const mk = ease.outCubic(prog(t, EDGE, END))
    drawMoon(bx, 1575 + dX * 1.3, lerp(300, 262, mk) + dY * 1.3, 64 * cam, 0.09, { alpha: ease.inOutQuad(prog(t, EDGE + 0.15, EDGE + 0.9)), glow: 3.4, earthshine: 1, darkAlpha: 0.62 })
    bx.drawImage(pocket, 0, 0)
    bx.drawImage(vig, 0, 0)
  }
}

// ── sound (absolute times): slam is f1's; here — hold tick, wind-up, flip whoosh, inversion boom + D-major bell chord, glitter, landing
export const cues = [
  ['tick', 4.14, 0.06],                                     // caption lands
  ['whoosh', WIND, 0.18, 0.06],                             // wind-up breath
  ['whoosh', FLIP0, 0.5, 0.24],                             // the flip
  ['boom', EDGE, 0.6],                                      // the world inverts
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99].map((f, i) => ['bell', EDGE + 0.02 + i * 0.045, f, 0.07, 2.6, (i - 2.5) * 0.18]),
  ['glitter', EDGE + 0.04, EDGE + 1.1],
  ['tick', FLIP1 + 0.02, 0.1],                              // card lands face-up
  ['bell', 5.66, 1174.66, 0.03, 1.6, 0.2],                  // second glint pass
]
