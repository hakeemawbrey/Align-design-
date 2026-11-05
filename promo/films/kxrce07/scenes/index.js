// kxrce07 · Remix Cities: Extended · "London: Are You Two Together?" (60 s vertical, house · G). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♌ Leo + ♒ Aquarius mid-jump onto the back of a red double-decker, friends' faces at the window, a giant
//         "SO ARE YOU TWO…?" bubble mid-slam. Slam "Three months of | *“just hanging out.”*"
//   3.4   THE STARS: "one night in London. one question." · promise "Stay for | *the night bus.*" · TIMES ASKED counter
//   8.0   1 TOP DECK (7:30)       ♊ Gemini: "so are you two together?" "we're just… hanging out." ASKED 1
//  17.0   2 BRICK LANE (8:45)     the server: "table for a couple?" "…two friends?" ASKED 2
//  26.0   3 THE RIVER (10:00)     by the clock tower Leo almost asks; the bells drown it out; overthinking bar
//  35.0   4 NIGHT BUS (12:15)     ♓ Pisces on the top deck, crying at the lights: "are you two together?" ASKED 3;
//                                 Aquarius: "honestly? not sure. want to be?"
//  46.0   5 THE ANSWER (12:40)    "…yes." "me too."; the counter flips to "ASKED EACH OTHER: 1"
//  58.2   last line "The answer was | *one question* away." → cut at 60.
// Real touches: red double-decker buses, the curry houses of Brick Lane, the river and the clock tower, the night bus.
import {
  cityFilm, nightSky, skyline, street, lamp, rain, stringLights, signBoard, table, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawChar, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { loadingBar, loadingBarCues, screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, deck: 8.0, lane: 17.0, river: 26.0, bus: 35.0, ans: 46.0, last: 58.2 }
const T = { ask: [9.0, 19.0, 37.8], almost: 28.4, bells: 29.0, yes: 46.6, metoo: 49.0, flip: 50.2 }
const BUSRED = '#d8302a'

function doubleDecker(x, t, cx, cy, s = 1, faces = true) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -330, -420, 660, 460); R(x, BUSRED, -324, -414, 648, 448)
  for (const row of [-380, -190]) for (let i = 0; i < 5; i++) { R(x, INK, -300 + i * 124, row, 104, 110); R(x, '#ffe7a0', -294 + i * 124, row + 6, 92, 98) }
  R(x, '#a82018', -324, -60, 648, 14); R(x, INK, -330, 40, 660, 10)
  for (const wx of [-220, 220]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 46, 52, 0, TAU); x.fill(); x.fillStyle = '#3a3a4a'; x.beginPath(); x.arc(wx, 46, 30, 0, TAU); x.fill() }
  R(x, INK, -100, -48, 200, 40); R(x, '#14102a', -96, -44, 192, 32); x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('NIGHT BUS', 0, -20)
  x.restore()
  if (faces) for (let i = 0; i < 3; i++) drawChar(x, t, { color: ['#ffd0a0', '#a0e0ff', '#d0ffa0'][i], glyph: false, x: cx + (-170 + i * 124) * s, y: cy - 300 * s, s: 70 * s, mood: 'wide', seed: 30 + i })
}
function clockTower(x, t, cx, base, h) {
  R(x, INK, cx - 50, base - h, 100, h); R(x, '#c8a870', cx - 44, base - h + 6, 88, h - 6)
  for (let k = 0; k < 10; k++) R(x, '#a88850', cx - 44, base - h + 260 + k * 50, 88, 4)
  R(x, INK, cx - 62, base - h + 80, 124, 140); R(x, '#c8a870', cx - 56, base - h + 86, 112, 128)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, base - h + 150, 46, 0, TAU); x.fill(); x.fillStyle = '#fff3c8'; x.beginPath(); x.arc(cx, base - h + 150, 40, 0, TAU); x.fill()
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(cx, base - h + 150); x.lineTo(cx, base - h + 118); x.moveTo(cx, base - h + 150); x.lineTo(cx + 20, base - h + 150); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 56, base - h + 6); x.lineTo(cx, base - h - 120); x.lineTo(cx + 56, base - h + 6); x.fill()
  x.fillStyle = '#5a6a5a'; x.beginPath(); x.moveTo(cx - 48, base - h + 2); x.lineTo(cx, base - h - 108); x.lineTo(cx + 48, base - h + 2); x.fill()
}
function streetHook(x, t) {
  nightSky(x, t, { top: '#0e1036', bot: '#2a2a5a', stars: 10 })
  skyline(x, t, { seed: 71, base: 1100, minH: 200, maxH: 500, col: '#1e1a48', edge: '#2c2662' })
  street(x, 1260, { wet: true, t })
  doubleDecker(x, t, 560, 1300, 1.0)
  rain(x, t, { n: 70, alpha: 0.35, seed: 3 })
}
function topDeck(x, t) {
  R(x, '#2a1a30', 0, 0, W, H)
  // windows with the city sliding past
  R(x, INK, 40, 300, 1000, 520); R(x, '#14103a', 52, 312, 976, 496)
  x.save(); x.beginPath(); x.rect(52, 312, 976, 496); x.clip(); x.translate(-((t * 120) % 600), 0)
  for (let k = 0; k < 3; k++) { skyline(x, t, { seed: 90 + k, base: 808, minH: 120, maxH: 380, col: '#221a50', edge: '#30266a', x0: k * 600, x1: k * 600 + 640 }) }
  x.restore()
  for (let i = 1; i < 4; i++) R(x, INK, 40 + i * 250, 300, 12, 520)
  R(x, '#8a2a3a', 0, 820, W, 30)
  for (let i = 0; i < 4; i++) { R(x, INK, 40 + i * 260, 1060, 220, 200); R(x, '#4a5aa8', 46 + i * 260, 1066, 208, 188); R(x, '#3a4a98', 46 + i * 260, 1066, 208, 40) }
  R(x, '#2a2448', 0, 1260, W, 660)
}
function brickLane(x, t) {
  nightSky(x, t, { top: '#10123a', bot: '#2a2456', stars: 0 })
  R(x, '#6a3a2a', 0, 260, W, 1000)
  for (let j = 0; j < 26; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 3 ? '#7a4430' : '#844a36', i * 96 + (j % 2) * 48 - 48, 260 + j * 38, 90, 32)
  // painted wall art: a big colourful star
  drawPixelStar(x, 220, 520, 180, 3, '#7fd0ff'); drawPixelStar(x, 860, 460, 120, 2, '#ff8fb1')
  stringLights(x, t, 0, W, 300, 50)
  R(x, INK, 300, 640, 480, 460); R(x, '#ffd98a', 312, 652, 456, 436)
  signBoard(x, 540, 610, 'CURRY HOUSE', { size: 42, col: '#fff3c8', bg: '#6a1a2a' })
  table(x, 540, 1250, 640, { top: '#f4e6c8', side: '#6a3a2a', cloth: '#f4f0e6' })
  R(x, '#3a2a3a', 0, 1300, W, 620)
}
function riverWalk(x, t) {
  nightSky(x, t, { top: '#0a0c30', bot: '#2a2a5e', stars: 30, moon: { x: 200, y: 400, r: 44 } })
  skyline(x, t, { seed: 31, base: 1020, minH: 120, maxH: 300, col: '#1e1a48', edge: '#2c2662' })
  // the long parliament-ish facade + the clock tower
  R(x, '#2c2456', 360, 860, 720, 160); for (let i = 0; i < 18; i++) R(x, '#3a3070', 370 + i * 40, 820, 16, 60)
  clockTower(x, t, 860, 1020, 640)
  R(x, '#121a48', 0, 1020, W, 200)
  for (let i = 0; i < 24; i++) { x.fillStyle = `rgba(255,220,150,${0.2 + 0.2 * Math.sin(t * 3 + i)})`; x.fillRect((i * 83) % W, 1040 + (i % 5) * 34, 36, 4) }
  R(x, '#5a5a6a', 0, 1220, W, 700); R(x, INK, 0, 1214, W, 10); for (let i = 0; i < 14; i++) R(x, INK, i * 80, 1150, 8, 70); R(x, INK, 0, 1146, W, 8)
  lamp(x, 120, 1240, 300)
}
function nightBus(x, t) { topDeck(x, t) }
function answer(x, t) {
  // the front window of the top deck: the road ahead, lights rushing toward us
  R(x, '#2a1a30', 0, 0, W, H)
  R(x, INK, 40, 260, 1000, 640); R(x, '#14103a', 52, 272, 976, 616)
  x.save(); x.beginPath(); x.rect(52, 272, 976, 616); x.clip()
  skyline(x, t, { seed: 55, base: 760, minH: 140, maxH: 420, col: '#221a50', edge: '#30266a', x0: 52, x1: 1028 })
  R(x, '#1a1430', 52, 760, 976, 128)
  for (let i = 0; i < 6; i++) { const p = ((t * 0.6 + i / 6) % 1); R(x, '#f2c75c', 540 - 8 - p * 30, 770 + p * 110, 16 + p * 20, 8 + p * 14) }
  x.restore()
  R(x, '#8a2a3a', 0, 900, W, 30)
  R(x, INK, 40, 1100, 1000, 180); R(x, '#4a5aa8', 46, 1106, 988, 168)
  R(x, '#2a2448', 0, 1280, W, 640)
}

function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  if (t < S.deck) {
    P('leo', 760, 1150, 190, 'wide', [-1, -1], { seed: 8, squash: -0.12 })
    P('aquarius', 930, 1200, 180, 'wide', [-1, -1], { seed: 3, squash: -0.1 })
  } else if (t < S.lane) {
    P('gemini', 180, 1040, 170, 'wink', [1, 0], { seed: 4, hops: [T.ask[0]] })
    P('leo', 560, 1040, 170, t > T.ask[0] ? 'wide' : 'happy', [1, 0], { seed: 8 })
    P('aquarius', 820, 1040, 170, t > T.ask[0] + 2.5 ? 'squint' : 'happy', [-1, 0], { seed: 3 })
  } else if (t < S.river) {
    P('leo', 330, 1180, 180, t > T.ask[1] + 2 ? 'squint' : 'happy', [1, 0], { seed: 8 })
    P('aquarius', 750, 1180, 180, t > T.ask[1] ? 'wide' : 'happy', [-1, 0], { seed: 3 })
    o.push({ color: '#e8e0d0', glyph: false, x: 540, y: 960, s: 120, mood: 'happy', look: [0, 0], seed: 50 })
  } else if (t < S.bus) {
    P('leo', 330, 1300, 200, t > T.bells ? 'squint' : t > T.almost ? 'wide' : 'neutral', [1, 0], { seed: 8, hops: [T.almost] })
    P('aquarius', 620, 1310, 190, 'neutral', [0, -1], { seed: 3 })
  } else if (t < S.ans) {
    P('pisces', 180, 1040, 170, 'sparkle', [1, -0.5], { tears: 3, seed: 6, hops: [T.ask[2]] })
    P('leo', 560, 1040, 170, t > T.ask[2] ? 'wide' : 'happy', [1, 0], { seed: 8 })
    P('aquarius', 820, 1040, 170, t > 40.6 ? 'neutral' : 'happy', [-1, 0], { seed: 3 })
  } else {
    P('leo', 400, 1080, 200, t > T.yes ? 'heart' : 'neutral', [1, 0], { seed: 8, hops: [T.yes, T.flip] })
    P('aquarius', 700, 1080, 200, t > T.metoo ? 'heart' : 'wide', [-1, 0], { seed: 3, hops: [T.metoo, T.flip + 0.1] })
    P('pisces', 960, 1120, 130, 'sparkle', [-1, 0], { tears: 3, seed: 6, hops: [T.flip + 0.2] })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  return { x: 930, y: (t < S.deck ? 620 : 470) + 10 * Math.sin(t * 1.3), s: t < S.deck ? 160 : 100, mood: t > T.flip ? 'sparkle' : t > T.bells - 0.2 && t < S.bus ? 'eyeroll' : 'happy', look: [-1, 0.5], pop: k }
}
function front(x, t) {
  if (t < S.deck) {
    // the giant bubble, mid-slam
    const k = 1 + 0.05 * Math.sin(t * 12)
    speech(x, t, 400, 820, -1, 'SO ARE YOU TWO…?', { size: 62, life: 4.3, col: '#fff3c8', shake: 4, rot: -0.05 })
    void k
  }
  if (inR(t, S.lane, S.river)) {
    for (const px of [330, 750]) { R(x, INK, px - 40, 1210, 80, 40); R(x, '#ffffff', px - 36, 1214, 72, 32); R(x, '#e0903a', px - 26, 1216, 52, 14) }
  }
  if (inR(t, S.river, S.bus) && t > T.bells) {
    // the bells: big ringing arcs from the tower
    for (let k = 0; k < 4; k++) { const tt = ((t - T.bells) * 0.9 + k * 0.25) % 1; x.save(); x.globalAlpha = 0.6 * (1 - tt); x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(860, 530, 60 + tt * 380, 0, TAU); x.stroke(); x.restore() }
  }
  if (t > T.flip) { sparkles(x, t, 560, 980, T.flip, 14, 300, 1, [GOLD, PINK, BONE]); hearts(x, t, 550, 960, T.flip, { n: 7, cell: 7 }) }
}
function over(x, t) {
  // the TIMES ASKED counter (under the tissues chip)
  if (t > 3.4) {
    const n = T.ask.filter(a => t >= a).length, flip = t >= T.flip, k = pop01(t, 3.4, 0.3), b = bump(t, [...T.ask, T.flip].filter(a => t >= a).pop() ?? -9, 0.3)
    x.save(); x.translate(flip ? 810 : 880, 350); x.scale(k * (1 + 0.2 * b), k * (1 + 0.2 * b)); x.rotate(-0.04)
    const txt = flip ? 'ASKED EACH OTHER: 1' : `TIMES ASKED: ${n}`
    x.font = `700 28px ${MONO}`; const w = x.measureText(txt).width + 40
    R(x, INK, -w / 2 - 6, -36, w + 12, 72); R(x, flip ? '#2a6a3a' : '#5a1a3a', -w / 2, -30, w, 60)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(txt, 0, 0)
    x.restore()
  }
  speech(x, t, 560, 800, T.ask[1] - 0.3, 'table for a couple?', { size: 36, life: 2.2, col: BONE })
  speech(x, t, 320, 1050, T.almost, 'so, um—', { size: 36, life: 0.9, col: '#fff3c8' })
  speech(x, t, 760, 400, T.bells, 'BONG. BONG. BONG.', { size: 40, life: 2.6, col: '#fff3c8', shake: 3 })
}

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce07', city: 'London', duration: 60, ending: 'cut', castScale: 1.08,
  hook: { text: 'Three months of | *“just hanging out.”*', out: [3.0, 3.25] },
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '7:25', draw: streetHook },
    { at: S.deck, n: 1, name: 'TOP DECK · 7:30', time: '7:30', draw: topDeck },
    { at: S.lane, n: 2, name: 'BRICK LANE · 8:45', time: '8:45', draw: brickLane },
    { at: S.river, n: 3, name: 'THE RIVER · 10:00', time: '10:00', draw: riverWalk },
    { at: S.bus, n: 4, name: 'NIGHT BUS · 12:15', time: '12:15', draw: nightBus },
    { at: S.ans, n: 5, name: 'THE ANSWER · 12:40', time: '12:40', draw: answer },
  ],
  cast, stars, front, over,
  tissues: [S.bus + 0.8, S.bus + 2.0, T.ask[2], T.flip + 0.3, T.flip + 1.2, T.flip + 2.4],
  tissuesAt: S.bus,
  heads: [
    { text: 'Stay for | *the night bus.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 470 },
    { text: 'The answer was | *one question* away.', at: S.last, lateAt: S.last + 0.42, top: 440, size: 88, accentSize: 130, accentColor: '#9fe6b0' },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'one night in London. *one question.*' }] },
    { open: 8.4, close: 16.7, lines: [
      { t: 8.6, who: 'gemini', text: 'so… are you two *together?*' },
      { t: 11.2, who: 'leo', text: 'we’re just… *hanging out.*' },
      { t: 13.6, who: 'aquarius', text: 'yeah. *hanging.* out.' },
    ] },
    { open: 17.4, close: 25.7, lines: [
      { t: 17.6, who: 'stars', text: 'Brick Lane. *curry o’clock.*' },
      { t: 19.8, who: 'aquarius', text: '…two *friends,* please?' },
      { t: 22.4, who: 'leo', text: '(that stung a *little.*)' },
    ] },
    { open: 26.4, close: 34.7, lines: [
      { t: 26.6, who: 'leo', text: 'okay. I’m going to *ask.*' },
      { t: 30.4, who: 'stars', text: 'the bells. of *course* the bells.' },
      { t: 32.6, who: 'leo', text: 'never *mind.*' },
    ] },
    { open: 35.4, close: 45.7, lines: [
      { t: 35.6, who: 'pisces', text: 'the lights are so pretty I’m *crying*' },
      { t: 38.0, who: 'pisces', text: 'so… are you two *together?*' },
      { t: 40.6, who: 'aquarius', text: 'honestly? not sure. *want to be?*' },
    ] },
    { open: 46.3, close: 57.9, lines: [
      { t: 46.5, who: 'leo', text: '…*yes.* I do.' },
      { t: 48.9, who: 'aquarius', text: 'me too. let’s *say it.*' },
      { t: 51.8, who: 'pisces', text: 'I’M SOBBING. *finally.*' },
      { t: 54.6, who: 'stars', text: 'you just had to *ask each other.*' },
    ] },
  ],
  fx: [
    [loadingBar, { at: T.almost + 0.4, len: 2.6, label: 'overthinking…', stallAt: 99, error: 'Error: bells too loud', y: 1000 }, loadingBarCues],
    [screenShake, { at: T.bells, len: 0.5, amp: 14 }, shakeCues],
  ],
  music: { style: 'house', key: 'G', seed: 4007, drop: S.deck, breakdown: [S.river], lift: [S.ans], hits: [T.yes, S.last + 0.42] },
  cues: [['whoosh', 0.02, 0.6, 0.05], ...T.ask.map(a => ['pop', a, 1174.66, 0.04, 0.3]), ...[0, 0.9, 1.8].map(d => ['bell', T.bells + d, 392, 0.05, 1.4, 0]), ['pop', T.yes, 880, 0.035, 0], ['pop', T.metoo, 1046.5, 0.035, 0], ['glitter', T.flip, T.flip + 0.8]],
})
