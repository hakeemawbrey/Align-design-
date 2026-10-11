import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ── real card geometry (measured in the PNGs) ───────────────────────────────
// card-reveal.png 1560×2740: card body x 66..1494; photo window x 118..1443, y 314..1207.
// The window shows juniper.jpg cover-fitted to the window width (1325px → image
// 1325×1767), with the window top sitting 312px below the image top.
const REV = { w: 1560, h: 2740, win: { x: 118, y: 314, w: 1325, h: 893 }, imgTop: 312 }
const D = 0.35 // display scale → card body ≈ 500px wide, 959px PNG tall
// card-back.png 1528×2347: body x 120..1439 (1320 wide) → match the front body width
const BACK = { w: 1528, h: 2347, markX: 782, markY: 1134 }
const DB = 1430 * D / 1320
// photo window rect in world coords (world origin = screen centre = card centre)
const WIN = {
  x: (REV.win.x - REV.w / 2) * D, y: (REV.win.y - REV.h / 2) * D,
  w: REV.win.w * D, h: REV.win.h * D,
}
const INSET = 2 // land just inside the window so the card's own window edge-glow shows
const IMG_END_SCALE = WIN.w / 1920 // the <img> is laid out 1920×2560
const IMG_END_TY = (REV.win.w * 4 / 3 / 2 - (REV.imgTop + REV.win.h / 2)) * D // image centre below window centre
const MARK = { x: (BACK.markX - BACK.w / 2) * DB, y: (BACK.markY - BACK.h / 2) * DB }

/** tiling film grain (deterministic), as a data URL */
function grainURL(size = 256, seed = 7) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const g = c.getContext('2d'); const d = g.createImageData(size, size); const r = rng(seed)
  for (let i = 0; i < size * size; i++) {
    const v = Math.round(128 + (r() + r() + r() - 1.5) * 120)
    d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = clamp(v, 0, 255); d.data[i * 4 + 3] = 255
  }
  g.putImageData(d, 0, 0)
  return c.toDataURL()
}

// ── the mystery card: Juniper (Libra) behind her aura veil, as in app VeilPhoto.tsx ──
export const S3_FIRST = 6.867            // first visible S3 frame (frame 206)
const LIFT = { a: 7.3, b: 8.5 }          // veil lift (app LIFT_S 1.25s, compressed to fit before the 8.5 shrink)
const VPAD = { x: 96, y: 54 }            // veil canvas overscan so its blur never pulls in dark edges
const VW = W + VPAD.x * 2, VH = H + VPAD.y * 2
const VEIL_SRC = IMG + 'aura/libra.jpg'
// placement of libra.jpg (640×585; crop its dark 12px border) inside the visible frame
const VEIL_IMG = { sw: 628, sh: 572, h: 1180, top: -150 }

/** cubic-bezier easing (same curve the app uses: [0.65, 0, 0.25, 1]) */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let u = x
    for (let i = 0; i < 8; i++) { const fx = ((ax * u + bx) * u + cx) * u - x, d = (3 * ax * u + 2 * bx) * u + cx; if (Math.abs(fx) < 1e-6 || !d) break; u -= fx / d }
    return ((ay * u + by) * u + cy) * u
  }
}
const liftEase = bezier(0.42, 0, 0.38, 1)  // app uses [0.65,0,0.25,1]; softened so the dissolve reads over the whole 1.1s
/** time at which the lift crosses p = 0.55 (the app's onPeak) */
const LIFT_PEAK = (() => { let lo = 0, hi = 1; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (liftEase(m) < 0.55) lo = m; else hi = m } return LIFT.a + lo * (LIFT.b - LIFT.a) })()
const CAP = { eyebrow: 6.95, line: 7.05, out: 8.45 }   // caption beats (sound: eyebrow tick, line pop)

const veilSrc = typeof document !== 'undefined' ? document.createElement('img') : null
if (veilSrc) {
  veilSrc.src = VEIL_SRC; veilSrc.decoding = 'sync'
  Object.assign(veilSrc.style, { position: 'absolute', width: '1px', height: '1px', opacity: '0', pointerEvents: 'none', left: '-10px', top: '-10px' })
  document.body.appendChild(veilSrc) // main.js waits for document images
}
let veilCache = null
/** the static mystery-card veil (aura art, bloom, mauve vignette) as a VW×VH canvas; the
 *  visible frame is the centre W×H crop at (VPAD.x, VPAD.y). S2's pixel mound samples this too. */
export function veilCanvas() {
  if (veilCache) return veilCache
  if (!veilSrc || !veilSrc.complete || !veilSrc.naturalWidth) return null
  const c = document.createElement('canvas'); c.width = VW; c.height = VH
  const g = c.getContext('2d')
  g.fillStyle = '#120a2a'; g.fillRect(0, 0, VW, VH)
  // aura art, feathered at its sides so it melts into the indigo
  const ih = VEIL_IMG.h, iw = ih * VEIL_IMG.sw / VEIL_IMG.sh
  const ix = VW / 2 - iw / 2, iy = VPAD.y + VEIL_IMG.top
  const o = document.createElement('canvas'); o.width = VW; o.height = VH
  const og = o.getContext('2d')
  og.filter = 'blur(7px) saturate(1.3) brightness(1.1)'
  og.drawImage(veilSrc, 6, 2, VEIL_IMG.sw, VEIL_IMG.sh, ix, iy, iw, ih)
  og.filter = 'none'
  og.globalCompositeOperation = 'destination-in'
  const fx = og.createLinearGradient(ix, 0, ix + iw, 0)
  fx.addColorStop(0, 'rgba(0,0,0,0)'); fx.addColorStop(0.16, '#000'); fx.addColorStop(0.84, '#000'); fx.addColorStop(1, 'rgba(0,0,0,0)')
  og.fillStyle = fx; og.fillRect(0, 0, VW, VH)
  og.globalCompositeOperation = 'destination-in'
  const fy = og.createLinearGradient(0, iy, 0, iy + ih)
  fy.addColorStop(0, 'rgba(0,0,0,0)'); fy.addColorStop(0.1, '#000'); fy.addColorStop(0.92, '#000'); fy.addColorStop(1, 'rgba(0,0,0,0)')
  og.fillStyle = fy; og.fillRect(0, 0, VW, VH)
  g.drawImage(o, 0, 0)
  // glow: a wide soft bloom of the same art
  g.globalCompositeOperation = 'screen'
  g.filter = 'blur(60px)'; g.globalAlpha = 0.7; g.drawImage(o, 0, 0)
  g.filter = 'blur(18px)'; g.globalAlpha = 0.35; g.drawImage(o, 0, 0)
  g.filter = 'none'; g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'
  // the app's vignette: radial-gradient(70% 80% at 50% 40%, transparent 40%, rgba(77,26,73,0.6) 100%)
  g.save()
  g.translate(VW / 2, VPAD.y + H * 0.4); g.scale(1, (0.8 * H) / (0.7 * W))
  const rg = g.createRadialGradient(0, 0, 0, 0, 0, 0.7 * W)
  rg.addColorStop(0.4, 'rgba(77,26,73,0)'); rg.addColorStop(1, 'rgba(77,26,73,0.6)')
  g.fillStyle = rg; g.fillRect(-VW, -VH * 3, VW * 2, VH * 6)
  g.restore()
  return (veilCache = c)
}

// ───────────────────────────────────────────────────── S3 · the mystery card reveals
export function sceneVeil(stage) {
  const root = fill(stage, { background: C.void })
  const stars = makeStars(root, 90, 21)
  const world = el('div', { position: 'absolute', left: '50%', top: '50%', width: '0', height: '0' }, root)
  // front face: photo frame that lands in the real card's photo window, then the card itself
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
  const card = img(front, A + 'card-reveal.png', {
    left: -REV.w * D / 2 + 'px', top: -REV.h * D / 2 + 'px', width: REV.w * D + 'px', height: REV.h * D + 'px', clipPath: 'inset(50%)',
  })
  // one gold hairline glint across the card body once it has opened out
  const BODY = { x: 66 * D, y: 123 * D, w: (1494 - 66) * D, h: (2620 - 123) * D, r: 100 * D }
  const glintBox = el('div', {
    position: 'absolute', left: (-REV.w * D / 2 + BODY.x) + 'px', top: (-REV.h * D / 2 + BODY.y) + 'px', width: BODY.w + 'px', height: BODY.h + 'px',
    borderRadius: BODY.r + 'px', overflow: 'hidden', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
  }, front)
  const glint = el('div', {
    position: 'absolute', top: '-30%', left: 0, width: '180px', height: '160%',
    background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.10) 38%, rgba(255,228,160,0.55) 49%, rgba(255,246,220,0.95) 50%, rgba(255,228,160,0.55) 51%, rgba(242,199,92,0.10) 62%, rgba(242,199,92,0) 100%)',
    transform: 'skewX(-24deg)',
  }, glintBox)
  const frame = el('div', { position: 'absolute', overflow: 'hidden', background: C.raised }, front)
  const real = img(frame, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover' })
  // the aura veil (mystery card) over the photo; dissolves upward from the bottom
  const veil = el('div', { position: 'absolute', left: -VPAD.x + 'px', top: -VPAD.y + 'px', width: VW + 'px', height: VH + 'px', willChange: 'transform, filter' }, frame)
  const veilCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: VW + 'px', height: VH + 'px' }, veil)
  veilCv.width = VW; veilCv.height = VH
  let veilDrawn = false
  // light seam riding the dissolve edge
  const seam = el('div', {
    position: 'absolute', left: '-10%', right: '-10%', top: 0, height: '200px', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen',
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,250,235,0.9) 0%, rgba(255,189,246,0.5) 35%, rgba(242,199,92,0.16) 60%, transparent 75%)',
  }, frame)
  // sparkle burst at the reveal peak (the app fires one on onPeak)
  const SPK = (() => {
    const r = rng(77)
    return Array.from({ length: 14 }, (_, i) => ({
      x: lerp(560, 1360, r()), y: lerp(90, 760, r()), s: lerp(18, 46, r()), d: r() * 0.22, rot: r() * 40 - 20, gold: i % 3 === 0,
    }))
  })()
  const sparks = SPK.map((k) => {
    const e = el('div', { position: 'absolute', left: (k.x - 50) + 'px', top: (k.y - 50) + 'px', width: '100px', height: '100px', opacity: 0, mixBlendMode: 'screen', pointerEvents: 'none' }, frame)
    const col = k.gold ? '255,228,160' : '255,236,250'
    e.innerHTML = `<svg viewBox="-50 -50 100 100" width="100" height="100" style="overflow:visible"><defs><radialGradient id="sg"><stop offset="0" stop-color="rgba(${col},0.9)"/><stop offset="1" stop-color="rgba(${col},0)"/></radialGradient></defs>` +
      `<circle r="22" fill="url(#sg)"/><path d="M0,-50 C3,-6 6,-3 50,0 C6,3 3,6 0,50 C-3,6 -6,3 -50,0 C-6,-3 -3,-6 0,-50Z" fill="rgb(${col})"/></svg>`
    return e
  })
  const grain = el('div', {
    position: 'absolute', inset: 0, backgroundImage: `url(${grainURL()})`, backgroundSize: '256px 256px',
    mixBlendMode: 'overlay', opacity: 0.16, pointerEvents: 'none',
  }, frame)
  // back face: the deck card back (seed of life + chakra column)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
  img(back, A + 'card-back.png', { left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px' })
  // card back dims over the end of the push so it meets S4's darker halftone sky
  const backDim = el('div', { position: 'absolute', left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px', background: 'radial-gradient(closest-side, rgba(20,10,46,0.9), rgba(20,10,46,1))', opacity: 0, pointerEvents: 'none' }, back)
  // concept line over the mystery card (styled like the S7 captions)
  const scrim = el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '440px', background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.55) 45%, rgba(11,6,32,0.8) 100%)', opacity: 0 }, root)
  const capBox = el('div', { position: 'absolute', left: '50%', bottom: '84px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
  const eyebrow = el('div', { fontFamily: MONO, fontSize: '20px', letterSpacing: '0.26em', color: 'rgba(255,246,234,0.88)', textShadow: '0 1px 12px rgba(11,6,32,0.7)', marginBottom: '14px', textTransform: 'uppercase', opacity: 0 }, capBox, '✦&nbsp;&nbsp;Mystery card&nbsp;&nbsp;✦')
  const capLine = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '72px', lineHeight: 1.05, color: '#fff6ea', textShadow: '0 2px 30px rgba(11,6,32,0.75), 0 1px 3px rgba(11,6,32,0.6)', opacity: 0 }, capBox, 'A mystery card, until you both align.')

  return {
    start: 6.8, end: 10.02, root,
    update(t) {
      // ── mystery card → reveal, exactly the app's VeilPhoto curves (p = 0 → 1 over LIFT) ──
      if (!veilDrawn) { const vc = veilCanvas(); if (vc) { veilCv.getContext('2d').drawImage(vc, 0, 0); veilDrawn = true } }
      const p = liftEase(prog(t, LIFT.a, LIFT.b))
      // photo pulls into focus from completely unrecognisable
      // (focus runs on its own slower clock so the face stays unrecognisable as the veil first clears)
      const fb = Math.pow(1 - prog(t, LIFT.a + 0.15, LIFT.b - 0.14), 2)
      real.style.filter = `blur(${72 * fb}px) saturate(${lerp(0.6, 1.08, p)})`
      const liftScale = lerp(1.14, 1, p)
      // veil: mask edge 0 → 135% from the bottom (transparent below edge−35%), drifts up 18%, blur grows
      const edge = lerp(0, 135, p)
      veil.style.display = p >= 1 ? 'none' : 'block'
      veil.style.webkitMaskImage = veil.style.maskImage = p <= 0 ? 'none' : `linear-gradient(to top, transparent ${edge - 35}%, #000 ${edge}%)`
      const hold = ease.inOutQuad(prog(t, S3_FIRST, LIFT.a + 0.3))
      veil.style.transform = `translateY(${-H * 0.18 * p}px) scale(${1 + 0.025 * hold + 0.04 * p})`
      veil.style.filter = p <= 0 ? 'none' : `blur(${lerp(0, 22, p)}px) brightness(${1 + 0.12 * Math.sin(Math.PI * clamp(p * 1.4))})`
      // light seam sits in the middle of the soft edge (app: seamY = h·(1 − (p·1.35 − 0.175)) − seam/2)
      const seamO = p < 0.08 ? p / 0.08 : p < 0.75 ? lerp(1, 0.9, (p - 0.08) / 0.67) : lerp(0.9, 0, (p - 0.75) / 0.25)
      seam.style.opacity = String(p <= 0 ? 0 : seamO)
      seam.style.transform = `translateY(${H * (1 - (p * 1.35 - 0.175)) - 100}px)`
      // sparkle burst from the peak (p ≈ 0.55)
      const pk = prog(t, LIFT_PEAK, LIFT_PEAK + 0.55)
      SPK.forEach((k, i) => {
        const q = prog(pk, k.d, k.d + 0.6)
        const e = sparks[i]
        if (q <= 0 || q >= 1) { e.style.opacity = '0'; return }
        const sz = k.s / 50 * Math.sin(Math.PI * q)
        e.style.opacity = String(Math.min(1, Math.sin(Math.PI * q) * 1.4))
        e.style.transform = `rotate(${k.rot + q * 45}deg) scale(${sz})`
      })
      // gentle push (capped: the source photo is small)
      // + a slow extra push through the caption hold so the frame never goes dead
      const push = liftScale * lerp(1.0, 1.03, ease.outQuad(prog(t, 6.86, 8.75))) * lerp(1, 1.05, ease.inOutQuad(prog(t, 8.0, 8.9)))
      const yShift = lerp(-360, -380, ease.outQuad(prog(t, 6.86, 8.75)))
      // shrink so the photo lands exactly in the real card's photo window
      const k = ease.inOutCubic(prog(t, 8.5, 9.08)) // k ≥ 0.99 by ~9.01
      const fw = lerp(W, WIN.w - INSET * 2, k), fh = lerp(H, WIN.h - INSET * 2, k)
      const fcy = lerp(0, WIN.y + WIN.h / 2, k)
      frame.style.width = fw + 'px'; frame.style.height = fh + 'px'
      frame.style.left = -fw / 2 + 'px'; frame.style.top = (fcy - fh / 2) + 'px'
      frame.style.borderRadius = lerp(0, 14, k) + 'px'
      const imgScale = lerp(push, IMG_END_SCALE, k)
      const ty = lerp(yShift, IMG_END_TY, k)
      real.style.transform = `translate(-50%,-50%) translateY(${ty}px) scale(${imgScale})`
      // grain crawls a new tile offset every frame; fades as the photo becomes the card
      const fi = Math.round(t * 30), gr = rng(fi * 131 + 17)
      grain.style.backgroundPosition = `${Math.floor(gr() * 256)}px ${Math.floor(gr() * 256)}px`
      grain.style.opacity = String(0.16 * (1 - k))
      // the real card opens out from the photo window (clip grows outward), then the photo frame hands off
      const cp = ease.outCubic(prog(t, 9.06, 9.32)) // opens only once the photo has landed
      const wl = REV.win.x * D, wt = REV.win.y * D, wr = (REV.w - REV.win.x - REV.win.w) * D, wb = (REV.h - REV.win.y - REV.win.h) * D
      card.style.clipPath = t < 9.06 ? 'inset(50%)' : cp >= 1 ? 'none'
        : `inset(${lerp(wt, 0, cp)}px ${lerp(wr, 0, cp)}px ${lerp(wb, 0, cp)}px ${lerp(wl, 0, cp)}px round ${lerp(14, BODY.r, cp)}px)`
      frame.style.opacity = String(1 - prog(t, 9.28, 9.36))
      const gp = prog(t, 9.3, 9.55)
      glintBox.style.opacity = gp > 0 && gp < 1 ? String(Math.sin(Math.PI * gp) * 0.9 + 0.1) : '0'
      glint.style.transform = `translateX(${lerp(-260, BODY.w + 120, ease.inOutCubic(gp))}px) skewX(-24deg)`
      stars.style.opacity = String(prog(t, 8.85, 9.35))
      // eyebrow pops first, then the line; both gone before the card clip opens
      const out = 1 - ease.inQuad(prog(t, CAP.out, CAP.out + 0.2))
      const e1 = ease.outQuad(prog(t, CAP.eyebrow, CAP.eyebrow + 0.22)), e2 = ease.outQuad(prog(t, CAP.line, CAP.line + 0.3))
      eyebrow.style.opacity = String(e1 * out)
      eyebrow.style.transform = `translateY(${(1 - ease.outCubic(prog(t, CAP.eyebrow, CAP.eyebrow + 0.4))) * 10}px)`
      capLine.style.opacity = String(e2 * out)
      capLine.style.transform = `translateY(${(1 - ease.outCubic(prog(t, CAP.line, CAP.line + 0.5))) * 14}px)`
      scrim.style.opacity = String(Math.max(e1, e2) * out)
      backDim.style.opacity = String(0.8 * ease.inOutQuad(prog(t, 9.72, 9.92)))
      // flip 0→180 onto the card back, then push into the mark (handoff to S4's indigo sky)
      const a = 180 * ease.inOutCubic(prog(t, 9.6, 9.84))
      front.style.transform = `perspective(1800px) rotateY(${a}deg)`
      back.style.transform = `perspective(1800px) rotateY(${a - 180}deg)`
      front.style.visibility = a < 90 ? 'visible' : 'hidden'
      back.style.visibility = a >= 90 ? 'visible' : 'hidden'
      // small life move once the card has landed
      const life = lerp(1, 0.97, ease.inOutQuad(prog(t, 9.3, 9.6)))
      const ps = Math.pow(8, ease.inQuad(prog(t, 9.64, 9.94)))
      // scale about the mark while drifting it to screen centre
      const c = ease.inOutQuad(prog(t, 9.64, 9.94))
      const S = ps * life
      const tx = MARK.x * life * (1 - c) - S * MARK.x, ty2 = MARK.y * life * (1 - c) - S * MARK.y
      world.style.transform = `translate(${tx}px, ${ty2}px) scale(${S})`
    },
  }
}
