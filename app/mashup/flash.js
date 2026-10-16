// "Flash" style: one line of text held on screen while colour-treated pictures
// flicker underneath every sixteenth note, in a loop that repeats seamlessly.
import { loadFonts, loadImage, rng, hash, drawCover, canvas, grainTile, alignMark, spaced, clamp } from './engine.js'

export const SIZES = {
  '9:16': [1080, 1920],
  '4:5': [1080, 1350],
  '1:1': [1080, 1080],
  '6:5': [1080, 900],
}

const RED = '#e8504f'
const BLUE = '#2f5cf0'
const INK = '#0e0c14'
const PAPER = '#f3eee4'

const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

/** colour treatments, applied once per picture and cached */
const TREATMENTS = {
  natural: { weight: 2 },
  duotone: { weight: 3 },
  blueprint: { weight: 3 },
  poster: { weight: 3 },
  invert: { weight: 1.5 },
  xerox: { weight: 1.5 },
  posterize: { weight: 2 },
}
const TREAT_KEYS = Object.keys(TREATMENTS)
const TREAT_TOTAL = TREAT_KEYS.reduce((a, k) => a + TREATMENTS[k].weight, 0)
function pickTreatment(r) {
  let x = r() * TREAT_TOTAL
  for (const k of TREAT_KEYS) { x -= TREATMENTS[k].weight; if (x <= 0) return k }
  return 'natural'
}

const treatCache = new Map()
function treated(img, kind, pal) {
  const key = `${img.src}|${kind}|${pal.color}`
  if (treatCache.has(key)) return treatCache.get(key)
  const w = Math.min(720, img.width), h = Math.round((w * img.height) / img.width)
  const c = canvas(w, h)
  const g = c.getContext('2d', { willReadFrequently: true })
  g.drawImage(img, 0, 0, w, h)
  const d = g.getImageData(0, 0, w, h)
  const p = d.data
  const dark = hex(pal.dark), light = hex(pal.light), col = hex(pal.color)
  const red = hex(RED), blue = hex(BLUE), ink = hex(INK), paper = hex(PAPER)
  const navy = [6, 14, 70], sky = [170, 214, 255]
  const r = rng(hash(key))
  for (let i = 0; i < p.length; i += 4) {
    let R = p[i], G = p[i + 1], B = p[i + 2]
    const l = (0.299 * R + 0.587 * G + 0.114 * B) / 255
    let o
    switch (kind) {
      case 'natural': {
        // punchier: contrast and saturation up
        const k = 1.3, s = 1.35, m = l * 255
        o = [R, G, B].map((v) => clamp(((m + (v - m) * s) - 128) * k + 128, 0, 255))
        break
      }
      case 'duotone': {
        const t = clamp((l - 0.08) * 1.4)
        o = t < 0.5 ? mix(dark, col, t * 2) : mix(col, light, (t - 0.5) * 2)
        break
      }
      case 'blueprint':
        o = mix(navy, sky, clamp((l - 0.1) * 1.5))
        if (l > 0.82) o = [255, 255, 255]
        break
      case 'poster':
        o = l < 0.3 ? ink : l < 0.68 ? red : paper
        break
      case 'invert':
        o = [255 - R, 255 - G * 0.95, 255 - B * 0.8]
        o = mix(o, blue, 0.25)
        break
      case 'xerox':
        o = l + (r() - 0.5) * 0.35 > 0.48 ? paper : ink
        break
      case 'posterize': {
        const q = (v) => Math.round(clamp((v - 128) * 1.5 + 128, 0, 255) / 127.5) * 127.5
        o = [q(R), q(G), q(B)]
        break
      }
    }
    p[i] = o[0]; p[i + 1] = o[1]; p[i + 2] = o[2]
  }
  g.putImageData(d, 0, 0)
  treatCache.set(key, c)
  return c
}

/** thin white line drawings laid over some frames */
function geometry(ctx, kind, cx, cy, s, t) {
  if (kind === 'seed') { alignMark(ctx, cx, cy, s / 90, 2, t); return }
  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'
  ctx.lineWidth = 2.5
  if (kind === 'circle-square') {
    ctx.beginPath(); ctx.arc(cx, cy, s * 0.5, 0, 6.283); ctx.stroke()
    ctx.strokeRect(cx - s * 0.44, cy - s * 0.44, s * 0.88, s * 0.88)
  } else if (kind === 'eye') {
    ctx.beginPath()
    ctx.moveTo(cx - s * 0.5, cy)
    ctx.quadraticCurveTo(cx, cy - s * 0.38, cx + s * 0.5, cy)
    ctx.quadraticCurveTo(cx, cy + s * 0.38, cx - s * 0.5, cy)
    ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, s * 0.13, 0, 6.283); ctx.stroke()
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * 6.283
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * s * 0.58, cy + Math.sin(a) * s * 0.42)
      ctx.lineTo(cx + Math.cos(a) * s * 0.7, cy + Math.sin(a) * s * 0.52)
      ctx.stroke()
    }
  }
  ctx.restore()
}

function wrap(ctx, text, maxW) {
  const lines = []
  let line = ''
  for (const w of text.split(/\s+/)) {
    const next = line ? `${line} ${w}` : w
    if (ctx.measureText(next).width > maxW && line) { lines.push(line); line = w } else line = next
  }
  if (line) lines.push(line)
  return lines
}

/**
 * opts: bpm, fps, size ('9:16' | '4:5' | '1:1' | '6:5'), seconds (length), cuts (unique pictures per loop)
 */
export async function createFlash(spec, { bpm = 113, fps = 30, size = '9:16', seconds = 8, cuts = 24, fontBase } = {}) {
  await loadFonts(fontBase)
  const [Wd, Ht] = SIZES[size] || SIZES['9:16']
  const beat = 60 / bpm
  const cut = beat / 4
  const duration = Math.max(4, Math.round(seconds / beat)) * beat
  const seed = hash(spec.id + '|flash')
  const pal = { color: spec.color, light: spec.light, dark: spec.dark }

  const imgs = (await Promise.all((spec.pool || []).map(loadImage))).filter(Boolean)
  if (!imgs.length) throw new Error(`No pictures for "${spec.id}"`)

  // plan one loop of cuts; the video repeats it, like the reference reel
  const plan = []
  const deck = []
  const draw = (r) => {
    if (!deck.length) deck.push(...imgs.map((_, i) => i).sort(() => r() - 0.5))
    return imgs[deck.pop()]
  }
  for (let k = 0; k < cuts; k++) {
    const r = rng(hash(`${spec.id}|${k}`))
    if (k > 2 && !plan[k - 1].blank && r() < 0.07) { plan.push({ blank: r() < 0.6 ? PAPER : RED }); continue }
    const f = {
      img: draw(r), treat: pickTreatment(r),
      zoom: 1 + r() * 0.6, fx: r(), fy: r() * 0.8 + 0.1,
    }
    if (r() < 0.38) {
      const w = Wd * (0.32 + r() * 0.3)
      f.pip = {
        img: draw(r), treat: pickTreatment(r), w, h: w * (0.7 + r() * 0.6),
        x: r() * (Wd - w), y: Ht * (0.08 + r() * 0.6), border: r() < 0.5,
      }
    }
    if (r() < 0.22) f.strip = { img: draw(r), treat: pickTreatment(r), y: r() * Ht * 0.8, h: Ht * (0.12 + r() * 0.2) }
    if (r() < 0.2) f.geo = { kind: ['circle-square', 'seed', 'eye'][Math.floor(r() * 3)], x: Wd * (0.3 + r() * 0.4), y: Ht * (0.3 + r() * 0.4), s: Math.min(Wd, Ht) * (0.45 + r() * 0.35) }
    plan.push(f)
  }
  // warm the cache so frames render at an even pace
  for (const f of plan) {
    if (f.img) treated(f.img, f.treat, pal)
    if (f.pip) treated(f.pip.img, f.pip.treat, pal)
    if (f.strip) treated(f.strip.img, f.strip.treat, pal)
  }

  // caption: bold condensed, white, centred, held the whole time
  const quote = spec.quote || spec.title
  const fontSize = Math.round(Wd * 0.071)
  const textFont = `600 ${fontSize}px "Barlow Semi Condensed", "Inter", system-ui, sans-serif`

  function render(ctx, t) {
    t = clamp(t, 0, duration - 1e-6)
    const idx = Math.floor(t / cut)
    const f = plan[idx % plan.length]
    const r = rng(seed + idx)
    if (f.blank) {
      ctx.fillStyle = f.blank
      ctx.fillRect(0, 0, Wd, Ht)
    } else {
      // tiny drift so a held cut never looks frozen
      const drift = 1 + ((t % cut) / cut) * 0.02
      drawCover(ctx, treated(f.img, f.treat, pal), 0, 0, Wd, Ht, f.zoom * drift, f.fx, f.fy)
      if (f.strip) {
        ctx.save()
        ctx.beginPath(); ctx.rect(0, f.strip.y, Wd, f.strip.h); ctx.clip()
        drawCover(ctx, treated(f.strip.img, f.strip.treat, pal), 0, f.strip.y - Ht * 0.2, Wd, f.strip.h + Ht * 0.4, 1.2)
        ctx.restore()
      }
      if (f.pip) {
        const p = f.pip
        ctx.save()
        ctx.beginPath(); ctx.rect(p.x, p.y, p.w, p.h); ctx.clip()
        drawCover(ctx, treated(p.img, p.treat, pal), p.x, p.y, p.w, p.h, 1.1)
        ctx.restore()
        if (p.border) {
          ctx.strokeStyle = 'rgba(255,255,255,0.9)'
          ctx.lineWidth = 3
          ctx.strokeRect(p.x, p.y, p.w, p.h)
        }
      }
      if (f.geo) geometry(ctx, f.geo.kind, f.geo.x, f.geo.y, f.geo.s, t)
      // occasional sideways tear, like a bad scan
      if (r() < 0.25) {
        const y = r() * Ht, h = 8 + r() * 60, dx = (r() - 0.5) * 80
        ctx.drawImage(ctx.canvas, 0, y, Wd, h, dx, y, Wd, h)
      }
    }

    // grain
    ctx.save()
    ctx.globalAlpha = 0.12
    ctx.globalCompositeOperation = 'overlay'
    ctx.translate(-r() * 256, -r() * 256)
    ctx.fillStyle = ctx.createPattern(grainTile(), 'repeat')
    ctx.fillRect(0, 0, Wd + 256, Ht + 256)
    ctx.restore()

    // the line
    ctx.save()
    ctx.font = textFont
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const lines = wrap(ctx, quote, Wd * 0.72)
    const lh = fontSize * 1.08
    const y0 = Ht * (Ht > Wd * 1.4 ? 0.44 : 0.5) - ((lines.length - 1) * lh) / 2
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0,0,0,0.55)'
    ctx.shadowBlur = fontSize * 0.18
    ctx.shadowOffsetY = fontSize * 0.03
    lines.forEach((line, i) => ctx.fillText(line, Wd / 2, y0 + i * lh))
    ctx.restore()

    // brand tag
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `700 ${Math.round(Wd * 0.022)}px "Space Mono", monospace`
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.shadowColor = 'rgba(0,0,0,0.6)'
    ctx.shadowBlur = 8
    spaced(ctx, '✦ ALIGN ✦', Wd / 2, Ht * (Ht > Wd * 1.4 ? 0.86 : 0.92), 0.3, Math.round(Wd * 0.022))
    ctx.restore()
  }

  return {
    style: 'flash', width: Wd, height: Ht, duration, fps, bpm, beat,
    dropAt: 4 * beat, frames: Math.round(duration * fps), draw: render,
    loop: plan.length * cut,
  }
}
