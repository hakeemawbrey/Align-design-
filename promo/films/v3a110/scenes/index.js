// v3a110: star_advice, ADVICE SOLO, "Capricorn, you're allowed | to rest." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle permission slips for the hardest worker in the zodiac.
//   0.0–3.6    "Capricorn, you’re allowed | *to rest.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the laptop closes: OUT OF OFFICE · a circled DAY OFF on the calendar · the goat sits in a beanbag
//              · a doodle that isn't a side hustle · the checklist is still unticked: STILL WORTHY
//              · Taurus takes the clipboard ("I got this") · the beach, with a laptop peeking out of the bag: NICE TRY
//              · a match asks about the weekend: "nothing. proudly." · even mountains have a quiet season
//  37.8        "Hard worker. | *Softer weekends.*"  Capricorn comes back, big.
//  41.0        LESSON UNLOCKED: "You don’t have to earn | *a day off.*"  REST: APPROVED
//  46.9        "Clock out, Cap. | *We’ve got it.*"  (lesson ending: no match card)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'capricorn'
const RED = '#e23d4e', WOOD = '#c98f2a', SAND = '#f3d9a0', SEA = '#4fb6e8', TEAL = '#2fc79a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}

// ── props
// a laptop whose lid closes (lid: 1 open → 0 shut)
function laptop(x, cx, cy, k, lid) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 0, 340, 34); x.fillStyle = '#9aa5c4'; x.fillRect(-164, 4, 328, 24)
  const h = 220 * lid
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-150, -h - 6, 300, h + 8)
    x.fillStyle = '#2a2350'; x.fillRect(-142, -h + 2, 284, h - 6)
    x.fillStyle = '#140c30'; x.fillRect(-130, -h + 14, 260, h - 30)
    if (lid > 0.5) { x.fillStyle = '#5a5482'; for (let r = 0; r < 5; r++) x.fillRect(-110, -h + 34 + r * 32, r % 2 ? 150 : 210, 12) }
  } else { x.fillStyle = INK; x.fillRect(-150, -12, 300, 14); x.fillStyle = '#c9c4d8'; x.fillRect(-144, -8, 288, 6) }
  x.restore()
}
// a month calendar with one day circled
function calendar(x, t, cx, cy, k, circ) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 360, 380, k, 0.04)
  x.fillStyle = RED; x.fillRect(-180, -190, 360, 70)
  x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -153)
  x.fillStyle = '#c9c4d8'
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) x.fillRect(-150 + c * 62, -95 + r * 66, 44, 40)
  // every square crossed with "work"... except one
  x.fillStyle = INK; x.font = `700 15px ${MONO}`
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) if (!(r === 2 && c === 2)) x.fillText('WORK', -128 + c * 62, -75 + r * 66)
  x.fillStyle = MINT; x.fillRect(-26, 37, 44, 40)
  if (circ > 0.01) {
    x.strokeStyle = RED; x.lineWidth = 8; x.beginPath()
    x.arc(-4, 57, 46, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * circ); x.stroke()
  }
  x.restore()
}
// a squishy beanbag
function beanbag(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.beginPath(); x.ellipse(0, 70, 200, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 196, 92, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8b6fd6'; x.beginPath(); x.ellipse(0, 10, 188, 84, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#a58cf0'; x.beginPath(); x.ellipse(-60, -20, 70, 30, -0.3, 0, Math.PI * 2); x.fill()
  x.restore()
}
// an easel with a happy little doodle
function easel(x, t, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, 100, 14, 170); x.fillRect(106, 100, 14, 170); x.fillRect(-7, 100, 14, 150)
  x.fillStyle = WOOD; x.fillRect(-116, 104, 6, 162); x.fillRect(110, 104, 6, 162)
  x.fillStyle = INK; x.fillRect(-146, -160, 292, 270); x.fillStyle = '#fffaf0'; x.fillRect(-138, -152, 276, 254)
  // the doodle: a sun and a wonky flower, drawn on over time
  x.save(); x.beginPath(); x.rect(-138, -152, 276 * clamp(draw), 254); x.clip()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-70, -90, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fd068'; x.fillRect(36, -40, 10, 120)
  x.fillStyle = PINK; for (let a = 0; a < 6; a++) { x.beginPath(); x.arc(41 + Math.cos(a) * 30, -60 + Math.sin(a) * 30, 20, 0, Math.PI * 2); x.fill() }
  x.fillStyle = GOLD; x.beginPath(); x.arc(41, -60, 16, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; x.fillRect(-130, 70, 260, 26)
  x.restore()
  x.restore()
}
// a clipboard checklist with nothing ticked
function clipboard(x, cx, cy, k, rot = -0.04, rows = ['emails', 'reports', 'taxes', 'gym', 'world peace']) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 320, 400, k, rot, '#fff4e2')
  x.fillStyle = INK; x.fillRect(-70, -222, 140, 44); x.fillStyle = '#9aa5c4'; x.fillRect(-62, -214, 124, 28)
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach((r, i) => {
    const y = -140 + i * 66
    x.fillStyle = INK; x.fillRect(-130, y - 18, 36, 36); x.fillStyle = '#fff4e2'; x.fillRect(-125, y - 13, 26, 26)
    x.fillStyle = INK; x.fillText(r, -80, y + 2)
  })
  x.restore()
}
// a beach scene: sand strip, sea, an umbrella
function beach(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = SEA; x.fillRect(110, 860, 860, 120)
  x.fillStyle = '#7fd0f2'; for (let i = 0; i < 8; i++) x.fillRect(130 + i * 108 + 14 * Math.sin(t * 2 + i), 880 + (i % 2) * 40, 54, 8)
  x.fillStyle = SAND; x.fillRect(110, 980, 860, 240)
  x.fillStyle = INK; x.fillRect(836, 640, 12, 360)
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? BONE : RED; x.beginPath(); x.moveTo(842, 600); x.arc(842, 700, 170, Math.PI + i * Math.PI / 6, Math.PI + (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.restore()
}
// a tote bag with a laptop peeking out
function tote(x, cx, cy, k, peek) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // the laptop slides up out of the bag
  const up = 70 * peek
  x.fillStyle = INK; x.fillRect(-74, -80 - up, 148, 110); x.fillStyle = '#9aa5c4'; x.fillRect(-68, -74 - up, 136, 100)
  x.fillStyle = INK; x.fillRect(-100, -60, 200, 160); x.fillStyle = '#ffb34a'; x.fillRect(-94, -54, 188, 148)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, -60, 60, Math.PI, 0); x.stroke()
  x.restore()
}
// a phone with a chat
function phoneChat(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 300, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = PINK; x.fillRect(-120, -178, 240, 40)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -157)
  const b1 = pop01(lt, 0.25, 0.25, 2), b2 = pop01(lt, 1.1, 0.25, 2)
  if (b1 > 0.01) { x.save(); x.translate(-6, -70); x.scale(b1, b1); x.fillStyle = INK; x.fillRect(-120, -60, 240, 120); x.fillStyle = LAV; x.fillRect(-116, -56, 232, 112); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('your', 0, -20); x.fillText('weekend?', 0, 20); x.restore() }
  if (b2 > 0.01) { x.save(); x.translate(6, 90); x.scale(b2, b2); x.fillStyle = INK; x.fillRect(-120, -60, 240, 120); x.fillStyle = MINT; x.fillRect(-116, -56, 232, 112); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('nothing.', 0, -20); x.fillText('bliss.', 0, 20); x.restore() }
  x.restore()
}
const MOUNT = [
  '.......WW.......',
  '......WWWW......',
  '.....WWWWWW.....',
  '....GWWGGWWG....',
  '...GGGGGGGGGG...',
  '..GGGGGgGGGGGG..',
  '.GGGgGGGGGGgGGG.',
  'GGGGGGGGgGGGGGGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7a86b8', g: '#5a6496' }
const MOON = ['.MMM.', 'MM...', 'M....', 'MM...', '.MMM.']

const CAMEOS = [
  { sign: S, cap: 'Your inbox | *can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      laptop(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), 1 - ease.inOutCubic(prog(lt, 0.8, 1.2)))
      label(x, 790, 640, '847 UNREAD', pop01(t, P.t0 + 0.4, 0.3, 2) * (lt < 1.2 ? 1 : 0.0001), { size: 38, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 640, 'OUT OF OFFICE', pop01(t, P.t0 + 1.25, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A day off | *isn’t a weakness.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, t, 780, 840, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.4)))
      label(x, 780, 1110, 'DAY OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'The goat is allowed | *to sit down.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: 0, y: 40 }, squash: lt => 0.12 * ease.outCubic(prog(lt, 0.9, 1.2)),
    back(x, t, lt, P) { beanbag(x, 540, 1010, pop01(t, P.t0 + 0.4, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 600, 'SITTING: ALLOWED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) sparkles(x, t, 540, 900, P.t0 + 1.2 * (3.1 / 2.4), 7, 230, 0.4)
    } },
  { sign: S, cap: 'Hobbies don’t need | a *business plan.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      easel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.4, 1.2))
      bubble(x, 440, 600, 'is this | profitable?', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (lt < 1.4 ? 1 : 0.0001), { size: 34, col: LAV, tail: 'br' })
      label(x, 790, 1140, 'JUST FOR FUN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'You’re more than | *your to-do list.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      clipboard(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'STILL WORTHY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
      hearts(x, t, 420, 900, P.t0 + 1.5 * (3.1 / 2.4), { n: 5, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Let someone else | *take the clipboard.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -230, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), pass = ease.inOutCubic(prog(lt, 0.9, 1.4))
      if (k > 0.01) signChar(x, t, 'taurus', 800, 960, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.9] })
      clipboard(x, lerp(470, 660, pass), 930, 0.55 * pop01(t, P.t0 + 0.3, 0.3, 2), lerp(-0.2, 0.15, pass))
      bubble(x, 800, 650, 'I got this.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Vacation means | *no laptop.*', mood: lt => lt > 1.5 ? 'wink' : 'sleepy', look: [-1, 0], star: { x: -160, y: 60, s: 260 },
    back(x, t, lt, P) { beach(x, t, pop01(t, P.t0 + 0.1, 0.4, 1.2)) },
    front(x, t, lt, P) {
      tote(x, 700, 1080, 0.8 * pop01(t, P.t0 + 0.4, 0.3, 2), ease.outBack ? clamp(prog(lt, 0.9, 1.2)) : prog(lt, 0.9, 1.2))
      label(x, 640, 620, 'NICE TRY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 46, bg: RED, color: BONE, rot: -0.05 })
    } },
  { sign: S, cap: 'Weekend plans: | *nothing.* Proudly.', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phoneChat(x, 770, 850, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
    } },
  { sign: S, cap: 'Even mountains | have *quiet seasons.*', mood: 'sleepy', star: { x: -240, y: 30, s: 240 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6)
      drawBits(x, MOUNT, MOUNT_C, 760, 900, 30 * k)
      drawBits(x, MOON, { M: GOLD }, 860, 590, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      if (k > 0.5) for (let i = 0; i < 14; i++) { const ph = ((t * 0.25 + i / 14) % 1); x.fillStyle = '#ffffff'; x.fillRect(150 + (i * 97) % 800 + 10 * Math.sin(t + i), 500 + ph * 700, 8, 8) }
    },
    front(x, t, lt, P) {
      label(x, 760, 1130, 'SNOWED IN. CUTE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a110', key: 'C', accent: TEAL, solo: S, ending: 'lesson',
  title: 'Capricorn, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Hard worker. | *Soft weekends.*', mood: 'sleepy' },
  lesson: { text: 'No need to earn | *a day off.*', chip: 'REST: APPROVED' },
  last: { text: 'Clock out, Cap. | *We’ve got it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
