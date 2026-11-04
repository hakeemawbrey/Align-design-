// nhve20: THEN vs NOW: HOLIDAYS, "The countdown in 2016 / 2026" (20 s, b18 #20, music: chiptune · D)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·31·2016"): ♌ Leo alone at the window at t = 0, the clock at 11:59:50. It
//             counts down, refreshing a chat with no reply. Next door everyone cheers "HAPPY NEW YEAR!!" (confetti);
//             Leo: "…happy new year, me." ♓ Pisces in the neighbour's window, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: a rooftop blanket, Leo and ♋ Cancer deep in talk. Cancer: "wait… what time is it?" The clock:
//             12:03. Both: "we MISSED it!" — and laugh. Pisces with cocoa, happy-sobbing.
//   12.8–15.6 THE STARS: "the best moments *don't need a clock.*"  Last line: "Missed midnight. *Worth it*."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, phone, clockFace, nightSky, mug, snowfall, RED, GREEN, CREAM, LIGHTS } from '../../nhve01/scenes/holkit.js'

const LEO = signStar('leo'), TAU = signStar('cancer')

function confetti(x, t, t0, cx, cy) {
  const tt = t - t0; if (tt < 0 || tt > 2.5) return
  for (let i = 0; i < 30; i++) { const a = (i / 30) * Math.PI * 2, v = 120 + (i % 5) * 40; R(x, LIGHTS[i % 5], cx + Math.cos(a) * v * tt, cy + Math.sin(a) * v * tt * 0.6 + 120 * tt * tt, 10, 14) }
}

// ── THEN: 2016
const A = { zero: 4.0, refresh: [0.6, 1.8, 3.0], cheer: 4.05, me: 4.8, sob: 4.4 }
function sceneA(x, t) {
  room(x, t, { now: false, wall: '#3a3a6a', wall2: '#44447a' })
  // the window onto the neighbour's party
  R(x, INK, 470, 120, 400, 380); R(x, '#5a2a6a', 476, 126, 388, 368)
  for (let i = 0; i < 8; i++) R(x, LIGHTS[i % 5], 490 + i * 46, 140, 12, 12)
  ;[['#e9b24a', 101], ['#38c4ec', 102]].forEach(([c, s], i) => drawStarChar(x, 560 + i * 120, 380, 110, t, { color: c, mood: t > A.cheer ? 'happy' : 'neutral', seed: s, hops: t > A.cheer ? [A.cheer, A.cheer + 0.5, A.cheer + 1] : [] }))
  pisces(x, t, 800, 380, 100, t > A.sob ? 3 : 1, { mood: t > A.sob ? 'happy' : 'neutral', look: [-1, 0], seed: 6, hops: t > A.cheer ? [A.cheer + 0.1] : [] })
  confetti(x, t, A.cheer, 670, 300)
  R(x, INK, 470, 310, 400, 8)
  // the countdown clock
  const left = Math.max(0, Math.ceil(10 * (1 - prog(t, 0, A.zero))))
  clockFace(x, 240, 230, left > 0 ? `11:59:${String(60 - left).padStart(2, '0')}` : '12:00:00', { size: 50, col: left > 0 ? '#ff6a3a' : '#ffd35a' })
  // ♌ Leo alone, refreshing
  const lH = [...A.refresh, A.me]
  drawStarChar(x, 260, 780, 230, t, { color: LEO.color, glyph: LEO.glyph, mood: t > A.me ? 'sleepy' : 'squint', look: t > A.cheer && t < A.me ? [1, -1] : [0, 1], seed: 4, hops: lH, zzz: false })
  bangs(x, starFrame(260, 780, 230, t, { hops: lH, seed: 4 }))
  const rf = A.refresh.some(v => t > v && t < v + 0.5)
  phone(x, 400, 900, { s: 0.85, text: rf ? '↻' : 'no reply', rot: 0.1 })
  speech(x, t, 670, 230, A.cheer, 'HAPPY NEW YEAR!!', { size: 40, tail: 0, life: 1.4, col: '#ffe36a' })
  speech(x, t, 270, 520, A.me, '…happy new\nyear, me.', { size: 40, tail: -1, life: 1.7, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { talk: [7.0, 7.7, 8.4, 9.1], what: 9.55, clock: 10.15, missed: 10.75, hug: 11.5 }
function sceneB(x, t) {
  nightSky(x, t, { col: '#1d2a5c', col2: '#25336a' })
  // rooftops + chimney
  R(x, INK, 0, 640, SW, 10); R(x, '#4a3a5a', 0, 650, SW, 420)
  for (let i = 0; i < 8; i++) R(x, '#55456a', i * 120, 700 + (i % 2) * 30, 60, 8)
  R(x, INK, 740, 520, 90, 130); R(x, '#8a4a3a', 746, 526, 78, 118)
  // the blanket
  R(x, INK, 110, 870, 640, 70); for (let i = 0; i < 8; i++) R(x, i % 2 ? '#e05a6a' : '#fff3e2', 116 + i * 79, 876, 79, 58)
  const ti = B.talk.filter(v => t >= v).length
  const lH = [...B.talk.filter((_, i) => i % 2 === 0), B.missed, B.hug], tH = [...B.talk.filter((_, i) => i % 2), B.what, B.missed + 0.05, B.hug]
  const surprised = t > B.clock && t < B.missed
  drawStarChar(x, 280, 790, 220, t, { color: LEO.color, glyph: LEO.glyph, mood: t > B.hug ? 'heart' : surprised ? 'wide' : t > B.missed ? 'happy' : ti % 2 ? 'happy' : 'sparkle', look: surprised ? [1, -1] : [1, 0], seed: 4, hops: lH })
  scarf(x, starFrame(280, 790, 220, t, { hops: lH, seed: 4 }), '#ffd35a')
  drawStarChar(x, 560, 790, 220, t, { color: TAU.color, glyph: TAU.glyph, mood: t > B.hug ? 'heart' : surprised || (t > B.what && t < B.clock) ? 'wide' : t > B.missed ? 'happy' : ti % 2 ? 'sparkle' : 'happy', look: surprised ? [-1, -1] : [-1, 0], seed: 2, hops: tH })
  beanie(x, starFrame(560, 790, 220, t, { hops: tH, seed: 2 }), GREEN)
  mug(x, t, 420, 900, { col: '#ff8fb1', s: 0.7 })
  pisces(x, t, 790, 470, 100, t > B.missed ? 3 : 2, { mood: t > B.missed ? 'happy' : 'sparkle', look: [-1, 1], seed: 6 })
  // little talk bubbles
  const icons = [['R.R.R'], ['..R..', '.RRR.', 'RRRRR', '.RRR.', '..R..'], ['RR.RR', 'RRRRR', '.RRR.', '..R..'], ['R.R.R']]
  B.talk.forEach((v, i) => { const k = pop01(t, v, 0.24, 2.4) * outK(t, [v + 0.55, v + 0.7]); if (k > 0.02) { const bx = i % 2 ? 560 : 290; R(x, INK, bx - 56 * k, 520 - 46 * k, 112 * k, 92 * k); R(x, '#fffaf0', bx - 50 * k, 520 - 40 * k, 100 * k, 80 * k); drawBits(x, icons[i], { R: [INK, PINK, '#ff4f86', '#7a5cc0'][i] }, bx, 520, 9 * k, { outline: null }) } })
  clockFace(x, 430, 250, t < B.clock ? '11:58 PM' : '12:03 AM', { size: 48, col: t < B.clock ? '#ff4f6a' : '#ffd35a', k: pop01(t, B.clock - 0.6, 0.3) * (t > B.clock && t < B.clock + 0.3 ? 1.15 : 1) })
  speech(x, t, 560, 500, B.what, 'wait… what\ntime is it?', { size: 36, tail: 1, life: 0.6, col: '#e9fff0' })
  speech(x, t, 420, 500, B.missed, 'we MISSED it!', { size: 46, tail: 0, life: 1.4, col: '#ffe36a' })
  if (t > B.hug) hearts(x, t, 420, 660, B.hug, { n: 7, life: 1.4, cell: 6, spread: 300 })
  snowfall(x, t, { n: 16, seed: 8, alpha: 0.7 })
}

const EP = makeThenNow({
  id: 'nhve20', thing: 'The countdown in', then: '2016', stamp: '12·31·2016', accent: '#ffd35a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: counting down *with no one.*' },
    { t: 7.4, text: '2026: too busy talking to *count.*' },
    { t: 12.92, text: 'the best moments *don’t need a clock.*' },
  ],
  last: 'Missed midnight. | *Worth it*.',
  cues: () => [
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(i * 0.4), 0.04]), ...A.refresh.map(v => ['pop', v, 523.25, 0.02, -0.3]),
    ['bell', A.cheer, 2093, 0.03, 1.0, 0.3], ['glitter', A.cheer, r3(A.cheer + 0.6)], ['pop', A.cheer, 1318.51, 0.04, 0.3], ['pop', A.me, 440, 0.03, -0.3],
    ...B.talk.map((v, i) => ['pop', v, 880 + (i % 2) * 220, 0.03, i % 2 ? 0.3 : -0.3]),
    ['pop', B.what, 659.25, 0.03, 0.3], ['tick', B.clock, 0.08], ['pop', B.clock, 1567.98, 0.04, 0], ['pop', B.missed, 1174.66, 0.05, 0], ['glitter', B.missed, r3(B.missed + 0.4)],
    ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
