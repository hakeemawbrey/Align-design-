// kxsse06 · SIGN × SIGN: EXTENDED, ep 6: "Aquarius × Pisces: 2 a.m. feelings." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "It’s 2 a.m. | *Let’s talk feelings.*"  Pisces mid-sob (a specimen, crying), Aquarius mid-yawn.
//   1 meet    stargazing on the same rooftop; Pisces cries at a satellite (note)
//   2 clash   Pisces wants feelings at 2 a.m.; Aquarius answers with a theory (gauge)
//   3 tip A   Aquarius: listen first, theories later (card)
//   4 tip B   Pisces: lead with the one-sentence version (note)
//   5 ↻       the 2 a.m. rule: one feeling each, then sleep; the big talk at breakfast (clock)
//   6 verdict HEARD · last line "One feeling each. | *Then sleep.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse06', a: 'aquarius', b: 'pisces', duration: 90,
  wants: ['a good theory', 'to be held (and heard)'],
  hook: 'It’s 2 a.m. | *Let’s talk feelings.*',
  premise: 'me at 2 a.m., *feeling everything.*',
  caught: { x: 818, y: 930, r: 170, label: 'WIDE AWAKE', arrow: 'tl' },
  moods: { a0: 'squint', b0: 'wide' },
  open: [
    { who: 'b', text: 'are you awake? I have *a feeling.*', mood: 'wide', react: 'squint' },
    { who: 'a', text: 'I have *a theory* about that.', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'The rooftop, | *in June.*',
      prop: { type: 'note', color: '#cfe6ff', lines: [
        { text: 'the roof, 1 a.m.', at: 0.5 },
        { text: 'one satellite', at: 'L0' },
        { text: 'one Pisces, crying', at: 'L1', color: '#2f6fd6' },
      ] },
      lines: [
        { who: 'b', text: 'a star! it’s *moving!* I’m crying!', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'that’s a satellite. *still beautiful.*', mood: 'happy', react: 'heart' },
        { who: 'b', text: 'you said beautiful. *more crying.*', mood: 'heart', react: 'sparkle' },
        { who: 'a', text: 'same roof *tomorrow?*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Feelings vs. | *theories.*',
      prop: { type: 'gauge', title: 'the 2 a.m. gauge', labels: ['feelings', 'theories'], color: '#8a7cf0', seq: [[0.3, 0.2], ['L1', 0.9], ['L3', 0.3]], verdict: { text: 'nobody feels heard', at: 'D3' } },
      lines: [
        { who: 'b', text: 'I feel like nobody *gets* me.', mood: 'wide', react: 'neutral' },
        { who: 'a', text: 'statistically, *someone* must.', mood: 'sparkle', react: 'wide' },
        { who: 'b', text: 'I didn’t want a fix. *I wanted you.*', mood: 'wide', react: 'squint' },
        { who: 'a', text: 'and I’m so tired I *can’t think.*', mood: 'squint', react: 'neutral' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Aquarius: listen | *first.*',
      prop: { type: 'card', q: 'That sounds hard. Tell me more?', caption: { text: 'theories: later', at: 'D0' } },
      lines: [
        { who: 'a', text: 'that sounds hard. *tell me more?*', mood: 'heart', react: 'wide' },
        { who: 'b', text: 'you… asked? *no theory?*', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'theory later. *you first.*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Pisces: the | *one-line version.*',
      prop: { type: 'note', lines: [
        { text: 'the 40-minute version', at: 0.4, strike: 1.0 },
        { text: '“I felt lonely', at: 'L0' },
        { text: 'today.”', at: 'L0+0.4', check: 'D0' },
      ] },
      lines: [
        { who: 'b', text: 'short version: *I felt lonely today.*', mood: 'neutral', react: 'wide' },
        { who: 'a', text: 'thank you. that I can *hold.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'the long version is *saved for later.*', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'The 2 a.m. | *rule.*',
      prop: { type: 'clock', digital: true, frames: [{ at: 0, text: '2:00' }, { at: 'L1', text: '2:10' }, { at: 'L2', text: '8:30' }, { at: 'L3', text: '8:31' }], label: 'one feeling each. then sleep.', labelAt: 'L0+0.3' },
      lines: [
        { who: 'a', text: 'at 2 a.m.: *one feeling each.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'then sleep. *no spiralling.*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'the big talk at *breakfast.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'with pancakes. I’m *crying again.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  verdict: 'HEARD',
  last: 'One feeling each. | *Then sleep.*',
  music: { style: 'dreamy', key: 'Ab', seed: 4676 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
