// r2t0674: star_talk, ROLLCALL, "Family reunion, | *by sign.*" (topic "The signs at a family reunion"; signs3kit social
// cut, music: lofi · D). Ending: callback.
//   3.6–49.2   one reunion moment per sign (3.8 s each):
//              ♈ won the sack race, against the kids · ♉ brought one dish, took home four · ♊ told the family story,
//              three versions · ♋ made a slideshow, cried at slide one · ♌ organised the photo, stood in the middle
//              · ♍ proofread the family tree · ♎ seating chart by sign compatibility · ♏ learned every secret by
//              dessert · ♐ showed up late, from another country · ♑ took minutes · ♒ explained their job, nobody knows
//              · ♓ saw the baby photos, sobbed
//  49.2        "Twelve signs. | *One group photo.*"
//  52.6        last "Taurus is still | *carrying leftovers.*" (card 2 paid off: the tubs come back, more of them)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, tubs, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Won the sack race. | *Against the kids.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 20 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 640, 'CHAMPION (AGE 34)', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
      bubble(x, 800, 1110, 'rematch, kids?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought one dish. | Took home *four.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.0) * 3)
      tubs(x, t, 800, 1080, n, 14, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'LEFTOVERS: SECURED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Told the family story. | *Three versions.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      ['so grandpa…', 'no, so grandpa…', 'OKAY so grandpa…'].forEach((s, i) => bubble(x, 790, 680 + i * 170, s, pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 32, col: [BONE, GOLD, PINK][i], tail: 'bl' }))
    } },
  { sign: 'cancer', cap: 'Made a slideshow. | *Cried at slide one.*', mood: 'wide', tears: lt => lt > 0.8 ? 2 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PHOTO', 800, 830, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1090, 'SLIDE 1 OF 412', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Organised the photo. | *Stood in the middle.*', mood: 'sparkle', star: { x: 0, y: -30, s: 260 }, hops: [1.2],
    front(x, t, lt, P) {
      ['cancer', 'virgo'].forEach((id, i) => friend(x, t, id, i ? 820 : 260, 960, 150, pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2), { mood: 'happy', look: [i ? -1 : 1, 0] }))
      L(x, 540, 640, 'CENTRE: TAKEN', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
      sparkles(x, t, 540, 850, P.t0 + 1.3, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Proofread | *the family tree.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'FAMILY TREE', headBg: MINT, headInk: INK, lines: ['Uncle Rob', 'Aunt Jo', 'cousin Sam', 'Gran'], size: 30 })
      const n = Math.floor(clamp((lt - 0.6) / 1.0) * 4)
      x.save(); x.strokeStyle = RED; x.lineWidth = 6; for (let i = 0; i < n; i++) { x.beginPath(); x.ellipse(800, 806 + i * 41, 110, 22, -0.05, 0, Math.PI * 2); x.stroke() } x.restore()
      L(x, 800, 1100, 'TYPOS FIXED: 4', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Made the seating chart. | *By compatibility.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'SEATING ✦', headBg: PINK, headInk: INK, lines: ['Leo + Libra', 'Cancer + Pisces', 'Scorpio: alone', '(by request)'], size: 28, progress: clamp((lt - 0.3) / 1.0) })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Learned every secret | *by dessert.*', mood: 'squint', look: lt => [Math.round(Math.sin(lt * 3)), 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 650, 'FILE: UPDATED', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 34)
      bubble(x, 800, 1100, 'pie, anyone?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Showed up late. | *From another country.*', mood: 'sparkle', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 660, 'JUST LANDED', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, 0.05, 36)
      bubble(x, 800, 1110, 'what did I miss', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Took minutes. | *At the reunion.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'MINUTES', headBg: STEEL, headInk: INK, lines: ['7. potato salad', '8. who’s hosting', '9. motion: naps'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      bits(x, 'PEN', 800, 1090, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
    } },
  { sign: 'aquarius', cap: 'Explained their job. | *Still nobody knows.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'it’s like the cloud, but…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 30, tail: 'bl' })
      L(x, 800, 1110, 'FAMILY: NODDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Saw the baby photos. | *Sobbed.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'PHOTO', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 650, 'BABY YOU, 1998', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 30)
      hearts(x, t, 560, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0674', key: 'D', accent: ACC, ending: 'callback',
  title: 'Family reunion, | *by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One group photo.*' },
  last: {
    text: 'Taurus is still | *carrying leftovers.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.6) * 6)
      tubs(x, t, 640, 1480, n, 11, k)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1400, 200 * k, { mood: 'heart', glyph: false, seed: 61 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
