// nffe15: FRIENDS FIRST ep 15, "The new friend in the group" (25 s vertical, star_advice, music: funk · G).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.0    "The group has a | *new friend.*"  The café: Gemini, Leo and Cancer crack up at the table ("THE GOOSE!!"),
//              mid-hop; Sagittarius, new, stands at the edge with a polite smile. SAGITTARIUS: "haha… what goose?"
//   7.0        card cut.  THE STARS: "inside jokes are a closed *door*." → "explain the joke. let them *in*."
//   13.6       the café: GEMINI "okay, so. the goose story." A pixel goose appears in a thought bubble… Sagittarius laughs
//              hardest of all ("HONK!"). Everyone at one table; Pisces fountains.
//   17.2       Last line: "Let them *in on it.*"
import { makeFriends, stars, say, bubble, drawBits, table, mug, hearts, sparkles, lerp, ease, prog, pop01, outK, R, INK } from '../../nffe01/scenes/friendskit.js'

const SAG = 'sagittarius', GEM = 'gemini', LEO = 'leo', CAN = 'cancer'
const GOOSE = ['....WW...', '...WWWO..', '...WWW...', '....WW...', 'W...WW...', 'WWWWWWW..', '.WWWWWW..', '..WWWW...', '...O.O...']
function goose(x, t, cx, cy, k) {
  if (k <= 0.01) return
  R(x, INK, cx - 130 * k - 6, cy - 120 * k - 6, 260 * k + 12, 240 * k + 12); R(x, '#e8e2f6', cx - 130 * k, cy - 120 * k, 260 * k, 240 * k)
  drawBits(x, GOOSE, { W: '#ffffff', O: '#f39a3a' }, cx, cy + 10 * Math.sin(t * 8), 22 * k)
}
const LAUGH = [-0.2, 0.3, 0.8, 1.3, 1.8, 2.3, 2.8]
const EP = makeFriends({
  id: 'nffe15', dur: 25, cut: 7.0,
  hook: { text: 'The group has a | *new friend.*', out: 3.4, color: '#ffb8a0' },
  lines: [
    say(4.0, SAG, 'haha… what *goose?*'),
    stars(7.4, 'inside jokes are a closed *door*.'),
    stars(10.3, 'explain the joke. let them *in*.'),
  ],
  boxes: [{ from: 0, to: 1, close: 6.8 }, { from: 1, to: 3, close: 13.4 }],
  last: { at: 17.2, text: 'Let them *in on it.*', color: '#ffb8a0' },
  shots: [
    { at: 0, set: 'cafe', cam: [1.05, 540, 930], pis: { x: 960, y: 1270, s: 100, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        const laughing = t < 3.4
        S.star(x, t, SAG, { x: 170, y: 1020, s: 220, mood: t < 3.8 ? 'happy' : 'wide', look: [1, 0], hops: [3.9] })
        S.star(x, t, GEM, { x: 440, y: 990, s: 210, mood: laughing ? 'happy' : 'neutral', look: [1, 0], hops: laughing ? LAUGH : [] })
        S.star(x, t, LEO, { x: 650, y: 990, s: 210, mood: laughing ? 'happy' : 'neutral', look: [-1, 0], hops: laughing ? LAUGH.map(v => v + 0.15) : [] })
        S.star(x, t, CAN, { x: 860, y: 990, s: 210, mood: laughing ? 'happy' : 'neutral', look: [-1, 0], hops: laughing ? LAUGH.map(v => v + 0.08) : [] })
        bubble(x, t, 560, 760, -0.3, 3.5, 'THE GOOSE!!', { size: 44, col: '#ffe58a' })
        bubble(x, t, 800, 650, 0.6, 3.5, 'not the goose again', { size: 32, col: '#cfe4ff' })
      },
      front(x, t) { table(x, 650, 1110, 640, '#7a4a32'); mug(x, t, 520, 1104, 1, '#ffe58a'); mug(x, t, 760, 1104, 1, '#cfe4ff') } },
    { at: 7.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.5 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, SAG, { x: 220, y: 1250, s: 160, mood: t < 10.2 ? 'neutral' : 'sparkle', look: [1, -1], hops: [10.3] })
      } },
    { at: 13.6, set: 'cafe', cam: [1.05, 540, 930], pis: { x: 960, y: 1270, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const laugh = t > 15.4, slide = ease.outCubic(prog(t, 13.6, 14.1))
        const LH = [15.45, 15.9, 16.35, 16.8, 17.25]
        S.star(x, t, SAG, { x: lerp(170, 250, slide), y: 1000, s: 230, mood: laugh ? 'happy' : 'sparkle', look: [1, 0], hops: laugh ? LH : [14.0] })
        S.star(x, t, GEM, { x: 470, y: 990, s: 210, mood: 'sparkle', look: [-1, 0], hops: [13.9, 14.4, ...(laugh ? LH.map(v => v + 0.1) : [])] })
        S.star(x, t, LEO, { x: 680, y: 990, s: 200, mood: laugh ? 'happy' : 'neutral', look: [-1, 0], hops: laugh ? LH.map(v => v + 0.2) : [] })
        S.star(x, t, CAN, { x: 880, y: 990, s: 200, mood: laugh ? 'happy' : 'neutral', look: [-1, 0], hops: laugh ? LH.map(v => v + 0.15) : [] })
        bubble(x, t, 520, 790, 13.85, 15.3, 'okay, so. the goose story.', { size: 36, col: '#ffe58a' })
        goose(x, t, 560, 560, pop01(t, 14.5, 0.3, 2.4) * outK(t, [16.9, 17.1]))
        bubble(x, t, 250, 800, 15.5, 17.1, 'HONK!', { size: 44, col: '#ffb8a0' })
        hearts(x, t, 15.8, 450, 860, { n: 7 }); sparkles(x, t, 250, 950, 15.45, 8, 120, 1)
      },
      front(x, t) { table(x, 650, 1110, 640, '#7a4a32'); mug(x, t, 520, 1104, 1, '#ffe58a'); mug(x, t, 760, 1104, 1, '#cfe4ff') } },
  ],
  cues: [
    ...LAUGH.map((a, i) => ['pop', Math.max(0.05, a + 0.05), [880, 987.77, 1174.66, 987.77, 1318.51, 1174.66, 880][i], 0.025, (i % 2 ? -0.3 : 0.3)]),
    ['pop', 0.6, 739.99, 0.03, 0.4], ['pluck', 3.9, 554.37, 0.03, 0.5, -0.3],
    ['pop', 13.85, 987.77, 0.035, 0], ['pop', 14.5, 1318.51, 0.045, 0], ['glitter', 14.5, 14.9], ['tom', 15.5, 196, { gain: 0.2, decay: 0.15 }], ['pop', 15.5, 1567.98, 0.05, -0.3],
    ...[15.9, 16.35, 16.8].map(a => ['pop', a, 1174.66, 0.025, 0.2]),
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
