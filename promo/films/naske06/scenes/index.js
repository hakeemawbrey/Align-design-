// naske06 · Ask the Stars, Volume 2, ep 6 · "I keep trying to fix their problems." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♍ Virgo, wrench raised high, its red toolbox open beside it, tools already flying out.
//   2.5   VIRGO: "sometimes they want a listener, not a fix."  chip ♍ MUTABLE EARTH · RULED BY MERCURY
//         tape, a manual ("FIX IT"), a second wrench pile up in the snow.
//   ~5.6  "ask: 'do you want advice, or a hug?'"  The lid slams shut (THUNK). Two little cards float up: ADVICE? · A HUG?
//   ~8.4  "both answers are okay. follow their lead."  The wrench is gone; it holds out a warm mug instead.
//   card cut → "Ask first. | *Then* help."  + TALK CARDS tie-in. Pisces (left) cries happily.
import { askFilm, drawBits, drawBurst, drawSign, floatHeart, spritePt, lerp, prog, ease, clamp, pop01, MUG, MUG_C, INK } from '../../naske01/askkit.js'

const WRENCH = ['G.G', 'GGG', '.G.', '.G.', '.G.', '.G.', '.G.', 'GGG', 'G.G']
const WRENCH_C = { G: '#c9c4d8' }
const TAPE = ['.SSS.', 'SSHSS', 'SH.HS', 'SSHSS', '.SSS.']
const TAPE_C = { S: '#c0c8d8', H: '#7a8398' }
const BOOK = ['BBBBBBB', 'BWWWWWB', 'BWBBBWB', 'BWWWWWB', 'BWBBWWB', 'BWWWWWB', 'BBBBBBB']
const BOOK_C = { B: '#3f7cf0', W: '#f5eedf' }
const BOX = ['RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRGGGGRRRR', 'RRRRRRRRRRRR', 'DDDDDDDDDDDD']
const BOX_C = { R: '#c8283c', G: '#f2c75c', D: '#7a1a26' }
const LID = ['...HHHHHH...', '...H....H...', 'RRRRRRRRRRRR']
const LID_C = { H: '#5a3a26', R: '#e8414f' }
const BX = 840, BY = 1170
const TOOLS = [
  { bm: TAPE, c: TAPE_C, cell: 15, at: 0.2, to: [690, 1195] },
  { bm: BOOK, c: BOOK_C, cell: 14, at: 2.9, to: [985, 1185] },
  { bm: WRENCH, c: WRENCH_C, cell: 13, at: 4.0, to: [930, 1205], rot: 1.5 },
]

const F = askFilm({
  id: 'naske06', sign: 'virgo',
  question: 'I keep trying to *fix* their problems.',
  lines: ['sometimes they want a listener, not a fix.', "ask: 'do you want advice, or a hug?'", 'both answers are okay. follow their lead.'],
  chip: '♍ MUTABLE EARTH · RULED BY MERCURY',
  last: 'Ask first. | *Then* help.', late: 2,
  tie: 'TALK CARDS · ANSWERS STAY HIDDEN<br>UNTIL YOU BOTH PLAY',
  hero: { x: 470, y: 1010, size: 340 },
  extraT: T => ({ shut: T.l[1] + 0.15, cards: T.l[1] + 0.9, mug: T.l[2] + 0.3 }),
  state(t, T) {
    if (t < T.shut) return { mood: 'squint', look: [1, 0], squash: 0.03 * Math.sin(t * 12) }
    if (t < T.shut + 0.5) return { mood: 'wide', look: [1, 0] }
    if (t < T.mug) return { mood: 'neutral', look: [0, -1] }
    return { mood: 'happy' }
  },
  back(x, t, T, H) {
    const ok = H.ok
    drawBits(x, BOX, BOX_C, BX, BY, 18 * ok)
    // the lid: open (tilted back) until the slam
    const s = ease.inCubic(prog(t, T.shut - 0.2, T.shut))
    drawBits(x, LID, LID_C, BX + lerp(80, 0, s), BY - 60 - lerp(50, 0, s), 18 * ok, { rot: lerp(1.2, 0, s) })
    for (const tl of TOOLS) {
      if (t < tl.at - 0.6) continue
      const p = clamp((t - tl.at + 0.6) / 0.6)
      const px = lerp(BX, tl.to[0], p), py = lerp(BY - 80, tl.to[1], p) - Math.sin(Math.PI * p) * 260
      drawBits(x, tl.bm, tl.c, px, py, tl.cell * ok, { rot: (tl.rot || 0) * p + (1 - p) * t * 6 })
    }
  },
  front(x, t, T, H) {
    const ok = H.ok
    const r = spritePt(H.F, 32, 13)
    // the raised wrench (shaking with effort) until the slam, then it drops
    if (t < T.shut + 0.6) {
      const d = ease.inQuad(prog(t, T.shut, T.shut + 0.6))
      drawBits(x, WRENCH, WRENCH_C, r.x + 20, r.y - 60 + d * 300, 12 * ok, { rot: 0.4 + d * 2 + 0.08 * Math.sin(t * 20), alpha: 1 - d })
    }
    drawBurst(x, BX, BY - 150, 90, t, T.shut, { word: 'THUNK', size: 40, life: 0.8 })
    // the two talk-style cards: ADVICE? · A HUG?
    const ck = pop01(t, T.cards, 0.4, 2.4) * (1 - prog(t, T.close - 0.2, T.close + 0.1))
    if (ck > 0.01) {
      drawSign(x, 330, 650 + Math.sin(t * 2) * 6, 'ADVICE?', { w: 280, size: 40, scale: ck, rot: -0.06, color: '#ef5c94' })
      drawSign(x, 750, 650 + Math.sin(t * 2 + 1) * 6, 'A HUG?', { w: 280, size: 40, scale: pop01(t, T.cards + 0.2, 0.4, 2.4) * ck, rot: 0.06, color: '#ef5c94' })
    }
    // the mug, offered from the right tip
    const mk = pop01(t, T.mug, 0.35, 2.4)
    if (mk > 0.01) {
      drawBits(x, MUG, MUG_C, r.x + 40, r.y + 10, 12 * mk * ok)
      x.save(); x.fillStyle = 'rgba(239,230,214,0.65)'
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i * 0.33) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * mk * ok; x.fillRect(Math.round(r.x + 20 + i * 16 + Math.sin(ph * 6 + i) * 6), Math.round(r.y - 40 - ph * 70), 8, 8) }
      x.restore()
    }
    floatHeart(x, t, T.mug + 0.4, r.x + 40, r.y - 60)
    floatHeart(x, t, T.h2Land, H.x - 80, H.y - 220)
  },
  cues: T => [
    ...TOOLS.flatMap(tl => [['whoosh', Math.max(0, tl.at - 0.6), 0.35, 0.025], ['tick', tl.at, 0.04]]),
    ['tick', 0.3, 0.02], ['tick', 0.6, 0.02],
    ['boom', T.shut, 0.14], ['tick', T.shut, 0.06], ['whoosh', T.cards, 0.35, 0.03], ['pop', T.cards + 0.1, 880, 0.035, -0.3], ['pop', T.cards + 0.3, 1046.5, 0.035, 0.3],
    ['pop', T.mug, 1174.66, 0.035, 0.2], ['glitter', T.mug + 0.1, T.mug + 0.5],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
