// v3a104: zodiac.advice444 (star_advice), ADVICE SOLO, "Dear Pisces: | it's okay." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission slips for the softest sign. Pisces cries in
// every card (house rule), happily.
//   0.0–3.6    "Dear Pisces: | *it's okay.*"
//   3.6–37.8   nine cards: cried at the happy ending (THEY SAID YES) · daydreaming is a hobby (a castle in a cloud)
//              · one party = a nap (battery 2%) · you can't adopt every stray (four kittens, no room) · feelings first,
//              logic loading · your art doesn't have to be perfect · three alarms · a slow reply isn't a breakup
//              · soft is a superpower (a cape)
//  37.8        ending (group): "Too much? | *Just enough.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces'
const TEARS = lt => lt > 1.2 ? 2 : 1
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

const CASTLE = ['W.W...W.W', 'WWW...WWW', 'WWW.W.WWW', 'WWWWWWWWW', 'WWWPPPWWW', 'WWWPPPWWW']
const CASTLE_C = { W: LAV, P: INK }
const CAT = ['K...K', 'KK.KK', 'KKKKK', 'KEKEK', 'KKPKK', '.KKK.']
const EASEL = ['.CCCCCCC.', '.CRRYBBC.', '.CRYYYBC.', '.CMMYBBC.', '.CCCCCCC.', '..W...W..', '.W.....W.', 'W.......W']
const EASEL_C = { C: WHITE, R: PINK, Y: GOLD, B: SKYB, M: MINT, W: WOOD }
const CLOCK = ['.RRRRR.', 'RWWWWWR', 'RWWKWWR', 'RWWKKWR', 'RWWWWWR', '.RRRRR.', 'R.....R']
const CLOCK_C = { R: RED, W: WHITE, K: INK }
// a fluffy thought cloud
function cloud(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const blobs = [[-90, 10, 70], [0, -30, 90], [90, 10, 70], [0, 40, 80]]
  x.fillStyle = INK; for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r + 6, 0, 7); x.fill() }
  x.fillStyle = WHITE; for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r, 0, 7); x.fill() }
  x.restore()
}
// a retro TV
function tv(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = WOOD; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = INK; x.fillRect(-124, -86, 196, 172); x.fillStyle = '#ffd6e6'; x.fillRect(-116, -78, 180, 156)
  x.fillStyle = INK; x.fillRect(-62, 102, 12, 30); x.fillRect(50, 102, 12, 30); x.fillRect(90, -60, 30, 30); x.fillRect(90, 0, 30, 30)
  x.restore()
  drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, cx - 26 * k, cy, 12 * k * (1 + 0.08 * Math.sin(t * 8)))
}
// a battery
function battery(x, cx, cy, k, pct) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -56, 240, 112); x.fillRect(120, -24, 20, 48)
  x.fillStyle = BONE; x.fillRect(-110, -46, 220, 92)
  x.fillStyle = RED; x.fillRect(-104, -40, Math.max(6, 208 * pct), 80)
  x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(Math.round(pct * 100) + '%', 10, 2)
  x.restore()
}
// a little cape behind the star
function cape(x, F, k, t) {
  if (k <= 0.01) return
  const w = F.S * 0.9 * k, h = F.S * 0.8 * k, flap = 16 * Math.sin(t * 6)
  x.save(); x.translate(F.x, F.cy - F.S * 0.1)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w * 0.3, 0); x.lineTo(w * 0.3, 0); x.lineTo(w * 0.62 + flap, h); x.lineTo(-w * 0.62 + flap, h); x.closePath(); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(-w * 0.26, 6); x.lineTo(w * 0.26, 6); x.lineTo(w * 0.55 + flap, h - 8); x.lineTo(-w * 0.55 + flap, h - 8); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Happy tears? | *Totally okay.*', mood: 'heart', tears: lt => 2, look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      tv(x, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 780, 1110, 'THEY SAID YES', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Daydreaming | *is a hobby.*', mood: 'sparkle', tears: 1, look: [1, -1], star: { x: -200, y: 60 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      for (let i = 0; i < 3; i++) { const b = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); x.fillStyle = INK; x.beginPath(); x.arc(450 + i * 70, 760 - i * 40, (10 + i * 6) * b + 4, 0, 7); x.fill(); x.fillStyle = WHITE; x.beginPath(); x.arc(450 + i * 70, 760 - i * 40, (10 + i * 6) * b, 0, 7); x.fill() }
      cloud(x, 760, 650, k)
      drawBits(x, CASTLE, CASTLE_C, 760, 650, 12 * k)
      label(x, 790, 1100, 'HOURS USED: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One party = | *one big nap.*', mood: 'sleepy', tears: 1, look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      battery(x, 770, 860, 1.4 * pop01(t, P.t0 + 0.3, 0.35, 2), Math.max(0.02, 0.6 - lt * 0.35))
      label(x, 770, 1080, 'SOCIAL BATTERY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can’t adopt | *every stray.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: TEARS, look: [1, 0.5], star: { x: -230, s: 270 },
    front(x, t, lt, P) {
      const cols = [GOLD, BONE, '#8a8a9e', '#e7b46a']
      cols.forEach((c, i) => drawBits(x, CAT, { K: c, E: INK, P: PINK }, 590 + i * 112, 1060 - (i % 2) * 24, 19 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2)))
      label(x, 740, 790, 'ROOM FOR ONE MORE?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 890, '(NO.)', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 38, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feelings first. | Logic *later.*', mood: 'wide', tears: TEARS, look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 780, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.06 * Math.sin(t * 9)))
      const dots = '.'.repeat(1 + Math.floor((t * 3) % 3))
      label(x, 780, 1080, 'LOGIC: LOADING' + dots, pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your art doesn’t | *have to be perfect.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, EASEL, EASEL_C, 780, 920, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 780, 690, 'MASTERPIECE (TO ME)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late again? | *Set three alarms.*', mood: lt => lt > 1.5 ? 'wink' : 'wide', tears: 1, look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CLOCK, CLOCK_C, 620 + i * 130, 960 + Math.sin(t * 30 + i) * (lt > 0.8 + i * 0.3 ? 4 : 0), 15 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2))
      label(x, 780, 760, 'ALARM #3: OKAY FINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A slow reply | *isn’t a breakup.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: TEARS, look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const typing = 'typing' + '.'.repeat(1 + Math.floor((t * 3) % 3))
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ YOUR MATCH', typing, pop01(t, P.t0 + 0.6, 0.3, 2.2), { msgCol: BONE, msgSize: 30 })
      label(x, 780, 1110, 'THEY’RE JUST BUSY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Soft is | *a superpower.*', mood: 'sparkle', tears: 2, star: { x: 0, y: 0, s: 320 }, hops: [0.9, 1.6],
    back(x, t, lt, P, F) { cape(x, F, pop01(t, P.t0 + 0.6, 0.35, 2), t) },
    front(x, t, lt, P) {
      label(x, 540, 620, 'SUPER SOFT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 540, 880, P.t0 + 1.0, 9, 230, 0.2)
    } },
]

const F = makeFilm({
  id: 'v3a104', key: 'G', accent: '#8fe3ff', solo: S, ending: 'group',
  title: 'Dear Pisces: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Too much? | *Just enough.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
