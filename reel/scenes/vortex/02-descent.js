/* Vortex teaser · 02 Descent (2–16 s): seven chapters × 2 s. Each sacred form draws in at the
 * eye of the wormhole, lands on the beat with its label and one word, then flies past the camera
 * as the next chapter begins. Past forms keep streaming by as rings of the tunnel. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, TAU } = A
  const V = A.vortex
  const TL = A.TL.descent
  const IDS = A.TL.chapters
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
  const WORDS = ['Origin.', 'Union.', 'Bloom.', 'Order.', 'Center.', 'Ascend.', 'Align.']
  const BASE = 560          // form diameter when it has landed
  const LABEL_Y = 480, WORD_Y = 1405
  const chStart = (i) => TL.start + i * TL.each

  /** a form drawn with an ember under-glow so it reads against the fire */
  function formGlow(ctx, id, x, y, size, o) {
    const p = o.p
    ctx.save()
    ctx.globalAlpha = o.alpha
    // dark under-stroke separates the line work from the bright eye
    V.drawForm(ctx, id, x, y, size, { progress: o.progress, color: '#120704', color2: '#120704', lw: (o.lw || 3) + 6, alpha: 0.6, rot: o.rot, t: o.t })
    ctx.globalCompositeOperation = 'lighter'
    V.drawForm(ctx, id, x, y, size, { progress: o.progress, color: p.mid, color2: p.mid, lw: (o.lw || 3) + 10, alpha: 0.2 + 0.3 * (o.pulse || 0), rot: o.rot, t: o.t })
    ctx.globalCompositeOperation = 'source-over'
    V.drawForm(ctx, id, x, y, size, { progress: o.progress, color: p.form, color2: p.gold, lw: o.lw || 3, alpha: 1, rot: o.rot, t: o.t, glow: 0.6 + (o.pulse || 0) })
    ctx.restore()
  }

  /** chapter i at global time T (visible from its start until 0.6 s into the next chapter) */
  function chapter(ctx, i, T, o = {}) {
    const s = chStart(i), tl = T - s
    if (tl < 0 || tl > 2.65) return
    const id = IDS[i]
    const p = V.pal(T)
    const E = V.eye(T)
    const app = ease.outCubic(seg(tl, 0, 1.0))
    const progress = ease.inOutCubic(seg(tl, 0.05, 1.0))
    const u = seg(tl, 2.0, 2.6)
    const pulse = tl > 1 ? Math.exp(-(tl - 1) * 5) : 0
    const base = BASE * lerp(0.4, 1, app) * (1 + 0.05 * Math.max(0, tl - 1))
    const fade = clamp(tl / 0.12)
    const rot0 = 0.12 * tl
    // motion-blur trail: earlier positions of the fly-through, fainter
    for (let j = 3; j >= 0; j--) {
      const uj = u - j * 0.045
      if (j > 0 && uj <= 0) continue
      const k = Math.exp(4.4 * Math.pow(Math.max(0, uj), 1.4))
      const a = fade * Math.pow(1 - Math.max(0, uj), 1.4) * (j === 0 ? 1 : 0.32 / j)
      if (a <= 0.01) continue
      formGlow(ctx, id, E.x, E.y, base * k, { p, progress, alpha: a, rot: rot0 + uj * 0.9, t: T, pulse: j === 0 ? pulse : 0, lw: 3.2 + uj * 3 })
    }
    if (o.textless) return
    // label: small mono caps above the ring
    const la = ease.outCubic(seg(tl, 0.15, 0.5)) * (1 - ease.inQuad(seg(tl, 1.8, 2.0)))
    ctx.save(); ctx.shadowColor = 'rgba(8,3,2,0.9)'; ctx.shadowBlur = 18
    if (la > 0) {
      A.text(ctx, `${ROMAN[i]} · ${V.formName(id)}`, 540, LABEL_Y + (1 - la) * 10, { size: 26, font: 'mono', weight: 700, color: A.C.bone, spacing: 0.42, alpha: la })
      ctx.save(); ctx.fillStyle = rgba(p.gold, 0.7 * la); ctx.fillRect(540 - 28 * la, LABEL_Y + 34, 56 * la, 2); ctx.restore()
    }
    // the word: big italic serif, eases in, then rushes toward camera on the way out
    const wi = ease.outCubic(seg(tl, 0.45, 0.9)), wo = ease.inQuad(seg(tl, 1.78, 2.02))
    const wa = wi * (1 - wo)
    if (wa > 0) {
      const sc = lerp(0.92, 1, wi) * (1 + wo * 0.35)
      ctx.save(); ctx.translate(540, WORD_Y); ctx.scale(sc, sc)
      A.text(ctx, WORDS[i], 0, (1 - wi) * 24, { size: 132, italic: true, weight: 400, color: A.C.bone, alpha: wa, spacing: 0.01 })
      ctx.restore()
    }
    ctx.restore()
  }

  /** past forms as rings of the tunnel, streaming toward the camera */
  const D = 0.95
  function tunnelRings(ctx, T) {
    const cz = V.camZ(T), b = V.bend(T), p = V.pal(T)
    const k0 = Math.floor((cz + 0.3) / D), k1 = Math.ceil((cz + 3.2) / D)
    for (let k = k1; k >= k0; k--) {
      const d = k * D - cz
      if (d < 0.32 || d > 3.2) continue
      // which forms had flown past when this ring entered view (stable per ring)
      let spawnT = 0
      { // invert camZ coarsely: first time camZ reached k*D - 3.2
        const target = k * D - 3.2
        let lo = 0, hi = 20
        for (let it = 0; it < 18; it++) { const m = (lo + hi) / 2; if (V.camZ(m) < target) lo = m; else hi = m }
        spawnT = hi
      }
      const n = Math.max(0, Math.min(7, Math.floor((spawnT - TL.start - 0.6) / TL.each)))
      if (n <= 0) continue
      const idx = n - 1 - (k % Math.min(n, 3))
      const size = (1150 * 1) / d
      const a = clamp((3.2 - d) / 0.9) * clamp((d - 0.32) / 0.35) * 0.34
      const f = d / V.L
      V.drawForm(ctx, IDS[idx], 540 + b.x * f, 930 + b.y * f, size, { progress: 1, color: p.gold, color2: p.mid, lw: 1.6, alpha: a, rot: k * 0.7 + T * 0.15, t: T })
    }
  }

  /** ALIGN stamped huge behind the form on a beat */
  function stamp(ctx, T, at) {
    const k = seg(T, at, at + 0.45)
    if (k <= 0 || k >= 1) return
    const E = V.eye(T)
    const sc = lerp(1.18, 1, ease.outCubic(k))
    ctx.save(); ctx.translate(540, E.y); ctx.scale(sc, sc)
    A.text(ctx, 'ALIGN', 0, 0, { size: 270, weight: 600, color: A.C.bone, spacing: 0.16, alpha: 0.95 * (1 - ease.inQuad(k)), stroke: A.C.bone, strokeWidth: 2.5, strokeOnly: k > 0.12 })
    ctx.restore()
    if (k < 0.15) { A.fx.flash = Math.max(A.fx.flash, 0.25 * (1 - k / 0.15)); A.fx.flashColor = '#fff4dc'; A.fx.shake = 10 }
  }

  V.chapter = chapter
  V.tunnelRings = tunnelRings
  V.WORDS = WORDS

  A.registerScene({
    id: 'vx-descent', start: TL.start, duration: TL.duration,
    draw({ bg, fg, T }) {
      // halftone screen gets finer the deeper we fall
      A.fx.halftone = A.param('ht', '1') !== '0'
      A.fx.halftoneCell = Math.round(lerp(6, 4, seg(T, 2, 16)))
      V.bg(bg, T)
      tunnelRings(fg, T)
      stamp(fg, T, 7.5); stamp(fg, T, 13.5)
      // each chapter start: a push and a soft flash on the downbeat
      const ci = Math.floor((T - TL.start) / TL.each), ct = T - chStart(ci)
      if (ci > 0 && ct < 0.18) { A.fx.flash = Math.max(A.fx.flash, 0.3 * (1 - ct / 0.18)); A.fx.flashColor = V.pal(T).gold; A.fx.shake = Math.max(A.fx.shake, 8 * (1 - ct / 0.18)) }
      V.ring(fg, T)
      for (let i = IDS.length - 1; i >= 0; i--) chapter(fg, i, T) // older (flying past) on top
      V.figure(fg, T)
    },
  })
})()
