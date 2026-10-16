/* Teaser 2 · "Two skies" — 04 end card (17–20 s).
 * The Align mark with its heart dot glowing rub pink on the heartbeat, ring of ALIGN,
 * wordmark, tagline, COMING SOON. Everything is in by ~1.1 s, held, then the last 0.3 s fades. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, rgba, mixHex, TAU } = A
  const TL = A.TL
  const L = A.love
  const S = TL.end
  const MY = 790

  A.registerScene({
    id: 'love-end', start: S.start, duration: S.duration,
    draw({ bg, fg, t, T }) {
      const pu = L.lubdub(T - TL.hit, L.BEAT)
      const inn = ease.outCubic(seg(t, 0, 0.5))

      /* background: the merged sky, calmer, behind the mark */
      A.fx.halftoneCell = 8
      A.stars(bg, T, { alpha: 0.55, count: 220, seed: 22 })
      A.galaxy(bg, T, { cx: 540, cy: MY, scale: lerp(400, 600, inn), rot: 0.4 + T * 0.14, tilt: 0.62, tiltAngle: -0.42, alpha: 0.34, tint: L.colA, tintAmt: 0.45, density: 0.4 })
      A.galaxy(bg, T, { cx: 540, cy: MY, scale: lerp(390, 590, inn), rot: 2.9 + T * 0.14, tilt: 0.62, tiltAngle: -0.42, alpha: 0.34, tint: L.colB, tintAmt: 0.45, density: 0.4 })
      L.glow(bg, 540, MY, 420, L.RUB, 0.16 + 0.06 * pu)
      const dg = bg.createRadialGradient(540, MY, 0, 540, MY, 300)
      dg.addColorStop(0, 'rgba(0,0,0,0.72)'); dg.addColorStop(0.75, 'rgba(0,0,0,0.45)'); dg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = dg; bg.fillRect(240, MY - 300, 600, 600)
      const tg = bg.createLinearGradient(0, 1080, 0, 1540)
      tg.addColorStop(0, 'rgba(0,0,0,0)'); tg.addColorStop(0.3, 'rgba(0,0,0,0.6)'); tg.addColorStop(0.8, 'rgba(0,0,0,0.6)'); tg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = tg; bg.fillRect(0, 1080, 1080, 460)

      /* the mark, heart dot glowing pink */
      const ms = lerp(0.7, 1, ease.outBack(seg(t, 0, 0.45))) * (1 + 0.012 * pu)
      const size = 400 * ms
      A.alignMark(fg, 540, MY, size, { lit: 7, glow: 1.2, lw: 2.4, strokeAlpha: 0.85, color: '#ecdff2', progress: ease.outCubic(seg(t, 0, 0.5)), alpha: inn })
      // heart dot = alignMark's dot 3, which sits exactly on the centre
      const k = size / 88
      L.glow(fg, 540, MY, k * (16 + 10 * pu), L.RUB, (0.55 + 0.4 * pu) * inn)
      fg.fillStyle = rgba(mixHex(L.HEART, L.RUB, 0.65), inn)
      fg.beginPath(); fg.arc(540, MY, 3.7 * k * (1 + 0.18 * pu), 0, TAU); fg.fill()
      fg.fillStyle = rgba('#ffffff', 0.85 * inn)
      fg.beginPath(); fg.arc(540 - k * 0.8, MY - k * 0.8, 1.3 * k, 0, TAU); fg.fill()

      // ring of ALIGN around the mark
      const ra = ease.outCubic(seg(t, 0.1, 0.6))
      A.ringOfWords(fg, 'ALIGN', 540, MY, 262 * lerp(0.92, 1, ra), { size: 24, font: 'mono', weight: 700, color: L.GOLD, alpha: 0.8 * ra, start: -0.4 - T * 0.1, sep: '  ✦  ', spacing: 0.1 })
      fg.save(); fg.strokeStyle = rgba(L.GOLD, 0.35 * ra); fg.lineWidth = 1.2
      fg.beginPath(); fg.arc(540, MY, 236, 0, TAU); fg.stroke()
      fg.beginPath(); fg.arc(540, MY, 288, 0, TAU); fg.stroke()
      fg.restore()

      // the pair, small, above
      L.pair(fg, 540, 420, 46, { gap: 50, alpha: ease.outCubic(seg(t, 0.2, 0.6)) * 0.95, glow: 0.4, lw: 2.6 })

      /* wordmark */
      const word = 'ALIGN', sz = 164
      const track = lerp(0.18, 0.34, ease.outCubic(seg(t, 0.2, 1.0)))
      fg.font = `600 ${sz}px ${A.FONT.serif}`
      const ws = [...word].map((c) => fg.measureText(c).width)
      const sp = sz * track
      const total = ws.reduce((a, b) => a + b, 0) + sp * 4
      let x = 540 - total / 2
      for (let i = 0; i < 5; i++) {
        const lt = ease.outCubic(seg(t, 0.2 + i * 0.05, 0.6 + i * 0.05))
        if (lt > 0) A.text(fg, word[i], x + ws[i] / 2, 1180 + (1 - lt) * 36, { size: sz, weight: 600, color: L.BONE, alpha: lt })
        x += ws[i] + sp
      }
      const hl = ease.inOutCubic(seg(t, 0.55, 0.95))
      fg.fillStyle = rgba(L.RUB, 0.9)
      fg.fillRect(540 - 36 * hl, 1282, 72 * hl, 2)

      const tgA = ease.outCubic(seg(t, 0.6, 1.0))
      L.inked(fg, () => {
        A.text(fg, 'Find who you align with.', 540, 1360 + (1 - tgA) * 18, { size: 64, italic: true, weight: 400, color: L.BONE, alpha: tgA })
      })
      const lb = ease.outCubic(seg(t, 0.75, 1.1))
      A.text(fg, 'COMING SOON  ·  THE ZODIAC DATING APP', 540, 1452, { size: 24, font: 'mono', weight: 700, color: L.GOLD, spacing: 0.2, alpha: lb })

      /* fade the last 0.3 s */
      const fade = ease.inQuad(seg(t, S.duration - 0.3, S.duration))
      if (fade > 0) { A.fx.flash = fade; A.fx.flashColor = '#07040f' }
      if (t < 0.12) { A.fx.flash = 0.35 * (1 - t / 0.12); A.fx.flashColor = '#ffe8ef' }
    },
  })
})()
