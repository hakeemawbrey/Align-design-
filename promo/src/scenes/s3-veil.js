import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ───────────────────────────────────────────────────── S3 · the veil lifts
export function sceneVeil(stage) {
  const root = fill(stage, { background: C.void })
  const world = el('div', { position: 'absolute', left: '50%', top: '50%', width: '0', height: '0' }, root)
  // photo frame that later shrinks into a card
  const frame = el('div', { position: 'absolute', overflow: 'hidden', background: C.raised }, world)
  const real = img(frame, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover' })
  const therm = img(frame, IMG + 'juniper.jpg', { left: '50%', top: '50%', width: '1920px', height: '2560px', objectFit: 'cover', filter: 'url(#thermal)' })
  const gilt = el('div', { position: 'absolute', inset: '10px', borderRadius: '18px', border: '1.5px solid rgba(242,199,92,0.6)', opacity: 0 }, frame)
  const shade = el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,6,32,0) 58%, rgba(11,6,32,0.88) 100%)', opacity: 0 }, frame)
  const cap = el('div', { position: 'absolute', left: '30px', bottom: '58px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '44px', color: C.bone, opacity: 0 }, frame, 'Juniper, 27')
  const cap2 = el('div', { position: 'absolute', left: '32px', bottom: '28px', fontFamily: MONO, fontSize: '14px', letterSpacing: '0.2em', color: C.label2, opacity: 0 }, frame, 'LIBRA · MOON IN GEMINI')
  const stars = makeStars(root, 90, 21)
  root.insertBefore(stars, world)

  return {
    start: 6.8, end: 10.05, root,
    update(t) {
      // thermal → real, top-down soft wipe while the veil (blur) lifts
      const wp = ease.inOutCubic(prog(t, 7.35, 8.55))
      const edge = lerp(-30, 130, wp)
      therm.style.webkitMaskImage = therm.style.maskImage = `linear-gradient(180deg, transparent ${edge - 25}%, #000 ${edge}%)`
      real.style.filter = `blur(${lerp(26, 0, ease.outCubic(prog(t, 7.2, 8.7)))}px) saturate(${lerp(1.5, 1.05, wp)})`
      // push in
      const push = lerp(1.0, 1.08, prog(t, 6.75, 8.9))
      const yShift = lerp(-360, -470, prog(t, 6.75, 8.9))
      // shrink into a card
      const k = ease.inOutExpo(prog(t, 8.85, 9.6))
      const fw = lerp(W, 470, k), fh = lerp(H, 640, k)
      frame.style.width = fw + 'px'; frame.style.height = fh + 'px'
      frame.style.left = -fw / 2 + 'px'; frame.style.top = -fh / 2 + 'px'
      frame.style.borderRadius = lerp(0, 26, k) + 'px'
      frame.style.boxShadow = `0 0 0 ${lerp(0, 1.5, k)}px rgba(242,199,92,0.6), 0 40px 120px rgba(154,123,224,${0.35 * k})`
      const imgScale = lerp(push, 0.34, k)
      const ty = lerp(yShift, -120, k)
      for (const im of [real, therm]) im.style.transform = `translate(-50%,-50%) translateY(${ty}px) scale(${imgScale})`
      gilt.style.opacity = shade.style.opacity = String(prog(t, 9.25, 9.6))
      cap.style.opacity = cap2.style.opacity = String(ease.outQuad(prog(t, 9.4, 9.7)))
      // flip + push into the card back (handoff to S4)
      const f = ease.inOutCubic(prog(t, 9.62, 10.0))
      world.style.transform = `perspective(1600px) scale(${lerp(1, 4.5, ease.inExpo(prog(t, 9.72, 10.05)))}) rotateY(${f * 90}deg)`
      stars.style.opacity = String(prog(t, 8.9, 9.4))
    },
  }
}
