// kxrke04: RANKING THE SIGNS: FULL COUNTDOWN, "Who misses their ex the most at 2 a.m." (≈88 s vertical star_talk post, promo/films/month2/m43.md,
// music: dreamy · F). No end card, no card cut; hard cut on the last line.
// The whole format lives in ../../kxrke01/scenes/rankfull.js (imported read-only): frame-0 crash + slam title, ranks
// #12 → #2 every 6 s with chapter stickers, 3-2-1 drumroll, #1 at 73.6, the twist at 80, THE STARS' last line, hard cut.
import { makeRankFull } from '../../kxrke01/scenes/rankfull.js'

const EP = makeRankFull({
  id: 'kxrke04',
  hook: '2 a.m. Missing the ex. | *Who’s worst?*',
  hookProp: { kind: 'clock', h: 2, m: 0, label: '2:00 AM', k: 1.25 },
  ranks: [
    { sign: 'pisces', tag: 'crying to “your song”', say: 'this was OUR song…', gag: { kind: 'tissues', label: 'on repeat' } },
    { sign: 'cancer', tag: 'hugging the hoodie they kept', say: 'it still smells like them…', gag: { kind: 'hoodie', label: 'never returning it' } },
    { sign: 'scorpio', tag: 'reread the whole chat, twice', say: 'just checking something.', mood: 'squint', gag: { kind: 'phone', text: 'from the top', sub: 'reread #2', label: 'thorough' } },
    { sign: 'taurus', tag: 'eating your old favourite snack', say: 'this was our snack.', gag: { kind: 'snack', label: 'emotional support snack' } },
    { sign: 'virgo', tag: 'reorganising the closet at 2 a.m.', say: 'I’m fine. sorting socks.', gag: { kind: 'list', lines: ['socks', 'more socks', 'feelings'], label: 'coping, neatly' } },
    { sign: 'libra', tag: 'a playlist called “it’s fine”', say: 'it’s fine. it’s a vibe.', gag: { kind: 'phone', text: 'it’s fine', sub: 'PLAYLIST', label: 'not fine' } },
    { sign: 'gemini', tag: 'typed it. sent it to the group chat.', say: 'WRONG CHAT. WRONG CHAT.', mood: 'wide', gag: { kind: 'phone', text: 'miss u', sub: 'sent to: BESTIES', label: 'oops' } },
    { sign: 'leo', tag: 'scrolling their own glow-up photos', say: 'they miss THIS. clearly.', gag: { kind: 'camera', label: 'self-care' } },
    { sign: 'aquarius', tag: 'got distracted by the moon', say: 'miss who? look, the moon!', gag: { kind: 'moon', label: 'distracted' } },
    { sign: 'sagittarius', tag: 'booked a trip instead', say: 'miss them? new city!', gag: { kind: 'ticket', text: 'ANYWHERE', label: 'running (to a beach)' } },
    { sign: 'aries', tag: 'missed them for four minutes. push-ups.', say: 'okay, sad’s done. push-ups!', gag: { kind: 'big', text: '+20', size: 130, label: 'moved on', labelDy: 110 } },
    { sign: 'capricorn', tag: 'asleep since ten', say: 'zzz…', mood: 'sleepy', gag: { kind: 'clock', h: 10, m: 0, label: 'early bird' } },
  ],
  twist: { who: 'THE STARS', say: 'okay. phones on chargers.', gag: { kind: 'charger', label: 'lights out' }, cheer: 'goodnight…', mood: 'sleepy' },
  last: 'Miss them. Don’t text. *Sleep.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
