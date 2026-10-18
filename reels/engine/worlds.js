// The places. Each world builds itself into the scene around a fixed layout:
// the figure stands near the origin looking down -z at a "stage" where the
// creatures gather. A world returns where those are and how to animate itself.
import * as THREE from 'three'
import { makeNoise, smooth } from './rng.js'
import { EXTRA_WORLDS } from './worlds-extra.js'
import {
  rockTexture, waterTexture, grassTexture, sandTexture, snowTexture,
  tileTexture, checkerTexture, skyTexture, glowTexture,
} from './textures.js'

export function terrain(height, size, seg, material) {
  const g = new THREE.PlaneGeometry(size, size, seg, seg)
  g.rotateX(-Math.PI / 2)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) p.setY(i, height(p.getX(i), p.getZ(i)))
  g.computeVertexNormals()
  const m = new THREE.Mesh(g, material)
  return m
}

export function skyDome(tex, radius = 400) {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 16),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false, depthWrite: false }),
  )
  m.renderOrder = -1
  return m
}

export function water(size, tex, { color = '#ffffff', opacity = 0.82, seg = 24, amp = 0.05 } = {}) {
  const g = new THREE.PlaneGeometry(size, size, seg, seg)
  g.rotateX(-Math.PI / 2)
  const base = Float32Array.from(g.attributes.position.array)
  const mat = new THREE.MeshPhongMaterial({
    map: tex, color, transparent: opacity < 1, opacity, shininess: 90, specular: '#9fc4ff',
  })
  const m = new THREE.Mesh(g, mat)
  m.userData.update = (t) => {
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3], z = base[i * 3 + 2]
      p.setY(i, Math.sin(x * 0.7 + t * 1.2) * amp + Math.cos(z * 0.9 + t * 0.9) * amp)
    }
    p.needsUpdate = true
    g.computeVertexNormals()
    tex.offset.set(t * 0.01, t * 0.017)
  }
  return m
}

export function sprite(tex, scale, pos, opts = {}) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, fog: false, depthWrite: false, transparent: true, ...opts }))
  s.scale.setScalar(scale)
  s.position.copy(pos)
  return s
}

export function lights(scene, { sky = '#bcd7ff', ground = '#2b2b3a', hemi = 1.1, sun = '#ffffff', sunI = 1.6, dir = [4, 10, 6] } = {}) {
  scene.add(new THREE.HemisphereLight(sky, ground, hemi))
  const d = new THREE.DirectionalLight(sun, sunI)
  d.position.set(...dir)
  scene.add(d)
}

// Scatter n creature spots in a ring around the stage.
export function spots(rng, stage, n, mode, radius, heightAt) {
  const out = []
  for (let i = 0; i < n; i++) {
    let p
    for (let tries = 0; tries < 30; tries++) {
      const a = rng.range(0, Math.PI * 2)
      const r = Math.sqrt(rng.next()) * radius
      p = new THREE.Vector3(stage.x + Math.cos(a) * r * 1.3, 0, stage.z + Math.sin(a) * r)
      if (out.every((q) => q.pos.distanceTo(p) > 1.25)) break
    }
    p.y = heightAt ? heightAt(p.x, p.z) : stage.y
    out.push({ pos: p, mode })
  }
  return out
}

export function rockMesh(rng, tex, r) {
  const g = new THREE.IcosahedronGeometry(r, 1)
  const p = g.attributes.position
  const n = makeNoise(rng.next())
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i)
    const k = 0.75 + n.fbm(v.x * 0.6 + 3, v.z * 0.6 + v.y * 0.4, 3) * 0.6
    v.multiplyScalar(k)
    p.setXYZ(i, v.x, v.y * rng.range(1.1, 1.8), v.z)
  }
  g.computeVertexNormals()
  return new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: tex, flatShading: true }))
}

// 0 on the strip between the figure and the stage, 1 well away from it: hilly
// worlds multiply their bumps by this so nothing hides the creatures.
const corridor = (x, z) => smooth(2.5, 9, Math.hypot(x, Math.max(0, Math.abs(z + 4.5) - 6)))

// ---------------------------------------------------------------- worlds

const WORLDS = {
  // The reference: a dark rock basin, a blue lake, cliffs, a slice of sky.
  cavelake({ scene, rng, seed }) {
    const n = makeNoise(seed + 'cl')
    const stage = new THREE.Vector3(0, 0, -8)
    const R = rng.range(6.5, 8)
    const h = (x, z) => {
      const d = Math.hypot((x - stage.x) * 0.8, z - stage.z)
      const rim = smooth(R - 1, R + 1.5, d)
      const hills = n.fbm(x * 0.12, z * 0.12) * 3
      const back = smooth(-10, -24, z) * (6 + n.fbm(x * 0.05, 3) * 18)
      const sides = smooth(10, 22, Math.abs(x)) * 10
      return -0.9 + rim * (1.2 + hills) + back + sides
    }
    const rock = rockTexture(seed, rng.pick(['#26292f', '#2e2822', '#232833']), rng.pick(['#a3a7b3', '#b3a690', '#9aa9bc']), 10)
    scene.add(terrain(h, 70, 90, new THREE.MeshLambertMaterial({ map: rock })))
    for (let i = 0; i < 7; i++) {
      const r = rockMesh(rng, rock, rng.range(2.5, 6))
      r.position.set(rng.range(-20, 20), rng.range(0, 3), rng.range(-34, -20))
      scene.add(r)
    }
    const w = water(R * 3, waterTexture(seed, rng.pick(['#1747b8', '#0f4f9c', '#1b3fa8']), rng.pick(['#7fb0ff', '#6fc4ff', '#8a9cff'])), { opacity: 0.88 })
    w.position.copy(stage)
    scene.add(w)
    const skyTop = rng.pick(['#1f6bff', '#3a8cff', '#5aa0ff'])
    scene.add(skyDome(skyTexture(seed, [[0, skyTop], [0.45, '#a8d0ff'], [0.55, '#2a3242'], [1, '#0d0f14']], { clouds: rng.range(0.4, 0.9) })))
    scene.fog = new THREE.Fog('#3a4458', 22, 70)
    lights(scene, { sky: '#cfe0ff', ground: '#3a3f4c', hemi: 1.4, sunI: 1.5 })
    return {
      stage, heightAt: h, skyTop, skyLow: '#1a2233',
      hero: new THREE.Vector3(rng.range(-0.8, 0.8), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'float', R * 0.55, () => 0),
      update: (t) => w.userData.update(t),
    }
  },

  // The poolrooms: white tile everywhere, still cyan water, too-bright light.
  poolrooms({ scene, rng }) {
    const tile = tileTexture(rng.pick(['#eef6f8', '#f3f0e6', '#e6f0ff']), '#9fb3bf', 8, 1)
    const mk = (w, d, rx, ry) => {
      const t = tile.clone()
      t.repeat.set(rx, ry)
      t.needsUpdate = true
      return new THREE.MeshLambertMaterial({ map: t })
    }
    const stage = new THREE.Vector3(0, 0, -7)
    const pw = rng.range(7, 10), pd = rng.range(7, 10)
    const floorY = 0
    const waterY = -0.35
    const room = new THREE.Group()
    // floor around the pool: four slabs
    const slab = (x0, x1, z0, z1) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.2, z1 - z0), mk(0, 0, (x1 - x0) / 2, (z1 - z0) / 2))
      m.position.set((x0 + x1) / 2, floorY - 0.1, (z0 + z1) / 2)
      room.add(m)
    }
    const W = 30
    slab(-W, W, stage.z + pd / 2, 12)
    slab(-W, W, -W, stage.z - pd / 2)
    slab(-W, stage.x - pw / 2, stage.z - pd / 2, stage.z + pd / 2)
    slab(stage.x + pw / 2, W, stage.z - pd / 2, stage.z + pd / 2)
    const basin = new THREE.Mesh(new THREE.BoxGeometry(pw, 1.6, pd), mk(0, 0, pw / 2, 1))
    basin.material.side = THREE.BackSide
    basin.position.set(stage.x, -0.8, stage.z)
    room.add(basin)
    // pillars and arches
    for (let i = 0; i < 10; i++) {
      const x = rng.sign() * rng.range(pw / 2 + 2, 14)
      const z = rng.range(-26, 4)
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, 7, 1.2), mk(0, 0, 1, 6))
      p.position.set(x, 3.5, z)
      room.add(p)
    }
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), mk(0, 0, 30, 30))
    ceil.rotation.x = Math.PI / 2
    ceil.position.y = 7
    room.add(ceil)
    const lampMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
    for (let x = -12; x <= 12; x += 6) {
      for (let z = -24; z <= 6; z += 6) {
        const l = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), lampMat)
        l.rotation.x = Math.PI / 2
        l.position.set(x, 6.98, z)
        room.add(l)
      }
    }
    scene.add(room)
    const w = water(Math.max(pw, pd), waterTexture('pool', '#24c0d8', '#a8f4ff', 2), { opacity: 0.7, amp: 0.025 })
    w.scale.set(pw / Math.max(pw, pd), 1, pd / Math.max(pw, pd))
    w.position.set(stage.x, waterY, stage.z)
    scene.add(w)
    scene.background = new THREE.Color('#dff4f6')
    scene.fog = new THREE.Fog('#e6f6f8', 10, 34)
    lights(scene, { sky: '#ffffff', ground: '#a8d8e0', hemi: 1.5, sunI: 0.8, dir: [0, 10, 2] })
    stage.y = waterY
    return {
      stage, heightAt: () => 0, skyTop: '#ffffff', skyLow: '#7fd8e6',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 5), 'float', Math.min(pw, pd) * 0.3, () => waterY + 0.1),
      update: (t) => w.userData.update(t),
    }
  },

  // A dreamcore meadow: green hills, huge blue sky, one tree, one door.
  meadow({ scene, rng, seed }) {
    const n = makeNoise(seed + 'mw')
    const h = (x, z) => (n.fbm(x * 0.05 + 7, z * 0.05, 4) * 6 - 3) * (0.3 + 0.7 * corridor(x, z)) + smooth(-14, -40, z) * 8
    const ground = terrain(h, 120, 80, new THREE.MeshLambertMaterial({ map: grassTexture(seed, 30) }))
    scene.add(ground)
    const y0 = h(0, 0)
    ground.position.y = -y0
    const H = (x, z) => h(x, z) - y0
    const skyTop = rng.pick(['#2f7bff', '#4b90ff', '#1e66f5'])
    scene.add(skyDome(skyTexture(seed, [[0, skyTop], [0.5, '#bfe0ff'], [1, '#bfe0ff']], { clouds: rng.range(0.6, 1) })))
    scene.fog = new THREE.Fog('#bfe0ff', 25, 90)
    lights(scene, { sky: '#d8ecff', ground: '#3a6b2a', hemi: 1.2, sunI: 1.5 })
    // a lone tree
    const tree = new THREE.Group()
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 2.4, 6), new THREE.MeshLambertMaterial({ color: '#5a3b22', flatShading: true }))
    trunk.position.y = 1.2
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), new THREE.MeshLambertMaterial({ color: '#2f8f2a', flatShading: true }))
    crown.position.y = 3
    tree.add(trunk, crown)
    const tx = rng.sign() * rng.range(5, 9), tz = rng.range(-14, -9)
    tree.position.set(tx, H(tx, tz), tz)
    scene.add(tree)
    // a door frame standing in the grass, going nowhere
    if (rng.chance(0.7)) {
      const door = new THREE.Group()
      const fm = new THREE.MeshLambertMaterial({ color: rng.pick(['#ffffff', '#e8d6b0', '#ff5a5a']) })
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.4, 0.18), fm)
      const r = l.clone()
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 0.18), fm)
      l.position.set(-0.6, 1.2, 0)
      r.position.set(0.6, 1.2, 0)
      top.position.set(0, 2.4, 0)
      const inside = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 2.3), new THREE.MeshBasicMaterial({ color: rng.pick(['#000000', '#ffffff', '#ff2b2b']) }))
      inside.position.y = 1.15
      door.add(l, r, top, inside)
      const dx = -Math.sign(tx) * rng.range(3, 6), dz = rng.range(-13, -10)
      door.position.set(dx, H(dx, dz), dz)
      door.rotation.y = rng.range(-0.4, 0.4)
      scene.add(door)
    }
    const stage = new THREE.Vector3(0, H(0, -7), -7)
    return {
      stage, heightAt: H, skyTop, skyLow: '#3a7a2a',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'ground', 3.4, H),
      update() {},
    }
  },

  // An endless checker floor in a pink-purple void, things floating.
  checker({ scene, rng, seed }) {
    const pal = rng.pick([
      ['#120018', '#ff6ad5', '#2b0040', '#ffb3ec'],
      ['#06001a', '#7a5cff', '#120040', '#c2b3ff'],
      ['#1a0006', '#ff4d4d', '#40000c', '#ffc0b3'],
    ])
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ map: checkerTexture('#111111', '#f2f2f2', 2, 100) }))
    floor.rotation.x = -Math.PI / 2
    scene.add(floor)
    scene.add(skyDome(skyTexture(seed, [[0, pal[0]], [0.5, pal[1]], [0.52, pal[3]], [1, pal[2]]], { stars: 200 })))
    scene.fog = new THREE.Fog(pal[1], 14, 60)
    lights(scene, { sky: pal[3], ground: pal[2], hemi: 1.1, sunI: 1.1 })
    const floaters = []
    const shapes = [
      () => new THREE.TorusGeometry(1.2, 0.35, 8, 16),
      () => new THREE.OctahedronGeometry(1.1, 0),
      () => new THREE.SphereGeometry(1, 12, 8),
      () => new THREE.BoxGeometry(1.4, 1.4, 1.4),
    ]
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(rng.pick(shapes)(), new THREE.MeshPhongMaterial({ color: rng.pick(['#ffffff', pal[1], pal[3], '#ffe14a']), flatShading: true, shininess: 80 }))
      m.position.set(rng.sign() * rng.range(4, 14), rng.range(2.5, 8), rng.range(-30, -8))
      m.userData.spin = rng.range(0.2, 0.7)
      m.userData.y = m.position.y
      floaters.push(m)
      scene.add(m)
    }
    const stage = new THREE.Vector3(0, 0, -7)
    return {
      stage, heightAt: () => 0, skyTop: pal[3], skyLow: pal[2],
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'ground', 3.2, () => 0),
      update(t) {
        for (const m of floaters) {
          m.rotation.y = t * m.userData.spin
          m.rotation.x = t * m.userData.spin * 0.6
          m.position.y = m.userData.y + Math.sin(t + m.userData.spin * 9) * 0.3
        }
      },
    }
  },

  // Orange dunes under a purple dusk, a moon far too big.
  dunes({ scene, rng, seed }) {
    const n = makeNoise(seed + 'dn')
    const h = (x, z) => {
      const ridge = Math.abs(Math.sin(x * 0.08 + n.fbm(x * 0.03, z * 0.03) * 4)) * 4
      const k = 0.15 + 0.85 * corridor(x, z)
      return (ridge + n.fbm(x * 0.07, z * 0.07) * 3) * k + smooth(-12, -40, z) * 6
    }
    const y0 = h(0, 0)
    const H = (x, z) => h(x, z) - y0
    scene.add(terrain(H, 140, 90, new THREE.MeshLambertMaterial({ map: sandTexture(seed, '#a8471e', '#ffb070', 30) })))
    const skyPal = rng.pick([['#1b0a3a', '#7a2d8f', '#ff8a5c'], ['#0c1440', '#5b2b8f', '#ff6a7a'], ['#2a0a2a', '#b33c6b', '#ffc070']])
    scene.add(skyDome(skyTexture(seed, [[0, skyPal[0]], [0.35, skyPal[1]], [0.5, skyPal[2]], [1, skyPal[2]]], { stars: 160 })))
    scene.add(sprite(glowTexture('#fff3d6', 'rgba(255,220,180,0)', 0.42), rng.range(30, 50), new THREE.Vector3(rng.range(-30, 30), rng.range(22, 34), -120)))
    scene.fog = new THREE.Fog(skyPal[2], 20, 90)
    lights(scene, { sky: '#ffb08a', ground: '#4a1f3a', hemi: 1.1, sun: '#ffd0a0', sunI: 1.5, dir: [-6, 5, -8] })
    // arches
    for (let i = 0; i < rng.int(1, 3); i++) {
      const a = new THREE.Mesh(new THREE.TorusGeometry(3, 0.7, 6, 10, Math.PI), new THREE.MeshLambertMaterial({ color: '#c0603a', flatShading: true }))
      const x = rng.sign() * rng.range(6, 16), z = rng.range(-30, -14)
      a.position.set(x, H(x, z) - 0.3, z)
      a.rotation.y = rng.range(-0.6, 0.6)
      scene.add(a)
    }
    const stage = new THREE.Vector3(0, H(0, -7), -7)
    return {
      stage, heightAt: H, skyTop: skyPal[2], skyLow: skyPal[0],
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'ground', 3.4, H),
      update() {},
    }
  },

  // Night sea: a rock island, black water to the horizon, moon on the water.
  nightsea({ scene, rng, seed }) {
    const n = makeNoise(seed + 'ns')
    const h = (x, z) => {
      const d = Math.hypot(x, z - 1)
      return 0.4 + (1 - smooth(1.5, 4.5, d)) * 0.5 + n.fbm(x * 0.4, z * 0.4) * 0.5 - smooth(3.5, 6, d) * 2.5
    }
    const y0 = h(0, 0)
    const H = (x, z) => h(x, z) - y0
    const rock = rockTexture(seed, '#0d0f14', '#5a6070', 4)
    scene.add(terrain(H, 16, 40, new THREE.MeshLambertMaterial({ map: rock })))
    const seaY = -y0 + 0.05
    const w = water(160, waterTexture(seed, '#020818', '#1c3a7a', 30), { seg: 40, amp: 0.08, opacity: 1 })
    w.position.y = seaY
    scene.add(w)
    scene.add(skyDome(skyTexture(seed, [[0, '#02030c'], [0.4, '#0b1440'], [0.5, '#1b2a6a'], [1, '#02030c']], { stars: 600 })))
    const moonPos = new THREE.Vector3(rng.range(-14, 14), rng.range(12, 20), -70)
    scene.add(sprite(glowTexture('#f6f2ff', 'rgba(180,190,255,0)', 0.35), rng.range(16, 26), moonPos))
    scene.fog = new THREE.Fog('#0a1030', 20, 90)
    lights(scene, { sky: '#6a7cff', ground: '#05060c', hemi: 0.9, sun: '#c8d0ff', sunI: 1.2, dir: [moonPos.x, 10, -20] })
    const stage = new THREE.Vector3(0, seaY, -8)
    return {
      stage, heightAt: H, skyTop: '#8a9cff', skyLow: '#05060c',
      hero: new THREE.Vector3(rng.range(-0.4, 0.4), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'float', 3.6, () => seaY),
      update: (t) => w.userData.update(t),
    }
  },

  // Blue-white snowfield, little pines, snow falling.
  snow({ scene, rng, seed }) {
    const n = makeNoise(seed + 'sn')
    const h = (x, z) => n.fbm(x * 0.06, z * 0.06) * 4 * (0.25 + 0.75 * corridor(x, z)) + smooth(-14, -40, z) * 10
    const y0 = h(0, 0)
    const H = (x, z) => h(x, z) - y0
    scene.add(terrain(H, 120, 80, new THREE.MeshLambertMaterial({ map: snowTexture(seed, 30) })))
    scene.add(skyDome(skyTexture(seed, [[0, '#7d9ccc'], [0.5, '#dfe8f5'], [1, '#dfe8f5']], { clouds: 0.5, cloudColor: '#eef3fa' })))
    scene.fog = new THREE.Fog('#dfe8f5', 12, 55)
    lights(scene, { sky: '#eef4ff', ground: '#6a7a9a', hemi: 1.3, sunI: 0.9 })
    const pine = new THREE.MeshLambertMaterial({ color: '#1f4a3a', flatShading: true })
    for (let i = 0; i < 24; i++) {
      const x = rng.range(-30, 30), z = rng.range(-40, -10)
      if (Math.abs(x) < 4 && z > -12) continue
      const t = new THREE.Mesh(new THREE.ConeGeometry(rng.range(0.8, 1.4), rng.range(2.5, 4.5), 6), pine)
      t.position.set(x, H(x, z) + 1.5, z)
      scene.add(t)
    }
    const flakes = new THREE.BufferGeometry()
    const N = 900
    const fp = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      fp[i * 3] = rng.range(-20, 20)
      fp[i * 3 + 1] = rng.range(0, 14)
      fp[i * 3 + 2] = rng.range(-30, 8)
    }
    const base = fp.slice()
    flakes.setAttribute('position', new THREE.BufferAttribute(fp, 3))
    const pts = new THREE.Points(flakes, new THREE.PointsMaterial({ color: '#ffffff', size: 0.05, transparent: true, opacity: 0.85 }))
    scene.add(pts)
    const stage = new THREE.Vector3(0, H(0, -7), -7)
    return {
      stage, heightAt: H, skyTop: '#ffffff', skyLow: '#7d9ccc',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 6), 'ground', 3.2, H),
      update(t) {
        for (let i = 0; i < N; i++) {
          fp[i * 3 + 1] = ((base[i * 3 + 1] - t * 0.9) % 14 + 14) % 14 - 1
          fp[i * 3] = base[i * 3] + Math.sin(t * 0.8 + i) * 0.3
        }
        flakes.attributes.position.needsUpdate = true
      },
    }
  },

  // A floating island above a sea of clouds.
  cloudtops({ scene, rng, seed }) {
    const n = makeNoise(seed + 'ct')
    const island = new THREE.Group()
    const top = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.2, 0.6, 10), new THREE.MeshLambertMaterial({ map: grassTexture(seed, 3), flatShading: true }))
    top.position.y = -0.3
    const under = new THREE.Mesh(new THREE.ConeGeometry(4.2, 6, 10), new THREE.MeshLambertMaterial({ map: rockTexture(seed, '#3a2c22', '#8a7058', 2), flatShading: true }))
    under.rotation.x = Math.PI
    under.position.y = -3.6
    island.add(top, under)
    island.position.z = 0.5
    scene.add(island)
    const pal = rng.pick([['#7ab8ff', '#ffd6f0'], ['#9a8cff', '#ffe4c4'], ['#5ec8ff', '#fff2b8']])
    scene.add(skyDome(skyTexture(seed, [[0, pal[0]], [0.5, pal[1]], [1, pal[1]]], { clouds: 0.3 })))
    scene.fog = new THREE.Fog(pal[1], 25, 80)
    lights(scene, { sky: '#ffffff', ground: pal[0], hemi: 1.3, sunI: 1.2 })
    const cloudMat = new THREE.MeshLambertMaterial({ color: '#ffffff', flatShading: true })
    const clouds = []
    for (let i = 0; i < 70; i++) {
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(rng.range(1.5, 4), 0), cloudMat)
      const x = rng.range(-40, 40), z = rng.range(-60, 10)
      if (Math.hypot(x, z) < 5) continue
      c.position.set(x, -2.6 + n.fbm(x * 0.1, z * 0.1) * 1.5, z)
      c.scale.y = 0.5
      clouds.push(c)
      scene.add(c)
    }
    const stage = new THREE.Vector3(0, -0.6, -8)
    return {
      stage, heightAt: () => 0, skyTop: pal[1], skyLow: pal[0],
      hero: new THREE.Vector3(rng.range(-0.5, 0.5), 0, 0.6),
      spots: spots(rng, stage, rng.int(3, 5), 'float', 3.2, () => -0.4),
      update(t) {
        clouds.forEach((c, i) => (c.position.x += Math.sin(t * 0.2 + i) * 0.002))
      },
    }
  },
}

Object.assign(WORLDS, EXTRA_WORLDS)

export const WORLD_NAMES = Object.keys(WORLDS)

// Water signs lean to water worlds, fire to warm ones, and so on, but any
// sign can land anywhere.
const LEAN = {
  water: ['cavelake', 'poolrooms', 'nightsea', 'mallcourt'],
  fire: ['dunes', 'checker', 'hallway'],
  earth: ['meadow', 'snow', 'playground'],
  air: ['cloudtops', 'checker', 'moonbase'],
}

export function pickWorld(rng, element) {
  return rng.chance(0.55) ? rng.pick(LEAN[element]) : rng.pick(WORLD_NAMES)
}

export function buildWorld(name, ctx) {
  return { name, ...WORLDS[name](ctx) }
}
