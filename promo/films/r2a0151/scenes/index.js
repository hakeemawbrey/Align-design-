// r2a0151: star_advice ADVICE SOLO, "Taurus, your sign | to call home." (~46 s vertical, signs3kit social cut, music: lofi · D).
// Ending: 'callback'.
//   0.0–3.6    "Taurus, your sign | *to call home.*"
//   3.6–37.8   nine warm nudges: miss home cooking, ask for the recipe (salt: "enough") · hate change, home hasn't moved
//              · hold things in, home can hold them too · they kept your room · stubborn? love is bigger
//              · homesick on a Sunday is just love · they'll talk for an hour, bring snacks · your photo's still on the
//              fridge · hung up? mom calls back with one more thing
//  37.8        "Ring ring. | *Home picks up.*"
//  41.2        callback: "Salt: still | *“enough.”*"  the recipe card comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, WOOD, GREY, DEEP, GREEN, NIGHT } from './props.js'

const S = 'taurus', ST = { x: -170 }, ACC = '#7dd87a'
const HOUSE = ['......RR......', '.....RRRR.....', '....RRRRRR....', '...RRRRRRRR...', '..RRRRRRRRRR..', '.RRRRRRRRRRRR.', '..CCCCCCCCCC..', '..CSSCCCCSSC..', '..CSSCCCCSSC..', '..CCCCDDCCCC..', '..CCCCDDCCCC..', '..CCCCDDCCCC..', 'GGGGGGGGGGGGGG']
const HOUSE_C = { R: RED, C: CREAM, S: SKYB, D: WOOD, G: GREEN }
const JAR = ['..KKKKKKKK..', '..KKKKKKKK..', '.WWWWWWWWWW.', 'WWPPPPPPPPWW', 'WPPPPPPPPPPW', 'WPPPPPPPPPPW', 'WPPPPPPPPPPW', 'WPPPPPPPPPPW', 'WWPPPPPPPPWW', '.WWWWWWWWWW.']
const JAR_C = { K: WOOD, W: '#d8f0ff', P: PINK }
const BED = ['PP..........', 'PP..........', 'PPWWWWWWWWWW', 'PPBBBBBBBBBB', 'PPBBBBBBBBBB', 'PPPPPPPPPPPP', 'P..........P']
const BED_C = { P: WOOD, W: CREAM, B: '#6fc3ff' }
const BEAR = ['.B...B.', 'BBBBBBB', 'BKBBBKB', 'BBBRBBB', '.BBBBB.', 'BBBBBBB', 'BB.B.BB']
const BEAR_C = { B: '#c98a4a', K: INK, R: PINK }
const ROCK = ['..GGG..', '.GGGGG.', 'GGGGGGG', 'GGGGGGG', '.GGGGG.']
const BOWL = ['.Y.O.Y.O.', 'YOYOYOYOY', 'RRRRRRRRR', '.RRRRRRR.', '..RRRRR..']
const BOWL_C = { Y: GOLD, O: '#ffb34a', R: '#6fc3ff' }

/** the recipe card: three lines, the salt one is the joke */
function recipe(x, t, cx, cy, k, lt, rot = 0.04) {
  card(x, cx, cy, 340, 300, k, { bg: CREAM, rot }, () => {
    x.fillStyle = RED; x.fillRect(-170, -150, 340, 54)
    txt(x, 'MOM’S STEW', 0, -122, { size: 32, font: MONO, weight: 700, color: CREAM })
    const L = [['potatoes:', 'lots'], ['time:', 'until done'], ['salt:', '“enough”']]
    L.forEach(([a, b], i) => {
      const y = -50 + i * 64
      if (lt < 0.5 + i * 0.35) return
      txt(x, a, -146, y, { size: 30, align: 'left', weight: 700, color: '#6b62a8' })
      txt(x, b, -146 + (a.length > 6 ? 168 : 92), y, { size: i === 2 ? 36 : 30, align: 'left', color: i === 2 ? RED : INK })
    })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Miss home cooking? | *Ask for the recipe.*', mood: lt => lt > 1.6 ? 'squint' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { recipe(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'You hate change. | *Home hasn’t moved.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'SAME COUCH SINCE 2009', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'You hold it all in. | *Home can hold it too.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pop = ease.outBack(prog(lt, 0.9, 1.2))
      drawBits(x, JAR, JAR_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + 0.06 * Math.sin(t * 9) * (lt < 0.9 ? 1 : 0) })
      label(x, 790, 930, 'FEELINGS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: CREAM, rot: 0.03, font: MONO, weight: 700 })
      if (lt > 0.9) hearts(x, t, 790, 760, P.t0 + 0.9 * 1.29, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 2 })
      bubble(x, 790, 620, 'tell us | everything.', pop01(t, P.t0 + 1.4 * 1.29, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'They kept your room. | *Exactly as you left it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BED, BED_C, 790, 1000, 24 * k)
      drawBits(x, BEAR, BEAR_C, 690, 905, 14 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 790, 720, 'DO NOT TOUCH · MOM', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still stubborn about it? | *Love is bigger.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROCK, { G: GREY }, 700, 1080, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 700, 1000, 'PRIDE', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 28, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      const g = ease.outBack(prog(lt, 0.8, 1.6))
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 840, 800, 40 * g * (1 + 0.04 * Math.sin(t * 6)))
    } },
  { sign: S, cap: 'Homesick on a Sunday? | *That’s just love.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 280, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-140, -150, 280, 64)
        txt(x, 'SUNDAY', 0, -118, { size: 36, font: MONO, weight: 700, color: CREAM })
        drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, 30, 18)
      })
      label(x, 790, 1100, 'MISSING: HOME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They’ll talk for an hour. | *Bring snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = Math.min(59, Math.floor(Math.max(0, lt - 0.3) * 30))
      label(x, 790, 640, `ON CALL · ${String(m).padStart(2, '0')}:${String(Math.floor(t * 37) % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      drawBits(x, BOWL, BOWL_C, 790, 1040, 26 * pop01(t, P.t0 + 0.8, 0.35, 2))
      bubble(x, 790, 860, '…and then | your aunt—', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'Your photo’s on the fridge. | *Still.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 300, 560, k, { bg: '#e8f2f6', rot: 0 }, () => {
        x.fillStyle = '#b9c8d0'; x.fillRect(-150, -90, 300, 8); x.fillRect(110, -230, 16, 100); x.fillRect(110, -40, 16, 140)
        x.fillStyle = INK; x.fillRect(-96, -30, 172, 200); x.fillStyle = CREAM; x.fillRect(-88, -22, 156, 184)
        x.fillStyle = RED; x.fillRect(-20, -40, 24, 24)
        x.fillStyle = GOLD; x.fillRect(-120, -220, 36, 36); x.fillStyle = SKYB; x.fillRect(40, -200, 36, 36)
      })
      if (k > 0.5) signChar(x, t, S, 780, 960, 120 * k, { mood: 'happy', seed: 30, glyph: false })
      label(x, 790, 1170, 'FRONT AND CENTRE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hung up? | Mom *calls back.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ring = lt > 0.7 ? Math.sin(t * 40) * 0.05 : 0
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 + ring }, () => {
        txt(x, lt > 0.7 ? 'MOM ♥' : 'call ended', 0, -60, { size: lt > 0.7 ? 46 : 30, color: lt > 0.7 ? PINK : GREY })
        if (lt > 0.7) { x.fillStyle = '#2fa36b'; x.beginPath(); x.arc(0, 70, 44, 0, Math.PI * 2); x.fill(); txt(x, 'calling…', 0, 140, { size: 26, color: BONE, weight: 700 }) }
      })
      bubble(x, 760, 600, 'oh, and—', pop01(t, P.t0 + 1.3 * 1.29, 0.25, 2.2), { size: 44, col: CREAM, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2a0151', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, your sign | *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Ring ring. | *Home picks up.*', mood: 'heart' },
  last: {
    text: 'Salt: still | *“enough.”*',
    draw(x, t, lt) {
      recipe(x, t, 660, 1060, 1.5 * pop01(t, t - lt + 0.5, 0.4, 2), 2.4, -0.03)
      const k = pop01(t, t - lt + 0.9, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 200, 1200, 200 * k, { mood: lt > 1.8 ? 'heart' : 'squint', look: [1, 0], seed: 47, hops: [t - lt + 1.9] })
      hearts(x, t, 200, 1080, t - lt + 1.6, { n: 5, life: 1.8, spread: 120, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
