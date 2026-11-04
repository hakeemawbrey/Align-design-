// nsse12 · SIGN × SIGN, Volume 2: "Gemini × Capricorn: the jokes and the goals." (30 s vertical, star_advice · music: chiptune · C)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse12', a: 'gemini', b: 'capricorn',
  wants: ['to play', 'to plan the year'],
  hook: 'Gemini × Capricorn: | *slide 1 of 40.*',
  moods: { a0: 'sparkle', b0: 'neutral' },
  open: [
    { who: 'b', text: 'my goals for next year: *slide 1 of 40.*', mood: 'neutral', react: 'sparkle' },
    { who: 'a', text: 'what if slide two is *a joke?*', mood: 'sparkle', react: 'squint' },
  ],
  tips: [
    {
      head: 'Capricorn, take | *an afternoon off.*',
      prop: { type: 'calendar', title: 'SATURDAY', cells: [{ d: '9:00', text: 'goals' }, { d: '11:00', text: 'budget' }, { d: '1:00' }, { d: '3:00', text: 'goals II' }, { d: '5:00', text: 'review' }, { d: '7:00', text: 'sleep' }], hl: { i: 2, at: 'L0', text: 'OFF' } },
      lines: [
        { who: 'b', text: 'an afternoon off. *it\'s scary.*', mood: 'wide', react: 'happy' },
        { who: 'a', text: "it's *fun.* I'll show you.", mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Gemini, show up | *on time. Once.*',
      prop: { type: 'clock', digital: true, frames: [{ at: 0, text: '6:57' }, { at: 0.9, text: '6:58' }, { at: 'L0', text: '6:59' }], label: 'gemini: here. a minute early.', labelAt: 'L0+0.2', labelColor: '#2f9a5a' },
      lines: [
        { who: 'a', text: '6:59. a minute early. *witness me.*', mood: 'sparkle', react: 'heart' },
        { who: 'b', text: 'early, even. *I\'m moved.*', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Put *play* | on the plan.',
      prop: { type: 'list', title: "next year's goals", items: [
        { text: '1. save a little', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: '2. learn something', at: 0.7, mark: 'check', markAt: 0.9 },
        { text: '3. snowball fight', at: 'L0', mark: 'check', markAt: 'D0', color: '#c8344c' },
      ] },
      lines: [
        { who: 'b', text: 'goal three: *snowball fight.*', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'best goal on *the list.*', mood: 'heart', react: 'sparkle' },
      ],
    },
  ],
  last: 'Goals, | *with giggles.*',
  music: { style: 'chiptune', key: 'C', seed: 3512 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
