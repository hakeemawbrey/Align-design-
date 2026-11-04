// nthe03: THE THREAD, episode 3, "Sag Is Planning a Surprise" (25 s vertical, promo/films/next30/b05.md row 3, music: funk · E).
// Story 0–20.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Sag is planning a *surprise trip.*"  ♐ Sag mid-leap with a duffel bag.
//   1.0   Capricorn: "itinerary?"  Sag: "vibes."  Virgo's packing list; Gemini answers three at once.
//   7.4   card cut: Virgo: "do they *like* surprises?"  Sag asks. "love them. hate planes. hate early mornings."
//   13.8  Sag: "cancelling the 5am flight". Pisces' voice note.  16.6 last line.
import { makeThread, shot, box, R, INK } from '../../nthe01/chatkit.js'

const SAG = '#a35cf0'
// a little duffel bag swinging from Sag's left point
function bag(x, t, P) {
  const sw = 0.18 * Math.sin(t * 5)
  x.save(); x.translate(P.x - P.F.S * 0.42, P.F.cy - P.F.S * 0.02); x.rotate(sw); x.scale(P.pk, P.pk)
  R(x, INK, -4, 0, 8, 34)
  box(x, -62, 34, 124, 64, '#c0503a', { b: 6, hi: '#e2775c' })
  R(x, '#7a2f22', -62, 58, 124, 8); R(x, '#f2c75c', -8, 52, 16, 20)
  x.restore()
}
const EP = makeThread({
  id: 'nthe03', duration: 25, chat: "ARIES'S CHAT!!", cut: 7.4,
  heads: [
    { at: -1, text: 'Sag is planning | a *surprise trip.*', accent: SAG },
    { at: 2.9, text: 'The chat has | *questions.*' },
    { at: 7.45, text: 'Virgo asks | *the* question.' },
    { at: 11.3, text: 'So Sag *asked.*', accent: SAG },
  ],
  last: { at: 16.6, text: 'Surprise them with | *what they love.*' },
  pins: [[-1, { from: 'leo', text: 'welcome to MY chat' }]],
  msgs: [
    { at: -1, from: 'sagittarius', text: 'planning a *SURPRISE TRIP* for my person' },
    { at: -0.6, from: 'sagittarius', text: "tell me it's genius" },
    { at: -0.2, from: 'sagittarius', text: 'it IS genius btw' },
    { at: 1.0, from: 'capricorn', text: 'itinerary?' },
    { at: 1.9, from: 'sagittarius', text: 'vibes.', react: [[2.4, 'ha', 6]] },
    { at: 3.1, kind: 'agenda', from: 'virgo', title: 'PACKING LIST (PAGE 1 OF 4)', items: ['socks (x9)', 'snacks', { text: 'a plan, Sag', hi: true }] },
    { at: 5.2, kind: 'triple', from: 'gemini', items: [{ to: 'sagittarius', text: 'where??' }, { to: 'capricorn', text: 'lol itinerary' }, { to: 'virgo', text: '4 pages??' }] },
    { at: 7.6, from: 'virgo', text: 'one thing first. do they *like* surprises?', big: true },
    { at: 9.0, from: 'sagittarius', text: "…who doesn't?" },
    { at: 10.0, from: 'cancer', text: 'ask them, sweetie.' },
    { at: 11.3, kind: 'image', from: 'sagittarius', w: 600, h: 290, draw: shot([
      { side: 'R', text: 'random q. do you like surprises?', at: 11.5 },
      { side: 'L', text: 'love them. hate planes. hate early mornings.', at: 12.3 },
    ], { title: 'my person', col: '#7b4fd0' }) },
    { at: 13.8, from: 'sagittarius', text: 'cancelling the *5am flight*', big: true, react: [[14.3, 'ha', 7], [14.5, 'heart', 4]] },
    { at: 15.0, kind: 'voice', from: 'pisces', dur: '0:44', note: '(sobbing: you LISTENED)' },
  ],
  typing: [{ from: 'sagittarius', a: 8.0, b: 8.95 }],
  stage: [
    { at: -1, sign: 'sagittarius', mood: 'sparkle', look: [1, -0.5], prop: bag, hops: [0.5] },
    { at: 1.0, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 1.9, sign: 'sagittarius', mood: 'happy', prop: bag },
    { at: 3.1, sign: 'virgo', mood: 'squint', look: [1, -1] },
    { at: 5.2, sign: 'gemini', mood: 'happy' },
    { at: 7.6, sign: 'virgo', mood: 'neutral', look: [0, 0] },
    { at: 9.0, sign: 'sagittarius', mood: 'wide', prop: bag },
    { at: 10.0, sign: 'cancer', mood: 'happy' },
    { at: 11.3, sign: 'sagittarius', mood: 'neutral', look: [1, -1], prop: bag },
    { at: 12.4, sign: 'sagittarius', mood: 'wide', look: [0, 0], prop: bag },
    { at: 13.8, sign: 'sagittarius', mood: 'sparkle', look: [0, 0], prop: bag, hops: [14.2] },
  ],
  cry: [[-1, 1], [12.4, 2], [15.0, 3]],
  pisMood: [[7.6, 'wide'], [13.8, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
