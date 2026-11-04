// nwfe12: WAIT FOR IT, "Even the snow holds hands." (20 s vertical trial reel, Wait for It Vol. 2 ep 12, music: screwed · Fm)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
// Pisces is the hero here, so the background Pisces is off and the lead does the crying.
//   0.0–3.8   "Pisces is lying | *in the snow.*" + "wait for it…". ♓ Pisces, mid-flop, lies on its back in a snowy
//             patch, sniffling, wings of snow sweeping; ♎ Libra watches from the right. Beside Pisces is an older
//             snow-angel imprint.
//   3.95–9.3  "It's just | *lying there…*"  Stickers: "it's *not moving*" · "five minutes: *still lying there*" ·
//             "…is it *crying?!*". The snow keeps falling on it.
//   9.45      card cut.
//   9.5–13.4  "What is it doing? | *Holding hands.*"  On the drop Pisces hops up: two snow angels side by side, the
//             wing tips touching like held hands (Libra's from earlier, and Pisces's). ♓ PISCES (happy-crying):
//             "now we're *holding hands*. in snow."
//   13.45–15.5 "Even the *snow* holds hands."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, HEART, drawBits, pop01, outK, popOut, r3, plate, sparkles, snowfall, snowBank } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const ANG = [{ x: 400, y: 1180, who: 'LIBRA' }, { x: 640, y: 1180, who: 'PISCES' }]
const UP = T => [T.reveal + 0.02, T.reveal + 0.5]

function patch(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  R(x, INK, 220, 1040, 600, 280); R(x, '#eef6ff', 226, 1046, 588, 268)
  for (let i = 0; i < 14; i++) R(x, '#d6e6f8', 240 + (i * 83) % 560, 1060 + (i * 47) % 240, 18, 8)
  x.restore()
}

/** a snow-angel imprint: a pressed star with fanned wings (sweep 0…1) */
function angel(x, cx, cy, sweep, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy)
  const wing = 0.5 + 0.6 * sweep
  x.fillStyle = '#bcd3ee'
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 118, d < 0 ? Math.PI - wing : -wing * 0, d < 0 ? Math.PI : wing * 0 + 0.0001, d > 0); x.closePath() }
  // wings: two fans
  for (const d of [-1, 1]) {
    x.beginPath(); x.moveTo(0, -10)
    const a0 = d < 0 ? Math.PI + 0.15 : -0.15, a1 = d < 0 ? Math.PI + 0.15 + wing : -0.15 - wing
    x.arc(0, -10, 112, Math.min(a0, a1), Math.max(a0, a1)); x.closePath(); x.fill()
  }
  // the body: a five-point star press
  x.beginPath()
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 34 : 78, an = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.7) }
  x.closePath(); x.fillStyle = '#a9c4e6'; x.fill()
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe12', key: 'Fm', seed: 4712,
  hero: { sign: 'pisces', lineColor: '#c7b8ff' },
  date: { sign: 'libra' },
  noPis: true,
  pos: { hero: { x: 640, y: 1150, s: 200 }, date: { x: 920, y: 1060, s: 190 } },
  heroDX: (t, T) => lerp(0, -430, ease.inOutCubic(prog(t, ...UP(T)))),
  heroTilt: (t, T) => lerp(-Math.PI / 2 + 0.08 * Math.sin(t * 1.6), 0, ease.outBack(prog(t, ...UP(T)), 1.4)),
  heroTears: (ph, t, T) => ph === 'hook' ? 1 : ph === 'build' ? (t > T.stk[2] ? 2 : 1) : ph === 'reveal' ? 2 : 3,
  h0: 'Pisces is lying | *in the snow.*', h0Accent: '#c7b8ff',
  h1: 'It’s just | *lying there…*',
  h2: 'What is it doing? | *Holding hands.*', h2Accent: PINK,
  last: 'Even the *snow* holds hands.', lastAccent: GOLD,
  stickers: ['it’s *not moving*', 'five minutes: *still lying there*', '…is it *crying?!*'],
  line: { who: 'hero', text: 'now we’re *holding hands*. in snow.' },
  focus: { x: 560, y: 1080 },
  glow: { x: 520, y: 1100 },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: 'squint', look: [0, -1] }
    if (ph === 'reveal') return { mood: 'happy', look: [1, 0.6] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > T.stk[2] ? 'wide' : 'neutral', look: [-1, 0.6] }
    if (ph === 'reveal' && t > T.reveal + 0.5) return { mood: 'heart', look: [-1, 0.6] }
    return null
  },
  back(x, t, T) {
    snowBank(x, t, T, 935)
    snowfall(x, t, { n: 30, seed: 17, alpha: 0.55 * clamp(popOut(t, T.out)), y1: 1300, speed: 0.7 })
  },
  mid(x, t, T) {
    patch(x, t, T)
    const k = clamp(popOut(t, T.out))
    const sweep = t < T.reveal ? (t < T.build ? 0.5 + 0.5 * Math.sin(t * 2.4) : 0.95) : 1
    angel(x, ANG[0].x, ANG[0].y, 1, k)
    angel(x, ANG[1].x, ANG[1].y, sweep, k)
    // wing tips touch: a little heart where the two angels meet
    const hk = pop01(t, T.reveal + 0.55, 0.3, 2.4) * outK(t, T.out)
    if (hk > 0.01) drawBits(x, HEART, { H: '#ff5d8f' }, 520, 1150, 9 * hk)
    for (let i = 0; i < 2; i++) {
      const lk = pop01(t, T.reveal + 0.7 + i * 0.15, 0.3, 2.4) * outK(t, T.out)
      if (lk > 0.01) plate(x, ANG[i].who, ANG[i].x, ANG[i].y + 105, { size: 22, bg: i ? '#c7b8ff' : '#ffb3cc', alpha: clamp(lk) })
    }
  },
  front(x, t, T) {
    snowfall(x, t, { n: 20, seed: 18, alpha: 0.8 * clamp(popOut(t, T.out)), speed: 1.1 })
    sparkles(x, t, 520, 1150, T.reveal + 0.5, 12, 200, 1, [GOLD, '#ffffff', PINK])
  },
  cues: T => [
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', r3(0.1 + i * 0.65), 0.2, 0.012]),
    ['pop', r3(T.reveal + 0.1), 659.25, 0.035, 0], ['pop', r3(T.reveal + 0.55), 1567.98, 0.035, -0.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [BONE, GOLD]
