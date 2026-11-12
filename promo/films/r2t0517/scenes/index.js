// r2t0517: THE SIGNS AS… v3, "Zodiacs when the neighbours are loud | *be like.*" (~54 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "Zodiacs when the | neighbours are loud | *be like.*"
//   3.6–49.2   ♈ knocked back, started a drum war · ♉ slept through all three parties · ♊ went to complain, joined
//              the party · ♋ baked them cookies, passive-aggressively · ♌ madder they weren't invited · ♍ a noise
//              report with charts · ♎ a polite note, draft fourteen · ♏ said nothing, grudge filed · ♐ packed a bag,
//              moved countries · ♑ read the lease, clause 14 · ♒ a soundproof pod from cereal boxes · ♓ cries: the
//              song is too beautiful
//  49.2        "Twelve signs. | *One thin wall.*"
//  52.6        "Party’s over. | *Aries isn’t.*"  (the drum from Aries' card comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ff9a4a', GREY = '#9aa5c4'
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

const DRUM = [
  'S.........S',
  '.S.......S.',
  'WWWWWWWWWWW',
  'RRRRRRRRRRR',
  'RYRYRYRYRYR',
  'RRRRRRRRRRR',
  'RYRYRYRYRYR',
  'RRRRRRRRRRR',
  'WWWWWWWWWWW',
]
const DRUM_C = { S: '#e0a85a', W: '#fff4e2', R: '#e23d4e', Y: GOLD }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPYP..', '.PPPPPPP.', '.PYPYPYP.', 'PPPPPPPPP']
const HAT_C = { P: '#ff8fb1', Y: GOLD }
const PLATE = ['..C...C...C..', '.CCC.CCC.CCC.', '..C...C...C..', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const SUITCASE = ['...KKK...', '..K...K..', 'OOOOOOOOO', 'OOoOOOoOO', 'OOOOOOOOO', 'OOoOOOoOO', 'OOOOOOOOO']
const GOAT = ['W.......W.', 'WW.....WW.', '.WWWWWWW..', '.WKWWWKWW.', '..WWWWWW..', '...WWWW...', '...W..W...']
const BOX = ['BBBBBBBBBBB', 'BYYYYYYYYYB', 'BYRRRRRRRYB', 'BYRWWWWWRYB', 'BYRRRRRRRYB', 'BYYYYYYYYYB', 'BYYYYYYYYYB', 'BBBBBBBBBBB']
const BOX_C = { B: '#c98f2a', Y: '#ffe36a', R: '#e23d4e', W: PAPER }

const LS = { x: -170 }, RS = { x: 170 }
// a bit of the shared wall on the right edge, with the neighbours' music thumping through
function wall(x, t, k, lt, col = '#4a3f78') {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (let j = 0; j < 9; j++) for (let i = 0; i < 2; i++) { x.fillStyle = INK; x.fillRect(880 + i * 50 + (j % 2) * 25, 500 + j * 80, 48, 78); x.fillStyle = col; x.fillRect(884 + i * 50 + (j % 2) * 25, 504 + j * 80, 40, 70) }
  x.restore()
  notes(x, t, 900, 900, { n: 3, cell: 6, col: PINK, seed: 1, alpha: k })
}
const CAMEOS = [
  { sign: 'aries', cap: 'Knocked back. | *Started a drum war.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', look: [1, 0], star: LS, hops: [0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      drawBits(x, DRUM, DRUM_C, 760, 1020, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      wall(x, t, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      bubble(x, 740, 690, 'BOOM BOOM', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#ffb3a0', tail: 'bl' })
      L(x, 740, 1170, 'ROUND 7', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Slept right through it. | *All three parties.*', mood: 'sleepy', star: LS,
    front(x, t, lt, P) {
      wall(x, t, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 2)
      L(x, 700, 760, `PARTY ${n} OF 3`, pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 36)
      L(x, 700, 1100, 'TAURUS: UNBOTHERED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Went to complain. | *Joined the party.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: LS, hops: [1.3, 1.8],
    front(x, t, lt, P, F) {
      if (lt > 1.0) drawBits(x, HAT, HAT_C, F.x + 6, F.top - 40, 10, { rot: 0.15 })
      bubble(x, 780, 700, lt > 1.0 ? 'ok one song' : 'excuse me—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 780, 1120, 'COMPLAINT: CANCELLED', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 26)
      if (lt > 1.1) notes(x, t, 760, 960, { n: 4, cell: 7, col: GOLD, seed: 2 })
    } },
  { sign: 'cancer', cap: 'Baked them cookies. | *Passive-aggressively.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { C: '#e0a85a', W: BONE }, 800, 1030, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 820, 260, 150, pop01(t, P.t0 + 0.6, 0.3, 2), 0.05, x => {
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('for your QUIET', 0, -24); x.fillText('night :)', 0, 18)
      })
      L(x, 800, 1150, 'TONE: VERY SWEET', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Mad it’s loud. | *Madder they’re not invited.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 260, 320, pop01(t, P.t0 + 0.25, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('GUEST LIST', 0, -128)
        const names = ['ARIES', 'GEMINI', 'LIBRA', 'SAG', 'AQUARIUS']
        names.forEach((n, i) => { x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText(n, 0, -76 + i * 40) })
        if (lt > 1.0) { x.fillStyle = '#e23d4e'; x.font = `800 30px ${INTER}`; x.fillText('LEO? NO.', 0, 128) }
      })
      L(x, 800, 660, 'BETRAYAL', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#e23d4e', -0.05, 36, PAPER)
    } },
  { sign: 'virgo', cap: 'Filed a noise report. | *With charts.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 270, 300, pop01(t, P.t0 + 0.25, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('NOISE LOG', 0, -118)
        const p = clamp((lt - 0.4) / 1.2)
        for (let i = 0; i < 7; i++) if (p * 7 > i) { const h = [40, 70, 120, 90, 150, 60, 130][i]; x.fillStyle = h > 100 ? '#e23d4e' : '#2fc79a'; x.fillRect(-105 + i * 30, 110 - h, 22, h) }
      })
      L(x, 800, 660, 'COMPATIBILITY: LOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Wrote a polite note. | *Draft fourteen.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 13))
      for (let i = Math.max(0, n - 4); i < n; i++) card(x, 800 + (i % 3 - 1) * 14, 900 - (n - i) * 10, 250, 200, 1, (i % 3 - 1) * 0.06, x => {
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('Dear neighbour,', 0, -40)
        x.fillStyle = GREY; x.fillRect(-90, 0, 180, 10); x.fillRect(-90, 26, 120, 10)
        x.fillStyle = PINK; x.font = `700 20px ${MONO}`; x.fillText(`draft ${i + 1}`, 0, 70)
      })
      L(x, 800, 660, 'TOO RUDE? TOO NICE?', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Grudge filed.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 920, 280, 220, pop01(t, P.t0 + 0.3, 0.3, 2), 0.04, x => {
        x.fillStyle = '#c98f2a'; x.fillRect(-140, -130, 110, 30)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('APT 4B', 0, -30)
        x.font = `700 22px ${MONO}`; x.fillText('FOREVER', 0, 30)
      }, '#ffcf7a')
      L(x, 800, 690, 'NOTED IN BIRTH CHART', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#c97bff', -0.04, 26, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Packed a bag. | *Moved countries.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: RS, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, O: '#ff9a4a', o: '#ffcf9a' }, 300, 1050, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GOAT, { W: BONE, K: INK }, 330, 800, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 330, 660, 'NEW NEIGHBOURS: GOATS', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Read the whole lease. | *Clause 14, part B.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 250, 340, pop01(t, P.t0 + 0.25, 0.3, 2), 0.03, x => {
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('LEASE', 0, -140)
        for (let i = 0; i < 9; i++) { x.fillStyle = i === 6 && lt > 1.0 ? '#ffe36a' : GREY; x.fillRect(-100, -100 + i * 26, i === 6 ? 200 : 180 - (i % 3) * 30, 12) }
      })
      L(x, 800, 1140, 'QUIET HOURS: 10PM', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Built a soundproof pod. | *From cereal boxes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 740, 1020, 12 * k)
      drawBits(x, BOX, BOX_C, 870, 1020, 12 * pop01(t, P.t0 + 0.35, 0.3, 2))
      drawBits(x, BOX, BOX_C, 805, 920, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 700, 'INVENTION #31', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 32)
      L(x, 800, 1150, 'WORKS? KIND OF', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cries. | *Their song is beautiful.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wall(x, t, pop01(t, P.t0 + 0.15, 0.3, 2), lt, '#5a4f98')
      bubble(x, 720, 700, 'they’re singing | about LOVE', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 720, 1120, 'VOLUME: UP, PLEASE', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#b7a6ff', 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0517', key: 'E', accent: ACC, ending: 'callback',
  title: 'Zodiacs when the | neighbours are loud | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One thin wall.*', moods: ['squint', 'sleepy', 'sparkle', 'squint', 'wide', 'squint', 'happy', 'neutral', 'sparkle', 'neutral', 'squint', 'wide'] },
  last: {
    text: 'Party’s over. | *Aries isn’t.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, DRUM, DRUM_C, 660, 1080, 22 * pop01(t, t0 + 0.5, 0.35, 2))
      signChar(x, t, 'aries', 400, 1040, 280 * pop01(t, t0 + 0.6, 0.4, 2), { mood: 'sparkle', look: [1, 0], seed: 9, hops: [t0 + 1.2, t0 + 1.6, t0 + 2.0, t0 + 2.4], glyph: false })
      bubble(x, 760, 860, 'BOOM', pop01(t, t0 + 1.3, 0.25, 2.2), { size: 44, col: '#ffb3a0', tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES, 940, 236)
export const CUES = F.CUES
export const T = F.T
