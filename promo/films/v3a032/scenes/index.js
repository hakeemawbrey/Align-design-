// v3a032: star_advice, ADVICE SOLO, "Cancer, your gift | is this." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quiet gifts of a Cancer, one gag each.
//   0.0–3.6    "Cancer, your gift | *is this.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a bare room becomes home (lamp + rug: HOME IN 5 MIN) · remembers every birthday (a calendar of hearts)
//              · a hug that actually fixes Gemini · spots the quiet one (Aquarius: come sit with us!)
//              · cooking as a love letter (a pot steaming hearts) · keeps every memory (the album, VOL. 14)
//              · "text me when you're home" (phone) · a new match gets a care package (FIRST DATE KIT)
//              · loves like it's their job (a name badge: FULL-TIME HEART)
//  37.8        group ending: "Home is | *a person.*"  Cancer comes back, heart eyes.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', WARM = '#ffd27a'
const S = 'cancer'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a floor lamp, glowing
function lamp(x, t, cx, cy, k, on) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (on > 0.01) {
    const g = x.createRadialGradient(0, -170, 10, 0, -170, 300)
    g.addColorStop(0, `rgba(255,210,122,${0.55 * on})`); g.addColorStop(1, 'rgba(255,210,122,0)')
    x.fillStyle = g; x.fillRect(-300, -470, 600, 600)
  }
  x.fillStyle = INK; x.fillRect(-10, -150, 20, 300); x.fillRect(-70, 140, 140, 24)
  x.beginPath(); x.moveTo(-90, -150); x.lineTo(90, -150); x.lineTo(60, -250); x.lineTo(-60, -250); x.closePath(); x.fill()
  x.fillStyle = on > 0.5 ? WARM : '#a08a6a'; x.beginPath(); x.moveTo(-80, -158); x.lineTo(80, -158); x.lineTo(54, -242); x.lineTo(-54, -242); x.closePath(); x.fill()
  x.fillStyle = WOOD; x.fillRect(-64, 144, 128, 14)
  x.restore()
}
function rug(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 230, 52, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, 0, 222, 45, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffc2d6'; x.beginPath(); x.ellipse(0, 0, 160, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, 0, 100, 18, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a wall calendar, filling with hearts
function calendar(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 380)
  x.fillStyle = '#fff4e2'; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = RED; x.fillRect(-162, -182, 324, 70)
  x.fillStyle = '#fff'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BIRTHDAYS', 0, -146)
  x.restore()
  for (let i = 0; i < 20; i++) {
    const r = Math.floor(i / 5), c = i % 5
    const px = cx + (-128 + c * 64) * k, py = cy + (-70 + r * 64) * k
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(px - 26 * k, py - 26 * k, 52 * k, 52 * k)
    if (i < n) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, px, py, 6 * k * pop01(t, t - 0.01 - 0 * i, 0.01))
  }
}
// a cooking pot with heart-shaped steam
function pot(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -70, 340, 170); x.fillRect(-200, -60, 40, 30); x.fillRect(160, -60, 40, 30); x.fillRect(-180, -96, 360, 34)
  x.fillStyle = '#e26a3a'; x.fillRect(-162, -62, 324, 154); x.fillStyle = '#ff8a5a'; x.fillRect(-172, -90, 344, 22)
  x.fillStyle = '#fff4e2'; x.fillRect(-120, -20, 60, 14)
  x.restore()
  for (let i = 0; i < 4; i++) {
    const ph = ((t * 0.6 + i / 4) % 1)
    drawBits(x, HEART, { H: i % 2 ? PINK : '#ff4f86', W: '#fff' }, cx + (-90 + i * 60) * k + 14 * Math.sin(ph * 6 + i), cy - (120 + ph * 230) * k, 9 * k, { alpha: Math.sin(Math.PI * ph) * 0.95 })
  }
}
// a photo album, pages fanned with little photos
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -140, 400, 280)
  x.fillStyle = '#8c3a28'; x.fillRect(-192, -132, 384, 264)
  x.fillStyle = '#fff4e2'; x.fillRect(-180, -122, 176, 244); x.fillRect(4, -122, 176, 244)
  const ph = [[-140, -80, SKYB], [-60, -10, PINK], [-130, 60, MINT], [50, -70, GOLD], [120, 10, LAV], [60, 70, '#ffc2d6']]
  ph.forEach(([px, py, c], i) => { x.save(); x.translate(px, py); x.rotate((i % 2 ? 1 : -1) * 0.12); x.fillStyle = INK; x.fillRect(-36, -34, 72, 70); x.fillStyle = '#fff'; x.fillRect(-32, -30, 64, 62); x.fillStyle = c; x.fillRect(-26, -24, 52, 40); x.restore() })
  x.fillStyle = INK; x.fillRect(-4, -132, 8, 264)
  x.restore()
}
function phoneMsg(x, cx, cy, k, msg, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -190, 248, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = col; x.fillRect(-92, -70, 184, 110)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  msg.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -34 + i * 36))
  x.restore()
}
// a cardboard care package with a heart sticker
function carePackage(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -100, 340, 220)
  x.fillStyle = '#d9a066'; x.fillRect(-162, -92, 324, 204)
  x.save(); x.translate(-170, -100); x.rotate(-0.5 * open); x.fillStyle = INK; x.fillRect(0, -8, 176, 24); x.fillStyle = '#c48a52'; x.fillRect(4, -4, 168, 16); x.restore()
  x.save(); x.translate(170, -100); x.rotate(0.5 * open); x.fillStyle = INK; x.fillRect(-176, -8, 176, 24); x.fillStyle = '#c48a52'; x.fillRect(-172, -4, 168, 16); x.restore()
  x.restore()
  drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, cx, cy + 20 * k, 13 * k)
  if (open > 0.5) {
    drawBits(x, ['.CCCC.', 'CCdCCC', 'CCCCdC', '.CCCC.'], { C: '#e7b46a', d: '#5b2e1a' }, cx - 70 * k, cy - 130 * k, 12 * k * open, { rot: -0.2 })
    drawBits(x, ['..R..', '.RGR.', '..G..', '..G..'], { R: PINK, G: '#5fd068' }, cx + 70 * k, cy - 140 * k, 14 * k * open)
  }
}
// a staff name badge
function nameBadge(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-176, -96, 360, 210)
  x.fillStyle = INK; x.fillRect(-184, -110, 368, 216)
  x.fillStyle = '#fff4e2'; x.fillRect(-176, -102, 352, 200)
  x.fillStyle = SKYB; x.fillRect(-176, -102, 352, 60)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO, I’M', 0, -72)
  x.font = `800 44px ${INTER}`; x.fillText('FULL-TIME', 0, 6); x.fillText('HEART', 0, 56)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You make anywhere | *feel like home.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.3],
    back(x, t, lt, P) { rug(x, 640, 1110, pop01(t, P.t0 + 0.5, 0.35, 2)) },
    front(x, t, lt, P) {
      lamp(x, t, 820, 900, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 1.0) * 4))
      label(x, 760, 640, 'HOME IN 5 MINUTES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You remember | *every birthday.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.5) / 1.0) * 20))
      label(x, 790, 1120, 'NO REMINDERS NEEDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your hugs | *actually fix things.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -120, y: 20, s: 260 }, hops: [0.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), close = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (k > 0.01) signChar(x, t, 'gemini', lerp(860, 700, close), 900, 230 * k, { mood: lt > 1.2 ? 'happy' : 'neutral', look: [-1, 1], tears: lt < 1.2 ? 1 : 0, seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 600, 640, 'BAD DAY: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You always spot | *the quiet one.*', mood: 'happy', look: [1, 0], star: { x: -210 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 850, 1040, 140 * k, { mood: lt > 1.3 ? 'sparkle' : 'neutral', look: [lt > 1.3 ? -1 : 0, 1], seed: 22, glyph: false, hops: lt > 1.3 ? [P.t0 + 1.5] : [] })
      bubble(x, 650, 660, 'come sit | with us!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 850, 960, P.t0 + 1.4, { n: 4, life: 1.2, spread: 80, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Your cooking | *is a love letter.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      pot(x, t, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'SECRET INGREDIENT: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You keep | *every memory.*', mood: 'sparkle', look: [1, 1], star: { x: -220 }, tears: lt => lt > 1.3 ? 1 : 0,
    front(x, t, lt, P) {
      album(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1120, 'VOLUME 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Text me when | you’re home.” *Always.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phoneMsg(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'home safe? | text me!', SKYB)
      if (lt > 1.2) bubble(x, 790, 1060, 'home!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Your new match | *gets a care package.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      carePackage(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack ? clamp((lt - 0.8) * 2) : 0)
      label(x, 790, 650, 'FIRST DATE KIT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You love | *like it’s your job.*', mood: 'heart', look: [1, 0], star: { x: -210 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      nameBadge(x, 790, 870, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1110, 'NO DAYS OFF (TAKE ONE)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a032', key: 'E', accent: WARM, solo: S, ending: 'group',
  title: 'Cancer, your gift | *is this.*',
  cameos: CAMEOS,
  group: {
    cap: 'Home is | *a person.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
