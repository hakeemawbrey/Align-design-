// kxrce06 · Remix Cities: Extended · "Paris: Solo in the City of Couples" (60 s vertical, dreamy · Bb). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♈ Aries mid-sprint along the river, a baguette held like a relay baton, a couple's heart-burst exploding
//         in their face. Slam "Solo in Paris. | Surrounded by *couples.*" Record scratch + freeze at 0.9.
//   3.4   THE STARS: "you took yourself to Paris." · promise "Wait for | *11 p.m.*"
//   8.0   1 THE BAKERY         a couple shares one croissant; Aries eats two
//  17.0   2 THE RIVER          couples on every bench; Aries squeezes in; "you're allowed to take yourself out."
//  26.0   3 THE PAINTERS' HILL a street painter paints Aries: "someone having fun"
//  35.0   4 THE CAFÉ           a window table for one, people-watching, a postcard to future Aries
//  44.0   5 11 P.M.            on the hour the tower sparkles; Aries cheers; ♓ Pisces, another solo tourist, sobbing;
//                              they cheer together
//  58.2   last line "Table for one. | *Best seat* in Paris." → cut at 60.
// The couples are plain stars (no signs). Real touches: bakeries, the river and its bridges, the hill of street
// painters, café windows, the tower that sparkles for a few minutes on the hour after dark.
import {
  cityFilm, nightSky, skyline, street, lamp, stringLights, signBoard, table, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawChar, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, bakery: 8.0, river: 17.0, paint: 26.0, cafe: 35.0, mon: 44.0, last: 58.2 }
const T = { two: 9.6, squeeze: 20.0, reveal: 31.6, card: 38.0, sparkle: 45.0, cheer: 47.4, pis: 49.6, together: 52.6 }
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1500 }
const CPL = [['#f4d0e0', '#c0d8ff'], ['#ffe0a0', '#d0b0ff'], ['#b0f0d0', '#ffc0a0']]

function tower(x, t, cx, base, h, sparkleK = 0) {
  const w = h * 0.42
  const col = '#c8905a', dark = '#8a5a32'
  x.save()
  // legs + taper as stacked trapezoids
  const lvl = (y0, y1, w0, w1) => { x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w0 / 2 - 5, y0); x.lineTo(cx - w1 / 2 - 5, y1); x.lineTo(cx + w1 / 2 + 5, y1); x.lineTo(cx + w0 / 2 + 5, y0); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(cx - w0 / 2, y0); x.lineTo(cx - w1 / 2, y1); x.lineTo(cx + w1 / 2, y1); x.lineTo(cx + w0 / 2, y0); x.fill() }
  lvl(base, base - h * 0.28, w, w * 0.5)
  x.fillStyle = '#0e0c2a'; x.beginPath(); x.arc(cx, base, w * 0.24, Math.PI, TAU); x.fill()
  R(x, INK, cx - w * 0.3, base - h * 0.29, w * 0.6, 14); R(x, dark, cx - w * 0.28, base - h * 0.285, w * 0.56, 8)
  lvl(base - h * 0.29, base - h * 0.55, w * 0.46, w * 0.22)
  R(x, INK, cx - w * 0.15, base - h * 0.56, w * 0.3, 12)
  lvl(base - h * 0.56, base - h, w * 0.2, w * 0.04)
  // lattice
  x.strokeStyle = dark; x.lineWidth = 2
  for (let k = 0; k < 18; k++) { const y = base - k * h / 18; x.beginPath(); x.moveTo(cx - w * 0.5 * (1 - k / 18) * 0.9, y); x.lineTo(cx + w * 0.5 * (1 - k / 18) * 0.9, y - h / 18); x.stroke() }
  // warm floodlight
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, base - h * 0.4, 0, cx, base - h * 0.4, h * 0.7); g.addColorStop(0, 'rgba(255,200,120,0.22)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - h, base - h * 1.2, h * 2, h * 1.3)
  // the sparkle (on the hour)
  if (sparkleK > 0) { const r = rng(Math.floor(t * 12)); for (let i = 0; i < 70; i++) { const yy = base - r() * h, ww = w * 0.5 * (1 - (base - yy) / h); if (r() < 0.6) { const px = cx + (r() - 0.5) * 2 * ww; x.fillStyle = `rgba(255,255,255,${sparkleK})`; x.fillRect(px - 3, yy - 3, 7, 7) } } }
  x.restore()
}
function riverScene(x, t, sparkleK = 0) {
  nightSky(x, t, { top: '#0c0c34', bot: '#3a2a6a', stars: 40, moon: { x: 170, y: 380, r: 44 }, glow: '#ffb07a' })
  skyline(x, t, { seed: 61, base: 1040, minH: 160, maxH: 260, col: '#2a2052', edge: '#3a3070', wMin: 110, wMax: 170 })
  tower(x, t, 780, 1040, 640, sparkleK)
  R(x, '#141a4a', 0, 1040, W, 160)
  for (let i = 0; i < 24; i++) { x.fillStyle = `rgba(255,220,150,${0.25 + 0.25 * Math.sin(t * 3 + i)})`; x.fillRect((i * 97) % W, 1060 + (i % 5) * 28, 40, 4) }
  // a stone bridge across the river
  R(x, INK, 0, 1000, 420, 30); R(x, '#a89878', 0, 1004, 414, 22); for (let k = 0; k < 3; k++) { x.fillStyle = '#141a4a'; x.beginPath(); x.arc(70 + k * 140, 1100, 50, Math.PI, TAU); x.fill() }
  R(x, '#6a6070', 0, 1200, W, 720); R(x, INK, 0, 1194, W, 10)
  lamp(x, 120, 1220, 300); lamp(x, 960, 1220, 300)
}
function bakery(x, t) {
  R(x, '#f0e0c8', 0, 0, W, 1300)
  R(x, INK, 0, 230, W, 110); R(x, '#2a3a6a', 0, 236, W, 98); x.font = `italic 600 64px 'EB Garamond'`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('boulangerie', 540, 306)
  for (let s = 0; s < 3; s++) { R(x, '#a07850', 80, 520 + s * 160, 920, 16); for (let i = 0; i < 7; i++) { const cx = 150 + i * 130, cy = 490 + s * 160; if (s === 0) { R(x, INK, cx - 50, cy - 16, 100, 34); R(x, '#d9a050', cx - 46, cy - 12, 92, 26) } else croissant(x, cx, cy, 0.8) } }
  R(x, INK, 0, 1050, W, 40); R(x, '#c8a070', 0, 1056, W, 30); R(x, '#d8c8b0', 0, 1090, W, 830)
}
function croissant(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['..CCCC..', '.CDCCDC.', 'CCDCCDCC', 'C......C'], { C: '#e0a050', D: '#b87030' }, 0, 0, 10)
  x.restore()
}
function painters(x, t) {
  nightSky(x, t, { top: '#14103a', bot: '#4a3060', stars: 30 })
  // the white domed church on the hill
  x.fillStyle = '#2a2052'; x.beginPath(); x.moveTo(0, 900); x.quadraticCurveTo(540, 620, W, 900); x.lineTo(W, H); x.lineTo(0, H); x.fill()
  const cx = 540, by = 760
  R(x, INK, cx - 170, by - 150, 340, 160); R(x, '#f4f0e6', cx - 164, by - 144, 328, 148)
  for (const [dx, r] of [[0, 90], [-120, 50], [120, 50]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, by - 144, r + 5, Math.PI, TAU); x.fill(); x.fillStyle = '#f8f4ec'; x.beginPath(); x.arc(cx + dx, by - 144, r, Math.PI, TAU); x.fill() }
  for (let k = 0; k < 5; k++) { R(x, INK, cx - 130 + k * 60, by - 110, 22, 50); R(x, '#ffd98a', cx - 126 + k * 60, by - 106, 14, 42) }
  R(x, INK, cx - 30, by - 70, 60, 74); R(x, '#5a3a2a', cx - 24, by - 64, 48, 68)
  R(x, '#6a5a7a', 0, 1150, W, 770); for (let j = 0; j < 10; j++) for (let i = 0; i < 14; i++) R(x, 'rgba(0,0,0,0.12)', i * 80 + (j % 2) * 40, 1160 + j * 60, 70, 4)
  stringLights(x, t, 0, W, 960, 40)
}
function easel(x, cx, cy, k, revealK, t) {
  R(x, INK, cx - 60, cy - 10, 12, 260); R(x, INK, cx + 48, cy - 10, 12, 260); R(x, INK, cx - 6, cy - 40, 12, 280)
  R(x, INK, cx - 130, cy - 260, 260, 240); R(x, '#fff8ec', cx - 124, cy - 254, 248, 228)
  if (revealK > 0) {
    x.save(); x.globalAlpha = revealK
    drawChar(x, t, { sign: 'aries', x: cx, y: cy - 150, s: 120, mood: 'happy', seed: 1 })
    x.font = `italic 600 26px 'EB Garamond'`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('“someone having fun”', cx, cy - 46)
    x.restore()
  } else for (let k2 = 0; k2 < 6; k2++) R(x, ['#ff8fb1', '#7fd0ff', '#f2c75c'][k2 % 3], cx - 100 + k2 * 34, cy - 220 + (k2 % 2) * 60, 24, 24 * k)
}
function cafe(x, t) {
  R(x, '#3a2030', 0, 0, W, 1300)
  R(x, INK, 120, 360, 840, 600); R(x, '#14103a', 132, 372, 816, 576)
  // the street outside, people walking past
  skyline(x, t, { seed: 81, base: 940, minH: 160, maxH: 420, col: '#221a50', edge: '#30266a', x0: 132, x1: 948 })
  for (let i = 0; i < 4; i++) { const px = ((t * 70 + i * 260) % 1000) + 80; if (px > 132 && px < 948) drawChar(x, t, { color: CPL[i % 3][0], glyph: false, x: px, y: 890, s: 80, mood: 'happy', seed: 40 + i }) }
  R(x, INK, 532, 372, 16, 576); R(x, INK, 132, 650, 816, 12)
  R(x, INK, 0, 280, W, 70); for (let i = 0; i < 14; i++) R(x, i % 2 ? '#c8303a' : '#f4f0e6', i * 80, 284, 80, 62)
  table(x, 540, 1200, 420, { top: '#e8d8c0', side: '#4a2a1a' })
  R(x, '#2a1622', 0, 1300, W, 620)
}

function couple(o, cx, cy, s, i, mood = 'heart') {
  o.push({ color: CPL[i % 3][0], glyph: false, x: cx - s * 0.36, y: cy, s, mood, look: [1, 0], seed: 20 + i })
  o.push({ color: CPL[i % 3][1], glyph: false, x: cx + s * 0.36, y: cy, s, mood, look: [-1, 0], seed: 30 + i })
}
function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  if (t < S.bakery) {
    couple(o, 780, 1330, 150, 0)
    P('aries', 360, 1320, 230, 'wide', [1, 0], { seed: 1, squash: -0.12 })
  } else if (t < S.river) {
    couple(o, 760, 1320, 150, 1)
    P('aries', 320, 1320, 200, t > T.two ? 'sparkle' : 'happy', [1, 0], { seed: 1, hops: [T.two, T.two + 0.5] })
  } else if (t < S.paint) {
    const sq = t > T.squeeze
    couple(o, 190, 1330, 130, 0, 'heart'); couple(o, 880, 1330, 130, 2, sq ? 'wide' : 'heart')
    P('aries', sq ? 880 : 520, sq ? 1250 : 1340, 170, sq ? 'wink' : 'neutral', [-1, 0], { seed: 1, hops: [T.squeeze] })
    P('pisces', 520, 1450, 120, 'sparkle', [0, -1], { tears: 2, seed: 6 })
  } else if (t < S.cafe) {
    P('aries', 300, 1360, 210, t > T.reveal ? 'sparkle' : 'wink', [1, 0], { seed: 1, hops: [T.reveal, T.reveal + 0.5] })
    o.push({ color: '#e8e0f0', glyph: false, x: 900, y: 1380, s: 150, mood: t > T.reveal ? 'happy' : 'squint', look: [-1, 0], seed: 50 })
  } else if (t < S.mon) {
    P('aries', 540, 1130, 200, t > T.card ? 'happy' : 'neutral', [1, -1], { seed: 1 })
  } else {
    const tg = t > T.together
    couple(o, 160, 1340, 120, 0, 'heart'); couple(o, 920, 1340, 120, 1, 'heart')
    P('aries', tg ? 470 : 540, 1340, 200, t > T.cheer ? 'sparkle' : 'wide', [0, -1], { seed: 1, hops: [T.cheer, T.cheer + 0.5, T.cheer + 1.0, T.together, T.together + 0.5] })
    if (t > T.pis - 0.6) P('pisces', 650, 1350, 170, tg ? 'happy' : 'sparkle', [-1, -1], { tears: 3, seed: 6, pop: pop01(t, T.pis - 0.6, 0.4, 2), hops: [T.together + 0.1, T.together + 0.6] })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  return { x: 930, y: (t < S.bakery ? 600 : 470) + 10 * Math.sin(t * 1.3), s: t < S.bakery ? 160 : 100, mood: t > T.sparkle ? 'sparkle' : 'happy', look: [-1, 0.5], pop: k }
}
function front(x, t) {
  if (t < S.bakery) {
    // the baguette baton + a heart-burst in Aries' face
    x.save(); x.translate(470, 1240); x.rotate(-0.6); R(x, INK, -80, -14, 160, 28); R(x, '#d9a050', -76, -10, 152, 20); for (let k = 0; k < 4; k++) R(x, '#b87030', -50 + k * 32, -8, 14, 4); x.restore()
    for (let i = 0; i < 9; i++) { const a = i * 0.7, r = 120 + (i % 3) * 50 + 20 * Math.sin(t * 2); drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? '#ff4f86' : '#ff8fb1' }, 600 + Math.cos(a) * r, 1150 + Math.sin(a) * r * 0.8, 7 + (i % 3)) }
    // motion lines
    x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.lineWidth = 5; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(120 - i * 10, 1240 + i * 40); x.lineTo(220, 1240 + i * 40); x.stroke() } x.restore()
  }
  if (inR(t, S.bakery, S.river)) {
    croissant(x, 760, 1180, 1.1); hearts(x, t, 760, 1120, S.bakery + 0.5, { n: 5, cell: 6 })
    if (t > T.two) { croissant(x, 420, 1190, 1.0 * pop01(t, T.two)); croissant(x, 420, 1140, 1.0 * pop01(t, T.two + 0.25)) }
  }
  if (inR(t, S.river, S.paint)) {
    for (const bx of [190, 880]) { R(x, INK, bx - 150, 1380, 300, 20); R(x, '#5a8a5a', bx - 144, 1384, 288, 12); R(x, INK, bx - 130, 1400, 14, 60); R(x, INK, bx + 116, 1400, 14, 60) }
    hearts(x, t, 190, 1240, S.river + 0.5, { n: 4, cell: 6 })
  }
  if (inR(t, S.paint, S.cafe)) easel(x, 650, 1340, clamp(prog(t, S.paint + 1, T.reveal)), prog(t, T.reveal, T.reveal + 0.5), t)
  if (inR(t, S.cafe, S.mon)) {
    R(x, INK, 680, 1170, 60, 50); R(x, '#f4f0e6', 684, 1174, 52, 42); R(x, '#5a2a1a', 688, 1178, 44, 10)
    if (t > T.card) { const k = pop01(t, T.card, 0.3); x.save(); x.translate(400, 1170); x.rotate(-0.1); x.scale(k, k); R(x, INK, -80, -54, 160, 108); R(x, '#fff8ec', -76, -50, 152, 100); x.font = `italic 600 22px 'EB Garamond'`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('dear future me,', 0, -14); x.fillText('we did Paris.', 0, 16); x.restore() }
  }
  if (t > S.mon) { sparkles(x, t, 780, 700, T.sparkle, 16, 300, 1, ['#ffffff', GOLD, PINK]); if (t > T.together) hearts(x, t, 560, 1180, T.together, { n: 6, cell: 7 }) }
}
function drawRiverHook(x, t) { riverScene(x, t, 0) }
function drawMon(x, t) { riverScene(x, t, t > T.sparkle ? 0.6 + 0.4 * Math.sin(t * 30) : 0) }
function over(x, t) {
  speech(x, t, 540, 1080, T.cheer, 'GO TOWER!!', { size: 44, life: 2.2, col: '#fff3c8', shake: 3 })
  speech(x, t, 560, 1060, T.together + 0.2, 'GO TOWER!!', { size: 48, life: 3.6, col: '#ffe0f0', shake: 3 })
}

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce06', city: 'Paris', duration: 60, ending: 'cut', castScale: 1.05,
  hook: { text: 'Solo in Paris. | Surrounded by *couples.*', out: [3.0, 3.25] },
  freeze: [REC],
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '6:30', draw: drawRiverHook },
    { at: S.bakery, n: 1, name: 'THE BAKERY · 7:00', time: '7:00', draw: bakery },
    { at: S.river, n: 2, name: 'THE RIVER · 8:15', time: '8:15', draw: drawRiverHook },
    { at: S.paint, n: 3, name: 'THE PAINTERS · 9:00', time: '9:00', draw: painters },
    { at: S.cafe, n: 4, name: 'THE CAFÉ · 10:00', time: '10:00', draw: cafe },
    { at: S.mon, n: 5, name: '11 P.M. · THE TOWER', time: '11:00', draw: drawMon },
  ],
  cast, stars, front, over,
  tissues: [S.river + 2.4, S.river + 5.0, T.pis, T.pis + 0.9, T.together + 0.3, T.together + 1.6],
  tissuesAt: S.river,
  heads: [
    { text: 'Wait for | *11 p.m.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 430 },
    { text: 'Table for one. | *Best seat* in Paris.', at: S.last, lateAt: S.last + 0.42, top: 380, size: 88, accentSize: 130, accentColor: PINK },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'you took yourself to *Paris.* iconic.' }] },
    { open: 8.4, close: 16.7, lines: [
      { t: 8.6, who: 'aries', text: 'one croissant, please. …make it *two.*' },
      { t: 11.2, who: 'stars', text: 'that couple is sharing *one.*' },
      { t: 13.6, who: 'aries', text: 'and I have *two.* self-care.' },
    ] },
    { open: 17.4, close: 25.7, lines: [
      { t: 17.6, who: 'aries', text: 'couples on *every* bench.' },
      { t: 19.8, who: 'aries', text: '…mind if I *squeeze in?*' },
      { t: 22.4, who: 'stars', text: 'you’re allowed to take *yourself* out.' },
    ] },
    { open: 26.4, close: 34.7, lines: [
      { t: 26.6, who: 'stars', text: 'a painter wants to paint *you.*' },
      { t: 29.0, who: 'aries', text: 'make me look *heroic.*' },
      { t: 31.8, who: 'stars', text: 'they painted *“someone having fun.”*' },
    ] },
    { open: 35.4, close: 43.7, lines: [
      { t: 35.6, who: 'aries', text: 'table for *one,* by the window.' },
      { t: 38.2, who: 'aries', text: 'dear future me: *we did Paris.*' },
      { t: 40.8, who: 'stars', text: 'people-watching: an *elite* solo sport.' },
    ] },
    { open: 44.4, close: 57.9, lines: [
      { t: 44.6, who: 'stars', text: '11 p.m. on the dot: *the sparkle.*' },
      { t: 49.8, who: 'pisces', text: 'you’re solo too? I’m *crying*' },
      { t: 52.4, who: 'aries', text: 'then cheer with me! *GO TOWER!*' },
      { t: 55.2, who: 'stars', text: 'solo, but *never* lonely.' },
    ] },
  ],
  fx: [[screenShake, { at: T.sparkle, len: 0.4, amp: 12 }, shakeCues]],
  music: { style: 'dreamy', key: 'Bb', seed: 4006, drop: S.bakery, breakdown: [S.cafe], lift: [S.mon], hits: [T.sparkle, S.last + 0.42] },
  cues: [['whoosh', 0.02, 0.6, 0.05], ['pop', T.two, 880, 0.035, 0], ['pop', T.squeeze, 659.25, 0.035, 0], ['glitter', T.reveal, T.reveal + 0.6], ['pop', T.card, 1046.5, 0.03, 0], ['glitter', T.sparkle, T.sparkle + 1.2], ['bell', T.sparkle, 1567.98, 0.04, 1.6, 0], ['glitter', T.together, T.together + 0.8]],
})
