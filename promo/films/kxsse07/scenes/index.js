// kxsse07 · SIGN × SIGN: EXTENDED, ep 7: "Aries × Capricorn: the first fight." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "Our first fight. | *About parking.*"  Aries mid-stomp, Capricorn mid-point; freeze frame + caught.
//   1 meet    racing for a parking spot outside a bakery; both let the other have it (map)
//   2 clash   the first fight: Aries wants to settle it NOW, Capricorn wants to schedule it next week (calendar)
//   3 tip A   Aries: pause 20 minutes; say when you'll be back (clock)
//   4 tip B   Capricorn: don't wait a week; tonight is soon enough (calendar)
//   5 ↻       the 20-minute rule: cool down, come back, talk (note)
//   6 verdict STRONGER · last line "Cool down. | *Come back.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse07', a: 'aries', b: 'capricorn', duration: 90,
  wants: ['to fix it right now', 'to fix it properly'],
  hook: 'Our first fight. | *About parking.*',
  premise: 'us, *mid-argument*, in a car park.',
  caught: { x: 540, y: 930, r: 330, ry: 200, label: 'FIGHT #1', arrow: 'tr' },
  moods: { a0: 'squint', b0: 'wide' },
  open: [
    { who: 'a', text: 'you said LEFT. *you meant right!*', mood: 'squint', react: 'wide' },
    { who: 'b', text: 'I said *“the other left.”*', mood: 'wide', react: 'squint' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'The bakery, | *in March.*',
      prop: { type: 'map', from: 'two cars', to: 'one parking spot', run: [0.4, 'D1'], alt: { run: [0.3, 0.9], label: 'the race' }, note: { text: 'both stopped. both waved.', at: 'L2' } },
      lines: [
        { who: 'a', text: 'that spot is *MINE.* oh. hello.', mood: 'wide', react: 'wide' },
        { who: 'b', text: 'take it. *I insist.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'no, you take it. *and a croissant?*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'I’ll get two. *one for you.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Now… | *or next week?*',
      prop: { type: 'calendar', title: 'THE FIGHT', cells: [{ d: 'now', text: 'aries' }, { d: 'tue' }, { d: 'wed' }, { d: 'thu' }, { d: 'fri' }, { d: 'next mon', text: 'cap' }], hl: { i: 5, at: 'L1', text: 'talk?', size: 32 } },
      lines: [
        { who: 'a', text: 'we fix this *RIGHT NOW.*', mood: 'squint', react: 'wide' },
        { who: 'b', text: 'let’s discuss it *next monday.*', mood: 'neutral', react: 'squint' },
        { who: 'a', text: 'NEXT MONDAY? *I’ll be climbing walls.*', mood: 'wide', react: 'neutral' },
        { who: 'b', text: 'and I can’t think *when you shout.*', mood: 'squint', react: 'neutral' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Aries: pause, | *don’t storm off.*',
      prop: { type: 'clock', from: 19 * 60, to: 19 * 60 + 20, run: [0.5, 'D1'], wedge: [0, 20], wedgeAt: 'L0', label: 'back at 7:20', labelAt: 'L0+0.3' },
      lines: [
        { who: 'a', text: 'I need *twenty minutes.* I’ll be back.', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'you said *when.* that helps.', mood: 'happy', react: 'happy' },
        { who: 'a', text: 'walked it off. *I’m back. calmer.*', mood: 'happy', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Cap: tonight | *is soon enough.*',
      prop: { type: 'calendar', title: 'THE TALK', cells: [{ d: 'tonight', text: '7:20' }, { d: 'tue' }, { d: 'wed' }, { d: 'thu' }, { d: 'fri' }, { d: 'next mon', text: 'talk?' }], hl: { i: 0, at: 'L0', text: 'talk ✓', size: 32 } },
      lines: [
        { who: 'b', text: 'not next week. *tonight.* calmly.', mood: 'neutral', react: 'sparkle' },
        { who: 'a', text: 'tonight! *I can do tonight.*', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'sorry about *the other left.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'The 20-minute | *rule.*',
      prop: { type: 'note', color: '#cfe6ff', lines: [
        { text: '1. cool down (20 min)', at: 'L0' },
        { text: '2. come back', at: 'L1' },
        { text: '3. talk, kindly', at: 'L2' },
      ] },
      lines: [
        { who: 'a', text: 'step one: *cool down.*', mood: 'happy', react: 'happy' },
        { who: 'b', text: 'step two: *come back.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'step three: *talk.* kindly.', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'step four: *croissants.*', mood: 'sparkle', react: 'heart' },
      ],
    },
  ],
  verdict: 'STRONGER',
  last: 'Cool down. | *Come back.*',
  music: { style: 'chiptune', key: 'C', seed: 4677 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
