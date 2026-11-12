// r2a0217: star_advice, ADVICE SOLO, "Signs a Scorpio | needs a break." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the intense, protective Scorpio running on empty, each
// card a relatable sign plus a warm reframe and one cute visual gag.
//   0.0–3.6    "Signs a Scorpio | *needs a break.*"
//   3.6–37.8   nine cards (3.8 s each):
//              rereading texts for clues · sleeping with one eye open · an old grudge, set it down · every feeling at
//              full volume · researching everyone's chart, just ask · the black hoodie armour, try something soft
//              · testing loyalty, let them show you · overthinking at 3 a.m. · you guard everyone, let someone guard you
//  37.8        "Intense heart. | *Needs rest too.*"  Scorpio comes back, big.
//  41.2        callback: "The soft sweater? | *Still wearing it.*"  Scorpio returns in the pink sweater from card 6.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'scorpio'
const ST = { x: -190 }
const PLUM = '#c97bff'

const LENS = ['..KKKK..', '.KSSSSK.', 'KSSWSSSK', 'KSSSSSSK', 'KSSSSSSK', '.KSSSSK.', '..KKKKK.', '......KK', '.......K']
const WEIGHT = ['....KKKK....', '...K....K...', '..GGGGGGGG..', '.GGGGGGGGGG.', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']
const HOODIE = ['...KKKKKK...', '..KKKKKKKK..', '.KKKK..KKKK.', 'KKKKKKKKKKKK', 'KKKKKKKKKKKK', 'KK.KKKKKK.KK', 'KK.KKKKKK.KK', '...KKKKKK...']
const SWEATER = ['...PPPPPP...', '..PPPWWPPP..', '.PPPPPPPPPP.', 'PPPPHPPHPPPP', 'PPPPHHHHPPPP', 'PP.PPHHPP.PP', 'PP.PPPPPP.PP', '...WWWWWW...']
const SWEATER_C = { P: '#ff8fb1', W: CREAM, H: '#e23d4e' }
const UMBRELLA = ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', 'YYYYYYYYYYYY', 'Y..Y..Y..Y.Y', '.....K......', '.....K......', '.....K......', '.....K......', '.....K.K....', '......K.....']

const CAMEOS = [
  { sign: S, cap: 'Rereading texts for clues? | *Put the phone down.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 1.2, 1.6))
      phone(x, 790, lerp(840, 1000, down), pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'READ 9:41', headCol: LAV, size: 30, rot: lerp(0.04, 0.5, down), lines: [['ok.', PINK, 1]] })
      if (down < 0.5) drawBits(x, LENS, { K: INK, S: SKYB, W: '#fff' }, 740 + Math.sin(t * 3) * 30, 760, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 640, '“ok.” = JUST OK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sleeping with one eye open? | *You can rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.beginPath(); x.arc(790, 790, 112 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(790, 790, 104 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(840, 760, 96 * k, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1050, lt > 1.3 ? 'GUARD DUTY: OFF' : 'GUARD DUTY: ON', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? MINT : RED, color: lt > 1.3 ? INK : CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'An old grudge? | *Set it down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5, 1.9],
    front(x, t, lt, P) {
      const drop = ease.outBounce ? ease.outBounce(prog(lt, 1.0, 1.4)) : ease.outCubic(prog(lt, 1.0, 1.4))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, WEIGHT, { K: GREY, G: '#6b62a8' }, 790, lerp(760, 1060, drop) + (lt < 1.0 ? Math.sin(t * 20) * 4 : 0), 20 * k)
      txt(x, 'GRUDGE', 790, lerp(780, 1080, drop) + 10, { size: 34, color: CREAM, font: MONO, weight: 700 })
      label(x, 790, 620, 'WEIGHT: LIFTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Every feeling at full volume? | *Turn it down.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const v = Math.round(lerp(11, 5, ease.inOutCubic(prog(lt, 0.9, 1.6))))
      card(x, 790, 850, 320, 320, k, { bg: '#2a2350', rot: 0 }, () => {
        x.fillStyle = INK; x.beginPath(); x.arc(0, 10, 110, 0, Math.PI * 2); x.fill()
        x.fillStyle = GREY; x.beginPath(); x.arc(0, 10, 100, 0, Math.PI * 2); x.fill()
        const a = lerp(-2.4, 2.4, v / 11) - Math.PI / 2
        x.strokeStyle = RED; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 10); x.lineTo(Math.cos(a) * 86, 10 + Math.sin(a) * 86); x.stroke()
        txt(x, 'FEELINGS', 0, -140, { size: 26, font: MONO, weight: 700, color: BONE })
      })
      label(x, 790, 1100, `VOLUME: ${v}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: v > 8 ? RED : MINT, color: v > 8 ? CREAM : INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Researching everyone’s chart? | *Just ask them.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) chart(x, 700 + i * 90, 720 + i * 80, 90, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2) * (1 - ease.inCubic(prog(lt, 1.1, 1.4))), t + i)
      bubble(x, 790, 860, 'what’s your | sign?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      label(x, 790, 1100, 'SO MUCH EASIER', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Black hoodie as armour? | *Try something soft.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.9, 1.3))
      drawBits(x, HOODIE, { K: '#1b1236' }, 790 - sw * 400, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { alpha: 1 - sw, outline: GREY })
      drawBits(x, SWEATER, SWEATER_C, 790, 860, 22 * sw)
      label(x, 790, 1100, 'COZY MODE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 190, 0.3)
    } },
  { sign: S, cap: 'Testing everyone’s loyalty? | *Let them show you.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), crumple = ease.inCubic(prog(lt, 1.0, 1.3))
      card(x, 790, 860, 320 * (1 - crumple * 0.85), 380 * (1 - crumple * 0.85), k, { bg: CREAM, rot: 0.04 + crumple }, () => {
        if (crumple > 0.5) return
        txt(x, 'LOYALTY TEST', 0, -150, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { txt(x, `Q${i + 1}.`, -110, -80 + i * 54, { size: 26, font: MONO, weight: 700 }); x.fillStyle = '#b9b0a0'; x.fillRect(-60, -86 + i * 54, 170, 10) }
        txt(x, '…of 40', 0, 180, { size: 26, font: MONO, weight: 700, color: RED })
      })
      bubble(x, 790, 1060, 'brought you soup ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Overthinking at 3 a.m.? | *Your mind needs sleep.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 700, 80, pop01(t, P.t0 + 0.2, 0.3, 2), 3, 0)
      const calm = prog(lt, 1.2, 1.5)
      const TH = ['what if…', 'but why…', 'did they…']
      TH.forEach((s, i) => bubble(x, 790 + (i - 1) * 60, 900 + i * 90, s, pop01(t, P.t0 + 0.4 + i * 0.2, 0.25, 2.2) * (1 - calm), { size: 34, col: LAV, tail: 'bl' }))
      label(x, 790, 1000, 'THOUGHTS: ON SNOOZE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You guard everyone. | *Let someone guard you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, -1], star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 990, 200 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.0] })
      const d = ease.outCubic(prog(lt, 0.8, 1.2))
      drawBits(x, UMBRELLA, { Y: '#ff8fb1', K: INK }, lerp(800, F.x + 60, d), lerp(780, F.top - 30, d), 20 * k, { rot: lerp(0, -0.2, d) })
      label(x, 800, 1150, 'BESTIE ON DUTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 1.4, { n: 5, life: 1.8, spread: 300, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0217', key: 'F', accent: PLUM, solo: S, ending: 'callback',
  title: 'Signs a Scorpio | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Intense heart. | *Needs rest too.*', mood: 'heart' },
  last: {
    text: 'The soft sweater? | *Still wearing it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (k <= 0.01) return
      const Fs = signChar(x, t, S, 540, 1000, 320 * k, { mood: 'heart', seed: 9, hops: [t0 + 1.3] })
      drawBits(x, SWEATER, SWEATER_C, 540, Fs.cy + 118 * k, 21 * k)
      hearts(x, t, 540, 1100, t0 + 1.2, { n: 6, life: 1.8, spread: 420, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
