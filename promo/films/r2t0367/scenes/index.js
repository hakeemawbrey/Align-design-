// r2t0367: THE SIGNS AS… v3, ROLLCALL, "Wedding rehearsal | *with the signs.*" (~62 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    "Wedding rehearsal | *with the signs.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one wedding-rehearsal moment per sign (3.8 s each), pushed to the extreme:
//              ♈ sprinted down the aisle (new record) · ♉ only came for the rehearsal dinner (rolls: 9)
//              · ♊ wrote four versions of the toast · ♋ brought tissues for every guest
//              · ♌ not in the wedding, rehearsed an entrance · ♍ taped every mark on the floor (mark 47)
//              · ♎ seated everyone by sign (chart v19) · ♏ read the vows way too intensely
//              · ♐ turned it into a dance party · ♑ ran it with a clipboard and a whistle (run-through #6)
//              · ♒ pitched a wedding in zero gravity · ♓ cried at the practice (it's just practice)
//  49.2        "And that was | *just practice.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Love makes everyone | *a little extra.*"  RSVP: YES
//  58.3        "See you | *at the real one.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const ROLL = ['..BBBB..', '.BBWWBB.', 'BBBBBBBB', 'BBBBBBBB', '.BBBBBB.']
const ROLL_C = { B: '#e8a24a', W: '#ffe0a8' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPPPPPPB', 'BPPPPPPB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, P: '#bfe9ff' }
const BOUQUET = ['.P.R.P.', 'PRPRPRP', '.RPWPR.', 'PRPRPRP', '.GGGGG.', '..GGG..', '..WWW..', '..GGG..', '..GGG..']
const BOUQUET_C = { P: PINK, R: '#ff4f86', W: '#ffffff', G: '#5fd068' }
const ROCKET = ['....W....', '...WWW...', '..WWWWW..', '..WSSSW..', '..WSSSW..', '..WWWWW..', '.RWWWWWR.', 'RRWWWWWRR', 'R..OYO..R', '...OYO...', '....O....']
const ROCKET_C = { W: '#e8e4f8', S: SKYB, R: RED, O: '#ffb34a', Y: GOLD }
const WHISTLE = ['..KKKKKK', '.KYYYYYK', 'KYYYYYYK', 'KYYKKYYK', 'KYYYYYYK', '.KYYYYK.', '..KKKK..']
/** a stack of index cards fanned out */
function cards(x, cx, cy, k, n, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    x.save(); x.rotate((i - (n - 1) / 2) * 0.16); x.translate((i - (n - 1) / 2) * 40, 0)
    x.fillStyle = INK; x.fillRect(-100, -130, 200, 260); x.fillStyle = CREAM; x.fillRect(-92, -122, 184, 244)
    x.fillStyle = '#c9a6ff'; for (let j = 0; j < 4; j++) x.fillRect(-80, -70 + j * 44, 160, 3)
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`TOAST v${i + 1}`, 0, -98)
    x.restore()
  }
  x.restore()
}
/** a spotlight cone from the top-right corner + confetti */
function spotlight(x, t, k, cx = 360) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1c8'
  x.beginPath(); x.moveTo(cx - 40, 470); x.lineTo(cx + 40, 470); x.lineTo(cx + 210, 1180); x.lineTo(cx - 210, 1180); x.closePath(); x.fill(); x.restore()
  const C = [GOLD, PINK, MINT, SKYB, LAV]
  for (let i = 0; i < 18; i++) { const ph = ((t * 0.5 + i / 18) % 1), px = 160 + (i * 97) % 760, py = 500 + ph * 650; x.fillStyle = C[i % 5]; x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph); x.translate(px, py); x.rotate(t * 3 + i); x.fillRect(-8, -5, 16, 10); x.restore() }
}
/** tape X marks on the floor, n of them */
function tapeMarks(x, n) {
  for (let i = 0; i < n; i++) {
    const px = 600 + (i % 4) * 90, py = 940 + Math.floor(i / 4) * 80 + (i % 2) * 14
    x.save(); x.translate(px, py)
    for (const r of [0.6, -0.6]) { x.save(); x.rotate(r); x.fillStyle = INK; x.fillRect(-34, -10, 68, 20); x.fillStyle = GOLD; x.fillRect(-30, -6, 60, 12); x.restore() }
    x.restore()
  }
}
/** a seating chart board: rows of sign glyphs */
const SEATC = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function seating(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = WOOD; x.fillRect(-100, 150, 16, 120); x.fillRect(84, 150, 16, 120)
  x.fillStyle = INK; x.fillRect(-180, -170, 360, 330); x.fillStyle = CREAM; x.fillRect(-170, -160, 340, 310)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATING', 0, -126)
  const sh = Math.floor(lt * 4)
  for (let tb = 0; tb < 3; tb++) {
    const tx = -110 + tb * 110
    x.fillStyle = '#e9d6a2'; x.beginPath(); x.arc(tx, 20, 44, 0, 7); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke()
    for (let s = 0; s < 4; s++) { const g = SEATC[(tb * 4 + s + sh) % 12], a = s / 4 * Math.PI * 2 - Math.PI / 4, px = tx + Math.cos(a) * 62, py = 20 + Math.sin(a) * 62; x.fillStyle = INK; x.fillRect(px - 15, py - 15, 30, 30); x.fillStyle = g; x.fillRect(px - 11, py - 11, 22, 22) }
  }
  x.restore()
}
/** a mirror disco ball on a string */
function disco(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#9aa0b4'; x.fillRect(-3, -r - 200, 6, 200)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, 7); x.clip()
  const C = ['#e8e4f8', '#9aa0b4', SKYB, '#ffffff', LAV]
  for (let j = -r; j < r; j += 22) for (let i = -r; i < r; i += 22) { x.fillStyle = C[Math.abs(((i + j) / 22 | 0) + Math.floor(t * 6)) % 5]; x.fillRect(i + 1, j + 1, 20, 20) }
  x.restore()
  x.restore()
  const C2 = [GOLD, PINK, MINT, SKYB]
  for (let i = 0; i < 8; i++) { const a = t * 1.3 + i * 0.8; x.fillStyle = C2[i % 4]; x.globalAlpha = 0.7 * k; x.fillRect(cx + Math.cos(a) * 300 - 9, cy + 260 + Math.sin(a * 1.7) * 160 - 9, 18, 18) }
  x.globalAlpha = 1
}
/** a clipboard with a checklist */
function clipboard(x, cx, cy, k, rows, done) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = WOOD; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = CREAM; x.fillRect(-120, -150, 240, 312)
  x.fillStyle = INK; x.fillRect(-50, -204, 100, 40); x.fillStyle = '#9aa0b4'; x.fillRect(-42, -198, 84, 28)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach((r, i) => { x.fillStyle = INK; x.fillRect(-104, -120 + i * 60, 24, 24); x.fillStyle = i < done ? MINT : CREAM; x.fillRect(-100, -116 + i * 60, 16, 16); x.fillStyle = INK; x.fillText(r, -66, -108 + i * 60) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Walked down the aisle. | *At a sprint.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -200 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.fillStyle = '#e23d4e'; x.fillRect(140, 1110, 800, 40); x.fillStyle = '#ff6b7a'; x.fillRect(140, 1118, 800, 8); x.restore()
      for (let i = 0; i < 5; i++) { const w = 120 + (i % 3) * 60; x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillRect(440 - w - ((lt * 400 + i * 70) % 140), 800 + i * 40, w, 8) }
    },
    front(x, t, lt, P) {
      L(x, 790, 680, 'AISLE: 2 SECONDS', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 34)
      bubble(x, 790, 900, 'DONE! | again?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Only came for | *the rehearsal dinner.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 9))
      for (let i = 0; i < n; i++) drawBits(x, ROLL, ROLL_C, 680 + (i % 3) * 100, 1040 - Math.floor(i / 3) * 70, 13)
      L(x, 790, 680, `ROLLS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: 'gemini', cap: 'Wrote the toast. | *Four different versions.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cards(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.min(3, Math.floor(clamp((lt - 0.3) / 1.2) * 4)), lt)
      L(x, 790, 1120, 'READING: ALL FOUR', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Brought tissues | *for every guest.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(clamp((lt - 0.2) / 1.2) * 8) + 1)
      for (let i = 0; i < n; i++) drawBits(x, TISSUE, TISSUE_C, 720 + (i % 2) * 140, 1080 - Math.floor(i / 2) * 100, 14)
      bubble(x, 520, 620, 'just in case!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Not in the wedding. | *Rehearsed an entrance.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', star: { x: -180 }, hops: [1.2, 1.6],
    back(x, t, lt, P) { spotlight(x, t, pop01(t, P.t0 + 0.2, 0.4, 1.6), 360) },
    front(x, t, lt, P) {
      L(x, 790, 700, 'ENTRANCE: TAKE 12', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04)
      bubble(x, 790, 920, 'from the top!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Taped every mark. | *Every single step.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tapeMarks(x, Math.min(8, Math.floor(clamp((lt - 0.2) / 1.2) * 8) + 1))
      L(x, 790, 700, 'MARK 47 OF 47', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: 'libra', cap: 'Seated everyone | *by sign.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      seating(x, t, 780, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 780, 1130, 'CHART V19', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 38)
    } },
  { sign: 'scorpio', cap: 'Read the practice vows. | *Way too intensely.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'FOREVER.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: BONE, tail: 'bl' })
      bubble(x, 800, 880, 'i mean | FOREVER.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: '#ff6b8a', tail: 'bl' })
      L(x, 790, 1100, 'IT’S JUST PRACTICE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Turned the rehearsal | *into a dance party.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      disco(x, t, 790, 720, 90, pop01(t, P.t0 + 0.2, 0.35, 2))
      notes(x, t, 640, 1000, { n: 4, cell: 7, alpha: clamp(lt * 2) })
      L(x, 800, 1110, 'VOWS: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Ran it with a clipboard. | *And a whistle.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ['walk', 'vows', 'rings', 'kiss'], Math.floor(clamp((lt - 0.4) / 1.2) * 4))
      drawBits(x, WHISTLE, { K: INK, Y: GOLD }, 540, 680, 12 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1130, 'RUN-THROUGH #6', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Pitched a wedding | *in zero gravity.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), up = ease.inCubic(prog(lt, 1.3, 2.4))
      drawBits(x, ROCKET, ROCKET_C, 800, 880 - up * 160 + 6 * Math.sin(t * 20) * (lt > 1.2 ? 1 : 0), 22 * k)
      bubble(x, 790, 610, 'think about it', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
      L(x, 790, 1130, 'VENUE: ORBIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 36)
    } },
  { sign: 'pisces', cap: 'Cried at the rehearsal. | *Of the rehearsal.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 2, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOUQUET, BOUQUET_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      L(x, 790, 650, 'NOBODY’S MARRIED YET', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 28)
      hearts(x, t, 800, 1060, P.t0 + 1.0, { n: 5, life: 1.2, spread: 140, cell: 6, seed: 4 })
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2t0367', key: 'E', accent: '#ff8fb1', ending: 'lesson',
  title: 'Wedding rehearsal | *with the signs.*',
  cameos: CAMEOS,
  group: { cap: 'And that was | *just practice.*' },
  lesson: { text: 'Love makes everyone | *a little extra.*', chip: 'RSVP: YES' },
  last: { text: 'See you | *at the real one.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
