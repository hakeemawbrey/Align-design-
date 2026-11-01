// trromecompliment: MY ROMAN EMPIRE, "Nice shoes." (20 s vertical, Star Talk Trends §7.1, music: cinematic · Cm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./rome.js (identical in all five episodes).
//   0.0–3.7   "What's your | *Roman Empire?*"  Columns rise; ♎ Libra (laurel wreath, tiny white sneakers on its two lower
//             points) stands on a plinth and dreams: thought puffs, a cloud with a "?".
//   3.9–7.4   "Mine? | *“Nice shoes.”*"  On the drop a marble SNEAKER booms up on a pedestal, god rays, dust. The
//             inscription carves on: “NICE SHOES.” / DATE ONE · IN PASSING. Libra's real sneakers twinkle; Libra
//             gives them a proud little shuffle. Pisces peeks from behind the column, already crying.
//   7.5–11.0  "Every. *Single.* | Day."  7:02 AM putting on *the* shoes · 1:15 PM someone looks at my feet: *gasp*
//             · 3:00 AM still awake. they said “*nice*.”
//  11.2       card cut.
//  11.3–13.4 "They *noticed.*"  ♎ LIBRA: "out of everything, they noticed my *shoes*."
//  13.45–15.5 "*Immortal* words."  The statue glints gold on the hit; Pisces fountains.
import { makeEpisode, R, INK, GOLD, sparkles } from './rome.js'

// the marble sneaker (heel left, toe right): marble body, gold laces, a gold star patch, gold sole stripe
const SNEAKER = [
  '.MMMMM..................',
  'MWWWWMM.................',
  'MWMMMMMG................',
  'MWMMMMGMG...............',
  'MWMMMMMGMG..............',
  'MWMMMMMMGMGM............',
  'MWMMMMMMMGMGMMM.........',
  'MWMMMvMMMMMMMMMMMMM.....',
  'MWMMMMvMGGMMMMMMMMMMMM..',
  'MWMMMMMGGGGMMMMMMMMMMMMM',
  'MMMMMMMMGGMMMMMMMMMMMMMM',
  'WWWWWWWWWWWWWWWWWWWWWWWW',
  'GGGGGGGGGGGGGGGGGGGGGGGG',
  '.dddddddddddddddddddddd.',
]
// Libra's own (tiny) sneakers, sprite cells, toe outward
const SHOE = ['WW....', 'WWWW..', 'WpWWWW', 'GGGGGG']

const EP = makeEpisode({
  id: 'trromecompliment', key: 'Cm', seed: 701,
  hero: { sign: 'libra', lineColor: '#ffb3d9' },
  h1: 'Mine? | *“Nice shoes.”*', h1Accent: '#ffb3d9', h1Late: 2,
  h3: 'They *noticed.*', h3Accent: '#ffb3d9',
  last: '*Immortal* words.', lastLate: 2, lastAccent: GOLD,
  mon: { bits: SNEAKER, cell: 12, inscription: ['“NICE SHOES.”', 'DATE ONE · IN PASSING'], size1: 34, size2: 23 },
  stickers: [
    { time: '7:02 AM', text: 'putting on *the* shoes' },
    { time: '1:15 PM', text: 'someone looks at my feet: *gasp*' },
    { time: '3:00 AM', text: 'still awake. they said “*nice*.”' },
  ],
  line: { who: 'hero', text: 'out of everything, they noticed my *shoes*.' },
  moods(ph, t, T) {
    if (ph === 'mon' && t > 5.95 && t < 6.9) return { mood: 'happy', look: [0, 1] }     // admiring its own feet
    if (ph === 'twist' && t > T.lineDone) return { mood: 'heart' }
    return null
  },
  heroProp(x, F, t, T) {
    // the shuffle: the shoes tap up and down while Libra shows them off
    const sh = t > 6.0 && t < 6.9 ? Math.max(0, Math.sin((t - 6.0) * 14)) * 1.2 : 0
    for (const [cx, d, ph] of [[7.0, -1, 0], [29.0, 1, 1]]) {
      const lift = ph ? sh : (t > 6.0 && t < 6.9 ? Math.max(0, -Math.sin((t - 6.0) * 14)) * 1.2 : 0)
      x.save(); x.translate(cx, 34.4 - lift); x.scale(d * 1.45, 1.45)
      const cols = { W: '#fffaf0', p: '#ff8fb1', G }
      for (let j = 0; j < SHOE.length; j++) for (let i = 0; i < SHOE[0].length; i++) {
        const ch = SHOE[j][i]; if (ch === '.') continue
        // ink outline cell behind
        x.fillStyle = INK; x.fillRect(i - 3 - 0.35, j - 2 - 0.35, 1.7, 1.7)
      }
      for (let j = 0; j < SHOE.length; j++) for (let i = 0; i < SHOE[0].length; i++) {
        const ch = SHOE[j][i]; if (ch === '.') continue
        x.fillStyle = ch === 'G' ? GOLD : cols[ch]; x.fillRect(i - 3, j - 2, 1.02, 1.02)
      }
      x.restore()
    }
  },
  front(x, t, T, ctx) {
    // the shoes twinkle when the statue lands and during the shuffle
    if (!ctx.hero) return
    const F = ctx.hero.F
    for (const t0 of [T.land + 0.25, 6.05, 6.55]) {
      sparkles(x, t, F.ox - 0.29 * F.S, F.oy + 6, t0, 4, 34, t0, [GOLD, '#ffffff'], 0.5)
      sparkles(x, t, F.ox + 0.31 * F.S, F.oy + 6, t0 + 0.08, 4, 34, t0 + 1, [GOLD, '#ffffff'], 0.5)
    }
    void R
  },
  cues: T => [
    ['pop', T.land + 0.25, 1567.98, 0.03, -0.3], ['pop', T.land + 0.33, 1760, 0.03, 0.3],
    ...[6.0, 6.22, 6.45, 6.67].map((s, i) => ['tick', s, 0.04 + (i % 2) * 0.01]), ['bell', 6.05, 2093, 0.02, 0.6, -0.2], ['bell', 6.55, 2349.32, 0.02, 0.6, 0.2],
  ],
})
const G = GOLD

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
