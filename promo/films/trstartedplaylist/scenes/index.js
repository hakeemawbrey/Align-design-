// trstartedplaylist: HOW IT STARTED vs HOW IT'S GOING, "Track one, forever." (20 s vertical, Star Talk Trends §6,
// music: dreamy · Ab). The format's look lives in ./started.js (identical in all five tr-started films).
//   0–6.6     HOW IT STARTED (a park bench, dusk): ♒ Aquarius and ♎ Libra sit a polite distance apart. "…want one?"
//             One wired earbud each, and the wire is SHORT: Libra gets yanked over, shoulder to shoulder. A little
//             player reads TRACK 01 / 01, "song for a bench". Two stiff stares ahead, two sneaky glances, the second one
//             caught. ♓ Pisces, behind the hedge, weeps at the music. THE STARS: "one song. one wire. *zero* personal space."
//   6.6       card cut.
//   6.6–12.3  HOW IT'S GOING (same bench, fairy lights, same wired earbuds): a playlist called "us ♡" so long the scroll
//             bar thumb is a sliver; it scrolls and scrolls through made-up song titles… "add one more?" "always." Then it
//             whooshes back to the top: 01 "song for a bench" glows. ♓ Pisces on the next bench sobs into their own
//             headphones. THE STARS: "they never skip *track one.*"
//   12.3–15.6 the two photos side by side. Last line: "Track *one*, forever."
import { lerp, prog, ease } from '../../../src/lib.js'
import {
  makeStarted, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, pop01, r3,
  INK, BONE, GOLD, PINK, MONO, INTER, HEART,
} from './started.js'

const AQU = signStar('aquarius'), LIB = signStar('libra')
const NOTE_BM = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']

function park(x, t, now) {
  const g = x.createLinearGradient(0, 0, 0, 560)
  g.addColorStop(0, now ? '#3a2a6e' : '#4a4a6a'); g.addColorStop(1, now ? '#c76f8f' : '#8a7a7a')
  x.fillStyle = g; x.fillRect(0, 0, 820, 560)
  // trees + hedge
  for (const [tx, ty, r] of [[60, 300, 120], [760, 280, 110]]) { R(x, INK, tx - 14, ty, 28, 300); R(x, '#4a3226', tx - 9, ty, 18, 300); R(x, INK, tx - r, ty - r, 2 * r, r * 1.3); R(x, now ? '#3d7a5a' : '#4a5e50', tx - r + 6, ty - r + 6, 2 * r - 12, r * 1.3 - 12) }
  R(x, INK, 560, 470, 270, 110); R(x, now ? '#4f8a62' : '#566a58', 566, 476, 258, 104)
  R(x, now ? '#3a5e48' : '#3e4a40', 0, 560, 820, 260); R(x, INK, 0, 556, 820, 6)
  if (now) for (let i = 0; i < 12; i++) {
    const lx = 30 + i * 66, ly = 70 + 26 * Math.sin((i / 11) * Math.PI)
    x.save(); x.globalAlpha = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.3); R(x, [GOLD, PINK, '#9fe6ff'][i % 3], lx - 6, ly - 6, 12, 14); x.restore()
  }
}
function bench(x) {
  R(x, INK, 110, 470, 470, 26); R(x, '#a8673a', 116, 474, 458, 18)
  R(x, INK, 110, 560, 470, 26); R(x, '#b97845', 116, 564, 458, 18)
  for (const lx of [140, 530]) { R(x, INK, lx, 586, 22, 120); R(x, '#5a3a26', lx + 4, 586, 14, 116) }
}
function wire(x, a, b, phone) {
  x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(phone[0], phone[1] - 20); x.lineTo(b[0], b[1]); x.stroke()
  x.strokeStyle = '#f4efe6'; x.lineWidth = 3
  x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(phone[0], phone[1] - 20); x.lineTo(b[0], b[1]); x.stroke()
  R(x, INK, phone[0] - 22, phone[1] - 24, 44, 70); R(x, '#2a2050', phone[0] - 18, phone[1] - 20, 36, 62)
}
function notes(x, t, cx, cy, t0, n = 4) {
  for (let i = 0; i < n; i++) {
    const tt = ((t - t0 + i * 0.6) % 2.4 + 2.4) % 2.4
    if (t < t0) return
    const p = tt / 2.4
    drawBits(x, NOTE_BM, { N: i % 2 ? GOLD : BONE }, cx + Math.sin(p * 6 + i) * 60 + (i - 1.5) * 50, cy - p * 200, 5, { alpha: Math.sin(Math.PI * p) })
  }
}

// ── A: one song
const A = { offer: 1.0, take: 1.75, yank: [2.25, 2.55], play: 2.7, g1: [3.55, 3.95], g2: [4.55, 5.2], caught: 4.75 }
function player(x, t, n, total) {
  x.save(); x.translate(640, 110)
  R(x, INK, -150, -76, 300, 152); R(x, '#fffaf0', -144, -70, 288, 140)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#7a5cc4'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(`TRACK 0${n} / 0${total}`, -126, -44)
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.fillText('song for a bench', -126, -6)
  const p = prog(t, A.play, 12)
  R(x, INK, -126, 30, 252, 12); R(x, '#e0457b', -126, 30, 252 * p, 12); R(x, INK, -126 + 252 * p - 6, 26, 12, 20)
  x.restore()
}
function sceneA(x, t) {
  park(x, t, false)
  // ♓ Pisces behind the hedge, crying at the song
  x.save(); x.beginPath(); x.rect(0, 0, 820, 480); x.clip()
  pisces(x, t, 700, 470 - 60 * ease.outCubic(prog(t, 2.9, 3.4)), 130, t > A.caught ? 3 : 2, { mood: 'sparkle', look: [-1, 0] })
  x.restore()
  R(x, INK, 560, 470, 270, 110); R(x, '#566a58', 566, 476, 258, 104)
  bench(x)
  const yank = ease.outBack(prog(t, ...A.yank))
  const lx = lerp(200, 300, yank), ax = 470
  const g1 = Math.sin(Math.PI * prog(t, ...A.g1)), g2 = prog(t, ...A.g2)
  const look = g1 > 0.3 || (g2 > 0.1 && g2 < 1) ? 1 : 0
  let lm = 'neutral', am = 'happy'
  if (t > A.yank[0]) { lm = 'wide'; am = 'wide' }
  if (t > A.play + 0.3) { lm = 'neutral'; am = 'neutral' }
  if (t > A.caught) { lm = 'happy'; am = 'happy' }
  drawStarChar(x, lx, 450, 200, t, { color: LIB.color, glyph: LIB.glyph, mood: lm, look: look ? [1, 0] : [0, 0], hops: [A.take, A.yank[0]], seed: 3, squash: t > A.yank[0] && t < A.yank[1] + 0.1 ? -0.12 : 0, blush: t > A.yank[1] ? 1 : 0 })
  drawStarChar(x, ax, 450, 200, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: look ? [-1, 0] : [0, 0], hops: [A.offer, A.caught], seed: 7, blush: t > A.yank[1] ? 1 : 0 })
  wire(x, [lx + 60, 420], [ax - 60, 420], [(lx + ax) / 2, 520 + 30 * (1 - yank)])
  speech(x, t, ax + 20, 270, A.offer, '…want one?', { size: 30, life: 0.9, tail: 1 })
  speech(x, t, lx, 270, A.yank[1], 'oh. short wire.', { size: 30, life: 1.0, tail: -1 })
  if (t > A.yank[0] && t < A.yank[1] + 0.3) { x.save(); x.globalAlpha = 1 - prog(t, A.yank[1], A.yank[1] + 0.3); for (let i = 0; i < 3; i++) R(x, BONE, lx - 150 - i * 30, 420 + i * 22, 70, 6); x.restore() }
  if (t > A.play) { player(x, t, 1, 1); notes(x, t, (lx + ax) / 2, 330, A.play) }
  if (t > A.caught) sparkles(x, t, (lx + ax) / 2, 380, A.caught, 8, 90, 1, [PINK, GOLD, BONE], 20)
}

// ── B: the playlist
const TITLES = ['song for a bench', 'the short wire', 'rainy bus stop', 'your laugh (remix)', 'long drive home', 'the one you sing wrong',
  'tuesday for no reason', 'hum this in the car', 'slow dance in socks', 'kitchen at midnight', 'birthday, again', 'that bench, part 2']
const B = { scroll: [7.0, 9.6], add: 7.35, always: 8.1, back: [9.8, 10.3], glow: 10.35 }
function playlist(x, t) {
  const pk = pop01(t, 6.75, 0.35, 2)
  if (pk <= 0.01) return
  x.save(); x.translate(600, 200); x.scale(pk, pk)
  const W = 370, H = 300, rowH = 42
  R(x, INK, -W / 2 - 6, -H / 2 - 6, W + 12, H + 12); R(x, '#fffaf0', -W / 2, -H / 2, W, H)
  R(x, '#7a5cc4', -W / 2, -H / 2, W, 50)
  x.font = `800 26px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('us ♡', -W / 2 + 18, -H / 2 + 26)
  x.font = `700 16px ${MONO}`; x.textAlign = 'right'; x.fillText('∞ SONGS', W / 2 - 40, -H / 2 + 27)
  // scroll position: rows scrolled (accelerates), then whoosh back to the top
  const sp = ease.inCubic(prog(t, ...B.scroll)) * 60 + 2 * Math.max(0, t - B.scroll[1]) * 0
  const scrolled = sp * (1 - ease.inOutCubic(prog(t, ...B.back)))
  x.save(); x.beginPath(); x.rect(-W / 2, -H / 2 + 50, W - 30, H - 50); x.clip()
  const first = Math.floor(scrolled), off = (scrolled - first) * rowH
  for (let r = 0; r < 8; r++) {
    const i = first + r, y = -H / 2 + 50 + r * rowH - off
    const hot = i === 0 && t > B.glow
    if (hot) { R(x, '#ffe1ec', -W / 2, y, W - 30, rowH) }
    R(x, '#ece2cc', -W / 2 + 10, y + rowH - 2, W - 50, 2)
    x.font = `700 18px ${MONO}`; x.fillStyle = '#9a8fb8'; x.textAlign = 'left'; x.fillText(String(i + 1).padStart(2, '0'), -W / 2 + 14, y + rowH / 2)
    x.font = `${hot ? 800 : 700} 22px ${INTER}`; x.fillStyle = hot ? '#e0457b' : INK; x.fillText(TITLES[i % TITLES.length] + (i >= TITLES.length ? ` (${Math.floor(i / TITLES.length) + 1})` : ''), -W / 2 + 58, y + rowH / 2 + 1)
    if (hot) { x.font = `700 15px ${MONO}`; x.textAlign = 'right'; x.fillText('★ ON REPEAT', W / 2 - 40, y + rowH / 2) }
  }
  x.restore()
  // the scroll bar: a long track, a sliver of a thumb
  R(x, '#e6dcf6', W / 2 - 24, -H / 2 + 56, 16, H - 62)
  const thumb = clamp01(scrolled / 60)
  R(x, INK, W / 2 - 24, -H / 2 + 56 + thumb * (H - 74), 16, 12); R(x, '#7a5cc4', W / 2 - 22, -H / 2 + 58 + thumb * (H - 74), 12, 8)
  x.restore()
}
const clamp01 = v => Math.max(0, Math.min(1, v))
function sceneB(x, t) {
  park(x, t, true)
  bench(x)
  notes(x, t, 300, 340, 6.8, 4)
  playlist(x, t)
  // ♓ Pisces on the next bench, own headphones, sobbing
  R(x, INK, 610, 560, 200, 22); R(x, '#b97845', 616, 563, 188, 14)
  pisces(x, t, 710, 520, 140, 3, { mood: t > B.glow ? 'happy' : 'sparkle', look: [-1, 0], hops: [B.glow + 0.1] })
  R(x, INK, 652, 450, 12, 40); R(x, INK, 756, 450, 12, 40); R(x, INK, 656, 440, 108, 8)
  const lx = 290, ax = 460
  const m = t > B.glow ? 'heart' : 'happy'
  drawStarChar(x, lx, 450, 200, t, { color: LIB.color, glyph: LIB.glyph, mood: m, look: [1, -1], hops: [B.add, B.glow], seed: 3, glow: 1.2 })
  drawStarChar(x, ax, 450, 200, t, { color: AQU.color, glyph: AQU.glyph, mood: t > B.always ? 'sparkle' : 'happy', look: [-1, -1], hops: [B.always, B.glow + 0.1], seed: 7, glow: 1.2 })
  wire(x, [lx + 60, 420], [ax - 60, 420], [(lx + ax) / 2, 520])
  speech(x, t, lx - 30, 280, B.add, 'add one more?', { size: 28, life: 0.72, tail: -1 })
  speech(x, t, ax - 120, 300, B.always, 'always.', { size: 32, life: 1.0, tail: 1, col: '#ffe1ec' })
  if (t > B.glow) hearts(x, t, (lx + ax) / 2, 360, B.glow, { n: 6, life: 1.8, cell: 6, spread: 200 })
  sparkles(x, t, 520, 100, B.glow, 10, 120, 1, [HEART, GOLD, BONE], 20)
}

const EP = makeStarted({
  id: 'trstartedplaylist', accent: '#c9a6ff',
  A: { draw: sceneA, stamp: 'DATE 1', sub: 'one song. one wire.' },
  B: { draw: sceneB, stamp: 'NOW', sub: 'it needs a scroll bar now.' },
  lines: [{ t: 2.95, text: 'one song. one wire. *zero* personal space.' }, { t: 9.3, text: 'they never skip *track one.*' }],
  last: 'Track *one*, forever.',
  cues: () => [
    ['pop', A.offer, 784, 0.035, 0.3], ['pop', A.take, 988, 0.03, -0.3],
    ['whoosh', A.yank[0], 0.3, 0.035], ['tom', A.yank[1], 180, { gain: 0.15, decay: 0.12 }], ['pop', A.yank[1] + 0.05, 1174.66, 0.03, -0.3],
    ['bell', A.play, 1396.91, 0.025, 1.0, 0], ['tick', A.g1[0], 0.03], ['tick', A.g1[1] - 0.1, 0.03],
    ['tick', A.g2[0], 0.03], ['pluck', A.caught, 1567.98, 0.035, 0.5, 0], ['glitter', A.caught, A.caught + 0.4],
    ['pop', B.add, 880, 0.035, -0.3], ['pop', B.always, 1174.66, 0.035, 0.3],
    ...Array.from({ length: 16 }, (_, i) => ['tick', r3(B.scroll[0] + 2.6 * Math.sqrt(i / 16)), 0.015 + i * 0.0012]),
    ['whoosh', B.back[0], 0.5, 0.04], ['pop', B.glow, 1396.91, 0.04, 0], ['bell', B.glow + 0.05, 2093, 0.03, 1.1, 0], ['glitter', B.glow, B.glow + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
