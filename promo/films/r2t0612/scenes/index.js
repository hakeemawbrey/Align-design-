// r2t0612: star_talk, ROLLCALL, "The signs | *playing tennis.*" (~54 s vertical, signs3kit social cut, music: lofi · E).
// Ending: group (the group beat is the punchline).
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one tennis moment per sign (3.8 s each):
//              ♈ served before you got to the court · ♉ brought a picnic to the baseline · ♊ played both sides, still lost
//              · ♋ hit the ball, then apologised to it · ♌ every shot was a photo op · ♍ called it out, brought a ruler
//              · ♎ wanted the score to stay love-love · ♏ studied your chart before the serve · ♐ hit it out of the city
//              · ♑ business cards at doubles · ♒ invented new rules: three balls · ♓ won a point, wept at the net
//  49.2        "Final score? | *Nobody knows.*"  The twelve fly up into a group photo.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, chart, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#d7f24a'
const BALL = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYWY', 'YYYYWY', '.YYYY.']
const BALL_C = { Y: '#d7f24a', W: BONE }
const RACKET = ['..KKKKK..', '.KSSSSSK.', 'KSKSKSKSK', 'KSSSSSSSK', 'KSKSKSKSK', 'KSSSSSSSK', '.KSKSKSK.', '..KKKKK..', '....H....', '....H....', '....H....', '...HHH...']
const RACKET_C = { K: '#ff6b5a', S: CREAM, H: '#6b4a3a' }
const NET = ['P..........P', 'PWWWWWWWWWWP', 'PW.W.W.W.W.P', 'P.W.W.W.W.WP', 'PW.W.W.W.W.P', 'P.W.W.W.W.WP', 'P..........P', 'P..........P']
const NET_C = { P: STEEL, W: BONE }
const CARD = ['WWWWWWWWWW', 'WKKKKKWWWW', 'WWWWWWWWWW', 'WLLLLLLLWW', 'WLLLLLWWWW', 'WWWWWWWWWW']
const ball = (x, cx, cy, cell, o) => drawBits(x, BALL, BALL_C, cx, cy, cell, o)
const racket = (x, cx, cy, cell, o) => drawBits(x, RACKET, RACKET_C, cx, cy, cell, o)

const R = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Served before you | *got to the court.*', mood: 'sparkle', look: [1, 0], star: R, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      racket(x, 520, 860, 12 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.6 })
      const f = prog(lt, 0.4, 1.0)
      if (f > 0 && f < 1) ball(x, lerp(560, 930, f), 820 - Math.sin(Math.PI * f) * 120, 10)
      L(x, 790, 1000, 'SCORE: 40–0', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 40)
      L(x, 790, 1120, 'OPPONENT: STILL PARKING', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 26)
    } },
  { sign: 'taurus', cap: 'Brought a picnic. | *To the baseline.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 790, 1080, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bits(x, 'PIZZA', 760, 960, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.3 })
      const f = prog(lt, 1.0, 2.2)
      if (f > 0 && f < 1) ball(x, lerp(980, 140, f), 1150, 8)
      L(x, 790, 680, 'BALLS RETURNED: 0', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Played both sides. | *Still lost.*', mood: lt => lt > 1.5 ? 'wide' : 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -220, s: 240 },
    back(x, t, lt, P) { drawBits(x, NET, NET_C, 560, 1000, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      signChar(x, t, 'gemini', 760, 880, 240 * pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'squint', look: [-1, 0], seed: 9, glyph: false })
      const f = (lt * 1.4) % 1
      ball(x, lerp(400, 700, Math.abs(f * 2 - 1)), 760 - Math.sin(Math.PI * f) * 90, 9)
      L(x, 560, 650, 'GEMINI vs GEMINI', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.04, 34)
      L(x, 560, 1160, 'WINNER: UNCLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Hit the ball. | *Then said sorry to it.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      racket(x, 540, 900, 11 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.5 })
      ball(x, 800, 960, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 720, 'sorry, | little guy!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 920, P.t0 + 1.5, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Every shot | *was a photo op.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: R, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      racket(x, 510, 760, 12 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.3 + 0.2 * Math.sin(lt * 3) })
      const n = 1 + Math.floor(lt / 0.5)
      if (Math.floor(lt / 0.5) !== Math.floor((lt - 0.06) / 0.5)) { x.save(); x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 900, `POSE #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 46)
      L(x, 790, 1080, 'BALL: IGNORED', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 30)
      sparkles(x, t, 400, 860, P.t0 + 0.9, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Called it out. | *Brought a ruler.*', mood: 'squint', look: [1, 1], star: R,
    front(x, t, lt, P) {
      x.save(); x.fillStyle = BONE; x.fillRect(620, 1060, 340, 14); x.restore()
      ball(x, 790, 1030, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const r = ease.outCubic(prog(lt, 0.6, 1.1))
      if (r > 0) { x.save(); x.globalAlpha = r; x.fillStyle = INK; x.fillRect(640, 960, 300, 44); x.fillStyle = '#ffd23a'; x.fillRect(646, 966, 288, 32); x.fillStyle = INK; for (let i = 0; i < 12; i++) x.fillRect(656 + i * 24, 966, 4, i % 2 ? 12 : 20); x.restore() }
      L(x, 790, 760, 'OUT BY 0.2 MM', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 40)
    } },
  { sign: 'libra', cap: 'Wanted the score | *to stay love-love.*', mood: 'heart', look: [1, 0], star: R,
    front(x, t, lt, P) {
      L(x, 790, 820, 'LOVE – LOVE', pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 50)
      bubble(x, 790, 1040, 'can we all | just win?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 0.8, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'Studied your chart | *before the serve.*', mood: 'squint', look: [1, 0], star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      ball(x, 790, 820, 9 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1080, 'WEAKNESS: BACKHAND', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#c97bff', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Hit it so hard | *it left the city.*', mood: 'sparkle', look: [-1, -1], star: { x: 170 }, hops: [0.5],
    front(x, t, lt, P) {
      racket(x, 840, 900, 12 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 0.6 })
      const f = prog(lt, 0.4, 1.3)
      if (f > 0 && f < 1) ball(x, lerp(780, 200, f), lerp(820, 500, f), lerp(12, 2, f))
      L(x, 330, 760, 'BALL: SOMEWHERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 330, 1100, 'NEW BALL: PLEASE', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Brought business cards | *to doubles.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, CARD, { W: CREAM, K: INK, L: STEEL }, 700 + i * 60, 820 + (i % 2) * 40, 14 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: -0.2 + i * 0.15 })
      bubble(x, 790, 1060, 'let’s circle | back on that lob', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 650, 'NETWORKING: ON', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Invented new rules. | *Three balls now.*', mood: 'sparkle', look: [1, -1], star: R, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const ph = (lt * 1.2 + i / 3) % 1; ball(x, 700 + i * 90, 900 - Math.abs(Math.sin(Math.PI * ph)) * 180, 11 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)) }
      L(x, 790, 660, 'RULE 1: VIBES', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, -0.04, 34)
      L(x, 790, 1120, 'RULE 2: SEE RULE 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Won one point. | *Wept at the net.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -150 },
    back(x, t, lt, P) { drawBits(x, NET, NET_C, 780, 980, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 620, 'SCORE: 15–40', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.04, 36)
      bubble(x, 800, 770, 'i’m just | so proud', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: '#b7a6ff', tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0612', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *playing tennis.*',
  cameos: CAMEOS,
  group: { cap: 'Final score? | *Nobody knows.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
