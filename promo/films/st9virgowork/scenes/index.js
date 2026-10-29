// st9virgowork (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E27: Virgo · 9 TO 5) · story 0–20.6, then
// the shared end card.
//   0.00  frame 0: Virgo's desk, 9:12 AM. The archived email is up (Gemini, MAR 2021: "their going to love it"); Virgo holds
//         a big magnifier over "their", already circled in red. Hook: "A Virgo found the typo in your email from *2021*."
//   2.80  "9:12 AM — inbox *zero*, almost."
//   4.90  the audit: red pen circles pop up all over the room (a crooked tool on the pegboard, one blind slat, a binder out
//         of rainbow order, the rug), with an ERRORS FOUND counter.
//   8.30  the email comes back: Virgo types a reply-all ("Actually, it's *they're.*"), pauses, and deletes it, letter by letter.
//  11.40  VIRGO: "or… fix it quietly. and say *nice work.*"  A private DM to Gemini instead: "tiny typo in the deck, fixed
//         it. nice work!" → GEMINI: "ty!! ♥"  The red circles fade out one by one.
//  13.20  ★ ASTROLOGY SAYS: Virgo is the natural ruler of the 6th house: daily work, health, routines.
//  16.80  the last line, frame 0's pose (the magnifier), now over Gemini's "ty!! ♥": "Help. Don't *audit*."
//   The ghost rises behind the monitor (6.2) and gets circled too. Rewatch bait: one red circle lands on Virgo's own coffee.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawVirgoHome, virgoSpots, drawVirgoStar } from '../../st9virgohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, floatHearts, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 25
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const VIRN = '♍ VIRGO'
const MONO = "'Space Mono', monospace", INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const RED = '#ff3b4f'

const T = {
  hookOut: 2.6, st1: 2.8, st1Out: 4.7,
  emailOut: [4.7, 4.95], audit: [5.1, 5.6, 6.1, 6.6, 7.1, 7.6], ghost: 6.2,
  emailIn: 8.2, draft: [8.5, 9.9], del: [10.6, 11.2], emailOut2: [11.2, 11.4],
  l1: 11.5, close: 15.6, dm: 11.6, chat: [12.6, 14.4], erase: [14.6, 15.4],
  fact: 13.2, factDur: 3.0,
  last: 16.8, lastOut: [20.2, 20.55],
}
const LINES = [{ t: T.l1, speaker: VIRN, text: 'or… fix it quietly. and say *nice work.*', color: '#ff9cc0' }]
const CPS = 28
const HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), ...T.audit, T.del[1], T.chat[1]]
const CHAT = [
  { from: 'me', text: 'tiny typo in the deck, fixed it. nice work!', at: T.chat[0] },
  { from: '♊ GEMINI', text: 'ty!! ♥', at: T.chat[1] },
]
// the audit's red circles (room coords): what's "wrong"
const CIRCLES = [[245, 478, 60], [760, 434, 70], [858, 1092, 46], [540, 1560, 120], [470, 1010, 56], [300, 1100, 40]]
const PANEL = { x: 110, y: 540, w: 860, h: 500 }
const VIR0 = { x: 560, y: 1225, size: 300 }
const HIDE = virgoSpots('desk').hide[1]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (Virgo’s desk); it gets circled in red too' }
const SHOTS = [
  { t: 0, x: 540, y: 900, s: 1.06 },
  { t: T.st1, x: 540, y: 960, s: 1 },
  { t: T.audit[0], x: 540, y: 960, s: 1 },
  { t: T.audit[3], x: 540, y: 1100, s: 1.08 },
  { t: T.emailIn, x: 540, y: 900, s: 1.06 },
  { t: T.dm, x: 600, y: 1000, s: 1.04 },
  { t: T.last, x: 540, y: 960, s: 1 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
function redCircle(x, cx, cy, r, k, seed = 0) {
  if (k <= 0) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'
  x.beginPath()
  const a0 = -2 + seed, a1 = a0 + Math.PI * 2.15 * clamp(k)
  for (let a = a0; a <= a1; a += 0.08) { const rr = r * (1 + 0.06 * Math.sin(a * 3 + seed)); const px = cx + Math.cos(a) * rr * 1.25, py = cy + Math.sin(a) * rr * 0.8; a === a0 ? x.moveTo(px, py) : x.lineTo(px, py) }
  x.stroke(); x.restore()
}
// the email client panel; draft = the reply-all text shown so far
function emailPanel(x, t, k, { draft = null, caret = false, fixed = false } = {}) {
  if (k <= 0) return
  const { x: px, y: py, w, h } = PANEL
  x.save(); x.translate(px + w / 2, py + h / 2); x.scale(k, k); x.translate(-(px + w / 2), -(py + h / 2))
  R(x, px - 8, py - 8, w + 16, h + 16, INK); R(x, px, py, w, h, '#f7f4ea'); R(x, px, py, w, 56, '#4c6e58')
  x.font = `700 24px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#f4ecd6'; x.fillText('INBOX › ARCHIVE › 2021', px + 22, py + 29)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('FROM: ♊ GEMINI', px + 30, py + 96)
  x.fillStyle = '#6a6458'; x.font = `700 22px ${MONO}`; x.fillText('MAR 2021 · re: the deck!!', px + 30, py + 134)
  R(x, px + 30, py + 158, w - 60, 3, '#d8d2c0')
  x.fillStyle = INK; x.font = `600 40px ${INTER}`
  x.fillText('hi team!', px + 30, py + 210)
  const pre = '', word = fixed ? 'they’re' : 'their', post = ' going to love it.'
  x.fillText(pre + word + post, px + 30, py + 264)
  x.fillText('see u at 3!', px + 30, py + 318)
  const ww = x.measureText(word).width
  if (!fixed) redCircle(x, px + 30 + ww / 2, py + 262, ww * 0.45, 1, 0.3)
  if (draft !== null) {
    R(x, px + 20, py + 360, w - 40, 130, '#ffffff'); R(x, px + 20, py + 360, w - 40, 4, RED)
    x.fillStyle = RED; x.font = `700 22px ${MONO}`; x.fillText('REPLY ALL (14)', px + 36, py + 384)
    x.fillStyle = INK; x.font = `600 34px ${INTER}`; x.fillText(draft + (caret && Math.floor(t * 3) % 2 ? '|' : ''), px + 36, py + 440)
  }
  x.restore()
  return { wordX: px + 30 + ww / 2, wordY: py + 262 }
}
function magnifier(x, cv, cx, cy, r) {
  // a real zoom: copy the canvas under the lens, scaled up
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip()
  const z = 1.7, sw = (2 * r) / z
  x.drawImage(cv, cx - sw / 2, cy - sw / 2, sw, sw, cx - r, cy - r, 2 * r, 2 * r)
  x.fillStyle = 'rgba(200,230,255,0.12)'; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  x.restore()
  x.save(); x.lineWidth = 18; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, r + 4, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 10; x.strokeStyle = '#c9b48a'; x.stroke()
  x.translate(cx, cy); x.rotate(0.75); R(x, r, -14, 150, 28, INK); R(x, r + 4, -9, 142, 18, '#8f6a3e'); x.restore()
}

function virState(t) {
  if (t < T.st1) return { mood: 'squint', look: [-1, -1] }
  if (t < T.audit[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.emailIn) return { mood: 'squint', look: [0, 0] }
  if (t < T.draft[1] + 0.3) return { mood: 'squint', look: [0, -1] }
  if (t < T.l1) return { mood: 'neutral', look: [0, 1] }
  if (t < T.chat[1]) return { mood: 'happy', look: [1, -1] }
  return { mood: 'heart', look: [1, -1] }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "600 40px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Virgo found the typo in your email from *2021*.', at: 0, out: T.hookOut, top: 250, size: 86, accentSize: 128 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '9:12 AM', text: 'inbox *zero*, almost.' })
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 240, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Help. Don’t *audit.*', { at: T.last, lateAt: T.last + 0.45, top: 250, size: 124, accentSize: 190, late: 1, accentColor: '#ff9cc0' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const draftText = 'Actually, it’s “they’re.”'

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawVirgoHome(x, t, { room: 'desk', ep: 'work', sky: skyIn(t, 9.2), light: 0.5 })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 3 })
      // Virgo's coffee (the one circle on Virgo's own stuff)
      R(x, 296, 1080, 40, 46, INK); R(x, 300, 1084, 32, 38, '#f4ecd6'); R(x, 332, 1092, 10, 18, INK)
      const ok = popOut(t, [20.2, 20.55])
      const r = drawVirgoStar(x, VIR0.x, VIR0.y, VIR0.size, t, { ...virState(t), hops: HOPS, seed: 3, pencil: true, pop: ok })
      // the audit circles (and the ghost's)
      const er = prog(t, ...T.erase)
      CIRCLES.forEach(([cx, cy, cr], i) => { const k = prog(t, T.audit[i], T.audit[i] + 0.3) * (1 - clamp(er * CIRCLES.length - i)); redCircle(x, cx, cy, cr, k, i) })
      if (t > T.ghost + 0.4 && t < T.ghost + 1.5) redCircle(x, HIDE.x, HIDE.y - 40, 40, prog(t, T.ghost + 0.4, T.ghost + 0.7), 2)
      x.restore()
      // the email (frame 0 and the reply-all), drawn over the room
      const ek = t < T.emailOut[1] ? 1 - prog(t, ...T.emailOut) : t < T.emailIn ? 0 : t < T.emailOut2[1] ? pop01(t, T.emailIn, 0.3, 2) * (1 - prog(t, ...T.emailOut2)) : 0
      let draft = null
      if (t > T.draft[0] && t < T.emailOut2[1]) {
        const n = Math.floor(draftText.length * prog(t, ...T.draft)) - Math.floor(draftText.length * prog(t, ...T.del))
        draft = draftText.slice(0, Math.max(0, n))
      }
      const ep = emailPanel(x, t, ek, { draft, caret: draft !== null })
      if (t < T.emailOut[0]) magnifier(x, cv, ep.wordX + 30 + Math.sin(t * 2) * 8, ep.wordY + 10 + Math.cos(t * 2.4) * 6, 110)
      // the audit counter
      if (t > T.audit[0] - 0.2 && t < T.emailIn) {
        const n = T.audit.filter(a => t >= a).length + (t > T.ghost + 0.4 ? 1 : 0)
        x.save(); x.globalAlpha = pop01(t, T.audit[0] - 0.2, 0.3)
        R(x, 300, 300, 480, 78, INK); R(x, 306, 306, 468, 66, '#2a0d16')
        x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(`ERRORS FOUND: ${n}`, 540, 340)
        x.restore()
      }
      // the private DM instead of reply-all; at the end the magnifier hovers over Gemini's "ty!! ♥"
      if (t > T.dm) {
        const pp = pop01(t, T.dm, 0.35, 2) * (1 - prog(t, 20.15, 20.5))
        phoneScreen(x, t, { x: 760, y: 860, w: 400, h: 560, app: 'chat', title: '♊ GEMINI', lines: CHAT, clock: '9:20', pop: pp, rot: 0.04, size: 26 })
        if (t > T.chat[1] + 0.3) floatHearts(x, t, 820, 760, T.chat[1] + 0.3, T.last + 2, 4, 5)
        if (t > T.last - 0.2) magnifier(x, cv, 655 + Math.sin(t * 2) * 6, 1070 + Math.cos(t * 2.4) * 5, 100)
      }
      sparkles(x, t, 760, 900, T.chat[1], 10, 160, 0.4, [GOLD, '#ff9cc0', BONE])
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.85 })
      drawClock(x, t, { from: '9:12', to: t < T.dm ? '9:12' : '9:20', at: T.dm, dur: 0.4, sign: 'virgo' })
      factChip(x, t, { text: 'Virgo is the natural ruler of the 6th house: daily work, health, routines.', at: T.fact, dur: T.factDur, y: 300, label: '★ ASTROLOGY SAYS', w: 820, size: 32 })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.emailIn, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E27' }), cardCuts(CUTS)]

const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66]
const scribble = a => [['whoosh', a, 0.2, 0.025], ['tick', r3(a + 0.1), 0.05]]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['whoosh', T.emailOut[0], 0.3, 0.03], ...stampCues(T.st1),
  ...T.audit.flatMap((a, i) => [...scribble(a), ['pop', r3(a + 0.15), NOTE[i], 0.04, (i % 2 ? 0.3 : -0.3)]]),
  ['tick', T.ghost + 0.05, 0.015], ...scribble(T.ghost + 0.4),
  ['pop', T.emailIn, 880, 0.04, 0],
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.draft[0] + i * 0.11), 0.035]),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.del[0] + i * 0.07), 0.05]),
  ...talkCues(LINES, { cps: CPS, pitch: { [VIRN]: 880 } }),
  ['pop', T.dm, 987.77, 0.04, 0.3], ...clockCues(T.dm, 0.4), ...phoneCues(CHAT, { app: 'chat' }),
  ['glitter', T.chat[1], T.chat[1] + 0.6],
  ['whoosh', T.erase[0], 0.6, 0.025],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pop', T.last, 880, 0.035, 0], ['pop', r3(T.last + 0.45), 1174.66, 0.05, 0], ['pluck', r3(T.last + 0.5), 1174.66, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lerp; void ease
