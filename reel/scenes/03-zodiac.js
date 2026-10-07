/* Scene 03 — the zodiac wheel (17–23 s). "The twelve signs line up."
 * First half: an astrolabe of rings spins over the halftone galaxy; the twelve glyphs pop in,
 * two per beat; seven chakra-planets orbit the centre. Second half: everything eases to a stop,
 * the planets fall into one vertical line (the Align column), a beam runs down it, and ALIGN stamps. */
(function () {
  const A = window.ALIGN
  const slot = (A.TL && A.TL.zodiac) || { start: 17, duration: 6 }
  const { seg, ease, clamp, lerp, rgba, TAU } = A

  const CX = 540, CY = 960
  const R_OUT_TXT = 466, R_OUT1 = 444, R_OUT2 = 490
  const R_TICK0 = 404, R_TICK1 = 436
  const R_SIGN = 346, R_BAND0 = 292, R_BAND1 = 400
  const R_IN_TXT = 266, R_IN = 246
  const SP = 76 // column spacing between chakra dots
  const ORBIT = [3, 2, 1, 0, 1, 2, 3].map((k) => k * SP) // root..crown orbit radii; pairs line up on ±90°
  const FINAL = [90, 90, 90, 0, -90, -90, -90].map((d) => (d * Math.PI) / 180) // root below centre, crown above
  const OMEGA = [0.9, -1.25, 1.7, 0, -2.1, 1.45, -1.05] // rad per (eased) second
  const T1 = 2.6, T2 = 3.6 // rotations ease to a stop
  const T_BEAM = 3.6, T_STAMP = 4.0
  const BEAM0 = CY - R_OUT2 - 10, BEAM1 = CY + R_OUT2 + 10
  const GOLD = A.C.gold, BONE = A.C.bone

  /** eased clock: runs at 1x until T1, then decelerates to 0 at T2 (velocity continuous) */
  function clock(t) {
    const u = seg(t, T1, T2)
    return Math.min(t, T1) + (T2 - T1) * (u - u * u + (u * u * u) / 3)
  }
  const CLOCK_END = T1 + (T2 - T1) / 3

  function ticks(ctx, rot, alpha) {
    ctx.save()
    ctx.translate(CX, CY)
    ctx.rotate(rot)
    ctx.strokeStyle = rgba(BONE, 0.55 * alpha)
    ctx.lineCap = 'butt'
    for (let d = 0; d < 360; d += 2) {
      const a = (d * Math.PI) / 180
      const long = d % 30 === 0, mid = d % 10 === 0
      const r0 = long ? R_TICK0 - 6 : mid ? R_TICK0 + 8 : R_TICK0 + 18
      ctx.lineWidth = long ? 2.4 : mid ? 1.6 : 1
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0)
      ctx.lineTo(Math.cos(a) * R_TICK1, Math.sin(a) * R_TICK1)
      ctx.stroke()
    }
    ctx.restore()
  }

  function circle(ctx, r, color, lw, prog = 1, start = -Math.PI / 2) {
    if (prog <= 0) return
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lw
    ctx.arc(CX, CY, r, start, start + TAU * prog)
    ctx.stroke()
  }

  /** ALIGN with the I centred exactly on x, so the chakra column runs through it */
  function alignOnI(ctx, x, y, size, o = {}) {
    ctx.save()
    ctx.font = `${o.weight || 600} ${size}px ${A.FONT.serif}`
    const sp = (o.spacing || 0.3) * size
    const w = (s) => ctx.measureText(s).width
    ctx.restore()
    const wI = w('I')
    const left = x - wI / 2 - sp, right = x + wI / 2 + sp
    const base = { size, font: 'serif', weight: o.weight || 600, color: o.color, alpha: o.alpha, spacing: o.spacing || 0.3, stroke: o.stroke, strokeWidth: o.strokeWidth, strokeOnly: o.strokeOnly }
    A.text(ctx, 'AL', left, y, { ...base, align: 'right' })
    A.text(ctx, 'I', x, y, { ...base, color: o.iColor || o.color })
    A.text(ctx, 'GN', right, y, { ...base, align: 'left' })
  }

  function planet(ctx, x, y, i, r, alpha, flare) {
    const c = A.CHAKRA_COLORS[i]
    ctx.save()
    ctx.globalAlpha *= alpha
    const R = r * (3.4 + flare * 2.5)
    const g = ctx.createRadialGradient(x, y, 0, x, y, R)
    g.addColorStop(0, rgba(c, 0.85)); g.addColorStop(0.4, rgba(c, 0.3)); g.addColorStop(1, rgba(c, 0))
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill()
    const core = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
    core.addColorStop(0, '#ffffff'); core.addColorStop(0.45, c); core.addColorStop(1, c)
    ctx.fillStyle = core
    ctx.beginPath(); ctx.arc(x, y, r * (1 + flare * 0.4), 0, TAU); ctx.fill()
    ctx.restore()
  }

  A.registerScene({
    id: 'zodiac',
    start: slot.start,
    duration: slot.duration,
    draw({ bg, fg, t, W, H }) {
      const Z = A.zodiac
      const beat = Math.floor(t / 0.5)
      const beatT = t - beat * 0.5
      const kick = Math.exp(-beatT * 9) // decays after every beat
      const k = clock(t)
      const stamp = seg(t, T_STAMP, T_STAMP + 0.18)
      const after = t >= T_STAMP
      const sinceStamp = t - T_STAMP
      const intro = ease.outCubic(seg(t, 0, 0.45))

      /* ---------------- background: the halftone galaxy ---------------- */
      A.galaxy(bg, t, {
        cx: CX, cy: CY, scale: 640 + 40 * intro, rot: 0.6 + k * 0.32, tilt: 0.86, tiltAngle: 0.2,
        alpha: 0.5 + 0.12 * kick * (t < T2 ? 1 : 0), density: 0.6,
      })
      // core glow — swells as things align, peaks on the stamp
      const coreAmt = 0.25 + 0.4 * seg(t, T1, T2) + 0.6 * Math.exp(-Math.max(0, sinceStamp) * 4) * (after ? 1 : 0)
      {
        const g = bg.createRadialGradient(CX, CY, 0, CX, CY, 330)
        g.addColorStop(0, rgba('#fff2dc', coreAmt)); g.addColorStop(0.35, rgba('#b48cff', coreAmt * 0.5)); g.addColorStop(1, 'rgba(0,0,0,0)')
        bg.save(); bg.globalCompositeOperation = 'lighter'; bg.fillStyle = g; bg.fillRect(0, 0, W, H); bg.restore()
      }
      // the beam, as a wide column of light in the halftone
      const beamP = ease.inOutCubic(seg(t, T_BEAM, T_STAMP))
      if (beamP > 0) {
        const y0 = BEAM0, yHead = lerp(y0, BEAM1, beamP)
        const wide = 34 + 60 * Math.exp(-Math.max(0, sinceStamp) * 3) * (after ? 1 : 0)
        const g = bg.createLinearGradient(CX - wide, 0, CX + wide, 0)
        g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, rgba('#fff6e6', 0.85)); g.addColorStop(1, 'rgba(0,0,0,0)')
        bg.save(); bg.globalCompositeOperation = 'lighter'; bg.fillStyle = g; bg.fillRect(CX - wide, y0, wide * 2, yHead - y0); bg.restore()
      }
      // keep the type legible: carve a soft dark slot behind the stamped word
      if (after) {
        const g = bg.createRadialGradient(CX, CY, 0, CX, CY, 420)
        g.addColorStop(0, rgba('#000000', 0.55 * stamp)); g.addColorStop(1, 'rgba(0,0,0,0)')
        bg.save(); bg.setTransform(1, 0, 0, 0.42, 0, CY * 0.58); bg.fillStyle = g; bg.fillRect(0, 0, W, H * 2.5); bg.restore()
      }

      /* ---------------- foreground: the astrolabe ---------------- */
      const dim = after ? lerp(1, 0.45, ease.outCubic(seg(sinceStamp, 0, 0.4))) : 1
      const rotOuter = 0.4 + k * 0.22 // ring text turns one way…
      const rotInner = -0.3 - k * 0.3 // …the inner ring the other
      const rotSigns = (CLOCK_END - k) * ((-30 * Math.PI) / 180 / CLOCK_END) // lands with Aries at 12 o'clock

      fg.save()
      fg.lineCap = 'round'
      // ring scaffold draws in
      const ringP = ease.outCubic(seg(t, 0, 0.5))
      // ink plates under the ring text and the sign band, so the type reads over the galaxy
      fg.save()
      fg.fillStyle = rgba('#07040f', 0.62 * ringP * dim)
      for (const [r0, r1] of [[R_OUT1, R_OUT2], [R_BAND0, R_BAND1], [R_IN, R_BAND0 - 6], [0, R_IN]]) {
        fg.globalAlpha = r0 === 0 ? 0.45 : 1
        fg.beginPath(); fg.arc(CX, CY, r1, 0, TAU); fg.arc(CX, CY, r0, 0, TAU, true); fg.fill()
      }
      fg.restore()
      circle(fg, R_OUT2, rgba(BONE, 0.5 * dim), 1.5, ringP)
      circle(fg, R_OUT1, rgba(BONE, 0.5 * dim), 1.5, ringP, Math.PI / 2)
      circle(fg, R_BAND1, rgba(GOLD, 0.7 * dim), 2, ringP)
      circle(fg, R_BAND0, rgba(GOLD, 0.7 * dim), 2, ringP, Math.PI / 2)
      circle(fg, R_IN, rgba(BONE, 0.35 * dim), 1.2, ringP)
      // the beat pulses the outer band
      if (kick > 0.05 && t < T2) circle(fg, R_OUT2 + 10 + 30 * (1 - kick), rgba(GOLD, 0.5 * kick), 2)

      // outer ring of ALIGN ✦
      fg.save()
      fg.globalAlpha = intro * dim
      A.ringOfWords(fg, 'ALIGN', CX, CY, R_OUT_TXT, { size: 25, font: 'mono', weight: 700, spacing: 0.32, color: after ? GOLD : BONE, start: rotOuter, sep: '  ✦  ' })
      fg.restore()
      // inner ring, counter-rotating serif
      fg.save()
      fg.globalAlpha = intro * 0.85 * dim
      A.ringOfWords(fg, 'ALIGN', CX, CY, R_IN_TXT, { size: 22, font: 'serif', weight: 500, spacing: 0.5, color: GOLD, start: rotInner, sep: ' · ' })
      fg.restore()

      // astrolabe degree ticks + band dividers (turn with the signs)
      ticks(fg, rotSigns, intro * dim)
      fg.save()
      fg.translate(CX, CY)
      fg.rotate(rotSigns)
      fg.strokeStyle = rgba(GOLD, 0.55 * dim * intro)
      fg.lineWidth = 1.5
      for (let i = 0; i < 12; i++) {
        const a = -Math.PI / 2 + (i + 0.5) * (TAU / 12)
        fg.beginPath()
        fg.moveTo(Math.cos(a) * R_BAND0, Math.sin(a) * R_BAND0)
        fg.lineTo(Math.cos(a) * R_BAND1, Math.sin(a) * R_BAND1)
        fg.stroke()
      }
      fg.restore()

      // centre: one constellation per beat while the signs arrive
      if (t < T2) {
        const ci = Math.min(11, beat * 2 + (beatT >= 0.25 ? 1 : 0))
        const local = t - ci * 0.25
        const ca = clamp(local / 0.08) * (1 - 0.5 * seg(t, T1, T2)) * (t < 3 ? 1 : 1 - seg(t, 3, T2))
        Z.constellation(fg, ci, CX, CY, 330, { progress: ease.outCubic(seg(local, 0, 0.22)), alpha: 0.95 * ca, color: A.mixHex(Z.SIGNS[ci].color, '#ffffff', 0.4), lw: 2 })
      }

      // the twelve glyphs, two per beat
      for (let i = 0; i < 12; i++) {
        const t0 = i * 0.25
        const lp = t - t0
        if (lp < 0) continue
        const a = -Math.PI / 2 + i * (TAU / 12) + rotSigns
        const x = CX + Math.cos(a) * R_SIGN, y = CY + Math.sin(a) * R_SIGN
        const pop = ease.outBack(seg(lp, 0, 0.22))
        const hot = Math.exp(-lp * 5)
        const sc = Z.SIGNS[i].color
        const isTop = after && i === 0
        const side = after && (i === 3 || i === 9) ? 1 - 0.85 * ease.outCubic(seg(sinceStamp, 0, 0.2)) : 1
        // plate
        fg.save()
        fg.globalAlpha = dim
        fg.fillStyle = rgba(sc, 0.18 * hot)
        fg.beginPath(); fg.arc(x, y, 44 * pop, 0, TAU); fg.fill()
        fg.restore()
        Z.glyph(fg, i, x, y, 62 * (0.6 + 0.4 * pop), {
          color: A.mixHex(isTop ? GOLD : BONE, sc, hot * 0.9),
          progress: ease.outCubic(seg(lp, 0, 0.28)),
          alpha: (after && !isTop ? dim + 0.15 : 1) * side,
          glow: hot * 1.2 + (isTop ? 0.6 : 0),
          glowColor: sc,
        })
      }

      // orbits + the seven chakra-planets
      const lockP = seg(t, T1, T2)
      for (let r of [SP, 2 * SP, 3 * SP]) circle(fg, r, rgba(BONE, 0.16 * intro * (1 - 0.6 * lockP) * dim), 1)
      const pos = []
      for (let i = 0; i < 7; i++) {
        const th = FINAL[i] - OMEGA[i] * (CLOCK_END - k)
        pos.push([CX + Math.cos(th) * ORBIT[i], CY + Math.sin(th) * ORBIT[i]])
      }
      // the column line appears as they lock
      if (lockP > 0.6) {
        const la = seg(lockP, 0.6, 1)
        fg.strokeStyle = rgba(BONE, 0.5 * la)
        fg.lineWidth = 1.5
        fg.beginPath(); fg.moveTo(CX, CY - 3 * SP - 40); fg.lineTo(CX, CY + 3 * SP + 40); fg.stroke()
      }
      // beam: a hot white line racing down the column
      if (beamP > 0) {
        const y0 = BEAM0, yHead = lerp(y0, BEAM1, beamP)
        fg.save()
        fg.globalCompositeOperation = 'lighter'
        const fade = after ? Math.max(0.35, Math.exp(-sinceStamp * 2.5)) : 1
        for (const [w, a] of [[26, 0.12], [10, 0.3], [3, 0.95]]) {
          fg.strokeStyle = rgba('#fff6e6', a * fade)
          fg.lineWidth = w
          fg.beginPath(); fg.moveTo(CX, y0); fg.lineTo(CX, yHead); fg.stroke()
        }
        // head spark
        if (beamP < 1) {
          const g = fg.createRadialGradient(CX, yHead, 0, CX, yHead, 60)
          g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)')
          fg.fillStyle = g; fg.fillRect(CX - 60, yHead - 60, 120, 120)
        }
        fg.restore()
      }
      const yHeadNow = lerp(BEAM0, BEAM1, beamP)
      for (let i = 0; i < 7; i++) {
        const [x, y] = pos[i]
        const passed = beamP > 0 ? clamp((yHeadNow - y) / 120) : 0
        const flare = passed * Math.exp(-Math.max(0, t - (T_BEAM + (y - BEAM0) / (BEAM1 - BEAM0) * 0.4)) * 5) + (after ? 0.3 * Math.exp(-sinceStamp * 3) : 0)
        if (!(after && i === 3)) planet(fg, x, y, i, i === 3 ? 13 : 11, intro, flare)
        if (A.chakra && A.chakra.draw && passed > 0 && i !== 3) {
          A.chakra.draw(fg, i, x, y, 30, { color: A.CHAKRA_COLORS[i], lw: 1.6, progress: passed, alpha: 0.9 * (after ? 0.8 : 1) })
        }
      }

      /* ---------------- the stamp ---------------- */
      if (after) {
        const s = ease.outExpo(stamp)
        const size = 150 * lerp(1.22, 1, s) * (1 + 0.025 * sinceStamp)
        // ink band behind the word
        {
          const g = fg.createLinearGradient(0, CY - 78, 0, CY + 78)
          g.addColorStop(0, 'rgba(7,4,15,0)'); g.addColorStop(0.28, 'rgba(7,4,15,0.8)'); g.addColorStop(0.72, 'rgba(7,4,15,0.8)'); g.addColorStop(1, 'rgba(7,4,15,0)')
          fg.fillStyle = g
          fg.fillRect(CX - 420, CY - 78, 840, 156)
        }
        // echoes ripple outward on each beat after the stamp
        for (let e = 0; e < 3; e++) {
          const et = sinceStamp - e * 0.5
          if (et < 0) continue
          const ep = ease.outCubic(seg(et, 0, 0.6))
          if (ep >= 1) continue
          alignOnI(fg, CX, CY, 150 * (1.08 + ep * 1.1), { strokeOnly: true, stroke: rgba(GOLD, 0.7 * (1 - ep)), strokeWidth: 1.5, spacing: 0.3, color: 'rgba(0,0,0,0)' })
        }
        fg.save()
        fg.globalAlpha = 1
        alignOnI(fg, CX, CY + 4, size, { color: BONE, iColor: '#ffffff', spacing: 0.3 })
        fg.restore()
        A.fx.flash = 0.6 * Math.exp(-sinceStamp * 9)
        A.fx.flashColor = '#fff3dc'
        A.fx.shake = 26 * Math.exp(-sinceStamp * 7)
      }
      fg.restore()

      /* ---------------- copy above and below the wheel ---------------- */
      fg.save()
      fg.shadowColor = 'rgba(5,3,15,0.9)'
      fg.shadowBlur = 16
      // top line
      const topA = intro * (1 - seg(t, T2 - 0.2, T2))
      A.text(fg, 'the twelve signs line up', CX, 392, { size: 50, italic: true, weight: 400, color: BONE, alpha: topA, spacing: 0.02 })
      if (after) A.text(fg, 'and so do you', CX, 392, { size: 50, italic: true, weight: 400, color: BONE, alpha: clamp(sinceStamp / 0.3), spacing: 0.02 })
      A.text(fg, 'XII · THE ZODIAC', CX, 330, { size: 20, font: 'mono', color: GOLD, spacing: 0.4, alpha: topA * 0.9 })

      // bottom: the sign ticker, then the caption
      if (t < T1 + 0.4) {
        const si = Math.min(11, Math.floor(t / 0.25))
        const fa = clamp((t - si * 0.25) / 0.06) * (1 - seg(t, T1, T1 + 0.4))
        const S = Z.SIGNS[si]
        Z.glyph(fg, si, CX, 1548, 40, { color: GOLD, alpha: fa })
        A.text(fg, S.name.toUpperCase(), CX, 1612, { size: 40, weight: 500, spacing: 0.32, color: BONE, alpha: fa })
        A.text(fg, `${S.dates.toUpperCase()}  ·  ${S.element.toUpperCase()}`, CX, 1662, { size: 20, font: 'mono', spacing: 0.18, color: A.C.label2, alpha: fa })
      }
      if (t > T2) {
        const ca = ease.outCubic(seg(t, T2 + 0.1, T2 + 0.5))
        A.text(fg, '12 SIGNS  ·  7 CENTERS  ·  1 ALIGNMENT', CX, 1570 + 10 * (1 - ca), { size: 24, font: 'mono', weight: 700, spacing: 0.14, color: BONE, alpha: ca })
        A.text(fg, 'ALIGN', CX, 1628, { size: 22, font: 'mono', spacing: 0.9, color: GOLD, alpha: ca * 0.8 })
      }
      fg.restore()
    },
  })
})()
