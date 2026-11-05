// kzce13: ZODIAC COURTROOM, "The People v. The Group Chat" (20 s vertical, Month 2 boost m06 #13, house · F). Hard cut.
//   0.00  frame 0: ♊ ♌ ♐ ♒ mid-huddle in the dock over one phone; gavel mid-slam. 0.25 record scratch freeze:
//         "the text said *'sure.'*"   Hook: "Group chat. One text. | *All night.*"
//   1.4   CHARGE: ANALYSED ONE WORD ("SURE") FROM 9 PM TO 3 AM   1.8 JUDGE: "exhibit A: the *conspiracy board.*"
//   3.4   EXHIBIT A: a corkboard, "sure." in the middle, red string to: sure = yes? · sure = no?? · a full stop = mad?
//         · no exclamation mark = DOOMED (gasp 6.0)
//   7.8   LEO: "it was a *team effort.*"   9.6 JUDGE: "did anyone just… *ask?*"   11.2 the reply drops: "sure! *saturday?*"
//  13.2   GUILTY (ALL FOUR) · 13.8 sentence: "ask them. tonight."   15.6 AQUARIUS: "…but what does *saturday* mean?" (gavel)
//  18.6   last line "Fewer screenshots. | More *asking.*" holds to 20.0, hard cut.   Pisces fountains throughout.
import { makeCourt, star, label, box, R, clamp, prog, ease, INK, RED, popWords } from '../../kzce01/scenes/courtkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const T = { guilty: 13.2, aq: 15.6, last: 18.6 }
const NOTE = { at: 11.2, out: [12.9, 13.15], title: 'messages', body: 'sure! *saturday?*', glyph: '♉', time: 'now', y: 120 }
const REC = { at: 0.25, len: 1.0, caption: "the text said *'sure.'*", top: 1480 }
const FOUR = [['gemini', -150, 1040], ['leo', -50, 1000], ['sagittarius', 60, 1010], ['aquarius', 160, 1050]]
const NOTES = [['sure = yes?', -230, -180, 3.8], ['sure = no??', 230, -170, 4.4], ['a full stop = mad?', -220, 170, 5.0], ['no "!" = DOOMED', 220, 180, 5.6]]
function huddle(x, t, P, moods) {
  FOUR.forEach(([id, dx, y], i) => star(x, t, { x: 280 + dx, y, s: 130 }, { who: id, mood: moods(t, id), look: t < 7.6 ? [-Math.sign(dx) * 0.6, 0.8] : undefined, seed: 21 + i, hops: id === 'leo' ? [7.8, 8.1] : id === 'aquarius' ? [T.aq, T.aq + 0.3] : [] }))
  if (t < 3.4 || (t > T.aq - 0.3)) { x.save(); x.translate(285, 1110); x.rotate(-0.1); box(x, -40, -60, 80, 120, '#2a2148', { b: 4 }); R(x, '#7fd0ff', -32, -50, 64, 96); x.restore() }
  void P
}
const CFG = {
  id: 'kzce13', dur: 20, ending: 'cut',
  hook: { at: -1, text: 'Group chat. One text. | *All night.*', out: [3.2, 3.4], accentColor: '#f2cf4a', size: 100 },
  fx: { recs: [REC], whips: [{ at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  kit: [notification(NOTE)], kitCues: notificationCues(NOTE),
  gavels: [0.05, 1.85, T.guilty, 17.0],
  gasps: [6.0, 11.3, T.guilty + 0.1, 17.05],
  jury: ['taurus', 'capricorn', 'cancer', 'pisces', 'virgo', 'libra'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > 11.3 && t < 13 ? 'heart' : t > 17.1 ? 'happy' : undefined; if (t > 17.2) return 'happy'; if (t > 9.6 && t < 11) return 'eyeroll' },
  judge: { mood: t => t < 1.4 ? 'squint' : t < 7.6 ? 'neutral' : t < 9.5 ? 'eyeroll' : t < 11.2 ? 'squint' : t < T.guilty ? 'sparkle' : t < T.aq ? 'neutral' : t < 17 ? 'wide' : 'happy',
    look: t => t > 3.4 && t < 7.4 ? [0, 1] : t > 7.6 && t < 17 ? [-1, 1] : [0, 0.3] },
  dock: [{ who: { color: '#000', tag: 'GROUP' }, plate: 'DEFENDANTS', s: 1, prop: (x, t, P) => huddle(x, t, P, (tt, id) => {
    if (tt < 1.3) return 'wide'
    if (tt > 3.4 && tt < 7.4) return 'squint'
    if (tt > 11.2 && tt < 13) return 'sparkle'
    if (tt > T.guilty && tt < T.aq) return 'wide'
    if (tt > T.aq && id === 'aquarius') return tt < 17 ? 'squint' : 'happy'
    if (tt > 17) return 'happy'
    return 'neutral'
  }) }],
  heads: [{ text: 'Fewer screenshots. | More *asking.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#f2cf4a', size: 100 }],
  ticker: { at: 1.4, out: [18.3, 18.6], label: 'CHARGE', text: 'ANALYSED ONE WORD ("SURE") FROM 9 PM TO 3 AM' },
  boxes: [
    { open: 1.75, close: 3.35, lines: [{ t: 1.9, who: 'JUDGE', text: 'exhibit A: the *conspiracy board.*' }] },
    { open: 7.7, close: 11.1, lines: [{ t: 7.8, who: 'leo', text: 'it was a *team effort.*' }, { t: 9.6, who: 'JUDGE', text: 'did anyone just… *ask?*' }] },
    { open: 15.5, close: 18.5, lines: [{ t: 15.6, who: 'aquarius', text: '…but what does *saturday* mean?' }] },
  ],
  exhibits: [{ at: 3.4, out: [7.3, 7.6], label: 'EXHIBIT A', draw(x, t, k, B) {
    box(x, B.cx - 350, B.cy - 320, 700, 640, '#c79a6a', { b: 6 })
    NOTES.forEach(([s, dx, dy, a]) => {
      if (t < a) return
      const u = clamp(prog(t, a, a + 0.3))
      x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(B.cx, B.cy); x.lineTo(B.cx + dx * u, B.cy + dy * u); x.stroke()
      const kk = ease.outBack(clamp(prog(t, a + 0.15, a + 0.35)))
      x.save(); x.translate(B.cx + dx, B.cy + dy); x.rotate(dx > 0 ? 0.06 : -0.06); x.scale(kk, kk)
      box(x, -120, -48, 240, 96, '#fff06a', { b: 4, hi: null }); label(x, s, 0, 0, { size: 28, col: INK, weight: 900, shadow: false }); x.restore()
    })
    box(x, B.cx - 110, B.cy - 55, 220, 110, '#fffaf0', { b: 5, hi: null }); label(x, 'sure.', B.cx, B.cy, { size: 60, col: INK, weight: 900, shadow: false })
    R(x, RED, B.cx - 8, B.cy - 70, 16, 16)
  } }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'ALL FOUR', color: RED, out: [15.2, 15.45], y: 860 }],
  sentence: { at: 13.8, out: [15.2, 15.45], text: 'ask them. tonight.' },
  cues: [...NOTES.map(([, , , a], i) => ['pop', a + 0.2, [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.3 : -0.3]), ...NOTES.map(([, , , a]) => ['tick', a, 0.04]),
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
