// nffe03: FRIENDS FIRST ep 3, "December is hard for some friends" (23 s vertical, star_advice, music: dreamy · Db).
// Story 0–20.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.4    "Not every friend | *loves* December."  Cancer's living room: Cancer hops around a little pixel
//              tree hanging ornaments; Taurus stands apart holding one ornament, quiet. TAURUS: "first December without
//              my grandma."  Everyone goes still. Pisces, by the tree, sniffles.
//   7.4        hard cut.  THE STARS: "you don't have to *fix* it." → "make room for the party *and* the quiet."
//   13.8       the room again, softer. CHECK-IN: "want company, or want quiet? *both are okay.*"  Taurus hangs the
//              ornament; the friends lean in close; hearts.
//   17.2       Last line: "Room for *both.*"
import { makeFriends, stars, say, R, box, INK, GOLD, glow, hearts, sparkles, ease, prog, lerp } from '../../nffe01/scenes/friendskit.js'

const TAU = 'taurus', GEM = 'cancer'
const ORN = ['#e8344e', '#7fd0ff', '#ffd23f', '#ff8fb1', '#9fe6b0']
function tree(x, t, cx, lit = 1) {
  R(x, INK, cx - 26, 1080, 52, 92); R(x, '#7a5034', cx - 18, 1080, 36, 92)
  const tiers = [[1090, 300], [960, 250], [840, 190], [730, 130]]
  for (const [y, w] of tiers) { x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 10, y + 8); x.lineTo(cx, y - 170); x.lineTo(cx + w / 2 + 10, y + 8); x.fill(); x.fillStyle = '#2f8a5a'; x.beginPath(); x.moveTo(cx - w / 2, y); x.lineTo(cx, y - 156); x.lineTo(cx + w / 2, y); x.fill() }
  const spots = [[-90, 1050], [70, 1030], [-20, 920], [80, 900], [-60, 800], [40, 700], [-110, 990], [110, 1060]]
  spots.forEach(([dx, y], i) => { const k = 0.6 + 0.4 * Math.sin(t * 2 + i); glow(x, cx + dx, y, 40, k * lit * 0.8); R(x, INK, cx + dx - 13, y - 13, 26, 26); R(x, ORN[i % 5], cx + dx - 9, y - 9, 18, 18) })
  glow(x, cx, 560, 120, lit)
  R(x, INK, cx - 26, 548, 52, 52); R(x, GOLD, cx - 20, 554, 40, 40)
}
function ornament(x, cx, cy, s = 1) { R(x, INK, cx - 18 * s, cy - 18 * s, 36 * s, 36 * s); R(x, GOLD, cx - 14 * s, cy - 14 * s, 28 * s, 28 * s); R(x, '#fff3c8', cx - 10 * s, cy - 10 * s, 8 * s, 8 * s); R(x, INK, cx - 4 * s, cy - 28 * s, 8 * s, 12 * s) }
const STILL = 4.0

const EP = makeFriends({
  id: 'nffe03', dur: 25, cut: 7.4,
  hook: { text: 'Not every friend | *loves* December.', out: 3.4, color: '#b8f0c0' },
  lines: [
    say(3.9, TAU, 'first December without my *grandma*.'),
    stars(7.8, 'you don’t have to *fix* it.'),
    stars(10.4, 'make room for the party *and* the quiet.'),
  ],
  boxes: [{ from: 0, to: 1, close: 7.2 }, { from: 1, to: 3, close: 13.6 }],
  check: { at: 14.0, out: [16.9, 17.1], text: 'want company, or want quiet? | *both are okay.*', accent: '#2f8a5a' },
  last: { at: 17.2, text: 'Room for *both.*', color: '#b8f0c0' },
  shots: [
    { at: 0, set: 'room', setOpts: { couch: false }, pis: { x: 950, y: 1250, s: 110, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        tree(x, t, 790)
        const busy = t < STILL
        S.star(x, t, GEM, { x: 570, y: 1010, s: 220, mood: busy ? 'happy' : 'wide', look: busy ? [1, -1] : [-1, 0], hops: busy ? [-0.15, 0.6, 1.3, 2.0, 2.7, 3.4] : [] })
        if (busy) ornament(x, 670, 900 + 20 * Math.sin(t * 6), 1)
        const tau = S.star(x, t, TAU, { x: 280, y: 1030, s: 260, mood: 'neutral', look: [0.6, 1], blink: t > 3.8 && t < 5.6 ? 0.55 : undefined })
        ornament(x, 380, tau.y + 60, 1.1)
      } },
    { at: 7.4, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        glow(x, 540, 860, 420, 0.6, '255,226,160')
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 10.2 ? 'happy' : 'neutral', look: [0, 0.3], hops: [7.45, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, TAU, { x: 220, y: 1250, s: 160, mood: t < 10.3 ? 'neutral' : 'sparkle', look: [1, -1] })
      } },
    { at: 13.8, set: 'room', setOpts: { couch: false }, pis: { x: 950, y: 1250, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        tree(x, t, 790)
        const p = ease.inOutCubic(prog(t, 16.0, 16.7)), hug = ease.outCubic(prog(t, 16.8, 17.4))
        const tau = S.star(x, t, TAU, { x: lerp(280, 360, hug), y: 1030, s: 260, mood: t < 16.0 ? 'neutral' : 'happy', look: [1, 0], hops: [16.0, 16.8] })
        if (p < 1) ornament(x, lerp(380, 700, p), lerp(tau.y + 60, 940, p) - Math.sin(Math.PI * p) * 80, 1.1)
        else { ornament(x, 700, 940, 1.1); sparkles(x, t, 700, 940, 16.7, 10, 100, 1) }
        S.star(x, t, GEM, { x: lerp(580, 520, hug), y: 1040, s: 210, mood: t < 16.8 ? 'neutral' : 'sparkle', look: [-1, 0], hops: [16.85] })
        hearts(x, t, 17.0, 360, 860, { n: 6 })
      } },
  ],
  cues: [
    ...[0.6, 1.3, 2.0, 2.7, 3.4].map((a, i) => ['pop', a, [987.77, 1174.66, 1318.51, 1174.66, 987.77][i], 0.02, 0.2]),
    ['pluck', 3.85, 554.37, 0.03, 0.8, -0.3],
    ['whoosh', 16.0, 0.6, 0.02], ['bell', 16.7, 1760, 0.03, 1.2, 0.2], ['glitter', 16.7, 17.1], ['pluck', 17.0, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
void box
