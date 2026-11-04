// nffe05: FRIENDS FIRST ep 5, "The cancelled-plans friend" (23 s vertical, star_advice, music: funk · E).
// Story 0–20.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.2    "They cancelled. | *Again.*"  The café, a table for two: Leo, mid-hop, an empty chair, a cooling mug.
//              The phone: GEMINI "rain check!!" · "next week for sure!!" · "so sorry, can't tonight!!"  LEO: "that's three
//              times. I'm keeping *score*." A paper scorecard (CANCELLED: III)… Leo crumples it. Pisces sniffles.
//   7.2        hard cut.  THE STARS: "skip the scorecard. say how it *felt*, once." → "then ask what's *going on* with them."
//   13.9       the café, the phone: LEO "I miss you. is everything okay?" · typing… · GEMINI "honestly? I'm overbooked.
//              lunch sunday? just us."  Leo lights up; hearts.
//   17.6       Last line: "Say it *once*, kindly."
import { makeFriends, stars, say, bigPhone, table, mug, box, R, INK, BONE, MONO, INTER, pop01, outK, prog, ease, lerp, hearts, phoneSmall } from '../../nffe01/scenes/friendskit.js'

const LEO = 'leo', GEM = 'gemini'
const OLD = [
  { at: -9, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'rain check!!' },
  { at: -9, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'next week for sure!!' },
  { at: 0.9, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'so sorry, can’t tonight!!' },
]
const NEW = [
  ...OLD,
  { at: 14.2, from: 'me', text: 'I miss you. is everything okay?' },
  { at: 15.9, from: 'them', name: 'GEMINI', nameCol: '#ffe58a', text: 'honestly? I’m overbooked. lunch sunday? just us.' },
]
const CRUMPLE = [5.9, 6.5]
function scorecard(x, t) {
  if (t < 3.9 || t > 7.1) return
  const k = pop01(t, 3.9, 0.3, 2), c = ease.inCubic(prog(t, ...CRUMPLE)), fly = ease.inQuad(prog(t, 6.5, 7.0))
  x.save(); x.translate(lerp(560, 860, fly), lerp(980, 1150, fly) - Math.sin(Math.PI * fly) * 260); x.rotate(-0.06 + c * 3 + fly * 6); x.scale(k * (1 - 0.75 * c), k * (1 - 0.75 * c))
  box(x, -130, -100, 260, 200, BONE, { b: 6 })
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.fillText('CANCELLED:', 0, -50)
  x.font = `800 70px ${MONO}`; x.fillStyle = '#e8344e'; x.fillText('III', 0, 30)
  if (c > 0) { x.fillStyle = 'rgba(27,18,54,0.35)'; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 40, -90 + (i % 3) * 60, 30, 8) }
  x.restore()
}
const EP = makeFriends({
  id: 'nffe05', dur: 25, cut: 7.2,
  hook: { text: 'They cancelled. | *Again.*', out: 3.4, color: '#ffc38a' },
  lines: [
    say(4.0, LEO, 'that’s three times. I’m keeping *score*.'),
    stars(7.6, 'skip the scorecard. say how it *felt*, once.'),
    stars(10.9, 'then ask what’s *going on* with them.'),
  ],
  boxes: [{ from: 0, to: 1, close: 7.0 }, { from: 1, to: 3, close: 13.8 }],
  last: { at: 17.6, text: 'Say it *once*, kindly.', color: '#ffc38a' },
  shots: [
    { at: 0, set: 'cafe', pis: { x: 210, y: 1270, s: 110, tears: 1, mood: 'wide', look: [1, -1] },
      draw(x, t, S) {
        S.star(x, t, LEO, { x: 400, y: 1000, s: 280, mood: t < 3.8 ? 'wide' : t < 6.5 ? 'squint' : 'neutral', look: t < 3.6 ? [1, -0.5] : [1, 0.4], hops: [-0.12, 0.95, 4.05, 5.95] })
        scorecard(x, t)
      },
      front(x, t) {
        table(x, 560, 1110, 520, '#7a4a32'); mug(x, t, 450, 1104, 1, '#ffc38a', true); mug(x, t, 700, 1104, 1, '#ffe58a', false)
        box(x, 770, 960, 150, 30, '#5a3d2e', { b: 5 }); R(x, INK, 790, 990, 16, 180); R(x, INK, 884, 990, 16, 180); box(x, 820, 790, 100, 170, '#5a3d2e', { b: 5 })
        if (t < 3.7) phoneSmall(x, t, 520, 1080, { rot: -0.2, s: 0.8, buzz: t > 0.9 && t < 1.2 ? 1 : 0 })
      } },
    { at: 7.2, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 12.2 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.25, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, LEO, { x: 220, y: 1250, s: 160, mood: t < 10.6 ? 'neutral' : 'sparkle', look: [1, -1], hops: [10.7] })
      } },
    { at: 13.9, set: 'cafe', pis: { x: 940, y: 1270, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        S.star(x, t, LEO, { x: 220, y: 1040, s: 230, mood: t < 15.9 ? 'neutral' : 'sparkle', look: [1, -0.5], hops: [14.2, 16.0, 16.6] })
        hearts(x, t, 16.2, 220, 880, { n: 6 })
      } },
  ],
  overlay(x, t) {
    if (t < 3.7) {
      const pop = pop01(t, -0.3, 0.3) * outK(t, [3.4, 3.7])
      bigPhone(x, t, { cx: 760, cy: 760, w: 420, h: 560, title: 'gemini ✦', msgs: OLD, pop, rot: 0.05, accent: '#ffc38a' })
    }
    if (t > 14.0) {
      const pop = pop01(t, 14.0, 0.35, 2) * outK(t, [20.2, 20.5])
      bigPhone(x, t, { cx: 640, cy: 920, w: 520, h: 760, title: 'gemini ✦', msgs: NEW, pop, rot: 0.02, typing: [14.9, 15.9], accent: '#ffc38a' })
    }
  },
  cues: [
    ['pop', 0.9, 1318.51, 0.045, 0.3], ['pluck', 1.0, 440, 0.025, 0.4, 0.3], ['whoosh', 3.45, 0.25, 0.025],
    ['pop', 3.95, 880, 0.035, 0], ['tick', 4.4, 0.03], ['tick', 4.6, 0.03], ['tick', 4.8, 0.03],
    ...Array.from({ length: 6 }, (_, i) => ['tick', CRUMPLE[0] + i * 0.1, 0.03]), ['whoosh', 6.5, 0.4, 0.03], ['tick', 7.0, 0.04],
    ['whoosh', 14.0, 0.3, 0.03], ['pop', 14.2, 987.77, 0.04, 0.2], ['tick', 14.95, 0.02], ['tick', 15.3, 0.02], ['pop', 15.9, 1318.51, 0.045, -0.2], ['pluck', 16.2, 1174.66, 0.035, 0.5, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
