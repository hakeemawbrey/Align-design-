// Align PS2 reels: short cutscene-style episodes in the look of a 2002
// console game. Low-poly people and sets are built here in three.js, drawn
// small, then dithered and scaled up so they read as a PS2 cutscene.
// Everything is a pure function of time t: window.setup(script, assets)
// once, then window.frame(t) for any frame.

import * as THREE from 'three'

const W = 1080
const H = 1920
const LW = 360 // the low-res render that gives the PS2 look
const LH = 640
const FPS = 30

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
const lerp = (a, b, u) => a + (b - a) * u
const V = (x, y, z) => new THREE.Vector3(x, y, z)
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c, rx = 1, ry = rx) => {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  if (rx !== 1 || ry !== 1) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry) }
  return t
}
const lam = (color, map, extra = {}) => new THREE.MeshLambertMaterial({ color: map ? 0xffffff : color, map: map || null, ...extra })
function mesh(geo, mat, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  if (parent) parent.add(m)
  return m
}
function speckle(base, amt, n, seed, w = 256, h = 256) {
  const [c, x] = canvas(w, h)
  x.fillStyle = base; x.fillRect(0, 0, w, h)
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const v = (r() - 0.5) * amt
    x.fillStyle = v > 0 ? `rgba(255,255,255,${v})` : `rgba(0,0,0,${-v})`
    x.fillRect(r() * w, r() * h, 1 + r() * 2.5, 1 + r() * 2.5)
  }
  return c
}

// ── faces ─────────────────────────────────────────────────────────────────
// Faces are painted on the head sphere's texture. The front of a three.js
// sphere sits at u = 0.25, so the face is centred at x = 128 of 512.
const FX = 128
function faceCanvas(o, expr) {
  const [c, x] = canvas(512, 256)
  x.fillStyle = o.skin; x.fillRect(0, 0, 512, 256)
  // shading round the sides and under the jaw
  const side = x.createLinearGradient(FX - 128, 0, FX + 128, 0)
  side.addColorStop(0, 'rgba(60,30,20,0.35)'); side.addColorStop(0.3, 'rgba(60,30,20,0)')
  side.addColorStop(0.7, 'rgba(60,30,20,0)'); side.addColorStop(1, 'rgba(60,30,20,0.35)')
  x.fillStyle = side; x.fillRect(FX - 128, 0, 256, 256)
  x.fillStyle = 'rgba(60,30,20,0.25)'; x.fillRect(0, 196, 512, 60)
  if (o.stubble) { x.fillStyle = 'rgba(40,30,25,0.13)'; x.beginPath(); x.ellipse(FX, 196, 56, 26, 0, 0, 7); x.fill() }
  if (o.blush) { x.fillStyle = 'rgba(200,80,80,0.18)'; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(FX + s * 34, 150, 14, 9, 0, 0, 7); x.fill() } }
  const ey = 124
  const sp = 25
  const brow = o.brow || '#2a1d16'
  // brows
  x.strokeStyle = brow; x.lineCap = 'round'; x.lineWidth = o.female ? 4 : 6.5
  for (const s of [-1, 1]) {
    let inner = 0
    let outer = 0
    if (expr === 'stern' || expr === 'closed') { inner = 4; outer = -2 }
    if (expr === 'smug' && s === 1) { inner = -4; outer = -7 }
    if (expr === 'shock') { inner = -7; outer = -5 }
    x.beginPath(); x.moveTo(FX + s * 11, ey - 15 + inner); x.quadraticCurveTo(FX + s * 25, ey - 21 + (inner + outer) / 2, FX + s * 38, ey - 14 + outer); x.stroke()
  }
  // eyes
  for (const s of [-1, 1]) {
    const cx = FX + s * sp
    x.fillStyle = 'rgba(70,40,30,0.25)'; x.beginPath(); x.ellipse(cx, ey + 2, 13, 8, 0, 0, 7); x.fill()
    if (expr === 'closed') {
      x.strokeStyle = '#2a1a14'; x.lineWidth = 2.5
      x.beginPath(); x.moveTo(cx - 10, ey + 1); x.quadraticCurveTo(cx, ey + 5, cx + 10, ey + 1); x.stroke()
      continue
    }
    const hh = expr === 'shock' ? 7 : expr === 'smug' ? 3.6 : 5
    x.fillStyle = '#eee6dc'; x.beginPath(); x.ellipse(cx, ey, 10, hh, 0, 0, 7); x.fill()
    const look = o.look || 0
    x.fillStyle = o.iris || '#4a3020'; x.beginPath(); x.arc(cx + look, ey, 4.6, 0, 7); x.fill()
    x.fillStyle = '#100a08'; x.beginPath(); x.arc(cx + look, ey, 2.2, 0, 7); x.fill()
    x.strokeStyle = '#1e1410'; x.lineWidth = o.female ? 3 : 2.2
    x.beginPath(); x.ellipse(cx, ey, 10.5, hh + 0.6, 0, Math.PI, 2 * Math.PI); x.stroke()
    if (o.female) { x.beginPath(); x.moveTo(cx + s * 9, ey - 3); x.lineTo(cx + s * 14, ey - 6); x.stroke() }
  }
  // nose shadow
  x.fillStyle = 'rgba(80,40,30,0.28)'
  x.beginPath(); x.ellipse(FX + 5, 142, 5, 16, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(70,30,25,0.4)'; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(FX + s * 7, 157, 3.5, 2, 0, 0, 7); x.fill() }
  // mouth
  const my = 176
  const lip = o.lips || 'rgba(120,55,50,0.85)'
  x.lineCap = 'round'
  if (expr === 'talk' || expr === 'shock') {
    const oh = expr === 'shock' ? 11 : 6.5
    x.fillStyle = '#3a1612'; x.beginPath(); x.ellipse(FX, my + 2, 13, oh, 0, 0, 7); x.fill()
    x.fillStyle = '#e8ded2'; x.fillRect(FX - 9, my + 2 - oh, 18, 3)
    x.strokeStyle = lip; x.lineWidth = 3; x.beginPath(); x.ellipse(FX, my + 2, 14, oh + 1, 0, 0, 7); x.stroke()
  } else if (expr === 'smug') {
    x.strokeStyle = lip; x.lineWidth = 4
    x.beginPath(); x.moveTo(FX - 16, my + 2); x.quadraticCurveTo(FX + 2, my + 4, FX + 17, my - 5); x.stroke()
  } else {
    x.strokeStyle = lip; x.lineWidth = o.female ? 5 : 3.5
    x.beginPath(); x.moveTo(FX - 15, my); x.quadraticCurveTo(FX, my + (expr === 'stern' ? -1 : 2), FX + 15, my); x.stroke()
  }
  if (o.female) { x.fillStyle = 'rgba(170,60,70,0.35)'; x.beginPath(); x.ellipse(FX, my + 6, 10, 4, 0, 0, 7); x.fill() }
  return c
}

// ── clothes ───────────────────────────────────────────────────────────────
// A cylinder built with thetaStart = PI has its front at u = 0.5 (x = 256).
function shirtCanvas(o) {
  const [c, x] = canvas(512, 256)
  const base = o.shirt
  x.drawImage(speckle(base, 0.12, 3000, 5, 512, 256), 0, 0)
  // folds
  x.fillStyle = 'rgba(0,0,0,0.12)'
  for (const fx of [150, 210, 300, 360]) x.fillRect(fx, 120, 6, 136)
  if (o.outfit === 'uniform') {
    x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(254, 0, 4, 256)
    x.fillStyle = '#c9c3b5'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(262, 30 + i * 46, 3.5, 0, 7); x.fill() }
    for (const s of [-1, 1]) { x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 3; x.strokeRect(256 + s * 52 - 26, 56, 52, 40) }
    x.fillStyle = '#d9b45a'; x.beginPath(); x.moveTo(318, 34); x.lineTo(334, 42); x.lineTo(330, 62); x.lineTo(318, 70); x.lineTo(306, 62); x.lineTo(302, 42); x.closePath(); x.fill()
    x.fillStyle = '#e8e2d2'; x.fillRect(180, 36, 46, 10)
    x.fillStyle = '#d9b45a'; x.fillRect(120, 40, 30, 36); x.fillRect(362, 40, 30, 36)
  } else if (o.outfit === 'suit') {
    x.fillStyle = '#efece6'; x.beginPath(); x.moveTo(222, 0); x.lineTo(290, 0); x.lineTo(256, 150); x.closePath(); x.fill()
    x.fillStyle = o.tie || '#8c1d22'; x.beginPath(); x.moveTo(250, 6); x.lineTo(262, 6); x.lineTo(266, 130); x.lineTo(256, 146); x.lineTo(246, 130); x.closePath(); x.fill()
    x.strokeStyle = 'rgba(0,0,0,0.4)'; x.lineWidth = 4
    x.beginPath(); x.moveTo(222, 0); x.lineTo(256, 150); x.lineTo(290, 0); x.stroke()
    x.fillStyle = 'rgba(0,0,0,0.3)'; x.beginPath(); x.arc(256, 190, 4, 0, 7); x.fill()
  } else {
    // crew neck
    x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 5
    x.beginPath(); x.arc(256, -6, 34, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke()
    if (o.star) drawStar(x, 256, 78, 26, '#e9c46a', '#f8e7b0')
    if (o.print) {
      x.fillStyle = o.printColor || '#f1ece2'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = 'italic 500 26px "EB Garamond"'
      o.print.split('\n').forEach((l, i, a) => x.fillText(l, 256, 80 + (i - (a.length - 1) / 2) * 26))
    }
  }
  return c
}
function drawStar(x, cx, cy, r, c1, c2) {
  const g = x.createLinearGradient(cx, cy - r, cx, cy + r)
  g.addColorStop(0, c2); g.addColorStop(1, c1)
  x.fillStyle = g
  x.beginPath()
  x.moveTo(cx, cy - r)
  x.quadraticCurveTo(cx + r * 0.12, cy - r * 0.12, cx + r * 0.56, cy)
  x.quadraticCurveTo(cx + r * 0.12, cy + r * 0.12, cx, cy + r)
  x.quadraticCurveTo(cx - r * 0.12, cy + r * 0.12, cx - r * 0.56, cy)
  x.quadraticCurveTo(cx - r * 0.12, cy - r * 0.12, cx, cy - r)
  x.fill()
}

// ── people ────────────────────────────────────────────────────────────────
const CAST = {
  him: { skin: '#c99272', hair: 'short', hairColor: '#2a1c14', shirt: '#1b1b1d', star: true, pants: '#2c3040', shoes: '#e8e4dc', stubble: true, iris: '#3b2a1c' },
  her: { female: true, h: 1.68, skin: '#e2b394', hair: 'long', hairColor: '#7a3a22', shirt: '#e9e3d6', pants: '#3b4a66', shoes: '#f2eee6', iris: '#3d5a40', lips: 'rgba(160,60,60,0.95)', blush: true, nails: '#b3262f' },
  detective: { skin: '#c48a68', hair: 'slick', hairColor: '#1d1612', shirt: '#1f2a4a', outfit: 'uniform', pants: '#1a223c', shoes: '#141414', longSleeve: true, stubble: true, iris: '#2e2016' },
  coroner: { skin: '#d8a98c', hair: 'bald', hairColor: '#8a8580', shirt: '#6d6f74', outfit: 'suit', pants: '#5d5f64', shoes: '#1a1410', longSleeve: true, iris: '#3a4a5a' },
  manA: { skin: '#8d5a3c', hair: 'short', hairColor: '#120c0a', shirt: '#1b1b1d', star: true, pants: '#202024', shoes: '#ece8e0', stubble: true },
  womanA: { female: true, h: 1.7, skin: '#b07a58', hair: 'bob', hairColor: '#1a1210', shirt: '#1b1b1d', star: true, pants: '#202024', shoes: '#ece8e0', lips: 'rgba(130,50,50,0.95)' },
}

function person(o) {
  const g = new THREE.Group()
  const s = (o.h || 1.8) / 1.8
  const skin = lam(o.skin)
  const shirtMat = lam(0, tex(shirtCanvas(o)))
  const plain = lam(o.shirt)
  const pants = lam(o.pants)
  const shoes = lam(o.shoes)
  const J = {}
  const limb = (r1, r2, len, mat, parent, y = -len / 2) => mesh(new THREE.CylinderGeometry(r1, r2, len, 10), mat, 0, y, 0, parent)
  // legs
  for (const side of [-1, 1]) {
    const hip = new THREE.Group(); hip.position.set(side * 0.1 * s, 0.92 * s, 0); g.add(hip)
    limb(0.085 * s, 0.07 * s, 0.47 * s, pants, hip)
    const knee = new THREE.Group(); knee.position.y = -0.47 * s; hip.add(knee)
    limb(0.068 * s, 0.055 * s, 0.42 * s, pants, knee)
    mesh(new THREE.BoxGeometry(0.11 * s, 0.08 * s, 0.27 * s), shoes, 0, -0.45 * s, 0.05 * s, knee)
    J[side < 0 ? 'hipR' : 'hipL'] = hip; J[side < 0 ? 'kneeR' : 'kneeL'] = knee
  }
  const torso = new THREE.Group(); torso.position.y = 0.92 * s; g.add(torso); J.torso = torso
  mesh(new THREE.BoxGeometry(0.34 * s, 0.17 * s, 0.21 * s), pants, 0, 0.03 * s, 0, torso)
  // a lathed torso: waist, chest, then shoulders rounding into the neck
  const f = o.female
  const prof = [[f ? 0.15 : 0.17, 0], [f ? 0.14 : 0.175, 0.14], [f ? 0.175 : 0.2, 0.32], [f ? 0.2 : 0.235, 0.46], [f ? 0.19 : 0.225, 0.52], [f ? 0.15 : 0.17, 0.57], [0.08, 0.6], [0.055, 0.61]]
  const chestGeo = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r * s, y * s)), 18, Math.PI)
  const chest = mesh(chestGeo, shirtMat, 0, 0.09 * s, 0, torso)
  chest.scale.z = 0.6
  for (const side of [-1, 1]) {
    const sh = new THREE.Group(); sh.position.set(side * (o.female ? 0.2 : 0.225) * s, 0.58 * s, 0); torso.add(sh)
    mesh(new THREE.SphereGeometry(0.07 * s, 10, 8), o.outfit ? plain : plain, 0, -0.02 * s, 0, sh)
    limb(0.068 * s, 0.062 * s, 0.15 * s, plain, sh)
    limb(0.054 * s, 0.048 * s, 0.3 * s, o.longSleeve ? plain : skin, sh)
    const el = new THREE.Group(); el.position.y = -0.3 * s; sh.add(el)
    limb(0.048 * s, 0.04 * s, 0.26 * s, o.longSleeve ? plain : skin, el)
    const hand = mesh(new THREE.BoxGeometry(0.06 * s, 0.1 * s, 0.035 * s), skin, 0, -0.31 * s, 0, el)
    J[side < 0 ? 'shR' : 'shL'] = sh; J[side < 0 ? 'elR' : 'elL'] = el
  }
  mesh(new THREE.CylinderGeometry(0.052 * s, 0.058 * s, 0.11 * s, 7), skin, 0, 0.68 * s, 0, torso)
  const head = new THREE.Group(); head.position.y = 0.81 * s; torso.add(head); J.head = head
  const faces = {}
  for (const e of ['neutral', 'closed', 'talk', 'smug', 'stern', 'shock']) faces[e] = tex(faceCanvas(o, e))
  const faceMat = new THREE.MeshLambertMaterial({ map: faces.neutral })
  const skullGeo = new THREE.SphereGeometry(0.118 * s, 20, 16)
  const sp = skullGeo.attributes.position
  const R = 0.118 * s
  for (let i = 0; i < sp.count; i++) {
    const y = sp.getY(i) / R
    const z = sp.getZ(i) / R
    // narrow the jaw to a chin, flatten the back of the head a little
    const jaw = y < 0 ? 1 - 0.3 * (-y) ** 1.5 : 1
    sp.setX(i, sp.getX(i) * jaw)
    if (y < -0.2 && z > 0) sp.setZ(i, sp.getZ(i) * (1 - 0.12 * (-y - 0.2)))
    if (z < 0) sp.setZ(i, sp.getZ(i) * 0.94)
  }
  skullGeo.computeVertexNormals()
  const skull = mesh(skullGeo, faceMat, 0, 0, 0, head)
  skull.scale.set(0.92, 1.12, 1)
  const nose = mesh(new THREE.SphereGeometry(0.02 * s, 8, 6), skin, 0, -0.012 * s, 0.103 * s, head)
  nose.scale.set(0.8, 1.6, 1.1)
  for (const side of [-1, 1]) mesh(new THREE.SphereGeometry(0.024 * s, 5, 4), skin, side * 0.105 * s, -0.005 * s, -0.005 * s, head).scale.set(0.5, 1, 0.8)
  hair(o, head, s)
  g.userData = { J, faceMat, faces, s, o }
  return g
}

function hair(o, head, s) {
  const mat = lam(0, tex(speckle(o.hairColor, 0.25, 2500, 9)), { side: THREE.DoubleSide })
  const cap = (thetaLen, r = 0.128, y = 0.012, z = -0.006) => {
    const m = mesh(new THREE.SphereGeometry(r * s, 16, 8, 0, Math.PI * 2, 0, thetaLen), mat, 0, y * s, z * s, head)
    m.scale.set(0.95, 1.1, 1.04)
    return m
  }
  if (o.hair === 'short') {
    cap(Math.PI * 0.3, 0.13, 0.02)
    const back = cap(Math.PI * 0.42, 0.126, 0.0, -0.01); back.rotation.x = -0.75
    const tuft = mesh(new THREE.SphereGeometry(0.07 * s, 8, 5), mat, 0.012 * s, 0.112 * s, 0.05 * s, head)
    tuft.scale.set(1.5, 0.5, 1.0); tuft.rotation.z = 0.12
    const r = rng(o.skin.length * 7)
    for (let i = 0; i < 9; i++) {
      const a = r() * Math.PI * 2
      const c = mesh(new THREE.SphereGeometry(0.034 * s, 6, 4), mat, Math.cos(a) * 0.07 * s, (0.1 + r() * 0.03) * s, Math.sin(a) * 0.06 * s - 0.01 * s, head)
      c.scale.set(1.2, 0.55, 1.2)
    }
  } else if (o.hair === 'slick') {
    cap(Math.PI * 0.29, 0.128, 0.02)
    const back = cap(Math.PI * 0.44, 0.124, 0.0, -0.012); back.rotation.x = -0.8
  } else if (o.hair === 'bald') {
    const ring = mesh(new THREE.SphereGeometry(0.122 * s, 11, 6, Math.PI * 0.95, Math.PI * 1.1, Math.PI * 0.35, Math.PI * 0.3), mat, 0, 0, 0, head)
    ring.scale.set(0.94, 1.12, 1.03)
  } else if (o.hair === 'long' || o.hair === 'bob') {
    const top = cap(Math.PI * 0.36, 0.134, 0.012); top.rotation.x = -0.12
    const crown = cap(Math.PI * 0.5, 0.13, 0.0, -0.012); crown.rotation.x = -0.75
    const len = o.hair === 'long' ? 0.36 : 0.17
    const sheet = mesh(new THREE.CylinderGeometry(0.125 * s, (o.hair === 'long' ? 0.15 : 0.14) * s, len * s, 12, 1, true, Math.PI * 0.42, Math.PI * 1.16), mat, 0, (-0.01 - len / 2) * s, -0.012 * s, head)
    sheet.scale.z = 0.95
    const fringe = mesh(new THREE.SphereGeometry(0.134 * s, 10, 4, Math.PI * 0.05, Math.PI * 0.9, Math.PI * 0.22, Math.PI * 0.16), mat, 0, 0.012 * s, 0, head)
    fringe.scale.set(0.95, 1.1, 1.05)
  }
}

function setFace(p, e) { const u = p.userData; u.faceMat.map = u.faces[e] || u.faces.neutral }
function pose(p, q) {
  const J = p.userData.J
  for (const [k, v] of Object.entries(q)) {
    const [joint, axis] = k.split('.')
    if (J[joint]) J[joint].rotation[axis] = v
  }
}
function resetPose(p) { for (const j of Object.values(p.userData.J)) j.rotation.set(0, 0, 0) }
function standIdle(p, t, seed = 0) {
  resetPose(p)
  const b = Math.sin(t * 1.3 + seed) * 0.015
  pose(p, { 'shR.z': -0.08, 'shL.z': 0.08, 'elR.x': -0.12, 'elL.x': -0.12, 'head.x': 0.02 + b, 'torso.x': b * 0.5 })
}
function walk(p, t, speed = 1) {
  resetPose(p)
  const ph = t * 5.2 * speed
  const a = Math.sin(ph)
  pose(p, {
    'hipR.x': a * 0.45, 'hipL.x': -a * 0.45,
    'kneeR.x': Math.max(0, -Math.cos(ph)) * 0.7, 'kneeL.x': Math.max(0, Math.cos(ph)) * 0.7,
    'shR.x': -a * 0.35, 'shL.x': a * 0.35, 'shR.z': -0.06, 'shL.z': 0.06, 'elR.x': -0.25, 'elL.x': -0.25,
  })
  p.userData.bob = Math.abs(Math.cos(ph)) * 0.025
}
function talkFace(p, t, on, base = 'neutral') {
  if (!on) { setFace(p, base); return }
  const k = Math.floor(t * 9)
  const r = (Math.sin(k * 12.9898) * 43758.5453) % 1
  setFace(p, Math.abs(r) > 0.45 ? 'talk' : base)
}

// ── props ─────────────────────────────────────────────────────────────────
function phoneScreen(ph) {
  const [c, x] = canvas(180, 360)
  x.fillStyle = '#0e0e12'; x.fillRect(0, 0, 180, 360)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (ph.screen === 'chat') {
    x.fillStyle = '#f4f2ee'; x.fillRect(6, 16, 168, 330)
    x.fillStyle = '#222'; x.font = '600 15px Poppins'; x.fillText(ph.name || 'Jordan', 90, 36)
    let y = 70
    for (const [i, line] of (ph.lines || []).entries()) {
      const me = line.startsWith('>')
      const txt = me ? line.slice(1) : line
      x.fillStyle = me ? '#3c7cf0' : '#dedad2'
      const w = Math.min(140, 22 + txt.length * 7.4)
      const bx = me ? 166 - w : 14
      x.beginPath(); x.roundRect(bx, y, w, 30, 12); x.fill()
      x.fillStyle = me ? '#fff' : '#222'; x.font = '500 13px Poppins'; x.fillText(txt, bx + w / 2, y + 15)
      y += 40 + i * 0
    }
    if (ph.footer) { x.fillStyle = '#8a8680'; x.font = '500 11px Poppins'; x.fillText(ph.footer, 90, y + 6) }
  } else if (ph.screen === 'notifs') {
    x.fillStyle = '#20232c'; x.fillRect(0, 0, 180, 360)
    x.fillStyle = '#fff'; x.font = '600 34px Poppins'; x.fillText(ph.time || '2:14', 90, 50)
    let y = 90
    for (const line of ph.lines || []) {
      x.fillStyle = 'rgba(255,255,255,0.88)'; x.beginPath(); x.roundRect(10, y, 160, 44, 10); x.fill()
      x.fillStyle = '#222'; x.font = '500 12px Poppins'; x.fillText(line, 90, y + 22)
      y += 52
    }
  } else {
    // a generic swipe app: a face card with a name and two buttons
    x.fillStyle = '#f4f2ee'; x.fillRect(6, 16, 168, 330)
    const g = x.createLinearGradient(0, 30, 0, 270)
    g.addColorStop(0, '#b6a08a'); g.addColorStop(1, '#5e4a3e')
    x.fillStyle = g; x.beginPath(); x.roundRect(16, 30, 148, 240, 10); x.fill()
    x.fillStyle = '#e0bfa0'; x.beginPath(); x.arc(90, 120, 34, 0, 7); x.fill()
    x.fillStyle = '#3a2418'; x.beginPath(); x.arc(90, 106, 36, Math.PI, 2 * Math.PI); x.fill()
    x.fillStyle = '#c9a27e'; x.beginPath(); x.ellipse(90, 230, 60, 50, 0, Math.PI, 2 * Math.PI); x.fill()
    x.fillStyle = '#fff'; x.font = '700 17px Poppins'; x.fillText(ph.name || 'Sam, 27', 90, 250)
    x.fillStyle = '#e04a4a'; x.beginPath(); x.arc(56, 310, 20, 0, 7); x.fill()
    x.fillStyle = '#3aa86a'; x.beginPath(); x.arc(124, 310, 20, 0, 7); x.fill()
    x.fillStyle = '#fff'; x.font = '700 20px Poppins'; x.fillText('✕', 56, 311); x.fillText('♥', 124, 312)
  }
  return c
}

// ── sets ──────────────────────────────────────────────────────────────────
function lights(scene, o = {}) {
  scene.add(new THREE.HemisphereLight(o.sky || 0xfff4e0, o.ground || 0x6a6050, o.hemi ?? 1.6))
  const d = new THREE.DirectionalLight(o.sun || 0xfff2dc, o.sunI ?? 1.6)
  d.position.set(...(o.dir || [2, 5, 3]))
  scene.add(d)
}

function station(script) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xd8cfbd)
  lights(scene, { sky: 0xf6f2ea, ground: 0x8a8476, hemi: 1.9, sunI: 1.1, dir: [0.5, 6, 2] })
  const carpet = lam(0, tex(speckle('#59606e', 0.4, 9000, 3), 6))
  mesh(new THREE.PlaneGeometry(14, 14), carpet).rotation.x = -Math.PI / 2
  const wall = lam(0, tex(speckle('#cfc4ae', 0.08, 2500, 4), 3, 1))
  const back = mesh(new THREE.PlaneGeometry(14, 3), wall, 0, 1.5, -3.2, scene)
  const left = mesh(new THREE.PlaneGeometry(10, 3), wall, -3.6, 1.5, 0, scene); left.rotation.y = Math.PI / 2
  const right = mesh(new THREE.PlaneGeometry(10, 3), wall, 3.6, 1.5, 0, scene); right.rotation.y = -Math.PI / 2
  mesh(new THREE.BoxGeometry(14, 0.12, 0.04), lam(0x6a5e4e), 0, 0.06, -3.18, scene)
  // drop ceiling with light panels
  const [cc, cx] = canvas(256, 256)
  cx.drawImage(speckle('#e7e2d6', 0.1, 1500, 8), 0, 0)
  cx.strokeStyle = '#b8b2a4'; cx.lineWidth = 6; cx.strokeRect(0, 0, 256, 256)
  const ceil = mesh(new THREE.PlaneGeometry(14, 14), lam(0, tex(cc, 12)), 0, 2.75, 0, scene); ceil.rotation.x = Math.PI / 2
  for (const [px, pz] of [[0, -1.2], [-1.8, 0.8], [1.8, 0.8], [0, 2.4], [-2, -2.4], [2, -2.4]]) {
    const p = mesh(new THREE.PlaneGeometry(1.15, 0.58), new THREE.MeshBasicMaterial({ color: 0xfffdf4 }), px, 2.74, pz, scene)
    p.rotation.x = Math.PI / 2
  }
  // desk, CRT and filing cabinet at the back
  const beige = lam(0xc9c0a8)
  mesh(new THREE.BoxGeometry(1.6, 0.06, 0.8), lam(0x8a8270), -2.0, 0.76, -2.5, scene)
  for (const sx of [-1, 1]) mesh(new THREE.BoxGeometry(0.05, 0.76, 0.75), lam(0x6e6a60), -2.0 + sx * 0.75, 0.38, -2.5, scene)
  mesh(new THREE.BoxGeometry(0.46, 0.4, 0.44), beige, -2.15, 1.0, -2.6, scene)
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.26), new THREE.MeshBasicMaterial({ color: 0x7aa0c4 }))
  scr.position.set(-2.15, 1.02, -2.375); scene.add(scr)
  mesh(new THREE.BoxGeometry(0.5, 0.04, 0.18), beige, -2.15, 0.8, -2.25, scene)
  mesh(new THREE.BoxGeometry(0.5, 1.3, 0.6), lam(0x8e9086), 2.6, 0.65, -2.8, scene)
  for (let i = 0; i < 4; i++) mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), lam(0x4a4a48), 2.6, 0.25 + i * 0.32, -2.49, scene)
  // bulletin board and a precinct sign
  const [bc, bx] = canvas(256, 160)
  bx.fillStyle = '#9b7b55'; bx.fillRect(0, 0, 256, 160)
  const br = rng(12)
  for (let i = 0; i < 9; i++) { bx.fillStyle = ['#f2efe6', '#f4e38a', '#e9e3f0'][i % 3]; bx.fillRect(14 + br() * 200, 12 + br() * 110, 34, 40) }
  mesh(new THREE.PlaneGeometry(1.3, 0.8), lam(0, tex(bc)), 0.6, 1.75, -3.19, scene)
  const [sc, sx] = canvas(512, 96)
  sx.fillStyle = '#1f2a4a'; sx.fillRect(0, 0, 512, 96)
  sx.fillStyle = '#e9e2cc'; sx.font = '700 46px Poppins'; sx.textAlign = 'center'; sx.textBaseline = 'middle'; sx.fillText('11TH PRECINCT', 256, 50)
  mesh(new THREE.PlaneGeometry(1.6, 0.3), lam(0, tex(sc)), -0.9, 2.3, -3.19, scene)

  // the gurney and the sheet over the victim
  const metal = lam(0xa9adb2)
  mesh(new THREE.BoxGeometry(2.0, 0.05, 0.72), metal, 0, 0.82, 0, scene)
  for (const [lx, lz] of [[-0.9, -0.3], [0.9, -0.3], [-0.9, 0.3], [0.9, 0.3]]) mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6), metal, lx, 0.41, lz, scene)
  const sheetGeo = new THREE.PlaneGeometry(2.1, 0.95, 48, 16)
  const pos = sheetGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const ay = Math.abs(y)
    // a body profile along the gurney: head at -x, feet at +x
    let h = 0.12
    if (x < -0.72) h = 0.15 + 0.06 * Math.cos((x + 0.86) * 9)
    else if (x < 0.2) h = 0.2 - 0.04 * ((x + 0.3) ** 2)
    else h = 0.13 + 0.02 * Math.sin(x * 6)
    if (x > 0.78) h = 0.16 + 0.04 * Math.cos((x - 0.86) * 12)
    const width = x < -0.72 ? 0.13 : 0.24
    const fall = ay < width ? 1 : Math.max(0, 1 - (ay - width) / 0.12)
    let z = h * ease(fall)
    if (ay > 0.36) z -= (ay - 0.36) * 1.8
    z += 0.008 * Math.sin(x * 23 + y * 17)
    pos.setZ(i, z)
  }
  sheetGeo.computeVertexNormals()
  const sheet = new THREE.Mesh(sheetGeo, new THREE.MeshLambertMaterial({ map: tex(speckle('#c3c7cc', 0.1, 2500, 21), 2), side: THREE.DoubleSide }))
  sheet.rotation.x = -Math.PI / 2
  sheet.position.y = 0.85
  scene.add(sheet)
  // the hand that slipped out, holding the phone
  const v = CAST[script.victim || 'him']
  const hand = new THREE.Group()
  hand.position.set(0.12, 0.83, 0.4)
  const skin = lam(v.skin)
  mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.2, 10), skin, 0, 0.0, -0.07, hand).rotation.x = Math.PI / 2 - 0.5
  const palm = mesh(new THREE.BoxGeometry(0.085, 0.03, 0.1), skin, 0, -0.06, 0.04, hand)
  palm.rotation.x = 0.7
  for (let f = 0; f < 4; f++) {
    const fg = mesh(new THREE.BoxGeometry(0.017, 0.017, 0.07), skin, -0.03 + f * 0.02, -0.11, 0.08, hand)
    fg.rotation.x = 1.1
    if (v.nails) mesh(new THREE.BoxGeometry(0.018, 0.006, 0.016), lam(v.nails), 0, 0.009, 0.03, fg)
  }
  const ph = script.phone || {}
  const phone = new THREE.Group()
  mesh(new THREE.BoxGeometry(0.075, 0.15, 0.009), lam(0x111114), 0, 0, 0, phone)
  mesh(new THREE.PlaneGeometry(0.068, 0.138), new THREE.MeshBasicMaterial({ map: tex(phoneScreen(ph)) }), 0, 0, 0.0051, phone)
  phone.position.set(0.01, -0.13, 0.12)
  phone.rotation.set(-0.75, 0.1, 0)
  hand.add(phone)
  hand.rotation.y = 0.15
  scene.add(hand)

  const det = person(CAST.detective); det.position.set(0.3, 0, -0.85); scene.add(det)
  const cor = person(CAST.coroner); cor.position.set(-0.55, 0, -1.0); cor.rotation.y = 0.25; scene.add(cor)
  return { scene, det, cor, phone }
}

function street() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x9a9a9a)
  scene.fog = new THREE.Fog(0x9a9a9a, 6, 26)
  lights(scene, { sky: 0xffffff, ground: 0x777777, hemi: 2.3, sunI: 2.2, dir: [2, 6, 5] })
  mesh(new THREE.PlaneGeometry(4, 60), lam(0, tex(speckle('#cfcfcb', 0.18, 6000, 31), 2, 30)), 0, 0.01, -10, scene).rotation.x = -Math.PI / 2
  mesh(new THREE.PlaneGeometry(10, 60), lam(0, tex(speckle('#3a3a3a', 0.3, 6000, 32), 4, 30)), 6.6, 0, -10, scene).rotation.x = -Math.PI / 2
  mesh(new THREE.BoxGeometry(0.2, 0.16, 60), lam(0xb8b8b4), 2.05, 0.08, -10, scene)
  // the station front: columns, glass doors and the sign
  const [fc, fx] = canvas(512, 512)
  fx.fillStyle = '#d8d4cc'; fx.fillRect(0, 0, 512, 512)
  for (let y = 0; y < 512; y += 32) { fx.fillStyle = 'rgba(0,0,0,0.1)'; fx.fillRect(0, y, 512, 2) }
  const facade = mesh(new THREE.PlaneGeometry(60, 12), lam(0, tex(fc, 12, 3)), -2.1, 6, -10, scene)
  facade.rotation.y = Math.PI / 2
  for (let z = -40; z < 6; z += 3.2) {
    const win = mesh(new THREE.PlaneGeometry(1.8, 1.6), lam(0x2c2c30), -2.08, 3.6, z, scene); win.rotation.y = Math.PI / 2
    const win2 = mesh(new THREE.PlaneGeometry(1.8, 1.6), lam(0x2c2c30), -2.08, 6.6, z, scene); win2.rotation.y = Math.PI / 2
  }
  const door = mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshLambertMaterial({ color: 0x5a5e62 }), -2.07, 1.2, -4, scene); door.rotation.y = Math.PI / 2
  for (const dz of [-5.2, -4, -2.8]) mesh(new THREE.BoxGeometry(0.06, 2.4, 0.06), lam(0xdedede), -2.05, 1.2, dz, scene)
  // lampposts down the curb
  for (let z = 4; z > -40; z -= 7) {
    mesh(new THREE.CylinderGeometry(0.05, 0.07, 3.6, 6), lam(0x2a2a2a), 1.8, 1.8, z, scene)
    mesh(new THREE.BoxGeometry(0.26, 0.4, 0.26), new THREE.MeshBasicMaterial({ color: 0xf6f6f0 }), 1.8, 3.7, z, scene)
  }
  // a parked car
  const car = new THREE.Group()
  mesh(new THREE.BoxGeometry(1.8, 0.55, 4.2), lam(0x202022), 0, 0.5, 0, car)
  mesh(new THREE.BoxGeometry(1.6, 0.45, 2.1), lam(0x2a2a2e), 0, 0.98, -0.2, car)
  for (const [wx, wz] of [[-0.85, 1.3], [0.85, 1.3], [-0.85, -1.3], [0.85, -1.3]]) mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.2, 10), lam(0x0c0c0c), wx, 0.32, wz, car).rotation.z = Math.PI / 2
  car.position.set(3.2, 0, -7)
  scene.add(car)
  const a = person(CAST.manA); scene.add(a)
  const b = person(CAST.womanA); scene.add(b)
  return { scene, a, b }
}

function plaza() {
  const scene = new THREE.Scene()
  const [sk, sx] = canvas(16, 256)
  const g = sx.createLinearGradient(0, 0, 0, 256)
  g.addColorStop(0, '#8fb4d8'); g.addColorStop(0.6, '#d9e3e4'); g.addColorStop(1, '#efe7d6')
  sx.fillStyle = g; sx.fillRect(0, 0, 16, 256)
  scene.background = tex(sk)
  scene.fog = new THREE.Fog(0xdfe2dc, 18, 70)
  lights(scene, { sky: 0xfff6e6, ground: 0x7a7060, hemi: 1.7, sunI: 2.0, dir: [3, 7, 5] })
  const [tc, tx] = canvas(256, 256)
  tx.drawImage(speckle('#b9a58e', 0.2, 4000, 41), 0, 0)
  tx.strokeStyle = 'rgba(80,60,40,0.35)'; tx.lineWidth = 3
  for (let i = 0; i <= 256; i += 64) { tx.beginPath(); tx.moveTo(i, 0); tx.lineTo(i, 256); tx.stroke(); tx.beginPath(); tx.moveTo(0, i); tx.lineTo(256, i); tx.stroke() }
  mesh(new THREE.PlaneGeometry(80, 80), lam(0, tex(tc, 30)), 0, 0, -10, scene).rotation.x = -Math.PI / 2
  // the monument: a gold armillary sphere on stepped plinths
  const stone = lam(0xd9cfbd)
  const steps = [[9, 0.5], [7.4, 0.5], [5.8, 0.5]]
  steps.forEach(([w, h], i) => mesh(new THREE.BoxGeometry(w, h, w * 0.6), stone, 0, h / 2 + i * 0.5, -14, scene))
  const gold = new THREE.MeshLambertMaterial({ color: 0xe2b23c, emissive: 0x3a2400, flatShading: true })
  mesh(new THREE.CylinderGeometry(0.5, 0.7, 4, 8), gold, 0, 3.5, -14, scene)
  const arm = new THREE.Group(); arm.position.set(0, 8.3, -14); scene.add(arm)
  for (const [rx, ry] of [[0, 0], [Math.PI / 2, 0], [Math.PI / 2, Math.PI / 3], [Math.PI / 2, -Math.PI / 3], [0.41, 0]]) {
    const r = mesh(new THREE.TorusGeometry(3, 0.14, 5, 28), gold, 0, 0, 0, arm)
    r.rotation.set(rx, ry, 0)
  }
  mesh(new THREE.SphereGeometry(0.7, 10, 8), gold, 0, 0, 0, arm)
  // colourful buildings behind and hills beyond
  const cols = ['#e47b5a', '#f2c25b', '#6fb3a8', '#e9a4b8', '#8aa6e0', '#f0e6d0', '#c46c8a']
  const r = rng(77)
  for (let i = 0; i < 16; i++) {
    const w = 2.4 + r() * 2
    const h = 3 + r() * 5
    const x0 = -26 + i * 3.5 + r()
    mesh(new THREE.BoxGeometry(w, h, 3), lam(cols[i % cols.length]), x0, h / 2, -24 - r() * 3, scene)
  }
  for (let i = 0; i < 7; i++) mesh(new THREE.ConeGeometry(9 + r() * 6, 10 + r() * 8, 7), lam(0x5f8a57), -36 + i * 12, 4, -46, scene)
  for (const px of [-7, -4.5, 4.5, 7]) {
    mesh(new THREE.CylinderGeometry(0.12, 0.18, 4.2, 6), lam(0x8a6a48), px, 2.1, -6, scene)
    for (let k = 0; k < 6; k++) {
      const leaf = mesh(new THREE.ConeGeometry(0.3, 1.9, 4), lam(0x4f8a4a), px, 4.2, -6, scene)
      leaf.rotation.set(1.2, (k / 6) * Math.PI * 2, 0)
      leaf.translateY(0.9)
    }
  }
  // the scooter
  const sc = new THREE.Group()
  const paint = lam(0xe8763a)
  mesh(new THREE.BoxGeometry(0.42, 0.34, 1.3), paint, 0, 0.42, -0.05, sc)
  mesh(new THREE.BoxGeometry(0.36, 0.1, 0.95), lam(0x1c1c1e), 0, 0.64, -0.22, sc)
  mesh(new THREE.BoxGeometry(0.4, 0.7, 0.16), paint, 0, 0.62, 0.62, sc)
  mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.66, 6), lam(0x2a2a2a), 0, 1.02, 0.66, sc).rotation.z = Math.PI / 2
  mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff5d8 }), 0, 0.82, 0.71, sc)
  for (const wz of [0.6, -0.65]) mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 12), lam(0x101010), 0, 0.24, wz, sc).rotation.z = Math.PI / 2
  scene.add(sc)
  const him = person(CAST.him); scene.add(him)
  const her = person(CAST.her); scene.add(her)
  return { scene, him, her, sc }
}

function seat(p, y, z, x = 0) {
  const s = p.userData.s
  p.position.set(x, y - 0.92 * s, z)
  pose(p, { 'hipR.x': -1.45, 'hipL.x': -1.45, 'kneeR.x': 1.5, 'kneeL.x': 1.5, 'hipR.z': -0.1, 'hipL.z': 0.1 })
}

// ── shots ─────────────────────────────────────────────────────────────────
// A shot places the camera and poses the cast for local time t (seconds)
// and progress u (0 → 1) through the beat.
const SHOTS = {
  sheet(t, u, b) {
    const { det, cor } = S.set
    standIdle(det, t); standIdle(cor, t, 2)
    pose(det, { 'head.x': 0.45 }); pose(cor, { 'head.x': 0.4 })
    setFace(det, 'stern'); setFace(cor, 'stern')
    cam(V(lerp(0.8, 0.66, u), 1.12, lerp(1.6, 1.4, u)), V(0.0, 1.3, -0.6))
  },
  phone(t, u) {
    const p = S.set.phone.getWorldPosition(new THREE.Vector3())
    cam(V(p.x + 0.05, p.y + lerp(0.24, 0.2, u), p.z + lerp(0.26, 0.2, u)), p)
  },
  detective(t, u, b) {
    const { det, cor } = S.set
    standIdle(det, t); standIdle(cor, t, 2)
    pose(det, { 'head.x': 0.12 })
    talkFace(det, t, b.talk, b.face || 'closed')
    const h = det.userData.J.head.getWorldPosition(new THREE.Vector3())
    cam(V(h.x - 0.08, h.y - 0.03, h.z + lerp(0.82, 0.68, u)), V(h.x, h.y - 0.07, h.z))
  },
  group(t, u, b) {
    const { det, cor } = S.set
    standIdle(det, t); standIdle(cor, t, 2)
    pose(det, { 'head.x': 0.3 }); pose(cor, { 'head.x': 0.32, 'head.y': -0.15 })
    talkFace(det, t, b.talk, b.face || 'stern'); setFace(cor, 'stern')
    cam(V(lerp(-0.1, -0.05, u), 1.55, lerp(1.3, 1.1, u)), V(-0.1, 1.5, -0.9))
  },
  coroner(t, u, b) {
    const { det, cor } = S.set
    standIdle(det, t); standIdle(cor, t, 2)
    talkFace(cor, t, b.talk, b.face || 'stern')
    const h = cor.userData.J.head.getWorldPosition(new THREE.Vector3())
    cam(V(h.x + 0.12, h.y - 0.02, h.z + lerp(0.82, 0.7, u)), V(h.x, h.y - 0.07, h.z))
  },
  walkout(t, u) {
    const { a, b } = S.set
    const z = lerp(-4.2, -0.2, u)
    walk(a, t); walk(b, t + 0.3)
    a.position.set(-0.75, a.userData.bob, z); b.position.set(-0.05, b.userData.bob, z + 0.1)
    pose(a, { 'shL.z': 0.25, 'shL.x': 0.05 }); pose(b, { 'shR.z': -0.25, 'shR.x': 0.05 })
    setFace(a, 'smug'); setFace(b, 'smug')
    cam(V(0.75, 1.4, z + 2.9), V(-0.4, 1.4, z))
  },
  wide(t, u, b) { ride(t, b); cam(V(lerp(1.5, 1.3, u), 1.45, lerp(5.6, 5.2, u)), V(0.1, 1.45, -0.2)) },
  himclose(t, u, b) {
    ride(t, b)
    const h = S.set.him.userData.J.head.getWorldPosition(new THREE.Vector3())
    cam(V(h.x + 0.35, h.y + 0.02, h.z + lerp(1.45, 1.3, u)), V(h.x + 0.1, h.y - 0.12, h.z))
  },
  herclose(t, u, b) {
    ride(t, b)
    const h = S.set.her.userData.J.head.getWorldPosition(new THREE.Vector3())
    cam(V(h.x + 0.55, h.y + 0.02, h.z + lerp(1.45, 1.3, u)), V(h.x + 0.05, h.y - 0.12, h.z))
  },
}

function ride(t, b) {
  const { him, her } = S.set
  resetPose(him); resetPose(her)
  seat(him, 0.7, 0.05)
  seat(her, 0.8, -0.45, 0.16)
  const talking = b.speaker
  // his hands rest on the bars unless he's telling the story
  if (talking === 'him') {
    const w = Math.sin(t * 3.1)
    pose(him, { 'shR.x': -1.0, 'elR.x': -0.3, 'shL.x': -0.6 + w * 0.25, 'shL.z': 0.35, 'elL.x': -1.0 - w * 0.2, 'head.y': 0.06 * Math.sin(t * 1.7), 'head.x': -0.03 })
  } else {
    pose(him, { 'shR.x': -1.0, 'elR.x': -0.3, 'shL.x': -1.0, 'elL.x': -0.3 })
  }
  if (b.gesture === 'head') pose(him, { 'shL.x': -2.6, 'shL.z': 0.2, 'elL.x': -1.6, 'shR.x': -2.6, 'shR.z': -0.2, 'elR.x': -1.6 })
  if (b.gesture === 'shrug') pose(him, { 'shL.x': -0.4, 'shL.z': 0.7, 'elL.x': -1.4, 'shR.x': -0.4, 'shR.z': -0.7, 'elR.x': -1.4 })
  pose(her, { 'shR.x': -0.9, 'shR.z': 0.25, 'elR.x': -0.6, 'shL.x': -0.9, 'shL.z': -0.25, 'elL.x': -0.6, 'head.y': -0.15, 'head.z': 0.05 })
  if (talking === 'her') pose(her, { 'head.y': 0.1, 'head.z': 0, 'shL.x': -0.5, 'shL.z': 0.5, 'elL.x': -1.6 })
  talkFace(him, t, talking === 'him', b.himFace || 'neutral')
  talkFace(her, t, talking === 'her', b.herFace || 'smug')
}

function cam(pos, look) {
  const shake = S.handheld
  const t = S.t
  S.camera.position.set(pos.x + Math.sin(t * 1.1) * 0.006 * shake, pos.y + Math.sin(t * 1.7) * 0.005 * shake, pos.z)
  S.camera.lookAt(look)
}

// ── captions and the end card (drawn at full size, over the low-res frame) ──
function wrap(x, text, maxW) {
  const out = []
  for (const para of text.split('\n')) {
    let line = ''
    for (const w of para.split(' ')) {
      const test = line ? line + ' ' + w : w
      if (x.measureText(test).width > maxW && line) { out.push(line); line = w } else line = test
    }
    out.push(line)
  }
  return out
}
function caption(x, text, style, k) {
  if (!text) return
  x.save()
  x.globalAlpha = clamp(k * 6)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (style === 'caps') {
    x.font = '700 54px Poppins'; x.letterSpacing = '3px'
    const lines = wrap(x, text.toUpperCase(), W * 0.8)
    const y0 = H * 0.74 - ((lines.length - 1) * 66) / 2
    lines.forEach((l, i) => {
      x.lineWidth = 11; x.strokeStyle = '#000'; x.lineJoin = 'round'; x.strokeText(l, W / 2, y0 + i * 66)
      x.fillStyle = '#fff'; x.fillText(l, W / 2, y0 + i * 66)
    })
  } else {
    x.font = '600 50px Poppins'
    const lines = wrap(x, text, W * 0.82)
    const y0 = H * 0.8 - ((lines.length - 1) * 62) / 2
    lines.forEach((l, i) => {
      x.shadowColor = 'rgba(0,0,0,0.9)'; x.shadowBlur = 10; x.shadowOffsetY = 3
      x.lineWidth = 5; x.strokeStyle = 'rgba(0,0,0,0.75)'; x.strokeText(l, W / 2, y0 + i * 62)
      x.shadowBlur = 0; x.shadowOffsetY = 0
      x.fillStyle = '#fff'; x.fillText(l, W / 2, y0 + i * 62)
    })
  }
  x.restore()
}

function endCard(x, u, end) {
  const g = x.createRadialGradient(W / 2, H * 0.42, 40, W / 2, H * 0.45, H * 0.7)
  g.addColorStop(0, '#3a2466'); g.addColorStop(0.5, '#1e1240'); g.addColorStop(1, '#0d0820')
  x.fillStyle = g; x.fillRect(0, 0, W, H)
  const r = rng(5)
  for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(255,255,255,${0.2 + r() * 0.5})`; x.beginPath(); x.arc(r() * W, r() * H, 1 + r() * 2.2, 0, 7); x.fill() }
  const k = ease(u * 2.2)
  x.save()
  x.globalAlpha = k
  const glow = x.createRadialGradient(W / 2, H * 0.36, 0, W / 2, H * 0.36, 360)
  glow.addColorStop(0, 'rgba(255,210,150,0.4)'); glow.addColorStop(1, 'rgba(255,210,150,0)')
  x.fillStyle = glow; x.fillRect(0, 0, W, H)
  drawStar(x, W / 2, H * 0.36, 210 * (0.92 + 0.08 * k), '#f1c66a', '#fdf0c4')
  x.fillStyle = '#f6ead0'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = 'italic 500 150px "EB Garamond"'; x.fillText('align', W / 2, H * 0.56)
  x.globalAlpha = ease((u - 0.25) * 3)
  x.font = '500 46px Poppins'
  wrap(x, end.line || '', W * 0.8).forEach((l, i) => x.fillText(l, W / 2, H * 0.64 + i * 60))
  x.fillStyle = 'rgba(246,234,208,0.7)'; x.font = '400 32px "Space Mono"'
  x.fillText(end.sub || 'a new deal at 11:11', W / 2, H * 0.72)
  x.restore()
}

// ── PS2 look: dither, quantise, optional black and white ──────────────────
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v / 16 - 0.5) * 10)
function ps2(ctx, bw) {
  const d = ctx.getImageData(0, 0, LW, LH)
  const p = d.data
  for (let y = 0; y < LH; y++) {
    for (let x = 0; x < LW; x++) {
      const i = (y * LW + x) * 4
      const n = BAYER[(y & 3) * 4 + (x & 3)]
      let r = p[i]; let g = p[i + 1]; let b = p[i + 2]
      if (bw) { const l = 0.3 * r + 0.59 * g + 0.11 * b; r = g = b = clamp((l - 128) * 1.25 + 128, 0, 255) }
      p[i] = Math.round((r + n) / 8) * 8
      p[i + 1] = Math.round((g + n) / 8) * 8
      p[i + 2] = Math.round((b + n) / 8) * 8
    }
  }
  ctx.putImageData(d, 0, 0)
}

// ── setup and frame ───────────────────────────────────────────────────────
window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(LW, LH)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const camera = new THREE.PerspectiveCamera(script.format === 'storytime' ? 34 : 40, LW / LH, 0.02, 120)
  const [small, sctx] = canvas(LW, LH)
  const out = document.getElementById('c'); out.width = W; out.height = H
  const sets = {}
  for (const b of script.beats) {
    const k = b.set || (b.shot === 'walkout' ? 'street' : ['wide', 'himclose', 'herclose'].includes(b.shot) ? 'plaza' : b.shot === 'end' ? null : 'station')
    b._set = k
    if (k && !sets[k]) sets[k] = k === 'station' ? station(script) : k === 'street' ? street() : plaza()
  }
  let t0 = 0
  for (const b of script.beats) { b._t0 = t0; b._dur = b.dur || 2.6; t0 += b._dur }
  S = { script, renderer, camera, small, sctx, out, octx: out.getContext('2d'), sets, duration: t0, handheld: 1, t: 0 }
  return { duration: t0, frames: Math.round(t0 * FPS), cues: script.beats.map((b) => ({ t: b._t0, k: b.cue || (b.shot === 'end' ? 'end' : 'cut') })) }
}

window.frame = (t) => {
  S.t = t
  const beats = S.script.beats
  let b = beats[beats.length - 1]
  for (const x of beats) if (t >= x._t0 && t < x._t0 + x._dur) { b = x; break }
  const lt = t - b._t0
  const u = clamp(lt / b._dur)
  const o = S.octx
  if (b.shot === 'end') {
    endCard(o, u, S.script.end || {})
  } else {
    S.set = S.sets[b._set]
    SHOTS[b.shot](t, u, b)
    S.renderer.render(S.set.scene, S.camera)
    S.sctx.drawImage(S.renderer.domElement, 0, 0)
    ps2(S.sctx, b.bw ?? b._set === 'street')
    o.imageSmoothingEnabled = true
    o.imageSmoothingQuality = 'low'
    o.drawImage(S.small, 0, 0, W, H)
    const vg = o.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.35)')
    o.fillStyle = vg; o.fillRect(0, 0, W, H)
    caption(o, b.text, S.script.captions || 'caps', lt)
  }
  // a quick dip to black on each cut, like a cutscene
  const fromStart = lt
  const toEnd = b._dur - lt
  const dip = Math.max(0, 1 - Math.min(fromStart, toEnd) / 0.06) * (b.dip ? 1 : 0)
  if (dip) { o.fillStyle = `rgba(0,0,0,${dip})`; o.fillRect(0, 0, W, H) }
  return S.out.toDataURL('image/jpeg', 0.9)
}
