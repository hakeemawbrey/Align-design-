// nsse11 · SIGN × SIGN, Volume 2: "Aquarius × Cancer: the theory and the feeling." (30 s vertical, star_advice · music: synthwave · Am)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse11', a: 'aquarius', b: 'cancer',
  colors: { b: '#4f7ff2' },          // Cancer's wheel blue is nearly Aquarius's: a deeper water-blue keeps the two apart
  wants: ['to explain feelings', 'to feel them'],
  hook: 'Aquarius × Cancer: | *a theory of feelings.*',
  moods: { a0: 'sparkle', b0: 'neutral' },
  open: [
    { who: 'a', text: 'I have a *theory* about our feelings.', mood: 'sparkle', react: 'squint' },
    { who: 'b', text: 'or you could just… *have one?*', mood: 'squint', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aquarius, say the feeling, | *not the theory.*',
      prop: { type: 'list', title: "aquarius's drafts", items: [
        { text: 'love is a social construct', at: 0.4, mark: 'strike', markAt: 1.0 },
        { text: 'I like you. a lot.', at: 'L0', mark: 'check', markAt: 'D0' },
      ] },
      lines: [
        { who: 'a', text: 'I like you. *a lot.* that\'s it.', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'that was *perfect.*', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Cancer, space isn\'t | *a goodbye.*',
      prop: { type: 'calendar', title: 'THIS WEEK', cells: [{ d: 'mon', text: 'dinner' }, { d: 'tue' }, { d: 'wed', text: 'stories' }, { d: 'thu', text: 'movie' }, { d: 'fri', text: 'friends' }, { d: 'sat', text: 'us' }], hl: { i: 1, at: 'L0', text: 'night off ♥', size: 30 } },
      lines: [
        { who: 'b', text: 'your night off? *enjoy it.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'back wednesday. *with stories.*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Build it | *together.*',
      prop: { type: 'note', color: '#cfe6ff', lines: [
        { text: 'THE HUG MACHINE v1', at: 0.4, strike: 'L1' },
        { text: 'gears, levers, a fan', at: 0.8, size: 34, strike: 'L1+0.3' },
        { text: 'v2: just hug', at: 'D1', color: '#c8344c' },
      ] },
      lines: [
        { who: 'a', text: 'I invented *a hug machine.*', mood: 'sparkle', react: 'wide' },
        { who: 'b', text: 'or… *a hug?*', mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Prototype: | *one hug.*',
  music: { style: 'synthwave', key: 'Am', seed: 3511 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
