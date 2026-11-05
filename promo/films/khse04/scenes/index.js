// khse04: ZODIAC HOT SEAT, "Cancer kept the voice note" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Cancer mid-clutch of a phone to its chest, a voice-note waveform still playing, the spotlight
//         mid-wobble; the hook "Cancer still has *the voice note.*" landed. 0.3 record scratch: "it's *from the ex.*"
//   Q1 "Screenshots folder?" → "sorted by year."  Q2 "Remember their birthday?" → "and their mum's."
//   the last question (silence): "Why keep it?" → "…so I remember I was loved."
//   THE STARS: "The love stays. *The note can go.*"  Hard cut.
import { makeHotSeat, phone, R, lerp, prog, ease, BONE, MINT } from '../../khse01/scenes/hotkit.js'

function voicePhone(x, t, cx, cy, rot, s, playing) {
  phone(x, cx, cy, rot, X => {
    X.textAlign = 'center'; X.font = "700 16px 'Space Mono', monospace"; X.fillStyle = BONE; X.fillText('VOICE NOTE', 0, -80)
    for (let i = 0; i < 9; i++) { const h = playing ? 10 + 40 * Math.abs(Math.sin(t * 8 + i * 1.1)) : 12; R(X, MINT, -48 + i * 11, 10 - h / 2, 7, h) }
    X.fillStyle = BONE; X.fillText('0:47', 0, 72)
  }, { s, glow: playing ? 0.8 : 0.3 })
}

const EP = makeHotSeat({
  id: 'khse04', sign: 'cancer', name: 'Cancer', accent: '#9fd8f6',
  hook: 'Cancer still has | *the voice note.*',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'it’s from *the ex.*',
  hero0: { x: 540, y: 1036, s: 290, mood: 'wide', rot: -0.06 },
  spot: t => ({ x: 540 + 70 * Math.sin(t * 9) * (1 - prog(t, 0, 1.2)), w: 640, tx: 120 * Math.sin(t * 5) * (1 - prog(t, 0, 1.2)) }),
  props(x, t, S, P) {
    // the phone, hugged at the chest; it rests on the arm for the questions, then is held again on the last one
    const hold = Math.max(P.k > 0 ? 1 - P.k + 0 : 0, 0)
    const back = ease.inOutCubic(prog(t, S.T.fq + 0.2, S.T.fq + 0.8))
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const a = Math.max(k, back)
    voicePhone(x, t, lerp(790, 690, a), lerp(1060, 1110, a), lerp(0.2, -0.2, a), lerp(0.55, 0.7, a), a > 0.5)
    void hold
  },
  qs: [
    { q: 'Screenshots *folder?*', a: 'sorted by year.', mood: 'happy' },
    { q: 'Remember their *birthday?*', a: 'and their mum’s.', mood: 'sparkle' },
  ],
  final: { q: 'Why *keep it?*', a: '…so I remember I was loved.', mood: 'neutral', endMood: 'happy' },
  last: 'The love stays. *The note can go.*',
  ending: 'cut',
  music: { style: 'dreamy', key: 'Ab', seed: 3504 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
