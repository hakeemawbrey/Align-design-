// r2a0505: star_advice, ADVICE ROLLCALL (twelve signs), "Confident on dates, | sign by sign." (signs3kit, lofi · G).
// One warm, specific line per sign with a light gag: Aries lets them talk first · Taurus picks their favourite spot ·
// Gemini asks one question and listens · Cancer wears the comfy outfit · Leo compliments first · Virgo leaves room for
// magic in the plan · Libra's mirror pep talk · Scorpio shares one small secret · Sagittarius plans a walk, not a
// marathon · Capricorn puts the phone face down · Aquarius' weird facts land · Pisces' nervous tears are fine.
// Ending: callback (the phone stayed face down… second date: booked).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, steam, bits, RED, CREAM, STEEL, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }
// a phone lying face down on the table (just its back)
function phoneDown(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -46, 280, 92); x.fillStyle = '#6b62a8'; x.fillRect(-130, -36, 260, 72)
  x.fillStyle = STEEL; x.fillRect(90, -20, 24, 24)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Let them *talk first.* | Then charm them.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 960, 190, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 22 })
      bubble(x, 820, 720, 'so anyway…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      L(x, 800, 1130, 'LISTENING MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Pick *your* favourite spot. | Home turf wins.', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 800, 870)
      L(x, 800, 720, 'THE USUAL TABLE', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 34)
      bubble(x, 800, 1110, 'the waiter knows me', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 28, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Ask one question. | *Listen* to the answer.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'favourite food?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 900, 'my grandma’s soup', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 30, col: PINK, tail: 'br' })
      L(x, 800, 1070, 'NO FOLLOW-UP x7', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Wear the comfy outfit. | *Cosy is cute.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 110, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 820, 'COSY = CUTE', pop01(t, P.t0 + 0.7, 0.3, 2.4), PINK, 0.04, 40)
      hearts(x, t, 560, 980, P.t0 + 1.2, { n: 5, life: 1.5, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Compliment them first. | *Watch them glow.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const g = lt > 1.0
      friend(x, t, 'cancer', 820, 950, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: g ? 'heart' : 'happy', look: [-1, 0], seed: 23, glow: g ? 1.6 : 0.9 })
      bubble(x, 600, 680, 'great smile!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'br' })
      sparkles(x, t, 820, 950, P.t0 + 1.0, 8, 160, 0.4)
      L(x, 820, 1150, 'GLOW: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Plan the date. | *Leave room* for magic.', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'THE PLAN', headBg: MINT, headInk: INK, lines: ['7:00  dinner', '8:30  walk', '9:00  ✨ ???'], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      sparkles(x, t, 800, 930, P.t0 + 1.5, 7, 150, 0.6)
    } },
  { sign: 'libra', cap: 'Mirror pep talk. | You look *great.* Go.', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(820, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -170, 220, 340); x.fillStyle = GOLD; x.fillRect(-100, -160, 200, 320); x.fillStyle = '#bfe6ff'; x.fillRect(-84, -144, 168, 288); x.restore()
        signChar(x, t, 'libra', 820, 880, 170 * k, { mood: lt > 1.2 ? 'wink' : 'happy', look: [-1, 0], seed: 61, glyph: false, glow: 0.3, alpha: 0.85 }) }
      bubble(x, 820, 620, 'you got this.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Share one secret. | *Just one.* Start small.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'i love cartoons.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      bubble(x, 800, 940, 'me too!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      L(x, 800, 1100, 'VULNERABLE. CUTE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Plan a walk. | Not *a marathon.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = INK; const p = clamp((lt - 0.5) / 0.8); for (let i = 0; i < 4 * p; i++) x.fillRect(720 + i * 34, 880 - i * 8, 12, 12); x.restore()
      L(x, 800, 1060, '1 KM. ICE CREAM.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Phone face down. | *You’re off duty.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.0) phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'WORK', headCol: STEEL, lines: [['urgent!!', RED, 1]], size: 24 })
      else phoneDown(x, 800, 960, pop01(t, P.t0 + 1.0, 0.3, 2))
      if (lt > 1.0) L(x, 800, 760, 'OFF DUTY ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: 'aquarius', cap: 'Your weird facts? | *They love them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      friend(x, t, 'gemini', 820, 1010, 150, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'heart', look: [-1, -1], seed: 26 })
      L(x, 650, 1120, 'TELL ME MORE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Nervous tears? | *Still cute.* Promise.', mood: 'heart', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      friend(x, t, 'scorpio', 820, 960, 180, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 29 })
      bubble(x, 820, 720, 'aww, me too.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
      hearts(x, t, 620, 900, P.t0 + 1.3, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0505', key: 'G', accent: ACC, ending: 'callback',
  title: 'Confident on dates, | *sign by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Be yourself. | *It’s working.*', moods: ['heart', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'wink', 'happy', 'sparkle', 'heart', 'sparkle', 'heart'] },
  last: {
    text: 'Phone stayed down. | *Second date.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 400, 1060, 260 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.25] })
      phoneDown(x, 760, 1120, pop01(t, t0 + 0.5, 0.3, 2))
      L(x, 760, 980, 'SECOND DATE ✓', pop01(t, t0 + 1.2, 0.3, 2.4), PINK, 0.04, 36)
      hearts(x, t, 560, 1000, t0 + 1.3, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
