// S2 · DEALBREAKERS FIRST (5.4–11.25). Out of the flood, Align's sign-up step: the dealbreakers screen ("What ends it
// before it starts?", screen-onboarding-dealbreakers.png) on a phone; "Seal my card" is pressed and the phone becomes
// the card (Juniper's veiled card turns face-up); her dealbreaker chips STAMP onto it (ghosted half b recipe).
//   5.40–6.00  only content (the plate is still s1's flood; grain masked to what we draw) · from PLATE 6.0 we paint the sky
//   5.45–6.10  the phone forms where the old one broke, slow push to 7.5
//   5.85 eyebrow "DEALBREAKERS FIRST" · 6.05 "Said on / day one." (typed ≈6.85, holds to 10.6)
//   7.15–7.50  a glint runs across "Seal my card" · 7.55 press · 7.56–7.82 the phone washes out and shrinks away
//   7.68–8.12  the card turns in (a glimpse of its back, edge-on, then face-up) · 8.35 8.67 8.99 chips stamp: DOESN'T WANT KIDS · ONE-WORD TEXTS · FLAKY PLANS
//   9.40–9.80  the card brightens back · 9.60–10.20 gold glint on her DEALBREAKERS footer · 10.60–10.95 drift + fade out
import { clamp, lerp, prog, ease, tw, el, C, TypeLine } from '../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, layerCanvas, loadArt, drawCard, cardSpace, glint, pocketCanvas, ART, bodyH, pixStar, PLATE } from './kit.js'

const T0 = 5.4, T1 = 11.25
const PH_ = { x: 640, y: 540, h: 1000 }                     // phone frame (stage px)
const SCR = { w: 1170, h: 2532 }, RIM = 11
const FORM = { a: 5.45, b: 6.1 }
const SEAL = { glint: [7.15, 7.5], press: 7.55 }
const MORPH = { a: 7.56, b: 7.82 }
const FLIP = { a: 7.68, b: 8.12 }
const CARD = { x: 640, y: 540, h: 880 }
const STAMPS = [8.35, 8.67, 8.99], DROP = 0.11
const CHIPS = ['DOESN’T WANT KIDS', 'ONE-WORD TEXTS', 'FLAKY PLANS']
const CHIP_Y = [-662, -487, -312], CHIP_ROT = [-2.2, 1.6, -1.2]
const VEIL = { in: [7.95, 8.3], out: [9.4, 9.8], k: 0.42 }
const FOOT = { a: 9.6, b: 10.2 }
const EXIT = { a: 10.6, b: 10.95 }
const COPY = { eb: 5.85, line: 6.05, out: 10.6 }

const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const loadImg = src => new Promise(res => { const im = new Image(); im.decoding = 'sync'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const shakeAt = (t, t0, amp) => {
  const f = Math.round((t - t0) * 30)
  return f >= 0 && f < 3 ? [[1, -1], [-1, 0.6], [0.5, 0.4]][f].map(v => v * amp * (1 - f / 3)) : [0, 0]
}

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await loadArt()
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})
  const scr = await loadImg(A + 'screen-onboarding-dealbreakers.png')

  // ── the phone, pre-rendered (frame h 1000 at 1.3×)
  const R = 1.3, sh = PH_.h - 2 * RIM, sw = sh * SCR.w / SCR.h, fw = sw + 2 * RIM, fh = PH_.h
  const phoneC = canvas(Math.ceil(fw * R), Math.ceil(fh * R)); {
    const x = phoneC.getContext('2d'); x.scale(R, R)
    const g = x.createLinearGradient(0, 0, fw * 0.6, fh); g.addColorStop(0, '#3a3350'); g.addColorStop(0.45, '#17122a'); g.addColorStop(1, '#0e0a1c')
    x.fillStyle = g; x.beginPath(); x.roundRect(0, 0, fw, fh, 64); x.fill()
    x.strokeStyle = 'rgba(214,200,255,0.22)'; x.lineWidth = 1.5; x.beginPath(); x.roundRect(0.75, 0.75, fw - 1.5, fh - 1.5, 63); x.stroke()
    x.save(); x.beginPath(); x.roundRect(RIM, RIM, sw, sh, 54); x.clip()
    x.imageSmoothingQuality = 'high'; if (scr) x.drawImage(scr, RIM, RIM, sw, sh)
    x.restore()
  }
  // the "Seal my card" button in screen px → phone px
  const BTN = { x: RIM + 587 / SCR.w * sw, y: RIM + 2001 / SCR.h * sh, w: 944 / SCR.w * sw, h: 160 / SCR.h * sh }

  const pocket = pocketCanvas(1330, 540, 620, 330, 0.55)
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── copy
  const eb = el('div', { position: 'absolute', left: '1062px', top: '392px', fontFamily: MONO, fontSize: '36px', letterSpacing: '0.32em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)' }, root, 'DEALBREAKERS FIRST')
  const line = new TypeLine(root, 'Said on\nday one.', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '128px', lineHeight: '1.06', letterSpacing: '-0.005em', color: C.bone,
    textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)', left: '1054px', top: '452px' }, { perChar: 0.034, fade: 0.3, accent: [C.rub, C.gold, C.violet] })

  // ── chips (drawn in the card's space, PNG px), each font fitted to the photo window
  const chipF = CHIPS.map(s => {
    bx.save(); bx.font = `86px 'Space Mono', monospace`; bx.letterSpacing = '6px'; const w = bx.measureText(s).width; bx.restore()
    const fs = Math.min(86, 86 * 900 / (w + 40)); return { fs, w: w * fs / 86 + 160 + (86 - fs) * 0.5 }
  })
  function drawChip(i, a, sc) {
    const { fs, w } = chipF[i], h = 150
    bx.save()
    bx.translate(10, CHIP_Y[i]); bx.rotate(CHIP_ROT[i] * Math.PI / 180); bx.scale(sc, sc)
    bx.globalAlpha = a
    bx.shadowColor = 'rgba(4,2,14,0.8)'; bx.shadowBlur = 30; bx.shadowOffsetY = 10
    bx.fillStyle = 'rgba(16,9,40,0.94)'
    bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    bx.shadowColor = 'transparent'; bx.shadowBlur = 0; bx.shadowOffsetY = 0
    bx.lineWidth = 5; bx.strokeStyle = 'rgba(239,230,214,0.92)'; bx.stroke()
    const mx = -w / 2 + 70
    bx.lineWidth = 9; bx.lineCap = 'round'; bx.strokeStyle = C.bone
    bx.beginPath(); bx.moveTo(mx - 17, -17); bx.lineTo(mx + 17, 17); bx.moveTo(mx + 17, -17); bx.lineTo(mx - 17, 17); bx.stroke()
    bx.font = `${fs}px 'Space Mono', monospace`; bx.letterSpacing = '6px'
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText(CHIPS[i], mx + 40, 5)
    bx.restore()
  }
  const chipState = (t, i) => {
    const t0 = STAMPS[i]
    if (t < t0) return [0, 1]
    const p = prog(t, t0, t0 + DROP)
    if (p < 1) return [ease.outQuad(Math.min(1, p * 2.5)), lerp(1.7, 1, ease.inQuad(p))]
    return [1, 1 - 0.05 * Math.sin(Math.PI * prog(t, t0 + DROP, t0 + DROP + 0.16))]
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      bx.setTransform(1, 0, 0, 1, 0, 0); bx.globalAlpha = 1; bx.globalCompositeOperation = 'source-over'
      bx.clearRect(0, 0, W, H)
      const plate = t >= PLATE
      if (plate) { sky(bx, t, 1); twinkles(bx, t) }
      const pk = ease.inOutQuad(prog(t, PLATE, PLATE + 0.45)) * (1 - ease.inOutQuad(prog(t, COPY.out, COPY.out + 0.35)))
      if (plate && pk > 0) { bx.globalAlpha = pk; bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1 }

      // ── the phone
      const fp = ease.outCubic(prog(t, FORM.a, FORM.b))
      const mp = ease.inOutCubic(prog(t, MORPH.a, MORPH.b))
      if (fp > 0 && mp < 1) {
        const push = 1 + 0.03 * ease.inOutQuad(prog(t, FORM.b, MORPH.a))
        const s = lerp(0.9, 1, fp) * push * lerp(1, 0.8, mp)
        const y = PH_.y + (1 - fp) * 40
        const a = ease.outQuad(prog(t, FORM.a, FORM.a + 0.35)) * (1 - ease.inQuad(prog(t, MORPH.a + 0.04, MORPH.b)))
        bx.save(); bx.translate(PH_.x, y); bx.scale(s / R, s / R); bx.translate(-phoneC.width / 2, -phoneC.height / 2)
        bx.globalAlpha = a
        bx.shadowColor = 'rgba(4,2,14,0.75)'; bx.shadowBlur = 60; bx.shadowOffsetY = 24
        bx.drawImage(phoneC, 0, 0)
        bx.shadowColor = 'transparent'
        // forming glow (fades as it settles) + the morph wash
        const wash = 0.55 * (1 - fp) + 0.9 * Math.sin(Math.PI * mp)
        if (wash > 0.01) { bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a * wash * 0.5; bx.drawImage(phoneC, 0, 0) }
        bx.restore()
        // seal button: glint + press flash
        const gk = prog(t, SEAL.glint[0], SEAL.glint[1]), pf = t >= SEAL.press ? Math.exp(-(t - SEAL.press) * 8) : 0
        if ((gk > 0 && gk < 1) || pf > 0.01) {
          bx.save(); bx.translate(PH_.x, y); bx.scale(s, s); bx.translate(-fw / 2, -fh / 2)
          bx.beginPath(); bx.roundRect(BTN.x - BTN.w / 2, BTN.y - BTN.h / 2, BTN.w, BTN.h, BTN.h / 2); bx.clip()
          bx.globalCompositeOperation = 'lighter'
          if (gk > 0 && gk < 1) {
            const gx0 = BTN.x - BTN.w * 0.7 + gk * BTN.w * 1.4, g = bx.createLinearGradient(gx0 - 60, 0, gx0 + 60, 0)
            g.addColorStop(0, 'rgba(255,226,160,0)'); g.addColorStop(0.5, `rgba(255,226,160,${0.7 * a})`); g.addColorStop(1, 'rgba(255,226,160,0)')
            bx.fillStyle = g; bx.fillRect(BTN.x - BTN.w / 2, BTN.y - BTN.h / 2, BTN.w, BTN.h)
          }
          if (pf > 0.01) { bx.fillStyle = `rgba(255,240,220,${0.6 * pf * a})`; bx.fillRect(BTN.x - BTN.w / 2, BTN.y - BTN.h / 2, BTN.w, BTN.h) }
          bx.restore()
        }
      }

      // ── the card: turns face-up out of the morph, chips stamp, then it drifts off
      if (t >= FLIP.a - 0.05) {
        const f = prog(t, FLIP.a, FLIP.b)
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        const push = prog(t, FLIP.b, EXIT.a)
        let sh = [0, 0]
        for (const s of STAMPS) { const d = shakeAt(t, s + DROP, 7); sh = [sh[0] + d[0], sh[1] + d[1]] }
        const J = { x: CARD.x + sh[0] - 70 * ex, y: CARD.y + sh[1] - Math.sin(Math.PI * f) * 20 + Math.sin((t - FLIP.b) * 1.1) * 3 * prog(t, FLIP.b, FLIP.b + 0.4) - 20 * ex,
          h: CARD.h * (1 + 0.03 * push) * lerp(1.05, 1, ease.outCubic(f)), rz: lerp(0, -1.2, ease.inOutCubic(f)), ry: 125 * (1 - ease.outCubic(f)),
          alpha: ease.outQuad(prog(t, FLIP.a, FLIP.a + 0.12)) * (1 - ease.outQuad(ex)) }
        drawCard(bx, 'p3', J.x, J.y, J.h, { ry: J.ry, rz: J.rz, alpha: J.alpha, back: 'back', glow: 0.6 * Math.sin(Math.PI * f) })
        const flat = Math.abs(J.ry) < 0.05
        const a = ART.p3, bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
        const veil = VEIL.k * ease.inOutQuad(prog(t, VEIL.in[0], VEIL.in[1])) * (1 - ease.inOutQuad(prog(t, VEIL.out[0], VEIL.out[1])))
        if (veil > 0.003 && flat) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = veil * J.alpha; bx.fillStyle = '#0b0620'
          bx.beginPath(); bx.roundRect(a.b[0] - bcx + 4, a.b[1] - bcy + 4, a.b[2] - a.b[0] - 8, a.b[3] - a.b[1] - 8, a.r); bx.fill()
          bx.restore()
        }
        const cov = ease.inOutQuad(prog(t, STAMPS[0] - 0.3, STAMPS[0] - 0.02))
        if (cov > 0.003 && flat) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = 0.92 * cov * J.alpha; bx.fillStyle = '#120a24'
          bx.beginPath(); bx.roundRect(218 - 747 - 4, 342 - 1115 - 4, 1074 + 8, 572 + 8, 40); bx.fill()
          bx.restore()
        }
        if (t >= STAMPS[0] && flat) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          CHIPS.forEach((_, i) => { const [ca, sc] = chipState(t, i); if (ca > 0.003) drawChip(i, ca * J.alpha, sc) })
          bx.restore()
          STAMPS.forEach((s, i) => {
            const q = prog(t, s + DROP, s + DROP + 0.45)
            if (q <= 0 || q >= 1) return
            const sc = J.h / bodyH('p3'), ang = J.rz * Math.PI / 180
            const cxp = J.x + (10 * Math.cos(ang) - CHIP_Y[i] * Math.sin(ang)) * sc, cyp = J.y + (10 * Math.sin(ang) + CHIP_Y[i] * Math.cos(ang)) * sc
            bx.imageSmoothingEnabled = false
            for (let d = 0; d < 10; d++) {
              const side = d % 2 ? 1 : -1, sp = 60 + (d * 37 % 50)
              const px = cxp + side * (chipF[i].w * sc / 2 + ease.outCubic(q) * sp), py = cyp + ((d * 13) % 30 - 15) * sc * 2 - q * 10
              pixStar(bx, px, py, 3, 2, d % 3 ? '#efe6d6' : '#ffe2a0', '#fff3e0', (1 - q) * 0.8 * J.alpha)
            }
            bx.imageSmoothingEnabled = true
          })
          // the first chip (the one that would have ended it) catches a gold glint
          glint(bx, 'p3', J.x, J.y, J.h, J.rz, prog(t, STAMPS[2] + 0.25, STAMPS[2] + 0.75), { alpha: 0.9 * J.alpha, y0: 1115 - 662 - 80, y1: 1115 - 662 + 80, width: 0.1 })
        }
        if (flat) glint(bx, 'p3', J.x, J.y, J.h, J.rz, ease.inOutQuad(prog(t, FOOT.a, FOOT.b)), { alpha: J.alpha, y0: 1735, y1: 1950, width: 0.1 })
      }

      // ── copy
      eb.style.opacity = String(ease.outQuad(prog(t, COPY.eb, COPY.eb + 0.35)) * (1 - ease.inQuad(prog(t, COPY.out, COPY.out + 0.2))))
      eb.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, COPY.eb, COPY.eb + 0.5))) + 'em'
      line.update(t - COPY.line, { out: COPY.out - COPY.line })

      drawGrain(gx, t)
      if (!plate) { gx.globalCompositeOperation = 'destination-in'; gx.drawImage(bgC, 0, 0); gx.globalCompositeOperation = 'source-over' }
    },
  }
}

export const cues = [
  ['whoosh', FORM.a, 0.6, 0.05],                                            // the phone forms
  ['bell', FORM.a + 0.3, 1174.66, 0.02, 1.6, -0.3],
  ['bell', COPY.line, 493.88, 0.045, 2.2, 0],                               // "Said on day one."
  ['bell', COPY.line + 0.12, 739.99, 0.03, 2.0, 0.2],
  ['glitter', SEAL.glint[0], SEAL.glint[1]],
  ['tick', SEAL.press, 0.05], ['bell', SEAL.press + 0.01, 1318.51, 0.025, 1.4, 0],
  ['whoosh', MORPH.a, 0.5, 0.05], ['tick', FLIP.b - 0.04, 0.03], ['bell', FLIP.b - 0.03, 1479.98, 0.024, 1.8, 0],
  ...STAMPS.flatMap(s => [['boom', s + DROP - 0.01, 0.14], ['tick', s + DROP, 0.05], ['tick', s + DROP + 0.02, 0.03]]),
  ['glitter', STAMPS[2] + 0.25, STAMPS[2] + 0.75],
  ['glitter', FOOT.a, FOOT.b], ['bell', FOOT.a + 0.1, 1318.51, 0.02, 1.6, -0.3],
  ['whoosh', EXIT.a, 0.6, 0.04],
]
