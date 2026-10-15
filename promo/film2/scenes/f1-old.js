// F1 · THE OLD WAY (0–4.2s). Cold, colour-drained, grainy: a generic face feed swiped away faster and
// faster, a mono judge-timer, "We swipe on faces." … "in half a second." The last card flies in and
// SLAMS to a stop centre-frame at 4.0 — f2 takes that card over (same pose function, same backdrop).
// Everything is a pure function of t. Shared bits (backdrop, face card, last-card pose, grain) are exported for f2.
import { clamp, lerp, prog, ease, rng, noise1, el } from '../../src/lib.js'
import { W, H, IMG, SANS, SERIF, MONO, fill, img } from '../../src/scenes/common.js'

// ── geometry shared with f2 / f3 (agreed: Align card body 520 wide centred at 960,470 at 6.5s)
export const CARD_W = 520, CARD_H = 830          // card body (both faces) — card-profile-3 body aspect 1254:2002
export const FEED_S = 440 / 520                  // feed cards are drawn at 440 px wide
export const FEED_X = 960, FEED_Y = 500
export const SLAM = 4.0                           // the last card stops dead here
const FLY_IN = 3.74                               // the last card enters from the right
export const LAST_FACE = 3                        // p3.jpg is the face that gets flipped

const BONE = '#efe6d6'
// one generic name per photo (p1..p12)
const NAMES = [null, 'Lena, 23', 'Theo, 29', 'Rosa, 28', 'Jun, 27', 'Ama, 25', 'Cole, 31', 'Maya, 24', 'Nia, 26', 'Dev, 26', 'Ivy, 27', 'Kofi, 30', 'Sara, 25']
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

// ── swipe schedule: card k flies off at SW[k]; the gap shrinks 0.5s → 2 frames (accelerating tension)
export const SWIPES = (() => {
  const out = []; let t = -0.06, gap = 0.44
  while (t < FLY_IN - 0.02) { out.push(t); t += gap; gap = Math.max(0.067, gap * 0.8) }
  return out
})()
const N = SWIPES.length
const dirOf = k => (k % 5 === 2 || k % 7 === 4) ? 1 : -1      // mostly left (rejected), now and then right
const flightOf = k => clamp((k + 1 < N ? SWIPES[k + 1] - SWIPES[k] : 0.08) * 1.25, 0.15, 0.34)
const faceOf = k => [7, 2, 11, 5, 9, 1, 4, 12, 6, 10, 8, 2, 5, 11, 1, 9, 7, 12, 4, 6, 10, 8, 1, 5, 9, 2, 11, 7, 4, 12, 6][k % 31]

// ── film grain (copied from s1-imagine.js buildGrain): clumped silver, 6 tiles, new tile + offset every frame
const GRAIN_N = 6, GRAIN_TILE = 512
const cnv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
let GRAIN = null
export function grainTiles() {
  if (GRAIN) return GRAIN
  const noiseTile = (S, seed, mean, amp) => {
    const c = cnv(S, S), x = c.getContext('2d'), id = x.createImageData(S, S), p = id.data, r = rng(seed)
    for (let i = 0; i < p.length; i += 4) { const g = (r() + r() + r() + r() - 2) * 0.5; p[i] = p[i + 1] = p[i + 2] = clamp(mean + g * amp) * 255; p[i + 3] = 255 }
    x.putImageData(id, 0, 0); return c
  }
  const wrapDraw = (dst, src, filter, alpha = 1) => {
    const T = GRAIN_TILE, big = cnv(T * 3, T * 3), bx = big.getContext('2d')
    bx.imageSmoothingQuality = 'high'
    for (let i = 0; i < 9; i++) bx.drawImage(src, (i % 3) * T, Math.floor(i / 3) * T, T, T)
    const dx = dst.getContext('2d'); dx.filter = filter; dx.globalAlpha = alpha
    dx.drawImage(big, -T, -T); dx.filter = 'none'; dx.globalAlpha = 1
  }
  GRAIN = Array.from({ length: GRAIN_N }, (_, n) => {
    const out = cnv(GRAIN_TILE, GRAIN_TILE)
    wrapDraw(out, noiseTile(GRAIN_TILE / 2, 9001 + n * 131, 0.46, 1.3), 'blur(0.5px) contrast(1.5)')
    wrapDraw(out, noiseTile(GRAIN_TILE, 7001 + n * 97, 0.46, 1.0), 'blur(0.35px)', 0.4)
    return out
  })
  return GRAIN
}
/** overlay grain canvas; update(t) paints the frame's tile */
export function grainLayer(parent, opacity = 0.85) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d'), pats = grainTiles().map(t => gx.createPattern(t, 'repeat'))
  return {
    el: c,
    update(t) {
      const f = Math.round(t * 30), r = rng(f * 7919 + 17)
      const ox = Math.floor(r() * GRAIN_TILE), oy = Math.floor(r() * GRAIN_TILE)
      gx.setTransform(1, 0, 0, 1, -ox, -oy); gx.fillStyle = pats[f % GRAIN_N]; gx.fillRect(ox, oy, W, H); gx.setTransform(1, 0, 0, 1, 0, 0)
    },
  }
}

// ── the cold world: slate gradient (no colour), a blurred wall of faces scrolling by, cold vignette
const PHOTO = i => `${IMG}people/p${i}.jpg`
export const COLD_FILTER = 'grayscale(1) contrast(1.42) brightness(1.08)'
/** scroll position of the face wall: speeds up through f1, stops dead at the slam */
const wallPos = t => { const tt = Math.min(t, SLAM); return 60 * tt + 26 * tt * tt * tt }
export function coldBackdrop(parent) {
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
    root,
    update(t) {
      const p = wallPos(t)
      for (const c of cols) {
        let y = (c.off + p * c.sp) % COLH
        c.col.style.transform = `translateY(${c.dir > 0 ? -y : y - COLH}px)`
      }
    },
  }
}

// ── generic face card (not any real app): photo, cool grade, photo-progress pips, name + distance
export function makeFaceCard(parent, face, k) {
  const card = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px',
    borderRadius: '30px', overflow: 'hidden', background: '#1a1d24', boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset' }, parent)
  const ph = img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.24)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.35) 0%, rgba(8,10,14,0) 16%, rgba(8,10,14,0) 52%, rgba(8,10,14,0.9) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '22px', right: '22px', top: '20px', height: '5px', display: 'flex', gap: '8px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '3px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }, pips)
  el('div', { position: 'absolute', left: '34px', bottom: '78px', fontFamily: SANS, fontWeight: 600, fontSize: '46px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, NAMES[face])
  el('div', { position: 'absolute', left: '36px', bottom: '40px', fontFamily: SANS, fontWeight: 400, fontSize: '25px', color: 'rgba(235,238,244,0.66)' }, card, DIST[k % DIST.length])
  // a cold sheen that rides across the card while it flies
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-20%', width: '60%', height: '140%', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(220,230,255,0.22) 50%, rgba(255,255,255,0) 100%)', transform: 'rotate(18deg)', opacity: 0 }, card)
  return { card, ph, sheen }
}

/** pose of the final card (flies in from the right, slams at SLAM, recoils, shakes, then a slow push). Used by f1 (<SLAM) and f2 (≥SLAM). */
export function lastCardPose(t) {
  if (t < SLAM) {
    const u = prog(t, FLY_IN, SLAM), k = Math.pow(1 - u, 1.18)
    return { x: FEED_X + 1500 * k, y: FEED_Y - 70 * k, rot: 22 * k, s: FEED_S * (1 + 0.04 * k), blur: 34 * Math.pow(1 - u, 0.5) * (u > 0 ? 1 : 0) }
  }
  const d = t - SLAM, f = Math.round(t * 30), r = rng(f * 131 + 9)
  const recoil = Math.exp(-d * 22) * Math.sin(d * 52)
  const shake = Math.exp(-d * 13) * 14
  const push = 1 + 0.028 * ease.inOutQuad(prog(t, SLAM + 0.1, 4.62))
  return {
    x: FEED_X - 26 * recoil + (r() - 0.5) * shake, y: FEED_Y + (r() - 0.5) * shake * 0.8,
    rot: -2.6 * recoil, s: FEED_S * push * (1 + 0.035 * Math.exp(-d * 18) * Math.cos(d * 40)), blur: 0,
  }
}

// directional (horizontal) motion-blur filters, one per in-flight card
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
export { blurDefs }

/** words that punch in (opacity, rise, de-blur), staggered */
function words(parent, text, style, at, gap = 0.1) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', marginRight: '0.24em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + 0.16), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 22}px) scale(${lerp(1.12, 1, e)})`
        w.e.style.filter = p < 1 ? `blur(${(1 - e) * 8}px)` : 'none'
      }
    },
  }
}

export default function build(stage) {
  const root = fill(stage, { background: '#0a0c10' })
  const back = coldBackdrop(root)
  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const blurs = blurDefs(root, 6, 'f1mb')
  const cards = Array.from({ length: N }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...makeFaceCard(holder, faceOf(k), k) }
  })
  const lastH = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '2000' }, deck)
  const last = makeFaceCard(lastH, LAST_FACE, 5)
  const lastBlur = blurs[5]
  last.card.style.filter = 'url(#f1mb5)'

  // copy: "We swipe on faces." (left) … "in half a second." (right) — the sentence runs across the card
  const T = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '92px', color: BONE, lineHeight: 1, textShadow: '0 2px 30px rgba(5,6,10,0.9), 0 0 2px rgba(5,6,10,0.6)', zIndex: '3000' }
  const left = words(root, 'We swipe on faces.', { ...T, right: (W - 668) + 'px', top: (FEED_Y - 50) + 'px', textAlign: 'right' }, 0.0, 0.09)
  const right = words(root, 'in half a second.', { ...T, left: '1252px', top: (FEED_Y - 50) + 'px' }, 1.32, 0.12)
  // judge-timer under the card
  const timer = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '884px', textAlign: 'center', fontFamily: MONO, fontSize: '30px', letterSpacing: '0.2em', color: 'rgba(239,230,214,0.62)', zIndex: '3000', whiteSpace: 'pre' }, root)
  const tNum = el('span', { color: BONE }, null), tCount = el('span', {}, null)
  timer.append('JUDGED IN ', tNum, '   ·   ', tCount)
  const grain = grainLayer(root, 0.55)
  grain.el.style.zIndex = '4000'
  // cold flicker (exposure) over everything
  const flick = el('div', { position: 'absolute', inset: 0, background: '#000', opacity: 0, zIndex: '3500', pointerEvents: 'none' }, root)

  return {
    start: 0, end: 4.2, root,
    update(t) {
      back.update(t)
      const fr = Math.round(t * 30)
      // which card is on top: the first whose swipe hasn't started
      let top = SWIPES.findIndex(s => t < s); if (top < 0) top = N
      let blurSlot = 0
      cards.forEach((c, k) => {
        const s = SWIPES[k], fl = flightOf(k)
        if (t >= s + fl || k > top + 3) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        let x = FEED_X, y = FEED_Y, rot = 0, sc = FEED_S, bright = 1, bl = 0, sheen = 0
        if (t >= s) {                                         // flying off
          const u = prog(t, s, s + fl), d = dirOf(k)
          x += d * (60 * u + 1500 * u * u); y += -50 * u + 150 * u * u; rot = d * (5 + 24 * u)
          bl = Math.min(26, 6 + 34 * u) * clamp(u * 5)
          sheen = u
        } else {                                              // in the stack: depth eases forward as cards ahead leave
          let depth = k - top
          if (top > 0) { const ps = SWIPES[top - 1]; depth += 1 - ease.outCubic(prog(t, ps, ps + Math.min(0.2, flightOf(top - 1) * 0.8))) }
          if (top === k) {                                    // the judged card: a tiny nervous drift before it goes
            const lead = prog(t, s - 0.12, s)
            x += dirOf(k) * 30 * ease.inQuad(lead); rot = dirOf(k) * 3 * ease.inQuad(lead)
          }
          sc = FEED_S * (1 - 0.06 * depth); y += 26 * depth; bright = 1 - 0.32 * depth
          if (depth > 2.5) bright = 0
        }
        c.holder.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${sc})`
        c.holder.style.opacity = String(clamp(bright * 1.5, 0, 1))
        c.card.style.filter = bright < 1 ? `brightness(${Math.max(0.25, bright)})` : ''
        if (bl > 0.5 && blurSlot < 5) { const g = blurs[blurSlot]; g.setAttribute('stdDeviation', `${bl.toFixed(1)} ${(bl * 0.12).toFixed(1)}`); c.card.style.filter = `url(#f1mb${blurSlot})`; blurSlot++ }
        c.sheen.style.opacity = String(sheen > 0 ? 1 - sheen : 0)
        c.sheen.style.transform = `translateX(${sheen * 260}%) rotate(18deg)`
      })
      // the last card: in from the right, slams at SLAM (f2 owns it from SLAM on)
      if (t >= FLY_IN && t < SLAM) {
        const p = lastCardPose(t)
        lastH.style.display = 'block'
        lastH.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.s})`
        lastBlur.setAttribute('stdDeviation', `${p.blur.toFixed(1)} 1`)
      } else lastH.style.display = 'none'

      // copy + timer fade on the slam (the impact clears the frame)
      const out = 1 - ease.inQuad(prog(t, SLAM - 0.04, SLAM + 0.12))
      left.update(t, out); right.update(t, out)
      const since = top === 0 ? t + 0.18 : t - SWIPES[top - 1]
      const judged = t >= FLY_IN ? 0.4 : (top < N ? since : 0.07)
      tNum.textContent = judged.toFixed(2) + 's'
      tCount.textContent = 'FACE ' + String(Math.min(top + 1, N + 1)).padStart(3, '0')
      timer.style.opacity = String(ease.outQuad(prog(t, 0.05, 0.3)) * out)
      // nervous exposure flicker that grows with the tempo
      const tempo = prog(t, 1.2, 3.7)
      flick.style.opacity = String(clamp((noise1(t * 22, 5) - 0.5) * 0.18 * (0.3 + tempo) + (fr % 2 ? 0.02 * tempo : 0), 0, 0.2))
      grain.update(t)
    },
  }
}

// ── sound: one whoosh + tick per swipe (accelerating), a tension riser, the in-fly whoosh, the slam
export const cues = [
  ...SWIPES.flatMap((s, k) => {
    const gap = k + 1 < SWIPES.length ? SWIPES[k + 1] - s : 0.07
    return [['whoosh', Math.max(0, s), Math.max(0.12, Math.min(0.3, gap * 0.9)), 0.07 + 0.05 * (k % 2)], ['tick', Math.max(0, s), 0.05 + Math.min(0.06, k * 0.003)]]
  }),
  ['riser', 1.9, 3.95, 0.07],
  ['whoosh', FLY_IN - 0.02, 0.28, 0.2],
  ['boom', SLAM, 0.5],
  ['tick', SLAM, 0.22],
]
