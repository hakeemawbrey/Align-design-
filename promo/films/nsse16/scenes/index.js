// nsse16 · SIGN × SIGN, Volume 2: "Pisces × Sagittarius: the dream and the dare." (30 s vertical, star_advice · music: dreamy · Db)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse16', a: 'pisces', b: 'sagittarius',
  wants: ['to dream it', 'to do it tonight'],
  hook: 'Pisces × Sagittarius: | *move to the sea tomorrow?*',
  figNote: 'field note: both share Jupiter as a traditional ruler',
  moods: { a0: 'sparkle', b0: 'sparkle' },
  open: [
    { who: 'a', text: 'I dreamed we lived *by the sea.*', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: "let's *move there.* tomorrow.", mood: 'sparkle', react: 'wide' },
  ],
  tips: [
    {
      head: 'Sag, *slow down* | the dare.',
      prop: { type: 'map', from: 'tomorrow', to: 'someday', run: [0.4, 'D1'], note: { text: 'no rush. still going.', at: 'D0' } },
      lines: [
        { who: 'b', text: 'ok. not tomorrow. *someday?*', mood: 'neutral', react: 'happy' },
        { who: 'a', text: 'someday is *perfect.*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Pisces, *say* | what you need.',
      prop: { type: 'phone', title: '♐︎ sagittarius', msgs: [
        { side: 'R', text: 'I need a little reassurance tonight', at: 'L0' },
        { side: 'L', text: 'you have it. a lot of it.', at: 'L1' },
      ] },
      lines: [
        { who: 'a', text: 'I need a little *reassurance.*', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'you have it. *a lot of it.*', mood: 'happy', react: 'happy' },
      ],
    },
    {
      head: 'Plan *one* dream | a year.',
      prop: { type: 'calendar', title: 'THIS YEAR', cells: [{ d: 'jan' }, { d: 'apr' }, { d: 'jun' }, { d: 'aug' }, { d: 'oct' }, { d: 'dec' }], hl: { i: 3, at: 'L0', text: 'see the sea', size: 30 } },
      lines: [
        { who: 'b', text: 'this year: *see the sea.* once.', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: "I'm crying. *the good way.*", mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Dream big. | *Start small.*',
  music: { style: 'dreamy', key: 'Db', seed: 3516 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
