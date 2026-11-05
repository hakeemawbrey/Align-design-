// koce18 · ONE CARD, TWO PEOPLE ep 18 (long) · "Card three: Sunday dinner" (63.6 s vertical, star_advice post, dreamy · Ab). Hard cut.
//   Three cards in one night; the third changes things. Chapter stickers CARD 1 / CARD 2 / CARD 3.
//   0.0   frame 0: Cancer mid-hug of a giant dog daydream, Capricorn mid-spreadsheet daydream, three cards in the air.
//         Hook: "Card three: they both *went silent.*"  Colour flash + shake at 0.5. Promise: WAIT FOR CARD 3.
//   1.1   CARD 1 "Pets: yes, no, or one specific animal?" (fa5) → CANCER "a big fluffy dog." CAPRICORN "a fish. named
//         Budget." Pisces cries about the fish.
//   18.0  CARD 2 "What's worth spending real money on?" (mo2) → CANCER "family trips." CAPRICORN "a really good mattress."
//   36.0  CARD 3 (rare) "What did your parents get right that you'd want to repeat?" (fa3) → both write "dinner at the
//         table." Silence, then smiles.
//   54.0  SUNDAY · 6 PM: the first of their Sunday dinners; Pisces sobs at the head of the table.
//   62.4  last line "Sunday dinner. *Every* week." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, drawCard, win } from '../../koce01/scenes/cardkit.js'

const C1 = { q: '*Pets:* yes, no, or one specific animal?', topic: 'family', kind: 'ask', at: 1.1, big: 4.0, write: 4.3, reveal: 6.9, done: 17.6, ans: { A: 'a big *fluffy* dog.', B: 'a fish. *named Budget.*' } }
const C2 = { q: 'What’s worth spending *real money* on?', topic: 'money', kind: 'ask', deal: 18.0, at: 19.2, big: 22.0, write: 22.3, reveal: 24.9, done: 35.6, ans: { A: '*family trips.*', B: 'a *really good* mattress.' } }
const C3 = { q: 'What did your parents get right that you’d want to *repeat?*', topic: 'family', kind: 'ask', rare: 'rare', deal: 36.0, at: 37.2, big: 40.8, write: 41.2, reveal: 44.0, done: 53.6, ans: { A: 'dinner *at the table.*', B: 'dinner *at the table.*' } }
const DINNER = [54.0, 63.6]
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
function bubble(x, X, Y, w, h, k, draw) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 34); x.fillStyle = INK; x.fill(); x.save(); rr(x, -w / 2, -h / 2, w, h, 28); x.clip(); draw(x, w, h); x.restore(); x.restore() }
const DOG = ['..XX....XX..', '.XXXX..XXXX.', '.XXXXXXXXXX.', 'XXXWWXXWWXXX', 'XXXKWXXKWXXX', 'XXXXXNNXXXXX', '.XXXXPPXXXX.', '..XXXXXXXX..']
const FISH = ['....XX....', '..XXXXXX.X', '.XXKXXXXXX', 'XXXXXXXXXX', '.XXXXXXXXX', '..XXXXXX.X', '....XX....']
function dogScene(x, w, h, t) { R(x, '#9fd86a', -w / 2, -h / 2, w, h); R(x, '#7fc0e0', -w / 2, -h / 2, w, h * 0.45); bits(x, DOG, { X: '#e8b070', W: '#ffffff', K: INK, N: INK, P: '#ff8fb1' }, 0, 20 + Math.sin(t * 8) * 6, 18) }
function sheetScene(x, w, h) { R(x, '#fbf7ee', -w / 2, -h / 2, w, h); for (let i = 0; i < 6; i++) R(x, '#cfd6e6', -w / 2, -h / 2 + 30 + i * 44, w, 3); for (let i = 0; i < 4; i++) R(x, '#cfd6e6', -w / 2 + 40 + i * 90, -h / 2, 3, h); R(x, '#2fc79a', -w / 2 + 44, -h / 2 + 34, 86, 40); R(x, '#e8344e', -w / 2 + 134, -h / 2 + 78, 86, 40); x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = INK; x.fillText('BUDGET.xls', -w / 2 + 50, h / 2 - 30) }
function fishScene(x, w, h, t) { R(x, '#3a8ac0', -w / 2, -h / 2, w, h); for (let i = 0; i < 4; i++) { const p = (t * 0.6 + i / 4) % 1; R(x, '#bfeaff', -w / 4 + i * 30, h / 2 - p * h, 10, 10) } bits(x, FISH, { X: '#ff9a3a', K: INK }, Math.sin(t * 1.5) * 40, 0, 16); x.font = `800 26px Inter, sans-serif`; x.fillStyle = '#fbf7ee'; x.textAlign = 'center'; x.fillText('BUDGET', 0, h / 2 - 22) }
function mattress(x, w, h) { R(x, '#e6d7f0', -w / 2, -h / 2, w, h); R(x, INK, -w * 0.4 - 6, -6, w * 0.8 + 12, 80); R(x, '#fbf3e2', -w * 0.4, 0, w * 0.8, 68); for (let i = 0; i < 6; i++) R(x, '#cfc6dc', -w * 0.35 + i * 50, 28, 12, 12); bits(x, ['X...X', '.X.X.', '..X..'], { X: GOLD }, 0, -h * 0.25, 10) }
function trip(x, w, h) { R(x, '#ffb08a', -w / 2, -h / 2, w, h); R(x, '#3a8ac0', -w / 2, 10, w, h); x.fillStyle = '#7a3a9a'; x.beginPath(); x.moveTo(-w / 2, 20); x.lineTo(-60, -60); x.lineTo(40, 20); x.fill(); x.fillStyle = '#ffc861'; x.beginPath(); x.arc(w * 0.25, -h * 0.2, 30, 0, Math.PI * 2); x.fill() }
function feast(x, t, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = clamp(k * 2)
  for (const [X, c] of [[330, '#f39a3a'], [540, '#e86a5a'], [750, '#9fd86a']]) { x.fillStyle = INK; x.beginPath(); x.ellipse(X, 1290, 84, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fbf3e2'; x.beginPath(); x.ellipse(X, 1286, 76, 20, 0, 0, Math.PI * 2); x.fill(); R(x, c, X - 40, 1272, 80, 16) }
  for (const X of [440, 640]) { R(x, INK, X - 12, 1210, 24, 80); R(x, '#fbf3e2', X - 8, 1214, 16, 76); const f = 1 + 0.15 * Math.sin(t * 20 + X); x.fillStyle = '#ffc861'; x.beginPath(); x.ellipse(X, 1196, 8 * f, 14 * f, 0, 0, Math.PI * 2); x.fill() }
  x.restore() }
const DAY = t => 1 - ease.inCubic(prog(t, 0.6, 1.0))
const F = makeFilm({
  id: 'koce18', dur: 63.6, ending: 'cut', brk: 'flash', flashes: [0.5], flashCol: '#7fd8b0',
  A: 'cancer', B: 'capricorn',
  hook: { text: 'Card three: they both *went silent.*', out: 1.25 },
  cards: [C1, C2, C3],
  chapters: [{ at: 1.2, text: 'PETS', dur: 3.2 }, { at: 18.1, text: 'MONEY', dur: 3.4 }, { at: 36.1, text: 'HOME', dur: 4.2 }],
  lines: [
    { t: 7.6, who: 'A', text: 'a fish named *budget?*' },
    { t: 9.6, who: 'B', text: 'he’d be very *low-maintenance.*' },
    { t: 11.8, who: 'P', text: 'i love *budget.*' },
    { t: 13.8, who: 'S', text: 'small answers show you their *everyday.*' },
    { t: 25.6, who: 'A', text: 'a *mattress??*' },
    { t: 27.2, who: 'B', text: 'you sleep on it *every night.*' },
    { t: 29.4, who: 'A', text: '…okay, that’s *fair.*' },
    { t: 31.4, who: 'S', text: 'what they spend on shows what they *care about.*' },
    { t: 46.2, who: 'B', text: '…same *answer.*' },
    { t: 48.0, who: 'A', text: 'every sunday. *no phones.*' },
    { t: 50.0, who: 'S', text: 'when you want the same small thing, that’s a *future.*' },
    { t: 55.2, who: 'B', text: 'first sunday *dinner.*' },
    { t: 57.2, who: 'P', text: 'can i come *every week?*' },
    { t: 59.6, who: 'A', text: '…*yes.* bring tissues.' },
  ],
  boxes: [{ from: 0, to: 4, open: 7.4, close: 17.5 }, { from: 4, to: 8, open: 25.4, close: 35.5 }, { from: 8, to: 11, open: 46.0, close: 53.6 }, { from: 11, to: 14, open: 55.0, close: 62.0 }],
  stickers: [
    { at: 1.4, out: 4.6, text: 'WAIT FOR CARD 3', x: 540, y: 1600, rot: -0.04, col: PINK, size: 44 },
    { at: 44.4, out: 46.0, text: '…', x: 540, y: 960, rot: 0, col: BONE, size: 60 },
    { at: DINNER[0], out: 62.2, text: '☼ SUNDAY · 6 PM', x: 540, y: 300, rot: -0.04, col: '#ffd98a', size: 46 },
  ],
  last: { at: 62.4, text: 'Sunday dinner. *Every* week.' },
  mood: {
    A: [[0, 'heart', [-1, -1], -0.1], [1.1, 'wide', [0.4, -1]], [4.3, 'squint', [0.4, 1]], [6.9, 'sparkle', [1, -0.6]], [7.6, 'wide', [1, 0]], [9.6, 'happy', [1, 0]], [13.8, 'happy', [0, -1]],
      [19.2, 'wide', [0.4, -1]], [22.3, 'squint', [0.4, 1]], [24.9, 'happy', [1, -0.6]], [25.6, 'wide', [1, 0]], [27.2, 'squint', [1, 0]], [29.4, 'happy', [1, 0]], [31.4, 'happy', [0, -1]],
      [37.2, 'wide', [0.4, -1]], [41.2, 'squint', [0.4, 1]], [44.0, 'wide', [1, -0.6]], [45.2, 'neutral', [1, 0]], [46.2, 'sparkle', [1, 0]], [50.0, 'happy', [0, -1]], [54.0, 'happy', [1, 0]], [59.6, 'heart', [1, 0]]],
    B: [[0, 'squint', [1, -1]], [1.1, 'wide', [-0.4, -1]], [4.3, 'squint', [-0.4, 1]], [6.9, 'neutral', [-1, -0.6]], [7.6, 'neutral', [-1, 0]], [9.6, 'wink', [-1, 0]], [13.8, 'happy', [0, -1]],
      [19.2, 'wide', [-0.4, -1]], [22.3, 'squint', [-0.4, 1]], [24.9, 'neutral', [-1, -0.6]], [25.6, 'neutral', [-1, 0]], [27.2, 'wink', [-1, 0]], [31.4, 'happy', [0, -1]],
      [37.2, 'wide', [-0.4, -1]], [41.2, 'squint', [-0.4, 1]], [44.0, 'wide', [-1, -0.6]], [45.2, 'neutral', [-1, 0]], [46.2, 'sparkle', [-1, 0]], [50.0, 'happy', [0, -1]], [54.0, 'happy', [-1, 0]], [57.2, 'wide', [-1, 0]], [59.6, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.3, 'neutral', [0, 1]], [6.9, 'wide', [0, -1]], [11.8, 'sparkle', [0, -1]], [18.0, 'happy', [0, 1]], [24.9, 'wide', [0, -1]], [31.4, 'neutral', [0, -1]],
      [36.0, 'wide', [0, 1]], [37.2, 'sparkle', [0, -1]], [41.2, 'neutral', [0, 1]], [44.0, 'wide', [0, -1]], [46.2, 'sparkle', [0, -1]], [54.0, 'sparkle', [0, 1]]],
  },
  cry: [[0, 1.2, 1], [9.8, 11.8, 2], [11.8, 13.8, 3], [25.0, 27.2, 1], [44.4, 46.2, 1], [46.2, 54.0, 2], [54.0, 63.6, 3]],
  cam: [[0, 1, 540, 960], [7.2, 1, 540, 960], [7.9, 1.1, 540, 985], [17.4, 1.1, 540, 985], [18.0, 1, 540, 960], [25.2, 1, 540, 960], [25.9, 1.1, 540, 985], [35.4, 1.1, 540, 985], [36.0, 1, 540, 960],
    [44.3, 1, 540, 960], [45.0, 1.1, 540, 985], [53.4, 1.1, 540, 985], [54.0, 1.12, 540, 1040]],
  punch: [{ at: 6.95, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 24.95, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 44.05, dur: 1.6, z: 0.12, x: 540, y: 820 }],
  draw: {
    back(x, t) { const k = win(t, DINNER[0], DINNER[1] + 1, 0.4, 0.01); if (k > 0) { x.save(); x.globalAlpha = 0.22 * k; x.fillStyle = '#ffb08a'; x.fillRect(0, 0, 1080, 1300); x.restore() } },
    mid(x, t) { feast(x, t, ease.outCubic(prog(t, DINNER[0], DINNER[0] + 0.5))) },
    front(x, t) {
      const d = DAY(t)
      bubble(x, 260, 720, 360, 300, d, (c, w, h) => dogScene(c, w, h, t)); bubble(x, 830, 720, 360, 300, d, (c, w, h) => sheetScene(c, w, h))
      const k0 = d; if (k0 > 0.01) { drawCard(x, t, C2, 360, 450, 160, { f: 0.2, rot: -0.5 + t, alpha: k0 }); drawCard(x, t, C3, 720, 430, 180, { f: 0.25, rot: 0.4 - t, alpha: k0, glint: (t * 2) % 1 }) }
      // card-one daydreams of the answers: the dog and Budget the fish
      const b1 = win(t, 9.6, 13.6, 0.35, 0.3); bubble(x, 540, 1000, 300, 220, b1 ? ease.outBack(Math.min(1, b1)) : 0, (c, w, h) => fishScene(c, w, h, t))
      const b2 = win(t, 27.2, 31.2, 0.35, 0.3); bubble(x, 540, 1000, 300, 220, b2, (c, w, h) => mattress(c, w, h))
      if (t > 46.3 && t < 53.4) hearts(x, t, 46.35, 540, 1040, { n: 6, spread: 260 })
      if (t > 59.7) hearts(x, t, 59.75, 540, 1040, { n: 7, spread: 300 })
      void trip
    },
    over(x, t) { const k = 0.4 * win(t, 44.2, 46.4, 0.4, 0.6); if (k > 0) { x.save(); x.globalAlpha = k; const g = x.createRadialGradient(540, 1000, 200, 540, 1000, 1100); g.addColorStop(0, 'rgba(5,3,14,0)'); g.addColorStop(1, 'rgba(5,3,14,1)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() } },
  },
  extraCues: [['pop', 9.7, 659.25, 0.04, 0], ['pop', 27.3, 659.25, 0.04, 0], ['whoosh', 44.3, 1.6, 0.02], ['bell', 46.3, 1318.51, 0.03, 2, 0], ['glitter', 46.3, 47.4], ['whoosh', DINNER[0] - 0.1, 0.8, 0.05], ['bell', DINNER[0] + 0.1, 1567.98, 0.04, 1.6, 0], ['glitter', 59.7, 60.8]],
})
export const { DURATION, SCENES, CUES } = F
