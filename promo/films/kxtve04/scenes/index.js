// kxtve04 · Then vs Now: Extended · "The Singles Table at the Wedding" (60 s vertical, jazzy · F). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♍ Virgo mid-dive away from a flying bouquet that hits them anyway · NOW ♍ Virgo mid-spin on the
//         dance floor, arms up. Slam "Single at a wedding. | *Ten years* apart." Record scratch + freeze at 0.9.
//   6.6   1 · THE VOWS           both eras: ♓ Pisces sobbing in the front row
//  16.0   2 · THE SEATING CHART  THEN the SINGLES table beside the kids' table, "so when's yours?" · NOW joke name cards,
//                                everyone wants to sit there
//  25.4   3 · THE SPEECHES       THEN Virgo hides behind the centrepiece · NOW Virgo gives a funny, kind speech
//  34.8   4 · THE DANCE FLOOR    THEN wallflower with a cake plate · NOW a singles conga line, Virgo in front
//  44.2   5 · THE BOUQUET        THEN dodges, gets hit · NOW catches it on purpose and hands it to Pisces, who sobs
//  57.9   last line "Singles table. | *Loudest* table." → cut at 60.
// The couple are plain stars (no signs). No drinks anywhere: cake and lemonade.
import {
  makeThenNowX, star, room, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'

const C = T.ch, SPL = SPLIT
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1560 }
const COUPLE = [{ color: '#f4f0e6', glyph: false }, { color: '#8ab0e8', glyph: false }]

function hall(x, t, old) {
  R(x, old ? '#6a4a4a' : '#3a3a6a', 0, 0, SW, 440)
  for (let i = 0; i < 9; i++) { x.save(); x.globalAlpha = 0.25; R(x, old ? '#ffd0a0' : '#c9a6ff', i * 120 + 20, 0, 4, 440); x.restore() }
  // string lights
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 20; i++) { const px = i * 50, py = 40 + 30 * Math.sin(i * 0.5); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  for (let i = 0; i < 20; i++) { x.save(); x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 3 + i); R(x, [GOLD, PINK, '#ffffff'][i % 3], i * 50 - 6, 40 + 30 * Math.sin(i * 0.5), 12, 14); x.restore() }
  R(x, INK, 0, 432, SW, 8); R(x, old ? '#5a3a3a' : '#2a2a4a', 0, 440, SW, SH - 440)
}
function arch(x, t) {
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.arc(500, 420, 220, Math.PI, TAU); x.stroke()
  x.strokeStyle = '#f4f0e6'; x.lineWidth = 16; x.beginPath(); x.arc(500, 420, 220, Math.PI, TAU); x.stroke()
  for (let i = 0; i < 12; i++) { const a = Math.PI + (i / 11) * Math.PI; drawBits(x, ['.P.', 'PYP', '.P.'], { P: i % 2 ? '#ff8fb1' : '#ffffff', Y: GOLD }, 500 + Math.cos(a) * 220, 420 + Math.sin(a) * 220, 8) }
}
function roundTable(x, cx, cy, w, label = '', { flowers = true } = {}) {
  R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, 50); R(x, '#f4f0e6', cx - w / 2, cy, w, 38); R(x, '#e0d8c8', cx - w / 2, cy + 30, w, 8)
  R(x, INK, cx - w / 2 + 10, cy + 44, w - 20, 70); R(x, '#f4f0e6', cx - w / 2 + 16, cy + 44, w - 32, 64)
  if (flowers) for (let i = 0; i < 3; i++) drawBits(x, ['.P.', 'PYP', '.P.', '.G.', '.G.'], { P: '#ff8fb1', Y: GOLD, G: '#5fbf6a' }, cx - 30 + i * 30, cy - 34, 7)
  if (label) { R(x, INK, cx - 80, cy + 56, 160, 40); R(x, '#fff8e6', cx - 76, cy + 60, 152, 32); x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(label, cx, cy + 84) }
}
function bouquet(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  drawBits(x, ['.PWP.', 'PWPWP', 'WPYPW', '.PWP.', '..G..', '..G..'], { P: '#ff8fb1', W: '#ffffff', Y: GOLD, G: '#5fbf6a' }, 0, 0, 17)
  x.restore()
}
function couple(x, t, cx, cy, s = 120) {
  star(x, t, { ...COUPLE[0], x: cx - 60, y: cy, s, mood: 'heart', seed: 12 })
  star(x, t, { ...COUPLE[1], x: cx + 60, y: cy, s, mood: 'heart', seed: 13 })
}
function danceFloor(x, t, old) {
  hall(x, t, old)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 10; i++) if ((i + j) % 2) R(x, old ? '#7a5a5a' : '#4a4a7a', i * 100, 450 + j * 40, 100, 40)
  for (let k = 0; k < 6; k++) { const a = t * 1.5 + k; x.save(); x.globalAlpha = 0.18; x.fillStyle = [PINK, GOLD, '#7fd0ff'][k % 3]; x.beginPath(); x.moveTo(500, 0); x.lineTo(500 + Math.cos(a) * 600 - 60, 600); x.lineTo(500 + Math.cos(a) * 600 + 60, 600); x.fill(); x.restore() }
}

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    danceFloor(x, t, true)
    star(x, t, { sign: 'virgo', x: 420, y: 400, s: 170, mood: 'wide', look: [1, -1], bangs: true, seed: 2, squash: -0.12 })
    bouquet(x, 560 + 30 * Math.sin(t * 2), 240 + 20 * Math.sin(t * 3), 1.1, t * 3)
    star(x, t, { sign: 'pisces', x: 870, y: 470, s: 110, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6 })
    return
  }
  if (i === 0) {
    hall(x, t, true); arch(x, t); couple(x, t, 500, 360, 120)
    star(x, t, { sign: 'pisces', x: 200, y: 500, s: 130, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6, look: [1, -1] })
    star(x, t, { sign: 'virgo', x: 790, y: 500, s: 130, mood: 'neutral', bangs: true, seed: 2, look: [-1, -1] })
    if (u > 1.5) hearts(x, t, 500, 250, C[0] + 1.5, { n: 6, cell: 7 })
  } else if (i === 1) {
    hall(x, t, true)
    roundTable(x, 300, 420, 340, 'SINGLES'); roundTable(x, 760, 440, 300, 'KIDS', { flowers: false })
    for (let k = 0; k < 3; k++) star(x, t, { color: ['#ffd0a0', '#a0e0ff', '#d0ffa0'][k], glyph: false, x: 680 + k * 80, y: 400, s: 70, mood: 'happy', seed: 20 + k, raw: true, hops: [C[1] + 0.5 + k * 0.3, C[1] + 2 + k * 0.3] })
    star(x, t, { sign: 'virgo', x: 300, y: 360, s: 150, mood: u > 1.8 ? 'squint' : 'neutral', bangs: true, seed: 2 })
    star(x, t, { color: '#e8a0d0', glyph: false, x: 500, y: 330, s: 120, mood: 'happy', seed: 15, raw: true })
    speech(x, t, 560, 150, C[1] + 1.2, 'so when’s YOURS?', { size: 32, life: 2.8, col: BONE, tail: -1 })
  } else if (i === 2) {
    hall(x, t, true)
    roundTable(x, 420, 400, 460)
    for (let k = 0; k < 5; k++) drawBits(x, ['.P.', 'PYP', '.P.', '.G.', '.G.', '.G.'], { P: '#ff8fb1', Y: GOLD, G: '#5fbf6a' }, 330 + k * 45, 330, 12)
    star(x, t, { sign: 'virgo', x: 420, y: 330 + 30 * Math.sin(Math.min(1, u) * Math.PI / 2), s: 140, mood: 'wide', bangs: true, seed: 2, alpha: 0.95 })
    for (let k = 0; k < 5; k++) drawBits(x, ['.P.', 'PYP', '.P.', '.G.', '.G.', '.G.'], { P: '#ff8fb1', Y: GOLD, G: '#5fbf6a' }, 340 + k * 40, 380, 12)
    R(x, INK, 790, 200, 10, 240); R(x, '#5a5a6a', 780, 190, 30, 40)
    star(x, t, { sign: 'pisces', x: 880, y: 470, s: 100, mood: 'sparkle', tears: 2, bangs: '#3a2a5a', seed: 6 })
  } else if (i === 3) {
    danceFloor(x, t, true)
    for (let k = 0; k < 4; k++) star(x, t, { color: ['#ffd0a0', '#a0e0ff', '#ffb0d0', '#d0ffa0'][k], glyph: false, x: 400 + k * 120, y: 420, s: 110, mood: 'happy', seed: 30 + k, hops: [C[3] + k * 0.3, C[3] + 1 + k * 0.3, C[3] + 2 + k * 0.3, C[3] + 3 + k * 0.3] })
    star(x, t, { sign: 'virgo', x: 120, y: 380, s: 140, mood: 'neutral', bangs: true, seed: 2, look: [1, 0] })
    R(x, INK, 150, 400, 80, 20); R(x, '#ffffff', 154, 403, 72, 12); R(x, '#f4d0e0', 172, 380, 36, 24)
  } else {
    danceFloor(x, t, true)
    const p = prog(t, C[4] + 0.4, C[4] + 2.6)
    star(x, t, { sign: 'virgo', x: lerp(440, 300, ease.outCubic(p)), y: 400, s: 150, mood: p >= 1 ? 'eyeroll' : 'wide', bangs: true, seed: 2, hops: [C[4] + 0.6] })
    if (p < 1) bouquet(x, lerp(900, 320, p), 300 - 220 * Math.sin(p * Math.PI), 1, t * 5)
    else { bouquet(x, 300, 300, 1, 0.4); speech(x, t, 420, 150, C[4] + 2.6, 'OOF.', { size: 40, life: 1.4, col: '#fff3c8' }) }
    star(x, t, { sign: 'pisces', x: 870, y: 470, s: 110, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6 })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    danceFloor(x, t, false)
    star(x, t, { sign: 'virgo', x: 480, y: 400, s: 170, mood: 'sparkle', look: [0, -1], seed: 2, squash: 0.08 * Math.sin(t * 8) })
    star(x, t, { sign: 'pisces', x: 860, y: 470, s: 110, mood: 'happy', tears: 2, seed: 6 })
    return
  }
  if (i === 0) {
    hall(x, t, false); arch(x, t); couple(x, t, 500, 360, 120)
    star(x, t, { sign: 'pisces', x: 200, y: 500, s: 130, mood: 'sparkle', tears: 3, seed: 6, look: [1, -1] })
    star(x, t, { sign: 'virgo', x: 790, y: 500, s: 130, mood: 'happy', seed: 2, look: [-1, -1] })
    if (u > SPL + 1) hearts(x, t, 500, 250, C[0] + SPL + 1, { n: 6, cell: 7 })
  } else if (i === 1) {
    hall(x, t, false)
    roundTable(x, 420, 420, 520, 'SINGLES ★')
    const cards = ['“likes long walks to the snack table”', '“will dance. badly.”']
    cards.forEach((c, k) => { if (u > SPL + 0.4 + k * 1.2) { const kk = pop01(t, C[1] + SPL + 0.4 + k * 1.2, 0.3); x.save(); x.translate(300 + k * 260, 260); x.scale(kk, kk); x.font = `700 23px ${INTER}`; const w = x.measureText(c).width + 24; R(x, INK, -w / 2 - 4, -28, w + 8, 56); R(x, '#fff8e6', -w / 2, -24, w, 48); x.fillStyle = INK; x.textAlign = 'center'; x.fillText(c, 0, 6); x.restore() } })
    star(x, t, { sign: 'virgo', x: 420, y: 370, s: 150, mood: 'happy', seed: 2 })
    for (let k = 0; k < 4; k++) star(x, t, { color: ['#ffd0a0', '#a0e0ff', '#ffb0d0', '#d0ffa0'][k], glyph: false, x: 700 + k * 70, y: 420, s: 80, mood: 'sparkle', seed: 40 + k, raw: true, pop: pop01(t, C[1] + SPL + 2 + k * 0.3) })
  } else if (i === 2) {
    hall(x, t, false)
    R(x, INK, 470, 200, 10, 240); R(x, '#5a5a6a', 460, 190, 30, 40)
    star(x, t, { sign: 'virgo', x: 420, y: 380, s: 160, mood: u > SPL + 2 ? 'wink' : 'happy', seed: 2, hops: [C[2] + SPL + 1, C[2] + SPL + 3] })
    for (let k = 0; k < 3; k++) star(x, t, { color: ['#ffd0a0', '#a0e0ff', '#ffb0d0'][k], glyph: false, x: 680 + k * 100, y: 470, s: 90, mood: u > SPL + 1.5 ? 'happy' : 'neutral', seed: 50 + k, raw: true, hops: [C[2] + SPL + 1.6, C[2] + SPL + 3.2] })
    star(x, t, { sign: 'pisces', x: 150, y: 480, s: 100, mood: 'sparkle', tears: 3, seed: 6 })
    if (u > SPL + 1.5) speech(x, t, 780, 260, C[2] + SPL + 1.5, 'HA!', { size: 40, life: 1.2, col: '#fff3c8' })
    if (u > SPL + 3.1) speech(x, t, 860, 300, C[2] + SPL + 3.1, 'aww', { size: 36, life: 1.4, col: BONE })
  } else if (i === 3) {
    danceFloor(x, t, false)
    const lead = 200 + ((u * 120) % 300)
    star(x, t, { sign: 'virgo', x: lead, y: 410, s: 140, mood: 'sparkle', seed: 2, hops: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => C[3] + k * 0.5) })
    for (let k = 0; k < 4; k++) star(x, t, { color: ['#ffd0a0', '#a0e0ff', '#ffb0d0', '#d0ffa0'][k], glyph: false, x: lead + 110 + k * 100, y: 420, s: 100, mood: 'happy', seed: 60 + k, raw: true, hops: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => C[3] + q * 0.5 + 0.1 * (k + 1)) })
  } else {
    danceFloor(x, t, false)
    const p = prog(t, C[4] + SPL, C[4] + SPL + 1.6), caughtIt = p >= 1
    star(x, t, { sign: 'virgo', x: 420, y: 400, s: 150, mood: caughtIt ? 'sparkle' : 'squint', seed: 2, hops: [C[4] + SPL + 1.5] })
    if (!caughtIt) bouquet(x, lerp(900, 440, p), 300 - 200 * Math.sin(p * Math.PI), 1, t * 5)
    const hand = prog(t, C[4] + SPL + 2.2, C[4] + SPL + 3.2)
    if (caughtIt) bouquet(x, lerp(470, 760, ease.inOutCubic(hand)), lerp(290, 330, hand), 1, 0.2)
    star(x, t, { sign: 'pisces', x: 820, y: 420, s: 140, mood: hand > 0.5 ? 'happy' : 'wide', tears: hand > 0.5 ? 3 : 2, seed: 6, hops: [C[4] + SPL + 3.3, C[4] + SPL + 3.8] })
    if (t > T.pay) hearts(x, t, 620, 250, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve04', thing: 'The wedding', stamp: '06·18·2016', accent: '#ff8fb1', ending: 'cut', hookTime: '10:45 PM',
  hook: { text: 'Single at a wedding. | *Ten years* apart.' },
  freeze: [REC],
  promise: 'Wait for | *the bouquet.*',
  chapters: [
    { time: '4 PM', title: 'THE VOWS' }, { time: '6 PM', title: 'THE SEATING CHART' }, { time: '7 PM', title: 'THE SPEECHES' },
    { time: '9 PM', title: 'THE DANCE FLOOR' }, { time: '11 PM', title: 'THE BOUQUET' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'two weddings, *ten years apart.*' },
    { t: 7.0, who: 'pisces', text: 'they said *“I do”* and I’m DONE' },
    { t: 11.3, who: 'pisces', text: 'ten years later. *still* crying at vows.' },
    { t: 16.4, who: 'stars', text: 'the cousin asks: *“so when’s yours?”*' },
    { t: 20.8, who: 'virgo', text: 'I made the name cards. *with jokes.*' },
    { t: 25.8, who: 'virgo', text: '(hiding behind *the flowers*)' },
    { t: 30.2, who: 'virgo', text: 'to my best friend: *you found your person.*' },
    { t: 35.2, who: 'stars', text: 'the wall: *very* supportive.' },
    { t: 39.6, who: 'virgo', text: 'singles: *CONGA LINE!*' },
    { t: 44.6, who: 'stars', text: 'the bouquet is *airborne.*' },
    { t: 48.8, who: 'virgo', text: 'got it. Pisces, *this is yours.*' },
    { t: 51.0, who: 'pisces', text: 'for ME?? *I’m sobbing!!*' },
    { t: 54.0, who: 'stars', text: 'the singles table *brought the party.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Singles table. | *Loudest* table.',
  music: { style: 'jazzy', key: 'F', seed: 5104 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['glitter', C[0] + 1.5, C[0] + 2.2], ['whoosh', C[4] + 0.4, 1.0, 0.04], ['tick', C[4] + 2.6, 0.06], ['whoosh', C[4] + SPL, 1.0, 0.04], ['pop', C[4] + SPL + 1.6, 1318.51, 0.04, 0], ['glitter', C[4] + SPL + 3.3, C[4] + SPL + 4.0]],
})
