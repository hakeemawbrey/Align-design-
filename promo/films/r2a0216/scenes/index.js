// r2a0216: star_advice, ADVICE SOLO, "How to apologise | to a Leo." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, relatable tips for saying sorry to a Leo, each with
// one cute visual gag.
//   0.0–3.6    "How to apologise | *to a Leo.*"
//   3.6–37.8   nine cards (3.8 s each):
//              say it out loud (a spotlit "I'm sorry.") · skip the excuses, even Mercury · name what hurt, tape the crown
//              · give them a minute, the roar cools · big feelings, meet them with big care · write it down, they keep
//              the note · ask how they feel, then listen · make it right, let the grudge balloon go · forgiven Leos cheer louder
//  37.8        "Sorry, said right. | *Pride melts.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Be honest and warm. | Leos *forgive big.*"  STATUS: FORGIVEN
//  46.9        "Bonus tip: | bring *snacks.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, HEART } from '../../signs3kit.js'
import { card, txt, phone, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'leo'
const ST = { x: -190 }
const AMBER = '#ffb34a'

const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const GLASS = [
  'WWWWWWWWW',
  '.G.....G.',
  '.GSSSSSG.',
  '..GSSSG..',
  '...GSG...',
  '....G....',
  '...G.G...',
  '..G...G..',
  '.G..S..G.',
  '.GSSSSSG.',
  'WWWWWWWWW',
]
const GLASS_C = { W: WOOD, G: '#bfe9ff', S: SUN }
const BALLOON = ['..RRRR..', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..', '...RR...', '....K...', '...K....', '....K...', '.....K..']
const MEGA = ['.......OO', '.....OOOO', 'KK.OOOOOO', 'KKOOOOOOO', 'KKOOOOOOO', 'KK.OOOOOO', '.....OOOO', '.......OO']
const MEGA_C = { O: AMBER, K: '#2a2350' }
const FRIES = ['.Y.Y.Y.', '.YYYYY.', 'YYYYYYY', 'RRRRRRR', 'RRWRRWR', 'RRRRRRR', '.RRRRR.']
const FRIES_C = { Y: SUN, R: RED, W: CREAM }

const CAMEOS = [
  { sign: S, cap: 'Say it out loud. | *Mumbles don’t count.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { beam(x, 790, 470, 790, 1000, 190, ease.outCubic(prog(lt, 0.3, 0.6))) },
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'I’m sorry.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 58, tail: 'bc' })
      label(x, 790, 1060, 'SAID: CLEARLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.4, 6, 190, 0.3)
    } },
  { sign: S, cap: 'Skip the excuses. | *Even Mercury.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const EX = ['traffic', 'I was tired', 'Mercury did it']
      EX.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2)
        if (k <= 0.01) return
        const y = 700 + i * 120, r = (i - 1) * 0.05
        label(x, 790, y, s, k, { size: 36, bg: CREAM, rot: r })
        const cr = ease.outCubic(prog(lt, 1.0 + i * 0.2, 1.2 + i * 0.2))
        if (cr > 0) { x.save(); x.translate(790, y); x.rotate(r); x.fillStyle = RED; x.fillRect(-170, -4, 340 * cr, 9); x.restore() }
      })
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 1100, 14 * pop01(t, P.t0 + 1.8, 0.3, 2.4))
    } },
  { sign: S, cap: 'Name what hurt. | *Then tape the crown.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CROWN, CROWN_C, 790, 830, 30 * k, { rot: 0.04 })
      // the crack, then a strip of tape over it
      if (k > 0.5) {
        x.save(); x.translate(790, 830); x.rotate(0.04); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath()
        x.moveTo(-10, -70); x.lineTo(12, -30); x.lineTo(-8, 10); x.lineTo(10, 70); x.stroke()
        const tp = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.3)) : prog(lt, 1.0, 1.3)
        if (tp > 0) { x.rotate(-0.5); x.globalAlpha = 0.9; x.fillStyle = '#f3e6b0'; x.fillRect(-90 * tp, -26, 180 * tp, 52); x.restore() } else x.restore()
      }
      bubble(x, 790, 620, 'I hurt you when…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      label(x, 790, 1070, 'CROWN: FIXED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them a minute. | *The roar cools.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GLASS, GLASS_C, 790, 850, 26 * k, { rot: Math.sin(lt * 2) * 0.03 })
      const roar = 1 - prog(lt, 0.4, 1.6)
      bubble(x, 420, 610, 'RAWR', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (0.55 + 0.45 * roar), { size: 52, col: ORANGE, tail: 'bc' })
      label(x, 790, 1120, lt > 1.6 ? 'ROAR: PURR' : 'COOLING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: lt > 1.6 ? MINT : SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big feelings? | *Meet them with big care.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outBack(prog(lt, 0.4, 1.2)) : prog(lt, 0.4, 1.2)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 860, lerp(6, 40, g) * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1130, 'SIZE: EXTRA LARGE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 240, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Write it down. | *They’ll keep the note.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 330, 330, k, { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'Dear Leo,', 0, -100, { size: 38, weight: 800 })
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 3; i++) x.fillRect(-120, -40 + i * 44, 240 - i * 40, 10)
        txt(x, 'sorry. ♡', 40, 110, { size: 34, weight: 800, color: '#e23d4e' })
        x.fillStyle = GOLD; x.fillRect(-20, -180, 40, 40); x.fillStyle = INK; x.fillRect(-20, -144, 40, 4)
      })
      label(x, 790, 1110, 'FILED: KEEPSAKES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 200, 0.5)
    } },
  { sign: S, cap: 'Ask how they feel. | *Then actually listen.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MESSAGES', headCol: AMBER, size: 24, w: 330, h: 400, rot: 0.03, lines: [
        ['how are you, really?', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['honestly? long story', LAV, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['I’ve got time ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      label(x, 790, 1110, 'LISTENING…', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Make it right. | *Then let it go.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.9, 2.4))
      drawBits(x, BALLOON, { R: RED, W: '#fff', K: BONE }, 790 + Math.sin(t * 2) * 16, lerp(870, 520, up), 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.6) * 0.06 })
      label(x, 790 + Math.sin(t * 2) * 16, lerp(1050, 700, up), 'GRUDGE', pop01(t, P.t0 + 0.4, 0.3, 2.2) * (1 - prog(lt, 1.6, 2.0)), { size: 32, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'RELEASED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgiven? | Now they *cheer for you.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.4, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MEGA, MEGA_C, 600, 840, 20 * k, { rot: -0.15 })
      bubble(x, 830, 700, 'YOU’RE THE | BEST!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1090, 'STATUS: BESTIE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 820, 960, P.t0 + 1.0, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0216', key: 'D', accent: AMBER, solo: S, ending: 'lesson',
  title: 'How to apologise | *to a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Sorry, said right. | *Pride melts.*', mood: 'heart' },
  lesson: { text: 'Be honest and warm. | Leos *forgive big.*', chip: 'STATUS: FORGIVEN' },
  last: {
    text: 'Bonus tip: | bring *snacks.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, FRIES, FRIES_C, 760, 1120, 26 * pop01(t, t0 + 0.8, 0.35, 2.2), { rot: 0.08 })
      hearts(x, t, 540, 1200, t0 + 1.2, { n: 6, life: 1.8, spread: 420, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
