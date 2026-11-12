// r2a0531: star_advice, ADVICE SOLO (leo), "Leo, here's your | Monday pep talk." (signs3kit social cut, music: lofi · D).
// Nine warm truths for a Leo on a Monday, each with one visual gag. Ending: group.
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'leo', cap: 'Monday showed up. | So did *you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const ring = lt < 1.0 ? Math.sin(t * 40) * 0.12 : 0
      bits(x, 'CLOCK', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: ring })
      if (lt < 1.0) L(x, 800, 650, 'RING RING', pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, 0.05, 32)
      L(x, 800, 1070, 'SHOWED UP: WIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Nobody clapped yet? | Clap *for yourself.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      // a lit APPLAUSE sign that blinks on
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), on = lt > 0.9 && Math.floor(lt * 5) % 2 === 0
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -60, 340, 120); x.fillStyle = on ? '#ff4f5e' : '#5a2330'; x.fillRect(-160, -50, 320, 100)
        x.fillStyle = on ? '#fff4e2' : '#a06070'; x.font = "800 50px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('APPLAUSE', 0, 3)
        x.restore()
      }
      L(x, 800, 1060, 'SELF-SERVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 820, P.t0 + 1.0, 7, 190, 0.2)
    } },
  { sign: 'leo', cap: 'Bad hair day? | Still *the moment.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      if (lt > 0.2) swapLabel(x, 800, 820, lt, 1.0, 'HAIR: CHAOS', 'VIBE: ICONIC', { size: 40, fromBg: STEEL, toBg: GOLD })
      bubble(x, 800, 1060, 'still cute.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'You don’t have to | be *“on”* all day.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const dim = clamp((lt - 0.6) / 0.8)
      bits(x, 'LAMP', 800, 840, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { alpha: 1 - 0.55 * dim })
      L(x, 800, 1060, 'SPOTLIGHT: NAP MODE', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 30)
      if (lt > 1.3) zzz(x, t, 470, 700)
    } },
  { sign: 'leo', cap: 'Your big heart? | That’s your *superpower.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7))
      bits(x, 'HEARTB', 800, 830, 30 * pop01(t, P.t0 + 0.3, 0.35, 2) * beat)
      L(x, 800, 1060, 'CAPE: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 32)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Ask for help. | Even *stars* do.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 760, 760, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      friend(x, t, 'virgo', 820, 990, 170, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 35, hops: [P.t0 + 1.2] })
      bubble(x, 800, 1150, 'got you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Inbox chaos? | Still *a legend.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 3 + Math.floor(clamp((lt - 0.3) / 0.8) * 80)
      L(x, 800, 660, `INBOX: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.05, 32)
      L(x, 800, 1060, 'CONFIDENCE: INTACT', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Hype someone up. | It *comes back.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 820, 960, 180, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 36, hops: [P.t0 + 1.5] })
      bubble(x, 760, 700, 'YOU’VE GOT THIS!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 1150, 'no, YOU do!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: GOLD, tail: 'br' })
    } },
  { sign: 'leo', cap: 'Coffee first. | *Then* the world.', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.35, 2)); steam(x, t, 780, 770, { n: 3 })
      L(x, 800, 1060, 'STEP 1 OF 1: SHINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0531', key: 'D', accent: ACC, solo: 'leo', ending: 'group',
  title: 'Leo, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Go get Monday, | *sunshine.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
