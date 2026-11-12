// r2a0114: star_advice, ADVICE ROLLCALL, "“I’m fine.” | Each sign decoded." (~57 s vertical, signs3kit social cut, lofi · E)
// Twelve signs in zodiac order: what each one really means by "I'm fine", plus one warm, gentle way to help.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ annoyed (let it out, kindly) · ♉ hungry (snack first) · ♊ ask me twice · ♋ hug me · ♌ notice me
//              · ♍ overthinking (help with one thing) · ♎ no drama, please (make it safe) · ♏ hurt (ask gently)
//              · ♐ needs air (walk with them) · ♑ tired (take one thing off their plate) · ♒ space (they'll be back)
//              · ♓ crying (bring tissues, stay)
//  49.2        "Twelve “fines.” | *Zero fine.*"
//  52.4        LESSON UNLOCKED: "Ask once more. | *Gently.*"  CHECK-IN: SENT
//  58.3        "Still “fine”? | *Bring snacks.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chat, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, PLATE, CLOUD, SUN, TISSUE, TISSUE_C, HEARTBM } from './props.js'

const KETTLE = ['....KK.....', '...KKKK....', '.KKKKKKKK..', 'KRRRRRRRRK.', 'KRRRRRRRRKKK', 'KRRWRRRRRK.K', 'KRRRRRRRRK..', 'KRRRRRRRRK..', '.KKKKKKKK...'].map(r => r.padEnd(12, '.'))
const SANDWICH = ['..BBBBBB..', '.BBBBBBBB.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'YYYYYYYYYY', '.BBBBBBBB.']
const SHOE = ['..KKKK......', '.KWWWWK.....', '.KWWWWWKKK..', 'KWWRWWWWWWK.', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const DIARY = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KPPPYYPPPK', 'KPPPYYPPPK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const KEY = ['.YYY......', 'YY.YYYYYYY', 'YY.YY..Y.Y', '.YYY......']

const CAMEOS = [
  { sign: 'aries', cap: 'Means “I’m annoyed.” | *Let it out, kindly.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, KETTLE, { K: INK, R: '#ff6b5a', W: '#ffffff' }, 790, 920, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt < 1.3 ? Math.sin(t * 30) * 0.03 : 0 })
      for (let i = 0; i < 4; i++) { const ph = (t * 1.2 + i / 4) % 1; x.fillStyle = `rgba(239,230,214,${0.6 * (1 - ph)})`; x.fillRect(900 + ph * 60, 820 - ph * 160, 30 - ph * 10, 30 - ph * 10) }
      label(x, 790, 1110, 'STEAM: RELEASED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Means “I’m hungry.” | *Snack first, talk after.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (lt < 1.1) label(x, 560, 700, 'grrrr', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 38, bg: BONE, rot: Math.sin(t * 20) * 0.06 })
      drawBits(x, PLATE, { W: CREAM }, 790, 1000, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      drawBits(x, SANDWICH, { B: '#e7b46a', G: '#7fd67a', R: '#ff6b5a', Y: '#ffd84a' }, 790, 950, 16 * pop01(t, P.t0 + 0.8, 0.3, 2))
      if (lt > 1.2) label(x, 790, 720, 'NOW WE TALK', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Means “ask me twice.” | *So ask twice.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        txt(x, '✦ YOUR MATCH', 0, -h / 2 + 34, 20, LAV, { font: MONO, weight: 700 })
        chat(x, 'u ok?', w / 2 - 14, -h / 2 + 90, { right: true, col: LAV, size: 24 })
        if (lt > 0.5) chat(x, 'fine', -w / 2 + 14, -h / 2 + 146, { col: GOLD, size: 24 })
        if (lt > 1.0) chat(x, 'really ok?', w / 2 - 14, -h / 2 + 206, { right: true, col: LAV, size: 24 })
        if (lt > 1.5) chat(x, 'ok so…', -w / 2 + 14, -h / 2 + 262, { col: GOLD, size: 24 })
        if (lt > 1.7) chat(x, 'long story', -w / 2 + 14, -h / 2 + 314, { col: GOLD, size: 24 })
      })
    } },
  { sign: 'cancer', cap: 'Means “hug me.” | *Hug them.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), m = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (k > 0.01) signChar(x, t, 'libra', lerp(900, 640, m), 900, 230 * k, { mood: 'heart', look: [-1, 0], seed: 23, glyph: false })
      if (m > 0.9) hearts(x, t, 560, 760, P.t0 + 1.4, { n: 6, life: 1.6, spread: 220, cell: 8, seed: 5 })
      label(x, 790, 1110, 'HUG: DELIVERED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Means “notice me.” | *Tell them they shine.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', star: { x: -170 },
    back(x, t, lt, P, F) {
      if (lt > 0.9) { const a = Math.min(1, (lt - 0.9) * 3); x.fillStyle = `rgba(255,241,176,${0.22 * a})`; x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 180, 1080); x.lineTo(F.x - 180, 1080); x.fill() }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'you look | amazing.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 790, 1000, 'GLOW: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 850, P.t0 + 1.1, 8, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Means “I’m overthinking.” | *Help with one thing.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), done = lt > 1.2
      card(x, 790, 850, 300, 340, CREAM, { k, rot: 0.03 }, x => {
        txt(x, 'TO DO', 0, -136, 28, RED, { font: MONO, weight: 700 })
        for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-120, -86 + i * 44, 22, 22); x.fillStyle = '#9aa5c4'; x.fillRect(-84, -80 + i * 44, 170 - (i * 29) % 60, 10) }
        if (done) { x.strokeStyle = '#2f9a4a'; x.lineWidth = 7; x.beginPath(); x.moveTo(-118, -76); x.lineTo(-108, -66); x.lineTo(-92, -92); x.stroke() }
      })
      if (done) label(x, 790, 1110, '1 DOWN. BREATHE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Means “no drama, please.” | *Make it safe to say.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), tilt = lerp(0.35, 0, ease.inOutCubic(prog(lt, 0.8, 1.4)))
      if (k <= 0.01) return
      x.save(); x.translate(770, 780); x.scale(0.78 * k, 0.78 * k)
      x.fillStyle = INK; x.fillRect(-10, 0, 20, 300); x.fillRect(-90, 290, 180, 24)
      x.rotate(tilt)
      x.fillStyle = INK; x.fillRect(-190, -8, 380, 16); x.fillStyle = GOLD; x.fillRect(-186, -5, 372, 10)
      for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 170 - 4, 0, 8, 90); x.beginPath(); x.ellipse(s * 170, 96, 70, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = PINK; x.beginPath(); x.ellipse(s * 170, 94, 62, 14, 0, 0, Math.PI * 2); x.fill() }
      x.restore()
      if (lt > 1.4) label(x, 790, 1110, 'BALANCED ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Means “I’m hurt.” | *Gently ask again.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, { K: INK, P: '#b0386b', Y: GOLD }, 790, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const m = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, KEY, { Y: GOLD }, lerp(980, 860, m), lerp(1080, 960, m), 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
      label(x, 790, 640, 'OPENING UP…', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Means “I need air.” | *Walk with them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', star: { x: -170 }, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 860, 660, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CLOUD, { W: CREAM }, 700 + Math.sin(t) * 20, 720, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, SHOE, { K: INK, W: '#ffffff', R: '#c58cff' }, 720, 1040, 12 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: Math.sin(t * 8) * 0.08 })
      drawBits(x, SHOE, { K: INK, W: '#ffffff', R: PINK }, 880, 1050, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: Math.sin(t * 8 + 2) * 0.08 })
      label(x, 790, 880, 'WALK FOR TWO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Means “I’m so tired.” | *Lighten their plate.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), n = lt > 1.2 ? 2 : 6
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { W: [CREAM, '#ffe1ec', '#d8f4ff'][i % 3] }, 790 + Math.sin(i * 2) * 8, 1060 - i * 40, 18 * k)
      if (lt > 1.2) label(x, 790, 700, 'LIGHTER ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Means “I need space.” | *Give it. They’ll be back.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.strokeStyle = 'rgba(95,208,255,0.6)'; x.lineWidth = 5; x.setLineDash([12, 10]); x.beginPath(); x.ellipse(790, 860, 170 * k, 90 * k, -0.2, 0, Math.PI * 2); x.stroke(); x.restore()
      x.fillStyle = INK; x.beginPath(); x.arc(790, 860, 56 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fd0ff'; x.beginPath(); x.arc(790, 860, 48 * k, 0, Math.PI * 2); x.fill()
      const a = t * 1.6
      drawBits(x, HEARTBM, { H: PINK, W: '#fff' }, 790 + Math.cos(a) * 170 * Math.cos(-0.2) - Math.sin(a) * 90 * Math.sin(-0.2), 860 + Math.cos(a) * 170 * Math.sin(-0.2) + Math.sin(a) * 90 * Math.cos(-0.2), 7 * k)
      label(x, 790, 1100, 'ORBIT: STABLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#5fd0ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Means “I’m crying.” | *Bring tissues. Stay.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 680, 'STAYING ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0114', key: 'E', accent: MINT, ending: 'lesson',
  title: '“I’m fine.” | Each sign *decoded.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve “fines.” | *Zero fine.*', moods: ['squint', 'neutral', 'wink', 'neutral', 'neutral', 'squint', 'happy', 'neutral', 'happy', 'sleepy', 'happy', 'heart'] },
  lesson: { text: 'Ask once more. | *Gently.*', chip: 'CHECK-IN: SENT' },
  last: {
    text: 'Still “fine”? | *Bring snacks.*',
    draw(x, t, lt) {
      drawBits(x, SANDWICH, { B: '#e7b46a', G: '#7fd67a', R: '#ff6b5a', Y: '#ffd84a' }, 540, 740, 14 * pop01(t, t - lt + 0.9, 0.35, 2.2))
      sparkles(x, t, 540, 740, t - lt + 1.1, 8, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
