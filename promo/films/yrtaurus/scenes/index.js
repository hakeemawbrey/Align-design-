// yrtaurus: THEN vs NOW, "Taurus dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now, Block A #2, music: pop · D)
// The format's look lives in ./thennow.js (identical in yraries, yrtaurus, yrgemini, yrcancer, yrleo).
//   0–6.71    2016, the same diner booth, three dates in a row (old-phone grade, "03·05·2016"). The wall calendar flips
//             DATE 1 → DATE 2 → DATE 3. ♉ Taurus: "the usual." · fries. "the usual." · fries. By date three the waiter
//             slides the fries in before anyone asks; Taurus goes heart-eyed (at the fries). ♏ Scorpio: "…again?"
//             The empty baskets stack up. ♓ Pisces cries at the counter (it's beautiful, the loyalty).
//   6.71      card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the same booth, brighter. Waiter: "the usual?" Taurus: "two usuals." … "theirs: no pickles, extra
//             sauce." Scorpio double-takes, "you remembered?" Taurus slides over the biggest fry. Hearts.
//   12.8–15.6 the 2016 polaroid next to 2026; THE STARS: "routine, but make it *for two.*"; last "*Loyal* to the fries."
import {
  makeThenNow, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3,
  INK, BONE, GOLD, PINK, MONO, HEART, SW, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const TAU = signStar('taurus'), SCO = signStar('scorpio')
const WAIT = '#c9a6ff'
const FRY_BASKET = ['.Y.Y.YY.Y.', 'YYYYYYYYYY', 'YYYYYYYYYY', 'RRRRRRRRRR', 'RWRWRWRWRR', '.RRRRRRRR.']
const BCOLS = { Y: '#ffd35a', R: '#e0453a', W: '#fff4dc' }
const EMPTY = ['RRRRRRRRRR', 'RWRWRWRWRR', '.RRRRRRRR.']
const SAUCE = ['.WWWW.', 'WSSSSW', 'WSSSSW', '.WWWW.']

function diner(x, t, now) {
  R(x, now ? '#3d6f86' : '#6e3438', 0, 0, SW, 600)
  R(x, now ? '#ffd9e6' : '#d7b48c', 0, 380, SW, 220)
  for (let i = 0; i < 15; i++) R(x, i % 2 ? (now ? '#fffaf0' : '#e9d3b0') : (now ? '#ff7aa8' : '#9a3a34'), i * 60, 540, 60, 30)
  R(x, INK, 0, 534, SW, 6); R(x, INK, 0, 570, SW, 6)
  // the window (top right): night outside
  R(x, INK, 520, 80, 340, 260); R(x, now ? '#1f2a5c' : '#2a2140', 528, 88, 324, 244)
  for (let i = 0; i < 9; i++) R(x, '#fff1c8', 540 + ((i * 97) % 300), 100 + ((i * 53) % 210), 4, 4)
  R(x, INK, 686, 88, 8, 244)
  // floor
  R(x, now ? '#e7d8c4' : '#a8805a', 0, 600, SW, 460)
  for (let j = 0; j < 8; j++) for (let i = 0; i < 15; i++) if ((i + j) % 2) R(x, now ? '#2b2348' : '#5a3a2a', i * 64 - 10, 600 + j * 64, 64, 64)
}
function calendar(x, t, label, flip) {
  x.save(); x.translate(180, 210); x.rotate(-0.03)
  R(x, INK, -110, -120, 220, 230); R(x, '#fffaf0', -104, -114, 208, 218); R(x, '#e0453a', -104, -114, 208, 56)
  R(x, INK, -60, -132, 12, 30); R(x, INK, 48, -132, 12, 30)
  const s = flip > 0 && flip < 1 ? Math.abs(Math.cos(Math.PI * flip)) : 1
  x.scale(1, s)
  x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(label[0], 0, -10); x.font = `700 70px ${MONO}`; x.fillText(label[1], 0, 58)
  x.restore()
}
function booth(x, now) {
  for (const sx of [30, 680]) { R(x, INK, sx - 6, 590, 202, 330); R(x, now ? '#ff6f9c' : '#b0302f', sx, 596, 190, 318); for (let i = 1; i < 4; i++) R(x, now ? '#e55a88' : '#8e2626', sx + i * 47, 600, 6, 300) }
}
function tabletop(x, now) {
  R(x, INK, 220, 840, 460, 34); R(x, now ? '#fffaf0' : '#e0c49a', 226, 846, 448, 22)
  R(x, INK, 432, 874, 36, 186); R(x, now ? '#b8a7d8' : '#8a6a4a', 438, 874, 24, 186)
}

// ── THEN: three dates, one booth
const A = { d: [0.65, 2.45, 4.2], usual: [1.15, 2.95], fries: [1.85, 3.6, 4.5], waiterSays: 4.6, heart: 4.95, again: 5.45 }
function sceneA(x, t) {
  diner(x, t, false)
  const di = t < A.d[1] ? 0 : t < A.d[2] ? 1 : 2
  const fl = di > 0 ? prog(t, A.d[di] - 0.15, A.d[di] + 0.15) : 0
  calendar(x, t, ['DATE', String(fl < 0.5 && di > 0 ? di : di + 1)], fl)
  // ♓ at the counter in the back, crying at the loyalty
  R(x, INK, 300, 470, 200, 20); R(x, '#d0573f', 304, 474, 192, 12)
  pisces(x, t, 400, 430, 100, di === 2 ? 3 : di === 1 ? 2 : 1, { mood: di === 2 ? 'sparkle' : 'neutral', look: [0, 1], seed: 6 })
  booth(x, false)
  // the waiter (date three: there before anyone asks)
  for (let i = 0; i < 3; i++) {
    const a = A.fries[i] - (i === 2 ? 0.55 : 0.45)
    const k = prog(t, a, a + 0.35), o = prog(t, A.fries[i] + 0.25, A.fries[i] + 0.6)
    if (k <= 0 || o >= 1) continue
    const wx = lerp(1000, 450, ease.outCubic(k)) + lerp(0, 600, ease.inCubic(o))
    drawStarChar(x, wx, 640, 140, t, { color: WAIT, mood: i === 2 ? 'wink' : 'neutral', look: [-1, 1], seed: 21 + i })
  }
  const sm = di === 0 ? 'happy' : di === 1 ? 'squint' : 'eyeroll'
  drawStarChar(x, 650, 730, 240, t, { color: SCO.color, glyph: SCO.glyph, mood: t > A.again ? 'squint' : sm, look: [-1, 0], seed: 9, hops: [A.again] })
  const th = [A.usual[0], A.usual[1], A.heart]
  drawStarChar(x, 250, 730, 240, t, { color: TAU.color, glyph: TAU.glyph, mood: t > A.heart ? 'heart' : 'happy', look: [1, 1], seed: 4, hops: th })
  tabletop(x, false)
  // the old chunky phone, face down… then face up
  R(x, INK, 590, 820, 70, 26); R(x, '#4a4652', 595, 824, 60, 18)
  // baskets: the stack of empties grows each date
  for (let i = 0; i < di; i++) drawBits(x, EMPTY, BCOLS, 320, 828 - i * 22, 8)
  const fk = pop01(t, A.fries[di], 0.3, 2.2)
  if (t > A.fries[di]) drawBits(x, FRY_BASKET, BCOLS, 400, 806 - di * 10, 9 * fk)
  speech(x, t, 230, 460, A.usual[0], 'the usual.', { size: 40, tail: -1, life: 1.1 })
  speech(x, t, 230, 460, A.usual[1], 'the usual.', { size: 40, tail: -1, life: 1.0 })
  speech(x, t, 520, 470, A.waiterSays, 'the usual!', { size: 40, tail: 0, life: 0.85, col: '#efe4ff' })
  speech(x, t, 680, 480, A.again, '…again?', { size: 44, tail: 1, life: 1.2 })
  if (t > A.heart) hearts(x, t, 330, 640, A.heart, { n: 4, life: 1.4, cell: 5, spread: 120 })
}

// ── NOW: same booth, they know your order
const B = { waiter: 7.15, usual: 7.4, two: 8.0, theirs: 8.75, remember: 10.1, fry: [10.9, 11.4], hearts: 11.45 }
function sceneB(x, t) {
  diner(x, t, true)
  calendar(x, t, ['DATE', '∞'], 0)
  R(x, INK, 300, 470, 200, 20); R(x, '#ff6f9c', 304, 474, 192, 12)
  pisces(x, t, 400, 430, 100, t > B.remember ? 3 : 1, { mood: t > B.remember ? 'happy' : 'sparkle', look: [0, 1], seed: 6 })
  booth(x, true)
  // the waiter with a notepad, writing
  const wk = prog(t, B.waiter, B.waiter + 0.4), wo = prog(t, B.theirs + 1.4, B.theirs + 1.8)
  if (wk > 0 && wo < 1) {
    const wx = lerp(1000, 455, ease.outCubic(wk)) + lerp(0, 600, ease.inCubic(wo))
    drawStarChar(x, wx, 630, 140, t, { color: WAIT, mood: t > B.theirs ? 'wide' : 'happy', look: [-1, 1], seed: 21, hops: [B.usual] })
    R(x, INK, wx + 46, 600, 44, 56); R(x, '#fffaf0', wx + 50, 604, 36, 48)
    for (let i = 0; i < 4; i++) if (t > B.two + i * 0.35) R(x, '#7a5cc4', wx + 55, 612 + i * 10, 26, 3)
  }
  let sm = 'happy', sl = [-1, 0]
  if (t > B.theirs + 0.3) { sm = 'wide'; sl = [-1, 0] }
  if (t > B.remember + 0.6) { sm = 'heart'; sl = undefined }
  drawStarChar(x, 650, 730, 240, t, { color: SCO.color, glyph: SCO.glyph, mood: sm, look: sl, seed: 9, hops: [B.theirs + 0.3, B.remember, B.hearts] })
  drawStarChar(x, 250, 730, 240, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.fry[1] ? 'heart' : 'happy', look: [1, 0], seed: 4, hops: [B.two, B.theirs, B.theirs + 0.4, B.fry[0]] })
  tabletop(x, true)
  // two baskets + a sauce cup (theirs)
  const fk = pop01(t, B.theirs + 1.1, 0.3, 2.2)
  if (t > B.theirs + 1.1) { drawBits(x, FRY_BASKET, BCOLS, 330, 806, 9 * fk); drawBits(x, FRY_BASKET, BCOLS, 560, 806, 9 * fk); drawBits(x, SAUCE, { W: '#fff4dc', S: '#e0453a' }, 640, 826, 7 * fk) }
  // the biggest fry slides over
  if (t > B.fry[0]) {
    const k = ease.inOutCubic(prog(t, ...B.fry)), lift = Math.sin(Math.PI * k) * 60
    x.save(); x.translate(lerp(350, 520, k), 740 - lift); x.rotate(-0.5 + 0.3 * k)
    R(x, INK, -14, -70, 28, 140); R(x, '#ffd35a', -9, -65, 18, 130); R(x, '#ffe98a', -9, -65, 6, 130)
    x.restore()
    sparkles(x, t, 520, 720, B.fry[1], 8, 70, 1, [GOLD, BONE], 20)
  }
  speech(x, t, 520, 470, B.usual, 'the usual?', { size: 40, tail: 0, life: 0.8, col: '#efe4ff' })
  speech(x, t, 240, 470, B.two, 'two usuals.', { size: 40, tail: -1, life: 0.85 })
  speech(x, t, 290, 450, B.theirs, 'theirs: no pickles,\nextra sauce.', { size: 38, tail: -1, life: 1.95, col: '#fffaf0' })
  speech(x, t, 670, 470, B.remember, 'you remembered?', { size: 38, tail: 1, life: 1.5, col: '#ffe1ec' })
  if (t > B.hearts) hearts(x, t, 450, 640, B.hearts, { n: 8, life: 1.8, cell: 6, spread: 360, seed: 2 })
}

const EP = makeThenNow({
  id: 'yrtaurus', thing: 'Taurus dating in', then: '2016', stamp: '03·05·2016', accent: '#ffc24a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: one booth. *every* date.' },
    { t: 9.15, text: 'same booth. now they know *your* order.' },
    { t: 12.92, text: 'routine, but make it *for two.*' },
  ],
  last: '*Loyal* to | the fries.',
  cues: () => [
    ...A.d.slice(1).map(d => ['whoosh', r3(d - 0.15), 0.25, 0.03]), ...A.d.slice(1).map(d => ['tick', d, 0.05]),
    ['pop', A.usual[0], 783.99, 0.035, -0.3], ['pop', A.usual[1], 783.99, 0.035, -0.3],
    ...A.fries.map((f, i) => ['pop', f, 1046.5 + i * 130, 0.04, 0]),
    ['pop', A.waiterSays, 1174.66, 0.035, 0.2], ['pluck', A.heart, 1567.98, 0.04, 0.5, -0.2], ['pop', A.again, 659.25, 0.035, 0.4],
    ['whoosh', B.waiter, 0.3, 0.03], ['pop', B.usual, 1046.5, 0.035, 0.2], ['pop', B.two, 880, 0.035, -0.3],
    ['pop', B.theirs, 783.99, 0.035, -0.3], ...[0, 1, 2, 3].map(i => ['tick', r3(B.two + i * 0.35), 0.02]),
    ['pop', r3(B.theirs + 1.1), 1046.5, 0.04, 0], ['pop', B.remember, 1318.51, 0.04, 0.4],
    ['whoosh', B.fry[0], 0.4, 0.03], ['pluck', B.fry[1], 1567.98, 0.045, 0.5, 0], ['glitter', B.hearts, r3(B.hearts + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
