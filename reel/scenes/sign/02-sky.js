/* Teaser 1 · 02 · Sky (2.5–8 s).
 * The sign's constellation draws in large, its chakra faint behind, ALIGN ring orbiting.
 *  0.0–2.0  info cuts on every beat: element, aura, ruling planet, modality
 *  2.0–4.0  three trait words stack in one per beat (big italic serif)
 *  4.0–5.5  the chakra beat: the chakra prints in flat ink (a nod to the hero reel),
 *           chakra name above, ALIGN stamped below */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A
  const TL = A.TL.sky
  const K = A.signTeaser
  const CX = 540, CY = 930
  const RR = 470 // ring radius
  const INFO_LABEL_Y = 252, INFO_Y = 345

  const info = [
    ['ELEMENT', K.element],
    ['AURA', K.aura],
    ['RULED BY', K.ruler],
    ['MODALITY', K.mode],
  ]
  const ch = K.chakra
  const chInk = ch ? ch.ink : K.ink

  A.registerScene({
    id: 'sign-sky', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      const b = Math.floor(t / 0.5), u = t - b * 0.5
      const pulse = 1 - ease.outCubic(seg(u, 0, 0.3))
      const phase = t < 2 ? 0 : t < 4 ? 1 : 2
      const chakraBeat = phase === 2
      const tc = t - 4 // seconds into the chakra beat

      /* ---- fx ---- */
      K.cut(t, 0.4, K.col)
      if (phase === 0 && b > 0) K.cut(u, 0.1, K.ink)
      if (phase === 1) K.cut(u, b === 4 ? 0.22 : 0.14, K.ink)
      K.cut(tc, 0.5, chInk)
      A.fx.shake = (t < 0.2 || (tc >= 0 && tc < 0.2) ? 14 : 5) * (1 - seg(u, 0, 0.15))

      /* ---- background ---- */
      A.stars(bg, t, { alpha: 0.8, count: 300, seed: 90 + K.idx })
      const gTint = chakraBeat ? mixHex(K.col, chInk, 0.6) : K.col
      A.galaxy(bg, t, {
        cx: 700 - 60 * t, cy: CY + 80, scale: 1000 + (chakraBeat ? 60 * ease.outCubic(seg(tc, 0, 0.5)) : 0),
        rot: 2.4 + K.idx * 0.4 + 0.16 * t + (chakraBeat ? 0.5 * ease.outExpo(seg(tc, 0, 0.8)) : 0),
        tilt: 0.5, tiltAngle: -0.55, tint: gTint, tintAmt: 0.6, alpha: chakraBeat ? 0.6 : 0.55,
      })
      K.glow(bg, CX, CY, 560 + 60 * pulse, chakraBeat ? chInk : K.col, 0.16)
      K.hush(bg, CX, CY, 380, 300, phase === 1 ? 0.92 : 0.7)
      if (phase === 1) K.hush(bg, CX, CY, 560, 380, 0.75)
      K.track(bg, CX, CY, RR, 64, 0.85)
      K.hush(bg, CX, 300, 520, 140, 0.92)
      K.hush(bg, CX, 1500, 500, 110, 0.9)
      K.hush(bg, CX, 1600, 420, 60, 0.85)

      /* ---- chakra behind ---- */
      const rot = 0.05 * t
      if (A.chakra) {
        if (!chakraBeat) {
          A.chakra.draw(fg, K.chakraIdx, CX, CY, 400, { color: chInk, alpha: phase === 1 ? 0.12 : 0.2, lw: 1.6, rot, progress: ease.outCubic(seg(t, 0, 1.8)) })
        } else {
          const hit = 1 - ease.outCubic(seg(tc, 0, 0.42))
          const off = tc >= 0.5 ? 1 - ease.outCubic(seg(tc, 0.5, 0.9)) : 0
          const R = (K.chakraIdx === 5 ? 340 : 370) * (1 + 0.12 * hit * hit + 0.04 * off)
          if (hit > 0.02) A.chakra.draw(fg, K.chakraIdx, CX, CY, R * (1 + 0.45 * hit), { color: chInk, alpha: 0.6 * hit, lw: 2.5, rot: rot + 0.1 * hit })
          if (tc >= 0.5) { const e = ease.outCubic(seg(tc, 0.5, 1.2)); A.chakra.draw(fg, K.chakraIdx, CX, CY, R * (1 + 0.3 * e), { color: chInk, alpha: 0.7 * (1 - e), lw: 2, rot }) }
          A.chakra.draw(fg, K.chakraIdx, CX, CY, R, { fill: true, color: chInk, rot: rot - 0.18 * hit, progress: 0.3 + 0.7 * ease.outCubic(seg(tc, 0, 0.55)) })
        }
      }

      /* ---- ring ---- */
      K.ring(fg, CX, CY, RR, chakraBeat ? chInk : K.ink, -0.09 * t - 0.6, { alpha: 0.9 })

      /* ---- constellation ---- */
      const cA = phase === 0 ? 1 : phase === 1 ? 0.3 : 0.55
      const cSize = chakraBeat ? 560 : 680
      A.zodiac.constellation(fg, K.idx, CX, CY, cSize, {
        color: chakraBeat ? '#ffffff' : K.ink, alpha: cA, lw: chakraBeat ? 2 : 2.6,
        progress: ease.inOutQuad(seg(t, 0.05, 1.7)),
      })

      /* ---- top: info cuts / summary / chakra name ---- */
      if (phase === 0) {
        const [lab, val] = info[Math.min(3, b)]
        const rv = ease.outCubic(seg(u, 0, 0.12))
        A.text(fg, lab, CX, INFO_LABEL_Y, { size: 26, font: 'mono', spacing: 0.5, color: A.C.bone, alpha: 1, weight: 400 })
        const vs = K.fit(val, { max: 104, maxW: 900, spacing: 0.22 })
        A.text(fg, val, CX, INFO_Y + 10 * (1 - rv), { size: vs * (1 + 0.06 * pulse), spacing: lerp(0.22, 0.4, 1 - rv), color: K.ink, alpha: rv })
        // beat ticks: four dots under the info, the current one lit
        for (let k = 0; k < 4; k++) {
          fg.fillStyle = k <= b ? K.ink : rgba(A.C.bone, 0.3)
          fg.beginPath(); fg.arc(CX + (k - 1.5) * 26, 420, k === b ? 5 : 3.5, 0, TAU); fg.fill()
        }
      } else if (phase === 1) {
        // compact recap of the info, then the traits own the centre
        K.label(fg, [{ sign: K.idx, color: K.ink }, `  ${K.element} · ${K.aura} · ${K.mode}`], CX, 300, { size: 24, color: A.C.bone, alpha: 0.9 })
      } else {
        const rv = ease.outCubic(seg(tc, 0, 0.2))
        A.text(fg, 'CHAKRA · ' + (ch ? ch.sanskrit.toUpperCase() : ''), CX, INFO_LABEL_Y, { size: 24, font: 'mono', spacing: 0.5, color: A.C.bone, alpha: 0.85 * rv, weight: 400 })
        const nm = ch ? ch.name.toUpperCase() : ''
        const vs = K.fit(nm, { max: 104, maxW: 840, spacing: 0.3 })
        A.text(fg, nm, CX, INFO_Y, { size: vs, spacing: lerp(0.3, 0.55, 1 - ease.outExpo(seg(tc, 0, 0.5))), color: chInk })
      }

      /* ---- centre: trait stack ---- */
      if (phase === 1) {
        const tr = K.traits
        const sizes = tr.map((w) => K.fit(w, { max: 132, maxW: 820, italic: true, weight: 400 }))
        const ys = [CY - 160, CY, CY + 160]
        tr.forEach((w, k) => {
          const st = 2 + k * 0.5
          if (t < st) return
          const e = 1 - ease.outExpo(seg(t, st, st + 0.3))
          const last = k === 2
          A.text(fg, w, CX, ys[k], { size: sizes[k] * (1 + 0.18 * e), italic: true, weight: 400, color: last ? K.ink : A.C.bone, alpha: clamp((t - st) * 14) })
        })
      }

      /* ---- bottom ---- */
      if (phase < 2) {
        const a = ease.outCubic(seg(t, 0.2, 0.6))
        K.label(fg, ['THE CONSTELLATION ', K.name], CX, 1500, { size: 26, color: A.C.bone, alpha: a, spacing: 0.3 })
        A.text(fg, 'ALIGN', CX, 1572, { size: 26, font: 'mono', spacing: 0.9, color: A.C.gold, alpha: a, weight: 400 })
      } else {
        // ALIGN stamped below, mantra-style
        const e = 1 - ease.outExpo(seg(tc, 0, 0.45))
        A.text(fg, 'ALIGN', CX, 1500 + 14 * e, { size: 132, spacing: lerp(0.36, 0.62, e), color: chInk })
        const items = ch ? `${ch.bija ? ch.bija + ' · ' : ''}${ch.planet.toUpperCase()} · ${K.name}` : K.name
        A.text(fg, items, CX, 1612, { size: 24, font: 'mono', spacing: 0.3, color: A.C.bone, alpha: 0.9 * ease.outCubic(seg(tc, 0.1, 0.4)), weight: 400 })
      }
    },
  })
})()
