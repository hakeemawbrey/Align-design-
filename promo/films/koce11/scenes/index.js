// koce11 · ONE CARD, TWO PEOPLE ep 11 · "How do you like to be shown love?" (22.5 s vertical, star_advice post, dreamy · Eb). Hard cut.
//   Pisces plays this one, so THE STARS deal.
//   0.0   frame 0: Pisces mid-sob holding a handwritten note, Taurus mid-hammer on a wobbly shelf, the card spinning.
//         Hook: "Same love. Different languages. *Flip it.*"  Colour flash + shake at 0.5.
//   1.1   the card: "How do you most like to be shown love: words, time, touch, gifts or help?" (real card ro3, The Lovers)
//   5.4   both answer · 8.2 the flip: PISCES "words. write it down." TAURUS "help. i fix things."
//   8.9   Taurus: "so all those notes…"  Pisces: "and all that fixing…"  (neither one landed)
//   12.4  THE STARS: love them the way they can feel it.
//   15.0  the swap: Taurus writes a note (three words), Pisces helps hold the shelf straight.
//   16.0  Pisces: "…you wrote me a note?"  Taurus: "three words. took me an hour."  Pisces sobs harder.
//   21.3  last line "Now you speak *their* language." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, richText } from '../../koce01/scenes/cardkit.js'

function note(x, X, Y, k, rot, text) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.rotate(rot); x.scale(k, k); R(x, INK, -110, -74, 220, 148); R(x, '#fff7dc', -104, -68, 208, 136); for (let i = 0; i < 3; i++) R(x, '#e6d7b0', -90, -30 + i * 34, 180, 3); if (text) richText(x, text, 0, 4, { size: 30, maxW: 180, color: '#7a2a4a', accent: '#a8326a', shadow: false }); else for (let i = 0; i < 3; i++) R(x, '#7a3a9a', -84, -40 + i * 34, 120 + (i % 2) * 40, 6); x.restore() }
function shelf(x, t, straight) { const rot = lerp(0.16 + 0.03 * Math.sin(t * 7), 0, straight); x.save(); x.translate(880, 900); x.rotate(rot); R(x, INK, -150, -12, 300, 30); R(x, '#a87048', -144, -8, 288, 20); R(x, INK, -150, 18, 16, 50); R(x, INK, 134, 18, 16, 50); R(x, INK, -90, -76, 50, 64); R(x, '#7fd8b0', -84, -70, 38, 52); R(x, INK, 10, -60, 80, 48); R(x, '#f08aa8', 16, -54, 68, 36); x.restore() }
function hammer(x, X, Y, rot, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = k; x.translate(X, Y); x.rotate(rot); R(x, INK, -8, -10, 16, 130); R(x, '#a87048', -4, -6, 8, 122); R(x, INK, -40, -40, 80, 40); R(x, '#9aa3b8', -34, -34, 68, 28); x.restore() }
const SWAP = 15.0
const F = makeFilm({
  id: 'koce11', dur: 22.5, ending: 'cut', brk: 'flash', flashes: [0.5], flashCol: '#f08aa8',
  A: 'pisces', B: 'taurus',
  hook: { text: 'Same love. Different languages. *Flip it.*', out: 1.25 },
  cards: [{ q: 'How do you most like to be *shown love:* words, time, touch, gifts or help?', topic: 'romance', kind: 'ask', at: 1.1, big: 5.0, write: 5.4, reveal: 8.2, done: 14.7, ans: { A: '*words.* write it down.', B: '*help.* i fix things.' } }],
  lines: [
    { t: 8.9, who: 'B', text: 'so all those *notes*…' },
    { t: 10.6, who: 'A', text: 'and all that *fixing*…' },
    { t: 12.4, who: 'S', text: 'love them the way *they* can feel it.' },
    { t: 16.0, who: 'A', text: '…you wrote me a *note?*' },
    { t: 17.8, who: 'B', text: 'three words. took me an *hour.*' },
  ],
  boxes: [{ from: 0, to: 3, open: 8.7, close: 14.8 }, { from: 3, to: 5, open: 15.8, close: 21.0 }],
  last: { at: 21.3, text: 'Now you speak *their* language.' },
  mood: {
    A: [[0, 'wide', [1, -1], -0.1], [1.1, 'wide', [0.4, -1]], [5.4, 'squint', [0.4, 1]], [8.2, 'wide', [1, -0.6]], [8.9, 'neutral', [1, 0]], [10.6, 'wide', [1, 0]], [12.4, 'neutral', [0, -1]], [15.4, 'sparkle', [1, -0.4]], [18.0, 'heart', [1, 0]]],
    B: [[0, 'squint', [1, -1]], [1.1, 'wide', [-0.4, -1]], [5.4, 'squint', [-0.4, 1]], [8.2, 'neutral', [-1, -0.6]], [8.9, 'wide', [-1, 0]], [10.6, 'neutral', [-1, 0]], [12.4, 'neutral', [0, -1]], [15.0, 'squint', [0, 1]], [16.0, 'happy', [-1, 0]], [18.0, 'heart', [-1, 0]]],
    S: [[0, 'wide', [0, -1]], [1.1, 'happy', [0, -1]], [5.4, 'neutral', [0, 1]], [8.2, 'wide', [0, -1]], [9.0, 'happy', [0, 0]]],
  },
  cry: [[0, 1.2, 3], [8.4, 10.6, 1], [10.6, 12.4, 2], [15.6, 22.5, 3]],
  cam: [[0, 1, 540, 960], [8.0, 1, 540, 960], [8.7, 1.1, 540, 985], [14.6, 1.1, 540, 985], [15.2, 1.12, 540, 1000]],
  punch: [{ at: 8.25, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    back(x, t) { shelf(x, t, ease.inOutCubic(prog(t, SWAP + 0.8, SWAP + 1.4))) },
    cast(x, t, S) {
      const a = S.r.A, b = S.r.B
      // frame 0: Pisces clutches a note; Taurus swings a hammer at the shelf
      const k0 = 1 - ease.inCubic(prog(t, 1.0, 1.4))
      note(x, a.x + 120, a.y - 60, k0, -0.2 + Math.sin(t * 12) * 0.04, null)
      hammer(x, b.x + 120, b.y - 150, -0.6 + 0.5 * Math.abs(Math.sin(t * 9)), k0)
      // the swap: Taurus's three-word note
      const k1 = ease.outBack(prog(t, SWAP + 0.3, SWAP + 0.7))
      note(x, lerp(b.x - 120, a.x + 140, ease.inOutCubic(prog(t, SWAP + 0.9, SWAP + 1.5))), lerp(b.y - 80, a.y - 250, ease.inOutCubic(prog(t, SWAP + 0.9, SWAP + 1.5))), k1, 0.08, 'you’re my *favourite.*')
    },
    front(x, t) {
      if (t > SWAP + 1.5 && t < SWAP + 2.3) sparkles(x, t, 880, 900, SWAP + 1.5, { n: 8, Rr: 140 })
      if (t > 18.0) hearts(x, t, 18.05, 540, 1050, { n: 7, spread: 260 })
    },
  },
  extraCues: [['tick', 0.1, 0.06], ['tick', 0.45, 0.06], ['pop', SWAP + 0.35, 880, 0.04, 0.3], ['whoosh', SWAP + 0.9, 0.5, 0.03], ['tick', SWAP + 1.4, 0.05], ['bell', SWAP + 1.45, 1567.98, 0.03, 1, 0.4]],
})
export const { DURATION, SCENES, CUES } = F
