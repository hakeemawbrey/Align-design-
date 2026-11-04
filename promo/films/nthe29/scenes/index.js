// nthe29: THE THREAD, episode 29, "Forwarded" (18 s vertical, promo/films/next30/b06.md, music: dreamy · Db)
// Story 0–15.6, then the short end card (2.4 s; no card-cut transition). The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Pisces forwarded | their date's voice note."  ♓ Pisces mid-sob, phone to mouth (the poster, centre stage).
//   0.6   ♈ "bracing" · ♏ plays it: "everyone stay calm." It's a song: their date made one up about Pisces' name.
//   4.6   the lyrics (photo) · ♊ triple · Pisces: "is it too much if I tell them I cried?"
//   9.5   ♍ "no. tell them what it meant." (gold)
//  11.0   Pisces sends them a 1-second voice note: "thank you" (sob).  "Happy tears, *sent*."
import { threadFilm, drawProp } from '../../nthe17/scenes/threadkit.js'

function card(x, X, Y, w, h, t) {
  x.fillStyle = '#2a1f45'; x.fillRect(X, Y, w, h)
  x.save(); x.translate(X + w / 2, Y + h / 2); x.rotate(-0.06)
  x.fillStyle = '#fffaf0'; x.fillRect(-150, -80, 300, 160)
  x.strokeStyle = '#2c2a7a'; x.lineWidth = 3
  for (let r = 0; r < 3; r++) { x.beginPath(); for (let i = 0; i <= 20; i++) { const px = -120 + i * 10, py = -40 + r * 34 + 4 * Math.sin(i * 1.3 + r); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
  drawProp(x, 'heart', X + w / 2 + 110, Y + h / 2 + 50, 5)
}
const EP = {
  duration: 18,
  heads: [
    { text: 'Pisces *forwarded* | their date’s voice note.', at: -0.9, out: [3.3, 3.55], size: 84 },
    { text: 'It’s *a song.*', at: 3.6, out: [7.1, 7.35], size: 100 },
    { text: '‘Is it too much | if I *tell them?*’', at: 7.4, out: [9.6, 9.85], size: 84 },
    { text: 'Tell them what it *meant.*', at: 9.9, out: [12.0, 12.25], size: 88 },
    { text: 'Happy tears, *sent.*', at: 12.3, out: [15.1, 15.45], size: 104, late: 1, lateAt: 12.6 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'leo', text: "dessert: me" },
    { t: -8, kind: 'msg', who: 'taurus', text: "I'll bring two desserts" },
    { t: -7, kind: 'msg', who: 'virgo', text: "noted on the sheet" },
    { t: -6, kind: 'msg', who: 'cancer', text: "who's bringing dessert?" },
    { t: -4.5, kind: 'sys', who: 'pisces', text: 'PISCES forwarded a voice note (0:41)' },
    { t: -3, kind: 'voice', who: 'pisces', dur: '0:41', play: [1.9, 4.6] },
    { t: -2, kind: 'msg', who: 'pisces', text: 'from my date. I cannot listen to it again. someone else play it' },
    { t: 0.6, kind: 'msg', who: 'aries', text: 'bracing' },
    { t: 1.3, kind: 'msg', who: 'scorpio', text: 'playing it. everyone stay calm.' },
    { t: 3.6, kind: 'sys', who: 'pisces', gold: true, text: 'it is a SONG. about Pisces. made up.' },
    { t: 4.6, kind: 'photo', who: 'pisces', h: 220, w: 520, pic: card, caption: 'the lyrics: "Pisces, nice is"' },
    { t: 5.9, kind: 'triple', who: 'gemini', parts: [['Pisces: (0:41)', 'aww'], ['Pisces: the lyrics', 'nice is??'], ['Scorpio: everyone stay calm', 'I am not calm']] },
    { t: 7.4, kind: 'msg', who: 'pisces', text: 'is it too much if I tell them I cried?' },
    { t: 9.65, kind: 'msg', who: 'virgo', hl: true, text: 'no. tell them what it meant.' },
    { t: 11.0, kind: 'sys', who: 'pisces', gold: true, text: "PISCES sent them: 'thank you' (0:01, sobbing)", react: null },
    { t: 12.0, kind: 'msg', who: 'cancer', text: "they're a keeper", react: { t: 12.5, mark: 'heart', n: 12 } },
  ],
  typing: [{ who: 'virgo', a: 8.4, b: 9.6 }, { who: 'pisces', a: 10.2, b: 10.95 }],
  cuts: [3.45, { t: 9.5, kind: 'flip' }, 12.2],
  stage(x, t, K) {
    // Pisces, the poster, centre stage: phone to mouth, sobbing
    K.drawProp(x, 'tissue', 760, 1810, 9)
    const mood = t < 3.6 ? 'wide' : t < 7.4 ? 'sparkle' : t < 9.65 ? 'wide' : 'happy'
    K.stageStar(x, t, { who: 'pisces', x: 470, y: 1725, s: 240, mood, tears: t < 9.65 ? 3 : 2, phone: 1, hops: [-0.18, 0.15, 3.6, 7.4, 11.0, 11.25] })
    const sk = K.pop01(t, 1.3, 0.35, 2)
    if (sk > 0.01) K.stageStar(x, t, { who: 'scorpio', x: 870, y: 1755, s: 150, mood: t < 3.6 ? 'squint' : 'wide', pop: sk, phone: -1, tears: t > 4.6 ? 1 : 0, hops: [1.3, 5.9] })
    const ak = K.pop01(t, 0.6, 0.35, 2)
    if (ak > 0.01) K.stageStar(x, t, { who: 'aries', x: 170, y: 1765, s: 140, mood: t < 3.6 ? 'squint' : 'happy', pop: ak, hops: [0.6, 3.7] })
  },
}
EP.items.forEach(it => { if (it.react === null) delete it.react })
export const { DURATION, SCENES, CUES } = threadFilm(EP)
