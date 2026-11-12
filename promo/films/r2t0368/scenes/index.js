// r2t0368: THE SIGNS AS… v3, BELIKE, "Bed made for you? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Bed made for you? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one made-bed moment per sign (3.8 s each), pushed to the extreme:
//              ♈ jumped on it, ruined in half a second · ♉ got in, won't leave until spring (hibernating)
//              · ♊ said thanks, asked for different pillows · ♋ felt so cared for, moved in with them
//              · ♌ assumed it was a fan's tribute (a rose on the pillow) · ♍ thanked them warmly, then remade it
//              · ♎ too pretty to sleep in, slept on the floor · ♏ nobody's this nice, checking their chart
//              · ♐ hasn't been home in weeks, didn't notice · ♑ offered them a job, full benefits
//              · ♒ sleeps in a hammock, what bed? · ♓ got tucked in, happy sobbing
//  49.2        "One made bed. | *Twelve meltdowns.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Spring came. | *Taurus didn’t.*"  Taurus is back in the bed, still hibernating.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
/** a pixel bed (side-on): headboard, mattress, duvet; mess 0 = crisp, 1 = wrecked */
function bed(x, t, cx, cy, k, { w = 420, duvet = '#6fc3ff', mess = 0, pillows = 1, frilly = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 14, -150, 46, 260); x.fillStyle = WOOD; x.fillRect(-w / 2 - 6, -142, 30, 244)
  x.fillStyle = INK; x.fillRect(-w / 2, 20, w + 10, 90); x.fillStyle = WOOD; x.fillRect(-w / 2 + 6, 70, w - 2, 32)
  x.fillStyle = INK; x.fillRect(-w / 2 + 30, 100, 24, 44); x.fillRect(w / 2 - 30, 100, 24, 44)
  for (let i = 0; i < pillows; i++) { x.fillStyle = INK; x.fillRect(-w / 2 + 30 + i * 30, -46 - i * 14, 120, 66); x.fillStyle = i % 2 ? LAV : CREAM; x.fillRect(-w / 2 + 36 + i * 30, -40 - i * 14, 108, 54) }
  // duvet
  x.save()
  const lump = mess * 40
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 120, 82); x.lineTo(-w / 2 + 120, -6 - lump * Math.sin(t * 9)); x.quadraticCurveTo(0, -30 - lump * 1.6, w / 2 + 14, -10 + lump); x.lineTo(w / 2 + 14, 82); x.closePath(); x.fill()
  x.fillStyle = duvet; x.beginPath(); x.moveTo(-w / 2 + 128, 74); x.lineTo(-w / 2 + 128, 2 - lump * Math.sin(t * 9)); x.quadraticCurveTo(0, -22 - lump * 1.6, w / 2 + 6, -2 + lump); x.lineTo(w / 2 + 6, 74); x.closePath(); x.fill()
  if (!mess) { x.fillStyle = CREAM; x.fillRect(-w / 2 + 128, 4, w - 122, 14) }
  if (frilly) { x.fillStyle = PINK; for (let i = 0; i < 9; i++) x.fillRect(-w / 2 + 130 + i * 34, 66, 20, 26) }
  x.restore()
  x.restore()
}
const ROSE = ['.RR.RR.', 'RRWRRRR', 'RWRRWRR', '.RRRRR.', '...G...', '..GG...', '...G...', '...GG..', '...G...']
const ROSE_C = { R: '#ff4f86', W: '#ffd0df', G: '#5fd068' }
const SUITCASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KPPPPPPPPK', 'KPYPPPPYPK', 'KPPPPPPPPK', 'KPYPPPPYPK', 'KPPPPPPPPK', 'KKKKKKKKKK', '.K......K.']
const RULER = ['YYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYK', 'YYYYYYYYYYYYYYYY']
const LENS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
const POSTCARD = ['KKKKKKKKKKKK', 'KSSSSSSSSWWK', 'KSSGGSSSSWWK', 'KSGGGGSSSSSK', 'KGGGGGGGSSSK', 'KYYYYYYYYYYK', 'KKKKKKKKKKKK']
/** a contract on a clipboard */
function contract(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = '#c98f2a'; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = CREAM; x.fillRect(-112, -140, 224, 296)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('JOB OFFER', 0, -110)
  x.fillStyle = '#c9c2e6'; for (let i = 0; i < 4; i++) x.fillRect(-90, -60 + i * 40, 180 - (i % 2) * 40, 8)
  x.strokeStyle = '#3a6fd8'; x.lineWidth = 5; x.beginPath(); x.moveTo(-80, 120); x.bezierCurveTo(-40, 90, 0, 140, 60, 104); x.stroke()
  x.restore()
}
/** a hammock between two posts */
function hammock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-240, -200, 28, 380); x.fillRect(212, -200, 28, 380); x.fillStyle = WOOD; x.fillRect(-234, -194, 16, 368); x.fillRect(218, -194, 16, 368)
  const sw = 10 * Math.sin(t * 2)
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.moveTo(-210, -150); x.quadraticCurveTo(sw, 120, 210, -150); x.stroke()
  x.strokeStyle = '#ffb34a'; x.lineWidth = 16; x.beginPath(); x.moveTo(-210, -150); x.quadraticCurveTo(sw, 120, 210, -150); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Jumped on it. | *Ruined in half a second.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -40, y: -60 }, hops: [0.4, 0.7, 1.0, 1.3],
    back(x, t, lt, P) { bed(x, t, 560, 1050, pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: '#ff8a6a', mess: lt > 0.6 ? 1 : 0 }) },
    front(x, t, lt, P) { L(x, 800, 640, 'MADE FOR: 0.5 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32) } },
  { sign: 'taurus', cap: 'Got in. | *Leaving in spring.*', mood: lt => lt > 0.8 ? 'sleepy' : 'heart', star: { x: -60, y: 70, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bed(x, t, 560, 1050, pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: '#5fd068' }) },
    front(x, t, lt, P) {
      if (lt > 0.8) { x.fillStyle = BONE; x.font = `800 ${50 + 6 * Math.sin(t * 3)}px ${INTER}`; x.fillText('z', 620, 760 - (t * 30) % 60); x.fillText('Z', 680, 690 - (t * 30) % 60) }
      L(x, 790, 620, 'HIBERNATING', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: 'gemini', cap: 'Said thank you. | *Asked for new pillows.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    back(x, t, lt, P) { bed(x, t, 700, 1060, 0.75 * pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: GOLD, pillows: 2 }) },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'love it!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      bubble(x, 800, 820, '…softer pillows?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Felt so cared for. | *Moved in with them.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, P: SKYB, Y: GOLD }, 780, 930, 22 * pop01(t, P.t0 + 0.5, 0.35, 2))
      bubble(x, 760, 640, 'is this my | room now?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1150, 'NEW ROOMMATE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'leo', cap: 'Assumed it was | *a fan’s tribute.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', star: { x: -220 }, hops: [1.2],
    back(x, t, lt, P) { bed(x, t, 700, 1060, 0.75 * pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: '#ffb34a' }) },
    front(x, t, lt, P) {
      drawBits(x, ROSE, ROSE_C, 610, 960, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 1.2 })
      bubble(x, 760, 650, 'for me? | obviously.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 610, 960, P.t0 + 0.7, 6, 90, 0.3)
    } },
  { sign: 'virgo', cap: 'Thanked them warmly. | *Then remade it.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bed(x, t, 700, 1060, 0.75 * pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: MINT, mess: lt > 1.4 ? 0 : 0.25 }) },
    front(x, t, lt, P) {
      drawBits(x, RULER, { Y: GOLD, K: INK }, 740, 900, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.05 })
      L(x, 790, 650, 'CORNERS: REDONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Too pretty to sleep in. | *Slept on the floor.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', star: { x: -250, y: 120, s: 220 },
    back(x, t, lt, P) { bed(x, t, 680, 930, 0.8 * pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: PINK, pillows: 3, frilly: true }) },
    front(x, t, lt, P) {
      sparkles(x, t, 700, 900, P.t0 + 0.5, 6, 200, 0.6)
      L(x, 780, 650, 'TOO GORGEOUS', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Nobody’s this nice. | *What do they want?*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    back(x, t, lt, P) { bed(x, t, 700, 1060, 0.75 * pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: '#c97bff' }) },
    front(x, t, lt, P) {
      drawBits(x, LENS, { K: INK, S: 'rgba(143,227,255,0.8)', W: '#fff' }, 760 + 40 * Math.sin(t * 2), 860, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 650, 'CHECKING THEIR CHART', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 28, BONE)
    } },
  { sign: 'sagittarius', cap: 'Hasn’t been home in weeks. | *Didn’t notice.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, POSTCARD, { K: INK, S: SKYB, G: '#5a8f6a', W: '#fff', Y: GOLD }, 780, 820, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 })
      bubble(x, 780, 620, 'greetings from | somewhere!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1100, 'BED: STILL MADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Offered them a job. | *Full benefits.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      contract(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1110, 'START: MONDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Sleeps in a hammock. | *What bed?*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: 0, y: 30, s: 240 },
    back(x, t, lt, P) { hammock(x, t, 540, 960, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) { bubble(x, 540, 650, 'a bed? how quaint.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' }) } },
  { sign: 'pisces', cap: 'Someone tucked them in. | *Happy sobbing.*', mood: lt => lt > 0.9 ? 'wide' : 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -60, y: -20, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bed(x, t, 560, 1060, pop01(t, P.t0 + 0.1, 0.35, 2), { duvet: '#b7a6ff' }) },
    front(x, t, lt, P) {
      hearts(x, t, 760, 900, P.t0 + 0.8, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
      L(x, 800, 640, 'FEELINGS: ALL OF THEM', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 28)
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2t0368', key: 'G', accent: SKYB, ending: 'callback',
  title: 'Bed made for you? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One made bed. | *Twelve meltdowns.*' },
  last: {
    text: 'Spring came. | *Taurus didn’t.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      bed(x, t, 540, 1260, 1.1 * k, { duvet: '#5fd068' })
      signChar(x, t, 'taurus', 480, 1180, 280 * k, { mood: 'sleepy', seed: 40 })
      x.fillStyle = BONE; x.font = `800 ${60 + 6 * Math.sin(t * 3)}px ${INTER}`; x.fillText('z', 680, 1000 - (t * 30) % 60); x.fillText('Z', 750, 920 - (t * 30) % 60)
      label(x, 540, 1460, 'STILL HIBERNATING', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
