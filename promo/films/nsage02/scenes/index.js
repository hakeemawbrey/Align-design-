// nsage02: SAG SEASON TAKEOVER, ep 2, "The Packing List" (18 s vertical, music: chiptune · E). promo/films/next30/b10.md.
// Story 0–15.6, then the short (2.4 s) end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.3    hook "Sag packing for a | *first date.*"  Frame 0: Sag mid-shove, cramming a giant backpack.
//   2.3–5.1    "A *passport.*"  A passport flips into the pack. SAG: "just in case."
//   5.1–7.9    "A whole *tent.*"  A tent pops up out of the pack. PISCES: "it's so hopeful."
//   7.9–11.2   "The one thing | it *needs.*"  Sag tips it all out and holds up one talk card. SAG: "the only thing I
//              actually need."
//  11.2–15.6   THE STARS: "Bring *questions*, not luggage."  Pisces fountains.
import { makeTakeover, R, box, ink, floor, shadow, sparkles, cardImg, drawBits, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

// the giant backpack (centre-bottom at cx, by); bulge 0…1 grows it
function pack(x, cx, by, bulge = 0, tilt = 0) {
  const w = 360 + 60 * bulge, h = 440 + 40 * bulge
  x.save(); x.translate(cx, by); x.rotate(tilt)
  box(x, -w / 2, -h, w, h, '#5d8a4e', { b: 8, hi: '#76a862' })
  box(x, -w / 2 + 40, -h * 0.42, w - 80, h * 0.32, '#4c7640', { b: 6 })
  R(x, GOLD, -18, -h * 0.42 - 6, 36, 14)
  box(x, -w / 2 + 20, -h - 40, w - 40, 60, '#c96a3b', { b: 6, hi: '#e08850' })   // bedroll
  x.restore()
}
const PASSPORT = ['NNNNNNNN', 'NNGGGGNN', 'NGNNNNGN', 'NGNNNNGN', 'NNGGGGNN', 'NNNNNNNN', 'NGGGGGGN', 'NNNNNNNN']
function passport(x, cx, cy, s, rot) { drawBits(x, PASSPORT, { N: '#2e4fa8', G: GOLD }, cx, cy, 14 * s, { rot }) }
function tent(x, cx, by, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-230, 8); x.lineTo(0, -270); x.lineTo(230, 8); x.closePath(); x.fill()
  x.fillStyle = '#e8763a'; x.beginPath(); x.moveTo(-210, 0); x.lineTo(0, -252); x.lineTo(210, 0); x.closePath(); x.fill()
  x.fillStyle = '#ffb36b'; x.beginPath(); x.moveTo(-210, 0); x.lineTo(0, -252); x.lineTo(-60, 0); x.closePath(); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, 0); x.lineTo(0, -120); x.lineTo(50, 0); x.closePath(); x.fill()
  R(x, INK, -4, -300, 8, 50); R(x, RED, 4, -300, 40, 24)
  x.restore()
}

const EP = makeTakeover({
  id: 'nsage02', host: 'sag', duration: 20, dy: 220,
  images: ['card-talk-6.png'],
  hook: {
    text: 'Sag packing for a | *first date.*', dur: 2.3,
    draw(x, t, S) {
      floor(x, 1220)
      const sh = 10 * Math.sin(t * 22) * (t < 1.4 ? 1 : 0.3)
      shadow(x, 700, 1215, 380)
      pack(x, 700 + sh, 1215, 0.2 + 0.1 * Math.sin(t * 9))
      // stuff poking out of the top
      drawBits(x, ['SSSS', 'S..S', 'SSSS'], { S: BONE }, 640, 760, 16, { rot: -0.4 })
      passport(x, 760, 755, 0.8, 0.3)
      shadow(x, 380, 1215, 240)
      S.host(x, t, { x: 400, y: 1030, s: 290, mood: t < 1.2 ? 'squint' : 'happy', look: [1, -0.5], squash: 0.1 * Math.sin(t * 22), hops: [0.4, 0.9, 1.4] })
    },
    cues: [['tick', 0.2, 0.05], ['tick', 0.45, 0.05], ['tick', 0.7, 0.05], ['tick', 0.95, 0.05], ['whoosh', 1.2, 0.3, 0.03]],
  },
  beats: [
    { dur: 2.8, head: 'A *passport.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        shadow(x, 720, 1215, 380); pack(x, 720, 1215, 0.3)
        const p = ease.inOutCubic(prog(u, 0.3, 0.9))
        if (u < 0.95) passport(x, lerp(330, 720, p), lerp(800, 700, p) - 220 * Math.sin(Math.PI * p), 1.1, p * 6)
        sparkles(x, t, 720, 760, S.t0 + 0.95, 8, 120, 1)
        shadow(x, 330, 1215, 230)
        S.host(x, t, { x: 330, y: 1040, s: 260, mood: u > 1.0 ? 'wink' : 'happy', look: [1, -0.5], hops: [S.t0 + 0.3, S.t0 + 1.05] })
      },
      says: [{ at: 1.0, text: 'just in case.', x: 330, y: 790, who: 'host', tail: -0.1 }],
      pis: { x: 950, y: 1670, s: 115 },
      cues: [['whoosh', 0.3, 0.4, 0.03], ['pop', 0.95, 1318.51, 0.04, 0.3]],
    },
    { dur: 2.8, head: 'A whole *tent.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        shadow(x, 700, 1215, 420); pack(x, 700, 1215, 0.6)
        tent(x, 700, 820 - 60 * pop01(t, S.t0 + 0.3, 0.3, 2), pop01(t, S.t0 + 0.3, 0.35, 2.6))
        shadow(x, 280, 1215, 230)
        S.host(x, t, { x: 280, y: 1040, s: 250, mood: 'sparkle', look: [1, -1], hops: [S.t0 + 0.35, S.t0 + 0.8] })
      },
      says: [{ at: 1.0, text: "it's so hopeful.", x: 820, y: 1300, who: 'pisces', tail: 0.6 }],
      pis: { x: 950, y: 1670, s: 130, tears: 3, mood: 'sparkle' },
      cues: [['pop', 0.3, 659.25, 0.05, 0], ['whoosh', 0.3, 0.3, 0.03]],
    },
    { dur: 3.3, head: 'The one thing | it *needs.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        const tip = ease.inOutCubic(prog(u, 0.05, 0.45))
        shadow(x, 760, 1215, 380)
        pack(x, 640, 1215, 0, 1.3 * tip)
        // the pile on the floor
        if (u > 0.4) {
          const k = pop01(t, S.t0 + 0.4, 0.3, 2)
          passport(x, 640, 1190, 0.8 * k, -0.2)
          drawBits(x, ['SSSS', 'S..S', 'SSSS'], { S: BONE }, 980, 1190, 14 * k)
          box(x, 600, 1150, 120 * k, 50 * k, '#e8763a', { b: 5 })
        }
        shadow(x, 330, 1215, 230)
        S.host(x, t, { x: 330, y: 1040, s: 260, mood: u > 0.9 ? 'happy' : 'wide', look: [1, -0.3], hops: [S.t0 + 0.9, S.t0 + 1.3] })
        const ck = pop01(t, S.t0 + 0.9, 0.4, 2)
        cardImg(x, S.img['card-talk-6.png'], 560, 760, 250 * ck, 0.08 * Math.sin(t * 3))
        sparkles(x, t, 560, 760, S.t0 + 0.95, 10, 180, 2)
      },
      says: [{ at: 1.25, text: 'the only thing I actually need.', x: 400, y: 470, who: 'host', tail: -0.3, size: 34 }],
      pis: { x: 950, y: 1670, s: 130, tears: 3 },
      cues: [['whoosh', 0.05, 0.4, 0.04], ['tick', 0.42, 0.06], ['tick', 0.5, 0.05], ['tick', 0.58, 0.05], ['bell', 0.95, 1760, 0.03, 1.0, 0], ['glitter', 0.95, 1.3]],
    },
  ],
  last: { who: 'stars', text: 'Bring *questions*, not luggage.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 560, 1120, 240 * ok)
    S.host(x, t, { x: 560, y: 920, s: 280, pop: ok, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 2.6] })
    cardImg(x, S.img['card-talk-6.png'], 780, 760, 200 * ok, 0.12)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ink, clamp]
