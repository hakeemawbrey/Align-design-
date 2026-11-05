// kxsse01 · SIGN × SIGN: EXTENDED, ep 1: "Aries × Scorpio: left on read." (90 s vertical, star_advice)
// Engine + look: ./sxkit.js (shared by kxsse01–08). Rows: promo/films/month2/m46.md
//   frame 0   "Left on read. | *Three hours.*"  Aries mid-scream at a read receipt, Scorpio mid-squint; freeze frame.
//   1 meet    a winter market; a cocoa goes flying, Scorpio catches it: "you owe me a cocoa." "deal. tonight?"
//   2 clash   five texts in a minute vs. one deep reply three hours later (phone)
//   3 tip A   Aries: send one, then go live your life (list)
//   4 tip B   Scorpio: a 3-second "busy, smiling, call at nine" (phone)
//   5 ↻       agree on a rhythm out loud: quick hellos by day, the long talk at nine (clock)
//   6 verdict WORTH THE WAIT · last line "One text. | *One real reply.*" (hard cut)
import { makeFilm } from './sxkit.js'

const F = makeFilm({
  id: 'kxsse01', a: 'aries', b: 'scorpio', duration: 90,
  wants: ['a reply. now.', 'to mean every word'],
  hook: 'Left on read. | *Three hours.*',
  premise: 'me, refreshing *every four seconds.*',
  caught: { x: 262, y: 930, r: 170, label: 'READ 9:02 PM', arrow: 'tr' },
  moods: { a0: 'wide', b0: 'squint' },
  open: [
    { who: 'a', text: 'they READ it. at 9:02. it’s *midnight.*', mood: 'wide', react: 'squint' },
    { who: 'b', text: 'I was thinking about *what to say.*', mood: 'neutral', react: 'wide' },
  ],
  tips: [
    {
      stamp: 'FLASHBACK', head: 'Three weeks | *earlier…*',
      prop: { type: 'note', lines: [
        { text: 'the winter market', at: 0.5 },
        { text: 'one cocoa: airborne', at: 'L0', color: '#c8344c' },
        { text: 'caught ✓', at: 'L1', size: 50 },
      ] },
      lines: [
        { who: 'a', text: 'sorry!! your cocoa *went flying.*', mood: 'wide', react: 'squint' },
        { who: 'b', text: 'caught it. you owe me *a cocoa.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'deal. *tonight?*', mood: 'sparkle', react: 'neutral' },
        { who: 'b', text: '…fine. *tonight.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'CLASH', head: 'Five texts. | *One reply.*',
      prop: { type: 'phone', title: '♈︎ aries', msgs: [
        { side: 'R', text: 'hey!', at: 0.4 },
        { side: 'R', text: 'did you see the snow', at: 0.9 },
        { side: 'R', text: '??? hello', at: 'L0+0.4' },
        { side: 'L', text: 'I saw it. it made me think of you.', at: 'L1+0.5' },
      ] },
      lines: [
        { who: 'a', text: 'I sent five. FIVE. *nothing.*', mood: 'wide', react: 'squint' },
        { who: 'b', text: 'I read them all. *I loved them.*', mood: 'happy', react: 'wide' },
        { who: 'a', text: 'then SAY that! *in words!*', mood: 'squint', react: 'neutral' },
        { who: 'b', text: 'I wanted my reply to be *right.*', mood: 'neutral', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 1', head: 'Aries: send one, | *then go live.*',
      prop: { type: 'list', title: 'aries, tonight', items: [
        { text: 'five texts in a minute', at: 0.5, mark: 'cross', markAt: 1.0 },
        { text: 'one text, then the gym', at: 'L0', mark: 'check', markAt: 'D0' },
        { text: 'phone in the other room', at: 'L1', mark: 'check', markAt: 'D1' },
      ] },
      lines: [
        { who: 'a', text: 'one text. then I go *live my life.*', mood: 'happy', react: 'sparkle' },
        { who: 'b', text: 'and I miss you *more*, weirdly.', mood: 'heart', react: 'wide' },
        { who: 'a', text: 'wait. that *works?*', mood: 'sparkle', react: 'happy' },
      ],
    },
    {
      stamp: 'TIP 2', head: 'Scorpio: a quick | *“I’m here.”*',
      prop: { type: 'phone', title: '♏︎ scorpio', msgs: [
        { side: 'R', text: 'thinking about the perfect reply…', at: 0.4, del: 1.4 },
        { side: 'R', text: 'busy! smiling at this. call at 9?', at: 'L0+0.3' },
        { side: 'L', text: 'YES. 9. ♥', at: 'L1' },
      ] },
      lines: [
        { who: 'b', text: 'busy. smiling. *call you at nine.*', mood: 'happy', react: 'sparkle' },
        { who: 'a', text: 'a three-second text! *I’m thriving.*', mood: 'sparkle', react: 'happy' },
        { who: 'b', text: 'easier than *the perfect reply.*', mood: 'heart', react: 'heart' },
      ],
    },
    {
      stamp: 'TIP 3 ↻', head: 'Agree on | *a rhythm.*',
      prop: { type: 'clock', from: 20 * 60 + 50, to: 21 * 60, run: [0.5, 'D1'], wedge: [0, 15], wedgeAt: 'L1', label: '9:00: THE LONG TALK', labelAt: 'L1+0.3' },
      lines: [
        { who: 'a', text: 'so: quick hellos *all day.*', mood: 'happy', react: 'happy' },
        { who: 'b', text: 'and at nine, *the long talk.*', mood: 'sparkle', react: 'heart' },
        { who: 'a', text: 'deal. I’ll *count down.*', mood: 'heart', react: 'happy' },
        { who: 'b', text: 'I know. *I love that.*', mood: 'heart', react: 'sparkle' },
      ],
    },
  ],
  verdict: 'WORTH THE WAIT',
  last: 'One text. | *One real reply.*',
  music: { style: 'house', key: 'Am', seed: 4671 },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B }
