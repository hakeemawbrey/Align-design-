/* Subtle teaser, direction B: "Two stars".
 * Love, unspoken, told with two points of light. A near-black sky, a faint
 * drifting star field, two small lights that drift together and settle on the
 * centre axis, a hair-thin constellation line, "soon.", then "align".
 * Stars and the line are drawn on bg (halftone off, so they stay clean and
 * escape the fg misregistration); type goes on fg. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, rgba, clamp, lerp, TAU } = A

  const GOLD = '#f2c75c', ROSE = '#e8628a', BONE = '#efe6d6'
  const CX = 540

  // optional whisper line at the start ("some stars find each other."). Tried both;
  // the teaser is more intriguing without it, so it stays off.
  const WHISPER = false

  /* ---------- sparse, faint, deterministic star field (parallax layers) ---------- */
  const FIELD = (() => {
    const r = A.rng(4021)
    const pts = []
    for (let i = 0; i < 52; i++) {
      const z = 0.25 + r() * 0.75 // depth: 1 = near (moves most, a touch brighter)
      pts.push({
        x: r() * 1180 - 50, y: r() * 2020 - 50, z,
        s: 0.7 + z * 0.9 + r() * 0.3,
        a: 0.30 + z * 0.40 + r() * 0.12,
        ph: r() * TAU, f: 0.25 + r() * 0.5,
        warm: r() < 0.18,
      })
    }
    return pts
  })()

  function drawField(ctx, t) {
    // camera floats slowly up and to the left; near stars slide more than far ones
    const vx = 7, vy = 11 // px/s at z = 1
    ctx.save()
    for (const p of FIELD) {
      let x = p.x + vx * t * p.z, y = p.y - vy * t * p.z
      x = ((x + 60) % 1200 + 1200) % 1200 - 60
      y = ((y + 60) % 2040 + 2040) % 2040 - 60
      const tw = 0.75 + 0.25 * Math.sin(t * p.f * TAU * 0.5 + p.ph)
      ctx.globalAlpha = p.a * tw
      ctx.fillStyle = p.warm ? '#f3e2c4' : '#dcd8f2'
      ctx.beginPath(); ctx.arc(x, y, p.s * 0.85, 0, TAU); ctx.fill()
    }
    ctx.restore()
  }

  /* ---------- the two lights ---------- */
  function cubic(p0, p1, p2, p3, u) {
    const v = 1 - u
    return [
      v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0],
      v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1],
    ]
  }
  // point-symmetric curved paths about (540, 930): a slow spiral toward each other
  const GOLD_PATH = [[250, 560], [420, 430], [610, 600], [CX, 830]]
  const ROSE_PATH = [[830, 1300], [660, 1430], [470, 1260], [CX, 1030]]

  // slow-in, long ease-out; arrives at 8.2 s
  function travel(t) {
    const x = seg(t, 0, 8.2)
    const sm = x * x * (3 - 2 * x)
    return lerp(ease.outCubic(x), sm, 0.35)
  }

  function light(ctx, x, y, col, k, breath) {
    // k: overall intensity 0..1; breath ~0.85..1.15
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    // wide soft halo
    let R = 70 * breath
    let g = ctx.createRadialGradient(x, y, 0, x, y, R)
    g.addColorStop(0, rgba(col, 0.26 * k)); g.addColorStop(0.3, rgba(col, 0.09 * k)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2)
    // tight glow
    R = 15 * breath
    g = ctx.createRadialGradient(x, y, 0, x, y, R)
    g.addColorStop(0, rgba(col, 0.9 * k)); g.addColorStop(0.45, rgba(col, 0.28 * k)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2)
    // the point itself: a near-white core
    R = 3.2
    g = ctx.createRadialGradient(x, y, 0, x, y, R)
    g.addColorStop(0, `rgba(255,252,246,${k})`); g.addColorStop(0.6, rgba(col, 0.8 * k)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill()
    ctx.restore()
  }

  A.registerScene({
    id: 'twostars', start: 0, duration: 12,
    draw({ bg, fg, t }) {
      A.fx.halftone = false
      A.fx.look = { halation: 1.3 }

      drawField(bg, t)

      // ---- the pair ----
      const u = travel(t)
      const gp = cubic(...GOLD_PATH, u), rp = cubic(...ROSE_PATH, u)
      const appear = ease.inOutQuad(seg(t, 0.3, 2.2))
      const gb = 1 + 0.12 * Math.sin(t * TAU / 3.1 + 0.4)
      const rb = 1 + 0.12 * Math.sin(t * TAU / 4.3 + 2.1)
      const gk = appear * (0.88 + 0.12 * Math.sin(t * TAU / 2.3))
      const rk = appear * 1.12 * (0.88 + 0.12 * Math.sin(t * TAU / 3.7 + 1))

      // ---- constellation line, drawn top to bottom ----
      const lp = ease.inOutCubic(seg(t, 7.7, 9.0))
      if (lp > 0) {
        const gap = 13
        const y0 = gp[1] + gap, y1 = rp[1] - gap
        bg.save()
        bg.strokeStyle = rgba(BONE, 0.5)
        bg.lineWidth = 1.2
        bg.lineCap = 'round'
        bg.beginPath()
        bg.moveTo(gp[0], y0)
        bg.lineTo(lerp(gp[0], rp[0], lp), lerp(y0, y1, lp))
        bg.stroke()
        bg.restore()
      }

      light(bg, gp[0], gp[1], GOLD, gk, gb)
      light(bg, rp[0], rp[1], ROSE, rk, rb)

      // ---- copy (one line at a time) ----
      const TY = 1200
      if (WHISPER) {
        const w = ease.inOutQuad(seg(t, 1.0, 2.0)) * (1 - ease.inOutQuad(seg(t, 3.0, 4.0)))
        if (w > 0) A.text(fg, 'some stars find each other.', CX, 1560, { size: 44, italic: true, weight: 400, alpha: 0.7 * w, spacing: 0.01 })
      }
      const soon = ease.inOutQuad(seg(t, 8.4, 9.3)) * (1 - ease.inOutQuad(seg(t, 9.6, 10.3)))
      if (soon > 0) A.text(fg, 'soon.', CX, TY, { size: 48, italic: true, weight: 400, alpha: 0.8 * soon })
      const al = ease.inOutQuad(seg(t, 10.2, 11.1))
      if (al > 0) A.text(fg, 'align', CX, TY, { size: 52, weight: 500, spacing: 0.12, alpha: 0.85 * al })

      // ---- loop: ease slightly toward black in the last 0.3 s, out of it at the top ----
      const dark = Math.max(0.55 * ease.inOutQuad(seg(t, 11.7, 12)), 0.55 * (1 - ease.inOutQuad(seg(t, 0, 0.4))))
      if (dark > 0) { fg.save(); fg.fillStyle = `rgba(0,0,0,${dark})`; fg.fillRect(0, 0, 1080, 1920); fg.restore() }
    },
  })
})()
