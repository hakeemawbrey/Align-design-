// nsse14 · SIGN × SIGN, Volume 2: "Libra × Taurus: two Venus signs, one dessert." (30 s vertical, star_advice · music: jazzy · F)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse14', a: 'libra', b: 'taurus',
  wants: ['the prettiest place', 'the tastiest plate'],
  hook: 'Libra × Taurus: | *same planet, two forks.*',
  figNote: 'field note: both signs are ruled by Venus',
  moods: { a0: 'sparkle', b0: 'happy' },
  open: [
    { who: 'a', text: 'we\'re both Venus signs. *so we agree?*', mood: 'sparkle', react: 'squint' },
    { who: 'b', text: 'we agree on *dessert.* only dessert.', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      head: 'Libra, *decide.* | Even small.',
      prop: { type: 'scale', left: 'the booth', right: 'the window', seq: [[0, 0.5], [0.6, -0.5], [1.1, 0.4], ['D0-0.3', -1]], verdict: { text: 'decided: the corner booth', at: 'D0' } },
      lines: [
        { who: 'a', text: 'the corner booth. *decided.*', mood: 'squint', react: 'heart' },
        { who: 'b', text: 'a decision! *I\'m so proud.*', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Taurus, share | *the last bite.*',
      prop: { type: 'gauge', title: 'the last bite: whose?', labels: ['taurus', 'libra'], color: '#e9b24a', seq: [[0.3, 0.05], ['L0', 0.5], ['D0', 1]] },
      lines: [
        { who: 'b', text: "the last bite. *it's yours.*", mood: 'wide', react: 'heart' },
        { who: 'a', text: 'the most *romantic* thing ever.', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Order | *two desserts.*',
      prop: { type: 'list', title: "tonight's order", items: [
        { text: 'dessert one', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: 'dessert two', at: 0.7, mark: 'check', markAt: 'L0' },
        { text: 'debates: zero', at: 'D0', mark: 'check', markAt: 'D0+0.3' },
      ] },
      lines: [
        { who: 'a', text: 'two desserts. *no debate.*', mood: 'sparkle', react: 'heart' },
        { who: 'b', text: 'Venus would be *so proud.*', mood: 'happy', react: 'sparkle' },
      ],
    },
  ],
  last: 'Sweet and | *settled.*',
  music: { style: 'jazzy', key: 'F', seed: 3514 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
