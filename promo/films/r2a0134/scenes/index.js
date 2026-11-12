// r2a0134: star_advice, ADVICE ROLL CALL, "Each sign's | lunch-break reset." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific lunch-break reset each, with a light gag. The look lives in ../../signs3kit.js.
//   0.0–3.6    "Each sign’s | *lunch-break reset.*"
//   3.6–49.2   ♈ a brisk walk, race nobody · ♉ eat slowly, no rush · ♊ learn one weird fact · ♋ text someone you love
//              · ♌ a mirror pep talk · ♍ close all the tabs · ♎ a picnic for one · ♏ twenty minutes, do not disturb
//              · ♐ eat somewhere new · ♑ leave the desk, the emails can wait · ♒ doodle something weird
//              · ♓ headphones on, daydream on purpose (happy tears)
//  49.2        "Back by one. | *Brand new.*" (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, cloud, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const SHOE = ['......RRR..', '.....RRWRR.', '....RRRRRR.', 'RRRRRRRRRRR', 'RRRRRRRRRRR', 'WWWWWWWWWWW']
const SAND = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.']
const SAND_C = { B: '#e8a24a', G: '#5fd068', R: '#e23d4e', Y: '#ffd86b' }
const BULB = ['..YYY..', '.YYYYY.', 'YYYWYYY', 'YYYYYYY', '.YYYYY.', '..GGG..', '..GGG..']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const PIN = ['.RRRR.', 'RRWWRR', 'RRWWRR', '.RRRR.', '..RR..', '...R..']
const PHONES = ['..KKKKKKK..', '.K.......K.', 'K.........K', 'K.........K', 'KK.......KK', 'KK.......KK', 'KK.......KK']

const CAMEOS = [
  { sign: 'aries', cap: 'A brisk walk. | *Race nobody.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: '#ff6b5a', W: CREAM }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 790, 690, 'NOT A RACE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.05 })
      label(x, 790, 1080, '(you won anyway)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Eat slowly. | *Taste every bite.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SAND, SAND_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'NO RUSH', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Learn one weird fact. | *Brain snack.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#ffd23a', W: '#fff', G: GREY }, 790, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 950, 'octopuses have | three hearts?!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 790, 720, P.t0 + 0.4, 6, 110, 0.3)
    } },
  { sign: 'cancer', cap: 'Text someone you love. | *Get a heart back.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MOM', headCol: SKYB, size: 28, lines: [
        ['thinking of you', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['♡♡♡', PINK, pop01(t, P.t0 + 1.2, 0.3, 2.4)]] })
      hearts(x, t, 790, 1000, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'A mirror pep talk. | *You’re iconic.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 850, 240, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#c9d8f0', rot: 0 }, () => {
        x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-90, -150, 26, 300); x.fillRect(-50, -150, 10, 300)
        signChar(x, t, 'leo', 10, 10, 160, { mood: lt > 1.2 ? 'wink' : 'sparkle', look: [-1, 0], seed: 61, glyph: false, glow: 0.4, alpha: 0.85 })
      })
      bubble(x, 790, 1110, 'you got this', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Close all the tabs. | *Yes, all of them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.max(0, 6 - Math.floor(clamp((lt - 0.5) / 1.0) * 6))
      for (let i = 0; i < n; i++) card(x, 760 + i * 14, 780 + i * 34, 260, 170, pop01(t, P.t0 + 0.1 + i * 0.05, 0.25, 2), { bg: [BONE, SKYB, MINT, LAV, GOLD, PINK][i], rot: 0.02 }, () => { x.fillStyle = INK; x.fillRect(-130, -85, 260, 26); txt(x, '×', 110, -72, { size: 26, color: CREAM }) })
      label(x, 790, 1080, `TABS: ${n * 7}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: n ? RED : MINT, color: n ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
      if (!n) sparkles(x, t, 790, 860, P.t0 + 1.95, 6, 150, 0.3)
    } },
  { sign: 'libra', cap: 'Make it pretty. | *A picnic for one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -150, y: -30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(560, 1150); x.scale(k * 0.9, k * 0.38)
      for (let i = -4; i < 4; i++) for (let j = -2; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#ff8fb1' : CREAM; x.fillRect(i * 90, j * 90, 90, 90) }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, 820, 960, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 700, 'TABLE FOR ONE ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Twenty minutes alone. | *Do not disturb.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 860, 200, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#ff5a7a', rot: 0.06 }, () => {
        x.fillStyle = INK; x.beginPath(); x.arc(0, -110, 40, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ff5a7a'; x.beginPath(); x.arc(0, -110, 26, 0, Math.PI * 2); x.fill()
        txt(x, 'DO NOT', 0, 0, { size: 34, color: CREAM }); txt(x, 'DISTURB', 0, 46, { size: 34, color: CREAM })
        txt(x, '(thanks)', 0, 104, { size: 22, weight: 700, color: CREAM })
      })
    } },
  { sign: 'sagittarius', cap: 'Eat somewhere new. | *Tiny adventure.*', mood: 'sparkle', star: { x: 170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      card(x, 300, 860, 260, 260, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: '#bfe6b0', rot: -0.04 }, () => {
        x.strokeStyle = '#8fc480'; x.lineWidth = 10; x.beginPath(); x.moveTo(-130, 40); x.lineTo(130, -20); x.moveTo(-40, -130); x.lineTo(20, 130); x.stroke()
        x.setLineDash([12, 10]); x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(-100, 100); x.quadraticCurveTo(-60, -40, 50, -60); x.stroke(); x.setLineDash([])
      })
      drawBits(x, PIN, { R: RED, W: CREAM }, 350, 790 - 10 * Math.abs(Math.sin(t * 4)), 16 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      label(x, 300, 1080, 'NEW SPOT!', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Leave the desk. | *The emails can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.9, 1.3)), k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 1000); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -6, 340, 30); x.fillStyle = GREY; x.fillRect(-164, 0, 328, 18)
        const h = 220 * (1 - shut)
        x.fillStyle = INK; x.fillRect(-150, -h - 6, 300, h + 6); x.fillStyle = '#2a2350'; x.fillRect(-144, -h, 288, h)
        if (h > 80) { x.fillStyle = SKYB; x.fillRect(-120, -h + 20, 240, h - 40) }
        x.restore()
      }
      label(x, 790, 700, shut > 0.9 ? 'BACK AT 1:00' : 'INBOX: 214', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: shut > 0.9 ? MINT : RED, color: shut > 0.9 ? INK : CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Doodle something weird. | *Genius optional.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 320, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.05 }, () => {
        const p = clamp((lt - 0.3) / 1.2)
        x.strokeStyle = '#6fc3ff'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath()
        for (let i = 0; i <= 60 * p; i++) { const a = i / 60 * Math.PI * 6; const r = 20 + i * 1.6; const px = Math.cos(a) * r * 0.9, py = Math.sin(a) * r * 0.7 - 10; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke()
        if (lt > 1.4) { x.fillStyle = INK; x.fillRect(-14, -24, 10, 10); x.fillRect(8, -24, 10, 10); txt(x, 'a cat?', 0, 130, { size: 26, weight: 700 }) }
      })
    } },
  { sign: 'pisces', cap: 'Headphones on. | *Daydream on purpose.*', mood: lt => lt < 1.0 ? 'sleepy' : 'heart', tears: lt => lt < 1.0 ? 1 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, { K: '#c97bff' }, 800, 1090, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, F.x, F.top - 20, { n: 3, cell: 6, col: LAV, seed: 3 })
      cloud(x, t, 800, 760, 14, pop01(t, P.t0 + 0.6, 0.35, 2), { col: '#efe6f8', rain: false })
      label(x, 800, 960, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0134', key: 'E', accent: MINT, ending: 'group',
  title: 'Each sign’s | *lunch-break reset.*',
  cameos: CAMEOS,
  group: { cap: 'Back by one. | *Brand new.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
