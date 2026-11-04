// nt2e14: SOFT LAUNCH vs HARD LAUNCH: the group photo (20 s vertical, Trends Vol. 2 format 3; row in
// promo/films/next30/b11.md; music house · Db). Format look: ../../nt2e11/scenes/launchkit.js.
//   0.0        hook (frame 0): "Libra: *the group photo*", the split screen, Libra mid-pose with a camera.
//   2.1        SOFT: the holiday group photo: the crush is just one elbow in the corner of the frame.
//   5.6        HARD: centre frame, matching sweaters, a heart frame around them: "say cheese!"
//   9.1        card cut · THE REAL LAUNCH: Libra was behind the camera taking everyone's photo; the friends wave
//              it over and pull it in: "you're in this one." Flash.
//   12.75      THE STARS: "Be *in* the picture, not just behind it."
import { makeLaunch, starOf, box, R, bubble, label, hearts, shadow, sparkles, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK } from '../../nt2e11/scenes/launchkit.js'

const LIB = starOf('libra', 3, 1.1), CRUSH = starOf('sagittarius', 9), PALS = [starOf('aries', 10), starOf('cancer', 11), starOf('leo', 12)]

function camera(x, cx, cy, k = 1, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -60, -36, 120, 76, '#3d3568', { b: 6 }); R(x, '#5a5470', -50, -50, 36, 14)
  x.fillStyle = INK; x.beginPath(); x.arc(4, 2, 28, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7fd0ff'; x.beginPath(); x.arc(4, 2, 18, 0, Math.PI * 2); x.fill()
  R(x, BONE, -6, -8, 8, 8)
  x.restore()
}
function photo(x, cx, cy, w, h) { box(x, cx - w / 2, cy - h / 2, w, h, BONE, { b: 6 }); R(x, '#2a2148', cx - w / 2 + 16, cy - h / 2 + 16, w - 32, h - 60) }
function sweater(x, F) { void F; R(x, INK, 7, 23, 22, 8); R(x, '#e8344e', 8, 24, 20, 6); for (let i = 9; i < 28; i += 4) R(x, BONE, i, 26, 2, 2) }

const EP = makeLaunch({
  id: 'nt2e14', sign: 'libra', name: 'Libra', topic: 'the group photo', accent: '#e163d6',
  hook(x, t) { camera(x, 740, 900, 1, 0.12 * Math.sin(t * 4)) },
  soft: { caption: 'soft: *one elbow* in the corner',
    draw(x, t, S) {
      photo(x, 280, 800, 440, 520)
      PALS.forEach((p, i) => p(x, t, { x: 160 + i * 110, y: 820, s: 110, mood: 'happy', look: [0, 0] }))
      // the crush: one point poking in from the corner
      const k = ease.outCubic(prog(S.u, 0.5, 0.9))
      CRUSH(x, t, { x: lerp(560, 480, k), y: 950, s: 140, mood: 'happy', look: [-1, 0] })
      R(x, BONE, 490, 1000, 90, 100)
      if (S.u > 1.0) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(450, 930, 60, 0, Math.PI * 2); x.stroke(); x.restore(); label(x, 'who’s that?', 330, 1120, { size: 26, col: GOLD }) }
    },
    cues: [['whoosh', 0.5, 0.3, 0.02], ['pop', 1.0, 880, 0.03, -0.4]] },
  hard: { caption: 'hard: *centre frame*, matching sweaters',
    draw(x, t, S) {
      photo(x, 800, 800, 440, 520)
      const a = { x: 730, y: 860, s: 150, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.6] }, b = { x: 880, y: 860, s: 150, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.7] }
      LIB(x, t, a); CRUSH(x, t, b)
      const sk = pop01(t, S.t0 + 0.6, 0.3, 2.4)
      if (sk > 0.01) { const { withProps } = EXTRA; withProps(x, t, a, () => sweater(x)); withProps(x, t, b, () => sweater(x)) }
      hearts(x, t, S.t0 + 0.8, 800, 720, { n: 6 })
      bubble(x, t, 800, 600, S.t0 + 1.2, S.t1, 'say cheese!', { size: 30 })
    },
    cues: [['pop', 0.6, 1318.51, 0.04, 0.4], ['glitter', 0.65, 1.0], ['pop', 1.2, 1174.66, 0.03, 0.4]] },
  real: { caption: '',
    draw(x, t, S) {
      const pull = ease.inOutCubic(prog(S.u, 1.0, 1.5))
      PALS.forEach((p, i) => { shadow(x, 260 + i * 170 + (i > 0 ? 170 : 0), 1110, 140); p(x, t, { x: 260 + i * 170 + (i > 0 ? 170 : 0), y: 960, s: 150, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.6 + i * 0.1, S.t0 + 1.8] }) })
      CRUSH(x, t, { x: 600, y: 760, s: 130, mood: 'happy', look: [-1, 0.4], hops: [S.t0 + 1.8] })
      // Libra: behind a tripod at the front, then pulled into the middle
      const lx = lerp(380, 430, pull), ly = lerp(1180, 960, pull)
      LIB(x, t, { x: lx, y: ly, s: 160, mood: S.u < 1.0 ? 'neutral' : S.u < 1.5 ? 'wide' : 'heart', look: [0, -0.8], hops: [S.t0 + 1.0, S.t0 + 1.8] })
      if (S.u < 1.4) { camera(x, 580, 1150, 1); R(x, INK, 576, 1190, 8, 90) }
      bubble(x, t, 540, 640, S.t0 + 0.5, S.t0 + 1.5, 'you’re in this one!', { size: 32, col: '#c9f2d4' })
      if (S.u > 1.8 && S.u < 2.0) { x.save(); x.globalAlpha = 0.5; R(x, '#ffffff', 0, 300, 1080, 1000); x.restore() }
      sparkles(x, t, 430, 900, S.t0 + 1.8, 10, 200, 1)
      hearts(x, t, S.t0 + 1.9, 430, 860, { n: 6 })
    },
    cues: [['pop', 0.5, 987.77, 0.035, 0.2], ['whoosh', 1.0, 0.45, 0.03], ['tick', 1.8, 0.1], ['bell', 1.8, 1760, 0.035, 0.8, 0], ['glitter', 1.8, 2.3]] },
  last: 'Be *in* the picture, not just behind it.',
})
import { withProps } from '../../nt2e11/scenes/launchkit.js'
const EXTRA = { withProps }
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
