// 02-aligned — "When it's right, the stars line up." Feature: the align moment.
// 0.0  seven chakra stars scattered over a night sky, already drifting · eyebrow THE ALIGN MOMENT
// 0.3–3.6  they glide toward one vertical line (the Align chakra column); dust is pulled in, riser builds
// 3.92 LOCK: flash, shake, shockwave rings, god-rays, gold pixel-star burst · "The stars aligned."
// 5.95 the column collapses to a point of light → Juniper's matched card flips out of it, gold foil sweep
// 7.3  "When it's right, the stars line up."  10.2 end tag
import { W, H, A, el, fill, img, prog, ease, lerp, clamp, rng, noise1, spaceBackdrop, typeLine, eyebrow, starField, pixelStar, endTag, CHAKRAS, BONE, GOLD } from './kit.js'

const DURATION = 12.6
const END = 10.2
const LOCK = 3.92
const STAR_LOCK = Array.from({ length: 7 }, (_, i) => 3.6 + i * 0.05) // red → violet snaps in
const COLLAPSE = [5.95, 6.32]   // column folds into a point
const CARD_IN = 6.22            // card flips out of the light
const FOIL = [6.75, 7.55]
const LINE_A = 4.12, LINE_B = 7.35

const CX = 540, CY = 900, GAP = 116
const COL_Y = i => CY + 3 * GAP - i * GAP // red at the bottom … violet at the top
const ANCHOR = [[190, 1240], [880, 520], [250, 470], [860, 1170], [150, 820], [930, 870], [690, 250]]
const RGB = CHAKRAS.map(h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16)).join(','))

// card-reveal.png 1560×2740 — body x65..1493, y124..2619
const RW = 600, RS = RW / 1560, RH = 2740 * RS, CARD_CY = 846

function starState(i, t) {
  const [ax, ay] = ANCHOR[i]
  const wob = 1 - prog(t, 2.8, STAR_LOCK[i])
  // each star breathes around its spot on a slow lazy orbit
  const ox = ax + (noise1(t * 0.5, i * 7 + 1) - 0.5) * 70 * wob + Math.cos(t * 0.6 + i) * 18 * wob
  const oy = ay + (noise1(t * 0.45, i * 7 + 3) - 0.5) * 60 * wob + Math.sin(t * 0.5 + i * 2) * 14 * wob
  const L = STAR_LOCK[i]
  const u = prog(t, 0.25, L - 0.12)
  const c = t < L - 0.12 ? 0.86 * ease.inOutQuad(u) : 0.86 + 0.14 * ease.inCubic(prog(t, L - 0.12, L))
  const tx = CX, ty = COL_Y(i)
  // gentle arc: bulge perpendicular to the path, fading as it commits
  const dx = tx - ax, dy = ty - ay, dl = Math.hypot(dx, dy) || 1
  const bulge = (i % 2 ? 1 : -1) * 60 * Math.sin(Math.PI * Math.min(1, c / 0.95))
  let x = lerp(ox, tx, c) + (-dy / dl) * bulge, y = lerp(oy, ty, c) + (dx / dl) * bulge
  if (t > L) { const k = t - L; x += (i % 2 ? 1 : -1) * 10 * Math.exp(-k * 18) * Math.sin(k * 60) }
  return { x, y, c, locked: t >= L }
}

export default {
  id: '02-aligned', title: "When it's right, the stars line up", duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, LOCK, [98, 146.83, 220, 261.63, 293.66]],            // G sus (open, waiting)
      [LOCK, COLLAPSE[0], [73.42, 110, 185, 329.63, 440]],      // D(add9) — the lock
      [COLLAPSE[0], 8.1, [98, 146.83, 246.94, 369.99, 440]],    // Gmaj9 — the card
      [8.1, END, [110, 164.81, 246.94, 329.63, 554.37]],        // A sus2 → home
      [END, DURATION, [146.83, 220, 369.99, 554.37]],           // Dmaj7 — end tag
    ],
    padGain: 0.024, bpm: 80, beatFrom: 4.0, beatTo: 9.95, pulseGain: 0.18,
  },
  cues: [
    ['whoosh', 0.3, 1.0, 0.05],
    ['bell', 0.15, 587.33, 0.035, 2.4, -0.3],
    ['bell', 0.9, 880, 0.022, 2.0, 0.35],
    ['bell', 1.7, 739.99, 0.022, 2.0, -0.35],
    ['riser', 2.2, LOCK, 0.11],
    ...STAR_LOCK.map((s, i) => ['bell', s, [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25][i], 0.045, 1.4, (i - 3) * 0.12]),
    ['boom', LOCK, 0.5],
    ['bell', LOCK, 146.83, 0.06, 3.0, 0],
    ['bell', LOCK + 0.02, 587.33, 0.05, 2.8, -0.2],
    ['bell', LOCK + 0.04, 880, 0.04, 2.8, 0.2],
    ['glitter', LOCK + 0.03, LOCK + 0.8],
    ['bell', LINE_A + 0.1, 1174.66, 0.02, 1.6, 0.25],
    ['riser', COLLAPSE[0] - 0.2, COLLAPSE[1], 0.06],
    ['whoosh', CARD_IN + 0.2, 0.6, 0.12],
    ['bell', CARD_IN + 0.12, 493.88, 0.05, 2.4, 0],
    ['bell', CARD_IN + 0.2, 739.99, 0.04, 2.4, 0.2],
    ['glitter', FOIL[0], FOIL[1]],
    ['bell', LINE_B + 0.05, 659.25, 0.035, 2.0, -0.2],
    ['bell', LINE_B + 0.65, 880, 0.03, 2.0, 0.2],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const shake = fill(root, {})
    const bg = spaceBackdrop(shake, 'teal', { seed: 21, grain: 0.26 })
    const dim = fill(shake, { background: 'radial-gradient(70% 50% at 50% 47%, rgba(11,6,32,0) 30%, rgba(5,2,16,0.85) 100%)', opacity: 0 })

    // god-rays from the column (irregular conic spokes, radially faded)
    const rr = rng(909); const stops = []; let ang = 0
    while (ang < 360) { const w = 1 + rr() * 3.2, gap = 2 + rr() * 9, a = (0.25 + rr() * 0.75).toFixed(2); stops.push(`rgba(255,240,214,0) ${ang.toFixed(1)}deg`, `rgba(255,240,214,${a}) ${(ang + w / 2).toFixed(1)}deg`, `rgba(255,240,214,0) ${(ang + w).toFixed(1)}deg`); ang += w + gap }
    const RAYS = 3000, rmask = 'radial-gradient(closest-side, #000 6%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0) 100%)'
    const rays = el('div', { position: 'absolute', left: (CX - RAYS / 2) + 'px', top: (CY - RAYS / 2) + 'px', width: RAYS + 'px', height: RAYS + 'px', mixBlendMode: 'screen', opacity: 0, background: `conic-gradient(from 0deg, ${stops.join(',')})`, WebkitMaskImage: rmask, maskImage: rmask }, shake)
    const lockGlow = el('div', { position: 'absolute', left: (CX - 700) + 'px', top: (CY - 900) + 'px', width: '1400px', height: '1800px', borderRadius: '50%', mixBlendMode: 'screen', background: 'radial-gradient(closest-side, rgba(255,236,206,0.55), rgba(201,166,255,0.22) 40%, rgba(201,166,255,0) 100%)', opacity: 0 }, shake)

    // the matched card
    const card = el('div', { position: 'absolute', left: (CX - RW / 2) + 'px', top: (CARD_CY - RH / 2) + 'px', width: RW + 'px', height: RH + 'px', display: 'none' }, shake)
    const cardHalo = el('div', { position: 'absolute', left: '-35%', top: '-18%', width: '170%', height: '136%', borderRadius: '50%', mixBlendMode: 'screen', background: 'radial-gradient(closest-side, rgba(255,150,232,0.5), rgba(201,166,255,0.18) 50%, rgba(201,166,255,0) 100%)' }, card)
    img(card, `${A}card-reveal.png`, { left: 0, top: 0, width: RW + 'px', height: RH + 'px' })
    const fmask = `url(${A}card-reveal.png)`
    const foil = el('div', { position: 'absolute', left: 0, top: 0, width: RW + 'px', height: RH + 'px', mixBlendMode: 'screen', WebkitMaskImage: fmask, maskImage: fmask, WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
      background: 'linear-gradient(115deg, rgba(242,199,92,0) 38%, rgba(242,199,92,0.35) 45%, rgba(255,246,214,0.85) 50%, rgba(242,199,92,0.35) 55%, rgba(242,199,92,0) 62%)', backgroundSize: '320% 100%', backgroundRepeat: 'no-repeat', opacity: 0 }, card)

    const eb = eyebrow(root, 'THE ALIGN MOMENT', { y: 300, size: 30, spacing: '0.34em' })
    const la = typeLine(root, 'The stars aligned.', { y: 1450, size: 104, perChar: 0.03, fade: 0.3, shadow: '0 0 40px rgba(255,236,200,0.4), 0 2px 30px rgba(11,6,32,0.9)' })
    const lb = typeLine(root, "When it's right,\nthe stars line up.", { y: 1424, size: 86, perChar: 0.03, fade: 0.32, lh: 1.12 })
    const tag = endTag(stage, { start: END, end: DURATION })

    const DUST = (() => { const r = rng(515); return Array.from({ length: 150 }, (_, i) => ({ x: r() * W, y: 200 + r() * (H - 400), s: 0.8 + r() * 1.8, a: 0.3 + r() * 0.6, col: i % 5 === 0 ? '242,199,92' : i % 7 === 0 ? RGB[i % 7] : '255,246,234', ph: r() * 6.28 })) })()
    const BURST = (() => { const r = rng(733); return Array.from({ length: 46 }, (_, i) => ({ a: r() * 6.2832, v: 380 + r() * 620, d: r() * 0.12, px: 3 + Math.floor(r() * 3), gold: i % 3 !== 0, life: 0.7 + r() * 0.6 })) })()
    let sx = 0, sy = 0

    return {
      update(t) {
        bg.update(t)
        // 3-frame shake on the lock
        const sf = Math.round(t * 30) - Math.round(LOCK * 30)
        const SH = [[0, 0], [14, -9], [-11, 7], [6, -4], [-3, 2]]
        ;[sx, sy] = sf >= 0 && sf < SH.length ? SH[sf] : [0, 0]
        shake.style.transform = `translate(${sx}px, ${sy}px)`

        const ten = ease.inQuad(prog(t, 2.2, LOCK))
        dim.style.opacity = String(0.75 * ten * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.6))) + 0.25 * prog(t, COLLAPSE[0], CARD_IN + 0.5) * (1 - prog(t, END - 0.5, END)))
        const rayO = t < LOCK ? 0.15 * ten : t < COLLAPSE[0] ? 0.6 * (1 - ease.inOutQuad(prog(t, LOCK + 0.05, LOCK + 1.6))) + 0.1 : lerp(0.12, 0.3, ease.outQuad(prog(t, CARD_IN, CARD_IN + 0.4))) * (1 - prog(t, CARD_IN + 0.4, CARD_IN + 3))
        rays.style.opacity = String(rayO)
        rays.style.transform = `rotate(${t * 6}deg) scale(${t < LOCK ? 0.7 : lerp(0.75, 1.15, ease.outCubic(prog(t, LOCK, LOCK + 1.6)))})`
        lockGlow.style.opacity = String(t < LOCK ? 0.25 * ten : (1 - ease.outQuad(prog(t, LOCK, LOCK + 1.4))) * 0.9 + 0.2 * (1 - prog(t, LOCK + 1.4, COLLAPSE[1])))

        eb.style.opacity = String(ease.outQuad(prog(t, 0.1, 0.5)) * (1 - prog(t, 3.0, 3.4)))
        eb.style.letterSpacing = lerp(0.5, 0.34, ease.outCubic(prog(t, 0.1, 1.2))) + 'em'
        la.update(t - LINE_A, COLLAPSE[0] - 0.3 - LINE_A)
        la.root.style.transform = `scale(${lerp(1.05, 1, ease.outCubic(prog(t, LINE_A, LINE_A + 0.8)))})`
        lb.update(t - LINE_B)

        // card
        const cp = prog(t, CARD_IN, CARD_IN + 0.75)
        card.style.display = cp > 0 && t < END + 0.3 ? 'block' : 'none'
        if (cp > 0) {
          const s = lerp(0.35, 1, ease.outBack(cp)) * (1 + 0.012 * Math.max(0, t - CARD_IN - 0.75))
          const ry = lerp(80, 0, ease.outCubic(cp)), fl = Math.max(0, t - CARD_IN - 0.75)
          card.style.transform = `perspective(1600px) translateY(${Math.sin(fl * 1.3) * 6}px) rotateY(${ry + Math.sin(fl * 0.8) * 2.5}deg) rotateX(${Math.sin(fl * 0.6 + 1) * 1.5}deg) scale(${s})`
          card.style.opacity = String(ease.outQuad(prog(cp, 0, 0.3)))
          card.style.filter = `brightness(${lerp(2.2, 1, ease.outQuad(prog(cp, 0, 0.7)))})`
          cardHalo.style.opacity = String(0.6 + 0.4 * Math.sin(fl * 2.2) * 0.5 + 0.6 * (1 - ease.outQuad(prog(cp, 0.3, 1))))
          const fp = prog(t, FOIL[0], FOIL[1])
          foil.style.opacity = String(Math.sin(Math.PI * fp) > 0 ? 1 : 0)
          foil.style.backgroundPosition = `${lerp(110, -10, ease.inOutQuad(fp))}% 0`
        }
        tag.update(t)
      },
      fx(ctx, t) {
        if (t >= END) return
        ctx.save(); ctx.translate(sx, sy)
        const ten = ease.inQuad(prog(t, 2.2, LOCK))
        const post = t >= LOCK ? 1 - ease.outQuad(prog(t, LOCK, LOCK + 0.5)) : 0
        starField(ctx, t, { seed: 22, sprites: 20, dots: 70, alpha: lerp(0.9, 0.5, ten) * (t > CARD_IN ? 0.8 : 1), keepOut: [[300, 280, 480, 60], [140, 1420, 800, 230], ...(t > CARD_IN ? [[260, 300, 560, 1100]] : [])] })
        ctx.globalCompositeOperation = 'lighter'

        // dust: drawn toward the line, then blown out by the shockwave
        const dustIn = (0.35 + 0.65 * ten) * (1 - ease.outQuad(prog(t, LOCK, LOCK + 0.7)))
        if (dustIn > 0.01) {
          const blow = ease.outCubic(prog(t, LOCK, LOCK + 0.75))
          const pos = (tt, d) => {
            const pl = ease.inCubic(prog(tt, 1.8, LOCK)) * 0.93
            let x = lerp(d.x, CX + (d.x - CX) * 0.04, pl), y = lerp(d.y, lerp(d.y, CY, 0.2), pl)
            if (tt > LOCK) { const dx = x - CX, dy = y - CY, l = Math.hypot(dx, dy) || 1; x += dx / l * 900 * blow; y += dy / l * 900 * blow }
            return [x, y]
          }
          for (const d of DUST) {
            const [x, y] = pos(t, d), [px, py] = pos(t - (t > LOCK ? 0.014 : 0.06), d)
            const al = d.a * dustIn * (0.6 + 0.4 * Math.sin(t * 6 + d.ph))
            ctx.strokeStyle = `rgba(${d.col},${al.toFixed(3)})`; ctx.lineWidth = d.s; ctx.lineCap = 'round'
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x + (x === px ? 0.01 : 0), y); ctx.stroke()
          }
        }

        // stars + column
        const col = ease.inCubic(prog(t, COLLAPSE[0], COLLAPSE[1]))
        if (t < COLLAPSE[1] + 0.02) {
          const SS = CHAKRAS.map((_, i) => starState(i, t))
          // faint guide of where the line will be
          const guide = prog(t, 0.4, 1.4) * (1 - prog(t, LOCK - 0.1, LOCK)) * 0.16
          if (guide > 0) {
            const gg = ctx.createLinearGradient(0, COL_Y(6) - 120, 0, COL_Y(0) + 120)
            gg.addColorStop(0, 'rgba(255,240,220,0)'); gg.addColorStop(0.5, `rgba(255,240,220,${guide})`); gg.addColorStop(1, 'rgba(255,240,220,0)')
            ctx.fillStyle = gg; ctx.fillRect(CX - 0.75, COL_Y(6) - 120, 1.5, COL_Y(0) - COL_Y(6) + 240)
          }
          // constellation lines between neighbours as they near the column
          for (let i = 0; i < 6; i++) {
            const a = SS[i], b = SS[i + 1]
            let al = 0.45 * clamp((Math.min(a.c, b.c) - 0.72) / 0.14)
            const lt = Math.max(STAR_LOCK[i], STAR_LOCK[i + 1])
            if (t >= lt) al = lerp(1, 0.5, ease.outQuad(prog(t, lt, lt + 0.3)))
            al *= 1 - col
            if (al < 0.01) continue
            ctx.strokeStyle = `rgba(255,236,200,${(al * 0.3).toFixed(3)})`; ctx.lineWidth = 8
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            ctx.strokeStyle = `rgba(255,248,236,${al.toFixed(3)})`; ctx.lineWidth = 1.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
          // column beam
          if (t >= LOCK - 0.04) {
            const bo = (t < LOCK ? prog(t, LOCK - 0.04, LOCK) : lerp(1, 0.32, ease.outQuad(prog(t, LOCK, LOCK + 0.5))) + 0.5 * ease.inQuad(prog(t, COLLAPSE[0] - 0.3, COLLAPSE[0]))) * (1 - col)
            const BW = 90 * (1 - col * 0.8)
            const g = ctx.createLinearGradient(CX - BW, 0, CX + BW, 0)
            g.addColorStop(0, 'rgba(255,240,214,0)'); g.addColorStop(0.5, `rgba(255,244,226,${(0.5 * bo).toFixed(3)})`); g.addColorStop(1, 'rgba(255,240,214,0)')
            const vg = (1 - col)
            ctx.fillStyle = g; ctx.fillRect(CX - BW, lerp(CY, -20, vg), BW * 2, lerp(0, H + 40, vg))
          }
          SS.forEach((s, i) => {
            const rgb = RGB[i]
            let x = s.x, y = s.y
            // trail
            let prev = [x, y]
            for (let j = 1; j <= 12; j++) {
              const q = starState(i, t - j * 0.03)
              const al = (1 - j / 13) * 0.55 * (0.4 + 0.6 * ten + 0.4) * (1 - col)
              ctx.strokeStyle = `rgba(${rgb},${al.toFixed(3)})`; ctx.lineWidth = lerp(6, 1, j / 12)
              ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q.x, q.y); ctx.stroke()
              prev = [q.x, q.y]
            }
            const L = STAR_LOCK[i]
            const flare = t >= L ? 1 - ease.outQuad(prog(t, L, L + 0.35)) : 0
            let sz = lerp(1.75, 1.4, prog(t, 2.5, LOCK)) * (1 + 0.12 * Math.sin(t * 7 + i * 1.7)) * (0.9 + 0.35 * ten) * (1 + 0.9 * flare + 1.3 * post)
            if (col > 0) { x = lerp(x, CX, col); y = lerp(y, CARD_CY, col); sz *= 1 - 0.7 * col }
            const G = 48 * sz
            const gg = ctx.createRadialGradient(x, y, 0, x, y, G)
            gg.addColorStop(0, `rgba(${rgb},0.8)`); gg.addColorStop(0.3, `rgba(${rgb},0.28)`); gg.addColorStop(1, `rgba(${rgb},0)`)
            ctx.fillStyle = gg; ctx.fillRect(x - G, y - G, G * 2, G * 2)
            const sp = (20 + 34 * ten + 70 * flare + 100 * post) * sz
            ctx.strokeStyle = 'rgba(255,250,240,0.55)'; ctx.lineWidth = 1.4
            ctx.beginPath(); ctx.moveTo(x - sp, y); ctx.lineTo(x + sp, y); ctx.moveTo(x, y - sp * 0.7); ctx.lineTo(x, y + sp * 0.7); ctx.stroke()
            const cg = ctx.createRadialGradient(x, y, 0, x, y, 10 * sz)
            cg.addColorStop(0, 'rgba(255,255,255,1)'); cg.addColorStop(0.45, `rgba(${rgb},0.9)`); cg.addColorStop(1, `rgba(${rgb},0)`)
            ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, 10 * sz, 0, 6.2832); ctx.fill()
          })
        }
        // point of light the card is born from
        const pt = prog(t, COLLAPSE[0] + 0.1, CARD_IN + 0.5)
        if (pt > 0 && pt < 1) {
          const k = Math.sin(Math.PI * pt), R = 60 + 520 * ease.outQuad(pt)
          const g = ctx.createRadialGradient(CX, CARD_CY, 0, CX, CARD_CY, R)
          g.addColorStop(0, `rgba(255,252,244,${k})`); g.addColorStop(0.25, `rgba(255,214,240,${0.6 * k})`); g.addColorStop(1, 'rgba(201,166,255,0)')
          ctx.fillStyle = g; ctx.fillRect(CX - R, CARD_CY - R, R * 2, R * 2)
          ctx.strokeStyle = `rgba(255,248,236,${0.8 * k})`; ctx.lineWidth = 1.5
          const sp = 80 + 500 * k
          ctx.beginPath(); ctx.moveTo(CX - sp, CARD_CY); ctx.lineTo(CX + sp, CARD_CY); ctx.moveTo(CX, CARD_CY - sp * 1.2); ctx.lineTo(CX, CARD_CY + sp * 1.2); ctx.stroke()
        }

        // shockwave rings
        if (t >= LOCK && t < LOCK + 1) {
          ;[[0, 1300, 34, '255,246,230'], [0.07, 1050, 20, '201,166,255'], [0.15, 820, 9, '242,199,92']].forEach(([d, R1, w0, rgb]) => {
            const q = prog(t, LOCK + d, LOCK + d + 0.75)
            if (q <= 0 || q >= 1) return
            const R = lerp(120, R1, ease.outCubic(q))
            ctx.strokeStyle = `rgba(${rgb},${(0.85 * (1 - ease.inQuad(q))).toFixed(3)})`; ctx.lineWidth = lerp(w0, 1.5, q)
            ctx.beginPath(); ctx.ellipse(CX, CY, R, R * 1.3, 0, 0, 6.2832); ctx.stroke()
          })
        }
        ctx.globalCompositeOperation = 'source-over'
        // gold pixel-star burst
        const bt = t - LOCK
        if (bt > 0 && bt < 1.6) {
          for (const b of BURST) {
            const q = prog(bt, b.d, b.d + b.life)
            if (q <= 0 || q >= 1) continue
            const R = b.v * ease.outCubic(q)
            const x = CX + Math.cos(b.a) * R, y = CY + Math.sin(b.a) * R * 1.3
            ctx.globalAlpha = 1 - ease.inQuad(q)
            pixelStar(ctx, x, y, b.px, q < 0.25 ? 0 : q < 0.6 ? 1 : 2, b.gold ? GOLD : BONE)
          }
          ctx.globalAlpha = 1
        }
        // foil glints on the card
        const fg = prog(t, FOIL[0], FOIL[1] + 0.5)
        if (fg > 0 && fg < 1) {
          const r = rng(818)
          for (let i = 0; i < 12; i++) {
            const gx = CX - RW * 0.42 + r() * RW * 0.84, gy = CARD_CY - RH * 0.42 + r() * RH * 0.84, dl = (gx - (CX - RW / 2)) / RW * 0.6
            const q = prog(fg, dl, dl + 0.35)
            if (q <= 0 || q >= 1) continue
            ctx.globalAlpha = Math.sin(Math.PI * q)
            pixelStar(ctx, gx, gy, 4, q < 0.4 ? 0 : 1, i % 2 ? GOLD : BONE)
          }
          ctx.globalAlpha = 1
        }
        // flash
        const fl = t >= LOCK ? 1 - ease.outQuad(prog(t, LOCK, LOCK + 0.28)) : 0
        const fl2 = Math.sin(Math.PI * prog(t, CARD_IN - 0.06, CARD_IN + 0.22)) * 0.55
        const fa = Math.max(fl * 0.85, fl2)
        if (fa > 0.01) { ctx.fillStyle = `rgba(255,250,240,${fa.toFixed(3)})`; ctx.fillRect(-40, -40, W + 80, H + 80) }
        ctx.restore()
      },
    }
  },
}
