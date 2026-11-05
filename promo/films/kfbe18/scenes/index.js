// kfbe18: FIRST DATE BINGO E18 (long), "The museum date: Scorpio × Sagittarius" (vertical, star_talk post, cinematic · Dm).
// No end card, no card transition; hard cut on the last line. Chapters by room; the payoff is a silence.
//   0.0   frame 0: ♐ Sagittarius mid-sprint past a pixel painting, ♏ Scorpio mid-stare at it; the dauber mid-slam on
//         SPRINTS PAST THE ART. Hook: "Museum date. | *The ending, though.*"  0.8 record scratch: "this is a *museum.*"
//   ① SCULPTURES (3)  Sag reads every sign out loud → READS EVERY SIGN OUT LOUD (7) · copies a statue’s pose · reaches
//                    out, the guard: "please don’t touch." → ALMOST TOUCHES A STATUE (12.5)
//   ② PORTRAITS (16)  Scorpio finds the saddest painting (a single chair) → FINDS THE SADDEST PAINTING (21) · "it’s
//                    about loneliness." "it’s a chair." · "the brushwork is… brushy." → PRETENDS TO KNOW ART (26) ·
//                    a portrait gets a backstory ("Gerald. lost a sock.") → MAKES UP A BACKSTORY (31)
//   ③ THE GIFT SHOP (36)  both grab the same postcard (the chair) → BUYS THE SAME POSTCARD (42) · Sag tries on a
//                    hat → TRIES ON A GIFT-SHOP HAT (46) · ONE SQUARE FROM BINGO
//   ④ THE BENCH (52)  they sit; nothing is said; a SILENCE meter fills → COMFORTABLE SILENCE (62) → BINGO (62.25) ·
//                    the host sobs and gets shushed · 65.5 "Quiet together? | *That’s rare.*" · hard cut.
import { makeBingo, star, label, shadow, hearts, bench, drawBits, R, box, glow, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, RED, INTER, MONO, cellCenter } from '../../kfbe01/scenes/bingokit.js'

const D = 69
const C = [3.0, 16.0, 36.0, 52.0]
const T = { rec: 0.8, read: [4.5, 8.2], s1: 7.0, pose: [8.6, 10.6], reach: 11.2, guard: 11.8, s2: 12.5,
  stare: [17.5, 21.5], s3: 21.0, lonely: 22.0, chair: 23.4, brush: 24.6, s4: 26.0, gerald: [27.6, 31.6], s5: 31.0, sock: 29.4,
  grab: [39.6, 41.2], s6: 42.0, hat: [44.0, 47.0], s7: 46.0, one: 48.5, sit: [52.4, 53.6], silence: [54.0, 61.6], lean: [56, 61], s8: 62.0, bingo: 62.25, shh: 63.6, sorry: 64.6, last: 65.5 }
const CH = ['SCULPTURES', 'PORTRAITS', 'THE GIFT SHOP', 'THE BENCH'].map((title, i) => ({ at: C[i], out: [(C[i + 1] || 61.5) - 0.5, (C[i + 1] || 61.5) - 0.2], n: i + 1, title, color: ['#e8d8b0', '#ff9ac4', GOLD, '#a8d8ff'][i] }))
const REC = { at: T.rec, len: 1.4, caption: 'this is a *museum.*', sub: 'walking pace: not found', top: 1000 }

function gallery(x, t, wall = '#3a3050') {
  R(x, wall, 0, 430, 1080, 720); R(x, 'rgba(255,255,255,0.03)', 0, 430, 1080, 60)
  R(x, INK, 0, 1144, 1080, 8); R(x, '#5a4a40', 0, 1150, 1080, 40); for (let i = 0; i < 8; i++) R(x, 'rgba(255,255,255,0.08)', i * 140, 1156, 80, 6)
  for (let i = 0; i < 3; i++) glow(x, 180 + i * 360, 470, 260, 0.12)
}
function frame(x, cx, cy, w, h, art) { box(x, cx - w / 2 - 18, cy - h / 2 - 18, w + 36, h + 36, '#c89a30', { b: 7, hi: '#e8c060' }); R(x, '#14102a', cx - w / 2, cy - h / 2, w, h); x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); art(cx, cy, w, h); x.restore(); box(x, cx - 50, cy + h / 2 + 34, 100, 30, BONE, { b: 4 }) }
const swirl = (cx, cy, w, h) => (x) => { for (let i = 0; i < 6; i++) R(x, ['#3f7cf0', '#f2c75c', '#e8628a'][i % 3], cx - w / 2 + i * w / 6, cy - h / 2, w / 6, h) }
function pedestal(x, cx, y, top) { box(x, cx - 70, y - 220, 140, 220, '#e8e4d8', { b: 7 }); top(cx, y - 220) }

const EP = makeBingo({
  id: 'kfbe18', D, n: 4, ink: '#9a40e0', cardTag: '♏ × ♐', cardTitle: 'FIRST DATE CARD · MUSEUM',
  squares: [
    { text: 'READS EVERY SIGN OUT LOUD', at: T.s1 }, { text: 'WHISPERS TOO LOUD' }, { text: 'PHOTO OF THE MAP' }, { text: 'TRIES ON A GIFT-SHOP HAT', at: T.s7 },
    { text: 'STANDS TOO CLOSE TO A PAINTING' }, { text: 'ALMOST TOUCHES A STATUE', at: T.s2 }, { text: 'PRETENDS TO KNOW ART', at: T.s4 }, { text: 'GETS LOST IN THE HALLS' },
    { text: 'COPIES A STATUE’S POSE' }, { text: 'READS THE PLAQUE TWICE' }, { text: 'SITS DOWN TO "REST"' }, { text: 'MAKES UP A BACKSTORY', at: T.s5 },
    { text: 'SPRINTS PAST THE ART', at: -0.04 }, { text: 'FINDS THE SADDEST PAINTING', at: T.s3 }, { text: 'BUYS THE SAME POSTCARD', at: T.s6 }, { text: 'COMFORTABLE SILENCE', at: T.s8 },
  ],
  win: [12, 13, 14, 15], bingoAt: T.bingo, bingoStyle: { text: 'BINGO!', col: '#e8d8ff' },
  hostTears: t => t > T.bingo ? 3 : t > T.s4 ? 2 : 1,
  hook: { text: 'Museum date. | *The ending, though.*', out: [2.6, 2.85], accentColor: '#c88aff' },
  rec: REC,
  heads: [{ text: 'Quiet together? | *That’s rare.*', at: T.last, accent: '#c88aff', late: 2, lateAt: T.last + 0.4, wobble: true }],
  effects: CH.map(c => [HK.chapter, HK.chapterCues, c]),
  scene(x, t) {
    const room = t < C[1] ? 0 : t < C[2] ? 1 : t < C[3] ? 2 : 3
    gallery(x, t, ['#3a3050', '#402a40', '#2a3a48', '#30284a'][room])
    let sx = 300, ox = 760, sy = 900, oy = 900
    if (room === 0) {
      frame(x, 540, 640, 300, 200, (cx, cy, w, h) => swirl(cx, cy, w, h)(x))
      pedestal(x, 150, 1150, (cx, y) => drawBits(x, ['.HHH.', 'HHHHH', 'HHHHH', '.HHH.', '..H..', 'HHHHH'], { H: '#f4f0e8' }, cx, y - 60, 18))
      label(x, 'BUST, MARBLE', 150, 1040, { size: 20, col: INK, font: MONO })
      // frame 0: Sag mid-sprint, Scorpio mid-stare
      sx = lerp(720, 360, ease.outCubic(prog(t, -0.6, 1.4))); ox = 760
      if (t > T.pose[0] && t < T.pose[1]) sx = 330
      if (t > T.reach) sx = 300
    } else if (room === 1) {
      frame(x, 300, 640, 220, 280, (cx, cy, w, h) => { R(x, '#4a5a7a', cx - w / 2, cy - h / 2, w, h); drawBits(x, ['CCCC', 'C..C', 'CCCC', 'C..C', 'C..C'], { C: '#8a5a3c' }, cx, cy + 20, 16) })
      frame(x, 780, 640, 220, 280, (cx, cy, w, h) => { R(x, '#6a4a3a', cx - w / 2, cy - h / 2, w, h); drawBits(x, ['.FFF.', 'FFFFF', 'F.F.F', 'FFFFF', '.FFF.', 'MMMMM', 'MMMMM'], { F: '#f0c8a0', M: '#2a2a50' }, cx, cy, 22) })
      label(x, 'A CHAIR', 300, 818, { size: 18, col: INK, font: MONO }); label(x, 'PORTRAIT, 1802', 780, 818, { size: 18, col: INK, font: MONO })
      ox = t < T.gerald[0] ? 300 : 620; sx = t < T.gerald[0] ? 580 : 860
    } else if (room === 2) {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) box(x, 380 + i * 110, 560 + j * 120, 90, 100, ['#ffffff', '#ffe9c8', '#d8f0ff'][(i + j) % 3], { b: 5 })
      drawBits(x, ['CCCC', 'C..C', 'CCCC', 'C..C'], { C: '#8a5a3c' }, 545, 800, 9)
      label(x, 'GIFT SHOP', 540, 500, { size: 34, col: GOLD, font: INTER, weight: 900 })
      sx = 790; ox = 290
    } else {
      frame(x, 540, 640, 520, 300, (cx, cy, w, h) => { R(x, '#1a2a5a', cx - w / 2, cy - h / 2, w, h); for (let i = 0; i < 14; i++) R(x, i % 3 ? BONE : GOLD, cx - w / 2 + (i * 97) % w, cy - h / 2 + (i * 53) % h, 6, 6); x.fillStyle = '#f4f0d8'; x.beginPath(); x.arc(cx + 120, cy - 60, 40, 0, Math.PI * 2); x.fill() })
      const sit = inK(t, T.sit[0], 1.0)
      bench(x, 540, 1070, 520, '#6a4a3a')
      const lean = ease.inOutCubic(prog(t, ...T.lean))
      sx = lerp(800, 660 - 20 * lean, sit); ox = lerp(280, 420 + 20 * lean, sit); sy = lerp(900, 960, sit); oy = sy
    }
    // Scorpio
    let om = 'neutral', ol = [0.6, -0.6]
    if (room === 0 && t > 1.5) { om = 'happy'; ol = [-1, 0] }
    if (room === 0 && t > T.guard) { om = 'wide' }
    if (room === 1) { om = t < T.lonely ? 'sparkle' : t < T.chair + 0.8 ? 'neutral' : 'happy'; ol = t < T.lonely ? [-0.6, -0.8] : [1, 0] }
    if (room === 1 && t > T.gerald[0]) { om = 'happy'; ol = undefined }
    if (room === 2) { om = t > T.grab[1] ? 'happy' : 'neutral'; ol = [1, 0] }
    if (room === 2 && t > T.hat[0]) { om = 'happy'; ol = undefined }
    if (room === 3) { om = t > T.silence[0] + 2 ? 'happy' : 'neutral'; ol = [0, -1] }
    if (t > T.bingo + 0.5) om = 'heart'
    shadow(x, ox, 1150, 210)
    star(x, t, 'scorpio', { x: ox, y: oy, s: 230, mood: om, look: ol, blink: room === 1 && t < T.lonely ? false : undefined, tears: room === 1 && t > T.stare[0] + 1.5 && t < T.lonely + 1 ? 1 : 0, hops: [T.lonely, T.s4 + 1, T.sock, T.grab[1], T.bingo + 0.3], seed: 10 })
    // Sagittarius
    let gm = 'sparkle', gl = [-1, 0], gsq = 0
    if (room === 0 && t > T.read[0]) { gm = 'happy'; gl = undefined }
    if (room === 0 && t > T.pose[0] && t < T.pose[1]) { gm = 'squint'; gsq = -0.1 }
    if (room === 0 && t > T.guard) { gm = 'wide'; gl = [-1, 0] }
    if (room === 1) { gm = t < T.chair ? 'neutral' : t < T.brush ? 'squint' : 'happy'; gl = [-1, 0] }
    if (room === 1 && t > T.gerald[0]) { gm = 'happy'; gl = undefined }
    if (room === 2) { gm = 'sparkle'; gl = [-1, 0] }
    if (room === 3) { gm = t > T.silence[0] + 3 ? 'happy' : 'neutral'; gl = [0, -1] }
    if (t > T.bingo + 0.5) gm = 'heart'
    if (room === 0 && t < 1.2) for (let i = 0; i < 6; i++) R(x, 'rgba(255,190,140,0.8)', sx + 90 + i * 12, 820 + i * 22, 90 * (1 - prog(t, 0.6, 1.2)), 10)
    shadow(x, sx, 1150, 210)
    star(x, t, 'sagittarius', { x: sx, y: sy, s: 230, mood: gm, look: gl, squash: gsq, hops: [0.1, ...Array.from({ length: 6 }, (_, i) => T.read[0] + i * 0.6), T.reach, T.chair, T.brush, T.gerald[0] + 0.4, T.sock + 0.3, T.grab[0], T.hat[0] + 0.3, T.bingo + 0.4], seed: 9 })
    // the hat
    if (room === 2 && t > T.hat[0]) { const k = pop01(t, T.hat[0], 0.3, 2.4); box(x, sx - 80 * k, sy - 160, 160 * k, 26, '#e85a8a', { b: 6 }); box(x, sx - 50 * k, sy - 220, 100 * k, 64, '#e85a8a', { b: 6, hi: '#ff86ad' }) }
    // the postcards in hand
    if (room === 2 && t > T.grab[0]) { const k = inK(t, T.grab[0], 0.3); for (const px of [ox + 110, sx - 110]) { box(x, px - 40, 820, 80, 56, '#ffffff', { b: 4 }); drawBits(x, ['CCC', 'C.C', 'CCC'], { C: '#8a5a3c' }, px, 848, 6 * k) } }
    // the silence meter
    if (room === 3) { const k = pop01(t, T.silence[0], 0.3, 2) * outK(t, [T.bingo + 1.6, T.bingo + 2]); if (k > 0.01) { x.save(); x.translate(540, 870); x.scale(k, k); box(x, -230, -40, 460, 80, 'rgba(16,9,38,0.9)', { b: 6 }); x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('COMFORTABLE SILENCE', -210, -16); const f = ease.inOutQuad(prog(t, ...T.silence)); R(x, '#2a1f55', -210, 4, 420, 22); R(x, '#c88aff', -210, 4, 420 * f, 22); x.textAlign = 'right'; x.fillText(`${Math.round(f * 100)}%`, 210, -16); x.restore() } }
    // the guard
    const gk = Math.max(win01(t, T.guard - 0.3, T.s2 + 1.2, 0.25), win01(t, T.shh - 0.3, D + 1, 0.25))
    if (gk > 0.01) star(x, t, 'grey', { x: lerp(1160, 990, gk), y: 980, s: 150, mood: 'squint', look: [-1, 0], seed: 13 })
    if (t > T.bingo + 0.5) hearts(x, t, T.bingo + 0.5, 540, 780, { n: 5 })
  },
  over(x, t) {
    const k = win01(t, T.one, T.s8, 0.25)
    if (k > 0.01) { const c = cellCenter({ n: 4 }, 15); x.save(); x.globalAlpha = k; x.strokeStyle = '#ff3b55'; x.lineWidth = 8; x.setLineDash([16, 12]); x.lineDashOffset = -t * 40; x.strokeRect(c.x - c.w / 2 + 6, c.y - c.h / 2 + 6, c.w - 12, c.h - 12); x.setLineDash([]); x.restore(); label(x, 'ONE SQUARE FROM BINGO', 700, 1150, { size: 30, col: '#ff6177', alpha: k, font: INTER, weight: 900 }) }
  },
  bubbles: [
    { t0: T.read[0], t1: T.read[1] - 1.6, x: 400, y: 660, text: '"BUST, MARBLE." who is Bust??', size: 30, tail: 0.2 },
    { t0: T.read[1] - 1.6, t1: T.pose[0], x: 400, y: 660, text: '"PLEASE DO NOT—" ok ok', size: 32, tail: 0.2 },
    { t0: T.pose[0] + 0.3, t1: T.pose[1], x: 400, y: 660, text: 'nailed it.', size: 40, tail: 0 },
    { t0: T.guard, t1: T.s2 + 1.2, x: 860, y: 800, text: 'please don’t touch.', size: 30, tail: 0.4 },
    { t0: T.lonely, t1: T.chair, x: 330, y: 560, text: 'it’s about loneliness.', size: 36, tail: -0.1 },
    { t0: T.chair, t1: T.brush, x: 700, y: 720, text: 'it’s a chair.', size: 42, tail: 0.1 },
    { t0: T.brush, t1: T.s4 + 1.2, x: 680, y: 720, text: 'the brushwork… is… brushy.', size: 32, tail: 0.1 },
    { t0: T.gerald[0], t1: T.sock, x: 560, y: 900, text: 'his name is Gerald.', size: 36, tail: 0 },
    { t0: T.sock, t1: T.gerald[1] + 1, x: 560, y: 900, text: 'Gerald lost a sock. look at him.', size: 32, tail: 0 },
    { t0: T.grab[1], t1: T.s6 + 1.6, x: 540, y: 960, text: 'wait. you got the CHAIR too?', size: 32, tail: 0 },
    { t0: T.hat[0] + 0.4, t1: T.one, x: 790, y: 620, text: 'should I get it?', size: 36, tail: 0 },
    { t0: T.hat[0] + 1.4, t1: T.one + 1, x: 290, y: 690, text: 'absolutely not. yes.', size: 34, tail: 0 },
    { t0: T.sit[1] + 1, t1: T.silence[0] + 2.5, x: 540, y: 780, text: '…', size: 60, tail: 0 },
    { t0: T.bingo + 0.6, t1: T.shh, x: 790, y: 448, text: 'IT’S SO BEAUTIFUL', size: 30, tail: 0.5, col: '#cfe8ff' },
    { t0: T.shh, t1: D + 1, x: 860, y: 800, text: 'shh!', size: 40, tail: 0.4 },
    { t0: T.sorry, t1: D + 1, x: 790, y: 448, text: 'sorry. (sob)', size: 30, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['whoosh', 0, 0.4, 0.05], ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.read[0] + i * 0.6), [880, 987.77, 1174.66][i % 3], 0.025, 0.3]), ['pluck', T.pose[0], 1318.51, 0.03, 0.4, 0.3], ['pluck', T.guard, 440, 0.04, 0.5, 0.4],
    ['pluck', T.lonely, 587.33, 0.035, 0.8, -0.3], ['pop', T.chair, 1174.66, 0.04, 0.3], ['pluck', T.sock, 1318.51, 0.035, 0.5, 0], ['tom', T.grab[1], 110, { gain: 0.18, decay: 0.15 }], ['pop', T.hat[0], 1567.98, 0.04, 0.3],
    ['riser', T.silence[0], T.silence[1], 0.015], ['pluck', T.shh, 2093, 0.03, 0.3, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED]
