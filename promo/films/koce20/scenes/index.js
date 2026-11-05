// koce20 · ONE CARD, TWO PEOPLE ep 20 (long) · "Card three: five years" (60.6 s vertical, star_advice post, cinematic · F#m).
//   Hard cut. Three cards in one night; the third changes things. Chapter stickers CARD 1 / CARD 2 / CARD 3.
//   0.0   frame 0: Virgo mid-sort of a giant to-do list, Aquarius mid-launch of a paper rocket, three cards in the air.
//         Hook: "Five years from now. *Card three.*"  Record scratch + freeze at 0.45. Promise: WAIT FOR CARD 3.
//   1.9   CARD 1 "Cook at home or try somewhere new?" (fo1, pick) → Virgo: Cook in, Aquarius: Go out. FLASHBACK: the
//         glowing blue noodle place.
//   18.4  CARD 2 "What's one habit you'd love a partner to help you keep?" (ev5) → VIRGO "a bedtime." AQUARIUS "drinking
//         water." Bedtime buddies. Pisces cries at the bedtime.
//   36.6  CARD 3 (rare) "Where do you see yourself living in five years?" (fu1) → VIRGO "a quiet street. a garden."
//         AQUARIUS "wherever you're planting it." Virgo drops the list. A sketch: the garden, with weird seeds.
//   59.4  last line "Five years. *Same* street." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, drawCard, win, sticker } from '../../koce01/scenes/cardkit.js'

const C1 = { q: '*Cook at home* or *try somewhere new?*', topic: 'food', kind: 'pick', opts: ['Cook in', 'Go out'], at: 1.9, big: 4.6, write: 4.9, reveal: 7.5, done: 18.0, ans: { A: 'Cook in. *with a recipe.*', B: 'Go out. *somewhere weird.*' } }
const C2 = { q: 'What’s one *habit* you’d love a partner to help you keep?', topic: 'everyday', kind: 'ask', deal: 18.4, at: 19.6, big: 22.6, write: 22.9, reveal: 25.5, done: 36.2, ans: { A: 'a *bedtime.* before midnight.', B: 'drinking *water.*' } }
const C3 = { q: 'Where do you see yourself *living in five years?*', topic: 'future', kind: 'ask', rare: 'rare', deal: 36.6, at: 37.8, big: 40.8, write: 41.2, reveal: 44.0, done: 54.2, ans: { A: 'a quiet street. *a garden.*', B: 'wherever *you’re planting it.*' } }
const FLASH = [9.4, 14.0], GARDEN = [54.4, 60.6]
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
function todo(x, X, Y, k, rot, n = 6) { if (k <= 0.01) return; x.save(); x.globalAlpha = clamp(k * 2); x.translate(X, Y); x.rotate(rot); R(x, INK, -110, -150, 220, 300); R(x, '#fff7dc', -104, -144, 208, 288); x.font = `800 22px Inter, sans-serif`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('TO DO ✓', -86, -112); for (let i = 0; i < n; i++) { R(x, INK, -86, -88 + i * 40, 18, 18); R(x, i < 4 ? '#2fc79a' : '#fff7dc', -83, -85 + i * 40, 12, 12); R(x, '#cfc6dc', -58, -82 + i * 40, 130 - (i % 3) * 20, 6) } x.restore() }
function rocket(x, X, Y, rot, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = k; x.translate(X, Y); x.rotate(rot); x.fillStyle = INK; x.beginPath(); x.moveTo(0, -70); x.lineTo(30, 30); x.lineTo(-30, 30); x.fill(); x.fillStyle = '#fbf3e2'; x.beginPath(); x.moveTo(0, -60); x.lineTo(22, 24); x.lineTo(-22, 24); x.fill(); R(x, '#38c4ec', -6, -20, 12, 12); R(x, '#ffc861', -10, 30, 20, 16 + Math.sin(X) * 6); x.restore() }
function noodles(x, t, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -30, 10, 0, -30, 180); g.addColorStop(0, 'rgba(90,220,255,0.6)'); g.addColorStop(1, 'rgba(90,220,255,0)'); x.fillStyle = g; x.fillRect(-180, -210, 360, 360); x.restore()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-100, -40); x.lineTo(100, -40); x.quadraticCurveTo(92, 40, 0, 46); x.quadraticCurveTo(-92, 40, -100, -40); x.fill(); x.fillStyle = '#e8344e'; x.beginPath(); x.moveTo(-90, -34); x.lineTo(90, -34); x.quadraticCurveTo(82, 32, 0, 38); x.quadraticCurveTo(-82, 32, -90, -34); x.fill()
  for (let i = 0; i < 6; i++) { x.strokeStyle = '#5adcff'; x.lineWidth = 8; x.beginPath(); x.moveTo(-70 + i * 26, -40); x.quadraticCurveTo(-60 + i * 26 + Math.sin(t * 4 + i) * 10, -90, -50 + i * 26, -40); x.stroke() } x.restore() }
function glass(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); R(x, INK, -34, -80, 68, 86); R(x, 'rgba(190,230,255,0.5)', -28, -74, 56, 74); R(x, '#5aa8d8', -28, -40, 56, 40); R(x, '#ffffff', -22, -70, 8, 30); x.restore() }
function clock(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fbf3e2'; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); R(x, INK, -3, -44, 6, 46); x.save(); x.rotate(Math.PI * 0.95); R(x, INK, -3, -4, 6, 34); x.restore(); x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = '#7a3a9a'; x.textAlign = 'center'; x.fillText('11:30', 0, 92); x.restore() }
function gardenSketch(x, t, k) { if (k <= 0.01) return; x.save(); x.translate(540, 760); x.scale(k, k); rr(x, -368, -228, 736, 456, 34); x.fillStyle = INK; x.fill(); x.save(); rr(x, -360, -220, 720, 440, 28); x.clip()
  R(x, '#ffb08a', -360, -220, 720, 440); R(x, '#9fd86a', -360, 60, 720, 200); R(x, INK, -60, -40, 160, 110); R(x, '#fbf3e2', -54, -34, 148, 98); x.fillStyle = INK; x.beginPath(); x.moveTo(-80, -36); x.lineTo(20, -120); x.lineTo(120, -36); x.fill(); x.fillStyle = '#5a78b4'; x.beginPath(); x.moveTo(-66, -40); x.lineTo(20, -110); x.lineTo(106, -40); x.fill(); R(x, '#ffd98a', 0, -6, 30, 30)
  for (let i = 0; i < 6; i++) { const px = -300 + i * 110, h = 50 + (i % 3) * 30; R(x, '#2fc79a', px, 150 - h, 8, h); const glow = i % 2; bits(x, ['.X.', 'XYX', '.X.'], { X: glow ? '#5adcff' : '#ff8fb1', Y: GOLD }, px + 4, 150 - h - 12, 12) }
  x.font = `700 26px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('5 YEARS · A QUIET STREET · WEIRD SEEDS', -336, -184); x.restore(); x.restore() }
const LIST = t => 1 - ease.inCubic(prog(t, 1.6, 1.9))
const F = makeFilm({
  id: 'koce20', dur: 60.6, ending: 'cut', brk: 'scratch', recAt: 0.45, recLen: 1.1, freezeText: 'the planner and the dreamer. *one table.*',
  A: 'virgo', B: 'aquarius',
  hook: { text: 'Five years from now. *Card three.*', out: 1.75 },
  cards: [C1, C2, C3],
  chapters: [{ at: 2.0, text: 'IN OR OUT', dur: 3.4 }, { at: 18.5, text: 'THE HABIT', dur: 3.4 }, { at: 36.7, text: 'FIVE YEARS', dur: 4.0 }],
  lines: [
    { t: 8.2, who: 'A', text: 'remember the *glowing noodles?*' },
    { t: 10.2, who: 'B', text: 'they were *delicious.*' },
    { t: 11.8, who: 'A', text: 'they were *blue.*' },
    { t: 13.8, who: 'S', text: 'take turns: one night in, one night *new.*' },
    { t: 26.2, who: 'B', text: 'i’ll text you *goodnight* at 11:30.' },
    { t: 28.4, who: 'A', text: 'and i’ll refill your *water.*' },
    { t: 30.4, who: 'P', text: 'bedtime *buddies!*' },
    { t: 32.2, who: 'S', text: 'helping with a habit says: i want you *well.*' },
    { t: 44.8, who: 'A', text: '…wait. *really?*' },
    { t: 46.4, who: 'B', text: 'i’ll bring the *weird seeds.*' },
    { t: 48.6, who: 'S', text: 'you don’t need the same plan. just the same *direction.*' },
    { t: 52.0, who: 'A', text: 'a garden… *with weird seeds.*' },
    { t: 55.6, who: 'P', text: 'i’m planting *a tissue tree.*' },
  ],
  boxes: [{ from: 0, to: 4, open: 8.0, close: 17.8 }, { from: 4, to: 8, open: 26.0, close: 36.0 }, { from: 8, to: 13, open: 44.6, close: 58.8 }],
  stickers: [
    { at: 2.2, out: 5.0, text: 'WAIT FOR CARD 3', x: 540, y: 1600, rot: -0.04, col: PINK, size: 44 },
    { at: FLASH[0], out: FLASH[1], text: 'FLASHBACK · THE GLOWING NOODLE PLACE', x: 540, y: 960, rot: 0.04, col: '#5adcff', size: 30 },
    { at: 28.6, out: 31.4, text: '☾ BEDTIME BUDDIES', x: 540, y: 960, rot: -0.04, col: '#c9a6ff', size: 40 },
  ],
  last: { at: 59.4, text: 'Five years. *Same* street.', size: 108, accentSize: 140 },
  mood: {
    A: [[0, 'squint', [0, -1], -0.06], [1.9, 'wide', [0.4, -1]], [4.9, 'squint', [0.4, 1]], [7.5, 'neutral', [1, -0.6]], [8.2, 'squint', [1, 0]], [10.2, 'eyeroll', [1, 0]], [11.8, 'wide', [1, 0]], [13.8, 'happy', [0, -1]],
      [19.6, 'wide', [0.4, -1]], [22.9, 'squint', [0.4, 1]], [25.5, 'neutral', [1, -0.6]], [26.2, 'sparkle', [1, 0]], [28.4, 'happy', [1, 0]], [32.2, 'happy', [0, -1]],
      [37.8, 'wide', [0.4, -1]], [41.2, 'squint', [0.4, 1]], [44.0, 'neutral', [1, -0.6]], [44.8, 'wide', [1, 0]], [46.4, 'sparkle', [1, 0]], [48.6, 'happy', [0, -1]], [52.0, 'heart', [1, 0]]],
    B: [[0, 'sparkle', [1, -1], -0.1], [1.9, 'wide', [-0.4, -1]], [4.9, 'squint', [-0.4, 1]], [7.5, 'happy', [-1, -0.6]], [8.2, 'sparkle', [-1, 0]], [10.2, 'happy', [-1, 0]], [11.8, 'wink', [-1, 0]], [13.8, 'happy', [0, -1]],
      [19.6, 'wide', [-0.4, -1]], [22.9, 'squint', [-0.4, 1]], [25.5, 'happy', [-1, -0.6]], [26.2, 'happy', [-1, 0]], [28.4, 'sparkle', [-1, 0]], [32.2, 'happy', [0, -1]],
      [37.8, 'wide', [-0.4, -1]], [41.2, 'squint', [-0.4, 1]], [44.0, 'neutral', [-1, -0.6]], [44.8, 'happy', [-1, 0]], [46.4, 'wink', [-1, 0]], [48.6, 'happy', [0, -1]], [52.0, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.9, 'sparkle', [0, -1]], [4.9, 'neutral', [0, 1]], [7.5, 'wide', [0, -1]], [9.4, 'wide', [0, 1]], [11.8, 'happy', [0, -1]], [18.4, 'happy', [0, 1]], [25.5, 'wide', [0, -1]], [30.4, 'sparkle', [0, -1]],
      [36.6, 'wide', [0, 1]], [37.8, 'sparkle', [0, -1]], [41.2, 'neutral', [0, 1]], [44.0, 'wide', [0, -1]], [46.4, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.9, 1], [11.8, 13.8, 1], [26.4, 30.2, 1], [30.2, 36.4, 3], [44.6, 46.4, 1], [46.4, 52.0, 2], [52.0, 60.6, 3]],
  cam: [[0, 1, 540, 960], [7.8, 1, 540, 960], [8.5, 1.1, 540, 985], [17.8, 1.1, 540, 985], [18.4, 1, 540, 960], [25.8, 1, 540, 960], [26.5, 1.1, 540, 985], [36.0, 1.1, 540, 985], [36.6, 1, 540, 960],
    [44.3, 1, 540, 960], [45.0, 1.1, 540, 985], [54.0, 1.1, 540, 985], [54.6, 1.04, 540, 980]],
  punch: [{ at: 7.55, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 25.55, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 44.05, dur: 1.2, z: 0.1, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) {
      const a = S.r.A, b = S.r.B
      todo(x, a.x + 140, a.y - 120, LIST(t), -0.15 + Math.sin(t * 10) * 0.03)
      const rp = prog(t, -0.4, 1.9); if (rp < 1) rocket(x, lerp(b.x - 60, 1200, rp), lerp(b.y - 160, 200, rp), 0.6, 1)
      // card 3: Virgo drops the list
      const dp = prog(t, 45.0, 46.0); if (t > 44.0 && dp < 1) todo(x, a.x + 140, lerp(a.y - 120, a.y + 300, ease.inQuad(dp)), 1 - dp * 0.3, dp * 2)
    },
    mid(x, t) {
      noodles(x, t, 540, 1270, ease.outBack(prog(t, FLASH[0] + 0.2, FLASH[0] + 0.6)) * (1 - ease.inCubic(prog(t, FLASH[1] - 0.3, FLASH[1]))))
      const hk = ease.outBack(prog(t, 28.4, 28.8)) * (1 - ease.inCubic(prog(t, 35.6, 36.0)))
      glass(x, 380, 1290, hk); clock(x, 700, 1210, ease.outBack(prog(t, 26.3, 26.7)) * (1 - ease.inCubic(prog(t, 35.6, 36.0))))
    },
    front(x, t) {
      const k0 = 1 - ease.inCubic(prog(t, 1.5, 1.9))
      if (k0 > 0.01) { drawCard(x, t, C2, 300, 560, 200, { f: 0.2, rot: -0.5 + t, alpha: k0 }); drawCard(x, t, C3, 860, 520, 220, { f: 0.25, rot: 0.4 - t, alpha: k0, glint: (t * 2) % 1 }) }
      gardenSketch(x, t, ease.outBack(prog(t, GARDEN[0], GARDEN[0] + 0.5)))
      if (t > GARDEN[0] + 0.4 && t < GARDEN[0] + 1.2) sparkles(x, t, 540, 760, GARDEN[0] + 0.4, { n: 12, Rr: 360 })
      if (t > 30.5 && t < 35.6) hearts(x, t, 30.55, 540, 1040, { n: 6, spread: 220 })
      if (t > 52.1) hearts(x, t, 52.15, 540, 1040, { n: 8, spread: 300 })
    },
    over(x, t) { const f = win(t, FLASH[0], FLASH[1], 0.25, 0.3); if (f > 0) { x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = 0.45 * f; x.fillStyle = '#4a8ab0'; x.fillRect(0, 0, 1080, 1920); x.restore() } },
  },
  extraCues: [['whoosh', 0.0, 0.8, 0.05], ['whoosh', FLASH[0], 0.6, 0.05], ['glitter', FLASH[0] + 0.3, FLASH[0] + 1.2], ['pop', 26.4, 1046.5, 0.04, 0.3], ['pop', 28.5, 659.25, 0.04, -0.3], ['glitter', 30.5, 31.4],
    ['whoosh', 45.0, 0.9, 0.04], ['tick', 46.0, 0.06], ['whoosh', GARDEN[0], 0.4, 0.04], ['bell', GARDEN[0] + 0.3, 1567.98, 0.04, 1.6, 0], ['glitter', GARDEN[0] + 0.4, GARDEN[0] + 1.4]],
})
export const { DURATION, SCENES, CUES } = F
