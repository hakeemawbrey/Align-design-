// r2t0203: star_talk, BE LIKE roll call, "Show cancelled? | Zodiacs *be like.*" (~59 s, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order, each the most extreme reaction to their favourite show being cancelled. Ending: lesson.
//   0.0–3.6    "Show cancelled? | Zodiacs *be like.*"
//   3.6–49.2   ♈ wrote the finale themselves, tonight · ♉ back to season one, ninth rewatch · ♊ six new shows before the
//              credits ended · ♋ lit a candle for the characters · ♌ pitched themself as the new lead · ♍ a 34-page appeal
//              · ♎ two hours choosing a new show · ♏ called it three seasons ago · ♐ visiting the filming spot for closure
//              · ♑ counted the hours, regrets nothing · ♒ the fan theory that saves it (a string board) · ♓ still crying
//              over a finale from years ago
//  49.2        "Shows end. | *Fandoms don't.*"
//  52.4        LESSON: "Love what you love, | *loudly.*"  STATUS: RENEWED
//  58.3        "Season two: | *in our hearts.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', ORANGE = '#ffb34a', CORK = '#c98f5a'

function card(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
// a little TV with a line of text on its screen
function tv(x, cx, cy, k, text, { col = '#3d8fd8' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -170, 8, 50); x.fillRect(52, -170, 8, 50)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = '#4a3d7a'; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = col; x.fillRect(-140, -100, 280, 190)
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -5 + (i - (a.length - 1) / 2) * 40))
  x.fillStyle = INK; x.fillRect(-80, 120, 160, 18)
  x.restore()
}
const CANDLE = ['..F..', '.FYF.', '.FYF.', '..K..', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'KKKKK']
const SUITCASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KPPPPPPPPK', 'KPYPPPPYPK', 'KPPPPPPPPK', 'KPYPPPPYPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const TISSUE = ['...WW...', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBWWWWBK', 'KBBBBBBK', 'KKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Wrote the *finale* | themselves. Tonight.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['EXT. SPACE', 'everyone wins.', 'THE END.'], { head: 'FINALE', headBg: RED, w: 320, rot: -0.04 })
      label(x, 790, 1120, 'WRITTEN IN 1 HR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Back to season one. | *Ninth rewatch.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'S1 E1 | (again)')
      label(x, 790, 1100, `REWATCH #${1 + Math.floor(clamp((lt - 0.4) / 1.2) * 8)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '*Six new shows* | before the credits.', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const shows = ['COOKING', 'SPACE COPS', 'DRAGONS', 'BAKE-OFF', 'MYSTERY', 'DOCS']
      shows.forEach((s, i) => label(x, 720 + (i % 2) * 150, 680 + Math.floor(i / 2) * 150, s, pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2), { size: 26, bg: [SKYB, PINK, MINT, GOLD, LAV, BONE][i], rot: (i % 2 ? 0.06 : -0.06), font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Lit a candle | for *the characters.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, { F: '#ff9a3a', Y: '#ffe08a', K: INK, W: BONE }, 690 + i * 100, 950 + (i === 1 ? -30 : 0), 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      label(x, 790, 700, 'GONE TOO SOON', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Pitched themself | as *the new lead.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      tv(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'THE LEO | SHOW', { col: ORANGE })
      label(x, 790, 1100, 'STARRING: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 1.2 * 1.29, 7, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Sent the network | a *34-page appeal.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 4; i >= 0; i--) { const k = pop01(t, P.t0 + 0.2 + (4 - i) * 0.12, 0.3, 2); if (k > 0.01) { x.save(); x.translate(790 + i * 14, 850 - i * 14); x.scale(k, k); x.fillStyle = INK; x.fillRect(-136, -176, 272, 352); x.fillStyle = BONE; x.fillRect(-130, -170, 260, 340); x.restore() } }
      x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      if (lt > 0.8) { x.fillText('APPEAL', 790, 760); x.font = `700 26px ${MONO}`; x.fillText('page 1 of 34', 790, 820); x.fillText('see appendix C', 790, 870) }
      label(x, 790, 1100, 'FOOTNOTES: 112', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Choosing a new show. | *Two hours in.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['this one?', 'or this?', 'this one?'][Math.floor(lt * 2) % 3])
      label(x, 790, 1100, `SCROLLING: ${Math.floor(lt * 50)} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Called it | *three seasons ago.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['"they\'ll cancel', ' it." – me,', ' season 1'], { head: 'RECEIPT', headBg: '#ff6b8a', w: 300, rot: 0.05 })
      bubble(x, 790, 1100, 'told you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Visiting *the filming spot* | for closure.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, P: '#c58bff', Y: GOLD }, 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 700, 'PILGRIMAGE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'they sat HERE', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Counted the hours. | *Regrets nothing.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const h = Math.floor(clamp((lt - 0.3) / 1.2) * 312)
      label(x, 790, 820, `${h} HRS`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 72, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 1040, 'WORTH IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The *fan theory* | that saves it.', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -176, 352, 352); x.fillStyle = CORK; x.fillRect(-168, -168, 336, 336)
        const pts = [[-110, -110], [100, -90], [-80, 90], [110, 110], [0, 0]]
        x.strokeStyle = RED; x.lineWidth = 5; const n = Math.floor(clamp((lt - 0.5) / 1.2) * 5)
        x.beginPath(); for (let i = 0; i < n; i++) { const [a, b] = pts[i], [c, d] = pts[(i + 2) % 5]; x.moveTo(a, b); x.lineTo(c, d) } x.stroke()
        pts.forEach(([a, b], i) => { x.fillStyle = [BONE, SKYB, PINK, GOLD, MINT][i]; x.fillRect(a - 40, b - 30, 80, 60) })
        x.restore()
      }
      label(x, 790, 1120, 'IT WAS A DREAM', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Still crying over | *a finale from years ago.*', mood: 'neutral', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { K: INK, B: LAV, W: "#fff" }, 800, 980, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'TISSUES: 2 LEFT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0203', key: 'G', accent: SKYB, ending: 'lesson',
  title: 'Show cancelled? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Shows end. | *Fandoms don\'t.*' },
  lesson: { text: 'Love what you love, | *loudly.*', chip: 'STATUS: RENEWED' },
  last: { text: 'Season two: | *in our hearts.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
