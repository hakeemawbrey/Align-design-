// r2t0025: THE SIGNS AS… v3, ROLL CALL, "The signs | as lifeguards." (~57 s vertical, signs3kit, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of themselves on lifeguard duty.
//   0.0–3.6    "The signs | *as lifeguards.*"
//   3.6–49.2   ♈ rescued you from the kiddie pool · ♉ guarding the snack bar · ♊ blew the whistle to say hi
//              · ♋ sunscreen check every four minutes · ♌ slow-motion run, for no reason · ♍ rated your swimming form
//              · ♎ mediated the floatie fight · ♏ "no running" from across the beach · ♐ swam to the horizon
//              · ♑ wrote all 48 pool rules · ♒ saved a crab, named it Gary · ♓ saved a beach ball, wept
//  49.2        "Pool’s safe. | *Ish.*"
//  52.6        CALLBACK: "Gary? | *Head lifeguard.*"  The crab in a tiny visor.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', SEA = '#4fb8ff'

// ── props
const CONE = ['.PPPP.', 'PPWPPP', 'PPPPPP', '.CCCC.', '.CKCC.', '..CC..', '..CC..', '...C..']
const CONE_C = { P: PINK, W: '#ffffff', C: '#e8a24a', K: BROWN }
const WHISTLE = ['..KKKKKKK', '.KYYYYYYK', 'KYYYYYYYK', 'KYYKKYYK.', 'KYYYYYK..', '.KKKKK...']
const BOTTLE = ['..KK..', '.KWWK.', 'KOOOOK', 'KOWWOK', 'KOWWOK', 'KOOOOK', 'KOOOOK', '.KKKK.']
const RING = ['..RRRR..', '.RWWWWR.', 'RW....WR', 'RW....WR', 'RW....WR', 'RW....WR', '.RWWWWR.', '..RRRR..']
const CRAB = ['.E....E.', '.K....K.', 'RR.RR.RR', 'RRRRRRRR', '.RRRRRR.', 'R.R..R.R']
const CRAB_C = { E: '#ffffff', K: INK, R: '#ff6b5a' }
const BALL = ['..RRWW..', '.RRRWWW.', 'RRRRWWWW', 'BBBBYYYY', 'BBBBYYYY', '.BBBYYY.', '..BBYY..']
const BALL_C = { R: RED, W: '#ffffff', B: SEA, Y: GOLD }
const FLOATIE = ['.GGGGGG.', 'GGGGGGGG', 'GG....GG', 'GG....GG', 'GGGGGGGG', '.GGGGGG.']
const VISOR = ['RRRRRRRR', '.RRRRRRRRR']

function water(x, y, t, a = 1) {
  x.save(); x.globalAlpha = 0.5 * a; x.fillStyle = SEA
  for (let i = 0; i < 18; i++) { const wx = 120 + i * 46, wy = y + 8 * Math.sin(t * 3 + i * 0.8); x.fillRect(wx, wy, 40, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saved you. | From *the kiddie pool.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, RING, { R: RED, W: '#ffffff' }, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1080, 'DEPTH: 1 FT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Guarding the pool. | *Mostly the snack bar.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CONE, CONE_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      label(x, 790, 660, 'SNACK BAR: SECURED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Blew the whistle. | *To say hi.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, WHISTLE, { K: INK, Y: GOLD }, 740, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'TWEET! hiii!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 50, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Sunscreen check. | *Every four minutes.*', mood: lt => lt > 1.2 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: INK, O: '#ffb34a', W: BONE }, 760, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      const n = 9 + Math.floor(prog(lt, 0.4, 2.0) * 4)
      label(x, 800, 680, `SPF CHECK #${n}`, pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Slow-motion run. | *For no reason.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'SLO-MO: ON', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'EMERGENCIES: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 0.8, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Rated your | *swimming form.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { water(x, 1120, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 820, '6.2 / 10', pop01(t, P.t0 + 0.4, 0.35, 2.4), { size: 72, bg: BONE, rot: -0.03 })
      label(x, 790, 990, 'ELBOWS: SLOPPY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Floatie fight? | *Turns: shared.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FLOATIE, { G: MINT }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, '5 MIN EACH', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 42, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'fair is fair', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Saw you running. | *From across the beach.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'WALK.', pop01(t, P.t0 + 0.6, 0.25, 2.6), { size: 80, col: LAV, tail: 'bl' })
      label(x, 790, 990, 'DISTANCE: 400 M', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: '#ff5a7a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Went for a swim. | *Reached the horizon.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.6],
    back(x, t, lt, P) { water(x, 1120, t, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 320, 760, 'BACK BY JUNE?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 320, 950, 'water’s great!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Wrote the pool rules. | *All 48.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 830); x.scale(k, k)
        x.fillStyle = BROWN; x.fillRect(-14, 140, 28, 160)
        x.fillStyle = INK; x.fillRect(-160, -170, 320, 320); x.fillStyle = '#fff4e2'; x.fillRect(-150, -160, 300, 300)
        x.fillStyle = RED; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POOL RULES', 0, -120)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`
        ;['1. no running', '2. no splashing', '…', '48. no fun'].forEach((s, i) => x.fillText(s, 0, -55 + i * 60))
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Saved a crab. | *Named it Gary.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CRAB, CRAB_C, 790, 1000, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'THIS IS GARY', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saved a beach ball. | *Wept* with relief.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BALL, BALL_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.6 })
      bubble(x, 790, 660, 'you’re safe now', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0025', key: 'F', accent: SKYB, ending: 'callback',
  title: 'The signs | *as lifeguards.*',
  cameos: CAMEOS,
  group: { cap: 'Pool’s safe. | *Ish.*' },
  last: {
    text: 'Gary? | *Head lifeguard.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 360, 1060, 240 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      const c = pop01(t, t - lt + 0.7, 0.35, 2)
      drawBits(x, CRAB, CRAB_C, 720, 1100, 30 * c)
      drawBits(x, VISOR, { R: RED }, 720, 1010, 18 * c)
      label(x, 720, 1240, 'HEAD LIFEGUARD', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1080, t - lt + 1.0, 7, 160, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
