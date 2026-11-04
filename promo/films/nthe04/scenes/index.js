// nthe04: THE THREAD, episode 4, "Leo Pinned It Again" (20 s vertical, promo/films/next30/b05.md row 4, music: chiptune · G).
// Story 0–15.6, then the shared end card. The look lives in ../../nthe01/chatkit.js.
//   0.0   frame 0: "Leo pinned its *own* message. Again."  Pinned: "reminder: I look great today". Leo striking a pose.
//   0.9   Capricorn's agenda: "the pins".  2.4 Leo: "my date never said I looked nice. not into me??"
//   4.45  card cut: Virgo: "what DID they say?"  Leo: "'when can I see you again?' …twice."
//   8.2   Virgo: "that IS the compliment." Leo pins Virgo's message instead. Pisces' voice note.  11.4 last line.
import { makeThread, drawPixelStar, GOLD } from '../../nthe01/chatkit.js'

const LEO = '#f39a3a'
// a pose: little gold sparkle pops around Leo
function pose(x, t, P) {
  for (let i = 0; i < 3; i++) {
    const ph = (t * 1.3 + i / 3) % 1
    drawPixelStar(x, P.x + [-130, 120, 150][i], P.F.cy - [90, 120, 10][i], 20 * Math.sin(Math.PI * ph) * P.pk, 2, GOLD)
  }
}
const EP = makeThread({
  id: 'nthe04', duration: 20, chat: "ARIES'S CHAT!!", cut: 4.45,
  heads: [
    { at: -1, text: 'Leo pinned its | *own* message. Again.', accent: LEO },
    { at: 2.4, text: 'Leo has | *a worry.*', accent: LEO },
    { at: 4.5, text: 'Virgo | *investigates.*' },
    { at: 8.2, text: 'Case *closed.*' },
  ],
  last: { at: 11.4, text: '"See you again?" | *is* the compliment.' },
  pins: [[-1, { from: 'leo', text: 'reminder: I look great today' }], [9.5, { from: 'virgo', text: 'that IS the compliment.' }]],
  msgs: [
    { at: -1, from: 'leo', text: 'reminder: I look *great* today' },
    { at: -0.6, kind: 'system', text: '♌︎ Leo pinned a message (again)' },
    { at: 0.9, kind: 'agenda', from: 'capricorn', items: [{ text: 'the pins', hi: true }], react: [[1.6, 'ha', 6]] },
    { at: 2.4, from: 'leo', text: 'unrelated. my date never said I looked nice.' },
    { at: 3.3, from: 'leo', text: 'not into me??', big: true },
    { at: 4.6, from: 'virgo', text: 'what *DID* they say?' },
    { at: 5.9, from: 'leo', text: "'when can I see you again?'" },
    { at: 6.9, from: 'leo', text: '…twice.', react: [[7.3, 'heart', 5]] },
    { at: 8.2, from: 'virgo', text: 'that IS *the compliment.*', big: true },
    { at: 9.5, kind: 'system', text: "♌︎ Leo pinned Virgo's message" },
    { at: 10.3, kind: 'voice', from: 'pisces', dur: '0:19', note: '(sobbing: growth)' },
  ],
  stage: [
    { at: -1, sign: 'leo', mood: 'sparkle', look: [0, 0], prop: pose },
    { at: 0.9, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 2.4, sign: 'leo', mood: 'neutral', look: [1, -1] },
    { at: 3.3, sign: 'leo', mood: 'wide', look: [0, 0] },
    { at: 4.6, sign: 'virgo', mood: 'squint', look: [1, -1] },
    { at: 5.9, sign: 'leo', mood: 'neutral', look: [1, -1] },
    { at: 8.2, sign: 'virgo', mood: 'happy' },
    { at: 9.5, sign: 'leo', mood: 'sparkle', look: [0, 0], prop: pose, hops: [9.9] },
  ],
  cry: [[-1, 1], [9.5, 2], [10.3, 3]],
  pisMood: [[3.3, 'wide'], [8.2, 'sparkle'], [10.3, 'happy']],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
