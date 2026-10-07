/* Teaser 1 · "Calling all <SIGN>" — 01 · Hook (0–2.5 s).
 * Also defines ALIGN.signTeaser: the per-sign data (traits, aura, ruler, matches, chakra)
 * and small drawing helpers shared by the other three sign scenes (this file loads first).
 *
 * Hook: on the downbeat the sign's glyph slams in huge with a flash and shake over a
 * halftone galaxy tinted to the sign colour. "CALLING ALL" above; on the next beat the sign
 * name slams in (spaced serif caps) with an outlined ALIGN echo stamped behind it; dates. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const SIGNS = A.zodiac.SIGNS

  /* ================= shared per-sign data ================= */
  const want = String(A.TL.sign || 'taurus').toLowerCase()
  let idx = SIGNS.findIndex((s) => s.id === want)
  if (idx < 0) idx = 1
  const S = SIGNS[idx]

  // original trait trios: short, flattering, a little cheeky
  const TRAITS = {
    aries: ['Bold.', 'Fearless.', 'Always first.'],
    taurus: ['Loyal.', 'Sensual.', 'Worth the wait.'],
    gemini: ['Witty.', 'Electric.', 'Never boring.'],
    cancer: ['Tender.', 'Intuitive.', 'Fiercely yours.'],
    leo: ['Radiant.', 'Generous.', 'Unmissable.'],
    virgo: ['Sharp.', 'Devoted.', 'Quietly perfect.'],
    libra: ['Charming.', 'Balanced.', 'Irresistible.'],
    scorpio: ['Magnetic.', 'Intense.', 'Unforgettable.'],
    sagittarius: ['Free.', 'Honest.', 'Hilarious.'],
    capricorn: ['Driven.', 'Steady.', 'Secretly soft.'],
    aquarius: ['Original.', 'Visionary.', 'Unbothered.'],
    pisces: ['Dreamy.', 'Psychic.', 'Hopelessly romantic.'],
  }
  // the app's aura names
  const AURA = ['Ember', 'Honey', 'Signal', 'Tide', 'Goldleaf', 'Rose Quartz', 'Orchid', 'Garnet', 'Amethyst', 'Jade', 'Ion', 'Dusk']
  // ruling planet (modern · traditional where they differ)
  const RULER = ['Mars', 'Venus', 'Mercury', 'The Moon', 'The Sun', 'Mercury', 'Venus', 'Pluto · Mars', 'Jupiter', 'Saturn', 'Uranus · Saturn', 'Neptune · Jupiter']
  const MODE = ['Cardinal', 'Fixed', 'Mutable']

  // chakra whose classical planet rules this sign (crown excluded)
  let chakraIdx = 0
  if (A.chakra) for (let i = 0; i < 6; i++) if (A.chakra.INFO[i].signs.includes(idx)) chakraIdx = i

  // classical compatibility: same element (the two trines), the complementary element
  // (fire↔air, earth↔water: a sextile), and the opposite sign
  const matches = [(idx + 4) % 12, (idx + 8) % 12, (idx + 2) % 12, (idx + 6) % 12]

  const col = S.color
  const [cr, cg, cb] = A.hexToRgb(col)
  const lum = (0.3 * cr + 0.59 * cg + 0.11 * cb) / 255 // darker sign colours get lifted more
  const K = (A.signTeaser = {
    idx, S, col,
    ink: mixHex(col, '#ffffff', lum < 0.525 ? 0.36 : 0.2), // sign colour lifted a touch for type on near-black
    name: S.name.toUpperCase(),
    traits: TRAITS[S.id],
    aura: AURA[idx].toUpperCase(),
    ruler: RULER[idx].toUpperCase(),
    mode: MODE[idx % 3].toUpperCase(),
    element: S.element.toUpperCase(),
    chakraIdx,
    chakra: A.chakra ? A.chakra.INFO[chakraIdx] : null,
    matches,
    CX: 540,
  })

  /* ================= shared helpers ================= */
  const MC = A.makeCanvas(8, 8).getContext('2d')
  /** largest size <= max so the letter-spaced string fits in maxW */
  K.fit = function (str, { max = 120, maxW = 900, font = 'serif', spacing = 0, weight = 500, italic = false } = {}) {
    MC.font = `${italic ? 'italic ' : ''}${weight} 100px ${A.FONT[font]}`
    const chars = [...str]
    const w = chars.reduce((s, c) => s + MC.measureText(c).width, 0) + spacing * 100 * (chars.length - 1)
    return Math.min(max, (maxW / w) * 100)
  }
  K.glow = function (ctx, x, y, r, c, a, sy = 1) {
    if (a <= 0 || r <= 0) return
    ctx.save()
    ctx.translate(x, y); ctx.scale(1, sy)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
    g.addColorStop(0, rgba(c, a)); g.addColorStop(0.45, rgba(c, a * 0.4)); g.addColorStop(1, rgba(c, 0))
    ctx.fillStyle = g
    ctx.fillRect(-r, -r, r * 2, r * 2)
    ctx.restore()
  }
  /** soft dark pool on bg so type reads over the halftone */
  K.hush = function (ctx, x, y, rx, ry, a) {
    ctx.save()
    ctx.translate(x, y); ctx.scale(1, ry / rx)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
    g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.6, `rgba(0,0,0,${a * 0.8})`); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(-rx, -rx, rx * 2, rx * 2)
    ctx.restore()
  }
  /** dark annulus on bg under ring text */
  K.track = function (ctx, x, y, r, w = 70, a = 0.85) {
    const g = ctx.createRadialGradient(x, y, Math.max(0, r - w), x, y, r + w)
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r - w, y - r - w, (r + w) * 2, (r + w) * 2)
  }
  /** ALIGN ring text between two hairlines */
  K.ring = function (ctx, x, y, r, c, start, o = {}) {
    ctx.save()
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.strokeStyle = rgba(c, 0.5); ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(x, y, r - 22, 0, TAU); ctx.stroke()
    ctx.beginPath(); ctx.arc(x, y, r + 22, 0, TAU); ctx.stroke()
    A.ringOfWords(ctx, 'ALIGN', x, y, r, { size: o.size || 23, spacing: 0.3, color: c, font: 'mono', weight: 400, start })
    ctx.restore()
  }
  /** mono label with inline zodiac glyphs. items: strings or { sign: i, color } */
  K.label = function (ctx, items, x, y, o = {}) {
    const size = o.size || 24, sp = (o.spacing == null ? 0.22 : o.spacing) * size
    const gw = size * 1.3
    MC.font = `400 ${size}px ${A.FONT.mono}`
    const widths = items.map((it) => (typeof it === 'string' ? [...it].reduce((s, c) => s + MC.measureText(c).width + sp, 0) : gw + sp))
    const total = widths.reduce((a, b) => a + b, 0) - sp
    let cx = x - total / 2
    items.forEach((it, k) => {
      if (typeof it === 'string') A.text(ctx, it, cx, y, { size, font: 'mono', spacing: sp / size, color: o.color, alpha: o.alpha, align: 'left', weight: 400 })
      else A.zodiac.glyph(ctx, it.sign, cx + gw / 2, y, size * 1.15, { color: it.color || o.color, lw: Math.max(1.8, size * 0.085), alpha: o.alpha })
      cx += widths[k]
    })
    return total
  }
  /** small mono caps flanked by hairlines */
  K.kicker = function (ctx, str, x, y, c, o = {}) {
    const size = o.size || 26
    const w = A.text(ctx, str, x, y, { size, font: 'mono', spacing: o.spacing || 0.5, color: c, weight: 400, alpha: o.alpha })
    const L = o.line == null ? 60 : o.line
    if (L > 0) {
      ctx.save(); ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
      ctx.strokeStyle = rgba(o.lineColor || c, 0.6); ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(x - w / 2 - 24, y); ctx.lineTo(x - w / 2 - 24 - L, y)
      ctx.moveTo(x + w / 2 + 24, y); ctx.lineTo(x + w / 2 + 24 + L, y); ctx.stroke()
      ctx.restore()
    }
  }
  /** a beat flash helper: strength a on frame 0 of a cut, decaying over 3 frames */
  K.cut = function (u, a, c) {
    if (u < 0) return
    const f = Math.floor(u * 30 + 1e-6)
    const v = [1, 0.45, 0.15][f]
    if (v && a * v > A.fx.flash) { A.fx.flash = a * v; A.fx.flashColor = c }
  }

  /* ================= the hook ================= */
  const TL = A.TL.hook
  const CX = 540, GY = 820 // glyph centre
  const NAME_Y = 1290

  A.registerScene({
    id: 'sign-hook', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const b = Math.floor(t / 0.5), u = t - b * 0.5 // beat index, seconds into beat
      const slam = 1 - ease.outExpo(seg(t, 0, 0.3)) // 1 → 0 over the opening slam
      const pulse = b > 0 ? 1 - ease.outCubic(seg(u, 0, 0.3)) : 0 // every later beat

      /* ---- fx ---- */
      K.cut(t, 0.85, mixHex(col, '#ffffff', 0.45))
      K.cut(t - 0.5, 0.3, col)
      K.cut(t - 1.0, 0.18, K.ink)
      A.fx.shake = 34 * (1 - seg(t, 0, 0.35)) + (b === 1 ? 14 : 5) * (1 - seg(u, 0, 0.15)) * (b > 0 ? 1 : 0)
      A.fx.halftoneCell = t < 0.2 ? 12 : 9
      if (t < 0.1) A.fx.look = { bloom: 0.6, halation: 0.7 } // keep the slam flash from blooming to mush

      /* ---- background ---- */
      A.stars(bg, t, { alpha: 0.7, count: 240, seed: 70 + idx })
      A.galaxy(bg, t, {
        cx: CX, cy: GY + 40, scale: 860 * (1 + 0.25 * slam + 0.03 * t), rot: 0.6 + idx * 0.5 + 0.18 * t - 1.6 * slam,
        tilt: 0.62, tiltAngle: 0.3 + (idx % 4) * 0.25 - 0.4, tint: col, tintAmt: 0.62, alpha: 0.72,
      })
      K.glow(bg, CX, GY, 620 + 80 * pulse, col, 0.22 + 0.25 * slam)
      K.hush(bg, CX, GY, 340, 340, 0.62)
      K.track(bg, CX, GY, 372, 60, 0.8)
      K.hush(bg, CX, 345, 420, 70, 0.9)
      K.hush(bg, CX, NAME_Y, 560, 170, 0.92)
      K.hush(bg, CX, 1440, 420, 60, 0.85)
      K.hush(bg, CX, 1560, 300, 50, 0.8)

      /* ---- ring of ALIGN around the glyph ---- */
      K.ring(fg, CX, GY, 372, K.ink, -0.1 * t + 0.5 * slam, { alpha: 0.85 * (1 - slam * 0.7) })

      /* ---- the glyph ---- */
      const size = 600 * (1 + 0.9 * slam + 0.035 * pulse)
      // slam ghosts: outline copies that fall in from larger
      if (slam > 0.02) {
        A.zodiac.glyph(fg, idx, CX, GY, size * (1 + 0.5 * slam), { color: K.ink, alpha: 0.5 * slam, lw: 4 })
        A.zodiac.glyph(fg, idx, CX, GY, size * (1 + 1.1 * slam), { color: K.ink, alpha: 0.3 * slam, lw: 3 })
      }
      // beat echo: a thin outline breathing outwards
      if (b > 0) {
        const e = ease.outCubic(seg(u, 0, 0.45))
        A.zodiac.glyph(fg, idx, CX, GY, 600 * (1 + 0.22 * e), { color: K.ink, alpha: 0.45 * (1 - e), lw: 3 })
      }
      A.zodiac.glyph(fg, idx, CX, GY, size, { color: '#07040f', lw: 58, alpha: 0.55 }) // dark underlay
      A.zodiac.glyph(fg, idx, CX, GY, size, { color: K.ink, glow: 1, glowColor: col, lw: 30 })
      // hot inner line, a print highlight
      A.zodiac.glyph(fg, idx, CX, GY, size, { color: mixHex(col, '#ffffff', 0.7), lw: 6, alpha: 0.55 })

      /* ---- copy ---- */
      const kIn = ease.outCubic(seg(t, 0.03, 0.25))
      K.kicker(fg, 'CALLING ALL', CX, 345 - 10 * (1 - kIn), A.C.bone, { size: 30, spacing: 0.6, alpha: kIn, line: 70 * kIn, lineColor: K.ink })

      // the sign name slams on beat 2, with the ALIGN outline echo stamped behind it
      if (t >= 0.5) {
        const n = t - 0.5
        const hit = 1 - ease.outExpo(seg(n, 0, 0.35))
        const spacing = lerp(0.32, 0.6, hit)
        const nsz = K.fit(K.name, { max: 200, maxW: 840, spacing: 0.32 })
        // ALIGN outline echoes (stamp on beat 3)
        if (t >= 1.0) {
          const e = 1 - ease.outExpo(seg(t - 1.0, 0, 0.3))
          const asz = 250 * (1 + 0.2 * e)
          fg.save(); fg.globalAlpha = 0.24 * (1 - 0.5 * e)
          A.text(fg, 'ALIGN', CX, NAME_Y + 6, { size: asz, spacing: 0.34, color: K.ink, stroke: K.ink, strokeWidth: 1.6, strokeOnly: true })
          fg.globalAlpha = 0.1
          A.text(fg, 'ALIGN', CX, NAME_Y + 6, { size: asz * 1.32, spacing: 0.34, color: K.ink, stroke: K.ink, strokeWidth: 1.2, strokeOnly: true })
          fg.restore()
        }
        A.text(fg, K.name, CX, NAME_Y, { size: nsz * (1 + 0.12 * hit), spacing, color: mixHex(A.C.bone, col, 0.12), alpha: clamp(0.3 + n * 12) })
      }
      if (t >= 1.0) {
        const d = ease.outCubic(seg(t, 1.0, 1.3))
        A.text(fg, S.dates.toUpperCase(), CX, 1440, { size: 30, font: 'mono', spacing: 0.32, color: K.ink, alpha: d, weight: 400 })
      }
      if (t >= 1.5) {
        const d = ease.outCubic(seg(t, 1.5, 1.8))
        K.kicker(fg, 'ALIGN', CX, 1560, A.C.gold, { size: 26, spacing: 0.9, alpha: d, line: 34 * d })
      }
    },
  })
})()
