// og-nsse09: social rework of nsse09 (OG-REWORK.md). Same notebook, cast and story; static HOOK (box) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse09 · SIGN × SIGN, Volume 2: "Aries × Pisces: the sprint and the daydream." (28 s vertical, star_advice · music: house · G)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse09', a: 'aries', b: 'pisces',
  wants: ['to win. everything.', 'to wander'],
  hook: 'Aries × Pisces: | *first one there wins!*',
  moods: { a0: 'sparkle', b0: 'wide' },
  open: [
    { who: 'a', text: 'first to the market *wins!* GO!', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'a *snowflake* hit me. (sobbing)', mood: 'wide', react: 'squint' },
  ],
  tips: [
    {
      head: 'Aries, *walk.* | Don\'t sprint.',
      prop: { type: 'map', mode: 'wander', from: 'here', to: 'the market', run: [0.4, 'D1'], alt: { run: [0.3, 0.9], label: 'the sprint' }, note: { text: 'the scenic route', at: 'L1' } },
      lines: [
        { who: 'a', text: 'fine. walking. *aggressively slowly.*', mood: 'squint', react: 'happy' },
        { who: 'b', text: 'look, *the lights!* (sobbing)', mood: 'sparkle', react: 'sparkle' },
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
        { who: 'a', text: 'thanks for *telling me!* (4:58.)', mood: 'happy', react: 'heart' },
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
        { who: 'a', text: 'I noticed the snow *FIRST!* I WIN!', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'you *noticed* the snow! (sobbing)', mood: 'happy', react: 'heart' },
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

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Aries made a race. | Pisces: *snowflake!!*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
