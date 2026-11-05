// kxtve08 · Then vs Now: Extended · "Living Alone: Night One vs Year Ten" (60 s vertical, synthwave · Am). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♒ Aquarius mid-leap at a creak, a mattress on the floor, cereal flying · NOW ♒ Aquarius mid-spin in a
//         flat full of plants, the cereal bowl steady. Slam "Living alone: | night one vs *year ten.*" Freeze at 0.9.
//   6.6   1 · 7 PM MOVING IN   THEN three boxes and a lamp · NOW plants, a rug, a shelf of strange treasures
//  16.0   2 · 8 PM DINNER      THEN cereal from the box, standing · NOW cereal in a good bowl at a table, "growth."
//  25.4   3 · 10 PM THE NOISES THEN every creak is a panic · NOW knows every creak by name
//  34.8   4 · 11 PM THE QUIET  THEN calls home for an hour, lonely · NOW loves the quiet, building a tiny telescope
//  44.2   5 · MIDNIGHT THE KNOCK  THEN ♓ Pisces from next door with cookies, crying (new too) · NOW Pisces again, best
//                                 friend now, cookies again, crying because it's been ten years
//  57.9   last line "Living alone. | *Never* lonely." → cut at 60.
import {
  makeThenNowX, star, room, R, speech, hearts, sparkles, drawBits, drawPixelStar, oldPhone,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'

const C = T.ch, SPL = SPLIT
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1560 }

function bare(x, t) {
  room(x, t, { wall: '#7a6a5a', floor: '#4a3a2a', old: true, winX: 640, winW: 280, lamp: false })
  // no curtains, three boxes, a lamp on the floor, a mattress
  for (const [bx, by, w] of [[120, 430, 130], [150, 340, 100], [800, 440, 120]]) { R(x, INK, bx - 4, by - 84, w + 8, 88); R(x, '#c8a070', bx, by - 80, w, 80); R(x, '#a07850', bx + w / 2 - 6, by - 80, 12, 80) }
  R(x, INK, 300, 470, 380, 60); R(x, '#e8e0f0', 306, 476, 368, 48)
  R(x, INK, 720, 370, 50, 60); R(x, '#ffe08a', 726, 376, 38, 30); R(x, INK, 740, 430, 10, 20)
}
function full(x, t) {
  room(x, t, { wall: '#3a5a5a', floor: '#2a3a3a', winX: 640, winW: 280, lamp: true })
  R(x, INK, 640, 70, 20, 240); R(x, INK, 900, 70, 20, 240); R(x, '#c86a8a', 642, 72, 16, 236); R(x, '#c86a8a', 902, 72, 16, 236)
  R(x, INK, 220, 140, 260, 16); R(x, INK, 220, 250, 260, 16)
  const trinkets = [['#7fd0ff', 30], ['#f2c75c', 40], ['#ff8fb1', 26], ['#9fe6b0', 36], ['#c9a6ff', 30]]
  trinkets.forEach(([c, h], k) => { R(x, INK, 236 + k * 48, 140 - h - 2, 34, h + 2); R(x, c, 238 + k * 48, 140 - h, 30, h) })
  drawPixelStar(x, 300, 220, 30, 2, GOLD); R(x, '#8a6a4a', 360, 200, 60, 50)
  for (const [px, py, s] of [[90, 440, 14], [560, 450, 11], [960, 440, 12]]) drawBits(x, ['..G.G..', '.GGLGG.', 'GGLGLGG', '.GGGGG.', '..GLG..', '.PPPPP.', '.PPPPP.', '..PPP..'], { G: '#4fbf6a', L: '#8fe39a', P: '#c8643c' }, px, py - 50, s)
  R(x, '#6a4a8a', 220, 500, 560, 60)
}
function cereal(x, cx, cy, flying = 0, t = 0) {
  if (flying > 0) { const r = rng(3); for (let i = 0; i < 16; i++) { const a = -Math.PI * r(), v = 120 + r() * 200; R(x, '#f2c75c', cx + Math.cos(a) * v * flying, cy + Math.sin(a) * v * flying + 80 * flying * flying, 10, 10) } }
}
function bowl(x, cx, cy) { R(x, INK, cx - 50, cy - 10, 100, 50); R(x, '#f4f0ff', cx - 46, cy - 6, 92, 42); for (let i = 0; i < 6; i++) R(x, '#f2c75c', cx - 36 + i * 13, cy - 14, 10, 10) }
function cerealBox(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -40, -70, 80, 140); R(x, '#ff7a4a', -36, -66, 72, 132); drawPixelStar(x, 0, -20, 30, 2, '#ffe08a'); x.restore() }
function telescope(x, cx, cy, k) { x.save(); x.translate(cx, cy); R(x, INK, -4, 0, 8, 100); R(x, INK, -40, 90, 80, 10); x.rotate(-0.5); x.scale(k, 1); R(x, INK, -10, -20, 140, 36); R(x, '#c8c8e0', -6, -16, 132, 28); x.restore() }
function doorFrame(x, open) { R(x, INK, 760, 120, 180, 330); R(x, '#14102a', 766, 126, 168, 324); x.save(); x.translate(766, 126); x.scale(1 - 0.8 * open, 1); R(x, '#8a5a3a', 0, 0, 168, 324); R(x, GOLD, 140, 160, 14, 14); x.restore() }
function cookies(x, cx, cy) { R(x, INK, cx - 50, cy - 8, 100, 20); R(x, '#f4f0ff', cx - 46, cy - 4, 92, 12); for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(cx - 28 + i * 28, cy - 14, 15, 0, TAU); x.fill(); x.fillStyle = '#d8a050'; x.beginPath(); x.arc(cx - 28 + i * 28, cy - 14, 12, 0, TAU); x.fill() } }

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  bare(x, t)
  if (i < 0) {
    cerealBox(x, 560, 360, 0.6); cereal(x, 560, 330, 0.6 + 0.1 * Math.sin(t * 3))
    star(x, t, { sign: 'aquarius', x: 430, y: 300, s: 170, mood: 'wide', bangs: '#3a5a8a', seed: 3, squash: -0.16 })
    speech(x, t, 760, 140, -1, 'CREAK', { size: 40, life: 4.3, col: '#ffd0d0', shake: 4 })
    return
  }
  if (i === 0) {
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: u > 2 ? 'neutral' : 'happy', bangs: '#3a5a8a', seed: 3, look: [1, -0.5] })
    speech(x, t, 480, 170, C[0] + 1.2, 'home…?', { size: 32, life: 2.6, col: BONE })
  } else if (i === 1) {
    star(x, t, { sign: 'aquarius', x: 480, y: 390, s: 160, mood: 'neutral', bangs: '#3a5a8a', seed: 3, hops: [C[1] + 0.8, C[1] + 1.6, C[1] + 2.4] })
    cerealBox(x, 620, 360, 0.2)
  } else if (i === 2) {
    const creaks = [C[2] + 0.5, C[2] + 1.7, C[2] + 2.9]
    const jump = creaks.some(c => inR(t, c, c + 0.5))
    star(x, t, { sign: 'aquarius', x: 480, y: jump ? 340 : 400, s: 160, mood: 'wide', bangs: '#3a5a8a', seed: 3, hops: creaks })
    creaks.forEach((c, k) => speech(x, t, [200, 780, 520][k], [160, 200, 120][k], c, ['CREAK', 'DRIP', 'WHIRR'][k], { size: 34, life: 0.9, col: '#ffd0d0', shake: 3 }))
  } else if (i === 3) {
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: 'sleepy', bangs: '#3a5a8a', seed: 3, look: [1, 0] })
    oldPhone(x, 580, 340, 1.0, 0.3)
    x.font = `700 26px ${MONO}`; x.fillStyle = '#ffd0d0'; x.textAlign = 'center'; x.fillText(`CALL: 0:${String(Math.min(59, Math.floor(u * 9))).padStart(2, '0')}:00`, 480, 160)
  } else {
    const op = prog(t, C[4] + 0.4, C[4] + 1.2)
    doorFrame(x, op)
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: op > 0.5 ? 'sparkle' : 'wide', bangs: '#3a5a8a', seed: 3, look: [1, 0] })
    if (op > 0.3) { star(x, t, { sign: 'pisces', x: 850, y: 380, s: 140, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6, pop: pop01(t, C[4] + 0.6, 0.4) }); cookies(x, 760, 430) }
    if (op <= 0) speech(x, t, 850, 120, C[4] + 0.1, 'KNOCK KNOCK', { size: 30, life: 0.8, col: '#fff3c8' })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  full(x, t)
  if (i < 0) {
    bowl(x, 620, 380)
    star(x, t, { sign: 'aquarius', x: 430, y: 330, s: 170, mood: 'sparkle', seed: 3, squash: 0.1 * Math.sin(t * 9) })
    return
  }
  if (i === 0) {
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: 'happy', seed: 3, look: [-1, -1] })
    if (u > SPL) speech(x, t, 560, 330, C[0] + SPL + 0.3, 'plants: 14', { size: 30, life: 2.4, col: '#d8ffe0' })
  } else if (i === 1) {
    R(x, INK, 380, 420, 300, 24); R(x, '#a07850', 384, 424, 292, 16)
    bowl(x, 530, 410)
    star(x, t, { sign: 'aquarius', x: 310, y: 360, s: 150, mood: u > SPL + 1 ? 'happy' : 'neutral', seed: 3, look: [1, 0] })
    if (u > SPL + 1) speech(x, t, 560, 200, C[1] + SPL + 1, 'growth.', { size: 34, life: 2.6, col: '#d8ffe0' })
  } else if (i === 2) {
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: 'happy', seed: 3, look: [1, -1] })
    if (u > SPL) speech(x, t, 760, 160, C[2] + SPL + 0.2, 'hi, Gerald.', { size: 30, life: 2.2, col: BONE })
    if (u > SPL + 2.2) speech(x, t, 230, 170, C[2] + SPL + 2.2, 'evening, fridge.', { size: 30, life: 2.2, col: BONE })
  } else if (i === 3) {
    telescope(x, 640, 340, clamp(prog(t, C[3] + SPL, C[3] + SPL + 3)))
    star(x, t, { sign: 'aquarius', x: 430, y: 400, s: 160, mood: 'sparkle', seed: 3, look: [1, -1] })
    for (let k = 0; k < 6; k++) R(x, `rgba(255,240,200,${0.4 + 0.4 * Math.sin(t * 3 + k)})`, 700 + k * 30, 90 + (k % 3) * 40, 5, 5)
  } else {
    const op = prog(t, C[4] + SPL + 0.4, C[4] + SPL + 1.2)
    doorFrame(x, op)
    star(x, t, { sign: 'aquarius', x: 480, y: 400, s: 160, mood: op > 0.5 ? 'heart' : 'happy', seed: 3, look: [1, 0], hops: [C[4] + SPL + 1.4] })
    if (op > 0.3) { star(x, t, { sign: 'pisces', x: 850, y: 380, s: 140, mood: 'sparkle', tears: 3, seed: 6, pop: pop01(t, C[4] + SPL + 0.6, 0.4), hops: [C[4] + SPL + 1.6] }); cookies(x, 760, 430) }
    if (op <= 0 && u > SPL) speech(x, t, 850, 120, C[4] + SPL + 0.1, 'KNOCK KNOCK', { size: 30, life: 0.8, col: '#fff3c8' })
    if (t > T.pay) hearts(x, t, 660, 250, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve08', thing: 'Living alone', stamp: '09·01·2016', accent: '#7fe0ff', ending: 'cut', hookTime: '7:30 PM',
  hook: { text: 'Living alone: | night one vs *year ten.*' },
  freeze: [REC],
  promise: 'Wait for | *the knock.*',
  chapters: [
    { time: '7 PM', title: 'MOVING IN' }, { time: '8 PM', title: 'DINNER' }, { time: '10 PM', title: 'THE NOISES' },
    { time: '11 PM', title: 'THE QUIET' }, { time: '12 AM', title: 'THE KNOCK' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same flat, *ten years apart.*' },
    { t: 7.0, who: 'aquarius', text: 'three boxes. one lamp. *home?*' },
    { t: 11.3, who: 'aquarius', text: 'plants: 14. weird rocks: *many.*' },
    { t: 16.4, who: 'aquarius', text: 'dinner: cereal. *from the box.*' },
    { t: 20.8, who: 'aquarius', text: 'dinner: cereal. *in a bowl.* growth.' },
    { t: 25.8, who: 'aquarius', text: 'what was THAT?! *(the fridge)*' },
    { t: 30.2, who: 'aquarius', text: 'that’s just Gerald. *the pipe.*' },
    { t: 35.2, who: 'aquarius', text: 'hi, it’s me. can we talk *an hour?*' },
    { t: 39.6, who: 'aquarius', text: 'the quiet is my *favourite* sound.' },
    { t: 44.6, who: 'pisces', text: 'I’m new next door. *cookies?* (sob)' },
    { t: 48.8, who: 'pisces', text: 'ten years of cookies. I’m *crying*' },
    { t: 51.0, who: 'aquarius', text: 'come in. *kettle’s on.*' },
    { t: 54.0, who: 'stars', text: 'one knock *changed everything.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Living alone. | *Never* lonely.',
  music: { style: 'synthwave', key: 'Am', seed: 5108 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ...[0.5, 1.7, 2.9].map(d => ['tick', C[2] + d, 0.06]), ['tom', C[4] + 0.1, 0.05], ['tom', C[4] + 0.3, 0.05], ['tom', C[4] + SPL + 0.1, 0.05], ['tom', C[4] + SPL + 0.3, 0.05], ['glitter', C[4] + SPL + 1.4, C[4] + SPL + 2.0]],
})
