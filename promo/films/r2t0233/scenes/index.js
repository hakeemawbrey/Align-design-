// r2t0233: star_talk, ROLLCALL, "The signs as | babysitters." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs babysitting, each the most extreme version of itself.
//   0.0–3.6    "The signs as | *babysitters.*"
//   3.6–49.2   ♈ taught the baby to sprint · ♉ napped harder than the baby · ♊ told twelve bedtime stories at once
//              · ♋ parents came home, wouldn't leave · ♌ started a fan club (for Leo) · ♍ left the parents a report,
//              baby's birth chart included · ♎ gave the toddler a makeover · ♏ solved who drew on the wall · ♐ bedtime?
//              they went camping (in the living room) · ♑ invoiced the parents, itemised the hugs · ♒ taught the baby
//              quantum physics · ♓ the baby cried, Pisces cried louder
//  49.2        "Kids: thriving. | *House: gone.*"
//  52.6        callback: "Parents: home. | *Cancer: still here.*"  Cancer hugging the little ones, DAY 4.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, chart, pill, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#9fe7c4'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const PACI = ['.PPP.', 'PWWWP', '.PPP.', '..P..']
const BOW = ['PP...PP', 'PPPWPPP', 'PP...PP']
const CRAYON = ['.RRRRRRRRRR', 'RRRRRRRRRRR', '.RRRRRRRRRR']
const TENT = ['.....K.....', '....KOK....', '...KOOOK...', '..KOOOOOK..', '.KOOOKOOOK.', 'KOOOKDKOOOK', 'KKKKKKKKKKK']
const SWEAT = ['RRRRRRRRR', 'WWWWWWWWW', 'RRRRRRRRR']

/** a tiny baby star with a pacifier */
function baby(x, t, id, cx, cy, s, k, o = {}) {
  if (k <= 0.01) return null
  const F = signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 60 + cx % 17, ...o })
  drawBits(x, PACI, { P: PINK, W: CREAM }, cx, cy + s * 0.18 * k, s * 0.045 * k, { outline: INK })
  return F
}

const CAMEOS = [
  { sign: 'aries', cap: 'Taught the baby | *to sprint.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), bx = 720 + 140 * Math.sin(lt * 5)
      baby(x, t, 'aries', bx, 1030, 140, k, { mood: 'sparkle', hops: [P.t0 + 0.6, P.t0 + 1.0, P.t0 + 1.4, P.t0 + 1.8] })
      drawBits(x, SWEAT, { R: RED, W: BONE }, bx, 995, 6 * k)
      label(x, 790, 760, 'LAP 40', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Napped harder | *than the baby.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      baby(x, t, 'taurus', 800, 1030, 150, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'wide', look: [-1, 0] })
      for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * clamp(lt - 0.3); txt(x, 'z', 470 + i * 40 + ph * 60, 740 - ph * 160, { size: 40 + i * 12, color: LAV }); x.restore() }
      bubble(x, 790, 720, 'who’s | babysitting?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Twelve bedtime stories. | *At once.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const TOP = ['once upon a—', 'so the dragon—', 'and the Aries—', 'wait, the moon—', 'THE END (ish)']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 780, 680, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      baby(x, t, 'gemini', 800, 1040, 140, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'wide' })
      label(x, 790, 860, `STORY ${n + 1}/12`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Parents came home. | *Wouldn’t leave.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      baby(x, t, 'cancer', 790, 1040, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart' })
      label(x, 790, 700, 'STILL HERE · DAY 3', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, ...M })
      bubble(x, 700, 870, 'one more hug', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 880, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 80, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Started a fan club. | *For Leo.*', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 680, 330, 110, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#ffb34a', rot: -0.03 }, () => txt(x, 'LEO FAN CLUB', 0, 4, { size: 36, ...M }))
      for (let i = 0; i < 2; i++) { const k = pop01(t, P.t0 + 0.6 + i * 0.3, 0.35, 2); baby(x, t, ['taurus', 'pisces'][i], 700 + i * 180, 1020, 130, k, { mood: 'sparkle', tears: i ? 1 : 0, hops: [P.t0 + 1.2 + i * 0.2] }); label(x, 700 + i * 180, 900, 'MEMBER', k, { size: 22, bg: GOLD, rot: 0.06, ...M }) }
      sparkles(x, t, 390, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Left the parents | *a report.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 290, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: MINT, rot: 0.04 }, () => {
        txt(x, 'REPORT', 0, -130, { size: 34, ...M })
        txt(x, 'VOL. 1 OF 3', 0, -90, { size: 22, ...M })
        chart(x, 0, 40, 80, 1, t, 0.4)
        txt(x, 'baby’s birth chart', 0, 150, { size: 22, weight: 700 })
      })
      label(x, 790, 650, 'NAPS: 2 · BLINKS: 900', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'libra', cap: 'Gave the toddler | *a makeover.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      baby(x, t, 'libra', 800, 990, 190, k, { mood: lt > 1.0 ? 'sparkle' : 'happy' })
      drawBits(x, BOW, { P: PINK, W: CREAM }, 800, 900, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      sparkles(x, t, 800, 980, P.t0 + 1.0, 7, 140, 0.3)
      label(x, 800, 700, 'ICONIC.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.05, ...M })
    } },
  { sign: 'scorpio', cap: 'Solved who drew | *on the wall.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = clamp(lt / 0.4); x.save(); x.globalAlpha = k; x.strokeStyle = '#ff6b5a'; x.lineWidth = 10; x.lineCap = 'round'
      x.beginPath(); x.arc(760, 760, 60, 0, Math.PI * 2); x.moveTo(740, 745); x.lineTo(742, 748); x.moveTo(780, 745); x.lineTo(782, 748); x.moveTo(735, 785); x.quadraticCurveTo(760, 805, 785, 785)
      x.moveTo(820, 820); x.lineTo(900, 700); x.lineTo(920, 840); x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, CRAYON, { R: '#ff6b5a' }, 800, 940, 10 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.3 })
      baby(x, t, 'gemini', 880, 1060, 120, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'wink', look: [-1, 0] })
      label(x, 760, 1090, 'CASE CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Bedtime? | They went *camping.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, TENT, { K: INK, O: '#ff9a4a', D: '#2a1640' }, 320, 990, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 320, 740, 'LIVING ROOM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, ...M })
      bubble(x, 330, 620, 'marshmallows!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Invoiced the parents. | *Itemised the hugs.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 280, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'INVOICE', 0, -150, { size: 34, ...M })
        const L = [['naps', '2'], ['snacks', '5'], ['hugs', '14'], ['high fives', '9']]
        L.forEach(([a, b], i) => { if (lt > 0.5 + i * 0.25) { txt(x, a, -110, -80 + i * 55, { size: 26, weight: 700, align: 'left' }); txt(x, `×${b}`, 110, -80 + i * 55, { size: 26, ...M, align: 'right' }) } })
        if (lt > 1.6) txt(x, 'DUE: FRIDAY', 0, 150, { size: 28, ...M, color: RED })
      })
    } },
  { sign: 'aquarius', cap: 'Taught the baby | *quantum physics.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 760, 320, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#1f3b2c', rot: -0.03, border: 10 }, () => {
        txt(x, 'E = ?', 0, -50, { size: 44, color: BONE })
        txt(x, '∞ + ☾ + ★', 0, 30, { size: 36, color: MINT, weight: 700 })
      })
      baby(x, t, 'aquarius', 800, 1060, 140, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: lt > 1.4 ? 'sparkle' : 'wide', look: [0, -1] })
      bubble(x, 900, 940, 'got it', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The baby cried. | Pisces *cried louder.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      baby(x, t, 'pisces', 800, 1030, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'wide' : 'neutral', tears: lt > 1.4 ? 0 : 1, look: [-1, 0] })
      label(x, 790, 720, 'VOLUME: 11', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04, ...M })
      bubble(x, 790, 870, '…you okay?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0233', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs as | *babysitters.*',
  cameos: CAMEOS,
  group: { cap: 'Kids: thriving. | *House: gone.*' },
  last: {
    text: 'Parents: home. | *Cancer: still here.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 540, 1150, 300 * k, { mood: 'heart', seed: 44, hops: [t0 + 1.4] })
      baby(x, t, 'aries', 310, 1250, 180, pop01(t, t0 + 0.6, 0.35, 2), { mood: 'sleepy' })
      baby(x, t, 'pisces', 770, 1250, 180, pop01(t, t0 + 0.75, 0.35, 2), { mood: 'sleepy', tears: 1 })
      label(x, 540, 1440, 'STILL HERE · DAY 4', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04, ...M })
      hearts(x, t, 540, 980, t0 + 1.5, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
