// r2t0253: star_talk, ROLLCALL, "The signs | vs. the wind." (~58 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme version of itself on a windy day.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ raced the wind, declared victory · ♉ refused to move, the wind went around · ♊ kept talking, the words
//              blew away · ♋ brought everyone a scarf · ♌ wind-machine moment, posed for an hour · ♍ raked the leaves, again
//              · ♎ umbrella flipped, still cute · ♏ collar up, mysterious on purpose · ♐ grabbed a kite, left the country
//              · ♑ papers flew, filed them mid-air · ♒ built a windmill · ♓ wind in their eyes, or just feelings
//  49.2        "Twelve signs. | *Zero good hair.*"  the group, windswept.
//  52.4        LESSON: "Some days blow you around. | Hold onto *your people.*"  STATUS: GROUNDED
//  58.3        "Bad hair day. | *Good friend day.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GALE = '#9fe6ff', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', LEAF = ['#e8902e', '#d9542e', '#f2c75c', '#b8641c']

const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// wind streaks blowing right → left across the panel
function gusts(x, t, { n = 7, a = 0.55, speed = 1.1, y0 = 560, y1 = 1180, dir = -1, clip = true } = {}) {
  x.save(); if (clip) { x.beginPath(); x.rect(110, 480, 860, 740); x.clip() }
  for (let i = 0; i < n; i++) {
    const ph = ((t * speed + i * 0.37) % 1 + 1) % 1
    const y = lerp(y0, y1, (i * 0.61) % 1) + Math.sin(t * 2 + i) * 10
    const len = 120 + (i % 3) * 60
    const xx = dir < 0 ? lerp(1050, 0, ph) : lerp(30, 1100, ph)
    x.globalAlpha = a * Math.sin(Math.PI * ph)
    x.fillStyle = BONE; x.fillRect(xx, y, len, 6); x.fillRect(xx + len * 0.3, y - 14, len * 0.4, 5)
  }
  x.restore()
}
function leaf(x, cx, cy, r, s, col) {
  x.save(); x.translate(cx, cy); x.rotate(r); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 24, 13, 0, 0, 7); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, 19, 9, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.fillRect(-16, -1, 32, 2)
  x.restore()
}
function scarf(x, cx, cy, k, col, flap) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-70, -18, 140, 36, 14); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-64, -12, 128, 24, 10); x.fill()
  x.save(); x.translate(50, 6); x.rotate(-0.4 + 0.25 * Math.sin(flap))
  x.fillStyle = INK; x.fillRect(-14, 0, 32, 96); x.fillStyle = col; x.fillRect(-9, 4, 22, 86)
  x.fillStyle = '#fff4e2'; x.fillRect(-9, 50, 22, 8); x.fillRect(-9, 70, 22, 8)
  x.restore(); x.restore()
}
function umbrella(x, cx, cy, k, flip, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -20, 12, 200)
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(-22, 180, 22, 0, Math.PI); x.stroke()
  const dome = lerp(-1, 1, flip)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -20); x.quadraticCurveTo(0, -20 + 170 * dome * -1 - 8, 170, -20); x.lineTo(170, -10); x.quadraticCurveTo(0, -10 - 160 * dome, -170, -10); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-160, -20); x.quadraticCurveTo(0, -20 - 150 * dome, 160, -20); x.closePath(); x.fill()
  x.restore()
}
function kite(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.2 * Math.sin(t * 3)); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -130); x.lineTo(100, 0); x.lineTo(0, 150); x.lineTo(-100, 0); x.closePath(); x.fill()
  x.fillStyle = '#a35cf0'; x.beginPath(); x.moveTo(0, -116); x.lineTo(86, 0); x.lineTo(0, 0); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, -116); x.lineTo(-86, 0); x.lineTo(0, 0); x.closePath(); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(0, 136); x.lineTo(86, 0); x.lineTo(0, 0); x.closePath(); x.fill()
  x.fillStyle = MINT; x.beginPath(); x.moveTo(0, 136); x.lineTo(-86, 0); x.lineTo(0, 0); x.closePath(); x.fill()
  x.restore()
}
function paper(x, cx, cy, r, s) {
  x.save(); x.translate(cx, cy); x.rotate(r); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-46, -60, 92, 120); x.fillStyle = CREAM; x.fillRect(-40, -54, 80, 108)
  x.fillStyle = '#9a92b8'; for (let i = 0; i < 4; i++) x.fillRect(-28, -36 + i * 22, 56 - (i % 2) * 18, 6)
  x.restore()
}
function windmill(x, t, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, 230); x.lineTo(50, 230); x.lineTo(18, -10); x.lineTo(-18, -10); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-42, 222); x.lineTo(42, 222); x.lineTo(12, -2); x.lineTo(-12, -2); x.closePath(); x.fill()
  x.save(); x.rotate(spin)
  for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.fillStyle = INK; x.fillRect(-18, -170, 36, 160); x.fillStyle = i % 2 ? '#38c4ec' : BONE; x.fillRect(-12, -164, 24, 148) }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 20, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill()
  x.restore()
}
const BOLT = ['..YYY', '.YYY.', 'YYYY.', '..YY.', '.YY..', 'YY...']
const SHADES = ['KKKKKKK.KKKKKKK', 'KKKKKKKKKKKKKKK', '.KKKKK...KKKKK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the wind. | *Claims they won.*', mood: 'sparkle', look: [-1, 0], star: { x: -160 }, hops: [0.4, 0.8, 1.2, 1.6],
    back(x, t, lt) { gusts(x, t, { speed: 1.6 }) },
    front(x, t, lt, P) {
      x.save(); x.fillStyle = INK; x.fillRect(150, 700, 14, 360); x.fillStyle = CREAM; for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? INK : CREAM; x.fillRect(164, 700 + i * 20, 70, 20) } x.restore()
      label(x, 760, 700, 'WINNER', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 52, bg: GOLD, rot: -0.05 })
      label(x, 760, 790, '(self-declared)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Refused to move. | *The wind went around.*', mood: 'neutral', star: { x: 0 },
    back(x, t, lt) {
      // streaks that bend around the star
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      for (let i = 0; i < 8; i++) {
        const ph = ((t * 1.1 + i * 0.29) % 1 + 1) % 1, lane = (i % 4 - 1.5) * 50, xx = lerp(1050, 20, ph)
        const bend = Math.exp(-Math.pow((xx - 540) / 140, 2)) * (lane < 0 ? -170 : 170)
        x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(xx, 880 + lane + bend, 110, 6)
      }
      x.restore()
    },
    front(x, t, lt, P) { label(x, 540, 1130, 'IMMOVABLE', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 44, bg: '#e9b24a', rot: -0.04 }) } },
  { sign: 'gemini', cap: 'Kept talking. | *The words blew away.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 },
    back(x, t, lt) { gusts(x, t, { dir: 1, speed: 1.2 }) },
    front(x, t, lt, P) {
      const word = 'SO THEN SHE SAID'
      for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') continue
        const born = 0.2 + i * 0.07, a = clamp((lt - born) / 1.2)
        if (lt < born) continue
        const px = 420 + i * 24 + a * a * (120 + (i % 4) * 40), py = 760 - Math.sin(a * 5 + i) * 50 * a - a * (40 + (i % 3) * 50)
        x.save(); x.translate(px, py); x.rotate(a * (i % 2 ? 2 : -2)); x.globalAlpha = 1 - a * 0.35
        txt(x, word[i], 0, 0, 44, GOLD); x.restore()
      }
      bubble(x, 760, 1060, 'wait come back', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought everyone | *a scarf.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    back(x, t, lt) { gusts(x, t, { a: 0.4 }) },
    front(x, t, lt, P) {
      const cols = [PINK, GOLD, MINT, SKYB, LAV]
      for (let i = 0; i < 5; i++) scarf(x, 780 - (i % 2) * 20, 1120 - i * 56, pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2), cols[i], t * 5 + i)
      label(x, 790, 640, 'ONE EACH. NO ARGUING.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: '#3fb6f0', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wind-machine moment. | *Posed for an hour.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -40 }, hops: [0.9, 1.7],
    back(x, t, lt) { gusts(x, t, { dir: 1, speed: 1.4, a: 0.7 }) },
    front(x, t, lt, P, F) {
      // flowing mane strands streaming right
      for (let i = 0; i < 6; i++) { const y = F.cy - 90 + i * 22, w = 140 + 40 * Math.sin(t * 6 + i); x.fillStyle = INK; x.fillRect(F.x + 100, y - 2, w + 4, 16); x.fillStyle = i % 2 ? '#ffb34a' : GOLD; x.fillRect(F.x + 102, y, w, 12) }
      label(x, 300, 640, 'TAKE 87', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Raked the leaves. | *Again. And again.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -240 },
    back(x, t, lt) { gusts(x, t, { a: 0.45 }) },
    front(x, t, lt, P, F) {
      x.save(); x.translate(F.x + 110, F.cy + 40); x.rotate(0.5 + 0.15 * Math.sin(t * 6))
      x.fillStyle = INK; x.fillRect(-8, -150, 16, 260); x.fillStyle = WOOD; x.fillRect(-4, -146, 8, 252)
      x.fillStyle = INK; x.fillRect(-60, 100, 120, 16); for (let i = 0; i < 7; i++) x.fillRect(-56 + i * 18, 110, 6, 30)
      x.restore()
      // a neat pile that keeps blowing apart
      const cyc = (lt * 1.2) % 1
      for (let i = 0; i < 14; i++) { const blow = ease.inCubic(clamp((cyc - 0.3 - (i % 5) * 0.06) * 2)); leaf(x, 760 + (i % 5) * 34 - 60 + blow * (200 + i * 30), 1110 - Math.floor(i / 5) * 24 - blow * (180 + (i % 3) * 120), i + blow * 6, 1.3, LEAF[i % 4]) }
      label(x, 760, 650, 'ATTEMPT 9', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: '#ef5c94', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Umbrella flipped. | *Still looked cute.*', mood: lt => lt > 1.1 ? 'wink' : 'wide', star: { x: -40, y: 60 },
    back(x, t, lt) { gusts(x, t, { a: 0.5 }) },
    front(x, t, lt, P, F) {
      umbrella(x, F.x + 30, F.cy - 230, 0.9 * pop01(t, P.t0 + 0.15, 0.3, 2), ease.outBack(prog(lt, 0.6, 0.85)), '#e163d6')
      label(x, 790, 1130, 'STILL A LOOK', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.4, 7, 160, 0.9)
    } },
  { sign: 'scorpio', cap: 'Collar up. | *Mysterious on purpose.*', mood: 'squint', look: [1, 0], star: { x: -60 },
    back(x, t, lt) { gusts(x, t, { a: 0.5 }) },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 70); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 60); x.lineTo(-120, -60); x.lineTo(-40, 20); x.lineTo(40, 20); x.lineTo(120, -60); x.lineTo(150, 60); x.closePath(); x.fill()
        x.fillStyle = '#3d2a4a'; x.beginPath(); x.moveTo(-140, 54); x.lineTo(-114, -46); x.lineTo(-40, 28); x.lineTo(40, 28); x.lineTo(114, -46); x.lineTo(140, 54); x.closePath(); x.fill()
        x.restore()
      }
      drawBits(x, SHADES, { K: INK }, F.x, F.cy - 26, 13 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      bubble(x, 800, 640, '…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Grabbed a kite. | *Left the country.*', mood: 'sparkle', look: [1, -1], star: { x: -80, y: 0 },
    back(x, t, lt) { gusts(x, t, { dir: 1, speed: 1.5 }) },
    front(x, t, lt, P, F) {
      const up = ease.inCubic(prog(lt, 0.9, 2.4))
      const kx = 790 + up * 90, ky = 660 - up * 50
      x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(F.x + 60, F.cy - 40 - up * 120); x.lineTo(kx, ky + 100); x.stroke()
      kite(x, t, kx, ky, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 760, 1130, 'BYE! POSTCARD SOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Papers flew off. | *Filed them mid-air.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -230 },
    back(x, t, lt) { gusts(x, t, { a: 0.5 }) },
    front(x, t, lt, P) {
      // a folder that catches each flying page
      x.fillStyle = INK; x.fillRect(680, 980, 240, 170); x.fillStyle = '#2fc79a'; x.fillRect(688, 988, 224, 154); x.fillRect(688, 966, 90, 26)
      for (let i = 0; i < 5; i++) {
        const a = ease.inOutCubic(clamp((lt - 0.3 - i * 0.22) / 0.6))
        paper(x, lerp(600 + i * 70, 800, a), lerp(620 + (i % 2) * 70, 1020, a), lerp(i - 2, 0, a), lerp(1, 0.6, a))
      }
      label(x, 800, 1170, 'FILED: A–Z', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Didn’t fight it. | *Built a windmill.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 },
    back(x, t, lt) { gusts(x, t, { a: 0.55 }) },
    front(x, t, lt, P) {
      windmill(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t * (lt > 0.8 ? 4 : 0.5))
      if (lt > 1.2) drawBits(x, BOLT, { Y: GOLD }, 900, 640, 10)
      label(x, 790, 1150, 'POWERING THE BLOCK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: '#38c4ec', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Wind in their eyes. | *Or just feelings.*', mood: 'wide', tears: 3, look: [-1, 0], star: { x: 0 },
    back(x, t, lt) { gusts(x, t, { a: 0.5 }) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'IT’S THE WIND (IT’S NOT)', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: '#7c74f0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0253', key: 'G', accent: GALE, ending: 'lesson',
  title: 'The signs | vs. *the wind.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Zero good hair.*',
    moods: ['wide', 'neutral', 'wide', 'happy', 'sparkle', 'squint', 'wink', 'squint', 'sparkle', 'neutral', 'happy', 'wide'],
    draw(x, t, lt) { gusts(x, t, { n: 9, a: 0.5, y0: 1000, y1: 1400, clip: false }) },
  },
  lesson: { text: 'Some days blow you around. | Hold onto *your people.*', chip: 'STATUS: GROUNDED' },
  last: { text: 'Bad hair day. | *Good friend day.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
