// og-khse16: OG social cut of khse16. Static HOOK (outline) "Cancer gives advice. | *Takes none.*" from frame 0 instead of
//   the slam title; no ZODIAC HOT SEAT bug, no pattern break, no flash, ends on THE STARS' last line (hard cut);
//   crazier answers. Kit: ./hotkit.js (social copy of ../../khse01/scenes/hotkit.js). Original notes:
// advice giver round: Cancer (trial reel). Kit: ../../khse01/scenes/hotkit.js.
//   0.00  frame 0: Cancer mid-juggle of three ringing phones, every friend calling for advice; the hook "Cancer gives
//         advice. *Takes none.*" landed. 0.3 a notification drops: "can you call? I need *advice*".
//   Q1 "Best advice you gave this week?" → "'you deserve better.'"  Q2 "Gave it to?" → "three people."
//   the last question (silence): "Would you take it yourself?" → "…ouch."
//   THE STARS: "Take your *own* advice for once."  Hard cut.
import { makeHotSeat, HK, phone, R, prog, ease, lerp, BONE, MINT } from './hotkit.js'

const NOTE = { at: 0.3, out: [2.25, 2.45], title: 'messages · 3 new', body: '“can you call? I need *advice*”', glyph: '♋︎', time: 'now', y: 1330 }
function ringing(x, t, cx, cy, rot, k, i) {
  const j = Math.sin(t * 40 + i) * 6
  x.save(); x.globalAlpha = k
  phone(x, cx + j, cy, rot + 0.05 * Math.sin(t * 30 + i), X => { X.fillStyle = MINT; X.beginPath(); X.arc(0, 0, 26, 0, Math.PI * 2); X.fill(); R(X, BONE, -30, 50, 60, 10) }, { s: 0.55, glow: 0.4 })
  x.restore()
}

const EP = makeHotSeat({
  id: 'khse16', sign: 'cancer', name: 'Cancer', accent: '#9fd8f6',
  hook: 'Cancer gives advice. | *Takes none.*',
  breakFx: 'none', fx: [[HK.notification, HK.notificationCues, NOTE]],
  hero0: { x: 540, y: 1036, s: 290, mood: 'wide', rot: 0.05 },
  frame0(x, t, S) {
    const a = t * 5
    for (let i = 0; i < 3; i++) { const ang = a + i * 2.1; ringing(x, t, 540 + Math.cos(ang) * 230, 830 + Math.sin(ang) * 70, Math.cos(ang) * 0.5, S.k, i) }
  },
  qs: [
    { q: 'Best advice you gave *this week?*', a: '“you deserve better.”', mood: 'happy' },
    { q: 'Gave it *to?*', a: 'nine people. and a pigeon.', mood: 'sparkle' },
  ],
  final: { q: 'Would you *take it yourself?*', a: '…ouch.', mood: 'squint', endMood: 'happy', size: 60 },
  last: 'Take your *own* advice for once.',
  ending: 'cut',
  music: { style: 'pop', key: 'Eb', seed: 3516 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [lerp, ease, prog]

export const HOOK = 'Cancer gives advice. | *Takes none.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
