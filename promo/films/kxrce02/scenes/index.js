// kxrce02 · Remix Cities: Extended · "Portland: The Friend Who Always Cancels" (60 s vertical, lofi · Ab). LOOP.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♋ Cancer mid-dive under a duvet, phone flying mid-text "rain check?", rain on the window. Slam title.
//         Record scratch + freeze at 0.9 ("yep. that's me."), a caught circle on the phone.
//   3.4   THE STARS: "not tonight. your friends are outside." · promise "Stay for | *2 a.m.*"
//   8.0   1 THE DOOR (8:00)        ♎ Libra + ♒ Aquarius under an umbrella for three
//  15.4   2 FOOD CARTS (8:40)      a block of carts in the rain; Aquarius orders lavender noodles; Cancer wants some
//  22.8   3 THE BRIDGES (9:50)     Libra rates every bridge 10/10
//  30.4   4 THE DOUGHNUT WINDOW (11:15)  a heart doughnut; ♓ Pisces in the queue, sobbing
//  37.8   5 THE WALK HOME (1:30)   the umbrella flips inside out; nobody cares; puddle jumps
//  46.0   6 HOME (2:00)            the group chat: "same night next week??" — YES ×3
//  56.0   last line "No rain checks. | *Just rain.*"; 58.8 Cancer dives back under the duvet, phone flying; the last
//         0.45 s ease into frame 0 (loopBack).
// Real touches: the rain, the food-cart blocks, the many bridges over the river, late-night doughnut windows.
import {
  cityFilm, nightSky, skyline, street, lamp, rain, table, interior, stringLights, signBoard, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { caught, caughtCues, notification, notificationCues, screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, door: 8.0, carts: 15.4, bridges: 22.8, dough: 30.4, walk: 37.8, home: 46.0, last: 56.0, dive: 58.6 }
const T = { bell: 8.3, noodle: 17.0, rate: [23.4, 25.5, 27.2], flip: 39.2, jumps: [41.0, 42.0, 43.0, 44.0], text: 47.0, yes: [48.6, 49.2, 49.8] }
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1440 }

// ── pieces
function bedroom(x, t) {
  R(x, '#3a3058', 0, 0, W, 1300); for (let i = 0; i < 12; i++) R(x, 'rgba(0,0,0,0.07)', i * 96, 0, 6, 1300)
  R(x, INK, 560, 330, 400, 480); R(x, '#16143a', 572, 342, 376, 456)
  skyline(x, t, { seed: 41, base: 798, minH: 80, maxH: 300, col: '#221c50', edge: '#2e2668', x0: 572, x1: 948, wMin: 50, wMax: 90 })
  rain(x, t, { n: 50, alpha: 0.7, y0: 342, y1: 798, seed: 3, slant: 0.15 })
  R(x, INK, 752, 342, 8, 456); R(x, '#8a7aa8', 546, 800, 428, 18)
  R(x, '#2a2240', 0, 1300, W, 620)
  // the bed + duvet
  R(x, INK, 60, 1080, 960, 330); R(x, '#f4f0ff', 70, 1090, 300, 110)
  R(x, '#e8a0b8', 70, 1180, 940, 220); for (let i = 0; i < 8; i++) R(x, '#f0b8cc', 90 + i * 118, 1190, 50, 200)
  R(x, INK, 40, 980, 40, 460); R(x, INK, 1000, 1050, 40, 390)
}
function duvetFront(x, t) {
  // the duvet edge over the cast (so Cancer is "under" it)
  x.fillStyle = INK; x.beginPath(); x.moveTo(60, 1240); x.quadraticCurveTo(400, 1150, 620, 1210); x.quadraticCurveTo(820, 1260, 1010, 1220); x.lineTo(1010, 1410); x.lineTo(60, 1410); x.fill()
  x.fillStyle = '#e8a0b8'; x.beginPath(); x.moveTo(70, 1250); x.quadraticCurveTo(400, 1162, 620, 1222); x.quadraticCurveTo(820, 1270, 1000, 1232); x.lineTo(1000, 1400); x.lineTo(70, 1400); x.fill()
  for (let i = 0; i < 7; i++) R(x, '#f0b8cc', 120 + i * 130, 1260, 50, 140)
}
function flyingPhone(x, t, t0) {
  const u = ((t - t0) % 3 + 3) % 3                     // frame 0: mid-air
  const px = 760 + 70 * Math.sin(t * 0.7), py = 900 + 18 * Math.sin(t * 2.3)
  void u
  x.save(); x.translate(px, py); x.rotate(0.35 + 0.08 * Math.sin(t * 3))
  R(x, INK, -64, -120, 128, 240); R(x, '#3a3550', -56, -112, 112, 224); R(x, '#eef2ff', -48, -100, 96, 190)
  R(x, '#7fb0ff', -40, -10, 82, 40); x.font = `800 17px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('rain check?', 1, 15)
  R(x, INK, -38, 40, 2, 22)
  x.restore()
  x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.lineWidth = 5
  for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(px - 110 - i * 20, py + 90 + i * 30); x.lineTo(px - 170 - i * 20, py + 130 + i * 30); x.stroke() }
  x.restore()
}
function frontDoor(x, t) {
  nightSky(x, t, { top: '#10123a', bot: '#2a2a5a', stars: 0 })
  R(x, '#4a5a7a', 0, 300, W, 1000); for (let j = 0; j < 20; j++) R(x, 'rgba(0,0,0,0.12)', 0, 300 + j * 50, W, 4)
  R(x, INK, 340, 560, 400, 760); R(x, '#8a3a3a', 352, 572, 376, 748); R(x, '#ffe08a', 680, 940, 24, 24)
  R(x, INK, 300, 520, 480, 50); R(x, '#5a3a4a', 306, 526, 468, 38)
  lamp(x, 880, 1300, 300)
  R(x, '#3a3466', 0, 1300, W, 620); R(x, '#5a5090', 0, 1300, W, 12)
  rain(x, t, { n: 140, alpha: 0.5 })
}
function umbrella(x, cx, cy, w, { col = '#ff7aa8', inside = 0, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -4, 0, 8, 220)
  x.fillStyle = INK; x.beginPath()
  if (inside < 0.5) { x.moveTo(-w / 2 - 6, 6); x.quadraticCurveTo(0, -w * 0.55, w / 2 + 6, 6); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2, 0); x.quadraticCurveTo(0, -w * 0.5, w / 2, 0); x.fill(); for (let i = 1; i < 4; i++) R(x, mixHex(col, '#000000', 0.25), -w / 2 + i * w / 4 - 2, -w * 0.18, 4, w * 0.18) }
  else { x.moveTo(-w / 2 - 6, -w * 0.5); x.quadraticCurveTo(0, 30, w / 2 + 6, -w * 0.5); x.lineTo(w / 2 - 10, -w * 0.5); x.quadraticCurveTo(0, 14, -w / 2 + 10, -w * 0.5); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2, -w * 0.48); x.quadraticCurveTo(0, 22, w / 2, -w * 0.48); x.lineTo(w / 2 - 14, -w * 0.48); x.quadraticCurveTo(0, 8, -w / 2 + 14, -w * 0.48); x.fill() }
  x.restore()
}
const CARTS = [['TACOS', '#f0603a'], ['PIEROGI', '#7fd0ff'], ['LAVENDER NOODLES', '#c9a6ff'], ['WAFFLES', '#f2c75c'], ['CURRY', '#9fe6b0']]
function foodCarts(x, t) {
  nightSky(x, t, { top: '#0e1036', bot: '#2a2456', stars: 0 })
  skyline(x, t, { seed: 52, base: 760, minH: 160, maxH: 420, col: '#1e1a48', edge: '#2c2662' })
  stringLights(x, t, 0, W, 300, 50)
  CARTS.forEach(([name, col], i) => {
    const cx = 120 + i * 210, cy = 980
    R(x, INK, cx - 100, cy - 210, 200, 330); R(x, col, cx - 94, cy - 204, 188, 318)
    R(x, INK, cx - 80, cy - 120, 160, 110); R(x, '#ffe7a0', cx - 74, cy - 114, 148, 98)
    R(x, mixHex(col, '#ffffff', 0.5), cx - 110, cy - 140, 220, 20)
    R(x, INK, cx - 70, cy + 110, 30, 30); R(x, INK, cx + 40, cy + 110, 30, 30)
    x.save(); x.font = `800 ${name.length > 9 ? 17 : 26}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(name, cx, cy - 160); x.restore()
  })
  street(x, 1120, { wet: true, t })
  rain(x, t, { n: 110, alpha: 0.45, seed: 11 })
}
function bridges(x, t) {
  nightSky(x, t, { top: '#0a0c30', bot: '#24285a', stars: 20, moon: { x: 160, y: 380, r: 40 } })
  skyline(x, t, { seed: 61, base: 900, minH: 140, maxH: 420, col: '#1c1a48', edge: '#2a2664' })
  R(x, '#121a48', 0, 900, W, 400)
  for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(255,224,150,${0.2 + 0.2 * Math.sin(t * 3 + i)})`; x.fillRect((i * 71) % W, 920 + (i % 6) * 40, 30, 4) }
  // three different bridges receding: a steel truss, a lift bridge with towers, a green arch
  const truss = (x0, y, w, col) => { R(x, INK, x0, y - 6, w, 16); R(x, col, x0, y - 2, w, 8); x.strokeStyle = col; x.lineWidth = 4; x.beginPath(); for (let k = 0; k <= w; k += 40) { x.moveTo(x0 + k, y); x.lineTo(x0 + k + 20, y - 40); x.lineTo(x0 + k + 40, y) } x.stroke(); R(x, col, x0, y - 42, w, 4) }
  truss(-20, 820, 1120, '#7a8ac8')
  R(x, INK, 120, 720, 50, 190); R(x, '#6a7ab0', 126, 726, 38, 184); R(x, INK, 900, 720, 50, 190); R(x, '#6a7ab0', 906, 726, 38, 184); R(x, INK, 120, 880, 830, 18); R(x, '#8a9ad0', 126, 884, 818, 10)
  x.strokeStyle = '#5fbf8a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-20, 1010); x.quadraticCurveTo(540, 830, 1100, 1010); x.stroke(); R(x, INK, -20, 1004, 1120, 14); R(x, '#5fbf8a', -20, 1008, 1120, 6)
  for (let k = 0; k < 14; k++) { const px = k * 80, py = 1010 - 180 * 4 * (px / 1080) * (1 - px / 1080) * 0.55; R(x, '#5fbf8a', px, py, 4, 1010 - py) }
  R(x, '#3a3466', 0, 1300, W, 620); R(x, INK, 0, 1290, W, 12); for (let i = 0; i < 14; i++) R(x, INK, i * 80, 1210, 8, 90); R(x, INK, 0, 1210, W, 10)
  rain(x, t, { n: 60, alpha: 0.3, seed: 5 })
}
function doughWindow(x, t) {
  R(x, '#3a2a4a', 0, 0, W, 1300); for (let j = 0; j < 30; j++) R(x, 'rgba(0,0,0,0.1)', 0, j * 44, W, 4)
  R(x, INK, 170, 470, 740, 560)
  x.save(); x.shadowColor = '#ff8fb1'; x.shadowBlur = 80; R(x, '#ffd0e0', 182, 482, 716, 536); x.restore()
  for (let s = 0; s < 2; s++) { R(x, '#c08a9a', 182, 640 + s * 180, 716, 12); for (let i = 0; i < 6; i++) { const cx = 240 + i * 118, cy = 610 + s * 180; x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 40, 0, TAU); x.fill(); x.fillStyle = ['#e8a050', '#ff8fb1', '#7a4a2a'][(i + s) % 3]; x.beginPath(); x.arc(cx, cy, 34, 0, TAU); x.fill(); x.fillStyle = '#ffd0e0'; x.beginPath(); x.arc(cx, cy, 10, 0, TAU); x.fill() } }
  signBoard(x, 540, 400, 'DOUGHNUTS · TILL LATE', { size: 40, col: '#ff8fb1', bg: '#2a1030' })
  R(x, '#2a2448', 0, 1300, W, 620); R(x, '#4a4078', 0, 1300, W, 12)
  rain(x, t, { n: 70, alpha: 0.35, seed: 8 })
}
function heartDough(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['.HHH.HHH.', 'HHHHHHHHH', 'HHHPPPHHH', 'HHHPPPHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....'], { H: '#ff8fb1', P: '#ffd0e0' }, 0, 0, 14)
  x.restore()
}
function walkHome(x, t) {
  nightSky(x, t, { top: '#0c0e34', bot: '#26265a', stars: 6 })
  skyline(x, t, { seed: 71, base: 1180, minH: 200, maxH: 600, col: '#1e1a48', edge: '#2c2662' })
  lamp(x, 140, 1260, 360); lamp(x, 940, 1260, 360)
  street(x, 1220, { wet: true, t })
  for (const [px, py] of [[300, 1420], [620, 1440], [860, 1400]]) { R(x, '#4a6aa8', px - 90, py - 10, 180, 24); R(x, '#7aa0e0', px - 70, py - 6, 60, 6) }
  rain(x, t, { n: 200, alpha: 0.6, seed: 13 })
}

// ── cast
function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  const pis = (x, y, s, mood, look, tears = 2) => P('pisces', x, y, s, mood, look, { tears, seed: 6 })
  if (t < S.door || t >= S.home) {
    const dive = t < S.door ? 1 : ease.inOutCubic(prog(t, S.dive, S.dive + 0.9))
    const yy = t < S.door ? 1140 : lerp(1100, 1140, dive)
    P('cancer', t < S.door ? 300 : lerp(470, 300, dive), yy, 220, t < S.door ? 'wide' : t > S.dive ? 'happy' : 'sparkle', [1, -1], { seed: 5, hops: t >= S.home ? [S.home + 0.4, T.yes[0], T.yes[2]] : [] })
  } else if (t < S.carts) {
    P('cancer', 540, 1180, 170, t < 11.5 ? 'squint' : 'neutral', [1, 0], { seed: 5 })
    const [lx] = walk(t, [[S.door, 1200, 0], [S.door + 1.0, 820, 0]])
    P('libra', lx - 80, 1360, 170, 'happy', [-1, 0], { seed: 7, hops: [T.bell] })
    P('aquarius', lx + 90, 1370, 170, 'wink', [-1, 0], { seed: 3 })
  } else if (t < S.bridges) {
    P('aquarius', 330, 1330, 190, t > T.noodle ? 'sparkle' : 'happy', [1, -0.5], { seed: 3, hops: [T.noodle] })
    P('cancer', 600, 1340, 190, t > 18.4 ? 'heart' : 'squint', [-1, 0], { seed: 5, hops: [19.8] })
    P('libra', 840, 1350, 170, 'happy', [-1, 0], { seed: 7 })
    pis(960, 1060, 100, 'sparkle', [-1, 0], 2)
  } else if (t < S.dough) {
    P('libra', 290, 1370, 200, t > T.rate[0] ? 'sparkle' : 'happy', [0, -1], { seed: 7, hops: T.rate })
    P('cancer', 560, 1380, 190, t > 27.4 ? 'happy' : 'neutral', [-1, 0], { seed: 5 })
    P('aquarius', 820, 1380, 180, 'neutral', [0, -1], { seed: 3 })
  } else if (t < S.walk) {
    pis(350, 1340, 210, t > 33.0 ? 'happy' : 'sparkle', [1, -1], 3)
    P('cancer', 640, 1360, 190, t > 35.4 ? 'happy' : 'wide', [-1, 0], { seed: 5, hops: [35.5, 36.0] })
    P('libra', 850, 1370, 160, 'heart', [-1, -1], { seed: 7 })
    P('aquarius', 980, 1380, 140, 'happy', [-1, -1], { seed: 3 })
  } else {
    const jump = T.jumps
    P('aquarius', 260, 1360, 180, t > T.flip ? 'wide' : 'happy', [1, -1], { seed: 3, hops: [T.flip, jump[1]] })
    P('cancer', 520, 1380, 200, t > 40.4 ? 'sparkle' : 'neutral', [0, -1], { seed: 5, hops: [jump[0], jump[2], jump[3]] })
    P('libra', 760, 1370, 180, 'happy', [-1, -1], { seed: 7, hops: [jump[1], jump[3]] })
    pis(940, 1380, 160, 'happy', [-1, -1], 3)
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.4, S.last - 0.1])
  let mood = 'happy'
  if (t < S.door) mood = 'wink'
  if (inR(t, S.walk, S.home)) mood = 'sparkle'
  return { x: t < S.door ? 890 : 920, y: (t < S.door ? 640 : 520) + 10 * Math.sin(t * 1.3), s: t < S.door ? 180 : 120, mood, look: [-1, 0.5], pop: k }
}
function back(x, t) { if (t < S.door || t >= S.home) bedroomBits(x, t) }
function bedroomBits(x, t) { void x; void t }
function front(x, t) {
  if (t < S.door || t >= S.home) {
    duvetFront(x, t)
    if (t < S.door || t > S.dive) flyingPhone(x, t, 0)
    else {
      // Cancer types in bed: the group chat
      const k = pop01(t, S.home + 0.3, 0.4, 2)
      x.save(); x.translate(720, 860); x.scale(k, k)
      R(x, INK, -200, -230, 400, 460); R(x, '#f4f0ff', -192, -222, 384, 444); R(x, '#d8d0f0', -192, -222, 384, 50)
      x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('THE THREE OF US + PISCES', 0, -190)
      const msgs = [[T.text, 'same night next week??', true], [T.yes[0], 'YES', false], [T.yes[1], 'yes!!', false], [T.yes[2], 'YES (crying)', false]]
      msgs.forEach(([tm, m, me], i) => { if (t < tm) return; x.font = `800 28px ${INTER}`; const tw = x.measureText(m).width + 34, yy = -130 + i * 80; R(x, me ? '#7fb0ff' : '#ffffff', me ? 176 - tw : -176, yy, tw, 56); R(x, 'rgba(0,0,0,0.12)', me ? 176 - tw : -176, yy + 52, tw, 4); x.fillStyle = INK; x.textAlign = 'left'; x.fillText(m, (me ? 176 - tw : -176) + 17, yy + 37) })
      x.restore()
    }
  }
  if (inR(t, S.door, S.carts)) { const [lx] = walk(t, [[S.door, 1200, 0], [S.door + 1.0, 820, 0]]); umbrella(x, lx, 1060, 460, { col: '#ff7aa8' }) }
  if (inR(t, S.carts, S.bridges) && t > T.noodle) {
    const k = pop01(t, T.noodle, 0.4, 2); x.save(); x.translate(400, 1180); x.scale(k, k); R(x, INK, -50, -40, 100, 80); R(x, '#f4f0ff', -44, -34, 88, 68); for (let i = 0; i < 4; i++) R(x, '#c9a6ff', -36 + i * 18, -30, 8, 40); x.restore()
  }
  if (inR(t, S.bridges, S.dough)) T.rate.forEach((r, i) => { const k = pop01(t, r, 0.3, 2.6); if (t > r) speech(x, t, [300, 560, 820][i], [700, 760, 880][i], r, '10/10', { size: 44, life: S.dough - r - 0.2, col: '#d8ffe0' }); void k })
  if (inR(t, S.dough, S.walk)) heartDough(x, 340, 1150 + 6 * Math.sin(t * 3), pop01(t, S.dough + 0.5, 0.4, 2))
  if (inR(t, S.walk, S.home)) {
    const fl = t > T.flip
    umbrella(x, 260 + (fl ? 300 * prog(t, T.flip, T.flip + 2) : 0), 1060 - (fl ? 500 * prog(t, T.flip, T.flip + 2) : 0), 360, { col: '#ff7aa8', inside: fl ? 1 : 0, rot: fl ? t * 3 : 0 })
    T.jumps.forEach(j => { const tt = t - j - 0.3; if (tt > 0 && tt < 0.6) for (let k = 0; k < 8; k++) { const a = -Math.PI * k / 7; R(x, '#9fd8ff', 520 + Math.cos(a) * 220 * tt - 6, 1440 + Math.sin(a) * 160 * tt + 300 * tt * tt, 12, 12) } })
  }
}
function over(x, t) {
  speech(x, t, 560, 980, T.bell, 'DING-DONG', { size: 40, life: 1.6, col: '#fff3c8' })
}
function drawHome(x, t) { bedroom(x, t) }

const TISSUES = [4.0, S.door + 3, S.carts + 3, S.dough + 0.8, S.dough + 2.4, S.dough + 4.2, S.walk + 4.4, T.yes[2]]

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce02', city: 'Portland', duration: 60, ending: 'loop',
  hook: { text: 'Cancer is *cancelling.* | For the *fourth* time.', out: [3.0, 3.25] },
  freeze: [REC],
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '7:45', draw: bedroom },
    { at: S.door, n: 1, name: 'THE DOOR · 8:00', time: '8:00', draw: frontDoor },
    { at: S.carts, n: 2, name: 'FOOD CARTS · 8:40', time: '8:40', draw: foodCarts },
    { at: S.bridges, n: 3, name: 'THE BRIDGES · 9:50', time: '9:50', draw: bridges },
    { at: S.dough, n: 4, name: 'DOUGHNUTS · 11:15', time: '11:15', draw: doughWindow },
    { at: S.walk, n: 5, name: 'THE WALK HOME · 1:30', time: '1:30', draw: walkHome },
    { at: S.home, n: 6, name: 'HOME · 2:00', time: '2:00', draw: drawHome },
  ],
  cast, stars, back, front, over,
  tissues: TISSUES,
  heads: [
    { text: 'Stay for | *2 a.m.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 430 },
    { text: 'No rain checks. | *Just rain.*', at: S.last, lateAt: S.last + 0.45, top: 400, size: 96, accentSize: 140, accentColor: '#9fd8ff' },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'not tonight. your friends are *outside.*' }] },
    { open: 8.5, close: 15.1, lines: [
      { t: 8.7, who: 'libra', text: 'umbrella for *three!*' },
      { t: 10.6, who: 'cancer', text: '…it’s *raining* though.' },
      { t: 12.6, who: 'aquarius', text: 'that’s why we brought *the umbrella.*' },
    ] },
    { open: 15.8, close: 22.5, lines: [
      { t: 16.0, who: 'aquarius', text: 'one *lavender noodle,* please.' },
      { t: 18.4, who: 'cancer', text: 'that’s so weird. can I have *some?*' },
      { t: 20.6, who: 'pisces', text: 'everyone here is *so nice* I’m crying' },
    ] },
    { open: 23.2, close: 30.1, lines: [
      { t: 23.4, who: 'libra', text: 'that bridge? a *ten.*' },
      { t: 25.5, who: 'libra', text: 'that one? *also* a ten.' },
      { t: 27.6, who: 'cancer', text: 'you said that about *all of them.*' },
    ] },
    { open: 30.8, close: 37.5, lines: [
      { t: 31.0, who: 'pisces', text: 'it’s shaped like a *heart.*' },
      { t: 33.2, who: 'cancer', text: 'are you… *okay?*' },
      { t: 35.0, who: 'pisces', text: 'I’m *so* okay. look at it.' },
    ] },
    { open: 38.2, close: 45.7, lines: [
      { t: 38.4, who: 'aquarius', text: 'heads up: the umbrella is *leaving.*' },
      { t: 40.6, who: 'cancer', text: 'who *cares!* PUDDLE!' },
      { t: 43.0, who: 'stars', text: 'look who’s *dancing* in the rain.' },
    ] },
    { open: 46.3, close: 55.7, lines: [
      { t: 46.5, who: 'cancer', text: 'best night in *months.*' },
      { t: 50.6, who: 'stars', text: 'so… next time it rains?' },
      { t: 52.8, who: 'cancer', text: 'umbrella for *four.*' },
    ] },
  ],
  fx: [
    [caught, { at: 1.1, x: 760, y: 900, r: 170, out: [2.3, 2.45], arrow: 'bl', label: 'THE FOURTH ONE' }, caughtCues],
    [screenShake, { at: T.flip, len: 0.4, amp: 16 }, shakeCues],
  ],
  music: { style: 'lofi', key: 'Ab', seed: 4002, drop: S.door, breakdown: [S.bridges], lift: [S.walk, S.home], hits: [T.flip, S.last + 0.45] },
  cues: [
    ['whoosh', 0.02, 0.6, 0.05], ['bell', T.bell, 1318.51, 0.04, 0.6, 0], ['bell', T.bell + 0.35, 1046.5, 0.04, 0.8, 0],
    ['pop', T.noodle, 880, 0.035, 0], ...T.rate.map(r => ['pluck', r, 1567.98, 0.035, 0.3, 0]),
    ['whoosh', T.flip, 0.7, 0.05], ...T.jumps.map(j => ['pop', j + 0.3, 523.25, 0.04, 0]),
    ['pop', T.text, 987.77, 0.035, 0.3], ...T.yes.map((y, i) => ['pop', y, [1174.66, 1318.51, 1567.98][i], 0.04, 0.2]),
    ['whoosh', S.dive, 0.6, 0.04],
  ],
})
