// og-khse21: social rework of khse21, ZODIAC HOT SEAT, flaky friend round: Sagittarius. Kit: ./hotkit.js (og social copy).
// Static HOOK (box) 0–2.9 instead of the slammed title; no series bug; hard cut on THE STARS' line (no loop-back).
//   0.00  Sag mid-send of a "can't make it!! ADVENTURE!" text flying across the stage, three friend stars drooping;
//         0.3 a notification drops: "Leo: we're *literally outside.*"
//   Q1 "Why'd you *cancel?*" → "an ADVENTURE came up!!"  Q2 "What *adventure?*" → "…the couch. it called me."
//   the last question (silence): "What would you *tell them?*" → "…I miss you. sorry. Thursday?"
//   THE STARS: "Show up *small.* It still counts."  Hard cut.
import { makeHotSeat, HK, drawStarChar, signStar, bubbleK, prog, ease, lerp } from './hotkit.js'

const NOTE = { at: 0.3, out: [2.5, 2.7], title: 'messages', body: 'Leo: we’re *literally outside.*', glyph: '♌︎', time: 'now', y: 1330 }
const FRIENDS = ['leo', 'aries', 'libra']

const EP = makeHotSeat({
  id: 'og-khse21', sign: 'sagittarius', name: 'Sagittarius', accent: '#c98bff',
  hook: 'Sag cancelled on us | for the *third time.*',
  fx: [[HK.notification, HK.notificationCues, NOTE]],
  hero0: { x: 480, y: 1036, s: 290, mood: 'squint', rot: -0.05, look: [1, -0.3] },
  frame0(x, t, S) {
    const p = (t + 0.4) / 1.6
    bubbleK(x, lerp(560, 600, Math.min(1, p)), lerp(820, 700, Math.min(1, p)), S.k, 'can’t make it!! ADVENTURE!', { size: 40, col: '#c9f2d4', tail: -0.6, maxW: 640 })   // og: stays inside x 60–960
    FRIENDS.forEach((s, i) => { const C = signStar(s); x.save(); x.globalAlpha = S.k; drawStarChar(x, 320 + (i - 1) * 80, 1160 + (i % 2) * 20, 110, t, { color: C.color, mood: 'neutral', look: [1, 1], seed: i + 4, glow: 0.5, squash: 0.08 }); x.restore() })
  },
  qs: [
    { q: 'Why’d you *cancel?*', a: 'an ADVENTURE came up!!', mood: 'sparkle' },
    { q: 'What *adventure?*', a: '…the couch. it called me.', mood: 'squint' },
  ],
  final: { q: 'What would you *tell them?*', a: '…I miss you. sorry. Thursday?', mood: 'neutral', endMood: 'happy' },
  last: 'Show up *small.* It still counts.',
  ending: 'cut',
  music: { style: 'chiptune', key: 'A', seed: 3521 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void ease; void prog

// social hook: static caption from frame 0 (the kit's slammed title is removed in ./hotkit.js)
export const HOOK = 'Sag cancelled on us | for the *third time.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.9
