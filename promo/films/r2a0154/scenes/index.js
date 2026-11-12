// r2a0154: star_advice ADVICE ROLLCALL, "What each sign | secretly wants." (~63 s vertical, signs3kit social cut, music: lofi · E).
// Ending: 'lesson'.
//   0.0–3.6    "What each sign | *secretly wants.*"
//   3.6–49.2   ♈ someone else to lead, just once · ♉ a plan that won't change, and dessert · ♊ someone who remembers the whole
//              story · ♋ to be taken care of for a change · ♌ applause for the quiet stuff · ♍ permission to stop fixing
//              · ♎ someone to choose for them · ♏ to be known without explaining · ♐ freedom, and a porch light on
//              · ♑ to hear "you can rest now" · ♒ to be weird and still invited · ♓ someone who stays through the tears
//  49.2        "Wanted. | *Every single one.*"
//  52.4        LESSON: "Ask what they want. | *Then listen.*"  WISH: GRANTED
//  58.3        "Taurus still | *wants dessert.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ff8fb1', L = { x: -160 }, R = { x: 160 }
const MUG = ['.S.S..', '..S.S.', 'WWWWW.', 'WWWWWWW', 'WPPPWW.W', 'WPPPWWW.', 'WWWWW...', '.WWW....']
const TOOLBOX = ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRGGRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR']
const SUITCASE = ['...KKK...', '..K...K..', 'OOOOOOOOO', 'OOSOOOSOO', 'OOSOOOSOO', 'OOSOOOSOO', 'OOOOOOOOO', '.K.....K.']
const HOUSE = ['....RR....', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.CCCCCCCC.', '.CSSCCDDC.', '.CSSCCDDC.', '.CCCCCDDC.']
const HOUSE_C = { R: RED, C: CREAM, S: GOLD, D: WOOD }
const UMB = ['....KK....', '..PPPPPP..', '.PPPPPPPP.', 'PPPPPPPPPP', 'P..P..P..P', '....K.....', '....K.....', '....K.....', '....K.....', '...KK.....']
const CAKE = ['....R....', '...WWW...', '.PPPPPPP.', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC']
const CAKE_C = { R: RED, W: CREAM, P: PINK, C: '#ffe7a8' }

const CAMEOS = [
  { sign: 'aries', cap: 'Someone else to lead. | *Just once.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8f2d8', rot: 0.05 }, () => {
        x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(-110, 80); x.bezierCurveTo(-40, -60, 40, 90, 110, -70); x.stroke(); x.setLineDash([])
        txt(x, '✕', 110, -70, { size: 46, color: RED })
      })
      label(x, 790, 1100, 'YOU DRIVE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A plan that won’t change. | *And dessert.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 780, 280, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'FRIDAY', 0, -70, { size: 32, font: MONO, weight: 700, color: RED })
        txt(x, 'same as always', 0, 0, { size: 28 }); txt(x, '(confirmed)', 0, 50, { size: 26, color: '#2fa36b' })
      })
      drawBits(x, CAKE, CAKE_C, 800, 1050, 26 * pop01(t, P.t0 + 1.2, 0.35, 2))
    } },
  { sign: 'gemini', cap: 'Someone who remembers | *the whole story.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.3))
      for (let i = 0; i < n; i++) card(x, 700 + i * 60, 820 + i * 50, 200, 140, 1, { bg: [CREAM, '#ffe7a8', '#e8f2d8', '#e8e0f0'][i], rot: (i % 2 ? 0.06 : -0.06) }, () => txt(x, `PART ${i + 1}`, 0, 0, { size: 30, font: MONO, weight: 700 }))
      bubble(x, 790, 640, 'and then?', pop01(t, P.t0 + 1.5 * 1.29, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'To be taken care of. | *For a change.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: L,
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.fillStyle = PINK; x.fillRect(F.x - 170, F.cy + 20, 340, 150); x.fillStyle = '#ff6f9c'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 170 + i * 90, F.cy + 20, 40, 150); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, P: '#c96a3a', S: 'rgba(255,255,255,0.7)' }, 790, 960, 22 * pop01(t, P.t0 + 0.7, 0.35, 2))
      label(x, 790, 700, 'YOUR TURN TO REST', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Applause for | *the quiet stuff too.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2.2); label(x, 680 + i * 110, 760 - (i % 2) * 50, 'CLAP', k, { size: 30, bg: GOLD, rot: (i - 1) * 0.2, font: MONO, weight: 700 }) }
      label(x, 790, 1000, 'FOR: DOING THE DISHES', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: CREAM, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3 * 1.29, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Permission | *to stop fixing.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, { K: GREY, R: RED, G: GOLD }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'OFF DUTY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 46, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Someone to choose | *for them.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 700, 860, 150, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.08 }, () => txt(x, 'PASTA', 0, 0, { size: 30, font: MONO, weight: 700 }))
      card(x, 880, 860, 150, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: 0.08 }, () => txt(x, 'SOUP', 0, 0, { size: 30, font: MONO, weight: 700 }))
      label(x, 790, 1100, 'DECIDED: PASTA', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 700, 760, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'To be known | *without explaining.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), {}, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-90, -100, 150, 50); txt(x, 'i’m fine.', -15, -75, { size: 26, color: CREAM })
        if (lt > 0.9) { x.fillStyle = MINT; x.fillRect(-40, -10, 130, 90); txt(x, 'say less.', 25, 15, { size: 24 }); txt(x, 'on my way', 25, 50, { size: 22 }) }
      })
      label(x, 790, 1120, 'MATCH: DEEP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Freedom. | *And a porch light on.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, O: ORANGE, S: GOLD }, 250, 1000, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, HOUSE, HOUSE_C, 410, 760, 18 * pop01(t, P.t0 + 1.0, 0.35, 2))
      label(x, 410, 1120, 'WELCOME BACK', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'To hear | *“you can rest now.”*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: R,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.strokeStyle = WOOD; x.lineWidth = 12
      x.beginPath(); x.moveTo(560, 900); x.lineTo(1000, 900); x.stroke()
      x.fillStyle = '#5fd0a8'; x.beginPath(); x.moveTo(560, 900); x.quadraticCurveTo(780, 1160, 1000, 900); x.lineTo(1000, 930); x.quadraticCurveTo(780, 1200, 560, 930); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 330, 680, 'you can | rest now.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: CREAM, tail: 'br' })
      label(x, 330, 1110, 'INBOX: CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'To be weird | *and still invited.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = SKYB; x.fillRect(-160, -150, 320, 60)
        txt(x, 'YOU’RE INVITED', 0, -120, { size: 30, font: MONO, weight: 700 })
        txt(x, 'dress code:', 0, -30, { size: 30, color: '#6b62a8', weight: 700 })
        txt(x, 'exactly you', 0, 30, { size: 40, color: RED })
      })
      if (lt > 1.2) sparkles(x, t, 790, 860, P.t0 + 1.2 * 1.29, 7, 190, 0.3)
    } },
  { sign: 'pisces', cap: 'Someone who stays | *through the tears.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: 2, look: [1, 0], star: { x: -120 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 980, 200 * k, { mood: 'heart', look: [-1, 0], seed: 22, glyph: false })
      drawBits(x, UMB, { K: INK, P: PINK }, 560, F.top - 50, 24 * pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 700, 'NOT GOING ANYWHERE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0154', key: 'E', accent: ACC, ending: 'lesson',
  title: 'What each sign | *secretly wants.*',
  cameos: CAMEOS,
  group: { cap: 'Wanted. | *Every single one.*' },
  lesson: { text: 'Ask what they want. | *Then listen.*', chip: 'WISH: GRANTED' },
  last: { text: 'Taurus still | *wants dessert.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
