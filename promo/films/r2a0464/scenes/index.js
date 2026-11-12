// r2a0464: star_advice, ADVICE ROLLCALL, "Each sign's | *stress reset.*" (signs3kit social cut, music: lofi · E). Ending: callback.
//   ♈ sprint it out, walk it home · ♉ warm bath, snacks in reach · ♊ voice-note a friend (twelve minutes) · ♋ blanket fort,
//   mom on speaker · ♌ dance in the mirror · ♍ clean one drawer, just one · ♎ fresh flowers, zero decisions · ♏ journal it,
//   then lock it · ♐ a long walk, destination anywhere · ♑ close the laptop, it'll wait · ♒ find your sign in the real sky
//   · ♓ have the cry, it's a reset too
//   group "Breathe. | Everyone's allowed."   last "Cap's laptop? | Still closed." (the laptop comes back, out of office)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a laptop, lid open (open = 1) to shut (0) */
function laptop(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 0, 340, 30); x.fillStyle = GREY; x.fillRect(-164, 4, 328, 22)
  const h = 210 * open
  if (h > 2) { x.fillStyle = INK; x.fillRect(-150, -h - 6, 300, h + 8); x.fillStyle = DEEP; x.fillRect(-142, -h, 284, h - 2); x.fillStyle = SKYB; x.globalAlpha = 0.8 * open; for (let i = 0; i < 5; i++) x.fillRect(-120, -h + 24 + i * 34 * open, 160 + (i % 2) * 60, 12 * open); x.globalAlpha = 1 }
  else { x.fillStyle = INK; x.fillRect(-152, -10, 304, 14); x.fillStyle = '#c9c9d8'; x.fillRect(-146, -8, 292, 8) }
  x.restore()
}
const SHOE = ['..RRR.......', '.RRWRR......', '.RRRRRRR....', 'RRRRRRRRRRR.', 'WWWWWWWWWWWW']
const TUB = ['W..........', 'W..........', 'BBBBBBBBBBB', 'BWWBBWBBWWB', 'BBBBBBBBBBB', '.BBBBBBBBB.', '.K.......K.']
const TUB_C = { W: GREY, B: '#dfe6f2', K: INK }
const FORT = ['.....P.....', '....PPP....', '...PPPPP...', '..PPLPPPP..', '.PPPLLPPPP.', 'PPPPLLLPPPP', 'PPPPLLLPPPP']
const FORT_C = { P: PINK, L: '#2a2350' }
const MIRROR = ['.GGGGGGG.', 'GSSSSSSSG', 'GSWSSSSSG', 'GSSWSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', '.GGGGGGG.', '...GGG...', '..GGGGG..']
const MIRROR_C = { G: GOLD, S: '#4a3f7a', W: '#dfe6f2' }
const DRAWER = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBYYBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBYYBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const DRAWER_C = { K: INK, B: '#8a5a3a', Y: GOLD }
const VASE = ['.F.FF.F..', 'FFFFFFFF.', '.FGFGFG..', '...GGG...', '..KKKKK..', '.KPPPPPK.', 'KPPWPPPPK', 'KPPPPPPPK', '.KPPPPPK.', '..KKKKK..']
const VASE_C = { F: PINK, G: '#5fd068', K: INK, P: SKYB, W: '#ffffff' }
const DIARY = ['KKKKKKKKKK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRYYRRRK', 'KRRYKKYRRK', 'KRRYYYYRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KKKKKKKKKK']
const DIARY_C = { K: INK, R: '#9a2a4a', Y: GOLD }
const TREE = ['...GGG...', '..GGGGG..', '.GGGGGGG.', 'GGGGGGGGG', '.GGGGGGG.', '....B....', '....B....']
const TREE_C = { G: '#5fd068', B: '#8a5a3a' }
const SCOPE = ['.......KK', '.....KKWK', '...KKWWK.', '.KKWWWK..', 'KWWWKK...', '.KKK.....', '..K.K....', '.K...K...', 'K.....K..']
const SCOPE_C = { K: INK, W: '#c9c9d8' }

const CAMEOS = [
  { sign: 'aries', cap: 'Sprint it out. | Then *walk it home.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', star: ST, hops: [0.4, 0.7, 1.0],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: '#ffffff' }, 760, 1080, 14 * pop01(t, P.t0 + 0.2, 0.3, 2)); drawBits(x, SHOE, { R: RED, W: '#ffffff' }, 880, 1100, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 700, lt < 1.3 ? 'PACE: FAST' : 'PACE: GENTLE', pop01(t, P.t0 + 0.5, 0.3, 2), lt < 1.3 ? RED : MINT, -0.04, 38, lt < 1.3 ? CREAM : INK)
    } },
  { sign: 'taurus', cap: 'Warm bath. | *Snacks within reach.*', mood: 'sleepy', star: { x: -170, y: -40 },
    back(x, t, lt, P) { drawBits(x, TUB, TUB_C, 500, 1060, 32 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      puffs(x, t, 470, 900, P.t0 + 0.4, { n: 4, cell: 10, rise: 140, spread: 200, seed: 3 })
      L(x, 810, 760, 'SNACK SHELF ✓', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Voice-note a friend. | *All twelve minutes.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -50, 340, 100); x.fillStyle = '#ffd23a'; x.fillRect(-162, -42, 324, 84)
        x.fillStyle = INK; for (let i = 0; i < 14; i++) { const h = 10 + 28 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-110 + i * 18, -h / 2, 10, h) }
        x.beginPath(); x.moveTo(-148, -18); x.lineTo(-148, 18); x.lineTo(-124, 0); x.fill(); x.restore()
      }
      L(x, 800, 1010, '12:04', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, 0.04, 40)
      L(x, 800, 700, 'FRIEND: “MORE!”', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Blanket fort. | *Mom on speaker.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, FORT, FORT_C, 790, 980, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { bubble(x, 790, 640, '(mom) | “eat something!”', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' }) } },
  { sign: 'leo', cap: 'Dance in the mirror. | *Biggest fan: you.*', mood: 'sparkle', star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MIRROR, MIRROR_C, 790, 880, 30 * k)
      if (k > 0.6) signChar(x, t, 'leo', 790, 830, 150, { mood: 'wink', seed: 81, glyph: false, glow: 0.4, hops: [P.t0 + 0.6, P.t0 + 1.1, P.t0 + 1.6] })
      notes(x, t, 600, 760, { n: 3, cell: 7, col: GOLD, seed: 1 })
    } },
  { sign: 'virgo', cap: 'Clean one drawer. | *Just one.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DRAWER, DRAWER_C, 790, 930, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 1.1, 7, 160, 0.3)
      L(x, 790, 680, 'DRAWER 1 OF 1', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Fresh flowers. | *Zero decisions.*', mood: lt => lt < 0.9 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 920, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 650, 'PICKED: ALL OF THEM', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Journal it all. | *Then lock it.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 790, 900, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05 })
      L(x, 790, 650, 'PAGES: 40', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 1140, 'LOCKED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 40)
    } },
  { sign: 'sagittarius', cap: 'A long walk. | *Destination: anywhere.*', mood: 'sparkle', star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, TREE, TREE_C, 720, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)); drawBits(x, TREE, TREE_C, 880, 1000, 14 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 800, 660, 'MILES: WHO CARES', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Close the laptop. | *It’ll wait.*', mood: lt => lt < 1.2 ? 'squint' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 790, 980, pop01(t, P.t0 + 0.15, 0.3, 2), 1 - ease.inOutCubic(prog(lt, 0.8, 1.3)))
      L(x, 790, 660, 'OUT OF OFFICE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Look up your sign. | *In the actual sky.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 660, 980, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.8, 0.4, 2)
      const pts = [[760, 640], [830, 690], [900, 650], [870, 740], [940, 790]]
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.strokeStyle = SKYB; x.lineWidth = 4; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke(); pts.forEach(([a, b]) => { x.fillStyle = BONE; x.fillRect(a - 8, b - 8, 16, 16) }); x.restore() }
      L(x, 850, 880, '♒︎ FOUND IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Have the cry. | It’s *a reset too.*', mood: lt => lt < 1.4 ? 'sparkle' : 'happy', tears: lt => lt < 1.4 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.8, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'TISSUES: 14', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 36)
      L(x, 790, 900, 'RESET: DONE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 38)
      if (lt > 1.4) sparkles(x, t, 790, 900, P.t0 + 1.8, 7, 180, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0464', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *stress reset.*',
  cameos: CAMEOS,
  group: { cap: 'Breathe. | *Everyone’s allowed.*' },
  last: {
    text: 'Cap’s laptop? | *Still closed.*',
    draw(x, t, lt) {
      laptop(x, 540, 1150, 1.3 * pop01(t, t - lt + 0.6, 0.4, 2), 0)
      signChar(x, t, 'capricorn', 540, 1010, 200 * pop01(t, t - lt + 0.9, 0.4, 2), { mood: 'sleepy', seed: 5, glyph: false })
      label(x, 540, 1330, 'OUT OF OFFICE', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
