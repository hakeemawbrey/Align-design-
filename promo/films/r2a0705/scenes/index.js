// r2a0705: star_advice, ADVICE SOLO (scorpio), "Scorpio, you're allowed | *to say no.*" (signs3kit social cut, music:
// lofi · G). One sign the whole way: nine gentle permission slips for a Scorpio, each with one light gag. Ending:
// callback (the sunglasses "no." from card two comes back).
//   your evening is yours · "no." is a full sentence (in sunglasses) · guarding your energy isn't rude · said yes, then
//   regretted it? pause first · one reason is enough · not feeling the match? a kind no is fair · a quiet night,
//   nobody else · real friends hear no and stay · your yes means more when it's real
//   group "Boundaries look | *good on you.*" · last "Still the coolest | *“no” in the room.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, swapLabel, bits, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }
/** sunglasses sliding down onto the star's eyes */
function shades(x, t, F, k, cell = 12) {
  if (k <= 0.01) return
  bits(x, 'SHADES', F.x, lerp(F.cy - 160, F.cy - 4, ease.outCubic(clamp(k))), cell)
}

const CAMEOS = [
  { sign: S, cap: 'Your evening? | *Yours to keep.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'INVITE #6', headBg: '#c97bff', headInk: INK, lines: ['tonight, 8pm?', '', lt > 1.1 ? ['RSVP: no ✓', '#1f8a4c'] : 'RSVP: …'], size: 32, rot: -0.04 })
      L(x, 800, 1100, 'EVENING: YOURS', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: '“No” is a full sentence. | *A mysterious one.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      shades(x, t, F, prog(lt, 0.3, 0.8), 13)
      bubble(x, 800, 820, 'no.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 80, col: BONE, tail: 'bl' })
      L(x, 800, 1060, 'NO NOTES', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#c97bff', 0.04, 32)
    } },
  { sign: S, cap: 'Guarding your energy? | *That’s not rude.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'ENERGY: PROTECTED', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Said yes, regretted it? | *Pause first.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'YES! (WHY?)', 'LET ME CHECK ✦', { size: 40, fromBg: GOLD, toBg: MINT })
      L(x, 800, 1040, 'CALENDAR: SAVED', pop01(t, P.t0 + 1.7, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Twelve reasons? | *One is enough.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(11, Math.floor(Math.max(0, lt - 0.3) / 0.08))
      sheet(x, 800, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 290, head: `REASONS: ${lt > 1.3 ? 1 : n}`, headBg: STEEL, headInk: INK, lines: lt > 1.3 ? ['1. no thanks :)'] : ['1. busy', '2. tired', '3. the moon', '4. …'], size: 30, align: 'left', rot: 0.04 })
      L(x, 800, 1090, 'ONE IS PLENTY', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Not feeling the match? | *A kind no is fair.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, lines: [['hey you :)', BONE, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['not for me,', '#c97bff', pop01(t, P.t0 + 1.0, 0.2, 2), true], ['take care ♥', '#c97bff', pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 26 })
    } },
  { sign: S, cap: 'Need a quiet night? | *Nobody else invited.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190, y: 10 },
    front(x, t, lt, P, F) {
      bits(x, 'CANDLE', 820, 940, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'BLANKET', F.x, F.cy + 140, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 680, 'DO NOT DISTURB', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#c97bff', -0.04, 32)
    } },
  { sign: S, cap: 'Real friends hear “no” | *and stay.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 700, 1000, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0] })
      friend(x, t, 'taurus', 880, 970, 190, pop01(t, P.t0 + 0.35, 0.3, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 800, 690, 'no worries! ♥', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Your “yes” means more | *when it’s real.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      L(x, 800, 820, 'YES (MEANT IT) ✦', pop01(t, P.t0 + 0.4, 0.3, 2.4), GOLD, -0.04, 40)
      sparkles(x, t, 800, 820, P.t0 + 0.6, 7, 200, 0.2)
      hearts(x, t, 800, 1130, P.t0 + 1.0, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0705', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Scorpio, you’re allowed | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Boundaries look | *good on you.*', mood: 'sparkle' },
  last: {
    text: 'Still the coolest | *“no” in the room.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const Fr = signChar(x, t, S, 400, 1120, 300 * pop01(t, t0 + 0.2, 0.45, 1.8), { mood: 'squint', seed: 7, look: [1, 0] })
      shades(x, t, { x: 400, cy: Fr.cy }, prog(lt, 0.5, 1.0), 13)
      bubble(x, 760, 960, 'no.', pop01(t, t0 + 1.2, 0.25, 2.4), { size: 110, col: BONE, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
