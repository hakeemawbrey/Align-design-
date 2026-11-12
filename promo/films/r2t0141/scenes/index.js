// r2t0141: THE SIGNS AS… v3, BELIKE, "Shooting star? | Zodiacs be like." (~58 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    "Shooting star? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one shooting star per card (it streaks across the top of the panel), each sign's most extreme reaction:
//              ♈ wished, followed up twice · ♉ wished for snacks, specific snacks · ♊ two wishes, then a third
//              · ♋ hoped the star got home safe · ♌ thought the star was a fan · ♍ checked its birth chart first
//              · ♎ wished for a match, got two, can't pick · ♏ wish locked in a vault · ♐ booked a flight to where it landed
//              · ♑ asked it for a promotion · ♒ "technically, it's a rock" · ♓ wished on it, it was a plane (sobbing)
//  49.2        "One star. | *Twelve wishes.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Make the wish. | Then *go chase it.*"  STATUS: WISH SENT
//  58.3        "Pisces still | *waves at planes.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a'

// ── the shooting star: a pixel star head with a fading trail, crossing the top of the panel over the card's first beat
const STAR_HEAD = ['..Y..', '.YWY.', 'YWWWY', '.YWY.', '..Y..']
function shooter(x, t, lt, { from = [180, 520], to = [900, 640], at = 0.05, dur = 0.75, cell = 7 } = {}) {
  const p = prog(lt, at, at + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.inOutQuad(p)
  const hx = lerp(from[0], to[0], e), hy = lerp(from[1], to[1], e)
  const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy)
  x.save()
  for (let i = 1; i <= 14; i++) {
    const back = i * 18, a = (1 - i / 15) * Math.sin(Math.PI * p)
    x.globalAlpha = a; x.fillStyle = i < 5 ? '#fff4e2' : GOLD
    const s = Math.max(3, 12 - i * 0.6)
    x.fillRect(hx - dx / L * back - s / 2, hy - dy / L * back - s / 2, s, s)
  }
  x.restore()
  drawBits(x, STAR_HEAD, { Y: GOLD, W: '#fff4e2' }, hx, hy, cell, { alpha: Math.sin(Math.PI * Math.min(1, p * 1.4)) })
}
// a small note card (bone paper, ink border, a few lines of text)
function note(x, cx, cy, k, lines, { w = 330, size = 32, rot = 0.04, bg = BONE, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 56 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 29); y0 += 56 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
const FRIES = ['R.R.R.R', 'YRYRYRY', 'YYYYYYY', 'RRRRRRR', 'RRRRRRR', '.RRRRR.']
const FRIES_C = { Y: '#ffd23a', R: RED }
const VAULT = [
  'KKKKKKKKKKK',
  'KGGGGGGGGGK',
  'KGgggggggGK',
  'KGgGGGGGgGK',
  'KGgGKKKGgGK',
  'KGgGKYKGgGK',
  'KGgGKKKGgGK',
  'KGgGGGGGgGK',
  'KGgggggggGK',
  'KGGGGGGGGGK',
  'KKKKKKKKKKK',
]
const VAULT_C = { K: '#2a2350', G: '#9aa5c4', g: '#6b7290', Y: GOLD }
const PLANE = [
  '......W.....',
  '.....WW.....',
  'W...WWW.....',
  'WWWWWWWWWWW.',
  'WWWWWWWWWWWR',
  '....WWW.....',
  '.....WW.....',
  '......W.....',
]
const PLANE_C = { W: '#d8dbe8', R: RED }
// a little birth chart wheel
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, 7); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.strokeStyle = LAV; x.lineWidth = 3
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 60, Math.sin(a) * 60); x.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); x.stroke() }
  x.beginPath(); x.arc(0, 0, 60, 0, 7); x.stroke()
  x.fillStyle = GOLD; for (let i = 0; i < 5; i++) { const a = i * 2.1 + 0.4; x.fillRect(Math.cos(a) * 100 - 7, Math.sin(a) * 100 - 7, 14, 14) }
  drawBits(x, STAR_HEAD, { Y: GOLD, W: '#fff4e2' }, 0, 0, 8)
  x.restore()
}
// a match card (tiny profile: a star and a heart chip)
function matchCard(x, t, cx, cy, k, id, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -126, 216, 268)
  x.fillStyle = INK; x.fillRect(-114, -140, 228, 280)
  x.fillStyle = '#2a2350'; x.fillRect(-106, -132, 212, 264)
  x.restore()
  signChar(x, t, id, cx + Math.sin(rot) * 20, cy - 20, 150 * k, { mood: 'wink', seed: id.length, glyph: false, glow: 0.8 })
  label(x, cx, cy + 95 * k, '✦ MATCH', k, { size: 26, bg: PINK, rot, font: MONO, weight: 700 })
}
function ticket(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -86, 356, 188)
  x.fillStyle = INK; x.fillRect(-182, -98, 364, 196)
  x.fillStyle = BONE; x.fillRect(-174, -90, 348, 180)
  x.fillStyle = SKYB; x.fillRect(-174, -90, 348, 52)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', 0, -63)
  x.font = `800 34px ${INTER}`; x.fillText('TO: WHERE IT', 0, -4); x.fillText('LANDED', 0, 40)
  x.setLineDash([8, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(110, -38); x.lineTo(110, 90); x.stroke()
  x.restore()
}

// every card starts with the star streaking across the top of the panel
const SH = (o = {}) => (x, t, lt) => shooter(x, t, lt, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Made a wish. | Followed up *twice.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2],
    back: SH(),
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'any update?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 930, 'HELLO??', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 48, col: '#ff6b5a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Wished for snacks. | *Specific* snacks.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.8, 0.3, 2), ['1. fries', '2. hot fries', '3. MORE fries'], { head: 'MY WISH', w: 320, size: 34 })
      drawBits(x, FRIES, FRIES_C, 790, 1110, 20 * pop01(t, P.t0 + 1.6, 0.3, 2.2))
    } },
  { sign: 'gemini', cap: 'Made two wishes. | Then *a third.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, -1], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      ;[['WISH #1', MINT], ['WISH #2', SKYB], ['WISH #3 (SECRET)', GOLD]].forEach(([s, c], i) =>
        label(x, 790, 720 + i * 150, s, pop01(t, P.t0 + 0.8 + i * 0.45, 0.3, 2.4), { size: 32, bg: c, rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Hoped the star | *got home safe.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, -1], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      bubble(x, 770, 720, 'text me when | you land!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 790, 980, P.t0 + 1.3 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Thought the star | was *a fan.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wink', look: [1, -1], star: { x: -170 }, hops: [0.9, 1.6],
    back: SH(),
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'hi! yes, | it’s me!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1000, 'AUTOGRAPHS: FREE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.2, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked its | *birth chart* first.', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      chart(x, t, 790, 860, pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 1080, 'WISH: APPROVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Wished for a match. | Got two. *Can’t pick.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      matchCard(x, t, 700, 870, pop01(t, P.t0 + 0.8, 0.3, 2), 'gemini', -0.08)
      matchCard(x, t, 880, 890, pop01(t, P.t0 + 1.1, 0.3, 2), 'leo', 0.08)
      bubble(x, 790, 640, 'both??', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Their wish? | *Locked in a vault.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      const shake = lt > 1.0 && lt < 1.25 ? Math.sin(t * 70) * 6 : 0
      drawBits(x, VAULT, VAULT_C, 790 + shake, 880, 26 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1100, 'TOP SECRET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booked a flight | to *where it landed.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -170 }, hops: [1.2, 1.8],
    back: SH({ to: [920, 1000] }),
    front(x, t, lt, P) {
      ticket(x, 790, 800, pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1040, 'BRB. FOREVER.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked the star | for *a promotion.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: { x: -170 },
    back: SH(),
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.8, 0.3, 2), ['re: my raise', 'see attached', '(12 pages)'], { head: 'TO: STAR', headBg: '#2fc79a', w: 320, size: 32 })
      label(x, 790, 1090, 'CC: THE MOON', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Technically, | it’s *a rock.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.6],
    back: SH(),
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, 7); x.fill()
        x.fillStyle = '#8a7f9e'; x.beginPath(); x.arc(0, 0, 86, 0, 7); x.fill()
        x.fillStyle = '#6b6280'; x.beginPath(); x.arc(-30, -20, 20, 0, 7); x.arc(30, 30, 14, 0, 7); x.arc(28, -34, 10, 0, 7); x.fill()
        x.restore()
      }
      label(x, 790, 1040, 'FUN FACT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 780, 680, 'well, actually', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Wished on it. | It was *a plane.*', mood: lt => lt < 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 1 : 3, look: [1, -1], star: { x: -170 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt) {
      const p = prog(lt, 0.05, 2.2)
      if (p > 0 && p < 1) {
        const px = lerp(180, 940, p), py = lerp(560, 600, p)
        drawBits(x, PLANE, PLANE_C, px, py, 9)
        if (Math.floor(t * 3) % 2) { x.fillStyle = RED; x.fillRect(px + 46, py - 4, 10, 10) }
      }
    },
    front(x, t, lt, P) {
      label(x, 790, 880, 'FLIGHT 202', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1050, 'it was SO pretty', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0141', key: 'C', accent: GOLD, ending: 'lesson',
  title: 'Shooting star? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One star. | *Twelve wishes.*',
    draw(x, t, lt) { shooter(x, t, lt, { from: [120, 700], to: [960, 820], at: 0.2, dur: 1.0, cell: 8 }) },
  },
  lesson: { text: 'Make the wish. | Then *go chase it.*', chip: 'STATUS: WISH SENT' },
  last: {
    text: 'Pisces still | *waves at planes.*',
    draw(x, t, lt) {
      const p = prog(lt, 0.2, 3.4)
      if (p > 0 && p < 1) drawBits(x, PLANE, PLANE_C, lerp(1000, 80, p), 740, 11, { sx: -1 })
      bubble(x, 900, 1450, 'bye plane!', pop01(t, t - lt + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
