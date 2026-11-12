// v3a136: ADVICE SOLO, "Dear Libra: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign (solo, 9 cards): gentle permission slips for the peacekeeper. Ending: lesson.
//   ten minutes to order · not everyone has to like you · "I disagree" broke nothing · alone isn't lonely (me time: booked)
//   · a messy room is still home · the scales tip to you · the group chat can wait · not your job to fix every fight
//   · your needs on the to-do list
//   group "Balanced. | *Including you.*"   LESSON "You’re allowed | to *take up space.*"   last "Dinner order? | *Still deciding.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER, WOOD } from '../props.js'

const S = 'libra', L = { x: -190 }
// a balance scale that tips toward the right-hand pan ("YOU")
function scales(x, cx, cy, k, tip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(1.25 * k, 1.25 * k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 270); x.fillRect(-90, 110, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-6, -144, 12, 258); x.fillRect(-84, 116, 168, 18)
  const a = 0.25 * tip
  x.save(); x.translate(0, -140); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-130, -8, 260, 16); x.fillStyle = GOLD; x.fillRect(-126, -4, 252, 8)
  x.restore()
  for (const s of [-1, 1]) {
    const px = s * 120 * Math.cos(a), py = -140 + s * 120 * Math.sin(a)
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 45, py + 90); x.moveTo(px, py); x.lineTo(px + 45, py + 90); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 58, py + 86, 116, 26); x.fillStyle = GOLD; x.fillRect(px - 54, py + 90, 108, 18)
    x.fillStyle = s < 0 ? BONE : PINK; x.font = `800 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s < 0 ? 'THEM' : 'YOU', px, py + 140)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ten minutes to order? | *That’s okay.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'pasta? | soup? | pasta?? | soup…', { head: 'MENU', headBg: PINK, size: 38, w: 320 })
      const m = Math.min(10, Math.floor(Math.max(0, lt - 0.4) / 0.15))
      label(x, 790, 1060, `DECIDING: 0:${String(m).padStart(2, '0')}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not everyone | *has to like you.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'LIKED BY: MOST', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'and that’s | plenty.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: S, cap: '“I disagree” | *broke nothing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.4], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I… | disagree.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 960, 'FRIENDSHIP: FINE ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Being alone | *isn’t being lonely.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'book', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 790, 680, 'ME TIME: BOOKED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'company: great', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
    } },
  { sign: S, cap: 'A messy room | *is still home.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: L,
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); x.save(); x.translate(700 + (i % 3) * 95, 1070 - Math.floor(i / 3) * 60); x.rotate((i - 2.5) * 0.15); x.scale(1.3 * k, 1.3 * k); x.fillStyle = INK; x.fillRect(-48, -24, 96, 48); x.fillStyle = COLS[i]; x.fillRect(-42, -18, 84, 36); x.restore() }
      label(x, 790, 760, 'AESTHETIC: LATER', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'COZY: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can pick | *your side too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      scales(x, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.4)))
      label(x, 790, 610, 'TIPPED: TO YOU ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The group chat | *can wait till morning.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(99, Math.floor(Math.max(0, lt - 0.2) * 60))
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '11:48', head: `CHAT · ${n}${n >= 99 ? '+' : ''} NEW`, msg: 'libra?? | thoughts???', bg: BONE })
      label(x, 790, 1110, 'TOMORROW ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04 })
    } },
  { sign: S, cap: 'Not every fight | *is yours to fix.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'they’ll | sort it out.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl', col: LAV })
      label(x, 790, 920, 'PEACEKEEPER: ON BREAK', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bits(x, 'mug', 790, 1060, 12 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: S, cap: 'Your needs | *count too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'their stuff ✓ | their stuff ✓ | MY STUFF ✦' : 'their stuff ✓ | their stuff ✓', { head: 'TO-DO', headBg: MINT, size: 38, w: 400 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 180, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3a136', key: 'D', accent: PINK, solo: S, ending: 'lesson',
  title: 'Dear Libra: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Balanced. | *Including you.*', mood: 'heart' },
  lesson: { text: 'You’re allowed | to *take up space.*', chip: 'BALANCE: RESTORED' },
  last: {
    text: 'Dinner order? | *Still deciding.*',
    draw(x, t, lt) { note(x, 540, 1400, pop01(t, t - lt + 0.8, 0.35, 2), 'pasta? soup?', { head: 'MENU', headBg: PINK, size: 40, w: 340 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
