// Align "How you…" reels: a small 3D explainer engine (three.js in Chromium).
// window.setup({ script, timeline, fonts, glyphs }) once, then window.frame(t)
// returns a JPEG data URL of the 1080 × 1920 frame at t seconds.
//
// Every scene is one narrated sentence and one shot: a set (room, cafe,
// street, space, lab, phone), a cast of clay characters with a pose and a
// face, a few effects, and a camera move. Captions pop up a few words at a
// time and the word being said turns gold.

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const W = 1080, H = 1920, FPS = 30
const GOLD = '#ffd54a', PINK = '#ff8db4', INK = '#120d24', BONE = '#f6efe2', INDIGO = '#1c1640'
const SETS = ['room', 'cafe', 'street', 'space', 'lab', 'phone', 'studio']
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const SIGN_CH = Object.fromEntries(SIGNS.map((s, i) => [s, String.fromCodePoint(0x2648 + i)]))
const PLANET_CH = { venus: '♀', mars: '♂', sun: '☉', moon: '☽', mercury: '☿', jupiter: '♃', saturn: '♄' }

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const easeBack = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
const lerp = (a, b, k) => a + (b - a) * k
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }
function hash(str) { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0 }

let S = null
let GLYPHS = {}

// ── canvas helpers ───────────────────────────────────────────────────────
function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')] }
function tex(c) { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t }
function drawGlyph(x, ch, cx, cy, size, color, glow = 0) {
  const g = GLYPHS[ch]
  if (!g) return
  if (!g.path) g.path = new Path2D(g.d)
  x.save(); x.translate(cx, cy); x.scale(size / 1000, size / 1000)
  if (glow) { x.shadowColor = color; x.shadowBlur = glow * 1000 / size }
  x.fillStyle = color; x.fill(g.path); x.restore()
}
function radial(size, stops) {
  const [c, x] = canvas(size, size)
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [k, col] of stops) g.addColorStop(k, col)
  x.fillStyle = g; x.fillRect(0, 0, size, size)
  return tex(c)
}
function textTex(str, { size = 200, fill = '#fff', stroke = INK, font = '700', w = 512, h = 512 } = {}) {
  const [c, x] = canvas(w, h)
  x.font = `${font} ${size}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = size * 0.16; x.strokeStyle = stroke; x.strokeText(str, w / 2, h / 2)
  x.fillStyle = fill; x.fillText(str, w / 2, h / 2)
  return tex(c)
}
function heartPath(x, cx, cy, s) {
  x.beginPath()
  x.moveTo(cx, cy + s * 0.35)
  x.bezierCurveTo(cx - s * 0.9, cy - s * 0.25, cx - s * 0.45, cy - s * 0.95, cx, cy - s * 0.45)
  x.bezierCurveTo(cx + s * 0.45, cy - s * 0.95, cx + s * 0.9, cy - s * 0.25, cx, cy + s * 0.35)
  x.closePath()
}
function heartTex(color = PINK) {
  const [c, x] = canvas(256, 256)
  x.lineJoin = 'round'; heartPath(x, 128, 150, 150)
  x.lineWidth = 16; x.strokeStyle = INK; x.stroke(); x.fillStyle = color; x.fill()
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.ellipse(92, 92, 18, 11, -0.6, 0, Math.PI * 2); x.fill()
  return tex(c)
}
function glyphTex(ch, color = GOLD) {
  const [c, x] = canvas(512, 512)
  drawGlyph(x, ch, 256, 256, 330, 'rgba(255,214,90,0.55)', 50)
  drawGlyph(x, ch, 256, 256, 330, color, 18)
  return tex(c)
}

// ── materials and shared geometry ────────────────────────────────────────
const MATS = new Map()
function clay(color, o = {}) {
  const key = color + JSON.stringify(o)
  if (!MATS.has(key)) MATS.set(key, new THREE.MeshPhysicalMaterial({ color, roughness: 0.48, metalness: 0, clearcoat: 0.45, clearcoatRoughness: 0.32, sheen: 0.35, sheenRoughness: 0.5, sheenColor: new THREE.Color('#ffffff'), ...o }))
  return MATS.get(key)
}
const basic = (o) => new THREE.MeshBasicMaterial(o)
const G = {}
function geos() {
  G.sph = new THREE.SphereGeometry(1, 32, 24)
  G.sphLo = new THREE.SphereGeometry(1, 16, 12)
  G.cap = (r, l) => new THREE.CapsuleGeometry(r, l, 8, 16)
  G.box = new THREE.BoxGeometry(1, 1, 1)
  G.cyl = new THREE.CylinderGeometry(1, 1, 1, 32)
  G.plane = new THREE.PlaneGeometry(1, 1)
}
function mesh(geo, mat, [x, y, z] = [0, 0, 0], [sx, sy, sz] = [1, 1, 1]) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz); return m
}
function roundBox(w, h, d, r) {
  const s = new THREE.Shape()
  s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); s.lineTo(-w / 2 + r, h / 2)
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: r * 0.4, bevelSize: r * 0.4, bevelSegments: 4, curveSegments: 10 })
  g.translate(0, 0, -d / 2)
  return g
}
function sprite(map, size, o = {}) {
  const solid = !o.blending
  const m = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: solid, alphaTest: solid ? 0.2 : 0, ...o }))
  m.scale.set(size, size, 1)
  return m
}
function blob(r) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), basic({ map: S.shadowTex, transparent: true, depthWrite: false }))
  m.rotation.x = -Math.PI / 2; m.position.y = 0.012
  return m
}

// ── characters ───────────────────────────────────────────────────────────
// Clay people about 2.6 units tall: a big round head, a capsule body, two
// jointed arms and legs. Feet on y = 0, facing +z.
const HEAD_Y = 2.16, HEAD_R = 0.46
function makeChar(def, id) {
  const root = new THREE.Group()
  const body = new THREE.Group(); root.add(body)
  const skin = clay(def.skin), shirt = clay(def.shirt), pants = clay(def.pants), hairM = clay(def.hair, { roughness: 0.8 })
  const shoe = clay('#25202e')
  const torso = mesh(G.cap(0.36, 0.42), shirt, [0, 1.28, 0], [1, 1, 0.82]); body.add(torso)
  body.add(mesh(G.cap(0.3, 0.2), pants, [0, 0.9, 0], [1.1, 1, 0.86]))
  if (def.sign && SIGN_CH[def.sign]) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.17, 32), basic({ map: glyphTex(SIGN_CH[def.sign], '#fff6d8'), transparent: true }))
    p.position.set(0, 1.38, 0.3); p.scale.setScalar(1.55); body.add(p)
  }
  const neck = new THREE.Group(); neck.position.set(0, 1.78, 0); body.add(neck)
  const head = new THREE.Group(); head.position.set(0, HEAD_Y - 1.78, 0); neck.add(head)
  head.add(mesh(G.sph, skin, [0, 0, 0], [HEAD_R, HEAD_R * 0.98, HEAD_R * 0.96]))
  head.add(mesh(G.sphLo, skin, [0, -0.04, HEAD_R * 0.93], [0.07, 0.065, 0.06]))
  for (const s of [-1, 1]) head.add(mesh(G.sphLo, skin, [s * HEAD_R * 0.97, -0.02, 0], [0.08, 0.11, 0.06]))
  // eyes
  const eyes = []
  for (const s of [-1, 1]) {
    const e = new THREE.Group(); e.position.set(s * 0.165, 0.06, HEAD_R * 0.86); head.add(e)
    const white = mesh(G.sph, clay('#ffffff', { roughness: 0.3 }), [0, 0, 0], [0.105, 0.125, 0.06]); e.add(white)
    const pupil = mesh(G.sph, clay('#16101c', { roughness: 0.2 }), [0, 0, 0.045], [0.058, 0.068, 0.03]); e.add(pupil)
    const shine = mesh(G.sphLo, basic({ color: '#ffffff' }), [0.022, 0.03, 0.074], [0.017, 0.017, 0.01]); e.add(shine)
    const heart = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.17), basic({ map: S.heartTex, transparent: true, depthWrite: false }))
    heart.position.set(0, 0, 0.08); heart.visible = false; e.add(heart)
    const brow = mesh(G.box, hairM, [0, 0.175, 0.02], [0.15, 0.035, 0.03]); e.add(brow)
    const blush = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), basic({ color: '#ff7f9a', transparent: true, opacity: 0.5, depthWrite: false }))
    blush.position.set(s * 0.06, -0.15, 0.0); blush.visible = false; e.add(blush)
    eyes.push({ g: e, white, pupil, shine, heart, brow, blush, s })
  }
  // mouths, one shown at a time
  const dark = clay('#5a1f2c', { roughness: 0.5 })
  const mouths = {
    smile: mesh(new THREE.TorusGeometry(0.1, 0.024, 8, 20, Math.PI), dark, [0, -0.15, HEAD_R * 0.9]),
    frown: mesh(new THREE.TorusGeometry(0.09, 0.024, 8, 20, Math.PI), dark, [0, -0.24, HEAD_R * 0.88]),
    flat: mesh(G.box, dark, [0, -0.19, HEAD_R * 0.9], [0.13, 0.028, 0.03]),
    o: mesh(G.sph, dark, [0, -0.2, HEAD_R * 0.86], [0.075, 0.095, 0.05]),
    grin: new THREE.Group(),
  }
  mouths.smile.rotation.z = Math.PI
  const gr = new THREE.Mesh(new THREE.CircleGeometry(0.13, 24, Math.PI, Math.PI), basic({ color: '#5a1f2c' }))
  const teeth = mesh(G.box, basic({ color: '#fffaf0' }), [0, -0.022, 0.002], [0.2, 0.04, 0.01])
  mouths.grin.add(gr, teeth); mouths.grin.position.set(0, -0.12, HEAD_R * 0.93); mouths.grin.rotation.x = -0.25
  for (const m of Object.values(mouths)) { m.visible = false; head.add(m) }
  hair(head, def.style, hairM)
  // limbs: [pivot, elbow/knee pivot]
  const arm = (s) => {
    const sh = new THREE.Group(); sh.position.set(s * 0.42, 1.55, 0); body.add(sh)
    sh.add(mesh(G.cap(0.105, 0.26), shirt, [0, -0.17, 0]))
    const el = new THREE.Group(); el.position.set(0, -0.36, 0); sh.add(el)
    el.add(mesh(G.cap(0.095, 0.24), skin, [0, -0.15, 0]))
    const hand = mesh(G.sph, skin, [0, -0.36, 0], [0.12, 0.13, 0.11]); el.add(hand)
    return { sh, el, hand, s }
  }
  const leg = (s) => {
    const hp = new THREE.Group(); hp.position.set(s * 0.17, 0.82, 0); body.add(hp)
    hp.add(mesh(G.cap(0.135, 0.26), pants, [0, -0.2, 0]))
    const kn = new THREE.Group(); kn.position.set(0, -0.4, 0); hp.add(kn)
    kn.add(mesh(G.cap(0.125, 0.22), pants, [0, -0.17, 0]))
    kn.add(mesh(G.sph, shoe, [0, -0.38, 0.07], [0.14, 0.08, 0.2]))
    return { hp, kn }
  }
  const arms = [arm(-1), arm(1)], legs = [leg(-1), leg(1)]
  root.add(blob(0.7))
  root.userData.shadow = root.children[root.children.length - 1]
  // the phone, shown in the right hand for some poses
  const phone = new THREE.Group()
  phone.add(mesh(roundBox(0.2, 0.38, 0.03, 0.04), clay('#1d1a26', { roughness: 0.3 })))
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.19, 0.35), basic({ color: '#bfe3ff' }))
  scr.position.z = 0.03; scr.rotation.y = Math.PI; phone.add(scr)
  phone.position.set(0, -0.42, 0.05); phone.visible = false
  arms[1].el.add(phone)
  const glow = sprite(S.glowTex, 0.9, { color: '#bfe3ff', blending: THREE.AdditiveBlending, opacity: 0.55 })
  glow.position.set(0, 0, -0.1); phone.add(glow)
  return { id, def, root, body, neck, head, eyes, mouths, arms, legs, phone, torso, mats: { skin, shirt, pants, hairM } }
}

function hair(head, style, m) {
  const R = HEAD_R
  if (style === 'bald') return
  const cap = new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.42), m)
  cap.rotation.x = -0.42; cap.position.y = 0.02; head.add(cap)
  if (style === 'short') {
    const f = mesh(G.sph, m, [0.08, R * 0.72, R * 0.42], [0.3, 0.12, 0.2]); f.rotation.z = -0.3; head.add(f)
  }
  if (style === 'curly') {
    const r = rng(7)
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 2, p = r() * 0.95
      const v = new THREE.Vector3(Math.cos(a) * Math.sin(p), Math.cos(p), Math.sin(a) * Math.sin(p)).multiplyScalar(R * 1.02)
      if (v.z > R * 0.55 && v.y < R * 0.62) continue
      head.add(mesh(G.sphLo, m, [v.x, v.y + 0.04, v.z - 0.04], [0.16, 0.16, 0.16]))
    }
  }
  if (style === 'long') {
    head.add(mesh(G.cap(R * 0.95, 0.5), m, [0, -0.3, -0.16], [1.08, 1, 0.7]))
    const f = mesh(G.sph, m, [-0.12, R * 0.66, R * 0.5], [0.34, 0.14, 0.22]); f.rotation.z = 0.35; head.add(f)
  }
  if (style === 'bun') {
    head.add(mesh(G.sph, m, [0, R * 1.05, -R * 0.35], [0.24, 0.22, 0.24]))
  }
}

// poses: per arm [shoulder x, abduct, elbow x], legs, head [pitch, yaw, roll]
const POSES = {
  stand: { arms: [[0.05, 0.13, -0.18], [0.05, 0.13, -0.18]] },
  phone: { arms: [[-0.42, 0.12, -1.55], [-0.5, 0.18, -1.7]], head: [0.32, 0, 0], phone: true },
  shrug: { arms: [[-0.35, 0.75, -1.5], [-0.35, 0.75, -1.5]], head: [0, 0, 0.18] },
  wave: { arms: [[0.05, 0.13, -0.18], [0, 2.55, -0.35]], wave: true },
  point: { arms: [[0.05, 0.13, -0.2], [-1.5, 0.08, -0.05]] },
  shock: { arms: [[-0.25, 2.35, -0.75], [-0.25, 2.35, -0.75]], head: [-0.08, 0, 0], hop: true },
  heart: { arms: [[-0.6, -0.3, -1.95], [-0.6, -0.3, -1.95]], head: [0.05, 0, 0.12] },
  think: { arms: [[-0.35, -0.05, -1.4], [-0.75, 0.15, -2.35]], head: [-0.12, 0, 0.15] },
  float: { arms: [[0.0, 0.95, -0.35], [0.0, 0.95, -0.35]], legs: [[-0.25, 0.35], [0.15, 0.25]], float: true },
  sit: { arms: [[-0.55, 0.12, -0.75], [-0.55, 0.12, -0.75]], legs: [[-1.5, 1.45], [-1.5, 1.45]], sit: true },
}
const EXPR = {
  neutral: { mouth: 'smile', mouthS: 0.55, brow: [0, 0] },
  smile: { mouth: 'smile', mouthS: 1, brow: [0.02, 0.05] },
  grin: { mouth: 'grin', brow: [0.04, 0.1] },
  shock: { mouth: 'o', eye: 1.28, pupil: 0.7, brow: [0.09, 0] },
  sad: { mouth: 'frown', brow: [0.02, -0.38], eyeY: 0.85 },
  worried: { mouth: 'flat', brow: [0.03, -0.3] },
  smitten: { mouth: 'smile', mouthS: 1.1, hearts: true, blush: true, brow: [0.05, 0.05] },
  smug: { mouth: 'smile', mouthS: 0.8, smug: true, eyeY: 0.55, brow: [0, 0.18] },
}

function applyPose(c, pose, expr, t, seed, slow = 1) {
  const P = POSES[pose] || POSES.stand
  const E = EXPR[expr] || EXPR.neutral
  const ts = t * slow
  const breathe = Math.sin(ts * 2.4 + seed) * 0.02
  c.arms.forEach((a, i) => {
    const [sx, ab, el] = P.arms[i]
    a.sh.rotation.set(sx + breathe, 0, a.s * (ab + breathe * 0.5))
    a.el.rotation.set(el, 0, 0)
  })
  if (P.wave) c.arms[1].sh.rotation.z = 2.45 + Math.sin(ts * 9) * 0.28
  if (pose === 'point') c.arms[1].sh.rotation.x = -1.5 + Math.sin(ts * 5) * 0.04
  const L = P.legs || [[0, 0], [0, 0]]
  c.legs.forEach((l, i) => { l.hp.rotation.set(L[i][0], 0, 0); l.kn.rotation.set(L[i][1], 0, 0) })
  const hd = P.head || [0, 0, 0]
  c.neck.rotation.set(hd[0] + Math.sin(ts * 1.3 + seed) * 0.03, hd[1] + Math.sin(ts * 0.9 + seed) * 0.06, hd[2])
  let y = 0
  if (P.sit) y = -0.3
  if (P.float) y = 0.35 + Math.sin(ts * 1.8 + seed) * 0.12
  if (P.hop) y += Math.abs(Math.sin(ts * 9)) * 0.1 * Math.max(0, 1 - ts * 0.8)
  c.body.position.y = y + breathe
  c.body.rotation.z = P.float ? Math.sin(ts * 1.1 + seed) * 0.06 : 0
  c.root.userData.shadow.visible = !P.float
  c.phone.visible = !!P.phone
  // face
  for (const m of Object.values(c.mouths)) m.visible = false
  const mo = c.mouths[E.mouth]; mo.visible = true
  if (E.mouth === 'smile') { mo.scale.set(E.mouthS, E.mouthS * 0.9, 1); mo.rotation.z = Math.PI + (E.smug ? 0.25 : 0) ; mo.position.x = E.smug ? 0.04 : 0 }
  if (E.mouth === 'o') mo.scale.set(0.075 * (1 + Math.sin(ts * 6) * 0.08), 0.095, 0.05)
  // blink every few seconds
  const ph = (ts + seed * 1.7) % 3.3
  const blink = ph < 0.12 ? 0.1 : 1
  for (const e of c.eyes) {
    const k = E.eye || 1
    e.white.scale.set(0.105 * k, 0.125 * k * (E.eyeY || 1) * blink, 0.06)
    const pk = E.pupil || 1
    e.pupil.scale.set(0.058 * pk, 0.068 * pk * blink, 0.03)
    e.pupil.visible = e.shine.visible = !E.hearts
    e.heart.visible = !!E.hearts && blink > 0.5
    if (E.hearts) e.heart.scale.setScalar(1 + Math.sin(ts * 8) * 0.12)
    e.blush.visible = !!E.blush
    e.brow.position.y = 0.175 + (E.brow[0]) + (E.smug && e.s > 0 ? 0.05 : 0)
    e.brow.rotation.z = -e.s * E.brow[1]
  }
}

// ── organs for the x-ray shots ───────────────────────────────────────────
function brainMesh() {
  const g = new THREE.SphereGeometry(0.3, 64, 48)
  const p = g.attributes.position, v = new THREE.Vector3()
  const col = new Float32Array(p.count * 3)
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    const n = v.clone().normalize()
    const fold = (Math.sin(n.x * 11 + Math.sin(n.y * 6) * 2.5) * Math.sin(n.y * 10 + n.z * 5) + 0.6 * Math.sin(n.z * 13 + Math.sin(n.x * 5) * 2)) * 0.016
    const groove = Math.exp(-Math.pow(n.x * 9, 2)) * 0.035
    v.addScaledVector(n, fold - groove)
    v.y *= 0.82; v.z *= 1.18
    p.setXYZ(i, v.x, v.y, v.z)
  }
  g.computeVertexNormals()
  g.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, emissive: '#ff4f9a', emissiveIntensity: 0.35 }))
  m.userData.front = (mode, k) => {
    const c = new THREE.Color()
    for (let i = 0; i < p.count; i++) {
      const z = p.getZ(i), y = p.getY(i)
      const front = z > 0.12 && y > -0.05
      if (mode === 'dim' && front) c.set('#3a3550').lerp(new THREE.Color('#ff9cc8'), 1 - k)
      else c.set('#ff9cc8')
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    g.attributes.color.needsUpdate = true
  }
  m.userData.front('', 0)
  return m
}
function heartMesh() {
  const s = new THREE.Shape()
  s.moveTo(0, -0.3)
  s.bezierCurveTo(-0.5, 0.05, -0.28, 0.42, 0, 0.18)
  s.bezierCurveTo(0.28, 0.42, 0.5, 0.05, 0, -0.3)
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 5, curveSegments: 24 })
  g.center()
  return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: '#ff3f5e', roughness: 0.35, emissive: '#ff2040', emissiveIntensity: 0.5 }))
}
function xray(c, mode) {
  const glass = new THREE.MeshStandardMaterial({ color: '#7fe8ff', transparent: true, opacity: 0.22, roughness: 0.2, emissive: '#2bb8e0', emissiveIntensity: 0.35, depthWrite: false })
  c.root.traverse((o) => {
    if (o.isMesh && !o.userData.keep && o.material !== S.shadowMat && !o.material.map) o.material = glass
  })
  // keep the eyes readable
  for (const e of c.eyes) { e.white.material = clay('#ffffff'); e.pupil.material = clay('#16101c') }
  const brain = brainMesh(); brain.position.set(0, 0.08, 0); c.head.add(brain)
  const heart = heartMesh(); heart.position.set(-0.1, 1.42, 0.05); heart.scale.setScalar(0.55); c.body.add(heart)
  const hg = sprite(S.glowTex, 1.6, { color: '#ff4060', blending: THREE.AdditiveBlending, opacity: 0.5 }); hg.position.copy(heart.position); c.body.add(hg)
  const bg = sprite(S.glowTex, 1.6, { color: '#ff7fc0', blending: THREE.AdditiveBlending, opacity: 0.45 }); bg.position.set(0, 0.08, 0); c.head.add(bg)
  c.xray = { mode, brain, heart, hg, bg }
}

// ── sets ─────────────────────────────────────────────────────────────────
function woodTex() {
  const [c, x] = canvas(1024, 1024)
  x.fillStyle = '#a8734a'; x.fillRect(0, 0, 1024, 1024)
  const r = rng(3)
  for (let i = 0; i < 8; i++) {
    x.fillStyle = i % 2 ? '#9c6a43' : '#b07b50'; x.fillRect(0, i * 128, 1024, 126)
    x.fillStyle = 'rgba(60,30,15,0.35)'; x.fillRect(0, i * 128 + 126, 1024, 2)
    for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(60,30,15,0.5)'; x.fillRect(r() * 1024, i * 128, 2, 128) }
    for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(70,40,20,0.08)'; x.fillRect(r() * 1024, i * 128 + r() * 128, 60 + r() * 200, 2) }
  }
  const t = tex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); return t
}
function wallTex(base, stripe) {
  const [c, x] = canvas(512, 512)
  x.fillStyle = base; x.fillRect(0, 0, 512, 512)
  if (stripe) { x.fillStyle = stripe; for (let i = 0; i < 512; i += 64) x.fillRect(i, 0, 26, 512) }
  const t = tex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 2); return t
}
function nightTex(rain = false) {
  const [c, x] = canvas(512, 512)
  const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#120c33'); g.addColorStop(1, '#3d2a6e')
  x.fillStyle = g; x.fillRect(0, 0, 512, 512)
  const r = rng(11)
  for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.7})`; x.fillRect(r() * 512, r() * 380, 2, 2) }
  x.fillStyle = '#fff3cf'; x.shadowColor = '#fff3cf'; x.shadowBlur = 40; x.beginPath(); x.arc(360, 150, 54, 0, Math.PI * 2); x.fill()
  x.shadowBlur = 0; x.fillStyle = '#120c33'; x.beginPath(); x.arc(386, 136, 48, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0d0a22'
  for (let i = 0; i < 9; i++) { const w = 40 + r() * 50, h = 60 + r() * 120; x.fillRect(i * 58, 512 - h, w, h) }
  x.fillStyle = '#ffd77a'
  for (let i = 0; i < 40; i++) x.fillRect(r() * 512, 400 + r() * 100, 5, 7)
  return tex(c)
}
function starTex() {
  const [c, x] = canvas(2048, 1024)
  const g = x.createLinearGradient(0, 0, 0, 1024)
  g.addColorStop(0, '#07051a'); g.addColorStop(0.5, '#1c1442'); g.addColorStop(1, '#0a0720')
  x.fillStyle = g; x.fillRect(0, 0, 2048, 1024)
  const r = rng(5)
  for (let i = 0; i < 9; i++) {
    const cx = r() * 2048, cy = 250 + r() * 500, rad = 200 + r() * 300
    const n = x.createRadialGradient(cx, cy, 0, cx, cy, rad)
    const hue = ['rgba(150,90,220,0.22)', 'rgba(255,120,180,0.14)', 'rgba(90,140,255,0.16)'][i % 3]
    n.addColorStop(0, hue); n.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = n; x.fillRect(cx - rad, cy - rad, rad * 2, rad * 2)
  }
  for (let i = 0; i < 2200; i++) {
    const s = r() < 0.04 ? 3 : r() < 0.3 ? 2 : 1
    x.fillStyle = `rgba(255,${235 + r() * 20},${210 + r() * 45},${0.35 + r() * 0.65})`
    x.fillRect(r() * 2048, r() * 1024, s, s)
  }
  return tex(c)
}
function planetTex(kind) {
  const [c, x] = canvas(1024, 512)
  const r = rng(hash(kind))
  const pal = {
    venus: ['#f3cf9f', '#e9b07c', '#fbe3c4'], mars: ['#c9502f', '#a33a22', '#e0774d'], moon: ['#cfcbd6', '#a9a4b5', '#e6e3ec'],
    mercury: ['#a59a8e', '#857a70', '#c2b8ad'], earth: ['#2f6fd6', '#2b9a5a', '#f5f7ff'], sun: ['#ffd24a', '#ffb22a', '#fff1a0'],
  }[kind]
  x.fillStyle = pal[0]; x.fillRect(0, 0, 1024, 512)
  if (kind === 'venus' || kind === 'sun') {
    for (let i = 0; i < 60; i++) { x.fillStyle = r() < 0.5 ? pal[1] : pal[2]; x.globalAlpha = 0.35; x.fillRect(0, r() * 512, 1024, 6 + r() * 30) }
  } else if (kind === 'earth') {
    x.fillStyle = pal[1]
    for (let i = 0; i < 14; i++) { x.beginPath(); x.ellipse(r() * 1024, 80 + r() * 350, 40 + r() * 110, 30 + r() * 70, r() * 3, 0, Math.PI * 2); x.fill() }
    x.fillStyle = pal[2]; x.globalAlpha = 0.6
    for (let i = 0; i < 30; i++) x.fillRect(r() * 1024, r() * 512, 80 + r() * 160, 8 + r() * 10)
  } else {
    for (let i = 0; i < 70; i++) {
      x.globalAlpha = 0.5; x.fillStyle = r() < 0.6 ? pal[1] : pal[2]
      x.beginPath(); x.arc(r() * 1024, r() * 512, 6 + r() * 40, 0, Math.PI * 2); x.fill()
    }
  }
  x.globalAlpha = 1
  return tex(c)
}
function wheelTex(house7 = false) {
  const [c, x] = canvas(1024, 1024)
  const C = 512
  x.fillStyle = 'rgba(20,14,48,0.86)'; x.beginPath(); x.arc(C, C, 500, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#ffd54a'; x.lineWidth = 8
  for (const rr of [500, 400, 250]) { x.beginPath(); x.arc(C, C, rr, 0, Math.PI * 2); x.stroke() }
  x.lineWidth = 4
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    x.beginPath(); x.moveTo(C + Math.cos(a) * 250, C + Math.sin(a) * 250); x.lineTo(C + Math.cos(a) * 500, C + Math.sin(a) * 500); x.stroke()
    const m = a + Math.PI / 12
    drawGlyph(x, SIGN_CH[SIGNS[i]], C + Math.cos(m) * 450, C + Math.sin(m) * 450, 64, '#ffe9a8')
    x.fillStyle = 'rgba(255,233,168,0.75)'; x.font = '700 40px "Space Mono"'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(String(((i + 6) % 12) + 1), C + Math.cos(m) * 325, C + Math.sin(m) * 325)
  }
  drawGlyph(x, '✦', C, C, 120, '#ffd54a', 20)
  return tex(c)
}
function clockTex() {
  const [c, x] = canvas(512, 512)
  x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(256, 256, 240, 0, Math.PI * 2); x.fill()
  x.lineWidth = 18; x.strokeStyle = INK; x.stroke()
  x.fillStyle = INK
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; x.fillRect(256 + Math.sin(a) * 200 - 6, 256 - Math.cos(a) * 200 - 14, 12, 28) }
  return tex(c)
}

function lightRig(g, o) {
  g.add(new THREE.HemisphereLight(o.sky, o.ground, o.hemi))
  const key = new THREE.DirectionalLight(o.key, o.keyI); key.position.set(-4, 8, 6); g.add(key)
  const rim = new THREE.DirectionalLight(o.rim, o.rimI); rim.position.set(5, 4, -6); g.add(rim)
}

function buildSets() {
  const sets = {}
  // bedroom: wood floor, two walls, a bed, a lamp and a night window
  {
    const g = new THREE.Group()
    const floor = mesh(G.plane, clay('#ffffff', { map: woodTex() }), [0, 0, 0], [40, 40, 1]); floor.rotation.x = -Math.PI / 2; g.add(floor)
    g.add(mesh(G.box, clay('#ffffff', { map: wallTex('#6b5bb8', '#6152ac') }), [0, 6, -3.6], [40, 12, 0.2]))
    const side = mesh(G.box, clay('#5a4ba3'), [-5, 6, 0], [0.2, 12, 30]); g.add(side)
    // window
    const win = new THREE.Group(); win.position.set(1.6, 3.4, -3.48); g.add(win)
    win.add(mesh(G.box, clay('#f4ead8'), [0, 0, 0], [2.6, 2.2, 0.12]))
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9), basic({ map: nightTex() })); pane.position.z = 0.07; win.add(pane)
    win.add(mesh(G.box, clay('#f4ead8'), [0, 0, 0.09], [0.08, 1.9, 0.05]), mesh(G.box, clay('#f4ead8'), [0, 0, 0.09], [2.3, 0.08, 0.05]))
    sets.roomRain = new THREE.Group(); win.add(sets.roomRain)
    // bed
    const bed = new THREE.Group(); bed.position.set(-1.6, 0, -1.8); g.add(bed)
    bed.add(mesh(G.box, clay('#7a4a33'), [0, 0.22, 0], [2.6, 0.44, 3.4]))
    bed.add(mesh(roundBox(2.5, 3.3, 0.24, 0.12), clay('#f7f1ff'), [0, 0.52, 0], [1, 1, 1]))
    bed.children[1].rotation.x = -Math.PI / 2
    bed.add(mesh(G.box, clay('#7a4a33'), [0, 0.8, -1.72], [2.7, 1.6, 0.14]))
    bed.add(mesh(G.cap(0.22, 0.9), clay('#ffe3ef'), [0, 0.78, -1.25], [1, 1, 0.6]))
    bed.children[3].rotation.z = Math.PI / 2
    const blanket = mesh(roundBox(2.55, 1.9, 0.12, 0.06), clay('#ff9fb8'), [0, 0.66, 0.7]); blanket.rotation.x = -Math.PI / 2; bed.add(blanket)
    // lamp and nightstand
    const ns = new THREE.Group(); ns.position.set(0.3, 0, -2.9); g.add(ns)
    ns.add(mesh(G.box, clay('#8a5a3c'), [0, 0.4, 0], [0.8, 0.8, 0.6]))
    ns.add(mesh(G.cyl, clay('#f1d6a0'), [0, 1.0, 0], [0.06, 0.4, 0.06]))
    ns.add(mesh(new THREE.ConeGeometry(0.32, 0.4, 24, 1, true), clay('#ffe9b0', { emissive: '#ffcf6a', emissiveIntensity: 0.7, side: THREE.DoubleSide }), [0, 1.35, 0]))
    const lg = sprite(S.glowTex, 2.6, { color: '#ffcf6a', blending: THREE.AdditiveBlending, opacity: 0.5 }); lg.position.set(0, 1.35, 0.1); ns.add(lg)
    const pl = new THREE.PointLight('#ffcf8a', 6, 9, 1.2); pl.position.set(0.3, 1.6, -2.4); g.add(pl)
    // a poster and a rug
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.5), basic({ map: glyphTex('✦', '#ffd54a') }))
    poster.position.set(-2.4, 3.6, -3.48); g.add(poster)
    g.add(mesh(G.box, clay('#2b2060'), [-2.4, 3.6, -3.5], [1.25, 1.65, 0.02]))
    const rug = new THREE.Mesh(new THREE.CircleGeometry(2.2, 48), clay('#e9a24a')); rug.rotation.x = -Math.PI / 2; rug.position.set(0.8, 0.01, 0.6); g.add(rug)
    // clock
    const clock = new THREE.Group(); clock.position.set(-1.4, 4.6, -3.45); g.add(clock)
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.5, 48), basic({ map: clockTex() })); clock.add(face)
    const hh = mesh(G.box, basic({ color: INK }), [0, 0.12, 0.02], [0.05, 0.26, 0.01]); const mh = mesh(G.box, basic({ color: '#e0405a' }), [0, 0.17, 0.03], [0.035, 0.36, 0.01])
    const hp = new THREE.Group(); hp.add(hh); const mp = new THREE.Group(); mp.add(mh); clock.add(hp, mp)
    sets.clock = { g: clock, hp, mp }
    lightRig(g, { sky: '#e9dcff', ground: '#6a4a3a', hemi: 1.5, key: '#fff0dc', keyI: 2.2, rim: '#9fb6ff', rimI: 1.2 })
    g.userData.marks = {
      bed: [-1.9, -1.1, 0.45, 0.62], bedR: [-1.0, -1.1, -0.45, 0.62], center: [0.6, 0.5, 0], left: [-0.9, 0.3, 0], right: [1.1, 0.3, 0], door: [2.6, -0.4, -0.7],
    }
    sets.room = g
  }
  // cafe: tiles, a round table, two chairs, cups, a pendant lamp
  {
    const g = new THREE.Group()
    const [tc, tx] = canvas(512, 512)
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { tx.fillStyle = (i + j) % 2 ? '#e8dcc6' : '#2f2a3e'; tx.fillRect(i * 64, j * 64, 64, 64) }
    const tt = tex(tc); tt.wrapS = tt.wrapT = THREE.RepeatWrapping; tt.repeat.set(4, 4)
    const floor = mesh(G.plane, clay('#fff', { map: tt }), [0, 0, 0], [40, 40, 1]); floor.rotation.x = -Math.PI / 2; g.add(floor)
    g.add(mesh(G.box, clay('#fff', { map: wallTex('#2f6b5e', '#2a6155') }), [0, 6, -3.2], [40, 12, 0.2]))
    g.add(mesh(G.box, clay('#a8693f'), [0, 0.7, -3.05], [40, 1.4, 0.1]))
    const win = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), basic({ map: nightTex() })); win.position.set(-2.6, 3.4, -3.08); g.add(win)
    g.add(mesh(G.box, clay('#e8d6b0'), [-2.6, 3.4, -3.12], [3.8, 2.4, 0.05]))
    const table = new THREE.Group(); g.add(table)
    table.add(mesh(G.cyl, clay('#f3ead8'), [0, 1.12, 0], [0.85, 0.08, 0.85]))
    table.add(mesh(G.cyl, clay('#3a2e2a'), [0, 0.56, 0], [0.07, 1.1, 0.07]))
    table.add(mesh(G.cyl, clay('#3a2e2a'), [0, 0.03, 0], [0.4, 0.06, 0.4]))
    for (const s of [-1, 1]) {
      table.add(mesh(G.cyl, clay(s < 0 ? '#ffffff' : '#ffd36b'), [s * 0.35, 1.28, 0.1], [0.13, 0.24, 0.13]))
      const ch = new THREE.Group(); ch.position.set(s * 1.25, 0, 0); g.add(ch)
      ch.add(mesh(G.box, clay('#c0503f'), [0, 0.47, 0], [0.75, 0.1, 0.75]))
      ch.add(mesh(G.box, clay('#c0503f'), [s * 0.36, 1.0, 0], [0.1, 1.0, 0.75]))
      for (const [a, b] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) ch.add(mesh(G.box, clay('#3a2e2a'), [a * 0.3, 0.22, b * 0.3], [0.06, 0.45, 0.06]))
    }
    const lamp = new THREE.Group(); lamp.position.set(0, 4.2, 0); g.add(lamp)
    lamp.add(mesh(G.cyl, clay('#222'), [0, 1.5, 0], [0.015, 3, 0.015]))
    lamp.add(mesh(new THREE.ConeGeometry(0.5, 0.45, 32, 1, true), clay('#1f3d36', { side: THREE.DoubleSide })))
    const lg = sprite(S.glowTex, 3, { color: '#ffd38a', blending: THREE.AdditiveBlending, opacity: 0.55 }); lg.position.y = -0.3; lamp.add(lg)
    const pl = new THREE.PointLight('#ffd7a0', 10, 9, 1.2); pl.position.set(0, 3.6, 0.3); g.add(pl)
    lightRig(g, { sky: '#ffe9d0', ground: '#3d3a4a', hemi: 1.3, key: '#fff0dc', keyI: 1.9, rim: '#86e0c8', rimI: 1.4 })
    // seated, turned three-quarters to the camera
    g.userData.marks = { seatL: [-1.25, 0, 1.15, 0.47], seatR: [1.25, 0, -1.15, 0.47], left: [-1.3, 1.2, 0.5], right: [1.3, 1.2, -0.5], center: [0, 1.4, 0] }
    sets.cafe = g
  }
  // street: sidewalk at night, a shopfront, a lamp post, the moon
  {
    const g = new THREE.Group()
    const sw = mesh(G.plane, clay('#8d8aa0'), [0, 0, 0], [60, 60, 1]); sw.rotation.x = -Math.PI / 2; g.add(sw)
    const road = mesh(G.plane, clay('#3a374a'), [0, 0.005, 6], [60, 6, 1]); road.rotation.x = -Math.PI / 2; g.add(road)
    const [bc, bx] = canvas(512, 512)
    bx.fillStyle = '#8a3f3a'; bx.fillRect(0, 0, 512, 512)
    for (let j = 0; j < 16; j++) for (let i = 0; i < 9; i++) { bx.fillStyle = (i * 7 + j * 3) % 5 ? '#9b4a42' : '#7d3832'; bx.fillRect(i * 64 - (j % 2) * 32 + 2, j * 32 + 2, 60, 28) }
    const bt = tex(bc); bt.wrapS = bt.wrapT = THREE.RepeatWrapping; bt.repeat.set(5, 3)
    g.add(mesh(G.box, clay('#fff', { map: bt }), [0, 4, -3], [60, 8, 0.4]))
    const shop = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6), basic({ color: '#ffd98f' })); shop.position.set(-2.2, 1.9, -2.78); g.add(shop)
    g.add(mesh(G.box, clay('#2a2340'), [-2.2, 1.9, -2.79], [4.5, 2.9, 0.05]))
    const awn = mesh(G.box, clay('#3fae8c'), [-2.2, 3.55, -2.4], [4.8, 0.2, 1.0]); awn.rotation.x = 0.35; g.add(awn)
    const sg = sprite(S.glowTex, 6, { color: '#ffcf7a', blending: THREE.AdditiveBlending, opacity: 0.35 }); sg.position.set(-2.2, 1.9, -2.5); g.add(sg)
    const post = new THREE.Group(); post.position.set(2.6, 0, -1.2); g.add(post)
    post.add(mesh(G.cyl, clay('#232030'), [0, 2.3, 0], [0.08, 4.6, 0.08]))
    post.add(mesh(G.sph, clay('#fff4cf', { emissive: '#ffe08a', emissiveIntensity: 1 }), [0, 4.7, 0], [0.32, 0.32, 0.32]))
    const pg = sprite(S.glowTex, 4, { color: '#ffe08a', blending: THREE.AdditiveBlending, opacity: 0.6 }); pg.position.set(0, 4.7, 0); post.add(pg)
    const pl = new THREE.PointLight('#ffe0a0', 12, 10, 1.1); pl.position.set(2.6, 4.4, -0.8); g.add(pl)
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(70, 24), basic({ map: nightTex() })); sky.position.set(0, 19, -3.3); g.add(sky)
    lightRig(g, { sky: '#a9a4ff', ground: '#3b2f4a', hemi: 1.2, key: '#d8d4ff', keyI: 1.4, rim: '#ff9fc8', rimI: 1.6 })
    g.userData.marks = { center: [0.3, 0.6, 0], left: [-1, 0.5, 0], right: [1.3, 0.5, 0], line1: [-2.4, 0, 0.2], line2: [-1.2, 0.35, 0.1], line3: [0, 0.6, 0], line4: [1.2, 0.35, -0.1], line5: [2.4, 0, -0.2] }
    sets.street = g
  }
  // space: Align's indigo sky full of stars
  {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.SphereGeometry(90, 48, 24), basic({ map: starTex(), side: THREE.BackSide })))
    lightRig(g, { sky: '#c9c0ff', ground: '#3a2a6a', hemi: 1.4, key: '#fff0d6', keyI: 2.4, rim: '#ff8fd0', rimI: 2.2 })
    g.userData.marks = { center: [0, 0, 0], left: [-0.9, 0, 0.2], right: [0.9, 0, -0.2] }
    g.userData.space = true
    sets.space = g
  }
  // lab: a dark scan room with a glowing grid
  {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.SphereGeometry(60, 32, 16), basic({ color: '#0a1830', side: THREE.BackSide })))
    const grid = new THREE.GridHelper(30, 40, '#2bd2ff', '#1a4f7a'); grid.position.y = 0.01; g.add(grid)
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.08, 64), basic({ color: '#5fe6ff', transparent: true, opacity: 0.8, side: THREE.DoubleSide }))
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; g.add(ring); sets.labRing = ring
    const scan = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.05), basic({ color: '#7ff0ff', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }))
    scan.position.set(0, 1, 0.8); g.add(scan); sets.labScan = scan
    lightRig(g, { sky: '#9fe9ff', ground: '#0b2238', hemi: 1.2, key: '#d8f6ff', keyI: 1.6, rim: '#ff7fc0', rimI: 1.8 })
    g.userData.marks = { center: [0, 0, 0] }
    sets.lab = g
  }
  // phone: a giant phone in a hand, in front of a soft blurry room
  {
    const g = new THREE.Group()
    const [bc, bx] = canvas(512, 1024)
    const gr = bx.createLinearGradient(0, 0, 0, 1024); gr.addColorStop(0, '#3a2b72'); gr.addColorStop(1, '#1a1236')
    bx.fillStyle = gr; bx.fillRect(0, 0, 512, 1024)
    const r = rng(9)
    for (let i = 0; i < 26; i++) {
      const x = r() * 512, y = r() * 1024, rad = 20 + r() * 70
      const b = bx.createRadialGradient(x, y, 0, x, y, rad)
      b.addColorStop(0, `rgba(255,${180 + r() * 60},${120 + r() * 80},0.35)`); b.addColorStop(1, 'rgba(0,0,0,0)')
      bx.fillStyle = b; bx.fillRect(x - rad, y - rad, rad * 2, rad * 2)
    }
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(14, 28), basic({ map: tex(bc) })); bg.position.z = -4; g.add(bg)
    const phone = new THREE.Group(); g.add(phone)
    phone.add(mesh(roundBox(2.3, 4.7, 0.18, 0.32), clay('#1b1824', { roughness: 0.25, metalness: 0.2 })))
    const [sc, sx] = canvas(720, 1440)
    const st = tex(sc)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.14, 4.28), basic({ map: st }))
    screen.position.z = 0.25; phone.add(screen)
    sets.screen = { c: sc, x: sx, t: st }
    sets.phoneObj = phone
    lightRig(g, { sky: '#ffffff', ground: '#4a3a6a', hemi: 1.4, key: '#fff0dc', keyI: 2.0, rim: '#ff9fd0', rimI: 1.5 })
    g.userData.marks = {}
    sets.phone = g
  }
  // studio: a dark seamless sweep for macro cutaways (organs, big planets)
  {
    const g = new THREE.Group()
    const [bc, bx] = canvas(1024, 1024)
    const gr = bx.createRadialGradient(512, 420, 40, 512, 512, 700)
    gr.addColorStop(0, '#3a2f8f'); gr.addColorStop(0.45, '#17123f'); gr.addColorStop(1, '#05040f')
    bx.fillStyle = gr; bx.fillRect(0, 0, 1024, 1024)
    const back = new THREE.Mesh(new THREE.SphereGeometry(40, 48, 24), basic({ map: tex(bc), side: THREE.BackSide }))
    back.rotation.y = -Math.PI / 2; g.add(back)
    const r = rng(21)
    for (let k = 0; k < 40; k++) { const d = sprite(S.glowTex, 0.08 + r() * 0.12, { color: '#bfb6ff', blending: THREE.AdditiveBlending, opacity: 0.25 + r() * 0.4 }); d.position.set((r() - 0.5) * 6, r() * 5, (r() - 0.5) * 4); g.add(d) }
    lightRig(g, { sky: '#d6d0ff', ground: '#120c30', hemi: 0.9, key: '#fff3e0', keyI: 2.6, rim: '#ff6fb8', rimI: 3.2 })
    const rim2 = new THREE.DirectionalLight('#5fd0ff', 2.4); rim2.position.set(-6, 3, -5); g.add(rim2)
    g.userData.marks = { center: [0, 0.4, 0], left: [-0.9, 0.4, 0], right: [0.9, 0.4, 0] }
    g.userData.space = true
    sets.studio = g
  }
  for (const k of SETS) { sets[k].visible = false; S.scene.add(sets[k]) }
  return sets
}

// the hand holding the phone, in the cast's skin tone
function phoneHand(skinHex) {
  const g = new THREE.Group()
  const m = clay(skinHex)
  g.add(mesh(G.cap(0.42, 1.2), m, [0.15, -2.9, -0.15], [1, 1, 0.8]))
  for (let i = 0; i < 4; i++) {
    const f = mesh(G.cap(0.13, 0.5), m, [1.2, -1.2 + i * 0.42, 0.05]); f.rotation.z = Math.PI / 2 - 0.2; g.add(f)
  }
  const th = mesh(G.cap(0.15, 0.6), m, [-1.15, -1.55, 0.2]); th.rotation.z = -0.6; g.add(th)
  return g
}

function drawScreen(sc, k) {
  const { x, c, t } = S.sets.screen
  const w = c.width, h = c.height
  x.fillStyle = '#f7f4fb'; x.fillRect(0, 0, w, h)
  // status bar + header
  x.fillStyle = INK; x.font = '600 34px Poppins'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('11:11', 56, 52)
  x.textAlign = 'right'; x.fillText('▮▮▮ 72%', w - 50, 52)
  x.fillStyle = '#ffffff'; x.fillRect(0, 96, w, 150)
  x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, 246, w, 2)
  x.fillStyle = '#c9b8ff'; x.beginPath(); x.arc(110, 171, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = '700 40px Poppins'; x.textAlign = 'center'; x.fillText((sc.name || '?')[0].toUpperCase(), 110, 173)
  x.textAlign = 'left'; x.font = '700 42px Poppins'; x.fillText(sc.name || '', 180, 160)
  x.font = '400 28px Poppins'; x.fillStyle = '#7a7390'; x.fillText('online', 180, 202)
  // bubbles from the bottom up; the last one pops in at k
  const msgs = sc.msgs || []
  let y = h - 330
  const pad = 30, maxW = w * 0.68
  const lay = msgs.map(([who, text]) => {
    x.font = '500 40px Poppins'
    if (text.startsWith('~')) return { who, text, voice: true, lines: [text.slice(1)], bw: maxW, bh: 120 }
    const words = text.split(' '), lines = []
    let cur = ''
    for (const wd of words) { const t2 = cur ? cur + ' ' + wd : wd; if (x.measureText(t2).width > maxW - pad * 2 && cur) { lines.push(cur); cur = wd } else cur = t2 }
    lines.push(cur)
    const bw = Math.max(...lines.map((l) => x.measureText(l).width)) + pad * 2
    return { who, text, lines, bw, bh: lines.length * 52 + 40 }
  })
  for (let i = lay.length - 1; i >= 0; i--) {
    const b = lay[i]
    const last = i === lay.length - 1
    const s = last ? easeBack(k) : 1
    if (s <= 0.01) { continue }
    y -= b.bh
    const me = b.who === 'me'
    const bx = me ? w - 40 - b.bw : 40
    x.save()
    x.translate(bx + (me ? b.bw : 0), y + b.bh)
    x.scale(s, s)
    x.translate(-(bx + (me ? b.bw : 0)), -(y + b.bh))
    x.fillStyle = me ? '#6c4cf0' : '#e6e1ef'
    x.beginPath(); x.roundRect(bx, y, b.bw, b.bh, 40); x.fill()
    x.fillStyle = me ? '#ffffff' : INK
    if (b.voice) {
      x.beginPath(); x.moveTo(bx + 44, y + 36); x.lineTo(bx + 44, y + 84); x.lineTo(bx + 84, y + 60); x.fill()
      const r = rng(4)
      for (let q = 0; q < 26; q++) { const hh = 10 + r() * 50; x.fillRect(bx + 110 + q * 12, y + 60 - hh / 2, 6, hh) }
      x.font = '600 34px Poppins'; x.textAlign = 'right'; x.fillText(b.lines[0], bx + b.bw - 30, y + 60)
    } else {
      x.font = '500 40px Poppins'; x.textAlign = 'left'
      b.lines.forEach((l, j) => x.fillText(l, bx + pad, y + 46 + j * 52))
    }
    x.restore()
    y -= 22
  }
  t.needsUpdate = true
}

// ── effects ──────────────────────────────────────────────────────────────
function planet(kind, size) {
  const g = new THREE.Group()
  const isSun = kind === 'sun'
  const mat = isSun
    ? basic({ map: planetTex(kind) })
    : new THREE.MeshStandardMaterial({ map: planetTex(kind), roughness: 0.85, emissive: kind === 'venus' ? '#5a3a20' : '#000', emissiveIntensity: 0.4 })
  const ball = new THREE.Mesh(G.sph, mat); ball.scale.setScalar(size); g.add(ball)
  const col = { venus: '#ffc9a0', mars: '#ff6a4a', moon: '#e6e3ff', mercury: '#c8b8a8', earth: '#7fb4ff', sun: '#ffd24a' }[kind]
  const halo = sprite(S.glowTex, size * (isSun ? 5 : 3.4), { color: col, blending: THREE.AdditiveBlending, opacity: isSun ? 0.85 : 0.55 }); g.add(halo)
  const ch = PLANET_CH[kind]
  if (ch) { const lab = sprite(glyphTex(ch, '#fff3c4'), size * 1.1); lab.position.set(0, size * 1.55, 0); g.add(lab) }
  g.userData.ball = ball
  return g
}

const PLANET_SPOTS = [[0.95, 4.05, -2.2, 0.62], [-1.0, 4.4, -2.8, 0.55], [0.1, 5.0, -3.6, 0.5]]

function buildFx(sc, scene, cast, i) {
  const fx = []
  const glyphOver = (ch, who) => {
    const c = cast.find((c) => c.id === who) || cast[0]
    const sp = sprite(glyphTex(ch), 1.05)
    if (c) { sp.position.set(0, HEAD_Y + 0.85, 0); c.body.add(sp) } else { sp.position.set(0, 3.2, 0); scene.add(sp) }
    fx.push({ kind: 'glyph', sp })
  }
  let pi = 0
  for (const f of sc.fx || []) {
    const [name, argRaw] = f.split(':')
    const [arg, who] = (argRaw || '').split('@')
    const host = cast.find((c) => c.id === (who || sc.focus)) || cast[0]
    if (name === 'glyph') glyphOver(SIGN_CH[arg] || arg, who || (cast.find((c) => c.id === sc.focus) ? sc.focus : cast[0]?.id))
    else if (name === 'planet') {
      const [x, y, z, s] = PLANET_SPOTS[pi++ % PLANET_SPOTS.length]
      const p = planet(arg, s * (S.sets.space.visible || sc.set === 'space' ? 1 : 0.8)); p.position.set(x, y, z); scene.add(p)
      fx.push({ kind: 'planet', g: p })
    } else if (name === 'hearts' || name === 'sparks' || name === 'sweat' || name === 'tears' || name === 'zzz') {
      const parts = []
      const n = { hearts: 9, sparks: 18, sweat: 4, tears: 6, zzz: 3 }[name]
      for (let k = 0; k < n; k++) {
        let sp
        if (name === 'hearts') sp = sprite(S.heartTex, 0.42)
        else if (name === 'sparks') sp = sprite(S.sparkTex, 0.3, { blending: THREE.AdditiveBlending })
        else if (name === 'zzz') sp = sprite(S.zTex, 0.55)
        else sp = sprite(S.dropTex, name === 'tears' ? 0.16 : 0.2)
        ;(host ? host.body : scene).add(sp)
        parts.push({ sp, ph: k / n, a: (k * 2.4) % (Math.PI * 2), r: 0.4 + ((k * 37) % 10) / 14 })
      }
      fx.push({ kind: name, parts })
    } else if (name === 'question' || name === 'exclaim') {
      const sp = sprite(name === 'question' ? S.qTex : S.exTex, 0.9)
      const c = cast.find((c) => c.id === sc.focus) || cast[cast.length - 1]
      if (c) c.body.add(sp); else scene.add(sp)
      sp.position.set(0.5, HEAD_Y + 0.9, 0)
      fx.push({ kind: 'pop', sp })
      if (name === 'question' && cast.length > 1) {
        const s2 = sprite(S.qTex, 0.7); s2.position.set(-0.5, HEAD_Y + 0.8, 0); cast[0].body.add(s2); fx.push({ kind: 'pop', sp: s2, delay: 0.25 })
      }
    } else if (name === 'wheel' || name === 'house7') {
      if (name === 'wheel') {
        const wh = new THREE.Mesh(new THREE.CircleGeometry(3.4, 96), basic({ map: S.wheelTex, transparent: true }))
        wh.rotation.x = -Math.PI / 2; wh.position.y = -0.02; scene.add(wh)
        const gl = sprite(S.glowTex, 9, { color: '#7c5cff', blending: THREE.AdditiveBlending, opacity: 0.3 }); gl.position.y = -0.1; scene.add(gl)
        fx.push({ kind: 'wheel', m: wh })
      } else {
        // the 7th house wedge, lit up
        const wedge = new THREE.Mesh(new THREE.RingGeometry(1.7, 3.4, 32, 1, 0, Math.PI / 6), basic({ color: '#ffd54a', transparent: true, opacity: 0.45, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
        wedge.rotation.x = -Math.PI / 2; wedge.position.y = 0.0; scene.add(wedge)
        fx.push({ kind: 'house7', m: wedge })
      }
    } else if (name === 'retro') {
      // a loop-the-loop path: the apparent backwards wiggle
      const pts = []
      for (let k = 0; k <= 200; k++) { const u = k / 200; const a = u * Math.PI * 2; pts.push(new THREE.Vector3(-3 + u * 6 - Math.sin(a) * 0.9, 2.2 + Math.cos(a) * 0.55 - 0.55 + Math.sin(u * Math.PI) * 0.4, -1.5)) }
      const curve = new THREE.CatmullRomCurve3(pts)
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.05, 8), basic({ color: '#7fe8ff', transparent: true, opacity: 0.9 }))
      scene.add(tube)
      const dot = planet('mercury', 0.32); scene.add(dot)
      const arrow = sprite(textTex('↺', { size: 300, fill: '#7fe8ff' }), 1.2); arrow.position.set(0, 3.4, -1.5); scene.add(arrow)
      fx.push({ kind: 'retro', tube, curve, dot })
    } else if (name === 'orbits') {
      const sun = planet('sun', 0.7); scene.add(sun)
      const rings = [1.8, 3.0].map((r) => { const m = new THREE.Mesh(new THREE.RingGeometry(r - 0.02, r + 0.02, 128), basic({ color: '#ffffff', transparent: true, opacity: 0.35, side: THREE.DoubleSide })); m.rotation.x = -Math.PI / 2; scene.add(m); return m })
      const me = planet('mercury', 0.28), ea = planet('earth', 0.38); scene.add(me, ea)
      fx.push({ kind: 'orbits', me, ea, rings })
    } else if (name === 'rise') {
      const world = new THREE.Mesh(new THREE.SphereGeometry(30, 96, 48), new THREE.MeshStandardMaterial({ color: '#5a46a8', roughness: 0.9, emissive: '#2a1c66', emissiveIntensity: 0.8 }))
      world.position.set(0, -29.4, -12); scene.add(world)
      const atm = sprite(S.glowTex, 26, { color: '#ff9f6a', blending: THREE.AdditiveBlending, opacity: 0.45 }); atm.position.set(0, 0.7, -30); scene.add(atm)
      const sg = sprite(glyphTex(SIGN_CH[arg]), 3.2); sg.position.set(0, 0, -12); scene.add(sg)
      const sun = planet('sun', 0.9); sun.position.set(-3.5, 0, -16); scene.add(sun)
      fx.push({ kind: 'rise', sg, sun })
    } else if (name === 'clock') {
      fx.push({ kind: 'clock' })
    } else if (name === 'rain') {
      fx.push({ kind: 'rain' })
    } else if (name === 'slowmo') {
      fx.push({ kind: 'slowmo' })
    } else if (name === 'moonrun') {
      const m = planet('moon', 0.45); scene.add(m)
      fx.push({ kind: 'moonrun', m })
    } else if (name === 'link') {
      fx.push({ kind: 'link', ...linkFx(scene, cast) })
    } else if (name === 'pull') {
      fx.push({ kind: 'pull' })
    } else if (name === 'organ') {
      // a big glowing organ, centred, for macro cutaways
      const g = new THREE.Group(); g.position.set(0, 1.7, 0); scene.add(g)
      const mode = (arg || 'brain').split('-')
      let m
      if (mode[0] === 'heart') { m = heartMesh(); m.scale.setScalar(2.2) } else { m = brainMesh(); m.scale.setScalar(3.2) }
      g.add(m)
      const halo = sprite(S.glowTex, 5.5, { color: mode[0] === 'heart' ? '#ff3f5e' : '#ff7fc0', blending: THREE.AdditiveBlending, opacity: 0.45 }); halo.position.z = -0.6; g.add(halo)
      const parts = []
      for (let k = 0; k < 26; k++) { const sp = sprite(S.sparkTex, 0.22, { blending: THREE.AdditiveBlending, color: mode[0] === 'heart' ? '#ffd0d8' : '#fff2a8' }); g.add(sp); parts.push({ sp, ph: k / 26, a: k * 2.39 }) }
      fx.push({ kind: 'organ', g, m, halo, parts, type: mode[0], dim: mode[1] === 'dim' })
    } else if (name === 'big') {
      const p = planet(arg, 1.0); p.position.set(0, 1.85, 0); scene.add(p)
      fx.push({ kind: 'planet', g: p })
    }
  }
  return fx
}
function linkFx(scene, cast) {
  const g = new THREE.Group(); scene.add(g)
  const tube = new THREE.Mesh(new THREE.BufferGeometry(), basic({ color: GOLD, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }))
  g.add(tube)
  const sparks = []
  for (let k = 0; k < 14; k++) { const s = sprite(S.sparkTex, 0.28, { blending: THREE.AdditiveBlending }); g.add(s); sparks.push(s) }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.04, 8, 96), basic({ color: GOLD, transparent: true, blending: THREE.AdditiveBlending }))
  ring.rotation.x = Math.PI / 2; ring.position.y = 1.3; ring.visible = cast.length < 2; g.add(ring)
  return { g, tube, sparks, ring }
}

// ── scene assembly ───────────────────────────────────────────────────────
function placeChar(c, setG, entry, cast) {
  const marks = setG.userData.marks
  const m = marks[entry.mark] || marks.center || [0, 0, 0]
  c.root.position.set(m[0], 0, m[1])
  c.baseYaw = m[2] || 0
  if (m[3] != null) c.seat = m[3]
}
function buildScene(sc, i) {
  const scene = new THREE.Group(); S.scene.add(scene); scene.visible = false
  const setG = S.sets[sc.set] || S.sets.space
  const cast = (sc.cast || []).map((e) => {
    const def = S.script.cast[e.who]
    const c = makeChar(def, e.who)
    c.entry = e
    placeChar(c, setG, e)
    if (e.xray) xray(c, e.xray)
    if (e.blanket) {
      const b = mesh(G.cap(0.62, 0.55), clay('#ffb3c8', { roughness: 0.9 }), [0, 1.05, 0.05], [1.05, 1, 0.95]); c.body.add(b)
    }
    if (setG.userData.space) c.root.userData.shadow.visible = false
    scene.add(c.root)
    return c
  })
  // facing: toward a named cast member (three-quarters to camera) or the camera
  for (const c of cast) {
    const look = c.entry.look
    const other = cast.find((o) => o.id === look)
    let yaw = c.baseYaw
    if (other) {
      const dx = other.root.position.x - c.root.position.x, dz = other.root.position.z - c.root.position.z
      const a = Math.atan2(dx, dz)
      yaw = clamp(a, -1.05, 1.05) * 0.85
    }
    c.root.rotation.y = yaw
    if (c.seat != null && c.entry.pose === 'sit') c.body.position.y = 0
  }
  if (sc.set === 'phone') {
    const you = S.script.cast.you || Object.values(S.script.cast)[0]
    const hand = phoneHand(you.skin); scene.add(hand)
  }
  const fx = buildFx(sc, scene, cast, i)
  return { scene, cast, fx, setG }
}

// camera target for a scene
function focusPoint(sc, built) {
  const { cast } = built
  const f = sc.focus
  const sitDrop = (c) => (c.entry.pose === 'sit' ? -0.3 : POSES[c.entry.pose]?.float ? 0.35 : 0)
  const headOf = (c) => new THREE.Vector3(c.root.position.x, HEAD_Y + sitDrop(c), c.root.position.z)
  if (f === 'both' && cast.length > 1) {
    const a = headOf(cast[0]), b = headOf(cast[1])
    const mid = a.clone().add(b).multiplyScalar(0.5); mid.y -= 0.55
    return { p: mid, d: Math.min(11, Math.max(6.2, (a.distanceTo(b) + 1.7) / 0.42)) }
  }
  if (f === 'line') return { p: new THREE.Vector3(0, 1.5, 0.3), d: 14 }
  if (f === 'center') return sc.set === 'studio' ? { p: new THREE.Vector3(0, 1.75, 0), d: 7.2 } : { p: new THREE.Vector3(0, sc.set === 'space' ? 1.6 : 1, 0), d: 8 }
  if (f === 'clock') return { p: S.sets.clock.g.position.clone(), d: 3.2 }
  if (f === 'horizon') return { p: new THREE.Vector3(0, 1.8, -8), d: 8 }
  const c = cast.find((c) => c.id === f) || cast[0]
  if (c) { const h = headOf(c); h.y -= 0.45; return { p: h, d: 5.4, head: headOf(c) } }
  return { p: new THREE.Vector3(0, 1.4, 0), d: 7 }
}

const SHOTS = {
  wide: (u) => ({ d: 1.5, az: lerp(-0.18, 0.05, u), el: 0.22 }),
  medium: (u) => ({ d: 1.0, az: lerp(0.18, 0.05, u), el: 0.1 }),
  close: (u) => ({ d: lerp(0.5, 0.44, u), az: 0.12, el: 0.06, head: true }),
  push: (u) => ({ d: lerp(1.35, 0.62, ease(u)), az: lerp(0.25, 0.08, u), el: lerp(0.18, 0.08, u) }),
  pull: (u) => ({ d: lerp(0.6, 1.45, ease(u)), az: lerp(-0.1, 0.12, u), el: lerp(0.06, 0.2, u) }),
  orbit: (u) => ({ d: 1.05, az: lerp(-0.6, 0.55, u), el: 0.12 }),
  low: (u) => ({ d: lerp(1.0, 0.85, u), az: 0.15, el: -0.22 }),
  top: (u) => ({ d: lerp(1.5, 1.25, u), az: lerp(-0.2, 0.2, u), el: 0.95 }),
  snap: (u, l) => ({ d: lerp(1.05, 0.55, easeOut(l / 0.28)), az: 0.12, el: 0.08, shake: Math.max(0, 1 - (l - 0.25) * 3), head: true }),
  slow: (u) => ({ d: lerp(1.0, 0.82, u), az: lerp(0.3, 0.12, u), el: 0.1 }),
}

// ── setup and frames ─────────────────────────────────────────────────────
window.setup = async ({ script, timeline, fonts, glyphs }) => {
  for (const [family, src, style, weight] of fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight }); await f.load(); document.fonts.add(f)
  }
  GLYPHS = glyphs
  const out = document.getElementById('c'); out.width = W; out.height = H
  const gl = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1); renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.05, 300)
  S = { script, timeline, shots: timeline.shots, renderer, scene, camera, out, o: out.getContext('2d') }
  geos()
  S.glowTex = radial(256, [[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,255,255,0.45)'], [1, 'rgba(255,255,255,0)']])
  S.shadowTex = radial(128, [[0, 'rgba(10,6,20,0.5)'], [1, 'rgba(10,6,20,0)']])
  S.sparkTex = (() => { const [c, x] = canvas(128, 128); drawGlyph(x, '✦', 64, 64, 110, '#fff6c8', 14); return tex(c) })()
  S.heartTex = heartTex()
  S.zTex = textTex('Z', { size: 260, fill: '#bfe3ff' })
  S.qTex = textTex('?', { size: 380, fill: PINK })
  S.exTex = textTex('!', { size: 380, fill: GOLD })
  S.dropTex = (() => { const [c, x] = canvas(128, 128); x.fillStyle = '#7fd0ff'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(64, 10); x.bezierCurveTo(110, 70, 100, 118, 64, 118); x.bezierCurveTo(28, 118, 18, 70, 64, 10); x.fill(); x.stroke(); return tex(c) })()
  S.wheelTex = wheelTex()
  S.sets = buildSets()
  S.built = S.shots.map((sh, i) => buildScene(sh.spec, i))
  // studio reflections on the clay, and a lens with depth of field
  const pm = new THREE.PMREMGenerator(renderer)
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environmentIntensity = 0.4
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(1); composer.setSize(W, H)
  composer.addPass(new RenderPass(scene, camera))
  S.bokeh = new BokehPass(scene, camera, { focus: 5, aperture: 0.0015, maxblur: 0.009 })
  composer.addPass(S.bokeh)
  composer.addPass(new OutputPass())
  S.composer = composer
  // rain streaks on the bedroom window
  S.rain = []
  for (let k = 0; k < 40; k++) {
    const d = mesh(G.box, basic({ color: '#bfe3ff', transparent: true, opacity: 0.6 }), [0, 0, 0.1], [0.012, 0.18, 0.01])
    S.sets.roomRain.add(d); S.rain.push({ d, x: (k * 0.37) % 2.2 - 1.1, ph: (k * 0.61) % 1 })
  }
  // overlays
  const [vc, vx] = canvas(W, H)
  const vg = vx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H * 0.5, H * 0.75)
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,6,24,0.55)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  S.vignette = vc
  S.chunks = chunkWords(timeline)
  // warm the shaders for every set so the first frame of each cut is ready
  for (let i = 0; i < S.built.length; i++) { show(i); renderer.compile(scene, camera) }
  return { duration: timeline.duration, frames: Math.ceil(timeline.duration * FPS) }
}

function show(i) {
  const sc = S.shots[i].spec
  for (const k of SETS) S.sets[k].visible = k === sc.set
  S.built.forEach((b, j) => { b.scene.visible = j === i })
}

// caption chunks: up to three words, broken at punctuation
function chunkWords(tl) {
  const out = []
  tl.sentences.forEach((s, si) => {
    let cur = []
    const flush = () => { if (cur.length) out.push({ scene: si, words: cur }); cur = [] }
    s.words.forEach((w) => {
      cur.push(w)
      const chars = cur.map((x) => x.w).join(' ').length
      if (cur.length >= 3 || /[.,?!…:]$/.test(w.w) || chars > 13) flush()
    })
    flush()
  })
  for (const c of out) c.s = c.words[0].s
  out.forEach((c, i) => {
    const next = out[i + 1]
    const sEnd = tl.sentences[c.scene].end
    c.e = next && next.scene === c.scene ? next.s : Math.min(sEnd, c.words[c.words.length - 1].e + 0.6)
  })
  return out
}

function sceneAt(t) {
  const sc = S.shots
  for (let i = 0; i < sc.length; i++) if (t < sc[i].end) return i
  return sc.length - 1
}

window.frame = (t) => {
  const { camera, renderer, timeline } = S
  const i = sceneAt(t)
  const ts = S.shots[i]
  const sc = ts.spec
  const b = S.built[i]
  show(i)
  const local = t - ts.start
  const u = clamp(local / (ts.end - ts.start))
  const speaking = clamp((t - ts.at) / Math.max(0.1, ts.voiceEnd - ts.at))
  const slow = (b.fx.some((f) => f.kind === 'slowmo')) ? 0.35 : 1
  for (const [ci, c] of b.cast.entries()) applyPose(c, c.entry.pose, c.entry.expr, local, ci * 1.9 + i, slow)
  // camera
  let pos, look
  if (sc.set === 'phone') {
    drawScreen(sc.screen || {}, clamp((local - 0.25) / 0.3))
    const k = ease(u)
    pos = new THREE.Vector3(Math.sin(local * 0.7) * 0.08, 0.1 + Math.sin(local * 0.9) * 0.05, lerp(7.6, 6.9, k))
    look = new THREE.Vector3(0, -0.15, 0)
    S.sets.phoneObj.rotation.set(-0.05 + Math.sin(local * 1.1) * 0.02, Math.sin(local * 0.8) * 0.05, 0.03)
    camera.fov = 42
  } else {
    const F = focusPoint(sc, b)
    const shot = (SHOTS[sc.shot] || SHOTS.medium)(u, local)
    let target = F.p.clone()
    let d = F.d * shot.d
    if (shot.head && F.head) { target = F.head.clone(); target.y -= 0.25; d = Math.max(d, 3.0) }
    // punch-in on every cut; impact shots slam in and shake
    d *= 1 + 0.05 * (1 - easeOut(local / 0.22))
    if (sc.impact) { d *= 1.12 - 0.2 * easeOut(local / 0.16); shot.shake = Math.max(shot.shake || 0, 1.6 * Math.max(0, 1 - local / 0.55)) }
    const az = shot.az, el = shot.el
    pos = target.clone().add(new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(d))
    if (sc.shot === 'top') pos.y = Math.max(pos.y, target.y + 2)
    if (shot.shake) { pos.x += Math.sin(local * 60) * 0.04 * shot.shake; pos.y += Math.cos(local * 53) * 0.04 * shot.shake }
    pos.x += Math.sin(local * 0.6 + i) * 0.05; pos.y += Math.sin(local * 0.8 + i) * 0.04
    look = target
    camera.fov = sc.shot === 'wide' ? 46 : 40
  }
  camera.position.copy(pos); camera.up.set(0, 1, 0); camera.lookAt(look)
  camera.updateProjectionMatrix()
  animateFx(b, sc, local, speaking, slow)
  if (S.sets.labScan) { S.sets.labScan.position.y = 0.3 + ((local * 0.9) % 1) * 2.6; S.sets.labRing.scale.setScalar(1 + (local % 1.2) * 0.8); S.sets.labRing.material.opacity = 0.8 * (1 - (local % 1.2) / 1.2) }
  // focus on the subject; x-ray glass and the phone stay sharp
  const u2 = S.bokeh.uniforms
  u2.focus.value = pos.distanceTo(look)
  const tight = ['close', 'snap'].includes(sc.shot) || sc.impact
  u2.aperture.value = sc.set === 'lab' ? 0 : sc.set === 'phone' ? 0.0006 : tight ? 0.0028 : 0.0016
  u2.maxblur.value = sc.set === 'phone' ? 0.004 : 0.01
  S.composer.render()

  const o = S.o
  o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'
  o.drawImage(renderer.domElement, 0, 0, W, H)
  o.drawImage(S.vignette, 0, 0)
  if (sc.impact) { const fl = 1 - local / 0.12; if (fl > 0) { o.fillStyle = `rgba(255,248,230,${0.55 * fl})`; o.fillRect(0, 0, W, H) } }
  if (slow < 1) { o.fillStyle = 'rgba(0,0,0,0.92)'; o.fillRect(0, 0, W, 120); o.fillRect(0, H - 120, W, 120) }
  drawWordmark(o)
  if (sc.tag) drawTag(o, sc.tag, local)
  drawCaptions(o, t)
  drawOutro(o, t)
  return S.out.toDataURL('image/jpeg', 0.9)
}

function animateFx(b, sc, l, speaking, slow) {
  for (const f of b.fx) {
    if (f.kind === 'glyph') { const k = easeBack(clamp((l - 0.15) / 0.35)); f.sp.scale.setScalar(1.05 * k); f.sp.position.y = HEAD_Y + 0.85 + Math.sin(l * 2.5) * 0.06; f.sp.material.rotation = Math.sin(l * 2) * 0.08 }
    else if (f.kind === 'planet') { f.g.userData.ball.rotation.y = l * 0.25; f.g.position.y += Math.sin(l * 1.2) * 0.002; const k = easeBack(clamp((l - 0.1) / 0.5)); f.g.scale.setScalar(k) }
    else if (f.kind === 'hearts') f.parts.forEach((p) => { const q = (l * 0.45 + p.ph) % 1; p.sp.position.set(Math.cos(p.a) * p.r * 1.3, HEAD_Y - 0.4 + q * 1.8, Math.sin(p.a) * p.r * 0.6 + 0.3); p.sp.material.opacity = Math.sin(q * Math.PI); p.sp.scale.setScalar(0.3 + q * 0.25) })
    else if (f.kind === 'sparks') f.parts.forEach((p) => { const q = (l * 0.9 + p.ph) % 1; const r = 0.3 + q * 1.2; p.sp.position.set(Math.cos(p.a) * r, HEAD_Y + 0.1 + Math.sin(p.a) * r * 0.8, 0.4); p.sp.material.opacity = 1 - q; p.sp.material.rotation = q * 3 })
    else if (f.kind === 'sweat') f.parts.forEach((p, k) => { const q = (l * 0.7 + p.ph) % 1; const s = k % 2 ? 1 : -1; p.sp.position.set(s * (0.42 + k * 0.03), HEAD_Y + 0.3 - q * 0.5, 0.25); p.sp.material.opacity = 1 - q * 0.6 })
    else if (f.kind === 'tears') f.parts.forEach((p, k) => { const q = (l * 1.2 + p.ph) % 1; const s = k % 2 ? 1 : -1; p.sp.position.set(s * (0.19 + q * 0.12), HEAD_Y - 0.05 - q * 0.7, 0.44); p.sp.material.opacity = 1 - q })
    else if (f.kind === 'zzz') f.parts.forEach((p, k) => { const q = (l * 0.5 + p.ph) % 1; p.sp.position.set(0.4 + q * 0.6, HEAD_Y + 0.4 + q * 1.0, 0.2); p.sp.material.opacity = Math.sin(q * Math.PI); p.sp.scale.setScalar(0.3 + q * 0.4) })
    else if (f.kind === 'pop') { const k = easeBack(clamp((l - 0.2 - (f.delay || 0)) / 0.3)); f.sp.scale.setScalar(0.9 * k); f.sp.material.rotation = Math.sin(l * 6) * 0.12 }
    else if (f.kind === 'wheel') f.m.rotation.z = l * 0.12
    else if (f.kind === 'house7') { f.m.rotation.z = l * 0.12 + Math.PI / 6 * 6; f.m.material.opacity = 0.35 + Math.sin(l * 5) * 0.2 }
    else if (f.kind === 'retro') { const q = (l * 0.22) % 1; f.dot.position.copy(f.curve.getPointAt(q)); f.tube.material.opacity = 0.85 }
    else if (f.kind === 'orbits') {
      const am = l * 1.6, ae = l * 0.65
      f.me.position.set(Math.cos(am) * 1.8, 0, Math.sin(am) * 1.8); f.ea.position.set(Math.cos(ae + 0.6) * 3.0, 0, Math.sin(ae + 0.6) * 3.0)
    } else if (f.kind === 'rise') { const k = ease(l / 3); f.sg.position.y = lerp(-1.4, 3.2, k); f.sun.position.y = lerp(-1, 1.6, k) }
    else if (f.kind === 'clock') {
      const k = easeOut(l / 0.9)
      const mins = lerp(7 * 60 + 5, 7 * 60 + 42, k)
      S.sets.clock.mp.rotation.z = -((mins % 60) / 60) * Math.PI * 2
      S.sets.clock.hp.rotation.z = -((mins / 60) % 12 / 12) * Math.PI * 2
    } else if (f.kind === 'rain') S.rain.forEach((r) => { const q = (l * 1.6 + r.ph) % 1; r.d.position.set(r.x, 0.95 - q * 1.9, 0.1) })
    else if (f.kind === 'moonrun') { const a = l * 1.8; f.m.position.set(Math.cos(a) * 2.9, 0.4, Math.sin(a) * 2.9) }
    else if (f.kind === 'link') {
      const c = b.cast
      const k = ease((l - 0.3) / 1.2)
      if (c.length >= 2) {
        const a = c[0].root.position.clone().add(new THREE.Vector3(0, 1.4 + c[0].body.position.y, 0))
        const z = c[1].root.position.clone().add(new THREE.Vector3(0, 1.4 + c[1].body.position.y, 0))
        const mid = a.clone().lerp(z, 0.5).add(new THREE.Vector3(0, 0.5, 0.3))
        const curve = new THREE.QuadraticBezierCurve3(a, mid, a.clone().lerp(z, Math.max(0.02, k)).lerp(mid, 0))
        const pts = []
        for (let q = 0; q <= 40; q++) pts.push(new THREE.QuadraticBezierCurve3(a, mid, z).getPoint(q / 40 * Math.max(0.02, k)))
        f.tube.geometry.dispose(); f.tube.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.035, 8)
        f.sparks.forEach((s, q) => { const p = new THREE.QuadraticBezierCurve3(a, mid, z).getPoint(((q / f.sparks.length + l * 0.3) % 1) * k); s.position.copy(p); s.material.opacity = k; s.material.rotation = l * 2 + q })
      } else {
        f.ring.scale.setScalar(0.6 + k * 0.4); f.ring.material.opacity = k
        f.ring.position.y = 1.3 + (c[0]?.body.position.y || 0)
        f.sparks.forEach((s, q) => { const a = q / f.sparks.length * Math.PI * 2 + l; s.position.set(Math.cos(a) * 1.6 * (0.6 + k * 0.4), 1.3 + (c[0]?.body.position.y || 0), Math.sin(a) * 1.6 * (0.6 + k * 0.4)); s.material.opacity = k })
      }
    } else if (f.kind === 'pull') {
      const c = b.cast[0]; if (c) c.body.rotation.z = Math.sin(l * 2) * 0.1 - 0.12
    } else if (f.kind === 'organ') {
      const beat = Math.pow(Math.abs(Math.sin(l * (f.type === 'heart' ? 6.5 : 3))), 6)
      f.g.rotation.y = Math.sin(l * 0.6) * 0.35
      f.m.scale.setScalar((f.type === 'heart' ? 2.2 : 3.2) * (1 + beat * (f.type === 'heart' ? 0.14 : 0.03)))
      if (f.type === 'brain') {
        f.m.material.emissiveIntensity = f.dim ? 0.25 : 0.45 + beat * 0.4
        f.m.userData.front(f.dim ? 'dim' : '', ease((l - 0.5) / 1.0))
      } else f.m.material.emissiveIntensity = 0.4 + beat * 0.8
      f.halo.material.opacity = 0.3 + beat * 0.35
      f.parts.forEach((p) => {
        const q = (l * 0.5 + p.ph) % 1
        const a = p.a + q * 2.2
        const r = f.type === 'heart' ? 0.9 : 1.05
        p.sp.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * r * 0.7, 0.75 + Math.sin(a) * 0.2)
        p.sp.material.opacity = Math.sin(q * Math.PI) * (f.dim ? 0.3 : 1)
      })
    }
  }
  for (const c of b.cast) {
    if (!c.xray) continue
    const x = c.xray
    const beat = Math.pow(Math.abs(Math.sin(l * (x.mode === 'heart' ? 7 : 3.6))), 6)
    x.heart.scale.setScalar(0.55 * (1 + beat * (x.mode === 'heart' ? 0.35 : 0.12)))
    x.hg.material.opacity = 0.35 + beat * 0.4
    x.brain.material.emissiveIntensity = x.mode === 'brain' ? 0.5 + Math.sin(l * 9) * 0.25 : 0.3
    if (x.mode === 'dim') x.brain.userData.front('dim', ease((l - 0.6) / 1.2))
    x.bg.material.opacity = x.mode === 'heart' ? 0.2 : 0.5
  }
}

// ── 2D overlays ──────────────────────────────────────────────────────────
function drawWordmark(o) {
  o.save(); o.globalAlpha = 0.8
  o.font = 'italic 500 58px "EB Garamond"'; o.textAlign = 'center'; o.textBaseline = 'middle'
  o.shadowColor = 'rgba(0,0,0,0.6)'; o.shadowBlur = 12
  o.fillStyle = BONE; o.fillText('align', W / 2, 172)
  o.restore()
}
function drawTag(o, tag, l) {
  const k = easeBack(clamp((l - 0.25) / 0.3))
  if (k <= 0) return
  o.save()
  o.translate(W / 2, 300); o.scale(k, k)
  o.font = '700 44px "Space Mono"'
  const text = tag.toUpperCase()
  const w = o.measureText(text).width + 80
  o.fillStyle = 'rgba(18,13,36,0.82)'; o.strokeStyle = GOLD; o.lineWidth = 4
  o.beginPath(); o.roundRect(-w / 2, -44, w, 88, 44); o.fill(); o.stroke()
  o.fillStyle = GOLD; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(text, 0, 3)
  o.restore()
}
function drawCaptions(o, t) {
  const c = S.chunks.find((c) => t >= c.s - 0.04 && t < c.e)
  if (!c) return
  const pop = easeBack(clamp((t - c.s + 0.04) / 0.12))
  o.save()
  const size = 98
  o.font = `700 ${size}px Poppins`
  o.textAlign = 'left'; o.textBaseline = 'middle'; o.lineJoin = 'round'
  const parts = c.words.map((w) => ({ ...w, width: o.measureText(w.w).width }))
  const gap = 26
  // wrap to fit
  const lines = [[]]; let lw = 0
  for (const p of parts) { if (lw + p.width > W - 140 && lines[lines.length - 1].length) { lines.push([]); lw = 0 } lines[lines.length - 1].push(p); lw += p.width + gap }
  const cy = S.shots[sceneAt(t)].spec.set === 'phone' ? H * 0.83 : H * 0.68
  o.translate(W / 2, cy); o.scale(pop, pop); o.translate(-W / 2, -cy)
  lines.forEach((ln, li) => {
    const total = ln.reduce((a, p) => a + p.width, 0) + gap * (ln.length - 1)
    let x = W / 2 - total / 2
    const y = cy + (li - (lines.length - 1) / 2) * (size * 1.12)
    for (const p of ln) {
      const on = t >= p.s - 0.03
      const active = t >= p.s - 0.03 && t < p.e + 0.08
      o.lineWidth = 22; o.strokeStyle = '#0b0716'; o.strokeText(p.w, x, y)
      o.fillStyle = active ? GOLD : p.em ? PINK : '#ffffff'
      o.globalAlpha = on ? 1 : 0.92
      o.fillText(p.w, x, y)
      o.globalAlpha = 1
      x += p.width + gap
    }
  })
  o.restore()
}
function drawOutro(o, t) {
  const tl = S.timeline
  const k = clamp((t - tl.outro) / 0.6)
  if (k <= 0) return
  o.save()
  o.globalAlpha = k * 0.88
  o.fillStyle = INDIGO; o.fillRect(0, 0, W, H)
  o.globalAlpha = k
  const y = H * 0.44
  const g = o.createRadialGradient(W / 2, y, 0, W / 2, y, 520)
  g.addColorStop(0, 'rgba(124,92,255,0.35)'); g.addColorStop(1, 'rgba(124,92,255,0)')
  o.fillStyle = g; o.fillRect(0, y - 520, W, 1040)
  drawGlyph(o, '✦', W / 2, y - 210, 90, GOLD, 30)
  o.fillStyle = BONE; o.textAlign = 'center'; o.textBaseline = 'middle'
  o.font = 'italic 500 190px "EB Garamond"'; o.fillText('align', W / 2, y)
  o.font = '700 40px "Space Mono"'; o.fillStyle = GOLD
  o.fillText((S.script.end || 'read the sky before the face').toUpperCase(), W / 2, y + 150)
  o.restore()
}
