// og-khse20: social rework of khse20, ZODIAC HOT SEAT, missing your ex round: Scorpio. Kit: ./hotkit.js (og social copy).
// Static HOOK (outline) 0–2.9 instead of the slammed title; no record scratch, no series bug; Scorpio fully Scorpio.
//   0.00  Scorpio mid-snatch of its phone away from its own thumb, the contact saved as "DON'T".
//   Q1 "Miss *them?*" → "who? never heard of them."   Q2 "Be *honest.*" → "…I still know their coffee order. by heart."
//   the last question (silence): "What do you *actually* miss?" → "…being known."
//   THE STARS: "Miss the feeling. *Find it again.*"  Hard cut.
import { makeHotSeat, phone, R, prog, ease, lerp, BONE, RED, MINT } from './hotkit.js'

function dontPhone(x, t, cx, cy, rot, s) {
  phone(x, cx, cy, rot, X => {
    X.fillStyle = '#5a4a9a'; X.beginPath(); X.arc(0, -50, 26, 0, Math.PI * 2); X.fill()
    X.textAlign = 'center'; X.font = "800 26px Inter, sans-serif"; X.fillStyle = BONE; X.fillText('DON’T', 0, 6)
    R(X, MINT, -44, 40, 36, 36); R(X, RED, 8, 40, 36, 36)
  }, { s, glow: 0.8 })
}

const EP = makeHotSeat({
  id: 'og-khse20', sign: 'scorpio', name: 'Scorpio', accent: '#ff5c7a',
  hook: 'Scorpio saved the ex | as *“DON’T.”*',
  hero0: { x: 500, y: 1036, s: 290, mood: 'wide', rot: -0.1, look: [1, -0.2] },
  props(x, t, S) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const yank = ease.outBack ? 0 : 0
    dontPhone(x, t, lerp(760, 770, k) + yank + 14 * k * Math.sin(t * 30), lerp(1130, 860, k), lerp(0.6, -0.25, k), lerp(0.45, 1.15, k))
  },
  qs: [
    { q: 'Miss *them?*', a: 'who? never heard of them.', mood: 'neutral' },
    { q: 'Be *honest.*', a: '…I still know their coffee order.', mood: 'squint', size: 44 },
  ],
  final: { q: 'What do you *actually* miss?', a: '…being known.', mood: 'neutral', endMood: 'happy' },
  last: 'Miss the feeling. *Find it again.*',
  ending: 'cut',
  music: { style: 'cinematic', key: 'Dm', seed: 3520 },
})
export const { DURATION, SCENES, CUES, T, META } = EP

// social hook: static caption from frame 0 (the kit's slammed title is removed in ./hotkit.js)
export const HOOK = 'Scorpio saved the ex | as *“DON’T.”*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.9
