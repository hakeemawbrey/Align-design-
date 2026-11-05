// kxthe03: THE THREAD: EXTENDED, episode 3, "Taurus at the Holiday Table" (88 s vertical, promo/films/month2/m38.md
// row 3, music: lofi · Ab). One whole night in the chat, 7 PM → the 3 a.m. voice note. Hard cut on the last line.
//   0.0    frame 0: "The aunt asked. | Taurus *froze mid-bite.*"  Taurus mid-bite, fork up; a giant "SO, SEEING ANYONE?"
//          bubble slamming in over the chat; Taurus: "SHE ASKED" "HELP".
//   0.35   record scratch + freeze; 1.3 the promise: "stay for the answer".
//   7 PM   rewind: Taurus is the only single one at the family dinner; the chat sets up a war room; Capricorn's AGENDA;
//          Leo: "say you're dating yourself"; Aries: "invent someone" (NO); Gemini triple; Pisces' voice note.
//   9 PM   the question lands for real; loading bar; Virgo: "you don't owe a status update. be warm, then ask back."
//   11 PM  Taurus asks the aunt how she met her partner: the whole story; "she cried. I cried. they gave me leftovers"
//   1 AM   home with leftovers; Cancer's loaf; Taurus: "I like my life right now."
//   3 AM   Pisces' 3 a.m. voice note, sobbing at the aunt's love story. Last line, hard cut at 88.
import { makeXThread, shot, R, label, drawStarChar, signStar, hearts, BONE, GOLD, INK, MONO, INTER, prog, ease } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 88

// a pixel photo: the long table, the aunt (a soft pink star) mid-story, Taurus listening, a candle
function tablePhoto(x, t, w, h) {
  R(x, '#2a1a3c', 0, 0, w, h)
  R(x, '#ffcf8a', 0, 0, w, 6)
  // window with snow
  R(x, '#1a2a5a', w - 170, 26, 130, 110)
  for (let i = 0; i < 9; i++) R(x, '#efe6d6', w - 165 + ((i * 37) % 120), 30 + ((t * 30 + i * 23) % 100), 5, 5)
  // table
  R(x, '#6b3f2a', 20, h - 90, w - 40, 26); R(x, '#efe6d6', 30, h - 104, w - 60, 16)
  R(x, GOLD, w / 2 - 6, h - 150, 12, 46); R(x, '#ff9a3a', w / 2 - 5, h - 166 + Math.sin(t * 12) * 2, 10, 14)
  const aunt = { color: '#ff9ec7', glyph: '' }
  drawStarChar(x, 150, h - 150, 130, t, { color: aunt.color, mood: 'happy', look: [1, 0], seed: 3, glow: 0.4, tips: false, bob: 4 })
  const T = signStar('taurus')
  drawStarChar(x, w - 170, h - 150, 130, t, { color: T.color, glyph: T.glyph, mood: t > 41 ? 'sparkle' : 'wide', look: [-1, 0], seed: 7, glow: 0.4, tips: false, bob: 3 })
  label(x, 'the aunt', 150, h - 30, { size: 20, col: '#ff9ec7' })
  label(x, '♉︎ TAURUS', w - 170, h - 30, { size: 20, col: T.color })
}
// a pixel photo of a loaf of bread on a board
function loafPhoto(x, t, w, h) {
  R(x, '#24183e', 0, 0, w, h)
  R(x, '#7a4a2a', 60, h - 70, w - 120, 30)
  const k = ease.outBack(prog(t, 64.4, 64.9))
  x.save(); x.translate(w / 2, h - 110); x.scale(k, k)
  R(x, INK, -150, -70, 300, 110); R(x, '#d98a3a', -144, -64, 288, 98); R(x, '#f2b25c', -144, -64, 288, 22)
  for (let i = 0; i < 4; i++) R(x, '#a85c22', -100 + i * 62, -54, 30, 8)
  x.restore()
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('"for no reason"', w / 2, 40)
}

const EP = makeXThread({
  id: 'kxthe03', len: LEN, chat: 'say it out loud',
  heads: [
    { at: -1, text: 'The aunt asked. | Taurus *froze mid-bite.*', accent: '#7fd36a' },
    { at: 3.0, text: 'The only single one | *at the table.*' },
    { at: 8.4, text: 'The chat opens | *a war room.*' },
    { at: 18.4, text: 'The question | *lands.*', accent: '#7fd36a' },
    { at: 27.6, text: 'Virgo has | *the answer.*' },
    { at: 36.6, text: 'Taurus | *asks back.*' },
    { at: 44.6, text: 'The aunt has | *a whole love story.*' },
    { at: 56.6, text: '1 AM. Home. | *With leftovers.*' },
    { at: 66.6, text: '"I like my life | *right now."*' },
    { at: 73.4, text: 'The *3 a.m.* | voice note.' },
  ],
  last: { at: 86.25, text: 'Single. | *Best story at the table.*' },
  pins: [[12.0, { from: 'leo', text: "Leo: say you're dating yourself (iconic)" }], [62.0, { from: 'leo', text: 'Leo: I would also have cried at the bread' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '8:41 PM' },
    { at: -0.9, from: 'taurus', text: '*SHE ASKED*', big: true },
    { at: -0.6, from: 'taurus', text: 'mid-bite. fork in the air. *HELP*' },
    { at: 2.4, kind: 'divider', text: 'earlier · 7:00 PM' },
    { at: 2.8, from: 'taurus', text: 'family dinner. everyone brought *a partner.* I brought a casserole' },
    { at: 4.6, from: 'taurus', text: 'the casserole is my date tonight' },
    { at: 5.8, from: 'cancer', text: "it's a beautiful casserole", react: [[6.4, 'heart', 5]] },
    { at: 7.0, kind: 'voice', from: 'pisces', dur: '0:33', note: '(crying: you are SO brave)' },
    { at: 8.4, kind: 'agenda', from: 'capricorn', title: 'WAR ROOM', items: ['eat', 'survive', { text: 'dessert', hi: true }] },
    { at: 11.0, from: 'leo', text: "if they ask: *you're dating yourself.* it's going great" },
    { at: 12.0, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 13.2, from: 'aries', text: 'or say yes and *invent someone*' },
    { at: 14.2, from: 'virgo', text: '*no.*' },
    { at: 14.6, from: 'libra', text: '*no.*' },
    { at: 15.0, from: 'scorpio', text: '*no.*' },
    { at: 15.8, kind: 'triple', from: 'gemini', items: [{ to: 'aries', text: 'their name is Kevin' }, { to: 'virgo', text: 'JOKING' }, { to: 'taurus', text: 'what kind of casserole' }] },
    { at: 18.0, kind: 'divider', text: '8:41 PM' },
    { at: 18.4, from: 'taurus', text: 'it happened. *"so, seeing anyone?"* everyone is looking at me', big: true },
    { at: 21.6, from: 'sagittarius', text: 'say you have a flight. leave. *airport*' },
    { at: 22.8, from: 'taurus', text: 'I am mid-*bite*' },
    { at: 24.0, from: 'scorpio', text: 'chew slowly. buy time.', react: [[24.6, 'ha', 7]] },
    { at: 27.6, from: 'virgo', text: "you don't owe anyone a status update. *be warm. then ask them something back.*", big: true, react: [[28.6, 'heart', 11]] },
    { at: 31.0, from: 'taurus', text: 'ask her *what*' },
    { at: 32.2, from: 'libra', text: 'how she met her partner. *everyone* loves telling that' },
    { at: 34.2, from: 'taurus', text: 'swallowed. going in.' },
    { at: 36.0, kind: 'divider', text: '9:30 PM' },
    { at: 36.6, from: 'taurus', text: 'I said "not right now, honestly I\'m good. *how did YOU two meet?*"' },
    { at: 38.6, from: 'aquarius', text: 'the reverse question. *elegant*' },
    { at: 40.0, from: 'taurus', text: 'she put her fork down. *this is a long one*' },
    { at: 41.8, kind: 'image', from: 'taurus', w: 720, h: 300, draw: tablePhoto },
    { at: 44.6, from: 'taurus', text: 'they met at a bus stop in the snow. he gave her *his scarf.* she still has it' },
    { at: 47.2, from: 'cancer', text: '*the scarf*', react: [[47.6, 'tear', 8]] },
    { at: 48.4, kind: 'voice', from: 'pisces', dur: '2:20', note: '(sobbing about a scarf I have never seen)' },
    { at: 50.6, from: 'taurus', text: 'she cried. I cried. *they gave me the leftovers*', react: [[51.2, 'heart', 11]] },
    { at: 52.8, from: 'capricorn', text: 'war room: *a win.* minuted.' },
    { at: 54.4, from: 'aries', text: 'ok fine that was better than Kevin' },
    { at: 56.0, kind: 'divider', text: '1:02 AM' },
    { at: 56.6, from: 'taurus', text: "home. on the couch. with *three* containers" },
    { at: 58.4, from: 'gemini', text: 'what is in the third container' },
    { at: 59.4, from: 'taurus', text: '*pie*' },
    { at: 60.4, from: 'sagittarius', text: 'single and *winning*' },
    { at: 62.0, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 63.6, from: 'cancer', text: 'I baked a loaf for no reason. here', react: [[65.6, 'heart', 6]] },
    { at: 64.2, kind: 'image', from: 'cancer', w: 600, h: 240, draw: loafPhoto },
    { at: 66.6, from: 'taurus', text: 'honestly? *I like my life right now.* I really do', big: true, react: [[67.6, 'heart', 11], [67.9, 'star', 8]] },
    { at: 69.4, from: 'virgo', text: 'that was the whole answer. you gave it *at dinner.*' },
    { at: 71.0, kind: 'system', text: '10 people said goodnight' },
    { at: 72.6, kind: 'divider', text: '3:04 AM' },
    { at: 73.4, kind: 'voice', from: 'pisces', dur: '3:04', note: '(still sobbing about the scarf)', react: [[75.2, 'heart', 11], [75.6, 'tear', 11]] },
    { at: 76.6, from: 'scorpio', text: 'Pisces. it has been *six hours*' },
    { at: 78.0, from: 'pisces', text: 'SHE STILL HAS IT', big: true },
    { at: 79.8, from: 'taurus', text: 'I asked. *she brought it out.* it\'s green' },
    { at: 81.4, from: 'libra', text: '*green.* of course it\'s green' },
    { at: 82.8, from: 'taurus', text: 'next year I\'m asking *everyone* their story' },
  ],
  typing: [{ label: '11 people are typing', a: 0.5, b: 2.35 }, { from: 'virgo', a: 25.4, b: 27.5 }, { from: 'taurus', a: 42.6, b: 44.5 }],
  stage: [
    { at: -1, sign: 'taurus', mood: 'wide', look: [1, -0.5], prop: fork },
    { at: 2.8, sign: 'taurus', mood: 'neutral', prop: fork },
    { at: 5.8, sign: 'cancer', mood: 'sparkle' },
    { at: 8.4, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 11.0, sign: 'leo', mood: 'sparkle' },
    { at: 13.2, sign: 'aries', mood: 'happy' },
    { at: 14.2, sign: 'virgo', mood: 'squint', two: { sign: 'libra', mood: 'squint', at: 14.6 } },
    { at: 15.8, sign: 'gemini', mood: 'happy', hops: [16.0, 16.2] },
    { at: 18.4, sign: 'taurus', mood: 'wide', look: [0, 0], prop: fork },
    { at: 21.6, sign: 'sagittarius', mood: 'wide' },
    { at: 22.8, sign: 'taurus', mood: 'squint', prop: fork },
    { at: 24.0, sign: 'scorpio', mood: 'squint' },
    { at: 27.6, sign: 'virgo', mood: 'happy', look: [1, -1] },
    { at: 31.0, sign: 'taurus', mood: 'wide', prop: fork },
    { at: 32.2, sign: 'libra', mood: 'sparkle' },
    { at: 34.2, sign: 'taurus', mood: 'neutral', look: [0, 0], prop: fork },
    { at: 38.6, sign: 'aquarius', mood: 'neutral' },
    { at: 40.0, sign: 'taurus', mood: 'sparkle' },
    { at: 47.2, sign: 'cancer', mood: 'sparkle', tears: 2 },
    { at: 50.6, sign: 'taurus', mood: 'happy', tears: 2, hops: [51.0] },
    { at: 52.8, sign: 'capricorn', mood: 'happy' },
    { at: 54.4, sign: 'aries', mood: 'squint' },
    { at: 56.6, sign: 'taurus', mood: 'happy', look: [0, 0] },
    { at: 58.4, sign: 'gemini', mood: 'wide' },
    { at: 59.4, sign: 'taurus', mood: 'sparkle', hops: [59.6] },
    { at: 60.4, sign: 'sagittarius', mood: 'happy' },
    { at: 63.6, sign: 'cancer', mood: 'happy' },
    { at: 66.6, sign: 'taurus', mood: 'happy', look: [0, 0], hops: [66.9, 67.3] },
    { at: 69.4, sign: 'virgo', mood: 'happy' },
    { at: 76.6, sign: 'scorpio', mood: 'sleepy' },
    { at: 79.8, sign: 'taurus', mood: 'sleepy' },
    { at: 81.4, sign: 'libra', mood: 'sleepy' },
    { at: 82.8, sign: 'taurus', mood: 'happy' },
  ],
  cry: [[-1, 2], [7.0, 3], [8.6, 1], [18.4, 2], [27.6, 1], [44.6, 2], [48.4, 3], [56.6, 2], [66.6, 3], [69.0, 2], [73.4, 3]],
  pisMood: [[-1, 'wide'], [7.0, 'sparkle'], [18.4, 'wide'], [27.6, 'neutral'], [44.6, 'sparkle'], [56.6, 'happy'], [72.6, 'sleepy'], [73.4, 'sparkle']],
  extra(x, t) {
    hearts(x, t, 50.8, 300, 1520, { n: 6 })
    hearts(x, t, 66.8, 300, 1520, { n: 7 })
    hearts(x, t, 73.6, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    scratch: { at: 0.35, caption: 'yep. *mid-bite.*' },
    promise: { at: 1.3, text: 'stay for *the answer*' },
    rewind: { at: 2.4, text: 'EARLIER · 7 PM' },
    chapters: [[2.4, '7 PM'], [18.0, '8:41 PM'], [36.0, '9:30 PM'], [56.0, '1 AM'], [72.6, '3 AM']],
    bubble0: { text: 'SO, *SEEING ANYONE?*', out: 2.2 },
    loading: { a: 19.6, b: 23.4, text: 'thinking of an answer…' },
    shakes: [-0.2, 18.4, 78.0],
    flashes: [[27.6, '#7fe0c0'], [66.6, '#7fd36a']],
  }),
})

// the fork, frozen mid-bite, held in Taurus's other hand
function fork(x, t, { F, pk }) {
  x.save(); x.translate(300 - F.S * 0.42, F.cy - F.S * 0.05); x.rotate(-0.3); x.scale(pk, pk)
  R(x, INK, -7, -70, 14, 110); R(x, '#cfd6e6', -4, -66, 8, 102)
  for (let i = 0; i < 3; i++) { R(x, INK, -16 + i * 12, -104, 8, 40); R(x, '#cfd6e6', -14 + i * 12, -102, 4, 36) }
  R(x, '#f2b25c', -16, -112, 32, 14)
  x.restore()
}

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
