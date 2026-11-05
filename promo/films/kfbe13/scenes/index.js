// kfbe13: FIRST DATE BINGO E13, "Green flag bingo" (vertical, star_talk post, music: lofi · D).
// No end card, no card transition; hard cut on the last line. The card nobody plays: green flags only, green ink.
//   0.0   frame 0: the dauber mid-slam, a GREEN splat on ASKS A FOLLOW-UP; ♑ Capricorn mid-lean in: "wait, how did
//         that go?"; ♋ Cancer mid-story. Hook: "The card *nobody* plays: | green flags."  0.6 record scratch:
//         "wait. *it’s going well?*"
//   2.8   Capricorn to the server: "thank you so much!" → KIND TO THE SERVER (3.4)
//   4.5   Cancer: "why did the moon skip dinner? it was full." Capricorn laughs out loud → LAUGHS AT YOUR JOKE (5.4)
//   6.3   goodbye wave · 7.3 a text drops: "home safe? I had a really nice time." → TEXTS "HOME SAFE?" (8.0) → BINGO
//   9.4   the host, overwhelmed: "IT'S SO NICE" · 9.6 "Quiet green flags | *still count.*" · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, GREEN, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 12.4
const T = { rec: 0.6, server: 2.8, s1: 3.4, joke: 4.5, laugh: 5.1, s2: 5.4, bye: 6.3, text: 7.3, s3: 8.0, bingo: 8.25, sob: 9.4, last: 9.6 }
const NOTE = { at: T.text, out: [9.4, 9.7], title: 'texts', body: 'home safe? I had a *really* nice time.', glyph: '♑', color: '#5fd38a', y: 140 }

const EP = makeBingo({
  id: 'kfbe13', D, n: 3, ink: '#2fbf6a', cardTag: '♋ × ♑', cardTitle: 'GREEN FLAG CARD', cardHead: '#2fa860',
  squares: [
    { text: 'ASKS A FOLLOW-UP', at: -0.04 }, { text: 'KIND TO THE SERVER', at: T.s1 }, { text: 'PUTS THE PHONE AWAY' },
    { text: 'REMEMBERS YOUR STORY' }, { free: true }, { text: 'LAUGHS AT YOUR JOKE', at: T.s2 },
    { text: 'ON TIME, NO FUSS' }, { text: 'SAYS "I HAD FUN" FIRST' }, { text: 'TEXTS "HOME SAFE?"', at: T.s3 },
  ],
  win: [0, 4, 8], bingoAt: T.bingo, bingoStyle: { text: 'BINGO!', col: '#7dffb0' },
  hook: { text: 'The card *nobody* plays: | green flags.', out: [2.6, 2.8], accentColor: '#7dffb0', size: 88 },
  rec: { at: T.rec, len: 1.4, caption: 'wait. *it’s going well?*', sub: 'no red flags detected', top: 1000 },
  heads: [{ text: 'Quiet green flags | *still count.*', at: T.last, accent: '#7dffb0', late: 2, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.notification, HK.notificationCues, NOTE]],
  scene(x, t) {
    cafe(x, t, { wall: '#1e3030', trim: '#284040' })
    const away = ease.inOutCubic(prog(t, T.bye + 0.4, T.text))
    let cm = 'happy', cl
    if (t < 2.4) { cm = 'happy'; cl = [1, 0] }
    if (t > T.joke && t < T.laugh) { cm = 'sparkle'; cl = [1, 0] }
    if (t > T.text) { cm = 'sparkle'; cl = [0.4, -1] }
    if (t > T.bingo) cm = 'heart'
    shadow(x, lerp(290, 170, away), 1150, 220)
    star(x, t, 'cancer', { x: lerp(290, 170, away), y: 880, s: 250, mood: cm, look: cl, hops: [T.joke, T.laugh + 0.3, T.bye, T.s3, T.bingo + 0.3], seed: 2 })
    let pm = 'neutral', pl = [-1, 0]
    if (t > T.server - 0.2 && t < T.s1 + 0.5) { pm = 'happy'; pl = [1, 0] }
    if (t > T.laugh) { pm = 'happy'; pl = undefined }
    shadow(x, lerp(790, 920, away), 1150, 210)
    star(x, t, 'capricorn', { x: lerp(790, 920, away), y: 890, s: 230, mood: pm, look: pl, squash: t > T.laugh && t < T.laugh + 0.8 ? 0.06 * Math.sin(t * 30) : 0, hops: [T.server, T.laugh, T.laugh + 0.25, T.laugh + 0.5, T.bye], seed: 14 })
    if (away < 0.95) { x.save(); x.globalAlpha = 1 - away; table(x, 540, 1010, 520); candle(x, t, 540, 1010); x.restore() }
    // the server, thanked
    const sv = inK(t, T.server - 0.5, 0.4) * outK(t, [T.s1 + 0.9, T.s1 + 1.3])
    if (sv > 0.01) { star(x, t, 'grey', { x: lerp(1180, 980, sv), y: 980, s: 150, mood: t > T.s1 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 13 }); if (t > T.s1) hearts(x, t, T.s1, 980, 880, { n: 3, cols: ['#7dffb0', BONE] }) }
    // green flag pops
    for (const s of [T.s1, T.s2, T.s3]) { const k = pop01(t, s + 0.05, 0.3, 2.4) * outK(t, [s + 1.0, s + 1.3]); if (k > 0.01) { x.save(); x.translate(540, 640); x.scale(k, k); R(x, INK, -6, -60, 12, 130); R(x, BONE, -3, -58, 6, 126); drawBits(x, ['GGGGG', 'GGGGGG', 'GGGGG.'], { G: '#3fcf7a' }, 30, -40, 12); x.restore() } }
    if (t > T.bingo) hearts(x, t, T.bingo, 540, 760, { n: 6, cols: ['#7dffb0', '#ff8fb1', GOLD] })
  },
  bubbles: [
    { t0: -1.2, t1: 2.6, x: 700, y: 690, text: 'wait, how did that go?', size: 38, tail: 0.3 },
    { t0: T.server, t1: T.joke - 0.1, x: 760, y: 700, text: 'thank you so much!', size: 38, tail: 0.3 },
    { t0: T.joke, t1: T.laugh + 0.6, x: 380, y: 620, text: 'why did the moon skip dinner?', size: 32, tail: -0.2 },
    { t0: T.joke + 0.8, t1: T.bye, x: 380, y: 700, text: 'it was full.', size: 38, tail: -0.2 },
    { t0: T.laugh, t1: T.bye, x: 790, y: 690, text: 'HA! ok that’s good.', size: 34, tail: 0.3 },
    { t0: T.sob, t1: D + 1, x: 790, y: 448, text: 'IT’S SO NICE', size: 34, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['pop', T.server, 880, 0.035, 0.4], ['pluck', T.joke + 0.8, 1174.66, 0.035, 0.5, -0.3], ['pop', T.laugh, 1318.51, 0.035, 0.3], ['pop', T.laugh + 0.15, 1567.98, 0.03, 0.3], ['whoosh', T.bye + 0.4, 0.4, 0.025]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, win01, r3, GREEN, INTER]
