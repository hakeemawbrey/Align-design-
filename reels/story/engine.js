// Align "In this town" story reels: a small toy town in three.js with blocky
// characters, a narrator and one big word on screen at a time. Each script
// line is one shot (a cut, like the trend), and its length comes from the
// voice. Everything is a pure function of time t:
//   window.setup(script, assets, voice) once, then window.frame(t).

import * as THREE from 'three'

const W = 1080
const H = 1920
const GOLD = '#f7c948'
const PAPER = '#f3ece0'
const NAVY = '#1b1530'
const GAP = 0.08 // silence after each line before the cut
const END_HOLD = 2.4

let S

// ── helpers ───────────────────────────────────────────────────────────────
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
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const backOut = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
const lerp = (a, b, u) => a + (b - a) * u
const rad = (d) => (d * Math.PI) / 180
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c, rx = 1, ry = rx) => {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  if (rx !== 1 || ry !== 1) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry) }
  return t
}
const loadImg = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
const SIGNS = Object.keys(GLYPH)
const glyph = (s) => (GLYPH[s] || '✦') + '︎'
const GLYPH_FONT = '"DejaVu Sans", "Noto Sans Symbols", sans-serif'
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o })
function box(w, h, d, m, x = 0, y = 0, z = 0) {
  const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
  g.position.set(x, y, z)
  g.castShadow = true
  g.receiveShadow = true
  return g
}
function shade(hex, k) {
  const c = new THREE.Color(hex)
  c.multiplyScalar(k)
  return '#' + c.getHexString()
}
function roundRect(x, X, Y, w, h, r) { x.beginPath(); x.roundRect(X, Y, w, h, r) }
function wrap(x, text, maxW) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w } else cur = t
  }
  if (cur) lines.push(cur)
  return lines
}
function starPath(x, cx, cy, ro, ri, n = 5, rot = -Math.PI / 2) {
  x.beginPath()
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro
    const a = rot + (i * Math.PI) / n
    x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
  }
  x.closePath()
}
function heartPath(x, cx, cy, s) {
  x.beginPath()
  x.moveTo(cx, cy + s * 0.35)
  x.bezierCurveTo(cx - s * 1.1, cy - s * 0.35, cx - s * 0.45, cy - s * 1.05, cx, cy - s * 0.45)
  x.bezierCurveTo(cx + s * 0.45, cy - s * 1.05, cx + s * 1.1, cy - s * 0.35, cx, cy + s * 0.35)
  x.closePath()
}

// ── textures ──────────────────────────────────────────────────────────────
function brickTexture() {
  const N = 512
  const [c, x] = canvas(N, N)
  const r = rng(3)
  x.fillStyle = '#b88a78'; x.fillRect(0, 0, N, N)
  const rows = 16, cols = 8
  for (let row = 0; row < rows; row++) {
    for (let col = -1; col <= cols; col++) {
      const off = (row % 2) * (N / cols / 2)
      const k = 0.9 + r() * 0.2
      x.fillStyle = `rgb(${196 * k},${110 * k},${92 * k})`
      x.fillRect(col * (N / cols) + off + 2, row * (N / rows) + 2, N / cols - 4, N / rows - 4)
    }
  }
  return tex(c, 10)
}
function grassTexture() {
  const N = 256
  const [c, x] = canvas(N, N)
  const r = rng(9)
  x.fillStyle = '#7fb069'; x.fillRect(0, 0, N, N)
  for (let i = 0; i < 500; i++) { x.fillStyle = r() < 0.5 ? '#76a862' : '#8abb72'; x.fillRect(r() * N, r() * N, 3, 6) }
  return tex(c, 24)
}
function woodTexture(base = '#b98a5e') {
  const N = 512
  const [c, x] = canvas(N, N)
  const r = rng(5)
  for (let i = 0; i < 8; i++) {
    const k = 0.9 + r() * 0.18
    x.fillStyle = shade(base, k); x.fillRect(0, i * 64, N, 64)
    x.fillStyle = 'rgba(60,30,10,0.35)'; x.fillRect(0, i * 64, N, 3)
    x.fillStyle = 'rgba(60,30,10,0.2)'; x.fillRect(r() * N, i * 64, 3, 64)
  }
  return tex(c, 3)
}
function tileTexture(a = '#efe6d6', b = '#d9c9b0') {
  const N = 256
  const [c, x] = canvas(N, N)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? a : b; x.fillRect(i * 64, j * 64, 64, 64) }
  return tex(c, 5)
}
function wallpaperTexture() {
  const N = 256
  const [c, x] = canvas(N, N)
  x.fillStyle = '#3b2e5a'; x.fillRect(0, 0, N, N)
  const r = rng(4)
  x.fillStyle = 'rgba(247,201,72,0.55)'
  for (let i = 0; i < 14; i++) { starPath(x, r() * N, r() * N, 7, 3); x.fill() }
  return tex(c, 4, 2)
}
function skyTexture(mode) {
  const [c, x] = canvas(64, 512)
  const g = x.createLinearGradient(0, 0, 0, 512)
  if (mode === 'day') { g.addColorStop(0, '#2f7fd6'); g.addColorStop(0.55, '#5aa6ee'); g.addColorStop(1, '#bfe2ff') }
  else if (mode === 'dusk') { g.addColorStop(0, '#3a2c6e'); g.addColorStop(0.5, '#b45f86'); g.addColorStop(1, '#f6b27a') }
  else { g.addColorStop(0, '#070818'); g.addColorStop(0.55, '#141a44'); g.addColorStop(1, '#2c2a5e') }
  x.fillStyle = g; x.fillRect(0, 0, 64, 512)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}
function windowsTexture(wall, lit, seed) {
  const [c, x] = canvas(256, 256)
  const r = rng(seed)
  x.fillStyle = wall; x.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const on = lit && r() < 0.75
    x.fillStyle = '#fffaf0'; x.fillRect(30 + i * 120, 40 + j * 110, 76, 76)
    x.fillStyle = on ? '#ffd77a' : '#6d8fb3'; x.fillRect(36 + i * 120, 46 + j * 110, 64, 64)
    x.fillStyle = '#fffaf0'; x.fillRect(66 + i * 120, 46 + j * 110, 4, 64); x.fillRect(36 + i * 120, 76 + j * 110, 64, 4)
  }
  return tex(c)
}
function wheelTexture(sign) {
  const N = 1024
  const [c, x] = canvas(N, N)
  const C = N / 2, R = N / 2 - 4
  x.fillStyle = '#6b4a35'; x.beginPath(); x.arc(C, C, R, 0, 7); x.fill()
  x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(C, C, R * 0.92, 0, 7); x.fill()
  x.fillStyle = '#2c2350'; x.beginPath(); x.arc(C, C, R * 0.62, 0, 7); x.fill()
  x.strokeStyle = '#6b4a35'; x.lineWidth = 6
  x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    x.beginPath(); x.moveTo(C + Math.cos(a) * R * 0.62, C + Math.sin(a) * R * 0.62); x.lineTo(C + Math.cos(a) * R * 0.92, C + Math.sin(a) * R * 0.92); x.stroke()
    const m = a + Math.PI / 12
    x.fillStyle = SIGNS[i] === sign ? '#c9962f' : '#4a3a5a'
    x.font = `${SIGNS[i] === sign ? 96 : 78}px ${GLYPH_FONT}`
    x.fillText(glyph(SIGNS[i]), C + Math.cos(m) * R * 0.77, C + Math.sin(m) * R * 0.77)
  }
  x.fillStyle = GOLD; starPath(x, C, C, R * 0.3, R * 0.12, 4, 0); x.fill()
  return tex(c)
}
function clockTexture() {
  const [c, x] = canvas(256, 256)
  x.fillStyle = '#fffaf0'; x.beginPath(); x.arc(128, 128, 124, 0, 7); x.fill()
  x.strokeStyle = '#2b2522'; x.lineWidth = 8; x.stroke()
  x.fillStyle = '#2b2522'
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; x.fillRect(128 + Math.cos(a) * 100 - 4, 128 + Math.sin(a) * 100 - 4, 8, 8) }
  // 11:11
  x.lineCap = 'round'
  const hand = (a, l, w) => { x.lineWidth = w; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(a) * l, 128 - Math.cos(a) * l); x.stroke() }
  hand((11 + 11 / 60) / 12 * Math.PI * 2, 60, 12)
  hand((11 / 60) * Math.PI * 2, 92, 8)
  return tex(c)
}
function glowTexture(color = '255,220,140') {
  const [c, x] = canvas(128, 128)
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, `rgba(${color},1)`); g.addColorStop(0.35, `rgba(${color},0.45)`); g.addColorStop(1, `rgba(${color},0)`)
  x.fillStyle = g; x.fillRect(0, 0, 128, 128)
  return tex(c)
}
function signTexture(lines, opts = {}) {
  const w = opts.w || 512, h = opts.h || 160
  const [c, x] = canvas(w, h)
  x.fillStyle = opts.bg || '#2c2350'; roundRect(x, 0, 0, w, h, 18); x.fill()
  x.strokeStyle = opts.edge || GOLD; x.lineWidth = 8; roundRect(x, 8, 8, w - 16, h - 16, 12); x.stroke()
  x.fillStyle = opts.ink || PAPER; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    x.font = i === 0 ? `800 ${opts.size || 58}px Poppins, sans-serif` : `600 ${(opts.size || 58) * 0.5}px Poppins, sans-serif`
    x.fillText(l, w / 2, h / 2 + (i - (lines.length - 1) / 2) * (opts.size || 58) * 0.95)
  })
  return tex(c)
}
function cardBackTexture(sign) {
  const [c, x] = canvas(256, 360)
  x.fillStyle = NAVY; roundRect(x, 0, 0, 256, 360, 22); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 7; roundRect(x, 12, 12, 232, 336, 14); x.stroke()
  x.lineWidth = 2; roundRect(x, 24, 24, 208, 312, 10); x.stroke()
  const r = rng(SIGNS.indexOf(sign) + 3)
  x.fillStyle = 'rgba(247,201,72,0.6)'
  for (let i = 0; i < 16; i++) { starPath(x, 34 + r() * 188, 34 + r() * 292, 4, 1.6, 4, 0); x.fill() }
  x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `120px ${GLYPH_FONT}`; x.fillText(glyph(sign), 128, 170)
  x.font = 'italic 500 40px "EB Garamond", serif'; x.fillText('align', 128, 296)
  return tex(c)
}
function cardFaceTexture(sign, name, aura) {
  const [c, x] = canvas(256, 360)
  x.fillStyle = PAPER; roundRect(x, 0, 0, 256, 360, 22); x.fill()
  x.save(); roundRect(x, 18, 18, 220, 250, 12); x.clip()
  if (aura) { const s = Math.max(220 / aura.width, 250 / aura.height); x.drawImage(aura, 128 - (aura.width * s) / 2, 143 - (aura.height * s) / 2, aura.width * s, aura.height * s) }
  else { x.fillStyle = '#e9a3a8'; x.fillRect(18, 18, 220, 250) }
  x.restore()
  x.strokeStyle = GOLD; x.lineWidth = 6; roundRect(x, 18, 18, 220, 250, 12); x.stroke()
  x.fillStyle = 'rgba(255,255,255,0.92)'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `86px ${GLYPH_FONT}`; x.fillText(glyph(sign), 128, 143)
  x.fillStyle = '#2b2522'; x.font = '800 40px Poppins, sans-serif'; x.fillText(name, 128, 300)
  x.fillStyle = '#c0715a'; x.font = '600 20px Poppins, sans-serif'; x.fillText(sign.toUpperCase() + ' · ALIGNED', 128, 336)
  return tex(c)
}
function shirtTexture(color, sign) {
  const [c, x] = canvas(128, 128)
  x.fillStyle = color; x.fillRect(0, 0, 128, 128)
  x.fillStyle = 'rgba(255,255,255,0.85)'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `56px ${GLYPH_FONT}`; x.fillText(glyph(sign), 64, 60)
  return tex(c)
}
function screenTexture() {
  const [c, x] = canvas(256, 160)
  x.fillStyle = '#141a44'; x.fillRect(0, 0, 256, 160)
  x.fillStyle = PAPER; roundRect(x, 96, 18, 64, 92, 8); x.fill()
  x.fillStyle = '#e9a3a8'; x.fillRect(102, 24, 52, 56)
  x.fillStyle = GOLD; x.font = 'italic 500 22px "EB Garamond", serif'; x.textAlign = 'center'; x.fillText('align', 128, 140)
  return tex(c)
}

// ── faces ─────────────────────────────────────────────────────────────────
function faceTexture(kind, spec) {
  const N = 256
  const [c, x] = canvas(N, N)
  x.fillStyle = spec.skin; x.fillRect(0, 0, N, N)
  const L = 84, R = 172, EY = 112
  const ink = '#1d1410'
  x.lineCap = 'round'; x.lineJoin = 'round'
  const eyeDot = (cx, cy, s = 1) => {
    x.fillStyle = ink; x.beginPath(); x.ellipse(cx, cy, 15 * s, 21 * s, 0, 0, 7); x.fill()
    x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + 5 * s, cy - 7 * s, 5.5 * s, 0, 7); x.fill()
  }
  const arcEye = (cx, cy, up) => { x.strokeStyle = ink; x.lineWidth = 10; x.beginPath(); up ? x.arc(cx, cy + 8, 17, Math.PI * 1.12, Math.PI * 1.88) : x.arc(cx, cy - 8, 17, Math.PI * 0.12, Math.PI * 0.88); x.stroke() }
  const brow = (cx, cy, tilt) => { x.strokeStyle = shade(spec.hairColor || '#2a1a14', 0.8); x.lineWidth = 10; x.beginPath(); x.moveTo(cx - 20, cy + tilt); x.lineTo(cx + 20, cy - tilt); x.stroke() }
  const blush = () => { x.fillStyle = 'rgba(240,110,120,0.35)'; x.beginPath(); x.ellipse(60, 160, 22, 12, 0, 0, 7); x.ellipse(196, 160, 22, 12, 0, 0, 7); x.fill() }
  const mouthSmile = (w = 34, d = 16) => { x.strokeStyle = ink; x.lineWidth = 9; x.beginPath(); x.moveTo(128 - w, 170); x.quadraticCurveTo(128, 170 + d * 2, 128 + w, 170); x.stroke() }
  const mouthOpen = () => {
    x.fillStyle = '#5a1e1e'; x.beginPath(); x.moveTo(90, 162); x.quadraticCurveTo(128, 232, 166, 162); x.closePath(); x.fill()
    x.fillStyle = '#e46a6a'; x.beginPath(); x.ellipse(128, 194, 18, 10, 0, 0, 7); x.fill()
    x.fillStyle = '#fff'; x.fillRect(98, 162, 60, 9)
  }
  const frown = () => { x.strokeStyle = ink; x.lineWidth = 9; x.beginPath(); x.moveTo(98, 188); x.quadraticCurveTo(128, 160, 158, 188); x.stroke() }
  switch (kind) {
    case 'happy': arcEye(L, EY, true); arcEye(R, EY, true); mouthOpen(); blush(); break
    case 'love':
      x.fillStyle = '#e8445a'; heartPath(x, L, EY + 6, 22); x.fill(); heartPath(x, R, EY + 6, 22); x.fill()
      mouthOpen(); blush(); break
    case 'sad': brow(L, EY - 38, -8); brow(R, EY - 38, 8); eyeDot(L, EY + 4, 0.9); eyeDot(R, EY + 4, 0.9); frown(); break
    case 'cry':
      brow(L, EY - 38, -9); brow(R, EY - 38, 9); arcEye(L, EY, false); arcEye(R, EY, false)
      x.fillStyle = 'rgba(90,170,240,0.9)'; x.fillRect(L - 8, EY + 8, 16, 120); x.fillRect(R - 8, EY + 8, 16, 120)
      x.fillStyle = '#5a1e1e'; x.beginPath(); x.ellipse(128, 186, 26, 16, 0, 0, 7); x.fill(); break
    case 'shock':
      brow(L, EY - 48, 0); brow(R, EY - 48, 0)
      for (const cx of [L, R]) { x.fillStyle = '#fff'; x.beginPath(); x.arc(cx, EY, 26, 0, 7); x.fill(); x.strokeStyle = ink; x.lineWidth = 4; x.stroke(); eyeDot(cx, EY + 2, 0.7) }
      x.fillStyle = '#5a1e1e'; x.beginPath(); x.ellipse(128, 186, 18, 24, 0, 0, 7); x.fill(); break
    case 'smirk':
      eyeDot(L, EY + 4); eyeDot(R, EY + 4)
      x.fillStyle = spec.skin; x.fillRect(L - 22, EY - 30, 44, 22); x.fillRect(R - 22, EY - 30, 44, 22)
      x.strokeStyle = ink; x.lineWidth = 7; x.beginPath(); x.moveTo(L - 20, EY - 8); x.lineTo(L + 20, EY - 8); x.moveTo(R - 20, EY - 8); x.lineTo(R + 20, EY - 8); x.stroke()
      x.lineWidth = 9; x.beginPath(); x.moveTo(104, 178); x.quadraticCurveTo(140, 190, 164, 162); x.stroke(); break
    case 'focus': brow(L, EY - 30, 3); brow(R, EY - 30, -3); eyeDot(L, EY + 6, 0.75); eyeDot(R, EY + 6, 0.75)
      x.strokeStyle = ink; x.lineWidth = 8; x.beginPath(); x.moveTo(108, 178); x.lineTo(148, 178); x.stroke(); break
    case 'angry':
      brow(L, EY - 30, 10); brow(R, EY - 30, -10); eyeDot(L, EY + 6, 0.85); eyeDot(R, EY + 6, 0.85)
      x.fillStyle = '#fff'; x.fillRect(96, 166, 64, 24); x.strokeStyle = ink; x.lineWidth = 5; x.strokeRect(96, 166, 64, 24)
      x.beginPath(); x.moveTo(96, 178); x.lineTo(160, 178); x.moveTo(117, 166); x.lineTo(117, 190); x.moveTo(139, 166); x.lineTo(139, 190); x.stroke(); break
    case 'soft': arcEye(L, EY, false); arcEye(R, EY, false); mouthSmile(24, 10); blush(); break
    default: eyeDot(L, EY + 4); eyeDot(R, EY + 4); mouthSmile(26, 9)
  }
  if (spec.beard) { x.fillStyle = '#eee8dc'; x.beginPath(); x.moveTo(30, 150); x.quadraticCurveTo(128, 300, 226, 150); x.lineTo(200, 200); x.quadraticCurveTo(128, 250, 56, 200); x.closePath(); x.fill() }
  if (spec.glasses && kind !== 'love') {
    x.strokeStyle = '#3a2a1e'; x.lineWidth = 7
    x.beginPath(); x.arc(L, EY + 4, 32, 0, 7); x.stroke(); x.beginPath(); x.arc(R, EY + 4, 32, 0, 7); x.stroke()
    x.beginPath(); x.moveTo(L + 32, EY); x.lineTo(R - 32, EY); x.stroke()
  }
  if (spec.shades && kind !== 'cry') {
    x.fillStyle = '#111'; roundRect(x, L - 40, EY - 22, 80, 46, 12); x.fill(); roundRect(x, R - 40, EY - 22, 80, 46, 12); x.fill()
    x.fillRect(L + 30, EY - 16, R - L - 60, 8)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(L - 30, EY - 14, 22, 8); x.fillRect(R - 30, EY - 14, 22, 8)
  }
  return tex(c)
}
const FACES = ['neutral', 'happy', 'love', 'sad', 'cry', 'shock', 'smirk', 'focus', 'angry', 'soft']

// ── characters ────────────────────────────────────────────────────────────
function starMesh(size) {
  const sh = new THREE.Shape()
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? size * 0.45 : size
    const a = Math.PI / 2 + (i * Math.PI) / 5
    i ? sh.lineTo(Math.cos(a) * r, Math.sin(a) * r) : sh.moveTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  const g = new THREE.ExtrudeGeometry(sh, { depth: size * 0.35, bevelEnabled: true, bevelSize: size * 0.08, bevelThickness: size * 0.08, bevelSegments: 2 })
  g.center()
  return g
}

function makeChar(spec, name) {
  const g = new THREE.Group()
  const skin = mat(spec.skin)
  const shirt = mat(spec.shirt)
  const pants = mat(spec.pants)
  const shoe = mat('#2a2222')
  const hair = mat(spec.hairColor || '#2a1a14')
  // legs
  const legs = []
  for (const sx of [-1, 1]) {
    const p = new THREE.Group(); p.position.set(sx * 0.27, 1.1, 0)
    p.add(box(0.5, 0.95, 0.52, pants, 0, -0.47, 0))
    p.add(box(0.52, 0.18, 0.6, shoe, 0, -1.0, 0.04))
    g.add(p); legs.push(p)
  }
  // torso with the sign on the chest
  const tm = [shirt, shirt, shirt, shirt, mat('#ffffff', { map: shirtTexture(spec.shirt, spec.sign) }), shirt]
  const torso = new THREE.Group(); torso.position.y = 1.1; g.add(torso)
  torso.add(box(1.12, 1.1, 0.6, tm, 0, 0.55, 0))
  // arms
  const arms = []
  for (const sx of [-1, 1]) {
    const p = new THREE.Group(); p.position.set(sx * 0.79, 1.0, 0)
    p.add(box(0.44, 0.78, 0.46, shirt, 0, -0.36, 0))
    p.add(box(0.4, 0.3, 0.42, skin, 0, -0.88, 0))
    const hand = new THREE.Group(); hand.position.set(0, -0.98, 0); p.add(hand)
    p.userData.hand = hand
    torso.add(p); arms.push(p)
  }
  // head
  const head = new THREE.Group(); head.position.y = 1.12; torso.add(head)
  const faces = Object.fromEntries(FACES.map((f) => [f, faceTexture(f, spec)]))
  const faceMat = mat('#ffffff', { map: faces.neutral })
  head.add(box(1.08, 1.04, 1.0, [skin, skin, skin, skin, faceMat, skin], 0, 0.52, 0))
  const hs = spec.hair || 'short'
  if (hs !== 'none') {
    head.add(box(1.16, 0.3, 1.08, hair, 0, 1.06, -0.02))
    head.add(box(1.16, 0.55, 0.3, hair, 0, 0.82, -0.42))
    if (hs === 'short') head.add(box(1.16, 0.2, 0.2, hair, 0, 0.92, 0.46))
    if (hs === 'long') { head.add(box(1.18, 1.25, 0.36, hair, 0, 0.35, -0.42)); head.add(box(0.18, 1.0, 0.9, hair, -0.6, 0.5, -0.05)); head.add(box(0.18, 1.0, 0.9, hair, 0.6, 0.5, -0.05)) }
    if (hs === 'bun') head.add(box(0.5, 0.42, 0.5, hair, 0, 1.36, -0.15))
    if (hs === 'curly') for (let i = 0; i < 7; i++) head.add(box(0.36, 0.3, 0.36, hair, -0.44 + (i % 4) * 0.3, 1.24 + (i > 3 ? 0.1 : 0), -0.28 + (i > 3 ? 0.3 : 0)))
  }
  // hats (one per kind, toggled per shot)
  const hats = {}
  {
    const party = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.9, 20), mat('#5fb6e8'))
    party.position.set(0.12, 1.62, 0); party.rotation.z = -0.15; party.castShadow = true
    const pom = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), mat('#fff3a0')); pom.position.y = 0.48; party.add(pom)
    hats.party = party
    const beanie = new THREE.Group()
    beanie.add(box(1.22, 0.5, 1.14, mat('#e0503c'), 0, 1.18, 0))
    beanie.add(box(1.26, 0.16, 1.18, mat('#c03a2a'), 0, 0.98, 0))
    hats.beanie = beanie
    const wiz = new THREE.Group()
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.08, 24), mat('#2c2350')); brim.position.y = 1.1; wiz.add(brim)
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.5, 24), mat('#2c2350')); cone.position.y = 1.85; cone.rotation.z = 0.12; wiz.add(cone)
    const st = new THREE.Mesh(starMesh(0.16), mat(GOLD, { emissive: GOLD, emissiveIntensity: 0.6 })); st.position.set(0.05, 1.8, 0.4); wiz.add(st)
    hats.wizard = wiz
    for (const h of Object.values(hats)) { h.visible = false; head.add(h) }
  }
  // held items
  const holds = {}
  const hand = arms[1].userData.hand
  {
    const card = new THREE.Group()
    const back = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.12), new THREE.MeshStandardMaterial({ map: cardBackTexture(spec.sign), roughness: 0.6, side: THREE.DoubleSide }))
    back.rotation.x = Math.PI / 2
    card.add(back)
    card.position.set(0, -0.3, 0.45)
    holds.card = card
    const coffee = new THREE.Group()
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.46, 16), mat('#f3ece0')); cup.rotation.x = Math.PI / 2; coffee.add(cup)
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.18, 0.18, 16), mat('#b07a4a')); sleeve.rotation.x = Math.PI / 2; coffee.add(sleeve)
    coffee.position.set(0, -0.12, 0.05)
    holds.coffee = coffee
    const phone = box(0.34, 0.06, 0.6, mat('#1a1a22'), 0, -0.08, 0.12)
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.54), new THREE.MeshBasicMaterial({ color: '#9fc3e8' }))
    scr.rotation.x = -Math.PI / 2; scr.rotation.z = Math.PI; scr.position.y = -0.035; phone.add(scr)
    holds.phone = phone
    for (const h of Object.values(holds)) { h.visible = false; hand.add(h) }
  }
  // binder held at the chest
  const binders = {}
  for (const kind of ['binder', 'binder-empty', 'binder-one']) {
    const b = new THREE.Group()
    b.add(box(1.5, 1.05, 0.12, mat('#5a3a7a'), 0, 0, 0))
    const [c, x] = canvas(384, 256)
    x.fillStyle = '#efe6d6'; x.fillRect(0, 0, 384, 256)
    const n = kind === 'binder' ? 6 : kind === 'binder-one' ? 1 : 0
    for (let i = 0; i < 6; i++) {
      const X = 20 + (i % 3) * 120, Y = 16 + Math.floor(i / 3) * 120
      x.strokeStyle = 'rgba(90,60,120,0.35)'; x.lineWidth = 3; x.strokeRect(X, Y, 104, 108)
      if (i < n) {
        x.fillStyle = i === 0 && kind === 'binder-one' ? '#e9a3a8' : ['#e9a3a8', '#a7c7a0', '#b6a2e0', '#f2b33d', '#8fd0d2', '#e0503c'][i]
        x.fillRect(X + 8, Y + 8, 88, 92)
        x.fillStyle = GOLD; x.font = `48px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(glyph(i === 0 && kind === 'binder-one' ? 'capricorn' : SIGNS[(i * 5) % 12]), X + 52, Y + 54)
      }
    }
    const page = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.95), new THREE.MeshStandardMaterial({ map: tex(c), roughness: 0.8 }))
    page.position.z = 0.065; b.add(page)
    b.position.set(0, 0.55, 0.62); b.rotation.x = -0.35
    b.visible = false; torso.add(b); binders[kind] = b
  }
  // overhead card (two faces back to back) and star
  const over = new THREE.Group(); over.position.y = 4.25; g.add(over)
  const flip = new THREE.Group(); over.add(flip)
  const cw = 1.1, ch = 1.55
  const cb = new THREE.Mesh(new THREE.PlaneGeometry(cw, ch), new THREE.MeshBasicMaterial({ map: cardBackTexture(spec.sign), transparent: true }))
  const cf = new THREE.Mesh(new THREE.PlaneGeometry(cw, ch), new THREE.MeshBasicMaterial({ map: null, transparent: true }))
  cf.rotation.y = Math.PI
  cf.userData.pending = { sign: spec.sign, name }
  flip.add(cb, cf)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, color: '#ffd77a', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
  glow.scale.set(3.2, 3.6, 1); glow.position.z = -0.05; over.add(glow)
  const star = new THREE.Mesh(S.starGeo, new THREE.MeshStandardMaterial({ color: '#5a5a66', roughness: 0.5, metalness: 0.3, emissive: '#000000' }))
  star.castShadow = true
  over.add(star)
  g.traverse((o) => { if (o.isMesh) o.castShadow = true })
  return { g, legs, arms, torso, head, faceMat, faces, hats, holds, binders, over, flip, cardFace: cf, cardBack: cb, glow, star, spec, name }
}

// ── props and places ──────────────────────────────────────────────────────
function tree(x, z, s = 1, seed = 1) {
  const g = new THREE.Group()
  const r = rng(seed)
  g.add(box(0.5 * s, 2.4 * s, 0.5 * s, mat('#7a5232'), 0, 1.2 * s, 0))
  const leaf = mat(r() < 0.5 ? '#5f9e4a' : '#6fae52')
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry((1.1 + r() * 0.5) * s, 1), leaf)
    b.position.set((r() - 0.5) * 1.4 * s, (2.8 + r() * 1.0) * s, (r() - 0.5) * 1.4 * s)
    b.castShadow = true; g.add(b)
  }
  g.position.set(x, 0, z)
  return g
}
function house(x, z, ry, seed, wall, roof) {
  const g = new THREE.Group()
  const r = rng(seed)
  const w = 5 + r() * 2, h = 4.5 + r() * 2.5, d = 5
  const day = mat('#ffffff', { map: windowsTexture(wall, false, seed) })
  const night = mat('#ffffff', { map: windowsTexture(wall, true, seed), emissive: '#ffffff', emissiveMap: windowsTexture('#000000', true, seed), emissiveIntensity: 0 })
  const body = box(w, h, d, night, 0, h / 2, 0)
  body.userData.nightMat = night; body.userData.dayMat = day
  g.add(body)
  const rf = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.78, 2.4, 4), mat(roof))
  rf.rotation.y = Math.PI / 4; rf.position.y = h + 1.2; rf.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); rf.castShadow = true
  g.add(rf)
  g.add(box(1.1, 2, 0.1, mat(shade(wall, 0.55)), 0, 1, d / 2 + 0.02))
  g.position.set(x, 0, z); g.rotation.y = ry
  S.windowed.push(night)
  return g
}
function lamppost(x, z) {
  const g = new THREE.Group()
  g.add(box(0.18, 4, 0.18, mat('#2b2522'), 0, 2, 0))
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), new THREE.MeshStandardMaterial({ color: '#fff2c4', emissive: '#ffd77a', emissiveIntensity: 1 }))
  bulb.position.y = 4.2; g.add(bulb)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, color: '#ffcf7a', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
  glow.scale.set(3, 3, 1); glow.position.y = 4.2; g.add(glow)
  S.lampGlows.push(glow)
  g.position.set(x, 0, z)
  return g
}
function cake() {
  const g = new THREE.Group()
  const t = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.1, 32), mat('#4a3a5a')); t.position.y = 0.55; g.add(t)
  const c1 = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.55, 32), mat('#fff6ee')); c1.position.y = 1.38; g.add(c1)
  const f = new THREE.Mesh(new THREE.CylinderGeometry(0.93, 0.93, 0.14, 32), mat('#9fd0f0')); f.position.y = 1.62; g.add(f)
  for (const dx of [-0.18, 0.18]) {
    const cd = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8), mat('#f7c948')); cd.position.set(dx, 1.9, 0); g.add(cd)
    const fl = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, color: '#ffb040', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    fl.scale.set(0.45, 0.6, 1); fl.position.set(dx, 2.2, 0); g.add(fl)
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
  return g
}

const AREAS = { plaza: [0, 0], street: [0, -90], room: [90, 0], cafe: [-90, 0] }

function buildPlaza(scene, sign) {
  const [ox, oz] = AREAS.plaza
  const root = new THREE.Group(); root.position.set(ox, 0, oz); scene.add(root)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), mat('#ffffff', { map: brickTexture() }))
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; root.add(ground)
  const wheel = new THREE.Mesh(new THREE.CircleGeometry(5.2, 64), mat('#ffffff', { map: wheelTexture(sign), roughness: 0.6 }))
  wheel.rotation.x = -Math.PI / 2; wheel.position.y = 0.02; wheel.receiveShadow = true; root.add(wheel)
  // clock tower at 11:11
  const tw = new THREE.Group(); tw.position.set(0, 0, -20); root.add(tw)
  tw.add(box(5, 14, 5, mat('#c9a77e'), 0, 7, 0))
  tw.add(box(5.6, 0.6, 5.6, mat('#8a6a4a'), 0, 14.3, 0))
  const spire = new THREE.Mesh(new THREE.ConeGeometry(3.4, 5, 4), mat('#5a4a7a')); spire.rotation.y = Math.PI / 4; spire.position.y = 17; tw.add(spire)
  const clk = new THREE.Mesh(new THREE.CircleGeometry(1.7, 48), new THREE.MeshStandardMaterial({ map: clockTexture(), emissive: '#fff4d0', emissiveMap: clockTexture(), emissiveIntensity: 0.2 }))
  clk.position.set(0, 11, 2.52); tw.add(clk)
  S.clock = clk
  const walls = ['#f4d6b0', '#d8e6c8', '#f2c4c4', '#cfd8f0', '#f0e2a8', '#e4cfe8']
  const roofs = ['#8a4a3a', '#5a6a8a', '#7a5a8a', '#4a6a5a']
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * (0.15 + (i / 8) * 0.7) + Math.PI
    const r = 22
    if (Math.abs(i - 4) < 0.6) continue
    root.add(house(Math.cos(a) * r, Math.sin(a) * r * 0.9 - 2, -a - Math.PI / 2, i + 5, walls[i % 6], roofs[i % 4]))
  }
  for (let i = 0; i < 6; i++) { const a = Math.PI * (1.05 + i * 0.18); root.add(tree(Math.cos(a) * 15, Math.sin(a) * 12 - 3, 1, i + 2)) }
  for (const [x, z] of [[-7.5, -3], [7.5, -3], [-8, 5], [8, 5]]) root.add(lamppost(x, z))
  // bunting
  for (let k = 0; k < 1; k++) {
    for (let i = 0; i < 12; i++) {
      const u = i / 11
      const x = lerp(-9, 9, u), y = 7.2 - Math.sin(u * Math.PI) * 0.9
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 3), mat(['#e9a3a8', '#f7c948', '#8fd0d2', '#b6a2e0'][i % 4]))
      f.rotation.x = Math.PI; f.position.set(x, y - 0.3, -6); root.add(f)
    }
  }
  return root
}
function buildStreet(scene) {
  const [ox, oz] = AREAS.street
  const root = new THREE.Group(); root.position.set(ox, 0, oz); scene.add(root)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), mat('#ffffff', { map: grassTexture() }))
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; root.add(ground)
  const road = new THREE.Mesh(new THREE.PlaneGeometry(140, 7), mat('#5a5560')); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 6.5); road.receiveShadow = true; root.add(road)
  for (let i = -10; i <= 10; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.2), mat('#f3ece0')); d.rotation.x = -Math.PI / 2; d.position.set(i * 4, 0.03, 6.5); root.add(d) }
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(140, 7), mat('#d9cbb6')); walk.rotation.x = -Math.PI / 2; walk.position.set(0, 0.025, -0.5); walk.receiveShadow = true; root.add(walk)
  const walls = ['#f4d6b0', '#d8e6c8', '#f2c4c4', '#cfd8f0', '#f0e2a8', '#e4cfe8']
  const roofs = ['#8a4a3a', '#5a6a8a', '#7a5a8a', '#4a6a5a']
  for (let i = -5; i <= 5; i++) root.add(house(i * 7.5, -9, 0, i + 40, walls[(i + 6) % 6], roofs[(i + 8) % 4]))
  for (let i = -4; i <= 4; i++) if (i % 2) root.add(tree(i * 7.5 + 3.7, -5, 0.8, i + 70))
  for (let i = -3; i <= 3; i++) root.add(lamppost(i * 10 + 5, 2.6))
  return root
}
function buildRoom(scene) {
  const [ox, oz] = AREAS.room
  const root = new THREE.Group(); root.position.set(ox, 0, oz); scene.add(root)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), mat('#ffffff', { map: woodTexture() })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; root.add(floor)
  const wp = mat('#ffffff', { map: wallpaperTexture() })
  const back = box(14, 8, 0.3, wp, 0, 4, -5.5); root.add(back)
  root.add(box(0.3, 8, 14, wp, -7, 4, 0)); root.add(box(0.3, 8, 14, wp, 7, 4, 0))
  root.add(box(14, 0.3, 14, mat('#2c2350'), 0, 8, 0))
  // window with the sky
  const win = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.6), new THREE.MeshBasicMaterial({ color: '#141a44' }))
  win.position.set(-2.5, 4.6, -5.33); root.add(win); S.roomWindow = win
  root.add(box(3.5, 0.2, 0.3, mat('#f3ece0'), -2.5, 3.25, -5.25)); root.add(box(0.15, 2.6, 0.2, mat('#f3ece0'), -2.5, 4.6, -5.28))
  const moon = new THREE.Mesh(new THREE.CircleGeometry(0.38, 24), new THREE.MeshBasicMaterial({ color: '#fff4d0' })); moon.position.set(-1.6, 5.3, -5.3); root.add(moon)
  // bed
  root.add(box(3.2, 0.8, 4.6, mat('#7a5232'), -4.8, 0.4, -2.8))
  root.add(box(3.0, 0.4, 4.4, mat('#b6a2e0'), -4.8, 1.0, -2.6))
  root.add(box(2.2, 0.35, 0.9, mat('#fffaf0'), -4.8, 1.35, -4.4))
  // desk, monitor, chair
  root.add(box(3.4, 0.15, 1.6, mat('#e8dcc8'), 3, 2.0, -4.3))
  for (const dx of [-1.5, 1.5]) root.add(box(0.15, 2.0, 1.4, mat('#cdbfa8'), 3 + dx, 1.0, -4.3))
  const mon = box(1.9, 1.2, 0.12, mat('#1a1a22'), 3, 3.0, -4.85); root.add(mon)
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 1.05), new THREE.MeshBasicMaterial({ map: screenTexture() })); scr.position.set(3, 3.0, -4.78); root.add(scr)
  // poster
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshStandardMaterial({ map: wheelTexture('virgo') })); poster.position.set(2.8, 5.6, -5.33); root.add(poster)
  // lamp light
  const pl = new THREE.PointLight('#ffd9a0', 30, 22, 1.6); pl.position.set(0, 7, 1); root.add(pl)
  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40), mat('#e9a3a8')); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.02, 0.4); rug.receiveShadow = true; root.add(rug)
  return root
}
function buildCafe(scene) {
  const [ox, oz] = AREAS.cafe
  const root = new THREE.Group(); root.position.set(ox, 0, oz); scene.add(root)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 16), mat('#ffffff', { map: tileTexture() })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; root.add(floor)
  const wall = mat('#f2c4c4')
  root.add(box(18, 8, 0.3, wall, 0, 4, -6)); root.add(box(0.3, 8, 16, wall, -9, 4, 0)); root.add(box(0.3, 8, 16, wall, 9, 4, 0))
  root.add(box(18, 0.3, 16, mat('#fff6ee'), 0, 8, 0))
  // counter and pastries
  root.add(box(9, 2.1, 1.6, mat('#7a5232'), 0, 1.05, -4.2))
  root.add(box(9.2, 0.15, 1.8, mat('#efe6d6'), 0, 2.15, -4.2))
  const r = rng(12)
  for (let i = 0; i < 10; i++) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), mat(['#e8b060', '#c07040', '#f0d0a0', '#e9a3a8'][i % 4]))
    p.scale.y = 0.6; p.position.set(-3.6 + i * 0.8, 2.32, -4.2 + (r() - 0.5) * 0.5); root.add(p)
  }
  const menu = new THREE.Mesh(new THREE.PlaneGeometry(5, 1.6), new THREE.MeshStandardMaterial({ map: signTexture(['BAKERY & CAFÉ', '11:11 LATTE · VENUS BUN'], { w: 640, h: 200, size: 64 }) }))
  menu.position.set(0, 5.4, -5.83); root.add(menu)
  for (const [x, z] of [[-5.5, 2.5], [5.5, 2.5], [-6, -1], [6, -1]]) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.12, 24), mat('#fffaf0')); t.position.set(x, 1.6, z); t.castShadow = true; root.add(t)
    root.add(box(0.2, 1.6, 0.2, mat('#2b2522'), x, 0.8, z))
  }
  for (const x of [-4, 0, 4]) {
    const shade_ = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.6, 20, 1, true), mat('#2c2350', { side: THREE.DoubleSide })); shade_.position.set(x, 6.6, -1); root.add(shade_)
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#ffd77a', emissiveIntensity: 1.2 })); b.position.set(x, 6.3, -1); root.add(b)
    root.add(box(0.04, 1.6, 0.04, mat('#2b2522'), x, 7.2, -1))
  }
  const pl = new THREE.PointLight('#ffe2b8', 36, 26, 1.5); pl.position.set(0, 6.5, 1); root.add(pl)
  return root
}

// ── setup ─────────────────────────────────────────────────────────────────
window.setup = async (script, assets, voice) => {
  for (const [fam, url, style, weight] of assets.fonts) {
    const f = new FontFace(fam, `url(${url})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const auras = {}
  await Promise.all(SIGNS.map(async (s) => { auras[s] = await loadImg(assets.images[`aura:${s}`]) }))

  const cnv = document.getElementById('c')
  const renderer = new THREE.WebGLRenderer({ canvas: cnv, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 400)
  scene.add(camera)

  S = { script, renderer, scene, camera, windowed: [], lampGlows: [], auras }
  S.glowTex = glowTexture()
  S.starGeo = starMesh(0.42)
  S.skies = { day: skyTexture('day'), dusk: skyTexture('dusk'), night: skyTexture('night') }

  // lights
  S.hemi = new THREE.HemisphereLight('#ffffff', '#806050', 1); scene.add(S.hemi)
  S.sun = new THREE.DirectionalLight('#ffffff', 2)
  S.sun.castShadow = true
  S.sun.shadow.mapSize.set(2048, 2048)
  Object.assign(S.sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 80 })
  S.sun.shadow.bias = -0.0006
  S.sun.shadow.normalBias = 0.03
  scene.add(S.sun); scene.add(S.sun.target)
  S.fill = new THREE.DirectionalLight('#ffffff', 0.6); camera.add(S.fill); S.fill.position.set(0.3, 0.4, 1); S.fill.target.position.set(0, 0, -5); camera.add(S.fill.target)

  // night sky dots
  {
    const N = 400, r = rng(77)
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const a = r() * Math.PI * 2, e = 0.12 + r() * 1.2
      pos.set([Math.cos(a) * Math.cos(e) * 180, Math.sin(e) * 180, Math.sin(a) * Math.cos(e) * 180], i * 3)
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    S.stars = new THREE.Points(g, new THREE.PointsMaterial({ color: '#fff4d0', size: 1.4, sizeAttenuation: false, transparent: true, fog: false }))
    scene.add(S.stars)
  }

  buildPlaza(scene, script.sign)
  buildStreet(scene)
  buildRoom(scene)
  buildCafe(scene)
  S.cake = cake(); S.cake.visible = false; scene.add(S.cake)

  // the cast, plus a crowd pool
  S.chars = {}
  for (const [id, spec] of Object.entries(script.cast)) {
    const name = id.replace(/\d+$/, '').replace(/^./, (c) => c.toUpperCase())
    const c = makeChar(spec, spec.name || name)
    c.cardFace.material.map = cardFaceTexture(spec.sign, spec.name || name, auras[spec.sign])
    c.hatDefault = spec.hat
    c.g.visible = false
    scene.add(c.g); S.chars[id] = c
  }
  S.crowd = []
  {
    const r = rng(SIGNS.indexOf(script.sign) + 101)
    const skins = ['#f2c79b', '#e8b48a', '#c98e62', '#a8714c', '#8d5a3b', '#f1c6a0', '#7a4c33']
    const shirts = ['#e9a3a8', '#a7c7a0', '#b6a2e0', '#f2b33d', '#8fd0d2', '#e0503c', '#6f8fb8', '#f07f3c', '#9fc3e8', '#d76b5a']
    const hairs = ['short', 'long', 'bun', 'curly']
    for (let i = 0; i < 22; i++) {
      const spec = { skin: skins[Math.floor(r() * skins.length)], shirt: shirts[Math.floor(r() * shirts.length)], pants: shade(shirts[Math.floor(r() * shirts.length)], 0.35), hair: hairs[Math.floor(r() * 4)], hairColor: ['#2a1a14', '#4a3022', '#120c0a', '#8a4a22', '#d89a3a'][Math.floor(r() * 5)], sign: SIGNS[Math.floor(r() * 12)] }
      const c = makeChar(spec, '')
      c.cardFace.material.map = cardFaceTexture(spec.sign, ['Mo', 'Ava', 'Kai', 'Zoe', 'Ray', 'Lu', 'Ty', 'Bea'][i % 8], auras[spec.sign])
      c.g.visible = false; c.seed = r(); scene.add(c.g); S.crowd.push(c)
    }
  }

  // timeline from the voice
  let t = 0
  S.shots = script.shots.map((sh, i) => {
    const v = voice.scenes[i]
    const dur = v.dur + GAP + (sh.end ? END_HOLD : 0) + (sh.hold || 0)
    const words = sh.say.split(/\s+/).filter(Boolean)
    const o = { ...sh, i, start: t, dur, words, spans: v.words, fx: sh.fx || [] }
    t += dur
    return o
  })
  S.duration = t
  S.accent = new Set((script.accent || []).map((w) => w.toLowerCase()))

  const [oc, octx] = canvas(W, H)
  S.out = oc; S.octx = octx
  {
    const [vc, vx] = canvas(W, H)
    const g = vx.createRadialGradient(W / 2, H * 0.48, H * 0.3, W / 2, H * 0.5, H * 0.75)
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.38)')
    vx.fillStyle = g; vx.fillRect(0, 0, W, H)
    S.vignette = vc
  }
  // a first render compiles every shader before timing starts
  renderer.render(scene, camera)
  return { duration: S.duration, frames: Math.ceil(S.duration * 30), shots: S.shots.map((s) => ({ start: s.start, dur: s.dur })) }
}

// ── per-frame ─────────────────────────────────────────────────────────────
function applySky(mode, area) {
  const interior = area === 'room' || area === 'cafe'
  S.scene.background = S.skies[mode]
  const night = mode === 'night'
  S.stars.visible = night && !interior
  if (mode === 'day') { S.hemi.color.set('#d8ecff'); S.hemi.groundColor.set('#9a7a60'); S.hemi.intensity = 1.25; S.sun.color.set('#fff6e8'); S.sun.intensity = 2.4; S.fill.intensity = 0.55 }
  else if (mode === 'dusk') { S.hemi.color.set('#f6c0a0'); S.hemi.groundColor.set('#4a3048'); S.hemi.intensity = 1.0; S.sun.color.set('#ffb478'); S.sun.intensity = 1.9; S.fill.intensity = 0.6 }
  else { S.hemi.color.set('#8a9ae0'); S.hemi.groundColor.set('#2a2038'); S.hemi.intensity = 0.95; S.sun.color.set('#b8c4ff'); S.sun.intensity = 0.9; S.fill.intensity = 0.75 }
  if (interior) { S.hemi.intensity = Math.max(S.hemi.intensity, 1.0); S.sun.intensity *= 0.35; S.hemi.color.set('#ffe8d0') }
  for (const m of S.windowed) m.emissiveIntensity = night ? 0.9 : mode === 'dusk' ? 0.35 : 0
  for (const g of S.lampGlows) g.material.opacity = night ? 0.9 : mode === 'dusk' ? 0.45 : 0
  S.roomWindow.material.color.set(night ? '#141a44' : mode === 'dusk' ? '#c0708a' : '#7ab8ee')
  S.scene.fog = interior ? null : new THREE.Fog(night ? '#1a1c44' : mode === 'dusk' ? '#d79a8a' : '#bfe2ff', 40, 160)
}

function shotAt(t) {
  let s = S.shots[0]
  for (const sh of S.shots) if (t >= sh.start) s = sh
  return s
}

const areaPos = (area, x, z) => { const [ox, oz] = AREAS[area]; return new THREE.Vector3(ox + x, 0, oz + z) }

function poseChar(c, e, sh, u, dur) {
  const T = u // seconds into the shot
  const P = T / dur
  const anim = e.anim || 'idle'
  const g = c.g
  let x = e.x || 0, z = e.z || 0
  let ry = rad(e.ry || 0)
  const ph = (c.seed || 0) * 10 + (e.x || 0)
  // reset
  c.legs.forEach((l) => l.rotation.set(0, 0, 0))
  c.arms.forEach((a) => a.rotation.set(0, 0, 0))
  c.torso.rotation.set(0, 0, 0); c.torso.position.y = 1.1
  c.head.rotation.set(0, 0, 0)
  let y = 0
  const breathe = Math.sin(T * 2.2 + ph) * 0.03
  c.torso.position.y = 1.1 + breathe
  c.arms[0].rotation.z = -0.08 - breathe; c.arms[1].rotation.z = 0.08 + breathe
  const walkCycle = (speed) => {
    const w = T * speed
    c.legs[0].rotation.x = Math.sin(w) * 0.6; c.legs[1].rotation.x = -Math.sin(w) * 0.6
    c.arms[0].rotation.x = -Math.sin(w) * 0.5; c.arms[1].rotation.x = Math.sin(w) * 0.5
    y = Math.abs(Math.cos(w)) * 0.1
  }
  switch (anim) {
    case 'wave': c.arms[1].rotation.z = 2.6 + Math.sin(T * 9) * 0.35; c.head.rotation.z = Math.sin(T * 3) * 0.06; break
    case 'point': c.arms[1].rotation.x = -1.5; c.arms[1].rotation.z = 0.25; c.arms[1].rotation.y = 0; c.head.rotation.x = -0.15; break
    case 'cheer': c.arms[0].rotation.z = -2.7 - Math.sin(T * 8 + ph) * 0.3; c.arms[1].rotation.z = 2.7 + Math.sin(T * 8 + ph) * 0.3; y = Math.abs(Math.sin(T * 5 + ph)) * 0.35; break
    case 'jump': c.arms[0].rotation.z = -2.6; c.arms[1].rotation.z = 2.6; y = Math.abs(Math.sin(T * 5.5)) * 0.9; c.legs[0].rotation.x = -y * 0.4; c.legs[1].rotation.x = y * 0.2; break
    case 'dance': c.torso.rotation.z = Math.sin(T * 6 + ph) * 0.15; c.arms[0].rotation.z = -1.2 + Math.sin(T * 6 + ph) * 0.6; c.arms[1].rotation.z = 1.2 + Math.sin(T * 6 + ph + 1) * 0.6; y = Math.abs(Math.sin(T * 6 + ph)) * 0.15; ry += Math.sin(T * 3 + ph) * 0.3; break
    case 'slump': c.torso.rotation.x = 0.18; c.head.rotation.x = 0.35; c.arms[0].rotation.z = -0.02; c.arms[1].rotation.z = 0.02; c.torso.position.y = 1.05 + Math.sin(T * 1.2) * 0.01; break
    case 'cry': c.torso.rotation.x = 0.15; c.head.rotation.x = 0.2 + Math.sin(T * 14) * 0.04; c.arms[0].rotation.x = -2.2; c.arms[1].rotation.x = -2.2; c.arms[0].rotation.z = 0.5; c.arms[1].rotation.z = -0.5; c.torso.position.y = 1.1 + Math.abs(Math.sin(T * 14)) * 0.03; break
    case 'type': c.arms[0].rotation.x = -1.3 + Math.sin(T * 18) * 0.12; c.arms[1].rotation.x = -1.3 + Math.sin(T * 18 + 2) * 0.12; c.head.rotation.x = 0.08; break
    case 'snap': { const k = Math.min(1, T / 0.35); c.arms[0].rotation.z = -2.4 * k; c.arms[1].rotation.z = 2.4 * k; c.head.rotation.x = -0.25 * k; y = Math.sin(clamp(T / 0.5) * Math.PI) * 0.6 + Math.sin(T * 30) * 0.02; break }
    case 'hold': c.arms[0].rotation.x = -1.1; c.arms[1].rotation.x = -1.1; c.arms[0].rotation.z = 0.35; c.arms[1].rotation.z = -0.35; c.head.rotation.x = 0.1; break
    case 'phone': c.arms[1].rotation.x = -1.7; c.arms[1].rotation.z = -0.35; c.head.rotation.x = 0.18; break
    case 'talk': c.head.rotation.x = Math.sin(T * 6) * 0.06; c.arms[1].rotation.x = -0.8 + Math.sin(T * 3) * 0.3; c.arms[1].rotation.z = -0.2; break
    case 'release': { const k = ease(T / 0.8); c.arms[0].rotation.z = -2.2 * k; c.arms[1].rotation.z = 2.2 * k; c.arms[0].rotation.x = -0.6 * k; c.arms[1].rotation.x = -0.6 * k; c.head.rotation.x = -0.35 * k; break }
    case 'trade': { const k = Math.sin(clamp(T / 1.2) * Math.PI); c.arms[1].rotation.x = -1.5; c.arms[1].rotation.z = -0.3; x += Math.sin(ry) * 0.2 * k; z += Math.cos(ry) * 0.2 * k; y = Math.abs(Math.sin(T * 4)) * 0.08; break }
    case 'trade2': c.arms[0].rotation.z = -1.5; c.arms[1].rotation.z = 1.5; c.arms[0].rotation.x = -0.3; c.arms[1].rotation.x = -0.3; ry += Math.sin(T * 4) * 0.5; break
    case 'give': c.arms[1].rotation.x = -1.55; c.arms[1].rotation.z = -0.15; c.head.rotation.x = 0.05; break
    case 'stomp': c.arms[0].rotation.z = -0.5; c.arms[1].rotation.z = 0.5; c.arms[0].rotation.x = -0.4; c.arms[1].rotation.x = -0.4; c.legs[(Math.floor(T * 4) % 2)].rotation.x = -0.5; y = Math.abs(Math.sin(T * 12.5)) * 0.12; break
    case 'shrug': { const k = Math.abs(Math.sin(T * 2.4)); c.arms[0].rotation.z = -0.9 * k - 0.2; c.arms[1].rotation.z = 0.9 * k + 0.2; c.arms[0].rotation.x = -0.6 * k; c.arms[1].rotation.x = -0.6 * k; c.head.rotation.z = 0.15 * k; break }
    case 'shake': c.arms[0].rotation.x = -1.2 + Math.sin(T * 40) * 0.06; c.arms[1].rotation.x = -1.2 + Math.sin(T * 41) * 0.06; c.arms[0].rotation.z = 0.35; c.arms[1].rotation.z = -0.35; c.torso.rotation.z = Math.sin(T * 38) * 0.02; break
    case 'walkoff': { walkCycle(9); const d = ease(P) * 4; x += Math.sin(ry) * d; z += Math.cos(ry) * d; break }
    case 'walk': { walkCycle(8); const d = (T - dur / 2) * 1.6 * (e.dir || 1); x += Math.sin(ry) * d; z += Math.cos(ry) * d; break }
    default: c.head.rotation.y = Math.sin(T * 0.9 + ph) * 0.12
  }
  g.position.copy(areaPos(sh.at, x, z)); g.position.y = y
  g.rotation.set(0, ry, 0)
  // face
  c.faceMat.map = c.faces[e.face || 'neutral'] || c.faces.neutral
  // hats and held things
  const hat = e.hat || c.hatDefault
  for (const [k, h] of Object.entries(c.hats)) h.visible = k === hat
  for (const [k, h] of Object.entries(c.holds)) h.visible = k === e.hold
  for (const [k, b] of Object.entries(c.binders)) b.visible = k === e.hold
  if (e.hold === 'card' && (anim === 'give' || anim === 'trade' || anim === 'hold' || anim === 'shake')) {
    c.holds.card.visible = true
  }
  // overhead
  const over = e.over
  c.over.visible = !!over
  c.over.position.y = 4.35 + Math.sin(T * 2 + ph) * 0.08 + (over === 'star' ? -0.15 : 0)
  // the over item faces the camera (yaw only), independent of the body
  const camYaw = Math.atan2(S.camera.position.x - g.position.x, S.camera.position.z - g.position.z)
  c.over.rotation.y = camYaw - ry
  const card = over === 'card'
  c.flip.visible = card
  c.star.visible = over === 'star'
  let glow = 0
  if (card) {
    const s = e.overSize || 1
    c.flip.scale.setScalar(s)
    let f = e.flipped ? 1 : 0
    if (e.flipAt != null) f = easeOut((P - e.flipAt) / (0.45 / dur))
    if (e.flipSome) f = 1
    c.flip.rotation.y = f * Math.PI
    c.flip.position.y = Math.sin(f * Math.PI) * 0.4
    c.flip.rotation.z = Math.sin(T * 1.7 + ph) * 0.06
    if (e.glow) glow = 0.75 + Math.sin(T * 5) * 0.2
    if (f > 0 && f < 1) glow = Math.max(glow, Math.sin(f * Math.PI))
    if (f >= 1) glow = Math.max(glow, 0.35)
  }
  if (over === 'star') {
    let lit = e.lit ? 1 : 0
    if (e.litAt != null) lit = clamp((P - e.litAt) / (0.25 / dur))
    c.star.rotation.y = T * (lit ? 2.2 : 0.6)
    c.star.scale.setScalar(1 + Math.sin(clamp(lit) * Math.PI) * 0.6)
    c.star.material.color.set(lit ? '#f7c948' : '#4a4a58')
    c.star.material.emissive.set(lit ? '#f7b030' : '#000000')
    c.star.material.emissiveIntensity = lit ? 0.9 : 0
    glow = lit ? 0.6 + Math.sin(T * 4) * 0.15 : 0
  }
  c.glow.material.opacity = glow
  c.glow.visible = glow > 0.01
  c.glow.scale.set(over === 'star' ? 2.4 : 3.2 * (e.overSize || 1), over === 'star' ? 2.4 : 3.6 * (e.overSize || 1), 1)
}

function cameraFor(sh, u) {
  const cam = sh.cam || { view: 'medium' }
  const view = cam.view || 'medium'
  const P = u / sh.dur
  let target
  if (cam.on) {
    const e = sh.cast.find((c) => c.id === cam.on) || sh.cast[0]
    target = areaPos(sh.at, e.x || 0, e.z || 0)
    target.y = view === 'close' ? 2.95 : 2.4
  } else {
    const a = cam.at || [0, 2.4, 0]
    target = areaPos(sh.at, a[0], a[2]); target.y = a[1]
  }
  target.y += cam.lookUp || 0
  const d0 = { close: 5.2, medium: 9, wide: 17 }[view] || 9
  let d = d0 * (1 - (cam.push || 0.05) * ease(P))
  d *= 1 + 0.07 * (1 - easeOut(u / 0.3)) // a quick settle on every cut
  const h = cam.height != null ? cam.height : view === 'close' ? 0.15 : view === 'wide' ? 3 : 0.7
  const yaw = rad(cam.yaw || 0) + Math.sin(u * 0.6) * 0.012
  const pos = new THREE.Vector3(target.x + Math.sin(yaw) * d, target.y + h + Math.sin(u * 1.3) * 0.03, target.z + Math.cos(yaw) * d)
  return { pos, target }
}

function project(v) {
  const p = v.clone().project(S.camera)
  return { x: (p.x * 0.5 + 0.5) * W, y: (-p.y * 0.5 + 0.5) * H, z: p.z, ok: p.z < 1 }
}
function charScreen(id, sh, yOff) {
  const c = S.chars[id]
  if (!c) return null
  const p = c.g.position.clone(); p.y += yOff
  return project(p)
}

// ── overlay drawing ───────────────────────────────────────────────────────
function drawCaption(o, sh, u) {
  if (sh.end) return
  const spans = sh.spans
  let k = 0
  for (let i = 0; i < spans.length; i++) if (u >= spans[i][0] - 0.04) k = i
  // two short words share a beat, like the trend's captions
  let word = sh.words[k]
  const since = u - (spans[k] ? spans[k][0] : 0)
  const clean = word.replace(/[^\w'’]/g, '').replace(/['’]s$/i, '').toLowerCase()
  const accent = S.accent.has(clean)
  const pop = 1 + 0.18 * (1 - easeOut(since / 0.12))
  o.save()
  o.translate(W / 2, H * 0.62)
  o.scale(pop, pop)
  o.textAlign = 'center'; o.textBaseline = 'middle'
  let size = 104
  o.font = `800 ${size}px Poppins, sans-serif`
  const w = o.measureText(word).width
  if (w > W * 0.86) { size *= (W * 0.86) / w; o.font = `800 ${size}px Poppins, sans-serif` }
  o.lineJoin = 'round'
  o.lineWidth = size * 0.2
  o.strokeStyle = '#000000'
  o.shadowColor = 'rgba(0,0,0,0.45)'; o.shadowBlur = 18; o.shadowOffsetY = 6
  o.strokeText(word, 0, 0)
  o.shadowColor = 'transparent'
  o.fillStyle = accent ? GOLD : '#ffffff'
  o.fillText(word, 0, 0)
  o.restore()
}

function drawBubble(o, sh, u, id, text) {
  const s = charScreen(id, sh, (sh.cast.find((c) => c.id === id) || {}).over ? 5.6 : 4.0)
  if (!s) return
  const k = backOut((u - 0.25) / 0.35)
  if (k <= 0) return
  o.save()
  o.font = '700 50px Poppins, sans-serif'
  const lines = wrap(o, text, 640)
  const lh = 62
  const bw = Math.min(760, Math.max(...lines.map((l) => o.measureText(l).width)) + 80)
  const bh = lines.length * lh + 54
  let cx = clamp(s.x, bw / 2 + 40, W - bw / 2 - 40)
  let by = clamp(s.y - bh - 30, 150, H * 0.5 - bh)
  o.translate(cx, by + bh)
  o.scale(k, k)
  o.translate(-cx, -(by + bh))
  o.shadowColor = 'rgba(0,0,0,0.3)'; o.shadowBlur = 24; o.shadowOffsetY = 8
  o.fillStyle = '#fffaf0'
  roundRect(o, cx - bw / 2, by, bw, bh, 36); o.fill()
  o.beginPath(); o.moveTo(clamp(s.x, cx - bw / 2 + 50, cx + bw / 2 - 50) - 26, by + bh - 2); o.lineTo(clamp(s.x, cx - bw / 2 + 50, cx + bw / 2 - 50), by + bh + 40); o.lineTo(clamp(s.x, cx - bw / 2 + 50, cx + bw / 2 - 50) + 26, by + bh - 2); o.fill()
  o.shadowColor = 'transparent'
  o.fillStyle = '#2b2522'; o.textAlign = 'center'; o.textBaseline = 'middle'
  lines.forEach((l, i) => o.fillText(l, cx, by + 27 + lh / 2 + i * lh))
  o.restore()
}

function drawQuestion(o, sh, u, id) {
  const e = sh.cast.find((c) => c.id === id) || {}
  const s = charScreen(id, sh, e.over ? 4.35 : 4.2)
  if (!s) return
  const k = backOut((u - 0.15) / 0.35)
  if (k <= 0) return
  const r = 120 * k
  o.save()
  o.lineWidth = 10; o.strokeStyle = '#ffffff'
  o.beginPath(); o.arc(s.x, s.y, r + 18, 0, 7); o.stroke()
  if (!e.over) {
    o.fillStyle = '#f6e4c0'; roundRect(o, s.x - 70 * k, s.y - 70 * k, 140 * k, 140 * k, 12); o.fill()
    o.fillStyle = '#6b4aa0'; o.font = `800 ${110 * k}px Poppins, sans-serif`; o.textAlign = 'center'; o.textBaseline = 'middle'
    o.fillText('?', s.x, s.y + 6 * k)
  }
  o.restore()
}

function drawBoard(o, u, text) {
  const k = backOut((u - 0.1) / 0.4)
  if (k <= 0) return
  o.save()
  o.translate(W / 2, H * 0.24); o.scale(k, k)
  o.font = '800 64px Poppins, sans-serif'
  const w = o.measureText(text).width + 120
  o.shadowColor = 'rgba(0,0,0,0.35)'; o.shadowBlur = 30; o.shadowOffsetY = 10
  o.fillStyle = '#f6e4c0'; roundRect(o, -w / 2, -80, w, 160, 18); o.fill()
  o.shadowColor = 'transparent'
  o.strokeStyle = '#c9962f'; o.lineWidth = 6; roundRect(o, -w / 2 + 14, -66, w - 28, 132, 10); o.stroke()
  o.fillStyle = '#4a2f7a'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(text, 0, 4)
  o.restore()
}

function drawHearts(o, sh, u, id) {
  const c = S.chars[id]; if (!c) return
  const r = rng(id.length * 31 + sh.i)
  for (let i = 0; i < 9; i++) {
    const d = r() * 0.9, sp = 0.9 + r() * 0.6
    const life = ((u * sp + d) % 1.6) / 1.6
    if (u < d) continue
    const p = c.g.position.clone()
    const a = r() * Math.PI * 2
    p.x += Math.cos(a) * (0.8 + r() * 0.6); p.z += Math.sin(a) * 0.5; p.y += 2.4 + life * 2.4
    const s = project(p)
    const size = (28 + r() * 26) * (1 - Math.abs(life - 0.4)) * (16 / Math.max(3, S.camera.position.distanceTo(p)))
    o.globalAlpha = clamp(1 - life) * clamp(life * 6)
    o.fillStyle = r() < 0.5 ? '#ff8fb0' : '#ff6f91'
    heartPath(o, s.x, s.y, size); o.fill()
  }
  o.globalAlpha = 1
}

function drawSparkle(o, sh, u, id) {
  const r = rng((id || 'x').length * 17 + sh.i * 7)
  const c = id ? S.chars[id] : null
  for (let i = 0; i < 14; i++) {
    let s
    if (c) {
      const p = c.g.position.clone()
      p.x += (r() - 0.5) * 3.2; p.y += 1 + r() * 4.2; p.z += (r() - 0.5) * 1.5
      s = project(p)
    } else s = { x: r() * W, y: H * 0.1 + r() * H * 0.5 }
    const tw = Math.max(0, Math.sin(u * (3 + r() * 3) + r() * 6))
    const size = (14 + r() * 22) * tw
    if (size < 1) continue
    o.fillStyle = r() < 0.7 ? '#ffe9a8' : '#ffffff'
    starPath(o, s.x, s.y, size, size * 0.22, 4, 0); o.fill()
  }
}

function drawConfetti(o, sh, u) {
  const r = rng(sh.i * 13 + 5)
  const cols = ['#f7c948', '#ff8fb0', '#8fd0d2', '#b6a2e0', '#ffffff', '#a7e08a']
  for (let i = 0; i < 110; i++) {
    const x0 = r() * W, sp = 380 + r() * 520, delay = r() * 0.5, rot = r() * 6, rs = (r() - 0.5) * 12
    const y = -60 + (u - delay) * sp
    if (y < -60 || y > H + 60) continue
    const x = x0 + Math.sin(u * 3 + i) * 40
    o.save(); o.translate(x, y); o.rotate(rot + u * rs)
    o.fillStyle = cols[i % cols.length]
    o.fillRect(-11, -6, 22, 12 * Math.abs(Math.cos(u * 6 + i)) + 2)
    o.restore()
  }
}

function drawRelease(o, sh, u, id) {
  const c = S.chars[id]; if (!c) return
  const k = clamp((u - 0.5) / (sh.dur - 0.5))
  const p = c.g.position.clone(); p.y += 4.6 + ease(k) * 6; p.x += Math.sin(k * 4) * 0.4
  const s = project(p)
  o.globalAlpha = 1 - ease(k) * 0.8
  o.fillStyle = '#c8c4d8'
  starPath(o, s.x, s.y, 46 * (1 - k * 0.5), 20 * (1 - k * 0.5)); o.fill()
  o.globalAlpha = 1
}

function drawEnd(o, sh, u) {
  const k = easeOut((u - 0.05) / 0.6)
  o.save()
  o.globalAlpha = k * 0.72
  o.fillStyle = '#0b0820'; o.fillRect(0, 0, W, H)
  o.globalAlpha = k
  o.fillStyle = GOLD
  starPath(o, W / 2, H * 0.36, 70, 18, 4, 0); o.fill()
  o.fillStyle = PAPER; o.textAlign = 'center'; o.textBaseline = 'middle'
  o.font = 'italic 500 230px "EB Garamond", serif'
  o.fillText(S.script.end || 'align', W / 2, H * 0.46)
  const k2 = easeOut((u - 0.8) / 0.6)
  o.globalAlpha = k2
  o.font = '700 38px "Space Mono", monospace'
  o.fillStyle = 'rgba(243,236,224,0.9)'
  o.fillText((S.script.endSub || '').toUpperCase().split('').join(' '), W / 2, H * 0.55)
  o.restore()
}

window.frame = (t) => {
  const sh = shotAt(t)
  const u = t - sh.start
  applySky(sh.sky || 'day', sh.at)

  // area light follows the shot
  const [ax, az] = AREAS[sh.at]
  S.sun.position.set(ax + 12, 26, az + 14)
  S.sun.target.position.set(ax, 0, az)

  for (const c of Object.values(S.chars)) c.g.visible = false
  for (const c of S.crowd) c.g.visible = false
  S.cake.visible = false

  const cam = cameraFor(sh, u)
  S.camera.position.copy(cam.pos)
  S.camera.lookAt(cam.target)
  S.camera.updateMatrixWorld()

  for (const e of sh.cast) {
    const c = S.chars[e.id]
    if (!c) continue
    c.g.visible = true
    poseChar(c, e, sh, u, sh.dur)
  }
  if (sh.crowd) {
    const r = rng(sh.i * 97 + 3)
    const n = Math.min(sh.crowd.n, S.crowd.length)
    for (let i = 0; i < n; i++) {
      const c = S.crowd[i]
      const a = r() * Math.PI * 2, rr = sh.crowd.radius * (0.55 + r() * 0.6)
      let x = Math.cos(a) * rr, z = Math.sin(a) * rr * 0.7 - 2
      if (sh.crowd.anim === 'walk') { x = (r() - 0.5) * 26; z = -1.5 - r() * 3 }
      const e = {
        x, z, ry: sh.crowd.anim === 'walk' ? (r() < 0.5 ? 90 : -90) : (Math.atan2(-x, 4 - z) * 180) / Math.PI,
        anim: sh.crowd.anim || 'idle', face: ['happy', 'neutral', 'love', 'smirk'][Math.floor(r() * 4)],
        over: sh.crowd.over, flipped: sh.crowd.flipSome && r() < 0.6, lit: sh.crowd.litSome && r() < 0.5,
      }
      c.g.visible = true
      poseChar(c, e, sh, u + c.seed * 3, sh.dur + 3)
    }
  }
  for (const p of sh.props || []) {
    if (p.kind === 'cake') { S.cake.visible = true; S.cake.position.copy(areaPos(sh.at, p.x || 0, p.z || 0)) }
  }

  S.renderer.render(S.scene, S.camera)
  const o = S.octx
  o.save()
  if (sh.grade === 'gray') o.filter = 'grayscale(1) contrast(1.05)'
  o.drawImage(S.renderer.domElement, 0, 0, W, H)
  o.restore()
  o.drawImage(S.vignette, 0, 0)

  for (const f of sh.fx) {
    const [kind, id, ...rest] = f.split(':')
    if (kind === 'confetti') drawConfetti(o, sh, u)
    else if (kind === 'hearts') drawHearts(o, sh, u, id)
    else if (kind === 'sparkle') drawSparkle(o, sh, u, id)
    else if (kind === 'question') drawQuestion(o, sh, u, id)
    else if (kind === 'release') drawRelease(o, sh, u, id)
    else if (kind === 'board') drawBoard(o, u, [id, ...rest].join(':'))
  }
  // rings: pink pulses around the character, drawn as flattened ellipses
  for (const f of sh.fx) {
    const [kind, id] = f.split(':')
    if (kind !== 'rings') continue
    const c = S.chars[id]; if (!c) continue
    for (let k = 0; k < 2; k++) {
      const p = c.g.position.clone(); p.y += 1.2 + k * 1.3
      const s = project(p)
      const sc = 16 / Math.max(3, S.camera.position.distanceTo(p))
      const pulse = 1 + 0.12 * Math.sin(u * 10 + k)
      const a = clamp(u / 0.25)
      o.save(); o.globalAlpha = a
      o.strokeStyle = 'rgba(255,120,150,0.9)'; o.lineWidth = 22 * sc
      o.shadowColor = '#ff7896'; o.shadowBlur = 30
      o.beginPath(); o.ellipse(s.x, s.y, 120 * sc * pulse, 34 * sc * pulse, 0, 0, 7); o.stroke()
      o.restore()
    }
  }
  for (const f of sh.fx) {
    if (!f.startsWith('bubble:')) continue
    const [, id, ...rest] = f.split(':')
    drawBubble(o, sh, u, id, rest.join(':'))
  }
  if (sh.end) drawEnd(o, sh, u)
  drawCaption(o, sh, u)
  return S.out.toDataURL('image/jpeg', 0.9)
}
