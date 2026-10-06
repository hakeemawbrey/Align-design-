/* Teaser 1 · 04 · End card (12–15 s): "<SIGN> × ALIGN".
 * Lockup slams in on the downbeat, the rest builds on eighth notes, everything settled by
 * ~1.1 s, then a clean hold and a 0.3 s fade to paper. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.end
  const K = A.signTeaser
  const CX = 540
  const MARK_Y = 520, NAME_Y = 790, X_Y = 905, ALIGN_Y = 1020, LINE_Y = 1235, SOON_Y = 1335

  A.registerScene({
    id: 'sign-end', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t, dur }) {
      const hit = 1 - ease.outExpo(seg(t, 0, 0.4))
      const fade = 1 - seg(t, dur - 0.3, dur)
      const alive = seg(t, 0, 0.05) // fade guard for the first frame

      /* ---- fx ---- */
      K.cut(t, 0.55, mixHex(K.col, '#ffffff', 0.4))
      A.fx.shake = 16 * (1 - seg(t, 0, 0.2))
      if (fade < 1) { A.fx.flash = 1 - fade; A.fx.flashColor = '#07040f' }

      /* ---- background ---- */
      A.stars(bg, t, { alpha: 0.6, count: 220, seed: 150 + K.idx })
      A.galaxy(bg, t, {
        cx: 640, cy: 760, scale: 980, rot: 1.2 + K.idx * 0.35 + 0.08 * t + 0.6 * hit,
        tilt: 0.55, tiltAngle: -0.35, tint: K.col, tintAmt: 0.5, alpha: 0.5,
      })
      K.glow(bg, CX, MARK_Y, 260, K.col, 0.18)
      K.hush(bg, CX, MARK_Y, 150, 150, 0.6)
      K.hush(bg, CX, 905, 560, 280, 0.95)
      K.hush(bg, CX, 1285, 520, 140, 0.92)

      /* ---- mark with its ALIGN ring ---- */
      const mA = ease.outCubic(seg(t, 0.25, 0.6))
      K.ring(fg, CX, MARK_Y, 132, A.C.gold, 0.06 * t, { alpha: 0.85 * mA, size: 17 })
      A.alignMark(fg, CX, MARK_Y, 150, { lit: 7 * ease.outCubic(seg(t, 0.25, 0.8)), progress: mA, alpha: mA })

      /* ---- lockup ---- */
      const spacing = lerp(0.3, 0.55, hit)
      const ns = K.fit(K.name, { max: 160, maxW: 790, spacing: 0.3 })
      A.text(fg, K.name, CX, NAME_Y - 12 * hit, { size: ns * (1 + 0.1 * hit), spacing, color: K.ink })
      const xa = ease.outCubic(seg(t, 0.25, 0.45))
      fg.save(); fg.strokeStyle = rgba(A.C.gold, 0.7 * xa); fg.lineWidth = 1.5
      const lw = 120 * xa
      fg.beginPath(); fg.moveTo(CX - 40 - lw, X_Y); fg.lineTo(CX - 40, X_Y); fg.moveTo(CX + 40, X_Y); fg.lineTo(CX + 40 + lw, X_Y); fg.stroke(); fg.restore()
      A.text(fg, '×', CX, X_Y - 4, { size: 64, color: A.C.gold, alpha: xa, weight: 400 })
      A.text(fg, 'ALIGN', CX, ALIGN_Y + 12 * hit, { size: 170 * (1 + 0.1 * hit), spacing, color: A.C.bone })

      /* ---- lines ---- */
      const la = ease.outCubic(seg(t, 0.5, 0.8))
      A.text(fg, 'Find who you align with.', CX, LINE_Y + 10 * (1 - la), { size: 66, italic: true, weight: 400, color: A.C.bone, alpha: la })
      const sa = ease.outCubic(seg(t, 0.75, 1.05))
      A.text(fg, 'COMING SOON', CX, SOON_Y, { size: 30, font: 'mono', spacing: 0.5, color: A.C.gold, alpha: sa, weight: 700 })
      A.text(fg, 'THE ZODIAC DATING APP', CX, SOON_Y + 50, { size: 22, font: 'mono', spacing: 0.5, color: A.C.bone, alpha: 0.8 * sa, weight: 400 })
      void alive; void clamp; void TAU
    },
  })
})()
