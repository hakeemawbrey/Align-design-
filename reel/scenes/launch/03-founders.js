/* Launch teaser · 03 Founders (10–15 s).
 * A gold-foil FOUNDING MEMBER card (the app's FoundingCard, scaled up to 560×800)
 * flips and stamps into frame with a shake. Original copy, then the waitlist CTA and
 * the ALIGN wordmark. Holds clean from ~12.3 s, fades out over the last 0.3 s. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.founders
  const CX = 540
  const CARD_Y = 790, CW = 560, CH = 800, RAD = 46
  const INK = '#07040f'
  const STAMP = 0.42 // seconds in: the card lands
  const SIGN_UNI = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

  const dateStr = () => String((A.TL && A.TL.date) || '').trim().toUpperCase()
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
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
  }
  /** app --gold-foil gradient, diagonal, slid by ph (0..1) */
  function foil(ctx, x0, y0, x1, y1, ph) {
    const dx = x1 - x0, dy = y1 - y0
    const g = ctx.createLinearGradient(x0 - dx + ph * 2 * dx, y0 - dy + ph * 2 * dy, x1 + ph * 2 * dx, y1 + ph * 2 * dy)
    const stops = ['#c99a3a', '#f2c75c', '#fff4cf', '#f2c75c', '#d4a544', '#f2d784', '#fff0c0', '#f2c75c', '#c99a3a', '#f2d784', '#fff4cf', '#f2c75c', '#c99a3a']
    stops.forEach((c, k) => g.addColorStop(k / (stops.length - 1), c))
    return g
  }
  function sign(ctx, i, x, y, size, o) {
    if (A.zodiac && A.zodiac.glyph) A.zodiac.glyph(ctx, i, x, y, size, o)
    else A.text(ctx, SIGN_UNI[i] + '︎', x, y, { size, font: 'mono', color: o.color, alpha: o.alpha })
  }

  /* ---- card faces, drawn in card-local space (origin = card centre) ---- */
  function cardFront(ctx, t, sheenX) {
    const w = CW, h = CH, x = -w / 2, y = -h / 2
    const ph = (t * 0.28) % 1
    // foil rim
    rrect(ctx, x, y, w, h, RAD); ctx.fillStyle = foil(ctx, x, y, x + w, y + h * 0.3, ph); ctx.fill()
    // body
    const b = 9
    rrect(ctx, x + b, y + b, w - 2 * b, h - 2 * b, RAD - b)
    const g = ctx.createRadialGradient(0, -h * 0.18, 10, 0, -h * 0.1, h * 0.7)
    g.addColorStop(0, '#3b2766'); g.addColorStop(0.55, '#22144a'); g.addColorStop(1, '#150b30')
    ctx.fillStyle = g; ctx.fill()
    ctx.save(); ctx.clip()
    // faint seed-of-life watermark
    A.flowerOfLife(ctx, 0, -110, 96, { rings: 2, lw: 1, color: A.C.gold, alpha: 0.12 })
    // inner rule
    rrect(ctx, x + 22, y + 22, w - 44, h - 44, RAD - 20); ctx.strokeStyle = rgba(A.C.gold, 0.4); ctx.lineWidth = 1.5; ctx.stroke()
    // top line
    A.text(ctx, 'ALIGN · FOUNDING', 0, y + 70, { size: 18, font: 'mono', weight: 700, spacing: 0.42, color: A.C.gold })
    // the mark inside the 12-glyph ring
    const my = -150
    ctx.strokeStyle = rgba(A.C.gold, 0.45); ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(0, my, 120, 0, TAU); ctx.stroke()
    ctx.beginPath(); ctx.arc(0, my, 168, 0, TAU); ctx.stroke()
    for (let k = 0; k < 12; k++) {
      const a = -Math.PI / 2 + (k / 12) * TAU
      sign(ctx, k, Math.cos(a) * 144, my + Math.sin(a) * 144, 26, { color: mixHex(A.C.gold, '#fff4cf', 0.3), lw: 2 })
    }
    glow(ctx, 0, my, 120, A.C.gold, 0.18)
    A.alignMark(ctx, 0, my, 170, { lit: 7, glow: 0.8, color: '#f2d784', strokeAlpha: 0.85, lw: 1.6 })
    // FOUNDING MEMBER + serial, foil type
    const fy = 92
    const tf = foil(ctx, -240, 0, 240, 0, ph)
    A.text(ctx, 'FOUNDING MEMBER', 0, fy, { size: 27, font: 'mono', weight: 700, spacing: 0.3, color: tf })
    A.text(ctx, '№ 0001', 0, fy + 100, { size: 108, font: 'serif', italic: true, weight: 500, spacing: 0.02, color: tf })
    const lg = ctx.createLinearGradient(-170, 0, 170, 0)
    lg.addColorStop(0, rgba(A.C.gold, 0)); lg.addColorStop(0.5, rgba(A.C.gold, 0.7)); lg.addColorStop(1, rgba(A.C.gold, 0))
    ctx.fillStyle = lg; ctx.fillRect(-170, fy + 172, 340, 1.5)
    A.text(ctx, 'ALIGN  ✦  ALIGN  ✦  ALIGN', 0, fy + 214, { size: 17, font: 'mono', weight: 400, spacing: 0.3, color: A.C.label2 })
    A.text(ctx, '✦ THE FIRST TO ALIGN ✦', 0, h / 2 - 60, { size: 15, font: 'mono', weight: 400, spacing: 0.3, color: A.C.label3 })
    // holo sheen sweeping across
    if (sheenX != null) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      ctx.translate(sheenX, 0); ctx.rotate(0.35)
      const sg = ctx.createLinearGradient(-110, 0, 110, 0)
      sg.addColorStop(0, 'rgba(255,244,207,0)'); sg.addColorStop(0.35, 'rgba(255,244,207,0.22)'); sg.addColorStop(0.5, 'rgba(255,189,246,0.2)')
      sg.addColorStop(0.65, 'rgba(234,244,255,0.22)'); sg.addColorStop(1, 'rgba(234,244,255,0)')
      ctx.fillStyle = sg; ctx.fillRect(-110, -h, 220, h * 2)
      ctx.restore()
    }
    ctx.restore()
  }
  function cardBack(ctx, t) {
    const w = CW, h = CH, x = -w / 2, y = -h / 2
    rrect(ctx, x, y, w, h, RAD); ctx.fillStyle = foil(ctx, x, y, x + w, y + h, (t * 0.5) % 1); ctx.fill()
    ctx.save(); ctx.clip()
    A.flowerOfLife(ctx, 0, 0, 80, { rings: 2, outer: true, lw: 3, color: '#7a5718', alpha: 0.7 })
    A.text(ctx, 'ALIGN', 0, 0, { size: 96, weight: 600, spacing: 0.2, color: '#5a3f0e' })
    ctx.restore()
  }

  A.registerScene({
    id: 'founders', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t, T }) {
      const D = dateStr()
      const land = seg(t, 0, STAMP)
      const landed = t >= STAMP
      const after = Math.max(0, t - STAMP)
      const hit = landed ? 1 - ease.outCubic(seg(after, 0, 0.35)) : 0

      /* the cut + the stamp */
      if (t < 1 / 30) { A.fx.flash = 0.5; A.fx.flashColor = A.C.gold }
      if (landed && after < 2 / 30) { A.fx.flash = 0.45; A.fx.flashColor = '#fff4cf' }
      A.fx.shake = 34 * hit * hit

      /* bg */
      A.stars(bg, T, { alpha: 0.7, count: 240, seed: 33 })
      A.galaxy(bg, T, { cx: CX, cy: CARD_Y, scale: 980 + 60 * hit, rot: T * 0.25 + 0.6 * ease.outExpo(seg(t, 0, 0.8)), alpha: 0.42, density: 0.7, tilt: 0.7, tiltAngle: -0.3, tint: A.C.gold, tintAmt: 0.7 })
      glow(bg, CX, CARD_Y, 620, A.C.gold, 0.2 + 0.3 * hit)
      hush(bg, CX, CARD_Y, 380, 520, 0.9)
      hush(bg, CX, 1330, 520, 110, 0.9)
      hush(bg, CX, 1470, 520, 70, 0.9)
      hush(bg, CX, 1610, 520, 90, 0.9)
      hush(bg, CX, 280, 460, 70, 0.85)

      /* top label */
      const top = D ? `ALIGN · OPENS ${D}` : 'ALIGN · OPENING SOON'
      A.text(fg, top, CX, 268, { size: 22, font: 'mono', weight: 700, spacing: 0.42, color: A.C.gold, alpha: ease.outCubic(seg(t, 0.1, 0.5)) })

      /* dust ring kicked up by the stamp */
      if (landed && after < 0.8) {
        const e = ease.outCubic(seg(after, 0, 0.8))
        const r = A.rng(5)
        fg.save()
        for (let k = 0; k < 70; k++) {
          const a = r() * TAU, sp = 0.5 + r()
          const d = 300 + 360 * e * sp
          const x = CX + Math.cos(a) * d * 1.0, y = CARD_Y + Math.sin(a) * d * 1.3
          fg.fillStyle = rgba(k % 4 ? A.C.gold : '#fff4cf', 0.9 * (1 - e))
          fg.beginPath(); fg.arc(x, y, 2 + 3 * r(), 0, TAU); fg.fill()
        }
        fg.strokeStyle = rgba(A.C.gold, 0.6 * (1 - e)); fg.lineWidth = 3
        fg.beginPath(); fg.ellipse(CX, CARD_Y, 330 + 260 * e, 450 + 260 * e, 0, 0, TAU); fg.stroke()
        fg.restore()
      }

      /* the card: flips from its back, drops from above, stamps down */
      const fl = ease.outCubic(land)
      const ang = landed ? 0 : lerp(Math.PI * 1.1, 0, fl)
      const sx = Math.cos(ang)
      const sc = landed ? 1 + 0.03 * hit : lerp(1.55, 1, ease.inQuad(land))
      const lift = landed ? 0 : lerp(-260, 0, ease.inQuad(land))
      const tiltR = landed ? -0.04 * hit : lerp(0.25, -0.04, fl)
      // shadow
      fg.save()
      fg.translate(CX + 18, CARD_Y + 30); fg.rotate(tiltR); fg.scale(Math.abs(sx) * sc, sc)
      rrect(fg, -CW / 2, -CH / 2, CW, CH, RAD); fg.fillStyle = rgba('#000000', 0.55 * (landed ? 1 : land)); fg.fill()
      fg.restore()
      // glow halo
      glow(fg, CX, CARD_Y, 520, A.C.gold, (0.18 + 0.35 * hit) * (landed ? 1 : land))
      fg.save()
      fg.translate(CX, CARD_Y + lift); fg.rotate(tiltR); fg.scale(Math.max(0.002, Math.abs(sx)) * sc, sc)
      if (sx < 0) cardBack(fg, t)
      else {
        // sheen sweeps once on landing, then every ~1.8 s
        let sheen = null
        const sw = landed ? (after < 1.2 ? after / 0.9 : ((after - 1.2) % 1.8) / 1.1) : null
        if (sw != null && sw <= 1) sheen = lerp(-CW, CW, ease.inOutQuad(sw))
        cardFront(fg, t, sheen)
      }
      fg.restore()

      /* copy */
      const c1 = ease.outCubic(seg(t, 0.85, 1.35))
      A.text(fg, 'The first to align', CX, 1300 + 16 * (1 - c1), { size: 60, font: 'serif', italic: true, weight: 400, color: A.C.bone, alpha: c1 })
      const c2 = ease.outCubic(seg(t, 1.05, 1.55))
      A.text(fg, 'are written in the stars.', CX, 1366 + 16 * (1 - c2), { size: 60, font: 'serif', italic: true, weight: 400, color: A.C.bone, alpha: c2 })
      const c3 = ease.outCubic(seg(t, 1.5, 1.95))
      if (c3 > 0) {
        const bw = 760, bh = 74, by = 1478
        fg.save(); fg.globalAlpha = c3
        rrect(fg, CX - bw / 2, by - bh / 2, bw, bh, bh / 2); fg.strokeStyle = rgba(A.C.gold, 0.85); fg.lineWidth = 2; fg.stroke()
        fg.fillStyle = rgba(A.C.gold, 0.1); fg.fill()
        fg.restore()
        const CTA = 'JOIN THE WAITLIST · LINK IN BIO'
        const rev = Math.ceil(CTA.length * seg(t, 1.5, 1.9))
        A.text(fg, CTA.slice(0, rev), CX, by + 1, { size: 26, font: 'mono', weight: 700, spacing: 0.22, color: A.C.gold })
      }
      const c4 = ease.outExpo(seg(t, 1.8, 2.4))
      A.text(fg, 'ALIGN', CX + 10, 1610, { size: 118, weight: 500, spacing: lerp(0.9, 0.42, c4), color: A.C.bone, alpha: c4 })
      A.text(fg, 'SEVEN CENTERS · TWELVE SIGNS · ONE SKY', CX, 1690, { size: 17, font: 'mono', weight: 400, spacing: 0.4, color: A.C.label2, alpha: 0.8 * c4 })

      /* fade the last 0.3 s */
      const fade = seg(t, TL.duration - 0.3, TL.duration - 1 / 30)
      if (fade > 0) { A.fx.flash = ease.inQuad(fade); A.fx.flashColor = INK }
    },
  })
})()
