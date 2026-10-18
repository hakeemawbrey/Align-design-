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
    headTop: () => new THREE.Vector3(0, (1.08 + headR * 1.75) * scale, 0).applyMatrix4(fig.matrixWorld),
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
  const bloom = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot(aura.color), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.4 }))
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
  const sparks = new THREE.Points(geo, new THREE.PointsMaterial({ map: softDot(aura.light), size: 0.11, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }))
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

// ---------- the creatures ----------

function gumdropGeometry(shape, segs) {
  const pts = []
  const n = 9
  for (let i = 0; i <= n; i++) {
    const k = i / n
    let r, y
    if (shape === 'dome') {
      y = k * 0.62
      r = 0.52 * Math.pow(1 - k, 0.55) + 0.02
    } else if (shape === 'bean') {
      y = k * 0.8
      r = 0.36 * Math.sin(Math.PI * (0.08 + k * 0.92)) + 0.06
    } else if (shape === 'cone') {
      y = k * 0.75
      r = 0.5 * (1 - k) + 0.05 * Math.sin(k * Math.PI)
    } else {
      // 'tall' — a tall gumdrop
      y = k * 1.05
      r = 0.38 * Math.pow(1 - k, 0.35) + 0.02
    }
    pts.push(new THREE.Vector2(Math.max(0.001, r), y))
  }
  pts.unshift(new THREE.Vector2(0.001, 0))
  const g = new THREE.LatheGeometry(pts, segs)
  g.computeVertexNormals()
  return g
}

const SHAPES = ['dome', 'dome', 'dome', 'bean', 'cone', 'tall']

// Builds one kind of creature for this reel (they're a species, so they
// match), and returns a factory for individuals.
export function makeSpecies(rng, colors) {
  const shape = rng.pick(SHAPES)
  const segs = rng.pick([6, 7, 8, 10])
  const eyes = rng.pick([2, 3, 3, 3, 1])
  const antenna = rng.chance(0.8)
  const bulb = new THREE.Color(rng.pick(['#ff2a2a', '#ff2a2a', '#ffe14a', '#5dff8a', '#ffffff']))
  const geo = gumdropGeometry(shape, segs)
  geo.computeBoundingBox()
  const height = geo.boundingBox.max.y
  const eyeGeo = new THREE.SphereGeometry(0.1, 12, 8)
  const pupilGeo = new THREE.SphereGeometry(0.055, 10, 6)
  const eyeMat = new THREE.MeshPhongMaterial({ color: '#ffffff', shininess: 80, emissive: '#555555' })
  const pupilMat = new THREE.MeshBasicMaterial({ color: '#0a0a14' })
  const stalkGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.26, 5)
  const bulbGeo = new THREE.SphereGeometry(0.07, 10, 8)
  const stalkMat = new THREE.MeshLambertMaterial({ color: '#222' })
  const bulbMat = new THREE.MeshBasicMaterial({ color: bulb })

  // Approximate surface radius at a given height, for placing eyes.
  const pos = geo.attributes.position
  const radiusAt = (y) => {
    let best = 0, bestD = Infinity
    for (let i = 0; i < pos.count; i++) {
      const d = Math.abs(pos.getY(i) - y)
      if (d < bestD) {
        bestD = d
        best = Math.hypot(pos.getX(i), pos.getZ(i))
      }
    }
    return best
  }
  const eyeY = height * (shape === 'tall' ? 0.6 : 0.42)
  const eyeR = radiusAt(eyeY)

  return function spawn(i, irng) {
    const color = new THREE.Color(colors[i % colors.length === 0 ? 0 : irng.int(0, colors.length - 1)])
    color.offsetHSL(irng.range(-0.02, 0.02), 0, irng.range(-0.05, 0.05))
    const mat = new THREE.MeshPhongMaterial({ color, shininess: 60, flatShading: true, emissive: color.clone().multiplyScalar(0.12) })
    const root = new THREE.Group()
    const body = new THREE.Mesh(geo, mat)
    root.add(body)
    const eyeList = []
    const spread = eyes === 1 ? [0] : eyes === 2 ? [-0.32, 0.32] : [-0.52, 0, 0.52]
    for (const a of spread) {
      const e = new THREE.Group()
      const white = new THREE.Mesh(eyeGeo, eyeMat)
      white.scale.set(1, 1.15, 0.6)
      const pupil = new THREE.Mesh(pupilGeo, pupilMat)
      pupil.position.z = 0.055
      pupil.scale.set(1, 1.2, 0.5)
      e.add(white, pupil)
      e.position.set(Math.sin(a) * eyeR * 0.98, eyeY, Math.cos(a) * eyeR * 0.98)
      e.rotation.y = a
      const s = eyes === 1 ? 1.6 : 1
      e.scale.setScalar(s)
      body.add(e)
      eyeList.push({ e, pupil })
    }
    let bulbMesh = null
    if (antenna) {
      const stalk = new THREE.Mesh(stalkGeo, stalkMat)
      stalk.position.y = height + 0.11
      bulbMesh = new THREE.Mesh(bulbGeo, bulbMat)
      bulbMesh.position.y = height + 0.26
      body.add(stalk, bulbMesh)
    }
    const size = irng.range(0.75, 1.25)
    root.scale.setScalar(size)
    const phase = irng.range(0, 10)
    const blinkAt = irng.range(0.5, 6)
    const hops = irng.chance(0.5)
    return {
      object: root,
      height: height * size,
      // mode: 'float' bobs on water, 'ground' sits and hops
      update(t, { mode = 'float', look, alert = 0 } = {}) {
        if (mode === 'float') {
          body.position.y = Math.sin(t * 1.6 + phase) * 0.06 - 0.12
          body.rotation.z = Math.sin(t * 1.1 + phase) * 0.06
          body.rotation.x = Math.cos(t * 1.3 + phase) * 0.05
        } else {
          const hp = hops ? Math.max(0, Math.sin(t * 2.4 + phase)) : 0
          body.position.y = Math.pow(hp, 3) * 0.18
          const sq = 1 - Math.pow(hp, 3) * 0.08 + Math.sin(t * 3 + phase) * 0.015
          body.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq))
        }
        if (look) {
          const local = root.worldToLocal(look.clone())
          const yaw = Math.atan2(local.x, local.z)
          const k = 0.04 + alert * 0.2
          body.rotation.y += (yaw - body.rotation.y) * k
        }
        // blink every ~4s
        const b = (t + blinkAt) % 4.2
        const lid = b < 0.12 ? 0.1 : 1
        for (const { e, pupil } of eyeList) {
          e.scale.y = (eyes === 1 ? 1.6 : 1) * lid
          pupil.position.x = Math.sin(t * 0.7 + phase) * 0.02 * (1 - alert)
        }
        if (bulbMesh) {
          const pulse = 0.85 + 0.15 * Math.sin(t * 5 + phase) + alert * 0.4
          bulbMesh.scale.setScalar(pulse)
        }
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
      sprite.position.y += 0.12 + Math.sin(p * 3) * 0.03 + smooth(0, 0.3, p) * 0.05
      sprite.material.rotation = Math.sin(p * 2.2) * 0.06
    },
  }
}
