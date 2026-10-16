// G2 · THE BREAK (3.4–6.2). Picks up g1's last cold face card (H1: p7, centre 960,520, 440×702, r22, mono "SCORE 6.2"
// tag under it). 3.42–3.65 the rigged machine glitches: RGB split, scanline tears (the colour sky leaks through the tears),
// the score scrambles to "NOT SHOWN". Until the break g2 paints NO backdrop (only card, tag, glitch; transparent elsewhere)
// over g1's frozen backdrop, which stays up to 3.70. 3.667 the card + tag SHATTER into tiles that burn into pixel stars and
// the colour flood goes opaque over everything (dark sky + feathered over-exposed radial wipe from the centre), moon fades
// on, grain eases 0.58 → 0.5. Cold face cards are then dealt
// UP from below the frame by an unseen dealer, flip mid-flight into veiled mystery cards and land as a fanned hand across
// the sky, with a slow push-in (1.0 → 1.05). Copy: "DEALT BY THE STARS" → "Align deals blind." (fully on ~4.74–5.8).
// 5.2–5.75 the hand is swept off and Juniper's card (card-profile-3) settles to H2: body centre (960,520), body height 620, upright, still from 6.0.
import { clamp, lerp, prog, ease, rng, el, C, PIXEL_PALETTE, TypeLine } from '../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { drawSky3, drawGrain, grainOpacity } from '../sky.js'

const START = 3.4, END = 6.2
const GL0 = 3.42                      // glitch starts (over g1's frozen backdrop)
const BREAK = 110 / 30                // 3.6667 — first shatter frame, flood opaque from here
const FLOOD = 0.38                    // nebula radial wipe length
const BONE = '#efe6d6'
// H1 card + tag
const H1 = { x: 960, y: 520, w: 440, h: 702, r: 22, tagY: 520 + 351 + 22 + 25.5 }   // = g1's H1 (tag top = card bottom + 22, 51px tall)
// H2
const H2 = { x: 960, y: 520, h: 620 }
// hand
const DEAL0 = 3.74, DEAL_STEP = 0.065, FLY = 0.58
const SWEEP0 = 5.2, SWEEP1 = 5.74, JUN0 = 5.18, JUN1 = 6.0
const PUSH0 = 4.2, PUSH1 = 5.9          // slow push-in on the dealt arc, 1.0 → 1.05 about the H2 centre
const COPY = { eye: 4.0, line: 4.1, out0: 5.8, out1: 5.95 }

// card art: PNG size + opaque body box [l, t, r, b]
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116] }
const ART = { p1: 'card-profile-1.png', p2: 'card-profile-2.png', p3: 'card-profile-3.png', p4: 'card-profile-4.png', p5: 'card-profile-5.png', p6: 'card-profile-6.png' }
const HUE = { p1: 40 }
// the hand, left → right (Juniper in the middle)
const HAND = (() => {
  const r = rng(3310), arts = ['p5', 'p1', 'p4', 'p3', 'p2', 'p6', 'p1h'], faces = [3, 9, 1, 12, 5, 11, 4]
  return arts.map((art, i) => {
    const k = i - 3, isJ = k === 0
    return {
      i, art, isJ, face: faces[i],
      x: 960 + k * 236, y: 400 + k * k * 11, h: isJ ? 350 : 318, rot: k * 0.085,
      // dealt from below the frame: Juniper first, straight up the middle; the rest come in from the lower corners
      // (outside the caption column), alternating left / right, inside → out
      x0: isJ ? 960 : 960 + Math.sign(k) * (720 + Math.abs(k) * 110), y0: isJ ? 1320 : 1240 + r() * 80, roll0: isJ ? 0.25 : Math.sign(k) * (0.35 + r() * 0.4),
      td: DEAL0 + (isJ ? 0 : 2 * Math.abs(k) - (k < 0 ? 1 : 0)) * DEAL_STEP, ph: r() * 6.28,
      out: isJ ? null : { dx: k < 0 ? -1 : 1, v: 1.0 + r() * 0.4, d: (3 - Math.abs(k)) * 0.04 },
    }
  })
})()

// ── pixel-art star sprites (as f2)
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}
const HOT = '#fff3e0', STAR_PAL = [BONE, BONE, C.gold, '#c9a6ff', '#ff8fb1', ...PIXEL_PALETTE]

// ── shatter: the card in 10×16 tiles (+ the tag in 6), each throws a pixel star
const TILE = 44
const TILES = (() => {
  const r = rng(6262), out = []
  for (let ty = 0; ty < 16; ty++) for (let tx = 0; tx < 10; tx++) {
    const lx = -H1.w / 2 + tx * TILE + TILE / 2, ly = -H1.h / 2 + ty * TILE * 702 / 704 + TILE / 2
    const a = Math.atan2(ly, lx) + (r() - 0.5) * 0.7
    out.push({ sx: tx * TILE, sy: ty * TILE, sw: TILE, sh: Math.min(TILE, H1.h - ty * TILE), lx, ly, a, v: 380 + r() * 900 * (0.5 + Math.hypot(lx, ly) / 420),
      spin: (r() - 0.5) * 9, life: 0.2 + r() * 0.22, tag: false })
  }
  for (let k = 0; k < 6; k++) out.push({ tag: true, k, lx: -120 + k * 48, ly: H1.tagY - H1.y, a: Math.PI / 2 + (r() - 0.5) * 1.6, v: 300 + r() * 700, spin: (r() - 0.5) * 10, life: 0.3 + r() * 0.25 })
  return out
})()
const BURST = (() => {
  const r = rng(4243)
  return Array.from({ length: 190 }, (_, i) => {
    const t = TILES[Math.floor(r() * TILES.length)]
    return { x: H1.x + t.lx, y: H1.y + t.ly, a: t.a + (r() - 0.5) * 0.5, v: 500 + Math.pow(r(), 1.5) * 1700, life: 0.5 + r() * 0.8, px: 3 + Math.floor(r() * 4),
      kind: r() < 0.35 ? 0 : (r() < 0.5 ? 1 : 3), col: STAR_PAL[Math.floor(r() * STAR_PAL.length)], d: i < 60 ? 0 : r() * 0.12, ph: Math.floor(r() * 4) }
  })
})()
// glitch strength per frame (3.433 → break): onset kick, a couple of bursts, then it tears apart
const GLITCH = { 103: 0.55, 104: 0.12, 105: 0.42, 106: 0.1, 107: 0.6, 108: 0.85, 109: 1 }
const LEAK_FR = 107                   // from this frame some tears leak the colour sky
const SCRAMBLE = ['NOT SHOWN', 'SCORE 9.8', 'SC0RE 1.4', 'NOT SHOWN', 'SCORE ?.?', 'ERR 0x62', 'NOT SHOWN', 'SCORE ##.#']

const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const loadImg = src => new Promise(res => { const im = new Image(); im.decoding = 'sync'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src })

/** cold B&W face card, 440×702, r22 (H1 spec) */
function faceCard(im) {
  const c = canvas(H1.w, H1.h), x = c.getContext('2d')
  x.beginPath(); x.roundRect(0, 0, H1.w, H1.h, H1.r); x.clip()
  x.fillStyle = '#16191f'; x.fillRect(0, 0, H1.w, H1.h)
  if (im) {
    const s = Math.max(H1.w / im.width, H1.h / im.height), w = im.width * s, h = im.height * s
    x.filter = 'grayscale(1) contrast(1.42) brightness(1.08)'          // g1's COLD_FILTER
    x.drawImage(im, (H1.w - w) / 2, (H1.h - h) * 0.34, w, h); x.filter = 'none'
  }
  const g = x.createLinearGradient(0, 0, 0, H1.h)
  g.addColorStop(0, 'rgba(8,10,14,0.25)'); g.addColorStop(0.18, 'rgba(8,10,14,0)'); g.addColorStop(0.62, 'rgba(8,10,14,0)'); g.addColorStop(1, 'rgba(8,10,14,0.55)')
  x.fillStyle = g; x.fillRect(0, 0, H1.w, H1.h)
  x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 3; x.beginPath(); x.roundRect(0, 0, H1.w, H1.h, H1.r); x.stroke()
  return c
}

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')
  const skyC = canvas(W, H), sx = skyC.getContext('2d')
  const tmp = canvas(W, H), tx = tmp.getContext('2d')
  const ch = canvas(W, H), chx = ch.getContext('2d')
  const mask = canvas(W, H), mx = mask.getContext('2d')
  // scanlines
  const scan = canvas(W, H); {
    const x = scan.getContext('2d'); x.fillStyle = 'rgba(0,0,0,0.5)'
    for (let y = 0; y < H; y += 4) x.fillRect(0, y, W, 2)
  }

  // copy
  const pocket = el('div', { position: 'absolute', left: '260px', top: '790px', width: '1400px', height: '290px', opacity: 0,
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(11,6,32,0.78), rgba(11,6,32,0.4) 60%, rgba(11,6,32,0) 100%)' }, root)
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '842px', textAlign: 'center', fontFamily: MONO, fontSize: '28px',
    letterSpacing: '0.34em', color: BONE, opacity: 0, textShadow: '0 2px 18px rgba(11,6,32,0.9)' }, root, 'DEALT BY THE STARS')
  const line = new TypeLine(root, 'Align deals blind.', { left: '50%', top: '890px', transform: 'translateX(-50%)', fontFamily: SERIF, fontStyle: 'italic',
    fontSize: '112px', lineHeight: '1', letterSpacing: '-0.01em', color: BONE,
    textShadow: '0 2px 30px rgba(11,6,32,0.9), -0.6px 0 0 rgba(232,98,138,0.3), 0.6px 0 0 rgba(140,170,255,0.25)' }, { perChar: 0.022, fade: 0.24, accent: [C.violet, C.gold, C.rub] })
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(55% 70% at 50% 48%, rgba(255,246,236,0.95) 0%, rgba(201,166,255,0.6) 40%, rgba(120,70,220,0.15) 75%, rgba(0,0,0,0) 100%)' }, root)
  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: 0, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')

  // art
  const faceIds = [...new Set(HAND.map(c => c.face))]
  const [p7, ...faceIms] = await Promise.all([loadImg(IMG + 'people/p7.jpg'), ...faceIds.map(i => loadImg(`${IMG}people/p${i}.jpg`))])
  const h1Card = faceCard(p7)
  const faces = Object.fromEntries(faceIds.map((id, k) => [id, faceCard(faceIms[k])]))
  const bmp = {}
  await Promise.all(Object.entries(ART).map(async ([k, src]) => {
    const im = await loadImg(A + src); if (!im) return
    const chain = filter => {
      const out = []; let w = k === 'p3' ? 1000 : 600, s = null
      while (w >= 60) {
        const h = Math.round(w * PROF.ih / PROF.iw), c = canvas(w, h), x = c.getContext('2d')
        x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'
        if (!s && filter) x.filter = filter
        x.drawImage(s || im, 0, 0, w, h); out.push(c); s = c; w = Math.round(w / 2)
      }
      return out
    }
    bmp[k] = chain()
    if (HUE[k] != null) bmp[k + 'h'] = chain(`hue-rotate(${HUE[k]}deg)`)
  }))
  const pick = (mips, sw) => { let c = mips[0]; for (const m of mips) if (m.width >= sw * 1.4) c = m; return c }

  /** mystery card: BODY centred at (x,y), body height h; sq = horizontal squeeze (flip), glow = rim light */
  function drawMystery(key, x, y, h, { sq = 1, roll = 0, alpha = 1, glow = 0, shadow = 1 } = {}) {
    const mips = bmp[key]; if (!mips || alpha <= 0.003 || h < 2) return
    const s = h / (PROF.b[3] - PROF.b[1]), bcx = (PROF.b[0] + PROF.b[2]) / 2, bcy = (PROF.b[1] + PROF.b[3]) / 2
    const c = pick(mips, PROF.iw * s)
    cx.save(); cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high'
    cx.globalAlpha = alpha; cx.translate(x, y); cx.rotate(roll); cx.scale(s * sq, s)
    if (shadow > 0) { cx.shadowColor = `rgba(4,2,14,${0.7 * shadow})`; cx.shadowBlur = 24; cx.shadowOffsetY = 10 }
    cx.drawImage(c, -bcx, -bcy, PROF.iw, PROF.ih)
    cx.shadowColor = 'transparent'; cx.shadowBlur = 0; cx.shadowOffsetY = 0
    if (glow > 0.01) {
      cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = alpha * glow * 0.32; cx.drawImage(c, -bcx, -bcy, PROF.iw, PROF.ih)
      const [l, t0, r, b] = PROF.b
      cx.globalAlpha = alpha * glow; cx.shadowColor = 'rgba(255,214,150,0.95)'; cx.shadowBlur = 18
      cx.strokeStyle = 'rgba(255,236,205,0.95)'; cx.lineWidth = 3 / s
      cx.beginPath(); cx.roundRect(l - bcx + 10, t0 - bcy + 10, r - l - 20, b - t0 - 20, 110); cx.stroke()
    }
    cx.restore()
  }
  function drawFace(img, x, y, h, { sq = 1, roll = 0, alpha = 1, wash = 0 } = {}) {
    const s = h / H1.h
    cx.save(); cx.globalAlpha = alpha; cx.translate(x, y); cx.rotate(roll); cx.scale(s * sq, s)
    cx.shadowColor = 'rgba(0,0,0,0.55)'; cx.shadowBlur = 30; cx.shadowOffsetY = 14
    cx.drawImage(img, -H1.w / 2, -H1.h / 2)
    cx.shadowColor = 'transparent'
    if (wash > 0.01) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = alpha * wash; cx.drawImage(img, -H1.w / 2, -H1.h / 2) }
    cx.restore()
  }
  function drawTag(text, x, y, alpha = 1) {
    cx.save(); cx.globalAlpha = alpha
    // g1's TAG_STYLE: Space Mono 30px, 0.12em, bone on rgba(8,9,12,.86), 2px bone .6 border, r8, padding 4/18/3, line 40
    cx.font = `400 30px ${MONO}`; cx.letterSpacing = '3.6px'; cx.textAlign = 'left'; cx.textBaseline = 'middle'
    const tw = cx.measureText(text).width, w = tw + 36 + 4, h = 51
    cx.fillStyle = 'rgba(8,9,12,0.86)'; cx.beginPath(); cx.roundRect(x - w / 2, y - h / 2, w, h, 8); cx.fill()
    cx.strokeStyle = 'rgba(239,230,214,0.6)'; cx.lineWidth = 2; cx.beginPath(); cx.roundRect(x - w / 2 + 1, y - h / 2 + 1, w - 2, h - 2, 7); cx.stroke()
    cx.fillStyle = BONE; cx.fillText(text, x - w / 2 + 20, y + 3)
    cx.restore()
  }
  const tagText = (fr) => fr >= 108 ? 'NOT SHOWN' : GLITCH[fr] > 0.3 ? SCRAMBLE[(fr * 5) % SCRAMBLE.length] : 'SCORE 6.2'

  /** hand card state at t → { x, y, h, roll, sq, showFace, wash, alpha } */
  function handState(c, t) {
    const p = prog(t, c.td, c.td + FLY)
    if (p <= 0) return null
    const e = ease.outCubic(p)
    let x = lerp(c.x0, c.x, e), y = lerp(c.y0, c.y, e) - Math.sin(Math.PI * p) * 40
    let h = lerp(c.h * 1.12, c.h, e), roll = lerp(c.roll0, c.rot, ease.outCubic(prog(p, 0, 0.85)))
    const yaw = Math.PI * ease.inOutCubic(prog(p, 0.22, 0.66)), cs = Math.cos(yaw)
    y += Math.sin(t * 1.1 + c.ph) * 3 * prog(t, c.td + FLY, c.td + FLY + 0.3)
    let alpha = 1, sq = Math.max(0.02, Math.abs(cs))
    const landGlow = p >= 1 ? Math.exp(-(t - c.td - FLY) * 5) * 0.8 : 0
    const P = 1 + 0.05 * ease.inOutQuad(prog(t, PUSH0, PUSH1))      // slow push-in on the whole arc
    x = H2.x + (x - H2.x) * P; y = H2.y + (y - H2.y) * P; h *= P
    if (c.isJ) {                                   // Juniper settles to H2
      const k = ease.inOutCubic(prog(t, JUN0, JUN1))
      x = lerp(x, H2.x, k); y = lerp(y, H2.y, k); h = lerp(h, H2.h, k); roll = lerp(roll, 0, k)
      if (t >= JUN1) { x = H2.x; y = H2.y; h = H2.h; roll = 0 }
    } else {                                       // the rest are swept off, out and up
      const o = c.out, k = prog(t, SWEEP0 + o.d, SWEEP1 - 0.08 + o.d * 0.3)
      if (k > 0) {
        const q = ease.inCubic(k)
        x += o.dx * q * 1300 * o.v; y -= q * 380; roll += o.dx * q * 0.9
        alpha = 1 - ease.inQuad(prog(k, 0.6, 1))
      }
    }
    return { x, y, h, roll, sq, showFace: cs > 0, wash: 0.45 * (1 - sq), glow: landGlow, alpha }
  }

  return {
    start: START, end: END, root,
    update(t) {
      const fr = Math.round(t * 30), g = t < BREAK ? (GLITCH[fr] || 0) : 0
      cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over'; cx.filter = 'none'
      // sky (for the leaks in the late tears, then the flood)
      const moon = ease.inOutQuad(prog(t, 3.8, 4.6))
      if (t >= GL0) drawSky3(sx, t, { moon })
      // ── plate: NOTHING before the break (g1's frozen backdrop shows through); from BREAK the flood is opaque everywhere
      cx.clearRect(0, 0, W, H)
      if (t >= BREAK) {
        const flood = prog(t, BREAK - 1 / 60, BREAK + FLOOD), fe = ease.outCubic(flood)
        const ex = 1 + 0.85 * Math.exp(-prog(t, BREAK, BREAK + 1.0) * 4)
        // base: the whole sky, held dark and cold outside the wipe front (covers g1 from the break frame)
        cx.drawImage(skyC, 0, 0)
        if (flood < 1) { cx.fillStyle = `rgba(7,6,14,${(0.74 * (1 - fe)).toFixed(3)})`; cx.fillRect(0, 0, W, H) }
        // the flood: over-exposed sky in a feathered radial wipe from the card centre
        mx.globalCompositeOperation = 'copy'; mx.drawImage(skyC, 0, 0)
        if (flood < 1) {
          const r = 30 + 1350 * fe, gr = mx.createRadialGradient(H1.x, H1.y, Math.max(0, r - 170), H1.x, H1.y, r)
          gr.addColorStop(0, '#000'); gr.addColorStop(1, 'rgba(0,0,0,0)')
          mx.globalCompositeOperation = 'destination-in'; mx.fillStyle = gr; mx.fillRect(0, 0, W, H)
        }
        cx.filter = ex > 1.003 ? `brightness(${ex.toFixed(3)}) saturate(${(1 + 0.3 * (ex - 1)).toFixed(3)})` : 'none'
        cx.drawImage(mask, 0, 0); cx.filter = 'none'
      }
      // ── the H1 card (until the break)
      if (t < BREAK) {
        const r = rng(fr * 131 + 7)
        const jx = g > 0.2 ? (r() - 0.5) * 16 * g : 0, punch = 1 + 0.035 * ease.inQuad(prog(t, GL0 + 0.1, BREAK))
        cx.save(); cx.translate(H1.x + jx, H1.y); cx.scale(punch, punch)
        cx.shadowColor = 'rgba(0,0,0,0.6)'; cx.shadowBlur = 70; cx.shadowOffsetY = 30
        cx.drawImage(h1Card, -H1.w / 2, -H1.h / 2)
        cx.restore()
        drawTag(tagText(fr), H1.x + jx * 1.4, H1.y + (H1.tagY - H1.y) * punch)
      }
      // ── glitch pass (card + tag only; alpha kept so g1 stays visible around them)
      if (g > 0) {
        const r = rng(fr * 977 + 3)
        tx.globalCompositeOperation = 'copy'; tx.drawImage(cv, 0, 0)
        const dx = Math.round(5 + 24 * g), dy = Math.round((r() - 0.5) * 6 * g)
        const offs = [['#ff0000', -dx, dy], ['#00ff00', 0, 0], ['#0000ff', dx, -dy]]
        // RGB split, composed on black, then cut back to the union of the three shifted silhouettes
        cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H)
        cx.globalCompositeOperation = 'lighter'
        for (const [col, ox, oy] of offs) {
          chx.globalCompositeOperation = 'copy'; chx.drawImage(tmp, 0, 0)
          chx.globalCompositeOperation = 'destination-over'; chx.fillStyle = '#000'; chx.fillRect(0, 0, W, H)
          chx.globalCompositeOperation = 'multiply'; chx.fillStyle = col; chx.fillRect(0, 0, W, H)
          cx.drawImage(ch, ox, oy)
        }
        mx.globalCompositeOperation = 'copy'; mx.drawImage(tmp, offs[0][1], offs[0][2])
        mx.globalCompositeOperation = 'source-over'; mx.drawImage(tmp, 0, 0); mx.drawImage(tmp, offs[2][1], offs[2][2])
        cx.globalCompositeOperation = 'destination-in'; cx.drawImage(mask, 0, 0)
        cx.globalCompositeOperation = 'source-over'
        // tears: horizontal bands slide; on the late frames some bands show the colour sky leaking through
        tx.globalCompositeOperation = 'copy'; tx.drawImage(cv, 0, 0)
        const n = 3 + Math.floor(g * 9)
        for (let i = 0; i < n; i++) {
          const y = Math.floor(r() * H), h = 4 + Math.floor(Math.pow(r(), 2) * 90), sh = Math.round((r() - 0.5) * 220 * g)
          const leak = fr >= LEAK_FR && r() < 0.35 + 0.3 * g
          if (leak) { cx.drawImage(skyC, 0, y, W, h, sh, y, W, h); continue }
          // g1 still holds its intact H1 card underneath until 3.70: keep the torn band dark over the card area
          cx.clearRect(0, y, W, h); const y0 = Math.max(y, H1.y - H1.h / 2 - 30), y1 = Math.min(y + h, H1.tagY + 40)
          if (y1 > y0) { cx.fillStyle = '#0b0d11'; cx.fillRect(H1.x - H1.w / 2 - 30, y0, H1.w + 60, y1 - y0) }
          cx.drawImage(tmp, 0, y, W, h, sh, y, W, h)
        }
        // block noise
        if (g > 0.5) for (let i = 0; i < 6; i++) {
          cx.fillStyle = r() < 0.5 ? `rgba(235,240,250,${0.5 * r()})` : `rgba(0,0,0,${0.7 * r()})`
          cx.fillRect(Math.floor(r() * W), Math.floor(r() * H), 20 + r() * 240, 4 + r() * 18)
        }
        // scanlines only on what we drew
        cx.globalCompositeOperation = 'source-atop'; cx.globalAlpha = 0.25 + 0.35 * g; cx.drawImage(scan, 0, (fr % 2) * 2)
        cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over'
      }
      // ── shatter tiles (card + tag)
      const lt = t - BREAK
      if (lt >= 0 && lt < 0.7) {
        cx.save()
        for (const T of TILES) {
          if (lt > T.life) continue
          const u = lt / T.life, d = T.v * (1 - Math.exp(-lt * 3.4)) / 3.4
          const x = H1.x + T.lx + Math.cos(T.a) * d, y = H1.y + T.ly + Math.sin(T.a) * d
          const sc = 1 - 0.7 * u
          cx.globalAlpha = Math.pow(1 - u, 1.4)
          cx.setTransform(sc, 0, 0, sc, x, y); cx.rotate(T.spin * lt)
          if (T.tag) { cx.fillStyle = '#e8ecf4'; cx.fillRect(-20, -22, 40, 44) }
          else cx.drawImage(h1Card, T.sx, T.sy, T.sw, T.sh, -T.sw / 2, -T.sh / 2, T.sw, T.sh)
          // a white-violet pop on the break, then the tile burns toward light as it turns into stars
          const burn = Math.max(0.6 * (1 - lt / 0.08), 0.55 * u)
          if (burn > 0.01) { cx.globalCompositeOperation = 'lighter'; cx.fillStyle = `rgba(226,206,255,${burn.toFixed(3)})`; cx.fillRect(-(T.sw || 40) / 2, -22, T.sw || 40, 44); cx.globalCompositeOperation = 'source-over' }
        }
        cx.restore()
      }
      // ── the hand
      const st = HAND.map(c => [c, handState(c, t)]).filter(([, s]) => s)
      st.sort((a, b) => (a[0].isJ ? 1 : 0) - (b[0].isJ ? 1 : 0) || a[0].td - b[0].td)
      for (const [c, s] of st) {
        if (s.alpha <= 0.003 || s.y - s.h > H + 200 || s.x < -400 || s.x > W + 400) continue
        if (s.showFace) drawFace(faces[c.face], s.x, s.y, s.h, { sq: s.sq, roll: s.roll, alpha: s.alpha, wash: s.wash })
        else drawMystery(c.art, s.x, s.y, s.h, { sq: s.sq, roll: s.roll, alpha: s.alpha, glow: Math.max(s.glow, s.wash), shadow: c.isJ && t >= JUN1 ? 1 : 1 })
      }
      // ── copy
      const out = 1 - ease.inOutQuad(prog(t, COPY.out0, COPY.out1))
      pocket.style.opacity = String(ease.outQuad(prog(t, COPY.eye - 0.2, COPY.eye + 0.3)) * out)
      const ep = ease.outCubic(prog(t, COPY.eye, COPY.eye + 0.25))
      eyebrow.style.opacity = String(ep * out * 0.9)
      eyebrow.style.transform = `translateY(${(1 - ep) * 10}px)`
      line.update(t - COPY.line)
      line.root.style.opacity = String(out)
      // ── flash on the break
      const fd = t - BREAK
      flash.style.opacity = String(fd < 0 ? 0 : clamp(0.62 * Math.exp(-fd * 7)))
      // ── grain: before the break only where we drew (g1's grain is under the rest); 0.58 through the glitch,
      //    easing to the shared 0.5 over 0.6s after the break
      grainC.style.opacity = String(t < GL0 ? grainOpacity(1) : t < BREAK ? 0.58 : lerp(0.58, grainOpacity(1), ease.inOutQuad(prog(t, BREAK, BREAK + 0.6))))
      drawGrain(gx, t)
      if (t < BREAK) { gx.globalCompositeOperation = 'destination-in'; gx.drawImage(cv, 0, 0); gx.globalCompositeOperation = 'source-over' }
    },
    fxStart: BREAK - 0.01, fxEnd: 5.4,
    fx(ctx, t) {
      ctx.save(); ctx.imageSmoothingEnabled = false
      const dt = t - BREAK + 1 / 60, tick = Math.round(t * 30) >> 1
      for (const b of BURST) {
        const lt = dt - b.d
        if (lt <= 0 || lt > b.life) continue
        const u = lt / b.life, dist = b.v * (1 - Math.exp(-lt * 3.0)) / 3.0
        const x = b.x + Math.cos(b.a) * dist, y = b.y + Math.sin(b.a) * dist * 0.92 - 30 * lt * lt
        ctx.globalAlpha = clamp((1 - u) * 1.6) * (((tick + b.ph) & 3) === 0 ? 0.55 : 1)
        sprite(ctx, x, y, b.px, ((tick + b.ph) & 1) ? b.kind : 2, b.col, HOT)
      }
      ctx.restore()
    },
  }
}

// ── sound: glitch tick burst, boom + bell chord + glitter on the break, a whoosh per dealt card, bell on the caption
export const cues = [
  ['tick', 3.433, 0.13],
  ['whoosh', 3.433, 0.12, 0.05],
  ['tick', 3.5, 0.1], ['tick', 3.533, 0.06],
  ['tick', 3.567, 0.12], ['tick', 3.6, 0.14], ['tick', 3.633, 0.16], ['tick', 3.65, 0.1],
  ['boom', BREAK, 0.65],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99].map((f, i) => ['bell', +(BREAK + 0.02 + i * 0.04).toFixed(3), f, 0.06, 2.4, (i - 2.5) * 0.18]),
  ['glitter', +(BREAK + 0.03).toFixed(3), +(BREAK + 1.1).toFixed(3)],
  ...HAND.map((c, i) => ['whoosh', +c.td.toFixed(3), 0.34, i === 3 ? 0.11 : 0.07]),
  ...HAND.filter((_, i) => i % 2 === 0).map(c => ['tick', +(c.td + FLY - 0.05).toFixed(3), 0.03]),
  ['bell', COPY.line, 587.33, 0.05, 2.0, 0],
  ['bell', COPY.line + 0.1, 880, 0.035, 2.0, 0.2],
  ['whoosh', SWEEP0, 0.5, 0.07],
  ['bell', 5.96, 1174.66, 0.025, 1.4, 0],
]
