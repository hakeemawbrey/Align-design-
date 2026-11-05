// kute23: THE UNSENT TEXT, "Five unsent texts, one night" (60 s vertical trial reel, music: cinematic · Gm).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   A long episode (60 s), five chapters of ~11 s, one recipient each; a new draft or reveal every few seconds.
//   0.00 frame 0: Capricorn mid-slam of backspace, letters flying · hook "Five unsent texts. *Wait* for the last." (promise)
//   1 THE EX      0–11   "i'm doing amazing actually" ✗ (frame 0) · "i'm doing SO well btw" ✗ · THE STARS "Healed doesn't need an *audience.*"
//   2 THE CRUSH  11–22   "per my last message" ✗ · "i liked talking to you today. like, a lot" (kept for tomorrow) · "Save it for *daylight.*"
//   3 THE FRIEND 22–33   "sorry, been busy" ✗ · "i miss you too. free saturday?" · "Miss them? Call this *weekend.*"
//   4 MOM        33–44   "will call sunday" ✗ → "miss you. call tonight?" SENT · mom: "YES. 8pm. love you!!" · "Love doesn't wait for *Sunday.*"
//   5 THE LAST   44–60   "i'm fine, just tired" ✗ → "rough day. can i call?" SENT · incoming call: Pisces · "of COURSE. i'm here." · last line
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
import { chapter, chapterCues, incomingCall, incomingCallCues, notification, notificationCues } from '../../hookkit.js'

const EP = makeUnsent({
  id: 'kute23', duration: 60,
  sign: 'capricorn', name: 'Capricorn', ending: 'cut',
  hook: 'Five unsent texts. | *Wait* for the last.', hookOut: [3.0, 3.3],
  header: t => t < 11 ? { to: 'the ex', status: 'last seen 2 days ago', statusCol: '#ff9fb8', avatar: '#ff8fb1' }
    : t < 22 ? { to: 'Sasha', status: 'online', avatar: '#9fe6b0' }
    : t < 33 ? { to: 'Mo (since 1st grade)', status: 'online', avatar: '#f2c75c' }
    : t < 44 ? { to: 'mom', status: 'online', avatar: '#ffd36b' }
    : { to: 'Pisces (best friend)', status: 'online', avatar: '#c9a6ff' },
  draftNo: (t, st) => st.k >= 0 ? `TEXT ${Math.min(5, 1 + Math.floor(Math.max(0, t) / 11))} OF 5` : null,
  msgs: [
    { text: 'saw your post. you look happy.', at: -9, stamp: '2 days ago', until: 11 },
    { text: 'haha you’re funny', at: 10.9, stamp: 'today 7:30 pm', until: 22 },
    { text: 'miss you!! when are you free?', at: 21.9, stamp: '2 weeks ago', until: 33 },
    { text: 'how are you sweetie?', at: 32.9, stamp: 'yesterday', until: 44 },
    { text: 'YES. 8pm. love you!!', at: 39.9, typing: [39.2, 39.9], until: 44 },
    { text: 'you around this week?', at: 43.9, stamp: 'monday', until: 61 },
  ],
  drafts: [
    { text: 'i’m doing amazing actually', at: -2.0, cps: 15, del: -0.3, delCps: 26 },
    { text: 'i’m doing SO well btw', at: 1.4, cps: 14, del: 3.9, delCps: 30 },
    { text: 'per my last message', at: 12.0, cps: 14, del: 14.3, delCps: 30 },
    { text: 'i liked talking to you today. like, a lot', at: 15.0, cps: 17, hide: 22.0 },
    { text: 'sorry, been busy', at: 23.0, cps: 14, del: 25.0, delCps: 30 },
    { text: 'i miss you too. free saturday?', at: 25.7, cps: 17, hide: 33.0 },
    { text: 'will call sunday', at: 34.0, cps: 14, del: 36.0, delCps: 30 },
    { text: 'miss you. call tonight?', at: 36.6, cps: 16, send: 38.5, until: 44 },
    { text: 'i’m fine, just tired', at: 45.0, cps: 15, del: 47.0, delCps: 30 },
    { text: 'rough day. can i call?', at: 47.6, cps: 15, send: 49.6 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6 }, { kind: 'whip', at: 11.0, from: 1.35 }, { kind: 'whip', at: 22.0, from: 1.35 }, { kind: 'whip', at: 33.0, from: 1.35 }, { kind: 'whip', at: 44.0, from: 1.35 }],
  effects: [
    ...[[1, 'THE EX', 3.3, 10.6], [2, 'THE CRUSH', 11.2, 21.6], [3, 'THE FRIEND', 22.2, 32.6], [4, 'MOM', 33.2, 43.6], [5, 'THE LAST ONE', 44.2, 50.2]].map(([n, title, at, o]) =>
      ({ fx: chapter, cues: chapterCues, o: { at, out: [o, o + 0.3], n, title, y: 250 } })),
    { fx: incomingCall, cues: incomingCallCues, o: { at: 50.3, out: [52.6, 52.7], name: 'Pisces', sub: 'incoming call…', glyph: '♓', color: '#9d8cff', answerAt: 52.1 } },
  ],
  moods: [[-9, 'wide', [1, -0.6]], [1.4, 'squint', [1, -0.3]], [3.9, 'wide', [0, 0]], [4.6, 'neutral', [1, 0.3]], [8.6, 'sleepy', [0, 0]],
    [11.2, 'neutral', [1, -0.3]], [12.0, 'squint', [1, -0.3]], [14.3, 'wide', [0, 0]], [15.0, 'sparkle', [1, -0.3]], [19.5, 'happy', [1, 0.3]],
    [23.0, 'squint', [1, -0.3]], [25.0, 'wide', [0, 0]], [25.7, 'sparkle', [1, -0.3]], [30.5, 'happy', [1, 0.3]],
    [34.0, 'squint', [1, -0.3]], [36.0, 'wide', [0, 0]], [36.6, 'sparkle', [1, -0.3]], [40.0, 'heart', [0, 0]],
    [45.0, 'squint', [1, -0.3]], [47.0, 'sleepy', [0, 0]], [47.6, 'sparkle', [1, -0.3]], [49.6, 'wide', [0, 0]], [52.7, 'sparkle', [1, 0.3]], [58.6, 'happy', [1, 0.3]]],
  heroTears: t => t > 47.0 && t < 52.6 ? 1 : t > 52.6 ? 2 : 0,
  pisMood: t => t > 52.6 ? 'heart' : 'sparkle',
  sob: t => t > 49.6 ? 3 : t > 4 ? 2 : 2,
  front: (c, t) => { if (t > 39.9 && t < 43) hearts(c, t, 39.95, 700, 820, { n: 5 }); if (t > 52.6) { hearts(c, t, 52.7, 930, 560, { n: 6, cell: 7 }); hearts(c, t, 55.0, 930, 560, { n: 6, cell: 7 }) } },
  segs: [
    { lines: [{ t: 4.9, text: 'Healed doesn’t need an *audience.*' }], close: 8.4 },
    { lines: [{ t: 18.0, text: 'Save it for *daylight.*' }], close: 21.4 },
    { lines: [{ t: 27.9, text: 'Miss them? Call this *weekend.*' }], close: 31.6 },
    { lines: [{ t: 40.4, text: 'Love doesn’t wait for *Sunday.*' }], close: 43.4 },
    { lines: [{ t: 53.0, speaker: '♓ PISCES', text: 'of COURSE. i’m here. tell me everything.' }, { t: 57.4, speaker: '♑ CAPRICORN', text: 'The drafts showed me what I *meant.*' }] },
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
