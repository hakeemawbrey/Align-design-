// r2t0162: THE SIGNS AS… v3, ROLLCALL, "The signs | as students." (~62 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | *as students.*"
//   3.6–49.2   ♈ raced to class, won, nobody else raced · ♉ same seat since September · ♊ passed notes to every row
//              · ♋ adopted the class hamster (and the class) · ♌ school play, cast themself as everyone · ♍ colour-coded
//              notes for the teacher too · ♎ locker nicer than the classroom · ♏ never raised a hand, aced it anyway
//              · ♐ permission slip for Mars · ♑ class president since kindergarten · ♒ science fair: a compatibility
//              machine · ♓ doodled all lesson, cried at the doodle
//  49.2        "Class photo. | *Nobody looking.*"
//  52.4        LESSON UNLOCKED: "Everyone learns | *their own way.*"  GRADE: GOLD STAR
//  58.3        "Taurus kept | *the seat.*"  Taurus on its desk, nameplate and all.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffd23a'
const ST = { x: -170 }

const HAMSTER = ['..OO....OO..', '.OPPO..OPPO.', '.OOOOOOOOOO.', 'OOOKOOOOKOOO', 'OOOOOPPOOOOO', 'OWWOOOOOOWWO', '.OWWWWWWWWO.', '..OO....OO..']
const HAM_C = { O: '#e8a24a', P: PINK, K: INK, W: CREAM }
const ROBOT = ['....R....', '..GGGGG..', '.GKGGGKG.', '.GGGGGGG.', '.GGRRRGG.', '..GGGGG..', 'GGGGGGGGG', 'G.GLLLG.G', 'G.GLLLG.G', '..G...G..', '.GG...GG.']
const ROCKET = ['...R...', '..RRR..', '..WWW..', '.WWSWW.', '.WWWWW.', '.WWWWW.', 'RWWWWWR', 'R.OOO.R', '..O.O..']
const ROCKET_C = { R: RED, W: CREAM, S: SKYB, O: ORANGE }

/** a school desk with an optional nameplate */
function desk(x, cx, cy, k, plate) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -26, 340, 46); x.fillRect(-150, 10, 24, 150); x.fillRect(126, 10, 24, 150)
  x.fillStyle = WOOD; x.fillRect(-164, -20, 328, 34); x.fillStyle = GREY; x.fillRect(-144, 14, 12, 140); x.fillRect(132, 14, 12, 140)
  if (plate) { x.fillStyle = INK; x.fillRect(-120, -86, 240, 64); x.fillStyle = GOLD; x.fillRect(-114, -80, 228, 52); txt(x, plate, 0, -53, { size: 26, font: MONO, weight: 700 }) }
  x.restore()
}
/** a folded paper note flying along an arc */
function note(x, cx, cy, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-26, -18, 52, 36); x.fillStyle = CREAM; x.fillRect(-22, -14, 44, 28)
  x.fillStyle = '#c9d8f0'; x.fillRect(-16, -6, 32, 3); x.fillRect(-16, 3, 24, 3)
  x.restore()
}
/** a locker with door open; fn draws inside the door frame */
function locker(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400); x.fillStyle = '#6fc3ff'; x.fillRect(-122, -192, 244, 384)
  x.fillStyle = '#3a2a6a'; x.fillRect(-104, -174, 208, 348)
  // fairy lights
  for (let i = 0; i < 7; i++) { x.fillStyle = [GOLD, PINK, MINT][i % 3]; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 6 + i); x.fillRect(-90 + i * 30, -160 + 10 * Math.sin(i), 12, 12) }
  x.globalAlpha = 1
  // a little mirror, a plant, a framed star
  x.fillStyle = BONE; x.fillRect(-70, -110, 60, 80); x.fillStyle = '#b9e6f2'; x.fillRect(-64, -104, 48, 68)
  x.fillStyle = GOLD; x.fillRect(10, -110, 70, 70); x.fillStyle = '#140c30'; x.fillRect(18, -102, 54, 54); x.fillStyle = PINK; x.fillRect(36, -84, 18, 18)
  x.fillStyle = '#5fd068'; x.fillRect(-60, 40, 20, 60); x.fillRect(-80, 50, 60, 20); x.fillStyle = ORANGE; x.fillRect(-76, 100, 52, 40)
  x.fillStyle = PINK; x.fillRect(10, 60, 70, 80); x.fillStyle = CREAM; x.fillRect(20, 70, 50, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced to class. | Won. *Nobody else raced.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(250, 760, 12, 420); x.fillRect(470, 760, 12, 420)
      const br = lt > 0.8; x.fillStyle = RED
      if (!br) x.fillRect(262, 900, 208, 14); else { x.save(); x.translate(262, 900); x.rotate(0.5); x.fillRect(0, 0, 100, 14); x.restore(); x.save(); x.translate(470, 900); x.rotate(Math.PI - 0.5); x.fillRect(0, -14, 100, 14); x.restore() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 720, '1ST PLACE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 820, '(OUT OF 1)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 720, P.t0 + 1.0, 6, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Same seat since September. | *Do not.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'happy', look: [1, 0], star: { x: -160, y: -30 },
    back(x, t, lt, P) { desk(x, 380, 1060, pop01(t, P.t0 + 0.1, 0.3, 2), 'MY SEAT') },
    front(x, t, lt, P) {
      if (lt > 0.4) signChar(x, t, 'gemini', 800, 960, 150 * pop01(t, P.t0 + 0.5, 0.35, 2), { mood: lt > 1.1 ? 'wide' : 'happy', look: [-1, 0], seed: 11, glyph: false })
      bubble(x, 790, 760, 'is this seat free?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bc' })
      bubble(x, 560, 620, 'do not.', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 52, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Passed notes. | *To every row.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) {
        const p = ((lt * 0.9 + i / 7) % 1), a = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2)
        note(x, lerp(420, 900, p), 700 + (i % 3) * 140 - Math.sin(Math.PI * p) * 120, p * 6, a * Math.sin(Math.PI * Math.min(1, p * 1.2)) * 2.2)
      }
      label(x, 790, 1120, 'NOTES SENT: 31', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted the class hamster. | *And the class.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HAMSTER, HAM_C, 790, 820, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 0.8, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
      bubble(x, 790, 1040, 'snacks for everyone!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      label(x, 790, 640, 'CLASS MOM', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'School play. | Cast themself *as everyone.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.2],
    front(x, t, lt, P) {
      const ROLES = ['THE KING', 'THE TREE', 'THE NARRATOR', 'THE MOON']
      const n = Math.floor(prog(lt, 0.4, 1.8) * 4)
      card(x, 770, 860, 400, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'CAST LIST', 0, -140, { size: 34, font: MONO, weight: 700 })
        ROLES.forEach((r, i) => { if (i <= n) { txt(x, r, -160, -70 + i * 64, { size: 30, font: MONO, weight: 700, align: 'left' }); txt(x, 'LEO', 160, -70 + i * 64, { size: 34, color: ORANGE, align: 'right' }) } })
      })
    } },
  { sign: 'virgo', cap: 'Colour-coded notes. | For *the teacher too.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 320, 380, k, { bg: '#6b62a8', rot: -0.03 }, () => {
        const TABS = [PINK, MINT, GOLD, SKYB, ORANGE]
        TABS.forEach((c, i) => { x.fillStyle = INK; x.fillRect(156, -160 + i * 66, 44, 50); x.fillStyle = c; x.fillRect(158, -156 + i * 66, 36, 42) })
        x.fillStyle = CREAM; x.fillRect(-130, -160, 270, 320)
        for (let i = 0; i < 7; i++) { x.fillStyle = TABS[i % 5]; x.fillRect(-110, -130 + i * 42, 220 - (i % 3) * 40, 14) }
      })
      label(x, 790, 1100, 'TEACHER’S COPY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Their locker. | *Nicer than the classroom.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      locker(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t, lt)
      label(x, 790, 1110, 'NOW OPEN FOR TOURS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Never raised a hand. | *Aced it anyway.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), flip = ease.inOutCubic(prog(lt, 0.9, 1.3))
      card(x, 790, 850, 320, 380, k, { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'FINAL EXAM', 0, -140, { size: 32, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = '#c9d8f0'; x.fillRect(-120, -80 + i * 40, 240, 4) }
        if (flip > 0.01) { x.save(); x.translate(60, 60); x.scale(flip, flip); x.rotate(-0.2); x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.stroke(); txt(x, 'A+', 0, 4, { size: 84, color: RED }); x.restore() }
      })
      label(x, 790, 1100, 'QUESTIONS ASKED: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Permission slip | *for Mars.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 880, 360, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'FIELD TRIP', 0, -110, { size: 34, font: MONO, weight: 700 })
        txt(x, 'TO: MARS', 0, -40, { size: 42, color: RED })
        txt(x, 'BACK: ???', 0, 20, { size: 32, font: MONO, weight: 700, color: GREY })
        x.fillStyle = INK; x.fillRect(-120, 100, 240, 4); txt(x, 'signed: a parent', 0, 80, { size: 22, weight: 700, color: BROWN })
      })
      const p = prog(lt, 1.0, 2.4)
      if (p > 0) drawBits(x, ROCKET, ROCKET_C, 940 - 60 * p, 640 - 120 * p, 12, { rot: 0.4 })
    } },
  { sign: 'capricorn', cap: 'Class president. | *Since kindergarten.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 20); x.rotate(-0.6); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -24, 300, 48); x.fillStyle = RED; x.fillRect(-146, -20, 292, 40); txt(x, 'PRESIDENT', 0, 2, { size: 28, color: CREAM, font: MONO, weight: 700 }); x.restore() }
      label(x, 790, 760, 'TERM 13', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'UNOPPOSED (AGAIN)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Science fair: | *a compatibility machine.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 330, 330, k, { bg: '#9aa5c4', rot: 0 }, () => {
        x.fillStyle = DEEP; x.fillRect(-120, -130, 240, 120)
        for (let i = 0; i < 5; i++) { x.fillStyle = [MINT, PINK, GOLD, SKYB, RED][i]; x.globalAlpha = 0.4 + 0.6 * (Math.floor(t * 8 + i) % 2); x.fillRect(-110 + i * 48, 30, 30, 30) }
        x.globalAlpha = 1
        txt(x, lt > 1.4 ? "IT'S A MATCH" : 'COMPUTING…', 0, -70, { size: 30, font: MONO, weight: 700, color: lt > 1.4 ? MINT : BONE })
        x.fillStyle = INK; x.fillRect(-60, 100, 120, 30); x.fillStyle = RED; x.fillRect(-52, 104, 104, 22)
      })
      if (lt > 1.4) hearts(x, t, 790, 700, P.t0 + 1.4 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
      label(x, 790, 1100, '1ST PRIZE: PENDING', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Doodled all lesson. | *Cried* at the doodle.', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#c9d8f0'; for (let i = 0; i < 8; i++) x.fillRect(-150, -140 + i * 40, 300, 3)
        x.fillStyle = RED; x.fillRect(-120, -170, 4, 340)
        const d = prog(lt, 0.2, 1.0)
        x.strokeStyle = '#6b62a8'; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 90, Math.PI, Math.PI + Math.PI * 2 * d); x.stroke()
        if (d >= 1) { x.fillStyle = '#6b62a8'; x.fillRect(-40, -30, 20, 20); x.fillRect(20, -30, 20, 20); x.beginPath(); x.arc(0, 20, 40, 0, Math.PI); x.stroke() }
      })
      label(x, 790, 1100, 'IT’S JUST SO PRETTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0162', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs | *as students.*',
  cameos: CAMEOS,
  group: { cap: 'Class photo. | *Nobody looking.*', moods: ['sparkle', 'happy', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'neutral', 'wide', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'Everyone learns | *their own way.*', chip: 'GRADE: GOLD STAR' },
  last: {
    text: 'Taurus kept | *the seat.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      desk(x, 540, 845, 0.85 * k, 'MY SEAT')
      if (k > 0.01) signChar(x, t, 'taurus', 540, 700, 190 * k, { mood: 'sleepy', seed: 52, hops: [t - lt + 1.4] })
      label(x, 810, 640, 'SINCE SEPTEMBER', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 38, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
