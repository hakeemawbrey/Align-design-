// r2t0397: star_talk SOLO (leo), "How to spot | a Leo." (signs3kit social cut, music: lofi · E). Ending: lesson.
//   nine cards: the room gets brighter · sunglasses indoors, at night · voicemail has a theme song · hair two hours, party
//   forty minutes · compliments handed out like awards · profile bio is a full biography · group photo: front and centre
//   · the cat's birthday is black tie · applauded their own parking
//   group: "Golden. Loud. | Impossible to miss."  lesson: "Leos shine so you | feel warm too."  last: "Spotted one? | Cheer back."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes, inSprite,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
// sunglasses drawn in sprite cells over the eyes (eyes sit around rows 17–22, cols 8–28)
function shades(x) {
  x.fillStyle = INK; x.fillRect(6.5, 16.5, 10, 6); x.fillRect(19.5, 16.5, 10, 6); x.fillRect(16, 17.5, 4, 1.5)
  x.fillStyle = '#2a2350'; x.fillRect(7.5, 17.5, 8, 4); x.fillRect(20.5, 17.5, 8, 4)
  x.fillStyle = '#ffffff'; x.fillRect(8.5, 18, 2, 1); x.fillRect(21.5, 18, 2, 1)
}
const DRYER = ['.KKKKKKK...', 'KRRRRRRRKKK', 'KRRRRRRRKWK', 'KRRRRRRRKKK', '.KKKKKKK...', '...KRK.....', '...KRK.....', '...KRK.....', '...KKK.....']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const CAKE = ['....F....', '....C....', '.PPPPPPP.', '.PWPWPWP.', 'PPPPPPPPP', 'WWWWWWWWW', 'PPPPPPPPP', 'PPPPPPPPP']
const CAT = ['K.....K', 'KK...KK', 'KOOOOOK', 'OWOOOWO', 'OOOPOOO', '.OOOOO.', '..BIB..']
const CAR = ['...RRRRR....', '..RWWRWWR...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK.....KK..']

const S = 'leo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'They walk in. | *The room gets brighter.*', mood: 'sparkle', look: [0, 0], star: ST, hops: [0.4],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.2, 0.8))
      if (k <= 0) return
      x.save(); x.globalAlpha = 0.35 * k
      const g = x.createLinearGradient(0, 470, 0, 1150); g.addColorStop(0, '#fff1b0'); g.addColorStop(1, 'rgba(255,241,176,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 220, 1150); x.lineTo(F.x - 220, 1150); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const n = Math.round(lerp(100, 400, clamp((lt - 0.6) / 1.2)))
      L(x, 800, 760, `LIGHTS: ${n}%`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 40)
      bubble(x, 800, 980, 'hi everyone!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 370, 800, P.t0 + 0.7, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Sunglasses indoors. | *At night.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      if (lt > 0.5) inSprite(x, F, () => shades(x))
      L(x, 800, 760, '11:48 PM', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 52)
      L(x, 800, 900, 'INDOORS', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.04, 40)
      bubble(x, 800, 1070, 'too bright in here.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Their voicemail | has *a theme song.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 250, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05, bg: '#2a2350' }, () => {
        x.fillStyle = '#140c30'; x.fillRect(-105, -155, 210, 300)
        x.fillStyle = ACC; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VOICEMAIL', 0, -120)
        for (let i = 0; i < 9; i++) { const h = 20 + 60 * Math.abs(Math.sin(t * 6 + i * 0.9)); x.fillStyle = i % 2 ? GOLD : PINK; x.fillRect(-90 + i * 20, 10 - h / 2, 12, h) }
        x.fillStyle = BONE; x.fillText('0:40 INTRO', 0, 110)
      })
      notes(x, t, 790, 700, { n: 5, cell: 7, col: ACC, seed: 2 })
      L(x, 790, 1110, 'NOW WITH HARP', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Hair: two hours. | Party: *forty minutes.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, DRYER, { K: INK, R: PINK, W: '#ffffff' }, F.x + 150, F.top - 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 + 0.05 * Math.sin(t * 14) })
      const h = Math.floor(clamp((lt - 0.3) / 1.3) * 120)
      L(x, 820, 820, `${Math.floor(h / 60)}h ${String(h % 60).padStart(2, '0')}m`, pop01(t, P.t0 + 0.3, 0.3, 2), BONE, 0.04, 48)
      L(x, 820, 990, 'WORTH IT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Gives compliments | *like awards.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 990, 170 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 13, glyph: false })
      const d = ease.inOutCubic(prog(lt, 0.5, 1.1))
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, lerp(520, 800, d), lerp(800, 840, d), 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 660, 'BEST LAUGH: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 140, 0.4)
    } },
  { sign: S, cap: 'Their profile bio? | *A full biography.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.4))
      card(x, 790, 600 + 280 * u, 280, 40 + 560 * u, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.02 }, () => {
        x.save(); x.beginPath(); x.rect(-140, -20 - 280 * u, 280, 40 + 560 * u); x.clip()
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('♌︎ ABOUT ME', 0, -250)
        x.font = `700 20px ${MONO}`; const ch = ['CH 1: BORN', 'CH 2: SHONE', 'CH 3: MORE', 'CH 4: STILL ME']
        ch.forEach((c, i) => { x.fillText(c, 0, -170 + i * 110); x.fillStyle = '#9aa5c4'; for (let j = 0; j < 3; j++) x.fillRect(-100, -140 + i * 110 + j * 16, 200 - j * 40, 8); x.fillStyle = INK })
        x.restore()
      })
      L(x, 790, 1150, 'READ TIME: 3 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 28)
    } },
  { sign: S, cap: 'Group photo? | *Front. Centre. Always.*', mood: 'sparkle', look: [0, 0], star: { x: 0, y: 40, s: 280 }, hops: [0.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const BACK = ['taurus', 'cancer', 'libra', 'aquarius']
      BACK.forEach((id, i) => { if (k > 0.01) signChar(x, t, id, 300 + i * 160, 760 + (i % 2) * 20, 130 * k, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.6, alpha: 0.9 }) })
    },
    front(x, t, lt, P) {
      const fl = t - (P.t0 + 1.3); if (fl > 0 && fl < 0.3) { x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - fl / 0.3)).toFixed(3)})`; x.fillRect(110, 480, 860, 740) }
      L(x, 540, 1150, 'SPOT: CENTRE (CALLED IT)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 28)
    } },
  { sign: S, cap: 'The cat’s birthday? | *Black tie.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CAT, { K: '#c98f2a', O: '#ffb34a', W: INK, P: PINK, B: INK, I: '#ffffff' }, 760, 790, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAKE, { F: '#ffe36a', C: BONE, P: PINK, W: '#ffffff' }, 860, 1010, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 620, 'DRESS CODE: FORMAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 28)
      L(x, 700, 1120, 'GUESTS: 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Applauded | *their own parking.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.5, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.2, 0.9))
      x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillRect(660, 1060, 8, 80); x.fillRect(930, 1060, 8, 80)
      drawBits(x, CAR, { R: ACC, W: SKYB, K: INK }, lerp(1000, 800, d), 1030, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 860, 'PERFECT. CENTRED.', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 32)
      bubble(x, 800, 690, 'clap clap clap', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 800, 1030, P.t0 + 1.0, 8, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0397', key: 'E', accent: ACC, solo: 'leo', ending: 'lesson',
  title: 'How to spot | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Golden. Loud. | *Impossible to miss.*', mood: 'sparkle' },
  lesson: { text: 'Leos shine so you | feel *warm too.*', chip: 'STATUS: DAZZLED' },
  last: {
    text: 'Spotted one? | *Cheer back.*',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 0.5, 10, 260, 0.3); sparkles(x, t, 540, 860, t - lt + 1.6, 8, 220, 0.9) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
