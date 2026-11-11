// Star pause challenge: the scene. Runs in Chromium (render.mjs drives it frame by frame).
// A glossy 3D star tumbles through space; on exactly one frame per round it sits perfectly
// inside the glowing star outline. window.renderFrame(f) draws frame f deterministically.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const CFG = window.REEL
const W = 1080, H = 1920, FPS = CFG.fps

// ───────────── renderer, camera, environment
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1)
renderer.setSize(W, H)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.9
document.getElementById('stage').appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 200)
camera.position.set(0, -0.3, 17.5)
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture

// sky: a painted backdrop (nebula + stars), seeded so every render matches
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }
{
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g = c.getContext('2d'), r = rng(7)
  const base = g.createLinearGradient(0, 0, 0, H)
  base.addColorStop(0, '#0d0820'); base.addColorStop(0.55, '#1a0f3a'); base.addColorStop(1, '#07040f')
  g.fillStyle = base; g.fillRect(0, 0, W, H)
  for (const [x, y, rad, col] of [[200, 520, 700, 'rgba(126,72,220,0.30)'], [900, 1250, 760, 'rgba(220,70,150,0.20)'], [520, 1700, 600, 'rgba(60,90,220,0.22)'], [820, 260, 420, 'rgba(255,190,120,0.10)']]) {
    const n = g.createRadialGradient(x, y, 0, x, y, rad); n.addColorStop(0, col); n.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = n; g.fillRect(0, 0, W, H)
  }
  for (let i = 0; i < 520; i++) {
    const x = r() * W, y = r() * H, s = r() ** 3 * 2.2 + 0.4
    g.fillStyle = `rgba(239,230,214,${0.25 + r() * 0.6})`; g.beginPath(); g.arc(x, y, s, 0, 7); g.fill()
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
  scene.background = tex
}

// drifting dust in front of the backdrop, for depth
const dust = (() => {
  const r = rng(11), n = 260, pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) { pos[i * 3] = (r() - 0.5) * 16; pos[i * 3 + 1] = (r() - 0.5) * 28; pos[i * 3 + 2] = -12 + r() * 16 }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xefe6d6, size: 0.05, transparent: true, opacity: 0.55, depthWrite: false }))
  scene.add(pts); return pts
})()

const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 6, 8); scene.add(key)
const rim = new THREE.DirectionalLight(0xb98cff, 1.6); rim.position.set(-6, -2, -4); scene.add(rim)
scene.add(new THREE.AmbientLight(0x6a5a9a, 0.35))

// ───────────── the star shape and its exact outline
const R = 1.55, r = 0.66, DEPTH = 0.42, BEVEL = 0.07
function starPts(R, r) {
  const p = []
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 5, rad = i % 2 ? r : R
    p.push(new THREE.Vector2(Math.cos(a) * rad, Math.sin(a) * rad))
  }
  return p
}
/** miter-offset a CCW polygon outward by d (keeps the star's corners sharp, so the fit is exact) */
function offset(pts, d) {
  const n = pts.length
  return pts.map((v, i) => {
    const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n]
    const e1 = v.clone().sub(a).normalize(), e2 = b.clone().sub(v).normalize()
    const n1 = new THREE.Vector2(e1.y, -e1.x), n2 = new THREE.Vector2(e2.y, -e2.x)
    const m = n1.clone().add(n2); const k = d / (1 + n1.dot(n2))
    return v.clone().add(m.multiplyScalar(k))
  })
}
const STAR = starPts(R, r)

const starGeo = new THREE.ExtrudeGeometry(new THREE.Shape(STAR), {
  depth: DEPTH, bevelEnabled: true, bevelThickness: 0.1, bevelSize: BEVEL, bevelSegments: 5, curveSegments: 1,
})
starGeo.translate(0, 0, -DEPTH / 2)
starGeo.computeVertexNormals()

const starMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.55, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 0.8 })
const star = new THREE.Mesh(starGeo, starMat)
scene.add(star)

// the slot: a thin glowing frame just outside the star's front silhouette, plus a faint ghost fill
const sil = offset(STAR, BEVEL)                  // the star's silhouette seen head-on
const inner = offset(STAR, BEVEL + 0.035), outerP = offset(STAR, BEVEL + 0.12)
const ringShape = new THREE.Shape(outerP); ringShape.holes.push(new THREE.Path(inner.slice().reverse()))
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, transparent: true, side: THREE.DoubleSide })
const ring = new THREE.Mesh(new THREE.ShapeGeometry(ringShape), ringMat)
const ghostMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide })
const ghost = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(sil)), ghostMat)
const slot = new THREE.Group(); slot.add(ghost, ring); scene.add(slot)
ghost.renderOrder = -1

// ───────────── bloom
const composer = new EffectComposer(renderer)
composer.setPixelRatio(1); composer.setSize(W, H)
composer.addPass(new RenderPass(scene, camera))
const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.9, 0.5, 0.95)
composer.addPass(bloom)
composer.addPass(new OutputPass())

// ───────────── motion
const ease = (x) => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x)
const q = new THREE.Quaternion(), q2 = new THREE.Quaternion()

/** pose of the star at τ seconds from the aligned frame (τ = 0 → exact fit) */
function pose(rd, tau) {
  const { axis, spin, axis2, spin2, path } = rd
  q.setFromAxisAngle(axis, spin * tau)
  q2.setFromAxisAngle(axis2, spin2 * Math.sin(tau * 1.7) )
  star.quaternion.copy(q).multiply(q2)
  star.position.set(
    path.ax * Math.sin(path.wx * tau),
    path.ay * Math.sin(path.wy * tau) + path.vy * tau,
    -path.vz * tau + path.az * (1 - Math.cos(path.wz * tau)),
  )
}

const ROUNDS = CFG.rounds.map((rd) => ({
  ...rd,
  axis: new THREE.Vector3(...rd.axis).normalize(),
  axis2: new THREE.Vector3(...rd.axis2).normalize(),
}))

const $ = (id) => document.getElementById(id)
function overlay(state) {
  document.body.dataset.phase = state.phase
  $('round').textContent = state.round ? `ROUND ${state.round} / ${ROUNDS.length}` : ''
  $('colour').textContent = state.label || ''
  $('colour').style.color = state.color || ''
  document.querySelectorAll('.pip').forEach((p, i) => {
    p.classList.toggle('on', state.round && i < state.round - 1)
    p.classList.toggle('now', state.round === i + 1)
    p.style.setProperty('--c', ROUNDS[i].color)
  })
  $('intro').style.opacity = state.introA ?? 0
  $('outro').style.opacity = state.outroA ?? 0
  $('flash').style.opacity = state.flash ?? 0
  $('hud').style.opacity = state.hudA ?? 1
}

// timeline: intro → rounds → outro
const T = (() => {
  let t = CFG.intro, out = []
  for (const rd of ROUNDS) { out.push({ start: t, end: t + rd.dur }); t += rd.dur }
  return { rounds: out, outroStart: t, total: t + CFG.outro }
})()
window.TOTAL_FRAMES = Math.round(T.total * FPS)
/** the exact frame index each round aligns on (for checks and the answer key) */
window.ALIGN_FRAMES = ROUNDS.map((rd, i) => Math.round((T.rounds[i].start + rd.at) * FPS))

window.renderFrame = (f) => {
  const t = f / FPS
  dust.rotation.y = t * 0.02; dust.position.y = (t * 0.12) % 2
  let i = T.rounds.findIndex((s) => t >= s.start && t < s.end)
  if (t < CFG.intro) {
    // intro: the empty slot breathes in, headline up, the star not here yet
    const a = ease(t / 0.6)
    star.visible = false; slot.visible = true
    slot.scale.setScalar(0.85 + 0.15 * a)
    setColour(ROUNDS[0].color, a)
    overlay({ phase: 'intro', introA: ease(t / 0.35), hudA: 0, round: 0 })
  } else if (i >= 0) {
    const rd = ROUNDS[i], s = T.rounds[i]
    const local = t - s.start
    // the aligned frame is snapped to the frame grid so it lands on a real frame
    const alignT = window.ALIGN_FRAMES[i] / FPS - s.start
    star.visible = true; slot.visible = true; slot.scale.setScalar(1)
    starMat.color.set(rd.color).multiplyScalar(0.82); setColour(rd.color, 1)
    pose(rd, local - alignT)
    const fl = Math.max(0, 1 - local / 0.18) * (i > 0 ? 1 : 0.6)
    overlay({ phase: 'round', round: i + 1, label: rd.label, color: rd.color, flash: fl, introA: Math.max(0, 1 - (t - CFG.intro) / 0.3) })
  } else {
    // outro: the slot fades, the call to action lands
    const lt = t - T.outroStart
    star.visible = false
    slot.visible = true; slot.scale.setScalar(1 + lt * 0.05)
    setColour(ROUNDS[ROUNDS.length - 1].color, Math.max(0, 1 - lt / 0.5))
    overlay({ phase: 'outro', outroA: ease((lt - 0.15) / 0.4), hudA: Math.max(0, 1 - lt / 0.3), flash: Math.max(0, 1 - lt / 0.18) * 0.6, round: ROUNDS.length })
  }
  composer.render()
}

function setColour(hex, a) {
  const c = new THREE.Color(hex)
  ringMat.color.copy(c).multiplyScalar(2.2); ringMat.opacity = a
  ghostMat.color.copy(c); ghostMat.opacity = 0.06 * a
}

window.READY = true
