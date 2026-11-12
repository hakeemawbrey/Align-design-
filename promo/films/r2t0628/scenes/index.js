// r2t0628: star_talk, ROLLCALL, "First day | *at a new job.*" (signs3kit social cut, music: lofi · G).
// Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one first day per sign (3.8 s each):
//              ♈ asked for a promotion · ♉ brought their couch to the office · ♊ forty friends by lunch
//              · ♋ thirty family photos on the desk · ♌ gave a speech at orientation, unasked · ♍ corrected the
//              onboarding doc · ♎ redecorated the break room · ♏ found out who really runs it (the printer)
//              · ♐ asked to work from a beach · ♑ five-year plan, submitted · ♒ asked the whole team their signs
//              · ♓ got a welcome card, cried at the desk
//  49.2        "Day one. | *Nailed it.* Mostly."
//  52.6        callback: "Aries got promoted. | *By Friday.*"
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

/** a small framed photo */
function frame(x, cx, cy, s, col, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-s / 2 - 6, -s * 0.6 - 6, s + 12, s * 1.2 + 12)
  x.fillStyle = WOOD; x.fillRect(-s / 2, -s * 0.6, s, s * 1.2)
  x.fillStyle = col; x.fillRect(-s / 2 + 8, -s * 0.6 + 8, s - 16, s * 1.2 - 16)
  x.fillStyle = GOLD; x.fillRect(-8, -10, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Day one. | Asked for *a promotion.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 660, 'START: 9:00', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 34)
      bubble(x, 800, 850, 'so… manager?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1060, 'ASKED: 9:04', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ff8a5a', 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Brought their couch. | *To the office.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    back(x, t, lt, P) { bits(x, 'COUCH', 790, 1040, 26 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 720, 940, 9 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
      L(x, 800, 680, 'DESK CHAIR? NO.', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Made forty friends. | *By lunch.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 39)
      L(x, 800, 700, `FRIENDS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.05, 46)
      bits(x, 'CLOCK', 800, 930, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1110, '11:58 AM', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Desk already has | *thirty family photos.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const COLS = [SKYB, PINK, GOLD, MINT, LAV, '#ff9a5a', SKYB, PINK, GOLD]
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.16))
      for (let i = 0; i < n; i++) frame(x, 680 + (i % 3) * 120, 700 + Math.floor(i / 3) * 150, 86, COLS[i], (i % 2 ? 0.08 : -0.08))
      L(x, 800, 1130, 'MOM, MOM, MOM, DOG', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Gave a speech. | *Nobody asked.*', mood: 'sparkle', star: ST, hops: [1.3],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 490); x.lineTo(410, 490); x.lineTo(570, 1180); x.lineTo(170, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'a few words…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 880, 'MINUTE 25', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ffb34a', 0.05, 42)
      sparkles(x, t, 370, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Corrected the | *onboarding doc.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'WELCOME!', headBg: STEEL, headInk: INK, lines: ['wellcome ✗', 'there/their ✗', 'tabs/spaces ✗', ['FIXED: ALL', RED]], size: 30, progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1110, 'TRACKED CHANGES: ON', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Redecorated | the *break room.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'LAMP', 690, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLOWER', 890, 960, 17 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bits(x, 'PILLOW', 790, 1110, 15 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 690, 'VIBE: FIXED', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 40)
      sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 160, 0.3)
    } },
  { sign: 'scorpio', cap: 'By noon, knew | who *really runs it.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 280, head: 'WHO’S WHO', headBg: '#b04ad0', lines: ['boss: nice', 'snacks: aisle 3', '???: printer'], size: 34, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1090, 'REAL BOSS: THE PRINTER', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Asked if they can | work *from a beach.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      bits(x, 'SUN', 800, 700, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LAPTOP', 800, 920, 15 * pop01(t, P.t0 + 0.5, 0.3, 2))
      swapLabel(x, 800, 1100, lt, 1.3, 'DESK 4B', 'DESK: ANY BEACH', { size: 32, fromBg: STEEL, toBg: '#ff9a4a' })
    } },
  { sign: 'capricorn', cap: 'Already pitched | a *five-year plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'MY 5-YEAR PLAN', headBg: STEEL, headInk: INK, lines: [], size: 30 })
      const BARS = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a', '#ff9a4a']
      for (let i = 0; i < 5; i++) { const h = 30 + i * 32, g = ease.outCubic(prog(lt, 0.5 + i * 0.18, 0.8 + i * 0.18)); x.fillStyle = BARS[i]; x.fillRect(680 + i * 50, 980 - h * g, 36, h * g) }
      L(x, 800, 1110, 'YEAR 5: YOUR JOB', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#2fc79a', -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Asked the whole team | their *star signs.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      chart(x, 800, 790, 125, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 990, 'MANAGER: A LEO', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 32)
      L(x, 800, 1090, 'EXPLAINS A LOT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Got a welcome card. | *Cried* at the desk.', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, head: 'WELCOME!', headBg: PINK, headInk: INK, lines: ['so glad', 'you’re here :)'], size: 32 })
      L(x, 800, 1090, 'TISSUES: AISLE 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0628', key: 'G', accent: ACC, ending: 'callback',
  title: 'First day | *at a new job.*',
  cameos: CAMEOS,
  group: { cap: 'Day one. | *Nailed it.* Mostly.' },
  last: {
    text: 'Aries got promoted. | *By Friday.*',
    draw(x, t, lt) {
      L(x, 540, 1300, '★ PROMOTED ★', pop01(t, t - lt + 0.6, 0.35, 2.2), GOLD, -0.04, 84)
      confetti(x, t, 540, 1260, t - lt + 0.8, { n: 26, spread: 360 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
