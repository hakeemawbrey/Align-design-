// nt2e37 · NATURE DOCUMENTARY NARRATOR · "The Gemini in the Wild" (25 s vertical, Trends Vol. 2 ep 37, music: cinematic · Dm).
// The format lives in ../../nt2e36/scenes/natkit.js (eps 36–40) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "Observe the *Gemini*, | mid-conversation." ♊ mid-chatter, three speech bubbles. THE GEMINI · Gemini chattericus.
//   2.4   I · TALKS ALOFT  "It keeps three talks aloft *at once.*"  Three bubbles orbit it like juggling balls.
//   7.4   II · THE CALL  "Its mating call: *‘wait, what?’*"  "wait, WHAT?" ×3, bigger each time.
//   12.4  card cut. III · RARELY SEEN  "Rarely seen: it lands, and *listens.*"  The bubbles drop; it sits still while
//         ♐ Sagittarius talks: "…and that’s my big dream."
//   17.0  together.  17.3 THE NARRATOR: "Even the quickest wings *land.*"  Pisces cries in the hide.
import { makeNat } from '../../nt2e36/scenes/natkit.js'
import { bubble, prog, ease } from '../../nt2e21/scenes/trendkit.js'

const TALK = ['and THEN—', 'wait, back up', 'omg ok so']
const EP = makeNat({
  id: 'nt2e37', sign: 'gemini', mate: 'sagittarius', latin: 'Gemini chattericus', accent: '#f2cf4a',
  hook: 'Observe the *Gemini*, | mid-conversation.',
  hookMood: 'happy',
  hookDraw(x, t, S) { if (!S.under) TALK.forEach((s, i) => bubble(x, t, [300, 800, 560][i], [880, 840, 760][i], -1, 2.3, s, { size: 30, tail: [0.4, -0.4, 0][i] })) },
  chapters: [
    { tag: 'TALKS ALOFT', line: 'It keeps three talks aloft *at once.*',
      pose: u => ({ x: 540, mood: 'happy', look: [Math.sin(u * 4) > 0 ? 1 : -1, -0.6], hops: [3.0, 3.6, 4.2, 4.8, 5.4, 6.0] }),
      draw(x, t, S) {
        if (S.under) return
        TALK.forEach((s, i) => { const a = S.u * 2.2 + i * 2.094; bubble(x, t, 540 + Math.cos(a) * 280, 860 + Math.sin(a) * 110 - 40, S.a + 0.3 + i * 0.2, S.b, s, { size: 28 }) })
      },
      cues: [['pop', 0.3, 880, 0.03, -0.3], ['pop', 0.5, 987.77, 0.03, 0.3], ['pop', 0.7, 1174.66, 0.03, 0]] },
    { tag: 'THE CALL', line: 'Its mating call: *‘wait, what?’*',
      pose: u => ({ x: 540, mood: 'wide', look: [0, -0.4], hops: [7.4 + 1.2, 7.4 + 2.2, 7.4 + 3.2], squash: -0.04 }),
      draw(x, t, S) {
        if (S.under) return
        ;[1.2, 2.2, 3.2].forEach((d, i) => bubble(x, t, [380, 720, 540][i], [820, 760, 660][i], S.a + d, S.b, 'wait, WHAT?', { size: 30 + i * 10, tail: [0.4, -0.4, 0][i] }))
      },
      cues: [['pop', 1.2, 1174.66, 0.04, -0.3], ['pop', 2.2, 1318.51, 0.045, 0.3], ['pop', 3.2, 1567.98, 0.05, 0]] },
    { tag: 'RARELY SEEN', line: 'Rarely seen: it lands, and *listens.*',
      pose: u => ({ x: 400, mood: u < 1.4 ? 'neutral' : 'sparkle', look: [1, -0.2], squash: 0.07 }),
      draw(x, t, S) {
        if (S.under) { S.mate(x, t, { x: 730, y: 1100, s: 250, mood: 'happy', look: [-1, 0], hops: [S.a + 1.0, S.a + 1.6, S.a + 2.2] }); return }
        TALK.forEach((s, i) => { const p = ease.inQuad(prog(S.u, 0.2 + i * 0.12, 0.8 + i * 0.12)); if (p < 1) bubble(x, t, [300, 520, 420][i], 760 + p * 500, S.a - 0.5, S.b, s, { size: 28 }) })
        bubble(x, t, 700, 840, S.a + 1.0, S.b, '…and that’s my big dream.', { size: 30, tail: 0.2, col: '#c9f2d4' })
      },
      cues: [['tick', 0.75, 0.04], ['tick', 0.87, 0.04], ['tick', 0.99, 0.04], ['pop', 1.0, 880, 0.035, 0.3]] },
  ],
  last: 'Even the quickest wings *land.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
