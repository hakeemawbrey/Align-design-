// og-nx2e28: social rework (static HOOK; no question card / series bug / end fade via ./x2kit.js copy;
// an already-crying Pisces and a waving Gemini). Was:
// nx2e28 (48 s vertical, "Star Talk Explains, Volume 2", ep 28) · story 0–45.6, then the short end card.
//   ❓ "What's your *3rd house*?"  Teacher: ♊ GEMINI (pointer). Student: ♓ PISCES (crying, happy tears at the bulb).
//   THE HOUSE BOARD (x2kit): the chart wheel draws on (✦ 12 houses, counted from the rising sign), the horizon and the
//   numbers count round from RISING, the 3rd house shades yellow; the right column writes SIBLINGS · NEIGHBOURS ·
//   EVERYDAY TALK · SHORT TRIPS · GEMINI + MERCURY. ♥ love lives in small check-ins.  Last line: "Love lives *nearby*."
// The engine is ../../nx2e16/scenes/x2kit.js. Pure f(t).
import { houseEpisode } from './x2kit.js'   // og: this film's own copy

const EP = houseEpisode({
  id: 'og-nx2e28', house: 3, teacher: 'gemini', student: 'pisces', key: 'D', duration: 48,
  q: 'What’s your | *3rd house*?',
  lines: [
    ['student', 'i have a 3rd house? *i’m already crying.*'],
    ['teacher', 'in astrology, your chart has *12 houses.*', { tag: 'astro', mark: 'wheel' }],
    ['teacher', 'count from the rising sign, *going down.*', { mark: 'rise' }],
    ['teacher', 'one, two… *three!* low on the left.', { mark: 'house' }],
    ['teacher', 'astrologers read it as siblings, *neighbours.*', { mark: 'themes' }],
    ['teacher', 'plus everyday talk and *short trips.*', { mark: 'more' }],
    ['teacher', 'it’s often linked with Gemini. *hi. hi. me.*', { mark: 'link' }],
    ['student', 'so… *texting my sister?* i do that hourly.'],
    ['teacher', 'love lives in small check-ins. *a wave counts.*', { tag: 'tip' }],
    ['student', 'so it’s the group chat… but *on my street.*', { bulb: true }],
  ],
  words: [
    { text: 'SIBLINGS', mark: 'themes', i: 0 }, { text: '*NEIGHBOURS*', mark: 'themes', i: 1, d: 0.6 },
    { text: 'EVERYDAY TALK', mark: 'more', i: 2 }, { text: 'SHORT TRIPS', mark: 'more', i: 3, d: 0.6 },
    { text: 'GEMINI +|MERCURY', mark: 'link', i: 4.4, size: 26 },
  ],
  items: ['*12 houses*, from rising', '3rd: siblings, *neighbours*', 'Small *check-ins*'],
  last: 'Love lives *nearby*.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T

// og (social): static TikTok-style hook, on screen from frame 1 over the classroom
export const HOOK = 'Love isn\'t only | *big moments.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
