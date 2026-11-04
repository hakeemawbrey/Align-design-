// nthe06: THE THREAD, episode 6, "The Secret Gift Exchange" (25 s vertical, promo/films/next30/b05.md row 6, music: lofi · F).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Capricorn wrote *gift exchange rules.*"  The rules: names drawn tonight · small budget · no peeking (Scorpio).
//   1.4   Scorpio: "I don't peek. I *sense.*"  Names drawn: Gemini drew itself. Twice.
//   6.9   card cut: Taurus: "gift for someone I've been seeing for 3 weeks?"  Leo: your face. Libra: two scarves.
//   11.0  Virgo: small and specific, something that says "I listened."  Taurus: their hands get cold → mittens.  16.7 last line.
import { makeThread, drawBits } from '../../nthe01/chatkit.js'

const CAP = '#2fc79a'
const MITT = ['..MMM...', '.MMMMM..', '.MMMMM.T', '.MMMMMTT', '.MMMMMMT', '.MMMMMM.', '.MMMMMM.', '.WWWWWW.', '.WWWWWW.']
function mittens(x, t, w, h, m) {
  x.fillStyle = '#2a2056'; x.fillRect(0, 0, w, h)
  for (let i = 0; i < 18; i++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect((i * 97) % w, ((i * 53 + t * 40) % h), 4, 4) }
  const k = Math.min(1, Math.max(0, (t - m.at - 0.2) / 0.3))
  drawBits(x, MITT, { M: '#e9b24a', T: '#e9b24a', W: '#efe6d6' }, w / 2 - 80, h / 2 + 4, 16 * k, { rot: -0.15 + 0.04 * Math.sin(t * 3) })
  drawBits(x, MITT.map(r => [...r].reverse().join('')), { M: '#e9b24a', T: '#e9b24a', W: '#efe6d6' }, w / 2 + 80, h / 2 + 4, 16 * k, { rot: 0.15 - 0.04 * Math.sin(t * 3) })
}
const EP = makeThread({
  id: 'nthe06', duration: 25, chat: "ARIES'S CHAT!!", cut: 6.9,
  heads: [
    { at: -1, text: 'Capricorn wrote | *gift exchange rules.*', accent: CAP },
    { at: 3.3, text: 'Gemini drew… | *Gemini.*', accent: '#f2cf4a' },
    { at: 7.0, text: 'Taurus has | *a side question.*', accent: '#e9b24a' },
    { at: 11.0, text: 'Virgo gets | *specific.*' },
    { at: 14.2, text: '*Mittens.*', accent: '#e9b24a' },
  ],
  last: { at: 16.7, text: 'The best gift says | *"I was listening."*' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }]],
  msgs: [
    { at: -1, kind: 'agenda', from: 'capricorn', title: 'SECRET GIFT EXCHANGE: RULES', gap: 0.2, items: ['names drawn tonight', 'small budget', { text: 'no peeking (Scorpio)', hi: true }] },
    { at: 1.4, from: 'scorpio', text: "I don't peek. I *sense.*", react: [[1.9, 'ha', 5]] },
    { at: 2.8, kind: 'system', text: 'names drawn · 12 of 12' },
    { at: 3.4, from: 'gemini', text: 'I drew *myself??*', big: true },
    { at: 4.6, from: 'capricorn', text: 'redraw.' },
    { at: 5.4, from: 'gemini', text: 'I drew myself *AGAIN*', react: [[5.9, 'ha', 9]] },
    { at: 7.0, kind: 'divider', text: 'LATER' },
    { at: 7.2, from: 'taurus', text: "side q. gift for someone I've been seeing for *3 weeks?*" },
    { at: 8.8, from: 'leo', text: 'something with your face on it', react: [[9.3, 'ha', 4]] },
    { at: 9.8, from: 'libra', text: "a scarf? two scarves? I can't pick" },
    { at: 11.0, from: 'virgo', text: "small and specific. something that says *'I listened.'*", big: true },
    { at: 13.0, from: 'taurus', text: 'they said their hands get cold on walks…' },
    { at: 14.2, kind: 'image', from: 'taurus', w: 520, h: 230, draw: mittens, react: [[14.8, 'heart', 10]] },
    { at: 15.4, kind: 'voice', from: 'pisces', dur: '0:33', note: '(sobbing: MITTENS)' },
  ],
  stage: [
    { at: -1, sign: 'capricorn', mood: 'neutral', look: [1, -0.6] },
    { at: 1.4, sign: 'scorpio', mood: 'squint', look: [0, 0] },
    { at: 3.4, sign: 'gemini', mood: 'wide', look: [0, 0] },
    { at: 4.6, sign: 'capricorn', mood: 'eyeroll' },
    { at: 5.4, sign: 'gemini', mood: 'wide', look: [0, 0], hops: [5.6] },
    { at: 7.2, sign: 'taurus', mood: 'neutral', look: [1, -1] },
    { at: 8.8, sign: 'leo', mood: 'sparkle', look: [0, 0] },
    { at: 9.8, sign: 'libra', mood: 'wide' },
    { at: 11.0, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 13.0, sign: 'taurus', mood: 'happy' },
    { at: 14.2, sign: 'taurus', mood: 'heart', look: [0, 0] },
  ],
  cry: [[-1, 1], [14.3, 2], [15.4, 3]],
  pisMood: [[3.4, 'wide'], [7.2, 'sparkle'], [15.4, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
