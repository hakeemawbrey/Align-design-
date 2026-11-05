// kfbe02: FIRST DATE BINGO E2, "Taurus judges the date by the bread" (vertical, star_talk post, music: lofi · F).
// No end card, no card transition; hard cut on the last line. Kit: ../../kfbe01/scenes/bingokit.js.
//   0.0   frame 0: ♉ Taurus mid-bite of a bread roll, eyes shut in bliss, crumbs mid-air; the dauber mid-slam on
//         RATES THE BREAD. Hook: "Taurus is rating | *the bread.*"  0.55 shake + a "10/10" paddle slams up.
//   3.4   ORDERS THE SAFE DISH (the same pasta, a sign: "AGAIN") · 5.8 Taurus eyes the date's fries → EYES ON YOUR FRIES
//   8.0   ♐ Sagittarius slides the last bite across: SHARES THE LAST BITE (8.9) → BINGO (9.15), the host weeps
//   10.9  "Shared the last bite? | *That's* the bingo." · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, dish, drawBits, hearts, box, R, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, GREEN, INTER } from '../../kfbe01/scenes/bingokit.js'
import { HK } from '../../kfbe01/scenes/bingokit.js'

const D = 13.6
const T = { bite: [-0.6, 0.5], paddle: 0.55, safe: 3.4, eye: [5.0, 7.6], fries: 5.8, slide: [8.0, 8.8], last: 8.9, bingo: 9.15, end: 10.9 }
const SHAKE = { at: T.paddle, len: 0.4, amp: 18 }

const EP = makeBingo({
  id: 'kfbe02', D, n: 3, ink: '#d8603a', cardTag: '♉ × ♐',
  squares: [
    { text: 'ORDERS THE SAFE DISH', at: T.safe }, { text: 'RATES THE BREAD', at: -0.04 }, { text: 'ASKS FOR MORE BUTTER' },
    { text: 'SMELLS THE MENU' }, { free: true }, { text: 'EYES ON YOUR FRIES', at: T.fries },
    { text: '"I COULD LIVE HERE"' }, { text: 'SHARES THE LAST BITE', at: T.last }, { text: 'NAPS AFTER DESSERT' },
  ],
  win: [1, 4, 7], bingoAt: T.bingo,
  heads: [
    { text: 'Shared the last bite? | *That’s* the bingo.', at: T.end, accent: GOLD, late: 2, lateAt: T.end + 0.4, wobble: true },
  ],
  hook: { text: 'Taurus is rating | *the bread.*', out: [3.0, 3.25], accentColor: '#9fe6b0' },
  effects: [[HK.screenShake, HK.shakeCues, SHAKE]],
  scene(x, t) {
    cafe(x, t, { wall: '#2d1f3f' })
    const sl = ease.inOutCubic(prog(t, ...T.slide))
    // Taurus (left)
    let tm = 'happy', tl
    if (t < T.bite[1]) tm = 'sleepy'
    if (t > T.eye[0] && t < T.eye[1]) { tm = 'sparkle'; tl = [1, 0.6] }
    if (t > T.slide[0] && t < T.last) { tm = 'wide'; tl = [1, 0.5] }
    if (t > T.last) tm = 'heart'
    shadow(x, 300, 1150, 220)
    star(x, t, 'taurus', { x: 300, y: 880, s: 250, mood: tm, look: tl, zzz: false, hops: [T.paddle, T.safe, T.fries, T.last, T.bingo + 0.3], seed: 4 })
    shadow(x, 790, 1150, 210)
    star(x, t, 'sagittarius', { x: 790, y: 890, s: 230, mood: t > T.slide[0] ? 'happy' : 'neutral', look: t > T.slide[0] ? undefined : [-1, 0], hops: [T.slide[0], T.bingo + 0.4], seed: 9 })
    table(x, 540, 1010, 560)
    candle(x, t, 560, 1010)
    // the bread roll: mid-bite at frame 0 (held up, crumbs flying)
    const by = t < T.bite[1] ? 900 : lerp(900, 1000, inK(t, T.bite[1], 0.3))
    dish(x, 360, by, 'bread', 1)
    if (t < 1.2) for (let i = 0; i < 9; i++) { const ph = clamp01((t + 0.6 + i * 0.04) / 1.6); R(x, '#f0b46a', 360 + Math.cos(i * 1.9) * 140 * ph, by - 60 - Math.sin(i * 1.3 + 1) * 120 * ph + 300 * ph * ph, 12, 12) }
    // the 10/10 paddle
    const pk = pop01(t, T.paddle, 0.25, 2.6) * outK(t, [2.8, 3.1])
    if (pk > 0.01) { x.save(); x.translate(160, 680); x.rotate(-0.15); x.scale(pk, pk); box(x, -80, -56, 160, 112, BONE, { b: 6 }); R(x, INK, -8, 56, 16, 90); x.font = `900 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d8603a'; x.fillText('10/10', 0, 4); x.restore() }
    // the safe dish lands with an AGAIN tag
    if (t > T.safe - 0.3) { dish(x, 420, 1000 - 40 * (1 - inK(t, T.safe - 0.3, 0.3)), 'pasta', 0.9); label(x, 'AGAIN', 420, 900, { size: 30, col: '#ffd23a', alpha: win01(t, T.safe, T.safe + 1.6), font: INTER, weight: 800 }) }
    // the date's fries slide across
    const fx2 = lerp(700, 540, sl)
    if (t < T.last + 0.2) dish(x, fx2, 1000, 'fries', 0.9)
    else dish(x, 540, 1000, 'fries', 0.9 * (1 - inK(t, T.last + 0.2, 0.6)))
    if (t > T.eye[0] && t < T.eye[1]) { const k = win01(t, T.eye[0], T.eye[1]); x.save(); x.globalAlpha = k; for (let i = 0; i < 3; i++) R(x, '#ffd23a', 380 + i * 70 + 20 * Math.sin(t * 6 + i), 820 + i * 22, 40, 6); x.restore() }
    if (t > T.last) hearts(x, t, T.last + 0.1, 300, 720, { n: 5 })
  },
  bubbles: [
    { t0: T.slide[0] + 0.2, t1: T.end - 0.1, x: 760, y: 700, text: 'last bite is yours.', size: 38, tail: 0.2 },
    { t0: T.bingo + 0.5, t1: D + 1, x: 800, y: 448, text: 'THE BREAD! THE BITE!', size: 34, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['pluck', T.paddle, 1174.66, 0.04, 0.5, -0.3], ['tick', r3(T.safe - 0.05), 0.04], ['whoosh', T.slide[0], 0.4, 0.03], ['pluck', r3(T.last + 0.1), 1567.98, 0.035, 0.5, -0.2]],
})
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, GREEN, GOLD, lerp]
