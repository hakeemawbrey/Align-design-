// r2t0520: THE SIGNS AS… v3, "The signs on | *a coffee date.*" (~63 s vertical, signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order, each the most extreme version of itself on a first coffee date. Ending: card.
//   0.0–3.6    "The signs on | *a coffee date.*"
//   3.6–49.2   ♈ asked for date two before the coffee came · ♉ stayed for pastries · ♊ talked three hours, coffee
//              still full · ♋ already named your future dog · ♌ picked the seat with the best lighting · ♍ wiped the
//              table, then yours · ♎ couldn't pick a drink, the barista went home · ♏ ordered it black, like their
//              humour · ♐ suggested a road trip mid-latte · ♑ booked 45 minutes, invite sent · ♒ ordered a drink that
//              doesn't exist · ♓ cried at the latte art
//  49.2        "Twelve coffees. | *Some went cold.*"
//  52.4        LESSON: "The best dates | *feel easy.*"  DATE TWO: YES
//  58.3        "Date two? | *Aries booked it.*" over the match card: Aries + Libra (Libra can't pick; Aries already did).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#e0a85a', GREY = '#9aa5c4', RED = '#e23d4e', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const CUP = ['.S..S....', '..S..S...', 'WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCWWW', 'WWWWWWW..', '.WWWWW...', 'PPPPPPPP.']
const CUP_C = { S: '#d8dbe8', W: BONE, C: '#7a4a2e', P: '#c9a6ff' }
const CROIS = ['...CCCC...', '.CCcCCcCC.', 'CCcCCCCcCC', 'CcCCCCCCcC', '.C......C.']
const SPONGE = ['YYYYYYYY', 'YyYYyYYY', 'GGGGGGGG', 'GGGGGGGG']
const CAR = ['...BBBBB....', '..BSSBSSB...', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.KK.....KK..']
function latte(x, t, cx, cy, cell, k, art) {
  if (k <= 0.01) return
  drawBits(x, CUP, { ...CUP_C, C: art ? '#c98f5a' : '#7a4a2e' }, cx, cy, cell * k)
  if (art && k > 0.6) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PAPER }, cx - cell * 1, cy - cell * 0.5, cell * 0.5, { outline: null })
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Asked for date two | *before the coffee came.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'saturday?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: '#ffb3a0', tail: 'bl' })
      latte(x, t, 810, 1010, 20, pop01(t, P.t0 + 1.5, 0.3, 2), false)
      L(x, 800, 860, 'COFFEE: NOT YET', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Came for the date. | *Stayed for pastries.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, CROIS, { C: '#e0a85a', c: '#ffcf7a' }, 760 + (i % 2) * 90, 1060 - Math.floor(i / 2) * 70 - (i % 2) * 20, 15 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      L(x, 800, 720, 'CROISSANT #4', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Talked three hours. | *Coffee: untouched.*', mood: 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      latte(x, t, 820, 1010, 16, pop01(t, P.t0 + 0.2, 0.3, 2), false)
      bubble(x, 780, 700, 'ANYWAY so | then…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 820, 870, 'TEMP: ICED NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Already named | *your future dog.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 260, 200, pop01(t, P.t0 + 0.3, 0.3, 2), 0.05, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('OUR DOG', 0, -60)
        x.font = `800 48px ${INTER}`; x.fillStyle = '#2fa0c7'; x.fillText('Biscuit', 0, 6)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('(coming soon)', 0, 60)
      })
      hearts(x, t, 800, 1160, P.t0 + 1.3, { n: 6, life: 1.4, spread: 260, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Picked the seat | *with the best lighting.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: LS,
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.4, 0.8))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#ffe7a8'; x.beginPath(); x.moveTo(F.x + 260, 540); x.lineTo(F.x + 420, 540); x.lineTo(F.x + 140, 1100); x.lineTo(F.x - 180, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      card(x, 830, 700, 200, 150, pop01(t, P.t0 + 0.2, 0.3, 2), 0.02, x => { x.fillStyle = SKYB; x.fillRect(-90, -65, 85, 130); x.fillRect(5, -65, 85, 130) }, '#c98f2a')
      L(x, 800, 1080, 'LIGHTING: GOLDEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Wiped the table. | *Then wiped yours.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = '#c98f2a'; x.fillRect(640, 1040, 300, 22); x.restore()
      drawBits(x, SPONGE, { Y: '#ffe36a', y: '#fff1a0', G: '#5fd068' }, 760 + Math.sin(t * 8) * 70, 1000, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 790, 1000, P.t0 + 1.2, 7, 150, 0.2)
      L(x, 790, 760, 'TABLE 2 OF 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Couldn’t pick a drink. | *Barista went home.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 250, 310, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('MENU', 0, -122)
        for (let i = 0; i < 7; i++) { x.fillStyle = GREY; x.fillRect(-90, -80 + i * 34, 140, 12); x.fillStyle = INK; x.fillRect(66, -82 + i * 34, 24, 14) }
      })
      L(x, 800, 1130, 'CAFÉ: NOW CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 30, PAPER)
    } },
  { sign: 'scorpio', cap: 'Ordered it black. | *Like their humour.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CUP, { ...CUP_C, W: '#2a2350', C: '#140c30', P: '#a8324a' }, 800, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'ROAST: VERY DARK', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c97bff', -0.04, 30, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Suggested a road trip. | *Mid-latte.*', mood: 'sparkle', star: RS, hops: [0.5, 1.1],
    front(x, t, lt, P) {
      drawBits(x, CAR, { B: '#ff9a4a', S: SKYB, K: INK }, 330, 1010, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 340, 720, 'leave now?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      L(x, 330, 1150, 'DESTINATION: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Booked 45 minutes. | *Sent a calendar invite.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 280, 230, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.fillStyle = '#5fd068'; x.fillRect(-140, -115, 280, 50)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('INVITE', 0, -90)
        x.font = `800 28px ${INTER}`; x.fillText('Coffee w/ match', 0, -20)
        x.font = `700 22px ${MONO}`; x.fillText('3:00–3:45', 0, 30)
        if (lt > 1.0) { x.fillStyle = '#2fc79a'; x.fillText('✓ ACCEPTED', 0, 76) }
      })
      L(x, 800, 1130, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Ordered a drink | *that doesn’t exist.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CUP, { ...CUP_C, C: '#7dffb0', P: SKYB }, 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'oat, lavender, | a little moon', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1150, 'NEW ON THE MENU', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cried at the latte art. | *It’s a heart.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      latte(x, t, 820, 980, 22, pop01(t, P.t0 + 0.2, 0.3, 2), true)
      L(x, 800, 720, 'NAPKINS: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#b7a6ff', -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0520', key: 'F', accent: ACC, ending: 'card',
  title: 'The signs on | *a coffee date.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve coffees. | *Some went cold.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'wink', 'squint', 'wide', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'The best dates | *feel easy.*', chip: 'DATE TWO: YES' },
  last: { text: 'Date two? | *Aries booked it.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
