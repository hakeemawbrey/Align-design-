// Story: Your Card Only Flips If It's Mutual (a Leo, the first Align World reel).
import * as THREE from 'three'
import * as E from '../engine.js'

const { CARD_BACK, CARD_H, CARD_W, FACE_H, FACE_W, HEAD_R, LIGHTING, LOOKS, SPR, SPRG, V, WIN, addHair, addHat, avatar, back, bloom, bokeh, box, boxCache, buildBusStop, buildPlaza, buildRoom, buildStreet, burst, cam, camera, canvas, cardBackCanvas, cardBackTex, cardFrontTex, cardMesh, cardWorld, cards, cast, clamp, clockTex, clouds, composer, drawCaption, drawFace, drift, easeInOut, easeOut, face, faceGeo, faceTex, fence, fill, focusOn, fx, glCanvas, glowTex, ground, handUp, hash, headGeo, hemi, hideAll, hideCast, holdCard, house, idle, lamp, lerp, light, mat, matCache, mesh, paintCard, paintedCanvas, place, pmrem, pose, rbox, renderer, road, rrect, scene, setCard, setGroup, sets, shirtTex, show, signOff, sky, skyMat, smooth, spriteTex, sprites, starPath, starShape, studTex, sun, tex, tree, uprightCard, vignette, walk, windowTex } = E

const crowdKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'a', 'c']
let painted, paintedGirl

export function build() {
  buildStreet(); buildRoom(); buildPlaza(); buildBusStop()
  place('hero', 'hero'); place('girl', 'girl'); place('sister', 'sister'); place('friend', 'friend')
  crowdKeys.forEach((k, i) => place('c' + i, k))
  place('m1', 'a'); place('m2', 'e')
  painted = paintedCanvas()
  paintedGirl = paintedCanvas()
  Object.assign(cards, {
    hero: cardMesh(cardFrontTex('hero', 'You', 'LEO · FIRE')),
    girl: cardMesh(cardFrontTex('girl', 'Juniper', 'PISCES · WATER')),
    sister: cardMesh(cardFrontTex('sister', 'Maya', 'GEMINI · AIR')),
    friend: cardMesh(cardFrontTex('friend', 'Rio', 'ARIES · FIRE')),
    friend2: cardMesh(cardFrontTex('friend', 'Rio', 'ARIES · FIRE')),
    m1: cardMesh(cardFrontTex('a', 'Noor', 'LIBRA · AIR')),
    m2: cardMesh(cardFrontTex('e', 'Ivy', 'TAURUS · EARTH')),
  })
  holdCard(cast.hero, cards.hero)
  holdCard(cast.girl, cards.girl)
  holdCard(cast.sister, cards.sister)
  holdCard(cast.friend, cards.friend)
  holdCard(cast.friend, cards.friend2, 'L')
  holdCard(cast.m1, cards.m1)
  holdCard(cast.m2, cards.m2)
  SPRG.spark = sprites('spark', 70, true)
  SPRG.spark2 = sprites('spark2', 70, true)
  SPRG.heart = sprites('heart', 26)
  SPRG.confetti = sprites('dot', 60)
  SPRG.flakes = sprites('dot2', 50)
  SPRG.motes = sprites('spark3', 40, true)
  SPRG.leaves = sprites('leaf', 18)
  SPRG.question = sprites('question', 3)
  // the swirl of cards above the plaza at 11:11
  const swirl = new THREE.InstancedMesh(new THREE.PlaneGeometry(CARD_W, CARD_H), new THREE.MeshStandardMaterial({ map: cardBackTex, transparent: true, side: THREE.DoubleSide, emissive: '#ffffff', emissiveMap: cardBackTex, emissiveIntensity: 0.5 }), 120)
  swirl.frustumCulled = false
  scene.add(swirl)
  SPRG.swirl = { children: [], swirl }
}


// Each shot: (t local seconds, d shot length, T absolute) → poses the world.
export const SHOTS = {
  intro(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.15)
    const pop = back((t - d * 0.62) / 0.35)
    pose(h, { ...idle(t), ...handUp(easeOut((t - d * 0.5) / 0.4)), face: t < d * 0.55 ? 'smile' : 'grin', bob: Math.sin(t * 2.4) * 0.03 + (t > d * 0.6 ? Math.max(0, Math.sin((t - d * 0.6) * 9)) * 0.25 * (1 - clamp((t - d * 0.6) / 0.6)) : 0) })
    cards.hero.visible = pop > 0.01
    cards.hero.scale.setScalar(Math.max(0.001, pop))
    uprightCard(cards.hero, 0, Math.sin(t * 3) * 0.05)
    setCard(cards.hero, { back: cardBackTex, glow: 0.6 * clamp(1 - (t - d * 0.62)) })
    cam('street', V(lerp(3.2, 2.6, t / d), 4.8, lerp(11.5, 10.0, t / d)), V(1.0, 4.3, 0), 38)
    h.updateMatrixWorld(true)
    burst(SPRG.spark, t, d * 0.62, cardWorld(cards.hero), { spread: 2.2, up: 0.6, size: 0.35, life: 1.1, gravity: -1 })
    drift(SPRG.motes, t, V(0, 5, 0), { w: 10, h: 6, d: 4, size: 0.12, opacity: 0.5 })
    focusOn(V(0, 4.4, 0), 'street', 0.0012)
  },
  cardBack(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.1)
    pose(h, { ...idle(t), ...handUp(1), face: 'curious' })
    cards.hero.visible = true
    cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, Math.sin(t * 1.4) * 0.22, Math.sin(t * 2) * 0.05)
    setCard(cards.hero, { back: cardBackTex, glow: 0.25 })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeInOut(t / d)
    camera.position.set(cw.x + lerp(1.4, 0.6, k), cw.y + 0.5, cw.z + lerp(4.2, 3.2, k))
    camera.fov = 34; camera.updateProjectionMatrix()
    camera.lookAt(cw.x - 0.1, cw.y + 0.15, cw.z)
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.004
    drift(SPRG.motes, t, cw, { w: 3, h: 3, d: 2, size: 0.05, opacity: 0.8, speed: 0.4 })
  },
  demoFlip(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const a = show('m1', 'street', -2.0, 0, 0, Math.PI / 2 - 0.35)
    const b = show('m2', 'street', 2.0, 0, 0, -Math.PI / 2 + 0.35)
    const fk = easeInOut((t - d * 0.72) / 0.45)
    const happy = t > d * 0.75
    pose(a, { ...idle(t, 1), ...handUp(1), face: happy ? 'happy' : 'smile' })
    pose(b, { ...idle(t, 2), ...handUp(1), face: happy ? 'happy' : 'shy' })
    // a little "align" nod each, a beat apart
    a.userData.head.rotation.x = t > d * 0.3 && t < d * 0.42 ? 0.18 : 0
    b.userData.head.rotation.x = t > d * 0.55 && t < d * 0.67 ? 0.18 : 0
    for (const c of [cards.m1, cards.m2]) { c.visible = true; c.scale.setScalar(1); uprightCard(c, fk * Math.PI, 0); setCard(c, { glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 1.2 }) }
    cam('street', V(lerp(-1.5, 1.5, t / d), 5.4, 17), V(0, 4.0, 0), 36)
    a.updateMatrixWorld(true); b.updateMatrixWorld(true)
    burst(SPRG.spark, t, d * 0.8, cardWorld(cards.m1), { spread: 2.5, size: 0.4, seed: 3 })
    burst(SPRG.spark2, t, d * 0.8, cardWorld(cards.m2), { spread: 2.5, size: 0.4, seed: 7 })
    focusOn(V(0, 4, 0), 'street', 0.0008)
  },
  sister(t, d) {
    light('day', V(0, 3, 0))
    sets.street.visible = true
    const s = show('sister', 'street', -6, 0, 2, 0.25)
    const jump = Math.max(0, Math.sin(t * 7)) * 0.9 * (t > 0.2 ? 1 : 0)
    pose(s, { ...idle(t, 3), armRx: -1.35, armRz: 0.45, armLx: -0.4, armLz: -0.8 - Math.sin(t * 7) * 0.2, face: 'laugh', bob: jump, legLx: jump * 0.4, legRx: -jump * 0.4 })
    cards.sister.visible = true
    cards.sister.scale.setScalar(1)
    uprightCard(cards.sister, Math.PI, 0.1)
    setCard(cards.sister, { glow: 0.7 })
    cam('street', V(-4.3, 5.6, 11.5), V(-5.5, 5.4, 2), 40)
    s.updateMatrixWorld(true)
    burst(SPRG.confetti, t, 0.05, V(-6, 9, 2).add(sets.street.position), { spread: 6, up: 1, size: 0.25, life: 2.4, gravity: -3, colors: ['#ff5a8a', '#f2cf4a', '#5ad1ff', '#7cff8a', '#b06cff'] })
    burst(SPRG.spark, t, 0.1, cardWorld(cards.sister), { spread: 1.8, size: 0.35, life: 1.6, seed: 4 })
    focusOn(V(-6, 5, 2), 'street', 0.0012)
  },
  friend(t, d) {
    light('day', V(0, 3, 0))
    sets.street.visible = true
    const f = show('friend', 'street', 7, 0, 1, -0.3)
    pose(f, { ...idle(t, 4), armRx: -1.5, armRz: 0.35, armLx: -1.5, armLz: -0.35, face: 'sly', tilt: 0.1 + Math.sin(t * 2) * 0.04 })
    for (const c of [cards.friend, cards.friend2]) { c.visible = true; c.scale.setScalar(1) }
    uprightCard(cards.friend, Math.PI, -0.18)
    uprightCard(cards.friend2, Math.PI, 0.18)
    setCard(cards.friend, { glow: 0.35 }); setCard(cards.friend2, { glow: 0.35 })
    const k = easeOut(t / 0.5)
    cam('street', V(lerp(9.5, 8.6, k), 4.6, lerp(12, 9.5, k)), V(7, 4.2, 1), 38)
    drift(SPRG.motes, t, V(7, 5, 1), { w: 6, h: 6, d: 3, size: 0.1, opacity: 0.6 })
    focusOn(V(7, 4.5, 1), 'street', 0.0012)
  },
  alone(t, d) {
    light('dusk', V(30, 3, -4))
    sets.street.visible = true
    const h = show('hero', 'street', 30, 0.15, -3.6, 0)
    // sitting: legs forward, slumped
    pose(h, { ...idle(t, 5, 0.4), legLx: -1.5, legRx: -1.5, armRx: -0.7, armLx: -0.7, armLz: 0.1, armRz: -0.1, nod: 0.18, face: 'sad', lean: 0.08 })
    h.userData.body.position.y = -1.0
    cards.hero.visible = true
    cards.hero.scale.setScalar(0.9)
    uprightCard(cards.hero, 0, 0)
    cards.hero.rotation.x = -1.0
    setCard(cards.hero, { back: cardBackTex, glow: 0 })
    const k = easeInOut(t / d)
    cam('street', V(30 + lerp(1.5, 3.5, k), lerp(4.6, 6.5, k), lerp(8, 15, k)), V(30, 3.4, -3.6), 36)
    for (const [i, s] of SPRG.leaves.children.entries()) { s.visible = true; const p = (hash(i) + t * 0.12 * (0.6 + hash(i + 1))) % 1; s.position.set(30 + (hash(i + 2) - 0.5) * 16 + Math.sin(t * 2 + i) * 0.8, 12 - p * 13, -4 + (hash(i + 3) - 0.3) * 8); s.scale.setScalar(0.35); s.material.rotation = t * 2 + i }
    focusOn(V(30, 3.6, -3.6), 'street', 0.001)
  },
  paint(t, d) {
    light('room', V(0, 3, -400))
    sets.room.visible = true
    const h = show('hero', 'room', 0, 0, 2.4, Math.PI)
    // seen from the desk side: hero faces the camera across the desk
    h.rotation.y = Math.PI
    h.position.z = sets.room.position.z + 3.0
    const brush = Math.sin(t * 9)
    pose(h, { ...idle(t, 6, 0.3), armRx: -1.0 + brush * 0.1, armRz: 0.3 + brush * 0.15, armLx: -0.9, armLz: -0.15, nod: 0.12, face: t < d * 0.4 ? 'sly' : 'grin', bob: -0.9 })
    h.userData.legL.rotation.x = -1.5; h.userData.legR.rotation.x = -1.5
    // the card lies on the desk, face down, being painted
    const c = cards.hero
    sets.room.add(c)
    c.visible = true
    c.scale.setScalar(1.4)
    c.position.set(0, 3.9, 0.4)
    c.rotation.set(-Math.PI / 2 + 0.35, 0, 0)
    setCard(c, { back: paintCard(painted, clamp((t - 0.2) / (d * 0.85))), glow: 0 })
    const k = easeInOut(t / d)
    cam('room', V(lerp(1.6, 1.0, k), lerp(5.9, 5.6, k), lerp(-5.6, -4.8, k)), V(0, 4.7, 1.8), 44)
    focusOn(V(0, 4.4, 1.2), 'room', 0.0012)
  },
  crowd(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0)
    pose(h, { ...idle(t, 7), armRx: -2.7, armRz: 0.1, face: t > 0.4 ? 'shock' : 'grin', bob: 0 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1.15)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0.4 })
    crowdKeys.forEach((_, i) => {
      const [px, pz] = [[-3.6, -1.2], [3.6, -1.0], [-6.2, -3.4], [6.0, -3.2], [-2.0, -5.2], [2.4, -5.6], [-8.4, -0.4], [8.6, -0.6]][i]
      const arrive = easeOut((t - i * 0.06) / 0.5)
      const c = show('c' + i, 'street', px * lerp(1.7, 1, arrive), 0, pz, 0)
      c.rotation.y = Math.atan2(-px, 6 - pz) * 0.75
      const hop = Math.max(0, Math.sin(t * 8 + i)) * 0.4
      pose(c, { ...idle(t, i), armRx: -2.4 - Math.sin(t * 8 + i) * 0.3, armLx: -2.4 + Math.sin(t * 8 + i) * 0.3, armRz: 0.3, armLz: -0.3, face: 'heart', bob: hop, ...(arrive < 1 ? walk(t, 1.4) : {}) })
    })
    cam('street', V(0, 6.2 - easeOut(t / d) * 0.6, 19 - easeOut(t / d) * 3), V(0, 4.8, -1.5), 44)
    h.updateMatrixWorld(true)
    SPRG.heart.children.forEach((s, i) => {
      const k = ((t * 0.7 + hash(i)) % 1)
      s.visible = true
      s.position.set((hash(i + 1) - 0.5) * 16, 4 + k * 8, (hash(i + 2) - 0.5) * 8)
      s.scale.setScalar(0.6 * Math.sin(k * Math.PI) + 0.1)
    })
    focusOn(V(0, 4.6, 0), 'street', 0.0006)
  },
  noFlip(t, d) {
    light('golden', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0.1)
    pose(h, { ...idle(t), ...handUp(1), face: 'worried' })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    // it tries to flip, then falls back, twice
    const tryFlip = Math.max(0, Math.sin(t * 7)) * 0.38 * (t < d * 0.8 ? 1 : 0)
    uprightCard(cards.hero, tryFlip, Math.sin(t * 30) * 0.03 * (tryFlip > 0.1 ? 1 : 0))
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0 })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeOut(t / d)
    camera.position.set(cw.x + 0.9, cw.y + 0.4, cw.z + lerp(4.4, 3.4, k))
    camera.fov = 36; camera.updateProjectionMatrix()
    camera.lookAt(cw.x - 0.35, cw.y + 0.35, cw.z)
    SPRG.question.children.forEach((s, i) => { const kk = clamp((t - 0.3 - i * 0.25) / 0.3); s.visible = kk > 0; s.position.set(cw.x - 1.2 + i * 1.1, cw.y + 1.6 + i * 0.15 + Math.sin(t * 4 + i) * 0.08, cw.z + 0.3); s.scale.setScalar(0.55 * back(kk)) })
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.003
  },
  turnAway(t, d) {
    light('gloomy', V(0, 3, 0))
    sets.street.visible = true
    const h = show('hero', 'street', 0, 0, 0, 0)
    pose(h, { ...idle(t, 8, 0.3), armRx: -0.6, face: 'sad', nod: 0.15 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: paintCard(painted, 1), glow: 0 })
    crowdKeys.forEach((_, i) => {
      const a = (i / crowdKeys.length) * Math.PI * 2 + 0.3
      const r = 5 + t * 2.2 + hash(i) * 2
      const c = show('c' + i, 'street', Math.cos(a) * r, 0, Math.sin(a) * r, 0)
      c.rotation.y = Math.atan2(Math.cos(a), Math.sin(a))
      pose(c, { ...walk(t + i, 1), face: 'down' })
    })
    const k = easeInOut(t / d)
    cam('street', V(0.5, lerp(11, 13, k), lerp(9, 12, k)), V(0, 3, 0), 44)
    focusOn(V(0, 3, 0), 'street', 0.0004)
  },
  clock(t, d) {
    light('night', V(0, 10, 0).add(sets.plaza.position))
    sets.plaza.visible = true
    const h = show('hero', 'plaza', 0, 0, 10, Math.PI)
    pose(h, { ...idle(t, 9, 0.4), face: 'shock', nod: -0.35 })
    // camera rises from behind the hero to the clock and the swirl of cards
    const k = easeInOut(t / d)
    cam('plaza', V(lerp(3, 1.5, k), lerp(5, 9, k), lerp(21, 24, k)), V(0, lerp(14, 26, k), -12), 46)
    const sw = SPRG.swirl.swirl
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler()
    const o = sets.plaza.position
    for (let i = 0; i < sw.count; i++) {
      const lift = clamp((t - 0.2 - hash(i) * 0.6) / 1.6)
      const a = hash(i * 3) * Math.PI * 2 + t * (0.9 + hash(i) * 0.6)
      const r = 4 + hash(i + 7) * 16
      const y = lerp(0.5, 18 + hash(i + 2) * 20, easeOut(lift))
      e.set(t * 2 + i, a + t * 3, t + i * 0.3)
      q.setFromEuler(e)
      m.compose(V(o.x + Math.cos(a) * r, y, o.z - 12 + Math.sin(a) * r * 0.7), q, V(1, 1, 1).multiplyScalar(0.9 * lift + 0.001))
      sw.setMatrixAt(i, m)
    }
    sw.instanceMatrix.needsUpdate = true
    sw.visible = true
    drift(SPRG.motes, t, V(0, 18, -10).add(o), { w: 30, h: 30, d: 10, size: 0.3, opacity: 0.9, speed: 0.2 })
    focusOn(V(0, 22, -12), 'plaza', 0.0002)
  },
  busStop(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.25)
    const h = show('hero', 'bus', -3.2, 0, 4.6, Math.PI - 0.5)
    const up = easeOut((t - d * 0.32) / 0.5)
    pose(g, { ...idle(t, 10), ...handUp(up), face: t > d * 0.32 ? 'shy' : 'down' })
    pose(h, { ...idle(t, 11), face: 'curious' })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0, 0.05)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0.3 * up })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(-4.6, -4.0, k), 6.0, lerp(10.5, 9.0, k)), V(0.6, 4.5, -1.6), 36)
    drift(SPRG.motes, t, V(0, 7, -1).add(sets.bus.position), { w: 8, h: 4, d: 4, size: 0.06, opacity: 0.6, speed: 0.15 })
    focusOn(V(1.2, 4.5, -1.6), 'bus', 0.0018)
  },
  girlConfess(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.1)
    pose(g, { ...idle(t, 12), ...handUp(1), armRx: -1.2, face: 'shy', tilt: 0.12, look: -0.1 })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0.25, 0.05)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0.15 })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(0.2, 0.6, k), 5.0, lerp(7.2, 6.2, k)), V(1.4, 4.3, -1.6), 36)
    focusOn(V(1.2, 4.6, -1.6), 'bus', 0.002)
  },
  scrape(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const h = show('hero', 'bus', -2.2, 0, 1.4, 0.35)
    const s = Math.sin(t * 14)
    pose(h, { ...idle(t, 13, 0.3), armRx: -1.35, armRz: 0.2, armLx: -1.3 + s * 0.08, armLz: -0.45 + s * 0.12, face: 'determined', nod: 0.12 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0.05)
    const sk = clamp((t - 0.2) / (d * 0.75))
    setCard(cards.hero, { back: paintCard(painted, 1, sk), glow: 0.4 * smooth((sk - 0.8) / 0.2) })
    h.updateMatrixWorld(true)
    const cw = cardWorld(cards.hero)
    const k = easeInOut(t / d)
    camera.position.set(cw.x + lerp(-1.6, -1.0, k), cw.y + 0.9, cw.z + lerp(5.4, 4.6, k))
    camera.fov = 38; camera.updateProjectionMatrix()
    camera.lookAt(cw.x + 0.3, cw.y + 0.5, cw.z)
    // paint flakes come off as it's scraped
    SPRG.flakes.children.forEach((sp, i) => {
      const tt = (t * 1.6 + hash(i)) % 1
      sp.visible = sk > 0.02 && sk < 0.99
      sp.position.set(cw.x + (hash(i + 1) - 0.5) * 1.4 + tt * 1.8 * (hash(i + 2) - 0.3), cw.y + (hash(i + 3) - 0.5) * 2 - tt * tt * 3, cw.z + 0.2 + tt)
      sp.scale.setScalar(0.09 + hash(i + 4) * 0.08)
      sp.material.color.set(['#ffb3c8', '#ffc4a8', '#ffd0dc'][i % 3])
      sp.material.opacity = 1 - tt
    })
    bokeh.uniforms.focus.value = camera.position.distanceTo(cw)
    bokeh.uniforms.aperture.value = 0.0025
  },
  honest(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const h = show('hero', 'bus', -2.2, 0, 1.4, 0.45)
    pose(h, { ...idle(t, 14), armRx: -0.4, armLx: -1.9 + Math.sin(t * 3) * 0.05, armLz: -0.9, face: t < d * 0.45 ? 'blush' : 'shy', tilt: -0.08, nod: -0.06 })
    cards.hero.visible = true; cards.hero.scale.setScalar(1)
    uprightCard(cards.hero, 0, 0)
    setCard(cards.hero, { back: cardBackTex, glow: 0 })
    const k = easeInOut(t / d)
    cam('bus', V(lerp(-0.6, -0.9, k), lerp(5.6, 5.4, k), lerp(8.6, 7.4, k)), V(-2.2, 4.8, 1.4), 36)
    // stars blink on over his head as he says it
    const o = sets.bus.position
    SPRG.spark.children.forEach((s, i) => {
      const on = clamp((t - d * 0.55 - hash(i) * 0.6) / 0.25)
      s.visible = on > 0 && i < 26
      s.position.set(o.x - 2.2 + (hash(i + 1) - 0.5) * 7, 7 + hash(i + 2) * 4, o.z + 1.4 + (hash(i + 3) - 0.5) * 3)
      const tw = 0.7 + 0.3 * Math.sin(t * 6 + i)
      s.scale.setScalar(0.35 * back(on) * tw)
      s.material.opacity = 1
    })
    focusOn(V(-2.2, 4.8, 1.4), 'bus', 0.0018)
  },
  laugh(t, d) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.2, 0, -1.6, -0.25)
    const shake = Math.abs(Math.sin(t * 16)) * 0.12
    pose(g, { ...idle(t, 15), armRx: -0.9, armLx: -1.6, armLz: -0.5, face: 'laugh', bob: shake, nod: -0.1 + shake * 0.6, tilt: 0.1 })
    cards.girl.visible = true; cards.girl.scale.setScalar(1)
    uprightCard(cards.girl, 0, 0)
    setCard(cards.girl, { back: paintCard(paintedGirl, 0, 0, true), glow: 0 })
    cam('bus', V(0.0, 5.3, 6.4 - t * 0.6), V(1.3, 4.7, -1.6), 36)
    focusOn(V(1.2, 4.7, -1.6), 'bus', 0.002)
  },
  bothFlip(t, d, endT) {
    light('night', V(0, 3, 0).add(sets.bus.position))
    sets.bus.visible = true
    const g = show('girl', 'bus', 1.5, 0, 0.6, -Math.PI / 2 + 0.35)
    const h = show('hero', 'bus', -1.9, 0, 0.6, Math.PI / 2 - 0.35)
    const fT = d * 0.4
    const fk = easeInOut((t - fT) / 0.55)
    const after = t > fT + 0.3
    pose(g, { ...idle(t, 16), armRx: -1.05, armRz: 0.2, face: after ? 'happy' : 'shy' })
    pose(h, { ...idle(t, 17), armRx: -1.05, armRz: 0.2, face: after ? 'happy' : 'blush' })
    if (after) { const j = Math.max(0, Math.sin((t - fT) * 8)) * 0.35 * clamp(1 - (t - fT - 0.3) / 1.2); g.userData.body.position.y += j; h.userData.body.position.y += j }
    for (const c of [cards.hero, cards.girl]) { c.visible = true; c.scale.setScalar(1); uprightCard(c, fk * Math.PI, 0) }
    setCard(cards.hero, { back: cardBackTex, glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 0.9 + (after ? 0.2 : 0) })
    setCard(cards.girl, { back: cardBackTex, glow: clamp(1 - Math.abs(fk - 0.5) * 2) * 0.9 + (after ? 0.2 : 0) })
    g.updateMatrixWorld(true); h.updateMatrixWorld(true)
    // camera: a slow orbit, then it cranes up into the stars for the sign-off
    const total = d + (endT || 0)
    const k = easeInOut(t / total)
    const crane = smooth((t - d) / Math.max(0.1, endT || 0.1))
    const ang = lerp(-0.25, 0.3, k)
    const o = sets.bus.position
    camera.position.set(o.x - 0.2 + Math.sin(ang) * 11, lerp(5.2, 8.5, crane), o.z + 0.6 + Math.cos(ang) * lerp(11, 15, crane))
    camera.fov = 38; camera.updateProjectionMatrix()
    camera.lookAt(o.x - 0.2, lerp(4.4, 7.5, crane), o.z + 0.6)
    burst(SPRG.spark, t, fT + 0.2, cardWorld(cards.hero), { spread: 3, up: 1, size: 0.3, life: 1.8, seed: 11 })
    burst(SPRG.spark2, t, fT + 0.2, cardWorld(cards.girl), { spread: 3, up: 1, size: 0.3, life: 1.8, seed: 13 })
    burst(SPRG.confetti, t, fT + 0.25, V(-0.2, 9, 0.6).add(o), { spread: 7, up: 1, size: 0.22, life: 3, gravity: -2.4, colors: ['#f2cf4a', '#c8b4ff', '#ffffff', '#ff8fb0'], seed: 5 })
    drift(SPRG.motes, t, V(-0.2, 8, 0.6).add(o), { w: 18, h: 10, d: 8, size: 0.14, opacity: after ? 0.9 : 0.3, speed: 0.15 })
    skyMat.uniforms.stars.value = 1 + (after ? 0.8 : 0)
    focusOn(V(-0.2, 4.5, 0.6), 'bus', 0.0009)
  },
}


export function reset() { SPRG.swirl.swirl.visible = false }
