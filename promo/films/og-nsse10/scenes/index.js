// og-nsse10: social rework of nsse10 (OG-REWORK.md). Same notebook, cast and story; static HOOK (outline) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse10 · SIGN × SIGN, Volume 2: "Aries × Taurus: the spark and the slow burn." (28 s vertical, star_advice · music: lofi · Bb)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse10', a: 'aries', b: 'taurus',
  wants: ['dessert first. now.', 'four slow courses'],
  hook: 'Aries × Taurus: | *dinner in 4 minutes?*',
  moods: { a0: 'sparkle', b0: 'happy' },
  open: [
    { who: 'a', text: "ate! paid! *what's next?*", mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'still *smelling* the bread. art.', mood: 'happy', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aries, stay | *for dessert.*',
      prop: { type: 'clock', from: 7 * 60, to: 9 * 60, run: [0.4, 'D1'], label: 'dinner: two whole hours', labelAt: 'L0' },
      lines: [
        { who: 'a', text: "I'm staying. *seated. vibrating.*", mood: 'squint', react: 'heart' },
        { who: 'b', text: "you're *sitting!* a miracle.", mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Taurus, say yes | *to one surprise.*',
      prop: { type: 'calendar', title: 'THIS WEEKEND', cells: [{ d: 'fri', text: 'dinner' }, { d: 'sat' }, { d: 'sun', text: 'nap' }, { d: 'mon' }, { d: 'tue' }, { d: 'wed' }], hl: { i: 1, at: 'L0', text: '???' } },
      lines: [
        { who: 'b', text: 'a surprise? …*ok.* (gulp)', mood: 'wide', react: 'sparkle' },
        { who: 'a', text: '*ice skating!* booked it. just now.', mood: 'sparkle', react: 'wide' },
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
        { who: 'b', text: 'skating: fine. *cocoa:* life.', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'nine laps, then *your bench.*', mood: 'sparkle', react: 'heart' },
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

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Aries: done eating. | Taurus: *on the bread.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
