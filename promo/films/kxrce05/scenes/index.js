// kxrce05 · Remix Cities: Extended · "Tokyo: First Date vs the Last Train" (60 s vertical, synthwave · F#). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♊ Gemini + ♎ Libra mid-leap off a station stair, a giant LAST TRAIN countdown slamming in, neon.
//         Slam "First date. Last train. | *One hour.*" The countdown runs the whole film.
//   3.4   THE STARS: "will they make the last train?" · promise "Stay to | *the platform.*"
//   8.0   1 THE BIG CROSSING      they lose each other in the scramble; Libra finds Gemini by the talking
//  17.0   2 RAMEN COUNTER (0:41 left)  so much talking the noodles go cold
//  26.0   3 THE KARAOKE BOX (0:22)     ♌ Leo + ♒ Aquarius pull them in; Libra sings off-key; Gemini is smitten;
//                                      ♓ Pisces sobs at the song
//  35.0   4 THE CORNER SHOP (0:09)     egg sandwiches
//  43.0   5 THE PLATFORM          they sprint; 49.5 the doors shut; the train slides off with ♓ Pisces (a stranger now)
//                                 crying at them through the window; they laugh; "…walk you home?"
//  58.2   last line "Missed the last train. | *Caught a feeling.*" → cut at 60.
// Real touches: the huge scramble crossing, ramen counters, karaoke rooms, corner shops open all night, last trains
// around midnight. No real brands (signs say RAMEN, KARAOKE, OPEN 24H).
import {
  cityFilm, nightSky, skyline, street, lamp, stringLights, signBoard, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawChar, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, cross: 8.0, ramen: 17.0, kara: 26.0, shop: 35.0, plat: 43.0, last: 58.2 }
const T = { lost: 9.5, found: 13.0, cold: 22.0, sing: 28.6, smit: 31.0, sand: 37.5, sprint: 44.0, shut: 49.5, leave: [50.0, 52.6], laugh: 52.8, home: 54.6 }
const LEFT = t => walk(t, [[0, 3600, 0], [S.ramen, 41 * 60, 0], [S.kara, 22 * 60, 0], [S.shop, 9 * 60, 0], [T.shut, 0, 0]])[0]
const NEON = ['#ff4f86', '#7fd0ff', '#b07aff', '#7dffb0', '#f2c75c']

function neonStreet(x, t, seed = 1) {
  nightSky(x, t, { top: '#0a0620', bot: '#2a1048', stars: 0 })
  skyline(x, t, { seed: 100 + seed, base: 1180, minH: 360, maxH: 820, col: '#1a1236', edge: '#2a1a50', dens: 0.55, win: '#c8b0ff' })
  const r = rng(seed)
  for (let i = 0; i < 9; i++) {
    const nx = r() * 980 + 20, ny = 420 + r() * 600, nw = 40 + r() * 50, nh = 120 + r() * 160, c = NEON[i % 5], on = Math.sin(t * (2 + r() * 3) + i) > -0.8
    R(x, INK, nx - 4, ny - 4, nw + 8, nh + 8); R(x, on ? c : mixHex(c, '#000000', 0.6), nx, ny, nw, nh)
    if (on) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25; R(x, c, nx - 20, ny - 20, nw + 40, nh + 40); x.restore() }
    for (let k = 0; k < 3; k++) R(x, 'rgba(10,6,30,0.6)', nx + 8, ny + 16 + k * nh / 3, nw - 16, 10)
  }
}
function crossing(x, t) {
  neonStreet(x, t, 3)
  R(x, '#1e1830', 0, 1180, W, 740)
  for (let i = 0; i < 9; i++) { x.save(); x.translate(540, 1500); x.rotate(-0.5); R(x, '#d8d0e8', -500 + i * 120, -260, 60, 520); x.restore() }
}
function crowd(x, t, n = 26, dens = 1) {
  const r = rng(77)
  for (let i = 0; i < n * dens; i++) {
    const dir = r() < 0.5 ? 1 : -1, sp = 80 + r() * 80, py = 1240 + r() * 360, px = ((r() * 1400 + t * sp * dir) % 1400 + 1400) % 1400 - 160
    x.save(); x.globalAlpha = 0.95
    R(x, INK, px - 34, py - 70, 68, 70); R(x, ['#5a5a7a', '#6a5a8a', '#4a6a8a', '#7a6a7a'][i % 4], px - 30, py - 66, 60, 62)
    R(x, ['#e8d0c0', '#c8a890', '#f0d8c8'][i % 3], px - 22, py - 100, 44, 36); R(x, INK, px - 22, py - 100, 44, 8)
    x.restore()
  }
}
function ramenBar(x, t) {
  R(x, '#3a2418', 0, 0, W, 1300); for (let i = 0; i < 14; i++) R(x, 'rgba(0,0,0,0.12)', i * 80, 0, 6, 1300)
  // noren curtain
  for (let i = 0; i < 5; i++) { R(x, INK, 140 + i * 162, 300, 150, 230); R(x, '#2a3a6a', 146 + i * 162, 300, 138, 224) }
  signBoard(x, 540, 400, 'RAMEN', { size: 70, col: '#fff3c8', bg: '#2a3a6a', glow: false })
  for (let i = 0; i < 4; i++) { const lx = 200 + i * 230; R(x, INK, lx - 40, 590, 80, 90); R(x, '#e0453a', lx - 34, 596, 68, 78) }
  R(x, INK, 0, 1060, W, 70); R(x, '#a07040', 0, 1066, W, 58)
  R(x, '#24160e', 0, 1130, W, 790)
  for (let i = 0; i < 6; i++) { R(x, INK, 90 + i * 170, 1130, 30, 300); R(x, '#5a3a2a', 60 + i * 170, 1260, 90, 30) }
}
function bowl(x, cx, cy, steam, t) {
  R(x, INK, cx - 70, cy - 10, 140, 70); R(x, '#f4f0e6', cx - 64, cy - 4, 128, 58); R(x, '#d86a3a', cx - 64, cy - 4, 128, 14)
  R(x, '#f2e090', cx - 40, cy - 14, 30, 14); R(x, '#5fbf6a', cx + 6, cy - 14, 24, 10); R(x, '#ffffff', cx + 30, cy - 14, 22, 12)
  if (steam > 0) { x.save(); x.globalAlpha = 0.6 * steam; for (let k = 0; k < 3; k++) R(x, '#ffffff', cx - 24 + k * 22 + 6 * Math.sin(t * 3 + k), cy - 40 - ((t * 50 + k * 20) % 70), 8, 22); x.restore() }
}
function karaokeBox(x, t) {
  R(x, '#1a0e30', 0, 0, W, H)
  for (let k = 0; k < 7; k++) { const a = t * 1.2 + k; x.save(); x.globalAlpha = 0.16; x.fillStyle = NEON[k % 5]; x.beginPath(); x.moveTo(540, 0); x.lineTo(540 + Math.cos(a) * 900 - 80, 1400); x.lineTo(540 + Math.cos(a) * 900 + 80, 1400); x.fill(); x.restore() }
  R(x, INK, 140, 340, 800, 470); R(x, '#120a2a', 152, 352, 776, 446)
  x.font = `800 46px ${INTER}`; x.textAlign = 'center'
  const lines = ['♪ moonlight on the train line ♪', '♪ you and me and the neon ♪']
  lines.forEach((l, i) => { x.fillStyle = BONE; x.fillText(l, 540, 520 + i * 90); const p = clamp(((t * 0.4) % 1) * 1.2 - i * 0.5); x.save(); x.beginPath(); x.rect(152, 470 + i * 90, 776 * p, 70); x.clip(); x.fillStyle = PINK; x.fillText(l, 540, 520 + i * 90); x.restore() })
  R(x, '#2a1a40', 0, 1260, W, 660); R(x, INK, 60, 1180, 960, 90); R(x, '#6a3a8a', 66, 1186, 948, 78)
}
function cornerShop(x, t) {
  R(x, '#e8f0f4', 0, 0, W, 1300)
  for (let s = 0; s < 4; s++) { R(x, '#b8c8d0', 60, 380 + s * 170, 960, 14); for (let i = 0; i < 12; i++) R(x, NEON[(i + s) % 5], 80 + i * 78, 320 + s * 170, 56, 58) }
  R(x, INK, 0, 230, W, 80); R(x, '#4aa070', 0, 236, W, 68); x.font = `800 44px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.fillText('OPEN 24H', 540, 286)
  R(x, '#c8d0d8', 0, 1060, W, 860); R(x, INK, 0, 1054, W, 8)
}
function eggSand(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-64, 40); x.lineTo(64, 40); x.lineTo(0, -60); x.fill()
  x.fillStyle = '#f8f0dc'; x.beginPath(); x.moveTo(-56, 34); x.lineTo(56, 34); x.lineTo(0, -50); x.fill()
  R(x, '#f2d050', -40, 14, 80, 14)
  x.restore()
}
function platform(x, t) {
  nightSky(x, t, { top: '#0a0624', bot: '#24164a', stars: 20 })
  R(x, '#2a2048', 0, 300, W, 120); for (let i = 0; i < 6; i++) R(x, '#ffe7a0', 60 + i * 180, 340, 100, 30)
  R(x, INK, 0, 1300, W, 20); R(x, '#f2c75c', 0, 1290, W, 14)
  R(x, '#3a3458', 0, 1320, W, 600)
}
function train(x, t, dx = 0, doors = 0) {
  x.save(); x.translate(dx, 0)
  R(x, INK, -60, 720, 1200, 560); R(x, '#d8dce8', -54, 726, 1188, 548); R(x, '#5fbf8a', -54, 1060, 1188, 30)
  for (let i = 0; i < 5; i++) { R(x, INK, 30 + i * 220, 800, 150, 170); R(x, '#ffe7a0', 36 + i * 220, 806, 138, 158) }
  const dw = lerp(24, 104, doors)
  R(x, INK, 470, 780, 220, 480); R(x, '#a8b0c0', 476, 786, dw, 468); R(x, '#a8b0c0', 684 - dw, 786, dw, 468)
  x.restore()
}

function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  if (t < S.cross) {
    P('gemini', 380, 1150 - 120 * Math.sin(Math.min(1, t / 2) * Math.PI) * 0, 220, 'sparkle', [1, -1], { seed: 4, squash: -0.12 })
    P('libra', 650, 1210, 210, 'happy', [-1, -1], { seed: 7, squash: -0.1 })
  } else if (t < S.ramen) {
    const lost = t > T.lost && t < T.found
    P('gemini', lost ? 220 : 420, 1330, 170, lost ? 'wide' : 'happy', [1, 0], { seed: 4 })
    P('libra', lost ? 860 : 620, 1330, 170, lost ? 'squint' : t > T.found ? 'heart' : 'happy', [-1, 0], { seed: 7, hops: [T.found, T.found + 0.4] })
  } else if (t < S.kara) {
    P('gemini', 380, 1000, 190, t > T.cold ? 'happy' : 'sparkle', [1, 0], { seed: 4, hops: [17.8, 19.2, 20.6, 23.2, 24.4] })
    P('libra', 680, 1000, 190, t > T.cold + 0.6 ? 'wide' : 'heart', [-1, 0], { seed: 7, hops: [18.4, 21.4, 24.0] })
  } else if (t < S.shop) {
    P('libra', 540, 1130, 220, t > T.sing ? 'squint' : 'happy', [0, -1], { seed: 7, hops: [T.sing, T.sing + 0.6, T.sing + 1.2, T.sing + 1.8, T.sing + 2.4] })
    P('gemini', 230, 1180, 180, t > T.smit ? 'heart' : 'happy', [1, 0], { seed: 4 })
    P('leo', 820, 1180, 160, 'sparkle', [-1, 0], { seed: 8 })
    P('aquarius', 960, 1200, 130, 'wink', [-1, 0], { seed: 3 })
    P('pisces', 110, 1210, 120, 'sparkle', [1, 0], { tears: 3, seed: 6 })
  } else if (t < S.plat) {
    P('gemini', 380, 1240, 190, 'happy', [1, 0], { seed: 4 })
    P('libra', 680, 1240, 190, t > T.sand ? 'heart' : 'happy', [-1, 0], { seed: 7 })
  } else {
    const [gx] = walk(t, [[S.plat, -80, 0], [T.shut - 0.4, 480, 0]])
    const runK = t < T.shut ? 1 : 0
    P('gemini', gx, 1240, 180, t < T.shut ? 'wide' : t > T.laugh ? 'happy' : 'squint', [1, 0], { seed: 4, hops: runK ? [44.2, 44.7, 45.2, 45.7, 46.2, 46.7, 47.2, 47.7, 48.2, 48.7] : [T.laugh, T.laugh + 0.4] })
    P('libra', gx - 170, 1250, 180, t < T.shut ? 'wide' : t > T.laugh ? 'happy' : 'squint', [1, 0], { seed: 7, hops: runK ? [44.45, 44.95, 45.45, 45.95, 46.45, 46.95, 47.45, 47.95, 48.45] : [T.laugh + 0.2, T.home + 0.3] })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  return { x: 930, y: (t < S.cross ? 640 : 470) + 10 * Math.sin(t * 1.3), s: t < S.cross ? 160 : 100, mood: t > T.laugh ? 'heart' : t > T.shut - 1 && t < T.laugh ? 'wide' : 'happy', look: [-1, 0.5], pop: k }
}
function front(x, t) {
  if (inR(t, S.cross, S.ramen)) crowd(x, t, 22, t > T.lost && t < T.found ? 1.3 : 0.7)
  if (inR(t, S.ramen, S.kara)) { bowl(x, 380, 1110, t < T.cold ? 1 : 0, t); bowl(x, 680, 1110, t < T.cold ? 1 : 0, t); if (t > T.cold) speech(x, t, 540, 860, T.cold, '(the noodles: cold)', { size: 32, life: 2.6, col: '#d8f0ff' }) }
  if (inR(t, S.kara, S.shop)) { R(x, INK, 560, 1040, 16, 80); R(x, '#5a5a6a', 552, 1020, 32, 40); if (t > T.smit) hearts(x, t, 230, 1060, T.smit, { n: 6, cell: 7 }) }
  if (inR(t, S.shop, S.plat)) { const k = pop01(t, T.sand, 0.35, 2.2); eggSand(x, 470, 1170, k, -0.2); eggSand(x, 590, 1170, k, 0.2); if (t > T.sand + 0.6) hearts(x, t, 680, 1080, T.sand + 0.6, { n: 4, cell: 6 }) }
  if (t > T.laugh) hearts(x, t, 420, 1100, T.laugh + 0.2, { n: 5, cell: 6 })
}
function castOverTrain(x, t) {
  if (t < S.plat) return
  // the train: doors close, it slides away; Pisces (a stranger) at a window, sobbing at the two of them
  const dx = -W * 1.6 * ease.inCubic(prog(t, ...T.leave))
  if (dx < -W * 1.6 + 10) return
  train(x, t, dx, clamp(prog(t, T.shut - 0.5, T.shut)))
  drawChar(x, t, { sign: 'pisces', x: 765 + dx, y: 900, s: 120, mood: t > T.shut ? 'sparkle' : 'wide', look: [0, 1], tears: t > T.shut ? 3 : 2, seed: 6 })
}
function over(x, t) {
  // the LAST TRAIN countdown (whole film)
  const left = Math.max(0, LEFT(t)), mm = Math.floor(left / 60), ss = Math.floor(left % 60)
  const urgent = left < 10 * 60, k = pop01(t, -1, 0.3), kick = bump(t, S.shop, 0.4) + bump(t, S.plat, 0.4)
  x.save(); x.translate(t < S.cross ? 540 : 700, t < S.cross ? 1520 : 420); x.scale(k * (1 + 0.1 * kick), k * (1 + 0.1 * kick)); x.rotate(-0.02)
  R(x, INK, -300, -62, 600, 124); R(x, urgent && Math.sin(t * 10) > 0 ? '#5a0a1a' : '#12082a', -294, -56, 588, 112); R(x, urgent ? '#ff3b3b' : '#7fd0ff', -294, 48, 588, 8)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = urgent ? '#ffb0b0' : '#bfe6ff'; x.fillText('LAST TRAIN IN', 0, -28)
  x.font = `700 56px ${MONO}`; x.fillStyle = urgent ? '#ff6a6a' : BONE; x.fillText(left <= 0 ? 'MISSED IT' : `00:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 0, 16)
  x.restore()
  speech(x, t, 760, 1000, T.lost + 0.3, 'GEMINI??', { size: 36, life: 2.2, col: BONE })
  speech(x, t, 300, 1050, T.home, '…walk you home?', { size: 38, life: 3.4, col: '#fff3c8', tail: -1 })
}

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce05', city: 'Tokyo', duration: 60, ending: 'cut', castScale: 1.05,
  hook: { text: 'First date. Last train. | *One hour.*', out: [3.0, 3.25] },
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '11:00', draw: (x, t) => neonStreet(x, t, 1) },
    { at: S.cross, n: 1, name: 'THE CROSSING · 11:05', time: '11:05', draw: crossing },
    { at: S.ramen, n: 2, name: 'RAMEN · 11:19', time: '11:19', draw: ramenBar },
    { at: S.kara, n: 3, name: 'KARAOKE · 11:38', time: '11:38', draw: karaokeBox },
    { at: S.shop, n: 4, name: 'CORNER SHOP · 11:51', time: '11:51', draw: cornerShop },
    { at: S.plat, n: 5, name: 'THE PLATFORM · 11:58', time: '11:58', draw: platform },
  ],
  cast, stars, front, over,
  back: castOverTrain,
  tissues: [S.kara + 2.0, T.sing + 0.4, T.sing + 1.4, T.sing + 2.6, T.leave[0] + 0.3, T.leave[0] + 1.0, T.laugh + 0.5],
  tissuesAt: S.kara,
  heads: [
    { text: 'Stay to | *the platform.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 560 },
    { text: 'Missed the last train. | *Caught a feeling.*', at: S.last, lateAt: S.last + 0.42, top: 520, size: 80, accentSize: 120, accentColor: '#b07aff' },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'will they make the *last train?*' }] },
    { open: 8.4, close: 16.7, lines: [
      { t: 8.6, who: 'gemini', text: 'and THEN my cousin said— *wait. hi??*' },
      { t: 11.0, who: 'libra', text: 'I’ll just follow the *talking.*' },
      { t: 13.4, who: 'gemini', text: '…and THEN— oh! *there you are.*' },
    ] },
    { open: 17.4, close: 25.7, lines: [
      { t: 17.6, who: 'libra', text: 'wait, you like *that* too?' },
      { t: 20.0, who: 'gemini', text: 'okay, top three *moons.* go.' },
      { t: 23.2, who: 'stars', text: 'forty-one minutes left, *babes.*' },
    ] },
    { open: 26.4, close: 34.7, lines: [
      { t: 26.6, who: 'leo', text: 'ONE song. *you two.* come on!' },
      { t: 29.2, who: 'pisces', text: 'that was SO off-key I’m *crying*' },
      { t: 31.6, who: 'gemini', text: 'that was the *best* song ever.' },
    ] },
    { open: 35.4, close: 42.7, lines: [
      { t: 35.6, who: 'libra', text: 'egg sandwich or… egg *sandwich?*' },
      { t: 38.2, who: 'stars', text: 'nine minutes. *nine.*' },
      { t: 40.4, who: 'gemini', text: 'RUN!' },
    ] },
    { open: 43.4, close: 57.9, lines: [
      { t: 43.6, who: 'stars', text: 'the doors… are… *closing!*' },
      { t: 50.4, who: 'pisces', text: 'you two are SO cute I’m *sobbing*' },
      { t: 52.9, who: 'libra', text: 'we… missed it. *(laughing)*' },
      { t: 55.4, who: 'gemini', text: 'best *missed train* ever.' },
    ] },
  ],
  fx: [[screenShake, { at: T.shut, len: 0.4, amp: 18 }, shakeCues]],
  music: { style: 'synthwave', key: 'F#', seed: 4005, drop: S.cross, breakdown: [S.ramen], lift: [S.plat], hits: [T.shut, S.last + 0.42] },
  cues: [
    ['whoosh', 0.02, 0.6, 0.05], ['pop', T.found, 1318.51, 0.035, 0], ['pluck', T.cold, 440, 0.03, 0.4, 0], ['pop', T.sand, 880, 0.035, 0],
    ...[44, 45, 46, 47, 48, 49].map(s => ['tick', s, 0.045]), ['tom', T.shut, 0.05], ['whoosh', T.leave[0], 2.0, 0.05], ['glitter', T.laugh, T.laugh + 0.6],
  ],
})
