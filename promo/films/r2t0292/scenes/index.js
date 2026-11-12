// r2t0292: star_talk, ROLLCALL, "The signs | courtside." (a basketball game) (~53 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | *courtside.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one game each (3.8 s per sign), each pushed to the extreme:
//              ♈ challenged the mascot to a dance-off · ♉ came for the nachos (score: unknown) · ♊ cheered for both teams
//              · ♋ made a sign for the bench player · ♌ got on the big screen, stayed there · ♍ corrected the referee
//              · ♎ booed, then apologised · ♏ stared down a free throw, it missed · ♐ tried to join the team
//              · ♑ brought a spreadsheet · ♒ cheering for the team losing by 86 · ♓ cried when the mascot tripped
//  49.2        group beat "Twelve fans. | *One brain cell.*"  52.6 callback: "Final score? | *Nachos: zero.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = ORANGE
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const BALL = ['..KKKK..', '.KOKOOK.', 'KOOKOOOK', 'KKKKKKKK', 'KOOKOOOK', 'KOOKOOOK', '.KOKOOK.', '..KKKK..']
const BALL_C = { K: INK, O: ORANGE }
const FINGER = ['...FF...', '...FF...', '...FF...', '.FFFFFF.', 'FFFFFFFF', 'FFFFFFFF', 'FFFFFFFF', '.FFFFFF.', '..FFFF..', '..FFFF..']
const TRAY = ['K..........K', 'KK........KK', '.KKKKKKKKKK.']
const CHIP = ['...Y...', '..YYY..', '.YYYYY.', 'YYYYYYY']
const MASCOT = ['..BBBB..', '.BWBBWB.', '.BBKKBB.', '..BBBB..', 'BBBBBBBB', '.BBBBBB.', '.BB..BB.']
const WHISTLE = ['.KKKKK..', 'KGGGGGKKK', 'KGGGGGGGK', 'KGGGGGKKK', '.KKKKK...']

function nachos(x, t, cx, cy, cell, n) {
  drawBits(x, TRAY, { K: '#c9c9d8' }, cx, cy + cell * 2, cell)
  for (let i = 0; i < n; i++) drawBits(x, CHIP, { Y: i % 2 ? SUN : '#ffcf5a' }, cx - cell * 3.5 + (i % 4) * cell * 2.4, cy - Math.floor(i / 4) * cell * 2.6, cell * 0.8, { rot: (i % 3 - 1) * 0.3 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the mascot | to a *dance-off.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MASCOT, { B: '#5fa8ff', W: '#ffffff', K: INK }, 800, 950 + Math.abs(Math.sin(t * 4)) * -20, 26 * k)
      lab(x, 800, 690, 'ROUND 7', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: RED, color: BONE, rot: 0.05, size: 40 })
      bubble(x, 560, 650, 'AGAIN!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came for the game. | Stayed for the *nachos.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 930); x.scale(k, k); x.translate(-790, -930); nachos(x, t, 790, 930, 22, 8 - Math.floor(clamp((lt - 0.8) / 1.4) * 5)); x.restore() }
      lab(x, 790, 680, 'SCORE: ???', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 38 })
    } },
  { sign: 'gemini', cap: 'Cheered for | *both teams.*', mood: 'sparkle', star: { x: 0 }, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, FINGER, { F: RED }, 270, 780 + Math.sin(t * 6) * 16, 22 * k, { rot: -0.3 })
      drawBits(x, FINGER, { F: '#5fa8ff' }, 810, 780 + Math.sin(t * 6 + 2) * 16, 22 * k, { rot: 0.3 })
      lab(x, 540, 1120, 'GO… EVERYONE!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SUN, rot: 0.03, size: 36 })
    } },
  { sign: 'cancer', cap: 'Made a sign | for the *bench player.*', mood: 'heart', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      card(x, 790, 830, 320, 250, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'WE BELIEVE', 0, -70, { size: 36, color: RED }); txt(x, 'IN YOU', 0, -20, { size: 36, color: RED })
        txt(x, '#12', 0, 50, { size: 64, color: '#5fa8ff' })
      })
      lab(x, 790, 1100, '(has not played)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: GREY, rot: -0.04, size: 30 })
      hearts(x, t, 790, 700, P.t0 + 1.0, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Got on the big screen. | *Never left.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 250, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: DEEP, rot: -0.03, border: 10 }, () => {
        signChar(x, t, 'leo', 0, 10, 170, { mood: lt > 1.2 ? 'wink' : 'sparkle', seed: 44, glyph: false })
        x.fillStyle = RED; x.fillRect(-150, -110, 22, 22)
      })
      const m = Math.floor(clamp((lt - 0.4) / 1.8) * 45)
      lab(x, 790, 1090, `ON SCREEN: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 200, 0.5)
    } },
  { sign: 'virgo', cap: 'Corrected | the *referee.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, WHISTLE, { K: INK, G: '#c9c9d8' }, 780, 960, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 })
      bubble(x, 790, 680, 'actually, rule | 4, section b…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 800, 1120, 'REF: TOOK NOTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Booed. | Then *apologised.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'BOOOO!', pop01(t, P.t0 + 0.25, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 54, tail: 'bl' })
      bubble(x, 780, 690, "sorry! you're | doing great!", pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl', col: PINK })
      hearts(x, t, 780, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Stared at the free throw. | *It missed.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      // hoop
      x.save(); x.globalAlpha = clamp(k); x.translate(840, 600); x.scale(1.4, 1.4); x.translate(-900, -600); x.fillStyle = INK; x.fillRect(820, 600, 160, 110); x.fillStyle = BONE; x.fillRect(828, 608, 144, 94); x.fillStyle = RED; x.fillRect(856, 650, 88, 46)
      x.fillStyle = '#ff6b2a'; x.fillRect(840, 720, 120, 10); x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(846 + i * 26, 730, 4, 50); x.restore()
      const p = clamp((lt - 0.4) / 1.0), bx = lerp(600, 900, p), by = 1050 - Math.sin(Math.PI * p) * 420
      if (lt > 0.4) drawBits(x, BALL, BALL_C, p < 1 ? bx : 900, p < 1 ? by : 1050, 13, { rot: t * 6 })
      lab(x, 640, 1120, "MISSED.", pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: RED, color: BONE, rot: 0.04, size: 40 })
    } },
  { sign: 'sagittarius', cap: 'Tried to join | *the team.*', mood: 'sparkle', star: ST, hops: [0.6, 1.1, 1.6, 2.1],
    front(x, t, lt, P, F) {
      drawBits(x, BALL, BALL_C, F.x + 140, F.cy - 150 - Math.abs(Math.sin(t * 5)) * 60, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 3 })
      bubble(x, 800, 700, 'PUT ME IN, | COACH!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      lab(x, 800, 1100, 'SECURITY: HI', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Brought | a *spreadsheet.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 330, 290, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8fbd8', rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-165, -145, 330, 50); txt(x, 'GAME.XLS', 0, -120, { size: 28, font: MONO, weight: 700, color: BONE })
        x.strokeStyle = '#7fae7a'; x.lineWidth = 3
        for (let r = 0; r < 4; r++) { x.beginPath(); x.moveTo(-165, -95 + r * 60); x.lineTo(165, -95 + r * 60); x.stroke() }
        x.beginPath(); x.moveTo(-40, -95); x.lineTo(-40, 145); x.stroke()
        const rows = [['PTS', '88'], ['FOULS', '14'], ['VIBES', 'TBD']]
        rows.forEach(([a, b], i) => { if (lt > 0.4 + i * 0.4) { txt(x, a, -100, -65 + i * 60, { size: 24, font: MONO, weight: 700 }); txt(x, b, 60, -65 + i * 60, { size: 28, font: MONO, weight: 700, color: i === 2 ? RED : INK }) } })
      })
      lab(x, 790, 1110, 'FUN: SCHEDULED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Cheering for the team | *losing by 86.*', mood: 'sparkle', star: ST, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      card(x, 790, 760, 340, 160, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: INK, rot: 0.02 }, () => {
        txt(x, 'HOME  AWAY', 0, -40, { size: 26, font: MONO, weight: 700, color: GREY })
        txt(x, '98 : 12', 0, 20, { size: 60, font: MONO, weight: 700, color: SUN })
      })
      bubble(x, 790, 1020, 'they need me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The mascot tripped. | *Pisces sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fall = ease.outCubic(prog(lt, 0.5, 0.9))
      x.save(); x.translate(800, 1000); x.rotate(1.3 * fall); x.translate(-800, -1000)
      drawBits(x, MASCOT, { B: '#5fa8ff', W: '#ffffff', K: INK }, 800, 950, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.restore()
      bubble(x, 790, 1150, "i'm ok!", pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      lab(x, 790, 680, 'TISSUES: ALL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: SKYB, rot: -0.04, size: 36 })
    } },
]

const F = makeFilm({
  id: 'r2t0292', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs | *courtside.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve fans. | *One brain cell.*',
    draw(x, t, lt) { confetti(x, t, 540, 1050, t - lt + 1.0, { n: 26, spread: 420, h: 700 }) },
  },
  last: {
    text: 'Final score? | *Nachos: zero.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 1150); x.scale(k, k); x.translate(-540, -1150)
        nachos(x, t, 540, 1150, 34, 0)
        x.restore()
        signChar(x, t, 'taurus', 540, 900, 280 * k, { mood: lt > 1.2 ? 'heart' : 'sleepy', seed: 9, hops: [t - lt + 1.2] })
      }
      lab(x, 540, 1320, 'TAURUS: UNDEFEATED', pop01(t, t - lt + 1.3, 0.3, 2.2), { bg: SUN, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
