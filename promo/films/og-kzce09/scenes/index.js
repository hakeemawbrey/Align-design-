// og-kzce09: the social rework of kzce09, ZODIAC COURTROOM, "Haha, Interesting" (13.6 s vertical, synthwave · Bm).
// Same court, cast and story; static HOOK caption (box) from frame 0 instead of the slammed title, crazier lines.
// The frame-0 tableau (jury frozen mid-gasp, Aquarius sipping tea) now holds still under the hook and the story starts
// 1.6 s later so the hook has time to read. No opening whip. Kit: ./courtkit.js (the og-kzce01 copy). Hard cut.
//   0.00  frame 0: the jury frozen mid-gasp, ♒ Aquarius calmly sipping tea in the dock.
//         HOOK (static box, until 2.8): "'I like you.' | *'haha interesting'*"
//   2.9   EXHIBIT A: the chat. "I really like you." → "haha interesting" (sent) · 4.2 a red circle scribbles round it (gasp)
//   5.7   CHARGE ticker (top band, once the exhibit tag is gone): ANSWERED "I LIKE YOU" WITH "HAHA INTERESTING", THEN SIPPED TEA
//   5.9   AQUARIUS: "I was processing!! I made a *mind map.*"   7.6 JUDGE: "then say *'give me a minute.'*"
//   9.5   GUILTY (OF BUFFERING) · 10.1 sentence: "say how you feel. even 'brb, feelings.'"   Pisces fountains.
//  11.9   last line "'Interesting' is | not a *feeling.*" holds to 13.6, hard cut.
import { makeCourt, drawChat, R, box, label, clamp, prog, ease, INK, RED, popWords } from './courtkit.js'

const O = 1.6   // og: everything after frame 0 starts 1.6 s later than in kzce09
const T = { ex: 1.3 + O, circ: 2.6 + O, guilty: 7.9 + O, last: 10.3 + O }
function tea(x, t, P) {
  const sip = t < 3.9 + O ? (Math.sin(t * 2.2) > 0.3 ? 1 : 0) : 0
  x.save(); x.translate(P.x + 105, P.y + 10 - sip * 30)
  box(x, -34, -30, 68, 56, '#fffaf0', { b: 5, hi: null }); R(x, '#c98a4a', -28, -26, 56, 12)
  R(x, INK, 34, -20, 18, 30); R(x, '#fffaf0', 34, -14, 10, 18)
  for (let i = 0; i < 3; i++) { x.globalAlpha = 0.5 * Math.abs(Math.sin(t * 2 + i)); R(x, '#efe6d6', -16 + i * 14, -60 - ((t * 30 + i * 12) % 40), 6, 14) }
  x.restore()
}
const CFG = {
  id: 'og-kzce09', dur: 12 + O, ending: 'cut',
  fx: { whips: [{ at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, T.guilty],
  gasps: [-0.1, T.circ, T.guilty + 0.1],
  juryDx: -90,   // og full frame: the jury box clears the app's side buttons (x 960+)
  jury: ['virgo', 'leo', 'cancer', 'pisces', 'aries', 'libra'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (t < 0.9 + O) return 'wide'
    if (id === 'pisces') return t > T.guilty + 0.3 ? 'sparkle' : t > T.circ ? 'wide' : undefined
    if (t > 5.9 && t < 7.5) return id === 'virgo' || id === 'aries' ? 'eyeroll' : id === 'cancer' ? 'wide' : undefined
    if (t > T.guilty + 0.5) return 'happy'
  },
  judge: { mood: t => t < 0.6 + O ? 'wide' : t < 4.2 + O ? 'squint' : t < 6 + O ? 'eyeroll' : t < T.guilty ? 'neutral' : 'happy', look: t => t > T.ex && t < 4.1 + O ? [0, 1] : t > 4.2 + O && t < 7.7 + O ? [-1, 1] : [0, 0.3] },
  dock: [{ who: 'aquarius', mood: t => t < 1.2 + O ? 'happy' : t < T.circ ? 'neutral' : t < 4.2 + O ? 'wide' : t < 6 + O ? 'happy' : t < T.guilty + 0.1 ? 'neutral' : t < 9.2 + O ? 'wide' : 'happy',
    look: t => t > T.ex && t < 4.1 + O ? [1, -0.6] : undefined, hops: [4.3 + O, 4.6 + O, 9.4 + O], zzz: false, prop: (x, t, P) => tea(x, t, P) }],
  heads: [{ text: "'Interesting' is | not a *feeling.*", at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#38c4ec', size: 100, top: 1330 }],   // og: holds to the hard cut, in the empty floor
  ticker: { at: 4.1 + O, y: 392, out: [10.0 + O, 10.3 + O], label: 'CHARGE',   // og full frame: top band, once the exhibit tag is gone
    text: 'ANSWERED "I LIKE YOU" WITH "HAHA INTERESTING", THEN SIPPED TEA' },
  boxes: [{ open: 4.2 + O, close: 7.8 + O, y: 1330, height: 230, width: 900, W: 1020,
    lines: [{ t: 4.3 + O, who: 'aquarius', text: 'I was processing!! I made a *mind map.*' }, { t: 6.0 + O, who: 'JUDGE', text: "then say *'give me a minute.'*" }] }],
  exhibits: [{
    at: T.ex, out: [3.85 + O, 4.1 + O], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♒︎ aquarius', size: 38, msgs: [{ at: 1.5 + O, side: 'L', text: 'I really like you.', meta: '11:12 PM' }, { at: 2.1 + O, side: 'R', text: 'haha interesting', meta: 'sent · 11:12 PM' }] })
      if (t > T.circ) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(B.cx + 120, B.cy - 120, 220, 70, -0.05, 0, Math.PI * 2 * clamp(prog(t, T.circ, T.circ + 0.35))); x.stroke(); x.restore() }
    },
  }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'OF BUFFERING', color: RED, out: [9.7 + O, 10.0 + O], y: 860 }],
  sentence: { at: 8.5 + O, out: [9.7 + O, 10.0 + O], text: "say how you feel. even 'brb, feelings.'" },
  cues: [['pop', 1.5 + O, 1174.66, 0.04, -0.2], ['pop', 2.1 + O, 659.25, 0.04, 0.2], ['tick', T.circ, 0.05], ['tick', T.circ + 0.1, 0.05], ['tick', T.circ + 0.2, 0.05],
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
// social hook: static caption from frame 0 (the film's own slammed title is removed above)
export const HOOK = "'I like you.' | *'haha interesting'*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.8
export const HOOK_TOP = 150         // clear of the judge's wig
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void ease
