// koce17 · ONE CARD, TWO PEOPLE ep 17 (long) · "Card three: making up" (64 s vertical, star_advice post, lofi · D). Hard cut.
//   Three cards in one night; the third changes things. Chapter stickers CARD 1 / CARD 2 / CARD 3.
//   0.0   frame 0: Taurus mid-flour-cloud from a cooking fail, Scorpio mid-smirk, three cards in the air. Hook: "Card three
//         changed their *whole night.*"  Record scratch + freeze at 0.45. Promise sticker: WAIT FOR CARD 3.
//   1.9   CARD 1 "Who's the better cook?" (fo3, who) → both point at themselves. FLASHBACK: the cook-off; both made toast.
//   18.2  CARD 2 "Made bed or unmade bed?" (ev4, pick) → Taurus: Made, Scorpio: Unmade ("it's a nest"). A bed-making
//         speedrun HUD. Pisces cries at the tidy bed.
//   36.6  CARD 3 (rare) "What's the best way to make up with you after a fight?" (co3) → the room goes quiet: Tuesday's
//         little fight never got made up. TAURUS "a real sorry." SCORPIO "a walk. not flowers." They say sorry, take the walk.
//   62.6  last line "Sorry first. *Then* the walk." (hard cut)
import { makeFilm, R, INK, GOLD, BONE, PINK, prog, ease, lerp, clamp, bits, hearts, sparkles, hand, drawCard, win, rng } from '../../koce01/scenes/cardkit.js'
import { gameHud, gameHudCues } from '../../hookkit.js'

const C1 = { q: 'Who’s the *better cook?*', topic: 'food', kind: 'who', at: 1.9, big: 4.6, write: 4.9, reveal: 7.5, done: 17.8, ans: { A: '*me.* obviously.', B: '*me.* obviously.' } }
const C2 = { q: '*Made bed* or *unmade bed?*', topic: 'everyday', kind: 'pick', opts: ['Made', 'Unmade'], deal: 18.2, at: 19.4, big: 22.0, write: 22.3, reveal: 24.9, done: 28.3, ans: { A: 'Made. *hospital corners.*', B: 'Unmade. *it’s a nest.*' } }
const C3 = { q: 'What’s the best way to *make up with you* after a fight?', topic: 'conflict', kind: 'ask', rare: 'rare', deal: 36.6, at: 37.8, big: 41.2, write: 41.6, reveal: 44.4, done: 56.4, ans: { A: 'a *real* sorry.', B: 'a walk. *not flowers.*' } }
const FLASH = [9.4, 13.4], RUN = [28.6, 33.0], WALK = [56.8, 59.6]
const HUD = { at: RUN[0], out: [33.4, 33.8], title: 'BED% · ANY%', splits: [{ at: 29.6, name: 'PILLOWS' }, { at: 30.6, name: 'SHEET' }, { at: 31.6, name: 'DUVET' }, { at: 32.4, name: 'CORNERS ✓' }] }
function flour(x, t, X, Y, t0, life = 1.4, n = 26) { const tt = t - t0; if (tt < 0 || tt > life) return; const r = rng(7); x.save(); x.globalAlpha = 1 - tt / life; for (let i = 0; i < n; i++) { const a = r() * 6.28, v = 120 + r() * 260, s = 18 + r() * 30; R(x, '#fbf7ee', X + Math.cos(a) * v * (0.3 + tt), Y + Math.sin(a) * v * (0.3 + tt) * 0.7 - tt * 60, s, s) } x.restore() }
function toast(x, X, Y, k) { if (k <= 0.01) return; x.save(); x.translate(X, Y); x.scale(k, k); R(x, INK, -50, -50, 100, 96); R(x, '#5a3a22', -44, -44, 88, 84); R(x, '#3a2414', -30, -30, 60, 56); x.restore() }
function bed(x, t, k, made) { if (k <= 0.01) return; x.save(); x.translate(540, 820); x.scale(k, k); R(x, INK, -280, -40, 560, 220); R(x, '#a87048', -272, -32, 544, 30); R(x, INK, -290, -150, 40, 330); R(x, INK, 250, -60, 40, 240); R(x, '#fbf3e2', -250, -8, 500, 170)
  const m = made; R(x, '#7fc8f0', -250 + (1 - m) * 40, 30 + (1 - m) * 20, 500 - (1 - m) * 120, 130); if (m < 1) for (let i = 0; i < 4; i++) R(x, '#5aa8d8', -200 + i * 110, 40 + (i % 2) * 30, 70, 14)
  R(x, INK, -240, -20, 150, 60); R(x, '#ffffff', -234, -14 + (1 - m) * 20, 138, 48); x.restore() }
function coat(x, r, col) { if (!r) return; const c = r.size / 36; R(x, INK, r.x - 12 * c, r.y + 2 * c, 24 * c, 6 * c); R(x, col, r.x - 11 * c, r.y + 2.8 * c, 22 * c, 4.4 * c) }
const F = makeFilm({
  id: 'koce17', dur: 64, ending: 'cut', brk: 'scratch', recAt: 0.45, recLen: 1.1, freezeText: 'three cards. *one* changed everything.',
  A: 'taurus', B: 'scorpio',
  hook: { text: 'Card three changed their *whole night.*', out: 1.75 },
  cards: [C1, C2, C3],
  chapters: [{ at: 2.0, text: 'THE BETTER COOK', dur: 3.4 }, { at: 18.3, text: 'THE BED', dur: 3.4 }, { at: 36.7, text: 'MAKING UP', dur: 4.2 }],
  lines: [
    { t: 8.2, who: 'B', text: '…me. remember the *cook-off?*' },
    { t: 10.2, who: 'A', text: 'we both made *toast.*' },
    { t: 12.0, who: 'B', text: 'very *confident* toast.' },
    { t: 14.2, who: 'S', text: 'nobody won. the fun was cooking it *together.*' },
    { t: 25.6, who: 'A', text: 'a *nest?!*' },
    { t: 27.0, who: 'B', text: 'a *cozy* nest.' },
    { t: 33.4, who: 'P', text: 'it’s so *tidy!*' },
    { t: 45.2, who: 'B', text: '…we never made up from *tuesday.*' },
    { t: 47.6, who: 'A', text: 'i know. i’m *sorry.*' },
    { t: 49.6, who: 'B', text: 'me too. i’m *sorry.*' },
    { t: 51.8, who: 'S', text: 'a repair doesn’t have to be big. it has to be *real.*' },
    { t: 55.2, who: 'A', text: '…*walk?*' },
    { t: 56.4, who: 'B', text: '*walk.*' },
    { t: 60.0, who: 'P', text: 'they made *up!*' },
  ],
  boxes: [{ from: 0, to: 4, open: 8.0, close: 17.7 }, { from: 4, to: 7, open: 25.4, close: 35.9 }, { from: 7, to: 13, open: 45.0, close: 58.4 }, { from: 13, to: 14, open: 59.8, close: 62.3 }],
  stickers: [
    { at: 2.2, out: 5.0, text: 'WAIT FOR CARD 3', x: 540, y: 1600, rot: -0.04, col: PINK, size: 44 },
    { at: FLASH[0], out: FLASH[1], text: 'FLASHBACK · THE COOK-OFF', x: 540, y: 960, rot: 0.05, col: '#ffd98a', size: 36 },
    { at: FLASH[0] + 1.6, out: FLASH[1], text: 'RESULT: TOAST', x: 540, y: 1220, rot: -0.07, col: '#ff7a6a', size: 40 },
    { at: 45.0, out: 50.2, text: 'TUESDAY’S LITTLE FIGHT · NOT MADE UP YET', x: 540, y: 960, rot: -0.03, col: LAVK(), size: 28 },
  ],
  last: { at: 62.6, text: 'Sorry first. *Then* the walk.' },
  mood: {
    A: [[0, 'wide', [0, -1], -0.1], [1.9, 'wide', [0.4, -1]], [4.9, 'squint', [0.4, 1]], [7.5, 'wide', [1, -0.6]], [8.2, 'squint', [1, 0]], [10.2, 'happy', [1, 0]], [14.2, 'happy', [0, -1]],
      [19.4, 'wide', [0.4, -1]], [22.3, 'squint', [0.4, 1]], [24.9, 'neutral', [1, -0.6]], [25.6, 'wide', [1, 0]], [27.0, 'eyeroll', [1, 0]], [28.6, 'squint', [0, -1]], [32.4, 'sparkle', [0, -1]],
      [37.8, 'wide', [0.4, -1]], [41.6, 'squint', [0.4, 1]], [44.4, 'neutral', [1, -0.6]], [45.2, 'neutral', [1, 0.6]], [47.6, 'neutral', [1, 0]], [49.6, 'sparkle', [1, 0]], [51.8, 'happy', [0, -1]], [55.2, 'happy', [1, 0]], [56.4, 'heart', [1, 0]]],
    B: [[0, 'wink', [-1, -1]], [1.9, 'wide', [-0.4, -1]], [4.9, 'squint', [-0.4, 1]], [7.5, 'wide', [-1, -0.6]], [8.2, 'squint', [-1, 0]], [10.2, 'happy', [-1, 0]], [14.2, 'happy', [0, -1]],
      [19.4, 'wide', [-0.4, -1]], [22.3, 'squint', [-0.4, 1]], [24.9, 'wink', [-1, -0.6]], [25.6, 'happy', [-1, 0]], [27.0, 'wink', [-1, 0]], [28.6, 'wide', [0, -1]], [32.4, 'happy', [-1, 0]],
      [37.8, 'wide', [-0.4, -1]], [41.6, 'squint', [-0.4, 1]], [44.4, 'neutral', [-1, -0.6]], [45.2, 'neutral', [-1, 0.6]], [47.6, 'sparkle', [-1, 0]], [49.6, 'neutral', [-1, 0]], [51.8, 'happy', [0, -1]], [55.2, 'happy', [-1, 0]], [56.4, 'heart', [-1, 0]]],
    P: [[0, 'wide', [0, -1]], [1.9, 'sparkle', [0, -1]], [4.9, 'neutral', [0, 1]], [7.5, 'wide', [0, -1]], [10.2, 'happy', [0, -1]], [18.2, 'happy', [0, 1]], [24.9, 'wide', [0, -1]], [32.4, 'sparkle', [0, -1]],
      [36.6, 'wide', [0, 1]], [37.8, 'sparkle', [0, -1]], [41.6, 'neutral', [0, 1]], [44.4, 'wide', [0, -1]], [45.2, 'neutral', [0, 0.5]], [47.6, 'sparkle', [0, -1]], [57.4, 'sparkle', [1, 0]]],
  },
  cry: [[0, 1.9, 1], [10.2, 14.2, 2], [25.0, 27.0, 1], [32.4, 36.4, 3], [45.4, 47.6, 1], [47.6, 51.8, 2], [51.8, 56.4, 1], [56.6, 64, 3]],
  offset: {
    A: t => [950 * ease.inOutCubic(prog(t, WALK[0] + 0.6, WALK[1])) + 60 * ease.inOutCubic(prog(t, 56.4, 56.9)), (t > WALK[0] + 0.6 && t < WALK[1] + 0.4 ? -Math.abs(Math.sin(t * 10)) * 18 : 0)],
    B: t => [500 * ease.inOutCubic(prog(t, WALK[0] + 0.3, WALK[1] - 0.2)) - 60 * ease.inOutCubic(prog(t, 56.4, 56.9)) * (1 - prog(t, WALK[0], WALK[0] + 0.3)), (t > WALK[0] + 0.3 && t < WALK[1] ? -Math.abs(Math.sin(t * 10 + 1)) * 18 : 0)],
  },
  cam: [[0, 1, 540, 960], [7.8, 1, 540, 960], [8.5, 1.1, 540, 985], [17.6, 1.1, 540, 985], [18.2, 1, 540, 960], [25.2, 1, 540, 960], [25.9, 1.1, 540, 985], [36.0, 1.1, 540, 985], [36.6, 1, 540, 960],
    [44.7, 1, 540, 960], [45.4, 1.1, 540, 985], [51.0, 1.1, 540, 985], [51.6, 1.16, 540, 1010], [56.2, 1.16, 540, 1010], [56.8, 1.06, 560, 1000]],
  punch: [{ at: 7.55, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 24.95, dur: 1.0, z: 0.1, x: 540, y: 820 }, { at: 44.45, dur: 1.2, z: 0.1, x: 540, y: 820 }],
  draw: {
    cast(x, t, S) {
      flour(x, t, S.r.A.x + 40, S.r.A.y - 60, -0.6, 1.8, 30)
      if (t > FLASH[0] && t < FLASH[1]) { flour(x, t, S.r.A.x, S.r.A.y - 80, FLASH[0] + 0.3, 1.4); flour(x, t, S.r.B.x, S.r.B.y - 80, FLASH[0] + 0.7, 1.4) }
      if (t > WALK[0]) { coat(x, S.r.A, '#9fd86a'); coat(x, S.r.B, '#a8326a') }
    },
    mid(x, t) { const k = win(t, FLASH[0] + 1.2, FLASH[1], 0.3, 0.3); toast(x, 360, 1250, k); toast(x, 720, 1250, k) },
    front(x, t) {
      const k0 = 1 - ease.inCubic(prog(t, 0.3, 0.45)) * 0 - ease.inCubic(prog(t, 1.5, 1.9))
      if (k0 > 0.01) { drawCard(x, t, C2, 300, 560, 200, { f: 0.2, rot: -0.5 + t, alpha: k0 }); drawCard(x, t, C3, 860, 520, 220, { f: 0.25, rot: 0.4 - t, alpha: k0, glint: (t * 2) % 1 }) }
      bed(x, t, ease.outBack(prog(t, RUN[0] - 0.3, RUN[0])) * (1 - ease.inCubic(prog(t, 35.4, 35.8))), ease.inOutCubic(prog(t, RUN[0] + 0.6, RUN[1] - 0.6)))
      if (t > RUN[1] - 0.6 && t < RUN[1] + 0.3) sparkles(x, t, 540, 820, RUN[1] - 0.6, { n: 12, Rr: 300 })
      if (t > 49.8 && t < 56) hearts(x, t, 49.85, 540, 1040, { n: 6, spread: 240, cols: ['#ff8fb1', GOLD] })
      if (t > 60.0) hearts(x, t, 60.05, 540, 1000, { n: 6, spread: 140 })
    },
    over(x, t) {
      const k = 0.42 * win(t, 44.6, 51.8, 0.7, 0.8); if (k > 0) { x.save(); x.globalAlpha = k; const g = x.createRadialGradient(540, 1000, 200, 540, 1000, 1100); g.addColorStop(0, 'rgba(5,3,14,0)'); g.addColorStop(1, 'rgba(5,3,14,1)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = win(t, FLASH[0], FLASH[1], 0.25, 0.3); if (f > 0) { x.save(); x.globalCompositeOperation = 'color'; x.globalAlpha = 0.5 * f; x.fillStyle = '#b08850'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    },
  },
  extraScenes: [gameHud(HUD)],
  extraCues: [['boom', 0.0, 0.25], ['whoosh', 0.0, 0.8, 0.04], ['whoosh', FLASH[0], 0.6, 0.05], ['boom', FLASH[0] + 0.3, 0.15], ['boom', FLASH[0] + 0.7, 0.15], ['pop', FLASH[0] + 1.6, 392, 0.05, 0],
    ...gameHudCues(HUD), ['bell', RUN[1] - 0.5, 2093, 0.035, 1.2, 0], ['glitter', RUN[1] - 0.6, RUN[1] + 0.3],
    ['whoosh', 44.6, 1.6, 0.02], ['bell', 49.8, 1318.51, 0.03, 2, 0], ['whoosh', WALK[0] + 0.4, 1.2, 0.03], ['tick', 59.7, 0.05]],
})
function LAVK() { return '#c9a6ff' }
export const { DURATION, SCENES, CUES } = F
