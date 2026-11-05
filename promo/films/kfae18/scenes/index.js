// kfae18: FAKE AD, "Someone compliments you and you argue" (8 s trial reel, pop · D, loops). Row: m31.md
//   0     B&W: Virgo mid-protest, a giant "NO, IT'S OLD" bubble knocking Cancer's "love your jacket!" out of the air;
//         hook "Got a compliment. | *Started a debate?*"   0.55 freeze, caught on the flying compliment.
//   1.45  colour: THANK-YOU TAPE.   tip "someone compliments you? just say “thank you.”"   demo: "thank you!" Cancer beams.
//   Pisces sobs "you look GREAT".   last line, then eases back into frame 0.
import { makeAd, star, bubble, motion, hearts, label, prog, ease, BONE } from '../../kfae01/adkit.js'

const AD = makeAd({
  id: 'kfae18', sign: 'virgo', dur: 8, ending: 'loop', style: 'pop', key: 'D', seed: 3118,
  hook: 'Got a compliment. | *Started a debate?*',
  caught: { x: 780, y: 700, r: 160, label: 'IT WAS NICE', arrow: 'bl' },
  product: 'THANK-YOU|TAPE', sub: 'two words only', icon: 'heart', col: '#ffb02f', col2: '#ffffff', burst: ['#ff7a2f', '#ff2f8a'],
  tip: 'someone compliments you? just say “thank you.”',
  quote: 'you look GREAT',
  fine: '*DO NOT EXPLAIN WHERE IT’S FROM. JUST SAY THANK YOU.',
  last: 'Two words. | *Thank you.* That’s it.', lastSize: 86,
  before(x, t, S) {
    star(x, t, { sign: 'cancer', x: 820, y: 1120, s: 230, mood: 'wide', look: [-1, -0.5], seed: 3 })
    bubble(x, t, 780 + 40 * t, 700 - 60 * t, -1, 99, 'love your jacket!', { size: 34 })
    bubble(x, t, 360, 820, -1, 99, 'NO, IT’S OLD AND IT DOESN’T FIT', { size: 46, maxW: 420 })
    motion(x, t, 330, 1100, { r0: 160, r1: 220, n: 10 })
    S.hero(x, t, { x: 330, y: 1100, s: 280, mood: 'wide', look: [1, -0.4], rot: 0.12 * Math.sin(t * 14) })
  },
  after(x, t, S) {
    const u = S.u
    S.hero(x, t, { x: 320, y: 1080, s: 260, mood: u > 0.6 ? 'happy' : 'squint', look: [1, 0], blush: 1, hops: [S.T.after + 0.2] })
    star(x, t, { sign: 'cancer', x: 760, y: 1080, s: 250, mood: u > 0.6 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 3, hops: [S.T.after + 0.7] })
    bubble(x, t, 760, 850, S.T.after + 0.0, S.T.D + 1, 'love your jacket!', { size: 34 })
    bubble(x, t, 330, 850, S.T.after + 0.2, S.T.D + 1, 'thank you!', { size: 44 })
    hearts(x, t, 540, 1000, S.T.after + 0.7, { n: 5 })
  },
  afterCues: [['pop', 0.0, 880, 0.04, 0.3], ['pop', 0.2, 1174.66, 0.05, -0.3], ['pluck', 0.7, 1567.98, 0.04, 0.5, 0]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [star, label, prog, ease, BONE]
