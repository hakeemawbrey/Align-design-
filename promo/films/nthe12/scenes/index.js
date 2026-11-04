// nthe12: THE THREAD, episode 12, "Virgo Needs Advice" (30 s vertical, promo/films/next30/b05.md row 12, music: pop · D).
// Story 0–25.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Virgo, who answers everything, *needs help.*"  "I have a crush. I made a 14-tab plan. I can't send one text."
//   0.6   eleven typing; then everyone's advice, in character (Aries, Capricorn's agenda, Gemini ×3, Leo's pin, Libra,
//         Scorpio, Pisces' voice note).
//   11.5  card cut: Virgo: "…you're all quoting my own advice."  Cancer: because it's good.
//   14.6  Virgo sends it: "I like talking to you. coffee saturday?" → "yes!!"  Aquarius renames the chat.  20.8 last line.
import { makeThread, shot } from '../../nthe01/chatkit.js'

const VIR = '#ef5c94'
const EP = makeThread({
  id: 'nthe12', duration: 30, chat: 'say it out loud', cut: 11.5,
  renames: [[19.2, 'virgo said it out loud']],
  heads: [
    { at: -1, text: 'Virgo, who answers everything, | *needs help.*', accent: VIR },
    { at: 2.3, text: 'The chat returns | *the favour.*' },
    { at: 11.6, text: 'Virgo *notices* | something.', accent: VIR },
    { at: 14.6, text: 'Virgo | *sends it.*', accent: VIR },
  ],
  last: { at: 20.8, text: 'Even the one with answers | *needs the chat.*' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }], [6.8, { from: 'leo', text: 'Virgo has a crush (historic)' }]],
  msgs: [
    { at: -1, from: 'virgo', text: 'I have a crush.' },
    { at: -0.7, from: 'virgo', text: 'I made a *14-tab plan.*' },
    { at: -0.3, from: 'virgo', text: "I can't send *one text.*", big: true },
    { at: 2.3, from: 'aries', text: 'just say it! worked for me', react: [[2.8, 'heart', 3]] },
    { at: 3.4, kind: 'agenda', from: 'capricorn', title: 'AGENDA: HELP VIRGO', gap: 0.25, items: ['breathe', 'one text', 'report back'] },
    { at: 5.2, kind: 'triple', from: 'gemini', items: [{ to: 'virgo', text: 'omg' }, { to: 'virgo', text: 'WHO' }, { to: 'virgo', text: 'proud of u' }] },
    { at: 6.4, from: 'leo', text: 'pinning. historic.' },
    { at: 6.8, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 7.8, from: 'libra', text: 'warm, clear, no pressure. *(you said that)*' },
    { at: 9.0, from: 'scorpio', text: 'one true sentence. *(also you)*' },
    { at: 10.1, kind: 'voice', from: 'pisces', dur: '1:30', note: '(sobbing: our VIRGO)' },
    { at: 11.7, from: 'virgo', text: "…you're all quoting *my own advice.*", big: true, react: [[12.3, 'ha', 11]] },
    { at: 13.3, from: 'cancer', text: "because it's *good,* sweetie." },
    { at: 14.6, kind: 'image', from: 'virgo', w: 620, h: 290, draw: shot([
      { side: 'R', text: 'I like talking to you. coffee saturday?', at: 14.9 },
      { side: 'L', text: "yes!! I was hoping you'd ask.", at: 16.2 },
    ], { title: 'my crush', col: '#b8406e' }) },
    { at: 17.5, from: 'virgo', text: 'SENT. and they said *yes.*', big: true, react: [[18.0, 'heart', 11], [18.3, 'star', 6]] },
    { at: 19.2, kind: 'system', text: "♒︎ renamed: 'virgo said it out loud'" },
  ],
  typing: [{ label: '11 people are typing', a: 0.5, b: 2.25 }],
  stage: [
    { at: -1, sign: 'virgo', mood: 'wide', look: [1, 1] },
    { at: 2.3, sign: 'aries', mood: 'happy' },
    { at: 3.4, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 5.2, sign: 'gemini', mood: 'sparkle' },
    { at: 6.4, sign: 'leo', mood: 'sparkle', look: [0, 0] },
    { at: 7.8, sign: 'libra', mood: 'happy' },
    { at: 9.0, sign: 'scorpio', mood: 'squint' },
    { at: 11.7, sign: 'virgo', mood: 'wide', look: [0, 0] },
    { at: 13.3, sign: 'cancer', mood: 'happy' },
    { at: 14.6, sign: 'virgo', mood: 'neutral', look: [1, 1] },
    { at: 16.2, sign: 'virgo', mood: 'sparkle', look: [0, 0] },
    { at: 17.5, sign: 'virgo', mood: 'heart', look: [0, 0], hops: [17.9, 18.3] },
    { at: 19.2, sign: 'aquarius', mood: 'wink', two: { sign: 'virgo', mood: 'heart' } },
  ],
  cry: [[-1, 1], [10.1, 3], [11.6, 2], [16.2, 3]],
  pisMood: [[-1, 'wide'], [2.3, 'sparkle'], [16.2, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
