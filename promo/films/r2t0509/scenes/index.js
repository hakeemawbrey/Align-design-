// r2t0509: star_talk BELIKE, "Zodiacs at the beep | *be like.*" (signs3kit social cut, music: lofi · D). Ending: callback.
//   ♈ called back before it ended · ♉ will listen to it next year · ♊ plays it at triple speed · ♋ saves every one from
//   Mom · ♌ their greeting is a whole song · ♍ transcribed it, fixed the grammar · ♎ call back or text back? (an hour)
//   · ♏ analysed the tone three times · ♐ mailbox full since forever · ♑ replies with an agenda · ♒ "who leaves
//   voicemails?" · ♓ cries, it said "call me back".   group: "Message received. | Never heard."
//   callback: Taurus, a year later, finally presses play: "Taurus listened. | A year later."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
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
const ACC = '#8fe3ff'
const WAVE = [3, 6, 9, 5, 11, 7, 4, 10, 6, 8, 3, 9, 5, 7]
/** a voicemail card: play triangle + waveform + a time */
function vm(x, cx, cy, k, t, { time = '0:42', bg = SKYB, rot = 0.03, played = 0 } = {}) {
  card(x, cx, cy, 340, 150, k, { rot, bg }, () => {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-145, -24); x.lineTo(-113, 0); x.lineTo(-145, 24); x.fill()
    WAVE.forEach((h, i) => { const hh = h * 4 * (0.75 + 0.25 * Math.sin(t * 6 + i)); x.fillStyle = i / WAVE.length < played ? '#6b3fa0' : INK; x.fillRect(-95 + i * 14, -hh / 2 - 10, 8, hh) })
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, 150, 48)
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Called back | *before it ended.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      vm(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), t, { time: '0:03', played: lt / 0.8 })
      bubble(x, 790, 990, 'WHAT?! WHAT?!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 44, col: '#ff8f6b', tail: 'bl' })
      L(x, 790, 1150, 'RINGS: 0.5', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Will listen to it. | *Next year.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vm(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), t, { time: 'UNPLAYED', bg: BONE })
      L(x, 790, 1040, 'SCHEDULED: 2027', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Plays it | *at triple speed.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vm(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), t * 3, { time: '3×', bg: '#ffe36a', played: (lt * 1.5) % 1 })
      bubble(x, 790, 640, 'heyitsmecallmeback', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 30, tail: 'br' })
      L(x, 790, 1080, 'GOT THE GIST', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Saves every single one | *from Mom.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) vm(x, 790 + i * 14, 760 + i * 70, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), t, { time: 'MOM', bg: i === 2 ? PINK : BONE, rot: 0.03 - i * 0.03 })
      L(x, 790, 1120, 'SAVED: 1,204', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Their greeting | is *a whole song.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’ve reached | the STAR~', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: '#ffb34a', tail: 'bl' })
      notes(x, t, 790, 1000, { n: 5, cell: 8, col: GOLD, alpha: pop01(t, P.t0 + 0.6, 0.3, 2) })
      L(x, 790, 1130, 'LENGTH: 2 MINUTES', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Transcribed it. | *Fixed the grammar.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 }, () => {
        lines(x, ['hey its me', 'call me', 'back k'], { size: 30 })
        x.fillStyle = RED; x.font = `800 34px ${INTER}`; x.textAlign = 'center'
        if (lt > 0.9) x.fillText('’', -2, -52)
        if (lt > 1.2) x.fillText(',', 52, -40)
        if (lt > 1.5) x.fillText('okay.', 70, 58)
      })
      L(x, 790, 1120, 'EDITS: 14', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Call back or text back? | *Still deciding.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      L(x, 690, 760, 'CALL', pop01(t, P.t0 + 0.2, 0.3, 2) * (pick ? 0.9 : 1.2), BONE, -0.05, 46)
      L(x, 890, 900, 'TEXT', pop01(t, P.t0 + 0.4, 0.3, 2) * (pick ? 1.2 : 0.9), BONE, 0.05, 46)
      L(x, 790, 1120, 'TIME ELAPSED: 3 DAYS', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Analyzed the tone. | *Three times.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vm(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), t, { time: 'PLAY #3', bg: '#c97bff', played: (lt / 0.8) % 1 })
      L(x, 790, 1040, 'TONE: SUSPICIOUSLY NICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Mailbox full. | *Since forever.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: RED }, () => lines(x, ['MAILBOX', 'FULL'], { size: 46, color: CREAM }))
      L(x, 790, 1100, 'ALSO: IN ANOTHER COUNTRY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 24)
    } },
  { sign: 'capricorn', cap: 'Replies to it | *with an agenda.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 }, () => lines(x, ['AGENDA', '1. your vm', '2. my reply', '3. Q&A'], { size: 28 }))
      L(x, 790, 1120, 'MEETING: 4:00', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Who leaves voicemails? | *What year is it?*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'a VOICEMAIL? | in this economy?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      L(x, 790, 980, 'STATUS: BAFFLED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Cries. It just said | *“call me back.”*', mood: 'wide', tears: lt => lt < 1 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vm(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), t, { time: '0:04', bg: LAV })
      L(x, 790, 1020, 'SO SWEET OF THEM', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0509', key: 'D', accent: ACC, ending: 'callback',
  title: 'Zodiacs at the beep | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Message received. | *Never heard.*' },
  last: {
    text: 'Taurus listened. | *A year later.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 330, 1080, 300 * k, { mood: lt > 1.4 ? 'wide' : 'sleepy', seed: 7, look: [1, 0], hops: [t0 + 1.4] })
      vm(x, 740, 1060, pop01(t, t0 + 0.5, 0.4, 2), t, { time: '1 YEAR AGO', bg: BONE, played: clamp(prog(lt, 1.0, 3.0)) })
      if (lt > 1.4) bubble(x, 740, 880, '“lunch tomorrow?”', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 36, col: '#ffe36a', tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
