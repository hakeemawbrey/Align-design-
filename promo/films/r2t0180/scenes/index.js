// r2t0180: THE SIGNS AS… v3, ROLLCALL, "The signs doing | a puzzle." (~62 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "The signs doing | *a puzzle.*"
//   3.6–49.2   ♈ forced a piece in, it fits now · ♉ a snack after every piece · ♊ started four puzzles, finished none
//              · ♋ framed it for the hallway · ♌ only did the sun · ♍ sorted by edge, colour and mood · ♎ two pieces fit,
//              can't choose · ♏ has had the last piece since Tuesday · ♐ threw away the box picture · ♑ five thousand pieces,
//              done by Sunday · ♒ did it face down · ♓ cried at the kitten on the box
//  49.2        "Last piece? | *Missing.*"
//  52.4        LESSON: "Some pieces take time. | *So do people.*"  STATUS: COMPLETE
//  58.3        "Scorpio. | *Give it back.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#2fc79a'

/** one jigsaw piece (square with two knobs), size s, colour c */
function piece(x, cx, cy, s, c, { rot = 0, k = 1, face = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = s / 2, r = s * 0.17
  const path = () => { x.beginPath(); x.rect(-h, -h, s, s); x.moveTo(h + r, 0); x.arc(h, 0, r, 0, Math.PI * 2); x.moveTo(r, -h); x.arc(0, -h, r, 0, Math.PI * 2) }
  x.fillStyle = INK; x.save(); x.scale(1.08, 1.08); path(); x.fill(); x.restore()
  x.fillStyle = c; path(); x.fill()
  if (face) { x.fillStyle = INK; x.font = `800 ${s * 0.4}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(face, 0, 4) }
  x.restore()
}
function box(x, cx, cy, k, { w = 300, h = 200, col = SKYB, rot = 0.05, pic = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (pic) pic(x)
  x.restore()
}
const KITTEN = ['O.....O', 'OO...OO', 'OOOOOOO', 'OKOOOKO', 'OOOPOOO', 'OOOOOOO', '.OOOOO.']
const CHIPS = ['.RRRRRR.', 'RRYYYYRR', 'RYYYYYYR', 'RRYYYYRR', 'RRRRRRRR', 'RRRRRRRR']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Forced a piece in. | *It fits now.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.8, 1.1],
    front(x, t, lt, P) {
      const sq = lt > 1.0 && lt < 1.3 ? 0.85 : 1
      piece(x, 700, 900, 120, MINT, { k: pop01(t, P.t0 + 0.2, 0.3, 2) })
      piece(x, 860, 900, 120 * sq, RED, { k: pop01(t, P.t0 + 0.4, 0.3, 2), rot: lt > 1.0 ? 0 : 0.5 })
      bubble(x, 790, 680, 'IN. YOU. GO.', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 44, col: GOLD, tail: 'bl' })
      label(x, 790, 1110, 'FITS (NOW)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A snack break | *after every piece.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      piece(x, 720, 880, 110, GOLD, { k: pop01(t, P.t0 + 0.2, 0.3, 2), rot: -0.1 })
      drawBits(x, CHIPS, { R: '#ff6b5a', Y: '#ffd23a' }, 870, 900, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 23)
      label(x, 790, 1110, `SNACK #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started four puzzles. | *Finished none.*', mood: 'sparkle', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const cols = [PINK, SKYB, MINT, LAV]
      cols.forEach((c, i) => box(x, 710 + (i % 2) * 170, 800 + Math.floor(i / 2) * 170, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { w: 150, h: 120, col: c, rot: (i % 2 ? 0.08 : -0.08) }))
      label(x, 790, 1120, 'PROGRESS: VIBES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Finished it. | *Framed it for the hall.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, col: '#c98f2a', rot: 0.04, pic: x => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-130, -100, 260, 200)
        x.strokeStyle = 'rgba(27,18,54,0.35)'; x.lineWidth = 3; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(-130 + i * 65, -100); x.lineTo(-130 + i * 65, 100); x.stroke() } for (let j = 1; j < 3; j++) { x.beginPath(); x.moveTo(-130, -100 + j * 66); x.lineTo(130, -100 + j * 66); x.stroke() }
        x.fillStyle = '#5fd068'; x.fillRect(-130, 40, 260, 60); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(70, -50, 26, 0, 7); x.fill()
      } })
      label(x, 790, 1110, 'FAMILY HEIRLOOM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Only did | *the sun.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = ORANGE; x.beginPath(); x.arc(800, 840, 130, 0, 7); x.fill(); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(800, 840, 96, 0, 7); x.fill(); x.restore() }
      for (let i = 0; i < 4; i++) piece(x, 700 + i * 70, 1010, 60, '#9aa5c4', { k: pop01(t, P.t0 + 0.6 + i * 0.1, 0.3, 2), rot: i * 0.4 })
      label(x, 790, 1130, 'THE IMPORTANT PART', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted by edge, | colour *and mood.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const G = [['EDGE', BONE], ['BLUE', SKYB], ['SAD', LAV]]
      G.forEach(([n, c], i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2)
        for (let j = 0; j < 3; j++) piece(x, 670 + i * 120, 960 - j * 50, 54, c, { k, rot: j * 0.3 })
        label(x, 670 + i * 120, 1080, n, k, { size: 34, bg: c, rot: 0, font: MONO, weight: 700 })
      })
    } },
  { sign: 'libra', cap: 'Two pieces fit. | *Can’t choose.*', mood: 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      piece(x, 700, 870, 120, PINK, { k: pop01(t, P.t0 + 0.2, 0.3, 2), rot: -0.1 + 0.08 * Math.sin(t * 4) })
      piece(x, 880, 870, 120, SKYB, { k: pop01(t, P.t0 + 0.4, 0.3, 2), rot: 0.1 - 0.08 * Math.sin(t * 4) })
      label(x, 790, 1080, 'BOTH COMPATIBLE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Has the last piece. | *Since Tuesday.*', mood: 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      piece(x, F.x + 120, F.cy + 70, 70, '#c97bff', { k: pop01(t, P.t0 + 0.9, 0.3, 2), rot: 0.3 })
      bubble(x, 800, 700, 'where could | it be?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1080, 'DAY 3 OF SEARCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Threw out | *the box picture.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      const f = ease.inCubic(prog(lt, 0.8, 1.4))
      box(x, lerp(790, 960, f), lerp(840, 700, f), pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - f), { w: 260, h: 180, col: '#ff9a4a', rot: 0.05 + f * 2 })
      bubble(x, 790, 1060, 'more fun this way!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Five thousand pieces. | *Done by Sunday.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 5000)
      for (let i = 0; i < 9; i++) piece(x, 690 + (i % 3) * 100, 780 + Math.floor(i / 3) * 100, 80, i * 556 < n ? TEAL : 'rgba(154,165,196,0.35)', { k: pop01(t, P.t0 + 0.2, 0.3, 2) })
      label(x, 790, 1130, `${n} / 5000`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Did it | *face down.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) piece(x, 700 + (i % 3) * 95, 830 + Math.floor(i / 3) * 110, 80, '#c8c0b0', { k: pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), rot: i * 0.2 })
      label(x, 790, 1110, 'HARD MODE: ON', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#6fc3ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the kitten | *on the box.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      box(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, col: LAV, rot: -0.04, pic: x => drawBits(x, KITTEN, { O: '#ff9a4a', K: INK, P: PINK }, 0, 0, 22) })
      label(x, 800, 1100, 'TOO PRECIOUS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0180', key: 'F', accent: TEAL, ending: 'lesson',
  title: 'The signs doing | *a puzzle.*',
  cameos: CAMEOS,
  group: { cap: 'Last piece? | *Missing.*' },
  lesson: { text: 'Some pieces take time. | *So do people.*', chip: 'STATUS: COMPLETE' },
  last: { text: 'Scorpio. | *Give it back.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
