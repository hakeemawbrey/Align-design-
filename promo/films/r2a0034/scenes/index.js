// r2a0034: star_advice ADVICE ROLLCALL, "How each sign does | long distance." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific long-distance habit each, with a light gag:
//   ♈ books the next visit before you hang up · ♉ mails your favourite snacks · ♊ ten memes a day, minimum
//   · ♋ falls asleep on the call · ♌ a selfie every sunrise · ♍ syncs both time zones · ♎ movie night, pressed play together
//   · ♏ writes real letters · ♐ turns the miles into a road trip · ♑ a countdown to the next hug
//   · ♒ stargazes with you from two cities · ♓ cries at hello and goodbye
//  49.2   GROUP ending: "Miles apart. | *Still aligned.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', BROWN = '#c96a3a'
// ── props
const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK']
const PHONE_C = { K: '#2a2350', S: '#3b3170', W: BONE }
const PARCEL = ['BBBBBTTBBBBB', 'BBBBBTTBBBBB', 'BBBBBTTBBBBB', 'TTTTTTTTTTTT', 'BBBBBTTBBBBB', 'BBBBBTTBBBBB', 'BBBBBTTBBBBB']
const PARCEL_C = { B: '#c9925a', T: PINK }
const ENVELOPE = ['WWWWWWWWWWWW', 'WKWWWWWWWWKW', 'WWKWWWWWWKWW', 'WWWKWWWWKWWW', 'WWWWKRRKWWWW', 'WWWWWRRWWWWW', 'WWWWWWWWWWWW']
const ENV_C = { W: BONE, K: '#9aa5c4', R: '#e23d4e' }
const TICKET = ['GGGGGGGGGGGG', 'G.KK.KKK...G', 'GGGGGGGGGGGG', 'G..KKK.KK..G', 'GGGGGGGGGGGG']
const CAMERA = ['..KKK.......', 'KKKKKKKKKKKK', 'KGGGKKKKGGGK', 'KGGKWWWKKGGK', 'KGGKWSWKKGGK', 'KGGKWWWKKGGK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, G: '#9aa5c4', W: SKYB, S: BONE }
function clock(x, cx, cy, k, t, off, tag) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineCap = 'round'; const m = t * 0.6 + off
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m / 12) * 38, -Math.cos(m / 12) * 38); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m) * 58, -Math.cos(m) * 58); x.stroke()
  x.restore()
  label(x, cx, cy + 112, tag, k, { size: 28, bg: MINT, font: MONO, weight: 700 })
}
function screen(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -95, 300, 190); x.fillStyle = '#2e6fa8'; x.fillRect(-140, -85, 280, 170)
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-20, -35); x.lineTo(-20, 35); x.lineTo(35, 0); x.closePath(); x.fill()
  x.restore()
}
function mapRoute(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = '#9fd8a8'; x.fillRect(-162, -122, 324, 244)
  x.strokeStyle = '#ff6b5a'; x.lineWidth = 8; x.setLineDash([16, 12]); x.lineDashOffset = 0
  x.beginPath(); x.moveTo(-130, 80); x.bezierCurveTo(-40, -120, 40, 140, 130, -80); x.save(); x.setLineDash([16 * p, 12 * p + 0.01]); x.restore(); x.stroke(); x.setLineDash([])
  x.fillStyle = '#e23d4e'; for (const [a, b] of [[-130, 80], [130, -80]]) { x.beginPath(); x.arc(a, b - 20, 18, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(a - 15, b - 12); x.lineTo(a + 15, b - 12); x.lineTo(a, b + 10); x.fill() }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Books the next visit | *before you hang up.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TICKET, { G: GOLD, K: INK }, 790, 820, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      label(x, 790, 1080, 'BOOKED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: '#ff6b5a', font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Mails you | *your favourite snacks.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PARCEL, PARCEL_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'FRAGILE: COOKIES', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: '#9fd8a8', font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'gemini', cap: 'Ten memes a day. | *Minimum.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 850, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) * 2.5))
      for (let i = 0; i < n; i++) bubble(x, 790, 720 + i * 80, ['lol', 'LOOK', 'this is u', 'ha!!'][i], 1, { size: 32, tail: i % 2 ? 'br' : 'bl' })
      label(x, 790, 1150, 'MEMES: 10/10', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Falls asleep | *on the call. On purpose.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 850, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 760, 'CALL: 6 HRS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: SKYB, font: MONO, weight: 700 })
      bubble(x, 520, 620, 'zzz', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 46, col: LAV, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Sends a selfie | *every sunrise.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0 && lt < 1.3) { x.save(); x.fillStyle = 'rgba(255,250,235,0.5)'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 790, 1060, 'GOOD MORNING (ME)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Syncs both | *time zones.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      clock(x, 640, 760, pop01(t, P.t0 + 0.2, 0.3, 2), t, 0, 'HERE')
      clock(x, 860, 900, pop01(t, P.t0 + 0.5, 0.3, 2), t, 2.4, 'THERE')
      label(x, 760, 1130, 'BOTH: 9 PM CALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Movie night. | *Pressed play together.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      screen(x, 790, 800, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1040, '3… 2… 1… PLAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Writes letters. | *Real ones.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, ENV_C, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1060, 'PAGES: 9', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Turns the miles | *into a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      mapRoute(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), 1)
      label(x, 790, 1060, 'SNACKS PACKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Keeps a countdown | *to the next hug.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = Math.max(1, 41 - Math.floor(Math.max(0, lt - 0.4) * 26))
      label(x, 790, 820, `${d} DAYS`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 70, bg: '#9fd8a8', font: MONO, weight: 700, rot: -0.03 })
      bubble(x, 790, 1040, 'not that i’m counting', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Stargazes with you | *from two cities.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = ease.outCubic(prog(lt, 0.6, 1.4))
      if (k > 0.01) {
        x.save(); x.globalAlpha *= k; x.strokeStyle = GOLD; x.lineWidth = 4; x.setLineDash([10, 10])
        x.beginPath(); x.moveTo(640, 1000); x.lineTo(lerp(640, 790, p), lerp(1000, 620, p)); x.moveTo(940, 1000); x.lineTo(lerp(940, 790, p), lerp(1000, 620, p)); x.stroke(); x.setLineDash([]); x.restore()
        x.save(); x.globalAlpha *= k; x.fillStyle = INK; x.fillRect(600, 1000, 80, 60); x.fillRect(900, 1000, 80, 60); x.fillStyle = '#ffd88a'; x.fillRect(616, 1016, 18, 18); x.fillRect(916, 1016, 18, 18); x.restore()
      }
      sparkles(x, t, 790, 620, P.t0 + 1.1, 8, 90, 0.4)
      label(x, 790, 1150, 'SAME STAR ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries at hello. | *And at goodbye.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 850, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 760, lt < 1.2 ? 'hi!!' : 'bye!!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 1130, 'TISSUES: BOTH ENDS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0034', key: 'E', accent: PEACH, ending: 'group',
  title: 'How each sign does | *long distance.*',
  cameos: CAMEOS,
  group: {
    cap: 'Miles apart. | *Still aligned.*',
    draw(x, t, lt) { hearts(x, t, 540, 860, t - lt + 1.6, { n: 8, life: 2.4, spread: 600, cell: 8, seed: 11 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
