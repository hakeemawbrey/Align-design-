// nthe01: THE THREAD, episode 1, "Aries Made a Group Chat" (30 s vertical, promo/films/next30/b05.md row 1, music: pop · C).
// Story 0–25.6, then the shared end card. The look lives in ../chatkit.js (shared by every Thread episode).
//   0.0     frame 0: "6:02 AM. *Aries* made a group chat."  ♈ Aries mid-hop on the stage; "♈ Aries added 11 people".
//   0.9–8.4 everyone arrives in character: Taurus (it's 6am), Leo pins its own welcome, Capricorn's AGENDA, Gemini
//           answers three at once, Pisces' crying voice note.
//   9.0     card cut → 6:09 AM: Aries: "ok real reason. I like someone." Eleven people typing.
//   12.5    Virgo: one honest sentence. Aries: "SENT." The chat: WAIT. "they said YES!!" Confetti, Pisces fountains.
//   20.6    last line: "Brave first. Group chat *second.*"
import { makeThread, confetti, hearts } from '../chatkit.js'

const EP = makeThread({
  id: 'nthe01', duration: 30, chat: "ARIES'S CHAT!!", cut: 9.0,
  heads: [
    { at: -1, text: '6:02 AM. *Aries* | made a group chat.', accent: '#ff8a6a' },
    { at: 2.0, text: 'Everyone arrives | *in character.*' },
    { at: 9.05, text: 'The *real* reason | for the chat.' },
    { at: 12.45, text: 'Virgo has | *the answer.*' },
    { at: 18.4, text: '…and Aries | *already did it.*', accent: '#ff8a6a' },
  ],
  last: { at: 20.7, text: 'Brave first. | Group chat *second.*' },
  pins: [[2.75, { from: 'leo', text: 'welcome to MY chat' }]],
  msgs: [
    { at: -1, kind: 'system', text: '♈︎ Aries added 11 people' },
    { at: -0.8, from: 'aries', text: 'GOOD MORNING EVERYONE!!' },
    { at: -0.5, from: 'aries', text: 'this is our chat now' },
    { at: -0.2, from: 'aries', text: 'hello??' },
    { at: 0.9, from: 'taurus', text: "it's 6am.", react: [[1.5, 'ha', 3]] },
    { at: 2.0, from: 'leo', text: 'welcome to *MY* chat' },
    { at: 2.75, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 3.8, kind: 'agenda', from: 'capricorn', items: ['purpose of chat', 'rules', 'snacks?'] },
    { at: 5.6, kind: 'triple', from: 'gemini', items: [{ to: 'aries', text: 'morning!!' }, { to: 'leo', text: 'YOUR chat??' }, { to: 'capricorn', text: 'snacks yes' }] },
    { at: 7.3, kind: 'voice', from: 'pisces', dur: '0:38', note: "(happy sobbing: we're a FAMILY)" },
    { at: 9.1, kind: 'divider', text: '6:09 AM' },
    { at: 9.35, from: 'aries', text: 'ok real reason. I like someone. *how do I tell them*', big: true, react: [[10.4, 'heart', 5], [10.7, 'tear', 1]] },
    { at: 12.5, from: 'virgo', text: "one honest sentence. *'I like you. dinner friday?'*" },
    { at: 14.6, from: 'aries', text: 'SENT.', big: true },
    { at: 15.3, from: 'libra', text: 'WAIT' },
    { at: 15.75, from: 'scorpio', text: 'already??' },
    { at: 16.2, from: 'sagittarius', text: 'LEGEND' },
    { at: 18.4, from: 'aries', text: 'they said *YES!!*', big: true, react: [[18.9, 'heart', 11], [19.2, 'star', 6]] },
    { at: 20.0, kind: 'agenda', from: 'capricorn', title: 'AGENDA (AMENDED)', items: ['celebrate Aries'] },
  ],
  typing: [{ label: '11 people are typing', a: 10.9, b: 12.45 }, { from: 'aries', a: 16.9, b: 18.35 }],
  stage: [
    { at: -1, sign: 'aries', mood: 'happy', look: [1, -0.5] },
    { at: 0.9, sign: 'taurus', mood: 'sleepy' },
    { at: 2.0, sign: 'leo', mood: 'sparkle', look: [0, 0] },
    { at: 3.8, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 5.6, sign: 'gemini', mood: 'happy', hops: [5.75, 5.9] },
    { at: 9.35, sign: 'aries', mood: 'squint', look: [1, -1] },
    { at: 12.5, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 14.6, sign: 'aries', mood: 'wide', look: [0, 0] },
    { at: 16.9, sign: 'aries', mood: 'neutral', look: [1, -1] },
    { at: 18.4, sign: 'aries', mood: 'sparkle', look: [0, 0], hops: [18.8, 19.2, 19.6] },
  ],
  cry: [[-1, 1], [7.3, 3], [8.9, 1], [10.4, 2], [18.5, 3]],
  pisMood: [[7.3, 'happy'], [9.3, 'wide'], [12.5, 'sparkle'], [18.4, 'happy']],
  extra(x, t) {
    confetti(x, t, 18.45, 300, 1560)
    hearts(x, t, 18.6, 300, 1520, { n: 6 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
