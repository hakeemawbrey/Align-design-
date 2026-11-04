// ncape06: CAPRICORN SEASON TAKEOVER, ep 6, "Cap Says One Yes" (25 s vertical, music: funk · Bm). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Cap got invited to | *four* parties."  Frame 0: Cap mid-juggle of four invitations.
//   2.6–7.1    "Gemini's *advice:*"  GEMINI (zipping in circles): "come to all of them!"
//   7.1–11.6   "Cap's *answer:*"  CAP: "I can do one, and be fully there."  Three invites go into a neat stack; one stays.
//  11.6        card cut.
//  11.6–16.1   "*One* party."  Cap arrives at 7:00 on the dot, gift in hand, phone in its bag, listening to Leo.
//              LEO: "you actually came!!"  Pisces cries at the effort.
//  16.1–20.6   CAP: "One yes. *All* of me."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, door, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const COLS = ['#ff8fb1', '#5fb8ff', GOLD, '#9fe6b0']
function invite(x, cx, cy, rot, col, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -70, -46, 140, 92, '#fff1c8', { b: 5 }); R(x, col, -70, -46, 140, 18); ink(x, 'PARTY!', 0, 6, { size: 24 }); x.restore() }
function gift(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -50, -40, 100, 80, '#2e5f5a', { b: 5 }); R(x, GOLD, -8, -40, 16, 80); R(x, GOLD, -50, -6, 100, 14); x.restore() }
function wallClock(x, cx, cy) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 64, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 56, 0, Math.PI * 2); x.fill(); R(x, INK, cx - 3, cy - 44, 6, 44); x.save(); x.translate(cx, cy); x.rotate(Math.PI * 7 / 6); R(x, INK, -4, -32, 8, 32); x.restore(); ink(x, '7:00', cx, cy + 92, { size: 26, col: BONE }) }

const EP = makeTakeover({
  id: 'ncape06', host: 'cap', duration: 25, dy: 120,
  hook: {
    text: 'Cap got invited to | *four* parties.', dur: 2.6,
    draw(x, t, S) {
      floor(x, 1260)
      S.host(x, t, { x: 540, y: 1060, s: 270, mood: 'wide', look: [0, -1], hops: [0.3, 0.8, 1.3, 1.8, 2.3] })
      for (let i = 0; i < 4; i++) { const a = t * 3.2 + i * Math.PI / 2; invite(x, 540 + Math.cos(a) * 230, 760 + Math.sin(a) * 90 - 60 * Math.abs(Math.sin(a)), a * 0.5, COLS[i], 0.9) }
    },
    cues: [['whoosh', 0, 0.5, 0.03], ['tick', 0.3, 0.04], ['tick', 0.8, 0.04], ['tick', 1.3, 0.04], ['tick', 1.8, 0.04]],
  },
  beats: [
    { dur: 4.5, head: "Gemini's *advice:*", accent: '#ffe27a',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        for (let i = 0; i < 4; i++) invite(x, 160 + i * 250, 620, -0.1 + i * 0.07, COLS[i], 0.8)
        S.host(x, t, { x: 260, y: 1080, s: 230, mood: 'neutral', look: [1, 0] })
        // Gemini zips in circles (afterimages)
        for (let k = 3; k >= 0; k--) { const tt = t - k * 0.06, a = tt * 5; S.star(x, tt, 'gemini', { x: 740 + Math.cos(a) * 130, y: 1000 + Math.sin(a) * 60, s: 210, mood: 'sparkle', alpha: k ? 0.25 : 1, look: [-1, 0] }) }
      },
      says: [{ at: 0.4, text: 'come to all of them!', x: 740, y: 800, who: 'gemini', tail: 0 }],
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['whoosh', 0.2, 1.2, 0.03], ['whoosh', 1.6, 1.2, 0.03], ['whoosh', 3.0, 1.2, 0.03]],
    },
    { dur: 4.5, head: "Cap's *answer:*",
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        const st = ease.inOutCubic(prog(u, 2.2, 2.9))
        for (let i = 0; i < 3; i++) invite(x, lerp(160 + i * 250, 220, st), lerp(620, 1150 - i * 14, st), lerp(-0.1 + i * 0.07, 0, st), COLS[i], 0.8)
        invite(x, lerp(910, 680, st), lerp(620, 700, st), lerp(0.11, 0, st), COLS[3], lerp(0.8, 1.2, st))
        sparkles(x, t, 680, 700, S.t0 + 2.95, 10, 180, 1)
        S.host(x, t, { x: 430, y: 1080, s: 240, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 2.9] })
      },
      says: [{ at: 0.35, until: 2.3, text: 'I can do one, and be fully there.', x: 460, y: 860, who: 'host', tail: -0.1 }],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['whoosh', 2.2, 0.6, 0.03], ['tick', 2.8, 0.05], ['tick', 2.85, 0.05], ['tick', 2.9, 0.05], ['bell', 2.95, 1760, 0.03, 1.0, 0.2]],
    },
    { dur: 4.5, head: '*One* party.',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260, '#3a2458', '#4a2f6a')
        wallClock(x, 880, 520)
        door(x, 200, 1260, 1, '#a8603a', 220, 420)
        const p = ease.outCubic(prog(u, 0, 0.6))
        S.host(x, t, { x: lerp(200, 360, p), y: 1090, s: 220, mood: u < 1.6 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.6, S.t0 + 2.6, S.t0 + 3.2] })
        gift(x, lerp(270, 450, p), 1150, 0.9)
        S.star(x, t, 'leo', { x: 740, y: 1080, s: 240, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.7, S.t0 + 1.1, S.t0 + 1.5, S.t0 + 2.8] })
        hearts(x, t, S.t0 + 1.2, 560, 920, { n: 6 })
      },
      says: [{ at: 0.7, text: 'you actually came!!', x: 740, y: 860, who: 'leo', tail: 0 }],
      pis: { x: 950, y: 1690, s: 135, tears: 3 },
      cues: [['whoosh', 0, 0.5, 0.03], ['bell', 0.5, 1318.51, 0.03, 1.0, 0.3], ['pop', 0.7, 1567.98, 0.05, 0.3]],
    },
  ],
  last: { who: 'host', text: 'One yes. *All* of me.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 520, 1120, 240 * ok)
    S.host(x, t, { x: 520, y: 920, s: 280, pop: ok, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    invite(x, 770, 740, 0.12, COLS[3], 0.9 * ok)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, RED, clamp, pop01]
