// The twelve signs as characters, plus the props and sets their stories share.
//
// Every Align World reel stars one sign. A sign hero has a look (colours,
// hair, a glyph on the chest) and a piece of signature gear that can act in
// the story: Scorpio's tail glows when someone lies. The other signs are
// sketched here so each new story starts from a hero, not a blank avatar.

import * as E from './engine.js'

const { THREE, V, mat, mesh, box, rbox, canvas, tex, rrect, studTex, setGroup, scene, clamp, lerp, hash } = E

// ---------------------------------------------------------------- glyphs
// Drawn as strokes (no font has all twelve reliably), centred in a 256 box.
export function drawGlyph(x, sign, color, cx = 128, cy = 128, s = 1) {
  x.save()
  x.translate(cx, cy)
  x.scale(s, s)
  x.strokeStyle = color
  x.fillStyle = color
  x.lineWidth = 16
  x.lineCap = 'round'
  x.lineJoin = 'round'
  x.beginPath()
  const hump = (x0, w, top, bottom) => { x.moveTo(x0, bottom); x.lineTo(x0, top + w / 2); x.arc(x0 + w / 2, top + w / 2, w / 2, Math.PI, 0); x.lineTo(x0 + w, bottom) }
  switch (sign) {
    case 'scorpio':
      hump(-62, 38, -40, 44); hump(-24, 38, -40, 44)
      x.moveTo(14, 44); x.lineTo(14, -21); x.arc(33, -21, 19, Math.PI, 0); x.lineTo(52, 40); x.quadraticCurveTo(54, 52, 72, 50)
      x.stroke(); x.beginPath(); x.moveTo(60, 34); x.lineTo(80, 50); x.lineTo(58, 62); x.stroke(); break
    case 'virgo':
      hump(-62, 38, -40, 44); hump(-24, 38, -40, 44)
      x.moveTo(14, 44); x.lineTo(14, -21); x.arc(33, -21, 19, Math.PI, 0); x.lineTo(52, 10); x.quadraticCurveTo(52, 50, 20, 60); x.stroke(); break
    case 'aries': x.moveTo(0, 56); x.lineTo(0, -10); x.moveTo(0, -10); x.bezierCurveTo(-10, -60, -70, -60, -60, -20); x.moveTo(0, -10); x.bezierCurveTo(10, -60, 70, -60, 60, -20); x.stroke(); break
    case 'taurus': x.arc(0, 20, 34, 0, Math.PI * 2); x.moveTo(-60, -50); x.quadraticCurveTo(-40, -8, 0, -14); x.quadraticCurveTo(40, -8, 60, -50); x.stroke(); break
    case 'gemini': x.moveTo(-50, -50); x.quadraticCurveTo(0, -30, 50, -50); x.moveTo(-50, 54); x.quadraticCurveTo(0, 34, 50, 54); x.moveTo(-24, -40); x.lineTo(-24, 44); x.moveTo(24, -40); x.lineTo(24, 44); x.stroke(); break
    case 'cancer': x.arc(-24, -22, 16, 0, Math.PI * 2); x.moveTo(40, 22); x.arc(24, 22, 16, 0, Math.PI * 2); x.moveTo(-24, -38); x.quadraticCurveTo(40, -56, 60, -14); x.moveTo(24, 38); x.quadraticCurveTo(-40, 56, -60, 14); x.stroke(); break
    case 'leo': x.arc(-30, 16, 22, 0, Math.PI * 2); x.moveTo(-10, 6); x.bezierCurveTo(-20, -60, 50, -60, 30, 0); x.quadraticCurveTo(10, 40, 44, 54); x.stroke(); break
    case 'libra': x.moveTo(-60, 50); x.lineTo(60, 50); x.moveTo(-60, 22); x.lineTo(-24, 22); x.arc(0, 10, 26, Math.PI * 0.85, Math.PI * 0.15, false); x.lineTo(60, 22); x.stroke(); break
    case 'sagittarius': x.moveTo(-50, 50); x.lineTo(50, -50); x.moveTo(10, -50); x.lineTo(50, -50); x.lineTo(50, -10); x.moveTo(-36, -4); x.lineTo(4, 36); x.stroke(); break
    case 'capricorn': x.moveTo(-60, -40); x.lineTo(-36, 30); x.lineTo(-12, -40); x.lineTo(-12, 20); x.arc(18, 30, 26, Math.PI, Math.PI * 2.6); x.stroke(); break
    case 'aquarius': for (const y of [-14, 22]) { x.moveTo(-60, y); for (let i = 1; i <= 4; i++) x.lineTo(-60 + i * 30, y + (i % 2 ? -18 : 0)) } x.stroke(); break
    case 'pisces': x.moveTo(-50, -56); x.quadraticCurveTo(-10, 0, -50, 56); x.moveTo(50, -56); x.quadraticCurveTo(10, 0, 50, 56); x.moveTo(-40, 0); x.lineTo(40, 0); x.stroke(); break
  }
  x.restore()
}
const glyphEmblem = (sign, color) => (x) => { x.shadowColor = color; x.shadowBlur = 16; drawGlyph(x, sign, color, 128, 120, 0.85); x.shadowBlur = 0 }

// ---------------------------------------------------------------- the twelve
// Colour and gear for each sign's hero. Only Scorpio's gear is built so far;
// the rest are written down so the next story has somewhere to start.
export const SIGNS = {
  aries: { element: 'fire', color: '#e8453c', gear: 'ram horns that heat up when they want something' },
  taurus: { element: 'earth', color: '#3f9a5a', gear: "bull horns and a nose ring that won't move once it decides" },
  gemini: { element: 'air', color: '#f2c94a', gear: 'a twin who finishes every sentence (and starts some)' },
  cancer: { element: 'water', color: '#9ad0ff', gear: 'a shell backpack they can hide inside' },
  leo: { element: 'fire', color: '#f29a2e', gear: 'a mane that grows when anyone looks' },
  virgo: { element: 'earth', color: '#8fbf6a', gear: 'a clipboard that writes down everything that is wrong' },
  libra: { element: 'air', color: '#ff9ac1', gear: 'scales on their shoulders that tip with every choice' },
  scorpio: { element: 'water', color: '#c2183f', gear: 'a tail that glows red when someone lies' },
  sagittarius: { element: 'fire', color: '#8a5cf0', gear: 'a bow whose arrows land wherever they are going next' },
  capricorn: { element: 'earth', color: '#7a6a5a', gear: 'goat horns and a ladder that only goes up' },
  aquarius: { element: 'air', color: '#3fb6f0', gear: 'a water jug that pours out ideas' },
  pisces: { element: 'water', color: '#5ad1c0', gear: "fins that let them swim through other people's dreams" },
}

export const LOOKS = {
  scorpio: { skin: '#b97a52', shirt: '#4a0f26', emblem: glyphEmblem('scorpio', '#ff4b5c'), accent: '#ff4b5c', pants: '#18121a', shoes: '#c2183f', hair: 'long', hairColor: '#160b12' },
  scorpioHim: { skin: '#e2b089', shirt: '#17141c', emblem: glyphEmblem('scorpio', '#ff4b5c'), accent: '#ff4b5c', pants: '#2b2b38', shoes: '#f4f1ea', hair: 'curly', hairColor: '#2a1a12' },
  hiker: { skin: '#f1c9a5', shirt: '#4f7d3a', emblem: 'stripe', accent: '#d9c27a', pants: '#6b5a3a', shoes: '#5a3a22', hair: 'short', hairColor: '#c9a04a', hat: 'cap', hatColor: '#3f5f2a' },
  exGirl: { skin: '#e8b98f', shirt: '#ff8fb0', emblem: 'heart', accent: '#ffffff', pants: '#3a4f8a', shoes: '#fff', hair: 'long', hairColor: '#f0c24a' },
  smooth: { skin: '#8d5a3b', shirt: '#2b2b2b', emblem: 'zip', accent: '#d4af37', pants: '#1b1b1b', shoes: '#d4af37', hair: 'spiky', hairColor: '#120c08' },
  waiter: { skin: '#f3d0b0', shirt: '#ffffff', emblem: 'stripe', accent: '#1b1b1b', pants: '#1b1b1b', shoes: '#111', hair: 'short', hairColor: '#5a3a22' },
  firefighter: { skin: '#d9a77c', shirt: '#d8a92a', emblem: 'stripe', accent: '#e8e8e8', pants: '#d8a92a', shoes: '#111', hair: null },
  mom: { skin: '#b97a52', shirt: '#7c4dff', emblem: 'star', accent: '#fff', pants: '#2a2a2a', shoes: '#fff', hair: 'bun', hairColor: '#6a5a60' },
}

// ---------------------------------------------------------------- gear
// Scorpio's tail: a chain of segments from the lower back, arching over the
// head, a gold stinger at the end. curl 0 → hanging, 1 → full arch.
const TAIL_N = 20
export function addTail(av, color = '#8a1838') {
  const u = av.userData
  const g = new THREE.Group()
  g.position.set(0, 2.5, -0.45)
  u.body.add(g)
  const segM = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25, emissive: '#ff1a2e', emissiveIntensity: 0 })
  const segM2 = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).lerp(new THREE.Color('#000000'), 0.45), roughness: 0.35, metalness: 0.25, emissive: '#ff1a2e', emissiveIntensity: 0 })
  const segs = []
  for (let i = 0; i < TAIL_N; i++) {
    const r = lerp(0.44, 0.22, i / (TAIL_N - 1))
    const m = mesh(new THREE.SphereGeometry(r, 20, 14), i % 3 === 2 ? segM2 : segM)
    m.scale.set(1, 0.85, 1.1)
    g.add(m)
    segs.push(m)
  }
  const stingM = new THREE.MeshStandardMaterial({ color: '#ffcf4a', roughness: 0.25, metalness: 0.6, emissive: '#ff1a2e', emissiveIntensity: 0 })
  const sting = mesh(new THREE.ConeGeometry(0.16, 0.7, 16), stingM)
  g.add(sting)
  const glow = new THREE.PointLight('#ff2238', 0, 14, 1.6)
  g.add(glow)
  u.tail = { g, segs, sting, mats: [segM, segM2, stingM], glow }
  setTail(av, {})
  return av
}
export function setTail(av, { curl = 1, glow = 0, sway = 0, wag = 0, t = 0 } = {}) {
  const tl = av.userData.tail
  if (!tl) return
  let z = 0, y = 0
  let phi = Math.PI + 0.15
  const L = 0.62 * 12 / TAIL_N
  const turn = 3.6 * curl
  tl.segs.forEach((s, i) => {
    s.position.set(Math.sin(t * 3 + i * 0.4) * wag * 0.06 * i, y, z)
    phi -= turn / TAIL_N
    z += Math.cos(phi) * L
    y += Math.sin(phi) * L - (1 - curl) * 0.18
  })
  // stinger points along the last direction, then hooks down
  tl.sting.position.set(tl.segs[TAIL_N - 1].position.x, y, z)
  tl.sting.rotation.set(phi - Math.PI / 2 - 0.9 * curl, 0, 0)
  tl.g.rotation.y = sway
  tl.mats.forEach((m) => (m.emissiveIntensity = glow * 2.4))
  tl.glow.intensity = glow * 60
  tl.glow.position.set(0, y * 0.7, z * 0.7)
}

export function addShades(av) {
  const m = mat('#0d0d12', { roughness: 0.1, metalness: 0.6 })
  const g = new THREE.Group()
  g.add(box(0.5, 0.3, 0.1, m, -0.26, 0, 0, 0.05), box(0.5, 0.3, 0.1, m, 0.26, 0, 0, 0.05), box(1.36, 0.08, 0.08, m, 0, 0.1, -0.04, 0.03))
  g.position.set(0, 0.06, 0.66)
  av.userData.head.add(g)
  return av
}
export function addHelmet(av) {
  const h = av.userData.head
  const m = mat('#d62b2b', { roughness: 0.35 })
  const dome = mesh(new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m)
  dome.position.y = 0.28
  h.add(dome)
  const brim = mesh(new THREE.CylinderGeometry(1.15, 1.2, 0.1, 40), m)
  brim.position.set(0, 0.3, -0.1)
  h.add(brim)
  const [c, x] = canvas(128, 128)
  x.fillStyle = '#f2cf4a'; x.beginPath(); x.moveTo(64, 8); x.lineTo(118, 40); x.lineTo(100, 110); x.lineTo(28, 110); x.lineTo(10, 40); x.closePath(); x.fill()
  x.fillStyle = '#b01c1c'; x.font = '900 56px Poppins'; x.textAlign = 'center'; x.fillText('11', 64, 88)
  const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshStandardMaterial({ map: tex(c), transparent: true }))
  badge.position.set(0, 0.6, 0.78)
  badge.rotation.x = -0.3
  h.add(badge)
  return av
}
// a phone, either held to an ear or lying on a table
export function phone(screen = 'call', label = '') {
  const g = new THREE.Group()
  g.add(box(0.55, 1.0, 0.1, '#111216', 0, 0, 0, 0.06))
  const [c, x] = canvas(220, 400)
  const bg = x.createLinearGradient(0, 0, 0, 400); bg.addColorStop(0, '#2a1a4a'); bg.addColorStop(1, '#120a24'); x.fillStyle = bg; x.fillRect(0, 0, 220, 400)
  if (screen === 'call') {
    x.fillStyle = '#ff5a8a'; x.beginPath(); x.arc(110, 130, 54, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'; x.font = '900 58px Poppins'; x.textAlign = 'center'; x.fillText(label, 110, 150)
    x.font = '800 30px Poppins'; x.fillText('calling…', 110, 240)
    x.fillStyle = '#3ad07a'; x.beginPath(); x.arc(70, 330, 30, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ff3b3b'; x.beginPath(); x.arc(150, 330, 30, 0, Math.PI * 2); x.fill()
  }
  const t = tex(c)
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.47, 0.88), new THREE.MeshStandardMaterial({ map: t, emissive: '#ffffff', emissiveMap: t, emissiveIntensity: 0.9 }))
  scr.position.z = 0.055
  g.add(scr)
  scene.add(g)
  return g
}
export function tray() {
  const g = new THREE.Group()
  const t = mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.08, 32), mat('#c9ccd4', { metalness: 0.8, roughness: 0.25 }))
  g.add(t)
  const plates = []
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Group()
    p.add(mesh(new THREE.CylinderGeometry(0.42, 0.34, 0.08, 24), mat('#ffffff', { roughness: 0.2 })))
    const food = mesh(new THREE.SphereGeometry(0.24, 16, 10), mat(['#e0a050', '#c83a2a', '#7cc25a'][i]))
    food.scale.y = 0.55
    food.position.y = 0.1
    p.add(food)
    p.position.set(Math.cos(i * 2.1) * 0.5, 0.08, Math.sin(i * 2.1) * 0.5)
    g.add(p)
    plates.push(p)
  }
  g.userData.plates = plates
  scene.add(g)
  return g
}

// ---------------------------------------------------------------- the diner
// A late-night diner: checker floor, red booths, three pendant lamps whose
// light can be turned red, a neon sign and a window onto the night street.
export function buildDiner(origin = V(0, 0, 400)) {
  const g = setGroup('diner', origin)
  const [fc, fx] = canvas(256, 256)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { fx.fillStyle = (i + j) % 2 ? '#1d1a24' : '#efe9df'; fx.fillRect(i * 64, j * 64, 64, 64) }
  const ft = tex(fc); ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(10, 10)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ map: ft, roughness: 0.35, metalness: 0.05 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  g.add(floor)
  const wallM = mat('#f2e6cf', { roughness: 0.9 })
  const lowM = mat('#b8263a', { roughness: 0.6 })
  const backW = mesh(new THREE.BoxGeometry(60, 22, 0.5), wallM); backW.position.set(0, 11, -9); g.add(backW)
  g.add(box(60, 4, 0.6, lowM, 0, 2, -8.7, 0.05))
  for (const sx of [-16, 16]) { const w = mesh(new THREE.BoxGeometry(0.5, 22, 40), wallM); w.position.set(sx, 11, 10); g.add(w); g.add(box(0.6, 4, 40, lowM, sx * 0.98, 2, 10, 0.05)) }
  const ceil = mesh(new THREE.BoxGeometry(60, 0.5, 60), mat('#3a2a34')); ceil.position.y = 16; g.add(ceil)
  // window onto the street at night
  const [wc, wx] = canvas(512, 256)
  const sg = wx.createLinearGradient(0, 0, 0, 256); sg.addColorStop(0, '#0b1240'); sg.addColorStop(1, '#3a2f6a'); wx.fillStyle = sg; wx.fillRect(0, 0, 512, 256)
  for (let i = 0; i < 60; i++) { wx.fillStyle = 'rgba(255,255,255,0.8)'; wx.fillRect(hash(i) * 512, hash(i + 1) * 120, 2, 2) }
  for (let i = 0; i < 7; i++) { wx.fillStyle = ['#2d2a52', '#3a2a5a', '#24305a'][i % 3]; wx.fillRect(i * 76, 140 - hash(i) * 50, 70, 200); wx.fillStyle = '#ffd88a'; for (let k = 0; k < 4; k++) if (hash(i * 4 + k) > 0.4) wx.fillRect(i * 76 + 10 + (k % 2) * 30, 160 - hash(i) * 50 + Math.floor(k / 2) * 30, 18, 16) }
  const wt = tex(wc)
  const win = new THREE.Mesh(new THREE.PlaneGeometry(22, 8), new THREE.MeshStandardMaterial({ map: wt, emissive: '#ffffff', emissiveMap: wt, emissiveIntensity: 0.8 }))
  win.position.set(0, 9, -8.7)
  g.add(win)
  for (const wxp of [-11, -3.7, 3.7, 11]) g.add(box(0.4, 8.4, 0.5, '#d9d4cc', wxp, 9, -8.6, 0.05))
  g.add(box(22.6, 0.5, 0.7, '#d9d4cc', 0, 4.8, -8.5, 0.05), box(22.6, 0.5, 0.7, '#d9d4cc', 0, 13.2, -8.5, 0.05))
  // neon
  const [nc, nx] = canvas(512, 160)
  nx.font = '900 110px Poppins'; nx.textAlign = 'center'; nx.shadowColor = '#ff4fa0'; nx.shadowBlur = 30; nx.strokeStyle = '#ffd1e8'; nx.lineWidth = 6; nx.strokeText('DINER', 256, 118); nx.fillStyle = '#ff4fa0'; nx.fillText('DINER', 256, 118)
  const nt = tex(nc)
  const neon = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.9), new THREE.MeshBasicMaterial({ map: nt, transparent: true }))
  neon.position.set(-11, 14.4, -8.6)
  g.add(neon)
  // booths and tables: two rows; the hero's booth is at the origin
  const boothM = mat('#c8243a', { roughness: 0.45, metalness: 0.05 })
  const tableAt = (x, z) => {
    const tg = new THREE.Group()
    tg.add(box(4.2, 0.3, 3.0, '#f4f1ea', 0, 3.2, 0, 0.12))
    tg.add(box(4.3, 0.12, 3.1, '#c9ccd4', 0, 3.02, 0, 0.05))
    tg.add(box(0.5, 3, 0.5, '#9aa0aa', 0, 1.5, 0, 0.08))
    for (const sx of [-1, 1]) {
      tg.add(box(1.6, 1.8, 3.4, boothM, sx * 3.1, 0.9 + 0.5, 0, 0.3))
      tg.add(box(0.7, 3.4, 3.4, boothM, sx * 4.15, 2.4, 0, 0.3))
    }
    // ketchup, mustard, napkins
    tg.add(box(0.3, 0.7, 0.3, '#d62b2b', 1.4, 3.7, -1.0, 0.12), box(0.3, 0.7, 0.3, '#f2cf4a', 1.75, 3.7, -1.0, 0.12), box(0.6, 0.5, 0.4, '#c9ccd4', 1.0, 3.6, -1.1, 0.05))
    tg.position.set(x, 0, z)
    g.add(tg)
    return tg
  }
  tableAt(0, 0)
  tableAt(-10, -3)
  tableAt(10, -3)
  tableAt(-10, 6)
  tableAt(10, 6)
  // counter and stools on the right, back
  g.add(box(14, 3.4, 2, '#f4f1ea', 6, 1.7, -6.6, 0.1), box(14.2, 0.3, 2.3, '#c8243a', 6, 3.5, -6.6, 0.08))
  for (let i = 0; i < 5; i++) { g.add(box(0.3, 2.2, 0.3, '#9aa0aa', 1 + i * 2.6, 1.1, -4.8, 0.06)); const st = mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.35, 20), boothM); st.position.set(1 + i * 2.6, 2.3, -4.8); g.add(st) }
  // door on the left wall
  g.add(box(0.3, 7, 4, '#6b3f2a', -15.6, 3.5, 10, 0.08))
  // pendant lamps
  const lights = []
  for (const lx of [-10, 0, 10]) {
    g.add(box(0.06, 5, 0.06, '#1b1b1b', lx, 13.5, 0, 0.02))
    const shade = mesh(new THREE.ConeGeometry(1.0, 1.0, 24, 1, true), new THREE.MeshStandardMaterial({ color: '#2a8a7a', side: THREE.DoubleSide, roughness: 0.4, metalness: 0.4 }), false)
    shade.position.set(lx, 10.8, 0)
    g.add(shade)
    const bulb = mesh(new THREE.SphereGeometry(0.32, 16, 10), new THREE.MeshStandardMaterial({ color: '#fff4d6', emissive: '#ffcf7a', emissiveIntensity: 3 }), false)
    bulb.position.set(lx, 10.4, 0)
    g.add(bulb)
    const pl = new THREE.PointLight('#ffc98a', 60, 26, 1.4)
    pl.position.set(lx, 10.0, 0)
    if (lx === 0) { pl.castShadow = true; pl.shadow.mapSize.set(1024, 1024); pl.shadow.bias = -0.002 }
    g.add(pl)
    lights.push({ pl, bulb })
  }
  g.userData.lights = lights
  return g
}
// warm (0) to alarm red (1)
export function dinerRed(k) {
  const g = E.sets.diner
  if (!g) return
  for (const { pl, bulb } of g.userData.lights) {
    pl.color.set('#ffc98a').lerp(new THREE.Color('#ff1830'), k)
    pl.intensity = 60 + 40 * k
    bulb.material.emissive.set('#ffcf7a').lerp(new THREE.Color('#ff1830'), k)
  }
}
