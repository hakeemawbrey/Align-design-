// kxtve05 · Then vs Now: Extended · "Leo's Birthday: Sixty Guests vs Four" (60 s vertical, pop · A). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♌ Leo mid-blow over a giant cake, candles flaring, a crowd of sixty · NOW ♌ Leo mid-blow over one
//         cupcake, four friends leaning in. Slam "Leo's birthday: | *sixty* guests vs *four.*"
//   6.6   1 · THE INVITE     THEN the whole contact list · NOW one text to four, four replies in a minute
//  16.0   2 · THE ENTRANCE   THEN Leo arrives late to their own party under a spotlight · NOW the four surprise Leo
//  25.4   3 · THE CAKE       THEN sixty sing; Leo keeps checking the door for the crush · NOW four sing badly; Leo glows
//  34.8   4 · THE GIFTS      THEN a mountain of gifts, Leo checks the phone · NOW four handwritten cards; ♓ Pisces
//                            cries reading theirs out
//  44.2   5 · MIDNIGHT       THEN the room empties, crumbs, a "hbd" at 11:59 · NOW still on the floor with the four, 1 a.m.
//  57.9   last line "Fewer guests. | *Every one* stayed." → cut at 60.
import {
  makeThenNowX, star, room, couch, chatPanel, oldPhone, newPhone, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'

const C = T.ch, SPL = SPLIT
const CROWD_COLS = ['#ffd0a0', '#a0e0ff', '#ffb0d0', '#d0ffa0', '#e0c0ff', '#ffe08a', '#a0ffd8']
const FOUR = ['gemini', 'cancer', 'sagittarius', 'pisces']

function crowd(x, t, n, { y0 = 300, mood = 'happy', alpha = 1, hop = null } = {}) {
  const r = rng(17)
  for (let i = 0; i < n; i++) {
    const cx = r() * 1000, cy = y0 + r() * 120
    star(x, t, { color: CROWD_COLS[i % 7], glyph: false, x: cx, y: cy, s: 56 + r() * 20, mood, seed: 30 + i, raw: true, alpha, hops: hop ? [hop + r() * 0.6] : null })
  }
}
function partyRoom(x, t, old) {
  room(x, t, { wall: old ? '#7a4a5a' : '#4a3a6a', floor: old ? '#4a2a3a' : '#2e2448', old, win: false, lamp: false })
  for (let i = 0; i < 12; i++) { const bx = 40 + i * 85, by = 60 + 20 * Math.sin(t * 2 + i); x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 26, 32, 0, 0, TAU); x.fill(); x.fillStyle = CROWD_COLS[i % 7]; x.beginPath(); x.ellipse(bx, by, 22, 28, 0, 0, TAU); x.fill() }
  x.font = `800 40px ${INTER}`; x.fillStyle = old ? '#ffd35a' : '#ff8fb1'; x.textAlign = 'center'; x.fillText('HAPPY BIRTHDAY LEO', 500, 150)
}
function cake(x, t, cx, cy, big, lit) {
  if (big) {
    for (let k = 0; k < 3; k++) { const w = 380 - k * 90; R(x, INK, cx - w / 2 - 5, cy - 60 - k * 70, w + 10, 76); R(x, ['#ffb0d0', '#f4f0e6', '#ffb0d0'][k], cx - w / 2, cy - 56 - k * 70, w, 66) }
    for (let k = 0; k < 9; k++) candle(x, t, cx - 80 + k * 20, cy - 220, lit, 1.4)
  } else {
    R(x, INK, cx - 44, cy - 50, 88, 56); R(x, '#d08a5a', cx - 40, cy - 46, 80, 48); R(x, '#ffb0d0', cx - 46, cy - 76, 92, 34)
    candle(x, t, cx, cy - 80, lit, 1)
  }
}
function candle(x, t, cx, cy, lit, flare = 1) {
  R(x, INK, cx - 5, cy - 40, 10, 40); R(x, '#7fd0ff', cx - 3, cy - 38, 6, 36)
  if (lit > 0) { const f = (10 + 3 * Math.sin(t * 20 + cx)) * flare * lit; R(x, '#ffb03a', cx - f / 3, cy - 40 - f * 1.4, f / 1.5, f * 1.3); R(x, '#fff3a0', cx - f / 6, cy - 40 - f, f / 3, f * 0.8) }
}
function giftPile(x, t, cx, cy, n) {
  const r = rng(9)
  for (let i = 0; i < n; i++) { const w = 60 + r() * 50, gx = cx + (r() - 0.5) * 300, gy = cy - (i % 6) * 40 - Math.floor(i / 6) * 20; R(x, INK, gx - w / 2 - 4, gy - 44, w + 8, 48); R(x, CROWD_COLS[i % 7], gx - w / 2, gy - 40, w, 40); R(x, '#ffffff', gx - 4, gy - 40, 8, 40) }
}
function card(x, cx, cy, s, text, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -70, -50, 140, 100); R(x, '#fff8e6', -66, -46, 132, 92); R(x, PINK, -66, -46, 132, 14)
  x.font = `italic 600 20px 'EB Garamond'`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(text, 0, 12)
  x.restore()
}

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  partyRoom(x, t, true)
  if (i < 0) {
    crowd(x, t, 30, { y0: 220, mood: 'sparkle' })
    cake(x, t, 500, 560, true, 1.4)
    star(x, t, { sign: 'leo', x: 500, y: 250, s: 170, mood: 'wide', bangs: '#8a5a2a', seed: 8, squash: -0.14 })
    star(x, t, { sign: 'pisces', x: 880, y: 470, s: 110, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6 })
    return
  }
  if (i === 0) {
    oldPhone(x, 300, 360, 2.2, -0.05, '#eef2ff')
    const n = Math.min(214, Math.floor(u * 60))
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(`SEND TO ALL (${n})`, 300, 330)
    for (let k = 0; k < 6; k++) { const tt = (t * 1.5 + k / 6) % 1; R(x, '#7fb0ff', 360 + tt * 600, 300 - k * 30 + 40 * Math.sin(tt * 6), 60, 26) }
    star(x, t, { sign: 'leo', x: 640, y: 380, s: 160, mood: 'sparkle', bangs: '#8a5a2a', seed: 8, hops: [C[0] + 0.4, C[0] + 1.4, C[0] + 2.4] })
  } else if (i === 1) {
    crowd(x, t, 24, { y0: 320, mood: u > 1.5 ? 'happy' : 'neutral' })
    const k = pop01(t, C[1] + 0.6, 0.5, 2)
    x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff3c8'; x.beginPath(); x.moveTo(500, -20); x.lineTo(380, 520); x.lineTo(620, 520); x.fill(); x.restore()
    star(x, t, { sign: 'leo', x: 500, y: 330, s: 170 * k, mood: 'wink', bangs: '#8a5a2a', seed: 8, raw: false })
    speech(x, t, 760, 130, C[1] + 1.3, '9:47 PM', { size: 32, life: 2.6, col: '#ffd0d0' })
  } else if (i === 2) {
    crowd(x, t, 30, { y0: 260, mood: 'happy', hop: C[2] + 0.5 })
    cake(x, t, 400, 560, true, 1)
    const look = Math.floor(u * 1.2) % 2 ? [1, 0] : [0, 0]
    star(x, t, { sign: 'leo', x: 400, y: 260, s: 160, mood: 'neutral', look, bangs: '#8a5a2a', seed: 8 })
    R(x, INK, 840, 120, 140, 330); R(x, '#8a5a3a', 846, 126, 128, 324); R(x, GOLD, 950, 280, 14, 14)
    for (let k = 0; k < 5; k++) { const tt = (t * 0.7 + k / 5) % 1; drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: '#fff3c8' }, 200 + k * 120, 300 - tt * 220, 6, { alpha: 1 - tt }) }
  } else if (i === 3) {
    giftPile(x, t, 380, 520, 30)
    star(x, t, { sign: 'leo', x: 720, y: 380, s: 160, mood: 'neutral', look: [0, 1], bangs: '#8a5a2a', seed: 8 })
    oldPhone(x, 800, 420, 0.9, 0.2)
  } else {
    // the room empties; crumbs; the phone says hbd at 11:59
    crowd(x, t, 24, { y0: 320, alpha: 1 - prog(t, C[4], C[4] + 2.5) })
    for (let k = 0; k < 20; k++) R(x, '#d8a070', (k * 97) % 1000, 500 + (k * 37) % 90, 10, 8)
    star(x, t, { sign: 'leo', x: 500, y: 380, s: 160, mood: u > 2 ? 'neutral' : 'wide', bangs: '#8a5a2a', seed: 8 })
    if (u > 2.6) { oldPhone(x, 700, 360, 1.4, 0.1, '#eef2ff'); x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('hbd', 700, 352) }
    if (t > T.pay) star(x, t, { sign: 'pisces', x: 880, y: 470, s: 100, mood: 'sparkle', tears: 2, bangs: '#3a2a5a', seed: 6 })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  partyRoom(x, t, false)
  const four = (y, mood, opts = {}) => FOUR.forEach((sg, k) => star(x, t, { sign: sg, x: [140, 300, 700, 860][k], y, s: 130, mood: sg === 'pisces' ? 'sparkle' : mood, tears: sg === 'pisces' ? (opts.tears ?? 2) : 0, seed: 20 + k, hops: opts.hops ? opts.hops.map(h => h + k * 0.12) : null }))
  if (i < 0) {
    four(400, 'happy')
    cake(x, t, 500, 520, false, 1.2)
    star(x, t, { sign: 'leo', x: 500, y: 330, s: 160, mood: 'wide', seed: 8, squash: -0.12 })
    return
  }
  if (i === 0) {
    const n = u < SPL ? 0 : Math.min(4, Math.floor((u - SPL) / 0.7) + 1)
    chatPanel(x, 330, 300, 460, [{ text: 'small dinner at mine? just you four', me: true }, ...['YES', 'yes!!', 'I’ll bake', 'crying already'].slice(0, n).map(m => ({ text: m, me: false }))], { title: 'THE FOUR' })
    star(x, t, { sign: 'leo', x: 760, y: 380, s: 160, mood: n >= 4 ? 'sparkle' : 'happy', seed: 8, hops: [C[0] + SPL + 3.2] })
  } else if (i === 1) {
    const s = u > SPL + 0.3
    four(400, s ? 'sparkle' : 'neutral', { hops: s ? [C[1] + SPL + 0.3] : null })
    star(x, t, { sign: 'leo', x: 500, y: 360, s: 160, mood: s ? 'wide' : 'neutral', seed: 8, hops: [C[1] + SPL + 0.4] })
    if (s) speech(x, t, 500, 140, C[1] + SPL + 0.3, 'SURPRISE!!', { size: 44, life: 3.0, col: '#fff3c8', shake: 3 })
  } else if (i === 2) {
    four(420, 'happy', { hops: [C[2] + SPL + 0.4, C[2] + SPL + 1.4, C[2] + SPL + 2.4] })
    cake(x, t, 500, 520, false, 1)
    star(x, t, { sign: 'leo', x: 500, y: 330, s: 160, mood: u > SPL ? 'sparkle' : 'happy', seed: 8 })
    for (let k = 0; k < 6; k++) { const tt = (t * 0.7 + k / 6) % 1; drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: k % 2 ? '#ff8fb1' : '#9fe6b0' }, 150 + k * 140 + 20 * Math.sin(t * 9 + k), 300 - tt * 220, 6, { alpha: 1 - tt, rot: 0.3 * Math.sin(t * 7 + k) }) }
  } else if (i === 3) {
    four(430, 'happy', { tears: u > SPL + 1 ? 3 : 2 })
    FOUR.forEach((sg, k) => { if (u > SPL + 0.3 + k * 0.4) card(x, 260 + k * 160, 230, pop01(t, C[3] + SPL + 0.3 + k * 0.4, 0.3), ['you’re my sun', 'love you, loud one', 'happy b-day!!', 'I’m crying (P)'][k], -0.1 + k * 0.07) })
    star(x, t, { sign: 'leo', x: 500, y: 360, s: 150, mood: 'heart', seed: 8 })
  } else {
    // 1 a.m., on the floor, laughing
    R(x, '#3a2a5a', 0, 440, SW, SH - 440)
    FOUR.forEach((sg, k) => star(x, t, { sign: sg, x: [150, 320, 680, 850][k], y: 470, s: 120, mood: sg === 'pisces' ? 'sparkle' : 'happy', tears: sg === 'pisces' ? 3 : 0, seed: 20 + k, hops: [C[4] + SPL + 0.4 + k * 0.2, C[4] + SPL + 2 + k * 0.2, C[4] + SPL + 4 + k * 0.2] }))
    star(x, t, { sign: 'leo', x: 500, y: 450, s: 150, mood: 'happy', seed: 8, hops: [C[4] + SPL + 0.6, C[4] + SPL + 2.2] })
    x.font = `700 28px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('1:04 AM', 500, 240)
    if (t > T.pay) hearts(x, t, 500, 300, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve05', thing: 'Leo’s birthday', stamp: '08·08·2016', accent: GOLD, ending: 'cut', hookTime: '9:30 PM',
  hook: { text: 'Leo’s birthday: | *sixty* guests vs *four.*' },
  promise: 'Wait for | *midnight.*',
  chapters: [
    { time: '6 PM', title: 'THE INVITE' }, { time: '8 PM', title: 'THE ENTRANCE' }, { time: '9 PM', title: 'THE CAKE' },
    { time: '10 PM', title: 'THE GIFTS' }, { time: '12 AM', title: 'MIDNIGHT' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'Leo’s birthday, *ten years apart.*' },
    { t: 7.0, who: 'leo', text: 'inviting *everyone.* EVERYONE.' },
    { t: 11.3, who: 'leo', text: 'small dinner. *just you four.*' },
    { t: 16.4, who: 'leo', text: 'fashionably late to my *own* party.' },
    { t: 20.8, who: 'gemini', text: 'SURPRISE! *(we cooked)*' },
    { t: 25.8, who: 'stars', text: 'sixty sing. Leo watches *the door.*' },
    { t: 30.2, who: 'stars', text: 'four sing. *badly.* Leo glows.' },
    { t: 35.2, who: 'leo', text: 'so many gifts. …*did they text?*' },
    { t: 39.6, who: 'pisces', text: 'I wrote you a card and I’m *crying*' },
    { t: 44.6, who: 'leo', text: 'they said *“hbd.”* …that’s it.' },
    { t: 48.8, who: 'cancer', text: 'it’s 1 a.m. *nobody’s leaving.*' },
    { t: 51.0, who: 'leo', text: 'best birthday *ever.* seriously.' },
    { t: 54.0, who: 'stars', text: 'small party. *big* love.' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Fewer guests. | *Every one* stayed.',
  music: { style: 'pop', key: 'A', seed: 5105 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['glitter', 0.05, 0.8], ['pop', C[1] + SPL + 0.3, 1318.51, 0.05, 0], ['glitter', C[1] + SPL + 0.3, C[1] + SPL + 1.0], ['pop', C[4] + 2.6, 523.25, 0.035, 0]],
})
