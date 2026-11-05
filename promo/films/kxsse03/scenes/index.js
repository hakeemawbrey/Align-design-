// kxsse03 · SIGN × SIGN: EXTENDED, ep 3: "Gemini × Sagittarius: so… what are we?" (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "So… | *what are we?*"  Gemini mid-gasp, Sag mid-shrug; freeze frame on the pair.
//   1 meet    a friend's game night: they keep landing on the same team (list)
//   2 clash   four months of "hanging out"; both scared the other wants less (gauge)
//   3 tip A   Gemini: ask it plainly, once (note)
//   4 tip B   Sagittarius: freedom and commitment aren't opposites (scale)
//   5 ↻       define it their way (note: together + solo trips + game nights)
//   6 verdict OFFICIAL (THEIR WAY) · last line "Free. | *And chosen.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse03', a: 'gemini', b: 'sagittarius', duration: 90,
  wants: ['a straight answer', 'room to roam'],
  hook: 'So… | *what are we?*',
  premise: 'month four of *“just hanging out.”*',
  caught: { x: 540, y: 930, r: 330, ry: 200, label: 'THE SITUATIONSHIP', arrow: 'tr' },
  moods: { a0: 'wide', b0: 'squint' },
  open: [
    { who: 'a', text: 'my mum asked who you are. I said *“uh.”*', mood: 'wide', react: 'wide' },
    { who: 'b', text: 'I told mine *“a friend.”* …a close one.', mood: 'squint', react: 'squint' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'Game night, | *August.*',
      prop: { type: 'list', title: 'game night: teams', items: [
        { text: 'round 1: gemini + sag', at: 0.5, mark: 'check', markAt: 0.9 },
        { text: 'round 2: gemini + sag', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'round 3: “random” again', at: 'L2', mark: 'check', markAt: 'D2' },
      ] },
      lines: [
        { who: 'a', text: 'same team *again?* what are the odds.', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'zero. I swapped the *name cards.*', mood: 'happy', react: 'wide' },
        { who: 'a', text: 'so did I! *twice!*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Four months. | *No label.*',
      prop: { type: 'gauge', title: 'how much they like each other', labels: ['a bit', 'a LOT'], color: '#ef5c94', seq: [[0.3, 0.3], ['L0', 0.7], ['L2', 1.05]], verdict: { text: 'nobody has said it', at: 'D3' } },
      lines: [
        { who: 'a', text: 'if I ask, will they *run?*', mood: 'wide', react: 'neutral' },
        { who: 'b', text: 'if I ask, will they *feel trapped?*', mood: 'squint', react: 'neutral' },
        { who: 'a', text: 'so I just… *don’t ask.*', mood: 'neutral', react: 'neutral' },
        { who: 'b', text: 'same. *for four months.*', mood: 'neutral', react: 'wide' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Gemini: ask it | *plainly.*',
      prop: { type: 'note', lines: [
        { text: '“so, haha, like,', at: 0.4, strike: 1.0 },
        { text: 'what’s the vibe”', at: 0.6, strike: 1.1 },
        { text: '“are we dating?', at: 'L0' },
        { text: 'I’d like to be.”', at: 'L0+0.5', check: 'D0' },
      ] },
      lines: [
        { who: 'a', text: 'are we dating? *I’d like to be.*', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'you… just *asked?* out loud?', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'once. clearly. *my knees are shaking.*', mood: 'sparkle', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Sag: free isn’t | *the opposite.*',
      prop: { type: 'scale', left: 'freedom', right: 'commitment', seq: [[0, -1], ['L0', -0.3], ['D1', 0]], wobble: true, verdict: { text: 'both fit', at: 'D1+0.2' } },
      lines: [
        { who: 'b', text: 'I thought dating meant *no more trips.*', mood: 'squint', react: 'neutral' },
        { who: 'a', text: 'go on trips! just *send me photos.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'so I can be free *and* yours?', mood: 'sparkle', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'Define it | *your way.*',
      prop: { type: 'note', color: '#cfe6ff', lines: [
        { text: 'us, officially:', at: 0.4, size: 38 },
        { text: 'together ✓', at: 'L0' },
        { text: 'solo trips ✓', at: 'L1' },
        { text: 'game nights ✓', at: 'L2' },
      ] },
      lines: [
        { who: 'a', text: 'together. *officially.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'with solo trips. *and postcards.*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'and same team. *every game night.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'I’m telling my mum *tonight.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  verdict: 'OFFICIAL (THEIR WAY)',
  last: 'Free. | *And chosen.*',
  music: { style: 'pop', key: 'E', seed: 4673 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
