// r2t0067: star_talk, SOLO, "Tauruses texting | be like." (~50 s vertical, signs3kit social cut, music: lofi · E)
// The whole film is one sign (makeFilm solo mode, 9 cards). Ending: lesson.
//   0.0–3.6    "Tauruses texting | *be like.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine texting moments (3.8 s each):
//              replies three days later: "lol yeah." · every text is about food · asked "dinner?", already seated
//              · same phone since 2014 (taped, 4%) · wrong in the group chat, will never admit it (RECEIPTS)
//              · typing for twenty minutes, sends "ok." · a new match's first text: "favourite bakery?"
//              · phone off at 9 p.m., do not disturb · a voice note that is mostly chewing
//  37.8        "Unbothered. | *Well fed.*"  The big Taurus is back.
//  41.0        LESSON UNLOCKED: "Few words. | *All heart.*"  REPLY: PENDING
//  46.9        "Still typing. | *Still loves you.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', MOSS = '#5fd068', RED = '#e23d4e', S = 'taurus'

// ── props
const BREAD = [
  '...CCCCCCCC...',
  '.CCCCCCCCCCCC.',
  'CCCLCCCLCCCLCC',
  'CCCCLCCCLCCCLC',
  'CCCCCCCCCCCCCC',
  '.CCCCCCCCCCCC.',
]
const BREAD_C = { C: '#d9944a', L: '#f2c27a' }
const PLATE = [
  '..FFFFFFFF..',
  '.FFNNFFPPFF.',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const PLATE_C = { W: CREAM, F: '#ffb34a', N: '#5fd068', P: '#e23d4e' }

// a phone; lines = [[text, colour, k, side]] (side -1 left/them, +1 right/you)
function phone(x, cx, cy, k, { head = '', headCol = MOSS, lines = [], rot = 0.05, foot = null, dim = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.22, k * 1.22)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) {
    x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, side = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(side * 14, -64 + i * 66); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  if (foot) { x.fillStyle = 'rgba(239,230,214,0.7)'; x.font = `700 18px ${MONO}`; x.fillText(foot, 0, 150) }
  if (dim > 0.01) { x.fillStyle = `rgba(5,4,12,${(0.85 * dim).toFixed(3)})`; x.fillRect(-112, -170, 224, 340) }
  x.restore()
}
// an old taped-up phone
function oldPhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -162, 212, 340)
  x.fillStyle = INK; x.fillRect(-110, -172, 220, 344)
  x.fillStyle = '#6b62a8'; x.fillRect(-102, -164, 204, 328)
  x.fillStyle = '#2a3d6a'; x.fillRect(-88, -140, 176, 230)
  // the crack
  x.strokeStyle = CREAM; x.lineWidth = 4; x.beginPath(); x.moveTo(-70, -130); x.lineTo(-20, -70); x.lineTo(-40, -20); x.lineTo(30, 40); x.lineTo(10, 80); x.stroke()
  // tape
  x.fillStyle = 'rgba(255,241,200,0.85)'; x.save(); x.rotate(0.5); x.fillRect(-90, -20, 180, 34); x.restore()
  // battery
  x.fillStyle = CREAM; x.fillRect(30, -130, 46, 22); x.fillStyle = RED; x.fillRect(34, -126, 6, 14)
  x.fillStyle = INK; x.fillRect(-20, 112, 40, 30)
  x.restore()
}
// a pile of screenshots ("receipts")
function receipts(x, t, cx, cy, lt, t0) {
  for (let i = 0; i < 6; i++) {
    const k = pop01(t, t0 + 0.3 + i * 0.14, 0.25, 2.2)
    if (k <= 0.01) continue
    x.save(); x.translate(cx + ((i * 47) % 120) - 60, cy - i * 22); x.rotate(Math.sin(i * 2.1) * 0.25); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-74, -94, 148, 188); x.fillStyle = CREAM; x.fillRect(-68, -88, 136, 176)
    x.fillStyle = i % 2 ? LAV : SKYB; x.fillRect(-56, -70, 90, 24); x.fillStyle = PINK; x.fillRect(-30, -30, 86, 24); x.fillStyle = i % 2 ? LAV : SKYB; x.fillRect(-56, 10, 70, 24)
    x.fillStyle = RED; x.fillRect(-60, 50, 120, 6)
    x.restore()
  }
}
// typing dots
function typing(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -40, 180, 80); x.fillStyle = BONE; x.fillRect(-84, -34, 168, 68)
  for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 7 - i * 0.9)); x.fillStyle = INK; x.fillRect(-46 + i * 36 - 9, -9 - b * 10, 18, 18) }
  x.restore()
}
// a voice-note bar with CRUNCH stickers
function voice(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -48, 340, 96); x.fillStyle = MOSS; x.fillRect(-162, -40, 324, 80)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -20); x.lineTo(-140, 20); x.lineTo(-110, 0); x.fill()
  for (let b = 0; b < 18; b++) { const hh = 8 + 44 * Math.abs(Math.sin(b * 1.7 + t * 6)); x.fillRect(-90 + b * 13, -hh / 2, 8, hh) }
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  x.restore()
}

const CAMEOS = [
  // 1 · three days later
  { sign: S, cap: 'Replies three days later. | *“lol yeah.”*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['are you coming??', LAV, pop01(t, P.t0 + 0.3, 0.25, 2.2), -1],
        ['hello??', LAV, pop01(t, P.t0 + 0.5, 0.25, 2.2), -1],
        ['lol yeah', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.4), 1],
      ] })
      label(x, 790, 1110, lt > 1.2 ? 'THURSDAY' : 'MONDAY', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · food texts
  { sign: S, cap: 'Every text is | *about food.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TAURUS', headCol: MOSS, lines: [
        ['what u eating', MINT, pop01(t, P.t0 + 0.35, 0.25, 2.2), 1],
        ['send a pic', MINT, pop01(t, P.t0 + 0.6, 0.25, 2.2), 1],
        ['more sauce?', MINT, pop01(t, P.t0 + 0.85, 0.25, 2.2), 1],
        ['BIGGER pic', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2), 1],
      ] })
      drawBits(x, PLATE, PLATE_C, 560, 640, 14 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
    } },
  // 3 · "dinner?"
  { sign: S, cap: 'You texted “dinner?” | *Already seated.*', mood: 'sparkle', look: [1, 0], star: { x: -200, y: 20 }, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 630, 'dinner?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      x.fillStyle = INK; x.fillRect(600, 1010, 380, 24); x.fillStyle = '#c98f2a'; x.fillRect(606, 1016, 368, 12)
      drawBits(x, BREAD, BREAD_C, 790, 960, 16 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 820, 'TABLE FOR 2: SEATED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: MOSS, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'ORDERED FOR YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 4 · the old phone
  { sign: S, cap: 'New phone? | *Same one since 2014.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      oldPhone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'BATTERY: 4%', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 560, 1080, 'she’s fine.', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 38, tail: 'bl' })
    } },
  // 5 · the group chat
  { sign: S, cap: 'Wrong in the group chat. | *Won’t admit it.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      receipts(x, t, 790, 960, lt, P.t0)
      bubble(x, 760, 640, 'actually… | I was right', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1140, 'RECEIPTS: 38', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 6 · typing…
  { sign: S, cap: 'Typing for twenty minutes. | Sends *“ok.”*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const sent = lt > 1.5
      if (!sent) typing(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.25, 2))
      else bubble(x, 790, 860, 'ok', pop01(t, P.t0 + 1.5, 0.25, 2.6), { size: 64, col: MINT, tail: 'br' })
      label(x, 790, 650, `TYPING: ${String(Math.min(20, Math.floor(lt * 13))).padStart(2, '0')} MIN`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.55, 6, 140, 0.3)
    } },
  // 7 · Align: a new match's first text
  { sign: S, cap: 'New match’s first text? | *“Favourite bakery?”*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '✦ NEW MATCH', headCol: MINT, lines: [
        ['favourite bakery?', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2), 1],
        ['corner one', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2), -1],
        ['marry me', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.4), 1],
      ] })
      drawBits(x, BREAD, BREAD_C, 560, 640, 12 * pop01(t, P.t0 + 1.3, 0.3, 2.4), { rot: -0.1 })
      hearts(x, t, 580, 900, P.t0 + 1.6, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 5 })
    } },
  // 8 · 9 p.m.
  { sign: S, cap: 'Phone off at 9 p.m. | *Do not disturb.*', mood: 'sleepy', star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '9:00 PM', headCol: LAV, dim: clamp((lt - 0.6) * 2) })
      const z = pop01(t, P.t0 + 0.9, 0.3, 2.2)
      if (z > 0.01) { x.save(); x.translate(790, 880); x.scale(z, z); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(24, -16, 50, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1120, '14 MISSED CALLS: FINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 9 · the voice note
  { sign: S, cap: 'Sent a voice note. | *Mostly chewing.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      voice(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 720, 680, 'crunch', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 36, bg: GOLD, rot: -0.12, weight: 800 })
      label(x, 880, 1010, 'crunch', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 36, bg: GOLD, rot: 0.1, weight: 800 })
      label(x, 700, 1090, 'anyway', pop01(t, P.t0 + 1.7, 0.25, 2.4), { size: 32, bg: BONE, rot: -0.04, weight: 800 })
      label(x, 860, 620, '11:42', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: MOSS, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0067', key: 'E', accent: MOSS, solo: S, ending: 'lesson',
  title: 'Tauruses texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Unbothered. | *Well fed.*', mood: 'sleepy' },
  lesson: { text: 'Few words. | *All heart.*', chip: 'REPLY: PENDING' },
  last: { text: 'Still typing. | *Still loves you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
