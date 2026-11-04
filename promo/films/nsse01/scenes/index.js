// nsse01 · SIGN × SIGN, Volume 2, ep 1: "Leo × Capricorn: the spotlight and the schedule." (28 s vertical, star_advice)
// Engine + look: ../kit.js (shared by nsse01–16). Rows: promo/films/next30/b35.md.
//   cold open  "Leo × Capricorn: | the *holiday party.*"  LEO arrives at 8:40; CAP leaves at 9:00. Needle slams to PUSH.
//   TIP 1      "Capricorn, say it | *out loud.*"  checklist: thought it ✗ / said it ✓. "your coat is… excellent."
//   TIP 2      "Leo, respect | *the calendar.*"   calendar, 9:00 home circled. "fine. 9:00. but I'm waving on the way out."
//   TIP 3 ↻    "Schedule *the spotlight.*"         clock, 8:45–8:55 LEO'S MOMENT wedge. Needle sweeps to ALIGN.
//   last line  "Booked. | *Beloved.*"  (fig. 3 · both)
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'nsse01', a: 'leo', b: 'capricorn',
  wants: ['to be seen', 'to leave by 9'],
  hook: 'Leo × Capricorn: | the *holiday party.*',
  moods: { a0: 'sparkle', b0: 'squint' },
  open: [
    { who: 'a', text: "the party's at 8. I arrive *at 8:40.*", mood: 'sparkle', react: 'squint' },
    { who: 'b', text: "I leave at *9:00.* it's in the calendar.", mood: 'neutral', react: 'wide' },
  ],
  tips: [
    {
      head: 'Capricorn, say it | *out loud.*',
      prop: { type: 'list', title: "capricorn's compliments", items: [
        { text: 'thought it: nice coat', at: 0.5, mark: 'cross', markAt: 1.1 },
        { text: 'SAID it: nice coat!', at: 'L0', mark: 'check', markAt: 'D0' },
      ] },
      lines: [
        { who: 'b', text: 'your coat is… *excellent.*', mood: 'neutral', react: 'sparkle' },
        { who: 'a', text: 'say it again. *slower.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Leo, respect | *the calendar.*',
      prop: { type: 'calendar', title: 'FRIDAY NIGHT', cells: [{ d: '7:00' }, { d: '8:00', text: 'party' }, { d: '8:40', text: 'leo arrives' }, { d: '9:00' }, { d: '9:30' }, { d: '10:00', text: 'asleep' }], hl: { i: 3, at: 0.7, text: 'home ♥' } },
      lines: [
        { who: 'a', text: "fine. 9:00. but I'm *waving* out.", mood: 'squint', react: 'happy' },
        { who: 'b', text: 'wave all you like. *8:59.*', mood: 'happy', react: 'wide' },
      ],
    },
    {
      head: 'Schedule | *the spotlight.*',
      prop: { type: 'clock', from: 8 * 60 + 40, to: 8 * 60 + 55, run: [0.5, 'D0'], wedge: [45, 55], wedgeAt: 'L0', label: "8:45–8:55: LEO'S MOMENT", labelAt: 'L0+0.3' },
      lines: [
        { who: 'b', text: "8:45 to 8:55: *Leo's moment.*", mood: 'happy', react: 'heart' },
        { who: 'a', text: 'ten whole minutes? *honoured.*', mood: 'sparkle', react: 'happy' },
      ],
    },
  ],
  last: 'Booked. | *Beloved.*',
  music: { style: 'funk', key: 'Em', seed: 3501 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
