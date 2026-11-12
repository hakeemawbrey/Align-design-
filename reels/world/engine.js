// Align World: Roblox-style story reels, rendered frame by frame in Chromium.
//
// Blocky R6-style avatars with drawn decal faces, small toy towns lit like a
// game engine at golden hour, an Align card that stays face down until it's
// mutual, and one bold word on screen at a time. Every frame is a pure
// function of its time, so frames can be rendered in any order.
//
// window.setup(script, { fonts, voice }) → { duration, frames }
// window.frame(t) → JPEG data URL of the frame at t seconds

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const W = 1080
const H = 1920
const FPS = 30

// ---------------------------------------------------------------- helpers
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, k) => a + (b - a) * k
const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const easeInOut = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
const back = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const V = (x, y, z) => new THREE.Vector3(x, y, z)

function canvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')]
}
function tex(c, srgb = true) {
  const t = new THREE.CanvasTexture(c)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
function starPath(ctx, cx, cy, ro, ri, n = 5, rot = -Math.PI / 2) {
  ctx.beginPath()
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro
    const a = rot + (i * Math.PI) / n
    ctx[i ? 'lineTo' : 'moveTo'](cx + r * Math.cos(a), cy + r * Math.sin(a))
  }
  ctx.closePath()
}
function starShape(ro, ri, n = 5) {
  const s = new THREE.Shape()
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro
    const a = Math.PI / 2 + (i * Math.PI) / n
    s[i ? 'lineTo' : 'moveTo'](r * Math.cos(a), r * Math.sin(a))
  }
  s.closePath()
  return s
}

// ---------------------------------------------------------------- renderer
const glCanvas = document.getElementById('c')
const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1)
renderer.setSize(W, H, false)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
renderer.outputColorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 900)
const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
scene.environmentIntensity = 0.35

const composer = new EffectComposer(renderer)
composer.setPixelRatio(1)
composer.setSize(W, H)
composer.addPass(new RenderPass(scene, camera))
const bokeh = new BokehPass(scene, camera, { focus: 10, aperture: 0.0006, maxblur: 0.008 })
composer.addPass(bokeh)
const bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.28, 0.5, 0.9)
composer.addPass(bloom)
composer.addPass(new OutputPass())

// The finished frame: the 3D render, a soft vignette, then the caption.
const [out, octx] = canvas(W, H)

// ---------------------------------------------------------------- sky
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
  uniforms: {
    top: { value: new THREE.Color() },
    mid: { value: new THREE.Color() },
    bottom: { value: new THREE.Color() },
    sunDir: { value: V(0, 0.2, -1).normalize() },
    sunCol: { value: new THREE.Color('#ffd9a0') },
    sunSize: { value: 0.02 },
    stars: { value: 0 },
    time: { value: 0 },
  },
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform vec3 top, mid, bottom, sunDir, sunCol; uniform float sunSize, stars, time; varying vec3 vDir;
    float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719))) * 43758.5453); }
    void main(){
      float y = vDir.y;
      vec3 c = y > 0.0 ? mix(mid, top, pow(clamp(y*1.6,0.0,1.0), 0.7)) : mix(mid, bottom, clamp(-y*4.0,0.0,1.0));
      float d = max(dot(vDir, normalize(sunDir)), 0.0);
      c += sunCol * (pow(d, 600.0/ (sunSize*50.0)) * 1.4 + pow(d, 8.0) * 0.35 + pow(d, 2.0)*0.08);
      if (stars > 0.0) {
        vec3 p = floor(vDir * 260.0);
        float s = h(p);
        float tw = 0.6 + 0.4 * sin(time * 2.0 + s * 40.0);
        c += vec3(1.0, 0.95, 0.85) * step(0.9965, s) * stars * tw * smoothstep(-0.05, 0.3, y) * 1.6;
      }
      gl_FragColor = vec4(c, 1.0);
    }`,
})
const sky = new THREE.Mesh(new THREE.SphereGeometry(600, 48, 24), skyMat)
scene.add(sky)

const hemi = new THREE.HemisphereLight('#bcd8ff', '#7a5a3a', 0.9)
scene.add(hemi)
const sun = new THREE.DirectionalLight('#ffe2b8', 2.6)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
sun.shadow.bias = -0.0004
sun.shadow.normalBias = 0.03
sun.shadow.radius = 4
scene.add(sun, sun.target)
const fill = new THREE.DirectionalLight('#9fb8ff', 0.5)
scene.add(fill, fill.target)

const LIGHTING = {
  golden: { top: '#3f86d9', mid: '#ffc78a', bottom: '#d9a066', sunCol: '#ffcf8a', sun: [-0.6, 0.32, -0.75], sunI: 3.0, sunC: '#ffd7a6', hemi: ['#a9cdfa', '#8a6440', 1.0], fill: ['#8fb4ff', 0.6], fog: ['#f3c595', 70, 260], stars: 0, exposure: 1.0, env: 0.35 },
  day: { top: '#3d8be0', mid: '#bfe0ff', bottom: '#cfe6f7', sunCol: '#fff1d0', sun: [-0.5, 0.75, -0.4], sunI: 2.6, sunC: '#fff2dc', hemi: ['#cfe5ff', '#7f8a5a', 1.1], fill: ['#a8c6ff', 0.5], fog: ['#cfe6fa', 90, 320], stars: 0, exposure: 1.0, env: 0.4 },
  gloomy: { top: '#55607a', mid: '#9aa3b4', bottom: '#8d93a0', sunCol: '#d8dde8', sun: [-0.3, 0.8, 0.2], sunI: 1.1, sunC: '#d9e0ec', hemi: ['#b9c4d8', '#5d6070', 1.15], fill: ['#9fb0d0', 0.35], fog: ['#9aa3b4', 40, 200], stars: 0, exposure: 0.95, env: 0.3 },
  dusk: { top: '#1d2559', mid: '#c46b8a', bottom: '#5a3a5a', sunCol: '#ff9a7a', sun: [0.7, 0.08, -0.7], sunI: 1.4, sunC: '#ffb093', hemi: ['#7d86d8', '#3a2a40', 0.9], fill: ['#7f8cff', 0.6], fog: ['#7a5a86', 50, 240], stars: 0.35, exposure: 1.05, env: 0.3 },
  night: { top: '#050a24', mid: '#1b2a63', bottom: '#0e1530', sunCol: '#9db8ff', sun: [0.5, 0.6, -0.6], sunI: 0.9, sunC: '#a9bfff', hemi: ['#4a5fae', '#141020', 0.7], fill: ['#5a6cff', 0.35], fog: ['#121c46', 50, 260], stars: 1, exposure: 1.1, env: 0.22 },
  room: { top: '#0b1030', mid: '#1c2660', bottom: '#120e1e', sunCol: '#9db8ff', sun: [0.4, 0.5, 0.8], sunI: 0.5, sunC: '#a9bfff', hemi: ['#ffd6a8', '#3a2a24', 0.55], fill: ['#7a8cff', 0.25], fog: ['#1a1428', 60, 200], stars: 1, exposure: 1.05, env: 0.3 },
}
function light(name, center = V(0, 0, 0)) {
  const L = LIGHTING[name]
  skyMat.uniforms.top.value.set(L.top)
  skyMat.uniforms.mid.value.set(L.mid)
  skyMat.uniforms.bottom.value.set(L.bottom)
  skyMat.uniforms.sunCol.value.set(L.sunCol)
  skyMat.uniforms.stars.value = L.stars
  const d = V(...L.sun).normalize()
  skyMat.uniforms.sunDir.value.copy(d)
  sun.color.set(L.sunC)
  sun.intensity = L.sunI
  sun.position.copy(center).addScaledVector(d, 60)
  sun.target.position.copy(center)
  const cam = sun.shadow.camera
  cam.left = cam.bottom = -22
  cam.right = cam.top = 22
  cam.near = 1
  cam.far = 140
  cam.updateProjectionMatrix()
  hemi.color.set(L.hemi[0])
  hemi.groundColor.set(L.hemi[1])
  hemi.intensity = L.hemi[2]
  fill.color.set(L.fill[0])
  fill.intensity = L.fill[1]
  fill.position.copy(center).add(V(8, 6, 14))
  fill.target.position.copy(center)
  scene.fog = new THREE.Fog(L.fog[0], L.fog[1], L.fog[2])
  renderer.toneMappingExposure = L.exposure
  scene.environmentIntensity = L.env
  sky.position.copy(camera.position)
}

// ---------------------------------------------------------------- materials
const matCache = new Map()
function mat(color, o = {}) {
  const key = color + JSON.stringify(o)
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0, ...o }))
  return matCache.get(key)
}
const boxCache = new Map()
function rbox(w, h, d, r = 0.08) {
  const key = [w, h, d, r].join()
  if (!boxCache.has(key)) boxCache.set(key, new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001)))
  return boxCache.get(key)
}
function mesh(geo, m, shadow = true) {
  const o = new THREE.Mesh(geo, m)
  o.castShadow = shadow
  o.receiveShadow = true
  return o
}
function box(w, h, d, color, x = 0, y = 0, z = 0, r = 0.06, o = {}) {
  const m = mesh(rbox(w, h, d, r), typeof color === 'string' ? mat(color, o) : color)
  m.position.set(x, y, z)
  return m
}

// A studded-plastic look for big flat surfaces: soft grid lines, like a
// building game's baseplate.
function studTex(base, line, size = 512, cells = 8) {
  const [c, x] = canvas(size, size)
  x.fillStyle = base
  x.fillRect(0, 0, size, size)
  const s = size / cells
  for (let i = 0; i < 900; i++) {
    x.fillStyle = `rgba(${hash(i) > 0.5 ? '255,255,255' : '0,0,0'},${0.025 * hash(i + 3)})`
    x.fillRect(hash(i + 1) * size, hash(i + 2) * size, 2 + hash(i + 4) * 8, 2 + hash(i + 5) * 8)
  }
  x.strokeStyle = line
  x.lineWidth = 2
  for (let i = 0; i <= cells; i++) {
    x.beginPath(); x.moveTo(i * s, 0); x.lineTo(i * s, size); x.stroke()
    x.beginPath(); x.moveTo(0, i * s); x.lineTo(size, i * s); x.stroke()
  }
  const t = tex(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

// ---------------------------------------------------------------- faces
// Decal faces, drawn like a building game's classic faces: black oval eyes
// with a white shine, simple mouths, and a few extras (brows, blush, tears).
const FACE_W = 640
const FACE_H = 512
function drawFace(x, expr) {
  x.clearRect(0, 0, FACE_W, FACE_H)
  x.save(); x.translate(FACE_W / 2, FACE_H * 0.5); x.scale(1.28, 1.28); x.translate(-FACE_W / 2, -FACE_H * 0.5)
  x.lineCap = 'round'
  x.lineJoin = 'round'
  const ex = [FACE_W * 0.37, FACE_W * 0.63]
  const ey = FACE_H * 0.43
  const ink = '#1b1414'
  const eye = (cx, cy, rx = 26, ry = 40, look = 0) => {
    x.fillStyle = ink
    x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'
    x.beginPath(); x.ellipse(cx - rx * 0.32 + look, cy - ry * 0.38, rx * 0.36, ry * 0.26, -0.3, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.arc(cx + rx * 0.28 + look, cy + ry * 0.32, rx * 0.13, 0, Math.PI * 2); x.fill()
  }
  const closed = (cx, cy, up = true) => {
    x.strokeStyle = ink; x.lineWidth = 15
    x.beginPath()
    if (up) x.arc(cx, cy + 14, 30, Math.PI * 1.15, Math.PI * 1.85)
    else x.arc(cx, cy - 22, 30, Math.PI * 0.15, Math.PI * 0.85)
    x.stroke()
  }
  const brow = (cx, cy, tilt) => {
    x.strokeStyle = ink; x.lineWidth = 13
    x.beginPath(); x.moveTo(cx - 32, cy + tilt); x.lineTo(cx + 32, cy - tilt); x.stroke()
  }
  const blush = (a = 0.55) => {
    x.fillStyle = `rgba(255,110,140,${a})`
    for (const cx of [FACE_W * 0.25, FACE_W * 0.75]) { x.beginPath(); x.ellipse(cx, FACE_H * 0.6, 44, 22, 0, 0, Math.PI * 2); x.fill() }
  }
  const smileArc = (w = 70, y = FACE_H * 0.6, depth = 0.9) => {
    x.strokeStyle = ink; x.lineWidth = 14
    x.beginPath(); x.arc(FACE_W / 2, y - w * 0.4, w, Math.PI * (0.5 - depth / 2), Math.PI * (0.5 + depth / 2)); x.stroke()
  }
  const openMouth = (w, h, y, tongue = true) => {
    x.fillStyle = ink
    x.beginPath(); x.moveTo(FACE_W / 2 - w, y); x.quadraticCurveTo(FACE_W / 2, y + h * 2, FACE_W / 2 + w, y); x.closePath(); x.fill()
    x.fillStyle = '#fff'
    x.fillRect(FACE_W / 2 - w * 0.7, y + 2, w * 1.4, h * 0.22)
    if (tongue) { x.fillStyle = '#ff6f7d'; x.beginPath(); x.ellipse(FACE_W / 2, y + h * 0.82, w * 0.42, h * 0.3, 0, 0, Math.PI * 2); x.fill() }
  }
  const tear = (cx, cy) => {
    x.fillStyle = '#7fd0ff'
    x.beginPath(); x.moveTo(cx, cy); x.quadraticCurveTo(cx + 20, cy + 40, cx, cy + 52); x.quadraticCurveTo(cx - 20, cy + 40, cx, cy); x.fill()
  }
  const sweat = () => {
    x.fillStyle = '#8fd8ff'
    const cx = FACE_W * 0.8, cy = FACE_H * 0.22
    x.beginPath(); x.moveTo(cx, cy); x.quadraticCurveTo(cx + 26, cy + 50, cx, cy + 62); x.quadraticCurveTo(cx - 26, cy + 50, cx, cy); x.fill()
  }
  switch (expr) {
    case 'smile': eye(ex[0], ey); eye(ex[1], ey); smileArc(); break
    case 'grin': eye(ex[0], ey); eye(ex[1], ey); openMouth(70, 52, FACE_H * 0.6); break
    case 'happy': closed(ex[0], ey); closed(ex[1], ey); openMouth(64, 46, FACE_H * 0.6); blush(0.35); break
    case 'laugh': closed(ex[0], ey + 4); closed(ex[1], ey + 4); openMouth(84, 66, FACE_H * 0.58); blush(0.5); break
    case 'sad': eye(ex[0], ey + 8, 22, 34); eye(ex[1], ey + 8, 22, 34); brow(ex[0], ey - 58, 12); brow(ex[1], ey - 58, -12)
      x.strokeStyle = ink; x.lineWidth = 14; x.beginPath(); x.arc(FACE_W / 2, FACE_H * 0.76, 50, Math.PI * 1.2, Math.PI * 1.8); x.stroke(); tear(ex[0] - 6, ey + 46); break
    case 'worried': eye(ex[0], ey, 24, 38); eye(ex[1], ey, 24, 38); brow(ex[0], ey - 60, 12); brow(ex[1], ey - 60, -12)
      x.strokeStyle = ink; x.lineWidth = 12; x.beginPath()
      for (let i = 0; i <= 6; i++) x[i ? 'lineTo' : 'moveTo'](FACE_W / 2 - 60 + i * 20, FACE_H * 0.68 + (i % 2 ? -9 : 9))
      x.stroke(); sweat(); break
    case 'shock':
      for (const cx of ex) { x.fillStyle = '#fff'; x.strokeStyle = ink; x.lineWidth = 10; x.beginPath(); x.ellipse(cx, ey, 40, 48, 0, 0, Math.PI * 2); x.fill(); x.stroke(); x.fillStyle = ink; x.beginPath(); x.arc(cx, ey + 4, 14, 0, Math.PI * 2); x.fill() }
      x.fillStyle = ink; x.beginPath(); x.ellipse(FACE_W / 2, FACE_H * 0.72, 30, 40, 0, 0, Math.PI * 2); x.fill(); break
    case 'sly': x.fillStyle = ink
      for (const cx of ex) { x.beginPath(); x.ellipse(cx, ey + 8, 28, 22, 0, 0, Math.PI); x.fill() }
      brow(ex[0], ey - 30, -6); brow(ex[1], ey - 46, 10)
      x.strokeStyle = ink; x.lineWidth = 14; x.beginPath(); x.moveTo(FACE_W / 2 - 60, FACE_H * 0.66); x.quadraticCurveTo(FACE_W / 2 + 10, FACE_H * 0.74, FACE_W / 2 + 70, FACE_H * 0.6); x.stroke(); break
    case 'heart':
      for (const cx of ex) { x.fillStyle = '#ff3d6e'; x.beginPath(); x.moveTo(cx, ey + 34); x.bezierCurveTo(cx - 70, ey - 10, cx - 30, ey - 60, cx, ey - 22); x.bezierCurveTo(cx + 30, ey - 60, cx + 70, ey - 10, cx, ey + 34); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(cx - 18, ey - 18, 8, 0, Math.PI * 2); x.fill() }
      openMouth(60, 44, FACE_H * 0.62); blush(0.45); break
    case 'blush': closed(ex[0], ey); closed(ex[1], ey); smileArc(46, FACE_H * 0.64, 0.8); blush(0.8); sweat(); break
    case 'shy': eye(ex[0], ey, 24, 36, -8); eye(ex[1], ey, 24, 36, -8); smileArc(38, FACE_H * 0.66, 0.7); blush(0.7); break
    case 'determined': eye(ex[0], ey + 6, 24, 32); eye(ex[1], ey + 6, 24, 32); brow(ex[0], ey - 44, -12); brow(ex[1], ey - 44, 12)
      x.strokeStyle = ink; x.lineWidth = 14; x.beginPath(); x.moveTo(FACE_W / 2 - 46, FACE_H * 0.7); x.lineTo(FACE_W / 2 + 46, FACE_H * 0.69); x.stroke(); break
    case 'curious': eye(ex[0], ey, 24, 38); eye(ex[1], ey - 4, 28, 44); brow(ex[1], ey - 68, 8)
      x.fillStyle = ink; x.beginPath(); x.ellipse(FACE_W / 2 + 10, FACE_H * 0.7, 18, 22, 0, 0, Math.PI * 2); x.fill(); break
    case 'down': eye(ex[0], ey + 16, 22, 26); eye(ex[1], ey + 16, 22, 26); brow(ex[0], ey - 34, 8); brow(ex[1], ey - 34, -8)
      x.strokeStyle = ink; x.lineWidth = 12; x.beginPath(); x.moveTo(FACE_W / 2 - 34, FACE_H * 0.72); x.lineTo(FACE_W / 2 + 34, FACE_H * 0.72); x.stroke(); break
    case 'painted': // the fake face someone paints on a card: too big, too sure
      x.fillStyle = ink
      for (const cx of ex) { x.beginPath(); x.ellipse(cx, ey, 30, 44, 0, 0, Math.PI * 2); x.fill() }
      openMouth(110, 60, FACE_H * 0.6, false); break
    default: eye(ex[0], ey); eye(ex[1], ey); smileArc()
  }
  x.restore()
}
const faceTex = new Map()
function face(expr) {
  if (!faceTex.has(expr)) {
    const [c, x] = canvas(FACE_W, FACE_H)
    drawFace(x, expr)
    faceTex.set(expr, tex(c))
  }
  return faceTex.get(expr)
}

// ---------------------------------------------------------------- avatars
const HEAD_R = 0.66
const headGeo = (() => {
  const pts = []
  const h = 0.62
  const r = 0.24
  pts.push(new THREE.Vector2(0, -h))
  for (let i = 0; i <= 8; i++) { const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(HEAD_R - r + r * Math.cos(a), -h + r + r * Math.sin(a))) }
  for (let i = 0; i <= 8; i++) { const a = (i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(HEAD_R - r + r * Math.cos(a), h - r + r * Math.sin(a))) }
  pts.push(new THREE.Vector2(0, h))
  return new THREE.LatheGeometry(pts, 48)
})()
const faceGeo = new THREE.CylinderGeometry(HEAD_R + 0.004, HEAD_R + 0.004, 0.86, 40, 1, true, -1.0, 2.0)

function shirtTex(base, emblem, accent = '#f2cf4a') {
  const [c, x] = canvas(256, 256)
  x.fillStyle = base
  x.fillRect(0, 0, 256, 256)
  x.fillStyle = 'rgba(255,255,255,0.06)'
  x.fillRect(0, 0, 256, 40)
  x.fillStyle = 'rgba(0,0,0,0.12)'
  x.fillRect(0, 216, 256, 40)
  if (emblem === 'star') { x.fillStyle = accent; starPath(x, 128, 120, 52, 22); x.fill() }
  if (emblem === 'heart') { x.fillStyle = accent; x.beginPath(); x.moveTo(128, 170); x.bezierCurveTo(30, 100, 90, 40, 128, 90); x.bezierCurveTo(166, 40, 226, 100, 128, 170); x.fill() }
  if (emblem === 'stripe') { x.fillStyle = accent; x.fillRect(0, 96, 256, 34) }
  if (emblem === 'zip') { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(124, 0, 8, 256); x.fillStyle = accent; x.fillRect(40, 150, 60, 40); x.fillRect(156, 150, 60, 40) }
  if (emblem === 'hoodie') { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(64, 160, 128, 60); x.fillStyle = '#fff'; x.fillRect(100, 0, 6, 70); x.fillRect(150, 0, 6, 70); x.fillStyle = accent; starPath(x, 128, 105, 30, 13); x.fill() }
  return tex(c)
}

// make an avatar. look: { skin, shirt, emblem, accent, pants, shoes, hair, hairColor, hat, hatColor }
function avatar(look) {
  const root = new THREE.Group()
  const body = new THREE.Group()
  root.add(body)
  const skin = mat(look.skin)
  const shirtFront = new THREE.MeshStandardMaterial({ map: shirtTex(look.shirt, look.emblem, look.accent), roughness: 0.75 })
  const shirt = mat(look.shirt, { roughness: 0.75 })
  const pants = mat(look.pants, { roughness: 0.8 })
  // torso: front face carries the shirt print
  const torso = mesh(rbox(2, 2, 1, 0.1), [shirt, shirt, shirt, shirt, shirtFront, shirt])
  torso.position.y = 3
  body.add(torso)
  const limb = (m, x, y, sleeve) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, y, 0)
    const g = mesh(rbox(0.98, 2, 0.98, 0.12), m)
    g.position.y = -0.9
    pivot.add(g)
    if (sleeve) { const s = mesh(rbox(1.02, 0.8, 1.02, 0.12), shirt); s.position.y = -0.35; pivot.add(s) }
    body.add(pivot)
    return pivot
  }
  const armL = limb(skin, -1.5, 3.9, look.sleeves !== false)
  const armR = limb(skin, 1.5, 3.9, look.sleeves !== false)
  const legL = limb(pants, -0.5, 2.0)
  const legR = limb(pants, 0.5, 2.0)
  if (look.shoes) for (const l of [legL, legR]) { const s = mesh(rbox(1.02, 0.35, 1.08, 0.12), mat(look.shoes)); s.position.set(0, -1.75, 0.03); l.add(s) }
  // head
  const head = new THREE.Group()
  head.position.y = 4.68
  const skull = mesh(headGeo, skin)
  head.add(skull)
  const faceMat = new THREE.MeshStandardMaterial({ map: face('smile'), transparent: true, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: -2 })
  const faceMesh = new THREE.Mesh(faceGeo, faceMat)
  faceMesh.position.y = -0.04
  head.add(faceMesh)
  body.add(head)
  const hairM = mat(look.hairColor || '#2b1d16', { roughness: 0.7 })
  addHair(head, look.hair, hairM)
  if (look.hat) addHat(head, look.hat, look.hatColor || '#22305e')
  body.add(head)
  root.userData = { body, torso, head, armL, armR, legL, legR, faceMat, look }
  return root
}

function addHair(head, kind, m) {
  const add = (o) => { head.add(o); return o }
  if (!kind) return
  if (kind === 'fringe') {
    add(box(1.4, 0.9, 0.4, m, 0, 0.05, -0.55, 0.15))
    for (const sx of [-0.66, 0.66]) add(box(0.22, 0.5, 0.7, m, sx, 0.12, -0.15, 0.1))
  }
  if (kind === 'short') {
    add(box(1.42, 0.42, 1.42, m, 0, 0.5, -0.02, 0.18))
    add(box(1.42, 0.7, 0.4, m, 0, 0.2, -0.55, 0.15))
  }
  if (kind === 'long') {
    add(box(1.48, 0.46, 1.48, m, 0, 0.5, -0.02, 0.2))
    add(box(1.56, 1.9, 0.55, m, 0, -0.35, -0.5, 0.2))
    add(box(0.32, 1.5, 1.1, m, -0.7, -0.15, -0.12, 0.14))
    add(box(0.32, 1.5, 1.1, m, 0.7, -0.15, -0.12, 0.14))
    add(box(1.0, 0.24, 0.3, m, 0.18, 0.36, 0.6, 0.1)).rotation.z = 0.25
  }
  if (kind === 'bun') {
    add(box(1.46, 0.46, 1.46, m, 0, 0.5, -0.02, 0.2))
    add(box(1.5, 1.0, 0.45, m, 0, 0.0, -0.52, 0.18))
    const b = add(mesh(new THREE.SphereGeometry(0.42, 24, 16), m)); b.position.set(0, 1.0, -0.25)
    add(box(0.3, 0.9, 1.0, m, -0.7, 0.1, -0.1, 0.12))
    add(box(0.3, 0.9, 1.0, m, 0.7, 0.1, -0.1, 0.12))
    add(box(1.1, 0.26, 0.3, m, -0.2, 0.38, 0.6, 0.1)).rotation.z = -0.2
  }
  if (kind === 'curly') {
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2
      const s = add(mesh(new THREE.SphereGeometry(0.34, 16, 12), m))
      s.position.set(Math.cos(a) * 0.62, 0.55 + hash(i) * 0.15, Math.sin(a) * 0.62 - 0.08)
      if (Math.sin(a) > 0.6) s.position.y += 0.12
    }
    add(mesh(new THREE.SphereGeometry(0.62, 24, 16), m)).position.set(0, 0.62, -0.05)
  }
  if (kind === 'spiky') {
    add(box(1.42, 0.36, 1.42, m, 0, 0.5, -0.02, 0.16))
    for (let i = 0; i < 7; i++) {
      const c = add(mesh(new THREE.ConeGeometry(0.26, 0.6, 4), m))
      c.position.set(-0.55 + i * 0.18, 0.82, 0.2 - (i % 2) * 0.4)
      c.rotation.z = (i - 3) * 0.12
    }
  }
}

function addHat(head, kind, color) {
  if (kind === 'starBeanie') {
    const m = mat(color, { roughness: 0.85 })
    const cap = mesh(new THREE.SphereGeometry(0.74, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m)
    cap.scale.set(1, 0.85, 1)
    cap.position.y = 0.3
    head.add(cap)
    const brim = mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.3, 40), mat('#f2cf4a', { roughness: 0.6 }))
    brim.position.y = 0.32
    head.add(brim)
    const star = mesh(new THREE.ExtrudeGeometry(starShape(0.42, 0.18), { depth: 0.12, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 }),
      mat('#ffd75a', { roughness: 0.3, metalness: 0.3, emissive: '#7a5200', emissiveIntensity: 0.25 }))
    star.position.set(0, 1.08, -0.06)
    star.rotation.z = 0.12
    head.add(star)
  }
  if (kind === 'cap') {
    const m = mat(color, { roughness: 0.7 })
    const dome = mesh(new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m)
    dome.scale.set(1, 0.7, 1)
    dome.position.y = 0.42
    head.add(dome)
    const bill = box(1.1, 0.08, 0.7, m, 0, 0.44, -0.9, 0.04)
    head.add(bill)
  }
  if (kind === 'beret') {
    const m = mat(color, { roughness: 0.85 })
    const b = mesh(new THREE.CylinderGeometry(0.8, 0.7, 0.26, 32), m)
    b.position.set(0.12, 0.78, 0)
    b.rotation.z = -0.18
    head.add(b)
  }
}

// pose an avatar from a few named numbers
function pose(a, p = {}) {
  const u = a.userData
  u.body.position.y = p.bob || 0
  u.body.rotation.y = p.turn || 0
  u.body.rotation.x = p.lean || 0
  u.head.rotation.set(p.nod || 0, p.look || 0, p.tilt || 0)
  u.armL.rotation.set(p.armLx || 0, 0, p.armLz || 0)
  u.armR.rotation.set(p.armRx || 0, 0, p.armRz || 0)
  u.legL.rotation.set(p.legLx || 0, 0, 0)
  u.legR.rotation.set(p.legRx || 0, 0, 0)
  if (p.face) u.faceMat.map = face(p.face)
}
// idle sway and breathing so nobody is ever a statue
function idle(t, seed = 0, amt = 1) {
  return {
    bob: Math.sin(t * 2.4 + seed) * 0.03 * amt,
    tilt: Math.sin(t * 1.3 + seed * 2) * 0.04 * amt,
    look: Math.sin(t * 0.9 + seed) * 0.05 * amt,
    armLx: Math.sin(t * 2.4 + seed) * 0.04 * amt,
    armRx: -Math.sin(t * 2.4 + seed) * 0.04 * amt,
    armLz: -0.06,
    armRz: 0.06,
  }
}
function walk(t, speed = 1) {
  const s = Math.sin(t * 7 * speed)
  return { legLx: s * 0.6, legRx: -s * 0.6, armLx: -s * 0.5, armRx: s * 0.5, bob: Math.abs(Math.cos(t * 7 * speed)) * 0.12 }
}

const LOOKS = {
  hero: { skin: '#e8b98f', shirt: '#2a3a7a', emblem: 'hoodie', accent: '#f2cf4a', pants: '#2b2b38', shoes: '#f4f1ea', hair: 'fringe', hairColor: '#3a2416', hat: 'starBeanie', hatColor: '#24306a' },
  girl: { skin: '#f0c7a0', shirt: '#f4c430', emblem: 'zip', accent: '#e8a700', pants: '#4a5aa8', shoes: '#ffffff', hair: 'bun', hairColor: '#b79cf2' },
  sister: { skin: '#e8b98f', shirt: '#ffffff', emblem: 'heart', accent: '#ff5a8a', pants: '#8fb7ff', shoes: '#ff8fb0', hair: 'long', hairColor: '#ff7fb2' },
  friend: { skin: '#8d5a3b', shirt: '#19a3a3', emblem: 'stripe', accent: '#ffffff', pants: '#3b3b3b', shoes: '#ff4d4d', hair: 'short', hairColor: '#1b120c', hat: 'cap', hatColor: '#e0393e' },
  a: { skin: '#c98e62', shirt: '#7c4dff', emblem: 'star', accent: '#ffffff', pants: '#222831', shoes: '#ffffff', hair: 'curly', hairColor: '#1d1410' },
  b: { skin: '#f3d0b0', shirt: '#ff7a3d', emblem: 'stripe', accent: '#ffe0c0', pants: '#3a4f8a', shoes: '#222', hair: 'long', hairColor: '#f0c24a' },
  c: { skin: '#6b4430', shirt: '#45c46b', emblem: 'heart', accent: '#ffffff', pants: '#2f3b2f', shoes: '#eee', hair: 'spiky', hairColor: '#120c08' },
  d: { skin: '#f1c9a5', shirt: '#e84a5f', emblem: 'none', pants: '#2a2a2a', shoes: '#fff', hair: 'short', hairColor: '#c75b2a', hat: 'beret', hatColor: '#2a2a2a' },
  e: { skin: '#d9a77c', shirt: '#3fa9f5', emblem: 'star', accent: '#ffffff', pants: '#f0f0f0', shoes: '#333', hair: 'bun', hairColor: '#2b1d16' },
  f: { skin: '#a8754f', shirt: '#ffd23f', emblem: 'stripe', accent: '#222', pants: '#5a3fb0', shoes: '#fff', hair: 'curly', hairColor: '#3b2416' },
}

// ---------------------------------------------------------------- cards
// The Align card: face down it's indigo glass with the seed-of-life and the
// chakra column (same as the app's card back); face up it's a portrait.
const CARD_W = 1.5
const CARD_H = 2.2
function cardBackCanvas() {
  const [c, x] = canvas(600, 880)
  const g = x.createLinearGradient(0, 0, 600, 880)
  g.addColorStop(0, '#c8b4ff'); g.addColorStop(0.3, '#6b4bd0'); g.addColorStop(0.52, '#f2d784'); g.addColorStop(0.72, '#6b4bd0'); g.addColorStop(1, '#c8b4ff')
  x.fillStyle = g
  rrect(x, 0, 0, 600, 880, 56); x.fill()
  const bg = x.createLinearGradient(0, 0, 600, 880)
  bg.addColorStop(0, '#2a1260'); bg.addColorStop(0.45, '#3c1a8a'); bg.addColorStop(1, '#170a3e')
  x.fillStyle = bg
  rrect(x, 12, 12, 576, 856, 46); x.fill()
  const rg = x.createRadialGradient(300, 410, 0, 300, 410, 330)
  rg.addColorStop(0, 'rgba(138,92,240,0.55)'); rg.addColorStop(1, 'rgba(138,92,240,0)')
  x.fillStyle = rg; x.fillRect(0, 0, 600, 880)
  x.strokeStyle = 'rgba(200,180,255,0.3)'; x.lineWidth = 3
  rrect(x, 40, 40, 520, 800, 30); x.stroke()
  const cx = 300, cy = 410, r = 92
  x.strokeStyle = 'rgba(217,201,255,0.5)'; x.lineWidth = 3
  x.beginPath(); x.arc(cx, cy, r * 2, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 6; i++) { const a = (Math.PI / 3) * i - Math.PI / 2; x.beginPath(); x.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), r, 0, Math.PI * 2); x.stroke() }
  const CH = ['#b06cff', '#5b6cff', '#3fb6f0', '#4fd27a', '#f2cf4a', '#f39a3a', '#f0383a']
  CH.forEach((col, i) => {
    const y = cy - r * 1.5 + i * (r / 2)
    x.shadowColor = col; x.shadowBlur = 20
    x.fillStyle = col; x.beginPath(); x.arc(cx, y, 11, 0, Math.PI * 2); x.fill()
    x.shadowBlur = 0
    x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(cx - 3, y - 3, 3.5, 0, Math.PI * 2); x.fill()
  })
  x.fillStyle = 'rgba(200,180,255,0.65)'
  x.font = '600 26px "Space Mono", monospace'
  x.textAlign = 'center'
  x.fillText('ALIGN · ✦ · TONIGHT', 300, 800)
  return c
}
const CARD_BACK = cardBackCanvas()
const cardBackTex = tex(CARD_BACK)

// a portrait face on a card front: their head, their colour, their name
function cardFrontTex(who, name, sign) {
  const look = LOOKS[who]
  const [c, x] = canvas(600, 880)
  const g = x.createLinearGradient(0, 0, 600, 880)
  g.addColorStop(0, '#fff3c4'); g.addColorStop(0.5, '#f2cf4a'); g.addColorStop(1, '#c9932a')
  x.fillStyle = g; rrect(x, 0, 0, 600, 880, 56); x.fill()
  const bg = x.createLinearGradient(0, 0, 0, 880)
  bg.addColorStop(0, '#ffe7b8'); bg.addColorStop(1, '#ffb38a')
  x.fillStyle = bg; rrect(x, 16, 16, 568, 848, 44); x.fill()
  // sun rays
  x.save(); x.translate(300, 360)
  for (let i = 0; i < 16; i++) { x.rotate(Math.PI / 8); x.fillStyle = i % 2 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'; x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, -520); x.lineTo(60, -520); x.fill() }
  x.restore()
  // shoulders
  x.fillStyle = look.shirt; rrect(x, 110, 560, 380, 300, 40); x.fill()
  // head
  x.fillStyle = look.skin; rrect(x, 165, 210, 270, 290, 70); x.fill()
  if (look.hair) { x.fillStyle = look.hairColor; rrect(x, 150, 180, 300, 90, 40); x.fill(); if (look.hair === 'long' || look.hair === 'bun') { rrect(x, 140, 200, 50, 280, 20); x.fill(); rrect(x, 410, 200, 50, 280, 20); x.fill() } if (look.hair === 'bun') { x.beginPath(); x.arc(300, 175, 60, 0, Math.PI * 2); x.fill() } }
  if (look.hat === 'starBeanie') { x.fillStyle = look.hatColor; rrect(x, 150, 150, 300, 110, 50); x.fill(); x.fillStyle = '#f2cf4a'; x.fillRect(150, 240, 300, 26); starPath(x, 300, 140, 50, 21); x.fill() }
  if (look.hat === 'cap') { x.fillStyle = look.hatColor; rrect(x, 150, 160, 300, 100, 50); x.fill() }
  const [fc, fx] = canvas(FACE_W, FACE_H)
  drawFace(fx, 'happy')
  x.drawImage(fc, 160, 250, 280, 224)
  // nameplate
  x.fillStyle = 'rgba(30,14,70,0.88)'; rrect(x, 70, 700, 460, 120, 30); x.fill()
  x.fillStyle = '#fff3c4'; x.textAlign = 'center'
  x.font = '800 60px Poppins, sans-serif'; x.fillText(name, 300, 765)
  x.font = '400 26px "Space Mono", monospace'; x.fillStyle = '#f2cf4a'; x.fillText(sign, 300, 800)
  return tex(c)
}

// a card back with a fake face painted over it; k = how much is painted
// (0 → 1), scrape = how much has been scraped off again (0 → 1)
function paintedCanvas() {
  const [c, x] = canvas(600, 880)
  return { c, x, t: tex(c), k: -1, s: -1 }
}
function paintCard(pc, k, scrape = 0, smudge = false) {
  k = Math.round(k * 40) / 40
  scrape = Math.round(scrape * 40) / 40
  if (pc.k === k && pc.s === scrape) return pc.t
  pc.k = k
  pc.s = scrape
  const x = pc.x
  x.clearRect(0, 0, 600, 880)
  x.drawImage(CARD_BACK, 0, 0)
  x.save()
  rrect(x, 12, 12, 576, 856, 46); x.clip()
  if (smudge) { x.fillStyle = 'rgba(255,170,190,0.35)'; for (let i = 0; i < 9; i++) { x.beginPath(); x.ellipse(120 + hash(i) * 360, 160 + hash(i + 9) * 560, 30 + hash(i + 3) * 40, 14 + hash(i + 4) * 20, hash(i + 5) * 3, 0, Math.PI * 2); x.fill() } }
  if (k > 0) {
    // brush strokes, then the face, revealed in order
    const strokes = 26
    x.lineCap = 'round'
    for (let i = 0; i < strokes * Math.min(1, k * 1.6); i++) {
      x.strokeStyle = ['#ffb3c8', '#ffc4a8', '#ffd0dc'][i % 3]
      x.lineWidth = 70 + hash(i) * 40
      x.beginPath()
      const y = 120 + (i / strokes) * 660
      x.moveTo(40 + hash(i + 1) * 60, y + hash(i + 2) * 30)
      x.quadraticCurveTo(300, y - 40 + hash(i + 3) * 80, 560 - hash(i + 4) * 60, y + hash(i + 5) * 30)
      x.stroke()
    }
    if (k > 0.55) {
      x.globalAlpha = clamp((k - 0.55) / 0.35)
      const [fc, fx] = canvas(FACE_W, FACE_H)
      drawFace(fx, 'painted')
      x.drawImage(fc, -10, 180, 620, 496)
      x.fillStyle = 'rgba(255,60,110,0.6)'
      for (const cx of [130, 470]) { x.beginPath(); x.ellipse(cx, 560, 60, 30, 0, 0, Math.PI * 2); x.fill() }
      // lashes, too many
      x.strokeStyle = '#1b1414'; x.lineWidth = 9
      for (const cx of [237, 403]) for (let j = 0; j < 4; j++) { x.beginPath(); x.moveTo(cx - 24 + j * 16, 330); x.lineTo(cx - 34 + j * 22, 288); x.stroke() }
      x.globalAlpha = 1
    }
  }
  if (scrape > 0) {
    // scraped patches show the real card underneath again
    x.globalCompositeOperation = 'destination-out'
    const n = 60
    for (let i = 0; i < n * scrape; i++) {
      x.beginPath()
      x.ellipse(60 + hash(i * 3) * 480, 80 + (i / n) * 720 + hash(i * 5) * 60, 90 + hash(i) * 70, 50 + hash(i + 1) * 40, hash(i + 2) * 3, 0, Math.PI * 2)
      x.fill()
    }
    x.globalCompositeOperation = 'destination-over'
    x.drawImage(CARD_BACK, 0, 0)
    x.globalCompositeOperation = 'source-over'
  }
  x.restore()
  pc.t.needsUpdate = true
  return pc.t
}

function cardMesh(frontTex) {
  const g = new THREE.Group()
  const geo = new THREE.PlaneGeometry(CARD_W, CARD_H)
  const backM = new THREE.MeshStandardMaterial({ map: cardBackTex, transparent: true, roughness: 0.35, metalness: 0.1, emissive: '#ffffff', emissiveMap: cardBackTex, emissiveIntensity: 0.18 })
  const frontM = new THREE.MeshStandardMaterial({ map: frontTex || cardBackTex, transparent: true, roughness: 0.35, metalness: 0.1, emissive: '#ffffff', emissiveMap: frontTex || cardBackTex, emissiveIntensity: 0.22 })
  const backP = new THREE.Mesh(geo, backM)
  backP.position.z = 0.012
  backP.castShadow = true
  const frontP = new THREE.Mesh(geo, frontM)
  frontP.rotation.y = Math.PI
  frontP.position.z = -0.012
  g.add(backP, frontP)
  // a glow sheet behind for flips
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W * 2.4, CARD_H * 2.0), new THREE.MeshBasicMaterial({ map: glowTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }))
  glow.position.z = -0.05
  g.add(glow)
  g.userData = { backM, frontM, glow }
  return g
}
function setCard(card, { back, front, glow = 0 } = {}) {
  const u = card.userData
  if (back) { u.backM.map = back; u.backM.emissiveMap = back }
  if (front) { u.frontM.map = front; u.frontM.emissiveMap = front }
  u.glow.material.opacity = glow
}

let _glow
function glowTex() {
  if (_glow) return _glow
  const [c, x] = canvas(256, 256)
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,230,160,1)'); g.addColorStop(0.35, 'rgba(255,200,110,0.45)'); g.addColorStop(1, 'rgba(255,180,90,0)')
  x.fillStyle = g; x.fillRect(0, 0, 256, 256)
  _glow = tex(c)
  return _glow
}

// ---------------------------------------------------------------- particles
// Sprites placed analytically from time, so any frame can be rendered alone.
function spriteTex(kind) {
  const [c, x] = canvas(128, 128)
  if (kind === 'spark') {
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(0.12, 'rgba(255,225,140,0.55)'); g.addColorStop(0.5, 'rgba(255,200,80,0.08)'); g.addColorStop(1, 'rgba(255,200,80,0)')
    x.fillStyle = g; x.fillRect(0, 0, 128, 128)
    x.fillStyle = '#fff'; starPath(x, 64, 64, 58, 5, 4, 0); x.fill()
  }
  if (kind === 'heart') {
    x.fillStyle = '#ff4f7f'; x.strokeStyle = '#fff'; x.lineWidth = 8
    x.beginPath(); x.moveTo(64, 108); x.bezierCurveTo(-10, 60, 20, 6, 64, 38); x.bezierCurveTo(108, 6, 138, 60, 64, 108); x.fill(); x.stroke()
  }
  if (kind === 'dot') { x.fillStyle = '#fff'; x.beginPath(); x.arc(64, 64, 56, 0, Math.PI * 2); x.fill() }
  if (kind === 'leaf') { x.fillStyle = '#e7a34a'; x.beginPath(); x.ellipse(64, 64, 50, 26, 0.6, 0, Math.PI * 2); x.fill() }
  if (kind === 'question') { x.fillStyle = '#fff'; x.strokeStyle = '#1b1414'; x.lineWidth = 10; x.font = '900 110px Poppins'; x.textAlign = 'center'; x.strokeText('?', 64, 104); x.fillText('?', 64, 104) }
  return tex(c)
}
const SPR = {}
function sprites(kind, n, additive = false) {
  if (!SPR[kind]) SPR[kind] = spriteTex(kind.replace(/\d+$/, ''))
  const g = new THREE.Group()
  for (let i = 0; i < n; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: SPR[kind], transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, fog: false }))
    s.visible = false
    g.add(s)
  }
  scene.add(g)
  return g
}
// burst: sprites fly out from `at` after t0
function burst(group, t, t0, at, { spread = 3, up = 2, size = 0.4, life = 1.4, gravity = -2, colors, seed = 1 } = {}) {
  group.children.forEach((s, i) => {
    const k = t - t0 - hash(i + seed) * 0.15
    if (k < 0 || k > life) { s.visible = false; return }
    s.visible = true
    const a = hash(i * 7 + seed) * Math.PI * 2
    const e = (hash(i * 3 + seed) - 0.3) * 1.2
    const sp = spread * (0.4 + hash(i * 11 + seed) * 0.8)
    s.position.set(at.x + Math.cos(a) * Math.cos(e) * sp * easeOut(k / life), at.y + Math.sin(e) * sp * easeOut(k / life) + up * k + 0.5 * gravity * k * k, at.z + Math.sin(a) * Math.cos(e) * sp * 0.6 * easeOut(k / life))
    const sz = size * (0.5 + hash(i + 5) * 0.8) * (1 - Math.pow(k / life, 3))
    s.scale.set(sz, sz, 1)
    if (colors) s.material.color.set(colors[i % colors.length])
    s.material.opacity = 1 - smooth((k - life * 0.6) / (life * 0.4))
  })
}
function hideAll(group) { group.children.forEach((s) => (s.visible = false)) }
// ambient drifting motes
function drift(group, t, center, { w = 10, h = 8, d = 6, size = 0.08, speed = 0.3, opacity = 0.7 } = {}) {
  group.children.forEach((s, i) => {
    s.visible = true
    const k = (hash(i) + t * speed * (0.5 + hash(i + 2))) % 1
    s.position.set(center.x + (hash(i + 3) - 0.5) * w + Math.sin(t + i) * 0.2, center.y + (k - 0.3) * h, center.z + (hash(i + 4) - 0.5) * d)
    const sz = size * (0.6 + hash(i + 6))
    s.scale.set(sz, sz, 1)
    s.material.opacity = opacity * Math.sin(k * Math.PI)
  })
}

// ---------------------------------------------------------------- sets
const sets = {}
function setGroup(name, origin) {
  const g = new THREE.Group()
  g.position.copy(origin)
  g.visible = false
  scene.add(g)
  sets[name] = g
  return g
}

function tree(x, z, s = 1, color = '#4fa04a') {
  const g = new THREE.Group()
  g.add(box(0.8 * s, 4 * s, 0.8 * s, '#7a5232', 0, 2 * s, 0, 0.12))
  const leaf = mat(color, { roughness: 0.8 })
  const blobs = [[0, 5.2, 0, 2.4], [1.3, 4.4, 0.3, 1.7], [-1.3, 4.6, -0.2, 1.8], [0.3, 6.4, -0.3, 1.6], [-0.4, 4.3, 1.2, 1.5]]
  for (const [bx, by, bz, r] of blobs) { const m = mesh(new THREE.IcosahedronGeometry(r * s, 2), leaf); m.position.set(bx * s, by * s, bz * s); g.add(m) }
  g.position.set(x, 0, z)
  return g
}
function windowTex(lit) {
  const [c, x] = canvas(128, 128)
  x.fillStyle = lit ? '#ffd88a' : '#9cc7e8'
  x.fillRect(0, 0, 128, 128)
  if (!lit) { x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.moveTo(10, 90); x.lineTo(60, 10); x.lineTo(80, 10); x.lineTo(30, 90); x.fill() }
  else { const g = x.createRadialGradient(64, 64, 0, 64, 64, 90); g.addColorStop(0, '#fff2c8'); g.addColorStop(1, '#ffb347'); x.fillStyle = g; x.fillRect(0, 0, 128, 128) }
  x.fillStyle = '#ffffff'; x.fillRect(58, 0, 12, 128); x.fillRect(0, 58, 128, 12)
  x.strokeStyle = '#fff'; x.lineWidth = 14; x.strokeRect(0, 0, 128, 128)
  return tex(c)
}
const WIN = { day: null, lit: null }
function house(x, z, rotY, wall, roof, lit = false, scale = 1) {
  if (!WIN.day) { WIN.day = windowTex(false); WIN.lit = windowTex(true) }
  const g = new THREE.Group()
  const w = 10, h = 7, d = 9
  g.add(box(w, h, d, wall, 0, h / 2, 0, 0.1))
  g.add(box(w + 0.4, 0.5, d + 0.4, '#f4efe6', 0, 0.25, 0, 0.1))
  // roof prism
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2 - 0.8, 0); shape.lineTo(0, 4); shape.lineTo(w / 2 + 0.8, 0); shape.closePath()
  const r = mesh(new THREE.ExtrudeGeometry(shape, { depth: d + 1.2, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 2 }), mat(roof, { roughness: 0.7 }))
  r.position.set(0, h, -(d + 1.2) / 2)
  g.add(r)
  // chimney
  g.add(box(1.2, 2.6, 1.2, '#b55a45', 2.6, h + 2.8, -1, 0.08))
  // door, windows
  g.add(box(2, 3.6, 0.3, '#6b3f2a', 0, 1.8, d / 2 + 0.1, 0.08))
  g.add(box(0.3, 0.3, 0.25, '#f2cf4a', 0.6, 1.9, d / 2 + 0.3, 0.1))
  const wm = new THREE.MeshStandardMaterial({ map: lit ? WIN.lit : WIN.day, emissive: lit ? '#ffcc77' : '#000000', emissiveMap: lit ? WIN.lit : null, emissiveIntensity: lit ? 1.4 : 0, roughness: 0.2 })
  for (const [wx, wy] of [[-3, 2.3], [3, 2.3], [-3, 5.3], [3, 5.3], [0, 5.3]]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9), wm)
    p.position.set(wx, wy, d / 2 + 0.02)
    g.add(p)
    g.add(box(2.4, 0.25, 0.5, '#ffffff', wx, wy - 1.1, d / 2 + 0.15, 0.06))
  }
  g.position.set(x, 0, z)
  g.rotation.y = rotY
  g.scale.setScalar(scale)
  return g
}
function lamp(x, z, lit = false) {
  const g = new THREE.Group()
  g.add(box(0.35, 7, 0.35, '#2d2f3a', 0, 3.5, 0, 0.1))
  g.add(box(0.9, 0.3, 0.9, '#2d2f3a', 0, 0.15, 0, 0.1))
  const bulb = mesh(new THREE.SphereGeometry(0.5, 20, 14), new THREE.MeshStandardMaterial({ color: '#fff4d6', emissive: lit ? '#ffcf7a' : '#5a4a30', emissiveIntensity: lit ? 3 : 0.3 }), false)
  bulb.position.y = 7.3
  g.add(bulb)
  g.add(box(1.2, 0.25, 1.2, '#2d2f3a', 0, 7.85, 0, 0.1))
  if (lit) { const pl = new THREE.PointLight('#ffc875', 30, 16, 1.6); pl.position.y = 6.8; g.add(pl) }
  g.position.set(x, 0, z)
  return g
}
function fence(x, z, len, rotY = 0) {
  const g = new THREE.Group()
  for (let i = 0; i <= len; i++) g.add(box(0.3, 1.6, 0.3, '#ffffff', i * 1.2, 0.8, 0, 0.06))
  g.add(box(len * 1.2 + 0.3, 0.25, 0.2, '#ffffff', len * 0.6, 1.1, 0, 0.05))
  g.add(box(len * 1.2 + 0.3, 0.25, 0.2, '#ffffff', len * 0.6, 0.5, 0, 0.05))
  g.position.set(x, 0, z)
  g.rotation.y = rotY
  return g
}
function clouds(g, n, y, r, seed = 0) {
  const m = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, emissive: '#ffe6d0', emissiveIntensity: 0.35, fog: false })
  for (let i = 0; i < n; i++) {
    const c = new THREE.Group()
    for (let j = 0; j < 5; j++) { const s = new THREE.Mesh(new THREE.IcosahedronGeometry(3 + hash(i * 9 + j + seed) * 3, 2), m); s.position.set(j * 3.4 - 7, hash(j + i) * 2, hash(j * 2 + i) * 2); c.add(s) }
    const a = hash(i + seed) * Math.PI * 2
    c.position.set(Math.cos(a) * r, y + hash(i + 4) * 30, Math.sin(a) * r)
    c.lookAt(0, c.position.y, 0)
    g.add(c)
  }
}
function ground(g, size, color, line, cells = 8, rep = 20) {
  const t = studTex(color, line, 512, cells)
  t.repeat.set(rep, rep)
  const p = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }))
  p.rotation.x = -Math.PI / 2
  p.receiveShadow = true
  g.add(p)
  return p
}
function road(g, len, z = 0, lines = true) {
  const r = mesh(new THREE.BoxGeometry(len, 0.1, 10), mat('#3b3d47', { roughness: 0.9 }), false)
  r.position.set(0, 0.05, z)
  g.add(r)
  for (const s of [-1, 1]) { const sw = box(len, 0.4, 3, '#d9d4cc', 0, 0.2, z + s * 6.5, 0.05); sw.castShadow = false; g.add(sw) }
  if (lines) for (let i = -len / 2; i < len / 2; i += 6) { const l = mesh(new THREE.BoxGeometry(3, 0.12, 0.35), mat('#f2cf4a'), false); l.position.set(i, 0.07, z); g.add(l) }
}

// STREET: a toy suburb at golden hour. Characters stand around (0,0,0).
function buildStreet() {
  const g = setGroup('street', V(0, 0, 0))
  ground(g, 400, '#7cc25a', 'rgba(0,0,0,0.06)')
  road(g, 400, -16)
  const walls = ['#f6d7b0', '#bfe3f2', '#f7c6c7', '#fff1b8', '#d4e7c5', '#e9d5ff']
  const roofs = ['#c2493d', '#3e5c9a', '#7a4b9e', '#2f7d5b', '#b5452f', '#4a4f6b']
  for (let i = 0; i < 7; i++) g.add(house(-48 + i * 16, -34, 0, walls[i % 6], roofs[i % 6]))
  for (let i = 0; i < 6; i++) g.add(house(-40 + i * 16, 14 + (i % 2) * 2, Math.PI, walls[(i + 3) % 6], roofs[(i + 2) % 6]))
  for (let i = 0; i < 9; i++) g.add(tree(-50 + i * 12 + hash(i) * 3, -24 + hash(i + 2) * 2, 0.9 + hash(i + 1) * 0.3, ['#4fa04a', '#5bb85a', '#3f8f4a'][i % 3]))
  for (let i = 0; i < 5; i++) g.add(lamp(-36 + i * 18, -9.5))
  g.add(fence(-14, -5, 9))
  g.add(fence(6, -5, 9))
  for (let i = 0; i < 7; i++) { const f = new THREE.Group(); const c = ['#ff6b8b', '#ffd23f', '#ffffff', '#b06cff'][i % 4]; for (let j = 0; j < 3; j++) { const s = mesh(new THREE.SphereGeometry(0.25, 10, 8), mat(c)); s.position.set(j * 0.4 - 0.4, 0.4 + hash(j + i) * 0.2, 0); f.add(s) } f.position.set(-13 + i * 3.2, 0, -4.4); g.add(f) }
  // bench for "alone"
  const bench = new THREE.Group()
  bench.add(box(5, 0.35, 1.6, '#8a5a3a', 0, 1.8, 0, 0.08))
  bench.add(box(5, 1.6, 0.3, '#8a5a3a', 0, 3.0, -0.75, 0.08))
  for (const bx of [-2.1, 2.1]) bench.add(box(0.3, 1.8, 1.4, '#2d2f3a', bx, 0.9, 0, 0.06))
  bench.position.set(30, 0, -4)
  g.add(bench)
  clouds(g, 10, 60, 230, 1)
  return g
}

// BEDROOM: a small room at night, desk lamp on, paint everywhere
function buildRoom() {
  const g = setGroup('room', V(0, 0, -400))
  const wall = mat('#5b6bb5', { roughness: 0.9 })
  const floorT = studTex('#a8764e', 'rgba(0,0,0,0.12)', 512, 4)
  floorT.repeat.set(6, 6)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.7 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  g.add(floor)
  const back = mesh(new THREE.BoxGeometry(40, 20, 0.5), wall); back.position.set(0, 10, -8); g.add(back)
  const left = mesh(new THREE.BoxGeometry(0.5, 20, 30), wall); left.position.set(-12, 10, 4); g.add(left)
  const right = mesh(new THREE.BoxGeometry(0.5, 20, 30), wall); right.position.set(12, 10, 4); g.add(right)
  // wallpaper stars
  for (let i = 0; i < 30; i++) { const s = mesh(new THREE.ExtrudeGeometry(starShape(0.3, 0.13), { depth: 0.05, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#f2cf4a', emissive: '#f2cf4a', emissiveIntensity: 0.4 }), false); s.position.set(-11 + hash(i) * 22, 3 + hash(i + 1) * 14, -7.7); g.add(s) }
  // window with the night sky (the sky dome shows through a hole is hard; paint it)
  const [wc, wx] = canvas(256, 256)
  const sg = wx.createLinearGradient(0, 0, 0, 256); sg.addColorStop(0, '#0a1240'); sg.addColorStop(1, '#3a3f8f'); wx.fillStyle = sg; wx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 40; i++) { wx.fillStyle = '#fff'; wx.fillRect(hash(i) * 256, hash(i + 1) * 200, 2, 2) }
  wx.fillStyle = '#fff6d8'; wx.beginPath(); wx.arc(180, 70, 30, 0, Math.PI * 2); wx.fill(); wx.fillStyle = '#0a1240'; wx.beginPath(); wx.arc(195, 62, 28, 0, Math.PI * 2); wx.fill()
  const wt = tex(wc)
  const win = new THREE.Mesh(new THREE.PlaneGeometry(7, 6), new THREE.MeshStandardMaterial({ map: wt, emissive: '#ffffff', emissiveMap: wt, emissiveIntensity: 0.9 }))
  win.position.set(-4, 9, -7.7)
  g.add(win)
  g.add(box(7.6, 0.4, 0.6, '#ffffff', -4, 5.9, -7.5), box(7.6, 0.4, 0.6, '#ffffff', -4, 12.1, -7.5), box(0.4, 6.4, 0.6, '#ffffff', -7.6, 9, -7.5), box(0.4, 6.4, 0.6, '#ffffff', -0.4, 9, -7.5), box(0.3, 6, 0.4, '#ffffff', -4, 9, -7.45))
  // poster
  const [pc, px] = canvas(200, 280)
  px.fillStyle = '#1d1048'; px.fillRect(0, 0, 200, 280); px.fillStyle = '#f2cf4a'; starPath(px, 100, 120, 70, 30); px.fill(); px.font = '800 30px Poppins'; px.textAlign = 'center'; px.fillText('STARS', 100, 240)
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 4.4), new THREE.MeshStandardMaterial({ map: tex(pc) })); poster.position.set(6, 10, -7.7); g.add(poster)
  // desk + lamp
  g.add(box(10, 0.5, 4.5, '#c98f5a', 0, 3.6, -1, 0.08))
  for (const dx of [-4.5, 4.5]) for (const dz of [-2.8, 0.8]) g.add(box(0.4, 3.4, 0.4, '#8a5a3a', dx, 1.7, dz, 0.06))
  g.add(box(0.5, 2.6, 0.5, '#2d2f3a', 3.6, 5.1, -2.2, 0.1))
  const shade = mesh(new THREE.ConeGeometry(1.1, 1.2, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#ff9a5a', side: THREE.DoubleSide, emissive: '#ff9a5a', emissiveIntensity: 0.6 }))
  shade.position.set(3.6, 6.6, -2.2); g.add(shade)
  const deskLight = new THREE.PointLight('#ffb36b', 40, 22, 1.4); deskLight.position.set(3.4, 6.0, -1.6); deskLight.castShadow = true; deskLight.shadow.mapSize.set(1024, 1024); deskLight.shadow.bias = -0.002; g.add(deskLight)
  // paint pots
  const pots = ['#ff5a8a', '#ffd23f', '#5ad1ff', '#7cff8a']
  pots.forEach((c, i) => { const p = mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.7, 20), mat('#e8e8e8')); p.position.set(-3.6 + i * 1.05, 4.2, -2.2); g.add(p); const top = mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.05, 20), mat(c, { roughness: 0.2 })); top.position.set(-3.6 + i * 1.05, 4.56, -2.2); g.add(top) })
  // bed
  g.add(box(8, 1.6, 12, '#ffffff', -16 + 8, 1.4, 6, 0.3))
  g.add(box(8.2, 1.0, 9, '#7b5cff', -8, 2.6, 7.5, 0.3))
  g.add(box(3, 0.8, 2, '#ffffff', -8, 2.6, 1.4, 0.4))
  // chair
  g.add(box(3, 0.4, 3, '#e05a4a', 0, 2.4, 2.4, 0.1))
  return g
}

// PLAZA: the town square at night, a clock tower at 11:11
function clockTex(text) {
  const [c, x] = canvas(512, 512)
  x.fillStyle = '#fff8e6'; x.beginPath(); x.arc(256, 256, 250, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#2a1a50'; x.lineWidth = 18; x.stroke()
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; x.fillStyle = '#2a1a50'; x.fillRect(256 + Math.sin(a) * 210 - 6, 256 - Math.cos(a) * 210 - 18, 12, 36) }
  // hands at 11:11
  const hand = (a, len, w) => { x.save(); x.translate(256, 256); x.rotate(a); x.fillStyle = '#2a1a50'; rrect(x, -w / 2, -len, w, len + 20, w / 2); x.fill(); x.restore() }
  hand(((11 + 11 / 60) / 12) * Math.PI * 2, 130, 22)
  hand((11 / 60) * Math.PI * 2, 190, 14)
  x.fillStyle = '#f2cf4a'; x.beginPath(); x.arc(256, 256, 18, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a1a50'; x.font = '800 54px Poppins'; x.textAlign = 'center'; x.fillText(text, 256, 400)
  return tex(c)
}
function buildPlaza() {
  const g = setGroup('plaza', V(400, 0, 0))
  ground(g, 400, '#8a8fa8', 'rgba(0,0,0,0.12)', 4, 50)
  const tower = new THREE.Group()
  tower.add(box(8, 30, 8, '#c9b9a0', 0, 15, 0, 0.15))
  tower.add(box(9, 1, 9, '#a8987e', 0, 30.5, 0, 0.1))
  tower.add(box(9, 1, 9, '#a8987e', 0, 8, 0, 0.1))
  const roof = mesh(new THREE.ConeGeometry(6.6, 9, 4), mat('#3e2a6e')); roof.position.y = 35.5; roof.rotation.y = Math.PI / 4; tower.add(roof)
  const st = mesh(new THREE.ExtrudeGeometry(starShape(1.4, 0.6), { depth: 0.3, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: '#ffd75a', emissive: '#ffb020', emissiveIntensity: 1.6 }))
  st.position.set(0, 41.5, -0.15); tower.add(st)
  const ct = clockTex('11:11')
  const clock = new THREE.Mesh(new THREE.CircleGeometry(3.4, 48), new THREE.MeshStandardMaterial({ map: ct, emissive: '#fff2c8', emissiveMap: ct, emissiveIntensity: 1.1 }))
  clock.position.set(0, 24, 4.06); tower.add(clock)
  tower.position.set(0, 0, -16)
  g.add(tower)
  const walls = ['#3d4a8a', '#5a3d8a', '#2d5a7a', '#6a4a7a']
  for (let i = 0; i < 6; i++) { const hgrp = house(-46 + i * 18, -40, 0, walls[i % 4], '#21183e', true, 1.1); if (Math.abs(-46 + i * 18) > 10) g.add(hgrp) }
  for (let i = 0; i < 6; i++) g.add(lamp(-25 + i * 10, -4 + (i % 2) * 8, true))
  return g
}

// BUS STOP: night, one shelter, one lamp
function buildBusStop() {
  const g = setGroup('bus', V(-400, 0, 0))
  ground(g, 400, '#2f5a3a', 'rgba(0,0,0,0.12)')
  road(g, 400, 8, true)
  const shelter = new THREE.Group()
  shelter.add(box(12, 0.4, 5, '#2d2f3a', 0, 8.2, 0, 0.1))
  for (const sx of [-5.8, 5.8]) shelter.add(box(0.35, 8, 0.35, '#2d2f3a', sx, 4, -2.2, 0.08), box(0.35, 8, 0.35, '#2d2f3a', sx, 4, 2.2, 0.08))
  const glass = new THREE.MeshStandardMaterial({ color: '#bfe6ff', transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.2 })
  const gb = new THREE.Mesh(new THREE.BoxGeometry(11.4, 6.5, 0.1), glass); gb.position.set(0, 4.6, -2.3); shelter.add(gb)
  shelter.add(box(9, 0.4, 1.6, '#c98f5a', 0, 1.9, -1.2, 0.08))
  for (const bx of [-3.8, 3.8]) shelter.add(box(0.3, 1.9, 1.2, '#2d2f3a', bx, 0.95, -1.2, 0.06))
  // a lit ad panel: an Align card back
  const ad = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.8), new THREE.MeshStandardMaterial({ map: cardBackTex, emissive: '#ffffff', emissiveMap: cardBackTex, emissiveIntensity: 0.9, transparent: true }))
  ad.position.set(4.4, 4.6, -2.2); shelter.add(ad)
  const strip = new THREE.PointLight('#ffe6b0', 26, 14, 1.5); strip.position.set(0, 7.6, 0.5); shelter.add(strip)
  const tube = mesh(new THREE.BoxGeometry(8, 0.15, 0.3), new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff1cc', emissiveIntensity: 2.5 }), false); tube.position.set(0, 7.9, 0.4); shelter.add(tube)
  shelter.position.set(0, 0, -2)
  g.add(shelter)
  // stop sign
  const [sc, sx] = canvas(256, 256)
  sx.fillStyle = '#2a5bd7'; sx.beginPath(); sx.arc(128, 128, 120, 0, Math.PI * 2); sx.fill(); sx.fillStyle = '#fff'; sx.font = '900 110px Poppins'; sx.textAlign = 'center'; sx.fillText('B', 128, 168)
  g.add(box(0.25, 9, 0.25, '#9aa0aa', -7.5, 4.5, 2.5, 0.06))
  const sign = new THREE.Mesh(new THREE.CircleGeometry(1.1, 32), new THREE.MeshStandardMaterial({ map: tex(sc), emissive: '#ffffff', emissiveMap: tex(sc), emissiveIntensity: 0.4 })); sign.position.set(-7.5, 8.6, 2.65); g.add(sign)
  g.add(lamp(-12, 2.5, true), lamp(16, 2.5, true))
  for (let i = 0; i < 6; i++) g.add(tree(-40 + i * 16, -14 - hash(i) * 4, 1, '#2e6a46'))
  for (let i = 0; i < 5; i++) g.add(house(-60 + i * 30, -34, 0, ['#3d4a8a', '#5a3d8a', '#2d5a7a'][i % 3], '#21183e', i % 2 === 0))
  return g
}

// ---------------------------------------------------------------- cast
const cast = {}
function place(name, lookKey) {
  const a = avatar(LOOKS[lookKey])
  scene.add(a)
  cast[name] = a
  return a
}
function holdCard(av, card, side = 'R') {
  // the card sits in the hand, upright, facing where the avatar faces
  const arm = av.userData[side === 'R' ? 'armR' : 'armL']
  arm.add(card)
  card.position.set(0, -2.0, 0.55)
  card.userData.arm = arm
}
// keep a held card upright whatever the arm is doing
function uprightCard(card, flip = 0, tiltZ = 0) {
  const arm = card.userData.arm
  card.rotation.set(-arm.rotation.x, flip, tiltZ - arm.rotation.z)
}

// ---------------------------------------------------------------- shots
let script, timeline, fontsReady
const crowdKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'a', 'c']

function hideCast() { for (const k in cast) cast[k].visible = false; for (const k in sets) sets[k].visible = false; for (const k in SPRG) hideAll(SPRG[k]) }
function show(name, set, x, y, z, rotY = 0) {
  const a = cast[name]
  a.visible = true
  a.position.set(sets[set].position.x + x, y, sets[set].position.z + z)
  a.rotation.set(0, rotY, 0)
  return a
}
function cam(set, from, to, fov = 35) {
  const o = sets[set].position
  camera.position.copy(from).add(o)
  camera.fov = fov
  camera.updateProjectionMatrix()
  camera.lookAt(to.clone().add(o))
}
function focusOn(p, set, aperture = 0.0008) {
  const d = camera.position.distanceTo(p.clone().add(sets[set].position))
  bokeh.uniforms.focus.value = d
  bokeh.uniforms.aperture.value = aperture
}
const SPRG = {}
let cards = {}
let painted, paintedGirl

function build() {
  buildStreet(); buildRoom(); buildPlaza(); buildBusStop()
  place('hero', 'hero'); place('girl', 'girl'); place('sister', 'sister'); place('friend', 'friend')
  crowdKeys.forEach((k, i) => place('c' + i, k))
  place('m1', 'a'); place('m2', 'e')
  painted = paintedCanvas()
  paintedGirl = paintedCanvas()
  cards = {
    hero: cardMesh(cardFrontTex('hero', 'You', 'LEO · FIRE')),
    girl: cardMesh(cardFrontTex('girl', 'Juniper', 'PISCES · WATER')),
    sister: cardMesh(cardFrontTex('sister', 'Maya', 'GEMINI · AIR')),
    friend: cardMesh(cardFrontTex('friend', 'Rio', 'ARIES · FIRE')),
    friend2: cardMesh(cardFrontTex('friend', 'Rio', 'ARIES · FIRE')),
    m1: cardMesh(cardFrontTex('a', 'Noor', 'LIBRA · AIR')),
    m2: cardMesh(cardFrontTex('e', 'Ivy', 'TAURUS · EARTH')),
  }
  holdCard(cast.hero, cards.hero)
  holdCard(cast.girl, cards.girl)
  holdCard(cast.sister, cards.sister)
  holdCard(cast.friend, cards.friend)
  holdCard(cast.friend, cards.friend2, 'L')
  holdCard(cast.m1, cards.m1)
  holdCard(cast.m2, cards.m2)
  SPRG.spark = sprites('spark', 70, true)
  SPRG.spark2 = sprites('spark2', 70, true)
  SPRG.heart = sprites('heart', 26)
  SPRG.confetti = sprites('dot', 60)
  SPRG.flakes = sprites('dot2', 50)
  SPRG.motes = sprites('spark3', 40, true)
  SPRG.leaves = sprites('leaf', 18)
  SPRG.question = sprites('question', 3)
  // the swirl of cards above the plaza at 11:11
  const swirl = new THREE.InstancedMesh(new THREE.PlaneGeometry(CARD_W, CARD_H), new THREE.MeshStandardMaterial({ map: cardBackTex, transparent: true, side: THREE.DoubleSide, emissive: '#ffffff', emissiveMap: cardBackTex, emissiveIntensity: 0.5 }), 120)
  swirl.frustumCulled = false
  scene.add(swirl)
  SPRG.swirl = { children: [], swirl }
}

// helpers for shots: where a held card is in world space
function cardWorld(card) { const v = new THREE.Vector3(); card.getWorldPosition(v); return v }
const handUp = (k) => ({ armRx: lerp(0, -1.45, k), armRz: lerp(0.06, 0.12, k) })

// Each shot: (t local seconds, d shot length, T absolute) → poses the world.
const SHOTS = {
  intro(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.15)
    const pop = back((t - d * 0.62) / 0.35)
    pose(h, { ...idle(t), ...handUp(easeOut((t - d * 0.5) / 0.4)), face: t < d * 0.55 ? 'smile' : 'grin', bob: Math.sin(t * 2.4) * 0.03 + (t > d * 0.6 ? Math.max(0, Math.sin((t - d * 0.6) * 9)) * 0.25 * (1 - clamp((t - d * 0.6) / 0.6)) : 0) })
    cards.hero.visible = pop > 0.01
    cards.hero.scale.setScalar(Math.max(0.001, pop))
    uprightCard(cards.hero, 0, Math.sin(t * 3) * 0.05)
    setCard(cards.hero, { back: cardBackTex, glow: 0.6 * clamp(1 - (t - d * 0.62)) })
    cam('street', V(lerp(3.2, 2.6, t / d), 4.8, lerp(11.5, 10.0, t / d)), V(1.0, 4.3, 0), 38)
    h.updateMatrixWorld(true)
    burst(SPRG.spark, t, d * 0.62, cardWorld(cards.hero), { spread: 2.2, up: 0.6, size: 0.35, life: 1.1, gravity: -1 })
    drift(SPRG.motes, t, V(0, 5, 0), { w: 10, h: 6, d: 4, size: 0.12, opacity: 0.5 })
    focusOn(V(0, 4.4, 0), 'street', 0.0012)
  },
  cardBack(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.1)
    pose(h, { ...idle(t), ...handUp(1), face: 'curious' })
    cards.hero.visible = true
    cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, Math.sin(t * 1.4) * 0.22, Math.sin(t * 2) * 0.05)
    setCard(cards.hero, { back: cardBackTex, glow: 0.25 })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeInOut(t / d)
    camera.position.set(cw.x + lerp(1.4, 0.6, k), cw.y + 0.5, cw.z + lerp(4.2, 3.2, k))
    camera.fov = 34; camera.updateProjectionMatrix()
    camera.lookAt(cw.x - 0.1, cw.y + 0.15, cw.z)
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.004
    drift(SPRG.motes, t, cw, { w: 3, h: 3, d: 2, size: 0.05, opacity: 0.8, speed: 0.4 })
  },
  demoFlip(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const a = show('m1', 'street', -2.0, 0, 0, Math.PI / 2 - 0.35)
    const b = show('m2', 'street', 2.0, 0, 0, -Math.PI / 2 + 0.35)
    const fk = easeInOut((t - d * 0.72) / 0.45)
    const happy = t > d * 0.75
    pose(a, { ...idle(t, 1), ...handUp(1), face: happy ? 'happy' : 'smile' })
    pose(b, { ...idle(t, 2), ...handUp(1), face: happy ? 'happy' : 'shy' })
    // a little "align" nod each, a beat apart
    a.userData.head.rotation.x = t > d * 0.3 && t < d * 0.42 ? 0.18 : 0
    b.userData.head.rotation.x = t > d * 0.55 && t < d * 0.67 ? 0.18 : 0
    for (const c of [cards.m1, cards.m2]) { c.visible = true; c.scale.setScalar(1); uprightCard(c, fk * Math.PI, 0); setCard(c, { glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 1.2 }) }
    cam('street', V(lerp(-1.5, 1.5, t / d), 5.4, 17), V(0, 4.0, 0), 36)
    a.updateMatrixWorld(true); b.updateMatrixWorld(true)
    burst(SPRG.spark, t, d * 0.8, cardWorld(cards.m1), { spread: 2.5, size: 0.4, seed: 3 })
    burst(SPRG.spark2, t, d * 0.8, cardWorld(cards.m2), { spread: 2.5, size: 0.4, seed: 7 })
    focusOn(V(0, 4, 0), 'street', 0.0008)
  },
  sister(t, d) {
    light('day', V(0, 3, 0))
    sets.street.visible = true
    const s = show('sister', 'street', -6, 0, 2, 0.25)
    const jump = Math.max(0, Math.sin(t * 7)) * 0.9 * (t > 0.2 ? 1 : 0)
    pose(s, { ...idle(t, 3), armRx: -1.35, armRz: 0.45, armLx: -0.4, armLz: -0.8 - Math.sin(t * 7) * 0.2, face: 'laugh', bob: jump, legLx: jump * 0.4, legRx: -jump * 0.4 })
    cards.sister.visible = true
    cards.sister.scale.setScalar(1)
    uprightCard(cards.sister, Math.PI, 0.1)
    setCard(cards.sister, { glow: 0.7 })
    cam('street', V(-4.3, 5.6, 11.5), V(-5.5, 5.4, 2), 40)
    s.updateMatrixWorld(true)
    burst(SPRG.confetti, t, 0.05, V(-6, 9, 2).add(sets.street.position), { spread: 6, up: 1, size: 0.25, life: 2.4, gravity: -3, colors: ['#ff5a8a', '#f2cf4a', '#5ad1ff', '#7cff8a', '#b06cff'] })
    burst(SPRG.spark, t, 0.1, cardWorld(cards.sister), { spread: 1.8, size: 0.35, life: 1.6, seed: 4 })
    focusOn(V(-6, 5, 2), 'street', 0.0012)
  },
  friend(t, d) {
    light('day', V(0, 3, 0))
    sets.street.visible = true
    const f = show('friend', 'street', 7, 0, 1, -0.3)
    pose(f, { ...idle(t, 4), armRx: -1.5, armRz: 0.35, armLx: -1.5, armLz: -0.35, face: 'sly', tilt: 0.1 + Math.sin(t * 2) * 0.04 })
    for (const c of [cards.friend, cards.friend2]) { c.visible = true; c.scale.setScalar(1) }
    uprightCard(cards.friend, Math.PI, -0.18)
    uprightCard(cards.friend2, Math.PI, 0.18)
    setCard(cards.friend, { glow: 0.35 }); setCard(cards.friend2, { glow: 0.35 })
    const k = easeOut(t / 0.5)
    cam('street', V(lerp(9.5, 8.6, k), 4.6, lerp(12, 9.5, k)), V(7, 4.2, 1), 38)
    drift(SPRG.motes, t, V(7, 5, 1), { w: 6, h: 6, d: 3, size: 0.1, opacity: 0.6 })
    focusOn(V(7, 4.5, 1), 'street', 0.0012)
  },
  alone(t, d) {
    light('dusk', V(30, 3, -4))
    sets.street.visible = true
    const h = show('hero', 'street', 30, 0.15, -3.6, 0)
    // sitting: legs forward, slumped
    pose(h, { ...idle(t, 5, 0.4), legLx: -1.5, legRx: -1.5, armRx: -0.7, armLx: -0.7, armLz: 0.1, armRz: -0.1, nod: 0.18, face: 'sad', lean: 0.08 })
    h.userData.body.position.y = -1.0
    cards.hero.visible = true
    cards.hero.scale.setScalar(0.9)
    uprightCard(cards.hero, 0, 0)
    cards.hero.rotation.x = -1.0
    setCard(cards.hero, { back: cardBackTex, glow: 0 })
    const k = easeInOut(t / d)
    cam('street', V(30 + lerp(1.5, 3.5, k), lerp(4.6, 6.5, k), lerp(8, 15, k)), V(30, 3.4, -3.6), 36)
    for (const [i, s] of SPRG.leaves.children.entries()) { s.visible = true; const p = (hash(i) + t * 0.12 * (0.6 + hash(i + 1))) % 1; s.position.set(30 + (hash(i + 2) - 0.5) * 16 + Math.sin(t * 2 + i) * 0.8, 12 - p * 13, -4 + (hash(i + 3) - 0.3) * 8); s.scale.setScalar(0.35); s.material.rotation = t * 2 + i }
    focusOn(V(30, 3.6, -3.6), 'street', 0.001)
  },
  paint(t, d) {
    light('room', V(0, 3, -400))
    sets.room.visible = true
    const h = show('hero', 'room', 0, 0, 2.4, Math.PI)
    // seen from the desk side: hero faces the camera across the desk
    h.rotation.y = Math.PI
    h.position.z = sets.room.position.z + 3.0
    const brush = Math.sin(t * 9)
    pose(h, { ...idle(t, 6, 0.3), armRx: -1.0 + brush * 0.1, armRz: 0.3 + brush * 0.15, armLx: -0.9, armLz: -0.15, nod: 0.12, face: t < d * 0.4 ? 'sly' : 'grin', bob: -0.9 })
    h.userData.legL.rotation.x = -1.5; h.userData.legR.rotation.x = -1.5
    // the card lies on the desk, face down, being painted
    const c = cards.hero
    sets.room.add(c)
    c.visible = true
    c.scale.setScalar(1.4)
    c.position.set(0, 3.9, 0.4)
    c.rotation.set(-Math.PI / 2 + 0.35, 0, 0)
    setCard(c, { back: paintCard(painted, clamp((t - 0.2) / (d * 0.85))), glow: 0 })
    const k = easeInOut(t / d)
    cam('room', V(lerp(1.6, 1.0, k), lerp(5.9, 5.6, k), lerp(-5.6, -4.8, k)), V(0, 4.7, 1.8), 44)
    focusOn(V(0, 4.4, 1.2), 'room', 0.0012)
  },
  crowd(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0)
    pose(h, { ...idle(t, 7), armRx: -2.7, armRz: 0.1, face: t > 0.4 ? 'shock' : 'grin', bob: 0 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1.15)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0.4 })
    crowdKeys.forEach((_, i) => {
      const [px, pz] = [[-3.6, -1.2], [3.6, -1.0], [-6.2, -3.4], [6.0, -3.2], [-2.0, -5.2], [2.4, -5.6], [-8.4, -0.4], [8.6, -0.6]][i]
      const arrive = easeOut((t - i * 0.06) / 0.5)
      const c = show('c' + i, 'street', px * lerp(1.7, 1, arrive), 0, pz, 0)
      c.rotation.y = Math.atan2(-px, 6 - pz) * 0.75
      const hop = Math.max(0, Math.sin(t * 8 + i)) * 0.4
      pose(c, { ...idle(t, i), armRx: -2.4 - Math.sin(t * 8 + i) * 0.3, armLx: -2.4 + Math.sin(t * 8 + i) * 0.3, armRz: 0.3, armLz: -0.3, face: 'heart', bob: hop, ...(arrive < 1 ? walk(t, 1.4) : {}) })
    })
    cam('street', V(0, 6.2 - easeOut(t / d) * 0.6, 19 - easeOut(t / d) * 3), V(0, 4.8, -1.5), 44)
    h.updateMatrixWorld(true)
    SPRG.heart.children.forEach((s, i) => {
      const k = ((t * 0.7 + hash(i)) % 1)
      s.visible = true
      s.position.set((hash(i + 1) - 0.5) * 16, 4 + k * 8, (hash(i + 2) - 0.5) * 8)
      s.scale.setScalar(0.6 * Math.sin(k * Math.PI) + 0.1)
    })
    focusOn(V(0, 4.6, 0), 'street', 0.0006)
  },
  noFlip(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.1)
    pose(h, { ...idle(t), ...handUp(1), face: 'worried' })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    // it tries to flip, then falls back, twice
    const tryFlip = Math.max(0, Math.sin(t * 7)) * 0.38 * (t < d * 0.8 ? 1 : 0)
    uprightCard(cards.hero, tryFlip, Math.sin(t * 30) * 0.03 * (tryFlip > 0.1 ? 1 : 0))
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0 })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeOut(t / d)
    camera.position.set(cw.x + 0.9, cw.y + 0.4, cw.z + lerp(4.4, 3.4, k))
    camera.fov = 36; camera.updateProjectionMatrix()
    camera.lookAt(cw.x - 0.35, cw.y + 0.35, cw.z)
    SPRG.question.children.forEach((s, i) => { const kk = clamp((t - 0.3 - i * 0.25) / 0.3); s.visible = kk > 0; s.position.set(cw.x - 1.2 + i * 1.1, cw.y + 1.6 + i * 0.15 + Math.sin(t * 4 + i) * 0.08, cw.z + 0.3); s.scale.setScalar(0.55 * back(kk)) })
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.003
  },
  turnAway(t, d) {
    light('gloomy', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0)
    pose(h, { ...idle(t, 8, 0.3), armRx: -0.6, face: 'sad', nod: 0.15 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0 })
    crowdKeys.forEach((_, i) => {
      const a = (i / crowdKeys.length) * Math.PI * 2 + 0.3
      const r = 5 + t * 2.2 + hash(i) * 2
      const c = show('c' + i, 'street', Math.cos(a) * r, 0, Math.sin(a) * r, 0)
      c.rotation.y = Math.atan2(Math.cos(a), Math.sin(a))
      pose(c, { ...walk(t + i, 1), face: 'down' })
    })
    const k = easeInOut(t / d)
    cam('street', V(0.5, lerp(11, 13, k), lerp(9, 12, k)), V(0, 3, 0), 44)
    focusOn(V(0, 3, 0), 'street', 0.0004)
  },
  clock(t, d) {
    light('night', V(0, 10, 0).add(sets.plaza.position))
    sets.plaza.visible = true
    const h = show('hero', 'plaza', 0, 0, 10, Math.PI)
    pose(h, { ...idle(t, 9, 0.4), face: 'shock', nod: -0.35 })
    // camera rises from behind the hero to the clock and the swirl of cards
    const k = easeInOut(t / d)
    cam('plaza', V(lerp(3, 1.5, k), lerp(5, 9, k), lerp(21, 24, k)), V(0, lerp(14, 26, k), -12), 46)
    const sw = SPRG.swirl.swirl
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler()
    const o = sets.plaza.position
    for (let i = 0; i < sw.count; i++) {
      const lift = clamp((t - 0.2 - hash(i) * 0.6) / 1.6)
      const a = hash(i * 3) * Math.PI * 2 + t * (0.9 + hash(i) * 0.6)
      const r = 4 + hash(i + 7) * 16
      const y = lerp(0.5, 18 + hash(i + 2) * 20, easeOut(lift))
      e.set(t * 2 + i, a + t * 3, t + i * 0.3)
      q.setFromEuler(e)
      m.compose(V(o.x + Math.cos(a) * r, y, o.z - 12 + Math.sin(a) * r * 0.7), q, V(1, 1, 1).multiplyScalar(0.9 * lift + 0.001))
      sw.setMatrixAt(i, m)
    }
    sw.instanceMatrix.needsUpdate = true
    sw.visible = true
    drift(SPRG.motes, t, V(0, 18, -10).add(o), { w: 30, h: 30, d: 10, size: 0.3, opacity: 0.9, speed: 0.2 })
    focusOn(V(0, 22, -12), 'plaza', 0.0002)
  },
  busStop(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.25)
    const h = show('hero', 'bus', -3.2, 0, 4.6, Math.PI - 0.5)
    const up = easeOut((t - d * 0.32) / 0.5)
    pose(g, { ...idle(t, 10), ...handUp(up), face: t > d * 0.32 ? 'shy' : 'down' })
    pose(h, { ...idle(t, 11), face: 'curious' })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0, 0.05)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0.3 * up })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(-4.6, -4.0, k), 6.0, lerp(10.5, 9.0, k)), V(0.6, 4.5, -1.6), 36)
    drift(SPRG.motes, t, V(0, 7, -1).add(sets.bus.position), { w: 8, h: 4, d: 4, size: 0.06, opacity: 0.6, speed: 0.15 })
    focusOn(V(1.2, 4.5, -1.6), 'bus', 0.0018)
  },
  girlConfess(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.1)
    pose(g, { ...idle(t, 12), ...handUp(1), armRx: -1.2, face: 'shy', tilt: 0.12, look: -0.1 })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0.25, 0.05)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0.15 })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(0.2, 0.6, k), 5.0, lerp(7.2, 6.2, k)), V(1.4, 4.3, -1.6), 36)
    focusOn(V(1.2, 4.6, -1.6), 'bus', 0.002)
  },
  scrape(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const h = show('hero', 'bus', -2.2, 0, 1.4, 0.35)
    const s = Math.sin(t * 14)
    pose(h, { ...idle(t, 13, 0.3), armRx: -1.35, armRz: 0.2, armLx: -1.3 + s * 0.08, armLz: -0.45 + s * 0.12, face: 'determined', nod: 0.12 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0.05)
    const sk = clamp((t - 0.2) / (d * 0.75))
    setCard(cards.hero, { back: paintCard(painted, 1, sk), glow: 0.4 * smooth((sk - 0.8) / 0.2) })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeInOut(t / d)
    camera.position.set(cw.x + lerp(-1.6, -1.0, k), cw.y + 0.9, cw.z + lerp(5.4, 4.6, k))
    camera.fov = 38; camera.updateProjectionMatrix()
    camera.lookAt(cw.x + 0.3, cw.y + 0.5, cw.z)
    // paint flakes come off as it's scraped
    SPRG.flakes.children.forEach((sp, i) => {
      const tt = (t * 1.6 + hash(i)) % 1
      sp.visible = sk > 0.02 && sk < 0.99
      sp.position.set(cw.x + (hash(i + 1) - 0.5) * 1.4 + tt * 1.8 * (hash(i + 2) - 0.3), cw.y + (hash(i + 3) - 0.5) * 2 - tt * tt * 3, cw.z + 0.2 + tt)
      sp.scale.setScalar(0.09 + hash(i + 4) * 0.08)
      sp.material.color.set(['#ffb3c8', '#ffc4a8', '#ffd0dc'][i % 3])
      sp.material.opacity = 1 - tt
    })
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.0025
  },
  honest(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const h = show('hero', 'bus', -2.2, 0, 1.4, 0.45)
    pose(h, { ...idle(t, 14), armRx: -0.4, armLx: -1.9 + Math.sin(t * 3) * 0.05, armLz: -0.9, face: t < d * 0.45 ? 'blush' : 'shy', tilt: -0.08, nod: -0.06 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: cardBackTex, glow: 0 })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(-0.6, -0.9, k), lerp(5.6, 5.4, k), lerp(8.6, 7.4, k)), V(-2.2, 4.8, 1.4), 36)
    // stars blink on over his head as he says it
    const o = sets.bus.position
    SPRG.spark.children.forEach((s, i) => {
      const on = clamp((t - d * 0.55 - hash(i) * 0.6) / 0.25)
      s.visible = on > 0 && i < 26
      s.position.set(o.x - 2.2 + (hash(i + 1) - 0.5) * 7, 7 + hash(i + 2) * 4, o.z + 1.4 + (hash(i + 3) - 0.5) * 3)
      const tw = 0.7 + 0.3 * Math.sin(t * 6 + i)
      s.scale.setScalar(0.35 * back(on) * tw)
      s.material.opacity = 1
    })
    focusOn(V(-2.2, 4.8, 1.4), 'bus', 0.0018)
  },
  laugh(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.25)
    const shake = Math.abs(Math.sin(t * 16)) * 0.12
    pose(g, { ...idle(t, 15), armRx: -0.9, armLx: -1.6, armLz: -0.5, face: 'laugh', bob: shake, nod: -0.1 + shake * 0.6, tilt: 0.1 })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0, 0)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0 })
    cam('bus', V(0.0, 5.3, 6.4 - t * 0.6), V(1.3, 4.7, -1.6), 36)
    focusOn(V(1.2, 4.7, -1.6), 'bus', 0.002)
  },
  bothFlip(t, d, endT) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.5, 0, 0.6, -Math.PI / 2 + 0.35)
    const h = show('hero', 'bus', -1.9, 0, 0.6, Math.PI / 2 - 0.35)
    const fT = d * 0.4
    const fk = easeInOut((t - fT) / 0.55)
    const after = t > fT + 0.3
    pose(g, { ...idle(t, 16), armRx: -1.05, armRz: 0.2, face: after ? 'happy' : 'shy' })
    pose(h, { ...idle(t, 17), armRx: -1.05, armRz: 0.2, face: after ? 'happy' : 'blush' })
    if (after) { const j = Math.max(0, Math.sin((t - fT) * 8)) * 0.35 * clamp(1 - (t - fT - 0.3) / 1.2); g.userData.body.position.y += j; h.userData.body.position.y += j }
    for (const c of [cards.hero, cards.girl]) { c.visible = true; c.scale.setScalar(1); uprightCard(c, fk * Math.PI, 0) }
    setCard(cards.hero, { back: cardBackTex, glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 0.9 + (after ? 0.2 : 0) })
    setCard(cards.girl, { back: cardBackTex, glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 0.9 + (after ? 0.2 : 0) })
    g.updateMatrixWorld(true); h.updateMatrixWorld(true)
    // camera: a slow orbit, then it cranes up into the stars for the sign-off
    const total = d + (endT || 0)
    const k = easeInOut(t / total)
    const crane = smooth((t - d) / Math.max(0.1, endT || 0.1))
    const ang = lerp(-0.25, 0.3, k)
    const o = sets.bus.position
    camera.position.set(o.x - 0.2 + Math.sin(ang) * 11, lerp(5.2, 8.5, crane), o.z + 0.6 + Math.cos(ang) * lerp(11, 15, crane))
    camera.fov = 38; camera.updateProjectionMatrix()
    camera.lookAt(o.x - 0.2, lerp(4.4, 7.5, crane), o.z + 0.6)
    burst(SPRG.spark, t, fT + 0.2, cardWorld(cards.hero), { spread: 3, up: 1, size: 0.3, life: 1.8, seed: 11 })
    burst(SPRG.spark2, t, fT + 0.2, cardWorld(cards.girl), { spread: 3, up: 1, size: 0.3, life: 1.8, seed: 13 })
    burst(SPRG.confetti, t, fT + 0.25, V(-0.2, 9, 0.6).add(o), { spread: 7, up: 1, size: 0.22, life: 3, gravity: -2.4, colors: ['#f2cf4a', '#c8b4ff', '#ffffff', '#ff8fb0'], seed: 5 })
    drift(SPRG.motes, t, V(-0.2, 8, 0.6).add(o), { w: 18, h: 10, d: 8, size: 0.14, opacity: after ? 0.9 : 0.3, speed: 0.15 })
    skyMat.uniforms.stars.value = 1 + (after ? 0.8 : 0)
    focusOn(V(-0.2, 4.5, 0.6), 'bus', 0.0009)
  },
}

// ---------------------------------------------------------------- captions
const ACCENT = new Set(['card', 'card.', 'flips', 'flipped', 'flipped,', 'align', 'aligns', 'aligned', 'aligning', 'mutual', 'eleven', 'stars.', 'honest', 'thing.', 'face'])
function drawCaption(word, k, accent) {
  if (!word) return
  const s = 0.82 + 0.18 * back(k / 0.12)
  octx.save()
  octx.translate(W / 2, H * 0.635)
  octx.scale(s, s)
  octx.font = '900 116px Poppins, sans-serif'
  octx.textAlign = 'center'
  octx.textBaseline = 'middle'
  let size = 116
  while (octx.measureText(word).width > W * 0.84 && size > 60) { size -= 4; octx.font = `900 ${size}px Poppins, sans-serif` }
  octx.lineJoin = 'round'
  octx.shadowColor = 'rgba(0,0,0,0.45)'
  octx.shadowOffsetY = 8
  octx.shadowBlur = 0
  octx.strokeStyle = '#0b0b0f'
  octx.lineWidth = 26
  octx.strokeText(word, 0, 0)
  octx.shadowColor = 'transparent'
  octx.fillStyle = accent ? '#ffd84a' : '#ffffff'
  octx.fillText(word, 0, 0)
  octx.restore()
}
function vignette() {
  const g = octx.createRadialGradient(W / 2, H * 0.48, H * 0.32, W / 2, H * 0.5, H * 0.75)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(0,0,0,0.38)')
  octx.fillStyle = g
  octx.fillRect(0, 0, W, H)
}
function signOff(k) {
  if (k <= 0) return
  octx.save()
  octx.globalAlpha = smooth(k)
  octx.textAlign = 'center'
  octx.fillStyle = '#fff3d6'
  octx.shadowColor = 'rgba(10,6,30,0.8)'
  octx.shadowBlur = 24
  octx.font = 'italic 500 132px "EB Garamond", serif'
  octx.fillText(script.end || 'come align', W / 2, H * 0.36)
  octx.font = '400 30px "Space Mono", monospace'
  octx.fillStyle = '#f2cf4a'
  octx.font = '400 34px "Space Mono", monospace'
  octx.fillText('JOIN THE BETA  ·  ✦', W / 2, H * 0.36 + 90)
  octx.restore()
}

// ---------------------------------------------------------------- timeline
window.setup = async (s, opts) => {
  script = s
  const ff = await Promise.all((opts.fonts || []).map(([fam, url, style, weight]) => new FontFace(fam, `url(${url})`, { style, weight }).load()))
  ff.forEach((f) => document.fonts.add(f))
  await document.fonts.ready
  fontsReady = true
  build()
  // scene starts from the voice timings; each line keeps a breath after it
  const LEAD = 0.12
  const GAP = 0.16
  let t = LEAD
  const words = []
  timeline = s.scenes.map((sc, i) => {
    const v = opts.voice.scenes[i]
    const start = i === 0 ? 0 : t
    const vStart = t
    const ws = sc.text.split(/\s+/)
    ws.forEach((w, j) => words.push({ w, a: vStart + v.words[j][0], b: vStart + v.words[j][1], scene: i }))
    t += v.dur + GAP
    return { shot: sc.shot, start, end: t, vStart }
  })
  const END = s.endHold ?? 2.8
  const duration = t + END
  timeline[timeline.length - 1].endHold = END
  // a word stays up until the next one starts (or a beat after it's said)
  words.forEach((w, i) => { const n = words[i + 1]; w.until = n && n.a - w.b < 0.45 ? n.a : w.b + 0.3 })
  timeline.words = words
  timeline.duration = duration
  return { duration, frames: Math.round(duration * FPS), words: words.map((w) => ({ w: w.w, a: w.a, b: w.b })), scenes: timeline.map((x) => ({ shot: x.shot, start: x.start, end: x.end, vStart: x.vStart })) }
}

window.frame = (T) => {
  hideCast()
  SPRG.swirl.swirl.visible = false
  // cards go back to their hands each frame (some shots borrow them)
  for (const [k, c] of Object.entries(cards)) { if (c.parent !== c.userData.arm) c.userData.arm.add(c); c.position.set(0, -2.0, 0.55); c.visible = false; c.scale.setScalar(1) }
  let idx = timeline.findIndex((x) => T >= x.start && T < x.end)
  if (idx < 0) idx = timeline.length - 1
  const sc = timeline[idx]
  const t = T - sc.start
  const d = sc.end - sc.start
  skyMat.uniforms.time.value = T
  SHOTS[sc.shot](t, d, sc.endHold)
  // a tiny camera punch-in right after every cut
  const punch = 1 - easeOut(t / 0.35)
  if (idx > 0 && punch > 0) { camera.fov *= 1 - 0.035 * punch; camera.updateProjectionMatrix() }
  sky.position.copy(camera.position)
  composer.render()
  octx.drawImage(glCanvas, 0, 0)
  vignette()
  const w = timeline.words.find((x) => T >= x.a - 0.03 && T < x.until)
  if (w) {
    const clean = w.w.replace(/[.,!?;:]+$/g, '')
    drawCaption(clean, T - w.a + 0.03, ACCENT.has(w.w.toLowerCase()))
  }
  if (sc.endHold) signOff((T - (sc.end)) / 0.6)
  return out.toDataURL('image/jpeg', 0.92)
}
