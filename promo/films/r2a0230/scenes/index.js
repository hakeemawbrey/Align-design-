// r2a0230: ADVICE ROLLCALL, "How each sign | forgives." (star_advice, music: lofi · G). Ending: callback.
//   ♈ mad for a minute, hugs by the second · ♉ takes a while, means it fully · ♊ forgives mid-sentence · ♋ forgives with soup
//   · ♌ forgives you grandly, in public · ♍ talks it through, lets it go · ♎ already forgave you · ♏ slowly, then completely
//   · ♐ forgot why they were mad · ♑ wants a real apology, then it's done · ♒ needs space, comes back kind
//   · ♓ forgives instantly, cries anyway
//   group "Everyone forgives. | *Just differently.*"   last (callback to Cancer) "Cancer made | *extra soup.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }

const CAMEOS = [
  { sign: 'aries', cap: 'Mad for a minute. | *Hugs by the second.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', star: L, hops: [1.1],
    front(x, t, lt, P) {
      label(x, 790, 700, lt > 1.1 ? 'MAD: OVER' : 'MAD: 0:59', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: lt > 1.1 ? MINT : RED, color: lt > 1.1 ? INK : BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'c’mere. hug.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: 'taurus', cap: 'Takes a while. | *Means it fully.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      meter(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 1 - ease.inOutCubic(prog(lt, 0.4, 2.0)), { w: 300, col: RED, title: 'GRUDGE' })
      label(x, 790, 960, 'MELTING…', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forgives mid-sentence. | *Then changes topic.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt > 1.2 ? 'ANYWAY, tacos?' : 'it’s fine! so—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Forgives you. | *With soup.*', mood: 'heart', star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'bowl', 790, 800, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 640, 'eat. we’re ok.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      hearts(x, t, 680, 1140, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Forgives you grandly. | *In front of everyone.*', mood: 'sparkle', star: L, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 790, 700, 'ANNOUNCEMENT:', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'you are | FORGIVEN!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.2, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Talks it through. | *Then lets it go.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.4))
      const it = ['what happened', 'how it felt', 'let it go'].map((s, i) => s + (i < n ? ' ✓' : ''))
      note(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), it.join(' | '), { head: 'THE TALK', headBg: MINT, size: 36, w: 330 })
    } },
  { sign: 'libra', cap: 'Just wants peace. | *Already forgave you.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'sorry, I—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'br', col: BONE })
      bubble(x, 790, 880, 'we’re good ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl', col: PINK })
    } },
  { sign: 'scorpio', cap: 'Forgives slowly. | *Then completely.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      meter(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 0.1 + 0.9 * ease.inCubic(prog(lt, 0.4, 2.0)), { w: 300, col: MINT, title: 'TRUST' })
      label(x, 790, 980, 'RESTORED', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Forgot why they were mad. | *Planned a trip.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 320, 690, 'wait, what | happened?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      bits(x, 'suitcase', 320, 960, 20 * pop01(t, P.t0 + 1.1, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Wants a real apology. | *Then it’s done.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      note(x, 310, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'apology ✓ | lesson ✓ | closed ✓', { head: 'CASE FILE', headBg: MINT, size: 36, w: 320 })
    } },
  { sign: 'aquarius', cap: 'Needs a little space. | *Comes back kind.*', mood: 'happy', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bits(x, 'moon', 820, 680, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      phone(x, 790, 930, 0.9 * pop01(t, P.t0 + 0.9, 0.3, 2), { top: '♒︎', head: 'BACK', msg: 'missed you. | we’re good.', bg: MINT })
    } },
  { sign: 'pisces', cap: 'Forgives instantly. | *Cries anyway.*', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'heart', 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 980, 'FORGIVEN: 0.1 SEC', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0230', key: 'G', accent: PINK, ending: 'callback',
  title: 'How each sign | *forgives.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone forgives. | *Just differently.*' },
  last: {
    text: 'Cancer made | *extra soup.*',
    draw(x, t, lt) {
      signChar(x, t, 'cancer', 540, 1040, 260, { mood: lt > 1.0 ? 'heart' : 'happy', pop: pop01(t, t - lt + 0.3, 0.4, 1.8), hops: [t - lt + 1.0], seed: 9 })
      for (let i = 0; i < 3; i++) bits(x, 'bowl', 400 + i * 140, 1290, 14 * pop01(t, t - lt + 0.9 + i * 0.2, 0.3, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
