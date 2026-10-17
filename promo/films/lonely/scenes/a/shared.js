// lonely · half A shared bits: the timeline, the cold face plate (p4, lit from below by a phone), captions, grain.
import { clamp, lerp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, IMG, SERIF } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

// ── the timeline (seconds)
export const T = {
  phoneIn: 4.0,            // hard cut: the room → the phone close-up
  flicks: [4.45, 5.25, 5.95],  // thumb-scroll flicks through the matches grid
  tap: 6.7,                // a thumb lands on one match
  chatIn: 6.85,            // the chat slides in (to 7.13)
  msgs: [7.3, 7.75, 8.2, 8.65, 9.1],  // hey / hey / wyd / lol / haha
  seen: 9.5,               // "Delivered" turns "Seen" under the last message
  dots: [9.75, 10.4],      // typing dots appear… and stop
  dim: 10.95,              // the screen dims (auto-lock)
  off: 11.2,               // …and goes black: a face in the glass
  roomBack: 12.9,          // hard cut back to the room (phone dark), the push into the window starts
  sky: 14.8,               // full-frame Align sky, nothing else (H)
  end: 15.2,
}
export const MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
export const BONE = '#efe6d6'

export const cnv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
export function canvasLayer(parent, style = {}) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', ...style }, parent)
  c.width = W; c.height = H
  return c
}

/** overlay grain (the shared sky grain tiles, a new tile + offset every frame) */
export function grain(parent, opacity = 0.5) {
  const c = canvasLayer(parent, { mixBlendMode: 'overlay', opacity, pointerEvents: 'none' })
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

export function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}

// ── the face: p4 (342×366), keyed on the green channel (the red/violet aura goes to black, skin stays), a soft
// head-and-shoulders matte, lit from BELOW (forehead in shadow, chin and throat catching the screen), graded cold blue.
// Returns { lit, dark, ref } canvases at 2× the photo: lit = phone light, dark = moonlight only, ref = mirrored ghost.
export const FACE = { src: `${IMG}people/p4.jpg`, w: 342, h: 366, cx: 168, cy: 142 }
export async function faceCanvases() {
  const im = await loadImage(FACE.src)
  const S = 2, w = FACE.w * S, h = FACE.h * S
  const base = cnv(w, h), bx = base.getContext('2d')
  bx.imageSmoothingQuality = 'high'
  if (im) bx.drawImage(im, 0, 0, w, h)
  const src = bx.getImageData(0, 0, w, h).data
  const make = (mode) => {
    const c = cnv(w, h), x = c.getContext('2d'), id = x.createImageData(w, h), p = id.data
    for (let j = 0; j < h; j++) {
      const py = j / S
      for (let i = 0; i < w; i++) {
        const px = i / S, k = (j * w + i) * 4
        const g = src[k + 1] / 255, r = src[k] / 255
        let L = Math.pow(clamp((g * 0.86 + r * 0.14 - 0.05) / 0.82), 1.25)
        // matte: head ellipse ∪ neck ∪ shoulders, soft edges
        const head = 1 - smooth(Math.hypot((px - 168) / 80, (py - 138) / 92), 0.78, 1.12)
        const neck = 1 - smooth(Math.hypot((px - 160) / 62, (py - 222) / 52), 0.7, 1.1)
        const sh = (1 - smooth(Math.hypot((px - 170) / 165, (py - 330) / 110), 0.7, 1.05)) * smooth(py, 205, 250)
        const m = clamp(Math.max(head, neck, sh))
        let a, cr, cg, cb
        if (mode === 'lit') {
          // underlight: dark brow → bright chin/jaw/throat, falling off again down the shirt
          const up = lerp(0.22, 1.0, smooth(py, 80, 200)) * lerp(1, 0.55, smooth(py, 240, 330))
          const v = L * up * 1.05
          cr = v * 0.62; cg = v * 0.8; cb = v * 1.08
          a = m
        } else if (mode === 'dark') {
          // moonlight only: a cool rim from the right, the rest swallowed
          const rim = smooth(px, 190, 245) * 0.6 + 0.16
          const v = L * rim * 0.62
          cr = v * 0.62; cg = v * 0.74; cb = v * 1.0
          a = m
        } else {
          // the ghost in the black glass: flat, faint, mirrored later
          const v = L * 0.9
          cr = v * 0.8; cg = v * 0.86; cb = v; a = m * 0.9
        }
        p[k] = clamp(cr) * 255; p[k + 1] = clamp(cg) * 255; p[k + 2] = clamp(cb) * 255; p[k + 3] = a * 255
      }
    }
    x.putImageData(id, 0, 0)
    return c
  }
  return { lit: make('lit'), dark: make('dark'), ref: make('ref'), S }
}
const smooth = (v, a, b) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x) }

// ── captions: EB Garamond italic bone, word-by-word soft fade (rise + de-blur), whole-line fade out
const CAP = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.08, color: BONE, whiteSpace: 'nowrap',
  textShadow: '0 2px 34px rgba(3,4,8,0.95), 0 0 3px rgba(3,4,8,0.7)' }
export function caption(parent, lines, { left, top, at, gap = 0.11, lineGap = 0, align = 'left', size = 104, out, dur = 0.42 }) {
  const box = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', textAlign: align }, parent)
  const ws = []
  lines.forEach((ln, li) => {
    const row = el('div', { ...CAP, fontSize: size + 'px', position: 'relative' }, box)
    const t0 = Array.isArray(at) ? at[li] : at + li * lineGap
    ln.split(' ').forEach((w, i) => ws.push({ t: t0 + i * gap, e: el('span', { display: 'inline-block', marginRight: '0.22em', opacity: 0 }, row, w) }))
  })
  return {
    box,
    update(t) {
      const o = out ? 1 - ease.inOutQuad(prog(t, out[0], out[1])) : 1
      box.style.display = o <= 0 || t < ws[0].t ? 'none' : 'block'
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * o)
        w.e.style.transform = `translateY(${(1 - e) * 16}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      }
    },
  }
}
