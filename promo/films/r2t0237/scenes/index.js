// r2t0237: star_talk, SOLO, "Your Gemini roommate | be like." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): living with a Gemini, every card pushed to the extreme.
//   0.0–3.6    "Your Gemini roommate | *be like.*"
//   3.6–37.8   nine cards (3.8 s each): rearranged the furniture at 3 a.m. · new hobby every Tuesday · voice notes from the
//              next room · group chat with the plants · debates the dishes, takes both sides · invited "a few people",
//              forty came · "moving out!" every month, never does · labels their food, eats yours · bad day? living-room disco
//  37.8        "Chaos. | *Best roommate ever.*"  Gemini comes back, big.
//  41.2        callback: "The plants | *replied.*"  the plant from the group-chat card is back, with a reply bubble.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, handset, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const S = 'gemini', ACC = '#ffd23a'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }

const SOFA = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPddddddddddPP', 'PPddddddddddPP', 'PPPPPPPPPPPPPP', 'B............B']
const SOFA_C = { P: '#6fc3ff', d: '#3f6fd0', B: BROWN }
const PLANT = ['..G...G...', '.GGG.GGG..', '..GGGGG.G.', 'G..GGG.GGG', 'GG..G..GG.', '.GG.G.GG..', '...GGG....', '..TTTTTT..', '..TTTTTT..', '...TTTT...', '...TTTT...']
const PLANT_C = { G: GREEN, T: ORANGE }
const BOXB = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBTTBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const BOXB_C = { K: INK, B: WOOD, T: CREAM }
const JAR = ['.KKKK.', 'KWWWWK', 'KYYYYK', 'KYYYYK', 'KYYYYK', '.KKKK.']
const BALL = ['...SSS...', '.SWSSSWS.', 'SSSWSSSWS', 'SWSSSWSSS', 'SSSWSSSWS', '.SWSSSWS.', '...SSS...']
const DOOR = ['KKKKKKKK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWYK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK']

/** the group-chat plant with a phone; used in card 4 and the callback */
function plantChat(x, t, cx, cy, k, lines) {
  drawBits(x, PLANT, PLANT_C, cx, cy, 18 * k)
  lines.forEach(([s, col, kk, dy], i) => bubble(x, cx + (i % 2 ? 40 : -20), cy - 200 - dy, s, kk * k, { size: 34, col, tail: i % 2 ? 'br' : 'bl' }))
}

const CAMEOS = [
  { sign: S, cap: 'Rearranged the furniture. | *At 3 a.m.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.6, 1.4))
      drawBits(x, SOFA, SOFA_C, lerp(860, 760, m), 1040 - 40 * Math.sin(Math.PI * m), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 * Math.sin(Math.PI * m) })
      clock(x, 790, 720, 90, pop01(t, P.t0 + 0.4, 0.3, 2), 3, 0)
      label(x, 600, 600, 'FENG SHUI NIGHT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, ...LBL })
    } },
  { sign: S, cap: 'New hobby. | *Every Tuesday.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const H = ['POTTERY', 'UKULELE', 'BEEKEEPING?', 'JUGGLING', 'MIME']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      for (let i = 0; i <= n; i++) label(x, 790 + (i % 2 ? 30 : -30), 1100 - i * 100, H[i], pop01(t, P.t0 + 0.3 + i * 0.52, 0.3, 2.2), { size: 34, bg: [MINT, PINK, SKYB, ORANGE, LAV][i], rot: i % 2 ? 0.05 : -0.05, ...LBL })
    } },
  { sign: S, cap: 'Sends voice notes. | From the *next room.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        for (let r = 0; r < 4; r++) {
          const k = clamp((lt - 0.4 - r * 0.3) * 4); if (k <= 0) continue
          x.fillStyle = r % 2 ? LAV : MINT; x.fillRect(-90, -130 + r * 70, 180 * k, 50)
          x.fillStyle = INK; for (let b = 0; b < 12 * k; b++) { const h = 8 + 26 * Math.abs(Math.sin(b * 1.7 + r)); x.fillRect(-78 + b * 13, -105 + r * 70 - h / 2, 7, h) }
        }
      })
      label(x, 790, 1110, '4 NEW · 14 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Started a group chat. | *With the plants.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plantChat(x, t, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), [['u up, fern?', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), 0], ['…', LAV, pop01(t, P.t0 + 1.5, 0.25, 2.2), 130]])
      label(x, 790, 1150, 'PLANT FAM (3)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: GREEN, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Argued about the dishes. | *Took both sides.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = Math.floor(lt * 2.4) % 2
      bubble(x, 790, 700, sw ? 'you’re right.' : 'it’s YOUR turn', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: sw ? MINT : PINK, tail: 'bl' })
      label(x, 790, 960, 'WINNER: ALSO GEMINI', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Invited “a few people.” | *Forty came.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: '#8a4a2e', Y: SUN }, 820, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const IDS = ['aries', 'leo', 'libra', 'sagittarius', 'aquarius', 'taurus', 'scorpio', 'cancer']
      const n = Math.floor(clamp((lt - 0.5) / 1.3) * 8)
      for (let i = 0; i < n; i++) signChar(x, t, IDS[i], 640 + (i % 4) * 70, 1100 - Math.floor(i / 4) * 70, 90, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.6 })
      label(x, 790, 620, 'GUESTS: 40', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, ...LBL })
    } },
  { sign: S, cap: '“Moving out!” | *Every month.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOXB, BOXB_C, 790 + (i === 1 ? 60 : -30), 1060 - i * 110, 20 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 650, 'UNPACKED AGAIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05, ...LBL })
    } },
  { sign: S, cap: 'Labelled their snacks. | *Ate yours.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, JAR, { K: INK, W: CREAM, Y: SUN }, 700, 960, 22 * k)
      drawBits(x, JAR, { K: INK, W: CREAM, Y: lt > 1.0 ? DEEP : SUN }, 890, 960, 22 * k)
      label(x, 700, 1110, 'GEMINI’S', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05, ...LBL })
      label(x, 890, 1110, 'YOURS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.05, ...LBL })
      bubble(x, 800, 700, 'twins share!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Bad day? | *Living-room disco.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = clamp((lt - 0.6) * 3)
      if (k <= 0) return
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      for (let i = 0; i < 8; i++) { x.save(); x.globalAlpha = 0.18 * k; x.fillStyle = [PINK, MINT, SKYB, GOLD][i % 4]; x.beginPath(); x.moveTo(790, 640); const a = t * 1.5 + i * 0.8; x.lineTo(790 + Math.cos(a) * 600, 640 + Math.abs(Math.sin(a)) * 600); x.lineTo(790 + Math.cos(a + 0.15) * 600, 640 + Math.abs(Math.sin(a + 0.15)) * 600); x.fill(); x.restore() }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, BALL, { S: '#d8dbe8', W: '#ffffff' }, 790, 640, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: t })
      notes(x, t, 790, 1000, { n: 4, cell: 7, col: PINK, seed: 3 })
      label(x, 790, 1120, 'MOOD: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, ...LBL })
    } },
]

const F = makeFilm({
  id: 'r2t0237', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Gemini | roommate *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos. | *Best roommate ever.*', mood: 'sparkle' },
  last: {
    text: 'The plants | *replied.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 1.8)
      drawBits(x, PLANT, PLANT_C, 540, 1180, 30 * k)
      bubble(x, 420, 880, 'u up, fern?', k, { size: 44, tail: 'br' })
      bubble(x, 680, 1010, 'always.', pop01(t, t0 + 1.2, 0.25, 2.4), { size: 50, col: MINT, tail: 'bl' })
      sparkles(x, t, 680, 1010, t0 + 1.3, 7, 150, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
