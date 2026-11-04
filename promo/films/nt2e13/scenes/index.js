// nt2e13: SOFT LAUNCH vs HARD LAUNCH: "I like you" (20 s vertical, Trends Vol. 2 format 3; row in
// promo/films/next30/b11.md; music house · C). Format look: ../../nt2e11/scenes/launchkit.js.
//   0.0        hook (frame 0): "Aries: *saying "I like you"*", the split screen, Aries mid-hop with a megaphone.
//   2.1        SOFT: Aries, scuffing a foot: "you're… cool, I guess." Libra: "…thanks?"
//   5.6        HARD: a giant banner unrolls: "I LIKE YOU!!!" with the megaphone: so loud the panel shakes.
//   9.1        card cut · THE REAL LAUNCH: Aries puts the megaphone and the banner down, steps close and says it,
//              quietly: "I like you." Libra: "…I like you too."
//   12.75      THE STARS: "Say it *plainly*. Say it kindly."
import { makeLaunch, starOf, box, R, bubble, label, hearts, shadow, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK, INTER } from '../../nt2e11/scenes/launchkit.js'

const ARI = starOf('aries', 3, 1.1), LIB = starOf('libra', 9)

function megaphone(x, cx, cy, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-36, -24); x.lineTo(60, -62); x.lineTo(60, 62); x.lineTo(-36, 24); x.closePath(); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(-30, -16); x.lineTo(54, -52); x.lineTo(54, 52); x.lineTo(-30, 16); x.closePath(); x.fill()
  R(x, INK, -60, -20, 30, 40); R(x, '#e8344e', -56, -16, 22, 32)
  x.restore()
}

const EP = makeLaunch({
  id: 'nt2e13', sign: 'aries', name: 'Aries', topic: 'saying “I like you”', accent: '#f0603a',
  hook(x, t) { megaphone(x, 730, 920, -0.2 + 0.06 * Math.sin(t * 7)) },
  soft: { caption: 'soft: *“you’re… cool, I guess”*',
    draw(x, t, S) {
      ARI(x, t, { x: 170, y: 960, s: 160, mood: S.u < 1.5 ? 'squint' : 'neutral', look: [1, 0.8], squash: 0.03 * Math.sin(t * 8) })
      LIB(x, t, { x: 400, y: 960, s: 150, mood: S.u > 1.5 ? 'wide' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.6] })
      bubble(x, t, 230, 720, S.t0 + 0.4, S.t0 + 1.7, 'you’re… cool, I guess.', { size: 26 })
      bubble(x, t, 380, 760, S.t0 + 1.7, S.t1, '…thanks?', { size: 28, col: '#c9f2d4' })
      label(x, 'scuff scuff', 180, 1110, { size: 24, col: BONE })
    },
    cues: [['pop', 0.4, 659.25, 0.03, -0.4], ['pop', 1.7, 587.33, 0.03, -0.3]] },
  hard: { caption: 'hard: *a giant banner*',
    draw(x, t, S) {
      const un = ease.outCubic(prog(S.u, 0.3, 0.9))
      const sh = S.u > 1.0 && S.u < 1.8 ? 6 * Math.sin(t * 60) : 0
      x.save(); x.translate(sh, 0)
      box(x, 570, 450, 460 * un, 170, '#ff5c7a', { b: 7 })
      if (un > 0.95) { x.font = `800 62px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I LIKE YOU!!!', 800, 538) }
      ARI(x, t, { x: 680, y: 960, s: 170, mood: 'wide', look: [1, -0.3], hops: [S.t0 + 1.0, S.t0 + 1.4] })
      megaphone(x, 790, 920, -0.15, 1)
      LIB(x, t, { x: 950, y: 1000, s: 130, mood: 'wide', look: [-1, -0.2], squash: S.u > 1 ? 0.1 : 0 })
      if (S.u > 1.0) label(x, 'LOUD', 860, 760, { size: 44, col: GOLD, font: INTER, weight: 800, rot: -0.15 })
      x.restore()
    },
    cues: [['whoosh', 0.3, 0.5, 0.03], ['boom', 1.0, 0.2], ['tick', 1.0, 0.08], ['pop', 1.02, 1567.98, 0.04, 0.4]] },
  real: { caption: '',
    draw(x, t, S) {
      shadow(x, 430, 1120, 200); shadow(x, 650, 1120, 200)
      // the props, put down
      megaphone(x, 180, 1110, 1.5, 1)
      box(x, 800, 1090, 200, 30, '#ff5c7a', { b: 5 })
      const close = ease.inOutCubic(prog(S.u, 0.3, 0.9))
      ARI(x, t, { x: lerp(300, 440, close), y: 960, s: 200, mood: S.u > 1.9 ? 'happy' : 'neutral', look: [1, 0.1], hops: [S.t0 + 1.9], blush: S.u > 1 ? 1 : 0.3 })
      LIB(x, t, { x: 660, y: 960, s: 200, mood: S.u > 1.9 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 1.95] })
      bubble(x, t, 420, 700, S.t0 + 1.0, S.t0 + 2.0, 'I like you.', { size: 34 })
      bubble(x, t, 660, 700, S.t0 + 2.0, S.t1, '…I like you too.', { size: 32, col: '#c9f2d4' })
      hearts(x, t, S.t0 + 2.0, 550, 820, { n: 8 })
      label(x, '(quietly)', 420, 790, { size: 24, col: BONE, alpha: S.u > 1 && S.u < 2 ? 1 : 0 })
    },
    cues: [['pop', 1.0, 880, 0.03, -0.2], ['pluck', 2.0, 1174.66, 0.04, 0.3, 0.3], ['pluck', 2.12, 1567.98, 0.035, 0.3, 0.3]] },
  last: 'Say it *plainly*. Say it kindly.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
