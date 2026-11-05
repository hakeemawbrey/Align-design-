// kxrke03: RANKING THE SIGNS: FULL COUNTDOWN, "Who gives great advice and never takes it" (≈88 s vertical star_talk post, promo/films/month2/m43.md,
// music: pop · D). No end card, no card cut; hard cut on the last line.
// The whole format lives in ../../kxrke01/scenes/rankfull.js (imported read-only): frame-0 crash + slam title, ranks
// #12 → #2 every 6 s with chapter stickers, 3-2-1 drumroll, #1 at 73.6, the twist at 80, THE STARS' last line, hard cut.
import { makeRankFull } from '../../kxrke01/scenes/rankfull.js'

const EP = makeRankFull({
  id: 'kxrke03',
  hook: 'Great advice. | *Never* takes it.',
  hookProp: { kind: 'megaphone', text: 'TAKE A BREAK!', label: 'says the busiest one', k: 0.95 },
  ranks: [
    { sign: 'pisces', tag: '“don’t cry over them,” mid-cry', say: 'don’t cry over th— (sob)', gag: { kind: 'tissues', label: 'advice 10/10. execution 0/10' } },
    { sign: 'cancer', tag: '“eat something!” hasn’t since noon', say: 'did you eat?? (I didn’t)', gag: { kind: 'snack', label: 'feeds everyone but me' } },
    { sign: 'virgo', tag: '“rest!” colour-codes rest, never rests', say: 'rest! (schedule attached)', gag: { kind: 'list', lines: ['rest  9:00', 'rest  9:15', 'rest audit'], label: 'resting, aggressively' } },
    { sign: 'libra', tag: '“be decisive!” 40 minutes on a snack', say: 'be decisive! …chips? cookies?', mood: 'wide', gag: { kind: 'clock', h: 8, m: 0, spin: 600, label: 'still choosing' } },
    { sign: 'scorpio', tag: '“never text them.” texts them', say: 'never text them. (texting)', mood: 'squint', gag: { kind: 'phone', text: 'hey.', sub: 'sent 1:12 AM', label: 'do as I say' } },
    { sign: 'gemini', tag: 'gave three opposite answers', say: 'stay! go! both! neither!', gag: { kind: 'big', text: '?!?', size: 130, label: 'all of them valid', labelDy: 110 } },
    { sign: 'aquarius', tag: 'wrote a whole guide. lost it.', say: 'it’s in a notebook. somewhere.', gag: { kind: 'note', lines: ['THE GUIDE', 'volume one', '(lost)'], label: 'genius, misplaced' } },
    { sign: 'leo', tag: '“know your worth!” knows it, loudly', say: 'know your worth! I do!', gag: { kind: 'camera', label: 'the proof' } },
    { sign: 'sagittarius', tag: '“go travel!” already at the gate', say: 'go see the world! bye!', gag: { kind: 'ticket', text: 'GATE 9', label: 'took it' } },
    { sign: 'taurus', tag: '“go to bed.” went to bed', say: 'go to bed. goodnight.', mood: 'sleepy', gag: { kind: 'moon', label: 'took it' } },
    { sign: 'capricorn', tag: 'follows their own ten-step plan', say: 'step four. on schedule.', gag: { kind: 'list', lines: ['step 1  done', 'step 2  done', 'step 3  done'], label: 'took it, obviously' } },
    { sign: 'aries', tag: 'said “just text them,” then did', say: 'just text them! …done!', gag: { kind: 'phone', text: 'hi!! :)', sub: 'sent', label: 'took it in two seconds' } },
  ],
  twist: { who: 'THE STARS', say: 'now say it to yourselves.', gag: { kind: 'mirror', col: '#f7cf68', label: 'the hardest client' }, cheer: '…okay. fair.' },
  last: 'Be the friend you are, *to you.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
