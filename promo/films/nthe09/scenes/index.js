// nthe09: THE THREAD, episode 9, "Item Six" (25 s vertical, promo/films/next30/b05.md row 9, music: lofi · Cm).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Capricorn sent the agenda. *Read item 6.*"  Item 6: ask Aquarius to the party (as my date).
//   0.8   eleven people typing, then nothing. Gemini: "item SIX". Aries volunteers. Capricorn: "that was a draft. I panicked."
//   6.9   card cut: Virgo: "it's a good item. ask on purpose." Capricorn asks. Aquarius: "yes. been waiting since item 1."
//   13.8  the agenda, amended. Pisces' voice note.  16.6 last line.
import { makeThread } from '../../nthe01/chatkit.js'

const CAP = '#2fc79a', AQU = '#38c4ec'
const EP = makeThread({
  id: 'nthe09', duration: 25, chat: "ARIES'S CHAT!!", cut: 6.9,
  heads: [
    { at: -1, text: 'Capricorn sent the agenda. | *Read item 6.*', accent: CAP },
    { at: 3.0, text: 'The chat | *noticed.*' },
    { at: 7.0, text: 'Virgo steps *in.*' },
    { at: 9.0, text: 'Capricorn | *asks.*', accent: CAP },
    { at: 11.5, text: 'Aquarius: *yes.*', accent: AQU },
  ],
  last: { at: 16.6, text: 'Ask *on purpose.* | Plain is romantic.' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }]],
  msgs: [
    { at: -1.4, kind: 'agenda', from: 'capricorn', title: 'AGENDA (THIS WEEK)', gap: 0.15, items: ['party carpool', 'gift budget', 'dinner dishes', "Sag's trip (??)", 'Q&A', { text: 'ask Aquarius to the party (as my date)', hi: true }] },
    { at: 2.4, from: 'gemini', text: 'item *SIX*' },
    { at: 3.2, from: 'aries', text: "I'm free if Aquarius isn't", react: [[3.7, 'ha', 8]] },
    { at: 4.4, from: 'capricorn', text: 'that was a draft. I *panicked.*' },
    { at: 7.1, from: 'virgo', text: "it's a good item. ask *on purpose.*", big: true },
    { at: 9.0, from: 'capricorn', text: "Aquarius. would you go to Libra's party with me? *as a date.*", big: true, react: [[9.6, 'heart', 10]] },
    { at: 11.5, from: 'aquarius', text: 'yes. been waiting since *item 1.*', big: true, react: [[12.0, 'heart', 11], [12.2, 'star', 5]] },
    { at: 13.0, from: 'libra', text: 'seating chart: *updated*' },
    { at: 13.8, kind: 'agenda', from: 'capricorn', title: 'AGENDA (AMENDED)', items: ['item 6: *done*'] },
    { at: 14.9, kind: 'voice', from: 'pisces', dur: '0:58', note: '(sobbing: ITEM SIX)' },
  ],
  typing: [{ label: '11 people are typing', a: 0.6, b: 2.3 }, { from: 'capricorn', a: 5.3, b: 6.7 }, { from: 'aquarius', a: 10.0, b: 11.45 }],
  stage: [
    { at: -1, sign: 'capricorn', mood: 'neutral', look: [1, -0.6] },
    { at: 0.6, sign: 'capricorn', mood: 'wide', look: [0, 0] },
    { at: 2.4, sign: 'gemini', mood: 'wide' },
    { at: 3.2, sign: 'aries', mood: 'happy' },
    { at: 4.4, sign: 'capricorn', mood: 'squint', look: [1, 1] },
    { at: 7.1, sign: 'virgo', mood: 'happy' },
    { at: 9.0, sign: 'capricorn', mood: 'neutral', look: [0, 0] },
    { at: 11.5, sign: 'capricorn', mood: 'sparkle', look: [1, 0], two: { sign: 'aquarius', mood: 'happy', look: [-1, 0] } },
  ],
  cry: [[-1, 1], [11.5, 2], [14.9, 3]],
  pisMood: [[0.6, 'wide'], [7.1, 'sparkle'], [11.5, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
