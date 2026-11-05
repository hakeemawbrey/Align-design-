// koce07 · ONE CARD, TWO PEOPLE ep 7 · "What you're unlearning" (24.4 s vertical, star_advice post, cinematic · Am). Hard cut.
//   0.0   frame 0: Cancer and Leo frozen mid-laugh as the lights drop, the gold legendary card spinning, Pisces
//         sniffling. Hook: "This card goes deep. *Brace yourself.*"  Sudden silence (black dip) 0.35–0.9.
//   1.1   the card (legendary): "What's something about how you were raised that you're unlearning?" (fa6, The Hearth)
//   5.4   both answer · 8.2 the flip: CANCER "not asking for help." LEO "acting fine when i'm not."
//   9.6   a quiet beat, the lights low. Cancer: "…i didn't know you did that too."  Leo: "yeah. i'm learning."
//   14.8  THE STARS: an answer like this is a gift. say thank you. don't fix it.
//   18.6  Leo: "thank you."  Cancer: "you too."  Pisces sobs silently into the tissue box.
//   23.4  last line "That's what *trust* sounds like." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, prog, ease, lerp, clamp, hearts, win } from '../../koce01/scenes/cardkit.js'

const DIM = t => 0.42 * win(t, 8.4, 18.4, 0.8, 1.2)
const F = makeFilm({
  id: 'koce07', dur: 24.4, ending: 'cut', brk: 'silence',
  A: 'cancer', B: 'leo',
  hook: { text: 'This card goes deep. *Brace yourself.*', out: 1.3 },
  cards: [{ q: 'What’s something about how you were raised that you’re *unlearning?*', topic: 'family', kind: 'ask', rare: 'legendary', at: 1.1, big: 5.0, write: 5.4, reveal: 8.2, done: 18.2, ans: { A: 'not *asking for help.*', B: 'acting *fine* when i’m not.' } }],
  lines: [
    { t: 9.8, who: 'A', text: '…i didn’t know you did that *too.*' },
    { t: 12.4, who: 'B', text: 'yeah. i’m *learning.*' },
    { t: 14.8, who: 'S', text: 'an answer like this is a gift. say *thank you.* don’t fix it.' },
    { t: 18.6, who: 'B', text: '*thank you.*' },
    { t: 20.4, who: 'A', text: '*you too.*' },
  ],
  boxes: [{ from: 0, to: 5, open: 9.6, close: 22.6 }],
  last: { at: 23.4, text: 'That’s what *trust* sounds like.' },
  mood: {
    A: [[0, 'happy', [1, -1], 0.1], [1.1, 'wide', [0.4, -1]], [5.4, 'squint', [0.4, 1]], [8.2, 'neutral', [1, -0.6]], [9.8, 'neutral', [1, 0.6]], [12.4, 'sparkle', [1, 0]], [14.8, 'neutral', [0, -1]], [18.6, 'sparkle', [1, 0]], [20.4, 'happy', [1, 0]], [21.6, 'heart', [1, 0]]],
    B: [[0, 'happy', [-1, -1], 0.1], [1.1, 'wide', [-0.4, -1]], [5.4, 'squint', [-0.4, 1]], [8.2, 'neutral', [-1, -0.6]], [9.8, 'wide', [-1, 0]], [12.4, 'neutral', [-1, 0.6]], [14.8, 'neutral', [0, -1]], [18.6, 'happy', [-1, 0]], [21.6, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [5.4, 'neutral', [0, 1]], [8.2, 'sparkle', [0, -1]], [18.6, 'sparkle', [0, 0]]],
  },
  cry: [[0, 1.1, 1], [8.6, 14.8, 2], [14.8, 18.6, 1], [18.8, 24.4, 2]],
  cryA: [[12.8, 14.8, 1]],
  offset: { A: t => [55 * ease.inOutCubic(prog(t, 20.8, 21.4)), 0], B: t => [-55 * ease.inOutCubic(prog(t, 20.8, 21.4)), 0] },
  cam: [[0, 1, 540, 960], [9.0, 1, 540, 960], [10.4, 1.12, 540, 990], [18.2, 1.12, 540, 990], [19.4, 1.22, 540, 1090], [23.0, 1.22, 540, 1090], [23.8, 1.1, 540, 1060]],
  draw: {
    over(x, t) { const k = DIM(t); if (k > 0) { x.save(); x.globalAlpha = k; const g = x.createRadialGradient(540, 1000, 200, 540, 1000, 1100); g.addColorStop(0, 'rgba(5,3,14,0)'); g.addColorStop(1, 'rgba(5,3,14,1)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() } },
    front(x, t) { if (t > 21.4) hearts(x, t, 21.45, 540, 1060, { n: 6, spread: 220, cols: ['#ff8fb1', GOLD, '#ffd98a'] }) },
  },
  extraCues: [['whoosh', 8.5, 1.2, 0.02], ['bell', 18.7, 1318.51, 0.03, 2.4, -0.3], ['bell', 20.5, 1567.98, 0.03, 2.4, 0.3], ['glitter', 21.4, 22.6]],
})
export const { DURATION, SCENES, CUES } = F
