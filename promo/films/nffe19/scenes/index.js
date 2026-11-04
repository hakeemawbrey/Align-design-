// nffe19: FRIENDS FIRST ep 19, "The friend who's alone this year" (30 s vertical, star_advice, music: dreamy · F).
// Story 0–25.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–8.6    "Your friend is spending | the holidays *alone.*"  A snowy park bench: Sagittarius, alone, mid-hop, phone
//              out. Cancer arrives: "what are you doing for the holidays?" SAG (too fast): "oh I'm FINE with it! totally!"
//              CANCER: "well… come by sometime?" SAG: "maybe!"  Pisces sniffles by the lamp post.
//   8.6        card cut.  THE STARS: "a vague invite is easy to *refuse*." → "be specific: a day, a time, a *seat*."
//   15.8       the phone: CANCER "dinner on the 26th, 6 PM. we saved you a seat." · SAG "…really? I'd love that."
//   19.5       the long table: a name card reads SAG. Sagittarius sits with everyone; hearts.
//   21.0       Last line: "There's a *seat* for you."
import { makeFriends, stars, bubble, bigPhone, dinnerTable, box, label, BONE, hearts, sparkles, pop01, outK, ease, prog, lerp, phoneSmall } from '../../nffe01/scenes/friendskit.js'

const SAG = 'sagittarius', CAN = 'cancer'
const MSGS = [
  { at: 16.1, from: 'me', text: 'dinner on the 26th, 6 PM. we saved you a seat.' },
  { at: 17.4, from: 'them', name: 'SAGITTARIUS', nameCol: '#ffb8a0', text: '…really? I’d love that.' },
]
const EP = makeFriends({
  id: 'nffe19', dur: 30, cut: 8.6,
  hook: { text: 'Your friend is spending | the holidays *alone.*', out: 3.6, color: '#ffb8a0', size: 76, accentSize: 110 },
  lines: [
    stars(9.0, 'a vague invite is easy to *refuse*.'),
    stars(12.0, 'be specific: a day, a time, a *seat*.'),
  ],
  boxes: [{ from: 0, to: 2, close: 15.6 }],
  last: { at: 21.0, text: 'There’s a *seat* for you.', color: '#ffb8a0' },
  shots: [
    { at: 0, set: 'park', pis: { x: 930, y: 1300, s: 100, tears: 1, mood: 'wide', look: [-1, -1], tissues: false },
      draw(x, t, S) {
        const arrive = ease.outCubic(prog(t, 3.0, 3.8))
        S.star(x, t, SAG, { x: 620, y: 1000, s: 250, mood: t < 4.8 ? 'neutral' : t < 6.3 ? 'happy' : 'squint', look: t < 3.8 ? [0, 1] : [-1, 0], hops: [-0.12, 4.9, 5.2, 5.5, 7.3], scarf: '#e8a24a' })
        if (t < 4.0) phoneSmall(x, t, 720, 1060, { s: 0.6, rot: -0.2 })
        if (arrive > 0) S.star(x, t, CAN, { x: lerp(-100, 330, arrive), y: 1010, s: 230, mood: t < 6.2 ? 'neutral' : 'happy', look: [1, 0], hops: [3.0, 3.3, 3.6, 4.0, 6.3], scarf: '#3fae6a' })
        bubble(x, t, 400, 760, 4.0, 5.0, 'what are you doing for the holidays?', { size: 32, col: '#cfe4ff', maxW: 420 })
        bubble(x, t, 660, 700, 4.95, 6.3, 'oh I’m FINE with it! totally!', { size: 34, col: '#ffb8a0', maxW: 400 })
        bubble(x, t, 380, 760, 6.3, 8.5, 'well… come by sometime?', { size: 34, col: '#cfe4ff', maxW: 420 })
        bubble(x, t, 680, 660, 7.3, 8.5, 'maybe!', { size: 38, col: '#ffb8a0' })
      } },
    { at: 8.6, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 13.5 ? 'happy' : 'neutral', look: [0, 0.2], hops: [8.65, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAN, { x: 220, y: 1250, s: 160, mood: t < 11.9 ? 'neutral' : 'sparkle', look: [1, -1], hops: [12.0] })
      } },
    { at: 15.8, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 2, mood: 'sparkle' },
      draw(x, t, S) { S.star(x, t, CAN, { x: 230, y: 1000, s: 250, mood: t < 17.4 ? 'neutral' : 'happy', look: [1, -0.5], hops: [16.1, 17.5] }); hearts(x, t, 17.6, 230, 860, { n: 5 }) } },
    { at: 19.5, set: 'dinner', cam: [1.05, 540, 930], pis: { x: 960, y: 1260, s: 100, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, 'taurus', { x: 180, y: 1000, s: 200, mood: 'happy', look: [1, 0], hops: [20.2] })
        S.star(x, t, CAN, { x: 380, y: 1000, s: 200, mood: 'happy', look: [1, 0], hops: [20.3] })
        S.star(x, t, SAG, { x: 600, y: 990, s: 230, mood: 'sparkle', look: [0, 0], hops: [19.6, 20.0, 21.6], tears: 1 })
        S.star(x, t, 'leo', { x: 830, y: 1000, s: 200, mood: 'happy', look: [-1, 0], hops: [20.4] })
        hearts(x, t, 20.2, 600, 860, { n: 7 }); sparkles(x, t, 600, 980, 19.6, 10, 140, 1)
      },
      front(x, t) {
        dinnerTable(x, t)
        const k = pop01(t, 19.55, 0.3, 2.4)
        x.save(); x.translate(600, 1066); x.scale(k, k); box(x, -70, -26, 140, 52, BONE, { b: 5 }); x.restore()
        if (k > 0.01) label(x, 'SAG ♡', 600, 1068, { size: 26 * k, col: '#c0577a' })
      } },
  ],
  overlay(x, t) {
    if (t > 15.85 && t < 19.5) bigPhone(x, t, { cx: 680, cy: 900, w: 520, h: 520, title: 'sagittarius ✦', msgs: MSGS, pop: pop01(t, 15.85, 0.35, 2) * outK(t, [19.2, 19.5]), rot: 0.02, typing: [16.7, 17.4], accent: '#cfe4ff' })
  },
  cues: [
    ...[3.0, 3.3, 3.6].map(a => ['tick', a, 0.03]), ['pop', 4.0, 880, 0.035, -0.3], ['pop', 4.95, 1318.51, 0.04, 0.3], ['pop', 6.3, 880, 0.035, -0.3], ['pop', 7.3, 1174.66, 0.035, 0.3],
    ['whoosh', 15.85, 0.3, 0.03], ['pop', 16.1, 987.77, 0.04, 0.2], ['pop', 17.4, 1318.51, 0.045, -0.2], ['pluck', 17.6, 1174.66, 0.035, 0.5, -0.3],
    ['pop', 19.55, 1318.51, 0.045, 0.2], ['bell', 19.6, 1760, 0.03, 1.2, 0], ['glitter', 19.6, 20.1],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
