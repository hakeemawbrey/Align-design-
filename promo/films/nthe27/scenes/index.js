// nthe27: THE THREAD, episode 27, "Sixty photos" (25 s vertical, promo/films/next30/b06.md, music: lofi · Eb)
// Story 0–20.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Sag's back. With photos."  ♐ Sag mid-wave, snow on the backpack. Photo 1 of 60: the mountains (ep 19's pin).
//   0.8   ♋ "WELCOME BACK" · photo: their person, happy-crying · ♓ voice note, sobbing · ♊ triple.
//   6.2   Sag: already planning the next one. "they said they're tired?"  ♈ "next trip: tomorrow"
//  10.7   card cut → ♍ "a quiet night is also a trip. ask what they need." (gold)
//  12.6   "asked. blanket, soup, one film." → "booked. destination: the couch."  "Staying in is *a destination*."
import { threadFilm, drawProp } from '../../nthe17/scenes/threadkit.js'
import { drawStarChar } from '../../startalk.js'

function trip(x, X, Y, w, h, t) {
  const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#3a6ab0'); g.addColorStop(1, '#9fd0f0'); x.fillStyle = g; x.fillRect(X, Y, w, h)
  x.fillStyle = '#4a5a8a'; x.beginPath(); x.moveTo(X, Y + h); x.lineTo(X + w * 0.2, Y + h * 0.35); x.lineTo(X + w * 0.45, Y + h * 0.6); x.lineTo(X + w * 0.75, Y + h * 0.25); x.lineTo(X + w, Y + h * 0.55); x.lineTo(X + w, Y + h); x.closePath(); x.fill()
  x.fillStyle = '#fffaf0'; x.fillRect(X, Y + h * 0.82, w, h * 0.18)
  drawStarChar(x, X + w * 0.35, Y + h * 0.68, 110, t, { color: '#a35cf0', mood: 'happy', seed: 51, glow: 0.4 })
  drawStarChar(x, X + w * 0.62, Y + h * 0.68, 110, t, { color: '#ffb38a', mood: 'sparkle', seed: 52, glow: 0.4 })
}
function cry(x, X, Y, w, h, t) {
  x.fillStyle = '#2a1f45'; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 12; i++) drawProp(x, 'snow', X + ((i * 73 + t * 20) % w), Y + ((i * 41 + t * 50) % h), 3, { outline: null, alpha: 0.6 })
  drawStarChar(x, X + w / 2, Y + h * 0.55, 170, t, { color: '#ffb38a', mood: 'happy', seed: 52, glow: 0.5 })
}
const EP = {
  duration: 25,
  heads: [
    { text: 'Sag’s back. *With photos.*', at: -0.9, out: [3.4, 3.65], size: 92 },
    { text: 'The surprise: *worked.*', at: 3.7, out: [7.3, 7.55], size: 92 },
    { text: '‘They said they’re | *tired?*’', at: 7.6, out: [10.6, 10.85], size: 92 },
    { text: 'A quiet night is | *also* a trip.', at: 10.9, out: [14.6, 14.85], size: 88 },
    { text: 'Blanket. Soup. *Booked.*', at: 14.9, out: [16.9, 17.15], size: 92, accent: '#9fe6b0' },
    { text: 'Staying in is *a destination.*', at: 17.2, out: [20.15, 20.45], size: 88, late: 2, lateAt: 17.5 },
  ],
  items: [
    { t: -8, kind: 'msg', who: 'leo', text: "SAG. photos. now." },
    { t: -6, kind: 'msg', who: 'cancer', text: 'is Sag back yet??' },
    { t: -4, kind: 'sys', who: 'sag', gold: true, text: 'SAG is back from the surprise trip' },
    { t: -2, kind: 'photo', who: 'sag', h: 240, w: 540, pic: trip, caption: 'photo 1 of 60' },
    { t: 0.8, kind: 'msg', who: 'cancer', text: 'WELCOME BACK' },
    { t: 1.7, kind: 'photo', who: 'sag', h: 220, w: 520, pic: cry, caption: 'they cried (good cry)' },
    { t: 3.2, kind: 'voice', who: 'pisces', dur: '0:06', sob: true, play: [3.4, 5.4], react: { t: 3.8, mark: 'tear', n: 7 } },
    { t: 4.6, kind: 'triple', who: 'gemini', parts: [['Sag: photo 1 of 60', 'send all 60'], ['Sag: they cried (good cry)', 'good cry!!'], ['Cancer: WELCOME BACK', 'welcome back!!']] },
    { t: 6.2, kind: 'msg', who: 'sag', text: "already planning the next one. they said they're tired?" },
    { t: 7.6, kind: 'msg', who: 'aries', text: 'next trip: tomorrow' },
    { t: 10.9, kind: 'msg', who: 'virgo', hl: true, text: 'a quiet night is also a trip. ask what they need.' },
    { t: 12.6, kind: 'msg', who: 'sag', text: 'asked. they want a blanket, soup, one film.' },
    { t: 14.9, kind: 'msg', who: 'sag', text: 'booked. destination: the couch.', react: { t: 15.4, mark: 'heart', n: 12 } },
    { t: 16.2, kind: 'voice', who: 'pisces', dur: '0:03', sob: true, play: [16.4, 17.9] },
  ],
  typing: [{ who: 'virgo', a: 8.6, b: 10.85 }, { who: 'sag', a: 13.7, b: 14.85 }],
  cuts: [6.0, { t: 10.7, kind: 'flip' }, 16.6],
  stage(x, t, K) {
    const mood = t < 6.2 ? 'happy' : t < 10.9 ? 'sparkle' : t < 14.9 ? 'neutral' : 'heart'
    const blanket = t > 14.9
    if (blanket) K.drawProp(x, 'blanket', 270, 1810, 22 * K.pop01(t, 14.9, 0.35, 2))
    const F = K.stageStar(x, t, { who: 'sag', x: 260, y: 1725, s: 230, mood, phone: blanket ? 0 : 1, hops: [-0.2, 0.1, 0.4, 6.2, 12.6, 14.9, 15.15] })
    if (!blanket) {
      K.drawProp(x, 'bag', F.ox - F.S * 0.42, F.oy - F.base + F.S * 0.05, F.cell * 1.6, { rot: -0.15 })
      K.drawProp(x, 'snow', F.ox - F.S * 0.42, F.oy - F.base - F.S * 0.12, F.cell * 0.8, { outline: null })
    } else K.drawProp(x, 'pot', 520, 1800, 7)
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 14.9 ? 'happy' : 'sparkle', look: [-1, -0.5], tears: t > 16.2 ? 3 : t > 1.7 ? 2 : 1, phone: -1, hops: [1.7, 3.2, 16.2, 16.5] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
