// r2t0418: star_talk, BELIKE, "Copied their order? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme reaction when someone orders the exact same thing. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ re-ordered it louder, theirs first · ♉ fine, but a fence round the plate · ♊ swapped bowls, swapped back
//              · ♋ fed you theirs anyway · ♌ offered to sign your menu · ♍ checked you ordered it correctly
//              · ♎ relieved, one less decision · ♏ now suspects you're a spy · ♐ "let's share everything"
//              · ♑ asked about a bulk discount · ♒ cancelled theirs, ordered off-menu · ♓ same order? soulmates (tears)
//  49.2        "One dish. | *Twelve opinions.*"  TABLE FOR 12 over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#ff9f6b'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

/** a noodle bowl: ink rim, coloured bowl, a heap of noodles and a little garnish */
function bowl(x, cx, cy, k, { col = '#ff8f6b', rot = 0, eaten = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = '#ffe7a8'; for (let i = 0; i < 7 * (1 - eaten); i++) { x.fillRect(-70 + i * 20, -46 - (i % 2) * 10, 14, 50) }
  x.fillStyle = MINT; if (eaten < 0.6) { x.fillRect(-20, -62, 18, 14); x.fillRect(16, -56, 18, 14) }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -14); x.lineTo(110, -14); x.lineTo(76, 70); x.lineTo(-76, 70); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-100, -6); x.lineTo(100, -6); x.lineTo(70, 62); x.lineTo(-70, 62); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-90, 6, 180, 10)
  x.restore()
}
/** a menu card */
function menu(x, cx, cy, k, sig) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -180, 260, 360); x.fillStyle = CREAM; x.fillRect(-122, -172, 244, 344)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -130)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-90, -76 + i * 36, i % 2 ? 140 : 180, 10)
  if (sig > 0) { x.strokeStyle = ORANGE; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); const n = Math.floor(sig * 30); for (let i = 0; i <= n; i++) { const px = -90 + i * 6, py = 120 + Math.sin(i * 0.9) * 18; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
/** a till receipt with tick marks */
function receipt(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380); x.fillStyle = '#ffffff'; x.fillRect(-112, -182, 224, 364)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const ROWS = ['NOODLES', 'NO ONION', 'SAUCE: SIDE', 'EXTRA LIME']
  ROWS.forEach((r, i) => { const y = -120 + i * 70; x.fillText(r, -92, y); if (lt > 0.6 + i * 0.3) { x.fillStyle = '#2f9a4a'; x.fillRect(66, y - 4, 8, 12); x.fillRect(74, y - 12, 8, 20); x.fillStyle = INK } })
  x.fillStyle = '#ffffff'; for (let i = 0; i < 10; i++) { x.beginPath(); x.moveTo(-112 + i * 22.4, 182); x.lineTo(-101 + i * 22.4, 196); x.lineTo(-89.6 + i * 22.4, 182); x.fill() }
  x.restore()
}
const FENCE = ['K.K.K.K.K.K.K', 'KKKKKKKKKKKKK', 'K.K.K.K.K.K.K', 'KKKKKKKKKKKKK', 'K.K.K.K.K.K.K']
const MAGNIFY = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKBB..', '......BBB.', '.......BBB']

const CAMEOS = [
  { sign: 'aries', cap: 'Re-ordered it *louder.* | Theirs first.', mood: 'sparkle', star: ST, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'SAME, BUT | MINE FIRST', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 40, col: '#ff9e9e', tail: 'bl' })
      bowl(x, 790, 960, pop01(t, P.t0 + 0.9, 0.3, 2), { col: RED })
      L(x, 790, 1130, 'SERVED: 1ST', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Fine. But | *don’t touch mine.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bowl(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#f2c75c' })
      drawBits(x, FENCE, { K: WOOD }, 790, 990, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 790, 1120, 'FORK ZONE: PRIVATE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Swapped bowls. | *Swapped back.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sw = Math.sin(Math.PI * clamp((lt - 0.4) / 1.6) * 2)
      bowl(x, 790 - 110 * sw, 900 + 40 * Math.abs(sw), pop01(t, P.t0 + 0.2, 0.3, 2) * 0.8, { col: '#ffd23a' })
      bowl(x, 790 + 110 * sw, 1040 - 40 * Math.abs(sw), pop01(t, P.t0 + 0.3, 0.3, 2) * 0.8, { col: SKYB })
      L(x, 790, 660, 'SWAP #6', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 38)
    } },
  { sign: 'cancer', cap: 'Fed you theirs | *anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 960, 170 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 12, glyph: false })
      bubble(x, 760, 660, 'try mine too!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 1130, 'PORTIONS: DOUBLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
      hearts(x, t, 620, 880, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Offered to *sign* | your menu.', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      menu(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.6) / 0.9))
      L(x, 790, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.4), ORANGE, 0.04, 32)
      sparkles(x, t, 790, 980, P.t0 + 1.5, 7, 160, 0.3)
    } },
  { sign: 'virgo', cap: 'Checked you ordered | it *correctly.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      receipt(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      drawBits(x, MAGNIFY, { K: INK, S: 'rgba(143,227,255,0.45)', W: '#fff', B: WOOD }, 660, 1000, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Relieved. | *One less decision.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'oh thank | goodness', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      L(x, 790, 960, 'DECIDING: DONE', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 38)
      sparkles(x, t, 790, 960, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'scorpio', cap: 'Now suspects | you’re *a spy.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'who sent you?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 930, 'TRUST: PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 36)
      bowl(x, 790, 1100, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.7, { col: '#b44ad6' })
    } },
  { sign: 'sagittarius', cap: 'Great. Now we | *share everything.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const COLS = [ORANGE, MINT, PINK, SKYB, GOLD]
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 5)
      for (let i = 0; i < n; i++) bowl(x, 660 + (i % 3) * 130, 1060 - Math.floor(i / 3) * 140, 0.6, { col: COLS[i] })
      L(x, 790, 660, 'TAPAS MODE', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.05, 40)
    } },
  { sign: 'capricorn', cap: 'Asked about a | *bulk discount.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bowl(x, 720, 960, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.75, { col: MINT })
      bowl(x, 870, 960, pop01(t, P.t0 + 0.3, 0.3, 2) * 0.75, { col: MINT })
      bubble(x, 790, 680, 'two for one?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1130, 'NEGOTIATING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Cancelled theirs. | Went *off-menu.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bowl(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.7, 1.0))), { col: SKYB })
      L(x, 790, 900, 'THE ??? SPECIAL', pop01(t, P.t0 + 1.1, 0.3, 2.6), '#8fe3ff', -0.04, 38)
      bubble(x, 790, 680, 'never basic', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Same order? | We’re *soulmates.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bowl(x, 720, 1000, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.7, { col: PINK })
      bowl(x, 870, 1000, pop01(t, P.t0 + 0.35, 0.3, 2) * 0.7, { col: PINK })
      L(x, 790, 720, 'MEANT TO BE', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, 0.04, 36)
      hearts(x, t, 790, 900, P.t0 + 1.1, { n: 7, life: 2.0, spread: 260, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0418', key: 'G', accent: ACC, ending: 'group',
  title: 'Copied their order? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One dish. | *Twelve opinions.*',
    draw(x, t, lt) { L(x, 540, 740, 'TABLE FOR 12', pop01(t, t - lt + 1.3, 0.35, 2.4), GOLD, -0.03, 46) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
