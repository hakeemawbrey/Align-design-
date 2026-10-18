// Procedural canvas textures: rock, water, grass, sand, snow, tiles, checker,
// skies. Small and soft, the way a 1998 game would have shipped them.
import * as THREE from 'three'
import { makeNoise } from './rng.js'

function canvas(w, h = w) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function toTexture(c, repeat = 1) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat, repeat)
  t.anisotropy = 2
  return t
}

const hex = (c) => new THREE.Color(c)

// Paints fbm noise between two colours, plus optional dark streaks.
function noisePaint(seed, size, c0, c1, { scale = 6, oct = 5, contrast = 1.4, streak = 0, speck = 0 } = {}) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  const { fbm, noise } = makeNoise(seed)
  const a = hex(c0), b = hex(c1)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // tileable: sample a torus-ish blend of four corners
      const u = x / size, v = y / size
      const n00 = fbm(u * scale, v * scale, oct)
      const n10 = fbm((u - 1) * scale, v * scale, oct)
      const n01 = fbm(u * scale, (v - 1) * scale, oct)
      const n11 = fbm((u - 1) * scale, (v - 1) * scale, oct)
      let n = n00 * (1 - u) * (1 - v) + n10 * u * (1 - v) + n01 * (1 - u) * v + n11 * u * v
      n = Math.min(1, Math.max(0, (n - 0.5) * contrast + 0.5))
      if (streak) {
        const s = Math.abs(Math.sin((u * 3 + noise(u * 8, v * 8) * 2) * Math.PI * 2))
        n *= 1 - streak * Math.pow(1 - s, 8)
      }
      if (speck && noise(x * 0.9, y * 0.9) > 1 - speck) n = Math.min(1, n + 0.35)
      const i = (y * size + x) * 4
      img.data[i] = (a.r + (b.r - a.r) * n) * 255
      img.data[i + 1] = (a.g + (b.g - a.g) * n) * 255
      img.data[i + 2] = (a.b + (b.b - a.b) * n) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

export function rockTexture(seed, dark = '#15171c', light = '#7d808a', repeat = 6) {
  return toTexture(noisePaint(seed + 'rock', 256, dark, light, { scale: 5, contrast: 2.2, streak: 0.6, speck: 0.04 }), repeat)
}

export function waterTexture(seed, deep = '#0b2c8a', shallow = '#3d7cff', repeat = 3) {
  return toTexture(noisePaint(seed + 'water', 256, deep, shallow, { scale: 4, contrast: 1.8, speck: 0.08 }), repeat)
}

export function grassTexture(seed, repeat = 10) {
  return toTexture(noisePaint(seed + 'grass', 128, '#2f7d1f', '#8fdc4a', { scale: 9, contrast: 1.5, speck: 0.1 }), repeat)
}

export function sandTexture(seed, a = '#b8562a', b = '#ffb070', repeat = 8) {
  return toTexture(noisePaint(seed + 'sand', 128, a, b, { scale: 7, contrast: 1.2, streak: 0.25 }), repeat)
}

export function snowTexture(seed, repeat = 8) {
  return toTexture(noisePaint(seed + 'snow', 128, '#a9bfe6', '#ffffff', { scale: 6, contrast: 1.1 }), repeat)
}

export function tileTexture(base = '#e9f3f7', grout = '#9fb6c2', n = 8, repeat = 6) {
  const s = 256
  const c = canvas(s)
  const ctx = c.getContext('2d')
  ctx.fillStyle = grout
  ctx.fillRect(0, 0, s, s)
  const w = s / n
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const k = ((x * 7 + y * 13) % 5) / 40
      ctx.fillStyle = base
      ctx.globalAlpha = 1 - k
      ctx.fillRect(x * w + 1.5, y * w + 1.5, w - 3, w - 3)
    }
  }
  ctx.globalAlpha = 1
  return toTexture(c, repeat)
}

export function checkerTexture(a = '#111', b = '#eee', n = 2, repeat = 20) {
  const s = 64
  const c = canvas(s)
  const ctx = c.getContext('2d')
  const w = s / n
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      ctx.fillStyle = (x + y) % 2 ? a : b
      ctx.fillRect(x * w, y * w, w, w)
    }
  }
  const t = toTexture(c, repeat)
  t.magFilter = THREE.NearestFilter
  return t
}

// A vertical sky gradient, optionally with soft clouds, painted on the inside
// of a big sphere.
export function skyTexture(seed, stops, { clouds = 0, stars = 0, cloudColor = '#ffffff' } = {}) {
  const w = 512, h = 256
  const c = canvas(w, h)
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, h)
  for (const [at, col] of stops) g.addColorStop(at, col)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  const { fbm, noise } = makeNoise(seed + 'sky')
  if (stars) {
    for (let i = 0; i < stars; i++) {
      const x = noise(i * 1.7, 3.1) * w * 3 % w
      const y = noise(5.3, i * 2.3) * h * 0.55
      const r = 0.4 + noise(i, i) * 1.1
      ctx.fillStyle = `rgba(255,255,255,${0.4 + noise(i * 3, 1) * 0.6})`
      ctx.fillRect(x, y, r, r)
    }
  }
  if (clouds) {
    const img = ctx.getImageData(0, 0, w, h)
    const cc = new THREE.Color(cloudColor)
    for (let y = 0; y < h * 0.62; y++) {
      for (let x = 0; x < w; x++) {
        const u = x / w
        // wrap horizontally
        const n = fbm(Math.cos(u * Math.PI * 2) * 3 + 10, y / 40 + Math.sin(u * Math.PI * 2) * 3, 5)
        let a = Math.max(0, (n - (0.62 - clouds * 0.18)) * 3.2)
        a *= Math.min(1, (h * 0.62 - y) / 40)
        a = Math.min(0.92, a)
        const i = (y * w + x) * 4
        img.data[i] += (cc.r * 255 - img.data[i]) * a
        img.data[i + 1] += (cc.g * 255 - img.data[i + 1]) * a
        img.data[i + 2] += (cc.b * 255 - img.data[i + 2]) * a
      }
    }
    ctx.putImageData(img, 0, 0)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = THREE.RepeatWrapping
  return t
}

// A round soft glow, used for moons, suns, lamps and sparkles.
export function glowTexture(inner = '#ffffff', outer = 'rgba(255,255,255,0)', disc = 0.45) {
  const s = 128
  const c = canvas(s)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, inner)
  g.addColorStop(disc, inner)
  g.addColorStop(Math.min(0.99, disc + 0.08), outer.replace(/[\d.]+\)$/, '0.35)'))
  g.addColorStop(1, outer)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// ---------------------------------------------------------------- extra worlds

// Yellowed backrooms wallpaper: faint vertical stripes, a tiny chevron motif,
// and blotchy damp stains.
export function wallpaperTexture(seed, base = '#d9c36a', ink = '#b9a24a', repeat = 1) {
  const s = 256
  const c = noisePaint(seed + 'wall', s, ink, base, { scale: 3, oct: 4, contrast: 0.7 })
  const ctx = c.getContext('2d')
  ctx.globalAlpha = 0.28
  ctx.fillStyle = ink
  for (let x = 0; x < s; x += 32) {
    ctx.fillRect(x + 2, 0, 3, s)
    ctx.fillRect(x + 9, 0, 1, s)
  }
  ctx.globalAlpha = 0.22
  ctx.strokeStyle = ink
  ctx.lineWidth = 1.5
  for (let y = 8; y < s; y += 32) {
    for (let x = 16; x < s; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x + 4, y - 4)
      ctx.lineTo(x + 10, y + 2)
      ctx.lineTo(x + 16, y - 4)
      ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
  return toTexture(c, repeat)
}

export function carpetTexture(seed, a = '#7d6a33', b = '#b39d5a', repeat = 10) {
  return toTexture(noisePaint(seed + 'carpet', 128, a, b, { scale: 22, oct: 3, contrast: 1.6, speck: 0.06 }), repeat)
}

export function moonDustTexture(seed, a = '#55555c', b = '#c9c9cf', repeat = 10) {
  return toTexture(noisePaint(seed + 'moon', 256, a, b, { scale: 8, oct: 5, contrast: 1.5, speck: 0.05 }), repeat)
}

// Big glazed mall tiles: cream squares with an accent colour every other row
// set diagonally, wide grout.
export function mallTileTexture(base = '#efe3c8', accent = '#d98c6a', grout = '#a89474', repeat = 10) {
  const s = 256
  const c = canvas(s)
  const ctx = c.getContext('2d')
  ctx.fillStyle = grout
  ctx.fillRect(0, 0, s, s)
  const n = 4, w = s / n
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      ctx.fillStyle = (x + y) % 4 === 0 ? accent : base
      ctx.globalAlpha = 1 - ((x * 5 + y * 3) % 4) / 30
      ctx.fillRect(x * w + 2, y * w + 2, w - 4, w - 4)
    }
  }
  ctx.globalAlpha = 1
  return toTexture(c, repeat)
}

// A strip of empty shopfronts: coloured fascia bands, dark glass with a soft
// reflection, a door in each. No words anywhere.
export function storefrontTexture(seed, units = 4, wall = '#e8dcc0') {
  const w = 512, h = 256
  const c = canvas(w, h)
  const ctx = c.getContext('2d')
  const { noise } = makeNoise(seed + 'shops')
  ctx.fillStyle = wall
  ctx.fillRect(0, 0, w, h)
  const uw = w / units
  const bands = ['#2f7f7a', '#c4485a', '#5a5fb8', '#d9a03a', '#3a8f5a', '#8a4fa8']
  for (let i = 0; i < units; i++) {
    const x0 = i * uw + 8
    const ww = uw - 16
    ctx.fillStyle = bands[Math.floor(noise(i * 3.1, 1.7) * bands.length * 1.7) % bands.length]
    ctx.fillRect(x0, 30, ww, 26)
    const lit = noise(i * 1.3, 9.1) > 0.45
    const g = ctx.createLinearGradient(0, 64, 0, h - 10)
    g.addColorStop(0, lit ? '#9fd6d0' : '#2a3a44')
    g.addColorStop(1, lit ? '#e8f4e8' : '#141c22')
    ctx.fillStyle = g
    ctx.fillRect(x0, 64, ww, h - 74)
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.beginPath()
    ctx.moveTo(x0 + ww * 0.15, 64)
    ctx.lineTo(x0 + ww * 0.35, 64)
    ctx.lineTo(x0 + ww * 0.1, h - 10)
    ctx.lineTo(x0 - ww * 0.1 + 10, h - 10)
    ctx.fill()
    ctx.strokeStyle = '#8a8f94'
    ctx.lineWidth = 3
    ctx.strokeRect(x0, 64, ww, h - 74)
    ctx.strokeRect(x0 + ww * 0.38, 110, ww * 0.24, h - 120)
  }
  return toTexture(c, 1)
}

// The earth seen from the moon: a disc of ocean, noisy continents, cloud
// swirls, and a soft night side. Transparent outside the disc.
export function earthTexture(seed) {
  const s = 256
  const c = canvas(s)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(s, s)
  const { fbm } = makeNoise(seed + 'earth')
  const R = s * 0.46
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const dx = (x - s / 2) / R, dy = (y - s / 2) / R
      const d2 = dx * dx + dy * dy
      const i = (y * s + x) * 4
      if (d2 > 1.12) { img.data[i + 3] = 0; continue }
      if (d2 > 1) {
        const a = (1.12 - d2) / 0.12
        img.data[i] = 120; img.data[i + 1] = 170; img.data[i + 2] = 255; img.data[i + 3] = a * a * 160
        continue
      }
      const z = Math.sqrt(1 - d2)
      const u = dx / (z + 0.6), v = dy / (z + 0.6)
      const land = fbm(u * 3 + 4, v * 3 + 1, 5)
      const cloud = fbm(u * 5 + 20, v * 9 + 7, 4)
      let r = 30, g = 80, b = 190
      if (land > 0.55) { r = 70 + land * 80; g = 130 + land * 40; b = 60 }
      if (land > 0.68) { r = 190; g = 170; b = 120 }
      const cl = Math.max(0, Math.min(1, (cloud - 0.5) * 4))
      r += (250 - r) * cl; g += (250 - g) * cl; b += (255 - b) * cl
      const light = Math.max(0.12, Math.min(1, (dx * -0.6 + dy * -0.3 + z * 0.75) * 1.4 + 0.2))
      img.data[i] = r * light
      img.data[i + 1] = g * light
      img.data[i + 2] = b * light
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}
