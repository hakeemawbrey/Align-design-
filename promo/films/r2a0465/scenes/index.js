// r2a0465: star_advice, ADVICE ROLLCALL, "Each sign's | *word for the year.*" (signs3kit social cut, music: lofi · G). Ending: group.
// Each card: a word card for that sign + a warm reframe and one light gag.
//   ♈ pause, then go anyway · ♉ new, start with one snack · ♊ finish, one thought at a time · ♋ lighter, carry less, hug more
//   · ♌ rest, the stage will wait · ♍ enough, it already is · ♎ choose, then trust it · ♏ trust, start with one person
//   · ♐ stay, some views get better · ♑ play, put fun on the list · ♒ together, your weird has company · ♓ joy, happy tears count
//   group (the ending) "Twelve words. | One good year."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#f2c75c', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** the word card: a cream index card, "WORD OF THE YEAR" strip in the sign's colour, the word big */
function wordCard(x, cx, cy, k, word, col, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const w = 330, h = 200
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, 46)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('MY WORD:', 0, -h / 2 + 24)
  x.font = `800 ${word.length > 7 ? 48 : 60}px ${INTER}`; x.fillText(word, 0, 26)
  x.restore()
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.5 } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 40
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 20 + LH * (i + 0.5)))
  x.restore()
}
const W = (lt, t, P) => pop01(t, P.t0 + 0.15, 0.3, 2)   // the word card pops first
const CW = { x: 790, y: 700 }                            // where the word card sits
const COOKIE = ['..BBBB..', '.BKBBBB.', 'BBBBBKBB', 'BKBBBBBB', 'BBBBKBBB', '.BBBBBK.', '..BBBB..']
const BACKPACK = ['..KKKK..', '.K....K.', 'PPPPPPPP', 'PPPPPPPP', 'PPYYYYPP', 'PPYYYYPP', 'PPPPPPPP', 'PPPPPPPP']
const SPOT = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '..KKKK..', '...KK...', '...KK...', '..KKKK..']
const KEY = ['.YYY........', 'Y...Y.......', 'Y...YYYYYYYY', 'Y...Y...Y.Y.', '.YYY........']
const TENT = ['.....K.....', '....OOO....', '...OOOOO...', '..OOODOOO..', '.OOODDDOOO.', 'OOOODDDOOOO']
const KITE = ['....R....', '...RRR...', '..RRYRR..', '.RRYYYRR.', '..RRYRR..', '...RRR...', '....R....', '....K....', '.....K...', '....K....', '...K.....']

const CAMEOS = [
  { sign: 'aries', cap: 'Pause. | *Then go anyway.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: ST, hops: [1.6, 1.9],
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'PAUSE', '#f0603a'); L(x, 790, 1000, lt < 1.4 ? 'WAITING… 3 SEC' : 'GO! ✓', pop01(t, P.t0 + 0.7, 0.3, 2), lt < 1.4 ? BONE : MINT, 0.04, 36) } },
  { sign: 'taurus', cap: 'New. | *Start with one snack.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'NEW', '#f2c75c'); drawBits(x, COOKIE, { B: '#e0a458', K: '#6b4020' }, 790, 1010, 26 * pop01(t, P.t0 + 0.7, 0.3, 2)); L(x, 790, 1150, 'NEW FLAVOUR ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32) } },
  { sign: 'gemini', cap: 'Finish. | *One thought at a time.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      wordCard(x, CW.x, CW.y, W(lt, t, P), 'FINISH', '#ffd23a')
      const n = Math.max(1, 6 - Math.floor(clamp((lt - 0.5) / 1.0) * 5))
      L(x, 790, 1000, `IDEAS OPEN: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), n > 1 ? BONE : MINT, 0.04, 34)
      if (n === 1) sparkles(x, t, 790, 1000, P.t0 + 1.95, 6, 180, 0.3)
    } },
  { sign: 'cancer', cap: 'Lighter. | *Carry less, hug more.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      wordCard(x, CW.x, CW.y, W(lt, t, P), 'LIGHTER', SKYB)
      const off = ease.inCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BACKPACK, { K: INK, P: PURP, Y: GOLD }, 790 + off * 60, 1020 + off * 120, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { alpha: 1 - off })
      if (lt > 1.4) hearts(x, t, 520, 820, P.t0 + 1.5, { n: 4, life: 1.2, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Rest. | *The stage will wait.*', mood: lt => lt < 1.0 ? 'happy' : 'sleepy', star: ST,
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'REST', ORANGE); drawBits(x, SPOT, { Y: lt < 1.0 ? '#fffbe8' : '#6b62a8', K: GREY }, 790, 1010, 22 * pop01(t, P.t0 + 0.6, 0.3, 2)); L(x, 790, 1160, 'SPOTLIGHT: OFF', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32) } },
  { sign: 'virgo', cap: 'Enough. | *It already is.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'ENOUGH', '#ef5c94'); note(x, 790, 1030, pop01(t, P.t0 + 0.6, 0.3, 2), ['✓ you', '✓ already'], { w: 220, size: 34, rot: 0.05 }) } },
  { sign: 'libra', cap: 'Choose. | *Then trust it.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: lt => [lt < 1.2 ? (Math.sin(lt * 6) > 0 ? 1 : -1) : 0, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wordCard(x, CW.x, CW.y, W(lt, t, P), 'CHOOSE', '#ff8fb1')
      L(x, 690, 1000, 'THIS', pop01(t, P.t0 + 0.6, 0.3, 2), lt > 1.3 ? MINT : BONE, -0.06, 46)
      L(x, 890, 1000, 'THAT', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, 0.06, 46, lt > 1.3 ? GREY : INK)
      if (lt > 1.3) sparkles(x, t, 690, 1000, P.t0 + 1.7, 6, 120, 0.4)
    } },
  { sign: 'scorpio', cap: 'Trust. | *Start with one person.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'TRUST', '#d8435c'); drawBits(x, KEY, { Y: GOLD }, 790, 1000, 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.1 }); L(x, 790, 1130, 'SPARE KEYS: 1', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32) } },
  { sign: 'sagittarius', cap: 'Stay. | *Some views get better.*', mood: lt => lt < 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'STAY', '#b07cff'); drawBits(x, TENT, { K: INK, O: ORANGE, D: '#6b4020' }, 790, 1010, 26 * pop01(t, P.t0 + 0.6, 0.3, 2)); L(x, 790, 1150, 'NIGHT 3. STILL HERE', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 28) } },
  { sign: 'capricorn', cap: 'Play. | *Put fun on the list.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'PLAY', '#5fd0a8'); note(x, 680, 1040, pop01(t, P.t0 + 0.5, 0.3, 2), ['TO DO:', '☑ fun'], { w: 180, size: 30, rot: -0.06, font: MONO, weight: 700 }); drawBits(x, KITE, { R: RED, Y: GOLD, K: BONE }, 880, 1010 - Math.sin(t * 2) * 14, 17 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.15 * Math.sin(t * 1.7) }) } },
  { sign: 'aquarius', cap: 'Together. | *Your weird has company.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      wordCard(x, CW.x, CW.y, W(lt, t, P), 'TOGETHER', '#38c4ec')
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 1010, 190 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.3] })
      L(x, 790, 1160, 'NEW FRIEND ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Joy. | *Happy tears count.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { wordCard(x, CW.x, CW.y, W(lt, t, P), 'JOY', '#7c74f0'); hearts(x, t, 790, 1060, P.t0 + 0.7, { n: 7, life: 1.8, spread: 220, cell: 8, seed: 6 }); L(x, 790, 1150, 'TEARS: THE GOOD KIND', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 28) } },
]

const F = makeFilm({
  id: 'r2a0465', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s | *word for the year.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve words. | *One good year.*', moods: Array(12).fill('sparkle') },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
