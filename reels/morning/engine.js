// Align Morning: the twelve signs on a winter morning, ranked by who gets
// out of bed first. A snowy dollhouse apartment, one room per sign; the
// camera counts down room to room and pulls back at the end.
// Everything is a pure function of time t: window.setup(script, assets)
// once, then window.frame(t) for any t.

import * as THREE from 'three'

const W = 1080
const H = 1920
export const FPS = 30
const HOOK = 2.8 // wide shot of the building with the title
const BEAT = 2.6 // seconds per room
const MOVE = 0.6 // of which flying to the room
const END = 4.4

const RW = 4.4 // room pitch, x
const RH = 3.3 // floor pitch, y
const RD = 3.6 // room depth, z (front open at +RD/2)

const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
const ELEMENT = { aries: 'fire', leo: 'fire', sagittarius: 'fire', taurus: 'earth', virgo: 'earth', capricorn: 'earth', gemini: 'air', libra: 'air', aquarius: 'air', cancer: 'water', scorpio: 'water', pisces: 'water' }
// body gradient (top, bottom) and room tint per element; each sign shifts it a little
const PALETTE = {
  fire: { body: ['#ffc2a0', '#f2788a'], wall: '#f6dccb', duvet: '#f4a28c', rug: '#e98f7a' },
  earth: { body: ['#d9e8b4', '#8fbf92'], wall: '#e9e4cf', duvet: '#a8c99a', rug: '#b9a27c' },
  air: { body: ['#e6d4ff', '#a99af0'], wall: '#e6e0f4', duvet: '#b7a8ec', rug: '#9ea6e0' },
  water: { body: ['#c4ecf4', '#78a8e6'], wall: '#d9e6f0', duvet: '#8cc0e6', rug: '#7f9fd0' },
}
const INK = '#2a2140'

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
const easeIO = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
const backOut = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
const lerp = (a, b, u) => a + (b - a) * u
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t }
const lam = (o) => new THREE.MeshLambertMaterial(o)
const basic = (o) => new THREE.MeshBasicMaterial(o)
const shade = (hex, k) => { const c = new THREE.Color(hex); c.multiplyScalar(k); return '#' + c.getHexString() }
const mix = (a, b, u) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), u).getHexString()
const glyph = (s) => GLYPH[s] + '︎'

function box(w, h, d, mat, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  if (parent) parent.add(m)
  return m
}
function blob(parent, r, x = 0, z = 0, y = 0.012, o = 0.5) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 24), basic({ map: S.shadowTex, transparent: true, depthWrite: false, opacity: o }))
  m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); parent.add(m)
  return m
}
function textSprite(text, font, color, h = 0.3, w) {
  const [c, x] = canvas(256, 128)
  x.font = font; x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 8; x.lineJoin = 'round'
  x.strokeText(text, 128, 66); x.fillText(text, 128, 66)
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(c), transparent: true, depthWrite: false }))
  s.scale.set(w || h * 2, h, 1)
  return s
}

// ── textures ──────────────────────────────────────────────────────────────
function skyTexture() {
  const [c, x] = canvas(32, 512)
  const g = x.createLinearGradient(0, 0, 0, 512)
  g.addColorStop(0, '#1d2350'); g.addColorStop(0.35, '#3d4a8a'); g.addColorStop(0.62, '#a98fc4')
  g.addColorStop(0.78, '#f4b9b4'); g.addColorStop(0.9, '#ffd9b0'); g.addColorStop(1, '#fff0dc')
  x.fillStyle = g; x.fillRect(0, 0, 32, 512)
  return tex(c)
}
function wallpaper(base, sign, seed) {
  const [c, x] = canvas(512, 384)
  x.fillStyle = base; x.fillRect(0, 0, 512, 384)
  const R = rng(seed)
  const kind = Math.floor(R() * 3)
  x.fillStyle = shade(base, 0.93)
  if (kind === 0) for (let i = 0; i < 512; i += 48) x.fillRect(i, 0, 22, 384)
  else if (kind === 1) {
    for (let yy = 20; yy < 384; yy += 52) for (let xx = (yy / 52) % 2 ? 24 : 0; xx < 512; xx += 48) { x.beginPath(); x.arc(xx, yy, 6, 0, 7); x.fill() }
  } else {
    x.font = '22px "DejaVu Sans", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let yy = 26; yy < 384; yy += 58) for (let xx = (yy / 58) % 2 ? 30 : 0; xx < 520; xx += 60) x.fillText(yy % 3 ? '✦' : glyph(sign), xx, yy)
  }
  // a skirting board
  x.fillStyle = shade(base, 0.78); x.fillRect(0, 360, 512, 24)
  return tex(c)
}
function woodTexture(seed) {
  const [c, x] = canvas(256, 256)
  const R = rng(seed)
  const base = mix('#c89a6e', '#e2bf94', R())
  for (let i = 0; i < 8; i++) {
    x.fillStyle = shade(base, 0.9 + R() * 0.18); x.fillRect(0, i * 32, 256, 32)
    x.fillStyle = 'rgba(80,50,30,0.25)'; x.fillRect(0, i * 32, 256, 2)
    x.fillRect(Math.floor(R() * 256), i * 32, 2, 32)
  }
  return tex(c)
}
function windowTexture(warm) {
  const [c, x] = canvas(256, 256)
  const g = x.createLinearGradient(0, 0, 0, 256)
  g.addColorStop(0, '#5a6bb0'); g.addColorStop(0.6, warm ? '#f7c3b8' : '#b9b3e0'); g.addColorStop(1, warm ? '#ffe6c2' : '#e8e3f4')
  x.fillStyle = g; x.fillRect(0, 0, 256, 256)
  // far roofs with snow
  x.fillStyle = '#3c4378'
  for (let i = 0; i < 6; i++) { const w = 40 + (i * 37) % 30; x.fillRect(i * 46 - 10, 200 - (i * 23) % 40, w, 80) }
  x.fillStyle = '#f6f4ff'
  for (let i = 0; i < 6; i++) { const w = 40 + (i * 37) % 30; x.fillRect(i * 46 - 10, 196 - (i * 23) % 40, w, 6) }
  const R = rng(warm ? 3 : 7)
  x.fillStyle = 'rgba(255,255,255,0.9)'
  for (let i = 0; i < 40; i++) { x.beginPath(); x.arc(R() * 256, R() * 256, 1 + R() * 2.2, 0, 7); x.fill() }
  return tex(c)
}
function glyphTexture(sign, color) {
  const [c, x] = canvas(128, 128)
  x.fillStyle = '#ffffff'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill()
  x.fillStyle = color; x.font = 'bold 78px "DejaVu Sans", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(glyph(sign), 64, 70)
  return tex(c)
}
function stripeTexture(a, b) {
  const [c, x] = canvas(128, 128)
  x.fillStyle = a; x.fillRect(0, 0, 128, 128)
  x.fillStyle = b
  for (let i = -128; i < 256; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 16, 0); x.lineTo(i + 16 + 128, 128); x.lineTo(i + 128, 128); x.fill() }
  const t = tex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}
function quiltTexture(a) {
  const [c, x] = canvas(128, 128)
  x.fillStyle = a; x.fillRect(0, 0, 128, 128)
  x.strokeStyle = shade(a, 0.85); x.lineWidth = 3
  for (let i = 0; i <= 128; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 128); x.moveTo(0, i); x.lineTo(128, i); x.stroke() }
  x.fillStyle = 'rgba(255,255,255,0.5)'
  for (let i = 16; i < 128; i += 32) for (let j = 16; j < 128; j += 32) { x.beginPath(); x.arc(i, j, 3, 0, 7); x.fill() }
  return tex(c)
}
function bubbleTexture(kind) {
  const [c, x] = canvas(256, 200)
  x.fillStyle = '#ffffff'; x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.ellipse(128, 86, 112, 72, 0, 0, 7); x.fill(); x.stroke()
  for (const [cx, cy, r] of [[60, 168, 14], [36, 188, 8]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.stroke() }
  if (kind === 'socks') {
    const sock = (ox, col) => {
      x.fillStyle = col; x.strokeStyle = INK; x.lineWidth = 4
      x.beginPath(); x.moveTo(ox, 40); x.lineTo(ox + 30, 40); x.lineTo(ox + 30, 104); x.quadraticCurveTo(ox + 30, 124, ox + 6, 124)
      x.lineTo(ox - 20, 124); x.quadraticCurveTo(ox - 34, 112, ox - 20, 100); x.lineTo(ox, 96); x.closePath(); x.fill(); x.stroke()
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(ox + 2, 48, 26, 8)
    }
    sock(92, '#f4a6c2'); sock(176, '#9ad0c9')
    x.fillStyle = INK; x.font = '800 40px Poppins, sans-serif'; x.textAlign = 'center'; x.fillText('?', 134, 98)
  } else if (kind === 'dream') {
    x.font = '64px "DejaVu Sans", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = '#f4b860'; x.fillText('☾', 84, 86); x.fillStyle = '#f07aa8'; x.fillText('♥', 172, 92)
    x.fillStyle = '#9c8cf0'; x.font = '34px "DejaVu Sans", sans-serif'; x.fillText('✦', 130, 50)
  }
  return tex(c)
}
function glowTexture(col = '255,236,200') {
  const [c, x] = canvas(128, 128)
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, `rgba(${col},0.9)`); g.addColorStop(0.3, `rgba(${col},0.35)`); g.addColorStop(1, `rgba(${col},0)`)
  x.fillStyle = g; x.fillRect(0, 0, 128, 128)
  return tex(c)
}

// ── the little ones ───────────────────────────────────────────────────────
// A round sign-child: Align's star-headed walker, coloured by element, with
// the sign's glyph on its belly. Parts are exposed for posing.
function critter(sign, colors) {
  const g = new THREE.Group()
  const [c, x] = canvas(64, 256)
  const gr = x.createLinearGradient(0, 0, 0, 256)
  gr.addColorStop(0, colors[0]); gr.addColorStop(1, colors[1])
  x.fillStyle = gr; x.fillRect(0, 0, 64, 256)
  const mat = lam({ map: tex(c), emissive: shade(colors[1], 0.25) })
  const body = new THREE.Group(); g.add(body)
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 28, 20), mat)
  ball.scale.set(1, 0.92, 0.95); ball.position.y = 0.62; body.add(ball)
  const eyes = []
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 12), mat)
    ear.position.set(s * 0.24, 1.0, 0); ear.rotation.z = -s * 0.45; body.add(ear)
    const eye = new THREE.Group(); eye.position.set(s * 0.14, 0.72, 0.37); body.add(eye)
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 8), basic({ color: '#241a2a' })); pupil.scale.z = 0.6; eye.add(pupil)
    const hi = new THREE.Mesh(new THREE.SphereGeometry(0.017, 8, 6), basic({ color: '#ffffff' })); hi.position.set(0.016, 0.018, 0.035); eye.add(hi)
    eyes.push(eye)
    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.05, 14), basic({ color: '#f07aa8', transparent: true, opacity: 0.65 }))
    cheek.position.set(s * 0.25, 0.6, 0.355); cheek.rotation.y = s * 0.55; body.add(cheek)
  }
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.009, 6, 12, Math.PI), basic({ color: '#241a2a' }))
  mouth.position.set(0, 0.62, 0.395); mouth.rotation.z = Math.PI; body.add(mouth)
  const badge = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), basic({ map: glyphTexture(sign, shade(colors[1], 0.7)), transparent: true }))
  badge.position.set(0, 0.42, 0.37); badge.rotation.x = -0.35; body.add(badge)
  const arms = []
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group(); pivot.position.set(s * 0.36, 0.55, 0.05); body.add(pivot)
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.16, 4, 10), mat)
    arm.position.y = -0.12; pivot.add(arm)
    pivot.rotation.z = s * 0.5
    arms.push(pivot)
  }
  const legs = []
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.3, 10), lam({ color: shade(colors[1], 1.05), emissive: shade(colors[1], 0.2) }))
    leg.position.set(s * 0.15, 0.16, 0); g.add(leg); legs.push(leg)
  }
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 6), lam({ color: '#c9a66b' }))
  stalk.position.y = 1.14; body.add(stalk)
  const shape = new THREE.Shape()
  for (let k = 0; k < 10; k++) { const a = Math.PI / 2 + (k / 10) * Math.PI * 2; const r = k % 2 ? 0.05 : 0.13; k ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
  const star = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false }), basic({ color: '#ffd987' }))
  star.position.y = 1.3; body.add(star)
  g.userData = { body, eyes, arms, legs, star, mouth }
  return g
}
// eyes: 1 open, 0 shut (a line)
function setEyes(k, open, look = 0) {
  for (const e of k.userData.eyes) { e.scale.set(1, Math.max(0.12, open), 1); e.position.x = Math.sign(e.position.x) * 0.14 + look * 0.04 }
}

// ── furniture ─────────────────────────────────────────────────────────────
function bed(room, pal, made) {
  const g = new THREE.Group(); room.add(g)
  const wood = lam({ color: '#b98a64' })
  box(2.15, 0.28, 1.3, wood, 0, 0.24, 0, g)
  box(0.12, 1.0, 1.3, wood, -1.08, 0.5, 0, g) // headboard
  box(0.1, 0.6, 1.3, wood, 1.08, 0.3, 0, g)
  box(2.0, 0.18, 1.22, lam({ color: '#fbf6ee' }), 0, 0.47, 0, g) // mattress
  const pillow = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.7, 6, 14), lam({ color: '#fffaf4' }))
  pillow.rotation.x = Math.PI / 2; pillow.scale.set(1.25, 1, 0.55); pillow.position.set(-0.74, 0.62, 0); g.add(pillow)
  let duvet = null
  if (made) {
    duvet = box(1.5, 0.08, 1.3, lam({ map: quiltTexture(pal.duvet) }), 0.27, 0.6, 0, g)
  }
  blob(g, 1.3, 0, 0, 0.012, 0.35)
  return { g, pillow, duvet }
}
function softDuvet(parent, pal, w = 1.45, x = 0.28, y = 0.66) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, w - 0.6, 6, 18), lam({ map: quiltTexture(pal.duvet) }))
  m.rotation.z = Math.PI / 2; m.scale.set(0.5, 1, 2.2); m.position.set(x, y, 0); parent.add(m)
  return m
}
function nightstand(room, x, z, lampOn) {
  const g = new THREE.Group(); g.position.set(x, 0, z); room.add(g)
  box(0.5, 0.55, 0.45, lam({ color: '#d7b48e' }), 0, 0.275, 0, g)
  box(0.36, 0.02, 0.02, lam({ color: '#9a7350' }), 0, 0.36, 0.23, g)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.28, 10), lam({ color: '#e9dccb' }))
  base.position.set(-0.1, 0.69, -0.06); g.add(base)
  const shadeM = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.17, 0.2, 16, 1, true), lampOn ? basic({ color: '#ffe2a8', side: THREE.DoubleSide }) : lam({ color: '#efe3d0', side: THREE.DoubleSide }))
  shadeM.position.set(-0.1, 0.9, -0.06); g.add(shadeM)
  if (lampOn) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7 }))
    s.scale.set(1.1, 1.1, 1); s.position.set(-0.1, 0.9, -0.06); g.add(s)
  }
  blob(g, 0.4)
  return g
}
function alarmClock(parent, x, y, z) {
  const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g)
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.07, 18), lam({ color: '#ef6f6f' }))
  body.rotation.x = Math.PI / 2; body.position.y = 0.12; g.add(body)
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.085, 18), basic({ color: '#fffaf0' })); face.position.set(0, 0.12, 0.037); g.add(face)
  for (const s of [-1, 1]) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), lam({ color: '#f4c95d' })); b.position.set(s * 0.07, 0.235, 0); g.add(b) }
  const hand = box(0.008, 0.06, 0.004, basic({ color: INK }), 0, 0.14, 0.04, g)
  return g
}
function plant(room, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); room.add(g)
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.3, 14), lam({ color: '#e5a07f' })); pot.position.y = 0.15; g.add(pot)
  for (let i = 0; i < 6; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), lam({ color: i % 2 ? '#7fb38a' : '#5f9c74' }))
    const a = i * 1.1
    leaf.scale.set(0.6, 1.6, 0.6); leaf.position.set(Math.cos(a) * 0.09, 0.45 + (i % 3) * 0.08, Math.sin(a) * 0.09); leaf.rotation.set(Math.sin(a) * 0.5, 0, Math.cos(a) * 0.5); g.add(leaf)
  }
  blob(g, 0.25)
}
function rug(room, color, x, z, r = 0.75) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), lam({ map: stripeTexture(color, shade(color, 1.12)) }))
  m.rotation.x = -Math.PI / 2; m.scale.y = 0.6; m.position.set(x, 0.008, z); room.add(m)
}
function windowOn(room, x, warm) {
  const g = new THREE.Group(); g.position.set(x, 1.75, -RD / 2 + 0.02); room.add(g)
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.0), basic({ map: windowTexture(warm) })); g.add(pane)
  const frame = lam({ color: '#fbf7f0' })
  box(1.22, 0.07, 0.07, frame, 0, 0.53, 0.02, g); box(1.22, 0.07, 0.07, frame, 0, -0.53, 0.02, g)
  box(0.07, 1.1, 0.07, frame, -0.58, 0, 0.02, g); box(0.07, 1.1, 0.07, frame, 0.58, 0, 0.02, g)
  box(0.04, 1.0, 0.04, frame, 0, 0, 0.02, g); box(1.1, 0.04, 0.04, frame, 0, 0, 0.02, g)
  box(1.36, 0.06, 0.2, frame, 0, -0.58, 0.08, g) // sill
  box(1.1, 0.05, 0.06, basic({ color: '#ffffff' }), 0, -0.48, 0.03, g) // snow on the outside ledge
  const cur = lam({ color: '#f3e3ef' })
  for (const s of [-1, 1]) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.3, 10), cur)
    c.scale.z = 0.4; c.position.set(s * 0.74, -0.05, 0.08); g.add(c)
  }
  return g
}
function frameArt(room, x, y, sign, color) {
  const g = new THREE.Group(); g.position.set(x, y, -RD / 2 + 0.03); room.add(g)
  box(0.5, 0.62, 0.04, lam({ color: '#f5efe6' }), 0, 0, 0, g)
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), basic({ map: glyphTexture(sign, color), transparent: true })); m.position.set(0, 0.04, 0.025); g.add(m)
}

// ── a room per beat ───────────────────────────────────────────────────────
function roomSlot(i) {
  const tier = Math.floor(i / 3)
  const k = i % 3
  const col = tier % 2 === 0 ? k : 2 - k
  const row = 3 - tier
  return { x: (col - 1) * RW, y: row * RH }
}

function buildRoom(b, i) {
  const pal = PALETTE[ELEMENT[b.sign]]
  const slot = roomSlot(i)
  const room = new THREE.Group(); room.position.set(slot.x, slot.y, 0); S.scene.add(room)
  const iw = RW - 0.2, ih = RH - 0.2
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(iw, RD), lam({ map: woodTexture(i + 1) }))
  floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001; room.add(floor)
  const wallM = lam({ map: wallpaper(pal.wall, b.sign, i * 13 + 5) })
  const back = new THREE.Mesh(new THREE.PlaneGeometry(iw, ih), wallM); back.position.set(0, ih / 2, -RD / 2); room.add(back)
  const sideM = lam({ color: shade(pal.wall, 0.92) })
  const lw = new THREE.Mesh(new THREE.PlaneGeometry(RD, ih), sideM); lw.rotation.y = Math.PI / 2; lw.position.set(-iw / 2 + 0.012, ih / 2, 0); room.add(lw)
  const rw = new THREE.Mesh(new THREE.PlaneGeometry(RD, ih), sideM); rw.rotation.y = -Math.PI / 2; rw.position.set(iw / 2 - 0.012, ih / 2, 0); room.add(rw)
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(iw, RD), lam({ color: shade(pal.wall, 0.85) })); ceil.rotation.x = Math.PI / 2; ceil.position.y = ih; room.add(ceil)

  const pose = b.pose
  const lit = !['hide', 'peek', 'burrito', 'snooze'].includes(pose)
  const bedX = -0.75, bedZ = -0.75
  const bd = bed(room, pal, pose === 'make')
  bd.g.position.set(bedX, 0, bedZ)
  const ns = nightstand(room, -1.75, -1.25, lit && pose !== 'window')
  rug(room, pal.rug, 0.6, 0.6)
  const winX = pose === 'window' ? 1.05 : 0.55
  windowOn(room, winX, pose === 'wake' || pose === 'window')
  if (pose !== 'window') frameArt(room, -0.65, 2.2, b.sign, shade(pal.body[1], 0.7))
  if (!['mirror', 'desk', 'jump', 'wake', 'make'].includes(pose)) plant(room, 1.7, -1.4)

  // a warm light for the awake, a cool one for the sleepers
  const light = new THREE.PointLight(lit ? '#ffd6a0' : '#8fa0e8', lit ? 5.5 : 2.2, 5.5, 1.2)
  light.position.set(0, 2.4, 0.4); room.add(light)

  const r = { b, i, pose, room, slot, pal, bed: bd, ns, parts: {} }
  const k = critter(b.sign, pal.body)
  k.scale.setScalar(0.78)
  room.add(k)
  r.k = k
  const P = r.parts
  const bx = bedX, bz = bedZ
  // lying: head on the pillow, facing the camera
  const lie = () => { k.rotation.set(0, 0, Math.PI / 2); k.position.set(bx - 0.08, 0.74, bz + 0.05) }
  if (pose === 'burrito') {
    lie(); k.userData.legs.forEach((l) => (l.visible = false))
    const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.45, 24), lam({ map: stripeTexture(pal.duvet, shade(pal.duvet, 1.15)) }))
    roll.rotation.z = Math.PI / 2; roll.position.set(bx + 0.45, 0.88, bz + 0.05); room.add(roll); P.roll = roll
    for (const s of [-1, 1]) { const cap = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), lam({ color: shade(pal.duvet, 0.9) })); cap.position.y = s * 0.726; cap.rotation.x = -s * Math.PI / 2; roll.add(cap) }
    k.position.x = bx - 0.32; k.position.y = 0.92
  } else if (pose === 'hide' || pose === 'peek') {
    k.visible = false
    const lump = new THREE.Mesh(new THREE.SphereGeometry(0.6, 28, 18), lam({ map: quiltTexture(pal.duvet) }))
    lump.scale.set(1.7, 0.62, 1.05); lump.position.set(bx + 0.05, 0.62, bz + 0.02); room.add(lump); P.lump = lump
    if (pose === 'hide') {
      const star = k.userData.star.clone(); star.scale.setScalar(0.85); star.position.set(bx - 0.62, 1.02, bz + 0.1); room.add(star); P.star = star
      const bub = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture('dream'), transparent: true, depthWrite: false }))
      bub.scale.set(0.95, 0.74, 1); bub.position.set(bx - 0.05, 1.75, bz + 0.3); room.add(bub); P.bubble = bub
    } else {
      const eyes = new THREE.Group(); eyes.position.set(bx - 0.62, 0.72, bz + 0.62); room.add(eyes); P.peek = eyes
      for (const s of [-1, 1]) {
        const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), basic({ color: '#fffbe8' })); e.scale.set(1, 1, 0.5); e.position.x = s * 0.09; eyes.add(e)
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.026, 10, 8), basic({ color: '#1a1424' })); p.position.set(s * 0.09, 0, 0.025); eyes.add(p)
      }
      const shadowM = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.2), basic({ color: '#1e1838', transparent: true, opacity: 0.85 }))
      shadowM.position.z = -0.01; eyes.add(shadowM)
    }
  } else if (pose === 'snooze' || pose === 'phone') {
    lie()
    P.duvet = softDuvet(room, pal, 1.5, bx + 0.35, 0.68); P.duvet.position.z = bz + 0.05
    if (pose === 'snooze') {
      P.clock = alarmClock(ns, 0.1, 0.55, 0.02)
      P.reach = k.userData.arms[0]
    } else {
      const ph = new THREE.Group(); room.add(ph); P.phone = ph
      box(0.2, 0.36, 0.03, lam({ color: '#3b3550' }), 0, 0, 0, ph)
      box(0.17, 0.31, 0.01, basic({ color: '#bfe0ff' }), 0, 0, -0.017, ph)
      ph.position.set(bx - 0.2, 1.15, bz + 0.45); ph.rotation.set(-0.6, 0.35, 0.2)
      const glow = new THREE.PointLight('#a8ccff', 1.2, 1.4, 1.5); glow.position.set(bx - 0.25, 1.0, bz + 0.6); room.add(glow)
    }
  } else if (pose === 'sit') {
    k.position.set(bx - 0.45, 0.56, bz + 0.05)
    P.duvet = softDuvet(room, pal, 1.3, bx + 0.42, 0.66); P.duvet.position.z = bz + 0.05
    const bub = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture('socks'), transparent: true, depthWrite: false }))
    bub.scale.set(1.0, 0.78, 1); bub.position.set(bx + 0.45, 1.9, bz + 0.3); room.add(bub); P.bubble = bub
  } else if (pose === 'window') {
    softDuvet(room, pal, 1.4, bx + 0.3, 0.64).position.z = bz + 0.05
    k.position.set(winX, 0, -0.95); k.rotation.y = Math.PI - 0.55
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.12, 12), lam({ color: '#f2f0ff' }))
    mug.position.set(0, -0.14, 0.05); k.userData.arms[1].add(mug)
    k.userData.arms[1].rotation.z = 1.4
  } else if (pose === 'jump') {
    const d = softDuvet(room, pal, 1.2, bx + 0.6, 0.62); d.position.z = bz + 0.25; d.rotation.y = 0.5
    k.position.set(0.95, 0, 0.1)
    const cal = new THREE.Group(); cal.position.set(1.55, 1.85, -RD / 2 + 0.03); room.add(cal)
    const [c, x] = canvas(128, 150)
    x.fillStyle = '#fffaf2'; x.fillRect(0, 0, 128, 150); x.fillStyle = '#ef6f6f'; x.fillRect(0, 0, 128, 40)
    x.fillStyle = '#fff'; x.font = '700 24px Poppins, sans-serif'; x.textAlign = 'center'; x.fillText('SAT', 64, 30)
    x.fillStyle = INK; x.font = '800 72px Poppins, sans-serif'; x.fillText('14', 64, 120)
    cal.add(new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.5), basic({ map: tex(c) })))
  } else if (pose === 'make') {
    k.position.set(0.85, 0, -0.1); k.rotation.y = -0.5
    const pil = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.3, 6, 12), lam({ color: '#fffaf4' }))
    pil.rotation.z = Math.PI / 2; pil.scale.set(1, 1, 0.6); room.add(pil); P.pillow = pil
    const sp = []
    for (let s = 0; s < 4; s++) { const m = textSprite('✦', '64px "DejaVu Sans", sans-serif', '#f4c95d', 0.22, 0.22); room.add(m); sp.push(m) }
    P.sparkles = sp
  } else if (pose === 'mirror') {
    softDuvet(room, pal, 1.4, bx + 0.3, 0.64).position.z = bz + 0.05
    const mir = new THREE.Group(); mir.position.set(1.75, 0, -0.55); mir.rotation.y = -Math.PI / 2 + 0.75; room.add(mir)
    box(0.7, 1.55, 0.06, lam({ color: '#f1c98f' }), 0, 0.85, 0, mir)
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.42), basic({ color: '#cfe4f4' })); glass.position.set(0, 0.85, 0.035); mir.add(glass)
    const shine = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 1.2), basic({ color: '#ffffff', transparent: true, opacity: 0.6 })); shine.position.set(-0.15, 0.9, 0.04); shine.rotation.z = 0.35; mir.add(shine)
    k.position.set(0.85, 0, -0.2); k.rotation.y = 0.85
    const sp = []
    for (let s = 0; s < 3; s++) { const m = textSprite('✦', '64px "DejaVu Sans", sans-serif', '#f4c95d', 0.2, 0.2); room.add(m); sp.push(m) }
    P.sparkles = sp
  } else if (pose === 'desk') {
    softDuvet(room, pal, 1.4, bx + 0.3, 0.64).position.z = bz + 0.05
    const desk = new THREE.Group(); desk.position.set(1.45, 0, -0.75); room.add(desk)
    const dw = lam({ color: '#cfa77d' })
    box(0.65, 0.06, 1.1, dw, 0, 0.78, 0, desk)
    for (const [a, c] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) box(0.05, 0.78, 0.05, dw, a * 0.28, 0.39, c * 0.5, desk)
    const lap = new THREE.Group(); lap.position.set(0.05, 0.81, 0); desk.add(lap)
    box(0.36, 0.02, 0.5, lam({ color: '#c9ccd8' }), 0, 0, 0, lap)
    const scr = new THREE.Group(); scr.position.set(0.17, 0.01, 0); scr.rotation.z = 1.35; lap.add(scr)
    box(0.34, 0.02, 0.5, lam({ color: '#c9ccd8' }), 0.17, 0, 0, scr)
    const glowS = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.46), basic({ color: '#cfe6ff' })); glowS.rotation.x = -Math.PI / 2; glowS.position.set(0.17, 0.012, 0); scr.add(glowS)
    const mugD = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.13, 12), lam({ color: '#ef8b6f' })); mugD.position.set(-0.1, 0.875, 0.38); desk.add(mugD)
    const dl = new THREE.PointLight('#cfe6ff', 1.5, 1.8, 1.4); dl.position.set(1.1, 1.2, -0.75); room.add(dl)
    k.position.set(0.7, 0, -0.55); k.rotation.y = 1.15
    // a headset
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.025, 8, 24, Math.PI), lam({ color: '#3b3550' }))
    band.position.y = 0.62; k.userData.body.add(band)
    for (const s of [-1, 1]) { const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 14), lam({ color: '#3b3550' })); cup.rotation.z = Math.PI / 2; cup.position.set(s * 0.41, 0.62, 0); k.userData.body.add(cup) }
  } else if (pose === 'wake') {
    // someone else is asleep; Cancer brings tea
    const sleeper = critter('aries', ['#ffd3e6', '#c79be8'])
    sleeper.scale.setScalar(0.72); sleeper.rotation.set(0, 0, Math.PI / 2); sleeper.position.set(bx - 0.08, 0.74, bz + 0.05)
    sleeper.userData.body.children.filter((m) => m.geometry && m.geometry.type === 'CircleGeometry' && m.material.map).forEach((m) => (m.visible = false))
    room.add(sleeper); P.sleeper = sleeper
    P.duvet = softDuvet(room, pal, 1.5, bx + 0.35, 0.68); P.duvet.position.z = bz + 0.05
    k.position.set(0.85, 0, -0.25); k.rotation.y = -0.7
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.065, 0.14, 12), lam({ color: '#fff4e6' }))
    mug.position.set(0, -0.15, 0.06); k.userData.arms[0].add(mug)
    k.userData.arms[0].rotation.z = -1.3
    const hearts = []
    for (let s = 0; s < 4; s++) { const m = textSprite('♥', '72px "DejaVu Sans", sans-serif', '#f0709c', 0.24, 0.24); room.add(m); hearts.push(m) }
    P.hearts = hearts
    const steam = []
    for (let s = 0; s < 3; s++) { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, transparent: true, depthWrite: false, opacity: 0.5 })); m.scale.set(0.12, 0.12, 1); room.add(m); steam.push(m) }
    P.steam = steam
  }
  // zzz for the ones still sleeping
  if (['burrito', 'hide', 'snooze', 'wake'].includes(pose)) {
    P.z = [0, 1, 2].map((j) => { const m = textSprite('z', '800 90px Poppins, sans-serif', '#6d7fd8', 0.26 - j * 0.04, 0.26 - j * 0.04); room.add(m); return m })
  }
  return r
}

// per-frame posing; u = seconds since this room's beat began (may be negative)
function poseRoom(r, t, u) {
  const k = r.k, P = r.parts, pose = r.pose
  const blinkAt = (ph) => { const c = (t + ph) % 3.1; return c < 0.12 ? 0.15 : 1 }
  const bx = -0.75, bz = -0.75
  if (P.z) {
    const ox = { burrito: bx - 0.3, hide: bx - 0.55, snooze: bx - 0.3, wake: bx - 0.3 }[pose]
    const zoff = pose === 'wake' ? clamp(1 - (u - 1.35) * 2) : 1
    P.z.forEach((m, j) => {
      const c = ((t * 0.55 + j / 3) % 1)
      m.position.set(ox + c * 0.5 + Math.sin(c * 6 + j) * 0.08, 1.05 + c * 0.9, bz + 0.3)
      m.material.opacity = Math.sin(c * Math.PI) * zoff
    })
  }
  if (pose === 'burrito') {
    setEyes(k, 0.12)
    const w = Math.sin(t * 5.5) * 0.12 * (0.5 + 0.5 * Math.sin(t * 1.3))
    P.roll.rotation.x = w; k.rotation.x = w * 0.6
  } else if (pose === 'hide') {
    P.lump.scale.y = 0.62 * (1 + Math.sin(t * 2.2) * 0.05)
    P.star.rotation.z = Math.sin(t * 2) * 0.2
    P.bubble.material.opacity = 0.75 + Math.sin(t * 2) * 0.1
    P.bubble.position.y = 1.75 + Math.sin(t * 1.4) * 0.04
  } else if (pose === 'peek') {
    P.lump.scale.y = 0.62 * (1 + Math.sin(t * 1.6) * 0.025)
    const look = Math.sin(t * 1.8) > 0.2 ? 1 : Math.sin(t * 1.8) < -0.6 ? -1 : 0
    P.peek.children.filter((c, j) => j % 2 === 1).forEach((p, j) => { p.position.x = (j ? 0.09 : -0.09) + look * 0.016 })
    const bl = (t % 2.4) < 0.1 ? 0.1 : 1
    P.peek.children.forEach((c, j) => { if (j < 4) c.scale.y = bl })
  } else if (pose === 'snooze') {
    const ring = u > -0.2 && u < 1.0 ? 1 : 0
    P.clock.rotation.z = ring * Math.sin(t * 60) * 0.18
    P.clock.position.x = 0.1 + ring * Math.sin(t * 47) * 0.012
    const reach = u > 0.55 && u < 1.25 ? Math.sin(clamp((u - 0.55) / 0.7) * Math.PI) : 0
    P.reach.rotation.z = -0.5 + reach * -2.2 * -1
    setEyes(k, u > 0.4 && u < 1.1 ? 0.45 : 0.12)
  } else if (pose === 'phone') {
    setEyes(k, blinkAt(0.3), -0.6)
    P.phone.position.y = 1.15 + Math.sin(t * 1.1) * 0.02
    P.phone.rotation.z = 0.2 + Math.sin(t * 7) * 0.02
    k.userData.arms[0].rotation.z = -1.8
  } else if (pose === 'sit') {
    setEyes(k, 0.45 + 0.1 * Math.sin(t * 3))
    k.userData.body.rotation.z = Math.sin(t * 1.4) * 0.12
    const flip = Math.floor(t * 1.6) % 2
    P.bubble.material.rotation = flip ? 0.06 : -0.06
    P.bubble.position.y = 1.9 + Math.sin(t * 2) * 0.03
  } else if (pose === 'window') {
    k.userData.body.rotation.z = Math.sin(t * 0.9) * 0.05
    setEyes(k, blinkAt(1.1))
  } else if (pose === 'jump') {
    const hop = Math.abs(Math.sin(t * 6.5))
    k.position.y = hop * 0.35
    k.userData.body.scale.set(1 + (1 - hop) * 0.08, 1 - (1 - hop) * 0.08, 1)
    k.userData.arms.forEach((a, j) => (a.rotation.z = (j ? 1 : -1) * (2.4 + Math.sin(t * 13) * 0.3)))
    k.rotation.y = Math.sin(t * 2) * 0.4
    setEyes(k, 1)
  } else if (pose === 'make') {
    const c = (t % 1.6) / 1.6
    k.userData.arms.forEach((a, j) => (a.rotation.z = (j ? 1 : -1) * (1.2 + Math.sin(t * 8) * 0.25)))
    P.pillow.position.set(0.55, 0.62 + Math.abs(Math.sin(t * 8)) * 0.05, 0.05)
    k.userData.body.rotation.z = Math.sin(t * 4) * 0.06
    P.sparkles.forEach((m, j) => {
      const cc = (c + j / 4) % 1
      m.position.set(bx - 0.6 + j * 0.45, 0.8 + cc * 0.4, bz + 0.4)
      m.material.opacity = Math.sin(cc * Math.PI)
      m.scale.setScalar(0.14 + Math.sin(cc * Math.PI) * 0.1)
    })
    setEyes(k, blinkAt(0.7))
  } else if (pose === 'mirror') {
    k.userData.arms[1].rotation.z = 2.5 + Math.sin(t * 9) * 0.35
    k.userData.body.rotation.z = Math.sin(t * 2.2) * 0.05
    P.sparkles.forEach((m, j) => {
      const cc = (t * 0.7 + j / 3) % 1
      m.position.set(0.95 + Math.cos(j * 2.1) * 0.25, 1.35 + cc * 0.35, -0.2)
      m.material.opacity = Math.sin(cc * Math.PI)
    })
    setEyes(k, blinkAt(0.2))
  } else if (pose === 'desk') {
    k.userData.body.rotation.z = Math.sin(t * 3.5) * 0.04
    k.userData.arms[1].rotation.z = 0.9 + Math.sin(t * 10) * 0.15
    k.userData.arms[0].rotation.z = -0.9 - Math.sin(t * 10 + 1) * 0.15
    setEyes(k, blinkAt(0.5))
  } else if (pose === 'wake') {
    const s = P.sleeper
    const woke = ease((u - 1.2) / 0.5)
    setEyes(s, lerp(0.12, 1, woke))
    s.rotation.z = lerp(Math.PI / 2, Math.PI / 2 - 0.55, woke)
    s.position.y = 0.74 + woke * 0.06
    k.userData.body.rotation.z = -0.15 + Math.sin(t * 2.4) * 0.05
    k.userData.arms[1].rotation.z = 0.5 + (u > 0.5 && u < 1.3 ? Math.sin((u - 0.5) * 16) * 0.5 + 0.9 : 0)
    setEyes(k, blinkAt(0.9))
    P.hearts.forEach((m, j) => {
      const cc = clamp((u - 1.3 - j * 0.18) / 1.3)
      m.position.set(-0.3 + j * 0.28 + Math.sin(cc * 5 + j) * 0.06, 1.2 + cc * 1.0, bz + 0.5)
      m.material.opacity = cc > 0 ? Math.sin(cc * Math.PI) : 0
    })
    P.steam.forEach((m, j) => {
      const cc = (t * 0.6 + j / 3) % 1
      const wp = new THREE.Vector3(0, -0.1, 0.06); k.userData.arms[0].children[1].localToWorld(wp); r.room.worldToLocal(wp)
      m.position.set(wp.x + Math.sin(cc * 6 + j) * 0.04, wp.y + 0.1 + cc * 0.35, wp.z)
      m.material.opacity = Math.sin(cc * Math.PI) * 0.6
    })
  }
}

// ── the building ──────────────────────────────────────────────────────────
function building() {
  const g = new THREE.Group(); S.scene.add(g)
  const bw = RW * 3 + 0.2
  const cream = lam({ color: '#f3e6d6' })
  const brick = lam({ color: '#d99a86' })
  for (let r = 0; r <= 4; r++) {
    box(bw + 0.2, 0.2, RD + 0.2, r === 0 ? brick : cream, 0, r * RH - 0.1, 0, g)
    box(bw + 0.25, 0.1, 0.16, basic({ color: '#ffffff' }), 0, r * RH + 0.03, RD / 2 + 0.06, g) // snow on each ledge
  }
  for (const c of [-1.5, -0.5, 0.5, 1.5]) box(0.2, RH * 4, RD + 0.2, c === -1.5 || c === 1.5 ? brick : cream, c * RW, RH * 2, 0, g)
  // gabled roof with snow
  const top = RH * 4
  const tri = new THREE.Shape(); tri.moveTo(-bw / 2 - 0.5, 0); tri.lineTo(0, 2.6); tri.lineTo(bw / 2 + 0.5, 0); tri.closePath()
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: RD + 0.6, bevelEnabled: false }), lam({ color: '#8a6fb0' }))
  roof.position.set(0, top, -RD / 2 - 0.3); g.add(roof)
  const snowTri = new THREE.Shape(); snowTri.moveTo(-bw / 2 - 0.6, -0.05); snowTri.lineTo(0, 2.72); snowTri.lineTo(bw / 2 + 0.6, -0.05); snowTri.lineTo(bw / 2 + 0.2, 0.18); snowTri.lineTo(0, 2.45); snowTri.lineTo(-bw / 2 - 0.2, 0.18); snowTri.closePath()
  const snow = new THREE.Mesh(new THREE.ExtrudeGeometry(snowTri, { depth: 0.25, bevelEnabled: false }), basic({ color: '#ffffff' }))
  snow.position.set(0, top, RD / 2 + 0.1); g.add(snow)
  const gable = new THREE.Mesh(new THREE.ShapeGeometry(tri), lam({ color: '#f3e6d6' })); gable.position.set(0, top, RD / 2 + 0.31); gable.scale.set(0.9, 0.85, 1); g.add(gable)
  // a round window in the gable with the wordmark under it
  const [c, x] = canvas(512, 128)
  x.fillStyle = INK; x.font = 'italic 500 92px "EB Garamond", serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('align', 256, 64)
  const word = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), basic({ map: tex(c), transparent: true })); word.position.set(0, top + 0.75, RD / 2 + 0.33); g.add(word)
  const moonW = new THREE.Mesh(new THREE.CircleGeometry(0.32, 24), basic({ color: '#ffe6a8' })); moonW.position.set(0, top + 1.45, RD / 2 + 0.33); g.add(moonW)
  // chimney
  box(0.6, 1.4, 0.6, brick, 3.6, top + 1.6, -0.3, g)
  box(0.7, 0.12, 0.7, basic({ color: '#ffffff' }), 3.6, top + 2.34, -0.3, g)
  // the ground, snowy, with a path and two snow-covered trees
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 120), lam({ color: '#eef0fb' })); ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.2, 20); g.add(ground)
  for (const [tx, tz, s] of [[-9.6, 3.2, 1.3], [9.4, 2.4, 1.1], [-12.5, -2, 1.6], [12.8, -1, 1.5], [-7.8, 6, 0.8]]) {
    const tr = new THREE.Group(); tr.position.set(tx, -0.2, tz); tr.scale.setScalar(s); g.add(tr)
    box(0.3, 0.8, 0.3, lam({ color: '#7a5a4a' }), 0, 0.4, 0, tr)
    for (let j = 0; j < 3; j++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(1.3 - j * 0.32, 1.4, 14), lam({ color: '#4f8f86' })); cone.position.y = 1.3 + j * 0.8; tr.add(cone)
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.9 - j * 0.25, 0.6, 14), basic({ color: '#ffffff' })); cap.position.y = 1.65 + j * 0.8; tr.add(cap)
    }
  }
  // lamp posts by the door
  for (const s of [-1, 1]) {
    const p = new THREE.Group(); p.position.set(s * 7.6, -0.2, 2.8); g.add(p)
    box(0.12, 2.4, 0.12, lam({ color: '#3b3550' }), 0, 1.2, 0, p)
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), basic({ color: '#ffe2a8' })); bulb.position.y = 2.5; p.add(bulb)
    const gl = new THREE.Sprite(new THREE.SpriteMaterial({ map: S.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8 })); gl.scale.set(2, 2, 1); gl.position.y = 2.5; p.add(gl)
  }
}

// ── text overlay ──────────────────────────────────────────────────────────
function stroked(o, text, x, y, font, fill, stroke, lw) {
  o.font = font
  o.lineJoin = 'round'; o.miterLimit = 2
  o.strokeStyle = stroke; o.lineWidth = lw; o.strokeText(text, x, y)
  o.fillStyle = fill; o.fillText(text, x, y)
}
function fitFont(o, text, weight, size, maxW, family = 'Poppins') {
  let s = size
  o.font = `${weight} ${s}px ${family}`
  while (o.measureText(text).width > maxW && s > 20) { s -= 2; o.font = `${weight} ${s}px ${family}` }
  return `${weight} ${s}px ${family}`
}
function pill(o, x, y, w, h, fill) {
  o.fillStyle = fill
  o.beginPath(); o.roundRect(x - w / 2, y - h / 2, w, h, h / 2); o.fill()
}
function header(o, a) {
  if (a <= 0) return
  o.globalAlpha = a
  const [l1, l2] = S.script.title
  o.textAlign = 'center'; o.textBaseline = 'middle'
  pill(o, W / 2, 150, 420, 64, 'rgba(255,255,255,0.92)')
  o.fillStyle = INK; o.font = '700 34px Poppins'; o.fillText('❄  ' + l1.replace(/\.$/, '') + '  ❄', W / 2, 152)
  stroked(o, l2, W / 2, 240, fitFont(o, l2, 800, 52, W - 120), '#ffffff', INK, 12)
  o.globalAlpha = 1
}
function caption(o, b, rank, u) {
  const pop = backOut(u / 0.32)
  const a = clamp(u / 0.12) * clamp((BEAT - u) / 0.12 + 0.0001)
  if (a <= 0) return
  const pal = PALETTE[ELEMENT[b.sign]]
  o.save()
  o.globalAlpha = a
  o.textAlign = 'center'; o.textBaseline = 'middle'
  // rank + sign tag
  const cy = 1430
  o.translate(W / 2, cy); o.scale(pop, pop); o.translate(-W / 2, -cy)
  const winner = rank === 1
  const name = b.sign.toUpperCase()
  o.font = '800 46px Poppins'
  const tw = o.measureText(name).width + 210
  pill(o, W / 2, cy, tw, 96, winner ? '#ffd35c' : '#ffffff')
  o.fillStyle = pal.body[1]
  o.beginPath(); o.arc(W / 2 - tw / 2 + 52, cy, 36, 0, 7); o.fill()
  o.fillStyle = '#ffffff'; o.font = '800 38px Poppins'; o.fillText('#' + rank, W / 2 - tw / 2 + 52, cy + 2)
  o.fillStyle = INK; o.font = '800 46px Poppins'; o.fillText(name, W / 2 + 22, cy + 3)
  o.font = '40px "DejaVu Sans"'; o.fillStyle = shade(pal.body[1], 0.75); o.fillText(glyph(b.sign), W / 2 + tw / 2 - 48, cy + 2)
  o.restore()
  o.save()
  o.globalAlpha = a
  o.textAlign = 'center'; o.textBaseline = 'middle'
  const la = backOut((u - 0.12) / 0.32)
  const ly = 1555
  o.translate(W / 2, ly); o.scale(la, la); o.translate(-W / 2, -ly)
  stroked(o, b.line, W / 2, ly, fitFont(o, b.line, 800, 76, W - 110), '#ffffff', INK, 16)
  if (b.sub) {
    const sa = clamp((u - 0.45) / 0.2)
    o.globalAlpha = a * sa
    stroked(o, b.sub, W / 2, ly + 92, fitFont(o, b.sub, 700, 46, W - 120), winner ? '#ffe9a6' : '#e8ecff', INK, 12)
  }
  o.restore()
}
function vignette() {
  const [c, x] = canvas(W, H)
  let g = x.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, 'rgba(20,18,50,0.55)'); g.addColorStop(0.2, 'rgba(20,18,50,0)')
  g.addColorStop(0.62, 'rgba(20,18,50,0)'); g.addColorStop(1, 'rgba(20,18,50,0.7)')
  x.fillStyle = g; x.fillRect(0, 0, W, H)
  g = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75)
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,8,30,0.35)')
  x.fillStyle = g; x.fillRect(0, 0, W, H)
  return c
}

// ── setup ─────────────────────────────────────────────────────────────────
window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const out = document.getElementById('c')
  out.width = W; out.height = H
  const gl = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1); renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 400)
  S = { script, renderer, scene, camera, out, octx: out.getContext('2d') }
  S.glowTex = glowTexture()
  const [sc, sx] = canvas(128, 128)
  const sg = sx.createRadialGradient(64, 64, 0, 64, 64, 64)
  sg.addColorStop(0, 'rgba(40,30,60,0.6)'); sg.addColorStop(1, 'rgba(40,30,60,0)')
  sx.fillStyle = sg; sx.fillRect(0, 0, 128, 128)
  S.shadowTex = tex(sc)

  scene.background = null
  const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 32, 16), basic({ map: skyTexture(), side: THREE.BackSide, fog: false }))
  scene.add(sky)
  scene.fog = new THREE.Fog('#c7bfe6', 40, 120)
  scene.add(new THREE.HemisphereLight('#dfe4ff', '#b8a8c8', 1.6))
  const key = new THREE.DirectionalLight('#ffe4cc', 1.1); key.position.set(-6, 14, 20); scene.add(key)

  building()
  S.rooms = script.beats.map((b, i) => buildRoom(b, i))

  // snow: falls in front of the building
  const R = rng(99)
  const N = 900
  S.flakes = Array.from({ length: N }, () => [R() * 34 - 17, R() * 26 - 2, 2.2 + R() * 14, 0.4 + R() * 0.5, R() * 6.3])
  S.snowGeo = new THREE.BufferGeometry()
  S.snowGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(N * 3), 3))
  const [fc, fx] = canvas(32, 32)
  const fg = fx.createRadialGradient(16, 16, 0, 16, 16, 16); fg.addColorStop(0, 'rgba(255,255,255,1)'); fg.addColorStop(0.5, 'rgba(255,255,255,0.8)'); fg.addColorStop(1, 'rgba(255,255,255,0)')
  fx.fillStyle = fg; fx.fillRect(0, 0, 32, 32)
  S.snow = new THREE.Points(S.snowGeo, new THREE.PointsMaterial({ size: 0.09, map: tex(fc), transparent: true, depthWrite: false, opacity: 0.9 }))
  scene.add(S.snow)

  S.vignette = vignette()
  const n = script.beats.length
  S.n = n
  S.duration = HOOK + n * BEAT + END
  return { duration: S.duration, frames: Math.round(S.duration * FPS), beat: BEAT, hook: HOOK, end: END }
}

function wideShot(t) {
  return { pos: new THREE.Vector3(Math.sin(t * 0.3) * 0.6, 7.4, 34), at: new THREE.Vector3(0, 7.6, 0) }
}
function roomShot(i, h) {
  const s = roomSlot(i)
  // a slow push-in while we're there
  return { pos: new THREE.Vector3(s.x + 0.05, s.y + 1.85, 10.4 - h * 0.9), at: new THREE.Vector3(s.x, s.y + 1.2, 0) }
}
function camAt(t) {
  const n = S.n
  if (t < HOOK) return wideShot(t)
  const k = t - HOOK
  const i = Math.floor(k / BEAT)
  if (i >= n) {
    const e = t - (HOOK + n * BEAT)
    const a = roomShot(n - 1, 1), b = wideShot(t)
    const u = easeIO((e - 0.9) / 1.3)
    return { pos: a.pos.clone().lerp(b.pos, u), at: a.at.clone().lerp(b.at, u) }
  }
  const u = k - i * BEAT
  const to = roomShot(i, clamp((u - MOVE) / (BEAT - MOVE)))
  const from = i === 0 ? wideShot(HOOK) : roomShot(i - 1, 1)
  const mv = i === 0 ? 0.9 : MOVE
  const m = easeIO(u / mv)
  const pos = from.pos.clone().lerp(to.pos, m)
  pos.z += Math.sin(m * Math.PI) * (i === 0 ? 0 : 1.6) // a little pull back mid-flight
  return { pos, at: from.at.clone().lerp(to.at, m) }
}

window.frame = (t) => {
  const { renderer, scene, camera, script } = S
  const n = S.n
  const cam = camAt(t)
  camera.position.copy(cam.pos); camera.lookAt(cam.at)
  S.rooms.forEach((r, i) => poseRoom(r, t, t - (HOOK + i * BEAT)))
  const p = S.snowGeo.attributes.position
  S.flakes.forEach(([x, y, z, sp, ph], j) => {
    const yy = ((y - t * sp) % 26 + 26) % 26 - 2
    p.setXYZ(j, x + Math.sin(t * 0.8 + ph) * 0.3, yy, z)
  })
  p.needsUpdate = true
  renderer.render(scene, camera)

  const o = S.octx
  o.drawImage(renderer.domElement, 0, 0, W, H)
  o.drawImage(S.vignette, 0, 0)
  const endStart = HOOK + n * BEAT
  // header: big during the hook, then the small sticker on top
  if (t < HOOK) {
    const a = clamp(t / 0.25)
    const pop = backOut(t / 0.4)
    o.save(); o.globalAlpha = a
    o.textAlign = 'center'; o.textBaseline = 'middle'
    o.translate(W / 2, 330); o.scale(pop, pop); o.translate(-W / 2, -330)
    const [l1, l2] = script.title
    stroked(o, l1, W / 2, 250, '800 92px Poppins', '#ffffff', INK, 18)
    const words = l2.split(' ')
    const half = Math.ceil(words.length / 2)
    const a2 = words.slice(0, half).join(' '), b2 = words.slice(half).join(' ')
    stroked(o, a2, W / 2, 370, fitFont(o, a2, 800, 80, W - 100), '#ffe08a', INK, 16)
    stroked(o, b2, W / 2, 465, fitFont(o, b2, 800, 80, W - 100), '#ffe08a', INK, 16)
    o.restore()
    o.save(); o.globalAlpha = clamp((t - 0.6) / 0.3)
    o.textAlign = 'center'; o.textBaseline = 'middle'
    stroked(o, 'last one up → first one up', W / 2, 1720, '700 44px Poppins', '#ffffff', INK, 12)
    o.restore()
  } else if (t < endStart + 0.9) {
    header(o, clamp((t - HOOK) / 0.3) * clamp((endStart + 0.9 - t) / 0.3))
  }
  const i = Math.floor((t - HOOK) / BEAT)
  if (t >= HOOK && i < n) caption(o, script.beats[i], n - i, t - HOOK - i * BEAT)
  // end card
  const e = t - endStart
  if (e > 1.4) {
    const a = clamp((e - 1.4) / 0.35)
    o.save(); o.globalAlpha = a
    o.textAlign = 'center'; o.textBaseline = 'middle'
    const pop = backOut((e - 1.4) / 0.45)
    o.translate(W / 2, 360); o.scale(pop, pop); o.translate(-W / 2, -360)
    stroked(o, script.end[0], W / 2, 300, '800 72px Poppins', '#ffffff', INK, 16)
    stroked(o, script.end[1], W / 2, 400, fitFont(o, script.end[1], 800, 84, W - 90), '#ffe08a', INK, 16)
    o.restore()
    o.save(); o.globalAlpha = clamp((e - 2.0) / 0.4)
    o.textAlign = 'center'; o.textBaseline = 'middle'
    const sub = script.endSub.toUpperCase()
    o.font = '700 34px Poppins'
    const w = o.measureText(sub).width + 80
    pill(o, W / 2, 1700, w, 74, 'rgba(255,255,255,0.94)')
    o.fillStyle = INK; o.fillText(sub, W / 2, 1703)
    o.restore()
  }
  if (t < 0.15) { o.fillStyle = `rgba(10,8,30,${1 - t / 0.15})`; o.fillRect(0, 0, W, H) }
  return S.out.toDataURL('image/jpeg', 0.9)
}
