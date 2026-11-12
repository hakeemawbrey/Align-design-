// r2t0735: star_talk, SOLO (aries), "Aries on a trip | *be like.*" (signs3kit social cut, lofi · F). Ending: callback.
// One sign the whole way: nine trip moments, each the most extreme version of Aries.
//   packed in four minutes (forgot socks) · raced the moving walkway, lost · itinerary: vibes · summit before breakfast
//   · spiciest dish, asked for more · lost the tour, now leads one · learned "hello", used it on everyone
//   · souvenir: a kayak · day two, already planning the next trip
//   group "Zero chill. | *All the stamps.*"  →  callback: "The kayak | *made it home.*"
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Packed for a week. | In *four minutes.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 14) * 0.04 * (lt < 1.2 ? 1 : 0) })
      L(x, 800, 740, `PACKING: 0:0${Math.min(4, Math.floor(lt * 2))}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1150, 'SOCKS: FORGOTTEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Raced the moving walkway. | *Lost.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(150, 1050, 780, 40); x.fillStyle = STEEL; x.fillRect(158, 1056, 764, 28)
      x.fillStyle = BONE; for (let i = 0; i < 10; i++) x.fillRect(158 + ((t * 300 + i * 80) % 764), 1066, 30, 8); x.restore()
    },
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 1.4, 'ARIES VS WALKWAY', 'WALKWAY WINS', { size: 34, fromBg: GOLD, toBg: STEEL })
    } },
  { sign: S, cap: 'Itinerary? | *Vibes.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'THE PLAN', headBg: RED, lines: ['1. go', '2. ???', '3. go again'], size: 34, progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1120, 'ALSO: NO PLAN B', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Climbed a mountain | *before breakfast.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: 170, y: -40 }, hops: [1.3],
    back(x, t, lt, P) {
      bits(x, 'MOUNT', 330, 990, 34 * pop01(t, P.t0 + 0.1, 0.35, 2))
      bits(x, 'FLAG', 360, 790, 16 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
    },
    front(x, t, lt, P) {
      L(x, 330, 620, 'SUMMIT: 6:02 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Spiciest dish. | Asked *for more.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bits(x, 'CHILI', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      steam(x, t, F.x, F.top, { n: 3, alpha: clamp((lt - 1.0) / 0.3), h: 120 })
      bubble(x, 800, 740, 'spicier?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Lost the tour. | Now *leads one.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) friend(x, t, ['cancer', 'virgo', 'libra'][i], 720 + i * 100, 1010 + (i % 2) * 30, 110, pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.0 + i * 0.1] })
      L(x, 800, 760, 'TOUR GUIDE: ARIES', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 32)
      L(x, 800, 860, '(UNOFFICIAL)', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: S, cap: 'Learned one word. | *Used it on everyone.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.5))
      for (let i = 0; i < n; i++) bubble(x, 760 + (i % 2) * 70, 700 + i * 150, 'HELLO!', pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 42 - i * 4, tail: i % 2 ? 'br' : 'bl' })
      L(x, 800, 1150, 'PEOPLE GREETED: ALL', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Bought a souvenir. | *A kayak.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170, y: -60 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'KAYAK', 540, 1100, 24 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.04 })
      L(x, 800, 740, 'CARRY-ON?', pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, -0.04, 38)
      L(x, 800, 860, 'ARIES: YES', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: S, cap: 'Day two. | Planning *the next trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 720, 'NEXT STOP: EVERYWHERE', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 28)
      sparkles(x, t, 800, 920, P.t0 + 1.0, 7, 150, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0735', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Aries on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero chill. | *All the stamps.*', mood: 'sparkle' },
  last: {
    text: 'The kayak | *made it home.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.5, 0.4, 2)
      bits(x, 'KAYAK', 540, 1000, 30 * k, { rot: -0.05 + Math.sin(t * 2) * 0.02 })
      bits(x, 'HOUSE', 540, 1220, 34 * pop01(t, t0 + 0.8, 0.35, 2))
      sparkles(x, t, 540, 1050, t0 + 1.2, 9, 300, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
