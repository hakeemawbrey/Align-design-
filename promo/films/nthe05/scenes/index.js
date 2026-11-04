// nthe05: THE THREAD, episode 5, "The Four-Minute Voice Note" (25 s vertical, promo/films/next30/b05.md row 5, music: dreamy · Eb).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Pisces sent a *4-minute* voice note."  The 4:12 voice note; Pisces mid-sob; Cancer already crying.
//   1.0   Aries: "summary pls". Capricorn schedules it. Cancer cries before pressing play. Gemini posts the transcript.
//   8.0   card cut: Pisces: "is crying on a first date too much??"  Virgo: "did they stay?"  "…a second dessert."
//   13.8  Virgo: your soft is safe with them. Leo pins it.  16.6 last line.
import { makeThread } from '../../nthe01/chatkit.js'

const PIS = '#7c74f0'
const EP = makeThread({
  id: 'nthe05', duration: 25, chat: "ARIES'S CHAT!!", cut: 8.0,
  heads: [
    { at: -1, text: 'Pisces sent a | *4-minute* voice note.', accent: '#9f98ff' },
    { at: 3.0, text: 'The chat | *braces.*' },
    { at: 5.5, text: 'Gemini | *transcribes.*' },
    { at: 8.05, text: 'The *real* question.' },
    { at: 12.1, text: 'They *stayed.*', accent: '#9f98ff' },
  ],
  last: { at: 16.6, text: 'The right person | *passes the napkin.*' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }], [15.3, { from: 'pisces', text: 'they stayed. and ordered a second dessert.' }]],
  msgs: [
    { at: -1, kind: 'voice', from: 'pisces', dur: '4:12', note: '(sobbing)' },
    { at: -0.4, from: 'pisces', text: 'LISTEN TO IT' },
    { at: 1.0, from: 'aries', text: 'summary pls', react: [[1.5, 'ha', 4]] },
    { at: 2.0, from: 'capricorn', text: 'listening at 6:15. (scheduled)' },
    { at: 3.1, from: 'cancer', text: "crying and I haven't pressed play" },
    { at: 5.6, kind: 'agenda', from: 'gemini', title: 'TRANSCRIPT (BY GEMINI)', items: ['date went *well*', 'cried at dessert', 'they passed me a napkin'] },
    { at: 8.2, from: 'pisces', text: 'is crying on a first date *too much??*', big: true },
    { at: 10.5, from: 'virgo', text: 'did they stay?' },
    { at: 12.1, from: 'pisces', text: 'they stayed. and ordered a *second dessert.*', react: [[12.6, 'heart', 9], [12.9, 'tear', 4]] },
    { at: 13.8, from: 'virgo', text: "then you're fine. your *soft* is safe with them." },
    { at: 15.3, kind: 'system', text: '♌︎ Leo pinned a message' },
  ],
  typing: [{ from: 'gemini', label: 'Gemini is transcribing', a: 4.3, b: 5.55 }, { from: 'pisces', a: 11.0, b: 12.05 }],
  stage: [
    { at: -1, sign: 'cancer', mood: 'sparkle', look: [1, -0.4], tears: 2 },
    { at: 1.0, sign: 'aries', mood: 'neutral', look: [1, -1] },
    { at: 2.0, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 3.1, sign: 'cancer', mood: 'sparkle', tears: 3 },
    { at: 4.3, sign: 'gemini', mood: 'squint', look: [1, -1] },
    { at: 8.2, sign: 'cancer', mood: 'wide', look: [1, -0.3], tears: 1 },
    { at: 10.5, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 12.1, sign: 'virgo', mood: 'happy' },
    { at: 15.3, sign: 'leo', mood: 'sparkle', look: [0, 0] },
  ],
  cry: [[-1, 3], [8.2, 2], [12.1, 3]],
  pisMood: [[-1, 'sparkle'], [8.2, 'wide'], [12.1, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
