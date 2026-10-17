// A2 · DISPOSABLE → WHAT IF NO ONE WAS? (8.0–15.2). From a2's dark room, an endless stack of cold B&W faces is
// flicked away faster and faster until it smears into thousands (the face wall behind races with it). "We made people
// disposable." Then it stops dead: one card left, still. "What if no one was?" The card slowly turns face-down; at
// edge-on its back — the Align card back — blooms the sky out of the dark. Hand-off H (from 14.8, still from 14.7):
// drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12 alpha 1) + grain 0.5, card back BODY height 560
// centred at (960,540), upright, no extra glow, no fx.
import { clamp, lerp, prog, ease, rng, noise1, el, C, PIXEL_PALETTE } from '../../../../src/lib.js'
import { W, H, A, SANS, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../../sky.js'
import { BONE, PHOTO, COLD_FILTER, grainLayer, words, capStyle } from './common.js'
import { A1_END, ROOM_BG, A1_GRAIN } from './a1-seen.js'

const START = A1_END, END = 15.2
// hand-off H
export const H_CARD = { cx: 960, cy: 540, bodyH: 560 }
export const H_MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
const BACK = { iw: 1528, ih: 2347, bx0: 120, by0: 119, bx1: 1440, by1: 2227 }   // card-back.png body box
const BACK_S = H_CARD.bodyH / (BACK.by1 - BACK.by0)                                 // png px → stage px

// face cards (copied from film2 f1): body 520×830, drawn at the hand-off size so the last one IS the H card
const CARD_W = 520, CARD_H = 830, CARD_S = H_CARD.bodyH / CARD_H
const STACK_X = H_CARD.cx, STACK_Y = H_CARD.cy
const ROSE = '#e8628a'
const NAMES = { 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 4: 'Jun, 27', 5: 'Ama, 25', 6: 'Cole, 31', 7: 'Maya, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

// ── timing
const SW0 = 8.55, STOP = 12.4                  // first swipe → the stack stops dead (one card left)
const TURN0 = 13.25, TURN1 = 14.2               // the slow turn face-down
const EDGE = lerp(TURN0, TURN1, 0.5)            // edge-on (inOutSine midpoint) → the sky blooms from the card
const SETTLE = 14.55                            // everything at H from here (B starts 14.8)
const WIPE = 0.45

// swipe schedule: gentle first (0.5s a face), then the gap shrinks ×0.84 down to 2 frames — a smear of faces
export const SWIPES = (() => {
  const out = []; let t = SW0, gap = 0.5
  while (t < STOP - 0.05) { out.push(t); t += gap; if (out.length >= 2) gap = Math.max(1 / 15, gap * 0.84) }
  return out
})()
const N = SWIPES.length                         // card N (index N) is the one left
const dirOf = k => (k % 5 === 2 || k % 9 === 6) ? 1 : -1
const flightOf = k => clamp((k + 1 < N ? SWIPES[k + 1] - SWIPES[k] : 0.2) * 1.6, 0.27, 0.42)   // ≥ 8 frames: at full speed ~4 faces are in the air at once
const faceOf = k => [7, 2, 11, 5, 9, 1, 4, 12, 6, 10, 8, 2, 5, 11, 1, 9, 7, 12, 4, 6, 10, 8, 1, 5, 9, 2, 11, 7, 4, 12, 6, 3][k % 32]
const LAST_FACE = 3

function makeFaceCard(parent, face, k) {
  const card = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px',
    borderRadius: '30px', overflow: 'hidden', background: '#1a1d24', boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset' }, parent)
  const ph = img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.24)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.35) 0%, rgba(8,10,14,0) 16%, rgba(8,10,14,0) 52%, rgba(8,10,14,0.9) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '22px', right: '22px', top: '20px', height: '5px', display: 'flex', gap: '8px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '3px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }, pips)
  el('div', { position: 'absolute', left: '34px', bottom: '78px', fontFamily: SANS, fontWeight: 600, fontSize: '50px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, NAMES[face])
  el('div', { position: 'absolute', left: '36px', bottom: '38px', fontFamily: SANS, fontWeight: 400, fontSize: '28px', color: 'rgba(235,238,244,0.66)' }, card, DIST[k % DIST.length])
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-20%', width: '60%', height: '140%', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(220,230,255,0.22) 50%, rgba(255,255,255,0) 100%)', transform: 'rotate(18deg)', opacity: 0 }, card)
  const stamp = d => el('div', { position: 'absolute', top: '58px', [d < 0 ? 'right' : 'left']: '40px', width: '128px', height: '128px', opacity: 0,
    filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.6))' }, card, d < 0
    ? `<svg viewBox="0 0 128 128" width="128" height="128"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${BONE}" stroke-width="7"/><path d="M42 42 L86 86 M86 42 L42 86" stroke="${BONE}" stroke-width="11" stroke-linecap="round"/></svg>`
    : `<svg viewBox="0 0 128 128" width="128" height="128"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${ROSE}" stroke-width="7"/><path d="M64 96 C30 72 30 44 46 40 C55 38 61 43 64 50 C67 43 73 38 82 40 C98 44 98 72 64 96 Z" fill="${ROSE}"/></svg>`)
  return { card, ph, sheen, stampX: stamp(-1), stampH: stamp(1) }
}

// the cold face wall behind (copied from f1): races with the swipes, stops dead with the stack
const wallPos = t => { const u = clamp(t, SW0 - 0.6, STOP) - (SW0 - 0.6); return 40 * u + 9 * u * u * u }
function coldBackdrop(parent) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden',
    background: 'radial-gradient(120% 100% at 50% 45%, #1b1f27 0%, #12151b 55%, #0a0c10 100%)' }, parent)
  const wall = el('div', { position: 'absolute', left: '-40px', top: 0, width: (W + 80) + 'px', height: H + 'px', filter: 'blur(4px) grayscale(1) brightness(0.8) contrast(1.2)', opacity: 0.3 }, root)
  const TW = 200, TH = 250, GAP = 14, COLS = 10, ROWS = 6, COLH = ROWS * (TH + GAP)
  const cols = Array.from({ length: COLS }, (_, c) => {
    const col = el('div', { position: 'absolute', left: c * (TW + GAP) + 'px', top: 0, width: TW + 'px', height: 2 * COLH + 'px' }, wall)
    for (let i = 0; i < ROWS * 2; i++) {
      const f = ((c * 5 + (i % ROWS) * 7) % 12) + 1
      const box = el('div', { position: 'absolute', left: 0, top: i * (TH + GAP) + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '16px', overflow: 'hidden', background: '#222' }, col)
      img(box, PHOTO(f), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
    }
    return { col, dir: c % 2 ? 1 : -1, off: (c * 137) % COLH, sp: 0.8 + (c % 3) * 0.15 }
  })
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 48%, rgba(10,12,16,0.25) 0%, rgba(10,12,16,0.82) 70%, rgba(6,7,10,0.96) 100%)' }, root)
  return {
    root, wall,
    update(t) {
      const p = wallPos(t)
      for (const c of cols) { const y = (c.off + p * c.sp) % COLH; c.col.style.transform = `translateY(${c.dir > 0 ? -y : y - COLH}px)` }
    },
  }
}

function blurDefs(parent, n, prefix) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  const blurs = []
  for (let i = 0; i < n; i++) {
    const f = document.createElementNS(svg.namespaceURI, 'filter')
    f.setAttribute('id', `${prefix}${i}`); f.setAttribute('x', '-50%'); f.setAttribute('width', '200%'); f.setAttribute('y', '-10%'); f.setAttribute('height', '120%')
    const g = document.createElementNS(svg.namespaceURI, 'feGaussianBlur'); g.setAttribute('stdDeviation', '0 0')
    f.appendChild(g); svg.appendChild(f); blurs.push(g)
  }
  parent.appendChild(svg)
  return blurs
}

// ── pixel stars thrown off the card's edge line at edge-on (from f2), all gone before the hand-off
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
const BURST = (() => {
  const r = rng(5151)
  return Array.from({ length: 64 }, (_, i) => {
    const side = r() < 0.5 ? 0 : Math.PI, a = side + (r() - 0.5) * 1.3
    return { a, ly: r() - 0.5, v: 900 + Math.pow(r(), 1.4) * 1700, life: 0.38 + r() * 0.4, px: 3 + Math.floor(r() * 3), kind: r() < 0.35 ? 0 : (r() < 0.5 ? 1 : 3),
      col: STAR_PAL[Math.floor(r() * STAR_PAL.length)], d: i < 30 ? 0 : r() * 0.08, ph: Math.floor(r() * 4) }
  })
})()

export default function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const cold = coldBackdrop(root)
  const backGrain = grainLayer(cold.root, 0.32, '5')
  const silver = grainLayer(cold.root, 0.07, '6', 'screen')         // silver in the blacks (cold world only; gone with it)
  // the dark that settles behind the one card left (before the sky)
  const hush = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 50% 50%, rgba(6,7,10,0.55) 0%, rgba(6,7,10,0.92) 100%)', opacity: 0 }, root)
  // the sky (drawn under the card), revealed by a feathered bloom from the card's edge line
  const skyC = layerCanvas(root, { opacity: 0 }), sx = skyC.getContext('2d')
  const maskC = document.createElement('canvas'); maskC.width = W / 2; maskC.height = H / 2
  const mx = maskC.getContext('2d')

  // the stack
  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const blurs = blurDefs(root, 8, 'gamb')
  const cards = Array.from({ length: N }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...makeFaceCard(holder, faceOf(k), k) }
  })
  // the last card: 3D, front = face card, back = Align card back (BODY 560 tall at the H pose)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '500' }, deck)
  const card3d = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }, holder)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, card3d)
  const frontS = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `scale(${CARD_S})` }, front)
  const face = makeFaceCard(frontS, LAST_FACE, 2)
  const fWash = el('div', { position: 'absolute', inset: 0, background: '#dfe6ff', mixBlendMode: 'screen', opacity: 0 }, face.card)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, card3d)
  const bcx = (BACK.bx0 + BACK.bx1) / 2, bcy = (BACK.by0 + BACK.by1) / 2
  const backImg = img(back, A + 'card-back.png', { left: -bcx * BACK_S + 'px', top: -bcy * BACK_S + 'px', width: BACK.iw * BACK_S + 'px', height: BACK.ih * BACK_S + 'px' })
  const bWash = el('div', { position: 'absolute', left: -(bcx - BACK.bx0) * BACK_S + 'px', top: -(bcy - BACK.by0) * BACK_S + 'px', width: (BACK.bx1 - BACK.bx0) * BACK_S + 'px', height: (BACK.by1 - BACK.by0) * BACK_S + 'px',
    borderRadius: 84 * BACK_S + 'px', background: '#f3e6ff', mixBlendMode: 'screen', opacity: 0 }, back)
  const edge = el('div', { position: 'absolute', left: '-2px', top: -H_CARD.bodyH / 2 + 16 + 'px', width: '4px', height: H_CARD.bodyH - 32 + 'px', borderRadius: '2px',
    background: 'linear-gradient(180deg, rgba(239,230,214,0.4), #fff6ea 20%, #d9c4ff 50%, #fff6ea 80%, rgba(239,230,214,0.4))', boxShadow: '0 0 10px 2px rgba(214,190,255,0.8)', transform: 'rotateY(90deg)' }, card3d)
  void backImg

  // copy (bottom pocket, under the card): "We made people disposable." → "What if no one was?"
  const pocket = el('div', { position: 'absolute', left: 0, top: '820px', width: W + 'px', height: '260px', opacity: 0, zIndex: '2900',
    background: 'radial-gradient(48% 52% at 50% 52%, rgba(8,6,20,0.62) 0%, rgba(8,6,20,0.28) 60%, rgba(8,6,20,0) 100%)' }, root)
  const capA = words(root, 'We made people disposable.', { ...capStyle(92), left: 0, width: W + 'px', top: '880px', textAlign: 'center', zIndex: '3000' }, 9.05, 0.11, 0.26)
  const capB = words(root, 'What if no one was?', { ...capStyle(96), left: 0, width: W + 'px', top: '874px', textAlign: 'center', zIndex: '3000' }, 12.72, 0.12, 0.3)
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, zIndex: '3500',
    background: 'radial-gradient(40% 60% at 50% 50%, rgba(255,246,236,0.9) 0%, rgba(201,166,255,0.5) 40%, rgba(120,70,220,0.12) 75%, rgba(0,0,0,0) 100%)' }, root)
  const fade = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '3800', pointerEvents: 'none' }, root)   // in from a1's dark room
  const grain = grainLayer(root, A1_GRAIN)

  const turnAng = t => {
    if (t < TURN0) return 0
    if (t < TURN1) return 180 * (0.5 - 0.5 * Math.cos(Math.PI * prog(t, TURN0, TURN1)))
    const u = prog(t, TURN1, SETTLE)
    return 180 + 4 * Math.exp(-u * 5) * Math.sin(u * 9) * (1 - u)
  }

  return {
    start: START, end: END, root,
    fxStart: EDGE - 0.02, fxEnd: SETTLE,
    update(t) {
      fade.style.opacity = String(1 - ease.inOutQuad(prog(t, START, START + 0.45)))
      const coldOn = t < EDGE + WIPE + 0.05
      cold.root.style.display = coldOn ? 'block' : 'none'
      if (coldOn) { cold.update(t); backGrain.update(t); silver.update(t) }
      cold.wall.style.opacity = String(0.3 + 0.25 * ease.inQuad(prog(t, 10.2, STOP)) - 0.55 * ease.inOutQuad(prog(t, STOP + 0.1, 13.2)))
      cold.wall.style.filter = `blur(${(4 + 6 * ease.inQuad(prog(t, 10.2, STOP)) * (t < STOP ? 1 : 0)).toFixed(1)}px) grayscale(1) brightness(0.8) contrast(1.2)`
      hush.style.opacity = String(ease.inOutQuad(prog(t, STOP + 0.05, 13.1)))

      // ── the stack
      let top = SWIPES.findIndex(s => t < s); if (top < 0) top = N
      let slot = 0
      cards.forEach((c, k) => {
        const s = SWIPES[k], fl = flightOf(k), d = dirOf(k)
        if (t >= s + fl || k > top + 3) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        let x = STACK_X, y = STACK_Y, rot = 0, sc = CARD_S, bright = 1, bl = 0, sheen = 0
        if (t >= s) {
          const u = prog(t, s, s + fl)
          x += d * (140 * u + 1500 * u * u); y += -30 * u + 120 * u * u; rot = d * (3 + 12 * u)
          bl = Math.min(22, 4 + 30 * u) * clamp(u * 4) * (1 + 0.6 * prog(t, 10.5, STOP)); sheen = u
        } else {
          let depth = k - top
          if (top > 0) { const ps = SWIPES[top - 1]; depth += 1 - ease.outCubic(prog(t, ps, ps + Math.min(0.1, flightOf(top - 1) * 0.5))) }
          if (top === k) { const lead = prog(t, s - 0.12, s); x += d * 26 * ease.inQuad(lead); rot = d * 3 * ease.inQuad(lead) }
          sc = CARD_S * (1 - 0.05 * depth); y += 22 * depth; bright = 1 - 0.32 * depth
          if (depth > 2.5) bright = 0
        }
        c.holder.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${sc})`
        c.holder.style.opacity = String(clamp(bright * 1.5))
        c.card.style.filter = bright < 1 ? `brightness(${Math.max(0.25, bright)})` : ''
        if (bl > 0.5 && slot < 8) { blurs[slot].setAttribute('stdDeviation', `${bl.toFixed(1)} ${(bl * 0.12).toFixed(1)}`); c.card.style.filter = `url(#gamb${slot})`; slot++ }
        c.sheen.style.opacity = String(sheen > 0 ? 1 - sheen : 0)
        c.sheen.style.transform = `translateX(${sheen * 260}%) rotate(18deg)`
        const sp = prog(t, s - 0.067, s + 0.02), st = d < 0 ? c.stampX : c.stampH
        st.style.opacity = String(sp > 0 ? clamp(sp * 3) : 0)
        st.style.transform = `scale(${lerp(1.35, 1, ease.outBack(sp))}) rotate(${d * -8}deg)`
      })

      // ── the one card left: in the stack under the rest, then alone and still, then the turn
      let depth = N - top
      if (top > 0 && top <= N) { const ps = SWIPES[top - 1]; depth += 1 - ease.outCubic(prog(t, ps, ps + Math.min(0.1, flightOf(top - 1) * 0.5))) }
      depth = Math.max(0, depth)
      holder.style.display = depth > 2.5 ? 'none' : 'block'
      const ang = turnAng(t), ca = Math.cos(ang * Math.PI / 180)
      const lift = Math.sin(Math.PI * prog(t, TURN0, TURN1))
      const yy = STACK_Y + 22 * depth - 8 * lift, sc = (1 - 0.05 * depth) * (1 + 0.025 * lift)
      if (t >= SETTLE) {                                                     // exactly H: flat, upright, centred, still
        holder.style.transform = `translate(${H_CARD.cx}px, ${H_CARD.cy}px)`
        card3d.style.transform = 'rotateY(180deg)'
      } else {
        holder.style.transform = `translate(${STACK_X}px, ${yy}px) scale(${sc})`
        card3d.style.transform = `perspective(2600px) rotateX(${(4 * lift).toFixed(3)}deg) rotateY(${ang.toFixed(3)}deg)`
      }
      const br = 1 - 0.32 * depth
      front.style.filter = br < 1 ? `brightness(${Math.max(0.25, br)})` : ''
      holder.style.opacity = String(clamp(br * 1.5))
      fWash.style.opacity = String(ang < 90 ? 0.4 * clamp(1 - ca) : 0)
      bWash.style.opacity = String(ang > 90 ? 0.42 * clamp(1 + ca) * (t < SETTLE ? 1 : 0) : 0)
      edge.style.opacity = String(t < SETTLE ? clamp((0.3 - Math.abs(ca)) / 0.2) : 0)

      // ── the sky blooms from the card's edge line at edge-on
      const bloom = prog(t, EDGE - 1 / 60, EDGE + WIPE)
      if (bloom > 0) {
        skyC.style.opacity = '1'
        const settle = ease.inOutCubic(prog(t, EDGE, SETTLE))
        const ex = 1 + 0.55 * (1 - ease.outCubic(prog(t, EDGE, SETTLE)))
        skyC.style.filter = ex > 1.0005 ? `brightness(${ex.toFixed(3)}) saturate(${(1 + 0.3 * (ex - 1)).toFixed(3)})` : 'none'
        const zoom = lerp(1.07, 1, settle)
        const ma = ease.inOutQuad(prog(t, EDGE + 0.2, SETTLE))
        drawSky(sx, t, { zoom, dx: 0, dy: 0, dim: 1, moon: { ...H_MOON, alpha: ma } })
        if (bloom < 1) {
          const hh = H_CARD.bodyH / 2, r = 16 + 1300 * ease.outCubic(bloom)
          mx.setTransform(1, 0, 0, 1, 0, 0); mx.clearRect(0, 0, W / 2, H / 2)
          mx.filter = 'blur(24px)'; mx.fillStyle = '#000'
          mx.setTransform(0.5, 0, 0, 0.5, 0, 0)
          mx.beginPath(); mx.roundRect(STACK_X - r, STACK_Y - hh - r, 2 * r, 2 * hh + 2 * r, r); mx.fill(); mx.filter = 'none'
          sx.globalCompositeOperation = 'destination-in'; sx.drawImage(maskC, 0, 0, W, H); sx.globalCompositeOperation = 'source-over'
        }
      } else skyC.style.opacity = '0'
      const fd = t - EDGE
      flash.style.opacity = String(clamp(fd < -0.04 ? 0 : fd < 0 ? 0.12 : 0.42 * Math.exp(-fd * 7)) * (1 - prog(t, EDGE + 0.4, SETTLE)))

      // ── copy
      capA.update(t, 1 - ease.inOutQuad(prog(t, 11.95, 12.3)))
      capB.update(t, 1 - ease.inOutQuad(prog(t, 14.3, 14.62)))
      pocket.style.opacity = String(ease.inOutQuad(prog(t, EDGE, EDGE + 0.3)) * (1 - ease.inOutQuad(prog(t, 14.3, 14.62))))
      grain.update(t)
    },
    fx(ctx, t) {
      ctx.save(); ctx.imageSmoothingEnabled = false
      const tick = Math.round(t * 30) >> 1, hh = H_CARD.bodyH / 2
      const fr = Math.round(t * 30), EF = Math.round(EDGE * 30)
      if (fr === EF || fr === EF - 1) {                                    // a 2-frame white hairline at edge-on
        ctx.save(); ctx.imageSmoothingEnabled = true; ctx.globalAlpha = fr === EF ? 1 : 0.8
        ctx.shadowColor = 'rgba(226,210,255,0.9)'; ctx.shadowBlur = 14
        const lg = ctx.createLinearGradient(0, STACK_Y - hh, 0, STACK_Y + hh)
        lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.08, '#fff'); lg.addColorStop(0.92, '#fff'); lg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = lg; ctx.fillRect(STACK_X - 1.5, STACK_Y - hh, 3, 2 * hh); ctx.restore()
      }
      const dt = t - EDGE
      for (const b of BURST) {
        const lt = dt - b.d
        if (lt <= 0 || lt > b.life) continue
        const u = lt / b.life, dist = 14 + b.v * (1 - Math.exp(-lt * 3.2)) / 3.2
        const x = STACK_X + Math.cos(b.a) * dist, y = STACK_Y + b.ly * 2 * hh + Math.sin(b.a) * dist * 0.9 + 40 * lt * lt
        ctx.globalAlpha = clamp((1 - u) * 1.6) * (((tick + b.ph) & 3) === 0 ? 0.55 : 1)
        sprite(ctx, x, y, b.px, ((tick + b.ph) & 1) ? b.kind : 2, b.col, HOT)
      }
      ctx.restore()
      void noise1
    },
  }
}

export const cues = [
  ...SWIPES.flatMap((s, k) => {
    const gap = k + 1 < SWIPES.length ? SWIPES[k + 1] - s : 0.07, fast = gap < 0.12
    if (fast && k % 2) return [['tick', s, 0.025]]
    return [['whoosh', s, Math.max(0.12, Math.min(0.32, gap * 0.9)), 0.06 + 0.04 * (k % 2)], ['tick', s, 0.04 + Math.min(0.05, k * 0.002)]]
  }),
  ['riser', 10.2, STOP, 0.08],
  ['boom', STOP, 0.22],                                                  // it stops dead — then silence
  ['tick', 12.72, 0.04],
  ['whoosh', TURN0, TURN1 - TURN0, 0.12],                                // the slow turn
  ['boom', EDGE, 0.45],
  ...[293.66, 369.99, 440, 554.37, 587.33].map((f, i) => ['bell', EDGE + 0.02 + i * 0.05, f, 0.06, 2.6, (i - 2) * 0.2]),
  ['glitter', EDGE + 0.04, EDGE + 0.9],
]
