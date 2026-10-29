// st9cancer3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E20: Cancer · 3 AM) · story 0–27.6, then the
// shared end card. The vlog parody (st9day.js), Cancer's bedroom with the lights off (st9cancerhome.js, dark: 1).
//   0.00  frame 0: "What a Cancer feels at 3 AM: *everything*." The ♋ star wide awake in its pillow mountain, the full
//         Moon in the window, a mood meter pinned at ALL OF THEM.
//   3.00  punch-in on the window. "3:07 AM — feeling everything. again."
//   5.80  the Moon runs its phases in the window, and Cancer's mood runs with it, one chip per phase:
//         NEW · empty  →  CRESCENT · hopeful  →  QUARTER · restless  →  GIBBOUS · overflowing  →  FULL · EVERYTHING  →
//         WANING · letting go.  CANCER: "is it normal to feel *this* much?" · ☾ THE MOON: "i change every night. i'm
//         still *me.*"
//  18.00  ★ REAL SKY: the Moon runs through its phases in about a month.
//  19.60  care: a glass of water, a deep breath, the quilt pulled up. "3:31 AM — okay. sleepy now."
//  23.20  "Moods have *phases*. So do you." The rhyme: frame 0's pillows and full Moon, but asleep now.
// Rewatch bait: the moon lamp on the nightstand matches the window Moon only at the start and the end.
// Ghost: hangs upside down under the bedroom shelf, beside the crab shell.
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawMoon, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawCancerHome, cancerRoom, drawShell, CAN } from '../../st9cancerhome.js'

export const DURATION = 32
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN       // 27.6
const INK = '#1b1236', BONE = '#efe6d6', SKYB = '#8fd6f6'
const CANC = signStar('cancer')
const CANN = '♋ CANCER', MOON = '☾ THE MOON'

const T = {
  hookOut: 2.9, punch: 3.0, s1: [3.2, 5.8],
  cycle: [5.8, 17.8], l1: 7.4, l2: 12.6, close: 15.6,
  chip: 18.0, care: 19.6, s2: [19.8, 22.9], water: 19.8, shell: 20.8, sleep: 21.9,
  last: 23.2, lastLand: 23.6, out: [27.2, 27.55],
  ghost: 4.2,
}
const LINES = [
  { t: T.l1, speaker: CANN, text: 'is it normal to feel *this* much?', color: SKYB },
  { t: T.l2, speaker: MOON, text: 'i change every night. i’m still *me.*', color: '#f4ead8' },
]
const CPS = 24
const PHASES = [['NEW', 'empty', 'neutral'], ['CRESCENT', 'hopeful', 'sparkle'], ['QUARTER', 'restless', 'squint'], ['GIBBOUS', 'overflowing', 'wide'], ['FULL', 'EVERYTHING', 'heart'], ['WANING', 'letting go', 'happy']]
const N = PHASES.length, SEG = (T.cycle[1] - T.cycle[0]) / N
const phaseIdx = t => clamp(Math.floor((t - T.cycle[0]) / SEG), 0, N - 1)
/** the window Moon's phase (0 new · 0.5 full): full at the start and end; one full lap during the cycle */
function moonP(t) {
  if (t < T.cycle[0]) return 0.5
  if (t >= T.cycle[1]) return 0.5
  // NEW at the first chip, then waxing to FULL by chip 5, then waning a little and back to full for the end
  const f = (t - T.cycle[0]) / SEG                                       // 0 … 6
  const p = f < 4 ? lerp(0.02, 0.5, f / 4) : f < 5 ? 0.5 : lerp(0.5, 0.75, f - 5)
  return Math.round(p * 60) / 60
}
const HOPS = [T.punch + 0.05, ...PHASES.map((_, i) => T.cycle[0] + i * SEG + 0.05), ...talkHops(LINES, CANN, { cps: CPS }), T.water, T.shell]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 220, y: 914, where: 'hanging upside down under the bedroom shelf, beside the crab shell' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'What a Cancer feels at 3 AM: *everything*.', at: 0, out: T.hookOut, top: 270, accentColor: SKYB })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '3:07 AM', text: 'feeling everything. *again.*', accentColor: SKYB }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '3:31 AM', text: 'okay. sleepy now.' }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, close: T.close, cps: CPS })
  const last = popText(root, 'Moods have *phases.* | So do you.', { top: 330, size: 104, accentSize: 158, at: T.last, gap: 0.09, accentColor: SKYB, wobble: true, late: 3, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function box6(xx, y, w, h, c, hi) { rect(xx - 6, y - 6, w + 12, h + 12, INK); rect(xx, y, w, h, c); if (hi) rect(xx, y, w, 6, hi) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  function moodChip(label, mood, k, hi = false) {
    if (k <= 0.02) return
    x.save(); x.translate(540, 640); x.scale(k, k)
    x.font = "700 30px 'Space Mono', monospace"; const w = Math.max(420, x.measureText(`${label} · ${mood}`).width + 60)
    box6(-w / 2, -36, w, 72, hi ? SKYB : 'rgba(16,9,38,0.92)')
    txt(`☾ ${label} · ${mood}`, 0, 2, "700 30px 'Space Mono', monospace", hi ? INK : BONE)
    x.restore()
  }
  function meter(t, k) {
    if (k <= 0.02) return
    x.save(); x.translate(760, 1500); x.scale(k, k)
    box6(-140, -50, 280, 100, 'rgba(16,9,38,0.92)')
    txt('MOOD', -110, -24, "700 20px 'Space Mono', monospace", '#9fb4d8', 'left')
    for (let i = 0; i < 8; i++) rect(-110 + i * 28, 0, 20, 30, ['#7fe0c4', '#9fd8ff', '#c79bff', '#ff8fb8', '#ff5d73', '#ffd98a', '#7fe0c4', '#9fd8ff'][(i + Math.floor(t * 8)) % 8])
    txt('ALL OF THEM', 0, -24, "700 20px 'Space Mono', monospace", '#ffd98a', 'left')
    x.restore()
  }
  function glass(cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-24, -60, 48, 70, INK); rect(-18, -54, 36, 58, 'rgba(200,230,255,0.5)'); rect(-18, -30, 36, 34, '#6fb8f0'); rect(-12, -50, 6, 40, 'rgba(255,255,255,0.6)')
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const hour = 3.1 + prog(t, 0, STORY_END) * 0.45
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const L = cancerRoom('bedroom'), W = L.win
      // the Moon in the window: brighter while it talks
      const talk = t >= T.l2 && t < T.close ? 1 : 0
      drawMoon(x, W.x + W.w / 2, W.y + 130, 66, moonP(t), { alpha: 1, glow: 2 + talk * 1.5, earthshine: 0.7, darkAlpha: 0.75 })
      // camera: the punch-in on the window during the cycle
      let z = 1, fx = 540, fy = 1100
      if (t >= T.punch && t < T.care) { z = 1 + 0.12 * ease.inOutCubic(prog(t, T.punch, T.punch + 0.6)); fx = 640; fy = 1000 }
      x.save(); x.translate(fx, fy); x.scale(z, z); x.translate(-fx, -fy)
      drawCancerHome(x, t, { room: 'bedroom', ep: '3am', dark: 1, hour })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'above', cell: 3 })
      const [bx, by] = L.spots.bed
      let mood = 'wide'
      if (t >= T.punch && t < T.cycle[0]) mood = 'neutral'
      if (t >= T.cycle[0] && t < T.cycle[1]) mood = PHASES[phaseIdx(t)][2]
      if (t >= T.cycle[1]) mood = t < T.care ? 'happy' : t < T.sleep ? 'happy' : 'sleepy'
      const rC = drawStarChar(x, bx + 40, by - 40, 250, t, { ...CANC, mood, look: t < T.sleep ? [1, -1] : [0, 0], blink: mood === 'wide' ? false : undefined, seed: 4, hops: HOPS, glow: 0.8, bob: t >= T.sleep ? 1.5 : undefined })
      // tears for FULL · EVERYTHING
      if (t >= T.cycle[0] + 4 * SEG && t < T.cycle[0] + 5 * SEG) for (const s of [-1, 1]) { const tp = ((t * 1.2) + (s > 0 ? 0.5 : 0)) % 1; rect(rC.x + s * 44 - 5, rC.y - 10 + tp * 60, 10, 14, SKYB) }
      // care: the glass of water, the crab shell pulled close
      if (t >= T.water) glass(624, 1176 - 60 * (t < T.water + 1 ? Math.sin(Math.PI * prog(t, T.water, T.water + 1)) : 0), pop01(t, T.water, 0.3, 2))
      // a quilt pulled up once it sleeps
      if (t >= T.sleep) { const p = ease.outCubic(prog(t, T.sleep, T.sleep + 0.6)); box6(76, 1214 - 34 * p, 508, 34 * p + 6, CAN.seaDk, CAN.sea) }
      x.restore()
      meter(t, t < T.punch ? 1 : 1 - ease.inCubic(prog(t, T.punch, T.punch + 0.25)))
      if (t >= T.cycle[0] && t < T.cycle[1] + 0.2) {
        const i = phaseIdx(t), t0 = T.cycle[0] + i * SEG
        const k = pop01(t, t0, 0.25, 2.4) * (i === N - 1 ? 1 - ease.inCubic(prog(t, T.cycle[1] - 0.1, T.cycle[1] + 0.2)) : 1)
        moodChip(PHASES[i][0], PHASES[i][1], k, i === 4)
      }
      factChip(x, t, { label: '★ REAL SKY', text: 'The Moon runs through its phases in about a month.', at: T.chip, dur: 3.0, x: 540, y: 290, color: SKYB })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '3:05', to: '3:33', at: 0, dur: STORY_END - 0.6, ampm: 'AM', sign: 'cancer' })
      drawRecFrame(x, t, { battery: 0.12 })
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.care, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E20' }), cardCuts(CUTS)]

const NOTE = [739.99, 830.61, 880, 987.77, 1108.73, 1318.51]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.008 }),
  ['whoosh', T.punch - 0.05, 0.4, 0.02], ...stampCues(T.s1[0]),
  ['tick', T.ghost + 0.05, 0.012],
  ...PHASES.map((_, i) => ['bell', r3(T.cycle[0] + i * SEG + 0.05), NOTE[i], 0.025, 1.6, (i - 2.5) * 0.15]),
  ['glitter', T.cycle[0] + 4 * SEG, T.cycle[0] + 4 * SEG + 0.8],
  ...talkCues(LINES, { cps: CPS, pitch: { [CANN]: 740, [MOON]: 440 }, gain: 0.014 }),
  ...factChipCues(T.chip, { dur: 3.0 }),
  ...stampCues(T.s2[0]), ['pop', T.water + 0.1, 1318.51, 0.025, 0.3], ['tick', T.water + 0.9, 0.03], ['whoosh', T.shell, 0.5, 0.02], ['pop', T.shell + 0.8, 987.77, 0.03, 0],
  ['whoosh', T.sleep, 0.6, 0.015],
  ['pop', T.last, 739.99, 0.025, 0], ['pop', T.last + 0.09, 880, 0.025, 0], ['pop', T.lastLand, 1108.73, 0.04, 0], ['bell', T.lastLand, 1479.98, 0.025, 1.8, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawShell
