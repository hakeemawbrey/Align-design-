// eightbillion half a: the one person. p7, the aura keyed out (saturated, non-skin hues go to black), a soft
// head-and-shoulders matte, graded cold and lit from below by a phone. Returns a canvas at 2× the photo.
import { clamp, lerp } from '../../../../src/lib.js'
import { IMG } from '../../../../src/scenes/common.js'

export const FACE = { src: `${IMG}people/p7.jpg`, w: 342, h: 366, fx: 138, fy: 150 }   // fx/fy: face centre in photo px
const smooth = (x, a, b) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t) }
const loadImage = (src) => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })

export async function personCanvas() {
  const im = await loadImage(FACE.src)
  const S = 2, w = FACE.w * S, h = FACE.h * S
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const x = c.getContext('2d')
  x.imageSmoothingQuality = 'high'
  if (!im) return c
  x.drawImage(im, 0, 0, w, h)
  const id = x.getImageData(0, 0, w, h), p = id.data
  for (let j = 0; j < h; j++) {
    const py = j / S
    for (let i = 0; i < w; i++) {
      const px = i / S, k = (j * w + i) * 4
      const r = p[k] / 255, g = p[k + 1] / 255, b = p[k + 2] / 255
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx > 0 ? (mx - mn) / mx : 0
      let hue = 0
      if (mx > mn) {
        const d = mx - mn
        hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
        hue *= 60; if (hue < 0) hue += 360
      }
      const skin = (hue < 46 || hue > 352) ? 1 : 0
      const key = smooth(sat, 0.32, 0.6) * (1 - skin)
      // matte: head ∪ neck ∪ shoulders
      const head = 1 - smooth(Math.hypot((px - 138) / 78, (py - 146) / 98), 0.78, 1.04)
      const neck = 1 - smooth(Math.hypot((px - 146) / 64, (py - 236) / 56), 0.7, 1.1)
      const sh = (1 - smooth(Math.hypot((px - 160) / 175, (py - 340) / 115), 0.72, 1.06)) * smooth(py, 210, 260)
      const m = clamp(Math.max(head, neck, sh)) * (1 - key)
      const lum = r * 0.3 + g * 0.55 + b * 0.15
      // phone underlight: brow in shadow, chin and throat catching the screen, falling off down the chest
      const up = lerp(0.3, 1.0, smooth(py, 84, 214)) * lerp(1, 0.5, smooth(py, 250, 350))
      // the side away from the phone falls off (lit a little more from her left)
      const side = lerp(1.0, 0.72, smooth(px, 150, 250))
      const v = Math.pow(clamp(lum * up * side * 1.45), 1.08)
      p[k] = 255 * clamp(v * 0.6); p[k + 1] = 255 * clamp(v * 0.8); p[k + 2] = 255 * clamp(v * 1.1)
      p[k + 3] = 255 * m
    }
  }
  x.putImageData(id, 0, 0)
  return c
}
