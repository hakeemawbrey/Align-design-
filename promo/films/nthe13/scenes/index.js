// nthe13: THE THREAD, episode 13, "Taurus Replied to Monday" (20 s vertical, promo/films/next30/b05.md row 13, music: lofi · Ab).
// Story 0–15.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Taurus just replied to a message from *Monday.*"  MONDAY → THURSDAY dividers, Taurus's quoted reply.
//   1.2   Cancer: "that was four days ago". Taurus: "and I meant it."
//   3.9   card cut: "my partner wants to try a new date spot. I love our usual."  Sag vs Capricorn.
//   7.8   Virgo: keep your tradition, add one new thing. "new spot friday. usual spot sunday."  11.8 last line.
import { makeThread } from '../../nthe01/chatkit.js'

const TAU = '#e9b24a'
const EP = makeThread({
  id: 'nthe13', duration: 20, chat: 'virgo said it out loud', cut: 3.9,
  heads: [
    { at: -1, text: 'Taurus just replied to | a message from *Monday.*', accent: TAU },
    { at: 2.1, text: 'Taurus | *means it.*', accent: TAU },
    { at: 4.0, text: 'Taurus has | *a question.*', accent: TAU },
    { at: 7.8, text: 'Virgo | *splits it.*' },
  ],
  last: { at: 11.8, text: 'Keep the cozy. | *Add one* new thing.' },
  pins: [[-1, { from: 'leo', text: 'Virgo has a crush (historic)' }]],
  msgs: [
    { at: -1.4, kind: 'divider', text: 'MONDAY' },
    { at: -1.3, from: 'cancer', text: 'who wants soup this week?' },
    { at: -0.8, kind: 'divider', text: 'THURSDAY' },
    { at: -0.4, kind: 'reply', from: 'taurus', re: { from: 'cancer', text: 'who wants soup this week?' }, text: "yes I'd love *soup*" },
    { at: 1.2, from: 'cancer', text: 'that was *four days ago*' },
    { at: 2.1, from: 'taurus', text: 'and I meant it.', react: [[2.5, 'heart', 6]] },
    { at: 4.1, from: 'taurus', text: 'my partner wants to try a new date spot. I love *our usual.*', big: true },
    { at: 5.8, from: 'sagittarius', text: 'new is fun!!' },
    { at: 6.6, from: 'capricorn', text: 'the usual is *efficient.*', react: [[7.0, 'ha', 5]] },
    { at: 7.8, from: 'virgo', text: 'keep your tradition. *add one new thing.*', big: true },
    { at: 9.6, from: 'taurus', text: 'new spot friday. *usual spot sunday.*', big: true, react: [[10.1, 'heart', 9]] },
    { at: 10.5, from: 'sagittarius', text: 'GROWTH!!' },
    { at: 11.1, kind: 'voice', from: 'pisces', dur: '0:21', note: '(sobbing: growth)' },
  ],
  stage: [
    { at: -1, sign: 'taurus', mood: 'happy', look: [1, -0.5], hops: [0.4] },
    { at: 1.2, sign: 'cancer', mood: 'wide' },
    { at: 2.1, sign: 'taurus', mood: 'happy' },
    { at: 4.1, sign: 'taurus', mood: 'neutral', look: [1, -1] },
    { at: 5.8, sign: 'sagittarius', mood: 'sparkle', two: { sign: 'capricorn', at: 6.6, mood: 'neutral' } },
    { at: 7.8, sign: 'virgo', mood: 'happy' },
    { at: 9.6, sign: 'taurus', mood: 'sparkle', look: [0, 0] },
  ],
  cry: [[-1, 1], [9.6, 2], [11.1, 3]],
  pisMood: [[4.1, 'sparkle'], [11.1, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
