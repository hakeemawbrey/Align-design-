// v3t097: THE SIGNS AS… v3, "Zodiac group pics | be like." (~54 s vertical, signs3kit social cut, lofi · D)
// Twelve signs in one group photo, each the most extreme version of themself. Ending: 'group'.
//   0.0–3.6    "Zodiac group pics | *be like.*"
//   3.6–49.2   ♈ pressed the timer, didn't make it back · ♉ the same pose since 2009 · ♊ a different face in every shot
//              · ♋ made everyone hold hands · ♌ stood in front of everyone · ♍ fixed everyone's collar, missed the photo
//              · ♎ checked every angle, picked the first one · ♏ didn't smile, still looked the best
//              · ♐ photobombed a stranger's photo · ♑ lined everyone up by sign · ♒ faced the wrong way (artistic)
//              · ♓ happy tears in every single one
//  49.2        group (the ending): "Perfect photo. | *Nobody’s looking.*"  TAKE 47
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SIGN_IDS,
} from '../../signs3kit.js'

const CAMERA = [
  '...KKK.......',
  'KKKKKKKKKKKKK',
  'KGGGGGGGGGGRK',
  'KGGGWWWWGGGGK',
  'KGGWSSSSWGGGK',
  'KGGWSKKSWGGGK',
  'KGGWSSSSWGGGK',
  'KGGGWWWWGGGGK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#9aa5c4', R: '#e23d4e', W: '#e9f3ff', S: SKYB }

/** a little photo print: frame + pastel sky + whatever inner() draws */
function photo(x, cx, cy, w, h, k, { rot = 0, inner = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#6fc3ff'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 60)
  x.restore()
  if (inner) inner()
}
// a self-timer readout
function timer(x, cx, cy, k, lt) {
  const n = Math.max(0, 3 - Math.floor(lt / 0.5))
  label(x, cx, cy, n > 0 ? `TIMER: ${n}…` : 'CLICK!', k, { size: 40, bg: n > 0 ? GOLD : '#ff6b5a', rot: -0.04 })
}
const mini = (x, t, id, cx, cy, s, o = {}) => signChar(x, t, id, cx, cy, s, { glyph: false, seed: cx % 17, ...o })

const CAMEOS = [
  { sign: 'aries', cap: 'Set the timer. | *Didn’t make it back.*', mood: 'wide', star: { s: 260 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 300, 700, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      timer(x, 780, 660, pop01(t, P.t0 + 0.3, 0.3, 2), lt)
      label(x, 780, 1080, 'IN PHOTO: A BLUR', pop01(t, P.t0 + 1.7, 0.3, 2), { size: 28, bg: PINK, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Same pose | *since 2009.*', mood: 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) photo(x, 700 + i * 90, 820 + i * 50, 200, 220, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { rot: (i - 1) * 0.12, inner: () => mini(x, t, 'taurus', 700 + i * 90, 800 + i * 50, 110 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2)) })
      label(x, 790, 640, '2009 · 2016 · TODAY', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'A different face | in *every shot.*', mood: lt => ['wink', 'wide', 'sparkle', 'squint', 'heart'][Math.floor(lt * 2.5) % 5], star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 680, `TAKE ${1 + Math.floor(lt * 2.5)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05 })
      label(x, 790, 900, 'NO TWO ALIKE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: LAV, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Made everyone | *hold hands.*', mood: 'heart', star: { x: -40, s: 240 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) for (const [id, dx] of [['leo', -210], ['virgo', 210], ['aries', -360], ['libra', 360]]) mini(x, t, id, 540 + dx, 940, 150 * k, { mood: 'happy' })
      label(x, 540, 640, 'SAY “FAMILY”!', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: PINK, rot: -0.03 })
      hearts(x, t, 540, 860, P.t0 + 1.3, { n: 5, life: 1.8, spread: 300, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Found the light. | Stood *in front of everyone.*', mood: 'sparkle', star: { y: 40, s: 320 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) for (const [id, dx] of [['taurus', -280], ['gemini', -130], ['virgo', 130], ['libra', 280]]) mini(x, t, id, 540 + dx, 760, 120 * k, { mood: 'squint', alpha: 0.85 })
    },
    front(x, t, lt, P) { label(x, 540, 1130, 'EVERYONE ELSE: BEHIND', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: '#ffb34a', rot: -0.03 }); sparkles(x, t, 540, 900, P.t0 + 0.6, 6, 200, 0.3) } },
  { sign: 'virgo', cap: 'Fixed everyone’s collar. | *Missed the photo.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', star: { x: -160 },
    front(x, t, lt, P) {
      timer(x, 790, 660, pop01(t, P.t0 + 0.3, 0.3, 2), lt * 1.2)
      label(x, 790, 860, 'COLLARS FIXED: 11', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 30, bg: MINT, rot: 0.05 })
      label(x, 790, 1020, 'VIRGO: NOT IN IT', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: PINK, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Checked every angle. | Picked *the first one.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) photo(x, 700 + (i % 2) * 180, 760 + Math.floor(i / 2) * 230, 160, 190, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: (i % 2 ? 0.06 : -0.05) })
      label(x, 700, 760, '#1 ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.06 })
    } },
  { sign: 'scorpio', cap: 'Didn’t smile. | Still *looked the best.*', mood: 'neutral', star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'SMILE? NO.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: LAV, rot: -0.05 })
      label(x, 790, 900, 'BEST IN SHOT', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 380, 880, P.t0 + 1.2, 6, 170, 0.4)
    } },
  { sign: 'sagittarius', cap: 'Photobombed | *a stranger’s* photo.', mood: lt => lt > 0.8 ? 'wink' : 'sparkle', star: { x: 170, y: -60, s: 240 }, hops: [0.7],
    back(x, t, lt, P) {
      photo(x, 540, 900, 560, 460, pop01(t, P.t0 + 0.2, 0.3, 2), { inner: () => { const k = pop01(t, P.t0 + 0.2, 0.3, 2); mini(x, t, 'capricorn', 380, 960, 180 * k, { mood: 'happy' }); mini(x, t, 'cancer', 540, 980, 170 * k, { mood: 'happy' }) } })
    },
    front(x, t, lt, P) { label(x, 540, 1170, 'WHO IS THAT?', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: GOLD, rot: -0.03 }) } },
  { sign: 'capricorn', cap: 'Lined everyone up | *by sign.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2); mini(x, t, SIGN_IDS[i], 660 + (i % 3) * 120, 780 + Math.floor(i / 3) * 170, 110 * k, { mood: 'happy' }) }
      label(x, 790, 1080, 'ARIES FIRST. ALWAYS.', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 26, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Faced | *the wrong way.*', mood: 'happy', look: [-1, -1], star: { x: -160 }, squash: 0,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s artistic', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 900, 'CAMERA: OVER HERE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Happy tears | in *every single one.*', mood: 'heart', tears: 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) photo(x, 700 + i * 90, 820 + i * 50, 200, 220, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { rot: (i - 1) * 0.12, inner: () => mini(x, t, 'pisces', 700 + i * 90, 800 + i * 50, 110 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { tears: 2, mood: 'heart' }) })
      label(x, 790, 640, 'DRY ONES: 0', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t097', key: 'D', accent: '#8fe3ff', ending: 'group',
  title: 'Zodiac group pics | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Perfect photo. | *Nobody’s looking.*',
    moods: ['wide', 'happy', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'neutral', 'wink', 'squint', 'happy', 'heart'],
    draw(x, t, lt) { label(x, 540, 620, 'TAKE 47', pop01(t, t - lt + 1.4, 0.35, 2), { size: 56, bg: GOLD, rot: -0.04 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
