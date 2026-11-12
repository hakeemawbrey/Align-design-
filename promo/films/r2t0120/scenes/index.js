// r2t0120: ROLLCALL, "The signs | at the arcade." (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    the hook; the twelve line up, then dive into the pips.
//   3.6–49.2   ♈ punching game: broke the record · ♉ spent every token at the snack counter · ♊ playing six games at once
//              · ♋ won a plush, adopted it (name: Bean) · ♌ every high score says LEO · ♍ read every rule card out loud
//              · ♎ can't pick a prize, the arcade is closing · ♏ claw machine, never missed once · ♐ ran out of tokens,
//              found more in a shoe · ♑ saved tickets for years, got the big prize · ♒ only plays the broken machine
//              · ♓ lost the claw game, grieving the plush
//  49.2        "Twelve players. | *Zero tokens left.*"
//  52.6        CALLBACK: "Scorpio won Pisces | *the plush.*"  Scorpio hands it over; Pisces cries (happy).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068', SCORP = '#ff4f86'

const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.', '..RWRW..']
const BEAR = ['BB....BB', 'BBBBBBBB', '.BKBBKB.', '.BBPPBB.', '..BBBB..', '.BBBBBB.', 'BBBBBBBB', '.BB..BB.']
const BEAR_C = { B: '#c98f5a', K: INK, P: '#ffd98a' }
const SHOE = ['.....RRR', '....RRWR', '...RRRRR', 'RRRRRRRR', 'WWWWWWWW']
const TOKEN = ['.YYYY.', 'YYKKYY', 'YKYYKY', 'YYKKYY', '.YYYY.']
const STICK = ['.RR.', 'RRRR', '.RR.', '.KK.', '.KK.', 'KKKK']
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSWSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '...K....K...']

function cabinet(x, cx, cy, k, scr, { broken = false, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#6b62a8'; x.fillRect(-112, -192, 224, 384)
  x.fillStyle = INK; x.fillRect(-90, -160, 180, 140); x.fillStyle = broken ? (Math.floor(t * 10) % 2 ? '#3a3560' : '#9aa5c4') : '#140c30'; x.fillRect(-82, -152, 164, 124)
  if (scr) scr(x)
  x.fillStyle = '#2a2350'; x.fillRect(-100, 10, 200, 60)
  x.fillStyle = RED; x.beginPath(); x.arc(40, 40, 14, 0, Math.PI * 2); x.fill(); x.fillStyle = SKYB; x.beginPath(); x.arc(72, 40, 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-60, 26, 10, 30); x.fillStyle = RED; x.fillRect(-66, 18, 22, 14)
  x.restore()
}
function clawBox(x, t, cx, cy, k, p, { win = true, prize = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -220, 300, 440); x.fillStyle = SCORP; x.fillRect(-142, -212, 284, 424)
  x.fillStyle = 'rgba(143,227,255,0.25)'; x.fillRect(-126, -180, 252, 260); x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(-126, -180, 252, 260)
  // a pile of plushes on the floor of the box
  const drop = p < 0.5 ? p / 0.5 : 1 - (p - 0.5) / 0.5
  const lift = p >= 0.5 && win
  for (let i = 0; i < 4; i++) if (!(lift && i === 1) || !prize) drawBits(x, BEAR, { ...BEAR_C, B: [ORANGE, '#c98f5a', LAV, MINT][i] }, -80 + i * 54, 50, 7)
  const cy2 = -170 + 190 * drop
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-26, -180); x.lineTo(-26, cy2); x.stroke()
  x.fillStyle = BONE; x.fillRect(-46, cy2, 40, 8); x.fillRect(-46, cy2, 6, 24); x.fillRect(-12, cy2, 6, 24)
  if (lift && prize) drawBits(x, BEAR, { ...BEAR_C }, -26, cy2 + 40, 7)
  x.fillStyle = INK; x.fillRect(-126, 100, 252, 90); x.fillStyle = '#2a2350'; x.fillRect(-118, 108, 236, 74)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Punching game? | *Broke the record.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      const sc = Math.floor(clamp((lt - 0.7) / 0.6) * 999)
      cabinet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x2 => { x2.fillStyle = RED; x2.font = `700 52px ${MONO}`; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillText(String(sc).padStart(3, '0'), 0, -90) })
      label(x, 790, 640, 'NEW RECORD!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Spent every token | at the *snack counter.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, { W: '#fff4e2', R: RED }, 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'GAMES PLAYED: 0', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Playing six games. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, STICK, { R: [RED, SKYB, GOLD, MINT, PINK, LAV][i], K: INK }, 690 + (i % 3) * 100, 800 + Math.floor(i / 3) * 190, 18 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: 0.3 * Math.sin(t * 9 + i) })
      label(x, 790, 1130, 'PLAYERS 1–6: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Won a plush. | *Adopted it.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BEAR, BEAR_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'NAME: BEAN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Every high score | says *LEO.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#140c30'; x.fillRect(-140, -180, 280, 360)
        x.fillStyle = GOLD; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HIGH SCORES', 0, -140)
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 6)
        for (let i = 0; i < 6; i++) { x.fillStyle = i < n ? ORANGE : '#3a3560'; x.font = `700 34px ${MONO}`; x.fillText(`${i + 1}. ${i < n ? 'LEO' : '---'}`, 0, -80 + i * 50) }
        x.restore()
      }
    } },
  { sign: 'virgo', cap: 'Read every rule card. | *Out loud.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'rule 14, part B…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 960); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -100, 260, 200); x.fillStyle = '#fff4e2'; x.fillRect(-122, -92, 244, 184)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('HOW TO PLAY', 0, -58)
        x.fillStyle = '#c9c0b0'; for (let i = 0; i < 4; i++) x.fillRect(-96, -24 + i * 28, 192 - (i % 2) * 40, 8)
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Can’t pick a prize. | *Arcade’s closing.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[[720, 880, ORANGE], [860, 880, MINT], [720, 1040, LAV], [860, 1040, SKYB]].forEach(([cx, cy, c], i) => drawBits(x, BEAR, { ...BEAR_C, B: c }, cx, cy, 13 * k))
      label(x, 790, 700, lt > 1.4 ? 'CLOSING!' : 'this? that?', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: lt > 1.4 ? RED : PINK, color: lt > 1.4 ? '#fff4e2' : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Claw machine? | *Never missed once.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clawBox(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.4))
      label(x, 790, 1150, 'WINS: ALL', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Out of tokens. | Found more *in a shoe.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: '#c97bff', W: '#fff4e2' }, 790, 1000, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const p = prog(lt, 0.9 + i * 0.15, 1.3 + i * 0.15); if (p > 0) drawBits(x, TOKEN, { Y: GOLD, K: '#c98f2a' }, 760 + i * 40, lerp(960, 780 - i * 30, ease.outCubic(p)), 12) }
      label(x, 790, 1140, 'DON’T ASK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Saved tickets for years. | Got *the big prize.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: SKYB, W: '#ffffff' }, 790, 900, 24 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 700, 'TICKETS: 100,000', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'aquarius', cap: 'Only plays | the *broken machine.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cabinet(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), null, { broken: true, t })
      label(x, 790, 680, 'OUT OF ORDER', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: BONE, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 560, 1130, 'vintage!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Lost the claw game. | *Grieving the plush.*', mood: 'wide', tears: lt => lt < 1.2 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      clawBox(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.3) / 1.2), { win: false })
      label(x, 790, 1150, 'SO CLOSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0120', key: 'F', accent: PINK, ending: 'callback',
  title: 'The signs | *at the arcade.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve players. | *Zero tokens left.*' },
  last: {
    text: 'Scorpio won Pisces | *the plush.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) {
        signChar(x, t, 'scorpio', 340, 1060, 240 * k, { mood: 'wink', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
        signChar(x, t, 'pisces', 740, 1060, 240 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 41, tears: 3, hops: [t - lt + 1.5] })
      }
      const g = ease.inOutCubic(prog(lt, 0.9, 1.4))
      drawBits(x, BEAR, BEAR_C, lerp(430, 620, g), 1180 - Math.sin(Math.PI * g) * 120, 14 * pop01(t, t - lt + 0.7, 0.3, 2))
      hearts(x, t, 680, 960, t - lt + 1.5, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
