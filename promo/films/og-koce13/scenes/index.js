// og-koce13: social rework of koce13 ("The most romantic thing", 20.2 s, cinematic · Db). Same café, cast and story;
// static HOOK (outline) from frame 0 instead of the slam title + record scratch, no series bug, Scorpio's answer was a
// three-week loyalty test, Pisces cries all the way through. Kit: ./cardkit.js (og social copy of koce01's).
//   Pisces plays this one, so THE STARS deal.
//   0.0   frame 0: Scorpio mid-cloak-swirl, eyes narrowed, Pisces mid-gasp, the card spinning.
//         HOOK (static, until 3.6): "Scorpio’s love test: | *remember my order.*"
//   1.9   the card: "What's the most romantic thing someone has done for you?" (real card ro1, The Lovers)
//   5.3   both answer · 7.9 the flip: SCORPIO "someone remembered my order. after one date."
//         PISCES "someone walked me home the long way."
//   8.6   Pisces: "…the order? that's so sweet."  Scorpio: "it meant they were listening."
//   13.0  THE STARS: their answer is a map. you don't have to guess.
//   15.4  NEXT DATE: Pisces slides over a cup: "one oat latte. your usual." Scorpio melts.
//   19.0  last line "They just handed you the *map.*" (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, hearts, sparkles } from './cardkit.js'

function cloak(x, r, t, k) { if (k <= 0.01 || !r) return; const sw = Math.sin(t * 6) * 30 * k; x.save(); x.globalAlpha = clamp(k * 1.5); x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 120, r.y - 60); x.quadraticCurveTo(r.x - 260 - sw, r.y + 60, r.x - 220 - sw, r.y + 170); x.lineTo(r.x + 220 + sw, r.y + 170); x.quadraticCurveTo(r.x + 260 + sw, r.y + 60, r.x + 120, r.y - 60); x.fill(); x.fillStyle = '#4a1a5a'; x.beginPath(); x.moveTo(r.x - 110, r.y - 50); x.quadraticCurveTo(r.x - 245 - sw, r.y + 60, r.x - 206 - sw, r.y + 160); x.lineTo(r.x + 206 + sw, r.y + 160); x.quadraticCurveTo(r.x + 245 + sw, r.y + 60, r.x + 110, r.y - 50); x.fill(); x.fillStyle = '#a8326a'; x.fillRect(r.x - 200 - sw, r.y + 150, 400 + 2 * sw, 10); x.restore() }
function latte(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); R(x, INK, -40, -70, 80, 76); R(x, '#fbf3e2', -34, -64, 68, 64); R(x, '#a87048', -34, -46, 68, 16); R(x, INK, -44, -80, 88, 14); R(x, '#efe6d6', -40, -76, 80, 8); x.restore() }
const DATE = 15.4
const F = makeFilm({
  id: 'og-koce13', dur: 20.2, ending: 'cut', hookUntil: 3.6,
  A: 'scorpio', B: 'pisces',
  cards: [{ q: 'What’s the most *romantic* thing someone has done for you?', topic: 'romance', kind: 'ask', at: 1.9, big: 5.0, write: 5.3, reveal: 7.9, done: 15.1, ans: { A: 'they remembered my *order.* (it was a test.)', B: 'walked me home *the long way.* I wept.' } }],
  lines: [
    { t: 8.6, who: 'B', text: '…a *test?!* you tested them?!' },
    { t: 10.7, who: 'A', text: 'for three weeks. *they passed.*' },
    { t: 12.9, who: 'S', text: 'their answer is a map. you don’t have to *guess.*' },
    { t: 16.0, who: 'B', text: 'one oat latte. *did I pass?*' },
  ],
  boxes: [{ from: 0, to: 3, open: 8.4, close: 15.3 }, { from: 3, to: 4, open: 15.8, close: 18.7 }],
  stickers: [{ at: DATE, out: 18.8, text: '♡ NEXT DATE', x: 540, y: 520, rot: -0.05, col: '#f08aa8', size: 44 }],
  last: { at: 19.0, text: 'They just handed you the *map.*' },
  mood: {
    A: [[0, 'squint', [1, -1], 0.06], [1.9, 'wide', [0.4, -1]], [5.3, 'squint', [0.4, 1]], [7.9, 'neutral', [1, -0.6]], [8.6, 'neutral', [1, 0]], [10.7, 'happy', [1, 0]], [12.9, 'neutral', [0, -1]], [16.0, 'sparkle', [1, 0.4]], [17.4, 'heart', [1, 0]]],
    B: [[0, 'wide', [-1, -1], -0.12], [1.9, 'wide', [-0.4, -1]], [5.3, 'squint', [-0.4, 1]], [7.9, 'sparkle', [-1, -0.6]], [10.7, 'sparkle', [-1, 0]], [12.9, 'happy', [0, -1]], [16.0, 'happy', [-1, 0]], [17.4, 'heart', [-1, 0]]],
    S: [[0, 'wide', [0, -1]], [1.9, 'happy', [0, -1]], [5.3, 'neutral', [0, 1]], [7.9, 'wide', [0, -1]], [8.6, 'happy', [0, 0]]],
  },
  cry: [[0, 8.2, 1], [8.2, 12.9, 3], [12.9, 16.2, 1], [16.2, 20.2, 2]],
  cam: [[0, 1, 540, 960], [7.7, 1, 540, 960], [8.4, 1.1, 540, 985], [15.0, 1.1, 540, 985], [15.6, 1.14, 540, 1060]],
  punch: [{ at: 7.95, dur: 1.0, z: 0.1, x: 540, y: 820 }],
  draw: {
    back(x, t) { cloak(x, { x: 250, y: 1150 }, t, 1 - ease.inOutCubic(prog(t, 1.6, 2.3))) },
    mid(x, t) { const p = ease.inOutCubic(prog(t, DATE + 0.3, DATE + 1.0)); latte(x, lerp(720, 420, p), 1290, ease.outBack(prog(t, DATE, DATE + 0.3))) },
    front(x, t) { if (t > 17.4) hearts(x, t, 17.45, 330, 1000, { n: 6, spread: 180 }); if (t > DATE + 1.0 && t < DATE + 1.8) sparkles(x, t, 420, 1240, DATE + 1.0, { n: 8, Rr: 110 }) },
  },
  extraCues: [['whoosh', 0.0, 0.5, 0.05], ['whoosh', DATE + 0.3, 0.6, 0.03], ['pop', DATE + 1.0, 880, 0.05, -0.3], ['bell', 17.4, 1567.98, 0.03, 1.2, 0]],
})
export const HOOK = 'Scorpio’s love test: | *remember my order.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.6
export const { DURATION, SCENES, CUES } = F
