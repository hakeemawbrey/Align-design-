// kfbe07: FIRST DATE BINGO E7, "Libra says “I don't mind, you pick”" (vertical, star_talk post, music: jazzy · Bb).
// No end card, no card transition; LOOP ending (the date says it back, and we're at frame 0 again).
//   0.0   frame 0: ♎ Libra mid-shrug, two menus spinning round its head; the dauber mid-slam on "I DON'T MIND, YOU
//         PICK". Hook: "“I don’t mind. | *You* pick.”"  0.6 record scratch: "this is *round three.*"
//   2.6   again → "I DON'T MIND" (AGAIN) · 4.2 the clock jumps 8:02 → 8:31 · 5.0 the server fell asleep (zzz)
//   6.2   Libra, finally: "…actually, I want the pasta." → SAID WHAT THEY WANTED (7.0) → BINGO (7.25), the host bawls
//   8.4   "Your *wants* are allowed | on the menu." · 10.6 ♏ Scorpio: "I don't mind, you pick" → loop.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, clockFace, dish, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, INK, BONE, GOLD, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 11.8
const T = { rec: 0.6, again: 2.6, jump: 4.2, asleep: 5.0, want: 6.2, s3: 7.0, bingo: 7.25, last: 8.4, back: 10.4 }

function menu(x, cx, cy, rot, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -50, -70, 100, 140, '#7a2a3a', { b: 5, hi: '#9a3a4a' }); R(x, GOLD, -30, -40, 60, 8); for (let i = 0; i < 4; i++) R(x, '#f2d0a0', -30, -16 + i * 18, 60, 6); x.restore() }

const EP = makeBingo({
  id: 'kfbe07', D, n: 3, ink: '#e85a8a', cardTag: '♎ × ♏', ending: 'loop',
  squares: [
    { text: '"I DON’T MIND, YOU PICK"', at: -0.04 }, { text: 'ASKS THE TABLE NEXT DOOR' }, { text: 'LIKES BOTH OPTIONS' },
    { text: '"I DON’T MIND" (AGAIN)', at: T.again }, { free: true }, { text: 'ORDERS WHAT YOU ORDER' },
    { text: 'FLIPS A COIN, IGNORES IT' }, { text: 'THE SERVER FELL ASLEEP', at: T.asleep }, { text: 'SAID WHAT THEY WANTED', at: T.s3 },
  ],
  win: [0, 4, 8], bingoAt: T.bingo,
  hook: { text: '“I don’t mind. | *You* pick.”', out: [2.3, 2.5], accentColor: '#ff9ac4' },
  rec: { at: T.rec, len: 1.4, caption: 'this is *round three.*', sub: 'the menus have been open since 8:02', top: 1000 },
  heads: [{ text: 'Your *wants* are allowed | on the menu.', at: T.last, out: [11.0, 11.35], accent: '#ff9ac4' }],
  scene(x, t) {
    cafe(x, t, { wall: '#3a2040', trim: '#4a2a50' })
    const mins = t < T.jump ? 2 + Math.floor(Math.max(0, t) / 2) : t < T.jump + 0.5 ? lerp(4, 31, prog(t, T.jump, T.jump + 0.5)) : 31
    clockFace(x, 200, 560, 58, 8, Math.round(mins))
    let lm = 'neutral', ll = [0, -1]
    if (t > T.again - 0.2 && t < T.want) { lm = 'squint'; ll = [Math.sin(t * 3) > 0 ? 1 : -1, -1] }
    if (t > T.want) { lm = 'wide'; ll = [1, 0] }
    if (t > T.s3) { lm = 'happy'; ll = undefined }
    if (t > T.back) { lm = 'neutral'; ll = [0, -1] }
    shadow(x, 290, 1150, 220)
    const shrug = t < 1.4 || (t > T.again - 0.1 && t < T.again + 0.8) || t > T.back + 0.6 ? 0.1 : 0
    star(x, t, 'libra', { x: 290, y: 880, s: 250, mood: lm, look: ll, hops: [T.again, T.want, T.s3, T.bingo + 0.3], seed: 9, squash: -shrug })
    // the two menus orbiting Libra's head (frame 0, the again-beat and the loop-back)
    const mk = Math.max(1 - inK(t, 1.4, 0.3), win01(t, T.again - 0.1, T.want, 0.25), inK(t, T.back + 0.6, 0.4))
    if (mk > 0.01) for (let i = 0; i < 2; i++) { const a = t * 4 + i * Math.PI; menu(x, 290 + Math.cos(a) * 190, 740 + Math.sin(a) * 50, Math.sin(a) * 0.4, mk) }
    shadow(x, 790, 1150, 210)
    star(x, t, 'scorpio', { x: 790, y: 890, s: 230, mood: t > T.s3 ? 'heart' : t > T.again ? 'squint' : 'neutral', look: t > T.s3 ? undefined : [-1, 0], hops: [T.s3 + 0.2, T.back], seed: 10 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    if (t > T.s3) dish(x, 380, 1000, 'pasta', 0.9 * inK(t, T.s3, 0.3))
    // the server, asleep standing up
    const sv = inK(t, T.asleep - 0.6, 0.4) * outK(t, [T.want + 0.2, T.want + 0.6])
    if (sv > 0.01) { star(x, t, 'grey', { x: lerp(1150, 960, sv), y: 980, s: 150, mood: 'sleepy', seed: 13 }); box(x, lerp(1150, 960, sv) - 60, 900, 60, 80, BONE, { b: 4 }) }
    if (t > T.s3 + 0.2 && t < T.back) hearts(x, t, T.s3 + 0.2, 790, 740, { n: 4 })
  },
  bubbles: [
    { t0: T.again, t1: T.jump - 0.1, x: 330, y: 640, text: 'I don’t mind! you pick!', size: 40, tail: -0.2 },
    { t0: T.want, t1: T.last - 0.1, x: 360, y: 640, text: '…actually? I want the pasta.', size: 36, tail: -0.2 },
    { t0: T.bingo + 0.5, t1: T.back, x: 790, y: 448, text: 'THE PASTA!!', size: 34, tail: 0.5, col: '#cfe8ff' },
    { t0: T.back, t1: D + 1, x: 740, y: 690, text: 'hm. I don’t mind, you pick.', size: 34, tail: 0.3 },
  ],
  cues: [['whoosh', T.jump, 0.5, 0.03], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.jump + i * 0.06), 0.03]), ['pluck', T.want, 1318.51, 0.04, 0.5, -0.2], ['pop', T.back, 739.99, 0.035, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, drawBits, ease, INK, INTER, pop01, lerp]
