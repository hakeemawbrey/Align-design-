/* Mashup · an imagery-led collage edit (15 s, 120 bpm).
 * cosmos → the signs → the chakras → two souls → the brand.
 * Two paces from one file: ALIGN.TL.pace = 'fast' (beat cuts) | 'dreamy' (dissolves + light leaks).
 *
 * Every shot renders into its own pair of offscreen canvases (src → optional halftone → comp),
 * so each shot chooses its own print screen and shots can cross-dissolve cleanly. The finished
 * composite goes to env.bg with the global halftone switched off; the house film look does the rest.
 * Pure function of time throughout. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, TAU } = A
  const W = A.W, H = A.H
  const PACE = (A.TL && A.TL.pace) || 'fast'
  const BEAT = 0.5

  /* ---------- palette: indigo, rose, ember gold ---------- */
  const P = { indigo: '#3b3fb8', deep: '#1a1450', violet: '#7a5cff', rose: '#e8628a', blush: '#ff9ab8', ember: '#f2a04a', gold: '#f2c75c', coral: '#f07a76', bone: '#efe6d6' }

  /* ---------- images (top level so they preload) ---------- */
  const FIG = {}, AURA = {}
  for (const id of A.SIGN_IDS) { FIG[id] = A.img(`img/figure/${id}.jpg`); AURA[id] = A.img(`img/aura/${id}.jpg`) }

  /* ---------- offscreen canvases ---------- */
  let SLOTS = null, TMP = null
  function slots() {
    if (!SLOTS) {
      SLOTS = [0, 1].map(() => ({ src: A.makeCanvas(W, H), comp: A.makeCanvas(W, H) }))
      TMP = A.makeCanvas(W, H)
    }
    return SLOTS
  }

  /* ---------- drawing helpers ---------- */
  /** draw image so the normalised image point (px,py) lands on (cx,cy); sc = screen px per image px */
  function place(ctx, im, cx, cy, sc, px = 0.5, py = 0.5) {
    if (!im.naturalWidth) return null
    const w = im.naturalWidth * sc, h = im.naturalHeight * sc
    const x = cx - px * w, y = cy - py * h
    ctx.drawImage(im, x, y, w, h)
    return [x, y, w, h]
  }
  /** a colour grade: 'color' keeps luminance and swaps hue (blacks stay black) */
  function grade(ctx, col, amt, mode = 'color', rect) {
    if (!col || amt <= 0) return
    ctx.save()
    ctx.globalCompositeOperation = mode
    ctx.globalAlpha = clamp(amt)
    ctx.fillStyle = col
    if (rect) ctx.fillRect(...rect); else ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.restore()
  }
  /** image placed, graded, feathered to an ellipse (rw, rh) and composited with `op` */
  function feathered(ctx, im, o) {
    const t = TMP.getContext('2d')
    t.setTransform(1, 0, 0, 1, 0, 0); t.globalAlpha = 1; t.globalCompositeOperation = 'source-over'
    t.clearRect(0, 0, W, H)
    const r = place(t, im, o.cx, o.cy, o.sc, o.px, o.py)
    if (!r) return
    if (o.grade) grade(t, o.grade[0], o.grade[1], o.grade[2] || 'color', r)
    if (o.lift) grade(t, o.lift[0], o.lift[1], 'screen', r)
    // feather
    t.globalCompositeOperation = 'destination-in'
    t.save()
    // keep the ellipse inside the picture so its edges never show
    const rw = Math.min(o.rw, r[2] / 2 - 2), rh = Math.min(o.rh, r[3] / 2 - 2)
    const ex = clamp(o.cx, r[0] + rw, r[0] + r[2] - rw), ey = clamp(o.cy + (o.oy || 0), r[1] + rh, r[1] + r[3] - rh)
    t.translate(ex, ey); t.scale(1, rh / rw)
    const g = t.createRadialGradient(0, 0, 0, 0, 0, rw)
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(o.core == null ? 0.55 : o.core, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
    t.fillStyle = g; t.fillRect(-W * 4, -H * 8, W * 8, H * 16)
    t.restore()
    t.globalCompositeOperation = 'source-over'
    ctx.save()
    ctx.globalCompositeOperation = o.op || 'source-over'
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.drawImage(TMP, 0, 0)
    ctx.restore()
  }
  function glow(ctx, x, y, r, col, a, mid = 0.4) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(mid, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore()
  }
  /** the cosmos every collage is pasted onto: one slow galaxy, continuous across shots (driven by global T) */
  function cosmos(ctx, T, o = {}) {
    A.galaxy(ctx, T, { cx: o.cx || 540, cy: o.cy || 930, scale: o.scale || 720, rot: 0.6 + T * 0.14, tilt: o.tilt || 0.62, tiltAngle: 0.42, alpha: o.alpha == null ? 1 : o.alpha, tint: o.tint, tintAmt: o.tintAmt, density: o.density || 0.8 })
  }
  /** shape paths for collage masks */
  function shapePath(ctx, shape, cx, cy, r) {
    ctx.beginPath()
    if (shape === 'circle') ctx.arc(cx, cy, r, 0, TAU)
    else if (shape === 'seed') {
      const q = r / 2 // seed of life: 7 circles of radius r/2, union
      ctx.arc(cx, cy, q, 0, TAU)
      for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k * TAU) / 6, x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q; ctx.moveTo(x + q, y); ctx.arc(x, y, q, 0, TAU) }
    }
  }
  function vesicaClip(ctx, cx, cy, r) {
    // tall lens: two circles of radius r, centres r/2 left and right of centre
    ctx.beginPath(); ctx.arc(cx - r / 2, cy, r, 0, TAU); ctx.clip()
    ctx.beginPath(); ctx.arc(cx + r / 2, cy, r, 0, TAU); ctx.clip()
  }
  function vesicaStroke(ctx, cx, cy, r) {
    const a = Math.PI / 3 // the lens arcs meet at ±60° from each centre
    ctx.beginPath()
    ctx.arc(cx - r / 2, cy, r, -a, a)
    ctx.arc(cx + r / 2, cy, r, Math.PI - a, Math.PI + a)
    ctx.closePath()
  }

  /* =====================================================================
   * SHOT VOCABULARY — each returns { ht, cell, bg(ctx,t,d,T), fg(ctx,t,d,T), look }
   * t = seconds into the shot (may be slightly <0 or >d inside a dissolve), d = duration.
   * ===================================================================== */

  /** 1. the cosmos: halftone galaxy igniting from dark, slow push */
  function shotCosmos(o = {}) {
    return {
      ht: true, cell: 9,
      bg(ctx, t, d, T) {
        const ign = o.ignite ? ease.inOutQuad(seg(t, 0, o.ignite)) : 1
        const u = clamp(t / d)
        cosmos(ctx, T, { scale: lerp(o.s0 || 560, o.s1 || 760, ease.inOutQuad(u)), alpha: ign, tint: P.violet, tintAmt: 0.18 })
        glow(ctx, 540, 930, 420, P.deep, 0.5 * ign)
      },
    }
  }

  /** 2. the fire vortex with a tiny falling silhouette and an eclipsed planet in the eye */
  function shotVortex(o = {}) {
    const V = () => A.vortex
    return {
      ht: false,
      look: { lift: 0.8, grain: 1.1 },
      bg(ctx, t, d, T) {
        const vt = (o.vt || 3) + t
        V().bg(ctx, vt, { open: 1, p: V().pal(o.palT || 2) })
      },
      fg(ctx, t, d, T) {
        const vt = (o.vt || 3) + t
        const p = V().pal(o.palT || 2)
        const E = V().eye(vt)
        // the planet: a dark disc with a lit rim, an eclipse in the white-hot eye
        const pr = o.planet || 58
        ctx.save()
        glow(ctx, E.x, E.y, pr * 2.4, p.hot, 0.55)
        const g = ctx.createRadialGradient(E.x - pr * 0.35, E.y - pr * 0.35, pr * 0.1, E.x, E.y, pr)
        g.addColorStop(0, '#2a2f6e'); g.addColorStop(0.7, '#0d0b26'); g.addColorStop(1, '#05040e')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(E.x, E.y, pr, 0, TAU); ctx.fill()
        ctx.strokeStyle = rgba(p.hot, 0.8); ctx.lineWidth = 2.5; ctx.shadowColor = p.gold; ctx.shadowBlur = 24
        ctx.beginPath(); ctx.arc(E.x, E.y, pr, 0, TAU); ctx.stroke()
        ctx.restore()
        V().figure(ctx, o.figT || vt, { p })
      },
    }
  }

  /** 3. collage cut-out: an image inside a circle / vesica / seed-of-life, pasted on the halftone cosmos */
  function shotCutout(o) {
    const im = o.img
    return {
      ht: true, cell: 9,
      bg(ctx, t, d, T) {
        cosmos(ctx, T, { alpha: 0.85, tint: o.cosmosTint || P.violet, tintAmt: 0.3 })
      },
      fg(ctx, t, d, T) {
        const u = clamp(t / d)
        const grow = o.r0 ? ease.outCubic(seg(t, 0, o.grow || 0.45)) : 1
        const r = lerp(o.r0 || o.r, o.r, grow)
        const cx = o.cx || 540, cy = o.cy || 930
        const sc = lerp(o.s0, o.s1, ease.inOutQuad(u))
        const px = lerp(o.pt0[0], (o.pt1 || o.pt0)[0], ease.inOutQuad(u)), py = lerp(o.pt0[1], (o.pt1 || o.pt0)[1], ease.inOutQuad(u))
        const path = () => (o.shape === 'vesica' ? vesicaStroke(ctx, cx, cy, r) : shapePath(ctx, o.shape, cx, cy, r))
        // soft shadow under the paper cut-out
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 18
        ctx.fillStyle = '#06040c'; path(); ctx.fill(); ctx.restore()
        ctx.save()
        if (o.shape === 'vesica') vesicaClip(ctx, cx, cy, r); else { path(); ctx.clip() }
        ctx.fillStyle = '#05030b'; ctx.fillRect(0, 0, W, H)
        place(ctx, im, cx, cy, sc, px, py)
        if (o.grade) grade(ctx, o.grade[0], o.grade[1], o.grade[2] || 'color')
        if (o.wash) grade(ctx, o.wash[0], o.wash[1], 'soft-light')
        ctx.restore()
        // fine bone keyline
        ctx.save(); ctx.strokeStyle = rgba(P.bone, 0.55); ctx.lineWidth = 2; path(); ctx.stroke(); ctx.restore()
      },
    }
  }

  /** 4. Ken Burns on a figure (feathered into the dark); `crop` = tight detail, through the halftone */
  function shotKB(o) {
    return {
      ht: !!o.ht, cell: o.cell || 9,
      look: o.look,
      bg(ctx, t, d, T) {
        const u = clamp(t / d), e = ease.inOutQuad(u)
        if (o.cosmos) cosmos(ctx, T, { alpha: o.cosmos, tint: P.violet, tintAmt: 0.3 })
        const pt0 = o.pt0, pt1 = o.pt1 || o.pt0
        feathered(ctx, o.img, {
          cx: o.cx || 540, cy: o.cy || 940, sc: lerp(o.s0, o.s1 || o.s0 * 1.12, e),
          px: lerp(pt0[0], pt1[0], e), py: lerp(pt0[1], pt1[1], e),
          rw: o.rw || 560, rh: o.rh || 760, core: o.core, grade: o.grade, lift: o.lift, op: o.cosmos ? 'screen' : 'source-over',
        })
      },
    }
  }

  /** 5. printed: an aura photograph through the halftone screen, a flat-print chakra mandala over it */
  function shotPrinted(o) {
    return {
      ht: true, cell: o.cell || 9,
      bg(ctx, t, d, T) {
        const u = clamp(t / d)
        cosmos(ctx, T, { alpha: 0.28, tint: P.indigo, tintAmt: 0.5 })
        feathered(ctx, o.aura, { cx: 540, cy: 1000, sc: lerp(2.0, 2.15, u), px: 0.5, py: 0.5, rw: 640, rh: 640, core: 0.35, grade: o.grade || [P.indigo, 0.75], op: 'screen' })
      },
      fg(ctx, t, d, T) {
        const bloom = o.bloom ? ease.outCubic(seg(t, 0, o.bloom)) : 1
        const r = o.r || 360
        A.chakra.draw(ctx, o.chakra, 540, 930, r * lerp(0.92, 1, bloom), { fill: true, color: o.ink || P.coral, rot: (o.rot || 0) + t * 0.05, progress: o.bloom ? clamp(bloom * 1.05) : 1, alpha: 0.94 })
      },
    }
  }

  /** 6. two souls: two aura silhouettes drifting together, screen-blended so their glows merge */
  function shotSouls(o) {
    return {
      ht: !!o.ht, cell: o.cell || 10,
      look: { bloom: 1.25, halation: 1.3 },
      bg(ctx, t, d, T) {
        const u = clamp(t / d), e = ease.inOutQuad(u)
        const gap = lerp(o.gap0, o.gap1, e)
        const z = lerp(o.z0 || 1, o.z1 || 1, e)
        const cy = o.cy || 980
        const sc = 1.7 * z
        A.stars(ctx, T, { count: 220, alpha: 0.55, seed: 21 })
        ctx.save()
        ctx.translate(540, cy); ctx.scale(1, 1); ctx.translate(-540, -cy)
        feathered(ctx, o.a, { cx: 540 - gap * z, cy, sc, px: 0.5, py: 0.55, rw: 470 * z, rh: 470 * z, core: 0.5, grade: o.ga, op: 'screen', alpha: 0.85 })
        feathered(ctx, o.b, { cx: 540 + gap * z, cy, sc, px: 0.5, py: 0.55, rw: 470 * z, rh: 470 * z, core: 0.5, grade: o.gb, op: 'screen', alpha: 0.85 })
        ctx.restore()
        // where the glows meet, a warm light gathers
        glow(ctx, 540, cy - 60 * z, 260 * z * (0.6 + 0.4 * e), P.blush, 0.12 * e, 0.3)
      },
    }
  }

  /** 7. sacred geometry: the seed of life drawing in over the cosmos, settling to the mark's exact size */
  const MARK = { x: 540, y: 860, size: 300 }
  const MARK_R = (20 * MARK.size) / 88
  function shotSeed(o = {}) {
    return {
      ht: true, cell: 9,
      bg(ctx, t, d, T) {
        const u = clamp(t / d)
        cosmos(ctx, T, { cx: MARK.x, cy: MARK.y, scale: lerp(760, 520, ease.inOutQuad(u)), alpha: lerp(0.8, 0.45, u), tint: P.indigo, tintAmt: 0.45 })
      },
      fg(ctx, t, d, T) {
        const u = clamp(t / d)
        const R = lerp(o.R0 || 190, MARK_R, ease.inOutCubic(u))
        const prog = ease.inOutQuad(seg(t, 0, d * (o.draw || 0.7)))
        glow(ctx, MARK.x, MARK.y, R * 3.2, P.violet, 0.18)
        A.flowerOfLife(ctx, MARK.x, MARK.y, R, { rings: 1, outer: true, lw: lerp(2.4, 3.07, u), color: '#d9cdf0', alpha: 0.7, progress: prog })
      },
    }
  }

  /** 8. the splash lockup: Align mark + "Align" wordmark, calm */
  function shotLockup(o = {}) {
    return {
      ht: false,
      look: { grain: 1.05, bloom: 1.1 },
      bg(ctx, t, d, T) {
        const g = ctx.createRadialGradient(540, 900, 0, 540, 900, 1100)
        g.addColorStop(0, '#2a1d5c'); g.addColorStop(0.45, '#140a2e'); g.addColorStop(1, '#07040f')
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
        cosmos(ctx, T, { cx: MARK.x, cy: MARK.y, scale: 520, alpha: 0.22, tint: P.indigo, tintAmt: 0.5, density: 0.5 })
      },
      fg(ctx, t, d, T) {
        const lit = 7 * ease.inOutQuad(seg(t, o.litAt || 0.15, (o.litAt || 0.15) + 1.1))
        A.alignMark(ctx, MARK.x, MARK.y, MARK.size, { lit, glow: 1.15 })
        const wa = ease.inOutQuad(seg(t, o.wordAt || 0.6, (o.wordAt || 0.6) + 1.0))
        A.wordmark(ctx, 540, 1215 + 14 * (1 - wa), { size: 132, alpha: wa, glow: 0.6 })
      },
    }
  }

  /* =====================================================================
   * THE TWO EDITS  (b = beats, x = dissolve length in beats, centred on the cut)
   * ===================================================================== */
  const F = FIG, AU = AURA
  const EDITS = {
    fast: [
      { b: 2, s: shotCosmos({ ignite: 0.8, s0: 520, s1: 700 }) },
      { b: 1, s: shotVortex({ vt: 3.2, palT: 2 }) },
      { b: 1, s: shotCutout({ img: AU.pisces, shape: 'circle', r0: 60, r: 330, grow: 0.3, s0: 1.25, s1: 1.38, pt0: [0.5, 0.5], grade: [P.indigo, 0.55] }) },
      { b: 1, s: shotKB({ img: F.leo, s0: 1.85, s1: 2.05, pt0: [0.5, 0.52], pt1: [0.46, 0.5], grade: [P.ember, 0.35] }) },
      { b: 0.5, s: shotKB({ img: F.leo, ht: true, cell: 8, s0: 5.2, s1: 5.6, pt0: [0.37, 0.4], rw: 800, rh: 1150, grade: [P.ember, 0.4] }) },
      { b: 0.5, s: shotKB({ img: F.scorpio, ht: true, cell: 8, s0: 3.2, s1: 3.5, pt0: [0.47, 0.28], pt1: [0.42, 0.33], rw: 800, rh: 1150, grade: [P.rose, 0.5] }) },
      { b: 1, s: shotCutout({ img: F.virgo, shape: 'vesica', r: 420, s0: 1.55, s1: 1.68, pt0: [0.5, 0.5], grade: [P.rose, 0.45] }) },
      { b: 1, s: shotKB({ img: F.sagittarius, s0: 1.8, s1: 2.0, pt0: [0.52, 0.5], pt1: [0.56, 0.47], grade: [P.gold, 0.45] }) },
      { b: 1, s: shotCutout({ img: F.pisces, shape: 'seed', r: 360, s0: 1.3, s1: 1.42, pt0: [0.52, 0.55], grade: [P.indigo, 0.35] }) },
      { b: 1, s: shotKB({ img: F.aquarius, ht: true, cell: 8, s0: 3.2, s1: 3.5, pt0: [0.42, 0.62], pt1: [0.44, 0.58], rw: 760, rh: 1100, grade: [P.violet, 0.4] }) },
      { b: 1, s: shotVortex({ vt: 9.5, palT: 9.5 }) },
      { b: 1, s: shotPrinted({ aura: AU.capricorn, chakra: 0, ink: P.coral, bloom: 0.25 }) },
      { b: 1, s: shotPrinted({ aura: AU.pisces, chakra: 1, ink: P.coral, rot: 0.3 }) },
      { b: 0.5, s: shotPrinted({ aura: AU.aries, chakra: 2, ink: P.gold, grade: [P.deep, 0.7] }) },
      { b: 0.5, s: shotPrinted({ aura: AU.libra, chakra: 3, ink: P.blush }) },
      { b: 1, s: shotPrinted({ aura: AU.cancer, chakra: 5, ink: P.coral }) },
      { b: 1, s: shotPrinted({ aura: AU.leo, chakra: 6, ink: P.gold, grade: [P.deep, 0.7] }) },
      { b: 2, s: shotSouls({ a: AU.scorpio, b: AU.leo, gap0: 270, gap1: 170, ga: [P.rose, 0.35], gb: [P.ember, 0.3] }) },
      { b: 1, s: shotKB({ img: F.gemini, s0: 2.2, s1: 2.4, pt0: [0.5, 0.45], pt1: [0.5, 0.42], rw: 640, rh: 820, grade: [P.blush, 0.35] }) },
      { b: 2, s: shotSouls({ a: AU.scorpio, b: AU.leo, gap0: 130, gap1: 85, z0: 1.15, z1: 1.3, cy: 1000, ga: [P.rose, 0.35], gb: [P.ember, 0.3] }) },
      { b: 3, s: shotSeed({ R0: 210, draw: 0.6 }) },
      { b: 6, x: 0.5, s: shotLockup({ litAt: 0.1, wordAt: 0.55 }) },
    ],
    dreamy: [
      { b: 4, s: shotCosmos({ ignite: 1.4, s0: 480, s1: 720 }) },
      { b: 3, x: 1, s: shotVortex({ vt: 3.0, palT: 2 }) },
      { b: 3, x: 1, s: shotCutout({ img: F.leo, shape: 'circle', r0: 200, r: 340, grow: 1.0, s0: 1.3, s1: 1.48, pt0: [0.48, 0.5], pt1: [0.44, 0.47], grade: [P.ember, 0.3] }) },
      { b: 3, x: 1, s: shotKB({ img: F.scorpio, s0: 2.0, s1: 2.6, pt0: [0.5, 0.6], pt1: [0.44, 0.32], rw: 620, rh: 820, grade: [P.rose, 0.5] }) },
      { b: 3, x: 1, s: shotPrinted({ aura: AU.libra, chakra: 3, ink: P.coral, bloom: 1.0 }) },
      { b: 2, x: 1, s: shotPrinted({ aura: AU.cancer, chakra: 5, ink: P.gold, grade: [P.deep, 0.7], rot: 0.2 }) },
      { b: 3, x: 1.5, s: shotSouls({ a: AU.scorpio, b: AU.leo, gap0: 280, gap1: 110, z0: 1, z1: 1.2, ga: [P.rose, 0.35], gb: [P.ember, 0.3] }) },
      { b: 3, x: 1, s: shotSeed({ R0: 230, draw: 0.75 }) },
      { b: 6, x: 1, s: shotLockup({ litAt: 0.35, wordAt: 0.9 }) },
    ],
  }
  const EDIT = EDITS[PACE] || EDITS.fast
  // timing
  let acc = 0
  for (const sh of EDIT) { sh.start = acc * BEAT; sh.dur = sh.b * BEAT; sh.fade = (sh.x || 0) * BEAT; acc += sh.b }
  if (Math.abs(acc * BEAT - 15) > 1e-6) console.error(`[mashup] ${PACE} edit is ${acc * BEAT}s, expected 15s`)

  function renderShot(slot, sh, T) {
    const s = slot.src.getContext('2d'), c = slot.comp.getContext('2d')
    const t = T - sh.start
    for (const x of [s, c]) { x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.filter = 'none' }
    s.fillStyle = '#000'; s.fillRect(0, 0, W, H)
    s.save(); try { sh.s.bg && sh.s.bg(s, t, sh.dur, T) } finally { s.restore() }
    c.fillStyle = '#07040f'; c.fillRect(0, 0, W, H)
    if (sh.s.ht) A.halftone(c, slot.src, { cell: sh.s.cell || 9 }); else c.drawImage(slot.src, 0, 0)
    c.save(); try { sh.s.fg && sh.s.fg(c, t, sh.dur, T) } finally { c.restore() }
    return slot.comp
  }

  /** a soft light-leak riding a dissolve: warm rose/gold, screened, never white */
  function lightLeak(ctx, k, seed) {
    const a = Math.sin(Math.PI * clamp(k)) * 0.32
    if (a <= 0) return
    const side = A.hash(seed) < 0.5 ? -1 : 1
    const x = 540 + side * lerp(620, -200, k), y = lerp(300, 1500, A.hash(seed + 3)) + lerp(-200, 200, k)
    ctx.save(); ctx.globalCompositeOperation = 'screen'
    glow(ctx, x, y, 900, A.hash(seed + 7) < 0.5 ? '#ff8a6a' : '#ff7fb0', a, 0.35)
    glow(ctx, x - side * 160, y + 120, 520, P.gold, a * 0.6, 0.3)
    ctx.restore()
  }

  A.registerScene({
    id: 'mashup', start: A.TL.main.start, duration: A.TL.main.duration,
    draw({ bg, T }) {
      slots()
      A.fx.halftone = false
      // which shots are on screen (a shot is visible from start - fade/2 to end + next.fade/2)
      const vis = []
      EDIT.forEach((sh, i) => {
        const nx = EDIT[i + 1]
        const a0 = sh.start - sh.fade / 2, a1 = sh.start + sh.dur + (nx ? nx.fade / 2 : 0)
        if (T >= a0 && T < a1) vis.push({ sh, i, k: sh.fade > 0 ? clamp((T - a0) / sh.fade) : 1 })
      })
      if (!vis.length) return
      let look = null
      vis.forEach((v, n) => {
        const img = renderShot(SLOTS[n % 2], v.sh, T)
        bg.save(); bg.globalAlpha = n === 0 ? 1 : ease.inOutQuad(v.k); bg.drawImage(img, 0, 0); bg.restore()
        look = v.sh.s.look || look
        if (n > 0 && PACE === 'dreamy') lightLeak(bg, v.k, v.i * 13.7)
      })
      if (look) A.fx.look = look
      // the last breath: dip toward black
      const dip = ease.inQuad(seg(T, 14.7, 15))
      if (dip > 0) { bg.save(); bg.fillStyle = `rgba(4,2,10,${0.88 * dip})`; bg.fillRect(0, 0, W, H); bg.restore() }
    },
  })
})()
