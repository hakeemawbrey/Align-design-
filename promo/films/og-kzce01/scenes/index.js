// og-kzce01: the social rework of kzce01, ZODIAC COURTROOM, "Three Days, Then a Meme" (14 s vertical, chiptune · D).
// Same court, cast and story; static HOOK caption (box) from frame 0 instead of the animated slam title, crazier lines.
//   0.00  frame 0: the gavel is mid-slam, ♊ Gemini flinches in the dock, the jury is mid-gasp, whip-zoom in.
//         HOOK (static box, until 2.8): "Gemini ghosted me, | then sent a *frog.*"
//   1.0   the court ticker: CHARGE: LEFT THEIR BEST FRIEND ON READ FOR THREE DAYS, THEN SENT ONE (1) FROG
//   1.5   JUDGE: "ORDER!! bring in exhibit *FROG.*"
//   2.9   EXHIBIT A (evidence bag): the chat. "how did the interview go??" Read Mon · THREE DAYS LATER · a frog: "it went."
//   4.75  the meme lands: the jury gasps (freeze + record scratch 4.75–5.35)
//   7.0   GEMINI: "my OTHER twin was supposed to *reply.*"   8.9  JUDGE: "you have ONE phone. *ONE.*"
//  10.4   gavel · GUILTY / BOTH TWINS stamp · 11.0 sentence: "one full sentence. zero frogs."   Pisces fountains.
//  12.75  last line: "A meme is not a *reply.*"  holds to 14.0, hard cut.
import { makeCourt, drawChat, drawBits, label, ease, prog, clamp, BONE, INK, GOLD, RED, MONO, popWords } from './courtkit.js'

const FROG = ['....GG..GG....', '...GWKGGWKG...', '..GGWWGGWWGG..', '.GGGGGGGGGGGG.', 'GGGGGGGGGGGGGG', 'GGRRRRRRRRRRGG', 'GGGRRRRRRRRGGG', '.GGGGGGGGGGGG.', '..GG......GG..']
function meme(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#f4e8cc'; x.fillRect(-164, -144, 328, 288)
  x.fillStyle = '#7fd0ff'; x.fillRect(-164, -144, 328, 200)
  drawBits(x, FROG, { G: '#5fc46a', W: '#ffffff', K: INK, R: '#e8344e' }, 0, -40 + 4 * Math.sin(t * 6), 16)
  label(x, 'it went.', 0, 100, { size: 46, col: INK, weight: 900, shadow: false })
  x.restore()
}

const T = { gasp: 4.75, guilty: 10.4, last: 12.75 }
const CFG = {
  id: 'og-kzce01', dur: 14, ending: 'cut',
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 0, flash: 0, len: 0.5 }, { at: T.guilty + 0.08, from: 1.22 }], recs: [{ at: T.gasp + 0.2, len: 1.0, caption: 'yes. *a frog.* that was it.', top: 1450 }], flashes: [[T.guilty + 0.1, '#ffe9a8']] },
  gavels: [0.06, 1.55, T.guilty],
  gasps: [-0.25, T.gasp, T.guilty + 0.1],
  jury: ['leo', 'virgo', 'aries', 'pisces', 'libra', 'capricorn'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.guilty + 0.3 ? 'sparkle' : t > T.gasp ? 'wide' : undefined
    if (t > 7.1 && t < 8.6) return id === 'leo' ? 'heart' : id === 'virgo' ? 'eyeroll' : id === 'aries' ? 'squint' : id === 'capricorn' ? 'eyeroll' : undefined
    if (t > 8.9 && t < T.guilty) return id === 'aries' || id === 'virgo' ? 'squint' : undefined
    if (t > T.last) return 'happy'
  },
  judge: {
    mood: t => t < 0.6 ? 'squint' : t < 7 ? 'neutral' : t < 8.8 ? 'eyeroll' : t < T.guilty ? 'squint' : t < T.last ? 'neutral' : 'happy',
    look: t => t > 2.9 && t < 6.7 ? [0, 1] : t > 6.9 && t < 8.7 ? [-1, 1] : [0, 0.3],
  },
  dock: [{
    who: 'gemini',
    mood: t => t < 0.7 ? 'wide' : t < 4.7 ? 'neutral' : t < 6.8 ? 'squint' : t < 8.8 ? 'wink' : t < T.guilty + 0.1 ? 'neutral' : t < 11.6 ? 'wide' : 'happy',
    look: t => t < 0.7 ? [1, -1] : t > 2.9 && t < 6.7 ? [1, -0.5] : t > 8.8 && t < 10.3 ? [1, -1] : undefined,
    hops: [11.7, 12.0],
  }],
  heads: [
    { text: 'A meme is not | a *reply.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#7fd0ff', size: 96 },
  ],
  ticker: { at: 1.0, out: [12.4, 12.7], label: 'CHARGE', text: 'LEFT THEIR BEST FRIEND ON READ FOR THREE DAYS, THEN SENT ONE (1) FROG' },
  boxes: [
    { open: 1.4, close: 2.85, lines: [{ t: 1.55, who: 'JUDGE', text: 'ORDER!! bring in exhibit *FROG.*' }] },
    { open: 6.85, close: 10.3, lines: [{ t: 7.0, who: 'gemini', text: 'my OTHER twin was supposed to *reply.*' }, { t: 8.9, who: 'JUDGE', text: 'you have ONE phone. *ONE.*' }] },
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
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'BOTH TWINS', color: RED, out: [12.4, 12.7], y: 860 }],
  sentence: { at: 11.0, out: [12.4, 12.7], text: 'one full sentence. zero frogs.' },
  over(x, t) {
    // Gemini complies instantly, in the most Gemini way: a tiny sent bubble
    if (t > 11.75 && t < 12.6) label(x, 'sent: "it went GREAT!!" + 1 frog', 540, 1320, { size: 30, col: '#9fe6b0', font: MONO, weight: 700, alpha: clamp(prog(t, 11.75, 11.9)) * (1 - prog(t, 12.4, 12.6)) })
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
// social hook: static caption from frame 0 (the film's own animated slam title is removed above)
export const HOOK = 'Gemini ghosted me, | then sent a *frog.*'
export const HOOK_TOP = 150         // above the judge's wig, below the series bug
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.8
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
