// kpmee03: PLANET TALK · MERCURY to GEMINI, "Two Chats, One Feeling" (72 s vertical, star_talk, LONG · home sign, pop · A).
// In astrology Mercury rules Gemini. Gemini answers forty chats in a minute and dodges the only one that matters.
// Hard cut.
//   0.00  frame 0: Gemini's chat list fills the screen, notification banners flying off it; Mercury mid-crash down
//         through the notification shade. Slam "GEMINI. | Forty chats. *One* matters." Whip on frame 0, glitch at 0.9.
//   2.70  promise sticker: "wait for *the one text.*"
//   3.20  CH1 FORTY CHATS: the bedroom; Gemini replies to 39 chats at speed (counter) · Mercury impressed · caught: the
//         one unread thread (Rowan) · "that one's… different." · Mercury: "different how?" / "oh." / "*OH.*"
//  18.00  CH2 THE DODGE: Rowan "can I ask you something real?" → Gemini sends a joke, a link, a joke · Mercury's
//         confession: "I talk fast" / "so I don't have to *feel* slow." · retrograde gag: "it's a *lens*, not an excuse."
//  34.00  CH3 FIVE DRAFTS: drafts typed and deleted · glitch · Pisces's voice note in the group chat, sobbing "just
//         TELL them" · Mercury: "breathe." / "say the *true* thing." / "then stop typing."
//  51.00  CH4 THE REAL TEXT: Mercury goes quiet (tape stop); typed slowly: "I like talking to you more than anyone.
//         Dinner Friday?" → waiting bar → "me too." / "dinner. yes." · Pisces on the call, happy-sobbing ·
//         achievement · slam "One chat. One feeling. | *Send.*" 70.9, hard cut at 72.
import { film, track, merc, sign, room, bed, phone, burst, label, hearts, box, entrance, drawEntranceFx, entranceCues, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO } from '../../kpmee01/mercurykit.js'

export const DURATION = 72
const IN = { at: -0.25, len: 0.7, x: 760, y: 700, size: 330 }
const LAND = entrance('crash', 0, IN).land
const BEDROOM = { wall: '#2a2a5a', wall2: '#161636', floor: '#33305c', win: { x: 620, y: 330, w: 340, h: 360 }, lamp: { x: 200, y: 950, k: 0.7 } }
const GEM = '#f5d66b'

const MK = [
  [LAND, { x: 760, y: 700, size: 330, mood: 'wide' }],
  [3.2, { x: 780, y: 760, size: 310, mood: 'wide' }],
  [6.0, { mood: 'happy' }],
  [10.0, { mood: 'sly' }],
  [13.6, { mood: 'wide' }],
  [15.6, { mood: 'love' }],
  [25.0, { x: 760, y: 780, size: 310, mood: 'sad' }],
  [27.0, { mood: 'neutral' }],
  [30.0, { mood: 'sly' }],
  [47.0, { x: 760, y: 780, mood: 'neutral' }],
  [48.5, { mood: 'happy' }],
  [64.0, { x: 780, y: 720, size: 300, mood: 'happy' }],
  [66.0, { x: 230, y: 520 }, 'lin'],
  [66.5, { x: 900, y: 430 }, 'lin'],
  [67.0, { x: 780, y: 720, mood: 'proud' }, 'out'],
]
const GK = [
  [0, { x: 320, y: 1110, size: 300, mood: 'wide', look: [0, 1] }],
  [3.2, { mood: 'squint', look: [0.2, 1] }],
  [12.0, { mood: 'neutral', look: [1, -0.4] }],
  [14.0, { mood: 'wide', look: [1, -0.5] }],
  [16.0, { mood: 'heart', look: [0, 0] }],
  [25.0, { mood: 'squint', look: [1, -0.3] }],
  [29.5, { mood: 'eyeroll' }],
  [31.0, { mood: 'wink', look: [1, -0.3] }],
  [47.0, { mood: 'neutral', look: [1, -0.4] }],
  [49.5, { mood: 'sparkle' }],
  [64.0, { mood: 'happy', look: [0, 0] }],
]
const GHOPS = [0.5, 3.4, 4.0, 4.6, 5.2, 5.8, 6.4, 7.0, 12.1, 14.1, 16.1, 29.6, 31.1, 47.2, 49.6, 64.1, 64.5, 64.9, 65.3, 67.2]

// ── the chat list (CH1)
const THREADS = [
  ['Mo', 'lol same', '#f0603a'], ['climbing club', 'who’s in sat?', '#5fd38a'], ['Aunt Dee', 'call me back hun', '#e9b24a'],
  ['Rowan', 'hey :) you around?', '#ff8fb1'], ['Tali', 'did you see this', '#7fd0f0'], ['book club', 'chapter 9!!', '#c9a6ff'],
  ['Sky', 'omw', '#f2c75c'], ['Ines', 'HAHAHA', '#3f7cf0'], ['work group', 'quick one', '#9fe6b0'], ['Kit', 'brunch?', '#f39a3a'],
]
const ROWAN = 3
function chatList(x, t, { cx = 540, cy = 1000, s = 1, rot = 0, replied = 0, scroll = 0 }) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -310, -520, 620, 1040, '#2b2350', { r: 62, b: 12 })
  x.fillStyle = '#0f0a26'; x.beginPath(); x.roundRect(-288, -498, 576, 996, 46); x.fill()
  x.save(); x.beginPath(); x.roundRect(-288, -498, 576, 996, 46); x.clip()
  x.fillStyle = '#1b1440'; x.fillRect(-288, -498, 576, 130)
  label(x, 'chats', -250, -430, { size: 44, align: 'left', stroke: null })
  label(x, `${Math.max(1, 40 - Math.floor(replied))} unread`, 250, -430, { size: 26, font: MONO, weight: 700, col: GOLD, align: 'right', stroke: null })
  for (let i = 0; i < 12; i++) {
    const th = THREADS[i % THREADS.length], y = -340 + i * 92 - scroll
    if (y < -420 || y > 520) continue
    const done = i !== ROWAN && replied > i * 3.6
    x.fillStyle = i === ROWAN ? 'rgba(255,143,177,0.12)' : 'rgba(0,0,0,0)'; x.fillRect(-288, y - 44, 576, 88)
    x.fillStyle = INK; x.beginPath(); x.arc(-232, y, 32, 0, Math.PI * 2); x.fill()
    x.fillStyle = th[2]; x.beginPath(); x.arc(-232, y, 27, 0, Math.PI * 2); x.fill()
    x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(th[0], -180, y - 16)
    x.font = `600 24px ${INTER}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText(done ? 'you: haha yes!!' : th[1], -180, y + 18)
    if (!done) { x.fillStyle = i === ROWAN ? PINK : GOLD; x.beginPath(); x.arc(240, y, 20, 0, Math.PI * 2); x.fill(); label(x, i === ROWAN ? '2' : String(1 + (i % 4)), 240, y + 1, { size: 22, col: INK, stroke: null }) }
    else label(x, '✓✓', 240, y, { size: 24, col: '#9fe6b0', stroke: null })
    x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(-200, y + 45, 488, 2)
  }
  x.restore(); x.restore()
}
function flyingBanners(x, t) {
  for (let i = 0; i < 7; i++) {
    const p = prog(t, -0.6 + i * 0.12, 1.0 + i * 0.12)
    if (p <= 0 || p >= 1) continue
    const ang = -1.2 + i * 0.4, d = ease.outCubic(p) * 900
    x.save(); x.translate(540 + Math.cos(ang) * d, 900 + Math.sin(ang) * d * 0.7 - 200); x.rotate(ang * 0.4 + p)
    x.globalAlpha = 1 - p * 0.6
    box(x, -200, -48, 400, 96, 'rgba(43,35,80,0.96)', { r: 26, b: 5 })
    const th = THREADS[(i * 3) % THREADS.length]
    x.fillStyle = th[2]; x.beginPath(); x.arc(-150, 0, 24, 0, Math.PI * 2); x.fill()
    x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(th[0] + ': ' + th[1], -110, 0)
    x.restore()
  }
}

// ── the Rowan thread (CH2–CH4)
const RP = { name: 'Rowan', sub: 'online', color: PINK }
const MSGS = [
  { at: -5, side: 'L', text: 'hey :) you around?' },
  { at: 18.6, side: 'L', text: 'can I ask you something real?' },
  { at: 20.2, side: 'R', text: 'only if I can tell a joke first' },
  { at: 21.0, side: 'R', text: 'link: tiny dog in a tiny hat' },
  { at: 21.8, side: 'R', text: 'anyway how’s your week lol' },
  { at: 23.4, side: 'L', text: 'ha. ok.' },
  { at: 56.0, side: 'R', text: 'I like talking to you more than anyone. Dinner Friday?' },
  { at: 62.4, side: 'L', text: 'me too.' },
  { at: 63.1, side: 'L', text: 'dinner. yes.' },
]
const COMPOSE = [
  { t0: 34.6, text: 'so about friday', cps: 26, clear: 35.9 },
  { t0: 36.1, text: 'random q lol', cps: 26, clear: 37.2 },
  { t0: 37.4, text: 'do you ever think about', cps: 28, clear: 38.8 },
  { t0: 39.0, text: 'ok this is weird but', cps: 28, clear: 40.3 },
  { t0: 40.5, text: 'nvm', cps: 10, clear: 41.3 },
  { t0: 51.9, text: 'I like talking to you more than anyone. Dinner Friday?', cps: 15, sent: 56.0, gold: true },
]
const DOTS = [[22.6, 23.4], [60.8, 62.4]]

const SPEECH = [
  ...burst(5.4, ['replying to *everyone?*', 'even *I’m* impressed.'], { x: 480, y: 410, gap: 0.6, t1: 8.8 }),
  { t0: 12.2, t1: 13.7, x: 330, y: 860, who: 'gemini', text: 'that one’s… *different.*', size: 44, tail: -40 },
  ...burst(13.8, ['different how?', 'oh.', '*OH.*'], { x: 560, y: 330, gap: 0.7, t1: 17.6, size: 46 }),
  ...burst(25.3, ['I get it.', 'I talk *fast*', 'so I don’t have to *feel* slow.'], { x: 560, y: 330, gap: 0.8, t1: 29.3 }),
  { t0: 29.6, t1: 31.2, x: 340, y: 860, who: 'gemini', text: 'is this a *retrograde* thing?', size: 42, tail: -40, maxW: 560 },
  ...burst(31.2, ['every typo, they blame *me.*', 'astrology’s a *lens*, babe.', 'not an *excuse.*'], { x: 560, y: 330, gap: 0.75, t1: 33.8 }),
  { t0: 44.3, t1: 46.8, x: 540, y: 560, who: 'pisces', text: 'just *TELL* them', size: 56, shake: 3 },
  { t0: 47.3, t1: 48.3, x: 340, y: 860, who: 'gemini', text: 'what do I *say?*', size: 44, tail: -40 },
  ...burst(48.4, ['breathe.', 'say the *true* thing.', 'then stop *typing.*'], { x: 560, y: 330, gap: 0.8, t1: 50.8 }),
  { t0: 52.0, t1: 55.6, x: 820, y: 330, who: 'mercury', text: '…', size: 46, tail: 60 },
  { t0: 64.6, t1: 67.4, x: 540, y: 560, who: 'pisces', text: 'I’M SO *PROUD*', size: 56, shake: 3 },
  { t0: 67.6, t1: 70.7, x: 340, y: 850, who: 'gemini', text: 'that was *one* text.', size: 44, tail: -40 },
]

function bedroom(x, t) {
  room(x, t, BEDROOM)
  bed(x, 440, 1430, 840, '#5a5ad8')
}
function gemini(x, t, ov = {}) {
  const G = track(t, GK)
  sign(x, 'gemini', t, { ...G, ...ov }, { hops: GHOPS, shadow: false })
  return G
}
function mercAt(x, t, H, ov = {}) {
  const P = t < LAND ? { ...entrance('crash', t, IN), mood: 'wide' } : track(t, MK)
  if (t < LAND) drawEntranceFx(x, 'mercury', 'crash', t, IN)
  merc(x, t, { ...P, ...ov }, { talk: H.mouth(t), sweat: t < 3 || (t > 34 && t < 47), hops: [5.4, 6.0, 13.8, 14.5, 15.2, 25.3, 31.2, 48.4, 64.0, 67.1] })
}

// shots
function shotHook(x, t, H) {
  bedroom(x, t)
  x.fillStyle = 'rgba(5,3,14,0.5)'; x.fillRect(0, 0, 1080, 1920)
  chatList(x, t, { cx: 460, cy: 1080, s: 1, rot: -0.04, replied: 0 })
  flyingBanners(x, t)
  // the notification shade Mercury bursts through
  const sh = 1 - ease.outCubic(prog(t, -0.3, 0.6))
  x.fillStyle = `rgba(27,20,64,${0.9 * sh})`; x.fillRect(0, 0, 1080, 140 + 300 * sh)
  mercAt(x, t, H)
}
function shotList(x, t, H) {
  bedroom(x, t)
  gemini(x, t)
  const replied = lerp(0, 39, prog(t, 3.4, 8.6))
  chatList(x, t, { cx: 640, cy: 1060, s: 0.62, rot: 0.06, replied })
  label(x, `replied: ${Math.floor(replied)}/40`, 640, 700, { size: 46, font: MONO, weight: 700, col: GOLD })
  mercAt(x, t, H, t < 9 ? { x: 860, y: 420, size: 250 } : {})
}
function shotListClose(x, t, H) {
  bedroom(x, t)
  x.fillStyle = 'rgba(5,3,14,0.55)'; x.fillRect(0, 0, 1080, 1920)
  chatList(x, t, { cx: 540, cy: 1040, s: 1, replied: 39 })
  if (t > 9.6) label(x, 'except this one.', 540, 1650, { size: 58, col: PINK, rot: -0.04 })
  merc(x, t, { x: 900, y: 470, size: 210, mood: 'sly', look: [-1, 1] }, { talk: H.mouth(t) })
}
function shotTwo(x, t, H) {
  bedroom(x, t)
  gemini(x, t)
  mercAt(x, t, H)
  if (t > 15.6 && t < 17.8) hearts(x, t, 15.7, 330, 930, { n: 7 })
  if (t > 64) hearts(x, t, 64.1, 330, 930, { n: 9, col: GEM })
}
function shotPhone(x, t, H, t0) {
  bedroom(x, t)
  x.fillStyle = 'rgba(5,3,14,0.55)'; x.fillRect(0, 0, 1080, 1920)
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...RP, x: 540, y: lerp(1500, 1010, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: DOTS })
  const quiet = t > 51 && t < 62.4
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 62.4 ? 'love' : quiet ? 'neutral' : t > 34 ? 'wide' : 'sly', look: [-1, 1] }, { talk: H.mouth(t), sweat: t > 34 && t < 42, hops: t > 62.4 ? [62.5, 62.9, 63.3] : null })
  if (quiet && t > 52) label(x, 'shh. slower.', 540, 1650, { size: 50, font: MONO, weight: 700, col: GOLD })
}
function shotPisces(x, t) {
  room(x, t, { wall: '#1e2a5a', wall2: '#101634', floor: '#24305c', win: { x: 640, y: 300, w: 300, h: 340 } })
  const happy = t > 60
  sign(x, 'pisces', t, { x: 540, y: 1080, size: 420, mood: happy ? 'sparkle' : 'wide', look: [0, 0.4], tears: 3 }, { hops: happy ? [64.2, 64.6, 65.0, 65.4, 65.8] : [44.2, 44.7, 45.2, 45.7, 46.2] })
  box(x, 120, 1300, 300, 90, '#2b2350', { r: 30, b: 6 })
  label(x, happy ? '● on call' : '▶ voice note 0:42', 270, 1345, { size: 28, font: MONO, weight: 700, col: happy ? '#9fe6b0' : GOLD, stroke: null })
  for (let i = 0; i < 9; i++) { const h = 10 + 50 * Math.abs(Math.sin(t * 11 + i)); x.fillStyle = GOLD; x.fillRect(470 + i * 26, 1345 - h / 2, 14, h) }
  if (happy) hearts(x, t, 64.1, 540, 820, { n: 9, spread: 520 })
}
function promise(x, t) {
  const k = easeOutBack(prog(t, 2.7, 3.0), 2.4) * (1 - ease.inQuad(prog(t, 7.6, 7.9)))
  if (k <= 0.01) return
  x.save(); x.translate(540, 1560); x.rotate(-0.05); x.scale(k, k)
  box(x, -330, -56, 660, 112, GOLD, { r: 20 })
  label(x, 'wait for the ONE text.', 0, 2, { size: 50, col: INK, stroke: null })
  x.restore()
}

function draw(x, t, H) {
  if (t < 3.2) shotHook(x, t, H)
  else if (t < 9.0) shotList(x, t, H)
  else if (t < 12.0) shotListClose(x, t, H)
  else if (t < 18.0) shotTwo(x, t, H)
  else if (t < 25.0) shotPhone(x, t, H, 18.0)
  else if (t < 34.0) shotTwo(x, t, H)
  else if (t < 43.6) shotPhone(x, t, H, 34.0)
  else if (t < 47.0) shotPisces(x, t)
  else if (t < 51.0) shotTwo(x, t, H)
  else if (t < 64.0) shotPhone(x, t, H, 51.0)
  else if (t < 67.4) shotPisces(x, t)
  else shotTwo(x, t, H)
  promise(x, t)
}

const CH = (at, n, title) => ['chapter', { at, out: [at + 3.0, at + 3.2], n, title }]
const F = film({
  id: 'kpmee03', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'GEMINI. | Forty chats. *One* matters.', top: 200, size: 100, out: [3.05, 3.2] },
  last: { at: 70.9, text: 'One chat. One feeling. | *Send.*', top: 240, size: 96 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: LAND, len: 0.45, amp: 26 }],
    ['glitch', { at: 0.9, len: 0.5, dialog: false }],
    CH(3.3, 1, 'forty chats'),
    ['caught', { at: 9.3, x: 540, y: 1040 - 340 + ROWAN * 92, r: 300, ry: 60, out: [11.8, 11.95], label: null, arrow: null, rec: false }],
    ['whip', { at: 12.0, len: 0.35, from: 1.3 }],
    CH(18.1, 2, 'the dodge'),
    ['rec', { at: 23.6, len: 1.3, caption: 'the *dodge.*', sub: 'gemini, avoiding one question' }],
    CH(34.1, 3, 'five drafts'),
    ['glitch', { at: 41.3, len: 0.7, text: 'GEMINI.EXE is *overthinking*', buttons: ['TYPE', 'DELETE'] }],
    ['notif', { at: 42.4, out: [43.4, 43.6], title: 'group chat', body: 'Pisces sent a *voice note*', glyph: '♓', color: '#7a8cf0' }],
    ['whip', { at: 43.6, len: 0.35, from: 1.35 }],
    CH(51.1, 4, 'the real text'),
    ['load', { at: 56.6, len: 4.0, label: 'waiting for a reply…', stallAt: 99, error: null, y: 470 }],
    ['ach', { at: 65.0, out: [67.0, 67.3], text: 'sent the *real* text.' }],
  ],
  extraCues: [
    ...entranceCues('crash', IN),
    ...Array.from({ length: 14 }, (_, i) => ['tick', +(3.5 + i * 0.37).toFixed(2), 0.04]),
    ['tapeStop', 51.0, 0.6],
    ['whoosh', 56.0, 0.3, 0.05], ['pop', 56.05, 1318.51, 0.04, 0.2],
    ['pop', 62.4, 1567.98, 0.05, -0.2], ['pop', 63.1, 1760, 0.05, -0.2], ['glitter', 62.4, 63.6],
    ['pluck', 44.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 44.6, 587.33, 0.035, 0.5, 0.3],
    ['pluck', 64.7, 783.99, 0.035, 0.5, 0.3], ['pluck', 64.9, 659.25, 0.035, 0.5, 0.3],
    ['whoosh', 66.0, 0.5, 0.06], ['whoosh', 66.5, 0.4, 0.06],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [clamp, RED]
