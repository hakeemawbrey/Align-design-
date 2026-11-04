// nsage11: SAG SEASON TAKEOVER, ep 11, "Ask Sag Anything" (23 s vertical, music: pop · Bb). promo/films/next30/b10.md.
// Story 0–20.6, then the short (2.4 s) end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Ask Sag anything. | (Sag *will* answer.)"  Frame 0: Sag at an advice desk, already mid-answer.
//   2.6–6.0    GEMINI: "should I text first?"  SAG: "yes."
//   6.0–9.4    LIBRA: "should I pick the place?"  SAG: "yes."
//   9.4–12.8   TAURUS: "can I bring snacks?"  SAG: "obviously."
//  12.8–16.1   PISCES: "is it okay to cry on a first date?"  …a pause…  SAG: "yes. I'll bring tissues."
//  16.1–20.6   SAG: "Most answers are *yes.* Ask anyway."  Pisces fountains.
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, table, tissues, colOf, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

function desk(x, t) {
  floor(x, 1260)
  glow(x, 330, 900, 420, 0.14)
  // the sign on the front of the desk
  table(x, 330, 1150, 480, '#6a4fb0')
  box(x, 150, 1196, 360, 64, BONE, { b: 5 }); ink(x, 'ASK SAG', 330, 1229, { size: 34 })
}
function sag(x, t, S, mood, hops) { S.host(x, t, { x: 330, y: 1010, s: 250, mood, look: [1, 0], hops }) }
function asker(x, t, S, id, mood, k = 1) {
  shadow(x, 800, 1255, 230 * k)
  const p = ease.outCubic(prog(S.u, 0, 0.35))
  S.star(x, t, id, { x: lerp(1200, 800, p), y: 1080, s: 230, pop: k, mood, look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 0.7] })
}
const ASKS = [
  ['gemini', 'should I text first?', 'yes.', 'Question one: | *texting.*'],
  ['libra', 'should I pick the place?', 'yes.', 'Question two: | *the place.*'],
  ['taurus', 'can I bring snacks?', 'obviously.', 'Question three: | *snacks.*'],
]
const beatFor = ([id, q, a, head], i) => ({
  dur: 3.4, head, accent: colOf(id), pis: { x: 950, y: 1690, s: 115 },
  draw(x, t, S) {
    desk(x, t)
    asker(x, t, S, id, S.u < 1.3 ? 'neutral' : 'happy')
    sag(x, t, S, S.u < 1.3 ? 'neutral' : 'happy', [S.t0 + 1.3])
    if (S.u > 1.3) sparkles(x, t, 800, 1000, S.t0 + 1.35, 8, 140, i)
  },
  says: [
    { at: 0.35, text: q, x: 780, y: 860, who: id, tail: 0.1 },
    { at: 1.3, text: a, x: 330, y: 760, who: 'host', tail: 0, size: 46, col: '#efe0ff' },
  ],
  cues: [['whoosh', 0, 0.3, 0.03], ['pop', 1.3, 1567.98, 0.05, -0.3], ['pop', 1.36, 2093, 0.03, -0.3]],
})

const EP = makeTakeover({
  id: 'nsage11', host: 'sag', duration: 25, dy: 120,
  hook: {
    text: 'Ask Sag anything. | (Sag *will* answer.)', dur: 2.6,
    draw(x, t, S) {
      desk(x, t)
      sag(x, t, S, 'happy', [0.1, 0.45, 0.8])
      // a pile of question cards flying in
      for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i * 0.2) % 1; x.save(); x.translate(lerp(1150, 650, p), 560 + i * 70 - 120 * Math.sin(Math.PI * p)); x.rotate(p * 3 + i); box(x, -45, -30, 90, 60, BONE, { b: 5 }); ink(x, '?', 0, 2, { size: 40 }); x.restore() }
      x.save(); x.translate(330, 780); box(x, -70, -40, 140, 70, '#efe0ff', { b: 5 }); ink(x, 'yes.', 0, -4, { size: 40, font: 'Inter', weight: 800 }); x.restore()
    },
    cues: [['pop', 0.1, 1567.98, 0.04, -0.3], ['pop', 0.45, 1318.51, 0.04, -0.3], ['pop', 0.8, 1567.98, 0.04, -0.3]],
  },
  beats: [
    ...ASKS.map(beatFor),
    { dur: 3.3, pis: false, head: 'The *big* one.', accent: '#9fb7ff',
      draw(x, t, S) {
        const { u } = S
        desk(x, t)
        tissues(x, 640, 1110, 90)
        S.pisces(x, t, { x: 800, y: 1080, s: 230, hops: [S.t0 + 0.4] }, u < 1.9 ? 2 : 3, u < 1.9 ? 'wide' : 'sparkle', [-1, 0])
        sag(x, t, S, u < 1.9 ? 'neutral' : 'heart', [S.t0 + 1.9])
        // the pause
        if (u > 1.0 && u < 1.85) ink(x, '…', 330, 760, { size: 70, col: BONE })
        if (u > 1.9) hearts(x, t, S.t0 + 2.0, 560, 820, { n: 5 })
      },
      says: [
        { at: 0.3, text: 'is it okay to cry on a first date?', x: 760, y: 860, who: 'pisces', tail: 0.1, maxW: 480 },
        { at: 1.9, text: "yes. I'll bring tissues.", x: 360, y: 680, who: 'host', tail: -0.1 },
      ],
      cues: [['whoosh', 0, 0.3, 0.03], ['pluck', 1.1, 523.25, 0.02, 0.6, -0.3], ['pluck', 1.9, 1174.66, 0.04, 0.6, -0.3], ['pluck', 2.05, 1567.98, 0.035, 0.6, -0.3]],
    },
  ],
  last: { who: 'host', text: 'Most answers are *yes.* Ask anyway.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 540, 1120, 260 * ok)
    S.host(x, t, { x: 540, y: 910, s: 290, pop: ok, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, clamp, GOLD, INK]
