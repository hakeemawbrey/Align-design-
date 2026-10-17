// 10 — "Put your faith in the stars." The manifesto / pure vibe piece: slow, cinematic push through a deep-space
// nebula; a waxing moon; a drifting constellation of veiled aura portraits (faces hidden); a mystery card rising and
// glowing; a shooting star; a short poem typed line by line in serif italic.
//   0.6  "We hide the faces."          constellation nodes light one by one (soft bells)
//   2.7  "We read the sky."            constellation lines draw · moon brightens
//   4.8  "You bring the courage."      the mystery card rises, its chakra column wakes
//   6.95 shooting star → 7.35 "Put your faith / in the stars."  everything brightens (bell chord, low swell)
//   11.6 end tag → 14.0
import { W, H, IMG, A, SERIF, MONO, el, fill, img, prog, ease, lerp, clamp, rng, spaceBackdrop, starField, pixelStar, typeLine, drawMoon, endTag, BONE, GOLD, HOT, CHAKRAS } from './kit.js'

const DURATION = 14
const END = 11.6
const L1 = 0.6, L2 = 2.7, L3 = 4.8, SHOOT = 6.95, L4 = 7.35
const MOON = { x: 815, y: 330, R: 118 }

// ── nebula: domain-warped fbm painted once at low res, then slowly pushed in
function hash2(x, y, s) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function vnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, s), b = hash2(ix + 1, iy, s), c = hash2(ix, iy + 1, s), d = hash2(ix + 1, iy + 1, s)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, s, oct = 5) {
  let v = 0, amp = 0.5, f = 1, n = 0
  for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, s + o * 31); n += amp; amp *= 0.5; f *= 2.03 }
  return v / n
}
const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }
function paintNebula() {
  const w = 400, h = 712
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d'), id = g.createImageData(w, h), px = id.data
  const VIO = [130, 80, 220], ROSE = [222, 88, 140], TEAL = [60, 150, 190], AMB = [242, 160, 90], DEEP = [30, 12, 70]
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const x = i / w * 2.4, y = j / h * 4.3
    const qx = fbm(x + 1.7, y + 9.2, 3), qy = fbm(x + 8.3, y + 2.8, 5)
    const n = fbm(x + 2.2 * qx, y + 2.2 * qy, 7)
    const m = fbm(x * 1.6 + 4, y * 1.6 + 1, 11, 4)
    // a diagonal river of cloud (lower-left → upper-right) so the frame has a direction
    const band = Math.exp(-(((x * 0.9 - y * 0.42 + 0.55) / 0.55) ** 2))
    const dens = sstep(0.42, 0.85, n) ** 1.4 * (0.18 + 1.0 * band)
    const dust = sstep(0.55, 0.75, fbm(x * 3 + 7, y * 3 + 3, 13, 4)) * band
    const col = [0, 1, 2].map(k => {
      let v = lerp(DEEP[k], VIO[k], sstep(0.2, 0.7, qx))
      v = lerp(v, ROSE[k], sstep(0.45, 0.8, m) * 0.85)
      v = lerp(v, TEAL[k], sstep(0.6, 0.85, qy) * 0.55)
      v = lerp(v, AMB[k], sstep(0.72, 0.9, n) * 0.4 * band)
      return v
    })
    const a = clamp(dens * (1 - dust * 0.85)) * 0.8
    const o = (j * w + i) * 4
    px[o] = col[0] * a; px[o + 1] = col[1] * a; px[o + 2] = col[2] * a; px[o + 3] = 255
    // a few bright cores
    const core = sstep(0.8, 0.95, n) * band
    px[o] = Math.min(255, px[o] + 120 * core); px[o + 1] = Math.min(255, px[o + 1] + 90 * core); px[o + 2] = Math.min(255, px[o + 2] + 110 * core)
  }
  g.putImageData(id, 0, 0)
  return c.toDataURL()
}

// constellation: [x, y, d, sign] veiled aura portraits (faces hidden). Text lives in y 1180–1500; card x 330–750, y 480–1120
const SIGNS = ['libra', 'taurus', 'leo', 'pisces', 'scorpio', 'gemini', 'aquarius', 'cancer', 'virgo', 'aries', 'sagittarius', 'capricorn']
// three loose constellations (upper-left, right, bottom) + one stray, each drifting its own way (parallax)
const NODES = [
  [150, 300, 96, 0, 0], [370, 205, 70, 4, 0], [575, 290, 52, 6, 0], [130, 570, 80, 2, 0], [250, 870, 60, 7, 3],
  [935, 660, 88, 1, 1], [835, 885, 62, 5, 1], [975, 1065, 50, 9, 1], [300, 1590, 50, 11, 2], [950, 1650, 80, 3, 2],
  [140, 1700, 72, 8, 2], [600, 1750, 58, 10, 2],
]
const DRIFT = [[3.5, 2.5], [-3, 2.2], [2.2, -3.4], [-2, -1]]
const ORDER = [0, 5, 3, 1, 6, 9, 4, 10, 2, 8, 7, 11]
const EDGES = [[0, 1], [1, 2], [0, 3], [5, 6], [6, 7], [10, 8], [8, 11], [11, 9], [3, 4]]
const popT = []; ORDER.forEach((n, k) => { popT[n] = L1 + 0.1 + k * 0.13 })

export default {
  id: '10-faith', title: 'Put your faith in the stars', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, 3.4, [146.83, 220, 277.18, 369.99, 554.37]],              // D maj7
      [3.4, 6.9, [123.47, 185, 293.66, 369.99, 554.37]],            // B m9
      [6.9, 9.4, [98, 196, 246.94, 369.99, 440, 587.33]],           // G maj9 — "faith"
      [9.4, END, [110, 220, 293.66, 329.63, 493.88]],               // A sus
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.026,
  },
  cues: [
    ['whoosh', 0.25, 1.2, 0.05],
    // a soft bell as each node lights (quiet pentatonic)
    ...ORDER.map((n, k) => ['bell', popT[n], [1174.66, 1318.5, 1479.98, 1760, 1975.53][k % 5], 0.012, 1.4, (NODES[n][0] / W - 0.5) * 1.2]),
    ['bell', L1, 587.33, 0.05, 3.2, -0.15],
    ['bell', L2, 659.25, 0.05, 3.2, 0.15], ['glitter', L2 + 0.3, L2 + 1.4],
    ['bell', L3, 739.99, 0.05, 3.2, -0.1], ['whoosh', L3 + 0.6, 1.0, 0.06],
    ['riser', 5.6, SHOOT + 0.1, 0.05],
    ['whoosh', SHOOT + 0.35, 0.7, 0.11], ['bell', SHOOT + 0.05, 2349.3, 0.025, 1.2, -0.5], ['glitter', SHOOT + 0.1, SHOOT + 0.6],
    ['boom', L4, 0.2], ['bell', L4, 293.66, 0.07, 4.0], ['bell', L4 + 0.03, 587.33, 0.06, 4.0, -0.2], ['bell', L4 + 0.06, 880, 0.04, 4.0, 0.2], ['bell', L4 + 0.09, 1174.66, 0.025, 4.0],
    ['glitter', L4 + 0.2, L4 + 1.2],
    ['bell', 9.6, 1479.98, 0.02, 2.0, 0.3], ['bell', 10.3, 1318.5, 0.02, 2.0, -0.3],
  ],
  async build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'rose', { seed: 21, grain: 0.26, stars: 240 })
    const neb = el('div', { position: 'absolute', left: '-60px', top: '-100px', width: (W + 120) + 'px', height: (H + 200) + 'px', backgroundSize: '100% 100%', mixBlendMode: 'screen', opacity: 1, filter: 'blur(1.5px)' })
    neb.style.backgroundImage = `url(${paintNebula()})`
    bg.root.insertBefore(neb, bg.root.children[4]) // above the blobs, under stars / vignette / grain

    // camera group (push-in), with the moon + constellation + card inside at different depths
    const cam = fill(root, {})
    const lines = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, cam)
    lines.width = W; lines.height = H
    const lg = lines.getContext('2d')
    const moonC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    moonC.width = W; moonC.height = H
    const mg = moonC.getContext('2d')
    const nodes = NODES.map(([x, y, d, si, cl], i) => {
      d = Math.round(d * 1.3)
      const g = el('div', { position: 'absolute', left: '0px', top: '0px', width: d + 'px', height: d + 'px', borderRadius: '50%', opacity: 0, willChange: 'transform' }, cam)
      const glow = el('div', { position: 'absolute', inset: '-55%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,240,226,0.55), rgba(201,166,255,0.28) 45%, rgba(201,166,255,0) 100%)' }, g)
      const disc = el('div', { position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: '#140a2e', boxShadow: '0 8px 22px rgba(4,2,14,0.55), 0 0 0 1.5px rgba(239,230,214,0.85), 0 0 0 4px rgba(239,230,214,0.12)' }, g)
      img(disc, `${IMG}aura/${SIGNS[si]}.jpg`, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 62%', transform: 'scale(1.35)' })
      return { x, y, d, g, glow, ph: i * 1.37, dr: DRIFT[cl] }
    })

    // mystery card
    const CW = 400, CHh = Math.round(CW * 2347 / 1528)
    const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '1800px' }, cam)
    const halo = el('div', { position: 'absolute', left: (540 - 420) + 'px', top: (800 - 520) + 'px', width: '840px', height: '1040px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,180,255,0.75), rgba(170,120,240,0.3) 50%, rgba(154,123,224,0) 100%)', opacity: 0, mixBlendMode: 'screen' }, persp)
    const card = el('div', { position: 'absolute', left: (540 - CW / 2) + 'px', top: (800 - CHh / 2) + 'px', width: CW + 'px', height: CHh + 'px', opacity: 0, transformStyle: 'preserve-3d' }, persp)
    img(card, A + 'card-back.png', { left: 0, top: 0, width: '100%', height: '100%' })
    const cardGlow = el('canvas', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CHh + 'px', mixBlendMode: 'screen' }, card)
    cardGlow.width = CW; cardGlow.height = CHh
    const cg = cardGlow.getContext('2d')
    const sheen = el('div', { position: 'absolute', inset: '3%', borderRadius: '26px', overflow: 'hidden', mixBlendMode: 'screen' }, card)
    const sheenBar = el('div', { position: 'absolute', left: '-60%', top: '-20%', width: '50%', height: '140%', background: 'linear-gradient(90deg, rgba(255,240,220,0), rgba(255,240,220,0.22), rgba(255,240,220,0))', transform: 'rotate(18deg)' }, sheen)

    // poem
    const txt = fill(root, {})
    const P = { size: 88, perChar: 0.035, fade: 0.45 }
    const l1 = typeLine(txt, 'We hide the faces.', { y: 1200, ...P })
    const l2 = typeLine(txt, 'We read the sky.', { y: 1300, ...P })
    const l3 = typeLine(txt, 'You bring the courage.', { y: 1400, ...P })
    const l4 = typeLine(txt, 'Put your faith\nin the stars.', { y: 1220, size: 116, perChar: 0.045, fade: 0.55, lh: 1.08, shadow: '0 0 40px rgba(242,199,92,0.28), 0 2px 24px rgba(11,6,32,0.7)' })
    const dimmer = fill(root, { background: '#0b0620', opacity: 0 })
    const tag = endTag(stage, { start: END, end: DURATION })

    const camScale = (t) => 1 + 0.04 * ease.inOutQuad(prog(t, 0, L4)) + 0.07 * ease.inOutQuad(prog(t, L4 - 0.5, END))
    const toCam = (x, y, t, depth = 1) => { const s = 1 + (camScale(t) - 1) * depth; return [540 + (x - 540) * s, 900 + (y - 900) * s] }
    const cardY = (t) => lerp(1060, 800, ease.outCubic(prog(t, L3 - 0.3, L3 + 1.6))) + Math.sin(t * 0.9) * 8

    return {
      update(t) {
        bg.update(t)
        neb.style.transform = `scale(${1 + 0.05 * prog(t, 0, END)}) translate(${-t * 1.6}px, ${t * 2.4}px)`
        cam.style.transformOrigin = '540px 900px'
        cam.style.transform = `scale(${camScale(t)})`
        const glowUp = ease.inOutQuad(prog(t, L4 - 0.2, L4 + 1.2))

        // constellation nodes (drift, light in turn, brighten at the last line)
        lg.clearRect(0, 0, W, H)
        const pos = nodes.map((n, i) => {
          const lit = ease.outCubic(prog(t, popT[i], popT[i] + 0.6))
          const x = n.x + Math.sin(t * 0.35 + n.ph) * 8 + n.dr[0] * t, y = n.y + Math.cos(t * 0.3 + n.ph) * 10 + n.dr[1] * t
          n.g.style.opacity = String(lit * 0.92)
          const ex = 1 + 0.12 * (n.d / 100) * ease.inOutQuad(prog(t, L4 - 0.3, END))
          const X = 540 + (x - 540) * ex, Y = 900 + (y - 900) * ex
          n.g.style.transform = `translate(${X - n.d / 2}px, ${Y - n.d / 2}px) scale(${lerp(0.6, 1, ease.outBack(prog(t, popT[i], popT[i] + 0.6)))})`
          n.glow.style.opacity = String(0.35 + 0.35 * glowUp + 0.15 * Math.sin(t * 1.3 + n.ph))
          return [X, Y, lit, n.d]
        })
        EDGES.forEach(([a, b], k) => {
          const p = ease.inOutCubic(prog(t, L2 + 0.15 + k * 0.12, L2 + 0.75 + k * 0.12))
          if (p <= 0) return
          const [ax, ay, , ad] = pos[a], [bx, by, , bd] = pos[b]
          const L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L
          const sx = ax + ux * (ad / 2 + 10), sy = ay + uy * (ad / 2 + 10), ex = bx - ux * (bd / 2 + 10), ey = by - uy * (bd / 2 + 10)
          lg.strokeStyle = `rgba(239,230,214,${0.45 + 0.25 * glowUp})`; lg.lineWidth = 2
          lg.beginPath(); lg.moveTo(sx, sy); lg.lineTo(lerp(sx, ex, p), lerp(sy, ey, p)); lg.stroke()
          if (p < 1) { lg.fillStyle = 'rgba(255,243,224,0.9)'; lg.beginPath(); lg.arc(lerp(sx, ex, p), lerp(sy, ey, p), 2.5, 0, 6.283); lg.fill() }
        })

        // moon (outside the camera so it barely moves: far away), waxing as the poem goes
        mg.clearRect(0, 0, W, H)
        const mIn = ease.outCubic(prog(t, 0, 1.6))
        const ph = lerp(0.15, 0.2, prog(t, 0, END))
        drawMoon(mg, MOON.x - t * 1.2, MOON.y + t * 0.8, MOON.R, Math.round(ph * 400) / 400, { alpha: mIn, darkAlpha: 0.38, earthshine: 0.9, glow: 1.0 + 0.6 * ease.inOutQuad(prog(t, L2, L2 + 1.5)) + 0.6 * glowUp })

        // card
        const cIn = ease.outCubic(prog(t, L3 - 0.3, L3 + 1.2))
        card.style.opacity = String(cIn)
        card.style.filter = `drop-shadow(0 0 ${30 + 30 * glowUp}px rgba(201,166,255,${0.45 + 0.25 * glowUp + 0.1 * Math.sin(t * 1.4)}))`
        card.style.top = (cardY(t) - CHh / 2) + 'px'
        card.style.transform = `rotateY(${Math.sin(t * 0.55) * 11 + lerp(-28, 0, cIn)}deg) rotateX(${Math.sin(t * 0.4 + 1) * 5 + lerp(16, 6, cIn)}deg) rotateZ(${Math.sin(t * 0.3) * 1.5}deg)`
        halo.style.top = (cardY(t) - 520) + 'px'
        halo.style.opacity = String(Math.min(1, cIn * (0.8 + 0.2 * Math.sin(t * 1.4)) + 0.3 * glowUp))
        sheenBar.style.left = lerp(-60, 130, prog(t, L3 + 0.6, L3 + 2.0)) + '%'
        // the card's chakra column wakes one by one, then flares on the last line
        cg.clearRect(0, 0, CW, CHh)
        cg.globalCompositeOperation = 'lighter'
        CHAKRAS.forEach((c, i) => {
          const y = CHh * (0.598 - i * 0.0388), x = CW * 0.5
          const a = prog(t, L3 + 0.5 + (6 - i) * 0.12, L3 + 0.9 + (6 - i) * 0.12) * (0.55 + 0.25 * Math.sin(t * 2 + i)) + glowUp * 0.6
          if (a <= 0) return
          const r = 22 + 14 * glowUp
          const gr = cg.createRadialGradient(x, y, 0, x, y, r)
          gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)')
          cg.globalAlpha = clamp(a); cg.fillStyle = gr; cg.fillRect(x - r, y - r, r * 2, r * 2)
        })
        cg.globalAlpha = 1; cg.globalCompositeOperation = 'source-over'

        // poem
        const out3 = L4 - 0.55
        l1.update(t - L1, out3 - L1); l2.update(t - L2, out3 - L2); l3.update(t - L3, out3 - L3)
        l4.update(t - L4, END - 0.6 - L4)
        // a gentle dim before the end tag
        dimmer.style.opacity = String(ease.inQuad(prog(t, END - 0.7, END)) * 0.85)
        tag.update(t)
      },
      fx(ctx, t) {
        if (t > END + 0.25) return
        const fade = 1 - prog(t, END - 0.5, END + 0.15)
        starField(ctx, t, { seed: 41, sprites: 20, dots: 60, alpha: 0.9 * fade, drift: [-3, -6], keepOut: [[90, 1190, 900, 320]] })
        // shooting star: a pixel head with a long gradient tail, upper-left → toward the card
        const sp = prog(t, SHOOT - 0.15, SHOOT + 0.85)
        if (sp > 0 && sp < 1) {
          const e = ease.inOutQuad(sp)
          const x0 = -40, y0 = 120, x1 = 760, y1 = 560
          const hx = lerp(x0, x1, e), hy = lerp(y0, y1, e)
          const tl = 520 * Math.sin(Math.PI * Math.min(1, sp * 1.3))
          const dx = (x1 - x0), dy = (y1 - y0), L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
          const a = Math.sin(Math.PI * sp) * fade
          const gr = ctx.createLinearGradient(hx, hy, hx - ux * tl, hy - uy * tl)
          gr.addColorStop(0, `rgba(255,243,224,${0.95 * a})`); gr.addColorStop(0.3, `rgba(242,199,92,${0.45 * a})`); gr.addColorStop(1, 'rgba(201,166,255,0)')
          ctx.strokeStyle = gr; ctx.lineWidth = 3; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - ux * tl, hy - uy * tl); ctx.stroke()
          ctx.lineWidth = 9; ctx.globalAlpha = 0.25; ctx.stroke(); ctx.globalAlpha = 1
          const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 40)
          hg.addColorStop(0, `rgba(255,246,230,${0.8 * a})`); hg.addColorStop(1, 'rgba(255,246,230,0)')
          ctx.fillStyle = hg; ctx.fillRect(hx - 40, hy - 40, 80, 80)
          ctx.globalAlpha = a; pixelStar(ctx, hx, hy, 4, 0, BONE, HOT)
          // crumbs left behind
          const r = rng(77)
          for (let i = 0; i < 14; i++) {
            const k = r(), ex = lerp(x0, x1, ease.inOutQuad(k)), ey = lerp(y0, y1, ease.inOutQuad(k))
            const age = sp - k
            if (age < 0 || age > 0.45) continue
            ctx.globalAlpha = fade * (1 - age / 0.45)
            pixelStar(ctx, ex + (r() - 0.5) * 20, ey + (r() - 0.5) * 20 + age * 60, 3, 2, GOLD, HOT)
          }
          ctx.globalAlpha = 1
        }
        // gold glints falling softly after "faith"
        if (t > L4) {
          const r = rng(909)
          for (let i = 0; i < 30; i++) {
            const t0 = L4 + r() * 3.5, life = 1.4 + r() * 1.2, x = 80 + r() * 920, y0 = 260 + r() * 900
            const lt = t - t0
            if (lt < 0 || lt > life) continue
            const tw = Math.sin(Math.PI * lt / life)
            ctx.globalAlpha = fade * tw * 0.9
            pixelStar(ctx, x, y0 + lt * 18, 3, tw > 0.85 ? 0 : tw > 0.4 ? 1 : 2, r() < 0.5 ? GOLD : BONE, HOT)
          }
          ctx.globalAlpha = 1
        }
      },
    }
  },
}
