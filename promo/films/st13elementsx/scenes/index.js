// st13elementsx (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E12) · story 0–25.6, then the end card.
//   ❓ "Fire, earth, air, water: *which* are you?"  Teacher: THE STARS (pointer). Student: ♌ LEO ("only fire?").
//   THE BOARD: four columns, each with a pixel element icon and its three signs (✦ fire Aries, Leo, Sagittarius; earth
//   Taurus, Virgo, Capricorn; air Gemini, Libra, Aquarius; water Cancer, Scorpio, Pisces), then a bracket under all four
//   (✦ most charts mix several elements).
//   Lightbulb: "so I'm not a bonfire. I'm a whole kitchen." Last line (Leo): "All four make a *meal*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { signStar, STAR } from '../../startalk.js'
import { chalkLine, EX } from '../../stexplain.js'
import { makeEpisode, R, INK, pop01 } from './classkit.js'

const LEO = signStar('leo')

const ICONS = {
  fire: { rows: ['...X...', '..XX...', '..XXX..', '.XXYX..', '.XYYXX.', 'XXYYYXX', 'XYYWYYX', '.XYYYX.'], pal: { X: '#ff5a3a', Y: '#ffb340', W: '#fff2a8' } },
  earth: { rows: ['.......', '...X...', '..XXX..', '..XLX..', '.XXLXX.', '.XLLLX.', 'XXXLXXX', 'BBBBBBB'], pal: { X: '#5fc46a', L: '#a8f0b8', B: '#a8693a' } },
  air: { rows: ['.XXXX..', 'X....X.', '...XX..', 'XXXX...', '.......', 'XXXXXX.', '.....XX', '..XXXX.'], pal: { X: '#bfe9ff' } },
  water: { rows: ['...X...', '...X...', '..XXX..', '.XXXXX.', 'XXXWXXX', 'XXWXXXX', 'XXXXXXX', '.XXXXX.'], pal: { X: '#4f9dff', W: '#cfe8ff' } },
}
const COLS = [
  { id: 'fire', name: 'FIRE', signs: 'ARIES|*LEO*|SAGITTARIUS', color: '#ff9a6a' },
  { id: 'earth', name: 'EARTH', signs: 'TAURUS|VIRGO|CAPRICORN', color: '#a8f0b8' },
  { id: 'air', name: 'AIR', signs: 'GEMINI|LIBRA|AQUARIUS', color: '#cfeeff' },
  { id: 'water', name: 'WATER', signs: 'CANCER|SCORPIO|PISCES', color: '#9fc8ff' },
]
const colAt = (M, i) => M.el + 0.5 + i * 1.05

const EP = makeEpisode({
  id: 'st13elementsx', numeral: 'S13 E12', duration: 30, key: 'G',
  q: 'Fire, earth, air, water: | *which* are you?', qAccent: '#ff9a6a',
  teacher: { tag: '★ THE STARS', color: STAR.sky, pitch: 494, pointer: true },
  student: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, pitch: 659 },
  boardTitle: 'THE 4 ELEMENTS',
  lines: [
    ['student', 'I’m a Leo. so I’m… *fire?* only fire?'],
    ['teacher', 'in astrology, each element holds *3 signs.*', { tag: 'astro', mark: 'el' }],
    ['teacher', 'fire, earth, air, water. *four* teams.', { mark: 'four' }],
    ['teacher', 'and most charts *mix* several elements.', { tag: 'astro', mark: 'mix' }],
    ['student', 'so I’m not a bonfire. I’m a *whole kitchen.*', { bulb: true }],
  ],
  items: ['*4* elements, 3 signs each', 'Most charts *mix* them'],
  last: 'All four make a *meal*.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'happy' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'neutral', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 3) return [{ mood: 'wink', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
  },
  chalk: M => [
    ...COLS.flatMap((c, i) => [
      { text: c.name, at: colAt(M, i) + 0.2, u: 0.125 + i * 0.25, v: 0.38, size: 34, color: c.color, align: 'center', cps: 26 },
      { text: c.signs, at: colAt(M, i) + 0.45, u: 0.125 + i * 0.25, v: 0.54, size: 27, align: 'center', cps: 34, lineH: 1.45 },
    ]),
    { text: 'MOST CHARTS *MIX* THEM', at: M.mix + 1.0, u: 0.5, v: 0.94, size: 34, align: 'center' },
  ],
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0
    COLS.forEach((c, i) => {
      const cx = B.x0 + (0.125 + i * 0.25) * W, cy = B.y0 + 0.22 * H
      const p = pop01(t, colAt(M, i), 0.3, 2.6)
      if (p > 0) {
        const ic = ICONS[c.id], px = 9 * p, w = 7 * px
        ic.rows.forEach((row, j) => [...row].forEach((ch, k) => { if (ic.pal[ch]) R(x, INK, cx - w / 2 + k * px - 2, cy - w / 2 + j * px - 2, px + 4, px + 4) }))
        ic.rows.forEach((row, j) => [...row].forEach((ch, k) => { const col = ic.pal[ch]; if (col) R(x, col, cx - w / 2 + k * px, cy - w / 2 + j * px, px, px) }))
      }
      if (i > 0) chalkLine(x, t, { pts: [[B.x0 + i * 0.25 * W, B.y0 + 0.1 * H], [B.x0 + i * 0.25 * W, B.y0 + 0.74 * H]], at: colAt(M, i) - 0.2, dur: 0.3, width: 3, color: 'rgba(244,241,232,0.4)' })
    })
    // the bracket under all four: most charts mix them
    const by = B.y0 + 0.81 * H
    chalkLine(x, t, { pts: [[B.x0 + 0.04 * W, by - 14], [B.x0 + 0.04 * W, by], [B.x0 + 0.96 * W, by], [B.x0 + 0.96 * W, by - 14]], at: M.mix + 0.3, dur: 0.6, color: EX.chalkYellow, width: 5 })
    chalkLine(x, t, { pts: [[B.x0 + 0.5 * W, by], [B.x0 + 0.5 * W, by + 18]], at: M.mix + 0.85, dur: 0.15, color: EX.chalkYellow, width: 5 })
  },
  cues: T => COLS.map((c, i) => ['pop', +colAt(T.M, i).toFixed(3), [783.99, 880, 987.77, 1174.66][i], 0.04, (i - 1.5) * 0.25]),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
