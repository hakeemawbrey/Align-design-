// r2a0504: star_advice, ADVICE ROLLCALL (twelve signs), "What each sign | is quietly carrying." (signs3kit, lofi · E).
// One warm, specific line per sign with a light visual gag: Aries sets down the shield · Taurus, slow is still moving ·
// Gemini closes 37 tabs · Cancer puts a few feelings down · Leo: too much? just right · Virgo: enough for today ·
// Libra: you count too · Scorpio: someone would listen · Sagittarius calls home · Capricorn shares the load ·
// Aquarius: different is the gift · Pisces lets someone hold the umbrella.
// Ending: lesson ("Everyone carries something. | Be gentle.") then "Put the bags down. | Stay a while."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, swapLabel, friend, bits, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Always being | *the brave one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.8, 1.3))
      bits(x, 'SHIELD', 790, lerp(840, 1010, d), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0, 0.5, d) })
      L(x, 800, 650, 'YOU CAN REST', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: 'taurus', cap: 'Fear of change. | *Slow* still counts.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) { x.save(); x.globalAlpha = k * (i < 1 + Math.floor(clamp((lt - 0.5) / 1.2) * 3) ? 1 : 0.3); x.fillStyle = INK; x.fillRect(640 + i * 80, 1000 - i * 70, 86, 76 + i * 70); x.fillStyle = [MINT, SKYB, GOLD, PINK][i]; x.fillRect(646 + i * 80, 1006 - i * 70, 74, 64 + i * 70); x.restore() }
      L(x, 800, 640, 'ONE STEP. ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'A head with | *forty tabs open.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.1, 'TABS OPEN: 40', 'TABS OPEN: 3', { size: 38, fromBg: RED, toBg: MINT })
      L(x, 800, 1020, 'BREATHE. ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Everyone’s feelings. | *Put a few down.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = lt > 1.1 ? 1 : 3
      for (let i = 0; i < 3; i++) { const out = i >= n ? ease.outCubic(prog(lt, 1.1, 1.5)) : 0; bits(x, 'BAG', 740 + i * 90 + out * 40, 900 + out * 120, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { alpha: 1 - out * 0.5 }) }
      L(x, 800, 680, 'LIGHTER ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Worry they’re *too much.* | You’re not.', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'TOO MUCH?', 'JUST RIGHT', { size: 44, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 820, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'A to-do list | that *never ends.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const sc = clamp((lt - 0.3) / 1.0)
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 340, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['[x] everything', '[x] the rest', sc > 0.5 ? '[ ] page 2 of 9' : ''], size: 30, align: 'left' })
      L(x, 800, 1080, 'ENOUGH FOR TODAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Everyone else’s peace. | *Yours counts too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const tilt = lerp(0.25, 0, ease.inOutCubic(prog(lt, 0.9, 1.4)))
      x.save(); x.translate(800, 860); x.scale(pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.2, 0.3, 2))
      x.fillStyle = INK; x.fillRect(-8, -40, 16, 200); x.fillRect(-70, 150, 140, 16)
      x.rotate(tilt); x.fillStyle = INK; x.fillRect(-160, -48, 320, 14)
      x.fillStyle = PINK; x.fillRect(-190, -30, 80, 20); x.fillStyle = SKYB; x.fillRect(110, -30, 80, 20)
      x.restore()
      L(x, 700, 700, 'THEM', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.05, 26); L(x, 900, 700, 'YOU', pop01(t, P.t0 + 0.5, 0.3, 2.2), SKYB, 0.05, 26)
      L(x, 800, 1100, 'BALANCED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Things they never say. | *Someone* would listen.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE ♡', headCol: LAV, lines: [['you ok?', LAV, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['…kind of not', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2), true], ['i’m here. talk.', LAV, pop01(t, P.t0 + 1.5, 0.25, 2.2)]], size: 22 })
    } },
  { sign: 'sagittarius', cap: 'Quietly homesick. | *Call home.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 690, 1000, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'HOUSE', 880, 860, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 760, 660, '“hi mom!”', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 880, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: 'capricorn', cap: 'Everyone’s expectations. | *Share the load.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOX', 760, 980 - i * 80, 11 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      friend(x, t, 'taurus', 900, 980, 170, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 27 })
      bubble(x, 900, 760, 'got this half.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Feeling *different.* | That’s the gift.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'ONE OF A KIND', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 170, 0.5)
    } },
  { sign: 'pisces', cap: 'Everyone’s storms. | Let someone *hold the umbrella.*', mood: 'heart', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 470, 590, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 790, 960, 180, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 29 })
      const over = ease.inOutCubic(prog(lt, 0.8, 1.3))
      bits(x, 'UMB', lerp(790, 470, over), 710, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1130, 'COVERED. ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0504', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign is | *quietly carrying.*',
  cameos: CAMEOS,
  group: { cap: 'Heavy hearts. | *Soft landing.*', moods: ['heart', 'happy', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'heart', 'heart', 'happy', 'sparkle', 'heart'] },
  lesson: { text: 'Everyone carries something. | Be *gentle.*', chip: 'STATUS: LIGHTER' },
  last: { text: 'Put the bags down. | *Stay a while.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
