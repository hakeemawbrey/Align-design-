/* Vortex teaser · 03 Emerge (16–20 s): we burst out of the fire into calm indigo space.
 * The seven forms collapse into the Align mark, the wordmark and "Fall into alignment." land,
 * the end card holds clean, then fades for the loop. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, TAU } = A
  const V = A.vortex
  const TL = A.TL.emerge
  const IDS = A.TL.chapters
  const CX = 540, MY = 760

  A.registerScene({
    id: 'vx-emerge', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t, T }) {
      A.fx.halftone = true
      A.fx.halftoneCell = 5
      const P = V.pal(16)
      const settle = ease.outCubic(seg(t, 0.1, 1.6))

      /* background: the wormhole blows past us, the familiar galaxy opens */
      A.stars(bg, t, { alpha: 0.7 * seg(t, 0.2, 0.8), count: 240, seed: 9 })
      if (t > 0.1) A.galaxy(bg, t, { cx: CX, cy: MY, scale: lerp(1500, 640, settle), rot: 0.9 + t * 0.12 + (1 - settle) * 1.6, alpha: lerp(0.95, 0.4, ease.outQuad(seg(t, 0.1, 1.8))) * seg(t, 0.1, 0.4), tilt: 0.62, tiltAngle: -0.42, density: 0.7 })
      const ex = seg(t, 0, 0.75)
      if (ex < 1) V.bg(bg, T, { exit: ease.inQuad(ex), alpha: 1 - ease.inQuad(ex), p: P })
      V.glow(bg, CX, MY, 440, A.C.violet, 0.24 * seg(t, 0.4, 1.2))
      const dg = bg.createRadialGradient(CX, MY, 0, CX, MY, 300)
      const dk = seg(t, 0.9, 1.4)
      dg.addColorStop(0, `rgba(0,0,0,${0.7 * dk})`); dg.addColorStop(0.75, `rgba(0,0,0,${0.45 * dk})`); dg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = dg; bg.fillRect(CX - 300, MY - 300, 600, 600)

      /* the last form (golden spiral) flies past as we break through */
      V.chapter(fg, IDS.length - 1, T)

      /* all seven forms circle in and collapse into the mark (lands on the 17.0 beat) */
      const c = seg(t, 0.3, 1.0)
      if (c > 0 && c < 1) {
        for (let j = 0; j < IDS.length; j++) {
          const a = (j / IDS.length) * TAU - Math.PI / 2 + ease.inCubic(c) * 2.2
          const R = 470 * (1 - ease.inCubic(c))
          const sz = lerp(230, 110, ease.inQuad(c))
          const al = ease.outCubic(seg(t, 0.3, 0.5)) * (1 - ease.inQuad(seg(c, 0.75, 1)))
          V.drawForm(fg, IDS[j], CX + Math.cos(a) * R, MY + Math.sin(a) * R, sz, { progress: 1, color: j % 2 ? A.C.gold : A.C.bone, color2: A.C.violet, lw: 1.8, alpha: al, rot: c * 1.5, t: T })
        }
      }
      // convergence: flash + shock ring
      if (t >= 1.0) {
        const k = seg(t, 1.0, 1.7)
        if (k < 1) { fg.save(); fg.strokeStyle = rgba(A.C.bone, 0.8 * (1 - k)); fg.lineWidth = 3; fg.beginPath(); fg.arc(CX, MY, 40 + ease.outCubic(k) * 640, 0, TAU); fg.stroke(); fg.restore() }
        if (t < 1.15) { A.fx.flash = 0.35 * (1 - (t - 1) / 0.15); A.fx.flashColor = '#efe6d6' }
      }

      /* the mark */
      const mk = seg(t, 0.95, 1.5)
      if (mk > 0) {
        const breath = 1 + 0.018 * Math.sin(t * Math.PI)
        const size = 410 * lerp(0.55, 1, ease.outBack(mk)) * breath
        A.alignMark(fg, CX, MY, size, { lit: 7 * ease.outQuad(seg(t, 1.05, 1.75)), glow: 1.25 + 0.15 * Math.sin(t * Math.PI), lw: 2.4, strokeAlpha: 0.85, color: '#e6dcf7', progress: ease.outCubic(mk), alpha: ease.outQuad(seg(t, 0.95, 1.1)) })
      }
      const ra = ease.outCubic(seg(t, 1.1, 1.7))
      if (ra > 0) {
        A.ringOfWords(fg, 'ALIGN', CX, MY, 262 * lerp(0.9, 1, ra), { size: 24, font: 'mono', weight: 700, color: A.C.gold, alpha: 0.8 * ra, start: -0.4 - t * 0.12, sep: '  ✦  ', spacing: 0.1 })
        fg.save(); fg.strokeStyle = rgba(A.C.gold, 0.35 * ra); fg.lineWidth = 1.2
        fg.beginPath(); fg.arc(CX, MY, 236, 0, TAU); fg.stroke()
        fg.beginPath(); fg.arc(CX, MY, 288, 0, TAU); fg.stroke()
        fg.restore()
      }

      /* the mirror of the hook line */
      const tl = ease.outCubic(seg(t, 1.45, 1.9))
      A.text(fg, '…TO WHERE YOU ALIGN', CX, 400 + (1 - tl) * 12, { size: 26, font: 'mono', weight: 700, color: A.C.label2, spacing: 0.45, alpha: tl })

      /* wordmark */
      const word = 'ALIGN', sz = 160
      const track = lerp(0.14, 0.34, ease.outCubic(seg(t, 1.3, 2.1)))
      fg.font = `600 ${sz}px ${A.FONT.serif}`
      const ws = [...word].map((ch) => fg.measureText(ch).width)
      const sp = sz * track
      const total = ws.reduce((a, b) => a + b, 0) + sp * 4
      let x = CX - total / 2
      for (let i = 0; i < 5; i++) {
        const lt = ease.outCubic(seg(t, 1.3 + i * 0.06, 1.7 + i * 0.06))
        if (lt > 0) A.text(fg, word[i], x + ws[i] / 2, 1175 + (1 - lt) * 40, { size: sz, weight: 600, color: A.C.bone, alpha: lt })
        x += ws[i] + sp
      }
      const hl = ease.inOutCubic(seg(t, 1.7, 2.05))
      fg.fillStyle = rgba(A.C.gold, 0.85); fg.fillRect(CX - 36 * hl, 1275, 72 * hl, 2)

      const tg = ease.outCubic(seg(t, 1.65, 2.05))
      A.text(fg, 'Fall into alignment.', CX, 1350 + (1 - tg) * 20, { size: 70, italic: true, weight: 400, color: A.C.bone, alpha: tg })
      const lb = ease.outCubic(seg(t, 1.85, 2.15))
      A.text(fg, 'COMING SOON · THE ZODIAC DATING APP', CX, 1450, { size: 23, font: 'mono', weight: 700, color: A.C.gold, spacing: 0.3, alpha: lb })

      /* breakthrough flash, and the loop fade over the last 0.3 s */
      if (t < 0.3) { A.fx.flash = 0.9 * (1 - ease.outQuad(t / 0.3)); A.fx.flashColor = '#efe2ff'; A.fx.shake = 16 * (1 - t / 0.3) }
      const fade = ease.inQuad(seg(t, 3.7, 4.0))
      if (fade > 0) { A.fx.flash = fade; A.fx.flashColor = '#07040f' }
    },
  })
})()
