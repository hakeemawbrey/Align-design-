// nt2e04: THINGS THAT JUST MAKE SENSE: party season (20 s vertical, Trends Vol. 2 format 1; row in
// promo/films/next30/b11.md; music dreamy · A). Format look: ../../nt2e01/scenes/sensekit.js.
//   0.0–2.1    hook (frame 0): "Things that just *make sense:* | party season". Aries mid-spin on a lit dance floor.
//   2.1–5.0    1 "Aries + *first* on the dance floor": an empty floor, Aries leaps in; the tiles light up behind it.
//   5.0–7.9    2 "Gemini + knows *every name* by nine": a clock at 9:00, name tags pop over everyone, Gemini waving.
//   7.9        card cut.
//   7.9–11.3   3 (twist) "Capricorn + *leaves early* with you": Cancer yawns "I'm a bit tired…"; Capricorn already
//              has both coats: "say less."
//   11.35      stamp MAKES SENSE. · THE STARS: "The best plus-one *leaves with you*." · Pisces: SO TRUE.
import { makeSense, starOf, withProps, bubble, shadow, box, R, hearts, label, sparkles, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK, INTER, MONO } from '../../nt2e01/scenes/sensekit.js'

const ARI = starOf('aries', 3), GEM = starOf('gemini', 4), CAP = starOf('capricorn', 5), CAN = starOf('cancer', 7)
const TILE = ['#ff8fb1', '#7fd0ff', '#f2c75c', '#9fe6b0', '#c9a6ff']

function floor(x, t, lit) {
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) {
    const on = lit > (i + j) / 8, c = TILE[(i + j + Math.floor(t * 3)) % TILE.length]
    R(x, INK, 90 + i * 150, 1060 + j * 50, 150, 50); R(x, on ? c : '#2e2650', 96 + i * 150, 1064 + j * 50, 138, 42)
  }
}
function tag(x, cx, cy, name, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -78, -24, 156, 48, BONE, { b: 5 }); R(x, '#e8344e', -78, -24, 156, 12)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 6)
  x.restore()
}
function coat(x, cx, cy, col, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -40, -60, 80, 120, col, { b: 5 }); R(x, INK, -4, -60, 8, 120); R(x, INK, -26, -78, 52, 14); x.restore() }

const EP = makeSense({
  id: 'nt2e04', topic: 'party season', accent: '#f0603a', deep: '#b8341a', badge: '#f0603a',
  hook(x, t) {
    floor(x, t, 1)
    ARI(x, t, { x: 540, y: 900, s: 300, mood: 'happy', look: [0, 0], hops: [-0.25, 0.4, 1.0, 1.6], squash: 0.08 * Math.sin(t * 9) })
    sparkles(x, t, 540, 860, 0.4, 8, 190, 1); sparkles(x, t, 540, 860, 1.6, 8, 190, 2)
    label(x, '♪', 260, 760 - 20 * Math.sin(t * 4), { size: 64, col: GOLD }); label(x, '♪', 820, 720 + 20 * Math.sin(t * 4), { size: 54, col: PINK })
  },
  hookCues: [['pop', 0.4, 880, 0.03, -0.2], ['pop', 1.0, 987.77, 0.03, 0.2], ['pop', 1.6, 1174.66, 0.03, 0]],
  eqs: [
    { caption: 'Aries + *first* on the dance floor', check: [880, 500],
      draw(x, t, S) {
        const lit = ease.outCubic(prog(S.u, 0.7, 1.5))
        floor(x, t, lit)
        const jump = ease.inOutCubic(prog(S.u, 0.3, 0.7))
        ARI(x, t, { x: lerp(-100, 540, jump), y: 940 - 160 * Math.sin(Math.PI * jump), s: 240, mood: S.u > 0.7 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.75, S.t0 + 1.3, S.t0 + 1.85, S.t0 + 2.4] })
        label(x, '0 people dancing', 540, 760, { size: 30, col: BONE, alpha: S.u < 0.7 ? 1 : 0 })
        label(x, '1 person dancing', 540, 760, { size: 30, col: GOLD, alpha: S.u > 0.75 ? 1 : 0 })
        bubble(x, t, 540, 660, S.t0 + 1.8, S.t1, 'someone had to!', { size: 36 })
      },
      cues: [['whoosh', 0.3, 0.35, 0.03], ['tom', 0.72, 110, { gain: 0.2, decay: 0.2 }], ['glitter', 0.75, 1.4], ['pop', 1.82, 1174.66, 0.03, 0]] },
    { caption: 'Gemini + knows *every name* by nine', check: [880, 480],
      draw(x, t, S) {
        // a clock
        box(x, 440, 500, 200, 80, '#14102a', { b: 6 }); x.font = `700 46px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.u < 0.5 ? '8:59' : '9:00', 540, 542)
        const crowd = [['virgo', 200, 'SAM'], ['leo', 420, 'JO'], ['aquarius', 860, 'RAE'], ['taurus', 650, 'MO']]
        crowd.forEach(([s, cx, n], i) => { const C = starOf(s, 10 + i); C(x, t, { x: cx, y: 1040, s: 150, mood: 'happy', look: [0, -0.3] }); tag(x, cx, 920, n, pop01(t, S.t0 + 0.6 + i * 0.25, 0.25, 2.4)) })
        GEM(x, t, { x: 540, y: 770, s: 170, mood: 'sparkle', look: [0, 0], hops: [S.t0 + 0.6, S.t0 + 0.85, S.t0 + 1.1, S.t0 + 1.35] })
        bubble(x, t, 540, 650, S.t0 + 1.7, S.t1, 'hi Sam! hi Jo! hi Rae!', { size: 32 })
      },
      cues: [['tick', 0.5, 0.06], ['pop', 0.6, 880, 0.03, -0.4], ['pop', 0.85, 987.77, 0.03, -0.1], ['pop', 1.1, 1174.66, 0.03, 0.2], ['pop', 1.35, 1318.51, 0.03, 0.4]] },
    { caption: 'Capricorn + *leaves early* with you', check: [880, 480], pis: { x: 940, y: 1690 },
      draw(x, t, S) {
        floor(x, t, 0.4)
        CAN(x, t, { x: 720, y: 960, s: 220, mood: S.u < 1.2 ? 'sleepy' : S.u > 1.9 ? 'heart' : 'wide', zzz: false, look: [-1, 0], hops: [S.t0 + 1.25], blush: S.u > 1.9 ? 1 : 0 })
        const c = { x: 330, y: 960, s: 230, mood: 'happy', look: [1, 0], hops: [S.t0 + 1.2] }
        CAP(x, t, c)
        const ck = pop01(t, S.t0 + 1.2, 0.3, 2.4)
        if (ck > 0.01) { x.save(); x.translate(330, 760); x.scale(ck, ck); coat(x, -50, 0, '#5a7fd8', -0.12); coat(x, 50, 0, '#d86a5a', 0.12); x.restore() }
        bubble(x, t, 720, 700, S.t0 + 0.3, S.t0 + 1.3, "I'm a bit tired…", { size: 34, col: '#c9f2d4' })
        bubble(x, t, 380, 620, S.t0 + 1.4, S.t1, 'say less. coats are here.', { size: 32 })
        hearts(x, t, S.t0 + 1.95, 720, 840, { n: 6 })
      },
      cues: [['pop', 0.3, 739.99, 0.03, 0.3], ['pop', 1.2, 1318.51, 0.045, -0.3], ['whoosh', 1.2, 0.25, 0.02], ['pluck', 1.96, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, { ok }) {
    shadow(x, 420, 1060, 220 * ok); shadow(x, 680, 1070, 200 * ok)
    CAP(x, t, { x: 420, y: 880, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [11.4, 12.2] })
    CAN(x, t, { x: 680, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [11.5, 13.5] })
  },
  last: 'The best plus-one *leaves with you*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [withProps]
