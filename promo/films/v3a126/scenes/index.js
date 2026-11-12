// v3a126: star_advice, ADVICE ROLL CALL, "What makes each sign | feel safe." (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm, specific line each, one light visual gag each.
//   0.0–3.6    "What makes each sign | *feel safe.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries: a road sign, STRAIGHT TALK · Taurus: a fridge that opens full · Gemini: a zigzag of tangents,
//              WHERE WAS I? · Cancer: a spare key on a heart keyring · Leo: Sagittarius holds up THIS IS MY LEO
//              · Virgo: a calendar ticked, ON TIME. SWOON. · Libra: big headphones, CALM: ON · Scorpio: a thick book,
//              THE WHOLE STORY · Sagittarius: a balloon tied to a heart · Capricorn: folders A, B, C · Aquarius: a bubble
//              of squiggles and Gemini says "totally." · Pisces cries, Capricorn passes a tissue
//  49.2        "Safe looks different | *on everyone.*"  group photo.
//  52.4        LESSON UNLOCKED: "Ask them what | *feels safe.*"  TRUST: BUILT
//  58.3        "Taurus’ fridge? | *Always open.*"  No match card.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', ACC = '#7dffb0'
const HEARTB = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const KEY = ['..YYY.........', '.Y...Y........', 'Y.....YYYYYYYY', 'Y.....Y...Y.Y.', '.Y...Y........', '..YYY.........']
const TISSUE = ['...WW...', '..WWWW..', '.WW..WW.', 'BBBBBBBB', 'BPBPBPBB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, P: PINK }
const FOOD = [
  ['RRR', '#ff7a5a'], ['GG', '#5fd068'], ['YYYY', GOLD], ['PP', PINK], ['WWW', '#f4eee2'], ['OO', '#ff9a3c'],
]

function box(x, cx, cy, w, h, col, { rot = 0, k = 1, ink = INK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = ink; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, { col = INK, font = INTER, w = 800 } = {}) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who | *says it straight.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, -40, 28, 340); x.fillStyle = '#9aa3c7'; x.fillRect(-8, -34, 16, 330)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -150); x.lineTo(120, -150); x.lineTo(190, -80); x.lineTo(120, -10); x.lineTo(-170, -10); x.closePath(); x.fill()
        x.fillStyle = '#2fc79a'; x.beginPath(); x.moveTo(-162, -142); x.lineTo(116, -142); x.lineTo(178, -80); x.lineTo(116, -18); x.lineTo(-162, -18); x.closePath(); x.fill()
        text(x, 'STRAIGHT', -20, -104, 40, { col: BONE }); text(x, 'TALK →', -20, -56, 40, { col: BONE })
        x.restore()
      }
    } },
  { sign: 'taurus', cap: 'A plan. And | *a full fridge.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), op = ease.inOutCubic(prog(lt, 0.6, 1.0))
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -270, 300, 540); x.fillStyle = '#e8f6ff'; x.fillRect(-142, -262, 284, 524)
        x.fillStyle = '#fff6c9'; x.fillRect(-130, -250, 260, 500)
        for (let r = 0; r < 4; r++) {
          x.fillStyle = INK; x.fillRect(-130, -130 + r * 120, 260, 8)
          for (let i = 0; i < 3; i++) { const [, c] = FOOD[(r * 3 + i) % FOOD.length]; x.fillStyle = INK; x.fillRect(-110 + i * 80 - 4, -196 + r * 120 - 4, 64, 66); x.fillStyle = c; x.fillRect(-110 + i * 80, -196 + r * 120, 56, 58) }
        }
        // the door swings open (narrows to the right)
        const dw = lerp(284, 30, op)
        x.fillStyle = INK; x.fillRect(142 - dw - 6, -268, dw + 12, 536); x.fillStyle = '#cfe9f7'; x.fillRect(142 - dw, -262, dw, 524)
        x.restore()
      }
      if (lt > 1.0) sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 230, 0.3)
    } },
  { sign: 'gemini', cap: 'Someone who loves | *the tangents.*', mood: 'happy', look: [1, -1], star: { x: -220 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 1.4))
      const pts = [[460, 700], [640, 600], [580, 820], [820, 700], [720, 960], [900, 900], [840, 1100]]
      x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.setLineDash([22, 14]); x.lineCap = 'round'; x.beginPath()
      const n = 1 + p * (pts.length - 1), m = Math.floor(n)
      x.moveTo(...pts[0]); for (let i = 1; i <= m && i < pts.length; i++) x.lineTo(...pts[i])
      if (m < pts.length - 1) { const f = n - m, a = pts[m], b = pts[m + 1]; x.lineTo(lerp(a[0], b[0], f), lerp(a[1], b[1], f)) }
      x.stroke(); x.restore()
      label(x, 760, 1150, 'WHERE WAS I? WHO CARES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A *spare key.* | And a hug.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2.2), sw = Math.sin(t * 3) * 0.15
      x.save(); x.translate(780, 720); x.rotate(sw)
      x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, -80 * k); x.lineTo(0, 30 * k); x.stroke()
      drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, 0, 0, 16 * k)
      drawBits(x, KEY, { Y: GOLD }, 60 * k, 160 * k, 18 * k, { rot: Math.PI / 2 })
      x.restore()
      label(x, 780, 1140, 'YOURS. ANYTIME.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Being introduced | *with pride.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 1030, 170 * k, { mood: 'happy', look: [-1, -1], seed: 21, glyph: false, hops: [P.t0 + 1.0] })
      const s = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (s > 0.01) {
        x.save(); x.translate(760, 720); x.rotate(-0.05); x.scale(s, s)
        x.fillStyle = INK; x.fillRect(-10, 60, 20, 200); x.fillStyle = WOOD; x.fillRect(-5, 64, 10, 194)
        x.fillStyle = INK; x.fillRect(-190, -80, 380, 150); x.fillStyle = BONE; x.fillRect(-182, -72, 364, 134)
        text(x, 'THIS IS MY LEO', 0, -30, 40); text(x, '← ← ←', 0, 20, 40, { col: '#f39a3a' })
        x.restore()
      }
    } },
  { sign: 'virgo', cap: 'Someone who shows up | *on time.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -170, 320, 340); x.fillStyle = '#f4eee2'; x.fillRect(-152, -162, 304, 324)
        x.fillStyle = '#ef5c94'; x.fillRect(-152, -162, 304, 70); text(x, 'FRIDAY', 0, -126, 36, { col: BONE, font: MONO, w: 700 })
        text(x, '7:00', 0, -20, 80)
        x.restore()
        const c = pop01(t, P.t0 + 0.9, 0.3, 2.4)
        if (c > 0.01) { x.save(); x.translate(790, 960); x.scale(c, c); x.strokeStyle = INK; x.lineWidth = 26; x.lineCap = 'round'; x.beginPath(); x.moveTo(-70, 0); x.lineTo(-20, 50); x.lineTo(80, -60); x.stroke(); x.strokeStyle = '#5fd068'; x.lineWidth = 14; x.stroke(); x.restore() }
      }
      label(x, 790, 640, 'ON TIME. SWOON.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A calm voice | *in a loud room.*', mood: lt => lt > 1.0 ? 'happy' : 'wide', look: [0, 0], star: { x: 0 },
    back(x, t, lt, P) {
      const q = 1 - ease.inCubic(prog(lt, 0.7, 1.1))
      if (q <= 0.01) return
      x.save(); x.globalAlpha = q; x.strokeStyle = LAV; x.lineWidth = 8
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t; const r = 230 + Math.sin(t * 9 + i) * 20; x.beginPath(); x.moveTo(540 + Math.cos(a) * r, 860 + Math.sin(a) * r); x.lineTo(540 + Math.cos(a + 0.2) * (r + 60), 860 + Math.sin(a + 0.2) * (r + 50)); x.lineTo(540 + Math.cos(a + 0.1) * (r + 110), 860 + Math.sin(a + 0.1) * (r + 110)); x.stroke() }
      x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy - 10); x.scale(k, k)
        x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, -10, 150, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
        x.strokeStyle = MINT; x.lineWidth = 20; x.stroke()
        for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 150 - 40, -50, 80, 110); x.fillStyle = MINT; x.fillRect(s * 150 - 32, -42, 64, 94) }
        x.restore()
      }
      label(x, 540, 1140, 'CALM: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Hearing | *the whole story.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -200, 300, 400)
        for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? '#f4eee2' : '#e2d9c4'; x.fillRect(110, -190 + 4 + i * 38, 32, 36) }
        x.fillStyle = '#e23d66'; x.fillRect(-142, -192, 252, 384)
        x.fillStyle = GOLD; x.fillRect(-120, -150, 208, 10); x.fillRect(-120, 130, 208, 10)
        text(x, 'THE', -16, -90, 36, { col: GOLD }); text(x, 'WHOLE', -16, -36, 44, { col: GOLD }); text(x, 'STORY', -16, 18, 44, { col: GOLD })
        text(x, 'VOL. 1–9', -16, 80, 26, { col: BONE, font: MONO, w: 700 })
        x.restore()
      }
      label(x, 790, 1170, 'NO SKIPPING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Freedom. With | *a home base.*', mood: 'sparkle', look: [1, -1], star: { x: -230, y: 40 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8), bob = Math.sin(t * 2) * 14, bx = 800, by = 720 + bob
      if (k > 0.01) {
        x.save(); x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(bx, by + 200 * k); x.quadraticCurveTo(bx - 80, 1000, 660, 1110); x.stroke(); x.restore()
        x.save(); x.translate(bx, by); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        const C = ['#a35cf0', GOLD, '#a35cf0', PINK, '#a35cf0']
        for (let i = 0; i < 5; i++) { x.fillStyle = C[i]; x.beginPath(); x.ellipse(-112 + i * 56, 0, 30, 140 - Math.abs(i - 2) * 18, 0, 0, Math.PI * 2); x.fill() }
        x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-90, 110); x.lineTo(-50, 180); x.moveTo(90, 110); x.lineTo(50, 180); x.stroke()
        x.fillStyle = INK; x.fillRect(-60, 170, 120, 70); x.fillStyle = WOOD; x.fillRect(-52, 178, 104, 54)
        x.restore()
        drawBits(x, HEARTB, { H: '#ff4f86', W: '#fff' }, 660, 1120, 12 * k)
      }
      label(x, 420, 600, 'TETHERED. HAPPILY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A plan B. | *And a plan C.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      ;['A', 'B', 'C'].forEach((l, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2.2)
        if (k <= 0.01) return
        x.save(); x.translate(760 + i * 40, 1000 - i * 120); x.rotate(-0.04 + i * 0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillRect(-150, -110, 110, 40)
        const c = ['#2fc79a', GOLD, PINK][i]; x.fillStyle = c; x.fillRect(-142, -72, 284, 144); x.fillRect(-142, -102, 94, 34)
        text(x, `PLAN ${l}`, 0, 4, 46)
        x.restore()
      })
      label(x, 780, 1160, 'BACKUPS: ON FILE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Being understood. | *No footnotes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.5],
    front(x, t, lt, P) {
      const b = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (b > 0.01) {
        x.save(); x.translate(430, 610); x.scale(b, b)
        box(x, 0, 0, 300, 120, BONE)
        x.strokeStyle = INK; x.lineWidth = 6
        for (let i = 0; i < 5; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const px = -120 + i * 52 + j * 4, py = -20 + Math.sin(j * 1.4 + i * 2) * 18 + (i % 2) * 20; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
        x.restore()
      }
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 970, 200 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 820, 700, 'totally.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Crying, and someone | *passes the tissues.*', mood: 'neutral', tears: lt => lt > 1.5 ? 2 : 3, look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 840, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.2] })
      const hand = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, TISSUE, TISSUE_C, lerp(760, 560, hand), 1060, 15 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 700, 640, 'TISSUE: DELIVERED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a126', key: 'D', accent: ACC, ending: 'lesson',
  title: 'What makes each | sign *feel safe.*',
  cameos: CAMEOS,
  group: { cap: 'Safe looks different | *on everyone.*' },
  lesson: { text: 'Ask them what | *feels safe.*', chip: 'TRUST: BUILT' },
  last: { text: 'Taurus’ fridge? | *Always open.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
