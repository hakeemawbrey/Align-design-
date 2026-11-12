// r2t0430: THE SIGNS AS… v3, "Zodiacs trying to keep a plant alive | be like." (~61 s vertical, signs3kit social cut,
// music: lofi · F). Twelve signs in zodiac order, each the most extreme version of itself. Ending: lesson.
//   0.0–3.6    "Zodiacs trying to keep | a plant alive | *be like.*"
//   3.6–49.2   ♈ watered it once, with the whole bucket · ♉ hasn't moved it in nine years · ♊ forgot which one, watered
//              the lamp · ♋ tells it secrets daily · ♌ plays it their own greatest hits · ♍ checks the soil hourly
//              · ♎ bought matching pots for a dead plant · ♏ one plant died, cactus only now · ♐ left on a trip, plant:
//              crispy · ♑ gave it a growth plan, quarterly reviews · ♒ grows it under purple space lights · ♓ cries
//              when a leaf falls
//  49.2        "Twelve plants. | *Some survived.*"
//  52.4        LESSON UNLOCKED: "Love is just | *showing up daily.*"  PLANT: ALIVE
//  58.3        "Fake plants count. | *Right?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#5fd068'

// ── props
const PLANT = [
  '...L..L..L...',
  '.LLL.LLL.LLL.',
  'LLlLLLlLLLlLL',
  '.LLLLLLLLLLL.',
  '...LLLSLLL...',
  '......S......',
  '..PPPPPPPPP..',
  '..PpPPPPPpP..',
  '...PPPPPPP...',
  '...PPPPPPP...',
  '....PPPPP....',
]
const PLANT_C = { L: '#5fd068', l: '#9ae58a', S: '#3f9e4a', P: '#e07a4a', p: '#f2a07a' }
const DEAD_C = { L: '#a3783e', l: '#c9a26a', S: '#7a5a2e', P: '#e07a4a', p: '#f2a07a' }
const BIG = [
  '....L.LL.L....',
  '..LLLLLLLLLL..',
  '.LLlLLLLLlLLL.',
  'LLLLLLlLLLLLLL',
  'LlLLLLLLLLLlLL',
  'LLLLLlLLLLLLLL',
  '.LLLLLLLLLLLL.',
  '..LLLLSLLLLL..',
  '......S.......',
  '..PPPPPPPPPP..',
  '..PpPPPPPPpP..',
  '...PPPPPPPP...',
  '....PPPPPP....',
]
const CACTUS = [
  '.....GG.....',
  '....GGGG....',
  '.G..GgGG..G.',
  '.GG.GGGG.GG.',
  '..GGGGgGGG..',
  '....GGGG....',
  '....GgGG....',
  '..PPPPPPPP..',
  '...PPPPPP...',
]
const CACTUS_C = { G: '#3f9e4a', g: '#9ae58a', P: '#e07a4a' }
const LAMP = ['.YYYYY.', 'YYYYYYY', '...K...', '...K...', '...K...', '..KKK..', '.KKKKK.']
const BUCKET = ['GGGGGGGGG', '.GBBBBBG.', '.GBBBBBG.', '..GBBBG..', '..GGGGG..']
const CASE = ['...KKK...', '..K...K..', 'RRRRRRRRR', 'RRrRRRrRR', 'RRRRRRRRR', 'RRrRRRrRR', 'RRRRRRRRR']
const LEAF = ['..LL', '.LlL', 'LLL.', 'L...']

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

const L = { x: -170 }, R = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Watered it once. | With *the whole bucket.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const tip = ease.inOutCubic(prog(lt, 0.6, 0.9))
      drawBits(x, BUCKET, { G: '#9aa5c4', B: '#6fc3ff' }, 760, 700, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: tip * 2.2 })
      if (lt > 0.85) { x.save(); x.fillStyle = 'rgba(111,195,255,0.75)'; for (let i = 0; i < 14; i++) { const ph = (t * 2 + i / 14) % 1; x.fillRect(720 + (i * 37) % 170, 760 + ph * 340, 14, 26) } x.restore() }
      label(x, 800, 1150, 'PLANT: SWIMMING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Hasn’t moved it | *in nine years.*', mood: 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BIG, PLANT_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'SPOT: PERMANENT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'PLANT: ENORMOUS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forgot which one. | *Watered the lamp.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, LAMP, { Y: '#ffe36a', K: '#9aa5c4' }, 700, 950, 20 * k)
      drawBits(x, PLANT, DEAD_C, 890, 1010, 12 * k)
      if (lt > 0.7 && lt < 1.6) { x.save(); x.fillStyle = 'rgba(111,195,255,0.8)'; for (let i = 0; i < 6; i++) { const ph = (t * 2 + i / 6) % 1; x.fillRect(670 + i * 12, 790 + ph * 60, 8, 16) } x.restore() }
      label(x, 700, 700, 'LAMP: THRIVING?', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 860, 1150, 'PLANT: THIRSTY', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: '#c9a26a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Talks to it daily. | *Tells it secrets.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 820, 1010, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 690, 'and then | they SAID…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 820, 870, 'BEST FRIEND', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Plays it their own | *greatest hits.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 810, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) notes(x, t, 560, 780, { n: 5, cell: 7, col: GOLD, seed: 2 })
      label(x, 800, 690, 'NOW PLAYING: LEO', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 810, 860, 'ENCORE #6', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Checks the soil | *every hour.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 840, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 690, 820, 200, 150, pop01(t, P.t0 + 0.5, 0.3, 2), -0.04, x => {
        x.fillStyle = '#140c30'; x.fillRect(-80, -50, 160, 60)
        x.fillStyle = MINT; x.font = `700 30px ${MONO}`; x.fillText(`${(41.2 + Math.floor(lt * 3) % 2 * 0.1).toFixed(1)}%`, 0, -20)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('MOISTURE', 0, 46)
      }, '#9aa5c4')
      label(x, 790, 650, 'CHECK #31 TODAY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bought matching pots | *for a dead plant.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLANT, { ...DEAD_C, P: PINK, p: '#ffd0e0' }, 710, 1000, 14 * k)
      drawBits(x, PLANT, { ...DEAD_C, P: PINK, p: '#ffd0e0' }, 880, 1000, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 700, 'AESTHETIC: ALIVE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'PLANTS: NOT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: '#c9a26a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'One plant died. | *Cactus only now.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CACTUS, CACTUS_C, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'TRUST: RESTRICTED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1150, 'WATERED: YEARLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left for a trip. | Plant: *crispy.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: R, hops: [0.5],
    front(x, t, lt, P) {
      const away = lt > 1.2
      drawBits(x, CASE, { K: INK, R: '#ff9a4a', r: '#ffcf9a' }, 300, 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLANT, away ? DEAD_C : PLANT_C, 340, 830, 15 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 330, 640, away ? 'BACK: 6 WEEKS LATER' : 'BACK IN 2 DAYS!', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: away ? '#c9a26a' : GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Gave it a growth plan. | *Quarterly reviews.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 880, 1020, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 710, 860, 230, 220, pop01(t, P.t0 + 0.4, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.fillRect(-90, -80, 4, 160); x.fillRect(-90, 78, 180, 4)
        x.strokeStyle = '#2fc79a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-80, 60); const p = clamp((lt - 0.6) / 1.0); x.lineTo(-80 + 160 * p, 60 - 120 * p); x.stroke()
      })
      label(x, 790, 650, 'Q2: +2 LEAVES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Grows it under | *purple space lights.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.4, 0.7))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k * (0.85 + 0.15 * Math.sin(t * 6)); x.fillStyle = '#c97bff'; x.beginPath(); x.moveTo(740, 620); x.lineTo(840, 620); x.lineTo(940, 1100); x.lineTo(640, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = INK; x.fillRect(720, 600, 140, 30); x.fillStyle = '#c97bff'; x.fillRect(730, 606, 120, 18); x.restore()
      drawBits(x, PLANT, { ...PLANT_C, L: '#7ad0a8', l: '#c9a6ff' }, 790, 1030, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 860, 'EXPERIMENT #9', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries | when *a leaf falls.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 820, 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = ease.inOutQuad(prog(lt, 0.5, 1.6))
      if (lt > 0.5) drawBits(x, LEAF, PLANT_C, 840 - Math.sin(f * 7) * 50 - f * 100, 900 + f * 230, 16, { rot: Math.sin(f * 7) * 0.6 })
      label(x, 790, 700, 'LEAF: MOURNED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: '#b7a6ff', rot: -0.04, font: MONO, weight: 700 })
    } },
]

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

const F = makeFilm({
  id: 'r2t0430', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs trying to keep | a plant alive | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve plants. | *Some survived.*' },
  lesson: { text: 'Love is just | *showing up daily.*', chip: 'PLANT: ALIVE' },
  last: {
    text: 'Fake plants count. | *Right?*',
    draw(x, t, lt) { drawBits(x, PLANT, PLANT_C, 540, 720, 17 * pop01(t, t - lt + 0.6, 0.35, 2)); label(x, 700, 700, 'PLASTIC', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
