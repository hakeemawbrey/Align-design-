// r2t0185: star_talk, SOLO, "Your Pisces roomie | be like." (topic: your Pisces roommate) (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards; Pisces cries in every one): living with the softest sign in the zodiac. Ending: callback.
//   a funeral for the fern · a three-page note about the dishes · leftovers labelled "eat me, I'm lonely"
//   · a three-hour bath · you stubbed a toe, they wrote an ode · every receipt kept for the memories · rent day:
//   painting the sky · checked your compatibility: roomies aligned · asleep on your couch, again
//   group "Soft heart. | *Messy sink.*"   callback "The fern grew back. | *Big party.*" (the fern returns, confetti)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, frame, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'pisces', L = { x: -170 }
function confetti(x, t, t0, cx, cy, n = 18) {
  if (t < t0) return
  const C = [PINK, MINT, GOLD, SKYB, LAV]
  for (let i = 0; i < n; i++) { const ph = ((t - t0) * 0.5 + i / n) % 1; x.save(); x.globalAlpha = Math.min(1, (t - t0) * 3); x.fillStyle = C[i % 5]; x.translate(cx - 380 + ((i * 97) % 760), cy - 300 + ph * 600); x.rotate(t * 3 + i); x.fillRect(-8, -14, 16, 28); x.restore() }
}
const COUCH = (x, cx, cy, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-330, -120, 660, 120); x.fillRect(-360, -60, 720, 150); x.fillStyle = '#7a6ac8'; x.fillRect(-322, -112, 644, 104); x.fillStyle = '#9a8ae0'; x.fillRect(-352, -52, 704, 134)
  x.fillStyle = INK; x.fillRect(-340, 90, 30, 40); x.fillRect(310, 90, 30, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The fern died. | *They held a funeral.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'plant', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.7, rot: 0.25 })
      label(x, 790, 680, 'RIP FERN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 46, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'GUESTS: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A note about the dishes. | *Three pages.*', mood: 'squint', tears: 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) note(x, 790 + i * 18, 820 + i * 22, pop01(t, P.t0 + 0.2 + (2 - i) * 0.25, 0.3, 2), i ? ' | | ' : 're: the dishes | it’s okay | I love you', { head: `PAGE ${i + 1}/3`, headBg: SKYB, size: 34, w: 340, rot: (i - 1) * 0.06 })
      hearts(x, t, 470, 820, P.t0 + 1.2, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Labelled the leftovers: | *“eat me, I’m lonely.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'bowl', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 780, 'EAT ME ♥', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.06 })
    } },
  { sign: S, cap: 'Three-hour bath. | *Came out reborn.*', mood: 'sleepy', tears: 1, look: [0, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(150, 960, 620, 200); x.fillStyle = BONE; x.fillRect(160, 970, 600, 180); x.fillStyle = '#8fd0ff'; x.fillRect(176, 970, 568, 70)
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 9; i++) { const ph = (t * 0.5 + i / 9) % 1; x.save(); x.globalAlpha = 0.8 * Math.sin(Math.PI * ph); x.strokeStyle = '#ffffff'; x.lineWidth = 5; x.beginPath(); x.arc(220 + i * 62, 960 - ph * 220, 14 + (i % 3) * 6, 0, 7); x.stroke(); x.restore() }
      const h = Math.min(3, 1 + Math.floor(prog(lt, 0.3, 1.5) * 2.99))
      label(x, 820, 660, `BATH: HOUR ${h}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You stubbed a toe. | *They wrote an ode.*', mood: 'wide', tears: 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.3, 0.3, 2), 'oh brave toe, | so small, | so wronged…', { head: 'ODE TO YOUR TOE', headBg: LAV, size: 36, w: 360, font: "Georgia, serif", weight: 700 })
      label(x, 790, 1090, 'VERSE 1 OF 9', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept every receipt. | *For the memories.*', mood: 'heart', tears: 2, look: [1, 1], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) note(x, 720 + i * 34, 800 + (i % 2) * 40, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), 'coffee | 2 cookies', { w: 200, size: 30, rot: (i - 2) * 0.1, font: MONO, weight: 700 })
      label(x, 790, 1080, 'BOX OF FEELINGS: 14', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rent is due. | *They’re painting clouds.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 200, x => {
        x.fillStyle = '#ffb38a'; x.fillRect(-130, -100, 260, 200); x.fillStyle = '#ff8fb1'; x.fillRect(-130, 20, 260, 80)
        x.fillStyle = BONE; const p = clamp((lt - 0.3) / 1.2); for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(-60 + i * 60, -30 + (i % 2) * 20, 50 * p, 22 * p, 0, 0, 7); x.fill() }
      }, { col: LAV })
      label(x, 790, 1080, 'RENT: TOMORROW (PROMISE)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your compatibility. | *Sobbed: “soulmates.”*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 720, '♓︎ + YOU', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 48, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 900, '✦ ROOMIES: ALIGNED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.9 * 1.29, 8, 200, 0.3)
      hearts(x, t, 470, 820, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Asleep on your couch. | *Again.*', mood: 'sleepy', tears: 1, star: { x: -40, y: 20, s: 260 },
    back(x, t, lt, P) { COUCH(x, 540, 1100, 1) },
    front(x, t, lt, P) {
      x.save(); x.fillStyle = INK; x.fillRect(300, 1000, 440, 70); x.fillStyle = PINK; x.fillRect(306, 1006, 428, 58); x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(320 + i * 86, 1006, 40, 58); x.restore()
      label(x, 790, 640, 'NIGHT 12', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0185', key: 'F', accent: '#6fc3ff', solo: S, ending: 'callback',
  title: 'Your Pisces roomie | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Messy sink.*', mood: 'heart' },
  last: {
    text: 'The fern grew back. | *Big party.*',
    draw(x, t, lt) {
      const t0 = t - lt
      confetti(x, t, t0 + 1.0, 540, 1100)
      bits(x, 'plant', 720, 1160, 26 * pop01(t, t0 + 0.3, 0.4, 1.8))
      label(x, 720, 960, 'WELCOME BACK', pop01(t, t0 + 1.1, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 360, 1130, 320 * s, { mood: 'heart', seed: 44, tears: 3, hops: [t0 + 1.5, t0 + 2.3] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
