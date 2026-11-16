// og-nsse14: social rework of nsse14 (SIGN × SIGN, Volume 2: "Libra × Taurus: two Venus signs, one dessert."). Static HOOK
// (outline) 0–3.6 replaces the animated cold-open headline; no series bug / FIELD GUIDE label / end card; crazier lines.
// Same notebook page, the same two stars, props and payoff; the look lives in ../ssekit.js (og copy of ../../nsse01/kit.js).
//   0.0   frame 0: the notebook page, ♎ Libra and ♉ Taurus mid-hop, Pisces crying in the corner. HOOK up until 3.6.
//   0.5   Libra: "we're both Venus. *we agree on everything.*"  Taurus: "touch my dessert and *we're enemies.*"
//   5.9   TIP 1: the scale tips booth / window / booth / window… Libra finally decides (after asking the waiter twice).
//  11.4   TIP 2: the last-bite gauge creeps to Libra; Taurus gives it up, visibly in pain.
//  16.8   TIP 3 ↻: the order: dessert one, dessert two, and a third one "just in case". The needle sweeps to ALIGN.
//  23.0   last line: "Sweet and *settled.*" both stars in fig. 3, hearts; holds to the end.
import { makeFilm, STORY_END as SE } from '../ssekit.js'

export const HOOK = 'Never split dessert | *with a Taurus.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.6

const F = makeFilm({
  id: 'og-nsse14', a: 'libra', b: 'taurus',
  wants: ['the prettiest booth', 'every single bite'],
  hook: '',
  figNote: 'field note: both signs are ruled by Venus',
  moods: { a0: 'sparkle', b0: 'squint' },
  open: [
    { who: 'a', text: 'both Venus. *we agree on everything.*', mood: 'sparkle', react: 'squint' },
    { who: 'b', text: 'touch my dessert and *we\'re enemies.*', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      head: 'Libra, *decide.* | Anything. Please.',
      prop: { type: 'scale', left: 'the booth', right: 'the window', seq: [[0, 0.5], [0.6, -0.5], [1.1, 0.4], ['D0-0.3', -1]], verdict: { text: 'decided. (asked the waiter twice)', at: 'D0' } },
      lines: [
        { who: 'a', text: 'the booth. *final answer.* maybe.', mood: 'squint', react: 'heart' },
        { who: 'b', text: 'a decision! *call the newspapers.*', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Taurus, share | *the last bite.*',
      prop: { type: 'gauge', title: 'the last bite: guarded', labels: ['taurus', 'libra'], color: '#e9b24a', seq: [[0.3, 0.05], ['L0', 0.5], ['D0', 1]] },
      lines: [
        { who: 'b', text: "the last bite. *it's yours.* it hurts.", mood: 'wide', react: 'heart' },
        { who: 'a', text: 'Taurus *shared?* I need to sit down.', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Order | *two desserts.*',
      prop: { type: 'list', title: "tonight's order", items: [
        { text: 'dessert one', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: 'dessert two', at: 0.7, mark: 'check', markAt: 'L0' },
        { text: 'dessert three (just in case)', at: 'D0', mark: 'check', markAt: 'D0+0.3' },
      ] },
      lines: [
        { who: 'a', text: 'two desserts. *zero debates.*', mood: 'sparkle', react: 'heart' },
        { who: 'b', text: 'I ordered *three.* for safety.', mood: 'happy', react: 'sparkle' },
      ],
    },
  ],
  last: 'Sweet and | *settled.*',
  music: { style: 'jazzy', key: 'F', seed: 3514 },
})
export const DURATION = F.DURATION
export const STORY_END = SE
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
