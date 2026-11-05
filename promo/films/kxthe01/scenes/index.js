// kxthe01: THE THREAD: EXTENDED, episode 1, "Delivered, 7:02 PM" (90 s vertical, promo/films/month2/m38.md row 1,
// music: synthwave · F#m). One whole night in the chat, 7 PM → the 3 a.m. voice note. Hard cut on the last line.
//   0.0    frame 0: "Delivered. 7:02 PM. | Still nothing."  Aries mid-scream on the stage; the screenshot of Aries's text
//          ("had the best time. again soon?" · Delivered 7:02 PM) with a red caught circle; "it's been ELEVEN MINUTES".
//   0.35   record scratch + freeze; 1.4 the promise: "wait for the 3 a.m. voice note".
//   7 PM   Leo pins it, Scorpio's forensics (a sunset at 7:40), Gemini triple, Pisces' voice note, Capricorn's AGENDA.
//   9 PM   overthinking loading bar; "last seen" (Virgo: we're not doing last seen); Leo's pin update.
//   11 PM  the five-paragraph draft; the chat: NO. Virgo: "silence isn't a verdict…". Aries and Taurus play a board game.
//   1 AM   still nothing, still OK; Capricorn closes the agenda; goodnights.
//   3 AM   notification: "SO sorry!! phone died at my sister's. friday?" → "FRIDAY." Pisces' 3 a.m. voice note.
//   88.3   last line "Silence isn't *a verdict.*", hard cut at 90.0.
import { makeXThread, shot, R, box, panel, label, drawStarChar, signStar, drawBits, HEART, confetti, hearts, GOLD, BONE, INK, RED, LAV, INTER, MONO, pop01, prog, ease, clamp } from '../xthread.js'
import { xfx } from '../xfx.js'

const LEN = 90

// the screenshot of Aries's text, with the "Delivered" receipt and (at frame 0) a red caught circle
function delivered(x, t, w, h, m) {
  shot([{ side: 'R', text: 'had the best time. *again soon?*', at: -1 }], { title: 'my person' })(x, t, w, h, m)
  x.font = `700 22px ${MONO}`; x.fillStyle = LAV; x.textAlign = 'right'; x.textBaseline = 'alphabetic'
  x.fillText('Delivered 7:02 PM', w - 18, 168)
  // the red caught circle (hand-drawn ring), strongest at frame 0, gone by 6 s
  const k = 1 - ease.inQuad(prog(t, 4.5, 6))
  if (k > 0) {
    x.save(); x.globalAlpha = k; x.strokeStyle = RED; x.lineWidth = 7
    x.beginPath(); x.ellipse(w - 130, 160, 140 + 4 * Math.sin(t * 9), 34, -0.05, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}
// the board game on a video call: two tiles, Aries + Taurus, a little board between
function boardgame(x, t, w, h) {
  R(x, '#120c2a', 0, 0, w, h)
  const tile = (X, sign, mood) => {
    R(x, '#221a4a', X, 10, w / 2 - 15, h - 20)
    const S = signStar(sign)
    drawStarChar(x, X + (w / 2 - 15) / 2, h * 0.52, 120, t, { color: S.color, glyph: S.glyph, mood, look: [0, 0], seed: X, glow: 0.6, tips: false, bob: 3 })
    label(x, sign === 'aries' ? '♈︎ ARIES' : '♉︎ TAURUS', X + (w / 2 - 15) / 2, h - 30, { size: 20, col: S.color })
  }
  tile(10, 'aries', t > 54 ? 'sparkle' : 'squint'); tile(w / 2 + 5, 'taurus', 'happy')
  // the board: a pixel grid with two tokens hopping
  const bx = w / 2 - 60, by = 26
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) R(x, (i + j) % 2 ? '#f2c75c' : '#efe6d6', bx + i * 30, by + j * 22, 30, 22)
  const hop = Math.floor(t * 1.4) % 4
  R(x, '#ff8a6a', bx + hop * 30 + 8, by + 6 - Math.abs(Math.sin(t * 4.4)) * 6, 14, 12)
}

const EP = makeXThread({
  id: 'kxthe01', len: LEN, chat: 'say it out loud',
  heads: [
    { at: -1, text: 'Delivered. *7:02 PM.* | Still nothing.', accent: '#ff8a6a' },
    { at: 3.0, text: 'Left on *delivered.* | All night.' },
    { at: 6.6, text: 'Scorpio is | *investigating.*' },
    { at: 12.4, text: 'Capricorn has | *an agenda.*' },
    { at: 18.4, text: 'Two hours. | *Reading the silence.*' },
    { at: 31.2, text: 'Pisces is crying | *for Aries.*' },
    { at: 38.6, text: 'The draft is | *five paragraphs.*', accent: '#ff8a6a' },
    { at: 46.5, text: 'Virgo has | *the answer.*' },
    { at: 52.4, text: 'Aries is | *living their night.*' },
    { at: 60.6, text: 'Still nothing. | *Still OK.*' },
    { at: 72.6, text: '3:07 AM. | *A notification.*', accent: '#ff8a6a' },
    { at: 82.6, text: 'The *3 a.m.* | voice note.' },
  ],
  last: { at: 88.25, text: "Silence isn't | *a verdict.*" },
  pins: [[2.0, { from: 'leo', text: "Aries: it's been 11 minutes" }], [30.0, { from: 'leo', text: "Aries: it's been 2 hours (update, by Leo)" }], [55.0, { from: 'leo', text: 'Leo: I would also be winning' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '7:02 PM' },
    { at: -0.9, kind: 'image', from: 'aries', w: 680, h: 200, draw: delivered },
    { at: -0.7, from: 'aries', text: 'it says *delivered.* is delivered bad' },
    { at: -0.6, from: 'aries', text: 'hello?? is my phone broken' },
    { at: -0.4, from: 'aries', text: "it's been *ELEVEN MINUTES*", big: true },
    { at: 1.0, from: 'leo', text: 'eleven minutes is nothing. I once waited a whole day' },
    { at: 2.0, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 3.2, from: 'taurus', text: "they're probably eating. like I am." },
    { at: 4.6, kind: 'triple', from: 'gemini', items: [{ to: 'aries', text: "maybe they're driving" }, { to: 'taurus', text: 'what are you eating' }, { to: 'leo', text: 'why did you pin that' }] },
    { at: 6.6, from: 'scorpio', text: 'they posted a *sunset* at 7:40.', react: [[7.2, 'ha', 4]] },
    { at: 8.0, from: 'aries', text: 'THEY HAD TIME FOR *A SUNSET??*', big: true },
    { at: 9.4, from: 'libra', text: 'sunsets are fast tbf' },
    { at: 10.6, kind: 'voice', from: 'pisces', dur: '0:44', note: '(crying for you, specifically)' },
    { at: 12.4, kind: 'agenda', from: 'capricorn', title: 'AGENDA: THE SILENCE', items: ["don't double text", "don't triple text", { text: 'eat dinner', hi: true }] },
    { at: 15.2, from: 'aries', text: "I'm eating. *angrily.*" },
    { at: 16.6, from: 'sagittarius', text: 'on a bus, just caught up. WHAT did I miss' },
    { at: 18.0, kind: 'divider', text: '9:14 PM' },
    { at: 18.4, from: 'aries', text: 'two hours. *reading the silence.*', big: true },
    { at: 22.6, from: 'cancer', text: 'silence is just a *very quiet* text' },
    { at: 24.0, from: 'scorpio', text: 'their last seen was 8:55.' },
    { at: 25.2, from: 'virgo', text: "we're not doing *last seen.*", react: [[25.8, 'heart', 6]] },
    { at: 26.8, from: 'aries', text: "what if 'again soon' was *too much*" },
    { at: 28.2, kind: 'triple', from: 'gemini', items: [{ to: 'aries', text: "it wasn't" }, { to: 'scorpio', text: 'stop investigating' }, { to: 'cancer', text: 'a quiet text?? poet' }] },
    { at: 30.0, kind: 'system', text: '♌︎ Leo pinned a message (again)' },
    { at: 31.2, kind: 'voice', from: 'pisces', dur: '1:12', note: '(sobbing: the waiting is the WORST)' },
    { at: 33.4, from: 'capricorn', text: 'item 3 is still open, Aries.' },
    { at: 34.6, from: 'aries', text: 'ate. still sad. *drafting something.*' },
    { at: 38.0, kind: 'divider', text: '11:03 PM' },
    { at: 38.6, from: 'aries', text: "hey so I totally get it if you're busy or not feeling it and that's ok but also I just wanted to say… *(+4 paragraphs)*" },
    { at: 40.8, from: 'libra', text: '*NO*' },
    { at: 41.2, from: 'scorpio', text: '*NO*' },
    { at: 41.6, from: 'taurus', text: 'absolutely *not*' },
    { at: 42.6, from: 'sagittarius', text: 'put. the phone. *down.*' },
    { at: 43.8, from: 'aries', text: 'then what do I *DO*' },
    { at: 46.5, from: 'virgo', text: "silence isn't a verdict. you asked once, kindly. *now live your night.*", big: true, react: [[47.4, 'heart', 11], [47.8, 'tear', 1]] },
    { at: 49.6, from: 'aries', text: 'live my night *how*' },
    { at: 50.8, from: 'taurus', text: 'video call. I have a board game and *snacks*' },
    { at: 52.4, kind: 'image', from: 'taurus', w: 700, h: 300, draw: boardgame },
    { at: 55.0, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 56.4, from: 'aries', text: "I'm winning. *forgot my phone* for twenty minutes" },
    { at: 58.0, kind: 'divider', text: '1:16 AM' },
    { at: 58.6, kind: 'voice', from: 'pisces', dur: '0:58', note: '(still crying in solidarity)' },
    { at: 60.6, from: 'aries', text: "still nothing. but weirdly… *I'm ok?*" },
    { at: 62.2, from: 'cancer', text: "that's *growth*", react: [[62.8, 'heart', 9]] },
    { at: 63.6, from: 'scorpio', text: 'going to sleep. no investigating. *proud of you*' },
    { at: 65.2, kind: 'agenda', from: 'capricorn', title: 'AGENDA (CLOSED)', items: ['item 3: done', { text: 'item 4: sleep', hi: true }] },
    { at: 67.6, from: 'aries', text: 'goodnight chat' },
    { at: 68.8, kind: 'triple', from: 'gemini', items: [{ to: 'aries', text: 'night' }, { to: 'capricorn', text: 'night' }, { to: 'scorpio', text: 'NIGHT' }] },
    { at: 70.4, kind: 'system', text: '11 people said goodnight' },
    { at: 72.0, kind: 'divider', text: '3:07 AM' },
    { at: 72.6, kind: 'image', from: 'aries', w: 700, h: 330, draw: shot([{ side: 'R', text: 'had the best time. again soon?', at: -1 }, { side: 'L', text: "SO sorry!! phone died at my *sister's*", at: 73.0 }, { side: 'L', text: '*friday?*', at: 73.8 }], { title: 'my person' }) },
    { at: 75.0, from: 'aries', text: '*FRIDAY.*', big: true, react: [[75.6, 'heart', 11], [75.9, 'star', 7]] },
    { at: 76.6, from: 'leo', text: "who's awake. *I'm awake.*" },
    { at: 77.6, from: 'sagittarius', text: '*LEGEND*' },
    { at: 78.6, from: 'libra', text: 'a dead phone. *a DEAD PHONE*' },
    { at: 79.8, from: 'scorpio', text: "I said I'd sleep. *I lied.*", react: [[80.4, 'ha', 6]] },
    { at: 81.2, from: 'virgo', text: 'told you. the silence was *just a phone.*' },
    { at: 82.6, kind: 'voice', from: 'pisces', dur: '3:03', note: '(happy sobbing at 3 a.m.)', react: [[84.2, 'heart', 12], [84.6, 'tear', 12]] },
    { at: 86.2, from: 'aries', text: 'now *I\'m* crying' },
  ],
  typing: [{ from: 'aries', a: 35.6, b: 38.5 }, { from: 'virgo', a: 44.6, b: 46.4 }, { label: '11 people are typing', a: 73.4, b: 74.95 }],
  stage: [
    { at: -1, sign: 'aries', mood: 'wide', look: [1, -0.5] },
    { at: 1.0, sign: 'leo', mood: 'sparkle', look: [0, 0] },
    { at: 3.2, sign: 'taurus', mood: 'happy' },
    { at: 4.6, sign: 'gemini', mood: 'happy', hops: [4.75, 4.9] },
    { at: 6.6, sign: 'scorpio', mood: 'squint', look: [1, -1] },
    { at: 8.0, sign: 'aries', mood: 'wide', look: [0, 0], hops: [8.3, 8.6] },
    { at: 12.4, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 15.2, sign: 'aries', mood: 'squint' },
    { at: 16.6, sign: 'sagittarius', mood: 'wide' },
    { at: 18.4, sign: 'aries', mood: 'neutral', look: [1, -1] },
    { at: 22.6, sign: 'cancer', mood: 'sparkle' },
    { at: 24.0, sign: 'scorpio', mood: 'squint', look: [1, -1] },
    { at: 25.2, sign: 'virgo', mood: 'neutral' },
    { at: 26.8, sign: 'aries', mood: 'wide' },
    { at: 28.2, sign: 'gemini', mood: 'happy', hops: [28.4, 28.6] },
    { at: 33.4, sign: 'capricorn', mood: 'neutral' },
    { at: 34.6, sign: 'aries', mood: 'squint', look: [1, -1] },
    { at: 40.8, sign: 'libra', mood: 'wide', two: { sign: 'scorpio', mood: 'wide', at: 41.2 } },
    { at: 41.6, sign: 'taurus', mood: 'squint' },
    { at: 42.6, sign: 'sagittarius', mood: 'wide' },
    { at: 43.8, sign: 'aries', mood: 'wide' },
    { at: 46.5, sign: 'virgo', mood: 'happy', look: [1, -1] },
    { at: 49.6, sign: 'aries', mood: 'neutral' },
    { at: 50.8, sign: 'taurus', mood: 'happy', two: { sign: 'aries', mood: 'happy', at: 52.4 } },
    { at: 56.4, sign: 'aries', mood: 'sparkle', hops: [56.8, 57.2] },
    { at: 60.6, sign: 'aries', mood: 'happy', look: [0, 0] },
    { at: 62.2, sign: 'cancer', mood: 'sparkle' },
    { at: 63.6, sign: 'scorpio', mood: 'happy' },
    { at: 65.2, sign: 'capricorn', mood: 'neutral' },
    { at: 67.6, sign: 'aries', mood: 'sleepy' },
    { at: 68.8, sign: 'gemini', mood: 'sleepy' },
    { at: 72.6, sign: 'aries', mood: 'wide', look: [1, -1], hops: [73.1] },
    { at: 75.0, sign: 'aries', mood: 'sparkle', look: [0, 0], hops: [75.3, 75.7, 76.1] },
    { at: 76.6, sign: 'leo', mood: 'sparkle' },
    { at: 77.6, sign: 'sagittarius', mood: 'happy', hops: [77.8, 78.1] },
    { at: 78.6, sign: 'libra', mood: 'happy' },
    { at: 79.8, sign: 'scorpio', mood: 'squint' },
    { at: 81.2, sign: 'virgo', mood: 'happy' },
    { at: 86.2, sign: 'aries', mood: 'happy', tears: 2 },
  ],
  cry: [[-1, 2], [10.6, 3], [12.4, 1], [31.2, 3], [33.4, 2], [46.6, 3], [48.5, 1], [58.6, 3], [60.6, 1], [75.0, 3], [77.0, 2], [82.6, 3]],
  pisMood: [[-1, 'wide'], [10.6, 'sparkle'], [18.4, 'neutral'], [31.2, 'sparkle'], [46.5, 'happy'], [58.6, 'sleepy'], [72.6, 'wide'], [75.0, 'happy']],
  extra(x, t) {
    confetti(x, t, 75.05, 300, 1560)
    hearts(x, t, 75.2, 300, 1520, { n: 7 })
    hearts(x, t, 82.8, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    scratch: { at: 0.35, caption: 'yep. *eleven minutes.*' },
    promise: { at: 1.3, text: 'wait for the *3 a.m.* voice note' },
    chapters: [[0.0, '7 PM'], [18.0, '9 PM'], [38.0, '11 PM'], [58.0, '1 AM'], [72.0, '3 AM']],
    loading: { a: 19.0, b: 22.4, text: 'reading the silence…' },
    notify: { at: 72.4, from: 'my person', text: "SO sorry!! phone died at my sister's. friday?" },
    shakes: [8.0, 40.8, 75.0],
    flashes: [[46.5, '#7fe0c0'], [75.0, '#ff8a6a']],
  }),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
