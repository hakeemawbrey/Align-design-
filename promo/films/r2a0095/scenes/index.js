// r2a0095: star_advice, ADVICE ROLL CALL, "Each sign learning | to trust their gut." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific nudge per sign about trusting themselves, each with a light visual gag.
//   0.0–3.6    "Each sign learning | to *trust their gut.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each):
//              ♈ first instinct, usually right · ♉ feels off? you can leave (guilt-free exit) · ♊ ask fewer people, ask yourself
//              · ♋ that feeling in your chest is data · ♌ no applause needed to know you're right · ♍ stop researching, you know
//              (47 tabs closed) · ♎ flip a coin, notice what you hope for · ♏ your radar is good, let it rest · ♐ your gut said go: go
//              · ♑ not everything needs a five-year plan · ♒ your weird idea? trust it · ♓ your feelings are a compass
//  49.2        ending 'group': "Your gut | *knows the way.*"  The twelve in the group photo, a compass above them.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e', GREEN = '#2fc79a'

// ── props
const BOLT = [
  '....YYY',
  '...YYY.',
  '..YYY..',
  '.YYYYYY',
  '...YYY.',
  '..YYY..',
  '.YY....',
  'YY.....',
]
const DOOR = [
  'KKKKKKKK',
  'KDDDDDDK',
  'KDddddDK',
  'KDddddDK',
  'KDDDDDDK',
  'KDDDDYDK',
  'KDddddDK',
  'KDddddDK',
  'KDDDDDDK',
  'KDDDDDDK',
]
const DOOR_C = { K: INK, D: '#8a4a2e', d: '#a5643a', Y: GOLD }
const BULB = [
  '..YYYY..',
  '.YYWYYY.',
  'YYWYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..GGGG..',
  '..GGGG..',
  '...GG...',
]
const BULB_C = { Y: '#ffd23a', W: '#ffffff', G: '#9aa5c4' }
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'OOOOOOOOOO',
  'OOWOOOOWOO',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  'OOWOOOOWOO',
  'OOOOOOOOOO',
]
const SUITCASE_C = { K: INK, O: '#ff9a4a', W: '#ffffff' }

/** a compass whose needle settles on `target` (radians) and is heart-tipped if heart */
function compass(x, t, cx, cy, r, k, lt, { heart = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, r + 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 ${Math.round(r * 0.28)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -r * 0.72); x.fillText('S', 0, r * 0.72); x.fillText('E', r * 0.72, 0); x.fillText('W', -r * 0.72, 0)
  const settle = prog(lt, 0.3, 1.5), a = (1 - settle) * 3.5 * Math.sin(lt * 9) - 0.0
  x.rotate(a)
  x.fillStyle = heart ? PINK : RED; x.beginPath(); x.moveTo(0, -r * 0.6); x.lineTo(r * 0.12, 0); x.lineTo(-r * 0.12, 0); x.closePath(); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.moveTo(0, r * 0.6); x.lineTo(r * 0.12, 0); x.lineTo(-r * 0.12, 0); x.closePath(); x.fill()
  if (heart) { x.fillStyle = PINK; x.beginPath(); x.arc(-r * 0.07, -r * 0.62, r * 0.09, 0, Math.PI * 2); x.arc(r * 0.07, -r * 0.62, r * 0.09, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.08, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a radar screen with a sweep */
function radar(x, t, cx, cy, r, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0c2a1e'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = 'rgba(125,255,176,0.35)'; x.lineWidth = 3
  for (const rr of [r * 0.33, r * 0.66]) { x.beginPath(); x.arc(0, 0, rr, 0, Math.PI * 2); x.stroke() }
  x.beginPath(); x.moveTo(-r, 0); x.lineTo(r, 0); x.moveTo(0, -r); x.lineTo(0, r); x.stroke()
  const speed = lt < 1.2 ? 6 : lerp(6, 0.6, prog(lt, 1.2, 1.8)), a = t * speed
  x.fillStyle = 'rgba(125,255,176,0.35)'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, a - 0.6, a); x.closePath(); x.fill()
  x.fillStyle = MINT; for (const [bx, by] of [[0.4, -0.3], [-0.5, 0.2], [0.2, 0.55]]) x.fillRect(bx * r - 6, by * r - 6, 12, 12)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Your first instinct? | *Usually right.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, BOLT, { Y: GOLD }, 790, 780, 26 * pop01(t, P.t0 + 0.3, 0.3, 2.4), { rot: 0.1 })
      label(x, 790, 1040, 'GUT: FAST & SMART', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 780, P.t0 + 0.6, 8, 150, 0.2)
    } },
  { sign: 'taurus', cap: 'Something feels off? | *You can leave.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 870, 34 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'EXIT', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'GUILT: NOT REQUIRED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked twelve people? | *Ask yourself.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const OP = ['do it!', 'no way', 'maybe?', 'ask mom', 'sleep on it', 'YES', 'hmm', 'ugh, no']
      const fade = 1 - prog(lt, 1.2, 1.5)
      OP.forEach((o, i) => { if (fade > 0.01) bubble(x, 660 + (i % 2) * 230, 620 + Math.floor(i / 2) * 120, o, pop01(t, P.t0 + 0.15 + i * 0.08, 0.25, 2.2) * fade, { size: 28, col: [PINK, SKYB, LAV, MINT][i % 4], tail: i % 2 ? 'br' : 'bl' }) })
      bubble(x, 790, 860, 'what do I want?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, col: '#ffd23a', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'That feeling in your chest? | *That’s data.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -160, 280, 320); x.fillStyle = CREAM; x.fillRect(-132, -152, 264, 304)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('READINGS', 0, -116)
        x.strokeStyle = PINK; x.lineWidth = 7; x.beginPath()
        for (let i = 0; i <= 24; i++) { const px = -110 + i * 9.2, beat = (i % 8 === 4) ? -70 : (i % 8 === 5) ? 40 : 0; i ? x.lineTo(px, 10 + beat * clamp((lt - 0.4) * 2)) : x.moveTo(px, 10) }
        x.stroke(); x.restore()
      }
      label(x, 800, 1080, 'DATA: VALID', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'No applause needed | *to know you’re right.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const cx = 640 + (i % 3) * 120, cy = 940 + Math.floor(i / 3) * 110, k = pop01(t, P.t0 + 0.15 + i * 0.06, 0.25, 2)
        if (k <= 0.01) continue
        x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-46, -40, 92, 80); x.fillStyle = RED; x.fillRect(-40, -34, 80, 30); x.fillRect(-40, 4, 80, 20); x.restore()
      }
      label(x, 790, 700, 'AUDIENCE: 0', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 800, 'CONFIDENCE: FULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Stop researching. | *You already know.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.max(0, 47 - Math.floor(clamp((lt - 0.8) / 0.9) * 47))
      for (let i = 0; i < Math.min(8, Math.ceil(n / 6)); i++) {
        x.fillStyle = INK; x.fillRect(640 + i * 36, 640 + i * 4, 120, 48); x.fillStyle = [SKYB, LAV, PINK, MINT][i % 4]; x.fillRect(644 + i * 36, 644 + i * 4, 112, 40)
      }
      label(x, 790, 860, `TABS OPEN: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 34, bg: n ? '#ffd23a' : MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1050, 'yeah. I knew.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Flip a coin. | *Notice what you hope for.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const up = prog(lt, 0.3, 1.6), y = 900 - Math.sin(Math.PI * up) * 260, sq = up < 1 ? Math.abs(Math.cos(lt * 14)) : 1
      x.save(); x.translate(800, y); x.scale(Math.max(0.12, sq), 1)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 51, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#c98f2a'; x.beginPath(); x.arc(0, 0, 36, 0, Math.PI * 2); x.fill(); x.restore()
      bubble(x, 520, 620, 'please be | “text back”', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
      label(x, 800, 1110, 'ANSWER: FOUND', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Your radar is good. | *Let it rest sometimes.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      radar(x, t, 800, 820, 150, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1060, lt > 1.6 ? 'RADAR: NAPPING' : 'SCANNING…', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Your gut said go. | *So go.*', mood: 'sparkle', star: { x: 170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 300, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(300, 720); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-10, 0, 20, 160); x.fillStyle = WOOD; x.fillRect(-6, 0, 12, 160)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -50); x.lineTo(110, -50); x.lineTo(150, 0); x.lineTo(110, 50); x.lineTo(-130, 50); x.closePath(); x.fill()
        x.fillStyle = GREEN; x.beginPath(); x.moveTo(-122, -42); x.lineTo(106, -42); x.lineTo(138, 0); x.lineTo(106, 42); x.lineTo(-122, 42); x.closePath(); x.fill()
        x.fillStyle = '#ffffff'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WAY', 0, 2)
        x.restore()
      }
      label(x, 300, 1140, 'BAGS: PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Not everything needs | *a five-year plan.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), un = ease.inOutCubic(prog(lt, 0.3, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(300, 620); x.scale(k, k)
        const h = 80 + 470 * un
        x.fillStyle = INK; x.fillRect(-130, 0, 260, h + 8); x.fillStyle = CREAM; x.fillRect(-122, 4, 244, h)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < Math.floor(h / 40); i++) x.fillRect(-100, 30 + i * 40, 160 + (i % 3) * 20, 8)
        x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillText('THE PLAN (vol. 1)', 0, 22)
        x.fillStyle = WOOD; x.fillRect(-140, -10, 280, 20); x.fillRect(-140, h, 280, 20)
        x.restore()
      }
      label(x, 300, 860, 'GUT: ALSO A PLAN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird idea? | *Trust it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 0.8
      drawBits(x, BULB, on ? BULB_C : { Y: '#5b5480', W: '#7a7299', G: '#9aa5c4' }, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) sparkles(x, t, 800, 740, P.t0 + 0.8, 8, 160, 0.3)
      label(x, 800, 1020, 'IDEA: A STAR-SIGN PICNIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1120, 'STATUS: GENIUS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Your feelings | *are a compass.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 2 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      compass(x, t, 800, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), lt, { heart: true })
      label(x, 800, 1060, 'DIRECTION: HOME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0095', key: 'G', accent: MINT, ending: 'group',
  title: 'Each sign learning | to *trust their gut.*',
  cameos: CAMEOS,
  group: {
    cap: 'Your gut | *knows the way.*',
    draw(x, t, lt) {
      const t0 = t - lt
      compass(x, t, 540, 640, 110, pop01(t, t0 + 1.3, 0.35, 2), lt - 1.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
