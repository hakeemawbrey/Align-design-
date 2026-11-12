// r2t0507: star_talk SOLO (Gemini), "Geminis texting | *be like.*" (signs3kit social cut, music: lofi · E). Ending: group.
//   twelve texts in one minute · types a paragraph, sends "lol" · replies to a text from last March · three chats at once
//   · an eleven-minute voice note · changes the topic mid-sentence · guesses your sign before you say it · gone a week,
//   then "omg HI!!" · mutes the group chat, still sends the most.   group: "Typing… | Forever." 
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
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
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const S = 'gemini', ACC = '#ffe36a', YEL = '#ffe36a'
/** a typing bubble: three dots bouncing */
function typing(x, cx, cy, k, t, scale = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * scale, k * scale)
  x.fillStyle = INK; x.fillRect(-85, -45, 170, 90); x.fillStyle = BONE; x.fillRect(-80, -40, 160, 80)
  for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 7 - i * 0.9)) * 12; x.fillStyle = '#6b62a8'; x.fillRect(-48 + i * 38, -8 - b, 20, 20) }
  x.restore()
}
const WAVE = [3, 6, 9, 5, 11, 7, 4, 10, 6, 8, 3, 9, 5, 7, 11, 4]

const CAMEOS = [
  { sign: S, cap: 'Twelve texts. | *One minute.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(lt / 0.3))
      ;['hey', 'HEY', 'wait', 'ok so', 'call me??'].forEach((s, i) => { if (i < n) bubble(x, 720 + (i % 2) * 150, 640 + i * 100, s, pop01(t, P.t0 + i * 0.3 * 1.29, 0.2, 2.2), { size: 32, col: i % 2 ? YEL : BONE, tail: i % 2 ? 'br' : 'bl' }) })
      L(x, 790, 1150, 'UNREAD: 12', pop01(t, P.t0 + 1.8, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Types a whole paragraph. | *Sends “lol.”*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.2) typing(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), t, 1.3)
      else bubble(x, 790, 800, 'lol', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.6), { size: 80, col: YEL, tail: 'bl' })
      L(x, 790, 1100, 'DRAFT: 400 WORDS', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Replies to your text | *from last March.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 680, 300, 100, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03, bg: '#2a2350' }, () => lines(x, ['MARCH 14'], { size: 34, color: BONE }))
      bubble(x, 790, 900, 'haha yes!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 48, col: YEL, tail: 'br' })
      L(x, 790, 1120, 'REPLY TIME: 8 MONTHS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Three conversations. | *At once.* All with you.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) phone(x, 660 + i * 130, 880 + (i === 1 ? -40 : 0), pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), () => bubble(x, 0, -60, ['hi', 'hi!', 'hiii'][i], 1, { size: 50, col: i === 1 ? YEL : BONE, tail: 'bl' }), { rot: (i - 1) * 0.12, scale: 0.55 })
      L(x, 790, 1130, 'THREADS: 3. PERSON: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: S, cap: 'Sends a voice note. | *Eleven minutes.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 140, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: YEL }, () => {
        x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-108, 0); x.lineTo(-140, 24); x.fill()
        WAVE.forEach((h, i) => { const hh = h * 4 * (0.7 + 0.3 * Math.sin(t * 6 + i)); x.fillRect(-90 + i * 14, -hh / 2, 8, hh) })
      })
      L(x, 790, 660, '11:04', pop01(t, P.t0 + 0.8, 0.3, 2.4), BONE, -0.05, 48)
      L(x, 790, 1100, 'PART 1 OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Changes the topic | *mid-sentence.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'so then my boss—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      bubble(x, 820, 900, 'WAIT. do fish | get thirsty??', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 34, col: YEL, tail: 'br' })
      L(x, 790, 1130, 'TOPIC #9', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Asks your sign. | *Already guessed it.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      bubble(x, 820, 880, 'jk. virgo.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 46, col: YEL, tail: 'br' })
      L(x, 790, 1110, 'CORRECT. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Gone for a week. | Then *“omg HI!!”*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 790, 680, 'LAST SEEN: 7 DAYS', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 30)
      bubble(x, 790, 900, 'omg HI!!', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 70, col: YEL, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.25, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Mutes the group chat. | *Still sends the most.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 680, 'MUTED', pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4', -0.04, 40)
      const n = Math.floor(clamp(prog(lt, 0.6, 2.2)) * 400)
      card(x, 790, 900, 300, 150, pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.04, bg: YEL }, () => lines(x, ['MSGS SENT', String(n)], { size: 40 }))
      L(x, 790, 1110, 'TOP POSTER: GEMINI', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0507', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Geminis texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Typing… | *Forever.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
