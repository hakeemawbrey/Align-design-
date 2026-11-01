// trhearlabel: HEAR ME OUT, "Virgo's label maker." (20 s vertical, Star Talk Trends §15.1, music: cinematic · Eb)
// Story 0–15.6, then the shared end card. The format look and timing live in ./hear.js (identical in all five episodes).
//   0.0–3.7   "Hear me *out.*"  The curtains open; ♐ Sagittarius (one sock on, keys lost) pops up behind the podium and
//             taps the mic: tap, tap, EEEEEE. The front row (♈ ♊ ♌ + ♓) flinches. Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   "Virgo's | *label maker.*"  On the drop the screen unrolls on a big pixel label maker; the caption types on.
//             Front row: "?", "…" (Gemini's eye-roll), "?". The needle drops to MEH.
//   7.5–11.0  "Okay. *Listen.*"  REASON 1 my keys have a *home* now · REASON 2 my snacks: *alphabetized.*
//             · REASON 3 my mug at theirs says “*YOURS.*”  The row comes round one by one; the needle climbs.
//  11.2       card cut.
//  11.3–13.4 "Plot *twist.*"  ♍ Virgo steps in stage left with the label maker: "I made one for *you*, too." It prints;
//             the strip flies across and sticks on Sagittarius: MINE.
//  13.45–15.5 "*Labeled*: mine."  The needle pins past SWOON; Gemini faints; Pisces fountains.
import { prog } from '../../../src/lib.js'
import { makeEpisode, R, INK, GOLD, BONE, MONO, drawBits, drawHeart, sparkles, pop01, r3 } from './hear.js'

// the label maker (tape feeding out the left side)
const LM = [
  '........bBBBBBBBBBBBBBBBBb',
  '........BBBBBBBBBBBBBBBBBB',
  '........BBSSSSSSSSSSSSSBBB',
  'TTTTTTTTBBSkkSkSkkSkSSSBBB',
  'TxTxxTxTBBSSSSSSSSSSSSSBBB',
  'TTTTTTTTBBBBBBBBBBBBBBBBBB',
  '........BBKkKkKkKkKkKkKBBB',
  '........BBBBBBBBBBBBBBBBBB',
  '........BBKkKkKkKkKkKkKBBB',
  '........BBBBBBBBBBBBBBBBBB',
  '........BBKkKkKkKkKkKkKBBB',
  '........BBBBBBBBBBBBBBBBBB',
  '........BBBBBRRRRRRBBBBBBB',
  '........bBBBBBBBBBBBBBBBBb',
]
const LM_COLS = { B: '#5fc9b8', b: '#3a9c8c', S: '#d6efb0', k: '#2c4a3a', K: '#efe6d6', T: '#fffdf7', x: INK, R: '#ff6b7a' }
// Sagittarius's one sock (sprite cells), on the left lower point
const SOCK = ['WW', 'WW', 'RR', 'WWW']

const EP = makeEpisode({
  id: 'trhearlabel', key: 'Eb', seed: 1501,
  hero: { sign: 'sagittarius', lineColor: '#ffb27a' },
  crowd: ['aries', 'gemini', 'leo'],
  guest: { sign: 'virgo', lineColor: '#9fe6b0' },
  h1: "Virgo's | *label maker.*", h1Accent: '#7fe0c8',
  h3: 'Plot *twist.*', h3Accent: '#9fe6b0',
  last: '*Labeled*: mine.', lastAccent: '#7fe0c8',
  screen: { bits: LM, cols: LM_COLS, cell: 11, caption: "VIRGO'S LABEL MAKER", capColor: '#7fe0c8' },
  stickers: ['my keys have a *home* now.', 'my snacks: *alphabetized.*', 'my mug at theirs says “*YOURS.*”'],
  line: { who: 'guest', text: 'I made one for *you*, too.' },
  fainter: 1,
  moods(ph, t, T) {
    if (ph === 'twist' && t < T.cut + 0.6) return { mood: 'wide', look: [-1, 0] }
    if (ph === 'twist' && t > T.lineDone + 0.55) return { mood: 'heart' }
    if (ph === 'twist') return { mood: 'sparkle', look: [-1, 0] }
    return null
  },
  guestMoods(t, T) { return t > T.lineDone + 0.5 ? { mood: 'happy' } : { mood: 'neutral', look: [1, -1] } },
  heroProp(x) {
    // one sock on (the lower-left point): chaos, lovingly
    const cols = { W: '#fffaf0', R: '#ff6b7a' }
    SOCK.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = INK; x.fillRect(6 + i - 0.3, 30 + j - 0.3, 1.6, 1.6) } }))
    SOCK.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = cols[ch]; x.fillRect(6 + i, 30 + j, 1.02, 1.02) } }))
  },
  front(x, t, T, ctx) {
    const PR = [r3(T.lineDone + 0.05), r3(T.lineDone + 0.4)], STICK = r3(T.lineDone + 0.55)
    // Virgo's label maker in hand
    if (ctx.guest && t > T.guestIn) {
      const G = ctx.guest
      const hx = G.x + 92, hy = G.F.cy + 14
      drawBits(x, LM, LM_COLS, hx, hy, 3.4 * pop01(t, T.guestIn + 0.2, 0.3, 2), { rot: -0.08 })
      // the strip prints out, then flies to the hero
      const pr = prog(t, ...PR), fly = prog(t, PR[1], STICK)
      if (pr > 0 && fly < 1 && ctx.hero) {
        const w = 40 + 110 * pr
        const sx = lerp(hx + 40 + w / 2, ctx.hero.x, fly), sy = lerp(hy - 6, ctx.hero.F.cy + 50, fly) - Math.sin(Math.PI * fly) * 120
        label(x, sx, sy, w, fly * -0.4 + (1 - fly) * 0.05, pr)
      }
    }
    // stuck on the hero
    if (ctx.hero && t >= STICK) {
      const k = pop01(t, STICK, 0.25, 3)
      x.save(); x.translate(ctx.hero.x + 6, ctx.hero.F.cy + 50); x.scale(k, k); x.translate(-ctx.hero.x - 6, -ctx.hero.F.cy - 50)
      label(x, ctx.hero.x + 6, ctx.hero.F.cy + 50, 150, -0.1, 1)
      x.restore()
      sparkles(x, t, ctx.hero.x, ctx.hero.F.cy + 50, STICK, 8, 110, 3, ['#7fe0c8', GOLD, BONE], 0.6)
    }
  },
  cues: T => {
    const P0 = r3(T.lineDone + 0.05)
    return [
      ...Array.from({ length: 9 }, (_, i) => ['tick', r3(P0 + i * 0.04), 0.03]), ['whoosh', r3(T.lineDone + 0.4), 0.3, 0.03],
      ['pop', r3(T.lineDone + 0.55), 1318.51, 0.05, 0], ['pluck', r3(T.lineDone + 0.6), 1567.98, 0.035, 0.5, 0],
    ]
  },
})
const lerp = (a, b, k) => a + (b - a) * k
/** a printed label strip: white tape, ink letters "MINE" + a tiny heart (only as much as has printed: frac) */
function label(x, cx, cy, w, rot, frac) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -w / 2 - 5, -27, w + 10, 54); R(x, '#fffdf7', -w / 2, -22, w, 44)
  x.beginPath(); x.rect(-w / 2, -22, w, 44); x.clip()
  x.font = `700 32px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('MINE', -60 + (1 - frac) * 0, 2)
  drawHeart(x, 48, 0, 3.4)
  x.restore()
}

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
