// kxpye03: YOUR SIGN AT THE PARTY: EXTENDED, "The party where you only know the host" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: jazzy · Db). No end card, no card cut; loop (kit loop helper back into frame 0).
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE KITCHEN · THE LIVING ROOM · THE CORNER · THE GAMES · THE GOODBYE), the goodbye with THE STARS at 83.2.
import { makeParty } from '../../kxpye01/scenes/partyfull.js'
import { recordScratch, recordScratchCues } from '../../hookkit.js'
const REC = { at: 0.5, len: 1.2, caption: 'everyone. *turned.* around.', top: 1440 }

const EP = makeParty({
  id: 'kxpye03',
  title: 'I only know | *the host.*',
  promise: 'WAIT FOR THE LAST GOODBYE',
  chapters: ['THE DOOR', 'THE KITCHEN', 'THE LIVING ROOM', 'THE CORNER', 'THE GAMES', 'THE GOODBYE'],
  hook: { sign: 'virgo', act: 'freeze', mood: 'wide', stare: 3.6, say: 'hi… I know Leo?', sayAt: 1.9 },
  moments: [
    { sign: 'virgo', cap: 'pretends to text. *intensely.*', act: 'shiver', prop: { kind: 'phone', text: 'typing…', typing: true, from: 0.3, label: 'very busy. very important.' }, say: 'just answering emails.', say2: '(the emails are fake.)' },
    { sign: 'leo', cap: 'the host *yells everyone’s name.*', act: 'cheer', say: 'VIRGO!! EVERYONE: VIRGO!', crowd2: true, confetti: true, say2: 'there. now you know everyone.' },
    { sign: 'cancer', cap: 'helps with the dishes. *three friends made.*', act: 'carry', say: 'need a hand with those?', prop2: { kind: 'big', text: '+3 FRIENDS', size: 90, label: 'kitchen bonds', labelDy: 90 }, say2: 'we’re family now.', hearts: true },
    { sign: 'taurus', cap: 'finds *the host’s dog.*', prop: { kind: 'dog', from: 0.3, label: 'best guest here' }, say: 'hello, best friend.', say2: 'we’ll be over here.', hearts: true },
    { sign: 'gemini', cap: 'five friends *in five minutes.*', act: 'laps', say: 'hi! hi! you’re fun! hi!', prop2: { kind: 'clock', h: 8, m: 0, spin: 300, label: 'five minutes' }, say2: 'group photo, everyone!', crowd2: true },
    { sign: 'libra', cap: 'compliments *every pair of shoes.*', guest: { color: '#ffe08a', name: 'STRANGER', side: 'r', from: 0.5 }, say: 'okay, those shoes? stunning.', say2: 'oh my gosh, thank you!', hearts: true },
    { sign: 'scorpio', cap: 'studies the room. *one perfect question.*', mood: 'squint', guest: { color: '#b0e0ff', name: 'STRANGER', side: 'l', from: 2.6, mood2: 'sparkle' }, say: 'hm. interesting room.', say2By: 'hero', say2: 'what are you proud of lately?', mood2: 'happy' },
    { sign: 'aquarius', cap: 'talks about space *to a stranger.*', guest: { color: '#ffd1e8', name: 'STRANGER', side: 'r' }, say: 'Saturn’s rings are mostly ice!', prop2: { kind: 'moon', label: 'two hours later' }, say2: 'tell me EVERYTHING.' },
    { sign: 'aries', cap: 'challenges everyone *to charades.*', act: 'cheer', prop: { kind: 'sign', text: 'CHARADES!', w: 380, size: 50, from: 0.3 }, say: 'teams! now! let’s go!', crowd2: true, confetti: true, say2: 'that was a CHICKEN!!' },
    { sign: 'capricorn', cap: 'finds a fellow *early-leaver.*', guest: { color: '#c9d6e6', name: 'STRANGER', side: 'l', from: 0.4 }, say: 'leaving at ten?', prop2: { kind: 'clock', h: 9, m: 55, label: 'same plan' }, say2: 'ten sharp. finally.' },
    { sign: 'sagittarius', cap: 'leaves with *new trip buddies.*', say: 'who’s up for a road trip?', prop2: { kind: 'ticket', text: 'ROAD TRIP', label: 'planned tonight' }, crowd2: true, say2By: 'hero', say2: 'everyone?? let’s GO.' },
    { sign: 'pisces', cap: 'cries at a stranger’s dog photo. *so do they.*', guest: { color: '#ffe08a', name: 'STRANGER', side: 'r', tears: 2 }, prop: { kind: 'phone', text: 'my dog!', from: 0.4, label: 'a very good dog' }, say: 'oh, he’s PERFECT…', say2: '(also crying) I KNOW!!', hearts: true },
  ],
  last: 'Everyone’s a stranger *until hello.*',
  loop: true,
  freeze: [REC],
  scenes: [recordScratch(REC)],
  extraCues: recordScratchCues(REC),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
