// nthe18: THE THREAD, episode 18, "Family on video" (25 s vertical, promo/films/next30/b06.md, music: lofi · Bb)
// Story 0–20.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Taurus has to meet the family. | On video."  ♉ Taurus mid-hop, phone up. The call is in ten minutes.
//   0.8   ♈ "just be loud", ♑ an AGENDA (smile · compliment the food · ask one question), ♌ pins its own tip,
//         ♓ voice note 0:05 sobbing, ♏ "the grandma decides."
//   7.9   "‘What if they don't like me?’"  card cut 10.6 → ♍ "they're nervous too. ask about THEM." (gold)
//  12.2   the call starts (a little video window on the stage: a grandma star and her plants). ♊ triple reply.
//  14.6   "grandma showed me every plant in her garden. we're best friends." The agenda ticks itself off.
//  16.9   "Grandma *approved*."
import { threadFilm, drawBits, drawProp } from '../../nthe17/scenes/threadkit.js'
import { drawStarChar } from '../../startalk.js'

const PLANT = [['..L.L..', '.LLLLL.', 'LL.L.LL', '..LLL..', '...L...', 'PPPPPPP', '.PPPPP.', '.PPPPP.'], { L: '#5fd38a', P: '#c9783a' }]
const EP = {
  duration: 25,
  heads: [
    { text: 'Taurus has to meet the family. | *On video.*', at: -0.9, out: [3.6, 3.85], size: 76 },
    { text: 'The chat: *preparing.*', at: 3.9, out: [7.6, 7.85], size: 92 },
    { text: '‘What if they don’t | *like me?*’', at: 7.9, out: [10.4, 10.65], size: 84 },
    { text: 'Ask about *them.*', at: 10.9, out: [14.3, 14.55], size: 96 },
    { text: 'Update: *best friends.*', at: 14.6, out: [16.6, 16.85], size: 88, accent: '#9fe6b0' },
    { text: 'Grandma *approved.*', at: 16.9, out: [20.15, 20.45], size: 104, late: 1, lateAt: 17.15 },
  ],
  items: [
    { t: -5, kind: 'msg', who: 'taurus', text: "my date's family is on a video call tonight" },
    { t: -4, kind: 'msg', who: 'taurus', text: 'and they want to say hi. in ten minutes.' },
    { t: -2, kind: 'msg', who: 'cancer', text: 'aww!!' },
    { t: 0.8, kind: 'msg', who: 'aries', text: 'just be loud. families love loud' },
    { t: 1.9, kind: 'agenda', who: 'cap', rows: ['1. smile', '2. compliment the food', '3. ask one question'] },
    { t: 3.0, kind: 'msg', who: 'leo', text: 'wear something gold. trust me' },
    { t: 3.55, kind: 'sys', who: 'leo', text: 'LEO pinned their own message' },
    { t: 4.4, kind: 'voice', who: 'pisces', dur: '0:05', sob: true, play: [4.7, 6.4], react: { t: 5.2, mark: 'tear', n: 2 } },
    { t: 6.0, kind: 'msg', who: 'scorpio', text: 'watch the grandma. the grandma decides.' },
    { t: 7.95, kind: 'msg', who: 'taurus', text: "what if they don't like me" },
    { t: 10.75, kind: 'msg', who: 'virgo', hl: true, text: "they're nervous too. ask about THEM." },
    { t: 12.2, kind: 'sys', who: 'taurus', gold: true, text: 'TAURUS joined a video call' },
    { t: 13.3, kind: 'triple', who: 'gemini', parts: [['Taurus: joined a video call', 'how is it going'], ['Aries: just be loud', 'do NOT be loud'], ['Cancer: aww!!', 'aww!!']] },
    { t: 14.6, kind: 'msg', who: 'taurus', text: "grandma showed me every plant in her garden. we're best friends.", react: { t: 15.2, mark: 'heart', n: 9 } },
    { t: 16.1, kind: 'voice', who: 'pisces', dur: '0:11', sob: true, play: [16.3, 18.6] },
  ],
  pins: [{ t: 3.55, who: 'leo', text: 'wear something gold. trust me' }],
  typing: [{ who: 'taurus', a: 7.0, b: 7.9 }, { who: 'virgo', a: 8.6, b: 10.7 }],
  cuts: [7.75, { t: 10.6, kind: 'flip' }, 16.4],
  stage(x, t, K) {
    // the video call window
    const ck = K.pop01(t, 12.2, 0.35, 1.8)
    if (ck > 0.01) {
      x.save(); x.translate(610, 1660); x.scale(ck, ck)
      x.fillStyle = '#05040c'; x.fillRect(-150, -112, 300, 224); x.fillStyle = '#2a4a3a'; x.fillRect(-142, -104, 284, 208)
      for (let i = 0; i < 3; i++) drawBits(x, PLANT[0], PLANT[1], -100 + i * 100, 60 + (i % 2) * 6, 5)
      x.restore()
      drawStarChar(x, 610, 1640, 120 * ck, t, { color: '#c9a6ff', mood: t > 14.4 ? 'heart' : 'happy', seed: 31, glow: 0.6, hops: [13.0, 13.6, 14.3, 14.7] })
      if (ck > 0.9) { x.fillStyle = '#ff5c7a'; x.beginPath(); x.arc(484, 1570, 7, 0, Math.PI * 2); x.fill(); x.font = `700 18px ${K.MONO}`; x.fillStyle = K.BONE; x.fillText('GRANDMA · LIVE', 498, 1577) }
    }
    const mood = t < 7.9 ? 'wide' : t < 10.75 ? 'squint' : t < 14.6 ? 'happy' : 'heart'
    K.stageStar(x, t, { who: 'taurus', x: 250, y: 1730, s: 230, mood, look: t < 12.2 ? [0.6, -1] : [1, 0], phone: 1, hops: [-0.18, 7.95, 8.25, 12.2, 14.6, 14.85, 15.1] })
    if (t > 14.6) K.sparkles(x, t, 250, 1650, 14.65, 10, 150, 2)
    K.stageStar(x, t, { who: 'pisces', x: 900, y: 1745, s: 160, mood: t > 14.6 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 16.1 ? 3 : t > 4.4 ? 2 : 1, phone: -1, hops: [4.4, 16.1, 16.4] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
