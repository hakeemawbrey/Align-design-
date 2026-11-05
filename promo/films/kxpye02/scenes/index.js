// kxpye02: YOUR SIGN AT THE PARTY: EXTENDED, "Your ex is at the party" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: synthwave · F#m). No end card, no card cut; hard cut on the last line.
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE SPIRAL · THE SNACK TABLE · THE DANCE FLOOR · THE BALCONY · THE GOODBYE), the goodbye with THE STARS at 83.2.
import { makeParty } from '../../kxpye01/scenes/partyfull.js'
import { recordScratch, recordScratchCues, caught, caughtCues } from '../../hookkit.js'
const REC = { at: 0.55, len: 1.35, caption: 'yep. *that’s the ex.*', top: 1440 }
const CAUGHT = { at: 0.7, x: 870, y: 1150, r: 140, out: [1.85, 1.95], label: 'THE EX', arrow: 'tl', rec: false }

const EP = makeParty({
  id: 'kxpye02',
  title: 'Walked in. | Your *ex* is here.',
  promise: 'WAIT FOR THE GOODBYE',
  chapters: ['THE DOOR', 'THE SPIRAL', 'THE SNACK TABLE', 'THE DANCE FLOOR', 'THE BALCONY', 'THE GOODBYE'],
  hook: { sign: 'cancer', act: 'freeze', mood: 'wide', look: [1, 0], guest: { color: '#9a9ab8', name: 'THE EX', side: 'r', hat: false, mood: 'neutral' }, say: 'oh. OH.', sayAt: 2.0 },
  moments: [
    { sign: 'cancer', cap: 'freezes *mid-wave.*', act: 'freeze', mood: 'wide', guest: { color: '#9a9ab8', name: 'THE EX', side: 'r', hat: false, mood: 'neutral' }, say: 'oh. OH. they’re here.', act2: 'shiver', say2: 'cool cool cool cool.', say2By: 'hero' },
    { sign: 'aries', cap: 'walks right up. *keeps it short.*', act: 'walkin', guest: { color: '#9a9ab8', name: 'THE EX', side: 'r', hat: false, mood: 'neutral' }, say: 'hey! good to see you.', say2: 'you too. take care!' },
    { sign: 'gemini', cap: 'live-narrates it *to three friends.*', prop: { kind: 'phone', text: 'THEY’RE HERE', typing: true, from: 0.4, label: 'live coverage' }, say: 'okay so they JUST walked in', say2: 'and now they’re at the dip!!', mood2: 'wide' },
    { sign: 'scorpio', cap: '“I’m fine.” *(it is fine.)*', mood: 'squint', say: 'I’m fine.', prop2: { kind: 'meter', to: 0.15, label: 'actually fine' }, mood2: 'happy', say2: 'no, really. I’m good.' },
    { sign: 'taurus', cap: 'emotionally supported *by dip.*', prop: { kind: 'snack', from: 0.3, label: 'the dip understands' }, say: 'the dip gets me.', say2: 'more dip, please.', hearts: true },
    { sign: 'virgo', cap: 'maps *every exit.*', prop: { kind: 'map', from: 0.4, label: 'exit plans a, b and c' }, say: 'exits: three. snacks: one.', say2: 'it’s just good planning.' },
    { sign: 'leo', cap: 'dances like *nobody’s watching.*', act: 'dance', say: 'watch me not care!', prop2: { kind: 'boombox', label: 'main character energy' }, confetti: true, crowd2: true },
    { sign: 'libra', cap: 'small talk *with the ex.* breathes.', guest: { color: '#9a9ab8', name: 'THE EX', side: 'l', hat: false }, say: 'so! the weather! wild!', say2: 'yeah! nice to see you.', prop2: { kind: 'stamp', text: 'DID IT', col: '#9fe6b0', label: 'breathe out' } },
    { sign: 'sagittarius', cap: 'steps out. *meets someone new.*', guest: { color: '#ffd1e8', name: 'SOMEONE NEW', side: 'r', from: 2.6 }, say: 'just getting some air!', say2: 'hi! nice stars tonight.', hearts: true },
    { sign: 'aquarius', cap: 'befriends *the ex’s new friend.*', guest: { color: '#b0e0ff', name: 'NEW FRIEND', side: 'l' }, say: 'wait, you like comets too??', say2: 'BEST friends now.', crowd2: true },
    { sign: 'capricorn', cap: 'leaves at 9:30 *as planned.*', prop: { kind: 'clock', h: 9, m: 30, from: 0.3, label: 'right on time' }, say: 'lovely party. goodnight!', say2: 'boundaries are festive.' },
    { sign: 'pisces', cap: 'the ex says *“you look happy.”*', guest: { color: '#9a9ab8', name: 'THE EX', side: 'r', hat: false, mood: 'neutral' }, sayBy: 'guest', say: 'hey. you look happy.', say2By: 'hero', say2: 'I am. (happy sob)', hearts: true, crowd2: true },
  ],
  last: 'You can be *kind* and still go home.',
  loop: false,
  freeze: [REC],
  scenes: [recordScratch(REC), caught(CAUGHT)],
  extraCues: [...recordScratchCues(REC), ...caughtCues(CAUGHT)],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
