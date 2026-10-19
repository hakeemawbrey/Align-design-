// The cast: the shiny little figure (the viewer) and the blob creatures with
// eyes and antennas (everyone else).
import * as THREE from 'three'
import { clamp, easeOutBack, smooth } from './rng.js'

// ---------- the figure ----------

const HOLO_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const HOLO_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uHue;
  uniform float uMode;     // 0 holo, 1 chrome, 2 candy
  uniform vec3 uTint;
  uniform vec3 uSkyTop;
  uniform vec3 uSkyLow;
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  vec3 hsv(float h, float s, float v) {
    vec3 k = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return v * mix(vec3(1.0), k, s);
  }
  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(vView);
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.0);
    vec3 r = reflect(-v, n);
    vec3 env = mix(uSkyLow, uSkyTop, smoothstep(-0.3, 0.6, r.y));
    vec3 L = normalize(vec3(0.4, 0.9, 0.5));
    float diff = 0.55 + 0.45 * dot(n, L);
    float spec = pow(max(dot(reflect(-L, n), v), 0.0), 28.0);
    float swirl = sin(vLocal.y * 9.0 + vLocal.x * 6.0 + uTime * 0.6) * 0.5
                + sin(atan(vLocal.z, vLocal.x) * 3.0 + vLocal.y * 4.0) * 0.35;
    vec3 col;
    if (uMode < 0.5) {
      float h = uHue + dot(n, vec3(0.25, 0.45, 0.2)) + fres * 0.9 + swirl * 0.22;
      col = hsv(fract(h), 0.72, 1.0) * diff;
      col = mix(col, env, 0.18 + fres * 0.25);
    } else if (uMode < 1.5) {
      col = env * (0.55 + 0.6 * diff) + hsv(fract(uHue + swirl * 0.1), 0.25, 0.25);
    } else {
      col = uTint * diff + hsv(fract(uHue + fres * 0.5 + swirl * 0.1), 0.6, 0.35) * fres;
    }
    col += spec * 0.9 + fres * 0.18;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`

export function makeFigure(rng, { hue = 0, skyTop = '#7fb6ff', skyLow = '#203050', aura = null, glyph = '' } = {}) {
  const mode = rng.chance(0.82) ? 0 : rng.chance(0.4) ? 1 : 2
  const mat = new THREE.ShaderMaterial({
    vertexShader: HOLO_VERT,
    fragmentShader: HOLO_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uHue: { value: hue },
      uMode: { value: mode },
      uTint: { value: new THREE.Color().setHSL(hue, 0.7, 0.55) },
      uSkyTop: { value: new THREE.Color(skyTop) },
      uSkyLow: { value: new THREE.Color(skyLow) },
    },
  })
  const fig = new THREE.Group()
  const body = new THREE.Group()
  fig.add(body)

  const headR = rng.range(0.4, 0.48)
  const head = new THREE.Mesh(new THREE.SphereGeometry(headR, 20, 14), mat)
  head.scale.set(1, 0.95, 0.92)
  const neck = new THREE.Group()
  neck.position.y = 1.08
  head.position.y = headR * 0.85
  neck.add(head)
  body.add(neck)

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.32, 6, 12), mat)
  torso.position.y = 0.78
  torso.scale.set(1.05, 1, 0.85)
  body.add(torso)

  const limb = (r, len) => new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 5, 10), mat)
  const arms = [-1, 1].map((s) => {
    const pivot = new THREE.Group()
    pivot.position.set(0.22 * s, 0.95, 0)
    const arm = limb(0.075, 0.34)
    arm.position.y = -0.2
    pivot.add(arm)
    pivot.rotation.z = 0.12 * s
    body.add(pivot)
    return pivot
  })
  const legs = [-1, 1].map((s) => {
    const pivot = new THREE.Group()
    pivot.position.set(0.1 * s, 0.52, 0)
    const leg = limb(0.09, 0.3)
    leg.position.y = -0.24
    pivot.add(leg)
    body.add(pivot)
    return pivot
  })

  const scale = rng.range(0.95, 1.12)
  fig.scale.setScalar(scale)
  const phase = rng.range(0, 10)
  const auraFx = aura ? makeAura(fig, body, [head, torso, ...arms.map((p) => p.children[0]), ...legs.map((p) => p.children[0])], aura, glyph, rng.fork('aura')) : null

  return {
    object: fig,
    mode,
    // the very top of the head, following the hop and the head's own motion
    headTop: () => head.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, headR * 0.95 * scale, 0)),
    headWorld: () => head.getWorldPosition(new THREE.Vector3()),
    // look: world point to turn the head to; hop: 0..1 progress of a little hop
    update(t, { look, hop = -1, wave = 0, power = 0, burst = -1 } = {}) {
      mat.uniforms.uTime.value = t
      auraFx?.update(t, power, burst)
      const breathe = Math.sin(t * 2.1 + phase)
      torso.scale.y = 1 + breathe * 0.02
      body.rotation.z = Math.sin(t * 0.9 + phase) * 0.03
      arms[0].rotation.x = Math.sin(t * 1.3 + phase) * 0.08
      arms[1].rotation.x = -Math.sin(t * 1.3 + phase) * 0.08
      arms[1].rotation.z = -0.12 - wave * 2.3 + Math.sin(t * 12) * 0.25 * wave
      if (look) {
        const local = fig.worldToLocal(look.clone())
        const yaw = clamp(Math.atan2(local.x, local.z) - body.rotation.y, -1.1, 1.1)
        neck.rotation.y += (yaw - neck.rotation.y) * 0.18
        const pitch = clamp(-Math.atan2(local.y - 1.3, Math.hypot(local.x, local.z)) * 0.5, -0.4, 0.4)
        neck.rotation.x += (pitch - neck.rotation.x) * 0.18
      }
      body.position.y = hop >= 0 && hop <= 1 ? Math.sin(hop * Math.PI) * 0.28 : 0
      const squash = hop >= 0 && hop <= 1 ? 1 - Math.sin(hop * Math.PI * 2) * 0.05 : 1
      body.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash))
      legs[0].rotation.x = Math.sin(t * 0.7 + phase) * 0.03
      legs[1].rotation.x = -legs[0].rotation.x
    },
    // Sets the figure's own heading, kept separate from the head's look.
    face(yaw) {
      body.rotation.y = yaw
    },
  }
}

// ---------- the aura ----------
// Align's AuraCam look in 3D: inflated copies of the figure, drawn from the
// inside with additive light, so a soft halo hugs the silhouette. Light at the
// inner edge, the sign's colour further out, a slow flame-like shimmer.

const AURA_VERT = /* glsl */ `
  uniform float uInflate;
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vWorld;
  void main() {
    vec3 p = position + normal * uInflate;
    vec4 wp = modelMatrix * vec4(p, 1.0);
    vWorld = wp.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`
const AURA_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLight;
  uniform float uStrength;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vWorld;
  void main() {
    float facing = abs(dot(normalize(vN), normalize(vView)));
    float a = pow(facing, 1.6);
    float flame = 0.72 + 0.28 * sin(vWorld.y * 7.0 - uTime * 3.2 + sin(vWorld.x * 5.0 + uTime) * 1.5);
    vec3 col = mix(uColor, uLight, a * a);
    gl_FragColor = vec4(col * a * flame * uStrength, 1.0);
  }
`

function glyphCanvas(glyph, fill, glow, size = 256, weight = 700) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${weight} ${size * 0.62}px "ZSymbols", "Noto Sans Symbols", "DejaVu Sans", sans-serif`
  const text = glyph + '︎'
  for (const [blur, alpha] of [[size * 0.14, 0.9], [size * 0.06, 1]]) {
    ctx.shadowColor = glow
    ctx.shadowBlur = blur
    ctx.globalAlpha = alpha
    ctx.fillStyle = fill
    ctx.fillText(text, size / 2, size / 2 + size * 0.03)
  }
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
  ctx.fillText(text, size / 2, size / 2 + size * 0.03)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function softDot(color) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  const col = new THREE.Color(color)
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`
  g.addColorStop(0, `rgba(${rgb},1)`)
  g.addColorStop(0.35, `rgba(${rgb},0.45)`)
  g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// aura: { color, light }, glyph: the sign's symbol
function makeAura(fig, body, meshes, aura, glyph, rng) {
  const color = new THREE.Color(aura.color)
  const light = new THREE.Color(aura.light)
  const layers = [[0.05, 1.0], [0.14, 0.6], [0.3, 0.32]].map(([inflate, k]) => {
    const m = new THREE.ShaderMaterial({
      vertexShader: AURA_VERT,
      fragmentShader: AURA_FRAG,
      uniforms: {
        uInflate: { value: inflate },
        uColor: { value: color },
        uLight: { value: light },
        uStrength: { value: k },
        uTime: { value: 0 },
      },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    m.userData.k = k
    return m
  })
  for (const mesh of meshes) {
    for (const m of layers) {
      const shell = new THREE.Mesh(mesh.geometry, m)
      shell.renderOrder = 2
      mesh.add(shell)
    }
  }

  // bloom behind the whole body
  const bloom = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot(aura.color), blending: THREE.AdditiveBlending, depthWrite: false, fog: false, transparent: true, opacity: 0.4 }))
  bloom.position.set(0, 0.95, 0)
  bloom.scale.set(2.6, 3.2, 1)
  bloom.renderOrder = 1
  fig.add(bloom)

  // the sign glowing on the chest, like Align's aura cards
  const chest = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    new THREE.MeshBasicMaterial({ map: glyphCanvas(glyph, aura.light, aura.color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  )
  chest.position.set(0, 0.8, 0.185)
  chest.renderOrder = 3
  body.add(chest)

  // sparks drifting up through the halo
  const N = 46
  const seeds = Array.from({ length: N }, () => [rng.range(0, Math.PI * 2), rng.range(0.25, 0.6), rng.range(0, 1), rng.range(0.25, 0.6)])
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(N * 3)
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const sparks = new THREE.Points(geo, new THREE.PointsMaterial({ map: softDot(aura.light), size: 0.11, transparent: true, opacity: 0.9, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }))
  sparks.renderOrder = 3
  fig.add(sparks)

  // a ring of light that rolls out across the ground when the power lands
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.9, 1.0, 48),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.04
  fig.add(ring)

  return {
    // power: 0 resting glow → 1 full surge; burst: seconds since the surge (or <0)
    update(t, power, burst) {
      const pulse = 0.85 + 0.15 * Math.sin(t * 2.4)
      const level = (0.55 + power * 1.1) * pulse
      for (const m of layers) {
        m.uniforms.uTime.value = t
        m.uniforms.uStrength.value = m.userData.k * level
      }
      bloom.material.opacity = 0.22 + power * 0.45
      const bs = 1 + power * 0.35
      bloom.scale.set(2.6 * bs, 3.2 * bs, 1)
      chest.material.opacity = 0.55 + power * 0.45
      const rise = 0.35 + power * 0.9
      for (let i = 0; i < N; i++) {
        const [a, r, off, sp] = seeds[i]
        const y = ((off + t * sp * rise) % 1)
        const rr = r * (1 + power * 0.5) + Math.sin(t * 2 + a) * 0.04
        pos[i * 3] = Math.cos(a + t * 0.4) * rr
        pos[i * 3 + 1] = 0.1 + y * 2.0
        pos[i * 3 + 2] = Math.sin(a + t * 0.4) * rr
      }
      geo.attributes.position.needsUpdate = true
      sparks.material.opacity = 0.45 + power * 0.5
      if (burst >= 0 && burst < 1.4) {
        const k = burst / 1.4
        const sc = 0.6 + k * 3.2
        ring.scale.set(sc, sc, 1)
        ring.material.opacity = (1 - k) * 0.9
      } else ring.material.opacity = 0
    },
  }
}

// ---------- the stars ----------
// The watchers are four-pointed stars with eyes: the sky itself, come down to
// look at you. One of them speaks the line while the dialog types.

function starGeometry(R, inner, curve, depth) {
  const shape = new THREE.Shape()
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 2
    const tip = [Math.cos(a) * R, Math.sin(a) * R]
    const mid = a + Math.PI / 4
    // the waist between two points, pulled in for the classic ✦ curve
    const waist = [Math.cos(mid) * R * inner, Math.sin(mid) * R * inner]
    const ctrl = [Math.cos(mid) * R * inner * curve, Math.sin(mid) * R * inner * curve]
    if (i === 0) shape.moveTo(...tip)
    const next = a + Math.PI / 2
    const tip2 = [Math.cos(next) * R, Math.sin(next) * R]
    shape.quadraticCurveTo(ctrl[0], ctrl[1], waist[0], waist[1])
    shape.quadraticCurveTo(ctrl[0], ctrl[1], tip2[0], tip2[1])
  }
  const g = new THREE.ExtrudeGeometry(shape, {
    depth, curveSegments: 3, bevelEnabled: true, bevelThickness: depth * 0.45, bevelSize: R * 0.07, bevelSegments: 1,
  })
  g.translate(0, 0, -depth / 2)
  g.computeVertexNormals()
  return g
}

// Real star colours, from hot to cool: blue-white, white, yellow, gold,
// orange. Weighted toward the warm ones, the way people picture stars.
const STAR_COLORS = [
  ['#9fd0ff', 2], ['#cfe6ff', 2], ['#fff6d8', 1], ['#ffe34a', 4], ['#ffc533', 3], ['#ff9d2e', 3], ['#ff7a1f', 1],
]
function pickStarColor(rng) {
  const total = STAR_COLORS.reduce((n, [, w]) => n + w, 0)
  let r = rng.next() * total
  for (const [c, w] of STAR_COLORS) if ((r -= w) < 0) return c
  return STAR_COLORS[0][0]
}

// Self-lit: white-hot in the middle, its colour out at the points, with a
// little facet shading so it still reads as a solid low-poly thing.
const STAR_VERT = /* glsl */ `
  varying vec3 vLocal;
  varying vec3 vN;
  void main() {
    vLocal = position;
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const STAR_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform float uR;
  uniform float uBright;
  varying vec3 vLocal;
  varying vec3 vN;
  void main() {
    float d = length(vLocal.xy) / uR;
    vec3 col = mix(uHot, uColor, smoothstep(0.12, 0.8, d));
    float facet = 0.82 + 0.18 * max(dot(normalize(vN), normalize(vec3(0.3, 0.5, 1.0))), 0.0);
    gl_FragColor = vec4(col * facet * uBright, 1.0);
    #include <colorspace_fragment>
  }
`

function starGlow(color) {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const ctx = c.getContext('2d')
  const col = new THREE.Color(color)
  const rgb = `${Math.round(col.r * 255)},${Math.round(col.g * 255)},${Math.round(col.b * 255)}`
  const h = S / 2
  const g = ctx.createRadialGradient(h, h, 0, h, h, h)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.08, `rgba(${rgb},0.95)`)
  g.addColorStop(0.25, `rgba(${rgb},0.45)`)
  g.addColorStop(0.55, `rgba(${rgb},0.12)`)
  g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  ctx.globalCompositeOperation = 'lighter'
  // long spikes on the axes, shorter ones on the diagonals: a star through a lens
  const spike = (angle, len, w, alpha) => {
    ctx.save()
    ctx.translate(h, h)
    ctx.rotate(angle)
    const lg = ctx.createLinearGradient(-len, 0, len, 0)
    lg.addColorStop(0, 'rgba(255,255,255,0)')
    lg.addColorStop(0.5, `rgba(255,255,255,${alpha})`)
    lg.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = lg
    ctx.beginPath()
    ctx.moveTo(-len, 0)
    ctx.lineTo(0, -w)
    ctx.lineTo(len, 0)
    ctx.lineTo(0, w)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  spike(0, h, 3.5, 0.95)
  spike(Math.PI / 2, h, 3.5, 0.95)
  spike(Math.PI / 4, h * 0.55, 2, 0.6)
  spike(-Math.PI / 4, h * 0.55, 2, 0.6)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// Builds this reel's kind of star (they match, like a constellation) and
// returns a factory for individuals.
export function makeSpecies(rng, colors) {
  const R = 0.5
  const inner = rng.range(0.32, 0.46)
  const curve = rng.range(0.25, 0.7)
  const depth = rng.range(0.1, 0.2)
  const geo = starGeometry(R, inner, curve, depth)
  const eyes = rng.pick([2, 2, 2, 2, 1, 3])
  const front = depth / 2 + depth * 0.45
  const eyeGeo = new THREE.SphereGeometry(0.075, 12, 8)
  const pupilGeo = new THREE.SphereGeometry(0.042, 10, 6)
  const eyeMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
  const pupilMat = new THREE.MeshBasicMaterial({ color: '#0a0a14' })
  const rimMat = new THREE.MeshBasicMaterial({ color: '#3a2410' })
  const mouthGeo = new THREE.CircleGeometry(0.05, 12)
  const mouthMat = new THREE.MeshBasicMaterial({ color: '#2a0a18' })
  const hoverBase = rng.range(0.7, 1.3)

  return function spawn(i, irng) {
    const color = new THREE.Color(pickStarColor(irng))
    const hot = new THREE.Color('#ffffff').lerp(color, 0.18)
    const mat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: { uColor: { value: color }, uHot: { value: hot }, uR: { value: R }, uBright: { value: 1.15 } },
    })
    const root = new THREE.Group()
    const body = new THREE.Group()
    root.add(body)
    const star = new THREE.Mesh(geo, mat)
    body.add(star)
    const glowTex = starGlow(color.getStyle())
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }))
    glow.scale.setScalar(R * 6)
    glow.renderOrder = 1
    body.add(glow)

    const eyeList = []
    const spread = eyes === 1 ? [0] : eyes === 2 ? [-0.095, 0.095] : [-0.14, 0, 0.14]
    for (const x of spread) {
      const e = new THREE.Group()
      const rim = new THREE.Mesh(eyeGeo, rimMat)
      rim.scale.set(1.28, 1.48, 0.4)
      rim.position.z = -0.006
      const white = new THREE.Mesh(eyeGeo, eyeMat)
      white.scale.set(1, 1.2, 0.5)
      const pupil = new THREE.Mesh(pupilGeo, pupilMat)
      pupil.position.z = 0.03
      pupil.scale.set(1, 1.2, 0.5)
      e.add(rim, white, pupil)
      e.position.set(x, 0.045, front)
      if (eyes === 1) e.scale.setScalar(1.45)
      body.add(e)
      eyeList.push({ e, pupil })
    }
    const mouth = new THREE.Mesh(mouthGeo, mouthMat)
    mouth.position.set(0, -0.1, front + 0.004)
    mouth.scale.set(0.9, 0.18, 1)
    body.add(mouth)

    const size = irng.range(0.7, 1.2)
    root.scale.setScalar(size)
    const phase = irng.range(0, 10)
    const hover = hoverBase + irng.range(-0.35, 0.45)
    const blinkAt = irng.range(0.5, 6)
    const spin = irng.range(-0.5, 0.5)
    return {
      object: root,
      height: (hover + R) * size,
      // talk: 0..1 how open the mouth is (the speaker, while the line types)
      update(t, { look, alert = 0, talk = 0 } = {}) {
        body.position.y = hover + Math.sin(t * 1.4 + phase) * 0.08
        star.rotation.z = Math.sin(t * 0.8 + phase) * 0.18 + spin * Math.sin(t * 0.3)
        // twinkle
        const tw = 1 + Math.sin(t * 4.3 + phase) * 0.04 + Math.sin(t * 9.1 + phase * 2) * 0.02 + talk * 0.08
        star.scale.setScalar(tw)
        mat.uniforms.uBright.value = 1.1 + 0.12 * Math.sin(t * 3.1 + phase) + alert * 0.15 + talk * 0.3
        // twinkle: the halo breathes and the spikes flare and turn slowly
        const flare = 0.75 + 0.18 * Math.sin(t * 5.3 + phase) + 0.1 * Math.sin(t * 11.7 + phase * 3) + talk * 0.25
        glow.material.opacity = Math.min(1, flare)
        glow.scale.setScalar(R * 6 * (0.92 + flare * 0.12))
        glow.material.rotation = Math.sin(t * 0.35 + phase) * 0.25
        if (look) {
          const local = root.worldToLocal(look.clone())
          const yaw = Math.atan2(local.x, local.z)
          const pitch = -Math.atan2(local.y - body.position.y, Math.hypot(local.x, local.z)) * 0.6
          const k = 0.05 + alert * 0.2
          body.rotation.y += (yaw - body.rotation.y) * k
          body.rotation.x += (pitch - body.rotation.x) * k
        }
        const b = (t + blinkAt) % 4.4
        const lid = b < 0.12 ? 0.1 : 1
        for (const { e, pupil } of eyeList) {
          e.scale.y = (eyes === 1 ? 1.45 : 1) * lid
          pupil.position.x = Math.sin(t * 0.7 + phase) * 0.012 * (1 - alert)
        }
        mouth.scale.y = 0.18 + talk * 0.9
        mouth.scale.x = 0.9 - talk * 0.2
      },
    }
  }
}

// The sign's glyph popping over the figure's head, red and glossy like the
// reference's "?".
export function makeGlyphSprite(glyph, color = '#ff1f1f', glow = null) {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${s * 0.72}px "ZSymbols", "Noto Sans Symbols", "DejaVu Sans", sans-serif`
  const text = glyph + '︎'
  ctx.lineJoin = 'round'
  const base = new THREE.Color(color)
  ctx.shadowColor = glow || 'rgba(0,0,0,0.45)'
  ctx.shadowBlur = glow ? 34 : 14
  ctx.shadowOffsetY = glow ? 0 : 6
  ctx.lineWidth = 16
  ctx.strokeStyle = '#' + base.clone().multiplyScalar(0.35).getHexString()
  ctx.strokeText(text, s / 2, s / 2 + 6)
  ctx.shadowColor = 'transparent'
  const g = ctx.createLinearGradient(0, s * 0.15, 0, s * 0.85)
  g.addColorStop(0, '#' + base.clone().lerp(new THREE.Color('#ffffff'), 0.45).getHexString())
  g.addColorStop(0.5, color)
  g.addColorStop(1, '#' + base.clone().multiplyScalar(0.45).getHexString())
  ctx.fillStyle = g
  ctx.fillText(text, s / 2, s / 2 + 6)
  // a little specular glint
  ctx.globalCompositeOperation = 'source-atop'
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.beginPath()
  ctx.ellipse(s * 0.42, s * 0.3, s * 0.2, s * 0.08, -0.4, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }))
  sprite.renderOrder = 10
  return {
    object: sprite,
    // p: seconds since the pop
    update(p, at) {
      if (p < 0) {
        sprite.visible = false
        return
      }
      sprite.visible = true
      const k = clamp(p / 0.35)
      const sc = 0.62 * easeOutBack(k, 3)
      sprite.scale.set(sc, sc, 1)
      sprite.position.copy(at)
      // sit the glyph's bottom edge clear of the head: half its height plus a gap
      sprite.position.y += sc * 0.5 + 0.1 + Math.sin(p * 3) * 0.03 + smooth(0, 0.3, p) * 0.05
      sprite.material.rotation = Math.sin(p * 2.2) * 0.06
    },
  }
}
