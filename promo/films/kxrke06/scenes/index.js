// kxrke06: RANKING THE SIGNS: FULL COUNTDOWN, "Who’s the best at being single" (≈88 s vertical star_talk post, promo/films/month2/m43.md,
// music: house · G). No end card, no card cut; hard cut on the last line.
// The whole format lives in ../../kxrke01/scenes/rankfull.js (imported read-only): frame-0 crash + slam title, ranks
// #12 → #2 every 6 s with chapter stickers, 3-2-1 drumroll, #1 at 73.6, the twist at 80, THE STARS' last line, hard cut.
import { makeRankFull } from '../../kxrke01/scenes/rankfull.js'

const EP = makeRankFull({
  id: 'kxrke06',
  hook: 'Single season. | Who’s *thriving?*',
  hookProp: { kind: 'sign', text: 'TABLE FOR ONE', w: 480, size: 44, label: 'party of one', k: 1.15 },
  ranks: [
    { sign: 'sagittarius', tag: 'a solo trip. three cities.', say: 'party of one, three cities!', gag: { kind: 'ticket', text: '3 CITIES', sub: 'PARTY OF ONE', label: 'thriving' } },
    { sign: 'aquarius', tag: 'a new hobby every week', say: 'this week: pottery!', gag: { kind: 'list', lines: ['pottery', 'kites', 'star maps'], label: 'thriving' } },
    { sign: 'aries', tag: 'joined every class in town', say: 'salsa at six, climbing at eight!', gag: { kind: 'calendar', text: 'FULL', sub: 'THIS WEEK', label: 'busy, happy' } },
    { sign: 'capricorn', tag: 'built a whole career this year', say: 'single? I built an empire.', gag: { kind: 'slide', title: 'MY YEAR', label: 'up and to the right' } },
    { sign: 'leo', tag: 'dating themselves. great photos.', say: 'table for one, best seat!', gag: { kind: 'camera', label: 'the self-date' } },
    { sign: 'virgo', tag: 'a self-care schedule, actually kept', say: 'face mask, 8 PM. sharp.', gag: { kind: 'list', lines: ['face mask', 'early night', 'a good book'], label: 'actually kept' } },
    { sign: 'scorpio', tag: 'a mysterious solo era', say: 'my era. don’t ask.', mood: 'squint', gag: { kind: 'moon', label: 'mysterious' } },
    { sign: 'taurus', tag: 'thriving. the dessert is for two.', say: 'more cake for me, then.', gag: { kind: 'snack', label: 'a brave sacrifice' } },
    { sign: 'gemini', tag: '“just friends” with four people', say: 'we’re just friends! all four!', gag: { kind: 'phone', text: 'four chats', typing: true, label: 'it’s complicated' } },
    { sign: 'pisces', tag: 'cried at a couple holding hands', say: 'they’re so CUTE…', gag: { kind: 'tissues', label: 'happy for them (sob)' } },
    { sign: 'libra', tag: '“table for one?? me??”', say: 'table for… one?? me??', mood: 'wide', gag: { kind: 'sign', text: 'TABLE FOR 1', w: 420, size: 46, label: 'learning' } },
    { sign: 'cancer', tag: 'misses cuddles. adopted three plants.', say: 'these are my babies now.', gag: { kind: 'plant', label: 'three plants, zero regrets' } },
  ],
  twist: { who: 'GRANDMA', say: 'so… still single?', gag: { kind: 'big', text: 'THRIVING', size: 120, label: 'all twelve of them', labelDy: 110 }, cheer: 'YES. THRIVING.' },
  last: 'Single isn’t waiting. It’s *living.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
