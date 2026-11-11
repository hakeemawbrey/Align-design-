// v3a083: zodiac.advice444, ADVICE ROLL CALL, "How each sign | handles a crush." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm, relatable crush line each, one light gag each.
//   0.0–3.6    "How each sign | *handles a crush.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve cards (3.8 s each):
//              ♈ "HI. I LIKE YOU." in a bubble: BOLD. CUTE. · ♉ a lunchbox with a heart note · ♊ the match screenshot
//              goes to the group chat (99+) · ♋ a thought bubble with the dog they'll adopt · ♌ laugh volume bars
//              · ♍ a notebook of their order · ♎ a poll: YES 12 · NO 0 · ♏ a box marked CHILL leaking hearts
//              · ♐ a suitcase, swapped for a coffee cup · ♑ an hourglass that runs out into a heart
//              · ♒ sends a cat meme · ♓ a tissue box (sobbing, happily)
//  49.2        "Twelve ways | to say *“I like you.”*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Cancer already | *named the dog.*"  (the dream dog comes back, with a name tag)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', ACC = '#ff8fb1'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const DOG = [
  'EE......EE..',
  'EBE....EBE..',
  'EBBBBBBBBE..',
  '.BBKBBBKBB..',
  '.BBBBBBBBB..',
  '.BBBNNNBBB..',
  '..BBBBBBB...',
  '..BBBBBBBB.T',
  '.BBBBBBBBBBT',
  '.BB.BB.BB.B.',
]
const DOG_C = { E: '#8a5a2e', B: '#e8b878', K: INK, N: '#3a2214', T: '#e8b878' }
const LUNCH = [
  '...KKKK...',
  '...K..K...',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RWWWWWWWWR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
]
const CUP = ['WWWWWW.', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCWWW', 'WCCCCW.', '.WWWW..']
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'OOOOOOOOOO',
  'OoOOOOOOoO',
  'OOOOOOOOOO',
  'OoOOOOOOoO',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
]
const CAT = ['K...K.', 'KK.KK.', 'KKKKK.', 'KWKWK.', 'KKPKK.', '.KKK..']
const TISSUE = [
  '...WWW....',
  '..WWWWW...',
  'BBBWWWBBBB',
  'BBBBBBBBBB',
  'BbBBbBBbBB',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
]

// a phone that shows a match screenshot and a 99+ badge
function phone(x, t, cx, cy, k, badge) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = MINT; x.fillRect(-92, -100, 184, 120)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('✦ IT’S A MATCH', 0, -70)
  x.font = `800 30px ${INTER}`; x.fillText('(screenshot)', 0, -24)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.fillText('→ GROUP CHAT', 0, 70)
  if (badge > 0.01) { x.save(); x.translate(110, -190); x.scale(badge, badge); x.fillStyle = INK; x.fillRect(-52, -30, 104, 60); x.fillStyle = RED; x.fillRect(-46, -24, 92, 48); x.fillStyle = '#fff'; x.font = `800 30px ${INTER}`; x.fillText('99+', 0, 2); x.restore() }
  x.restore()
}
// a thought bubble (round puffs)
function thought(x, cx, cy, k, w = 300, h = 220) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [c, r] of [[INK, 8], [BONE, 0]]) {
    x.fillStyle = c
    x.beginPath(); x.ellipse(0, 0, w / 2 + r, h / 2 + r, 0, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.arc(-w / 2 + 10, h / 2 + 30, 22 + r, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.arc(-w / 2 - 20, h / 2 + 70, 12 + r, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
// laugh volume bars
function volume(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = Math.floor(clamp(p) * 7)
  for (let i = 0; i < 7; i++) { const h = 40 + i * 34; x.fillStyle = INK; x.fillRect(-170 + i * 50 - 4, 140 - h - 4, 44, h + 8); x.fillStyle = i < n ? (i > 4 ? RED : i > 2 ? GOLD : MINT) : '#2a2350'; x.fillRect(-170 + i * 50, 140 - h, 36, h) }
  x.restore()
}
// a small notebook with their order written down
function notebook(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -160, 296, 340)
  x.fillStyle = INK; x.fillRect(-152, -172, 304, 344)
  x.fillStyle = '#fff4e2'; x.fillRect(-144, -164, 288, 328)
  x.fillStyle = '#a8c8f0'; for (let i = 0; i < 6; i++) x.fillRect(-130, -96 + i * 46, 260, 3)
  x.fillStyle = RED; x.fillRect(-104, -164, 4, 328)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  x.fillText('THEIR ORDER', -90, -110)
  x.font = `700 24px ${MONO}`; ['oat milk', 'no ice', 'extra foam', 'b-day: 3/14'].forEach((s, i) => x.fillText(s, -90, -60 + i * 46))
  x.restore()
}
// a poll card
function poll(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -132, 316, 280)
  x.fillStyle = INK; x.fillRect(-162, -144, 324, 288)
  x.fillStyle = '#2a2350'; x.fillRect(-154, -136, 308, 272)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('do they like me?', 0, -96)
  const yes = Math.round(clamp(p) * 12)
  x.fillStyle = '#140c30'; x.fillRect(-130, -50, 260, 64); x.fillRect(-130, 40, 260, 64)
  x.fillStyle = MINT; x.fillRect(-130, -50, 260 * clamp(p), 64)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.fillText(`YES  ${yes}`, -112, -16)
  x.fillStyle = BONE; x.fillText('NO   0', -112, 74)
  x.restore()
}
// a cardboard box marked CHILL, hearts escaping from it
function chillBox(x, t, cx, cy, k, lid, t0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -90, 280, 200)
  x.fillStyle = '#c99a5e'; x.fillRect(-132, -82, 264, 184)
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHILL', 0, 14)
  x.save(); x.translate(-140, -90); x.rotate(-lid * 0.5); x.fillStyle = INK; x.fillRect(0, -16, 288, 22); x.fillStyle = '#b8884e'; x.fillRect(4, -12, 280, 14); x.restore()
  x.restore()
  hearts(x, t, cx, cy - 90 * k, t0, { n: 7, life: 2.0, spread: 200, cell: 8, seed: 4 })
}
// an hourglass: sand runs down, the bottom pile is a heart
function hourglass(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 26); x.fillRect(-120, 164, 240, 26)
  x.fillStyle = '#c98f2a'; x.fillRect(-114, -186, 228, 18); x.fillRect(-114, 168, 228, 18)
  x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.moveTo(-90, -164); x.lineTo(-10, 0); x.lineTo(-90, 164); x.moveTo(90, -164); x.lineTo(10, 0); x.lineTo(90, 164); x.stroke()
  const top = 1 - clamp(p)
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(-80 * top, -150 + 140 * (1 - top)); x.lineTo(80 * top, -150 + 140 * (1 - top)); x.lineTo(0, -10); x.closePath(); x.fill()
  if (p > 0 && p < 1) x.fillRect(-3, -10, 6, 160)
  x.restore()
  if (p > 0.15) drawBits(x, HEART, { H: PINK }, cx, cy + 120 * k, 4 + 10 * clamp(p) * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Tells them in a day. | *Brave, honestly.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -180 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'HI. I LIKE YOU.', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'BOLD. CUTE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: RED, color: '#fff4e2', rot: -0.05 })
      sparkles(x, t, 790, 700, P.t0 + 0.5, 7, 200, 0.2)
    } },
  { sign: 'taurus', cap: 'Shows it with snacks. | *That counts.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, LUNCH, { K: INK, R: '#7bd36a', W: '#fff4e2' }, 790, 880, 26 * k)
      drawBits(x, HEART, { H: PINK }, 870, 760, 9 * pop01(t, P.t0 + 1.1, 0.3, 2.4), { rot: 0.2 })
      label(x, 790, 1100, 'PACKED WITH LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Screenshots the match | *for the group chat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.3, 0.3, 2.6))
      label(x, 400, 620, 'HELP!!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'cancer', cap: 'Already pictured the dog. | *Dream away.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -200, y: 60 },
    front(x, t, lt, P) {
      thought(x, 790, 720, pop01(t, P.t0 + 0.3, 0.35, 2))
      drawBits(x, DOG, DOG_C, 790, 720, 14 * pop01(t, P.t0 + 0.8, 0.35, 2.2), { rot: Math.sin(t * 4) * 0.04 })
      hearts(x, t, 790, 640, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
  { sign: 'leo', cap: 'Laughs louder near them. | *They noticed.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', star: { x: -190 }, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      volume(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.3, 1.4))
      label(x, 800, 1040, 'HA HA HA HA', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      bubble(x, 800, 600, 'they looked!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Remembers every detail. | *That’s love.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      notebook(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 840, P.t0 + 1.5, 7, 200, 0.4)
    } },
  { sign: 'libra', cap: 'Asks everyone’s opinion. | *Trust your own.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      poll(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.4, 1.4))
      label(x, 790, 1060, 'YOU KNEW ALREADY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Acts like they don’t care. | *It shows anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      chillBox(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack ? ease.outBack(prog(lt, 0.8, 1.1)) : prog(lt, 0.8, 1.1), P.t0 + 1.1)
    } },
  { sign: 'sagittarius', cap: 'Plans a trip together. | *Start with coffee.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.9, 1.3))
      drawBits(x, SUITCASE, { K: INK, O: ORANGE, o: '#c96a1a' }, 790, lerp(860, 700, sw), 26 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.5 * sw), { rot: sw * 0.3, alpha: 1 - sw })
      drawBits(x, CUP, { W: '#fff4e2', C: '#8a5a2e' }, 790, 880, 26 * sw)
      label(x, 790, 1080, 'DATE ONE: SMALL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Waits for the right time. | *This is it.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.7],
    front(x, t, lt, P) {
      hourglass(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.4, 1.6))
      label(x, 790, 1100, 'TIME: NOW', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Sends a meme instead. | *Same thing.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 820); x.rotate(-0.04); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-142, -142, 284, 284); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('me, thinking', 0, -100); x.fillText('about you:', 0, -64); x.restore() }
      drawBits(x, CAT, { K: '#6b6b80', W: '#fff', P: PINK }, 790, 880, 22 * k)
      label(x, 790, 1080, 'SENT ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Cries when they’re kind. | *Soft is sweet.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, b: '#5fb8e0' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 650, 'they said | good morning', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1090, 'TISSUES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a083', key: 'F', accent: ACC, ending: 'callback',
  title: 'How each sign | *handles a crush.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to say *“I like you.”*' },
  last: {
    text: 'Cancer already | *named the dog.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 2.2)
      drawBits(x, DOG, DOG_C, 540, 920, 26 * k, { rot: Math.sin(t * 4) * 0.03 })
      label(x, 540, 1130, 'BISCUIT', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
      hearts(x, t, 540, 800, t - lt + 1.2, { n: 6, life: 2.0, spread: 400, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
