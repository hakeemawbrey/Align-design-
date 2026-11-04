// nffe10: FRIENDS FIRST ep 10, "When a friend is in a new relationship" (25 s vertical, star_advice, music: jazzy · Bb).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "Your friend *fell in love* | and vanished."  Friends' night at the long table: Gemini (mid-hop), Taurus and
//              Cancer, and one empty chair with a LIBRA name card. Labels tick over it: WEEK 2… WEEK 3… WEEK 4.
//              GEMINI: "ugh. they've totally *changed*."  Pisces sniffles at the end of the table.
//   7.0        card cut.  THE STARS: "'you've changed' pushes them *away*." → "'we miss you' invites them *back*."
//   13.6       the table. CHECK-IN: "we miss you! *bring them sometime?*"  Libra hops into the empty chair with a plate
//              of cookies; everyone cheers.
//   17.2       Last line: "Miss them *out loud.*"
import { makeFriends, stars, say, dinnerTable, box, R, INK, BONE, label, pop01, outK, hearts, sparkles, lerp, ease, prog } from '../../nffe01/scenes/friendskit.js'

const GEM = 'gemini', TAU = 'taurus', CAN = 'cancer', LIB = 'libra'
function chair(x, cx) { box(x, cx - 70, 900, 140, 190, '#6a4a3a', { b: 6, hi: 'rgba(255,255,255,0.15)' }); R(x, '#5a3d2e', cx - 50, 930, 100, 120) }
function nameCard(x, cx, cy) { box(x, cx - 70, cy - 26, 140, 52, BONE, { b: 5 }); label(x, 'LIBRA', cx, cy + 2, { size: 26, col: '#c0577a' }) }
function cookies(x, cx, cy) { box(x, cx - 70, cy - 10, 140, 20, '#f4f0ff', { b: 5 }); for (let i = 0; i < 4; i++) { R(x, INK, cx - 56 + i * 30, cy - 34 - (i % 2) * 10, 28, 24); R(x, '#d9a05a', cx - 53 + i * 30, cy - 31 - (i % 2) * 10, 22, 18); R(x, '#5a3d2e', cx - 46 + i * 30, cy - 26 - (i % 2) * 10, 5, 5) } }
const WEEKS = [[0.8, 'WEEK 2'], [2.2, 'WEEK 3'], [3.6, 'WEEK 4']]
const EP = makeFriends({
  id: 'nffe10', dur: 25, cut: 7.0,
  hook: { text: 'Your friend *fell in love* | and vanished.', out: 3.4, color: '#ffc8ec' },
  lines: [
    say(4.0, GEM, 'ugh. they’ve totally *changed*.'),
    stars(7.4, '“you’ve changed” pushes them *away*.'),
    stars(10.5, '“we miss you” invites them *back*.'),
  ],
  boxes: [{ from: 0, to: 1, close: 6.9 }, { from: 1, to: 3, close: 13.4 }],
  check: { at: 13.8, out: [16.9, 17.1], text: 'we miss you! | *bring them sometime?*' },
  last: { at: 17.2, text: 'Miss them *out loud.*', color: '#ffc8ec' },
  shots: [
    { at: 0, set: 'dinner', cam: [1.05, 540, 930], pis: { x: 960, y: 1260, s: 100, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        chair(x, 820)
        S.star(x, t, GEM, { x: 180, y: 1000, s: 220, mood: t < 3.9 ? 'neutral' : 'squint', look: [1, 0], hops: [-0.12, ...S.hopsFor(GEM)] })
        S.star(x, t, TAU, { x: 390, y: 1000, s: 210, mood: 'neutral', look: [1, 0] })
        S.star(x, t, CAN, { x: 600, y: 1000, s: 210, mood: 'neutral', look: [1, 0] })
        WEEKS.forEach(([a, w], i) => { const k = pop01(t, a, 0.25, 2.6) * (i < 2 ? outK(t, [WEEKS[i + 1][0] - 0.1, WEEKS[i + 1][0]]) : outK(t, [6.8, 7.0])); if (k > 0.01) label(x, w, 820, 840, { size: 44 * k, col: '#ffc8ec', rot: -0.08 }) })
      },
      front(x, t) { dinnerTable(x, t); nameCard(x, 820, 1060) } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, GEM, { x: 220, y: 1250, s: 160, mood: t < 10.4 ? 'wide' : 'sparkle', look: [1, -1], hops: [10.5] })
      } },
    { at: 13.6, set: 'dinner', cam: [1.05, 540, 930], pis: { x: 960, y: 1260, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        chair(x, 820)
        const inP = ease.outCubic(prog(t, 15.3, 15.8)), cheer = t > 15.8
        S.star(x, t, GEM, { x: 180, y: 1000, s: 220, mood: cheer ? 'sparkle' : 'neutral', look: [1, 0], hops: cheer ? [15.85, 16.5] : [] })
        S.star(x, t, TAU, { x: 390, y: 1000, s: 210, mood: cheer ? 'happy' : 'neutral', look: [1, 0], hops: cheer ? [15.9, 16.6] : [] })
        S.star(x, t, CAN, { x: 600, y: 1000, s: 210, mood: cheer ? 'happy' : 'neutral', look: [1, 0], hops: cheer ? [15.95, 16.7] : [] })
        if (inP > 0) { S.star(x, t, LIB, { x: lerp(1150, 820, inP), y: 990, s: 220, mood: 'sparkle', look: [-1, 0], hops: [15.3, 15.6, 15.9, 16.8] }) }
        hearts(x, t, 15.9, 600, 860, { n: 7 }); sparkles(x, t, 820, 960, 15.8, 10, 150, 1)
      },
      front(x, t) { dinnerTable(x, t); nameCard(x, 820, 1060); if (t > 15.6) cookies(x, 680, 1080) } },
  ],
  cues: [
    ...WEEKS.map(([a], i) => ['pop', a, [880, 987.77, 1174.66][i], 0.035, 0.3]),
    ['whoosh', 15.3, 0.4, 0.03], ['pop', 15.8, 1318.51, 0.045, 0.3], ['glitter', 15.8, 16.3], ['pluck', 15.9, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
