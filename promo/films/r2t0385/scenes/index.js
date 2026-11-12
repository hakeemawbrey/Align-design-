// r2t0385: star_talk, ROLLCALL, "The signs picking | a profile pic." (topic: The signs choosing a profile picture;
// signs3kit social cut, music: lofi · F). Ending: lesson.
//   ♈ first photo, blurry, posted · ♉ it's their pizza · ♊ changed it nine times today · ♋ a baby photo, age two
//   · ♌ hired a photographer for a thumbnail · ♍ took 400, used the first · ♎ polled twelve friends, still split
//   · ♏ a black square · ♐ taken mid-skydive · ♑ the work headshot, everywhere · ♒ abstract art, self-made
//   · ♓ picked a sunset, cried at it.   group "Twelve profiles. | Zero regrets."  lesson "The best photo | is just you."
//   last "Scorpio's? | Still a square."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#ff8fb1'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

/** a profile card: frame, a picture painted by fn(x) inside a 220×220 window centred at 0,-30, a name strip */
function pcard(x, cx, cy, k, fn, { rot = 0.04, strip = '✦ PROFILE', stripCol = GOLD, bg = '#2a2350' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -170, 276, 350)
  x.fillStyle = INK; x.fillRect(-142, -182, 284, 352)
  x.fillStyle = '#140c30'; x.fillRect(-134, -174, 268, 336)
  x.save(); x.beginPath(); x.rect(-110, -150, 220, 220); x.clip(); x.fillStyle = bg; x.fillRect(-110, -150, 220, 220); fn(x); x.restore()
  x.fillStyle = stripCol; x.fillRect(-110, 90, 220, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(strip, 0, 116)
  x.restore()
}
const PIZZA = ['YYYYYYYYYY', '.YRYYYRYY.', '.YYYYYYYY.', '..YYRYYY..', '..YYYYYY..', '...YYYY...', '...YRY....', '....Y.....']
const PIZZA_C = { Y: GOLD, R: RED }
const CAMERA = ['....KKK.....', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGWWWWGGGK', 'KGGWSSSSWGGK', 'KGGWSKKSWGGK', 'KGGWSSSSWGGK', 'KGGGWWWWGGGK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, G: '#6b62a8', W: '#d8dbe8', S: SKYB }
const CHUTE = ['..RRRRRRRR..', '.RRWWRRWWRR.', 'RRRRRRRRRRRR', 'K..........K', '.K........K.', '..K......K..', '...K....K...', '....K..K....']
const TIE = ['.RR.', 'RRRR', '.RR.', '.RR.', 'RRRR', 'RRRR', '.RR.']

const star = (id, mood = 'happy', s = 150, o = {}) => (x) => signChar(x, o.t ?? 0, id, 0, -30, s, { mood, glyph: false, glow: 0.4, seed: 70, ...o })
const ST_L = { x: -170 }, ST_R = { x: 160 }
const CAMEOS = [
  { sign: 'aries', cap: 'First photo taken. | *Posted instantly.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST_L, hops: [0.4],
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => {
        x.globalAlpha = 0.35; for (let i = 0; i < 4; i++) signChar(x, t, 'aries', -36 + i * 24, -30, 150, { mood: 'wide', glyph: false, glow: 0.3, seed: 70 })
        x.globalAlpha = 1
      })
      L(x, 790, 1130, 'BLURRY. POSTED.', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Profile pic? | *Their pizza.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => drawBits(x, PIZZA, PIZZA_C, 0, -40, 18, { rot: 0.1 }), { bg: '#5fd068' })
      bubble(x, 790, 610, 'my best angle', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Changed it | *nine times today.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST_L,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 8), cols = [MINT, PINK, SKYB, GOLD, LAV, ORANGE]
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), star('gemini', n % 2 ? 'wink' : 'sparkle', 150, { t }), { bg: cols[n % 6], strip: `VERSION ${n}` })
    } },
  { sign: 'cancer', cap: 'Profile pic? | *A baby photo.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), star('cancer', 'wide', 120, { t }), { bg: '#ffd6e2', strip: 'AGE: 2', stripCol: SKYB })
      bubble(x, 790, 610, 'still me!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Hired a photographer. | *For a thumbnail.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST_L, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 800, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (Math.floor(lt * 3) % 3 === 0 && lt > 0.6) { x.save(); x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 1020, 'SHOOT: 6 HOURS', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 36)
      L(x, 790, 1120, 'SIZE: 40 PX', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Took 400 photos. | Used *the first one.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', star: ST_L,
    front(x, t, lt, P) {
      const n = Math.min(400, Math.floor(clamp((lt - 0.2) / 1.1) * 400))
      L(x, 790, 640, `PHOTOS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.04, 40)
      pcard(x, 790, 900, pop01(t, P.t0 + 1.3, 0.3, 2), star('virgo', 'happy', 150, { t }), { bg: '#7dffb0', strip: 'IMG_0001' })
    } },
  { sign: 'libra', cap: 'Polled twelve friends. | *Still split.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST_L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WHICH PIC?', 0, -104)
        const g = ease.outCubic(prog(lt, 0.5, 1.3))
        x.fillStyle = PINK; x.fillRect(-120, 110 - 160 * g, 90, 160 * g); x.fillStyle = LAV; x.fillRect(30, 110 - 160 * g, 90, 160 * g)
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('A: 6', -75, 128); x.fillText('B: 6', 75, 128)
        x.restore()
      }
      L(x, 790, 1120, 'TIEBREAK: 13TH FRIEND', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Profile pic? | *A black square.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), () => {}, { bg: '#000000', strip: '???', stripCol: '#c97bff' })
      bubble(x, 790, 610, 'you’ll see me | when you see me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Profile pic? | Taken *mid-skydive.*', mood: 'sparkle', star: ST_R, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      pcard(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => {
        drawBits(x, CHUTE, { R: RED, W: CREAM, K: INK }, 0, -100, 12)
        signChar(x, t, 'sagittarius', 0, -6, 90, { mood: 'sparkle', glyph: false, glow: 0.3, seed: 70 })
      }, { bg: '#6fc3ff', rot: -0.04 })
      L(x, 320, 1130, 'WAVED. MID-AIR.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'The work headshot. | *Everywhere.*', mood: 'neutral', look: [-1, 0], star: ST_R,
    front(x, t, lt, P) {
      pcard(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => {
        signChar(x, t, 'capricorn', 0, -40, 140, { mood: 'neutral', glyph: false, glow: 0.3, seed: 70 })
        drawBits(x, TIE, { R: RED }, 0, 50, 10)
      }, { bg: SLATE, rot: -0.04, strip: 'DATING PROFILE' })
      L(x, 320, 1130, 'ALSO: GROUP CHAT', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Profile pic? | *Abstract art.* Self-made.', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: ST_L,
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => {
        x.fillStyle = GOLD; x.beginPath(); x.arc(-40, -70, 50, 0, Math.PI * 2); x.fill()
        x.fillStyle = PINK; x.fillRect(10, -110, 80, 140)
        x.fillStyle = MINT; x.beginPath(); x.moveTo(-90, 60); x.lineTo(0, -30); x.lineTo(40, 60); x.closePath(); x.fill()
      }, { bg: '#6fc3ff', strip: 'IT’S A FEELING' })
      bubble(x, 790, 610, 'it’s me, inside', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Picked a sunset. | *Cried* at it.', mood: lt => lt > 0.8 ? 'wide' : 'heart', tears: lt => lt > 0.8 ? 3 : 1, star: ST_L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (x) => {
        const g = x.createLinearGradient(0, -150, 0, 70); g.addColorStop(0, '#ff8fb1'); g.addColorStop(1, '#ffb34a'); x.fillStyle = g; x.fillRect(-110, -150, 220, 220)
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 10, 56, Math.PI, 0); x.fill()
        x.fillStyle = '#6b62a8'; x.fillRect(-110, 10, 220, 60)
      }, { bg: '#ff8fb1' })
      L(x, 790, 1130, 'SO PRETTY. SOB.', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0385', key: 'F', accent: ACC,
  title: 'The signs picking | *a profile pic.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Twelve profiles. | *Zero regrets.*' },
  lesson: { text: 'The best photo | is *just you.*', chip: 'PROFILE: COMPLETE' },
  last: {
    text: 'Scorpio’s? | *Still a square.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(540, 760); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -110, 220, 220); x.fillStyle = '#000'; x.fillRect(-100, -100, 200, 200); x.restore() }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
