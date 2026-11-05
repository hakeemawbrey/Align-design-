// kzce18: ZODIAC COURTROOM, "The Advice Giver" (80 s vertical, Month 2 boost m06 #18, long, lofi · Bb). Hard cut.
//   0.0   frame 0: ♍ Virgo mid-lecture in the dock at a little whiteboard ("STEP 1: SAY IT"); gavel mid-slam; whip in.
//         Hook: "Virgo gives great advice. | *Takes none.*"   3.2 the promise: "Stay for the *sentence.*"
//   CH.1 OPENING (5.4): JUDGE: the charge · ♐ prosecution: "they told *everyone* to be honest." · "*everyone* but themself."
//         (gasp) · ♉ defence: "my client is simply very *wise.*" · "too wise to *use* it."
//   CH.2 THE EVIDENCE (19.0): A Virgo → ♊ ("should I tell them I like them?" · "always. say it kindly." · "omg it WORKED")
//         · B Virgo → ♎ ("how do I say no to plans?" · "'not this time, but thank you!'" · "it worked!!")
//         · C Virgo → ♓ ("I miss them" · "feel it. call a friend. no 2 a.m. texts." · "I called you!")
//   CH.3 SURPRISE WITNESS (36.0): THE EX: "they told me 'just say how you *feel.*'" · "they never said how they *felt.*"
//         (gasp) · "I still don't know if they *liked* me." · "say it to the next one. *please.*"
//   CH.4 CLOSING (52.0): the whiteboard read back: say it kindly · it's ok to feel it · you deserve to be heard ·
//         VIRGO: "…oh. that's for *me*, isn't it."
//   CH.5 THE VERDICT (63.0): GUILTY (OF NOT TAKING IT) · "take your own advice. today." · Virgo sends: "I like you.
//         (taking my own advice)" · 70.4 the reply drops: "…I like you *too!!*" (gasp, hearts) · JUDGE: "good advice.
//         *finally* used." (gavel)
//   78.6  last line "Take your own advice. | It's *good.*" holds to 80.0, hard cut.   Pisces cries the whole trial.
import { makeCourt, drawChat, label, box, R, clamp, prog, ease, INK, RED, GOLD, GREEN, popWords } from '../../kzce01/scenes/courtkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const seq = (t, list) => { let v = list[0][1]; for (const [a, m] of list) if (t >= a) v = m; return v }
const T = { pros: 8.2, def: 13.4, evA: 19.4, evB: 24.8, evC: 30.2, wit: 37.8, back: 52.0, read: 52.4, oh: 58.6, guilty: 63.6, send: 68.2, reply: 70.4, adj: 76.0, last: 78.6 }
const NOTE = { at: T.reply, out: [73.2, 73.5], title: 'messages', body: '…I like you *too!!*', glyph: '♌', time: 'now', y: 240 }
const CH = [
  { at: 5.4, out: [18.7, 19.0], title: 'OPENING STATEMENTS' }, { at: 19.0, out: [35.7, 36.0], title: 'THE EVIDENCE' },
  { at: 36.0, out: [51.7, 52.0], title: 'SURPRISE WITNESS' }, { at: 52.0, out: [62.7, 63.0], title: 'CLOSING' }, { at: 63.0, out: [78.3, 78.6], title: 'THE VERDICT' },
]
const BOARD = [['say it kindly', 53.0], ["it's ok to feel it", 54.6], ['you deserve to be heard', 56.2]]
function board(x, t, P, big = false) {
  const X = P.x + 120, Y = P.y - 200
  x.save(); x.translate(X, Y); x.rotate(0.04)
  box(x, -100, -80, 200, 150, '#fffaf0', { b: 6, hi: null }); R(x, INK, -6, 76, 12, 90)
  label(x, 'STEP 1:', 0, -40, { size: 26, col: '#4f7cd8', weight: 900, shadow: false }); label(x, 'SAY IT', 0, 0, { size: 34, col: RED, weight: 900, shadow: false })
  x.restore(); void big
}
function phone(x, t, P) {
  if (t < T.send - 0.3 || t > 73.5) return
  const k = ease.outBack(clamp(prog(t, T.send - 0.3, T.send))) * (1 - prog(t, 73.2, 73.5))
  x.save(); x.translate(P.x + 150, P.y - 170); x.scale(k, k); x.rotate(-0.06)
  box(x, -120, -150, 240, 300, '#2a2148', { b: 6 }); R(x, '#120d26', -104, -130, 208, 260)
  box(x, -90, -100, 180, 120, '#7fd0ff', { b: 3, hi: null })
  label(x, 'I like you.', 0, -66, { size: 28, col: INK, weight: 900, shadow: false }); label(x, '(taking my', 0, -30, { size: 20, col: INK, weight: 800, shadow: false }); label(x, 'own advice)', 0, -6, { size: 20, col: INK, weight: 800, shadow: false })
  label(x, 'sent', 60, 40, { size: 20, col: '#9fe6b0', weight: 700 })
  x.restore()
}
const vMood = t => seq(t, [[0, 'happy'], [1.4, 'neutral'], [T.back, 'neutral'], [55, 'squint'], [T.oh, 'wide'], [61, 'sparkle'], [T.guilty + 0.1, 'wide'], [65, 'neutral'], [T.send, 'squint'], [T.reply, 'heart']])
const virgo = (from, to) => ({ who: 'virgo', from, to, mood: vMood, look: t => t < 1.4 ? [1, -0.6] : t > T.send && t < T.reply ? [1, -0.6] : undefined, hops: [0.0, 0.4, 0.8, T.reply + 0.2, T.reply + 0.5, T.reply + 0.8], tears: t => t > T.oh && t < T.guilty ? 1 : 0,
  prop: (x, t, P) => { if (t < 5.4) board(x, t, P); phone(x, t, P) } })
const CFG = {
  id: 'kzce18', dur: 80, ending: 'cut',
  hook: { at: -1, text: 'Virgo gives great advice. | *Takes none.*', out: [3.0, 3.2], accentColor: '#ef5c94', size: 94 },
  heads: [
    { text: 'Stay for the *sentence.*', at: 3.2, out: [5.2, 5.4], accent: GOLD, size: 104, late: 1, lateAt: 3.5 },
    { text: 'Take your own advice. | It\'s *good.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#ef5c94', size: 96 },
  ],
  kit: [notification(NOTE)], kitCues: notificationCues(NOTE),
  chapters: CH,
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.evA - 0.05, from: 1.15 }, { at: T.wit, from: 1.3 }, { at: T.guilty + 0.08, from: 1.2 }, { at: T.reply, from: 1.15 }],
    recs: [{ at: 42.0, len: 1.2, caption: 'they *never* said it.', top: 1480 }], flashes: [[T.wit, '#ffffff'], [T.guilty + 0.1, '#ffd0d8'], [T.reply, '#ffc2d4']] },
  gavels: [0.05, 5.5, T.wit - 1.2, T.guilty, T.adj],
  gasps: [-0.2, 11.2, 22.7, 28.2, 34.4, T.wit + 0.1, 41.8, T.guilty + 0.1, T.reply + 0.2],
  jury: ['aries', 'scorpio', 'capricorn', 'pisces', 'aquarius', 'cancer'],
  tears: () => 3,
  juryTears: t => (t > 44.6 && t < 52) || t > T.reply + 0.4 ? 1 : 0,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > 33 && t < 35.6 ? 'happy' : t > T.reply ? 'heart' : undefined
    if (t > 16.2 && t < 18.6) return 'happy'
    if (t > 61 && t < 63) return 'sparkle'
    if (t > T.reply + 0.3) return 'heart'
  },
  judge: { mood: t => seq(t, [[0, 'squint'], [1.4, 'neutral'], [11, 'wide'], [13.4, 'neutral'], [16.2, 'happy'], [19.4, 'neutral'], [T.wit, 'wide'], [44, 'neutral'], [T.oh, 'sparkle'], [T.guilty, 'neutral'], [T.reply, 'heart'], [75, 'happy']]),
    tears: t => t > T.reply + 0.6 ? 2 : 0, look: t => (t > T.evA && t < 35.6) || (t > T.read && t < 58.4) ? [0, 1] : t > 5.5 ? [-1, 1] : [0, 0.3] },
  dock: [
    virgo(-1, T.pros),
    { who: 'sagittarius', from: T.pros, to: T.def, plate: 'PROSECUTION', mood: t => t < 10.8 ? 'squint' : 'wide', look: () => [1, -0.4] },
    { who: 'taurus', from: T.def, to: T.evA, plate: 'DEFENCE', mood: t => t < 16 ? 'neutral' : 'wink', look: () => [1, -0.4] },
    virgo(T.evA, T.wit),
    { who: 'ex', from: T.wit, to: T.back, plate: 'WITNESS', mood: t => seq(t, [[0, 'neutral'], [41.2, 'squint'], [48, 'happy']]), look: () => [1, -0.3], tears: t => t > 44.6 && t < 47.8 ? 2 : 0 },
    virgo(T.back, 1e9),
  ],
  ticker: { at: 1.0, out: [78.3, 78.6], label: 'CHARGE', text: 'GIVES GREAT ADVICE. TAKES NONE OF IT.' },
  boxes: [
    { open: 1.3, close: 3.15, lines: [{ t: 1.45, who: 'JUDGE', text: 'order! the defendant will *sit.*' }] },
    { open: 5.6, close: 8.1, lines: [{ t: 5.7, who: 'JUDGE', text: 'the charge: gives advice. never *takes it.*' }] },
    { open: 8.35, close: 13.3, lines: [{ t: 8.45, who: 'sagittarius', text: 'they told *everyone* to be honest.' }, { t: 11.0, who: 'sagittarius', text: '*everyone* but themself.' }] },
    { open: 13.55, close: 18.8, lines: [{ t: 13.65, who: 'taurus', text: 'my client is simply very *wise.*' }, { t: 16.2, who: 'taurus', text: 'too wise to *use* it.' }] },
    { open: 36.2, close: 37.7, lines: [{ t: 36.3, who: 'JUDGE', text: 'the court calls… a *surprise witness.*' }] },
    { open: 38.1, close: 41.9, lines: [{ t: 38.2, who: 'ex', text: "they told me 'just say how you *feel.*'" }] },
    { open: 43.3, close: 51.8, lines: [{ t: 43.4, who: 'ex', text: 'they never said how they *felt.*' }, { t: 45.8, who: 'ex', text: "I still don't know if they *liked* me." }, { t: 48.6, who: 'ex', text: 'say it to the next one. *please.*' }] },
    { open: 58.5, close: 62.8, lines: [{ t: 58.6, who: 'virgo', text: "…oh. that's for *me*, isn't it." }] },
    { open: 73.6, close: 78.4, lines: [{ t: 73.7, who: 'JUDGE', text: 'good advice. *finally* used.' }] },
  ],
  exhibits: [
    { at: T.evA, out: [24.3, 24.6], label: 'EXHIBIT A', draw(x, t, k, B) { drawChat(x, t, B, { title: '♍︎ + ♊︎', size: 38, msgs: [{ at: 19.8, side: 'L', text: 'should I tell them I like them?' }, { at: 20.9, side: 'R', text: 'always. say it kindly.' }, { at: 22.4, side: 'L', text: 'omg it WORKED' }] }) } },
    { at: T.evB, out: [29.7, 30.0], label: 'EXHIBIT B', draw(x, t, k, B) { drawChat(x, t, B, { title: '♍︎ + ♎︎', size: 38, msgs: [{ at: 25.2, side: 'L', text: 'how do I say no to plans?' }, { at: 26.3, side: 'R', text: "'not this time, but thank you!'" }, { at: 27.9, side: 'L', text: 'it worked!!' }] }) } },
    { at: T.evC, out: [35.4, 35.7], label: 'EXHIBIT C', draw(x, t, k, B) { drawChat(x, t, B, { title: '♍︎ + ♓︎', size: 38, msgs: [{ at: 30.6, side: 'L', text: 'I miss them' }, { at: 31.6, side: 'R', text: 'feel it. call a friend. no 2 a.m. texts.' }, { at: 33.4, side: 'L', text: 'I called you!' }] }) } },
    { at: T.read, out: [58.2, 58.5], label: 'EXHIBIT D', draw(x, t, k, B) {
      box(x, B.cx - 340, B.cy - 300, 680, 600, '#fffaf0', { b: 6, hi: null }); label(x, "VIRGO'S ADVICE", B.cx, B.cy - 250, { size: 40, col: '#4f7cd8', weight: 900, shadow: false })
      BOARD.forEach(([s, a], i) => { if (t < a) return; const kk = ease.outBack(clamp(prog(t, a, a + 0.25))); x.save(); x.translate(B.cx, B.cy - 120 + i * 130); x.scale(kk, kk); label(x, `${i + 1}. ${s}`, 0, 0, { size: 44, col: INK, weight: 900, shadow: false }); x.restore() })
      if (t > 57.6) label(x, '(for: me?)', B.cx, B.cy + 250, { size: 36, col: RED, weight: 900, shadow: false, rot: -0.05, alpha: clamp(prog(t, 57.6, 57.8)) })
    } },
  ],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'OF NOT TAKING IT', color: RED, out: [67.4, 67.7], y: 860 }],
  sentence: { at: 64.4, out: [67.4, 67.7], text: 'take your own advice. today.' },
  cues: [...[19.8, 20.9, 22.4, 25.2, 26.3, 27.9, 30.6, 31.6, 33.4].map((a, i) => ['pop', a, [880, 987.77, 1318.51][i % 3], 0.04, i % 3 === 1 ? 0.2 : -0.2]),
    ...BOARD.map(([, a], i) => ['pop', a, [987.77, 1174.66, 1318.51][i], 0.04, 0]), ['riser', 36.4, T.wit, 0.04], ['whoosh', T.send - 0.3, 0.4, 0.04], ['pop', T.send + 0.3, 1174.66, 0.04, -0.3],
    ['glitter', T.reply + 0.2, T.reply + 1.2], ['bell', T.reply + 0.4, 2349.32, 0.03, 1.4, 0], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
void GREEN
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
