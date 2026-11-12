// r2t0157: star_talk ROLLCALL, "The signs | *answering emails.*" (~54 s vertical, signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each answering email in the most extreme way:
//   ♈ replied before you hit send · ♉ the unread pile is a pillow now · ♊ twelve drafts open, zero sent · ♋ signs off
//   "hugs" to the landlord · ♌ reply-all, every time · ♍ fixed the typo in YOUR email · ♎ draft nine, still unsent
//   · ♏ one word: "noted." · ♐ out of office, permanently · ♑ inbox zero before sunrise · ♒ answers emails from years
//   ago · ♓ cried at a newsletter
//  49.2   ending (group): "Per my last email. | *Love, everyone.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#7aa8ff', RED = '#e23d4e', ORANGE = '#ffb34a'
const ST = { x: -170 }

const ENVELOPE = [
  'WWWWWWWWWWWWWW',
  'WKWWWWWWWWWWKW',
  'WWKWWWWWWWWKWW',
  'WWWKWWWWWWKWWW',
  'WWWWKKWWKKWWWW',
  'WWWWWWKKWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
]
const ENV_C = { W: BONE, K: '#9aa5c4' }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800, align = 'center') {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
// an email window: a blue title bar with the subject, then grey text lines (or a body string)
function mail(x, cx, cy, k, subject, { w = 320, h = 260, body = null, bodySize = 34, rot = 0.03, lines = 4 } = {}) {
  if (!sheet(x, cx, cy, w, h, BONE, k, rot)) return
  x.fillStyle = BLUE; x.fillRect(-w / 2, -h / 2, w, 56)
  txt(x, subject, 0, -h / 2 + 30, 26, INK, MONO, 700)
  if (body) txt(x, body, 0, 30, bodySize, INK, INTER, 800)
  else { x.fillStyle = '#b9b0a0'; for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 28, -h / 2 + 84 + i * 40, (i === lines - 1 ? 0.5 : 0.85) * (w - 56), 16) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Replied before | you *hit send.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      mail(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'RE: RE: RE: RE:', { body: 'DONE!!', bodySize: 52 })
      label(x, 790, 1060, 'SENT 0.2 SEC AGO', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The unread pile? | *A pillow now.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: -20 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 6; i++) drawBits(x, ENVELOPE, ENV_C, 370 + (i % 2) * 30 - 15, 1120 - i * 30, 16 * k, { rot: (i % 3 - 1) * 0.08 })
    },
    front(x, t, lt, P) {
      label(x, 780, 850, 'UNREAD: SO MANY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Twelve drafts open. | *Zero sent.*', mood: 'wide', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 5)
      for (let i = 0; i < n; i++) mail(x, 740 + i * 24, 700 + i * 50, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2), `DRAFT ${i + 1}`, { w: 260, h: 200, lines: 2, rot: (i % 2 ? 0.05 : -0.04) })
    } },
  { sign: 'cancer', cap: 'Emails the landlord. | Signs off *“hugs.”*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mail(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'RE: THE SINK', { body: 'hugs, Cancer', bodySize: 38 })
      hearts(x, t, 790, 660, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Reply-all. | *Every single time.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      label(x, 790, 820, '✦ REPLY ALL ✦', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      const n = Math.floor(clamp((lt - 0.8) / 1.2) * 6)
      for (let i = 0; i < n; i++) drawBits(x, ENVELOPE, ENV_C, 660 + (i % 3) * 120, 980 + Math.floor(i / 3) * 90, 7, { rot: (i % 2 ? 0.1 : -0.1) })
      bubble(x, 790, 640, 'you’re welcome', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Fixed the typo | in *your* email.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 790, 820, 330, 260, BONE, k, 0.03)) {
        x.fillStyle = BLUE; x.fillRect(-165, -130, 330, 56); txt(x, 'FROM: YOU', 0, -100, 26, INK, MONO, 700)
        txt(x, 'see you tomorow', 0, 10, 36, INK)
        if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(70, 10, 92, 34, 0, 0, Math.PI * 2); x.stroke(); txt(x, 'tomorrow*', 40, 80, 34, RED, INTER, 800) }
        x.restore()
      }
      label(x, 790, 1060, 'SENT BACK. FIXED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Draft nine. | *Still unsent.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 8)
      mail(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), `DRAFT ${v}`, { body: v % 2 ? 'Hi!!' : 'Hello :)', bodySize: 48 })
      bubble(x, 790, 640, 'too friendly?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Replied with one word: | *“noted.”*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mail(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'RE: QUICK Q', { body: 'noted.', bodySize: 64 })
      label(x, 790, 1060, 'CHILLING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Out of office. | *Permanently.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 860, 640, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      mail(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'AUTO-REPLY', { body: 'back: someday', bodySize: 38 })
    } },
  { sign: 'capricorn', cap: 'Inbox zero. | *Before sunrise.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(0, 99 - Math.floor(clamp((lt - 0.2) / 1.2) * 99))
      label(x, 790, 820, `INBOX: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: n ? BONE : MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, '5:12 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Answers emails | from *years ago.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mail(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'RE: (VERY OLD)', { body: 'sounds good!', bodySize: 42 })
      label(x, 790, 1040, 'ANSWERED. FINALLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | a *newsletter.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mail(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'WEEKLY UPDATE', { body: 'you matter!', bodySize: 44 })
      bubble(x, 800, 1050, 'so beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0157', key: 'E', accent: BLUE, ending: 'group',
  title: 'The signs | *answering emails.*',
  cameos: CAMEOS,
  group: {
    cap: 'Per my last email. | *Love, everyone.*',
    draw(x, t, lt) {
      label(x, 540, 720, 'RE: RE: RE: RE: RE:', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: BLUE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
