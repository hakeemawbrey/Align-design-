// nthe25: THE THREAD, episode 25, "Gift reveals" (25 s vertical, promo/films/next30/b06.md, music: funk · Bb)
// Story 0–20.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Gift exchange: | the reveals."  ♒ Aquarius mid-unwrap, paper flying. ♉ posts socks from ♊.
//   0.8   ♊ "do you like them / they are warm / there is a second pair" · ♉ wears both pairs at once.
//   3.4   ♒ posts a lamp shaped like ♌. ♓ voice note, sobbing (the socks). ♌ "you're welcome".
//   7.3   "‘How do I *react?*’"  card cut 10.7 → ♍ "thank them for the thought. the thought is real." (gold)
//  12.6   ♌ "the thought was me." ♒ thanks them for real; "ok it's growing on me". ♌ pins the lamp.
//  17.2   "Thank *the thought*."
import { threadFilm, drawProp } from '../../nthe17/scenes/threadkit.js'

function socks(x, X, Y, w, h, t) {
  x.fillStyle = '#3a2a6a'; x.fillRect(X, Y, w, h)
  drawProp(x, 'sock', X + w * 0.35, Y + h / 2, 16, { rot: -0.2 })
  drawProp(x, 'sock', X + w * 0.65, Y + h / 2 + 6, 16, { rot: 0.2, sx: -1 })
}
function lamp(x, X, Y, w, h, t) {
  x.fillStyle = '#2a1f45'; x.fillRect(X, Y, w, h)
  const g = x.createRadialGradient(X + w / 2, Y + h * 0.4, 0, X + w / 2, Y + h * 0.4, w * 0.5); g.addColorStop(0, 'rgba(255,226,122,0.55)'); g.addColorStop(1, 'rgba(255,226,122,0)')
  x.fillStyle = g; x.fillRect(X, Y, w, h)
  drawProp(x, 'lamp', X + w / 2, Y + h / 2, 22)
  // the lamp has Leo's face
  x.fillStyle = '#1b1236'; x.fillRect(X + w / 2 - 34, Y + h / 2 - 70, 14, 18); x.fillRect(X + w / 2 + 20, Y + h / 2 - 70, 14, 18)
}
const EP = {
  duration: 25,
  heads: [
    { text: 'Gift exchange: | *the reveals.*', at: -0.9, out: [3.4, 3.65], size: 92 },
    { text: 'Socks. *Many* socks.', at: 3.7, out: [6.9, 7.15], size: 96 },
    { text: '‘How do I *react?*’', at: 7.3, out: [10.6, 10.85], size: 96 },
    { text: 'The thought is *real.*', at: 10.9, out: [14.9, 15.15], size: 92 },
    { text: 'It’s *growing* on them.', at: 15.2, out: [16.9, 17.15], size: 88, accent: '#9fe6b0' },
    { text: 'Thank *the thought.*', at: 17.2, out: [20.15, 20.45], size: 104, late: 2, lateAt: 17.5 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'leo', text: "my gift is the best one. obviously" },
    { t: -8, kind: 'msg', who: 'virgo', text: "it's not a competition" },
    { t: -7, kind: 'msg', who: 'gemini', text: "it is a little bit" },
    { t: -6, kind: 'msg', who: 'cancer', text: 'everyone open your gifts!!' },
    { t: -4, kind: 'sys', gold: true, text: 'GIFT EXCHANGE: reveal time' },
    { t: -2, kind: 'photo', who: 'taurus', h: 220, w: 520, pic: socks, caption: 'socks from Gemini' },
    { t: 0.8, kind: 'triple', who: 'gemini', parts: [['Taurus: socks from Gemini', 'do you like them'], ['Taurus: socks from Gemini', 'they are warm'], ['Taurus: socks from Gemini', 'there is a second pair']] },
    { t: 2.2, kind: 'msg', who: 'taurus', text: 'wearing both pairs. at once.' },
    { t: 3.4, kind: 'photo', who: 'aqua', h: 240, w: 520, pic: lamp, caption: '…a lamp shaped like Leo' },
    { t: 4.8, kind: 'voice', who: 'pisces', dur: '0:06', sob: true, play: [5.05, 6.8], react: { t: 5.4, mark: 'tear', n: 4 } },
    { t: 6.0, kind: 'msg', who: 'leo', text: "you're welcome" },
    { t: 7.3, kind: 'msg', who: 'aqua', text: 'how do I react to a lamp of Leo??' },
    { t: 10.9, kind: 'msg', who: 'virgo', hl: true, text: 'thank them for the thought. the thought is real.' },
    { t: 12.6, kind: 'msg', who: 'leo', text: 'the thought was me. thinking of me.' },
    { t: 13.7, kind: 'msg', who: 'aqua', text: 'thank you, Leo. truly. it lights up my desk.' },
    { t: 15.2, kind: 'msg', who: 'aqua', text: "ok it's growing on me", react: { t: 15.7, mark: 'heart', n: 12 } },
    { t: 16.2, kind: 'sys', who: 'leo', text: 'LEO pinned their own lamp' },
    { t: 17.6, kind: 'voice', who: 'pisces', dur: '0:03', sob: true, play: [17.8, 19.3] },
  ],
  pins: [{ t: 16.2, who: 'leo', text: '(a photo of the lamp. it is me.)' }],
  typing: [{ who: 'virgo', a: 8.4, b: 10.85 }],
  cuts: [7.15, { t: 10.7, kind: 'flip' }, 17.0],
  stage(x, t, K) {
    // wrapping paper bits flying off at the start
    for (let i = 0; i < 10; i++) { const a = i * 0.63, d = (t + 0.6) * (220 + 40 * (i % 3)); if (t < 1.6) { x.fillStyle = ['#5fd38a', '#ff5c7a', '#f2c75c'][i % 3]; x.fillRect(270 + Math.cos(a) * d, 1650 + Math.sin(a) * d * 0.6 + 120 * (t + 0.6) ** 2, 18, 12) } }
    const lk = K.pop01(t, 3.4, 0.35, 2)
    if (lk > 0.01) { const g = x.createRadialGradient(560, 1700, 0, 560, 1700, 160); g.addColorStop(0, `rgba(255,226,122,${0.3 * lk})`); g.addColorStop(1, 'rgba(255,226,122,0)'); x.fillStyle = g; x.fillRect(400, 1540, 320, 320); K.drawProp(x, 'lamp', 560, 1730, 10 * lk) }
    const mood = t < 3.4 ? 'sparkle' : t < 7.3 ? 'wide' : t < 10.9 ? 'squint' : t < 15.2 ? 'neutral' : 'happy'
    const F = K.stageStar(x, t, { who: 'aqua', x: 260, y: 1730, s: 230, mood, phone: t > 3 ? 1 : 0, hops: [-0.2, 0.2, 3.4, 7.3, 13.7, 15.2, 15.45] })
    if (t < 3) K.drawProp(x, 'gift', F.ox + F.S * 0.4, F.oy - F.base, F.cell * 1.6, { rot: 0.2 * Math.sin(t * 8) })
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 15.2 ? 'happy' : 'sparkle', look: [-1, -0.5], tears: t > 17.6 ? 3 : t > 4.8 ? 2 : 1, phone: -1, hops: [4.8, 17.6, 17.9] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
