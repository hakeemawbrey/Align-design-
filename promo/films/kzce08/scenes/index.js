// kzce08: ZODIAC COURTROOM, "Feelings, Scheduled" (15 s vertical, Month 2 boost m06 #8, cinematic · Cm). Loop.
//   0.00  frame 0: ♑ Capricorn mid-typing in the dock, a calendar invite popping up: "FEELINGS TALK · Q3"; gavel mid-slam.
//         Hook: "Capricorn *scheduled* | the feelings talk."   0.3 whip.
//   1.0   CHARGE: BOOKED THE FEELINGS TALK FOR NEXT QUARTER   1.3 JUDGE: "exhibit A: the *invite.*"
//   2.8   EXHIBIT A: the invite: when Q3 · 30 min · agenda (how I feel / how you feel / questions) · attached:
//         feelings_v3 (gasp) · 5.4 the reply: DECLINED · "how about tonight?" (gasp)
//   6.8   CAPRICORN: "I wanted to be *prepared.*"   8.6 JUDGE: "they're ready *now.*"
//  10.2   NOT GUILTY (OF CARING) · 10.8 "tonight. no agenda."   Pisces fountains.
//  12.4   last line "Feelings don't need | an *invite.*"; 14.6–15.0 eases back into frame 0 (seamless loop).
import { makeCourt, label, box, R, clamp, prog, ease, INK, RED, GREEN, MONO, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { agenda: 3.2, att: 4.8, reply: 5.4, ng: 10.2, last: 12.4 }
function invite(x, t, cx, cy, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k)
  box(x, -170, -70, 340, 140, '#fffaf0', { b: 5, hi: null }); R(x, '#2fc79a', -170, -70, 340, 34)
  label(x, 'NEW EVENT', 0, -53, { size: 22, col: '#fff', weight: 900, font: MONO })
  label(x, 'FEELINGS TALK · Q3', 0, 10, { size: 32, col: INK, weight: 900, shadow: false })
  x.restore()
}
const LINES = [['when: Q3 · 30 min', 3.2], ['1. how I feel', 3.55], ['2. how you feel', 3.85], ['3. questions (if time)', 4.15], ['attached: feelings_v3', T.att]]
const CFG = {
  id: 'kzce08', dur: 15, ending: 'loop',
  hook: { at: -1, text: 'Capricorn *scheduled* | the feelings talk.', out: [2.6, 2.8], accentColor: '#2fc79a', size: 96 },
  fx: { whips: [{ at: 0.3, from: 1.25 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 1.35, T.ng],
  gasps: [-0.2, T.att + 0.05, T.reply + 0.1, T.ng + 0.1],
  jury: ['gemini', 'taurus', 'libra', 'pisces', 'aries', 'cancer'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.ng + 0.3 ? 'happy' : undefined; if (t > T.ng + 0.5) return 'happy' },
  judge: { mood: t => t < 0.5 ? 'squint' : t < T.att ? 'neutral' : t < 6.6 ? 'wide' : t < T.ng ? 'neutral' : 'sparkle', look: t => t > 2.8 && t < 6.6 ? [0, 1] : t > 6.7 && t < 10 ? [-1, 1] : [0, 0.3] },
  dock: [{ who: 'capricorn',
    mood: t => t < 2.8 ? 'squint' : t < T.reply ? 'neutral' : t < 6.8 ? 'wide' : t < 8.6 ? 'neutral' : t < T.ng ? 'wide' : 'sparkle',
    look: t => t < 2.8 ? [1, 1] : t > 2.8 && t < 6.6 ? [1, -0.6] : undefined, hops: [T.ng + 0.3, T.ng + 0.6],
    prop: (x, t, P) => { if (t < 2.8) { invite(x, t, P.x + 40, P.y - 190, 0.9, ease.outBack(clamp((t + 0.25) / 0.35))); for (let i = 0; i < 3; i++) if (Math.sin(t * 18 + i * 2) > 0) R(x, '#9fe6b0', P.x - 60 + i * 50, P.y + 105, 30, 10) } } }],
  heads: [{ text: "Feelings don't need | an *invite.*", at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#2fc79a', size: 100, out: [14.45, 14.6] }],
  ticker: { at: 1.0, out: [12.1, 12.4], label: 'CHARGE', text: 'BOOKED THE FEELINGS TALK FOR NEXT QUARTER' },
  boxes: [
    { open: 1.2, close: 2.75, lines: [{ t: 1.35, who: 'JUDGE', text: 'exhibit A: the *invite.*' }] },
    { open: 6.85, close: 10.1, lines: [{ t: 6.95, who: 'capricorn', text: 'I wanted to be *prepared.*' }, { t: 8.6, who: 'JUDGE', text: "they're ready *now.*" }] },
  ],
  exhibits: [{
    at: 2.8, out: [6.4, 6.7], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      box(x, B.cx - 330, B.cy - 330, 660, 640, '#fffaf0', { b: 6, hi: null }); R(x, '#2fc79a', B.cx - 330, B.cy - 330, 660, 70)
      label(x, 'Feelings Talk', B.cx, B.cy - 295, { size: 42, col: '#fff', weight: 900 })
      LINES.forEach(([s, a], i) => { if (t < a) return; const kk = ease.outBack(clamp(prog(t, a, a + 0.2))); x.save(); x.translate(B.cx - 280, B.cy - 200 + i * 66); x.scale(kk, kk); label(x, s, 0, 0, { size: 36, col: i === 4 ? RED : INK, weight: 800, shadow: false, align: 'left' }); x.restore() })
      if (t > T.reply) { const kk = ease.outBack(clamp(prog(t, T.reply, T.reply + 0.25))); x.save(); x.translate(B.cx, B.cy + 190); x.rotate(-0.04); x.scale(kk, kk); box(x, -280, -70, 560, 140, '#e8344e', { b: 6, hi: null }); label(x, 'DECLINED', 0, -32, { size: 34, col: '#fff', weight: 900, font: MONO }); label(x, '"how about tonight?"', 0, 22, { size: 40, col: '#fff', weight: 900 }); x.restore() }
      void GREEN
    },
  }],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', sub: 'OF CARING', color: '#2fae6a', out: [12.1, 12.4], y: 860, size: 118 }],
  sentence: { at: 10.8, out: [12.1, 12.4], text: 'tonight. no agenda.' },
  cues: [['pop', 0.1, 1174.66, 0.04, 0.2], ...LINES.map(([, a], i) => ['tick', a, 0.05]), ['pluck', T.att, 392, 0.05, 0.6, 0], ['pop', T.reply, 440, 0.06, 0], ['pop', T.reply + 0.1, 880, 0.04, 0],
    ['pluck', T.ng + 0.6, 1318.51, 0.035, 0.5, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
