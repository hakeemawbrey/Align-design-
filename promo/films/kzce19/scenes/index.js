// kzce19: ZODIAC COURTROOM, "Thriving (Allegedly)" (75 s vertical, Month 2 boost m06 #19, long, dreamy · F). Hard cut.
//   0.0   frame 0: ♌ Leo mid-pose in the dock holding a big THRIVING sign; gavel mid-slam. 0.25 record scratch:
//         "*thriving* (allegedly)".   Hook: "Leo is *thriving* | after the breakup. Allegedly."   3.2 "Watch till the *end.*"
//   CH.1 OPENING (5.4): JUDGE: "the defendant claims to be *thriving.*" · ♋ prosecution: "they posted 'thriving' every
//         day for a *week.*" · "nobody thrives *that* loudly." · ♒ defence: "my client is a *very* good actor." ·
//         "…wait. that doesn't *help.*"
//   CH.2 THE EVIDENCE (18.0): A the posts (thriving!! · best week ever · so free · living my best life) ·
//         B the 2 a.m. scroll: 2:14 AM, old photos, typing… deleted (gasp)
//   CH.3 WITNESSES (34.0): ♐ best friend: "they called me *crying.*" · "twice. I brought *soup.*" · surprise witness
//         THE EX: "honestly? I'm sad *too.*" · "we can both miss it and still *move on.*" · "you don't have to *perform* for me."
//   CH.4 CLOSING (50.0): Leo puts the sign down: "…I'm not thriving. I'm *healing.*" · "some days are *slow.*"
//   CH.5 THE VERDICT (60.0): NOT GUILTY (HEALING ISN'T A SHOW) · "call a friend. take the slow days." · 65.0 ♓ Pisces
//         climbs out of the jury box and hugs Leo; both cry, happy · JUDGE: "this court is *proud* of you." (gavel)
//   73.0  last line "Healing doesn't need | an *audience.*" holds to 75.0, hard cut.
import { makeCourt, drawChat, star, label, box, R, clamp, prog, ease, lerp, INK, RED, GOLD, PINK, popWords } from '../../kzce01/scenes/courtkit.js'

const seq = (t, list) => { let v = list[0][1]; for (const [a, m] of list) if (t >= a) v = m; return v }
const T = { pros: 7.8, def: 13.0, evA: 18.4, evB: 25.0, bff: 34.2, wit: 40.4, close: 50.0, down: 50.6, ng: 60.6, hug: 65.0, adj: 71.0, last: 73.0 }
const CH = [
  { at: 5.4, out: [17.7, 18.0], title: 'OPENING STATEMENTS' }, { at: 18.0, out: [33.7, 34.0], title: 'THE EVIDENCE' },
  { at: 34.0, out: [49.7, 50.0], title: 'THE WITNESSES' }, { at: 50.0, out: [59.7, 60.0], title: 'CLOSING' }, { at: 60.0, out: [72.7, 73.0], title: 'THE VERDICT' },
]
const POSTS = [['thriving!!', 19.0], ['best week ever', 19.8], ['so free', 20.6], ['living my best life', 21.4]]
function sign(x, t, P) {
  const d = ease.inCubic(clamp(prog(t, T.down, T.down + 0.7)))
  x.save(); x.translate(P.x + 120, P.y - 150 + d * 260); x.rotate(0.08 * Math.sin(t * 3) * (1 - d) + d * 0.4)
  R(x, INK, -8, 40, 16, 150); R(x, '#a07850', -4, 40, 8, 146)
  box(x, -150, -60, 300, 110, '#fffaf0', { b: 6, hi: null }); label(x, 'THRIVING', 0, -4, { size: 56, col: '#f39a3a', weight: 900, shadow: false })
  x.restore()
}
const lMood = t => seq(t, [[0, 'sparkle'], [1.4, 'happy'], [10.6, 'squint'], [18.4, 'neutral'], [29, 'wide'], [34, 'neutral'], [T.wit, 'wide'], [43, 'neutral'], [T.close, 'neutral'], [T.ng, 'wide'], [62, 'happy'], [T.hug, 'sparkle']])
const leo = (from, to) => ({ who: 'leo', from, to, mood: lMood, hops: [0.0, 0.5, 1.0, T.hug + 0.5, T.hug + 1.0], tears: t => t > T.down + 0.8 && t < T.ng ? 2 : t > T.hug + 0.4 ? 3 : 0,
  look: t => t > T.hug ? [1, 0] : undefined, prop: (x, t, P) => { if (t < T.down + 0.8) sign(x, t, P) } })
function hugger(x, t) {
  if (t < T.hug) return
  const k = ease.inOutCubic(clamp(prog(t, T.hug, T.hug + 1.1)))
  const px = lerp(712, 430, k), py = lerp(1105, 1080, k) - 120 * Math.sin(Math.PI * k)
  star(x, t, { x: px, y: py, s: lerp(140, 200, k) }, { who: 'pisces', mood: k < 1 ? 'wide' : 'sparkle', look: [-1, 0], seed: 71, tears: 3, hops: [T.hug + 1.3, T.hug + 1.8, T.hug + 2.3] })
  if (k >= 1) for (let i = 0; i < 5; i++) { const ph = ((t - T.hug) * 0.5 + i / 5) % 1; label(x, '♥', 300 + Math.sin(i * 3 + t) * 100, 940 - ph * 260, { size: 40, col: PINK, alpha: 1 - ph, weight: 900 }) }
}
const CFG = {
  id: 'kzce19', dur: 75, ending: 'cut',
  hook: { at: -1, text: 'Leo is *thriving* | after the breakup. Allegedly.', out: [3.0, 3.2], accentColor: '#f39a3a', size: 90 },
  heads: [
    { text: 'Watch till the *end.*', at: 3.2, out: [5.2, 5.4], accent: GOLD, size: 104, late: 1, lateAt: 3.5 },
    { text: "Healing doesn't need | an *audience.*", at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#f39a3a', size: 98 },
  ],
  chapters: CH,
  fx: { recs: [{ at: 0.25, len: 1.0, caption: '*thriving* (allegedly)', top: 1480 }], whips: [{ at: T.evA - 0.05, from: 1.15 }, { at: T.wit, from: 1.3 }, { at: T.ng + 0.08, from: 1.2 }, { at: T.hug + 1.1, from: 1.12 }],
    flashes: [[T.wit, '#ffffff'], [T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 5.5, T.wit - 1.2, T.ng, T.adj],
  gasps: [10.8, 29.0, T.wit + 0.1, 43.4, T.ng + 0.1, T.hug + 1.1],
  jury: t => ['gemini', 'capricorn', 'virgo', t < T.hug ? 'pisces' : null, 'taurus', 'scorpio'],
  tears: () => 3,
  juryTears: t => (t > 43 && t < 50) || t > T.hug + 1 ? 1 : 0,
  juryMood: (t, id) => { if (t > 15.6 && t < 18) return 'happy'; if (t > T.hug + 1.1) return 'sparkle'; void id },
  judge: { mood: t => seq(t, [[0, 'wide'], [1.4, 'squint'], [10.6, 'happy'], [13, 'neutral'], [15.6, 'eyeroll'], [18.4, 'neutral'], [29, 'wide'], [34, 'neutral'], [T.wit, 'wide'], [43, 'sparkle'], [T.ng, 'neutral'], [T.hug + 1, 'sparkle']]),
    tears: t => t > T.hug + 1 ? 2 : (t > 52 && t < 60 ? 1 : 0), look: t => (t > T.evA && t < 33.6) ? [0, 1] : t > 5.5 ? [-1, 1] : [0, 0.3] },
  dock: [
    leo(-1, T.pros),
    { who: 'cancer', from: T.pros, to: T.def, plate: 'PROSECUTION', mood: t => t < 10.4 ? 'neutral' : 'squint', look: () => [1, -0.4] },
    { who: 'aquarius', from: T.def, to: T.evA, plate: 'DEFENCE', mood: t => t < 15.4 ? 'happy' : 'wide', look: () => [1, -0.4] },
    leo(T.evA, T.bff),
    { who: 'sagittarius', from: T.bff, to: T.wit, plate: 'BEST FRIEND', mood: t => t < 36.6 ? 'neutral' : 'happy', look: () => [1, -0.4] },
    { who: 'ex', from: T.wit, to: T.close, plate: 'WITNESS', mood: t => seq(t, [[0, 'neutral'], [43, 'happy'], [46.2, 'sparkle']]), look: () => [1, -0.3], tears: t => t > 40.6 && t < 46 ? 1 : 0 },
    leo(T.close, 1e9),
  ],
  ticker: { at: 1.0, out: [72.7, 73.0], label: 'CHARGE', text: 'POSTED "THRIVING" EVERY DAY FOR A WEEK AFTER THE BREAKUP' },
  boxes: [
    { open: 1.3, close: 3.15, lines: [{ t: 1.45, who: 'leo', text: 'never *better!!*' }] },
    { open: 5.6, close: 7.7, lines: [{ t: 5.7, who: 'JUDGE', text: 'the defendant claims to be *thriving.*' }] },
    { open: 7.95, close: 12.9, lines: [{ t: 8.05, who: 'cancer', text: "they posted 'thriving' every day for a *week.*" }, { t: 10.6, who: 'cancer', text: 'nobody thrives *that* loudly.' }] },
    { open: 13.15, close: 17.8, lines: [{ t: 13.25, who: 'aquarius', text: 'my client is a *very* good actor.' }, { t: 15.6, who: 'aquarius', text: "…wait. that doesn't *help.*" }] },
    { open: 34.35, close: 38.9, lines: [{ t: 34.45, who: 'sagittarius', text: 'they called me *crying.*' }, { t: 36.8, who: 'sagittarius', text: 'twice. I brought *soup.*' }] },
    { open: 39.0, close: 40.3, lines: [{ t: 39.05, who: 'JUDGE', text: 'surprise *witness!*' }] },
    { open: 40.6, close: 49.8, lines: [{ t: 40.7, who: 'ex', text: "honestly? I'm sad *too.*" }, { t: 43.2, who: 'ex', text: 'we can both miss it and still *move on.*' }, { t: 46.4, who: 'ex', text: "you don't have to *perform* for me." }] },
    { open: 51.5, close: 59.8, lines: [{ t: 51.6, who: 'leo', text: "…I'm not thriving. I'm *healing.*" }, { t: 54.8, who: 'leo', text: 'some days are *slow.*' }, { t: 57.4, who: 'leo', text: "and that's *okay.*" }] },
    { open: 67.9, close: 72.8, lines: [{ t: 68.0, who: 'JUDGE', text: 'this court is *proud* of you.' }] },
  ],
  exhibits: [
    { at: T.evA, out: [24.5, 24.8], label: 'EXHIBIT A', draw(x, t, k, B) {
      POSTS.forEach(([s, a], i) => { const kk = ease.outBack(clamp(prog(t, a, a + 0.25))); if (kk <= 0) return
        const cx = B.cx + (i % 2 ? 175 : -175), cy = B.cy + (i < 2 ? -170 : 170)
        x.save(); x.translate(cx, cy); x.rotate(i % 2 ? 0.04 : -0.04); x.scale(kk, kk)
        box(x, -150, -150, 300, 300, '#fffaf0', { b: 5, hi: null }); R(x, ['#ffd9a0', '#ffc2d4', '#c9e6ff', '#d4f5d0'][i], -134, -134, 268, 200)
        star(x, t, { x: 0, y: -20, s: 130 }, { who: 'leo', mood: 'sparkle', seed: 80 + i, glow: 0.5, look: [0, 0] })
        label(x, s, 0, 105, { size: 28, col: INK, weight: 900, shadow: false }); x.restore() })
    } },
    { at: T.evB, out: [33.4, 33.7], label: 'EXHIBIT B', draw(x, t, k, B) {
      label(x, '2:14 AM', B.cx, B.cy - 280, { size: 60, col: '#7fd0ff', weight: 900, font: "'Space Mono', monospace" })
      drawChat(x, t, { cx: B.cx, cy: B.cy + 50, w: 560, h: 560 }, { title: '♌︎ old photos', size: 36, msgs: [{ at: 25.6, side: 'C', text: 'photo · last summer' }, { at: 26.4, side: 'C', text: 'photo · the beach' }, { at: 27.2, side: 'C', text: 'photo · us' }, { at: 28.4, side: 'R', text: 'hey I miss' }], typing: [28.9, 30.4] })
      if (t > 30.4) label(x, 'deleted.', B.cx + 120, B.cy + 260, { size: 44, col: RED, weight: 900, rot: -0.08, alpha: clamp(prog(t, 30.4, 30.6)) })
    } },
  ],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', sub: "HEALING ISN'T A SHOW", color: '#2fae6a', out: [64.4, 64.7], y: 860, size: 118 }],
  sentence: { at: 61.4, out: [64.4, 64.7], text: 'call a friend. go slow.' },
  front(x, t) { hugger(x, t) },
  cues: [...POSTS.map(([, a], i) => ['pop', a, [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.2 : -0.2]), ...[25.6, 26.4, 27.2].map(a => ['tick', a, 0.05]), ['pop', 28.4, 659.25, 0.04, 0.2], ['pluck', 30.4, 392, 0.05, 0.6, 0],
    ['riser', 39.0, T.wit, 0.04], ['whoosh', T.down, 0.5, 0.04], ['tom', T.down + 0.7, 110, { gain: 0.2, decay: 0.3 }], ['whoosh', T.hug, 0.6, 0.05], ['glitter', T.hug + 1.1, T.hug + 2], ['bell', T.hug + 1.2, 1760, 0.03, 1.4, 0],
    ...[52, 52.3, 52.6].map(a => ['pluck', a, 587.33, 0.03, 0.4, -0.4]), ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
