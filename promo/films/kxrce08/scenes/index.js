// kxrce08 · Remix Cities: Extended · "Seoul: The Karaoke Confession" (60 s vertical, pop · C). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♉ Taurus mid-scream into a karaoke mic under strobing lights, the lyric screen flashing "I LIKE YO—",
//         ♍ Virgo (the crush) frozen mid-sip of a soda. Slam "Taurus is confessing. | Through a *song.*" Record scratch
//         at 1.0: "6 hours *earlier.*"
//   3.4   THE STARS: "a whole night in Seoul. one confession." · promise "Wait for | *the song.*"
//   8.0   1 STREET-FOOD TENT (7:00)  spicy rice cakes; Taurus rehearses to a fish-cake skewer
//  17.0   2 THE KARAOKE ROOM (9:00)  ♊ Gemini + ♐ Sagittarius sing invented hits; Taurus waits for their song
//  26.0   3 THE SONG (10:00)         back to frame 0: the voice cracks; "I like… yogurt?"; ♓ Pisces sobs
//  35.0   4 THE HILLTOP TOWER (11:30)  the fence of love locks; Taurus tries again, freezes again
//  45.0   5 RIVER RAMEN (1:00)       cup ramen by the river; "I like you." "I know. you sang it."
//  58.2   last line "Couldn't sing it. | *Said it anyway.*" → cut at 60.
// Real touches: street-food tents (spicy rice cakes, fish-cake skewers), karaoke rooms, the tower on the hill with its
// fence of love locks, cup ramen from a corner shop eaten by the river. Every song title is invented.
import {
  cityFilm, nightSky, skyline, street, lamp, stringLights, signBoard, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawChar, drawPixelStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { screenShake, shakeCues, glitch, glitchCues } from '../../hookkit.js'

const S = { hook: 0, tent: 8.0, room: 17.0, song: 26.0, tower: 35.0, river: 45.0, last: 58.2 }
const T = { crack: 28.4, yog: 29.6, freeze: 38.2, say: 49.0, know: 51.6 }
const REC = { at: 1.0, len: 1.6, caption: '6 hours *earlier.*', sub: 'rewind ◀◀', top: 1440 }
const NEON = ['#ff4f86', '#7fd0ff', '#b07aff', '#7dffb0', '#f2c75c']

function karaoke(x, t, lyric, sub = '') {
  R(x, '#1a0e30', 0, 0, W, H)
  const strobe = Math.floor(t * 6) % 2
  for (let k = 0; k < 7; k++) { const a = t * 1.4 + k; x.save(); x.globalAlpha = 0.16 + 0.08 * strobe; x.fillStyle = NEON[k % 5]; x.beginPath(); x.moveTo(540, 0); x.lineTo(540 + Math.cos(a) * 900 - 80, 1400); x.lineTo(540 + Math.cos(a) * 900 + 80, 1400); x.fill(); x.restore() }
  R(x, INK, 120, 330, 840, 440); R(x, '#120a2a', 132, 342, 816, 416)
  x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.fillStyle = PINK; x.shadowColor = PINK; x.shadowBlur = 20; x.fillText(lyric, 540, 560); x.shadowBlur = 0
  if (sub) { x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.fillText(sub, 540, 650) }
  R(x, '#2a1a40', 0, 1420, W, 500); R(x, INK, 60, 1340, 960, 90); R(x, '#6a3a8a', 66, 1346, 948, 78)
}
function hookRoom(x, t) { karaoke(x, t, '♪ I LIKE YO— ♪', 'track 07 · “Spicy Heart, Mild Me”') }
function tent(x, t) {
  nightSky(x, t, { top: '#0e0a30', bot: '#2a1a50', stars: 10 })
  skyline(x, t, { seed: 121, base: 900, minH: 260, maxH: 620, col: '#1e1640', edge: '#2c2058', win: '#c8d8ff' })
  // the orange tarp tent
  R(x, INK, 60, 560, 960, 720); R(x, '#e8703a', 70, 570, 940, 700); R(x, 'rgba(255,200,140,0.35)', 110, 640, 860, 560)
  x.fillStyle = '#c85a2a'; x.beginPath(); x.moveTo(40, 580); x.lineTo(540, 420); x.lineTo(1040, 580); x.fill()
  R(x, '#ffe7a0', 110, 640, 860, 560)
  R(x, INK, 140, 1000, 800, 60); R(x, '#a0a0b0', 146, 1006, 788, 48)
  // a pan of spicy rice cakes + fish-cake skewers in broth
  R(x, INK, 200, 940, 300, 70); R(x, '#d8343a', 206, 946, 288, 58); for (let i = 0; i < 9; i++) R(x, '#f4e0d0', 220 + i * 30, 960 + (i % 2) * 14, 22, 12)
  R(x, INK, 560, 940, 300, 70); R(x, '#d8b070', 566, 946, 288, 58); for (let i = 0; i < 6; i++) { R(x, INK, 590 + i * 44, 860, 4, 100); R(x, '#e8c890', 580 + i * 44, 900, 24, 50) }
  R(x, '#3a3466', 0, 1270, W, 650)
  for (const sx of [250, 540, 830]) { R(x, INK, sx - 40, 1330, 80, 18); R(x, '#4fa0ff', sx - 36, 1332, 72, 12) }
}
function room(x, t) {
  const L = ['♪ Moon Bus Romance ♪', '♪ Kimchi Fried Heart ♪']
  karaoke(x, t, L[Math.floor((t - S.room) / 4.5) % 2], 'now playing')
  R(x, INK, 120, 1260, 840, 40); R(x, '#4a2a6a', 126, 1264, 828, 32)
}
function songRoom(x, t) {
  const crack = t > T.crack, yog = t > T.yog
  karaoke(x, t, yog ? '♪ …yogurt? ♪' : crack ? '♪ I LIKE YO— ♪' : '♪ I LIKE YOU, I— ♪', 'track 07 · “Spicy Heart, Mild Me”')
}
function hillTower(x, t) {
  nightSky(x, t, { top: '#08082c', bot: '#26285e', stars: 60, moon: { x: 200, y: 420, r: 46 }, seed: 12 })
  // the city far below + the tower on the hill
  skyline(x, t, { seed: 131, base: 1050, minH: 60, maxH: 200, col: '#1c1a48', edge: '#2a2664', dens: 0.7 })
  x.fillStyle = '#1a2a3a'; x.beginPath(); x.moveTo(300, 1060); x.quadraticCurveTo(700, 820, 1080, 980); x.lineTo(1080, 1100); x.lineTo(300, 1100); x.fill()
  const cx = 760
  R(x, INK, cx - 22, 520, 44, 380); R(x, '#e8e0f0', cx - 16, 526, 32, 374)
  R(x, INK, cx - 70, 560, 140, 70); R(x, '#cfd8f0', cx - 64, 566, 128, 58); for (let k = 0; k < 5; k++) R(x, '#ffd98a', cx - 56 + k * 24, 580, 14, 30)
  R(x, INK, cx - 4, 380, 8, 150); x.fillStyle = `rgba(255,60,60,${Math.sin(t * 3) > 0 ? 1 : 0.3})`; x.fillRect(cx - 6, 374, 12, 12)
  // the fence of love locks
  R(x, '#3a3466', 0, 1250, W, 670)
  R(x, INK, 0, 1080, W, 12); R(x, INK, 0, 1220, W, 12); for (let i = 0; i < 18; i++) R(x, INK, i * 64, 1080, 6, 150)
  const r = rng(8)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 26; i++) { const lx = i * 42 + (j % 2) * 20 + r() * 8, ly = 1100 + j * 32 + r() * 6; R(x, INK, lx - 2, ly - 2, 20, 22); R(x, NEON[(i + j) % 5], lx, ly, 16, 18); R(x, '#e8e0f0', lx + 4, ly - 8, 8, 8) }
}
function riverRamen(x, t) {
  nightSky(x, t, { top: '#0a0c30', bot: '#2a2a62', stars: 40, moon: { x: 870, y: 400, r: 48 } })
  skyline(x, t, { seed: 141, base: 920, minH: 160, maxH: 480, col: '#1e1a48', edge: '#2c2662', dens: 0.6 })
  // a long bridge of lights across the river
  R(x, INK, 0, 900, W, 26); R(x, '#5a6aa8', 0, 904, W, 18); for (let i = 0; i < 10; i++) R(x, INK, i * 120 + 40, 926, 30, 80)
  R(x, '#121a48', 0, 1000, W, 220)
  for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(${i % 2 ? '255,143,177' : '127,208,255'},${0.25 + 0.2 * Math.sin(t * 3 + i)})`; x.fillRect((i * 71) % W, 1020 + (i % 6) * 32, 34, 4) }
  R(x, '#3a5a3a', 0, 1220, W, 700); R(x, '#2a4a2a', 0, 1220, W, 16)
}
function cupRamen(x, cx, cy, steam, t) {
  R(x, INK, cx - 40, cy - 60, 80, 70); R(x, '#f4f0e6', cx - 36, cy - 56, 72, 62); R(x, '#d8343a', cx - 36, cy - 40, 72, 16)
  if (steam) { x.save(); x.globalAlpha = 0.5; for (let k = 0; k < 3; k++) R(x, '#ffffff', cx - 20 + k * 18 + 5 * Math.sin(t * 3 + k), cy - 90 - ((t * 40 + k * 20) % 60), 8, 20); x.restore() }
}
function mic(x, cx, cy, rot = -0.4) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -12, -10, 24, 110); R(x, '#5a5a6a', -8, -6, 16, 102); x.fillStyle = INK; x.beginPath(); x.arc(0, -24, 26, 0, TAU); x.fill(); x.fillStyle = '#c8c8d8'; x.beginPath(); x.arc(0, -24, 20, 0, TAU); x.fill(); x.restore() }
function soda(x, cx, cy) { R(x, INK, cx - 22, cy - 50, 44, 70); R(x, '#7fd0ff', cx - 18, cy - 46, 36, 62); R(x, BONE, cx + 6, cy - 80, 6, 40) }

function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  if (t < S.tent || inR(t, S.song, S.tower)) {
    const song = t >= S.song
    P('taurus', 360, 1240, 240, song ? (t > T.yog ? 'squint' : t > T.crack ? 'wide' : 'sparkle') : 'wide', [1, -1], { seed: 7, squash: song && t < T.crack ? 0.04 * Math.sin(t * 16) : -0.12 })
    P('virgo', 800, 1260, 190, song && t > T.yog ? 'happy' : 'wide', [-1, 0], { seed: 2 })
    if (song) { P('pisces', 990, 1310, 140, 'sparkle', [-1, 0], { tears: 3, seed: 6, hops: [T.crack, T.yog] }); P('gemini', 120, 1310, 130, t > T.yog ? 'wide' : 'happy', [1, 0], { seed: 4 }) }
  } else if (t < S.room) {
    P('taurus', 300, 1360, 210, t > 12 ? 'heart' : 'neutral', [1, -0.5], { seed: 7, hops: [10.8, 13.4] })
    P('virgo', 820, 1380, 170, 'happy', [-1, 0], { seed: 2 })
  } else if (t < S.song) {
    P('gemini', 330, 1220, 190, 'sparkle', [0, -1], { seed: 4, hops: [17.6, 18.2, 18.8, 19.4, 20.0, 20.6] })
    P('sagittarius', 600, 1220, 180, 'happy', [0, -1], { seed: 9, hops: [21.6, 22.2, 22.8, 23.4] })
    P('taurus', 200, 1400, 160, t > 24 ? 'wide' : 'neutral', [1, -1], { seed: 7 })
    P('virgo', 820, 1400, 160, 'happy', [-1, -1], { seed: 2 })
    P('pisces', 980, 1410, 120, 'sparkle', [-1, -1], { tears: 2, seed: 6 })
  } else if (t < S.river) {
    const fr = t > T.freeze
    P('taurus', 380, 1360, 210, fr ? 'wide' : 'neutral', [1, 0], { seed: 7, hops: [T.freeze - 0.6] })
    P('virgo', 700, 1360, 190, fr ? 'neutral' : 'happy', [-1, 0], { seed: 2 })
  } else {
    P('taurus', 400, 1320, 210, t > T.know ? 'heart' : t > T.say ? 'sparkle' : 'neutral', [1, 0], { seed: 7, hops: [T.say, T.know + 0.4] })
    P('virgo', 690, 1320, 200, t > T.know ? 'wink' : 'happy', [-1, 0], { seed: 2, hops: [T.know] })
    P('pisces', 960, 1380, 140, 'sparkle', [-1, -0.5], { tears: 3, seed: 6, hops: [T.know + 0.3] })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  return { x: 930, y: (t < S.tent ? 900 : 470) + 10 * Math.sin(t * 1.3), s: t < S.tent ? 150 : 100, mood: t > T.say ? 'sparkle' : inR(t, T.crack, S.tower) ? 'wide' : 'happy', look: [-1, 0.5], pop: k }
}
function front(x, t) {
  if (t < S.tent || inR(t, S.song, S.tower)) { mic(x, 470, 1220); soda(x, 720, 1270) }
  if (inR(t, S.tent, S.room)) { x.save(); x.translate(470, 1210); x.rotate(-0.4); R(x, INK, -3, -80, 6, 100); R(x, '#e8c890', -14, -70, 28, 60); x.restore(); speech(x, t, 600, 1020, 10.2, 'I… like… you? (practice)', { size: 30, life: 2.4, col: BONE, tail: -1 }) }
  if (inR(t, S.room, S.song)) { mic(x, 400, 1110, -0.2); for (let k = 0; k < 6; k++) { const tt = (t * 0.8 + k / 6) % 1; drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: NEON[k % 5] }, 300 + k * 90, 900 - tt * 260, 7, { alpha: 1 - tt }) } }
  if (inR(t, S.song, S.tower) && t > T.crack) speech(x, t, 380, 1000, T.crack, 'CRACK', { size: 40, life: 1.0, col: '#ffd0d0', shake: 5 })
  if (inR(t, S.river, S.last + 2)) { cupRamen(x, 250, 1480, true, t); cupRamen(x, 840, 1480, true, t); if (t > T.know) hearts(x, t, 540, 1180, T.know + 0.2, { n: 7, cell: 7 }); sparkles(x, t, 540, 1100, T.know + 0.2, 12, 260, 1, [GOLD, PINK, BONE]) }
}
function over(x, t) {
  speech(x, t, 400, 1080, T.freeze, '…', { size: 60, life: 2.2, col: BONE })
  speech(x, t, 400, 1080, T.say, 'I like you.', { size: 44, life: 2.6, col: '#fff3c8', tail: -1 })
  speech(x, t, 690, 1060, T.know, 'I know. you sang it.', { size: 38, life: 3.0, col: BONE, tail: 1 })
}

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce08', city: 'Seoul', duration: 60, ending: 'cut', castScale: 1.05,
  hook: { text: 'Taurus is confessing. | Through a *song.*', out: [3.0, 3.25], top: 160, size: 90 },
  freeze: [REC],
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '10:00', draw: hookRoom },
    { at: S.tent, n: 1, name: 'STREET FOOD · 7:00', time: '7:00', draw: tent },
    { at: S.room, n: 2, name: 'KARAOKE · 9:00', time: '9:00', draw: room },
    { at: S.song, n: 3, name: 'THE SONG · 10:00', time: '10:00', draw: songRoom },
    { at: S.tower, n: 4, name: 'THE TOWER · 11:30', time: '11:30', draw: hillTower },
    { at: S.river, n: 5, name: 'RIVER RAMEN · 1:00', time: '1:00', draw: riverRamen },
  ],
  cast, stars, front, over,
  tissues: [S.room + 2.4, S.song + 0.8, T.crack + 0.2, T.yog + 0.3, T.yog + 1.6, T.know + 0.3, T.know + 1.4],
  tissuesAt: S.room,
  heads: [
    { text: 'Wait for | *the song.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 1100 },
    { text: 'Couldn’t sing it. | *Said it anyway.*', at: S.last, lateAt: S.last + 0.42, top: 400, size: 88, accentSize: 130, accentColor: PINK },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'a whole night in Seoul. *one confession.*' }] },
    { open: 8.4, close: 16.7, lines: [
      { t: 8.6, who: 'taurus', text: 'spicy rice cakes. for *courage.*' },
      { t: 12.6, who: 'stars', text: 'babe. that’s a *fish cake.*' },
      { t: 14.6, who: 'taurus', text: 'it was a *good listener.*' },
    ] },
    { open: 17.4, close: 25.7, lines: [
      { t: 17.6, who: 'gemini', text: 'this one’s called *“Moon Bus Romance”!*' },
      { t: 21.4, who: 'sagittarius', text: 'next! *“Kimchi Fried Heart”!*' },
      { t: 23.8, who: 'taurus', text: 'my song is next. *my song is NEXT.*' },
    ] },
    { open: 26.4, close: 34.7, lines: [
      { t: 26.6, who: 'stars', text: 'here it is. *the song.*' },
      { t: 30.0, who: 'taurus', text: '…I like… *yogurt?*' },
      { t: 32.4, who: 'pisces', text: 'that was SO brave I’m *sobbing*' },
    ] },
    { open: 35.4, close: 44.7, lines: [
      { t: 35.6, who: 'virgo', text: 'look, everyone *leaves a lock.*' },
      { t: 37.6, who: 'taurus', text: 'Virgo. I need to tell you—' },
      { t: 40.8, who: 'stars', text: 'and… *frozen.* again.' },
    ] },
    { open: 45.4, close: 57.9, lines: [
      { t: 45.6, who: 'stars', text: 'no song this time. *just say it.*' },
      { t: 53.6, who: 'pisces', text: 'I knew it at the *yogurt*' },
      { t: 55.6, who: 'virgo', text: 'it was a *great* song.' },
    ] },
  ],
  fx: [
    [glitch, { at: T.crack, len: 0.8, dialog: false, amp: 0.7 }, glitchCues],
    [screenShake, { at: T.yog, len: 0.4, amp: 14 }, shakeCues],
  ],
  music: { style: 'pop', key: 'C', seed: 4008, drop: S.tent, breakdown: [S.tower], lift: [S.river], hits: [T.say, S.last + 0.42] },
  cues: [['whoosh', 0.02, 0.6, 0.05], ['pop', T.crack, 1567.98, 0.05, 0], ['pluck', T.yog, 330, 0.04, 0.5, 0], ['tick', T.freeze, 0.05], ['pop', T.say, 880, 0.04, 0], ['pop', T.know, 1046.5, 0.04, 0], ['glitter', T.know, T.know + 0.8]],
})
