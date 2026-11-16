// og-nsse04: social rework of nsse04 (OG-REWORK.md). Same notebook, cast and story; static HOOK (outline) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse04 · SIGN × SIGN, Volume 2: "Aries × Virgo: now, and nearly ready." (28 s vertical, star_advice · music: chiptune · B)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse04', a: 'aries', b: 'virgo',
  wants: ['to leave 5 minutes ago', 'ten more minutes'],
  hook: 'Aries × Virgo: | *are we leaving or not?*',
  moods: { a0: 'sparkle', b0: 'squint' },
  open: [
    { who: 'a', text: "I'm in the car! *it's running!*", mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'checking the reservation. *4th time.*', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aries, give a | *heads-up.*',
      prop: { type: 'clock', digital: true, frames: [{ at: 0, text: '10:00' }, { at: 'D0+0.3', text: '9:59' }, { at: 'D0+0.7', text: '9:58' }, { at: 'L1', text: '9:57' }], label: 'the warning: ten minutes', labelAt: 'L0+0.3' },
      lines: [
        { who: 'a', text: 'leaving in *10.* that is a WARNING.', mood: 'happy', react: 'heart' },
        { who: 'b', text: "a warning?? *I'm framing it.*", mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Virgo, say | *good enough.*',
      prop: { type: 'list', title: "virgo's leaving list", items: [
        { text: 'reservation', at: 0.4, mark: 'check', markAt: 0.7 },
        { text: 'scarf', at: 0.8, mark: 'check', markAt: 1.1 },
        { text: 're-re-re-check reservation', at: 1.2, mark: 'strike', markAt: 'D0-0.4' },
      ] },
      lines: [
        { who: 'b', text: "it's… *good enough.* (it hurts.)", mood: 'squint', react: 'wide' },
        { who: 'a', text: 'who ARE you?? *iconic.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Race to | *plan the date.*',
      prop: { type: 'gauge', title: "virgo's plan", labels: ['start', 'done'], color: '#ef5c94', seq: [[0.3, 0], ['L0', 0.55], ['D0', 1]], verdict: { text: 'time: 4 minutes 12', at: 'D0+0.2' } },
      lines: [
        { who: 'b', text: 'planned. colour-coded. *laminated.*', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: 'laminated?? *in 4 minutes??*', mood: 'sparkle', react: 'heart' },
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

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Aries is in the car. | Virgo: *re-checking.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
