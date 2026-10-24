// ─────────────────────────────────────────────── GHOSTED half b · THE ANSWER (15.0–26.7)
// Starts on H exactly: the Align card back (card-back.png, BODY height 560) centred at (960,540), upright, still,
// over the shared sky with the one moon (1716,122 r52 phase .12), grain 0.5. Cuts in opaque at 15.0 (same frame).
//
// Beat map (sound):
//   15.00–15.20  H held still
//   15.20–15.85  TONIGHT'S DECK: the card back settles up to (960,400) and four more backs slide out beneath it → a deck
//   15.95 16.30 16.65 17.00   four cards dealt with care to a soft arc (slots −1 +1 −2 +2), each turning face-up as it
//                lands (veiled profile cards: Maya, Rio, Kai, Ari; no faces) · landing ticks at +0.55
//   17.40–17.85  the last card (Juniper) turns over in place, centre · 18.05–18.75 a gold glint runs along the hand
//   16.10 eyebrow "TONIGHT'S DECK" · 16.35 "A few cards. Dealt with care." (typed by ≈17.4, out 19.05)
//   19.15–19.95  the others step back; Juniper's card comes forward to the left (620,540, body h 900), dimmed a touch
//   19.85 eyebrow "DEALBREAKERS FIRST" · 20.00 "What matters, / said first." (right column, typed by ≈20.95, out 22.95)
//   20.25 20.60 20.95  dealbreaker chips STAMP onto her photo window, darkened first (ONE-WORD TEXTS · READS, NO REPLY · FLAKY PLANS):
//                thud + 2-frame shake each · 21.30–21.70 the rest of her card brightens · 21.55 gold glint on her footer
//   23.00–23.75  MUTUAL: her card moves right (1330,420 h520, chips ride with it); your card (Hakeem · Taurus) turns in
//                from the left to (590,420 h520)
//   24.05 "YOU ✓" pill · 24.45 "JUNIPER ✓" pill (each a tick) · 24.00 eyebrow "MUTUAL" · 24.20 "Nobody gets picked alone."
//                (typed by ≈25.1, out 26.15)
//   24.45–25.05  seven chakra stars streak in and click into the column between the cards (red bottom → violet top)
//   25.10        LOCK: soft flash (cap .4), ring, pixel burst, 3-frame shake, both rims light
//   26.10–26.55  everything drifts apart and fades; the plate is back at dim 1 by 26.6 (end.js owns 26.45→)
import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, layerCanvas, loadArt, drawCard, cardSpace, glint, pocketCanvas, ART, bodyH, pixStar } from './kit.js'

const T0 = 15.0, T1 = 26.7

// ── H pose: card-back.png with its BODY 560 tall, body centred at (960,540) (matches half a's H_CARD)
const HO = { x: 960, y: 540, h: 560 }

// ── beat 1: the deck and the deal
const DECK = { x: 960, y: 400, h: 330 }
const FORM = { a: 15.2, b: 15.85 }
const SLOT = k => ({ x: 960 + k * 300, y: 400 + k * k * 8, rz: k * 2.2 })
// deal order: top card first. [slot, face art]
const HAND = [[-1, 'p1'], [1, 'p2'], [-2, 'p6'], [2, 'p4'], [0, 'p3']]
const DEAL = [15.95, 16.3, 16.65, 17.0], FLY = 0.6
const CFLIP = { a: 17.4, b: 17.85 }
const SHINE = { a: 18.05, step: 0.12, len: 0.42 }
const COPY1 = { eb: 16.1, line: 16.35, out: 19.05 }

// ── beat 2: dealbreakers first
const STEP = { a: 19.15, b: 19.95 }
const DB = { x: 620, y: 540, h: 900 }
const COPY2 = { eb: 19.85, line: 20.0, out: 22.95 }
const STAMPS = [20.25, 20.6, 20.95], DROP = 0.11
const CHIPS = ['ONE-WORD TEXTS', 'READS, NO REPLY', 'FLAKY PLANS']
const CHIP_Y = [-662, -487, -312], CHIP_ROT = [-2.4, 1.6, -1.2]       // PNG px from the body centre (photo window)
const VEIL = { in: [19.4, 19.95], out: [21.3, 21.7], k: 0.42 }
const FOOT = { a: 21.55, b: 22.15 }

// ── beat 3: mutual
const MUT = { a: 23.0, b: 23.75 }
const RJ = { x: 1330, y: 420, h: 520 }, LY = { x: 590, y: 420, h: 520 }
const YOU_IN = { a: 23.15, b: 23.9 }
const PILL = [24.05, 24.45]
const COPY3 = { eb: 23.95, line: 24.1, out: 26.1 }
const COL = { x: 960, y: 420, gap: 58 }
const STAR_IN = 24.45, STAR_STEP = 0.06, STAR_FLY = 0.42
const LOCK = 25.1
const EXIT = { a: 26.05, b: 26.45 }
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const STAR_FROM = [[300, 980], [1640, 900], [150, 520], [1780, 560], [420, 90], [1500, 60], [960, -40]]

const shakeAt = (t, t0, amp) => {
  const f = Math.round((t - t0) * 30)
  return f >= 0 && f < 3 ? [[1, -1], [-1, 0.6], [0.5, 0.4]][f].map(v => v * amp * (1 - f / 3)) : [0, 0]
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await loadArt()
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})
  const spriteS = getSky().spriteS

  const pocket1 = pocketCanvas(960, 830, 820, 190, 0.6)
  const pocket2 = pocketCanvas(1320, 520, 640, 340, 0.55)
  const pocket3 = pocketCanvas(960, 860, 820, 170, 0.6)

  // grain over the sky + cards; type sits above it
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── copy
  const eyebrow = (txt, style) => el('div', { position: 'absolute', fontFamily: MONO, fontSize: '36px', letterSpacing: '0.32em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)', ...style }, root, txt)
  const stmt = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '96px', lineHeight: '1.1', letterSpacing: '-0.005em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }
  const eb1 = eyebrow("TONIGHT'S DECK", { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '708px' })
  const line1 = new TypeLine(root, 'A few cards. Dealt with care.', { ...stmt, left: '50%', top: '772px', transform: 'translateX(-50%)' }, { perChar: 0.03, fade: 0.3, accent: [C.violet, C.gold, C.rub] })
  const eb2 = eyebrow('DEALBREAKERS FIRST', { left: '1000px', top: '378px' })
  const line2 = new TypeLine(root, 'What matters,\nsaid first.', { ...stmt, fontSize: '104px', left: '994px', top: '440px' }, { perChar: 0.032, fade: 0.3, accent: [C.rub, C.gold, C.violet] })
  const eb3 = eyebrow('MUTUAL', { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '792px' })
  const line3 = new TypeLine(root, 'Nobody gets picked alone.', { ...stmt, left: '50%', top: '846px', transform: 'translateX(-50%)' }, { perChar: 0.028, fade: 0.26, accent: [C.violet, C.gold, C.rub] })

  // ── chips (drawn in Juniper's card space, PNG px)
  const CHIP_FS = 86
  bx.font = `${CHIP_FS}px 'Space Mono', monospace`
  const chipW = CHIPS.map(s => { bx.save(); bx.font = `${CHIP_FS}px 'Space Mono', monospace`; bx.letterSpacing = '6px'; const w = bx.measureText(s).width; bx.restore(); return w + 160 })
  function drawChip(i, a, sc) {
    const w = chipW[i], h = 150
    bx.save()
    bx.translate(10, CHIP_Y[i]); bx.rotate(CHIP_ROT[i] * Math.PI / 180); bx.scale(sc, sc)
    bx.globalAlpha = a
    bx.shadowColor = 'rgba(4,2,14,0.8)'; bx.shadowBlur = 30; bx.shadowOffsetY = 10
    bx.fillStyle = 'rgba(16,9,40,0.92)'
    bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    bx.shadowColor = 'transparent'; bx.shadowBlur = 0; bx.shadowOffsetY = 0
    bx.lineWidth = 5; bx.strokeStyle = 'rgba(239,230,214,0.92)'; bx.stroke()
    // ✕ mark
    const mx = -w / 2 + 70
    bx.lineWidth = 9; bx.lineCap = 'round'; bx.strokeStyle = C.bone
    bx.beginPath(); bx.moveTo(mx - 17, -17); bx.lineTo(mx + 17, 17); bx.moveTo(mx + 17, -17); bx.lineTo(mx - 17, 17); bx.stroke()
    bx.font = `${CHIP_FS}px 'Space Mono', monospace`; bx.letterSpacing = '6px'
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText(CHIPS[i], mx + 40, 5)
    bx.restore()
  }
  /** a chip's stamp state: [alpha, scale] — falls in big and fast, squashes, settles */
  const chipState = (t, i) => {
    const t0 = STAMPS[i]
    if (t < t0) return [0, 1]
    const p = prog(t, t0, t0 + DROP)
    if (p < 1) return [ease.outQuad(Math.min(1, p * 2.5)), lerp(1.7, 1, ease.inQuad(p))]
    return [1, 1 - 0.05 * Math.sin(Math.PI * prog(t, t0 + DROP, t0 + DROP + 0.16))]
  }

  // ── pills under the cards in the mutual beat (screen px)
  function drawPill(x, y, label, t0, t, alpha) {
    const p = prog(t, t0, t0 + 0.2)
    if (p <= 0 || alpha <= 0.003) return
    const e = ease.outBack(p)
    bx.save()
    bx.font = `26px 'Space Mono', monospace`; bx.letterSpacing = '4px'
    const tw_ = bx.measureText(label).width, w = tw_ + 100, h = 54
    bx.translate(x, y); bx.scale(lerp(0.6, 1, e), lerp(0.6, 1, e))
    bx.globalAlpha = alpha * ease.outQuad(Math.min(1, p * 2))
    bx.fillStyle = 'rgba(16,9,40,0.9)'; bx.beginPath(); bx.roundRect(-w / 2, -h / 2, w, h, h / 2); bx.fill()
    const lit = 1 - prog(t, t0 + 0.05, t0 + 0.6)
    bx.lineWidth = 2; bx.strokeStyle = `rgba(239,230,214,${0.8 + 0.2 * lit})`; bx.stroke()
    if (lit > 0.01) { bx.shadowColor = `rgba(255,226,160,${0.9 * lit})`; bx.shadowBlur = 18; bx.strokeStyle = `rgba(255,226,160,${lit})`; bx.stroke(); bx.shadowBlur = 0; bx.shadowColor = 'transparent' }
    // check
    const cx0 = -w / 2 + 36, dk = ease.outCubic(prog(t, t0 + 0.06, t0 + 0.26))
    bx.lineWidth = 4; bx.lineCap = 'round'; bx.lineJoin = 'round'; bx.strokeStyle = C.bone
    bx.beginPath(); bx.moveTo(cx0 - 9, 0)
    const k1 = Math.min(1, dk * 2), k2 = clamp(dk * 2 - 1)
    bx.lineTo(cx0 - 9 + 7 * k1, 8 * k1)
    if (k2 > 0) bx.lineTo(cx0 - 2 + 13 * k2, 8 - 18 * k2)
    bx.stroke()
    bx.fillStyle = C.bone; bx.textBaseline = 'middle'; bx.textAlign = 'left'
    bx.fillText(label, cx0 + 26, 2)
    bx.restore()
  }

  // ── lock burst particles
  const br = rng(2468)
  const BURST = Array.from({ length: 32 }, (_, i) => {
    const ang = br() * Math.PI * 2, sp = 80 + br() * 130
    return { ang, sp, px: br() < 0.3 ? 5 : 3, col: i % 3 === 0 ? '#f2c75c' : CHK[Math.floor(br() * 7)], life: 0.5 + br() * 0.6, kind: Math.floor(br() * 4) }
  })

  return {
    start: T0, end: T1, root,
    update(t) {
      const fr = Math.round(t * 30)
      // plate: H (dim 1) → a touch dimmer under the cards → back to 1 for the end
      const dim = 1 - 0.22 * ease.inOutQuad(prog(t, 15.3, 16.2)) - 0.08 * ease.inOutQuad(prog(t, 19.2, 19.9)) + 0.3 * ease.inOutQuad(prog(t, 25.9, 26.6))
      sky(bx, t, Math.min(1, dim))
      twinkles(bx, t)
      gC.style.opacity = String(grainOpacity(Math.min(1, dim)))

      // pockets behind copy
      const pk = (a, b, c, d) => ease.inOutQuad(prog(t, a, b)) * (1 - ease.inOutQuad(prog(t, c, d)))
      bx.globalAlpha = pk(15.9, 16.4, 19.05, 19.4); if (bx.globalAlpha > 0) bx.drawImage(pocket1, 0, 0)
      bx.globalAlpha = pk(19.6, 20.1, 22.95, 23.3); if (bx.globalAlpha > 0) bx.drawImage(pocket2, 0, 0)
      bx.globalAlpha = pk(23.8, 24.3, 26.15, 26.5); if (bx.globalAlpha > 0) bx.drawImage(pocket3, 0, 0)
      bx.globalAlpha = 1

      // ════════ beat 1 + 2 (cards of the hand), until the mutual move
      const form = ease.inOutCubic(prog(t, FORM.a, FORM.b))
      const top = { x: lerp(HO.x, DECK.x, form), y: lerp(HO.y, DECK.y, form), h: lerp(HO.h, DECK.h, form) }
      const shadowIn = prog(t, 15.2, 15.5)
      const step = k => ease.inOutCubic(prog(t, STEP.a + Math.abs(k) * 0.06, STEP.b - 0.1 + Math.abs(k) * 0.06))
      if (t < MUT.b + 0.1) {
        // the deck: cards not yet dealt, stacked under the top one (depth eases up as each card leaves)
        const dealtBy = i => ease.inOutCubic(prog(t, DEAL[i], DEAL[i] + 0.3))
        for (let j = HAND.length - 1; j >= 0; j--) {
          if (j < 4 && t >= DEAL[j]) continue                        // already in flight / landed
          let depth = j
          for (let i = 0; i < Math.min(j, 4); i++) depth -= dealtBy(i)
          const grow = j === 0 ? 1 : ease.outCubic(prog(t, FORM.a + 0.1 + j * 0.07, FORM.a + 0.5 + j * 0.07))
          if (j > 0 && grow <= 0) continue
          const off = depth * 6 * grow
          if (j === 4 && t >= CFLIP.a) continue                       // the centre card turns over (below)
          drawCard(bx, 'back', top.x - depth * 1.2 * grow, top.y + off, top.h, { rz: (j % 2 ? -1 : 1) * depth * 0.7 * grow, alpha: j === 0 ? 1 : grow, shadow: j === 0 ? shadowIn : 0.6 * grow })
        }
        // dealt cards: fly from the deck top to their slot, turning face-up; then float
        const cards = []
        for (let i = 0; i < 4; i++) {
          if (t < DEAL[i]) continue
          const [k, art] = HAND[i], S = SLOT(k)
          const p = prog(t, DEAL[i], DEAL[i] + FLY), e = ease.inOutCubic(p)
          let x = lerp(DECK.x, S.x, e), y = lerp(DECK.y, S.y, e) - Math.sin(Math.PI * p) * 70
          let h = DECK.h * (1 + 0.07 * Math.sin(Math.PI * p))
          const ry = 180 * (1 - ease.inOutCubic(prog(p, 0.2, 1)))
          let rz = lerp(0, S.rz, e) + Math.sin(Math.PI * p) * Math.sign(k) * 5
          const land = prog(t, DEAL[i] + FLY, DEAL[i] + FLY + 0.3)
          y += Math.sin(Math.PI * land) * 4 + Math.sin((t - DEAL[i]) * 1.1 + i * 1.7) * 3 * land
          // beat 2: step back and away
          const sb = step(k)
          x += Math.sign(k) * 240 * sb; y += 50 * sb; h *= 1 - 0.15 * sb
          const alpha = 1 - ease.inQuad(sb)
          const g = Math.exp(-Math.pow((t - (SHINE.a + (k + 2) * SHINE.step + SHINE.len / 2)) / (SHINE.len / 3), 2))
          cards.push({ art, x, y, h, ry, rz, alpha, flying: p < 1, g, k })
        }
        cards.sort((a, b) => a.flying - b.flying)
        for (const c of cards) drawCard(bx, c.art, c.x, c.y, c.h, { ry: c.ry, rz: c.rz, alpha: c.alpha, back: 'back', shadow: c.flying ? 0.4 : 1, glow: c.g * 0.55 })
      }

      // ════════ Juniper's card (the centre): turn-over → forward for dealbreakers → right for mutual
      let J = null
      if (t >= CFLIP.a) {
        const fp = prog(t, CFLIP.a, CFLIP.b)
        const lift = Math.sin(Math.PI * fp) * 26
        let x = DECK.x, y = DECK.y - lift + Math.sin((t - CFLIP.b) * 1.0) * 3 * prog(t, CFLIP.b, CFLIP.b + 0.4), h = DECK.h * (1 + 0.05 * Math.sin(Math.PI * fp)), rz = 0
        const ry = 180 * (1 - ease.inOutCubic(fp))
        // forward + left, slow push-in while the chips land
        const fw = ease.inOutCubic(prog(t, STEP.a + 0.05, STEP.b))
        const push = prog(t, STEP.b, MUT.a)
        x = lerp(x, DB.x, fw); y = lerp(y, DB.y, fw); h = lerp(h, DB.h * (1 + 0.035 * push), fw); rz = lerp(rz, -1.2, fw)
        // mutual: to the right, smaller
        const mv = ease.inOutCubic(prog(t, MUT.a, MUT.b))
        x = lerp(x, RJ.x, mv); y = lerp(y, RJ.y + Math.sin((t - MUT.b) * 1.2) * 4 * prog(t, MUT.b, MUT.b + 0.5), mv); h = lerp(h, RJ.h, mv); rz = lerp(rz, -1.5, mv)
        // exit
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        x += 90 * ex; y -= 20 * ex
        // stamp shakes
        let sh = [0, 0]
        for (const s of STAMPS) { const d = shakeAt(t, s + DROP, 7); sh = [sh[0] + d[0], sh[1] + d[1]] }
        const dl = shakeAt(t, LOCK, 5); sh = [sh[0] + dl[0], sh[1] + dl[1]]
        J = { x: x + sh[0], y: y + sh[1], h, rz, ry, alpha: 1 - ease.outQuad(ex) }
      }
      // your card (Hakeem · Taurus) turns in from the left
      let Y = null
      if (t >= YOU_IN.a) {
        const p = ease.outCubic(prog(t, YOU_IN.a, YOU_IN.b))
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        const dl = shakeAt(t, LOCK, 5)
        Y = { x: lerp(-260, LY.x, p) - 90 * ex + dl[0], y: lerp(470, LY.y, p) + Math.sin((t - YOU_IN.b) * 1.2 + 2) * 4 * prog(t, YOU_IN.b, YOU_IN.b + 0.5) - 20 * ex + dl[1], h: LY.h, ry: lerp(40, 0, p), rz: lerp(-6, 1.5, p), alpha: 1 - ease.outQuad(ex) }
      }
      const lockK = tw(t, [[LOCK - 0.02, 0], [LOCK + 0.06, 1, ease.outQuad], [LOCK + 1.0, 0.25, ease.inOutQuad]])
      if (Y) drawCard(bx, 'sign', Y.x, Y.y, Y.h, { ry: Y.ry, rz: Y.rz, alpha: Y.alpha, glow: lockK * 0.9, rim: '200,255,190' })
      if (J) {
        drawCard(bx, 'p3', J.x, J.y, J.h, { ry: J.ry, rz: J.rz, alpha: J.alpha, back: 'back', glow: lockK * 0.9, rim: '255,170,240' })
        // veil: dims the card's details while what matters lands first
        const veil = VEIL.k * ease.inOutQuad(prog(t, VEIL.in[0], VEIL.in[1])) * (1 - ease.inOutQuad(prog(t, VEIL.out[0], VEIL.out[1])))
        if (veil > 0.003 && J.ry < 0.05) {
          const a = ART.p3, bcx = (a.b[0] + a.b[2]) / 2, bcy = (a.b[1] + a.b[3]) / 2
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = veil; bx.fillStyle = '#0b0620'
          bx.beginPath(); bx.roundRect(a.b[0] - bcx + 4, a.b[1] - bcy + 4, a.b[2] - a.b[0] - 8, a.b[3] - a.b[1] - 8, a.r); bx.fill()
          bx.restore()
        }
        // chips (over a dark cover on the photo window, so none of the card's own window labels show through)
        const cov = ease.inOutQuad(prog(t, STAMPS[0] - 0.3, STAMPS[0] - 0.02))
        if (cov > 0.003 && J.ry < 0.05) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          bx.globalAlpha = 0.92 * cov * J.alpha; bx.fillStyle = '#120a24'
          bx.beginPath(); bx.roundRect(218 - 747 - 4, 342 - 1115 - 4, 1074 + 8, 572 + 8, 40); bx.fill()
          bx.restore()
        }
        if (t >= STAMPS[0]) {
          bx.save(); cardSpace(bx, 'p3', J.x, J.y, J.h, J.rz)
          CHIPS.forEach((_, i) => { const [a, sc] = chipState(t, i); if (a > 0.003) drawChip(i, a * J.alpha, sc) })
          bx.restore()
          // dust puff on each landing
          STAMPS.forEach((s, i) => {
            const q = prog(t, s + DROP, s + DROP + 0.45)
            if (q <= 0 || q >= 1) return
            const sc = J.h / bodyH('p3'), ang = J.rz * Math.PI / 180
            const cxp = J.x + (10 * Math.cos(ang) - CHIP_Y[i] * Math.sin(ang)) * sc, cyp = J.y + (10 * Math.sin(ang) + CHIP_Y[i] * Math.cos(ang)) * sc
            bx.imageSmoothingEnabled = false
            for (let d = 0; d < 10; d++) {
              const side = d % 2 ? 1 : -1, sp = 60 + (d * 37 % 50)
              const px = cxp + side * (chipW[i] * sc / 2 + ease.outCubic(q) * sp), py = cyp + ((d * 13) % 30 - 15) * sc * 2 - q * 10
              pixStar(bx, px, py, 3, 2, d % 3 ? '#efe6d6' : '#ffe2a0', '#fff3e0', (1 - q) * 0.8)
            }
            bx.imageSmoothingEnabled = true
          })
        }
        // gold glints: along the hand (beat 1) and on her DEALBREAKERS footer (beat 2)
        const gk = prog(t, SHINE.a + 2 * SHINE.step, SHINE.a + 2 * SHINE.step + SHINE.len)
        glint(bx, 'p3', J.x, J.y, J.h, J.rz, gk, { alpha: 0.45, width: 0.08 })
        glint(bx, 'p3', J.x, J.y, J.h, J.rz, ease.inOutQuad(prog(t, FOOT.a, FOOT.b)), { alpha: 1, y0: 1735, y1: 1950, width: 0.1 })
      }
      // pills
      if (Y && J) {
        const pa = 1 - ease.outQuad(prog(t, EXIT.a, EXIT.b))
        drawPill(Y.x, LY.y + LY.h / 2 + 62, 'YOU', PILL[0], t, pa)
        drawPill(J.x, RJ.y + RJ.h / 2 + 62, 'JUNIPER', PILL[1], t, pa)
      }

      // ════════ the chakra stars: streak in, click into the column, LOCK
      if (t >= STAR_IN) {
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        bx.save()
        for (let i = 0; i < 7; i++) {
          const t0 = STAR_IN + [3, 0, 5, 2, 6, 1, 4][i] * STAR_STEP
          const p = prog(t, t0, t0 + STAR_FLY)
          if (p <= 0) continue
          const e = ease.inOutCubic(p)
          const [fx, fy] = STAR_FROM[i]
          const tx = COL.x, ty = COL.y + 3 * COL.gap - i * COL.gap
          // a gentle curve in
          const mx = lerp(fx, tx, 0.5) + (fy - ty) * 0.25, my = lerp(fy, ty, 0.5) - (fx - tx) * 0.12
          const bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c
          const x = bz(fx, mx, tx, e), y = bz(fy, my, ty, e) - ex * 40 * (1 + i * 0.2)
          const alpha = ease.outQuad(Math.min(1, p * 3)) * (1 - ex)
          // trail
          if (p < 1) {
            const e2 = ease.inOutCubic(Math.max(0, p - 0.14))
            const x2 = bz(fx, mx, tx, e2), y2 = bz(fy, my, ty, e2)
            const lg = bx.createLinearGradient(x2, y2, x, y)
            lg.addColorStop(0, CHK[i] + '00'); lg.addColorStop(1, CHK[i])
            bx.globalAlpha = alpha * 0.8; bx.strokeStyle = lg; bx.lineWidth = 4; bx.lineCap = 'round'
            bx.beginPath(); bx.moveTo(x2, y2); bx.lineTo(x, y); bx.stroke()
          }
          const click = Math.exp(-Math.pow((t - (t0 + STAR_FLY)) / 0.06, 2))
          const breathe = 1 + 0.08 * Math.sin((t - LOCK) * 2.6 - i * 0.5) * prog(t, LOCK, LOCK + 0.4)
          const R = (24 + 14 * click + 10 * lockK) * breathe
          const g = bx.createRadialGradient(x, y, 0, x, y, R)
          g.addColorStop(0, CHK[i] + 'ee'); g.addColorStop(0.45, CHK[i] + '66'); g.addColorStop(1, CHK[i] + '00')
          bx.globalCompositeOperation = 'lighter'
          bx.globalAlpha = alpha; bx.fillStyle = g; bx.beginPath(); bx.arc(x, y, R, 0, Math.PI * 2); bx.fill()
          bx.globalCompositeOperation = 'source-over'
          const cg = bx.createRadialGradient(x - 2, y - 2, 0, x, y, 8)
          cg.addColorStop(0, '#ffffff'); cg.addColorStop(0.4, CHK[i]); cg.addColorStop(1, CHK[i])
          bx.globalAlpha = alpha; bx.fillStyle = cg; bx.beginPath(); bx.arc(x, y, 7.5 * (1 + 0.3 * click), 0, Math.PI * 2); bx.fill()
        }
        bx.restore()
        // lock: thin column line, flash, ring, pixel burst
        const colA = ease.outQuad(prog(t, LOCK - 0.05, LOCK + 0.15)) * (1 - ex)
        if (colA > 0.003) {
          const lg = bx.createLinearGradient(0, COL.y - 4 * COL.gap, 0, COL.y + 4 * COL.gap)
          lg.addColorStop(0, 'rgba(255,240,214,0)'); lg.addColorStop(0.5, 'rgba(255,240,214,0.55)'); lg.addColorStop(1, 'rgba(255,240,214,0)')
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = colA * (0.5 + 0.5 * lockK)
          bx.fillStyle = lg; bx.fillRect(COL.x - 1.5, COL.y - 4 * COL.gap, 3, 8 * COL.gap)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
        const fl = tw(t, [[LOCK - 0.06, 0], [LOCK + 0.02, 1, ease.outQuad], [LOCK + 0.45, 0, ease.inOutQuad]])
        if (fl > 0.003) {
          const g = bx.createRadialGradient(COL.x, COL.y, 0, COL.x, COL.y, 520)
          g.addColorStop(0, `rgba(255,246,230,${0.4 * fl})`); g.addColorStop(0.35, `rgba(220,190,255,${0.16 * fl})`); g.addColorStop(1, 'rgba(180,140,255,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(COL.x - 520, COL.y - 520, 1040, 1040)
          bx.globalAlpha = fl * 0.8; bx.drawImage(spriteS, COL.x - 160, COL.y - 160, 320, 320)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
        const rp = prog(t, LOCK, LOCK + 0.7)
        if (rp > 0 && rp < 1) {
          bx.save(); bx.globalAlpha = 0.75 * (1 - rp); bx.strokeStyle = 'rgba(255,240,214,1)'; bx.lineWidth = 3 * (1 - rp) + 1
          bx.shadowColor = 'rgba(255,226,160,0.8)'; bx.shadowBlur = 16
          bx.beginPath(); bx.arc(COL.x, COL.y, lerp(50, 150, ease.outCubic(rp)), 0, Math.PI * 2); bx.stroke(); bx.restore()
        }
        bx.imageSmoothingEnabled = false
        for (const b of BURST) {
          const q = prog(t, LOCK, LOCK + b.life)
          if (q <= 0 || q >= 1) continue
          const d = b.sp * ease.outCubic(q)
          pixStar(bx, COL.x + Math.cos(b.ang) * d, COL.y + Math.sin(b.ang) * d * 0.8, b.px, (fr >> 1) % 3 === 0 ? 2 : b.kind, b.col, '#fff3e0', 1 - ease.inQuad(q))
        }
        bx.imageSmoothingEnabled = true
      }

      // ── copy
      const fadeEb = (e, a, out) => { e.style.opacity = String(ease.outQuad(prog(t, a, a + 0.35)) * (1 - ease.inQuad(prog(t, out, out + 0.2)))); e.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, a, a + 0.5))) + 'em' }
      fadeEb(eb1, COPY1.eb, COPY1.out); line1.update(t - COPY1.line, { out: COPY1.out - COPY1.line })
      fadeEb(eb2, COPY2.eb, COPY2.out); line2.update(t - COPY2.line, { out: COPY2.out - COPY2.line })
      fadeEb(eb3, COPY3.eb, COPY3.out); line3.update(t - COPY3.line, { out: COPY3.out - COPY3.line })

      drawGrain(gx, t)
    },
  }
}

// ── sound
export const cues = [
  ['whoosh', FORM.a + 0.05, 0.6, 0.05],                                   // the back becomes a deck
  ...[0, 1, 2, 3].map(j => ['tick', FORM.a + 0.3 + j * 0.07, 0.016]),
  ...DEAL.flatMap((d, i) => [['whoosh', d, 0.5, 0.045], ['tick', d + FLY - 0.02, 0.03], ['bell', d + FLY - 0.01, [880, 987.77, 1108.73, 1318.51][i], 0.018, 1.2, [-0.4, 0.4, -0.6, 0.6][i]]]),
  ['whoosh', CFLIP.a, 0.45, 0.04], ['tick', CFLIP.b - 0.04, 0.03],
  ['bell', CFLIP.b - 0.03, 1479.98, 0.026, 1.8, 0],
  ['bell', COPY1.line, 587.33, 0.04, 2.0, 0],                             // "A few cards. Dealt with care."
  ['glitter', SHINE.a, SHINE.a + 4 * SHINE.step + SHINE.len],
  ['whoosh', STEP.a, 0.8, 0.06],                                          // the others step back
  ['bell', COPY2.line, 493.88, 0.04, 2.0, 0],                             // "What matters, said first."
  ...STAMPS.flatMap((s, i) => [['boom', s + DROP - 0.01, 0.14], ['tick', s + DROP, 0.05], ['tick', s + DROP + 0.02, 0.03]]),
  ['glitter', FOOT.a, FOOT.b],
  ['bell', FOOT.a + 0.1, 1318.51, 0.02, 1.6, -0.3],
  ['whoosh', MUT.a, 0.8, 0.06],                                           // mutual: the cards move, yours turns in
  ['whoosh', YOU_IN.a + 0.1, 0.6, 0.04],
  ...PILL.map((p, i) => ['tick', p + 0.06, 0.035]),
  ...PILL.map((p, i) => ['bell', p + 0.08, [739.99, 880][i], 0.03, 1.4, i ? 0.4 : -0.4]),
  ['bell', COPY3.line, 587.33, 0.04, 2.2, 0],                             // "Nobody gets picked alone."
  ['riser', STAR_IN - 0.1, LOCK, 0.07],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['tick', STAR_IN + [3, 0, 5, 2, 6, 1, 4][i] * STAR_STEP + STAR_FLY, 0.018]),
  ['boom', LOCK, 0.22],                                                    // LOCK
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', LOCK + i * 0.025, f, 0.045, 2.4, (i - 3) * 0.12]),
  ['glitter', LOCK, LOCK + 0.7],
  ['whoosh', EXIT.a, 0.6, 0.04],
]
