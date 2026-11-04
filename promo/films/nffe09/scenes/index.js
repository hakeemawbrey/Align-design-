// nffe09: FRIENDS FIRST ep 9, "Good news, shared" (25 s vertical, star_advice, music: pop · G).
// Story 0–20.6, then the shared end card. Look: ../../nffe01/scenes/friendskit.js.
//   0.0–7.2    "Good news, but your | friend is *struggling.*"  The couch: Leo, mid-hop, hides a JOB OFFER letter behind
//              their back; Capricorn slumps beside them with a mug. LEO: "I got the job. but they're *struggling*."
//              Pisces sniffles on the rug.
//   7.2        card cut.  THE STARS: "friends can hold *both*." → "share it. let them choose to *celebrate*."
//   13.6       the couch: Leo shows the letter. Capricorn's eyes go wide… and Capricorn throws the confetti first:
//              "THAT'S AMAZING. tell me everything!"  Both hop; Pisces fountains.
//   17.2       Last line: "Your joy is *welcome* here."
import { makeFriends, stars, say, bubble, box, R, INK, BONE, INTER, mug, confetti, hearts, lerp, ease, prog, pop01 } from '../../nffe01/scenes/friendskit.js'

const LEO = 'leo', CAP = 'capricorn'
function letter(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -110, -140, 220, 280, BONE, { b: 6 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('JOB OFFER', 0, -90)
  for (let i = 0; i < 5; i++) R(x, 'rgba(27,18,54,0.35)', -80, -50 + i * 30, 160 - (i % 2) * 40, 8)
  R(x, '#f39a3a', -30, 80, 60, 30)
  x.restore()
}
const EP = makeFriends({
  id: 'nffe09', dur: 25, cut: 7.2,
  hook: { text: 'Good news, but your | friend is *struggling.*', out: 3.6, color: '#ffc38a', size: 76, accentSize: 108 },
  lines: [
    say(3.9, LEO, 'I got the job. but they’re *struggling*.'),
    stars(7.6, 'friends can hold *both*.'),
    stars(10.2, 'share it. let them choose to *celebrate*.'),
  ],
  boxes: [{ from: 0, to: 1, close: 7.0 }, { from: 1, to: 3, close: 13.4 }],
  last: { at: 17.2, text: 'Your joy is *welcome* here.', color: '#ffc38a' },
  shots: [
    { at: 0, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 1, mood: 'wide', look: [-1, -1] },
      draw(x, t, S) {
        letter(x, 250, 1000, 0.6, -0.4)
        S.star(x, t, LEO, { x: 340, y: 1000, s: 270, mood: t < 3.8 ? 'sparkle' : 'squint', look: [1, 0], hops: [-0.12, 0.5, 1.0] })
        S.star(x, t, CAP, { x: 720, y: 1020, s: 250, mood: 'sleepy', zzz: false, look: [0, 1], squash: 0.06 })
        mug(x, t, 820, 1120, 1, '#e9d9a8')
      } },
    { at: 7.2, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 11.8 ? 'happy' : 'neutral', look: [0, 0.2], hops: [7.25, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, LEO, { x: 220, y: 1250, s: 160, mood: t < 10.1 ? 'neutral' : 'sparkle', look: [1, -1], hops: [10.2] })
      } },
    { at: 13.6, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const show = ease.outBack ? 0 : 0
        const p = ease.inOutCubic(prog(t, 13.8, 14.3))
        S.star(x, t, LEO, { x: 340, y: 1000, s: 270, mood: t < 15.0 ? 'neutral' : 'sparkle', look: [1, 0], hops: [13.9, 15.1, 15.7, 16.4] })
        S.star(x, t, CAP, { x: 720, y: 1000, s: 260, mood: t < 14.4 ? 'neutral' : t < 15.0 ? 'wide' : 'happy', look: [-1, 0], hops: [14.5, 15.0, 15.6, 16.3] })
        letter(x, lerp(250, 530, p), lerp(1000, 830, p), lerp(0.6, 0.75, p), lerp(-0.4, 0.05, p))
        confetti(x, t, 15.0, 700, 860, { n: 34 })
        bubble(x, t, 700, 660, 15.15, 17.05, 'THAT’S AMAZING. tell me everything!', { size: 36, col: '#e9d9a8', maxW: 520 })
        hearts(x, t, 15.8, 540, 880, { n: 6 })
        void show; void pop01
      } },
  ],
  cues: [
    ['pop', 0.5, 987.77, 0.03, -0.2], ['pop', 1.0, 1174.66, 0.03, -0.2],
    ['whoosh', 13.8, 0.4, 0.03], ['pluck', 14.45, 880, 0.03, 0.4, 0.3], ['boom', 15.0, 0.18], ['pop', 15.0, 1567.98, 0.05, 0.3], ['glitter', 15.0, 15.8], ['pop', 15.15, 1174.66, 0.035, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
