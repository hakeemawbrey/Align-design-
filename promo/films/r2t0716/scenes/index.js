// r2t0716: THE SIGNS AS… v3, "The signs | in a meeting." (signs3kit social cut, music: lofi · C). Ending: lesson.
// Twelve signs in one work meeting, each the most extreme version of itself.
//   ♈ pitched it, already launched it · ♉ only came for the snacks · ♊ forty side threads · ♋ meeting is now therapy
//   · ♌ one slide, three bows · ♍ notes on your notes · ♎ agreed with both sides · ♏ silent, solved the yogurt case
//   · ♐ joined from a mountain · ♑ booked a meeting about this meeting · ♒ move the office to the moon
//   · ♓ cried at the quarterly results (they were good)
//   group "Could've been | an email."   LESSON "Every voice in the room | makes it better."   last "Snacks next time? | Taurus insists."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#7dd3ff', ST = { x: -170 }

/** a laptop on a mountain top: screen shows the meeting, tiny peaks behind */
function summit(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#6b7aa8'; x.beginPath(); x.moveTo(-200, 170); x.lineTo(-40, -90); x.lineTo(60, 40); x.lineTo(120, -30); x.lineTo(210, 170); x.closePath(); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-72, -38); x.lineTo(-40, -90); x.lineTo(-8, -38); x.lineTo(-30, -48); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-200, 168, 410, 8)
  x.restore()
  bits(x, 'LAPTOP', cx + 10, cy + 40, 16 * k)
}
/** a little bar chart that climbs */
function bars(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 276)
  x.fillStyle = INK; x.fillRect(-166, -146, 332, 292)
  x.fillStyle = CREAM; x.fillRect(-158, -138, 316, 276)
  const g = ease.outCubic(clamp((lt - 0.3) / 1.0))
  const H = [60, 95, 130, 190]
  H.forEach((h, i) => { x.fillStyle = i === 3 ? '#5fd068' : STEEL; const hh = h * g; x.fillRect(-120 + i * 64, 110 - hh, 44, hh) })
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-130, 112); x.lineTo(136, 112); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pitched the idea. | *Already launched it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what if we…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 900, 'IDEA: 9:01', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, -0.04, 36)
      L(x, 790, 1040, 'LIVE: 9:02', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ff6b5a', 0.05, 42)
      sparkles(x, t, 790, 1040, P.t0 + 1.35, 8, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Only came | for the *snacks.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      L(x, 790, 640, 'AGENDA', pop01(t, P.t0 + 0.2, 0.3, 2), CREAM, -0.04, 34)
      const n = Math.max(0, 5 - Math.floor(clamp((lt - 0.9) / 1.2) * 5))
      for (let i = 0; i < 5; i++) if (i < n) bits(x, 'COOKIE', 680 + (i % 3) * 110, 830 + Math.floor(i / 3) * 120, 16 * pop01(t, P.t0 + 0.4 + i * 0.08, 0.3, 2))
      bubble(x, 790, 1100, 'any more?', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Started a side chat. | *Forty side chats.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 39)
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `THREADS: ${n}`, headCol: '#ffd23a', lines: [['lol did u see', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['omg', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['wait new chat', BONE, pop01(t, P.t0 + 1.1, 0.2, 2)], ['ok ok ok', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true]] })
    } },
  { sign: 'cancer', cap: 'Asked how everyone feels. | *Now it’s therapy.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 790, 650, lt, 1.0, 'Q3 BUDGET', 'FEELINGS CIRCLE', { size: 34, fromBg: STEEL, toBg: PINK })
      bits(x, 'TISSUE', 790, 880, 16 * pop01(t, P.t0 + 0.35, 0.3, 2))
      bubble(x, 790, 1090, 'and how is | your heart?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Presented one slide. | Took *three bows.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.9, 1.4, 1.9],
    front(x, t, lt, P) {
      sheet(x, 800, 790, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, head: 'SLIDE 1 OF 1', headBg: '#ffb34a', headInk: INK, lines: ['thank', 'you.'], size: 46 })
      const b = 1 + Math.floor(clamp((lt - 0.9) / 1.1) * 2.99)
      if (lt > 0.9) L(x, 800, 1060, `BOW #${b}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.05, 44)
      sparkles(x, t, 800, 790, P.t0 + 1.0, 7, 190, 0.6)
    } },
  { sign: 'virgo', cap: 'Took notes | on *your notes.*', mood: 'squint', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 320, h: 360, head: 'YOUR NOTES', headBg: STEEL, headInk: INK, lines: ['- budget', '- timline', '- lunch?'], size: 34, align: 'left' })
      if (lt > 0.9 && k > 0.9) {
        x.save(); x.translate(800, 860); x.rotate(-0.04)
        x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(-36, 4, 92, 30, 0, 0, Math.PI * 2 * clamp((lt - 0.9) / 0.4)); x.stroke()
        x.restore()
      }
      L(x, 800, 1110, 'TYPO: LINE 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Agreed with both sides. | *They disagreed.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCALE', 790, 870, 26 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: Math.sin(t * 2.4) * 0.12 })
      L(x, 680, 650, 'YES', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, -0.06, 38)
      L(x, 900, 650, 'ALSO YES', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.06, 38)
      bubble(x, 790, 1100, 'love both!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Silent all meeting. | Solved *the yogurt case.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.25, 0.3, 2), { w: 320, h: 300, head: 'WHO ATE IT?', headBg: '#c97bff', headInk: INK, lines: ['fridge cam: no', 'spoon: found', 'it was dave'], size: 30, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1080, 'CASE CLOSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.05, 40)
    } },
  { sign: 'sagittarius', cap: 'Joined the call | from *a mountain.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      summit(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 640, 'can you | hear me??', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Booked a meeting | about *this meeting.*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 280, head: 'NEW INVITE', headBg: '#9aa5c4', headInk: INK, lines: ['re: re: the', 'meeting', 'tues 9am'], size: 34 })
      L(x, 800, 1060, 'RECURRING: WEEKLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Suggested moving the office. | *To the moon.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 800, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1040, 'ALL IN FAVOR?', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#6fc3ff', -0.04, 38)
      for (let i = 0; i < 4; i++) drawPixelStar(x, 690 + i * 70, 640 + (i % 2) * 40, 22, 1, BONE)
    } },
  { sign: 'pisces', cap: 'Cried at the | *quarterly results.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bars(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1070, 'THEY WERE GOOD', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#5fd068', 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0716', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs | *in a meeting.*',
  cameos: CAMEOS,
  group: { cap: 'Could’ve been | *an email.*' },
  lesson: { text: 'Every voice in the room | makes it *better.*', chip: 'MEETING: ADJOURNED' },
  last: {
    text: 'Snacks next time? | *Taurus insists.*',
    draw(x, t, lt) { for (let i = 0; i < 5; i++) bits(x, 'COOKIE', 300 + i * 120, 1580 + (i % 2) * 30, 14 * pop01(t, t - lt + 0.6 + i * 0.1, 0.3, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
