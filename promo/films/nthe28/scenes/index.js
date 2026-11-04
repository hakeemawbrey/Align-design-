// nthe28: THE THREAD, episode 28, "Three threads" (18 s vertical, promo/films/next30/b06.md, music: chiptune · G)
// Story 0–15.6, then the short end card (2.4 s; no card-cut transition). The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Three threads. One Gemini."  Three questions at once (♉ cookies, ♌ party photos, ♏ "should I tell them I
//         like them?"). ♊ Gemini mid-type with two phones.
//   3.4   Gemini answers all three in ONE bubble: chocolate chip / yes / tell them. ♏ "wait. was that for me?"
//   7.25  ♍ "Gemini's right. somehow. tell them kindly. no deadline." (gold)
//   9.2   ♏ "told them. they like me too." · "GEMINI is taking full credit".  "*Accidentally* wise."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

const EP = {
  duration: 18,
  heads: [
    { text: 'Three threads. | *One* Gemini.', at: -0.9, out: [3.2, 3.45], size: 96 },
    { text: 'One bubble. *Three* answers.', at: 3.5, out: [7.0, 7.25], size: 86 },
    { text: 'Gemini’s right. | *Somehow.*', at: 7.35, out: [11.0, 11.25], size: 92 },
    { text: '*Accidentally* wise.', at: 11.4, out: [15.1, 15.45], size: 104 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'cancer', text: 'dinner is in two days!!' },
    { t: -4, kind: 'msg', who: 'taurus', text: 'cookie flavour for the dinner?' },
    { t: -3, kind: 'msg', who: 'leo', text: 'should I post the party photos?' },
    { t: -1.5, kind: 'msg', who: 'scorpio', text: 'should I tell them I like them?' },
    { t: 0.6, kind: 'msg', who: 'aqua', text: 'three questions at once. chaos.' },
    { t: 1.6, kind: 'voice', who: 'pisces', dur: '0:04', sob: true, play: [1.8, 3.4], react: { t: 2.2, mark: 'tear', n: 2 } },
    { t: 3.4, kind: 'triple', who: 'gemini', parts: [['Taurus: cookie flavour?', 'chocolate chip'], ['Leo: post the photos?', 'yes'], ['Scorpio: tell them I like them?', 'tell them']] },
    { t: 4.8, kind: 'msg', who: 'scorpio', text: 'wait. was that one for me?' },
    { t: 5.7, kind: 'msg', who: 'gemini', text: 'yes. yes. also yes.' },
    { t: 7.4, kind: 'msg', who: 'virgo', hl: true, text: "Gemini's right. somehow. tell them kindly. no deadline." },
    { t: 9.2, kind: 'msg', who: 'scorpio', text: 'told them. they like me too.', react: { t: 9.7, mark: 'heart', n: 12 } },
    { t: 10.4, kind: 'sys', who: 'gemini', gold: true, text: 'GEMINI is taking full credit' },
    { t: 11.3, kind: 'voice', who: 'pisces', dur: '0:05', sob: true, play: [11.5, 13.4] },
  ],
  typing: [{ who: 'virgo', a: 6.3, b: 7.35 }, { who: 'scorpio', a: 8.3, b: 9.15 }],
  cuts: [3.3, { t: 7.25, kind: 'flip' }, 11.4],
  stage(x, t, K) {
    const mood = t < 3.4 ? 'wide' : t < 7.4 ? 'sparkle' : t < 10.4 ? 'happy' : 'wink'
    K.stageStar(x, t, { who: 'gemini', x: 250, y: 1730, s: 225, mood, phone: 1, hops: [-0.2, 0.1, 3.4, 3.6, 3.8, 5.7, 10.4] })
    const F = K.starFrame(250, 1730, 225, t, { hops: [-0.2, 0.1, 3.4, 3.6, 3.8, 5.7, 10.4], seed: K.C('gemini').seed })
    K.drawProp(x, 'phone', F.ox - F.S * 0.42, F.oy - F.base - F.S * 0.02, F.cell * 1.2, { rot: 0.25 - 0.05 * Math.sin(t * 7) })
    const sk = K.pop01(t, 4.8, 0.35, 2)
    if (sk > 0.01) K.stageStar(x, t, { who: 'scorpio', x: 570, y: 1760, s: 160, mood: t < 9.2 ? 'wide' : 'heart', pop: sk, phone: 1, hops: [4.8, 9.2, 9.45] })
    K.stageStar(x, t, { who: 'pisces', x: 885, y: 1745, s: 160, mood: t > 9.2 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 11.3 ? 3 : t > 1.6 ? 2 : 1, phone: -1, hops: [1.6, 11.3, 11.6] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
