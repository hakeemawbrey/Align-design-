// og-nsse03: social rework (static HOOK, kit copy ../kit.js: no bug, no cold-open title, meter reads CLICK, no shake /
// booms / word pops, page at 0.86 scale inside the safe zones, ends on the last line; both signs pushed further). Was: nsse03 · SIGN × SIGN, Volume 2: "Taurus × Aquarius: the usual and the unusual." (28 s vertical, star_advice · music: synthwave · F#m)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse03', a: 'taurus', b: 'aquarius',
  wants: ['the usual table', 'a never-been place'],
  hook: 'Taurus × Aquarius: | *same table forever?*',
  moods: { a0: 'happy', b0: 'sparkle' },
  open: [
    { who: 'a', text: 'same table. same pasta. *same fork.*', mood: 'happy', react: 'squint' },
    { who: 'b', text: 'or a dinner where *everything is blue?*', mood: 'sparkle', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aquarius, keep | *one tradition.*',
      prop: { type: 'calendar', title: 'EVERY WEEK', cells: [{ d: 'mon', text: 'blue food?' }, { d: 'tue', text: 'new place' }, { d: 'wed', text: 'pop-up' }, { d: 'thu', text: 'mystery' }, { d: 'fri' }, { d: 'sat', text: 'surprise' }], hl: { i: 4, at: 'L0', text: 'the usual' } },
      lines: [
        { who: 'b', text: 'fine. friday is *the usual.*', mood: 'squint', react: 'heart' },
        { who: 'a', text: 'same table? *same fork?* yes.', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Taurus, try | *one new thing.*',
      prop: { type: 'scale', left: 'the usual', right: 'blue soup', seq: [[0, -1], ['L0', -0.4], ['D0', 0.2]], wobble: true, verdict: { text: 'verdict: actually good', at: 'D0+0.2' } },
      lines: [
        { who: 'a', text: 'the blue soup is… *actually good?*', mood: 'wide', react: 'sparkle' },
        { who: 'b', text: "write that *down.* I'm framing it.", mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Make a | *new tradition.*',
      prop: { type: 'note', lines: [
        { text: 'first snow:', at: 0.5 },
        { text: 'blue soup night', at: 'L0', color: '#2f6fd6' },
        { text: '(forever)', at: 'L1', size: 38 },
      ] },
      lines: [
        { who: 'b', text: 'first snow: *blue soup night.*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'every year. *non-negotiable.*', mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Weird, | *on repeat.*',
  music: { style: 'synthwave', key: 'F#m', seed: 3503 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }

export const HOOK = 'Taurus: same pasta. | Aquarius: *blue soup.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = Math.max(2.6, F.B[1].S - 0.15)
