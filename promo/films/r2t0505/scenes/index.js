// r2t0505: star_talk, BE LIKE (twelve signs), "Zodiacs on a Friday afternoon | be like." (signs3kit, lofi · F).
// Aries out the door at 4:59 · Taurus in pyjamas at 3 · Gemini made five plans, cancelled four · Cancer planning a cosy
// night in · Leo changing outfits for the commute · Virgo clearing every unread · Libra's match asks where to go ·
// Scorpio left without saying bye · Sagittarius said yes to three parties · Capricorn scheduling Monday on Friday ·
// Aquarius' weekend plan is a robot · Pisces cries happy Friday tears.
// Ending: lesson ("You made it | to Friday.") then "See you Monday. | Maybe."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, zzz, swapLabel, friend, confetti, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }
function door(x, cx, cy, k, open = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -170, 180, 340); x.fillStyle = '#ffe7a8'; x.fillRect(-80, -160, 160, 330)
  x.fillStyle = WOOD; x.fillRect(-80, -160, 160 * (1 - open), 330); x.fillStyle = GOLD; if (open < 0.8) x.fillRect(-80 + 160 * (1 - open) - 30, 0, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Out the door | at *4:59.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      door(x, 820, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.7, 1.0)))
      L(x, 820, 660, '4:59 PM', pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, 0.04, 40)
      bubble(x, 480, 640, 'BYE!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Already in pyjamas. | *At 3.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 100, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 820, 900, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 820, 700, '3:00 PM. PJS: ON', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, 0.04, 32)
      zzz(x, t, 470, 700)
    } },
  { sign: 'gemini', cap: 'Made five plans. | *Cancelled four.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const PL = ['BRUNCH', 'PARTY', 'GYM', 'MOVIE', 'NAP']
      PL.forEach((p, i) => {
        const y = 680 + i * 90, k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2.2)
        L(x, 800, y, p, k, i === 4 ? MINT : [GOLD, PINK, SKYB, LAV][i], i % 2 ? 0.04 : -0.04, 32)
        if (i < 4 && lt > 1.0 + i * 0.15) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(700, y + 4); x.lineTo(700 + 200 * clamp((lt - 1.0 - i * 0.15) / 0.15), y - 4); x.stroke(); x.restore() }
      })
    } },
  { sign: 'cancer', cap: 'Planning a | *cosy night in.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 700, 900, 14 * pop01(t, P.t0 + 0.2, 0.3, 2)); bits(x, 'CANDLE', 900, 920, 11 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bits(x, 'MUG', 800, 1000, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 690, 'SINCE MONDAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Changed outfits | *for the commute.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      const n = Math.min(5, 1 + Math.floor(lt * 2.2))
      if (n % 2) bits(x, 'SHADES', F.x, F.cy - 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 840, `LOOK ${n} OF 5`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.04, 40)
      sparkles(x, t, 360, 860, P.t0 + 0.6 + (n - 1) * 0.45, 7, 170, n)
      bubble(x, 800, 1040, 'it’s a bus.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Clearing every unread | *before the weekend.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = Math.max(0, 48 - Math.floor(clamp((lt - 0.3) / 1.2) * 48))
      L(x, 800, 840, n ? `UNREAD: ${n}` : 'UNREAD: NONE', pop01(t, P.t0 + 0.2, 0.3, 2.2), n ? RED : MINT, -0.04, 44)
      if (!n) sparkles(x, t, 800, 840, P.t0 + 1.5, 7, 180, 0.3)
    } },
  { sign: 'libra', cap: 'Friday date? | Still picking *the place.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MATCH ♎︎', headCol: PINK, lines: [['where to? :)', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)], [['tacos?', 'sushi?', 'pasta?', 'both?'][Math.floor(lt * 3) % 4], BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true]], size: 24 })
      L(x, 790, 1110, 'IT’S 9 PM', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Left without | *saying bye.*', mood: 'squint', look: [-1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      door(x, 820, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 0 : 0.6)
      if (lt > 1.2) L(x, 820, 660, 'POOF.', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 40)
      bubble(x, 820, 1120, 'where’d they go?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Said yes | to *three parties.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) L(x, 800, 700 + i * 130, `PARTY ${i + 1}: YES`, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.4), [GOLD, MINT, PINK][i], i % 2 ? 0.05 : -0.05, 34)
      confetti(x, t, 800, 900, P.t0 + 1.4, { n: 18, spread: 240 })
    } },
  { sign: 'capricorn', cap: 'Scheduling Monday. | *On Friday.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'MONDAY', headBg: STEEL, headInk: INK, lines: ['7:00  plan', '7:15  plan more', '7:30  coffee'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1090, 'WEEKEND: ALSO PLANNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'aquarius', cap: 'Weekend plan: | *build a robot.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      bubble(x, 800, 650, 'beep.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      L(x, 800, 1070, 'ITS NAME IS STEVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'It’s Friday. | *Happy* tears.', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 820, 'FRI 5:00 PM', pop01(t, P.t0 + 0.2, 0.3, 2.2), PINK, 0.04, 44)
      bubble(x, 800, 1020, 'we made it…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      hearts(x, t, 400, 820, P.t0 + 1.2, { n: 5, life: 1.5, spread: 150, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0505', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs on a Friday | afternoon *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weekend mode: | *activated.*', moods: ['sparkle', 'sleepy', 'sparkle', 'heart', 'wink', 'happy', 'wide', 'squint', 'sparkle', 'happy', 'sparkle', 'sparkle'] },
  lesson: { text: 'You made it | to *Friday.*', chip: 'STATUS: WEEKEND' },
  last: { text: 'See you Monday. | *Maybe.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
