// r2t0071: star_talk, BELIKE, "Mispronounce it? | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each one's most extreme reaction when someone says a word wrong.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ corrected you before you finished · ♉ will say it wrong forever now · ♊ already told the group chat
//              · ♋ wrote it down, it's cute · ♌ said it right, took a bow · ♍ brought the dictionary, highlighted it
//              · ♎ said it wrong too so you'd match · ♏ said nothing, filed it · ♐ laughed so hard they fell over
//              · ♑ sent a memo · ♒ argued your way is more correct · ♓ cried for you
//  49.2        "One little word. | *Twelve reactions.*"
//  52.4        LESSON UNLOCKED: "Everyone gets words wrong. | Be *gentle.*"  VIBES: KIND
//  58.3        "It’s *espresso.* | We still love you."  A little espresso cup, steaming.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e', ORANGE = '#ffb34a'

// ── props
const CUP = ['.S..S..', '..S..S.', '.S..S..', 'WWWWWWW..', 'WCCCCCWWW', 'WWWWWWW.W', 'WWWWWWWWW', '.WWWWW...', 'PPPPPPPP.']
const CUP_C = { S: '#d8dbe8', W: CREAM, C: BROWN, P: '#c9c9d8' }
const BOOK = ['RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RWGGGGGGGGWR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR', 'CCCCCCCCCCCC']
const BOOK_C = { R: '#5b3ea8', W: CREAM, G: GOLD, C: '#c9c9d8' }

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = CREAM } = {}) {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
function lines(x, arr, y0, gap, { size = 30, font = INTER, weight = 800, color = INK, cols } = {}) {
  x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => { x.fillStyle = cols ? cols[i] : color; x.font = `${weight} ${size}px ${font}`; x.fillText(s, 0, y0 + i * gap) })
}
// a phone with group-chat messages popping in
function chat(x, t, cx, cy, k, lt, msgs) {
  if (k <= 0.01) return
  x.save(); sheet(x, cx, cy, 300, 440, k, { rot: 0.04, bg: '#2a2350' })
  x.fillStyle = '#140c30'; x.fillRect(-134, -196, 268, 380)
  x.fillStyle = SKYB; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('GROUP CHAT', 0, -170)
  msgs.forEach((m, i) => {
    const kk = clamp((lt - 0.4 - i * 0.4) / 0.2); if (kk <= 0) return
    x.save(); x.globalAlpha *= kk
    const y = -110 + i * 96
    x.fillStyle = i % 2 ? PINK : MINT; x.fillRect(-118, y - 34, 236, 72)
    x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textBaseline = 'middle'; x.fillText(m, 0, y + 2)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Corrected you | *mid-sentence.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', look: [1, 0], star: { x: -180 }, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 640, '“an expres—”', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 760, 860, 'ESPRESSO.', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 60, col: GOLD, tail: 'bl' })
      label(x, 790, 1090, 'INTERRUPTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Will say it wrong | *forever now.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'liberry.', pop01(t, P.t0 + 0.3, 0.25, 2), { size: 56, tail: 'bl' })
      label(x, 790, 960, 'IT’S CANON NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Already told | the *group chat.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      chat(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt, ['“pacific-ly”', 'NO WAY', 'screenshot.'])
    } },
  { sign: 'cancer', cap: 'Thought it was cute. | *Wrote it down.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); sheet(x, 790, 850, 320, 380, k, { rot: -0.04 })
      x.fillStyle = PINK; x.fillRect(-160, -190, 320, 70)
      lines(x, ['CUTE THINGS', 'YOU SAY'], -168, 30, { size: 24, font: MONO, weight: 700 })
      const n = Math.floor(clamp((lt - 0.5) / 0.9) * 3)
      lines(x, ['“pasghetti”', '“aminal”', '“expresso”'].slice(0, n), -60, 80, { size: 36, color: '#5b3ea8' })
      x.restore()
      hearts(x, t, 790, 700, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Said it right. | *Took a bow.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', squash: lt => lt > 1.1 && lt < 1.8 ? 0.14 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'pa-PRI-ka.', pop01(t, P.t0 + 0.25, 0.25, 2), { size: 50, tail: 'bl' })
      label(x, 790, 980, 'BRAVO! BRAVO!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Brought the dictionary. | *Highlighted it.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOOK, BOOK_C, 790, 800, 26 * k, { rot: 0.05 })
      label(x, 790, 1050, 'p. 412: KEEN-WAH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Said it wrong too | so *you’d match.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 660, '“nuk-yoo-ler”', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 760, 860, '“nuk-yoo-ler!”', pop01(t, P.t0 + 0.8, 0.25, 2), { size: 40, col: PINK, tail: 'bl' })
      label(x, 790, 1080, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Filed it away.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(790, 850); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-176, -146, 150, 50); x.fillRect(-176, -116, 352, 262)
      x.fillStyle = '#c98f2a'; x.fillRect(-170, -140, 138, 44); x.fillRect(-170, -110, 340, 250)
      x.fillStyle = CREAM; x.fillRect(-140, -70, 280, 120)
      lines(x, ['“EXPRESSO”', 'SAVED FOR LATER'], -34, 52, { size: 30, font: MONO, weight: 700 })
      x.restore()
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | they *fell over.*', mood: 'happy', squash: lt => lt > 1.4 ? 0.22 : 0, star: { x: -180 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 6)
      for (let i = 0; i < n; i++) bubble(x, 700 + (i % 2) * 160 + Math.sin(i * 3) * 20, 640 + i * 90, 'HA', 1, { size: 36 + i * 5, col: i % 2 ? GOLD : BONE, tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: 'capricorn', cap: 'Sent a memo. | *Re: that word.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); sheet(x, 790, 850, 330, 400, k, { rot: 0.03 })
      lines(x, ['MEMO'], -150, 0, { size: 44, font: MONO, weight: 700 })
      lines(x, ['RE: “supposably”', '', 'see attached.'], -70, 52, { size: 28, color: '#3a3360' })
      x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(-120, 70 + i * 28, 240 - i * 50, 10)
      x.restore()
      label(x, 790, 1100, 'CC: EVERYONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Argued your way | is *more correct.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); sheet(x, 790, 820, 350, 280, k, { rot: -0.03, bg: '#2f5a44' })
      x.strokeStyle = '#c98f2a'; x.lineWidth = 12; x.strokeRect(-175, -140, 350, 280)
      lines(x, ['WORDS ARE', 'MADE UP.', 'YOURS TOO.'], -70, 64, { size: 36, color: CREAM, font: MONO, weight: 700 })
      x.restore()
      label(x, 790, 1060, 'A WHOLE THEORY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You said it wrong. | Pisces *cried for you.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it’s okay!!', pop01(t, P.t0 + 0.5, 0.25, 2), { size: 48, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0071', key: 'C', accent: SKYB, ending: 'lesson',
  title: 'Mispronounce it? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One little word. | *Twelve reactions.*' },
  lesson: { text: 'Everyone gets words wrong. | Be *gentle.*', chip: 'VIBES: KIND' },
  last: {
    text: 'It’s *espresso.* | We still love you.',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, CUP, CUP_C, 540, 740, 20 * k, { rot: 0.04 * Math.sin(t * 2) })
      sparkles(x, t, 540, 740, t - lt + 0.9, 7, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
