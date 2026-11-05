// kxtve03 · Then vs Now: Extended · "Two Hours Picking a Film" (60 s vertical, lofi · Eb). LOOP.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♎ Libra + ♉ Taurus mid-scream under a landslide of film cases · NOW the same pair mid-scroll, a wall
//         of tiles whooshing past. Slam "Two hours *choosing.* | Still not *watching.*" ♓ Pisces in the armchair.
//   6.6   1 · 7:00 THE PICK       THEN a shelf of cases · NOW an endless scroll
//  16.0   2 · 7:45 SNACKS         THEN burnt popcorn · NOW Taurus builds a snack board like a monument
//  25.4   3 · 8:30 STILL PICKING  both: "you pick." "no, you pick." · NOW adds three trailers
//  34.8   4 · 9:15 PLAY           THEN the disc skips · NOW the loading wheel
//  44.2   5 · 9:20 ASLEEP         both eras: asleep on each other in four minutes; Pisces, the only one awake, sobs at
//                                 the credits
//  57.9   last line "Never saw the film. | *Saw each other.*"; the last 0.45 s ease back into frame 0 (loopBack).
import {
  makeThenNowX, star, room, couch, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'
import { glitch, glitchCues } from '../../hookkit.js'

const C = T.ch, SPL = SPLIT
const TITLES = ['LOVE, AGAIN', 'SPACE RANCH 3', 'THE LONG DOG', 'MOON HEIST', 'SAD BOATS', 'PIE NIGHT', 'ROBO PROM', 'NO, YOU']
const TCOL = ['#ff7aa8', '#7fd0ff', '#f2c75c', '#9fe6b0', '#c9a6ff', '#ff9a5a']

function crt(x, t, screen) {
  R(x, INK, 590, 150, 300, 240); R(x, '#5a5060', 598, 158, 284, 224); R(x, INK, 620, 176, 220, 170)
  x.save(); x.beginPath(); x.rect(626, 182, 208, 158); x.clip(); screen(x, 626, 182, 208, 158); x.restore()
  R(x, INK, 680, 390, 120, 40)
}
function flat(x, t, screen) {
  R(x, INK, 560, 110, 380, 230); x.save(); x.beginPath(); x.rect(568, 118, 364, 214); x.clip(); screen(x, 568, 118, 364, 214); x.restore()
  R(x, INK, 730, 340, 40, 50); R(x, INK, 680, 384, 140, 10)
}
function tiles(x, t, x0, y0, w, h, speed) {
  R(x, '#141030', x0, y0, w, h)
  const off = (t * speed) % 90
  for (let j = -1; j < 4; j++) for (let i = 0; i < 4; i++) R(x, TCOL[(i + j * 3 + Math.floor(t * speed / 90) * 3 + 60) % 6], x0 + 8 + i * (w - 8) / 4, y0 + 8 + j * 70 - off * (70 / 90), (w - 8) / 4 - 8, 60)
}
function cases(x, t, n) {
  // a landslide of film cases
  const r = rng(5)
  for (let i = 0; i < n; i++) { const cx = r() * 600 + 40, cy = 320 + r() * 260, rot = (r() - 0.5) * 1.4; x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -30, -42, 60, 84); R(x, TCOL[i % 6], -26, -38, 52, 76); R(x, '#ffffff', -18, -24, 36, 20); x.restore() }
}
function armchairPisces(x, t, tears, mood = 'sparkle', y = 380) {
  R(x, INK, 820, y - 40, 170, 150); R(x, '#5a8a7a', 826, y - 34, 158, 138); R(x, '#4a7a6a', 826, y + 30, 158, 74)
  star(x, t, { sign: 'pisces', x: 905, y: y + 10, s: 110, mood, tears, seed: 6, look: [-1, -1] })
}
function sleeping(x, t, old) {
  star(x, t, { sign: 'libra', x: 260, y: 380, s: 150, mood: 'sleepy', seed: 7, bangs: old, squash: 0.06 })
  star(x, t, { sign: 'taurus', x: 400, y: 370, s: 150, mood: 'sleepy', seed: 8, bangs: old ? '#6a4a2a' : false, squash: 0.06 })
}
function credits(x, t, x0, y0, w, h) {
  R(x, '#06040e', x0, y0, w, h)
  x.font = `700 14px ${MONO}`; x.fillStyle = '#c8c0e0'; x.textAlign = 'center'
  for (let i = 0; i < 9; i++) { const yy = y0 + h - ((t * 30 + i * 22) % (h + 40)); if (yy > y0 && yy < y0 + h) x.fillText(['THE END', 'directed by a cat', 'starring two boats', 'thank you', '♥'][i % 5], x0 + w / 2, yy) }
}

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  room(x, t, { wall: '#6a4a5a', floor: '#3a2a3a', old: true, win: false })
  couch(x, 330, 430, 480, '#9a5a6a')
  const tvScreen = (sx, x0, y0, w, h) => {
    if (i === 3 && u > 0.6) { const sk = Math.floor(t * 8) % 3; R(sx, ['#7fd0ff', '#141030', '#ff7aa8'][sk], x0, y0, w, h); sx.font = `800 30px ${INTER}`; sx.fillStyle = INK; sx.textAlign = 'center'; sx.fillText('SKIP', x0 + w / 2, y0 + h / 2 + 10) }
    else if (i === 4 || t > T.pay) credits(sx, t, x0, y0, w, h)
    else { R(sx, '#2a3a8a', x0, y0, w, h); sx.font = `700 16px ${MONO}`; sx.fillStyle = BONE; sx.textAlign = 'center'; sx.fillText('MENU', x0 + w / 2, y0 + h / 2) }
  }
  crt(x, t, tvScreen)
  if (i < 0) {
    cases(x, t, 26)
    star(x, t, { sign: 'libra', x: 240, y: 360, s: 150, mood: 'wide', seed: 7, bangs: true, look: [0, -1] })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: 'wide', seed: 8, bangs: '#6a4a2a', look: [0, -1] })
    cases(x, t + 9, 10)
    armchairPisces(x, t, 2, 'wide')
    return
  }
  armchairPisces(x, t, i === 4 || t > T.pay ? 3 : 1, i === 4 ? 'sparkle' : 'happy')
  if (i === 4 || t > T.pay) { sleeping(x, t, true); return }
  if (i === 0) {
    const n = Math.floor(u / 0.7)
    star(x, t, { sign: 'libra', x: 250, y: 360, s: 150, mood: 'squint', seed: 7, bangs: true, hops: [C[0] + 0.7, C[0] + 1.4, C[0] + 2.1, C[0] + 2.8] })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: 'neutral', seed: 8, bangs: '#6a4a2a' })
    if (u < SPL) speech(x, t, 260, 160, C[0] + n * 0.7, TITLES[n % TITLES.length] + '?', { size: 30, life: 0.68, col: '#fff3c8' })
    cases(x, t, Math.min(14, n * 2))
  } else if (i === 1) {
    star(x, t, { sign: 'libra', x: 250, y: 370, s: 150, mood: 'neutral', seed: 7, bangs: true })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: u > 1 ? 'wide' : 'happy', seed: 8, bangs: '#6a4a2a' })
    R(x, INK, 420, 220, 90, 70); R(x, '#f4f0e6', 426, 226, 78, 58); R(x, '#3a2a1a', 432, 214, 66, 20)
    for (let k = 0; k < 4; k++) { const tt = (t * 0.6 + k * 0.25) % 1; x.save(); x.globalAlpha = 0.6 * (1 - tt); R(x, '#4a4a4a', 440 + k * 12 + 10 * Math.sin(t * 3 + k), 200 - tt * 120, 24, 24); x.restore() }
  } else if (i === 2) {
    star(x, t, { sign: 'libra', x: 250, y: 370, s: 150, mood: 'squint', seed: 7, bangs: true, look: [1, 0] })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: 'squint', seed: 8, bangs: '#6a4a2a', look: [-1, 0] })
    speech(x, t, 230, 170, C[2] + 0.4, 'you pick.', { size: 32, life: 1.5, tail: -1 })
    speech(x, t, 440, 150, C[2] + 1.8, 'no, YOU pick.', { size: 32, life: 1.5, tail: 1 })
    speech(x, t, 230, 170, C[2] + 3.1, 'you.', { size: 32, life: 1.2, tail: -1 })
  } else if (i === 3) {
    star(x, t, { sign: 'libra', x: 250, y: 370, s: 150, mood: u > 0.6 ? 'wide' : 'sparkle', seed: 7, bangs: true })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: u > 0.6 ? 'eyeroll' : 'happy', seed: 8, bangs: '#6a4a2a' })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', win: false })
  couch(x, 330, 430, 480, '#5a7aa8')
  const tvScreen = (sx, x0, y0, w, h) => {
    if (i === 4 || t > T.pay) credits(sx, t, x0, y0, w, h)
    else if (i === 3 && u > SPL) { R(sx, '#06040e', x0, y0, w, h); sx.save(); sx.translate(x0 + w / 2, y0 + h / 2); sx.rotate(t * 6); for (let k = 0; k < 8; k++) { sx.rotate(TAU / 8); R(sx, `rgba(239,230,214,${0.2 + k * 0.1})`, 30, -5, 24, 10) } sx.restore() }
    else if (i === 2 && u > SPL) { R(sx, '#141030', x0, y0, w, h); const n = Math.min(3, Math.floor((u - SPL) / 1.4) + 1); sx.font = `800 26px ${INTER}`; sx.fillStyle = GOLD; sx.textAlign = 'center'; sx.fillText(`TRAILER ${n} / 3`, x0 + w / 2, y0 + h / 2 + 8) }
    else tiles(sx, t, x0, y0, w, h, i < 0 ? 900 : 320)
  }
  flat(x, t, tvScreen)
  if (i < 0) {
    star(x, t, { sign: 'libra', x: 240, y: 360, s: 150, mood: 'squint', seed: 7, look: [1, -1] })
    star(x, t, { sign: 'taurus', x: 400, y: 370, s: 150, mood: 'sleepy', seed: 8, look: [1, -1] })
    armchairPisces(x, t, 1, 'neutral')
    return
  }
  armchairPisces(x, t, i === 4 || t > T.pay ? 3 : 1, i === 4 ? 'sparkle' : 'happy')
  if (i === 4 || t > T.pay) { sleeping(x, t, false); if (t > T.pay) hearts(x, t, 330, 230, T.pay + 0.3, { n: 5, cell: 6 }); return }
  if (i === 1) {
    // Taurus builds the snack board: it grows into a tower
    const hgt = Math.min(6, Math.floor(clamp(prog(t, C[1] + SPL, C[1] + 8.6)) * 7))
    R(x, INK, 170, 470, 320, 26); R(x, '#a0703a', 176, 474, 308, 18)
    for (let k = 0; k < hgt; k++) R(x, ['#f2c75c', '#9fe6b0', '#c9a6ff', '#ff9a5a', '#f4f0e6', '#ff7aa8'][k], 240 + (k % 2) * 30, 444 - k * 34, 160 - k * 18, 30)
    star(x, t, { sign: 'taurus', x: 560, y: 380, s: 150, mood: hgt > 4 ? 'sparkle' : 'happy', seed: 8, hops: [C[1] + 6, C[1] + 7.4] })
    star(x, t, { sign: 'libra', x: 250, y: 330, s: 120, mood: 'heart', seed: 7 })
  } else {
    star(x, t, { sign: 'libra', x: 250, y: 370, s: 150, mood: i === 2 ? 'squint' : i === 3 ? 'neutral' : 'squint', seed: 7, look: [1, -1] })
    star(x, t, { sign: 'taurus', x: 420, y: 370, s: 150, mood: i === 3 ? 'sleepy' : 'neutral', seed: 8, look: [1, -1] })
    if (i === 2) { speech(x, t, 230, 170, C[2] + SPL + 0.1, 'you pick.', { size: 32, life: 1.4, tail: -1 }); speech(x, t, 440, 150, C[2] + SPL + 1.6, 'no, you.', { size: 32, life: 1.4, tail: 1 }) }
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve03', thing: 'Couch night', stamp: '02·05·2016', accent: '#c9a6ff', ending: 'loop', hookTime: '7:00 PM',
  hook: { text: 'Two hours *choosing.* | Still not *watching.*' },
  promise: 'Wait for | *the ending.*',
  chapters: [
    { time: '7:00', title: 'THE PICK' }, { time: '7:45', title: 'SNACKS' }, { time: '8:30', title: 'STILL PICKING' },
    { time: '9:15', title: 'PLAY' }, { time: '9:20', title: 'ASLEEP' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same couch night, *ten years apart.*' },
    { t: 7.0, who: 'libra', text: 'this one? no. *this* one?' },
    { t: 11.3, who: 'libra', text: 'scroll… scroll… *scroll.*' },
    { t: 16.4, who: 'taurus', text: 'is popcorn supposed to be *black?*' },
    { t: 20.8, who: 'taurus', text: 'the snack board is *done.* it’s art.' },
    { t: 25.8, who: 'stars', text: 'round three of *“you pick.”*' },
    { t: 30.2, who: 'stars', text: 'and now… *three trailers.*' },
    { t: 35.2, who: 'stars', text: 'press play! the disc *skips.*' },
    { t: 39.6, who: 'libra', text: 'it’s *loading.* it’s fine. it’s fine.' },
    { t: 44.6, who: 'pisces', text: 'they’re asleep. *I’m* watching.' },
    { t: 48.8, who: 'pisces', text: 'the ending!! *I’m sobbing!!*' },
    { t: 54.0, who: 'stars', text: 'they never saw it. *didn’t need to.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 57.6]],
  last: 'Never saw the film. | *Saw each other.*',
  fx: [[glitch, { at: C[3] + 0.6, len: 0.9, dialog: false, amp: 0.6 }, glitchCues]],
  music: { style: 'lofi', key: 'Eb', seed: 5103 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['glitter', 0.05, 0.6], ['pop', C[4] + 1.0, 523.25, 0.03, 0], ['bell', C[4] + SPL, 1318.51, 0.03, 1.2, 0]],
})
