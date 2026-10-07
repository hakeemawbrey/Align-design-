/* 05 · Outro (27–31 s): the point of light becomes the Align mark. Wordmark, tagline,
 * end card held clean (cover / loop frame), then a soft fade to black for the loop. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, rgba, TAU } = A
  const TL = A.TL.outro
  const CX = 540, MY = 790

  function glow(ctx, x, y, r, col, a) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.35, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  A.registerScene({
    id: 'outro', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const burst = ease.outCubic(seg(t, 0, 0.6))
      const breath = 1 + 0.018 * Math.sin(t * Math.PI) // one slow breath every 2 s

      /* background: calm galaxy + stars */
      A.stars(bg, t, { alpha: 0.6, count: 220, seed: 5 })
      A.galaxy(bg, t, { cx: CX, cy: MY, scale: lerp(120, 620, burst), rot: 0.6 + t * 0.12 + (1 - burst) * 2, alpha: lerp(0.9, 0.36, ease.outQuad(seg(t, 0, 1.2))), tilt: 0.62, tiltAngle: -0.42, density: 0.75 })
      glow(bg, CX, MY, 420, '#9a7be0', 0.22)
      const dg = bg.createRadialGradient(CX, MY, 0, CX, MY, 300)
      dg.addColorStop(0, `rgba(0,0,0,${0.7 * burst})`); dg.addColorStop(0.75, `rgba(0,0,0,${0.45 * burst})`); dg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = dg; bg.fillRect(CX - 300, MY - 300, 600, 600)
      glow(bg, CX, MY, lerp(500, 120, burst), '#fff6ea', 1 - burst)

      /* the mark */
      const ms = lerp(0.55, 1, ease.outBack(seg(t, 0, 0.55))) * breath
      const size = 420 * ms
      // shock ring as it bursts out of the point
      const sr = seg(t, 0, 0.7)
      if (sr < 1) {
        fg.strokeStyle = rgba(A.C.bone, 0.8 * (1 - sr)); fg.lineWidth = 3
        fg.beginPath(); fg.arc(CX, MY, 40 + ease.outCubic(sr) * 640, 0, TAU); fg.stroke()
      }
      A.alignMark(fg, CX, MY, size, { lit: 7, glow: 1.25 + 0.15 * Math.sin(t * Math.PI), lw: 2.4, strokeAlpha: 0.85, color: '#e6dcf7', progress: 1 })

      // slow ring of ALIGN ✦ around the mark, between two hairlines
      const ra = ease.outCubic(seg(t, 0.15, 0.8))
      A.ringOfWords(fg, 'ALIGN', CX, MY, 262 * lerp(0.9, 1, ra), { size: 24, font: 'mono', weight: 700, color: A.C.gold, alpha: 0.8 * ra, start: -0.4 - t * 0.12, sep: '  ✦  ', spacing: 0.1 })
      fg.save(); fg.strokeStyle = rgba(A.C.gold, 0.35 * ra); fg.lineWidth = 1.2
      fg.beginPath(); fg.arc(CX, MY, 236, 0, TAU); fg.stroke()
      fg.beginPath(); fg.arc(CX, MY, 288, 0, TAU); fg.stroke()
      fg.restore()

      /* wordmark: letters rise in, tracking eases open */
      const word = 'ALIGN', sz = 168
      const track = lerp(0.12, 0.34, ease.outCubic(seg(t, 0.35, 1.4)))
      fg.font = `600 ${sz}px ${A.FONT.serif}`
      const ws = [...word].map((c) => fg.measureText(c).width)
      const sp = sz * track
      const total = ws.reduce((a, b) => a + b, 0) + sp * 4
      let x = CX - total / 2 + sp / 2 // optical: trailing tracking re-centred
      for (let i = 0; i < 5; i++) {
        const lt = ease.outCubic(seg(t, 0.4 + i * 0.07, 0.85 + i * 0.07))
        if (lt > 0) A.text(fg, word[i], x + ws[i] / 2, 1185 + (1 - lt) * 40, { size: sz, weight: 600, color: A.C.bone, alpha: lt })
        x += ws[i] + sp
      }
      const hl = ease.inOutCubic(seg(t, 0.9, 1.4))
      fg.fillStyle = rgba(A.C.gold, 0.85)
      fg.fillRect(CX - 36 * hl, 1290, 72 * hl, 2)

      /* tagline + label */
      const tg = ease.outCubic(seg(t, 1.0, 1.5))
      A.text(fg, 'Find who you align with.', CX, 1365 + (1 - tg) * 20, { size: 66, italic: true, weight: 400, color: A.C.bone, alpha: tg })
      const lb = ease.outCubic(seg(t, 1.25, 1.7))
      A.text(fg, 'THE ZODIAC DATING APP', CX, 1460, { size: 26, font: 'mono', weight: 700, color: A.C.gold, spacing: 0.42, alpha: lb })

      /* loop: fade toward black over the last ~0.3 s */
      const fade = ease.inQuad(seg(t, 3.68, 4.0))
      if (fade > 0) { A.fx.flash = fade; A.fx.flashColor = '#07040f' }
      if (t < 0.1) { A.fx.flash = 0.55 * (1 - t / 0.1); A.fx.flashColor = '#fff6ea' }
    },
  })
})()
