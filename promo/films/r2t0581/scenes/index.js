// r2t0581: star_talk, BELIKE, "Zodiacs opening presents | *be like.*" (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each one's most extreme way of opening a present. Ending: lesson.
//   ♈ ripped it open before you sat down · ♉ ironed the wrapping paper for next year · ♊ guessed it twelve times
//   · ♋ kept the card, the ribbon and the box · ♌ filmed their own reaction, three takes · ♍ unwrapped along the tape
//   · ♎ two gifts, still deciding which first · ♏ knew what it was since March · ♐ got a backpack, booked a trip mid-hug
//   · ♑ asked for the warranty card · ♒ played with the box, ignored the gift · ♓ cried at the wrapping paper (stars)
//   group "The wrapping paper? | *Didn’t survive.*"   lesson "It was never the gift. | It was *you.*"
//   last "Aquarius is still | *in the box.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, gift, confetti, swapLabel, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = PINK, ST = { x: -170 }

// paper shreds flying out of a gift
function shreds(x, t, cx, cy, t0, { n = 14, cols = [PINK, LAV, GOLD, MINT] } = {}) {
  const tt = t - t0; if (tt < 0 || tt > 2.2) return
  x.save()
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n - 0.5) * 2.8, v = 0.6 + ((i * 53) % 9) / 10
    const px = cx + Math.cos(a) * 260 * v * Math.min(1, tt * 2.2), py = cy + Math.sin(a) * 220 * v * Math.min(1, tt * 2.2) + 200 * tt * tt
    x.globalAlpha = 1 - ease.inQuad(clamp(tt / 2.2))
    x.save(); x.translate(px, py); x.rotate(tt * 6 + i); x.fillStyle = INK; x.fillRect(-15, -9, 30, 18); x.fillStyle = cols[i % cols.length]; x.fillRect(-12, -6, 24, 12); x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ripped it open. | Before you *sat down.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      gift(x, 790, 960, pop01(t, P.t0 + 0.15, 0.3, 2), { col: '#ff8a7a', rib: GOLD, open: prog(lt, 0.6, 0.9), rot: Math.sin(t * 30) * 0.04 * (lt < 0.6 ? 1 : 0) })
      shreds(x, t, 790, 900, P.t0 + 0.75)
      bubble(x, 790, 640, 'MINE!!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 60, col: '#ff8a7a', tail: 'bl' })
      L(x, 790, 1150, 'TIME: 0.4 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Ironed the wrapping paper. | *For next year.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 900, k, { w: 320, h: 260, bg: '#7dc8ff', head: '', lines: [], rot: -0.03 })
      // the pattern on the paper
      if (k > 0.5) { x.save(); x.translate(790, 900); x.rotate(-0.03); x.fillStyle = PINK; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) x.fillRect(-120 + i * 76, -90 + j * 76, 22, 22); x.restore() }
      L(x, 790, 1110, 'CREASES: ZERO', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 32)
      L(x, 790, 690, 'ARCHIVED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 34)
    } },
  { sign: 'gemini', cap: 'Shook it. Guessed it. | *Twelve times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      gift(x, 790, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 170, h: 130, col: '#ffd23a', rib: LAV, rot: Math.sin(t * 22) * 0.12 })
      const G = ['socks?', 'a lamp?', 'a puzzle?', 'a horse?', 'a mug?', 'TWO mugs?']
      const n = Math.min(G.length - 1, Math.floor(Math.max(0, lt - 0.4) / 0.3))
      if (lt > 0.4) bubble(x, 790, 680, G[n], 1, { size: 44, col: '#ffd23a', tail: 'bl' })
      L(x, 790, 1160, `GUESS ${Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.16))}/12`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Kept the card. | *And the box.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 900, 'KEEPSAKES', pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.03, 30)
      sheet(x, 700, 720, pop01(t, P.t0 + 0.8, 0.3, 2), { w: 200, h: 140, lines: ['love you!'], size: 30, rot: -0.1, head: '' })
      L(x, 860, 1130, 'BOX NO. 47', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.05, 32)
    } },
  { sign: 'leo', cap: 'Filmed their own | *reaction.* Three takes.', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const take = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '● REC', headCol: RED, lines: [[`TAKE ${take}`, GOLD, 1], ['“oh my GOD”', BONE, take >= 2 ? 1 : 0, true], ['“no WAY”', BONE, take >= 3 ? 1 : 0]], size: 26 })
      L(x, 800, 1120, 'GIFT: STILL WRAPPED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
      sparkles(x, t, 800, 840, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Unwrapped it | *along the tape lines.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      gift(x, 790, 930, pop01(t, P.t0 + 0.2, 0.3, 2), { col: MINT, rib: BONE, open: prog(lt, 0.8, 1.4) * 0.5 })
      // dotted cut line
      if (lt > 0.3) { x.save(); x.fillStyle = RED; for (let i = 0; i < 9; i++) if (i / 9 < prog(lt, 0.3, 0.8)) x.fillRect(690 + i * 24, 856, 12, 6); x.restore() }
      L(x, 790, 1120, 'RIPS: 0  •  TAPE: SAVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Two gifts. Which first? | *Still deciding.*', mood: lt => lt > 1.5 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      gift(x, 700, 960, k, { w: 150, h: 120, col: LAV, rib: GOLD, rot: -0.05 })
      gift(x, 890, 960, k, { w: 150, h: 120, col: PINK, rib: MINT, rot: 0.05 })
      bubble(x, 790, 680, 'eeny… | meeny…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1150, 'DAY 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Already knew what it was. | *Since March.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      gift(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#c97bff', rib: INK })
      bubble(x, 790, 680, 'it’s the | blue one.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: '#e2c4ff', tail: 'bl' })
      L(x, 790, 1160, 'SURPRISE: 0%', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Got a backpack. | Booked a trip *mid-hug.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 680, '✈ GATE 12: BOARDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 30)
      bubble(x, 790, 1140, 'thanks bye!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Said thank you. | Asked for the *warranty.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, head: 'WARRANTY', headBg: '#9aa5c4', headInk: INK, lines: ['2 years', 'parts + labour', 'filed: A–Z'], size: 32, rot: -0.04 })
      L(x, 790, 1130, 'FILED UNDER “GIFTS”', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Played with the box. | *Ignored the gift.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fly = Math.sin(t * 3) * 14
      bits(x, 'BOX', 800, 860 + fly, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      L(x, 800, 720 + fly, 'SPACESHIP', pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, -0.08, 34)
      gift(x, 820, 1120, pop01(t, P.t0 + 1.2, 0.3, 2) * 0.55, { col: STEEL, rib: BONE })
      L(x, 820, 1170, 'THE GIFT →', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.05, 24)
    } },
  { sign: 'pisces', cap: 'Cried at the wrapping paper. | *It had stars.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 890, k, { w: 300, h: 260, bg: '#2a3a8a', lines: [], rot: 0.04 })
      sparkles(x, t, 790, 890, P.t0 + 0.9, 8, 180, 0.2)
      if (k > 0.5) { x.save(); x.translate(790, 890); x.rotate(0.04); x.fillStyle = GOLD; for (let i = 0; i < 9; i++) { const px = -110 + (i % 3) * 110, py = -80 + Math.floor(i / 3) * 80; x.fillRect(px - 4, py - 14, 8, 28); x.fillRect(px - 14, py - 4, 28, 8) } x.restore() }
      bubble(x, 790, 640, 'it’s so | PRETTY', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 790, 1120, 'GIFT: NOT YET OPENED', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0581', key: 'C', accent: ACC, ending: 'lesson',
  title: 'Zodiacs opening | presents *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The wrapping paper? | *Didn’t survive.*' },
  lesson: { text: 'It was never the gift. | It was *you.*', chip: 'GIFT: RECEIVED' },
  last: { text: 'Aquarius is still | *in the box.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
