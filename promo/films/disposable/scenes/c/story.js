// ─────────────────────────────────────────────── DISPOSABLE part c · FACE LAST → BOTH CHOOSE → the match (39.8–53.95)
// Starts on H2 exactly: the sky alone (moon 1716,122 r52 phase .12, grain .5, dim 1), nothing else on screen 39.8–40.2.
// Slow and calm throughout (for older viewers): every move ≥ 0.6 s, eased; no flashes, no shakes; big type.
//
// Beat map (sound):
//   39.80–40.20  H2 held (sky only)
//   40.20–41.30  Juniper's mystery card (card-profile-3: veiled aura window, no face) gathers in, left (590,540 h930)
//   40.30        eyebrow "FACE LAST" · 40.70 "You see who / someone is / before you see / their face." (right column,
//                120px, typed by ≈42.95, held to 45.45: 2.5 s)
//   41.45–41.95  a big "PHOTO HIDDEN" lock chip settles over her window · 42.30–43.70 a slow soft light runs down
//                her words (who she is) · slow push 930 → 965 while the copy holds
//   45.55–46.55  BOTH CHOOSE: her card glides right (1320,400 h500); your card (Hakeem · Taurus) turns in from the left
//   46.20        eyebrow "BOTH CHOOSE" · 46.40 "Nobody gets picked alone." (typed by ≈47.73, held to 50.25)
//   46.85 47.25  "YOU ✓" · "JUNIPER ✓" pills
//   47.50–49.00  seven chakra stars drift in slowly and settle into the column between the cards (red bottom → violet top)
//   49.05        LOCK, gentle: a soft violet-warm glow (no white flash), one slow ring, a few drifting sparks, rims warm
//   49.90–50.60  pills, cards and stars drift apart and fade
//   50.45–51.05  the match phone (screen-match.png, 1700 tall, cropped; small print masked) rises in: "You both aligned."
//                (≈62px on screen, opaque from 50.85, held to 53.40: 2.55 s)
//   53.40–53.75  the phone fades; the plate is back at dim 1 by 53.6 (end.js owns 53.65→)
import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, layerCanvas, loadArt, drawCard, cardSpace, glint, pocketCanvas, ART, bodyH, pixStar } from './kit.js'

const T0 = 39.8, T1 = 53.95

// ── beat 1: face last
const GATHER = { a: 40.2, b: 41.3 }
const FL = { x: 590, y: 540, h: 930 }
const COPY1 = { eb: 40.3, line: 40.7, out: 45.45 }
const CHIP = { a: 41.45, b: 41.95, out: 45.2 }
const WORDS = { a: 42.3, b: 43.7 }

// ── beat 2: both choose
const MOVE = { a: 45.55, b: 46.55 }
const RJ = { x: 1320, y: 400, h: 500 }, LY = { x: 600, y: 400, h: 500 }
const YOU_IN = { a: 45.7, b: 46.65 }
const COPY2 = { eb: 46.2, line: 46.4, out: 50.25 }
const PILL = [46.85, 47.25]
const COL = { x: 960, y: 400, gap: 56 }
const STAR_IN = 47.5, STAR_STEP = 0.1, STAR_FLY = 0.95
const LOCK = 49.05
const EXIT = { a: 49.9, b: 50.6 }
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const STAR_FROM = [[330, 940], [1600, 880], [180, 560], [1760, 600], [440, 110], [1480, 90], [960, -40]]
const ORDER = [3, 0, 5, 2, 6, 1, 4]

// ── beat 3: the match phone
const PHONE = { a: 50.45, b: 51.05, out: 53.4, gone: 53.75 }
const PH_H = 1700, PH_W = Math.round(PH_H * 1170 / 2532), PH_TOP = -490

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await loadArt()
  await document.fonts.load(`44px 'Space Mono'`).catch(() => {})

  const pocket1 = pocketCanvas(1330, 600, 640, 400, 0.55)
  const pocket2 = pocketCanvas(960, 890, 860, 190, 0.6)

  // the match phone (DOM, above the sky canvas, below the grain)
  const phone = el('div', { position: 'absolute', left: (960 - PH_W / 2) + 'px', top: PH_TOP + 'px', width: PH_W + 'px', height: PH_H + 'px', opacity: 0, willChange: 'transform, opacity', transformOrigin: '50% 60%' }, root)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '84px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(180,92,255,0.2), 0 0 0 2px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-match.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  // hide the screen's small print (labels, body copy, footer) so only the auras, the headline and the button remain
  for (const [a, b] of [[0.532, 0.626], [0.684, 0.792], [0.912, 0.975]]) {
    const y0 = a * PH_H, y1 = b * PH_H, f = 26
    el('div', { position: 'absolute', left: 0, width: '100%', top: (y0 - f) + 'px', height: (y1 - y0 + 2 * f) + 'px',
      background: `linear-gradient(180deg, rgba(11,6,32,0) 0px, rgba(11,6,32,0.97) ${f}px, rgba(11,6,32,0.97) calc(100% - ${f}px), rgba(11,6,32,0) 100%)` }, scr)
  }

  // grain over the sky + cards + phone; type sits above it
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── copy
  const eyebrow = (txt, style) => el('div', { position: 'absolute', fontFamily: MONO, fontSize: '44px', letterSpacing: '0.3em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 16px rgba(11,6,32,0.95)', ...style }, root, txt)
  const stmt = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '120px', lineHeight: '1.06', letterSpacing: '-0.005em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }
  const eb1 = eyebrow('FACE LAST', { left: '1000px', top: '262px' })
  const line1 = new TypeLine(root, 'You see who\nsomeone is\nbefore you see\ntheir face.', { ...stmt, left: '992px', top: '336px' }, { perChar: 0.04, fade: 0.26, accent: [C.violet, C.gold, C.rub] })
  const eb2 = eyebrow('BOTH CHOOSE', { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.3em', top: '772px' })
  const line2 = new TypeLine(root, 'Nobody gets picked alone.', { ...stmt, left: '50%', top: '838px', transform: 'translateX(-50%)' }, { perChar: 0.045, fade: 0.26, accent: [C.violet, C.gold, C.rub] })

  // ── the "PHOTO HIDDEN" lock chip (Juniper's card space, PNG px; ≈ 45px on screen at the face-last pose)
  const CH_FS = 96, CH_Y = -300, CH_X = 8
  bx.save(); bx.font = `${CH_FS}px 'Space Mono', monospace`; bx.letterSpacing = '8px'
  const chipW = bx.measureText('PHOTO HIDDEN').width + 300; bx.restore()
  function drawChip(a, sc) {
    const w = chipW, h = 170
    bx.save()
    bx.translate(CH_X, CH_Y); bx.scale(sc, sc); bx.globalAlpha = a
    bx.shadowColor = 'rgba(4,2,14,0.8)'; bx.shadowBlur = 40; bx.shadowOffsetY = 10
    bx.fillStyle = 'rgba(16,9,40,0.9)'
    bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    bx.shadowColor = 'transparent'; bx.shadowBlur = 0; bx.shadowOffsetY = 0
    bx.lineWidth = 5; bx.strokeStyle = 'rgba(239,230,214,0.9)'; bx.stroke()
    // padlock
    const lx = -w / 2 + 100
    bx.fillStyle = C.bone; bx.strokeStyle = C.bone; bx.lineWidth = 11
    bx.beginPath(); bx.roundRect(lx - 30, -10, 60, 48, 8); bx.fill()
    bx.beginPath(); bx.arc(lx, -12, 20, Math.PI, 0); bx.stroke()
    bx.fillStyle = 'rgba(16,9,40,1)'; bx.beginPath(); bx.arc(lx, 10, 7, 0, Math.PI * 2); bx.fill()
    bx.font = `${CH_FS}px 'Space Mono', monospace`; bx.letterSpacing = '8px'
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText('PHOTO HIDDEN', lx + 62, 6)
    bx.restore()
  }

  // ── pills under the cards (screen px, 36px type)
  function drawPill(x, y, label, t0, t, alpha) {
    const p = prog(t, t0, t0 + 0.45)
    if (p <= 0 || alpha <= 0.003) return
    const e = ease.outCubic(p)
    bx.save()
    bx.font = `44px 'Space Mono', monospace`; bx.letterSpacing = '5px'
    const w = bx.measureText(label).width + 140, h = 84
    bx.translate(x, y + lerp(10, 0, e))
    bx.globalAlpha = alpha * ease.inOutQuad(p)
    bx.fillStyle = 'rgba(16,9,40,0.9)'; bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    const lit = tw(t, [[t0 + 0.1, 0], [t0 + 0.4, 1, ease.inOutQuad], [t0 + 1.4, 0, ease.inOutQuad]])
    bx.lineWidth = 2.5; bx.strokeStyle = 'rgba(239,230,214,0.85)'; bx.stroke()
    if (lit > 0.01) { bx.shadowColor = `rgba(255,226,160,${0.7 * lit})`; bx.shadowBlur = 16; bx.strokeStyle = `rgba(255,226,160,${0.8 * lit})`; bx.stroke(); bx.shadowBlur = 0; bx.shadowColor = 'transparent' }
    const cx0 = -w / 2 + 44, dk = ease.inOutQuad(prog(t, t0 + 0.15, t0 + 0.55))
    bx.lineWidth = 5; bx.lineCap = 'round'; bx.lineJoin = 'round'; bx.strokeStyle = C.bone
    bx.beginPath(); bx.moveTo(cx0 - 11, 0)
    const k1 = Math.min(1, dk * 2), k2 = clamp(dk * 2 - 1)
    bx.lineTo(cx0 - 11 + 9 * k1, 10 * k1)
    if (k2 > 0) bx.lineTo(cx0 - 2 + 16 * k2, 10 - 22 * k2)
    bx.stroke()
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText(label, cx0 + 32, 3)
    bx.restore()
  }

  // ── a few slow sparks at the lock
  const br = rng(4242)
  const SPARK = Array.from({ length: 14 }, (_, i) => ({ ang: (i / 14) * Math.PI * 2 + br() * 0.3, sp: 90 + br() * 90, col: i % 3 === 0 ? '#f2c75c' : CHK[Math.floor(br() * 7)], life: 1.1 + br() * 0.6, delay: br() * 0.2 }))

  return {
    start: T0, end: T1, root,
    update(t) {
      // plate: H2 (dim 1) → a touch dimmer under the cards and the phone → back to 1 for the end
      const dim = 1 - 0.14 * ease.inOutQuad(prog(t, 40.25, 41.2)) - 0.08 * ease.inOutQuad(prog(t, 50.2, 50.9)) + 0.22 * ease.inOutQuad(prog(t, 53.0, 53.6))
      sky(bx, t, Math.min(1, dim))
      twinkles(bx, t)
      gC.style.opacity = String(grainOpacity(Math.min(1, dim)))

      const pk = (a, b, c, d) => ease.inOutQuad(prog(t, a, b)) * (1 - ease.inOutQuad(prog(t, c, d)))
      bx.globalAlpha = pk(40.4, 41.0, COPY1.out, COPY1.out + 0.5); if (bx.globalAlpha > 0) bx.drawImage(pocket1, 0, 0)
      bx.globalAlpha = pk(46.0, 46.6, COPY2.out, COPY2.out + 0.5); if (bx.globalAlpha > 0) bx.drawImage(pocket2, 0, 0)
      bx.globalAlpha = 1

      // ════════ Juniper's card
      let J = null
      if (t >= GATHER.a && t < EXIT.b + 0.05) {
        const g = ease.inOutCubic(prog(t, GATHER.a, GATHER.b))
        const push = ease.inOutQuad(prog(t, GATHER.b, MOVE.a))
        let x = FL.x, y = FL.y + lerp(26, 0, g), h = FL.h * lerp(0.95, 1, g) * (1 + 0.038 * push), rz = lerp(1.2, -0.6, g)
        y += Math.sin((t - GATHER.a) * 0.9) * 3 * g
        const mv = ease.inOutCubic(prog(t, MOVE.a, MOVE.b))
        const bob = Math.sin((t - MOVE.b) * 1.0) * 4 * prog(t, MOVE.b, MOVE.b + 0.8)
        x = lerp(x, RJ.x, mv); y = lerp(y, RJ.y + bob, mv); h = lerp(h, RJ.h, mv); rz = lerp(rz, -1.5, mv)
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        x += 70 * ex; y -= 16 * ex
        J = { x, y, h, rz, alpha: ease.inOutQuad(prog(t, GATHER.a, GATHER.a + 0.8)) * (1 - ease.inOutQuad(ex)) }
      }
      // your card (Hakeem · Taurus) turns in from the left
      let Y = null
      if (t >= YOU_IN.a && t < EXIT.b + 0.05) {
        const p = ease.inOutCubic(prog(t, YOU_IN.a, YOU_IN.b))
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        const bob = Math.sin((t - YOU_IN.b) * 1.0 + 2) * 4 * prog(t, YOU_IN.b, YOU_IN.b + 0.8)
        Y = { x: lerp(-200, LY.x, p) - 70 * ex, y: lerp(440, LY.y, p) + bob - 16 * ex, h: LY.h, ry: lerp(38, 0, p), rz: lerp(-5, 1.5, p),
          alpha: ease.inOutQuad(prog(t, YOU_IN.a, YOU_IN.a + 0.5)) * (1 - ease.inOutQuad(ex)) }
      }
      // the lock: a slow warm swell, no flash
      const lockK = tw(t, [[LOCK - 0.1, 0], [LOCK + 0.35, 1, ease.inOutQuad], [LOCK + 1.3, 0.3, ease.inOutQuad]])
      if (Y) drawCard(bx, 'sign', Y.x, Y.y, Y.h, { ry: Y.ry, rz: Y.rz, alpha: Y.alpha, glow: lockK * 0.42, rim: '200,255,190' })
      if (J) {
        drawCard(bx, 'p3', J.x, J.y, J.h, { rz: J.rz, alpha: J.alpha, glow: lockK * 0.42, rim: '255,170,240' })
        // the lock chip over her photo window
        const ca = ease.inOutQuad(prog(t, CHIP.a, CHIP.b)) * (1 - ease.inOutQuad(prog(t, CHIP.out, CHIP.out + 0.45)))
        if (ca > 0.003) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          drawChip(ca * J.alpha, lerp(1.06, 1, ease.outCubic(prog(t, CHIP.a, CHIP.b))))
          bx.restore()
        }
        // who she is: a slow warm light down her words
        const wk = prog(t, WORDS.a, WORDS.b)
        if (wk > 0 && wk < 1) {
          const a = ART.p3, bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
          const y0 = 930 - bcy, y1 = 1960 - bcy, cy = lerp(y0 - 120, y1 + 120, ease.inOutQuad(wk))
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.beginPath(); bx.rect(a.b[0] - bcx + 10, y0, a.b[2] - a.b[0] - 20, y1 - y0); bx.clip()
          const g = bx.createLinearGradient(0, cy - 150, 0, cy + 150)
          g.addColorStop(0, 'rgba(255,226,190,0)'); g.addColorStop(0.5, `rgba(255,226,190,${0.13 * J.alpha})`); g.addColorStop(1, 'rgba(255,226,190,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(a.b[0] - bcx, cy - 150, a.b[2] - a.b[0], 300)
          bx.restore()
        }
      }
      // pills
      if (Y && J) {
        const pa = 1 - ease.inOutQuad(prog(t, EXIT.a - 0.05, EXIT.a + 0.35))
        drawPill(Y.x, LY.y + LY.h / 2 + 52, 'YOU', PILL[0], t, pa * Y.alpha)
        drawPill(J.x, RJ.y + RJ.h / 2 + 52, 'JUNIPER', PILL[1], t, pa * J.alpha)
      }

      // ════════ the chakra stars: drift in, settle into the column, LOCK (gently)
      if (t >= STAR_IN && t < EXIT.b + 0.05) {
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        bx.save()
        for (let i = 0; i < 7; i++) {
          const t0 = STAR_IN + ORDER[i] * STAR_STEP
          const p = prog(t, t0, t0 + STAR_FLY)
          if (p <= 0) continue
          const e = ease.inOutCubic(p)
          const [fx, fy] = STAR_FROM[i]
          const tx = COL.x, ty = COL.y + 3 * COL.gap - i * COL.gap
          const mx = lerp(fx, tx, 0.5) + (fy - ty) * 0.22, my = lerp(fy, ty, 0.5) - (fx - tx) * 0.1
          const bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c
          const x = bz(fx, mx, tx, e), y = bz(fy, my, ty, e) - ex * 30 * (1 + i * 0.15)
          const alpha = ease.inOutQuad(Math.min(1, p * 2.5)) * (1 - ex)
          if (p < 1) {
            const e2 = ease.inOutCubic(Math.max(0, p - 0.12))
            const x2 = bz(fx, mx, tx, e2), y2 = bz(fy, my, ty, e2)
            const lg = bx.createLinearGradient(x2, y2, x, y)
            lg.addColorStop(0, CHK[i] + '00'); lg.addColorStop(1, CHK[i])
            bx.globalAlpha = alpha * 0.55; bx.strokeStyle = lg; bx.lineWidth = 3; bx.lineCap = 'round'
            bx.beginPath(); bx.moveTo(x2, y2); bx.lineTo(x, y); bx.stroke()
          }
          const settle = Math.exp(-Math.pow((t - (t0 + STAR_FLY)) / 0.18, 2))
          const breathe = 1 + 0.06 * Math.sin((t - LOCK) * 2.0 - i * 0.5) * prog(t, LOCK, LOCK + 0.6)
          const R = (24 + 6 * settle + 8 * lockK) * breathe
          const g = bx.createRadialGradient(x, y, 0, x, y, R)
          g.addColorStop(0, CHK[i] + 'dd'); g.addColorStop(0.45, CHK[i] + '55'); g.addColorStop(1, CHK[i] + '00')
          bx.globalCompositeOperation = 'lighter'
          bx.globalAlpha = alpha; bx.fillStyle = g; bx.beginPath(); bx.arc(x, y, R, 0, Math.PI * 2); bx.fill()
          bx.globalCompositeOperation = 'source-over'
          const cg = bx.createRadialGradient(x - 2, y - 2, 0, x, y, 8)
          cg.addColorStop(0, '#fff6ea'); cg.addColorStop(0.45, CHK[i]); cg.addColorStop(1, CHK[i])
          bx.globalAlpha = alpha; bx.fillStyle = cg; bx.beginPath(); bx.arc(x, y, 7.5, 0, Math.PI * 2); bx.fill()
        }
        bx.restore()
        // thin column line
        const colA = ease.inOutQuad(prog(t, LOCK - 0.25, LOCK + 0.35)) * (1 - ex)
        if (colA > 0.003) {
          const lg = bx.createLinearGradient(0, COL.y - 4 * COL.gap, 0, COL.y + 4 * COL.gap)
          lg.addColorStop(0, 'rgba(255,240,214,0)'); lg.addColorStop(0.5, 'rgba(255,240,214,0.45)'); lg.addColorStop(1, 'rgba(255,240,214,0)')
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = colA * (0.6 + 0.4 * lockK)
          bx.fillStyle = lg; bx.fillRect(COL.x - 1.5, COL.y - 4 * COL.gap, 3, 8 * COL.gap)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
        // soft glow (violet + warm, capped low; never white)
        const gl = lockK * (1 - ex)
        if (gl > 0.003) {
          const g = bx.createRadialGradient(COL.x, COL.y, 0, COL.x, COL.y, 460)
          g.addColorStop(0, `rgba(255,214,170,${0.16 * gl})`); g.addColorStop(0.35, `rgba(190,150,255,${0.1 * gl})`); g.addColorStop(1, 'rgba(160,120,255,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(COL.x - 460, COL.y - 460, 920, 920)
          bx.globalCompositeOperation = 'source-over'
        }
        // one slow ring
        const rp = prog(t, LOCK, LOCK + 1.4)
        if (rp > 0 && rp < 1) {
          bx.save(); bx.globalAlpha = 0.38 * Math.sin(Math.PI * Math.min(1, rp * 1.6)) * (1 - rp); bx.strokeStyle = 'rgba(255,236,210,1)'; bx.lineWidth = 2
          bx.shadowColor = 'rgba(255,226,160,0.7)'; bx.shadowBlur = 14
          bx.beginPath(); bx.arc(COL.x, COL.y, lerp(60, 230, ease.outCubic(rp)), 0, Math.PI * 2); bx.stroke(); bx.restore()
        }
        // a few sparks drifting out
        bx.imageSmoothingEnabled = false
        for (const s of SPARK) {
          const q = prog(t, LOCK + s.delay, LOCK + s.delay + s.life)
          if (q <= 0 || q >= 1) continue
          const d = 40 + s.sp * ease.outCubic(q)
          pixStar(bx, COL.x + Math.cos(s.ang) * d * 1.3, COL.y + Math.sin(s.ang) * d * 0.9, 3, 2, s.col, '#fff3e0', 0.75 * Math.sin(Math.PI * q) * (1 - ex))
        }
        bx.imageSmoothingEnabled = true
      }

      // ════════ the match phone
      const pin = ease.inOutCubic(prog(t, PHONE.a, PHONE.b))
      const pout = ease.inOutQuad(prog(t, PHONE.out, PHONE.gone))
      const pa = ease.inOutQuad(prog(t, PHONE.a, PHONE.a + 0.45)) * (1 - pout)
      phone.style.display = pa > 0.002 ? 'block' : 'none'
      if (pa > 0.002) {
        const hold = prog(t, PHONE.b, PHONE.out)
        phone.style.opacity = String(pa)
        phone.style.transform = `translateY(${lerp(150, 0, pin) - 30 * pout}px) scale(${(1 + 0.02 * hold) * (1 - 0.015 * pout)})`
      }

      // ── copy
      const fadeEb = (e, a, out) => { e.style.opacity = String(0.92 * ease.inOutQuad(prog(t, a, a + 0.5)) * (1 - ease.inOutQuad(prog(t, out, out + 0.3)))); e.style.letterSpacing = lerp(0.38, 0.3, ease.outCubic(prog(t, a, a + 0.8))) + 'em' }
      fadeEb(eb1, COPY1.eb, COPY1.out); line1.update(t - COPY1.line, { out: COPY1.out - COPY1.line })
      fadeEb(eb2, COPY2.eb, COPY2.out); line2.update(t - COPY2.line, { out: COPY2.out - COPY2.line })

      drawGrain(gx, t)
    },
  }
}

// ── sound (softer than ghosted)
export const cues = [
  ['whoosh', GATHER.a + 0.05, 1.0, 0.03],                                  // the mystery card gathers in
  ['bell', GATHER.a + 0.5, 1318.51, 0.014, 2.0, -0.3],
  ['bell', COPY1.line, 493.88, 0.03, 2.4, 0],                              // "You see who someone is…"
  ['tick', CHIP.a + 0.3, 0.018], ['bell', CHIP.a + 0.32, 880, 0.014, 1.6, -0.2],   // PHOTO HIDDEN
  ['glitter', WORDS.a + 0.2, WORDS.b - 0.2],
  ['whoosh', MOVE.a, 1.0, 0.035],                                          // her card glides right
  ['whoosh', YOU_IN.a + 0.1, 0.9, 0.03],                                   // yours turns in
  ['bell', COPY2.line, 587.33, 0.03, 2.4, 0],                              // "Nobody gets picked alone."
  ...PILL.map((p) => ['tick', p + 0.3, 0.02]),
  ...PILL.map((p, i) => ['bell', p + 0.32, [739.99, 880][i], 0.02, 1.8, i ? 0.35 : -0.35]),
  ['riser', STAR_IN - 0.1, LOCK, 0.035],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['tick', STAR_IN + ORDER[i] * STAR_STEP + STAR_FLY, 0.01]),
  ['boom', LOCK, 0.09],                                                     // LOCK (modest)
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', LOCK + i * 0.05, f, 0.024, 2.8, (i - 3) * 0.1]),
  ['glitter', LOCK + 0.05, LOCK + 0.9],
  ['whoosh', EXIT.a, 0.9, 0.028],
  ['whoosh', PHONE.a, 0.9, 0.032],                                          // the match phone rises
  ['bell', PHONE.b - 0.2, 739.99, 0.024, 2.4, 0], ['bell', PHONE.b - 0.1, 1108.73, 0.014, 2.0, 0.2],
  ['whoosh', PHONE.out, 0.7, 0.022],
]
