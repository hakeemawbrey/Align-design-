// nthe31: THE THREAD, episode 31, "Best moment" (28 s vertical, promo/films/next30/b06.md, music: dreamy · E)
// Story 0–25.6, then the short end card (2.4 s; no card-cut transition). The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Leo wants everyone's | best moment of the year."  ♌ Leo mid-pin (pinned their own question).
//   0.8   callbacks: ♉ grandma's garden tour (18) · ♑ said it (20) · ♎ a saved seat (24) · ♐ they cried, good cry (27) ·
//         ♏ they like me too (28) · ♊ "same / same / SAME (for you)" · ♓ voice note 0:58, sobbing.
//   9.9   ♈ "mine was a bad year for love honestly."  ♋ "oh Aries"
//  13.7   ♍ "you learned what you want. that counts. that's a good year." (gold)
//  15.8   Aries: "…I did learn I want someone who laughs at my jokes." ♌ pins THAT.
//  18.7   ♒ "mine was this chat."  "*Learning* counts."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

const EP = {
  duration: 28,
  heads: [
    { text: 'Leo wants everyone’s | *best moment* of the year.', at: -0.9, out: [3.7, 3.95], size: 76 },
    { text: 'The *callbacks.*', at: 4.0, out: [9.6, 9.85], size: 104 },
    { text: '‘Mine was a *bad* year.’', at: 9.95, out: [13.5, 13.75], size: 92 },
    { text: 'Learning what you want | *counts.*', at: 13.9, out: [18.4, 18.65], size: 84 },
    { text: 'Aquarius: *‘this chat.’*', at: 18.75, out: [21.3, 21.55], size: 92, accent: '#8fe3ff' },
    { text: '*Learning* counts.', at: 21.6, out: [25.15, 25.45], size: 110 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'sag', text: "last week of the year!!" },
    { t: -8, kind: 'msg', who: 'cap', text: "reflection meeting?" },
    { t: -7, kind: 'msg', who: 'gemini', text: "no. yes. maybe." },
    { t: -6, kind: 'msg', who: 'cancer', text: 'what a year' },
    { t: -4, kind: 'msg', who: 'leo', text: 'best moment of the year. go. (mine: my party outfit)' },
    { t: -2.5, kind: 'sys', who: 'leo', text: 'LEO pinned their own message' },
    { t: 0.8, kind: 'msg', who: 'taurus', text: "grandma's garden tour" },
    { t: 1.9, kind: 'msg', who: 'cap', text: 'said it. (item three)' },
    { t: 3.0, kind: 'msg', who: 'libra', text: 'a saved seat' },
    { t: 4.1, kind: 'msg', who: 'sag', text: 'they cried (good cry)' },
    { t: 5.2, kind: 'msg', who: 'scorpio', text: 'they like me too' },
    { t: 6.3, kind: 'triple', who: 'gemini', parts: [["Taurus: grandma's garden tour", 'same'], ['Libra: a saved seat', 'same'], ['Scorpio: they like me too', 'SAME (for you)']] },
    { t: 7.6, kind: 'voice', who: 'pisces', dur: '0:58', sob: true, play: [7.8, 9.8], react: { t: 8.2, mark: 'tear', n: 11 } },
    { t: 9.95, kind: 'msg', who: 'aries', text: 'mine was a bad year for love honestly.' },
    { t: 11.0, kind: 'msg', who: 'cancer', text: 'oh Aries' },
    { t: 13.9, kind: 'msg', who: 'virgo', hl: true, text: "you learned what you want. that counts. that's a good year." },
    { t: 15.8, kind: 'msg', who: 'aries', text: '…I did learn I want someone who laughs at my jokes' },
    { t: 17.0, kind: 'sys', who: 'leo', text: 'LEO pinned a message (not their own!)' },
    { t: 18.75, kind: 'msg', who: 'aqua', text: 'mine was this chat.', react: { t: 19.25, mark: 'heart', n: 12 } },
    { t: 20.1, kind: 'voice', who: 'pisces', dur: '1:14', sob: true, play: [20.3, 22.6] },
  ],
  pins: [{ t: -2.5, who: 'leo', text: 'best moment of the year. go.' }, { t: 17.0, who: 'aries', text: 'I want someone who laughs at my jokes' }],
  typing: [{ who: 'virgo', a: 11.7, b: 13.85 }, { who: 'aqua', a: 17.8, b: 18.7 }],
  cuts: [9.75, { t: 13.75, kind: 'flip' }, 18.6],
  stage(x, t, K) {
    const F = K.stageStar(x, t, { who: 'leo', x: 230, y: 1730, s: 220, mood: t < 9.9 ? 'sparkle' : t < 13.9 ? 'wide' : 'happy', phone: 1, hops: [-0.2, 0.1, 17.0, 17.25] })
    K.drawProp(x, 'pin', F.ox - F.S * 0.36, F.oy - F.base - F.S * 0.3, F.cell * 1.4, { rot: -0.4 + 0.2 * Math.sin(t * 3) })
    const ak = K.pop01(t, 9.95, 0.35, 2)
    if (ak > 0.01) K.stageStar(x, t, { who: 'aries', x: 560, y: 1760, s: 165, mood: t < 13.9 ? 'neutral' : t < 15.8 ? 'squint' : 'happy', look: t < 13.9 ? [0, 1] : undefined, pop: ak, hops: [9.95, 15.8, 16.05] })
    if (t > 18.75) K.sparkles(x, t, 540, 1700, 18.8, 12, 260, 4)
    K.stageStar(x, t, { who: 'pisces', x: 890, y: 1745, s: 160, mood: t > 13.9 ? 'happy' : 'sparkle', look: [-1, -0.5], tears: t > 20.1 ? 3 : t > 7.6 ? 2 : 1, phone: -1, hops: [7.6, 20.1, 20.4] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
