// One reel = one seed + one line. Builds the world, cast and dialog, and
// renders any moment t (seconds) as a pure function of t, so the player can
// play it live and the exporter can step it frame by frame.
import * as THREE from 'three'
import { makeRng, clamp, easeInOut, smooth } from './rng.js'
import { GLYPH, ELEMENT, BLOB_COLORS, AURA } from './signs.js'
import { buildWorld, pickWorld } from './worlds.js'
import { makeFigure, makeSpecies, makeGlyphSprite } from './actors.js'
import { layoutPopup, drawPopup } from './popup.js'

const POST_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
const POST_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform sampler2D tOverlay;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uFlash;
  uniform float uOverlayOn;
  varying vec2 vUv;
  float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
  void main() {
    vec2 uv = vUv;
    vec2 d = uv - 0.5;
    float ca = 0.0016 + dot(d, d) * 0.004;
    vec3 c;
    c.r = texture2D(tScene, uv + d * ca * 2.0).r;
    c.g = texture2D(tScene, uv).g;
    c.b = texture2D(tScene, uv - d * ca * 2.0).b;
    // gentle contrast + saturation, then vignette
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(vec3(l), c, 1.12);
    c = (c - 0.5) * 1.05 + 0.5;
    c *= 1.0 - smoothstep(0.35, 0.95, length(d * vec2(1.0, 0.8))) * 0.45;
    c += (rand(floor(uv * uRes * 0.5) + fract(uTime * 7.31)) - 0.5) * 0.07;
    c += uFlash;
    vec4 o = texture2D(tOverlay, uv);
    c = mix(c, o.rgb, o.a * uOverlayOn);
    gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    #include <colorspace_fragment>
  }
`

let fontsReady = null
export function loadFonts() {
  if (fontsReady) return fontsReady
  const url = (f) => new URL(`../fonts/${f}`, import.meta.url).href
  const faces = [
    new FontFace('ZPoppins', `url(${url('poppins-latin-600-italic.woff2')})`, { style: 'italic', weight: '600' }),
    new FontFace('ZPoppins', `url(${url('poppins-latin-700-normal.woff2')})`, { style: 'normal', weight: '700' }),
    new FontFace('ZPoppins', `url(${url('poppins-latin-800-italic.woff2')})`, { style: 'italic', weight: '800' }),
    new FontFace('ZSymbols', `url(${url('noto-sans-symbols-symbols-700-normal.woff2')})`, { weight: '700' }),
  ]
  fontsReady = Promise.all(faces.map((f) => f.load().then((ff) => document.fonts.add(ff))))
  return fontsReady
}

export function timelineFor(text) {
  const typeRate = 34
  const tPopup = 1.0
  const typeStart = tPopup + 0.2
  const tTyped = typeStart + text.length / typeRate
  const tClose = tTyped + clamp(text.length * 0.033, 1.7, 3.0)
  const tGlyph = tClose + 0.8
  // the ending holds long enough to read "come align"
  const duration = +(tGlyph + 2.0).toFixed(3)
  const typeTimes = []
  for (let i = 0; i < text.length; i++) if (text[i] !== ' ') typeTimes.push(typeStart + i / typeRate)
  return { tPopup, typeStart, typeRate, tTyped, tClose, tGlyph, duration, typeTimes }
}

export function createReelRenderer(canvas, { width = 1080, height = 1920, internal = 0.5 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(1)
  renderer.setSize(width, height, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const rt = new THREE.WebGLRenderTarget(Math.round(width * internal), Math.round(height * internal), { samples: 4 })
  rt.texture.colorSpace = THREE.SRGBColorSpace

  const overlay = document.createElement('canvas')
  overlay.width = width
  overlay.height = height
  const octx = overlay.getContext('2d')
  const overlayTex = new THREE.CanvasTexture(overlay)
  overlayTex.colorSpace = THREE.SRGBColorSpace
  overlayTex.minFilter = THREE.LinearFilter
  overlayTex.generateMipmaps = false

  const post = new THREE.ShaderMaterial({
    vertexShader: POST_VERT,
    fragmentShader: POST_FRAG,
    uniforms: {
      tScene: { value: rt.texture },
      tOverlay: { value: overlayTex },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(width, height) },
      uFlash: { value: 0 },
      uOverlayOn: { value: 0 },
    },
    depthTest: false,
    depthWrite: false,
  })
  const postScene = new THREE.Scene()
  postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post))
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  let state = null

  function disposeScene(scene) {
    scene.traverse((o) => {
      o.geometry?.dispose?.()
      const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
      for (const m of mats) {
        for (const v of Object.values(m)) if (v?.isTexture) v.dispose()
        m.uniforms && Object.values(m.uniforms).forEach((u) => u.value?.isTexture && u.value.dispose())
        m.dispose()
      }
    })
  }

  async function load(item, { handle = '', brand = true } = {}) {
    await loadFonts()
    if (state) disposeScene(state.scene)
    const seed = item.seed ?? `${item.id || item.text}`
    const rng = makeRng(seed)
    const sign = item.sign
    const scene = new THREE.Scene()
    const worldName = item.world || pickWorld(rng.fork('world'), ELEMENT[sign])
    const world = buildWorld(worldName, { scene, rng: rng.fork('w'), seed: String(seed) })

    const hero = world.hero.clone()
    hero.y = world.heightAt(hero.x, hero.z)
    const aura = AURA[sign]
    // the figure's sheen leans toward its aura so the two read as one
    const auraHue = new THREE.Color(aura.color).getHSL({}).h
    const figure = makeFigure(rng.fork('fig'), {
      hue: (auraHue + rng.range(-0.12, 0.12) + 1) % 1, skyTop: world.skyTop, skyLow: world.skyLow, aura, glyph: GLYPH[sign],
    })
    figure.object.position.copy(hero)
    const dir = new THREE.Vector3(world.stage.x - hero.x, 0, world.stage.z - hero.z).normalize()
    const baseYaw = Math.atan2(dir.x, dir.z)
    figure.face(baseYaw)
    scene.add(figure.object)

    const colors = rng.chance(0.7) ? BLOB_COLORS[sign] : rng.shuffle(BLOB_COLORS[sign])
    const spawn = makeSpecies(rng.fork('species'), colors)
    const crowd = world.spots.map((s, i) => {
      const c = spawn(i, rng.fork('c' + i))
      c.object.position.copy(s.pos)
      c.object.rotation.y = Math.atan2(hero.x - s.pos.x, hero.z - s.pos.z) + rng.range(-0.8, 0.8)
      scene.add(c.object)
      return { ...c, mode: s.mode }
    })

    let speaker = 0
    crowd.forEach((c, i) => {
      if (c.object.position.distanceTo(world.stage) < crowd[speaker].object.position.distanceTo(world.stage)) speaker = i
    })
    const glyph = makeGlyphSprite(GLYPH[sign], aura.color, aura.light)
    scene.add(glyph.object)

    const camera = new THREE.PerspectiveCamera(rng.range(50, 60), width / height, 0.1, 900)
    const side = new THREE.Vector3(-dir.z, 0, dir.x)
    const s = rng.sign()
    const up = new THREE.Vector3(0, 1, 0)
    const at = (base, ...terms) => terms.reduce((v, [vec, k]) => v.addScaledVector(vec, k), base.clone())
    const stageLook = at(world.stage, [up, 0.5])
    const shots = {
      a0: { pos: at(hero, [dir, -4.6], [side, -1.7 * s], [up, 2.7]), look: stageLook },
      a1: { pos: at(hero, [dir, rng.range(-1.2, 0.2)], [side, -1.9 * s], [up, 2.1]), look: at(stageLook, [side, 0.3 * s], [up, -0.2]) },
      b0: { pos: at(hero, [dir, -4.4], [side, 1.7 * s], [up, 1.9]), look: at(hero, [up, 1.55], [dir, 1.6], [side, 0.3 * s]) },
      b1: { pos: at(hero, [dir, -3.7], [side, 1.45 * s], [up, 1.8]), look: at(hero, [up, 1.6], [dir, 1.6], [side, 0.25 * s]) },
    }
    const camYawToFigure = (pos) => Math.atan2(pos.x - hero.x, pos.z - hero.z)
    const turnYaw = camYawToFigure(shots.b1.pos)
    // shortest turn from baseYaw toward camera, but only ~65% of the way
    let dy = turnYaw - baseYaw
    dy = Math.atan2(Math.sin(dy), Math.cos(dy))

    const tl = timelineFor(item.text)
    const popupCtx = octx
    const layout = layoutPopup(popupCtx, width, height, item.text, { side: rng.range(-1, 1) })
    const title = `${sign}.exe`

    state = {
      item, seed, scene, world, figure, crowd, speaker, glyph, camera, shots, tl, layout, title, hero,
      baseYaw, turn: dy * 0.62, handle, brand, aura, noisePhase: rng.range(0, 100), lastOverlay: '',
    }
    return { duration: tl.duration, plan: { seed: String(seed), duration: tl.duration, ...tl }, world: worldName }
  }

  const tmpPos = new THREE.Vector3()
  const tmpLook = new THREE.Vector3()

  function cameraAt(t) {
    const { shots, tl, camera, world, noisePhase } = state
    const tA = tl.tClose - 0.25
    const tB = tl.tClose + 0.75
    if (t < tA) {
      const k = easeInOut(clamp(t / tA))
      tmpPos.lerpVectors(shots.a0.pos, shots.a1.pos, k)
      tmpLook.lerpVectors(shots.a0.look, shots.a1.look, k)
    } else if (t < tB) {
      const k = easeInOut((t - tA) / (tB - tA))
      tmpPos.lerpVectors(shots.a1.pos, shots.b0.pos, k)
      tmpLook.lerpVectors(shots.a1.look, shots.b0.look, k)
      // arc outward a bit so the move swings rather than slides
      tmpPos.y += Math.sin(k * Math.PI) * 0.6
    } else {
      const k = smooth(tB, tl.duration, t)
      tmpPos.lerpVectors(shots.b0.pos, shots.b1.pos, k)
      tmpLook.lerpVectors(shots.b0.look, shots.b1.look, k)
    }
    // handheld
    const n = noisePhase + t
    tmpPos.x += Math.sin(n * 1.3) * 0.035 + Math.sin(n * 2.9) * 0.012
    tmpPos.y += Math.sin(n * 1.7 + 1) * 0.03
    tmpLook.x += Math.sin(n * 0.9 + 2) * 0.05
    tmpLook.y += Math.sin(n * 1.1 + 3) * 0.04
    const ground = world.heightAt(tmpPos.x, tmpPos.z) + 0.5
    if (tmpPos.y < ground) tmpPos.y = ground
    camera.position.copy(tmpPos)
    camera.lookAt(tmpLook)
    camera.rotateZ(Math.sin(n * 0.6) * 0.012)
  }

  // Align's mark: tiny and quiet, the way the carousels carry it.
  // The ending: as the figure realizes, "come align" lands over the scene,
  // in the carousels' type, glowing faintly in the sign's aura colour.
  function drawEnding(k) {
    const { aura } = state
    const cx = width / 2
    const y = height * 0.17
    const size = Math.round(width * 0.115)
    octx.save()
    octx.globalAlpha = k
    octx.textAlign = 'center'
    octx.textBaseline = 'alphabetic'
    octx.font = `italic 800 ${size}px "ZPoppins", sans-serif`
    octx.letterSpacing = `${Math.round(-size * 0.02)}px`
    // rise into place as it fades in
    const yy = y + (1 - k) * size * 0.25
    octx.shadowColor = aura.color
    octx.shadowBlur = width * 0.05
    octx.fillStyle = '#fff7ec'
    octx.fillText('come align', cx, yy)
    octx.shadowColor = 'rgba(0,0,0,0.55)'
    octx.shadowBlur = width * 0.012
    octx.fillText('come align', cx, yy)
    octx.letterSpacing = '0px'
    octx.font = `700 ${Math.round(size * 0.42)}px "ZSymbols", sans-serif`
    octx.shadowColor = aura.color
    octx.shadowBlur = width * 0.03
    octx.fillStyle = aura.light
    octx.fillText('✦', cx, yy + size * 0.62)
    octx.restore()
  }

  function drawMark() {
    octx.save()
    octx.globalAlpha = 0.72
    octx.fillStyle = '#ffffff'
    octx.textAlign = 'center'
    octx.font = `700 ${Math.round(width * 0.024)}px "ZPoppins", "ZSymbols", sans-serif`
    octx.letterSpacing = `${Math.round(width * 0.006)}px`
    octx.shadowColor = 'rgba(0,0,0,0.55)'
    octx.shadowBlur = 8
    octx.fillText('align ✦', width / 2, height * 0.062)
    octx.restore()
  }

  function drawOverlay(t) {
    const { tl, layout, title, item, handle, brand } = state
    let appear = 0
    if (t >= tl.tPopup && t < tl.tClose) appear = clamp((t - tl.tPopup) / 0.1)
    else if (t >= tl.tClose && t < tl.tClose + 0.08) appear = 1 - (t - tl.tClose) / 0.08
    const typed = t < tl.typeStart ? 0 : Math.min(item.text.length, Math.floor((t - tl.typeStart) * tl.typeRate) + 1)
    const ending = Math.round(smooth(tl.tGlyph + 0.15, tl.tGlyph + 0.6, t) * 20) / 20
    const key = `${appear.toFixed(2)}|${typed}|${handle}|${ending}`
    if (key === state.lastOverlay) return
    state.lastOverlay = key
    octx.clearRect(0, 0, width, height)
    // Chromium can skip re-uploading a canvas that was only cleared, so keep
    // one invisible pixel on it and tell the shader whether to use it at all.
    octx.fillStyle = 'rgba(0,0,0,0.01)'
    octx.fillRect(0, 0, 1, 1)
    post.uniforms.uOverlayOn.value = appear > 0 || handle || brand || ending > 0 ? 1 : 0
    // the small top mark gives way to the ending line
    if (brand && ending === 0) drawMark()
    if (handle) {
      octx.save()
      octx.globalAlpha = 0.55
      octx.fillStyle = '#ffffff'
      octx.font = `700 ${Math.round(width * 0.022)}px "ZPoppins", sans-serif`
      octx.shadowColor = 'rgba(0,0,0,0.6)'
      octx.shadowBlur = 6
      octx.fillText(handle, width * 0.05, height * 0.66)
      octx.restore()
    }
    drawPopup(octx, layout, title, item.text, typed, appear)
    if (ending > 0) drawEnding(ending)
    overlayTex.needsUpdate = true
  }

  function renderAt(t) {
    if (!state) return
    const { world, figure, crowd, glyph, tl, camera, hero, baseYaw, turn } = state
    world.update(t)
    cameraAt(t)
    // the figure notices the camera after the dialog closes
    const turnK = easeInOut(smooth(tl.tClose + 0.1, tl.tGlyph + 0.1, t))
    figure.face(baseYaw + turn * turnK)
    const hopP = (t - tl.tGlyph) / 0.45
    figure.object.updateMatrixWorld(true)
    figure.update(t, {
      look: turnK > 0.2 ? camera.position : state.world.stage.clone().setY(hero.y + 1.2),
      hop: hopP,
      // the aura is there all along, and surges when the sign lands
      power: smooth(tl.tGlyph - 0.15, tl.tGlyph + 0.25, t) * (1 - smooth(tl.tGlyph + 0.6, tl.duration + 0.4, t) * 0.35) + smooth(tl.tPopup, tl.tClose, t) * 0.12,
      burst: t - tl.tGlyph,
    })
    const alert = smooth(tl.tPopup, tl.tPopup + 0.6, t) * (1 - smooth(tl.tClose, tl.tClose + 1, t) * 0.5)
    const lookAt = t < tl.tClose ? camera.position : figure.object.position
    // the star nearest the middle speaks the line: its mouth moves with the typing
    const typing = t >= tl.typeStart && t < tl.tTyped + 0.1
    const talk = typing ? Math.max(0, Math.sin((t - tl.typeStart) * 17)) * 0.9 : 0
    crowd.forEach((c, i) => c.update(t, { mode: c.mode, look: lookAt, alert, talk: i === state.speaker ? talk : 0 }))
    figure.object.updateMatrixWorld(true)
    glyph.update(t - tl.tGlyph, figure.headTop())

    renderer.setRenderTarget(rt)
    renderer.render(state.scene, camera)
    renderer.setRenderTarget(null)
    drawOverlay(t)
    post.uniforms.uTime.value = t
    post.uniforms.uFlash.value = Math.max(0, 1 - Math.abs(t - tl.tGlyph) / 0.06) * 0.08
    renderer.render(postScene, postCam)
  }

  return {
    load,
    renderAt,
    get state() {
      return state
    },
    canvas,
    dispose() {
      if (state) disposeScene(state.scene)
      rt.dispose()
      renderer.dispose()
    },
  }
}
