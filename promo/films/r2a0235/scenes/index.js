// r2a0235: star_advice, ADVICE ROLLCALL, "Easier mornings | for each sign." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm and specific morning tip each, with a light visual gag.
//   0.0–3.6    "Easier mornings | *for each sign.*"
//   3.6–49.2   ♈ a walk before the phone · ♉ breakfast made the night before · ♊ one podcast, not seven tabs · ♋ a warm mug,
//              a slow start · ♌ hype yourself in the mirror · ♍ lay out tomorrow tonight · ♎ a good-morning text from
//              someone sweet · ♏ ten quiet minutes · ♐ open a window, let the day in · ♑ three tasks, not thirty
//              · ♒ a new route somewhere · ♓ a gentle alarm, fewer morning tears
//  49.2        "Twelve mornings. | *Slightly less chaos.*"
//  52.4        LESSON UNLOCKED: "Be gentle with | *your first hour.*"  STATUS: AWAKE
//  58.3        "Taurus is | *still on breakfast.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, sun, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffd86b'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const SHOE = ['....RRRR..', '...RWWWR..', '..RRRRRRR.', 'RRRRRRRRRR', 'WWWWWWWWWW']
const JAR = ['.KKKKKK.', 'KGGGGGGK', 'KWWWWWWK', 'KWRWWRWK', 'KWWWWWWK', 'KBBBBBBK', 'KBBBBBBK', '.KKKKKK.']
const PHONES = ['..KKKKK..', '.K.....K.', 'K.......K', 'KK.....KK', 'KPK...KPK', 'KPK...KPK', '.K.....K.']
const MUG = ['.WWWWWW...', 'WPPPPPPW..', 'WPPPPPPWWW', 'WPPPPPPW.W', 'WPPPPPPWWW', 'WPPPPPPW..', '.WWWWWW...']
const CLOTHES = ['SSSSSSSSSS', 'SSSSSSSSSS', 'BBBBBBBBBB', 'BBBBBBBBBB', 'YYYYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Move first. | *A walk before the phone.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      sun(x, t, 820, 690, 60, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SHOE, { R: RED, W: CREAM }, 790, 1040, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 900, 'PHONE: LATER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Make breakfast | *the night before.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, G: GOLD, W: CREAM, R: '#e23d4e', B: '#c98f6a' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'READY ♥', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GREEN, rot: 0.04, ...M })
    } },
  { sign: 'gemini', cap: 'One podcast. | *Not seven tabs.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, { K: INK, P: GOLD }, 370, F.top + 40, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { outline: null })
      notes(x, t, 790, 880, { n: 3, cell: 7, col: GOLD })
      label(x, 790, 760, lt > 1.2 ? 'TABS: 1' : 'TABS: 7', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: lt > 1.2 ? MINT : RED, color: lt > 1.2 ? INK : BONE, rot: 0.04, ...M })
    } },
  { sign: 'cancer', cap: 'A warm mug. | *A slow start.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, P: '#c98f6a' }, 790, 990, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.fillStyle = 'rgba(255,255,255,0.7)'; for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * clamp(lt - 0.4); x.fillRect(740 + i * 40 + Math.sin(ph * 6 + i) * 10, 890 - ph * 150, 14, 34) }
      x.globalAlpha = 1
      label(x, 790, 700, 'NO RUSH', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, ...M })
    } },
  { sign: 'leo', cap: 'Hype yourself up | *in the mirror.*', mood: 'sparkle', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(810, 920); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 170, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c7e6ff'; x.beginPath(); x.ellipse(0, 0, 100, 150, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      if (k > 0.5) signChar(x, t, 'leo', 810, 940, 160, { mood: 'sparkle', look: [-1, 0], seed: 12, glyph: false, alpha: 0.85 })
      bubble(x, 790, 650, 'you got this', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 810, 920, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Lay out tomorrow | *tonight.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CLOTHES, { S: [SKYB, PINK, MINT][i], B: [LAV, '#ff9a4a', GOLD][i], Y: CREAM }, 790, 1080 - i * 80, 18 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2))
      label(x, 790, 720, 'MORNING ME: THANKS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: 'libra', cap: 'A good-morning text | *from someone sweet.*', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = s => pop01(t, P.t0 + s, 0.25, 2)
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['morning,', CREAM, a(0.6)], ['sunshine ☀', GOLD, a(0.9)], ['have a soft day', CREAM, a(1.4)]], size: 24 })
      hearts(x, t, 380, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'Ten quiet minutes. | *Just yours.*', mood: lt => lt > 0.8 ? 'sleepy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 860, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 6, Math.min(10, lt * 6))
      bubble(x, 790, 650, 'shh.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      label(x, 790, 1070, '10 MIN: MINE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Open a window. | *Let the day in.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), o = ease.inOutCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) { x.save(); x.translate(330, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = '#9fd8ff'; x.fillRect(-138, -168, 276, 336)
        x.save(); x.beginPath(); x.rect(-138, -168, 276, 336); x.clip(); sun(x, t, 40, -40, 50, 1); x.restore()
        x.fillStyle = '#e8e0d0'; x.fillRect(-138, -168, 138 * (1 - o), 336); x.fillRect(138 - 138 * (1 - o), -168, 138 * (1 - o), 336)
        x.restore() }
      label(x, 330, 1110, 'FRESH AIR: ON', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'Three tasks. | *Not thirty.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TODAY', 0, -140, { size: 30, ...M })
        for (let i = 0; i < 6; i++) { const y = -80 + i * 46, keep = i < 3; x.fillStyle = keep ? INK : GREY; x.fillRect(-110, y - 6, 200, 12); if (!keep && lt > 0.8 + (i - 3) * 0.25) { x.fillStyle = RED; x.fillRect(-120, y - 2, 220, 5) } }
      })
      label(x, 790, 1110, 'THE REST: TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GREEN, rot: -0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Take a new route. | *Anywhere.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#d9f2e4', rot: -0.03 }, () => {
        x.fillStyle = '#9fd6a8'; x.fillRect(-150, -60, 300, 40); x.fillRect(40, -140, 40, 280)
        const p = clamp((lt - 0.4) / 1.4); x.fillStyle = RED
        for (let i = 0; i < Math.floor(p * 10); i++) { const q = i / 9; x.fillRect(-120 + q * 230 - 6, 110 - Math.sin(q * Math.PI) * 180 - 6, 12, 12) }
        if (p >= 1) txt(x, '★', 110, 110, { size: 44, color: GOLD })
      })
      label(x, 790, 680, 'NEW WAY ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: 'pisces', cap: 'A gentle alarm. | *Fewer morning tears.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 1 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 900, 110, pop01(t, P.t0 + 0.2, 0.35, 2), 7, 0)
      notes(x, t, 790, 800, { n: 4, cell: 6, col: SKYB })
      label(x, 790, 1080, 'ALARM: SOFT BIRDS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0235', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Easier mornings | *for each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve mornings. | *Slightly less chaos.*' },
  lesson: { text: 'Be gentle with | *your first hour.*', chip: 'STATUS: AWAKE' },
  last: { text: 'Taurus is | *still on breakfast.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
