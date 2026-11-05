// koce06 · ONE CARD, TWO PEOPLE ep 6 · "How much alone time?" (22 s vertical, star_advice post, lofi · C). Hard cut.
//   Pisces plays this one, so THE STARS deal.
//   0.0   frame 0: Pisces mid-wail, Aquarius mid-retreat behind headphones, the card spinning. Hook: "Pisces did NOT
//         expect *this answer.*"  Whip zoom at 0.55.
//   1.1   the card (rare): "How much alone time do you need in a week?" (real card ev6, The Sun)
//   4.8   both answer · 7.6 the flip: AQUARIUS "one full evening." PISCES "…none? i'll miss you."
//   8.2   Pisces: "an evening? without me?"  Aquarius: "it's not away from you. i'll send you a sky pic."
//   13.6  THE STARS: alone time recharges the person you love.
//   15.9  THURSDAY, 9 PM: Aquarius in headphones; the notification drops: "look up. this one's yours." Pisces happy-sobs.
//   20.8  last line "Alone time, not *away* time." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, hearts, sparkles, drawPixelStar } from '../../koce01/scenes/cardkit.js'
import { notification, notificationCues } from '../../hookkit.js'
import { drawAquaHeadphones } from '../../st9aquahome.js'

const NOTE = { at: 16.4, out: [19.9, 20.3], title: 'AQUARIUS', body: 'look up. *this one’s yours.* ☾', glyph: '♒', color: '#38c4ec', time: '9:04 PM', y: 560 }
const PH = t => Math.max(1 - ease.inOutCubic(prog(t, 1.0, 1.6)), ease.inOutCubic(prog(t, 15.9, 16.4)))
const F = makeFilm({
  id: 'koce06', dur: 22, ending: 'cut', brk: 'whip',
  A: 'aquarius', B: 'pisces',
  hook: { text: 'Pisces did NOT expect *this answer.*', out: 1.25 },
  cards: [{ q: 'How much *alone time* do you need in a week?', topic: 'everyday', kind: 'ask', rare: 'rare', at: 1.1, big: 4.4, write: 4.8, reveal: 7.6, done: 15.6, ans: { A: 'one full *evening.*', B: '…none? i’ll *miss you.*' } }],
  lines: [
    { t: 8.2, who: 'B', text: 'an evening? *without me?*' },
    { t: 10.4, who: 'A', text: 'it’s not away from you. i’ll send you a *sky pic.*' },
    { t: 13.4, who: 'S', text: 'alone time recharges the person *you love.*' },
    { t: 17.0, who: 'B', text: '…i’m crying. *happy* crying.' },
  ],
  boxes: [{ from: 0, to: 3, open: 8.0, close: 15.8 }, { from: 3, to: 4, open: 16.8, close: 20.4 }],
  stickers: [{ at: 15.9, out: 20.3, text: 'THURSDAY · 9 PM', x: 540, y: 300, rot: -0.05, col: '#7fc8f0', size: 42 }],
  last: { at: 20.8, text: 'Alone time, not *away* time.' },
  mood: {
    A: [[0, 'squint', [-1, 0], 0.06], [1.1, 'wide', [0.4, -1]], [4.8, 'squint', [0.4, 1]], [7.6, 'neutral', [1, -0.6]], [8.2, 'wide', [1, 0]], [10.4, 'happy', [1, 0]], [13.4, 'happy', [0, -1]], [15.9, 'sleepy', [0, 0]], [16.4, 'happy', [0, -1]]],
    B: [[0, 'wide', [-1, -1], -0.12], [1.1, 'wide', [-0.4, -1]], [4.8, 'squint', [-0.4, 1]], [7.6, 'wide', [-1, -0.6]], [10.4, 'neutral', [-1, 0]], [12.0, 'sparkle', [-1, 0]], [13.4, 'happy', [0, -1]], [15.9, 'neutral', [0, -1]], [16.5, 'sparkle', [0, -1]]],
    S: [[0, 'wide', [0, -1]], [1.1, 'happy', [0, -1]], [4.8, 'neutral', [0, 1]], [7.6, 'wide', [0, -1]], [8.4, 'happy', [0, 0]]],
  },
  cry: [[0, 1.2, 3], [7.8, 10.4, 3], [10.4, 12.0, 2], [12.0, 15.9, 1], [16.5, 22, 3]],
  offset: { A: t => [-40 * (1 - ease.outCubic(prog(t, 0.5, 1.3))) - 60 * ease.inOutCubic(prog(t, 15.7, 16.2)), 0] },
  cam: [[0, 1, 540, 960], [7.4, 1, 540, 960], [8.1, 1.1, 540, 985], [15.5, 1.1, 540, 985], [16.1, 1.1, 540, 1060]],
  punch: [{ at: 7.65, dur: 1.1, z: 0.1, x: 540, y: 820 }],
  draw: {
    back(x, t) { // the night outside gets a big bright star when the sky pic lands
      if (t > 16.4) { const k = ease.outBack(prog(t, 16.4, 16.9)); drawPixelStar(x, 860, 640, 90 * k, 2, GOLD); sparkles(x, t, 860, 640, 16.5, { n: 10, Rr: 140 }) }
    },
    cast(x, t, S) { drawAquaHeadphones(x, S.r.A, S.r.A.size, { k: PH(t) }) },
    front(x, t, S) { if (t > 16.6) hearts(x, t, 16.7, S.r.B.x, S.r.B.top + 40, { n: 6, spread: 160 }) },
  },
  extraScenes: [notification(NOTE)],
  extraCues: [...notificationCues(NOTE), ['whoosh', 15.8, 0.4, 0.03], ['glitter', 16.4, 17.4]],
})
export const { DURATION, SCENES, CUES } = F
