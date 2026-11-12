// r2t0646: star_talk, BELIKE, "Zodiacs trying | to say no *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · C).
// Ending: callback.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one attempt at "no" per sign (3.8 s each):
//              ♈ said NO before you finished asking · ♉ ask #41, still on the couch · ♊ no, yes, both · ♋ couldn't say no,
//              now hosting everyone · ♌ said no, took a bow · ♍ declined by formal letter · ♎ tried no, said "sure!"
//              · ♏ said no with one look · ♐ meant to say no, now at mile 19 · ♑ scheduled the no for Tuesday
//              · ♒ said no in binary · ♓ said no, then cried about it
//  49.2        "No is a | *full sentence.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Ask #200? | Taurus: *still no.*"  Taurus back on the couch, the counter climbing.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a'
const R = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Said *NO* | before you finished asking.', mood: lt => lt > 0.6 ? 'wide' : 'happy', star: R, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hey, could y—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 950, 'NO!', pop01(t, P.t0 + 0.75, 0.3, 2.6), { size: 110, bg: RED, color: CREAM, rot: -0.08 })
      sparkles(x, t, 790, 950, P.t0 + 0.8, 7, 170, 0.2, [RED, GOLD, BONE])
    } },
  { sign: 'taurus', cap: 'Ask number forty-one. | Still *no.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -170, y: -30 },
    back(x, t, lt, P) { bits(x, 'COUCH', 370, 990, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 40)
      L(x, 790, 760, `ASK #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 44)
      bubble(x, 790, 960, 'no.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 56, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Said no. Then yes. | Then *both.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      const W = ['no!', 'yes!', 'no…?', 'yes AND no']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 820, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1010, `ANSWER ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), MINT, 0.05, 34)
    } },
  { sign: 'cancer', cap: 'Couldn’t say no. | Now *hosting everyone.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      bits(x, 'DISH', 790, 960, 24 * k)
      if (k > 0.8) steam(x, t, 790, 880, { n: 3, alpha: 0.8, h: 120 })
      const n = Math.min(23, 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 23))
      L(x, 790, 720, `GUESTS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), PINK, -0.05, 38)
    } },
  { sign: 'leo', cap: 'Said no. | Took a *bow.*', mood: 'sparkle', star: R, hops: [1.3],
    squash: lt => lt > 1.3 && lt < 1.9 ? 0.14 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'no, darling.', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 960, 'THANK YOU, THANK YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#ffb34a', 0.05, 32)
      hearts(x, t, 390, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Declined with | a *formal letter.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 340, head: 'RE: YOUR REQUEST', headBg: '#2fc79a', headInk: INK, lines: ['Dear you,', 'after review,', 'regrettably:', ['NO.', RED]], size: 32, progress: prog(lt, 0.5, 1.6) })
    } },
  { sign: 'libra', cap: 'Tried to say no. | Said *“sure!”*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'SCALE', 790, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.18 * Math.sin(t * 4) })
      bubble(x, 790, 1040, 'n— sure!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Said no | with *one look.*', mood: 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'so, can I…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      L(x, 790, 960, 'REQUEST: WITHDRAWN', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#c97bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Meant to say no. | Now at *mile nineteen.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: R, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'MILE 19', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 56)
      bubble(x, 790, 960, 'how did | I get here?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Scheduled the no. | *Tuesday, 3 p.m.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 300, head: 'TUESDAY', headBg: RED, lines: ['2:00 lunch', '2:30 email', ['3:00 SAY NO', RED]], size: 30, progress: prog(lt, 0.5, 1.4) })
    } },
  { sign: 'aquarius', cap: 'Said no. | In *binary.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 820, '01101110 | 01101111', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl', font: MONO, weight: 700 })
      L(x, 790, 1010, '(that means no)', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Said no. | Then *cried about it.*', mood: lt => lt < 1.0 ? 'neutral' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'no… sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 960, 'was I mean??', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0646', key: 'C', accent: ACC, ending: 'callback',
  title: 'Zodiacs trying | to say no *be like.*',
  cameos: CAMEOS,
  group: { cap: 'No is a | *full sentence.*' },
  last: {
    text: 'Ask #200? | Taurus: *still no.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'COUCH', 540, 1230, 30 * pop01(t, t0 + 0.3, 0.35, 2))
      const k = pop01(t, t0 + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1110, 240 * k, { mood: lt > 1.8 ? 'sleepy' : 'neutral', seed: 14, glyph: false })
      const n = 41 + Math.floor(clamp((lt - 0.8) / 1.6) * 159)
      L(x, 540, 1420, `ASK #${n}: NO`, pop01(t, t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
