// v3a027: star_advice, ADVICE SOLO, "Pisces, read this | before your next date." (~45 s vertical, signs3kit, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle pre-date advice for a Pisces, who cries in every card.
//   0.0–3.6    "Pisces, read this | *before the date.*"  (the batch topic says "before your next date": too wide for the title line)  One big Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              eat before you go (a packed sandwich) · one date isn't destiny (the crystal ball says: just coffee)
//              · crying at the menu? fine (IT HAD SOUP) · ask questions too ("wait, and you?") · notice how you feel
//              (a feelings meter lands on CALM) · red flags aren't a cute colour (STILL RED) · leave when you want to
//              (HOME BY 10. ALLOWED.) · text a friend after (Cancer: "how was it??") · you're someone's dream date too
//  37.8        "Soft heart. | *Clear eyes.*"  Pisces comes back, big.
//  41.2        callback: "Flag was red. | Pisces *went home.*"  the red flag comes back, and a cozy home with the lights on.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

const S = 'pisces', SEA = '#6fc3ff'
// ── props
const SANDWICH = ['..BBBBBB..', '.BBBBBBBB.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'YYYYYYYYYY', '.BBBBBBBB.']
const SANDWICH_C = { B: '#e7b46a', G: GREEN, R: RED, Y: GOLD }
const BALL = ['...LLLL...', '.LLLLLLLL.', 'LLWLLLLLLL', 'LWLLLLLLLL', 'LLLLLLLLLL', 'LLLLLLLLLL', '.LLLLLLLL.', '...LLLL...', '..WWWWWW..', '.WWWWWWWW.']
const BALL_C = { L: '#c9a6ff', W: WOOD }
const RFLAG = ['RRRRRR', 'RRRRRR', 'RRRRRR', 'RRRRRR', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....']
const RFLAG_C = { R: RED, P: '#c9c4d8' }
const DOOR = ['WWWWWWW', 'WDDDDDW', 'WDDDDDW', 'WDDDDDW', 'WDDDYDW', 'WDDDDDW', 'WDDDDDW', 'WDDDDDW']
const DOOR_C = { W: CREAM, D: WOOD, Y: GOLD }
const HOME = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.CCCCCCCC.', '.CYYCCDDC.', '.CYYCCDDC.', '.CCCCCDDC.', '.CCCCCDDC.']
const HOME_C = { R: SEA, C: CREAM, Y: GOLD, D: WOOD }

// a semicircle feelings meter; v = 0…1 needle
function meter(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const segs = [[RED, 'NOPE'], [GOLD, 'HM'], [MINT, 'CALM']]
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, Math.PI, 0); x.fill()
  segs.forEach(([c], i) => { x.fillStyle = c; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 160, Math.PI + i * Math.PI / 3, Math.PI + (i + 1) * Math.PI / 3); x.fill() })
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 70, Math.PI, 0); x.fill()
  const a = Math.PI + v * Math.PI
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); x.stroke()
  x.strokeStyle = BONE; x.lineWidth = 8; x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Eat before you go. | *Feelings need fuel.*', tears: 2, mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 1090, 'SNACK: PACKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One date | *isn’t destiny.*', tears: 2, mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, BALL, BALL_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 480, 640, 'is this… | the one?', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.3 ? 1 : 0.001), { size: 34, tail: 'bl' })
      label(x, 790, 840, 'JUST COFFEE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at the menu? | *Totally fine.*', tears: 3, mood: 'heart', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 830, 300, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04, head: SEA, headH: 64 }, () => {
        say(x, 'MENU', 0, -128, { size: 34 })
        ;['SOUP', 'PIE', 'TEA'].forEach((s, i) => say(x, s, 0, -40 + i * 64, { size: 38 }))
        if (lt > 0.9) { x.strokeStyle = PINK; x.lineWidth = 6; x.strokeRect(-80, -70, 160, 60) }
      })
      label(x, 790, 1100, 'IT HAD SOUP.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask questions too. | *Not just listen.*', tears: 2, mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 101, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 820, 700, '…and that’s | my whole life.', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.1 ? 1 : 0.001), { size: 32, tail: 'br' })
      bubble(x, 520, 640, 'wait, | and YOU?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Notice how | *you feel* with them.', tears: 2, mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const v = lt < 0.4 ? 0.1 : lt < 1.4 ? 0.1 + 0.4 * Math.abs(Math.sin(lt * 6)) : lerp(0.5, 0.86, ease.outBack(prog(lt, 1.4, 1.8)))
      meter(x, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), v)
      label(x, 790, 1090, 'FEELING: CALM', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 680, 'VIBE CHECK', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Red flags aren’t | *a cute colour.*', tears: 2, mood: lt => lt > 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, RFLAG, RFLAG_C, 800, 850, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 * Math.sin(t * 5) })
      bubble(x, 520, 640, 'ooh, red! | so cute!', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.3 ? 1 : 0.001), { size: 34, tail: 'bl' })
      label(x, 790, 1100, 'STILL RED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Leave when | *you want to.*', tears: 2, mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 870, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 650, 'EXIT', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 40, bg: MINT, rot: 0, font: MONO, weight: 700 })
      label(x, 790, 1110, 'HOME BY 10. ALLOWED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text a friend | *after.*', tears: 2, mood: 'heart', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        const a = pop01(t, P.t0 + 0.5, 0.25, 2), b = pop01(t, P.t0 + 1.0, 0.25, 2)
        if (a > 0.01) { x.save(); x.translate(-15, -80); x.scale(a, a); x.fillStyle = SKYB; x.fillRect(-95, -34, 190, 68); say(x, 'how was it??', 0, 2, { size: 28 }); x.restore() }
        if (b > 0.01) { x.save(); x.translate(20, 40); x.scale(b, b); x.fillStyle = BONE; x.fillRect(-95, -50, 190, 100); say(x, 'okay so.', 0, -18, { size: 30 }); say(x, 'call me.', 0, 20, { size: 30 }); x.restore() }
      })
      label(x, 780, 1110, 'DEBRIEF: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re someone’s | *dream date too.*', tears: 2, mood: 'sparkle', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.translate(740, 800); x.scale(k * 0.85, k * 0.85)
        x.fillStyle = INK; for (const [a, b, r] of [[0, 0, 150], [-110, 20, 100], [110, 20, 100], [0, 70, 120]]) { x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill() }
        x.fillStyle = BONE; for (const [a, b, r] of [[0, 0, 150], [-110, 20, 100], [110, 20, 100], [0, 70, 120]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
        x.restore()
        signChar(x, t, S, 740, 825, 160 * k, { mood: 'heart', seed: 102, glyph: false, tears: 1 })
        x.fillStyle = INK; for (const [a, b, r] of [[540, 1000, 24], [490, 1050, 15]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
      }
      hearts(x, t, 780, 760, P.t0 + 1.2, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a027', key: 'E', accent: SEA, solo: S, ending: 'callback',
  title: 'Pisces, read this | *before the date.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Clear eyes.*', mood: 'heart' },
  last: {
    text: 'Flag was red. | Pisces *went home.*',
    draw(x, t, lt) {
      drawBits(x, RFLAG, RFLAG_C, 330, 1060, 18 * pop01(t, t - lt + 0.4, 0.35, 2), { rot: -0.1 })
      drawBits(x, HOME, HOME_C, 650, 1040, 26 * pop01(t, t - lt + 0.8, 0.35, 2))
      label(x, 540, 1300, 'PAJAMAS: ON', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 650, 980, t - lt + 1.3, { n: 5, life: 2, spread: 200, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
