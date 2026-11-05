// ksge01 · SPOT THE GREEN FLAG: "Aries Is Running Late" (trial reel, ≈ 10 s vertical, house · A). Format: ./greenkit.js.
//   frame 0  Take A: Aries mid-sprint through the café door (door flying open, speed lines); Take B: a notification
//            mid-drop on your phone. Slam title "SAME *ARIES.* ONE GREEN FLAG."  whip zoom at 0.15.
//   0.3–2.05 TAKE A: no text. The wall clock ticks to 7:20; Aries bursts in: "traffic was WILD."  You: eye-roll.
//   2.05–3.65 TAKE B: 6:55, a text: "so sorry!! 20 min late. order the fries on me"  You: happy, fries arrive.
//   3.65     record-scratch freeze, 3-2-1. Pisces sweats in the judge cam.
//   6.05     GREEN FLAG: Take B. THE STARS: "Late happens. *The heads-up* is the flag."  Hard cut.
import { makeGreen, R, box, pbubble, label, shadow, streaks, hearts, phone, chat, table, sparkles, pop01, outK, prog, clamp, lerp, ease, INK, BONE, GOLD, PW, FLOOR, INTER } from './greenkit.js'

function cafe(x, t, { clock = '7:00' } = {}) {
  R(x, '#3b2a55', 0, 0, PW, FLOOR); for (let i = 0; i < PW; i += 48) R(x, '#352650', i, 0, 24, FLOOR)
  // window with night outside
  box(x, 40, 120, 170, 150, '#1c1640', { b: 6 }); R(x, INK, 122, 120, 6, 150); R(x, INK, 40, 192, 170, 6)
  for (let i = 0; i < 5; i++) R(x, 'rgba(242,199,92,0.7)', 56 + i * 30, 140 + (i % 2) * 70, 6, 6)
  // the wall clock
  box(x, 300, 110, 150, 70, BONE, { b: 6 }); x.font = `700 46px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(clock, 375, 147)
  R(x, INK, 0, FLOOR - 6, PW, 10); R(x, '#4a3524', 0, FLOOR + 4, PW, 300); for (let i = 0; i < PW; i += 84) R(x, '#3e2c1e', i, FLOOR + 4, 6, 300)
}
function door(x, t, open) {
  // a door on the right wall, swinging open (0 shut … 1 flung)
  R(x, INK, 380, 300, 124, FLOOR - 300); R(x, '#1c1640', 386, 306, 118, FLOOR - 306)
  const w = 110 * (1 - 0.75 * open)
  box(x, 392, 306, w, FLOOR - 312, '#a0603a', { b: 5, hi: '#c07a4a' }); R(x, GOLD, 392 + w - 22, 450, 10, 10)
}
function fries(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 6; i++) R(x, INK, -34 + i * 12 - 2, -46 - (i % 3) * 8, 10, 50); for (let i = 0; i < 6; i++) R(x, GOLD, -34 + i * 12, -44 - (i % 3) * 8, 6, 46)
  box(x, -42, -10, 84, 44, '#e8344e', { b: 5 })
  x.restore()
}

// ── TAKE A: no text, a sprint, an excuse
function takeA(x, tk, S) {
  const { hero, you } = S
  const mins = Math.min(20, 12 + Math.floor(clamp(tk / 1.4) * 8))
  cafe(x, tk, { clock: `7:${String(mins).padStart(2, '0')}` })
  const run = ease.outCubic(prog(tk, 0, 1.0))
  door(x, tk, 1 - prog(tk, 0.9, 1.4) * 0.7)
  table(x, 170, 470, 230)
  you(x, tk, { x: 130, y: 410, s: 176, mood: tk > 1.2 ? 'eyeroll' : 'neutral', look: [1, 0] })
  // Aries: mid-sprint at frame 0, skids to the table
  const ax = lerp(430, 320, run), ay = 430 - 30 * Math.sin(Math.PI * clamp(tk / 0.5))
  shadow(x, ax, 600, 150)
  if (tk < 1.0) streaks(x, tk, ax + 60, ay, { dir: 1, n: 5, len: 80 })
  hero(x, tk, { x: ax, y: ay, s: 206, mood: tk < 1 ? 'wide' : 'happy', look: [-1, 0], squash: tk < 1 ? -0.08 : 0, hops: [1.0] })
  pbubble(x, tk, 300, 230, 1.05, 99, 'traffic was\nWILD.', { size: 34, tail: 0.1 })
  label(x, 'no text.', 130, 300, { size: 24, col: '#ff9aa6', alpha: clamp(prog(tk, 1.4, 1.6)) })
}

// ── TAKE B: the heads-up text, then the fries
function takeB(x, tk, S) {
  const { hero, you } = S
  cafe(x, tk, { clock: '6:55' })
  door(x, tk, 0)
  table(x, 220, 470, 260)
  const f = S.focus.B
  // the phone, up in your hands; the notification is mid-drop at frame 0
  const drop = ease.outBack ? ease.outBack(clamp(prog(tk, -0.2, 0.35))) : ease.outCubic(clamp(prog(tk, -0.2, 0.35)))
  you(x, tk, { x: 190, y: 410, s: 176, mood: tk > f[0] + 0.5 ? 'happy' : 'neutral', look: [1, -1], hops: [f[0] + 0.55] })
  phone(x, 360, 330, { w: 130, h: 230, rot: 0.08, glow: 1, screen: (q, w, h) => {
    R(q, '#211a3e', 0, 0, w, h)
    R(q, BONE, 6, lerp(-70, 10, drop), w - 12, 62)
    q.font = `800 13px ${INTER}`; q.fillStyle = INK; q.textAlign = 'left'; q.textBaseline = 'top'
    q.fillText('ARIES · 6:55', 12, lerp(-64, 16, drop)); q.font = `700 13px ${INTER}`; q.fillText('so sorry!! 20 min', 12, lerp(-46, 34, drop)); q.fillText('late…', 12, lerp(-30, 50, drop))
  } })
  pbubble(x, tk, 252, 150, f[0] + 0.15, 99, 'so sorry!! 20 min late.\norder the fries on me', { size: 28, col: '#c9f2d4', tail: 0.6 })
  fries(x, 210, 466, pop01(tk, f[0] + 0.9, 0.3, 2.4))
  sparkles(x, tk, 210, 430, f[0] + 0.9, 8, 70, 1)
  if (S.won > 0) {
    // after the reveal: Aries arrives anyway, waves; hearts
    const k = pop01(S.t, S.T.reveal + 0.35, 0.35, 2)
    hero(x, tk, { x: 400, y: 440, s: 160, pop: k, mood: 'happy', look: [-1, 0] })
    hearts(x, S.t, S.T.reveal + 0.5, 300, 360, { n: 5, cell: 5 })
  }
}

const EP = makeGreen({
  id: 'ksge01', sign: 'aries', name: 'Aries', win: 'B', ending: 'cut',
  hook: 'SAME *ARIES.* | ONE GREEN FLAG.',
  premise: 'They’re running *20 minutes* late.',
  takes: { A: { draw: takeA }, B: { draw: takeB } },
  last: 'Late happens. *The heads-up* is the flag.',
  cues: [
    ['whoosh', 0.05, 0.35, 0.03], ['tick', 1.0, 0.06], ['pop', 1.05, 659.25, 0.035, -0.4],
    ['pop', 2.2, 1318.51, 0.035, 0.4], ['pop', 2.27, 1760, 0.03, 0.4], ['pop', 2.95, 987.77, 0.04, 0.4], ['glitter', 2.95, 3.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, outK, GOLD, chat, BONE]
