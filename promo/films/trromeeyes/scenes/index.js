// trromeeyes: MY ROMAN EMPIRE, "The look." (20 s vertical, Star Talk Trends §7.5, music: cinematic · Gm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./rome.js (identical in all five episodes).
//   0.0–3.7   "What's your | *Roman Empire?*"  Columns rise; ♏ Scorpio (laurel wreath) stands on a plinth and dreams.
//   3.9–7.4   "Mine? | *The look.*"  On the drop a marble pair of EYES booms up, gold irises glancing sideways across
//             the room. The pedestal: THE LOOK / ACROSS THE ROOM · DATE ZERO. Scorpio does the look back at it (squint).
//   7.5–11.0  "Every. *Single.* | Day."  7:02 AM mirror: *practicing the look* · 1:15 PM eye contact with a
//             stranger: *no.* · 3:00 AM eyes closed. *still* seeing it.
//  11.2       card cut; the hero slides left and ♑ Capricorn steps in on a little plinth.
//  11.3–13.4 "Across *the room…*"  ♑ CAPRICORN: "wait. that's *my* Roman Empire too." A thought bubble pops over
//             Capricorn with the same marble eyes, looking back; a heart pops between the two. On the last line a gold
//             eye-contact beam joins the two stars.
//  13.45–15.5 "*Mutual* empire."  Pisces fountains.
import { makeEpisode, R, INK, GOLD, drawBits, MARBLE, POS, pop01, outK } from './rome.js'

// one almond eye (marble lids, gold iris, ink pupil); look = -1 … 1 (left … right)
function eye(look) {
  const w = 11, rows = ['...mmmmm...', '.mmMMMMMmm.', 'mMMMMMMMMMm', 'mMMMMMMMMMm', '.mmMMMMMmm.', '...mmmmm...']
  const ix = 5 + Math.round(look * 2)
  return rows.map((r, j) => [...r].map((ch, i) => {
    if (ch !== 'M') return ch
    const d = Math.abs(i - ix), inIris = j >= 1 && j <= 4 && d <= 1.5
    if (!inIris) return 'M'
    return (j === 2 || j === 3) && d <= 0.5 ? 'k' : (j === 1 && i === ix - 1 ? 'W' : 'G')
  }).join('')).join('|').split('|').map(s => s.padEnd(w, '.'))
}
const pair = look => { const a = eye(look), b = eye(look); return a.map((r, j) => r + '..' + b[j]) }
const brows = w => [' '.repeat(w)].map(() => '..mmmmmmm...' + '.' + '..mmmmmmm.')
const STATUE = [...brows(), '.'.repeat(24), ...pair(1)].map(r => r.padEnd(24, '.').slice(0, 24))
const SMALL = pair(-1)
const EYE_COLS = { k: INK }

const EP = makeEpisode({
  id: 'trromeeyes', key: 'Gm', seed: 705,
  hero: { sign: 'scorpio', lineColor: '#ff9db0' },
  date: { sign: 'capricorn', lineColor: '#c9e6a0' },
  h1: 'Mine? | *The look.*', h1Accent: '#ff8fa8', h1Late: 2,
  h3: 'Across *the room…*', h3Accent: '#c9e6a0',
  last: '*Mutual* empire.', lastLate: 2, lastAccent: GOLD,
  mon: { bits: STATUE, cols: EYE_COLS, cell: 13, inscription: ['THE LOOK', 'ACROSS THE ROOM · DATE ZERO'], size1: 34, size2: 21 },
  stickers: [
    { time: '7:02 AM', text: 'mirror: *practicing the look*' },
    { time: '1:15 PM', text: 'eye contact with a stranger: *no.*' },
    { time: '3:00 AM', text: 'eyes closed. *still* seeing it.' },
  ],
  line: { who: 'date', text: "wait. that's *my* Roman Empire too." },
  moods(ph, t, T) {
    if (ph === 'hook' && t > T.puffs[0]) return { mood: 'squint', look: [0, -1] }
    if (ph === 'mon' && t > 5.9) return { mood: 'squint', look: [0, -1] }
    if (ph === 'daily' && t > T.stk[2]) return { mood: 'sleepy' }
    if (ph === 'daily' && t > T.stk[1]) return { mood: 'wide', look: [-1, 0] }
    if (ph === 'twist') {
      if (t < T.line + 0.3) return { mood: 'squint', look: [1, 0] }
      if (t < T.lineDone + 0.2) return { mood: 'wide', look: [1, 0] }
      return { mood: 'heart', look: [1, 0] }
    }
    if (ph === 'last') return { mood: 'heart', look: [1, 0] }
    return null
  },
  dateMoods(t, T) { return t > T.lineDone ? { mood: 'heart', look: [-1, 0] } : { mood: 'sparkle', look: [-1, 0] } },
  front(x, t, T, ctx) {
    if (!ctx.date) return
    // the twist: the date's own Roman Empire, in a thought bubble: the same look, from the other side
    const k = pop01(t, T.line + 0.9, 0.35, 2.2) * outK(t, T.out)
    if (k > 0.01) {
      const bx = ctx.date.x + 30, by = ctx.date.y - 480
      for (const [dx, dy, r] of [[-40, 330, 10], [-26, 262, 14], [-12, 190, 18]]) { x.save(); x.translate(bx + dx, by + dy); x.scale(k, k); R(x, INK, -r - 4, -r - 4, 2 * r + 8, 2 * r + 8); R(x, '#efe6d6', -r, -r, 2 * r, 2 * r); x.restore() }
      x.save(); x.translate(bx, by); x.scale(k, k)
      const blobs = [[-70, 6, 50], [0, -18, 62], [70, 6, 50], [-30, 30, 50], [36, 30, 50]]
      for (const [ox, oy, r] of blobs) { x.fillStyle = INK; x.beginPath(); x.arc(ox, oy, r + 6, 0, Math.PI * 2); x.fill() }
      for (const [ox, oy, r] of blobs) { x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(ox, oy, r, 0, Math.PI * 2); x.fill() }
      drawBits(x, SMALL, { ...MARBLE, ...EYE_COLS }, 0, 8, 7)
      x.restore()
      // a heart pops between the statue's eyes and the bubble's
      const hk = pop01(t, T.line + 1.6, 0.3, 2.6)
      if (hk > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5d8f' }, bx - 135, by - 70, 7 * hk * (1 + 0.1 * Math.sin(t * 9)))
    }
    // the eye-contact beam between the two stars, on the last line
    if (!ctx.hero || t < T.last) return
    const a = pop01(t, T.last, 0.3, 1.5) * outK(t, T.out)
    const y = ctx.hero.F.oy - ctx.hero.F.S * 0.5
    x.save(); x.globalAlpha = Math.min(1, a) * (0.6 + 0.2 * Math.sin(t * 8))
    for (let px = ctx.hero.x + 110; px < ctx.date.x - 90; px += 26) R(x, GOLD, px, y + Math.sin(px * 0.05 + t * 6) * 4, 14, 6)
    x.restore()
  },
  cues: T => [
    ['pluck', 5.95, 392, 0.03, 0.6, -0.1],
    ['pop', +(T.line + 0.95).toFixed(3), 1318.51, 0.04, 0.2], ['bell', +(T.line + 1.65).toFixed(3), 1760, 0.03, 1.0, 0],
    ['riser', T.last, +(T.lastLand).toFixed(3), 0.02],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
