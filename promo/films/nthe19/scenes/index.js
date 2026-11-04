// nthe19: THE THREAD, episode 19, "No context" (20 s vertical, promo/films/next30/b06.md, music: funk · E)
// Story 0–15.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Sag sent a pin. | No context."  A map pin to a snowy mountain town. ♐ Sag mid-jump, backpack on.
//   0.8   ♊ guesses three places in one bubble · ♏ "who's it for." · Sag: a surprise trip for their person.
//   4.1   ♓ voice note 0:03, sobbing. ♈ "BOOK IT".  "‘Do I just… book it?’"
//   8.9   card cut → 9.0 ♍ "surprise them with the place, not the dates. ask them to keep a weekend free." (gold)
//  10.9   Sag texts them: "free! what for??"  "Keep the *weekend* free."
import { threadFilm, drawBits, drawProp } from '../../nthe17/scenes/threadkit.js'

function mountains(x, X, Y, w, h, t) {
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#3a6ab0'); g.addColorStop(1, '#9fd0f0'); x.fillStyle = g; x.fillRect(X, Y, w, h)
  const peaks = [[0.1, 0.55], [0.32, 0.25], [0.55, 0.45], [0.78, 0.2], [1.0, 0.5]]
  x.fillStyle = '#4a5a8a'; x.beginPath(); x.moveTo(X, Y + h)
  for (const [px, py] of peaks) x.lineTo(X + px * w, Y + py * h)
  x.lineTo(X + w, Y + h); x.closePath(); x.fill()
  x.fillStyle = '#fffaf0'
  for (const [px, py] of peaks) { x.beginPath(); x.moveTo(X + px * w, Y + py * h); x.lineTo(X + px * w - 30, Y + py * h + 34); x.lineTo(X + px * w + 30, Y + py * h + 34); x.closePath(); x.fill() }
  for (let i = 0; i < 14; i++) { const sx = X + ((i * 97 + t * 30) % w), sy = Y + ((i * 53 + t * 60) % h); x.fillRect(sx, sy, 5, 5) }
  const b = Math.abs(Math.sin(t * 4)) * 10
  drawProp(x, 'pin', X + w * 0.56, Y + h * 0.5 - b, 7)
}
const EP = {
  duration: 20,
  heads: [
    { text: 'Sag sent a pin. | *No context.*', at: -0.9, out: [3.0, 3.25], size: 92 },
    { text: 'The chat: *guessing.*', at: 3.3, out: [6.3, 6.55], size: 92 },
    { text: '‘Do I just… *book it?*’', at: 6.6, out: [8.75, 9.0], size: 88 },
    { text: 'Surprise the *place.*', at: 9.1, out: [11.6, 11.85], size: 96 },
    { text: 'Keep the *weekend* free.', at: 11.9, out: [15.1, 15.45], size: 96 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'cancer', text: "who's around this weekend?" },
    { t: -5, kind: 'msg', who: 'leo', text: 'me. always. ask me anything' },
    { t: -4, kind: 'msg', who: 'aqua', text: 'anyone up?' },
    { t: -2, kind: 'photo', who: 'sag', h: 280, pic: mountains },
    { t: 0.8, kind: 'triple', who: 'gemini', parts: [['Sag: (a pin)', 'the mountains?'], ['Sag: (a pin)', 'a snowy cabin?'], ['Aquarius: anyone up?', 'are you MOVING']] },
    { t: 2.2, kind: 'msg', who: 'scorpio', text: "who's it for." },
    { t: 3.3, kind: 'msg', who: 'sag', text: 'a surprise trip for my person. no planes, no early mornings.' },
    { t: 4.1, kind: 'voice', who: 'pisces', dur: '0:03', sob: true, play: [4.3, 5.8], react: { t: 4.8, mark: 'tear', n: 4 } },
    { t: 5.3, kind: 'msg', who: 'aries', text: 'BOOK IT' },
    { t: 6.55, kind: 'msg', who: 'sag', text: 'do I just… book it?' },
    { t: 9.0, kind: 'msg', who: 'virgo', hl: true, text: 'surprise them with the place, not the dates. ask them to keep a weekend free.' },
    { t: 11.0, kind: 'msg', who: 'sag', text: 'texting them now' },
    { t: 11.9, kind: 'msg', who: 'sag', text: "they said 'free! what for??'", react: { t: 12.4, mark: 'heart', n: 10 } },
    { t: 13.0, kind: 'voice', who: 'pisces', dur: '0:07', sob: true, play: [13.2, 14.9] },
  ],
  typing: [{ who: 'virgo', a: 7.2, b: 8.95 }],
  cuts: [6.4, { t: 8.85, kind: 'flip' }, 12.0],
  stage(x, t, K) {
    for (let i = 0; i < 9; i++) { const sx = (i * 131 + t * 25) % 1080, sy = 1520 + ((i * 89 + t * 70) % 380); K.drawProp(x, 'snow', sx, sy, 3, { alpha: 0.6, outline: null }) }
    const mood = t < 3.3 ? 'sparkle' : t < 9.0 ? 'squint' : t < 11.9 ? 'happy' : 'heart'
    const F = K.stageStar(x, t, { who: 'sag', x: 260, y: 1730, s: 230, mood, phone: 1, hops: [-0.2, 0.5, 3.3, 6.55, 11.9, 12.15, 12.4] })
    K.drawProp(x, 'bag', F.ox - F.S * 0.42, F.oy - F.base + F.S * 0.05, F.cell * 1.6, { rot: -0.15 })
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 11.9 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 13 ? 3 : t > 4.1 ? 2 : 1, phone: -1, hops: [4.1, 13.0, 13.3] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
