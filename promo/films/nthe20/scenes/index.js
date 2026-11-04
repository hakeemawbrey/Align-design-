// nthe20: THE THREAD, episode 20, "Any other business" (25 s vertical, promo/films/next30/b06.md, music: jazzy · F)
// Story 0–20.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Capricorn added an agenda to the group chat."  ♑ Capricorn mid-hop, clipboard up. AGENDA: party budget ·
//         gift exchange rules · feelings (5 min).
//   0.9   ♈ "no budget. vibes." (tick) · ♒ "mystery gifts, no rules" (tick) · ♎ "item 3??"
//   4.4   Capricorn: their partner said "I love you" first. Capricorn replied "noted." ♓ voice note, sobbing. ♊ triple.
//  10.9   card cut → ♍ "tell them what 'noted' meant. it's fixable." (gold)
//  14.9   "said it back. minuted." item 3 ticks. ♌ pins it (not their own, for once).  "Item three: *said it*."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

const EP = {
  duration: 25,
  heads: [
    { text: 'Capricorn added an *agenda* | to the group chat.', at: -0.9, out: [3.5, 3.75], size: 76 },
    { text: 'Item three: *feelings.*', at: 3.8, out: [7.4, 7.65], size: 90 },
    { text: '‘I said… *noted.*’', at: 7.7, out: [10.6, 10.85], size: 100 },
    { text: 'It’s *fixable.*', at: 11.0, out: [14.6, 14.85], size: 100 },
    { text: 'Update: *minuted.*', at: 14.9, out: [16.6, 16.85], size: 96, accent: '#9fe6b0' },
    { text: 'Item three: *said it.*', at: 16.9, out: [20.15, 20.45], size: 100, late: 2, lateAt: 17.2 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'taurus', text: 'snacks at the party?' },
    { t: -5, kind: 'msg', who: 'gemini', text: 'yes yes yes' },
    { t: -4, kind: 'msg', who: 'leo', text: "who's ready for party season" },
    { t: -2, kind: 'agenda', who: 'cap', rows: ['1. party budget', '2. gift exchange rules', '3. feelings (5 min)'], ticks: [1.5, 2.7, 15.3] },
    { t: 0.9, kind: 'msg', who: 'aries', text: 'item 1: no budget. vibes.' },
    { t: 2.0, kind: 'msg', who: 'aqua', text: 'item 2: mystery gifts. no rules.' },
    { t: 3.4, kind: 'msg', who: 'libra', text: 'item 3??' },
    { t: 4.4, kind: 'msg', who: 'cap', text: "my partner said 'I love you' first." },
    { t: 5.6, kind: 'msg', who: 'cap', text: "I replied 'noted.'" },
    { t: 6.4, kind: 'voice', who: 'pisces', dur: '0:06', sob: true, play: [6.65, 8.4], react: { t: 7.0, mark: '!!', n: 11 } },
    { t: 7.8, kind: 'triple', who: 'gemini', parts: [['Capricorn: noted.', 'NOTED??'], ['Capricorn: noted.', 'like a memo??'], ['Leo: party season', 'yes hi']] },
    { t: 11.0, kind: 'msg', who: 'virgo', hl: true, text: "tell them what 'noted' meant. it's fixable." },
    { t: 12.6, kind: 'msg', who: 'cap', text: "it meant 'me too.' I panicked." },
    { t: 13.6, kind: 'msg', who: 'cancer', text: 'then say THAT!!' },
    { t: 14.9, kind: 'msg', who: 'cap', text: 'said it back. minuted.', react: { t: 15.5, mark: 'heart', n: 11 } },
    { t: 16.1, kind: 'sys', who: 'leo', text: 'LEO pinned a message (not their own!)' },
    { t: 17.6, kind: 'voice', who: 'pisces', dur: '0:04', sob: true, play: [17.8, 19.4] },
  ],
  pins: [{ t: 16.1, who: 'cap', text: 'said it back. minuted.' }],
  typing: [{ who: 'virgo', a: 9.0, b: 10.95 }, { who: 'cap', a: 13.9, b: 14.85 }],
  cuts: [7.55, { t: 10.85, kind: 'flip' }, 16.8],
  stage(x, t, K) {
    const mood = t < 4.4 ? 'neutral' : t < 11 ? 'wide' : t < 14.9 ? 'squint' : 'heart'
    const F = K.stageStar(x, t, { who: 'cap', x: 260, y: 1730, s: 230, mood, look: t < 4.4 ? [0.6, -1] : undefined, squash: t < 14.9 ? -0.04 : 0, hops: [-0.2, 4.4, 5.6, 14.9, 15.15, 15.4] })
    K.drawProp(x, 'clip', F.ox + F.S * 0.44, F.oy - F.base, F.cell * 1.7, { rot: 0.12 + 0.04 * Math.sin(t * 3) })
    if (t > 14.9) K.sparkles(x, t, 260, 1650, 14.95, 10, 150, 3, ['#ff4f86', '#efe6d6', '#f2c75c'])
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 14.9 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 17.6 ? 3 : t > 6.4 ? 2 : 1, phone: -1, hops: [6.4, 17.6, 17.9] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
