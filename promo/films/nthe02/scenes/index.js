// nthe02: THE THREAD, episode 2, "The RSVP Poll Has No 'No'" (25 s vertical, promo/films/next30/b05.md row 2, music: jazzy · Bb).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Libra's party poll has *no 'no.'*"  Libra's holiday-party poll (sat the 19th): yes / yes!! / obviously.
//   3.0   the votes pour in; Scorpio wants the guest list, Taurus wants snacks, Sag "yes unless I'm on a trip".
//   8.0   card cut → 11:40 PM: Libra: "can I invite my crush or is that weird". Virgo: warm, clear, no pressure.
//   13.0  Libra reposts the poll with a "no (totally fine!)" option. Pisces' voice note.  16.8 last line.
import { makeThread } from '../../nthe01/chatkit.js'

const LIB = '#e163d6'
const OPTS = [
  { label: 'yes', votes: [[-1, 1], [1.0, 3], [2.2, 5]] },
  { label: 'yes!!', votes: [[0.6, 2], [1.6, 4]] },
  { label: 'obviously', votes: [[1.3, 1], [2.6, 3]] },
]
const EP = makeThread({
  id: 'nthe02', duration: 25, chat: "ARIES'S CHAT!!", cut: 8.0,
  heads: [
    { at: -1, text: "Libra's party poll | has *no 'no.'*", accent: LIB },
    { at: 3.0, text: 'Everyone votes. | *Mostly.*' },
    { at: 8.05, text: 'The *real* question.' },
    { at: 11.0, text: 'Virgo, *gently.*' },
    { at: 14.0, text: 'Poll, version *two.*', accent: LIB },
  ],
  last: { at: 16.8, text: 'A real invite has | *room for a no.*' },
  pins: [[-1, { from: 'leo', text: 'welcome to MY chat' }]],
  msgs: [
    { at: -1, from: 'libra', text: 'HOLIDAY PARTY at mine, *sat the 19th!!*' },
    { at: -0.5, kind: 'poll', from: 'libra', q: 'coming?', opts: OPTS },
    { at: 3.2, from: 'scorpio', text: 'who else is going' },
    { at: 4.3, from: 'taurus', text: 'snacks?', react: [[4.8, 'ha', 3]] },
    { at: 5.4, from: 'sagittarius', text: "yes unless I'm on a trip" },
    { at: 6.5, from: 'aries', text: "where's the 'no' button. asking for no one" },
    { at: 8.1, kind: 'divider', text: '11:40 PM' },
    { at: 8.3, from: 'libra', text: 'real q. can I invite my *crush* or is that weird', big: true, react: [[9.0, 'heart', 4]] },
    { at: 11.0, from: 'virgo', text: 'invite them like a friend. warm, clear, *no pressure.*' },
    { at: 13.0, from: 'libra', text: 'so… they need an easy way to say no.' },
    { at: 14.0, kind: 'poll', from: 'libra', q: 'coming? (v2)', opts: [
      { label: 'yes', votes: [[14, 5]] }, { label: 'yes!!', votes: [[14, 4]] }, { label: 'obviously', votes: [[14, 3]] },
      { label: 'no (totally fine!)', at: 14.5, small: true, col: '#7dffb0', votes: [] },
    ] },
    { at: 15.6, kind: 'voice', from: 'pisces', dur: '0:52', note: '(happy sobbing: you added a NO for us)' },
  ],
  typing: [{ from: 'virgo', a: 9.5, b: 10.95 }],
  stage: [
    { at: -1, sign: 'libra', mood: 'happy', look: [1, -0.5] },
    { at: 3.2, sign: 'scorpio', mood: 'squint', look: [1, -1] },
    { at: 4.3, sign: 'taurus', mood: 'happy' },
    { at: 5.4, sign: 'sagittarius', mood: 'sparkle' },
    { at: 6.5, sign: 'aries', mood: 'eyeroll' },
    { at: 8.3, sign: 'libra', mood: 'wide', look: [0, 0] },
    { at: 11.0, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 13.0, sign: 'libra', mood: 'happy', look: [1, -1] },
    { at: 14.0, sign: 'libra', mood: 'sparkle', look: [0, 0], hops: [14.5] },
  ],
  cry: [[-1, 1], [14.5, 2], [15.6, 3]],
  pisMood: [[8.3, 'wide'], [11.0, 'sparkle'], [15.6, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
