// S1 · THREE MONTHS IN (0 → PLATE 6.0). A dark room, one phone, a sweet thread scrolling by like a montage
// (MAR 3 · APR 11 · MAY 22 → the "3 MONTHS TODAY" marker). Hook "Three months in." lands by 0.66.
//   0.00–2.25  the thread scrolls (slow → fast → settles) on "I can already picture our kids lol"
//   2.40–3.10  Sam is typing…   3.10  "I don't want kids." lands (pop + soft thud), colour drains out of the screen
//   3.22       "Then the / dealbreaker." (fully on ≈3.76, out 4.9)
//   3.55 4.10 4.60  the glass cracks from that bubble outwards, in three stages (tick + 3-frame shake each)
//   BREAK 5.1  the phone shatters into tiles that burn into pixel stars; the nebula floods in from the phone (g2 recipe),
//              the one moon fades on (kit.moonAlpha); exposure settles to exactly 1 by PLATE (6.0), when s2 takes the plate.
// Everything is drawn on canvases (the phone too, so it can crack and shatter). Pure function of t.
import { clamp, lerp, prog, ease, tw, rng, noise1, el, C, PIXEL_PALETTE } from '../../../src/lib.js'
import { W, H, IMG, SANS, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { drawGrain, grainOpacity } from '../../sky.js'
import { sky, twinkles, BREAK, PLATE } from './kit.js'

const BONE = '#efe6d6'
const S = 1.6                                   // phone canvas resolution (canvas px per phone px)
const PW = 600, PH = 1300, RIM = 14, FW = PW + 2 * RIM, FH = PH + 2 * RIM
const AREA_TOP = 198, AREA_BOT = PH - 132, VA = AREA_BOT - AREA_TOP
const SCROLL = { a: 0.0, b: 2.25 }
const TYPING = { a: 2.4, b: 3.1 }
const LAND = 3.1
const DRAIN = { a: 3.15, b: 3.9 }
const CRACKS = [3.55, 4.1, 4.6]
const CAP1 = { at: 0.12, out: 2.8 }, CAP2 = { at: 3.22, out: 4.88 }

const ME_BG = '#4a3f5a', THEM_BG = '#22252d'
const THREAD = [
  ['stamp', 'MAR 3'],
  [0, 'ok that was the best first date I’ve ever had'], [1, 'same. honestly'], [0, 'dinner friday?'], [1, 'it’s a date'],
  ['stamp', 'APR 11'],
  [1, 'you left your scarf here'], [0, 'keep it. now I have to come back'], [1, 'good'],
  ['stamp', 'MAY 22'],
  [0, 'my sister officially loves you'], [1, 'tell her it’s mutual'], [0, 'sunday at my mom’s?'], [1, 'I’ll bring pie'],
  ['mark', '3 MONTHS TODAY'],
  [1, 'happy 3 months :)'], [0, 'happy 3 months'], [1, 'I can already picture our kids lol'],
]
const DEAL_MSG = 'I don’t want kids.'

const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const loadImg = src => new Promise(res => { const im = new Image(); im.decoding = 'sync'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src })

/** words that land one by one (opacity, rise, de-blur) — ghosted a1 recipe */
function words(parent, text, style, at, gap = 0.1, dur = 0.3) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 18}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      }
    },
  }
}
const CAP = size => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: BONE, textShadow: '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)' })

// ── the crack: radials from the impact point with kinks and branches + two rings of spider-web links
function buildCracks(ox, oy) {
  const r = rng(5150), segs = []
  const radials = []
  const N = 10
  for (let i = 0; i < N; i++) {
    let a = (i / N) * Math.PI * 2 + (r() - 0.5) * 0.45, x = ox, y = oy, d = 0
    const len = 380 + r() * 900, pts = [[x, y, 0]]
    while (d < len) {
      const st = 22 + r() * 46
      a += (r() - 0.5) * 0.5
      const nx = x + Math.cos(a) * st, ny = y + Math.sin(a) * st
      segs.push({ x0: x, y0: y, x1: nx, y1: ny, d0: d, d1: d + st, w: 1 - d / (len * 1.4) })
      if (r() < 0.12 && d > 60) {                                    // branch
        let ba = a + (r() < 0.5 ? -1 : 1) * (0.5 + r() * 0.5), bx = nx, by = ny, bd = d + st
        const bl = bd + 90 + r() * 260
        while (bd < bl) {
          const s2 = 18 + r() * 34; ba += (r() - 0.5) * 0.6
          const ex = bx + Math.cos(ba) * s2, ey = by + Math.sin(ba) * s2
          segs.push({ x0: bx, y0: by, x1: ex, y1: ey, d0: bd, d1: bd + s2, w: 0.55 })
          bx = ex; by = ey; bd += s2
        }
      }
      x = nx; y = ny; d += st; pts.push([x, y, d])
    }
    radials.push(pts)
  }
  // spider-web rings: link neighbouring radials at about the same distance
  const at = (pts, R) => { for (const p of pts) if (p[2] >= R) return p; return pts[pts.length - 1] }
  for (const R of [40, 120]) for (let i = 0; i < N; i++) {
    const p = at(radials[i], R * (0.85 + r() * 0.3)), q = at(radials[(i + 1) % N], R * (0.85 + r() * 0.3))
    if (r() < 0.2 && R > 100) continue
    const mx = (p[0] + q[0]) / 2 + (ox - (p[0] + q[0]) / 2) * 0.12, my = (p[1] + q[1]) / 2 + (oy - (p[1] + q[1]) / 2) * 0.12
    segs.push({ x0: p[0], y0: p[1], x1: mx, y1: my, d0: R, d1: R + 14, w: 0.7 })
    segs.push({ x0: mx, y0: my, x1: q[0], y1: q[1], d0: R + 14, d1: R + 28, w: 0.7 })
  }
  return segs
}

// ── pixel stars (g2 language)
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

export default async function build(stage) {
  const root = fill(stage, { background: '#08090c' })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const cx = cv.getContext('2d')
  const skyC = canvas(W, H), sx = skyC.getContext('2d')
  const mask = canvas(W, H), mx = mask.getContext('2d')
  const pc = canvas(Math.ceil(FW * S), Math.ceil(FH * S)), px = pc.getContext('2d')
  const frozen = canvas(pc.width, pc.height), fzx = frozen.getContext('2d')

  await Promise.all([document.fonts.load(`400 31px Inter`), document.fonts.load(`600 33px Inter`), document.fonts.load(`18px 'Space Mono'`)]).catch(() => {})
  const avatar = await loadImg(IMG + 'people/p2.jpg')

  // ── layout the thread (phone px)
  px.font = `400 31px ${SANS}`
  const wrap = text => {
    const out = [], ws = text.split(' '); let line = ''
    for (const w of ws) { const tst = line ? line + ' ' + w : w; if (px.measureText(tst).width > 372 && line) { out.push(line); line = w } else line = tst }
    out.push(line); return out
  }
  const items = []
  let y = 18, prev = null
  const addMsg = (me, text, extra = {}) => {
    const lines = wrap(text), w = Math.max(...lines.map(l => px.measureText(l).width)) + 48, h = lines.length * 40 + 30
    y += prev == null ? 0 : prev === 'stamp' ? 24 : prev === me ? 10 : 20
    const it = { k: 'msg', me, text, lines, w, h, y, ...extra }; items.push(it); y += h; prev = me; return it
  }
  for (const [a, b] of THREAD) {
    if (a === 'stamp' || a === 'mark') { y += prev == null ? 0 : 34; items.push({ k: a, text: b, y, h: a === 'mark' ? 52 : 34 }); y += a === 'mark' ? 52 : 34; prev = 'stamp' }
    else addMsg(!!a, b)
  }
  const montageBottom = y
  const typingY = y + 20, liveH = 20 + 70
  const deal = { k: 'msg', me: false, text: DEAL_MSG, lines: [DEAL_MSG], w: px.measureText(DEAL_MSG).width + 48, h: 70, y: typingY }
  const viewBottom = t => {
    const sc = ease.inOutCubic(prog(t, SCROLL.a, SCROLL.b))
    return lerp(VA - 10, montageBottom + 16, sc) + liveH * ease.inOutCubic(prog(t, TYPING.a - 0.05, TYPING.a + 0.25))
  }
  const finalVB = montageBottom + 16 + liveH
  // the dealbreaker bubble in phone-frame px (impact point of the crack: a third of the way in from its left)
  const IMPACT = { x: RIM + 28 + deal.w + 46, y: RIM + AREA_TOP + (deal.y - (finalVB - VA)) + deal.h / 2 }
  const CRK = buildCracks(IMPACT.x - RIM, IMPACT.y - RIM)

  // ── camera: phone-frame point (fx, fy) lands on stage (sx, sy) at scale s, roll rz
  function cam(t) {
    const d = ease.inOutQuad(prog(t, 0, 3.0))
    const a = { fx: FW / 2 - 6, fy: lerp(800, 900, d), sx: 610, sy: 548, s: lerp(1.36, 1.46, d), rz: lerp(-2.8, -2.2, d) }
    const k = ease.inOutCubic(prog(t, 3.25, 4.9))
    const b = { fx: RIM + 28 + deal.w / 2 + 130, fy: IMPACT.y - 70, sx: 640, sy: 560, s: 1.9, rz: -1.4 }
    const L = n => lerp(a[n], b[n], k)
    return { fx: L('fx'), fy: L('fy'), sx: L('sx'), sy: L('sy'), s: L('s'), rz: L('rz') }
  }
  const shake = t => {
    let ox = 0, oy = 0
    for (const c of [...CRACKS, LAND]) {
      const f = Math.round((t - c) * 30)
      if (f >= 0 && f < 3) { const amp = (c === LAND ? 3 : 7) * (1 - f / 3); ox += [1, -1, 0.5][f] * amp; oy += [-0.6, 0.8, -0.3][f] * amp }
    }
    return [ox, oy]
  }
  const camMatrix = t => {
    const c = cam(t), [ox, oy] = shake(t)
    const hx = (noise1(t * 0.6, 11) - 0.5) * 10 + ox, hy = (noise1(t * 0.5, 23) - 0.5) * 8 + oy
    const m = new DOMMatrix().translate(c.sx + hx, c.sy + hy).rotate(c.rz).scale(c.s).translate(-c.fx, -c.fy)
    return m
  }
  const crackR = t => tw(t, [[CRACKS[0] - 0.01, 0], [CRACKS[0] + 0.08, 200, ease.outCubic], [CRACKS[1], 200], [CRACKS[1] + 0.09, 520, ease.outCubic], [CRACKS[2], 520], [CRACKS[2] + 0.12, 1500, ease.outCubic]])

  // ── draw the phone into pc (canvas px = phone-frame px × S)
  function bubble(it, ty, alpha = 1, sc = 1) {
    const x = it.me ? RIM + PW - 28 - it.w : RIM + 28
    px.save(); px.globalAlpha = alpha
    if (sc !== 1) { const ax = it.me ? x + it.w : x, ay = ty + it.h; px.translate(ax, ay); px.scale(sc, sc); px.translate(-ax, -ay) }
    px.fillStyle = it.me ? ME_BG : it.text === DEAL_MSG ? '#30333c' : THEM_BG
    px.beginPath(); px.roundRect(x, ty, it.w, it.h, it.me ? [28, 28, 8, 28] : [28, 28, 28, 8]); px.fill()
    px.fillStyle = it.me ? '#f1ecf4' : it.text === DEAL_MSG ? '#f4f5f8' : '#dadde4'; px.font = `400 31px ${SANS}`; px.textBaseline = 'alphabetic'
    it.lines.forEach((l, i) => px.fillText(l, x + 24, ty + 15 + 31 + i * 40 - 4))
    px.restore()
  }
  function drawPhone(t) {
    px.setTransform(S, 0, 0, S, 0, 0); px.clearRect(0, 0, FW, FH)
    px.globalAlpha = 1; px.globalCompositeOperation = 'source-over'; px.filter = 'none'
    // body
    const g = px.createLinearGradient(0, 0, FW * 0.6, FH)
    g.addColorStop(0, '#2b2f37'); g.addColorStop(0.4, '#121419'); g.addColorStop(1, '#0b0c10')
    px.fillStyle = g; px.beginPath(); px.roundRect(0, 0, FW, FH, 84); px.fill()
    px.strokeStyle = 'rgba(190,200,220,0.14)'; px.lineWidth = 2; px.beginPath(); px.roundRect(1, 1, FW - 2, FH - 2, 83); px.stroke()
    px.save(); px.translate(RIM, RIM)
    px.beginPath(); px.roundRect(0, 0, PW, PH, 70); px.clip()
    px.fillStyle = '#0c0e12'; px.fillRect(0, 0, PW, PH)
    // status bar
    px.fillStyle = '#d9dce3'; px.font = `600 25px ${SANS}`; px.fillText('10:14', 56, 48)
    for (let i = 0; i < 4; i++) { px.fillStyle = i < 3 ? '#d9dce3' : 'rgba(217,220,227,0.35)'; px.fillRect(PW - 120 + i * 10, 52 - (8 + i * 4), 6, 8 + i * 4) }
    px.strokeStyle = 'rgba(217,220,227,0.6)'; px.lineWidth = 2; px.beginPath(); px.roundRect(PW - 102, 30, 50, 22, 6); px.stroke()
    px.fillStyle = '#d9dce3'; px.fillRect(PW - 99, 33, 30, 16)
    px.restore()
    px.save(); px.translate(RIM, RIM); px.beginPath(); px.roundRect(0, 0, PW, PH, 70); px.clip()
    // header
    px.fillStyle = '#8a93a6'; px.font = `300 64px ${SANS}`; px.fillText('‹', 28, 140)
    if (avatar) {
      px.save(); px.beginPath(); px.arc(82 + 41, 92 + 41, 41, 0, Math.PI * 2); px.clip()
      const iw = avatar.naturalWidth, ih = avatar.naturalHeight, k = Math.max(82 / iw, 82 / ih) * 1.12
      px.filter = 'grayscale(0.85) contrast(1.1) brightness(0.95)'
      px.drawImage(avatar, 123 - iw * k / 2, 128 - ih * k / 2, iw * k, ih * k); px.filter = 'none'
      px.restore()
    }
    px.fillStyle = '#eceef2'; px.font = `600 33px ${SANS}`; px.fillText('Sam', 186, 126)
    const typingNow = t >= TYPING.a && t < LAND
    px.fillStyle = '#7d8494'; px.font = `400 21px ${SANS}`; px.fillText(typingNow ? 'typing…' : 'Active now', 187, 158)
    px.fillStyle = '#8a93a6'; px.font = `400 40px ${SANS}`; px.fillText('···', PW - 86, 136)
    px.fillStyle = 'rgba(255,255,255,0.07)'; px.fillRect(0, AREA_TOP - 1, PW, 1)
    // messages
    const vb = viewBottom(t), off = AREA_TOP - (vb - VA)
    const speed = (viewBottom(t + 1 / 60) - viewBottom(t - 1 / 60)) * 30            // phone px / s
    px.save(); px.beginPath(); px.rect(0, AREA_TOP, PW, VA); px.clip()
    px.translate(-RIM, 0)
    const blur = clamp(speed / 900, 0, 2.2)
    if (blur > 0.15) px.filter = `blur(${blur.toFixed(2)}px)`
    for (const it of items) {
      const ty = off + it.y
      if (ty > AREA_BOT + 10 || ty + it.h < AREA_TOP - 10) continue
      if (it.k === 'msg') bubble(it, ty)
      else if (it.k === 'stamp') { px.fillStyle = '#5d6472'; px.font = `400 18px ${MONO}`; px.letterSpacing = '2px'; px.textAlign = 'center'; px.fillText(it.text, RIM + PW / 2, ty + 24); px.textAlign = 'left'; px.letterSpacing = '0px' }
      else {                                     // the 3-month marker pill
        px.font = `400 19px ${MONO}`; px.letterSpacing = '3px'; px.textAlign = 'center'
        const w = px.measureText(it.text).width + 56
        px.fillStyle = 'rgba(160,140,170,0.12)'; px.strokeStyle = 'rgba(214,196,206,0.45)'; px.lineWidth = 1.5
        px.beginPath(); px.roundRect(RIM + PW / 2 - w / 2, ty + 4, w, 44, 22); px.fill(); px.stroke()
        px.fillStyle = '#d8ccd2'; px.fillText(it.text, RIM + PW / 2 + 1.5, ty + 33); px.textAlign = 'left'; px.letterSpacing = '0px'
      }
    }
    px.filter = 'none'
    // typing bubble → the message
    if (t >= TYPING.a && t < LAND) {
      const ty = off + typingY, a = ease.outQuad(prog(t, TYPING.a, TYPING.a + 0.15))
      px.save(); px.globalAlpha = a; px.fillStyle = THEM_BG
      px.beginPath(); px.roundRect(RIM + 28, ty, 112, 70, [28, 28, 28, 8]); px.fill()
      for (let i = 0; i < 3; i++) {
        const b = 0.35 + 0.65 * Math.max(0, Math.sin((t - TYPING.a) * 9 - i * 0.9))
        px.fillStyle = `rgba(200,204,214,${b})`; px.beginPath(); px.arc(RIM + 28 + 32 + i * 24, ty + 35 - 4 * b, 7, 0, Math.PI * 2); px.fill()
      }
      px.restore()
    }
    if (t >= LAND) {
      const p = prog(t, LAND, LAND + 0.16)
      bubble(deal, off + deal.y, ease.outQuad(Math.min(1, p * 1.6)), lerp(0.82, 1, ease.outBack(p)))
    }
    px.restore()
    // composer
    px.strokeStyle = 'rgba(255,255,255,0.1)'; px.lineWidth = 2
    px.beginPath(); px.roundRect(26, PH - 118, PW - 52 - 84, 74, 37); px.stroke()
    px.fillStyle = '#5d6472'; px.font = `400 27px ${SANS}`; px.fillText('Message', 54, PH - 71)
    px.fillStyle = '#232833'; px.beginPath(); px.arc(PW - 26 - 37, PH - 118 + 37, 37, 0, Math.PI * 2); px.fill()
    // colour drains out after the message lands
    const dr = ease.inOutQuad(prog(t, DRAIN.a, DRAIN.b))
    if (dr > 0.003) {
      px.globalCompositeOperation = 'saturation'; px.globalAlpha = dr; px.fillStyle = '#808080'; px.fillRect(0, 0, PW, PH)
      px.globalCompositeOperation = 'source-over'; px.globalAlpha = 0.18 * dr; px.fillStyle = '#05060a'; px.fillRect(0, 0, PW, PH); px.globalAlpha = 1
    }
    // cracks in the glass
    const R = crackR(t)
    if (R > 0) {
      const draw = (wd, col) => {
        px.strokeStyle = col; px.lineCap = 'round'; px.lineJoin = 'round'
        for (const s of CRK) {
          if (s.d0 >= R) continue
          const u = Math.min(1, (R - s.d0) / (s.d1 - s.d0))
          px.lineWidth = wd * (0.5 + 0.7 * s.w)
          px.beginPath(); px.moveTo(s.x0, s.y0); px.lineTo(lerp(s.x0, s.x1, u), lerp(s.y0, s.y1, u)); px.stroke()
        }
      }
      draw(4.2, 'rgba(0,0,0,0.55)')
      px.save(); px.translate(-0.8, -0.8); draw(1.3, 'rgba(232,238,248,0.8)'); px.restore()
      // impact bloom + fresh-crack flash
      const ix = IMPACT.x - RIM, iy = IMPACT.y - RIM
      const fl = CRACKS.reduce((m, c) => Math.max(m, t >= c ? Math.exp(-(t - c) * 9) : 0), 0)
      const gr = px.createRadialGradient(ix, iy, 0, ix, iy, 70 + 60 * fl)
      gr.addColorStop(0, `rgba(240,244,255,${0.25 + 0.5 * fl})`); gr.addColorStop(1, 'rgba(240,244,255,0)')
      px.globalCompositeOperation = 'lighter'; px.fillStyle = gr; px.fillRect(ix - 140, iy - 140, 280, 280); px.globalCompositeOperation = 'source-over'
    }
    // glass sheen
    const sh = px.createLinearGradient(0, 0, PW, PH)
    sh.addColorStop(0, 'rgba(255,255,255,0.05)'); sh.addColorStop(0.3, 'rgba(255,255,255,0)'); sh.addColorStop(0.7, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(255,255,255,0.03)')
    px.fillStyle = sh; px.fillRect(0, 0, PW, PH)
    px.restore()
  }

  // ── shatter tiles (canvas px of pc) + burst
  const TILE = 76
  const nx = Math.ceil(pc.width / TILE), ny = Math.ceil(pc.height / TILE)
  const TILES = (() => {
    const r = rng(6262), out = []
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const lx = (i + 0.5) * TILE / S, ly = (j + 0.5) * TILE / S       // phone-frame px
      const dxI = lx - IMPACT.x, dyI = ly - IMPACT.y, dist = Math.hypot(dxI, dyI)
      out.push({ i, j, lx, ly, a: Math.atan2(dyI, dxI) + (r() - 0.5) * 0.8, v: 420 + r() * 900 * (0.4 + 380 / (dist + 200)), spin: (r() - 0.5) * 9, life: 0.2 + r() * 0.24 })
    }
    return out
  })()
  const BURST = (() => {
    const r = rng(4243)
    return Array.from({ length: 200 }, (_, i) => {
      const T = TILES[Math.floor(r() * TILES.length)]
      return { lx: T.lx, ly: T.ly, a: T.a + (r() - 0.5) * 0.5, v: 500 + Math.pow(r(), 1.5) * 1700, life: 0.5 + r() * 0.8, px: 3 + Math.floor(r() * 4),
        kind: r() < 0.35 ? 0 : (r() < 0.5 ? 1 : 3), col: STAR_PAL[Math.floor(r() * STAR_PAL.length)], d: i < 60 ? 0 : r() * 0.12, ph: Math.floor(r() * 4) }
    })
  })()
  let frozenAt = -1, BM = null
  const freeze = () => { if (frozenAt === BREAK) return; drawPhone(BREAK - 1 / 30); fzx.clearRect(0, 0, frozen.width, frozen.height); fzx.drawImage(pc, 0, 0); frozenAt = BREAK; BM = camMatrix(BREAK - 1 / 30) }

  // ── copy
  const cap1 = el('div', { position: 'absolute', left: '1090px', width: '800px', top: '470px', textAlign: 'center' }, root)
  const c1 = words(cap1, 'Three months in.', { ...CAP(112), position: 'relative', display: 'block' }, CAP1.at, 0.12, 0.3)
  const cap2 = el('div', { position: 'absolute', left: '1090px', width: '800px', top: '410px', textAlign: 'center' }, root)
  const c2a = words(cap2, 'Then the', { ...CAP(124), position: 'relative', display: 'block' }, CAP2.at, 0.1, 0.3)
  const c2b = words(cap2, 'dealbreaker.', { ...CAP(124), position: 'relative', display: 'block' }, CAP2.at + 0.24, 0.1, 0.3)
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(55% 70% at 34% 50%, rgba(255,246,236,0.95) 0%, rgba(201,166,255,0.6) 40%, rgba(120,70,220,0.15) 75%, rgba(0,0,0,0) 100%)' }, root)
  const mkGrain = (op, blend) => { const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity: op, pointerEvents: 'none' }, root); c.width = W; c.height = H; return c }
  const gC = mkGrain(grainOpacity(1), 'overlay'), gx = gC.getContext('2d')
  const lC = mkGrain(0.07, 'screen'), lx = lC.getContext('2d')

  return {
    start: 0, end: PLATE, root,
    update(t) {
      cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over'; cx.filter = 'none'
      if (t < BREAK) {
        // the room: near-black with a spill of phone light (warm while it's sweet, colder after the message)
        cx.fillStyle = '#08090c'; cx.fillRect(0, 0, W, H)
        const dr = ease.inOutQuad(prog(t, DRAIN.a, DRAIN.b))
        const m = camMatrix(t), c0 = m.transformPoint(new DOMPoint(FW / 2, FH / 2))
        const sp = cx.createRadialGradient(c0.x, c0.y, 0, c0.x, c0.y, 980)
        const col = [Math.round(lerp(170, 110, dr)), Math.round(lerp(140, 132, dr)), Math.round(lerp(150, 176, dr))]
        sp.addColorStop(0, `rgba(${col},${0.2 * (0.9 + 0.1 * noise1(t * 2, 5))})`); sp.addColorStop(0.45, `rgba(${col},0.07)`); sp.addColorStop(1, 'rgba(8,9,12,0)')
        cx.fillStyle = sp; cx.fillRect(0, 0, W, H)
        drawPhone(t)
        cx.save(); cx.setTransform(m.multiply(new DOMMatrix().scale(1 / S)))
        cx.shadowColor = 'rgba(0,0,0,0.7)'; cx.shadowBlur = 120; cx.shadowOffsetY = 40
        cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high'
        cx.drawImage(pc, 0, 0)
        cx.restore()
      } else {
        freeze()
        // the flood: sky everywhere (dark outside the wipe front), over-exposed inside it, settling to exactly 1 by PLATE
        sky(sx, t, 1); twinkles(sx, t)
        const c0 = BM.transformPoint(new DOMPoint(IMPACT.x, IMPACT.y))
        const flood = prog(t, BREAK - 1 / 60, BREAK + 0.4), fe = ease.outCubic(flood)
        const pe = prog(t, BREAK, PLATE), ex = 1 + 0.85 * (Math.exp(-4 * pe) - Math.exp(-4)) / (1 - Math.exp(-4))
        cx.drawImage(skyC, 0, 0)
        if (flood < 1) { cx.fillStyle = `rgba(7,6,14,${(0.8 * (1 - fe)).toFixed(3)})`; cx.fillRect(0, 0, W, H) }
        mx.globalCompositeOperation = 'copy'; mx.drawImage(skyC, 0, 0)
        if (flood < 1) {
          const r = 30 + 1500 * fe, gr = mx.createRadialGradient(c0.x, c0.y, Math.max(0, r - 180), c0.x, c0.y, r)
          gr.addColorStop(0, '#000'); gr.addColorStop(1, 'rgba(0,0,0,0)')
          mx.globalCompositeOperation = 'destination-in'; mx.fillStyle = gr; mx.fillRect(0, 0, W, H)
        }
        cx.filter = ex > 1.002 ? `brightness(${ex.toFixed(3)}) saturate(${(1 + 0.3 * (ex - 1)).toFixed(3)})` : 'none'
        cx.drawImage(mask, 0, 0); cx.filter = 'none'
        // tiles
        const lt = t - BREAK
        if (lt < 0.5) {
          cx.save(); cx.imageSmoothingEnabled = true
          for (const T of TILES) {
            if (lt > T.life) continue
            const u = lt / T.life, d = T.v * (1 - Math.exp(-lt * 3.4)) / 3.4
            const p0 = BM.transformPoint(new DOMPoint(T.lx, T.ly))
            const x = p0.x + Math.cos(T.a) * d, y = p0.y + Math.sin(T.a) * d
            const sc = BM.a ? Math.hypot(BM.a, BM.b) * (1 - 0.7 * u) : 1
            cx.globalAlpha = Math.pow(1 - u, 1.4)
            cx.setTransform(1, 0, 0, 1, x, y); cx.rotate(T.spin * lt + Math.atan2(BM.b, BM.a)); cx.scale(sc / S, sc / S)
            cx.drawImage(frozen, T.i * TILE, T.j * TILE, TILE, TILE, -TILE / 2, -TILE / 2, TILE, TILE)
            const burn = Math.max(0.6 * (1 - lt / 0.08), 0.55 * u)
            if (burn > 0.01) { cx.globalCompositeOperation = 'lighter'; cx.fillStyle = `rgba(226,206,255,${burn.toFixed(3)})`; cx.fillRect(-TILE / 2, -TILE / 2, TILE, TILE); cx.globalCompositeOperation = 'source-over' }
          }
          cx.restore()
        }
      }
      // copy
      c1.update(t, 1 - ease.inOutQuad(prog(t, CAP1.out, CAP1.out + 0.24)))
      const o2 = 1 - ease.inOutQuad(prog(t, CAP2.out, CAP2.out + 0.2))
      c2a.update(t, o2); c2b.update(t, o2)
      const fd = t - BREAK
      flash.style.opacity = String(fd < 0 ? 0 : clamp(0.62 * Math.exp(-fd * 7)))
      drawGrain(gx, t)
      drawGrain(lx, t)
      lC.style.opacity = String(0.07 * (1 - ease.inOutQuad(prog(t, BREAK, BREAK + 0.5))))
    },
    fxStart: BREAK - 0.01, fxEnd: BREAK + 1.4,
    fx(ctx, t) {
      if (!BM) return
      ctx.save(); ctx.imageSmoothingEnabled = false
      const dt = t - BREAK + 1 / 60, tick = Math.round(t * 30) >> 1
      for (const b of BURST) {
        const lt = dt - b.d
        if (lt <= 0 || lt > b.life) continue
        const p0 = BM.transformPoint(new DOMPoint(b.lx, b.ly))
        const u = lt / b.life, dist = b.v * (1 - Math.exp(-lt * 3.0)) / 3.0
        const x = p0.x + Math.cos(b.a) * dist, y = p0.y + Math.sin(b.a) * dist * 0.92 - 30 * lt * lt
        ctx.globalAlpha = clamp((1 - u) * 1.6) * (((tick + b.ph) & 3) === 0 ? 0.55 : 1)
        sprite(ctx, x, y, b.px, ((tick + b.ph) & 1) ? b.kind : 2, b.col, HOT)
      }
      ctx.restore()
    },
  }
}

export const cues = [
  ['tick', 0.04, 0.04],
  ['bell', CAP1.at, 220, 0.035, 2.6, -0.15],                               // "Three months in." — warm, low
  ['whoosh', 0.5, 1.4, 0.035],                                              // the montage scroll
  ...[0.9, 1.25, 1.55, 1.8].map(t => ['tick', t, 0.012]),
  ['tick', 2.2, 0.02],
  ...[0, 1, 2, 3].map(i => ['tick', TYPING.a + 0.1 + i * 0.16, 0.01]),    // typing…
  ['tick', LAND, 0.06], ['boom', LAND + 0.01, 0.12],                        // the message lands
  ['bell', LAND + 0.02, 155.56, 0.04, 3.0, 0],
  ['bell', CAP2.at, 146.83, 0.035, 2.8, 0.15],                              // "Then the dealbreaker."
  ...CRACKS.flatMap((c, i) => [['tick', c, 0.09 + i * 0.03], ['tick', c + 0.03, 0.05], ['tick', c + 0.07, 0.03], ['bell', c + 0.01, [2349.32, 2637.02, 2959.96][i], 0.012, 0.5, -0.2 + i * 0.2]]),
  ['riser', 4.65, BREAK, 0.05],
  ['boom', BREAK, 0.6],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99].map((f, i) => ['bell', +(BREAK + 0.02 + i * 0.04).toFixed(3), f, 0.055, 2.4, (i - 2.5) * 0.18]),
  ['glitter', +(BREAK + 0.03).toFixed(3), +(BREAK + 1.1).toFixed(3)],
]
