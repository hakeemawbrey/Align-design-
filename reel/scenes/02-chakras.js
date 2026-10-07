/* 02 · Chakras (3–17 s): seven 2-second beats, root → crown.
 * Each beat: hard cut on the downbeat, halftone galaxy tinted to the chakra, the flat
 * printed mandala centred, bija mantra above and ALIGN below, a ring of ALIGN text,
 * a pulse on the off-beat, and a seven-dot column on the left that climbs. The crown
 * is the release: white-violet thousand-petal lotus, the column turns into the six
 * symbols below it, rays open out. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.chakras
  const EACH = TL.each || 2
  const CX = 540, CY = 960
  const SIGN_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  const SIGN_UNI = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
  const ROMAN = ['01', '02', '03', '04', '05', '06', '07']
  // galaxy framing per beat so every cut lands somewhere new
  const GAL = [
    { cx: 540, cy: 980, scale: 760, rot: 0.2, spin: 0.22, tilt: 0.66, ta: 0.35 },
    { cx: 380, cy: 900, scale: 900, rot: 2.1, spin: -0.2, tilt: 0.55, ta: -0.5 },
    { cx: 700, cy: 1050, scale: 820, rot: 4.0, spin: 0.26, tilt: 0.72, ta: 0.9 },
    { cx: 540, cy: 860, scale: 980, rot: 1.3, spin: -0.24, tilt: 0.6, ta: -0.2 },
    { cx: 420, cy: 1080, scale: 860, rot: 5.2, spin: 0.24, tilt: 0.5, ta: 0.6 },
    { cx: 660, cy: 920, scale: 940, rot: 3.1, spin: -0.22, tilt: 0.68, ta: -0.85 },
    { cx: 540, cy: 960, scale: 1150, rot: 0.6, spin: 0.3, tilt: 0.8, ta: 0.15 },
  ]
  const COL_X = 66, COL_Y0 = 1236, COL_DY = 92 // chakra column, root at the bottom

  const info = (i) => (A.chakra ? A.chakra.INFO[i] : { name: '', sanskrit: '', bija: '', planet: '', signs: [], ink: A.CHAKRA_COLORS[i] })
  const inkOf = (i) => (i === 6 ? '#e6d4ff' : info(i).ink || A.CHAKRA_COLORS[i])

  function glow(ctx, x, y, r, col, a, sy = 1) {
    if (a <= 0 || r <= 0) return
    ctx.save()
    ctx.translate(x, y); ctx.scale(1, sy)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.45, rgba(col, a * 0.4)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g
    ctx.fillRect(-r, -r, r * 2, r * 2)
    ctx.restore()
  }
  /** soft dark pool on bg so type reads over the halftone */
  function hush(ctx, x, y, rx, ry, a) {
    ctx.save()
    ctx.translate(x, y); ctx.scale(1, ry / rx)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
    g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.6, `rgba(0,0,0,${a * 0.8})`); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = g
    ctx.fillRect(-rx, -rx, rx * 2, rx * 2)
    ctx.restore()
  }

  /* ---------- mono label with inline zodiac glyphs ---------- */
  // items: strings, or { sign: i }
  function label(ctx, items, x, y, o = {}) {
    const size = o.size || 24, sp = (o.spacing == null ? 0.22 : o.spacing) * size
    const gw = size * 1.25
    ctx.save()
    ctx.font = `400 ${size}px ${A.FONT.mono}`
    const widths = items.map((it) => (typeof it === 'string' ? [...it].reduce((s, c) => s + ctx.measureText(c).width + sp, 0) : gw + sp))
    const total = widths.reduce((a, b) => a + b, 0) - sp
    const reveal = o.reveal == null ? 1 : o.reveal
    let budget = Math.floor(reveal * items.reduce((s, it) => s + (typeof it === 'string' ? it.length : 1), 0))
    let cx = x - total / 2
    ctx.restore()
    items.forEach((it, k) => {
      if (budget <= 0) return
      if (typeof it === 'string') {
        const s = it.slice(0, budget)
        budget -= it.length
        A.text(ctx, s, cx, y, { size, font: 'mono', spacing: sp / size, color: o.color, alpha: o.alpha, align: 'left', weight: 400 })
      } else {
        budget -= 1
        const gx = cx + gw / 2
        if (A.zodiac && A.zodiac.glyph) A.zodiac.glyph(ctx, it.sign, gx, y, size * 1.05, { color: o.glyphColor || o.color, lw: Math.max(1.6, size * 0.08), alpha: o.alpha })
        else A.text(ctx, SIGN_UNI[it.sign] + '︎', gx, y, { size: size * 1.05, font: 'mono', color: o.glyphColor || o.color, alpha: o.alpha, weight: 400 })
      }
      cx += widths[k]
    })
  }

  /* ---------- chakra column ---------- */
  function column(fg, i, u) {
    const top = COL_Y0 - 6 * COL_DY
    fg.save()
    fg.strokeStyle = rgba(A.C.bone, 0.22); fg.lineWidth = 1.5
    fg.beginPath(); fg.moveTo(COL_X, COL_Y0 + 26); fg.lineTo(COL_X, top - 26); fg.stroke()
    // the lit section of the spine climbs to the current centre
    const climb = lerp(i - 1, i, ease.outCubic(seg(u, 0, 0.35)))
    if (climb > 0) {
      const g = fg.createLinearGradient(0, COL_Y0, 0, top)
      for (let k = 0; k < 7; k++) g.addColorStop(k / 6, A.CHAKRA_COLORS[k])
      fg.strokeStyle = g; fg.lineWidth = 3
      fg.beginPath(); fg.moveTo(COL_X, COL_Y0); fg.lineTo(COL_X, COL_Y0 - climb * COL_DY); fg.stroke()
    }
    for (let k = 0; k < 7; k++) {
      const y = COL_Y0 - k * COL_DY
      const c = A.CHAKRA_COLORS[k]
      if (i === 6 && k < 6 && A.chakra) {
        // crown: the column becomes the six symbols, lighting in a fast cascade
        const a = ease.outCubic(seg(u, 0.05 + k * 0.06, 0.3 + k * 0.06))
        fg.fillStyle = '#07040f'; fg.beginPath(); fg.arc(COL_X, y, 30, 0, TAU); fg.fill()
        A.chakra.draw(fg, k, COL_X, y, 34, { color: mixHex(c, '#ffffff', 0.25), alpha: 0.35 + 0.55 * a, progress: 0.4 + 0.6 * a, lw: 1.6, rot: u * 0.2 })
        continue
      }
      if (k < i) {
        fg.fillStyle = rgba(c, 0.85); fg.beginPath(); fg.arc(COL_X, y, 7, 0, TAU); fg.fill()
      } else if (k === i) {
        const pulse = 1 + 0.25 * Math.exp(-Math.pow((u - 1) / 0.12, 2)) + 0.5 * (1 - ease.outCubic(seg(u, 0, 0.3)))
        const halo = fg.createRadialGradient(COL_X, y, 0, COL_X, y, 34 * pulse)
        halo.addColorStop(0, rgba(c, 0.75)); halo.addColorStop(0.4, rgba(c, 0.25)); halo.addColorStop(1, rgba(c, 0))
        fg.fillStyle = halo; fg.beginPath(); fg.arc(COL_X, y, 34 * pulse, 0, TAU); fg.fill()
        fg.fillStyle = mixHex(c, '#ffffff', 0.35); fg.beginPath(); fg.arc(COL_X, y, 11 * pulse, 0, TAU); fg.fill()
        fg.strokeStyle = rgba(c, 0.9); fg.lineWidth = 1.5; fg.beginPath(); fg.arc(COL_X, y, 19 * pulse, 0, TAU); fg.stroke()
      } else {
        fg.fillStyle = '#07040f'; fg.beginPath(); fg.arc(COL_X, y, 6, 0, TAU); fg.fill()
        fg.strokeStyle = rgba(A.C.bone, 0.4); fg.lineWidth = 1.5; fg.beginPath(); fg.arc(COL_X, y, 6, 0, TAU); fg.stroke()
      }
    }
    if (i === 6) {
      const y = top, c = A.CHAKRA_COLORS[6]
      const halo = fg.createRadialGradient(COL_X, y, 0, COL_X, y, 46)
      halo.addColorStop(0, rgba('#ffffff', 0.9)); halo.addColorStop(0.3, rgba(c, 0.5)); halo.addColorStop(1, rgba(c, 0))
      fg.fillStyle = halo; fg.beginPath(); fg.arc(COL_X, y, 46, 0, TAU); fg.fill()
    }
    fg.restore()
  }

  A.registerScene({
    id: 'chakras', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const i = Math.min(6, Math.floor(t / EACH))
      const u = t - i * EACH // seconds into this beat
      const I = info(i)
      const ink = inkOf(i)
      const crown = i === 6
      const G = GAL[i]

      /* ---- the cut ---- */
      if (u < 1 / 30) { A.fx.flash = 0.5; A.fx.flashColor = ink }
      else if (u < 2 / 30) { A.fx.flash = 0.2; A.fx.flashColor = ink }
      A.fx.shake = 12 * (1 - seg(u, 0, 0.17))
      if (crown) A.fx.halftoneCell = 8
      const hit = 1 - ease.outCubic(seg(u, 0, 0.42)) // 1 at the cut → 0
      const off = u >= 1 ? 1 - ease.outCubic(seg(u, 1, 1.4)) : 0 // the off-beat pulse

      const R = crown ? 350 : 370
      const rr = R + 46 // ring-of-words radius
      /* ---- background ---- */
      A.stars(bg, t, { alpha: 0.7, count: 220, seed: 40 + i })
      const tint = crown ? '#efe4ff' : I.color
      A.galaxy(bg, t, {
        cx: G.cx, cy: G.cy, scale: G.scale * (1 + 0.08 * hit + 0.02 * u), rot: G.rot + G.spin * u + Math.sign(G.spin) * 0.5 * ease.outExpo(seg(u, 0, 0.8)),
        tilt: G.tilt, tiltAngle: G.ta, tint, tintAmt: crown ? 0.5 : 0.62, alpha: [0.82, 0.82, 0.6, 0.78, 0.8, 0.82, 0.62][i] + 0.1 * off,
      })
      glow(bg, CX, CY, 560 + 80 * off, I.color, crown ? 0.22 : 0.16)
      if (crown) glow(bg, CX, CY, 300 + 500 * ease.outCubic(seg(u, 0, 1.4)), '#ffffff', 0.4 * (1 - seg(u, 0, 1.6)))
      // a quieter well behind the yantra so the inner geometry reads
      hush(bg, CX, CY, R * 0.62, R * 0.62, crown ? 0.7 : 0.5)
      if (crown) hush(bg, CX, CY, R * 1.25, R * 1.25, 0.45)
      // a dark lane for the chakra column
      {
        const gl = bg.createLinearGradient(COL_X - 60, 0, COL_X + 60, 0)
        gl.addColorStop(0, 'rgba(0,0,0,0)'); gl.addColorStop(0.5, 'rgba(0,0,0,0.8)'); gl.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = gl; bg.fillRect(COL_X - 60, COL_Y0 - 6 * COL_DY - 80, 120, 6 * COL_DY + 160)
      }
      // a dark orbit track for the ring text
      {
        const ga = bg.createRadialGradient(CX, CY, rr - 70, CX, CY, rr + 70)
        ga.addColorStop(0, 'rgba(0,0,0,0)'); ga.addColorStop(0.5, 'rgba(0,0,0,0.85)'); ga.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = ga; bg.fillRect(CX - rr - 80, CY - rr - 80, (rr + 80) * 2, (rr + 80) * 2)
      }
      // keep the type zones quiet
      hush(bg, CX, 405, 520, 150, 0.92)
      hush(bg, CX, 1500, 480, 140, 0.9)
      hush(bg, CX, 238, 420, 60, 0.8)
      hush(bg, CX, 1612, 520, 70, 0.85)

      /* ---- foreground ---- */
      const RS = i === 5 ? R * 1.12 : R // the third eye's wings run wide
      const punch = 1 + 0.13 * hit * hit + 0.045 * off
      const dir = i % 2 ? -1 : 1
      const rot = dir * (0.04 + 0.075 * u) - dir * 0.18 * hit

      // rays for the crown's release
      if (crown) {
        const rp = ease.outCubic(seg(u, 0.1, 1.2))
        fg.save()
        fg.translate(CX, CY); fg.rotate(-u * 0.05)
        for (let k = 0; k < 48; k++) {
          const a = (k / 48) * TAU
          const vert = Math.pow(Math.abs(Math.sin(a)), 3) // keep the rays clear of the words above and below
          const r0 = R + 70, r1 = R + 70 + (k % 2 ? 90 : 190) * rp * (1 - 0.85 * vert)
          fg.strokeStyle = rgba(ink, (k % 2 ? 0.28 : 0.5) * rp)
          fg.lineWidth = k % 2 ? 1 : 1.6
          fg.beginPath(); fg.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); fg.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); fg.stroke()
        }
        fg.restore()
      }

      // ring of ALIGN text between two hairlines
      fg.save()
      fg.strokeStyle = rgba(ink, 0.5); fg.lineWidth = 1.2
      fg.beginPath(); fg.arc(CX, CY, rr - 22, 0, TAU); fg.stroke()
      fg.beginPath(); fg.arc(CX, CY, rr + 22, 0, TAU); fg.stroke()
      A.ringOfWords(fg, 'ALIGN', CX, CY, rr, { size: 21, spacing: 0.3, color: ink, alpha: 1, font: 'mono', weight: 400, start: -dir * 0.12 * u - i * 0.45 + 0.25 * hit })
      fg.restore()

      // off-beat ripple: a line echo of the symbol breathing outwards
      if (A.chakra && u >= 1) {
        const e = ease.outCubic(seg(u, 1, 1.7))
        A.chakra.draw(fg, i, CX, CY, RS * punch * (1 + 0.3 * e), { color: ink, alpha: 0.75 * (1 - e), lw: 2, rot })
      }
      // cut-in ghost: a line version slamming in from larger
      if (A.chakra && hit > 0.02) A.chakra.draw(fg, i, CX, CY, RS * (1 + 0.45 * hit), { color: ink, alpha: 0.6 * hit, lw: 2.5, rot: rot + 0.1 * hit })

      // the mandala
      if (A.chakra) {
        A.chakra.draw(fg, i, CX, CY, RS * punch, { fill: true, color: ink, rot, progress: 0.3 + 0.7 * ease.outCubic(seg(u, 0, 0.55)) })
      }

      // mantra above, ALIGN below
      const spc = lerp(0.62, 0.36, ease.outExpo(seg(u, 0, 0.6)))
      const wordY = 412 - 14 * hit
      const word = crown ? 'ALIGN' : I.bija
      A.text(fg, word, CX, wordY, { size: 132, font: 'serif', weight: 500, spacing: spc, color: ink })
      const belowY = 1500 + 14 * hit
      if (crown) A.text(fg, 'ALIGN', CX, belowY, { size: 132, font: 'serif', weight: 500, spacing: spc, color: ink, stroke: ink, strokeWidth: 2, strokeOnly: true })
      else A.text(fg, 'ALIGN', CX, belowY, { size: 132, font: 'serif', weight: 500, spacing: spc, color: ink })

      // labels
      const rev = ease.outQuad(seg(u, 0.04, 0.45))
      label(fg, [`${ROMAN[i]} · ${I.name.toUpperCase()} · ${I.sanskrit.toUpperCase()}`], CX, 238, { size: 24, color: A.C.bone, alpha: 0.9, reveal: rev })
      fg.save(); fg.strokeStyle = rgba(ink, 0.6); fg.lineWidth = 1.5
      const lw2 = 70 * ease.outCubic(seg(u, 0.1, 0.5))
      fg.beginPath(); fg.moveTo(CX - lw2, 274); fg.lineTo(CX + lw2, 274); fg.stroke(); fg.restore()
      if (!crown) {
        const items = [I.planet.toUpperCase(), '   ']
        I.signs.forEach((s, k) => { if (k) items.push('  '); items.push({ sign: s }, ' ' + SIGN_NAMES[s].toUpperCase()) })
        label(fg, items, CX, 1612, { size: 24, color: A.C.bone, glyphColor: ink, alpha: 0.9, reveal: rev })
      } else {
        label(fg, ['BEYOND THE PLANETS · ALL TWELVE SIGNS'], CX, 1596, { size: 22, color: A.C.bone, alpha: 0.9, reveal: rev })
        for (let k = 0; k < 12; k++) {
          const a = ease.outCubic(seg(u, 0.25 + k * 0.04, 0.45 + k * 0.04))
          const x = CX + (k - 5.5) * 62
          if (a <= 0) continue
          if (A.zodiac && A.zodiac.glyph) A.zodiac.glyph(fg, k, x, 1648, 30, { color: mixHex(A.CHAKRA_COLORS[k % 7], '#ffffff', 0.35), lw: 2, alpha: a })
          else A.text(fg, SIGN_UNI[k] + '︎', x, 1648, { size: 30, font: 'mono', color: ink, alpha: a, weight: 400 })
        }
      }

      column(fg, i, u)
    },
  })
})()
