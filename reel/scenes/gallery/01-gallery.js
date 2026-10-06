/* Geometry gallery · 01 (0–12 s): an idea sheet of every form in ALIGN.geo.FORMS.
 * 3 × 5 grid; each cell draws in (staggered over the first ~3.5 s), then lives (spins, breathes).
 * Pure function of t. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, clamp, rgba, TAU } = A
  const COLS = 3, TOP = 262, ROW_H = 326, COL_W = 360, FORM = 226

  // per-form living motion (screen-plane rotation speed, rad/s) for the symmetric 2D forms
  const SPIN = { seed: 0.06, egg: -0.05, flower: 0.04, fruit: -0.04, metatron: 0.035, hexagram: -0.05, phyllotaxis: 0.05 }

  A.registerScene({
    id: 'gallery', start: 0, duration: 12,
    draw({ bg, fg, t, W, H }) {
      A.fx.halftone = false
      A.fx.look = { grain: 0.5, soften: 0.3 }
      // background: deep indigo, a whisper of galaxy
      const g = bg.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#120a2c'); g.addColorStop(0.5, '#0b0620'); g.addColorStop(1, '#07040f')
      bg.fillStyle = g; bg.fillRect(0, 0, W, H)
      A.galaxy(bg, t, { cx: W / 2, cy: H * 0.52, scale: 900, alpha: 0.13, density: 0.22, rot: t * 0.05, tilt: 0.55 })

      const geo = A.geo
      if (!geo) return
      const ctx = fg

      // title block
      const ti = ease.outCubic(seg(t, 0, 0.9))
      A.text(ctx, 'SACRED GEOMETRY · ALIGN', W / 2, 108, { size: 44, font: 'serif', spacing: 0.26, color: A.C.bone, alpha: ti, weight: 500 })
      A.text(ctx, 'AN IDEA SHEET  ·  ' + geo.FORMS.length + ' FORMS  ·  DRAW-IN + LIVING MOTION', W / 2, 168, { size: 15, font: 'mono', spacing: 0.16, color: A.C.label2, alpha: ti * 0.9 })
      ctx.save()
      ctx.globalAlpha = ti * 0.55; ctx.strokeStyle = A.C.gold; ctx.lineWidth = 1
      const rl = 380 * ease.inOutCubic(seg(t, 0.2, 1.2))
      ctx.beginPath(); ctx.moveTo(W / 2 - rl, 206); ctx.lineTo(W / 2 + rl, 206); ctx.stroke()
      ctx.fillStyle = A.C.gold; ctx.beginPath(); ctx.arc(W / 2, 206, 3, 0, TAU); ctx.fill()
      ctx.restore()

      geo.FORMS.forEach((F, k) => {
        const col = k % COLS, row = Math.floor(k / COLS)
        const x0 = (W - COLS * COL_W) / 2 + col * COL_W, y0 = TOP + row * ROW_H
        const cx = x0 + COL_W / 2, cy = y0 + ROW_H / 2 - 24
        const st = 0.25 + k * 0.13
        const prog = seg(t, st, st + 2.0)
        const appear = ease.outCubic(seg(t, st - 0.15, st + 0.4))

        // cell frame: hairline corner ticks
        ctx.save()
        ctx.globalAlpha = 0.28 * appear; ctx.strokeStyle = A.C.label3; ctx.lineWidth = 1
        const m = 12, tk = 16
        ctx.beginPath()
        for (const [px, py, sx, sy] of [[x0 + m, y0 + m, 1, 1], [x0 + COL_W - m, y0 + m, -1, 1], [x0 + m, y0 + ROW_H - m, 1, -1], [x0 + COL_W - m, y0 + ROW_H - m, -1, -1]]) {
          ctx.moveTo(px, py + sy * tk); ctx.lineTo(px, py); ctx.lineTo(px + sx * tk, py)
        }
        ctx.stroke(); ctx.restore()
        A.text(ctx, String(k + 1).padStart(2, '0'), x0 + 30, y0 + 34, { size: 12, font: 'mono', color: A.C.label3, alpha: 0.9 * appear, align: 'left', spacing: 0.1 })

        const o = { t, progress: prog, rot: (SPIN[F.id] || 0) * t, glow: 0.6 }
        if (F.id === 'phyllotaxis') o.rot = -t * 0.05
        F.draw(ctx, cx, cy, FORM, o)

        // labels
        let note = F.note
        if (F.id === 'platonic' && geo.platonicAt) note = geo.platonicAt(t)
        A.text(ctx, F.name.toUpperCase(), cx, y0 + ROW_H - 52, { size: 17, font: 'mono', weight: 700, spacing: 0.14, color: A.C.bone, alpha: appear })
        A.text(ctx, note.toUpperCase(), cx, y0 + ROW_H - 29, { size: 11.5, font: 'mono', spacing: 0.1, color: A.C.label2, alpha: 0.85 * appear })
      })

      // footer mantra
      A.text(ctx, 'ALIGN  ✦  ALIGN  ✦  ALIGN', W / 2, H - 34, { size: 13, font: 'mono', spacing: 0.4, color: A.C.gold, alpha: 0.5 * ti })
    },
  })
})()
