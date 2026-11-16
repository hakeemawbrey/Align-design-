// og-kzce04: the social rework of kzce04, ZODIAC COURTROOM, "The One-Letter Essay" (14.3 s vertical, synthwave · Em).
// Same court, cast and story; static HOOK caption (outline) from frame 0 instead of the slammed title, crazier lines.
// The giant "k." no longer slams: it hangs still over the court under the hook, and the story starts 1.3 s later so the
// hook has time to read. No boom, no opening whip. Kit: ./courtkit.js (the og-kzce01 copy). Hard cut.
//   0.00  frame 0: a giant "k." hangs over the court, ♏ Scorpio arms-crossed in the dock.
//         HOOK (static outline, until 2.8): "Scorpio texted *'k.'* | It was an *essay.*"
//   2.9   EXHIBIT A: the chat. "so… are we ok?" → "k."  4.5 the "k." unrolls into a scroll of what it meant
//         (hurt you cancelled · didn't want to seem needy · missed you · drafted nine replies · so: k.)
//   5.9   record scratch: "one letter. *five* lines."    6.5 CHARGE ticker (top band, once the exhibit tag is gone)
//   7.7   SCORPIO: "it was *implied.* by the *period.*"   9.4 JUDGE: "the court can't read *minds.* or punctuation."
//  11.1   GUILTY · 11.7 sentence: "say the essay. kindly. no period."   Pisces fountains over the scroll.
//  13.0   last line "Say the essay. | Out *loud.*" holds to 14.3, hard cut.
import { makeCourt, drawChat, label, R, clamp, prog, ease, INK, RED, popWords } from './courtkit.js'

const O = 1.3   // og: everything after frame 0 starts 1.3 s later than in kzce04
const T = { ex: 1.6 + O, k: 2.3 + O, unroll: 3.2 + O, rec: 4.6 + O, guilty: 9.8 + O, last: 11.7 + O }
const ESSAY = ['I was hurt you cancelled', "didn't want to seem needy", 'I missed you (a lot)', 'I drafted nine replies', 'so: k.']
const CFG = {
  id: 'og-kzce04', dur: 13 + O, ending: 'cut',
  fx: { whips: [{ at: T.guilty + 0.08, from: 1.2 }], recs: [{ at: T.rec, len: 1.0, caption: 'one letter. *five* lines.', top: 1480 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, T.guilty],
  gasps: [-0.25, 4.2 + O, T.guilty + 0.1],
  juryDx: -90,   // og full frame: the jury box clears the app's side buttons (x 960+)
  jury: ['cancer', 'libra', 'gemini', 'pisces', 'taurus', 'sagittarius'],
  tears: () => 3,
  juryMood: (t, id) => {
    if (id === 'pisces') return t > T.guilty + 0.3 ? 'sparkle' : t > 4 + O ? 'wide' : undefined
    if (t > T.unroll + 0.8 && t < T.rec) return id === 'cancer' ? 'heart' : id === 'gemini' ? 'squint' : undefined
    if (t > T.guilty + 0.5) return 'happy'
  },
  judge: {
    mood: t => t < 0.6 + O ? 'wide' : t < 6.2 + O ? 'squint' : t < 8 + O ? 'eyeroll' : t < T.last ? 'neutral' : 'happy',
    look: t => t > T.ex && t < 6.2 + O ? [0, 1] : t > 6.3 + O && t < 9.6 + O ? [-1, 1] : [0, 0.3],
  },
  dock: [{ who: 'scorpio',
    mood: t => t < 1.5 + O ? 'squint' : t < 4.2 + O ? 'neutral' : t < 6.3 + O ? 'wide' : t < 8.1 + O ? 'squint' : t < T.guilty + 0.1 ? 'neutral' : t < 11 + O ? 'wide' : 'happy',
    look: t => t > T.ex && t < 6.2 + O ? [1, -0.6] : t < 1.5 + O ? [1, 0] : undefined, hops: [11.2 + O, 11.5 + O] }],
  heads: [{ text: 'Say the essay. | Out *loud.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#e23d66', size: 100, top: 1330 }],   // og: holds to the hard cut, in the empty floor
  ticker: { at: 6.2 + O, y: 392, out: [11.4 + O, 11.7 + O], label: 'CHARGE',   // og full frame: top band, once the exhibit tag is gone
    text: 'SENT "K." (WITH A PERIOD) AND MEANT A WHOLE ESSAY' },
  boxes: [{ open: 6.25 + O, close: 9.7 + O, y: 1330, height: 230, width: 900, W: 1020,
    lines: [{ t: 6.4 + O, who: 'scorpio', text: 'it was *implied.* by the *period.*' }, { t: 8.1 + O, who: 'JUDGE', text: "the court can't read *minds.* or punctuation." }] }],
  exhibits: [{
    at: T.ex, out: [5.9 + O, 6.2 + O], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, { cx: B.cx, cy: B.cy, w: B.w, h: B.h }, { title: '♏︎ scorpio', msgs: [{ at: 1.85 + O, side: 'R', text: 'so… are we ok?' }, { at: T.k, side: 'L', text: 'k.', meta: 'delivered' }] })
      // the scroll unrolls down out of the "k."
      const u = ease.outCubic(clamp(prog(t, T.unroll, T.unroll + 1.2)))
      if (u > 0) {
        const X = B.cx - 250, Y = B.cy - 110, h = 470 * u
        R(x, INK, X - 6, Y - 6, 512, h + 12); R(x, '#f4e8cc', X, Y, 500, h)
        R(x, INK, X - 14, Y + h - 6, 528, 28); R(x, '#e2cfa6', X - 10, Y + h - 2, 520, 20)
        ESSAY.forEach((s, i) => { const yy = Y + 64 + i * 84; if (yy < Y + h - 40) label(x, s, B.cx, yy, { size: i === 4 ? 52 : 34, col: i === 4 ? RED : INK, weight: 900, shadow: false }) })
      }
    },
  }],
  over(x, t) {
    // og: the giant "k." hangs still over the court under the hook (no slam), then fades before the exhibit
    if (t < T.ex) {
      x.save(); x.globalAlpha = 1 - prog(t, T.ex - 0.35, T.ex); x.translate(540, 880); x.rotate(-0.08)
      label(x, 'k.', 0, 0, { size: 420, col: '#e23d66', weight: 900 }); x.restore()
    }
  },
  stamps: [{ at: T.guilty, text: 'GUILTY', color: RED, out: [11.4 + O, 11.7 + O], y: 860 }],
  sentence: { at: 10.4 + O, out: [11.4 + O, 11.7 + O], text: 'say the essay. kindly. no period.' },
  cues: [['pop', 1.85 + O, 987.77, 0.04, 0.2], ['pop', T.k, 440, 0.06, -0.2], ['riser', T.unroll, T.unroll + 1.2, 0.03],
    ...ESSAY.map((_, i) => ['pop', +(T.unroll + 0.3 + i * 0.25).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.03, 0]),
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
// social hook: static caption from frame 0 (the film's own slammed title is removed above)
export const HOOK = "Scorpio texted *'k.'* | It was an *essay.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.8
export const HOOK_TOP = 150         // clear of the judge's wig
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
