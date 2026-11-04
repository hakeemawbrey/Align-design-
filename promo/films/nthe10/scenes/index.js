// nthe10: THE THREAD, episode 10, "Scorpio Is Typing…" (25 s vertical, promo/films/next30/b05.md row 10, music: synthwave · F#m).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Scorpio has been *typing* for 20 minutes."  "Scorpio is typing…" under the chat; Scorpio hunched over.
//   2.2   Leo pins the moment. Typing… stops… typing… "nvm".
//   6.9   card cut: "my date asked what I'm feeling and I froze. I'm slow to open up."  Virgo: send that exact sentence.
//   12.0  Scorpio sends it: "thank you for telling me. no rush."  Pisces' voice note.  16.6 last line.
import { makeThread, shot } from '../../nthe01/chatkit.js'

const SCO = '#e23d66'
const EP = makeThread({
  id: 'nthe10', duration: 25, chat: "ARIES'S CHAT!!", cut: 6.9,
  heads: [
    { at: -1, text: 'Scorpio has been *typing* | for 20 minutes.', accent: SCO },
    { at: 3.2, text: 'On. Off. *On.*' },
    { at: 7.0, text: 'Scorpio *says it.*', accent: SCO },
    { at: 10.3, text: 'Virgo: *send that.*' },
  ],
  last: { at: 16.6, text: '"I\'m slow to open up" | *is* opening up.' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }], [2.6, { from: 'leo', text: 'Scorpio is typing (historic)' }]],
  msgs: [
    { at: -1, from: 'libra', text: 'anyone up?' },
    { at: -0.6, from: 'gemini', text: "SCORPIO'S TYPING" },
    { at: 2.2, from: 'leo', text: 'pinning this moment' },
    { at: 2.6, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 4.7, from: 'scorpio', text: 'nvm', react: [[5.1, 'ha', 9]] },
    { at: 7.1, from: 'scorpio', text: 'my date asked what I\'m feeling and *I froze.*', big: true },
    { at: 8.4, from: 'scorpio', text: "I'm slow to open up." },
    { at: 10.3, from: 'virgo', text: 'you just said it. send them *that exact sentence.*', big: true },
    { at: 12.0, kind: 'image', from: 'scorpio', w: 620, h: 290, draw: shot([
      { side: 'R', text: "I'm slow to open up. but I like you.", at: 12.2 },
      { side: 'L', text: 'thank you for telling me. no rush.', at: 13.2 },
    ], { title: 'my date', col: '#a8304e' }) },
    { at: 14.5, from: 'scorpio', text: 'ok. that felt *good.*', react: [[14.9, 'heart', 11]] },
    { at: 15.4, kind: 'voice', from: 'pisces', dur: '1:03', note: '(sobbing: SCORPIO SHARED)' },
  ],
  typing: [{ from: 'scorpio', a: -1, b: 2.0 }, { from: 'scorpio', a: 3.3, b: 4.6 }, { from: 'scorpio', a: 5.4, b: 6.95 }, { from: 'virgo', a: 9.3, b: 10.25 }],
  stage: [
    { at: -1, sign: 'scorpio', mood: 'squint', look: [1, 1] },
    { at: 2.2, sign: 'leo', mood: 'sparkle', look: [0, 0] },
    { at: 3.3, sign: 'scorpio', mood: 'squint', look: [1, 1] },
    { at: 4.7, sign: 'scorpio', mood: 'eyeroll' },
    { at: 7.1, sign: 'scorpio', mood: 'wide', look: [0, 0] },
    { at: 10.3, sign: 'virgo', mood: 'happy' },
    { at: 12.0, sign: 'scorpio', mood: 'neutral', look: [1, 1] },
    { at: 13.2, sign: 'scorpio', mood: 'sparkle', look: [0, 0] },
  ],
  cry: [[-1, 1], [13.2, 2], [15.4, 3]],
  pisMood: [[-1, 'wide'], [7.1, 'sparkle'], [13.2, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
