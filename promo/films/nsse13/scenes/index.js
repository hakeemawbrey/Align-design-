// nsse13 · SIGN × SIGN, Volume 2: "Scorpio × Aquarius: the vault and the open door." (30 s vertical, star_advice · music: screwed · Fm)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse13', a: 'scorpio', b: 'aquarius',
  wants: ['to keep it private', 'to tell the whole group'],
  hook: 'Scorpio × Aquarius: | *you told the group?*',
  moods: { a0: 'wide', b0: 'sparkle' },
  open: [
    { who: 'b', text: "I told the group we're *dating!* hi!", mood: 'sparkle', react: 'wide' },
    { who: 'a', text: 'you told… *the group?*', mood: 'wide', react: 'wide' },
  ],
  tips: [
    {
      head: 'Aquarius, ask | *before you share.*',
      prop: { type: 'phone', title: '♏︎ scorpio', msgs: [
        { side: 'R', text: 'can I tell the group about us?', at: 'L0' },
        { side: 'L', text: 'yes. thank you for asking', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'can I share our news? *just asking.*', mood: 'neutral', react: 'heart' },
        { who: 'a', text: 'yes. *thank you for asking.*', mood: 'heart', react: 'sparkle' },
      ],
    },
    {
      head: 'Scorpio, share one | *small secret.*',
      prop: { type: 'note', color: '#e6d3ff', lines: [
        { text: 'top secret:', at: 0.4 },
        { text: 'I sing to', at: 'L0' },
        { text: 'my plants', at: 'L0+0.6' },
      ] },
      lines: [
        { who: 'a', text: 'I sing… *to my plants.*', mood: 'squint', react: 'sparkle' },
        { who: 'b', text: "that's *amazing.* I'm honoured.", mood: 'heart', react: 'happy' },
      ],
    },
    {
      head: 'Keep one | *just for two.*',
      prop: { type: 'list', title: 'who gets to know', items: [
        { text: 'the group: we\'re dating', at: 0.4, mark: 'check', markAt: 0.7 },
        { text: 'just us: the plant concerts', at: 'L0', mark: 'check', markAt: 'D0', color: '#c8344c' },
      ] },
      lines: [
        { who: 'b', text: 'our secret: *plant concerts.*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'nobody else gets *a ticket.*', mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Two seats. | *Sold out.*',
  music: { style: 'screwed', key: 'Fm', seed: 3513 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
