// r2a0087: ADVICE SOLO, "Leo, you can | change your mind." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each.
//   0.0–3.6    "Leo, you can | change *your mind.*"
//   3.6–37.8   announced it? you can un-announce · bought the outfit? returns are iconic too · said yes to the party?
//              a cozy no counts · the bangs were a phase · switching restaurants is allowed · wrong about something?
//              the crown stays on · the big speech can be short · changing your mind is growing · new dream, same star
//  37.8        GROUP ENDING: "Same Leo. | *Better plan.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const MEGA = [
  '.........RR',
  '.......RRRR',
  '.....RRRRRR',
  'KKKRRRRRRRR',
  'KKKRRRRRRRR',
  'KKKRRRRRRRR',
  '.....RRRRRR',
  '.......RRRR',
  '.........RR',
]
const BAG = ['...KKKK...', '..K....K..', '..K....K..', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPWWWWPPP', 'PPPWPPWPPP', 'PPPWWWWPPP', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP']
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PPPPPPP.', 'PYPPPPPYP']
const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCW.W', 'WCCCCCWWW', 'WCCCCCW..', '.WWWWW...']
const SCROLL = ['KKKKKKKKKKK', 'KWWWWWWWWWK', 'KWLLLLLLLWK', 'KWLLLLLWWWK', 'KWLLLLLLLWK', 'KWLLLLWWWWK', 'KWLLLLLLLWK', 'KWLLLLLLWWK', 'KWLLLLLLLWK', 'KWLLLWWWWWK', 'KWLLLLLLLWK', 'KWLLLLLLWWK', 'KWLLLLLLLWK', 'KWWWWWWWWWK', 'KKKKKKKKKKK']
const SPROUT = ['...GG.GG...', '..GGG.GGG..', '...GGGGG...', '.....G.....', '.....G.....', '.....G.....', 'TTTTTTTTTTT', '.TTTTTTTTT.', '..TTTTTTT..']
const MENU = ['KKKKKKKK', 'KWWWWWWK', 'KWRRRRWK', 'KWWWWWWK', 'KWLLLLWK', 'KWLLLWWK', 'KWLLLLWK', 'KWLLWWWK', 'KWWWWWWK', 'KKKKKKKK']

function spotlight(x, cx, cy, k, col = 'rgba(255,241,200,0.22)') {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k); x.fillStyle = col
  x.beginPath(); x.moveTo(cx - 30, 500); x.lineTo(cx + 30, 500); x.lineTo(cx + 140, cy); x.lineTo(cx - 140, cy); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,241,200,0.18)'; x.beginPath(); x.ellipse(cx, cy, 140, 30, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'leo'
const CAMEOS = [
  { sign: S, cap: 'Told everyone? | *Un-announce.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MEGA, { R: RED, K: INK }, 760, 870, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.15 })
      bubble(x, 800, 650, 'UPDATE: never mind!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1100, 'PLANS: REVISED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought the outfit? | Returns are *iconic too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const away = 0
      drawBits(x, BAG, { K: INK, P: PINK, W: '#fff4e2' }, lerp(790, 1000, away), 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 + away * 0.3, alpha: 1 - away * 0.6 })
      label(x, 790, 1120, 'RETURN: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said yes to the party? | A *cozy no* counts.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, HAT, { Y: GOLD, P: '#c97bff' }, lerp(F.x + 10, 820, off), lerp(F.top - 40, 1080, off), 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: off * 0.8 })
      drawBits(x, MUG, { W: BONE, C: BROWN }, 800, 820, 18 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 800, 640, 'RSVP: NEXT TIME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Picked the restaurant? | *Switching’s allowed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = Math.floor(Math.max(0, lt - 0.5) / 0.4) % 2
      drawBits(x, MENU, { K: INK, W: '#fff4e2', R: flip ? MINT : RED, L: '#9aa5c4' }, 790, 880, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: flip ? 0.06 : -0.06 })
      label(x, 790, 1120, flip ? 'TACOS NOW' : 'PASTA?', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wrong about something? | The *crown stays on.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: lt => lt > 1.3 ? [0, 0] : [0, 1], star: { x: -100 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const wob = lt < 1.2 ? Math.sin(lt * 14) * 0.15 * (1 - lt / 1.2) : 0
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 30, 14 * k, { rot: wob })
      bubble(x, 790, 650, 'I was wrong.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 800, 1110, 'STILL ROYAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
      sparkles(x, t, F.x, F.top - 30, P.t0 + 1.3, 6, 110, 0.3)
    } },
  { sign: S, cap: 'The big speech? | *Short is fine.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const roll = ease.inOutCubic(prog(lt, 0.8, 1.4))
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        const h = lerp(500, 150, roll), top = 1030 - h
        x.save(); x.translate(790, 0); x.rotate(0.03)
        x.fillStyle = INK; x.fillRect(-130 * k, top - 8, 260 * k, h + 16)
        x.fillStyle = '#fff4e2'; x.fillRect(-122 * k, top, 244 * k, h)
        x.fillStyle = '#9aa5c4'; const n = Math.floor((h - 30) / 30)
        for (let i = 0; i < n; i++) x.fillRect(-96 * k, top + 24 + i * 30, (150 + (i * 37) % 50) * k, 12)
        x.fillStyle = BROWN; x.fillRect(-140 * k, top - 22, 280 * k, 22)
        x.restore()
      }
      label(x, 790, 1100, 'SPEECH: TWO LINES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bangs were a phase? | *Grow them out.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = '#c9c9d8'; x.fillRect(-128, -158, 256, 316)
        x.fillStyle = 'rgba(143,227,255,0.35)'; x.fillRect(-116, -146, 232, 292); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-90, -120, 30, 120)
        x.restore()
        signChar(x, t, 'leo', 790, 860, 170 * k, { mood: lt > 1.2 ? 'sparkle' : 'squint', seed: 50, glyph: false, glow: 0.5 })
        const g = ease.outCubic(prog(lt, 0.8, 1.6))
        x.fillStyle = ORANGE; for (let i = 0; i < 7; i++) x.fillRect(722 + i * 20, 790, 14, 18 + 50 * g * (i % 2 ? 0.8 : 1))
      }
      label(x, 790, 1110, 'NEW ERA', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Changed your mind? | That’s called *growing.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outBack(prog(lt, 0.3, 1.3)) : ease.outCubic(prog(lt, 0.3, 1.3))
      drawBits(x, SPROUT, { G: GREEN, T: BROWN }, 790, 1060 - 120 * g, 22 * pop01(t, P.t0 + 0.15, 0.3, 2) * (0.6 + 0.4 * g))
      label(x, 790, 640, 'GROWTH: +1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.3, 6, 140, 0.5)
    } },
  { sign: S, cap: 'Dream changed? | *New stage,* same star.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.5],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      const mv = ease.inOutCubic(prog(lt, 0.6, 1.3))
      spotlight(x, lerp(370, 790, mv), 1080, k)
    },
    front(x, t, lt, P) {
      label(x, 790, 650, 'NOW SHOWING: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 160, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0087', key: 'F', accent: ORANGE, solo: 'leo', ending: 'group',
  title: 'Leo, you can | change *your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Same Leo. | *Better plan.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
