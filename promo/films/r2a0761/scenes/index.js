// r2a0761: star_advice, ADVICE SOLO (pisces), "Pisces, you're not | too much." (signs3kit social cut, lofi · D).
// Ending: group (the big Pisces is the last beat). Pisces cries in every card (happy tears included).
//   you feel everything (a superpower) · cried at a sunset (it earned it) · sent a paragraph (someone needed it)
//   · daydreaming (where ideas live) · "too sensitive" = paying attention · love hard, the right ones love back
//   · party then a nap (allowed) · rescued a snail (kindness is cool) · big heart, big tears (both welcome)
//   group "Not too much. | *Just enough.*" (the big crying-happy Pisces is the last image)
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, zzz, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'pisces', ACC = '#b7a6ff', ST = { x: -170 }
const TEARS = lt => lt < 1.2 ? 2 : 1

const SUN = ['...YYYY...', '.YYYYYYYY.', 'YYYYYYYYYY', 'OOOOOOOOOO', 'OOOOOOOOOO', 'RRRRRRRRRR']
const SUN_C = { Y: '#ffd23a', O: '#ff9a4a', R: '#ff6b8a' }
const SNAIL = ['...SSSS.....', '..SPPPPS....', '.SPPSSPPS...', '.SPSPPSPS...', '.SPPSSPPS..E', '..SPPPPS..EE', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']
const SNAIL_C = { S: '#8a4a2e', P: '#ffb34a', G: '#9be07a', E: '#9be07a' }
const CASTLE = ['P.P...P.P', 'PPP...PPP', 'PPPPPPPPP', 'PPPPWPPPP', 'PPPWWWPPP', 'PPPWWWPPP']
const CASTLE_C = { P: PINK, W: LAV }

/** a little radar antenna with rings pulsing out */
function radar(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 150); x.fillStyle = STEEL; x.fillRect(-5, -6, 10, 142)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, -20, 22, 0, Math.PI * 2); x.fill()
  x.strokeStyle = MINT; x.lineWidth = 8
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); x.globalAlpha = 1 - ph; x.beginPath(); x.arc(0, -20, 40 + ph * 140, -Math.PI * 0.85, -Math.PI * 0.15); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You feel *everything.* | That’s a superpower.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: TEARS, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 790, 700, 'FEELINGS: ALL', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, 0.05, 38)
      bits(x, 'SHIELD', 790, 900, 18 * pop01(t, P.t0 + 0.8, 0.35, 2))
      L(x, 790, 1100, 'POWER: ON ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Cried at a sunset? | *It earned it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.4 ? 3 : 2, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), sink = ease.inOutCubic(prog(lt, 0.4, 2.2)) * 60
      if (k > 0.01) { x.save(); x.beginPath(); x.rect(560, 560, 420, 460); x.clip(); drawBits(x, SUN, SUN_C, 790, 880 + sink, 26 * k); x.restore() }
      x.fillStyle = '#4a3a8a'; x.globalAlpha = k; x.fillRect(570, 1000, 400, 24)
    },
    front(x, t, lt, P) {
      L(x, 790, 1110, '10/10 SUNSET', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ff9a4a', -0.04, 34)
    } },
  { sign: S, cap: 'Sent a paragraph? | Someone *needed it.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MATCH ♡', headCol: LAV, lines: [
        ['so i was thinking', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)],
        ['and also, like', BONE, pop01(t, P.t0 + 0.7, 0.2, 2)],
        ['you matter a lot', BONE, pop01(t, P.t0 + 0.9, 0.2, 2)],
        ['this made my day', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2), true],
      ], typing: lt > 1.1 && lt < 1.55 ? 1 : 0, size: 27 })
    } },
  { sign: S, cap: 'Daydreaming again? | That’s *where ideas live.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', tears: TEARS, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.globalAlpha = pop01(t, P.t0 + 0.2 + i * 0.1, 0.2, 2); x.beginPath(); x.arc(560 + i * 50, 830 - i * 40, 10 + i * 6, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
      bits(x, 'CLOUD', 800, 700, 30 * k)
      drawBits(x, CASTLE, CASTLE_C, 800, 680, 14 * pop01(t, P.t0 + 0.8, 0.35, 2))
      L(x, 790, 1060, 'IDEA: LOADING…', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: '“Too sensitive”? | No. *Paying attention.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      radar(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2))
      L(x, 790, 1090, 'VIBES: DETECTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Love too hard? | The *right ones* love back.', mood: 'heart', tears: lt => lt > 1.2 ? 3 : 2, look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 960, 210, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], hops: [P.t0 + 1.3] })
      L(x, 800, 700, 'COMPATIBLE: VERY', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, 0.05, 32)
      hearts(x, t, 640, 860, P.t0 + 1.2, { n: 7, life: 2, spread: 260, cell: 8, seed: 4 })
    } },
  { sign: S, cap: 'Party, then a nap? | *Fully allowed.*', mood: 'sleepy', tears: lt => 1, star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1010, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const fillK = clamp((lt - 0.4) / 1.6)
      bits(x, 'BATT', 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.3) { x.fillStyle = MINT; x.fillRect(790 - 100, 820 - 30, 200 * fillK, 60) }
      zzz(x, t, 520, 760, { size: 44 })
      L(x, 790, 1060, 'RECHARGING ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Rescued a snail? | *Kindness is cool.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: TEARS, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      // rain falling, the umbrella keeps the snail dry
      x.save(); x.fillStyle = SKYB; x.globalAlpha = 0.7
      for (let i = 0; i < 14; i++) { const ph = ((t * 1.4 + i * 0.137) % 1); const rx = 600 + (i * 53) % 380; if (Math.abs(rx - 800) > 120 || ph < 0.25) x.fillRect(rx, 560 + ph * 520, 6, 22) }
      x.restore()
      bits(x, 'UMB', 800, 830, 22 * pop01(t, P.t0 + 0.6, 0.35, 2))
      drawBits(x, SNAIL, SNAIL_C, 800, 1060, 14 * k)
      L(x, 800, 640, 'SNAIL: SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Big heart, big tears. | *Both welcome.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt < 1.3 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 880, 20 * pop01(t, P.t0 + 0.25, 0.35, 2))
      L(x, 790, 680, 'TISSUES: FREE', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, 0.05, 34)
      L(x, 790, 1080, 'CRY ZONE ♡ OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0761', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Pisces, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Just enough.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
