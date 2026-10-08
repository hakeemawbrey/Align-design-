// Align Mashup engine — draws a beat-synced 9:16 image mashup onto a canvas.
// Pure function of time: draw(t) paints the frame at t seconds, so the studio can
// play it live and render.mjs can step it frame by frame for a clean MP4.

export const W = 1080
export const H = 1920

const VOID = '#0b0620'
const BONE = '#efe6d6'
const BONE_2 = '#b3a6c4'
const GOLD = '#f2c75c'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

const SERIF = '"EB Garamond", Georgia, serif'
const MONO = '"Space Mono", ui-monospace, monospace'
const GLYPH = '"DejaVu Sans", "Apple Symbols", "Segoe UI Symbol", "Noto Sans Symbols", sans-serif'

// ---------------------------------------------------------------- fonts

const FONT_FILES = [
  ['EB Garamond', 'eb-garamond/files/eb-garamond-latin-500-italic.woff2', { style: 'italic', weight: '500' }],
  ['EB Garamond', 'eb-garamond/files/eb-garamond-latin-400-italic.woff2', { style: 'italic', weight: '400' }],
  ['EB Garamond', 'eb-garamond/files/eb-garamond-latin-500-normal.woff2', { weight: '500' }],
  ['Space Mono', 'space-mono/files/space-mono-latin-700-normal.woff2', { weight: '700' }],
  ['Space Mono', 'space-mono/files/space-mono-latin-400-normal.woff2', { weight: '400' }],
]

let fontsReady
export function loadFonts(base = '/fonts/') {
  fontsReady ||= Promise.all(FONT_FILES.map(async ([family, file, desc]) => {
    try {
      const f = new FontFace(family, `url(${base}${file})`, desc)
      document.fonts.add(await f.load())
    } catch (e) {
      console.warn('font failed', file, e)
    }
  }))
  return fontsReady
}

// ---------------------------------------------------------------- utils

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3)
const easeInOut = (t) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
const backOut = (t) => { t = clamp(t); const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
const decay = (dt, k) => (dt < 0 ? 0 : Math.exp(-dt * k))

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function canvas(w, h) {
  const c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : Object.assign(document.createElement('canvas'), { width: w, height: h })
  return c
}

const imgCache = new Map()
export function loadImage(src) {
  if (!src) return Promise.resolve(null)
  const url = /^(https?:|blob:|data:|\/)/.test(src) ? src : `/${src}`
  if (!imgCache.has(url)) {
    imgCache.set(url, new Promise((resolve) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => im.decode().then(() => resolve(im), () => resolve(im))
      im.onerror = () => { console.warn('image failed', url); resolve(null) }
      im.src = url
    }))
  }
  return imgCache.get(url)
}

/** draw an image to cover a box; zoom ≥ 1, (fx, fy) = focus 0..1 */
function drawCover(ctx, img, x, y, w, h, zoom = 1, fx = 0.5, fy = 0.42) {
  const iw = img.width, ih = img.height
  const s = Math.max(w / iw, h / ih) * zoom
  const dw = iw * s, dh = ih * s
  ctx.drawImage(img, x + (w - dw) * fx, y + (h - dh) * fy, dw, dh)
}

/** a small, soft copy for blurred backgrounds (cheap to scale up) */
const blurCache = new WeakMap()
function blurred(img) {
  if (!blurCache.has(img)) {
    const c = canvas(216, 384)
    const g = c.getContext('2d')
    g.filter = 'blur(10px) saturate(1.3)'
    drawCover(g, img, -20, -20, 256, 424)
    blurCache.set(img, c)
  }
  return blurCache.get(img)
}

function foil(ctx, x0, x1, color, light, shift = 0) {
  const w = x1 - x0
  const g = ctx.createLinearGradient(x0 - w * shift, 0, x1 + w * (1 - shift), 0)
  const stops = [[0, color], [0.11, light], [0.21, '#ffffff'], [0.29, light], [0.39, color], [0.5, light], [0.61, color], [0.71, light], [0.79, '#ffffff'], [0.89, light], [1, color]]
  for (const [o, c] of stops) g.addColorStop(o, c)
  return g
}

function spaced(ctx, text, x, y, spacingEm, size) {
  ctx.letterSpacing = `${spacingEm * size}px`
  // letter-spacing adds trailing space after the last glyph; shift to stay centred
  const shift = ctx.textAlign === 'center' ? (spacingEm * size) / 2 : 0
  ctx.fillText(text, x + shift, y)
  ctx.letterSpacing = '0px'
}

function wrap(ctx, text, maxW) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (ctx.measureText(next).width > maxW && line) { lines.push(line); line = w } else line = next
  }
  if (line) lines.push(line)
  return lines
}

// ---------------------------------------------------------------- shared layers

let grain
function grainTile() {
  if (grain) return grain
  grain = canvas(256, 256)
  const g = grain.getContext('2d')
  const d = g.createImageData(256, 256)
  const r = rng(99)
  for (let i = 0; i < d.data.length; i += 4) {
    const v = r() * 255
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v
    d.data[i + 3] = 255
  }
  g.putImageData(d, 0, 0)
  return grain
}

function stars(seed, n = 140) {
  const r = rng(seed)
  return Array.from({ length: n }, () => ({ x: r() * W, y: r() * H, s: 0.6 + r() * 2.2, p: r() * 6.28, sp: 0.6 + r() * 2 }))
}

function drawSky(ctx, t, spec, starList, glow = 1) {
  ctx.fillStyle = VOID
  ctx.fillRect(0, 0, W, H)
  const g = ctx.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, H * 0.7)
  g.addColorStop(0, rgba(spec.color, 0.42 * glow))
  g.addColorStop(0.45, rgba(spec.dark, 0.5 * glow))
  g.addColorStop(1, 'rgba(11,6,32,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  for (const s of starList) {
    const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.p))
    ctx.fillStyle = `rgba(255,248,235,${a * 0.8})`
    ctx.beginPath()
    ctx.arc(s.x, (s.y - t * 6 * s.s + H) % H, s.s, 0, 6.283)
    ctx.fill()
  }
}

function drawGrainVignette(ctx, frameSeed) {
  ctx.save()
  ctx.globalAlpha = 0.09
  ctx.globalCompositeOperation = 'overlay'
  const pat = ctx.createPattern(grainTile(), 'repeat')
  const r = rng(frameSeed)
  ctx.translate(-r() * 256, -r() * 256)
  ctx.fillStyle = pat
  ctx.fillRect(0, 0, W + 256, H + 256)
  ctx.restore()
  const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.72)
  v.addColorStop(0, 'rgba(5,3,15,0)')
  v.addColorStop(1, 'rgba(5,3,15,0.62)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, W, H)
}

function drawBug(ctx) {
  // the small brand tag that sits at the top of every frame
  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba(BONE, 0.85)
  ctx.font = `700 26px ${MONO}`
  spaced(ctx, '✦ ALIGN ✦', W / 2, 150, 0.32, 26)
  ctx.restore()
}

function kicker(ctx, text, x, y, color, alpha = 1, size = 32) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${size}px ${MONO}`
  ctx.fillStyle = color
  ctx.shadowColor = 'rgba(5,3,15,0.9)'
  ctx.shadowBlur = 18
  spaced(ctx, text.toUpperCase(), x, y, 0.22, size)
  ctx.restore()
}

/** serif italic caption, words rise in one by one over `reveal` (0..1) */
function caption(ctx, text, cx, top, { size = 92, maxW = 880, reveal = 1, color = BONE, fill } = {}) {
  ctx.save()
  ctx.font = `italic 500 ${size}px ${SERIF}`
  let lines = wrap(ctx, text, maxW)
  while (lines.length > 4 && size > 56) {
    size -= 6
    ctx.font = `italic 500 ${size}px ${SERIF}`
    lines = wrap(ctx, text, maxW)
  }
  const lh = size * 1.08
  const total = text.split(/\s+/).length
  let wi = 0
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'left'
  ctx.shadowColor = 'rgba(5,3,15,0.85)'
  ctx.shadowBlur = 34
  lines.forEach((line, li) => {
    const words = line.split(' ')
    const lw = ctx.measureText(line).width
    let x = cx - lw / 2
    const y = top + li * lh + size
    for (const w of words) {
      const at = (wi / total) * 0.75
      const p = easeOut((reveal - at) / 0.25)
      const ww = ctx.measureText(w + ' ').width
      if (p > 0) {
        ctx.globalAlpha = p
        ctx.fillStyle = fill ? fill(x, x + ww) : color
        ctx.fillText(w, x, y + (1 - p) * size * 0.35)
      }
      x += ww
      wi++
    }
  })
  ctx.restore()
  return top + lines.length * lh + size * 0.3
}

// ---------------------------------------------------------------- shot styles

/** full-bleed picture with a dark scrim and the caption low on the frame */
function shotFull(ctx, sh, img, k) {
  ctx.save()
  ctx.translate(W / 2 + k.shakeX, H / 2 + k.shakeY)
  ctx.rotate(k.rot)
  ctx.translate(-W / 2, -H / 2)
  drawCover(ctx, img, -40, -40, W + 80, H + 80, k.zoom, 0.5 + k.pan * 0.12, 0.38)
  ctx.restore()
  // tinted wash so every picture reads in the sign's colour
  ctx.save()
  ctx.globalCompositeOperation = 'soft-light'
  ctx.fillStyle = rgba(sh.color, 0.55)
  ctx.fillRect(0, 0, W, H)
  ctx.restore()
  const g = ctx.createLinearGradient(0, H * 0.45, 0, H)
  g.addColorStop(0, 'rgba(11,6,32,0)')
  g.addColorStop(0.55, 'rgba(11,6,32,0.72)')
  g.addColorStop(1, 'rgba(11,6,32,0.92)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  return 1240
}

/** the Align deck card: foil edge, picture inside, name plate */
function shotCard(ctx, sh, img, k, t) {
  ctx.save()
  ctx.globalAlpha = 0.85
  drawCover(ctx, blurred(img), 0, 0, W, H, 1.1 + (k.zoom - 1) * 0.5)
  ctx.restore()
  ctx.fillStyle = 'rgba(11,6,32,0.45)'
  ctx.fillRect(0, 0, W, H)

  const cw = 780, ch = 1040
  const s = k.cardScale
  ctx.save()
  ctx.translate(W / 2 + k.shakeX, 250 + ch / 2 + k.shakeY)
  ctx.rotate(k.rot * 1.6)
  ctx.scale(s, s)
  ctx.translate(-cw / 2, -ch / 2)
  ctx.shadowColor = rgba(sh.color, 0.7)
  ctx.shadowBlur = 80
  roundRect(ctx, 0, 0, cw, ch, 44)
  ctx.fillStyle = foil(ctx, 0, cw, sh.color, sh.light, (t * 0.35) % 1)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.save()
  roundRect(ctx, 12, 12, cw - 24, ch - 24, 34)
  ctx.clip()
  ctx.fillStyle = VOID
  ctx.fillRect(0, 0, cw, ch)
  drawCover(ctx, img, 12, 12, cw - 24, ch - 24, k.zoom, 0.5, 0.35)
  const plate = ctx.createLinearGradient(0, ch * 0.62, 0, ch)
  plate.addColorStop(0, 'rgba(11,6,32,0)')
  plate.addColorStop(1, 'rgba(11,6,32,0.92)')
  ctx.fillStyle = plate
  ctx.fillRect(0, 0, cw, ch)
  // holo sheen sweeping across the card
  const sx = ((t * 0.5) % 1.6) * cw * 1.6 - cw * 0.6
  const sheen = ctx.createLinearGradient(sx, 0, sx + cw * 0.4, ch * 0.4)
  sheen.addColorStop(0, 'rgba(255,255,255,0)')
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.18)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.globalCompositeOperation = 'overlay'
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, cw, ch)
  ctx.restore()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `64px ${GLYPH}`
  ctx.fillStyle = sh.light
  ctx.shadowColor = sh.color
  ctx.shadowBlur = 24
  ctx.fillText(sh.glyph + '︎', cw / 2, ch - 96)
  ctx.restore()
  return 250 + ch * s + 60
}

/** no picture: a glowing glyph on the sign's aura, inside a turning zodiac wheel */
function shotGlyph(ctx, sh, k, t) {
  const cx = W / 2, cy = 800
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 760)
  g.addColorStop(0, rgba(sh.light, 0.95))
  g.addColorStop(0.22, rgba(sh.color, 0.9))
  g.addColorStop(0.6, rgba(sh.dark, 0.85))
  g.addColorStop(1, 'rgba(11,6,32,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  ctx.save()
  ctx.translate(cx + k.shakeX, cy + k.shakeY)
  ctx.scale(k.zoom, k.zoom)
  ctx.strokeStyle = rgba(BONE, 0.5)
  ctx.lineWidth = 2
  for (const [r, dir] of [[420, 1], [360, -1]]) {
    ctx.save()
    ctx.rotate(t * 0.15 * dir)
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.stroke()
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * 6.283
      const l = i % 6 === 0 ? 22 : 9
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      ctx.lineTo(Math.cos(a) * (r - l), Math.sin(a) * (r - l))
      ctx.stroke()
    }
    ctx.restore()
  }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `360px ${GLYPH}`
  ctx.shadowColor = sh.light
  ctx.shadowBlur = 60
  ctx.fillStyle = '#fffaf0'
  ctx.fillText(sh.glyph + '︎', 0, 20)
  ctx.restore()
  return 1300
}

// ---------------------------------------------------------------- the Align mark

function alignMark(ctx, cx, cy, scale, p, t) {
  const R = 20
  const petals = [[0, 0], ...Array.from({ length: 6 }, (_, k) => {
    const a = (-90 + k * 60) * Math.PI / 180
    return [Math.cos(a) * R, Math.sin(a) * R]
  })]
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)
  ctx.lineWidth = 0.7
  ctx.strokeStyle = rgba(BONE, 0.6)
  const circles = [...petals.map(([x, y]) => [x, y, R]), [0, 0, R * 2]]
  circles.forEach(([x, y, r], i) => {
    const q = easeInOut((p - i * 0.04) / 0.5)
    if (q <= 0) return
    ctx.beginPath()
    ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + q * 6.283)
    ctx.stroke()
  })
  CHAKRAS.forEach((c, i) => {
    const q = easeOut((p - 0.5 - i * 0.06) / 0.15)
    if (q <= 0) return
    const y = (3 - i) * 10.6
    const pulse = 1 + 0.15 * Math.sin(t * 4 + i)
    const gl = ctx.createRadialGradient(0, y, 0, 0, y, 11 * pulse)
    gl.addColorStop(0, rgba(c, 0.9 * q))
    gl.addColorStop(0.45, rgba(c, 0.35 * q))
    gl.addColorStop(1, rgba(c, 0))
    ctx.fillStyle = gl
    ctx.beginPath(); ctx.arc(0, y, 11 * pulse, 0, 6.283); ctx.fill()
    ctx.fillStyle = rgba('#ffffff', q)
    ctx.beginPath(); ctx.arc(0, y, 2.6, 0, 6.283); ctx.fill()
  })
  ctx.restore()
}

// ---------------------------------------------------------------- timeline

const PACES = {
  chill: { base: 2, max: 4, collage: 4 },
  normal: { base: 1, max: 3, collage: 4 },
  hype: { base: 1, max: 2, collage: 3 },
}

export async function createMashup(spec, { bpm = 120, fps = 30, pace = 'normal', fontBase } = {}) {
  await loadFonts(fontBase)
  const beat = 60 / bpm
  const P = PACES[pace] || PACES.normal
  const seed = hash(spec.id || spec.title)
  const r = rng(seed)

  const shotImgs = await Promise.all(spec.shots.map((s) => loadImage(s.src)))
  const titleImg = await loadImage(spec.titleImg)
  const collageImgs = (await Promise.all((spec.collage || []).map(loadImage))).filter(Boolean)
  const starList = stars(seed)

  // build segments on the beat grid
  const segs = []
  let at = 0
  const push = (type, beats, extra = {}) => { segs.push({ type, t0: at, t1: at + beats * beat, beats, ...extra }); at += beats * beat }
  push('intro', 4)
  const dropAt = at
  const styles = ['full', 'card', 'full', 'card']
  spec.shots.forEach((sh, i) => {
    const words = sh.caption.split(/\s+/).length
    let beats = clamp(Math.ceil(words / 2.2), P.base, P.max)
    if (pace === 'hype' && i > 3 && words <= 3) beats = 0.5
    const img = shotImgs[i]
    const style = !img ? 'glyph' : sh.big ? 'card' : styles[(i + (seed & 1)) % styles.length]
    push('shot', beats, { i, style, img, sh, pan: r() * 2 - 1, tilt: (r() * 2 - 1) * 0.02 })
  })
  if (collageImgs.length >= 3) push('collage', P.collage)
  push('outro', 6)
  const duration = at

  function shotFrame(ctx, seg, t) {
    const lt = t - seg.t0
    const sinceBeat = (t - dropAt) % beat
    const k = {
      zoom: 1.04 + 0.1 * decay(lt, 7) + 0.04 * decay(sinceBeat, 9) + lt * 0.02,
      cardScale: lerp(0.86, 1, backOut(lt / (beat * 0.6))) + 0.015 * decay(sinceBeat, 10),
      rot: seg.tilt + 0.03 * decay(lt, 10) * (seg.i % 2 ? 1 : -1),
      shakeX: Math.sin(lt * 90) * 18 * decay(lt, 14),
      shakeY: Math.cos(lt * 70) * 12 * decay(lt, 14),
      pan: seg.pan * clamp(lt / (seg.t1 - seg.t0)),
    }
    const sh = seg.sh
    let capTop
    if (seg.style === 'full') capTop = shotFull(ctx, sh, seg.img, k)
    else if (seg.style === 'card') capTop = shotCard(ctx, sh, seg.img, k, t)
    else capTop = shotGlyph(ctx, sh, k, t)

    // RGB ghosting for the first frames after the cut
    const ghost = decay(lt, 16)
    if (ghost > 0.05 && seg.img && seg.style === 'full') {
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.globalAlpha = ghost * 0.45
      drawCover(ctx, seg.img, -40 + 26 * ghost, -40, W + 80, H + 80, k.zoom * 1.03)
      ctx.globalAlpha = ghost * 0.3
      ctx.fillStyle = rgba(sh.color, 1)
      ctx.fillRect(0, 0, W, H)
      ctx.restore()
    }

    const dur = seg.t1 - seg.t0
    const reveal = clamp(lt / Math.max(0.25, dur * 0.7))
    if (sh.kicker) kicker(ctx, sh.kicker, W / 2, capTop - 10, sh.light, easeOut(lt / 0.2))
    if (sh.big) {
      caption(ctx, sh.caption, W / 2, capTop + 10, { size: 170, reveal: 1, fill: (a, b) => foil(ctx, a, b, sh.color, sh.light, (t * 0.4) % 1) })
    } else {
      caption(ctx, sh.caption, W / 2, capTop + 20, { reveal })
    }
  }

  function introFrame(ctx, seg, t) {
    const lt = t - seg.t0
    const p = lt / (seg.t1 - seg.t0)
    if (titleImg) {
      ctx.save()
      ctx.globalAlpha = 0.55 * easeOut(p * 2)
      drawCover(ctx, titleImg, 0, 0, W, H, 1.25 - p * 0.15)
      ctx.restore()
      ctx.fillStyle = 'rgba(11,6,32,0.35)'
      ctx.fillRect(0, 0, W, H)
    }
    // glyph ring
    const ring = easeOut(p * 1.6)
    ctx.save()
    ctx.translate(W / 2, 700)
    ctx.strokeStyle = rgba(spec.light, 0.7 * ring)
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(0, 0, 190, -Math.PI / 2, -Math.PI / 2 + ring * 6.283); ctx.stroke()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.globalAlpha = easeOut((p - 0.1) * 3)
    ctx.font = `200px ${GLYPH}`
    ctx.shadowColor = spec.color
    ctx.shadowBlur = 50
    ctx.fillStyle = '#fffaf0'
    ctx.fillText(spec.glyph + '︎', 0, 12)
    ctx.restore()

    kicker(ctx, spec.eyebrow, W / 2, 990, BONE_2, easeOut((p - 0.15) * 4), 28)
    // title, letters land one after another
    ctx.save()
    let size = 230
    ctx.font = `italic 500 ${size}px ${SERIF}`
    while (ctx.measureText(spec.title).width > 940) { size -= 10; ctx.font = `italic 500 ${size}px ${SERIF}` }
    const tw = ctx.measureText(spec.title).width
    let x = W / 2 - tw / 2
    ctx.textBaseline = 'alphabetic'
    ctx.shadowColor = rgba(spec.color, 0.8)
    ctx.shadowBlur = 40
    const fill = foil(ctx, x, x + tw, spec.color, spec.light, (t * 0.3) % 1)
    ;[...spec.title].forEach((ch, i, arr) => {
      const q = backOut((p - 0.2 - (i / arr.length) * 0.3) / 0.18)
      const cw = ctx.measureText(ch).width
      if (q > 0) {
        ctx.globalAlpha = clamp(q)
        ctx.fillStyle = fill
        ctx.fillText(ch, x, 1150 + size * 0.35 + (1 - q) * 80)
      }
      x += cw
    })
    ctx.restore()
    caption(ctx, spec.sub, W / 2, 1300 + size * 0.1, { size: 62, color: BONE_2, reveal: clamp((p - 0.55) / 0.4) })
  }

  function collageFrame(ctx, seg, t) {
    const lt = t - seg.t0
    const cols = 3, rows = 4, gap = 14
    const tw = (W - gap * (cols + 1)) / cols
    const th = (H - gap * (rows + 1)) / rows
    const n = cols * rows
    const step = ((seg.t1 - seg.t0) - beat) / n
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => hash(spec.id + a) - hash(spec.id + b))
    order.forEach((cell, j) => {
      const q = lt - j * step
      if (q < 0) return
      const s = backOut(q / 0.22)
      const img = collageImgs[j % collageImgs.length]
      const x = gap + (cell % cols) * (tw + gap)
      const y = gap + Math.floor(cell / cols) * (th + gap)
      ctx.save()
      ctx.translate(x + tw / 2, y + th / 2)
      ctx.scale(lerp(0.5, 1, s), lerp(0.5, 1, s))
      ctx.rotate((1 - clamp(s)) * (j % 2 ? 0.2 : -0.2))
      roundRect(ctx, -tw / 2, -th / 2, tw, th, 26)
      ctx.clip()
      drawCover(ctx, img, -tw / 2, -th / 2, tw, th, 1.05 + 0.1 * decay(q, 8))
      ctx.fillStyle = `rgba(255,255,255,${0.6 * decay(q, 14)})`
      ctx.fillRect(-tw / 2, -th / 2, tw, th)
      ctx.restore()
    })
    // last beat: title stamped over the grid
    const fin = lt - (seg.t1 - seg.t0 - beat)
    if (fin > 0) {
      ctx.fillStyle = `rgba(11,6,32,${0.55 * easeOut(fin / 0.15)})`
      ctx.fillRect(0, 0, W, H)
      const s = backOut(fin / 0.25)
      ctx.save()
      ctx.translate(W / 2, H / 2)
      ctx.scale(lerp(1.6, 1, clamp(s)), lerp(1.6, 1, clamp(s)))
      ctx.globalAlpha = clamp(fin / 0.1)
      let size = 200
      ctx.font = `italic 500 ${size}px ${SERIF}`
      while (ctx.measureText(spec.title).width > 960) { size -= 10; ctx.font = `italic 500 ${size}px ${SERIF}` }
      const tw2 = ctx.measureText(spec.title).width
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = rgba(spec.color, 0.9)
      ctx.shadowBlur = 50
      ctx.fillStyle = foil(ctx, -tw2 / 2, tw2 / 2, spec.color, spec.light, (t * 0.4) % 1)
      ctx.fillText(spec.title, 0, 0)
      ctx.restore()
    }
  }

  function outroFrame(ctx, seg, t) {
    const lt = t - seg.t0
    const p = lt / (seg.t1 - seg.t0)
    alignMark(ctx, W / 2, 760, 6.2, p * 1.6, t)
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    ctx.font = `italic 500 190px ${SERIF}`
    ctx.globalAlpha = easeOut((p - 0.35) / 0.2)
    ctx.shadowColor = rgba(GOLD, 0.6)
    ctx.shadowBlur = 40
    ctx.fillStyle = foil(ctx, W / 2 - 230, W / 2 + 230, '#b88a2c', '#fff4cf', (t * 0.3) % 1)
    ctx.fillText('Align', W / 2, 1290)
    ctx.restore()
    caption(ctx, spec.outro, W / 2, 1340, { size: 64, color: BONE, reveal: clamp((p - 0.45) / 0.35) })
    // fade to the void at the very end
    ctx.fillStyle = `rgba(11,6,32,${clamp((p - 0.88) / 0.12)})`
    ctx.fillRect(0, 0, W, H)
  }

  function draw(ctx, t) {
    t = clamp(t, 0, duration - 1e-6)
    const seg = segs.find((s) => t >= s.t0 && t < s.t1) || segs[segs.length - 1]
    const segSpec = seg.sh || spec
    drawSky(ctx, t, segSpec, starList, seg.type === 'outro' ? 0.6 : 1)
    if (seg.type === 'intro') introFrame(ctx, seg, t)
    else if (seg.type === 'shot') shotFrame(ctx, seg, t)
    else if (seg.type === 'collage') collageFrame(ctx, seg, t)
    else outroFrame(ctx, seg, t)

    // flash on every cut, a softer one on every beat after the drop
    const lt = t - seg.t0
    let flash = seg.type === 'intro' ? 0 : 0.5 * decay(lt, 18)
    if (t >= dropAt && seg.type === 'shot') flash = Math.max(flash, 0.12 * decay((t - dropAt) % beat, 14))
    if (flash > 0.01) {
      ctx.fillStyle = rgba(segSpec.light || '#ffffff', flash)
      ctx.fillRect(0, 0, W, H)
    }
    drawGrainVignette(ctx, Math.floor(t * fps))
    if (seg.type !== 'outro') drawBug(ctx)
  }

  return { duration, fps, bpm, beat, dropAt, segs, frames: Math.round(duration * fps), draw }
}

// ---------------------------------------------------------------- soundtrack

const ROOTS = { aries: 0, taurus: 5, gemini: 2, cancer: 9, leo: 7, virgo: 4, libra: 10, scorpio: 1, sagittarius: 3, capricorn: 8, aquarius: 11, pisces: 6 }

/**
 * A small synthwave bed in the sign's key, on the same beat grid as the cuts:
 * riser under the intro, kick + clap + hats + bass from the drop, pad to the end.
 */
export async function renderMusic(m, specId, sampleRate = 48000) {
  const len = Math.ceil((m.duration + 0.5) * sampleRate)
  const ac = new OfflineAudioContext(2, len, sampleRate)
  const out = ac.createDynamicsCompressor()
  out.threshold.value = -14
  out.ratio.value = 4
  const master = ac.createGain()
  master.gain.setValueAtTime(0.7, 0)
  master.gain.setValueAtTime(0.7, m.duration - 1.2)
  master.gain.linearRampToValueAtTime(0, m.duration)
  out.connect(master).connect(ac.destination)

  const root = 45 + (ROOTS[specId] ?? (Math.abs(hash(specId)) % 12)) // A2-ish
  const hz = (n) => 440 * Math.pow(2, (n - 69) / 12)
  const b = m.beat
  const drop = m.dropAt
  const end = m.duration

  const noiseBuf = ac.createBuffer(1, sampleRate, sampleRate)
  const nd = noiseBuf.getChannelData(0)
  const nr = rng(7)
  for (let i = 0; i < nd.length; i++) nd[i] = nr() * 2 - 1

  const env = (g, t, a, peak, d) => {
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + a)
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d)
  }
  const noise = (t, d, type, freq, peak) => {
    const s = ac.createBufferSource(); s.buffer = noiseBuf
    const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq
    const g = ac.createGain(); env(g, t, 0.002, peak, d)
    s.connect(f).connect(g).connect(out); s.start(t); s.stop(t + d + 0.05)
  }
  const kick = (t) => {
    const o = ac.createOscillator(); const g = ac.createGain()
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12)
    env(g, t, 0.003, 0.9, 0.32)
    o.connect(g).connect(out); o.start(t); o.stop(t + 0.4)
  }
  const bass = (t, n, d) => {
    const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = hz(n)
    const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 380
    const g = ac.createGain(); env(g, t + 0.02, 0.01, 0.22, d)
    o.connect(f).connect(g).connect(out); o.start(t); o.stop(t + d + 0.1)
  }
  const pad = (t0, t1, notes, vol) => {
    for (const n of notes) {
      for (const det of [-7, 7]) {
        const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = hz(n); o.detune.value = det
        const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(600, t0); f.frequency.linearRampToValueAtTime(1800, t1)
        const g = ac.createGain()
        g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.4)
        g.gain.setValueAtTime(vol, Math.max(t0 + 0.4, t1 - 0.3)); g.gain.linearRampToValueAtTime(0.0001, t1)
        o.connect(f).connect(g).connect(out); o.start(t0); o.stop(t1 + 0.05)
      }
    }
  }
  const pluck = (t, n) => {
    const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = hz(n)
    const g = ac.createGain(); env(g, t, 0.003, 0.12, 0.35)
    o.connect(g).connect(out); o.start(t); o.stop(t + 0.4)
  }

  // minor progression, one chord per bar: i – VI – III – VII
  const prog = [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]]
  const bar = 4 * b
  for (let t = 0, i = 0; t < end; t += bar, i++) {
    const ch = prog[i % prog.length]
    pad(t, Math.min(end, t + bar + 0.05), ch.map((x) => root + 12 + x), 0.035)
  }
  // riser into the drop
  {
    const s = ac.createBufferSource(); s.buffer = noiseBuf; s.loop = true
    const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3
    f.frequency.setValueAtTime(300, 0); f.frequency.exponentialRampToValueAtTime(6000, drop)
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, 0); g.gain.exponentialRampToValueAtTime(0.25, drop - 0.02); g.gain.linearRampToValueAtTime(0, drop)
    s.connect(f).connect(g).connect(out); s.start(0); s.stop(drop + 0.05)
  }
  // impact
  noise(drop, 1.2, 'lowpass', 900, 0.6)
  const groovEnd = end - 2 * b
  let bi = 0
  for (let t = drop; t < groovEnd - 1e-6; t += b, bi++) {
    const ch = prog[Math.floor((t / bar)) % prog.length]
    kick(t)
    bass(t, root - 12 + ch[0], b * 0.45)
    bass(t + b / 2, root + ch[0], b * 0.35)
    noise(t + b / 2, 0.05, 'highpass', 8000, 0.18)
    if (bi % 2 === 1) noise(t, 0.18, 'bandpass', 1800, 0.45)
    if (bi % 4 === 3) pluck(t + b * 0.75, root + 24 + ch[2])
  }
  // twinkles over the outro
  for (let i = 0; i < 7; i++) pluck(groovEnd + i * b * 0.25, root + 24 + [0, 3, 7, 10, 12, 15, 19][i])

  const buf = await ac.startRendering()
  return buf
}

/** AudioBuffer → 16-bit WAV bytes */
export function wav(buf) {
  const ch = buf.numberOfChannels, sr = buf.sampleRate, n = buf.length
  const out = new DataView(new ArrayBuffer(44 + n * ch * 2))
  const str = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)))
  str(0, 'RIFF'); out.setUint32(4, 36 + n * ch * 2, true); str(8, 'WAVE'); str(12, 'fmt ')
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, ch, true)
  out.setUint32(24, sr, true); out.setUint32(28, sr * ch * 2, true); out.setUint16(32, ch * 2, true); out.setUint16(34, 16, true)
  str(36, 'data'); out.setUint32(40, n * ch * 2, true)
  const data = Array.from({ length: ch }, (_, c) => buf.getChannelData(c))
  let o = 44
  for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) { out.setInt16(o, clamp(data[c][i], -1, 1) * 0x7fff, true); o += 2 }
  return new Uint8Array(out.buffer)
}
