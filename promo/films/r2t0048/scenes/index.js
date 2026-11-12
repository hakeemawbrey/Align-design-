// r2t0048: THE SIGNS AS… v3, SOLO film, "Your Capricorn roommate | be like." (~51 s vertical, signs3kit, lofi · G)
// One Capricorn, nine flat-share situations, each the most extreme (and lovable) Capricorn version. Ending: lesson.
//   0.0–3.6    "Your Capricorn roommate | *be like.*"
//   3.6–37.8   chore chart with quarterly reviews · labelled their milk with a contract · bed 9:30, alarm 4:45
//              · split the bill to the half cent · your party? they sent an agenda · bought a label maker, labelled you
//              · movie night: a tax documentary · you were sick, they made a recovery plan · their idea of fun: a
//              five-year plan
//  37.8        "Strict. | *Secretly soft.*"
//  41.0        LESSON: "Love a Capricorn? | They *show up.*"  STATUS: LOOKED AFTER
//  46.9        "Rent? | Paid *for the year.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'capricorn', SLATE = '#9aa5c4', TEAL = '#2fc79a', RED = '#e23d4e', ORANGE = '#ffb34a'

const CLOCK = [
  'B.........B',
  'BB.KKKKK.BB',
  '.KKWWWWWKK.',
  '.KWWWKWWWK.',
  'KWWWWKWWWWK',
  'KWWWWKKKWWK',
  'KWWWWWWWWWK',
  '.KWWWWWWWK.',
  '.KKWWWWWKK.',
  '..KKKKKKK..',
  '.K.......K.',
]
const CLOCK_C = { B: GOLD, K: RED, W: '#fff4e2' }
const MILK = [
  '.WWWW.',
  'WWWWWW',
  'WBBBBW',
  'WBWWBW',
  'WBBBBW',
  'WWWWWW',
  'WWWWWW',
]
const MILK_C = { W: '#fff4e2', B: SKYB }
const SOUP = [
  'S.S.S....',
  '.S.S.S...',
  '.........',
  'WWWWWWWWW',
  'WOOOOOOOW',
  '.WOOOOOW.',
  '..WWWWW..',
]
const SOUP_C = { S: '#ffffff', W: '#fff4e2', O: ORANGE }

// a paper document: title bar + lines of text
function doc(x, cx, cy, k, { title = '', lines = [], w = 380, h = 400, rot = 0.05, head = SLATE, size = 30, shown = 99 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, 58)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 30)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'left'
  lines.slice(0, shown).forEach((l, i) => { x.fillStyle = '#3a3160'; x.fillText(l, -w / 2 + 22, -h / 2 + 100 + i * (size + 22)) })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Made a chore chart. | With *quarterly reviews.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      doc(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'CHORES', lines: ['dishes … YOU', 'bins … YOU', 'vibes … ME'], size: 34, shown: 1 + Math.floor(prog(lt, 0.4, 1.2) * 3) })
      label(x, 780, 1080, 'Q3 REVIEW: FRIDAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Labelled their milk. | *With a contract.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 620, 960, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      doc(x, 830, 800, pop01(t, P.t0 + 0.9, 0.35, 2) * 0.85, { title: 'AGREEMENT', lines: ['milk: mine', 'sips: no', 'signed: ♑︎'], w: 300, h: 300, size: 32, rot: 0.1, head: GOLD })
    } },
  { sign: S, cap: 'In bed by 9:30. | Up at *4:45.*', mood: lt => lt < 1.0 ? 'sleepy' : 'sparkle', star: { x: -180 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ring = lt > 1.0 ? Math.sin(t * 60) * 0.08 : 0
      drawBits(x, CLOCK, CLOCK_C, 790, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: ring })
      label(x, 790, 1080, '4:45 A.M. · GOOD MORNING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Split the bill. | *To the half cent.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      doc(x, 780, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'RECEIPT', lines: ['pizza   24.37', 'split    ÷ 2', 'you   12.185'], size: 34, w: 340, h: 330, rot: -0.04, shown: 1 + Math.floor(prog(lt, 0.4, 1.3) * 3) })
      label(x, 780, 1080, 'YOU OWE ½¢', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your party? | They *sent an agenda.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      doc(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'PARTY AGENDA', lines: ['7:00 arrive', '7:05 small talk', '7:20 fun (brief)', '8:00 goodnight'], size: 30, w: 400, head: PINK, shown: 1 + Math.floor(prog(lt, 0.4, 1.5) * 4) })
    } },
  { sign: S, cap: 'Bought a label maker. | *Labelled you.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 920, 220 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      label(x, 790, 1110, 'ROOMMATE (NICE)', pop01(t, P.t0 + 1.2, 0.35, 2.4), { size: 32, bg: BONE, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Movie night. | *A tax documentary.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 230); x.fillStyle = '#2a2350'; x.fillRect(-160, -110, 320, 210)
        x.fillStyle = '#140c30'; x.fillRect(-148, -98, 296, 186)
        x.fillStyle = TEAL; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAXES:', 0, -30); x.fillText('A LOVE STORY', 0, 20)
        x.fillStyle = INK; x.fillRect(-20, 110, 40, 40); x.fillRect(-80, 146, 160, 14)
        x.restore()
      }
      label(x, 790, 1090, 'PART 1 OF 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You were sick. | They made *a recovery plan.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      doc(x, 790, 810, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, { title: 'GET WELL PLAN', lines: ['day 1: soup', 'day 2: soup', 'day 3: more soup'], size: 30, w: 400, head: MINT, shown: 1 + Math.floor(prog(lt, 0.4, 1.3) * 3) })
      drawBits(x, SOUP, SOUP_C, 800, 1090, 17 * pop01(t, P.t0 + 1.3, 0.35, 2))
      hearts(x, t, 500, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 100, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Their idea of fun? | *A five-year plan.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#fff4e2'; x.fillRect(-160, -140, 320, 280)
        const C = [SLATE, SKYB, TEAL, GOLD, PINK]
        for (let i = 0; i < 5; i++) { const h = 40 + i * 40, g = ease.outCubic(prog(lt, 0.4 + i * 0.18, 0.7 + i * 0.18)); x.fillStyle = C[i]; x.fillRect(-135 + i * 56, 120 - h * g, 42, h * g) }
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('Y1  Y2  Y3  Y4  Y5', 0, 136 - 8)
        x.restore()
      }
      label(x, 790, 640, 'SO FUN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.5, 6, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0048', key: 'G', accent: TEAL, solo: S, ending: 'lesson',
  title: 'Your Capricorn | roommate *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict. | *Secretly soft.*', mood: 'sparkle' },
  lesson: { text: 'Love a Capricorn? | They *show up.*', chip: 'STATUS: LOOKED AFTER' },
  last: {
    text: 'Rent? | Paid *for the year.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 9, 260, 0.2, [GOLD, BONE, MINT]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
