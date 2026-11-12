// r2a0562: star_advice, ADVICE SOLO (capricorn), "Capricorn, protect | *your peace.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle ways a Capricorn can protect their peace, each a relatable truth + a warm reframe
// with one light gag. Ending: group (the group beat is the punchline).
//   inbox at 3,000, close the laptop · said yes to everything, try one no · working on your day off, it's called off
//   · phone on all night, do not disturb · the chart says rest is ambitious too · not every problem is yours to fix
//   · five-year plan, plan one slow morning · grumpy people at work, let them be (their cloud, not yours) · built it all, be proud out loud
//   group "Peace: protected. | *Goals: still huge.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#2fc79a', S = 'capricorn', ST = { x: -190 }
const CLOUD = ['...GGGG.....', '.GGGGGGGG...', 'GGGGGGGGGGG.', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']

// a laptop whose lid closes
function laptop(x, cx, cy, k, shut, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, 90, 360, 34); x.fillStyle = '#9aa5c4'; x.fillRect(-172, 94, 344, 24)
  const h = 220 * (1 - shut)
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-160, 92 - h, 320, h); x.fillStyle = '#140c30'; x.fillRect(-150, 100 - h, 300, h - 16)
    if (h > 140) {
      x.fillStyle = RED; x.fillRect(-120, 100 - h + 30, 240, 70)
      x.fillStyle = PAPER; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${n} unread`, 0, 100 - h + 66)
    }
  } else { x.fillStyle = '#7a84a6'; x.fillRect(-172, 80, 344, 14) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Inbox at 3,000? | *Close the laptop.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.round(lerp(2960, 3000, clamp(lt / 1.0)))
      laptop(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 1.0, 1.3)), n.toLocaleString('en-US'))
      label(x, 800, 1080, 'IT WILL KEEP.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said yes to everything? | *Try one no.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), '9 meeting | 10 meeting | 11 favour | 12 lunch? no.', { head: 'TUESDAY', headBg: SKYB, size: 32, w: 320, rot: 0.04, strike: lt > 1.2 ? [2] : [] })
      bubble(x, 800, 620, 'no, thank you :)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Working on your day off? | It’s *called off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'SATURDAY', lt > 1.1 ? 'OFF' : 'work?', { topBg: ACC })
      if (lt > 1.1) sparkles(x, t, 800, 860, P.t0 + 1.1 * 1.29, 7, 180, 0.2)
      label(x, 800, 1080, 'REALLY OFF', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone on all night? | *Do not disturb.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: lt > 1.2 ? '11:00' : '1:47', head: lt > 1.2 ? 'DO NOT DISTURB' : 'WORK CHAT (9)', msg: lt > 1.2 ? 'see you | at nine.' : 'quick q…', bg: lt > 1.2 ? LAV : ORANGE, size: 34 })
      bits(x, 'moon', 940, 620, 14 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: S, cap: 'Your chart says: | *rest is ambitious too.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'goal: a nap | status: | crushing it', { head: '♑︎ TODAY', headBg: ACC, size: 36, w: 320, rot: -0.04 })
      label(x, 800, 1110, 'GOAL MET ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone’s problems? | *Not all yours to fix.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const n = lt > 0.9 ? (lt > 1.2 ? [0, 1, 2] : [0, 1]) : lt > 0.6 ? [0] : []
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'fix the printer | fix their week | fix the vibe | rest (me)', { head: 'TO FIX', headBg: ORANGE, size: 30, w: 330, rot: 0.03, strike: n })
      label(x, 800, 1090, 'JUST ONE: YOU', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Five-year plan? | Plan *one slow morning.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'mug', 800, 930, 22 * k)
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.5 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * clamp(k); x.fillStyle = BONE; x.fillRect(760 + i * 30 + Math.sin(ph * 6 + i) * 8, 840 - ph * 120, 10, 24); x.restore() }
      label(x, 800, 680, 'AGENDA: NONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'SLIPPERS: ON', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Grumpy people at work? | *Let them be.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 1000, 190 * k, { mood: 'eyeroll', look: [-1, 0], seed: 19, glyph: false })
      const cx = 800, cy = 700
      drawBits(x, CLOUD, { G: '#6a6a80' }, cx, cy, 20 * k)
      if (k > 0.5) for (let i = 0; i < 6; i++) { const ph = ((t * 1.6 + i / 6) % 1); x.fillStyle = SKYB; x.fillRect(cx - 90 + i * 34, cy + 50 + ph * 120, 6, 18) }
      bubble(x, 800, 1150, 'ugh, monday.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, col: '#9aa5c4', tail: 'bc' })
      label(x, 380, 690, 'NOT MY CLOUD', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Built it all yourself? | *Be proud. Out loud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'trophy', 800, 880, 28 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 1110, 'I did that!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      sparkles(x, t, 800, 880, P.t0 + 1.2, 8, 190, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0562', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Peace: protected. | *Goals: still huge.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
