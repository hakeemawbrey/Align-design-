// r2t0733: star_talk, BELIKE, "Zodiacs in a mood | *be like.*" (signs3kit social cut, lofi · G). Ending: group.
//   ♈ furious for eleven seconds · ♉ won't talk, will eat · ♊ two moods, same minute · ♋ moved into a blanket fort
//   · ♌ sulking, loudly, in public · ♍ cleaned the whole house, angrily · ♎ "it's fine :)" (it is not fine)
//   · ♏ said "fine," the room got colder · ♐ bad mood, booked a flight · ♑ didn't sulk, worked a triple shift
//   · ♒ wrote an 80-page manifesto · ♓ cried, then cried about crying
//   group (the ending) "Moods pass. | *Snacks help.*" with snacks dropping in over the group photo
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, bits, swapLabel, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Furious. | For *eleven seconds.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const s = Math.min(11, Math.floor(Math.max(0, lt - 0.2) * 9))
      L(x, 800, 760, `MOOD: 0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), RED, -0.04, 40)
      if (lt > 1.4) bubble(x, 800, 960, 'anyway! lunch?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Won’t talk. | Will *eat, though.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 800, 940, 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.2 })
      L(x, 800, 720, 'SILENT TREATMENT', pop01(t, P.t0 + 0.2, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1130, 'SNACKS: ACCEPTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Two moods. | *Same minute.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const on = Math.floor(lt * 3) % 2
      L(x, 800, 820, on ? 'GRUMPY' : 'THRILLED', pop01(t, P.t0 + 0.2, 0.3, 2.2), on ? STEEL : MINT, on ? 0.05 : -0.05, 44)
      L(x, 800, 1060, `SWITCHES: ${Math.floor(lt * 3)}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Moved into | a *blanket fort.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bits(x, 'FORT', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 810, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 810, 780, '(DO CHECK ON ME)', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: 'leo', cap: 'Sulking. | *Loudly.* In public.', mood: 'squint', star: ST, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 150, F.cy + 10, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 820, 740, 'I’M FINE!!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 820, 1110, 'AUDIENCE: 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ffb34a', 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Cleaned the whole house. | *Angrily.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BROOM', 810, 950, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 9) * 0.35 })
      sparkles(x, t, 810, 1040, P.t0 + 0.9, 6, 130, 0.4); sparkles(x, t, 810, 1040, P.t0 + 1.5, 6, 160, 1.1)
      L(x, 810, 720, 'SPOTLESS (FURIOUS)', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Upset. Won’t say. | *Too polite.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'no, it’s fine :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 980, 'IT IS NOT FINE', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.05, 36)
    } },
  { sign: 'scorpio', cap: 'Said “fine.” | The room *got colder.*', mood: 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = clamp((lt - 0.7) / 0.5)
      for (let i = 0; i < 9; i++) { const ph = ((t * 0.25 + i / 9) % 1 + 1) % 1; bits(x, 'SNOW', 200 + (i * 97) % 700, 500 + ph * 700, 7, { alpha: k * Math.sin(Math.PI * ph) }) }
    },
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
      L(x, 800, 980, 'ROOM TEMP: ARCTIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Bad mood? | *Booked a flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: 160 }, hops: [1.3],
    back(x, t, lt, P) {
      const p = prog(lt, 1.0, 2.3)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(120, 960, p), 640 - 80 * p, 12, { rot: Math.PI / 2 - 0.15 })
    },
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 320, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 790, 'DEPARTS: NOW', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Didn’t sulk. | Worked a *triple shift.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 320, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 730, `SHIFT ${Math.min(3, 1 + Math.floor(lt / 0.6))} OF 3`, pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 36)
      L(x, 320, 1120, 'FEELINGS: LATER', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Wrote a | *manifesto.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 4)
      for (let i = 0; i < n; i++) bits(x, 'PAPERS', 790 + i * 14, 990 - i * 26, 20, { rot: 0.05 - i * 0.05 })
      L(x, 800, 720, `PAGE ${Math.min(80, Math.floor(Math.max(1, lt * 36)))} OF 80`, pop01(t, P.t0 + 0.3, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Cried. Then cried | *about crying.*', mood: lt => lt < 0.9 ? 'squint' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 785, 760, lt, 1.3, 'TISSUES: 1 BOX', 'TISSUES: 0 BOXES', { size: 32, fromBg: CREAM, toBg: SKYB })
    } },
]

const F = makeFilm({
  id: 'r2t0733', key: 'G', accent: ACC, ending: 'group',
  title: 'Zodiacs in a mood | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Moods pass. | *Snacks help.*',
    draw(x, t, lt) {
      const t0 = t - lt
      ;[['PIZZA', 260], ['COOKIE', 440], ['PIZZA', 640], ['COOKIE', 820]].forEach(([n, sx], i) => {
        const d = ease.outBack ? ease.outBack(clamp((lt - 1.4 - i * 0.18) / 0.5)) : clamp((lt - 1.4 - i * 0.18) / 0.5)
        if (d > 0.01) bits(x, n, sx, lerp(420, 700, d), 18, { rot: Math.sin(t * 3 + i) * 0.15 })
      })
      sparkles(x, t, 540, 720, t0 + 2.2, 9, 330, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
