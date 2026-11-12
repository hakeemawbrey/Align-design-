// r2a0539: star_advice, ADVICE ROLLCALL, "Each sign’s | *reason to clean.*" (topic: how each sign finds cleaning
// motivation; shortened to fit two lines). signs3kit social cut, music: lofi · E. Ending: callback.
//   ♈ set a timer and race it · ♉ clean the comfy spot first, then nap there · ♊ call a friend, clean while you chat
//   · ♋ a clean home is a hug for later-you · ♌ the mop is a microphone · ♍ start with one drawer
//   · ♎ pretty, not perfect · ♏ midnight deep clean · ♐ every drawer is an expedition · ♑ tick it off
//   · ♒ hypothesis: socks multiply · ♓ the sad song, cry-cleaning counts
//  group "Clean-ish. | *Proud anyway.*"   callback: "Aries beat the timer. | *Round two.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#8fe3ff'
const MOP = ['..WWW..', '...W...', '...W...', '...W...', '...W...', '...W...', '...W...', '.YYYYY.', 'YYYYYYY', 'Y.Y.Y.Y']
const MOP_C = { W: WOOD, Y: '#c9d4ff' }
const SOCK = ['.KK', '.KK', '.KK', 'KKK', 'KK.']

// a big stopwatch-style timer label: mm:ss counting down from `from` seconds over the card
function timer(x, cx, cy, k, secs, { bg = GOLD } = {}) {
  if (k <= 0.01) return
  const s = Math.max(0, Math.round(secs)), mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0')
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-20, -150, 40, 30); x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = bg; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${mm}:${ss}`, 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Set a timer. | *Race it.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      timer(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 600 - Math.max(0, lt - 0.3) * 160)
      label(x, 800, 1080, 'ROOM VS. ME', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: RED, color: '#fff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Clean the comfy spot first. | *Then nap there.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'pillow', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 920, P.t0 + 0.6, 7, 170, 0.4)
      label(x, 800, 680, 'NAP ZONE: SPOTLESS', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Call a friend. | *Clean while you chat.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '1:24:07', head: 'ON CALL', msg: 'and THEN | she said...', bg: GOLD })
      label(x, 800, 640, 'KITCHEN: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A clean home is | *a hug for later-you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'house', 800, 880, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      hearts(x, t, 800, 820, P.t0 + 0.9, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 2 })
      label(x, 800, 1090, 'FOR: TOMORROW ME', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The mop | *is a microphone.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      drawBits(x, MOP, MOP_C, 780, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 + 0.08 * Math.sin(t * 4) })
      notes(x, t, 820, 760, { n: 4, cell: 7, seed: 3, alpha: pop01(t, P.t0 + 0.6, 0.3, 2) })
      label(x, 800, 650, 'LIVE: DUSTING', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You already want to. | *Start with one drawer.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), op = ease.outCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(800, 920); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = WOOD; x.fillRect(-140, -120, 280, 240)
        x.fillStyle = INK; x.fillRect(-130, -110 + op * 50, 260, 100); x.fillStyle = '#e0b46a'; x.fillRect(-122, -102 + op * 50, 244, 84); x.fillStyle = INK; x.fillRect(-20, -66 + op * 50, 40, 12)
        x.fillStyle = '#b8862e'; x.fillRect(-122, 20, 244, 84); x.fillStyle = INK; x.fillRect(-20, 56, 40, 12)
        x.restore()
      }
      label(x, 800, 650, 'DRAWER 1 OF 1', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Make it pretty, | *not perfect.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'flower', 800, 880, 20 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 800, 650, 'ONE VASE. DONE.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'VIBES: RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Deep clean at midnight. | *Very you.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'moon', 800, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 920, '12:00 AM: SCRUBBING', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 1040, P.t0 + 1.3, 8, 150, 0.3)
      label(x, 800, 1080, 'GROUT: SPARKLING', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Every drawer | *is an expedition.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bits(x, 'key', 320, 760, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.1 })
      label(x, 320, 920, 'FOUND: A KEY?', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 330, 1080, 'what does | it open?!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Tick it off. | *That checkmark hits.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [-1, 0], star: { x: 170 }, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (lt > 1.1 ? '☑' : '☐') + ' dishes | ☐ desk | ☐ floor', { head: 'TODAY', headBg: '#2fc79a', size: 36, w: 280, rot: 0.04 })
      sparkles(x, t, 260, 830, P.t0 + 1.1 * 1.29, 6, 110, 0.4)
      label(x, 320, 1100, 'SO SATISFYING', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Make it a study. | *Do socks multiply?*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.22))
      for (let i = 0; i < n; i++) drawBits(x, SOCK, { K: [PINK, SKYB, MINT, GOLD, LAV][i % 5] }, 700 + (i % 4) * 66, 1060 - Math.floor(i / 4) * 110, 12, { rot: (i - 3) * 0.1 })
      label(x, 800, 680, 'HYPOTHESIS: YES', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Play your feelings song. | *Cry-cleaning counts.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 950, { n: 5, cell: 7, col: SKYB, seed: 1, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      label(x, 800, 660, 'ROOM: CLEAN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04 })
      label(x, 800, 820, 'HEART: ALSO', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0539', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *reason to clean.*',
  cameos: CAMEOS,
  group: { cap: 'Clean-ish. | *Proud anyway.*', moods: ['sparkle', 'sleepy', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'sparkle', 'wide', 'happy'] },
  last: {
    text: 'Aries beat the timer. | *Round two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 360, 1110, 260 * k, { mood: 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 0.9, t - lt + 1.3, t - lt + 1.7, t - lt + 2.1] })
      timer(x, 740, 1090, pop01(t, t - lt + 0.7, 0.35, 2), lt < 1.3 ? 0 : 600 - (lt - 1.3) * 160, { bg: MINT })
      label(x, 740, 1290, 'GO!', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 36, bg: RED, color: '#fff', rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
