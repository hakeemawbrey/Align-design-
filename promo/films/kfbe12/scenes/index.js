// kfbe12: FIRST DATE BINGO E12, "Pisces goes on a first date" (vertical, star_talk post, music: dreamy · E).
// No end card, no card transition; hard cut on the last line. The host is ON the date, so THE STARS sub in the booth.
//   0.0   frame 0: ♓ Pisces mid-sob over a menu, tears arcing; the dauber mid-slam on CRIES AT THE MENU.
//         Hook: "The *host* went | on a date."  0.6 record scratch: "the booth is *empty.*"
//   3.2   the candle is lit; Pisces sobs → CRIES AT THE CANDLE (3.6) · 5.0 ♉ Taurus: "you look really nice tonight."
//         → CRIES BECAUSE THEY'RE KIND (5.6) · 6.6 Taurus passes a napkin: "I cry at stuff too." → THEY CRY TOO (7.6)
//   7.85  BINGO; Pisces happy-sobs a fountain · 9.4 "Soft isn’t too much. | *It’s a match.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 12.4
const T = { rec: 0.6, lit: 3.2, s1: 3.6, nice: 5.0, s2: 5.6, napkin: [6.6, 7.1], s3: 7.6, bingo: 7.85, last: 9.4 }

const EP = makeBingo({
  id: 'kfbe12', D, n: 3, ink: '#5a8af0', cardTag: '♓ × ♉', host: false,
  squares: [
    { text: 'CRIES AT THE MENU', at: -0.04 }, { text: 'CRIES BECAUSE THEY’RE KIND', at: T.s2 }, { text: 'NAMES THE CANDLE' },
    { text: 'CRIES AT THE CANDLE', at: T.s1 }, { free: true }, { text: 'BROUGHT TISSUES (A LOT)' },
    { text: 'THEY CRY TOO', at: T.s3 }, { text: 'WAVES AT THE MOON' }, { text: 'HUGS THE SERVER' },
  ],
  win: [0, 3, 6], bingoAt: T.bingo,
  hook: { text: 'The *host* went | on a date.', out: [2.9, 3.1], accentColor: '#b8a8ff' },
  rec: { at: T.rec, len: 1.4, caption: 'the booth is *empty.*', sub: 'who’s hosting?', top: 1000 },
  heads: [{ text: 'Soft isn’t too much. | *It’s a match.*', at: T.last, accent: '#b8a8ff', late: 3, lateAt: T.last + 0.4, wobble: true }],
  scene(x, t) {
    cafe(x, t, { wall: '#262046', trim: '#322a5a' })
    // the booth: empty at first, then THE STARS sub in
    const sk = inK(t, 2.2, 0.4)
    const cx = 940 - 140, cy = 560, r = 52
    x.save(); x.translate(cx, cy); x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke(); x.restore()
    if (sk > 0.01) star(x, t, 'stars', { x: 940, y: 530, s: 140 * sk, mood: t > T.bingo ? 'happy' : 'neutral', look: [-1, 0.6], hops: [T.s1, T.s2, T.s3, T.bingo], seed: 2, glyph: false })
    box(x, 940 - 85, 600, 170, 64, '#e85a8a', { b: 6, hi: '#ff86ad' })
    x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText(sk > 0.5 ? 'SUB HOST' : 'HOST', 940, 633)
    // Pisces, crying the whole date (happy tears at the end)
    let pm = 'wide', pl = [0.3, 1], tears = 3
    if (t > T.lit && t < T.nice) { pm = 'sparkle'; pl = [1, 0.8]; tears = 2 }
    if (t > T.nice) { pm = 'sparkle'; pl = [1, 0]; tears = 3 }
    if (t > T.napkin[1]) { pm = 'happy'; pl = undefined; tears = 2 }
    if (t > T.bingo) tears = 3
    shadow(x, 290, 1150, 220)
    star(x, t, 'pisces', { x: 290, y: 880, s: 250, mood: pm, look: pl, tears, hops: [0.1, T.s1, T.s2, T.s3, T.bingo + 0.3], seed: 6 })
    // the menu (frame 0)
    const mk = 1 - inK(t, 2.6, 0.3)
    if (mk > 0.01) { x.save(); x.translate(420, 960); x.rotate(-0.2); x.scale(mk, mk); box(x, -60, -80, 120, 160, '#7a2a3a', { b: 5 }); R(x, GOLD, -36, -50, 72, 8); for (let i = 0; i < 4; i++) R(x, '#f2d0a0', -36, -26 + i * 20, 72, 6); x.restore() }
    let tm = 'neutral', tl = [-1, 0]
    if (t > T.nice - 0.2) { tm = 'happy'; tl = undefined }
    if (t > T.napkin[0] + 0.4) { tm = 'sparkle'; tl = [-1, 0] }
    shadow(x, 790, 1150, 210)
    star(x, t, 'taurus', { x: 790, y: 890, s: 230, mood: tm, look: tl, tears: t > T.napkin[0] + 0.4 ? 1 : 0, hops: [T.nice, T.napkin[0], T.bingo + 0.4], seed: 4 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010, inK(t, T.lit, 0.2))
    // the napkin slides across
    const nk = ease.inOutCubic(prog(t, ...T.napkin))
    if (t > T.napkin[0]) box(x, lerp(700, 420, nk) - 40, 985, 80, 18, '#ffffff', { b: 4 })
    if (t > T.bingo) hearts(x, t, T.bingo, 540, 760, { n: 6 })
  },
  bubbles: [
    { t0: T.nice, t1: T.napkin[0] - 0.05, x: 720, y: 700, text: 'you look really nice tonight.', size: 32, tail: 0.3 },
    { t0: T.napkin[0], t1: T.last - 0.1, x: 740, y: 700, text: 'I cry at stuff too.', size: 38, tail: 0.3 },
    { t0: 2.4, t1: 4.2, x: 790, y: 430, text: 'we’ll take it from here.', size: 30, tail: 0.5, col: '#ffe9a8' },
  ],
  cues: [['pop', 2.4, 739.99, 0.035, 0.4], ['pluck', T.lit, 1318.51, 0.035, 0.6, 0], ['pluck', T.nice, 1174.66, 0.035, 0.5, 0.3], ['whoosh', T.napkin[0], 0.3, 0.025]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, drawBits, outK, pop01, win01, r3, BONE]
