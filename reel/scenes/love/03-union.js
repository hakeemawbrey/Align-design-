/* Teaser 2 · "Two skies" — 03 union (9–14 s) and aligned (14–17 s).
 * Union: two circles, one per sign colour, slide into a vesica piscis; the almond fills with
 * light; the heartbeat quickens; the seed grows into a flower of life; the skies fall together.
 * Hit (13.333 s): flash, shake, shockwave, the two glyphs snap side by side.
 * Aligned: "You both aligned." — the app's match line — inside a ring of ALIGN. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, clamp, lerp, rgba, mixHex, TAU } = A
  const TL = A.TL
  const Z = A.zodiac
  const L = A.love
  const HIT = TL.hit
  const VR = L.VR

  function circle(ctx, x, y, r, col, lw, prog = 1, start = -Math.PI / 2) {
    if (prog <= 0) return
    ctx.strokeStyle = col; ctx.lineWidth = lw
    ctx.beginPath(); ctx.arc(x, y, r, start, start + TAU * prog); ctx.stroke()
  }
  /** fill the lens (intersection of the two circles) */
  function lens(ctx, P, r, fill) {
    ctx.save()
    ctx.beginPath(); ctx.arc(P.ax, P.ay, r, 0, TAU); ctx.clip()
    ctx.beginPath(); ctx.arc(P.bx, P.by, r, 0, TAU)
    ctx.fillStyle = fill; ctx.fill()
    ctx.restore()
  }
  /** the merged sky after the hit: one galaxy, both tints */
  function merged(bg, T, scale, alpha, cy) {
    A.fx.halftoneCell = 7
    A.galaxy(bg, T, { cx: 540, cy, scale, rot: 0.4 + T * 0.32, tilt: 0.66, tiltAngle: 0.3, alpha: 0.6 * alpha, tint: L.colA, tintAmt: 0.6, density: 0.6 })
    A.galaxy(bg, T, { cx: 540, cy, scale: scale * 0.96, rot: 2.1 + T * 0.32 + 0.8, tilt: 0.66, tiltAngle: 0.3, alpha: 0.6 * alpha, tint: L.colB, tintAmt: 0.6, density: 0.6 })
  }
  /** big outlined ALIGN echoes on the heartbeat */
  function echoes(fg, T, cy, alpha) {
    const per = L.heartPeriod(T)
    for (let e = 0; e < 2; e++) {
      const ph = (((T % per) + per) % per) + e * per
      const p = ease.outCubic(clamp(ph / (per * 2)))
      if (p >= 1) continue
      A.text(fg, 'ALIGN', 540, cy, { size: 170 * (1 + p * 0.9), weight: 600, spacing: 0.3, color: 'rgba(0,0,0,0)', stroke: rgba(L.RUB, 0.22 * (1 - p) * alpha), strokeWidth: 1.4, strokeOnly: true })
    }
  }

  /* ================= union ================= */
  const U = TL.union
  A.registerScene({
    id: 'love-union', start: U.start, duration: U.duration,
    draw({ bg, fg, t, T }) {
      const P = L.pos(T)
      const pu = L.pulse(T)
      const th = T - HIT
      const after = th >= 0
      const cy = P.cy
      const nearHit = seg(T, 11.4, HIT)
      // lean into the house film look: the union glow blooms and halates
      A.fx.look = { halation: 1.2 + 0.6 * nearHit + (after ? 0.8 * Math.exp(-th * 2) : 0), bloom: 1.1 + 0.4 * nearHit }

      /* ---------- background ---------- */
      A.stars(bg, T, { alpha: 0.5, count: 240, seed: 22 })
      if (!after) {
        L.galaxies(bg, T, { alpha: 0.95 + 0.15 * pu, scale: lerp(200, 180, nearHit) })
        L.glow(bg, P.ax, P.ay, 240, L.colA, 0.2)
        L.glow(bg, P.bx, P.by, 240, L.colB, 0.2)
      } else {
        merged(bg, T, lerp(170, 330, ease.outExpo(seg(th, 0, 0.6))), 1, cy)
      }
      // the almond fills with light (halftoned glow)
      const lensA = ease.outCubic(seg(t, 1.0, 2.0))
      if (!after && lensA > 0) {
        const g = bg.createRadialGradient(P.cx, cy, 0, P.cx, cy, VR * 1.2)
        g.addColorStop(0, rgba('#fff4f0', (0.55 + 0.4 * pu) * lensA)); g.addColorStop(0.5, rgba(L.RUB, 0.5 * lensA)); g.addColorStop(1, rgba(L.RUB, 0.12 * lensA))
        lens(bg, P, VR, g)
      }
      L.glow(bg, P.cx, cy, 460, L.RUB, (0.12 + 0.18 * nearHit) * (0.6 + 0.6 * pu))
      // burst
      if (after) {
        const b = Math.exp(-th * 4)
        L.glow(bg, P.cx, cy, 300 + 500 * ease.outCubic(seg(th, 0, 0.5)), '#fff0f3', 0.9 * b)
        // carve a dark seat behind the glyph pair
        const dg = bg.createRadialGradient(P.cx, cy, 0, P.cx, cy, 230)
        dg.addColorStop(0, `rgba(0,0,0,${0.65 * (1 - b)})`); dg.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = dg; bg.fillRect(P.cx - 230, cy - 230, 460, 460)
      }

      /* ---------- foreground ---------- */
      echoes(fg, T, cy, (0.4 + 0.6 * seg(t, 0, 1)) * (after ? Math.exp(-th * 3) : 1))

      // flower of life grows out of the vesica (seed first, then the full flower)
      const fp = seg(t, 2.1, 4.2)
      if (fp > 0) {
        A.flowerOfLife(fg, P.cx, cy, VR, { rings: 1, lw: 1.6, color: L.GOLD, alpha: 0.75, progress: ease.inOutCubic(clamp(fp * 1.6)) })
        A.flowerOfLife(fg, P.cx, cy, VR, { rings: 2, lw: 1.1, color: L.GOLD, alpha: 0.4 * clamp(fp * 2 - 0.6), progress: ease.inOutCubic(clamp(fp * 1.25 - 0.25)), outer: true })
      }

      // the two sign circles slide together
      const cp = ease.outCubic(seg(t, 0, 0.7))
      if (!after) {
        fg.save()
        circle(fg, P.ax, P.ay, VR, mixHex(L.colA, '#ffffff', 0.15), 3, cp, Math.PI)
        circle(fg, P.bx, P.by, VR, mixHex(L.colB, '#ffffff', 0.15), 3, cp, 0)
        // lens: soft light + gold rim
        if (lensA > 0) {
          const g = fg.createRadialGradient(P.cx, cy, 0, P.cx, cy, VR)
          g.addColorStop(0, rgba('#fff4f0', (0.25 + 0.35 * pu) * lensA)); g.addColorStop(1, rgba(L.RUB, 0.08 * lensA))
          lens(fg, P, VR, g)
        }
        // heartbeat ring around the vesica
        const ringR = VR + P.R + 18 + 26 * (1 - pu)
        circle(fg, P.cx, cy, ringR, rgba(L.RUB, 0.45 * pu * cp), 2)
        fg.restore()
        // the heart chakra at the centre of the lens, now pink
        const hr = 6 + 6 * pu + 6 * nearHit
        L.glow(fg, P.cx, cy, hr * 6, mixHex(L.HEART, L.RUB, 0.8), 0.7 * lensA)
        fg.fillStyle = rgba('#ffe6ee', lensA); fg.beginPath(); fg.arc(P.cx, cy, hr * 0.6, 0, TAU); fg.fill()
        // glyphs ride their skies until they fall together
        const ga = 1 - ease.inQuad(seg(T, HIT - 0.35, HIT))
        const goff = 150 + 40 * cp
        L.glyphPlate(fg, L.ia, P.ax - 40 * cp, P.ay - goff, 62, L.colA, ga, 0.5 + 0.5 * pu)
        L.glyphPlate(fg, L.ib, P.bx + 40 * cp, P.by - goff, 62, L.colB, ga, 0.5 + 0.5 * pu)
      } else {
        // shockwave
        const sp = ease.outCubic(seg(th, 0, 0.9))
        if (sp < 1) {
          circle(fg, P.cx, cy, VR + sp * 820, rgba(mixHex(L.RUB, '#ffffff', 0.3), 0.9 * (1 - sp)), 6 * (1 - sp) + 1)
          const s2 = ease.outCubic(seg(th, 0.08, 0.9))
          circle(fg, P.cx, cy, VR + s2 * 600, rgba(L.GOLD, 0.6 * (1 - s2)), 1.5)
        }
        // the merged circle: both colours on one ring
        circle(fg, P.cx, cy, VR, rgba(L.colA, 0.8), 3, 0.5, Math.PI / 2)
        circle(fg, P.cx, cy, VR, rgba(L.colB, 0.8), 3, 0.5, -Math.PI / 2)
        // ink seat so the pair reads over the burst
        fg.save(); fg.globalAlpha = clamp(th / 0.12)
        const sg = fg.createRadialGradient(P.cx, cy, 0, P.cx, cy, 210)
        sg.addColorStop(0, 'rgba(7,4,15,0.8)'); sg.addColorStop(0.6, 'rgba(7,4,15,0.5)'); sg.addColorStop(1, 'rgba(7,4,15,0)')
        fg.fillStyle = sg; fg.fillRect(P.cx - 210, cy - 210, 420, 420); fg.restore()
        // glyphs snap side by side
        const sn = ease.outBack(seg(th, 0, 0.16))
        L.pair(fg, P.cx, cy, 100, { gap: lerp(190, 92, sn), alpha: clamp(th / 0.05), glow: 0.6 + 1.2 * Math.exp(-th * 5), xAlpha: seg(th, 0.08, 0.2) })
        A.fx.flash = 0.85 * Math.exp(-th * 7)
        A.fx.flashColor = '#ffe8ef'
        A.fx.shake = 34 * Math.exp(-th * 6)
      }

      /* ---------- copy ---------- */
      const ca = ease.outCubic(seg(t, 0.3, 1.0)) * (1 - ease.inQuad(seg(T, HIT - 0.3, HIT)))
      L.inked(fg, () => {
        A.text(fg, 'VESICA PISCIS', 540, 296, { size: 24, font: 'mono', weight: 700, spacing: 0.45, color: L.GOLD, alpha: ca * 0.9 })
        A.text(fg, 'where two circles meet, light gets in', 540, 356, { size: 44, italic: true, weight: 400, color: L.BONE, alpha: ca })
        A.text(fg, `ANAHATA  ·  YAM  ·  THE HEART`, 540, 1560, { size: 24, font: 'mono', spacing: 0.22, color: mixHex(L.RUB, L.BONE, 0.2), alpha: ca * 0.85 })
      })
      L.mantra(fg, ca)
    },
  })

  /* ================= aligned ================= */
  const AL = TL.aligned
  A.registerScene({
    id: 'love-aligned', start: AL.start, duration: AL.duration,
    draw({ bg, fg, t, T }) {
      const th = T - HIT
      const cy = L.cy(T)
      const pu = L.lubdub(th, L.BEAT)
      const out = 1 - ease.inQuad(seg(t, 2.72, 3.0))
      const k = lerp(1, 0.72, ease.inOutCubic(seg(t, 0, 0.7))) // geometry settles inside the ring

      /* background */
      A.stars(bg, T, { alpha: 0.5, count: 240, seed: 22 })
      merged(bg, T, 330 + 10 * t, out, cy)
      L.glow(bg, 540, cy, 440, L.RUB, (0.16 + 0.12 * pu) * out)
      const dg = bg.createRadialGradient(540, cy, 0, 540, cy, 260)
      dg.addColorStop(0, 'rgba(0,0,0,0.95)'); dg.addColorStop(0.55, 'rgba(0,0,0,0.75)'); dg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = dg; bg.fillRect(280, cy - 260, 520, 520)
      // keep the title clear of the galaxy
      const tg = bg.createLinearGradient(0, 1220, 0, 1500)
      tg.addColorStop(0, 'rgba(0,0,0,0)'); tg.addColorStop(0.4, 'rgba(0,0,0,0.6)'); tg.addColorStop(1, 'rgba(0,0,0,0)')
      bg.fillStyle = tg; bg.fillRect(0, 1220, 1080, 280)

      fg.save()
      fg.globalAlpha = out
      /* geometry */
      A.flowerOfLife(fg, 540, cy, VR * k, { rings: 2, lw: 1.1, color: L.GOLD, alpha: 0.38, outer: true })
      A.flowerOfLife(fg, 540, cy, VR * k, { rings: 1, lw: 1.5, color: L.GOLD, alpha: 0.55 })
      circle(fg, 540, cy, VR * k, rgba(L.colA, 0.85), 3, 0.5, Math.PI / 2)
      circle(fg, 540, cy, VR * k, rgba(L.colB, 0.85), 3, 0.5, -Math.PI / 2)
      // heartbeat ring
      circle(fg, 540, cy, VR * k * 3 + 12 + 20 * (1 - pu), rgba(L.RUB, 0.4 * pu), 2)

      /* the ring of ALIGN */
      const ra = ease.outCubic(seg(t, 0.0, 0.6))
      const RR = 360
      A.ringOfWords(fg, 'ALIGN', 540, cy, RR * lerp(0.92, 1, ra), { size: 24, font: 'mono', weight: 700, spacing: 0.12, color: L.GOLD, alpha: 0.85 * ra, start: -0.3 - T * 0.1, sep: '  ✦  ' })
      fg.strokeStyle = rgba(L.GOLD, 0.35 * ra); fg.lineWidth = 1.2
      fg.beginPath(); fg.arc(540, cy, RR - 26, 0, TAU); fg.stroke()
      fg.beginPath(); fg.arc(540, cy, RR + 26, 0, TAU); fg.stroke()

      /* the pair, centred */
      L.pair(fg, 540, cy, 100, { gap: 92, glow: 0.6 + 0.35 * pu })
      fg.restore()

      /* copy */
      const top = ease.outCubic(seg(t, 0.15, 0.6))
      const ttl = ease.outCubic(seg(t, 0.05, 0.55))
      const ds = ease.outCubic(seg(t, 0.4, 0.85))
      fg.save(); fg.globalAlpha = out
      L.inked(fg, () => {
        A.text(fg, `${L.SA.name.toUpperCase()} ${L.AURA[L.ia].toUpperCase()}   ✦   ${L.SB.name.toUpperCase()} ${L.AURA[L.ib].toUpperCase()}`, 540, 420, { size: 24, font: 'mono', spacing: 0.12, color: A.C.label2, alpha: top })
        A.text(fg, 'You both aligned.', 540, 1345 + 18 * (1 - ttl), { size: 100, italic: true, weight: 400, color: L.BONE, alpha: ttl })
        const line = `${L.SA.name.toUpperCase()} × ${L.SB.name.toUpperCase()}  ·  ${L.descriptor}`
        const sp = line.length > 38 ? 0.04 : line.length > 32 ? 0.1 : 0.16
        A.text(fg, line, 540, 1445, { size: 24, font: 'mono', weight: 700, spacing: sp, color: L.GOLD, alpha: ds })
      })
      L.mantra(fg, ds, 1640, mixHex(L.RUB, L.BONE, 0.3))
      fg.restore()
    },
  })
})()
