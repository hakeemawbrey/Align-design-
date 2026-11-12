// r2t0193: star_talk, SOLO film, "Scorpios in group chats | be like." (~46 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): Scorpio in the group chat, every habit pushed to the max.
//   0.0–3.6    "Scorpios in the group chat | *be like.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              read every message, replied never (SEEN) · typing… for forty minutes (a timer) · screenshots for the archive
//              · muted the chat, still knows everything · one reply: debate over (a gavel) · left the chat, rejoined
//              · a nine-minute voice note, no intro · planned your birthday in a secret chat · read everyone's chart, nailed it
//  37.8        "Says little. | *Notices everything.*"  Scorpio comes back, big.
//  41.2        CALLBACK: "That reply? | *Still typing…*"  The typing bubble from card two comes back, dots still going.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SCO = '#e23d66', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', WOOD = '#8a4a2e'
const S = 'scorpio'

// ── props
const GAVEL = [
  'WWWWWWW.......',
  'WwWWWWW.......',
  'WWWWWWWHHHHHHH',
  'WwWWWWWHHHHHHH',
  'WWWWWWW.......',
]
const GAVEL_C = { W: '#a65d38', w: '#c98f6a', H: '#c98f6a' }
const DOOR = ['DDDDDDDD', 'DddddddD', 'DddddddD', 'DddddddD', 'DdddddYD', 'DddddddD', 'DddddddD', 'DddddddD', 'DDDDDDDD']
const DOOR_C = { D: '#5b2e1a', d: '#a65d38', Y: GOLD }
const LOCK = ['.KKK.', 'K...K', 'K...K', 'YYYYY', 'YYKYY', 'YYKYY', 'YYYYY']
const LOCK_C = { K: '#c9c9d8', Y: GOLD }
const CAMERA = ['..KK......', 'KKKKKKKKKK', 'KGGGKKGGGK', 'KGGKWWKGGK', 'KGGKWWKGGK', 'KGGGKKGGGK', 'KKKKKKKKKK']
const CAMERA_C = { K: '#2a2350', G: '#8a8aa0', W: SKYB }
const BELL_MUTE = ['X...YY....', '.X.YYYY...', '..XYYYYY..', '..YXYYYY..', '..YYXYYY..', '.YYYYXYYY.', 'YYYYYYXYYY', '....YY.X..', '........X.']
const BELL_C = { Y: GOLD, X: RED }

// the group chat phone, with messages and SEEN ticks
function chatPhone(x, cx, cy, k, { head = 'THE GROUP (12)', lines = [], foot = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = SCO; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = CREAM; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -70 + i * 58); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  if (foot) { x.fillStyle = MINT; x.font = `700 22px ${MONO}`; x.fillText(foot, 0, 150) }
  x.restore()
}
// a typing bubble with three bouncing dots
function typing(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -56, 232, 112); x.fillRect(-110, -62, 220, 124)
  x.fillStyle = BONE; x.fillRect(-110, -56, 220, 112)
  x.fillStyle = INK; x.fillRect(-90, 56, 24, 18); x.fillStyle = BONE; x.fillRect(-86, 52, 16, 14)
  for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 6 - i * 0.8)) * 14; x.fillStyle = '#6b62a8'; x.fillRect(-58 + i * 46, -12 - b, 24, 24) }
  x.restore()
}
// a voice-note bar: a long waveform and its length
function voiceNote(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -60, 400, 120); x.fillStyle = LAV; x.fillRect(-192, -52, 384, 104)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -22); x.lineTo(-136, 0); x.lineTo(-170, 22); x.fill()
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 26)
  for (let i = 0; i < n; i++) { const h = 10 + Math.abs(Math.sin(i * 1.9 + t * 3)) * 34; x.fillStyle = '#4a3a8a'; x.fillRect(-120 + i * 11, -h / 2, 6, h) }
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('9:04', 150, 84)
  x.restore()
}
// a filing box labelled ARCHIVE, screenshots dropping in
function archive(x, t, lt, P) {
  const k = pop01(t, P.t0 + 0.2, 0.3, 2)
  if (k <= 0.01) return
  x.save(); x.translate(790, 960); x.scale(k, k)
  for (let i = 0; i < 4; i++) {
    const d = prog(lt, 0.5 + i * 0.3, 0.8 + i * 0.3)
    if (d > 0 && d < 1) { x.fillStyle = INK; x.fillRect(-36 + (i % 2) * 20, -320 + d * 260, 72, 110); x.fillStyle = SKYB; x.fillRect(-30 + (i % 2) * 20, -314 + d * 260, 60, 98) }
  }
  x.fillStyle = INK; x.fillRect(-150, -76, 300, 170); x.fillStyle = WOOD; x.fillRect(-142, -68, 284, 154)
  x.fillStyle = CREAM; x.fillRect(-90, -30, 180, 56)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ARCHIVE', 0, 0)
  x.restore()
}
// a little birth chart wheel with green ticks
function charts(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 152, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#6b62a8'; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 104, Math.sin(a) * 104); x.lineTo(Math.cos(a) * 152, Math.sin(a) * 152); x.stroke() }
  const n = Math.floor(clamp((lt - 0.5) / 1.2) * 12)
  for (let i = 0; i < n; i++) {
    const a = (i + 0.5) / 12 * Math.PI * 2, px = Math.cos(a) * 128, py = Math.sin(a) * 128
    x.fillStyle = '#2fc79a'; x.fillRect(px - 9, py, 6, 8); x.fillRect(px - 4, py + 4, 6, 6); x.fillRect(px + 1, py - 6, 6, 12); x.fillRect(px + 6, py - 12, 6, 8)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Reads every message. | Replies *never.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const M = [['plans tonight?', LAV], ['scorpio??', MINT], ['hello??', ORANGE], ['you there?', SKYB]]
      chatPhone(x, 770, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { lines: M.map(([s, c], i) => [s, c, pop01(t, P.t0 + 0.4 + i * 0.3, 0.25, 2.2)]), foot: lt > 1.6 ? 'SEEN BY SCORPIO' : '' })
    } },
  { sign: S, cap: 'Typing… | for *forty minutes.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 1], star: { x: -200 }, hops: [],
    front(x, t, lt, P) {
      typing(x, t, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = Math.floor(clamp((lt - 0.4) / 1.8) * 40)
      label(x, 780, 1050, `${String(m).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 48, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Screenshots *everything.* | For the archive.', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P, F) {
      drawBits(x, CAMERA, CAMERA_C, F.x + 60, F.top - 50, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      archive(x, t, lt, P)
      if (Math.floor(lt * 4) % 2 === 0 && lt > 0.5 && lt < 1.6) { x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(110, 480, 860, 740) }
    } },
  { sign: S, cap: 'Muted the chat. | Still *knows everything.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, BELL_MUTE, BELL_C, 790, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1060, 'congrats on the job!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 610, 'MUTED · INFORMED', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One reply. | *Debate over.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.15],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'pineapple on pizza?!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'bc' })
      const sw = lt < 1.0 ? -0.6 + 0.6 * Math.sin(clamp(lt / 1.0) * Math.PI / 2) : 0.35 * Math.exp(-(lt - 1) * 6)
      drawBits(x, GAVEL, GAVEL_C, 800, 880, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: sw })
      label(x, 780, 1080, 'CASE CLOSED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SCO, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 920, P.t0 + 1.05, 7, 140, 0.4)
    } },
  { sign: S, cap: 'Left the chat. | *Rejoined.* Twice.', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const open = Math.abs(Math.sin(lt * 2.4))
      drawBits(x, DOOR, DOOR_C, 790, 860, 32 * k, { sx: lerp(1, 0.25, open) })
      const msg = Math.floor(lt * 1.6) % 2 ? 'SCORPIO JOINED' : 'SCORPIO LEFT'
      label(x, 790, 1100, msg, k, { size: 32, bg: Math.floor(lt * 1.6) % 2 ? MINT : ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Voice note: | *nine minutes.* No hello.', mood: lt => lt > 0.6 ? 'squint' : 'neutral', star: { x: 0, y: 90, s: 260 }, hops: [1.6],
    front(x, t, lt, P) {
      voiceNote(x, t, 540, 620, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 820, 1100, 'PART 1 OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned your birthday. | In a *secret chat.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const M = [['cake: done', MINT], ['balloons: 40', PINK], ['tell NO ONE', SCO]]
      chatPhone(x, 770, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SECRET (11)', lines: M.map(([s, c], i) => [s, c, pop01(t, P.t0 + 0.5 + i * 0.35, 0.25, 2.2)]) })
      drawBits(x, LOCK, LOCK_C, 660, 640, 12 * pop01(t, P.t0 + 0.3, 0.3, 2.2))
      hearts(x, t, 420, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Read everyone’s chart. | *Nailed* every one.', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.7],
    front(x, t, lt, P) {
      charts(x, t, 780, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1080, 'ACCURACY: SCARY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0193', key: 'G', accent: SCO, solo: S, ending: 'callback',
  title: 'Scorpio group chats | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Says little. | *Notices everything.*', mood: 'squint' },
  last: {
    text: 'That reply? | *Still typing…*',
    draw(x, t, lt) {
      typing(x, t, 540, 960, 2.1 * pop01(t, t - lt + 0.5, 0.35, 2))
      signChar(x, t, S, 760, 1230, 230, { mood: 'squint', look: [-1, -1], pop: pop01(t, t - lt + 0.7, 0.4, 2), seed: 51, glyph: false })
      label(x, 380, 1220, '41:00', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 50, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
