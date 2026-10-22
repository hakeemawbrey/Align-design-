// More worlds. Same contract as the builders in worlds.js: each takes
// { scene, rng, seed } and returns { stage, heightAt, skyTop, skyLow, hero, spots, update }.
import * as THREE from 'three'
import { makeNoise, smooth } from './rng.js'
import { terrain, skyDome, sprite, lights, spots } from './worlds.js'
import {
  waterTexture, grassTexture, sandTexture, tileTexture, skyTexture, glowTexture,
  wallpaperTexture, carpetTexture, moonDustTexture, mallTileTexture, storefrontTexture, earthTexture,
} from './textures.js'

const lam = (color, extra = {}) => new THREE.MeshLambertMaterial({ color, flatShading: true, ...extra })

function box(w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  return m
}

// A cylinder strung between two points (poles, rails, chains).
function rod(a, b, r, mat, seg = 6) {
  const d = new THREE.Vector3().subVectors(b, a)
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), seg), mat)
  m.position.copy(a).addScaledVector(d, 0.5)
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())
  return m
}

// Creatures in a ring around something standing in the middle of the stage.
function ringSpots(rng, stage, n, rMin, rMax, mode, y) {
  const out = []
  const a0 = rng.range(0, Math.PI * 2)
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * Math.PI * 2 + rng.range(-0.3, 0.3)
    const r = rng.range(rMin, rMax)
    out.push({ pos: new THREE.Vector3(stage.x + Math.cos(a) * r * 1.15, y, stage.z + Math.sin(a) * r), mode })
  }
  return out
}

function texRepeat(tex, rx, ry) {
  const t = tex.clone()
  t.repeat.set(rx, ry)
  t.needsUpdate = true
  return t
}

export const EXTRA_WORLDS = {
  // A dead 90s mall atrium after closing: big glazed tiles, a fountain the
  // creatures float in, fake palms, shuttered shops, a skylight glowing.
  mallcourt({ scene, rng, seed }) {
    const stage = new THREE.Vector3(0, 0, -7.6)
    const R = rng.range(3.4, 3.9)
    const accent = rng.pick(['#d98c6a', '#4fa59a', '#c76f9a', '#6a8fd9'])
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshLambertMaterial({ map: mallTileTexture('#efe3c8', accent, '#a89474', 30) }))
    floor.rotation.x = -Math.PI / 2
    scene.add(floor)

    // fountain: a lathed rim, tiled basin, water, a tiered spout with spray
    const rimMat = new THREE.MeshLambertMaterial({ map: texRepeat(tileTexture('#f2ece0', '#b8a888', 4, 1), 24, 1) })
    const prof = [[R, -0.4], [R, 0.42], [R + 0.08, 0.5], [R + 0.42, 0.5], [R + 0.5, 0.42], [R + 0.5, 0]].map(([x, y]) => new THREE.Vector2(x, y))
    const rim = new THREE.Mesh(new THREE.LatheGeometry(prof, 40), rimMat)
    rim.position.copy(stage)
    scene.add(rim)
    const waterY = 0.22
    const wtex = waterTexture(seed, '#1c8fb0', '#9ff0ff', 2)
    const wat = new THREE.Mesh(new THREE.CircleGeometry(R + 0.02, 40), new THREE.MeshPhongMaterial({ map: wtex, transparent: true, opacity: 0.8, shininess: 90, specular: '#cfefff' }))
    wat.rotation.x = -Math.PI / 2
    wat.position.set(stage.x, waterY, stage.z)
    scene.add(wat)
    const bed = new THREE.Mesh(new THREE.CircleGeometry(R, 40), new THREE.MeshLambertMaterial({ map: tileTexture('#7fd6e0', '#3a8a9a', 8, 3) }))
    bed.rotation.x = -Math.PI / 2
    bed.position.set(stage.x, -0.3, stage.z)
    scene.add(bed)
    const stone = lam('#efe6d4')
    const spout = new THREE.Group()
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 1.3, 10), stone)
    col.position.y = 0.4
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.35, 0.22, 14), stone)
    bowl.position.y = 1.1
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.5, 8), stone)
    tip.position.y = 1.4
    spout.add(col, bowl, tip)
    spout.position.copy(stage)
    scene.add(spout)
    // spray: points on fixed parabolas, phase-shifted by t
    const NS = 260
    const sp = new Float32Array(NS * 3)
    const spray = []
    for (let i = 0; i < NS; i++) spray.push({ a: rng.range(0, Math.PI * 2), v: rng.range(0.6, 1.2), up: rng.range(1.4, 2.1), ph: rng.next() })
    const sprayGeo = new THREE.BufferGeometry()
    sprayGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    scene.add(new THREE.Points(sprayGeo, new THREE.PointsMaterial({ color: '#e8fbff', size: 0.05, transparent: true, opacity: 0.8 })))

    // shopfronts: a back wall with a balcony, and side walls running toward us
    const shops = (units) => new THREE.MeshLambertMaterial({ map: storefrontTexture(seed + 'u' + units, units) })
    const wallMat = lam('#e3d6ba')
    const back = new THREE.Group()
    const lower = new THREE.Mesh(new THREE.PlaneGeometry(36, 4.2), shops(6))
    lower.position.set(0, 2.1, 0)
    const slab = box(40, 0.5, 3, lam('#d8cab0'), 0, 4.45, 1.2)
    const upper = new THREE.Mesh(new THREE.PlaneGeometry(36, 4), shops(5))
    upper.position.set(0, 6.7, -2.5)
    const railMat = new THREE.MeshPhongMaterial({ color: '#c9ccd2', shininess: 80 })
    back.add(lower, slab, upper, box(40, 0.08, 0.08, railMat, 0, 5.75, 2.6), box(40, 0.6, 0.05, new THREE.MeshLambertMaterial({ color: '#bfe3e6', transparent: true, opacity: 0.45 }), 0, 5.0, 2.62))
    back.add(box(40, 3, 0.4, wallMat, 0, 10.2, -2.6))
    const backZ = rng.range(-21, -18)
    back.position.z = backZ
    scene.add(back)
    for (const s of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.PlaneGeometry(34, 4.2), shops(5))
      side.rotation.y = -s * Math.PI / 2
      side.position.set(s * 13, 2.1, backZ + 17)
      scene.add(side)
      const sideUp = new THREE.Mesh(new THREE.PlaneGeometry(34, 7), wallMat)
      sideUp.rotation.y = -s * Math.PI / 2
      sideUp.position.set(s * 13, 7.7, backZ + 17)
      scene.add(sideUp)
      for (let k = 0; k < 3; k++) {
        const pz = backZ + 4 + k * 8
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 11, 12), lam('#efe6d4'))
        p.position.set(s * 10, 5.5, pz)
        scene.add(p)
      }
    }
    // ceiling and skylight
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), lam('#d9ccb2'))
    ceil.rotation.x = Math.PI / 2
    ceil.position.y = 11.7
    scene.add(ceil)
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(12, 22), new THREE.MeshBasicMaterial({ map: texRepeat(tileTexture('#f4fbff', '#9aa8b0', 2, 1), 4, 7), fog: false }))
    glass.rotation.x = Math.PI / 2
    glass.position.set(0, 11.65, backZ + 10)
    scene.add(glass)

    // fake palms in round planters
    const trunkMat = lam('#8a6a44')
    const leafMat = new THREE.MeshLambertMaterial({ color: rng.pick(['#3f8f4a', '#4fa057', '#2f7f5a']), flatShading: true, side: THREE.DoubleSide })
    const palm = (x, z, h) => {
      const g = new THREE.Group()
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.6, 0.7, 12), lam('#e9dfca'))
      pot.position.y = 0.35
      g.add(pot)
      const lean = rng.range(-0.15, 0.15)
      let prev = new THREE.Vector3(0, 0.6, 0)
      for (let i = 1; i <= 5; i++) {
        const nxt = new THREE.Vector3(Math.sin(i * 0.4) * lean * i * 0.3, 0.6 + (h * i) / 5, 0)
        g.add(rod(prev, nxt, 0.16 - i * 0.015, trunkMat))
        prev = nxt
      }
      for (let i = 0; i < 8; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.28, 2.2, 4, 1), leafMat)
        leaf.scale.set(1, 1, 0.2)
        leaf.geometry.translate(0, 1.1, 0)
        const pivot = new THREE.Group()
        pivot.position.copy(prev)
        pivot.rotation.y = (i / 8) * Math.PI * 2 + rng.range(-0.2, 0.2)
        leaf.rotation.x = rng.range(1.1, 1.6)
        pivot.add(leaf)
        g.add(pivot)
      }
      g.position.set(x, 0, z)
      scene.add(g)
    }
    const ps = rng.sign()
    palm(ps * rng.range(5.6, 6.6), rng.range(-10, -8), rng.range(2.6, 3.2))
    palm(-ps * rng.range(6.2, 7.2), rng.range(-12, -10), rng.range(2.6, 3.4))
    palm(ps * rng.range(7.5, 8.5), rng.range(-3, -1), rng.range(2.4, 3))
    // a lonely wet-floor sign
    if (rng.chance(0.7)) {
      const sign = new THREE.Group()
      const yel = lam('#ffd21f')
      const a = box(0.42, 0.62, 0.03, yel, 0, 0.3, 0.12)
      a.rotation.x = -0.32
      const b = a.clone()
      b.position.z = -0.12
      b.rotation.x = 0.32
      sign.add(a, b)
      sign.position.set(rng.sign() * rng.range(2.6, 3.4), 0, rng.range(-4.5, -3.2))
      sign.rotation.y = rng.range(0, Math.PI)
      scene.add(sign)
    }

    scene.background = new THREE.Color('#e9dcc0')
    scene.fog = new THREE.Fog('#eadcbf', 14, 44)
    lights(scene, { sky: '#fff6e4', ground: '#b8a07a', hemi: 1.35, sun: '#fff2d8', sunI: 0.9, dir: [2, 12, 3] })
    const glow = new THREE.PointLight('#ffe6b8', 12, 14, 1.4)
    glow.position.set(stage.x, 5, stage.z)
    scene.add(glow)
    const spotList = ringSpots(rng, stage, rng.int(3, 5), 1.7, R - 0.7, 'float', waterY + 0.08)
    stage.y = waterY
    return {
      stage, heightAt: () => 0, skyTop: '#fff4dc', skyLow: '#8fd6dc',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spotList,
      update(t) {
        wtex.offset.set(t * 0.012, t * 0.02)
        wat.position.y = waterY + Math.sin(t * 2.1) * 0.012
        for (let i = 0; i < NS; i++) {
          const s = spray[i]
          const k = (t * 0.9 + s.ph) % 1
          const r = 0.15 + k * s.v
          sp[i * 3] = stage.x + Math.cos(s.a) * r
          sp[i * 3 + 1] = 1.65 + s.up * k - 3.4 * k * k
          sp[i * 3 + 2] = stage.z + Math.sin(s.a) * r
        }
        sprayGeo.attributes.position.needsUpdate = true
      },
    }
  },

  // The backrooms: a long mono-yellow corridor, damp carpet, humming
  // fluorescent panels, doorways into nothing.
  hallway({ scene, rng, seed }) {
    const W = rng.range(4.2, 5)
    const Hc = rng.range(3.6, 4)
    const z0 = 14, z1 = -46, L = z0 - z1, zc = (z0 + z1) / 2
    const pal = rng.pick([['#dccb72', '#b9a54c'], ['#e0cf86', '#bba65a'], ['#d4c060', '#a99238']])
    const wallTex = wallpaperTexture(seed, pal[0], pal[1], 1)
    wallTex.repeat.set(L / 3.2, 1)
    const wallMat = new THREE.MeshLambertMaterial({ map: wallTex })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, L), new THREE.MeshLambertMaterial({ map: carpetTexture(seed, '#9a8a52', '#cbbb7e', 1) }))
    floor.material.map.repeat.set(W, L / 2)
    floor.rotation.x = -Math.PI / 2
    floor.position.z = zc
    scene.add(floor)
    const ceilTex = tileTexture('#e9e2c4', '#a99f7a', 4, 1)
    ceilTex.repeat.set(W / 1.2, L / 2.4)
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, L), new THREE.MeshLambertMaterial({ map: ceilTex }))
    ceil.rotation.x = Math.PI / 2
    ceil.position.set(0, Hc, zc)
    scene.add(ceil)
    const doorMat = new THREE.MeshBasicMaterial({ color: '#2a2412' })
    const trimMat = lam('#cbb862')
    for (const s of [-1, 1]) {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(L, Hc), wallMat)
      wall.rotation.y = -s * Math.PI / 2
      wall.position.set(s * W, Hc / 2, zc)
      scene.add(wall)
      scene.add(box(0.06, 0.14, L, trimMat, s * (W - 0.03), 0.07, zc))
      // doorways into dark side rooms
      let z = rng.range(-6, -3)
      while (z > -40) {
        if (rng.chance(0.6)) {
          const dw = rng.range(1, 1.6)
          const d = new THREE.Mesh(new THREE.PlaneGeometry(dw, 2.3), doorMat)
          d.rotation.y = -s * Math.PI / 2
          d.position.set(s * (W - 0.02), 1.15, z)
          scene.add(d)
        }
        z -= rng.range(5, 9)
      }
    }
    // the far end turns: a wall with an opening that's just more yellow
    const endWall = new THREE.Mesh(new THREE.PlaneGeometry(2 * W, Hc), wallMat.clone())
    endWall.material.map = wallTex.clone()
    endWall.material.map.repeat.set((2 * W) / 3.2, 1)
    endWall.material.map.needsUpdate = true
    endWall.position.set(0, Hc / 2, z1)
    scene.add(endWall)
    const backWall = endWall.clone()
    backWall.rotation.y = Math.PI
    backWall.position.z = z0
    scene.add(backWall)
    // a partition sticking out from one wall, far enough to leave the view open
    const ps = rng.sign()
    scene.add(box(W * 0.55, Hc, 0.3, wallMat, ps * W * 0.725, Hc / 2, rng.range(-20, -16)))

    // fluorescent panels; a couple of them flicker
    const panels = []
    const onMat = new THREE.MeshBasicMaterial({ color: '#fffbe6' })
    for (let z = 10; z > z1; z -= 3.6) {
      for (const x of W > 4.6 ? [-1.4, 1.4] : [0]) {
        const m = new THREE.MeshBasicMaterial({ color: '#fffbe6' })
        const p = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.55), rng.chance(0.15) ? m : onMat)
        p.rotation.x = Math.PI / 2
        p.position.set(x, Hc - 0.01, z)
        p.userData.flick = p.material === m ? rng.range(0, 100) : -1
        panels.push(p)
        scene.add(p)
      }
    }
    scene.background = new THREE.Color(pal[0])
    scene.fog = new THREE.Fog(new THREE.Color(pal[0]).lerp(new THREE.Color('#fff6c8'), 0.3), 9, 40)
    lights(scene, { sky: '#fff8d8', ground: '#c8b46a', hemi: 1.5, sun: '#fff6d0', sunI: 0.5, dir: [0, 10, 1] })
    const stage = new THREE.Vector3(0, 0, -7.5)
    return {
      stage, heightAt: () => 0, skyTop: '#fff6c0', skyLow: '#8a7a3a',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 5), 'ground', 2.3, () => 0),
      update(t) {
        for (const p of panels) {
          if (p.userData.flick < 0) continue
          const k = Math.floor(t * 14 + p.userData.flick)
          const off = (Math.sin(k * 12.9898) * 43758.5453) % 1
          p.material.color.set(Math.abs(off) < 0.22 ? '#6b6648' : '#fffbe6')
        }
      },
    }
  },

  // An empty playground at dusk: slide, swings, a sandpit where the creatures
  // sit, one streetlight already on, the sky going pink.
  playground({ scene, rng, seed }) {
    const n = makeNoise(seed + 'pg')
    const stage = new THREE.Vector3(0, 0, -7.5)
    const h0 = (x, z) => {
      const flat = smooth(9, 18, Math.hypot(x, (z + 6) * 1.2))
      return n.fbm(x * 0.06 + 3, z * 0.06, 3) * 0.6 + flat * (n.fbm(x * 0.04, z * 0.04 + 9, 3) * 5 + smooth(-14, -40, z) * 4)
    }
    const y0 = h0(0, 0)
    const H = (x, z) => h0(x, z) - y0
    const grass = new THREE.MeshLambertMaterial({ map: sandTexture(seed + 'lawn', '#5a7448', '#b0c07c', 34) })
    scene.add(terrain(H, 140, 90, grass))

    // sandpit with a low timber frame
    const pw = rng.range(6.5, 7.5), pd = rng.range(5, 5.8)
    const sy = H(stage.x, stage.z) + 0.08
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(pw, pd), new THREE.MeshLambertMaterial({ map: sandTexture(seed, '#c99a6a', '#f2d3a2', 3) }))
    sand.rotation.x = -Math.PI / 2
    sand.position.set(stage.x, sy, stage.z)
    scene.add(sand)
    const wood = lam('#9a5e3a')
    scene.add(box(pw + 0.3, 0.35, 0.18, wood, stage.x, sy, stage.z + pd / 2))
    scene.add(box(pw + 0.3, 0.35, 0.18, wood, stage.x, sy, stage.z - pd / 2))
    scene.add(box(0.18, 0.35, pd, wood, stage.x - pw / 2, sy, stage.z))
    scene.add(box(0.18, 0.35, pd, wood, stage.x + pw / 2, sy, stage.z))
    if (rng.chance(0.7)) {
      const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.32, 10), lam(rng.pick(['#ff4a6a', '#3a7aff', '#ffd21f'])))
      bucket.position.set(stage.x + pw * 0.38, sy + 0.16, stage.z - pd * 0.3)
      bucket.rotation.z = rng.chance(0.5) ? 1.4 : 0
      scene.add(bucket)
    }

    // slide
    const side = rng.sign()
    const slide = new THREE.Group()
    const frame = lam(rng.pick(['#2f5fd0', '#2f9a8a', '#7a4fd0']))
    const chute = new THREE.MeshPhongMaterial({ color: rng.pick(['#ff4a3a', '#ffb21f', '#ff5aa0']), shininess: 60, flatShading: true })
    const ph = 2.2
    for (const [x, z] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) slide.add(box(0.1, ph + 1, 0.1, frame, x, (ph + 1) / 2, z))
    slide.add(box(1.1, 0.1, 1.1, frame, 0, ph, 0))
    for (let i = 0; i < 6; i++) slide.add(box(0.9, 0.06, 0.06, frame, 0, 0.35 + i * 0.36, 0.62))
    const run = box(0.9, 0.08, 3.8, chute, 0, ph / 2 - 0.05, -2.2)
    run.rotation.x = -Math.atan2(ph - 0.2, 3.4)
    slide.add(run)
    slide.add(box(0.9, 0.08, 0.7, chute, 0, 0.22, -4.2))
    const sx = side * rng.range(3.6, 4.4), sz = rng.range(-14.5, -13)
    slide.position.set(sx, H(sx, sz), sz)
    slide.rotation.y = side * rng.range(0.9, 1.4)
    scene.add(slide)

    // swing frame with two swings
    const swing = new THREE.Group()
    const steel = lam(rng.pick(['#d04a3a', '#e0a020', '#3a8ad0']))
    const sw = 3.2, sh = 2.6
    for (const x of [-sw / 2, sw / 2]) {
      swing.add(rod(new THREE.Vector3(x, 0, 0.9), new THREE.Vector3(x, sh, 0), 0.06, steel))
      swing.add(rod(new THREE.Vector3(x, 0, -0.9), new THREE.Vector3(x, sh, 0), 0.06, steel))
    }
    swing.add(rod(new THREE.Vector3(-sw / 2, sh, 0), new THREE.Vector3(sw / 2, sh, 0), 0.06, steel))
    const chainMat = lam('#555a60')
    const swings = []
    for (const x of [-0.7, 0.7]) {
      const p = new THREE.Group()
      p.position.set(x, sh, 0)
      p.add(rod(new THREE.Vector3(-0.25, 0, 0), new THREE.Vector3(-0.25, -2, 0), 0.015, chainMat, 4))
      p.add(rod(new THREE.Vector3(0.25, 0, 0), new THREE.Vector3(0.25, -2, 0), 0.015, chainMat, 4))
      p.add(box(0.6, 0.05, 0.22, lam('#2a2a2a'), 0, -2, 0))
      p.userData.ph = rng.range(0, 6)
      p.userData.amp = rng.range(0.05, 0.3)
      swings.push(p)
      swing.add(p)
    }
    const wx = -side * rng.range(3.4, 4.2), wz = rng.range(-15.5, -14)
    swing.position.set(wx, H(wx, wz), wz)
    swing.rotation.y = -side * rng.range(0.1, 0.4)
    scene.add(swing)

    // streetlight, already on
    const lx = side * rng.range(1.6, 2.4), lz = rng.range(-12.5, -11.2)
    const ly = H(lx, lz)
    const pole = lam('#3a3a44')
    scene.add(rod(new THREE.Vector3(lx, ly, lz), new THREE.Vector3(lx, ly + 4.6, lz), 0.07, pole))
    scene.add(rod(new THREE.Vector3(lx, ly + 4.6, lz), new THREE.Vector3(lx + side * 0.8, ly + 4.7, lz), 0.05, pole))
    const head = box(0.5, 0.12, 0.25, new THREE.MeshBasicMaterial({ color: '#fff0c0' }), lx + side * 0.85, ly + 4.62, lz)
    scene.add(head)
    scene.add(sprite(glowTexture('#fff2c8', 'rgba(255,220,160,0)', 0.12), 2.6, new THREE.Vector3(lx + side * 0.85, ly + 4.5, lz)))
    const lamp = new THREE.PointLight('#ffd9a0', 14, 12, 1.5)
    lamp.position.set(lx + side * 0.85, ly + 4.3, lz)
    scene.add(lamp)

    // a low fence and dark trees far off
    const fence = lam('#5a4a5a')
    for (let x = -24; x <= 24; x += 1.2) {
      const fz = -20 + Math.sin(x * 0.3) * 0.3
      scene.add(box(0.08, 1, 0.08, fence, x, H(x, fz) + 0.5, fz))
    }
    const treeMat = lam('#3a2a4a')
    for (let i = 0; i < 12; i++) {
      const x = rng.range(-40, 40), z = rng.range(-55, -28)
      const th = rng.range(3, 4.5)
      const t = new THREE.Mesh(new THREE.SphereGeometry(rng.range(1.6, 2.4), 7, 5), treeMat)
      t.scale.y = th / 3
      t.position.set(x, H(x, z) + th * 0.6, z)
      scene.add(box(0.3, th * 0.5, 0.3, treeMat, x, H(x, z) + th * 0.25, z))
      scene.add(t)
    }

    const pal = rng.pick([
      ['#2a2260', '#a04a8a', '#ff8a6a', '#ffc890'],
      ['#1e2a6a', '#8a4aa0', '#ff7a8a', '#ffd0a0'],
      ['#33245a', '#c05a7a', '#ffa070', '#ffe0a8'],
    ])
    scene.add(skyDome(skyTexture(seed, [[0, pal[0]], [0.28, pal[1]], [0.44, pal[2]], [0.5, pal[3]], [1, pal[3]]], { clouds: 0.45, cloudColor: '#ffb8a8', stars: 60 })))
    scene.add(sprite(glowTexture('#fff0d0', 'rgba(255,170,120,0)', 0.3), rng.range(18, 26), new THREE.Vector3(rng.range(-25, 25), 4, -110)))
    scene.fog = new THREE.Fog(pal[2], 22, 85)
    lights(scene, { sky: '#ffc8b0', ground: '#7a4a6a', hemi: 1.4, sun: '#ffb890', sunI: 1.1, dir: [-4, 4, -10] })
    return {
      stage: stage.setY(sy), heightAt: H, skyTop: pal[3], skyLow: pal[0],
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 5), 'ground', Math.min(pw, pd) * 0.34, () => sy),
      update(t) {
        for (const s of swings) s.rotation.x = Math.sin(t * 1.9 + s.userData.ph) * s.userData.amp
      },
    }
  },

  // A grey moon: craters, dust, a parked lander, the earth hanging in a black
  // sky. The creatures sit in a shallow crater.
  moonbase({ scene, rng, seed }) {
    const n = makeNoise(seed + 'mb')
    const stage = new THREE.Vector3(0, 0, -7.5)
    const craters = [{ x: stage.x, z: stage.z, r: rng.range(4.2, 4.8), d: 0.7 }]
    for (let i = 0; i < 26; i++) {
      const x = rng.range(-30, 30), z = rng.range(-45, -2)
      const r = rng.range(0.8, 3.5)
      if (Math.abs(x) < 3 + r && z > -3 - r) continue
      if (Math.hypot(x - stage.x, z - stage.z) < 5 + r) continue
      craters.push({ x, z, r, d: r * 0.22 })
    }
    const h0 = (x, z) => {
      let y = n.fbm(x * 0.08, z * 0.08, 4) * 1.2 + smooth(-18, -50, z) * (2 + n.fbm(x * 0.03, 5) * 9)
      for (const c of craters) {
        const d = Math.hypot(x - c.x, z - c.z) / c.r
        if (d < 1) y -= (1 - d * d) * c.d
        y += Math.exp(-((d - 1) * (d - 1)) / 0.05) * c.d * 0.35
      }
      return y
    }
    const y0 = h0(0, 0)
    const H = (x, z) => h0(x, z) - y0
    const dust = moonDustTexture(seed, rng.pick(['#4a4a50', '#504c48']), '#d2d2d6', 26)
    scene.add(terrain(H, 130, 120, new THREE.MeshLambertMaterial({ map: dust })))

    // boulders
    const rockMat = lam('#8a8a90')
    for (let i = 0; i < 14; i++) {
      const x = rng.range(-20, 20), z = rng.range(-30, -4)
      if (Math.abs(x) < 4 && z > -12) continue
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(rng.range(0.2, 0.7), 0), rockMat)
      r.position.set(x, H(x, z), z)
      r.rotation.set(rng.next() * 3, rng.next() * 3, 0)
      scene.add(r)
    }
    // lander on four legs
    const lander = new THREE.Group()
    const foil = new THREE.MeshPhongMaterial({ color: '#d8a83a', shininess: 100, specular: '#fff0b0', flatShading: true })
    const white = lam('#e8e8ec')
    lander.add(box(1.6, 1, 1.6, foil, 0, 1.4, 0))
    const cabin = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 0.9, 8), white)
    cabin.position.y = 2.35
    lander.add(cabin)
    for (const [x, z] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      lander.add(rod(new THREE.Vector3(x * 0.6, 1.2, z * 0.6), new THREE.Vector3(x * 1.3, 0.05, z * 1.3), 0.05, white))
      lander.add(box(0.4, 0.05, 0.4, white, x * 1.3, 0.03, z * 1.3))
    }
    const lside = rng.sign()
    const lx = lside * rng.range(4.5, 6), lz = rng.range(-18, -15)
    lander.position.set(lx, H(lx, lz), lz)
    lander.rotation.y = rng.range(0, Math.PI)
    scene.add(lander)
    // a flag, limp in the vacuum, on the other side
    const fx = -lside * rng.range(3.4, 4.2), fz = rng.range(-11, -9.5)
    const fy = H(fx, fz)
    scene.add(rod(new THREE.Vector3(fx, fy, fz), new THREE.Vector3(fx, fy + 2, fz), 0.03, white))
    const flag = box(0.9, 0.55, 0.02, lam(rng.pick(['#ff3a5a', '#ffffff', '#ff8ad0'])), fx + 0.45, fy + 1.7, fz)
    scene.add(flag)
    // a habitat dome far away with a lit window
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.6, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), white)
    const hx = -lside * rng.range(7, 11), hz = rng.range(-30, -24)
    dome.position.set(hx, H(hx, hz) - 0.2, hz)
    scene.add(dome)
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), new THREE.MeshBasicMaterial({ color: '#ffe08a' }))
    win.position.set(hx, H(hx, hz) + 0.9, hz + 2.45)
    scene.add(win)

    scene.add(skyDome(skyTexture(seed, [[0, '#000006'], [0.4, '#06081a'], [0.5, '#141a34'], [1, '#000000']], { stars: 0 })))
    const NST = 700
    const st = new Float32Array(NST * 3)
    for (let i = 0; i < NST; i++) {
      const a = rng.range(0, Math.PI * 2), e = Math.asin(rng.range(0.02, 1))
      st[i * 3] = Math.cos(a) * Math.cos(e) * 300
      st[i * 3 + 1] = Math.sin(e) * 300
      st[i * 3 + 2] = Math.sin(a) * Math.cos(e) * 300
    }
    const stGeo = new THREE.BufferGeometry()
    stGeo.setAttribute('position', new THREE.BufferAttribute(st, 3))
    scene.add(new THREE.Points(stGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 1.6, sizeAttenuation: false, fog: false })))
    const earth = sprite(earthTexture(seed), rng.range(20, 28), new THREE.Vector3(rng.sign() * rng.range(12, 20), rng.range(24, 29), -110))
    earth.material.transparent = true
    scene.add(earth)
    scene.fog = new THREE.Fog('#0a0c18', 30, 110)
    lights(scene, { sky: '#a8b8ff', ground: '#1a1a22', hemi: 0.75, sun: '#ffffff', sunI: 2.1, dir: [-lside * 8, 5, 3] })
    stage.y = H(stage.x, stage.z)
    return {
      stage, heightAt: H, skyTop: '#c8d4ff', skyLow: '#05060c',
      hero: new THREE.Vector3(rng.range(-0.6, 0.6), 0, 0),
      spots: spots(rng, stage, rng.int(3, 5), 'ground', 2.6, H),
      update(t) {
        earth.material.rotation = Math.sin(t * 0.05) * 0.02
      },
    }
  },
}
