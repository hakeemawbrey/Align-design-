// birthtime · THE SIGN CARD (5.53–11.2): the real onboarding pull (card-sign-back → card-sign + YOUR CARD stamp).
// Card centre (1270,540), body 600px tall; copy column on the left (x ≥ 300).
// Timing (sound):
//   5.53–6.10 face-down sign card grows out of the green disc (spring) · 5.9–8.25 it charges:
//             green halo + rays swell, motes stream in, slow breathe 1.00→1.04, a tremble from 7.7
//   6.10 "YOUR FIRST PULL / One card has your name." fades up (full 6.5), held to 7.95, out 7.95–8.15
//   8.25–8.65 the flip (rotateY 0→180) · 8.45 flash + pixel-star burst + shock ring (boom, glitter)
//   8.82–9.00 "YOUR CARD" stamp drops and lands 9.00 (tick + boom), card kicks 9.00–9.18
//   8.80 "YOUR SUN SIGN / Sun in Taurus." fades up (full 9.15), held to 10.55, out 10.55–10.75
//   10.55–11.10 card drifts back and dissolves (rays/halo out) as the end line arrives
import { clamp, lerp, prog, ease, tw, rng, el, C } from '../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../src/scenes/common.js'
import { CARD_X as CX, CARD_Y as CY } from './hook.js'

const BODY = 600
const T_IN = 5.53, T_FLIP = 8.25, T_FLIP1 = 8.65, T_FLASH = 8.45, T_STAMP = 9.0, T_OUT = 10.55
const GREEN = '127,230,150'

function copyBlock(parent, eyebrow, lines) {
  const box = el('div', { position: 'absolute', left: '300px', top: '0', width: '760px', opacity: 0 }, parent)
  el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.32em', color: 'rgba(239,230,214,0.78)', textTransform: 'uppercase', marginBottom: '22px', textShadow: '0 1px 12px rgba(11,6,32,0.8)' }, box, eyebrow)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.02, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.18), 0 2px 18px rgba(8,4,24,0.7)' }, box, lines)
  return box
}

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // light rays + motes (canvas, behind the card)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen' }, root)
  cv.width = W; cv.height = H
  const g = cv.getContext('2d')
  const halo = el('div', { position: 'absolute', left: (CX - 520) + 'px', top: (CY - 520) + 'px', width: '1040px', height: '1040px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: `radial-gradient(closest-side, rgba(${GREEN},0.55), rgba(${GREEN},0.2) 45%, rgba(${GREEN},0) 100%)` }, root)
  // the card: perspective wrap → flipper (back / face)
  const wrap = el('div', { position: 'absolute', left: CX + 'px', top: CY + 'px', width: '0', height: '0', perspective: '1800px' }, root)
  const flip = el('div', { position: 'absolute', left: '0', top: '0', width: '0', height: '0', transformStyle: 'preserve-3d' }, wrap)
  const sb = BODY / 1204, sf = BODY / 910
  const back = img(flip, A + 'card-sign-back.png', { left: (-522.5 * sb) + 'px', top: (-724 * sb) + 'px', width: (1044 * sb) + 'px', height: (1440 * sb) + 'px', maskImage: 'linear-gradient(90deg, transparent 2%, #000 10%, #000 90%, transparent 98%), linear-gradient(180deg, transparent 1%, #000 8%, #000 92%, transparent 99%)', maskComposite: 'intersect', webkitMaskImage: 'linear-gradient(90deg, transparent 2%, #000 10%, #000 90%, transparent 98%), linear-gradient(180deg, transparent 1%, #000 8%, #000 92%, transparent 99%)', webkitMaskComposite: 'source-in', backfaceVisibility: 'hidden' })
  const faceBox = el('div', { position: 'absolute', left: '0', top: '0', width: '0', height: '0', transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }, flip)
  img(faceBox, A + 'card-sign.png', { left: (-423.5 * sf) + 'px', top: (-576 * sf) + 'px', width: (848 * sf) + 'px', height: (1152 * sf) + 'px', maskImage: 'linear-gradient(90deg, transparent 3%, #000 13%, #000 87%, transparent 97%), linear-gradient(180deg, transparent 2%, #000 10%, #000 90%, transparent 98%)', maskComposite: 'intersect', webkitMaskImage: 'linear-gradient(90deg, transparent 3%, #000 13%, #000 87%, transparent 97%), linear-gradient(180deg, transparent 2%, #000 10%, #000 90%, transparent 98%)', webkitMaskComposite: 'source-in', backfaceVisibility: 'hidden' })
  // rim light on the charging back
  const rim = el('div', { position: 'absolute', left: (-0.335 * BODY) + 'px', top: (-BODY / 2) + 'px', width: (0.67 * BODY) + 'px', height: BODY + 'px', borderRadius: '30px', backfaceVisibility: 'hidden', opacity: 0,
    boxShadow: `0 0 0 2px rgba(190,255,200,0.85), 0 0 34px rgba(${GREEN},0.9), 0 0 90px rgba(${GREEN},0.55)` }, flip)
  void back
  // flash plate over the card at the flip
  const flash = el('div', { position: 'absolute', left: (CX - 420) + 'px', top: (CY - 420) + 'px', width: '840px', height: '840px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,255,245,0.95), rgba(190,255,200,0.55) 30%, rgba(127,230,150,0) 100%)' }, root)
  // YOUR CARD stamp (app styling: pearl pill, mono caps, dark ink)
  const stampWrap = el('div', { position: 'absolute', left: (CX + 150) + 'px', top: (CY - BODY / 2 - 6) + 'px', width: '0', height: '0' }, root)
  const stamp = el('div', {
    position: 'absolute', left: '-130px', top: '-30px', width: '260px', height: '60px', borderRadius: '14px', opacity: 0,
    background: 'linear-gradient(100deg, #fbf6ff 0%, #fffaf1 45%, #f1f5ff 100%)', boxShadow: '0 10px 28px rgba(11,6,32,0.45), inset 0 0 0 1px rgba(255,255,255,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', fontFamily: MONO, fontSize: '23px', letterSpacing: '0.28em', color: '#2a1f40', whiteSpace: 'nowrap',
  }, stampWrap, '<span style="font-size:18px;letter-spacing:0">✦</span><span>YOUR CARD</span>')

  const c1 = copyBlock(root, 'Your first pull', 'One card has<br>your name.')
  const c2 = copyBlock(root, 'Your sun sign', 'Sun in Taurus.')
  c1.style.top = '386px'; c2.style.top = '448px'

  const r = rng(808)
  const MOTES = Array.from({ length: 70 }, () => ({ a: r() * 6.283, r0: 380 + r() * 520, ph: r(), sp: 0.35 + r() * 0.45, s: r() < 0.25 ? 4 : 2 + Math.round(r()), c: r() < 0.6 ? GREEN : r() < 0.5 ? '242,199,92' : '239,230,214' }))
  const BURST = Array.from({ length: 46 }, () => ({ a: r() * 6.283, d: 260 + r() * 560, s: r() < 0.3 ? 4 : 3, c: r() < 0.5 ? '190,255,200' : r() < 0.5 ? '242,199,92' : '255,248,236', k: r() < 0.4 }))
  const RAYS = Array.from({ length: 22 }, (_, i) => ({ a: (i / 22) * 6.283 + r() * 0.12, w: 0.025 + r() * 0.035, l: 0.7 + r() * 0.5, ph: r() * 6.28 }))

  return {
    start: T_IN, end: 11.2, root,
    update(t) {
      const charge = ease.inQuad(prog(t, 5.9, T_FLIP))                       // 0 → 1 build
      const fl = Math.exp(-(((t - T_FLASH) / 0.16) ** 2))                    // flash pulse
      const after = prog(t, T_FLIP1, T_FLIP1 + 0.4)
      const out = ease.inOutCubic(prog(t, T_OUT, 11.1))
      // ── card transform
      const inP = ease.spring(prog(t, T_IN, 6.1), 0.08)
      const breathe = 1 + 0.04 * charge + 0.012 * Math.sin(t * 5) * charge
      const trem = t > 7.7 && t < T_FLIP ? Math.sin(Math.round(t * 30) * 2.1) * 2.2 * prog(t, 7.7, T_FLIP) : 0
      const fp = ease.inOutCubic(prog(t, T_FLIP, T_FLIP1))
      const kick = t >= T_STAMP ? Math.sin(prog(t, T_STAMP, T_STAMP + 0.18) * Math.PI) * (1 - prog(t, T_STAMP, T_STAMP + 0.18)) : 0
      const pop = 1 + 0.1 * Math.sin(fp * Math.PI)
      const sc = lerp(0.22, 1, inP) * breathe * pop * (1 - 0.03 * kick) * lerp(1, 0.86, out)
      const ry = fp * 180
      flip.style.transform = `translate(${trem}px, ${kick * 6 - out * 30}px) scale(${sc}) rotateY(${ry}deg) rotateZ(${lerp(-1.5, 0, fp)}deg)`
      wrap.style.opacity = String(clamp(prog(t, T_IN, T_IN + 0.14)) * (1 - out))
      wrap.style.filter = out > 0 ? `blur(${out * 10}px)` : 'none'
      rim.style.opacity = String(charge * (0.6 + 0.4 * Math.sin(t * 9)) * (1 - prog(t, T_FLIP, T_FLIP + 0.15)))
      halo.style.opacity = String(clamp(0.25 * inP + 0.75 * charge + 0.6 * fl) * (t > T_FLIP1 ? lerp(1, 0.55, after) : 1) * (1 - out))
      halo.style.transform = `scale(${0.8 + 0.3 * charge + 0.25 * fl})`
      flash.style.opacity = String(fl * 0.9)
      flash.style.transform = `scale(${0.6 + 0.8 * prog(t, T_FLASH - 0.2, T_FLASH + 0.4)})`
      // ── stamp
      const sp = prog(t, 8.82, T_STAMP)
      const sl = ease.inQuad(sp)
      stamp.style.opacity = String(clamp(sp * 3) * (1 - out))
      stamp.style.transform = `rotate(${lerp(-14, -6, sl)}deg) scale(${lerp(2.3, 1, sl) * (1 - 0.06 * kick) * lerp(1, 0.86, out)})`
      stampWrap.style.transform = `translate(${kick * 3 - out * 150 * 0.14}px, ${kick * 6 - out * 30 + out * 42}px)`
      stampWrap.style.filter = out > 0 ? `blur(${out * 10}px)` : 'none'
      // ── copy
      const a1 = ease.outCubic(prog(t, 6.1, 6.5)) * (1 - ease.inQuad(prog(t, 7.95, 8.15)))
      c1.style.opacity = String(a1)
      c1.style.filter = `blur(${(1 - ease.outCubic(prog(t, 6.1, 6.5))) * 8}px)`
      c1.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 6.1, 6.5))) * 14}px)`
      const a2 = ease.outCubic(prog(t, 8.8, 9.15)) * (1 - ease.inQuad(prog(t, T_OUT, T_OUT + 0.2)))
      c2.style.opacity = String(a2)
      c2.style.filter = `blur(${(1 - ease.outCubic(prog(t, 8.8, 9.15))) * 8}px)`
      c2.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 8.8, 9.15))) * 14}px)`
      // ── canvas: rays, motes, burst, shock ring
      g.clearRect(0, 0, W, H)
      const rayA = (0.05 + 0.16 * charge + 0.4 * fl) * (t > T_FLIP1 ? lerp(1, 0.45, after) : 1) * (1 - out) * clamp(prog(t, 5.75, 6.35))
      if (rayA > 0.003) {
        const rot = t * 0.12
        for (const ry of RAYS) {
          const a = ry.a + rot, len = 900 * ry.l * (0.85 + 0.15 * Math.sin(t * 1.3 + ry.ph))
          const gr = g.createRadialGradient(CX, CY, 60, CX, CY, len)
          gr.addColorStop(0, `rgba(210,255,220,${rayA})`); gr.addColorStop(1, 'rgba(127,230,150,0)')
          g.fillStyle = gr
          g.beginPath(); g.moveTo(CX, CY)
          g.arc(CX, CY, len, a - ry.w, a + ry.w); g.closePath(); g.fill()
        }
      }
      const mA = clamp(prog(t, 5.9, 6.5)) * (1 - prog(t, T_FLIP, T_FLASH))
      if (mA > 0) for (const m of MOTES) {
        const f = ((t - 5.9) * m.sp * (0.6 + 0.9 * charge) + m.ph) % 1
        const rr = m.r0 * (1 - ease.inQuad(f)) + 40
        const a = Math.sin(Math.PI * f) * mA * (0.35 + 0.65 * charge)
        g.fillStyle = `rgba(${m.c},${a})`
        g.fillRect(Math.round(CX + Math.cos(m.a) * rr * 1.15), Math.round(CY + Math.sin(m.a) * rr), m.s, m.s)
      }
      const bp = prog(t, T_FLASH - 0.04, T_FLASH + 1.0)
      if (bp > 0 && bp < 1) {
        for (const b of BURST) {
          const d = b.d * ease.outCubic(bp) + 80
          const a = (1 - ease.inQuad(bp)) * 0.95
          const x = Math.round(CX + Math.cos(b.a) * d * 1.2), y = Math.round(CY + Math.sin(b.a) * d)
          g.fillStyle = `rgba(${b.c},${a})`
          g.fillRect(x - b.s / 2, y - b.s / 2, b.s, b.s)
          if (b.k) { g.fillRect(x - b.s / 2, y - b.s * 1.5, b.s, b.s); g.fillRect(x - b.s / 2, y + b.s / 2, b.s, b.s); g.fillRect(x - b.s * 1.5, y - b.s / 2, b.s, b.s); g.fillRect(x + b.s / 2, y - b.s / 2, b.s, b.s) }
        }
        const rp = ease.outCubic(prog(t, T_FLASH, T_FLASH + 0.7))
        if (rp > 0 && rp < 1) {
          g.strokeStyle = `rgba(220,255,225,${0.55 * (1 - rp)})`; g.lineWidth = 2
          g.beginPath(); g.ellipse(CX, CY, 200 + rp * 600, 200 + rp * 520, 0, 0, Math.PI * 2); g.stroke()
        }
      }
      // stamp dust ring
      const dp = prog(t, T_STAMP, T_STAMP + 0.45)
      if (dp > 0 && dp < 1) {
        g.strokeStyle = `rgba(255,248,236,${0.5 * (1 - dp)})`; g.lineWidth = 1.5
        g.beginPath(); g.ellipse(CX + 150, CY - BODY / 2 - 6, 140 + dp * 120, 34 + dp * 40, -0.1, 0, Math.PI * 2); g.stroke()
      }
    },
  }
}
