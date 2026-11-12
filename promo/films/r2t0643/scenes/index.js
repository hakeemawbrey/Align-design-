// r2t0643: star_talk, BELIKE, "Spilled coffee? | Zodiacs be like." (topic: Zodiacs spilling coffee on themselves be like)
// (~54 s vertical, signs3kit social cut, music: lofi · G). Twelve signs in zodiac order, each one's most extreme reaction to
// a coffee stain on their own shirt. Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ spilled it mid-sprint, didn't stop · ♉ mourned the coffee, not the shirt · ♊ "limited edition" shirt
//              · ♋ spilled on themselves, apologised to you · ♌ stain? now it's a look (profile pic updated)
//              · ♍ had a backup shirt, and a backup backup · ♎ before the first date: four outfit changes
//              · ♏ nobody saw, nobody will · ♐ laughed it off, spilled another · ♑ kept working, stain and all
//              · ♒ invented a spill-proof cup · ♓ one drop, full meltdown
//  49.2        group (the ending): "Same coffee. | *Twelve meltdowns.*"  Over the photo: NEXT TIME: A LID.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const COFFEE = '#b5763a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#6a3a1e'

// ── props
const CUP = [
  '.WWWWWWWW...',
  'WWBBBBBBWW..',
  'WWWWWWWWWWKK',
  'WWWWWWWWWW.K',
  'WWWWWWWWWW.K',
  'WWWWWWWWWWKK',
  '.WWWWWWWW...',
  '..WWWWWW....',
]
const CUP_C = { W: CREAM, B: BROWN, K: INK }
const SHIRT = [
  '..WWW..WWW..',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '..WWWWWWWW..',
  '..WWWWWWWW..',
  '..WWWWWWWW..',
  '..WWWWWWWW..',
  '..WWWWWWWW..',
]
const SHADES = ['KKKKKKKKKKKKK', 'KBBBBK.KBBBBK', 'KBWBBK.KBWBBK', '.KKKK...KKKK.']
const LAPTOP = [
  '.KKKKKKKKKKKK.',
  '.KSSSSSSSSSSK.',
  '.KSGGGSSGGSSK.',
  '.KSSSSSSSSSSK.',
  '.KSGGSSGGGSSK.',
  '.KKKKKKKKKKKK.',
  'MMMMMMMMMMMMMM',
]
const LAPTOP_C = { K: INK, S: '#2a2350', G: MINT, M: '#9aa5c4' }

// a brown splash that blooms on a shirt
function stain(x, cx, cy, r) {
  if (r <= 0.5) return
  x.save(); x.fillStyle = COFFEE
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 6; i++) { const a = i * 1.1 + 0.4; x.beginPath(); x.arc(cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.1, r * 0.32, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function shirt(x, cx, cy, cell, col, stainR, rot = 0) {
  if (cell <= 0.01) return
  drawBits(x, SHIRT, { W: col }, cx, cy, cell, { rot })
  stain(x, cx + cell * 0.6, cy + cell * 0.8, stainR * cell / 16)
}
// a cup with a little robot antenna and a lid (Aquarius' invention)
function smartCup(x, cx, cy, k, t) {
  if (k <= 0.01) return
  drawBits(x, CUP, { W: '#9aa5c4', B: '#5a6698', K: INK }, cx, cy, 18 * k)
  x.save(); x.translate(cx - 20 * k, cy - 80 * k); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -14, 180, 26); x.fillStyle = MINT; x.fillRect(-84, -8, 168, 14)
  x.fillStyle = INK; x.fillRect(-4, -70, 8, 58)
  x.fillStyle = Math.sin(t * 10) > 0 ? '#ff4f86' : GOLD; x.beginPath(); x.arc(0, -76, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
// three folded shirts, stacked
function shirtStack(x, cx, cy, k, n) {
  const COLS = [SKYB, MINT, LAV]
  for (let i = 0; i < n; i++) {
    const kk = pop01(k, 0.2 + i * 0.3, 0.3, 2)
    if (kk <= 0.01) continue
    x.save(); x.translate(cx, cy - i * 70); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-130, -36, 260, 72); x.fillStyle = COLS[i]; x.fillRect(-122, -28, 244, 56)
    x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-40, -28, 80, 14)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Spilled it mid-sprint. | *Didn’t stop.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P, F) {
      stain(x, F.x + 20, F.cy + 50, 34 * ease.outCubic(prog(lt, 0.3, 0.6)))
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.55)'; x.lineWidth = 8; x.lineCap = 'round'
      for (let i = 0; i < 4; i++) { const y = 760 + i * 70, o = (t * 900 + i * 140) % 400; x.beginPath(); x.moveTo(980 - o, y); x.lineTo(980 - o - 120, y); x.stroke() }
      x.restore()
      label(x, 790, 1110, 'STOPPING: NEVER', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Mourned the coffee. | *Not the shirt.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      stain(x, 760, 1090, 44 * ease.outCubic(prog(lt, 0.3, 0.7)))
      drawBits(x, CUP, { W: CREAM, B: CREAM, K: INK }, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 1.4 })
      label(x, 790, 660, 'RIP, LATTE', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'The stain? | *A limited edition.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shirt(x, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#ffe24a', 26 * ease.outCubic(prog(lt, 0.5, 0.8)))
      label(x, 790, 1120, '1 OF 1 ✦', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Spilled on themselves. | *Apologised to you.*', mood: 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      stain(x, F.x + 20, F.cy + 50, 30 * ease.outCubic(prog(lt, 0.2, 0.5)))
      bubble(x, 790, 800, 'sorry!! | are YOU ok?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Coffee stain? | *Now it’s a look.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      stain(x, F.x + 20, F.cy + 60, 30)
      drawBits(x, SHADES, { K: INK, B: '#2a2350', W: '#ffffff' }, F.x, F.cy - 20, 14 * pop01(t, P.t0 + 0.5, 0.3, 2.4))
      label(x, 790, 720, 'PROFILE PIC: UPDATED', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.3, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Had a backup shirt. | *And a backup backup.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shirtStack(x, 790, 1040, lt, 3)
      label(x, 790, 700, 'PREPARED.', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Before the first date? | *Four outfit changes.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, SKYB, LAV]
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.35))
      shirt(x, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), COLS[n - 1], n === 1 ? 22 : 0)
      label(x, 790, 650, `OUTFIT #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Nobody saw. | *Nobody will.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shirt(x, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), '#ff9ab8', 22 * (1 - ease.outCubic(prog(lt, 0.8, 1.3))))
      label(x, 790, 1120, 'EVIDENCE: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 34, bg: '#e23d66', color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughed it off. | *Spilled another.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 720, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 1.5 })
      drawBits(x, CUP, CUP_C, 870, 1060, 14 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: lerp(0, 1.5, ease.outCubic(prog(lt, 1.2, 1.5))) })
      bubble(x, 790, 720, 'HAHAHA', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 64, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Kept working. | *Stain and all.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      stain(x, F.x + 20, F.cy + 50, 30)
      drawBits(x, LAPTOP, LAPTOP_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'DEADLINE FIRST', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a cup | *that can’t spill.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      smartCup(x, 800, 930, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1130, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'One drop. | *Full meltdown.*', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      stain(x, F.x + 30, F.cy + 60, 7)
      bubble(x, 800, 720, 'my favourite | shirt…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 800, 1060, 'DROPS: 1', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0643', key: 'G', accent: COFFEE, ending: 'group',
  title: 'Spilled coffee? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same coffee. | *Twelve meltdowns.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CUP, CUP_C, 540, 640, 18 * pop01(t, t0 + 1.4, 0.35, 2), { rot: 0.25 })
      label(x, 540, 790, 'NEXT TIME: A LID', pop01(t, t0 + 1.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
