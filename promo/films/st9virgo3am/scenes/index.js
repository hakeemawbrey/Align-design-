// st9virgo3am (32 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E30: Virgo · 3 AM) · story 0–27.6, then the
// shared end card.
//   0.00  frame 0: the same bedroom as the morning, dark. 3:04 AM. Virgo lies awake in its perfectly made bed, eyes wide, a
//         thought bubble replaying the one sentence it sent Gemini this morning: "tiny typo in the deck, fixed it."
//         REPLAY ×1. Hook: "A Virgo at 3 AM, replaying *one* sentence."
//   2.80  ◀◀ REPLAY ×2: "tiny TYPO in the deck…" · 5.20 ×3: "…fixed it." (smug??) · 7.40 ×4: "fixed. it." (punch-in)
//   9.40  VIRGO: "was that kind? or was that *correcting?*"
//  11.60  it scrolls back up the chat: its message, then Gemini's "ty!! ♥". VIRGO: "oh. it was *fine.* nice, even."
//  16.10  the window: Virgo's stars, Spica brightest. ★ IN GREEK MYTH: one story says Virgo is Astraea, justice, the last
//         immortal to leave Earth.
//  20.10  the clipboard from the morning: five of six ticked, "rest" still open. Virgo lifts the pencil… and puts it down.
//         "3:21 AM — five of six. *enough.*"
//  22.40  Virgo lies back; the bubble just says "zzz" now.
//  23.30  the last line, frame 0's framing, Virgo asleep: "You're allowed to be *unfinished*."
//   The ghost rises behind the nightstand lamp (14.6). Rewatch bait: the drawers still say SOCKS and OTHER SOCKS; the
//   replay counter's font gets one size bigger each time.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawVirgoHome, virgoSpots, drawVirgoStar, drawTodoBoard } from '../../st9virgohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 32
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 27.6
const VIRN = '♍ VIRGO'
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.7, replays: [0, 2.8, 5.2, 7.4], bubbleOut: 9.2,
  l1: 9.4, chat: 11.6, l2: 13.6, close: 16.0,
  win: 16.1, fact: 16.4, factDur: 3.5, ghost: 14.6,
  clip: 20.1, pencil: [20.6, 21.6], st1: 20.4, st1Out: 22.6,
  down: [22.4, 23.0], last: 23.3, lastOut: [27.2, 27.55],
}
const REPLAY = ['tiny typo in the deck, fixed it.', 'tiny TYPO in the deck…', '…fixed it.', 'fixed. it.']
const LINES = [
  { t: T.l1, speaker: VIRN, text: 'was that kind? or was that *correcting?*', color: '#ff9cc0' },
  { t: T.l2, speaker: VIRN, text: 'oh. it was *fine.* nice, even.', color: '#ff9cc0' },
]
const CPS = 26
const HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), ...T.replays.slice(1)]
const CHAT = [
  { from: 'me', text: 'tiny typo in the deck, fixed it. nice work!', at: T.chat + 0.2 },
  { from: '♊ GEMINI', text: 'ty!! ♥', at: T.chat + 0.9 },
]
// a simplified Virgo in the window (window-relative 0…1), Spica brightest
const VSTARS = { spica: [0.56, 0.84, 3], porrima: [0.46, 0.52, 2], auva: [0.36, 0.38, 1], vindemiatrix: [0.2, 0.22, 2], zavijava: [0.86, 0.36, 1], zaniah: [0.66, 0.46, 1], heze: [0.3, 0.64, 1] }
const VLINKS = [['spica', 'porrima'], ['porrima', 'auva'], ['auva', 'vindemiatrix'], ['porrima', 'zaniah'], ['zaniah', 'zavijava'], ['porrima', 'heze']]

const BED = { x: 60, y: 1130 }
const VIR0 = { x: 250, y: 1050, size: 300 }
const WIN = virgoSpots('bedroom').win
const HIDE = virgoSpots('bedroom').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (Virgo’s dark bedroom)' }
const SHOTS = [
  { t: 0, x: 520, y: 1000, s: 1.06 },
  { t: T.replays[1], x: 480, y: 980, s: 1.1 },
  { t: T.replays[2], x: 500, y: 960, s: 1.16 },
  { t: T.replays[3], x: 440, y: 1000, s: 1.3 },
  { t: T.l1, x: 520, y: 1000, s: 1.06 },
  { t: T.win, x: WIN.x + WIN.w / 2, y: WIN.y + WIN.h / 2 + 60, s: 1.9 },
  { t: T.clip, x: 540, y: 1000, s: 1.06 },
  { t: T.down[0], x: 520, y: 1000, s: 1.06, ease: 0.6 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
const asleep = t => t > T.down[0]
function virState(t) {
  if (asleep(t)) return { mood: 'sleepy', look: [0, 0], zzz: false }
  if (t < T.l1) return { mood: 'wide', look: [1, -1], blink: t < 2 ? false : undefined }
  if (t < T.chat) return { mood: 'squint', look: [1, 0] }
  if (t < T.chat + 1.1) return { mood: 'neutral', look: [1, 1] }
  if (t < T.win) return { mood: 'happy', look: [1, 1] }
  if (t < T.clip) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'neutral', look: [1, 0] }
}
function phoneGlow(x, cx, cy, r, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(150,180,255,${0.36 * a})`); g.addColorStop(1, 'rgba(150,180,255,0)')
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}
function windowStars(x, t, k) {
  if (k <= 0) return
  const P = id => [WIN.x + VSTARS[id][0] * WIN.w, WIN.y + VSTARS[id][1] * WIN.h]
  x.save(); x.globalAlpha = k; x.strokeStyle = 'rgba(223,232,255,0.45)'; x.lineWidth = 2
  x.beginPath(); for (const [a, b] of VLINKS) { x.moveTo(...P(a)); x.lineTo(...P(b)) } x.stroke()
  for (const id of Object.keys(VSTARS)) { const [px, py] = P(id); drawPixelStar(x, px, py, VSTARS[id][2] === 3 ? 26 + 3 * Math.sin(t * 4) : 12 + VSTARS[id][2] * 4, VSTARS[id][2] === 3 ? 2 : 1, VSTARS[id][2] === 3 ? '#dfe8ff' : '#efe6d6') }
  const [sx, sy] = P('spica')
  x.font = `700 16px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#dfe8ff'; x.fillText('SPICA', sx + 20, sy + 4)
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Virgo at 3 AM, replaying *one* sentence.', at: 0, out: T.hookOut, top: 250, size: 90, accentSize: 136 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '3:21 AM', text: 'five of six. *enough.*' })
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 240, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'You’re allowed to be *unfinished.*', { at: T.last, lateAt: T.last + 0.6, top: 250, size: 96, accentSize: 150, late: 1, accentColor: '#ff9cc0' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawVirgoHome(x, t, { room: 'bedroom', ep: '3am', dark: 1, sky: skyIn(t, 3.0, { moon: { x: 0, y: 0, r: 1, phase: 0, alpha: 0 } }), light: 0 })
      windowStars(x, t, prog(t, 0, 0.01) * (t > T.win - 0.3 ? 1 : 0.55))
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 3 })
      const dn = ease.inOutCubic(prog(t, ...T.down))
      const ok = popOut(t, [27.2, 27.55])
      const vr = drawVirgoStar(x, VIR0.x + dn * 30, VIR0.y + dn * 50, VIR0.size * (1 - 0.06 * dn), t, { ...virState(t), hops: HOPS, seed: 4, pop: ok, glow: 0.55, squash: dn * 0.1 })
      // the duvet, dark sage, tucked with hospital corners
      R(x, BED.x - 6, BED.y + 34, 432, 112, INK); R(x, BED.x, BED.y + 40, 420, 100, '#1c2c24'); R(x, BED.x, BED.y + 40, 420, 12, '#2a3e33')
      // the phone and its glow while Virgo checks the chat
      const phoneK = t > T.chat - 0.3 && t < T.win ? pop01(t, T.chat - 0.3, 0.3, 2) * (1 - prog(t, T.win - 0.3, T.win)) : 0
      if (phoneK > 0) phoneGlow(x, vr.x + 120, vr.y, 380, phoneK)
      // the morning's clipboard, five of six; the pencil hovers over "rest" and goes back down
      const ck = t > T.clip - 0.2 && t < T.down[1] ? pop01(t, T.clip - 0.2, 0.35, 2) * (1 - prog(t, T.down[0], T.down[1])) : 0
      if (ck > 0) {
        x.save(); x.translate(640, 1010); x.rotate(-0.05); x.scale(ck, ck)
        R(x, -160, -190, 320, 400, INK); R(x, -154, -184, 308, 388, '#5a4430'); R(x, -46, -204, 92, 28, '#6a6478')
        x.globalAlpha = 0.85; drawTodoBoard(x, -140, -160, 280, 350, t, { title: 'TODAY', size: 20, done: 5 }); x.globalAlpha = 1
        const pp = prog(t, ...T.pencil), hover = Math.sin(Math.PI * pp)
        x.translate(110, 120 - hover * 30); x.rotate(-0.8)
        R(x, -60, -8, 110, 16, INK); R(x, -56, -5, 90, 10, '#f2c75c'); R(x, 34, -5, 10, 10, '#f0c8a0'); R(x, 44, -3, 6, 6, INK)
        x.restore()
        phoneGlow(x, 640, 1010, 260, 0.5 * ck)
      }
      x.restore()
      // the replay loop (screen space so it stays readable through the punch-ins)
      if (t < T.bubbleOut + 0.3) {
        const i = T.replays.filter(a => t >= a).length - 1, a = T.replays[i]
        const txt = REPLAY[i], n = Math.ceil(txt.length * prog(t, a + 0.15, a + 1.1))
        const k = (1 - prog(t, T.bubbleOut, T.bubbleOut + 0.3)) * (i > 0 ? pop01(t, a, 0.2, 2.4) : 1)
        pixelBubble(x, 600, 840, i === 0 ? txt : txt.slice(0, Math.max(1, n)), { size: 42, alpha: k, color: '#e8e2f4' })
        x.save(); x.globalAlpha = k
        x.font = `700 ${30 + 5 * i}px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ff9cc0'; x.fillText(`◀◀ REPLAY ×${i + 1}`, 600, 730)
        if (i === 2 && t > a + 1.2) { x.fillStyle = '#ff3b4f'; x.font = `700 26px ${MONO}`; x.fillText('(smug??)', 820, 930) }
        x.restore()
      }
      if (asleep(t)) pixelBubble(x, 620, 820, 'zzz', { size: 34, alpha: prog(t, T.down[1], T.down[1] + 0.4) * (1 - prog(t, 27.15, 27.5)), color: '#e8e2f4' })
      if (phoneK > 0) phoneScreen(x, t, { x: 700, y: 880, w: 400, h: 560, app: 'chat', title: '♊ GEMINI', lines: CHAT, clock: '3:12', pop: phoneK, rot: 0.04, size: 26, glow: 0.8 })
      sparkles(x, t, 700, 960, CHAT[1].at, 10, 150, 0.2, ['#ff9cc0', GOLD, BONE])
      drawSeedConstellation(x, t, 100, { alpha: 0.42 })
      drawRecFrame(x, t, { battery: 0.12 })
      drawClock(x, t, { from: '3:04', to: t < T.chat ? '3:04' : t < T.clip ? '3:12' : '3:21', at: t < T.chat ? 0 : t < T.clip ? T.chat : T.clip, dur: 0.4, ampm: 'AM', sign: 'virgo' })
      factChip(x, t, { text: 'One Greek story says Virgo is Astraea, justice, the last immortal to leave Earth.', at: T.fact, dur: T.factDur, y: 300, label: '★ IN GREEK MYTH', w: 820, size: 32 })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.win, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E30' }), cardCuts(CUTS)]

const typeTicks = (a, txt) => Array.from({ length: Math.ceil(txt.length / 2) }, (_, i) => ['tick', r3(a + 0.15 + i * (0.95 / Math.ceil(txt.length / 2))), 0.02])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...T.replays.flatMap((a, i) => [...(i ? [['whoosh', r3(a - 0.15), 0.25, 0.03], ['tick', a, 0.07], ['pop', r3(a + 0.05), [622.25, 698.46, 830.61][i - 1], 0.035, 0.2]] : []), ...typeTicks(a, REPLAY[i])]),
  ...talkCues(LINES, { cps: CPS, pitch: { [VIRN]: 830 }, gain: 0.014 }),
  ...clockCues(T.chat, 0.4), ['pop', T.chat, 783.99, 0.03, 0.3], ...phoneCues(CHAT, { app: 'chat' }),
  ['tick', T.ghost + 0.05, 0.015],
  ['bell', T.win + 0.2, 1661.22, 0.025, 2.0, 0.3], ...factChipCues(T.fact, { dur: T.factDur }),
  ...clockCues(T.clip, 0.4), ['pop', T.clip, 698.46, 0.03, 0], ...stampCues(T.st1), ['tick', T.pencil[1], 0.05],
  ['whoosh', T.down[0], 0.6, 0.02],
  ['pop', T.last, 622.25, 0.035, 0], ['pop', r3(T.last + 0.6), 932.33, 0.045, 0], ['bell', r3(T.last + 0.65), 1244.51, 0.03, 1.8, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lerp; void clamp
