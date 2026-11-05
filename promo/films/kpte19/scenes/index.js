// kpte19: THE 10-SECOND PEP TALK, Ep 19 "The full pep talk: you got ghosted" (long, batch m14, synthwave · Fm).
// Format kit: ../../kpte01/pepkit-long.js. Rows: promo/films/month2/m14.md.
//   0.0–3.2   frame 0: ♍ Virgo mid-slide across the floor, Aries's phone mid-flight toward the wall · "Aries got ghosted. |
//             *Stay* for this." · glitch at 0.42 · chip "the last line | *hits*".
//   1 THE SILENCE  three texts, three days, all grey ticks. Pisces sobs at every grey tick.
//   2 THE BLAME    Aries's list of "crimes": too loud? too fast? the pun at dinner?
//   3 THE TRUTH    "their silence is about *their* skills. not your *worth.*"
//   4 THE CLOSE    one kind closing text, sent; phone face down; ACHIEVEMENT: closure (self-made).
//   5 THE LAST LINE  "Silence isn't | *your* sentence."  Hard cut.
import { makeLong } from '../../kpte01/pepkit-long.js'
import { room, phone, note, label, stamp, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../../kpte01/pepkit.js'

const den = (x, t) => room(x, t, { wall: '#2a1f48', wall2: '#251a42', floor: '#352646', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 })
function hook(x, t, S) {
  den(x, t)
  S.L(x, t, { x: 820, y: 960, s: 230, mood: 'squint', look: [-1, -0.5], squash: -0.06, blink: false })
  x.save(); x.translate(560 + 40 * Math.sin(t * 3), 640); x.rotate(1 + t * 5); box(x, -45, -80, 90, 160, '#2a2148', { b: 6 }); R(x, '#9a94b8', -34, -60, 68, 110); x.restore()
}
const MSGS = [
  { at: 0.0, side: 'R', text: 'had so much fun saturday!', read: 'delivered · sat', col: '#8a86a0' },
  { at: 0.0, side: 'R', text: 'hey, you around this week?', read: 'delivered · mon', col: '#8a86a0' },
  { at: 0.0, side: 'R', text: 'all good?', read: 'delivered · tue', col: '#8a86a0' },
]
const pos = { L: { x: 820, y: 1150, s: 230 }, C: { x: 200, y: 1170, s: 210 }, P: { x: 960, y: 760, s: 110 } }
const EP = makeLong({
  id: 'kpte19', sign: 'aries', coach: 'virgo', end: 'cut', brk: 'glitch',
  hookLine: 'Aries got ghosted. | *Stay* for this.', promise: 'the last line | *hits*',
  hook,
  chapters: [
    { title: 'THE SILENCE', len: 15, set: den, pos, mood: 'wide', cmood: 'neutral', ptears: 3,
      props: (x, t, S) => phone(x, t, { cx: 470, top: 560, w: 540, h: 560, title: '♈︎ to: saturday’s date', msgs: MSGS.map((m, i) => ({ ...m, at: S.t0 + 0.3 + i * 1.2 })), size: 32, glowA: 1 }),
      lines: [[0.6, 'L', 'three days. *nothing.*'], [4.2, 'L', 'we had a GREAT *date.*'], [7.8, 'P', 'the grey ticks are making me *cry.*'], [11.4, 'C', 'okay. hand me the *phone.*']],
      cues: [['pop', 0.3, 659.25, 0.03, 0.3], ['pop', 1.5, 659.25, 0.03, 0.3], ['pop', 2.7, 659.25, 0.03, 0.3]] },
    { title: 'THE BLAME', len: 15, set: den, mood: 'wide', cmood: 'neutral', slump: 0.08,
      props: (x, t, S) => { ;['too loud?', 'too fast?', 'the pun at dinner?'].forEach((s, i) => note(x, 560 + (i - 1) * 40, 520 + i * 100, s, { w: 360, h: 76, col: '#ffd0d0', size: 32, txt: RED, rot: [-0.04, 0.03, -0.02][i], k: pop01(t, S.t0 + 1.0 + i * 1.6, 0.3, 2.4) * outK(t, [S.t0 + 11.2, S.t0 + 11.5]) })); stamp(x, t, 'NO CRIME FOUND', 560, 640, S.t0 + 11.6, { col: '#2a8a5a', size: 48 }) },
      lines: [[0.6, 'L', 'what did I *do?*'], [4.2, 'L', 'was I *too much?* too fast?'], [7.8, 'C', 'you’re making a list of *crimes.*'], [11.4, 'C', 'there’s no crime. just *silence.*']],
      cues: [['boom', 11.6, 0.15]] },
    { title: 'THE TRUTH', len: 15, set: den, mood: 'neutral', cmood: 'sparkle',
      props: (x, t, S) => { if (S.u > 0.9) note(x, 560, 640, 'their silence = | THEIR skills', { w: 420, h: 150, col: '#cfe6ff', size: 38, k: pop01(t, S.t0 + 0.9, 0.3, 2.4) * outK(t, [S.t0 + 7.6, S.t0 + 7.9]) }); if (S.u > 11.9) note(x, 560, 640, 'close it, kindly.', { w: 400, h: 100, col: MINT, size: 40, k: pop01(t, S.t0 + 11.9, 0.3, 2.4) }) },
      lines: [[0.6, 'C', 'their silence is about *their* skills.'], [4.2, 'C', 'not your *worth.*'], [7.8, 'L', 'so… I just *wait?*'], [11.4, 'C', 'no. you *close* it, kindly.']] },
    { title: 'THE CLOSE', len: 16, set: den, pos, mood: 'happy', cmood: 'happy', ptears: 3, pmood: 'sparkle',
      props: (x, t, S) => {
        if (S.u < 6) phone(x, t, { cx: 470, top: 560, w: 540, h: 520, title: '♈︎ to: saturday’s date', msgs: [{ at: S.t0 + 3.0, side: 'R', text: 'hey! seems like this isn’t a match. I had fun, take care :)', read: 'sent ✓' }], size: 32, glowA: 1 })
        else { const k = pop01(t, S.t0 + 6, 0.3, 2.4); x.save(); x.translate(520, 900); x.scale(k, k); box(x, -150, -18, 300, 36, '#2a2148', { b: 6 }); x.restore(); label(x, 'face down.', 520, 850, { size: 30, col: '#9a94b8', alpha: k }) }
      },
      fx: [['achievement', { at: 13.4, out: [15.5, 15.85], title: 'ACHIEVEMENT UNLOCKED', text: 'closure: *self-made*', y: 1250 }]],
      lines: [[0.6, 'C', 'one kind text. then you’re *done.*'], [4.4, 'L', 'sent. phone’s *face down.*'], [8.0, 'C', 'how do you *feel?*'], [11.2, 'L', '…*lighter.* weirdly lighter.']],
      cues: [['whoosh', 3.0, 0.3, 0.04], ['pop', 3.05, 987.77, 0.04, 0.3]] },
  ],
  last: 'Silence isn’t | *your* sentence.', lastLate: 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [BONE, PEP, GOLD, prog, ease, lerp]
