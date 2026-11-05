// kfbe17: FIRST DATE BINGO E17 (long), "Mini golf: Gemini × Capricorn" (vertical, star_talk post, music: chiptune · C).
// No end card, no card transition; hard cut on the last line. 4×4 card, chapter stickers per hole, a scoreboard.
//   0.0   frame 0: a golf ball mid-flight straight at the lens, ♑ Capricorn mid-swing; the dauber mid-slam on THE BALL
//         WENT FLYING. Hook: "Mini golf date. | *Wait for hole 9.*"  0.8 record scratch: "it’s *mini* golf."
//   HOLE 1 (3)    Gemini narrates every putt → GEMINI NARRATES EVERY PUTT (6) · "bet you can’t do it in one." "watch
//                 me." → FRIENDLY TRASH TALK (10.5)
//   HOLE 3 (14)   Capricorn keeps score in a notebook → KEEPS SCORE IN A NOTEBOOK (17.5) · Gemini’s ball bounces into a
//                 bush, Gemini dives in after it → LOSES THE BALL IN A BUSH (23)
//   HOLE 5 (27)   the windmill keeps blocking; they laugh too hard to putt → LAUGH TOO HARD TO PUTT (33)
//   HOLE 7 (38)   Gemini fakes a miss (caught in 4K: FAKE MISS) → LETS THEM WIN (CAUGHT) (42.5) · "don’t. play for
//                 real. I like it when it’s real." · the scoreboard: tied
//   HOLE 9 (52)   the last putt lips out; Capricorn laughs out loud for the first time → HAD FUN LOSING (61.5) → BINGO
//   66    "Lost the game. | *Won the date.*" · hard cut.
import { makeBingo, park, star, label, shadow, hearts, sparkles, drawBits, R, box, glow, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, GREEN, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 70
const C = [3.0, 14.0, 27.0, 38.0, 52.0]
const T = { rec: 0.8, narr: [4.0, 7.8], s1: 6.0, please: 7.9, bet: 8.6, watch: 9.8, s2: 10.5, putt1: [11.2, 12.4],
  book: 15.0, s3: 17.5, gputt: [19.2, 20.6], bush: 20.6, dive: [21.2, 23.6], s4: 23.0, found: 24.4,
  wind: 28.0, tries: [29.0, 30.6, 32.2], s5: 33.0, gig: [33.0, 36.0],
  fake: [39.5, 41.0], caught: 41.0, s6: 42.5, real: 43.4, on: 46.6, tied: 48.5,
  line: 53.5, putt: [55.0, 57.2], lip: 57.2, hush: [57.4, 59.4], laugh: 59.6, s7: 61.5, bingo: 61.75, you: 62.6, fun: 64.0, last: 66.0 }
const HOLES = ['HOLE 1', 'HOLE 3', 'HOLE 5 · THE WINDMILL', 'HOLE 7', 'HOLE 9']
const CH = HOLES.map((title, i) => ({ at: C[i], out: [(C[i + 1] || 61) - 0.5, (C[i + 1] || 61) - 0.2], n: i + 1, title, color: ['#7dffb0', GOLD, '#ff9ac4', '#a8d8ff', '#ffd6a0'][i] }))
const REC = { at: T.rec, len: 1.4, caption: 'it’s *mini* golf.', sub: 'hole 1, first swing', top: 1000 }
const CAUGHT = { at: T.caught, x: 330, y: 860, r: 170, out: [43.2, 43.5], label: 'FAKE MISS', arrow: 'tr' }

function putter(x, cx, cy, rot, col = '#c8c8d8') { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -6, 0, 12, 220); R(x, col, -3, 2, 6, 216); box(x, -10, 210, 60, 20, '#5a5a70', { b: 5 }); x.restore() }
function ball(x, cx, cy, r) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8d4e8'; for (let i = 0; i < 6; i++) { const a = i * 1.1; x.fillRect(cx + Math.cos(a) * r * 0.5 - r * 0.08, cy + Math.sin(a) * r * 0.5 - r * 0.08, r * 0.16, r * 0.16) } }
function flag(x, cx, cy, n) { R(x, INK, cx - 7, cy - 250, 14, 250); R(x, BONE, cx - 3, cy - 246, 6, 244); drawBits(x, ['RRRRRR', 'RRRRRRR', 'RRRRRR'], { R: RED }, cx + 46, cy - 220, 16); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 30, 9, 0, 0, Math.PI * 2); x.fill(); label(x, String(n), cx + 40, cy - 220, { size: 22, col: '#fff', font: INTER, weight: 900 }) }
function windmill(x, t, cx, cy) { box(x, cx - 70, cy - 200, 140, 200, '#c8a070', { b: 7, hi: '#e0c090' }); box(x, cx - 26, cy - 70, 52, 70, INK, { b: 0 }); x.save(); x.translate(cx, cy - 170); x.rotate(t * 1.6); for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); box(x, -14, -190, 28, 170, '#f4f0e0', { b: 5 }) } box(x, -16, -16, 32, 32, RED, { b: 5 }); x.restore() }
function bushes(x, cx, cy, shake = 0) { drawBits(x, ['..GGGG..', '.GGGGGG.', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.'], { G: '#2f8a4a' }, cx + shake, cy, 24) }

const EP = makeBingo({
  id: 'kfbe17', D, n: 4, ink: '#2f9a5a', cardTag: '♊ × ♑', cardTitle: 'FIRST DATE CARD · MINI GOLF',
  squares: [
    { text: 'THE BALL WENT FLYING', at: -0.04 }, { text: 'MATCHING VISORS' }, { text: 'HOLE IN ONE (LUCK)' }, { text: 'FRIENDLY TRASH TALK', at: T.s2 },
    { text: 'ARGUES WITH THE WINDMILL' }, { text: 'NARRATES EVERY PUTT', at: T.s1 }, { text: 'LOSES THE BALL IN A BUSH', at: T.s4 }, { text: 'BALL HITS A GNOME' },
    { text: 'STRETCHES BEFORE PUTTING' }, { text: 'LAUGH TOO HARD TO PUTT', at: T.s5 }, { text: 'KEEPS SCORE IN A NOTEBOOK', at: T.s3 }, { text: 'ASKS FOR A REMATCH' },
    { text: 'HIGH-FIVE ON A BOGEY' }, { text: 'LETS THEM WIN (CAUGHT)', at: T.s6 }, { text: 'SNACK BREAK' }, { text: 'HAD FUN LOSING', at: T.s7 },
  ],
  win: [0, 5, 10, 15], bingoAt: T.bingo,
  hostTears: t => t > T.bingo ? 3 : t > T.s5 ? 2 : 1,
  hook: { text: 'Mini golf date. | *Wait for hole 9.*', out: [2.6, 2.85], accentColor: '#7dffb0' },
  rec: REC,
  heads: [{ text: 'Lost the game. | *Won the date.*', at: T.last, accent: '#7dffb0', late: 3, lateAt: T.last + 0.4, wobble: true }],
  effects: [...CH.map(c => [HK.chapter, HK.chapterCues, c]), [HK.caught, HK.caughtCues, CAUGHT], [HK.screenShake, HK.shakeCues, { at: T.gig[0], len: 0.5, amp: 14 }]],
  scene(x, t) {
    park(x, t, { ground: '#3a8a4a', path: '#2f7a40', lamp: null })
    // the night course: bright turf with board edges, string lights overhead
    R(x, INK, 0, 1034, 1080, 10); R(x, '#8a5a3c', 0, 1040, 1080, 16); R(x, '#46b060', 0, 1056, 1080, 114)
    for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.06)', i * 130, 1056, 60, 114)
    for (let i = 0; i < 14; i++) { const lx = 20 + i * 78, ly = 470 + 26 * Math.sin(i * 0.7) ** 2; R(x, INK, lx, 440, 3, ly - 440); glow(x, lx, ly + 8, 40, 0.2 * (0.7 + 0.3 * Math.sin(t * 3 + i))); R(x, INK, lx - 7, ly, 18, 18); R(x, [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0'][i % 4], lx - 4, ly + 3, 12, 12) }
    // course props per hole
    const hole = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : t < C[4] ? 3 : 4
    if (hole === 2) windmill(x, t, 760, 1150)
    else flag(x, [820, 760, 0, 800, 760][hole], 1160, [1, 3, 5, 7, 9][hole])
    if (hole === 1) bushes(x, 900, 1060, t > T.dive[0] && t < T.dive[1] ? 10 * Math.sin(t * 30) : 0)
    // Capricorn (putter), Gemini (putter)
    let cx = 300, gx = 600
    if (hole === 2) { cx = 240; gx = 480 }
    let cm = 'squint', cl = [1, 0.4], ct = 0, csq = 0
    if (t > 1.0) { cm = 'neutral'; cl = [1, 0] }
    if (t > T.narr[0] && t < T.please + 0.8) { cm = 'eyeroll'; cl = undefined }
    if (t > T.watch) { cm = 'squint'; cl = [1, 0.5] }
    if (t > T.putt1[1]) { cm = 'happy'; cl = undefined }
    if (t > T.book && t < T.gputt[0]) { cm = 'neutral'; cl = [0.3, 1] }
    if (t > T.bush) { cm = 'wide'; cl = [1, 0] }
    if (t > T.found) { cm = 'happy'; cl = undefined }
    if (t > T.gig[0] && t < T.gig[1]) { cm = 'happy'; csq = 0.05 * Math.sin(t * 28); ct = 1 }
    if (t > T.fake[0] && t < T.real) { cm = 'squint'; cl = [1, 0] }
    if (t > T.real) { cm = 'happy'; cl = undefined }
    if (t > T.line && t < T.lip) { cm = 'squint'; cl = [1, 0.6] }
    if (t > T.lip && t < T.laugh) { cm = 'wide'; cl = [1, 0.6] }
    if (t > T.laugh) { cm = 'happy'; csq = t < T.s7 + 1 ? 0.06 * Math.sin(t * 30) : 0; cl = undefined; ct = t < T.s7 + 1 ? 1 : 0 }
    if (t > T.bingo + 0.6) cm = 'heart'
    shadow(x, cx, 1150, 210)
    star(x, t, 'capricorn', { x: cx, y: 900, s: 230, mood: cm, look: cl, tears: ct, squash: csq, hops: [0.1, T.watch, T.putt1[1], T.s3, T.found, T.real, T.laugh, T.laugh + 0.3, T.fun, T.bingo + 0.3], seed: 14 })
    const swing = t < 0.8 ? -1.2 + 1.4 * prog(t, -0.3, 0.4) : t > T.putt1[0] && t < T.putt1[1] ? -0.4 * Math.sin(Math.PI * prog(t, ...T.putt1)) : t > T.putt[0] && t < T.putt[1] ? -0.4 * Math.sin(Math.PI * prog(t, ...T.putt)) : 0.15
    putter(x, cx + 90, 870, swing)
    let gm = 'happy', gl, gt = 0, gsq = 0
    if (t > T.narr[0] && t < T.narr[1]) { gm = 'sparkle'; gl = [-1, 0] }
    if (t > T.bush && t < T.found) { gm = 'wide'; gl = [1, 0] }
    if (t > T.gig[0] && t < T.gig[1]) { gm = 'happy'; gsq = 0.05 * Math.sin(t * 29 + 1); gt = 1 }
    if (t > T.fake[0] && t < T.caught + 0.6) { gm = 'wink'; gl = undefined }
    if (t > T.caught + 0.6 && t < T.real + 1) { gm = 'wide'; gl = [-1, 0] }
    if (t > T.on) { gm = 'sparkle'; gl = [-1, 0] }
    if (t > T.lip) { gm = 'wide' }
    if (t > T.laugh) { gm = 'happy'; gl = undefined }
    if (t > T.bingo + 0.6) gm = 'heart'
    const gxx = t > T.dive[0] && t < T.dive[1] ? lerp(gx, 900, Math.sin(Math.PI * prog(t, ...T.dive))) : gx
    const galpha = t > T.dive[0] + 0.6 && t < T.dive[1] - 0.6 ? 0 : 1
    if (galpha) { shadow(x, gxx, 1150, 200); star(x, t, 'gemini', { x: gxx, y: 910, s: 220, mood: gm, look: gl, tears: gt, squash: gsq, hops: [T.narr[0], T.narr[0] + 0.6, T.narr[0] + 1.2, T.bet, T.s3 + 1, T.found, T.on, T.you, T.bingo + 0.4], seed: 5 }); putter(x, gxx + 80, 880, 0.2, '#ffe27a') }
    if (hole === 1) bushes(x, 900, 1060, t > T.dive[0] && t < T.dive[1] ? 10 * Math.sin(t * 30) : 0)
    // the ball: frame 0 flying at the lens, then on the course
    if (t < 1.2) { const k = 1 - inK(t, 0.9, 0.3); x.save(); x.globalAlpha = k; for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.5)', 560 - 220 - i * 30, 640 + i * 26 - 60, 160, 8); ball(x, 600, 660, lerp(110, 140, prog(t, -0.3, 0.8))); x.restore() }
    if (t > T.putt1[0] && t < T.putt1[1] + 0.8) { const p = ease.outCubic(prog(t, T.putt1[0] + 0.2, T.putt1[1] + 0.6)); ball(x, lerp(400, 820, p), 1150, 16) }
    if (t > T.gputt[0] && t < T.bush + 0.2) { const p = prog(t, T.gputt[0], T.bush); ball(x, lerp(660, 900, p), 1150 - 200 * Math.sin(Math.PI * p), 16) }
    if (t > T.putt[0] && t < T.lip + 1.4) { const p = prog(t, T.putt[0] + 0.2, T.lip); const lp = prog(t, T.lip, T.lip + 1.2); ball(x, lerp(400, 755, ease.outCubic(p)) + 60 * Math.sin(lp * Math.PI) * (lp > 0 ? 1 : 0), 1150 - 30 * Math.sin(lp * Math.PI * 2) * (1 - lp), 16) }
    // the notebook
    const nk = pop01(t, T.book, 0.3, 2.2) * outK(t, [T.gputt[0] - 0.2, T.gputt[0]])
    if (nk > 0.01) { x.save(); x.translate(480, 660); x.rotate(-0.05); x.scale(nk, nk); box(x, -150, -100, 300, 200, '#fffdf4', { b: 6 }); for (let i = 0; i < 5; i++) R(x, '#c8d8f0', -130, -60 + i * 34, 260, 3); x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#2c2a7a'; x.fillText('GEM  4', -120, -40); x.fillText('CAP  2', -120, 4); x.fillText('(neat)', -120, 48); x.restore() }
    // the windmill tries
    for (const tr of T.tries) { const p = prog(t, tr, tr + 0.8); if (p > 0 && p < 1) ball(x, lerp(420, 740, p), 1150, 16) ; if (t > tr + 0.8 && t < tr + 1.4) label(x, 'BONK', 720, 1050, { size: 40, col: '#ffe27a', font: INTER, weight: 900, rot: -0.2 }) }
    // the scoreboard
    const sk = pop01(t, T.tied, 0.3, 2.2) * outK(t, [C[4] - 0.3, C[4]])
    const sk2 = pop01(t, T.s7 + 0.2, 0.3, 2.2) * outK(t, [T.last - 0.2, T.last])
    for (const [k, txt] of [[sk, 'GEM 21 · CAP 21'], [sk2, 'GEM 24 · CAP 25']]) if (k > 0.01) { x.save(); x.translate(540, 560); x.scale(k, k); box(x, -230, -50, 460, 100, '#1a2a20', { b: 7 }); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7dffb0'; x.fillText(txt, 0, 4); x.restore() }
    // hush before the last putt
    if (t > T.hush[0] && t < T.hush[1]) label(x, '…', 540, 640, { size: 90, col: BONE, font: INTER, weight: 900, alpha: win01(t, T.hush[0], T.hush[1]) })
    if (t > T.bingo + 0.6) hearts(x, t, T.bingo + 0.6, 450, 760, { n: 6 })
  },
  bubbles: [
    { t0: T.narr[0], t1: T.narr[1], x: 620, y: 660, text: 'and Capricorn lines it up… the crowd is SILENT…', size: 26, tail: 0.1 },
    { t0: T.please, t1: T.bet - 0.1, x: 300, y: 650, text: 'please.', size: 44, tail: -0.1 },
    { t0: T.bet, t1: T.watch, x: 620, y: 690, text: 'bet you can’t do it in one.', size: 32, tail: 0.1 },
    { t0: T.watch, t1: C[1] - 0.3, x: 300, y: 650, text: 'watch me.', size: 44, tail: -0.1 },
    { t0: T.putt1[1] + 0.5, t1: C[1] - 0.3, x: 620, y: 690, text: 'NO WAY.', size: 44, tail: 0.1 },
    { t0: T.bush + 0.2, t1: T.dive[1], x: 700, y: 680, text: 'I’LL GET IT', size: 40, tail: 0.3 },
    { t0: T.found, t1: C[2] - 0.3, x: 620, y: 690, text: 'found it! and a leaf.', size: 34, tail: 0.1 },
    { t0: T.tries[1], t1: T.s5, x: 300, y: 640, text: 'it’s doing this on PURPOSE', size: 32, tail: -0.1 },
    { t0: T.gig[0] + 0.3, t1: T.gig[1], x: 400, y: 640, text: 'HAHAHAHA', size: 52, tail: 0 },
    { t0: T.fake[0] + 0.3, t1: T.caught, x: 560, y: 690, text: 'oops! missed. darn.', size: 34, tail: 0.1 },
    { t0: T.real, t1: T.on - 0.1, x: 330, y: 620, text: 'don’t. play for real.', size: 38, tail: -0.1 },
    { t0: T.real + 1.4, t1: T.on - 0.1, x: 330, y: 700, text: 'I like it when it’s real.', size: 32, tail: -0.1 },
    { t0: T.on, t1: T.tied, x: 620, y: 690, text: 'ok. game ON.', size: 42, tail: 0.1 },
    { t0: T.line, t1: T.putt[0], x: 620, y: 690, text: 'no pressure…', size: 40, tail: 0.1 },
    { t0: T.laugh, t1: T.s7, x: 330, y: 640, text: 'HA! HAHA! oh no!', size: 44, tail: -0.1 },
    { t0: T.you, t1: T.fun - 0.1, x: 620, y: 690, text: 'you LAUGHED.', size: 44, tail: 0.1 },
    { t0: T.fun, t1: D + 1, x: 330, y: 640, text: 'I had fun losing.', size: 40, tail: -0.1 },
    { t0: T.s5 + 0.3, t1: T.s5 + 2.4, x: 790, y: 448, text: 'THEY’RE GIGGLING', size: 32, tail: 0.5, col: '#cfe8ff' },
    { t0: T.bingo + 1.6, t1: D + 1, x: 790, y: 448, text: 'CAPRICORN LAUGHED!!', size: 30, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['whoosh', 0, 0.4, 0.05], ['tick', T.putt1[0] + 0.2, 0.06], ['bell', T.putt1[1] + 0.5, 2349.32, 0.03, 0.8, 0], ['tick', T.gputt[0], 0.06], ['tom', T.bush, 90, { gain: 0.2, decay: 0.2 }], ['whoosh', T.dive[0], 0.4, 0.03],
    ...T.tries.flatMap(tr => [['tick', tr, 0.05], ['tom', r3(tr + 0.85), 120, { gain: 0.2, decay: 0.12 }]]), ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.gig[0] + 0.3 + i * 0.25), [1318.51, 1567.98][i % 2], 0.025, 0]),
    ['pluck', T.fake[0] + 0.3, 880, 0.03, 0.5, 0.3], ['pluck', T.real, 659.25, 0.035, 0.6, -0.3], ['pop', T.on, 1567.98, 0.04, 0.3], ['bell', T.tied, 1760, 0.03, 0.8, 0],
    ['riser', T.line, T.putt[1], 0.025], ['tick', T.putt[0] + 0.2, 0.06], ['pluck', T.lip, 392, 0.04, 0.6, 0], ['pop', T.laugh, 1318.51, 0.04, -0.3], ['pop', T.laugh + 0.2, 1567.98, 0.035, -0.3], ['pluck', T.fun, 1567.98, 0.04, 0.5, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, glow, GOLD, GREEN]
