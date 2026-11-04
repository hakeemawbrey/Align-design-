// nsse09 · SIGN × SIGN, Volume 2: "Aries × Pisces: the sprint and the daydream." (28 s vertical, star_advice · music: house · G)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse09', a: 'aries', b: 'pisces',
  wants: ['to win', 'to wander'],
  hook: 'Aries × Pisces: | *first one there wins!*',
  moods: { a0: 'sparkle', b0: 'wide' },
  open: [
    { who: 'a', text: 'first one to the market *wins!*', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'wait, a *snowflake* landed on me.', mood: 'wide', react: 'squint' },
  ],
  tips: [
    {
      head: 'Aries, *walk.* | Don\'t sprint.',
      prop: { type: 'map', mode: 'wander', from: 'here', to: 'the market', run: [0.4, 'D1'], alt: { run: [0.3, 0.9], label: 'the sprint' }, note: { text: 'the scenic route', at: 'L1' } },
      lines: [
        { who: 'a', text: 'fine. walking. *very slowly.*', mood: 'squint', react: 'happy' },
        { who: 'b', text: 'look, *the lights* are on!', mood: 'sparkle', react: 'sparkle' },
      ],
    },
    {
      head: 'Pisces, say | *where you drifted.*',
      prop: { type: 'phone', title: '♓︎ pisces', msgs: [
        { side: 'L', text: 'went to see the lights, back in 5!', at: 'L0' },
        { side: 'R', text: 'thanks for telling me!', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'back in five. *I saw lights!*', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'thanks for *telling me!*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Race to | *the slow part.*',
      prop: { type: 'note', lines: [
        { text: 'new race rules:', at: 0.4 },
        { text: 'first to notice', at: 0.8 },
        { text: 'the snow wins', at: 1.1, check: 'D0' },
      ] },
      lines: [
        { who: 'a', text: 'I noticed the snow *first!* I win!', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'you *noticed* the snow!', mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'First place: | *the view.*',
  music: { style: 'house', key: 'G', seed: 3509 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
