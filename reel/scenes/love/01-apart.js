/* Teaser 2 · "Two skies" — 01 apart (0–4 s) + the shared love helpers (ALIGN.love).
 * Two small halftone galaxies, one per sign, far apart. Everything about the pair's motion
 * (positions, the heartbeat, glyph pair, descriptor) lives here so all four scene files agree. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, clamp, lerp, rgba, mixHex, TAU } = A
  const TL = A.TL
  const Z = A.zodiac

  /* ---------------- shared helpers ---------------- */
  const L = (A.love = {})
  const BEAT = 60 / (TL.bpm || 90) // 0.667 s
  const RUB = A.C.rub, GOLD = A.C.gold, BONE = A.C.bone, HEART = A.CHAKRA_COLORS[3]
  const signIndex = (id, d) => {
    const k = Z.SIGNS.findIndex((s) => s.id === String(id || '').toLowerCase().trim())
    return k < 0 ? d : k
  }
  const ia = signIndex(TL.a, 1), ib = signIndex(TL.b, 7)
  const AURA = ['Ember', 'Honey', 'Signal', 'Tide', 'Goldleaf', 'Rose Quartz', 'Orchid', 'Garnet', 'Amethyst', 'Jade', 'Ion', 'Dusk']
  Object.assign(L, { BEAT, RUB, GOLD, BONE, HEART, ia, ib, SA: Z.SIGNS[ia], SB: Z.SIGNS[ib], AURA })
  L.colA = Z.SIGNS[ia].color
  L.colB = Z.SIGNS[ib].color
  // a second B colour if both signs share a near-identical hue, so the two skies always read apart
  if (ia === ib) L.colB = mixHex(L.colB, RUB, 0.55)

  /** the pair descriptor for the aligned card */
  L.descriptor = (() => {
    const ea = Z.SIGNS[ia].element, eb = Z.SIGNS[ib].element
    const kin = (x, y) => (x === 'fire' && y === 'air') || (x === 'air' && y === 'fire') || (x === 'earth' && y === 'water') || (x === 'water' && y === 'earth')
    if (ea === eb) return 'SAME ELEMENT'
    if (Math.abs(ia - ib) === 6) return 'OPPOSITES ALIGN'
    if (kin(ea, eb)) return 'KINDRED ELEMENTS'
    return 'UNLIKELY. UNDENIABLE.'
  })()

  /** heartbeat: "lub" on the beat, softer "dub" 0.18 s later. period may shrink (accelerating). */
  L.lubdub = (T, period = BEAT, sharp = 9) => {
    const ph = ((T % period) + period) % period
    const gap = Math.min(0.18, period * 0.42)
    return Math.exp(-ph * sharp) + (ph >= gap ? 0.62 * Math.exp(-(ph - gap) * sharp) : 0)
  }
  /** the union's heartbeat quickens toward the hit: 1/beat, then 2/beat, then 4/beat */
  L.heartPeriod = (T) => (T < 11.333 ? BEAT : T < 12.667 ? BEAT / 2 : BEAT / 4)
  L.pulse = (T) => (T >= TL.hit ? L.lubdub(T - TL.hit, BEAT) : L.lubdub(T, L.heartPeriod(T)))

  /* the pair orbits a shared centre. A sits at angle th, B opposite. */
  const TH0 = Math.atan2(-320, -240) // A upper-left, B lower-right
  const R0 = 400, R_ORBIT_END = 168, R_VESICA = 75, VR = 150 // vesica circles: radius VR, centres ±R_VESICA (VR = 2R)
  L.VR = VR
  L.CX = 540
  L.cy = (T) => lerp(960, 900, ease.inOutCubic(seg(T, 9, 10.2)))
  const thApartEnd = TH0 + 0.035 * 4
  const TH_UNION = Math.PI // A on the left, B on the right
  /** stepped approach in the orbit: each heartbeat pulls them closer */
  function stepped(T) {
    const n = (T - 4) / BEAT
    const k = Math.floor(n), f = n - k
    const s = (k + ease.outCubic(clamp(f / 0.55))) / (5 / BEAT)
    return clamp(lerp((T - 4) / 5, s, 0.65))
  }
  L.pos = (T) => {
    let R, th
    if (T < 4) { R = R0 + 6 * Math.sin(T * 0.8); th = TH0 + 0.035 * T }
    else if (T < 9) {
      const s = stepped(T)
      R = lerp(R0 + 6 * Math.sin(3.2), R_ORBIT_END, ease.inOutSine ? ease.inOutSine(s) : ease.inOutQuad(s))
      // angular sweep accelerates as they near (angular momentum), ending at A-left / B-right
      th = lerp(thApartEnd, TH_UNION + TAU, ease.inOutQuad(s) * 0.85 + s * 0.15)
    } else if (T < TL.hit) {
      th = TH_UNION
      const a = ease.inOutCubic(seg(T, 9, 10.4))
      const b = ease.inCubic(seg(T, 11.4, TL.hit))
      R = lerp(lerp(R_ORBIT_END, R_VESICA, a), 0, b)
    } else { th = TH_UNION; R = 0 }
    const cx = L.CX, cy = L.cy(T)
    const dx = Math.cos(th) * R, dy = Math.sin(th) * R
    return { ax: cx + dx, ay: cy + dy, bx: cx - dx, by: cy - dy, R, th, cx, cy }
  }
  /** 0 = far apart … 1 = touching */
  L.near = (T) => clamp(1 - (L.pos(T).R - R_VESICA) / (R0 - R_VESICA))

  /** the two halftone galaxies (bg). o: alpha, scale, merge (0..1 adds a joint core) */
  L.galaxies = (bg, T, o = {}) => {
    const P = L.pos(T)
    const sc = o.scale || 210
    const al = o.alpha == null ? 1 : o.alpha
    A.galaxy(bg, T, { cx: P.ax, cy: P.ay, scale: sc, rot: 0.4 + T * 0.32, tilt: 0.62, tiltAngle: 0.55, alpha: 0.62 * al, tint: L.colA, tintAmt: 0.62, density: o.density || 0.42 })
    A.galaxy(bg, T, { cx: P.bx, cy: P.by, scale: sc, rot: 2.1 - T * 0.3, tilt: 0.62, tiltAngle: -0.55, alpha: 0.62 * al, tint: L.colB, tintAmt: 0.62, density: o.density || 0.42 })
    return P
  }

  /** soft radial glow */
  L.glow = (ctx, x, y, r, col, a) => {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.4, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  /** faint 7-dot chakra column through a galaxy's core; the heart (index 3) sits on the core */
  L.column = (ctx, x, y, near, pulse, alpha, sp = 22) => {
    if (alpha <= 0) return
    ctx.save()
    for (let i = 0; i < 7; i++) {
      const yy = y + (3 - i) * sp
      const heart = i === 3
      const c = heart ? mixHex(HEART, RUB, ease.inOutQuad(near)) : A.CHAKRA_COLORS[i]
      const a = alpha * (heart ? 0.55 + 0.45 * near : 0.38)
      const r = heart ? 4.5 + 4 * near + 3 * pulse * near : 3
      L.glow(ctx, x, yy, r * (heart ? 4 + 4 * near + 3 * pulse : 3), c, a * (heart ? 0.7 : 0.4))
      ctx.globalAlpha = a
      ctx.fillStyle = c
      ctx.beginPath(); ctx.arc(x, yy, r, 0, TAU); ctx.fill()
      ctx.globalAlpha = 1
    }
    ctx.restore()
  }

  /** dark plate + sign glyph */
  L.glyphPlate = (ctx, i, x, y, size, col, alpha, glow = 0.5) => {
    if (alpha <= 0) return
    ctx.save()
    ctx.globalAlpha = alpha
    const g = ctx.createRadialGradient(x, y, 0, x, y, size * 0.95)
    g.addColorStop(0, 'rgba(7,4,15,0.75)'); g.addColorStop(0.7, 'rgba(7,4,15,0.45)'); g.addColorStop(1, 'rgba(7,4,15,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, size * 0.95, 0, TAU); ctx.fill()
    ctx.restore()
    Z.glyph(ctx, i, x, y, size, { color: mixHex(BONE, col, 0.35), alpha, glow, glowColor: col })
  }

  /** "♉ × ♏" built from the vector glyphs. gap = centre-to-centre half distance */
  L.pair = (ctx, x, y, size, o = {}) => {
    const gap = o.gap == null ? size * 0.95 : o.gap
    const al = o.alpha == null ? 1 : o.alpha
    if (al <= 0) return
    Z.glyph(ctx, ia, x - gap, y, size, { color: o.colorA || mixHex(BONE, L.colA, 0.3), alpha: al, glow: o.glow || 0.6, glowColor: L.colA, lw: o.lw })
    Z.glyph(ctx, ib, x + gap, y, size, { color: o.colorB || mixHex(BONE, L.colB, 0.3), alpha: al, glow: o.glow || 0.6, glowColor: L.colB, lw: o.lw })
    A.text(ctx, '×', x, y + size * 0.02, { size: size * 0.62, weight: 400, color: o.xColor || RUB, alpha: al * (o.xAlpha == null ? 1 : o.xAlpha) })
  }

  /** bottom mantra: ALIGN, small mono, wide tracking */
  L.mantra = (ctx, alpha, y = 1668, col = GOLD) => A.text(ctx, 'ALIGN', 540, y, { size: 22, font: 'mono', spacing: 0.9, color: col, alpha: 0.75 * alpha })

  /** text with an ink shadow so it reads over halftone */
  L.inked = (ctx, fn) => { ctx.save(); ctx.shadowColor = 'rgba(5,3,15,0.92)'; ctx.shadowBlur = 18; fn(); ctx.restore() }

  /** label block above a galaxy: name + dates */
  L.label = (ctx, S, col, x, y, alpha) => {
    if (alpha <= 0) return
    L.inked(ctx, () => {
      A.text(ctx, S.name.toUpperCase(), x, y, { size: 38, weight: 500, spacing: 0.32, color: BONE, alpha })
      A.text(ctx, `${S.dates.toUpperCase()}  ·  ${S.element.toUpperCase()}`, x, y + 42, { size: 17, font: 'mono', spacing: 0.16, color: mixHex(A.C.label2, col, 0.35), alpha: alpha * 0.9 })
    })
  }

  /* ---------------- scene: apart ---------------- */
  const slot = TL.apart
  A.registerScene({
    id: 'love-apart', start: slot.start, duration: slot.duration,
    draw({ bg, fg, t, T }) {
      const fadeIn = ease.outCubic(seg(t, 0, 1.2))
      const pu = L.lubdub(T) // a faint heartbeat even now
      A.stars(bg, T, { alpha: 0.55 * fadeIn, count: 240, seed: 21 })
      const P = L.galaxies(bg, T, { alpha: fadeIn * (0.9 + 0.1 * pu), scale: lerp(170, 210, ease.outCubic(seg(t, 0, 2))) })
      L.glow(bg, P.ax, P.ay, 260, L.colA, 0.22 * fadeIn)
      L.glow(bg, P.bx, P.by, 260, L.colB, 0.22 * fadeIn)

      // each sky has its own little ring of ALIGN
      const ra = ease.outCubic(seg(t, 0.5, 1.8))
      A.ringOfWords(fg, 'ALIGN', P.ax, P.ay, 236, { size: 15, font: 'mono', weight: 700, spacing: 0.3, color: L.colA, alpha: 0.45 * ra, start: T * 0.06, sep: '  ·  ' })
      A.ringOfWords(fg, 'ALIGN', P.bx, P.by, 236, { size: 15, font: 'mono', weight: 700, spacing: 0.3, color: L.colB, alpha: 0.45 * ra, start: -T * 0.06, sep: '  ·  ' })
      fg.save(); fg.lineWidth = 1
      for (const [x, y, c] of [[P.ax, P.ay, L.colA], [P.bx, P.by, L.colB]]) {
        fg.strokeStyle = rgba(c, 0.25 * ra)
        fg.beginPath(); fg.arc(x, y, 214, 0, TAU * ra); fg.stroke()
      }
      fg.restore()

      // chakra columns, faint; hearts barely lit
      L.column(fg, P.ax, P.ay, 0, pu, 0.7 * fadeIn)
      L.column(fg, P.bx, P.by, 0, pu, 0.7 * fadeIn)

      // glyphs above each sky, labels
      const ga = ease.outCubic(seg(t, 0.3, 1.1)), gb = ease.outCubic(seg(t, 0.7, 1.5))
      L.glyphPlate(fg, ia, P.ax, P.ay - 172, 66, L.colA, ga, 0.5)
      L.glyphPlate(fg, ib, P.bx, P.by - 172, 66, L.colB, gb, 0.5)
      Z.glyph(fg, ia, P.ax, P.ay - 172, 66, { progress: ga, color: mixHex(BONE, L.colA, 0.35), glow: 0.5, glowColor: L.colA, alpha: 0 })
      L.label(fg, L.SA, L.colA, P.ax, P.ay - 285, ga)
      L.label(fg, L.SB, L.colB, P.bx, P.by + 205, gb)

      // copy, slow and tender, in the dark between them
      const c1 = ease.outCubic(seg(t, 0.6, 1.6)) * (1 - 0.0 * t)
      const c2 = ease.outCubic(seg(t, 1.8, 2.8))
      const out = 1 - ease.inQuad(seg(t, 3.55, 4))
      L.inked(fg, () => {
        A.text(fg, 'Two skies.', 540, 925 + 12 * (1 - c1), { size: 76, italic: true, weight: 400, color: BONE, alpha: c1 * out })
        A.text(fg, 'light-years apart.', 540, 1010 + 12 * (1 - c2), { size: 56, italic: true, weight: 400, color: mixHex(BONE, RUB, 0.25), alpha: c2 * out })
      })
      L.mantra(fg, fadeIn * out)
    },
  })
})()
