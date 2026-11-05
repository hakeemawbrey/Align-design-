// kxrce01 · Remix Cities: Extended · "San Francisco: The Fog Ate the Plan" (60 s vertical, jazzy · Eb). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../rckit.js. No end card, no card cut.
//   0.00–3.3   HOOK. A fog wave mid-swallow of a cable car on a steep hill; ♍ Virgo mid-scream, a laminated six-stop
//              itinerary, pages flying. Slam title "Virgo planned *six stops.* | Fog said *no.*" Whip zoom out at 0.
//   3.4–7.9    THE STARS (tour guide): "a whole night in San Francisco." / "wait for *stop six.*"  ROUTE strip, 6 pins.
//   8.0  1 CABLE CAR (7:00)   Gemini hangs off the side narrating; Virgo ticks the box.
//  15.6  2 DUMPLINGS (8:00)   Taurus orders one of everything; fog rolls in the door; nobody can see the table.
//  23.4  3 THE VIEW (9:15)    all fog; Leo poses; the photo prints solid grey: "still iconic."
//  31.2  4 THE PLAN (10:30)   the itinerary flies off into the fog; loading bar "re-planning…"; Sag: "now we wing it."
//  39.0  5 WINGING IT (11:30) a midnight sourdough window; Virgo laughs for the first time.
//  46.8  6 MIDNIGHT (12:00)   the fog slides off the red bridge; the city twinkles; everyone gasps.
//  58.2  last line "The best stop | wasn't *on the list.*" holds to the cut at 60.
// Real touches: the summer-and-winter fog, cable cars on the steep hills, the red bridge, the painted row houses,
// sourdough. Pisces cries at every stop (TISSUES counter).
import {
  cityFilm, nightSky, skyline, street, lamp, fog, table, interior, stringLights, signBoard, R, walk, step, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../rckit.js'
import { loadingBar, loadingBarCues, screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, cable: 8.0, dump: 15.6, view: 23.4, plan: 31.2, wing: 39.0, mid: 46.8, last: 58.2 }
const T = {
  check: 12.2, fogIn: [17.9, 19.4], snap: 25.4, photo: [25.6, 26.2], blow: [31.6, 33.4], load: 33.0, wing: 36.3,
  bread: 40.0, laugh: 41.6, lift: [48.0, 50.6], gasp: 50.4,
}
const BRIDGE_RED = '#d2492e'

// ── pieces
function bridge(x, t, { x0 = 560, y = 860, s = 1, k = 1 } = {}) {
  // two towers, the deck, the main cable and suspenders (front view, slight perspective)
  x.save(); x.translate(x0, y); x.scale(s, s); x.globalAlpha *= k
  const tower = tx => {
    R(x, INK, tx - 34, -330, 68, 400); R(x, BRIDGE_RED, tx - 28, -324, 56, 388)
    for (const yy of [-300, -220, -140]) { R(x, INK, tx - 34, yy, 68, 12); R(x, '#a8361f', tx - 28, yy + 2, 56, 8) }
    R(x, '#1a1440', tx - 12, -290, 24, 60); R(x, '#1a1440', tx - 12, -200, 24, 50)
  }
  R(x, INK, -620, 10, 1240, 26); R(x, BRIDGE_RED, -620, 14, 1240, 16)
  x.strokeStyle = BRIDGE_RED; x.lineWidth = 7
  const cab = (a, b, ya, yb, sag) => { x.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24, px = lerp(a, b, u), py = lerp(ya, yb, u) + sag * 4 * u * (1 - u); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  cab(-200, 200, -320, -320, 260); cab(-620, -200, -60, -320, -40); cab(200, 620, -320, -60, -40)
  x.lineWidth = 3
  for (let i = 1; i < 16; i++) { const u = i / 16, px = lerp(-200, 200, u), py = -320 + 260 * 4 * u * (1 - u); x.beginPath(); x.moveTo(px, py); x.lineTo(px, 12); x.stroke() }
  tower(-200); tower(200)
  // deck lights
  for (let i = 0; i < 20; i++) { x.fillStyle = `rgba(255,224,150,${0.6 + 0.4 * Math.sin(t * 2 + i)})`; x.fillRect(-600 + i * 62, 2, 8, 8) }
  x.restore()
}
const VIC = ['#e98aa8', '#8ad0e9', '#f2c75c', '#9fe6b0', '#c9a6ff', '#f0a070']
function rowHouses(x, t, baseFn, x0, x1, seed = 2) {
  const r = rng(seed)
  for (let hx = x0; hx < x1; hx += 150) {
    const by = baseFn(hx + 70), hh = 300 + r() * 60, col = VIC[Math.floor(r() * VIC.length)]
    R(x, INK, hx - 4, by - hh - 4, 148, hh + 8); R(x, col, hx, by - hh, 140, hh)
    R(x, mixHex(col, '#ffffff', 0.4), hx, by - hh, 140, 14)
    // bay window + door
    R(x, INK, hx + 14, by - hh + 50, 60, 120); R(x, (Math.sin(t + hx) > -0.7) ? '#ffe08a' : '#6a5a40', hx + 20, by - hh + 56, 48, 108)
    R(x, INK, hx + 90, by - 120, 36, 120); R(x, mixHex(col, '#000000', 0.35), hx + 94, by - 116, 28, 116)
    R(x, INK, hx + 84, by - hh + 60, 44, 44); R(x, '#ffe08a', hx + 90, by - hh + 66, 32, 32)
    // gable
    x.fillStyle = INK; x.beginPath(); x.moveTo(hx - 8, by - hh); x.lineTo(hx + 70, by - hh - 60); x.lineTo(hx + 148, by - hh); x.fill()
    x.fillStyle = mixHex(col, '#000000', 0.15); x.beginPath(); x.moveTo(hx + 2, by - hh - 2); x.lineTo(hx + 70, by - hh - 52); x.lineTo(hx + 138, by - hh - 2); x.fill()
  }
}
const SLOPE = px => 1460 - px * 0.36                        // the steep street: higher to the right
function hillStreet(x, t) {
  // the bay + the bridge far back, row houses up the hill, the street with cable-car slot rails
  bridge(x, t, { x0: 640, y: 900, s: 0.62 })
  R(x, '#14205a', 0, 920, W, 140)
  rowHouses(x, t, px => SLOPE(px) - 60, -40, W + 40, 5)
  x.fillStyle = '#2c2456'; x.beginPath(); x.moveTo(0, SLOPE(0) - 60); x.lineTo(W, SLOPE(W) - 60); x.lineTo(W, H); x.lineTo(0, H); x.fill()
  x.fillStyle = '#3d3470'; x.beginPath(); x.moveTo(0, SLOPE(0) - 60); x.lineTo(W, SLOPE(W) - 60); x.lineTo(W, SLOPE(W) - 30); x.lineTo(0, SLOPE(0) - 30); x.fill()
  x.strokeStyle = '#8a80b0'; x.lineWidth = 6
  for (const off of [60, 130, 200]) { x.beginPath(); x.moveTo(0, SLOPE(0) + off); x.lineTo(W, SLOPE(W) + off); x.stroke() }
}
function cableCar(x, t, cx, cy, { rot = -0.34, k = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -250, -210, 500, 230)
  R(x, '#c8402e', -244, -60, 488, 74)                       // red lower body
  R(x, '#f1e2bf', -244, -204, 488, 146)                     // cream upper
  for (let i = 0; i < 6; i++) { R(x, INK, -226 + i * 78, -190, 64, 100); R(x, '#ffe7a0', -220 + i * 78, -184, 52, 88) }
  R(x, INK, -264, -232, 528, 28); R(x, '#6b3d2a', -258, -228, 516, 20)
  R(x, INK, -200, 14, 70, 40); R(x, INK, 130, 14, 70, 40)
  x.font = `800 30px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('POWELL & HYDE', 0, -26)
  x.restore()
}
function steamer(x, cx, cy, n = 2, steam = 0, t = 0) {
  for (let i = 0; i < n; i++) { R(x, INK, cx - 56, cy - 30 - i * 34, 112, 38); R(x, '#d9a65a', cx - 50, cy - 26 - i * 34, 100, 30); R(x, '#b98640', cx - 50, cy - 12 - i * 34, 100, 4) }
  if (steam > 0) { x.save(); x.globalAlpha = 0.5 * steam; for (let j = 0; j < 3; j++) { const sy = (t * 60 + j * 40) % 120; R(x, '#f4f0ff', cx - 20 + j * 18 + 6 * Math.sin(t * 3 + j), cy - 40 - n * 34 - sy, 10, 24) } x.restore() }
}
function viewer(x, cx, cy) {
  // a coin viewer on a post (binoculars)
  R(x, INK, cx - 10, cy - 160, 20, 160); R(x, '#7a8aa8', cx - 6, cy - 156, 12, 156)
  R(x, INK, cx - 50, cy - 230, 100, 76); R(x, '#9fb0cc', cx - 44, cy - 224, 88, 64)
  R(x, INK, cx - 40, cy - 216, 28, 28); R(x, INK, cx + 12, cy - 216, 28, 28)
}
function bakeryWall(x, t, k) {
  // a brick wall with one warm window, loaves on shelves, a hand passing a loaf
  R(x, '#5a2e2a', 0, 0, W, 1250)
  for (let j = 0; j < 30; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 3 ? '#6a3830' : '#743e34', i * 96 + (j % 2) * 48 - 48, j * 42, 90, 36)
  R(x, INK, 200, 520, 680, 470)
  x.save(); x.shadowColor = '#ffcf7a'; x.shadowBlur = 80; R(x, '#ffd98a', 214, 534, 652, 442); x.restore()
  for (let s = 0; s < 3; s++) { R(x, '#8a5a30', 214, 640 + s * 120, 652, 14); for (let i = 0; i < 6; i++) { R(x, INK, 236 + i * 104, 594 + s * 120, 84, 48); R(x, '#c98a40', 240 + i * 104, 598 + s * 120, 76, 40); R(x, '#e8b870', 252 + i * 104, 606 + s * 120, 40, 8) } }
  signBoard(x, 540, 450, 'WARM BREAD · OPEN LATE', { size: 38, col: '#ffe08a' })
  R(x, '#3a3466', 0, 1250, W, 670); R(x, '#2a2450', 0, 1250, W, 20)
  void k; void t
}

// ── stop backgrounds
function drawHill(x, t) {
  nightSky(x, t, { top: '#0c0f33', bot: '#3a2a6a', glow: '#ff9a7a', stars: 34, moon: { x: 880, y: 420, r: 46 } })
  skyline(x, t, { seed: 8, base: 940, minH: 120, maxH: 360, col: '#1d1848', edge: '#2c2464' })
  hillStreet(x, t)
}
function drawCable(x, t) {
  drawHill(x, t)
  cableCar(x, t, 540, 1150 + 8 * Math.sin(t * 9) * (t < S.dump ? 1 : 0), { rot: -0.34 })
}
function drawDumplings(x, t) {
  interior(x, t, { wall: '#6a2a2e', floor: '#3a1a22', trim: '#2a0e14', winSky: '#1a1440', seed: 12 })
  // paper lanterns
  for (let i = 0; i < 4; i++) { const lx = 170 + i * 250, ly = 260 + 10 * Math.sin(t * 1.5 + i); R(x, INK, lx - 2, 180, 4, ly - 180); R(x, INK, lx - 44, ly - 4, 88, 78); R(x, '#e0453a', lx - 38, ly, 76, 70); R(x, '#ffb07a', lx - 38, ly + 30, 76, 6) }
  signBoard(x, 540, 880, 'DUMPLINGS', { size: 46, col: '#ffe08a', bg: '#3a0e14' })
  table(x, 540, 1290, 760, { top: '#f4e6c8', side: '#7a3a2a' })
  const n = Math.floor(clamp(prog(t, S.dump + 1.2, S.dump + 3.6)) * 6)
  for (let i = 0; i < 6; i++) if (i < n || t > S.dump + 3.6) steamer(x, 270 + i * 108, 1288, 1 + (i % 2), 1, t)
}
function drawView(x, t) {
  // the lookout: all fog (the city is somewhere out there)
  nightSky(x, t, { top: '#5a6078', bot: '#9aa2b8', stars: 0 })
  R(x, '#6a6a80', 0, 1330, W, 590); R(x, '#7a7a92', 0, 1330, W, 16)
  R(x, INK, 0, 1210, W, 14); for (let i = 0; i < 12; i++) R(x, INK, i * 96 + 20, 1210, 10, 120)
  viewer(x, 900, 1330)
  fog(x, t, 1, { y0: 0, y1: 1330, col: '#cfd5e2', seed: 9 })
}
function drawPlan(x, t) {
  nightSky(x, t, { top: '#1a1a3a', bot: '#4a4a6a', stars: 10 })
  skyline(x, t, { seed: 21, base: 1250, minH: 200, maxH: 560, col: '#262048', edge: '#36306a' })
  lamp(x, 150, 1290, 380); lamp(x, 930, 1290, 380)
  street(x, 1250, { walkCol: '#3b3466', roadCol: '#221c40' })
  fog(x, t, 0.35 + 0.35 * prog(t, S.plan, S.plan + 4), { y0: 0, y1: 1500, col: '#c8cede', seed: 13 })
}
function drawWing(x, t) { bakeryWall(x, t, 1); stringLights(x, t, 40, 1040, 330, 30) }
function drawMid(x, t) {
  const lift = ease.inOutCubic(prog(t, ...T.lift))
  nightSky(x, t, { top: '#0a0b2e', bot: '#2a2060', glow: '#ff9a7a', stars: 60, moon: { x: 870, y: 380, r: 50 }, seed: 5 })
  skyline(x, t, { seed: 33, base: 1000, minH: 90, maxH: 300, col: '#1d1848', edge: '#2c2464', dens: 0.6 })
  bridge(x, t, { x0: 560, y: 960, s: 0.9 })
  R(x, '#0f1a4a', 0, 990, W, 120)
  for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(255,224,150,${0.25 + 0.25 * Math.sin(t * 3 + i)})`; x.fillRect((i * 97) % W, 1010 + (i % 4) * 22, 26, 4) }
  // the lookout hilltop
  x.fillStyle = '#2c2456'; x.beginPath(); x.moveTo(0, 1220); x.quadraticCurveTo(540, 1130, W, 1220); x.lineTo(W, H); x.lineTo(0, H); x.fill()
  R(x, INK, 0, 1206, W, 10); for (let i = 0; i < 12; i++) R(x, INK, i * 96 + 20, 1206, 10, 110)
  fog(x, t, 1 - lift, { y0: 300, y1: 1200, col: '#cfd5e2', seed: 17 })
}
function drawHook(x, t) {
  drawHill(x, t)
  cableCar(x, t, 600, 1120, { rot: -0.34 })
  // the fog wave, mid-swallow, rolling in from the left
  const wx = 380 + 60 * Math.sin(t * 0.6)
  x.save()
  const g = x.createLinearGradient(wx - 600, 0, wx + 260, 0); g.addColorStop(0, 'rgba(225,230,242,1)'); g.addColorStop(0.75, 'rgba(225,230,242,0.92)'); g.addColorStop(1, 'rgba(225,230,242,0)')
  x.fillStyle = g
  x.beginPath(); x.moveTo(-40, 400)
  for (let i = 0; i <= 12; i++) { const yy = 400 + i * 100, bulge = 80 * Math.sin(i * 1.3 + t * 1.5); x.lineTo(wx + bulge + (i % 2) * 60, yy) }
  x.lineTo(-40, 1700); x.fill()
  for (let i = 0; i < 7; i++) { const cy = 520 + i * 160, cxx = wx + 30 + 50 * Math.sin(i * 2 + t * 1.6); x.beginPath(); x.arc(cxx, cy, 110 + 20 * Math.sin(i + t), 0, TAU); x.fill() }
  x.restore()
}

// ── cast
const PIS_TEARS = t => (t > S.mid + 3.2 ? 3 : inR(t, S.dump + 3, S.dump + 6) || inR(t, S.view + 2, S.view + 6) ? 3 : 2)
function cast(t) {
  const out = []
  const P = (sign, x, y, s, mood, look, extra = {}) => out.push({ sign, x, y, s, mood, look, ...extra })
  const pis = (x, y, s, mood, look) => P('pisces', x, y, s, mood, look, { tears: PIS_TEARS(t), seed: 6 })
  if (t < S.cable) {
    // HOOK: Virgo mid-scream at the front, pages flying; Gemini + Pisces in the car
    P('gemini', 520, 1012, 110, 'wide', [-1, 0], { seed: 4 })
    pis(700, 948, 110, 'wide', [-1, 0])
    P('virgo', 330, 1380, 250, t < 3.6 ? 'wide' : 'squint', [-1, -0.6], { seed: 2, hops: [0.0, 0.5, 1.0] })
  } else if (t < S.dump) {
    const ride = prog(t, S.cable, S.dump)
    P('gemini', 300 + 40 * ride, 1080, 150, t < T.check ? 'happy' : 'wink', [-1, 0], { seed: 4 })
    pis(560, 990, 120, 'sparkle', [-1, 0])
    P('virgo', 760, 920, 150, t > T.check ? 'happy' : 'neutral', [-1, 0.4], { seed: 2, hops: [T.check] })
  } else if (t < S.view) {
    const fk = prog(t, ...T.fogIn)
    P('taurus', 260, 1200, 210, t < S.dump + 2.8 ? 'heart' : fk > 0.5 ? 'happy' : 'sparkle', [1, 0], { seed: 7 })
    P('virgo', 540, 1170, 190, fk > 0.5 ? 'wide' : 'neutral', [-1, 0], { seed: 2 })
    pis(820, 1190, 180, fk > 0.5 ? 'wide' : 'heart', [-1, 0])
  } else if (t < S.plan) {
    P('leo', 380, 1300, 240, t < T.snap ? 'wink' : t < T.photo[1] + 0.5 ? 'wide' : 'sparkle', [1, 0], { seed: 8, hops: [T.snap, T.photo[1] + 0.6] })
    P('virgo', 700, 1320, 170, 'eyeroll', [-1, 0], { seed: 2 })
    pis(900, 1310, 160, 'wide', [-1, -0.4])
  } else if (t < S.wing) {
    const [vx] = walk(t, [[S.plan, 520, 0], [T.blow[0], 540, 0], [T.blow[1], 470, 0]])
    P('virgo', vx, 1330, 230, t < T.blow[0] ? 'neutral' : t < T.wing ? 'wide' : 'squint', [1, -0.6], { seed: 2, hops: [T.blow[0] + 0.1] })
    P('sagittarius', 860, 1350, 200, t > T.wing - 0.4 ? 'happy' : 'neutral', [-1, 0], { seed: 9, hops: [T.wing] })
    pis(170, 1360, 160, 'wide', [1, -0.6])
  } else if (t < S.mid) {
    P('sagittarius', 220, 1380, 180, 'happy', [1, 0], { seed: 9 })
    P('virgo', 470, 1400, 210, t > T.laugh ? 'happy' : 'neutral', [1, -0.3], { seed: 2, hops: [T.laugh, T.laugh + 0.5] })
    P('taurus', 720, 1400, 180, 'heart', [-1, -0.3], { seed: 7 })
    pis(920, 1390, 150, 'sparkle', [-1, 0])
  } else {
    const g = t > T.gasp
    P('gemini', 130, 1300, 140, g ? 'wide' : 'neutral', [1, -1], { seed: 4, hops: [T.gasp] })
    P('leo', 290, 1330, 160, g ? 'sparkle' : 'neutral', [1, -1], { seed: 8, hops: [T.gasp + 0.06] })
    P('virgo', 470, 1350, 190, g ? 'heart' : 'neutral', [0, -1], { seed: 2, hops: [T.gasp + 0.1] })
    P('sagittarius', 650, 1330, 160, g ? 'happy' : 'neutral', [-1, -1], { seed: 9, hops: [T.gasp + 0.14] })
    P('taurus', 810, 1320, 150, g ? 'sparkle' : 'neutral', [-1, -1], { seed: 7, hops: [T.gasp + 0.18] })
    pis(960, 1300, 140, g ? 'happy' : 'wide', [-1, -1])
  }
  return out
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  let mood = 'happy', look = [-1, 0.5]
  if (inR(t, S.view, S.plan)) mood = 'squint'
  if (inR(t, T.blow[0], T.wing)) mood = 'wide'
  if (t > T.gasp) mood = 'sparkle'
  const y = t < S.cable ? 900 : 520
  return { x: 900, y: y + 10 * Math.sin(t * 1.4), s: t < S.cable ? 200 : 120, mood, look, pop: k }
}

// ── props in front: the itinerary pages, the photo, the loaves, hearts
function pages(x, t, x0, y0, t0, n = 6, spread = 1) {
  for (let i = 0; i < n; i++) {
    const tt = t - t0 + i * 0.13, r = rng(40 + i)
    const px = x0 + (180 + r() * 380) * spread * Math.sin(tt * 0.6 + i) + tt * (60 + i * 30), py = y0 - 220 * Math.sin(tt * 0.9 + i * 0.7) - tt * 40
    x.save(); x.translate(px, py); x.rotate(tt * (1.2 + i * 0.4))
    R(x, INK, -42, -54, 84, 108); R(x, '#f4f4f8', -38, -50, 76, 100)
    R(x, '#7a8ab0', -28, -36, 44, 6); R(x, '#7a8ab0', -28, -22, 54, 6); R(x, '#7a8ab0', -28, -8, 38, 6)
    x.font = `700 20px ${MONO}`; x.fillStyle = '#c84060'; x.fillText(String(i + 1), 16, 34)
    x.restore()
  }
}
function front(x, t) {
  if (t < S.cable) {
    pages(x, t, 300, 1180, -0.6, 6)
    // the laminated itinerary in Virgo's hands
    x.save(); x.translate(470, 1260); x.rotate(-0.15 + 0.05 * Math.sin(t * 18))
    R(x, INK, -70, -92, 140, 184); R(x, '#eef6ff', -64, -86, 128, 172); R(x, 'rgba(255,255,255,0.6)', -64, -86, 128, 12)
    x.font = `800 18px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('THE PLAN', 0, -58)
    for (let i = 0; i < 6; i++) { R(x, '#7a8ab0', -50, -40 + i * 22, 70, 6); x.fillStyle = '#5fbf6a'; x.fillRect(32, -44 + i * 22, 12, 12) }
    x.restore()
  }
  if (inR(t, S.cable, S.dump) && t > T.check) {
    const k = pop01(t, T.check, 0.3, 2.6)
    drawBits(x, ['.........G', '........GG', '.......GG.', 'G.....GG..', 'GG...GG...', '.GG.GG....', '..GGG.....', '...G......'], { G: '#7dffb0' }, 860, 780, 9 * k)
  }
  if (inR(t, S.dump, S.view)) fog(x, t, ease.inOutCubic(prog(t, ...T.fogIn)) * 0.95, { y0: 0, y1: 1560, col: '#dfe4ef', seed: 3 })
  if (inR(t, S.view, S.plan)) {
    // the flash + the printed photo: solid grey
    if (inR(t, T.snap, T.snap + 0.25)) { x.save(); x.globalAlpha = 1 - prog(t, T.snap, T.snap + 0.25); R(x, '#ffffff', 0, 0, W, H); x.restore() }
    const k = pop01(t, T.photo[0], 0.4, 2)
    if (t > T.photo[0]) {
      x.save(); x.translate(640, 780 + 30 * (1 - k)); x.rotate(0.08); x.scale(k, k)
      R(x, INK, -170, -190, 340, 400); R(x, '#f6f1e6', -160, -180, 320, 380); R(x, '#a9adb8', -140, -160, 280, 270)
      x.font = `italic 600 40px 'EB Garamond'`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('the view (9:15)', 0, 160)
      x.restore()
    }
  }
  if (inR(t, S.plan, S.wing)) {
    // the itinerary rips away and flutters into the fog
    if (t < T.blow[0]) { x.save(); x.translate(620, 1150); x.rotate(0.1); R(x, INK, -60, -80, 120, 160); R(x, '#eef6ff', -54, -74, 108, 148); x.restore() }
    else pages(x, t, 600, 1100, T.blow[0], 6, 1.6)
    // wind lines
    x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.lineWidth = 4
    for (let i = 0; i < 6; i++) { const yy = 500 + i * 140, xx = ((t * 900 + i * 300) % 1500) - 200; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + 160, yy - 10); x.stroke() }
    x.restore()
  }
  if (inR(t, S.wing, S.mid)) {
    // a hand passes warm loaves out of the window; everyone has one
    const k = pop01(t, T.bread, 0.4, 2)
    if (k > 0) for (const [lx, ly] of [[290, 1270], [520, 1270], [760, 1280]]) { x.save(); x.translate(lx, ly); x.scale(k, k); R(x, INK, -50, -28, 100, 56); R(x, '#c98a40', -46, -24, 92, 48); R(x, '#e8b870', -30, -16, 52, 8); x.restore() }
    if (t > T.laugh) hearts(x, t, 470, 1150, T.laugh, { n: 6, cell: 7, spread: 160 })
  }
  if (t > S.mid) sparkles(x, t, 560, 760, T.gasp, 14, 300, 1, [GOLD, PINK, BONE])
}
function over(x, t) {
  // speech pops inside the scene
  speech(x, t, 330, 1010, -0.5, 'NOOOO!!', { size: 64, tail: -1, life: 3.75, col: '#fff3c8', shake: 6, rot: -0.06 })
  speech(x, t, 760, 640, S.view + 0.8, 'say “fog”!', { size: 44, tail: -1, life: 1.6, col: BONE })
  speech(x, t, 640, 580, T.gasp, 'OHHH.', { size: 60, tail: 0, life: 2.4, col: '#fff3c8' })
}

const TISSUES = [S.cable + 2.2, S.dump + 3.4, S.view + 2.6, T.blow[0] + 0.6, S.wing + 2.4, T.gasp + 0.3, T.gasp + 1.1, T.gasp + 1.8]

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce01', city: 'San Francisco', duration: 60, ending: 'cut',
  hook: { text: 'Virgo planned *six stops.* | Fog said *no.*', out: [3.0, 3.25] },
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '6:45', draw: drawHook },
    { at: S.cable, n: 1, name: 'CABLE CAR · 7:00', time: '7:00', draw: drawCable },
    { at: S.dump, n: 2, name: 'DUMPLINGS · 8:00', time: '8:00', draw: drawDumplings },
    { at: S.view, n: 3, name: 'THE VIEW · 9:15', time: '9:15', draw: drawView },
    { at: S.plan, n: 4, name: 'THE PLAN · 10:30', time: '10:30', draw: drawPlan },
    { at: S.wing, n: 5, name: 'WINGING IT · 11:30', time: '11:30', draw: drawWing },
    { at: S.mid, n: 6, name: 'STOP SIX · 12:00', time: '12:00', draw: drawMid },
  ],
  cast, stars, front, over,
  tissues: TISSUES,
  heads: [
    { text: 'Wait for | *stop six.*', at: 5.7, lateAt: 6.15, out: [7.6, 7.85], top: 420 },
    { text: 'The best stop | wasn’t *on the list.*', at: S.last, lateAt: S.last + 0.42, top: 380, size: 88, accentSize: 128, accentColor: PINK },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [
      { t: 3.7, who: 'stars', text: 'a whole night in *San Francisco.*' },
      { t: 5.6, who: 'virgo', text: 'six stops. *laminated.*' },
    ] },
    { open: 8.5, close: 15.3, lines: [
      { t: 8.7, who: 'gemini', text: 'on your left: a *hill.* on your right: a *hill.*' },
      { t: 11.4, who: 'virgo', text: '7:00, cable car. *check.*' },
      { t: 13.2, who: 'pisces', text: 'the houses are *so cute* I’m crying' },
    ] },
    { open: 16.0, close: 23.1, lines: [
      { t: 16.2, who: 'taurus', text: 'one of *everything,* please.' },
      { t: 19.2, who: 'virgo', text: 'I can’t see the *table.*' },
      { t: 21.0, who: 'taurus', text: 'I can *smell* the table.' },
    ] },
    { open: 23.8, close: 30.9, lines: [
      { t: 24.0, who: 'stars', text: 'and here’s the view of the *whole city!*' },
      { t: 26.6, who: 'leo', text: 'still *iconic.*' },
      { t: 28.4, who: 'pisces', text: 'it’s so *moody.* I love it.' },
    ] },
    { open: 31.5, close: 38.7, lines: [
      { t: 31.7, who: 'virgo', text: 'the plan! the plan is *flying!*' },
      { t: 36.2, who: 'sagittarius', text: 'perfect. now we *wing it.*' },
      { t: 37.6, who: 'virgo', text: 'I don’t know *how.*' },
    ] },
    { open: 39.4, close: 46.5, lines: [
      { t: 39.6, who: 'sagittarius', text: 'step one: follow the *bread smell.*' },
      { t: 41.8, who: 'virgo', text: 'wait. this is… *fun?*' },
      { t: 44.0, who: 'stars', text: 'the best stops are *unplanned,* babe.' },
    ] },
    { open: 47.2, close: 57.9, lines: [
      { t: 47.4, who: 'virgo', text: 'stop six was… *nothing.* just this.' },
      { t: 51.2, who: 'leo', text: 'okay. *that’s* iconic.' },
      { t: 53.6, who: 'pisces', text: 'I’m not crying. it’s the *fog.*' },
      { t: 55.9, who: 'stars', text: 'told you to wait for *stop six.*' },
    ] },
  ],
  fx: [
    [screenShake, { at: 0.35, len: 0.5, amp: 24 }, shakeCues],
    [loadingBar, { at: T.load, len: 2.9, label: 're-planning…', stallAt: 99, error: 'Error: plan not found', y: 820 }, loadingBarCues],
    [screenShake, { at: T.gasp, len: 0.4, amp: 14 }, shakeCues],
  ],
  music: { style: 'jazzy', key: 'Eb', seed: 4001, drop: S.cable, breakdown: [S.view, S.plan], lift: [S.wing, S.mid], hits: [T.gasp, S.last + 0.42] },
  cues: [
    ['whoosh', 0.02, 0.6, 0.05], ['tick', T.check, 0.05], ['pop', T.check + 0.05, 1318.51, 0.04, 0.3],
    ['whoosh', T.fogIn[0], 1.2, 0.035], ['tick', T.snap, 0.06], ['pop', T.photo[0], 659.25, 0.035, 0],
    ['whoosh', T.blow[0], 0.8, 0.05], ['whoosh', T.blow[0] + 0.5, 0.6, 0.03],
    ['pop', T.bread, 880, 0.035, 0], ['glitter', T.laugh, T.laugh + 0.5],
    ['riser', T.lift[0], T.lift[1], 0.03], ['bell', T.gasp, 1567.98, 0.04, 1.6, 0], ['glitter', T.gasp, T.gasp + 0.9],
  ],
})
