// nt2e80: LITTLE TREAT, "Little Treat: Pisces, shared" (18 s vertical, Star Talk Trends Vol. 2 ep 80,
// promo/films/next30/b14.md; music: chiptune · G). Story 0–15.6, then the shared short end card. Format: ../../nt2e76/scenes/treat.js.
// Pisces is the hero here, so it does its crying front and centre (no background Pisces this time).
//   0.0–2.1    hook (frame 0): "Little treat for | *every soft win.*"  Pisces, eyes shining, a tissue in one hand and a
//              cupcake in the other.
//   2.1–4.85   WIN 1 "cried only *once* at the movie."  The tear counter on the seat: TEARS: 1. → a cupcake.
//   4.85–7.6   WIN 2 "said *no* to a plan I didn't want."  The phone: "4 a.m. hike??"  Pisces: "no thank you!" → a tea.
//   7.6–10.95  WIN 3 (the twist) "cried happy tears on date one… *they did too.*"  Pisces and Cancer, both fountaining:
//              "you too??" → one pie, two spoons.
//   11.35      the stamp "TREAT *EARNED.*"  Both still crying, happily.
//   11.95      THE STARS: "Treats taste better *shared*."
import { makeTreat, treatIcon, FLOOR, R, box, bubble, label, shadow, sparkles, hearts, tearsCells, inSprite, starFrame, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from '../../nt2e76/scenes/treat.js'
import { tissues } from '../../nt2e61/scenes/t2kit.js'

// Cancer, crying too (tears on any star)
function crier(x, t, id, o, star, tears) {
  star(id, x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, { ...o, seed: 5 })
  inSprite(x, F, () => tearsCells(x, t, tears))
}
function spoon(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -5, -10, 10, 90); R(x, '#dfe6f0', -3, -8, 6, 86); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -24, 18, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#dfe6f0'; x.beginPath(); x.ellipse(0, -24, 13, 19, 0, 0, Math.PI * 2); x.fill(); x.restore() }

const tells = [
  { caption: 'cried only *once* at the movie.', treat: 'cupcake',
    draw(x, t, S) {
      const { u, pisces } = S
      R(x, '#0c0a1e', 0, 0, 1080, 1920)
      box(x, 90, 440, 900, 360, '#ffb8c8', { b: 8 })
      x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(540, 740, 120, Math.PI, 0); x.fill()
      box(x, 390, 1120, 300, 120, '#8a2a3a', { b: 6 }); box(x, 390, 980, 300, 150, '#a8344a', { b: 6 })
      pisces(x, t, { x: 540, y: 980, s: 230, hops: [S.t0 + 0.6] }, u > 0.5 && u < 1.2 ? 1 : 0, u > 1.2 ? 'happy' : 'sparkle', [0, -0.8])
      x.save(); x.translate(800, 1060); box(x, -110, -40, 220, 80, BONE, { b: 5 }); x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`TEARS: ${u > 0.55 ? 1 : 0}`, 0, 2); x.restore()
      if (u > 1.1) label(x, 'just one!', 800, 960, { size: 36, font: INTER, weight: 800, col: GOLD, rot: -0.08 })
    },
    treatPos: [250, 840], pis: { none: true },
    cues: [['pop', 0.55, 659.25, 0.03, 0.3], ['tick', 0.56, 0.05], ['pop', 1.1, 1318.51, 0.035, 0.3]] },
  { caption: 'said *no* to a plan I didn’t want.', treat: 'tea',
    draw(x, t, S) {
      const { u, pisces } = S
      shadow(x, 320, FLOOR + 30, 200)
      const k = pop01(t, S.t0 + 0.15, 0.3, 2.4)
      x.save(); x.translate(780, 820); x.scale(k * 1.4, k * 1.4); x.rotate(0.05)
      box(x, -70, -125, 140, 250, '#2a2148', { b: 7 }); R(x, '#14102a', -58, -108, 116, 210)
      x.font = `700 20px ${MONO}`; x.fillStyle = '#ff9a5c'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAG', 0, -80)
      x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText('4 a.m.', 0, -30); x.fillText('hike??', 0, 8)
      x.restore()
      pisces(x, t, { x: 320, y: 1000, s: 230, hops: [S.t0 + 0.9, S.t0 + 1.2] }, u > 1.2 ? 1 : 0, u > 0.9 ? 'happy' : 'wide', [1, -0.4])
      bubble(x, t, 330, 760, S.t0 + 0.9, S.t1, 'no thank you!', { size: 40, tail: 0 })
    },
    treatPos: [560, 560], pis: { none: true },
    cues: [['pop', 0.15, 987.77, 0.04, 0.3], ['pop', 0.9, 1318.51, 0.04, -0.3]] },
  { caption: 'cried happy tears on date one… *they did too.*', treat: 'pie', treatAt: 2.0,
    draw(x, t, S) {
      const { u, pisces, star } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 780, FLOOR + 30, 200)
      pisces(x, t, { x: 300, y: 1000, s: 230, hops: [S.t0 + 0.4, S.t0 + 1.3] }, u > 0.3 ? 3 : 2, 'sparkle', [1, -0.2])
      crier(x, t, 'cancer', { x: 780, y: 1000, s: 220, mood: 'sparkle', look: [-1, -0.2], hops: [S.t0 + 1.0, S.t0 + 1.6] }, star, u > 0.9 ? 3 : 0)
      bubble(x, t, 760, 760, S.t0 + 1.05, S.t1, 'you too??', { size: 40, tail: 0 })
      if (u > 2.1) { spoon(x, 470, 560, -0.5); spoon(x, 610, 560, 0.5) }
      if (u > 1.0) hearts(x, t, S.t0 + 1.05, 540, 900, { n: 5 })
    },
    treatPos: [540, 620], pis: { none: true },
    cues: [['pop', 1.0, 1174.66, 0.04, 0.3], ['pop', 1.05, 880, 0.03, 0.3], ['tick', 2.1, 0.05], ['tick', 2.14, 0.05]] },
]

const EP = makeTreat({
  id: 'nt2e80', sign: 'pisces', name: 'Pisces', date: 'cancer', deep: '#5e4a9a', accent: '#ffd23f',
  hookText: 'Little treat for | *every soft win.*',
  noFinalePisces: true,
  hook(x, t, S) {
    shadow(x, 540, FLOOR + 30, 260)
    S.pisces(x, t, { x: 540, y: 1000, s: 290, hops: [0.25, 0.9, 1.55] }, 2, 'sparkle', [0, 0])
    tissues(x, 330, 1020, 110)
    x.save(); x.translate(760, 1000 - 6 * Math.sin(t * 4)); treatIcon(x, t, 'cupcake', 0, 0, 140); x.restore()
  },
  hookCues: [['pluck', 0.25, 1174.66, 0.03, 0, 0.3], ['pop', 0.9, 880, 0.02, 0.3]],
  tells,
  finale(x, t, S) {
    const { ok, pisces, star } = S
    pisces(x, t, { x: 420, y: 700, s: 230, pop: ok, hops: [T.stamp + 0.04, T.last + 1.6] }, 3, 'sparkle', [1, 0])
    crier(x, t, 'cancer', { x: 680, y: 710, s: 210, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] }, star, 2)
  },
  last: 'Treats taste better *shared*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, outK, prog, lerp, clamp, ease, PINK, RED]
