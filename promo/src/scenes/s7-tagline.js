import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../lib.js'
import { W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks } from "./common.js"

// ──────────────────────────────────────── S7 · gradient tagline + payoff beats
// Timing (sound): colour rises 22.40–23.00 · ticks + typing 22.56, perChar 0.016, fade 0.12
// (complete ~23.08, held to 24.14) · tagline out 24.14–24.26 (gone) ·
// beat A  match phone fades in 24.26–24.38, lands/settles ~24.70 · caption A pops 24.26 (full 24.38, out 25.47–25.61) ·
// beat B  swap 25.45: match phone exits left (to ~25.85); chat phone enters 25.53, lands ~25.98 ·
//         caption B pops 25.62 (full 25.74) · exit is main.js stair wipe 26.58–26.94.
// Constellation of people: 13 aura portraits light up as stars around the tagline, one every 0.085s
//   from 22.66 (pop k at 22.66 + k*0.085 → last 23.68; each blooms over ~0.28s, peak glow +0.14) ·
//   15 constellation lines draw (0.24s each) 0.12s after both ends are lit: starts 23.12, 23.205×2, 23.29,
//   23.375, 23.46×2, 23.545×2, 23.63×2, 23.715×2, 23.80×2 (last lands 24.04) ·
//   joint sparkles glint on each line's completion · 23.98–24.16 lines retract · 24.02–24.45 portraits
//   drift toward the landing match phone and dim into stars; 3 survivors glide to small floating
//   orbs (settled ~24.70) that stay around the phones until the wipe.
const T_TYPE = 22.56, PER = 0.016, T_OUT = 24.14, OUT_D = 0.12
const T_A = 24.26, T_A_END = 24.7
const T_SW = 25.45, T_B0 = 25.53, T_B_END = 25.98
const CAP_A = 24.26, CAP_A_OUT = 25.47, CAP_B = 25.62

const PH = 880, PW = Math.round(PH * 1170 / 2532) // 407
const AX = 690, BX = 1280 // resting phone centres

export function sceneTagline(stage, assets) {
  // transparent root: s6's blurring deck stays visible underneath while the nebula blooms up from below
  const root = fill(stage, { background: 'transparent' })
  // ── deep-space field (shared 'aurora' mood) + S7's own aurora band and galaxy arc, all inside one
  //    layer that is revealed by a soft mask rising from the bottom (22.40–23.00)
  const sky = fill(root, { background: 'transparent', overflow: 'hidden' })
  const space = spaceBackdrop(sky, 'aurora', { seed: 7, grain: 0.2, stars: 190 })
  // galaxy arc: a faint tilted spiral-arm of dust + stars sweeping over the top-left, prerendered once
  const GA = el('canvas', { position: 'absolute', left: '-240px', top: '-240px', width: (W + 480) + 'px', height: (H + 480) + 'px', mixBlendMode: 'screen', transformOrigin: '50% 60%' }, sky)
  GA.width = W + 480; GA.height = H + 480
  {
    const g = GA.getContext('2d'), r = rng(7707)
    const gx = (W + 480) * 0.52, gy = (H + 480) * 1.08, RX = 1500, RY = 760, ROT = -0.16
    const at = (a, off) => {
      const x = Math.cos(a) * (RX + off), y = Math.sin(a) * (RY + off * 0.5)
      return [gx + x * Math.cos(ROT) - y * Math.sin(ROT), gy + x * Math.sin(ROT) + y * Math.cos(ROT)]
    }
    const A0 = Math.PI * 1.06, A1 = Math.PI * 1.94
    // soft dust lane (wide, faint, warm→rose→violet along the arc)
    for (let k = 0; k < 340; k++) {
      const u = k / 339, a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u)
      const [x, y] = at(a, (r() - 0.5) * 70)
      const col = u < 0.5 ? [lerp(242, 232, u * 2), lerp(170, 98, u * 2), lerp(120, 160, u * 2)] : [lerp(232, 170, u * 2 - 1), lerp(98, 120, u * 2 - 1), lerp(160, 255, u * 2 - 1)]
      const rad = 90 + r() * 70
      const gr = g.createRadialGradient(x, y, 0, x, y, rad)
      gr.addColorStop(0, `rgba(${col.map(Math.round)},${0.05 * fade})`); gr.addColorStop(1, `rgba(${col.map(Math.round)},0)`)
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 6.29); g.fill()
    }
    // star dust concentrated on the arm
    for (let k = 0; k < 1400; k++) {
      const u = r(), a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u)
      const off = (r() + r() + r() - 1.5) * 120
      const [x, y] = at(a, off)
      const s = r() < 0.06 ? 1.6 : 0.4 + r() * 0.8
      g.fillStyle = `rgba(255,244,230,${(0.18 + r() * 0.55) * fade * (1 - Math.abs(off) / 220)})`
      g.beginPath(); g.arc(x, y, s, 0, 6.29); g.fill()
    }
  }
  // aurora band: three long luminous ribbons behind the tagline, drifting and breathing
  const RIB = [
    { c: ['232,98,138', '180,92,255'], y: 0.47, h: 300, a: 0.55, rot: -7, sp: 0.35 },
    { c: ['180,92,255', '120,120,255'], y: 0.55, h: 240, a: 0.5, rot: 5, sp: 0.28 },
    { c: ['242,154,74', '232,98,138'], y: 0.62, h: 180, a: 0.38, rot: -3, sp: 0.42 },
  ].map((b, i) => ({ ...b, ph: i * 2.1, e: el('div', { position: 'absolute', left: '-300px', width: (W + 600) + 'px', height: b.h + 'px', marginTop: -b.h / 2 + 'px', top: b.y * H + 'px', borderRadius: '50%', mixBlendMode: 'screen', filter: 'blur(26px)',
    background: `radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, rgba(${b.c[0]},0) 0%, rgba(${b.c[0]},${b.a}) 22%, rgba(${b.c[1]},${b.a}) 62%, rgba(${b.c[1]},0) 100%)`,
    WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%)', maskImage: 'radial-gradient(50% 50% at 50% 50%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%)' }, sky) }))
  // the bloom: a few hot nebula blobs that surge up from below during the entrance, then settle as glow
  const BLOOM = [
    { c: '232,98,138', x: 0.30, r: 760, a: 0.7, y1: 1.02 },
    { c: '180,92,255', x: 0.70, r: 820, a: 0.7, y1: 0.98 },
    { c: '242,154,74', x: 0.52, r: 560, a: 0.5, y1: 1.10 },
  ].map((b, i) => ({ ...b, i, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
    background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.4}) 48%, rgba(${b.c},0) 100%)` }, sky) }))
  // dark scrim right behind the tagline so bone type keeps ≥7:1 against the band
  const tScrim = el('div', { position: 'absolute', left: (W / 2 - 760) + 'px', top: (H / 2 - 190) + 'px', width: '1520px', height: '380px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.72), rgba(11,6,32,0.5) 50%, rgba(11,6,32,0) 100%)', opacity: 0 }, sky)

  const TS = 80
  const tag = new TypeLine(root, 'Dating, dealt by the stars', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: TS + 'px', letterSpacing: '-0.02em', lineHeight: 1,
    textShadow: '0 2px 34px rgba(46,16,96,0.5), 0 1px 3px rgba(40,10,80,0.35)',
  }, { perChar: PER, fade: 0.12, final: '#fff6ea', accent: ['#ffffff', '#ffe3c4', '#ecdcff'] })
  const ticks = new Ticks(root, C.ink, 16)
  let tagW = 0

  // ── constellation of people (canvas: field stars + hairlines + pixel sparkles; DOM: portraits)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx2 = cv.getContext('2d')
  const SRC = [...PEOPLE, IMG + 'juniper.jpg', IMG + 'hakeem.jpg']
  // [x, y, diameter, photo index]; tagline + ticks occupy ~x 400–1520, y 465–615 — nodes stay well outside
  const NODES = [
    [250, 250, 104, 12], [530, 160, 84, 0], [810, 300, 74, 4], [1090, 150, 110, 2], [1370, 285, 82, 8], [1660, 190, 100, 6],
    [1770, 545, 90, 13], [1640, 880, 84, 9], [1330, 940, 100, 1], [1010, 815, 78, 5], [690, 935, 96, 10], [370, 845, 86, 3],
    [150, 560, 92, 7], [520, 720, 0, -1],
  ].filter(n => n[3] >= 0)
  const N_ORDER = [3, 0, 8, 5, 10, 1, 6, 11, 4, 12, 7, 2, 9] // lighting order (index into NODES)
  const T_POP = 22.66, POP_STEP = 0.085, POP_D = 0.28
  const popT = []; N_ORDER.forEach((n, k) => { popT[n] = T_POP + k * POP_STEP })
  const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [1, 3], [8, 10]]
  const LINE_D = 0.24
  const edges = EDGES.map(([a, b]) => ({ a, b, t0: Math.max(popT[a], popT[b]) + 0.12 }))
  // survivors: [node, x, y, d] — small floating orbs clear of both phones' captions
  const SURV = [[5, 1730, 170, 66], [7, 1745, 905, 60], [11, 255, 890, 62]]
  const T_GO = 24.02, GO_D = 0.34
  const nodes = NODES.map(([x, y, d, pi], i) => {
    const g = el('div', { position: 'absolute', left: 0, top: 0, width: '100px', height: '100px', marginLeft: '-50px', marginTop: '-50px', borderRadius: '50%', opacity: 0, willChange: 'transform' }, root)
    const glowE = el('div', { position: 'absolute', inset: '-38%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,246,234,0.85), rgba(214,190,255,0.45) 45%, rgba(214,190,255,0) 100%)' }, g)
    const disc = el('div', { position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: C.canvas, boxShadow: '0 10px 26px rgba(40,10,80,0.35), 0 0 0 1.5px rgba(239,230,214,0.95), 0 0 0 4px rgba(239,230,214,0.18)' }, g)
    img(disc, SRC[pi], { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pi === 13 ? '50% 30%' : '50% 40%', transform: 'scale(1.28)', transformOrigin: '50% 42%' })
    const sv = SURV.find(s => s[0] === i)
    return { x, y, d, g, glowE, sv, ph: (i * 1.37) % 6.28 }
  })
  // field stars: tiny bone/white pixel twinkles over the gradient (deterministic)
  const fr = rng(4207)
  const FIELD = Array.from({ length: 70 }, () => {
    let x, y
    do { x = fr() * W; y = fr() * H } while (x > 360 && x < 1560 && y > 430 && y < 650)
    return { x, y, u: fr() < 0.22 ? 3 : 2, t0: 22.55 + fr() * 1.3, ph: fr() * 6.28, sp: 1.5 + fr() * 2.5, a: 0.45 + fr() * 0.5 }
  })
  function pix(x, y, u, a, col, big) {
    if (a <= 0.003) return
    x = Math.round(x); y = Math.round(y)
    cx2.fillStyle = `rgba(${col},${a})`
    cx2.fillRect(x - u / 2, y - u / 2, u, u)
    cx2.fillStyle = `rgba(${col},${a * 0.75})`
    cx2.fillRect(x - u / 2, y - u * 1.5, u, u); cx2.fillRect(x - u / 2, y + u / 2, u, u)
    cx2.fillRect(x - u * 1.5, y - u / 2, u, u); cx2.fillRect(x + u / 2, y - u / 2, u, u)
    if (big) {
      cx2.fillStyle = `rgba(${col},${a * 0.4})`
      cx2.fillRect(x - u / 2, y - u * 2.5, u, u); cx2.fillRect(x - u / 2, y + u * 1.5, u, u)
      cx2.fillRect(x - u * 2.5, y - u / 2, u, u); cx2.fillRect(x + u * 1.5, y - u / 2, u, u)
    }
  }
  // node position at time t (drift, pull toward the match phone, survivors' glide)
  function nodeState(n, i, t) {
    const lit = ease.outCubic(prog(t, popT[i], popT[i] + POP_D))
    const go = ease.inOutCubic(prog(t, T_GO + (i % 4) * 0.03, T_GO + GO_D + (i % 4) * 0.03))
    let x = n.x + Math.sin(t * 0.7 + n.ph) * 6, y = n.y + Math.cos(t * 0.6 + n.ph) * 5
    let d = n.d, op = lit, s = lerp(0.35, 1, ease.outBack(prog(t, popT[i], popT[i] + POP_D)))
    if (n.sv) {
      const [, sx, sy, sd] = n.sv
      const fx = sx + Math.sin(t * 0.9 + n.ph) * 8, fy = sy + Math.cos(t * 0.75 + n.ph) * 10
      x = lerp(x, fx, go); y = lerp(y, fy, go); d = lerp(n.d, sd, go)
      op = lit * lerp(1, 0.92, go)
    } else {
      // pulled toward the phone's landing point, shrinking into a star
      x = lerp(x, lerp(x, AX, 0.18), go); y = lerp(y, lerp(y, H / 2, 0.18), go)
      s *= lerp(1, 0.12, go); op = lit * (1 - ease.inQuad(go))
    }
    return { x, y, d, op, s, go, lit }
  }

  // phones in perspective; handles + sparks live inside each phone's transform
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, root)
  const aura = el('div', { position: 'absolute', left: (AX - 460) + 'px', top: (H / 2 - 560) + 'px', width: '920px', height: '1120px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,190,255,0.9), rgba(180,120,255,0.4) 55%, rgba(180,92,255,0) 100%)', opacity: 0, zIndex: 1 }, persp)
  function phone(src, z, sparkPos) {
    const g = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, zIndex: z, willChange: 'transform' }, persp)
    const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas, boxShadow: '0 60px 120px rgba(40,10,70,0.5), 0 18px 40px rgba(40,10,70,0.3), 0 0 0 1.5px rgba(255,255,255,0.35)' }, g)
    img(scr, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
    const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 8) + 'px', top: (y * PH - 8) + 'px', width: '16px', height: '16px', background: C.ink, boxShadow: '0 0 0 2px rgba(255,250,242,0.9)', opacity: 0 }, g))
    // small gold ✦ accents just outside the screen edge (never over the UI)
    const sp = sparkPos.map(([x, y, s]) => el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px', textAlign: 'center', lineHeight: '60px', fontSize: s + 'px', color: C.gold, textShadow: '0 0 16px rgba(242,199,92,0.9), 0 0 3px rgba(120,60,10,0.6)', opacity: 0 }, g, '✦'))
    return { g, hs, sp }
  }
  const pA = phone(A + 'screen-match.png', 3, [[-64, PH * 0.2, 44], [PW + 54, PH * 0.72, 32]])
  const pB = phone(A + 'screen-chat-cards.png', 4, [[PW + 60, PH * 0.16, 44], [-56, PH * 0.8, 32]])

  function caption(x, align, eyebrow, line, scrim) {
    const box = el('div', { position: 'absolute', top: (H / 2 - 74) + 'px', [align]: x + 'px', textAlign: align, opacity: 0, zIndex: 6, isolation: 'isolate' }, root)
    el('div', { position: 'absolute', left: '-330px', right: '-330px', top: '-140px', bottom: '-140px', background: `radial-gradient(closest-side, ${[[0, 1], [25, 0.95], [48, 0.76], [66, 0.48], [82, 0.2], [100, 0]].map(([o, k]) => `rgba(44,14,88,${(scrim * k).toFixed(3)}) ${o}%`).join(', ')})`, zIndex: -1 }, box)
    el('div', { fontFamily: MONO, fontSize: '30px', letterSpacing: '0.22em', color: 'rgba(255,246,234,0.92)', textShadow: '0 0 16px rgba(36,10,76,0.75), 0 0 5px rgba(36,10,76,0.55)', marginBottom: '14px' }, box, eyebrow)
    el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '78px', lineHeight: 1.05, color: '#fff6ea', whiteSpace: 'nowrap', textShadow: '0 0 26px rgba(36,10,76,0.7), 0 0 8px rgba(36,10,76,0.55), 0 2px 3px rgba(30,8,60,0.45)' }, box, line)
    return box
  }
  const capA = caption(AX + PW / 2 + 120, 'left', 'IT’S MUTUAL', 'You both aligned.', 0.56)
  const capB = caption(W - (BX - PW / 2 - 110), 'right', 'THE TALK DECK', 'Then you talk in cards.', 0.62)

  function capStyle(box, t, t0, t1, dir) {
    const i = ease.outCubic(prog(t, t0, t0 + 0.28))
    const o = ease.inQuad(prog(t, t1, t1 + 0.14))
    box.style.opacity = String(Math.min(prog(t, t0, t0 + 0.12), 1 - o))
    box.style.transform = `translateX(${lerp(36 * dir, 0, i) - 40 * dir * o}px)`
  }

  return {
    start: 22.4, end: 27.0, root,
    update(t) {
      under.style.opacity = String(ease.inOutQuad(prog(t, 22.42, 22.62)))
      const rise = lerp(900, 0, ease.outCubic(prog(t, 22.4, 23.0)))
      blobs.forEach((b, i) => {
        const x = b.x * W + Math.sin(t * 0.6 + i * 1.7) * 90 - b.r
        const y = b.y * H + Math.cos(t * 0.5 + i) * 60 - b.r + rise * (1 + i * 0.04)
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
      wash.style.opacity = String(prog(t, 22.5, 22.9))

      // tagline
      if (!tagW) tagW = tag.root.offsetWidth
      tag.update(t - T_TYPE)
      const tOut = ease.inQuad(prog(t, T_OUT, T_OUT + OUT_D))
      tag.root.style.opacity = String(1 - tOut)
      tag.root.style.transform = `translate(-50%, calc(-50% - ${tOut * 40}px))`
      // ticks sit at full width from the first frame (letters never outside them); only height/opacity animate
      const to = ease.outCubic(prog(t, T_TYPE - 0.03, T_TYPE + 0.4))
      ticks.update(W / 2, H / 2 - tOut * 40, tagW + 120, lerp(96, 150, to), prog(t, T_TYPE - 0.03, T_TYPE + 0.05) * (1 - tOut))

      // ── constellation
      cx2.clearRect(0, 0, W, H)
      const st = NODES.map((_, i) => nodeState(nodes[i], i, t))
      FIELD.forEach(f => {
        const a = f.a * ease.outQuad(prog(t, f.t0, f.t0 + 0.4)) * (0.55 + 0.45 * Math.sin(t * f.sp + f.ph))
        pix(f.x, f.y, f.u, a, '255,250,242', false)
      })
      const retract = ease.inQuad(prog(t, 23.98, 24.16))
      cx2.lineCap = 'round'
      edges.forEach(e => {
        const p = ease.inOutCubic(prog(t, e.t0, e.t0 + LINE_D)) * (1 - retract)
        if (p <= 0) return
        const A_ = st[e.a], B_ = st[e.b]
        const dx = B_.x - A_.x, dy = B_.y - A_.y, L = Math.hypot(dx, dy)
        const ra = A_.d / 2 + 10, rb = B_.d / 2 + 10
        const x0 = A_.x + dx / L * ra, y0 = A_.y + dy / L * ra
        const len = (L - ra - rb) * p
        const x1 = x0 + dx / L * len, y1 = y0 + dy / L * len
        // soft violet underlay so a bone hairline still reads on the pastel field
        cx2.strokeStyle = 'rgba(70,30,130,0.26)'; cx2.lineWidth = 5
        cx2.beginPath(); cx2.moveTo(x0, y0); cx2.lineTo(x1, y1); cx2.stroke()
        cx2.strokeStyle = 'rgba(255,248,236,0.96)'; cx2.lineWidth = 2
        cx2.beginPath(); cx2.moveTo(x0, y0); cx2.lineTo(x1, y1); cx2.stroke()
        // drawing head glint, then a joint sparkle at the far end when the line lands
        if (p < 1) pix(x1, y1, 3, 0.9 * p, '255,250,242', false)
        const land = prog(t, e.t0 + LINE_D - 0.04, e.t0 + LINE_D + 0.1) * (1 - prog(t, e.t0 + LINE_D + 0.1, e.t0 + LINE_D + 0.7) * 0.55) * (1 - retract)
        if (land > 0) pix(x0 + dx / L * (L - ra - rb), y0 + dy / L * (L - ra - rb), 4, land, '255,226,160', true)
      })
      nodes.forEach((n, i) => {
        const S = st[i]
        n.g.style.opacity = String(S.op)
        n.g.style.transform = `translate(${S.x}px, ${S.y}px) scale(${S.s * S.d / 100})`
        // a bright bloom as each one lights, settling to a soft halo
        n.glowE.style.opacity = String(tw(t, [[popT[i], 0], [popT[i] + 0.14, 1, ease.outQuad], [popT[i] + 0.6, 0.5, ease.inOutQuad]]) * (0.85 + 0.15 * Math.sin(t * 2.3 + n.ph)))
        // ring sparkle on each portrait (upper right), twinkling
        const sa = S.op * (0.5 + 0.5 * Math.sin(t * 3 + n.ph * 2)) * (n.sv ? 1 : 1 - S.go)
        pix(S.x + S.d * 0.36, S.y - S.d * 0.36, n.sv && S.go > 0.5 ? 2 : 3, sa, '255,250,242', !n.sv || S.go < 0.5)
        // the dimmed ones leave a star where they vanish
        if (!n.sv && S.go > 0) {
          const k = Math.sin(Math.PI * clamp(S.go * 1.4 - 0.2, 0, 1))
          pix(S.x, S.y, 3, 0.95 * k, '255,240,214', true)
        }
      })

      // ── beat A: match phone falls into place
      const La = ease.outQuart(prog(t, T_A, T_A_END + 0.1)), Sa = ease.spring(prog(t, T_A, T_A_END + 0.3), 0.04)
      const hold = Math.sin((t - T_A) * 1.6)
      const Xa = ease.inOutCubic(prog(t, T_SW, T_SW + 0.4))
      const ax = lerp(AX, -520, Xa)
      const sA = lerp(0.7, 1, Sa) * (1 + 0.012 * prog(t, T_A_END, T_SW)) * lerp(1, 0.9, Xa)
      const rxA = lerp(26, 3, La) + 0.8 * hold
      const ryA = lerp(-26, -6, La) + 1.2 * Math.sin((t - T_A) * 1.1) + 22 * Xa
      const rzA = lerp(-8, -1.2, La) - 4 * Xa
      const tyA = lerp(220, 0, La) + 5 * hold
      pA.g.style.opacity = String(ease.outQuad(prog(t, T_A, T_A + 0.12)))
      pA.g.style.transform = `translate(${ax}px, ${tyA}px) rotateX(${rxA}deg) rotateY(${ryA}deg) rotateZ(${rzA}deg) scale(${sA})`
      const hA = prog(t, T_A_END - 0.06, T_A_END + 0.04) * (1 - prog(t, T_SW, T_SW + 0.1))
      pA.hs.forEach(h => { h.style.opacity = String(hA) })
      pA.sp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_A_END + i * 0.1, T_A_END + 0.2 + i * 0.1) * (1 - prog(t, T_SW, T_SW + 0.12)) * tw_)
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_A) * 40 * (i ? -1 : 1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_A_END + i * 0.1, T_A_END + 0.3 + i * 0.1)))})`
      })
      const bloom = tw(t, [[T_A + 0.2, 0], [T_A + 0.42, 1, ease.outQuad], [T_A + 1.0, 0.35, ease.inOutQuad]])
      aura.style.opacity = String(bloom * (1 - Xa))
      aura.style.transform = `translateX(${ax - AX}px) scale(${lerp(0.85, 1.08, bloom)})`
      capStyle(capA, t, CAP_A, CAP_A_OUT, 1)

      // ── beat B: talk cards in chat slide in from the right and settle
      const Lb = ease.outCubic(prog(t, T_B0, T_B_END))
      const Sb = ease.outQuart(prog(t, T_B0 + 0.1, T_B_END + 0.1))
      const holdB = Math.sin((t - T_B0) * 1.5)
      const bx = lerp(W + PW + 260, BX, Lb)
      const sB = lerp(0.8, 1, Sb) * (1 + 0.012 * prog(t, T_B_END, 26.9))
      const ryB = lerp(-30, 6, Lb) + 1.2 * Math.sin((t - T_B0) * 1.1)
      const rxB = lerp(10, 3, Sb) + 0.8 * holdB
      const rzB = lerp(7, 1.2, Lb)
      const tyB = lerp(140, 0, Sb) + 5 * holdB
      pB.g.style.opacity = String(ease.outQuad(prog(t, T_B0, T_B0 + 0.12)))
      pB.g.style.transform = `translate(${bx}px, ${tyB}px) rotateX(${rxB}deg) rotateY(${ryB}deg) rotateZ(${rzB}deg) scale(${sB})`
      const hB = prog(t, T_B_END - 0.06, T_B_END + 0.04)
      pB.hs.forEach(h => { h.style.opacity = String(hB) })
      pB.sp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_B_END + i * 0.1, T_B_END + 0.2 + i * 0.1) * tw_)
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_B0) * 40 * (i ? 1 : -1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_B_END + i * 0.1, T_B_END + 0.3 + i * 0.1)))})`
      })
      capStyle(capB, t, CAP_B, 99, -1)
    },
  }
}
