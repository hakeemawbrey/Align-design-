/* 01 · Intro (0–3 s): from black, the galaxy ignites, the Align mark draws,
 * the seven centres light bottom → top, and the word lands. Hard white-out at 3.0. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, TAU } = A
  const TL = A.TL.intro
  const CX = 540, MY = 770 // mark centre
  const DOT0 = 0.95, DSTEP = 0.17 // seven dots inside ~1.2 s

  function glow(ctx, x, y, r, col, a) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.35, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  A.registerScene({
    id: 'intro', start: TL.start, duration: TL.duration,
    draw({ bg, fg, t }) {
      // global push-in, accelerating into the white-out
      const zoom = 1 + 0.04 * t + 0.25 * ease.inExpo(seg(t, 2.45, 3.0))

      /* ---------- background ---------- */
      A.stars(bg, t, { alpha: ease.outQuad(seg(t, 0, 0.5)) * 0.9, count: 300, seed: 21 })
      const ig = ease.outExpo(seg(t, 0.08, 1.3))
      const spin = 9 * ease.outCubic(seg(t, 0, 3.2)) // fast spin easing down
      A.galaxy(bg, t, {
        cx: CX, cy: MY, scale: lerp(30, 640, ig) * zoom, rot: spin - 1.2,
        alpha: clamp(ig * 1.25) * lerp(1, 0.62, seg(t, 0.9, 1.6)) * (0.88 + 0.12 * Math.sin(t * 6)), tilt: 0.62, tiltAngle: -0.42,
        density: lerp(0.35, 1, ig),
      })
      // quiet the field where the mark and the copy sit
      const qa = ease.inOutQuad(seg(t, 0.55, 1.4))
      if (qa > 0) {
        const dg = bg.createRadialGradient(CX, MY, 0, CX, MY, 330)
        dg.addColorStop(0, `rgba(0,0,0,${0.75 * qa})`); dg.addColorStop(0.7, `rgba(0,0,0,${0.5 * qa})`); dg.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = dg; bg.fillRect(CX - 330, MY - 330, 660, 660)
        const lg = bg.createLinearGradient(0, 1040, 0, 1600)
        lg.addColorStop(0, 'rgba(0,0,0,0)'); lg.addColorStop(0.25, `rgba(0,0,0,${0.85 * qa})`); lg.addColorStop(0.8, `rgba(0,0,0,${0.85 * qa})`); lg.addColorStop(1, 'rgba(0,0,0,0)')
        bg.fillStyle = lg; bg.fillRect(0, 1040, 1080, 560)
      }
      // ignition core: a white-hot point that blooms in the first beat
      const core = seg(t, 0, 0.25) * (1 - 0.6 * seg(t, 0.25, 0.9))
      glow(bg, CX, MY, lerp(20, 420, ease.outCubic(seg(t, 0, 0.6))), '#fff6ea', core)
      // chakra pulses wash the background as each dot lights
      for (let i = 0; i < 7; i++) {
        const tl = t - (DOT0 + i * DSTEP)
        if (tl < 0 || tl > 0.5) continue
        glow(bg, CX, MY, 260 + tl * 900, A.CHAKRA_COLORS[i], 0.55 * (1 - tl / 0.5))
      }

      /* ---------- foreground ---------- */
      fg.save()
      fg.translate(CX, MY); fg.scale(zoom, zoom); fg.translate(-CX, -MY)

      // ignition flare: horizontal + vertical light streaks
      const fl = seg(t, 0.02, 0.12) * (1 - seg(t, 0.15, 0.7))
      if (fl > 0) {
        fg.save()
        fg.globalCompositeOperation = 'lighter'
        for (const [w, h] of [[900, 3], [3, 520]]) {
          const g = fg.createRadialGradient(CX, MY, 0, CX, MY, Math.max(w, h) / 2)
          g.addColorStop(0, rgba('#ffffff', fl)); g.addColorStop(1, rgba('#ffffff', 0))
          fg.fillStyle = g
          fg.fillRect(CX - w / 2 * (0.4 + fl), MY - h / 2, w * (0.4 + fl), h)
        }
        fg.restore()
      }

      // shockwave ring at ignition
      const sw = seg(t, 0.05, 0.75)
      if (sw > 0 && sw < 1) {
        fg.save()
        fg.strokeStyle = rgba(A.C.bone, 0.7 * (1 - sw)); fg.lineWidth = 3 * (1 - sw) + 0.5
        fg.beginPath(); fg.arc(CX, MY, 40 + ease.outCubic(sw) * 520, 0, TAU); fg.stroke()
        fg.restore()
      }

      // the mark: circles stroke-draw, then the column lights on the 16ths
      const size = 400
      let lit = 0
      for (let i = 0; i < 7; i++) lit += ease.outCubic(seg(t, DOT0 + i * DSTEP, DOT0 + i * DSTEP + 0.12))
      const markProg = ease.inOutCubic(seg(t, 0.3, 1.15))
      // a wider seed-of-life halo behind the mark
      A.flowerOfLife(fg, CX, MY, 91, { rings: 1, lw: 1, color: A.C.violet, alpha: 0.35 * seg(t, 0.5, 1.3), progress: ease.outCubic(seg(t, 0.45, 1.5)) })
      // dark keyline under the strokes so the mark reads over the bright core
      A.flowerOfLife(fg, CX, MY, 20 * size / 88, { rings: 1, outer: true, lw: 7, color: '#07040f', alpha: 0.55, progress: markProg })
      A.alignMark(fg, CX, MY, size, { progress: markProg, lit, glow: 1.15, lw: 2.8, strokeAlpha: 0.95, color: '#f1eaff' })
      // each dot pings a ring in its colour
      for (let i = 0; i < 7; i++) {
        const tl = seg(t, DOT0 + i * DSTEP, DOT0 + i * DSTEP + 0.45)
        if (tl <= 0 || tl >= 1) continue
        const y = MY + (3 - i) * 10.6 * (size / 88)
        fg.save()
        fg.strokeStyle = rgba(A.CHAKRA_COLORS[i], 0.9 * (1 - tl)); fg.lineWidth = 2.5
        fg.beginPath(); fg.arc(CX, y, 16 + ease.outCubic(tl) * 70, 0, TAU); fg.stroke()
        fg.restore()
      }

      // ring of ALIGN words around the mark
      const ra = ease.outCubic(seg(t, 1.4, 2.0))
      if (ra > 0) {
        A.ringOfWords(fg, 'ALIGN', CX, MY, 262, { size: 24, font: 'mono', weight: 700, color: A.C.gold, alpha: 0.85 * ra, start: -t * 0.35 - (1 - ra) * 0.8, sep: '  ·  ' })
        fg.save(); fg.strokeStyle = rgba(A.C.gold, 0.35 * ra); fg.lineWidth = 1.2
        fg.beginPath(); fg.arc(CX, MY, 238, 0, TAU * ra); fg.stroke()
        fg.beginPath(); fg.arc(CX, MY, 286, 0, TAU * ra); fg.stroke()
        fg.restore()
      }
      fg.restore()

      /* ---------- copy ---------- */
      fg.save()
      fg.translate(CX, 1300); fg.scale(zoom, zoom); fg.translate(-CX, -1300)
      // line 1: typed mono label
      const l1 = 'SEVEN CENTERS · TWELVE SIGNS'
      const n1 = Math.floor(l1.length * seg(t, 1.05, 1.55))
      if (n1 > 0) {
        A.text(fg, l1.slice(0, n1).padEnd(l1.length, ' '), CX, 1135, { size: 28, font: 'mono', weight: 700, color: A.C.gold, spacing: 0.28 })
      }
      // line 2: italic serif
      const l2 = ease.outCubic(seg(t, 1.6, 2.0))
      if (l2 > 0) A.text(fg, 'Come into', CX, 1235 + (1 - l2) * 30, { size: 92, italic: true, weight: 400, color: A.C.bone, alpha: l2 })
      // line 3: ALIGN stamps in, letter by letter on the 16ths, tracking settles
      const word = 'ALIGN'
      const sz = 176, sp = 0.24
      fg.font = `600 ${sz}px ${A.FONT.serif}`
      const ws = [...word].map((c) => fg.measureText(c).width)
      const settle = ease.outCubic(seg(t, 1.9, 2.7))
      const spc = sz * lerp(0.6, sp, settle)
      const total = ws.reduce((a, b) => a + b, 0) + spc * 4
      let x = CX - total / 2
      for (let i = 0; i < 5; i++) {
        const lt = seg(t, 1.9 + i * 0.09, 2.02 + i * 0.09)
        if (lt > 0) {
          const s = lerp(1.6, 1, ease.outCubic(lt))
          fg.save()
          fg.translate(x + ws[i] / 2, 1392); fg.scale(s, s)
          A.text(fg, word[i], 0, 0, { size: sz, weight: 600, color: A.C.bone, alpha: lt })
          fg.restore()
        }
        x += ws[i] + spc
      }
      // hairline under the word
      const hl = ease.inOutCubic(seg(t, 2.25, 2.7))
      if (hl > 0) {
        fg.fillStyle = rgba(A.C.gold, 0.8)
        fg.fillRect(CX - 60 * hl, 1495, 120 * hl, 2)
      }
      fg.restore()

      /* ---------- the cut: white-out into the chakras ---------- */
      A.fx.flash = ease.inQuad(seg(t, 2.7, 2.96)) + 0.35 * seg(t, 0.03, 0.06) * (1 - seg(t, 0.06, 0.22))
      A.fx.flashColor = '#fff7ec'
      if (t > 2.6) A.fx.shake = 14 * seg(t, 2.6, 2.95)
    },
  })
})()
