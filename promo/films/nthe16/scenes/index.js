// nthe16: THE THREAD, episode 16, "Libra Practises Hello" (30 s vertical, promo/films/next30/b05.md row 16, music: pop · Eb).
// Story 0–25.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Libra is rehearsing *hello* for the party."  Final RSVPs: twelve yes; "my crush RSVP'd YES". Libra mid-twirl.
//   1.4   Capricorn +1 (Aquarius), Aquarius +1 (Capricorn). Libra: "what do I SAY when they walk in". Draft 40 greetings.
//   7.0   the chat helps: Leo (a spin), Aries (hug), Gemini ×3 ("ask first").
//   10.0  card cut: Virgo: "'I'm really glad you came.' then mean it."  "that's it?"  "that's everything."
//   14.8  mirror practice #41. Pisces' voice note.  20.6 last line.
import { makeThread, drawStarChar, box, R, GOLD, BONE, MONO, INK } from '../../nthe01/chatkit.js'

const LIB = '#e163d6'
function mirror(x, t, w, h, m) {
  R(x, '#2a2056', 0, 0, w, h)
  box(x, w / 2 - 130, 20, 260, h - 80, '#bfe8ff', { b: 10 })
  R(x, GOLD, w / 2 - 130 - 10, 10, 280, 10); R(x, GOLD, w / 2 - 130 - 10, h - 60, 280, 10)
  R(x, 'rgba(255,255,255,0.35)', w / 2 - 110, 36, 18, 90)
  const k = Math.min(1, Math.max(0, (t - m.at - 0.15) / 0.3))
  drawStarChar(x, w / 2, h / 2 - 16, 150, t, { color: LIB, mood: 'happy', look: [0, 0], pop: k, seed: 7, glow: 0.7, hops: [m.at + 0.6, m.at + 1.2] })
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('practice #41', w / 2, h - 26)
  void INK
}
const twirl = (x, t, P) => { void x; void t; void P }
const EP = makeThread({
  id: 'nthe16', duration: 30, chat: 'virgo said it out loud', cut: 10.0,
  heads: [
    { at: -1, text: 'Libra is rehearsing *hello* | for the party.', accent: LIB },
    { at: 1.4, text: "Everyone's | *coming.*" },
    { at: 3.2, text: 'Libra has | *one problem.*', accent: LIB },
    { at: 7.0, text: 'The chat | *helps.*' },
    { at: 10.1, text: 'Virgo keeps it | *simple.*' },
    { at: 14.8, text: 'Practice | *#41.*', accent: LIB },
  ],
  last: { at: 20.6, text: 'Glad you came. | *That’s* the whole line.' },
  pins: [[-1, { from: 'leo', text: 'Virgo has a crush (historic)' }]],
  msgs: [
    { at: -1.2, kind: 'poll', from: 'libra', q: 'party RSVPs (final!)', opts: [{ label: 'yes', votes: [[-1.2, 12]] }, { label: 'no (totally fine!)', small: true, col: '#7dffb0', votes: [[-1.2, 0]] }] },
    { at: -0.4, from: 'libra', text: "my crush RSVP'd *YES*", big: true },
    { at: 1.4, from: 'capricorn', text: '+1 (Aquarius)' },
    { at: 1.9, from: 'aquarius', text: '+1 (Capricorn)', react: [[2.3, 'heart', 8]] },
    { at: 3.2, from: 'libra', text: 'what do I *SAY* when they walk in', big: true },
    { at: 4.6, kind: 'agenda', from: 'libra', title: 'GREETINGS (DRAFT 40)', gap: 0.3, items: ['"hi"', '"hey!"', '"oh! you came!" (too surprised)', '"welcome to my home" (too formal)'] },
    { at: 7.0, from: 'leo', text: "a spin, then *'welcome'*", react: [[7.4, 'ha', 6]] },
    { at: 7.9, from: 'aries', text: 'just hug them!!' },
    { at: 8.6, kind: 'triple', from: 'gemini', items: [{ to: 'libra', text: 'hi!!' }, { to: 'leo', text: 'no spin' }, { to: 'aries', text: 'ask first' }] },
    { at: 10.2, from: 'virgo', text: "*'I'm really glad you came.'* then mean it.", big: true },
    { at: 12.4, from: 'libra', text: "that's it?" },
    { at: 13.4, from: 'virgo', text: "that's *everything.*", react: [[13.9, 'heart', 11]] },
    { at: 14.8, kind: 'image', from: 'libra', w: 520, h: 300, draw: mirror },
    { at: 16.6, from: 'libra', text: 'practice #41: *nailed it.*' },
    { at: 17.6, kind: 'voice', from: 'pisces', dur: '0:45', note: "(sobbing: I'm glad WE came)" },
    { at: 18.9, kind: 'agenda', from: 'capricorn', title: 'PARTY PLAN', items: ['arrive kind', 'leave happy'] },
  ],
  stage: [
    { at: -1, sign: 'libra', mood: 'sparkle', look: [0, 0], hops: [-0.1, 0.5], prop: twirl },
    { at: 1.4, sign: 'capricorn', mood: 'happy', two: { sign: 'aquarius', at: 1.9, mood: 'happy' } },
    { at: 3.2, sign: 'libra', mood: 'wide', look: [0, 0] },
    { at: 4.6, sign: 'libra', mood: 'squint', look: [1, -1] },
    { at: 7.0, sign: 'leo', mood: 'sparkle', two: { sign: 'aries', at: 7.9, mood: 'happy' } },
    { at: 8.6, sign: 'gemini', mood: 'happy' },
    { at: 10.2, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 12.4, sign: 'libra', mood: 'wide' },
    { at: 13.4, sign: 'virgo', mood: 'happy' },
    { at: 14.8, sign: 'libra', mood: 'sparkle', look: [0, 0], hops: [15.4, 16.0] },
  ],
  cry: [[-1, 1], [13.4, 2], [17.6, 3]],
  pisMood: [[3.2, 'wide'], [10.2, 'sparkle'], [17.6, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
