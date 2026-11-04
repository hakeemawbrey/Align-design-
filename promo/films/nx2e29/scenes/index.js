// nx2e29 (50 s vertical, "Star Talk Explains, Volume 2", ep 29) · story 0–45.6, then the default end card.
//   ❓ "What's your *4th house*?"  Teacher: ♋ CANCER (pointer). Student: ♑ CAPRICORN. Pisces cries at the back desk.
//   THE HOUSE BOARD (x2kit): ✦ 12 houses from the rising sign; in many house systems the 4th starts at the IC, the bottom
//   of the chart (shaded yellow, "IC" under the wheel); HOME · FAMILY · ROOTS · PRIVATE YOU; the 10th, opposite, shades blue
//   (career, public life). ♥ family is who you're born to and who you build; hold boundaries kindly.
//   Last line: "Roots, *then* reach."
// The engine is ../../nx2e16/scenes/x2kit.js. Pure f(t).
import { houseEpisode } from '../../nx2e16/scenes/x2kit.js'

const EP = houseEpisode({
  id: 'nx2e29', house: 4, opposite: 10, ic: true, teacher: 'cancer', student: 'capricorn', key: 'Eb', duration: 50,
  q: 'What’s your | *4th house*?',
  lines: [
    ['student', '4th house. is that… *a corner office?*'],
    ['teacher', 'in astrology, your chart splits into *12 houses.*', { tag: 'astro', mark: 'wheel' }],
    ['teacher', 'in many systems, the 4th starts at *the IC.*', { mark: 'house' }],
    ['teacher', 'that’s the very *bottom* of the chart.'],
    ['teacher', 'astrologers read it as home, family, *roots.*', { mark: 'themes' }],
    ['teacher', 'and your *private* self. the you at home.', { mark: 'more' }],
    ['teacher', 'the 10th sits opposite: *career*, public life.', { mark: 'opp' }],
    ['student', 'the 10th. *my* favourite room.'],
    ['teacher', 'family: who you’re born to, *and* who you build.', { tag: 'tip' }],
    ['teacher', 'and this month, hold boundaries *kindly.*'],
    ['student', 'so i leave the office… *and go home.*', { bulb: true }],
  ],
  words: [
    { text: 'HOME', mark: 'themes', i: 0 }, { text: '*FAMILY*', mark: 'themes', i: 1, d: 0.5 }, { text: 'ROOTS', mark: 'themes', i: 2, d: 1.0 },
    { text: 'PRIVATE YOU', mark: 'more', i: 3 }, { text: '10TH: CAREER', mark: 'opp', i: 4.6, size: 26 },
  ],
  items: ['4th: *home*, family, roots', 'Starts at *the IC*', 'Born to, *and* built'],
  last: 'Roots, *then* reach.', lastWho: 'teacher',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
