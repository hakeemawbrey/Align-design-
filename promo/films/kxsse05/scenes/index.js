// kxsse05 · SIGN × SIGN: EXTENDED, ep 5: "Virgo × Capricorn: date night, rescheduled." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "Date night: | *rescheduled. Again.*"  both stars on laptops; freeze frame + caught on the calendar.
//   1 meet    two people working late in an empty café; both reach for the last outlet (list)
//   2 clash   both always busy; dates get moved; both say "I'm fine, just busy" (calendar)
//   3 tip A   Virgo: say "I'm tired" out loud instead of fixing everything (note)
//   4 tip B   Capricorn: a slow walk counts as a plan (map)
//   5 ↻       one talk card, no work words allowed (card)
//   6 verdict OFF THE CLOCK · last line "Off the clock. | *On us.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse05', a: 'virgo', b: 'capricorn', duration: 90,
  wants: ['everything just right', 'everything done'],
  hook: 'Date night: | *rescheduled. Again.*',
  premise: 'us, too busy *to be in love.*',
  caught: { x: 540, y: 930, r: 330, ry: 200, label: 'MOVED × 4', arrow: 'tr' },
  moods: { a0: 'squint', b0: 'wide' },
  open: [
    { who: 'a', text: 'can we move friday? *one more deadline.*', mood: 'squint', react: 'neutral' },
    { who: 'b', text: 'sure. I moved *thursday* already.', mood: 'neutral', react: 'squint' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'The café, | *11 pm.*',
      prop: { type: 'list', title: 'the late-night café', items: [
        { text: 'two laptops, one outlet', at: 0.5 },
        { text: 'two hands reach', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'one shared extension cord', at: 'L2', mark: 'check', markAt: 'D2' },
      ] },
      lines: [
        { who: 'a', text: 'oh. sorry. *the last outlet.*', mood: 'wide', react: 'wide' },
        { who: 'b', text: 'I have an extension cord. *always.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'you carry a spare? *marry me.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'coffee first. *it’s on the plan.*', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      stamp: 'CLASH', head: '“Fine. | *Just busy.*”',
      prop: { type: 'calendar', title: 'THIS MONTH', cells: [{ d: 'fri', text: 'moved' }, { d: 'sat', text: 'work' }, { d: 'sun', text: 'moved' }, { d: 'fri', text: 'moved' }, { d: 'sat', text: 'work' }, { d: 'sun' }], hl: { i: 5, at: 'L3', text: '???', size: 32 } },
      lines: [
        { who: 'a', text: 'how are you? *fine. just busy.*', mood: 'neutral', react: 'neutral' },
        { who: 'b', text: 'same. *fine. just busy.*', mood: 'neutral', react: 'neutral' },
        { who: 'a', text: '(I miss you and I’m *so tired.*)', mood: 'squint', react: 'neutral' },
        { who: 'b', text: '(same. *also tired.*)', mood: 'squint', react: 'squint' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Virgo: say | *“I’m tired.”*',
      prop: { type: 'note', lines: [
        { text: '“fine, just busy”', at: 0.4, strike: 1.0 },
        { text: '“I’m tired.', at: 'L0' },
        { text: 'I miss us.”', at: 'L0+0.5', check: 'D0' },
      ] },
      lines: [
        { who: 'a', text: 'honestly? I’m tired. *I miss us.*', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'you’re allowed to be tired. *come here.*', mood: 'heart', react: 'heart' },
        { who: 'a', text: 'I don’t have to *fix it* first?', mood: 'wide', react: 'happy' },
        { who: 'b', text: 'no. just *tell me.*', mood: 'happy', react: 'sparkle' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Cap: a walk | *is a plan.*',
      prop: { type: 'map', mode: 'wander', from: 'front door', to: 'the lit-up street', run: [0.4, 'D1'], note: { text: '20 minutes. no laptops.', at: 'L1' } },
      lines: [
        { who: 'b', text: 'a twenty-minute walk. *that’s the date.*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'no booking? *no spreadsheet?*', mood: 'wide', react: 'happy' },
        { who: 'b', text: 'just us and *the lights.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'No work | *words.*',
      prop: { type: 'card', q: 'What did you love doing when you were nine?', caption: { text: 'rule: no work words', at: 'L0' } },
      lines: [
        { who: 'a', text: 'one talk card. *no work words.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'at nine I built *snow forts.* huge ones.', mood: 'sparkle', react: 'heart' },
        { who: 'a', text: 'I labelled every *snowball.*', mood: 'heart', react: 'happy' },
        { who: 'b', text: 'of course you did. *I love that.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  verdict: 'OFF THE CLOCK',
  last: 'Off the clock. | *On us.*',
  music: { style: 'jazzy', key: 'Bb', seed: 4675 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
