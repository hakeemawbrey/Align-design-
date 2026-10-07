/* Subtle teaser, direction A: "Whisper".
 * Typography only, like a thought surfacing. One soft light drifts behind; lines arrive one at a time.
 * Max two elements on screen: the glow + one line (or the brand lockup at the end). */
;(function () {
  const A = window.ALIGN
  const { seg, ease, rgba, clamp, lerp, C } = A

  // copy: [in, out, lines]
  const LINES = [
    { a: 0.6, b: 3.4, lines: ['you’ve felt it before.'] },
    { a: 3.8, b: 6.6, lines: ['a pull toward someone', 'you couldn’t explain.'] },
    { a: 6.9, b: 8.8, lines: ['it has a name.'] },
  ]
  const FADE_IN = 1.0, FADE_OUT = 0.8

  /** 0..1 visibility of a timed line with ease-in-out fades. */
  function vis(t, a, b) {
    return ease.inOutCubic(seg(t, a, a + FADE_IN)) * (1 - ease.inOutCubic(seg(t, b - FADE_OUT, b)))
  }

  /** A whispered line: a softer, larger, lower copy resolves into the sharp line as it fades in. */
  function whisper(ctx, str, x, y, t, a, b, o) {
    const v = vis(t, a, b)
    if (v <= 0.001) return
    const pin = ease.outCubic(seg(t, a, a + FADE_IN * 1.3)) // arrival
    const rise = (1 - pin) * 10 + seg(t, a, b) * 4          // ~10 px settle, then a slow continuous lift
    const yy = y + rise
    const opt = { size: o.size, italic: o.italic, weight: o.weight || 400, spacing: o.spacing || 0, color: C.bone }
    // soft "unfocused" ghost, only during arrival
    const ghost = (1 - pin) * v
    if (ghost > 0.01) {
      ctx.save()
      ctx.filter = `blur(${(1 - pin) * 6}px)`
      A.text(ctx, str, x, yy + 3, { ...opt, size: o.size * (1 + (1 - pin) * 0.04), alpha: o.alpha * 0.5 * ghost })
      ctx.restore()
    }
    ctx.save()
    if (pin < 0.999) ctx.filter = `blur(${(1 - pin) * 2.2}px)`
    A.text(ctx, str, x, yy, { ...opt, alpha: o.alpha * v * lerp(0.6, 1, pin) })
    ctx.restore()
  }

  A.registerScene({
    id: 'whisper',
    start: 0,
    duration: 12,
    draw({ bg, fg, t, W, H }) {
      A.fx.halftone = false
      // overall: rise from dark, ease toward black in the last 0.3 s for a clean loop
      const master = ease.inOutQuad(seg(t, 0, 0.6)) * (1 - 0.85 * ease.inOutQuad(seg(t, 11.7, 12)))

      /* ---- the only non-text element: one warm light, drifting and breathing ---- */
      const gx = W * 0.5 + Math.sin(t * 0.21 + 0.6) * 60 + (t - 6) * 3
      const gy = H * 0.47 + Math.cos(t * 0.17) * 50 - (t - 6) * 2
      const breathe = 0.85 + 0.15 * Math.sin(t * 0.9 - 1.2)
      const warm = ease.inOutQuad(seg(t, 7, 11)) // the light warms slightly as the answer comes
      const R = 640 * (0.96 + 0.04 * Math.sin(t * 0.5))
      bg.save()
      bg.globalAlpha = master
      let g = bg.createRadialGradient(gx, gy, 0, gx, gy, R)
      g.addColorStop(0, rgba(A.mixHex('#6e2848', '#80403f', warm), 0.30 * breathe))
      g.addColorStop(0.35, rgba('#3a1a44', 0.18 * breathe))
      g.addColorStop(0.7, rgba('#150f2c', 0.08 * breathe))
      g.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = g
      bg.fillRect(0, 0, W, H)
      bg.restore()

      /* ---- one line at a time ---- */
      const cx = W / 2, cy = H * 0.47
      fg.save()
      fg.globalAlpha = master
      for (const L of LINES) {
        if (t < L.a || t > L.b) continue
        const lh = 74
        L.lines.forEach((s, i) => {
          const y = cy + (i - (L.lines.length - 1) / 2) * lh
          // second line of a sentence arrives a breath later
          const d = i * 0.6
          whisper(fg, s, cx, y, t, L.a + d, L.b, { size: 56, italic: true, alpha: 0.86 })
        })
      }

      /* ---- the answer: the brand, once, as on the app splash: mark above, "Align" below ---- */
      if (t >= 9.1) {
        const my = cy - 30
        // the mark surfaces: seed-of-life lines barely there, then the seven dots light root → crown
        const mv = ease.inOutCubic(seg(t, 9.1, 10.2))
        const lit = 7 * ease.inOutQuad(seg(t, 9.5, 11.0))
        fg.save()
        fg.translate(0, (1 - ease.outCubic(seg(t, 9.1, 10.5))) * 10)
        A.alignMark(fg, cx, my, 150, { lit, alpha: mv * 0.9, strokeAlpha: 0.22, glow: 0.6 })
        fg.restore()
        // "Align" breathes in beneath it (soft ghost resolving to sharp)
        const a = 9.8, pin = ease.outCubic(seg(t, a, a + 1.3)), v = ease.inOutCubic(seg(t, a, a + 1.0))
        if (v > 0.001) {
          const wy = my + 140 + (1 - pin) * 10
          if (pin < 0.999) {
            fg.save(); fg.filter = `blur(${(1 - pin) * 6}px)`
            A.wordmark(fg, cx, wy + 3, { size: 64 * (1 + (1 - pin) * 0.04), alpha: 0.5 * (1 - pin) * v })
            fg.restore()
          }
          fg.save(); if (pin < 0.999) fg.filter = `blur(${(1 - pin) * 2.2}px)`
          A.wordmark(fg, cx, wy, { size: 64, alpha: 0.88 * v * lerp(0.6, 1, pin), glow: 0.25 })
          fg.restore()
        }
      }
      fg.restore()
    },
  })
})()
