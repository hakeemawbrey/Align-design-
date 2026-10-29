// st9leo3am (32 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E25: Leo · 3 AM) · story 0–27.6, then the
// shared end card.
//   0.00  frame 0: the same bedroom as the morning, dark. 3:07 AM. Leo sits up in bed, wide awake, hugging a pillow in its
//         phone's glow; the crown is off, on its stand; the battery is nearly flat. Hook: "A Leo at 3 AM: *did* they like me?"
//   3.00  LEO: "did they like *me*… or the show?"  The ring light is off; the mirror shows Leo with no crown.
//   6.30  LEO: "if the lights go off, does everyone *leave?*"  (season 6's fear)
//   9.80  the window, the Moon: ★ GREEK MYTH: Leo is the Nemean lion, whose hide no weapon could pierce. Leo: "tough hide.
//         soft heart."
//  13.40  the phone buzzes. THE CREW group chat, at 3 AM: Sag, Aries and Aquarius, all awake too.
//  19.60  the phone's light reaches the polaroid wall: friends, not selfies (the season's binge detail pays off).
//         LEO: "oh. they *stayed* after the show."  (season 6: "Clap for me. Then stay after the show.")
//  22.80  the phone goes dark, Leo lies down. The sunflower is bowed toward the Moon.
//  23.40  the last line, frame 0's framing, Leo asleep now: "You're loved *offstage*."
//   The ghost leans out from behind the bulb mirror (11.2). Rewatch bait: the APPLAUSE sign from the morning is still on the
//   wall, unlit, and the battery icon goes red.
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
import { drawLeoHome, leoSpots, drawLeoStar, drawCrown, drawRingLight } from '../../st9leohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, floatHearts, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 32
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 27.6
const LEON = '♌ LEO'

const T = {
  hookOut: 2.7, l1: 3.0, mirror: 6.1, l2: 6.3, close1: 9.6,
  cutWin: 9.8, fact: 10.1, factDur: 3.6, bubble: [11.6, 13.2], ghost: 11.2,
  buzz: 13.4, chat: [14.0, 15.7, 17.4], wall: 19.6, l3: 19.9, close3: 22.6,
  st1: 13.6, st1Out: 16.2,
  down: [22.7, 23.3], last: 23.5, lastOut: [27.2, 27.55],
}
const LINES = [
  { t: T.l1, speaker: LEON, text: 'did they like *me*… or the show?', color: '#ffc27a' },
  { t: T.l2, speaker: LEON, text: 'if the lights go off, does everyone *leave?*', color: '#ffc27a' },
  { t: T.l3, speaker: LEON, text: 'oh. they *stayed* after the show.', color: '#ffc27a' },
]
const CPS = 26
const HOPS = [...talkHops(LINES, LEON, { cps: CPS }), T.buzz]
const CHAT = [
  { from: '♐ SAG', text: 'u up? still hearing how loud u cheered', at: T.chat[0] },
  { from: '♈ ARIES', text: 'best part wasn’t the sign. it was you.', at: T.chat[1] },
  { from: '♒ AQUARIUS', text: 'proud of you. now sleep.', at: T.chat[2] },
]

const BED = { x: 40, y: 1120 }
const LEO0 = { x: 270, y: 1040, size: 290 }
const M = leoSpots('bedroom').mirror
const HIDE = leoSpots('bedroom').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (the dark bedroom)' }
const WIN = leoSpots('bedroom').win
const SHOTS = [
  { t: 0, x: 520, y: 1010, s: 1.08 },
  { t: T.mirror, x: 640, y: 1040, s: 1.18 },
  { t: T.cutWin, x: 540, y: 760, s: 1.5 },
  { t: T.buzz, x: 420, y: 1040, s: 1.12 },
  { t: T.wall, x: 230, y: 860, s: 1.9 },
  { t: T.down[0], x: 520, y: 1010, s: 1.08, ease: 0.8 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
const asleep = t => t > T.down[0]
function leoState(t) {
  if (asleep(t)) return { mood: 'sleepy', look: [0, 0], zzz: t > T.last + 0.6 }
  if (t < T.l2) return { mood: 'wide', look: [1, 1], blink: t > 1.6 ? undefined : false }
  if (t < T.cutWin) return { mood: 'neutral', look: [1, 0] }
  if (t < T.buzz) return { mood: 'neutral', look: [1, -1] }
  if (t < T.chat[1]) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.wall) return { mood: 'sparkle', look: [1, 1] }
  return { mood: 'happy', look: [-1, -1] }
}
function phoneGlow(x, cx, cy, r, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(150,180,255,${0.38 * a})`); g.addColorStop(1, 'rgba(150,180,255,0)')
  x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Leo at 3 AM: *did* they like me?', at: 0, out: T.hookOut, top: 270 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '3:16 AM', text: 'the group chat is *awake.*' })
  const box = dialogueBox(root, { lines: LINES.slice(0, 2), y: 1560, width: 960, height: 240, open: T.l1 - 0.2, close: T.close1, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES.slice(2), y: 1560, width: 960, height: 240, open: T.l3 - 0.2, close: T.close3, cps: CPS })
  const last = lastLine(root, 'You’re loved *offstage.*', { at: T.last, lateAt: T.last + 0.5, top: 300, size: 110, accentSize: 170, late: 1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawLeoHome(x, t, { room: 'bedroom', ep: '3am', dark: 1, sky: skyIn(t, 3.1, { moon: { x: WIN.x + 210, y: WIN.y + 90, r: 40, phase: 0.35, alpha: 1 } }), light: 0 })
      // the morning's props, dark: the APPLAUSE sign, the ring light (off), the crown on its stand
      x.save(); x.globalAlpha = 0.55
      R(x, M.x - 150, 730, 300, 80, INK); R(x, M.x - 142, 738, 284, 64, '#2a0d16')
      x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#4a1c28'; x.fillText('APPLAUSE', M.x, 773)
      x.restore()
      x.save(); x.globalAlpha = 0.5; drawRingLight(x, 600, 930, 96, t, { on: 0, stand: 250 }); x.restore()
      drawCrown(x, M.x + 98, M.y + 136, 6, { alpha: 0.75 })
      // the reflection: no crown
      x.save(); x.beginPath(); x.rect(M.x - 120, M.y - 150, 240, 330); x.clip()
      drawLeoStar(x, M.x + 20, M.y + 80, 170, t - 0.2, { ...leoState(t - 0.2), look: [-1, 0], alpha: 0.4, glow: 0.2, crown: false, seed: 3, glyph: null })
      x.restore()
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 4 })
      // Leo in bed: sitting up, then lying down
      const dn = ease.inOutCubic(prog(t, ...T.down))
      const ok = popOut(t, [27.2, 27.55])
      const lr = drawLeoStar(x, LEO0.x + dn * 20, LEO0.y + dn * 60, LEO0.size * (1 - 0.08 * dn), t, { ...leoState(t), hops: HOPS, crown: false, seed: 7, pop: ok, glow: 0.6, squash: dn * 0.12 })
      // the pillow it hugs (till it lies down) and the duvet over its lower half
      if (dn < 1) { x.save(); x.globalAlpha = 1 - dn; R(x, lr.x - 60, lr.y + 62, 120, 56, INK); R(x, lr.x - 54, lr.y + 68, 108, 44, '#5a4a5e'); x.restore() }
      R(x, BED.x - 6, BED.y + 30, 456, 120, INK); R(x, BED.x, BED.y + 36, 444, 108, '#3a1424'); R(x, BED.x, BED.y + 36, 444, 10, '#4c1c30')
      for (let i = BED.x + 30; i < BED.x + 430; i += 42) R(x, i, BED.y + 86, 18, 12, '#4a3a1c')
      // the phone in its hands (a small glowing slab) and its glow
      const phoneOn = t < T.down[0] ? 1 : 1 - prog(t, T.down[0], T.down[0] + 0.3)
      if (phoneOn > 0) {
        const bz = t > T.buzz && t < T.buzz + 0.6 ? Math.sin(t * 70) * 4 : 0
        R(x, lr.x + 104 + bz, lr.y + 30, 46, 76, INK); R(x, lr.x + 109 + bz, lr.y + 35, 36, 66, '#9fb8ff')
        phoneGlow(x, lr.x + 95, lr.y + 20, 360, phoneOn)
      }
      if (t > T.wall && t < T.down[0] + 0.3) phoneGlow(x, 210, 760, 260, 1.6 * prog(t, T.wall, T.wall + 0.6) * phoneOn)   // the light reaches the wall
      if (t > T.wall + 1.4 && t < T.down[0]) floatHearts(x, t, 210, 700, T.wall + 1.4, T.down[0], 2, 4, 160)
      if (t > T.bubble[0] && t < T.bubble[1]) pixelBubble(x, lr.x + 110, lr.top - 60, 'tough hide. soft heart.', { size: 26, alpha: pop01(t, T.bubble[0], 0.25) * (1 - prog(t, T.bubble[1] - 0.25, T.bubble[1])) })
      x.restore()
      // the group chat, big, over the room
      if (t > T.buzz && t < T.wall) {
        const pp = pop01(t, T.buzz + 0.25, 0.35, 2) * (1 - prog(t, T.wall - 0.3, T.wall))
        phoneScreen(x, t, { x: 640, y: 980, w: 420, h: 640, app: 'chat', title: 'THE CREW', lines: CHAT, clock: '3:16', pop: pp, rot: 0.04, size: 26 })
      }
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawRecFrame(x, t, { battery: t < T.wall ? 0.16 : 0.08 })
      drawClock(x, t, { from: '3:07', to: t < T.down[0] ? '3:16' : '3:24', at: t < T.down[0] ? T.buzz : T.down[0], dur: 0.4, ampm: 'AM', sign: 'leo' })
      factChip(x, t, { text: 'Leo is the Nemean lion, whose hide no weapon could pierce.', at: T.fact, dur: T.factDur, y: 300, label: '★ IN GREEK MYTH' })
      hook.update(t); st1.update(t); box.update(t); box3.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutWin, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E25' }), cardCuts(CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 660 }, gain: 0.014 }),
  ['whoosh', T.mirror, 0.4, 0.02],
  ['bell', T.cutWin + 0.1, 1318.51, 0.025, 2.0, 0.3],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pop', T.bubble[0], 659.25, 0.03, 0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.buzz + i * 0.12), 0.06]),
  ...clockCues(T.buzz, 0.4), ...stampCues(T.st1),
  ...phoneCues(CHAT, { app: 'chat' }),
  ['swell', T.wall, T.wall + 1.4, { bus: 'sfx', gain: 0.025, f0: 500, f1: 1600 }], ['bell', T.wall + 0.4, 1567.98, 0.03, 1.6, -0.3],
  ['tick', T.down[0], 0.05], ...clockCues(T.down[0], 0.4),
  ['pop', T.last, 659.25, 0.035, 0], ['pop', r3(T.last + 0.5), 987.77, 0.045, 0], ['bell', r3(T.last + 0.55), 1318.51, 0.03, 1.8, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE; void GOLD; void lerp
