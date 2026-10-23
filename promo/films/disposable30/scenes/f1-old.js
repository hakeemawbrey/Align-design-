// F1 · THE OLD WAY (0–4.2s). Cold, colour-drained, grainy: a generic face feed (left of centre) swiped away
// faster and faster with ✕ / ♥ stamps, a big mono judge-timer counting down "JUDGED IN 0.4s" + "FACE 0xx", and
// one centred stacked copy block on the right: "We swipe on faces." / "in half a second." Every face is crisp for
// ≥ 4 frames before it flies. The last card (Juniper, 27 — the face we meet in f6) flies in and SLAMS to a stop
// dead centre at 4.0 — f2 takes that card over from 4.0 (same pose function, same backdrop + grain stack).
// Everything is a pure function of t. Shared bits (backdrop, face card, last-card pose, grain) are exported for f2.
import { clamp, lerp, prog, ease, rng, noise1, el } from '../../../src/lib.js'
import { W, H, IMG, SANS, SERIF, MONO, fill, img } from '../../../src/scenes/common.js'

// ── geometry shared with f2 / f3 (agreed: Align card body 520 wide centred at 960,470 at 6.5s)
export const CARD_W = 520, CARD_H = 830          // card body (both faces) — card-profile-3 body aspect 1254:2002
export const FEED_S = 440 / 520                  // feed cards are drawn at 440 px wide
export const FEED_X = 700, FEED_Y = 482         // the feed stack (left of centre; copy block sits to the right)
export const SLAM_X = 960, SLAM_Y = 466           // the last card slams dead centre
export const SLAM = 4.0                           // the last card stops dead here
const FLY_IN = 3.74                               // the last card enters from the right
export const LAST_FACE = 'juniper'                // juniper.jpg — the face that gets flipped (and revealed in f6)
// grain stack (f2 copies it for 4.0–EDGE): heavy on the cold backdrop, lighter over the card photos
export const GRAIN_BACK = 0.4, GRAIN_TOP = 0.3     // overlay ×2 on the backdrop ≈ 0.55-0.6 look; 0.3 on the photos

const BONE = '#efe6d6'
// one generic name per photo (p1..p12)
const NAMES = { juniper: 'Juniper, 27', 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 4: 'Jun, 27', 5: 'Ama, 25', 6: 'Cole, 31',
  7: 'Maya, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

// ── swipe schedule: card k flies off at SW[k]. Two full 0.4s judgements first (both swiped by 0.8s), then the gap
// shrinks to 7 frames — never less, so each face reads crisp for ≥ 4 frames between the previous card clearing and its own exit
export const SWIPES = (() => {
  const out = []; let t = 0.4, gap = 0.4
  while (t < FLY_IN - 0.08) { out.push(t); t += gap; if (out.length >= 2) gap = Math.max(0.234, gap * 0.88) }
  return out
})()
const N = SWIPES.length
const dirOf = k => k === N - 1 ? -1 : ((k % 4 === 1 || k % 7 === 5) ? 1 : -1)   // mostly left (✕), now and then right (♥); last one left (clear of the in-flyer)
const flightOf = k => clamp((k + 1 < N ? SWIPES[k + 1] - SWIPES[k] : 0.2) * 0.95, 0.18, 0.3)
const ROSE = '#e8628a'
const FACE_NO = k => 38 - N + k                   // the slammed card is FACE 038
const faceOf = k => [7, 2, 11, 5, 9, 1, 3, 12, 6, 10, 8, 2, 5, 11, 1, 9, 7, 12, 3, 6, 10, 8, 1, 5, 9, 2, 11, 7, 3, 12, 6][k % 31]   // (p4 = Marcus: kept out of the feed)

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
const PHOTO = i => i === 'juniper' ? `${IMG}juniper.jpg` : `${IMG}people/p${i}.jpg`
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
  // juniper.jpg (720×960, small face in an aura) is zoomed 1.35× so her face sits where the feed faces sit
  const ph = face === 'juniper'
    ? img(card, PHOTO(face), { left: '-135px', top: '-262px', width: '840px', height: '1120px', filter: COLD_FILTER + ' brightness(0.94)' })
    : img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.24)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.35) 0%, rgba(8,10,14,0) 16%, rgba(8,10,14,0) 52%, rgba(8,10,14,0.9) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '22px', right: '22px', top: '20px', height: '5px', display: 'flex', gap: '8px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '3px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }, pips)
  el('div', { position: 'absolute', left: '34px', bottom: '78px', fontFamily: SANS, fontWeight: 600, fontSize: '46px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, NAMES[face])
  el('div', { position: 'absolute', left: '36px', bottom: '40px', fontFamily: SANS, fontWeight: 400, fontSize: '25px', color: 'rgba(235,238,244,0.66)' }, card, DIST[k % DIST.length])
  // a cold sheen that rides across the card while it flies
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-20%', width: '60%', height: '140%', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(220,230,255,0.22) 50%, rgba(255,255,255,0) 100%)', transform: 'rotate(18deg)', opacity: 0 }, card)
  // generic swipe stamps (no brand UI): bone ✕ (pass) top-right, rose ♥ (like) top-left; ~90px on screen at feed scale
  const stamp = d => el('div', { position: 'absolute', top: '58px', [d < 0 ? 'right' : 'left']: '40px', width: '108px', height: '108px', opacity: 0,
    filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.6))' }, card, d < 0
    ? `<svg viewBox="0 0 128 128" width="108" height="108"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${BONE}" stroke-width="7"/><path d="M42 42 L86 86 M86 42 L42 86" stroke="${BONE}" stroke-width="11" stroke-linecap="round"/></svg>`
    : `<svg viewBox="0 0 128 128" width="108" height="108"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${ROSE}" stroke-width="7"/><path d="M64 96 C30 72 30 44 46 40 C55 38 61 43 64 50 C67 43 73 38 82 40 C98 44 98 72 64 96 Z" fill="${ROSE}"/></svg>`)
  return { card, ph, sheen, stampX: stamp(-1), stampH: stamp(1) }
}

/** pose of the final card (flies in from the right, slams at SLAM, recoils, shakes, then a slow push). Used by f1 (<SLAM) and f2 (≥SLAM). */
export function lastCardPose(t) {
  if (t < SLAM) {
    const u = prog(t, FLY_IN, SLAM), k = Math.pow(1 - u, 1.18)
    return { x: SLAM_X + 1300 * k, y: SLAM_Y - 70 * k, rot: 18 * k, s: FEED_S * (1 + 0.04 * k), blur: 30 * Math.pow(1 - u, 0.5) * (u > 0 ? 1 : 0) }
  }
  const d = t - SLAM, f = Math.round(t * 30), r = rng(f * 131 + 9)
  const recoil = Math.exp(-d * 22) * Math.sin(d * 52)
  const shake = Math.exp(-d * 13) * 14
  const push = 1 + 0.028 * ease.inOutQuad(prog(t, SLAM + 0.1, 4.62))
  return {
    x: SLAM_X - 26 * recoil + (r() - 0.5) * shake, y: SLAM_Y + (r() - 0.5) * shake * 0.8,
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
  const backGrain = grainLayer(root, GRAIN_BACK)                 // heavy grain on the backdrop only (under the cards)
  backGrain.el.style.zIndex = '1'
  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const blurs = blurDefs(root, 6, 'f1mb')
  const cards = Array.from({ length: N }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...makeFaceCard(holder, faceOf(k), k) }
  })
  const lastH = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '2000' }, deck)
  const last = makeFaceCard(lastH, LAST_FACE, 4)
  const lastBlur = blurs[5]
  last.card.style.filter = 'url(#f1mb5)'

  // copy: ONE centred stacked block to the right of the feed — "We made dating" / "disposable." (the hook, frame one)
  const T = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '116px', color: BONE, lineHeight: 1.12, textShadow: '0 2px 30px rgba(5,6,10,0.9), 0 0 2px rgba(5,6,10,0.6)' }
  const block = el('div', { position: 'absolute', left: '990px', width: '840px', top: (FEED_Y - 112) + 'px', textAlign: 'center', zIndex: '3000' }, root)
  const line1 = words(block, 'We made dating', { ...T, position: 'relative', display: 'block' }, 0.0, 0.08)
  const line2 = words(block, 'disposable.', { ...T, position: 'relative', display: 'block' }, 0.5, 0.1)
  // the hero judge-timer under the feed card (ticks down 0.4 → 0.0 per face) + the face counter to its right
  const timer = el('div', { position: 'absolute', left: (FEED_X - 360) + 'px', width: '720px', top: '858px', textAlign: 'center', fontFamily: MONO, fontSize: '64px',
    letterSpacing: '0.04em', color: 'rgba(239,230,214,0.9)', zIndex: '3000', whiteSpace: 'pre', textShadow: '0 2px 18px rgba(5,6,10,0.9)' }, root)
  const tNum = el('span', { color: BONE, fontWeight: 700 }, null)
  timer.append('JUDGED IN ', tNum)
  const tCount = el('div', { position: 'absolute', left: '1090px', top: '876px', fontFamily: MONO, fontSize: '40px', letterSpacing: '0.12em', color: 'rgba(239,230,214,0.62)',
    zIndex: '3000', whiteSpace: 'pre', textShadow: '0 2px 18px rgba(5,6,10,0.9)' }, root)
  const grain = grainLayer(root, GRAIN_TOP)                       // light grain over everything (faces stay readable)
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
        const s = SWIPES[k], fl = flightOf(k), d = dirOf(k)
        if (t >= s + fl || k > top + 3) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        let x = FEED_X, y = FEED_Y, rot = 0, sc = FEED_S, bright = 1, bl = 0, sheen = 0
        if (t >= s) {                                         // flying off, tilting to ±12°
          const u = prog(t, s, s + fl)
          x += d * (120 * u + 1500 * u * u); y += -40 * u + 140 * u * u; rot = d * (3 + 9 * u)
          bl = Math.min(20, 4 + 26 * u) * clamp(u * 4)
          sheen = u
        } else {                                              // in the stack: depth eases forward fast as the card ahead leaves
          let depth = k - top
          if (top > 0) { const ps = SWIPES[top - 1]; depth += 1 - ease.outCubic(prog(t, ps, ps + Math.min(0.1, flightOf(top - 1) * 0.5))) }
          if (top === k) {                                    // the judged card: a tiny nervous drift before it goes
            const lead = prog(t, s - 0.12, s)
            x += d * 30 * ease.inQuad(lead); rot = d * 3 * ease.inQuad(lead)
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
        // the stamp punches in 2 frames before the exit and rides the card off
        const sp = prog(t, s - 0.067, s + 0.02), st = d < 0 ? c.stampX : c.stampH
        st.style.opacity = String(sp > 0 ? clamp(sp * 3) : 0)
        st.style.transform = `scale(${lerp(1.35, 1, ease.outBack(sp))}) rotate(${d * -8}deg)`
      })
      // the last card: in from the right, slams dead centre at SLAM (f2 owns it from SLAM on)
      if (t >= FLY_IN && t < SLAM) {
        const p = lastCardPose(t)
        lastH.style.display = 'block'
        lastH.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.s})`
        lastBlur.setAttribute('stdDeviation', `${p.blur.toFixed(1)} 1`)
      } else lastH.style.display = 'none'

      // copy + timer clear as the last card flies across them (f2 covers the frame from 4.0)
      const out = 1 - ease.inQuad(prog(t, FLY_IN, 3.92))
      line1.update(t, out); line2.update(t, out)
      const start = t >= FLY_IN ? FLY_IN : top === 0 ? 0 : SWIPES[Math.min(top, N) - 1]
      const rem = clamp(0.4 - (t - start), 0, 0.4)
      tNum.textContent = (Math.ceil(rem * 10 - 1e-6) / 10).toFixed(1) + 's'
      tCount.textContent = 'FACE ' + String(FACE_NO(Math.min(top, N))).padStart(3, '0')
      const tOut = 1 - ease.inQuad(prog(t, 3.84, 3.97))
      timer.style.opacity = String(tOut); tCount.style.opacity = String(tOut)
      // nervous exposure flicker that grows with the tempo (gone before f2 takes over at 4.0): a slow irregular
      // drift plus sparse, uneven one-frame dips (~1 frame in 6, random depth) — no regular strobe
      const tempo = prog(t, 1.2, 3.7) * (1 - prog(t, 3.75, 3.9))
      const fq = rng(fr * 4271 + 11), dip = fq() < 0.16 ? (0.01 + 0.02 * fq()) * tempo : 0
      flick.style.opacity = String(clamp((noise1(t * 7.3, 5) - 0.5) * 0.1 * (0.3 + tempo) + dip, 0, 0.1) * (1 - prog(t, 3.75, 3.9)))
      backGrain.update(t); grain.update(t)
    },
  }
}

// ── sound: one whoosh + tick per swipe (accelerating), a tension riser, the in-fly whoosh, the slam
export const cues = [
  ...SWIPES.flatMap((s, k) => {
    const gap = k + 1 < SWIPES.length ? SWIPES[k + 1] - s : 0.07
    return [['whoosh', Math.max(0, s), Math.max(0.12, Math.min(0.3, gap * 0.9)), 0.07 + 0.05 * (k % 2)], ['tick', Math.max(0, s), 0.05 + Math.min(0.06, k * 0.003)],
      ['tick', s - 0.067, 0.03]]                              // the ✕ / ♥ stamp lands
  }),
  ['riser', 1.9, 3.95, 0.07],
  ['whoosh', FLY_IN - 0.02, 0.28, 0.2],
  ['boom', SLAM, 0.5],
  ['tick', SLAM, 0.22],
]
