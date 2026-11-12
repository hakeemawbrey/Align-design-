// r2a0420: star_advice, ADVICE ROLLCALL, "How each sign | handles rejection." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: how each one handles a "no", with a warm reframe and one light gag. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ back up by lunch · ♉ holds on, lets go gently (balloon) · ♊ talks it out with every friend
//              · ♋ cries, then tea · ♌ unbothered (mostly) · ♍ fault: none found · ♎ stays friends, gracefully
//              · ♏ case closed, healing in private · ♐ laughs it off · ♑ works harder, worth is built in
//              · ♒ feelings are data too · ♓ a sad song, then a happy one (tears)
//  49.2        "A no isn’t | *the end of you.*"  ONE NO, TWELVE COMEBACKS over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#ffd27a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

const BALL = ['..RRRR..', '.RWRRRR.', 'RWRRRRRR', 'RRRRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const BALLOON = ['.PPPPP.', 'PPWPPPP', 'PWPPPPP', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const MUG = ['.W.W..', 'W.W...', '......', 'MMMMM.', 'MMMMMM', 'MMMM.M', 'MMMMMM', 'MMMMM.', '.MMM..']
const SHADES = ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.']
const TROPHY = ['YYYYYYY', 'YHHYHHY', '.YHHHY.', '..YYY..', '...Y...', '..YYY..', '.KKKKK.']

/** a phone with a stack of chat names, each with a little dot */
function chats(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  const NAMES = ['MUM', 'BESTIE', 'WORK FRIEND', 'COUSIN', 'NEIGHBOUR']
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) { const y = -140 + i * 62; x.fillStyle = [MINT, PINK, GOLD, SKYB, LAV][i]; x.fillRect(-100, y - 22, 200, 46); x.fillStyle = INK; x.fillText(NAMES[i], -86, y + 2) }
  x.restore()
}
/** a report sheet with a big stamp */
function report(x, cx, cy, k, stamp, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = CREAM; x.fillRect(-142, -172, 284, 344)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-110, -130 + i * 34, i % 2 ? 170 : 220, 10)
  if (stamp > 0) {
    x.save(); x.translate(0, 90); x.rotate(-0.18); x.scale(lerp(1.6, 1, stamp), lerp(1.6, 1, stamp)); x.globalAlpha = clamp(stamp * 2)
    x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-130, -36, 260, 72)
    x.fillStyle = RED; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2); x.restore()
  }
  x.restore()
}
/** a little line graph wiggling, with a heart on the peak */
function graph(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -140, 360, 280); x.fillStyle = '#f7f7ff'; x.fillRect(-170, -130, 340, 260)
  x.strokeStyle = '#b9b0a0'; x.lineWidth = 2; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-150, -90 + i * 50); x.lineTo(150, -90 + i * 50); x.stroke() }
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 30)
  x.strokeStyle = '#6b62ff'; x.lineWidth = 6; x.beginPath()
  for (let i = 0; i <= n; i++) { const px = -150 + i * 10, py = 60 - i * 3 + 30 * Math.sin(i * 0.7); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Back up by lunch. | *Brave looks good.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const b = Math.abs(Math.sin(lt * 4.5)) * clamp(1.5 - lt * 0.4)
      drawBits(x, BALL, { R: RED, W: '#fff' }, 790, 1060 - 240 * b, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'BOUNCE-BACK: FAST', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Holds on a while. | *Let go gently.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      const up = ease.inOutCubic(prog(lt, 1.0, 2.4))
      const bx = 780 + 30 * Math.sin(t * 2), by = lerp(700, 560, up)
      if (lt < 1.0) { x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(F.x + 90, F.cy); x.lineTo(bx, by + 110); x.stroke(); x.restore() }
      drawBits(x, BALLOON, { P: PINK, W: '#fff' }, bx, by, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'AND BREATHE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Talks it out. | *Every friend helps.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) { chats(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 5)) } },
  { sign: 'cancer', cap: 'Cries, then tea. | *Both count.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: 'rgba(239,230,214,0.7)', M: '#8fe3ff' }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1110, 'TEA: BREWING', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'leo', cap: 'Unbothered. *Mostly.* | Heart heals fast.', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.4, 0.9))
      drawBits(x, SHADES, { K: INK, S: '#2a2350' }, F.x + 4, lerp(F.top - 140, F.cy - 30, d), 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 780, 'UNBOTHERED', pop01(t, P.t0 + 1.0, 0.3, 2.4), ORANGE, -0.05, 44)
      L(x, 790, 940, '(MOSTLY)', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Analysed it all. | *The fault wasn’t you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { report(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 1.0) / 0.3), 'FAULT: NONE') } },
  { sign: 'libra', cap: 'Stays friends. | *Grace is your gift.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false })
      L(x, 790, 700, 'STILL FRIENDS', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 38)
      hearts(x, t, 620, 880, P.t0 + 1.3, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Never mentions it. | *Private healing counts.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { report(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.9) / 0.3), 'CASE CLOSED') } },
  { sign: 'sagittarius', cap: 'Laughs it off. | *Joy bounces back.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'HA!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 56, tail: 'bl' })
      bubble(x, 860, 860, 'ha ha', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      L(x, 790, 1080, 'MOOD: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Works harder. | *Your worth is built in.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, H: '#ff4f86', K: INK }, 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1110, 'WORTH: INCLUDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 180, 0.4)
    } },
  { sign: 'aquarius', cap: 'Studies the feeling. | *Feelings are data too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      graph(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1080, 'FEELINGS: VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Writes a sad song. | *Then a happy one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: lt => lt > 1.3 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: lt > 1.3 ? PINK : SKYB, seed: 3 })
      L(x, 790, 720, lt > 1.3 ? 'TRACK 2: HAPPY' : 'TRACK 1: SAD', pop01(t, P.t0 + 0.4, 0.3, 2.4), lt > 1.3 ? PINK : SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0420', key: 'G', accent: ACC, ending: 'group',
  title: 'How each sign | *handles rejection.*',
  cameos: CAMEOS,
  group: {
    cap: 'A no isn’t | *the end of you.*',
    draw(x, t, lt) { L(x, 540, 740, 'ONE NO. TWELVE COMEBACKS.', pop01(t, t - lt + 1.3, 0.35, 2.4), GOLD, -0.03, 32) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
