// r2t0110: star_talk, ROLLCALL, "The signs making | breakfast." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's most extreme version of themselves making breakfast.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ ate it straight from the pan · ♉ an eleven-pancake stack, daily · ♊ texting a match, toast: charcoal
//              · ♋ breakfast in bed for their match (and the dog) · ♌ pancakes shaped like their own face
//              · ♍ toast cut into perfect squares · ♎ sweet or savoury? it's now lunch · ♏ won't share the recipe (REDACTED)
//              · ♐ cereal, on a mountaintop · ♑ meal-prepped breakfast till March · ♒ invented a toast robot
//              · ♓ the egg had a face, couldn't eat it
//  49.2        "Twelve signs. | *One smoke alarm.*"
//  52.6        "Pisces’s egg? | *Still smiling.*"  The egg comes back, safe beside a bowl of cereal (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YOLK = '#ffcf3a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', TOAST = '#e0a24a'

// ── props
const PAN = ['..KKKKKKKK.......', '.KGGGGGGGGK......', 'KGGGGGGGGGGKKKKKK', 'KGGGGGGGGGGKHHHHK', '.KGGGGGGGGK.KKKKK', '..KKKKKKKK.......']
const PAN_C = { K: INK, G: '#3a3a52', H: WOOD }
const EGG = ['..WWWW..', '.WWWWWW.', 'WWWYYWWW', 'WWYYYYWW', 'WWYYYYWW', 'WWWYYWWW', '.WWWWWW.', '..WWWW..']
const EGG_C = { W: '#ffffff', Y: YOLK }
const BOWL = ['NNNNNNNNNNNN', '.BBBBBBBBBB.', '.BbBBBBBBbB.', '..BBBBBBBB..', '...BBBBBB...']
const BOWL_C = { N: '#ffd98a', B: CREAM, b: SKYB }
const MTN = ['.....W.....', '....WWW....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']
const MTN_C = { W: '#ffffff', G: '#7a7f99' }
const ROBOT = ['..KKKK....', '.KSSSSK...', '.KSRSRK...', '.KSSSSK...', '..KKKK....', '.KSSSSKKKK', 'KSSSSSSSSK', 'KSSSSSKKKK', '.KSSSSK...', '.K.KK.K...']
const ROBOT_C = { K: INK, S: '#9aa5c4', R: RED }

// a pancake (from the side) or a stack of n
function stack(x, cx, base, n, k, { w = 200 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 30, 0, w + 60, 18); x.fillStyle = '#ffffff'; x.fillRect(-w / 2 - 24, 3, w + 48, 12)
  for (let i = 0; i < n; i++) { const y = -24 - i * 26, wob = Math.sin(i * 1.7) * 8; x.fillStyle = INK; x.fillRect(-w / 2 - 4 + wob, y - 4, w + 8, 28); x.fillStyle = TOAST; x.fillRect(-w / 2 + wob, y, w, 20); x.fillStyle = '#c47a2a'; x.fillRect(-w / 2 + wob, y + 14, w, 6) }
  const top = -24 - (n - 1) * 26
  x.fillStyle = INK; x.fillRect(-26, top - 22, 52, 26); x.fillStyle = '#fff1a8'; x.fillRect(-22, top - 18, 44, 18)
  x.restore()
}
// a slice of toast, optionally burnt
function toast(x, cx, cy, s, { burnt = 0, grid = false, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-74, -84, 148, 164, 30); x.fill()
  x.fillStyle = '#c47a2a'; x.beginPath(); x.roundRect(-68, -78, 136, 152, 26); x.fill()
  const inner = burnt > 0 ? `rgb(${Math.round(lerp(240, 40, burnt))},${Math.round(lerp(200, 30, burnt))},${Math.round(lerp(140, 30, burnt))})` : '#f2d49a'
  x.fillStyle = inner; x.beginPath(); x.roundRect(-56, -66, 112, 128, 18); x.fill()
  if (grid) { x.fillStyle = INK; for (const v of [-20, 18]) { x.fillRect(v, -66, 4, 128); x.fillRect(-56, v, 112, 4) } }
  x.restore()
}
// a breakfast tray with a heart
function tray(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, 30, 360, 28); x.fillStyle = WOOD; x.fillRect(-174, 34, 348, 20)
  x.restore()
  drawBits(x, EGG, EGG_C, cx - 90 * k, cy - 10 * k, 10 * k)
  toast(x, cx + 10 * k, cy - 20 * k, 0.5 * k, { rot: 0.1 })
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx + 110 * k, cy - 20 * k, 8 * k)
}
// a recipe card with black bars
function recipe(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 276)
  x.fillStyle = INK; x.fillRect(-162, -142, 324, 284); x.fillStyle = CREAM; x.fillRect(-154, -134, 308, 268)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY RECIPE', 0, -98)
  for (let i = 0; i < 4; i++) { const w = 220 - (i * 31) % 60; x.fillStyle = lt > 0.5 + i * 0.2 ? INK : '#b9b0a0'; x.fillRect(-120, -46 + i * 46, w, lt > 0.5 + i * 0.2 ? 26 : 10) }
  x.restore()
}
// labelled meal-prep boxes in a stack
function boxes(x, cx, base, k, lt) {
  if (k <= 0.01) return
  const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'MAR?']
  DAYS.forEach((d, i) => {
    const kk = pop01(lt, 0.1 + i * 0.12, 0.25, 2) * k
    if (kk <= 0.01) return
    const col = i % 2, row = Math.floor(i / 2)
    x.save(); x.translate(cx - 85 + col * 170, base - row * 110); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-78, -48, 156, 96); x.fillStyle = 'rgba(200,230,255,0.9)'; x.fillRect(-72, -42, 144, 84)
    x.fillStyle = TOAST; x.fillRect(-56, -10, 50, 36); x.fillStyle = '#ffffff'; x.fillRect(4, -10, 50, 36)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(d, 0, -26)
    x.restore()
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it | *straight from the pan.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 770, 950, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, EGG, EGG_C, 690, 915, 15 * pop01(t, P.t0 + 0.3, 0.3, 2) * (lt < 1.4 ? 1 : 0))
      label(x, 790, 680, 'PLATES: SKIPPED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'TIME: 40 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Eleven pancakes. | *A light snack.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(lt * 7))
      stack(x, 800, 1110, n, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 640, `STACK: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Texting a match. | *Toast: charcoal.*', mood: lt => lt > 1.4 ? 'wide' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      toast(x, 820, 960, 1.15 * pop01(t, P.t0 + 0.15, 0.3, 2), { burnt: ease.inQuad(prog(lt, 0.3, 1.4)) })
      if (lt > 1.0) for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.fillStyle = `rgba(120,110,130,${(0.7 * (1 - ph)).toFixed(3)})`; x.fillRect(780 + i * 40 + Math.sin(ph * 6) * 12, 850 - ph * 170, 30, 30) }
      bubble(x, 790, 680, 'lol you’re SO funny', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Breakfast in bed | *for their match.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      tray(x, 760, 930, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'MADE WITH LOVE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, '+ ONE FOR THE DOG', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Pancakes shaped | *like their own face.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1000, 190 * k, 50 * k, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(800, 994, 180 * k, 42 * k, 0, 0, Math.PI * 2); x.fill()
        signChar(x, t, 'leo', 800, 900, 210 * k, { mood: 'wink', seed: 31, glyph: false, glow: 0 })
        x.save(); x.globalAlpha = 0.35; x.fillStyle = '#c47a2a'; x.beginPath(); x.ellipse(800, 900, 90 * k, 90 * k, 0, 0, Math.PI * 2); x.fill(); x.restore()
      }
      label(x, 790, 650, 'SELF-PORTRAIT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 7, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Toast cut into | *perfect squares.*', mood: 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      toast(x, 800, 920, 1.5 * pop01(t, P.t0 + 0.15, 0.3, 2), { grid: lt > 0.8 })
      label(x, 800, 1140, 'EACH: 3.80 CM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sweet or savoury? | *It’s now lunch.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 118 - 5, Math.sin(a) * 118 - 5, 10, 10) }
        const hr = lerp(-Math.PI / 2 - Math.PI * 2 / 12 * 4, -Math.PI / 2, ease.inOutCubic(prog(lt, 0.3, 1.5)))
        const mn = hr * 12
        x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(hr) * 70, Math.sin(hr) * 70); x.stroke()
        x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(mn) * 110, Math.sin(mn) * 110); x.stroke()
        x.restore()
      }
      label(x, 790, 1130, '12:00. STILL DECIDING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Won’t share the recipe. | *Not even with mum.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      recipe(x, 800, 880, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 1110, 'REDACTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Cereal, but | *on a mountaintop.*', mood: 'sparkle', look: [1, 0], star: { x: -220, y: -40 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      drawBits(x, MTN, MTN_C, 560, 1010, 52 * pop01(t, P.t0 + 0.1, 0.35, 2))
    },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 830, 820, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 1150, 'VIEW: WORTH IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Meal-prepped breakfast | *until March.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      boxes(x, 800, 1080, pop01(t, P.t0 + 0.1, 0.3, 2), lt)
      label(x, 800, 650, 'DONE BY 6:00 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Didn’t make toast. | *Built a toast robot.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, ROBOT, ROBOT_C, 780, 930, 30 * k)
      const fl = ease.outCubic(prog(lt, 1.0, 1.5))
      if (lt > 1.0) toast(x, lerp(900, 880, fl), lerp(880, 700, fl) + Math.sin(Math.PI * fl) * -40, 0.55, { rot: fl * 3 })
      label(x, 790, 1140, 'PATENT PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The egg had a face. | *Couldn’t eat it.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1010, 170 * k, 46 * k, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(800, 1004, 160 * k, 38 * k, 0, 0, Math.PI * 2); x.fill()
        drawBits(x, EGG, EGG_C, 800, 920, 22 * k)
        x.fillStyle = INK; x.fillRect(782, 910, 10, 10); x.fillRect(808, 910, 10, 10); x.fillRect(786, 934, 28, 6); x.fillRect(782, 928, 6, 6); x.fillRect(812, 928, 6, 6)
      }
      bubble(x, 800, 690, 'he’s SMILING', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0110', key: 'F', accent: YOLK, ending: 'callback',
  title: 'The signs making | *breakfast.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One smoke alarm.*' },
  last: {
    text: 'Pisces’s egg? | *Still smiling.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) {
        drawBits(x, EGG, EGG_C, 400, 1060, 42 * k)
        x.fillStyle = INK; const ex = 400, ey = 1046
        x.fillRect(ex - 34, ey - 18, 18 * k, 18 * k); x.fillRect(ex + 16, ey - 18, 18 * k, 18 * k); x.fillRect(ex - 26, ey + 30, 52 * k, 10 * k); x.fillRect(ex - 34, ey + 20, 10 * k, 10 * k); x.fillRect(ex + 24, ey + 20, 10 * k, 10 * k)
      }
      drawBits(x, BOWL, BOWL_C, 740, 1160, 28 * pop01(t, t0 + 0.8, 0.4, 2))
      signChar(x, t, 'pisces', 740, 920, 270, { mood: lt > 1.4 ? 'heart' : 'happy', pop: pop01(t, t0 + 1.0, 0.4, 2), seed: 9, hops: [t0 + 1.4], tears: 1, look: [-1, 0] })
      hearts(x, t, 400, 940, t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
