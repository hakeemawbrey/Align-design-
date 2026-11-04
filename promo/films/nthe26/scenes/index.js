// nthe26: THE THREAD, episode 26, "New season, new me" (23 s vertical, promo/films/next30/b06.md, music: cinematic · Cm)
// Story 0–20.6, then the short end card (2.4 s; no card-cut transition). The look lives in ../../nthe17/scenes/threadkit.js. (No dates on screen.)
//   0.00  "Capricorn: | ‘sharing feelings now.’"  It's Capricorn season. ♑ Capricorn mid-type, stiff as a board.
//   0.8   ♏ "who is this" · ♊ "WHAT / are you ok / screenshotting" · ♓ voice note, sobbing ("they're growing").
//   4.6   feeling 1: meeting their partner's friends this week. Nervous. Capricorn's prep doc: a résumé.
//  10.7   ♍ "bring a question, not a résumé. ask about the things they love." (gold)
//  12.6   "noted. deleting the résumé." → "asked about their dog. three new friends."  "Questions, *not* a résumé."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

function resume(x, X, Y, w, h, t) {
  x.fillStyle = '#2a1f45'; x.fillRect(X, Y, w, h)
  const px = X + w / 2 - 120, py = Y + 18
  x.fillStyle = '#fffaf0'; x.fillRect(px, py, 240, h - 36)
  x.fillStyle = '#2fc79a'; x.fillRect(px, py, 240, 34)
  x.font = "800 20px 'Space Mono', monospace"; x.fillStyle = '#05040c'; x.fillText('RÉSUMÉ · ME', px + 14, py + 24)
  for (let r = 0; r < 7; r++) { x.fillStyle = r % 3 === 0 ? '#5a5f78' : '#b8bdcc'; x.fillRect(px + 16, py + 50 + r * 18, r % 3 === 0 ? 120 : 200, 7) }
}
const EP = {
  duration: 23,
  heads: [
    { text: 'Capricorn: | *‘sharing feelings now.’*', at: -0.9, out: [3.4, 3.65], size: 88 },
    { text: 'The chat: *stunned.*', at: 3.7, out: [6.9, 7.15], size: 96 },
    { text: 'The feeling: *nervous.*', at: 7.2, out: [10.5, 10.75], size: 92 },
    { text: 'Bring a *question.*', at: 10.9, out: [14.6, 14.85], size: 100 },
    { text: 'Update: *three new friends.*', at: 14.9, out: [16.9, 17.15], size: 80, accent: '#9fe6b0' },
    { text: 'Questions, *not* a résumé.', at: 17.2, out: [20.15, 20.45], size: 96, late: 3, lateAt: 17.5 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'cancer', text: "new season, who dis" },
    { t: -8, kind: 'msg', who: 'taurus', text: "is Capricorn ok" },
    { t: -7, kind: 'msg', who: 'aqua', text: "Capricorn is typing a LOT" },
    { t: -6, kind: 'msg', who: 'sag', text: 'passing the keys to Capricorn. be nice' },
    { t: -4, kind: 'sys', gold: true, text: "it's Capricorn season" },
    { t: -2, kind: 'msg', who: 'cap', text: "it's my season. sharing feelings now." },
    { t: 0.8, kind: 'msg', who: 'scorpio', text: 'who is this' },
    { t: 1.7, kind: 'triple', who: 'gemini', parts: [['Capricorn: sharing feelings now', 'WHAT'], ['Capricorn: sharing feelings now', 'are you ok'], ['Scorpio: who is this', 'screenshotting']] },
    { t: 3.0, kind: 'voice', who: 'pisces', dur: '0:07', sob: true, play: [3.2, 5.4], react: { t: 3.6, mark: 'tear', n: 6 } },
    { t: 4.6, kind: 'msg', who: 'cap', text: "feeling 1: meeting my partner's friends this week. nervous." },
    { t: 6.0, kind: 'photo', who: 'cap', h: 220, w: 520, pic: resume, caption: 'my prep doc' },
    { t: 7.4, kind: 'msg', who: 'aries', text: 'is that a RÉSUMÉ' },
    { t: 10.9, kind: 'msg', who: 'virgo', hl: true, text: 'bring a question, not a résumé. ask about the things they love.' },
    { t: 12.6, kind: 'msg', who: 'cap', text: 'noted. deleting the résumé.' },
    { t: 14.9, kind: 'msg', who: 'cap', text: 'asked about their dog. three new friends.', react: { t: 15.4, mark: 'heart', n: 11 } },
    { t: 16.3, kind: 'voice', who: 'pisces', dur: '0:04', sob: true, play: [16.5, 18.0] },
  ],
  typing: [{ who: 'virgo', a: 8.3, b: 10.85 }, { who: 'cap', a: 13.6, b: 14.85 }],
  cuts: [7.0, { t: 10.7, kind: 'flip' }, 16.6],
  stage(x, t, K) {
    const mood = t < 4.6 ? 'neutral' : t < 10.9 ? 'wide' : t < 14.9 ? 'squint' : 'happy'
    const F = K.stageStar(x, t, { who: 'cap', x: 260, y: 1730, s: 230, mood, look: t < 4.6 ? [0.5, -1] : undefined, squash: t < 14.9 ? -0.06 : 0, phone: 1, hops: [-0.2, 4.6, 12.6, 14.9, 15.15, 15.4] })
    if (t > 6 && t < 12.6) K.drawProp(x, 'clip', F.ox - F.S * 0.45, F.oy - F.base, F.cell * 1.5, { rot: -0.15 })
    // three new friends pop up next to Capricorn
    ;['#ffb38a', '#9fe6b0', '#c9a6ff'].forEach((c, i) => { const k = K.pop01(t, 15.0 + i * 0.18, 0.3, 2.2); if (k > 0.01) K.stageStar(x, t, { color: c, seed: 60 + i, x: 450 + i * 110, y: 1780, s: 100, mood: 'happy', pop: k, hops: [15.1 + i * 0.18] }) })
    K.stageStar(x, t, { who: 'pisces', x: 900, y: 1745, s: 160, mood: t > 14.9 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 16.3 ? 3 : t > 3 ? 2 : 1, phone: -1, hops: [3.0, 16.3, 16.6] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
