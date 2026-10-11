import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ─────────────────────────────────────────────── S4 · type your birth
export const BIRTH_TEXT = 'May 12, 1998 · 5:00 PM · Tulsa, OK'
const TEXT = BIRTH_TEXT
const T0 = 10.5, T1 = 12.55
/** keystroke times (also used by the soundtrack) */
export function birthTypedAt() {
  const r = rng(42)
  const times = []; let acc = 0
  for (let i = 0; i < TEXT.length; i++) { acc += 0.6 + r() * 0.8 + (TEXT[i] === ' ' ? 0.6 : 0); times.push(acc) }
  return times.map(v => T0 + (v / acc) * (T1 - T0))
}
export function sceneBirth(stage) {
  const root = fill(stage, { background: C.canvas })
  // halftone aura clouds
  const cloud = el('canvas', { position: 'absolute', left: '-80px', top: '-60px', width: (W + 160) + 'px', height: (H + 120) + 'px' }, root)
  cloud.width = W + 160; cloud.height = H + 120
  const auraSrc = new Image(); auraSrc.src = IMG + 'aura/libra.jpg'
  let drawn = false
  const drawCloud = () => {
    if (drawn || !auraSrc.complete || !auraSrc.naturalWidth) return
    drawn = true
    const g = cloud.getContext('2d')
    const off = document.createElement('canvas'); off.width = 200; off.height = 120
    const o = off.getContext('2d')
    o.filter = 'blur(6px)'
    o.drawImage(auraSrc, -20, -30, 240, 200)
    const data = o.getImageData(0, 0, 200, 120).data
    const step = (W + 160) / 200
    for (let y = 0; y < 120; y++) for (let x = 0; x < 200; x++) {
      const i = (y * 200 + x) * 4
      const l = (data[i] * 0.3 + data[i + 1] * 0.5 + data[i + 2] * 0.2) / 255
      const rad = Math.pow(l, 1.2) * step * 0.62
      if (rad < 0.4) continue
      g.fillStyle = `rgba(${Math.round(lerp(120, 220, l))},${Math.round(lerp(90, 160, l))},${Math.round(lerp(210, 255, l))},${0.25 + 0.6 * l})`
      g.beginPath(); g.arc(x * step + step / 2, y * step + step / 2, rad, 0, Math.PI * 2); g.fill()
    }
  }
  const glow = fill(root, { background: 'radial-gradient(60% 55% at 50% 55%, rgba(154,123,224,0.35), rgba(20,10,46,0) 70%)' })
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '0 0' }, root)
  const big = el('div', {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-56%)', fontFamily: SERIF, fontStyle: 'italic',
    fontSize: '560px', lineHeight: 1, color: 'rgba(214,196,255,0.28)', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
  }, world, 'Align')
  const PW = 820, PH = 72
  const pill = el('div', {
    position: 'absolute', left: (W / 2 - PW / 2) + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '999px',
    background: 'linear-gradient(180deg, rgba(58,40,104,0.62) 0%, rgba(34,22,70,0.66) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(196,182,228,0.24), inset 0 -1px 0 rgba(11,6,32,0.35), 0 20px 60px rgba(11,6,32,0.5)',
    backdropFilter: 'blur(10px) saturate(1.35)', webkitBackdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden',
  }, world)
  // glass: soft top sheen + a slow diagonal glint
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0))', pointerEvents: 'none' }, pill)
  const glint = el('div', { position: 'absolute', top: '-20px', width: '90px', height: (PH + 40) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.07), rgba(255,255,255,0))', transform: 'skewX(-22deg)', pointerEvents: 'none' }, pill)
  // morph target: the pill becomes a paper disc that S5's circle wipe grows out of
  const disc = el('div', { position: 'absolute', inset: 0, background: C.paper, opacity: 0, pointerEvents: 'none' }, pill)
  const eyebrow = el('div', {
    position: 'absolute', left: '50%', top: (H / 2 - PH / 2 - 48) + 'px', transform: 'translateX(-50%)', fontFamily: MONO, fontSize: '16px', textShadow: '0 1px 12px rgba(11,6,32,0.8)',
    letterSpacing: '0.24em', color: 'rgba(239,230,214,0.88)', whiteSpace: 'nowrap', textTransform: 'uppercase', opacity: 0,
  }, world, 'Your chart starts here')
  const field = el('div', { position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: '24px', color: C.bone, whiteSpace: 'pre' }, pill)
  const caret = el('span', { display: 'inline-block', width: '2px', height: '28px', background: C.bone, marginLeft: '2px', verticalAlign: '-5px' }, null)
  const hint = el('div', { position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: '24px', color: C.label3, whiteSpace: 'pre' }, pill, 'When and where were you born?')
  const send = el('div', {
    position: 'absolute', right: '12px', top: '12px', width: '48px', height: '48px', borderRadius: '999px',
    background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: '22px', fontWeight: 600,
  }, pill, '↑')
  const spinner = el('div', { position: 'absolute', left: '50%', top: '50%', width: '30px', height: '30px', margin: '-15px 0 0 -15px', borderRadius: '50%', border: '2.5px solid rgba(26,16,51,0.18)', borderTopColor: C.ink, opacity: 0 }, pill)
  const pointer = el('div', { position: 'absolute', width: '30px', height: '40px', opacity: 0 }, world,
    '<svg width="30" height="40" viewBox="0 0 24 32"><path d="M2 2 L2 26 L8 20 L12 30 L16 28 L12 18 L20 18 Z" fill="#fff7ec" stroke="#140a2e" stroke-width="1.6" stroke-linejoin="round"/></svg>')
  const typedAt = birthTypedAt()
  // measure char x offsets once
  let xs = null
  const measure = () => {
    const probe = el('span', { position: 'absolute', visibility: 'hidden', fontFamily: SANS, fontSize: '24px', whiteSpace: 'pre' }, pill)
    xs = [0]
    for (let i = 1; i <= TEXT.length; i++) { probe.textContent = TEXT.slice(0, i); xs.push(probe.getBoundingClientRect().width / (window.__stageScale || 1)) }
    probe.remove()
  }

  return {
    start: 9.95, end: 14.4, root,
    update(t) {
      drawCloud()
      if (!xs) measure()
      cloud.style.transform = `translate(${Math.sin(t * 0.4) * 30}px, ${Math.cos(t * 0.3) * 18}px) scale(${lerp(1.06, 1.0, prog(t, 9.9, 14.4))})`
      const n = typedAt.filter(v => v <= t).length
      field.textContent = TEXT.slice(0, n)
      const blink = t < T0 - 0.05 || t > T1 + 0.1 ? Math.floor(t * 2.2) % 2 === 0 : true
      caret.style.opacity = blink && t < 13.55 ? '1' : '0'
      field.appendChild(caret)
      hint.style.opacity = n === 0 ? String(ease.outQuad(prog(t, 10.0, 10.25))) : '0'
      // camera: zoom on the caret while typing
      const zIn = ease.inOutExpo(prog(t, 10.2, 10.6))
      const zOut = ease.outExpo(prog(t, 12.6, 13.25))
      const z = lerp(1, lerp(5.2, 1, zOut), zIn)
      // smooth glide between keystrokes instead of stepping a whole glyph at 5.2×
      const kp = n > 0 ? ease.outCubic(prog(t, typedAt[n - 1], typedAt[n - 1] + 0.14)) : 1
      const cx = n > 0 ? lerp(xs[n - 1], xs[n], kp) : 0
      const caretX = W / 2 - PW / 2 + 32 + cx
      const zf = zIn * (1 - zOut)
      const focusX = lerp(W / 2, caretX, zf)
      const focusY = H / 2
      // frame the caret at ~62% of width so the typed text has room on the left
      const anchorX = lerp(W / 2, W * 0.62, zf)
      const tx = anchorX - focusX * z, ty = H / 2 - focusY * z
      world.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`
      // intro: pill rises in
      const inP = ease.spring(prog(t, 9.95, 10.45), 0.06)
      pill.style.opacity = String(clamp(inP * 2))
      // pointer comes in and clicks send
      const pp = ease.inOutCubic(prog(t, 13.05, 13.45))
      const sendX = W / 2 + PW / 2 - 36, sendY = H / 2
      pointer.style.left = lerp(sendX + 220, sendX - 6, pp) + 'px'
      pointer.style.top = lerp(sendY + 190, sendY - 4, pp) + 'px'
      pointer.style.opacity = String(prog(t, 13.0, 13.15) * (1 - prog(t, 13.75, 13.85)))
      const press = t > 13.5 && t < 13.62 ? 0.86 : 1
      pointer.style.transform = `scale(${press})`
      // morph to a loading circle
      const m = ease.inOutExpo(prog(t, 13.6, 14.0))
      const w = lerp(PW, PH, m)
      pill.style.width = w + 'px'; pill.style.left = (W / 2 - w / 2) + 'px'
      send.style.transform = `scale(${press * (1 - m)})`
      field.style.opacity = String(1 - prog(t, 13.6, 13.75))
      spinner.style.opacity = String(prog(t, 13.88, 14.0))
      disc.style.opacity = String(ease.inOutQuad(prog(t, 13.78, 14.0)))
      glint.style.left = lerp(-140, PW + 60, prog(t, 10.6, 12.4)) + 'px'
      eyebrow.style.opacity = String(ease.outQuad(prog(t, 12.95, 13.25)) * (1 - prog(t, 13.55, 13.7)))
      spinner.style.transform = `rotate(${t * 520}deg)`
      big.style.transform = `translate(-50%,-56%) scale(${lerp(1.04, 0.98, prog(t, 9.95, 14.4))})`
      big.style.opacity = String(ease.outQuad(prog(t, 9.95, 10.45)))
      glow.style.opacity = String(0.7 + 0.3 * Math.sin(t * 1.3))
    },
  }
}
