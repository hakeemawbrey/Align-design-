// nsage06: SAG SEASON TAKEOVER, ep 6, "Sag Texts Back" (20 s vertical, music: chiptune · B). promo/films/next30/b10.md.
// Story 0–15.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.3    hook "Sag answers a text | in *two seconds.*"  Frame 0: Sag mid-dive onto a buzzing phone.
//   2.3–5.1    "Scorpio sends | *one* careful text."  The thread: one long, careful message. Scorpio waits, biting its lip.
//   5.1–8.0    "Sag's reply:"  "yes!!"  …  SCORPIO: "…to which part?"
//   8.0        card cut.
//   8.0–11.2   "*All* of it."  "all of it. thursday?"  Scorpio melts; Pisces cries at the screen.
//  11.2–15.6   THE STARS: "Clear and *quick* is romantic."
import { makeTakeover, R, box, floor, shadow, sparkles, hearts, phone, prog, lerp, clamp, ease, pop01, INK, GOLD } from '../../nsage01/scenes/takekit.js'

const B1 = 2.3, B2 = 5.1, B3 = 8.0
const MSGS = [
  { at: B1 + 0.35, side: 'L', text: "hey. I really liked last night, and I'd love to see you again. only if you want to. no pressure." },
  { at: B2 + 0.25, side: 'R', text: 'yes!!' },
  { at: B2 + 1.35, side: 'L', text: '…to which part?' },
  { at: B3 + 0.25, side: 'R', text: 'all of it. thursday?' },
]
const PH = { cx: 540, top: 430, w: 620, h: 760, title: '♏︎ Scorpio', msgs: MSGS, size: 32 }
function thread(x, t, typing = null) { phone(x, t, { ...PH, typing }) }

const EP = makeTakeover({
  id: 'nsage06', host: 'sag', duration: 20, dy: 0,
  hook: {
    text: 'Sag answers a text | in *two seconds.*', dur: 2.3,
    draw(x, t, S) {
      floor(x, 1380)
      // the phone on the floor, buzzing
      const bz = Math.sin(t * 60) * 6 * (t < 1.2 ? 1 : 0)
      x.save(); x.translate(720 + bz, 1330); x.rotate(-0.08)
      box(x, -110, -40, 220, 60, '#2a2148', { b: 6 }); R(x, '#5fb8ff', -90, -30, 180, 40)
      x.restore()
      for (let i = 0; i < 3; i++) { const p = (t * 2 + i / 3) % 1; x.save(); x.globalAlpha = 1 - p; R(x, GOLD, 860 + p * 60, 1250 - i * 30, 30, 8); R(x, GOLD, 560 - p * 60, 1250 - i * 30, 30, 8); x.restore() }
      // Sag mid-dive
      const p = ease.outCubic(clamp(prog(t, 0, 1.1)))
      const hx = lerp(240, 600, p), hy = lerp(900, 1220, p) - 160 * Math.sin(Math.PI * p)
      shadow(x, hx, 1375, 240)
      x.save(); x.translate(hx, hy); x.rotate(lerp(-0.5, 0.15, p)); x.translate(-hx, -hy)
      S.host(x, t, { x: hx, y: hy, s: 300, mood: 'wide', look: [1, 1], squash: p < 1 ? -0.14 : 0.1, hops: [1.15] })
      x.restore()
    },
    cues: [['tick', 0.05, 0.05], ['tick', 0.15, 0.05], ['tick', 0.25, 0.05], ['whoosh', 0, 0.9, 0.05], ['tom', 1.12, 120, { gain: 0.16, decay: 0.2 }]],
  },
  beats: [
    { dur: 2.8, head: 'Scorpio sends | *one* careful text.', accent: '#e05a7a', top: 150,
      draw(x, t, S) {
        thread(x, t)
        S.star(x, t, 'scorpio', { x: 900, y: 1420, s: 200, mood: 'neutral', look: [-1, -1], hops: [S.t0 + 0.4] })
      },
      pis: { x: 140, y: 1680, s: 110, look: [1, -1] },
      cues: [['pop', 0.35, 659.25, 0.05, 0]],
    },
    { dur: 2.9, head: "Sag's *reply:*", top: 150,
      draw(x, t, S) {
        const { u } = S
        thread(x, t)
        S.host(x, t, { x: 180, y: 1420, s: 200, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.25, S.t0 + 0.5] })
        S.star(x, t, 'scorpio', { x: 900, y: 1420, s: 200, mood: u < 1.2 ? 'wide' : 'squint', look: [-1, -1], hops: [S.t0 + 1.35] })
      },
      pis: false,
      cues: [['pop', 0.25, 1567.98, 0.05, 0.3], ['pop', 1.35, 659.25, 0.05, -0.2]],
    },
    { dur: 3.2, head: '*All* of it.', top: 150,
      draw(x, t, S) {
        const { u } = S
        thread(x, t)
        S.host(x, t, { x: 180, y: 1420, s: 200, mood: 'sparkle', look: [1, -1], hops: [S.t0 + 0.25] })
        const melt = ease.inOutCubic(prog(u, 0.9, 1.6))
        S.star(x, t, 'scorpio', { x: 900, y: 1420 + 30 * melt, s: 200, mood: u < 0.9 ? 'wide' : 'heart', look: [-1, -1], squash: 0.22 * melt, hops: [S.t0 + 0.9] })
        hearts(x, t, S.t0 + 1.0, 900, 1280, { n: 6 })
      },
      pis: { x: 540, y: 1430, s: 170, tears: 3, mood: 'sparkle', look: [0, -1] },
      cues: [['pop', 0.25, 1567.98, 0.05, 0.3], ['pluck', 0.95, 1174.66, 0.04, 0.5, 0.4], ['pluck', 1.1, 1567.98, 0.04, 0.5, 0.4]],
    },
  ],
  last: { who: 'stars', text: 'Clear and *quick* is romantic.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 410, y: 920, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, S.t0 + 2.6] })
    S.star(x, t, 'scorpio', { x: 690, y: 920, s: 240, pop: ok, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 3.0] })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, pop01, INK]
