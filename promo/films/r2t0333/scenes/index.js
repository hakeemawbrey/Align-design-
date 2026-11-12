// r2t0333: star_talk, BE LIKE (twelve signs), "Package arrived? | Zodiacs be like." (~59 s vertical, signs3kit, lofi · G)
// The twelve signs in zodiac order, each the most extreme version of itself when a package shows up. Ending: lesson.
//   0.0–3.6    "Package arrived? | *Zodiacs be like.*"
//   3.6–49.2   Aries out since 6 a.m. · Taurus: the box is a bed now · Gemini asks the courier their rising sign
//              · Cancer kept the tape from their match's gift · Leo filmed the unboxing for no one · Virgo rated the
//              packaging 3/5 · Libra: which side to open, day two · Scorpio tracked it every four minutes · Sagittarius
//              is abroad when it lands · Capricorn returned it within the hour · Aquarius built a robot from the box
//              · Pisces got socks and sobbed
//  49.2        "Same box. | *Twelve meltdowns.*"
//  52.4        LESSON UNLOCKED: "The best part of a gift? | *Being thought of.*"  STATUS: DELIVERED
//  58.3        "And Taurus? | *Still in the box.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const KRAFT = '#c98f5a', KRAFT_D = '#9a6638', TAPE = '#e8d29a', PAPER = '#fff4e2'

// ── props
// a cardboard box with tape; open: flaps up
function box(x, cx, cy, k, { w = 240, h = 170, open = 0, rot = 0, text = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  if (open > 0) {
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 70 * open - 6, w * 0.45 + 12, 70 * open + 12); x.fillRect(w / 2 - w * 0.45 - 6, -h / 2 - 70 * open - 6, w * 0.45 + 12, 70 * open + 12)
    x.fillStyle = KRAFT_D; x.fillRect(-w / 2, -h / 2 - 70 * open, w * 0.45, 70 * open); x.fillRect(w / 2 - w * 0.45, -h / 2 - 70 * open, w * 0.45, 70 * open)
  }
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = KRAFT; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = KRAFT_D; x.fillRect(-w / 2, -h / 2, w, 14)
  if (!open) { x.fillStyle = TAPE; x.fillRect(-22, -h / 2, 44, h) }
  if (text) { x.fillStyle = PAPER; x.fillRect(-w / 2 + 20, h / 2 - 60, 120, 40); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -w / 2 + 80, h / 2 - 39) }
  x.restore()
}
const SUN = [
  '....Y....',
  '.Y.....Y.',
  '...OOO...',
  '..OOOOO..',
  'Y.OOOOO.Y',
  '..OOOOO..',
  '...OOO...',
  '.Y.....Y.',
  '....Y....',
]
const CAMERA = [
  '...KKK.......',
  'KKKKKKKKKKKKK',
  'KGGGGGGGGGGGK',
  'KGGGWWWWGGGGK',
  'KGGWBBBBWGGRK',
  'KGGWBSBBWGGGK',
  'KGGWBBBBWGGGK',
  'KGGGWWWWGGGGK',
  'KGGGGGGGGGGGK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#6b62a8', W: '#c9c9d8', B: '#140c30', S: SKYB, R: '#ff4f4f' }
const PIN = [
  '..RRRRR..',
  '.RRRRRRR.',
  'RRRWWWRRR',
  'RRWWWWWRR',
  'RRRWWWRRR',
  '.RRRRRRR.',
  '..RRRRR..',
  '...RRR...',
  '....R....',
]
const SUITCASE = [
  '...KKKKK...',
  '...K...K...',
  'SSSSSSSSSSS',
  'SsSSSSSSSsS',
  'SsSYYYYYSsS',
  'SsSSSSSSSsS',
  'SsSSSSSSSsS',
  'SSSSSSSSSSS',
  '.K.......K.',
]
const SUITCASE_C = { K: INK, S: '#ff8a4a', s: '#d8642a', Y: GOLD }
const ROBOT = [
  '.....A.....',
  '.....A.....',
  '..CCCCCCC..',
  '..CKCCCKC..',
  '..CCCCCCC..',
  '..CCRRRCC..',
  '..CCCCCCC..',
  '....CCC....',
  'CCCCCCCCCCC',
  'C.CCCCCCC.C',
  'C.CCDCDCC.C',
  'C.CCCCCCC.C',
  '..CC...CC..',
  '..CC...CC..',
]
const ROBOT_C = { A: GOLD, C: KRAFT, K: INK, R: '#ff4f86', D: '#9a6638' }
const SOCKS = [
  '.WWW...WWW.',
  '.PPP...PPP.',
  '.PHP...PHP.',
  '.PPP...PPP.',
  '.PHP...PHP.',
  '.PPPP..PPPP',
  'PPPPP.PPPPP',
  'PPPP..PPPP.',
]
const SOCKS_C = { W: BONE, P: '#ffb3c6', H: '#ff4f86' }
const TAPEROLL = [
  '..TTTTT..',
  '.TTTTTTT.',
  'TTT...TTT',
  'TT.....TT',
  'TT.....TT',
  'TTT...TTT',
  '.TTTTTTT.',
  '..TTTTT..',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Waited outside | *since 6 a.m.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD, O: '#ffb34a' }, 820, 660, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      box(x, 790, 960, pop01(t, P.t0 + 1.2, 0.35, 2.2), { rot: 0.05 })
      label(x, 790, 820, 'OUT FOR DELIVERY', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.25, 7, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Kept the box. | *Now it’s a bed.*', mood: 'sleepy', star: { x: -60, y: 20 },
    front(x, t, lt, P, F) {
      box(x, 480, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 380, h: 170, open: 1 })
      label(x, 790, 760, 'NEW BED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      label(x, 790, 860, 'DO NOT DISTURB', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked the courier | *their rising sign.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 1000, 190 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      box(x, 800, 1130, k * 0.6, { rot: -0.04 })
      bubble(x, 560, 640, 'your rising??', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 820, 780, 'uh… sign here?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'A gift from their match? | Kept *the tape.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'FROM: YOUR MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, TAPEROLL, { T: TAPE }, 790, 890, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      label(x, 790, 1090, 'KEEPSAKE #1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
      hearts(x, t, 620, 1060, P.t0 + 1.1, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Filmed the unboxing. | *For no one.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 860, 17 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      if (Math.floor(lt * 3) % 2 === 0) label(x, 900, 700, '● REC', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: '#ff4f4f', color: '#fff', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'VIEWERS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Rated the packaging. | *Three out of five.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04, text: 'DENTED' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 730); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -66, 300, 132); x.fillStyle = PAPER; x.fillRect(-142, -58, 284, 116)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PACKAGING', 0, -24)
        const n = Math.min(3, Math.floor(Math.max(0, lt - 0.9) / 0.25) + 1)
        x.font = `700 40px ${MONO}`
        for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? GOLD : '#d0c8b8'; x.fillRect(-110 + i * 48, 14, 34, 34) }
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Which side to open? | *Day two.*', mood: 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      box(x, 790, 900, k, { rot: Math.sin(lt * 2.5) * 0.06 })
      const side = Math.floor(lt * 2.5) % 2
      label(x, 790 + (side ? 120 : -120), 760, side ? 'THIS SIDE?' : 'OR THIS?', k, { size: 30, bg: LAV, rot: side ? 0.05 : -0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'STILL SEALED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03 })
    } },
  { sign: 'scorpio', cap: 'Tracked it | *every four minutes.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 890); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#2f5a4a'; x.fillRect(-142, -142, 284, 284)
        x.strokeStyle = '#5f9a7a'; x.lineWidth = 10; x.beginPath(); x.moveTo(-142, 60); x.lineTo(-20, 20); x.lineTo(40, -80); x.lineTo(142, -100); x.stroke()
        x.restore()
        drawBits(x, PIN, { R: '#ff4f86', W: '#fff' }, 790 + lerp(-90, 40, clamp(lt / 2)), 860 + lerp(30, -80, clamp(lt / 2)) - 40, 9 * k)
      }
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 87)
      label(x, 790, 1110, `CHECKED ×${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'It finally arrived. | *They’re abroad.*', mood: 'sparkle', look: [-1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    back(x, t, lt, P) { drawBits(x, SUITCASE, SUITCASE_C, 260, 1080, 13 * pop01(t, P.t0 + 0.3, 0.3, 2)) },
    front(x, t, lt, P) {
      box(x, 800, 1010, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.04 })
      label(x, 800, 860, 'DELIVERED: HOME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 560, 640, 'on a mountain!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Not as described? | *Returned in an hour.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790 + lerp(0, 120, ease.inCubic(prog(lt, 1.2, 1.8))), 940, pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - prog(lt, 1.6, 1.9)), { rot: 0.04, text: 'RETURN' })
      label(x, 790, 720, 'RETURN LABEL: PRINTED', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'REFUND: SECURED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Forgot the gift. | *Built a box robot.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 890, 20 * pop01(t, P.t0 + 0.3, 0.4, 2), { rot: Math.sin(lt * 4) * 0.05 })
      bubble(x, 800, 660, 'beep.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
      sparkles(x, t, 790, 890, P.t0 + 1.2, 8, 190, 0.4)
    } },
  { sign: 'pisces', cap: 'It’s just socks. | *They sobbed.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SOCKS, SOCKS_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      bubble(x, 800, 660, 'they’re SO soft', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 640, 1080, P.t0 + 1.0, { n: 5, life: 1.8, spread: 120, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0333', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'Package arrived? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same box. | *Twelve meltdowns.*' },
  lesson: { text: 'The best part of a gift? | *Being thought of.*', chip: 'STATUS: DELIVERED' },
  last: {
    text: 'And Taurus? | *Still in the box.*',
    draw(x, t, lt) { box(x, 540, 800, pop01(t, t - lt + 0.6, 0.35, 2), { w: 300, h: 150, open: 1 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
