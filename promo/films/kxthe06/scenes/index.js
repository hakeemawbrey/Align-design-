// kxthe06: THE THREAD: EXTENDED, episode 6, "They Ended It" (90 s vertical, promo/films/month2/m38.md row 6,
// music: cinematic · Cm). One whole night in the chat → the 3 a.m. voice note. Hard cut on the last line.
//   0.0    frame 0: '"They ended it." | *Eleven people typing.*'  Libra slumped, phone dropped; "they ended it." and the
//          eleven-typing row; the chat mid-scramble.
//   0.3    whip zoom + shake; 1.3 the promise: "nobody logs off. stay till 3 a.m."
//   7 PM   the chat drops everything: Capricorn's AGENDA (1. Libra 2. Libra 3. Libra); Taurus on the way with soup (a photo
//          of the pot in the car seat); Leo pins "LIBRA IS A TEN"; Gemini triple (blanket / tissues / a dumb video).
//   9 PM   Libra: "was it me?"; Virgo: "sometimes it's nobody. you were kind the whole way through. that counts."
//   11 PM  Libra cries; Pisces cries harder; Sag tells the worst date story in history; Libra: "ha".
//   1 AM   Cancer starts a video call: nobody talks, everyone stays. Libra: "I'm sad but I'm not alone."
//   3 AM   Libra's own voice note, laughing a little; Pisces' 3 a.m. voice note: "we love you". Last line, hard cut at 90.
import { makeXThread, R, label, hearts, BONE, GOLD, INK, MONO, prog, ease, drawStarChar, signStar } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 90

// a pixel photo: a soup pot buckled into a car seat
function soupPhoto(x, t, w, h) {
  R(x, '#1d1640', 0, 0, w, h)
  R(x, '#3a2f6e', 40, 40, w - 80, h - 60)               // the seat
  R(x, '#2a2150', 60, 60, w - 120, 40)
  R(x, INK, w / 2 - 110, h - 170, 220, 130); R(x, '#c0c6d6', w / 2 - 104, h - 164, 208, 118); R(x, '#e8ecf4', w / 2 - 104, h - 164, 208, 20)
  R(x, INK, w / 2 - 130, h - 140, 24, 16); R(x, INK, w / 2 + 106, h - 140, 24, 16)
  R(x, '#e8344e', 40, h - 150, w - 80, 14)              // the seatbelt
  for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.globalAlpha = 1 - p; R(x, BONE, w / 2 - 40 + i * 34, h - 180 - p * 70, 10, 22); x.globalAlpha = 1 }
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('buckled in. 12 min away', w / 2, 24)
}
// a pixel video call grid: twelve little tiles, everyone just there, quiet
function callGrid(x, t, w, h) {
  R(x, '#120c2a', 0, 0, w, h)
  const ids = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
  const cw = (w - 20) / 4, ch = (h - 20) / 3
  ids.forEach((id, i) => {
    const X = 10 + (i % 4) * cw, Y = 10 + Math.floor(i / 4) * ch
    R(x, id === 'libra' ? '#3a2a6e' : '#221a4a', X + 3, Y + 3, cw - 6, ch - 6)
    const S = signStar(id)
    const mood = id === 'pisces' ? 'sparkle' : id === 'libra' ? (t > 66 ? 'happy' : 'neutral') : 'sleepy'
    drawStarChar(x, X + cw / 2, Y + ch / 2 + 4, Math.min(cw, ch) * 0.62, t, { color: S.color, glyph: S.glyph, mood, look: [0, 0], seed: i + 1, glow: 0.4, tips: false, bob: 2 })
  })
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'top'; x.fillText('● 12 on call · 0 talking', 16, h - 30)
}

const EP = makeXThread({
  id: 'kxthe06', len: LEN, chat: 'say it out loud',
  heads: [
    { at: -1, text: '"They ended it." | *Eleven people typing.*', accent: '#ff8fb1' },
    { at: 3.0, text: 'The night | *after the breakup.*' },
    { at: 7.6, text: 'The chat drops | *everything.*' },
    { at: 14.6, text: 'Taurus is bringing | *soup.*' },
    { at: 21.6, text: 'The question | *at 9 p.m.*' },
    { at: 25.6, text: 'Virgo has | *the answer.*' },
    { at: 38.4, text: 'Sag has | *the worst date story.*', accent: '#ff8fb1' },
    { at: 50.4, text: 'Libra | *laughed.*' },
    { at: 58.6, text: 'Nobody talks. | *Everybody stays.*' },
    { at: 72.6, text: 'The *3 a.m.* | voice notes.' },
  ],
  last: { at: 88.25, text: 'Sad, but | not *alone.*' },
  pins: [[17.6, { from: 'leo', text: 'Leo: LIBRA IS A TEN. this is not up for debate' }], [56.4, { from: 'leo', text: 'Leo: Sag told the worst date story ever (historic)' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '7:12 PM' },
    { at: -0.9, from: 'libra', text: '*they ended it.*', big: true },
    { at: -0.7, from: 'libra', text: 'they were really kind about it. *I\'m not ok*' },
    { at: 1.0, from: 'cancer', text: 'oh Libra. *coming online*' },
    { at: 2.0, from: 'aries', text: 'here. right here' },
    { at: 3.0, from: 'scorpio', text: 'here.' },
    { at: 4.0, from: 'sagittarius', text: 'here!! cancelling everything' },
    { at: 5.2, kind: 'voice', from: 'pisces', dur: '0:47', note: '(already sobbing, I am SO sorry)' },
    { at: 7.6, kind: 'agenda', from: 'capricorn', title: 'AGENDA (TONIGHT)', items: ['Libra', 'Libra', { text: 'Libra', hi: true }] },
    { at: 10.6, from: 'libra', text: 'I don\'t even know what I need' },
    { at: 12.0, kind: 'triple', from: 'gemini', items: [{ to: 'libra', text: 'blanket' }, { to: 'libra', text: 'tissues' }, { to: 'libra', text: 'a very dumb video. sending' }] },
    { at: 14.6, from: 'taurus', text: 'soup is on the way. *non-negotiable*' },
    { at: 15.4, kind: 'image', from: 'taurus', w: 640, h: 300, draw: soupPhoto },
    { at: 17.6, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 19.0, from: 'aries', text: 'want me to make you a playlist? sad songs first, then *angry*, then *healing*' },
    { at: 20.6, kind: 'divider', text: '9:05 PM' },
    { at: 21.6, from: 'libra', text: 'can I ask something. *was it me?*', big: true, react: [[22.6, 'heart', 11]] },
    { at: 25.6, from: 'virgo', text: "sometimes it's nobody. *you were kind the whole way through.* that counts.", big: true, react: [[26.8, 'heart', 11], [27.1, 'tear', 6]] },
    { at: 28.8, from: 'libra', text: 'it doesn\'t feel like it counts tonight' },
    { at: 30.2, from: 'virgo', text: 'it doesn\'t have to tonight. *it will.*' },
    { at: 31.8, from: 'aquarius', text: 'you are allowed to just be sad. no fixing required' },
    { at: 33.4, from: 'taurus', text: 'soup has arrived. *Libra is eating soup*', react: [[34.0, 'heart', 9]] },
    { at: 35.0, kind: 'voice', from: 'pisces', dur: '1:58', note: '(sobbing about the soup now)' },
    { at: 37.0, kind: 'divider', text: '11:14 PM' },
    { at: 38.4, from: 'sagittarius', text: 'ok. story time. *the worst date in history.* mine.' },
    { at: 40.2, from: 'sagittarius', text: 'I went to the wrong café. waited an hour. they were at the *other* café. same name' },
    { at: 42.6, from: 'sagittarius', text: 'we both left. *we met at the bus stop.*' },
    { at: 44.2, from: 'sagittarius', text: 'it was raining. I had their umbrella. *they had mine.*' },
    { at: 46.2, from: 'scorpio', text: 'how did you have each other\'s umbrellas' },
    { at: 47.4, from: 'sagittarius', text: 'NOBODY KNOWS.', big: true },
    { at: 50.4, from: 'libra', text: '*ha*', react: [[51.0, 'heart', 11], [51.3, 'star', 11]] },
    { at: 51.8, from: 'cancer', text: 'LIBRA LAUGHED' },
    { at: 52.6, from: 'cancer', text: 'somebody write it down. *Libra laughed.*' },
    { at: 53.8, from: 'capricorn', text: 'agenda item 3: *progress.*' },
    { at: 55.2, from: 'sagittarius', text: 'I have eleven more of these' },
    { at: 56.4, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 57.6, kind: 'divider', text: '1:03 AM' },
    { at: 58.6, kind: 'system', text: '♋︎ Cancer started a video call' },
    { at: 62.4, kind: 'image', from: 'cancer', w: 720, h: 360, draw: callGrid },
    { at: 65.0, from: 'libra', text: 'nobody is saying anything' },
    { at: 66.2, from: 'cancer', text: '*we\'re just here.*' },
    { at: 67.8, from: 'libra', text: "I'm sad. but I'm *not alone.*", big: true, react: [[68.8, 'heart', 12], [69.1, 'tear', 12]] },
    { at: 70.6, kind: 'system', text: '12 people still on the call' },
    { at: 72.0, kind: 'divider', text: '3:00 AM' },
    { at: 72.6, kind: 'voice', from: 'libra', dur: '0:09', note: '(laughing a little. "the umbrellas, though")' },
    { at: 75.4, from: 'sagittarius', text: 'THE UMBRELLAS', react: [[76.0, 'ha', 10]] },
    { at: 76.8, from: 'aries', text: 'playlist is finished. *healing* section is the longest' },
    { at: 78.4, from: 'virgo', text: 'go to sleep, Libra. *we\'ll be here in the morning.*' },
    { at: 80.0, kind: 'voice', from: 'pisces', dur: '3:00', note: '(sobbing: we LOVE you)', react: [[82.0, 'heart', 12], [82.4, 'tear', 12]] },
    { at: 83.4, from: 'libra', text: 'love you all. *goodnight*' },
    { at: 85.0, kind: 'system', text: 'Libra is asleep · 11 people stayed' },
  ],
  typing: [{ label: '11 people are typing', a: -1, b: 0.95 }, { from: 'virgo', a: 23.2, b: 25.5 }, { from: 'sagittarius', a: 36.8, b: 38.35 }],
  stage: [
    { at: -1, sign: 'libra', mood: 'wide', look: [1, 0.6], tears: 2 },
    { at: 1.0, sign: 'cancer', mood: 'wide' },
    { at: 2.0, sign: 'aries', mood: 'wide', two: { sign: 'scorpio', mood: 'neutral', at: 3.0 } },
    { at: 4.0, sign: 'sagittarius', mood: 'wide', hops: [4.2] },
    { at: 7.6, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 10.6, sign: 'libra', mood: 'neutral', tears: 1 },
    { at: 12.0, sign: 'gemini', mood: 'happy', hops: [12.2, 12.4] },
    { at: 14.6, sign: 'taurus', mood: 'squint', look: [1, -1] },
    { at: 19.0, sign: 'aries', mood: 'happy' },
    { at: 21.6, sign: 'libra', mood: 'neutral', look: [0, 0], tears: 2 },
    { at: 25.6, sign: 'virgo', mood: 'happy', look: [1, -1] },
    { at: 28.8, sign: 'libra', mood: 'neutral', tears: 1 },
    { at: 30.2, sign: 'virgo', mood: 'neutral' },
    { at: 31.8, sign: 'aquarius', mood: 'neutral' },
    { at: 33.4, sign: 'taurus', mood: 'happy', two: { sign: 'libra', mood: 'neutral', at: 33.4 } },
    { at: 38.4, sign: 'sagittarius', mood: 'happy', look: [0, 0] },
    { at: 40.2, sign: 'sagittarius', mood: 'wide' },
    { at: 44.2, sign: 'sagittarius', mood: 'squint' },
    { at: 46.2, sign: 'scorpio', mood: 'squint' },
    { at: 47.4, sign: 'sagittarius', mood: 'wide', hops: [47.6, 47.9] },
    { at: 50.4, sign: 'libra', mood: 'happy', look: [0, 0], hops: [50.6], tears: 1 },
    { at: 51.8, sign: 'cancer', mood: 'sparkle', hops: [52.0, 52.3] },
    { at: 53.8, sign: 'capricorn', mood: 'happy' },
    { at: 55.2, sign: 'sagittarius', mood: 'sparkle' },
    { at: 58.6, sign: 'cancer', mood: 'happy' },
    { at: 65.0, sign: 'libra', mood: 'neutral' },
    { at: 66.2, sign: 'cancer', mood: 'happy' },
    { at: 67.8, sign: 'libra', mood: 'sparkle', look: [0, 0], tears: 2 },
    { at: 72.6, sign: 'libra', mood: 'happy', look: [1, -1] },
    { at: 75.4, sign: 'sagittarius', mood: 'wide', hops: [75.6] },
    { at: 76.8, sign: 'aries', mood: 'happy' },
    { at: 78.4, sign: 'virgo', mood: 'happy' },
    { at: 83.4, sign: 'libra', mood: 'sleepy' },
  ],
  cry: [[-1, 3], [5.2, 3], [7.6, 2], [21.6, 3], [25.6, 2], [35.0, 3], [37.0, 1], [50.4, 2], [67.8, 3], [70.0, 2], [80.0, 3]],
  pisMood: [[-1, 'wide'], [5.2, 'sparkle'], [21.6, 'wide'], [25.6, 'neutral'], [35.0, 'sparkle'], [50.4, 'happy'], [72.0, 'sleepy'], [80.0, 'sparkle']],
  extra(x, t) {
    hearts(x, t, 50.6, 300, 1520, { n: 6 })
    hearts(x, t, 68.0, 300, 1520, { n: 8 })
    hearts(x, t, 80.2, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    whip: 0.3,
    promise: { at: 1.3, text: 'nobody logs off. *stay till 3 a.m.*' },
    chapters: [[0.0, '7 PM'], [20.6, '9 PM'], [37.0, '11 PM'], [57.6, '1 AM', 1.0], [72.0, '3 AM']],
    calls: [{ at: 59.0, out: [61.9, 62.2], answerAt: 61.2, name: 'the *group chat*', sub: 'Cancer is calling… (12 people)', glyph: '♋︎', color: '#9fd8f6' }],
    shakes: [0.35, 47.4],
    flashes: [[21.6, '#ff8fb1'], [50.4, '#f2c75c'], [67.8, '#ff8fb1']],
  }),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
