// v3a004: zodiac.advice444, ADVICE SOLO, "Sagittarius, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to slow down, Sagittarius-style, one gag each.
// Ending: lesson (lesson beat, then the last line).
//   0.0–3.6    "Sagittarius, you’re | *allowed to rest.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the spinning globe slows to a stop: STILL THERE TOMORROW · a couch fort with a flag: BASE CAMP
//              · a snail overtakes Sagittarius: PACE: SNAIL · hiking boots snoring · a slow ceiling fan: FASCINATING, ACTUALLY
//              · a match who also loves naps · a hammock: ITINERARY: HAMMOCK · window seat, hot cocoa, rain
//              · a paper plane lands softly on a pillow: LANDED
//  37.8        "Free spirit. | *Free to rest.*"  Sagittarius comes back, sleepy.
//  41.0        LESSON UNLOCKED: "Rest is part | of *the journey.*"  ENERGY: BACK
//  46.9        "The snail | *won the race.*"  The snail is back, with a ribbon.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', PURP = '#b866ff', OCEAN = '#4f8fe6', LAND = '#5fd068'
const S = 'sagittarius'

// ── props
const SNAIL = ['....SSSS.....', '...SPPPPS....', '..SPSSSPPS...', '..SPSPPSPS...', '..SPSSPSPS...', '...SPPPSS..E.', 'BBBBSSSSBBBEB', 'BBBBBBBBBBBB.']
const SNAIL_C = { S: '#c98f2a', P: '#ffd27a', B: '#9fe0a8', E: INK }
const BOOT = ['..BBBB..', '..BLLB..', '..BBBB..', '..BLLB..', '..BBBB..', '..BBBBBB', '.BBBBBBB', 'SSSSSSSS']
const BOOT_C = { B: '#8a4a2e', L: '#e7b46a', S: INK }
const MUG = ['.SS.S..', '..S.SS.', 'WWWWW..', 'WCCCWWW', 'WCCCW.W', 'WCCCWWW', 'WWWWW..', '.WWW...']
const MUG_C = { S: 'rgba(239,230,214,0.8)', W: '#fff4e2', C: '#8a4a2e' }
const PLANE = ['W.......', 'WWW.....', 'WWWWW...', 'WWWWWWWW', 'LLLWW...', 'LL......']
const PLANE_C = { W: '#ffffff', L: '#c8d2ee' }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#fff4e2', L: LAV }
function globe(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const spin = (1 - ease.outCubic(clamp(lt / 1.4))) * 9 + 0.2
  const rot = (t * spin) % (Math.PI * 2)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 150, 20, 40); x.fillRect(-90, 186, 180, 20); x.fillStyle = WOOD; x.fillRect(-84, 190, 168, 12)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 158, 0, Math.PI * 2); x.fill()
  x.fillStyle = OCEAN; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.clip()
  x.fillStyle = LAND
  for (let i = 0; i < 5; i++) { const ph = ((rot / (Math.PI * 2) + i / 5) % 1) * 2 - 1; const px = ph * 240; x.fillRect(px - 40, -90 + (i * 47) % 160, 70 + (i % 3) * 20, 50 + (i % 2) * 30) }
  x.restore()
  x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 172, -2.2, 1.0); x.stroke()
  x.restore()
}
function fan(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const a = t * lerp(2.5, 0.8, clamp(lt / 1.5))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -150, 20, 120)
  x.save(); x.rotate(a)
  for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.fillStyle = INK; x.fillRect(16, -26, 190, 52); x.fillStyle = WOOD; x.fillRect(22, -20, 178, 40) }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fill()
  x.restore()
}
function hammock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 190 - 14, -170, 28, 330); x.fillStyle = '#8a4a2e'; x.fillRect(s * 190 - 8, -166, 16, 322) }
  const sway = Math.sin(t * 1.6) * 8
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(-180, -100); x.quadraticCurveTo(sway, 90, 180, -100); x.stroke()
  x.strokeStyle = PURP; x.lineWidth = 24; x.beginPath(); x.moveTo(-180, -100); x.quadraticCurveTo(sway, 90, 180, -100); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 5; x.beginPath(); x.moveTo(-170, -96); x.quadraticCurveTo(sway, 82, 170, -96); x.stroke()
  x.restore()
}
function rainWindow(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 340, 300)
  x.fillStyle = '#2a3a6e'; x.fillRect(-156, -186, 312, 272)
  x.save(); x.beginPath(); x.rect(-156, -186, 312, 272); x.clip()
  x.fillStyle = 'rgba(143,227,255,0.7)'
  for (let i = 0; i < 14; i++) { const ph = ((t * 0.9 + i * 0.37) % 1); x.fillRect(-150 + (i * 47) % 300, -190 + ph * 290, 4, 22) }
  x.restore()
  x.fillStyle = INK; x.fillRect(-6, -186, 12, 272); x.fillRect(-156, -56, 312, 12)
  x.fillStyle = INK; x.fillRect(-190, 96, 380, 26); x.fillStyle = BONE; x.fillRect(-184, 100, 368, 18)
  x.restore()
}
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = MINT; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ IT’S A MATCH', 0, -122)
  if (lt > 0.6) { x.fillStyle = LAV; x.fillRect(-96, -60, 196, 104); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('ideal date?', 2, -30); x.fillText('a long nap.', 2, 10) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The world | *will still be there.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      globe(x, t, 780, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1130, 'STILL THERE TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Staying in counts | *as an adventure.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -40, y: -40, s: 230 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 1080); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-330, -110, 660, 170); x.fillStyle = '#a24a6a'; x.fillRect(-322, -102, 644, 154)
      x.fillStyle = '#c45d85'; x.fillRect(-300, -150, 180, 60); x.fillRect(120, -150, 180, 60)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-340, -110); x.lineTo(0, -330); x.lineTo(340, -110); x.closePath(); x.globalAlpha = 0.9; x.fill()
      x.globalAlpha = 1; x.fillStyle = '#f3e3b8'; x.beginPath(); x.moveTo(-320, -116); x.lineTo(0, -318); x.lineTo(320, -116); x.closePath(); x.fill()
      x.fillStyle = '#e9d6a2'; for (let i = 0; i < 4; i++) x.fillRect(-240 + i * 140, -170 + (i % 2) * 20, 70, 14)
      x.restore()
    },
    front(x, t, lt, P) {
      const f = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (f > 0.01) { x.fillStyle = INK; x.fillRect(536, 690, 10, 110 * f); x.fillStyle = PURP; x.fillRect(546, 690, 80 * f, 50) }
      label(x, 790, 640, 'BASE CAMP: COUCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow walks | *count too.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(900, 720, ease.inOutSine ? ease.inOutSine(clamp(lt / 2.2)) : clamp(lt / 2.2)), 1070, 21 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'PACE: SNAIL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
      label(x, 790, 860, 'STILL GETS THERE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even your boots | *need a nap.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, BOOT, BOOT_C, 740, 1000, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      drawBits(x, BOOT, BOOT_C, 880, 1010, 22 * pop01(t, P.t0 + 0.35, 0.35, 2), { rot: 0.1, sx: -1 })
      if (lt > 0.8) { x.fillStyle = BONE; x.font = `800 ${50 + 14 * Math.sin(t * 3)}px ${INTER}`; x.textAlign = 'center'; x.fillText('z z z', 820, 780) }
      label(x, 810, 1170, 'MILES: PLENTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bored? | *That’s just resting.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: { x: -200, y: 40 },
    front(x, t, lt, P) {
      fan(x, t, 790, 820, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'FASCINATING, ACTUALLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match | *loves naps too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      hearts(x, t, 600, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Zero plans | *is a plan.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -230 },
    front(x, t, lt, P) {
      hammock(x, t, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 680, 'ITINERARY: HAMMOCK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Window seat. | Hot cocoa. *Done.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      rainWindow(x, t, 780, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, MUG, MUG_C, 690, 1080, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 860, 1110, 'BEST VIEW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even explorers | *land sometimes.*', mood: lt => lt > 1.5 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 1080, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const fly = ease.outCubic(prog(lt, 0.3, 1.4))
      drawBits(x, PLANE, PLANE_C, lerp(560, 790, fly), lerp(560, 990, fly) - Math.sin(Math.PI * fly) * 60, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(-0.3, 0.1, fly) })
      label(x, 800, 720, 'LANDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'v3a004', key: 'G', accent: PURP, solo: S, ending: 'lesson',
  title: 'Sagittarius, you’re | *allowed to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Free to rest.*', mood: 'sleepy' },
  lesson: { text: 'Rest is part | of *the journey.*', chip: 'ENERGY: BACK' },
  last: {
    text: 'The snail | *won the race.*',
    draw(x, t, lt) {
      drawBits(x, SNAIL, SNAIL_C, 390, 1170, 20 * pop01(t, t - lt + 0.5, 0.35, 2))
      label(x, 730, 1170, '1ST PLACE', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
