// k3se21: 3-SECOND ADVICE · "Meet My Parents" (6.6 s vertical trial reel, music: house · D). Format: k3se01/threekit.js.
//   0.00  frame 0: at a café table ♎ the date asks "come meet my parents?" and ♐ Sagittarius is mid-leap out of the
//         chair, dust flying.  Hook: "'Meet my parents?' | *RUN?*"  Pisces sniffles in the corner.
//   0.50  record scratch: freeze mid-air.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Scared isn't a no. | *Say how you feel.*"  Sag floats back down into the chair, breathes
//         ("in…" "out…") and says: "I’m nervous… but yes. I’d love to."  The date beams. Hard cut at 6.6.
import { makeThree, R, box, bubble, label, shadow, puff, hearts, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } from '../../k3se01/threekit.js'

function cafe(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  // table
  box(x, 380, 1000, 320, 26, '#a07850', { b: 6 }); R(x, INK, 528, 1026, 24, 124); box(x, 470, 1140, 140, 12, INK, { b: 0 })
  // two cups
  for (const cx of [450, 630]) { box(x, cx - 26, 950, 52, 50, BONE, { b: 5 }); R(x, INK, cx + 26, 962, 14, 6); R(x, INK, cx + 34, 962, 6, 26) }
  // chairs
  for (const cx of [230, 850]) { box(x, cx - 70, 1040, 140, 20, '#6e4b33', { b: 5 }); R(x, INK, cx - 60, 1060, 14, 90); R(x, INK, cx + 46, 1060, 14, 90) }
  box(x, 150, 850, 20, 200, '#6e4b33', { b: 5 }); box(x, 910, 850, 20, 200, '#6e4b33', { b: 5 })
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  cafe(x)
  const beam = phase === 'fix' && u > 3.0
  star(x, t, 'libra', { x: 850, y: 920, s: 230, mood: beam ? 'heart' : 'neutral', look: [-1, -0.2], seed: 18, hops: beam ? [2.45 + 3.0] : null })
  if (phase === 'hook') {
    bubble(x, t, 780, 700, 0, 0, 'come meet my parents?', { size: 36, k: 1, tail: 0.3 })
    const p = (t + 0.4) / 1.0
    puff(x, 230, 1080, 90, 0.9); puff(x, 140, 1110, 60, 0.7)
    hero(x, t, { x: 230 - 40 * p, y: 900 - 260 * Math.sin(Math.PI * Math.min(1, p * 0.8)), s: 260, mood: 'wide', look: [1, -0.3], squash: -0.15 })
    label(x, '!!!', 230, 520, { size: 64, col: GOLD, font: INTER, weight: 800 })
    return
  }
  const land = ease.inOutCubic(clamp(u / 0.6))
  const y0 = 900 - 260 * Math.sin(Math.PI * Math.min(1, 0.9 * 0.8))
  shadow(x, 230, 1150, 220)
  hero(x, t, { x: lerp(194, 230, land), y: lerp(y0, 940, land), s: 260, mood: u < 0.6 ? 'wide' : u > 2.0 ? 'happy' : 'squint', look: [1, -0.1], hops: [2.45 + 0.6, 2.45 + 2.0] })
  if (u > 0.8 && u < 2.0) { const inn = Math.floor((u - 0.8) / 0.6) % 2 === 0; label(x, inn ? 'in…' : 'out…', 230, 720, { size: 46, col: BONE, font: INTER, weight: 800 }) }
  bubble(x, t, 440, 640, 2.45 + 2.0, 99, 'I’m nervous… but yes. I’d love to.', { size: 34, tail: -0.5 })
  if (beam) { hearts(x, t, 2.45 + 3.0, 850, 780, { n: 6, cell: 7 }); sparkles(x, t, 540, 900, 2.45 + 3.0, 10, 260, 1) }
}

const EP = makeThree({
  id: 'k3se21', sign: 'sagittarius', dur: 6.6, brk: 'freeze', ending: 'cut', focus: [300, 760],
  hook: "'Meet my parents?' | *RUN?*", accent: '#c9a6ff', hookSize: 96,
  advice: "Scared isn't a no. | *Say how you feel.*",
  scene,
  cues: [
    ['whoosh', 0.0, 0.4, 0.04], ['tom', 0.02, 160, { gain: 0.12, decay: 0.12 }],
    ['whoosh', 2.5, 0.5, 0.03], ['tom', 3.05, 90, { gain: 0.16, decay: 0.2 }], ['tick', 3.06, 0.06],
    ['pluck', 3.3, 587.33, 0.025, 0, 0.6], ['pluck', 3.9, 523.25, 0.025, 0, 0.6],
    ['pop', 4.45, 1174.66, 0.04, -0.3], ['pop', 5.45, 1318.51, 0.045, 0.4], ['pop', 5.55, 1760, 0.04, 0.4], ['glitter', 5.45, 5.95],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
