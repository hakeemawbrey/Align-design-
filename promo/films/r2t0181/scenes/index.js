// r2t0181: star_talk, BE LIKE, "Fresh sheets night? | Zodiacs be like." (topic: a fresh bedsheets night) (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each one's most extreme fresh-sheets night. Ending: group.
//   0.0–3.6    "Fresh sheets night? | Zodiacs *be like.*"
//   3.6–49.2   ♈ dived in from the hallway · ♉ hasn't moved in eleven hours · ♊ called three people to describe it
//              · ♋ built a pillow nest, moved in · ♌ new profile pic: in bed · ♍ showered twice, then got in
//              · ♎ twelve pillows, arranged by mood · ♏ nobody else touches this bed · ♐ came home muddy, slept in boots
//              · ♑ bedtime 8:00 sharp, alarm set for joy · ♒ slept on the floor to keep them fresh · ♓ too soft, cried
//  49.2        GROUP (the ending): "Fresh sheets. | *Cancel everything.*"  a DO NOT DISTURB sign swings over the photo.
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, calendar, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const L = { x: -170 }
// a side-on bed: wooden headboard on the left, a mattress with a fresh sheet, a pillow
function bed(x, cx, cy, k, { w = 640, sheet = SKYB, pillow = PAPER, mess = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const l = -w / 2
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, -40, w, 150)
  x.fillStyle = INK; x.fillRect(l - 6, -150, 46, 270); x.fillStyle = WOOD; x.fillRect(l, -144, 34, 258)
  x.fillStyle = INK; x.fillRect(l + 30, -36, w - 24, 112); x.fillRect(w / 2 - 34, 60, 30, 60); x.fillRect(l + 40, 60, 30, 60)
  x.fillStyle = PAPER; x.fillRect(l + 36, -30, w - 36, 40)
  x.fillStyle = sheet; x.fillRect(l + 36, 0, w - 36, 70)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(l + 36, 4, w - 36, 10)
  if (mess) { x.fillStyle = '#7a5a3a'; for (let i = 0; i < 7; i++) x.fillRect(l + 140 + i * 62, -26 + (i % 2) * 12, 30, 18) }
  x.fillStyle = INK; x.fillRect(l + 44, -78, 130, 56); x.fillStyle = pillow; x.fillRect(l + 50, -72, 118, 44)
  x.restore()
}
const sheetSparkle = (x, t, cx, cy, n = 5, col = BONE) => { for (let i = 0; i < n; i++) { const ph = (t * 0.9 + i / n) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = col; const px = cx - 240 + i * 120, py = cy - 30 - ph * 60; x.fillRect(px - 4, py - 12, 8, 24); x.fillRect(px - 12, py - 4, 24, 8); x.restore() } }
// a pair of muddy boots
const BOOT = ['.BBB...', '.BBB...', '.BBB...', '.BBBBB.', 'BBBBBBB', 'KKKKKKK']
function pillowPile(x, t, t0, cx, cy, n) {
  for (let i = 0; i < n; i++) { const kk = pop01(t, t0 + 0.2 + i * 0.12, 0.25, 2); if (kk <= 0.01) continue; const r = Math.floor(i / 3), c = i % 3; bits(x, 'pillow', cx - 110 + c * 110 + (r % 2) * 50, cy - r * 62, 10 * kk, { rot: (c - 1) * 0.12 }); }
}
function sign(x, cx, cy, k, text, { bg = RED, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-70, -80); x.lineTo(0, -150); x.lineTo(70, -80); x.stroke()
  x.fillStyle = INK; x.fillRect(-170, -86, 340, 172); x.fillStyle = bg; x.fillRect(-162, -78, 324, 156)
  x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((s, i, a) => x.fillText(s.trim(), 0, (i - (a.length - 1) / 2) * 52 + 2))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Dived in | *from the hallway.*', mood: lt => lt < 0.9 ? 'wide' : 'sparkle', star: { x: -40, y: -170, s: 260 }, hops: [0.5, 0.9],
    back(x, t, lt, P) {
      bed(x, 540, 1060, 1, { sheet: '#ff9a8a' })
      // speed lines from the doorway on the left
      const p = clamp(lt / 0.9)
      x.save(); x.globalAlpha = 0.7 * (1 - p * 0.6); x.fillStyle = BONE
      for (let i = 0; i < 5; i++) x.fillRect(150 + i * 8, 620 + i * 34, 180 - i * 20, 10)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 600, 'RUN-UP: 9 M', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 760, 900, 'LANDING: PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Hasn’t moved | *in eleven hours.*', mood: 'sleepy', star: { x: -60, y: 40, s: 280 },
    back(x, t, lt, P) { bed(x, 540, 1060, 1, { sheet: '#8fd8a0' }); sheetSparkle(x, t, 540, 1050, 5) },
    front(x, t, lt, P) {
      const h = Math.min(11, Math.floor(1 + 10 * ease.outCubic(prog(lt, 0.2, 1.6))))
      label(x, 790, 640, `HOUR ${h}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 56, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 830, 'never | leaving.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Called three people | *to describe it.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { top: 'CALL 3', head: 'ON SPEAKER', msg: 'it’s SO | crisp', bg: SKYB })
      bubble(x, 790, 1110, 'like a cloud!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Built a nest. | *Moved in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      pillowPile(x, t, P.t0, 790, 1080, 8)
      label(x, 790, 640, 'NEST: COMPLETE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'New profile pic: | *in bed.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = BONE; x.fillRect(-142, -192, 284, 384)
        x.fillStyle = '#ffb34a'; x.fillRect(-120, -170, 240, 230)
        x.restore()
        signChar(x, t, 'leo', 790, 760, 160 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.6 })
        x.save(); x.translate(790, 830); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎ LEO, 24', 0, 110); x.fillStyle = '#7a6a9a'; x.font = `700 22px ${MONO}`; x.fillText('fresh sheets era', 0, 152)
        x.restore()
      }
      const f = lt - 1.0
      if (f > 0 && f < 0.3) { x.save(); x.globalAlpha = 0.6 * (1 - f / 0.3); x.fillStyle = '#fff'; x.beginPath(); x.arc(790, 830, 260, 0, 7); x.fill(); x.restore() }
      label(x, 790, 1100, 'LIKES: ALL 12 SIGNS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Showered *twice.* | Then got in.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1 ? 'shower ✓ | shower ✓ | bed ✦' : 'shower ✓ | shower ✓', { head: 'BEFORE BED', headBg: MINT, size: 40, w: 340 })
      // bubbles rising
      for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * ph); x.strokeStyle = SKYB; x.lineWidth = 4; x.beginPath(); x.arc(620 + i * 70, 1100 - ph * 160, 12 + (i % 3) * 5, 0, 7); x.stroke(); x.restore() }
    } },
  { sign: 'libra', cap: 'Twelve pillows. | *Arranged by mood.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : 0, 0], star: L,
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.2) / 0.1) + 1)
      for (let i = 0; i < n; i++) { const r = Math.floor(i / 3), c = i % 3; const kk = pop01(t, P.t0 + 0.25 + i * 0.13, 0.2, 2); x.save(); x.translate(680 + c * 110, 1130 - r * 80); x.scale(kk, kk); x.fillStyle = INK; x.fillRect(-52, -30, 104, 60); x.fillStyle = COLS[(r + c) % 6]; x.fillRect(-46, -24, 92, 48); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(-46, -24, 92, 8); x.restore() }
      label(x, 790, 640, 'CALM · COZY · CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Nobody else | *touches this bed.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      sign(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'PRIVATE | BED', { bg: '#a0357a', rot: 0.04 * Math.sin(t * 2) })
      label(x, 790, 1060, 'NOT EVEN THE CAT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Came home muddy. | *Slept in boots.*', mood: 'sleepy', star: { x: -40, y: 40, s: 280 },
    back(x, t, lt, P) { bed(x, 540, 1060, 1, { sheet: '#ffd23a', mess: lt > 0.8 ? 1 : 0 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      drawB(x, 760, 960, 14 * k, 0.2); drawB(x, 850, 975, 14 * k, -0.15)
      label(x, 790, 640, 'TRAIL: ON THE SHEETS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'In bed by 8:00. | *Sharp.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'TONIGHT', '8:00', { topBg: '#9aa5c4' })
      label(x, 790, 1060, 'FUN: SCHEDULED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Slept on the floor. | *To keep them fresh.*', mood: 'sleepy', star: { x: -60, y: 150, s: 260 },
    back(x, t, lt, P) { bed(x, 540, 860, 1, { sheet: '#6fc3ff' }); sheetSparkle(x, t, 540, 850, 5) },
    front(x, t, lt, P) {
      label(x, 780, 1150, 'LOGIC: FLAWLESS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 620, 'UNTOUCHED ✓', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Too soft. | Pisces *cried.*', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -60, y: 40, s: 280 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bed(x, 540, 1060, 1, { sheet: LAV }); sheetSparkle(x, t, 540, 1050, 5) },
    front(x, t, lt, P) {
      hearts(x, t, 760, 900, P.t0 + 0.5, { n: 6, life: 2.0, spread: 200, cell: 8, seed: 5 })
      bubble(x, 790, 620, 'it hugged me', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
]
function drawB(x, cx, cy, cell, rot) { if (cell > 0.2) drawBits(x, BOOT, { B: '#8a5a3a', K: '#4a2e1a' }, cx, cy, cell, { rot }) }

const F = makeFilm({
  id: 'r2t0181', key: 'C', accent: SKYB, ending: 'group',
  title: 'Fresh sheets night? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Fresh sheets. | *Cancel everything.*',
    draw(x, t, lt) { sign(x, 540, 700, pop01(t, t - lt + 1.4, 0.4, 2), 'DO NOT | DISTURB', { bg: '#a0357a', rot: 0.08 * Math.sin(t * 2.4) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
