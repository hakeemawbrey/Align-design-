// S6 · the talk deck. Three talk cards drift at different depths (The Sun's "Morning person or night owl?" in front),
// "Then you talk in cards." — then the feature's glass pill: the camera whip-eases onto the caret while an answer
// types, eases back out, a pearl tap presses send.
import { clamp, lerp, prog, ease, el, C } from '../../../src/lib.js'
import { W, H, VERT, SANS, MONO, fill, spaceBackdrop } from '../../../src/scenes/common.js'
import { U, G, bodyH, face, sweep, caption, capIn, twinkles } from './kit.js'

export const S6 = { start: 18.75, end: 23.0 }
export const ANSWER = 'Night owl. You?'
const T0 = 20.55, T1 = 21.55   // typing window
const inOutQuart = x => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
/** keystroke times (sound cues) */
export function answerTypedAt() {
  const n = ANSWER.length; let acc = 0; const out = []
  for (let i = 0; i < n; i++) { acc += 0.8 + ((i * 37) % 7) / 10 + (ANSWER[i] === ' ' ? 0.6 : 0); out.push(acc) }
  return out.map(v => T0 + (v / acc) * (T1 - T0))
}
// layout
const L = VERT
  ? { cx: W / 2, cy: 620, cw: 440, capTop: 1080, PW: 860, PH: 92, FS: 36, px: W / 2, py: 1460, ZMAX: 1.75, ANCHOR: 0.62 }
  : { cx: W * 0.25, cy: H / 2 + 10, cw: 380, capTop: 250, PW: 700, PH: 84, FS: 32, px: W * 0.71, py: 640, ZMAX: 2.7, ANCHOR: 0.62 }

export function sceneTalk(stage) {
  const root = fill(stage, { background: 'transparent' })
  const bg = spaceBackdrop(root, 'teal', { seed: 14, grain: 0.18, stars: 180 })
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '0 0' }, root)
  // talk cards in a small 3D constellation
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: 2200 * U + 'px', perspectiveOrigin: `${L.cx}px ${L.cy}px` }, world)
  const scene = el('div', { position: 'absolute', left: L.cx + 'px', top: L.cy + 'px', width: 0, height: 0, transformStyle: 'preserve-3d' }, persp)
  const cw = L.cw, SP = VERT ? 0.58 : 0.78
  const SET = [[G.talk2, -cw * SP, cw * 0.1, -300, 18, 0], [G.talk1, cw * SP, -cw * 0.14, -220, -16, 1.7], [G.daily, 0, 0, 80, 0, 3.1]]
  const cards = SET.map(([g, x, y, z, r0, ph]) => {
    const w = g === G.daily ? cw : cw * 0.82, h = bodyH(g, w)
    const box = el('div', { position: 'absolute', left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', transformStyle: 'preserve-3d' }, scene)
    el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: `0 0 ${50 * U}px ${6 * U}px rgba(242,199,92,0.26), 0 ${36 * U}px ${80 * U}px rgba(4,2,14,0.6)` }, box)
    const f = face(box, g, w)
    return { box, x, y, z, r0, ph, w, ...f }
  })
  const cap = caption(world, 'The talk deck', 'Then you talk in cards.',
    VERT ? { left: 0, width: W + 'px', top: L.capTop + 'px', textAlign: 'center' } : { left: (L.px - L.PW / 2) + 'px', top: L.capTop + 'px', textAlign: 'left' })

  // the glass pill (feature S4)
  const { PW, PH } = L
  const pill = el('div', {
    position: 'absolute', left: (L.px - PW / 2) + 'px', top: (L.py - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '999px', opacity: 0,
    background: 'linear-gradient(180deg, rgba(52,30,108,0.78) 0%, rgba(40,20,90,0.82) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1.5px rgba(196,182,228,0.35), inset 0 -1px 0 rgba(11,6,32,0.35), 0 20px 60px rgba(11,6,32,0.5)',
    backdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden',
  }, world)
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0))' }, pill)
  const glint = el('div', { position: 'absolute', top: '-20px', width: '90px', height: (PH + 40) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0))', transform: 'skewX(-22deg)' }, pill)
  const eyebrow = el('div', { position: 'absolute', left: (L.px - PW / 2 + 30) + 'px', top: (L.py - PH / 2 - (VERT ? 58 : 52)) + 'px', fontFamily: MONO, fontSize: (VERT ? 26 : 22) + 'px', letterSpacing: '0.22em', color: 'rgba(239,230,214,0.85)', whiteSpace: 'nowrap', opacity: 0, textShadow: '0 1px 12px rgba(11,6,32,0.8)' }, world, 'YOUR ANSWER · THE SUN')
  const field = el('div', { position: 'absolute', left: '34px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: L.FS + 'px', color: C.bone, whiteSpace: 'pre' }, pill)
  const caret = el('span', { display: 'inline-block', width: '2px', height: L.FS * 1.15 + 'px', background: C.bone, marginLeft: '2px', verticalAlign: '-6px' }, null)
  const hint = el('div', { position: 'absolute', left: '36px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontSize: L.FS + 'px', color: C.label3, whiteSpace: 'pre' }, pill, 'Play your card…')
  const SB = PH - 22
  const send = el('div', { position: 'absolute', right: '11px', top: '11px', width: SB + 'px', height: SB + 'px', borderRadius: '999px',
    background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: SB * 0.46 + 'px', fontWeight: 600 }, pill, '↑')
  const TAP = VERT ? 58 : 50
  const ripple = el('div', { position: 'absolute', width: TAP + 'px', height: TAP + 'px', margin: (-TAP / 2) + 'px 0 0 ' + (-TAP / 2) + 'px', borderRadius: '50%', border: '2.5px solid rgba(255,247,236,0.95)', boxShadow: '0 0 18px rgba(214,196,255,0.45)', opacity: 0 }, world)
  const tap = el('div', { position: 'absolute', width: TAP + 'px', height: TAP + 'px', margin: (-TAP / 2) + 'px 0 0 ' + (-TAP / 2) + 'px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 34%), linear-gradient(135deg, #f8edff 0%, #fff7ec 34%, #dfe9fb 64%, #ffeaf4 100%)',
    boxShadow: 'inset 0 -3px 6px rgba(120,96,170,0.28), inset 0 0 0 1px rgba(255,255,255,0.65), 0 10px 26px rgba(11,6,32,0.45)' }, world)
  const typedAt = answerTypedAt()
  let xs = null
  const measure = () => {
    const probe = el('span', { position: 'absolute', visibility: 'hidden', fontFamily: SANS, fontSize: L.FS + 'px', whiteSpace: 'pre' }, pill)
    xs = [0]
    for (let i = 1; i <= ANSWER.length; i++) { probe.textContent = ANSWER.slice(0, i); xs.push(probe.getBoundingClientRect().width / (window.__stageScale || 1)) }
    probe.remove()
  }
  const S0 = S6.start, S1 = S6.end
  return {
    start: S0, end: S1, root,
    update(t) {
      root.style.zIndex = '24'
      if (!xs) measure()
      bg.update(t)
      const lt = t - S0, p = lt / (S1 - S0)
      // cards: the little constellation turns slowly as the camera drifts past
      scene.style.transform = `rotateY(${lerp(18, -14, ease.inOutQuad(p))}deg) rotateX(${lerp(6, -3, p)}deg) translateZ(${lerp(-140, 30, ease.outQuad(p))}px)`
      cards.forEach((c, i) => {
        const bob = Math.sin(lt * 0.8 + c.ph)
        const inn = ease.outCubic(prog(t, S0 + 0.1 + i * 0.15, S0 + 0.9 + i * 0.15))
        c.box.style.opacity = String(inn)
        c.box.style.transform = `translate3d(${c.x}px, ${c.y + bob * 14 + (1 - inn) * 90}px, ${c.z}px) rotateY(${c.r0 + 6 * Math.sin(lt * 0.5 + c.ph)}deg) rotateZ(${2.2 * Math.sin(lt * 0.6 + c.ph)}deg)`
        sweep(c.glint, c.w, prog(t, S0 + 0.8 + i * 0.4, S0 + 2.3 + i * 0.4))
      })
      capIn(cap, t, S0 + 0.45, 99, VERT ? 0 : 40)
      // pill rises in, then the camera eases onto the caret while the answer types
      const pin = ease.spring(prog(t, S0 + 1.1, S0 + 1.6), 0.06)
      pill.style.opacity = String(clamp(pin * 2))
      pill.style.transform = `translateY(${(1 - clamp(pin)) * 30}px)`
      const n = typedAt.filter(v => v <= t).length
      field.textContent = ANSWER.slice(0, n)
      const blink = t < T0 - 0.05 || t > T1 + 0.1 ? Math.floor(t * 2.2) % 2 === 0 : true
      caret.style.opacity = blink && t < 22.2 ? '1' : '0'
      field.appendChild(caret)
      hint.style.opacity = n === 0 ? String(ease.outQuad(prog(t, S0 + 1.3, S0 + 1.6))) : '0'
      const zIn = inOutQuart(prog(t, 20.1, 20.65))
      const zOut = inOutQuart(prog(t, 21.65, 22.2))
      const zf = zIn * (1 - zOut)
      const z = Math.pow(L.ZMAX, zf)
      const kp = n > 0 ? ease.outCubic(prog(t, typedAt[n - 1], typedAt[n - 1] + 0.1)) : 1
      const cx = n > 0 ? lerp(xs[n - 1], xs[n], kp) : 0
      const caretX = L.px - PW / 2 + 34 + cx
      const focusX = lerp(L.px, caretX, zf), focusY = L.py
      const anchorX = lerp(L.px, W * L.ANCHOR, zf), anchorY = lerp(L.py, VERT ? H * 0.66 : H / 2, zf)
      world.style.transform = `translate(${anchorX - focusX * z}px, ${anchorY - focusY * z}px) scale(${z})`
      eyebrow.style.opacity = String(ease.outQuad(prog(t, S0 + 1.3, S0 + 1.6)) * (1 - zf))
      cap.style.opacity = String(Number(cap.style.opacity) * (1 - clamp(zf * 1.5)))
      glint.style.left = lerp(-140, PW + 60, prog(t, 20.6, 22.0)) + 'px'
      // tap: pearl disc glides in, presses send, ripples
      const sendX = L.px + PW / 2 - 11 - SB / 2, sendY = L.py
      const ap = ease.outCubic(prog(t, 21.95, 22.25))
      const press = t < 22.25 ? 0 : t < 22.3 ? ease.outQuad(prog(t, 22.25, 22.3)) : 1 - ease.inOutQuad(prog(t, 22.3, 22.45))
      tap.style.left = lerp(sendX + 180, sendX + 10, ap) + 'px'; tap.style.top = lerp(sendY + 160, sendY + 12, ap) + 'px'
      tap.style.opacity = String(0.85 * prog(t, 21.95, 22.05) * (1 - prog(t, 22.45, 22.6)))
      tap.style.transform = `scale(${lerp(1.12, 1, ap) * (1 - 0.24 * press)})`
      const rp = prog(t, 22.3, 22.75)
      ripple.style.left = sendX + 'px'; ripple.style.top = sendY + 'px'
      ripple.style.opacity = rp > 0 && rp < 1 ? String(0.95 * (1 - ease.outQuad(rp))) : '0'
      ripple.style.transform = `scale(${lerp(0.8, 2.8, ease.outCubic(rp))})`
      send.style.transform = `scale(${1 - 0.14 * press})`
      root.style.opacity = String(ease.outQuad(prog(t, S0, S0 + 0.25)))
    },
    fx(ctx, t) {
      if (t > 20.0) return
      twinkles(ctx, t, S0 + 0.4, 20.0, VERT ? [80, 160, W - 160, 900] : [80, 120, W * 0.5, H - 240], 73, 12)
    },
  }
}
