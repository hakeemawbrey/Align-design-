// r2a0163: star_advice, ADVICE SOLO, "How to befriend | a Scorpio." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, funny tips for befriending a Scorpio.
//   0.0–3.6    "How to befriend | *a Scorpio.*" (batch topic "How to make friends with a Scorpio", tightened to fit two lines)
//   3.6–37.8   nine cards (3.8 s each):
//              skip "nice weather", ask about dreams · trust loads slowly, keep showing up · tell them a secret,
//              guarded forever · the silent stare is a compliment · a two-person party · be honest, they'll know
//              anyway · remember the snack (the dark one) · late-night hangout, bring the blanket · you're in for life
//  37.8        group ending: "Hard shell. | *Softest friend.*"  Scorpio comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'scorpio'
const ST = { x: -190 }

const HAT = ['...G...', '..PGP..', '..PPP..', '.PYPYP.', '.PPPPP.', 'PYPPPYP', 'PPPPPPP']
const CHOC = ['KKKKKKKKKKKK', 'KBBKBBKBBKBK', 'KBBKBBKBBKBK', 'KKKKKKKKKKKK', 'KBBKBBKBBKBK', 'KBBKBBKBBKBK', 'KKKKKKKKKKKK', 'WWWWWWWWWWWW', 'WRRRRRRRRRRW', 'WWWWWWWWWWWW']
const CHOC_C = { K: '#3a1f14', B: '#5a3220', W: CREAM, R: '#c97bff' }
const MOON = ['..YYY..', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYY..']

/** a vault door: dial spins, bolts slide shut at `shut` (0…1) */
function vault(x, cx, cy, k, t, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -160, 320, 320); x.fillStyle = '#9aa5c4'; x.fillRect(-150, -150, 300, 300)
  x.fillStyle = '#6b7594'; x.fillRect(-130, -130, 260, 260)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d > 0 ? 130 - 40 * shut : -130, -100, 40 * shut + 30, 24); x.fillRect(d > 0 ? 130 - 40 * shut : -130, 76, 40 * shut + 30, 24) }
  x.save(); x.rotate(t * 2 * (1 - shut) + shut * 3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.fillRect(-8, -90, 16, 40) }
  x.restore()
  x.restore()
}
/** a magnifying glass; fn draws what's inside the lens */
function magnifier(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.translate(90, 90); x.rotate(-Math.PI / 4); x.fillStyle = INK; x.fillRect(-20, 0, 40, 150); x.fillStyle = BROWN; x.fillRect(-14, 6, 28, 138); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d9f1f7'; x.beginPath(); x.arc(0, 0, 94, 0, Math.PI * 2); x.fill()
  if (fn) { x.save(); x.beginPath(); x.arc(0, 0, 94, 0, Math.PI * 2); x.clip(); fn(); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Skip “nice weather.” | *Ask about their dreams.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - ease.inCubic(prog(lt, 0.9, 1.1)))
      bubble(x, 790, 720, 'nice weather, huh?', a, { size: 34, col: BONE, tail: 'br' })
      if (lt > 0.6 && lt < 1.0) { x.fillStyle = RED; x.fillRect(620, 714, 340, 10) }
      bubble(x, 790, 900, 'what’s your | biggest dream?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 790, 1100, 'NOW WE’RE TALKING', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trust loads slowly. | *Keep showing up.*', mood: lt => lt > 1.7 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = 0.08 + 0.12 * Math.floor(prog(lt, 0.3, 2.0) * 6)
      bar(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), p, 'TRUST', { col: LAV, w: 320 })
      label(x, 790, 980, `VISIT #${1 + Math.floor(prog(lt, 0.3, 2.0) * 6)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'WORTH THE WAIT', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tell them a secret. | *Guarded forever.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vault(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t, ease.inOutCubic(prog(lt, 0.9, 1.3)))
      bubble(x, 790, 640, 'psst…', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 0.9, 1.0)), { size: 40, tail: 'bc' })
      label(x, 790, 1100, 'LOCKED: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They stared in silence? | *That’s a compliment.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const dots = '.'.repeat(1 + Math.floor(t * 3) % 3)
      bubble(x, 790, 760, dots, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 790, 940, 'TRANSLATION:', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GREY, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1040, '“I LIKE YOU”', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 790, 1000, P.t0 + 1.6 * 1.29, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Big party? | *Try a party of two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { G: GOLD, P: PINK, Y: GOLD }, F.x, F.top - 50, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'cancer', 790, 960, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false }); drawBits(x, HAT, { G: GOLD, P: SKYB, Y: GOLD }, 790, 840, 12 * k, { rot: -0.1 }) }
      label(x, 790, 680, 'GUESTS: 2', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'PERFECT TURNOUT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be honest. | *They’ll know anyway.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.3, 1.2))
      magnifier(x, lerp(820, 760, m), lerp(760, 820, m), pop01(t, P.t0 + 0.2, 0.35, 2), () => { drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 0, 0, 16) })
      label(x, 790, 1100, 'HONESTY: DETECTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remember their snack. | *Instant loyalty.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHOC, CHOC_C, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      label(x, 790, 680, 'THE DARK ONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'you remembered?!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Late-night hangout? | *Bring the blanket.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#fff1b0' }, 790, 700, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) { x.fillStyle = BONE; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + i); x.fillRect(640 + i * 70, 640 + (i * 53 % 120), 8, 8) } x.globalAlpha = 1
    },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.7, 1.2))
      if (d > 0.01) { x.save(); x.translate(F.x, F.cy + 70); x.scale(d, d); x.fillStyle = INK; x.fillRect(-190, -60, 380, 150); x.fillStyle = '#6b62a8'; x.fillRect(-182, -52, 364, 134); x.fillStyle = LAV; for (let i = 0; i < 6; i++) x.fillRect(-170 + i * 60, -40, 30, 110); x.restore() }
      label(x, 790, 960, 'TIME: 1 A.M.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'BEST TALKS: NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'In their circle? | *You’re in for life.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = LAV; x.lineWidth = 10; x.setLineDash([22, 14]); x.lineDashOffset = -t * 30; x.beginPath(); x.arc(790, 900, 150 * k, 0, Math.PI * 2); x.stroke(); x.restore() }
      if (k > 0.01) signChar(x, t, 'pisces', 790, 910, 150 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false, tears: 2 })
      label(x, 790, 680, 'MEMBERSHIP: LIFETIME', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'NO TAKE-BACKS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0163', key: 'C', accent: LAV, solo: S, ending: 'group',
  title: 'How to befriend | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Hard shell. | *Softest friend.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
