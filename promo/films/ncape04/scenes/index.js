// ncape04: CAPRICORN SEASON TAKEOVER, ep 4, "The Seating Chart" (25 s vertical, music: jazzy · Eb). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Cap brought a | *seating chart.*"  Frame 0: Cap mid-unfurl of a colour-coded chart over the holiday table.
//   2.6–7.1    "Placed with | a *ruler.*"  Name cards go down at perfectly measured spacing.
//   7.1–11.6   "Gemini *swaps* two."  Gemini swaps two cards; Cap swaps them back without looking up.
//  11.6        card cut.
//  11.6–16.1   "Then: one | *extra* guest."  The new partner's grandma arrives; there's no seat. GRANDMA: "oh, don't
//              fuss, dear!"  CAP: "please. take mine."  Cap gives up its chair and stands, smiling.
//  16.1–20.6   THE STARS: "Planning is how Cap says *welcome.*"
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, drawStarChar, signStar, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const GRAN = '#e6dcef'
function holidayTable(x) {
  floor(x, 1260)
  R(x, INK, 120, 1116, 24, 150); R(x, INK, 936, 1116, 24, 150)
  box(x, 60, 1070, 960, 110, '#f4f1ea', { b: 6 })            // tablecloth
  R(x, '#c0392b', 60, 1150, 960, 14)
  // a little centrepiece: a candle and greens
  box(x, 520, 1010, 40, 60, BONE, { b: 5 }); R(x, GOLD, 534, 990, 12, 18)
  for (let i = 0; i < 6; i++) R(x, '#3f7a4a', 460 + i * 28, 1052 - (i % 2) * 8, 24, 16)
}
const SEATS = [['leo', 170], ['gemini', 330], ['libra', 700], ['capricorn', 860]]
function nameCard(x, cx, id, k = 1, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, 1050); x.scale(k, k)
  box(x, -46, -40, 92, 40, col || BONE, { b: 4 })
  ink(x, signStar(id).glyph + '︎', 0, -18, { size: 28, font: "'EB Garamond', serif", weight: 700 })
  x.restore()
}
function chart(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(1, k)
  box(x, -330, -150, 660, 300, BONE, { b: 7 })
  const C = ['#5fb8ff', '#9fe6b0', GOLD, '#ff8fb1', '#c58bff', '#ff7a5a']
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) R(x, C[(i + j * 2) % 6], -300 + i * 100, -110 + j * 80, 80, 56)
  x.restore()
}
function ruler(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -160, -16, 320, 32, '#ffd36b', { b: 5 }); for (let i = 0; i < 16; i++) R(x, INK, -150 + i * 20, -16, 3, i % 4 ? 10 : 18); x.restore() }
function gran(x, t, o) {
  drawStarChar(x, o.x, o.y, o.s, t, { color: GRAN, seed: 21, glow: 0.8, ...o })
  // little round glasses
  const s = o.s * (o.pop ?? 1)
  for (const d of [-1, 1]) { x.save(); x.strokeStyle = INK; x.lineWidth = Math.max(3, s * 0.02); x.beginPath(); x.arc(o.x + d * s * 0.13, o.y - s * 0.02, s * 0.085, 0, Math.PI * 2); x.stroke(); x.restore() }
}
function chair(x, cx, empty = true) { box(x, cx - 60, 900, 120, 170, '#8a5a3a', { b: 6, hi: '#a87048' }); void empty }

const EP = makeTakeover({
  id: 'ncape04', host: 'cap', duration: 25, dy: 120,
  hook: {
    text: 'Cap brought a | *seating chart.*', dur: 2.6,
    draw(x, t, S) {
      holidayTable(x)
      chart(x, 600, 760, clamp(0.35 + t * 0.6))
      S.host(x, t, { x: 230, y: 940, s: 250, mood: 'happy', look: [1, -0.5], squash: -0.06, hops: [0.5, 1.4] })
    },
    cues: [['whoosh', 0, 1.0, 0.03], ['tick', 1.1, 0.06]],
  },
  beats: [
    { dur: 4.5, head: 'Placed with | a *ruler.*',
      draw(x, t, S) {
        const { u } = S
        holidayTable(x)
        SEATS.forEach(([id, cx], i) => nameCard(x, cx, id, pop01(t, S.t0 + 0.6 + i * 0.7, 0.25, 2.4)))
        const rx = lerp(170, 860, clamp(prog(u, 0.4, 3.2)))
        ruler(x, rx, 990, 0)
        S.host(x, t, { x: rx, y: 800, s: 210, mood: 'squint', look: [0, 1], hops: [0, 1, 2, 3].map(i => S.t0 + 0.6 + i * 0.7) })
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [0, 1, 2, 3].flatMap(i => [['tick', +(0.6 + i * 0.7).toFixed(2), 0.06], ['pop', +(0.62 + i * 0.7).toFixed(2), [880, 987.77, 1174.66, 1318.51][i], 0.03, -0.4 + i * 0.27]]),
    },
    { dur: 4.5, head: 'Gemini *swaps* two.', accent: '#ffe27a',
      draw(x, t, S) {
        const { u } = S
        holidayTable(x)
        // swap: the leo and libra cards trade places (0.6–1.2), then swap back (2.4–2.9)
        const a = ease.inOutCubic(prog(u, 0.6, 1.2)) - ease.inOutCubic(prog(u, 2.4, 2.9))
        nameCard(x, lerp(170, 700, a), 'leo'); nameCard(x, lerp(700, 170, a), 'libra')
        nameCard(x, 330, 'gemini'); nameCard(x, 860, 'capricorn')
        S.star(x, t, 'gemini', { x: 420, y: 830, s: 200, mood: u < 2.4 ? 'wink' : 'wide', look: [1, 1], hops: [S.t0 + 0.6, S.t0 + 1.2, S.t0 + 2.9] })
        S.host(x, t, { x: 880, y: 820, s: 220, mood: 'neutral', look: [1, -1], hops: [S.t0 + 2.4] })
        chart(x, 760, 560, 0.45)
      },
      says: [{ at: 3.0, text: 'how?? you were reading!', x: 420, y: 640, who: 'gemini', tail: 0 }],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['whoosh', 0.6, 0.6, 0.03], ['tick', 1.2, 0.05], ['whoosh', 2.4, 0.5, 0.03], ['tick', 2.9, 0.06]],
    },
    { dur: 4.5, head: 'Then: one | *extra* guest.',
      draw(x, t, S) {
        const { u } = S
        holidayTable(x)
        SEATS.forEach(([id, cx]) => nameCard(x, cx, id))
        chair(x, 860)
        const g = ease.outCubic(prog(u, 0.1, 0.7))
        const move = ease.inOutCubic(prog(u, 2.4, 3.1))
        gran(x, t, { x: lerp(1250, lerp(1000, 860, move), g), y: lerp(1150, 900, move), s: 180, mood: u < 3.1 ? 'happy' : 'heart', look: [-1, 0], hops: [S.t0 + 0.8, S.t0 + 3.1] })
        S.host(x, t, { x: lerp(860, 660, move), y: lerp(880, 1170, move), s: 200, mood: 'happy', look: [1, 0], hops: [S.t0 + 2.2, S.t0 + 3.2] })
        hearts(x, t, S.t0 + 3.2, 760, 760, { n: 5 })
      },
      says: [
        { at: 0.8, until: 2.3, text: "oh, don't fuss, dear!", x: 820, y: 700, tag: 'GRANDMA', tail: 0.4 },
        { at: 2.2, text: 'please. take mine.', x: 600, y: 650, who: 'host', tail: 0.3 },
      ],
      pis: { x: 150, y: 1690, s: 130, tears: 3, look: [1, -0.6], noTissues: true },
      cues: [['whoosh', 0.1, 0.5, 0.03], ['pop', 0.8, 1318.51, 0.04, 0.4], ['whoosh', 2.4, 0.6, 0.03], ['bell', 3.1, 1760, 0.03, 1.2, 0.2]],
    },
  ],
  last: { who: 'stars', text: 'Planning is how Cap says *welcome.*' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 200 * ok)
    S.host(x, t, { x: 420, y: 920, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, S.t0 + 2.6] })
    gran(x, t, { x: 690, y: 930, s: 200, pop: ok, mood: 'heart', look: [-1, 0] })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, sparkles, RED]
