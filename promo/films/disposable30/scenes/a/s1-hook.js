// S1 · WE'VE MADE PEOPLE DISPOSABLE (0–4.4). The film opens on the hook. A cold, grainy stack of generic B&W
// profile cards in front of a wall of faces; the line "We’ve made people disposable." lands at once (readable by ~0.9)
// while card after card is flicked away — calm at first, then faster and faster until it smears into thousands.
// At 3.95 it cuts dead to the dark room (one low boom, then silence); a1 wakes the phone out of that dark at 4.4.
// (Stack, face cards and face wall copied from ghosted a2-stack.)
import { clamp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, SANS, fill, img } from '../../../../src/scenes/common.js'
import { BONE, PHOTO, COLD_FILTER, grainLayer, words, capStyle } from './common.js'
import { ROOM_BG, A1_GRAIN } from './a1-seen.js'

export const S1_END = 4.4
const START = 0, END = S1_END
// the stack sits at the hand-off pose (same card size as the last card in s3)
const H_CARD = { cx: 960, cy: 540, bodyH: 560 }

// face cards (copied from film2 f1): body 520×830, drawn at the hand-off size so the last one IS the H card
const CARD_W = 520, CARD_H = 830, CARD_S = H_CARD.bodyH / CARD_H
const STACK_X = H_CARD.cx, STACK_Y = H_CARD.cy
const ROSE = '#e8628a'
const NAMES = { 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 4: 'Jun, 27', 5: 'Ama, 25', 6: 'Cole, 31', 7: 'Maya, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

// ── timing
const SW0 = 0.7, STOP = 3.95                   // first swipe → the smear stops dead on a cut to black
const CAP0 = 0.2                               // the hook line lands at once
const DARK0 = STOP, DARK1 = STOP + 0.1         // hard-ish cut to the dark room (a1 wakes the phone from it at 4.4)

// swipe schedule: gentle first (0.5s a face), then the gap shrinks ×0.84 down to 2 frames — a smear of faces
const SWIPES = (() => {
  const out = []; let t = SW0, gap = 0.5
  while (t < STOP - 0.05) { out.push(t); t += gap; if (out.length >= 2) gap = Math.max(1 / 15, gap * 0.84) }
  return out
})()
const N = SWIPES.length
const dirOf = k => (k % 5 === 2 || k % 9 === 6) ? 1 : -1
const flightOf = k => clamp((k + 1 < N ? SWIPES[k + 1] - SWIPES[k] : 0.2) * 1.6, 0.27, 0.42)   // ≥ 8 frames: at full speed ~4 faces are in the air at once
const faceOf = k => [7, 2, 11, 5, 9, 1, 4, 12, 6, 10, 8, 2, 5, 11, 1, 9, 7, 12, 4, 6, 10, 8, 1, 5, 9, 2, 11, 7, 4, 12, 6, 3][k % 32]

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

export default function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const cold = coldBackdrop(root)
  cold.root.style.zIndex = '0'
  const backGrain = grainLayer(cold.root, 0.32, '5')

  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const blurs = blurDefs(root, 8, 'hookb')
  // N swipes + a few cards still waiting underneath when it cuts
  const cards = Array.from({ length: N + 3 }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...makeFaceCard(holder, faceOf(k), k) }
  })

  // the hook (bottom pocket, under the stack)
  const pocket = el('div', { position: 'absolute', left: 0, top: '800px', width: W + 'px', height: '280px', zIndex: '2900',
    background: 'radial-gradient(52% 55% at 50% 55%, rgba(8,9,13,0.66) 0%, rgba(8,9,13,0.3) 60%, rgba(8,9,13,0) 100%)' }, root)
  const cap = words(root, 'We’ve made people disposable.', { ...capStyle(108), left: 0, width: W + 'px', top: '866px', textAlign: 'center', zIndex: '3000' }, CAP0, 0.13, 0.32)

  const dark = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '3800', pointerEvents: 'none' }, root)
  const grain = grainLayer(root, A1_GRAIN)
  const silver = grainLayer(root, 0.07, '3900', 'screen')

  return {
    start: START, end: END, root,
    update(t) {
      cold.update(t); backGrain.update(t)
      cold.wall.style.opacity = String(0.3 + 0.25 * ease.inQuad(prog(t, 2.2, STOP)))
      cold.wall.style.filter = `blur(${(4 + 6 * ease.inQuad(prog(t, 2.2, STOP))).toFixed(1)}px) grayscale(1) brightness(0.8) contrast(1.2)`

      // ── the stack (ghosted a2's swipe physics)
      let top = SWIPES.findIndex(s => t < s); if (top < 0) top = N
      let slot = 0
      cards.forEach((c, k) => {
        const s = k < N ? SWIPES[k] : Infinity, fl = k < N ? flightOf(k) : 1, d = dirOf(k)
        if (t >= s + fl || k > top + 3) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        let x = STACK_X, y = STACK_Y, rot = 0, sc = CARD_S, bright = 1, bl = 0, sheen = 0
        if (t >= s) {
          const u = prog(t, s, s + fl)
          x += d * (140 * u + 1500 * u * u); y += -30 * u + 120 * u * u; rot = d * (3 + 12 * u)
          bl = Math.min(22, 4 + 30 * u) * clamp(u * 4) * (1 + 0.6 * prog(t, 2.4, STOP)); sheen = u
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
        if (bl > 0.5 && slot < 8) { blurs[slot].setAttribute('stdDeviation', `${bl.toFixed(1)} ${(bl * 0.12).toFixed(1)}`); c.card.style.filter = `url(#hookb${slot})`; slot++ }
        c.sheen.style.opacity = String(sheen > 0 ? 1 - sheen : 0)
        c.sheen.style.transform = `translateX(${sheen * 260}%) rotate(18deg)`
        const sp = prog(t, s - 0.067, s + 0.02), st = d < 0 ? c.stampX : c.stampH
        st.style.opacity = String(sp > 0 ? clamp(sp * 3) : 0)
        st.style.transform = `scale(${1.35 - 0.35 * ease.outBack(sp)}) rotate(${d * -8}deg)`
      })

      // ── the hook holds through the whole smear, then goes with the cut
      const out = 1 - ease.inQuad(prog(t, DARK0, DARK1))
      cap.update(t, out)
      pocket.style.opacity = String(ease.inOutQuad(prog(t, 0, 0.5)) * out)
      // up from black over the first beat; the cut to dark at STOP
      dark.style.opacity = String(Math.max(1 - ease.inOutQuad(prog(t, 0, 0.35)), ease.inQuad(prog(t, DARK0, DARK1))))
      grain.update(t); silver.update(t)
    },
  }
}

export const cues = [
  ['bell', CAP0 + 0.05, 164.81, 0.035, 2.6, 0],                          // the hook line — low, alone
  ...SWIPES.flatMap((s, k) => {
    const gap = k + 1 < SWIPES.length ? SWIPES[k + 1] - s : 0.07, fast = gap < 0.12
    if (fast && k % 2) return [['tick', s, 0.025]]
    return [['whoosh', s, Math.max(0.12, Math.min(0.32, gap * 0.9)), 0.06 + 0.04 * (k % 2)], ['tick', s, 0.04 + Math.min(0.05, k * 0.002)]]
  }),
  ['riser', 2.2, STOP, 0.08],
  ['boom', STOP, 0.3],                                                   // cut dead — then silence
]
