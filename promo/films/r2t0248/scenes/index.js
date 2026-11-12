// r2t0248: star_talk, ROLLCALL, "The signs on the | last day of school." (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs on the | *last day of school.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve last days (3.8 s each), each pushed to the extreme:
//              ♈ left before the bell rang · ♉ brought a pillow, napped all day · ♊ signed every yearbook, twice
//              · ♋ made everyone sign a stay-in-touch contract · ♌ a farewell speech nobody asked for · ♍ cleaned every
//              locker · ♎ a photo with every teacher · ♏ returned a library book from year one · ♐ packed for summer in
//              March · ♑ asked for summer homework · ♒ a petition for summer school · ♓ sobbed through the whole bell
//  49.2        group ending: "School’s out. | *Chaos is in.*"  Confetti over the group photo.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, beam, confetti, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const ACC = SUN
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const BELL = ['....KK....', '...YYYY...', '..YYYYYY..', '..YWYYYY..', '.YYYYYYYY.', '.YYYYYYYY.', 'YYYYYYYYYY', '....KK....']
const BELL_C = { K: INK, Y: SUN, W: '#fff1b0' }
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWLLWWWWWWLLWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const BOOK = ['KKKKKKKKKKKK', 'KRRRRRRRRRWK', 'KRYYYYYYYRWK', 'KRRRRRRRRRWK', 'KRRRRRRRRRWK', 'KRRRRRRRRRWK', 'KRRRRRRRRRWK', 'KKKKKKKKKKKK']
const BOOK_C = { K: INK, R: '#6b62a8', Y: GOLD, W: CREAM }
const LOCKER = ['KKKKKK', 'KBBBBK', 'KB--BK', 'KBBBBK', 'KB--BK', 'KBBBBK', 'KBBBYK', 'KBBBBK', 'KBBBBK', 'KKKKKK']
const CAMERA = ['..KKK.......', 'KKKKKKKKKKKK', 'KGGGKKKKGGGK', 'KGGKWWWWKGGK', 'KGKWSSSSWKGK', 'KGKWSSSSWKGK', 'KGGKWWWWKGGK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, G: GREY, W: CREAM, S: SKYB }
const CASE = ['...KKKK...', '...K..K...', 'OOOOOOOOOO', 'OWOOOOOOWO', 'OOOOOOOOOO', 'OOOOOOOOOO', 'OWOOOOOOWO', 'OOOOOOOOOO', '.K......K.']
const BALL = ['..RRWW..', '.RRRWWW.', 'RRRRWWWW', 'BBBBYYYY', 'BBBBYYYY', '.BBBYYY.', '..BBYY..']
const BALL_C = { R: RED, W: CREAM, B: SKYB, Y: SUN }
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', 'KGGGK', '.KKK.', '..K..', '..K..', '..K..', '.KKK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Left before | the *bell rang.*', mood: 'sparkle', star: { x: -40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      drawBits(x, BELL, BELL_C, 790, 650, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.5 ? 0.25 * Math.sin(t * 30) : 0 })
      bubble(x, 790, 880, 'RIIING!', lt > 1.5 ? pop01(t, P.t0 + 1.5 * 1.29, 0.2, 2.2) : 0, { size: 40, col: SUN, tail: 'bc' })
    },
    front(x, t, lt, P, F) {
      // the star dashes off to the left at lt 0.6: a little dust trail stays behind
      const go = ease.inCubic(prog(lt, 0.5, 0.9))
      if (go < 1) signChar(x, t, 'aries', lerp(500, 160, go), 880, 300, { mood: 'sparkle', pop: P.k * (1 - go), seed: 3, hops: [P.t0 + 0.1, P.t0 + 0.4] })
      if (go > 0) { x.save(); x.globalAlpha = 1 - prog(lt, 1.0, 2.2); x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(480 - i * 80, 900 + (i % 2) * 40, 56, 12); x.restore() }
      lab(x, 790, 1090, 'GONE AT: 2:59', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: RED, color: BONE, rot: -0.05 })
    },
    hideStar: true },
  { sign: 'taurus', cap: 'Brought a pillow. | Napped *all day.*', mood: 'sleepy', star: ST,
    back(x, t, lt, P, F) { drawBits(x, PILLOW, { W: CREAM, L: PINK }, F.x, F.cy + 150, 18 * P.k) },
    front(x, t, lt, P, F) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); txt(x, 'z', F.x + 120 + ph * 90, F.cy - 120 - ph * 180, { size: 40 + i * 14, color: BONE }); x.restore() }
      lab(x, 790, 760, 'ATTENDANCE: ASLEEP', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: LAV, rot: 0.04, size: 30 })
      bubble(x, 790, 1000, 'wake me | in fall.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Signed every yearbook. | *Twice.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = Math.min(6, Math.floor(lt * 3.5))
      const SIG = ['xoxo G', 'stay cool!', 'G again!', 'HAGS', 'me 2!', 'love, G']
      for (let i = 0; i < n; i++) { x.save(); x.translate(700 + (i % 2) * 180, 720 + Math.floor(i / 2) * 150); x.rotate(-0.15 + (i % 3) * 0.12); txt(x, SIG[i], 0, 0, { size: 30, color: [PINK, SKYB, MINT][i % 3] }); x.restore() }
      lab(x, 790, 1120, 'SIGNED BY: BOTH OF ME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: SUN, rot: 0.04, size: 28 })
    } },
  { sign: 'cancer', cap: 'Made everyone sign | a *stay-in-touch contract.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 400, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'I PROMISE', 0, -160, { size: 30, font: MONO, weight: 700 }); txt(x, 'TO WRITE', 0, -122, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 6; i++) { const s = clamp((lt - 0.5 - i * 0.2) * 3); x.fillStyle = [PINK, SKYB, MINT, ORANGE, LAV, RED][i]; x.fillRect(-120, -70 + i * 40, 240 * s * (0.5 + 0.5 * ((i * 7) % 5) / 4), 8) }
      })
      lab(x, 790, 640, 'BINDING. FOREVER.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Gave a farewell speech. | *Nobody asked.*', mood: 'sparkle', star: { x: -150 }, hops: [1.1],
    back(x, t, lt, P) { beam(x, 390, 490, 390, 1150, 200, ease.outCubic(prog(lt, 0.2, 0.5))) },
    front(x, t, lt, P) {
      drawBits(x, MIC, { K: INK, G: GREY }, 540, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'and in | conclusion: me.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 790, 1040, 'SPEECH: 45 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: ORANGE, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Cleaned their locker. | And *everyone else’s.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const clean = lt > 0.5 + i * 0.35
        drawBits(x, LOCKER, { K: INK, B: clean ? MINT : '#8a7a6a', '-': INK, Y: GOLD }, 670 + i * 80, 870, 15 * pop01(t, P.t0 + 0.15 + i * 0.06, 0.3, 2))
        if (clean) sparkles(x, t, 670 + i * 80, 820, P.t0 + (0.5 + i * 0.35) * 1.29, 5, 60, i)
      }
      lab(x, 790, 1080, 'LOCKERS: 0 CRUMBS', pop01(t, P.t0 + 1.9, 0.3, 2.2), { bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'A photo with | *every teacher.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 860, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const f = (lt * 2.2) % 1
      if (lt > 0.5 && f < 0.15) { x.save(); x.globalAlpha = 0.5 * (1 - f / 0.15); x.fillStyle = '#ffffff'; x.fillRect(100, 470, 880, 760); x.restore() }
      lab(x, 790, 1060, `TEACHERS: ${Math.min(23, 1 + Math.floor(lt * 9))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { bg: PINK, rot: 0.04 })
      bubble(x, 790, 660, 'one more!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Returned a library book | from *year one.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { ...BOOK_C, R: '#5a4a6a' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = GREY; x.fillRect(700 + i * 34, 790 - ph * 120, 12, 12); x.restore() }
      lab(x, 790, 680, 'OVERDUE: 6 YEARS', pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: RED, color: BONE, rot: -0.05 })
      bubble(x, 790, 1090, 'no questions.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Packed for summer. | *In March.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, O: ORANGE, W: GOLD }, 320, 930, 22 * pop01(t, P.t0 + 0.15, 0.35, 2))
      drawBits(x, BALL, BALL_C, 330, 720 - Math.abs(Math.sin(t * 4)) * 50, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      lab(x, 320, 1110, 'PACKED SINCE: MARCH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: SUN, rot: -0.04, size: 30 })
    } },
  { sign: 'capricorn', cap: 'Asked for | *summer homework.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) card(x, 790 + (i % 2 ? 12 : -12), 1040 - i * 70, 300, 60, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { bg: [CREAM, '#e8dfcf'][i % 2], rot: (i % 2 ? 0.04 : -0.03) }, () => { x.fillStyle = GREY; x.fillRect(-110, -6, 200, 10) })
      bubble(x, 790, 650, 'extra credit? | please?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 790, 1150, 'SUMMER: PRODUCTIVE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: GREY, rot: 0.04, size: 30 })
    } },
  { sign: 'aquarius', cap: 'Started a petition | for *summer school.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 360, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = BROWN; x.fillRect(-60, -196, 120, 36)
        txt(x, 'PETITION', 0, -120, { size: 32, font: MONO, weight: 700 })
        txt(x, 'MORE SCHOOL', 0, -76, { size: 26, font: MONO, weight: 700, color: RED })
        x.fillStyle = SKYB; x.fillRect(-110, -20, 140, 10)
        for (let i = 1; i < 5; i++) { x.fillStyle = '#e8dfcf'; x.fillRect(-110, -20 + i * 44, 220, 10) }
      })
      lab(x, 790, 1110, 'SIGNATURES: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Sobbed through | the *whole bell.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BELL, BELL_C, 790, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.25 * Math.sin(t * 30) })
      bubble(x, 790, 960, 'it’s just | SO final', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      lab(x, 790, 1130, 'BELL: 5 SEC · TEARS: 1 HR', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: SKYB, rot: -0.04, size: 26 })
    } },
]

const F = makeFilm({
  id: 'r2t0248', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs on the | *last day of school.*',
  cameos: CAMEOS,
  group: {
    cap: 'School’s out. | *Chaos is in.*',
    draw(x, t, lt) { confetti(x, t, 540, 1100, t - lt + 0.9, { n: 30, spread: 420, h: 900 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
