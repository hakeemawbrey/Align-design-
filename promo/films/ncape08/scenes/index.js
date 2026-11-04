// ncape08: CAPRICORN SEASON TAKEOVER, ep 8, "Cap's Year in Love" (28 s vertical, music: pop · E). promo/films/next30/b10.md.
// Story 0–25.6, then the short (2.4 s) end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Cap's *year-end review:* | love edition."  Frame 0: Cap mid-click, pointer up, the title slide.
//   2.6–8.6    "Goal *one.*"  GOAL: say how I feel. → STATUS: done (once). ✓
//   8.6–14.6   "Goal *two.*"  GOAL: rest. → STATUS: working on it (a progress bar that inches, then stalls). Cap yawns.
//  14.6–21.0   "Then: a *guest* | speaker."  Sag bursts back in: "you were great, Cap."  CAP: "…noted. thank you."  Cap
//              actually smiles. Pisces fountains.
//  21.0–25.6   CAP: "Next year's goal: *more* of you."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, confetti, drawBits, HEART, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED, MINT } from '../../nsage01/scenes/takekit.js'

const SL = { cx: 600, cy: 720, w: 760, h: 460 }
function slide(x, draw) {
  const { cx, cy, w, h } = SL
  R(x, INK, cx - 8, cy + h / 2, 16, 380)
  box(x, cx - w / 2, cy - h / 2, w, h, '#f4f1ea', { b: 8 })
  R(x, '#2e5f5a', cx - w / 2, cy - h / 2, w, 60)
  x.save(); x.translate(cx, cy); draw(); x.restore()
}
function pointer(x, fx, fy, tx, ty) { x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(fx, fy); x.lineTo(tx, ty); x.stroke(); x.strokeStyle = '#c9a06a'; x.lineWidth = 5; x.stroke(); x.restore(); R(x, RED, tx - 7, ty - 7, 14, 14) }
const T_ = (s) => ink(x_, s)
let x_ = null
void T_

const EP = makeTakeover({
  id: 'ncape08', host: 'cap', duration: 30, dy: 100,
  hook: {
    text: "Cap's *year-end review:* | love edition.", dur: 2.6,
    draw(x, t, S) {
      floor(x, 1270)
      slide(x, () => { ink(x, 'REVIEW', 0, -200, { size: 30, col: BONE }); ink(x, 'A YEAR', 0, -40, { size: 64, font: 'Inter', weight: 800 }); ink(x, 'IN LOVE', 0, 50, { size: 64, font: 'Inter', weight: 800, col: '#2e5f5a' }); drawBits(x, HEART, { H: '#ff5c8a' }, 0, 150, 10) })
      S.host(x, t, { x: 200, y: 1120, s: 240, mood: 'happy', look: [1, -1], squash: -0.05, hops: [0.4, 1.6] })
      pointer(x, 290, 1060, 430, 820)
    },
    cues: [['tick', 0.05, 0.07], ['pop', 0.08, 1318.51, 0.03, 0.2]],
  },
  beats: [
    { dur: 6.0, head: 'Goal *one.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1270)
        slide(x, () => {
          ink(x, 'GOAL 1', 0, -200, { size: 30, col: BONE })
          ink(x, 'say how I feel.', 0, -80, { size: 52, font: 'Inter', weight: 800 })
          if (u > 1.6) ink(x, 'STATUS:', -150, 50, { size: 34 })
          if (u > 2.2) ink(x, 'done (once)', 110, 50, { size: 40, col: '#2a8a4a', font: 'Inter', weight: 800 })
          if (u > 3.0) { const k = pop01(t, S.t0 + 3.0, 0.3, 2.6); x.save(); x.translate(0, 150); x.scale(k, k); drawBits(x, ['.......G', '......GG', 'G....GG.', 'GG..GG..', '.GGGG...', '..GG....'], { G: '#3fb06a' }, 0, 0, 14); x.restore() }
        })
        S.host(x, t, { x: 200, y: 1120, s: 230, mood: u > 3.0 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 1.6, S.t0 + 3.0] })
        pointer(x, 290, 1060, 450, 800)
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['tick', 0.05, 0.07], ['pop', 1.6, 880, 0.04, 0.2], ['pop', 2.2, 1174.66, 0.04, 0.2], ['bell', 3.0, 1760, 0.035, 1.0, 0.2]],
    },
    { dur: 6.0, head: 'Goal *two.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1270)
        const f = Math.min(0.42, 0.42 * ease.outCubic(prog(u, 1.8, 3.4)))
        slide(x, () => {
          ink(x, 'GOAL 2', 0, -200, { size: 30, col: BONE })
          ink(x, 'rest.', 0, -80, { size: 64, font: 'Inter', weight: 800 })
          if (u > 1.4) { ink(x, 'STATUS: working on it', 0, 40, { size: 34 }); box(x, -300, 110, 600, 50, '#d9cdb5', { b: 5 }); R(x, '#5fb8ff', -300, 110, 600 * f, 50) }
        })
        S.host(x, t, { x: 200, y: 1120, s: 230, mood: u > 3.8 && u < 4.8 ? 'sleepy' : 'neutral', zzz: false, look: [1, -1], squash: u > 3.8 && u < 4.4 ? -0.1 * Math.sin((u - 3.8) * 5) : 0, hops: [S.t0 + 1.4] })
        pointer(x, 290, 1060, 450, 860)
      },
      says: [{ at: 3.9, until: 5.9, text: '*yawn*', x: 220, y: 920, who: 'host', tail: 0 }],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['tick', 0.05, 0.07], ['pop', 1.4, 880, 0.04, 0.2], ['riser', 1.8, 3.4, 0.015], ['pluck', 3.9, 392, 0.03, 1.0, -0.3]],
    },
    { dur: 6.4, head: 'Then: a *guest* | speaker.', accent: '#c58bff',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1270)
        slide(x, () => { ink(x, 'Q & A', 0, -200, { size: 30, col: BONE }); drawBits(x, HEART, { H: '#ff5c8a' }, 0, 20, 18) })
        const p = ease.outCubic(prog(u, 0.2, 0.7))
        S.star(x, t, 'sagittarius', { x: lerp(1250, 820, p), y: 1110 - 120 * Math.sin(Math.PI * p), s: 230, mood: 'happy', look: [-1, 0], squash: p < 1 ? -0.1 : 0, hops: [S.t0 + 0.75, S.t0 + 1.0, S.t0 + 1.4] })
        confetti(x, t, S.t0 + 0.7, 820, 900)
        S.host(x, t, { x: 260, y: 1120, s: 230, mood: u < 0.7 ? 'neutral' : u < 3.4 ? 'wide' : 'happy', blush: u > 3.4 ? 1 : 0, look: [1, 0], hops: [S.t0 + 3.4, S.t0 + 3.8, S.t0 + 4.6] })
        if (u > 4.6) hearts(x, t, S.t0 + 4.6, 260, 960, { n: 5, cols: ['#9fd3c7', '#ff8fb1', GOLD] })
      },
      says: [
        { at: 1.0, until: 3.5, text: 'you were great, Cap.', x: 820, y: 880, who: 'sagittarius', tail: 0 },
        { at: 3.4, text: '…noted. thank you.', x: 300, y: 900, who: 'host', tail: -0.1 },
      ],
      pis: { x: 950, y: 1690, s: 135, tears: 3 },
      cues: [['whoosh', 0.2, 0.5, 0.05], ['tom', 0.7, 120, { gain: 0.15, decay: 0.2 }], ['glitter', 0.7, 1.4], ['pluck', 4.6, 1174.66, 0.04, 0.6, -0.3], ['pluck', 4.75, 1567.98, 0.035, 0.6, -0.3]],
    },
  ],
  last: { who: 'host', text: "Next year's goal: *more* of you." },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 420, y: 920, s: 250, pop: ok, mood: 'happy', blush: 1, look: [1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    S.star(x, t, 'sagittarius', { x: 690, y: 920, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 3.0] })
    hearts(x, t, S.t0 + 1.0, 555, 720, { n: 5 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, sparkles, clamp, MINT]
