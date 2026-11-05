// kxsse08 · SIGN × SIGN: EXTENDED, ep 8: "Scorpio × Pisces: scared to fall again." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "Both hurt before. | *Both terrified.*"  both stars mid-flinch; freeze frame + caught.
//   1 meet    a rainy bus stop; Pisces is crying at a song in its head; Scorpio offers a tissue (list)
//   2 clash   Scorpio goes quiet and guarded; Pisces says too much, too fast (gauge)
//   3 tip A   Scorpio: trust is built from small kept promises, never tests (list)
//   4 tip B   Pisces: let them know you slowly, a page at a time (note)
//   5 ↻       one small promise a week, kept (calendar)
//   6 verdict SAFE HERE · last line "Small promises. | *Kept.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse08', a: 'scorpio', b: 'pisces', duration: 90,
  wants: ['proof it’s safe', 'all of it, right now'],
  hook: 'Both hurt before. | *Both terrified.*',
  premise: 'us, falling *and panicking about it.*',
  caught: { x: 540, y: 930, r: 330, ry: 200, label: 'CATCHING FEELINGS', arrow: 'tr' },
  moods: { a0: 'wide', b0: 'wide' },
  open: [
    { who: 'a', text: 'I like you. that’s *the scary part.*', mood: 'wide', react: 'wide' },
    { who: 'b', text: 'me too. I’m crying *about it already.*', mood: 'wide', react: 'squint' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'The bus stop, | *in the rain.*',
      prop: { type: 'list', title: 'the bus stop, 6 pm', items: [
        { text: 'rain: a lot', at: 0.5 },
        { text: 'one Pisces, crying', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'one tissue, offered', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'b', text: 'sorry. a sad song is stuck *in my head.*', mood: 'wide', react: 'neutral' },
        { who: 'a', text: 'here. *a tissue.* I always carry two.', mood: 'happy', react: 'heart' },
        { who: 'b', text: 'what’s the second one *for?*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'for me. *same song.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Too quiet. | *Too much.*',
      prop: { type: 'gauge', title: 'the openness gauge', labels: ['vault', 'flood'], color: '#5c8fd6', seq: [[0.3, 0.1], ['L1', 1.15], ['L3', 0.5]], verdict: { text: 'nobody is comfy', at: 'D3' } },
      lines: [
        { who: 'a', text: 'me? fine. nothing. *next question.*', mood: 'squint', react: 'wide' },
        { who: 'b', text: 'my whole life story, *in one breath*…', mood: 'sparkle', react: 'squint' },
        { who: 'a', text: 'too fast. *I go quiet.*', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'and when you’re quiet, *I panic.*', mood: 'wide', react: 'neutral' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Scorpio: trust is | *kept promises.*',
      prop: { type: 'list', title: 'how trust is built', items: [
        { text: 'secret tests', at: 0.4, mark: 'cross', markAt: 0.9 },
        { text: '“I’ll call at 8” → calls', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'small things, kept', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'a', text: 'no tests. *I’ll just watch you show up.*', mood: 'neutral', react: 'happy' },
        { who: 'b', text: 'I said 8. I called *at 8.*', mood: 'sparkle', react: 'heart' },
        { who: 'a', text: 'that’s more than *any speech.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Pisces: a page | *at a time.*',
      prop: { type: 'note', color: '#ffd1e0', lines: [
        { text: 'my whole story, tonight', at: 0.4, strike: 1.0 },
        { text: 'one page tonight.', at: 'L0', check: 'D0' },
        { text: 'more next week.', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'one page tonight. *more next week.*', mood: 'happy', react: 'wide' },
        { who: 'a', text: 'I can hold a page. *I’ll ask for more.*', mood: 'happy', react: 'heart' },
        { who: 'b', text: 'you *want* more? I’m crying.', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'One small promise | *a week.*',
      prop: { type: 'calendar', title: 'DECEMBER', cells: [{ d: 'sun', text: 'call ✓' }, { d: 'wed', text: 'soup ✓' }, { d: 'sun', text: 'walk ✓' }, { d: 'wed', text: 'film ✓' }, { d: 'sun' }, { d: 'wed' }], hl: { i: 4, at: 'L2', text: 'bus stop?', size: 30 } },
      lines: [
        { who: 'a', text: 'one small promise *a week.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'and we *keep it.* every time.', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'sunday: the bus stop. *with two tissues.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'I’ll be there. *crying, happily.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  verdict: 'SAFE HERE',
  last: 'Small promises. | *Kept.*',
  music: { style: 'cinematic', key: 'Gm', seed: 4678 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
