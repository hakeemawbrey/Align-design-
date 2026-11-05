// Align story ad: a little 3D toy figure acts out the hook, real Align screens
// float in front of it, captions and stamps land on the beat, and it ends on a
// bold end card. Rendered frame by frame in Chromium: window.setup(script,
// assets) once, then window.frame(t) returns a JPEG data URL.

import * as THREE from 'three'

const W = 1080, H = 1920
const PAPER = '#f6efe4', ROSE = '#ff6f9e', GOLD = '#f2c46b', HOT = '#ff5a4f', INK = '#140d24'
let S = null

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x))
const lerp = (a, b, k) => a + (b - a) * k
const ease = (k) => (k = clamp(k), k * k * (3 - 2 * k))
const out3 = (k) => 1 - Math.pow(1 - clamp(k), 3)
const back = (k) => { k = clamp(k); const c = 1.9; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2) }
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t }
const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error(src)); i.src = src })
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o })

function rr(o, x, y, w, h, r) {
  o.beginPath(); o.moveTo(x + r, y); o.arcTo(x + w, y, x + w, y + h, r); o.arcTo(x + w, y + h, x, y + h, r)
  o.arcTo(x, y + h, x, y, r); o.arcTo(x, y, x + w, y, r); o.closePath()
}
function rbox(w, h, d, r = 0.04) {
  // a softly bevelled box: an extruded rounded rectangle
  const s = new THREE.Shape(); const x = -w / 2, y = -h / 2
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y)
  const g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * r, bevelEnabled: true, bevelThickness: r, bevelSize: r * 0.9, bevelSegments: 3, curveSegments: 6 })
  g.translate(0, 0, -(d - 2 * r) / 2); return g
}
const mesh = (g, m, x = 0, y = 0, z = 0, parent) => {
  const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true
  if (parent) parent.add(o); return o
}

// ── the toy figure ───────────────────────────────────────────────────────
function figure() {
  const g = new THREE.Group()
  const skin = std('#8a5a3c', { roughness: 0.6 }), hoodie = std('#5b4bc4'), pants = std('#221d33')
  const hair = std('#1a1210', { roughness: 0.9 }), shoe = std('#f4eee6'), sole = std('#ff6f9e'), black = std('#0b0808', { roughness: 0.3 })
  const hips = new THREE.Group(); hips.position.y = 0.62; g.add(hips)
  const torso = new THREE.Group(); hips.add(torso)
  mesh(rbox(0.62, 0.62, 0.36, 0.12), hoodie, 0, 0.33, 0, torso)
  mesh(new THREE.TorusGeometry(0.12, 0.045, 8, 20), hoodie, 0, 0.66, 0.02, torso).rotation.x = Math.PI / 2 // collar
  mesh(rbox(0.3, 0.14, 0.04, 0.02), std('#4a3ca8'), 0, 0.18, 0.18, torso) // pocket
  const head = new THREE.Group(); head.position.y = 0.95; torso.add(head)
  mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 12), skin, 0, -0.24, 0, head)
  const skull = mesh(new THREE.SphereGeometry(0.3, 32, 24), skin, 0, 0, 0, head); skull.scale.set(1, 0.95, 0.92)
  const cap = mesh(new THREE.SphereGeometry(0.315, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), hair, 0, 0.03, -0.02, head); cap.scale.set(1, 0.9, 0.98)
  cap.rotation.x = -0.25
  for (const sx of [-1, 1]) {
    mesh(new THREE.SphereGeometry(0.035, 12, 10), black, sx * 0.1, 0.02, 0.27, head)
    const brow = mesh(new THREE.BoxGeometry(0.09, 0.022, 0.02), hair, sx * 0.1, 0.1, 0.27, head); brow.rotation.z = sx * -0.08
    mesh(new THREE.SphereGeometry(0.06, 12, 10), skin, sx * 0.29, -0.01, 0, head).scale.set(0.5, 1, 0.8) // ears
  }
  const flat = mesh(new THREE.BoxGeometry(0.09, 0.018, 0.02), std('#3b1f18'), 0, -0.1, 0.27, head)
  const smile = mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 16, Math.PI), std('#3b1f18'), 0, -0.08, 0.27, head)
  smile.rotation.z = Math.PI; smile.visible = false
  const arm = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * 0.36, 0.56, 0); torso.add(p)
    mesh(new THREE.CapsuleGeometry(0.085, 0.36, 6, 12), hoodie, 0, -0.24, 0, p)
    const hand = mesh(new THREE.SphereGeometry(0.075, 14, 12), skin, 0, -0.5, 0, p)
    return { p, hand }
  }
  const leg = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * 0.15, 0, 0); hips.add(p)
    mesh(new THREE.CapsuleGeometry(0.1, 0.36, 6, 12), pants, 0, -0.26, 0, p)
    const knee = new THREE.Group(); knee.position.y = -0.3; p.add(knee)
    const foot = new THREE.Group(); foot.position.y = -0.27; knee.add(foot)
    mesh(rbox(0.17, 0.1, 0.3, 0.045), shoe, 0, -0.03, 0.06, foot)
    mesh(rbox(0.175, 0.03, 0.31, 0.012), sole, 0, -0.08, 0.06, foot)
    return { p, knee, foot }
  }
  const L = arm(-1), R = arm(1), LL = leg(-1), RL = leg(1)
  // the phone, held in the right hand
  const phone = new THREE.Group(); phone.position.set(0, 0.1, 0.05); R.hand.add(phone)
  mesh(rbox(0.13, 0.25, 0.018, 0.008), black, 0, 0.06, 0.05, phone)
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.115, 0.23), new THREE.MeshBasicMaterial({ color: '#c9b8ff' }))
  screen.position.set(0, 0.06, 0.061); phone.add(screen)
  phone.visible = false
  const glow = new THREE.PointLight('#b7a6ff', 0, 1.6, 1.5); glow.position.set(0, 0.1, 0.25); phone.add(glow)
  return { g, hips, torso, head, L, R, LL, RL, phone, glow, smile, flat }
}

// pose the figure: walk phase, sit, phone raised, head turn, breathing
function pose(f, p) {
  const { walk = null, sit = 0, phone = 0, yaw = 0, nod = 0, t = 0, smile = false, wave = 0 } = p
  const br = Math.sin(t * 2.2) * 0.012
  f.torso.position.y = br; f.torso.rotation.x = sit * 0.08; f.head.rotation.set(nod + Math.sin(t * 1.3) * 0.03, yaw, 0)
  f.smile.visible = smile; f.flat.visible = !smile
  let sw = 0
  if (walk !== null) sw = Math.sin(walk)
  f.hips.position.y = 0.62 - sit * 0.17 + (walk !== null ? Math.abs(Math.cos(walk)) * 0.03 : 0)
  for (const [l, s] of [[f.LL, 1], [f.RL, -1]]) {
    l.p.rotation.x = -sit * 1.5 + sw * 0.55 * s
    l.knee.rotation.x = sit * 1.5 + (walk !== null ? Math.max(0, -sw * s) * 0.7 : 0)
    l.foot.rotation.x = 0
  }
  f.L.p.rotation.set(-sw * 0.5 - sit * 0.5, 0, 0.12 + wave)
  f.L.p.rotation.z = -0.12 - wave * 2.2
  const up = ease(phone)
  f.R.p.rotation.set(sw * 0.5 - sit * 0.5 - up * 1.15, 0, 0.12 - up * 0.5)
  f.phone.visible = phone > 0.01
  f.phone.rotation.set(up * 1.35, up * -0.55, 0)
  f.glow.intensity = up * 1.6
}

// ── textures ─────────────────────────────────────────────────────────────
function gradientTex(stops, w = 16, h = 512) {
  const [c, o] = canvas(w, h); const g = o.createLinearGradient(0, 0, 0, h)
  for (const [k, col] of stops) g.addColorStop(k, col)
  o.fillStyle = g; o.fillRect(0, 0, w, h); return tex(c)
}
function signTex(lines, bg, fg, w = 512, h = 256) {
  const [c, o] = canvas(w, h); o.fillStyle = bg; o.fillRect(0, 0, w, h)
  o.fillStyle = fg; o.textAlign = 'center'; o.textBaseline = 'middle'
  lines.forEach(([txt, font, y]) => { o.font = font; o.fillText(txt, w / 2, y) })
  return tex(c)
}
function duvetTex() {
  const [c, o] = canvas(512, 512); o.fillStyle = '#8f7fd8'; o.fillRect(0, 0, 512, 512)
  o.fillStyle = '#a596ea'
  for (let y = 0; y < 512; y += 64) for (let x = (y / 64) % 2 ? 32 : 0; x < 512; x += 64) o.fillRect(x, y, 32, 64)
  o.fillStyle = '#ffe7a6'
  for (let i = 0; i < 40; i++) { const x = (i * 137) % 512, y = (i * 241) % 512; star(o, x, y, 7) }
  return tex(c)
}
function star(o, x, y, r) {
  o.beginPath()
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr2 = i % 2 ? r * 0.38 : r; o.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2) }
  o.closePath(); o.fill()
}
function cityTex() {
  const [c, o] = canvas(512, 512); const g = o.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, '#0d1236'); g.addColorStop(1, '#2a2160'); o.fillStyle = g; o.fillRect(0, 0, 512, 512)
  let x = 0, i = 0
  while (x < 512) {
    const w = 30 + ((i * 53) % 50), h = 120 + ((i * 97) % 220); i++
    o.fillStyle = '#080a20'; o.fillRect(x, 512 - h, w, h)
    o.fillStyle = 'rgba(255,214,140,0.85)'
    for (let yy = 512 - h + 10; yy < 500; yy += 16) for (let xx = x + 5; xx < x + w - 6; xx += 10) if (((xx * 7 + yy * 3 + i) % 5) === 0) o.fillRect(xx, yy, 4, 6)
    x += w + 4
  }
  o.fillStyle = '#fff'; for (let k = 0; k < 30; k++) o.fillRect((k * 173) % 512, (k * 61) % 160, 2, 2)
  return tex(c)
}
function glowTex(col) {
  const [c, o] = canvas(128, 128); const g = o.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); o.fillStyle = g; o.fillRect(0, 0, 128, 128); return tex(c)
}

// ── the three sets ───────────────────────────────────────────────────────
function houseSet(root) {
  const g = new THREE.Group(); root.add(g)
  const ground = mesh(new THREE.PlaneGeometry(60, 60), std('#c98f6a'), 0, 0, 0, g); ground.rotation.x = -Math.PI / 2
  const path = mesh(new THREE.BoxGeometry(30, 0.02, 1.6), std('#e8c6a6'), 0, 0.01, 0, g)
  for (let i = -12; i < 12; i++) mesh(new THREE.BoxGeometry(0.03, 0.025, 1.6), std('#c9a07f'), i * 1.2, 0.012, 0, g)
  const lawn = mesh(new THREE.BoxGeometry(30, 0.06, 6), std('#7d9a5b'), 0, 0.03, -4, g)
  // the house
  const hz = -6.2
  mesh(rbox(4.2, 2.6, 3, 0.06), std('#f0d6b8'), 0.4, 1.3, hz, g)
  const roofShape = new THREE.Shape(); roofShape.moveTo(-2.5, 0); roofShape.lineTo(2.5, 0); roofShape.lineTo(0, 1.7); roofShape.closePath()
  const roof = mesh(new THREE.ExtrudeGeometry(roofShape, { depth: 3.4, bevelEnabled: false }), std('#7a3f3a'), 0.4, 2.6, hz - 1.7, g)
  mesh(rbox(0.9, 1.5, 0.12, 0.03), std('#5b4bc4'), 0.4, 0.75, hz + 1.52, g) // door
  mesh(new THREE.SphereGeometry(0.05, 10, 8), std('#f2c46b', { metalness: 0.6, roughness: 0.3 }), 0.72, 0.75, hz + 1.6, g)
  for (const x of [-1, 1.8]) {
    mesh(rbox(0.9, 0.8, 0.1, 0.02), std('#ffe2a8', { emissive: '#ffb860', emissiveIntensity: 0.6 }), x, 1.5, hz + 1.52, g)
    mesh(new THREE.BoxGeometry(0.05, 0.8, 0.12), std('#f6efe4'), x, 1.5, hz + 1.55, g)
  }
  for (let i = -6; i < 7; i++) if (Math.abs(i) > 0) mesh(new THREE.SphereGeometry(0.55, 14, 10), std('#4f7a45', { roughness: 0.95 }), i * 0.9 + 0.4, 0.35, -2.2 - (i % 2) * 0.15, g).scale.set(1, 0.75, 0.8)
  // the open-house sign
  mesh(new THREE.BoxGeometry(0.07, 1.4, 0.07), std('#f6efe4'), -1.9, 0.7, -1.3, g)
  const sign = mesh(new THREE.BoxGeometry(1.0, 0.62, 0.04), new THREE.MeshStandardMaterial({ map: signTex([['OPEN', '800 110px Poppins', 90], ['HOUSE', '800 110px Poppins', 190]], '#ff5a4f', '#fff') }), -1.55, 1.15, -1.3, g)
  mesh(new THREE.BoxGeometry(0.8, 0.05, 0.05), std('#f6efe4'), -1.55, 1.48, -1.3, g)
  g.userData.bg = gradientTex([[0, '#f6b383'], [0.55, '#ffd9b0'], [1, '#ffe9cf']])
  g.userData.fog = ['#ffd2a8', 14, 40]
  return g
}
function bedroomSet(root, S) {
  const g = new THREE.Group(); root.add(g)
  const wall = std('#1f2559'), floor = std('#2a2050')
  mesh(new THREE.PlaneGeometry(20, 10), wall, 0, 5, -2.2, g)
  const fl = mesh(new THREE.PlaneGeometry(20, 10), floor, 0, 0, 2, g); fl.rotation.x = -Math.PI / 2
  // window with the city behind
  const win = mesh(new THREE.PlaneGeometry(2.4, 2.0), new THREE.MeshBasicMaterial({ map: cityTex() }), -1.6, 2.4, -2.18, g)
  for (const [w, h, x, y] of [[2.6, 0.1, -1.6, 3.4], [2.6, 0.1, -1.6, 1.4], [0.1, 2.0, -2.85, 2.4], [0.1, 2.0, -0.35, 2.4], [0.06, 2.0, -1.6, 2.4]])
    mesh(new THREE.BoxGeometry(w, h, 0.12), std('#2f3772'), x, y, -2.1, g)
  for (const x of [-3.1, -0.15]) mesh(rbox(0.32, 2.8, 0.15, 0.06), std('#4b3a8f'), x, 2.2, -2.0, g) // curtains
  // the bed
  mesh(rbox(2.6, 0.32, 2.4, 0.05), std('#2c2142'), 0.4, 0.18, -0.9, g)
  mesh(rbox(2.6, 0.24, 2.4, 0.1), new THREE.MeshStandardMaterial({ map: duvetTex(), roughness: 0.9 }), 0.4, 0.45, -0.9, g)
  mesh(rbox(2.7, 1.3, 0.14, 0.05), std('#2c2142'), 0.4, 0.75, -2.1, g)
  mesh(rbox(0.9, 0.22, 0.5, 0.1), std('#efe6ff'), -0.2, 0.66, -1.75, g)
  mesh(rbox(0.9, 0.22, 0.5, 0.1), std('#efe6ff'), 1.0, 0.66, -1.75, g)
  // nightstand, lamp and the clock
  mesh(rbox(0.7, 0.62, 0.6, 0.04), std('#7a2f3c'), 2.2, 0.31, -1.6, g)
  mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.35, 12), std('#efe6ff'), 2.05, 0.8, -1.65, g)
  mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 20, 1, true), std('#ffe6c2', { emissive: '#ffcf8a', emissiveIntensity: 0.9, side: THREE.DoubleSide }), 2.05, 1.1, -1.65, g)
  const lamp = new THREE.PointLight('#ffc27a', 2.2, 5, 1.6); lamp.position.set(2.05, 1.2, -1.4); g.add(lamp)
  const [cc, co] = canvas(256, 128); S.clockCtx = co; S.clockTex = tex(cc)
  mesh(rbox(0.42, 0.2, 0.14, 0.03), std('#120a10'), 2.35, 0.72, -1.5, g)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.16), new THREE.MeshBasicMaterial({ map: S.clockTex })); face.position.set(2.35, 0.72, -1.42); g.add(face)
  // slippers
  mesh(rbox(0.18, 0.08, 0.36, 0.04), std('#ff6f9e'), -0.6, 0.04, 0.6, g).rotation.y = 0.2
  mesh(rbox(0.18, 0.08, 0.36, 0.04), std('#ff6f9e'), -0.3, 0.04, 0.7, g).rotation.y = -0.1
  g.userData.bg = gradientTex([[0, '#11153b'], [1, '#1f2559']])
  g.userData.fog = ['#141a45', 6, 20]
  return g
}
function roofSet(root) {
  const g = new THREE.Group(); root.add(g)
  const fl = mesh(new THREE.PlaneGeometry(30, 30), std('#3a2f55'), 0, 0, 0, g); fl.rotation.x = -Math.PI / 2
  mesh(rbox(14, 0.7, 0.4, 0.05), std('#4a3c6c'), 0, 0.35, -2.4, g)
  // string lights
  const bulb = new THREE.MeshBasicMaterial({ color: '#ffd889' })
  const gl = new THREE.SpriteMaterial({ map: glowTex('rgba(255,210,130,0.9)'), transparent: true, depthWrite: false })
  for (let i = 0; i < 26; i++) {
    const x = -6 + i * 0.48, y = 3.0 - Math.sin((i / 25) * Math.PI) * 0.6
    mesh(new THREE.SphereGeometry(0.045, 8, 6), bulb, x, y, -2.0, g)
    const s = new THREE.Sprite(gl); s.position.set(x, y, -1.98); s.scale.set(0.5, 0.5, 1); g.add(s)
  }
  // sky: stars and a big moon
  const n = 700, pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - 0.5) * 60; pos[i * 3 + 1] = 2 + Math.random() * 30; pos[i * 3 + 2] = -20 - Math.random() * 6 }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: '#fff4dc', size: 0.12, sizeAttenuation: true, fog: false })))
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 24), new THREE.MeshBasicMaterial({ color: '#fff1d6', fog: false })); moon.position.set(3.4, 8.5, -20); g.add(moon)
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex('rgba(255,200,230,0.55)'), transparent: true, depthWrite: false, fog: false })); halo.position.copy(moon.position); halo.scale.set(11, 11, 1); g.add(halo)
  for (let i = 0; i < 9; i++) mesh(new THREE.BoxGeometry(1.2 + (i % 3) * 0.6, 2 + (i * 7) % 5, 1), std('#1a1436'), -9 + i * 2.2, -0.6, -9 - (i % 2) * 2, g)
  g.userData.bg = gradientTex([[0, '#160f38'], [0.6, '#3b2466'], [1, '#7a3f78']])
  g.userData.fog = ['#2c1d52', 10, 40]
  return g
}

// ── 2D overlay helpers ───────────────────────────────────────────────────
function shadowed(o, fn, blur = 50, a = 0.45) {
  o.save(); o.shadowColor = `rgba(8,4,20,${a})`; o.shadowBlur = blur; o.shadowOffsetY = 18; fn(); o.restore()
}
// a phone with a real Align screen in it; crop = [sx, sy, sw, sh] in source pixels
function phoneCard(o, img, cx, cy, w, { rot = 0, alpha = 1, crop = null, scale = 1, glow = 0, h = null } = {}) {
  if (alpha <= 0) return
  let [sx, sy, sw, sh] = crop || [0, 0, img.width, img.height]
  if (h) { // fit the crop to the card's shape around its centre
    const want = w / h
    if (sw / sh > want) { const n = sh * want; sx += (sw - n) / 2; sw = n } else { const n = sw / want; sy += (sh - n) / 2; sh = n }
  } else h = w * sh / sw
  o.save(); o.globalAlpha = alpha; o.translate(cx, cy); o.rotate(rot); o.scale(scale, scale)
  if (glow > 0) { o.save(); o.globalAlpha = alpha * glow; o.shadowColor = ROSE; o.shadowBlur = 90; rr(o, -w / 2, -h / 2, w, h, 56); o.fillStyle = ROSE; o.fill(); o.restore() }
  shadowed(o, () => { rr(o, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 64); o.fillStyle = '#0b0912'; o.fill() }, 70, 0.55)
  rr(o, -w / 2, -h / 2, w, h, 52); o.clip()
  o.drawImage(img, sx, sy, sw, sh, -w / 2, -h / 2, w, h)
  o.restore()
}
function stamp(o, text, cx, cy, k, color = HOT, rot = -0.18, size = 96) {
  if (k <= 0) return
  const s = lerp(2.3, 1, out3(k * 1.6)), a = clamp(k * 3)
  o.save(); o.translate(cx, cy); o.rotate(rot); o.scale(s, s); o.globalAlpha = a
  o.font = `800 ${size}px Poppins`; const tw = o.measureText(text).width
  o.strokeStyle = color; o.lineWidth = 10; rr(o, -tw / 2 - 34, -size * 0.72, tw + 68, size * 1.44, 18); o.stroke()
  o.fillStyle = color; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(text, 0, 6)
  // a little ink grain
  o.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < 70; i++) { o.globalAlpha = 0.5; o.fillRect(((i * 97) % (tw + 60)) - tw / 2 - 30, ((i * 53) % (size * 1.3)) - size * 0.65, 5, 3) }
  o.restore()
}
// caption with one accent phrase in rose; words fade up one by one
function caption(o, text, accent, x, y, k, size = 54, maxW = 900, color = PAPER, italic = true, accCol = ROSE, shadow = true) {
  if (!text || k <= 0) return
  o.save(); o.textBaseline = 'alphabetic'; o.textAlign = 'left'
  const font = `${italic ? 'italic ' : ''}500 ${size}px "EB Garamond"`
  o.font = font
  const words = text.split(' ')
  const acc = accent ? accent.split(' ') : []
  let ai = -1
  for (let i = 0; i < words.length; i++) { if (acc.length && words.slice(i, i + acc.length).join(' ').replace(/[.,?]/g, '') === accent) { ai = i; break } }
  // wrap
  const lines = [[]]; let lw = 0
  words.forEach((w, i) => {
    const ww = o.measureText(w + ' ').width
    if (lw + ww > maxW && lines.at(-1).length) { lines.push([]); lw = 0 }
    lines.at(-1).push(i); lw += ww
  })
  const lh = size * 1.12
  lines.forEach((ln, li) => {
    const full = ln.map((i) => words[i]).join(' ')
    let cx = x - o.measureText(full).width / 2
    for (const i of ln) {
      const wk = clamp((k * (words.length + 3) - i) / 3)
      const isAcc = ai >= 0 && i >= ai && i < ai + acc.length
      o.globalAlpha = wk
      o.shadowColor = shadow ? 'rgba(8,4,20,0.7)' : 'rgba(0,0,0,0)'; o.shadowBlur = shadow ? 18 : 0
      o.fillStyle = isAcc ? accCol : color
      o.fillText(words[i], cx, y + li * lh + (1 - wk) * 14)
      cx += o.measureText(words[i] + ' ').width
    }
  })
  o.restore()
}
function topLabel(o, [small, big], k, hot, dark = false, x = 90, y = 150) {
  if (k <= 0) return
  o.save(); o.globalAlpha = clamp(k * 3); o.textAlign = 'left'
  o.shadowColor = 'rgba(8,4,20,0.5)'; o.shadowBlur = 16
  o.font = '700 26px "Space Mono"'; o.fillStyle = dark ? INK : hot ? '#ffd8a8' : GOLD
  o.fillText(small.toUpperCase().split('').join(' '), x, y)
  o.font = '800 112px Poppins'; o.fillStyle = dark ? INK : hot ? HOT : PAPER
  if (dark) o.shadowColor = 'rgba(0,0,0,0)'
  const s = lerp(1.25, 1, out3(k * 2)); o.translate(x, y + 110); o.scale(s, s); o.fillText(big, 0, 0)
  o.restore()
}
// generic "other app" profile card — deliberately plain, no brand
function swipeCard(o, img, name, cx, cy, rot, alpha) {
  const w = 600, h = 840
  o.save(); o.globalAlpha = alpha; o.translate(cx, cy); o.rotate(rot)
  shadowed(o, () => { rr(o, -w / 2, -h / 2, w, h, 40); o.fillStyle = '#fff'; o.fill() })
  rr(o, -w / 2, -h / 2, w, h, 40); o.save(); o.clip()
  const s = Math.max(w / img.width, h / img.height)
  o.drawImage(img, -img.width * s / 2, -img.height * s / 2, img.width * s, img.height * s)
  const g = o.createLinearGradient(0, h * 0.1, 0, h / 2); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.75)')
  o.fillStyle = g; o.fillRect(-w / 2, -h / 2, w, h); o.restore()
  o.fillStyle = '#fff'; o.font = '700 58px Poppins'; o.textAlign = 'left'; o.fillText(name, -w / 2 + 44, h / 2 - 170)
  o.font = '500 30px Poppins'; o.globalAlpha = alpha * 0.8; o.fillText('2 miles away', -w / 2 + 44, h / 2 - 124); o.globalAlpha = alpha
  for (const [bx, sym, col] of [[-110, '✕', '#ff5a6e'], [110, '♥', '#35d07f']]) {
    o.beginPath(); o.arc(bx, h / 2 - 50, 52, 0, Math.PI * 2); o.fillStyle = '#fff'; o.fill()
    o.fillStyle = col; o.font = '700 50px Poppins'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(sym, bx, h / 2 - 48)
    o.textBaseline = 'alphabetic'
  }
  o.restore()
}
function houseCard(o, cx, cy, k, ticks, t) {
  if (k <= 0) return
  const w = 680, h = 700, s = lerp(0.6, 1, back(k))
  o.save(); o.translate(cx, cy); o.scale(s, s); o.globalAlpha = clamp(k * 2.5)
  shadowed(o, () => { rr(o, -w / 2, -h / 2, w, h, 36); o.fillStyle = '#fffaf2'; o.fill() })
  o.fillStyle = '#ff5a4f'; rr(o, -w / 2, -h / 2, w, 92, 36); o.fill(); o.fillRect(-w / 2, -h / 2 + 50, w, 42)
  o.fillStyle = '#fff'; o.font = '700 26px "Space Mono"'; o.textAlign = 'left'
  o.fillText('OPEN HOUSE  ·  SAT 11–2', -w / 2 + 40, -h / 2 + 58)
  o.fillStyle = INK; o.font = '800 54px Poppins'; o.fillText('12 Linden Ave', -w / 2 + 40, -h / 2 + 170)
  o.font = '500 30px Poppins'; o.fillStyle = '#6b6176'; o.fillText('3 bed · 2 bath · 1,840 sq ft', -w / 2 + 40, -h / 2 + 220)
  const items = ['Inspection report · 48 pages', 'Roof, plumbing, wiring', 'Walked the street at night', 'Second viewing', 'Met the neighbours']
  items.forEach((it, i) => {
    const y = -h / 2 + 310 + i * 78, on = clamp((ticks - i) * 3)
    o.strokeStyle = '#d9cfe0'; o.lineWidth = 4; rr(o, -w / 2 + 40, y - 30, 42, 42, 10); o.stroke()
    if (on > 0) {
      o.save(); o.strokeStyle = '#2fb36d'; o.lineWidth = 8; o.lineCap = 'round'; o.beginPath()
      o.moveTo(-w / 2 + 49, y - 9); o.lineTo(-w / 2 + 59, y + 2); o.lineTo(-w / 2 + 49 + 28 * on, y - 22 + 0 * on); o.stroke(); o.restore()
    }
    o.fillStyle = on > 0 ? INK : '#8d8496'; o.font = '600 32px Poppins'; o.fillText(it, -w / 2 + 108, y + 2)
  })
  o.restore()
}
function chatCard(o, cx, cy, k, t) {
  if (k <= 0) return
  const w = 680, h = 640, s = lerp(0.6, 1, back(k))
  o.save(); o.translate(cx, cy); o.scale(s, s); o.globalAlpha = clamp(k * 2.5)
  shadowed(o, () => { rr(o, -w / 2, -h / 2, w, h, 40); o.fillStyle = '#f4f4f7'; o.fill() })
  o.fillStyle = '#fff'; rr(o, -w / 2, -h / 2, w, 120, 40); o.fill(); o.fillRect(-w / 2, -h / 2 + 80, w, 40)
  o.fillStyle = '#ccc'; o.beginPath(); o.arc(-w / 2 + 80, -h / 2 + 60, 34, 0, Math.PI * 2); o.fill()
  o.fillStyle = '#222'; o.font = '700 34px Poppins'; o.textAlign = 'left'; o.fillText('Sam', -w / 2 + 132, -h / 2 + 72)
  const msgs = [['me', 'hey'], ['them', 'hey'], ['me', 'wyd'], ['them', '…']]
  msgs.forEach(([who, m], i) => {
    const on = clamp((k * 5 - i) * 2); if (on <= 0) return
    const y = -h / 2 + 190 + i * 100
    o.globalAlpha = on; o.font = '500 34px Poppins'; const tw = o.measureText(m).width + 60
    const x = who === 'me' ? w / 2 - 40 - tw : -w / 2 + 40
    o.fillStyle = who === 'me' ? '#3c8dff' : '#e1e1e8'; rr(o, x, y - 40, tw, 70, 34); o.fill()
    o.fillStyle = who === 'me' ? '#fff' : '#222'; o.fillText(m, x + 30, y + 6)
  })
  o.globalAlpha = 1; o.fillStyle = '#9a9aa6'; o.font = '500 24px Poppins'; o.textAlign = 'right'; o.fillText('Seen 3 days ago', w / 2 - 40, h / 2 - 34)
  o.restore()
}
function burst(o, cx, cy, k) {
  if (k <= 0 || k >= 1) return
  o.save()
  for (let i = 0; i < 28; i++) {
    const a = i * 2.39996, d = out3(k) * (240 + (i * 37) % 260), r = (1 - k) * (14 + (i % 4) * 8)
    o.globalAlpha = 1 - k; o.fillStyle = i % 3 ? GOLD : '#fff3cf'
    star(o, cx + Math.cos(a) * d, cy + Math.sin(a) * d, r)
  }
  o.restore()
}
function sparkle(o, t, n = 40, col = GOLD) {
  o.save()
  for (let i = 0; i < n; i++) {
    const x = (i * 211 + t * 12 * ((i % 3) + 1)) % W, y = (i * 389 - t * 30 * ((i % 4) + 1) + 4 * H) % H
    o.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(t * 2 + i)); o.fillStyle = col; star(o, x, y, 6 + (i % 3) * 3)
  }
  o.restore()
}

// ── setup ────────────────────────────────────────────────────────────────
window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight }); await f.load(); document.fonts.add(f)
  }
  const out = document.getElementById('c'); out.width = W; out.height = H
  const gl = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1); renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.05, 200)
  S = { script, renderer, scene, camera, out, o: out.getContext('2d'), gl }
  S.img = {}
  for (const [k, src] of Object.entries(assets.images)) S.img[k] = await loadImg(src)

  S.hemi = new THREE.HemisphereLight('#ffffff', '#443355', 1.0); scene.add(S.hemi)
  S.key = new THREE.DirectionalLight('#ffffff', 2.0); S.key.castShadow = true
  S.key.shadow.mapSize.set(2048, 2048); Object.assign(S.key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 40 })
  S.key.shadow.bias = -0.0005; S.key.shadow.radius = 4
  scene.add(S.key); scene.add(S.key.target)
  S.fill = new THREE.DirectionalLight('#ffffff', 0); scene.add(S.fill); scene.add(S.fill.target)

  S.sets = { house: houseSet(scene), bedroom: bedroomSet(scene, S), roof: roofSet(scene) }
  S.fig = figure(); scene.add(S.fig.g)
  S.beats = script.beats
  const [vc, vo] = canvas(W, H); const vg = vo.createRadialGradient(W / 2, H * 0.45, H * 0.3, W / 2, H * 0.45, H * 0.75)
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,4,24,0.55)'); vo.fillStyle = vg; vo.fillRect(0, 0, W, H); S.vignette = vc
  return { duration: script.duration, frames: Math.round(script.duration * 30) }
}

const beatAt = (t) => { let i = 0; S.beats.forEach((b, k) => { if (t >= b.t) i = k }); return i }
const local = (t, id) => { const b = S.beats.find((x) => x.id === id); const n = S.beats[S.beats.indexOf(b) + 1]; return { k: t - b.t, len: (n ? n.t : S.script.duration) - b.t } }
const inBeat = (t, ...ids) => ids.includes(S.beats[beatAt(t)].id)

function stage(t) {
  const b = S.beats[beatAt(t)], { fig, camera, key, hemi, scene } = S
  for (const [k, g] of Object.entries(S.sets)) g.visible = k === b.scene
  fig.g.visible = b.scene !== 'end'
  if (b.scene === 'end') return
  const set = S.sets[b.scene]
  scene.background = set.userData.bg
  scene.fog = new THREE.Fog(...set.userData.fog)
  fig.g.rotation.set(0, 0, 0)
  if (b.scene === 'house') {
    hemi.color.set('#fff0dd'); hemi.groundColor.set('#a0705a'); hemi.intensity = 1.3
    key.color.set('#ffd2a0'); key.intensity = 2.6; key.position.set(-6, 7, 5); key.target.position.set(0, 0, 0)
    const walkK = clamp(t / 2.6)
    const x = lerp(-1.6, 0.15, ease(walkK))
    fig.g.position.set(x, 0, 0.1)
    const walking = walkK < 0.98
    fig.g.rotation.y = walking ? Math.PI / 2 * 0.85 : lerp(Math.PI / 2 * 0.85, 0.15, ease((t - 2.5) / 0.5))
    pose(fig, { walk: walking ? t * 7 : null, t, yaw: walking ? -0.5 : 0, nod: t > 2.6 ? -0.15 : 0 })
    const push = t * 0.06
    camera.position.set(0.6 + x * 0.3, 2.0, 6.4 - push); camera.lookAt(x * 0.3, 2.2, 0)
  } else if (b.scene === 'bedroom') {
    hemi.color.set('#8c90ff'); hemi.groundColor.set('#231a3a'); hemi.intensity = 0.55
    key.color.set('#9fb0ff'); key.intensity = 0.8; key.position.set(-3, 5, 2); key.target.position.set(0, 0, -1)
    fig.g.position.set(0.1, 0.42, 0.18)
    const ph = inBeat(t, 'person') ? clamp((t - 4.9) / 0.6) : 1
    const lift = inBeat(t, 'fix', 'veil', 'read', 'align') ? 1 : 0.6
    pose(fig, { sit: 1, phone: ph * lift, t, nod: lift === 1 ? -0.05 : 0.25 * ph, yaw: 0 })
    if (lift === 1 || inBeat(t, 'swipe', 'ghost')) fig.phone.visible = false
    const { k } = local(t, b.id)
    let cam = [0.1, 2.0, 5.0 - k * 0.12], look = [0.1, 2.35, 0]
    if (b.id === 'person') { cam = [0.5, 1.9, 5.6 - k * 0.25]; look = [0.2, 2.0, -0.3] }
    if (['fix', 'veil', 'read', 'align'].includes(b.id)) { cam = [0.05, 2.0, 4.8]; look = [0.05, 2.45, 0] }
    camera.position.set(...cam); camera.lookAt(...look)
    // the clock: 1:14 am, rolling forward a minute here and there
    const mins = 14 + Math.floor(t / 5)
    const o = S.clockCtx; o.fillStyle = '#120a10'; o.fillRect(0, 0, 256, 128)
    o.fillStyle = '#ff3a3a'; o.font = '700 88px "Space Mono"'; o.textAlign = 'center'; o.textBaseline = 'middle'
    o.shadowColor = '#ff3a3a'; o.shadowBlur = 16; o.fillText(`1:${String(mins).padStart(2, '0')}`, 128, 68); o.shadowBlur = 0
    S.clockTex.needsUpdate = true
  } else if (b.scene === 'roof') {
    hemi.color.set('#d9b8ff'); hemi.groundColor.set('#3a2250'); hemi.intensity = 0.9
    key.color.set('#ffd9ec'); key.intensity = 1.5; key.position.set(4, 8, 3); key.target.position.set(0, 0, 0)
    fig.g.position.set(0.2, 0, 0.2); fig.g.rotation.y = -0.15
    const happy = t > 20.4
    pose(fig, { phone: 0, t, smile: happy, nod: happy ? -0.18 : -0.08, wave: inBeat(t, 'talk') ? 0.15 + 0.1 * Math.sin(t * 9) : 0 })
    const { k } = local(t, b.id)
    camera.position.set(-0.4 + k * 0.05, 1.9, 5.8 - (t - 18.2) * 0.12); camera.lookAt(0.1, 2.35, 0)
  }
}

window.frame = (t) => {
  stage(t)
  const sc = S.beats[beatAt(t)].scene
  const fl = { house: ['#fff1e0', 0.5], bedroom: ['#c2b8ff', 1.3], roof: ['#ffd6ea', 1.2] }[sc]
  if (fl) { S.fill.color.set(fl[0]); S.fill.intensity = fl[1]; S.fill.position.copy(S.camera.position).add(new THREE.Vector3(0.6, 0.8, 0)); S.fill.target.position.set(S.fig.g.position.x, 1.6, 0) }
  const { o } = S
  const b = S.beats[beatAt(t)]
  if (b.scene !== 'end') { S.renderer.render(S.scene, S.camera); o.drawImage(S.gl, 0, 0) }
  if (b.scene !== 'end') o.drawImage(S.vignette, 0, 0)
  const { k, len } = local(t, b.id)
  const cy = H * 0.665

  // ── per-beat overlays ──
  if (b.id === 'hook') {
    houseCard(o, W / 2, 760, clamp((t - 0.9) / 0.5), 0, t)
    // big serif hook at the top
    o.save(); o.textAlign = 'center'
    caption(o, b.hook, b.accent, W / 2, 200, clamp(0.35 + t / 0.7), 88, 860, INK, true, HOT, false)
    o.restore()
  }
  if (b.id === 'tour') {
    houseCard(o, W / 2, 860, 1, k * 2.4, t)
    stamp(o, 'TOURED TWICE', W / 2 + 40, 1060, clamp((k - 1.3) / 0.6), HOT, -0.16, 84)
    topLabel(o, b.label, clamp(k / 0.4), false, true)
    caption(o, b.text, b.accent, W / 2, 1480, clamp(k / 0.8), 58)
  }
  if (b.id === 'person') caption(o, b.text, b.accent, W / 2, 700, clamp((k - 0.2) / 0.8), 66)
  if (b.id === 'swipe') {
    const people = ['p:1', 'p:2', 'p:3', 'p:4', 'p:5', 'p:6']
    const names = ['Sam, 26', 'Jo, 28', 'Alex, 25', 'Riley, 27', 'Kai, 29', 'Noor, 26']
    const per = 0.34
    for (let i = people.length - 1; i >= 0; i--) {
      const ki = (k - i * per) / per
      if (ki >= 1.4) continue
      const fly = clamp(ki - 0.55) / 0.85, dir = i % 2 ? 1 : -1
      const appear = clamp((k - (i - 1) * per) / 0.12)
      swipeCard(o, S.img[people[i]], names[i], W / 2 + dir * out3(fly) * 1100, 600 + out3(fly) * 120, dir * out3(fly) * 0.5 + (i % 3 - 1) * 0.02, appear * (ki < -1 ? 0 : 1))
    }
    topLabel(o, b.label, clamp(k / 0.3), true)
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.9))
  }
  if (b.id === 'ghost') {
    chatCard(o, W / 2, 640, clamp(k / 0.5), t)
    stamp(o, 'UNMATCHED', W / 2, 700, clamp((k - 1.0) / 0.5), HOT, -0.2, 100)
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.8))
  }
  const deck = S.img.deck
  if (b.id === 'fix') {
    const pop = back(clamp(k / 0.55))
    phoneCard(o, deck, W / 2, 640, 470, { scale: lerp(0.15, 1, pop), alpha: clamp(k * 4), glow: 0.6 })
    caption(o, b.text, b.accent, W / 2, 1580, clamp((k - 0.2) / 0.6), 64)
  }
  if (b.id === 'veil') {
    // zoom into the veiled photo
    const z = ease(k / 0.8)
    const crop = [lerp(0, 160, z), lerp(0, 600, z), lerp(1170, 850, z), lerp(2532, 520, z)]
    phoneCard(o, deck, W / 2, 640, lerp(470, 680, z), { crop, glow: 0.5, h: lerp(1017, 800, z) })
    o.save(); o.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3); sparkle(o, t, 18); o.restore()
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.7), 64)
  }
  if (b.id === 'read') {
    const z = ease(k / 1.6)
    const crop = [160, lerp(600, 1150, z), 850, 1000]
    phoneCard(o, deck, W / 2, 640, 680, { crop, glow: 0.5, h: 800 })
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.7), 64)
  }
  if (b.id === 'align') {
    const fly = clamp((k - 0.7) / 0.6)
    phoneCard(o, deck, W / 2 + out3(fly) * 60, 640 - out3(fly) * 30, 470, { rot: out3(fly) * 0.06, glow: 0.4 + fly })
    burst(o, W / 2, 640, clamp((k - 0.75) / 0.9))
    topLabel(o, b.label, clamp((k - 0.8) / 0.3), false)
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.7), 64)
  }
  if (b.id === 'mutual') {
    phoneCard(o, S.img.match, W / 2, 640, 470, { scale: lerp(0.2, 1, back(clamp(k / 0.5))), alpha: clamp(k * 4), glow: 0.5 })
    sparkle(o, t, 30)
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.6), 64)
  }
  if (b.id === 'lift') {
    // the reveal: a veil of aura colour wipes off the real screen
    phoneCard(o, S.img.reveal, W / 2, 640, 470, { glow: 0.7 })
    const v = clamp((k - 0.3) / 0.9)
    if (v < 1) {
      o.save(); rr(o, W / 2 - 235, 640 - 508, 470, 1017, 44); o.clip()
      const g = o.createLinearGradient(0, 132, 0, 1149); g.addColorStop(0, '#ff8fb8'); g.addColorStop(0.5, '#a07cff'); g.addColorStop(1, '#2a1a5a')
      o.globalAlpha = 1 - ease(v); o.fillStyle = g; o.fillRect(0, 132 - ease(v) * 1100, W, 1017); o.restore()
    }
    burst(o, W / 2, 480, clamp((k - 0.9) / 1.0))
    sparkle(o, t, 34)
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.6), 64)
  }
  if (b.id === 'talk') {
    phoneCard(o, S.img.chat, W / 2, 640, 470, { scale: lerp(0.9, 1, out3(k / 0.4)), alpha: clamp(k * 4), glow: 0.4 })
    caption(o, b.text, b.accent, W / 2, 1580, clamp(k / 0.8), 60)
  }
  if (b.id === 'end') endCard(o, k)

  // flash on cuts
  const prev = S.beats[beatAt(t)]
  if (prev.t > 0) { const f = clamp(1 - (t - prev.t) / 0.12); if (f > 0) { o.fillStyle = `rgba(255,248,240,${f * 0.18})`; o.fillRect(0, 0, W, H) } }
  return S.out.toDataURL('image/jpeg', 0.92)
}

function endCard(o, k) {
  const g = o.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1a1040'); g.addColorStop(0.6, '#3a1d5e'); g.addColorStop(1, '#6a2c6c')
  o.fillStyle = g; o.fillRect(0, 0, W, H)
  const rg = o.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, 800); rg.addColorStop(0, 'rgba(255,111,158,0.35)'); rg.addColorStop(1, 'rgba(255,111,158,0)')
  o.fillStyle = rg; o.fillRect(0, 0, W, H)
  sparkle(o, k + 24, 46)
  const e = S.script.end
  o.save(); o.textAlign = 'center'; o.textBaseline = 'alphabetic'
  // wordmark
  const a1 = clamp(k / 0.4)
  o.globalAlpha = a1
  const wg = o.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0); wg.addColorStop(0, GOLD); wg.addColorStop(1, ROSE)
  o.fillStyle = wg; o.font = 'italic 500 170px "EB Garamond"'; o.fillText('align', W / 2, 520)
  o.fillStyle = GOLD; star(o, W / 2 + 200, 420, 22)
  const a2 = clamp((k - 0.35) / 0.4); o.globalAlpha = a2
  o.font = '700 30px "Space Mono"'; o.fillStyle = 'rgba(246,239,228,0.85)'
  o.fillText(e.kicker.toUpperCase().split('').join(' '), W / 2, 610)
  e.lines.forEach((ln, i) => {
    const a = clamp((k - 0.5 - i * 0.18) / 0.35); if (a <= 0) return
    o.globalAlpha = a
    const s = lerp(1.3, 1, out3(a))
    o.save(); o.translate(W / 2, 830 + i * 170); o.scale(s, s)
    o.font = '800 150px Poppins'; o.fillStyle = i === 2 ? ROSE : PAPER
    o.fillText(ln, 0, 0); o.restore()
  })
  const a3 = clamp((k - 1.3) / 0.4); o.globalAlpha = a3
  o.font = '700 46px Poppins'; const bw = o.measureText(e.button).width + 130
  shadowed(o, () => { rr(o, W / 2 - bw / 2, 1300, bw, 120, 60); const bg = o.createLinearGradient(W / 2 - bw / 2, 0, W / 2 + bw / 2, 0); bg.addColorStop(0, GOLD); bg.addColorStop(1, ROSE); o.fillStyle = bg; o.fill() }, 60, 0.5)
  o.fillStyle = INK; o.fillText(e.button, W / 2, 1376)
  o.font = 'italic 500 44px "EB Garamond"'; o.fillStyle = 'rgba(246,239,228,0.8)'; o.fillText(e.foot, W / 2, 1520)
  o.restore()
}
