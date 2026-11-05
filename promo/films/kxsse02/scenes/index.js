// kxsse02 · SIGN × SIGN: EXTENDED, ep 2: "Taurus × Cancer: six weeks on the couch." (90 s vertical, star_advice)
// Engine + look: ../../kxsse01/scenes/sxkit.js. Rows: promo/films/month2/m46.md
//   frame 0   "Six weeks. | *Same couch.*"  both stars mid-sink into a blanket; freeze frame on the calendar.
//   1 meet    both reach for the last box of cocoa on a shelf, and both let go
//   2 clash   every date is "staying in"; both secretly a little stuck, neither says it (note: thought bubbles)
//   3 tip A   Taurus: say "I'm a bit bored" kindly; bored isn't a breakup (note)
//   4 tip B   Cancer: ask, don't hint (phone: "you look bored" deleted → "want to try something new?")
//   5 ↻       one "door night" a month, picked from tonight's deck (calendar)
//   6 verdict COSY, ON PURPOSE · last line "Staying in, | *on purpose.*" (hard cut)
import { makeFilm } from '../../kxsse01/scenes/sxkit.js'

const F = makeFilm({
  id: 'kxsse02', a: 'taurus', b: 'cancer', duration: 90,
  wants: ['the good blanket', 'everyone safe at home'],
  hook: 'Six weeks. | *Same couch.*',
  premise: 'us, “just staying in” *since October.*',
  caught: { x: 540, y: 930, r: 330, ry: 200, label: 'DATE NIGHT #41', arrow: 'tr' },
  moods: { a0: 'squint', b0: 'wide' },
  open: [
    { who: 'a', text: 'date night! couch, blanket, *again.*', mood: 'happy', react: 'neutral' },
    { who: 'b', text: 'perfect. (is it? *it is.* right?)', mood: 'wide', react: 'squint' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'How it | *started.*',
      prop: { type: 'list', title: 'the corner shop, 8 pm', items: [
        { text: 'one box of cocoa left', at: 0.5 },
        { text: 'two hands reach', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'both let go', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'a', text: 'oh. you take it. *please.*', mood: 'happy', react: 'wide' },
        { who: 'b', text: 'no, YOU take it. *I insist.*', mood: 'heart', react: 'sparkle' },
        { who: 'a', text: 'or… we share it? *at mine?*', mood: 'sparkle', react: 'heart' },
        { who: 'b', text: 'I’ll bring *soup.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Cosy… | *or stuck?*',
      prop: { type: 'note', color: '#ffd1e0', lines: [
        { text: 'taurus thinks:', at: 0.5, size: 36 },
        { text: '“a little bored?”', at: 'L0', color: '#c8344c' },
        { text: 'cancer thinks:', at: 'L1', size: 36 },
        { text: '“a little bored?”', at: 'L1+0.6', color: '#c8344c' },
      ] },
      lines: [
        { who: 'a', text: 'I love this. I *really* do. but…', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'but what? is it me? *is it the soup?*', mood: 'wide', react: 'squint' },
        { who: 'a', text: 'never the soup. nothing. *it’s fine.*', mood: 'squint', react: 'neutral' },
        { who: 'b', text: '(it’s not fine.) *great!*', mood: 'neutral', react: 'neutral' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Taurus: say it, | *kindly.*',
      prop: { type: 'note', lines: [
        { text: '“nothing, it’s fine”', at: 0.4, strike: 1.0 },
        { text: '“I love us. I’m', at: 'L0' },
        { text: 'a bit bored of', at: 'L0+0.4' },
        { text: 'the same night.”', at: 'L0+0.8', check: 'D0' },
      ] },
      lines: [
        { who: 'a', text: 'I love us. I’m a bit bored of *the same night.*', mood: 'neutral', react: 'wide' },
        { who: 'b', text: 'bored of… *the night?* not me?', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'never you. bored isn’t *a breakup.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Cancer: ask, | *don’t hint.*',
      prop: { type: 'phone', title: '♋︎ cancer', msgs: [
        { side: 'R', text: 'you seem quiet lately I guess', at: 0.4, del: 1.4 },
        { side: 'R', text: 'want to try something new this week?', at: 'L0+0.3' },
        { side: 'L', text: 'YES. you pick, I’ll bring snacks', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'want to try *something new?*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'yes! I was scared *to ask.*', mood: 'sparkle', react: 'heart' },
        { who: 'b', text: 'me too. *we’re so silly.*', mood: 'heart', react: 'happy' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'One | *door night.*',
      prop: { type: 'calendar', title: 'DECEMBER', cells: [{ d: 'fri', text: 'couch' }, { d: 'sat', text: 'couch' }, { d: 'sun', text: 'soup' }, { d: 'fri', text: 'couch' }, { d: 'sat' }, { d: 'sun', text: 'nap' }], hl: { i: 4, at: 'L1', text: 'door night!', size: 30 } },
      lines: [
        { who: 'a', text: 'once a month: *a door night.*', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'we leave the house? *on purpose?*', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'we pick it from *tonight’s deck.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'and then home. *to the couch.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  verdict: 'COSY, ON PURPOSE',
  last: 'Staying in, | *on purpose.*',
  music: { style: 'lofi', key: 'D', seed: 4672 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
