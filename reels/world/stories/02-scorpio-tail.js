// Story: If You Lie To A Scorpio, Their Tail Glows Red (Scorpio · 1 of 12).
//
// Her tail glows red at every lie on every date, until it lights up the whole
// diner and the fire department comes. She quits and tells her mom she
// doesn't need anyone, and the tail goes red at her. On the next date she
// says the honest thing first. He laughs, stands up, and he has a tail too.
import * as E from '../engine.js'
import * as Z from '../zodiac.js'

const { THREE, V, sets, cast, SPRG, fx, camera, bokeh, skyMat, light, show, cam, focusOn, pose, idle, walk, place, avatar, scene,
  sprites, burst, drift, hideAll, clamp, lerp, smooth, easeOut, easeInOut, back, hash, buildStreet, buildRoom, LOOKS } = E
const { addTail, setTail, addShades, addHelmet, phone, tray, buildDiner, dinerRed, drawGlyph } = Z

const RED = '#ff2a3c'
const crowdKeys = ['a', 'b', 'c', 'd', 'e', 'f']
let props = {}

function cast2(name, look) {
  const a = avatar(look)
  scene.add(a)
  cast[name] = a
  return a
}
const tailOf = (a) => a.userData.tail
function tailTip(a) { const v = new THREE.Vector3(); tailOf(a).sting.getWorldPosition(v); return v }
// sitting in a booth: hips on the seat, legs under the table
const sit = (extra = {}) => ({ legLx: -1.5, legRx: -1.5, bob: 0.32, ...extra })
// a beat that hits on a word: 0 before, rising to 1 just after
const hit = (t, at, rise = 0.08) => clamp((t - at) / rise)
const pulse = (t, at, len = 0.9) => { const k = (t - at) / len; return k < 0 || k > 1 ? 0 : Math.pow(1 - k, 1.5) }
const label = (k = 1) => ({ text: 'SCORPIO', color: RED, k, glyph: (x, cx, cy) => drawGlyph(x, 'scorpio', RED, cx, cy, 0.42) })

export function build() {
  buildStreet()
  buildRoom()
  buildDiner(V(0, 0, 400))
  addTail(cast2('hero', Z.LOOKS.scorpio))
  addTail(cast2('him', Z.LOOKS.scorpioHim), '#3a3448')
  cast2('hiker', Z.LOOKS.hiker)
  cast2('exGirl', Z.LOOKS.exGirl)
  addShades(cast2('smooth', Z.LOOKS.smooth))
  cast2('waiter', Z.LOOKS.waiter)
  addHelmet(cast2('firefighter', Z.LOOKS.firefighter))
  crowdKeys.forEach((k, i) => place('c' + i, k))
  props = {
    phoneEar: phone('call', 'MOM'),
    phoneEx: phone('call', 'EX'),
    tray: tray(),
    hose: (() => { const g = new THREE.Group(); const h = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 2.4, 16), E.mat('#2b2b2b')); h.rotation.x = Math.PI / 2; g.add(h); const n = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.6, 16), E.mat('#c9ccd4', { metalness: 0.8, roughness: 0.3 })); n.rotation.x = Math.PI / 2; n.position.z = 1.4; g.add(n); scene.add(g); return g })(),
  }
  SPRG.spark = sprites('spark', 60, true)
  SPRG.motes = sprites('spark3', 40, true)
  SPRG.redMotes = sprites('spark4', 40, true)
  SPRG.water = sprites('dot', 90)
  SPRG.heart = sprites('heart', 12)
  SPRG.redMotes.children.forEach((s) => s.material.color.set('#ff4050'))
  SPRG.water.children.forEach((s, i) => s.material.color.set(i % 3 ? '#bfe8ff' : '#ffffff'))
}

export function reset() {
  for (const p of Object.values(props)) p.visible = false
  for (const a of Object.values(cast)) if (a.userData.tail) { a.userData.tail.g.visible = true; setTail(a, {}) }
  dinerRed(0)
  for (const a of Object.values(cast)) a.userData.body.position.set(0, 0, 0)
}

// the booth: she sits on the left facing +x, the date on the right facing -x
function booth(date, t, faceHer, faceDate, extra = {}) {
  sets.diner.visible = true
  const h = show('hero', 'diner', -3.1, 0, 0, Math.PI / 2)
  const d = show(date, 'diner', 3.1, 0, 0, -Math.PI / 2)
  pose(h, { ...idle(t, 1, 0.5), ...sit(), armRx: -1.3, armLx: -1.3, face: faceHer, ...(extra.her || {}) })
  pose(d, { ...idle(t, 2), ...sit(), armRx: -1.3, armLx: -1.3, face: faceDate, ...(extra.date || {}) })
  h.updateMatrixWorld(true)
  d.updateMatrixWorld(true)
  return [h, d]
}
const dinerLight = () => light('room', V(0, 4, 400))
function backdropDiners(t, shocked = false) {
  ;[[-10, -3, 1], [10, -3, -1], [-10, 6, 1], [10, 6, -1], [12.2, -3, -1], [-12.2, 6, 1]].forEach(([x, z, s], i) => {
    const c = show('c' + i, 'diner', x - s * 3.1 * (i < 4 ? 1 : 0), 0, z, s * Math.PI / 2)
    if (shocked) pose(c, { ...idle(t, i + 4), armRx: -2.6, armLx: -2.6, armRz: 0.4, armLz: -0.4, face: 'shock', bob: Math.abs(Math.sin(t * 10 + i)) * 0.15 })
    else pose(c, { ...idle(t, i + 4, 0.5), ...sit(), armRx: -1.2, armLx: -1.2, face: ['smile', 'happy', 'smile', 'curious', 'smile', 'happy'][i] })
  })
}

export const SHOTS = {
  // the hook: a street full of people, each with a little power in the air
  power(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const z = lerp(-6, 0.5, easeOut(t / d))
    const h = show('hero', 'street', 0, 0, z, 0)
    pose(h, { ...walk(t, 0.8), face: 'smile' })
    setTail(h, { curl: 0.85, sway: Math.sin(t * 2) * 0.15, wag: 1, t })
    crowdKeys.forEach((_, i) => {
      const c = show('c' + i, 'street', [-6, 6, -9, 9, -4, 5][i], 0, [-6, -8, -11, -12, -14, -15][i] + Math.sin(t + i) * 0.4, [0.6, -0.6, 0.3, -0.3, 0.2, -0.4][i])
      pose(c, { ...idle(t, i), face: ['grin', 'happy', 'smile', 'laugh', 'smile', 'grin'][i] })
    })
    cam('street', V(0.8, 5.0, z + 10.5), V(0, 4.4, z - 2), 40)
    drift(SPRG.motes, t, V(0, 6, -8), { w: 22, h: 10, d: 14, size: 0.28, opacity: 0.9, speed: 0.25 })
    focusOn(V(0, 4.5, z), 'street', 0.0008)
    fx.label = label(clamp(t / 0.25))
  },
  tailReveal(t, d, _e, _T, wt) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0.5, 0.55)
    const lie = wt[10] ?? d * 0.75
    const g = hit(t, lie) * (0.75 + 0.25 * Math.sin(t * 18))
    pose(h, { ...idle(t), face: t > lie ? 'sly' : 'smile', look: -0.35 + Math.sin(t) * 0.04, armRz: 0.2, armRx: -0.2 })
    setTail(h, { curl: lerp(0.25, 1, easeOut(t / (d * 0.45))), glow: g, sway: 0.1 + Math.sin(t * 1.5) * 0.08, wag: 0.6, t })
    const k = easeInOut(t / d)
    cam('street', V(lerp(-3.6, -2.8, k), lerp(5.2, 6.0, k), lerp(8.2, 7.0, k)), V(0.4, 5.4, -0.2), 42)
    if (t > lie) fx.tint = `rgba(255,30,50,${0.12 * pulse(t, lie, 1.2)})`
    fx.label = label(1 - clamp((t - 1.2) / 0.3))
    focusOn(V(0, 5, 0.5), 'street', 0.001)
  },
  dating(t, d, _e, _T, wt) {
    dinerLight()
    sets.diner.visible = true
    const h = show('hero', 'diner', -3.1, 0, 0, Math.PI / 2)
    const dt = wt[4] ?? d * 0.5
    pose(h, { ...idle(t, 1), ...sit(), armRx: t < dt ? -1.9 : -1.3, armLx: t < dt ? -1.9 : -1.3, armRz: t < dt ? 0.9 : 0, armLz: t < dt ? -0.9 : 0, face: t < dt ? 'grin' : 'worried', look: -0.5 })
    setTail(h, { curl: 1, sway: Math.sin(t * 2) * 0.1, t })
    backdropDiners(t)
    const k = easeInOut(t / d)
    cam('diner', V(lerp(-12, -8, k), lerp(9, 7, k), lerp(16, 12, k)), V(-2, 4.5, 0), 40)
    focusOn(V(-3.1, 4.6, 0), 'diner', 0.0006)
  },
  date1(t, d) {
    dinerLight()
    const [h, dd] = booth('hiker', t, 'smile', 'grin', { date: { armRx: -2.4, armRz: -0.2 - Math.sin(t * 5) * 0.2, tilt: 0.1 } })
    setTail(h, { curl: 1, sway: 0.05, wag: t > d * 0.7 ? 2 : 0.3, t })
    backdropDiners(t)
    const k = easeInOut(t / d)
    cam('diner', V(-6.8, 6.2, lerp(3.2, 2.4, k)), V(2.6, 4.9, 0), 38)
    focusOn(V(3.1, 4.8, 0), 'diner', 0.0012)
  },
  red1(t, d) {
    dinerLight()
    const [h] = booth('hiker', t, 'sly', 'grin')
    setTail(h, { curl: 1, glow: hit(t, 0.02) * (0.85 + 0.15 * Math.sin(t * 30)), sway: 0.05, t })
    const tip = tailTip(h)
    cam('diner', V(lerp(0.6, 0.2, t / d), 6.4, lerp(5.4, 4.6, t / d)), V(-3.0, 6.0, 0), 40)
    fx.tint = `rgba(255,30,50,${0.2 * pulse(t, 0, 1)})`
    fx.shake = 0.8 * pulse(t, 0, 0.6)
    burst(SPRG.redMotes, t, 0.02, tip, { spread: 1.6, up: 0.4, size: 0.25, life: 0.9, gravity: 0 })
    focusOn(V(-3.1, 5.6, 0), 'diner', 0.0016)
  },
  date2(t, d, _e, _T, wt) {
    dinerLight()
    const ex = wt[8] ?? d * 0.75
    const [h, g] = booth('exGirl', t, 'smile', t > ex + 0.1 ? 'worried' : 'happy', { date: { look: t > ex + 0.1 ? -0.4 : 0, nod: t > ex + 0.1 ? 0.25 : 0 } })
    setTail(h, { curl: 1, sway: 0.05, wag: 0.3, t })
    const p = props.phoneEx
    p.visible = true
    const buzz = t > ex - 0.15 ? Math.sin(t * 70) * 0.02 : 0
    p.position.set(sets.diner.position.x + 1.6 + buzz, 3.42, sets.diner.position.z + 0.6)
    p.rotation.set(-Math.PI / 2, 0, -Math.PI / 2 + 0.3 + buzz * 3)
    backdropDiners(t)
    const k = easeInOut(t / d)
    cam('diner', V(-6.8, 6.6, lerp(2.4, 1.6, k)), V(2.4, 4.4, 0.2), 38)
    focusOn(V(3.1, 4.6, 0), 'diner', 0.001)
  },
  red2(t, d) {
    dinerLight()
    const [h, g] = booth('exGirl', t, 'sly', 'shock')
    setTail(h, { curl: 1, glow: hit(t, 0.02) * 1.3, sway: 0.08, wag: 1, t })
    const p = props.phoneEx
    p.visible = true
    p.position.set(sets.diner.position.x + 1.6 + Math.sin(t * 70) * 0.02, 3.42, sets.diner.position.z + 0.6)
    p.rotation.set(-Math.PI / 2, 0, -Math.PI / 2 + 0.3)
    dinerRed(0.35 * pulse(t, 0, 1))
    cam('diner', V(-0.8, 6.8, 8.6 - t * 0.8), V(-2.0, 5.8, 0), 42)
    fx.tint = `rgba(255,30,50,${0.26 * pulse(t, 0, 1)})`
    fx.shake = 1 * pulse(t, 0, 0.6)
    burst(SPRG.redMotes, t, 0.02, tailTip(h), { spread: 2.4, up: 0.5, size: 0.3, life: 1, gravity: 0 })
    focusOn(V(-1, 5, 0), 'diner', 0.0008)
  },
  date3(t, d) {
    dinerLight()
    const [h, s] = booth('smooth', t, 'curious', 'sly', { date: { armRx: -2.9, armRz: -0.4, armLx: -1.1, lean: -0.12, tilt: -0.08 + Math.sin(t * 2) * 0.03 } })
    setTail(h, { curl: 1, sway: 0.05, wag: t > d * 0.6 ? 3 : 0.4, t, glow: t > d * 0.8 ? 0.2 * Math.sin(t * 20) ** 2 : 0 })
    backdropDiners(t)
    const k = easeInOut(t / d)
    cam('diner', V(-1.2, lerp(3.8, 4.2, k), lerp(4.2, 3.4, k)), V(3.1, 5.0, 0), 40)
    focusOn(V(3.1, 4.8, 0), 'diner', 0.0012)
  },
  restaurantRed(t, d) {
    dinerLight()
    const [h, s] = booth('smooth', t, 'sly', 'shock', { date: { armRx: -2.8, armLx: -2.8, armRz: 0.4, armLz: -0.4 } })
    const strobe = 0.6 + 0.4 * Math.sign(Math.sin(t * 22))
    setTail(h, { curl: 1, glow: 2.2 * hit(t, 0.02), sway: Math.sin(t * 9) * 0.15, wag: 3, t })
    dinerRed(strobe)
    backdropDiners(t, true)
    // the waiter: tray goes up, plates go everywhere
    const w = show('waiter', 'diner', -6.2, 0, 3.2, Math.PI / 2 + 0.3)
    pose(w, { ...idle(t, 9), armRx: -2.9, armLx: -2.9, face: 'shock', bob: Math.max(0, Math.sin(t * 6)) * 0.4 })
    const tr = props.tray
    tr.visible = true
    const o = sets.diner.position
    const k = clamp(t / 1.3)
    tr.position.set(o.x - 5.8 + k * 1.5, 7.6 + k * 4 - k * k * 6, o.z + 3.2 + k * 0.5)
    tr.rotation.set(k * 4, 0, k * 2.5)
    tr.userData.plates.forEach((p, i) => { p.position.set(Math.cos(i * 2.1) * 0.5 + k * (i - 1) * 2.4, 0.08 + k * (3 + i) - k * k * 4, Math.sin(i * 2.1) * 0.5 + k * 1.5); p.rotation.set(k * (3 + i), k * i, k * 2) })
    const kk = easeOut(t / d)
    cam('diner', V(lerp(-2, 2, kk), lerp(15, 13, kk), lerp(18, 15, kk)), V(-1, 3.8, 1), 44)
    fx.tint = `rgba(255,20,40,${0.14 + 0.1 * strobe})`
    fx.shake = 0.7
    drift(SPRG.redMotes, t, V(0, 7, 2).add(o), { w: 24, h: 10, d: 16, size: 0.3, opacity: 1, speed: 0.6 })
    focusOn(V(-1, 4, 1), 'diner', 0.0004)
  },
  fire(t, d) {
    dinerLight()
    const [h] = booth('smooth', t, t > d * 0.35 ? 'down' : 'shock', 'shock')
    cast.smooth.visible = false
    const wet = clamp((t - d * 0.3) / (d * 0.5))
    setTail(h, { curl: lerp(1, 0.55, wet), glow: 1.6 * (1 - wet), sway: 0.05, t })
    dinerRed(0.5 * (1 - wet))
    const o = sets.diner.position
    const f = show('firefighter', 'diner', lerp(-11, -7.8, easeOut(t / 0.6)), 0, 5.5, Math.PI * 0.82)
    pose(f, { ...(t < 0.6 ? walk(t, 1.3) : idle(t, 3)), armRx: -1.4, armLx: -1.4, armRz: -0.3, armLz: 0.3, face: 'determined' })
    f.updateMatrixWorld(true)
    const hose = props.hose
    hose.visible = true
    const nozzle = V(0, 3.2, 1.7)
    f.localToWorld(nozzle)
    hose.position.copy(nozzle)
    hose.lookAt(h.position.x, 5.2, h.position.z)
    const target = V(h.position.x, 5.2, h.position.z)
    SPRG.water.children.forEach((s, i) => {
      const k = (t * 2.2 + hash(i)) % 1
      s.visible = t > d * 0.22
      const p = nozzle.clone().lerp(target, k)
      p.y += Math.sin(k * Math.PI) * 1.2 + (hash(i + 1) - 0.5) * 0.5 * k
      p.x += (hash(i + 2) - 0.5) * 0.8 * k
      p.z += (hash(i + 3) - 0.5) * 0.8 * k
      s.position.copy(p)
      s.scale.setScalar(0.12 + 0.2 * k)
      s.material.opacity = 0.9
    })
    cam('diner', V(-1.5, 6.2, 11.5), V(-4, 4.6, 2), 44)
    fx.tint = wet < 0.6 ? `rgba(255,20,40,${0.12 * (1 - wet)})` : null
    focusOn(V(-4, 4.6, 2), 'diner', 0.0006)
  },
  phoneCall(t, d, _e, _T, wt) {
    light('room', V(0, 3, -400))
    sets.room.visible = true
    const h = show('hero', 'room', -1, 0, 3, 0.25)
    const said = wt[9] ?? d * 0.6
    pose(h, { ...idle(t, 5), armRx: -2.7, armRz: -0.55, armLx: -0.3, armLz: -0.9, face: t > said ? 'determined' : 'down', tilt: 0.12 })
    setTail(h, { curl: 0.9, sway: Math.sin(t * 1.5) * 0.1, wag: 0.3, t })
    h.updateMatrixWorld(true)
    const p = props.phoneEar
    p.visible = true
    const ear = V(0.75, -0.05, 0.15)
    h.userData.head.localToWorld(ear)
    p.position.copy(ear)
    p.quaternion.copy(h.userData.head.getWorldQuaternion(new THREE.Quaternion()))
    p.rotateY(Math.PI / 2)
    const k = easeInOut(t / d)
    cam('room', V(lerp(1.5, 1.0, k), 5.6, lerp(11.5, 9.5, k)), V(-0.8, 4.6, 3), 40)
    focusOn(V(-1, 4.8, 3), 'room', 0.0012)
  },
  selfRed(t, d, _e, _T, wt) {
    light('room', V(0, 3, -400))
    sets.room.visible = true
    const h = show('hero', 'room', -1, 0, 3, 0.25)
    const on = wt[3] ?? d * 0.6
    pose(h, { ...idle(t, 5), armRx: t < on ? -2.7 : -0.6, armRz: t < on ? -0.55 : 0.4, armLx: -0.6, armLz: -0.4, face: t > on - 0.1 ? 'shock' : 'determined', nod: -0.1 })
    setTail(h, { curl: 1, glow: hit(t, on - 0.1, 0.15) * 2, sway: Math.sin(t * 6) * 0.1, wag: 1.5, t })
    h.updateMatrixWorld(true)
    // the phone drops
    const p = props.phoneEar
    p.visible = true
    const ear = V(0.75, -0.05, 0.15)
    h.userData.head.localToWorld(ear)
    const fall = clamp((t - on) / 0.5)
    p.position.copy(ear).add(V(0.3 * fall, -fall * fall * 4.4, 0.4 * fall))
    p.rotation.set(fall * 3, 0.5, fall * 2)
    const k = easeOut(t / d)
    cam('room', V(lerp(0.4, 0.1, k), 5.2, lerp(7.5, 6.2, k)), V(-0.9, 5.0, 3), 40)
    if (t > on) { fx.tint = `rgba(255,20,40,${0.1 + 0.16 * pulse(t, on, 1.2)})`; fx.shake = 0.9 * pulse(t, on, 0.6) }
    burst(SPRG.redMotes, t, on, tailTip(h), { spread: 2, up: 0.5, size: 0.3, life: 1.2, gravity: 0 })
    focusOn(V(-1, 5, 3), 'room', 0.0016)
  },
  realize(t, d) {
    light('room', V(0, 3, -400))
    sets.room.visible = true
    const h = show('hero', 'room', -6.5, 0, 2, 0.5)
    pose(h, { ...idle(t, 6, 0.4), legLx: -1.5, legRx: -1.5, bob: 0.9, armRx: -0.9, armLx: -0.9, armRz: -0.2, armLz: 0.2, nod: 0.22, face: t < d * 0.5 ? 'sad' : 'down' })
    setTail(h, { curl: 0.7, glow: 0.9 * (1 - smooth(t / d)) * (0.7 + 0.3 * Math.sin(t * 4)), sway: 0.2, t })
    const k = easeInOut(t / d)
    cam('room', V(lerp(-1.5, -3.0, k), 5.6, lerp(10, 8.2, k)), V(-6.2, 4.8, 2), 38)
    fx.tint = `rgba(255,20,40,${0.1 * (1 - smooth(t / d))})`
    focusOn(V(-6.5, 5, 2), 'room', 0.0014)
  },
  date4(t, d) {
    dinerLight()
    const [h, m] = booth('him', t, t < d * 0.4 ? 'worried' : 'determined', 'smile')
    setTail(h, { curl: 0.8, sway: 0.05, t })
    tailOf(m).g.visible = false
    backdropDiners(t)
    const k = easeInOut(t / d)
    // over his shoulder, onto her
    cam('diner', V(lerp(7.4, 6.8, k), 6.4, lerp(-2.2, -1.6, k)), V(-3.1, 4.9, 0), 38)
    focusOn(V(-3.1, 4.9, 0), 'diner', 0.0014)
  },
  confess(t, d, _e, _T, wt) {
    dinerLight()
    const scared = wt[3] ?? d * 0.3
    const [h, m] = booth('him', t, t < scared ? 'determined' : t < d * 0.7 ? 'blush' : 'shy', 'curious', { her: { armRx: -1.7, armLx: -1.7, armRz: 0.25, armLz: -0.25, tilt: Math.sin(t * 2) * 0.05 } })
    setTail(h, { curl: 0.55 + 0.1 * Math.sin(t * 2), sway: -0.35, wag: 0.4, t })
    tailOf(m).g.visible = false
    const k = easeInOut(t / d)
    cam('diner', V(lerp(1.6, 1.0, k), 5.2, lerp(3.4, 2.6, k)), V(-3.1, 5.0, 0), 38)
    focusOn(V(-3.1, 4.9, 0), 'diner', 0.002)
  },
  heLaughs(t, d, _e, _T, wt) {
    dinerLight()
    const good = wt[3] ?? d * 0.5
    const [h, m] = booth('him', t, 'shy', t < good ? 'laugh' : 'smile', { date: { bob: 0.32 + Math.abs(Math.sin(t * 16)) * 0.1 * (t < good ? 1 : 0), nod: t < good ? -0.12 : 0 } })
    tailOf(m).g.visible = false
    const k = easeInOut(t / d)
    cam('diner', V(lerp(-1.4, -0.9, k), 5.2, lerp(3.4, 2.6, k)), V(3.1, 5.0, 0), 38)
    focusOn(V(3.1, 4.9, 0), 'diner', 0.002)
  },
  twist(t, d, _e, _T, wt) {
    dinerLight()
    const up = wt[3] ?? d * 0.3
    const reveal = wt[5] ?? d * 0.6
    const [h, m] = booth('him', t, t > reveal ? 'shock' : 'curious', t > up ? 'sly' : 'smile')
    // he stands: legs straighten, he steps out of the booth
    const st = easeOut((t - up) / 0.5)
    m.position.x = sets.diner.position.x + lerp(3.1, 5.3, st)
    pose(m, { ...idle(t, 2), legLx: lerp(-1.5, 0, st), legRx: lerp(-1.5, 0, st), bob: lerp(0.32, 0, st), turn: lerp(0, -0.8, st), armRz: 0.2, armLz: -0.2, face: t > up ? 'sly' : 'smile' })
    setTail(m, { curl: lerp(0.05, 1, easeOut((t - reveal) / 0.7)), sway: 0.3, wag: 0.5, t })
    tailOf(m).g.visible = t > reveal - 0.1
    setTail(h, { curl: 1, sway: -0.2, t })
    const k = easeOut(t / d)
    cam('diner', V(lerp(-0.6, -1.2, k), lerp(3.4, 2.8, k), lerp(9, 10.5, k)), V(4.6, 5.6, 0), 44)
    if (t > reveal) burst(SPRG.spark, t, reveal, tailTip(m), { spread: 2.4, up: 0.5, size: 0.3, life: 1.3 })
    fx.shake = 0.5 * pulse(t, reveal, 0.4)
    focusOn(V(4.6, 5, 0), 'diner', 0.0008)
  },
  ending(t, d, endT) {
    dinerLight()
    sets.diner.visible = true
    // side by side by the window, tails arching into one heart
    const h = show('hero', 'diner', -1.05, 0, -5.4, 0.1)
    const m = show('him', 'diner', 1.05, 0, -5.4, -0.1)
    pose(h, { ...idle(t, 1), armRz: 0.25, face: 'happy', tilt: 0.1 })
    pose(m, { ...idle(t, 2), armLz: -0.25, face: 'happy', tilt: -0.1 })
    const meet = easeInOut(t / Math.min(d, 2.2))
    setTail(h, { curl: lerp(1, 0.92, meet), sway: lerp(0.3, 1.5, meet), t })
    setTail(m, { curl: lerp(1, 0.92, meet), sway: lerp(-0.3, -1.5, meet), t })
    h.updateMatrixWorld(true)
    m.updateMatrixWorld(true)
    const o = sets.diner.position
    // camera pulls back past the booths as the sign-off comes up
    const total = d + (endT || 0)
    const k = easeInOut(t / total)
    cam('diner', V(0, lerp(5.6, 7.2, k), lerp(5.5, 13, k)), V(0, lerp(5.6, 6.6, k), -5.4), 40)
    SPRG.heart.children.forEach((s, i) => {
      const kk = ((t * 0.35 + hash(i)) % 1)
      s.visible = t > 0.8
      s.position.set(o.x + (hash(i + 1) - 0.5) * 6, 5 + kk * 6, o.z - 5 + (hash(i + 2) - 0.5) * 3)
      s.scale.setScalar(0.4 * Math.sin(kk * Math.PI))
    })
    drift(SPRG.motes, t, V(0, 7, -5).add(o), { w: 14, h: 8, d: 4, size: 0.12, opacity: 0.6, speed: 0.15 })
    focusOn(V(0, 5, -5.4), 'diner', 0.0008)
  },
}
