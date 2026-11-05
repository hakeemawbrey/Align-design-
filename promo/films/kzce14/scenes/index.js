// kzce14: ZODIAC COURTROOM, "Single at the Holiday Dinner" (18 s vertical, Month 2 boost m06 #14, jazzy · D). Hard cut.
//   0.00  frame 0: ♋ Cancer at a holiday table in the dock, fork frozen mid-air, a spotlight; gavel mid-slam; whip in.
//         Hook: "'So… *seeing* anyone?' | Order in the court."
//   1.0   THE CASE: THE COURT v. "SO… SEEING ANYONE?"   1.4 JUDGE: "the court calls… the *question.*"
//   3.0   THE QUESTION (a big "?") in the dock: "I'm just *curious!*"   5.0 JUDGE: "that's the *fourth* time tonight."
//   7.0   WITNESS Cancer: "I'm *thriving*, actually."   8.8 EXHIBIT A: Cancer's life: pottery class · the friends
//         · a trip with friends · a very good book (pop pop pop)
//  12.2   GUILTY (THE QUESTION) · 12.8 sentence: "ask about their life. not their status."  Cancer + jury cheer.
//  16.4   last line "Single is a status. | Not a *sentence.*" holds to 18.0, hard cut.   Pisces fountains throughout.
import { makeCourt, star, label, box, R, drawBits, clamp, prog, ease, INK, RED, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { q: 3.0, wit: 6.9, ex: 8.8, guilty: 12.2, cheer: 14.2, last: 16.4 }
const Q = { color: '#d8cfee', glyph: null, tag: '? THE QUESTION', tagColor: '#f2c75c' }
function table(x, t, P) {
  const g = x.createRadialGradient(P.x, P.y - 200, 20, P.x, P.y, 360); g.addColorStop(0, 'rgba(255,240,200,0.28)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(P.x - 360, P.y - 500, 720, 760)
  box(x, P.x - 230, P.y + 60, 460, 40, '#b24a3a', { b: 5 }); R(x, '#fffaf0', P.x - 230, P.y + 60, 460, 10)
  x.fillStyle = INK; x.beginPath(); x.ellipse(P.x - 120, P.y + 56, 60, 16, 0, 0, 6.3); x.fill(); x.fillStyle = '#efe6d6'; x.beginPath(); x.ellipse(P.x - 120, P.y + 54, 52, 12, 0, 0, 6.3); x.fill()
  // the fork, frozen mid-air
  x.save(); x.translate(P.x + 120, P.y - 40); x.rotate(-0.5); R(x, INK, -6, -70, 12, 110); R(x, '#cfd6e6', -3, -66, 6, 104); for (let i = 0; i < 3; i++) R(x, '#cfd6e6', -9 + i * 7, -96, 4, 30); x.restore()
}
function qMark(x, t, P) { label(x, '?', P.x, P.y + 10, { size: 150, col: INK, weight: 900, shadow: false }) }
const PLANS = [['pottery class', 9.0, -195, -165], ['friends', 9.5, 195, -165], ['trip with friends', 10.0, -195, 165], ['a very good book', 10.5, 195, 165]]
const CFG = {
  id: 'kzce14', dur: 18, ending: 'cut',
  hook: { at: -1, text: "'So… *seeing* anyone?' | Order in the court.", out: [2.8, 3.0], accentColor: '#3fb6f0', size: 96 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, 1.45, T.guilty],
  gasps: [-0.2, 5.1, T.guilty + 0.1, T.cheer],
  jury: ['leo', 'aries', 'scorpio', 'pisces', 'gemini', 'capricorn'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.cheer ? 'happy' : undefined; if (t > T.cheer) return 'happy'; if (t > T.ex && t < 12) return 'sparkle' },
  judge: { mood: t => t < 0.6 ? 'wide' : t < 3 ? 'squint' : t < 6.8 ? 'eyeroll' : t < T.guilty ? 'neutral' : 'happy', look: t => t > T.ex && t < 11.8 ? [0, 1] : t > 1.4 && t < 12 ? [-1, 1] : [0, 0.3] },
  dock: [
    { who: 'cancer', to: T.q, mood: t => t < 0.8 ? 'wide' : 'squint', look: () => [1, -0.6], blink: false, prop: (x, t, P) => table(x, t, P) },
    { who: Q, from: T.q, to: T.wit, mood: t => t < 5 ? 'happy' : 'wide', look: () => [1, -0.3], prop: (x, t, P) => qMark(x, t, P) },
    { who: 'cancer', from: T.wit, plate: 'WITNESS', mood: t => t < T.guilty ? 'happy' : 'sparkle', hops: [7.1, 7.4, T.cheer, T.cheer + 0.3, T.cheer + 0.6] },
  ],
  heads: [{ text: 'Single is a status. | Not a *sentence.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#3fb6f0', size: 98 }],
  ticker: { at: 1.0, out: [16.1, 16.4], label: 'THE CASE', text: 'THE COURT v. "SO… SEEING ANYONE?"' },
  boxes: [
    { open: 1.3, close: 2.95, lines: [{ t: 1.45, who: 'JUDGE', text: 'the court calls… the *question.*' }] },
    { open: 3.15, close: 6.8, lines: [{ t: 3.25, who: Q, text: "I'm just *curious!*" }, { t: 5.0, who: 'JUDGE', text: "that's the *fourth* time tonight." }] },
    { open: 7.0, close: 8.75, lines: [{ t: 7.1, who: 'cancer', text: "I'm *thriving*, actually." }] },
  ],
  exhibits: [{ at: T.ex, out: [11.7, 12.0], label: 'EXHIBIT A', draw(x, t, k, B) {
    PLANS.forEach(([s, a, dx, dy], i) => {
      const kk = ease.outBack(clamp(prog(t, a, a + 0.25))); if (kk <= 0) return
      x.save(); x.translate(B.cx + dx, B.cy + dy); x.rotate(i % 2 ? 0.05 : -0.05); x.scale(kk * 1.22, kk * 1.22)
      box(x, -150, -120, 300, 240, ['#f7d9b0', '#c9e6ff', '#ffe0a0', '#e6d4ff'][i], { b: 5, hi: null })
      if (i === 0) { R(x, '#b56a3a', -40, -70, 80, 90); R(x, '#d98a50', -50, -80, 100, 20) }
      if (i === 1) [-60, 0, 60].forEach((xx, j) => star(x, t, { x: xx, y: -10, s: 70 }, { who: ['gemini', 'aries', 'virgo'][j], mood: 'happy', seed: 31 + j, glow: 0.5 }))
      if (i === 2) { R(x, INK, -90, -60, 180, 90); R(x, '#fffaf0', -84, -54, 168, 78); label(x, 'TRIP ✈', 0, -16, { size: 34, col: RED, weight: 900, shadow: false }) }
      if (i === 3) { R(x, INK, -60, -80, 120, 110); R(x, '#4f7cd8', -54, -74, 108, 98); R(x, GOLD, -54, -40, 108, 10) }
      label(x, s, 0, 85, { size: 30, col: INK, weight: 900, shadow: false })
      x.restore()
    })
  } }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'THE QUESTION', color: RED, out: [14.0, 14.25], y: 860 }],
  sentence: { at: 12.8, out: [14.0, 14.25], text: 'ask about their life instead.' },
  cues: [...PLANS.map(([, a], i) => ['pop', a, [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.3 : -0.3]), ['glitter', T.cheer, T.cheer + 0.6], ['clap', T.cheer, { gain: 0.14 }], ['clap', T.cheer + 0.25, { gain: 0.14 }],
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
void drawBits
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
