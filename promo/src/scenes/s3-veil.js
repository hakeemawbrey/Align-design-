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

// ───────────────────────────────────────────────────── S3 · the veil lifts
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
  const therm = img(frame, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover', filter: 'url(#thermal)' })
  const grain = el('div', {
    position: 'absolute', inset: 0, backgroundImage: `url(${grainURL()})`, backgroundSize: '256px 256px',
    mixBlendMode: 'overlay', opacity: 0.16, pointerEvents: 'none',
  }, frame)
  // back face: the deck card back (seed of life + chakra column)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, world)
  img(back, A + 'card-back.png', { left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px' })
  // card back dims over the end of the push so it meets S4's darker halftone sky
  const backDim = el('div', { position: 'absolute', left: -BACK.w * DB / 2 + 'px', top: -BACK.h * DB / 2 + 'px', width: BACK.w * DB + 'px', height: BACK.h * DB + 'px', background: 'radial-gradient(closest-side, rgba(20,10,46,0.9), rgba(20,10,46,1))', opacity: 0, pointerEvents: 'none' }, back)
  // concept line while the veil lifts (styled like the S7 captions)
  const scrim = el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '440px', background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.55) 45%, rgba(11,6,32,0.8) 100%)', opacity: 0 }, root)
  const capBox = el('div', { position: 'absolute', left: '50%', bottom: '84px', transform: 'translateX(-50%)', textAlign: 'center', opacity: 0, whiteSpace: 'nowrap' }, root)
  el('div', { fontFamily: MONO, fontSize: '20px', letterSpacing: '0.26em', color: 'rgba(255,246,234,0.85)', textShadow: '0 1px 12px rgba(11,6,32,0.7)', marginBottom: '14px', textTransform: 'uppercase' }, capBox, 'The veil')
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '72px', lineHeight: 1.05, color: '#fff6ea', textShadow: '0 2px 30px rgba(11,6,32,0.75), 0 1px 3px rgba(11,6,32,0.6)' }, capBox, 'The veil lifts when you both align.')

  return {
    start: 6.8, end: 10.02, root,
    update(t) {
      // thermal → real, top-down soft wipe while the veil (blur) lifts
      const wp = ease.inOutCubic(prog(t, 7.2, 8.2))
      const edge = lerp(-30, 130, wp)
      therm.style.webkitMaskImage = therm.style.maskImage = `linear-gradient(180deg, transparent ${edge - 25}%, #000 ${edge}%)`
      real.style.filter = `blur(${lerp(26, 0, ease.outCubic(prog(t, 7.1, 8.3)))}px) saturate(${lerp(1.5, 1.05, wp)})`
      // gentle push (capped: the source photo is small)
      // + a slow extra push through the caption hold so the frame never goes dead
      const push = lerp(1.0, 1.03, ease.outQuad(prog(t, 6.86, 8.75))) * lerp(1, 1.05, ease.inOutQuad(prog(t, 8.0, 8.9)))
      const yShift = lerp(-360, -380, ease.outQuad(prog(t, 6.86, 8.75)))
      // shrink so the photo lands exactly in the real card's photo window
      const k = ease.inOutExpo(prog(t, 8.62, 9.12)) // k ≥ 0.99 by ~9.01
      const fw = lerp(W, WIN.w - INSET * 2, k), fh = lerp(H, WIN.h - INSET * 2, k)
      const fcy = lerp(0, WIN.y + WIN.h / 2, k)
      frame.style.width = fw + 'px'; frame.style.height = fh + 'px'
      frame.style.left = -fw / 2 + 'px'; frame.style.top = (fcy - fh / 2) + 'px'
      frame.style.borderRadius = lerp(0, 14, k) + 'px'
      const imgScale = lerp(push, IMG_END_SCALE, k)
      const ty = lerp(yShift, IMG_END_TY, k)
      for (const im of [real, therm]) im.style.transform = `translate(-50%,-50%) translateY(${ty}px) scale(${imgScale})`
      // grain crawls a new tile offset every frame; fades as the photo becomes the card
      const fi = Math.round(t * 30), gr = rng(fi * 131 + 17)
      grain.style.backgroundPosition = `${Math.floor(gr() * 256)}px ${Math.floor(gr() * 256)}px`
      grain.style.opacity = String(0.16 * (1 - k))
      // the real card opens out from the photo window (clip grows outward), then the photo frame hands off
      const cp = ease.outExpo(prog(t, 9.1, 9.3)) // opens only once the photo has landed
      const wl = REV.win.x * D, wt = REV.win.y * D, wr = (REV.w - REV.win.x - REV.win.w) * D, wb = (REV.h - REV.win.y - REV.win.h) * D
      card.style.clipPath = t < 9.1 ? 'inset(50%)' : cp >= 1 ? 'none'
        : `inset(${lerp(wt, 0, cp)}px ${lerp(wr, 0, cp)}px ${lerp(wb, 0, cp)}px ${lerp(wl, 0, cp)}px round ${lerp(14, BODY.r, cp)}px)`
      frame.style.opacity = String(1 - prog(t, 9.27, 9.34))
      const gp = prog(t, 9.28, 9.5)
      glintBox.style.opacity = gp > 0 && gp < 1 ? String(Math.sin(Math.PI * gp) * 0.9 + 0.1) : '0'
      glint.style.transform = `translateX(${lerp(-260, BODY.w + 120, ease.inOutCubic(gp))}px) skewX(-24deg)`
      stars.style.opacity = String(prog(t, 8.85, 9.35))
      // concept line 7.5 → 9.0, gone before the card clip opens
      const eb = ease.outQuad(prog(t, 7.45, 7.8)) * (1 - ease.inQuad(prog(t, 8.78, 9.0)))
      capBox.style.opacity = String(eb)
      capBox.style.transform = `translateX(-50%) translateY(${(1 - ease.outCubic(prog(t, 7.45, 7.95))) * 14}px)`
      scrim.style.opacity = String(eb)
      backDim.style.opacity = String(0.8 * ease.inOutQuad(prog(t, 9.64, 9.84)))
      // flip 0→180 onto the card back, then push into the mark (handoff to S4's indigo sky)
      const a = 180 * ease.inOutCubic(prog(t, 9.5, 9.76))
      front.style.transform = `perspective(1800px) rotateY(${a}deg)`
      back.style.transform = `perspective(1800px) rotateY(${a - 180}deg)`
      front.style.visibility = a < 90 ? 'visible' : 'hidden'
      back.style.visibility = a >= 90 ? 'visible' : 'hidden'
      // small life move once the card has landed
      const life = lerp(1, 0.97, ease.inOutQuad(prog(t, 9.3, 9.6)))
      const ps = Math.pow(8, ease.inQuad(prog(t, 9.56, 9.86)))
      // scale about the mark while drifting it to screen centre
      const c = ease.inOutQuad(prog(t, 9.56, 9.86))
      const S = ps * life
      const tx = MARK.x * life * (1 - c) - S * MARK.x, ty2 = MARK.y * life * (1 - c) - S * MARK.y
      world.style.transform = `translate(${tx}px, ${ty2}px) scale(${S})`
    },
  }
}
