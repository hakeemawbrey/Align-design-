// og-nthe22: social rework of nthe22 (The Thread). Static HOOK replaces the animated frame-0 headline; no series bug; no end card; the
// film ends on its last story beat; crazier lines. The look lives in ./threadkit.js (social copy of ../../nthe17/scenes/threadkit.js).
//   0.00  "Cancer made a poll."  The year-end dinner poll (four nights). ♋ Cancer mid-hop with a ladle and a big pot.
//   0.6   every vote lands on a different night; ♊ votes three times; ♑ "Thursday. agenda to follow."
//   4.6   ♐ is away Friday (the surprise trip). ♓ voice note, sobbing at "everyone together".
//   7.6   "‘Should I *cancel?*’"  ♍ "pick the night most can do. save Sag a seat on video." (gold)
//  11.8   ♐ "I'll be there. on a screen. in my best sweater." The rest move to Friday; the poll closes.
//  16.4   "Dinner is *the people*."
import { threadFilm } from './threadkit.js'

const EP = {
  duration: 23,
  heads: [
    { text: 'Everyone voted. | *Differently.*', at: 3.9, out: [7.4, 7.65], size: 88 },
    { text: '‘Should I *cancel?*’', at: 7.7, out: [10.9, 11.15], size: 100 },
    { text: 'Most can come. *Pick it.*', at: 11.2, out: [16.0, 16.25], size: 88 },
    { text: 'Dinner is *the people.*', at: 16.4, out: [20.15, 20.45], size: 100, late: 2, lateAt: 16.7 },
  ],
  items: [
    { t: -4, kind: 'msg', who: 'cancer', text: 'year-end dinner!! at mine. soup is already on. vote:' },
    { t: -3, kind: 'poll', who: 'cancer', q: 'Year-end dinner: which night?', closeAt: 13.6, opts: [
      { label: 'Thursday', votes: [0.6, 2.2, 3.4] },
      { label: 'Friday', votes: [1.1, 2.4, 12.2, 12.4, 12.6, 12.8, 13.0] },
      { label: 'Saturday', votes: [1.6, 2.6] },
      { label: 'Sunday', votes: [3.0] },
    ] },
    { t: 2.0, kind: 'msg', who: 'gemini', text: 'I voted 3 times. I contain multitudes.' },
    { t: 3.4, kind: 'msg', who: 'cap', text: 'Thursday. agenda to follow. seating chart attached.' },
    { t: 4.6, kind: 'msg', who: 'sag', text: "I'm away Friday (on a MOUNTAIN!!) sorry" },
    { t: 5.6, kind: 'voice', who: 'pisces', dur: '5:21', sob: true, play: [5.85, 7.6], react: { t: 6.3, mark: 'tear', n: 5 } },
    { t: 7.7, kind: 'msg', who: 'cancer', text: "Sag can't do Friday. should I cancel the whole thing? the SOUP??" },
    { t: 10.3, kind: 'msg', who: 'virgo', hl: true, text: 'pick the night most can do. save Sag a seat on video.' },
    { t: 11.8, kind: 'msg', who: 'sag', text: "I'll be there. on a screen. in my best sweater. from a cliff." },
    { t: 13.6, kind: 'sys', who: 'cancer', gold: true, text: 'POLL CLOSED: Friday it is' },
    { t: 14.6, kind: 'msg', who: 'cancer', text: "a plate for everyone and a screen for Sag. I'm feeding the screen.", react: { t: 15.1, mark: 'heart', n: 12 } },
    { t: 16.0, kind: 'voice', who: 'pisces', dur: '7:02', sob: true, play: [16.2, 18.4] },
  ],
  typing: [{ who: 'virgo', a: 8.6, b: 10.25 }],
  cuts: [7.55, { t: 10.1, kind: 'flip' }, 16.25],
  stage(x, t, K) {
    K.drawProp(x, 'pot', 470, 1790, 11)
    for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${0.35 * Math.sin(Math.PI * ph)})`; x.fillRect(430 + i * 36 + Math.sin(ph * 6 + i) * 8, 1730 - ph * 90, 10, 10) }
    const mood = t < 4.6 ? 'happy' : t < 10.3 ? 'wide' : t < 13.6 ? 'neutral' : 'heart'
    const F = K.stageStar(x, t, { who: 'cancer', x: 250, y: 1730, s: 230, mood, hops: [-0.2, 0.6, 7.7, 13.6, 13.85, 14.6] })
    K.drawProp(x, 'ladle', F.ox + F.S * 0.42, F.oy - F.base - F.S * 0.05, F.cell * 1.6, { rot: 0.3 * Math.sin(t * 4) })
    K.stageStar(x, t, { who: 'pisces', x: 880, y: 1745, s: 165, mood: t > 13.6 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 16 ? 3 : t > 5.6 ? 2 : 1, phone: -1, hops: [5.6, 16.0, 16.3] })
  },
}
export const { DURATION, SCENES, CUES, STORY_END } = threadFilm(EP)
export const HOOK = 'Cancer made a poll. | Gemini: *3 votes.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.8
