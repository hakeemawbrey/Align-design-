// r2t0550: star_talk, BELIKE, "Curtains opened? | *Zodiacs be like.*" (signs3kit social cut, music: lofi · F).
// Topic: zodiacs when someone opens the curtains. Twelve signs in zodiac order, each the most extreme morning reaction.
// Ending: lesson.
//   ♈ already outside running · ♉ closed them again · ♊ already texting their match · ♋ made everyone breakfast in bed
//   · ♌ thought it was their spotlight · ♍ re-opened them evenly · ♎ wants more flattering light · ♏ glared at the sun
//   until it left · ♐ saw daylight, packed a bag · ♑ up since four, already working · ♒ chart says "not a morning sign"
//   · ♓ a bird sang, cried
//   group "Good morning. | *Allegedly.*"  lesson "Everyone wakes up | *at their own pace.*"  MORNING: SOFT
//   last "And Taurus? | *Still asleep.*"
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, zzz, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe27a', ST = { x: -160 }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const BIRD = ['..BB....', '.BBWB...', 'BBBBBBO.', '.BBBBB..', '..BBBB..', '...K.K..']
/** a window with curtains; open 0 = closed, 1 = wide open */
function curtains(x, t, cx, cy, k, open, { w = 280, h = 260, sun = true, cloud = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#9fd8ff'; x.fillRect(-w / 2, -h / 2, w, h)
  if (sun) drawBits(x, SUN, { Y: GOLD }, 40, -40, 14)
  if (cloud > 0) bits(x, 'CLOUD', lerp(-200, 40, cloud), -40, 12)
  x.fillStyle = INK; x.fillRect(-4, -h / 2, 8, h); x.fillRect(-w / 2, -4, w, 8)
  const cw = (w / 2 + 14) * (1 - 0.8 * clamp(open))
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? -w / 2 - 14 : w / 2 + 14 - cw
    x.fillStyle = INK; x.fillRect(x0 - 4, -h / 2 - 24, cw + 8, h + 40)
    x.fillStyle = '#ff8fb1'; x.fillRect(x0, -h / 2 - 20, cw, h + 32)
    x.fillStyle = '#e06b92'; for (let i = 1; i < 4; i++) x.fillRect(x0 + cw * i / 4 - 3, -h / 2 - 20, 6, h + 32)
  }
  x.fillStyle = INK; x.fillRect(-w / 2 - 30, -h / 2 - 34, w + 60, 14)
  x.restore()
}
/** a light beam from the top right */
function beam(x, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a * 0.35; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(960, 480); x.lineTo(1000, 480); x.lineTo(560, 1180); x.lineTo(200, 1180); x.closePath(); x.fill(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Already outside. | *Running.*', mood: 'sparkle', look: [1, 0], star: { x: -160 + 0 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      curtains(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.3, 0.9)))
      L(x, 800, 1080, 'LAP 7. GOOD MORNING!', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Closed them again. | *Back to bed.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P) {
      curtains(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 1 - ease.inOutCubic(prog(lt, 0.6, 1.1)))
      beam(x, 1 - ease.inOutCubic(prog(lt, 0.6, 1.1)))
      if (lt > 1.1) zzz(x, t, 470, 740, { alpha: clamp((lt - 1.1) * 3), size: 46 })
      L(x, 800, 1080, 'SNOOZE: 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Eyes shut. | *Texting their match.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: GOLD, lines: [['gm!!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['also one', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true], ['more thing', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2), true], ['and ANOTHER', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]], size: 22 })
    } },
  { sign: 'cancer', cap: 'Made everyone | *breakfast in bed.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 760, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 900, 900, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1080, 'SERVED BY 6:30', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Light hit them. | *“Thank you, thank you.”*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.1, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      beam(x, ease.outCubic(prog(lt, 0.2, 0.6)))
      sparkles(x, t, 380, 880, P.t0 + 0.7, 8, 210, 0.2)
      L(x, 800, 1080, 'SPOTLIGHT: FOUND', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Re-opened them. | *More evenly.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const o = lt < 1.0 ? 0.55 + 0.25 * Math.sin(lt * 9) : 0.75
      curtains(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), o)
      L(x, 800, 1080, 'SYMMETRICAL ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Requested | *more flattering light.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'GOLDEN HOUR ONLY', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Glared at the sun | *until it left.*', mood: 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      curtains(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 1, { cloud: ease.inOutCubic(prog(lt, 0.8, 1.6)) })
      L(x, 800, 1080, 'SUN: INTIMIDATED', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Saw daylight. | *Packed a bag.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 6) })
      L(x, 800, 1080, 'BACK IN A MONTH', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Up since four. | *Already at work.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'INBOX: ZERO', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Checked their chart: | *“not a morning sign.”*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1060, 'MOON SAYS: NAP', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'A bird sang. | Pisces *wept.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', look: [1, 0], tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, BIRD, { B: SKYB, W: '#ffffff', O: '#ffb34a', K: INK }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 8) })
      if (lt > 0.4) notes(x, t, 820, 760, { n: 4, cell: 7, col: GOLD, alpha: clamp((lt - 0.4) * 3), seed: 3 })
      L(x, 800, 1080, 'SO. MOVING.', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0550', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Curtains opened? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Good morning. | *Allegedly.*', moods: ['sparkle', 'sleepy', 'sleepy', 'heart', 'sparkle', 'squint', 'wink', 'squint', 'sparkle', 'neutral', 'sleepy', 'happy'] },
  lesson: { text: 'Everyone wakes up | *at their own pace.*', chip: 'MORNING: SOFT' },
  last: {
    text: 'And Taurus? | *Still asleep.*',
    draw(x, t, lt) { zzz(x, t, 330, 1000, { alpha: clamp(lt * 2), size: 54 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
