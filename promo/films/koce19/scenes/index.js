// koce19 · ONE CARD, TWO PEOPLE ep 19 (long) · "Card three: who says it first" (60.2 s vertical, star_advice post, synthwave · E).
//   Hard cut. Pisces plays this one, so THE STARS deal. Three cards in one night; the third changes things.
//   0.0   frame 0: Gemini mid-gasp, Pisces mid-sob, three cards in the air, the third pulsing pink. Hook: "Who says 'I love
//         you' *first?*"  Whip zoom at 0.55. Promise: WAIT FOR CARD 3.
//   1.1   CARD 1 "What does a perfect lazy Sunday look like for you?" (ev2) → GEMINI "five plans. one day." PISCES "one
//         blanket. zero plans."  → "plan one: your blanket."
//   18.0  CARD 2 "Planned date or spontaneous date?" (ro2, pick) → both Spontaneous → a surprise picnic, right now.
//   36.2  CARD 3 "Who's more likely to say 'I love you' first?" (ro4, who) → both point at themselves. A stand-off. Pisces
//         says it first, crying. Gemini: "…i was about to."
//   58.8  last line "Okay. *Pisces* said it first." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, hand, drawCard, win } from '../../koce01/scenes/cardkit.js'

const C1 = { q: 'What does a *perfect lazy Sunday* look like for you?', topic: 'everyday', kind: 'ask', at: 1.1, big: 4.2, write: 4.5, reveal: 7.1, done: 17.6, ans: { A: 'five plans. *one day.*', B: 'one blanket. *zero plans.*' } }
const C2 = { q: '*Planned* date or *spontaneous* date?', topic: 'romance', kind: 'pick', opts: ['Planned', 'Spontaneous'], deal: 18.0, at: 19.2, big: 21.8, write: 22.1, reveal: 24.7, done: 35.8, ans: { A: '*Spontaneous!*', B: '*Spontaneous!*' } }
const C3 = { q: 'Who’s more likely to say *“I love you”* first?', topic: 'romance', kind: 'who', rare: 'rare', deal: 36.2, at: 37.4, big: 40.4, write: 40.8, reveal: 43.6, done: 57.8, ans: { A: '*me.*', B: '*me.*' } }
const PIC = [27.6, 35.6], STAND = [45.0, 48.0]
function blanket(x, r, k) { if (k <= 0.01 || !r) return; x.save(); x.globalAlpha = clamp(k * 2); const cx = r.x, y = r.y - 60 - (1 - k) * 300
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, y, 210, 160, 0, Math.PI, 0); x.fill(); x.fillStyle = '#7fc8f0'; x.beginPath(); x.ellipse(cx, y, 200, 150, 0, Math.PI, 0); x.fill()
  R(x, INK, cx - 212, y - 4, 78, 220); R(x, '#7fc8f0', cx - 204, y - 4, 64, 212); R(x, INK, cx + 134, y - 4, 78, 220); R(x, '#7fc8f0', cx + 140, y - 4, 64, 212)
  R(x, INK, cx - 212, y - 14, 424, 26); R(x, '#5aa8d8', cx - 204, y - 10, 408, 16); for (let i = 0; i < 4; i++) R(x, '#bfeaff', cx - 130 + i * 70, y - 110 + (i % 2) * 40, 34, 34); x.restore() }
function picnic(x, t, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = clamp(k * 2); x.translate(540, 1280); x.scale(k, k)
  for (let j = 0; j < 2; j++) for (let i = 0; i < 8; i++) R(x, (i + j) % 2 ? '#e8344e' : '#fbf7ee', -320 + i * 80, -30 + j * 30, 80, 30)
  R(x, INK, -60, -96, 120, 70); R(x, '#a87048', -54, -90, 108, 58); R(x, INK, -40, -116, 80, 14)
  for (let i = 0; i < 5; i++) { R(x, INK, 120 + i * 30 - 2, -58, 24, 26); R(x, '#e8344e', 120 + i * 30, -56, 20, 22); R(x, '#2fc79a', 124 + i * 30, -62, 12, 6) }
  x.restore() }
const PLANS = ['1. brunch', '2. thrift shop', '3. park', '4. movie', '5. karaoke']
const F = makeFilm({
  id: 'koce19', dur: 60.2, ending: 'cut', brk: 'whip',
  A: 'gemini', B: 'pisces',
  hook: { text: 'Who says “I love you” *first?*', out: 1.3 },
  cards: [C1, C2, C3],
  chapters: [{ at: 1.2, text: 'LAZY SUNDAY', dur: 3.4 }, { at: 18.1, text: 'THE DATE', dur: 3.4 }, { at: 36.3, text: 'THREE WORDS', dur: 4.0 }],
  lines: [
    { t: 7.8, who: 'B', text: 'five?? that’s not *lazy.*' },
    { t: 9.8, who: 'A', text: 'it’s lazy… *fast.*' },
    { t: 11.8, who: 'S', text: 'different speeds can still share a *sunday.*' },
    { t: 14.4, who: 'A', text: 'plan one: *your blanket.*' },
    { t: 25.4, who: 'B', text: 'wait. *same answer?*' },
    { t: 27.2, who: 'A', text: 'then… picnic. *right now.*' },
    { t: 31.4, who: 'S', text: 'saying yes to each other’s ideas is its own kind of *love.*' },
    { t: 44.8, who: 'A', text: '…*me.*' },
    { t: 46.2, who: 'B', text: 'no, *me.*' },
    { t: 48.4, who: 'B', text: 'i love you! *i said it!*' },
    { t: 50.6, who: 'A', text: '…i was *about to.*' },
    { t: 52.6, who: 'S', text: 'first doesn’t matter. *meaning it* does.' },
    { t: 55.2, who: 'A', text: 'i love you *too.*' },
  ],
  boxes: [{ from: 0, to: 4, open: 7.6, close: 17.5 }, { from: 4, to: 7, open: 25.2, close: 35.7 }, { from: 7, to: 13, open: 44.6, close: 58.4 }],
  stickers: [
    { at: 1.4, out: 4.6, text: 'WAIT FOR CARD 3', x: 540, y: 1600, rot: -0.04, col: PINK, size: 44 },
    { at: 24.9, out: 26.4, text: 'SAME ANSWER!', x: 540, y: 960, rot: -0.05, col: '#9fe6b0', size: 50 },
    { at: PIC[0] + 0.3, out: PIC[1], text: 'SURPRISE PICNIC · RIGHT NOW', x: 540, y: 1080, rot: -0.04, col: '#ff8fb1', size: 34 },
    { at: STAND[0] + 0.1, out: STAND[1], text: 'STAND-OFF', x: 540, y: 960, rot: 0.04, col: '#ffc861', size: 52 },
  ],
  last: { at: 58.8, text: 'Okay. *Pisces* said it first.' },
  mood: {
    A: [[0, 'wide', [1, -1], -0.12], [1.1, 'wide', [0.4, -1]], [4.5, 'squint', [0.4, 1]], [7.1, 'sparkle', [1, -0.6]], [7.8, 'wide', [1, 0]], [9.8, 'wink', [1, 0]], [11.8, 'happy', [0, -1]], [14.4, 'sparkle', [1, 0]],
      [19.2, 'wide', [0.4, -1]], [22.1, 'squint', [0.4, 1]], [24.7, 'wide', [1, -0.6]], [25.4, 'sparkle', [1, 0]], [27.6, 'happy', [1, 0]], [31.4, 'happy', [0, -1]],
      [37.4, 'wide', [0.4, -1]], [40.8, 'squint', [0.4, 1]], [43.6, 'wide', [1, -0.6]], [44.8, 'squint', [1, 0]], [48.4, 'wide', [1, 0]], [50.6, 'sparkle', [1, 0]], [52.6, 'happy', [0, -1]], [55.2, 'heart', [1, 0]]],
    B: [[0, 'wide', [-1, -1], -0.1], [1.1, 'wide', [-0.4, -1]], [4.5, 'squint', [-0.4, 1]], [7.1, 'sleepy', [0, 0]], [7.8, 'wide', [-1, 0]], [9.8, 'happy', [-1, 0]], [11.8, 'happy', [0, -1]], [14.4, 'heart', [-1, 0]],
      [19.2, 'wide', [-0.4, -1]], [22.1, 'squint', [-0.4, 1]], [24.7, 'wide', [-1, -0.6]], [25.4, 'sparkle', [-1, 0]], [27.6, 'happy', [-1, 0]], [31.4, 'happy', [0, -1]],
      [37.4, 'wide', [-0.4, -1]], [40.8, 'squint', [-0.4, 1]], [43.6, 'wide', [-1, -0.6]], [44.8, 'squint', [-1, 0]], [48.0, 'wide', [-1, 0], -0.12], [48.4, 'sparkle', [-1, 0]], [50.6, 'happy', [-1, 0]], [55.2, 'heart', [-1, 0]]],
    S: [[0, 'wide', [0, -1]], [1.1, 'happy', [0, -1]], [4.5, 'neutral', [0, 1]], [7.1, 'wide', [0, -1]], [8.0, 'happy', [0, 0]], [43.6, 'wide', [0, -1]], [48.4, 'wide', [1, 0]], [49.4, 'happy', [0, 0]]],
  },
  cry: [[0, 1.2, 3], [9.8, 14.4, 1], [14.4, 17.6, 2], [24.9, 27.2, 2], [31.4, 35.6, 1], [44.8, 48.0, 1], [48.0, 50.6, 3], [50.6, 55.2, 2], [55.2, 60.2, 3]],
  offset: { A: t => [55 * ease.inOutCubic(prog(t, 55.4, 55.9)), 0], B: t => [-55 * ease.inOutCubic(prog(t, 55.4, 55.9)), -30 * Math.sin(Math.PI * prog(t, 48.0, 48.5))] },
  cam: [[0, 1, 540, 960], [7.4, 1, 540, 960], [8.1, 1.1, 540, 985], [17.4, 1.1, 540, 985], [18.0, 1, 540, 960], [25.0, 1, 540, 960], [25.7, 1.1, 540, 985], [35.6, 1.1, 540, 985], [36.2, 1, 540, 960],
    [44.0, 1, 540, 960], [44.7, 1.1, 540, 985], [57.6, 1.1, 540, 985], [58.2, 1.06, 540, 1020]],
  punch: [{ at: 7.15, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 24.75, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 43.65, dur: 1.0, z: 0.1, x: 540, y: 820 },
    { at: 45.2, dur: 0.8, z: 0.07, x: 420, y: 1000 }, { at: 46.4, dur: 0.8, z: 0.07, x: 660, y: 1000 }, { at: 48.4, dur: 1.4, z: 0.07, x: 640, y: 1000 }],
  draw: {
    cast(x, t, S) { blanket(x, S.r.B, win(t, 10.0, 17.4, 0.4, 0.4)) },
    mid(x, t) { picnic(x, t, ease.outBack(prog(t, PIC[0], PIC[0] + 0.45)) * (1 - ease.inCubic(prog(t, 35.3, 35.7)))) },
    front(x, t, S) {
      const k0 = 1 - ease.inCubic(prog(t, 0.6, 1.0))
      if (k0 > 0.01) { drawCard(x, t, C2, 300, 560, 200, { f: 0.2, rot: -0.5 + t, alpha: k0 }); drawCard(x, t, C3, 860, 520, 220, { f: 0.25, rot: 0.4 - t, alpha: k0, glint: (t * 2) % 1 }); sparkles(x, t, 860, 520, -0.2, { n: 10, Rr: 160, cols: [PINK, '#ff5c8a', BONE] }) }
      // Gemini's five plans tick in beside them
      const pk = win(t, 9.8, 13.8, 0.3, 0.3); if (pk > 0) { x.save(); x.globalAlpha = pk; R(x, INK, 70, 540, 330, 300); R(x, '#fff7dc', 76, 546, 318, 288); x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'left'; PLANS.forEach((p, i) => { if (t > 9.9 + i * 0.25) x.fillText(p, 96, 590 + i * 52) }); x.restore() }
      // the stand-off: both point at themselves
      const sk = win(t, STAND[0], STAND[1], 0.2, 0.2); if (sk > 0) { hand(x, S.r.A.x + 120, S.r.A.y - 30, -1, 9, '#ffe3c8', { alpha: sk }); hand(x, S.r.B.x - 120, S.r.B.y - 30, 1, 9, '#ffd2a8', { alpha: sk }) }
      if (t > 48.4 && t < 50.4) hearts(x, t, 48.45, S.r.B.x, S.r.B.top + 20, { n: 8, spread: 200 })
      if (t > 55.4) hearts(x, t, 55.45, 540, 1040, { n: 8, spread: 300 })
    },
  },
  extraCues: [['whoosh', 10.0, 0.4, 0.03], ...PLANS.map((_, i) => ['tick', +(9.9 + i * 0.25).toFixed(2), 0.05]), ['pop', PIC[0], 783.99, 0.05, 0], ['glitter', PIC[0] + 0.2, PIC[0] + 1.0],
    ['pop', 45.2, 330, 0.05, -0.4], ['pop', 46.4, 330, 0.05, 0.4], ['boom', 48.4, 0.25], ['bell', 48.45, 2093, 0.04, 1.6, 0], ['glitter', 48.4, 49.6], ['bell', 55.3, 1567.98, 0.035, 1.6, 0]],
})
export const { DURATION, SCENES, CUES } = F
