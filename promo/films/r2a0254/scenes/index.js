// r2a0254: star_advice, ADVICE ROLLCALL, "A love note | to each sign." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific line for each, with one light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ you go first so we feel brave · ♉ you make anywhere feel like home · ♊ your stories save boring days
//              · ♋ you remember how everyone takes their tea · ♌ your joy is contagious · ♍ you notice the little things
//              · ♎ you make peace look easy · ♏ your promises are real · ♐ you make the world feel bigger
//              · ♑ you keep showing up, we see you · ♒ you love people exactly as they are · ♓ your soft heart is a superpower
//  49.2        "Twelve signs. | *All loved.*"  the group photo, with a love letter.
//  52.4        LESSON: "Every sign deserves | a little *love note.*"  STATUS: DELIVERED
//  58.3        "Tag the sign | *you love most.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'

const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// a little envelope with a heart seal
function envelope(x, cx, cy, k, open = 0, { rot = -0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -84, 260, 168); x.fillStyle = CREAM; x.fillRect(-122, -76, 244, 152)
  x.fillStyle = '#e8dcc6'; x.beginPath(); x.moveTo(-122, 76); x.lineTo(0, -6); x.lineTo(122, 76); x.fill()
  x.save(); x.translate(0, -76); x.scale(1, 1 - 2 * open)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-126, 0); x.lineTo(0, 92); x.lineTo(126, 0); x.fill(); x.fillStyle = '#f2e8d4'; x.beginPath(); x.moveTo(-116, 0); x.lineTo(0, 84); x.lineTo(116, 0); x.fill()
  x.restore()
  if (open < 0.3) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 6, 6)
  x.restore()
}
function door(x, cx, cy, k, open, sign) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -200, 220, 400); x.fillStyle = '#ffe7a8'; x.fillRect(-100, -190, 200, 390)
  x.save(); x.translate(-100, 0); x.scale(1 - 0.8 * open, 1)
  x.fillStyle = WOOD; x.fillRect(0, -190, 200, 390); x.fillStyle = '#a8731f'; x.fillRect(20, -170, 160, 150); x.fillRect(20, 10, 160, 160); x.fillStyle = INK; x.fillRect(170, 0, 14, 14)
  x.restore()
  if (sign) { x.fillStyle = INK; x.fillRect(-90, -260, 180, 50); x.fillStyle = MINT; x.fillRect(-84, -254, 168, 38); txt(x, sign, 0, -235, 22, INK, MONO, 700) }
  x.restore()
}
function teacup(x, t, cx, cy, k, tag, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(56, -4, 24, -1.3, 1.3); x.stroke()
  x.strokeStyle = col; x.lineWidth = 6; x.beginPath(); x.arc(56, -4, 24, -1.3, 1.3); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-64, -46); x.lineTo(64, -46); x.lineTo(48, 44); x.lineTo(-48, 44); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-56, -40); x.lineTo(56, -40); x.lineTo(42, 38); x.lineTo(-42, 38); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-80, 44, 160, 12)
  x.fillStyle = CREAM; x.fillRect(-48, 70, 96, 30); txt(x, tag, 0, 86, 18, INK, MONO, 700)
  for (let i = 0; i < 2; i++) { const ph = (t * 0.8 + i / 2) % 1; x.fillStyle = `rgba(255,255,255,${0.45 * Math.sin(Math.PI * ph)})`; x.fillRect(-16 + i * 24, -60 - ph * 50, 8, 20) }
  x.restore()
}
function scales(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const tilt = Math.sin(Math.max(0, 1 - lt) * 9) * 0.3 * Math.max(0, 1 - lt)
  x.fillStyle = INK; x.fillRect(-8, -150, 16, 260); x.fillRect(-80, 100, 160, 22)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillRect(-170, -6, 340, 12)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 160, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 94, 64, 16, 0, 0, Math.PI); x.fill(); x.fillRect(-64, 88, 128, 8)
    x.fillStyle = WOOD; x.beginPath(); x.arc(0, 78, 26, 0, 7); x.fill(); x.fillStyle = '#7a4a2e'; for (const [a, b] of [[-8, 70], [8, 84], [10, 66]]) x.fillRect(a, b, 6, 6)
    x.restore()
  }
  x.restore(); x.restore()
}
function globe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill(); x.fillStyle = '#3f8ee0'; x.beginPath(); x.arc(0, 0, 120, 0, 7); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 120, 0, 7); x.clip()
  const off = (t * 40) % 240
  x.fillStyle = '#5cc46e'; for (const [a, b, w, h] of [[-80, -50, 90, 60], [30, -20, 70, 90], [-40, 50, 60, 40], [110, 40, 60, 50]]) { x.fillRect(a - off, b, w, h); x.fillRect(a - off + 240, b, w, h) }
  x.restore()
  const stick = [[-60, -80, GOLD], [70, -60, PINK], [-90, 40, MINT], [40, 80, LAV]]
  stick.forEach(([a, b, c]) => { x.fillStyle = INK; x.fillRect(a - 16, b - 12, 32, 24); x.fillStyle = c; x.fillRect(a - 12, b - 8, 24, 16) })
  x.restore()
}
const CAPE = (x, F, t, col) => {
  x.save(); x.translate(F.x, F.cy - 20)
  const fl = Math.sin(t * 6) * 16
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -30); x.lineTo(70, -30); x.lineTo(150, 170 + fl); x.lineTo(-150, 170 - fl); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-62, -24); x.lineTo(62, -24); x.lineTo(138, 160 + fl); x.lineTo(-138, 160 - fl); x.closePath(); x.fill()
  x.restore()
}
const MAG = ['..KKKK...', '.KWWWWK..', 'KWWWWWWK.', 'KWWWWWWK.', 'KWWWWWWK.', 'KWWWWWWK.', '.KWWWWK..', '..KKKKK..', '......KK.', '.......KK', '........K']

const CAMEOS = [
  { sign: 'aries', cap: 'You go first, | so *we feel brave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      door(x, 790, 920, 0.9 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.6, 1.0)), 'AFTER YOU')
      label(x, 790, 1150, '(JK. ME FIRST.)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#f0603a', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You make anywhere | feel *like home.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -160, y: 40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(470, 1020); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.roundRect(-260, -70, 520, 150, 50); x.fill(); x.fillStyle = '#c96a4a'; x.beginPath(); x.roundRect(-250, -60, 500, 130, 44); x.fill(); x.fillStyle = '#e8906a'; x.fillRect(-200, -60, 60, 130); x.fillRect(-60, -60, 60, 130); x.fillRect(80, -60, 60, 130); x.restore() }
    },
    front(x, t, lt, P) { label(x, 800, 650, 'COSY LEVEL: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: '#e9b24a', rot: 0.04, font: MONO, weight: 700 }) } },
  { sign: 'gemini', cap: 'Your stories | save *boring days.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'okay so you will NOT', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'virgo', 720, 1000, 140 * k, { mood: lt > 1.2 ? 'wide' : 'neutral', look: [-1, 0], seed: 31, glyph: false }); signChar(x, t, 'capricorn', 880, 980, 140 * k, { mood: lt > 1.3 ? 'happy' : 'sleepy', look: [-1, 0], seed: 32, glyph: false, zzz: false }) }
      label(x, 790, 1150, 'BOREDOM: CURED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#f2cf4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You remember how | *everyone takes their tea.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      teacup(x, t, 690, 740, pop01(t, P.t0 + 0.2, 0.3, 2), 'MILK, 2', PINK)
      teacup(x, t, 880, 800, pop01(t, P.t0 + 0.45, 0.3, 2), 'NO SUGAR', MINT)
      teacup(x, t, 720, 1000, pop01(t, P.t0 + 0.7, 0.3, 2), 'HONEY', GOLD)
      teacup(x, t, 900, 1060, pop01(t, P.t0 + 0.95, 0.3, 2), 'JUST HOT', LAV)
    } },
  { sign: 'leo', cap: 'Your joy | is *contagious.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const ids = ['virgo', 'scorpio', 'capricorn']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), on = lt > 0.8 + i * 0.25; if (k > 0.01) signChar(x, t, id, 680 + i * 120, 1000 - (i % 2) * 70, 130 * k, { mood: on ? 'sparkle' : 'neutral', seed: 40 + i, glyph: false, hops: on ? [P.t0 + 0.8 + i * 0.25 + 0.05] : [] }); if (on) sparkles(x, t, 680 + i * 120, 1000 - (i % 2) * 70, P.t0 + 0.8 + i * 0.25, 6, 80, i) })
      label(x, 790, 660, 'SPREADING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#f39a3a', rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'You notice | the *little things.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const m = ease.inOutCubic(prog(lt, 0.4, 1.1))
      const mx = lerp(900, 790, m), my = lerp(700, 880, m)
      drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ef5c94' }, 790, 880, 5 * k)
      if (m > 0.6) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ef5c94' }, 790, 880, 16)
      drawBits(x, MAG, { K: INK, W: 'rgba(220,240,255,0.35)' }, mx + 30, my + 30, 22 * k)
      label(x, 790, 1130, 'NOTICED. THANK YOU.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: '#ef5c94', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You make peace | look *easy.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      scales(x, t, 740, 950, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 650, 'ONE COOKIE EACH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: '#e163d6', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Your promises | are *real.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'pinky promise.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 44, tail: 'bl' })
      label(x, 790, 960, 'KEPT: ALWAYS', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 40, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 420, 760, P.t0 + 1.25, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'sagittarius', cap: 'You make the world | *feel bigger.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      globe(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2) * lerp(0.8, 1.15, ease.outCubic(prog(lt, 0.6, 1.4))))
      label(x, 790, 1140, 'TRIP 1 OF 100', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You keep showing up. | *We see you.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      // attendance card: every day ticked
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-152, -142, 304, 284)
        x.fillStyle = '#2fc79a'; x.fillRect(-152, -142, 304, 50); txt(x, 'SHOWED UP', 0, -117, 26, INK, MONO, 700)
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 20)
        for (let i = 0; i < 20; i++) { const c = i % 5, r = Math.floor(i / 5), px = -110 + c * 55, py = -50 + r * 50; x.fillStyle = '#d8d0c0'; x.fillRect(px - 18, py - 18, 36, 36); if (i < n) txt(x, '✓', px, py + 2, 34, '#1f8a6a', INTER, 800) }
        x.restore()
      }
      label(x, 790, 1130, 'SEEN.', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'You love people | *exactly as they are.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      door(x, 790, 960, 0.8 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.7, 1.1)), 'ALL WELCOME')
      const k = clamp((lt - 0.9) * 3)
      if (k > 0.01) ['aries', 'virgo', 'pisces'].forEach((id, i) => signChar(x, t, id, 730 + i * 60, 1020 - (i % 2) * 30, 90 * k, { mood: 'happy', seed: 60 + i, glyph: false, tears: id === 'pisces' ? 2 : 0 }))
    } },
  { sign: 'pisces', cap: 'Your soft heart | is a *superpower.*', mood: 'heart', tears: 2, look: [0, 0], star: { x: 0, y: 10 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { if (lt > 0.5) CAPE(x, F, t, '#ff6a9a') },
    front(x, t, lt, P) {
      label(x, 540, 640, 'SUPER FEELER', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 40, bg: '#7c74f0', color: CREAM, rot: -0.04 })
      hearts(x, t, 540, 860, P.t0 + 1.2, { n: 8, life: 2.0, spread: 520, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0254', key: 'E', accent: ROSE, ending: 'lesson',
  title: 'A love note | *to each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *All so loved.*',
    moods: Array(12).fill('heart'),
    draw(x, t, lt) { envelope(x, 540, 770, 0.8 * pop01(t, t - lt + 1.4, 0.35, 2), ease.outCubic(prog(lt, 1.9, 2.3))); hearts(x, t, 540, 740, t - lt + 2.2, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 8 }) },
  },
  lesson: { text: 'Every sign deserves | a little *love note.*', chip: 'STATUS: DELIVERED' },
  last: { text: 'Tag the sign | *you love most.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
