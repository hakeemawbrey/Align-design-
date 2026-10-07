/* Launch teaser · 02 The sky opens (7.5–10 s).
 * The seven chakra dots fly from the side column and snap into one centred column (the
 * Align mark), collapse to a point, white burst. "THE SKY OPENS", then the launch date
 * (ALIGN.TL.date) or SOON, huge in gold, with the twelve zodiac glyphs blooming around it. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.opens
  const CX = 540, CY = 960
  const INK = '#07040f'
  const CC = A.CHAKRA_COLORS
  const COL_X = 46, COL_Y0 = 1290, COL_DY = 96 // matches 01-countdown
  const SNAP = 0.32, BURST = 0.5 // seconds into the scene
  const SIGN_UNI = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

  const dateStr = () => {
    const d = String((A.TL && A.TL.date) || '').trim().toUpperCase()
    return d || 'SOON'
  }
  function glow(ctx, x, y, r, col, a) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.35, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  function hush(ctx, x, y, rx, ry, a) {
    ctx.save(); ctx.translate(x, y); ctx.scale(1, ry / rx)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
    g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.6, `rgba(0,0,0,${a * 0.8})`); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g; ctx.fillRect(-rx, -rx, rx * 2, rx * 2); ctx.restore()
  }
  function measure(ctx, str, size, o = {}) {
    ctx.save(); ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 500} ${size}px ${A.FONT[o.font || 'serif']}`
    const sp = (o.spacing || 0) * size
    const w = [...str].reduce((s, c) => s + ctx.measureText(c).width + sp, 0) - sp
    ctx.restore(); return w
  }
  /** gold foil gradient spanning [x0,x1], sheen offset by `ph` */
  function foil(ctx, x0, x1, ph) {
    const w = x1 - x0
    const g = ctx.createLinearGradient(x0 - w + ph * 2 * w, 0, x0 + w + ph * 2 * w, 0)
    const stops = ['#a9802e', '#f2c75c', '#fff4cf', '#f2c75c', '#b88a2c', '#f2d784', '#a9802e', '#f2c75c', '#fff4cf', '#f2c75c', '#b88a2c']
    stops.forEach((c, k) => g.addColorStop(k / (stops.length - 1), c))
    return g
  }
  function sign(ctx, i, x, y, size, o) {
    if (A.zodiac && A.zodiac.glyph) A.zodiac.glyph(ctx, i, x, y, size, o)
    else A.text(ctx, SIGN_UNI[i] + '︎', x, y, { size, font: 'mono', color: o.color, alpha: o.alpha })
  }

  A.registerScene({
    id: 'opens', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t, T }) {
      const D = dateStr()
      const soon = D === 'SOON'

      /* ---------- 1 · snap: seven dots into the Align column ---------- */
      if (t < BURST) {
        const s = ease.inOutCubic(seg(t, 0, SNAP))
        const c = ease.inCubic(seg(t, SNAP + 0.04, BURST)) // collapse into the point
        A.stars(bg, T, { alpha: 0.5, count: 180, seed: 12 })
        A.galaxy(bg, T, { scale: lerp(900, 300, s) * (1 - 0.8 * c), rot: T * 0.4 + s * 3 + c * 8, alpha: 0.6 + 0.4 * s, tilt: lerp(0.6, 0.95, s), tint: '#fff1d6', tintAmt: 0.3 })
        glow(bg, CX, CY, 260 + 300 * c, '#fff4e8', 0.35 + 0.6 * c)
        // first frame: hard cut with the crown colour still in the air
        if (t < 1 / 30) { A.fx.flash = 0.45; A.fx.flashColor = CC[6] }
        const step = lerp(COL_DY, 64, s) * (1 - c)
        // the spine
        fg.save()
        const top = CY - 3 * step, bot = CY + 3 * step
        if (s > 0.6) {
          const g = fg.createLinearGradient(0, bot, 0, top)
          for (let k = 0; k < 7; k++) g.addColorStop(k / 6, CC[k])
          fg.strokeStyle = g; fg.lineWidth = 3; fg.globalAlpha = seg(s, 0.6, 1)
          fg.beginPath(); fg.moveTo(CX, bot + 30 * (1 - c)); fg.lineTo(CX, top - 30 * (1 - c)); fg.stroke()
        }
        fg.restore()
        for (let k = 0; k < 7; k++) {
          const sk = ease.outBack(seg(t, k * 0.025, SNAP - 0.06 + k * 0.01))
          const x0 = COL_X, y0 = COL_Y0 - k * COL_DY
          const x1 = CX, y1 = CY + (3 - k) * step
          const x = lerp(x0, x1, sk), y = lerp(y0, y1, sk)
          // motion streak
          if (sk > 0.02 && sk < 0.98) {
            fg.save(); fg.strokeStyle = rgba(CC[k], 0.6); fg.lineWidth = 6; fg.lineCap = 'round'
            fg.beginPath(); fg.moveTo(lerp(x0, x1, Math.max(0, sk - 0.25)), lerp(y0, y1, Math.max(0, sk - 0.25))); fg.lineTo(x, y); fg.stroke(); fg.restore()
          }
          glow(fg, x, y, 60, CC[k], 0.85)
          fg.fillStyle = mixHex(CC[k], '#ffffff', 0.35); fg.beginPath(); fg.arc(x, y, 13 * (1 - 0.5 * c), 0, TAU); fg.fill()
        }
        // seed-of-life rings draw around the column as it locks
        if (s > 0.85) A.flowerOfLife(fg, CX, CY, 150 * (1 - c), { rings: 1, outer: true, lw: 2, color: A.C.bone, alpha: 0.7 * (1 - c), progress: seg(t, SNAP - 0.04, SNAP + 0.1) })
        // snap click
        if (t >= SNAP && t < SNAP + 2 / 30) { A.fx.flash = 0.3; A.fx.flashColor = '#ffffff'; A.fx.shake = 14 }
        A.text(fg, 'ALIGN', CX, 1560, { size: 30, font: 'mono', weight: 700, spacing: lerp(1.2, 0.5, s), color: A.C.bone, alpha: 0.8 })
        glow(fg, CX, CY, 40 + 260 * c, '#ffffff', c)
        A.fx.shake = Math.max(A.fx.shake, 20 * c)
        return
      }

      /* ---------- 2 · burst and reveal ---------- */
      const u = t - BURST // 0 … 2.0
      const burst = 1 - ease.outCubic(seg(u, 0, 0.45))
      A.fx.flash = 0.95 * burst
      A.fx.flashColor = '#ffffff'
      A.fx.shake = 30 * burst
      A.fx.halftoneCell = Math.round(lerp(18, 10, ease.outCubic(seg(u, 0, 0.8))))

      // bg: galaxy blown open, gold
      A.stars(bg, T, { alpha: 0.8, count: 260, seed: 21 })
      A.galaxy(bg, T, { scale: lerp(300, 1050, ease.outExpo(seg(u, 0, 1.2))), rot: T * 0.5 + 2 * ease.outExpo(seg(u, 0, 1)), alpha: 0.5, density: 0.7, tilt: 0.82, tiltAngle: 0.2, tint: A.C.gold, tintAmt: 0.72 })
      glow(bg, CX, CY, 700, A.C.gold, 0.22)
      hush(bg, CX, CY, 400, 300, 0.95)
      hush(bg, CX, 260, 300, 110, 0.9)
      hush(bg, CX, 1650, 540, 170, 0.92)
      // a dark track for the glyph ring
      {
        const rr = 430
        const ga = bg.createRadialGradient(CX, CY, rr - 80, CX, CY, rr + 80)
        ga.addColorStop(0, 'rgba(0,0,0,0)'); ga.addColorStop(0.5, 'rgba(0,0,0,0.8)'); ga.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = ga; bg.fillRect(CX - rr - 90, CY - rr - 90, (rr + 90) * 2, (rr + 90) * 2)
      }

      // fg: rays
      const rp = ease.outCubic(seg(u, 0, 0.9))
      fg.save(); fg.translate(CX, CY); fg.rotate(u * 0.06)
      for (let k = 0; k < 72; k++) {
        const a = (k / 72) * TAU
        const r0 = 570, r1 = 570 + (k % 3 ? 40 : 90) * rp
        fg.strokeStyle = rgba(k % 6 === 0 ? CC[(k / 6) % 7] : A.C.gold, (k % 3 ? 0.3 : 0.6) * rp)
        fg.lineWidth = k % 3 ? 1 : 2
        fg.beginPath(); fg.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); fg.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); fg.stroke()
      }
      fg.restore()

      // ring of the twelve signs blooming outward
      const ringR = lerp(120, 430, ease.outBack(seg(u, 0.05, 0.75)))
      fg.save()
      fg.strokeStyle = rgba(A.C.gold, 0.5 * rp); fg.lineWidth = 1.2
      fg.beginPath(); fg.arc(CX, CY, ringR - 58, 0, TAU); fg.stroke()
      fg.beginPath(); fg.arc(CX, CY, ringR + 58, 0, TAU); fg.stroke()
      fg.restore()
      for (let k = 0; k < 12; k++) {
        const a = -Math.PI / 2 + (k / 12) * TAU + u * 0.12
        const pk = ease.outCubic(seg(u, 0.08 + k * 0.035, 0.5 + k * 0.035))
        if (pk <= 0) continue
        const x = CX + Math.cos(a) * ringR, y = CY + Math.sin(a) * ringR
        const tw = Math.exp(-Math.pow((u - 1.1 - k * 0.04) / 0.08, 2)) // a sparkle chasing round the ring
        sign(fg, k, x, y, 62 * (0.6 + 0.4 * pk), { color: mixHex(A.C.gold, '#ffffff', 0.25 + 0.6 * tw), lw: 3.2, progress: pk, glow: 0.6 + tw })
      }
      // tiny ALIGN ring outside
      A.ringOfWords(fg, 'ALIGN', CX, CY, 520 + 30 * burst, { size: 20, font: 'mono', weight: 700, spacing: 0.3, color: A.C.bone, alpha: 0.75 * rp, sep: ' ✦ ', start: -u * 0.15 })

      // THE SKY OPENS
      const tr = ease.outCubic(seg(u, 0.12, 0.6))
      A.text(fg, 'THE SKY OPENS', CX, CY - 150, { size: 38, font: 'serif', weight: 500, spacing: lerp(0.9, 0.42, tr), color: A.C.bone, alpha: tr })

      // the date, or SOON, huge in gold
      const dr = ease.outBack(seg(u, 0.3, 0.75))
      if (dr > 0) {
        const base = soon ? 230 : 200
        const sp = soon ? 0.1 : 0.06
        const w0 = measure(fg, D, base, { weight: 600, spacing: sp })
        const size = Math.min(base, (base * 640) / w0)
        const s = lerp(1.6, 1, dr)
        const ph = (u * 0.35) % 1
        fg.save(); fg.translate(CX, CY + 40); fg.scale(s, s)
        fg.globalAlpha = clamp(dr * 1.5)
        const w = measure(fg, D, size, { weight: 600, spacing: sp })
        A.text(fg, D, 6, 8, { size, weight: 600, spacing: sp, color: rgba(INK, 0.85) })
        A.text(fg, D, 0, 0, { size, weight: 600, spacing: sp, color: foil(fg, -w / 2, w / 2, ph) })
        fg.restore()
        // outline echo stepping out once
        const e = ease.outCubic(seg(u, 0.75, 1.3))
        if (e > 0 && e < 1) {
          fg.save(); fg.translate(CX, CY + 40); fg.scale(1 + 0.25 * e, 1 + 0.25 * e)
          A.text(fg, D, 0, 0, { size, weight: 600, spacing: sp, color: A.C.gold, stroke: A.C.gold, strokeWidth: 2, strokeOnly: true, alpha: 0.7 * (1 - e) })
          fg.restore()
        }
        if (u > 0.3 && u < 0.3 + 2 / 30) { A.fx.shake = Math.max(A.fx.shake, 22) }
      }
      const lr = ease.outCubic(seg(u, 0.55, 0.9))
      A.text(fg, '✦  ALIGN  ✦', CX, CY + 175, { size: 22, font: 'mono', weight: 700, spacing: 0.5, color: A.C.gold, alpha: lr })

      // top: the Align mark lit, bottom: ALIGN
      const mr = ease.outCubic(seg(u, 0.2, 0.7))
      A.alignMark(fg, CX, 262, 120, { lit: 7 * mr, progress: mr, alpha: mr })
      const ar = ease.outExpo(seg(u, 0.4, 1.0))
      A.text(fg, 'ALIGN', CX, 1610, { size: 120, weight: 500, spacing: lerp(0.9, 0.4, ar), color: A.C.bone, alpha: ar })
      A.text(fg, 'TWELVE SIGNS · SEVEN CENTERS · ONE SKY', CX, 1712, { size: 20, font: 'mono', weight: 400, spacing: 0.3, color: A.C.bone, alpha: 0.7 * ar })
      // tail: a beat-pulse on 9.0 and 9.5
      for (const bt of [1.0, 1.5]) {
        const q = u - bt
        if (q >= 0 && q < 2 / 30) { A.fx.flash = Math.max(A.fx.flash, 0.12); A.fx.flashColor = A.C.gold }
      }
    },
  })
})()
