// yr2020plans: THEN vs NOW, "Travel plans in 2020 → 2026" (20 s vertical, STARTALK-THENNOW.md Block F #29,
// music: dreamy · Gb). The format's look lives in ./thennow.js (identical in all five Block F films).
//   0–7.0     THEN (2020, old phone video): on the couch, a ♐ Sagittarius pins a wall map: "someday we'll go
//             everywhere." One pin, two pins… then a flurry of pins and string. The ♉ Taurus, half asleep with a snack:
//             "…everywhere." One last pin and the whole map slides down onto them. ♓ Pisces sniffles behind the couch.
//             THE STARS: "a wall of pins. *zero* suitcases."   Sub: "someday. *everywhere.*"
//   7.0       card cut; the year sticker flips to 2026.
//   7.0–12.5  NOW: they actually went. Three snapshots (mountains · a beach · city lights; Pisces crying in each).
//             Then home: suitcases dropped, both flop onto the couch, "ahh." The map is covered in photos now.
//             A tag points at the couch: "FAVORITE PLACE". Taurus: "best trip yet."
//             THE STARS: "they actually *went.*"   Sub: "went. *came home.*"
//   12.5–15.6 payoff: THE STARS "every place. *one* favorite."  Last line: "*Everywhere*. Then home."
import {
  makeThenNow, drawStarChar, signStar, starFrame, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3, tag,
  hash, INK, BONE, GOLD, PINK, HEART, clamp, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const SAG = signStar('sagittarius'), TAU = signStar('taurus')
const PINS = Array.from({ length: 22 }, (_, i) => ({ x: 240 + hash(i * 3 + 1) * 400, y: 90 + hash(i * 7 + 2) * 210 }))

function room(x, now) {
  R(x, now ? '#7a5c8e' : '#6d5384', 0, 0, 880, 880)
  for (let i = 0; i < 10; i++) R(x, now ? '#83649a' : '#765b8e', i * 96 + 20, 0, 10, 620)
  R(x, '#4a3560', 0, 700, 880, 180); R(x, INK, 0, 694, 880, 8)
  R(x, '#c9a0d8', 120, 760, 640, 60)                                                    // rug
  // a floor lamp (right)
  R(x, INK, 790, 260, 70, 70); R(x, '#ffd98a', 796, 266, 58, 58); R(x, INK, 822, 330, 8, 370)
}
function worldMap(x, t, dy = 0, rot = 0) {
  x.save(); x.translate(440, 195 + dy); x.rotate(rot)
  R(x, INK, -250, -145, 500, 290); R(x, '#cfe8f5', -242, -137, 484, 274)
  const L = '#9fd18a'
  for (const [a, b, w, h] of [[-210, -100, 120, 70], [-190, -30, 70, 110], [-60, -110, 90, 60], [-50, -40, 70, 100], [50, -110, 170, 80], [120, -20, 60, 60], [150, 60, 70, 50]]) R(x, L, a, b, w, h)
  x.restore()
}
function couch(x) {
  R(x, INK, 140, 470, 600, 200); R(x, '#d9785a', 148, 478, 584, 120)                      // back
  R(x, INK, 110, 560, 660, 130); R(x, '#e88a6a', 118, 568, 644, 80); R(x, '#c4664c', 118, 640, 644, 42)
  R(x, INK, 100, 520, 80, 170); R(x, '#d9785a', 108, 528, 64, 154); R(x, INK, 700, 520, 80, 170); R(x, '#d9785a', 708, 528, 64, 154)
  R(x, INK, 130, 688, 24, 26); R(x, INK, 726, 688, 24, 26)
}
const CUSHION_FRONT = x => { R(x, INK, 110, 600, 660, 90); R(x, '#e88a6a', 118, 608, 644, 40); R(x, '#c4664c', 118, 648, 644, 34); R(x, INK, 100, 560, 80, 130); R(x, '#d9785a', 108, 568, 64, 114); R(x, INK, 700, 560, 80, 130); R(x, '#d9785a', 708, 568, 64, 114) }

// ── A: 2020, the pins
const A = { someday: 0.8, pin1: 2.3, pin2: 2.75, flurry: [3.15, 4.1], every: 4.55, last: 5.25, fall: [5.45, 5.85] }
const pinT = i => i === 0 ? A.pin1 : i === 1 ? A.pin2 : r3(A.flurry[0] + (i - 2) * (A.flurry[1] - A.flurry[0]) / 19)
function sceneA(x, t) {
  room(x, false)
  // ♓ Pisces behind the couch, sniffling at the dream
  pisces(x, t, 760, 430, 150, t > A.fall[1] ? 3 : t > A.flurry[0] ? 2 : 1, { mood: t > A.fall[1] ? 'happy' : 'sparkle', look: [-1, 0], hops: [A.fall[1] + 0.1] })
  // the map (slides down at the end), pins + string
  const fall = ease.inCubic(prog(t, ...A.fall))
  const dy = 330 * fall, rot = -0.12 * fall
  worldMap(x, t, dy, rot)
  x.save(); x.translate(0, dy)
  const on = PINS.map((p, i) => ({ ...p, k: pop01(t, pinT(i), 0.18, 2.6) })).filter(p => p.k > 0.01)
  x.strokeStyle = '#e8457a'; x.lineWidth = 3; x.beginPath(); on.forEach((p, i) => i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)); x.stroke()
  for (const p of on) { R(x, INK, p.x - 9 * p.k, p.y - 9 * p.k, 18 * p.k, 18 * p.k); R(x, '#ff4f5e', p.x - 6 * p.k, p.y - 6 * p.k, 12 * p.k, 12 * p.k) }
  x.restore()
  couch(x)
  // the two on the couch
  const sm = t > A.fall[1] ? 'happy' : t > A.flurry[0] ? 'sparkle' : 'happy'
  const sagHops = [A.someday, A.pin1, A.pin2, A.flurry[0], A.flurry[0] + 0.35, A.flurry[0] + 0.7, A.last, A.fall[1] + 0.05]
  const reach = ease.inOutCubic(prog(t, A.pin1 - 0.35, A.pin1 - 0.05)) - ease.inOutCubic(prog(t, A.flurry[1] + 0.05, A.flurry[1] + 0.35))
  drawStarChar(x, 330, 480 - 70 * reach, 240, t, { color: SAG.color, glyph: SAG.glyph, mood: sm, look: [0.6, -1], hops: sagHops, seed: 2, squash: t > A.fall[1] && t < A.fall[1] + 0.3 ? 0.15 : 0 })
  const tm = t > A.fall[1] ? 'wide' : t > A.every - 0.6 ? 'sleepy' : 'happy'
  drawStarChar(x, 570, 490, 230, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: [-1, 0], hops: [A.every, A.fall[1] + 0.08], seed: 4, zzz: false })
  // a snack bowl on Taurus' side
  R(x, INK, 640, 560, 90, 40); R(x, '#f4e8cc', 646, 566, 78, 28); for (let i = 0; i < 4; i++) R(x, '#ffcf6b', 654 + i * 18, 552, 12, 12)
  CUSHION_FRONT(x)
  // lines
  speech(x, t, 360, 160 + 230, A.someday, 'someday we’ll go everywhere.', { size: 34, tail: 0, life: 1.4 })
  speech(x, t, 600, 330, A.every, '…everywhere.', { size: 36, tail: 0, life: 1.0 })
  if (t > A.fall[1] && t < A.fall[1] + 0.9) {
    const k = pop01(t, A.fall[1], 0.2, 3) * outK(t, [A.fall[1] + 0.7, A.fall[1] + 0.9])
    x.save(); x.translate(440, 290); x.rotate(-0.08); x.scale(k, k); x.font = `800 64px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('FWUMP', 0, 0); x.fillStyle = GOLD; x.fillText('FWUMP', 0, 0); x.restore()
  }
}

// ── B: 2026, they went
const B = { snaps: [7.0, 7.95, 8.85, 9.75], enter: [9.8, 10.2], flop: 10.35, ahh: 10.45, fav: 10.95, best: 11.45 }
function snapMountains(x, t) {
  R(x, '#9fd8f6', 0, 0, 880, 880); R(x, '#fff3c8', 640, 90, 90, 90)
  for (const [cx, w, h, c] of [[200, 520, 460, '#6c7fb0'], [600, 600, 520, '#5a6ea0'], [420, 420, 360, '#7b8fc0']]) for (let j = 0; j < h; j += 20) { const ww = w * (j / h); R(x, c, cx - ww / 2, 700 - h + j, ww, 20); if (j < h * 0.22) R(x, '#ffffff', cx - ww / 2, 700 - h + j, ww, 20) }
  R(x, '#7bbf6a', 0, 700, 880, 180)
}
function snapBeach(x, t) {
  R(x, '#ffc98a', 0, 0, 880, 400); R(x, '#ffe6a0', 340, 160, 200, 200); R(x, '#4fb3d9', 0, 400, 880, 200)
  for (let i = 0; i < 8; i++) R(x, '#bfeaff', ((i * 130 + t * 60) % 900) - 20, 430 + (i % 3) * 50, 60, 8)
  R(x, '#f4d7a0', 0, 600, 880, 280)
  R(x, INK, 716, 380, 10, 320); for (let i = 0; i < 6; i++) R(x, i % 2 ? '#fff' : '#ff6f9c', 600 + i * 40, 360 - 10 * Math.abs(i - 2.5), 40, 30)
}
function snapCity(x, t) {
  R(x, '#141a40', 0, 0, 880, 880)
  for (let i = 0; i < 18; i++) R(x, '#fff3c8', hash(i + 3) * 860, hash(i + 31) * 200, 4, 4)
  for (let b = 0; b < 9; b++) { const bx = b * 100 - 10, bh = 250 + hash(b + 9) * 300, by = 700 - bh; R(x, INK, bx, by, 96, bh); R(x, '#2a2f5a', bx + 4, by + 4, 88, bh); for (let j = 0; j < bh / 40 - 1; j++) for (let i = 0; i < 3; i++) if (hash(b * 31 + j * 7 + i) > 0.45) R(x, '#ffd98a', bx + 14 + i * 26, by + 16 + j * 40, 14, 18) }
  R(x, '#20203a', 0, 700, 880, 180)
}
function sceneB(x, t) {
  const S = B.snaps
  const pair = (y, s, mood, tears) => {
    drawStarChar(x, 330, y, s, t, { color: SAG.color, glyph: SAG.glyph, mood, look: [1, 0], hops: [S[0] + 0.15, S[1] + 0.15, S[2] + 0.15], seed: 2 })
    drawStarChar(x, 560, y, s, t, { color: TAU.color, glyph: TAU.glyph, mood: 'happy', look: [-1, 0], hops: [S[0] + 0.25, S[1] + 0.25, S[2] + 0.25], seed: 4 })
    pisces(x, t, 770, y - 40, 120, tears, { mood: 'sparkle', look: [-1, 0] })
  }
  if (t < S[3]) {
    const i = t < S[1] ? 0 : t < S[2] ? 1 : 2
    ;[snapMountains, snapBeach, snapCity][i](x, t)
    pair(640, 220, ['sparkle', 'happy', 'heart'][i], 2)
    tag(x, t, 220, 90, S[i] + 0.12, ['WENT.', 'WENT.', 'WENT!!'][i], { size: 40, life: S[i + 1] - S[i] - 0.1, col: GOLD, rot: -0.06 })
    const f = Math.exp(-(t - S[i]) * 10)
    if (i > 0 && f > 0.01) { x.fillStyle = `rgba(255,255,255,${0.85 * f})`; x.fillRect(0, 0, 880, 880) }
    return
  }
  // home: the couch, the map now covered with photos
  room(x, true)
  worldMap(x, t)
  for (let i = 0; i < 9; i++) { const px = 230 + (i % 5) * 96 + hash(i) * 20, py = 90 + Math.floor(i / 5) * 120 + hash(i + 4) * 30; x.save(); x.translate(px, py); x.rotate((hash(i + 7) - 0.5) * 0.4); R(x, INK, -38, -32, 76, 70); R(x, '#fffaf0', -34, -28, 68, 62); R(x, ['#9fd8f6', '#ffc98a', '#2a2f5a'][i % 3], -28, -22, 56, 40); x.restore() }
  couch(x)
  const en = ease.outCubic(prog(t, ...B.enter))
  const flop = t > B.flop && t < B.flop + 0.35 ? 0.22 * Math.sin(Math.PI * (t - B.flop) / 0.35) : 0
  const yS = t < B.flop ? lerp(380, 400, en) : 480, mood = t > B.flop ? 'squint' : 'happy'
  // suitcases dropped by the couch
  for (const [sx, c] of [[60, '#4fb3d9'], [800, '#ff6f9c']]) { const k = pop01(t, B.enter[1], 0.3, 2); R(x, INK, sx - 40 * k, 610 - 30 * k, 80 * k, 90 * k); R(x, c, sx - 34 * k, 616 - 30 * k, 68 * k, 78 * k); R(x, INK, sx - 14 * k, 590 - 30 * k, 28 * k, 10 * k) }
  drawStarChar(x, lerp(-150, 330, en), yS, 240, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.fav ? 'heart' : mood, look: [1, 0], hops: [B.fav], seed: 2, squash: flop })
  drawStarChar(x, lerp(1030, 560, en), yS + 10, 230, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.best ? 'sparkle' : mood, look: [-1, 0], hops: [B.best], seed: 4, squash: flop, blush: t > B.best ? 1 : undefined })
  pisces(x, t, 740, 470, 130, 3, { mood: 'happy', look: [-1, 0], pop: pop01(t, B.flop + 0.1, 0.3, 2), hops: [B.fav + 0.1] })
  CUSHION_FRONT(x)
  speech(x, t, 440, 330, B.ahh, 'ahh.', { size: 46, tail: 0, life: 0.85 })
  // the tag: FAVORITE PLACE → the couch
  const fk = pop01(t, B.fav, 0.3, 2.4)
  if (fk > 0.01) {
    tag(x, t, 440, 770, B.fav, 'FAVORITE PLACE', { size: 40, col: '#ff8fb1', rot: 0.03 })
    drawBits(x, ['..A..', '.AAA.', 'AAAAA', '..A..', '..A..'], { A: '#ff8fb1' }, 440, 708 - 8 * Math.sin(t * 8), 14 * fk)
  }
  speech(x, t, 600, 290, B.best, 'best trip yet.', { size: 38, tail: 1, life: 1.0 })
  if (t > B.flop) hearts(x, t, 440, 420, B.fav + 0.1, { n: 5, life: 1.5, cell: 6, spread: 260 })
}

const EP = makeThenNow({
  id: 'yr2020plans', accent: GOLD, thing: 'Travel plans', year: '2020',
  A: { draw: sceneA, date: '06·21·2020', sub: 'someday. *everywhere.*' },
  B: { draw: sceneB, sub: 'went. *came home.*' },
  lines: [{ t: 3.0, text: 'a wall of pins. *zero* suitcases.' }, { t: 7.5, text: 'they actually *went.*' }, { t: 12.5, text: 'every place. *one* favorite.' }],
  last: '*Everywhere*. Then home.', late: 2,
  cues: () => [
    ['pop', A.someday, 880, 0.035, -0.2],
    ...[0, 1].map(i => ['pop', pinT(i), 1174.66 + i * 150, 0.04, 0]),
    ...Array.from({ length: 20 }, (_, i) => ['pop', pinT(i + 2), [1046.5, 1174.66, 1318.51, 1396.91, 1567.98][i % 5], 0.02, (i % 2 ? 0.3 : -0.3)]),
    ['pop', A.every, 587.33, 0.03, 0.3], ['pop', A.last, 1567.98, 0.035, 0],
    ['whoosh', A.fall[0], 0.4, 0.04], ['tom', A.fall[1], 110, { gain: 0.24, decay: 0.25 }], ['boom', A.fall[1], 0.12],
    ...B.snaps.slice(1, 3).flatMap(s => [['tick', r3(s - 0.03), 0.06], ['pop', s, 1864.66, 0.03, 0], ['whoosh', r3(s - 0.02), 0.2, 0.025]]),
    ['tick', B.snaps[3] - 0.03, 0.06], ['whoosh', B.enter[0], 0.4, 0.03],
    ['tom', B.flop, 100, { gain: 0.2, decay: 0.2 }], ['pop', B.ahh, 659.25, 0.03, 0],
    ['pop', B.fav, 1174.66, 0.04, 0], ['bell', B.fav + 0.05, 2217.46, 0.025, 1.0, 0], ['glitter', B.fav, B.fav + 0.4], ['pop', B.best, 987.77, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
