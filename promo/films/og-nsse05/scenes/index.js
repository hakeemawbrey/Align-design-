// og-nsse05: social rework of nsse05 (OG-REWORK.md). Same notebook, cast and story; static HOOK (box) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse05 · SIGN × SIGN, Volume 2: "Libra × Capricorn: the romance and the agenda." (28 s vertical, star_advice · music: jazzy · Eb)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse05', a: 'libra', b: 'capricorn',
  wants: ['candlelight. lots.', 'an agenda (printed)'],
  hook: 'Libra × Capricorn: | *candles vs. calendar.*',
  moods: { a0: 'sparkle', b0: 'neutral' },
  open: [
    { who: 'a', text: 'romance? *I lit 40 candles.*', mood: 'sparkle', react: 'neutral' },
    { who: 'b', text: 'item one: dinner. *home by 9:45.*', mood: 'neutral', react: 'wide' },
  ],
  tips: [
    {
      head: 'Capricorn, add one | *unnecessary flower.*',
      prop: { type: 'list', title: 'agenda: friday', items: [
        { text: '1. dinner', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: '2. home by 9:45', at: 0.7, mark: 'check', markAt: 0.9 },
        { text: '3. one flower (no reason)', at: 'L0', mark: 'check', markAt: 'D0', color: '#c8344c' },
      ] },
      lines: [
        { who: 'b', text: 'item three: *one flower.* why? none.', mood: 'neutral', react: 'heart' },
        { who: 'a', text: 'no reason?? *I need to sit down.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Libra, *pick* | the restaurant.',
      prop: { type: 'scale', left: 'the bistro', right: 'the other bistro', seq: [[0, -0.6], [0.6, 0.6], [1.1, -0.5], [1.5, 0.5], ['D0-0.3', -1]], verdict: { text: 'decided: the bistro', at: 'D0' } },
      lines: [
        { who: 'a', text: 'the bistro. *final.* (I think.)', mood: 'squint', react: 'heart' },
        { who: 'b', text: "decisive?? *I'm swooning.*", mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Put romance | *on the agenda.*',
      prop: { type: 'calendar', title: 'NEXT WEEK', cells: [{ d: 'mon', text: 'budget' }, { d: 'tue', text: 'gym' }, { d: 'wed', text: 'report' }, { d: 'thu', text: 'meeting' }, { d: 'fri' }, { d: 'sat', text: 'errands' }], hl: { i: 4, at: 'L0', text: 'candles!', size: 32 } },
      lines: [
        { who: 'b', text: 'friday: candles. *7 PM sharp.*', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'romance, *with a deadline!*', mood: 'sparkle', react: 'happy' },
      ],
    },
  ],
  last: 'Item one: | *us.*',
  music: { style: 'jazzy', key: 'Eb', seed: 3505 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Libra: candles. | Capricorn: *a PDF.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
