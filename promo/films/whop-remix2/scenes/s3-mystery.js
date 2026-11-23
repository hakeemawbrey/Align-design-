// S3 · Juniper's mystery card. The pixel mound resolves onto it (big, flat, centred); the camera eases back while the
// card turns slowly in 3D, a gold-foil sweep crosses it, and "No photos until you both align." comes in beside it.
// Then the camera pushes into the card and the deck (S4) is dealt underneath.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { W, H, VERT, fill, spaceBackdrop } from '../../../src/scenes/common.js'
import { U, G, bodyH, face, foil, foilAt, sweep, caption, capIn, twinkles } from './kit.js'

export const S3 = { start: 6.9, end: 10.6 }
const g = G.mystery
// pose 0 (first frame, what the mound resolves to) and the settled pose
const H0 = VERT ? 1560 : 940, H1 = VERT ? 1000 : 700
const P0 = { x: W / 2, y: H / 2 }, P1 = VERT ? { x: W / 2, y: H * 0.39 } : { x: W * 0.33, y: H / 2 }
const BG_TOP = '#0b0620', BG_BOT = '#1c0d3a'

export function sceneMystery(stage) {
  const root = fill(stage, { background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOT} 100%)` })
  const bg = spaceBackdrop(root, 'rose', { seed: 3, grain: 0.18, stars: 170 })
  const cw = H0 * (g.b[2] - g.b[0]) / (g.b[3] - g.b[1]), ch = bodyH(g, cw)
  const cam = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, perspective: 2600 * U + 'px' }, root)
  const body = el('div', { position: 'absolute', left: -cw / 2 + 'px', top: -ch / 2 + 'px', width: cw + 'px', height: ch + 'px', transformStyle: 'preserve-3d' }, cam)
  const glow = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${70 * U}px ${10 * U}px rgba(214,170,255,0.30), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)` }, body)
  const f = face(body, g, cw)
  const gold = foil(f.face)
  const cap = caption(root, 'Tonight’s mystery card', VERT ? 'No photos until<br>you both align.' : 'No photos<br>until you<br>both align.',
    VERT ? { left: 0, width: W + 'px', top: (P1.y + H1 / 2 + 70) + 'px', textAlign: 'center' } : { left: W * 0.6 + 'px', top: (H / 2 - 150) + 'px', textAlign: 'left' })
  const S = (k) => k * H1 / H0

  /** the first frame, for the mound's mosaic (same background tones, the card flat at pose 0) */
  function paint(ctx) {
    const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, BG_TOP); gr.addColorStop(1, BG_BOT)
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H)
    const k = cw / (g.b[2] - g.b[0])
    ctx.save(); ctx.beginPath(); ctx.roundRect(P0.x - cw / 2, P0.y - ch / 2, cw, ch, g.r * cw); ctx.clip()
    ctx.drawImage(f.im, P0.x - cw / 2 - g.b[0] * k, P0.y - ch / 2 - g.b[1] * k, g.iw * k, g.ih * k)
    ctx.restore()
  }

  return {
    start: S3.start, end: S3.end, root, paint,
    update(t) {
      root.style.zIndex = '23'
      bg.update(t)
      bg.root.style.opacity = String(ease.inOutQuad(prog(t, S3.start, S3.start + 0.5)))
      const lt = t - S3.start
      const back = ease.inOutCubic(prog(lt, 0.1, 1.9))                  // pull back to the settled pose
      const push = ease.inCubic(prog(t, S3.end - 0.6, S3.end))           // exit: push into the card
      const sc = lerp(1, S(1), back) * (1 + 0.04 * prog(lt, 1.9, 3.1)) * (1 + 0.9 * push)
      const x = lerp(P0.x, P1.x, back), y = lerp(P0.y, P1.y, back)
      cam.style.transform = `translate(${x}px, ${y}px) scale(${sc})`
      const ry = lerp(0, -16, back) + 26 * ease.inOutQuad(prog(lt, 1.4, 3.6)) * back
      const rx = (4 * Math.sin(lt * 0.8) - 2) * back, rz = (-2 + 1.5 * Math.sin(lt * 0.6)) * back
      body.style.transform = `translateY(${-12 * Math.sin(lt * 0.9) * back}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg)`
      glow.style.opacity = String(back)
      sweep(f.glint, cw, prog(lt, 0.9, 2.3))
      foilAt(gold, prog(lt, 1.7, 2.6))
      capIn(cap, t, S3.start + 1.25, S3.end - 0.25, VERT ? 0 : 40)
      root.style.opacity = String(1 - ease.inOutQuad(prog(t, S3.end - 0.42, S3.end - 0.08)))   // gone before the deck's first card is fully in (no double exposure)
      root.style.filter = push > 0.01 ? `blur(${14 * push}px)` : 'none'
    },
    fx(ctx, t) {
      const back = ease.inOutCubic(prog(t - S3.start, 0.1, 1.9))
      if (back < 0.9) return
      const cwp = H1 * 0.627
      twinkles(ctx, t, S3.start + 1.8, S3.end - 0.5, [P1.x - H1 * 0.55, P1.y - H1 * 0.6, H1 * 1.1, H1 * 1.2], 61, 18, undefined, [P1.x - cwp / 2 - 30, P1.y - H1 / 2 - 30, cwp + 60, H1 + 60])
    },
  }
}
