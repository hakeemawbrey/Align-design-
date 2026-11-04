// nsse08 · SIGN × SIGN, Volume 2: "Scorpio × Gemini: the deep end and the shallow end." (28 s vertical, star_advice · music: screwed · Cm)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse08', a: 'scorpio', b: 'gemini',
  wants: ['one deep question', 'twelve fun ones'],
  hook: 'Scorpio × Gemini: | *one question, twelve jokes.*',
  moods: { a0: 'squint', b0: 'sparkle' },
  open: [
    { who: 'a', text: 'what are you *most afraid of?*', mood: 'squint', react: 'wide' },
    { who: 'b', text: 'geese. next! *favourite cheese?*', mood: 'sparkle', react: 'squint' },
  ],
  tips: [
    {
      head: 'Gemini, answer one | *for real.*',
      prop: { type: 'gauge', title: 'the depth gauge', labels: ['puddle', 'ocean'], color: '#3f7cf0', seq: [[0.3, 0.1], ['L0', 0.4], ['D0', 0.85]] },
      lines: [
        { who: 'b', text: 'ok, real answer: *being boring.*', mood: 'neutral', react: 'heart' },
        { who: 'a', text: 'thank you. *that was brave.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Scorpio, let a joke | *be a joke.*',
      prop: { type: 'list', title: "scorpio's investigation", items: [
        { text: 'the joke: geese', at: 0.4 },
        { text: 'hidden meaning?', at: 0.9, mark: 'cross', markAt: 'D0' },
        { text: 'just geese', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'a', text: 'the geese thing… *was just geese?*', mood: 'squint', react: 'happy' },
        { who: 'b', text: '*just geese.* I promise.', mood: 'happy', react: 'happy' },
      ],
    },
    {
      head: 'Split the | *talk card.*',
      prop: { type: 'card', q: 'What made you laugh this week?', tear: 'L0-0.3', halves: ['the question', 'the follow-up'] },
      lines: [
        { who: 'a', text: 'I pick *the question.*', mood: 'sparkle', react: 'sparkle' },
        { who: 'b', text: 'I pick *the follow-up.*', mood: 'sparkle', react: 'heart' },
      ],
    },
  ],
  last: 'Deep and | *delightful.*',
  music: { style: 'screwed', key: 'Cm', seed: 3508 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
