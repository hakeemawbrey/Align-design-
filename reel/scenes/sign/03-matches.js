/* Teaser 1 · 03 · Matches (8–12 s): "your matches are already aligning".
 * The sign's glyph sits in the centre over a small heart-chakra glow; its most compatible
 * signs (two same-element trines, a complementary-element sextile, the opposite sign) orbit
 * in one per beat as small glowing glyphs with names, tied to the centre by fine rub-pink
 * synastry lines that pulse on the beat. ALIGN ring text orbits outside. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.matches
  const K = A.signTeaser
  const SIGNS = A.zodiac.SIGNS
  const CX = 540, CY = 940
  const RR = 452 // ring
  const OR = 322 // orbit radius of the matches
  const RUB = A.C.rub
  // settle angles: the four diagonals (top-left first, clockwise)
  const ANG = [-0.75 * Math.PI, -0.25 * Math.PI, 0.25 * Math.PI, 0.75 * Math.PI]
  const TAGS = ['', '', '', 'OPPOSITES']

  A.registerScene({
    id: 'sign-matches', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const b = Math.floor(t / 0.5), u = t - b * 0.5
      const pulse = 1 - ease.outCubic(seg(u, 0, 0.35))
      const spin = 0.07 * t // the whole system turns slowly

      /* ---- fx ---- */
      K.cut(t, 0.45, mixHex(RUB, '#ffffff', 0.3))
      for (let k = 0; k < 4; k++) K.cut(t - (0.5 + k * 0.5), 0.12, k === 3 ? RUB : SIGNS[K.matches[k]].color)
      K.cut(t - 3, 0.25, RUB)
      A.fx.shake = (t < 0.2 ? 14 : 4) * (1 - seg(u, 0, 0.15))

      /* ---- background ---- */
      A.stars(bg, t, { alpha: 0.75, count: 260, seed: 120 + K.idx })
      A.galaxy(bg, t, {
        cx: CX, cy: CY, scale: 1050 + 40 * t, rot: 4.2 + K.idx * 0.3 - 0.2 * t - 0.7 * (1 - ease.outExpo(seg(t, 0, 0.9))),
        tilt: 0.78, tiltAngle: 0.2, tint: mixHex(K.col, RUB, 0.5), tintAmt: 0.58, alpha: 0.45,
      })
      K.glow(bg, CX, CY, 300 + 40 * pulse, RUB, 0.35)
      K.glow(bg, CX, CY, 600, K.col, 0.12)
      K.hush(bg, CX, CY, 400, 400, 0.6)
      K.track(bg, CX, CY, RR, 60, 0.85)
      K.hush(bg, CX, 320, 520, 150, 0.92)
      K.hush(bg, CX, 1530, 500, 120, 0.9)

      /* ---- heart chakra, small, behind the centre ---- */
      if (A.chakra) {
        A.chakra.draw(fg, 3, CX, CY, 175 * (1 + 0.05 * pulse), { color: RUB, alpha: 0.42, lw: 1.6, rot: -spin * 1.5 })
      }

      /* ---- ring ---- */
      K.ring(fg, CX, CY, RR, mixHex(RUB, A.C.bone, 0.25), 0.08 * t + 1.1, { alpha: 0.85 })

      /* ---- matches: positions ---- */
      const pos = K.matches.map((s, k) => {
        const st = 0.5 + k * 0.5
        const e = ease.outCubic(seg(t, st, st + 0.42))
        const a = ANG[k] + spin - (1 - e) * 1.2 // spiral in
        const r = lerp(OR + 520, OR, e)
        return { s, k, e, on: t >= st, st, x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
      })

      /* ---- synastry web: faint chords between matches, pink spokes to the centre ---- */
      fg.save()
      fg.lineCap = 'round'
      const live = pos.filter((p) => p.e > 0.98)
      fg.strokeStyle = rgba(A.C.bone, 0.16); fg.lineWidth = 1
      for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
        fg.beginPath(); fg.moveTo(live[i].x, live[i].y); fg.lineTo(live[j].x, live[j].y); fg.stroke()
      }
      pos.forEach((p) => {
        if (!p.on) return
        const draw = ease.outCubic(seg(t, p.st + 0.2, p.st + 0.5))
        if (draw <= 0) return
        const dx = p.x - CX, dy = p.y - CY, L = Math.hypot(dx, dy)
        const ux = dx / L, uy = dy / L
        const r0 = 128, r1 = r0 + (L - 70 - r0) * draw
        const beatGlow = 0.45 + 0.55 * pulse
        fg.strokeStyle = rgba(RUB, 0.3 * beatGlow); fg.lineWidth = 7
        fg.beginPath(); fg.moveTo(CX + ux * r0, CY + uy * r0); fg.lineTo(CX + ux * r1, CY + uy * r1); fg.stroke()
        fg.strokeStyle = rgba(mixHex(RUB, '#ffffff', 0.2), 0.9); fg.lineWidth = 1.6
        fg.beginPath(); fg.moveTo(CX + ux * r0, CY + uy * r0); fg.lineTo(CX + ux * r1, CY + uy * r1); fg.stroke()
        // a spark travelling the line on each beat
        if (draw >= 1) {
          const q = ease.inOutQuad(seg(u, 0, 0.45))
          const sx = CX + ux * lerp(r1, r0, q), sy = CY + uy * lerp(r1, r0, q)
          const g = fg.createRadialGradient(sx, sy, 0, sx, sy, 14)
          g.addColorStop(0, rgba('#ffffff', 0.95 * (1 - q * 0.5))); g.addColorStop(0.35, rgba(RUB, 0.7)); g.addColorStop(1, rgba(RUB, 0))
          fg.fillStyle = g; fg.beginPath(); fg.arc(sx, sy, 14, 0, TAU); fg.fill()
        }
      })
      fg.restore()

      /* ---- matches: glyphs + names ---- */
      pos.forEach((p) => {
        if (!p.on) return
        const S = SIGNS[p.s]
        const c = mixHex(S.color, '#ffffff', 0.2)
        const hit = 1 - ease.outCubic(seg(t, p.st + 0.3, p.st + 0.6))
        // dark disc so the glyph prints clean over the web
        fg.fillStyle = rgba('#07040f', 0.85 * p.e)
        fg.beginPath(); fg.arc(p.x, p.y, 62, 0, TAU); fg.fill()
        const halo = fg.createRadialGradient(p.x, p.y, 20, p.x, p.y, 92)
        halo.addColorStop(0, rgba(S.color, 0.32 * p.e)); halo.addColorStop(1, rgba(S.color, 0))
        fg.fillStyle = halo; fg.beginPath(); fg.arc(p.x, p.y, 92, 0, TAU); fg.fill()
        fg.strokeStyle = rgba(c, 0.6 * p.e); fg.lineWidth = 1.4
        fg.beginPath(); fg.arc(p.x, p.y, 62, 0, TAU); fg.stroke()
        A.zodiac.glyph(fg, p.s, p.x, p.y, 78 * (1 + 0.25 * hit * (p.e > 0.98 ? 1 : 0)), { color: c, glow: 0.9, glowColor: S.color, lw: 5.5, alpha: clamp(p.e * 1.5) })
        const na = ease.outCubic(seg(t, p.st + 0.25, p.st + 0.5))
        const below = p.y < CY // labels sit on the inner side, clear of the ring
        const ly = p.y + (below ? 96 : -96)
        const tagY = below ? ly + 30 : ly - 30
        const nm = S.name.toUpperCase()
        const tw = nm.length * 24 * 0.88 + 28
        fg.fillStyle = rgba('#07040f', 0.8 * na)
        fg.fillRect(p.x - tw / 2, Math.min(ly, TAGS[p.k] ? tagY : ly) - 20, tw, TAGS[p.k] ? 70 : 40)
        A.text(fg, nm, p.x, ly, { size: 24, font: 'mono', spacing: 0.28, color: A.C.bone, alpha: na, weight: 700 })
        if (TAGS[p.k]) A.text(fg, TAGS[p.k], p.x, tagY, { size: 19, font: 'mono', spacing: 0.4, color: mixHex(RUB, '#ffffff', 0.35), alpha: na, weight: 700 })
      })

      /* ---- centre glyph ---- */
      const cg = 1 - ease.outExpo(seg(t, 0, 0.3))
      A.zodiac.glyph(fg, K.idx, CX, CY, 210 * (1 + 0.4 * cg + 0.05 * pulse), { color: '#07040f', lw: 30, alpha: 0.6 })
      A.zodiac.glyph(fg, K.idx, CX, CY, 210 * (1 + 0.4 * cg + 0.05 * pulse), { color: K.ink, glow: 1.1, glowColor: K.col, lw: 14 })

      /* ---- copy ---- */
      const a1 = ease.outCubic(seg(t, 0, 0.25))
      A.text(fg, 'Your matches are', CX, 268 - 10 * (1 - a1), { size: 70, italic: true, weight: 400, color: A.C.bone, alpha: a1 })
      A.text(fg, 'already aligning.', CX, 352 - 10 * (1 - a1), { size: 70, italic: true, weight: 400, color: mixHex(RUB, '#ffffff', 0.25), alpha: a1 })

      const items = ['ALIGNED WITH  ']
      pos.forEach((p, k) => { if (p.on) { if (k) items.push(' '); items.push({ sign: p.s, color: mixHex(SIGNS[p.s].color, '#ffffff', 0.2) }) } })
      const ba = ease.outCubic(seg(t, 0.5, 0.8))
      K.label(fg, items, CX, 1520, { size: 28, color: A.C.bone, alpha: ba })
      A.text(fg, `${K.element} + ${K.idx % 2 === 0 ? (K.element === 'FIRE' ? 'AIR' : 'FIRE') : (K.element === 'EARTH' ? 'WATER' : 'EARTH')}`, CX, 1585, { size: 20, font: 'mono', spacing: 0.5, color: A.C.gold, alpha: 0.8 * ease.outCubic(seg(t, 2.5, 2.8)), weight: 400 })
    },
  })
})()
