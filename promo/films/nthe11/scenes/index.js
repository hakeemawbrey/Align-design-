// nthe11: THE THREAD, episode 11, "Aquarius Renamed the Chat" (25 s vertical, promo/films/next30/b05.md row 11, music: house · A).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Aquarius renamed the chat *again.*"  The header flips: "the collective" → "twelve brains, one signal".
//   2.4   Capricorn: AGENDA: name freeze. One more rename anyway.
//   5.6   card cut: "my date says I'm hard to read. I fixed their bike light. isn't that obvious?"  Gemini ×3.
//   10.0  Virgo: fix it AND say why. Aquarius says why. Final rename: "say it out loud".  16.6 last line.
import { makeThread, shot } from '../../nthe01/chatkit.js'

const AQU = '#38c4ec'
const EP = makeThread({
  id: 'nthe11', duration: 25, chat: "ARIES'S CHAT!!", cut: 5.6,
  renames: [[-0.8, 'the collective'], [1.6, 'twelve brains, one signal'], [3.9, 'the collective (final)'], [14.3, 'say it out loud']],
  heads: [
    { at: -1, text: 'Aquarius renamed the chat | *again.*', accent: AQU },
    { at: 2.4, text: 'Capricorn calls a | *name freeze.*', accent: '#2fc79a' },
    { at: 5.7, text: 'Aquarius has | *a question.*', accent: AQU },
    { at: 10.0, text: 'Virgo: *say why.*' },
    { at: 14.3, text: 'New name. | *New rule.*', accent: AQU },
  ],
  last: { at: 16.6, text: 'Do the thing. | Then *say why.*' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }]],
  msgs: [
    { at: -0.8, kind: 'system', text: "♒︎ Aquarius renamed the chat 'the collective'" },
    { at: -0.3, from: 'aries', text: '*MY* CHAT' },
    { at: 1.6, kind: 'system', text: "♒︎ renamed: 'twelve brains, one signal'" },
    { at: 2.5, kind: 'agenda', from: 'capricorn', items: [{ text: 'name freeze', hi: true }] },
    { at: 3.9, kind: 'system', text: "♒︎ renamed: 'the collective (final)'" },
    { at: 5.8, from: 'aquarius', text: "my date says I'm *hard to read.*" },
    { at: 6.9, from: 'aquarius', text: "I fixed their bike light. isn't that *obvious?*" },
    { at: 8.3, kind: 'triple', from: 'gemini', items: [{ to: 'aquarius', text: 'romantic??' }, { to: 'aquarius', text: 'a bike light??' }, { to: 'virgo', text: 'help' }] },
    { at: 10.0, from: 'virgo', text: 'fix it AND *say why.*', big: true },
    { at: 11.6, kind: 'image', from: 'aquarius', w: 620, h: 300, draw: shot([
      { side: 'R', text: 'I fixed your light because I want you safe getting home.', at: 11.8 },
      { side: 'L', text: "…that's the sweetest thing.", at: 12.9 },
    ], { title: 'my date', col: '#2a8cb0' }), react: [[13.5, 'heart', 10]] },
    { at: 14.3, kind: 'system', text: "♒︎ renamed: 'say it out loud'" },
    { at: 15.2, kind: 'voice', from: 'pisces', dur: '0:40', note: '(sobbing: SAY IT OUT LOUD)' },
  ],
  stage: [
    { at: -1, sign: 'aquarius', mood: 'sparkle', look: [1, -0.6], hops: [0.4, 1.6] },
    { at: 1.6, sign: 'aquarius', mood: 'happy', hops: [1.7] },
    { at: 2.5, sign: 'capricorn', mood: 'eyeroll' },
    { at: 3.9, sign: 'aquarius', mood: 'wink' },
    { at: 5.8, sign: 'aquarius', mood: 'neutral', look: [1, -1] },
    { at: 8.3, sign: 'gemini', mood: 'wide' },
    { at: 10.0, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 11.6, sign: 'aquarius', mood: 'neutral', look: [1, 1] },
    { at: 12.9, sign: 'aquarius', mood: 'sparkle', look: [0, 0] },
  ],
  cry: [[-1, 1], [12.9, 2], [15.2, 3]],
  pisMood: [[5.8, 'sparkle'], [12.9, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
