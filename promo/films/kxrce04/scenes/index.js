// kxrce04 · Remix Cities: Extended · "Mexico City: My Ex Is at Every Stop" (60 s vertical, funk · A). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♏ Scorpio mid-dive behind a taco cart's spinning pork spit, salsa drops in the air, sunglasses at night.
//         Slam "Scorpio's ex is at *EVERY* stop."
//   3.4   THE STARS: "one night in Mexico City. one ex." · promise "Wait for | *the churros.*"
//   8.0   1 TACOS (8:00)          the ex at the next stand; Scorpio hides behind the spit; ♐ Sag orders four more
//  18.0   2 THE MARIACHI PLAZA (9:30)  the ex again; Scorpio hides behind a giant guitar; the band plays louder
//  28.0   3 THE BIG SQUARE (10:45)    the ex again; Scorpio hides in a balloon seller's bunch; it floats off
//  38.0   4 CHURROS (12:00)       no hiding left; "hi. you look happy." "you too."; back to the friends, light
//  58.2   last line "Saw my ex. Said hi. | *Ate churros.*" → cut at 60.
// The ex is a plain star with no sign (the joke is on the situation, never on a sign). ♓ Pisces, Scorpio's friend, cries
// at every near-miss and sobs at the "hi". Real touches: tacos al pastor off the spit (pineapple on top), the plaza of
// mariachis, the huge flag in the big main square, churros dipped in hot chocolate.
import {
  cityFilm, nightSky, skyline, street, lamp, stringLights, signBoard, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { caught, caughtCues, screenShake, shakeCues, achievement, achievementCues } from '../../hookkit.js'

const S = { hook: 0, tacos: 8.0, plaza: 18.0, square: 28.0, churro: 38.0, last: 58.2 }
const T = { spot: [9.6, 19.4, 29.4], float: 32.6, hi: 44.0, you2: 47.4, back: 49.8, cheer: 52.4 }
const EX = { color: '#8ac8c0', glyph: false }

function papel(x, t, y) {
  const cols = ['#ff4f86', '#f2c75c', '#7fd0ff', '#9fe6b0', '#c9a6ff', '#ff9a5a']
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y + 10); x.stroke()
  for (let i = 0; i < 14; i++) { const px = i * 80, sw = 4 * Math.sin(t * 3 + i); x.save(); x.translate(px + 40, y + 6); x.rotate(sw * 0.02); R(x, INK, -32, 0, 64, 70); R(x, cols[i % 6], -28, 2, 56, 64); R(x, 'rgba(255,255,255,0.4)', -14, 18, 10, 10); R(x, 'rgba(255,255,255,0.4)', 4, 34, 10, 10); x.restore() }
}
function trompo(x, t, cx, base) {
  R(x, INK, cx - 6, base - 340, 12, 340)
  const rot = t * 4
  for (let i = 0; i < 9; i++) { const w = 150 - i * 8, y = base - 70 - i * 28; R(x, INK, cx - w / 2 - 4, y - 2, w + 8, 32); R(x, i % 2 ? '#c8502a' : '#e07a3a', cx - w / 2, y, w, 28); R(x, '#f0a050', cx - w / 2 + ((rot * 20 + i * 13) % w), y + 4, 14, 20) }
  drawBits(x, ['..G.G..', '...G...', '.YYYYY.', 'YYYYYYY', 'YYYYYYY', '.YYYYY.'], { G: '#5fbf6a', Y: '#f2c75c' }, cx, base - 345, 9)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx + 120, base - 180, 0, cx + 120, base - 180, 160); g.addColorStop(0, 'rgba(255,140,60,0.4)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - 60, base - 360, 360, 360); x.restore()
}
function tacoStand(x, t, cx = 380) {
  nightSky(x, t, { top: '#140a30', bot: '#3a1a4a', stars: 20 })
  skyline(x, t, { seed: 91, base: 1000, minH: 120, maxH: 360, col: '#241640', edge: '#34205a' })
  papel(x, t, 520)
  R(x, INK, cx - 230, 820, 460, 420); R(x, '#2a7a5a', cx - 224, 826, 448, 90); signBoard(x, cx, 870, 'TACOS AL PASTOR', { size: 36, col: '#fff3c8', bg: '#1a4a3a' })
  R(x, '#e8d8b8', cx - 224, 916, 448, 318)
  trompo(x, t, cx, 1180)
  // the next stand (where the ex is)
  R(x, INK, 760, 900, 300, 340); R(x, '#a03a5a', 766, 906, 288, 70); R(x, '#f0e0c8', 766, 976, 288, 258)
  signBoard(x, 910, 942, 'QUESADILLAS', { size: 26, col: '#fff3c8', bg: '#6a1a3a' })
  street(x, 1240, { walkCol: '#4a3050', roadCol: '#2a1a34' })
}
function plaza(x, t) {
  nightSky(x, t, { top: '#100a30', bot: '#3a2050', stars: 20 })
  for (let i = 0; i < 6; i++) { const ax = i * 190; R(x, INK, ax, 620, 180, 640); R(x, '#d8a070', ax + 6, 626, 168, 628); x.fillStyle = '#1a1030'; x.beginPath(); x.moveTo(ax + 30, 1254); x.lineTo(ax + 30, 760); x.quadraticCurveTo(ax + 90, 680, ax + 150, 760); x.lineTo(ax + 150, 1254); x.fill(); R(x, '#ffd98a', ax + 70, 820, 40, 50) }
  papel(x, t, 560)
  R(x, '#6a4a5a', 0, 1254, W, 666); for (let i = 0; i < 14; i++) R(x, 'rgba(0,0,0,0.15)', i * 80, 1254, 4, 666)
}
function guitarron(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 170, 200, 0, 0, TAU); x.fill(); x.fillStyle = '#c8803a'; x.beginPath(); x.ellipse(0, 40, 160, 190, 0, 0, TAU); x.fill()
  x.fillStyle = '#3a2010'; x.beginPath(); x.arc(0, 0, 40, 0, TAU); x.fill()
  R(x, INK, -16, -400, 32, 380); R(x, '#6a3a1a', -10, -396, 20, 376)
  x.restore()
}
function bigSquare(x, t) {
  nightSky(x, t, { top: '#0a0a30', bot: '#2a2a60', stars: 30, moon: { x: 880, y: 360, r: 46 } })
  // the cathedral silhouette
  R(x, '#2a2050', 120, 700, 840, 360); R(x, '#2a2050', 160, 520, 140, 200); R(x, '#2a2050', 780, 520, 140, 200)
  x.fillStyle = '#2a2050'; x.beginPath(); x.arc(540, 700, 120, Math.PI, TAU); x.fill()
  for (let i = 0; i < 10; i++) R(x, '#ffd98a', 170 + i * 80, 860, 20, 40)
  R(x, '#8a7a9a', 0, 1060, W, 860); for (let j = 0; j < 12; j++) R(x, 'rgba(0,0,0,0.12)', 0, 1060 + j * 70, W, 4)
  // the huge flag on its pole
  R(x, INK, 536, 380, 12, 700)
  const wv = k => 12 * Math.sin(t * 2.4 + k * 0.03)
  for (let k = 0; k < 300; k += 6) { const c = k < 100 ? '#2a8a4a' : k < 200 ? '#f4f0e6' : '#d8343a'; R(x, c, 548 + k, 390 + wv(k), 6, 190) }
  drawBits(x, ['.BB.', 'BBBB', '.BB.'], { B: '#8a5a2a' }, 698, 485 + wv(150), 7)
}
function balloons(x, t, cx, cy, k = 0) {
  const cols = ['#ff4f86', '#f2c75c', '#7fd0ff', '#9fe6b0', '#c9a6ff', '#ff9a5a', '#ff7aa8']
  const lift = k * 900
  for (let i = 0; i < 14; i++) {
    const a = i * 2.4, bx = cx + Math.cos(a) * (40 + (i % 3) * 40), by = cy - 260 - Math.sin(a) * 60 - (i % 4) * 40 - lift + 6 * Math.sin(t * 2 + i)
    x.strokeStyle = INK; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy - lift); x.lineTo(bx, by + 40); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 40, 48, 0, 0, TAU); x.fill(); x.fillStyle = cols[i % 7]; x.beginPath(); x.ellipse(bx, by, 35, 43, 0, 0, TAU); x.fill(); R(x, 'rgba(255,255,255,0.5)', bx - 18, by - 22, 10, 14)
  }
}
function churreria(x, t) {
  R(x, '#5a3a2a', 0, 0, W, 1260); for (let i = 0; i < 12; i++) R(x, 'rgba(0,0,0,0.1)', i * 96, 0, 6, 1260)
  for (let j = 0; j < 6; j++) for (let i = 0; i < 9; i++) R(x, (i + j) % 2 ? '#3a8ab8' : '#f4f0e6', 60 + i * 108, 420 + j * 60, 100, 56)
  signBoard(x, 540, 340, 'CHURROS & CHOCOLATE', { size: 44, col: '#ffe08a', bg: '#3a1a10' })
  R(x, INK, 60, 1100, 960, 60); R(x, '#a06a40', 66, 1106, 948, 48)
  for (let i = 0; i < 8; i++) { x.save(); x.translate(160 + i * 110, 1060); x.rotate(-0.3 + i * 0.08); R(x, INK, -10, -70, 20, 140); R(x, '#d8963a', -6, -66, 12, 132); x.restore() }
  R(x, '#3a2a2a', 0, 1260, W, 660)
}
function churroDraw(x, t) { churreria(x, t) }

// ── cast: Scorpio hides; the ex wanders in
const SCO_SG = 'scorpio'
function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  const ex = (x, y, s, mood, look, e = {}) => o.push({ ...EX, x, y, s, mood, look, seed: 11, ...e })
  if (t < S.tacos) {
    P(SCO_SG, 520, 1150, 210, 'wide', [1, -0.5], { seed: 5, squash: -0.14 })
    P('sagittarius', 180, 1330, 170, 'happy', [1, 0], { seed: 9 })
    P('pisces', 980, 1330, 130, 'wide', [-1, 0], { tears: 2, seed: 6 })
    ex(890, 1200, 150, 'happy', [-1, 0])
  } else if (t < S.plaza) {
    const hid = t > T.spot[0]
    P('sagittarius', 170, 1340, 180, t > 13 ? 'sparkle' : 'happy', [1, 0], { seed: 9, hops: [13.2, 13.6] })
    P(SCO_SG, hid ? 520 : 300, hid ? 1130 : 1340, 190, hid ? 'wide' : 'happy', [1, 0], { seed: 5, hops: [T.spot[0] + 0.1] })
    if (t > T.spot[0] - 0.6) ex(900, 1200, 150, 'happy', [-1, 0])
    P('pisces', 640, 1360, 140, hid ? 'wide' : 'happy', [1, 0], { tears: hid ? 3 : 1, seed: 6 })
  } else if (t < S.square) {
    const hid = t > T.spot[1]
    // mariachi stars (no signs) with big hats
    for (const [mx, c] of [[820, '#e8d8c0'], [960, '#d8c8f0']]) o.push({ color: c, glyph: false, x: mx, y: 1320, s: 150, mood: 'happy', seed: mx % 7, hops: [20.5, 21.5, 22.5, 23.5].map(h => h + (mx % 3) * 0.1) })
    P(SCO_SG, hid ? 330 : 560, hid ? 1220 : 1340, 180, hid ? 'wide' : 'happy', [1, 0], { seed: 5 })
    P('sagittarius', 140, 1360, 160, 'happy', [1, 0], { seed: 9 })
    P('pisces', 700, 1420, 130, 'sparkle', [-1, 0], { tears: hid ? 3 : 2, seed: 6 })
    if (t > T.spot[1] - 0.6) ex(620, 1080, 130, 'happy', [0, 0])
  } else if (t < S.churro) {
    const hid = t > T.spot[2], fl = ease.inCubic(prog(t, T.float, T.float + 3))
    P(SCO_SG, 330, hid ? 1340 - fl * 900 : 1360, 180, t > T.float ? 'wide' : hid ? 'squint' : 'happy', [1, 0], { seed: 5 })
    P('sagittarius', 160, 1380, 160, t > T.float ? 'wide' : 'happy', [1, -1], { seed: 9 })
    P('pisces', 880, 1390, 140, t > T.float ? 'wide' : 'sparkle', [-1, -1], { tears: 3, seed: 6 })
    if (t > T.spot[2] - 0.6) ex(700, 1300, 150, t > T.float + 0.5 ? 'wide' : 'happy', [-1, -1])
  } else {
    const [sx] = walk(t, [[T.hi - 1.4, 300, 0], [T.hi - 0.2, 560, 0], [T.back, 560, 0], [T.back + 1.2, 300, 0]])
    P(SCO_SG, sx, 1320, 200, t < T.hi ? 'squint' : t < T.back ? 'neutral' : 'happy', [t < T.back ? 1 : -1, 0], { seed: 5, hops: [T.cheer, T.cheer + 0.5] })
    P('sagittarius', 140, 1350, 170, t > T.cheer ? 'sparkle' : 'neutral', [1, 0], { seed: 9, hops: [T.cheer] })
    P('pisces', 1000, 1350, 140, t > T.hi ? 'sparkle' : 'wide', [-1, 0], { tears: 3, seed: 6, hops: [T.cheer + 0.1] })
    ex(780, 1320, 170, t > T.you2 - 0.4 ? 'happy' : 'neutral', [-1, 0], { alpha: 1 - prog(t, T.back + 0.5, T.back + 1.5) })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  let mood = 'happy'; if (T.spot.some(s => inR(t, s, s + 1.5))) mood = 'wide'; if (t > T.cheer) mood = 'sparkle'
  return { x: 930, y: (t < S.tacos ? 600 : 470) + 10 * Math.sin(t * 1.3), s: t < S.tacos ? 170 : 110, mood, look: [-1, 0.5], pop: k }
}
function shades(x, t) { void x; void t }
function front(x, t) {
  if (t < S.plaza) {
    // the spit is in front of a hiding Scorpio; salsa drops on frame 0
    if (t < S.tacos || t > T.spot[0]) trompo(x, t, 380, 1180)
    if (t < S.tacos) for (let i = 0; i < 7; i++) { const a = i * 0.9, r = 120 + i * 20; R(x, '#d8343a', 560 + Math.cos(a) * r + 20 * Math.sin(t * 2 + i), 960 + Math.sin(a) * r * 0.6 - 30 * t, 14, 14) }
  }
  if (inR(t, S.plaza, S.square)) {
    guitarron(x, 340, 1150 + (t > T.spot[1] ? 0 : 400), 0.9)
    for (const mx of [820, 960]) { R(x, INK, mx - 110, 1180, 220, 24); R(x, '#2a2a2a', mx - 104, 1184, 208, 16); R(x, INK, mx - 50, 1140, 100, 50); R(x, '#2a2a2a', mx - 44, 1146, 88, 40) }
    for (let k = 0; k < 6; k++) { const tt = (t * 0.7 + k / 6) % 1; drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: GOLD }, 900 + 60 * Math.sin(k * 2), 1100 - tt * 300, 7, { alpha: 1 - tt }) }
  }
  if (inR(t, S.square, S.churro) && t > T.spot[2]) balloons(x, t, 330, 1360, ease.inCubic(prog(t, T.float, T.float + 3)))
  if (inR(t, S.square, S.churro) && t < T.spot[2]) { R(x, INK, 300, 1300, 60, 100); balloons(x, t, 330, 1300, 0) }
  if (t > S.churro) {
    // cups of hot chocolate + churros on the counter
    for (const cx of [200, 330, 960]) { R(x, INK, cx - 30, 1380, 60, 60); R(x, '#f4f0e6', cx - 26, 1384, 52, 52); R(x, '#5a2a1a', cx - 22, 1388, 44, 12) }
    if (t > T.cheer) { sparkles(x, t, 540, 1100, T.cheer, 12, 260, 1, [GOLD, PINK, BONE]); hearts(x, t, 560, 1180, T.cheer, { n: 6, cell: 7 }) }
  }
  // Scorpio's sunglasses
  void shades
}
function over(x, t) {
  T.spot.forEach((s, i) => speech(x, t, [880, 620, 700][i], [1020, 920, 1120][i], s - 0.5, 'oh hey!', { size: 34, life: 1.6, col: BONE }))
  speech(x, t, 520, 1100, T.hi, 'hi. you look happy.', { size: 38, life: 2.4, col: '#fff3c8', tail: -1 })
  speech(x, t, 780, 1120, T.you2, 'you too.', { size: 38, life: 2.0, col: BONE, tail: 1 })
}
function drawHook(x, t) { tacoStand(x, t) }

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce04', city: 'Mexico City', duration: 60, ending: 'cut', castScale: 1.1,
  hook: { text: 'Scorpio’s ex is at | *EVERY* stop.', out: [3.0, 3.25] },
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '7:55', draw: drawHook },
    { at: S.tacos, n: 1, name: 'TACOS · 8:00', time: '8:00', draw: drawHook },
    { at: S.plaza, n: 2, name: 'MARIACHIS · 9:30', time: '9:30', draw: plaza },
    { at: S.square, n: 3, name: 'BIG SQUARE · 10:45', time: '10:45', draw: bigSquare },
    { at: S.churro, n: 4, name: 'CHURROS · 12:00', time: '12:00', draw: churroDraw },
  ],
  cast, stars, front, over,
  tissues: [S.tacos + 2, T.spot[0] + 0.4, T.spot[1] + 0.4, T.spot[2] + 0.4, T.float + 0.5, T.hi + 0.4, T.you2 + 0.4, T.cheer + 0.3],
  heads: [
    { text: 'Wait for | *the churros.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 430 },
    { text: 'Saw my ex. Said hi. | *Ate churros.*', at: S.last, lateAt: S.last + 0.42, top: 380, size: 86, accentSize: 128, accentColor: '#ffb07a' },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'one night in Mexico City. *one ex.*' }] },
    { open: 8.4, close: 17.7, lines: [
      { t: 8.6, who: 'sagittarius', text: 'tacos off the *spit!* pineapple on top!' },
      { t: 11.2, who: 'scorpio', text: 'nobody look. *they’re here.*' },
      { t: 13.8, who: 'sagittarius', text: 'great. *four more,* please.' },
    ] },
    { open: 18.4, close: 27.7, lines: [
      { t: 18.6, who: 'stars', text: 'the mariachi plaza! *live music!*' },
      { t: 20.8, who: 'scorpio', text: 'I live behind this *guitar* now.' },
      { t: 23.6, who: 'pisces', text: 'they’re playing *louder* I’m crying' },
    ] },
    { open: 28.4, close: 37.7, lines: [
      { t: 28.6, who: 'stars', text: 'the big square. the *huge* flag.' },
      { t: 30.8, who: 'scorpio', text: 'balloons. *perfect* cover.' },
      { t: 33.4, who: 'sagittarius', text: 'Scorpio. you’re *floating.*' },
    ] },
    { open: 38.4, close: 57.9, lines: [
      { t: 38.6, who: 'scorpio', text: 'no guitar. no balloons. *no spit.*' },
      { t: 41.2, who: 'stars', text: 'or… just say *hi,* babe.' },
      { t: 50.4, who: 'scorpio', text: 'that was it? that was… *fine.*' },
      { t: 53.2, who: 'pisces', text: 'I’m SO proud I’m *sobbing*' },
      { t: 55.6, who: 'sagittarius', text: 'more *churros!*' },
    ] },
  ],
  fx: [
    ...T.spot.map(s => [caught, { at: s, x: [900, 620, 700][T.spot.indexOf(s)], y: [1160, 1050, 1260][T.spot.indexOf(s)], r: 120, out: [s + 1.3, s + 1.45], arrow: 'tl', label: 'THE EX', rec: false }, caughtCues]),
    [achievement, { at: T.back + 0.4, text: 'said hi to the *ex.*', title: 'ACHIEVEMENT UNLOCKED', y: 1400, out: [T.back + 2.6, T.back + 2.9] }, achievementCues],
    [screenShake, { at: T.spot[0], len: 0.35, amp: 14 }, shakeCues],
  ],
  music: { style: 'funk', key: 'A', seed: 4004, drop: S.tacos, breakdown: [S.churro], lift: [T.back], hits: [T.hi, S.last + 0.42] },
  cues: [['whoosh', 0.02, 0.6, 0.05], ...T.spot.map(s => ['tick', s - 0.5, 0.05]), ['whoosh', T.float, 1.2, 0.04], ['pop', T.hi, 880, 0.035, 0], ['pop', T.you2, 1046.5, 0.035, 0], ['glitter', T.cheer, T.cheer + 0.6]],
})
