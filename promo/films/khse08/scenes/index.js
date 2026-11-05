// khse08: ZODIAC HOT SEAT, "Scorpio flipped the spotlight" (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Scorpio in sunglasses mid-shove of the spotlight, the beam swung away onto the buzzer booth
//         (Pisces squints into it); the hook "Scorpio flipped *the spotlight.*" landed. 0.3 record scratch.
//   1.0–1.5 the beam swings back onto the chair.  Q1 "Check your ex's page?" → "define 'check.'"
//   Q2 "Trust easily?" → "next question."  The last question (silence; the shades come off): "Why so guarded?"
//   → "…when I'm in, I'm all in."  THE STARS: "Guarded is fine. *Open a window.*"  Hard cut.
import { makeHotSeat, shadesCells, prog, ease, lerp } from '../../khse01/scenes/hotkit.js'

const EP = makeHotSeat({
  id: 'khse08', sign: 'scorpio', name: 'Scorpio', accent: '#ff5c7a',
  hook: 'Scorpio flipped | *the spotlight.*',
  breakFx: 'scratch', breakAt: 0.3, scratch: 'interviews go *one way.* usually.',
  hero0: { x: 520, y: 1036, s: 290, mood: 'neutral', rot: -0.08, look: [1, 0.4] },
  spot: t => { const k = ease.inOutCubic(prog(t, 1.0, 1.5)); return { x: lerp(860, 540, k), tx: lerp(260, 0, k), w: 640 } },
  onHero(x, t, S) { const up = ease.inOutCubic(prog(t, S.T.fq + 0.2, S.T.fq + 0.7)); if (up < 1) shadesCells(x, up) },
  qs: [
    { q: 'Check your *ex’s page?*', a: 'define “check.”', mood: 'neutral' },
    { q: 'Trust *easily?*', a: 'next question.', mood: 'squint' },
  ],
  final: { q: 'Why so *guarded?*', a: '…when I’m in, I’m all in.', mood: 'neutral', endMood: 'happy' },
  last: 'Guarded is fine. *Open a window.*',
  ending: 'cut',
  music: { style: 'screwed', key: 'Fm', seed: 3508 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
