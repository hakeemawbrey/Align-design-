// nffe17: FRIENDS FIRST ep 17, "Let your friends help" (25 s vertical, star_advice, music: house · A).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.2    "You *never* ask | for help."  Capricorn, mid-hop, wrestling a wobbly bookshelf alone, the instructions on
//              the floor. The shelf sways… and folds flat with a soft THUMP (a dust puff, nobody hurt).
//              CAPRICORN: "totally under *control*."  Pisces peeks from behind the lamp.
//   7.2        card cut.  THE STARS: "letting friends help is a gift to *them*, too." → "one word works: *help?*"
//   13.7       Capricorn sends "…help?" and the friends pop in from every side: Taurus, Leo, Virgo, Gemini. The shelf
//              stands, books and all; everyone hops.
//   17.2       Last line: "Say yes to *help.*"
import { makeFriends, stars, say, bubble, box, R, INK, BONE, label, phoneSmall, hearts, sparkles, confetti, pop01, outK, ease, prog, lerp } from '../../nffe01/scenes/friendskit.js'

const CAP = 'capricorn'
const FALL = 4.4
const BOOKS = ['#e8344e', '#7fd0ff', '#ffd23f', '#9fe6b0', '#ff8fb1', '#c9a6ff']
function shelf(x, t, cx, base, tilt, books) {
  x.save(); x.translate(cx, base); x.rotate(tilt)
  box(x, -130, -460, 260, 460, '#a8744a', { b: 7, hi: 'rgba(255,255,255,0.15)' })
  R(x, '#6a4a2a', -116, -446, 232, 432)
  for (let i = 1; i < 4; i++) { R(x, INK, -122, -460 + i * 115 - 6, 244, 14); R(x, '#a8744a', -116, -460 + i * 115 - 3, 232, 8) }
  if (books) for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const h = 70 + ((i * 7 + r) % 3) * 12; R(x, INK, -108 + i * 36, -460 + (r + 1) * 115 - 6 - h - 3, 32, h + 3); R(x, BOOKS[(i + r) % 6], -106 + i * 36, -460 + (r + 1) * 115 - 6 - h, 28, h) }
  x.restore()
}
function flat(x, t, cx, base) {
  for (let i = 0; i < 4; i++) box(x, cx - 220 + i * 12, base - 30 - i * 24, 440, 18, '#a8744a', { b: 5 })
  const d = t - FALL - 0.5
  if (d > 0 && d < 1.2) { x.save(); x.globalAlpha = 0.7 * (1 - d / 1.2); for (let i = 0; i < 8; i++) R(x, '#e8e2f6', cx - 260 + i * 70 + Math.sin(i) * 20, base - 40 - d * 120 - (i % 3) * 30, 34, 34); x.restore() }
}
const FRIENDS = [['taurus', 200, 14.5], ['leo', 900, 14.7], ['virgo', 430, 14.9], ['gemini', 670, 15.1]]
const STAND = 15.6
const EP = makeFriends({
  id: 'nffe17', dur: 25, cut: 7.2,
  hook: { text: 'You *never* ask | for help.', out: 3.4, color: '#e9d9a8' },
  lines: [
    say(4.7, CAP, 'totally under *control*.'),
    stars(7.6, 'letting friends help is a gift to *them*, too.'),
    stars(10.9, 'one word works: *help?*'),
  ],
  boxes: [{ from: 0, to: 1, close: 7.1 }, { from: 1, to: 3, close: 13.5 }],
  last: { at: 17.2, text: 'Say yes to *help.*', color: '#e9d9a8' },
  shots: [
    { at: 0, set: 'room', setOpts: { couch: false }, pis: { x: 180, y: 1270, s: 100, tears: 1, mood: 'wide', look: [1, -1] },
      draw(x, t, S) {
        const fall = ease.inCubic(prog(t, FALL, FALL + 0.5))
        const sway = t < FALL ? 0.08 * Math.sin(t * 5) * Math.min(1, t / 2 + 0.4) : 0
        if (fall < 1) shelf(x, t, 640, 1170, sway + fall * 1.45, false)
        else flat(x, t, 660, 1180)
        box(x, 820, 1150, 120, 20, BONE, { b: 4 })
        S.star(x, t, CAP, { x: 420, y: 1010, s: 260, mood: t < FALL ? 'squint' : t < 6 ? 'wide' : 'neutral', look: [1, -0.5], hops: [-0.12, 0.8, 1.6, 2.4, 3.2, FALL + 0.5], squash: t < FALL ? 0.06 * Math.sin(t * 5) : 0 })
        const k = pop01(t, FALL + 0.5, 0.25, 3) * outK(t, [FALL + 1.4, FALL + 1.6])
        if (k > 0.01) label(x, 'THUMP.', 660, 900, { size: 60 * k, col: '#ffe58a', font: 'Inter, sans-serif', weight: 800 })
      } },
    { at: 7.2, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 12.0 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.25, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, CAP, { x: 220, y: 1250, s: 160, mood: t < 10.8 ? 'neutral' : 'sparkle', look: [1, -1], hops: [10.9] })
      } },
    { at: 13.7, set: 'room', setOpts: { couch: false }, pis: { x: 960, y: 960, s: 100, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) {
        if (t < STAND) flat(x, t, 660, 1180)
        else { shelf(x, t, 640, 1170, 0.25 * (1 - ease.outBack ? 1 : 1) * Math.exp(-(t - STAND) * 8) * Math.sin((t - STAND) * 30), true); sparkles(x, t, 640, 900, STAND, 12, 220, 1) }
        S.star(x, t, CAP, { x: 420, y: 1010, s: 250, mood: t < 14.5 ? 'neutral' : t < STAND ? 'wide' : 'happy', look: [1, -0.5], hops: [13.9, STAND, 16.3, 17.0] })
        if (t < 14.5) phoneSmall(x, t, 520, 1060, { s: 0.7, rot: 0.2 })
        bubble(x, t, 440, 780, 13.85, 15.0, '…help?', { size: 40, col: '#e9d9a8' })
        FRIENDS.forEach(([sg, fx, at], i) => S.star(x, t, sg, { x: fx, y: 1190, s: 165, pop: pop01(t, at, 0.35, 2.4), mood: t > STAND ? 'happy' : 'sparkle', look: [fx < 540 ? 1 : -1, 0], hops: [at, STAND + 0.1 * i, 16.4 + 0.15 * i] }))
        confetti(x, t, STAND, 640, 760, { n: 30 }); hearts(x, t, 16.2, 420, 860, { n: 6 })
      } },
  ],
  cues: [
    ...[0.8, 1.6, 2.4, 3.2].map(a => ['tick', a, 0.03]), ['riser', 3.4, FALL + 0.4, 0.015], ['boom', FALL + 0.5, 0.25], ['tom', FALL + 0.5, 90, { gain: 0.25, decay: 0.3 }],
    ['pop', 13.85, 880, 0.04, 0], ...FRIENDS.map(([, , at], i) => ['pop', at, [987.77, 1174.66, 1318.51, 1567.98][i], 0.045, i % 2 ? 0.4 : -0.4]),
    ['bell', STAND, 1760, 0.03, 1.2, 0], ['pop', STAND, 1318.51, 0.05, 0], ['glitter', STAND, STAND + 0.6],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
