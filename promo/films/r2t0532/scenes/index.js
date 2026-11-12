// r2t0532: star_talk, BELIKE (twelve signs), "Zodiacs called on | be like." (signs3kit social cut, music: lofi · E).
// Ending: group (pop quiz tomorrow).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
// a raised hand, waving
const HAND = ['.Y.Y.Y.', '.Y.Y.Y.', 'YY.Y.YY', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '..YYY..']

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | the *question.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.2, 0.5, 0.8],
    front(x, t, lt, P, F) {
      bits(x, 'GLOVE', F.x + 150, F.cy - 150 + Math.sin(t * 14) * 10, 14 * pop01(t, P.t0 + 0.15, 0.25, 2), { rot: Math.sin(t * 14) * 0.15 })
      bubble(x, 800, 720, 'ME! ME! ME!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: '#ff8a7a', tail: 'bl' })
      L(x, 800, 1080, 'Q: NOT ASKED YET', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Mid-sandwich. | *Kept chewing.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, lt > 1.0 ? 'BITTEN' : 'SANDWICH', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 1070, 'mm-hm?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Gave *three* answers. | All different.', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.2, 1.7],
    front(x, t, lt, P) {
      ;['A) YES', 'B) NO', 'C) BOTH?'].forEach((s, i) => L(x, 800, 720 + i * 150, s, pop01(t, P.t0 + 0.4 + i * 0.4, 0.3, 2.2), [MINT, PINK, GOLD][i], i % 2 ? 0.05 : -0.05, 38))
    } },
  { sign: 'cancer', cap: 'Hid behind | the *textbook.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P, F) {
      const up = ease.outBack ? ease.outBack(prog(lt, 0.4, 0.9)) : ease.outCubic(prog(lt, 0.4, 0.9))
      bits(x, 'BOOK', F.x, lerp(1150, F.cy + 30, up), 32, { alpha: clamp(up * 2) })
      L(x, 800, 820, 'NOT HERE', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, 0.05, 40)
    } },
  { sign: 'leo', cap: 'Stood up. | Took *a bow.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'thank you, | thank you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1060, 'NOBODY CLAPPED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 360, 800, P.t0 + 0.7, 7, 160, 0.3)
    } },
  { sign: 'virgo', cap: 'Answered. Then | *corrected the slide.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 240, head: 'SLIDE 3', headBg: STEEL, headInk: INK, lines: ['2 + 2 = 5'], size: 40 })
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.moveTo(690, 870); x.lineTo(690 + 220 * clamp((lt - 1.0) / 0.3), 850); x.stroke(); x.restore() }
      L(x, 800, 1070, 'TYPO: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: '“Can I *ask the class*', mood: 'wide', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: ANSWER?', headCol: PINK, lines: [['A) 12', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['B) twelve', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['votes: 0', STEEL, pop01(t, P.t0 + 1.5, 0.25, 2.2)]] })
    } },
  { sign: 'scorpio', cap: 'Answered. Then asked | *why you asked.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'why me, | exactly?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1060, 'TEACHER: SWEATING', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Wild guess. | Somehow *right.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'uh… seven?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1040, 'CORRECT?!', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.05, 46)
      sparkles(x, t, 800, 1040, P.t0 + 1.35, 8, 170, 0.2)
    } },
  { sign: 'capricorn', cap: 'Answered. | With *footnotes.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 360, head: 'ANSWER', headBg: '#7fa7c9', headInk: INK, lines: ['yes.¹', '', '¹ see p. 4', '² see p. 9', '³ see p. 11'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    } },
  { sign: 'aquarius', cap: 'Answered a | *different question.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'but what’s | the teacher’s sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bl' })
      L(x, 800, 1060, 'BONUS POINTS?', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Was daydreaming. | Answered *in a poem.*', mood: 'wide', tears: 3, look: [1, -1], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800 + Math.sin(t) * 12, 720, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 960, 'the answer… | is the sea', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 800, 1140, 'CLASS: MOVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]
CAMEOS[6].cap = '“Can I *ask* | the class first?”'

const F = makeFilm({
  id: 'r2t0532', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs called on | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Pop quiz tomorrow. | *Good luck.*', moods: ['sparkle', 'happy', 'wink', 'wide', 'sparkle', 'squint', 'wide', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) { label0(x, t, lt) } },
})
function label0(x, t, lt) { L(x, 540, 700, 'POP QUIZ: TOMORROW', pop01(t, t - lt + 1.4, 0.3, 2.4), RED, -0.04, 40) }
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
