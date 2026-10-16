/* Subtle teaser C — "The line".
 * One continuous macro pull-back: a single gold hairline arc in extreme close-up
 * turns out to be a circle, then the seed of life, then the Align mark.
 * Chakra dots light root → crown, then the "Align" wordmark, as on the app splash. No cuts, no flashes. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, clamp, lerp, rgba, TAU } = A

  const GOLD = '#f2c75c'
  const CX = 540, CY = 860 // mark centre on screen at rest
  const R = 90             // seed circle radius (outer = 180 → mark ≈ 360 px)

  const S0 = 18            // starting zoom
  const MOVE_END = 9.2     // camera settles
  const sine = (x) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x))

  // Centre circle: begins on the upper-left and draws clockwise.
  const C0_START = -2.25   // rad
  const C0 = { a: 0.0, b: 5.0 }
  // focal point: a little ahead of where the line begins, so it is born in frame
  const P0_ANG = C0_START + 0.16
  const P0 = [Math.cos(P0_ANG) * R, Math.sin(P0_ANG) * R]

  // Six petals, starting from the one nearest the line's origin, clockwise.
  const PETALS = []
  for (let i = 0; i < 6; i++) {
    const ang = C0_START + 0.2 + (i * TAU) / 6
    PETALS.push({ x: Math.cos(ang) * R, y: Math.sin(ang) * R, a: 4.6 + i * 0.5, d: 2.2 })
  }
  const OUTER = { a: 6.9, d: 2.5 }

  // centre circle progress: the drawing head moves at a steady on-screen speed,
  // slow while we are close, sweeping faster as the camera pulls away
  const C0_TABLE = (() => {
    const N = 600, out = [0]
    let acc = 0
    for (let i = 1; i <= N; i++) {
      const tt = C0.a + ((i - 0.5) / N) * (C0.b - C0.a)
      acc += Math.pow(camera(tt).s, -1.35)
      out.push(acc)
    }
    return out.map((v) => v / acc)
  })()
  function c0Progress(t) {
    const x = seg(t, C0.a, C0.b) * (C0_TABLE.length - 1)
    const i = Math.floor(x), f = x - i
    const raw = i >= C0_TABLE.length - 1 ? 1 : lerp(C0_TABLE[i], C0_TABLE[i + 1], f)
    return raw
  }

  function camera(t) {
    const e = ease.inOutCubic(seg(t, 0, MOVE_END))
    const s = Math.exp(lerp(Math.log(S0), 0, e))
    // focus slides from the line's birthplace to the mark's centre as we pull back
    const w = Math.pow((s - 1) / (S0 - 1), 0.6)
    return { s, fx: P0[0] * w, fy: P0[1] * w }
  }

  /** stroke one circle (world coords) as a glowing hairline, progress 0..1 */
  let TINT = 0 // 0 = gold line, 1 = the splash mark's pale lavender
  const lineCol = () => A.mixHex('#ffe2a0', '#e2d8f4', TINT)
  const glowCol = () => A.mixHex(GOLD, '#a996dc', TINT)
  function hairCircle(ctx, x, y, r, start, prog, s, alpha, head) {
    if (prog <= 0 || alpha <= 0) return
    const GOLD = glowCol()
    const end = start + TAU * prog
    ctx.save()
    ctx.lineCap = 'round'
    // soft glow pass
    ctx.strokeStyle = rgba(GOLD, 0.16 * alpha)
    ctx.lineWidth = 7 / s
    ctx.beginPath(); ctx.arc(x, y, r, start, end); ctx.stroke()
    // crisp hairline
    ctx.shadowColor = rgba(GOLD, 0.8 * alpha)
    ctx.shadowBlur = 10
    ctx.strokeStyle = rgba(lineCol(), 0.95 * alpha)
    ctx.lineWidth = 1.9 / s
    ctx.beginPath(); ctx.arc(x, y, r, start, end); ctx.stroke()
    ctx.restore()
    // a faint warm point at the drawing head, gone once the circle closes
    if (head && prog < 1) {
      const hx = x + Math.cos(end) * r, hy = y + Math.sin(end) * r
      const k = alpha * Math.min(1, (1 - prog) * 8) * Math.min(1, prog * 30)
      const rr = 16 / s
      const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, rr)
      g.addColorStop(0, rgba('#fff3d6', 0.55 * k)); g.addColorStop(0.4, rgba(GOLD, 0.18 * k)); g.addColorStop(1, rgba(GOLD, 0))
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(hx, hy, rr, 0, TAU); ctx.fill()
    }
  }

  A.registerScene({
    id: 'theline',
    start: 0,
    duration: 12,
    draw(env) {
      const { fg, t } = env
      A.fx.halftone = false

      const { s, fx, fy } = camera(t)
      // the geometry settles back a touch so the chakra light can speak
      const st9 = sine(seg(t, 8.8, 10.6))
      const settle = lerp(1, 0.7, st9)
      TINT = st9
      fg.save()
      fg.globalAlpha = settle
      fg.translate(CX, CY)
      fg.scale(s, s)
      fg.translate(-fx, -fy)

      // the line: born out of the dark
      const c0p = c0Progress(t)
      hairCircle(fg, 0, 0, R, C0_START, c0p, s, sine(seg(t, 0.0, 1.0)), true)

      for (const p of PETALS) {
        const pr = ease.inOutQuad(seg(t, p.a, p.a + p.d))
        const st = Math.atan2(p.y, p.x) + Math.PI // begins at the shared centre
        hairCircle(fg, p.x, p.y, R, st, pr, s, 0.82, true)
      }
      const op = ease.inOutQuad(seg(t, OUTER.a, OUTER.a + OUTER.d))
      hairCircle(fg, 0, 0, R * 2, C0_START, op, s, 0.9, true)

      fg.globalAlpha = 1
      // chakra column, root (bottom) → crown, lit very softly
      for (let i = 0; i < 7; i++) {
        const a = sine(seg(t, 9.0 + i * 0.18, 9.0 + i * 0.18 + 0.9))
        if (a <= 0) continue
        const y = (3 - i) * 0.53 * R
        const c = A.CHAKRA_COLORS[i]
        // splash-screen dots: a bright pearl with a soft halo, swelling gently into place
        const grow = 0.8 + 0.2 * a
        const gr = (0.6 * R * grow) / s, cr = (0.165 * R * grow) / s
        const g = fg.createRadialGradient(0, y, 0, 0, y, gr)
        g.addColorStop(0, rgba(c, 0.55 * a)); g.addColorStop(0.3, rgba(c, 0.22 * a)); g.addColorStop(1, rgba(c, 0))
        fg.fillStyle = g
        fg.beginPath(); fg.arc(0, y, gr, 0, TAU); fg.fill()
        const core = fg.createRadialGradient(0, y, 0, 0, y, cr)
        core.addColorStop(0, rgba('#fff8ec', 0.95 * a)); core.addColorStop(0.45, rgba(c, 0.95 * a)); core.addColorStop(1, rgba(c, 0.85 * a))
        fg.fillStyle = core
        fg.beginPath(); fg.arc(0, y, cr, 0, TAU); fg.fill()
      }
      fg.restore()


      // the brand, once
      const w = sine(seg(t, 10.0, 11.1))
      if (w > 0) {
        // the splash-screen wordmark: "Align", EB Garamond italic, beneath the mark
        A.wordmark(fg, CX, CY + 2 * R + 160 + (1 - w) * 6, { size: 100, alpha: 0.9 * w, glow: 0.35 * w })
      }

      // gentle dip toward black for the loop
      const out = sine(seg(t, 11.7, 12))
      if (out > 0) {
        fg.save(); fg.fillStyle = `rgba(0,0,0,${0.55 * out})`; fg.fillRect(0, 0, env.W, env.H); fg.restore()
      }
    },
  })
})()
