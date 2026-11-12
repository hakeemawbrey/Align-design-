// r2t0327: star_talk, BE LIKE, "Zodiacs when a text | ends in “.” be like." (signs3kit social cut, music: lofi · E). Ending: group.
//   twelve signs receive "ok." (with a full stop), each at its most extreme:
//   ♈ eleven "??" in four seconds · ♉ replied "k." · ♊ screenshotted it to six chats · ♋ apologised for nothing
//   · ♌ read it as a compliment · ♍ finally, proper punctuation · ♎ forty drafts, sent none · ♏ replied "."
//   · ♐ didn't notice, sent nine memes · ♑ is the one who sends them · ♒ blamed Mercury · ♓ wrote a sad song
//  49.2   GROUP ending: "It was just | *“ok.”*"  a giant "ok." bubble lands over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a pixel phone: lines = [[text, colour, k, right?], …] (left = them, right = you) */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const OK = (k = 1) => ['ok.', GREY, k]
const ph = (t, P, d) => pop01(t, P.t0 + d, 0.25, 2.2)
const SCROLL = ['WWWWWWWW', 'WKKKKKKW', 'WWWWWWWW', 'WKKKKK.W', 'WWWWWWWW', 'WKKKKKKW', 'WWWWWWWW', 'WKKKK..W', 'WWWWWWWW', 'WKKKKKKW', 'WWWWWWWW', 'WKKK...W', 'WWWWWWWW']
const PAPER = ['WWWWWWW', 'WKKKKKW', 'WWWWWWW', 'WKKKK.W', 'WWWWWWW', 'WKKKKKW', 'WWWWWWW']
const PLANET = ['...RRRR...', '..RRRRRR..', 'YYRRRRRRYY', '..RRRRRR..', '...RRRR...']

const CAMEOS = [
  { sign: 'aries', cap: 'Sent eleven “??” | in *four seconds.*', mood: 'wide', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW MATCH', headCol: PINK, lines: [
        OK(), ['??', ORANGE, ph(t, P, 0.5), true], ['???', ORANGE, ph(t, P, 0.8), true], ['explain', ORANGE, ph(t, P, 1.1), true], ['NOW', RED, ph(t, P, 1.4), true],
      ] })
    } },
  { sign: 'taurus', cap: 'Replied “k.” | *Two can play.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: '#a8d86a', lines: [OK(), ['k.', '#a8d86a', ph(t, P, 0.8), true]], size: 36 })
      L(x, 800, 1165, 'ENERGY: MATCHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Screenshotted it | to *six group chats.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      phone(x, 760, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: GOLD, lines: [OK()] })
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.6 + i * 0.15, 0.22, 2.4)
        if (k > 0.01) { x.save(); x.translate(880 + (i % 2) * 40, 640 + i * 70); x.rotate(0.1 * (i % 2 ? 1 : -1)); x.scale(k, k); x.fillStyle = INK; x.fillRect(-46, -30, 92, 60); x.fillStyle = BONE; x.fillRect(-40, -24, 80, 48); x.fillStyle = GREY; x.fillRect(-30, -10, 34, 20); x.restore() }
      }
      L(x, 760, 1165, 'SENT TO: 6 CHATS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Wrote an apology | for *nothing.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = clamp(lt / 1.4)
      drawBits(x, SCROLL.slice(0, Math.max(2, Math.round(13 * g))), { W: CREAM, K: '#9aa5c4' }, 800, 640 + 13 * 22 * 0.5 * Math.min(1, g) , 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 600, 'SO SORRY FOR…', pop01(t, P.t0 + 0.3, 0.3, 2.2), PINK, -0.03, 32)
      L(x, 800, 1165, 'PAGE 4 OF 9', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Assumed it meant | *“you’re perfect.”*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'FAN MAIL', headCol: ORANGE, lines: [OK()] })
      bubble(x, 760, 640, 'they’re in awe.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 400, 820, P.t0 + 1.1, 8, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Finally. | *Proper punctuation.*', mood: lt => lt > 0.9 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: '#a8d86a', lines: [OK()] })
      L(x, 800, 610, 'GRAMMAR: 10/10', pop01(t, P.t0 + 0.9, 0.3, 2.4), '#a8d86a', 0.05, 36)
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'libra', cap: 'Forty drafts. | *Sent none.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(lt * 22))
      for (let i = 0; i < 5; i++) drawBits(x, PAPER, { W: CREAM, K: '#c9a6ff' }, 760 + i * 24, 900 - i * 34, 22 * pop01(t, P.t0 + 0.15 + i * 0.12, 0.25, 2.2), { rot: -0.12 + i * 0.06 })
      L(x, 800, 650, `DRAFTS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.04, 40)
      L(x, 800, 1165, 'SENT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GREY, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Matched the energy. | Replied *“.”*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: LAV, lines: [OK(), ['.', '#ff6b8a', ph(t, P, 1.0), true]], size: 40 })
      L(x, 800, 1165, 'CONVERSATION: OVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Didn’t notice. | Sent *nine memes.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: ORANGE, lines: [OK()] })
      const C = [GOLD, PINK, MINT, SKYB, ORANGE, LAV, '#a8d86a', RED, TEAL]
      for (let i = 0; i < 9; i++) {
        const k = pop01(t, P.t0 + 0.4 + i * 0.13, 0.2, 2.4)
        if (k <= 0.01) continue
        x.save(); x.translate(735 + (i % 3) * 62, 800 + Math.floor(i / 3) * 70); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-28, -28, 56, 56); x.fillStyle = C[i]; x.fillRect(-23, -23, 46, 46)
        x.fillStyle = INK; x.fillRect(-12, -8, 6, 6); x.fillRect(6, -8, 6, 6); x.fillRect(-10, 8, 20, 5)
        x.restore()
      }
      L(x, 800, 1165, 'LOL LOOK AT THIS', pop01(t, P.t0 + 1.6, 0.3, 2.4), ORANGE, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Uses full stops. | *Is the problem.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      phone(x, 290, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SENT', headCol: TEAL, rot: -0.05, lines: [
        ['Noted.', TEAL, ph(t, P, 0.4), true], ['Thanks.', TEAL, ph(t, P, 0.7), true], ['Love you.', TEAL, ph(t, P, 1.0), true],
      ] })
      L(x, 290, 1165, 'TONE: FRIENDLY (?)', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Blamed it on | *Mercury.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 820, 920, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: SKYB, lines: [OK()] })
      drawBits(x, PLANET, { R: '#ff9a4a', Y: GOLD }, 820, 610 + 8 * Math.sin(t * 3), 18 * pop01(t, P.t0 + 0.7, 0.3, 2.2), { rot: -0.2 })
      L(x, 600, 680, 'RETROGRADE?', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.06, 34)
    } },
  { sign: 'pisces', cap: 'Saw “ok.” | Wrote a *sad song.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: LAV, lines: [OK()] })
      if (lt > 0.8) notes(x, t, 540, 640, { n: 5, cell: 8, col: LAV })
      L(x, 800, 650, 'TRACK 1: “OK.”', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0327', key: 'E', accent: '#ff6b8a', ending: 'group',
  title: 'Zodiacs when a text | ends in “.” *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'It was just | *“ok.”*',
    moods: ['wide', 'squint', 'sparkle', 'wide', 'sparkle', 'heart', 'squint', 'wink', 'happy', 'neutral', 'squint', 'wide'],
    draw(x, t, lt) {
      bubble(x, 540, 740, 'ok.', pop01(t, t - lt + 1.4, 0.35, 2.4), { size: 110, tail: 'bc', font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
