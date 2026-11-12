// r2a0720: star_advice, ADVICE SOLO (libra), "How to give | a Libra space." (the batch hook "How to give a Libra |
// space." re-cut so it fits two lines) (signs3kit social cut, lofi · G). Ending: lesson.
// One sign the whole way: nine kind, true ways to give a Libra room to recharge, each with one light gag.
//   went quiet, it's not about you (battery refilling) · don't make them pick dinner today · let them have their pretty
//   corner · one sweet text, then wait · solo gallery date · space is a breath (bubbles) · let them miss you a little
//   · they come back glowing · then plan a picnic together
//   group "A little space. | A lot of love."   LESSON "Love with room in it | lasts longer."   last "Libra’s back. | With three outfits."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, soap, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#ff8fd0', S = 'libra', ST = { x: -190 }
const DRESS = ['..KK..', '.DDDD.', 'DDDDDD', '.DDDD.', '.DDDD.', 'DDDDDD', 'DDDDDD', 'DDDDDD']

/** a battery that fills up bar by bar */
function battery(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -70, 290, 140); x.fillRect(140, -30, 24, 60)
  x.fillStyle = BONE; x.fillRect(-140, -60, 270, 120); x.fillStyle = NIGHT; x.fillRect(-130, -50, 250, 100)
  const n = Math.round(v * 5)
  for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? (n < 3 ? RED : MINT) : 'rgba(255,255,255,0.08)'; x.fillRect(-122 + i * 49, -42, 40, 84) }
  x.restore()
}
/** a framed painting */
function painting(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = GOLD; x.fillRect(-142, -112, 284, 224)
  x.fillStyle = '#8fc6e8'; x.fillRect(-120, -90, 240, 180)
  x.fillStyle = '#5fd068'; x.fillRect(-120, 30, 240, 60)
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(60, -30, 30, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They went quiet? | *It’s not about you.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      battery(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.2, 1, ease.inOutCubic(clamp((lt - 0.4) / 1.5))))
      L(x, 800, 680, 'RECHARGING', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, -0.04, 38)
      L(x, 800, 1060, 'BACK SOON ♡', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Don’t make them pick dinner. | *Not today.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 700, 700, 'TACOS?', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.08, 36)
      L(x, 880, 780, 'PASTA?', pop01(t, P.t0 + 0.4, 0.3, 2), MINT, 0.08, 36)
      L(x, 720, 870, 'SUSHI?', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, 0.05, 36)
      L(x, 800, 1060, 'ASK TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 40)
    } },
  { sign: S, cap: 'Let them have | *their pretty corner.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'LAMP', 720, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLOWER', 880, 900, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      x.save(); x.globalAlpha = 0.25 * pop01(t, P.t0 + 0.6, 0.3, 2); x.fillStyle = '#ffe76a'; x.beginPath(); x.arc(720, 860, 110, 0, Math.PI * 2); x.fill(); x.restore()
      L(x, 800, 1090, 'MY CORNER', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 40)
    } },
  { sign: S, cap: 'Send one sweet text. | *Then let it be.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: LIBRA', headCol: ACC, size: 26, lines: [['thinking of u', MINT, pop01(t, P.t0 + 0.6, 0.2, 2), true], ['no rush', MINT, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['', NIGHT, 0], ['♡ seen', PINK, pop01(t, P.t0 + 1.8, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Solo gallery date? | *Let them wander.*', mood: 'heart', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      painting(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'TABLE FOR ONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 36)
      sparkles(x, t, 800, 840, P.t0 + 1.3, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Space isn’t distance. | *It’s a breath.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      soap(x, t, 800, 1050, { n: 8, spread: 300, r: 30, h: 420, alpha: clamp(lt / 0.6) })
      L(x, 800, 1100, 'BREATHE IN…', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, -0.04, 36)
    } },
  { sign: S, cap: 'Let them miss you. | *Just a little.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = 0.5 + 0.7 * ease.outBack(clamp((lt - 0.4) / 1.2))
      bits(x, 'HEARTB', 800, 860, 20 * g * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'MISSING YOU…', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 38)
    } },
  { sign: S, cap: 'They come back glowing. | *Worth the wait.*', mood: 'sparkle', star: ST, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) if (lt > 0.4 + i * 0.2) drawBits(x, ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY'], { Y: [GOLD, PINK, MINT, SKYB, LAV][i] }, 690 + (i % 3) * 110, 740 + Math.floor(i / 3) * 150 + (i % 2) * 30, 9 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2.2))
      L(x, 800, 1080, 'FULLY RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Then plan something lovely. | *Together.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'gemini', 820, 860, 150, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 800, 660, 'PICNIC: SATURDAY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
      hearts(x, t, 700, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0720', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to give | a Libra *space.*',
  cameos: CAMEOS,
  group: { cap: 'A little space. | *A lot of love.*', mood: 'heart' },
  lesson: { text: 'Love with room in it | *lasts longer.*', chip: 'BALANCE: RESTORED' },
  last: {
    text: 'Libra’s back. | *With three outfits.*',
    draw(x, t, lt) { for (let i = 0; i < 3; i++) drawBits(x, DRESS, { K: INK, D: [PINK, MINT, LAV][i] }, 340 + i * 200, 1480, 24 * pop01(t, t - lt + 0.7 + i * 0.2, 0.3, 2.2), { rot: (i - 1) * 0.1 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
