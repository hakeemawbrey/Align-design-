// alignment · part A (0–20.2): How do two charts align? → Here are two charts. → Lay one over the other. → H.
// Two small wheels (yours above, Juniper's below) draw in; each gains its three placements one by one with a label that
// builds in step; then the two wheels slide together into the one central H wheel (you on the outer track, her on the
// inner), hold, and the placements clear so the frame is exactly H from 19.5.
import { clamp, lerp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, fill, SERIF, MONO } from '../../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, ptOf, drawWheelH } from '../../../wheel.js'
import { PLACEMENTS, TINT, TRACK, drawOrb, drawSignWash, drawTrack, drawOrbLabel, drawTick } from './placements.js'
import { grainLayer, words, BONE, CAP_SHADOW } from './text.js'

const START = 0, END = 20.2
const BODIES = ['sun', 'moon', 'rising']

// ── timings
export const T = {
  black: [0, 1.0],                       // up from black
  eyebrow: [0.3, 3.75, 4.1],             // in, out0, out1
  cap1: [0.5, 3.75, 4.1],               // "How do two charts align?"
  wheelYou: [1.1, 2.3], wheelHer: [1.5, 2.7],
  cap2: [4.3, 10.45, 10.85],            // "Here are two charts."
  youLabel: 4.8, youOrbs: [5.2, 5.85, 6.5],
  herLabel: 7.2, herOrbs: [7.6, 8.25, 8.9],
  labelsOut: [10.4, 10.85],
  cap3: [11.05, 18.55, 18.95],           // "Lay one over the other."
  merge: [11.6, 13.2],
  tracks: [12.9, 13.7],
  sub: [13.7, 18.45, 18.85],             // "You on the outer ring. Juniper on the inner."
  clear: [18.7, 19.5],                   // placements clear → H
}
const ORB_IN = 0.7

// ── small-wheel geometry (same proportions as H, half size)
const SMALL = 0.5
const POS = { you: { cx: 540, cy: 745 }, juniper: { cx: 540, cy: 1335 } }
const geom = (who, m) => {
  const s = lerp(SMALL, 1, m)
  return { cx: lerp(POS[who].cx, WHEEL.cx, m), cy: lerp(POS[who].cy, WHEEL.cy, m), rOut: WHEEL.rOut * s, rIn: WHEEL.rIn * s, rGlyph: WHEEL.rGlyph * s, alpha: WHEEL.alpha, s }
}

/** the H wheel at any centre/scale, built in by d (0–1): ring sweeps, divisions, glyphs. At s = 1, d = 1 it IS drawWheelH. */
function drawWheel(ctx, G, { k = 1, d = 1 } = {}) {
  if (k <= 0) return
  if (G.s === 1 && d >= 1) return drawWheelH(ctx, { k })
  const ring = ease.inOutCubic(prog(d, 0, 0.6)), divs = prog(d, 0.3, 0.85), gl = prog(d, 0.5, 1)
  ctx.save()
  ctx.globalAlpha = G.alpha * k
  ctx.strokeStyle = BONE; ctx.lineWidth = 2
  // the rings sweep counter-clockwise from Aries (9 o'clock), like the signs
  if (ring > 0) {
    ctx.beginPath(); ctx.arc(G.cx, G.cy, G.rOut, Math.PI, Math.PI - ring * Math.PI * 2, true); ctx.stroke()
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(G.cx, G.cy, G.rIn, Math.PI, Math.PI - ring * Math.PI * 2, true); ctx.stroke()
  }
  ctx.lineWidth = 1.5
  for (let i = 0; i < 12; i++) {
    const q = ease.outCubic(clamp(divs * 12 - i * 0.85))
    if (q <= 0) continue
    const a = ptOf(i * 30, G.rIn, G), b = ptOf(i * 30, lerp(G.rIn, G.rOut, q), G)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  ctx.restore()
  if (gl <= 0) return
  ctx.save()
  ctx.font = `${Math.round(40 * G.s)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((s, i) => {
    const p = ptOf(i * 30 + 15, G.rGlyph, G)
    ctx.globalAlpha = 0.85 * k * ease.inOutQuad(clamp(gl * 12 - i * 0.9)); ctx.fillStyle = s.color
    ctx.fillText(s.glyph + '︎', p.x, p.y)
  })
  ctx.restore()
}

export default function build(stage) {
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const dC = layerCanvas(root), dx = dC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', zIndex: '3500', pointerEvents: 'none' }, root)
  const grain = grainLayer(root, GRAIN_H)

  // ── copy
  const cap = (size = 76) => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.1, color: BONE, textShadow: CAP_SHADOW, left: 0, width: W + 'px', textAlign: 'center', zIndex: '3000' })
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '262px', textAlign: 'center', fontFamily: MONO, fontSize: '31px', letterSpacing: '0.3em', color: BONE, textShadow: CAP_SHADOW, opacity: 0, zIndex: '3000', textIndent: '0.3em' }, root, 'ALIGN, EXPLAINED')
  const cap1 = words(root, 'How do two charts align?', { ...cap(78), top: '326px' }, T.cap1[0], 0.13, 0.6)
  const cap2 = words(root, 'Here are two charts.', { ...cap(78), top: '300px' }, T.cap2[0], 0.13, 0.6)
  const cap3 = words(root, 'Lay one over the other.', { ...cap(78), top: '300px' }, T.cap3[0], 0.13, 0.6)

  // the chart labels under each small wheel: NAME, then "Taurus Sun · Sagittarius Moon · Libra Rising" building in step
  const label = (who, name, top) => {
    const box = el('div', { position: 'absolute', left: 0, width: W + 'px', top: top + 'px', textAlign: 'center', zIndex: '3000' }, root)
    const nm = el('div', { fontFamily: MONO, fontSize: '30px', letterSpacing: '0.3em', textIndent: '0.3em', color: TINT[who], textShadow: CAP_SHADOW, opacity: 0 }, box, name)
    const line = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '44px', color: BONE, textShadow: CAP_SHADOW, marginTop: '8px', whiteSpace: 'nowrap' }, box)
    const parts = BODIES.map((b, i) => {
      const p = PLACEMENTS[who][b]
      const word = b === 'rising' ? 'Rising' : b === 'sun' ? 'Sun' : 'Moon'
      const sp = el('span', { display: 'inline-block', opacity: 0 }, line, `${i ? '<span style="opacity:.5;margin:0 .45em">·</span>' : ''}${p.name} ${word}`)
      return sp
    })
    return { box, nm, parts }
  }
  const youL = label('you', 'YOU', 1000)
  const herL = label('juniper', 'JUNIPER', 1588)

  // sub-caption under the merged wheel
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1520px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '48px', lineHeight: 1.25, color: BONE, textShadow: CAP_SHADOW, opacity: 0, zIndex: '3000' }, root,
    `<span style="color:${TINT.you}">You</span> on the outer ring.<br><span style="color:${TINT.juniper}">Juniper</span> on the inner.`)

  const orbK = (t, t0) => ease.outCubic(prog(t, t0, t0 + ORB_IN))

  return {
    start: START, end: END, root,
    update(t) {
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      black.style.display = t < T.black[1] ? 'block' : 'none'
      drawSky(sx, t, SKY_H)

      // copy
      eyebrow.style.opacity = String(ease.inOutQuad(prog(t, T.eyebrow[0], T.eyebrow[0] + 0.6)) * (1 - ease.inOutQuad(prog(t, T.eyebrow[1], T.eyebrow[2]))))
      const vis = (c, a) => { c.box.style.display = t >= a[0] - 0.05 && t < a[2] + 0.05 ? 'block' : 'none'; c.update(t, 1 - ease.inOutQuad(prog(t, a[1], a[2]))) }
      vis(cap1, T.cap1); vis(cap2, T.cap2); vis(cap3, T.cap3)
      const lOut = 1 - ease.inOutQuad(prog(t, ...T.labelsOut))
      for (const [L, t0, orbs] of [[youL, T.youLabel, T.youOrbs], [herL, T.herLabel, T.herOrbs]]) {
        L.box.style.display = t >= t0 - 0.05 && t < T.labelsOut[1] + 0.05 ? 'block' : 'none'
        L.nm.style.opacity = String(ease.inOutQuad(prog(t, t0, t0 + 0.6)) * lOut)
        L.parts.forEach((p, i) => {
          const e = ease.outCubic(prog(t, orbs[i] + 0.1, orbs[i] + 0.75))
          p.style.opacity = String(e * lOut)
          p.style.transform = `translateY(${((1 - e) * 10).toFixed(2)}px)`
        })
      }
      const subK = ease.inOutQuad(prog(t, T.sub[0], T.sub[0] + 0.7)) * (1 - ease.inOutQuad(prog(t, T.sub[1], T.sub[2])))
      sub.style.opacity = String(subK)
      sub.style.transform = `translateY(${((1 - ease.outCubic(prog(t, T.sub[0], T.sub[0] + 0.8))) * 12).toFixed(2)}px)`

      // ── diagram
      dx.clearRect(0, 0, W, H)
      const m = ease.inOutCubic(prog(t, ...T.merge))
      const clear = 1 - ease.inOutQuad(prog(t, ...T.clear))
      if (t >= T.clear[1]) { drawWheelH(dx); grain.update(t); return }   // exactly H

      const G = { you: geom('you', m), juniper: geom('juniper', m) }
      // soft glow behind each small wheel (gone once they are one)
      const glowK = (1 - m) * ease.inOutQuad(prog(t, 1.0, 2.6))
      if (glowK > 0) for (const who of ['you', 'juniper']) {
        const g = G[who], gr = dx.createRadialGradient(g.cx, g.cy, g.rIn * 0.2, g.cx, g.cy, g.rOut * 1.35)
        gr.addColorStop(0, `rgba(${who === 'you' ? '247,185,139' : '185,169,255'},${0.07 * glowK})`); gr.addColorStop(1, 'rgba(0,0,0,0)')
        dx.fillStyle = gr; dx.beginPath(); dx.arc(g.cx, g.cy, g.rOut * 1.35, 0, Math.PI * 2); dx.fill()
      }

      // sign washes under the ring (in each orb's sign)
      // the wheels: yours draws first; hers fades out as it lands on yours so the one wheel is never doubled
      const herK = 1 - ease.inOutQuad(prog(m, 0.4, 0.95))
      for (const [who, orbs] of [['you', T.youOrbs], ['juniper', T.herOrbs]]) BODIES.forEach((b, i) => {
        const k = 0.5 * orbK(t, orbs[i]) * clear, sg = PLACEMENTS[who][b].sign
        if (who === 'you' || m >= 1) drawSignWash(dx, sg, k, G.you)
        else { drawSignWash(dx, sg, k * herK, G.juniper); drawSignWash(dx, sg, k * (1 - herK), G.you) }
      })

      if (m >= 1) drawWheel(dx, G.you)
      else {
        drawWheel(dx, G.you, { d: prog(t, ...T.wheelYou) })
        drawWheel(dx, G.juniper, { k: herK, d: prog(t, ...T.wheelHer) })
      }

      // the tracks (on the merged wheel)
      const trK = ease.inOutQuad(prog(t, ...T.tracks)) * clear
      drawTrack(dx, 'you', trK); drawTrack(dx, 'juniper', trK)

      // the placements: each orb lands with a gentle ripple, and rides its track as the wheels slide together
      for (const [who, orbs] of [['you', T.youOrbs], ['juniper', T.herOrbs]]) BODIES.forEach((b, i) => {
        const k = orbK(t, orbs[i]) * clear
        if (k <= 0) return
        const g = G[who], r = TRACK[who] * g.s, lon = PLACEMENTS[who][b].lon
        const p = ptOf(lon, r, g)
        const sz = lerp(0.72, 1, m) * lerp(0.5, 1, ease.outCubic(prog(t, orbs[i], orbs[i] + ORB_IN)))
        const rp = prog(t, orbs[i] + 0.05, orbs[i] + 1.1)
        if (rp > 0 && rp < 1) {
          dx.save(); dx.globalAlpha = 0.45 * (1 - rp) * (1 - rp); dx.strokeStyle = TINT[who]; dx.lineWidth = 1.5
          dx.beginPath(); dx.arc(p.x, p.y, 10 + 34 * ease.outCubic(rp), 0, Math.PI * 2); dx.stroke(); dx.restore()
        }
        drawTick(dx, who, b, ease.inOutQuad(prog(t, orbs[i] + 0.2, orbs[i] + 0.8)) * clear, g)
        drawOrb(dx, p.x, p.y, who, { k, s: sz, t, seed: (who === 'you' ? 10 : 20) + i })
        drawOrbLabel(dx, who, b, ease.inOutQuad(prog(t, orbs[i] + 0.3, orbs[i] + 0.9)) * clear, g, lerp(0.78, 1, m))
      })
      grain.update(t)
    },
  }
}

export const cues = [
  ['bell', T.cap1[0] + 0.05, 293.66, 0.022, 3.2, 0],
  ['whoosh', T.wheelYou[0], 1.4, 0.03],
  ['bell', T.cap2[0] + 0.05, 220, 0.02, 3, 0],
  ...T.youOrbs.map((t, i) => ['bell', t + 0.08, [587.33, 739.99, 880][i], 0.024, 2.4, -0.25]),
  ...T.herOrbs.map((t, i) => ['bell', t + 0.08, [659.25, 880, 987.77][i], 0.024, 2.4, 0.25]),
  ['bell', T.cap3[0] + 0.05, 246.94, 0.02, 3, 0],
  ['whoosh', T.merge[0], T.merge[1] - T.merge[0], 0.05],
  ['bell', T.merge[1] - 0.1, 369.99, 0.026, 3.6, 0],
  ['glitter', T.merge[1] - 0.2, T.merge[1] + 0.9],
]
