// nthe08: THE THREAD, episode 8, "Gemini, Three Replies at Once" (20 s vertical, promo/films/next30/b05.md row 8, music: chiptune · A).
// Story 0–15.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Gemini is answering *three* things at once."  Three questions, one triple reply. Gemini with two phones.
//   1.8   Virgo: "impressive. terrifying."  Gemini: "my date asked 'wait, which question are you answering?'"
//   4.6   card cut: Virgo: ask ONE question, then wait like the answer matters. Gemini asks; a sweet answer comes back.
//   10.0  Gemini answers three things at once again (callback). Pisces' voice note.  11.6 last line.
import { makeThread, shot, handPhone } from '../../nthe01/chatkit.js'

const GEM = '#f2cf4a'
const twoPhones = (x, t, P) => handPhone(x, P.x - P.F.S * 0.44, P.F.cy + P.F.S * 0.05, 1.15 * P.pk, -0.2 + 0.05 * Math.sin(t * 4), 1)
const EP = makeThread({
  id: 'nthe08', duration: 20, chat: "ARIES'S CHAT!!", cut: 4.6,
  heads: [
    { at: -1, text: 'Gemini is answering | *three* things at once.', accent: GEM },
    { at: 2.8, text: "Gemini's date is | *confused.*", accent: GEM },
    { at: 4.7, text: "Virgo's *rule.*" },
    { at: 6.6, text: '*One* question.', accent: GEM },
  ],
  last: { at: 11.6, text: 'One question. | Then *really* listen.' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }]],
  msgs: [
    { at: -1, from: 'libra', text: 'party snack ideas?' },
    { at: -0.8, from: 'cancer', text: 'who likes dessert?' },
    { at: -0.6, from: 'sagittarius', text: 'anyone have a big coat' },
    { at: -0.4, kind: 'triple', from: 'gemini', items: [{ to: 'libra', text: 'tiny pies' }, { to: 'cancer', text: 'me!!' }, { to: 'sagittarius', text: "mine. it's yellow" }] },
    { at: 1.8, from: 'virgo', text: 'impressive. *terrifying.*', react: [[2.3, 'ha', 7]] },
    { at: 2.8, from: 'gemini', text: "my date asked *'wait, which question are you answering?'*" },
    { at: 4.7, from: 'virgo', text: 'ask ONE question. then wait like *the answer matters.*', big: true },
    { at: 6.6, kind: 'image', from: 'gemini', w: 620, h: 280, draw: shot([
      { side: 'R', text: 'what was the best part of your week?', at: 6.8 },
      { side: 'L', text: 'honestly? the walk home after our coffee.', at: 7.9 },
    ], { title: 'my date', col: '#b8962a' }) },
    { at: 9.0, from: 'gemini', text: "I'm *melting*", big: true, react: [[9.4, 'heart', 8]] },
    { at: 10.0, kind: 'triple', from: 'gemini', items: [{ to: 'virgo', text: 'it worked' }, { to: 'libra', text: 'still tiny pies' }, { to: 'pisces', text: "don't cry" }] },
    { at: 10.9, kind: 'voice', from: 'pisces', dur: '0:09', note: '(crying anyway)' },
  ],
  stage: [
    { at: -1, sign: 'gemini', mood: 'happy', look: [1, -0.5], prop: twoPhones, hops: [0.3, 0.6] },
    { at: 1.8, sign: 'virgo', mood: 'wide', look: [0, 0] },
    { at: 2.8, sign: 'gemini', mood: 'neutral', look: [1, -1], prop: twoPhones },
    { at: 4.7, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 6.6, sign: 'gemini', mood: 'neutral', look: [1, -1] },
    { at: 7.9, sign: 'gemini', mood: 'sparkle', look: [0, 0] },
    { at: 9.0, sign: 'gemini', mood: 'heart', look: [0, 0] },
    { at: 10.0, sign: 'gemini', mood: 'happy', prop: twoPhones },
  ],
  cry: [[-1, 1], [7.9, 2], [10.9, 3]],
  pisMood: [[4.7, 'sparkle'], [10.0, 'wide'], [10.9, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
