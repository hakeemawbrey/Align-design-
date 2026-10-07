/* 04 · Montage (23–27 s): the energy peak. Eight beats of 0.5 s, a cut on every beat
 * and sub-cuts on the 8ths. Kinetic ALIGN type + sacred geometry, ending in a collapse
 * to a single point of light that the outro bursts out of. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, TAU } = A
  const TL = A.TL.montage
  const W = 1080, H = 1920, CX = 540, CY = 960
  const INK = '#07040f'
  const CC = A.CHAKRA_COLORS

  /* ---------- helpers (local) ---------- */
  function measure(ctx, str, o) {
    ctx.save()
    ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 500} ${o.size}px ${A.FONT[o.font || 'serif']}`
    const sp = (o.spacing || 0) * o.size
    const w = [...str].reduce((s, c) => s + ctx.measureText(c).width + sp, 0)
    ctx.restore()
    return w
  }
  /** an endless row of a word, scrolled by `offset` px */
  function row(ctx, y, word, offset, o) {
    const unit = measure(ctx, word, o)
    let x = -(((offset % unit) + unit) % unit)
    while (x < W) { A.text(ctx, word, x, y, { ...o, align: 'left' }); x += unit }
  }
  function solid(bg, col) {
    bg.fillStyle = col; bg.fillRect(0, 0, W, H)
    A.fx.halftone = false
  }
  function glow(ctx, x, y, r, col, a) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.3, rgba(col, a * 0.4)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  function tag(ctx, b, col) {
    A.text(ctx, `ALIGN · 0${b + 1}/08`, CX, 250, { size: 22, font: 'mono', weight: 700, color: col, spacing: 0.4, alpha: 0.8 })
  }
  /** beat-start punch: flash decays over ~3 frames */
  function punch(lt, amt, col) {
    const f = amt * (1 - seg(lt, 0, 0.1))
    if (f > A.fx.flash) { A.fx.flash = f; A.fx.flashColor = col || '#ffffff' }
  }

  // chakra / zodiac glyphs with fallbacks while the shared libs are in flight
  const SIGN_NAMES = ['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES']
  const CHAKRA_NAMES = ['ROOT', 'SACRAL', 'SOLAR PLEXUS', 'HEART', 'THROAT', 'THIRD EYE', 'CROWN']
  const PAIR_SIGN = [9, 8, 0, 6, 2, 4, 0]
  function drawChakra(ctx, i, x, y, r, o) {
    if (A.chakra && A.chakra.draw) { A.chakra.draw(ctx, i, x, y, r, o); return }
    const petals = [4, 6, 10, 12, 16, 2, 24][i]
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0)
    ctx.fillStyle = o.color; ctx.strokeStyle = o.color; ctx.lineWidth = o.lw || 4
    for (let k = 0; k < petals; k++) {
      const a = (k / petals) * TAU
      ctx.beginPath(); ctx.ellipse(Math.cos(a) * r * 0.72, Math.sin(a) * r * 0.72, r * 0.3, r * Math.min(0.3, 2.2 / petals), a, 0, TAU); ctx.fill()
    }
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, TAU); ctx.fill()
    ctx.beginPath(); ctx.arc(0, 0, r * 0.5, 0, TAU); ctx.stroke()
    ctx.restore()
  }
  function drawSign(ctx, i, x, y, size, o) {
    if (A.zodiac && A.zodiac.glyph) { A.zodiac.glyph(ctx, i, x, y, size, o); return }
    ctx.save(); ctx.font = `${size}px 'DejaVu Sans', sans-serif`; ctx.fillStyle = o.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(String.fromCodePoint(0x2648 + i) + '︎', x, y); ctx.restore()
  }
  const signName = (i) => (A.zodiac && A.zodiac.SIGNS && A.zodiac.SIGNS[i] ? String(A.zodiac.SIGNS[i].name).toUpperCase() : SIGN_NAMES[i])
  const chakraName = (i) => (A.chakra && A.chakra.INFO && A.chakra.INFO[i] ? String(A.chakra.INFO[i].name).toUpperCase() : CHAKRA_NAMES[i])
  const pairSign = (i) => (A.chakra && A.chakra.INFO && A.chakra.INFO[i] && A.chakra.INFO[i].signs && A.chakra.INFO[i].signs.length ? A.chakra.INFO[i].signs[0] : PAIR_SIGN[i])

  /* ---------- beats ---------- */
  // b0 · the ALIGN wall: rows alternate filled / outline and slide opposite ways
  function wall(bg, fg, lt, t, chakra) {
    A.galaxy(bg, t, { scale: 700, alpha: 0.45, rot: t * 2, tilt: 0.6 })
    const size = 156, step = 148
    for (let r = 0; r < 12; r++) {
      const y = 205 + r * step
      const dir = r % 2 ? 1 : -1
      const off = r * 211 + dir * (lt * 1400 + t * 300)
      const col = chakra ? CC[(11 - r) % 7] : r % 2 ? A.C.gold : A.C.bone
      const outline = r % 2 === 1
      row(fg, y, 'ALIGN  ', off, { size, weight: 600, spacing: 0.06, color: col, stroke: outline ? col : null, strokeWidth: 3, strokeOnly: outline })
    }
    // centre band holds still: the one that aligned
    fg.fillStyle = INK; fg.fillRect(0, CY - 70, W, 140)
    A.text(fg, 'A L I G N', CX, CY + 4, { size: 124, weight: 600, color: A.C.coral, spacing: 0.1 })
  }

  // b1 · ALIGN huge, cropped off the frame
  function huge(bg, fg, lt, t, sub) {
    A.fx.halftoneCell = 16
    A.galaxy(bg, t, { scale: 900, rot: t * 3, alpha: 1, tint: A.C.coral, tintAmt: 0.45, tilt: 0.55 })
    if (!sub) {
      const size = 1000
      const w = measure(fg, 'ALIGN', { size, weight: 600, spacing: -0.02 })
      const x = lerp(CX + w * 0.22, CX + w * 0.12, ease.outCubic(seg(lt, 0, 0.25)))
      A.text(fg, 'ALIGN', x, CY + 40, { size, weight: 600, spacing: -0.02, color: A.C.coral })
      A.text(fg, 'ALIGN  ALIGN  ALIGN', CX, CY - 470, { size: 30, font: 'mono', weight: 700, color: A.C.bone, spacing: 0.35 })
      A.text(fg, 'SEVEN CENTERS · ONE LINE', CX, CY + 470, { size: 30, font: 'mono', weight: 700, color: A.C.bone, spacing: 0.3 })
    } else {
      // vertical: ALIGN reads up the frame, cropped left and right
      fg.save(); fg.translate(CX, CY); fg.rotate(-Math.PI / 2)
      const s = lerp(1.08, 1, ease.outCubic(seg(lt, 0.25, 0.5)))
      fg.scale(s, s)
      A.text(fg, 'ALIGN', 0, 30, { size: 760, weight: 600, spacing: 0.02, color: A.C.bone })
      fg.restore()
      A.text(fg, 'ALIGN', 140, 330, { size: 40, font: 'mono', weight: 700, color: A.C.coral, spacing: 0.3 })
      A.text(fg, 'ALIGN', 940, 1590, { size: 40, font: 'mono', weight: 700, color: A.C.coral, spacing: 0.3 })
    }
  }

  // b2 · Metatron's cube spinning, ALIGN at its heart
  function cube(bg, fg, lt, t) {
    A.galaxy(bg, t, { scale: 640, rot: t * 1.5, alpha: 0.9, tilt: 0.7 })
    const rot = lt * 1.6 + 0.2
    const s = lerp(0.85, 1, ease.outCubic(seg(lt, 0, 0.3)))
    A.metatron(fg, CX, CY, 105 * s, { rot, lw: 2.4, color: A.C.gold, alpha: 0.95 })
    A.ringOfWords(fg, 'ALIGN', CX, CY, 500 * s, { size: 30, font: 'mono', weight: 700, color: A.C.bone, start: -lt * 1.2, sep: '  ✦  ' })
    fg.fillStyle = INK
    fg.beginPath(); fg.arc(CX, CY, 150 * s, 0, TAU); fg.fill()
    fg.strokeStyle = A.C.gold; fg.lineWidth = 2.4; fg.stroke()
    A.text(fg, 'ALIGN', CX + 6, CY + 4, { size: 60, weight: 600, color: A.C.bone, spacing: 0.2 })
  }

  // b3 · ALIGN strobing through the seven chakra colours (2 frames each)
  function strobe(bg, fg, lt, t) {
    const k = Math.floor(lt * 15) % 7
    const col = CC[k]
    const inv = Math.floor(lt * 15) % 2 === 1
    if (inv) solid(bg, col)
    else { A.galaxy(bg, t, { scale: 520, rot: t * 4, alpha: 0.8, tint: col, tintAmt: 0.6 }) }
    const ink = inv ? INK : col
    for (let e = -3; e <= 3; e++) {
      if (!e) continue
      A.text(fg, 'ALIGN', CX, CY + e * 200 + Math.sign(e) * 60, { size: 210, weight: 600, spacing: 0.2, color: ink, stroke: ink, strokeWidth: 2.5, strokeOnly: true, alpha: 1 - Math.abs(e) * 0.22 })
    }
    A.text(fg, 'ALIGN', CX, CY, { size: 230, weight: 600, spacing: 0.2, color: ink })
    A.text(fg, chakraName(k), CX, CY + 125, { size: 26, font: 'mono', weight: 700, color: ink, spacing: 0.45 })
  }

  // b4 · inverted: bone / coral paper, flower of life in ink, ALIGN across it
  function flower(bg, fg, lt, t, sub) {
    solid(bg, sub ? A.C.coral : A.C.bone)
    const rot = lt * 1.4
    fg.save()
    fg.beginPath(); fg.rect(0, 0, W, CY - 110); fg.rect(0, CY + 110, W, H - CY - 110); fg.clip()
    fg.translate(CX, CY); fg.rotate(rot)
    A.flowerOfLife(fg, 0, 0, 135, { rings: 2, outer: true, lw: 3.2, color: INK })
    fg.restore()
    A.text(fg, 'ALIGN', CX, CY + 6, { size: 200, weight: 600, spacing: 0.24, color: INK })
    A.text(fg, 'ALIGN · ALIGN · ALIGN · ALIGN', CX, 1560, { size: 26, font: 'mono', weight: 700, color: INK, spacing: 0.3 })
    A.text(fg, sub ? 'TWELVE SIGNS' : 'SEVEN CENTERS', CX, 360, { size: 26, font: 'mono', weight: 700, color: INK, spacing: 0.5 })
  }

  // b5 · a chakra and its sign flash as a pair
  function pair(bg, fg, lt, t, sub) {
    const c = sub ? 3 : 2
    const z = pairSign(c)
    A.fx.halftoneCell = 14
    A.galaxy(bg, t, { scale: 700, rot: t * 2.2, alpha: 0.7, tint: CC[c], tintAmt: 0.55, cy: 720 })
    const lg = bg.createLinearGradient(0, 940, 0, 1560)
    lg.addColorStop(0, 'rgba(0,0,0,0)'); lg.addColorStop(0.18, 'rgba(0,0,0,0.92)'); lg.addColorStop(1, 'rgba(0,0,0,0.92)')
    bg.fillStyle = lg; bg.fillRect(0, 940, W, 620)
    const pop = ease.outBack(seg(lt % 0.25, 0, 0.12))
    drawChakra(fg, c, CX, 720, 225 * pop, { color: CC[c], lw: 6, fill: true, rot: lt * 0.8, progress: 1 })
    drawSign(fg, z, CX, 1270, 210 * pop, { color: A.C.bone, lw: 9, progress: 1 })
    A.text(fg, chakraName(c) + '  ×  ' + signName(z), CX, 1450, { size: 28, font: 'mono', weight: 700, color: CC[c], spacing: 0.35 })
    A.text(fg, 'ALIGN', CX + 18, 1040, { size: 80, weight: 600, color: A.C.bone, spacing: 0.45 })
  }

  // b6 · tunnel of ALIGN rings, chunky halftone burst; sub-cut inverts
  function tunnel(bg, fg, lt, t, sub) {
    const ink = sub ? INK : A.C.bone
    if (sub) solid(bg, A.C.bone)
    else {
      A.fx.halftoneCell = 18
      A.galaxy(bg, t, { scale: lerp(500, 1100, lt * 2), rot: t * 5, alpha: 1, tilt: 0.85 })
    }
    for (let k = 0; k < 7; k++) {
      const r = 60 * Math.pow(1.55, k + ((lt * 4) % 1))
      if (r > 1300) continue
      A.ringOfWords(fg, 'ALIGN', CX, CY, r, { size: Math.max(10, r * 0.13), font: 'serif', weight: 600, color: sub ? INK : CC[k], start: (k % 2 ? 1 : -1) * lt * 2, sep: ' ✦ ', alpha: clamp(r / 120) })
    }
    A.text(fg, 'ALIGN', CX, CY, { size: 90, weight: 600, spacing: 0.2, color: ink })
  }

  // b7 · collapse: everything sucks into a point of light
  function collapse(bg, fg, lt, t) {
    const c = ease.inCubic(seg(lt, 0, 0.47))
    A.galaxy(bg, t, { scale: lerp(900, 10, c), rot: t * 2 + c * 14, alpha: 1, tilt: lerp(0.6, 1, c) })
    glow(bg, CX, CY, lerp(200, 500, c), '#fff4e8', 0.4 + 0.6 * c)
    // converging speed lines
    fg.save(); fg.globalCompositeOperation = 'lighter'
    const r = A.rng(77)
    for (let i = 0; i < 90; i++) {
      const a = r() * TAU, d0 = 400 + r() * 900, sp = 0.6 + r() * 0.8
      const d = d0 * (1 - clamp(c * sp * 1.2))
      if (d < 4) continue
      const len = 40 + 260 * c
      fg.strokeStyle = rgba(i % 3 ? A.C.bone : CC[i % 7], 0.75)
      fg.lineWidth = 2
      fg.beginPath(); fg.moveTo(CX + Math.cos(a) * d, CY + Math.sin(a) * d); fg.lineTo(CX + Math.cos(a) * (d + len), CY + Math.sin(a) * (d + len)); fg.stroke()
    }
    fg.restore()
    // the ALIGN wall implodes
    const s = 1 - c
    if (s > 0.01) {
      fg.save(); fg.translate(CX, CY); fg.scale(s, s); fg.rotate(c * 1.2); fg.translate(-CX, -CY)
      for (let k = -4; k <= 4; k++) {
        A.text(fg, 'ALIGN', CX, CY + k * 190, { size: 190, weight: 600, spacing: 0.2, color: k % 2 ? A.C.gold : A.C.bone, stroke: A.C.gold, strokeWidth: 3, strokeOnly: k % 2 !== 0, alpha: 1 - Math.abs(k) * 0.12 })
      }
      fg.restore()
    }
    // the point
    glow(fg, CX, CY, (lerp(30, 160, c) + 900 * ease.inCubic(seg(lt, 0.4, 0.5))) * (1 + 0.15 * Math.sin(lt * 60)), '#fff8ee', 0.5 + 0.5 * c)
    A.fx.shake = 24 * c
  }

  A.registerScene({
    id: 'montage', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const b = Math.min(7, Math.floor(t / 0.5))
      const lt = t - b * 0.5 // time into the beat
      const sub = lt >= 0.25
      switch (b) {
        case 0: wall(bg, fg, lt, t, sub); punch(lt, 0.6); break
        case 1: huge(bg, fg, lt, t, sub); tag(fg, b, A.C.bone); punch(lt, 0.5, A.C.coral); if (!sub) A.fx.shake = 18 * (1 - seg(lt, 0, 0.15)); else punch(lt - 0.25, 0.3); break
        case 2: cube(bg, fg, lt, t); tag(fg, b, A.C.gold); punch(lt, 0.35); break
        case 3: strobe(bg, fg, lt, t); break
        case 4: flower(bg, fg, lt, t, sub); tag(fg, b, INK); break
        case 5: pair(bg, fg, lt, t, sub); tag(fg, b, A.C.bone); punch(lt, 0.4); if (sub) punch(lt - 0.25, 0.35, CC[3]); break
        case 6: tunnel(bg, fg, lt, t, sub); punch(lt, 0.7); if (!sub) A.fx.shake = 22 * (1 - seg(lt, 0, 0.2)); break
        case 7: collapse(bg, fg, lt, t); break
      }
      // last two frames: the point fills with light, handing over to the outro
      
    },
  })
})()
