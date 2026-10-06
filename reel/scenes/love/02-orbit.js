/* Teaser 2 · "Two skies" — 02 orbit (4–9 s).
 * The two skies spiral in around a shared centre, a step closer on every heartbeat. Their
 * constellations draw in; fine synastry lines join star to star and pulse rub pink, lub-dub.
 * Each sky's heart chakra warms from green to pink as they near. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, clamp, lerp, rgba, mixHex, TAU } = A
  const TL = A.TL
  const Z = A.zodiac
  const L = A.love
  const slot = TL.orbit
  const CS = 230 // constellation size

  /** star positions of sign i's constellation centred at x,y */
  const stars = (i, x, y) => Z.CONSTELLATIONS[i].pts.map(([px, py]) => [x + (px * CS) / 100, y + (py * CS) / 100])
  /** synastry pairs: every star of A to a partner in B (deterministic, a few doubles) */
  const PAIRS = (() => {
    const na = Z.CONSTELLATIONS[L.ia].pts.length, nb = Z.CONSTELLATIONS[L.ib].pts.length
    const out = []
    for (let k = 0; k < na; k++) out.push([k, (k * 3 + 1) % nb])
    for (let k = 0; k < Math.min(3, nb); k++) out.push([(k * 2 + 1) % na, (nb - 1 - k * 2 + nb) % nb])
    return out
  })()

  A.registerScene({
    id: 'love-orbit', start: slot.start, duration: slot.duration,
    draw({ bg, fg, t, T }) {
      const P = L.pos(T)
      const near = L.near(T)
      const pu = L.lubdub(T)
      const out = 1 - ease.inQuad(seg(t, 4.75, 5)) // hand-off into union is mostly continuous

      /* background */
      A.stars(bg, T, { alpha: 0.55, count: 240, seed: 21 })
      L.galaxies(bg, T, { alpha: 0.95 + 0.12 * pu * near, scale: lerp(210, 188, near) })
      L.glow(bg, P.ax, P.ay, 260, L.colA, 0.22)
      L.glow(bg, P.bx, P.by, 260, L.colB, 0.22)
      // a warm field gathers in the shared centre
      L.glow(bg, P.cx, P.cy, 420, L.RUB, (0.08 + 0.2 * near) * (0.7 + 0.5 * pu))

      /* the orbit path: a faint dotted spiral trace of where they are heading */
      fg.save()
      fg.strokeStyle = rgba(L.BONE, 0.14)
      fg.lineWidth = 1
      fg.setLineDash([2, 9])
      fg.beginPath(); fg.arc(P.cx, P.cy, P.R, 0, TAU); fg.stroke()
      fg.setLineDash([])
      fg.restore()

      /* ALIGN rings, ride with each sky */
      A.ringOfWords(fg, 'ALIGN', P.ax, P.ay, 236 - 30 * near, { size: 15, font: 'mono', weight: 700, spacing: 0.3, color: L.colA, alpha: 0.45 * (1 - 0.5 * near), start: T * 0.06, sep: '  ·  ' })
      A.ringOfWords(fg, 'ALIGN', P.bx, P.by, 236 - 30 * near, { size: 15, font: 'mono', weight: 700, spacing: 0.3, color: L.colB, alpha: 0.45 * (1 - 0.5 * near), start: -T * 0.06, sep: '  ·  ' })

      /* constellations */
      const cp = ease.outCubic(seg(t, 0.2, 1.6))
      Z.constellation(fg, L.ia, P.ax, P.ay, CS, { progress: cp, color: mixHex(L.colA, '#ffffff', 0.35), lw: 1.6, alpha: 0.9 })
      Z.constellation(fg, L.ib, P.bx, P.by, CS, { progress: cp, color: mixHex(L.colB, '#ffffff', 0.35), lw: 1.6, alpha: 0.9 })

      /* synastry lines: pulse rub pink on lub-dub */
      const sa = stars(L.ia, P.ax, P.ay), sb = stars(L.ib, P.bx, P.by)
      const lp = seg(t, 0.9, 2.4)
      fg.save()
      fg.lineCap = 'round'
      fg.globalCompositeOperation = 'lighter'
      PAIRS.forEach(([i, j], k) => {
        const f = clamp(lp * (PAIRS.length + 3) - k)
        if (f <= 0) return
        const [x1, y1] = sa[i], [x2, y2] = sb[j]
        const xe = lerp(x1, x2, ease.outCubic(f)), ye = lerp(y1, y2, ease.outCubic(f))
        const a = (0.16 + 0.55 * pu) * (0.6 + 0.4 * near)
        fg.strokeStyle = rgba(L.RUB, a * 0.35)
        fg.lineWidth = 4 + 3 * pu
        fg.beginPath(); fg.moveTo(x1, y1); fg.lineTo(xe, ye); fg.stroke()
        fg.strokeStyle = rgba(mixHex(L.RUB, '#ffd9e4', pu * 0.6), Math.min(1, a + 0.12))
        fg.lineWidth = 1.1
        fg.beginPath(); fg.moveTo(x1, y1); fg.lineTo(xe, ye); fg.stroke()
        // a bead of light travels each line on the lub
        const ph = ((T % L.BEAT) + L.BEAT) % L.BEAT
        const bp = clamp(ph / 0.5)
        if (f >= 1 && bp < 1) {
          const bx = lerp(x1, x2, (bp + k * 0.13) % 1), by = lerp(y1, y2, (bp + k * 0.13) % 1)
          L.glow(fg, bx, by, 10, '#ffd9e4', 0.7 * (1 - bp))
        }
      })
      fg.restore()

      /* chakra columns, heart warming */
      L.column(fg, P.ax, P.ay, near, pu, 0.85)
      L.column(fg, P.bx, P.by, near, pu, 0.85)

      /* glyphs ride above each sky (screen-up, so they stay readable while orbiting) */
      const goff = lerp(172, 150, near)
      L.glyphPlate(fg, L.ia, P.ax, P.ay - goff, 62, L.colA, out, 0.5 + 0.4 * pu * near)
      L.glyphPlate(fg, L.ib, P.bx, P.by - goff, 62, L.colB, out, 0.5 + 0.4 * pu * near)

      /* copy */
      const c1 = ease.outCubic(seg(t, 0.35, 1.2)) * (1 - ease.inQuad(seg(t, 4.5, 4.95)))
      const c2 = ease.outCubic(seg(t, 2.0, 2.85)) * (1 - ease.inQuad(seg(t, 4.5, 4.95)))
      L.inked(fg, () => {
        A.text(fg, 'Same stars.', 540, 330 + 10 * (1 - c1), { size: 70, italic: true, weight: 400, color: L.BONE, alpha: c1 })
        A.text(fg, 'Different orbits.', 540, 1600 + 10 * (1 - c2), { size: 70, italic: true, weight: 400, color: L.BONE, alpha: c2 })
        A.text(fg, 'SYNASTRY  ·  ' + L.SA.name.toUpperCase() + ' + ' + L.SB.name.toUpperCase(), 540, 260, { size: 18, font: 'mono', spacing: 0.3, color: L.GOLD, alpha: c1 * 0.85 })
      })
      L.mantra(fg, c2, 1668)
    },
  })
})()
