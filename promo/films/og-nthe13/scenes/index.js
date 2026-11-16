// og-nthe13: social rework of nthe13 (The Thread, "Taurus Replied to Monday"). Static HOOK (box) 0–3.1 replaces the
// animated frame-0 headline (the 'means it' head moves to 3.2); no series bug, no end card, no fade-out; crazier lines.
// The look lives in ../chatkit.js.
//   0.0   frame 0: "Taurus just replied to a message from *Monday.*"  MONDAY → THURSDAY dividers, Taurus's quoted reply.
//   1.2   Cancer: "that was four days ago". Taurus: "and I meant it."
//   3.9   card cut: "my partner wants to try a new date spot. I love our usual."  Sag vs Capricorn.
//   7.8   Virgo: keep your tradition, add one new thing. "new spot friday. usual spot sunday."  11.8 last line.
import { makeThread } from '../chatkit.js'

const TAU = '#e9b24a'
const EP = makeThread({
  id: 'og-nthe13', duration: 20, chat: 'virgo said it out loud', cut: 3.9,
  heads: [
    { at: 3.2, text: 'Taurus | *means it.*', accent: TAU },
    { at: 4.0, text: 'Taurus has | *a question.*', accent: TAU },
    { at: 7.8, text: 'Virgo | *splits it.*' },
  ],
  last: { at: 11.8, text: 'Keep the cozy. | *Add one* new thing.' },
  pins: [[-1, { from: 'leo', text: 'Virgo has a crush (NATIONAL HOLIDAY)' }]],
  msgs: [
    { at: -1.4, kind: 'divider', text: 'MONDAY' },
    { at: -1.3, from: 'cancer', text: 'who wants soup this week?' },
    { at: -0.8, kind: 'divider', text: 'THURSDAY' },
    { at: -0.4, kind: 'reply', from: 'taurus', re: { from: 'cancer', text: 'who wants soup this week?' }, text: "yes I'd love *soup.* bringing my own spoon. and a blanket." },
    { at: 1.2, from: 'cancer', text: 'that was *four days ago.* the soup is gone.' },
    { at: 2.1, from: 'taurus', text: 'and I meant it. make more.', react: [[2.5, 'heart', 6]] },
    { at: 4.1, from: 'taurus', text: 'my partner wants to try a new date spot. we have had the same table *for 3 years.* it knows me.', big: true },
    { at: 5.8, from: 'sagittarius', text: 'new is fun!! try a different city!!' },
    { at: 6.6, from: 'capricorn', text: 'the usual is *efficient.* I have its menu memorised.', react: [[7.0, 'ha', 5]] },
    { at: 7.8, from: 'virgo', text: 'keep your tradition. *add one new thing.*', big: true },
    { at: 9.6, from: 'taurus', text: 'new spot friday. *usual spot sunday.*', big: true, react: [[10.1, 'heart', 9]] },
    { at: 10.5, from: 'sagittarius', text: 'GROWTH!! next: a new spoon??' },
    { at: 11.1, kind: 'voice', from: 'pisces', dur: '4:21', note: '(sobbing: TAURUS CHANGED)' },
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

export const HOOK = 'Replied Thursday. | To *Monday.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.1
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
