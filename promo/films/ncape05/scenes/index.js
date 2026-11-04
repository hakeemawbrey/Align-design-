// ncape05: CAPRICORN SEASON TAKEOVER, ep 5, "Cap Wraps a Gift" (20 s vertical, music: chiptune · C). promo/films/next30/b10.md.
// Story 0–15.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.3    hook "Cap wrapping | one *gift.*"  Frame 0: Cap mid-measure, a ruler against the paper.
//   2.3–5.2    "Perfect *corners.*"  A flawless box, a level on top (bubble dead centre), the clock: 40 MIN.
//   5.2–8.1    "Sag's *method:*"  Sag wraps one in three seconds: a ball of tape. 3 SEC.
//   8.1        card cut.
//   8.1–11.2   "And *inside* Cap's:"  A handwritten letter, a little tear-smudged. Pisces cries.
//  11.2–15.6   CAP: "Neat corners. *Messy* feelings."
import { makeTakeover, R, box, ink, note, floor, shadow, glow, sparkles, hearts, table, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

function present(x, cx, by, w, h, k = 1, lid = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -w / 2, -h, w, h, '#c0392b', { b: 6, hi: '#e05a4a' })
  R(x, GOLD, -12, -h, 24, h); R(x, GOLD, -w / 2, -h * 0.55, w, 20)
  x.save(); x.translate(0, -h - lid * 120); x.rotate(-lid * 0.5)
  box(x, -w / 2 - 10, -26, w + 20, 32, '#c0392b', { b: 6, hi: '#e05a4a' }); R(x, GOLD, -12, -26, 24, 32)
  for (const d of [-1, 1]) box(x, d * 34 - 26, -70, 52, 40, GOLD, { b: 5 })
  x.restore()
  x.restore()
}
function tapeBall(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c0392b'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 9; i++) { x.save(); x.rotate(i * 0.7 + 0.3); x.globalAlpha = 0.8; R(x, '#e8f4ff', -120, -12 + (i % 3) * 30 - 30, 240, 20); x.restore() }
  x.restore(); void t
}
function level(x, cx, cy) { box(x, cx - 110, cy - 22, 220, 44, '#ffd36b', { b: 5 }); box(x, cx - 40, cy - 14, 80, 28, '#bff0c8', { b: 4 }); R(x, '#5fd38a', cx - 10, cy - 10, 20, 20); R(x, INK, cx - 24, cy - 14, 3, 28); R(x, INK, cx + 21, cy - 14, 3, 28) }
function clockTag(x, cx, cy, text, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.06); box(x, -110, -40, 220, 80, BONE, { b: 6 }); ink(x, text, 0, 2, { size: 44, font: 'Inter', weight: 800, col: RED }); x.restore() }

const EP = makeTakeover({
  id: 'ncape05', host: 'cap', duration: 20, dy: 140,
  hook: {
    text: 'Cap wrapping | one *gift.*', dur: 2.3,
    draw(x, t, S) {
      floor(x, 1260); table(x, 540, 1100, 900)
      // the paper sheet + ruler sliding along it
      box(x, 380, 1040, 520, 56, '#c0392b', { b: 5 })
      const rx = lerp(500, 780, (Math.sin(t * 2.5) + 1) / 2)
      x.save(); x.translate(rx, 1030); box(x, -150, -14, 300, 28, '#ffd36b', { b: 5 }); for (let i = 0; i < 15; i++) R(x, INK, -140 + i * 20, -14, 3, i % 5 ? 9 : 16); x.restore()
      S.host(x, t, { x: 230, y: 960, s: 250, mood: 'squint', look: [1, 1], hops: [0.6, 1.6] })
    },
    cues: [['tick', 0.2, 0.04], ['tick', 0.5, 0.04], ['tick', 0.8, 0.04], ['tick', 1.1, 0.04]],
  },
  beats: [
    { dur: 2.9, head: 'Perfect *corners.*',
      draw(x, t, S) {
        floor(x, 1260); table(x, 540, 1100, 900)
        present(x, 600, 1094, 300, 220, pop01(t, S.t0 + 0.1, 0.3, 1.8))
        level(x, 600, 820)
        clockTag(x, 860, 560, '40 MIN', pop01(t, S.t0 + 1.0, 0.3, 2.4))
        S.host(x, t, { x: 230, y: 960, s: 240, mood: 'happy', look: [1, 0], hops: [S.t0 + 1.0] })
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['pop', 0.1, 880, 0.04, 0.2], ['bell', 0.6, 2093, 0.025, 0.8, 0.2], ['pop', 1.0, 1318.51, 0.04, 0.4]],
    },
    { dur: 2.9, head: "Sag's *method:*", accent: '#c58bff',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260); table(x, 540, 1100, 900)
        const spin = u < 0.9 ? u * 20 : 0
        tapeBall(x, 600, 980, pop01(t, S.t0 + 0.3, 0.3, 2), spin)
        if (u < 0.9) for (let i = 0; i < 5; i++) { const a = u * 14 + i * 1.3; R(x, '#e8f4ff', 600 + Math.cos(a) * 170 - 30, 980 + Math.sin(a) * 120 - 8, 60, 16) }
        S.star(x, t, 'sagittarius', { x: 260, y: 960, s: 230, mood: u < 0.9 ? 'squint' : 'happy', look: [1, 0], squash: u < 0.9 ? 0.08 * Math.sin(u * 40) : 0, hops: [S.t0 + 1.0, S.t0 + 1.3] })
        clockTag(x, 860, 560, '3 SEC', pop01(t, S.t0 + 1.0, 0.3, 2.4))
        S.host(x, t, { x: 920, y: 960, s: 180, mood: 'wide', look: [-1, 0], hops: [S.t0 + 1.1] })
      },
      pis: { x: 150, y: 1690, s: 115, look: [1, -0.6], noTissues: true },
      cues: [['whoosh', 0, 0.9, 0.04], ['tick', 0.1, 0.04], ['tick', 0.25, 0.04], ['tick', 0.4, 0.04], ['tick', 0.55, 0.04], ['tick', 0.7, 0.04], ['pop', 1.0, 1567.98, 0.04, 0.4]],
    },
    { dur: 3.1, head: 'And *inside* Cap’s:',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260); table(x, 540, 1100, 900)
        const lid = ease.outCubic(prog(u, 0.2, 0.6))
        present(x, 600, 1094, 300, 220, 1, lid)
        const lk = pop01(t, S.t0 + 0.6, 0.4, 1.8)
        if (lk > 0.01) {
          x.save(); x.translate(600, lerp(980, 690, lk)); x.scale(lk, lk)
          note(x, 0, 0, 420, [{ text: 'Dear you,', size: 34 }, { text: 'I am not good at', size: 30 }, { text: 'saying it, so:', size: 30 }, { text: 'thank you for this year.', size: 30 }], { col: '#fbf6ea', pin: null, rot: -0.03, font: "'EB Garamond', serif" })
          x.globalAlpha = 0.5; x.fillStyle = '#7fb8e8'; x.beginPath(); x.ellipse(110, 60, 30, 20, 0, 0, Math.PI * 2); x.fill()
          x.restore()
        }
        S.host(x, t, { x: 220, y: 960, s: 230, mood: u < 1.2 ? 'neutral' : 'sparkle', look: [1, -1], blush: u > 1.2 ? 1 : 0, hops: [S.t0 + 1.2] })
        sparkles(x, t, 600, 700, S.t0 + 0.7, 10, 240, 1)
      },
      pis: { x: 950, y: 1690, s: 135, tears: 3 },
      cues: [['pop', 0.2, 1174.66, 0.04, 0.2], ['whoosh', 0.6, 0.4, 0.03], ['bell', 0.8, 1760, 0.03, 1.2, 0.2]],
    },
  ],
  last: { who: 'host', text: 'Neat corners. *Messy* feelings.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 460, 1120, 240 * ok)
    S.host(x, t, { x: 460, y: 920, s: 270, pop: ok, mood: 'happy', look: [0, 0], blush: 1, hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    present(x, 760, 1110, 180, 130, ok)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, hearts, clamp]
