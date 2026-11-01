// trlittleplate: LITTLE THINGS, "I made you a plate." (20 s vertical, Star Talk Trends §18.3, music: dreamy · E)
// The format's look lives in ./little.js (identical in all five tr-little films).
//   0–3.0     9:48 PM, a dark kitchen. The door bangs open: ♈ Aries, home late, running on fumes: "so hungry…"
//   3.0–7.2   Rule of three: the pot (lid up: empty… *echo*) · the pan (empty but one pea rolls away) · the fridge
//             (light on: ONE lemon). Aries droops onto the counter. THE STARS: "aries missed dinner. *again.*"
//             ♓ Pisces sits on top of the fridge, crying harder at every empty dish.
//   7.2       card cut.
//   7.2–12.2  ♋ Cancer hops in and slides a covered plate down the counter, a sticky note on the dome: FOR YOU ♥.
//             Dome up, steam: a full plate arranged into a smiley face. "kept it warm." Heart eyes, nom nom nom, clean
//             plate… and Cancer slides a SECOND covered plate: "dessert plate." Aries swoons flat.
//             THE STARS: "a plate says *i thought of you.*"
//   12.2–15.6 the patch shrinks up. Last line: "*Fed* and loved."
import {
  makeLittle, drawStarChar, signStar, R, S, speech, sfx, hearts, sparkles, drawBits, pisces, pop01, outK, r3,
  crescent, clamp, lerp, prog, ease, INK, BONE, GOLD, PINK, HEART, CREAM, HEART_BM,
} from './little.js'

const ARI = signStar('aries'), CAN = signStar('cancer')

const A = { door: 0.75, enter: [0.8, 1.3], hungry: 1.5 }
const B = { pot: [2.9, 3.9], pan: [4.1, 5.1], fridge: [5.3, 6.6], flop: 6.75 }
const C = { cancer: [7.3, 7.7], slide: [7.85, 8.25], dome: [8.65, 9.0], warm: 9.1, noms: [9.85, 10.05, 10.25], clean: 10.4, plate2: [10.8, 11.15], dessert: 11.2, swoon: 11.55 }

// ── the kitchen
function kitchen(x, t, fridgeOpen) {
  R(x, '#3f3a6e', 0, 0, S, 520)
  for (let j = 0; j < 7; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? '#47427a' : '#3f3a6e', i * 70, 230 + j * 44, 70, 44)   // tiles
  R(x, INK, 0, 226, S, 6)
  // window with the night (top middle)
  R(x, INK, 250, 60, 220, 140); R(x, '#16123a', 258, 68, 204, 124); crescent(x, 420, 110, 6)
  R(x, INK, 356, 60, 8, 140)
  // the door (left)
  // the fridge (right)
  R(x, INK, 590, 222, 200, 308); R(x, '#dfe7f5', 598, 230, 184, 292); R(x, '#c4cfe4', 598, 290, 184, 8)
  R(x, '#8f9bb8', 760, 250, 10, 30); R(x, '#8f9bb8', 760, 330, 10, 80)
  if (fridgeOpen > 0) {
    // the open fridge: a lit, empty box with ONE lemon
    const w = 184 * fridgeOpen
    R(x, '#fffbe6', 598, 298, 184, 224)
    const g = x.createRadialGradient(690, 400, 10, 690, 400, 260); g.addColorStop(0, `rgba(255,250,220,${0.5 * fridgeOpen})`); g.addColorStop(1, 'rgba(255,250,220,0)')
    x.fillStyle = g; x.fillRect(400, 200, 400, 400)
    R(x, '#d8d2b8', 604, 400, 172, 6)
    drawBits(x, ['..G..', '.YYY.', 'YYYYY', 'YYYYY', '.YYY.'], { Y: '#ffe14d', G: '#4aa676' }, 690, 380, 8)
    R(x, INK, 598 - w, 290, w, 232); R(x, '#dfe7f5', 604 - w, 296, w - 6, 220)
  }
  // the counter + stove
  R(x, INK, 0, 520, S, 22); R(x, '#e8d6b8', 0, 524, S, 14)
  R(x, '#6a4a86', 0, 542, S, 258); for (let i = 0; i < 5; i++) R(x, INK, 150 * i + 140, 560, 6, 220)
  for (let i = 0; i < 5; i++) R(x, '#8a6aa8', 150 * i + 60, 640, 40, 8)
  R(x, INK, 70, 500, 300, 24); R(x, '#2b2a44', 74, 504, 292, 16)                     // stove top
}
function door(x, k) {
  // the door on the left edge, swinging open at k
  R(x, INK, 0, 230, 30, 290)
  if (k < 0.99) { R(x, INK, 0, 240, 150 * (1 - k), 280); R(x, '#8a4f5e', 6, 246, 138 * (1 - k), 268) }
}
const POT = ['..KKKKKK..', 'KKKKKKKKKK', '.MMMMMMMM.', 'MMMMMMMMMM', 'MMMMMMMMMM', 'MMMMMMMMMM', '.MMMMMMMM.']
const LID = ['....KK....', '.KKKKKKKK.', 'KKKKKKKKKK']
const PAN = ['MMMMMMMMMM....', 'MMMMMMMMMMHHHH', '.MMMMMMMM.....']
const DOME = ['......KK......', '....KKKKKK....', '..KKKKKKKKKK..', '.KKWKKKKKKKKK.', 'KKWKKKKKKKKKKK', 'KKKKKKKKKKKKKK']
const FOOD = ['....RRRRRR....', '..RRRRRRRRRR..', '.RRRGRRRRGRRR.', 'RRRRRRRRRRRRRR', 'RRRORRRRRRORRR', 'RRRROOOOOORRRR', '.RRRRRRRRRRRR.']
const FCOL = { R: '#fff3d6', G: '#4aa676', O: '#ff8a3d', K: '#c4cfe4', W: '#ffffff', M: '#8f9bb8', H: '#4a3a2a' }
function plateAt(x, t, px, py, { full = 1, dome = 0, note = 1, steam = 0 }) {
  R(x, INK, px - 125, py - 6, 250, 20); R(x, CREAM, px - 119, py - 2, 238, 12)
  if (full > 0.01) drawBits(x, FOOD, FCOL, px, py - 36, 11 * full)
  if (steam > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.globalAlpha = steam * Math.sin(Math.PI * ph); R(x, '#ffffff', px - 40 + i * 40 + 8 * Math.sin(t * 4 + i), py - 80 - ph * 90, 8, 22); x.globalAlpha = 1 }
  if (dome < 0.99) {
    const dy = -dome * 140, a = 1 - dome
    drawBits(x, DOME, FCOL, px, py - 44 + dy, 16, { alpha: a, rot: -0.2 * dome })
    if (note > 0.01 && dome < 0.2) {
      // the sticky note: FOR YOU ♥
      x.save(); x.translate(px + 4, py - 50 + dy); x.rotate(-0.08); x.globalAlpha = a
      R(x, INK, -62, -26, 124, 52); R(x, '#ffe680', -58, -22, 116, 44)
      x.font = "800 22px Inter, sans-serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FOR YOU', -10, 1)
      drawBits(x, HEART_BM, { H: HEART }, 42, 0, 3, { outline: null })
      x.restore()
    }
  }
}

function draw(x, t) {
  const after = t >= 7.2
  const fo = !after ? ease.outCubic(prog(t, B.fridge[0], B.fridge[0] + 0.3)) * (1 - ease.inCubic(prog(t, B.fridge[1] - 0.25, B.fridge[1]))) : 0
  kitchen(x, t, fo)
  // ♓ Pisces on top of the fridge, crying harder at every empty dish
  const ptear = after ? (t > C.dome[0] ? 3 : 2) : t > B.fridge[0] ? 3 : t > B.pot[0] ? 2 : 1
  pisces(x, t, 690, 168, 130, ptear, { mood: after && t > C.dome[0] ? 'happy' : 'wide', look: [-1, 1], seed: 6 })
  door(x, ease.outCubic(prog(t, A.door - 0.1, A.door + 0.1)))
  if (t > A.door && t < A.door + 0.6) sfx(x, t, 110, 300, A.door, 'BANG', { size: 46, life: 0.55 })
  // the pot and the pan on the stove
  const lid = Math.sin(Math.PI * prog(t, B.pot[0] + 0.2, B.pot[1] - 0.1))
    if (lid > 0.5) sfx(x, t, 120, 300, B.pot[0] + 0.35, '*echo*', { size: 34, life: 0.6, col: BONE })
  // the lonely pea rolling off the pan
  if (!after && t > B.pan[0] + 0.3) {
    const r = prog(t, B.pan[0] + 0.3, B.pan[0] + 1.3)
    const px = lerp(250, 470, r), py = r < 0.6 ? 476 : 476 + 0 * r
    drawBits(x, ['.G.', 'GGG', '.G.'], { G: '#4aa676' }, px, py, 6, { rot: r * 8 })
    sfx(x, t, 250, 330, B.pan[0] + 0.25, 'one pea.', { size: 32, life: 0.8, col: BONE })
  }
  if (!after && fo > 0.6) sfx(x, t, 520, 280, B.fridge[0] + 0.4, 'a lemon.', { size: 36, life: 0.85, col: '#ffe14d' })
  // ♈ Aries
  const en = ease.outCubic(prog(t, ...A.enter))
  let axp = lerp(-80, 300, en)
  if (!after) {
    axp = lerp(axp, 250, ease.inOutQuad(prog(t, B.pot[0] - 0.3, B.pot[0])))
    axp = lerp(axp, 390, ease.inOutQuad(prog(t, B.pan[0] - 0.2, B.pan[0])))
    axp = lerp(axp, 470, ease.inOutQuad(prog(t, B.fridge[0] - 0.25, B.fridge[0])))
    axp = lerp(axp, 330, ease.inOutQuad(prog(t, B.flop - 0.1, B.flop + 0.2)))
  } else axp = 260
  let am = 'neutral', al = [0, 0], blink = 0.4, sq = 0
  if (!after) {
    if (t > B.pot[0] + 0.3) { am = 'wide'; al = [-1, 1]; blink = false }
    if (t > B.pan[0] + 0.3) { am = 'wide'; al = [-1, 1] }
    if (t > B.fridge[0] + 0.3) { am = 'wide'; al = [1, 0] }
    if (t > B.flop) { am = 'sleepy'; blink = undefined; sq = 0.22 * ease.outCubic(prog(t, B.flop, B.flop + 0.3)) }
  } else {
    am = 'sleepy'; blink = undefined; sq = 0.22
    if (t > C.slide[1] - 0.1) { am = 'wide'; al = [1, 1]; sq = 0; blink = false }
    if (t > C.dome[1]) { am = 'heart'; blink = undefined }
    if (t > C.clean) { am = 'sparkle'; al = [1, 0] }
    if (t > C.dessert + 0.1) { am = 'heart' }
    if (t > C.swoon) { sq = 0.35 * ease.outCubic(prog(t, C.swoon, C.swoon + 0.3)) }
  }
  const aHops = [A.enter[1], A.hungry, B.pot[0] + 0.3, B.pan[0] + 0.3, B.fridge[0] + 0.3, C.slide[1], C.dome[1], ...C.noms, C.clean, C.dessert + 0.1]
  drawStarChar(x, axp, 430 + (after && t > C.swoon ? 20 : 0), 230, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: al, blink, hops: aHops, seed: 3, glow: 1.15, squash: sq })
  drawBits(x, POT, FCOL, 120, 478, 9); drawBits(x, LID, FCOL, 120, 428 - lid * 60, 9, { rot: -0.25 * lid })
  drawBits(x, PAN, FCOL, 260, 494, 9)
  speech(x, t, 330, 260, A.hungry, 'so hungry…', { size: 34, tail: -1, life: 1.2, col: '#ffe7b0' })
  // ♋ Cancer + the plates (after the cut)
  if (after) {
    const ck = ease.outCubic(prog(t, ...C.cancer))
    const cHops = [C.cancer[1], C.slide[0], C.dome[0], C.warm, C.plate2[0], C.dessert]
    drawStarChar(x, lerp(900, 640, ck), 430, 230, t, { color: CAN.color, glyph: CAN.glyph, mood: t > C.dome[1] ? 'happy' : 'sparkle', look: [-1, 1], hops: cHops, seed: 9, glow: 1.15 })
    const sl = ease.outCubic(prog(t, ...C.slide))
    const dome = ease.inOutQuad(prog(t, ...C.dome))
    const eaten = prog(t, C.noms[0], C.clean)
    const pg = ease.inQuad(prog(t, C.plate2[0], C.plate2[0] + 0.2))
    if (pg < 1) { x.save(); x.globalAlpha = 1 - pg; plateAt(x, t, lerp(640, 430, sl) - pg * 60, 522, { dome, full: 1 - ease.inQuad(eaten), steam: dome * (1 - eaten) }); x.restore() }
    speech(x, t, 620, 250, C.warm, 'kept it warm.', { size: 32, tail: 1, life: 1.2, col: '#d8f3ff' })
    C.noms.forEach((n, i) => sfx(x, t, 330 + i * 40, 300 - i * 20, n, 'nom', { size: 38, life: 0.35, col: BONE, rot: i % 2 ? 0.12 : -0.12 }))
    sparkles(x, t, 430, 470, C.clean, 8, 100, 1, [GOLD, BONE, PINK], 20)
    if (t > C.plate2[0]) {
      const s2 = ease.outCubic(prog(t, ...C.plate2))
      plateAt(x, t, lerp(820, 450, s2), 522, { dome: 0, note: 0, full: 0 })
      speech(x, t, 620, 250, C.dessert, 'dessert plate.', { size: 32, tail: 1, life: 1.0, col: '#ffd6e6' })
    }
    sparkles(x, t, 430, 470, C.dome[1], 10, 130, 2, [GOLD, BONE, '#ff8a3d'], 22)
    if (t > C.dome[1]) hearts(x, t, 260, 300, C.dome[1] + 0.05, { n: 4, life: 1.3, cell: 6, spread: 100 })
    if (t > C.swoon) hearts(x, t, 260, 330, C.swoon, { n: 6, life: 1.4, cell: 6, spread: 150, seed: 3 })
  }
}

const EP = makeLittle({
  id: 'trlittleplate', accent: '#ff9a5c',
  tag: '“I made you *a plate.*”',
  draw,
  clock: [{ at: 0.7, text: '9:48 PM' }, { at: B.fridge[0], text: '9:50 PM' }, { at: 7.25, text: '9:51 PM' }],
  lines: [{ t: 3.1, text: 'aries missed dinner. *again.*' }, { t: 9.5, text: 'a plate says *i thought of you.*' }],
  last: '*Fed* and loved.',
  cues: () => [
    ['tom', A.door, 110, { gain: 0.25, decay: 0.2 }], ['tick', A.door, 0.07], ['whoosh', A.enter[0], 0.3, 0.03],
    ['pop', A.hungry, 659.25, 0.03, -0.2], ['pop', A.hungry + 0.15, 587.33, 0.025, -0.2],
    ['tick', B.pot[0] + 0.25, 0.05], ['pluck', B.pot[0] + 0.4, 523.25, 0.02, 0.9, -0.3], ['pluck', B.pot[0] + 0.7, 523.25, 0.012, 0.9, -0.3],
    ['tick', B.pan[0] + 0.3, 0.04], ...[0, 0.2, 0.4, 0.6].map(d => ['pop', r3(B.pan[0] + 0.4 + d), 1567.98 - d * 600, 0.015, 0.2]),
    ['whoosh', B.fridge[0], 0.3, 0.03], ['bell', B.fridge[0] + 0.35, 1318.51, 0.02, 0.8, 0.3], ['tick', B.fridge[1] - 0.05, 0.05],
    ['pluck', B.flop, 392, 0.03, 0.5, 0], ['pluck', B.flop + 0.2, 349.23, 0.03, 0.6, 0],
    ['whoosh', C.cancer[0], 0.3, 0.03], ['whoosh', C.slide[0], 0.35, 0.03], ['tick', C.slide[1], 0.05],
    ['whoosh', C.dome[0], 0.25, 0.03], ['bell', C.dome[1], 2093, 0.03, 1.0, 0], ['glitter', C.dome[1], C.dome[1] + 0.5],
    ['pop', C.warm, 1046.5, 0.03, 0.3],
    ...C.noms.map((n, i) => ['pop', n, [880, 987.77, 1174.66][i], 0.04, -0.2]), ['pluck', C.clean, 1567.98, 0.035, 0.5, 0],
    ['whoosh', C.plate2[0], 0.35, 0.03], ['tick', C.plate2[1], 0.05], ['pop', C.dessert, 1318.51, 0.035, 0.3],
    ['pluck', C.swoon, 1046.5, 0.035, 0.6, -0.2], ['pluck', C.swoon + 0.15, 783.99, 0.03, 0.6, -0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
