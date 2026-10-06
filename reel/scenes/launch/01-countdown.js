/* Launch teaser · 01 Countdown (0–7.5 s).
 * 0–0.5 lead-in: black, one point of light, "T – 7".
 * 0.5–7.5: numerals 7 → 1, one per beat-pair (1 s), each a hard cut, paired with the
 * chakras root → crown: flat-print mandala behind the numeral, galaxy tinted to the
 * chakra, the column at the side climbing, "07 · ROOT" label, ALIGN under the numeral.
 * Off-beat (+0.5 s): outline echo of the numeral, the ALIGN ✦ ring pulses.
 * Energy climbs: faster spin, chunkier screen, harder shake; 3, 2, 1 get a sub-flash on
 * the half beat (an inverted print frame), and 1 strobes on the 8ths. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.countdown
  const EACH = TL.each || 1
  const LEAD = 0.5
  const CX = 540, CY = 930
  const INK = '#07040f'
  const CC = A.CHAKRA_COLORS
  const NAMES = ['ROOT', 'SACRAL', 'SOLAR PLEXUS', 'HEART', 'THROAT', 'THIRD EYE', 'CROWN']
  const info = (i) => (A.chakra && A.chakra.INFO ? A.chakra.INFO[i] : { name: NAMES[i], sanskrit: '', ink: CC[i] })
  const inkOf = (i) => (i === 6 ? '#e2c8ff' : info(i).ink || CC[i])
  const COL_X = 70, COL_Y0 = 1290, COL_DY = 96 // chakra column, root at the bottom

  // galaxy framing per count so every cut lands somewhere new
  const GAL = [
    { cx: 540, cy: 1000, scale: 780, rot: 0.2, tilt: 0.62, ta: 0.35 },
    { cx: 360, cy: 880, scale: 900, rot: 2.1, tilt: 0.55, ta: -0.5 },
    { cx: 720, cy: 1060, scale: 840, rot: 4.0, tilt: 0.72, ta: 0.9 },
    { cx: 540, cy: 860, scale: 980, rot: 1.3, tilt: 0.6, ta: -0.2 },
    { cx: 420, cy: 1080, scale: 880, rot: 5.2, tilt: 0.5, ta: 0.6 },
    { cx: 660, cy: 920, scale: 960, rot: 3.1, tilt: 0.68, ta: -0.85 },
    { cx: 540, cy: 960, scale: 1150, rot: 0.6, tilt: 0.8, ta: 0.15 },
  ]

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

  /* ---- the numeral: sized by its real ink box so every digit stands ~700 px tall ---- */
  const NUM_H = 700
  const metricCache = {}
  function numMetrics(ctx, d) {
    if (metricCache[d]) return metricCache[d]
    ctx.save(); ctx.font = `600 1000px ${A.FONT.serif}`
    const m = ctx.measureText(d)
    ctx.restore()
    const h = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) || 700
    const r = { size: (1000 * NUM_H) / h, mid: (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2 / h * NUM_H, w: m.width * NUM_H / h }
    // only cache once the webfont has really loaded (Georgia fallback has other metrics)
    if (document.fonts && document.fonts.check(`600 100px 'EB Garamond'`)) metricCache[d] = r
    return r
  }
  /** draw digit d centred on (x,y). o: fill, stroke, lw, scale, alpha */
  function numeral(ctx, d, x, y, o) {
    const m = numMetrics(ctx, d)
    const s = o.scale || 1
    ctx.save()
    ctx.translate(x, y); ctx.scale(s, s)
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.font = `600 ${m.size}px ${A.FONT.serif}`
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
    ctx.lineJoin = 'round'
    const by = m.mid // baseline offset so the ink box is centred
    if (o.under) { ctx.strokeStyle = o.under; ctx.lineWidth = o.underW || 30; ctx.strokeText(d, 0, by) }
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fillText(d, 0, by) }
    if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = o.lw || 3; ctx.strokeText(d, 0, by) }
    ctx.restore()
  }

  /* ---- the chakra column at the side ---- */
  function column(fg, i, u, inv) {
    const top = COL_Y0 - 6 * COL_DY
    fg.save()
    fg.strokeStyle = inv ? rgba(INK, 0.4) : rgba(A.C.bone, 0.22); fg.lineWidth = 1.5
    fg.beginPath(); fg.moveTo(COL_X, COL_Y0 + 26); fg.lineTo(COL_X, top - 26); fg.stroke()
    const climb = lerp(i - 1, i, ease.outCubic(seg(u, 0, 0.25)))
    if (climb > 0) {
      const g = fg.createLinearGradient(0, COL_Y0, 0, top)
      for (let k = 0; k < 7; k++) g.addColorStop(k / 6, CC[k])
      fg.strokeStyle = inv ? INK : g; fg.lineWidth = 3
      fg.beginPath(); fg.moveTo(COL_X, COL_Y0); fg.lineTo(COL_X, COL_Y0 - climb * COL_DY); fg.stroke()
    }
    for (let k = 0; k < 7; k++) {
      const y = COL_Y0 - k * COL_DY
      const c = inv ? INK : CC[k]
      if (k < i) {
        fg.fillStyle = rgba(c, 0.9); fg.beginPath(); fg.arc(COL_X, y, 8, 0, TAU); fg.fill()
      } else if (k === i) {
        const pulse = 1 + 0.6 * (1 - ease.outCubic(seg(u, 0, 0.25))) + 0.25 * Math.exp(-Math.pow((u - 0.5) / 0.08, 2))
        if (!inv) glow(fg, COL_X, y, 46 * pulse, c, 0.8)
        fg.fillStyle = inv ? INK : mixHex(c, '#ffffff', 0.35); fg.beginPath(); fg.arc(COL_X, y, 12 * pulse, 0, TAU); fg.fill()
        fg.strokeStyle = rgba(c, 0.9); fg.lineWidth = 1.5; fg.beginPath(); fg.arc(COL_X, y, 21 * pulse, 0, TAU); fg.stroke()
      } else {
        fg.fillStyle = inv ? 'rgba(0,0,0,0)' : INK; fg.beginPath(); fg.arc(COL_X, y, 6, 0, TAU); fg.fill()
        fg.strokeStyle = inv ? rgba(INK, 0.5) : rgba(A.C.bone, 0.4); fg.lineWidth = 1.5; fg.beginPath(); fg.arc(COL_X, y, 6, 0, TAU); fg.stroke()
      }
    }
    // vertical ALIGN running up beside the column
    fg.translate(COL_X + 44, (COL_Y0 + top) / 2); fg.rotate(-Math.PI / 2)
    A.text(fg, 'ALIGN · ALIGN · ALIGN', 0, 0, { size: 16, font: 'mono', weight: 700, spacing: 0.5, color: inv ? INK : A.C.bone, alpha: 0.45 })
    fg.restore()
  }

  /* ---- lead-in ---- */
  function leadIn(bg, fg, t) {
    const a = ease.outCubic(seg(t, 0, 0.3))
    A.stars(bg, t, { alpha: 0.35 * a, count: 120, seed: 9 })
    glow(bg, CX, CY, 140 + 60 * t, '#fff4e8', 0.45 * a)
    const tw = 1 + 0.15 * Math.sin(t * 40)
    glow(fg, CX, CY, 70 * tw * a, '#fff8ee', 0.9)
    fg.fillStyle = '#ffffff'; fg.beginPath(); fg.arc(CX, CY, 5 * a, 0, TAU); fg.fill()
    // a hairline cross through the point
    fg.save(); fg.strokeStyle = rgba(A.C.bone, 0.35 * a); fg.lineWidth = 1
    const L = 160 * ease.outCubic(seg(t, 0.05, 0.4))
    fg.beginPath(); fg.moveTo(CX - L, CY); fg.lineTo(CX + L, CY); fg.moveTo(CX, CY - L); fg.lineTo(CX, CY + L); fg.stroke(); fg.restore()
    const rev = Math.floor(seg(t, 0.06, 0.3) * 5)
    A.text(fg, 'T – 7'.slice(0, rev), CX, CY + 150, { size: 40, font: 'mono', weight: 400, spacing: 0.35, color: A.C.bone })
    A.text(fg, 'ALIGN', CX, 1560, { size: 22, font: 'mono', weight: 700, spacing: 0.6, color: A.C.bone, alpha: 0.5 * a })
    // the pre-beat suck-in
    if (t > 0.4) A.fx.flash = 0.15 * seg(t, 0.4, 0.5)
  }

  /* ---- one count ---- */
  function count(bg, fg, k, u, t) {
    const n = 7 - k // numeral
    const i = k // chakra, root → crown
    const I = info(i)
    const ink = inkOf(i)
    const crown = i === 6
    const G = GAL[i]
    const energy = k / 6 // 0 → 1 as we approach 1
    const hit = 1 - ease.outCubic(seg(u, 0, 0.3))
    const off = u >= 0.5 ? 1 - ease.outCubic(seg(u, 0.5, 0.85)) : 0
    const hard = k >= 4 // 3, 2, 1 get the sub-flash
    const inv = hard && u >= 0.5 && u < 0.5 + 3 / 30 // inverted print frame on the half beat
    const strobe = crown && u >= 0.75 && u < 0.75 + 2 / 30 // 1 also hits the 8th

    /* the cut */
    if (u < 1 / 30) { A.fx.flash = 0.55 + 0.3 * energy; A.fx.flashColor = ink }
    else if (u < 2 / 30) { A.fx.flash = 0.22; A.fx.flashColor = ink }
    A.fx.shake = (10 + 26 * energy) * hit
    A.fx.halftoneCell = Math.round(9 + 7 * energy)

    const paper = inv || strobe
    const paperCol = strobe ? A.C.bone : ink
    if (paper) {
      bg.fillStyle = paperCol; bg.fillRect(0, 0, 1080, 1920); A.fx.halftone = false
      if (inv && u >= 0.5 + 2 / 30) { A.fx.flash = 0.25; A.fx.flashColor = '#ffffff' }
    } else {
      A.stars(bg, t, { alpha: 0.7, count: 200, seed: 40 + i })
      const spin = (0.4 + 2.2 * energy) * (i % 2 ? -1 : 1)
      A.galaxy(bg, t, {
        cx: G.cx, cy: G.cy, scale: G.scale * (1 + 0.12 * hit + 0.05 * u), rot: G.rot + spin * u + Math.sign(spin) * 0.6 * ease.outExpo(seg(u, 0, 0.6)),
        tilt: G.tilt, tiltAngle: G.ta, tint: crown ? '#efe4ff' : I.color, tintAmt: crown ? 0.5 : 0.62, alpha: 0.8 + 0.15 * off,
      })
      glow(bg, CX, CY, 600, I.color || CC[i], 0.16 + 0.1 * energy)
      hush(bg, CX, CY, 330, 400, 0.55) // a quieter well behind the numeral
      hush(bg, CX, 300, 460, 80, 0.85)
      hush(bg, CX, 1530, 520, 130, 0.9)
      hush(bg, CX, 1660, 480, 60, 0.85)
      const gl = bg.createLinearGradient(COL_X - 60, 0, COL_X + 90, 0)
      gl.addColorStop(0, 'rgba(0,0,0,0)'); gl.addColorStop(0.45, 'rgba(0,0,0,0.85)'); gl.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = gl; bg.fillRect(COL_X - 60, COL_Y0 - 6 * COL_DY - 80, 150, 6 * COL_DY + 160)
    }

    const dir = i % 2 ? -1 : 1
    const rot = dir * (0.05 + (0.15 + 0.4 * energy) * u) - dir * 0.25 * hit
    const R = 410
    const lineInk = paper ? INK : ink

    /* the ring: ALIGN ✦ — pulses on the off-beat */
    const rr = 492 * (1 + 0.035 * off + 0.05 * hit)
    fg.save()
    fg.strokeStyle = rgba(lineInk, 0.55); fg.lineWidth = 1.2
    fg.beginPath(); fg.arc(CX, CY, rr - 22, 0, TAU); fg.stroke()
    fg.beginPath(); fg.arc(CX, CY, rr + 22, 0, TAU); fg.stroke()
    A.ringOfWords(fg, 'ALIGN', CX, CY, rr, { size: 22 + 4 * off, spacing: 0.3, color: paper ? INK : off > 0 ? mixHex(ink, '#ffffff', 0.5 * off) : ink, font: 'mono', weight: 700, sep: ' ✦ ', start: -dir * (0.2 + energy) * u - i * 0.45 + 0.3 * hit })
    fg.restore()

    /* the mandala, flat print */
    if (A.chakra) {
      if (!paper && hit > 0.02) A.chakra.draw(fg, i, CX, CY, R * (1 + 0.5 * hit), { color: ink, alpha: 0.6 * hit, lw: 2.5, rot: rot + 0.1 * hit })
      if (paper) A.chakra.draw(fg, i, CX, CY, R, { color: INK, lw: 3, rot })
      else A.chakra.draw(fg, i, CX, CY, R * (1 + 0.08 * hit * hit + 0.03 * off), { fill: true, color: ink, rot, alpha: 0.92, progress: 0.35 + 0.65 * ease.outCubic(seg(u, 0, 0.3)) })
    }

    /* the numeral */
    const d = String(n)
    const ns = 1 + (0.18 + 0.12 * energy) * hit * hit
    // off-beat outline echo, breathing outwards
    if (u >= 0.5) {
      const e = ease.outCubic(seg(u, 0.5, 0.95))
      numeral(fg, d, CX, CY, { stroke: paper ? INK : A.C.bone, lw: 3, scale: 1 + 0.32 * e, alpha: 0.85 * (1 - e) })
      numeral(fg, d, CX, CY, { stroke: paper ? INK : ink, lw: 2, scale: 1 + 0.6 * e, alpha: 0.5 * (1 - e) })
    }
    if (paper) numeral(fg, d, CX, CY, { fill: INK, scale: ns })
    else {
      numeral(fg, d, CX + 10, CY + 12, { fill: rgba(INK, 0.8), scale: ns }) // print shadow
      numeral(fg, d, CX, CY, { fill: A.C.bone, under: INK, underW: 26, scale: ns })
      numeral(fg, d, CX, CY, { stroke: ink, lw: 2.5, scale: ns * 1.0 })
    }

    /* labels */
    const lc = paper ? INK : A.C.bone
    const idx = String(n).padStart(2, '0')
    const name = String(I.name || NAMES[i]).toUpperCase()
    const rev = ease.outQuad(seg(u, 0, 0.18))
    const lab = `${idx} · ${name}`
    A.text(fg, lab.slice(0, Math.ceil(lab.length * rev)), CX, 300, { size: 34, font: 'mono', weight: 700, spacing: 0.32, color: lc })
    fg.save(); fg.strokeStyle = rgba(lineInk, 0.7); fg.lineWidth = 1.5
    const lw2 = 80 * ease.outCubic(seg(u, 0.05, 0.3))
    fg.beginPath(); fg.moveTo(CX - lw2, 342); fg.lineTo(CX + lw2, 342); fg.stroke(); fg.restore()
    if (I.sanskrit) A.text(fg, I.sanskrit.toUpperCase(), CX, 376, { size: 18, font: 'mono', weight: 400, spacing: 0.5, color: lc, alpha: 0.7 * rev })

    const spc = lerp(0.62, 0.38, ease.outExpo(seg(u, 0, 0.4)))
    const aw = 1530 + 12 * hit
    if (u >= 0.5 && !paper) A.text(fg, 'ALIGN', CX, aw, { size: 132, weight: 500, spacing: spc + 0.12 * ease.outCubic(seg(u, 0.5, 1)), color: ink, stroke: ink, strokeWidth: 1.5, strokeOnly: true, alpha: 0.5 * (1 - seg(u, 0.5, 1)) })
    A.text(fg, 'ALIGN', CX, aw, { size: 132, weight: 500, spacing: spc, color: paper ? INK : ink })
    A.text(fg, `ALIGN IN ${n}`, CX, 1662, { size: 22, font: 'mono', weight: 700, spacing: 0.5, color: lc, alpha: 0.75 })

    column(fg, i, u, paper)
  }

  A.registerScene({
    id: 'countdown', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      if (t < LEAD) { leadIn(bg, fg, t); return }
      const k = Math.min(6, Math.floor((t - LEAD) / EACH))
      const u = (t - LEAD - k * EACH) / EACH
      count(bg, fg, k, u, t)
    },
  })
})()
