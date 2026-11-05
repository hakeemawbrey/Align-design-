// kgse21: GUESS THE SIGN, "The breakup told as a comedy set" (10 s vertical, star_advice trial, funk · Bb, hard cut).
//   0.00  frame 0: the silhouette mid-punchline at a mic stand, a spotlight snapping on.
//         Hook: "Turned the breakup *into a comedy set.*"
//   0.35  colour flash · the friends laugh (HA! HA!) · then a beat of quiet and one small sniff
//   C1 "an arrow pin" · C2 "a passport" · buzz · 3·2·1 · reveal: SAGITTARIUS · last line, hard cut
import { makeGuess, box, R, bubble, shadow, label, tears, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const LAUGHS = [1.2, 1.7, 2.3, 2.8]
function mic(x, cx, cy) {
  R(x, INK, cx - 5, cy, 10, 1250 - cy); R(x, '#8a86a8', cx - 2, cy + 4, 4, 1246 - cy)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, 1250, 70, 14, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.translate(cx, cy); x.rotate(-0.5); box(x, -14, -50, 28, 60, '#3a3160', { b: 5 }); x.fillStyle = INK; x.beginPath(); x.arc(0, -56, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9c4d8'; x.beginPath(); x.arc(0, -56, 18, 0, Math.PI * 2); x.fill(); x.restore()
}
function pin(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.translate(o.x - 100, o.y + 70); x.rotate(-0.6); x.scale(k, k)
  R(x, INK, -50, -5, 100, 10); R(x, GOLD, -48, -3, 96, 6)
  x.fillStyle = INK; x.beginPath(); x.moveTo(50, -18); x.lineTo(78, 0); x.lineTo(50, 18); x.closePath(); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(52, -12); x.lineTo(70, 0); x.lineTo(52, 12); x.closePath(); x.fill()
  R(x, RED, -56, -14, 14, 10); R(x, RED, -56, 4, 14, 10)
  x.restore()
}
function passport(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.12); x.scale(k, k)
  box(x, -60, -80, 120, 160, '#2a4a8a', { b: 6 }); x.fillStyle = GOLD; x.beginPath(); x.arc(0, -10, 28, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2a4a8a'; x.beginPath(); x.arc(0, -10, 22, 0, Math.PI * 2); x.fill()
  x.font = `800 16px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('PASSPORT', 0, 50)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse21', sign: 'sagittarius', D: 10, ending: 'cut', brk: 'flash', flashCol: '#ffcf6a',
  hook: 'Turned the breakup | *into a comedy set.*',
  clues: ['an arrow pin', 'a passport'],
  last: 'Funny is fine. | *Sad is fine too.*',
  bg(x, S) {
    R(x, '#3a1428', 0, 300, 1080, 960)
    for (let i = 0; i < 14; i++) R(x, i % 2 ? '#5a1e3c' : '#4a1832', i * 80, 300, 80, 960)
    R(x, INK, 0, 1250, 1080, 8); R(x, '#2a1a3a', 0, 1258, 1080, 662)
    const on = clamp(S.u / 0.15)
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,236,190,${0.2 * on})`; x.beginPath(); x.moveTo(500, 300); x.lineTo(580, 300); x.lineTo(760, 1260); x.lineTo(240, 1260); x.closePath(); x.fill(); x.restore()
  },
  draw(x, S) {
    const { t, u, rv, T } = S
    mic(x, 680, 860)
    // the audience (friends) in silhouette-free colour, front row
    ;['aries', 'gemini', 'libra', 'aquarius'].forEach((g, i) => {
      const lk = LAUGHS.some(l => u > l && u < l + 0.4)
      S.star(g, { x: [110, 240, 840, 970][i], y: 1205, s: 120, mood: u > 3.4 && u < 4.4 ? 'neutral' : 'happy', look: [0, -1], seed: 60 + i, hops: LAUGHS.map(l => l + i * 0.05) })
      void lk
    })
    LAUGHS.forEach((l, i) => { const k = pop01(t, l, 0.2, 2.6) * outK(t, [l + 0.45, l + 0.55]); if (k > 0.01) label(x, i % 2 ? 'HA! HA!' : 'HAHA', [170, 900, 220, 860][i], [1090, 1080, 1100, 1090][i], { size: 44 * k, col: GOLD, font: INTER, weight: 900, rot: [-0.2, 0.15, 0.1, -0.12][i] }) })
    const quiet = u > 3.4 && u < 4.6
    const o = { x: 480, y: 1010, s: 340, mood: rv > 0.5 ? 'sparkle' : quiet ? 'neutral' : 'happy', look: [0, 0], hops: [0.05, 1.1, 1.6, 2.2, 2.7].filter(h => h < S.R), rot: u < 0.4 ? 0.2 : quiet ? 0 : 0.08 * Math.sin(u * 5), squash: u < 0.4 ? -0.12 : 0 }
    shadow(x, 480, 1250, 280)
    S.sil(o)
    if (quiet || rv > 0.5) tears(x, t, o, 1)
    if (quiet && rv < 0.5) label(x, '*sniff*', 480, 760, { size: 40, col: BONE, font: INTER, weight: 800 })
    if (t > T.C1) pin(x, o, pop01(t, T.C1 + 0.05, 0.3, 2.4))
    if (T.C2 != null) passport(x, 900, 1080, pop01(t, T.C2 + 0.05, 0.3, 2.4))
    if (u < 3.2) bubble(x, t, 480, 720, 0.4, 3.2, 'and THEN they kept the dog—', { size: 30 })
    if (rv > 0.5) bubble(x, t, 480, 720, S.R + 0.3, S.D + 1, 'okay. it was sad. it’s okay.', { size: 30 })
  },
  cues: [['boom', 0.0, 0.12], ['tick', 0.05, 0.1], ...LAUGHS.flatMap(l => [['clap', l, { gain: 0.1 }], ['clap', +(l + 0.12).toFixed(3), { gain: 0.08, pan: 0.3 }]]), ['tick', 3.5, 0.04]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
