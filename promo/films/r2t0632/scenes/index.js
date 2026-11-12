// r2t0632: star_talk, ROLL CALL, "The signs as | *the middle child.*" (signs3kit social cut, music: lofi · E). Ending: group.
//   ♈ brought a megaphone to dinner · ♉ snack stash under the bed · ♊ relays every message, edits a few · ♋ bought their
//   own birthday present · ♌ a slideshow called "remember me?" · ♍ laminated the house rules · ♎ peacekeeper since age
//   four · ♏ knows every family secret, says nothing · ♐ gap year nobody noticed · ♑ basically raised the youngest
//   · ♒ hand-me-downs = vintage · ♓ someone asked how they were, cried for an hour
//   group (the ending) "Overlooked? | *Overqualified.*" + the MIDDLE CHILD CLUB trophy
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -190 }
const SWEATER = ['.SS....SS.', 'SSSSSSSSSS', 'SSSWWWWSSS', 'SSSSSSSSSS', '.SSSSSSSS.', '.SSPSSPSS.', '.SSSSSSSS.', '.SSSSSSSS.']
const LOCK = ['..SSSS..', '.S....S.', '.S....S.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Brought a megaphone | to *family dinner.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 640, 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 830, 760, 'I’M HERE!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 820, 1100, 'VOLUME: 11', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Snack stash | *under the bed.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;[[730, 900], [800, 880], [870, 905]].forEach(([a, b], i) => bits(x, i === 1 ? 'APPLE' : 'COOKIE', a, b, 8 * pop01(t, P.t0 + 0.6 + i * 0.2, 0.3, 2)))
      L(x, 800, 700, 'TOP SECRET', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Relays every message. | *Edits a few.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'mom says: | be home by 9', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      swapLabel(x, 800, 980, lt, 1.1, 'BY 9', 'BY 11', { size: 46, fromBg: BONE, toBg: '#ffe27a' })
    } },
  { sign: 'cancer', cap: 'Bought their own | *birthday present.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1120, 'FROM: ME, TO: ME', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 800, 840, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Made a slideshow: | *“Remember me?”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 340, h: 260, rot: 0.03, bg: NIGHT, head: `SLIDE ${1 + Math.floor(clamp((lt - 0.4) / 1.6) * 4)} OF 40`, headBg: GOLD, headInk: INK, lines: [] })
      if (k > 0.8) friend(x, t, 'leo', 800, 900, 130, 1, { mood: 'sparkle' })
      L(x, 800, 1090, 'ATTENDANCE: MANDATORY', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Wrote the house rules. | *Laminated them.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'HOUSE RULES', headBg: MINT, headInk: INK, lines: ['1. knock', '2. coasters', '3. no yelling', '4. see rule 1'], size: 30, progress: clamp((lt - 0.4) / 1.2) })
      if (lt > 1.7) { x.save(); x.globalAlpha = 0.35 + 0.2 * Math.sin(t * 6); x.fillStyle = '#ffffff'; x.fillRect(660, 700, 40, 320); x.restore() }
    } },
  { sign: 'libra', cap: 'Family peacekeeper | since *age four.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCALE', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.2 * Math.sin(t * 4) : 0 })
      L(x, 800, 1110, 'TRUCE #212', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Knows every family secret. | *Says nothing.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'THE FAMILY FILE', headBg: '#c94a6a', lines: [['[REDACTED]', INK], ['[REDACTED]', INK], ['[REDACTED]', INK]], size: 30, font: "'Space Mono', ui-monospace, monospace", weight: 700 })
      drawBits(x, LOCK, { S: STEEL, Y: GOLD, K: INK }, 800, 1060, 13 * pop01(t, P.t0 + 1.1, 0.3, 2.4))
    } },
  { sign: 'sagittarius', cap: 'Took a gap year. | *Nobody noticed.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      bubble(x, 800, 1090, 'you were gone?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Basically raised | *the youngest.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'aries', 800, 950, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'sleepy' : 'wide', look: [-1, 0] })
      L(x, 800, 700, 'BEDTIME: 8 PM', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 1130, 'AGE: ALSO 11', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Hand-me-downs? | Called it *vintage.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#9a7a5a', W: '#c9a67a', P: '#6a4a3a' }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, '✦ VINTAGE ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), '#5fd1ff', -0.04, 36)
    } },
  { sign: 'pisces', cap: 'Someone asked how they were. | *Cried for an hour.*', mood: 'heart', look: [1, -1], tears: 3, star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'how are you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'CLOCK', 800, 940, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1120, 'STILL GOING', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0632', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs as | *the middle child.*',
  cameos: CAMEOS,
  group: {
    cap: 'Overlooked? | *Overqualified.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2)
      bits(x, 'TROPHY', 540, 660, 22 * k)
      label(x, 540, 830, 'MIDDLE CHILD CLUB', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03 })
      sparkles(x, t, 540, 660, t - lt + 1.7, 8, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
