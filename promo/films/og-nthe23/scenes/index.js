// og-nthe23: social rework of nthe23 (The Thread). Static HOOK replaces the animated frame-0 headline; no series bug; no end card; the
// film ends on its last story beat; crazier lines. The look lives in ./threadkit.js (social copy of ../../nthe17/scenes/threadkit.js).
//   0.00  "Leo pinned a compliment. | Their own."  PINNED: "my date said I'm FUNNY". ♌ Leo mid-pose, a pin glinting.
//   0.7   ♏ "we know. you pinned it." · ♉ "third pin this week" · ♓ voice note (laugh-crying)
//   3.4   Leo: one joke got nothing (it was about soup). ♊ "tell us the joke / yes / no wait, I want soup"
//   7.2   ♍ "one joke isn't the date. ask what makes them laugh." (gold)
//   9.0   Leo asks: a story about a goose. Leo unpins themself and pins THEIR story.  "Pinned: *their* joke."
import { threadFilm } from './threadkit.js'

const EP = {
  duration: 18,
  heads: [
    { text: '‘One joke got *nothing.*’', at: 3.3, out: [6.9, 7.15], size: 88 },
    { text: 'Ask what makes | *them* laugh.', at: 7.3, out: [11.0, 11.25], size: 90 },
    { text: 'Pinned: *their* joke.', at: 11.4, out: [15.1, 15.45], size: 100, late: 2, lateAt: 11.7 },
  ],
  items: [
    { t: -6, kind: 'msg', who: 'libra', text: 'how was the date??' },
    { t: -5, kind: 'msg', who: 'leo', text: 'AMAZING. obviously.' },
    { t: -4, kind: 'msg', who: 'taurus', text: 'details please' },
    { t: -3, kind: 'msg', who: 'leo', text: "my date said I'm FUNNY. frame it." },
    { t: -2, kind: 'sys', who: 'leo', text: 'LEO pinned their own message (again)' },
    { t: 0.7, kind: 'msg', who: 'scorpio', text: 'we know. you pinned it. and made it the chat photo.' },
    { t: 1.5, kind: 'msg', who: 'taurus', text: "that's the ninth pin this week" },
    { t: 2.4, kind: 'voice', who: 'pisces', dur: '1:30', sob: true, play: [2.6, 4.0], react: { t: 3.0, mark: 'ha', n: 6 } },
    { t: 3.4, kind: 'msg', who: 'leo', text: 'but ONE joke got nothing. I may never recover.' },
    { t: 4.5, kind: 'msg', who: 'leo', text: 'it was about soup. my best material.' },
    { t: 5.3, kind: 'triple', who: 'gemini', parts: [['Leo: about soup', 'tell us the joke'], ['Leo: was it bad??', 'yes'], ['Leo: about soup', 'no wait, I want soup']] },
    { t: 7.3, kind: 'msg', who: 'virgo', hl: true, text: "one joke isn't the date. ask what makes them laugh." },
    { t: 9.0, kind: 'msg', who: 'leo', text: "asked. they told me a story about a goose. I'M CRYING. in public." },
    { t: 10.3, kind: 'sys', who: 'leo', text: 'LEO unpinned their own message' },
    { t: 11.1, kind: 'sys', who: 'leo', gold: true, text: "LEO pinned their date's goose story" },
    { t: 12.2, kind: 'voice', who: 'pisces', dur: '6:06', sob: true, play: [12.4, 14.0] },
  ],
  pins: [{ t: -2, who: 'leo', text: "my date said I'm FUNNY. frame it." }, { t: 11.1, who: 'leo', text: 'the goose story (theirs. it is SO good)' }],
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
export const { DURATION, SCENES, CUES, STORY_END } = threadFilm(EP)
export const HOOK = 'Leo pinned their | *own* compliment.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
