// ghosted · half a — shared bits (grain, captions, photos, avatar dissolve). Everything is a pure function of t.
import { clamp, lerp, prog, ease, rng, el } from '../../../../src/lib.js'
import { W, H, IMG, SERIF } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

export const BONE = '#efe6d6'
export const PHOTO = i => i === 'juniper' ? `${IMG}juniper.jpg` : `${IMG}people/p${i}.jpg`
export const COLD_FILTER = 'grayscale(1) contrast(1.42) brightness(1.08)'
export const CAP_SHADOW = '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)'

/** the film-series grain (sky.js drawGrain) on an overlay canvas; same tile + offset per frame as half b */
export function grainLayer(parent, opacity = 0.5, z = '4000', blend = 'overlay') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity, pointerEvents: 'none', zIndex: z }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

/** words that land one by one (opacity, rise, de-blur); update(t, out) */
export function words(parent, text, style, at, gap = 0.1, dur = 0.22) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 18}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      }
    },
  }
}
export const capStyle = (size = 104) => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: BONE, textShadow: CAP_SHADOW })

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
