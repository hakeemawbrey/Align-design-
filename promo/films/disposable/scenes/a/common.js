// disposable · part a — shared bits (grain, captions, photos, avatar dissolve, face cards, cold backdrop). Copied from ghosted half a,
// slowed down. Everything is a pure function of t.
import { clamp, lerp, prog, ease, rng, el } from '../../../../src/lib.js'
import { W, H, IMG, SERIF, SANS, img } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

export const BONE = '#efe6d6'
export const PHOTO = i => i === 'juniper' ? `${IMG}juniper.jpg` : `${IMG}people/p${i}.jpg`
export const COLD_FILTER = 'grayscale(1) contrast(1.3) brightness(1.16)'
export const CAP_SHADOW = '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)'

/** the film-series grain (sky.js drawGrain) on an overlay canvas; same tile + offset per frame as half b */
export function grainLayer(parent, opacity = 0.5, z = '4000', blend = 'overlay') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity, pointerEvents: 'none', zIndex: z }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

/** words that land one by one (opacity, rise, de-blur); update(t, out) */
export function words(parent, text, style, at, gap = 0.16, dur = 0.55) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 14}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 5).toFixed(2)}px)` : 'none'
      }
    },
  }
}
export const capStyle = (size = 120) => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: BONE, textShadow: CAP_SHADOW })

export function loadImage(src) {
  return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(i); i.src = src })
}

/** a round avatar on a canvas that can dissolve "to grain": clumped noise eats the photo, a bright speck edge rides the front */
export function dissolveAvatar(parent, image, size, style = {}) {
  const S = Math.round(size), c = el('canvas', { position: 'absolute', width: S + 'px', height: S + 'px', borderRadius: '50%', ...style }, parent)
  c.width = S; c.height = S
  const x = c.getContext('2d', { willReadFrequently: true })
  // the photo, cold + grey, drawn once
  const base = document.createElement('canvas'); base.width = S; base.height = S
  const bx = base.getContext('2d')
  const iw = image.naturalWidth || 342, ih = image.naturalHeight || 366, k = Math.max(S / iw, S / ih) * 1.12
  bx.filter = 'grayscale(1) contrast(1.25) brightness(1.02)'
  bx.drawImage(image, S / 2 - iw * k / 2, S * 0.44 - ih * k / 2, iw * k, ih * k)
  bx.filter = 'none'
  bx.globalCompositeOperation = 'color'; bx.fillStyle = 'rgba(84,110,150,0.28)'; bx.fillRect(0, 0, S, S)
  bx.globalCompositeOperation = 'destination-in'; bx.beginPath(); bx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); bx.fill()
  const photo = bx.getImageData(0, 0, S, S).data
  // clumped noise (3px cells + fine jitter), biased so the dissolve eats from the edge inwards a little
  const r = rng(S * 31 + 7), cell = 3, cw = Math.ceil(S / cell), cells = Array.from({ length: cw * cw }, () => r())
  const nz = new Float32Array(S * S)
  for (let yy = 0; yy < S; yy++) for (let xx = 0; xx < S; xx++) {
    const d = Math.hypot(xx - S / 2, yy - S / 2) / (S / 2)
    nz[yy * S + xx] = clamp(cells[Math.floor(yy / cell) * cw + Math.floor(xx / cell)] * 0.8 + r() * 0.2 - 0.25 * d + 0.12)
  }
  const out = x.createImageData(S, S), o = out.data
  let last = -1
  return {
    el: c,
    /** k: 0 = the photo, 1 = gone (an empty grey disc) */
    draw(k, ghost = '42,46,54') {
      const kk = Math.round(clamp(k) * 200) / 200
      if (kk === last) return; last = kk
      const [gr, gg, gb] = ghost.split(',').map(Number)
      const th = lerp(-0.08, 1.04, kk)
      for (let i = 0; i < S * S; i++) {
        const p = i * 4, a = photo[p + 3]
        if (!a) { o[p + 3] = 0; continue }
        const n = nz[i]
        if (n < th - 0.06) { o[p] = gr; o[p + 1] = gg; o[p + 2] = gb; o[p + 3] = a }                    // eaten → the grey placeholder
        else if (n < th) { const v = 150 + (n * 9973 % 1) * 80; o[p] = o[p + 1] = v; o[p + 2] = v + 8; o[p + 3] = a }   // speck front
        else { o[p] = photo[p]; o[p + 1] = photo[p + 1]; o[p + 2] = photo[p + 2]; o[p + 3] = a }
      }
      x.putImageData(out, 0, 0)
    },
  }
}

// ── the room every problem scene sits in (a touch brighter than ghosted's)
export const ROOM_BG = '#15181e'
export const GRAIN = 0.5
export const SILVER = 0.07

// ── face cards (from ghosted a2 / film2 f1): body 520×830, drawn at the H1 size so the last one IS the H1 card
export const H_CARD = { cx: 960, cy: 540, bodyH: 560 }
export const CARD_W = 520, CARD_H = 830, CARD_S = H_CARD.bodyH / CARD_H
export const ROSE = '#e8628a'
const NAMES = { 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 4: 'Jun, 27', 5: 'Ama, 25', 6: 'Cole, 31', 7: 'Maya, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

export function makeFaceCard(parent, face, k) {
  const card = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px',
    borderRadius: '30px', overflow: 'hidden', background: '#1a1d24', boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset' }, parent)
  const ph = img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.22)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.3) 0%, rgba(8,10,14,0) 16%, rgba(8,10,14,0) 56%, rgba(8,10,14,0.85) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '22px', right: '22px', top: '20px', height: '5px', display: 'flex', gap: '8px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '3px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }, pips)
  el('div', { position: 'absolute', left: '34px', bottom: '78px', fontFamily: SANS, fontWeight: 600, fontSize: '50px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, NAMES[face])
  el('div', { position: 'absolute', left: '36px', bottom: '38px', fontFamily: SANS, fontWeight: 400, fontSize: '28px', color: 'rgba(235,238,244,0.7)' }, card, DIST[k % DIST.length])
  const stamp = d => el('div', { position: 'absolute', top: '58px', [d < 0 ? 'right' : 'left']: '40px', width: '128px', height: '128px', opacity: 0,
    filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.6))' }, card, d < 0
    ? `<svg viewBox="0 0 128 128" width="128" height="128"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${BONE}" stroke-width="7"/><path d="M42 42 L86 86 M86 42 L42 86" stroke="${BONE}" stroke-width="11" stroke-linecap="round"/></svg>`
    : `<svg viewBox="0 0 128 128" width="128" height="128"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${ROSE}" stroke-width="7"/><path d="M64 96 C30 72 30 44 46 40 C55 38 61 43 64 50 C67 43 73 38 82 40 C98 44 98 72 64 96 Z" fill="${ROSE}"/></svg>`)
  return { card, ph, stampX: stamp(-1), stampH: stamp(1) }
}

/** the cold face wall behind the cards (from ghosted a2): a slow, steady drift — never racing */
export function coldBackdrop(parent, speed = 18) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden',
    background: 'radial-gradient(120% 100% at 50% 45%, #2a2f39 0%, #1c2028 55%, #12141a 100%)' }, parent)
  const wall = el('div', { position: 'absolute', left: '-40px', top: 0, width: (W + 80) + 'px', height: H + 'px', filter: 'blur(4px) grayscale(1) brightness(0.9) contrast(1.15)', opacity: 0.42 }, root)
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
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 48%, rgba(14,16,21,0.15) 0%, rgba(14,16,21,0.6) 70%, rgba(10,11,15,0.88) 100%)' }, root)
  return {
    root, wall,
    update(t) {
      const p = speed * t
      for (const c of cols) { const y = (c.off + p * c.sp) % COLH; c.col.style.transform = `translateY(${(c.dir > 0 ? -y : y - COLH).toFixed(2)}px)` }
    },
  }
}
