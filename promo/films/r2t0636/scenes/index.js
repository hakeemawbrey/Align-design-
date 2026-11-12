// r2t0636: star_talk, ROLLCALL (twelve signs), "The signs on | *lunch break.*" (signs3kit social cut, music: lofi · C).
// Each sign's most extreme lunch break. Ending: group.
//   ♈ lunch at 10:02, starving by 10:05 · ♉ one-hour lunch, took three · ♊ ordered from four places · ♋ packed lunch
//   for the whole office · ♌ forty photos of lunch, lunch went cold · ♍ meal-prepped by moon phase · ♎ matched with
//   two lunches, break ended · ♏ someone ate their yogurt, Scorpio knows who · ♐ went for a sandwich, came back with a
//   tan · ♑ booked a lunch meeting with themselves · ♒ invented the soup sandwich · ♓ found a note in their lunch, sobbed
//   group "One hour. | *Twelve* disasters."  (a big clock spins past the hour)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }
const YOGURT = ['.WWWWWW.', 'KKKKKKKK', '.PPPPPP.', '.PWWWWP.', '.PWWWWP.', '.PPPPPP.', '..PPPP..']
const YOGURT_C = { W: CREAM, K: INK, P: PINK }

// a clock face whose hands run fast (lunch breaks go quickly)
function clock(x, t, cx, cy, r, k, speed = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 5, Math.sin(a) * r * 0.82 - 5, 10, 10) }
  const m = t * speed * 2.4, h = m / 12
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(h) * r * 0.45, -Math.cos(h) * r * 0.45); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m) * r * 0.72, -Math.cos(m) * r * 0.72); x.stroke()
  x.fillStyle = RED; x.fillRect(-9, -9, 18, 18)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Lunch at 10:02. | Starving *by 10:05.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 0.8 ? 0.35 : 1 })
      L(x, 800, 650, lt < 1.3 ? 'TIME: 10:02' : 'TIME: 10:05', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.3 ? BONE : RED, -0.04, 38)
      if (lt > 0.8) L(x, 800, 1130, 'BOWL: EMPTY', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, 0.04, 32)
      bubble(x, 790, 830, 'snack?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'One-hour lunch. | Took *three.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      clock(x, t, 800, 800, 120, pop01(t, P.t0 + 0.2, 0.3, 2), 3)
      bits(x, 'PLATE', 800, 1060, 18 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 800, 610, 'BACK AT: 3 PM', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'gemini', cap: 'Ordered from | *four places.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const items = ['PIZZA', 'SANDWICH', 'BOWL', 'APPLE']
      items.forEach((n, i) => bits(x, n, 700 + (i % 2) * 190, 760 + Math.floor(i / 2) * 210, 15 * pop01(t, P.t0 + 0.25 + i * 0.3, 0.3, 2)))
      L(x, 795, 1120, 'DELIVERIES: 4', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Packed lunch | for *the whole office.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.2))
      for (let i = 0; i < n; i++) bits(x, 'BOX', 800 + (i % 2 ? 14 : -14), 1080 - i * 62, 13 * pop01(t, P.t0 + 0.25 + i * 0.26, 0.2, 2))
      L(x, 800, 640, 'NAMES ON EACH ONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Forty photos of lunch. | Lunch: *cold.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 800, 850, k, { head: `TAKE ${Math.min(40, 1 + Math.floor(clamp(lt / 1.6) * 39))}`, headCol: GOLD, lines: [] })
      bits(x, 'PLATE', 805, 880, 15 * k, { rot: 0.05 })
      const fl = (lt * 5) % 1
      if (lt < 1.6 && k > 0.5 && fl < 0.25) { x.save(); x.globalAlpha = 0.5 * (1 - fl * 4); x.fillStyle = '#fff'; x.fillRect(690, 680, 230, 340); x.restore() }
      L(x, 800, 1130, 'TEMP: ICE AGE', pop01(t, P.t0 + 1.9, 0.3, 2.2), SKYB, 0.05, 32)
    } },
  { sign: 'virgo', cap: 'Meal-prepped | *by moon phase.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ph = ['NEW', 'HALF', 'FULL', 'WANE']
      ph.forEach((p, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2), cx = 710 + (i % 2) * 190, cy = 760 + Math.floor(i / 2) * 220
        bits(x, 'BOX', cx, cy, 14 * k)
        L(x, cx, cy + 80, p, k, LAV, (i % 2 ? 0.05 : -0.05), 26)
      })
      bits(x, 'MOON', 800, 610, 12 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Matched with two lunches. | *Break ended.*', mood: lt => lt > 1.5 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: "✦ IT'S A MATCH", headCol: PINK,
        lines: [['salad', MINT, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['burger', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2), true], ['…both?', BONE, pop01(t, P.t0 + 1.2, 0.25, 2), false]] })
      L(x, 800, 1130, 'BREAK: OVER', pop01(t, P.t0 + 1.95, 0.3, 2.4), RED, 0.05, 34)
    } },
  { sign: 'scorpio', cap: 'Someone ate their yogurt. | Scorpio *knows who.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, YOGURT, YOGURT_C, 760, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 0.9 })
      bits(x, 'LENS', 860 + Math.sin(t * 2.4) * 26, 980, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 650, 'LID: EMPTY', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.05, 32)
      L(x, 800, 1130, 'CASE: CLOSED', pop01(t, P.t0 + 1.8, 0.3, 2.4), '#c97bff', 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Went for a sandwich. | Came back *with a tan.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 1010, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const pk = pop01(t, P.t0 + 0.6, 0.3, 2)
      bits(x, 'PLANE', lerp(690, 900, clamp((lt - 0.5) / 1.2)), 760 - 40 * Math.sin(clamp((lt - 0.5) / 1.2) * Math.PI), 22 * pk, { rot: 0.2 })
      bits(x, 'SUN', 880, 620, 11 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 780, 1140, 'GONE: 2 HOURS', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Booked a lunch meeting. | *With themselves.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 1030, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 760, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 330, h: 270, head: 'AGENDA', headBg: STEEL, headInk: INK, lines: ['1. chew', '2. swallow', '3. synergy'], size: 30, align: 'left', progress: clamp((lt - 0.5) / 1.0) })
    } },
  { sign: 'aquarius', cap: 'Invented | *the soup sandwich.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'SANDWICH', 800, 880, 18 * k)
      if (k > 0.5) { x.save(); x.fillStyle = '#ff9a4a'; for (let i = 0; i < 5; i++) { const ph = ((t * 1.3 + i / 5) % 1); x.globalAlpha = 1 - ph; x.fillRect(720 + i * 38, 950 + ph * 120, 14, 20) } x.restore() }
      steam(x, t, 800, 800, { n: 3 })
      L(x, 800, 1130, 'PATENT: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#6fc3ff', 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Found a note in their lunch. | *Sobbed.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 1060, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 790, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 320, h: 220, rot: 0.05, bg: CREAM, lines: ['have a', 'nice day!'], size: 44 })
      hearts(x, t, 800, 690, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0636', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs on | *lunch break.*',
  cameos: CAMEOS,
  group: { cap: 'One hour. | *Twelve* disasters.',
    draw(x, t, lt) { clock(x, t, 540, 650, 110, pop01(t, t - lt + 1.2, 0.4, 2), 5) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
