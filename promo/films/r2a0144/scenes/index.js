// r2a0144: star_advice, ADVICE ROLL CALL, "What each sign | brings on a trip." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "What each sign | *brings on a trip.*"
//   3.6–49.2   ♈ the first cannonball · ♉ the best snacks (shared, mostly) · ♊ new friends from all twelve signs
//              · ♋ spare socks for everyone · ♌ the group photo · ♍ the plan and the backup plan · ♎ peace when everyone's
//              hangry (a truce flag) · ♏ the secret spot (a map with an X) · ♐ the "let's just go" energy (DETOUR!)
//              · ♑ a budget that actually works · ♒ the weirdest best idea (midnight picnic) · ♓ the sunset playlist, and tears
//  49.2        "Bring them all. | *Best trip ever.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Day three: everyone | *needed the socks.*"  Cancer is back with a clothesline of socks.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WATER = '#3d8fd8', ORANGE = '#ffb34a'

// ── props
const SOCK = ['.SSS', '.SSS', '.WWW', '.SSS', '.SSS', 'SSSS', 'SSSS', 'SSS.']
function sock(x, cx, cy, cell, col, rot = 0) { drawBits(x, SOCK, { S: col, W: '#fff4e2' }, cx, cy, cell, { rot }) }
const SOCK_COLS = [PINK, MINT, SKYB, GOLD, LAV, '#ff6b5a']
const BAG = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BbbbbbbbbB', 'BbbYYYbbbB', 'BbbYYYbbbB', 'BbbbbbbbbB', 'BBBBBBBBBB']
const BAG_C = { K: '#8a5a3a', B: '#ff6b5a', b: '#ff9a8a', Y: '#ffd23a' }
const CAMERA = ['....KKK.....', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGKKKKGGGK', 'KGGKWWBBKGGK', 'KGGKWBBBKGGK', 'KGGGKKKKGGGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, G: '#9aa5c4', W: '#fff', B: '#3d8fd8' }
const FLAG = ['KWWWWWW', 'KWWWWWW', 'KWWWWWW', 'KWWWWWW', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......']
function card(x, cx, cy, k, lines, { w = 330, size = 32, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 56 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); y0 += 56 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
function map(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -130, 356, 276)
  x.fillStyle = INK; x.fillRect(-182, -142, 364, 284); x.fillStyle = '#e8d8b0'; x.fillRect(-174, -134, 348, 268)
  x.fillStyle = '#9fd8a0'; x.beginPath(); x.ellipse(-60, -20, 90, 60, 0.3, 0, 7); x.fill()
  x.fillStyle = '#8fc8ee'; x.beginPath(); x.ellipse(90, 60, 70, 40, -0.2, 0, 7); x.fill()
  x.setLineDash([12, 10]); x.strokeStyle = '#8a5a3a'; x.lineWidth = 5; x.beginPath(); x.moveTo(-140, 100); x.quadraticCurveTo(-20, 40, 40, -60 + 0); x.lineTo(110, -70); x.stroke(); x.setLineDash([])
  const p = clamp((lt - 0.6) / 0.4)
  x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(90, -90); x.lineTo(90 + 40 * p, -90 + 40 * p); x.moveTo(130, -90); x.lineTo(130 - 40 * p, -90 + 40 * p); x.stroke()
  x.restore()
}
function calc(x, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#2fc79a'; x.fillRect(-120, -160, 240, 320)
  x.fillStyle = '#0e2a22'; x.fillRect(-100, -140, 200, 70)
  x.fillStyle = MINT; x.font = `700 34px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(txt, 88, -104)
  x.fillStyle = BONE; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) x.fillRect(-96 + c * 68, -40 + r * 64, 52, 48)
  x.restore()
}
function basket(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(0, -40, 110, Math.PI, 0); x.stroke()
  x.strokeStyle = '#c98f2a'; x.lineWidth = 8; x.beginPath(); x.arc(0, -40, 110, Math.PI, 0); x.stroke()
  x.fillStyle = INK; x.fillRect(-150, -50, 300, 150); x.fillStyle = '#c98f2a'; x.fillRect(-142, -42, 284, 134)
  x.fillStyle = RED; for (let i = 0; i < 6; i++) x.fillRect(-142 + i * 48, -42, 24, 24)
  x.fillStyle = '#a8742a'; for (let i = 0; i < 4; i++) x.fillRect(-142, -6 + i * 26, 284, 6)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'The first | *cannonball in.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -170, y: -60 }, hops: [0.4, 0.9],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(110, 1090, 860, 130); x.fillStyle = WATER; x.fillRect(118, 1098, 844, 118)
      x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 6; i++) x.fillRect(150 + ((i * 140 + t * 40) % 780), 1120 + (i % 2) * 40, 50, 6)
    },
    front(x, t, lt, P) {
      if (lt > 0.9 && lt < 1.8) { const s = prog(lt, 0.9, 1.8); x.fillStyle = '#e8f4ff'; for (let i = 0; i < 8; i++) x.fillRect(370 + Math.cos(i * 0.8 + 3.5) * 160 * s - 10, 1090 - Math.abs(Math.sin(i * 0.8 + 3.5)) * 200 * s, 20, 20) }
      label(x, 790, 760, 'WATER’S GREAT!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The *best snacks.* | Shared, mostly.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1110, 'SHARED (MOSTLY)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'New friends | from *all twelve signs.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ids = ['aries', 'taurus', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
      const n = Math.min(ids.length, Math.floor(clamp((lt - 0.3) / 1.4) * ids.length) + 1)
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); signChar(x, t, ids[i], 680 + c * 110, 650 + r * 110, 90, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.6, tears: ids[i] === 'pisces' ? 1 : 0 }) }
      label(x, 790, 1150, 'FRIENDS: ALL 12', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Spare socks | *for everyone.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.25 + i * 0.18, 0.3, 2); if (k > 0.01) sock(x, 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 220, 16 * k, SOCK_COLS[i], (i % 2 ? 0.15 : -0.15)) }
      label(x, 790, 1150, 'JUST IN CASE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The *group photo* | everyone frames.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = lt - 1.0
      if (f > 0 && f < 0.3) { x.save(); x.globalAlpha = 0.7 * (1 - f / 0.3); x.fillStyle = '#fff'; x.beginPath(); x.arc(790, 860, 260, 0, 7); x.fill(); x.restore() }
      label(x, 790, 650, 'SAY “CHEESE!”', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The plan. And | *the backup plan.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 720, 780, pop01(t, P.t0 + 0.2, 0.3, 2), ['9:00 hike', '12:00 lunch', '3:00 swim'], { head: 'PLAN A', headBg: MINT, w: 270, size: 30, rot: -0.06 })
      card(x, 860, 1000, pop01(t, P.t0 + 1.1, 0.3, 2), ['if rain:', 'museum!'], { head: 'PLAN B', headBg: SKYB, w: 250, size: 30, rot: 0.06 })
    } },
  { sign: 'libra', cap: 'Peace when everyone | gets *hangry.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, FLAG, { K: INK, W: '#fff' }, F.x + 150, F.cy - 60, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 * Math.sin(t * 4) })
      label(x, 800, 1060, 'TRUCE: PIZZA', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The secret spot | *nobody knew about.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      map(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'TELL NO ONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The *“let’s just go”* | energy.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, -60, 28, 300); x.fillStyle = '#9aa5c4'; x.fillRect(-8, -56, 16, 292)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -170); x.lineTo(130, -170); x.lineTo(190, -110); x.lineTo(130, -50); x.lineTo(-170, -50); x.closePath(); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.moveTo(-162, -162); x.lineTo(126, -162); x.lineTo(178, -110); x.lineTo(126, -58); x.lineTo(-162, -58); x.closePath(); x.fill()
        x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DETOUR!', -6, -108)
        x.restore()
      }
      bubble(x, 790, 1120, 'trust me!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'A budget that | *actually works.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      calc(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.3 ? 'ON BUDGET' : '…')
      if (lt > 1.3) sparkles(x, t, 790, 800, P.t0 + 1.3 * 1.29, 7, 180, 0.4, [MINT, GOLD, BONE])
    } },
  { sign: 'aquarius', cap: 'The *weirdest* | best idea.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      basket(x, 790, 950, pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 780, 700, 'midnight picnic?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'BEST NIGHT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The *sunset playlist.* | And happy tears.', mood: 'heart', tears: lt => lt < 0.9 ? 1 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.6)
      x.save(); x.globalAlpha = 0.9 * clamp(k)
      x.fillStyle = '#ff9a5a'; x.beginPath(); x.arc(790, 1000, 160, Math.PI, 0); x.fill()
      x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(790, 1000, 110, Math.PI, 0); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      notes(x, t, 790, 840, { n: 4, cell: 8, col: GOLD, seed: 3 })
      label(x, 790, 1080, 'TRACK 1: SUNSET', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0144', key: 'E', accent: MINT, ending: 'callback',
  title: 'What each sign | *brings on a trip.*',
  cameos: CAMEOS,
  group: { cap: 'Bring them all. | *Best trip ever.*' },
  last: {
    text: 'Day three: everyone | *needed the socks.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.4, 1.8)
      if (k > 0.01) {
        x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(120, 980); x.quadraticCurveTo(540, 1060 * k + 980 * (1 - k), 960, 980); x.stroke()
        for (let i = 0; i < 6; i++) { const kk = pop01(t, t0 + 0.5 + i * 0.15, 0.3, 2); if (kk > 0.01) sock(x, 200 + i * 136, 1050 + Math.sin(Math.PI * (i + 0.5) / 6) * 30, 15 * kk, SOCK_COLS[i], Math.sin(t * 2 + i) * 0.1) }
      }
      const s = pop01(t, t0 + 1.2, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'cancer', 540, 1320, 240 * s, { mood: lt > 2 ? 'heart' : 'sparkle', seed: 44, hops: [t0 + 2.0] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
