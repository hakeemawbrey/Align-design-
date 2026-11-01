// trhearcoffee: HEAR ME OUT, "They remember my order." (20 s vertical, Star Talk Trends §15.3, music: cinematic · G)
// Story 0–15.6, then the shared end card. The format look and timing live in ./hear.js (identical in all five episodes).
//   0.0–3.7   "Hear me *out.*"  The curtains open; ♊ Gemini pops up behind the podium, taps the mic: tap, tap, EEEEEE.
//             The front row (♉ ♏ ♎ + ♓) flinches. Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   "They remember | *my order.*"  On the drop the screen unrolls on a steaming takeaway cup (heart sleeve) with
//             a receipt that keeps unspooling; the caption types on. Front row: "?", "…" (Scorpio's eye-roll), "?".
//   7.5–11.0  "Okay. *Listen.*"  REASON 1 my order has *six* parts. · REASON 2 they said it back. *in order.*
//             · REASON 3 I changed it once. they *noticed.*  The row comes round one by one; the needle climbs.
//  11.2       card cut.
//  11.3–13.4 "And the *milk?*"  ♊ GEMINI: "they even knew: *oat milk*, extra hot."
//  13.45–15.5 "*Oat* of this world."  The cup on the screen blasts off like a rocket; the needle pins past SWOON;
//             Scorpio faints; Pisces fountains.
import { prog, ease } from '../../../src/lib.js'
import { makeEpisode, R, INK, drawBits, pop01, r3 } from './hear.js'

const CUP = [
  '..LLLLLLLLLL..',
  '.LLLLLLLLLLLL.',
  'LLLLLLLLLLLLLL',
  '.CCCCCCCCCCCC.',
  '.CCCCCCCCCCCC.',
  '..CCCCCCCCCC..',
  '..SSSSSSSSSS..',
  '..SSSHHSHHSS..',
  '..SSSHHHHHSS..',
  '..SSSSHHHSSS..',
  '..SSSSSHSSSS..',
  '..SSSSSSSSSS..',
  '...CCCCCCCC...',
  '...CCCCCCCC...',
  '...CCCCCCCC...',
  '....CCCCCC....',
]
const CUP_COLS = { L: '#5b5670', C: '#fffaf0', S: '#c98b5a', H: '#ff4f86' }

const EP = makeEpisode({
  id: 'trhearcoffee', key: 'G', seed: 1503,
  hero: { sign: 'gemini', lineColor: '#ffe27a' },
  crowd: ['taurus', 'scorpio', 'libra'],
  h1: 'They remember | *my order.*', h1Accent: '#e8c39a', h1Late: 2,
  h3: 'And the *milk?*', h3Accent: '#fffaf0',
  last: '*Oat* of this world.', lastAccent: '#e8c39a', lastLate: 1,
  screen: { bits: ['.'], cols: {}, cell: 1, caption: 'THEY REMEMBER MY ORDER.', capColor: '#e8c39a' },
  stickers: ['my order has *six* parts.', 'they said it back. *in order.*', 'I changed it once. they *noticed.*'],
  line: { who: 'hero', text: 'they even knew: *oat milk*, extra hot.' },
  fainter: 1,
  moods(ph, t, T) {
    if (ph === 'twist' && t > T.lineDone) return { mood: 'heart' }
    return null
  },
  screenDraw(x, t, T, ctx, S) {
    const pk = pop01(t, T.land - 0.1, 0.35, 2.2)
    if (pk <= 0.01) return
    const cell = 10 * pk
    const lift = ease.inCubic(prog(t, T.lastLand - 0.05, T.lastLand + 0.7)) * 420
    const cx = S.cx - 40, cy = S.cy + 6 - lift + (lift > 0 ? Math.sin(t * 60) * 2 : 0)
    // the receipt: unspools down and to the right the whole time (the order is long)
    const rl = Math.min(150, 20 + Math.max(0, t - T.land) * 26)
    if (lift < 40) {
      const rx = cx + 70, ry = cy - 30
      R(x, INK, rx - 4, ry - 4, 70, rl + 8); R(x, '#fffdf7', rx, ry, 62, rl)
      for (let i = 0; i * 14 + 12 < rl; i++) R(x, i % 3 === 2 ? '#e8c39a' : '#b7ab9a', rx + 8, ry + 10 + i * 14, 30 + ((i * 17) % 20), 5)
      for (let i = 0; i < 62; i += 8) R(x, '#fffdf7', rx + i, ry + rl, 4, 4)
    }
    // the rocket flame (on the last line)
    if (lift > 0) {
      for (let i = 0; i < 6; i++) {
        const fy = cy + 8 * cell + 10 + i * 18 + (t * 400 % 18), w = (6 - i) * 7 + 6 * Math.sin(t * 40 + i)
        R(x, i < 2 ? '#fff1c8' : i < 4 ? '#ffb347' : '#ff6b5a', cx - w / 2, fy, w, 16)
      }
    }
    // steam
    if (lift <= 0) for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) {
      const ph = (t * 0.8 + i * 0.33) % 1
      x.globalAlpha = Math.sin(Math.PI * ph) * 0.8
      R(x, '#b7ab9a', cx - 36 + i * 36 + Math.round(Math.sin(ph * 6 + j) * 6), cy - 8 * cell - 14 - ph * 40 - j * 12, 8, 8)
      x.globalAlpha = 1
    }
    drawBits(x, CUP, CUP_COLS, cx, cy, cell)
  },
  cues: T => [
    ['riser', r3(T.lastLand - 0.25), r3(T.lastLand + 0.1), 0.03], ['whoosh', T.lastLand, 0.8, 0.05], ['boom', r3(T.lastLand + 0.02), 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
