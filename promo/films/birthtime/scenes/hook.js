// birthtime · HOOK (0–5.75): the birth-data pill (film 1 S4 recipe), typed huge with the camera riding the caret.
// Timing (sound):
//   0.00 frame 0 is already the giant pill (zoom 3.4) with the caret; keystrokes 0.00–2.55 ("M" is on frame 0) (see TYPED_AT)
//        "May 12, 1998" lands 0.00–0.98 · " · 5:00 PM" 1.22–1.84 · " · Tulsa" 2.06–2.55
//   2.56–3.00 camera eases out to 1× → the whole line reads in the pill (centre y 440)
//   2.88 caption types once the pill has cleared (Inter 500 96px, perChar 0.022) → fully readable ≈3.6, held to 5.3, out 5.3–5.45
//   5.15–5.35 field fades · 5.23–5.75 the pill morphs into a disc and glides to the card spot (1270,540)
//   5.5–5.9 the disc charges green and hands off to the face-down sign card (scenes/card.js)
import { clamp, lerp, prog, ease, rng, el, C, TypeLine } from '../../../src/lib.js'
import { W, H, IMG, SANS, SERIF, MONO, fill, Ticks } from '../../../src/scenes/common.js'

export const TEXT = 'May 12, 1998 · 5:00 PM · Tulsa'
const CHUNKS = [[0, 12, 0.0, 0.98], [12, 22, 1.22, 1.84], [22, 30, 2.06, 2.55]]
export const TYPED_AT = (() => {
  const r = rng(512), out = []
  for (const [a, b, t0, t1] of CHUNKS) {
    const w = []; let acc = 0
    for (let i = a; i < b; i++) { acc += 0.6 + r() * 0.8 + (TEXT[i] === ' ' ? 0.5 : 0); w.push(acc) }
    w.forEach(v => out.push(t0 + (v - w[0]) / Math.max(1e-6, acc - w[0]) * (t1 - t0)))
  }
  return out
})()
export const CAPTION = 'The most honest thing about you'
export const T_CAP = 2.88, CAP_PER = 0.022
export const PILL_Y = 440, CARD_X = 1270, CARD_Y = 540
const PW = 1560, PH = 150, FS = 74, PAD = 52, Z0 = 3.4
const inOutQuart = x => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // halftone aura cloud (screen space), as in film 1 S4
  const cloud = el('canvas', { position: 'absolute', left: '-80px', top: '-60px', width: (W + 160) + 'px', height: (H + 120) + 'px' }, root)
  cloud.width = W + 160; cloud.height = H + 120
  const auraSrc = new Image(); auraSrc.src = IMG + 'aura/libra.jpg'
  let drawn = false
  const drawCloud = () => {
    if (drawn || !auraSrc.complete || !auraSrc.naturalWidth) return
    drawn = true
    const g = cloud.getContext('2d')
    const COLS = 200, step = (W + 160) / COLS, ROWS = 120
    const off = document.createElement('canvas'); off.width = COLS; off.height = ROWS
    const o = off.getContext('2d')
    o.filter = 'blur(6px)'
    o.drawImage(auraSrc, -20, -30, 240, 200)
    const data = o.getImageData(0, 0, COLS, ROWS).data
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const i = (y * COLS + x) * 4
      const l = (data[i] * 0.3 + data[i + 1] * 0.5 + data[i + 2] * 0.2) / 255
      const rad = Math.pow(l, 1.2) * step * 0.62
      if (rad < 0.4) continue
      g.fillStyle = `rgba(${Math.round(lerp(120, 220, l))},${Math.round(lerp(90, 160, l))},${Math.round(lerp(210, 255, l))},${0.22 + 0.5 * l})`
      g.beginPath(); g.arc(x * step + step / 2, y * step + step / 2, rad, 0, Math.PI * 2); g.fill()
    }
  }
  const glow = fill(root, { background: 'radial-gradient(60% 55% at 50% 45%, rgba(154,123,224,0.32), rgba(20,10,46,0) 70%)' })
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '0 0' }, root)
  const big = el('div', {
    position: 'absolute', left: '50%', top: PILL_Y + 'px', transform: 'translate(-50%,-56%)', fontFamily: SERIF, fontStyle: 'italic',
    fontSize: '620px', lineHeight: 1, color: 'rgba(214,196,255,0.30)', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
  }, world, 'Align')
  const pill = el('div', {
    position: 'absolute', left: (W / 2 - PW / 2) + 'px', top: (PILL_Y - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '999px',
    background: 'linear-gradient(180deg, rgba(52,30,108,0.82) 0%, rgba(40,20,90,0.86) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 2px rgba(196,182,228,0.35), inset 0 -1px 0 rgba(11,6,32,0.35), 0 30px 80px rgba(11,6,32,0.5)',
    backdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden',
  }, world)
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0))', pointerEvents: 'none' }, pill)
  const glint = el('div', { position: 'absolute', top: '-30px', width: '160px', height: (PH + 60) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.07), rgba(255,255,255,0))', transform: 'skewX(-22deg)', pointerEvents: 'none' }, pill)
  // charge disc (the pill's morph target): earth-green glass, the sign card grows out of it
  const disc = el('div', { position: 'absolute', inset: 0, borderRadius: '999px', background: 'radial-gradient(circle at 50% 45%, rgba(170,255,190,0.95), rgba(80,200,120,0.75) 40%, rgba(30,90,70,0.9) 100%)', boxShadow: 'inset 0 0 0 2px rgba(239,230,214,0.55)', opacity: 0, pointerEvents: 'none' }, pill)
  const field = el('div', { position: 'absolute', left: PAD + 'px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontWeight: 400, fontSize: FS + 'px', color: C.bone, whiteSpace: 'pre', letterSpacing: '-0.01em' }, pill)
  const caret = el('span', { display: 'inline-block', width: '4px', height: Math.round(FS * 1.08) + 'px', background: C.bone, marginLeft: '3px', verticalAlign: '-12px' }, null)
  const send = el('div', {
    position: 'absolute', right: '20px', top: '20px', width: (PH - 40) + 'px', height: (PH - 40) + 'px', borderRadius: '999px',
    background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: '48px', fontWeight: 600,
  }, pill, '↑')
  const disch = el('div', { position: 'absolute', left: '50%', top: '50%', width: '320px', height: '320px', margin: '-160px 0 0 -160px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(127,230,150,0.55), rgba(127,230,150,0.18) 50%, rgba(127,230,150,0) 100%)', opacity: 0, mixBlendMode: 'screen' }, root)

  const cap = new TypeLine(root, CAPTION, {
    left: '50%', top: '676px', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: '96px', letterSpacing: '-0.02em', lineHeight: 1,
    textShadow: '0 0 34px rgba(232,98,138,0.22), 0 2px 18px rgba(8,4,24,0.75)',
  }, { perChar: CAP_PER, fade: 0.14, final: '#fff6ea', accent: ['#ffffff', '#ffe3c4', '#ecdcff'] })
  const ticks = new Ticks(root, C.bone, 12)

  let xs = null, capW = 0
  const measure = () => {
    const probe = el('span', { position: 'absolute', visibility: 'hidden', fontFamily: SANS, fontWeight: 400, fontSize: FS + 'px', whiteSpace: 'pre', letterSpacing: '-0.01em' }, pill)
    xs = [0]
    for (let i = 1; i <= TEXT.length; i++) { probe.textContent = TEXT.slice(0, i); xs.push(probe.getBoundingClientRect().width / (window.__stageScale || 1)) }
    probe.remove()
    capW = cap.root.getBoundingClientRect().width / (window.__stageScale || 1)
  }

  return {
    start: 0, end: 5.92, root,
    update(t) {
      drawCloud()
      if (!xs) measure()
      const n = TYPED_AT.filter(v => v <= t).length
      field.textContent = TEXT.slice(0, n)
      const typing = t < 2.6
      const blink = typing ? true : Math.floor((t - 2.6) * 2.4) % 2 === 0
      caret.style.opacity = blink && t < 5.1 ? '1' : '0'
      field.appendChild(caret)
      // camera: caret-riding close-up → 1× (log-space ease)
      const zo = inOutQuart(prog(t, 2.56, 3.0))
      const zf = 1 - zo
      const z = Math.pow(Z0, zf)
      const kp = n > 0 ? ease.outCubic(prog(t, TYPED_AT[n - 1], TYPED_AT[n - 1] + 0.09)) : 1
      const cx = n > 0 ? lerp(xs[n - 1], xs[n], kp) : 0
      const pillL = W / 2 - PW / 2
      const caretX = pillL + PAD + cx
      // caret framed at 64% of the width; until it gets there the pill's left end rests near the frame edge
      const screenCaret = Math.min(W * 0.64, 96 + (caretX - pillL) * Z0)
      const focusX = lerp(W / 2, caretX, zf)
      const anchorX = lerp(W / 2, screenCaret, zf)
      const sy = lerp(H / 2, PILL_Y, zo)
      const tx = anchorX - focusX * z, ty = sy - PILL_Y * z
      world.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`
      // morph → disc → glide to the card spot
      const m = ease.inOutExpo(prog(t, 5.23, 5.65))
      const w = lerp(PW, PH, m)
      const g = ease.inOutCubic(prog(t, 5.25, 5.75))
      const px = lerp(W / 2, CARD_X, g), py = lerp(PILL_Y, CARD_Y, g)
      pill.style.width = w + 'px'
      pill.style.left = (px - w / 2) + 'px'; pill.style.top = (py - PH / 2) + 'px'
      send.style.transform = `scale(${1 - m})`
      field.style.opacity = String(1 - prog(t, 5.15, 5.35))
      disc.style.opacity = String(ease.inOutQuad(prog(t, 5.45, 5.65)))
      pill.style.opacity = String(1 - ease.inQuad(prog(t, 5.7, 5.87)))
      pill.style.transform = `scale(${1 + 0.25 * ease.outQuad(prog(t, 5.6, 5.87))})`
      disch.style.left = (CARD_X - W / 2) + 'px'; disch.style.top = (CARD_Y - H / 2) + 'px'
      disch.style.opacity = String(ease.outQuad(prog(t, 5.5, 5.7)) * (1 - prog(t, 5.75, 5.9)))
      disch.style.transform = `translate(${W / 2}px, ${H / 2}px) scale(${lerp(0.6, 1.6, prog(t, 5.5, 5.9))})`
      glint.style.left = lerp(-200, PW + 80, prog(t, 3.2, 4.6)) + 'px'
      big.style.opacity = String(lerp(0.9, 0.5, ease.inOutQuad(prog(t, 2.5, 3.1))) * (1 - prog(t, 5.1, 5.45)))
      big.style.transform = `translate(-50%,-56%) scale(${lerp(1.03, 0.99, prog(t, 0, 5))})`
      cloud.style.transform = `translate(${Math.sin(t * 0.4) * 30}px, ${Math.cos(t * 0.3) * 18}px) scale(${lerp(1.06, 1.0, prog(t, 0, 5))})`
      cloud.style.opacity = String(1 - ease.inOutQuad(prog(t, 5.1, 5.75)))
      glow.style.opacity = String((0.7 + 0.3 * Math.sin(t * 1.3)) * (1 - prog(t, 5.15, 5.75)))
      // caption + ticks
      cap.update(t - T_CAP)
      cap.root.style.opacity = String(1 - ease.inQuad(prog(t, 5.3, 5.45)))
      const tk = ease.outCubic(prog(t, T_CAP - 0.05, T_CAP + 0.3)) * (1 - ease.inQuad(prog(t, 5.3, 5.45)))
      const bw = lerp(capW * 0.7, capW + 270, ease.outCubic(prog(t, T_CAP - 0.05, T_CAP + 0.45)))
      ticks.update(W / 2, 676, bw, 190, tk)
    },
  }
}
