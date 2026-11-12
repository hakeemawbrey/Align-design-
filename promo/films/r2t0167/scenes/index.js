// r2t0167: THE SIGNS AS… v3, BELIKE, "Laughing at the | wrong time be like." (~57 s vertical, signs3kit social cut,
// music: lofi · E). Topic: "Zodiacs when they laugh at the wrong moment be like."
//   0.0–3.6    "Laughing at the | wrong time *be like.*"
//   3.6–49.2   ♈ laughed in the library, lifetime ban · ♉ laughed mid-bite, cake everywhere · ♊ remembered a joke from
//              three weeks ago (mid-meeting) · ♋ laughed, cried, apologised to the room · ♌ laughed at their own joke
//              before the punchline (first date) · ♍ spotted a typo in the wedding vows · ♎ ruined the group photo,
//              still looked great · ♏ laughed with zero sound, just vibrating · ♐ tripped on stage, laughed for an
//              hour · ♑ finally laughed, at a spreadsheet · ♒ read their own birth chart, couldn't stop · ♓ laughed at
//              the sad movie, then flooded
//  49.2        "Twelve laughs. | *Zero timing.*"
//  52.6        callback: "Scorpio’s still | *vibrating.*"  Scorpio comes back, shaking silently. SOUND: STILL 0
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }
const CAKE = ['....R....', '...WWW...', '.PPPPPPP.', 'WWWWWWWWW', 'PPPPPPPPP', 'BBBBBBBBB', 'BBBBBBBBB']
const CAKE_C = { R: RED, W: CREAM, P: PINK, B: '#c4782e' }
const POPCORN = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', '.RWRWR.']

/** short shake lines either side of (cx, cy) */
function shake(x, t, cx, cy, w, k = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k; x.fillStyle = BONE
  for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { const j = Math.sin(t * 40 + i) * 4; x.fillRect(cx + d * (w + 16 + i * 4) + j - 4, cy - 50 + i * 40, 8, 26) }
  x.restore()
}
/** a laughing "HA" that floats up (or doesn't, for Scorpio) */
function has(x, t, cx, cy, t0, { n = 3, col = GOLD, size = 40 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t - t0) * 0.8 + i / n) % 1
    if (t < t0) continue
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.translate(cx + Math.sin(i * 2.4) * 60, cy - ph * 160); x.rotate(Math.sin(i * 1.9) * 0.2)
    txt(x, 'HA', 0, 0, { size, color: col }); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Laughed in the library. | *Lifetime ban.*', mood: lt => lt > 1.3 ? 'wide' : 'wink', star: ST, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      card(x, 790, 720, 260, 110, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: -0.04 }, () => txt(x, 'QUIET PLEASE', 0, 2, { size: 30, font: MONO, weight: 700 }))
      if (lt < 1.4) has(x, t, F.x + 60, F.top - 20, P.t0 + 0.3, { col: '#ff6b5a', size: 52 })
      label(x, 790, 1020, 'BANNED: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Laughed mid-bite. | *Cake everywhere.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 810, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = prog(lt, 0.9, 1.8)
      if (p > 0) for (let i = 0; i < 16; i++) { const a = i * 0.39 - 0.4, r = 60 + p * (180 + (i % 4) * 40); x.fillStyle = i % 3 ? CREAM : PINK; x.fillRect(560 + Math.cos(a) * r, 860 - Math.sin(a) * r * 0.7 + p * p * 120, 16, 16) }
      bubble(x, 790, 640, 'pfffft—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Remembered a joke | *from three weeks ago.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      label(x, 790, 680, 'MEETING: SERIOUS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'sorry, it’s just | the DUCK thing', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.0) has(x, t, F.x, F.top - 10, P.t0 + 1.0, { col: GOLD })
      label(x, 790, 1080, 'CONTEXT: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Laughed. Cried. | *Apologised to the room.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', tears: lt => lt > 0.8 ? 2 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'SORRY! | sorry. haha.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl', col: PINK })
      label(x, 790, 1000, 'SORRIES: 14', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Laughed at their own joke | *before the punchline.*', mood: lt => lt > 0.9 ? 'squint' : 'sparkle', star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P, F) {
      label(x, 790, 640, '✦ FIRST DATE', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 820, lt < 1.0 ? 'so a horse | walks in—' : 'HAHAHA', pop01(t, P.t0 + (lt < 1.0 ? 0.35 : 1.0), 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 1040, 130 * k, { mood: 'neutral', look: [-1, 0], seed: 15, glyph: false })
    } },
  { sign: 'virgo', cap: 'Spotted a typo | *in the wedding vows.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'my vows', 0, -80, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'i will always', 0, -20, { size: 32 }); txt(x, 'love yuo', 0, 34, { size: 36 })
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(52, 34, 62, 30, 0, 0, Math.PI * 2 * clamp((lt - 0.9) / 0.4)); x.stroke() }
      })
      bubble(x, 790, 620, 'hehe. YUO.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Ruined the group photo. | *Still looked great.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', rot: -0.04 }, () => {
        ['taurus', 'cancer', 'virgo'].forEach((id, i) => signChar(x, t, id, -100 + i * 100, 10, 80, { mood: 'neutral', seed: 30 + i, glyph: false }))
        signChar(x, t, 'libra', 0, -70, 90, { mood: 'squint', seed: 34, glyph: false })
      })
      label(x, 790, 1100, 'STILL: ICONIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Laughed with zero sound. | *Just vibrating.*', mood: 'squint', squash: lt => 0.05 * Math.sin(lt * 60), star: ST,
    front(x, t, lt, P, F) {
      shake(x, t, F.x, F.cy, F.S * 0.5, clamp((lt - 0.3) * 3))
      label(x, 800, 760, 'SOUND: 0', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1000, '…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 60, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tripped on stage. | *Laughed for an hour.*', mood: 'squint', star: { x: -150, y: 40 }, look: [0, 1],
    front(x, t, lt, P, F) {
      x.fillStyle = WOOD; x.fillRect(220, 1080, 640, 26); x.fillStyle = INK; x.fillRect(220, 1106, 640, 8)
      label(x, 790, 680, 'ON STAGE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 0.6) has(x, t, F.x + 40, F.top, P.t0 + 0.6, { col: '#c97bff', n: 4 })
      const n = Math.min(60, Math.floor(prog(lt, 0.8, 2.3) * 60))
      label(x, 790, 900, `HA × ${n} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Finally laughed. | *At a spreadsheet.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 270, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#e8f5e0', rot: 0.03 }, () => {
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 3
        for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(-170, -135 + i * 67); x.lineTo(170, -135 + i * 67); x.stroke() }
        for (let i = 0; i <= 3; i++) { x.beginPath(); x.moveTo(-170 + i * 113, -135); x.lineTo(-170 + i * 113, 135); x.stroke() }
        txt(x, 'Q3', -113, -100, { size: 26, font: MONO, weight: 700 }); txt(x, 'Q4', 0, -100, { size: 26, font: MONO, weight: 700 })
        if (lt > 0.8) { x.fillStyle = '#fff1b0'; x.fillRect(-56, -33, 112, 67); txt(x, 'LOL', 0, 2, { size: 34, font: MONO, weight: 700, color: RED }) }
      })
      label(x, 790, 1110, 'FIRST LAUGH: 2026', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Read their own birth chart. | *Couldn’t stop.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P, F) {
      chart(x, 800, 860, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.6)
      if (lt > 0.7) has(x, t, F.x, F.top - 10, P.t0 + 0.7, { col: SKYB })
      label(x, 800, 1080, '“very normal”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Laughed at the sad movie. | Then *flooded.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', tears: lt => lt > 1.2 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POPCORN, { W: CREAM, R: RED }, 820, 970, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, lt < 1.2 ? 'haha, the dog—' : 'THE DOG!!', pop01(t, P.t0 + (lt < 1.2 ? 0.4 : 1.2), 0.25, 2.2), { size: 42, tail: 'bl', col: lt < 1.2 ? BONE : SKYB })
    } },
]

const F = makeFilm({
  id: 'r2t0167', key: 'E', accent: ACC, ending: 'callback',
  title: 'Laughing at the | wrong time *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve laughs. | *Zero timing.*' },
  last: {
    text: 'Scorpio’s still | *vibrating.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) {
        const Fs = signChar(x, t, 'scorpio', 540 + Math.sin(t * 50) * 3, 1050, 320 * k, { mood: 'squint', seed: 52, squash: 0.05 * Math.sin(t * 60) })
        shake(x, t, Fs.x, Fs.cy, Fs.S * 0.5, clamp((lt - 0.9) * 3))
      }
      label(x, 540, 1380, 'SOUND: STILL 0', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
