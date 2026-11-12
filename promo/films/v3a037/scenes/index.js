// v3a037: star_advice, ADVICE ROLL CALL, "How to comfort | each sign." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific "this is what helps" line each, one light gag per card.
//   0.0–3.6    "How to comfort | *each sign.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries: let them vent, then go for a run (sneakers) · Taurus: warm bread, quiet company (a loaf)
//              · Gemini: listen to all three versions (three bubbles) · Cancer: sit close, say "I'm here"
//              · Leo: remind them they're amazing (a gold "10" sticker: STILL A TEN) · Virgo: tidy up together (a broom)
//              · Libra: soft light, soft music (a lamp + notes) · Scorpio: keep the secret, forever (a locked diary)
//              · Sagittarius: a tiny getaway (a treasure map to PICNIC) · Capricorn: close the laptop for them (OFF)
//              · Aquarius: space, then a "saw this, thought of you" · Pisces (crying): cry with them, it helps
//  49.2        group ending: "Just show up. | *That’s the comfort.*"  the twelve group photo, hearts rising.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', CREAM = '#fff4e2'

const SHOE = [
  '......RRRR..',
  '.....RRWRR..',
  '....RRRWRRR.',
  '..RRRRRRRRRR',
  'RRRRRRRRRRRR',
  'WWWWWWWWWWWW',
]
const LOAF = [
  '..BBBBBBB...',
  '.BBbBBbBBB..',
  'BBBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const STAR = [
  '.....G.....',
  '....GGG....',
  '....GGG....',
  'GGGGGGGGGGG',
  '.GGGGGGGGG.',
  '..GGGGGGG..',
  '..GGG.GGG..',
  '.GG.....GG.',
]
function broom(x, t, cx, cy, k, sweep) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.35 + 0.25 * Math.sin(sweep * 10)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -260, 24, 260); x.fillStyle = WOOD; x.fillRect(-6, -254, 12, 248)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -10); x.lineTo(50, -10); x.lineTo(90, 110); x.lineTo(-90, 110); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(-42, -2); x.lineTo(42, -2); x.lineTo(80, 102); x.lineTo(-80, 102); x.closePath(); x.fill()
  x.fillStyle = '#d9a83a'; for (let i = -3; i <= 3; i++) x.fillRect(i * 22 - 2, 30, 4, 70)
  x.restore()
}
function lamp(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const g = x.createRadialGradient(0, -90, 10, 0, -90, 260); g.addColorStop(0, 'rgba(255,190,220,0.5)'); g.addColorStop(1, 'rgba(255,190,220,0)')
  x.fillStyle = g; x.fillRect(-260, -350, 520, 520)
  x.fillStyle = INK; x.fillRect(-10, -60, 20, 160); x.fillRect(-70, 90, 140, 24)
  x.beginPath(); x.moveTo(-100, -50); x.lineTo(100, -50); x.lineTo(66, -170); x.lineTo(-66, -170); x.closePath(); x.fill()
  x.fillStyle = '#ffc2d6'; x.beginPath(); x.moveTo(-90, -58); x.lineTo(90, -58); x.lineTo(60, -162); x.lineTo(-60, -162); x.closePath(); x.fill()
  x.restore()
}
function diary(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = '#7a1f3d'; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = CREAM; x.fillRect(122, -160, 14, 320)
  x.fillStyle = GOLD; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SECRETS', 0, -110)
  x.fillStyle = INK; x.fillRect(90, -40, 70, 90); x.fillStyle = GOLD; x.fillRect(96, -34, 58, 78); x.fillStyle = INK; x.fillRect(118, -4, 14, 26)
  x.restore()
}
function map(x, t, cx, cy, k, trace) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -150, 400, 300)
  x.fillStyle = '#f0dca8'; x.fillRect(-192, -142, 384, 284)
  x.fillStyle = '#9fd08a'; x.beginPath(); x.ellipse(-90, -40, 80, 50, 0.3, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(80, 60, 90, 50, -0.2, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.ellipse(110, -80, 50, 26, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath()
  const pts = [[-150, 100], [-90, 40], [-20, 70], [30, 10], [70, 50]]
  const n = Math.max(1, Math.floor(trace * pts.length))
  pts.slice(0, n).forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke(); x.setLineDash([])
  if (trace > 0.95) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(50, 30); x.lineTo(90, 70); x.moveTo(90, 30); x.lineTo(50, 70); x.stroke() }
  x.restore()
}
function laptop(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 60, 400, 34); x.fillStyle = '#9a9ab0'; x.fillRect(-192, 66, 384, 20)
  const h = lerp(230, 14, shut)
  x.fillStyle = INK; x.fillRect(-170, 60 - h, 340, h + 4)
  if (h > 40) { x.fillStyle = '#140c30'; x.fillRect(-158, 72 - h, 316, h - 24); x.fillStyle = 'rgba(239,230,214,0.35)'; for (let i = 0; i < Math.floor((h - 60) / 30); i++) x.fillRect(-140, 90 - h + i * 30, i % 2 ? 180 : 260, 12) }
  x.restore()
  if (shut > 0.9) label(x, cx, cy + 20 * k, 'OFF. REST.', 1, { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
}
function phoneMsg(x, cx, cy, k, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -190, 248, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = SKYB; x.fillRect(-92, -60, 184, 110)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  msg.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -24 + i * 36))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Let them vent. | *Then go run.*', mood: lt => lt > 1.3 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -220 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      bubble(x, 740, 650, 'AND ANOTHER | THING—', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 36, col: '#ffb3a0', tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      drawBits(x, SHOE, { R: RED, W: '#fff' }, 680, 990, 20 * k, { rot: -0.08 })
      drawBits(x, SHOE, { R: RED, W: '#fff' }, 830, 1010, 20 * k, { rot: 0.06 })
      label(x, 790, 760, 'FEELINGS: SPRINTED OFF', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Warm bread. | *Quiet company.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, LOAF, { B: '#d99a4e', b: '#f5d38a' }, 790, 940, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.6; x.fillStyle = '#fff'; x.fillRect(730 + i * 60 + 10 * Math.sin(ph * 8), 840 - ph * 150, 10, 30); x.restore() }
      label(x, 790, 1120, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Listen to | *all three versions.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 640, 'so basically…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 800, 'okay, also…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      bubble(x, 770, 960, 'wait, from the top', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      label(x, 790, 1120, 'HEARD ALL THREE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Sit close. | *Say “I’m here.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -150, s: 260 }, tears: lt => lt < 1.2 ? 1 : 0,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), sc = ease.inOutCubic(prog(lt, 0.4, 0.9))
      if (k > 0.01) signChar(x, t, 'taurus', lerp(880, 680, sc), 900, 220 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 760, 640, 'I’m here.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'br' })
      if (lt > 1.2) hearts(x, t, 560, 800, P.t0 + 1.2, { n: 5, life: 1.2, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Remind them | *they’re amazing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2.2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.12 * Math.sin(t * 2)); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2, r = i % 2 ? 150 : 170; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
        x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2, r = i % 2 ? 140 : 158; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
        x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('10', 0, 8)
        x.restore()
      }
      if (lt > 0.5) sparkles(x, t, 790, 860, P.t0 + 0.5, 8, 200, 0.1)
      label(x, 790, 1110, 'STILL A TEN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Tidy up | *together.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      broom(x, t, 800, 990, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      if (lt > 1.2) sparkles(x, t, 760, 1100, P.t0 + 1.2, 6, 120, 0.3)
      label(x, 790, 650, 'CALM, ALPHABETISED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Soft lighting. | *Softer music.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { lamp(x, t, 800, 1000, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      if (lt > 0.6) notes(x, t, 790, 760, { n: 5, cell: 9, col: PINK, alpha: clamp((lt - 0.6) * 3), seed: 4 })
      label(x, 790, 1140, 'AMBIENCE: HEALING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Keep the secret. | *Forever.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      diary(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'TAKEN TO THE GRAVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Plan a tiny | *getaway.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      map(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, clamp((lt - 0.5) / 0.9))
      label(x, 790, 1120, 'DESTINATION: PICNIC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Close the laptop. | *For them.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      laptop(x, 770, 960, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85, ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 650, 'WORK WILL WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Give space. | *Then send a meme.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phoneMsg(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'saw this, | thought of u')
      label(x, 790, 1110, 'PERFECT DISTANCE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry with them. | *It helps.*', mood: 'sparkle', star: { x: -150, s: 260 }, tears: 3,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 900, 220 * k, { mood: 'sparkle', look: [-1, 0], tears: 2, seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 640, 640, 'TEAM CRY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 640, 820, P.t0 + 1.4, { n: 5, life: 1.0, spread: 200, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3a037', key: 'E', accent: PINK, ending: 'group',
  title: 'How to comfort | *each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Just show up. | *That’s the comfort.*',
    moods: ['happy', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'sleepy', 'wink', 'sparkle', 'happy', 'heart', 'sparkle'],
    draw(x, t, lt) { hearts(x, t, 540, 1050, t - lt + 1.2, { n: 9, life: 3.0, spread: 760, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
