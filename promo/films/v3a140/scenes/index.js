// v3a140: star_advice, ADVICE ROLLCALL, "What each sign | should let go of." (~56 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific thing each can put down, each with one light visual gag.
//   0.0–3.6    "What each sign | *should let go of.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ a trophy for every argument, set down · ♉ the comfort zone has a door (it creaks open)
//              · ♊ the essay explaining a changed mind (part seven) · ♋ the ex's hoodie floats into the donate box
//              · ♌ the APPLAUSE sign switches off, Leo glows anyway · ♍ the typo, circled, replayed all week
//              · ♎ draft fourteen to a match was already perfect · ♏ the grudge list, crossed off line by line
//              · ♐ the suitcase is packed for the couch · ♑ "rest" climbs from the bottom of the to-do list to the top
//              · ♒ "i'm so chill" (hearts everywhere) · ♓ the sad playlist skips to something happy (tears anyway)
//  49.2        "Lighter already. | *Look at you.*"  The twelve fly up into a group photo.
//  52.6        callback: "Cancer let go. | Kept *one sleeve.*" (the hoodie, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2', HOOD = '#6fc3ff'

// ── props
const TROPHY = [
  'YYYYYYYYYYY',
  'Y.YYYYYYY.Y',
  'Y.YYWYYYY.Y',
  '.YYYWYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '....YYY....',
  '....YYY....',
  '..BBBBBBB..',
  '..BBBBBBB..',
]
const TROPHY_C = { Y: GOLD, W: '#fff8d8', B: WOOD }
const HOODIE = [
  '...HHHHHHH...',
  '..HHH...HHH..',
  '.HHHH...HHHH.',
  'HHHHHHHHHHHHH',
  'HHHHHWHWHHHHH',
  'HHHHHWHWHHHHH',
  'HH.HHHHHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HKKKKKH.HH',
  'HH.HKKKKKH.HH',
  'DD.HHHHHHH.DD',
  '...DDDDDDD...',
]
const HOODIE_C = { H: HOOD, W: '#ffffff', K: '#4a9bd6', D: '#3d7cb8' }
const SLEEVE = [
  'HHHHH.....',
  'HHHHHH....',
  '.HHHHHH...',
  '..HHHHHH..',
  '...HHHHHH.',
  '....HHHHHD',
  '.....HHHDD',
  '......HDD.',
]
const BOX = [
  'KKKKKKKKKKKKKK',
  'KBBBBBBBBBBBBK',
  'KBBBBBBBBBBBBK',
  'KBBBBBBBBBBBBK',
  'KBBBBBBBBBBBBK',
  'KBBBBBBBBBBBBK',
  'KKKKKKKKKKKKKK',
]
const BOX_C = { K: '#7a5230', B: '#c98f5a' }
const MAG = [
  '.KKKK....',
  'KSSSSK...',
  'KSWSSK...',
  'KSSSSK...',
  'KSSSSK...',
  '.KKKKK...',
  '.....KK..',
  '......KK.',
  '.......KK',
]
const MAG_C = { K: '#2a2350', S: SKYB, W: '#ffffff' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', G: '#6b62a8' }
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'OOOOOOOOOOOO',
  'OOWOOOOOOWOO',
  'OOWOOOOOOWOO',
  'OOOOOOOOOOOO',
  'OOWOOOOOOWOO',
  'OOWOOOOOOWOO',
  'OOOOOOOOOOOO',
  '.K........K.',
]
const SUITCASE_C = { K: '#2a2350', O: '#ff9a4a', W: '#ffd9a8' }
const TAPE = [
  'KKKKKKKKKKKKKK',
  'KLLLLLLLLLLLLK',
  'KLWWWWWWWWWWLK',
  'KLWKKWWWWKKWLK',
  'KLWKKWWWWKKWLK',
  'KLWWWWWWWWWWLK',
  'KLLLLLLLLLLLLK',
  'KLLKKKKKKKKLLK',
  'KKKKKKKKKKKKKK',
]
const TAPE_C = { K: '#2a2350', L: LAV, W: PAPER }

// a door in its frame; the door swings open (sx shrinks) to show warm light
function door(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-96, -186, 192, 342)
  x.fillStyle = '#fff1b0'; x.fillRect(-82, -172, 164, 328)
  x.globalAlpha = 0.35 * open; x.fillStyle = '#fff8d8'; x.beginPath(); x.moveTo(-82, 156); x.lineTo(82, 156); x.lineTo(150, 230); x.lineTo(-150, 230); x.closePath(); x.fill(); x.globalAlpha = 1
  const w = 164 * (1 - 0.72 * open)
  x.fillStyle = INK; x.fillRect(-82 - 4, -176, w + 8, 336)
  x.fillStyle = '#b5703a'; x.fillRect(-82, -172, w, 328)
  x.fillStyle = '#8a4a2e'; x.fillRect(-82 + w * 0.15, -150, w * 0.7, 120); x.fillRect(-82 + w * 0.15, -10, w * 0.7, 140)
  x.fillStyle = GOLD; x.fillRect(-82 + w - 26 * (1 - 0.5 * open), -6, 14, 14)
  x.restore()
}
// a scroll of paper that keeps unrolling
function scroll(x, cx, top, len, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-114, -14, 228, len + 28)
  x.fillStyle = PAPER; x.fillRect(-106, -6, 212, len + 12)
  x.fillStyle = '#c9b89a'
  for (let y = 70; y < len - 6; y += 26) x.fillRect(-84, y, y % 52 ? 150 : 168, 8)
  x.fillStyle = WOOD; x.fillRect(-124, -22, 248, 22); x.fillRect(-124, len + 6, 248, 22)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WHY I CHANGED', 0, 34)
  x.restore()
}
// a notebook list whose lines get crossed out
function grudgeList(x, cx, cy, k, crossed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -164, 260, 340)
  x.fillStyle = INK; x.fillRect(-134, -176, 268, 352)
  x.fillStyle = '#2a1f4a'; x.fillRect(-126, -168, 252, 336)
  x.fillStyle = PAPER; x.fillRect(-114, -156, 228, 312)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE LIST', 0, -122)
  const ITEMS = ['said "k"', 'took my seat', 'spoiled a show', 'left me on read', 'ate my fries']
  x.font = `700 22px ${INTER}`; x.textAlign = 'left'
  ITEMS.forEach((s, i) => {
    const y = -72 + i * 50
    x.fillStyle = INK; x.fillText(`${i + 1}. ${s}`, -96, y)
    const c = clamp(crossed - i)
    if (c > 0) { x.fillStyle = RED; x.fillRect(-100, y - 3, 200 * c, 7) }
  })
  x.restore()
}
// a clipboard to-do list; "rest" climbs from the bottom to the top at `up`
function todo(x, t, cx, cy, k, up) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -194, 280, 410)
  x.fillStyle = INK; x.fillRect(-144, -206, 288, 420)
  x.fillStyle = '#b5703a'; x.fillRect(-136, -198, 272, 404)
  x.fillStyle = PAPER; x.fillRect(-120, -170, 240, 362)
  x.fillStyle = '#9aa5c4'; x.fillRect(-46, -214, 92, 34)
  const ITEMS = ['email', 'plan Q1', 'plan Q2', 'plan Q3', 'plan Q4']
  const rowY = i => -130 + i * 52
  x.font = `700 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const u = ease.inOutCubic(up)
  ITEMS.forEach((s, i) => {
    const y = rowY(i) + 52 * u
    x.fillStyle = INK; x.fillRect(-100, y - 13, 26, 26); x.fillStyle = PAPER; x.fillRect(-96, y - 9, 18, 18)
    x.fillStyle = INK; x.fillText(s, -60, y)
  })
  const ry = lerp(rowY(5), rowY(0), u)
  if (u > 0.9) { x.fillStyle = GOLD; x.fillRect(-110, ry - 22, 220, 44) }
  x.fillStyle = INK; x.fillRect(-100, ry - 13, 26, 26); x.fillStyle = PAPER; x.fillRect(-96, ry - 9, 18, 18)
  if (u >= 1) { x.fillStyle = '#2fc79a'; x.fillRect(-96, ry - 9, 18, 18) }
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('REST', -60, ry)
  x.restore()
}
// a message bubble (the typo) with a red marker circle drawn around it
function typo(x, t, cx, cy, k, ring) {
  if (k <= 0.01) return
  bubble(x, cx, cy, 'see you tmrow!', k, { size: 40, col: SKYB, tail: 'br' })
  if (ring > 0) {
    x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath()
    x.ellipse(cx + 70, cy, 96, 42, -0.08, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring); x.stroke(); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Not every fight | *needs a winner.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const down = ease.inOutCubic(prog(lt, 1.1, 1.6))
      drawBits(x, TROPHY, TROPHY_C, 790, lerp(780, 1080, down), 22 * k * (1 - 0.35 * down), { rot: lerp(0.06, 0, down) })
      label(x, 790, 610, 'WON: THE ARGUMENT', pop01(t, P.t0 + 0.5, 0.3, 2) * (1 - down), { size: 30, bg: GOLD, rot: -0.05 })
      bubble(x, 780, 660, 'okay, you | can be right', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Your comfort zone | *has a door.*', mood: lt => lt > 1.5 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      door(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 1.0, 1.6)))
    },
    front(x, t, lt, P) {
      label(x, 800, 640, 'COMFORT ZONE: EXIT', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: MINT, rot: 0.05 })
      bubble(x, 420, 620, '...maybe | a peek?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'You changed your mind. | *No essay needed.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      scroll(x, 790, 560, lerp(150, 560, ease.outCubic(prog(lt, 0.3, 1.8))), pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 1150, 'PART 7 OF 9', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 360, 600, 'so basically...', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Their hoodie | *can go now.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 790, 1100, 18 * k)
      label(x, 790, 1100, 'DONATE', k, { size: 28, bg: PAPER, rot: 0 })
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.3, 2)
      const d = ease.inOutCubic(prog(lt, 1.0, 1.7))
      drawBits(x, HOODIE, HOODIE_C, 790, lerp(800, 1010, d), 18 * k * (1 - 0.3 * d), { rot: lerp(0.08, 0, d), alpha: 1 - prog(lt, 1.55, 1.75) })
      bubble(x, 760, 620, 'bye, hoodie', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Not everyone has to clap. | *You still shine.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: lt => lt > 1.5 ? [0, 0] : [1, -1], star: { x: -160 }, hops: [1.6],
    front(x, t, lt, P) {
      const on = lt < 1.0 || (lt < 1.25 && Math.floor(lt * 20) % 2)
      label(x, 790, 640, 'APPLAUSE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: on ? RED : '#3a2e55', color: on ? '#fff' : '#7a6f99', rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.5) sparkles(x, t, 380, 860, P.t0 + 1.55, 8, 190, 0.3, [GOLD, '#ffb34a', BONE])
      bubble(x, 790, 900, 'glowing | anyway', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'That typo? | *Nobody noticed.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      typo(x, t, 760, 680, pop01(t, P.t0 + 0.25, 0.3, 2), ease.outCubic(prog(lt, 0.6, 1.1)))
      drawBits(x, MAG, MAG_C, 800 + 10 * Math.sin(t * 2.5), 900, 22 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.1 })
      label(x, 790, 1070, 'REPLAYED: ALL WEEK', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Draft fourteen | *was already perfect.*', mood: lt => lt > 1.7 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHONE, PHONE_C, 790, 900, 26 * k, { rot: 0.05 })
      const n = Math.min(14, 9 + Math.floor(Math.max(0, lt - 0.3) / 0.22))
      label(x, 790, 640, `DRAFT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'hey :)', k, { size: 44, col: '#fff', tail: 'br' })
      label(x, 790, 1060, 'TO: YOUR MATCH', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 26, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 820, P.t0 + 1.8, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'The grudge list | *can retire now.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      grudgeList(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.max(0, (lt - 0.6) / 0.24))
      label(x, 790, 1080, 'STATUS: RETIRED', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.06 })
    } },
  { sign: 'sagittarius', cap: 'Staying put | *is an adventure too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.5],
    back(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 320, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
    },
    front(x, t, lt, P) {
      label(x, 320, 700, 'DESTINATION:', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 790, 'THE COUCH', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 46, bg: PINK, rot: 0.05 })
      bubble(x, 680, 620, 'so exotic', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Your worth isn’t | *your to-do list.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      todo(x, t, 310, 860, pop01(t, P.t0 + 0.15, 0.35, 2), prog(lt, 0.9, 1.6))
    },
    front(x, t, lt, P) {
      sparkles(x, t, 300, 730, P.t0 + 1.65, 6, 110, 0.6)
      bubble(x, 700, 620, 'rest goes | first now', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'You can care | *out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: lt => lt > 1.2 ? [0, 0] : [1, 0], star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'i’m so | chill', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      hearts(x, t, 380, 760, P.t0 + 1.25, { n: 9, life: 2.2, spread: 300, cell: 9, seed: 6 })
      label(x, 790, 920, 'COVER: BLOWN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'The sad playlist | *can take a break.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt > 1.5 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sw = lt > 1.3
      drawBits(x, TAPE, TAPE_C, 790, 900, 20 * k, { rot: 0.05 })
      notes(x, t, 790, 800, { n: 4, cell: 7, col: sw ? GOLD : SKYB, seed: 2, alpha: k })
      label(x, 790, 640, sw ? 'NOW: A HAPPY ONE' : 'SAD SONGS: REPEAT', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: sw ? GOLD : LAV, rot: -0.05 })
      bubble(x, 790, 1080, 'happy tears!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'v3a140', key: 'C', accent: MINT, ending: 'callback',
  title: 'What each sign | *should let go of.*',
  cameos: CAMEOS,
  group: { cap: 'Lighter already. | *Look at you.*' },
  last: {
    text: 'Cancer let go. | Kept *one sleeve.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 470, 1120, 300 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      drawBits(x, SLEEVE, HOODIE_C, 680, 1110, 20 * pop01(t, t - lt + 0.7, 0.35, 2), { rot: -0.2 + 0.05 * Math.sin(t * 2) })
      hearts(x, t, 560, 1060, t - lt + 1.4, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
