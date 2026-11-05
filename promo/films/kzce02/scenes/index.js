// kzce02: ZODIAC COURTROOM, "The Pros and Cons List" (16 s vertical, Month 2 boost m06 #2, lofi · F). Loop.
//   0.00  frame 0: ♍ Virgo in the dock, a list mid-unroll spilling over the rail to the floor; the gavel mid-slam.
//         Hook: "Virgo made a *spreadsheet* | about a crush."   0.3 whip zoom.
//   1.0   CHARGE: MADE A PROS AND CONS LIST ABOUT A CRUSH   1.4 JUDGE: "the defence may present… the list."
//   3.3   EXHIBIT A: the list. PROS pop in fast (eight of them). CONS: one line, 6.3: "might not like me back". Gasp.
//   7.6   VIRGO: "I was being *thorough.*"   9.5 JUDGE: "that con isn't about *them.*"
//  11.4   NOT GUILTY stamp · 12.0 sentence: "text them. (pros attached.)"   Pisces fountains, happy.
//  13.6   last line "The only con | is the *fear.*"; 15.6–16.0 eases back into frame 0 (seamless loop).
import { makeCourt, label, wrapText, box, R, clamp, prog, ease, BONE, INK, GOLD, RED, GREEN, MONO, INTER, popWords } from '../../kzce01/scenes/courtkit.js'

const PROS = ['laughs at my jokes', 'remembers my order', 'kind to the waiter', 'texts back', 'good at board games', 'nice hands', 'tells the truth', 'has a cute dog']
const T = { pro0: 3.6, con: 6.3, ng: 11.4, last: 13.6 }
const D = 16

function scroll(x, t, P) {
  // the list unrolls from Virgo's right point, over the rail, to the floor
  const len = 60 + 300 * ease.outCubic(clamp((t + 0.35) / 0.95))
  const x0 = P.x + 60, y0 = P.y - 30
  x.save()
  R(x, INK, x0 - 6, y0 - 6, 112, len + 12)
  R(x, '#f4e8cc', x0, y0, 100, len)
  for (let i = 0; i < Math.floor(len / 22); i++) R(x, i % 4 === 3 ? RED : '#7a8bb8', x0 + 10, y0 + 12 + i * 22, i % 3 ? 52 : 40, 5)
  R(x, INK, x0 - 12, y0 + len - 4, 104, 26); R(x, '#e2cfa6', x0 - 8, y0 + len, 96, 18)
  x.restore()
}

const CFG = {
  id: 'kzce02', dur: D, ending: 'loop',
  hook: { at: -1, text: 'Virgo made a *spreadsheet* | about a crush.', out: [3.1, 3.3], accentColor: '#ef5c94', size: 90 },
  fx: { whips: [{ at: 0.32, from: 1.25 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  gavels: [0.05, 1.45, T.ng],
  gasps: [-0.2, T.con + 0.05, T.ng + 0.1],
  jury: ['taurus', 'sagittarius', 'gemini', 'pisces', 'aquarius', 'cancer'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.ng + 0.3 ? 'happy' : t > T.con ? 'wide' : undefined
    if (t > T.pro0 && t < T.con - 0.1) return id === 'taurus' || id === 'cancer' ? 'heart' : undefined
    if (t > T.ng + 0.5) return 'happy'
  },
  judge: {
    mood: t => t < 0.5 ? 'squint' : t < 3.2 ? 'neutral' : t < T.con ? 'sparkle' : t < 9.4 ? 'neutral' : t < T.ng ? 'happy' : 'sparkle',
    look: t => t > 3.3 && t < 7.4 ? [0, 1] : t > 7.5 && t < 9.4 ? [-1, 1] : [0, 0.3],
  },
  dock: [{
    who: 'virgo',
    mood: t => t < 0.6 ? 'wide' : t < T.con ? 'neutral' : t < 7.5 ? 'wide' : t < 9.5 ? 'squint' : t < T.ng + 0.1 ? 'neutral' : 'sparkle',
    look: t => t < 0.6 ? [1, 1] : t > 3.3 && t < 7.4 ? [1, -0.6] : undefined,
    hops: [T.ng + 0.3, T.ng + 0.6],
    prop: (x, t, P) => scroll(x, t, P),
  }],
  heads: [{ text: 'The only con | is the *fear.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#ef5c94', size: 100, out: [15.45, 15.6] }],
  ticker: { at: 1.0, out: [13.2, 13.5], label: 'CHARGE', text: 'MADE A PROS AND CONS LIST ABOUT A CRUSH' },
  boxes: [
    { open: 1.3, close: 3.2, lines: [{ t: 1.45, who: 'JUDGE', text: 'the defence may present… *the list.*' }] },
    { open: 7.45, close: 11.3, lines: [{ t: 7.6, who: 'virgo', text: 'I was being *thorough.*' }, { t: 9.5, who: 'JUDGE', text: "that con isn't about *them.*" }] },
  ],
  exhibits: [{
    at: 3.3, out: [7.15, 7.45], label: 'EXHIBIT A', h: 800,
    draw(x, t, k, B) {
      const X = B.cx - 330, Y = B.cy - 340
      box(x, X, Y, 660, 690, '#f4e8cc', { b: 6, hi: null })
      R(x, INK, B.cx - 2, Y + 20, 4, 650)
      label(x, 'PROS', B.cx - 165, Y + 50, { size: 44, col: GREEN, weight: 900, shadow: false })
      label(x, 'CONS', B.cx + 165, Y + 50, { size: 44, col: RED, weight: 900, shadow: false })
      PROS.forEach((p, i) => {
        const a = T.pro0 + i * 0.3
        if (t < a) return
        const kk = ease.outBack(clamp(prog(t, a, a + 0.2)))
        x.save(); x.translate(X + 24, Y + 120 + i * 68); x.scale(kk, kk)
        label(x, '✓ ' + p, 0, 0, { size: 25, col: INK, weight: 800, shadow: false, align: 'left' })
        x.restore()
      })
      if (t > T.con) {
        const kk = ease.outBack(clamp(prog(t, T.con, T.con + 0.25)))
        x.save(); x.translate(B.cx + 165, Y + 150); x.scale(kk, kk)
        wrapText(x, 'might not | like me back', 0, 0, 280, { size: 34, col: RED, weight: 900 })
        x.restore()
        if (t > T.con + 0.5) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.globalAlpha = clamp(prog(t, T.con + 0.5, T.con + 0.7)); x.beginPath(); x.ellipse(B.cx + 165, Y + 150, 170, 80, -0.05, 0, Math.PI * 2 * clamp(prog(t, T.con + 0.5, T.con + 0.9))); x.stroke(); x.restore() }
      }
      void MONO; void INTER; void BONE; void GOLD
    },
  }],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', color: '#2fae6a', out: [13.2, 13.5], y: 860, size: 120 }],
  sentence: { at: 12.0, out: [13.2, 13.5], text: 'text them. (pros attached.)' },
  cues: [
    ...PROS.map((_, i) => ['pop', +(T.pro0 + i * 0.3).toFixed(2), [880, 987.77, 1174.66, 1318.51][i % 4], 0.03, -0.2]),
    ['pluck', T.con, 440, 0.05, 0.6, 0.2], ['tick', T.con + 0.5, 0.05], ['tick', T.con + 0.6, 0.05],
    ['pluck', T.ng + 0.6, 1318.51, 0.035, 0.5, 0.45], ['pluck', T.ng + 0.85, 1567.98, 0.03, 0.5, 0.45],
    ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045),
  ],
}

const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
