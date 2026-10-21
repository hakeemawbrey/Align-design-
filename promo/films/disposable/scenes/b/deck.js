// ─────────────────────────────────────────────── DISPOSABLE part b · WHAT ALIGN IS (19.8–40.2)
// Adapted from ghosted half b (deck.js), slower and bigger for older viewers. One idea on screen at a time.
// Starts on H1 exactly: card-back.png, BODY height 560, centred at (960,540), upright and still, over the sky
// (zoom 1, dim 1, the one moon at 1716,122 r52 phase .12), grain grainOpacity(1). Still until 20.25.
// Ends on H2: only that same sky by 39.8 (card, copy, pockets and twinkles all gone; dim back at 1).
//
// Beat map:
//   19.80–20.25  H1 held still
//   20.25–21.65  the card back rises gently to (960,360, body h 400)
//   20.90 eyebrow "THIS IS ALIGN" · 21.30 "A dating app that takes its time." (typed by ≈23.1, out 26.0)
//   25.20–26.60  four more backs slide out beneath it, one by one → a small deck
//   26.90 eyebrow "TONIGHT'S DECK" · 27.40 "Each night, a few people. / Chosen with care." (typed by ≈29.6, out 32.5)
//   27.00 27.75 28.50 29.25  four cards dealt slowly to a soft arc (1.0 s flights), each turning face-up as it lands
//   30.15–31.05  the last card (Juniper) turns over in place · 31.2–32.2 a soft gold glint along the hand
//   32.70–33.90  the others step back and fade; Juniper's card comes forward to the left (600,540, body h 900), veiled
//   33.60 eyebrow "DEALBREAKERS FIRST" · 33.90 "What matters / is said first." (typed by ≈35.4, out 38.4)
//   34.70 35.70 36.70  dealbreakers stamp onto her photo window, slowly, one at a time (✕ ONE-WORD TEXTS · ✕ READS, NO REPLY
//                · ✕ FLAKY PLANS) · 37.4–38.1 the rest of her card brightens · 37.6 gold glint on her footer
//   38.50–39.60  her card drifts away and fades; the sky is plain H2 from 39.6
import { clamp, lerp, prog, ease, el, C, TypeLine } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, layerCanvas, loadArt, drawCard, cardSpace, glint, pocketCanvas, ART, bodyH, pixStar } from './kit.js'

const T0 = 19.8, T1 = 40.2

// ── H1 pose
const HO = { x: 960, y: 540, h: 560 }

// ── beat 1: what Align is
const RISE = { a: 20.25, b: 21.65 }
const DECK = { x: 960, y: 360, h: 400 }
const FORM = { a: 25.2, step: 0.28, len: 0.6 }          // backs slide out beneath, one by one
const COPY1 = { eb: 20.9, line: 21.3, out: 26.0 }

// ── beat 2: tonight's deck
const SLOT = k => ({ x: 960 + k * 320, y: DECK.y + k * k * 10, rz: k * 2 })
const HAND = [[-1, 'p1'], [1, 'p2'], [-2, 'p6'], [2, 'p4'], [0, 'p3']]
const DEAL = [27.0, 27.75, 28.5, 29.25], FLY = 1.0
const CFLIP = { a: 30.15, b: 31.05 }
const SHINE = { a: 31.2, step: 0.16, len: 0.6 }
const COPY2 = { eb: 26.9, line: 27.4, out: 32.5 }

// ── beat 3: dealbreakers first
const STEP = { a: 32.7, b: 33.9 }
const DB = { x: 600, y: 540, h: 900 }
const COPY3 = { eb: 33.6, line: 33.9, out: 38.4 }
const STAMPS = [34.7, 35.7, 36.7], DROP = 0.45
const CHIPS = ['ONE-WORD TEXTS', 'READS, NO REPLY', 'FLAKY PLANS']
const CHIP_Y = [-680, -487, -294], CHIP_ROT = [-2.0, 1.4, -1.0]        // PNG px from the body centre (photo window)
const VEIL = { in: [33.2, 33.9], out: [37.4, 38.1], k: 0.42 }
const FOOT = { a: 37.6, b: 38.4 }
const EXIT = { a: 38.5, b: 39.6 }

const io = ease.inOutCubic

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await loadArt()
  await document.fonts.load(`44px 'Space Mono'`).catch(() => {})
  await document.fonts.load(`italic 116px 'EB Garamond'`).catch(() => {})

  const pocket1 = pocketCanvas(960, 740, 900, 170, 0.6)
  const pocket2 = pocketCanvas(960, 800, 900, 230, 0.6)
  const pocket3 = pocketCanvas(1360, 520, 620, 300, 0.55)

  // grain over the sky + cards; type sits above it
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── copy (big: eyebrows 44px Space Mono, statements 116px EB Garamond italic)
  const eyebrow = (txt, style) => el('div', { position: 'absolute', fontFamily: MONO, fontSize: '44px', letterSpacing: '0.3em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 16px rgba(11,6,32,0.95)', ...style }, root, txt)
  const stmt = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '116px', lineHeight: '1.08', letterSpacing: '-0.005em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }
  const centred = { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.3em' }
  const eb1 = eyebrow('THIS IS ALIGN', { ...centred, top: '622px' })
  const line1 = new TypeLine(root, 'A dating app that takes its time.', { ...stmt, left: '50%', top: '690px', transform: 'translateX(-50%)', textAlign: 'center' }, { perChar: 0.045, fade: 0.4, accent: [C.violet, C.gold, C.rub] })
  const eb2 = eyebrow("TONIGHT'S DECK", { ...centred, top: '640px' })
  const line2 = new TypeLine(root, 'Each night, a few people.\nChosen with care.', { ...stmt, fontSize: '112px', left: '50%', top: '706px', transform: 'translateX(-50%)', textAlign: 'center' }, { perChar: 0.045, fade: 0.4, accent: [C.violet, C.gold, C.rub] })
  const eb3 = eyebrow('DEALBREAKERS FIRST', { left: '1012px', top: '352px' })
  const line3 = new TypeLine(root, 'What matters\nis said first.', { ...stmt, fontSize: '120px', left: '1004px', top: '420px' }, { perChar: 0.045, fade: 0.4, accent: [C.rub, C.gold, C.violet] })

  // ── chips (drawn in Juniper's card space, PNG px; 108 PNG px ≈ 49 px on screen at body h 900)
  const CHIP_FS = 108, CHIP_LS = '3px'
  const chipW = CHIPS.map(s => { bx.save(); bx.font = `${CHIP_FS}px 'Space Mono', monospace`; bx.letterSpacing = CHIP_LS; const w = bx.measureText(s).width; bx.restore(); return w + 180 })
  function drawChip(i, a, sc) {
    const w = chipW[i], h = 168
    bx.save()
    bx.translate(10, CHIP_Y[i]); bx.rotate(CHIP_ROT[i] * Math.PI / 180); bx.scale(sc, sc)
    bx.globalAlpha = a
    bx.shadowColor = 'rgba(4,2,14,0.8)'; bx.shadowBlur = 30; bx.shadowOffsetY = 10
    bx.fillStyle = 'rgba(16,9,40,0.94)'
    bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    bx.shadowColor = 'transparent'; bx.shadowBlur = 0; bx.shadowOffsetY = 0
    bx.lineWidth = 6; bx.strokeStyle = 'rgba(239,230,214,0.92)'; bx.stroke()
    const mx = -w / 2 + 76
    bx.lineWidth = 11; bx.lineCap = 'round'; bx.strokeStyle = C.bone
    bx.beginPath(); bx.moveTo(mx - 20, -20); bx.lineTo(mx + 20, 20); bx.moveTo(mx + 20, -20); bx.lineTo(mx - 20, 20); bx.stroke()
    bx.font = `${CHIP_FS}px 'Space Mono', monospace`; bx.letterSpacing = CHIP_LS
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText(CHIPS[i], mx + 52, 6)
    bx.restore()
  }
  /** a chip's stamp state: [alpha, scale]. It settles down slowly onto the card (no bounce, no shake). */
  const chipState = (t, i) => {
    const t0 = STAMPS[i]
    if (t < t0) return [0, 1]
    const p = prog(t, t0, t0 + DROP)
    return [ease.inOutQuad(Math.min(1, p * 1.8)), lerp(1.22, 1, ease.outCubic(p))]
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      // plate: dim 1 at H1 → a touch dimmer under cards → 1 again by 39.6 (H2)
      const dim = 1 - 0.12 * ease.inOutQuad(prog(t, 20.3, 21.4)) - 0.05 * ease.inOutQuad(prog(t, 32.7, 33.7)) + 0.17 * ease.inOutQuad(prog(t, 38.6, 39.6))
      const d = clamp(dim)
      sky(bx, t, d)
      twinkles(bx, t)
      gC.style.opacity = String(grainOpacity(d))

      // pockets behind copy
      const pk = (a, b, c, e) => ease.inOutQuad(prog(t, a, b)) * (1 - ease.inOutQuad(prog(t, c, e)))
      bx.globalAlpha = pk(20.7, 21.4, 25.9, 26.6); if (bx.globalAlpha > 0) bx.drawImage(pocket1, 0, 0)
      bx.globalAlpha = pk(26.6, 27.3, 32.4, 33.1); if (bx.globalAlpha > 0) bx.drawImage(pocket2, 0, 0)
      bx.globalAlpha = pk(33.2, 33.9, 38.4, 39.2); if (bx.globalAlpha > 0) bx.drawImage(pocket3, 0, 0)
      bx.globalAlpha = 1

      // ════════ the deck and the hand (until the dealbreakers step)
      const rise = io(prog(t, RISE.a, RISE.b))
      const top = { x: lerp(HO.x, DECK.x, rise), y: lerp(HO.y, DECK.y, rise), h: lerp(HO.h, DECK.h, rise) }
      const shadowIn = ease.inOutQuad(prog(t, 20.25, 20.9))
      const step = k => io(prog(t, STEP.a + Math.abs(k) * 0.08, STEP.b - 0.16 + Math.abs(k) * 0.08))
      if (t < STEP.b + 0.2) {
        const dealtBy = i => io(prog(t, DEAL[i], DEAL[i] + 0.4))
        for (let j = HAND.length - 1; j >= 0; j--) {
          if (j < 4 && t >= DEAL[j]) continue
          if (j === 4 && t >= CFLIP.a) continue
          const grow = j === 0 ? 1 : io(prog(t, FORM.a + (j - 1) * FORM.step, FORM.a + (j - 1) * FORM.step + FORM.len))
          if (j > 0 && grow <= 0) continue
          let depth = j
          for (let i = 0; i < Math.min(j, 4); i++) depth -= dealtBy(i)
          drawCard(bx, 'back', top.x + (j % 2 ? -1 : 1) * depth * 9 * grow, top.y + depth * 11 * grow, top.h, { rz: (j % 2 ? -1 : 1) * depth * 1.6 * grow, alpha: j === 0 ? 1 : grow, shadow: j === 0 ? shadowIn : 0.6 * grow })
        }
        const cards = []
        for (let i = 0; i < 4; i++) {
          if (t < DEAL[i]) continue
          const [k, art] = HAND[i], S = SLOT(k)
          const p = prog(t, DEAL[i], DEAL[i] + FLY), e = io(p)
          let x = lerp(DECK.x, S.x, e), y = lerp(DECK.y, S.y, e) - Math.sin(Math.PI * p) * 50
          let h = DECK.h * (1 + 0.05 * Math.sin(Math.PI * p))
          const ry = 180 * (1 - io(prog(p, 0.2, 1)))
          const rz = lerp(0, S.rz, e) + Math.sin(Math.PI * p) * Math.sign(k) * 3
          const land = prog(t, DEAL[i] + FLY, DEAL[i] + FLY + 0.6)
          y += Math.sin((t - DEAL[i]) * 0.8 + i * 1.7) * 3 * land
          const sb = step(k)
          x += Math.sign(k) * 220 * sb; y += 40 * sb; h *= 1 - 0.12 * sb
          const alpha = 1 - ease.inOutQuad(sb)
          const g = Math.exp(-Math.pow((t - (SHINE.a + (k + 2) * SHINE.step + SHINE.len / 2)) / (SHINE.len / 3), 2))
          cards.push({ art, x, y, h, ry, rz, alpha, flying: p < 1, g })
        }
        cards.sort((a, b) => a.flying - b.flying)
        for (const c of cards) drawCard(bx, c.art, c.x, c.y, c.h, { ry: c.ry, rz: c.rz, alpha: c.alpha, back: 'back', shadow: c.flying ? 0.5 : 1, glow: c.g * 0.45 })
      }

      // ════════ Juniper's card: turns over in place → comes forward for dealbreakers → drifts away
      if (t >= CFLIP.a) {
        const fp = prog(t, CFLIP.a, CFLIP.b)
        const lift = Math.sin(Math.PI * fp) * 20
        let x = DECK.x, y = DECK.y - lift + Math.sin((t - CFLIP.b) * 0.8) * 3 * prog(t, CFLIP.b, CFLIP.b + 0.6), h = DECK.h * (1 + 0.04 * Math.sin(Math.PI * fp)), rz = 0
        const ry = 180 * (1 - io(fp))
        const fw = io(prog(t, STEP.a + 0.1, STEP.b))
        const push = ease.inOutQuad(prog(t, STEP.b, EXIT.b))
        x = lerp(x, DB.x, fw); y = lerp(y, DB.y, fw); h = lerp(h, DB.h * (1 + 0.03 * push), fw); rz = lerp(rz, -1.0, fw)
        const ex = ease.inOutQuad(prog(t, EXIT.a, EXIT.b))
        x -= 140 * ex; y -= 30 * ex; h *= 1 - 0.06 * ex
        const J = { x, y, h, rz, ry, alpha: 1 - ex }
        drawCard(bx, 'p3', J.x, J.y, J.h, { ry: J.ry, rz: J.rz, alpha: J.alpha, back: 'back', glow: 0 })
        // veil: dims the card's details while what matters lands first
        const veil = VEIL.k * ease.inOutQuad(prog(t, VEIL.in[0], VEIL.in[1])) * (1 - ease.inOutQuad(prog(t, VEIL.out[0], VEIL.out[1])))
        const a = ART.p3, bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
        if (veil > 0.003 && J.ry < 0.05) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = veil * J.alpha; bx.fillStyle = '#0b0620'
          bx.beginPath(); bx.roundRect(a.b[0] - bcx + 4, a.b[1] - bcy + 4, a.b[2] - a.b[0] - 8, a.b[3] - a.b[1] - 8, a.r); bx.fill()
          bx.restore()
        }
        // dark cover on the photo window, then the chips stamp onto it
        const cov = ease.inOutQuad(prog(t, STAMPS[0] - 0.5, STAMPS[0] - 0.05))
        if (cov > 0.003 && J.ry < 0.05) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = 0.92 * cov * J.alpha; bx.fillStyle = '#120a24'
          bx.beginPath(); bx.roundRect(218 - bcx - 4, 342 - bcy - 4, 1074 + 8, 572 + 8, 40); bx.fill()
          bx.restore()
        }
        if (t >= STAMPS[0]) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          CHIPS.forEach((_, i) => { const [ca, sc] = chipState(t, i); if (ca > 0.003) drawChip(i, ca * J.alpha, sc) })
          bx.restore()
          // a soft dust of pixels as each one settles
          STAMPS.forEach((s, i) => {
            const q = prog(t, s + DROP * 0.7, s + DROP * 0.7 + 0.8)
            if (q <= 0 || q >= 1) return
            const sc = J.h / bodyH('p3'), ang = J.rz * Math.PI / 180
            const cxp = J.x + (10 * Math.cos(ang) - CHIP_Y[i] * Math.sin(ang)) * sc, cyp = J.y + (10 * Math.sin(ang) + CHIP_Y[i] * Math.cos(ang)) * sc
            bx.imageSmoothingEnabled = false
            for (let dd = 0; dd < 8; dd++) {
              const side = dd % 2 ? 1 : -1, sp = 40 + (dd * 37 % 40)
              const px = cxp + side * (chipW[i] * sc / 2 + ease.outCubic(q) * sp), py = cyp + ((dd * 13) % 30 - 15) * sc * 2 - q * 12
              pixStar(bx, px, py, 3, 2, dd % 3 ? '#efe6d6' : '#ffe2a0', '#fff3e0', (1 - ease.inQuad(q)) * 0.55 * J.alpha)
            }
            bx.imageSmoothingEnabled = true
          })
        }
        // gold glints: along the hand (beat 2) and on her DEALBREAKERS footer (beat 3)
        const gk = prog(t, SHINE.a + 2 * SHINE.step, SHINE.a + 2 * SHINE.step + SHINE.len)
        glint(bx, 'p3', J.x, J.y, J.h, J.rz, gk, { alpha: 0.35, width: 0.08 })
        glint(bx, 'p3', J.x, J.y, J.h, J.rz, ease.inOutQuad(prog(t, FOOT.a, FOOT.b)), { alpha: 0.8 * J.alpha, y0: 1735, y1: 1950, width: 0.1 })
      }

      // ── copy
      const fadeEb = (e, a, out) => {
        e.style.opacity = String(0.92 * ease.inOutQuad(prog(t, a, a + 0.6)) * (1 - ease.inOutQuad(prog(t, out, out + 0.45))))
        e.style.letterSpacing = lerp(0.36, 0.3, ease.outCubic(prog(t, a, a + 0.9))) + 'em'
      }
      fadeEb(eb1, COPY1.eb, COPY1.out); line1.update(t - COPY1.line, { out: COPY1.out - COPY1.line })
      fadeEb(eb2, COPY2.eb, COPY2.out); line2.update(t - COPY2.line, { out: COPY2.out - COPY2.line })
      fadeEb(eb3, COPY3.eb, COPY3.out); line3.update(t - COPY3.line, { out: COPY3.out - COPY3.line })

      drawGrain(gx, t)
    },
  }
}

// ── sound (softer than ghosted)
export const cues = [
  ['whoosh', RISE.a + 0.1, 1.0, 0.03],                                    // the card rises
  ['bell', COPY1.line, 587.33, 0.03, 2.6, 0],                             // "A dating app that takes its time."
  ...[0, 1, 2, 3].map(j => ['tick', FORM.a + j * FORM.step + FORM.len * 0.8, 0.012]),
  ...DEAL.flatMap((dl, i) => [['whoosh', dl, 0.8, 0.03], ['tick', dl + FLY - 0.03, 0.018], ['bell', dl + FLY - 0.02, [880, 987.77, 1108.73, 1318.51][i], 0.012, 1.6, [-0.4, 0.4, -0.6, 0.6][i]]]),
  ['bell', COPY2.line, 493.88, 0.03, 2.6, 0],                             // "Each night, a few people."
  ['whoosh', CFLIP.a, 0.7, 0.03], ['tick', CFLIP.b - 0.05, 0.018],
  ['bell', CFLIP.b - 0.04, 1479.98, 0.016, 2.0, 0],
  ['glitter', SHINE.a, SHINE.a + 4 * SHINE.step + SHINE.len],
  ['whoosh', STEP.a, 1.1, 0.04],                                          // the others step back
  ['bell', COPY3.line, 440, 0.03, 2.6, 0],                                // "What matters is said first."
  ...STAMPS.flatMap(s => [['boom', s + DROP * 0.7, 0.07], ['tick', s + DROP * 0.7, 0.025]]),
  ['glitter', FOOT.a, FOOT.b],
  ['bell', FOOT.a + 0.1, 1318.51, 0.012, 1.8, -0.3],
  ['whoosh', EXIT.a, 1.0, 0.03],
]
