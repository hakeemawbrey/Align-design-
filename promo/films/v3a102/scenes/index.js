// v3a102: zodiac.advice444 (star_advice), ADVICE SOLO, "Signs you're | a healed Aries." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): the fire is still there, it just has brakes now.
//   0.0–3.6    "Signs you're | *a healed Aries.*"
//   3.6–37.8   nine cards: read the whole message (scrolled to the end) · stuck behind a snail, no sighs
//              · counted to ten and reached ten · waited for the microwave beep · a second date before the wedding plans
//              · board game night, table still standing · let them finish the sentence · slept on the reply
//              · traffic jam, honks: 0
//  37.8        "Still fire. | *Now with brakes.*"
//  41.2        callback: "And the snail? | *Best friend now.*" (the snail from card 2 comes back, next to a little Aries)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const SNAIL = [
  '...SSSS....',
  '..SBBBBS...',
  '.SBSSSBS..E',
  '.SBSBBBS.E.',
  '.SBSSSSSGG.',
  '..SSSSSGGGG',
  'GGGGGGGGGG.',
]
const SNAIL_C = { S: '#8a4a2e', B: GOLD, G: MINT, E: INK }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWLWWWWLWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: WHITE, L: LAV }
const CAR = ['...RRRRR....', '..RWWRWWR...', '.RRRRRRRRRR.', 'RRRRRRRRRRRY', 'RRRRRRRRRRRR', '..KK....KK..']
const CAR_C = { R: RED, W: SKYB, Y: GOLD, K: INK }
const DIE = ['WWWWW', 'WKWWW', 'WWKWW', 'WWWKW', 'WWWWW']
const DIE_C = { W: WHITE, K: INK }
// a little microwave with a countdown
function microwave(x, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -100, 300, 200)
  x.fillStyle = BONE; x.fillRect(-142, -92, 284, 184)
  x.fillStyle = INK; x.fillRect(-126, -76, 180, 152); x.fillStyle = '#ffd77a'; x.fillRect(-118, -68, 164, 136)
  x.fillStyle = INK; x.fillRect(66, -76, 64, 40); x.fillStyle = '#123'; x.fillRect(70, -72, 56, 32)
  x.fillStyle = MINT; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(secs, 98, -55)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(76 + (i % 2) * 28, -18 + Math.floor(i / 2) * 26, 16, 14)
  x.restore()
}
// a game board with a few pieces still neatly on it
function board(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -70, 300, 140)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? GOLD : WHITE; x.fillRect(-144 + i * 36, -64 + j * 32, 36, 32) }
  ;[[-110, -48, RED], [-38, 16, SKYB], [70, -16, MINT]].forEach(([px, py, c]) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 14, 0, 7); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(px, py, 10, 0, 7); x.fill() })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You read the message | *to the end.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'MESSAGES', 'so anyway | (11 more | paragraphs)', pop01(t, P.t0 + 0.6, 0.3, 2.2), { msgCol: BONE, msgSize: 26 })
      label(x, 780, 1110, 'SCROLLED TO THE END', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stuck behind a snail. | *No sighing.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0.3], star: { x: -230, y: 30, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 680 + 14 * lt, 1050, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 720, 740, 'SPEED: SNAIL', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 720, 840, 'MOOD: FINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Counted to ten. | *Actually reached ten.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, -0.5], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.min(10, Math.max(1, Math.floor(lt * 4.6)))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 880); x.scale(k, k)
        x.fillStyle = INK; x.font = `800 200px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(String(n), 6, 8); x.fillStyle = n === 10 ? MINT : BONE; x.fillText(String(n), 0, 0)
        x.restore()
      }
      label(x, 780, 1120, 'DEEP BREATHS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You wait | *for the beep.*', mood: lt => lt > 1.7 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220, s: 270 }, hops: [1.9],
    front(x, t, lt, P) {
      const secs = lt < 1.7 ? ':0' + Math.max(1, 3 - Math.floor(lt / 0.6)) : 'BEEP'
      microwave(x, 760, 930, pop01(t, P.t0 + 0.2, 0.35, 2), secs)
      label(x, 760, 740, 'DOOR: STILL SHUT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 930, P.t0 + 1.9, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Date two | *before wedding plans.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ IT’S A MATCH', 'coffee | saturday?', pop01(t, P.t0 + 0.7, 0.3, 2.2), { msgCol: GOLD, msgSize: 34 })
      label(x, 780, 1110, 'RING: NOT YET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost at board games. | *Table still standing.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0.5], star: { x: -230, y: -40, s: 260 },
    front(x, t, lt, P) {
      table(x, 760, 1080, 380)
      board(x, 760, 1000, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, DIE, DIE_C, 450, 1050, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.3 })
      label(x, 760, 760, 'FLIPS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You let them | *finish the sentence.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 810, 1020, 170 * k, { mood: 'happy', look: [-1, 0], seed: 51, glyph: false })
      const words = ['so…', 'so then…', 'so then I…', 'so then I said…']
      bubble(x, 760, 680, words[Math.min(3, Math.floor(lt / 0.5))], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 420, 640, 'LISTENING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Upset? You sleep on it | *before replying.*', mood: 'sleepy', look: [1, 0], star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 780, 1040, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 780, 760, 'REPLY: TOMORROW', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${36 + i * 8}px ${INTER}`; x.fillText('z', 450 + i * 40 + ph * 30, 760 - ph * 120); x.restore() }
    } },
  { sign: S, cap: 'Traffic jam. | *Honks: zero.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220, y: -60, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAR, CAR_C, 480, 1090, 22 * k)
      drawBits(x, CAR, { ...CAR_C, R: SKYB, W: BONE }, 790, 1090, 22 * k)
      bubble(x, 760, 660, 'we’ll get | there.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3a102', key: 'E', accent: '#ff6b5e', solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Still fire. | *Now with brakes.*', mood: 'sparkle' },
  last: {
    text: 'And the snail? | *Best friend now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1080, 260 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0.4], seed: 9, hops: [t - lt + 1.4] })
      drawBits(x, SNAIL, SNAIL_C, 720, 1130, 26 * pop01(t, t - lt + 0.7, 0.4, 2))
      hearts(x, t, 560, 1000, t - lt + 1.2, { n: 7, life: 2.0, spread: 360, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
