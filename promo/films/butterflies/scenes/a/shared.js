// butterflies · half A shared bits: the timeline (THEN ↔ NOW intercut), captions, grain, small canvas helpers.
import { clamp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, SERIF } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

// ── the timeline (seconds). M = memory (warm, golden, grainy film), N = now (cold, desaturated phone).
export const T = {
  m1: 0.0,      // THEN: her, golden, a held look. "Remember butterflies?"
  n1: 3.3,      // NOW: hard cut, cold swipes
  m2: 4.05,     // THEN: the passed note: "do you like me? ☐ yes ☐ no", the pencil ticks yes
  n2: 6.05,     // NOW: hey / hey / wyd · Seen
  m3: 6.75,     // THEN: her smile, close, heart racing, burns out gold
  n3: 7.65,     // NOW: the swipe stack, faster and faster… then nothing. "When did dating get so numb?"
  dark: 12.9,   // the phone is gone: dark. A tiny pixel butterfly of light rises; the sky blooms around it
  sky: 14.75,   // exactly H from here: drawSky(zoom 1, dx 0, dy 0, dim 1, MOON) + grain 0.5, nothing else
  end: 15.2,
  // warm memory flashes cut into the cold (2–3 frames each), each fainter than the last
  flashes: [[9.5, 9.6, 'm1'], [10.72, 10.79, 'm2']],
  // swipes: N1's three, then N3's run that speeds up until it smears, then stops dead
  swipesN1: [3.42, 3.66, 3.88],
  stop: 11.05,
  heartsM1: [0.55, 1.38, 2.2, 3.0],      // slow heartbeats under the first memory
  heartsM2: [4.3, 4.95, 5.55],
  heartsM3: [6.82, 7.12, 7.4],           // racing
}
export const N3_SWIPES = (() => {
  const out = []; let t = 7.85, gap = 0.52
  while (t < T.stop - 0.04) { out.push(t); t += gap; if (out.length >= 2) gap = Math.max(1 / 15, gap * 0.82) }
  return out
})()
export const ALL_SWIPES = [...T.swipesN1, ...N3_SWIPES]

/** which picture is on screen at t */
export function shotAt(t) {
  for (const [a, b, s] of T.flashes) if (t >= a && t < b) return s
  if (t < T.n1) return 'm1'
  if (t < T.m2) return 'n1'
  if (t < T.n2) return 'm2'
  if (t < T.m3) return 'n2'
  if (t < T.n3) return 'm3'
  if (t < T.dark) return 'n3'
  return 'end'
}

export const MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
export const BONE = '#efe6d6'

export const cnv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
export function canvasLayer(parent, style = {}) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', ...style }, parent)
  c.width = W; c.height = H
  return c
}
export function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}
export const smooth = (v, a, b) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x) }
export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}
/** a heartbeat envelope: lub (strong) + dub (softer) after each beat time */
export function heart(t, beats) {
  let v = 0
  for (const b of beats) {
    const d = t - b
    if (d < 0 || d > 0.6) continue
    v = Math.max(v, Math.exp(-d * 16) * (d >= 0 ? 1 : 0), 0.6 * Math.exp(-Math.max(0, d - 0.17) * 16) * (d >= 0.17 ? 1 : 0))
  }
  return v
}

/** overlay grain (the shared sky grain tiles, a new tile + offset every frame) */
export function grain(parent, opacity = 0.5) {
  const c = canvasLayer(parent, { mixBlendMode: 'overlay', opacity, pointerEvents: 'none' })
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

// ── captions: EB Garamond italic bone, word-by-word soft fade (rise + de-blur), whole-line fade out
const CAP = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.08, color: BONE, whiteSpace: 'nowrap',
  textShadow: '0 2px 34px rgba(3,4,8,0.95), 0 0 3px rgba(3,4,8,0.7)' }
export function caption(parent, lines, { left, top, at, gap = 0.11, lineGap = 0, align = 'left', size = 104, out, dur = 0.42, shadow }) {
  const box = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', textAlign: align }, parent)
  const ws = []
  lines.forEach((ln, li) => {
    const row = el('div', { ...CAP, fontSize: size + 'px', position: 'relative', ...(shadow ? { textShadow: shadow } : {}) }, box)
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
export { W, H }
