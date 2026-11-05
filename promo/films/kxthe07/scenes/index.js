// kxthe07: THE THREAD: EXTENDED, episode 7, "Four Hours to Say It" (90 s vertical, promo/films/month2/m38.md row 7,
// music: house · A). New Year's Eve, one whole night in the chat → the 3 a.m. voice note. Hard cut on the last line.
//   0.0    frame 0: "Four hours to tell | *my best friend.*"  Aquarius mid-pace at a party; the countdown chip MIDNIGHT IN
//          3:59:59 on the chat; "I'm telling my best friend I like them. before midnight."
//   0.3    whip zoom + shake; 1.3 the promise: "the ending, though."
//   8 PM   the chat panics; Gemini triple; Capricorn's AGENDA (find them / say it / midnight); Leo pins it.
//   9 PM   "what if it ruins us"; Virgo: "you can say no and we're still us."
//   10 PM  false start: 40 minutes about black holes.
//   11:30  the countdown clock on the wall; a breadstick eaten in fear; Sag: GO.
//   11:58  Aquarius says it; "the best friend is typing…"; the kit countdown 3-2-1.
//   12:01  "THEY WERE GOING TO TELL ME AT MIDNIGHT"; the chat explodes; the chat renamed "happy new us".
//   3 AM   pancakes, two forks; Pisces' 3 a.m. voice note. Last line, hard cut at 90.
import { makeXThread, R, hearts, confetti, BONE, GOLD, INK, MONO } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 90

// a pixel photo: a stack of pancakes, two forks
function pancakes(x, t, w, h) {
  R(x, '#1d1640', 0, 0, w, h)
  R(x, '#efe6d6', w / 2 - 170, h - 70, 340, 22)                  // plate
  for (let i = 0; i < 4; i++) { R(x, INK, w / 2 - 124 + i * 4, h - 96 - i * 28, 248 - i * 8, 30); R(x, '#e2a35a', w / 2 - 120 + i * 4, h - 92 - i * 28, 240 - i * 8, 22) }
  R(x, '#f7d36a', w / 2 - 30, h - 200, 60, 16)                   // butter
  R(x, '#8a4a1a', w / 2 - 90, h - 186, 40, 60); R(x, '#8a4a1a', w / 2 + 50, h - 176, 30, 50) // syrup drips
  const fork = (X, r) => { x.save(); x.translate(X, h - 140); x.rotate(r); R(x, INK, -6, -80, 12, 120); R(x, '#cfd6e6', -3, -77, 6, 114); for (let k = 0; k < 3; k++) R(x, '#cfd6e6', -12 + k * 10, -110, 4, 34); x.restore() }
  fork(w / 2 - 210, -0.3); fork(w / 2 + 210, 0.3)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1:12 AM · two forks', w / 2, 24)
}

const EP = makeXThread({
  id: 'kxthe07', len: LEN, chat: 'say it out loud', renames: [[69.2, 'happy new us']],
  heads: [
    { at: -1, text: 'Four hours to tell | *my best friend.*', accent: '#8fd9ff' },
    { at: 3.0, text: 'A crush on | *the best friend.*' },
    { at: 7.6, text: 'Capricorn made | *a plan.*' },
    { at: 17.6, text: 'The scary | *part.*', accent: '#8fd9ff' },
    { at: 22.6, text: 'Virgo has | *the answer.*' },
    { at: 29.0, text: 'Attempt one: | *black holes.*' },
    { at: 39.4, text: '30 minutes | *to midnight.*', accent: '#8fd9ff' },
    { at: 48.4, text: 'Aquarius | *said it.*' },
    { at: 56.4, text: 'The ending, | *though.*', accent: '#f2c75c' },
    { at: 73.6, text: 'The *3 a.m.* | voice note.' },
  ],
  last: { at: 88.25, text: 'Say it first. | Count down *after.*' },
  pins: [[11.4, { from: 'leo', text: 'Leo: AQUARIUS HAS FEELINGS (for history)' }], [37.8, { from: 'leo', text: 'Leo: pinning the black holes. iconic' }], [64.8, { from: 'leo', text: 'Leo: pinned. framed. forever' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '8:00 PM · NEW YEAR\'S EVE' },
    { at: -0.9, from: 'aquarius', text: "I'm telling my best friend I like them. *before midnight.*", big: true },
    { at: -0.5, from: 'aquarius', text: 'four hours. the plan is: *panic*' },
    { at: 1.2, from: 'aries', text: 'WAIT. *THE* best friend??' },
    { at: 2.4, from: 'libra', text: 'ten years of friendship and *now??*' },
    { at: 3.6, kind: 'triple', from: 'gemini', items: [{ to: 'aquarius', text: 'FINALLY' }, { to: 'libra', text: 'I KNEW' }, { to: 'aries', text: 'we all knew' }] },
    { at: 5.6, kind: 'voice', from: 'pisces', dur: '0:52', note: '(sobbing: TEN YEARS)' },
    { at: 7.6, kind: 'agenda', from: 'capricorn', title: "AGENDA (NEW YEAR'S EVE)", items: ['find them', 'say it', { text: 'midnight', hi: true }] },
    { at: 10.6, from: 'leo', text: 'pinning this. *for history*' },
    { at: 11.4, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 12.6, from: 'aquarius', text: 'what do I even *say*' },
    { at: 14.0, from: 'scorpio', text: "the truth. it's *faster.*" },
    { at: 15.4, from: 'taurus', text: 'and eat something first' },
    { at: 17.0, kind: 'divider', text: '9:12 PM' },
    { at: 17.6, from: 'aquarius', text: 'what if it ruins us. *ten years.*', big: true, react: [[18.6, 'heart', 11]] },
    { at: 19.6, from: 'cancer', text: "that's the scary part. *it's real.*" },
    { at: 22.6, from: 'virgo', text: "say it so the door stays open: *\"you can say no and we're still us.\"*", big: true, react: [[23.8, 'heart', 11], [24.1, 'tear', 5]] },
    { at: 25.6, from: 'aquarius', text: 'ok. writing that *on my hand*' },
    { at: 27.0, from: 'sagittarius', text: 'GO GO GO' },
    { at: 28.4, kind: 'divider', text: '10:07 PM' },
    { at: 29.0, from: 'aquarius', text: 'update: found them. talked about *black holes* for forty minutes' },
    { at: 31.0, from: 'aries', text: '*BLACK HOLES??*' },
    { at: 31.8, from: 'aquarius', text: 'they asked good questions. *I panicked*' },
    { at: 33.4, from: 'virgo', text: "that's fine. *you have time.* go back." },
    { at: 34.8, kind: 'voice', from: 'pisces', dur: '1:20', note: '(crying: black holes are a love language)' },
    { at: 37.0, from: 'leo', text: 'pinning the black holes' },
    { at: 37.8, kind: 'system', text: '♌︎ Leo pinned a message (again)' },
    { at: 38.8, kind: 'divider', text: '11:30 PM' },
    { at: 39.4, from: 'aquarius', text: "there's a countdown clock on the wall. *it's looking at me*" },
    { at: 41.2, from: 'libra', text: 'breathe. warm, clear, *no pressure*' },
    { at: 42.6, from: 'capricorn', text: 'item 2 is *overdue.*' },
    { at: 44.0, from: 'taurus', text: 'did you eat' },
    { at: 44.8, from: 'aquarius', text: 'I ate a breadstick *in fear*', react: [[45.4, 'ha', 10]] },
    { at: 46.4, from: 'sagittarius', text: '*GO!!*', big: true },
    { at: 47.8, kind: 'divider', text: '11:58 PM' },
    { at: 48.4, from: 'aquarius', text: 'I said it. "I like you. *you can say no and we\'re still us.*"', big: true, react: [[49.6, 'heart', 11]] },
    { at: 51.2, kind: 'system', text: 'Aquarius: they are just looking at me' },
    { at: 56.0, kind: 'divider', text: '12:01 AM' },
    { at: 56.4, from: 'aquarius', text: '*THEY WERE GOING TO TELL ME AT MIDNIGHT*', big: true, react: [[57.4, 'heart', 12], [57.7, 'star', 12]] },
    { at: 58.6, from: 'aries', text: 'AAAAAAAA' },
    { at: 59.2, from: 'libra', text: "I'M *CRYING*" },
    { at: 59.8, from: 'scorpio', text: 'called it.' },
    { at: 60.6, kind: 'triple', from: 'gemini', items: [{ to: 'aquarius', text: 'HAPPY NEW YEAR' }, { to: 'scorpio', text: 'you did not call it' }, { to: 'libra', text: 'me too' }] },
    { at: 61.8, kind: 'agenda', from: 'capricorn', title: 'AGENDA (CLOSED)', items: ['found them', 'said it', { text: 'midnight: a very long hug', hi: true }] },
    { at: 64.8, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 66.2, from: 'aquarius', text: "we're getting pancakes. *together.* as a… thing" },
    { at: 68.0, from: 'virgo', text: 'proud of you.' },
    { at: 69.2, kind: 'system', text: '♒︎ Aquarius renamed the chat happy new us' },
    { at: 70.4, kind: 'divider', text: '3:02 AM' },
    { at: 71.0, kind: 'image', from: 'aquarius', w: 640, h: 280, draw: pancakes },
    { at: 73.6, kind: 'voice', from: 'pisces', dur: '3:02', note: '(happy sobbing: happy new US)', react: [[75.6, 'heart', 12], [76.0, 'tear', 12]] },
    { at: 77.0, from: 'taurus', text: 'were the pancakes good' },
    { at: 78.2, from: 'aquarius', text: "didn't notice. *was looking at them*" },
    { at: 79.8, from: 'sagittarius', text: 'disgusting. *I love it*' },
    { at: 81.2, from: 'cancer', text: 'goodnight, you two' },
    { at: 82.6, from: 'aquarius', text: 'ten years and *four hours.*' },
    { at: 84.4, from: 'virgo', text: 'and *one* honest sentence.' },
    { at: 86.0, kind: 'system', text: 'Aquarius is asleep (smiling)' },
  ],
  typing: [{ label: '11 people are typing', a: 0.2, b: 1.15 }, { from: 'virgo', a: 20.8, b: 22.5 }, { label: 'the best friend is about to say something', a: 51.8, b: 55.9 }],
  stage: [
    { at: -1, sign: 'aquarius', mood: 'wide', look: [1, -0.5], hops: [-0.15] },
    { at: 1.2, sign: 'aries', mood: 'wide' },
    { at: 2.4, sign: 'libra', mood: 'sparkle' },
    { at: 3.6, sign: 'gemini', mood: 'sparkle', hops: [3.8, 4.0] },
    { at: 7.6, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 10.6, sign: 'leo', mood: 'sparkle' },
    { at: 12.6, sign: 'aquarius', mood: 'wide' },
    { at: 14.0, sign: 'scorpio', mood: 'squint', two: { sign: 'taurus', mood: 'happy', at: 15.4 } },
    { at: 17.6, sign: 'aquarius', mood: 'neutral', look: [0, 0] },
    { at: 19.6, sign: 'cancer', mood: 'sparkle' },
    { at: 22.6, sign: 'virgo', mood: 'happy', look: [1, -1] },
    { at: 25.6, sign: 'aquarius', mood: 'squint' },
    { at: 27.0, sign: 'sagittarius', mood: 'wide', hops: [27.2, 27.5] },
    { at: 29.0, sign: 'aquarius', mood: 'wide', look: [1, -1] },
    { at: 31.0, sign: 'aries', mood: 'wide' },
    { at: 31.8, sign: 'aquarius', mood: 'squint' },
    { at: 33.4, sign: 'virgo', mood: 'neutral' },
    { at: 37.0, sign: 'leo', mood: 'sparkle' },
    { at: 39.4, sign: 'aquarius', mood: 'wide', look: [1, -1] },
    { at: 41.2, sign: 'libra', mood: 'happy' },
    { at: 42.6, sign: 'capricorn', mood: 'squint' },
    { at: 44.0, sign: 'taurus', mood: 'neutral', two: { sign: 'aquarius', mood: 'wide', at: 44.8 } },
    { at: 46.4, sign: 'sagittarius', mood: 'wide', hops: [46.6, 46.9] },
    { at: 48.4, sign: 'aquarius', mood: 'neutral', look: [0, 0] },
    { at: 51.2, sign: 'aquarius', mood: 'wide', look: [1, 0] },
    { at: 56.4, sign: 'aquarius', mood: 'sparkle', look: [0, 0], hops: [56.6, 57.0, 57.4], tears: 2 },
    { at: 58.6, sign: 'aries', mood: 'wide', two: { sign: 'libra', mood: 'sparkle', at: 59.2 } },
    { at: 59.8, sign: 'scorpio', mood: 'squint' },
    { at: 60.6, sign: 'gemini', mood: 'sparkle', hops: [60.8, 61.0] },
    { at: 61.8, sign: 'capricorn', mood: 'happy' },
    { at: 66.2, sign: 'aquarius', mood: 'happy' },
    { at: 68.0, sign: 'virgo', mood: 'happy' },
    { at: 71.0, sign: 'aquarius', mood: 'sparkle' },
    { at: 77.0, sign: 'taurus', mood: 'happy' },
    { at: 78.2, sign: 'aquarius', mood: 'sparkle' },
    { at: 79.8, sign: 'sagittarius', mood: 'squint' },
    { at: 81.2, sign: 'cancer', mood: 'happy' },
    { at: 82.6, sign: 'aquarius', mood: 'happy' },
    { at: 84.4, sign: 'virgo', mood: 'happy' },
    { at: 86.0, sign: 'aquarius', mood: 'sleepy' },
  ],
  cry: [[-1, 2], [5.6, 3], [7.6, 1], [17.6, 2], [22.6, 3], [24.8, 1], [34.8, 3], [36.8, 2], [48.4, 2], [56.4, 3], [62.0, 2], [73.6, 3]],
  pisMood: [[-1, 'wide'], [5.6, 'sparkle'], [17.6, 'wide'], [22.6, 'happy'], [34.8, 'sparkle'], [48.4, 'wide'], [56.4, 'happy']],
  extra(x, t) {
    confetti(x, t, 55.25, 540, 1100, { n: 40 })
    confetti(x, t, 56.45, 300, 1560)
    hearts(x, t, 56.6, 300, 1520, { n: 8 })
    hearts(x, t, 73.8, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    whip: 0.3,
    promise: { at: 1.3, text: 'the ending, *though.*' },
    chapters: [[0.0, '8 PM'], [17.0, '9 PM'], [28.4, '10 PM'], [38.8, '11:30 PM'], [47.8, '11:58 PM', 2.6], [70.4, '3 AM']],
    counter: { label: 'MIDNIGHT IN', steps: [[-1, '3:59:59'], [17.0, '2:47:51'], [28.4, '1:52:40'], [38.8, '0:29:58'], [47.8, '0:01:59'], [51.2, '0:00:09'], [53.4, '0:00:03'], [54.0, '0:00:02'], [54.6, '0:00:01'], [55.2, '0:00:00'], [56.0, 'NOW', 'NEW YEAR']] },
    countdowns: [{ at: 53.4, from: 3, gap: 0.6, go: 'NOW!', y: 960 }],
    shakes: [0.35, 31.0, 46.4, 56.4],
    flashes: [[48.4, '#8fd9ff'], [55.2, '#f2c75c'], [56.4, '#ff8fb1']],
  }),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
