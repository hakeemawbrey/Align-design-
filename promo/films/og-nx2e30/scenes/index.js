// og-nx2e30: social rework (static HOOK; no question card / series bug / end fade via ./x2kit.js copy;
// a VIP-only Leo and an obviously-Aquarius teacher). Was:
// nx2e30 (53 s vertical, "Star Talk Explains, Volume 2", ep 30, the volume's last) · story 0–50.6, then the short end card.
//   ❓ "What's your *11th house*?"  Teacher: ♒ AQUARIUS (pointer). Student: ♌ LEO in its crown. Pisces cries at the back desk.
//   THE HOUSE BOARD (x2kit): ✦ 12 houses from the rising sign; the 11th sits high, just before the 12th (shaded yellow);
//   FRIENDS · GROUPS · COMMUNITY · HOPES + WISHES · AQUARIUS. ♥ friends are a love story too; a new-year wish is better
//   shared.  Lightbulb (Leo): "so my fan club… is my friends."  Last line: "Your friends are *the plot*."
// The engine is ../../nx2e16/scenes/x2kit.js. Pure f(t).
import { houseEpisode } from './x2kit.js'   // og: this film's own copy
import { drawCrown } from '../../nx2e16/scenes/props.js'

const EP = houseEpisode({
  id: 'og-nx2e30', house: 11, teacher: 'aquarius', student: 'leo', key: 'G', duration: 53,
  q: 'What’s your | *11th house*?',
  studentOpts: { prop: (x, r) => drawCrown(x, r.x, r.top + 4, Math.max(4, Math.round(r.size / 40))) },
  lines: [
    ['student', 'my 11th house? sounds *VIP only.* love it.'],
    ['teacher', 'your chart has *12 houses*, counted from rising.', { tag: 'astro', mark: 'wheel' }],
    ['teacher', 'the 11th sits *high*, just before the 12th.', { mark: 'house' }],
    ['teacher', 'astrologers read it as friends and *groups.*', { mark: 'themes' }],
    ['teacher', 'plus community, and *hopes and wishes.*', { mark: 'more' }],
    ['teacher', 'it’s often linked with *Aquarius.* obviously.', { mark: 'link' }],
    ['student', 'friends? i thought this show was *about me.*'],
    ['teacher', 'friends are a love story too. *tell them.*', { tag: 'tip' }],
    ['teacher', 'and a new-year wish is better *shared.*'],
    ['student', 'so i say my wish… *to my friends?*'],
    ['teacher', 'out loud. then help with *theirs.*'],
    ['student', 'so my fan club… is *my friends.* i love them.', { bulb: true }],
  ],
  words: [
    { text: '*FRIENDS*', mark: 'themes', i: 0 }, { text: 'GROUPS', mark: 'themes', i: 1, d: 0.6 },
    { text: 'COMMUNITY', mark: 'more', i: 2 }, { text: 'HOPES +|WISHES', mark: 'more', i: 3, d: 0.6, size: 28 },
    { text: 'AQUARIUS', mark: 'link', i: 4.8, size: 26 },
  ],
  items: ['11th: *friends*, groups', 'Hopes *and* wishes', 'Tell your *friends*'],
  last: 'Your friends are *the plot*.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T

// og (social): static TikTok-style hook, on screen from frame 1 over the classroom
export const HOOK = 'Friends are | *a love story too.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
