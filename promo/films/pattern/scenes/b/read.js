// ─────────────────────────────────────────────── PATTERN half b · THE ANSWER (15.0–26.7)
// Starts on H exactly: Juniper's veiled profile card (card-profile-3.png, BODY height 600) centred at (960,540),
// upright, still, over the shared sky with the one moon (1716,122 r52 phase .12), grain 0.5. Cuts in opaque at 15.0.
//
// Beat map (sound):
//   15.00–15.20  H held still
//   15.20–16.00  the card glides left and grows (590,540 h800) · 15.75 eyebrow "THE ALIGNMENT READING"
//   15.95        "See the pattern / before you fall." types (right column, ≈17.2) · holds · out 18.65
//   17.45–18.35  the reading wakes: a gold glint runs down the card, the Push / Pull / Align rows breathe
//   18.70–19.45  PUSH-IN: the card pushes in until its Push / Pull / Align rows fill the upper frame; the rest dims
//   19.45 19.95 20.45  each row lights in its colour (PUSH rose · PULL mint · ALIGN gold), a glint along it, and the
//                caption word types under it: "Push." "Pull." "Align." (typed by ≈20.9) · holds · out 21.95
//   21.95–22.80  the card pulls back and glides into the alignment phone (rising 22.10–22.80, right) · flare 22.7
//   22.70 eyebrow "JUNIPER × YOU" · 22.85 "Venus rules / you both." (left, typed by ≈23.40) · out 24.50
//   22.95–24.40  phone push-in 1.0 → 1.28 (origin on the reading's heading)
//   24.40–24.75  the phone sinks away · 24.75–25.35 Juniper's card (right) and your sign card (left) turn in
//   25.05–25.75  seven chakra stars streak in and click into the column between them (red bottom → violet top)
//   25.75        LOCK: soft flash (cap .4), ring, pixel burst, 3-frame shake, both rims light
//   26.05–26.40  everything drifts apart and fades (end.js owns 26.30→)
import { clamp, lerp, prog, ease, tw, rng, el, mix, C, TypeLine } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, layerCanvas, loadArt, drawCard, cardSpace, glint, pocketCanvas, ART, bodyH, pixStar } from './kit.js'

const T0 = 15.0, T1 = 26.45

// ── card geometry (PNG px of card-profile-3.png)
const PA = ART.p3, BCX = (PA.b[0] + PA.b[2]) / 2, BCY = (PA.b[1] + PA.b[3]) / 2
const ROWS = [[1222, 1372], [1378, 1528], [1534, 1684]]          // Push / Pull / Align bands
const ROW_X = [214, 1326]
const ROW_COL = ['232,98,138', '127,216,160', '242,199,92']
const ROWS_CY = (ROWS[0][0] + ROWS[2][1]) / 2 - BCY, ROWS_CX = (ROW_X[0] + ROW_X[1]) / 2 - BCX

// ── poses (BODY centre, body height, roll)
const HO = { x: 960, y: 540, h: 600, rz: 0 }
const P1 = { x: 590, y: 540, h: 800, rz: -1.2 }
const P2 = (() => { const h = 1560, s = h / bodyH('p3'); return { x: 960 - ROWS_CX * s, y: 410 - ROWS_CY * s, h, rz: 0 } })()
const GO1 = { a: 15.2, b: 16.0 }
const GO2 = { a: 18.7, b: 19.45 }
const COPY1 = { eb: 15.75, line: 15.95, out: 18.65 }
const WAKE = { a: 17.45, b: 18.35 }
const ROW_T = [19.45, 19.95, 20.45]
const COPY2 = { eb: 19.25, out: 21.95 }
const WORDS = ['Push.', 'Pull.', 'Align.']

// ── phone
const PH = 900, PW = Math.round(PH * 1170 / 2532), PX = 1300, PY = 540
const INTO = { a: 21.95, b: 22.8 }
const PHONE_IN = 22.2, PHONE_LAND = 22.8, PHONE_OUT = 24.4, PHONE_GONE = 24.75
const PUSH0 = 22.95, PUSH1 = 24.4
const AURA = { x: PX - PW / 2 + PW * 0.433, y: PY - PH / 2 + PH * 0.215 }
const COPY3 = { eb: 22.7, line: 22.85, out: 24.5 }

// ── the lock
const RJ = { x: 1270, y: 470, h: 540 }, LY = { x: 650, y: 470, h: 540 }
const CARDS_IN = { a: 24.75, b: 25.35 }
const COL = { x: 960, y: 470, gap: 60 }
const STAR_IN = 25.05, STAR_STEP = 0.05, STAR_FLY = 0.4
const LOCK = 25.75
const EXIT = { a: 26.05, b: 26.4 }
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const STAR_FROM = [[300, 1000], [1640, 960], [120, 560], [1800, 600], [420, 70], [1480, 40], [960, -40]]

const shakeAt = (t, t0, amp) => {
  const f = Math.round((t - t0) * 30)
  return f >= 0 && f < 3 ? [[1, -1], [-1, 0.6], [0.5, 0.4]][f].map(v => v * amp * (1 - f / 3)) : [0, 0]
}
const lerpPose = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), h: lerp(a.h, b.h, k), rz: lerp(a.rz, b.rz, k) })

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await loadArt()
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})
  const spriteS = getSky().spriteS

  const pocket1 = pocketCanvas(1330, 520, 620, 330, 0.55)
  const pocket2 = pocketCanvas(960, 820, 860, 210, 0.8)
  const pocket3 = pocketCanvas(560, 520, 600, 330, 0.55)

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── phone layer (above grain, like f6/f7)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, root)
  const pAura = el('div', { position: 'absolute', left: (PX - 460) + 'px', top: (PY - 560) + 'px', width: '920px', height: '1120px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(214,170,255,0.5), rgba(180,92,255,0.2) 55%, rgba(180,92,255,0) 100%)' }, persp)
  const phone = el('div', { position: 'absolute', left: (PX - PW / 2) + 'px', top: (PY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform', transformOrigin: '50% 30%' }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '54px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(255,150,232,0.22), 0 0 0 1.5px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-alignment.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const flare = el('div', { position: 'absolute', left: (PW * 0.5 - 170) + 'px', top: (PH * 0.215 - 120) + 'px', width: '340px', height: '240px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,236,250,0.9), rgba(220,160,255,0.35) 50%, rgba(180,92,255,0) 100%)' }, phone)

  // ── copy
  const eyebrow = (txt, style) => el('div', { position: 'absolute', fontFamily: MONO, fontSize: '34px', letterSpacing: '0.32em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)', ...style }, root, txt)
  const stmt = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: '1.08', letterSpacing: '-0.005em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }
  const eb1 = eyebrow('THE ALIGNMENT READING', { left: '1004px', top: '384px' })
  const line1 = new TypeLine(root, 'See the pattern\nbefore you fall.', { ...stmt, left: '996px', top: '442px' }, { perChar: 0.032, fade: 0.3, accent: [C.violet, C.gold, C.rub] })
  const eb2 = eyebrow('HOW YOU TWO ACTUALLY FIT', { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '688px' })
  const wordsBox = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '748px', textAlign: 'center', ...stmt, fontSize: '128px', lineHeight: '1', whiteSpace: 'pre' }, root)
  const wordChars = WORDS.map((w, wi) => {
    const sp = el('span', { display: 'inline-block', margin: '0 0.2em' }, wordsBox)
    return [...w].map(ch => el('span', { opacity: 0 }, sp, ch))
  })
  const eb3 = eyebrow('JUNIPER × YOU', { left: '232px', top: '372px' })
  const line3 = new TypeLine(root, 'Venus rules\nyou both.', { ...stmt, fontSize: '112px', left: '224px', top: '432px' }, { perChar: 0.034, fade: 0.2, accent: [C.violet, C.rub, C.gold] })

  // ── lock burst particles
  const br = rng(9137)
  const BURST = Array.from({ length: 32 }, (_, i) => {
    const ang = br() * Math.PI * 2, sp = 80 + br() * 130
    return { ang, sp, px: br() < 0.3 ? 5 : 3, col: i % 3 === 0 ? '#f2c75c' : CHK[Math.floor(br() * 7)], life: 0.5 + br() * 0.6, kind: Math.floor(br() * 4) }
  })

  // a band of the card (PNG y0..y1), in card space, rounded
  const band = (y0, y1, pad = 0) => { bx.beginPath(); bx.roundRect(ROW_X[0] - BCX - pad, y0 - BCY, ROW_X[1] - ROW_X[0] + 2 * pad, y1 - y0, 26) }

  return {
    start: T0, end: T1, root,
    update(t) {
      const fr = Math.round(t * 30)
      // plate: H (dim 1) → a touch dimmer under the reading → back to 1 for the end
      const dim = 1 - 0.2 * ease.inOutQuad(prog(t, 15.3, 16.2)) - 0.1 * ease.inOutQuad(prog(t, GO2.a, GO2.b)) + 0.1 * ease.inOutQuad(prog(t, INTO.a, INTO.b)) + 0.2 * ease.inOutQuad(prog(t, 25.9, 26.45))
      sky(bx, t, Math.min(1, dim))
      twinkles(bx, t)
      gC.style.opacity = String(grainOpacity(Math.min(1, dim)))

      const pk = (a, b, c, d) => ease.inOutQuad(prog(t, a, b)) * (1 - ease.inOutQuad(prog(t, c, d)))
      bx.globalAlpha = pk(15.5, 16.1, COPY1.out, COPY1.out + 0.35); if (bx.globalAlpha > 0) bx.drawImage(pocket1, 0, 0)
      bx.globalAlpha = pk(22.6, 23.1, COPY3.out, COPY3.out + 0.35); if (bx.globalAlpha > 0) bx.drawImage(pocket3, 0, 0)
      bx.globalAlpha = 1

      // ════════ Juniper's card: H → beside the copy → push-in on the rows → into the phone
      if (t < INTO.b) {
        let P = lerpPose(HO, P1, ease.inOutCubic(prog(t, GO1.a, GO1.b)))
        P.y += Math.sin((t - GO1.b) * 1.1) * 4 * prog(t, GO1.b, GO1.b + 0.6) * (1 - prog(t, GO2.a, GO2.a + 0.3))
        P = lerpPose(P, P2, ease.inOutCubic(prog(t, GO2.a, GO2.b)))
        // a slow drift while the rows light
        const dr = prog(t, GO2.b, INTO.a)
        P.h *= 1 + 0.025 * dr; P.y -= 6 * dr                       // keeps the rows where they are
        // into the phone: shrink toward the reading's aura row, fading as it arrives
        const ik = ease.inOutCubic(prog(t, INTO.a, INTO.b))
        const phoneDY = lerp(720, 0, ease.outCubic(prog(t, PHONE_IN, PHONE_LAND)))
        const tgt = { x: AURA.x, y: AURA.y + phoneDY * 0.6, h: 70, rz: -4 }
        const hk = ease.outCubic(prog(t, INTO.a, INTO.b))       // shrinks first, then glides
        const ph = lerp(P.h, tgt.h, hk)
        P = lerpPose(P, tgt, ik); P.h = ph
        P.y -= Math.sin(Math.PI * ik) * 40
        const alpha = 1 - ease.inOutQuad(prog(t, INTO.a + 0.2, INTO.a + 0.6))
        // the reading wakes / lights
        const wakeG = Math.exp(-Math.pow((t - (WAKE.a + 0.6)) / 0.35, 2))
        drawCard(bx, 'p3', P.x, P.y, P.h, { rz: P.rz, alpha, shadow: t < 15.2 ? 0.6 + 0.4 * prog(t, 15.0, 15.2) : 1, glow: 0.15 * wakeG, rim: '255,170,240' })

        if (alpha > 0.003) {
          bx.save(); cardSpace(bx, 'p3', P.x, P.y, P.h, P.rz)
          // focus: on the push-in everything but the three rows sinks into shadow
          const focus = ease.inOutQuad(prog(t, GO2.a + 0.2, GO2.b + 0.1)) * (1 - ease.inOutQuad(prog(t, INTO.a, INTO.a + 0.4)))
          if (focus > 0.003) {
            bx.globalAlpha = 0.92 * focus * alpha; bx.fillStyle = '#0b0620'
            bx.beginPath()
            bx.roundRect(PA.b[0] - BCX + 3, PA.b[1] - BCY + 3, PA.b[2] - PA.b[0] - 6, PA.b[3] - PA.b[1] - 6, PA.r)
            bx.roundRect(ROW_X[0] - BCX - 30, ROWS[0][0] - BCY - 24, ROW_X[1] - ROW_X[0] + 60, ROWS[2][1] - ROWS[0][0] + 48, 30)
            bx.fill('evenodd')
            // below the Align row (dealbreakers, footer): fully out, so nothing ghosts behind the caption
            bx.globalAlpha = focus * alpha
            bx.beginPath(); bx.roundRect(PA.b[0] - BCX + 3, ROWS[2][1] - BCY + 40, PA.b[2] - PA.b[0] - 6, PA.b[3] - ROWS[2][1] - 43, [0, 0, PA.r, PA.r]); bx.fill()
          }
          // each row: dimmed until its turn, then lit in its colour
          for (let i = 0; i < 3; i++) {
            const lit = ease.outCubic(prog(t, ROW_T[i], ROW_T[i] + 0.3))
            const wait = focus * (1 - lit) * 0.55
            if (wait > 0.003) { bx.globalAlpha = wait * alpha; bx.fillStyle = '#0b0620'; band(ROWS[i][0], ROWS[i][1], 20); bx.fill() }
            // beat 1 hint: a soft breath through the rows as the reading wakes
            const breath = Math.exp(-Math.pow((t - (WAKE.a + 0.35 + i * 0.16)) / 0.18, 2))
            const hot = tw(t, [[ROW_T[i], 0], [ROW_T[i] + 0.12, 1, ease.outQuad], [ROW_T[i] + 0.9, 0.35, ease.inOutQuad]]) * focus + 0.6 * breath
            if (hot > 0.003) {
              const y0 = ROWS[i][0] - BCY, y1 = ROWS[i][1] - BCY
              const g = bx.createLinearGradient(ROW_X[0] - BCX, 0, ROW_X[1] - BCX, 0)
              g.addColorStop(0, `rgba(${ROW_COL[i]},${0.32 * hot})`); g.addColorStop(0.5, `rgba(${ROW_COL[i]},${0.12 * hot})`); g.addColorStop(1, `rgba(${ROW_COL[i]},0)`)
              bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = alpha
              bx.fillStyle = g; band(y0 + BCY, y1 + BCY, 20); bx.fill()
              // a lit edge on the left of the row
              bx.fillStyle = `rgba(${ROW_COL[i]},${0.9 * hot})`; bx.shadowColor = `rgba(${ROW_COL[i]},0.9)`; bx.shadowBlur = 30
              bx.fillRect(ROW_X[0] - BCX - 20, y0 + 22, 7, y1 - y0 - 44)
              bx.shadowBlur = 0; bx.shadowColor = 'transparent'
              bx.globalCompositeOperation = 'source-over'
            }
          }
          bx.restore()
          // glints: down the card on wake; along each row as it lights
          glint(bx, 'p3', P.x, P.y, P.h, P.rz, ease.inOutQuad(prog(t, WAKE.a, WAKE.b)), { alpha: 0.5 * alpha, width: 0.09 })
          ROW_T.forEach((rt, i) => glint(bx, 'p3', P.x, P.y, P.h, P.rz, ease.inOutQuad(prog(t, rt + 0.04, rt + 0.6)), { alpha: 0.9 * alpha, y0: ROWS[i][0], y1: ROWS[i][1], width: 0.1 }))
        }
      }
      // pocket under the words (over the dimmed card)
      bx.globalAlpha = pk(GO2.b - 0.3, GO2.b + 0.1, COPY2.out, COPY2.out + 0.35); if (bx.globalAlpha > 0) bx.drawImage(pocket2, 0, 0)
      bx.globalAlpha = 1

      // ════════ the lock: Juniper's card (right) and yours (left) turn in; the chakra column clicks shut between them
      const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
      const lockK = tw(t, [[LOCK - 0.02, 0], [LOCK + 0.06, 1, ease.outQuad], [LOCK + 1.0, 0.25, ease.inOutQuad]])
      if (t >= CARDS_IN.a) {
        const p = ease.outCubic(prog(t, CARDS_IN.a, CARDS_IN.b))
        const dl = shakeAt(t, LOCK, 5)
        const fl = k => Math.sin((t - CARDS_IN.b) * 1.2 + k) * 4 * prog(t, CARDS_IN.b, CARDS_IN.b + 0.5)
        const aIn = ease.outQuad(prog(t, CARDS_IN.a, CARDS_IN.a + 0.25)) * (1 - ease.outQuad(ex))
        const Y = { x: lerp(-260, LY.x, p) - 90 * ex + dl[0], y: lerp(520, LY.y, p) + fl(2) - 20 * ex + dl[1], ry: lerp(40, 0, p), rz: lerp(-6, 1.5, p) }
        const J = { x: lerp(W + 260, RJ.x, p) + 90 * ex + dl[0], y: lerp(520, RJ.y, p) + fl(0) - 20 * ex + dl[1], ry: lerp(-40, 0, p), rz: lerp(6, -1.5, p) }
        drawCard(bx, 'sign', Y.x, Y.y, LY.h, { ry: Y.ry, rz: Y.rz, alpha: aIn, glow: lockK * 0.9, rim: '200,255,190' })
        drawCard(bx, 'p3', J.x, J.y, RJ.h, { ry: J.ry, rz: J.rz, alpha: aIn, glow: lockK * 0.9, rim: '255,170,240' })
      }
      if (t >= STAR_IN) {
        bx.save()
        for (let i = 0; i < 7; i++) {
          const t0 = STAR_IN + [3, 0, 5, 2, 6, 1, 4][i] * STAR_STEP
          const p = prog(t, t0, t0 + STAR_FLY)
          if (p <= 0) continue
          const e = ease.inOutCubic(p)
          const [fx, fy] = STAR_FROM[i]
          const tx = COL.x, ty = COL.y + 3 * COL.gap - i * COL.gap
          const mx = lerp(fx, tx, 0.5) + (fy - ty) * 0.25, my = lerp(fy, ty, 0.5) - (fx - tx) * 0.12
          const bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c
          const x = bz(fx, mx, tx, e), y = bz(fy, my, ty, e) - ex * 40 * (1 + i * 0.2)
          const alpha = ease.outQuad(Math.min(1, p * 3)) * (1 - ex)
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

      // ── phone
      const pin = ease.outCubic(prog(t, PHONE_IN, PHONE_LAND)), pout = ease.inOutQuad(prog(t, PHONE_OUT, PHONE_GONE))
      const phoneDY = lerp(720, 0, pin) + 60 * pout
      phone.style.opacity = String(ease.outQuad(prog(t, PHONE_IN, PHONE_IN + 0.07)) * (1 - pout))
      const push = lerp(1, 1.28, ease.inOutCubic(prog(t, PUSH0, PUSH1)))
      phone.style.transform = `translateY(${phoneDY}px) rotateX(${lerp(14, 0, pin)}deg) rotateY(${lerp(-10, -3, pin) + 2 * prog(t, PHONE_LAND, PHONE_OUT)}deg) scale(${push * lerp(1, 0.92, pout)})`
      pAura.style.opacity = String(ease.inOutQuad(prog(t, PHONE_IN, PHONE_LAND)) * (0.8 + 0.2 * Math.sin((t - 22) * 1.7)) * (1 - pout))
      flare.style.opacity = String(tw(t, [[INTO.b - 0.2, 0], [INTO.b, 0.9, ease.outQuad], [INTO.b + 0.7, 0, ease.inOutQuad]]))

      // ── copy
      const fadeEb = (e, a, out) => { e.style.opacity = String(ease.outQuad(prog(t, a, a + 0.35)) * (1 - ease.inQuad(prog(t, out, out + 0.2)))); e.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, a, a + 0.5))) + 'em' }
      fadeEb(eb1, COPY1.eb, COPY1.out); line1.update(t - COPY1.line, { out: COPY1.out - COPY1.line })
      fadeEb(eb2, COPY2.eb, COPY2.out)
      const wOut = 1 - ease.inQuad(prog(t, COPY2.out, COPY2.out + 0.25))
      wordChars.forEach((cs, wi) => cs.forEach((s, j) => {
        const p = prog(t, ROW_T[wi] + 0.05 + j * 0.04, ROW_T[wi] + 0.05 + j * 0.04 + 0.22)
        s.style.opacity = String(ease.outQuad(p) * wOut)
        const [r, g, b] = ROW_COL[wi].split(',').map(Number)
        const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
        s.style.color = p >= 1 ? C.bone : mix(hex, C.bone, ease.inQuad(p))
      }))
      fadeEb(eb3, COPY3.eb, COPY3.out); line3.update(t - COPY3.line, { out: COPY3.out - COPY3.line })

      drawGrain(gx, t)
    },
  }
}

// ── sound
export const cues = [
  ['whoosh', GO1.a + 0.02, 0.7, 0.05],                                    // the card steps aside
  ['bell', COPY1.line, 493.88, 0.04, 2.2, 0],                             // "See the pattern before you fall."
  ['glitter', WAKE.a, WAKE.b],
  ['bell', WAKE.a + 0.3, 1318.51, 0.02, 1.6, -0.3],
  ['whoosh', GO2.a, 0.8, 0.07],                                           // push-in on the rows
  ...ROW_T.flatMap((r, i) => [['tick', r + 0.02, 0.04], ['bell', r + 0.03, [587.33, 739.99, 880][i], 0.04, 2.0, [-0.35, 0, 0.35][i]]]),
  ['glitter', ROW_T[2] + 0.05, ROW_T[2] + 0.6],
  ['whoosh', INTO.a, 0.8, 0.07],                                          // into the phone
  ['tick', PHONE_LAND - 0.06, 0.1], ['boom', PHONE_LAND - 0.06, 0.16],
  ['bell', INTO.b, 1479.98, 0.024, 1.8, 0.3],
  ['bell', COPY3.line, 587.33, 0.04, 2.2, 0],                             // "Venus rules you both."
  ['whoosh', PHONE_OUT, 0.5, 0.05],
  ['whoosh', CARDS_IN.a + 0.05, 0.6, 0.05],
  ['riser', STAR_IN - 0.1, LOCK, 0.07],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['tick', STAR_IN + [3, 0, 5, 2, 6, 1, 4][i] * STAR_STEP + STAR_FLY, 0.018]),
  ['boom', LOCK, 0.22],                                                    // LOCK
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', LOCK + i * 0.025, f, 0.045, 2.4, (i - 3) * 0.12]),
  ['glitter', LOCK, LOCK + 0.7],
  ['whoosh', EXIT.a, 0.6, 0.04],
]
