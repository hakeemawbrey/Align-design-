// nx2e30 (55 s vertical, "Star Talk Explains, Volume 2", ep 30, the volume's last) · story 0–50.6, then the end card.
//   ❓ "What's your *11th house*?"  Teacher: ♒ AQUARIUS (pointer). Student: ♌ LEO in its crown. Pisces cries at the back desk.
//   THE HOUSE BOARD (x2kit): ✦ 12 houses from the rising sign; the 11th sits high, just before the 12th (shaded yellow);
//   FRIENDS · GROUPS · COMMUNITY · HOPES + WISHES · AQUARIUS. ♥ friends are a love story too; a new-year wish is better
//   shared.  Lightbulb (Leo): "so my fan club… is my friends."  Last line: "Your friends are *the plot*."
// The engine is ../../nx2e16/scenes/x2kit.js. Pure f(t).
import { houseEpisode } from '../../nx2e16/scenes/x2kit.js'
import { drawCrown } from '../../nx2e16/scenes/props.js'

const EP = houseEpisode({
  id: 'nx2e30', house: 11, teacher: 'aquarius', student: 'leo', key: 'G', duration: 55,
  q: 'What’s your | *11th house*?',
  studentOpts: { prop: (x, r) => drawCrown(x, r.x, r.top + 4, Math.max(4, Math.round(r.size / 40))) },
  lines: [
    ['student', 'my 11th house? sounds *exclusive.* love it.'],
    ['teacher', 'your chart has *12 houses*, counted from rising.', { tag: 'astro', mark: 'wheel' }],
    ['teacher', 'the 11th sits *high*, just before the 12th.', { mark: 'house' }],
    ['teacher', 'astrologers read it as friends and *groups.*', { mark: 'themes' }],
    ['teacher', 'plus community, and *hopes and wishes.*', { mark: 'more' }],
    ['teacher', 'it’s often linked with *Aquarius.* hello.', { mark: 'link' }],
    ['student', 'friends? i thought this was *a love show.*'],
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
