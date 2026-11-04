// nsse10 · SIGN × SIGN, Volume 2: "Aries × Taurus: the spark and the slow burn." (30 s vertical, star_advice · music: lofi · Bb)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse10', a: 'aries', b: 'taurus',
  wants: ['dessert first', 'four slow courses'],
  hook: 'Aries × Taurus: | *dinner in 4 minutes?*',
  moods: { a0: 'sparkle', b0: 'happy' },
  open: [
    { who: 'a', text: 'ordered! ate! *what\'s next?*', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: "I'm still *smelling* the bread.", mood: 'happy', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aries, stay | *for dessert.*',
      prop: { type: 'clock', from: 7 * 60, to: 9 * 60, run: [0.4, 'D1'], label: 'dinner: two whole hours', labelAt: 'L0' },
      lines: [
        { who: 'a', text: "I'm staying. *seated. calm.*", mood: 'squint', react: 'heart' },
        { who: 'b', text: 'look at you. *sitting.*', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Taurus, say yes | *to one surprise.*',
      prop: { type: 'calendar', title: 'THIS WEEKEND', cells: [{ d: 'fri', text: 'dinner' }, { d: 'sat' }, { d: 'sun', text: 'nap' }, { d: 'mon' }, { d: 'tue' }, { d: 'wed' }], hl: { i: 1, at: 'L0', text: '???' } },
      lines: [
        { who: 'b', text: 'a surprise? …*ok. yes.*', mood: 'wide', react: 'sparkle' },
        { who: 'a', text: "it's *ice skating.* you'll love it.", mood: 'sparkle', react: 'wide' },
      ],
    },
    {
      head: 'Bring *the cocoa* | to the rink.',
      prop: { type: 'list', title: 'rink kit', items: [
        { text: 'skates (two pairs)', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: 'cocoa (warm)', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'bench breaks', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'b', text: 'skating\'s fine. *the cocoa* is perfect.', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'one more lap, then *your bench.*', mood: 'sparkle', react: 'heart' },
      ],
    },
  ],
  last: 'Fast laps. | *Slow cocoa.*',
  music: { style: 'lofi', key: 'Bb', seed: 3510 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
