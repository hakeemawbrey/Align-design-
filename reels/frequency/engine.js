// Align frequency reels: hypnotic 3D scenes, each scored with tones taken
// from the real sky (a planet's cycle, raised by octaves until you can hear
// it). Drawn in three.js inside Chromium. Every frame is a pure function of
// time t: window.setup(script, assets) once, then window.frame(t).
//
// Four modes, one per kind of reel:
//   planets   the seven classical planets click into one line, a tone each
//   gates     a fly-through of twelve sign gates, each its element's symbol
//   channels  Venus (left ear) and the Moon (right ear) braid up a column
//   heart     two triangles meet in a twelve-petal lotus at 639 Hz
//
// The engine also writes the sound: setup() returns a cue list that
// score.py turns into audio, so picture and sound share one clock.

import * as THREE from 'three'

let S // everything the frame function needs

const W = 1080
const H = 1920
const FPS = 30

// Align's Stardust palette (app/src/index.css)
const VOID = '#0b0620'
const CANVAS = '#140a2e'
const BONE = '#efe6d6'
const LABEL2 = '#b3a6c4'
const LABEL3 = '#7d6f94'
const GOLD = '#f2c75c'
const ROSE = '#e8628a'
const SPARK = '#7fd8b0'
const VIOLET = '#9a7be0'
const SILVER = '#bcd2f2'

// ── the cosmic octave ───────────────────────────────────────────────────────
// A cycle of P days is 1 / (P × 86400) Hz. Doubling it n times keeps it the
// same tone (an octave) and brings it up into hearing.
const DAY = 86400
const tone = (days, octaves) => (2 ** octaves) / (days * DAY)
const CYCLE = {
  sun: [365.24219, 32, 'one year, the sun round the zodiac'],
  moon: [29.530589, 29, 'one moon, new to new'],
  mercury: [87.969, 30, 'one orbit'],
  venus: [224.701, 32, 'one orbit'],
  mars: [686.98, 33, 'one orbit'],
  jupiter: [4332.59, 36, 'one orbit'],
  saturn: [10759.22, 37, 'one orbit'],
}
const HZ = Object.fromEntries(Object.entries(CYCLE).map(([k, [d, n]]) => [k, tone(d, n)]))
const hz2 = (x) => x.toFixed(2)

// ── small helpers ───────────────────────────────────────────────────────────
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const easeIO = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const lerp = (a, b, u) => a + (b - a) * u
const span = (t, a, b) => clamp((t - a) / (b - a))
// 0 → 1 → 0 across [a, b] with soft edges of f seconds
const window01 = (t, a, b, f = 0.4) => Math.min(span(t, a - 0.001, a + f), 1 - span(t, b - f, b + 0.001))
const pulse = (t, at, k = 6) => (t < at ? 0 : Math.exp(-(t - at) * k))
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t }
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
const glyph = (s) => GLYPH[s] + '︎'
// Traditional rulers: only the seven planets you can see.
const RULER = { aries: 'mars', taurus: 'venus', gemini: 'mercury', cancer: 'moon', leo: 'sun', virgo: 'mercury', libra: 'venus', scorpio: 'mars', sagittarius: 'jupiter', capricorn: 'saturn', aquarius: 'saturn', pisces: 'jupiter' }
const ELEMENT = ['fire', 'earth', 'air', 'water']
const ELEMENT_COLOR = { fire: '#f3a46b', earth: SPARK, air: '#cdb8ff', water: '#86bdf0' }
// bring a tone into a comfortable register for a chime (about 260 to 520 Hz)
const chimeHz = (f) => { while (f < 260) f *= 2; while (f > 520) f /= 2; return f }

const additive = (color, opacity = 1, extra = {}) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, ...extra })
function sprite(map, color, scale, opacity = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }))
  s.scale.setScalar(scale)
  return s
}

// ── textures ────────────────────────────────────────────────────────────────
function glowTexture() {
  const [c, x] = canvas(256, 256)
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.12, 'rgba(255,255,255,0.55)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.16)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.04)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 256, 256)
  return tex(c)
}
function ringTexture() {
  const [c, x] = canvas(256, 256)
  const g = x.createRadialGradient(128, 128, 80, 128, 128, 126)
  g.addColorStop(0, 'rgba(255,255,255,0)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.9)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 256, 256)
  return tex(c)
}
// Align's four-point star (✦)
function starTexture() {
  const [c, x] = canvas(512, 512)
  const g = x.createRadialGradient(256, 256, 0, 256, 256, 256)
  g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(0.4, 'rgba(255,255,255,0.08)'); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, 512, 512)
  x.translate(256, 256)
  const star = (R, r) => {
    x.beginPath()
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 - Math.PI / 2
      const b = a + Math.PI / 4
      if (i === 0) x.moveTo(Math.cos(a) * R, Math.sin(a) * R)
      x.quadraticCurveTo(Math.cos(b) * r, Math.sin(b) * r, Math.cos(a + Math.PI / 2) * R, Math.sin(a + Math.PI / 2) * R)
    }
    x.closePath(); x.fill()
  }
  x.fillStyle = 'rgba(255,255,255,0.35)'; star(250, 30)
  x.fillStyle = 'rgba(255,255,255,1)'; star(200, 16)
  return tex(c)
}
// a soft vertical beam: bright core, gaussian falloff across
function beamTexture() {
  const [c, x] = canvas(128, 512)
  for (let i = 0; i < 128; i++) {
    const d = (i - 63.5) / 64
    const a = Math.exp(-d * d * 60) * 0.95 + Math.exp(-d * d * 6) * 0.25
    x.fillStyle = `rgba(255,255,255,${a})`; x.fillRect(i, 0, 1, 512)
  }
  // fade the ends
  x.globalCompositeOperation = 'destination-in'
  const g = x.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.06, 'rgba(0,0,0,1)'); g.addColorStop(0.94, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = g; x.fillRect(0, 0, 128, 512)
  return tex(c)
}
function glyphTexture(ch, color, size = 256) {
  const [c, x] = canvas(size, size)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `${size * 0.62}px "DejaVu Sans", sans-serif`
  x.shadowColor = color; x.shadowBlur = size * 0.08
  x.fillStyle = color; x.fillText(ch, size / 2, size / 2 + size * 0.03)
  x.shadowBlur = 0; x.fillStyle = 'rgba(255,255,255,0.75)'
  x.font = `${size * 0.6}px "DejaVu Sans", sans-serif`
  x.fillText(ch, size / 2, size / 2 + size * 0.03)
  return tex(c)
}
// value noise on a canvas, for planet surfaces
function noiseField(w, h, R, cells) {
  const g = Array.from({ length: (cells + 1) * (cells + 1) }, () => R())
  const at = (i, j) => g[(j % cells) * (cells + 1) + (i % cells)]
  return (u, v) => {
    const x = u * cells; const y = v * cells
    const i = Math.floor(x); const j = Math.floor(y)
    const fx = x - i; const fy = y - j
    const sx = fx * fx * (3 - 2 * fx); const sy = fy * fy * (3 - 2 * fy)
    return lerp(lerp(at(i, j), at(i + 1, j), sx), lerp(at(i, j + 1), at(i + 1, j + 1), sx), sy)
  }
}
function planetTexture(kind, seed) {
  const R = rng(seed)
  const w = 512; const h = 256
  const [c, x] = canvas(w, h)
  const img = x.createImageData(w, h)
  const n1 = noiseField(w, h, R, 8); const n2 = noiseField(w, h, R, 24); const n3 = noiseField(w, h, R, 64)
  const pal = {
    moon: [[150, 152, 170], [214, 218, 232]],
    mercury: [[110, 128, 132], [186, 204, 200]],
    venus: [[220, 170, 160], [250, 226, 206]],
    sun: [[242, 160, 60], [255, 236, 170]],
    mars: [[150, 62, 44], [226, 128, 86]],
    jupiter: [[176, 120, 82], [242, 214, 176]],
    saturn: [[190, 162, 112], [240, 224, 182]],
  }[kind]
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const u = i / w; const v = j / h
      let k
      if (kind === 'jupiter' || kind === 'saturn') {
        const band = Math.sin(v * (kind === 'jupiter' ? 34 : 26) + n1(u, v) * 2.4) * 0.5 + 0.5
        k = band * 0.7 + n2(u, v) * 0.2 + n3(u, v) * 0.1
      } else if (kind === 'venus') {
        k = (Math.sin(v * 12 + n1(u, v) * 5) * 0.5 + 0.5) * 0.5 + n2(u, v) * 0.5
      } else if (kind === 'sun') {
        k = n2(u, v) * 0.5 + n3(u, v) * 0.5
      } else {
        k = n1(u, v) * 0.5 + n2(u, v) * 0.3 + n3(u, v) * 0.2
      }
      const p = (j * w + i) * 4
      for (let ch = 0; ch < 3; ch++) img.data[p + ch] = lerp(pal[0][ch], pal[1][ch], k)
      img.data[p + 3] = 255
    }
  }
  x.putImageData(img, 0, 0)
  if (kind === 'moon' || kind === 'mercury') {
    for (let i = 0; i < 70; i++) {
      const cx = R() * w; const cy = h * 0.12 + R() * h * 0.76; const r = 3 + R() ** 2 * 18
      x.fillStyle = `rgba(40,40,60,${0.12 + R() * 0.16})`; x.beginPath(); x.ellipse(cx, cy, r * 1.6, r, 0, 0, 7); x.fill()
      x.fillStyle = 'rgba(255,255,255,0.08)'; x.beginPath(); x.ellipse(cx - r * 0.3, cy - r * 0.2, r * 1.2, r * 0.7, 0, 0, 7); x.fill()
    }
  }
  if (kind === 'mars') { x.fillStyle = 'rgba(255,245,240,0.75)'; x.fillRect(0, 0, w, 10); x.fillRect(0, h - 8, w, 8) }
  if (kind === 'jupiter') {
    x.fillStyle = 'rgba(190,80,60,0.6)'; x.beginPath(); x.ellipse(w * 0.62, h * 0.64, 26, 13, 0, 0, 7); x.fill()
  }
  return tex(c)
}
function ringBandsTexture() {
  const [c, x] = canvas(512, 512)
  const R = rng(7)
  for (let r = 256; r > 0; r -= 2) {
    const u = r / 256
    const inBand = u > 0.64 && u < 0.99
    const a = inBand ? (0.25 + R() * 0.5) * (u > 0.8 && u < 0.83 ? 0.1 : 1) : 0
    x.fillStyle = `rgba(236,220,180,${a})`
    x.beginPath(); x.arc(256, 256, r, 0, 7); x.fill()
    x.globalCompositeOperation = 'source-over'
  }
  return tex(c)
}
function backgroundTexture(seed, tint) {
  const [c, x] = canvas(W / 2, H / 2)
  const g = x.createLinearGradient(0, 0, 0, H / 2)
  g.addColorStop(0, VOID); g.addColorStop(0.55, CANVAS); g.addColorStop(1, '#1b0f3a')
  x.fillStyle = g; x.fillRect(0, 0, W / 2, H / 2)
  const R = rng(seed)
  // soft nebula clouds
  for (let i = 0; i < 9; i++) {
    const cx = R() * W / 2; const cy = R() * H / 2; const r = 140 + R() * 260
    const col = [tint, VIOLET, '#3a2470'][i % 3]
    const ng = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    ng.addColorStop(0, col + '22'); ng.addColorStop(1, col + '00')
    x.fillStyle = ng; x.fillRect(0, 0, W / 2, H / 2)
  }
  return tex(c)
}
function starfield(S, count, rMin, rMax, seed, size = 0.5) {
  const R = rng(seed)
  const pos = new Float32Array(count * 3); const col = new Float32Array(count * 3)
  const tints = [new THREE.Color(BONE), new THREE.Color(LABEL2), new THREE.Color('#f2d58a'), new THREE.Color('#cdb8ff')]
  for (let i = 0; i < count; i++) {
    const u = R() * 2 - 1; const a = R() * Math.PI * 2; const r = lerp(rMin, rMax, R())
    const s = Math.sqrt(1 - u * u)
    pos.set([Math.cos(a) * s * r, u * r, Math.sin(a) * s * r], i * 3)
    const c = tints[Math.floor(R() * tints.length)].clone().multiplyScalar(0.35 + R() * 0.65)
    col.set([c.r, c.g, c.b], i * 3)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const m = new THREE.Points(geo, new THREE.PointsMaterial({ size, map: S.glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }))
  S.scene.add(m)
  return m
}
// a glowing line along points: a bright core tube and two soft halos
function outline(pts, color, { core = 0.035, closed = true, glow = 1, halo = [4, 10] } = {}) {
  const path = new THREE.CurvePath()
  const P = closed ? [...pts, pts[0]] : pts
  for (let i = 0; i < P.length - 1; i++) path.add(new THREE.LineCurve3(P[i], P[i + 1]))
  const segs = (P.length - 1) * 28
  const g = new THREE.Group()
  const mats = [
    additive(new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.55), 1),
    additive(color, 0.32 * glow),
    additive(color, 0.1 * glow),
  ]
  ;[core, core * halo[0], core * halo[1]].forEach((r, i) => g.add(new THREE.Mesh(new THREE.TubeGeometry(path, segs, r, 8, false), mats[i])))
  g.userData.mats = mats
  g.userData.base = mats.map((m) => m.opacity)
  return g
}
const setGlow = (g, k) => g.userData.mats.forEach((m, i) => { m.opacity = g.userData.base[i] * k })
const polygon = (n, r, rot = 0) => Array.from({ length: n }, (_, i) => { const a = rot + (i / n) * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0) })

// ── 2D type ─────────────────────────────────────────────────────────────────
const SERIF = '"EB Garamond", serif'
const MONO = '"Space Mono", monospace'
const spaced = (s) => s.toUpperCase().split('').join(' ')

// Wrap a line and draw it centred. *word* is drawn in gold.
function drawLine(o, text, y, size, alpha, { color = BONE, maxW = 930, font = SERIF, italic = true, weight = 500 } = {}) {
  o.save()
  o.globalAlpha = alpha
  o.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`
  o.textBaseline = 'middle'
  const words = text.split(' ').map((w) => ({ w: w.replace(/\*/g, ''), accent: /\*/.test(w) }))
  const space = o.measureText(' ').width
  const rows = [[]]; let rw = 0
  for (const wd of words) {
    const ww = o.measureText(wd.w).width
    if (rows.at(-1).length && rw + space + ww > maxW) { rows.push([]); rw = 0 }
    rows.at(-1).push({ ...wd, ww }); rw += (rows.at(-1).length > 1 ? space : 0) + ww
  }
  // avoid a lone word on the last row
  if (rows.length > 1 && rows.at(-1).length === 1 && rows.at(-2).length > 2) rows.at(-1).unshift(rows.at(-2).pop())
  const lh = size * 1.18
  const y0 = y - ((rows.length - 1) * lh) / 2
  o.shadowColor = 'rgba(5,2,15,0.9)'; o.shadowBlur = size * 0.4
  rows.forEach((row, ri) => {
    const total = row.reduce((s, r) => s + r.ww, 0) + space * (row.length - 1)
    let x = W / 2 - total / 2
    for (const r of row) {
      o.fillStyle = r.accent ? GOLD : color
      o.fillText(r.w, x, y0 + ri * lh)
      x += r.ww + space
    }
  })
  o.restore()
  return rows.length * lh
}
function drawMono(o, text, x, y, size, alpha, { color = LABEL2, align = 'center', weight = 400 } = {}) {
  o.save()
  o.globalAlpha = alpha
  o.font = `${weight} ${size}px ${MONO}`
  o.textAlign = align; o.textBaseline = 'middle'
  o.shadowColor = 'rgba(5,2,15,0.9)'; o.shadowBlur = 14
  o.fillStyle = color; o.fillText(spaced(text), x, y)
  o.restore()
}
function headphones(o, x, y, s, alpha, color = LABEL2) {
  o.save(); o.globalAlpha = alpha; o.strokeStyle = color; o.fillStyle = color; o.lineWidth = s * 0.12; o.lineCap = 'round'
  o.beginPath(); o.arc(x, y + s * 0.1, s * 0.42, Math.PI * 1.05, Math.PI * 1.95); o.stroke()
  const cup = (cx) => { o.beginPath(); o.roundRect(cx - s * 0.12, y, s * 0.24, s * 0.4, s * 0.08); o.fill() }
  cup(x - s * 0.4); cup(x + s * 0.4)
  o.restore()
}
function wordmark(o, alpha) {
  o.save(); o.globalAlpha = alpha
  o.textAlign = 'center'; o.textBaseline = 'middle'
  o.font = `italic 500 46px ${SERIF}`
  o.shadowColor = 'rgba(5,2,15,0.8)'; o.shadowBlur = 16
  o.fillStyle = BONE; o.fillText('align', W / 2 + 14, 196)
  o.font = '26px "DejaVu Sans", sans-serif'; o.fillStyle = GOLD; o.fillText('✦', W / 2 - 52, 192)
  o.restore()
}

// ── mode: planets ───────────────────────────────────────────────────────────
// The seven classical planets orbit loose, then click into one vertical line,
// fastest at the bottom to slowest at the top (the old order of the sky).
function Planets(S) {
  const DUR = 30
  const LOCK0 = 2.4; const STEP = 2.2; const TRAVEL = 1.1
  const THREAD = [16.4, 17.4]
  const ALIGNED = THREAD[1]
  const P = [
    { k: 'moon', r: 0.28, color: '#cfd6ee', play: HZ.moon / 2 },
    { k: 'mercury', r: 0.22, color: '#9fd3c7', play: HZ.mercury },
    { k: 'venus', r: 0.31, color: '#f3b6c4', play: HZ.venus },
    { k: 'sun', r: 0.4, color: GOLD, play: HZ.sun * 2 },
    { k: 'mars', r: 0.26, color: '#ee7a5c', play: HZ.mars * 4 },
    { k: 'jupiter', r: 0.38, color: '#e9b98a', play: HZ.jupiter * 2 },
    { k: 'saturn', r: 0.31, color: '#e2cf9c', play: HZ.saturn / 2 },
  ]
  const lockAt = (i) => LOCK0 + i * STEP
  const SPACE = 0.86
  const slotY = (i) => -SPACE * 3 + i * SPACE
  const LOOK = 0.23
  const R = rng(42)
  const { scene, camera } = S
  camera.fov = 40; camera.updateProjectionMatrix()
  scene.background = backgroundTexture(3, GOLD)
  scene.add(new THREE.AmbientLight('#b8a8e0', 1.1))
  const key = new THREE.DirectionalLight('#fff1dc', 2.6); key.position.set(-4, 5, 9); scene.add(key)
  S.stars = starfield(S, 1600, 30, 70, 9, 0.55)

  // the line they fall into, faint until they're all on it
  const beamTex = beamTexture()
  const Ht = SPACE * 6 + 1.0
  const guide = new THREE.Mesh(new THREE.PlaneGeometry(0.5, Ht), additive(LABEL2, 0.16, { map: beamTex }))
  scene.add(guide)
  const thread = new THREE.Mesh(new THREE.PlaneGeometry(0.9, Ht), additive(GOLD, 0, { map: beamTex }))
  scene.add(thread)
  const flare = sprite(S.star, '#fff1c8', 1.6, 0); flare.position.set(0, slotY(3), 0.6); scene.add(flare)
  const bloom = sprite(S.glow, GOLD, 8, 0); bloom.position.set(0, slotY(3), 0); scene.add(bloom)

  for (const [i, p] of P.entries()) {
    p.g = new THREE.Group()
    const mat = p.k === 'sun' ? new THREE.MeshBasicMaterial({ map: planetTexture('sun', 5) }) : new THREE.MeshLambertMaterial({ map: planetTexture(p.k, 10 + i) })
    p.mesh = new THREE.Mesh(new THREE.SphereGeometry(p.r, 48, 32), mat)
    p.mesh.rotation.z = (R() - 0.5) * 0.5
    p.g.add(p.mesh)
    if (p.k === 'saturn') {
      const ring = new THREE.Mesh(new THREE.RingGeometry(p.r * 1.3, p.r * 2.2, 96), new THREE.MeshBasicMaterial({ map: ringBandsTexture(), transparent: true, side: THREE.DoubleSide, depthWrite: false }))
      ring.rotation.set(-1.25, 0.25, 0); p.g.add(ring)
    }
    p.halo = sprite(S.glow, p.color, p.r * (p.k === 'sun' ? 9 : 6), p.k === 'sun' ? 0.75 : 0.42)
    p.g.add(p.halo)
    p.ring = sprite(S.ring, p.color, 1, 0); scene.add(p.ring)
    scene.add(p.g)
    // a loose, tilted orbit round the axis before it locks
    p.orbit = { rad: 1.5 + R() * 1.2, w: (0.35 + R() * 0.35) * (R() < 0.5 ? -1 : 1), ph: R() * 6.28, yc: (R() - 0.5) * 5, tilt: (R() - 0.5) * 0.9 }
  }
  const orbitPos = (p, t) => {
    const o = p.orbit; const a = o.ph + o.w * t
    return new THREE.Vector3(Math.cos(a) * o.rad, o.yc + Math.sin(a) * o.rad * Math.sin(o.tilt), Math.sin(a) * o.rad * Math.cos(o.tilt))
  }

  return {
    duration: DUR,
    stills: [0.2, 2.6, 4.8, 9.2, 15.8, 16.9, 18.0, 21.5, 23.5, 27],
    poster: 22.5,
    update(t) {
      const orbitA = t > ALIGNED ? (t - ALIGNED) * 0.22 * easeOut((t - ALIGNED) / 3) : 0
      const D = 15.5 + 1.2 * easeIO(span(t, 23.5, 26))
      camera.position.set(Math.sin(orbitA) * D, 1.1, Math.cos(orbitA) * D)
      camera.lookAt(0, LOOK, 0)
      const face = Math.atan2(camera.position.x, camera.position.z)
      guide.rotation.y = face; thread.rotation.y = face
      for (const [i, p] of P.entries()) {
        const T = lockAt(i)
        const slot = new THREE.Vector3(0, slotY(i), 0)
        const u = easeIO(span(t, T - TRAVEL, T))
        const pos = orbitPos(p, t).lerp(slot, u)
        p.g.position.copy(pos)
        const pop = pulse(t, T, 7)
        const sing = t > ALIGNED ? 0.12 * Math.sin((t - ALIGNED) * 2.2 + i * 0.9) : 0
        p.g.scale.setScalar(1 + pop * 0.28 + sing * 0.3)
        p.mesh.rotation.y = t * (0.25 + i * 0.03)
        const base = p.k === 'sun' ? 0.75 : 0.42
        p.halo.material.opacity = base * (1 + pop * 1.6 + pulse(t, ALIGNED, 1.4) * 1.5 + (t > T ? 0.2 * Math.sin(t * 2.4 + i) : 0))
        p.ring.position.copy(slot)
        p.ring.scale.setScalar(0.4 + (1 - Math.exp(-(t - T) * 3)) * 2.4)
        p.ring.material.opacity = t > T ? 0.9 * pulse(t, T, 2.6) : 0
      }
      // the gold thread draws down from the top, through all seven
      const g = easeIO(span(t, THREAD[0], THREAD[1]))
      thread.scale.y = Math.max(0.001, g)
      thread.position.y = Ht / 2 - (Ht * g) / 2
      thread.material.opacity = g > 0 ? 0.9 + 0.1 * Math.sin(t * 3) : 0
      guide.material.opacity = 0.16 * (1 - g)
      flare.material.opacity = pulse(t, ALIGNED, 1.1) * 0.95
      flare.material.rotation = t * 0.1
      flare.scale.setScalar(1.6 + pulse(t, ALIGNED, 1.2) * 2.2)
      bloom.material.opacity = pulse(t, ALIGNED, 1.6) * 0.9
      bloom.scale.setScalar(6 + (t - ALIGNED) * 4)
      S.stars.rotation.y = t * 0.01
    },
    overlay(o, t) {
      // a label beside each planet as it clicks in
      for (const [i, p] of P.entries()) {
        const T = lockAt(i)
        const a = ease(span(t, T, T + 0.35)) * (1 - ease(span(t, ALIGNED + 0.3, ALIGNED + 1.1)))
        if (a <= 0) continue
        const v = new THREE.Vector3(0, slotY(i), 0).project(camera)
        const x = ((v.x + 1) / 2) * W; const y = ((1 - v.y) / 2) * H
        const right = i % 2 === 0
        const dx = (right ? 1 : -1) * (p.r * 170 + (p.k === 'saturn' ? 120 : 52))
        drawMono(o, `${p.k} · ${hz2(HZ[p.k])} hz`, x + dx, y, 27, a, { color: BONE, align: right ? 'left' : 'right' })
      }
    },
    cues() {
      const c = [{ kind: 'bed', t0: 0, t1: DUR, gain: 0.05 }]
      for (const [i, p] of P.entries()) {
        const T = lockAt(i)
        c.push({ kind: 'click', t: T, gain: 0.55 })
        c.push({ kind: 'chime', t: T, hz: chimeHz(p.play * 2), gain: 0.22, decay: 2.2 })
        c.push({ kind: 'tone', t0: T, t1: DUR, hz: p.play, gain: 0.085, attack: 0.5, release: 2.0, pan: (i % 2 ? -0.35 : 0.35), harm: [[1, 1], [2, 0.35], [3, 0.14], [4, 0.06]] })
      }
      c.push({ kind: 'swell', t0: THREAD[0] - 1.2, t1: ALIGNED, gain: 0.3 })
      c.push({ kind: 'chime', t: ALIGNED, hz: chimeHz(HZ.sun) * 2, gain: 0.3, decay: 4 })
      c.push({ kind: 'chime', t: ALIGNED + 0.04, hz: chimeHz(HZ.venus) * 2, gain: 0.18, decay: 4 })
      for (const p of P) c.push({ kind: 'tone', t0: ALIGNED, t1: DUR, hz: p.play * 2, gain: 0.025, attack: 2.5, release: 2.0, harm: [[1, 1]] })
      return c
    },
    full(sec) {
      // all seven, each breathing on its own slow cycle, with a chime now and then
      const c = [{ kind: 'bed', t0: 0, t1: sec, gain: 0.05 }]
      const r = rng(77)
      for (const [i, p] of P.entries()) {
        c.push({ kind: 'tone', t0: i * 1.5, t1: sec, hz: p.play, gain: 0.08, attack: 6, release: 8, pan: (i % 2 ? -0.35 : 0.35), lfo: [1 / (40 + i * 7), 0.55], harm: [[1, 1], [2, 0.35], [3, 0.14]] })
        c.push({ kind: 'tone', t0: 20 + i * 3, t1: sec, hz: p.play * 2, gain: 0.02, attack: 10, release: 8, lfo: [1 / (55 + i * 5), 0.8], harm: [[1, 1]] })
      }
      for (let t = 4; t < sec - 6; t += 6 + r() * 6) c.push({ kind: 'chime', t, hz: chimeHz(P[Math.floor(r() * 7)].play * 2), gain: 0.12, decay: 3.5 })
      return c
    },
  }
}

// ── mode: gates ─────────────────────────────────────────────────────────────
// Fly through twelve gates, Aries to Pisces. Each is its element's old symbol
// (fire △, earth ▽ with a bar, air △ with a bar, water ▽) inside a ring, with
// the sign's glyph at the centre. Passing one sounds the planet that rules it.
function Gates(S) {
  const DUR = 31
  const GAP = 12; const P0 = 2.2; const STEP = 1.75
  const LAST = P0 + 11 * STEP
  const { scene, camera } = S
  camera.fov = 68; camera.updateProjectionMatrix()
  scene.background = backgroundTexture(11, VIOLET)
  const u = (t) => (t <= LAST ? (t - P0) / STEP : 11 + easeOut((t - LAST) / 2.8) * 1.15)
  const passAt = (k) => P0 + k * STEP

  // a tunnel of stars streaming past
  const R = rng(5)
  const N = 2200
  const pos = new Float32Array(N * 3); const col = new Float32Array(N * 3)
  const tints = [new THREE.Color(BONE), new THREE.Color('#cdb8ff'), new THREE.Color('#f2d58a'), new THREE.Color(LABEL2)]
  for (let i = 0; i < N; i++) {
    const a = R() * Math.PI * 2; const r = 5 + R() ** 0.6 * 16
    pos.set([Math.cos(a) * r, Math.sin(a) * r, 20 - R() * 200], i * 3)
    const c = tints[i % 4].clone().multiplyScalar(0.3 + R() * 0.7); col.set([c.r, c.g, c.b], i * 3)
  }
  const sg = new THREE.BufferGeometry()
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); sg.setAttribute('color', new THREE.BufferAttribute(col, 3))
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.28, map: S.glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })))
  S.stars = starfield(S, 900, 120, 200, 3, 1.4)

  const gates = SIGNS.map((sign, k) => {
    const el = ELEMENT[k % 4]
    const color = ELEMENT_COLOR[el]
    const g = new THREE.Group(); g.position.z = -k * GAP
    const up = el === 'fire' || el === 'air'
    const Rt = 3.1
    const tri = polygon(3, Rt, up ? Math.PI / 2 : -Math.PI / 2)
    const parts = [outline(tri, color, { core: 0.035, halo: [3, 7] })]
    if (el === 'air' || el === 'earth') {
      const y = up ? 1.0 : -1.0
      const hw = (Rt - Math.abs(y)) / Math.sqrt(3) + 0.02
      parts.push(outline([new THREE.Vector3(-hw, y, 0), new THREE.Vector3(hw, y, 0)], color, { core: 0.035, closed: false, halo: [3, 7] }))
    }
    parts.push(outline(polygon(96, 3.95), color, { core: 0.022, glow: 0.7, halo: [3, 7] }))
    parts.forEach((p) => g.add(p))
    // twelve beads round the ring; this gate's own is lit
    const beads = SIGNS.map((_, j) => {
      const a = Math.PI / 2 - (j / 12) * Math.PI * 2
      const b = sprite(S.glow, j === k ? '#ffffff' : color, j === k ? 1.1 : 0.45, j === k ? 1 : 0.5)
      b.position.set(Math.cos(a) * 3.95, Math.sin(a) * 3.95, 0); g.add(b); return b
    })
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), additive('#ffffff', 1, { map: glyphTexture(GLYPH[sign] + '︎', color) }))
    gl.position.set(0, up ? -0.35 : 0.35, -0.6); g.add(gl)
    const halo = sprite(S.glow, color, 9, 0.12); g.add(halo)
    scene.add(g)
    return { sign, el, color, g, parts, beads, gl, halo, ruler: RULER[sign] }
  })
  const end = sprite(S.star, GOLD, 9, 0); end.position.set(0, 0, -13.6 * GAP); scene.add(end)
  const endHalo = sprite(S.glow, GOLD, 30, 0); endHalo.position.copy(end.position); scene.add(endHalo)

  const sway = (t) => ({ x: 0.35 * Math.sin(t * 0.9), y: 0.28 * Math.sin(t * 0.7 + 1) })
  return {
    duration: DUR,
    stills: [0.2, 1.6, passAt(1) - 0.4, passAt(3) - 0.2, passAt(5) - 0.6, passAt(7) - 0.3, passAt(10) - 0.5, 22.8, 24.4, 28],
    update(t) {
      const z = -u(t) * GAP
      const s = sway(t)
      camera.position.set(s.x, s.y, z)
      camera.up.set(Math.sin(t * 0.5) * 0.09, 1, 0).normalize()
      camera.lookAt(s.x * 0.4, s.y * 0.4, z - 12)
      for (const [k, gt] of gates.entries()) {
        const d = camera.position.z - gt.g.position.z // > 0 while it's ahead
        const vis = ease(span(d, 58, 28)) * ease(span(d, -0.5, 1.2))
        const flash = pulse(t, passAt(k), 5)
        const near = ease(span(d, 14, 3))
        const close = 0.5 + 0.5 * ease(span(d, 1.5, 6))
        gt.parts.forEach((p) => setGlow(p, vis * close * (0.85 + near * 0.6 + flash)))
        gt.beads.forEach((b, j) => { b.material.opacity = vis * (j === k ? 1 : 0.5) })
        gt.gl.material.opacity = vis * ease(span(d, 3.2, 7.5)) * 0.95
        gt.halo.material.opacity = vis * 0.14 * (1 + near)
        gt.g.rotation.z = Math.sin(t * 0.4 + k) * 0.06 + (k % 2 ? 1 : -1) * t * 0.02
      }
      const arrive = ease(span(t, LAST + 0.4, LAST + 2.2))
      end.material.opacity = arrive
      end.material.rotation = t * 0.12
      end.scale.setScalar(8 + pulse(t, LAST + 1.2, 1.2) * 4 + Math.sin(t * 1.8) * 0.3)
      endHalo.material.opacity = arrive * 0.5
    },
    overlay(o, t) {
      // flash on each pass: don't blink
      for (const [k, gt] of gates.entries()) {
        const f = pulse(t, passAt(k), 9)
        if (f > 0.01) { o.save(); o.globalAlpha = f * 0.22; o.fillStyle = gt.color; o.fillRect(0, 0, W, H); o.restore() }
      }
      // the gate you're heading for, named at the bottom
      const k = clamp(Math.floor(u(t) + 0.55), 0, 11)
      const gt = gates[k]
      const into = k === 0 ? 1 : ease(span(t, passAt(k - 1) + 0.05, passAt(k - 1) + 0.35))
      const out = k === 11 ? 1 - ease(span(t, LAST + 0.3, LAST + 0.9)) : 1
      const a = into * out
      if (a > 0) {
        drawMono(o, `${String(k + 1).padStart(2, '0')} / 12 · ${gt.el}`, W / 2, 1330, 24, a * 0.9, { color: gt.color })
        drawLine(o, gt.sign, 1392, 64, a, { maxW: 900 })
        drawMono(o, `ruled by ${gt.ruler} · ${hz2(HZ[gt.ruler])} hz`, W / 2, 1452, 24, a * 0.9, { color: BONE })
      }
    },
    cues() {
      const c = [
        { kind: 'bed', t0: 0, t1: DUR, gain: 0.05 },
        { kind: 'tone', t0: 0, t1: DUR, hz: HZ.sun, gain: 0.07, attack: 0.3, release: 2, harm: [[1, 1], [2, 0.3], [3, 0.12]], lfo: [0.25, 0.25] },
        { kind: 'tone', t0: 0, t1: DUR, hz: HZ.sun / 2, gain: 0.06, attack: 0.3, release: 2, harm: [[1, 1], [2, 0.5], [3, 0.2]] },
      ]
      for (const [k, gt] of gates.entries()) {
        const T = passAt(k)
        c.push({ kind: 'whoosh', t: T, gain: 0.32, dur: 1.3, sweep: k % 2 ? 1 : -1 })
        c.push({ kind: 'chime', t: T, hz: chimeHz(HZ[gt.ruler]), gain: 0.26, decay: 1.8 })
        c.push({ kind: 'tone', t0: T, t1: T + 1.5, hz: chimeHz(HZ[gt.ruler]) / 2, gain: 0.05, attack: 0.1, release: 0.8, harm: [[1, 1], [2, 0.4]] })
      }
      c.push({ kind: 'swell', t0: LAST - 0.6, t1: LAST + 1.2, gain: 0.26 })
      const seven = ['moon', 'mercury', 'venus', 'sun', 'mars', 'jupiter', 'saturn']
      seven.forEach((p, i) => c.push({ kind: 'tone', t0: LAST + 1.2 + i * 0.12, t1: DUR, hz: chimeHz(HZ[p]), gain: 0.025, attack: 2.5, release: 2, pan: (i % 2 ? -0.4 : 0.4), harm: [[1, 1], [2, 0.2]] }))
      c.push({ kind: 'chime', t: LAST + 1.2, hz: chimeHz(HZ.sun) * 2, gain: 0.25, decay: 4 })
      return c
    },
    poster(variant) { return variant ? passAt(SIGNS.indexOf(variant)) - 0.9 : 24 },
    full(sec, variant) {
      if (variant) {
        // one sign: the year tone underneath and its ruler held, with a bell now and then
        const f = chimeHz(HZ[RULER[variant]])
        const c = [
          { kind: 'bed', t0: 0, t1: sec, gain: 0.05 },
          { kind: 'tone', t0: 0, t1: sec, hz: HZ.sun / 2, gain: 0.05, attack: 5, release: 6, harm: [[1, 1], [2, 0.5], [3, 0.2]] },
          { kind: 'tone', t0: 0, t1: sec, hz: f / 2, gain: 0.08, attack: 4, release: 6, lfo: [1 / 23, 0.35], harm: [[1, 1], [2, 0.4], [3, 0.12]] },
          { kind: 'tone', t0: 6, t1: sec, hz: f, gain: 0.035, attack: 8, release: 6, lfo: [1 / 31, 0.6], harm: [[1, 1], [2, 0.2]] },
        ]
        for (let t = 2; t < sec - 5; t += 7) c.push({ kind: 'chime', t, hz: f, gain: 0.14, decay: 3 })
        return c
      }
      // the year tone underneath, and each sign's ruler for ten seconds, in order
      const c = [
        { kind: 'bed', t0: 0, t1: sec, gain: 0.05 },
        { kind: 'tone', t0: 0, t1: sec, hz: HZ.sun, gain: 0.07, attack: 6, release: 8, harm: [[1, 1], [2, 0.3], [3, 0.12]], lfo: [1 / 30, 0.3] },
        { kind: 'tone', t0: 0, t1: sec, hz: HZ.sun / 2, gain: 0.06, attack: 6, release: 8, harm: [[1, 1], [2, 0.5], [3, 0.2]] },
      ]
      for (let i = 0, t = 3; t < sec - 8; i++, t += 10) {
        const f = chimeHz(HZ[RULER[SIGNS[i % 12]]])
        c.push({ kind: 'chime', t, hz: f, gain: 0.16, decay: 3 })
        c.push({ kind: 'tone', t0: t, t1: t + 10.5, hz: f / 2, gain: 0.045, attack: 2.5, release: 3, harm: [[1, 1], [2, 0.4]] })
      }
      return c
    },
  }
}

// ── mode: channels ──────────────────────────────────────────────────────────
// Two strands braid up a column, the way the sun and moon channels are drawn
// round the spine. Venus (rose) starts on the left and plays in the left ear;
// the Moon (silver) starts on the right and plays in the right. They cross
// seven times and close into one gold line at the top.
function Channels(S) {
  const DUR = 33
  const G0 = 0.0; const G1 = 20.0; const UNION = 20.6
  const TURN = 7 * Math.PI; const RAD = 1.5; const HT = 10
  const { scene, camera } = S
  camera.fov = 40; camera.updateProjectionMatrix()
  scene.background = backgroundTexture(21, ROSE)
  S.stars = starfield(S, 1600, 40, 90, 13, 0.7)
  const radius = (th) => RAD * (1 - ease((th - 6 * Math.PI) / Math.PI))
  const point = (th, side) => {
    const r = radius(th)
    return new THREE.Vector3(-side * r * Math.cos(th), -HT / 2 + (HT * th) / TURN, side * r * Math.sin(th))
  }
  class Strand extends THREE.Curve {
    constructor(side) { super(); this.side = side }
    getPoint(u, target = new THREE.Vector3()) { return target.copy(point(u * TURN, this.side)) }
  }
  const SEG = 700
  const strands = [[1, '#f3a0b8'], [-1, SILVER]].map(([side, color]) => {
    const curve = new Strand(side)
    const meshes = [[0.055, additive(new THREE.Color(color).lerp(new THREE.Color('#fff'), 0.5), 1)], [0.17, additive(color, 0.3)], [0.42, additive(color, 0.09)]]
      .map(([r, m]) => { const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, SEG, r, 8, false), m); scene.add(mesh); return mesh })
    const tip = sprite(S.glow, color, 1.6, 1); scene.add(tip)
    return { side, color, meshes, tip }
  })
  // where they cross (front view): cos θ = 0
  const crossings = Array.from({ length: 7 }, (_, n) => {
    const th = Math.PI / 2 + n * Math.PI
    const at = G0 + (G1 - G0) * (th / TURN)
    const node = sprite(S.glow, '#fff4dc', 1.4, 0); node.position.set(0, -HT / 2 + (HT * th) / TURN, 0); scene.add(node)
    const ring = sprite(S.ring, '#fff4dc', 1, 0); ring.position.copy(node.position); scene.add(ring)
    return { th, at, node, ring }
  })
  const top = new THREE.Vector3(0, HT / 2, 0)
  const star = sprite(S.star, GOLD, 2.2, 0); star.position.copy(top).add(new THREE.Vector3(0, 0.55, 0)); scene.add(star)
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.3), additive(GOLD, 0, { map: beamTexture() }))
  beam.position.set(0, HT / 2 + 0.55, 0); scene.add(beam)
  const bloom = sprite(S.glow, GOLD, 6, 0); bloom.position.copy(top); scene.add(bloom)
  const gold = new THREE.Color(GOLD)

  return {
    duration: DUR,
    stills: [0.2, 3.4, 6.2, 10.9, 14, 18.8, 20.8, 22.5, 25, 29],
    poster: 24,
    update(t) {
      const g = lerp(0.025, 1, easeIO(span(t, G0, G1)) * 0.9 + span(t, G0, G1) * 0.1)
      const th = g * TURN
      // close in and climb with the tips, then pull back to see the whole braid
      const back = easeIO(span(t, 14.5, 21.5))
      const tipY = -HT / 2 + HT * g
      const a = 0.24 * Math.sin(t * 0.21)
      const D = lerp(19, 30, back) + 1.2 * easeIO(span(t, 25, 29))
      const ty = lerp(Math.min(tipY + 0.9, HT / 2 - 2.6), 0.3, back)
      camera.position.set(Math.sin(a) * D, ty + 0.4, Math.cos(a) * D)
      camera.lookAt(0, ty, 0)
      const gu = ease(span(t, UNION, UNION + 2.5))
      for (const st of strands) {
        const count = Math.floor(g * SEG) * 8 * 6
        st.meshes.forEach((m, i) => {
          m.geometry.setDrawRange(0, count)
          m.material.color.copy(new THREE.Color(i === 0 ? new THREE.Color(st.color).lerp(new THREE.Color('#fff'), 0.5) : st.color).lerp(gold, gu * 0.8))
        })
        st.tip.position.copy(point(th, st.side))
        st.tip.material.opacity = t < UNION + 0.3 ? 1 : 0
        st.tip.scale.setScalar(1.4 + 0.2 * Math.sin(t * 6))
      }
      for (const c of crossings) {
        const lit = t >= c.at
        c.node.material.opacity = lit ? 0.8 + pulse(t, c.at, 3) * 1.2 + 0.15 * Math.sin(t * 2 + c.th) : 0
        c.node.scale.setScalar(1.2 + pulse(t, c.at, 4) * 1.4)
        c.ring.scale.setScalar(0.5 + (1 - Math.exp(-(t - c.at) * 2.6)) * 3)
        c.ring.material.opacity = lit ? 0.8 * pulse(t, c.at, 2.2) : 0
      }
      star.material.opacity = ease(span(t, UNION - 0.2, UNION + 0.5))
      star.material.rotation = t * 0.15
      star.scale.setScalar(2.0 + pulse(t, UNION, 1.8) * 2.4)
      beam.material.opacity = ease(span(t, UNION, UNION + 1.2)) * 0.7
      bloom.material.opacity = pulse(t, UNION, 1.4)
      bloom.scale.setScalar(5 + (t - UNION) * 5)
      S.stars.rotation.y = t * 0.008
    },
    overlay(o, t) {
      // a warm wash on the left, a cool one on the right: the two ears
      const wl = o.createLinearGradient(0, 0, W * 0.5, 0)
      wl.addColorStop(0, 'rgba(232,98,138,0.16)'); wl.addColorStop(1, 'rgba(232,98,138,0)')
      o.fillStyle = wl; o.fillRect(0, 0, W * 0.5, H)
      const wr = o.createLinearGradient(W, 0, W * 0.5, 0)
      wr.addColorStop(0, 'rgba(134,189,240,0.16)'); wr.addColorStop(1, 'rgba(134,189,240,0)')
      o.fillStyle = wr; o.fillRect(W * 0.5, 0, W * 0.5, H)
      const a = ease(span(t, 0, 0.01)) * (1 - ease(span(t, 26.6, 27.2)))
      drawMono(o, 'L · venus', 72, 1440, 26, a, { color: '#f3a0b8', align: 'left', weight: 700 })
      drawMono(o, `${hz2(HZ.venus)} hz`, 72, 1484, 24, a * 0.85, { color: BONE, align: 'left' })
      drawMono(o, 'moon · R', W - 72, 1440, 26, a, { color: SILVER, align: 'right', weight: 700 })
      drawMono(o, `${hz2(HZ.moon)} hz`, W - 72, 1484, 24, a * 0.85, { color: BONE, align: 'right' })
    },
    cues() {
      return [
        { kind: 'bed', t0: 0, t1: DUR, gain: 0.035 },
        // the binaural pair: each tone in one ear only
        { kind: 'tone', t0: 0, t1: DUR, hz: HZ.venus, gain: 0.15, attack: 0.15, release: 2.5, pan: -1, harm: [[1, 1], [2, 0.16], [3, 0.05]] },
        { kind: 'tone', t0: 0, t1: DUR, hz: HZ.moon, gain: 0.15, attack: 0.15, release: 2.5, pan: 1, harm: [[1, 1], [2, 0.16], [3, 0.05]] },
        { kind: 'tone', t0: UNION, t1: DUR, hz: HZ.venus / 2, gain: 0.06, attack: 2, release: 2.5, pan: -1, harm: [[1, 1], [2, 0.3]] },
        { kind: 'tone', t0: UNION, t1: DUR, hz: HZ.moon / 2, gain: 0.06, attack: 2, release: 2.5, pan: 1, harm: [[1, 1], [2, 0.3]] },
        ...crossings.map((c, n) => ({ kind: 'chime', t: c.at, hz: (n % 2 ? HZ.moon : HZ.venus) * 2, gain: 0.14, decay: 2.4 })),
        { kind: 'swell', t0: UNION - 1.6, t1: UNION, gain: 0.22 },
        { kind: 'chime', t: UNION, hz: chimeHz(HZ.sun) * 2, gain: 0.24, decay: 4.5 },
      ]
    },
    full(sec) {
      const c = [
        { kind: 'bed', t0: 0, t1: sec, gain: 0.035 },
        { kind: 'tone', t0: 0, t1: sec, hz: HZ.venus, gain: 0.15, attack: 4, release: 8, pan: -1, harm: [[1, 1], [2, 0.16], [3, 0.05]] },
        { kind: 'tone', t0: 0, t1: sec, hz: HZ.moon, gain: 0.15, attack: 4, release: 8, pan: 1, harm: [[1, 1], [2, 0.16], [3, 0.05]] },
        { kind: 'tone', t0: 15, t1: sec, hz: HZ.venus / 2, gain: 0.05, attack: 10, release: 8, pan: -1, lfo: [1 / 45, 0.6], harm: [[1, 1], [2, 0.3]] },
        { kind: 'tone', t0: 15, t1: sec, hz: HZ.moon / 2, gain: 0.05, attack: 10, release: 8, pan: 1, lfo: [1 / 52, 0.6], harm: [[1, 1], [2, 0.3]] },
      ]
      for (let n = 0, t = 6; t < sec - 6; n++, t += 12) c.push({ kind: 'chime', t, hz: (n % 2 ? HZ.moon : HZ.venus) * 2, gain: 0.09, decay: 3.5 })
      return c
    },
  }
}

// ── mode: heart ─────────────────────────────────────────────────────────────
// The heart's old symbol: a lotus of twelve petals (here one per sign) round
// two triangles, one pointing up and one down. One moving alone does nothing.
// When both move they lock into a six-pointed star and the lotus lights.
function Heart(S) {
  const DUR = 35
  const UNION = 21.4
  const HEART = 639
  const { scene, camera } = S
  camera.fov = 40; camera.updateProjectionMatrix()
  scene.background = backgroundTexture(31, ROSE)
  S.stars = starfield(S, 1500, 35, 80, 17, 0.6)
  const lotus = new THREE.Group(); lotus.rotation.x = -0.42; scene.add(lotus)
  const petals = new THREE.Group(); lotus.add(petals)
  const petalList = SIGNS.map((sign, i) => {
    const a = Math.PI / 2 - (i / 12) * Math.PI * 2
    const g = new THREE.Group(); g.rotation.z = a - Math.PI / 2
    // a petal from radius 2.3 to 3.65, drawn as a pointed arch
    const pts = []
    for (let k = 0; k <= 24; k++) { const s = k / 24; pts.push(new THREE.Vector3(Math.sin(s * Math.PI) * 0.62 * (1 - s * 0.35) * 1, 2.3 + s * 1.35, 0)) }
    const left = pts.map((p) => new THREE.Vector3(-p.x, p.y, 0)).reverse()
    const shape = new THREE.Shape(); [...pts, ...left].forEach((p, k) => (k ? shape.lineTo(p.x, p.y) : shape.moveTo(p.x, p.y)))
    const fill = new THREE.Mesh(new THREE.ShapeGeometry(shape), additive(ROSE, 0.05))
    g.add(fill)
    const line = outline([...pts, ...left.slice(1)], '#f3a0b8', { core: 0.018, closed: false, glow: 0.8 })
    g.add(line)
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), additive('#ffffff', 0.25, { map: glyphTexture(glyph(sign), '#f6c9d4', 128) }))
    gl.position.set(0, 2.95, 0.01); gl.rotation.z = -(a - Math.PI / 2); g.add(gl)
    petals.add(g)
    return { sign, fill, line, gl, at: UNION + 0.2 + i * 0.14 }
  })
  const circle = outline(polygon(128, 2.22), '#f3a0b8', { core: 0.02, glow: 0.7 }); lotus.add(circle)
  const up = outline(polygon(3, 2.05, Math.PI / 2), GOLD, { core: 0.04 })
  const down = outline(polygon(3, 2.05, -Math.PI / 2), '#f58fae', { core: 0.04 })
  const upFill = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(polygon(3, 2.05, Math.PI / 2).map((v) => new THREE.Vector2(v.x, v.y)))), additive(GOLD, 0.05))
  const downFill = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(polygon(3, 2.05, -Math.PI / 2).map((v) => new THREE.Vector2(v.x, v.y)))), additive(ROSE, 0.05))
  up.add(upFill); down.add(downFill)
  lotus.add(up); lotus.add(down)
  up.position.z = 0.03; down.position.z = 0.05
  const core = sprite(S.glow, '#ffe6c8', 3, 0); lotus.add(core)
  const rings = [0, 0.35, 0.7].map(() => { const r = sprite(S.ring, '#ffd9a8', 1, 0); lotus.add(r); return r })
  const outer = outline(polygon(160, 4.05), GOLD, { core: 0.016, glow: 0.6 }); lotus.add(outer)
  const halo = sprite(S.glow, ROSE, 14, 0); lotus.add(halo)
  const FAR = 2.45
  // where each triangle sits over time: apart, one alone, the other alone, both
  const upY = (t) => {
    let y = FAR
    y = lerp(y, 0.95, easeIO(span(t, 11.6, 13.0)))
    y = lerp(y, FAR - 0.2, easeIO(span(t, 13.8, 15.0)))
    y = lerp(y, 0, easeIO(span(t, 19.4, UNION)))
    return y + (t < 19.4 ? Math.sin(t * 1.1) * 0.06 : 0)
  }
  const downY = (t) => {
    let y = -FAR
    y = lerp(y, -0.95, easeIO(span(t, 15.6, 17.0)))
    y = lerp(y, -FAR + 0.2, easeIO(span(t, 17.8, 19.0)))
    y = lerp(y, 0, easeIO(span(t, 19.4, UNION)))
    return y + (t < 19.4 ? Math.sin(t * 1.1 + 2) * 0.06 : 0)
  }
  return {
    duration: DUR,
    stills: [0.2, 4.5, 8.5, 12.8, 16.8, 20.5, 21.7, 23.2, 27, 31],
    poster: 25.5,
    update(t) {
      const D = 21.5 + 1.0 * easeIO(span(t, 27.5, 31))
      camera.position.set(Math.sin(t * 0.13) * 1.2, -0.4, D)
      camera.lookAt(0, 0.35, 0)
      petals.rotation.z = t * 0.035
      up.position.y = upY(t); down.position.y = downY(t)
      const spin = t > UNION ? (t - UNION) * 0.12 * easeOut((t - UNION) / 2) : 0
      up.rotation.z = spin; down.rotation.z = spin
      const one = window01(t, 11.6, 15.0, 0.6); const other = window01(t, 15.6, 19.0, 0.6)
      setGlow(up, 0.75 + one * 0.4 + pulse(t, UNION, 1.5) * 1.2 + (t > UNION ? 0.35 : 0))
      setGlow(down, 0.75 + other * 0.4 + pulse(t, UNION, 1.5) * 1.2 + (t > UNION ? 0.35 : 0))
      const lit = ease(span(t, UNION, UNION + 0.6))
      setGlow(circle, 0.35 + lit * 0.9)
      setGlow(outer, lit * (0.8 + 0.2 * Math.sin(t * 2)))
      for (const p of petalList) {
        const on = ease(span(t, p.at, p.at + 0.4))
        p.fill.material.opacity = 0.05 + on * 0.16 + pulse(t, p.at, 4) * 0.25
        setGlow(p.line, 0.3 + on * 0.85)
        p.gl.material.opacity = 0.22 + on * 0.75
      }
      core.material.opacity = pulse(t, UNION, 1.1) * 1.4 + lit * (0.35 + 0.1 * Math.sin(t * 2.6))
      core.scale.setScalar(2.5 + pulse(t, UNION, 1.5) * 4)
      rings.forEach((r, i) => {
        const at = UNION + i * 0.35
        r.scale.setScalar(0.6 + (1 - Math.exp(-(t - at) * 1.8)) * 9)
        r.material.opacity = t > at ? 0.7 * pulse(t, at, 1.6) : 0
      })
      halo.material.opacity = lit * 0.22
      S.stars.rotation.y = t * 0.008
    },
    overlay(o, t) {
      const a = window01(t, 8.2, 28.6, 0.5)
      drawMono(o, `${HEART} hz`, W / 2, 274, 26, a, { color: GOLD, weight: 700 })
    },
    cues() {
      return [
        { kind: 'bed', t0: 0, t1: DUR, gain: 0.04 },
        { kind: 'tone', t0: 0, t1: DUR, hz: HEART, gain: 0.07, attack: 0.2, release: 2.5, lfo: [0.18, 0.25], harm: [[1, 1], [2, 0.08]] },
        { kind: 'tone', t0: 0, t1: DUR, hz: HEART / 4, gain: 0.05, attack: 0.2, release: 2.5, harm: [[1, 1], [2, 0.6], [3, 0.3], [4, 0.15]] },
        // alone, each one is slightly off: it wobbles against 639 and never settles
        { kind: 'tone', t0: 11.6, t1: 15.0, hz: HEART + 11, gain: 0.045, attack: 0.6, release: 0.8, pan: -0.4, harm: [[1, 1]] },
        { kind: 'tone', t0: 15.6, t1: 19.0, hz: HEART - 11, gain: 0.045, attack: 0.6, release: 0.8, pan: 0.4, harm: [[1, 1]] },
        { kind: 'swell', t0: 19.4, t1: UNION, gain: 0.28 },
        { kind: 'chime', t: UNION, hz: HEART, gain: 0.3, decay: 5 },
        { kind: 'tone', t0: UNION, t1: DUR, hz: HEART / 2, gain: 0.08, attack: 1.2, release: 2.5, harm: [[1, 1], [2, 0.25], [3, 0.08]] },
        { kind: 'tone', t0: UNION, t1: DUR, hz: HEART * 1.5, gain: 0.025, attack: 2.5, release: 2.5, harm: [[1, 1]] },
        { kind: 'tone', t0: UNION + 0.5, t1: DUR, hz: HEART * 0.75, gain: 0.04, attack: 2.5, release: 2.5, harm: [[1, 1], [2, 0.2]] },
        ...petalList.map((p, i) => ({ kind: 'chime', t: p.at, hz: HEART * [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2][i % 6] / (i < 6 ? 1 : 2), gain: 0.09, decay: 2.2, pan: Math.sin(i * 0.52) * 0.6 })),
      ]
    },
    full(sec) {
      const c = [
        { kind: 'bed', t0: 0, t1: sec, gain: 0.04 },
        { kind: 'tone', t0: 0, t1: sec, hz: HEART, gain: 0.07, attack: 5, release: 8, lfo: [1 / 11, 0.3], harm: [[1, 1], [2, 0.08]] },
        { kind: 'tone', t0: 0, t1: sec, hz: HEART / 2, gain: 0.08, attack: 8, release: 8, lfo: [1 / 37, 0.35], harm: [[1, 1], [2, 0.25], [3, 0.08]] },
        { kind: 'tone', t0: 0, t1: sec, hz: HEART / 4, gain: 0.05, attack: 8, release: 8, harm: [[1, 1], [2, 0.6], [3, 0.3], [4, 0.15]] },
        { kind: 'tone', t0: 20, t1: sec, hz: HEART * 0.75, gain: 0.035, attack: 12, release: 8, lfo: [1 / 49, 0.7], harm: [[1, 1], [2, 0.2]] },
        { kind: 'tone', t0: 40, t1: sec, hz: HEART * 1.5, gain: 0.02, attack: 12, release: 8, lfo: [1 / 61, 0.8], harm: [[1, 1]] },
      ]
      const r = rng(639)
      for (let t = 5; t < sec - 6; t += 5 + r() * 5) c.push({ kind: 'chime', t, hz: HEART * [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2][Math.floor(r() * 6)] / (r() < 0.5 ? 1 : 2), gain: 0.07, decay: 3, pan: (r() - 0.5) * 1.2 })
      return c
    },
  }
}

const MODES = { planets: Planets, gates: Gates, channels: Channels, heart: Heart }

// ── setup and frame ─────────────────────────────────────────────────────────
window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const out = document.getElementById('c')
  out.width = W; out.height = H
  const gl = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.05, 600)
  S = { script, renderer, scene, camera, out, octx: out.getContext('2d') }
  S.glow = glowTexture(); S.ring = ringTexture(); S.star = starTexture()
  S.mode = MODES[script.mode](S)

  const [vc, vx] = canvas(W, H)
  const vg = vx.createRadialGradient(W / 2, H * 0.48, H * 0.22, W / 2, H * 0.5, H * 0.72)
  vg.addColorStop(0, 'rgba(5,2,15,0)'); vg.addColorStop(1, 'rgba(5,2,15,0.7)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  S.vignette = vc
  S.grains = [1, 2, 3, 4].map((k) => {
    const [c, x] = canvas(W / 2, H / 2)
    const d = x.createImageData(W / 2, H / 2); const r = rng(k * 97)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() - 0.5) * 60; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    x.putImageData(d, 0, 0); return c
  })
  const duration = S.mode.duration
  return {
    duration,
    frames: Math.round(duration * FPS),
    stills: S.mode.stills,
    poster: typeof S.mode.poster === 'function' ? S.mode.poster() : S.mode.poster,
    audio: { duration, cues: S.mode.cues() },
    tones: Object.fromEntries(Object.entries(HZ).map(([k, v]) => [k, Number(v.toFixed(2))])),
  }
}

window.fullAudio = (seconds, variant) => ({ duration: seconds, cues: S.mode.full(seconds, variant) })
window.posterAt = (variant) => (typeof S.mode.poster === 'function' ? S.mode.poster(variant) : S.mode.poster)

// The words over the picture: wordmark, eyebrow, one line at a time, the ask.
function words(o, t) {
  const sc = S.script
  const dur = S.mode.duration
  wordmark(o, 0.92 * (1 - ease(span(t, sc.cta.at - 0.6, sc.cta.at))))
  if (sc.eyebrow) {
    const a = t < sc.eyebrow.to - 0.5 ? 1 : 1 - span(t, sc.eyebrow.to - 0.5, sc.eyebrow.to)
    if (a > 0) {
      o.save(); o.font = `400 26px ${MONO}`; const w = o.measureText(spaced(sc.eyebrow.text)).width; o.restore()
      headphones(o, W / 2 - w / 2 - 34, 262, 34, a)
      drawMono(o, sc.eyebrow.text, W / 2 + 12, 274, 26, a)
    }
  }
  for (const [i, ln] of sc.lines.entries()) {
    const fin = i === 0 && ln.at === 0 ? 1 : ease(span(t, ln.at, ln.at + 0.4))
    const fout = 1 - ease(span(t, ln.to - 0.4, ln.to))
    const a = Math.min(fin, fout)
    if (a <= 0) continue
    const rise = (1 - fin) * 14
    drawLine(o, ln.text, (ln.y || 380) + rise, ln.size || 64, a)
  }
  // the ask: a dark plate, "comment WORD", what you get
  const c = sc.cta
  const k = ease(span(t, c.at, c.at + 0.8)) * (1 - ease(span(t, dur - 0.35, dur)))
  if (k > 0) {
    o.save(); o.globalAlpha = k * 0.45; o.fillStyle = VOID; o.fillRect(0, 0, W, H); o.restore()
    o.save(); o.globalAlpha = k * 0.82
    const pg = o.createRadialGradient(W / 2, 900, 0, W / 2, 900, 640)
    pg.addColorStop(0, 'rgba(11,6,32,0.92)'); pg.addColorStop(0.65, 'rgba(11,6,32,0.7)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
    o.fillStyle = pg; o.fillRect(0, 200, W, 1400)
    o.restore()
    drawLine(o, 'comment', 760, 64, k)
    o.save(); o.globalAlpha = k
    o.font = `700 ${c.word.length > 7 ? 92 : 112}px ${MONO}`; o.textAlign = 'center'; o.textBaseline = 'middle'
    o.shadowColor = 'rgba(242,199,92,0.55)'; o.shadowBlur = 40
    o.fillStyle = GOLD; o.fillText(c.word.toUpperCase().split('').join(' '), W / 2, 880)
    o.restore()
    drawLine(o, c.sub, 1010, 46, k * 0.95, { color: LABEL2, maxW: 760 })
    const k2 = ease(span(t, c.at + 0.6, c.at + 1.4)) * (1 - ease(span(t, dur - 0.35, dur)))
    o.save(); o.globalAlpha = k2; o.textAlign = 'center'; o.textBaseline = 'middle'
    o.font = `italic 500 60px ${SERIF}`; o.fillStyle = BONE; o.fillText('align', W / 2 + 18, 1190)
    o.font = '34px "DejaVu Sans", sans-serif'; o.fillStyle = GOLD; o.fillText('✦', W / 2 - 66, 1185)
    o.restore()
    drawMono(o, 'your chart is free · link in bio', W / 2, 1262, 22, k2 * 0.85)
  }
}

window.frame = (t, opts = {}) => {
  S.mode.update(t)
  S.renderer.render(S.scene, S.camera)
  const o = S.octx
  o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'
  o.drawImage(S.renderer.domElement, 0, 0, W, H)
  o.drawImage(S.vignette, 0, 0)
  o.globalCompositeOperation = 'overlay'; o.globalAlpha = 0.28
  o.drawImage(S.grains[Math.floor(t * FPS) % 4], 0, 0, W, H)
  o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1
  if (!opts.bare) S.mode.overlay(o, t)
  if (!opts.clean && !opts.bare) words(o, t)
  return S.out.toDataURL('image/jpeg', 0.92)
}


