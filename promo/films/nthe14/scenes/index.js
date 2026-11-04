// nthe14: THE THREAD, episode 14, "Sag Was Honest. Very." (25 s vertical, promo/films/next30/b05.md row 14, music: funk · Bb).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Sag gave an *honest* review. Of dinner."  "and I said 'a bit salty.'"  Sag mid-shrug.
//   1.2   the chat gasps; Gemini ×3; Capricorn's damage-control agenda. Sag: "but it WAS salty."
//   7.4   card cut: Virgo: honest is good, lead with what you loved. Sag tries again: "cook together next time?"
//   12.4  "deal. you're on salt."  Pisces' voice note.  16.6 last line.
import { makeThread, shot } from '../../nthe01/chatkit.js'

const SAG = '#a35cf0'
const EP = makeThread({
  id: 'nthe14', duration: 25, chat: 'virgo said it out loud', cut: 7.4,
  heads: [
    { at: -1, text: 'Sag gave an *honest* review. | Of dinner.', accent: SAG },
    { at: 1.2, text: 'The chat | *gasps.*' },
    { at: 7.5, text: 'Virgo, | *diplomatically.*' },
    { at: 11.0, text: 'Sag tries | *again.*', accent: SAG },
  ],
  last: { at: 16.6, text: 'Honest *and* kind. | Lead with what you loved.' },
  pins: [[-1, { from: 'leo', text: 'Virgo has a crush (historic)' }]],
  msgs: [
    { at: -1, from: 'sagittarius', text: 'my date cooked for me and asked how it was' },
    { at: -0.6, from: 'sagittarius', text: "and I said *'a bit salty.'*", big: true },
    { at: 1.2, from: 'libra', text: 'SAG' },
    { at: 1.6, from: 'cancer', text: 'oh no' },
    { at: 2.0, from: 'scorpio', text: 'brave.' },
    { at: 3.0, kind: 'triple', from: 'gemini', items: [{ to: 'sagittarius', text: 'why' }, { to: 'sagittarius', text: 'WHY' }, { to: 'cancer', text: 'oh no indeed' }] },
    { at: 4.6, kind: 'agenda', from: 'capricorn', title: 'AGENDA: DAMAGE CONTROL', items: ['say sorry', 'say what you loved'] },
    { at: 6.2, from: 'sagittarius', text: 'but it *WAS* salty.', react: [[6.6, 'ha', 8]] },
    { at: 7.6, from: 'virgo', text: 'honest is good. lead with *what you loved.*', big: true },
    { at: 9.4, from: 'sagittarius', text: 'the whole night. *the salt was the only flaw.*' },
    { at: 11.0, kind: 'image', from: 'sagittarius', w: 640, h: 300, draw: shot([
      { side: 'R', text: 'honestly my favourite night this month. cook together next time?', at: 11.2 },
      { side: 'L', text: "deal. you're on salt.", at: 12.4 },
    ], { title: 'my date', col: '#7b4fd0' }) },
    { at: 13.8, from: 'sagittarius', text: "they said I'm *on salt*", big: true, react: [[14.3, 'heart', 8], [14.5, 'ha', 6]] },
    { at: 15.0, kind: 'voice', from: 'pisces', dur: '0:36', note: '(sobbing: ON SALT)' },
  ],
  typing: [{ from: 'sagittarius', a: 10.0, b: 10.95 }],
  stage: [
    { at: -1, sign: 'sagittarius', mood: 'neutral', look: [0, 0], hops: [0.3] },
    { at: 1.2, sign: 'libra', mood: 'wide', two: { sign: 'cancer', at: 1.6, mood: 'wide' } },
    { at: 3.0, sign: 'gemini', mood: 'wide' },
    { at: 4.6, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 6.2, sign: 'sagittarius', mood: 'eyeroll' },
    { at: 7.6, sign: 'virgo', mood: 'happy' },
    { at: 9.4, sign: 'sagittarius', mood: 'happy' },
    { at: 11.0, sign: 'sagittarius', mood: 'neutral', look: [1, 1] },
    { at: 12.4, sign: 'sagittarius', mood: 'sparkle', look: [0, 0] },
  ],
  cry: [[-1, 1], [12.4, 2], [15.0, 3]],
  pisMood: [[-1, 'wide'], [7.6, 'sparkle'], [12.4, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
