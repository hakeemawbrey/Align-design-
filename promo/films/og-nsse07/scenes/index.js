// og-nsse07: social rework of nsse07 (OG-REWORK.md). Same notebook, cast and story; static HOOK (box) from frame 0
// instead of the animated cold-open headline; social kit copy ../kit.js; crazier lines. Was: nsse07 · SIGN × SIGN, Volume 2: "Leo × Pisces: the speech and the tears." (28 s vertical, star_advice · music: cinematic · Gm)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../kit.js'

const F = makeFilm({
  id: 'og-nsse07', a: 'leo', b: 'pisces',
  wants: ['an audience (huge)', 'to be held'],
  hook: 'Leo × Pisces: | *the 12-page toast.*',
  moods: { a0: 'sparkle', b0: 'happy' },
  open: [
    { who: 'a', text: 'a *short* speech. (12 pages. laminated.)', mood: 'sparkle', react: 'happy' },
    { who: 'b', text: "page one and I'm *sobbing.* go on.", mood: 'happy', react: 'heart' },
  ],
  tips: [
    {
      head: 'Leo, ask how | *they feel.*',
      prop: { type: 'card', q: 'How are you, really?', caption: { text: 'page 13: a question', at: 'D0' } },
      lines: [
        { who: 'a', text: 'how are *you* feeling? (page 13.)', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'nobody *asks me that!* (sobbing)', mood: 'wide', react: 'sparkle' },
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
        { who: 'b', text: 'you were *wonderful.* (sobbing) truly.', mood: 'happy', react: 'heart' },
        { who: 'a', text: "I'm *engraving* that sentence.", mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Let them cry | *at the speech.*',
      prop: { type: 'gauge', title: 'the tears gauge', labels: ['dry', 'full'], seq: [[0.3, 0.4], ['L0', 0.9], ['D0', 1.2]], verdict: { text: 'status: overflowing', at: 'D0+0.1' } },
      lines: [
        { who: 'a', text: 'a *standing ovation* of tears! for ME!', mood: 'sparkle', react: 'happy' },
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

// social hook: static caption from frame 0 (the kit's animated cold-open headline is off in ../kit.js)
export const HOOK = 'Leo wrote a toast. | *12 pages.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +Math.min(3.5, F.B[1].S - 0.1).toFixed(2)
