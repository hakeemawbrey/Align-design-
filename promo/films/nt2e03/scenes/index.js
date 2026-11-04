// nt2e03: THINGS THAT JUST MAKE SENSE: first dates (20 s vertical, Trends Vol. 2 format 1; row in
// promo/films/next30/b11.md; music dreamy · G). Format look: ../../nt2e01/scenes/sensekit.js.
//   0.0–2.1    hook (frame 0): "Things that just *make sense:* | first dates". Leo mid-wave with a compliment card.
//   2.1–5.0    1 "Leo + *a compliment* ready at hello": the door opens, Leo flips the card: "your laugh is elite."
//   5.0–7.9    2 "Sagittarius + *a walk* instead of dinner": a winding path, street lamps scroll by: "let's just walk."
//   7.9        card cut.
//   7.9–11.3   3 (twist) "Libra picks the place *in one second*": Libra, famous for deciding slowly, holds a note
//              "what do you like?" … "then it's the noodle place." Instant. The date melts.
//   11.35      stamp MAKES SENSE. · THE STARS: "Easy choices start with *asking*." · Pisces: SO TRUE.
import { makeSense, starOf, bubble, shadow, box, R, hearts, label, sparkles, pop01, prog, ease, lerp, INK, BONE, GOLD, INTER } from '../../nt2e01/scenes/sensekit.js'

const LEO = starOf('leo', 3), SAG = starOf('sagittarius', 4), LIB = starOf('libra', 5), AQU = starOf('aquarius', 7), TAU = starOf('taurus', 8)

function card(x, cx, cy, text, k, rot = -0.08, w = 300) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -60, w, 120, BONE, { b: 6 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const ls = text.split('|'); ls.forEach((l, i) => x.fillText(l, 0, (i - (ls.length - 1) / 2) * 36 + 2))
  x.restore()
}
function lamp(x, lx) { R(x, INK, lx - 8, 700, 16, 460); R(x, '#5a5470', lx - 4, 700, 8, 460); box(x, lx - 36, 660, 72, 48, '#ffe29a', { b: 6 }); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, 690, 10, lx, 690, 220); g.addColorStop(0, 'rgba(255,226,154,0.3)'); g.addColorStop(1, 'rgba(255,226,154,0)'); x.fillStyle = g; x.fillRect(lx - 220, 470, 440, 440); x.restore() }

const EP = makeSense({
  id: 'nt2e03', topic: 'first dates', accent: '#f39a3a', deep: '#b8561a', badge: '#f39a3a',
  hook(x, t) {
    shadow(x, 520, 1180, 320)
    LEO(x, t, { x: 500, y: 950, s: 310, mood: 'sparkle', look: [0.5, -0.3], hops: [-0.2, 0.6, 1.4] })
    card(x, 800, 820, 'COMPLIMENT|READY', 1, 0.12 + 0.06 * Math.sin(t * 6), 280)
    sparkles(x, t, 800, 820, 0.6, 8, 160, 1)
  },
  hookCues: [['pop', 0.6, 987.77, 0.03, 0.3], ['glitter', 0.6, 0.9], ['pop', 1.4, 1174.66, 0.03, 0.3]],
  eqs: [
    { caption: 'Leo + *a compliment* ready at hello', check: [880, 500],
      draw(x, t, S) {
        // a door swinging open on the right
        const op = ease.outCubic(prog(S.u, 0.2, 0.6))
        box(x, 640, 700, 300, 470, '#3a2d66', { b: 8 }); R(x, '#ffe7b0', 650, 710, 280, 450)
        box(x, 640, 700, 300 * (1 - op * 0.8), 470, '#8a5a3c', { b: 6, hi: '#a8724e' })
        if (op > 0.5) AQU(x, t, { x: 790, y: 1000, s: 190, mood: S.u > 1.4 ? 'heart' : 'wide', look: [-1, 0], blush: S.u > 1.4 ? 1 : 0, hops: [S.t0 + 1.4] })
        LEO(x, t, { x: 330, y: 1000, s: 240, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.9] })
        const flip = prog(S.u, 0.9, 1.15)
        card(x, 420, 780, flip < 0.5 ? 'hi!' : 'your laugh|is elite.', Math.abs(1 - 2 * flip) * (flip < 0.5 ? 1 : 1) || 0.02, -0.06, 300)
        hearts(x, t, S.t0 + 1.45, 790, 860, { n: 5 })
        bubble(x, t, 760, 620, S.t0 + 1.9, S.t1, 'oh! hi!', { size: 34 })
      },
      cues: [['whoosh', 0.2, 0.3, 0.025], ['pop', 1.0, 1318.51, 0.04, -0.3], ['pluck', 1.45, 1174.66, 0.035, 0.4, 0.3]] },
    { caption: 'Sagittarius + *a walk* instead of dinner', check: [880, 500],
      draw(x, t, S) {
        const scroll = (S.u * 260) % 520
        R(x, '#2e2650', 0, 1150, 1080, 70); for (let i = -1; i < 4; i++) R(x, 'rgba(239,230,214,0.3)', i * 300 - (scroll % 300), 1180, 140, 8)
        for (let i = -1; i < 3; i++) lamp(x, i * 520 + 260 - scroll)
        const hops = [0.3, 0.75, 1.2, 1.65, 2.1, 2.55].map(h => S.t0 + h)
        SAG(x, t, { x: 380, y: 1000, s: 220, mood: 'happy', look: [1, 0], hops })
        TAU(x, t, { x: 640, y: 1010, s: 200, mood: 'happy', look: [-1, -0.2], hops: hops.map(h => h + 0.2), blush: 0.8 })
        bubble(x, t, 420, 700, S.t0 + 0.6, S.t0 + 1.6, "let's just walk.", { size: 36 })
        bubble(x, t, 640, 720, S.t0 + 1.7, S.t1, 'best idea yet.', { size: 34 })
      },
      cues: [['pop', 0.6, 880, 0.03, -0.3], ['pop', 1.7, 1174.66, 0.03, 0.3]] },
    { caption: 'Libra picks the place *in one second*', check: [880, 480], pis: { x: 940, y: 1690 },
      draw(x, t, S) {
        LIB(x, t, { x: 320, y: 1000, s: 240, mood: S.u > 1.4 ? 'sparkle' : 'neutral', look: [1, -0.2], hops: [S.t0 + 1.4] })
        AQU(x, t, { x: 760, y: 1010, s: 210, mood: S.u > 1.9 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 1.9], blush: S.u > 1.9 ? 1 : 0.3 })
        bubble(x, t, 380, 700, S.t0 + 0.3, S.t0 + 1.3, 'what do you like?', { size: 36 })
        bubble(x, t, 760, 760, S.t0 + 0.8, S.t0 + 1.4, 'noodles?', { size: 34, col: '#c9f2d4' })
        bubble(x, t, 420, 700, S.t0 + 1.4, S.t1, 'then the noodle place.', { size: 34 })
        if (S.u > 1.4 && S.u < 2.2) label(x, '0.9 s', 320, 820, { size: 30, col: GOLD })
        hearts(x, t, S.t0 + 1.95, 760, 860, { n: 6 })
      },
      cues: [['pop', 0.3, 739.99, 0.035, -0.3], ['pop', 0.8, 987.77, 0.035, 0.3], ['tick', 1.4, 0.06], ['pop', 1.42, 1318.51, 0.045, -0.2], ['pluck', 1.96, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, { ok }) {
    shadow(x, 420, 1060, 220 * ok); shadow(x, 680, 1070, 200 * ok)
    LIB(x, t, { x: 420, y: 880, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [11.4, 12.2] })
    AQU(x, t, { x: 680, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [11.5, 13.5] })
  },
  last: 'Easy choices start with *asking*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp]
