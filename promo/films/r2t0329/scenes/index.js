// r2t0329: star_talk, BE LIKE, "Long wifi code? | Zodiacs be like." (signs3kit social cut, music: lofi · D). Ending: lesson.
//   ♈ guessed seven times in one second · ♉ doesn't need wifi, has snacks · ♊ read it aloud to the whole party
//   · ♋ already wrote it on a welcome card · ♌ renamed the wifi after themself · ♍ all 40 characters, first try
//   · ♎ asked someone else to type it · ♏ guessed it from the host's sign · ♐ on the neighbour's wifi
//   · ♑ made the password: 64 characters · ♒ built their own router · ♓ the password was "friendsforever", sobbing
//   Lesson: "Stay connected. | To each other." · Last: "Plot twist: | the wifi was down."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** the wifi symbol: three arcs and a dot, n arcs lit */
function wifi(x, cx, cy, s, k, { n = 3, col = SKYB, off = '#4a4070' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s); x.lineCap = 'butt'
  for (let i = 0; i < 3; i++) {
    const r = 40 + i * 36
    x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.arc(0, 0, r, -Math.PI * 0.75, -Math.PI * 0.25); x.stroke()
    x.strokeStyle = i < n ? col : off; x.lineWidth = 16; x.beginPath(); x.arc(0, 0, r, -Math.PI * 0.75, -Math.PI * 0.25); x.stroke()
  }
  x.fillStyle = INK; x.fillRect(-16, -16, 32, 32); x.fillStyle = n > 0 ? col : off; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 56); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a card / note with lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', w = 300, h = 220, size = 30, head = null, headBg = PINK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  let y0 = 0
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText(head, 0, -h / 2 + 26); y0 = 25 }
  x.fillStyle = INK; x.font = `700 ${size}px ${MONO}`
  lines.forEach((l, i) => x.fillText(l, 0, y0 + (i - (lines.length - 1) / 2) * size * 1.3))
  x.restore()
}
const CHIPS = ['..KKKKKK..', '.KYYYYYYK.', 'KYYRRYYYYK', 'KYYYYYRYYK', 'KYRYYYYYYK', 'KYYYYRYYYK', 'KYYYYYYYYK', '.KKKKKKKK.']
const ROUTER = ['K.......K.', 'K.......K.', 'K.......K.', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSGSRSGSSK', 'KSSSSSSSSK', 'KKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Guessed seven times | in *one second.*', mood: 'wide', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(lt * 5))
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'WIFI', headCol: ORANGE, lines: [['********', GREY, 1], ['WRONG', RED, n >= 1 ? 1 : 0], ['WRONG', RED, n >= 3 ? 1 : 0], ['WRONG', RED, n >= 5 ? 1 : 0], ['WRONG', RED, n >= 7 ? 1 : 0]] })
      L(x, 800, 1160, `ATTEMPTS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Doesn’t need wifi. | *Has snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wifi(x, 800, 720, 1, pop01(t, P.t0 + 0.15, 0.3, 2), { n: 0 })
      drawBits(x, CHIPS, { K: INK, Y: GOLD, R: ORANGE }, 800, 930, 18 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { rot: 0.08 })
      L(x, 800, 1150, 'SIGNAL: IRRELEVANT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Read it aloud | to *the whole party.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const W = ['capital Q…', '7, hashtag…', 'lowercase z…', 'SEVEN again…']
      bubble(x, 790, 650, W[Math.min(3, Math.floor(lt * 1.8))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      ;['leo', 'libra', 'aries'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.7 + i * 0.15, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 690 + i * 120, 960 - (i % 2) * 40, 130 * k, { mood: 'squint', look: [-1, 0], seed: 70 + i, glyph: false })
      })
    } },
  { sign: 'cancer', cap: 'Already wrote it | on a *welcome card.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['wifi: Home4u!', 'snacks: fridge', 'love you ♡'], { bg: CREAM, w: 330, h: 260, size: 28, head: 'WELCOME!', headBg: SKYB, rot: 0.04 })
      hearts(x, t, 800, 720, P.t0 + 1.1, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Renamed the wifi | *after themself.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      wifi(x, 800, 720, 1, pop01(t, P.t0 + 0.15, 0.3, 2), { n: 3, col: GOLD })
      L(x, 800, 900, 'LEO_IS_ICONIC_5G', pop01(t, P.t0 + 0.8, 0.3, 2.4), ORANGE, -0.03, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 200, 0.3)
      L(x, 800, 1060, 'PASSWORD: “BOW”', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'All 40 characters. | *First try.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = 'xK9#qP2!mZ7$vL4&'
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'WIFI', headCol: '#a8d86a', lines: [[s.slice(0, Math.min(14, Math.floor(lt * 14))) || ' ', GREY, 1], ['CONNECTED.', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.4)]], size: 22 })
      L(x, 800, 1160, 'TYPOS: 0. OBVIOUSLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#a8d86a', 0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked someone else | *to type it.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(clamp((lt - 0.4) / 0.6))
      phone(x, lerp(620, 800, p), 860, 0.7 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'WIFI', headCol: PINK, rot: lerp(-0.2, 0.05, p) })
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 880, 1020, 150 * k, { mood: 'squint', look: [-1, -1], seed: 77, glyph: false })
      bubble(x, 760, 620, 'you’re so good at this', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Guessed it from | the *host’s sign.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'host’s a Virgo?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 830, '“Organised1!”', pop01(t, P.t0 + 0.8, 0.3, 2.4), CREAM, 0.03, 40)
      L(x, 800, 980, 'CONNECTED. CHILLS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Skipped it. | On *the neighbour’s wifi.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.1],
    front(x, t, lt, P) {
      wifi(x, 800, 720, 1, pop01(t, P.t0 + 0.15, 0.3, 2), { n: 1 + Math.floor(lt * 2) % 3, col: ORANGE })
      L(x, 800, 900, 'NEIGHBOUR_GUEST', pop01(t, P.t0 + 0.7, 0.3, 2.4), ORANGE, -0.04, 34)
      L(x, 800, 1050, 'NO PASSWORD. WIN.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Made the password. | It’s *64 characters.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      note(x, 300, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['7xQ!9vK#pL2', '$mR8&zT4wN', '0^bY6@cH1j', '…and 33 more'], { w: 330, h: 300, size: 28, rot: -0.05 })
      L(x, 300, 1110, 'SECURITY: MAXIMUM', pop01(t, P.t0 + 1.4, 0.3, 2.4), TEAL, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Built their own | *router.* From a toaster.', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, ROUTER, { K: INK, S: '#9aa5c4', G: MINT, R: lt * 4 % 2 > 1 ? RED : MINT }, 800, 900, 22 * k)
      if (lt > 0.8) wifi(x, 800, 760, 0.7, pop01(t, P.t0 + 0.8, 0.3, 2.2), { n: 3, col: MINT })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 6, 150, 0.6, [MINT, SKYB, BONE])
      L(x, 800, 1110, 'SPEED: ALIEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Password: “friendsforever.” | *Sobbing.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['friends', 'forever'], { bg: '#e6dcff', w: 300, h: 200, size: 40, head: 'WIFI', headBg: LAV, rot: 0.05 })
      hearts(x, t, 800, 760, P.t0 + 0.9, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 12 })
      L(x, 800, 1060, 'IT’S SO BEAUTIFUL', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0329', key: 'D', accent: '#8fe3ff', ending: 'lesson',
  title: 'Long wifi code? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero bars.*', moods: ['wide', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'wink', 'wink', 'happy', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'Stay connected. | *To each other.*', chip: 'SIGNAL: STRONG' },
  last: { text: 'Plot twist: | *the wifi was down.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
