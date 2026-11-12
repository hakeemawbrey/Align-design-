// r2t0013: THE SIGNS AS… v3 ROLL CALL, "The signs get | new glasses." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each wearing its new glasses, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "The signs get | *new glasses.*"
//   3.6–49.2   ♈ picked the first pair, four seconds · ♉ same frames since 2009, ordered them again · ♊ two pairs, one per
//              personality · ♋ the old pair goes in a memory box · ♌ gold frames, rhinestones · ♍ read the eye chart,
//              fixed the font · ♎ matched the frames to their match · ♏ dark lenses, indoors, at night · ♐ lost them on
//              day one, abroad · ♑ expensed them · ♒ built in a telescope · ♓ saw the stars clearly, sobbed
//  49.2        "Twelve signs. | *Seeing clearly.*"
//  52.6        CALLBACK: "Aquarius found | *a new planet.*"  Aquarius in the telescope glasses, and a new planet.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#4fd1c5'

/** glasses on the star's face (sprite cells: eyes at about x 10.5 / 25.5, y 18) */
function specs(x, F, k, { frame = INK, lens = 'rgba(143,227,255,0.28)', shape = 'round', r = 5.6, dy = 0, tube = 0 } = {}) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    x.save(); x.translate(18, 18 + dy); x.scale(k, k); x.translate(-18, -18)
    const one = cx => {
      x.beginPath()
      if (shape === 'square') x.rect(cx - r, 18 - r * 0.8, r * 2, r * 1.6)
      else if (shape === 'star') { for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.55 : r * 1.25, a = i / 10 * Math.PI * 2 - Math.PI / 2; x.lineTo(cx + Math.cos(a) * rr, 18 + Math.sin(a) * rr) } x.closePath() }
      else x.arc(cx, 18, r, 0, Math.PI * 2)
      x.fillStyle = lens; x.fill(); x.lineWidth = 2.6; x.strokeStyle = INK; x.stroke(); x.lineWidth = 1.5; x.strokeStyle = frame; x.stroke()
    }
    one(10.5); one(25.5)
    x.fillStyle = INK; x.fillRect(15.5, 16.6, 5, 2.2); x.fillStyle = frame; x.fillRect(15.8, 17.1, 4.4, 1.2)
    if (tube) { x.fillStyle = INK; x.fillRect(26 - 3.4, 18 - 3.4, 6.8 + 9 * tube, 6.8); x.fillStyle = GOLD; x.fillRect(26 - 2.6, 18 - 2.6, 5.2 + 9 * tube, 5.2); x.fillStyle = SKYB; x.fillRect(26 + 9 * tube, 18 - 2.6, 2, 5.2) }
    x.restore()
  })
}
/** a free-standing pair of glasses as a prop */
function pair(x, cx, cy, s, k, { frame = INK, lens = 'rgba(143,227,255,0.28)', rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  for (const ox of [-30, 30]) { x.beginPath(); x.arc(ox, 0, 24, 0, Math.PI * 2); x.fillStyle = lens; x.fill(); x.lineWidth = 11; x.strokeStyle = INK; x.stroke(); x.lineWidth = 6; x.strokeStyle = frame; x.stroke() }
  x.fillStyle = INK; x.fillRect(-8, -6, 16, 10); x.fillStyle = frame; x.fillRect(-6, -3, 12, 5)
  x.restore()
}
function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function eyeChart(x, cx, cy, k, fixed) {
  if (k <= 0.01) return
  card(x, cx, cy, 260, 360, BONE, k)
  x.save(); x.translate(cx, cy); x.scale(k, k); x.textAlign = 'center'; x.textBaseline = 'middle'
  const rows = [['E', 90], ['F P', 54], ['T O Z', 38], ['L P E D', 28], ['P E C F D', 20]]
  rows.forEach(([s, z], i) => { x.font = `${fixed ? 800 : 400} ${z}px ${fixed ? INTER : 'serif'}`; x.fillStyle = INK; x.fillText(s, 0, -120 + i * 58 + (i ? 20 : 0)) })
  x.restore()
}
function planet(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ffb3cc'; x.fillRect(-40, -30, 50, 12); x.fillRect(-20, 10, 60, 12)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.ellipse(0, 0, 120, 30, -0.3, 0.15 * Math.PI, 0.85 * Math.PI + Math.PI); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 9; x.beginPath(); x.ellipse(0, 0, 120, 30, -0.3, 0.15 * Math.PI, 0.85 * Math.PI + Math.PI); x.stroke()
  x.restore()
}

const st = { x: -200 }
const CAMEOS = [
  { sign: 'aries', cap: 'Picked the first pair. | In *four seconds.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.5],
    front(x, t, lt, P, F) {
      specs(x, F, pop01(t, P.t0 + 0.4, 0.25, 2.4), { frame: RED, shape: 'square' })
      label(x, 790, 760, '0:04', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 80, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 920, 'DONE. NEXT.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Same frames since 2009. | *Ordered them again.*', mood: 'happy', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: '#8a4a2e' })
      pair(x, 790, 780, 2.2, pop01(t, P.t0 + 0.3, 0.3, 2), { frame: '#8a4a2e', rot: -0.06 })
      label(x, 790, 940, 'ORDER #7: SAME', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Bought two pairs. | *One per personality.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, pop01(t, P.t0 + 0.3, 0.25, 2), { frame: PINK, shape: 'round' })
      specs(x, F, pop01(t, P.t0 + 0.9, 0.25, 2), { frame: SKYB, shape: 'square', dy: -11 })
      label(x, 790, 760, 'MONDAY ME', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: PINK, font: MONO, weight: 700 })
      label(x, 790, 900, 'ALSO ME', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Kept the old pair | in *a memory box.*', mood: 'heart', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: LAV })
      card(x, 790, 900, 300, 180, '#c98f5a', pop01(t, P.t0 + 0.2, 0.3, 2))
      pair(x, 790, 880, 1.3, pop01(t, P.t0 + 0.6, 0.3, 2), { frame: BONE })
      label(x, 790, 740, 'MEMORIES', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: BONE, font: MONO, weight: 700 })
      hearts(x, t, 620, 1080, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Gold frames. | *Rhinestones.* Obviously.', mood: 'sparkle', look: [1, 0], star: st, hops: [1.2],
    front(x, t, lt, P, F) {
      specs(x, F, pop01(t, P.t0 + 0.3, 0.3, 2.4), { frame: GOLD, shape: 'star', lens: 'rgba(255,210,90,0.35)' })
      for (let i = 0; i < 3; i++) sparkles(x, t, F.x + (i - 1) * 80, F.cy - 40, P.t0 + 0.7 + i * 0.35, 5, 60, i)
      label(x, 800, 860, 'ICONIC', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 60, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Read the eye chart. | *Fixed the font.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: MINT, shape: 'square' })
      eyeChart(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2)
      label(x, 800, 1100, 'MUCH BETTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matched the frames | to *their match.*', mood: 'heart', look: [1, 0], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      specs(x, F, pop01(t, P.t0 + 0.9, 0.25, 2.4), { frame: PINK })
      card(x, 800, 860, 260, 340, BONE, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04)
      const k = pop01(t, P.t0 + 0.35, 0.3, 2)
      if (k > 0.01) { const G = signChar(x, t, 'aquarius', 800, 840, 150 * k, { mood: 'happy', seed: 30, glyph: false }); specs(x, G, 1, { frame: PINK }) }
      label(x, 800, 1010, 'MATCHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Dark lenses. | Indoors. *At night.*', mood: 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, pop01(t, P.t0 + 0.3, 0.25, 2), { frame: '#2a2350', lens: '#140c30', shape: 'square', r: 6 })
      bubble(x, 800, 700, 'it’s a vibe.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 800, 920, 'MYSTERY: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Lost them on day one. | *In another country.*', mood: 'happy', look: [1, 0], star: st, hops: [0.8],
    front(x, t, lt, P, F) {
      const fly = ease.inOutCubic(prog(lt, 0.5, 1.4))
      if (fly < 1) specs(x, F, 1 - fly, { frame: '#ff9a4a' })
      pair(x, lerp(F.x, 880, fly), lerp(F.cy, 640, fly), 1.2, fly > 0 ? 1 : 0, { frame: '#ff9a4a', rot: fly * 5 })
      label(x, 790, 960, 'LAST SEEN: ABROAD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'New glasses? | *Expensed them.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: INK, shape: 'square' })
      card(x, 800, 860, 220, 320, BONE, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.5) { x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(720, 740 + i * 34, 150 - (i % 3) * 30, 10) }
      label(x, 800, 960, '✓ EXPENSED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 40, bg: MINT, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Upgraded them. | *Built-in telescope.*', mood: 'sparkle', look: [1, 0], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: TEAL, tube: ease.outBack ? ease.outCubic(prog(lt, 0.4, 1.0)) : prog(lt, 0.4, 1.0) })
      label(x, 790, 960, 'ZOOM: 400×', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: TEAL, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw the stars clearly. | *Sobbed.*', mood: 'wide', tears: 3, look: [0, -1], star: st,
    front(x, t, lt, P, F) {
      specs(x, F, 1, { frame: LAV })
      for (let i = 0; i < 5; i++) sparkles(x, t, 700 + (i % 3) * 110, 680 + Math.floor(i / 3) * 140, P.t0 + 0.4 + i * 0.25, 5, 60, i)
      label(x, 800, 960, 'TOO BEAUTIFUL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0013', key: 'G', accent: SKYB, ending: 'callback',
  title: 'The signs get | *new glasses.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Seeing clearly.*' },
  last: {
    text: 'Aquarius found | *a new planet.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) { const G = signChar(x, t, 'aquarius', 360, 1100, 250 * k, { mood: 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] }); specs(x, G, 1, { frame: TEAL, tube: 1 }) }
      planet(x, 760, 960, pop01(t, t - lt + 1.0, 0.4, 2), t)
      sparkles(x, t, 760, 960, t - lt + 1.2, 8, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
