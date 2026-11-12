// r2t0577: star_talk, BE LIKE (twelve signs), "Zodiacs in traffic | *be like.*" (signs3kit social cut, music: lofi · E).
// Twelve signs stuck in traffic:
//   ♈ honked at the red light · ♉ stuck an hour, brought a picnic · ♊ changed lanes eleven times · ♋ called mom about it
//   · ♌ windows down, gave a concert · ♍ drew a better route, mailed it to the city · ♎ waved everyone in, still at the
//   light · ♏ got cut off, will remember forever · ♐ took a shortcut, now in another state · ♑ left at 4 a.m. to beat it
//   · ♒ invented a flying car · ♓ a sad song came on, sobbing in lane two.
// Ending: callback ("Libra is still | at that light." — Libra comes back, still waving cars in, day 3).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a4a', ST = { x: -170 }

// a traffic light; state 'r' | 'y' | 'g'
function light(x, cx, cy, k, state) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-56, -150, 112, 300); x.fillStyle = '#2a2350'; x.fillRect(-46, -140, 92, 280)
  x.fillRect(-10, 150, 20, 120)
  ;[['r', RED], ['y', GOLD], ['g', '#4fbf6a']].forEach(([s, c], i) => { x.fillStyle = s === state ? c : '#3a3168'; x.fillRect(-32, -122 + i * 88, 64, 64) })
  x.restore()
}
// a car with little wings (Aquarius's flying car)
function flyer(x, t, cx, cy, cell, flap = 0) {
  bits(x, 'CAR', cx, cy, cell)
  const w = Math.sin(t * 14) * 0.35 * flap
  bits(x, 'CLOUD', cx - cell * 7, cy - cell * 3, cell * 0.6, { rot: -0.4 + w, outline: INK })
  bits(x, 'CLOUD', cx + cell * 7, cy - cell * 3, cell * 0.6, { rot: 0.4 - w, sx: -1, outline: INK })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Honked at | *the red light.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      light(x, 860, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'r')
      bits(x, 'HORN', 640, 830, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: Math.sin(t * 40) * 0.08 * (lt > 0.8 ? 1 : 0) })
      bubble(x, 600, 640, 'HONK', pop01(t, P.t0 + 0.8, 0.2, 2.6), { size: 52, tail: 'bl' })
      L(x, 760, 1120, 'LIGHT: UNMOVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Stuck for an hour. | Brought *a picnic.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    back(x, t, lt, P) { bits(x, 'BLANKET', 400, 1080, 20 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 760, 820, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'APPLE', 890, 980, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bits(x, 'PIZZA', 690, 1000, 14 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.2 })
      L(x, 790, 640, 'TRAFFIC? WHAT TRAFFIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Changed lanes | *eleven times.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); x.fillStyle = 'rgba(239,230,214,0.35)'; for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) x.fillRect(655 + i * 80, 540 + j * 110, 10, 60); x.restore()
      const lane = [0, 2, 1, 3, 0, 2, 3][Math.min(6, Math.floor(lt * 3))]
      bits(x, 'CAR', 620 + lane * 80, 860, 11, { rot: Math.PI / 2 })
      L(x, 790, 1120, `LANE CHANGES: ${Math.min(11, Math.floor(lt * 4.6))}`, pop01(t, P.t0 + 0.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Stuck in traffic. | Called *mom* about it.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♥', headCol: PINK, lines: [['it’s SO bad', SKYB, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['oh honey', PINK, pop01(t, P.t0 + 0.9, 0.2, 2), false], ['call me', PINK, pop01(t, P.t0 + 1.2, 0.2, 2), false]] })
      L(x, 790, 1120, 'CALL: 47 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Windows down. | Gave *a concert.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      if (lt > 0.3) notes(x, t, 440, 760, { n: 5, cell: 7 })
      bubble(x, 790, 720, 'la la LAAA', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 940, 'ENCORE?', pop01(t, P.t0 + 1.2, 0.3, 2.6), '#ffb34a', 0.05, 46)
      L(x, 790, 1090, 'CARS NEARBY: TRAPPED', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 26)
    } },
  { sign: 'virgo', cap: 'Drew a better route. | Mailed it *to the city.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 820, k, { w: 330, h: 320, head: 'ROUTE V2', headBg: '#2fc79a', headInk: INK, lines: [] })
      if (k > 0.9) {
        const p = prog(lt, 0.5, 1.3)
        x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.setLineDash([22, 16]); x.beginPath()
        const pts = [[680, 920], [740, 820], [820, 860], [880, 760]]
        x.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { if (p * 3 < i - 1) break; const q = clamp(p * 3 - (i - 1)); x.lineTo(lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)) }
        x.stroke(); x.restore()
      }
      L(x, 790, 1100, 'SENT: CITY HALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Waved everyone in. | *Still at the light.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      light(x, 900, 800, 1.0 * pop01(t, P.t0 + 0.15, 0.3, 2), 'g')
      const px = ((lt * 1.6) % 1)
      bits(x, 'CAR', lerp(980, 560, px), 1060, 12, { alpha: Math.sin(Math.PI * px) })
      bubble(x, 650, 640, 'after you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 740, 900, 'CARS LET IN: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Got cut off. | Will *remember forever.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cx = lerp(1000, 700, ease.outCubic(prog(lt, 0.2, 0.8)))
      bits(x, 'CAR', cx, 820, 16)
      sheet(x, 790, 1040, pop01(t, P.t0 + 1.0, 0.3, 2), { w: 320, h: 130, head: 'GRUDGE FILE', headBg: '#c97bff', headInk: INK, font: MONO, weight: 700, size: 26, lines: ['entry #1'] })
    } },
  { sign: 'sagittarius', cap: 'Took a shortcut. | Now in *another state.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1070, 'WELCOME TO… WHERE?', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 28)
      bubble(x, 790, 620, 'love it here', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Left at 4 a.m. | To *beat the traffic.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 800, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 920, 640, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1060, 'ROAD: EMPTY. WIN.', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#2fc79a', 0.04, 30)
      if (lt < 1.4) zzz(x, t, 440, 700)
    } },
  { sign: 'aquarius', cap: 'Stuck in traffic? | Invented *a flying car.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const up = ease.inOutCubic(prog(lt, 0.8, 2.0))
      flyer(x, t, 790, lerp(1000, 690, up), 15 * pop01(t, P.t0 + 0.2, 0.3, 2), up > 0 ? 1 : 0)
      sparkles(x, t, 790, 980, P.t0 + 1.0, 7, 170, 0.3, [MINT, SKYB, BONE])
      L(x, 790, 1140, 'BETA TEST: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'A sad song came on. | *Sobbing* in lane two.', mood: lt => lt < 0.8 ? 'neutral' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 820, { n: 4, cell: 8, col: SKYB })
      bits(x, 'TISSUE', 820, 1000, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 640, 'LANE 2: EMOTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0577', key: 'E', accent: ACC, ending: 'callback',
  title: 'Zodiacs in traffic | *be like.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'ALIGNED' },
  group: { cap: 'Twelve signs. | *Zero miles moved.*' },
  last: {
    text: 'Libra is still | *at that light.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 380, 1100, 280 * k, { mood: 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      light(x, 800, 1060, 0.85 * pop01(t, t0 + 0.4, 0.3, 2), 'g')
      bubble(x, 440, 880, 'no, after YOU', pop01(t, t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 780, 1320, 'DAY 3', pop01(t, t0 + 1.4, 0.3, 2.4), PINK, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
