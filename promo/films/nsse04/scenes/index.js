// nsse04 · SIGN × SIGN, Volume 2: "Aries × Virgo: now, and nearly ready." (30 s vertical, star_advice · music: chiptune · B)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse04', a: 'aries', b: 'virgo',
  wants: ['to go NOW', 'ten more minutes'],
  hook: 'Aries × Virgo: | *are we leaving or not?*',
  moods: { a0: 'sparkle', b0: 'squint' },
  open: [
    { who: 'a', text: "let's go! *I'm in the car!*", mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'checking the reservation. *again.*', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aries, give a | *heads-up.*',
      prop: { type: 'clock', digital: true, frames: [{ at: 0, text: '10:00' }, { at: 'D0+0.3', text: '9:59' }, { at: 'D0+0.7', text: '9:58' }, { at: 'L1', text: '9:57' }], label: 'the warning: ten minutes', labelAt: 'L0+0.3' },
      lines: [
        { who: 'a', text: 'leaving in *10.* your warning.', mood: 'happy', react: 'heart' },
        { who: 'b', text: 'a warning? *I love you.*', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Virgo, say | *good enough.*',
      prop: { type: 'list', title: "virgo's leaving list", items: [
        { text: 'reservation', at: 0.4, mark: 'check', markAt: 0.7 },
        { text: 'scarf', at: 0.8, mark: 'check', markAt: 1.1 },
        { text: 're-check reservation', at: 1.2, mark: 'strike', markAt: 'D0-0.4' },
      ] },
      lines: [
        { who: 'b', text: "it's… *good enough.* we go.", mood: 'squint', react: 'wide' },
        { who: 'a', text: 'who ARE you? *I love it.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Race to | *plan the date.*',
      prop: { type: 'gauge', title: "virgo's plan", labels: ['start', 'done'], color: '#ef5c94', seq: [[0.3, 0], ['L0', 0.55], ['D0', 1]], verdict: { text: 'time: 4 minutes 12', at: 'D0+0.2' } },
      lines: [
        { who: 'b', text: 'planned. *colour-coded.* 4 minutes.', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: 'fastest plan *ever.* you win!', mood: 'sparkle', react: 'heart' },
      ],
    },
  ],
  last: 'Ready, set, | *together.*',
  music: { style: 'chiptune', key: 'B', seed: 3504 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
