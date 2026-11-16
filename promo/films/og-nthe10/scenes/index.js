// og-nthe10: social rework of nthe10 (The Thread, "Scorpio Is Typing…"). Static HOOK (outline) 0–3.1 replaces the
// animated frame-0 headline; no series bug, no end card, no fade-out; crazier lines. The look lives in ../chatkit.js
// (a copy of og-nthe01's social kit).
//   0.0   frame 0: "Scorpio is typing…" under the chat; Scorpio hunched over; the hook on top.
//   2.2   Leo pins the moment. Typing… stops… typing… "nvm".
//   6.9   beat change: "my date asked what I'm feeling and I froze."  Virgo: send that exact sentence.
//   12.0  Scorpio sends it: "thank you for telling me. no rush."  Pisces' voice note.  16.6 last line.
import { makeThread, shot } from '../chatkit.js'

const SCO = '#e23d66'
const EP = makeThread({
  id: 'og-nthe10', duration: 25, chat: "ARIES'S CHAT!!", cut: 6.9,
  heads: [
    { at: 3.2, text: 'On. Off. *On.*' },
    { at: 7.0, text: 'Scorpio *says it.*', accent: SCO },
    { at: 10.3, text: 'Virgo: *send that.*' },
  ],
  last: { at: 16.6, text: '"I\'m slow to open up" | *is* opening up.' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }], [2.6, { from: 'leo', text: 'Scorpio is typing (MUSEUM PIECE)' }]],
  msgs: [
    { at: -1, from: 'libra', text: 'anyone up?' },
    { at: -0.6, from: 'gemini', text: 'SCORPIO HAS BEEN TYPING SINCE *LUNCH*' },
    { at: 2.2, from: 'leo', text: 'pinning this. framing it. *naming a wing after it.*' },
    { at: 2.6, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 4.7, from: 'scorpio', text: 'nvm', react: [[5.1, 'ha', 11]] },
    { at: 7.1, from: 'scorpio', text: 'my date asked what I\'m feeling and I *left my body.*', big: true },
    { at: 8.4, from: 'scorpio', text: "I'm slow to open up. *this message took a month.*" },
    { at: 10.3, from: 'virgo', text: 'you just said it. send them *that exact sentence.*', big: true },
    { at: 12.0, kind: 'image', from: 'scorpio', w: 620, h: 290, draw: shot([
      { side: 'R', text: "I'm slow to open up. but I like you.", at: 12.2 },
      { side: 'L', text: 'thank you for telling me. no rush.', at: 13.2 },
    ], { title: 'my date', col: '#a8304e' }) },
    { at: 14.5, from: 'scorpio', text: 'ok. that felt *good.* deleting this chat now.', react: [[14.9, 'heart', 11]] },
    { at: 15.4, kind: 'voice', from: 'pisces', dur: '9:03', note: '(sobbing: SCORPIO HAS FEELINGS)' },
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

export const HOOK = 'Typed 20 minutes. | Sent *"nvm."*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.1
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
