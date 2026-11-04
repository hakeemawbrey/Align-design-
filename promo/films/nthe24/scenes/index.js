// nthe24: THE THREAD, episode 24, "The coat room" (28 s vertical, promo/films/next30/b06.md, music: synthwave · F#m)
// Story 0–25.6, then the short end card (2.4 s; no card-cut transition). The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Libra's texting | from the coat room."  ♎ Libra peeking out from behind a rail of coats, phone up.
//         It's Libra's own party; their date (from episode 17) is talking to Libra's work friends. Libra is nervous.
//   1.0   ♈ "go stand next to them" · ♏ "are they having fun? look." · Libra peeks: a photo of the party, the plus one
//         laughing. ♓ voice note from home, sobbing. ♊ triple. Libra: "what if they're fine without me?"
//  12.2   ♍ "go back out. bring them some water, check in with a smile." (gold)
//  14.4   Libra goes (steps out from the coats). ♑ "status update please."
//  17.4   "they saved me a seat. next to them. with my name on a napkin."  "Saved *a seat*."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'
import { drawStarChar } from '../../startalk.js'

function party(x, X, Y, w, h, t) {
  x.fillStyle = '#3a2a6a'; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 9; i++) { x.fillStyle = ['#f2c75c', '#ff8fb1', '#8fd8f6'][i % 3]; x.beginPath(); x.arc(X + 30 + i * (w - 60) / 8, Y + 26 + 10 * Math.sin(i * 1.3), 8, 0, Math.PI * 2); x.fill() }
  x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 2; x.beginPath(); x.moveTo(X, Y + 20); x.quadraticCurveTo(X + w / 2, Y + 60, X + w, Y + 20); x.stroke()
  drawStarChar(x, X + w * 0.25, Y + h * 0.62, 120, t, { color: '#ffb38a', mood: 'happy', seed: 41, glow: 0.5, hops: [t - (t % 0.9)] })
  drawStarChar(x, X + w * 0.55, Y + h * 0.66, 110, t, { color: '#9fe6b0', mood: 'happy', seed: 42, glow: 0.5 })
  drawStarChar(x, X + w * 0.8, Y + h * 0.64, 110, t, { color: '#c9a6ff', mood: 'wink', seed: 43, glow: 0.5 })
}
const EP = {
  duration: 28,
  heads: [
    { text: 'Libra’s texting | from *the coat room.*', at: -0.9, out: [3.8, 4.05], size: 88 },
    { text: 'The plus one is *mingling.*', at: 4.1, out: [8.3, 8.55], size: 86 },
    { text: '‘What if they’re fine | *without me?*’', at: 8.6, out: [12.0, 12.25], size: 80 },
    { text: 'Go back out. *Check in.*', at: 12.4, out: [17.1, 17.35], size: 88 },
    { text: 'Plot twist: *a seat.*', at: 17.4, out: [21.0, 21.25], size: 96, accent: '#ff8fb1' },
    { text: 'Saved *a seat.*', at: 21.3, out: [25.15, 25.45], size: 110, late: 2, lateAt: 21.6 },
  ],
  items: [
    { t: -7, kind: 'msg', who: 'cancer', text: 'has anyone seen the host?' },
    { t: -6, kind: 'msg', who: 'leo', text: "I'm at the snack table. it's great" },
    { t: -5, kind: 'msg', who: 'aqua', text: 'Libra where did you go' },
    { t: -3, kind: 'msg', who: 'libra', text: 'hiding in the coat room. hi' },
    { t: -1.5, kind: 'msg', who: 'libra', text: "my date is talking to my work friends. I'm nervous." },
    { t: 1.0, kind: 'msg', who: 'aries', text: 'go stand next to them' },
    { t: 2.2, kind: 'msg', who: 'scorpio', text: 'are they having fun? look.' },
    { t: 3.4, kind: 'msg', who: 'libra', text: 'peeking…' },
    { t: 4.6, kind: 'photo', who: 'libra', h: 250, pic: party, caption: "they're laughing??" },
    { t: 6.4, kind: 'voice', who: 'pisces', dur: '0:05', sob: true, play: [6.65, 8.4], react: { t: 7.0, mark: 'tear', n: 3 } },
    { t: 7.8, kind: 'triple', who: 'gemini', parts: [['Libra: peeking…', 'what do you see'], ['Aquarius: Libra where did you go', 'the COAT ROOM'], ["Libra: I'm nervous", "you're in a coat room"]] },
    { t: 9.2, kind: 'msg', who: 'libra', text: "what if they're fine without me?" },
    { t: 12.45, kind: 'msg', who: 'virgo', hl: true, text: 'go back out. bring them some water, check in with a smile.' },
    { t: 14.4, kind: 'msg', who: 'libra', text: 'going.' },
    { t: 15.6, kind: 'msg', who: 'cap', text: 'agenda item: status update please' },
    { t: 17.4, kind: 'msg', who: 'libra', text: 'they saved me a seat. next to them. my name on a napkin.', react: { t: 18.0, mark: 'heart', n: 11 } },
    { t: 19.0, kind: 'voice', who: 'pisces', dur: '0:12', sob: true, play: [19.2, 21.6] },
    { t: 20.7, kind: 'sys', who: 'libra', gold: true, text: 'LIBRA left the coat room' },
  ],
  typing: [{ who: 'virgo', a: 10.3, b: 12.4 }, { who: 'libra', a: 16.4, b: 17.35 }],
  cuts: [8.4, { t: 12.2, kind: 'flip' }, 17.2],
  stage(x, t, K) {
    // the coat rail
    x.fillStyle = '#8a7aa8'; x.fillRect(70, 1560, 380, 8); x.fillRect(74, 1560, 8, 300); x.fillRect(442, 1560, 8, 300)
    const go = K.pop01(t, 14.4, 1.0, 1.2)
    const lx = 470 + 160 * Math.min(1, go)
    const mood = t < 4.6 ? 'wide' : t < 9.2 ? 'sparkle' : t < 12.45 ? 'squint' : t < 17.4 ? 'neutral' : 'heart'
    K.stageStar(x, t, { who: 'libra', x: lx, y: 1735, s: 220, mood, look: t < 14.4 ? [-1, 0] : undefined, phone: 1, hops: [-0.18, 3.4, 9.2, 14.4, 14.7, 15.0, 17.4, 17.65] })
    // coats in front of Libra (they hide less once Libra steps out)
    for (let i = 0; i < 3; i++) K.drawProp(x, 'coat', 140 + i * 120, 1640 + (i % 2) * 6, 11, { rot: 0.04 * Math.sin(t * 2 + i) })
    if (t > 17.4) K.sparkles(x, t, lx, 1650, 17.45, 10, 150, 2, ['#ff4f86', '#efe6d6', '#f2c75c'])
    K.drawProp(x, 'blanket', 900, 1830, 9)
    K.stageStar(x, t, { who: 'pisces', x: 900, y: 1740, s: 160, mood: t > 17.4 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 19 ? 3 : t > 6.4 ? 2 : 1, phone: -1, hops: [6.4, 19.0, 19.3] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
