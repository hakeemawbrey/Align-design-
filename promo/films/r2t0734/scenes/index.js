// r2t0734: star_talk, ROLLCALL, "The signs | *on a ferry.*" (signs3kit social cut, lofi · D). Ending: lesson.
//   ♈ tried to drive the ferry · ♉ found the snack bar, never left · ♊ befriended every passenger
//   · ♋ waved at the shore the whole way · ♌ posed with every seagull · ♍ read the safety card out loud, twice
//   · ♎ couldn't pick a side of the boat · ♏ stared at the sea, deeply · ♐ missed the stop on purpose
//   · ♑ timed the crossing, filed feedback · ♒ befriended a dolphin · ♓ saw the ocean, wept (it's so big)
//   group "Same boat. | *Twelve moods.*"  lesson "Same boat. | Make *room.*"
//   last "Taurus is still | *at the snack bar.*" (the snack bar, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -170 }
const waves = (x, t, y, k = 1) => { for (const o of [0, 1]) bits(x, 'WAVE', 540 + ((t * 40 + o * 340) % 680) - 340, y + o * 30, 14 * k, { alpha: 0.9 }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Tried to drive | *the ferry.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'FULL SPEED!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 960, 'CAPTAIN: NOT ARIES', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Found the snack bar. | *Never left.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 740, 'SEAT: SNACK BAR', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1130, 'VIEW: SANDWICH', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Befriended | *every passenger.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'hi! hi! HI!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 980, `NEW FRIENDS: ${Math.min(38, Math.floor(lt * 17))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Waved at the shore. | *The whole way.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const w = Math.sin(t * 9) * 0.5
      bits(x, 'HOUSE', 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: w * 0.1 })
      L(x, 840, 700, 'BYE, HOUSE!', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.04, 34)
      L(x, 820, 1060, 'MISSING HOME: ALREADY', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Posed with | *every seagull.*', mood: 'sparkle', star: ST, hops: [0.9, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      for (const f of [0.9, 1.5, 2.1]) { const d = lt - f; if (d > 0 && d < 0.15) { x.fillStyle = `rgba(255,250,235,${(0.45 * (1 - d / 0.15)).toFixed(3)})`; x.fillRect(110, 480, 860, 740) } }
    },
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.6))
      for (let i = 0; i < n; i++) bits(x, 'GULL', 720 + i * 100, 760 + (i % 2) * 70 + Math.sin(t * 4 + i) * 10, 10 * pop01(t, P.t0 + 0.3 + i * 0.6, 0.25, 2))
      L(x, 800, 1080, 'PHOTOS: 212', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Read the safety card. | *Out loud.* Twice.', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'SAFETY', headBg: '#2fc79a', lines: ['life vest: ✓', 'exits: ✓', 'snacks: n/a'], size: 30, progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1120, 'READING: 2ND TIME', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Couldn’t pick | a *side of the boat.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sd = Math.floor(lt * 2.5) % 2
      L(x, 800, 800, sd ? 'LEFT SIDE?' : 'RIGHT SIDE?', pop01(t, P.t0 + 0.2, 0.3, 2.2), sd ? LAV : PINK, sd ? -0.05 : 0.05, 40)
      L(x, 800, 1020, 'ARRIVED: STILL DECIDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Stared at the sea. | *Deeply.*', mood: 'neutral', look: [1, 1], star: { x: -170, y: -60 },
    front(x, t, lt, P) {
      waves(x, t, 1090, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 760, 'DEPTH: MATCHED', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Missed the stop. | *On purpose.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      swapLabel(x, 320, 780, lt, 1.0, 'YOUR STOP!', 'NEXT ISLAND!', { size: 36, fromBg: CREAM, toBg: GOLD })
      L(x, 320, 1000, 'TRIP: 4 OF ∞', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Timed the crossing. | *Sent feedback.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 320, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 700, 'ETA: 2 MIN LATE', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 320, 1100, 'REVIEW: 4 STARS', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Made friends | with *a dolphin.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 1], star: { x: -170, y: -50 },
    front(x, t, lt, P) {
      waves(x, t, 1110, 1)
      const jump = Math.sin(Math.PI * clamp((lt - 0.4) / 1.2))
      bits(x, 'DOLPHIN', 800, 1080 - jump * 220, 19, { rot: lerp(-0.5, 0.5, clamp((lt - 0.4) / 1.2)), alpha: lt > 0.4 ? 1 : 0 })
      bubble(x, 800, 700, 'click click!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Saw the ocean. | *Wept.* It’s so big.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170, y: -50 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      waves(x, t, 1110, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 760, 'OCEAN: HUGE', pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, -0.04, 34)
      L(x, 800, 900, 'FEELINGS: HUGER', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0734', key: 'D', accent: ACC, ending: 'lesson',
  title: 'The signs | *on a ferry.*',
  cameos: CAMEOS,
  group: { cap: 'Same boat. | *Twelve moods.*', draw(x, t, lt) { bits(x, 'BOAT', 540, 740, 16 * pop01(t, t - lt + 0.8, 0.4, 2), { rot: Math.sin(t * 2) * 0.05 }) } },
  lesson: { text: 'Same boat. | Make *room.*', chip: 'CREW: COMPLETE' },
  last: {
    text: 'Taurus is still | *at the snack bar.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'SANDWICH', 360, 1150, 9 * pop01(t, t0 + 0.6, 0.4, 2), { rot: -0.15 })
      sparkles(x, t, 340, 1100, t0 + 1.0, 7, 120, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
