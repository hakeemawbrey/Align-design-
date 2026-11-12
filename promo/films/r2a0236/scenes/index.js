// r2a0236: star_advice, ADVICE SOLO, "Virgo, this is your sign | to call home." (~42 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the Virgo who looks after everyone, gently reminded that
// home just wants to hear from them.
//   0.0–3.6    "Virgo, this is your sign | *to call home.*"
//   3.6–37.8   nine cards (3.8 s each): fixing everyone, let home fix you · rehearsed the call, they just want hello
//              · updates in bullet points, they'd love rambling · worried they're busy, they're waiting by the phone
//              · cleaned for a video call, they'd love the mess · no grades at home · homesick is love with a long cord
//              · checks on everyone, who checks on you · five minutes counts, call anyway
//  37.8        group ending: "Call home, Virgo. | *Someone’s smiling.*"  Virgo comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, sheet, handset, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN } from './props.js'

const S = 'virgo', ACC = '#7dffb0'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }

const TOOLBOX = ['....KKKK....', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRYYRRRRR', 'RRRRRYYRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const TOOL_C = { K: INK, R: RED, Y: SUN }
const BROOM = ['.....B', '....B.', '...B..', '..B...', '.YY...', 'YYYY..', 'YYYY..', 'Y.Y...']
const OLDPHONE = ['..KKKKKKKK..', '.KRRRRRRRRK.', 'KRRK....KRRK', 'KRK......KRK', '...KRRRRK...', '..KRWRWRRK..', '..KRRRRRRK..', '..KRWRWRRK..', '..KRRRRRRK..', '..KKKKKKKK..']
const OLD_C = { K: INK, R: PINK, W: CREAM }

/** a curly phone cord from (ax, ay) to (bx, by), drawn up to p */
function cord(x, ax, ay, bx, by, p, t) {
  x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.lineCap = 'round'
  for (const [w, c] of [[12, INK], [6, PINK]]) {
    x.lineWidth = w; x.strokeStyle = c; x.beginPath()
    const n = Math.floor(60 * clamp(p))
    for (let i = 0; i <= n; i++) {
      const u = i / 60, px = lerp(ax, bx, u) + Math.cos(u * 60) * 14, py = lerp(ay, by, u) + Math.sin(u * Math.PI) * 120 + Math.sin(u * 60) * 14
      i ? x.lineTo(px, py) : x.moveTo(px, py)
    }
    x.stroke()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You fix everyone. | *Let home fix you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, TOOL_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'FIXING: EVERYONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, ...LBL })
      bubble(x, 790, 680, 'come home, | we’ll feed you', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'You rehearsed the call. | *They just want hello.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 280, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 'CALL SCRIPT v4', { rot: 0.04, size: 26 }, () => {
        txt(x, '1. hi', -110, -60, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '2. weather', -110, -22, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '3. job (brief)', -110, 16, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '4. goodbye', -110, 54, { size: 26, font: MONO, weight: 700, align: 'left' })
      })
      bubble(x, 790, 610, 'HI!! hi. hello!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Updates in bullet points? | They’d *love rambling.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = LAV; x.fillRect(-100, -150, 200, 44); txt(x, 'HOME ♥', 0, -127, { size: 22, font: MONO, weight: 700 })
        ;['• fine', '• busy', '• ate'].forEach((s, i) => txt(x, s, -86, -60 + i * 46, { size: 28, font: MONO, weight: 700, color: BONE, align: 'left' }))
      })
      bubble(x, 800, 1110, 'tell us MORE', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Worried they’re busy? | *They’re waiting.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 950, 190 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      drawBits(x, OLDPHONE, OLD_C, 880, 1110, 9 * k)
      label(x, 790, 720, 'BY THE PHONE · ALL DAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, ...LBL })
      hearts(x, t, 800, 880, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Cleaned for the video call? | *They’d love the mess.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BROOM, { B: BROWN, Y: SUN }, 870, 1000, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.15 * Math.sin(t * 7) })
      sparkles(x, t, 700, 960, P.t0 + 0.6, 6, 120, 0.2, [BONE, MINT, SKYB])
      label(x, 760, 680, 'ROOM: SPOTLESS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, ...LBL })
      bubble(x, 760, 850, 'is that a sock? | cute.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'There are no grades | *at home.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 790, 870, 260, 320, k, 'REPORT: YOU', { rot: 0.05, size: 26 }, () => {
        const s = prog(lt, 0.8, 1.2)
        txt(x, 'A–', 0, 10, { size: 110, color: RED })
        if (s > 0) { x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(-80, -40); x.lineTo(lerp(-80, 80, s), lerp(-40, 60, s)); x.stroke(); x.restore() }
      })
      label(x, 790, 1110, 'LOVED: UNGRADED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Homesick is just love | on a *long cord.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      cord(x, 420, 960, 860, 700, prog(lt, 0.3, 1.2), t)
      drawBits(x, OLDPHONE, OLD_C, 860, 690, 14 * k)
      label(x, 760, 1110, 'DISTANCE: FAR · LOVE: SAME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'You check on everyone. | *Let them check on you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 270, 330, pop01(t, P.t0 + 0.2, 0.35, 2), 'CHECKED ON', { rot: 0.04, size: 26 }, () => {
        ;['friends ✓', 'coworkers ✓', 'neighbour ✓', 'me ?'].forEach((s, i) => txt(x, s, -105, -60 + i * 40, { size: 26, font: MONO, weight: 700, align: 'left', color: i === 3 ? RED : INK }))
      })
      bubble(x, 800, 610, 'how are YOU?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Five minutes counts. | *Call anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      clock(x, 700, 720, 90, pop01(t, P.t0 + 0.2, 0.35, 2), 7, 55)
      handset(x, 880, 960, pop01(t, P.t0 + 0.5, 0.35, 2), () => {
        x.fillStyle = GREEN; x.beginPath(); x.arc(0, 30, 50 * (1 + 0.08 * Math.sin(t * 10)), 0, Math.PI * 2); x.fill()
        txt(x, 'HOME ♥', 0, -70, { size: 24, font: MONO, weight: 700, color: BONE })
      }, { w: 180, h: 300, rot: 0.12 * Math.sin(t * 22) * (lt > 0.8 ? 1 : 0) })
      label(x, 790, 1150, 'RING RING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GREEN, rot: -0.04, ...LBL })
    } },
]

const F = makeFilm({
  id: 'r2a0236', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Virgo, this is your | sign *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Call home, Virgo. | *Someone’s smiling.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
