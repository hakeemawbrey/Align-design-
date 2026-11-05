// kxtve06 · Then vs Now: Extended · "Board Game Night, Aries Edition" (60 s vertical, chiptune · C). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♈ Aries mid-flip of the game table, pieces mid-air · NOW ♈ Aries gripping the table edge, mid-deep-
//         breath, a CALM meter wobbling. Slam "Game night. | Aries is about to *lose.*" Freeze frame at 0.9.
//   6.6   1 · THE SETUP        THEN skips the rules, invents new ones · NOW reads them aloud, with a timer
//  16.0   2 · ROUND ONE        ♊ Gemini bends a rule; THEN Aries shouts · NOW laughs it off
//  25.4   3 · THE BETRAYAL     ♏ Scorpio breaks the alliance; THEN "I'll never forget this." · NOW "…respect."
//  34.8   4 · THE FINAL ROUND  THEN the board goes flying, everyone leaves · NOW Aries loses, breathes, shakes hands
//  44.2   5 · AFTER            THEN Aries alone picking up the pieces · NOW everyone helps, "rematch Friday?"
//  57.9   last line "Lost the game. | *Kept* the friends." → cut at 60.
// ♓ Pisces cries at losing in both eras, and at the handshake. The game is invented ("STAR QUEST").
import {
  makeThenNowX, star, room, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const C = T.ch, SPL = SPLIT
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1560 }
const PCOL = ['#ff4f4f', '#4fa0ff', '#5fdf6a', '#f2c75c', '#c97aff']

function gameRoom(x, t, old) { room(x, t, { wall: old ? '#6a4a3a' : '#3a4a6a', floor: old ? '#3a2a22' : '#2a2a48', old, winX: 700, winW: 240 }) }
function board(x, t, cx, cy, { tilt = 0, lift = 0, pieces = 1 } = {}) {
  x.save(); x.translate(cx, cy - lift); x.rotate(tilt)
  R(x, INK, -220, -40, 440, 60); R(x, '#a0703a', -214, -34, 428, 48)
  R(x, INK, -190, -70, 380, 40); R(x, '#f4ecd8', -184, -66, 368, 32)
  for (let i = 0; i < 12; i++) R(x, PCOL[i % 5], -176 + i * 30, -60, 24, 20)
  x.font = `800 14px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'
  if (pieces > 0) for (let i = 0; i < 4; i++) R(x, PCOL[i], -150 + i * 90, -96, 18, 26)
  x.restore()
}
function flying(x, t, t0, n = 16) {
  const tt = Math.max(0, t - t0), r = rng(4)
  for (let i = 0; i < n; i++) { const a = -Math.PI * (0.15 + 0.7 * r()), v = 300 + r() * 300; R(x, PCOL[i % 5], 480 + Math.cos(a) * v * tt - 8, 330 + Math.sin(a) * v * tt + 500 * tt * tt - 10, 16, 22) }
}
function calmMeter(x, t, v, wob = 1) {
  x.save(); x.translate(820, 110)
  R(x, INK, -120, -34, 240, 68); R(x, '#14102a', -114, -28, 228, 56)
  x.font = `700 18px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText('CALM', -104, -6)
  const vv = clamp(v + 0.08 * wob * Math.sin(t * 13)); R(x, '#2a2448', -104, 4, 208, 14); R(x, vv < 0.35 ? '#ff4f4f' : vv < 0.7 ? GOLD : '#5fdf6a', -104, 4, 208 * vv, 14)
  x.restore()
}
function players(x, t, old, moods, opts = {}) {
  const P = [['gemini', 160, 340], ['scorpio', 840, 340], ['pisces', 900, 470]]
  for (const [sg, px, py] of P) star(x, t, { sign: sg, x: px, y: py, s: sg === 'pisces' ? 100 : 130, mood: moods[sg] || 'happy', look: [px < 500 ? 1 : -1, 0], seed: px % 9, bangs: old ? (sg === 'pisces' ? '#3a2a5a' : '#6a4a2a') : false, tears: sg === 'pisces' ? (opts.pisTears ?? 1) : 0, alpha: opts.alpha ?? 1 })
}

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  gameRoom(x, t, true)
  if (i < 0) {
    board(x, t, 480, 470, { tilt: -0.5, lift: 60, pieces: 0 }); flying(x, t, -0.6)
    players(x, t, true, { gemini: 'wide', scorpio: 'wide', pisces: 'sparkle' }, { pisTears: 3 })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 170, mood: 'wide', bangs: true, seed: 1, squash: -0.14 })
    return
  }
  if (i === 0) {
    board(x, t, 480, 470)
    players(x, t, true, { gemini: 'squint', scorpio: 'eyeroll' })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: 'sparkle', bangs: true, seed: 1, hops: [C[0] + 0.6, C[0] + 1.6, C[0] + 2.6] })
    // the rulebook flies away unopened
    const p = prog(t, C[0] + 0.3, C[0] + 1.5); x.save(); x.translate(lerp(560, 1100, p), lerp(250, 60, p)); x.rotate(p * 8); R(x, INK, -36, -26, 72, 52); R(x, '#4fa0ff', -32, -22, 64, 44); x.restore()
    speech(x, t, 300, 120, C[0] + 1.8, 'NEW RULE: I WIN', { size: 32, life: 2.4, col: '#fff3c8' })
  } else if (i === 1) {
    board(x, t, 480, 470)
    players(x, t, true, { gemini: 'wink' })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: u > 1.2 ? 'wide' : 'neutral', bangs: true, seed: 1, squash: u > 1.2 && u < 1.8 ? -0.12 : 0 })
    if (u > 1.2) speech(x, t, 480, 110, C[1] + 1.2, 'THAT’S CHEATING!!', { size: 36, life: 2.6, col: '#ffd0d0', shake: 4 })
  } else if (i === 2) {
    board(x, t, 480, 470)
    players(x, t, true, { scorpio: 'wink', gemini: 'wide', pisces: 'wide' }, { pisTears: 2 })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: 'squint', bangs: true, seed: 1 })
    speech(x, t, 480, 110, C[2] + 1.6, 'I’LL NEVER FORGET THIS.', { size: 30, life: 2.6, col: '#ffd0d0' })
  } else if (i === 3) {
    const fl = C[3] + 1.2
    if (t < fl) board(x, t, 480, 470); else { board(x, t, 480 + 200 * prog(t, fl, fl + 1), 470 - 300 * prog(t, fl, fl + 1), { tilt: -2 * prog(t, fl, fl + 1), pieces: 0 }); flying(x, t, fl) }
    const leave = prog(t, fl + 1.2, fl + 2.6)
    players(x, t, true, { gemini: 'wide', scorpio: 'eyeroll', pisces: 'sparkle' }, { pisTears: 3, alpha: 1 - leave })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: t > fl ? 'wide' : 'squint', bangs: true, seed: 1, squash: inR(t, fl, fl + 0.4) ? -0.14 : 0 })
  } else {
    for (let k = 0; k < 24; k++) R(x, PCOL[k % 5], (k * 137) % 960 + 20, 460 + (k * 53) % 120, 16, 22)
    star(x, t, { sign: 'aries', x: 480 + 120 * Math.sin(u * 0.8), y: 420, s: 140, mood: 'sleepy', bangs: true, seed: 1, look: [0, 1] })
    speech(x, t, 620, 200, C[4] + 1.0, '(400 pieces)', { size: 30, life: 3.0, col: BONE })
    if (t > T.pay) star(x, t, { sign: 'pisces', x: 880, y: 470, s: 100, mood: 'sparkle', tears: 2, bangs: '#3a2a5a', seed: 6 })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  gameRoom(x, t, false)
  if (i < 0) {
    board(x, t, 480, 470)
    players(x, t, false, { scorpio: 'wink', pisces: 'wide' }, { pisTears: 2 })
    star(x, t, { sign: 'aries', x: 480, y: 330, s: 170, mood: 'squint', seed: 1, squash: 0.06 * Math.sin(t * 6) })
    calmMeter(x, t, 0.3, 1.5)
    return
  }
  if (i === 0) {
    board(x, t, 480, 470)
    players(x, t, false, { gemini: 'happy', scorpio: 'neutral' })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: 'happy', seed: 1 })
    R(x, INK, 380, 150, 200, 110); R(x, '#4fa0ff', 386, 156, 188, 98); x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('RULES', 480, 212)
    x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText(`0:${String(Math.max(0, 59 - Math.floor(u * 8)) % 60).padStart(2, '0')}`, 700, 160)
  } else if (i === 1) {
    board(x, t, 480, 470)
    players(x, t, false, { gemini: 'wink' })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: u > SPL + 0.6 ? 'happy' : 'neutral', seed: 1, hops: [C[1] + SPL + 0.8, C[1] + SPL + 1.2] })
    calmMeter(x, t, u > SPL + 0.6 ? 0.85 : 0.6, 0.5)
    if (u > SPL + 0.6) speech(x, t, 480, 120, C[1] + SPL + 0.6, 'HA! nice try.', { size: 34, life: 2.6, col: '#d8ffe0' })
  } else if (i === 2) {
    board(x, t, 480, 470)
    players(x, t, false, { scorpio: 'wink', gemini: 'wide' })
    star(x, t, { sign: 'aries', x: 480, y: 300, s: 160, mood: u > SPL + 1.4 ? 'wink' : 'squint', seed: 1 })
    calmMeter(x, t, u > SPL + 1.4 ? 0.75 : 0.35, 1)
    if (u > SPL + 1.4) speech(x, t, 480, 120, C[2] + SPL + 1.4, '…respect.', { size: 36, life: 2.8, col: '#d8ffe0' })
  } else if (i === 3) {
    board(x, t, 480, 470)
    const shake = u > SPL + 2.4
    players(x, t, false, { gemini: 'happy', scorpio: 'happy', pisces: shake ? 'happy' : 'sparkle' }, { pisTears: 3 })
    star(x, t, { sign: 'aries', x: 480, y: 330, s: 160, mood: u < SPL + 1.2 ? 'squint' : shake ? 'happy' : 'sleepy', seed: 1, hops: shake ? [C[3] + SPL + 2.4] : null })
    calmMeter(x, t, lerp(0.2, 1, prog(t, C[3] + SPL + 0.4, C[3] + SPL + 2.2)), 1 - prog(t, C[3] + SPL + 0.4, C[3] + SPL + 2.2))
    if (shake) { drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..'], { H: GOLD }, 680, 240, 8); speech(x, t, 480, 120, C[3] + SPL + 2.4, 'good game!', { size: 34, life: 2.4, col: '#d8ffe0' }) }
  } else {
    for (let k = 0; k < 24; k++) if (k > u * 3) R(x, PCOL[k % 5], (k * 137) % 960 + 20, 460 + (k * 53) % 120, 16, 22)
    const P = ['gemini', 'scorpio', 'aries', 'pisces']
    P.forEach((sg, k) => star(x, t, { sign: sg, x: 180 + k * 220, y: 420, s: sg === 'aries' ? 150 : 130, mood: sg === 'pisces' ? 'sparkle' : 'happy', tears: sg === 'pisces' ? 3 : 0, seed: 10 + k, look: [0, 1], hops: [C[4] + 0.5 + k * 0.3, C[4] + 2 + k * 0.3, C[4] + 3.5 + k * 0.3] }))
    if (u > SPL) speech(x, t, 400, 150, C[4] + SPL, 'rematch Friday?', { size: 34, life: 3.4, col: BONE })
    if (t > T.pay) hearts(x, t, 500, 260, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve06', thing: 'Game night', stamp: '01·22·2016', accent: '#ff6a4a', ending: 'cut', hookTime: '9:00 PM',
  hook: { text: 'Game night. | Aries is about to *lose.*' },
  freeze: [REC],
  promise: 'Wait for | *the final round.*',
  chapters: [
    { time: '7 PM', title: 'THE SETUP' }, { time: '7:30', title: 'ROUND ONE' }, { time: '8:15', title: 'THE BETRAYAL' },
    { time: '9 PM', title: 'THE FINAL ROUND' }, { time: '9:30', title: 'AFTER' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same game night, *ten years apart.*' },
    { t: 7.0, who: 'aries', text: 'rules? I’ll *make up* the rules.' },
    { t: 11.3, who: 'aries', text: 'rule one: we *read* the rules.' },
    { t: 16.4, who: 'gemini', text: 'I can move *diagonally,* obviously.' },
    { t: 20.8, who: 'stars', text: 'same Gemini. *calmer* Aries.' },
    { t: 25.8, who: 'scorpio', text: 'alliance over. *sorry not sorry.*' },
    { t: 30.2, who: 'aries', text: 'okay, that was *good.* respect.' },
    { t: 35.2, who: 'stars', text: 'final round. Aries is *losing.*' },
    { t: 39.6, who: 'aries', text: '*(deep breath)* good game, everyone.' },
    { t: 44.6, who: 'aries', text: '…I’ll clean up. *alone.* fine.' },
    { t: 48.8, who: 'gemini', text: 'everyone helps. *rematch Friday?*' },
    { t: 51.0, who: 'pisces', text: 'I lost AND I’m *happy-crying*' },
    { t: 54.0, who: 'stars', text: 'same fire. *better sport.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Lost the game. | *Kept* the friends.',
  fx: [[screenShake, { at: C[3] + 1.2, len: 0.5, amp: 22 }, shakeCues]],
  music: { style: 'chiptune', key: 'C', seed: 5106 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['whoosh', C[0] + 0.3, 0.6, 0.04], ['tom', C[1] + 1.2, 0.05], ['pop', C[1] + SPL + 0.6, 1046.5, 0.035, 0], ['tom', C[3] + 1.2, 0.06], ['whoosh', C[3] + 1.2, 0.8, 0.05], ['glitter', C[3] + SPL + 2.4, C[3] + SPL + 3.0], ['pop', C[4] + SPL, 1318.51, 0.035, 0]],
})
