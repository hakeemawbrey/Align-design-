// r2a0181: star_advice, ADVICE SOLO, "Aries, ask before | you charge in." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign (solo, 9 cards): the brave, fast Aries heart, with a warm nudge to check in first. Ending: callback.
//   the toolbox when they wanted a hug · the plan texted before asking · ran ahead on the hike · your yes is fast
//   · rearranged their kitchen · volume 11 · a new match: say hi first · let them unwrap their own gift · waited ten seconds
//   group "Brave heart. | *Gentle timing.*"   callback "They wanted a hug. | *Aries asked first.*" (the toolbox comes back, closed)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'aries', L = { x: -170 }
// a red toolbox, lid open (tools sticking out) or shut
function toolbox(x, cx, cy, k, open = true) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -50, 290, 170)
  if (open) {
    x.fillStyle = INK; x.fillRect(-90, -170, 22, 130); x.fillStyle = '#9aa5c4'; x.fillRect(-85, -165, 12, 120)            // screwdriver
    x.fillStyle = INK; x.fillRect(-100, -186, 42, 34); x.fillStyle = GOLD; x.fillRect(-95, -181, 32, 24)
    x.fillStyle = INK; x.fillRect(20, -150, 24, 120); x.fillStyle = WOOD; x.fillRect(25, -145, 14, 110)                    // hammer
    x.fillStyle = INK; x.fillRect(-10, -180, 90, 44); x.fillStyle = '#9aa5c4'; x.fillRect(-5, -175, 80, 34)
  }
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 170); x.fillStyle = RED; x.fillRect(-142, -52, 284, 154)
  x.fillStyle = '#ff6b5a'; x.fillRect(-142, -52, 284, 30)
  x.fillStyle = INK; x.fillRect(-30, open ? -92 : -100, 60, 14); x.fillRect(-30, open ? -92 : -100, 12, 40); x.fillRect(18, open ? -92 : -100, 12, 40)
  x.fillStyle = INK; x.fillRect(-20, 10, 40, 22); x.fillStyle = GOLD; x.fillRect(-14, 14, 28, 14)
  x.restore()
}
function trail(x, t, lt, P) {
  x.fillStyle = INK; x.beginPath(); x.moveTo(110, 1180); x.lineTo(970, 760); x.lineTo(970, 830); x.lineTo(110, 1230); x.fill()
  x.fillStyle = '#c98f5a'; x.beginPath(); x.moveTo(110, 1188); x.lineTo(970, 770); x.lineTo(970, 820); x.lineTo(110, 1222); x.fill()
  for (const [i, id] of [[0, 'taurus'], [1, 'cancer']]) signChar(x, t, id, 840 + i * 70, 720 - i * 16, 70, { mood: 'sleepy', seed: 60 + i, glyph: false, glow: 0.5, alpha: 0.9 })
}

const CAMEOS = [
  { sign: S, cap: 'You fix things fast. | *Ask if they want fixing.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [0.4],
    front(x, t, lt, P) {
      toolbox(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'I just | wanted a hug', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: S, cap: 'Love the plan. | *Ask for theirs.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '7:02', head: 'SENT', msg: lt > 1.2 ? 'what do | YOU want?' : 'BOOKED IT. | 6AM. WE GO.', bg: lt > 1.2 ? MINT : ORANGE })
      label(x, 790, 1120, 'CO-PILOT: ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Way ahead on the hike? | *Look back.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: lt => lt > 1.1 ? [-1, 0] : [1, 0], star: { x: -150, y: 20, s: 250 },
    back(x, t, lt, P) { trail(x, t, lt, P) },
    front(x, t, lt, P) {
      label(x, 770, 600, 'SQUAD: 2 KM BACK', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 880, 1060, 'wait up!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Your yes is fast. | Let *theirs* catch up.', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'YOU: YES ✓', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 46, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      const d = '.'.repeat(1 + Math.floor(t * 3) % 3)
      label(x, 790, 900, `THEM: THINKING${d}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BOTH: OKAY', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reorganised their kitchen? | *Ask first.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'mug', 700 + (i % 2) * 150, 760 + Math.floor(i / 2) * 140, 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2), { rot: (i - 1.5) * 0.12 })
      bubble(x, 800, 1090, 'where are | my spoons??', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Big energy is a gift. | *Read the room.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      const v = lt < 1.3 ? 11 : 6
      label(x, 790, 700, `VOLUME: ${v}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 50, bg: v > 10 ? RED : MINT, color: v > 10 ? BONE : INK, rot: 0.04, font: MONO, weight: 700 })
      meter(x, 790, 900, pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.3 ? 1 : 0.55, { w: 300, col: lt < 1.3 ? RED : MINT, title: 'CAFE: QUIET' })
      bubble(x, 790, 1080, 'still fun!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'New match? | *Say hi first.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 610, '✦ MATCH: LIBRA', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      note(x, 790, 850, pop01(t, P.t0 + 0.4, 0.3, 2), 'trip to Rome? | dog names? | ten kids?', { head: 'DRAFT', headBg: ORANGE, size: 34, w: 320, strike: lt > 1.1 ? [0, 1, 2] : [] })
      bubble(x, 790, 1100, 'hi :)', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 52, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Let them | *unwrap their own gift.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'gift', 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      label(x, 790, 640, 'HANDS: IN POCKETS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'IT’S HARD', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Waited ten seconds? | *That’s growth.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.6],
    front(x, t, lt, P) {
      const s = Math.min(10, Math.floor(prog(lt, 0.2, 1.5) * 10))
      label(x, 790, 820, `WAITED: 0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 52, bg: s >= 10 ? MINT : GOLD, rot: 0.03, font: MONO, weight: 700 })
      if (lt > 1.5) sparkles(x, t, 790, 820, P.t0 + 1.5 * 1.29, 9, 200, 0.4)
      bubble(x, 790, 1060, 'so proud', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0181', key: 'D', accent: '#ff6b5a', solo: S, ending: 'callback',
  title: 'Aries, ask before | *you charge in.*',
  cameos: CAMEOS,
  group: { cap: 'Brave heart. | *Gentle timing.*', mood: 'heart' },
  last: {
    text: 'They wanted a hug. | *Aries asked first.*',
    draw(x, t, lt) {
      const t0 = t - lt
      toolbox(x, 840, 1330, pop01(t, t0 + 0.3, 0.35, 2) * 0.85, false)
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) {
        signChar(x, t, S, 380, 1020, 340 * s, { mood: lt > 1.6 ? 'heart' : 'happy', seed: 44, hops: [t0 + 1.6] })
        signChar(x, t, 'libra', 620, 1030, 320 * s, { mood: 'heart', seed: 45, hops: [t0 + 1.7] })
      }
      hearts(x, t, 500, 860, t0 + 1.4, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 2 })
      label(x, 840, 1500, 'ASKED ✓', pop01(t, t0 + 1.2, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
