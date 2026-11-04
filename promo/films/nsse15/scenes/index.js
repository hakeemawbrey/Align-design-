// nsse15 · SIGN × SIGN, Volume 2: "Virgo × Leo: the helper and the headliner." (30 s vertical, star_advice · music: funk · Am)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse15', a: 'virgo', b: 'leo',
  wants: ['to help, quietly', 'credit, loudly'],
  hook: 'Virgo × Leo: | *who fixed my button?*',
  moods: { a0: 'squint', b0: 'sparkle' },
  open: [
    { who: 'b', text: 'who fixed my *coat button?*', mood: 'sparkle', react: 'wide' },
    { who: 'a', text: 'nobody. *it fixed itself.*', mood: 'squint', react: 'squint' },
  ],
  tips: [
    {
      head: 'Virgo, take | *the thank-you.*',
      prop: { type: 'note', lines: [
        { text: 'thank-you:', at: 0.4 },
        { text: 'received', at: 'L1', check: 'D1' },
        { text: '(it felt nice)', at: 'D1+0.2', size: 36 },
      ] },
      lines: [
        { who: 'b', text: 'THANK you! *the button!*', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: "…you're welcome. *that felt nice.*", mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Leo, notice | *the quiet stuff.*',
      prop: { type: 'list', title: "virgo's quiet list", items: [
        { text: 'fixed your button', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: 'refilled your tea', at: 0.8, mark: 'check', markAt: 1.0 },
        { text: "learned your aunt's name", at: 1.2, mark: 'check', markAt: 1.4 },
      ] },
      lines: [
        { who: 'b', text: 'you did *all of this?* quietly?', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'I *like* helping you.', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Give Virgo | *a spotlight.*',
      prop: { type: 'card', header: 'A TOAST', q: 'To my Virgo, who fixes everything quietly.', caption: { text: 'read out loud. on purpose.', at: 'D0' } },
      lines: [
        { who: 'b', text: 'a toast: *to my Virgo!*', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: 'too much. *keep going.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  last: 'Seen. Fixed. | *Adored.*',
  music: { style: 'funk', key: 'Am', seed: 3515 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
