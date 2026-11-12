// r2a0557: star_advice, ADVICE SOLO (taurus), "What Tauruses | need from you." (signs3kit social cut, music: lofi · F).
// Nine warm, relatable things a Taurus needs from a friend, each with one visual gag. Ending: group.
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, steam, swapLabel, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', ST = { x: -180 }, TAU = 'taurus'
const SNAIL = ['....SSSS......', '...SBBBBS.....', '..SBSSSSBS....', '..SBSBBSBS.K.K', '..SBSSBSBS.K.K', '...SBBBBS..GGG', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.']
const SNAIL_C = { S: '#c98f5a', B: '#e8b36a', G: '#9ee08a', K: INK }
const PLANT = ['...G.G...', '..GGGGG..', '.GG.G.GG.', '..GGGGG..', '...GGG...', '.TTTTTTT.', '..TTTTT..', '..TTTTT..']
const PLANT_C = { G: '#4fbf6a', T: '#d9734a' }

function stamp(x, cx, cy, text, k, col = RED) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.font = `700 42px ${MONO}`; const w = x.measureText(text).width + 40
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-w / 2, -40, w, 80)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

const CAMEOS = [
  { sign: TAU, cap: 'Plans? Give them | *a heads-up.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE ✦ TAURUS', headCol: ACC, lines: [['dinner in', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['two weeks?', BONE, pop01(t, P.t0 + 0.7, 0.25, 2)], ['THANK YOU.', GOLD, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]] })
      L(x, 800, 1110, 'IN THE CALENDAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: TAU, cap: 'Snacks are | *a love language.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 740 + i * 60, 880 - (i % 2) * 24, 9 * pop01(t, P.t0 + 0.5 + i * 0.15, 0.25, 2.2))
      hearts(x, t, 800, 820, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 2 })
      L(x, 800, 660, 'I LOVE YOU TOO', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: TAU, cap: 'Let them go slow. | Slow is *steady.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(620, 770, clamp(lt / 2.4)), 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, `LOADING… ${Math.min(100, Math.floor(lt * 42))}%`, pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, 0.05, 32)
      L(x, 800, 1130, 'ARRIVES ON TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: TAU, cap: 'A cozy night in? | *Perfect* plans.', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 800, 780, 16 * pop01(t, P.t0 + 0.6, 0.3, 2)); if (lt > 0.8) steam(x, t, 790, 720, { n: 2 })
      L(x, 800, 640, 'PAJAMAS: ON BY 7', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: TAU, cap: 'Don’t rush their yes. | It’s *a forever yes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'let me | think…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 800, 860, `DAY ${Math.min(3, 1 + Math.floor(lt / 0.5))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, 0.05, 32)
      stamp(x, 790, 1040, 'YES. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.6), MINT)
    } },
  { sign: TAU, cap: 'Remember their order. | That’s *friendship.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 250, head: 'THE USUAL', headBg: ACC, headInk: INK, lines: ['oat latte', 'extra foam', 'the big cookie'], size: 32 })
      L(x, 800, 1090, 'MEMORIZED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 850, P.t0 + 1.25, 7, 190, 0.3)
    } },
  { sign: TAU, cap: 'Stubborn? Sure. | Also *the most loyal.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt > 0.2) swapLabel(x, 800, 760, lt, 1.1, 'STUBBORN', 'LOYAL: LIFETIME', { size: 40, fromBg: STEEL, toBg: GOLD })
      bits(x, 'SHIELD', 800, 990, 26 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
    } },
  { sign: TAU, cap: 'Praise their space. | They *made it cozy.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 700, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 880, 980, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 680, 'it smells | like a hug', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1140, 'VIBES: CURATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: TAU, cap: 'Just keep showing up. | That’s *everything.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const wk = Math.min(52, 1 + Math.floor(lt * 22))
      bits(x, 'CLOCK', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'EVERY THURSDAY', pop01(t, P.t0 + 0.4, 0.3, 2.2), ACC, 0.05, 32)
      L(x, 800, 1070, `WEEK ${wk}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 520, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0557', key: 'F', accent: ACC, solo: TAU, ending: 'group',
  title: 'What Tauruses | *need from you.*',
  cameos: CAMEOS,
  group: { cap: 'Snacks. Patience. | *You.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
