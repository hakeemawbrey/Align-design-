// ncape02: CAPRICORN SEASON TAKEOVER, ep 2, "Cap Plans Date Two" (25 s vertical, music: lofi · Gm). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Cap's plan for | *date number two.*"  Frame 0: Cap mid-unroll of a scroll that keeps rolling off-frame.
//   2.6–7.2    "Minute *by* minute."  6:00 arrive · 6:04 compliment · 6:07 laugh · 6:09 laugh again · 6:15 talk card.
//   7.2–11.6   "Gemini *reviews* it."  GEMINI: "…that's a lot of plan."  Cap blinks.
//  11.6        card cut.
//  11.6–16.1   "The *edit.*"  Cap crosses it all out and writes one line: "ask what they'd like to do."  Gemini lights up.
//  16.1–20.6   THE STARS: "The best plan has *their* idea in it."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const PLAN = ['6:00  arrive', '6:04  compliment', '6:07  laugh', '6:09  laugh again', '6:15  talk card', '6:21  dessert?']
// the scroll: rod at top (cx, top), unrolled length len
function scroll(x, cx, top, len, lines, { strike = 0, shown = 99, write = 0 } = {}) {
  const w = 560
  R(x, 'rgba(6,4,18,0.4)', cx - w / 2 + 14, top + 14, w, len)
  box(x, cx - w / 2, top, w, len, '#f6ecd0', { b: 6 })
  box(x, cx - w / 2 - 30, top - 26, w + 60, 36, '#8a5a3a', { b: 6 })
  x.save(); x.beginPath(); x.rect(cx - w / 2, top, w, len); x.clip()
  lines.forEach((l, i) => { if (i < shown) ink(x, l, cx - w / 2 + 40, top + 60 + i * 72, { size: 36, align: 'left', strike: strike > i / lines.length ? clamp((strike - i / lines.length) * lines.length) : false }) })
  if (write > 0) { x.save(); x.beginPath(); x.rect(cx - w / 2, 0, w * write, 3000); x.clip(); ink(x, "ask what they'd", cx, top + 60 + lines.length * 72 + 20, { size: 50, col: '#2e5f5a', font: "'EB Garamond', serif", weight: 500 }); ink(x, 'like to do.', cx, top + 60 + lines.length * 72 + 70, { size: 50, col: '#2e5f5a', font: "'EB Garamond', serif", weight: 500 }); x.restore() }
  x.restore()
  // the bottom roll
  box(x, cx - w / 2 - 10, top + len - 10, w + 20, 34, '#e8dcb8', { b: 6 })
}

const EP = makeTakeover({
  id: 'ncape02', host: 'cap', duration: 25, dy: 60,
  hook: {
    text: "Cap's plan for | *date number two.*", dur: 2.6,
    draw(x, t, S) {
      floor(x, 1320)
      scroll(x, 600, 470, 600 + t * 900, PLAN.concat(PLAN))
      S.host(x, t, { x: 230, y: 1150, s: 250, mood: 'neutral', look: [1, -1], hops: [0.4, 1.2, 2.0] })
    },
    cues: [['whoosh', 0, 2.4, 0.02], ['tick', 0.3, 0.04], ['tick', 0.8, 0.04], ['tick', 1.3, 0.04], ['tick', 1.8, 0.04]],
  },
  beats: [
    { dur: 4.6, head: 'Minute *by* minute.',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1320)
        scroll(x, 600, 440, 560, PLAN, { shown: 1 + Math.floor(u / 0.55) })
        S.host(x, t, { x: 210, y: 1150, s: 240, mood: 'happy', look: [1, -1], hops: [0, 1, 2, 3, 4, 5].map(i => S.t0 + i * 0.55) })
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [0, 1, 2, 3, 4, 5].map(i => ['tick', r(i * 0.55), 0.05]),
    },
    { dur: 4.4, head: 'Gemini *reviews* it.', accent: '#ffe27a',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1320)
        scroll(x, 560, 440, 560, PLAN)
        S.host(x, t, { x: 180, y: 1180, s: 210, mood: u < 2.0 ? 'neutral' : 'wide', look: [1, 0], blink: u > 2.0 && u < 2.2 ? 1 : undefined, hops: [S.t0 + 2.1] })
        S.star(x, t, 'gemini', { x: 880, y: 1150, s: 230, mood: u < 1.6 ? 'squint' : 'neutral', look: [-1, -1], hops: [S.t0 + 1.6] })
      },
      says: [{ at: 1.6, text: "…that's a lot of plan.", x: 820, y: 1010, who: 'gemini', tail: 0.3 }],
      pis: { x: 950, y: 1720, s: 115 },
      cues: [['pluck', 2.1, 392, 0.03, 0.8, -0.3]],
    },
    { dur: 4.5, head: 'The *edit.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1320)
        scroll(x, 560, 400, 640, PLAN, { strike: prog(u, 0.3, 1.4), write: prog(u, 1.6, 2.6) })
        S.host(x, t, { x: 180, y: 1180, s: 210, mood: u < 2.6 ? 'squint' : 'happy', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 1.2, S.t0 + 2.7] })
        S.star(x, t, 'gemini', { x: 880, y: 1150, s: 230, mood: u < 2.7 ? 'wide' : 'heart', look: [-1, -1], hops: [S.t0 + 2.75, S.t0 + 3.1] })
        hearts(x, t, S.t0 + 2.8, 880, 1000, { n: 5 })
        sparkles(x, t, 560, 900, S.t0 + 2.65, 10, 260, 1)
      },
      pis: { x: 950, y: 1720, s: 130, tears: 3 },
      cues: [['whoosh', 0.3, 1.1, 0.02], ['tick', 0.5, 0.05], ['tick', 0.7, 0.05], ['tick', 0.9, 0.05], ['tick', 1.1, 0.05], ['tick', 1.3, 0.05], ['bell', 2.65, 1760, 0.03, 1.2, 0], ['pluck', 2.8, 1174.66, 0.04, 0.6, 0.4]],
    },
  ],
  last: { who: 'stars', text: 'The best plan has *their* idea in it.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 420, y: 920, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, S.t0 + 2.6] })
    S.star(x, t, 'gemini', { x: 690, y: 920, s: 230, pop: ok, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 3.0] })
  },
})
function r(v) { return +v.toFixed(3) }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, pop01, BONE, GOLD, RED, INK, lerp, ease]
