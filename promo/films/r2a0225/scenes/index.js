// r2a0225: star_advice, ADVICE ROLLCALL, "Each sign's | love lesson." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific love lesson each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *love lesson.*"
//   3.6–49.2   ♈ love isn't a race (lap 1 of forever) · ♉ share the last dumpling · ♊ ask, then listen · ♋ you deserve
//              the care you give · ♌ let them shine too (starring: both) · ♍ love the person, not the to-do list
//              · ♎ your opinion counts, say it · ♏ trust slowly, then let it in (the heart safe) · ♐ room in your
//              backpack for someone · ♑ schedule nothing, just be together · ♒ let them close, weird and all
//              · ♓ find someone who holds the tissues
//  49.2        "Twelve hearts. | *All worth it.*"
//  52.4        LESSON UNLOCKED: "Every sign loves | *a little differently.*"  LOVE: UNLOCKED
//  58.3        "Now go text | *your person.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const DUMP = ['...WW...', '.WWWWWW.', 'WWWWWWWW', 'WWWWWWWW', '.WWWWWW.']
const PACK = ['..KKKK..', '.KK..KK.', 'GGGGGGGG', 'GGBBBBGG', 'GGBBBBGG', 'GGGGGGGG', 'GGGGGGGG', 'GGGGGGGG']
const PACK_C = { K: INK, G: '#5fd068', B: '#3a9a4a' }
const ROLL = ['RRRRRRRR', 'RWWWWWWR', 'RRRRRRRR']
const SCOPE = ['.......KK', '......KGGK', '....KGGGK.', '..KGGGGK..', 'KGGGGK....', '.KGGK.....', '...B......', '..B.B.....', '.B...B....']
const SCOPE_C = { K: INK, G: '#9aa5c4', B: BROWN }
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BBBBBB', 'BBBBBB']

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Slow down. | *Love isn’t a race.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill(); x.fillRect(-20, -150, 40, 30)
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
        const a = lt > 1.2 ? -Math.PI / 2 + (lt - 1.2) * 0.4 : -Math.PI / 2 + lt * 9
        x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 90, Math.sin(a) * 90); x.stroke()
        x.restore()
      }
      label(x, 790, 1100, 'LAP 1 OF FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Share the last bite. | *It’s romantic.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: L,
    front(x, t, lt, P) {
      const sp = ease.inOutCubic(prog(lt, 0.8, 1.3))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DUMP.map(r => r.slice(0, 4)), { W: CREAM }, 770 - sp * 40, 920, 22 * k)
      drawBits(x, DUMP.map(r => r.slice(4)), { W: CREAM }, 858 + sp * 40, 920, 22 * k)
      label(x, 800, 720, 'THE LAST DUMPLING', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'SHARED (HISTORIC)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ask a question. | *Then really listen.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how was your day?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, '…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 60, col: SKYB, tail: 'br' })
      label(x, 790, 1100, 'LISTENING MODE: ON', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You deserve | *the care you give.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 970, 190 * k, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false })
      const g = ease.inOutCubic(prog(lt, 0.6, 1.1))
      drawBits(x, ['MMMMM.', 'MMMMMM', 'MMMMM.M', 'MMMMMM', 'MMMMM.'], { M: PINK }, lerp(720, 560, g), 920, 14 * k)
      label(x, 790, 720, 'CARE: RETURNED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Let them | *shine too.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 42, glyph: false, hops: [P.t0 + 1.4] })
      card(x, 790, 690, 340, 110, pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: GOLD, rot: -0.03 }, () => txt(x, 'STARRING: BOTH', 0, 2, { size: 34, font: MONO, weight: 700 }))
      sparkles(x, t, 800, 900, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Love the person. | *Not the to-do list.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.9, 1.4))
      if (fly < 1) card(x, lerp(790, 1100, fly), lerp(870, 640, fly), 260, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 + fly * 1.5 }, () => {
        txt(x, 'TO DO', 0, -120, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-100, -70 + i * 46, 24, 24); x.fillStyle = '#6b62a8'; x.fillRect(-60, -64 + i * 46, 150, 12) }
      })
      if (lt > 1.2) drawBits(x, HEART, { H: PINK, W: '#fff' }, 790, 880, 22 * pop01(t, P.t0 + 1.2 * 1.29, 0.35, 2.4))
      label(x, 790, 1110, 'PRIORITY: THEM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your opinion counts. | *Say it out loud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const tip = lt > 1.0 ? 0.25 * ease.outBack(clamp((lt - 1.0) / 0.4)) : Math.sin(t * 3) * 0.06
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-10, -120, 20, 220); x.fillRect(-70, 96, 140, 20)
        x.save(); x.translate(0, -120); x.rotate(tip); x.fillStyle = GOLD; x.fillRect(-150, -8, 300, 16)
        for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d * 140 - 3, 0, 6, 60); x.fillStyle = GOLD; x.beginPath(); x.ellipse(d * 140, 66, 56, 16, 0, 0, Math.PI * 2); x.fill() }
        x.restore(); x.restore()
      }
      bubble(x, 790, 650, 'I’d like pizza.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'DECISION: MADE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Trust slowly. | *Then let love in.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), op = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#4a4466'; x.fillRect(-140, -140, 280, 280)
        x.fillStyle = '#140c30'; x.fillRect(-120, -120, 240, 240)
        x.restore()
        if (op > 0) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 900, 20 * op)
        x.save(); x.translate(790 - 120 * k, 900); x.scale(Math.max(0.02, 1 - op), 1); x.translate(-(790 - 120 * k), -900)
        x.fillStyle = '#6b6590'; x.fillRect(790 - 120 * k, 900 - 120 * k, 240 * k, 240 * k)
        x.fillStyle = INK; x.beginPath(); x.arc(790, 900, 50 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(790, 900, 40 * k, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 790, 680, 'COMBINATION: TIME', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Room in the backpack? | *Pack for two.*', mood: 'sparkle', star: R, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 310, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, ROLL, { R: RED, W: CREAM }, 310, 760, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, ROLL, { R: SKYB, W: CREAM }, 310, 700, 16 * pop01(t, P.t0 + 1.2, 0.3, 2.4))
      label(x, 310, 1120, 'SLEEPING BAGS: 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Schedule nothing. | *Just be together.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 310, 870, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'SATURDAY', 0, -130, { size: 30, font: MONO, weight: 700 })
        if (lt > 0.9) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, 10, 16 * pop01(t, P.t0 + 0.9 * 1.29, 0.35, 2.4))
        txt(x, lt > 0.9 ? 'with my match' : '(empty?!)', 0, 120, { size: 24, font: MONO, weight: 700, color: '#6e6658' })
      })
      label(x, 310, 1110, 'PLANS: NONE. PERFECT.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Let them close. | *Weird and all.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 720, 930, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 880, 980, 170 * k, { mood: 'sparkle', look: [-1, -1], seed: 43, glyph: false })
      label(x, 790, 690, 'SHARED: THE STARS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 5; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 4 + i * 1.7); x.fillStyle = GOLD; x.globalAlpha = tw; x.fillRect(640 + i * 70, 790 + (i % 2) * 30, 10, 10); x.globalAlpha = 1 }
    } },
  { sign: 'pisces', cap: 'Find someone | *who holds the tissues.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 3 : 2, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 980, 190 * k, { mood: 'happy', look: [-1, 0], seed: 44, glyph: false })
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB }, 670, 960, 22 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 700, 'TISSUES: ON HAND', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 760, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0225', key: 'G', accent: PINK, ending: 'lesson',
  title: 'Each sign’s | *love lesson.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve hearts. | *All worth it.*' },
  lesson: { text: 'Every sign loves | *a little differently.*', chip: 'LOVE: UNLOCKED' },
  last: {
    text: 'Now go text | *your person.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
