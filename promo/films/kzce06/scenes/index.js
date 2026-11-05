// kzce06: ZODIAC COURTROOM, "The Case of 'Soon'" (14 s vertical, Month 2 boost m06 #6, funk · A). Hard cut.
//   0.00  frame 0: ♐ Sagittarius mid-sprint out of the dock, freeze frame + record scratch: "*'let's hang soon'* | four months ago".
//         Hook: "Sagittarius said | *'let's hang soon.'*"   1.15 rewind: Sag zips back into the dock.
//   1.6   CHARGE: SAID "LET'S HANG SOON" AND VANISHED TILL SPRING   1.9 JUDGE: "define *soon.*"
//   3.4   EXHIBIT A: the calendar flips DEC · JAN · FEB · MAR, every page says "soon?", then SPRING stamps (gasp).
//   6.8   SAG: "soon is a *vibe!*"   8.6 JUDGE: "a vibe isn't a *plan.*"
//  10.2   GUILTY · 10.8 sentence: "put a real date on it."  11.6 Sag circles THURSDAY.  Pisces fountains.
//  12.6   last line "'Soon' needs | a *date.*" holds to 14.0, hard cut.
import { makeCourt, label, box, R, clamp, prog, ease, lerp, INK, RED, GOLD, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { back: 1.2, guilty: 10.2, thu: 11.6, last: 12.6 }
const MONTHS = ['DEC', 'JAN', 'FEB', 'MAR']
function page(x, cx, cy, m, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -200, -220, 400, 440, '#fffaf0', { b: 6, hi: null }); R(x, RED, -200, -220, 400, 90)
  label(x, m, 0, -175, { size: 60, col: '#fff', weight: 900 })
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) R(x, '#e2d6bf', -170 + i * 70, -110 + j * 70, 58, 58)
  label(x, 'soon?', 0, 40, { size: 70, col: INK, weight: 900, shadow: false, rot: -0.1 })
  x.restore()
}
const CFG = {
  id: 'kzce06', dur: 14, ending: 'cut',
  hook: { at: -1, text: "Sagittarius said | *'let's hang soon.'*", out: [3.2, 3.4], accentColor: '#a35cf0', size: 98 },
  fx: { recs: [{ at: 0.2, len: 0.95, sub: 'four months ago…', caption: "*'let's hang soon'*", top: 1480 }], whips: [{ at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [1.9, T.guilty],
  gasps: [5.6, T.guilty + 0.1],
  jury: ['taurus', 'cancer', 'libra', 'pisces', 'virgo', 'gemini'],
  tears: () => 3,
  juryMood: (t, id) => { if (t < 1.2) return 'wide'; if (id === 'pisces') return t > T.guilty + 0.3 ? 'happy' : undefined; if (t > T.thu) return 'happy' },
  judge: {
    mood: t => t < 1.2 ? 'wide' : t < 3.3 ? 'squint' : t < 6.6 ? 'neutral' : t < 8.5 ? 'eyeroll' : t < T.thu ? 'neutral' : 'happy',
    look: t => t < 1.2 ? [-1, 0.6] : t > 3.4 && t < 6.6 ? [0, 1] : t > 6.7 && t < 10 ? [-1, 1] : [0, 0.3],
  },
  dock: [{ who: 'sagittarius',
    x: undefined,
    mood: t => t < 1.2 ? 'wide' : t < 3.3 ? 'neutral' : t < 5.6 ? 'squint' : t < 8.6 ? 'happy' : t < T.guilty + 0.1 ? 'neutral' : t < T.thu ? 'wide' : 'sparkle',
    look: t => t < 1.2 ? [-1, 0] : t > 3.4 && t < 6.6 ? [1, -0.6] : undefined, hops: [6.8, 7.1, T.thu, T.thu + 0.3],
    prop: (x, t, P) => {
      if (t > T.thu && t < 12.5) {
        const k = ease.outBack(clamp(prog(t, T.thu, T.thu + 0.25)))
        x.save(); x.translate(P.x + 170, P.y - 150); x.scale(k, k); x.rotate(0.08)
        box(x, -95, -70, 190, 140, '#fffaf0', { b: 5, hi: null }); R(x, RED, -95, -70, 190, 36)
        label(x, 'THURSDAY', 0, -52, { size: 24, col: '#fff', weight: 900 }); label(x, '7 PM', 0, 18, { size: 38, col: INK, weight: 900, shadow: false })
        x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 16, 80, 40, 0, 0, Math.PI * 2 * clamp(prog(t, T.thu + 0.2, T.thu + 0.6))); x.stroke()
        x.restore()
      }
    } }],
  // the sprint out (frame 0 frozen) and the rewind back in
  hide: () => ({}),
  cam: t => 1,
  heads: [{ text: "'Soon' needs | a *date.*", at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#a35cf0', size: 108 }],
  ticker: { at: 1.6, out: [12.3, 12.6], label: 'CHARGE', text: 'SAID "LET\'S HANG SOON" AND VANISHED TILL SPRING' },
  boxes: [
    { open: 1.8, close: 3.35, lines: [{ t: 1.95, who: 'JUDGE', text: 'define *soon.*' }] },
    { open: 6.7, close: 10.1, lines: [{ t: 6.8, who: 'sagittarius', text: 'soon is a *vibe!*' }, { t: 8.6, who: 'JUDGE', text: "a vibe isn't a *plan.*" }] },
  ],
  exhibits: [{
    at: 3.4, out: [6.3, 6.6], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      MONTHS.forEach((m, i) => {
        const a = 3.6 + i * 0.45
        if (t < a) return
        const fly = i < 3 ? ease.inCubic(clamp(prog(t, a + 0.42, a + 0.7))) : 0
        page(x, B.cx + fly * 700, B.cy + fly * -300, m, 0.04 * (i % 2 ? 1 : -1) + fly * 0.9, ease.outBack(clamp(prog(t, a, a + 0.18))))
      })
      if (t > 5.55) { const k2 = clamp(prog(t, 5.55, 5.7)); x.save(); x.translate(B.cx, B.cy + 40); x.rotate(-0.15); x.scale(lerp(2.4, 1, k2), lerp(2.4, 1, k2)); x.globalAlpha = k2; box(x, -230, -60, 460, 120, GOLD, { b: 6, hi: null }); label(x, 'SPRING.', 0, 0, { size: 80, col: INK, weight: 900, shadow: false }); x.restore() }
    },
  }],
  stamps: [{ at: T.guilty, text: 'GUILTY', color: RED, out: [11.5, 11.75], y: 860 }],
  sentence: { at: 10.8, out: [11.5, 11.75], text: 'put a real date on it.' },
  cues: [['whoosh', T.back, 0.35, 0.06], ['tapeStop', T.back - 0.05, 0.2],
    ...MONTHS.map((_, i) => ['whoosh', +(3.6 + i * 0.45).toFixed(2), 0.2, 0.03]), ['boom', 5.6, 0.18], ['tom', 5.6, 90, { gain: 0.3, decay: 0.3 }],
    ['pop', T.thu, 1174.66, 0.04, -0.3], ['tick', T.thu + 0.3, 0.04], ['tick', T.thu + 0.45, 0.04], ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45],
    ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
// the sprint: Sag is shoved to the left edge (squashed) on frame 0 and zips back on the rewind
CFG.dock[0].x = undefined
const base = CFG.dock[0]
CFG.dock = [{ ...base, to: T.back + 0.25, x: 120, s: 236 }, { ...base, from: T.back + 0.25 }]
CFG.dock[0].prop = (x, t, P) => { // speed lines behind the sprint
  x.save(); x.globalAlpha = t < T.back ? 0.8 : 0.4; x.fillStyle = '#efe6d6'
  for (let i = 0; i < 6; i++) x.fillRect(P.x + 120 + (i % 3) * 40, P.y - 90 + i * 30, 150 + (i % 2) * 60, 8)
  x.restore()
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
