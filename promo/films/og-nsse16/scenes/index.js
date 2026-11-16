// og-nsse16: social rework of nsse16 (SIGN × SIGN, Volume 2: "Pisces × Sagittarius: the dream and the dare."). Static HOOK
// (outline) 0–3.6 replaces the animated cold-open headline; no series bug / FIELD GUIDE label / end card; crazier lines.
// Same notebook page, the same two stars, props and payoff; the look lives in ../ssekit.js (og copy of ../../nsse01/kit.js).
//   0.0   frame 0: the notebook page, ♓ Pisces (crying) and ♐ Sagittarius mid-hop. HOOK up until 3.6.
//   0.5   Pisces dreamed about the sea and is crying; Sag already packed the car.
//   TIP 1 the map: tomorrow → someday (Sag is vibrating).   TIP 2 the phone: reassurance (and a kayak).
//   TIP 3 ↻ the calendar: one dream a year, "see the sea". The needle sweeps to ALIGN.
//   last  "Dream big. *Start small.*" both stars in fig. 3, hearts; holds to the end.
import { makeFilm, STORY_END as SE } from '../ssekit.js'

export const HOOK = 'Pisces had a dream. | *Sag packed the car.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.6

const F = makeFilm({
  id: 'og-nsse16', a: 'pisces', b: 'sagittarius',
  wants: ['to dream it, crying', 'to do it in 5 minutes'],
  hook: '',
  figNote: 'field note: both share Jupiter as a traditional ruler',
  moods: { a0: 'sparkle', b0: 'sparkle' },
  open: [
    { who: 'a', text: 'I dreamed about *the sea.* I\'m crying.', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: "car's packed. *we leave in 5.*", mood: 'sparkle', react: 'wide' },
  ],
  tips: [
    {
      head: 'Sag, *slow down* | the dare.',
      prop: { type: 'map', from: 'tonight', to: 'someday', run: [0.4, 'D1'], note: { text: 'no rush. (sag is vibrating)', at: 'D0' } },
      lines: [
        { who: 'b', text: 'ok. not tonight. *someday?* soon-day?', mood: 'neutral', react: 'happy' },
        { who: 'a', text: 'someday is *perfect.*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Pisces, *say* | what you need.',
      prop: { type: 'phone', title: '♐︎ sagittarius', msgs: [
        { side: 'R', text: 'I need a little reassurance tonight', at: 'L0' },
        { side: 'L', text: 'you have it. a lot of it. also a kayak.', at: 'L1' },
      ] },
      lines: [
        { who: 'a', text: 'I need a little *reassurance.*', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'you have it. *I also bought a kayak.*', mood: 'happy', react: 'happy' },
      ],
    },
    {
      head: 'Plan *one* dream | a year.',
      prop: { type: 'calendar', title: 'THIS YEAR', cells: [{ d: 'jan' }, { d: 'apr' }, { d: 'jun' }, { d: 'aug' }, { d: 'oct' }, { d: 'dec' }], hl: { i: 3, at: 'L0', text: 'see the sea', size: 30 } },
      lines: [
        { who: 'b', text: 'this year: *see the sea.* just once.', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: "I'm crying. *the good way.* mostly.", mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Dream big. | *Start small.*',
  music: { style: 'dreamy', key: 'Db', seed: 3516 },
})
export const DURATION = F.DURATION
export const STORY_END = SE
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
