// nt2e05: THINGS THAT JUST MAKE SENSE: love languages (20 s vertical, Trends Vol. 2 format 1; row in
// promo/films/next30/b11.md; music dreamy · Bb). Format look: ../../nt2e01/scenes/sensekit.js.
//   0.0–2.1    hook (frame 0): "Things that just *make sense:* | love languages". Taurus mid-bite, sharing a snack.
//   2.1–5.0    1 "Taurus + *snacks* as affection": a snack plate slides over, Taurus pushes the biggest piece across.
//   5.0–7.9    2 "Aries + *racing you* to the car": two stars dash; Aries wins, then waits with the door open.
//   7.9        card cut.
//   7.9–11.3   3 (twist) "Virgo + *quietly fixed* your squeaky door": the door goes SQUEAK… a tiny oil can, a twist of
//              a screwdriver-free hinge, silence. Virgo says nothing; Leo notices and melts.
//   11.35      stamp MAKES SENSE. · THE STARS: "Some love is *quiet maintenance*." · Pisces: SO TRUE.
import { makeSense, starOf, bubble, shadow, box, R, hearts, label, sparkles, pop01, prog, ease, lerp, INK, BONE, GOLD } from '../../nt2e01/scenes/sensekit.js'

const TAU = starOf('taurus', 3), ARI = starOf('aries', 4), VIR = starOf('virgo', 5), LEO = starOf('leo', 7), PIS2 = starOf('scorpio', 8)

function plate(x, cx, cy, n, big) {
  box(x, cx - 130, cy - 14, 260, 28, '#e7e2f2', { b: 5 })
  for (let i = 0; i < n; i++) box(x, cx - 100 + i * 50, cy - 40, 36, 26, '#f0a34a', { b: 4, hi: '#ffd27a' })
  if (big) box(x, big.x - 40, big.y - 30, 80, 46, '#f0a34a', { b: 5, hi: '#ffd27a' })
}
function door(x, cx, k = 0) {
  box(x, cx - 130, 620, 260, 540, '#3a2d66', { b: 8 })
  box(x, cx - 120, 630, 240 - 60 * k, 520, '#a8724e', { b: 6, hi: '#c28a5e' })
  R(x, GOLD, cx + 80 - 60 * k, 880, 20, 20)
  R(x, '#8c86a8', cx - 128, 700, 14, 40); R(x, '#8c86a8', cx - 128, 1040, 14, 40)
}

const EP = makeSense({
  id: 'nt2e05', topic: 'love languages', accent: '#ff8fb1', deep: '#b0306a', badge: '#ff8fb1',
  hook(x, t) {
    plate(x, 540, 1130, 4, null)
    TAU(x, t, { x: 420, y: 930, s: 290, mood: 'happy', look: [1, 0], hops: [-0.15, 0.7, 1.5] })
    LEO(x, t, { x: 800, y: 980, s: 190, mood: 'heart', look: [-1, 0], hops: [0.75] })
    box(x, 590 - 40 + 30 * Math.sin(t * 3), 880, 80, 46, '#f0a34a', { b: 5, hi: '#ffd27a' })
    label(x, 'nom', 420, 700, { size: 40, col: GOLD, rot: -0.1 })
  },
  hookCues: [['pop', 0.7, 880, 0.03, 0], ['pop', 1.5, 987.77, 0.03, 0]],
  eqs: [
    { caption: 'Taurus + *snacks* as affection', check: [880, 500],
      draw(x, t, S) {
        const slide = ease.outCubic(prog(S.u, 0.1, 0.5)), push = ease.inOutCubic(prog(S.u, 0.9, 1.4))
        plate(x, lerp(-200, 540, slide), 1130, 3, { x: lerp(420, 700, push), y: 1090 })
        TAU(x, t, { x: 330, y: 960, s: 230, mood: S.u > 1.4 ? 'happy' : 'sparkle', look: [1, 0.3], hops: [S.t0 + 0.9] })
        LEO(x, t, { x: 780, y: 960, s: 200, mood: S.u > 1.4 ? 'heart' : 'wide', look: [-1, 0.3], hops: [S.t0 + 1.45] })
        hearts(x, t, S.t0 + 1.5, 780, 820, { n: 5 })
        bubble(x, t, 380, 700, S.t0 + 1.7, S.t1, 'you get the big one.', { size: 34 })
      },
      cues: [['whoosh', 0.1, 0.3, 0.025], ['whoosh', 0.9, 0.25, 0.02], ['pop', 1.45, 1318.51, 0.04, 0.3]] },
    { caption: 'Aries + *racing you* to the car', check: [880, 480],
      draw(x, t, S) {
        R(x, '#2e2650', 0, 1100, 1080, 80)
        box(x, 720, 960, 300, 110, '#e8344e', { b: 6, hi: '#ff6b7f' }); box(x, 770, 900, 200, 70, '#e8344e', { b: 6 }); R(x, '#bfe8ff', 785, 912, 80, 46); R(x, INK, 750, 1060, 60, 40); R(x, INK, 930, 1060, 60, 40)
        const run = ease.inOutCubic(prog(S.u, 0.2, 1.0))
        const hops = [0.25, 0.45, 0.65, 0.85].map(h => S.t0 + h)
        ARI(x, t, { x: lerp(120, 590, run), y: 1000, s: 200, mood: S.u > 1.0 ? 'happy' : 'squint', look: [1, 0], hops })
        LEO(x, t, { x: lerp(60, 400, ease.inOutCubic(prog(S.u, 0.3, 1.4))), y: 1010, s: 180, mood: 'happy', look: [1, 0], hops: hops.map(h => h + 0.15) })
        if (S.u > 1.0) label(x, 'WINNER', 590, 840, { size: 36, col: GOLD })
        bubble(x, t, 600, 700, S.t0 + 1.6, S.t1, 'door’s open for you!', { size: 34 })
      },
      cues: [['whoosh', 0.2, 0.6, 0.03], ['pop', 1.0, 1318.51, 0.04, 0.4], ['pop', 1.6, 1174.66, 0.03, 0.2]] },
    { caption: 'Virgo + *quietly fixed* your squeaky door', check: [880, 480], pis: { x: 940, y: 1690 },
      draw(x, t, S) {
        const sw = S.u < 0.9 ? Math.abs(Math.sin(S.u * 6)) : 0
        door(x, 360, sw)
        if (S.u < 0.9) label(x, 'SQUEAK', 360, 580, { size: 40, col: '#ff8fb1', rot: -0.1 * Math.sin(S.u * 12) })
        const v = { x: 640, y: 1000, s: 200, mood: 'neutral', look: [-1, -0.2], hops: [S.t0 + 0.9] }
        VIR(x, t, v)
        const oil = pop01(t, S.t0 + 0.9, 0.25, 2.2) * (1 - prog(S.u, 1.5, 1.7))
        if (oil > 0.01) { x.save(); x.translate(260, 720); x.rotate(-0.5); x.scale(oil, oil); box(x, -24, -20, 48, 40, '#8c86a8', { b: 4 }); R(x, INK, 20, -6, 40, 8); x.restore(); sparkles(x, t, 232, 720, S.t0 + 1.15, 6, 50, 1) }
        if (S.u > 1.5) label(x, '(silence)', 360, 580, { size: 32, col: BONE })
        LEO(x, t, { x: 860, y: 1020, s: 180, mood: S.u > 1.9 ? 'heart' : 'wide', look: [-1, 0], hops: [S.t0 + 1.9], blush: S.u > 1.9 ? 1 : 0 })
        hearts(x, t, S.t0 + 1.95, 860, 880, { n: 6 })
        bubble(x, t, 700, 660, S.t0 + 1.9, S.t1, 'wait… did you fix that?', { size: 32, col: '#c9f2d4' })
      },
      cues: [['tick', 0.1, 0.05], ['tick', 0.45, 0.05], ['tick', 0.8, 0.05], ['pop', 0.9, 659.25, 0.03, -0.3], ['glitter', 1.15, 1.4], ['pluck', 1.96, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, { ok }) {
    shadow(x, 420, 1060, 220 * ok); shadow(x, 680, 1070, 200 * ok)
    VIR(x, t, { x: 420, y: 880, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [11.4, 12.2], blush: 0.8 })
    LEO(x, t, { x: 680, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [11.5, 13.5] })
  },
  last: 'Some love is *quiet maintenance*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PIS2]
