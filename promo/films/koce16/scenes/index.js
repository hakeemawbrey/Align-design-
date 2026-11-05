// koce16 · ONE CARD, TWO PEOPLE ep 16 (long) · "Card three: ten years" (67.4 s vertical, star_advice post, pop · G). Hard cut.
//   Three cards in one night; the third changes things. Chapter stickers CARD 1 / CARD 2 / CARD 3.
//   0.0   frame 0: Aries mid-leap, Libra mid-scream, three cards in the air (the third glowing). Hook: "Three cards. Wait
//         for *card three.*"  Whip zoom at 0.55. Promise sticker: CARD 3 CHANGES EVERYTHING.
//   1.1   CARD 1 "Who's more likely to be late?" (ev3, who) → both say Aries. FLASHBACK: the first date, Aries ran four
//         blocks with a flower.
//   17.2  CARD 2 "Share plates or order your own?" (fo5, pick) → Libra: Share, Aries: My own. A fork tug-of-war over the
//         fries, then one shared plate. Pisces sobs over the plate.
//   36.2  CARD 3 (rare) "What does a good relationship look like to you in ten years?" (fu4) → ARIES "still racing you
//         to the door." LIBRA "still choosing each other." The quiet beat: they're both picturing ten years.
//   57.6  TEN YEARS LATER: the same table. "you're late." "i ran four blocks." (the callback)  Pisces sobs.
//   66.0  last line "Card three. *Ten* years." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, hand, drawCard, win, sweat } from '../../koce01/scenes/cardkit.js'

const C1 = { q: 'Who’s more likely to *be late?*', topic: 'everyday', kind: 'who', at: 1.1, big: 3.9, write: 4.2, reveal: 6.8, done: 16.8, ans: { A: '*me.* (sorry.)', B: '*you.* (always.)' } }
const C2 = { q: '*Share plates* or *order your own?*', topic: 'food', kind: 'pick', opts: ['Share', 'My own'], deal: 17.4, at: 18.6, big: 21.4, write: 21.7, reveal: 24.3, done: 35.8, ans: { A: 'My own. *don’t touch my fries.*', B: 'Share. *everything.*' } }
const C3 = { q: 'What does a good relationship look like to you *in ten years?*', topic: 'future', kind: 'ask', rare: 'rare', deal: 36.4, at: 37.8, big: 41.4, write: 41.8, reveal: 44.6, done: 57.2, ans: { A: 'still racing you *to the door.*', B: 'still *choosing* each other.' } }
const FLASH = [9.4, 13.6], FORK = [27.6, 31.2], PLATE = [31.2, 35.6], LATER = [57.6, 67.4]
function plate(x, t, X, Y, k, n = 7) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fbf3e2'; x.beginPath(); x.ellipse(0, -4, 120, 32, 0, 0, Math.PI * 2); x.fill(); for (let i = 0; i < n; i++) { x.save(); x.translate(-60 + i * 20, -18 - (i % 3) * 6); x.rotate(-0.4 + (i % 4) * 0.25); R(x, INK, -6, -26, 12, 52); R(x, '#ffc861', -3, -23, 6, 46); x.restore() } x.restore() }
function fork(x, X, Y, rot) { x.save(); x.translate(X, Y); x.rotate(rot); R(x, INK, -8, 0, 16, 150); R(x, '#cfd6e6', -4, 4, 8, 142); R(x, INK, -26, -50, 52, 56); for (let i = 0; i < 4; i++) R(x, '#cfd6e6', -22 + i * 12, -46, 8, 48); x.restore() }
function scarf(x, r, col) { if (!r) return; const c = r.size / 36; R(x, INK, r.x - 10 * c, r.y + 3 * c, 20 * c, 5 * c); R(x, col, r.x - 9 * c, r.y + 3.6 * c, 18 * c, 3.8 * c); R(x, INK, r.x + 4 * c, r.y + 6 * c, 5 * c, 9 * c); R(x, col, r.x + 4.6 * c, r.y + 6.6 * c, 3.8 * c, 7.8 * c) }
const F = makeFilm({
  id: 'koce16', dur: 67.4, ending: 'cut', brk: 'whip',
  A: 'aries', B: 'libra',
  hook: { text: 'Three cards. Wait for *card three.*', out: 1.3 },
  cards: [C1, C2, C3],
  chapters: [{ at: 1.2, text: 'WHO’S LATE?', dur: 3.4 }, { at: 17.3, text: 'SHARE OR NOT?', dur: 3.4 }, { at: 36.3, text: 'TEN YEARS', dur: 4.2 }],
  lines: [
    { t: 7.5, who: 'B', text: 'remember our *first date?*' },
    { t: 9.6, who: 'A', text: 'i ran *four blocks!*' },
    { t: 11.6, who: 'B', text: 'with a *flower.* i forgave you instantly.' },
    { t: 14.0, who: 'S', text: 'laughing about the small stuff? that’s *practice.*' },
    { t: 25.0, who: 'B', text: '…not even *one?*' },
    { t: 26.6, who: 'A', text: 'okay. *one.*' },
    { t: 31.4, who: 'S', text: 'a compromise is a *yes* from both of you.' },
    { t: 33.6, who: 'P', text: 'one shared *plate!*' },
    { t: 45.4, who: 'A', text: '…wait. you picture us *in ten years?*' },
    { t: 47.8, who: 'B', text: '…you *do* too.' },
    { t: 50.6, who: 'S', text: 'big questions feel scary. asked kindly, they feel like *home.*' },
    { t: 54.2, who: 'A', text: 'ten years. *deal.*' },
    { t: 59.0, who: 'B', text: 'you’re *late.*' },
    { t: 60.8, who: 'A', text: 'i ran *four blocks.*' },
    { t: 62.8, who: 'B', text: '…i forgave you *instantly.*' },
  ],
  boxes: [{ from: 0, to: 4, open: 7.3, close: 16.7 }, { from: 4, to: 8, open: 24.8, close: 35.7 }, { from: 8, to: 12, open: 45.2, close: 57.0 }, { from: 12, to: 15, open: 58.8, close: 65.6 }],
  stickers: [
    { at: 1.4, out: 4.6, text: 'CARD 3 CHANGES EVERYTHING', x: 540, y: 1600, rot: -0.04, col: PINK, size: 40 },
    { at: FLASH[0], out: FLASH[1], text: 'FLASHBACK · FIRST DATE', x: 540, y: 960, rot: 0.05, col: '#ffd98a', size: 36 },
    { at: FLASH[0] + 0.4, out: FLASH[1], text: '8:17 PM (PLAN: 8:00)', x: 300, y: 1050, rot: -0.08, col: '#ff7a6a', size: 30 },
    { at: PLATE[0] + 0.2, out: PLATE[1], text: '✿ ONE SHARED PLATE', x: 540, y: 1090, rot: -0.04, col: '#9fe6b0', size: 38 },
    { at: LATER[0], out: 65.8, text: 'TEN YEARS LATER…', x: 540, y: 300, rot: -0.04, col: GOLD, size: 50 },
  ],
  last: { at: 66.0, text: 'Card three. *Ten* years.', size: 108, accentSize: 140 },
  mood: {
    A: [[0, 'wide', [1, -1], -0.16], [1.1, 'wide', [0.4, -1]], [4.2, 'squint', [0.4, 1]], [6.8, 'happy', [1, -0.6]], [7.5, 'wide', [1, 0]], [9.6, 'squint', [1, 0]], [11.6, 'happy', [1, 0]], [14.0, 'happy', [0, -1]],
      [18.6, 'wide', [0.4, -1]], [21.7, 'squint', [0.4, 1]], [24.3, 'wink', [1, -0.6]], [25.0, 'wide', [1, 0]], [26.6, 'happy', [1, 0]], [27.6, 'squint', [1, 1]], [31.2, 'happy', [0, 1]],
      [37.8, 'wide', [0.4, -1]], [41.8, 'squint', [0.4, 1]], [44.6, 'neutral', [1, -0.6]], [45.4, 'wide', [1, 0]], [47.8, 'sparkle', [1, 0]], [50.6, 'neutral', [0, -1]], [54.2, 'sparkle', [1, 0]], [55.4, 'heart', [1, 0]],
      [57.6, 'happy', [1, 0]], [59.0, 'wide', [1, 0]], [60.8, 'wink', [1, 0]], [62.8, 'heart', [1, 0]]],
    B: [[0, 'wide', [-1, -1], -0.12], [1.1, 'wide', [-0.4, -1]], [4.2, 'squint', [-0.4, 1]], [6.8, 'squint', [-1, -0.6]], [7.5, 'happy', [-1, 0]], [9.6, 'eyeroll', [-1, 0]], [11.6, 'sparkle', [-1, 0]], [14.0, 'happy', [0, -1]],
      [18.6, 'wide', [-0.4, -1]], [21.7, 'squint', [-0.4, 1]], [24.3, 'wide', [-1, -0.6]], [25.0, 'sparkle', [-1, 0]], [26.6, 'happy', [-1, 0]], [27.6, 'squint', [-1, 1]], [31.2, 'happy', [0, 1]],
      [37.8, 'wide', [-0.4, -1]], [41.8, 'squint', [-0.4, 1]], [44.6, 'neutral', [-1, -0.6]], [45.4, 'neutral', [-1, 0.5]], [47.8, 'sparkle', [-1, 0]], [50.6, 'neutral', [0, -1]], [54.2, 'happy', [-1, 0]], [55.4, 'heart', [-1, 0]],
      [57.6, 'happy', [-1, 0]], [59.0, 'squint', [-1, 0]], [60.8, 'happy', [-1, 0]], [62.8, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.1, 'sparkle', [0, -1]], [4.2, 'neutral', [0, 1]], [6.8, 'wide', [0, -1]], [9.4, 'sparkle', [0, -1]], [17.4, 'happy', [0, 1]], [24.3, 'wide', [0, -1]], [27.6, 'wide', [0, 1]], [31.2, 'sparkle', [0, 1]],
      [36.4, 'wide', [0, 1]], [37.8, 'sparkle', [0, -1]], [41.8, 'neutral', [0, 1]], [44.6, 'wide', [0, -1]], [47.8, 'sparkle', [0, -1]], [57.6, 'sparkle', [0, -1]]],
  },
  cry: [[0, 1.2, 2], [11.6, 14.0, 2], [24.4, 26.6, 1], [31.2, 36.0, 3], [36.4, 44.6, 1], [47.8, 50.6, 2], [50.6, 54.2, 1], [54.2, 57.6, 3], [60.8, 67.4, 3]],
  offset: {
    A: t => {
      let dx = 0, dy = -90 * Math.sin(Math.PI * prog(t, -0.4, 0.9))
      if (t > FLASH[0] && t < FLASH[1]) { const p = prog(t, FLASH[0], FLASH[0] + 1.6); dx = lerp(500, 0, ease.outCubic(p)); dy = -Math.abs(Math.sin(t * 18)) * 24 * (1 - p) }
      if (t > FORK[0] && t < FORK[1]) dx = -20 * Math.sin(t * 9) * win(t, FORK[0], FORK[1])
      dx += 60 * ease.inOutCubic(prog(t, 55.3, 55.8)) * (1 - prog(t, 57.4, 57.6))
      return [dx, dy]
    },
    B: t => [(t > FORK[0] && t < FORK[1] ? 20 * Math.sin(t * 9) * win(t, FORK[0], FORK[1]) : 0) - 60 * ease.inOutCubic(prog(t, 55.3, 55.8)) * (1 - prog(t, 57.4, 57.6)), 0],
  },
  cam: [[0, 1, 540, 960], [7.1, 1, 540, 960], [7.8, 1.1, 540, 985], [16.6, 1.1, 540, 985], [17.2, 1, 540, 960], [24.6, 1, 540, 960], [25.3, 1.1, 540, 985], [27.4, 1.1, 540, 985], [28.0, 1.1, 540, 1030], [31.0, 1.1, 540, 1030], [31.6, 1.1, 540, 985], [35.6, 1.1, 540, 985], [36.2, 1, 540, 960],
    [44.9, 1, 540, 960], [45.6, 1.1, 540, 985], [49.6, 1.1, 540, 985], [50.4, 1.16, 540, 1010], [54.0, 1.16, 540, 1010], [54.6, 1.1, 540, 985], [57.4, 1.1, 540, 985], [57.8, 1.12, 540, 1040]],
  punch: [{ at: 6.85, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 24.35, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 44.65, dur: 1.2, z: 0.1, x: 540, y: 820 }, { at: 60.9, dur: 1.2, z: 0.08, x: 540, y: 1060 }],
  draw: {
    back(x, t) { // the later glow: a warmer café ten years on
      const k = win(t, LATER[0], LATER[1] + 1, 0.4, 0.01); if (k > 0) { x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#ffb08a'; x.fillRect(0, 0, 1080, 1300); x.restore() }
    },
    cast(x, t, S) {
      if (t > FLASH[0] && t < FLASH[1]) { sweat(x, t, S.r.A, 1); bits(x, ['.P.P.', 'PPPPP', '.PYP.', '..G..', '..G..', '..G..'], { P: '#ff8fb1', Y: GOLD, G: '#2fc79a' }, S.r.A.x - 150, S.r.A.y - 40, 10) }
      if (t > LATER[0]) { scarf(x, S.r.A, '#e8344e'); scarf(x, S.r.B, '#7fc8f0') }
    },
    mid(x, t) {
      plate(x, t, 540, 1290, ease.outBack(prog(t, FORK[0] - 0.4, FORK[0])) * (1 - ease.inCubic(prog(t, 35.4, 35.8))), t < FORK[1] - 0.4 ? 7 : 4)
    },
    front(x, t, S) {
      // frame 0: cards two and three spinning in the air beside card one
      const k0 = 1 - ease.inCubic(prog(t, 0.6, 1.0))
      if (k0 > 0.01) { drawCard(x, t, C2, 300, 560, 200, { f: 0.2, rot: -0.5 + t, alpha: k0 }); drawCard(x, t, C3, 860, 520, 220, { f: 0.25, rot: 0.4 - t, alpha: k0, glint: (t * 2) % 1 }); sparkles(x, t, 860, 520, -0.2, { n: 10, Rr: 160 }) }
      if (t > FORK[0] && t < FORK[1]) { const w = Math.sin(t * 9) * 18; fork(x, 400 + w, 1210, 0.9); fork(x, 680 + w, 1210, -0.9) }
      if (t > 31.3 && t < 35.4) hearts(x, t, 31.35, 540, 1060, { n: 6, spread: 200 })
      if (t > 54.3 && t < 57.4) hearts(x, t, 54.35, 540, 1040, { n: 8, spread: 300 })
      if (t > 62.8) hearts(x, t, 62.85, 540, 1040, { n: 8, spread: 300 })
    },
    over(x, t) {
      const k = 0.4 * win(t, 49.4, 54.0, 0.6, 0.6); if (k > 0) { x.save(); x.globalAlpha = k; const g = x.createRadialGradient(540, 1000, 200, 540, 1000, 1100); g.addColorStop(0, 'rgba(5,3,14,0)'); g.addColorStop(1, 'rgba(5,3,14,1)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = win(t, FLASH[0], FLASH[1], 0.25, 0.3); if (f > 0) { x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = 0.5 * f; x.fillStyle = '#b08850'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    },
  },
  extraCues: [
    ['whoosh', FLASH[0], 0.6, 0.05], ...Array.from({ length: 6 }, (_, i) => ['tick', +(FLASH[0] + 0.15 + i * 0.22).toFixed(2), 0.04]), ['bell', FLASH[0] + 1.7, 1567.98, 0.03, 1.2, 0],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(FORK[0] + 0.2 + i * 0.4).toFixed(2), 0.05]), ['pop', PLATE[0], 1046.5, 0.05, 0], ['glitter', PLATE[0], PLATE[0] + 0.8],
    ['whoosh', 49.4, 1.4, 0.02], ['bell', 54.3, 1318.51, 0.03, 2, 0], ['glitter', 54.3, 55.6],
    ['whoosh', LATER[0] - 0.1, 0.8, 0.05], ['bell', LATER[0] + 0.1, 1567.98, 0.04, 1.6, 0], ['pop', 60.9, 880, 0.05, 0],
  ],
})
export const { DURATION, SCENES, CUES } = F
