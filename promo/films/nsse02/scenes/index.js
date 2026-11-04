// nsse02 · SIGN × SIGN, Volume 2: "Gemini × Cancer: the plans and the soup." (28 s vertical, star_advice · music: pop · D)
// Engine + look: ../../nsse01/kit.js (shared by nsse01–16): cold open, TIP 1, TIP 2, TIP 3 ↻ (needle sweeps to ALIGN),
// the last line, then the end card. Rows: promo/films/next30/b35.md. Every prop/line below is this episode's own.
import { makeFilm } from '../../nsse01/kit.js'

const F = makeFilm({
  id: 'nsse02', a: 'gemini', b: 'cancer',
  wants: ['six plans tonight', 'one night in'],
  hook: 'Gemini × Cancer: | *six plans, one soup.*',
  moods: { a0: 'sparkle', b0: 'wide' },
  open: [
    { who: 'a', text: 'first the market, then *two parties*—', mood: 'sparkle', react: 'wide' },
    { who: 'b', text: 'I made soup. *for two.*', mood: 'neutral', react: 'wide' },
  ],
  tips: [
    {
      head: 'Gemini, ask one thing. | *Hear the whole answer.*',
      prop: { type: 'clock', digital: true, frames: [{ at: 0, text: '0:00' }, { at: 'D0+0.2', text: '0:30' }, { at: 'D0+0.6', text: '1:15' }, { at: 'L1-0.2', text: '2:00' }], label: "gemini's listening timer", labelAt: 0.4 },
      lines: [
        { who: 'a', text: 'how was your day? *…and then?*', mood: 'neutral', react: 'heart' },
        { who: 'b', text: 'you *waited!* for all of it!', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      head: 'Cancer, say *I miss you.* | Don\'t hint it.',
      prop: { type: 'phone', title: '♊︎ gemini', msgs: [
        { side: 'R', text: 'the soup is getting cold I guess', at: 0.4, del: 1.5 },
        { side: 'R', text: 'I miss you. come over?', at: 'L0+0.3' },
        { side: 'L', text: 'on my way. no detours!!', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'I miss you. *that\'s the whole text.*', mood: 'happy', react: 'heart' },
        { who: 'a', text: 'on my way. *no detours.*', mood: 'sparkle', react: 'sparkle' },
      ],
    },
    {
      head: 'Bring the party | *home.*',
      prop: { type: 'list', title: "tonight, at cancer's", items: [
        { text: 'soup (a lot of it)', at: 0.5, mark: 'check', markAt: 0.9 },
        { text: 'friends: everyone', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'blankets: 11', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'a', text: 'I invited *everyone* to yours.', mood: 'sparkle', react: 'wide' },
        { who: 'b', text: 'good. I made *more soup.*', mood: 'happy', react: 'heart' },
      ],
    },
  ],
  last: 'Full house. | *Full heart.*',
  music: { style: 'pop', key: 'D', seed: 3502 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
