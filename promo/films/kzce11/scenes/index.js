// kzce11: ZODIAC COURTROOM, "Reflection in the Sunglasses" (13 s vertical, Month 2 boost m06 #11, funk · E). Hard cut.
//   0.00  frame 0: EXHIBIT A already up: the date's sunglasses, ♌ Leo reflected in both lenses fixing their hair; whip in.
//         Hook: "Leo's mirror: | the *date's sunglasses.*"   0.9 a red circle: MID-SENTENCE.
//   1.0   CHARGE: FIXED THEIR HAIR IN THE DATE'S SUNGLASSES, MID-SENTENCE
//   3.1   LEO: "the lighting was *right there.*"   5.0 WITNESS ♈ Aries (the date): "I was telling them about my *grandma.*"
//   7.7   JUDGE: "the court saw *everything.*"   9.3 GUILTY · 9.9 sentence: "look at the eyes, not the lenses."
//  11.3   last line "You looked great. | So did *they.*" holds to 13.0, hard cut.   Pisces fountains throughout.
import { makeCourt, caught, caughtCues, star, label, box, R, clamp, prog, ease, INK, RED, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { wit: 4.9, back: 7.55, guilty: 9.3, last: 11.3 }
const CAUGHT = { at: 0.9, x: 330, y: 860, r: 170, out: [2.3, 2.5], label: 'MID-SENTENCE.', arrow: 'br', rec: false }
function lenses(x, t, B) {
  // the frame
  for (const d of [-1, 1]) {
    const cx = B.cx + d * 190, cy = B.cy - 20
    x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 175, 150, 0, 0, 6.3); x.fill()
    const g = x.createLinearGradient(cx, cy - 140, cx, cy + 140); g.addColorStop(0, '#3a3466'); g.addColorStop(1, '#14102a'); x.fillStyle = g
    x.beginPath(); x.ellipse(cx, cy, 160, 135, 0, 0, 6.3); x.fill()
    x.save(); x.beginPath(); x.ellipse(cx, cy, 160, 135, 0, 0, 6.3); x.clip()
    const fix = Math.sin(t * 7) * 0.5 + 0.5
    star(x, t, { x: cx, y: cy + 40, s: 170 }, { who: 'leo', mood: fix > 0.5 ? 'sparkle' : 'wink', look: [0, 0], seed: 4, glow: 0.6 })
    R(x, '#f39a3a', cx + 50, cy - 60 - fix * 20, 26, 46)           // the hand-point fixing the hair
    x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(cx - 120, cy - 110, 50, 200)
    x.restore()
  }
  box(x, B.cx - 40, B.cy - 40, 80, 20, INK, { b: 2, hi: null, lo: null })
}
const CFG = {
  id: 'kzce11', dur: 13, ending: 'cut',
  hook: { at: -1, text: "Leo's mirror: | the *date's sunglasses.*", out: [2.5, 2.7], accentColor: '#f39a3a', size: 98 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  kit: [caught(CAUGHT)], kitCues: caughtCues(CAUGHT),
  gavels: [2.9, T.guilty],
  gasps: [1.0, T.guilty + 0.1],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.guilty + 0.3 ? 'happy' : undefined; if (t > T.wit + 0.3 && t < T.back) return 'wide'; if (t > T.last) return 'happy' },
  judge: { mood: t => t < 3 ? 'squint' : t < T.wit ? 'eyeroll' : t < T.back ? 'wide' : t < T.guilty ? 'squint' : 'happy', look: t => t < 2.6 ? [0, 1] : t > 2.9 && t < 9 ? [-1, 1] : [0, 0.3] },
  dock: [
    { who: 'leo', to: T.wit, mood: t => t < 3 ? 'sparkle' : 'happy', look: t => t < 3 ? [1, -1] : undefined, hops: [3.1, 3.4] },
    { who: 'aries', from: T.wit, to: T.back, plate: 'WITNESS', mood: t => t < 5.6 ? 'neutral' : 'squint', look: () => [1, -0.3] },
    { who: 'leo', from: T.back, mood: t => t < T.guilty + 0.1 ? 'neutral' : t < 10.5 ? 'wide' : 'happy', hops: [10.6, 10.9] },
  ],
  heads: [{ text: 'You looked great. | So did *they.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#f39a3a', size: 100 }],
  ticker: { at: 1.0, out: [11.0, 11.3], label: 'CHARGE', text: "FIXED THEIR HAIR IN THE DATE'S SUNGLASSES, MID-SENTENCE" },
  boxes: [
    { open: 3.0, close: 4.85, lines: [{ t: 3.1, who: 'leo', text: 'the lighting was *right there.*' }] },
    { open: 5.05, close: 7.5, lines: [{ t: 5.15, who: 'aries', text: 'I was telling them about my *grandma.*' }] },
    { open: 7.6, close: 9.2, lines: [{ t: 7.7, who: 'JUDGE', text: 'the court saw *everything.*' }] },
  ],
  exhibits: [{ at: -1, out: [2.5, 2.8], label: 'REPLAY', h: 600, draw: (x, t, k, B) => lenses(x, t, B) }],
  stamps: [{ at: T.guilty, text: 'GUILTY', color: RED, out: [11.0, 11.3], y: 860 }],
  sentence: { at: 9.9, out: [11.0, 11.3], text: 'look at them, not the lenses.' },
  cues: [['pluck', 0.3, 1318.51, 0.03, 0.3, 0], ['pluck', 0.6, 1567.98, 0.03, 0.3, 0], ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
CFG.jury = ['capricorn', 'virgo', 'libra', 'pisces', 'gemini', 'scorpio']
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
