// kpmee08: PLANET TALK · MERCURY to SCORPIO, "Fine Is Not a Feeling" (27 s vertical, star_advice, screwed · C#m). Hard cut.
// Pisces cancelled plans; Scorpio replied "fine." while feeling a lot. Mercury decodes it and helps say the real thing.
//   0.00  frame 0: a wall of one-word reply bubbles ("fine." "k." "sure.") shattering as Mercury rockets through it at
//         the camera; Scorpio below, arms-crossed energy. Slam "SCORPIO. | 'Fine' is not a *feeling.*" Whip, shake.
//   1.00  record scratch + freeze: "the friend cancelled. *'fine.'*"
//   2.60  the chat: Pisces "so sorry, can't make tonight :(" → Scorpio "fine." · stamp "FINE?"
//   6.50  the decoder: "fine." unrolls into what it means: looking forward to it / a bit disappointed / I miss you /
//         don't want to seem needy
//  11.50  Scorpio "saying all that feels *risky.*" → Mercury: "name it." / "no *blame.*" / "leave the door *open.*"
//  15.50  the chat: "I was really looking forward to it. Next week?" → "I thought you hated me" / "next week!!"
//  21.00  Pisces sobbing with relief · 23.0 Scorpio, a small smile. Slam "Short is fine. | *True* is better." 25.3, cut at 27.
import { film, track, merc, sign, room, phone, burst, label, hearts, box, entrance, drawEntranceFx, entranceCues, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO, SERIF } from '../../kpmee01/mercurykit.js'

export const DURATION = 27
const IN = { at: -0.45, len: 0.9, x: 540, y: 760, size: 330 }
const LAND = entrance('zoom', 0, IN).land
const ROOM = { wall: '#3a1a3a', wall2: '#1c0c24', floor: '#40203e', win: { x: 700, y: 1000, w: 280, h: 300 } }
const PROOM = { wall: '#1e2a5a', wall2: '#101634', floor: '#24305c', win: { x: 110, y: 300, w: 300, h: 340 } }
const WORDS = ['fine.', 'k.', 'sure.', 'ok.', 'np.', 'fine.', 'cool.', 'k.', 'sure.', 'fine.', 'ok.', 'k.']

function wall(x, t) {
  const p = clamp((t - 0.22) / 1.0)
  WORDS.forEach((w, i) => {
    const c = i % 3, r = Math.floor(i / 3)
    const bx = 220 + c * 320, by = 560 + r * 150
    const dx = bx - 540, dy = by - 760, d = Math.hypot(dx, dy) || 1
    const fly = ease.outCubic(p) * 900
    const X = bx + (dx / d) * fly, Y = by + (dy / d) * fly + p * p * 400
    x.save(); x.translate(X, Y); x.rotate(p * (i % 2 ? 2 : -2))
    x.globalAlpha = 1 - p * 0.5
    box(x, -120, -48, 240, 96, '#3a3168', { r: 36, b: 5 })
    x.font = `800 44px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(w, 0, 2)
    x.restore()
  })
}
const MK = [
  [LAND, { x: 540, y: 760, size: 330, mood: 'wide' }],
  [2.5, { x: 540, y: 760 }],
  [11.5, { x: 780, y: 760, size: 310, mood: 'neutral' }],
  [12.8, { mood: 'happy' }],
  [23.0, { x: 780, y: 760, size: 300, mood: 'happy' }],
  [25.2, { mood: 'proud' }],
]
const SK = [
  [0, { x: 540, y: 1360, size: 300, mood: 'squint', look: [0, -1] }],
  [11.5, { x: 320, y: 1160, mood: 'squint', look: [1, -0.4] }],
  [13.0, { mood: 'neutral' }],
  [23.0, { mood: 'happy', look: [0, 0] }],
]
const SHOPS = [0.45, 11.7, 12.1, 23.1, 23.5]

function shotWall(x, t, H) {
  room(x, t, ROOM)
  wall(x, t)
  sign(x, 'scorpio', t, track(t, SK), { hops: SHOPS })
  if (t < LAND) drawEntranceFx(x, 'mercury', 'zoom', t, IN)
  const P = t < LAND ? { ...entrance('zoom', t, IN), mood: 'wide' } : track(t, MK)
  merc(x, t, P, { talk: H.mouth(t), sweat: true })
}
const PP = { name: 'Pisces', sub: 'online', color: '#7a8cf0' }
const MSGS = [
  { at: -5, side: 'L', text: 'so sorry, can’t make tonight :(' },
  { at: -5, side: 'L', text: 'I feel awful' },
  { at: 3.2, side: 'R', text: 'fine.' },
  { at: 18.2, side: 'R', text: 'I was really looking forward to it. Next week?' },
  { at: 19.8, side: 'L', text: 'I thought you hated me' },
  { at: 20.5, side: 'L', text: 'next week!!' },
]
function shotChat(x, t, H, t0) {
  room(x, t, { ...ROOM, dim: 0.55 })
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...PP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: [{ t0: 15.9, text: 'I was really looking forward to it. Next week?', cps: 24, sent: 18.2, gold: true }], dots: [[18.6, 19.8]], receipt: t < 6.5 && t > 3.6 ? { at: 3.6, text: 'Read' } : null })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 19.8 ? 'love' : t > 15 ? 'happy' : 'sly', look: [-1, 1] }, { talk: H.mouth(t) })
  if (t > 4.0 && t < 6.5) { const s = easeOutBack(prog(t, 4.0, 4.3), 2.4); x.save(); x.translate(540, 1640); x.rotate(-0.05); x.scale(s, s); box(x, -150, -50, 300, 100, '#ff3b3b', { r: 14 }); label(x, 'FINE?', 0, 2, { size: 64, col: BONE, stroke: null }); x.restore() }
}
const DECODE = [[7.3, 'I was looking forward to it.'], [8.1, 'I’m a bit disappointed.'], [8.9, 'I miss you.'], [9.7, 'I don’t want to seem needy.']]
function shotDecode(x, t, H) {
  room(x, t, { ...ROOM, dim: 0.45 })
  const sp = easeOutBack(prog(t, 6.5, 6.9), 2.2)
  x.save(); x.translate(540, 560); x.scale(sp, sp)
  box(x, -200, -80, 400, 160, '#3a3168', { r: 60, b: 8 })
  x.font = `800 90px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('fine.', 0, 4)
  x.restore()
  label(x, 'DECODING…', 540, 420, { size: 40, font: MONO, weight: 700, col: '#9fe6b0', alpha: t < 10.6 ? 0.5 + 0.5 * (Math.floor(t * 4) % 2) : 0 })
  // the scroll of real feelings
  const ur = ease.outCubic(prog(t, 7.0, 7.4))
  if (ur > 0) {
    box(x, 120, 680, 840, 560 * ur, '#f4e8cc', { r: 10, b: 8 })
    x.save(); x.beginPath(); x.rect(120, 680, 840, 560 * ur); x.clip()
    DECODE.forEach(([at, txt], i) => { const k = clamp((t - at) / 0.25); if (k <= 0) return; x.globalAlpha = k; x.font = `italic 600 52px ${SERIF}`; x.fillStyle = '#3a2240'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('· ' + txt, 160, 760 + i * 130); x.globalAlpha = 1 })
    x.restore()
  }
  merc(x, t, { x: 880, y: 1480, size: 260, mood: t > 9.0 ? 'love' : 'wide', look: [-1, -1] }, { talk: H.mouth(t), sweat: t < 8 })
  sign(x, 'scorpio', t, { x: 250, y: 1520, size: 260, mood: t > 9.5 ? 'wide' : 'squint', look: [1, -1], shadow: false }, { hops: [9.75] })
}
function shotTwo(x, t, H) {
  room(x, t, ROOM)
  sign(x, 'scorpio', t, track(t, SK), { hops: SHOPS })
  merc(x, t, track(t, MK), { talk: H.mouth(t), hops: [12.8, 13.6, 14.4, 25.2] })
}
function shotPisces(x, t) {
  room(x, t, PROOM)
  sign(x, 'pisces', t, { x: 540, y: 1150, size: 400, mood: 'sparkle', look: [0, 0.6], tears: 3 }, { hops: [21.1, 21.5, 21.9, 22.3, 22.7] })
  box(x, 700, 1200, 140, 230, '#2b2350', { r: 18, b: 6 }); x.fillStyle = '#9fb4ff'; x.fillRect(714, 1214, 112, 202)
  hearts(x, t, 21.1, 540, 900, { n: 9, spread: 520 })
}

const SPEECH = [
  { t0: 6.7, t1: 10.9, x: 380, y: 1290, who: 'mercury', text: 'what *fine.* actually means:', size: 40, cps: 50, tail: 260 },
  { t0: 11.7, t1: 15.2, x: 330, y: 860, who: 'scorpio', text: 'saying all that feels *risky.*', size: 42, tail: -30, maxW: 560 },
  ...burst(12.8, ['name it.', 'no *blame.*', 'leave the door *open.*'], { x: 580, y: 300, gap: 0.8, t1: 15.3 }),
  { t0: 21.3, t1: 22.9, x: 540, y: 600, who: 'pisces', text: 'NEXT *WEEK!!*', size: 58, shake: 3 },
]

function draw(x, t, H) {
  if (t < 2.6) shotWall(x, t, H)
  else if (t < 6.5) shotChat(x, t, H, 2.6)
  else if (t < 11.5) shotDecode(x, t, H)
  else if (t < 15.5) shotTwo(x, t, H)
  else if (t < 21.0) shotChat(x, t, H, 15.5)
  else if (t < 23.0) shotPisces(x, t)
  else shotTwo(x, t, H)
}

const F = film({
  id: 'kpmee08', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'SCORPIO. | ‘Fine’ is not a *feeling.*', top: 180, size: 104, out: [2.45, 2.6] },
  last: { at: 25.3, text: 'Short is fine. | *True* is better.', top: 220, size: 104 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: LAND, len: 0.45, amp: 26 }],
    ['rec', { at: 1.0, len: 1.3, caption: 'the friend cancelled. *‘fine.’*', sub: 'scorpio, feeling a lot', top: 1560 }],
    ['whip', { at: 2.6, len: 0.35, from: 1.3 }],
    ['glitch', { at: 6.5, len: 0.45, dialog: false }],
    ['whip', { at: 21.0, len: 0.3, from: 1.3 }],
  ],
  extraCues: [
    ...entranceCues('zoom', IN), ['crash', 0.0, { gain: 0.05, len: 1.2 }],
    ['pop', 3.2, 880, 0.04, 0.2], ['tom', 4.0, 80, { gain: 0.25, decay: 0.3 }],
    ...DECODE.map(([a]) => ['pluck', a, 783.99, 0.03, 0.5, 0.2]),
    ['whoosh', 18.2, 0.3, 0.05], ['pop', 18.25, 1318.51, 0.04, 0.2], ['pop', 19.8, 1567.98, 0.05, -0.2], ['pop', 20.5, 1760, 0.05, -0.2],
    ['pluck', 21.3, 659.25, 0.035, 0.5, 0.3], ['pluck', 21.5, 587.33, 0.035, 0.5, 0.3], ['glitter', 21.1, 22.6],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [RED, PINK, GOLD]
