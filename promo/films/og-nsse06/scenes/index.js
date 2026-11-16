// og-nsse06: social rework of nsse06 (OG-REWORK.md). Same notebook, cast and story; static HOOK (outline) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse06 · SIGN × SIGN, Volume 2: "Cancer × Sagittarius: the nest and the map." (28 s vertical, star_advice · music: dreamy · Ab)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse06', a: 'cancer', b: 'sagittarius',
  wants: ['home, warm, forever', 'the next nine trips'],
  hook: 'Cancer × Sagittarius: | *couch or cabin?*',
  moods: { a0: 'happy', b0: 'sparkle' },
  open: [
    { who: 'b', text: 'new plan: *a cabin! tonight!*', mood: 'sparkle', react: 'wide' },
    { who: 'a', text: 'or… our *couch?* it has my blanket.', mood: 'neutral', react: 'squint' },
  ],
  tips: [
    {
      head: 'Sag, call | *from the road.*',
      prop: { type: 'phone', title: '♐︎ sagittarius', msgs: [
        { side: 'L', text: 'made it! the view is wild', at: 0.5 },
        { side: 'L', text: 'miss you already', at: 'L0+0.4' },
        { side: 'R', text: 'you called!!', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'made it! *homesick for you already.*', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'you *called!* I made soup.', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Cancer, come on | *one trip.*',
      prop: { type: 'map', from: 'home', to: 'the cabin', run: [0.4, 'D1'], note: { text: 'one trip. both of us.', at: 'D0' } },
      lines: [
        { who: 'a', text: "one trip. *I'm packing nine snacks.*", mood: 'squint', react: 'sparkle' },
        { who: 'b', text: '*snack captain!* best co-pilot.', mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Pack home | *in the car.*',
      prop: { type: 'list', title: 'the packing list', items: [
        { text: 'the big blanket', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: '11 pillows', at: 0.7, mark: 'check', markAt: 0.9 },
        { text: 'the whole couch?', at: 'L0', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'b', text: 'is that… *the whole couch?*', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'home is *portable* now. it fits.', mood: 'sparkle', react: 'heart' },
      ],
    },
  ],
  last: 'Home goes | *with us.*',
  music: { style: 'dreamy', key: 'Ab', seed: 3506 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Sag: mountain trip. | Cancer: *our couch?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
