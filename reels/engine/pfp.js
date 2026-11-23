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
import { checkerTexture } from './textures.js'

const SIZE = 1080
const GOLD = '#ffc61a'

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

function poolTexture(color) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const col = new THREE.Color(color)
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, `rgba(${rgb},0.55)`)
  g.addColorStop(0.5, `rgba(${rgb},0.18)`)
  g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
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
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200)
  const rng = makeRng('pfp/' + seed)
  const warm = variant === 'popup' || variant === 'gaze'
  const horizon = warm ? '#5a2a6e' : '#3a2380'

  // ---- the world: a checker floor running to a foggy horizon, like the reels
  scene.background = backdrop(seed, { glow: warm ? '#ff9f2e' : '#7a3cff', top: warm ? '#1d0f3a' : '#120833', bottom: horizon })
  scene.fog = new THREE.Fog(horizon, 9, 34)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshPhongMaterial({ map: checkerTexture('#160d33', '#d9d2ff', 2, 70), shininess: 60, specular: '#8a7cff' }),
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)
  // a few low-poly shapes floating in the distance
  const shapes = [() => new THREE.OctahedronGeometry(0.7, 0), () => new THREE.TorusGeometry(0.6, 0.2, 6, 12), () => new THREE.IcosahedronGeometry(0.6, 0)]
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(rng.pick(shapes)(), new THREE.MeshPhongMaterial({ color: rng.pick(['#ff6ad5', '#9fd0ff', '#ffb347', '#b9a3ff']), flatShading: true, shininess: 80 }))
    m.position.set(rng.sign() * rng.range(3, 8), rng.range(1.5, 5), rng.range(-14, -6))
    m.rotation.set(rng.range(0, 3), rng.range(0, 3), 0)
    scene.add(m)
  }

  // ---- light: soft fill, a warm key from the front, a coloured rim from behind
  scene.add(new THREE.HemisphereLight('#b9b0ff', '#1a0f33', 0.55))
  const key = new THREE.DirectionalLight('#fff1d6', 2.2)
  key.position.set(-3, 5, 6)
  scene.add(key)
  const rim = new THREE.DirectionalLight(warm ? '#ff7ad9' : '#5ad8ff', 2.4)
  rim.position.set(4, 3, -5)
  scene.add(rim)

  // chunky, faceted stars so they read as solid objects
  const spawn = makeSpecies(rng.fork('species'), [], { eyes: 2, inner: 0.28, curve: 0.6, depth: 0.32 })
  const t = 1.3 // a moment where nobody is blinking
  // pos is where the star's centre should be; it hovers inside its group, so
  // place it, measure where it ended up, and shift it there
  const star = (color, size, pos) => {
    const s = spawn(0, rng.fork('s' + pos.x + pos.y), { color })
    s.object.scale.setScalar(size)
    scene.add(s.object)
    const body = s.object.children[0]
    // lit gold instead of the reels' self-lit glow: facets, highlights, shadow side
    body.children[0].material = new THREE.MeshPhongMaterial({
      color, emissive: new THREE.Color(color).multiplyScalar(0.4), specular: '#fff6d8', shininess: 90, flatShading: true,
    })
    s.update(t, {})
    s.object.updateMatrixWorld(true)
    const at = body.getWorldPosition(new THREE.Vector3())
    s.object.position.add(pos.clone().sub(at))
    // a pool of its light on the floor below it
    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(1, 32),
      new THREE.MeshBasicMaterial({ map: poolTexture(color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    pool.rotation.x = -Math.PI / 2
    pool.position.set(pos.x, 0.02, pos.z)
    pool.scale.setScalar(size * 1.6)
    scene.add(pool)
    return s
  }
  const stars = []
  let figure = null
  // where each star looks: slightly past the camera, so it turns a little and
  // shows its thickness
  let lookOffset = new THREE.Vector3(-1.4, 0, 0)

  if (variant === 'star' || variant === 'popup') {
    stars.push(star(GOLD, variant === 'popup' ? 1.25 : 1.45, new THREE.Vector3(0, 1.55, 0)))
    if (variant === 'star') {
      stars.push(star('#9fd0ff', 0.45, new THREE.Vector3(-2.2, 2.4, -4)))
      stars.push(star('#ff9d2e', 0.4, new THREE.Vector3(2.4, 2.1, -5)))
    }
    camera.position.set(1.0, 1.05, 4.6)
    camera.lookAt(0, 1.5, 0)
  } else if (variant === 'aura') {
    figure = makeFigure(rng.fork('fig'), { hue: 0.75, skyTop: '#bfa8ff', skyLow: '#1a1030', aura, glyph: '✦' })
    figure.face(0.35)
    scene.add(figure.object)
    stars.push(star(GOLD, 0.5, new THREE.Vector3(0, 2.4, 0.1)))
    camera.position.set(0.9, 1.0, 5.0)
    camera.lookAt(0, 1.45, 0)
  } else if (variant === 'gaze') {
    figure = makeFigure(rng.fork('fig'), { hue: 0.6, skyTop: '#ffd9a8', skyLow: '#1a1030', aura: { color: '#f39a3a', light: '#ffd09a' }, glyph: '✦' })
    figure.face(Math.PI - 0.3)
    figure.object.position.set(-0.8, 0, 1.6)
    scene.add(figure.object)
    stars.push(star(GOLD, 1.25, new THREE.Vector3(0.7, 2.9, -2.4)))
    camera.position.set(-0.4, 0.8, 7.2)
    camera.lookAt(0.1, 1.9, 0)
    lookOffset = new THREE.Vector3(0, 0, 0)
  }

  scene.updateMatrixWorld(true)
  if (figure) figure.update(t, { look: camera.position, power: variant === 'aura' ? 0.85 : 0.6 })
  stars.forEach((s, i) => {
    // look at the camera; in "gaze" the big star looks down at the figure
    const look = variant === 'gaze' ? figure.object.position.clone().add(new THREE.Vector3(0, 1.3, 0)) : camera.position.clone().add(lookOffset)
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
    // keep the halo, but softer, so the star's own shape does the work
    const glow = s.object.children[0].children[1]
    glow.material.opacity *= 0.5
    glow.scale.multiplyScalar(0.75)
  })
  renderer.render(scene, camera)

  const out = document.createElement('canvas')
  out.width = out.height = SIZE
  const ctx = out.getContext('2d')
  if (variant === 'popup') {
    // the world behind, dimmed, and the window on top showing the star
    ctx.drawImage(glCanvas, 0, 0)
    ctx.fillStyle = 'rgba(8,4,20,0.55)'
    ctx.fillRect(0, 0, SIZE, SIZE)
    popupFrame(ctx, glCanvas, label)
  } else {
    ctx.drawImage(glCanvas, 0, 0)
  }
  grainAndVignette(ctx, seed)
  renderer.dispose()
  return out.toDataURL('image/png')
}
