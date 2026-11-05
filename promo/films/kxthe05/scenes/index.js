// kxthe05: THE THREAD: EXTENDED, episode 5, "The Advice Desk Is Closed" (90 s vertical, promo/films/month2/m38.md row 5,
// music: chiptune · B). One whole night in the chat → the 3 a.m. voice note. Hard cut on the last line.
//   0.0    frame 0: "Virgo answered 41 questions. | *Asked zero.*"  Virgo mid-type, answers flying out; a counter
//          QUESTIONS ANSWERED: 41; the chat mid-flood of questions.
//   0.3    slam; 1.3 the promise: "wait for question 42".
//   7 PM   everyone asks Virgo things (Libra gift, Aries text check, Gemini asks three); Leo pins "ADVICE DESK · OPEN 24/7".
//   9 PM   Virgo posts a screenshot by accident: their date at 2 PM: "want to meet my friends saturday?" unanswered. Caught.
//   11 PM  the chat turns it round (Capricorn's AGENDA: close the desk); "I'm scared they'll find me boring"; the chat
//          quotes Virgo's own advice back.
//   1 AM   Virgo sends "yes. a little nervous. tell me one thing about them?"
//   3 AM   the reply (three friends' fun facts); Virgo: question 42: "why do I never ask you for help?" Pisces' voice note.
import { makeXThread, shot, hearts, confetti, R, MONO, BONE, GOLD, INK } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 90

const EP = makeXThread({
  id: 'kxthe05', len: LEN, chat: 'say it out loud',
  heads: [
    { at: -1, text: 'Virgo answered 41 questions. | *Asked zero.*', accent: '#9fe6b0' },
    { at: 3.0, text: 'The friend who | *gives all the advice.*' },
    { at: 12.6, text: 'The desk is | *open 24/7.*' },
    { at: 18.6, text: 'Wait. | *What was that?*', accent: '#ff5c7a' },
    { at: 27.6, text: 'Virgo never | *replied.*' },
    { at: 38.6, text: 'The desk is | *closed.*' },
    { at: 44.6, text: 'The real | *reason.*', accent: '#9fe6b0' },
    { at: 50.4, text: 'The chat quotes | *Virgo back.*' },
    { at: 62.0, text: 'Virgo takes | *the advice.*' },
    { at: 72.6, text: 'Question | *42.*', accent: '#9fe6b0' },
  ],
  last: { at: 88.25, text: 'Take *your own* | advice. Tonight.' },
  pins: [[12.6, { from: 'leo', text: "Leo: VIRGO'S ADVICE DESK · OPEN 24/7" }], [58.6, { from: 'leo', text: 'Leo: the desk is CLOSED (Leo is security)' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '7:10 PM' },
    { at: -0.95, from: 'libra', text: 'Virgo, gift for a third date?' },
    { at: -0.8, from: 'virgo', text: 'something small that says *"I listened."*' },
    { at: -0.65, from: 'aries', text: 'Virgo is "hey :)" too much' },
    { at: -0.5, from: 'virgo', text: 'perfect. *send it.*' },
    { at: 1.2, kind: 'triple', from: 'gemini', items: [{ to: 'virgo', text: 'q1: dinner or a walk' }, { to: 'virgo', text: 'q2: how long to wait to reply' }, { to: 'virgo', text: 'q3: is cereal soup' }] },
    { at: 3.4, kind: 'triple', from: 'virgo', items: [{ to: 'gemini', text: 'a walk, then dinner' }, { to: 'gemini', text: 'reply when you want to' }, { to: 'gemini', text: 'no.' }] },
    { at: 5.6, from: 'aquarius', text: 'Virgo just did the Gemini thing *better than Gemini*', react: [[6.2, 'ha', 9]] },
    { at: 7.0, from: 'cancer', text: 'Virgo how do I tell my roommate the dishes thing' },
    { at: 8.2, from: 'virgo', text: 'kindly, once, with a plan. *"can we do a rota?"*' },
    { at: 9.6, from: 'sagittarius', text: 'Virgo what do I pack for a weekend' },
    { at: 10.6, from: 'virgo', text: 'half of what you think. *plus socks.*' },
    { at: 11.6, kind: 'voice', from: 'pisces', dur: '0:36', note: '(crying: how do you KNOW everything)' },
    { at: 12.6, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 14.2, from: 'taurus', text: 'Virgo what should I eat' },
    { at: 15.2, from: 'virgo', text: 'the leftovers. *you know the ones.*' },
    { at: 16.4, from: 'virgo', text: 'next.' },
    { at: 18.0, kind: 'divider', text: '9:20 PM' },
    { at: 18.6, kind: 'image', from: 'virgo', w: 700, h: 260, draw: shot([{ side: 'L', text: 'had a really nice time. *want to meet my friends saturday?*', at: -1 }], { title: 'the date · 2:04 PM' }) },
    { at: 20.4, from: 'virgo', text: 'WRONG CHAT. *wrong screenshot.* ignore', big: true },
    { at: 21.8, from: 'scorpio', text: '2:04 PM.' },
    { at: 22.8, from: 'scorpio', text: "it's 9:20." },
    { at: 25.4, kind: 'triple', from: 'gemini', items: [{ to: 'virgo', text: 'SEVEN HOURS' }, { to: 'scorpio', text: 'good catch' }, { to: 'libra', text: 'are you seeing this' }] },
    { at: 26.6, from: 'libra', text: 'I am seeing this' },
    { at: 27.6, from: 'virgo', text: "I'm going to reply. I'm *thinking* about it. it's fine." },
    { at: 29.2, from: 'aries', text: 'you answered 41 of OUR questions *since 7*' },
    { at: 30.6, from: 'virgo', text: 'those were *easy*' },
    { at: 31.6, kind: 'voice', from: 'pisces', dur: '0:59', note: '(sobbing: Virgo has a LIFE)' },
    { at: 33.6, from: 'cancer', text: "you don't have to have this one figured out" },
    { at: 35.0, from: 'virgo', text: 'I always have it figured out. *that is my whole thing*' },
    { at: 38.0, kind: 'divider', text: '11:00 PM' },
    { at: 38.6, kind: 'agenda', from: 'capricorn', title: 'AGENDA', items: ['close the advice desk', { text: 'help Virgo (for once)', hi: true }] },
    { at: 41.2, from: 'sagittarius', text: 'Virgo. why no reply. *honestly*' },
    { at: 44.6, from: 'virgo', text: "I'm scared they'll find me *boring.* their friends are all so fun", big: true, react: [[45.8, 'heart', 11], [46.1, 'tear', 2]] },
    { at: 47.4, from: 'scorpio', text: 'you are *the least boring person* here and I include myself' },
    { at: 48.8, from: 'sagittarius', text: "you're *nervous*, not boring" },
    { at: 50.4, from: 'libra', text: '"warm, clear, no pressure." *who said that*' },
    { at: 51.8, from: 'aries', text: '"one honest sentence." *who said that*' },
    { at: 53.0, from: 'taurus', text: '"ask about them." *who said that*' },
    { at: 54.2, from: 'virgo', text: '…me. I said all of those.', react: [[54.8, 'ha', 10]] },
    { at: 55.6, from: 'aquarius', text: 'the call is coming from *inside the desk*' },
    { at: 58.0, kind: 'divider', text: '1:08 AM' },
    { at: 58.6, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 60.0, from: 'virgo', text: 'draft: "yes. a little nervous. *tell me one thing about them?*"' },
    { at: 61.8, from: 'capricorn', text: 'warm. clear. *approved.*' },
    { at: 62.0, from: 'virgo', text: '*SENT.*', big: true },
    { at: 63.6, from: 'gemini', text: 'Virgo sent it. VIRGO SENT IT', react: [[64.2, 'star', 11]] },
    { at: 65.0, from: 'virgo', text: 'they will be asleep. it is 1 a.m.' },
    { at: 66.4, from: 'leo', text: 'and yet. *we wait.*' },
    { at: 67.6, from: 'cancer', text: 'I made tea for the waiting' },
    { at: 69.0, kind: 'system', text: '9 people are still awake' },
    { at: 72.0, kind: 'divider', text: '3:01 AM' },
    { at: 72.6, kind: 'image', from: 'virgo', w: 700, h: 330, draw: shot([{ side: 'R', text: 'yes. a little nervous. tell me one thing about them?', at: -1 }, { side: 'L', text: 'Mo laughs at everything. Jun will ask you about books', at: 73.0 }, { side: 'L', text: "and they've heard about you. *all good.*", at: 73.8 }], { title: 'the date' }) },
    { at: 75.2, from: 'virgo', text: '*all good*', big: true, react: [[75.8, 'heart', 11]] },
    { at: 76.8, from: 'virgo', text: 'ok. question 42. *why do I never ask you all for help?*' },
    { at: 78.4, from: 'aries', text: '*ASK!!*' },
    { at: 78.8, from: 'libra', text: '*ASK!!*' },
    { at: 79.2, from: 'taurus', text: '*ask.*' },
    { at: 80.2, kind: 'voice', from: 'pisces', dur: '3:01', note: '(happy sobbing: the desk can take a NIGHT OFF)', react: [[82.2, 'heart', 12], [82.6, 'tear', 12]] },
    { at: 83.6, from: 'virgo', text: 'thank you. *really.*' },
    { at: 85.0, from: 'gemini', text: 'q4: is cereal soup' },
    { at: 86.2, from: 'virgo', text: 'desk is *closed.*', react: [[86.8, 'ha', 11]] },
  ],
  typing: [{ label: '6 people are asking Virgo', a: -1, b: 1.15 }, { from: 'virgo', a: 42.2, b: 44.5 }, { from: 'virgo', a: 56.6, b: 59.9 }],
  stage: [
    { at: -1, sign: 'virgo', mood: 'wide', look: [1, -0.5], prop: deskSign },
    { at: 1.2, sign: 'gemini', mood: 'happy', hops: [1.4, 1.6] },
    { at: 3.4, sign: 'virgo', mood: 'neutral', look: [1, -1], prop: deskSign },
    { at: 5.6, sign: 'aquarius', mood: 'wide' },
    { at: 7.0, sign: 'cancer', mood: 'neutral', two: { sign: 'virgo', mood: 'neutral', at: 8.2 } },
    { at: 9.6, sign: 'sagittarius', mood: 'happy', two: { sign: 'virgo', mood: 'neutral', at: 10.6 } },
    { at: 14.2, sign: 'taurus', mood: 'happy', two: { sign: 'virgo', mood: 'squint', at: 15.2 } },
    { at: 18.6, sign: 'virgo', mood: 'wide', look: [0, 0], hops: [18.8] },
    { at: 21.8, sign: 'scorpio', mood: 'squint', look: [1, -1] },
    { at: 25.4, sign: 'gemini', mood: 'wide', hops: [25.6, 25.8] },
    { at: 26.6, sign: 'libra', mood: 'squint' },
    { at: 27.6, sign: 'virgo', mood: 'squint' },
    { at: 29.2, sign: 'aries', mood: 'wide' },
    { at: 30.6, sign: 'virgo', mood: 'neutral' },
    { at: 33.6, sign: 'cancer', mood: 'sparkle' },
    { at: 35.0, sign: 'virgo', mood: 'neutral', look: [0, 0] },
    { at: 38.6, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 41.2, sign: 'sagittarius', mood: 'neutral' },
    { at: 44.6, sign: 'virgo', mood: 'neutral', look: [0, 0], tears: 1 },
    { at: 47.4, sign: 'scorpio', mood: 'happy' },
    { at: 48.8, sign: 'sagittarius', mood: 'happy' },
    { at: 50.4, sign: 'libra', mood: 'sparkle' },
    { at: 51.8, sign: 'aries', mood: 'sparkle' },
    { at: 53.0, sign: 'taurus', mood: 'sparkle' },
    { at: 54.2, sign: 'virgo', mood: 'wide' },
    { at: 55.6, sign: 'aquarius', mood: 'squint' },
    { at: 60.0, sign: 'virgo', mood: 'neutral', look: [1, -1] },
    { at: 61.8, sign: 'capricorn', mood: 'happy' },
    { at: 62.0, sign: 'virgo', mood: 'wide', look: [0, 0], hops: [62.2] },
    { at: 63.6, sign: 'gemini', mood: 'sparkle', hops: [63.8, 64.0] },
    { at: 65.0, sign: 'virgo', mood: 'neutral' },
    { at: 66.4, sign: 'leo', mood: 'squint', two: { sign: 'cancer', mood: 'happy', at: 67.6 } },
    { at: 72.6, sign: 'virgo', mood: 'wide', look: [1, -1] },
    { at: 75.2, sign: 'virgo', mood: 'sparkle', look: [0, 0], hops: [75.4, 75.8] },
    { at: 76.8, sign: 'virgo', mood: 'neutral' },
    { at: 78.4, sign: 'aries', mood: 'wide', two: { sign: 'libra', mood: 'wide', at: 78.8 } },
    { at: 79.2, sign: 'taurus', mood: 'happy' },
    { at: 83.6, sign: 'virgo', mood: 'happy', tears: 1 },
    { at: 85.0, sign: 'gemini', mood: 'happy' },
    { at: 86.2, sign: 'virgo', mood: 'squint', prop: deskSign },
  ],
  cry: [[-1, 2], [11.6, 3], [13.2, 1], [31.6, 3], [33.4, 2], [44.6, 3], [46.6, 2], [62.0, 2], [75.2, 3], [78.0, 2], [80.2, 3]],
  pisMood: [[-1, 'wide'], [11.6, 'sparkle'], [18.6, 'wide'], [31.6, 'sparkle'], [44.6, 'happy'], [69.0, 'sleepy'], [75.2, 'happy']],
  extra(x, t) {
    confetti(x, t, 62.05, 300, 1560)
    hearts(x, t, 75.4, 300, 1520, { n: 7 })
    hearts(x, t, 80.4, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    slam: { at: 0.3 },
    counter: { label: 'QUESTIONS ANSWERED', steps: [[-1, 41], [3.4, 44], [8.2, 45], [10.6, 46], [15.2, 47], [72.6, 47], [76.8, 42, 'QUESTION']] },
    promise: { at: 1.3, text: 'wait for *question 42*' },
    chapters: [[0.0, '7 PM'], [18.0, '9 PM'], [38.0, '11 PM'], [58.0, '1 AM'], [72.0, '3 AM']],
    caught: [{ at: 23.15, x: 592, y: 818, rx: 105, ry: 40, text: '7 HOURS', arrow: 'tl' }],
    shakes: [18.6, 20.4, 62.0],
    flashes: [[18.6, '#ff5c7a'], [62.0, '#9fe6b0'], [75.2, '#f2c75c']],
  }),
})

// a little desk sign Virgo holds: OPEN (green) for most of the film, CLOSED (red) at the end
function deskSign(x, t, { F, pk }) {
  const closed = t > 80
  x.save(); x.translate(300 - F.S * 0.5, F.cy + F.S * 0.12); x.rotate(-0.12); x.scale(pk, pk)
  R(x, INK, -66, -26, 132, 52); R(x, closed ? '#e8344e' : '#3fbf7a', -60, -20, 120, 40)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(closed ? 'CLOSED' : 'OPEN', 0, 1)
  x.restore()
}

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
