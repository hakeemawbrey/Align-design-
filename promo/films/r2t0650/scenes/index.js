// r2t0650: star_talk, ROLLCALL, "The signs as | *personal trainers.*" (~57 s vertical, signs3kit social cut, music: lofi · F).
// Ending: callback.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one trainer per sign (3.8 s each), each pushed to the extreme:
//              ♈ skipped the warm-up, for everyone · ♉ rest day, every day · ♊ changed the workout every thirty seconds
//              · ♋ brought you soup mid-plank · ♌ mirror reps, mostly the mirror · ♍ corrected your form forty-seven times
//              · ♎ "gorgeous squat!" every single time · ♏ one silent stare, you did ten more · ♐ moved the class up a mountain
//              · ♑ a twelve-year plan, session one · ♒ invented an exercise nobody understands · ♓ you did one push-up, Pisces cried
//  49.2        "Sore tomorrow. | *Worth it.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Taurus’ next class? | *Nap yoga.*"  Taurus asleep on the pillow: REST DAY #7.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#2fc79a'
const R = { x: -170 }
const DUMB = ['KK......KK', 'KK......KK', 'KKSSSSSSKK', 'KKSSSSSSKK', 'KK......KK', 'KK......KK']
const dumb = (x, cx, cy, cell, o) => drawBits(x, DUMB, { K: '#3a3a5a', S: STEEL }, cx, cy, cell, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the warm-up. | *For everyone.*', mood: 'wide', star: R, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      dumb(x, 790, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 * Math.sin(t * 9) })
      L(x, 790, 1050, 'WARM-UP: SKIPPED', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Rest day. | *Every day.*', mood: 'sleepy', star: { x: -170, y: -20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 370, 990, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      zzz(x, t, 470, 760, { alpha: pop01(t, P.t0 + 0.5, 0.3, 2) })
      const n = 1 + Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.3))
      L(x, 790, 880, `REST DAY #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.05, 44)
    } },
  { sign: 'gemini', cap: 'New workout | *every thirty seconds.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: R, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const W = ['SQUATS', 'YOGA', 'JUMPS', 'TANGO?']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      L(x, 790, 860, W[n], pop01(t, P.t0 + 0.3, 0.3, 2), [MINT, LAV, GOLD, PINK][n], 0.05, 52)
    } },
  { sign: 'cancer', cap: 'Brought you soup. | *Mid-plank.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      bits(x, 'BOWL', 790, 900, 20 * k); if (k > 0.8) steam(x, t, 790, 840, { n: 3, alpha: 0.8, h: 110 })
      L(x, 790, 720, 'PLANK: 0:40', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, -0.05, 38)
      bubble(x, 790, 1080, 'eat first!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Mirror reps. | *Mostly the mirror.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#c9e6ff'; x.fillRect(-118, -178, 236, 356)
        x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-100, -160, 26, 140)
        x.restore()
        signChar(x, t, 'leo', 790, 900, 180 * k, { mood: 'wink', look: [-1, 0], seed: 44, glyph: false, glow: 0.4 })
      }
      L(x, 790, 1110, 'REPS: 0 · POSES: 31', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ffb34a', 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Corrected your form. | *Forty-seven times.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 46)
      L(x, 790, 820, `NOTE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.05, 48)
      bubble(x, 790, 1010, 'elbow. 2 degrees.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: '“Gorgeous squat!” | *Every single time.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 800, 'gorgeous squat!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 1000, 'stunning, truly', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 420, 800, P.t0 + 1.0, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'One silent stare. | You did *ten more.*', mood: 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const n = Math.min(10, Math.floor(clamp((lt - 0.6) / 1.4) * 10))
      L(x, 790, 860, `+${n} REPS`, pop01(t, P.t0 + 0.6, 0.3, 2), '#c97bff', -0.05, 56)
    } },
  { sign: 'sagittarius', cap: 'Moved the class | *up a mountain.*', mood: 'sparkle', star: R, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-180, 110); x.lineTo(0, -170); x.lineTo(180, 110); x.closePath(); x.fill(); x.fillStyle = '#7a8ab8'; x.beginPath(); x.moveTo(-164, 102); x.lineTo(0, -154); x.lineTo(164, 102); x.closePath(); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.moveTo(-50, -76); x.lineTo(0, -154); x.lineTo(50, -76); x.closePath(); x.fill(); x.restore() }
      L(x, 790, 720, 'SESSION: SUMMIT', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Twelve-year plan. | *Session one.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 790, 870, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 300, head: 'THE PLAN', headBg: '#2fc79a', headInk: INK, lines: ['year 1: walk', 'year 6: jog', ['year 12: ???', RED]], size: 30, progress: prog(lt, 0.5, 1.5) })
    } },
  { sign: 'aquarius', cap: 'Invented an exercise. | *Nobody understands it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: R, hops: [0.8, 1.6],
    squash: lt => 0.08 * Math.sin(lt * 8),
    front(x, t, lt, P) {
      L(x, 790, 820, 'THE REVERSE HOP', pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.05, 36)
      bubble(x, 790, 1010, 'trust the | process', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You did one push-up. | *Pisces cried.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', tears: lt => lt < 1.0 ? 1 : 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 800, 'PUSH-UPS: 1', pop01(t, P.t0 + 0.3, 0.3, 2), SKYB, -0.05, 44)
      bubble(x, 790, 1000, 'SO proud | of you', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0650', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs as | *personal trainers.*',
  cameos: CAMEOS,
  group: { cap: 'Sore tomorrow. | *Worth it.*' },
  last: {
    text: 'Taurus’ next class? | *Nap yoga.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'PILLOW', 540, 1240, 28 * pop01(t, t0 + 0.3, 0.35, 2))
      const k = pop01(t, t0 + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1130, 250 * k, { mood: 'sleepy', seed: 14, glyph: false })
      zzz(x, t, 640, 980, { alpha: pop01(t, t0 + 0.9, 0.3, 2), size: 48 })
      L(x, 540, 1420, 'REST DAY #7', pop01(t, t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
