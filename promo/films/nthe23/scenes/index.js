// nthe23: THE THREAD, episode 23, "Pinned (again)" (20 s vertical, promo/films/next30/b06.md, music: house · A)
// Story 0–15.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Leo pinned their own message. | Again."  PINNED: "my date said I'm FUNNY". ♌ Leo mid-pose, a pin glinting.
//   0.7   ♏ "we know. you pinned it." · ♉ "third pin this week" · ♓ voice note (laugh-crying)
//   3.4   Leo: one joke got nothing (it was about soup). ♊ "tell us the joke / yes / no wait, I want soup"
//   7.2   card cut → ♍ "one joke isn't the date. ask what makes them laugh." (gold)
//   9.0   Leo asks: a story about a goose. Leo unpins themself and pins THEIR story.  "Pinned: *their* joke."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

const EP = {
  duration: 20,
  heads: [
    { text: 'Leo pinned their own message. | *Again.*', at: -0.9, out: [3.0, 3.25], size: 76 },
    { text: '‘One joke got *nothing.*’', at: 3.3, out: [6.9, 7.15], size: 88 },
    { text: 'Ask what makes | *them* laugh.', at: 7.3, out: [11.0, 11.25], size: 90 },
    { text: 'Pinned: *their* joke.', at: 11.4, out: [15.1, 15.45], size: 100, late: 2, lateAt: 11.7 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'libra', text: 'how was the date??' },
    { t: -5, kind: 'msg', who: 'leo', text: 'AMAZING.' },
    { t: -4, kind: 'msg', who: 'taurus', text: 'details please' },
    { t: -3, kind: 'msg', who: 'leo', text: "my date said I'm FUNNY" },
    { t: -2, kind: 'sys', who: 'leo', text: 'LEO pinned their own message' },
    { t: 0.7, kind: 'msg', who: 'scorpio', text: 'we know. you pinned it.' },
    { t: 1.5, kind: 'msg', who: 'taurus', text: "that's the third pin this week" },
    { t: 2.4, kind: 'voice', who: 'pisces', dur: '0:03', sob: true, play: [2.6, 4.0], react: { t: 3.0, mark: 'ha', n: 6 } },
    { t: 3.4, kind: 'msg', who: 'leo', text: 'but one joke got nothing. was it bad??' },
    { t: 4.5, kind: 'msg', who: 'leo', text: 'it was about soup' },
    { t: 5.3, kind: 'triple', who: 'gemini', parts: [['Leo: about soup', 'tell us the joke'], ['Leo: was it bad??', 'yes'], ['Leo: about soup', 'no wait, I want soup']] },
    { t: 7.3, kind: 'msg', who: 'virgo', hl: true, text: "one joke isn't the date. ask what makes them laugh." },
    { t: 9.0, kind: 'msg', who: 'leo', text: "asked. they told me a story about a goose. I'M CRYING" },
    { t: 10.3, kind: 'sys', who: 'leo', text: 'LEO unpinned their own message' },
    { t: 11.1, kind: 'sys', who: 'leo', gold: true, text: "LEO pinned their date's goose story" },
    { t: 12.2, kind: 'voice', who: 'pisces', dur: '0:04', sob: true, play: [12.4, 14.0] },
  ],
  pins: [{ t: -2, who: 'leo', text: "my date said I'm FUNNY" }, { t: 11.1, who: 'leo', text: 'the goose story (theirs. it is SO good)' }],
  typing: [{ who: 'virgo', a: 6.1, b: 7.25 }, { who: 'leo', a: 8.2, b: 8.95 }],
  cuts: [3.25, { t: 7.15, kind: 'flip' }, 11.35],
  stage(x, t, K) {
    const mood = t < 3.4 ? 'sparkle' : t < 7.3 ? 'wide' : t < 9 ? 'neutral' : 'happy'
    const F = K.stageStar(x, t, { who: 'leo', x: 260, y: 1730, s: 235, mood, tears: t > 9 && t < 11 ? 2 : 0, phone: 1, hops: [-0.18, 3.4, 4.5, 9.0, 9.2, 9.4, 9.6, 11.1] })
    const glint = 0.5 + 0.5 * Math.sin(t * 7)
    K.drawProp(x, 'pin', F.ox - F.S * 0.36, F.oy - F.base - F.S * 0.3, F.cell * 1.4, { rot: -0.4 })
    if (glint > 0.85) K.drawProp(x, 'snow', F.ox - F.S * 0.42, F.oy - F.base - F.S * 0.4, F.cell * 0.9, { outline: null })
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 9 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 12.2 ? 3 : 2, phone: -1, hops: [2.4, 12.2, 12.5] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
