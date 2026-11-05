// kzce01: ZODIAC COURTROOM, "Three Days, Then a Meme" (14 s vertical, Month 2 boost m06 #1, chiptune · D). Hard cut.
//   0.00  frame 0: the gavel is mid-slam, ♊ Gemini flinches in the dock, the jury is mid-gasp, whip-zoom in.
//         Hook: "Gemini. Three days. | Then a *meme.*"
//   1.0   the court ticker: CHARGE: LEFT THEM ON READ FOR THREE DAYS, THEN REPLIED WITH A MEME
//   1.5   JUDGE: "order! exhibit A, please."
//   2.9   EXHIBIT A (evidence bag): the chat. "how did the interview go??" Read Mon · THREE DAYS LATER · a frog meme.
//   4.75  the meme lands: the jury gasps (freeze + record scratch 4.75–5.35)
//   7.0   GEMINI: "it was a GOOD meme."   8.9  JUDGE: "they asked about your *day*."
//  10.4   gavel · GUILTY stamp · 11.0 sentence: "one real reply. today."   Pisces fountains.
//  12.75  last line: "A meme is not a *reply.*"  holds to 14.0, hard cut.
import { makeCourt, drawChat, drawBits, label, ease, prog, clamp, BONE, INK, GOLD, RED, MONO, popWords } from './courtkit.js'

const FROG = ['....GG..GG....', '...GWKGGWKG...', '..GGWWGGWWGG..', '.GGGGGGGGGGGG.', 'GGGGGGGGGGGGGG', 'GGRRRRRRRRRRGG', 'GGGRRRRRRRRGGG', '.GGGGGGGGGGGG.', '..GG......GG..']
function meme(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#f4e8cc'; x.fillRect(-164, -144, 328, 288)
  x.fillStyle = '#7fd0ff'; x.fillRect(-164, -144, 328, 200)
  drawBits(x, FROG, { G: '#5fc46a', W: '#ffffff', K: INK, R: '#e8344e' }, 0, -40 + 4 * Math.sin(t * 6), 16)
  label(x, 'me rn', 0, 100, { size: 46, col: INK, weight: 900, shadow: false })
  x.restore()
}

const T = { gasp: 4.75, guilty: 10.4, last: 12.75 }
const CFG = {
  id: 'kzce01', dur: 14, ending: 'cut',
  hook: { at: -1, text: 'Gemini. Three days. | Then a *meme.*', out: [2.7, 2.9], accentColor: '#f2cf4a', size: 96 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.guilty + 0.08, from: 1.22 }], recs: [{ at: T.gasp + 0.2, len: 1.0, caption: 'yes. *a frog.*', top: 1450 }], flashes: [[T.guilty + 0.1, '#ffe9a8']] },
  gavels: [0.06, 1.55, T.guilty],
  gasps: [-0.25, T.gasp, T.guilty + 0.1],
  jury: ['leo', 'virgo', 'aries', 'pisces', 'libra', 'capricorn'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.guilty + 0.3 ? 'happy' : t > T.gasp ? 'wide' : undefined
    if (t > 7.1 && t < 8.6) return id === 'leo' ? 'happy' : id === 'virgo' ? 'eyeroll' : undefined
    if (t > T.last) return 'happy'
  },
  judge: {
    mood: t => t < 0.6 ? 'squint' : t < 7 ? 'neutral' : t < 8.8 ? 'eyeroll' : t < T.guilty ? 'squint' : t < T.last ? 'neutral' : 'happy',
    look: t => t > 2.9 && t < 6.7 ? [0, 1] : t > 6.9 && t < 8.7 ? [-1, 1] : [0, 0.3],
  },
  dock: [{
    who: 'gemini',
    mood: t => t < 0.7 ? 'wide' : t < 4.7 ? 'neutral' : t < 6.8 ? 'squint' : t < 8.8 ? 'happy' : t < T.guilty + 0.1 ? 'neutral' : t < 11.6 ? 'wide' : 'happy',
    look: t => t < 0.7 ? [1, -1] : t > 2.9 && t < 6.7 ? [1, -0.5] : t > 8.8 && t < 10.3 ? [1, -1] : undefined,
    hops: [11.7, 12.0],
  }],
  heads: [
    { text: 'A meme is not | a *reply.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#7fd0ff', size: 96 },
  ],
  ticker: { at: 1.0, out: [12.4, 12.7], label: 'CHARGE', text: 'LEFT THEM ON READ FOR THREE DAYS, THEN REPLIED WITH A MEME' },
  boxes: [
    { open: 1.4, close: 2.85, lines: [{ t: 1.55, who: 'JUDGE', text: 'order! exhibit *A*, please.' }] },
    { open: 6.85, close: 10.3, lines: [{ t: 7.0, who: 'gemini', text: 'it was a *GOOD* meme.' }, { t: 8.9, who: 'JUDGE', text: 'they asked about your *day.*' }] },
  ],
  exhibits: [{
    at: 2.9, out: [6.45, 6.75], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, { cx: B.cx, cy: B.cy, w: B.w, h: B.h }, {
        title: '♊︎ gemini',
        msgs: [
          { at: 3.1, side: 'R', text: 'how did the interview go??', meta: 'Read · Mon 7:02 PM', metaCol: '#ff8fb1' },
          { at: 3.75, side: 'C', text: '· · · THREE DAYS LATER · · ·' },
        ],
      })
      const mk = clamp(prog(t, T.gasp - 0.05, T.gasp + 0.2))
      meme(x, t, B.cx - 60, B.cy + 150, ease.outBack(mk))
      void label
      if (t > T.gasp + 0.6) label(x, 'Thu 11:48 PM', B.cx - 60, B.cy + 330, { size: 26, col: '#9fe6b0', font: MONO, weight: 700, alpha: clamp(prog(t, T.gasp + 0.6, T.gasp + 0.8)) })
    },
  }],
  stamps: [{ at: T.guilty, text: 'GUILTY', color: RED, out: [12.4, 12.7], y: 860 }],
  sentence: { at: 11.0, out: [12.4, 12.7], text: 'one real reply. today.' },
  over(x, t) {
    // Gemini's thumbs-up after the sentence: a tiny sent bubble
    if (t > 11.75 && t < 12.6) label(x, 'sent: "it went GREAT, sorry!!"', 540, 1320, { size: 30, col: '#9fe6b0', font: MONO, weight: 700, alpha: clamp(prog(t, 11.75, 11.9)) * (1 - prog(t, 12.4, 12.6)) })
    void BONE; void GOLD
  },
  cues: [
    ['pop', 3.1, 987.77, 0.04, 0.2], ['tick', 3.75, 0.05], ['tick', 3.85, 0.05], ['tick', 3.95, 0.05],
    ['pop', T.gasp, 1567.98, 0.05, 0], ['pluck', 7.1, 880, 0.04, 0.4, -0.3],
    ['pop', 11.75, 1174.66, 0.035, -0.3], ['pluck', 11.9, 1318.51, 0.035, 0.4, -0.3],
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ['pluck', T.guilty + 0.9, 587.33, 0.03, 0.4, 0.45],
    ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045),
  ],
}

const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
