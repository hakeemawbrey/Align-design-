// kxsse04 · SIGN × SIGN: EXTENDED, ep 4: "Leo × Libra: meeting the friends." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "Meeting the friends. | *In 10 minutes.*"  Leo mid-panic, Libra mid-wave; freeze frame + caught.
//   1 meet    a gallery opening: Leo admires a painting; Libra painted it (card)
//   2 clash   at the friends' dinner Leo tells story after story; Libra agrees with everyone, never says what it wants (list)
//   3 tip A   Leo: ask questions, not just stories (talk card)
//   4 tip B   Libra: say the one thing you want ("I'd love to leave at ten") (note)
//   5 ↻       a secret check-in signal: ear tug = "you OK?", nod = "having fun" (list)
//   6 verdict FRIENDS APPROVE · last line "Two signals. | *One team.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse04', a: 'leo', b: 'libra', duration: 90,
  wants: ['to make a great impression', 'everyone to get along'],
  hook: 'Meeting the friends. | *In 10 minutes.*',
  premise: 'me, rehearsing my *“hi!” in the mirror.*',
  caught: { x: 262, y: 930, r: 170, label: 'PANICKING', arrow: 'tr' },
  moods: { a0: 'wide', b0: 'sparkle' },
  open: [
    { who: 'a', text: 'what if they don’t like me? *ME?*', mood: 'wide', react: 'happy' },
    { who: 'b', text: 'they’ll love you. *probably!*', mood: 'sparkle', react: 'wide' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'The gallery, | *in spring.*',
      prop: { type: 'card', header: 'GALLERY LABEL', q: '“Two Moons” · paint on canvas · by Libra', caption: { text: 'the painting Leo loved', at: 'D1' } },
      lines: [
        { who: 'a', text: 'whoever painted this is *a genius.*', mood: 'sparkle', react: 'wide' },
        { who: 'b', text: 'hi. that’s… *mine.*', mood: 'heart', react: 'sparkle' },
        { who: 'a', text: 'I KNEW I had *good taste.*', mood: 'happy', react: 'heart' },
        { who: 'b', text: 'come to my next show? *front row.*', mood: 'sparkle', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'The dinner | *goes sideways.*',
      prop: { type: 'list', title: 'dinner, by the numbers', items: [
        { text: 'leo stories: 9', at: 0.5, mark: 'cross', markAt: 'D0' },
        { text: 'questions leo asked: 0', at: 'L1', mark: 'cross', markAt: 'D1' },
        { text: 'libra: “agreed!” × 14', at: 'L2', mark: 'cross', markAt: 'D3' },
      ] },
      lines: [
        { who: 'a', text: 'and THEN, story number *nine*…', mood: 'sparkle', react: 'neutral' },
        { who: 'b', text: '(I’m so tired.) *agreed!* ha!', mood: 'neutral', react: 'sparkle' },
        { who: 'a', text: 'they loved me, right? *right?*', mood: 'wide', react: 'neutral' },
        { who: 'b', text: 'I… wanted to leave at *nine.*', mood: 'squint', react: 'wide' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Leo: ask, | *don’t just tell.*',
      prop: { type: 'card', q: 'What’s the best thing that happened to you this year?', caption: { text: 'then: listen', at: 'D0' } },
      lines: [
        { who: 'a', text: 'so, what was *your* best moment this year?', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'they talked for ten minutes. *they glowed.*', mood: 'heart', react: 'happy' },
        { who: 'a', text: 'listening is… *also* a spotlight?', mood: 'sparkle', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Libra: say | *the one thing.*',
      prop: { type: 'note', lines: [
        { text: '“whatever you want!”', at: 0.4, strike: 1.0 },
        { text: '“I’d love to', at: 'L0' },
        { text: 'leave at ten.”', at: 'L0+0.4', check: 'D0' },
      ] },
      lines: [
        { who: 'b', text: 'I’d love to *leave at ten.*', mood: 'neutral', react: 'wide' },
        { who: 'a', text: 'ten it is! you could’ve *always* said.', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'I know. *I’m learning.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'A secret | *signal.*',
      prop: { type: 'list', title: 'the code', items: [
        { text: 'ear tug = “you okay?”', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'nod = “having fun!”', at: 'L1', mark: 'check', markAt: 'D1' },
        { text: 'two tugs = “home time”', at: 'L2', mark: 'check', markAt: 'D2' },
      ] },
      lines: [
        { who: 'a', text: 'ear tug means *“you okay?”*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'a nod means *“having fun.”*', mood: 'sparkle', react: 'happy' },
        { who: 'a', text: 'and two tugs: *home time.*', mood: 'heart', react: 'heart' },
        { who: 'b', text: 'we’re a *secret team* now.', mood: 'heart', react: 'sparkle' },
      ],
    },
  ],
  verdict: 'FRIENDS APPROVE',
  last: 'Two signals. | *One team.*',
  music: { style: 'funk', key: 'G', seed: 4674 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
