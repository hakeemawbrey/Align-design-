// r2t0249: star_talk, SOLO, "Leos vs. | a mirror." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): every mirror a Leo meets, pushed to the extreme.
//   0.0–3.6    "Leos vs. | *a mirror.*"
//   3.6–37.8   nine cards (3.8 s each):
//              walked past a mirror, came back twice · a car window still counts · asked the mirror for a second
//              opinion · moved into the fitting room · fogged mirror = emergency · brought a mirror to the mirror
//              · a standing ovation for the reflection · a mirror on every wall · bad day, the mirror hypes them up
//  37.8        "Mirror, mirror: | *obviously Leo.*"
//  41.0        LESSON UNLOCKED: "Love yourself | like a *Leo* does."  CONFIDENCE: FULL
//  46.9        "The mirror | *needs a nap.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'leo'
const ST = { x: -190 }
const ACC = ORANGE
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** an oval gold-framed mirror; a mirrored mini Leo inside (unless star: false); fog 0…1 */
function mirror(x, t, cx, cy, w, h, k, { star = true, mood = 'sparkle', fog = 0, frame = GOLD, seed = 31, inner = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 22, h / 2 + 22, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = frame; x.beginPath(); x.ellipse(0, 0, w / 2 + 16, h / 2 + 16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 2, h / 2 + 2, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2); x.clip()
  const g = x.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#cfeaff'); g.addColorStop(1, '#7fa8d8')
  x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) inner()
  if (star) { x.save(); x.scale(-1, 1); signChar(x, t, S, 0, h * 0.08, Math.min(w, h) * 0.62, { mood, seed, glyph: false }); x.restore() }
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.save(); x.rotate(-0.6); x.fillRect(-w * 0.35, -h * 0.5, w * 0.08, h); x.fillRect(-w * 0.2, -h * 0.5, w * 0.03, h); x.restore()
  if (fog > 0) { x.fillStyle = `rgba(236,240,248,${(0.92 * fog).toFixed(3)})`; x.fillRect(-w / 2, -h / 2, w, h) }
  x.restore(); x.restore()
}
const CAR = ['....KKKKKKKK.....', '...KSSSSSSSSK....', '..KSSSSSSSSSSK...', 'RRRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRRR', 'RWWRRRRRRRRRRRWWR', '.KKK.........KKK.', '.KKK.........KKK.']
const HAND = ['.F.F.F...', '.F.F.F.F.', '.FFFFFFF.', 'FFFFFFFF.', '.FFFFFF..', '..FFFF...']

const CAMEOS = [
  { sign: S, cap: 'Walked past a mirror. | *Came back twice.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mirror(x, t, 790, 860, 220, 320, pop01(t, P.t0 + 0.15, 0.35, 2), { mood: 'wink' })
      lab(x, 790, 1100, `PASSES: ${Math.min(3, 1 + Math.floor(lt * 1.3))}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
      bubble(x, 420, 620, 'oh, hi!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'A car window? | *Still a mirror.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, CAR, { K: INK, S: '#9fd0f0', R: RED, W: SUN }, 800, 920, 20 * k)
      if (k > 0.5) { x.save(); x.beginPath(); x.rect(700, 820, 190, 52); x.clip(); x.save(); x.translate(790, 880); x.scale(-1, 1); signChar(x, t, S, 0, 0, 110, { mood: 'wink', seed: 33, glyph: false }); x.restore(); x.restore() }
      bubble(x, 790, 680, 'hey, gorgeous', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      lab(x, 800, 1110, 'OWNER: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Asked the mirror | for a *second opinion.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mirror(x, t, 790, 900, 220, 300, pop01(t, P.t0 + 0.15, 0.35, 2), { mood: lt > 1.0 ? 'sparkle' : 'happy' })
      bubble(x, 420, 620, 'thoughts?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bc' })
      bubble(x, 800, 660, 'stunning.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SUN, tail: 'bc' })
      lab(x, 790, 1120, 'OPINIONS: UNANIMOUS', pop01(t, P.t0 + 1.9, 0.3, 2.2), { bg: MINT, rot: -0.04, size: 30 })
    } },
  { sign: S, cap: 'The fitting room mirror? | *Moved in.*', mood: 'heart', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k
      x.fillStyle = '#3a2a6a'; x.fillRect(130, 520, 820, 30)
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#c2304a' : '#9a1f38'; x.fillRect(130 + i * 30, 550, 30, 640) }
      x.restore()
    },
    front(x, t, lt, P) {
      mirror(x, t, 800, 840, 200, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart' })
      card(x, 800, 1090, 220, 70, pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: CREAM, rot: 0.04 }, () => txt(x, 'HOME ♥', 0, 2, { size: 32, font: MONO, weight: 700 }))
      lab(x, 790, 620, 'STAY: DAY 4', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK, rot: -0.05 })
    } },
  { sign: S, cap: 'Mirror fogged up. | *A full emergency.*', mood: lt => lt > 0.8 && lt < 1.8 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fog = ease.inOutCubic(prog(lt, 0.3, 0.8)) * (1 - ease.inOutCubic(prog(lt, 1.7, 2.2)))
      mirror(x, t, 790, 880, 220, 320, pop01(t, P.t0 + 0.15, 0.35, 2), { fog })
      bubble(x, 420, 620, 'WHERE AM I?!', lt > 0.8 && lt < 1.9 ? pop01(t, P.t0 + 0.8 * 1.29, 0.2, 2.2) : 0, { size: 38, col: '#ffd0c8', tail: 'bc' })
      lab(x, 790, 640, lt > 1.9 ? 'CRISIS: OVER' : 'CODE: GOLD', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: lt > 1.9 ? MINT : RED, color: lt > 1.9 ? INK : BONE, rot: 0.04 })
    } },
  { sign: S, cap: 'Brought a mirror | to *the mirror.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), n = Math.min(5, 1 + Math.floor(lt * 2.2))
      if (k <= 0.01) return
      x.save(); x.translate(790, 880); x.scale(k, k)
      for (let i = 0; i < n; i++) { const s = Math.pow(0.78, i); x.fillStyle = i % 2 ? INK : GOLD; x.fillRect(-140 * s - 12, -180 * s - 12, 280 * s + 24, 360 * s + 24); x.fillStyle = i % 2 ? '#7fa8d8' : '#cfeaff'; x.fillRect(-140 * s, -180 * s, 280 * s, 360 * s) }
      const s = Math.pow(0.78, n); signChar(x, t, S, 0, 10, 300 * s, { mood: 'sparkle', seed: 35, glyph: false })
      x.restore()
      lab(x, 790, 1120, 'LEOS: INFINITE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GOLD, rot: -0.04, size: 36 })
    } },
  { sign: S, cap: 'Gave the reflection | a *standing ovation.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      mirror(x, t, 800, 880, 200, 300, pop01(t, P.t0 + 0.15, 0.35, 2), { mood: 'sparkle' })
      const c = Math.floor(t * 6) % 2
      for (const d of [-1, 1]) drawBits(x, HAND, { F: '#ffd0a8' }, 380 + d * (c ? 60 : 100), 660, 15 * pop01(t, P.t0 + 0.5, 0.3, 2), { sx: d, rot: d * 0.3 })
      lab(x, 790, 1110, 'ENCORE!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: ORANGE, rot: 0.05, size: 40 })
      sparkles(x, t, 800, 880, P.t0 + 1.5, 8, 190, 0.3)
    } },
  { sign: S, cap: 'A mirror | on *every wall.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, s: 260 },
    back(x, t, lt, P) {
      const POS = [[210, 640], [870, 640], [210, 1030], [870, 1030], [540, 580]]
      POS.forEach(([px, py], i) => mirror(x, t, px, py, 120, 170, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2), { mood: ['wink', 'heart', 'sparkle', 'happy', 'sparkle'][i], seed: 40 + i }))
    },
    front(x, t, lt, P) { lab(x, 540, 1160, 'DECOR: ME, MOSTLY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: GOLD, rot: -0.03 }) } },
  { sign: S, cap: 'Bad day? | The mirror *hypes them up.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.6, 2.0],
    front(x, t, lt, P) {
      mirror(x, t, 800, 880, 220, 320, pop01(t, P.t0 + 0.15, 0.35, 2), { mood: 'sparkle' })
      bubble(x, 800, 640, 'you GOT this, star', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: SUN, tail: 'bc' })
      lab(x, 800, 1110, 'MOOD: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: MINT, rot: 0.04 })
      sparkles(x, t, 380, 860, P.t0 + 1.7, 6, 170, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0249', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leos vs. | *a mirror.*',
  cameos: CAMEOS,
  group: { cap: 'Mirror, mirror: | *obviously Leo.*', mood: 'sparkle' },
  lesson: { text: 'Love yourself | like a *Leo* does.', chip: 'CONFIDENCE: FULL' },
  last: {
    text: 'The mirror | *needs a nap.*',
    draw(x, t, lt) {
      const t0 = t - lt
      mirror(x, t, 800, 1260, 230, 330, pop01(t, t0 + 0.6, 0.45, 1.8), { mood: 'sleepy', seed: 47 })
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; if (lt < 1.0) break; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); txt(x, 'z', 900 + ph * 70, 1080 - ph * 160, { size: 44 + i * 12, color: BONE }); x.restore() }
      label(x, 800, 1480, 'SHIFT: OVER', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 34, font: MONO, weight: 700, bg: LAV, rot: 0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
