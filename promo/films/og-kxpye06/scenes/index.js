// og-kxpye06: social rework of kxpye06 (static HOOK, outline, 0–3.8; kit copied to ./partyfull.js without the bug, slam title,
// whip, promise sticker, chapter stickers or flashes; lines pushed further; ends on THE STARS' line).
// Original notes:
// kxpye06: YOUR SIGN AT THE PARTY: EXTENDED, "The engagement party (and you’re single)" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: cinematic · Eb). No end card, no card cut; hard cut on the last line.
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE SINGLES TABLE · THE GIFTS · THE DANCE · THE TOAST · THE GOODBYE), the goodbye with THE STARS at 83.2.
import { makeParty } from './partyfull.js'


const EP = makeParty({
  id: 'og-kxpye06',
  title: 'Engagement party. | Still single. *Thriving.*',
  promise: 'WAIT FOR THE TOAST',
  chapters: ['THE DOOR', 'THE SINGLES TABLE', 'THE GIFTS', 'THE DANCE', 'THE TOAST', 'THE GOODBYE'],
  hook: { sign: 'sagittarius', act: 'dodge', mood: 'wide', prop: { kind: 'sign', text: 'SO WHEN’S YOURS?', w: 540, size: 44, pos: [400, 590], from: 0, col: '#ff8fb1', k: 0.85 }, say: 'nope! I live here now!', sayAt: 1.6 },
  moments: [
    { sign: 'aries', cap: 'gets asked *“when’s yours?”* again.', guest: { color: '#d9c8a8', name: 'AUNTIE', side: 'r', from: 0.2, hat: false }, sayBy: 'guest', say: 'so when’s YOURS?', say2By: 'hero', say2: 'when I WIN. cake?', mood2: 'happy' },
    { sign: 'taurus', cap: 'and Cancer: *the happy couple.*', guest: { sign: 'cancer', name: 'CANCER', side: 'r' }, say: 'thank you for coming!!', prop2: { kind: 'ring', label: 'engaged!' }, say2: 'we love you all!', hearts: true, crowd2: true },
    { sign: 'gemini', cap: 'turns the singles table *into a game show.*', act: 'cheer', prop: { kind: 'sign', text: 'SINGLES TABLE', w: 440, size: 42, from: 0.2 }, say: 'singles table? WINNERS table.', crowd2: true, confetti: true, say2: 'okay, who wants a game?' },
    { sign: 'sagittarius', cap: 'tells a travel story *for 45 minutes.*', prop: { kind: 'map', from: 0.3 }, say: 'so there I was, on a ferry—', say2: 'and THAT’S how the goat became my roommate.', crowd2: true },
    { sign: 'virgo', cap: 're-wraps *other people’s gifts.*', prop: { kind: 'gift', from: 0.2, col: '#c9a6ff' }, say: 'by size. by colour. by vibe.', prop2: { kind: 'list', lines: ['gifts: sorted', 'cards: matched', 'bows: fluffed'], at: 'side', k: 0.7 }, say2: 'there. NOW it’s a party.' },
    { sign: 'capricorn', cap: 'networks *with the caterer.*', guest: { color: '#e6e6e6', name: 'CATERER', side: 'l' }, say: 'so, what’s your five-year plan?', say2: 'finally, someone asks!', hearts: true },
    { sign: 'libra', cap: 'slow-dances with Grandma. *Grandma leads.*', act: 'sway', guest: { color: '#e8d8ff', name: 'GRANDMA', side: 'r', hat: false }, say: 'may I have this dance?', say2: 'you’re a lovely dancer!', hearts: true },
    { sign: 'aquarius', cap: 'starts a singles-table *group photo.*', say: 'singles table, squish in!', prop2: { kind: 'camera', label: 'best photo of the night' }, crowd2: true, confetti: true, say2By: 'hero', say2: 'everyone say “thriving”!' },
    { sign: 'leo', cap: 'gives a *twelve-minute* toast.', prop: { kind: 'mic', at: 'side', from: 0.2, k: 0.9 }, say: 'a few words. about me, first.', say2: '…to love! and to cake!', crowd2: true, hearts: true },
    { sign: 'scorpio', cap: 'says one line. *the room sobs.*', mood: 'squint', say: 'you two make each other braver.', prop2: { kind: 'tissues', label: 'the whole room' }, crowd2: true, mood2: 'happy' },
    { sign: 'cancer', cap: 'the couple *thanks the singles table.*', guest: { sign: 'taurus', name: 'TAURUS', side: 'l' }, say: 'you made tonight SO fun!', say2: 'next party? your table plans it!', hearts: true, crowd2: true },
    { sign: 'pisces', cap: 'cried *the entire party.* happy tears. mostly.', say: 'I’m just SO happy for them…', prop2: { kind: 'cake', label: 'cried at the cake too' }, say2: 'and for me. I’m great.', confetti: true, crowd2: true },
  ],
  last: 'Their love story doesn’t *rush* yours.',
  loop: false,
  room: { wreath: false, wallSign: 'CONGRATS!', wallW: 330, wallSize: 46, wallCol: '#f2c75c' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the kit's slam title and promise sticker are removed in ./partyfull.js)
export const HOOK = 'Engagement party. | Still single. *Thriving.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.8
