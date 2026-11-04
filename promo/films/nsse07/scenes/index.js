// nsse07 · SIGN × SIGN, Volume 2: "Leo × Pisces: the speech and the tears." (28 s vertical, star_advice · music: cinematic · Gm)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse07', a: 'leo', b: 'pisces',
  wants: ['an audience', 'to be held'],
  hook: 'Leo × Pisces: | *the 12-page toast.*',
  moods: { a0: 'sparkle', b0: 'happy' },
  open: [
    { who: 'a', text: 'a *short* speech. (12 pages)', mood: 'sparkle', react: 'happy' },
    { who: 'b', text: "I'm already *crying.* go on.", mood: 'happy', react: 'heart' },
  ],
  tips: [
    {
      head: 'Leo, ask how | *they feel.*',
      prop: { type: 'card', q: 'How are you, really?', caption: { text: 'page 13: a question', at: 'D0' } },
      lines: [
        { who: 'a', text: 'how are *you* feeling tonight?', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'nobody *asks me that!*', mood: 'wide', react: 'sparkle' },
      ],
    },
    {
      head: 'Pisces, tell Leo | *they did great.*',
      prop: { type: 'note', color: '#ffd1e0', lines: [
        { text: 'notes for leo:', at: 0.4 },
        { text: 'you were wonderful', at: 'L0', check: 'D0' },
        { text: '(truly)', at: 'D0+0.2', size: 38 },
      ] },
      lines: [
        { who: 'b', text: 'you were *wonderful.* truly.', mood: 'happy', react: 'heart' },
        { who: 'a', text: "I'm *framing* that sentence.", mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Let them cry | *at the speech.*',
      prop: { type: 'gauge', title: 'the tears gauge', labels: ['dry', 'full'], seq: [[0.3, 0.4], ['L0', 0.9], ['D0', 1.2]], verdict: { text: 'status: overflowing', at: 'D0+0.1' } },
      lines: [
        { who: 'a', text: 'a *standing ovation* of tears!', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: "best review *you'll ever get.*", mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Applause, | *with tissues.*',
  music: { style: 'cinematic', key: 'Gm', seed: 3507 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
