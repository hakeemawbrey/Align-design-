// Profile pictures for the account, built from the reels' own cast so the
// avatar and the videos read as one thing. Square, centred, no text: Instagram
// shows it as a ~110px circle, so it has to be one bold shape.
//
//   star   one big gold star with eyes, looking at you
//   aura   the holographic figure in its aura, a gold star over its head
//   popup  the star inside a Windows-98 window, like every reel's dialog
//   gaze   the figure from behind, looking up at a giant star
import * as THREE from 'three'
import { makeRng } from './rng.js'
import { makeFigure, makeSpecies } from './actors.js'
import { loadFonts } from './reel.js'

const SIZE = 1080
const GOLD = '#ffd23a'

// A night-sky backdrop: deep violet to indigo, a soft glow behind the subject,
// and a scatter of small stars.
function backdrop(seed, { glow = '#6b3cff', top = '#140a33', bottom = '#05040f' } = {}) {
  const c = document.createElement('canvas')
  c.width = c.height = 1024
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, 1024)
  g.addColorStop(0, top)
  g.addColorStop(1, bottom)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1024, 1024)
  const r = ctx.createRadialGradient(512, 500, 0, 512, 500, 520)
  r.addColorStop(0, glow + 'aa')
  r.addColorStop(0.45, glow + '33')
  r.addColorStop(1, glow + '00')
  ctx.fillStyle = r
  ctx.fillRect(0, 0, 1024, 1024)
  const rng = makeRng('sky/' + seed)
  for (let i = 0; i < 260; i++) {
    const x = rng.range(0, 1024), y = rng.range(0, 1024)
    const s = rng.chance(0.08) ? rng.range(1.6, 2.6) : rng.range(0.5, 1.3)
    ctx.fillStyle = `rgba(255,255,255,${rng.range(0.25, 0.9)})`
    ctx.beginPath()
    ctx.arc(x, y, s, 0, Math.PI * 2)
    ctx.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function grainAndVignette(ctx, seed) {
  const rng = makeRng('grain/' + seed)
  const img = ctx.getImageData(0, 0, SIZE, SIZE)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (rng.next() - 0.5) * 14
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)
  const v = ctx.createRadialGradient(SIZE / 2, SIZE / 2, SIZE * 0.32, SIZE / 2, SIZE / 2, SIZE * 0.74)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, SIZE, SIZE)
}

// The reels' popup, square, with the 3D render inside its body.
function popupFrame(ctx, art, label) {
  // small enough that the whole window sits inside Instagram's circle crop
  const w = SIZE * 0.6, h = SIZE * 0.6
  const x = (SIZE - w) / 2, y = (SIZE - h) / 2
  const title = Math.round(h * 0.13)
  const u = 6
  ctx.fillStyle = 'rgba(0,0,0,0.35)'
  ctx.fillRect(x + 14, y + 18, w, h)
  ctx.fillStyle = '#d9dde6'
  ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(x, y, w, u)
  ctx.fillRect(x, y, u, h)
  ctx.fillStyle = '#5b6478'
  ctx.fillRect(x, y + h - u, w, u)
  ctx.fillRect(x + w - u, y, u, h)
  const g = ctx.createLinearGradient(x, 0, x + w, 0)
  g.addColorStop(0, '#1747d6')
  g.addColorStop(1, '#5b94ff')
  ctx.fillStyle = g
  ctx.fillRect(x + u + 2, y + u + 2, w - 2 * u - 4, title)
  ctx.fillStyle = '#ffffff'
  ctx.font = `700 ${Math.round(title * 0.52)}px "ZPoppins", sans-serif`
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, x + u + 2 + title * 0.35, y + u + 2 + title / 2 + 1)
  // the two title-bar buttons
  const bs = title * 0.7
  const by = y + u + 2 + (title - bs) / 2
  const btn = (bx, red) => {
    ctx.fillStyle = red ? '#e8262b' : '#ffffff'
    ctx.fillRect(bx, by, bs, bs)
    ctx.strokeStyle = red ? '#ffffff' : '#1d4fd8'
    ctx.lineWidth = bs * 0.14
    ctx.beginPath()
    if (red) {
      const m = bs * 0.28
      ctx.moveTo(bx + m, by + m)
      ctx.lineTo(bx + bs - m, by + bs - m)
      ctx.moveTo(bx + bs - m, by + m)
      ctx.lineTo(bx + m, by + bs - m)
      ctx.stroke()
    } else {
      ctx.fillStyle = '#1d4fd8'
      ctx.font = `700 ${Math.round(bs * 0.8)}px "ZPoppins", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('?', bx + bs / 2, by + bs / 2 + bs * 0.05)
    }
  }
  btn(x + w - u - bs * 1.25, true)
  btn(x + w - u - bs * 2.45, false)
  const bx = x + u + 2, byy = y + u + 2 + title + 4
  const bw = w - 2 * u - 4, bh = h - title - 2 * u - 8
  ctx.drawImage(art, (SIZE - bw) / 2, (SIZE - bh) / 2 + title * 0.25, bw, bh, bx, byy, bw, bh)
}

export async function renderPfp(variant = 'star', { seed = 'pfp', label = 'align.exe', aura = { color: '#a35cf0', light: '#dcbcff' } } = {}) {
  await loadFonts()
  const glCanvas = document.createElement('canvas')
  const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(1)
  renderer.setSize(SIZE, SIZE, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  const rng = makeRng('pfp/' + seed)
  scene.add(new THREE.HemisphereLight('#cfd8ff', '#20143a', 1.2))
  const sun = new THREE.DirectionalLight('#ffffff', 1.4)
  sun.position.set(2, 4, 5)
  scene.add(sun)

  // the classic slim, curved ✦
  const spawn = makeSpecies(rng.fork('species'), [], { eyes: 2, inner: 0.28, curve: 0.6, depth: 0.16 })
  const t = 1.3 // a moment where nobody is blinking
  // pos is where the star's centre should be; it hovers inside its group, so
  // place it, measure where it ended up, and shift it there
  const star = (color, size, pos) => {
    const s = spawn(0, rng.fork('s' + pos.x + pos.y), { color })
    s.object.scale.setScalar(size)
    scene.add(s.object)
    s.update(t, {})
    s.object.updateMatrixWorld(true)
    const at = s.object.children[0].getWorldPosition(new THREE.Vector3())
    s.object.position.add(pos.clone().sub(at))
    return s
  }
  const stars = []
  let figure = null

  if (variant === 'star' || variant === 'popup') {
    scene.background = backdrop(seed, { glow: variant === 'popup' ? '#ff9f2e' : '#7a3cff', top: variant === 'popup' ? '#1d0f3a' : '#120833' })
    const s = star(GOLD, variant === 'popup' ? 1.25 : 1.45, new THREE.Vector3(0, 0.05, 0))
    stars.push(s)
    for (const [c, x, y, z, k] of [['#9fd0ff', -1.9, 1.5, -3, 0.5], ['#ff9d2e', 2.0, 1.2, -3.5, 0.45], ['#cfe6ff', 1.7, -1.6, -2.5, 0.35]]) {
      if (variant === 'popup') break
      stars.push(star(c, k, new THREE.Vector3(x, y, z)))
    }
    camera.position.set(0, 0.15, 4.4)
    camera.lookAt(0, 0.15, 0)
  } else if (variant === 'aura') {
    scene.background = backdrop(seed, { glow: aura.color, top: '#0d0824', bottom: '#030208' })
    figure = makeFigure(rng.fork('fig'), { hue: 0.75, skyTop: '#bfa8ff', skyLow: '#1a1030', aura, glyph: '✦' })
    scene.add(figure.object)
    stars.push(star(GOLD, 0.6, new THREE.Vector3(0, 2.45, 0.1)))
    camera.position.set(0, 1.75, 5.2)
    camera.lookAt(0, 1.6, 0)
  } else if (variant === 'gaze') {
    scene.background = backdrop(seed, { glow: '#ff9f2e', top: '#160a30', bottom: '#05040f' })
    figure = makeFigure(rng.fork('fig'), { hue: 0.6, skyTop: '#ffd9a8', skyLow: '#1a1030', aura: { color: '#f39a3a', light: '#ffd09a' }, glyph: '✦' })
    figure.face(Math.PI)
    figure.object.position.set(-0.75, 0, 1.4)
    scene.add(figure.object)
    stars.push(star(GOLD, 1.1, new THREE.Vector3(0.55, 2.55, -1.2)))
    camera.position.set(-0.2, 1.0, 7.2)
    camera.lookAt(0.05, 1.75, 0)
  }

  scene.updateMatrixWorld(true)
  if (figure) figure.update(t, { look: camera.position, power: variant === 'aura' ? 0.85 : 0.6 })
  stars.forEach((s, i) => {
    // look at the camera; in "gaze" the big star looks down at the figure
    const look = variant === 'gaze' ? figure.object.position.clone().add(new THREE.Vector3(0, 1.3, 0)) : camera.position
    // each star blinks on its own clock: find a moment its eyes are open
    const eyesOpen = () => {
      let open = true
      s.object.traverse((o) => {
        if (o.isGroup && o.children.length === 3 && o.scale.y < 0.5) open = false
      })
      return open
    }
    let st = t
    for (const cand of [1.3, 1.9, 2.5, 3.1, 3.7]) {
      s.update(cand, { look, alert: 1, talk: 0 })
      st = cand
      if (eyesOpen()) break
    }
    for (let k = 0; k < 60; k++) s.update(st, { look, alert: 1, talk: 0 })
    // the main star stands upright, facing you
    if (i === 0) s.object.children[0].children[0].rotation.z = 0
  })
  renderer.render(scene, camera)

  const out = document.createElement('canvas')
  out.width = out.height = SIZE
  const ctx = out.getContext('2d')
  if (variant === 'popup') {
    ctx.drawImage(glCanvas, 0, 0)
    // fill the background with the same sky, then the window on top
    const bg = document.createElement('canvas')
    bg.width = bg.height = SIZE
    const bctx = bg.getContext('2d')
    bctx.drawImage(scene.background.image, 0, 0, SIZE, SIZE)
    ctx.drawImage(bg, 0, 0)
    popupFrame(ctx, glCanvas, label)
  } else {
    ctx.drawImage(glCanvas, 0, 0)
  }
  grainAndVignette(ctx, seed)
  renderer.dispose()
  return out.toDataURL('image/png')
}
