// v3t021: THE SIGNS AS… v3, "The signs as | pet owners." (~57 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs as | *pet owners.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one pet per sign (3.8 s each), each pushed to the extreme:
//              ♈ adopted a puppy, entered it in a race · ♉ napped with the cat for nine hours
//              · ♊ taught the parrot "what's your sign?" · ♋ the goldfish has a college fund · ♌ matching outfits with the dog
//              · ♍ the hamster has a chore chart · ♎ can't name the kitten, it's six now · ♏ adopted a spider, named it Sweetie
//              · ♐ got a horse, lives on the fourth floor · ♑ gave the dog a performance review
//              · ♒ the cat has a dating profile · ♓ the cat sat on them (happy tears)
//  49.2        "The pets | run *the house.*"  The twelve fly up into a group photo.
//  52.6        callback: "Libra named it. | *“Kitten.”*" (the six-year-old kitten gets its name tag).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }
const ORANGE = '#ffb34a', RED = '#e23d4e'

// ── props
const DOG = pad([
  '.........EE..',
  '........BBBB.',
  '........BKBBN',
  '.T......BBBBB',
  '.TBBBBBBBBBW.',
  '..BBBBBBBBB..',
  '..BBBBBBBBB..',
  '..B.B....B.B.',
  '..B.B....B.B.',
])
const DOG_C = { B: '#d9a066', E: '#8a5a2e', K: INK, N: INK, T: '#d9a066', W: '#d9a066' }
const CAT = pad([
  '.B.....B.',
  '.BB...BB.',
  '.BBBBBBB.',
  '.BGBBBGB.',
  '.BBBPBBB.',
  '..BBBBB..',
  '.BBBBBBB.',
  '.BBBBBBB.',
  '.BBBBBBBT',
  '.BB.B.BBT',
])
const catC = (b, g = MINT) => ({ B: b, G: g, P: PINK, T: b })
const CAT_LIE = pad([
  'B.B..........',
  'BBB..........',
  'GBG.......T..',
  'BPBBBBBBBBT..',
  'BBBBBBBBBBB..',
  '.BBBBBBBBBB..',
])
const PARROT = pad([
  '..RRR..',
  '.RRRRR.',
  '.RWRRYY',
  '.RRRRY.',
  '.RRRR..',
  '.GGRR..',
  'GGGRR..',
  '.GGRB..',
  '..BB...',
  '..BB...',
  '..Y.Y..',
])
const PARROT_C = { R: '#ff5a4f', W: '#ffffff', Y: GOLD, G: '#5fd068', B: '#6fc3ff' }
const BOWL = pad([
  '...WWWWW...',
  '..W.....W..',
  '.WSSSSSSSW.',
  'WSSSSSOOSSW',
  'WSSOOOOOSSW',
  'WSSSSSOOSSW',
  'WSSSSSSSSSW',
  '.WSSSSSSSW.',
  '..WWWWWWW..',
])
const BOWL_C = { W: '#d8f4ff', S: '#5fb8e8', O: ORANGE }
const HAMSTER = pad([
  '.E.....E.',
  'EBBBBBBBE',
  'BBKBBBKBB',
  'BBBBPBBBB',
  'BWWBBBWWB',
  '.BBBBBBB.',
  '..F...F..',
])
const HAMSTER_C = { E: '#ff9fb0', B: '#e8b26a', K: INK, P: PINK, W: '#fff4e2', F: '#ff9fb0' }
const SPIDER = pad([
  'K..K...K..K',
  '.K.K...K.K.',
  '..KKKKKKK..',
  'KKKWKKKWKKK',
  '..KKKKKKK..',
  '.K.KKKKK.K.',
  'K..K...K..K',
])
const SPIDER_C = { K: '#3a2f63', W: '#ffffff' }
const BOW = pad(['PP.PP', 'PPPPP', 'PP.PP'])
const HORSE = pad([
  '.....MM.....',
  '....BBBM....',
  '...BBBBMM...',
  '..BKBBBBMM..',
  '.BBBBBBBBMM.',
  'BBBBBBBBBBM.',
  'BNBB..BBBBBM',
  'BBB...BBBBBB',
  '......BBBBBB',
  '......BBBBBB',
])
const HORSE_C = { B: '#b07a4a', M: '#5b3a22', K: INK, N: '#5b3a22' }
const SHADES = pad(['KKKKKKK.KKKKKKK', 'KSSKKKKKKSSKKKK', '.KKKKK...KKKKK.'])

/** a sheet of paper with a title and ticked rows */
function sheet(x, cx, cy, k, { title, rows, ticks = 0, w = 280, h = 340, rot = 0.05, stamp }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 30px ${INTER}`; x.fillText(title, 0, -h / 2 + 36)
  x.textAlign = 'left'; x.font = `700 24px ${MONO}`
  rows.forEach((r, i) => {
    const y = -h / 2 + 92 + i * 52
    x.fillStyle = INK; x.fillRect(-w / 2 + 20, y - 14, 28, 28); x.fillStyle = '#fff4e2'; x.fillRect(-w / 2 + 24, y - 10, 20, 20)
    if (i < ticks) { x.fillStyle = '#2fc79a'; x.fillRect(-w / 2 + 26, y - 8, 16, 16) }
    x.fillStyle = INK; x.fillText(r, -w / 2 + 62, y + 2)
  })
  x.restore()
  if (stamp) label(x, cx + 40, cy + h / 2 - 40, stamp.text, stamp.k, { size: 30, bg: stamp.bg || GOLD, rot: -0.12 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Adopted a puppy. | Entered it in *a race.*', mood: 'sparkle', star: { x: -160 }, hops: [0.4, 0.8, 1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const run = Math.floor(t * 8) % 2
      drawBits(x, DOG, DOG_C, 790, 980 - run * 6, 20 * k)
      label(x, 760, 960, '#1', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: BONE, rot: 0, font: MONO, weight: 700 })
      bubble(x, 780, 690, 'GO GO GO!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1140, 'AGE: 9 WEEKS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Napped with the cat. | For *nine hours.*', mood: 'sleepy', star: { x: -150, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAT_LIE, catC('#9aa5c4', INK), 760, 1060, 22 * k)
      const h = Math.min(9, 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 8))
      label(x, 790, 760, `NAP: HOUR ${h}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'zzz', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Taught the parrot | *“what’s your sign?”*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PARROT, PARROT_C, 800, 990, 22 * k, { sx: -1 })
      x.fillStyle = '#8a4a2e'; if (k > 0.5) x.fillRect(700, 1112, 200, 16)
      bubble(x, 780, 700, 'WHAT’S YOUR | SIGN?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 790, 1170, 'ASKS EVERYONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'The goldfish has | a *college fund.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 960, 22 * k)
      label(x, 790, 720, 'FISH FUND', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 42, bg: MINT, rot: 0.05 })
      bubble(x, 800, 1150, 'law school?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 790, 880, P.t0 + 1.4, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Matching outfits. | With *the dog.*', mood: 'sparkle', star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DOG, DOG_C, 790, 1000, 20 * k)
      const g = pop01(t, P.t0 + 0.6, 0.3, 2.2)
      if (g > 0.01) {
        drawBits(x, SHADES, { K: INK, S: SKYB }, 866, 952, 5.5 * g)
        x.fillStyle = ORANGE; x.fillRect(790 - 30, 1000 - 12, 70 * g, 16)
        inSprite(x, F, () => { x.save(); x.globalAlpha = clamp(g); x.fillStyle = INK; x.fillRect(9.4, 17, 8, 4.4); x.fillRect(18.6, 17, 8, 4.4); x.fillRect(17, 17.6, 2, 1.2); x.fillStyle = SKYB; x.fillRect(10.2, 17.6, 2, 1.2); x.fillRect(19.4, 17.6, 2, 1.2); x.restore() })
      }
      label(x, 790, 760, 'TWINNING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 790, 960, P.t0 + 1.2, 6, 150, 0.3)
    } },
  { sign: 'virgo', cap: 'The hamster has | a *chore chart.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 830, k, { title: 'HAMMY: CHORES', rows: ['wheel: 40 laps', 'tidy cheeks', 'bed by 9'], ticks: Math.floor(clamp((lt - 0.7) / 1.0) * 3.99), h: 290 })
      drawBits(x, HAMSTER, HAMSTER_C, 790, 1100, 18 * pop01(t, P.t0 + 0.45, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Can’t name the kitten. | It’s *six now.*', mood: lt => lt > 1.7 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAT, catC('#ffc28a'), 790, 1010, 20 * k)
      const N = ['Muffin?', 'Biscuit?', 'Lily?', 'Mochi?', 'Muffin?']
      bubble(x, 780, 700, N[Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1180, 'AGE 6 · NAME: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Adopted a spider. | Named it *Sweetie.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const y = 900 + 8 * Math.sin(t * 3)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(790, 500); x.lineTo(790, y - 60 * k); x.stroke(); x.restore()
      drawBits(x, SPIDER, SPIDER_C, 790, y, 20 * k)
      drawBits(x, BOW, { P: PINK }, 790, y - 60, 12 * pop01(t, P.t0 + 0.7, 0.3, 2.4))
      label(x, 790, 1090, 'SWEETIE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.05 })
      hearts(x, t, 560, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 8 })
    } },
  { sign: 'sagittarius', cap: 'Got a horse. | Lives on *the fourth floor.*', mood: 'sparkle', star: { x: 160 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      // a flat's window with the horse leaning out
      x.save(); x.translate(320, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -170, 300, 300); x.fillStyle = '#6fc3ff'; x.fillRect(-140, -160, 280, 280)
      x.fillStyle = '#ffe7a8'; x.fillRect(-140, -160, 280, 280); x.restore()
      drawBits(x, HORSE, HORSE_C, 320, 860, 20 * k)
      x.save(); x.translate(320, 860); x.scale(k, k); x.fillStyle = '#8a4a2e'; x.fillRect(-165, 120, 330, 22); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 640, 'FLAT 4B', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1120, 'he loves the lift', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Gave the dog | a *performance review.*', mood: lt => lt < 1.3 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 790, k, { title: 'Q3 REVIEW: REX', rows: ['fetch: strong', 'sit: strong', 'mailman: work on'], ticks: 2, h: 280, w: 300 })
      drawBits(x, DOG, DOG_C, 830, 1110, 15 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: -1 })
      label(x, 800, 960, 'VERY GOOD BOY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.1 })
    } },
  { sign: 'aquarius', cap: 'The cat has | a *dating profile.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 260, 340)
        x.fillStyle = INK; x.fillRect(-136, -176, 272, 352); x.fillStyle = '#2a2350'; x.fillRect(-130, -170, 260, 340)
        x.fillStyle = '#140c30'; x.fillRect(-116, -156, 232, 200)
        x.restore()
        drawBits(x, CAT, catC('#3a2f63', GOLD), 790 + 10 * 0.05, 780, 16 * k)
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = '#6fc3ff'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MITTENS, 4', 0, 84)
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('likes: tuna, naps', 0, 126)
        x.restore()
      }
      label(x, 790, 1090, '♒︎ NEW MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'The cat sat on them. | *Happy tears.*', mood: 'sparkle', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -40, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 0.8))
      if (lt > 0.25) drawBits(x, CAT_LIE, catC('#ff9a4a', INK), lerp(820, 500, d), lerp(560, F.top - 50, d), 16)
      label(x, 800, 700, 'CHOSEN.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.06 })
      hearts(x, t, 500, F.top, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t021', key: 'C', accent: '#7dffb0', ending: 'callback',
  title: 'The signs as | *pet owners.*',
  cameos: CAMEOS,
  group: { cap: 'The pets | run *the house.*' },
  last: {
    text: 'Libra named it. | *“Kitten.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      drawBits(x, CAT, catC('#ffc28a'), 540, 1020, 34 * k)
      label(x, 540, 1260, 'KITTEN', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 46, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1060, t - lt + 1.1, 7, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
