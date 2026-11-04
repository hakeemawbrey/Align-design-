// ndbe01: DEALBREAKER OR NOT? E1, "They turn every walk | into a *race.*" (13 s vertical trial reel, music: pop · C).
// Story 0–10.6, then the shared end card. The format lives in ./dealkit.js (the other 23 episodes import it from here).
//   0.0–3.9   frame 0: ♈ Aries mid-sprint down a snowy path, scarf flying, a finish line ahead. ♎ Libra strolls behind
//             with two cocoas. 1.75: Aries snaps the ribbon: "WON!" + confetti. 2.45: Libra: "…we were going for a walk."
//   3.9       flash → the vote. 6.1 THE STARS stamp: NOT A DEALBREAKER.
//   finale    side by side, slow: Libra hands Aries a cocoa; Aries matches Libra's pace (tiny steps); hearts.
//             THE STARS: "Race to the corner. *Stroll* the rest."
import { makeDeal, R, box, bubble, label, shadow, sparkles, confetti, hearts, snowfall, snowGround, starFrame, inSprite, scarfCells, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, T } from './dealkit.js'

const ARIES = '#ff6b5a'

// a cocoa mug with steam, centred at (cx, cy)
export function mug(x, t, cx, cy, s = 1, col = '#e8f0ff') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -22, -26, 44, 50, col, { b: 5 }); R(x, '#7a4a2c', -18, -22, 36, 8)
  R(x, INK, 22, -14, 16, 26); R(x, col, 22, -8, 10, 14)
  x.globalAlpha *= 0.55
  for (let i = 0; i < 2; i++) { const p = ((t * 0.9 + i * 0.5) % 1); R(x, '#f4f0ff', -10 + i * 14 + 5 * Math.sin(t * 4 + i), -40 - p * 40, 7, 14) }
  x.restore()
}

function finishLine(x, t, snap) {
  for (const px of [860, 1040]) { R(x, INK, px - 9, 900, 18, 252); R(x, BONE, px - 4, 904, 8, 246); for (let j = 0; j < 6; j++) R(x, RED, px - 4, 912 + j * 40, 8, 18) }
  if (snap < 0.01) { R(x, INK, 860, 968, 180, 14); R(x, GOLD, 860, 972, 180, 6) }
  else {
    const d = ease.outCubic(snap)
    x.save(); x.translate(860, 975); x.rotate(1.2 * d); R(x, INK, 0, -7, 90 - 30 * d, 14); R(x, GOLD, 0, -3, 90 - 30 * d, 6); x.restore()
    x.save(); x.translate(1040, 975); x.rotate(-1.2 * d); R(x, INK, -(90 - 30 * d), -7, 90 - 30 * d, 14); R(x, GOLD, -(90 - 30 * d), -3, 90 - 30 * d, 6); x.restore()
  }
}

const SNAP = 1.75, SAY = 2.45
const EP = makeDeal({
  id: 'ndbe01', sign: 'aries', date: 'libra', verdict: 'not', accent: ARIES,
  hook: 'They turn every walk | into a *race.*',
  last: 'Race to the corner. *Stroll* the rest.',
  scene(x, t, S) {
    const { u, hero, date } = S
    snowGround(x, 1150)
    snowfall(x, t, { top: 420, bottom: 1150 })
    finishLine(x, t, prog(u, SNAP, SNAP + 0.3))
    // Aries: already mid-sprint at frame 0, reaches the line at SNAP, then bounces in place
    const run = ease.outQuad(prog(u, -0.6, SNAP))
    const ax = lerp(150, 900, run)
    const running = u < SNAP
    const hops = running ? Array.from({ length: 9 }, (_, i) => -0.2 + i * 0.24) : [SNAP + 0.05, SNAP + 0.55, SNAP + 1.0]
    if (running) for (let i = 0; i < 4; i++) R(x, 'rgba(239,230,214,0.5)', ax - 190 - i * 26, 900 + i * 34, 90 - i * 12, 8)
    shadow(x, ax, 1150, 190)
    const o = { x: ax, y: 950, s: 280, mood: running ? 'squint' : 'sparkle', look: [1, 0], hops }
    x.save(); if (running) { x.translate(ax, 1100); x.rotate(0.12); x.translate(-ax, -1100) }
    hero(x, t, o)
    const F = starFrame(o.x, o.y, o.s, t, { seed: 3, hops })
    inSprite(x, F, () => scarfCells(x, t, '#ffd23a', RED, running ? 1 : 0.2))
    x.restore()
    confetti(x, t, SNAP, 900, 820)
    bubble(x, t, 830, 700, SNAP + 0.05, 3.85, 'WON!', { size: 52, col: GOLD, tail: 0.3 })
    // Libra: strolling, two cocoas
    const lx = lerp(-60, 420, ease.inOutQuad(prog(u, 0.2, 3.4)))
    shadow(x, lx, 1150, 170)
    date(x, t, { x: lx, y: 980, s: 240, mood: u > SAY ? 'eyeroll' : 'happy', look: [1, 0], hops: [0.6, 1.4, 2.2, 3.0] })
    mug(x, t, lx - 108, 1050, 1.2); mug(x, t, lx + 108, 1050, 1.2)
    bubble(x, t, Math.max(330, lx + 30), 740, SAY, 3.85, '…we were going for a walk.', { size: 32, tail: -0.2 })
  },
  sceneCues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.05 + i * 0.24).toFixed(2), 0.035]),
    ['whoosh', 0.1, 0.5, 0.03],
    ['pop', SNAP, 1318.51, 0.05, 0.3], ['pop', SNAP + 0.06, 1760, 0.04, 0.3], ['glitter', SNAP, SNAP + 0.5], ['bell', SNAP + 0.04, 2349.32, 0.025, 0.8, 0.3],
    ['pop', SAY, 659.25, 0.04, -0.3], ['pluck', SAY + 0.5, 523.25, 0.03, 0.5, -0.2],
  ],
  pis: { x: 960, y: 1330, s: 110 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    snowGround(x, 1150)
    snowfall(x, t, { top: 620, bottom: 1150, n: 30 })
    if (k <= 0.01) return
    const drift = 30 * Math.sin(u * 0.8)
    shadow(x, 390 + drift, 1150, 200 * k); shadow(x, 680 + drift, 1150, 190 * k)
    const pass = 1.2
    const aHops = [0.6, 1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4].map(v => v + T.stamp)
    const ao = { x: 390 + drift, y: 960, s: 250, pop: k, mood: u > pass ? 'happy' : 'neutral', look: [1, 0], hops: aHops }
    hero(x, t, ao)
    const F = starFrame(ao.x, ao.y, ao.s, t, { seed: 3, pop: k, hops: aHops })
    inSprite(x, F, () => scarfCells(x, t, '#ffd23a', RED, 0.15))
    date(x, t, { x: 680 + drift, y: 975, s: 235, pop: k, mood: 'happy', look: [-1, 0], hops: [T.stamp + 1.2, T.stamp + 2.4] })
    // the cocoa hand-off
    const hand = ease.inOutCubic(prog(u, 0.9, pass))
    mug(x, t, lerp(570, 500, hand) + drift, 1060, 1.2 * k)
    mug(x, t, 790 + drift, 1060, 1.2 * k)
        hearts(x, t, T.stamp + pass + 0.1, 525 + drift, 860, { n: 5 })
    void sparkles
  },
  finaleCues: [['pluck', 1.2, 1174.66, 0.04, 0.5, 0], ['pluck', 1.32, 1567.98, 0.035, 0.5, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [pop01]
