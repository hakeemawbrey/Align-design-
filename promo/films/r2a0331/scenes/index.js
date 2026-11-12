// r2a0331: star_advice, ADVICE SOLO, "Gemini, your sign | to call home." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine relatable Gemini truths about keeping in touch, each with a warm reframe and one light
// visual gag. Ending: lesson.
//   0.0–3.6    "Gemini, your sign | *to call home.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              you text everyone, call the one you miss · forty tabs, one says "call mom" · hate calls? voice notes count
//              · missed their call, calling back is enough · they miss your stories (story 12 of 12) · five minutes counts
//              · your chart says curious, ask how they are · home is people · forgot the birthday, late calls still land
//  37.8        "Curious heart. | *Call it home.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "They don’t need perfect. | They *miss your voice.*"  STATUS: CALLED
//  46.9        "Also? | *Gossip* counts."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffe066', PAPER = '#fff4e2'

// ── props
const HANDSET = [
  'GG.......',
  'GGG......',
  'GGG......',
  '.GG......',
  '.GGG.....',
  '..GGG....',
  '...GGG.GG',
  '....GGGGG',
  '......GGG',
]
const HOURGLASS = [
  'WWWWWWWWW',
  '.G.....G.',
  '.GSSSSSG.',
  '..GSSSG..',
  '...GSG...',
  '...GSG...',
  '..G.S.G..',
  '.G..S..G.',
  '.G.SSS.G.',
  'WWWWWWWWW',
]
const HOURGLASS_C = { W: '#c98f5a', G: '#bfe7ff', S: GOLD }
const CAKE = [
  '.....F.....',
  '.....W.....',
  '.....W.....',
  '.PPPPPPPPP.',
  'PpPPpPPpPPp',
  'CCCCCCCCCCC',
  'CCCCCCCCCCC',
  'HHHHHHHHHHH',
  'CCCCCCCCCCC',
  'CCCCCCCCCCC',
]
const CAKE_C = { F: '#ffb34a', W: BONE, P: '#ffc2d6', p: '#ff8fb1', C: '#f4e0b8', H: '#ff4f86' }

// a phone handset in a round green button
function callButton(x, cx, cy, k, col = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 68, 0, Math.PI * 2); x.fill()
  x.restore()
  drawBits(x, HANDSET, { G: '#ffffff' }, cx, cy, 9 * k, { outline: INK })
}
// a stack of browser tabs; the last one glows
function tabs(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  const names = ['recipes', 'flights??', 'quiz: which', 'new hobby', 'call mom']
  const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.22))
  for (let i = 0; i < n; i++) {
    const y = -180 + i * 84, last = i === 4
    x.fillStyle = INK; x.fillRect(-170, y - 6, 340, 72)
    x.fillStyle = last ? GOLD : '#3a3270'; x.fillRect(-164, y, 328, 60)
    x.fillStyle = last ? INK : '#c9c0f0'; x.font = `${last ? 800 : 700} ${last ? 36 : 28}px ${last ? INTER : MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(names[i], -140, y + 32)
    x.fillStyle = last ? INK : '#8a80c0'; x.textAlign = 'right'; x.font = `700 26px ${MONO}`; x.fillText('x', 146, y + 32)
  }
  x.restore()
}
// a voice-note bubble with a waveform
function voiceNote(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 320, h = 104
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = SKYB; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -22); x.lineTo(-130, 22); x.lineTo(-96, 0); x.fill()
  for (let i = 0; i < 17; i++) { const a = 10 + 28 * Math.abs(Math.sin(i * 1.3 + lt * 5)); x.fillRect(-78 + i * 13, -a / 2, 7, a) }
  x.restore()
}
// a little birth chart wheel
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#241a52'; x.beginPath(); x.arc(0, 0, 142, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 142, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 3; x.strokeStyle = 'rgba(242,199,92,0.6)'
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 96, Math.sin(a) * 96); x.lineTo(Math.cos(a) * 142, Math.sin(a) * 142); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(-70, -30); x.lineTo(50, 60); x.lineTo(40, -70); x.closePath(); x.stroke()
  x.restore()
}
// a contact card called HOME
function contact(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -170, 296, 356)
  x.fillStyle = INK; x.fillRect(-156, -186, 312, 360)
  x.fillStyle = PAPER; x.fillRect(-148, -178, 296, 344)
  x.fillStyle = '#ffd6e2'; x.beginPath(); x.arc(0, -70, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOME', 0, 50)
  x.fillStyle = '#6b62a8'; x.font = `700 26px ${MONO}`; x.fillText('ALWAYS PICKS UP', 0, 104)
  x.restore()
  drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, cx, cy - 70 * k, 13 * k)
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'gemini', cap: 'You text everyone. | *Call the one you miss.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', ...S, hops: [1.55],
    front(x, t, lt, P) {
      const words = ['hey!', 'omg', 'lol wait', 'haha']
      words.forEach((w, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2) * (1 - clamp((lt - 1.3) / 0.25)); bubble(x, 760 + (i % 2 ? 60 : -20), 660 + i * 100, w, k, { size: 32, col: LAV, tail: i % 2 ? 'br' : 'bl' }) })
      callButton(x, 790, 860, pop01(t, P.t0 + 1.55, 0.3, 2.2))
      label(x, 790, 1040, 'CALLING GRAN', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'So many tabs open. | One says *“call mom.”*', mood: lt => lt > 1.4 ? 'wide' : 'happy', ...S,
    front(x, t, lt, P) {
      tabs(x, 790, 910, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      if (lt > 1.3) sparkles(x, t, 790, 1080, P.t0 + 1.35, 6, 170, 0.4)
    } },
  { sign: 'gemini', cap: 'Hate phone calls? | *Voice notes count.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', ...S,
    front(x, t, lt, P) {
      voiceNote(x, 780, 880, pop01(t, P.t0 + 0.25, 0.3, 2), lt)
      label(x, 790, 720, 'SENT TO: MOM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'mom: ♡ ♡ ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Missed their call? | *Calling back is enough.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', ...S, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const back = lt > 1.2
      label(x, 790, 700, back ? 'CALLING BACK…' : 'MISSED CALL', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 38, bg: back ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
      callButton(x, 790, 920, pop01(t, P.t0 + 0.4, 0.3, 2) * (1 + 0.05 * Math.sin(lt * 14)), back ? MINT : PINK)
      bubble(x, 790, 1110, 'there you are!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'gemini', cap: 'They miss your stories. | *Every single one.*', mood: 'sparkle', ...S, star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 210 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 560, 640, 'AND then—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.5) * 11)
      label(x, 800, 1160, `STORY ${n} OF 12`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 7 })
    } },
  { sign: 'gemini', cap: 'Busy every weekend? | *Five minutes counts.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, HOURGLASS, HOURGLASS_C, 790, 900, 22 * k, { rot: Math.sin(lt * 2) * 0.05 })
      label(x, 790, 680, '5-MINUTE CALL', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'DAY: MADE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Your chart says curious. | *Ask how they are.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', ...S,
    front(x, t, lt, P) {
      chart(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'CURIOUS: VERY', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'how ARE you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Home isn’t a place. | It’s *your people.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', ...S, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      contact(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      callButton(x, 790, 1130, pop01(t, P.t0 + 1.2, 0.3, 2.2) * 0.75)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Forgot their birthday? | *Late calls still land.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', ...S,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'BELATED', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'you called!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0331', key: 'D', accent: YEL, solo: 'gemini', ending: 'lesson',
  title: 'Gemini, your sign | *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Curious heart. | *Call it home.*', mood: 'heart' },
  lesson: { text: 'They don’t need perfect. | They *miss your voice.*', chip: 'STATUS: CALLED' },
  last: {
    text: 'Also? | *Gossip* counts.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
