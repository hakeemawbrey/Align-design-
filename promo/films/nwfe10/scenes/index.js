// nwfe10: WAIT FOR IT, "Practised listening." (20 s vertical trial reel, Wait for It Vol. 2 ep 10, music: screwed · Bm)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Leo is rehearsing | *a speech.*" + "wait for it…". ♌ Leo, mid-gesture, rehearses at a tall mirror (its
//             reflection gestures back); ♏ Scorpio waits on the right. A rehearsal counter ticks up.
//   3.95–9.3  "This will be | *a monologue…*"  Stickers: "rehearsal *twelve*" · "now with *hand gestures*" ·
//             "…it's going to be *an hour?!*". Speech-bubble dots pile up over the mirror.
//   9.45      card cut.
//   9.5–13.4  "The speech? | *One line.*"  On the drop the big bubble reads "how was your day?" and Leo turns to Scorpio,
//             all ears. ♌ LEO: "how was your day? *I'm listening.*"
//   13.45–15.5 "Practised *listening*."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall, INTER } from '../../nwfe01/scenes/wait.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const MIR = { x: 520, y: 1030, w: 190, h: 300 }
const LEO = signStar('leo')

function mirror(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const { x: cx, y: cy, w, h } = MIR
  x.save(); x.globalAlpha = k
  // stand
  R(x, INK, cx - 10, cy + h / 2, 20, 70); R(x, '#7a4a2a', cx - 6, cy + h / 2, 12, 66); R(x, INK, cx - 60, cy + h / 2 + 64, 120, 16)
  // frame + glass
  R(x, INK, cx - w / 2 - 16, cy - h / 2 - 16, w + 32, h + 32); R(x, GOLD, cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20)
  R(x, '#3a4a8a', cx - w / 2, cy - h / 2, w, h)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  // the reflection: Leo, mirrored and a bit faded, gesturing in sync (until the turn)
  const turn = prog(t, T.reveal, T.reveal + 0.3)
  if (turn < 1) {
    x.save(); x.translate(cx + 40, 0); x.scale(-1, 1); x.translate(-(cx + 40), 0)
    drawStarChar(x, cx + 40, cy + 30, 180, t, { color: LEO.color, mood: 'happy', look: [1, 0], alpha: 0.55 * (1 - turn), seed: 3, glow: 0.3, hops: [0.3, 1.5, 2.7, 4.2, 5.4, 6.6, 7.8] })
    x.restore()
  }
  for (let i = 0; i < 3; i++) { x.save(); x.translate(cx - w / 2 + 30 + i * 60, cy - h / 2); x.rotate(0.5); R(x, 'rgba(200,220,255,0.18)', 0, -40, 18, 420); x.restore() }
  x.restore()
  x.restore()
}

function bubbles(x, t, T) {
  const k = clamp(popOut(t, T.out))
  // build: "…" bubbles stacking above the mirror
  if (t < T.reveal) {
    const n = Math.min(5, Math.floor(prog(t, 1.0, T.stall) * 6))
    for (let i = 0; i < n; i++) {
      const bx = MIR.x - 120 + (i % 3) * 110, by = 790 - Math.floor(i / 3) * 70 + 4 * Math.sin(t * 3 + i)
      x.save(); x.globalAlpha = k * outK(t, [T.reveal - 0.1, T.reveal])
      R(x, INK, bx - 50, by - 26, 100, 52); R(x, BONE, bx - 46, by - 22, 92, 44)
      for (let d = 0; d < 3; d++) R(x, INK, bx - 26 + d * 22, by - 4, 10, 10)
      x.restore()
    }
  } else {
    // the whole speech
    const a = pop01(t, T.reveal + 0.05, 0.4, 2.2) * outK(t, T.out)
    if (a <= 0.01) return
    x.save(); x.translate(400, 800); x.scale(a, a)
    R(x, INK, -230, -56, 460, 112); R(x, '#ffffff', -224, -50, 448, 100)
    R(x, INK, -150, 50, 40, 40); R(x, '#ffffff', -146, 50, 32, 30)
    x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('how was your day?', 0, 2)
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'nwfe10', key: 'Bm', seed: 4710,
  hero: { sign: 'leo', lineColor: '#ffd27a' },
  date: { sign: 'scorpio' },
  pos: { hero: { x: 220, y: 1080, s: 230 }, date: { x: 900, y: 1090, s: 205 }, pis: { x: 990, y: 640, s: 110 } },
  h0: 'Leo is rehearsing | *a speech.*', h0Accent: '#ffd27a',
  h1: 'This will be | *a monologue…*',
  h2: 'The speech? | *One line.*', h2Accent: PINK,
  last: 'Practised *listening*.', lastAccent: GOLD,
  stickers: ['rehearsal *twelve*', 'now with *hand gestures*', '…it’s going to be *an hour?!*'],
  line: { who: 'hero', text: 'how was your day? *I’m listening.*' },
  focus: { x: 540, y: 960 },
  glow: { x: 420, y: 900 },
  heroHops: [0.3, 1.5, 2.7, 4.2, 5.4, 6.6, 7.8],
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > T.stk[1] ? 'wink' : 'happy', look: [1, 0], squash: 0.04 * Math.sin(t * 6) }
    if (ph === 'reveal') return { mood: 'sparkle', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'build') return { mood: t > T.stk[2] ? 'eyeroll' : 'neutral', look: [-1, 0] }
    if (ph === 'reveal') return { mood: t > T.reveal + 0.5 ? 'happy' : 'wide', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 16, seed: 15, alpha: 0.35 * clamp(popOut(t, T.out)), y1: 940, speed: 0.5 }) },
  mid(x, t, T) {
    mirror(x, t, T)
    const n = Math.min(12, 1 + Math.floor(t * 1.4))
    const ck = clamp(popOut(t, T.out)) * outK(t, [T.reveal, T.reveal + 0.15])
    if (ck > 0.01) plate(x, `REHEARSAL ${n}`, MIR.x, MIR.y + MIR.h / 2 + 110, { size: 24, bg: BONE, alpha: ck })
    const lk = pop01(t, T.reveal + 0.7, 0.3, 2.4) * outK(t, T.out)
    if (lk > 0.01) plate(x, 'LISTENING…', 220, 1250, { size: 26, bg: GOLD, alpha: clamp(lk), scale: 0.8 + 0.2 * clamp(lk) })
  },
  front(x, t, T) {
    bubbles(x, t, T)
    sparkles(x, t, 400, 800, T.reveal + 0.1, 12, 260, 1, [GOLD, BONE, PINK])
  },
  cues: T => [
    ...[0.3, 1.5, 2.7, 4.2, 5.4, 6.6, 7.8].map(v => ['pop', r3(v + 0.05), 783.99, 0.015, -0.4]),
    ['pop', r3(T.reveal + 0.1), 1174.66, 0.035, 0], ['pop', r3(T.reveal + 0.75), 1567.98, 0.03, 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [lerp, ease]
