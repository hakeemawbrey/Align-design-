// kfbe20: FIRST DATE BINGO E20 (long), "Blackout: the date that just went right" (vertical, star_talk post, dreamy · F).
// No end card, no card transition; LOOP ending: the film ends on the full card under the lamp post, which is frame 0.
//   0.0   frame 0: the whole 4×4 card mid-flash, every square stamped; ♎ Libra and ♒ Aquarius mid-laugh under a lamp
//         post in the snow. Hook: "Watch the *whole* | card fill."  1.3 REWIND ◂◂ to 6:00 PM: the card empties.
//   ① THE COCOA (4)     ON TIME (6) · "what made you smile this week?" → ASKED A REAL QUESTION (10) · LISTENED TO
//                        THE ANSWER (14)
//   ② THE WALK (18)     MATCHED WALKING PACE (21) · a dog in a tiny sweater → LAUGHED AT THE SAME THING (25) · NO PHONES (29)
//   ③ THE COLD (32)     SHARED A SCARF (35) · NOTICED THEY WERE COLD (38) · "I’m a bit nervous." → SAID "I’M NERVOUS" (43)
//   ④ THE BENCH (46)    POINTED OUT THE MOON (49) · SHARED SOMETHING REAL (53) · COMFORTABLE QUIET (57)
//   ⑤ THE DOORSTEP (60) SAID "I HAD FUN" FIRST (62) · ASKED BEFORE A HUG (66) · PLANNED DATE 2 (70) · a text:
//                        "got home safe?" → TEXTS "GOT HOME SAFE?" (74) → BLACKOUT (74.25)
//   76    "No big moment. | *Just all the small ones.*" · 79.6–80 loop into frame 0.
import { makeBingo, drawCard, star, label, shadow, hearts, bench, park, snowfall, drawBits, R, box, glow, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 80
const C = [4.0, 18.0, 32.0, 46.0, 60.0]
const T = { flash: 1.2, rew: [1.3, 2.9], s: [6, 10, 14, 21, 25, 29, 35, 38, 43, 49, 53, 57, 62, 66, 70, 74], blackout: 74.25, text: 73.0, last: 76.0 }
const S = T.s
const CH = ['THE COCOA', 'THE WALK', 'THE COLD', 'THE BENCH', 'THE DOORSTEP'].map((title, i) => ({ at: C[i], out: [(C[i + 1] || 73.5) - 0.5, (C[i + 1] || 73.5) - 0.2], n: i + 1, title, color: ['#ffd6a0', '#a8d8ff', '#ff9ac4', GOLD, '#9fe6b0'][i] }))
const NOTE = { at: T.text, out: [75.6, 75.9], title: 'texts', body: 'got home safe? I had *so* much fun.', glyph: '♒', color: '#7fd0ff', y: 140 }
const LABELS = ['ON TIME', 'ASKED A REAL QUESTION', 'LISTENED TO THE ANSWER', 'MATCHED WALKING PACE', 'LAUGHED AT THE SAME THING', 'NO PHONES', 'SHARED A SCARF', 'NOTICED THEY WERE COLD',
  'SAID "I’M NERVOUS"', 'POINTED OUT THE MOON', 'SHARED SOMETHING REAL', 'COMFORTABLE QUIET', 'SAID "I HAD FUN" FIRST', 'ASKED BEFORE A HUG', 'PLANNED DATE 2', 'TEXTS "GOT HOME SAFE?"']
const CFG = { n: 4, ink: '#e85a8a', cardTag: '♎ × ♒', cardTitle: 'FIRST DATE CARD · BLACKOUT', squares: LABELS.map((text, i) => ({ text, at: S[i] })) }
const FULL = { ...CFG, squares: LABELS.map(text => ({ text, at: -1 })) }
const pre = t => t < T.rew[1]

function lampPost(x, t, cx) { R(x, INK, cx - 12, 520, 24, 630); R(x, '#4a4070', cx - 6, 520, 12, 630); box(x, cx - 46, 470, 92, 60, '#fff1c8', { b: 7 }); glow(x, cx, 500, 360, 0.26) }
function door(x, cx) { box(x, cx - 110, 700, 220, 450, '#7a3a4a', { b: 8, hi: '#9a5060' }); R(x, GOLD, cx + 60, 930, 18, 18); box(x, cx - 150, 1130, 300, 20, '#c8c0d8', { b: 5 }); box(x, cx - 60, 640, 120, 50, '#fff1c8', { b: 5 }); glow(x, cx, 665, 160, 0.2) }
function cocoaCart(x, cx) { box(x, cx - 130, 880, 260, 180, '#c84a5a', { b: 7, hi: '#e86a7a' }); box(x, cx - 150, 840, 300, 40, '#f4e8cc', { b: 6 }); for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + d * 90, 1080, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a5a70'; x.beginPath(); x.arc(cx + d * 90, 1080, 24, 0, Math.PI * 2); x.fill() } label(x, 'COCOA', cx, 970, { size: 40, col: '#fff1c8', font: INTER, weight: 900 }) }
function mug(x, cx, cy, t) { box(x, cx - 22, cy - 26, 44, 52, '#f4f0e8', { b: 5 }); R(x, '#7a4a2a', cx - 18, cy - 22, 36, 10); x.save(); x.globalAlpha = 0.5; R(x, '#ffffff', cx - 6 + 6 * Math.sin(t * 3), cy - 60, 8, 22); x.restore() }
function sweaterDog(x, t, p) { const dx = lerp(1180, -120, p); drawBits(x, ['B...B...', 'BBBBB...', '.SSSSSS.', '.SSSSSSB', '.B.B.B.B'], { B: '#c8a070', S: RED }, dx, 1100 - 6 * Math.abs(Math.sin(t * 12)), 14) }

const EP = makeBingo({
  id: 'kfbe20', D, ...CFG, ending: 'loop', whip: false,
  win: [], bingoAt: T.blackout, bingoEnd: T.last - 0.1, bingoStyle: { text: 'BLACKOUT!', col: '#ffd6e8', top: 590 },
  cardAlpha: t => pre(t) ? 0 : 1,
  hostTears: t => t > T.blackout ? 3 : t > C[2] ? 2 : 1,
  hook: { text: 'Watch the *whole* | card fill.', out: [3.4, 3.65], accentColor: '#ffb0cc' },
  heads: [{ text: 'No big moment. | *Just all the small ones.*', at: T.last, accent: '#ffb0cc', late: 4, lateAt: T.last + 0.5, wobble: true, size: 84 }],
  effects: [...CH.map(c => [HK.chapter, HK.chapterCues, c]), [HK.notification, HK.notificationCues, NOTE]],
  scene(x, t) {
    const ch = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : t < C[4] ? 3 : 4
    const end = t > T.text || pre(t) && t < T.rew[0]
    park(x, t, { ground: '#d8dcf0', path: '#c0c4e0', lamp: null })
    R(x, '#e9ecff', 0, 1150, 1080, 40)
    // set per chapter (frame 0 / the end: under the lamp post)
    if (end) lampPost(x, t, 760)
    else if (ch === 0) { cocoaCart(x, 780); lampPost(x, t, 120) }
    else if (ch === 1) lampPost(x, t, 940 - ((t - C[1]) * 30) % 1200)
    else if (ch === 2) lampPost(x, t, 160)
    else if (ch === 3) { lampPost(x, t, 900); bench(x, 520, 1060, 520) }
    else door(x, 820)
    snowfall(x, t, { n: 50, top: 430, bottom: 1170, a: 0.85 })
    // positions
    let lx = 300, ax = 560, ly = 900, ay = 900
    if (end) { lx = 360; ax = 600 }
    else if (ch === 0) { lx = 260; ax = 500 }
    else if (ch === 3) { lx = 400; ax = 640; ly = 950; ay = 950 }
    else if (ch === 4) { lx = 380; ax = 620 }
    const walk = ch === 1 && !end ? 8 * Math.sin(t * 8) : 0
    const laughing = end && (t < T.rew[0] || t > T.blackout)
    let lm = laughing ? 'happy' : 'happy', am = laughing ? 'happy' : 'happy', ll, al
    if (!end && ch === 0 && t > S[1] - 0.6 && t < S[2]) { lm = 'sparkle'; ll = [1, 0]; am = 'neutral'; al = [-1, 0] }
    if (!end && ch === 2 && t > S[8] - 1.2 && t < S[8] + 0.4) { am = 'squint'; al = [-1, 0.5] }
    if (!end && ch === 3 && t > S[9] - 0.8 && t < S[10] - 0.8) { lm = 'sparkle'; ll = [0.6, -1]; am = 'sparkle'; al = [0.6, -1] }
    if (!end && ch === 3 && t > S[11] - 2.4 && t < S[11] + 0.5) { lm = 'neutral'; ll = [0, -1]; am = 'neutral'; al = [0, -1] }
    if (!end && ch === 4 && t > S[13] - 0.6) { lm = 'heart'; am = 'heart' }
    const sq = laughing ? 0.06 * Math.sin(t * 28) : 0
    shadow(x, lx, 1150, 200); shadow(x, ax, 1150, 200)
    star(x, t, 'libra', { x: lx, y: ly + walk, s: 220, mood: lm, look: ll, squash: sq, tears: laughing ? 1 : 0, hops: [S[0], S[2], S[4], S[7], S[10], S[12], S[13] + 0.3, T.blackout + 0.2], seed: 8 })
    star(x, t, 'aquarius', { x: ax, y: ay - walk, s: 220, mood: am, look: al, squash: -sq, tears: laughing ? 1 : 0, hops: [S[0] + 0.2, S[1], S[3], S[6], S[9], S[13], S[14], T.blackout + 0.3], seed: 12 })
    // the shared scarf (ch3 on, and at the end)
    if (t > S[6] - 0.5 || end) { const k = end ? 1 : inK(t, S[6] - 0.5, 0.5); x.save(); x.globalAlpha = k; for (let i = 0; i < 12; i++) { const px = lerp(lx + 40, ax - 40, i / 11), py = 960 + 10 * Math.sin(i * 0.8) + (ch === 3 && !end ? 50 : 0); R(x, INK, px - 12, py - 12, 26, 26); R(x, i % 2 ? RED : BONE, px - 9, py - 9, 20, 20) } x.restore() }
    // cocoa mugs (ch1)
    if (!end && ch === 0 && t > 5) { mug(x, lx + 100, 880, t); mug(x, ax - 100, 880, t) }
    // the sweater dog (ch2)
    if (!end && ch === 1) { const p = prog(t, S[4] - 2.0, S[4] + 1.6); if (p > 0 && p < 1) sweaterDog(x, t, p) }
    // phones in pockets (ch2): a little "NO PHONES" icon
    if (!end && ch === 1 && t > S[5] - 1.2 && t < S[5] + 1.6) { const k = win01(t, S[5] - 1.2, S[5] + 1.6); x.save(); x.globalAlpha = k; box(x, 500, 640, 80, 130, '#2a2148', { b: 6 }); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.arc(540, 705, 90, 0, Math.PI * 2); x.moveTo(476, 641); x.lineTo(604, 769); x.stroke(); x.restore() }
    // the moon (ch4): a pointing sparkle at the sky
    if (!end && ch === 3 && t > S[9] - 1 && t < S[10]) { const k = win01(t, S[9] - 1, S[10]); x.save(); x.globalAlpha = k; x.fillStyle = '#f4f0d8'; x.beginPath(); x.arc(760, 540, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1a1438'; x.beginPath(); x.arc(780, 530, 40, 0, Math.PI * 2); x.fill(); x.restore() }
    if (!end && ch === 4 && t > S[13] + 0.3) hearts(x, t, S[13] + 0.3, 500, 760, { n: 5 })
    if (laughing) hearts(x, t, t > T.blackout ? T.blackout : -1.5, 480, 760, { n: 6 })
  },
  over(x, t) {
    // frame 0 and the rewind: the full card, flashing; the rewind strips it back to empty
    if (pre(t)) {
      const rw = prog(t, ...T.rew)
      const shown = { ...FULL, squares: FULL.squares.map((s, i) => ({ ...s, at: rw > (15 - i) / 16 ? null : -1 })) }
      drawCard(x, t, shown)
      const fl = t < T.flash ? 0.5 + 0.5 * Math.sin(t * 20) : 0
      if (fl > 0) { x.save(); x.globalAlpha = 0.22 * fl; R(x, GOLD, 60, 1170, 960, 670); x.restore() }
      if (t > T.rew[0]) { x.save(); x.globalAlpha = 0.5; for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.25)', 0, 430 + ((i * 160 + t * 1400) % 1490), 1080, 6); x.restore(); label(x, '◂◂ REWIND · 6:00 PM', 540, 470, { size: 46, col: '#fff', font: MONO, weight: 700 }) }
    }
  },
  bubbles: [
    { t0: -1.2, t1: T.rew[0], x: 480, y: 660, text: 'HAHAHA stop', size: 40, tail: 0 },
    { t0: S[0] - 0.8, t1: S[1] - 1.1, x: 560, y: 650, text: 'hi! you’re right on time!', size: 34, tail: 0.2 },
    { t0: S[1] - 1.0, t1: S[2] - 1.2, x: 300, y: 650, text: 'what made you smile this week?', size: 30, tail: -0.1 },
    { t0: S[2] - 1.1, t1: C[1] - 0.3, x: 540, y: 650, text: 'my neighbour’s kid waved at me.', size: 30, tail: 0.1 },
    { t0: S[3] - 1.6, t1: S[4] - 2.0, x: 430, y: 660, text: 'walk this way? same speed?', size: 32, tail: 0 },
    { t0: S[4] - 0.4, t1: S[5] - 1.3, x: 430, y: 660, text: 'THE SWEATER. HAHA', size: 40, tail: 0 },
    { t0: S[6] - 1.8, t1: S[7] - 1.4, x: 560, y: 660, text: 'you’re shivering. scarf?', size: 34, tail: 0.1 },
    { t0: S[7] - 1.2, t1: S[8] - 1.6, x: 320, y: 660, text: 'your hands are freezing!', size: 32, tail: -0.1 },
    { t0: S[8] - 1.6, t1: C[3] - 0.3, x: 560, y: 660, text: 'honestly? I’m a bit nervous.', size: 32, tail: 0.1 },
    { t0: S[8] + 0.5, t1: C[3] - 0.3, x: 320, y: 760, text: 'me too. it’s nice, though.', size: 30, tail: -0.1 },
    { t0: S[9] - 1.6, t1: S[10] - 1.8, x: 420, y: 690, text: 'look. the moon’s out.', size: 34, tail: -0.1 },
    { t0: S[10] - 1.8, t1: S[11] - 2.6, x: 640, y: 700, text: 'I miss my gran on nights like this.', size: 28, tail: 0.1 },
    { t0: S[11] - 2.4, t1: S[11] + 0.2, x: 520, y: 760, text: '…', size: 60, tail: 0 },
    { t0: S[12] - 1.4, t1: S[13] - 1.6, x: 380, y: 660, text: 'I had fun. like, a lot.', size: 34, tail: -0.1 },
    { t0: S[13] - 1.6, t1: S[14] - 1.8, x: 620, y: 660, text: 'can I hug you?', size: 38, tail: 0.1 },
    { t0: S[14] - 1.6, t1: T.text - 0.2, x: 400, y: 660, text: 'same time next week?', size: 36, tail: -0.1 },
    { t0: S[14] - 0.6, t1: T.text - 0.2, x: 640, y: 740, text: 'yes!', size: 44, tail: 0.1 },
    { t0: C[2] + 1, t1: C[2] + 3, x: 790, y: 448, text: 'THE SCARF…', size: 32, tail: 0.5, col: '#cfe8ff' },
    { t0: T.blackout + 0.4, t1: D + 1, x: 790, y: 448, text: 'EVERY. SINGLE. SQUARE.', size: 28, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['glitter', 0, 0.6], ['whoosh', T.rew[0], 1.2, 0.04], ...Array.from({ length: 16 }, (_, i) => ['tick', r3(T.rew[0] + i * 0.1), 0.025]), ['pop', S[4] - 0.4, 1318.51, 0.035, 0], ['pop', S[4] - 0.2, 1567.98, 0.03, 0],
    ['pluck', S[8] - 1.6, 659.25, 0.035, 0.6, 0.2], ['pluck', S[10] - 1.8, 587.33, 0.035, 0.8, 0.2], ['pluck', S[13] - 1.6, 1318.51, 0.035, 0.5, 0.2], ['pop', S[14] - 0.6, 1567.98, 0.04, 0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
