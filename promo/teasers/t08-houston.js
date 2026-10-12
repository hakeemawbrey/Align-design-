// 08-houston — "Houston, the stars are dealing." · local launch + founding members.
// A night constellation map over a drawn Houston skyline: stars (some of them tiny aura portraits) light up
// over the city while a counter ticks to 333 charts; then the gold founding card (№ 0112) stamps in with a
// foil sweep: "Founding cards are numbered."
//
// Timing
//   0.00–0.90  hook "Houston, / the stars are dealing." types in · skyline settles up
//   0.80–4.40  counter 000 → 333 CHARTS NEAR YOU; dot stars light as it climbs, 9 portrait stars pop 1.0–3.9
//   2.60–4.30  constellation lines draw between the portraits
//   4.70–5.30  hook + counter out · 4.6–5.72 riser · sky dims
//   5.45–5.75  founding card drops in · 5.75 IMPACT (boom, shake, shockwave, sparks)
//   6.02–6.55  gold-foil sweep · 6.45 "Founding cards / are numbered." · 8.7 second soft glint
//   10.6 end tag "FOUNDING MEMBERS / HOUSTON" → 13.0
import { W, H, A, IMG, MONO, el, fill, img, prog, ease, clamp, lerp, rng, spaceBackdrop, typeLine, starField, pixelStar, endTag, BONE, GOLD } from './kit.js'

const DURATION = 13
const END = 10.6
const COUNT = { a: 0.8, b: 4.4, n: 333 }
const STAMP = { a: 5.45, hit: 5.75 }
const FOIL = { a: 6.02, b: 6.55 }
const LINE2 = 6.45
const countAt = (t) => Math.round(COUNT.n * ease.outQuad(prog(t, COUNT.a, COUNT.b)))

// ── portrait stars ─────────────────────────────────────────────────────────
const PORTRAITS = [
  { f: 'people/p1.jpg', x: 168, y: 742, r: 40, c: '#ff8fd0' },
  { f: 'people/p2.jpg', x: 392, y: 668, r: 34, c: '#8be36a' },
  { f: 'people/p9.jpg', x: 612, y: 800, r: 44, c: '#ff8a4a' },
  { f: 'people/p6.jpg', x: 880, y: 690, r: 38, c: '#4fd6ea' },
  { f: 'people/p3.jpg', x: 262, y: 968, r: 36, c: '#ff6fb0' },
  { f: 'people/p11.jpg', x: 506, y: 1028, r: 32, c: '#6f8cff' },
  { f: 'people/p7.jpg', x: 760, y: 960, r: 38, c: '#3fe0c4' },
  { f: 'people/p5.jpg', x: 950, y: 880, r: 32, c: '#ffd04a' },
  { f: 'juniper.jpg', x: 690, y: 1120, r: 30, c: '#c58bff' },
]
const POP = [1.0, 1.38, 1.7, 2.0, 2.3, 2.62, 2.95, 3.3, 3.62]
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [2, 5], [5, 8], [8, 6], [6, 7], [2, 6]]
const LINK_T = (k) => 2.6 + k * 0.15

// ── dot stars (each one a chart), lit as the counter passes its threshold ─────────────
const DOTS = (() => {
  const r = rng(808), out = []
  for (let i = 0; i < 190; i++) {
    const y = lerp(620, 1300, Math.pow(r(), 0.8)), x = 40 + r() * 1000
    if (y < 660 && x > 300 && x < 780) { i--; continue }
    out.push({ x, y, th: Math.floor(r() * 330) + 1, s: 0.8 + r() * 1.7, ph: r() * 6.28, kind: r() < 0.16 ? (r() < 0.5 ? 1 : 2) : -1, col: [BONE, BONE, GOLD, '#c9a6ff', '#ff8fb1'][Math.floor(r() * 5)] })
  }
  return out
})()

// ── Houston skyline (stylised, drawn): polygons in stage coords, ground at y = 1920 ─────
const G = 1920
function rect(x0, x1, top) { return [[x0, G], [x0, top], [x1, top], [x1, G]] }
const SKYLINE = [
  // Heritage Plaza — stepped Mayan crown
  { p: [[96, G], [96, 1400], [104, 1400], [104, 1384], [114, 1384], [114, 1368], [126, 1368], [126, 1352], [152, 1352], [152, 1368], [164, 1368], [164, 1384], [174, 1384], [174, 1400], [182, 1400], [182, G]], lit: 0.5 },
  // Wells Fargo Plaza — bevelled glass tower, stepped corners
  { p: [[214, G], [214, 1250], [224, 1250], [224, 1228], [236, 1228], [236, 1212], [300, 1212], [300, 1228], [312, 1228], [312, 1250], [322, 1250], [322, G]], lit: 0.6 },
  // JPMorgan Chase Tower — tallest, five-sided with a sheared face
  { p: [[356, G], [356, 1166], [372, 1150], [446, 1150], [446, 1166], [462, 1182], [462, G]], lit: 0.55, face: [[446, 1166], [462, 1182], [462, G], [446, G]] },
  // Bank of America Center — Dutch-gothic stepped gables, three tiers
  { p: [[500, G], [500, 1430], [512, 1414], [524, 1430], [524, 1356], [536, 1338], [548, 1356], [548, 1290], [560, 1266], [572, 1290], [572, 1356], [584, 1338], [596, 1356], [596, 1430], [608, 1414], [620, 1430], [620, G]], lit: 0.45 },
  // Pennzoil Place — twin trapezoids with sheared tops and a slot between
  { p: [[640, G], [640, 1370], [690, 1330], [690, G]], lit: 0.5 },
  { p: [[700, G], [700, 1330], [750, 1370], [750, G]], lit: 0.5 },
  // TC Energy Center — rounded crown
  { p: [[778, G], [778, 1330], ...Array.from({ length: 9 }, (_, i) => { const a = Math.PI + Math.PI * i / 8; return [814 + Math.cos(a) * 36, 1330 + Math.sin(a) * 34] }), [850, 1330], [850, G]], lit: 0.5 },
  // 609 Main — sloped top
  { p: [[870, G], [870, 1300], [940, 1276], [940, G]], lit: 0.55 },
  // Williams Tower (Uptown, off to the right, with its beacon)
  { p: [[990, G], [990, 1290], [1004, 1276], [1016, 1262], [1028, 1276], [1042, 1290], [1042, G]], lit: 0.5, beacon: [1016, 1250] },
  // filler blocks
  ...[[0, 60, 1560], [40, 96, 1500], [182, 214, 1530], [322, 356, 1480], [462, 500, 1520], [620, 640, 1590], [688, 702, 1600], [750, 778, 1540], [850, 870, 1480], [940, 990, 1560], [1042, 1080, 1520]].map(([a, b, t]) => ({ p: rect(a, b, t), lit: 0.35 })),
]
const FORE = [[0, 1700], [70, 1660], [150, 1720], [230, 1680], [330, 1740], [430, 1690], [540, 1730], [640, 1680], [760, 1720], [880, 1670], [980, 1710], [1080, 1690]]

function pointIn(poly, x, y) {
  let ins = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins
  }
  return ins
}

export default {
  id: '08-houston', title: 'Houston, the stars are dealing.', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, 2.7, [110, 164.81, 220, 277.18, 329.63]],          // A add9
      [2.7, 5.4, [92.5, 138.59, 185, 277.18, 329.63]],      // F#m7 — counting up
      [5.4, 8.0, [146.83, 220, 293.66, 369.99, 440]],       // D maj — the card lands
      [8.0, END, [123.47, 185, 246.94, 293.66, 369.99]],    // Bm7
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.024, bpm: 90, beatFrom: 0.33, beatTo: 5.3, pulseGain: 0.2,
  },
  cues: (() => {
    const c = [['whoosh', 0.1, 0.5, 0.06], ['glitter', 1.0, 4.2]]
    // counter ticks: one every 12 charts
    let last = 0
    for (let f = Math.round(COUNT.a * 30); f <= Math.round(COUNT.b * 30); f++) { const n = countAt(f / 30); if (n - last >= 12) { c.push(['tick', f / 30, 0.05]); last = n } }
    c.push(['bell', COUNT.b, 880, 0.05, 1.8, 0])
    const PENT = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73, 1318.51]
    POP.forEach((t, i) => c.push(['bell', t, PENT[i], 0.045, 1.6, (PORTRAITS[i].x / W - 0.5) * 1.2]))
    c.push(['riser', 4.6, STAMP.hit - 0.03, 0.11], ['whoosh', STAMP.hit - 0.05, 0.45, 0.1], ['boom', STAMP.hit, 0.5], ['tick', STAMP.hit, 0.14])
    c.push(['whoosh', FOIL.a + 0.25, 0.5, 0.07], ['glitter', FOIL.a + 0.1, FOIL.b])
    c.push(['bell', LINE2 + 0.05, 587.33, 0.06, 2.6, -0.15], ['bell', LINE2 + 0.6, 739.99, 0.045, 2.6, 0.15], ['bell', 8.75, 1174.66, 0.025, 1.6, 0.3])
    return c
  })(),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const scene = fill(root, { background: 'transparent', overflow: 'visible' })
    const bg = spaceBackdrop(scene, 'amber', { seed: 8, grain: 0.22, stars: 140 })
    // city light-pollution glow on the horizon
    el('div', { position: 'absolute', left: '-300px', top: '1080px', width: (W + 600) + 'px', height: '1100px', borderRadius: '50%', mixBlendMode: 'screen',
      background: 'radial-gradient(closest-side, rgba(255,150,110,0.36) 0%, rgba(232,98,138,0.2) 45%, rgba(180,92,255,0) 100%)' }, scene)

    // sky layer: dots, portrait stars, constellation lines
    const sky = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, scene)
    sky.width = W; sky.height = H
    const sg = sky.getContext('2d')
    const faces = PORTRAITS.map((p) => img(root, IMG + p.f, { left: '-10px', top: '-10px', width: '1px', height: '1px', opacity: 0 }))

    // skyline: static silhouette, prerendered (windows base) + dynamic layer
    const city = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, scene)
    const cityCv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, city)
    cityCv.width = W; cityCv.height = H
    const WINDOWS = []
    {
      const g = cityCv.getContext('2d'), r = rng(4242)
      for (const b of SKYLINE) {
        const ys = b.p.map((q) => q[1]), top = Math.min(...ys), xs = b.p.map((q) => q[0])
        const gr = g.createLinearGradient(0, top, 0, G)
        gr.addColorStop(0, '#1d1140'); gr.addColorStop(0.35, '#130a2e'); gr.addColorStop(1, '#0a051d')
        g.fillStyle = gr; g.beginPath(); b.p.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill()
        if (b.face) { g.fillStyle = 'rgba(8,4,24,0.45)'; g.beginPath(); b.face.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill() }
        // rim light along the roofline (warm city glow from behind)
        g.strokeStyle = 'rgba(255,170,140,0.35)'; g.lineWidth = 1.5; g.beginPath()
        b.p.slice(1, -1).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke()
        // window grid
        const x0 = Math.min(...xs), x1 = Math.max(...xs)
        for (let y = top + 10; y < 1880; y += 9) for (let x = x0 + 5; x < x1 - 4; x += 7) {
          if (!pointIn(b.p, x, y) || !pointIn(b.p, x + 3, y - 4)) continue
          if (r() > b.lit * 0.55 * (y < 1500 ? 1 : 0.6)) continue
          WINDOWS.push({ x, y, ph: r() * 100, warm: r() < 0.7, flick: r() < 0.06 })
        }
      }
      // static windows
      for (const w of WINDOWS) if (!w.flick) {
        g.fillStyle = w.warm ? 'rgba(255,214,150,0.62)' : 'rgba(220,210,255,0.45)'
        g.fillRect(w.x, w.y, 2, 3)
      }
      // foreground low-rise silhouette band, darker
      g.fillStyle = '#08041a'; g.beginPath(); g.moveTo(0, G)
      let px = 0
      FORE.forEach(([x, y]) => { g.lineTo(px, y); g.lineTo(x, y); px = x })
      g.lineTo(W, G); g.closePath(); g.fill()
      // freeway deck
      g.fillStyle = '#05020f'; g.fillRect(0, 1812, W, 12)
      g.fillStyle = 'rgba(255,190,140,0.18)'; g.fillRect(0, 1811, W, 1)
    }
    const cityDyn = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, city)
    cityDyn.width = W; cityDyn.height = H
    const cg = cityDyn.getContext('2d')

    // dim over the sky when the card lands
    const dim = fill(scene, { background: 'radial-gradient(70% 45% at 50% 48%, rgba(9,4,26,0.78), rgba(9,4,26,0.45))', opacity: 0 })

    // ── type ──
    const hook = typeLine(root, 'Houston,\nthe stars are dealing.', { y: 236, size: 98, perChar: 0.02, fade: 0.26 })
    const ctr = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: '500px', textAlign: 'center', fontFamily: MONO, color: BONE, opacity: 0, whiteSpace: 'nowrap', textShadow: '0 1px 14px rgba(11,6,32,0.8)' }, root)
    const ctrN = el('span', { fontSize: '56px', letterSpacing: '0.08em', marginRight: '22px', verticalAlign: '-4px', fontVariantNumeric: 'tabular-nums' }, ctr, '000')
    el('span', { fontSize: '30px', letterSpacing: '0.24em' }, ctr, 'CHARTS NEAR YOU')

    // ── founding card ──
    const CS = 0.62, CW = 1264 * CS, CH = 1584 * CS, CX = W / 2, CY = 930
    const BODY = { x: 162 * CS, y: 162 * CS, w: 940 * CS, h: 1258 * CS, r: 64 * CS }
    const cglow = el('div', { position: 'absolute', left: (CX - 560) + 'px', top: (CY - 640) + 'px', width: '1120px', height: '1280px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
      background: 'radial-gradient(closest-side, rgba(242,199,92,0.3) 0%, rgba(232,140,90,0.14) 45%, rgba(180,92,255,0) 100%)' }, root)
    const card = el('div', { position: 'absolute', left: (CX - CW / 2) + 'px', top: (CY - CH / 2) + 'px', width: CW + 'px', height: CH + 'px', opacity: 0 }, root)
    img(card, A + 'card-founding.png', { left: 0, top: 0, width: CW + 'px', height: CH + 'px' })
    const foilBox = el('div', { position: 'absolute', left: BODY.x + 'px', top: BODY.y + 'px', width: BODY.w + 'px', height: BODY.h + 'px', borderRadius: BODY.r + 'px', overflow: 'hidden', mixBlendMode: 'screen' }, card)
    const foil = el('div', { position: 'absolute', top: '-30%', left: 0, width: '260px', height: '160%', transform: 'skewX(-22deg)',
      background: 'linear-gradient(90deg, rgba(242,199,92,0) 0%, rgba(242,199,92,0.16) 34%, rgba(255,228,160,0.62) 48%, rgba(255,248,226,0.98) 50%, rgba(255,228,160,0.62) 52%, rgba(242,199,92,0.16) 66%, rgba(242,199,92,0) 100%)' }, foilBox)
    const flashC = el('div', { position: 'absolute', left: BODY.x + 'px', top: BODY.y + 'px', width: BODY.w + 'px', height: BODY.h + 'px', borderRadius: BODY.r + 'px', background: 'radial-gradient(60% 50% at 50% 45%, rgba(255,246,220,0.9), rgba(242,199,92,0.3) 60%, rgba(242,199,92,0) 100%)', mixBlendMode: 'screen', opacity: 0 }, card)
    const shadow = el('div', { position: 'absolute', left: (CX - 330) + 'px', top: (CY + 330) + 'px', width: '660px', height: '120px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(4,2,12,0.7), rgba(4,2,12,0))', opacity: 0 }, root)
    root.insertBefore(shadow, card)
    const line2 = typeLine(root, 'Founding cards\nare numbered.', { y: 1400, size: 92, perChar: 0.024, fade: 0.28 })
    const tag = endTag(stage, { start: END, end: DURATION, line: 'FOUNDING MEMBERS\nHOUSTON' })

    const shakeAt = (t) => {
      const q = prog(t, STAMP.hit, STAMP.hit + 0.42)
      if (q <= 0 || q >= 1) return [0, 0]
      const r = rng(Math.round(t * 30) * 7 + 3), a = 16 * Math.pow(1 - q, 2)
      return [(r() - 0.5) * 2 * a, (r() - 0.5) * 2 * a]
    }

    return {
      update(t) {
        bg.update(t)
        const fi = Math.round(t * 30)
        const [sx, sy] = shakeAt(t)
        const rise = lerp(60, 0, ease.outCubic(prog(t, 0, 1.4)))
        scene.style.transform = `translate(${sx}px, ${sy}px)`
        city.style.transform = `translateY(${rise + 14 * ease.inOutQuad(prog(t, 5.0, END))}px)`
        sky.style.transform = `translateY(${-10 * prog(t, 0, END)}px)`

        // ── sky ──
        const n = countAt(t)
        sg.clearRect(0, 0, W, H)
        const skyA = 1 - 0.35 * ease.inOutQuad(prog(t, 5.0, 5.8))
        for (const d of DOTS) {
          if (n < d.th) continue
          // the moment a chart lights, the star flares then settles to a twinkle
          const tLit = (() => { const f = COUNT.n ? d.th / COUNT.n : 0; const u = 1 - Math.sqrt(1 - clamp(f)); return COUNT.a + u * (COUNT.b - COUNT.a) })()
          const age = t - tLit, flare = Math.max(0, 1 - age / 0.35)
          const tw = 0.55 + 0.45 * Math.sin(t * 2.6 + d.ph)
          sg.globalAlpha = skyA * Math.min(1, 0.4 + 0.6 * tw + flare)
          if (d.kind >= 0) pixelStar(sg, d.x, d.y, 3, flare > 0.5 ? 0 : d.kind, d.col)
          else {
            sg.fillStyle = '#fff7ec'; sg.beginPath(); sg.arc(d.x, d.y, d.s * (1 + 1.6 * flare), 0, 6.283); sg.fill()
            if (flare > 0) { sg.globalAlpha = skyA * flare * 0.6; sg.fillStyle = d.col; sg.beginPath(); sg.arc(d.x, d.y, 9 * flare + 2, 0, 6.283); sg.fill() }
          }
        }
        sg.globalAlpha = 1
        // constellation lines
        sg.lineCap = 'round'
        LINKS.forEach(([a, b], k) => {
          const q = ease.inOutQuad(prog(t, LINK_T(k), LINK_T(k) + 0.35))
          if (q <= 0) return
          const A1 = PORTRAITS[a], B1 = PORTRAITS[b]
          const dx = B1.x - A1.x, dy = B1.y - A1.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
          const x0 = A1.x + ux * (A1.r + 8), y0 = A1.y + uy * (A1.r + 8), x1 = B1.x - ux * (B1.r + 8), y1 = B1.y - uy * (B1.r + 8)
          sg.strokeStyle = `rgba(239,230,214,${0.42 * skyA})`; sg.lineWidth = 1.6
          sg.setLineDash([2, 7]); sg.beginPath(); sg.moveTo(x0, y0); sg.lineTo(lerp(x0, x1, q), lerp(y0, y1, q)); sg.stroke(); sg.setLineDash([])
        })
        // portrait stars
        PORTRAITS.forEach((p, i) => {
          const q = prog(t, POP[i], POP[i] + 0.4)
          if (q <= 0) return
          const s = ease.outBack(q), flare = Math.max(0, 1 - (t - POP[i]) / 0.5)
          const bob = Math.sin(t * 1.3 + i) * 3
          const x = p.x, y = p.y + bob, r = p.r * s
          // aura glow
          const gr = sg.createRadialGradient(x, y, r * 0.6, x, y, r * (2.4 + 1.5 * flare))
          gr.addColorStop(0, p.c + 'aa'); gr.addColorStop(0.4, p.c + '44'); gr.addColorStop(1, p.c + '00')
          sg.globalAlpha = skyA; sg.fillStyle = gr; sg.beginPath(); sg.arc(x, y, r * (2.4 + 1.5 * flare), 0, 6.283); sg.fill()
          // face
          const im = faces[i]
          if (im.naturalWidth) {
            sg.save(); sg.beginPath(); sg.arc(x, y, r, 0, 6.283); sg.clip()
            const iw = im.naturalWidth, ih = im.naturalHeight, k = (2 * r) / Math.min(iw, ih) * 1.25
            sg.drawImage(im, x - iw * k / 2, y - ih * k * 0.42, iw * k, ih * k)
            sg.restore()
          }
          sg.strokeStyle = `rgba(255,240,214,${0.85 * skyA})`; sg.lineWidth = 2; sg.beginPath(); sg.arc(x, y, r + 3, 0, 6.283); sg.stroke()
          if (flare > 0) { sg.globalAlpha = flare * skyA; sg.strokeStyle = p.c; sg.lineWidth = 2; sg.beginPath(); sg.arc(x, y, r + 6 + 30 * (1 - flare), 0, 6.283); sg.stroke() }
          // little pixel sparkle on its rim
          sg.globalAlpha = skyA * (0.5 + 0.5 * Math.sin(t * 3 + i * 2))
          pixelStar(sg, x + r * 0.78, y - r * 0.78, 3, 1, BONE)
          sg.globalAlpha = 1
        })

        // ── city: twinkling windows, beacon, freeway lights ──
        cg.clearRect(0, 0, W, H)
        for (const w of WINDOWS) if (w.flick && w.y < 1655) {
          const on = Math.sin(w.ph + fi * 0.07) > -0.2
          if (!on) continue
          cg.fillStyle = w.warm ? 'rgba(255,224,170,0.95)' : 'rgba(230,220,255,0.85)'; cg.fillRect(w.x, w.y, 2, 3)
        }
        const bcn = SKYLINE.find((b) => b.beacon).beacon
        const ba = (t * 1.6) % 1, bl = Math.pow(Math.max(0, Math.cos(ba * 6.283)), 6)
        cg.save(); cg.translate(bcn[0], bcn[1])
        const bgr = cg.createRadialGradient(0, 0, 0, 0, 0, 60)
        bgr.addColorStop(0, `rgba(255,236,200,${0.25 + 0.6 * bl})`); bgr.addColorStop(1, 'rgba(255,236,200,0)')
        cg.fillStyle = bgr; cg.beginPath(); cg.arc(0, 0, 60, 0, 6.283); cg.fill()
        const dir = Math.sin(ba * 6.283) * 1
        cg.globalAlpha = 0.18 * (0.4 + 0.6 * Math.abs(Math.cos(ba * 6.283)))
        cg.fillStyle = '#ffe9c8'; cg.beginPath(); cg.moveTo(0, 0); cg.lineTo(dir * -900, -60); cg.lineTo(dir * -900, 40); cg.closePath(); cg.fill()
        cg.globalAlpha = 1; cg.fillStyle = '#fff3e0'; cg.fillRect(-2, -2, 4, 4)
        cg.restore()
        // freeway car lights (two lanes)
        for (let k = 0; k < 22; k++) {
          const r = rng(900 + k), sp = 120 + r() * 80, dirn = k % 2 ? 1 : -1
          const x = ((r() * 1300 + dirn * sp * t) % 1300 + 1300) % 1300 - 110
          cg.fillStyle = dirn > 0 ? 'rgba(255,90,80,0.9)' : 'rgba(255,240,210,0.95)'
          cg.fillRect(x, dirn > 0 ? 1815 : 1819, 10, 2)
          cg.fillStyle = dirn > 0 ? 'rgba(255,90,80,0.25)' : 'rgba(255,240,210,0.22)'
          cg.fillRect(x - dirn * 28, dirn > 0 ? 1815 : 1819, 28, 2)
        }

        // ── type + counter ──
        hook.update(t, 4.7)
        const cO = ease.outQuad(prog(t, 0.6, 0.9)) * (1 - prog(t, 4.95, 5.3))
        ctr.style.opacity = String(cO)
        ctrN.textContent = String(n).padStart(3, '0')
        ctrN.style.color = n >= COUNT.n ? '#ffe6a8' : BONE
        ctrN.style.textShadow = n >= COUNT.n ? `0 0 ${24 * (1 - prog(t, COUNT.b, COUNT.b + 0.8)) + 10}px rgba(242,199,92,0.6)` : 'none'

        // ── card stamp ──
        dim.style.opacity = String(ease.inOutQuad(prog(t, 5.1, STAMP.hit)) * 0.9)
        const dq = prog(t, STAMP.a, STAMP.hit)
        if (t < STAMP.a) card.style.opacity = '0'
        else {
          card.style.opacity = String(Math.min(1, prog(t, STAMP.a, STAMP.a + 0.1)))
          const fall = ease.inCubic(dq)
          const settle = t < STAMP.hit ? 0 : prog(t, STAMP.hit, STAMP.hit + 0.6)
          const bounce = t < STAMP.hit ? 0 : -0.035 * Math.sin(Math.PI * Math.min(1, settle * 1.6)) * (1 - settle)
          const sc = lerp(1.9, 1, fall) + bounce + 0.012 * Math.sin((t - STAMP.hit) * 1.4) * prog(t, STAMP.hit + 0.4, STAMP.hit + 1.2)
          const rot = t < STAMP.hit ? lerp(-9, -2.5, fall) : lerp(-2.5, 0, ease.spring(settle, 0.2))
          const fy = t > STAMP.hit + 0.5 ? Math.sin((t - STAMP.hit - 0.5) * 1.2) * 6 : 0
          card.style.transform = `translate(${sx * 0.4}px, ${fy}px) rotate(${rot}deg) scale(${sc})`
          card.style.filter = `blur(${lerp(6, 0, ease.outQuad(prog(t, STAMP.a, STAMP.hit - 0.05)))}px) drop-shadow(0 30px 50px rgba(4,2,14,0.6))`
        }
        cglow.style.opacity = String(t < STAMP.hit ? 0 : (0.75 + 0.6 * (1 - ease.outQuad(prog(t, STAMP.hit, STAMP.hit + 0.6)))) * (1 - prog(t, END - 0.3, END)))
        shadow.style.opacity = String(ease.outQuad(prog(t, STAMP.a + 0.1, STAMP.hit)) * 0.9 * (1 - prog(t, END - 0.2, END)))
        flashC.style.opacity = String(t < STAMP.hit ? 0 : 0.85 * (1 - ease.outQuad(prog(t, STAMP.hit, STAMP.hit + 0.4))))
        const gp = prog(t, FOIL.a, FOIL.b), gp2 = prog(t, 8.6, 9.05)
        const g = gp > 0 && gp < 1 ? gp : gp2
        foilBox.style.opacity = g > 0 && g < 1 ? String(Math.sin(Math.PI * g) * (gp2 > 0 ? 0.55 : 1)) : '0'
        foil.style.transform = `translateX(${lerp(-320, BODY.w + 120, ease.inOutCubic(g))}px) skewX(-22deg)`
        line2.update(t - LINE2, END - 0.3 - LINE2)
        tag.update(t)
      },
      fx(ctx, t) {
        const a = 1 - prog(t, END - 0.3, END)
        if (a <= 0) return
        starField(ctx, t, { seed: 18, sprites: 10, dots: 24, alpha: 0.6 * a, keepOut: t > STAMP.a ? [[80, 220, 920, 420], [220, 500, 640, 900], [180, 1380, 720, 260]] : [[80, 220, 920, 420]] })
        // impact: shockwave ring + sparks thrown off the card's edge
        const q = prog(t, STAMP.hit, STAMP.hit + 0.7)
        if (q > 0 && q < 1) {
          ctx.globalCompositeOperation = 'lighter'
          ctx.save(); ctx.translate(W / 2, 930); ctx.scale(1, 1.25)
          ctx.strokeStyle = `rgba(255,228,170,${0.55 * (1 - q)})`; ctx.lineWidth = 6 * (1 - q) + 1
          ctx.beginPath(); ctx.arc(0, 0, 380 + 520 * ease.outCubic(q), 0, 6.283); ctx.stroke()
          ctx.restore()
          const r = rng(5150)
          for (let k = 0; k < 26; k++) {
            const ang = r() * 6.283, sp = 0.6 + r() * 0.6, d = 0.95 + ease.outCubic(q) * sp * 0.9
            const x = W / 2 + Math.cos(ang) * 300 * d, y = 930 + Math.sin(ang) * 400 * d
            ctx.globalAlpha = (1 - q) * a
            pixelStar(ctx, x, y, r() < 0.5 ? 4 : 3, Math.floor(r() * 3), r() < 0.6 ? GOLD : BONE)
          }
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
        }
        // foil glints on the card corners during the sweep
        const gq = prog(t, FOIL.a + 0.2, FOIL.b + 0.25)
        if (gq > 0 && gq < 1) {
          const pts = [[W / 2 + 250, 600], [W / 2 - 220, 1250], [W / 2 + 120, 1000]]
          pts.forEach(([x, y], k) => { const s = Math.sin(Math.PI * clamp(gq * 1.6 - k * 0.25)); if (s > 0) { ctx.globalAlpha = s * a; pixelStar(ctx, x, y, 5, 0, '#ffe6a8', '#fffaf0') } })
          ctx.globalAlpha = 1
        }
      },
    }
  },
}
