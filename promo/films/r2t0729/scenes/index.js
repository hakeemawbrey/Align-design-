// r2t0729: star_talk, SOLO (libra), "Libras as your boss | *be like.*" (signs3kit social cut, lofi · D). Ending: lesson.
//   a meeting to decide the meeting time · the feedback sandwich is mostly bread · redesigned the office for vibes
//   · employee of the month: all of you · settled a fight with a group hug · approved your day off and sent flowers
//   · the deadline is whenever feels right · team photo, forty retakes · hired you after a compatibility check
//   group "Best boss. | *Zero decisions.*" · lesson "Kind bosses | make *happy* teams." · last "Next meeting? | *Let's vote.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, confetti, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -180 }
Object.assign(B, {
  CAMERA: ['..KKK.......', 'KKKKKKKKKKKK', 'KSSSSSSSSSWK', 'KSSKKKKSSSSK', 'KSKWWWWKSSSK', 'KSKWBBWKSSSK', 'KSKWWWWKSSSK', 'KSSKKKKSSSSK', 'KKKKKKKKKKKK'],
})
Object.assign(C, { CAMERA: { K: INK, S: STEEL, W: '#ffffff', B: SKYB } })
const tiny = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 50, ...o }) }

const CAMEOS = [
  { sign: S, cap: 'A meeting to decide | the *meeting time.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'INVITE', headBg: ACC, lines: ['MEETING:', 'when should', 'we meet?', '(1 of 3)'], size: 30, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'DURATION: 1 HOUR', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Feedback sandwich. | *Mostly bread.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'you\'re amazing!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 1110, '(tiny note) ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Redesigned the office. | *For vibes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      if (lt > 0.6) { x.save(); x.globalAlpha = 0.22 * clamp((lt - 0.6) / 0.4); x.fillStyle = PINK; x.fillRect(110, 480, 860, 740); x.restore() }
    },
    front(x, t, lt, P) {
      bits(x, 'LAMP', 720, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLOWER', 890, 940, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 680, 'MOOD LIGHTING: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 800, 1130, 'PRODUCTIVITY: VIBES', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Employee of the month? | *All of you.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'TROPHY', 670 + i * 90, 960 - (i % 2) * 40, 15 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      L(x, 800, 720, 'WINNERS: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
      confetti(x, t, 800, 880, P.t0 + 1.4)
    } },
  { sign: S, cap: 'Settled a fight | with a *group hug.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const j = ease.inOutCubic(clamp((lt - 0.6) / 0.7))
      tiny(x, t, 'aries', lerp(700, 750, j), 900, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: j > 0.9 ? 'heart' : 'squint', look: [1, 0] })
      tiny(x, t, 'taurus', lerp(910, 860, j), 900, 150, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: j > 0.9 ? 'heart' : 'squint', look: [-1, 0] })
      L(x, 800, 690, 'CONFLICT: HUGGED OUT', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 30)
      hearts(x, t, 800, 860, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Approved your day off. | *Sent flowers.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 800, 900, 24 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 680, '✓ DAY OFF: APPROVED', pop01(t, P.t0 + 0.2, 0.3, 2.2), MINT, -0.04, 32)
      bubble(x, 800, 1130, 'rest well!! ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'The deadline? | *Whenever feels right.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.15 })
      swapLabel(x, 800, 690, lt, 1.0, 'DUE: FRIDAY', 'DUE: VIBES', { size: 36, fromBg: STEEL, toBg: PINK })
      L(x, 800, 1100, 'OR MONDAY? OR...', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Team photo. | *Forty retakes.*', mood: lt => Math.floor(lt * 2) % 2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CAMERA', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (Math.floor(lt * 2.5) % 2 && lt > 0.5) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#ffffff'; x.fillRect(110, 480, 860, 740); x.restore() }
      const n = Math.min(40, Math.floor(clamp((lt - 0.4) / 1.6) * 40) + 1)
      L(x, 800, 690, `TAKE #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 40)
      bubble(x, 800, 1100, 'one more!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Hired you after | a *compatibility check.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1090, '✦ TEAM: ALIGNED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 8, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0729', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libras as your boss | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best boss. | *Zero decisions.*', mood: 'sparkle' },
  lesson: { text: 'Kind bosses | make *happy* teams.', chip: 'TEAM: HAPPY' },
  last: { text: 'Next meeting? | *Let\'s vote.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
