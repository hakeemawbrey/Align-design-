// st9gemini3am (33 s vertical, Star Talk season 9 "A Day in the Life", S9 E15: Gemini · 3 AM) · story 0–28.6, then the
// shared end card. The vlog parody (st9day.js), Gemini's bedroom with the lights off (st9geminihome.js, dark: 1).
//   0.00  frame 0: "Which twin is up at *3 AM*?" The bunk beds in the dark: the ♊ star on the bottom bunk AND the twin
//         on the top bunk, both wide awake, staring at the ceiling.
//   3.00  punch-in on the phone glow: notes, "things i'm scared of: 1. being boring". "3:04 AM — can't sleep. neither
//         can *me.*"
//   6.80  TWIN: "you up?" · GEMINI: "what if quiet me is *boring?*" · TWIN: "you're not boring. you're *tired.*"
//  14.40  two pixel hands meet between the bunks; the twins' stars brighten in the window. ★ GREEK MYTH: when Castor died,
//         Pollux shared his immortality so they could stay together.
//  18.10  cut to the dark desk: a new sticky note on the corkboard, in the twin's handwriting: "BE BORING W/ ME?"
//  20.80  back in the bunks. GEMINI: "goodnight, me." · TWIN: "goodnight, *also* me."  Both drift off.
//  24.60  "Both of me are *real*." The rhyme: frame 0's bunks, both asleep now, hands still holding.
// Rewatch bait: the bunk plates (ME / ALSO ME) and the notes app's second line, typed and deleted: "2. being too much".
// Ghost: rises behind the nightstand lamp, pale in the dark.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawTwin, TWIN } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawGeminiHome, geminiRoom, GEM } from '../../st9geminihome.js'

export const DURATION = 33
const KEY = 'Bm'
const STORY_END = DURATION - ENDCARD_LEN       // 28.6
const INK = '#1b1236', BONE = '#efe6d6'
const GEMC = signStar('gemini')
const GEMN = '♊ GEMINI', TWN = TWIN.tag

const T = {
  hookOut: 3.0, phone: 3.0, s1: [3.2, 6.5], phoneOut: 6.6,
  l1: 6.9, l2: 8.6, l3: 11.3, close1: 14.1,
  hands: 14.4, chip: 14.6, desk: 18.1, s2: [18.4, 20.6], bunks: 20.8,
  l4: 21.0, l5: 22.4, close2: 24.4, sleep: 24.4,
  last: 24.6, lastLand: 25.0, out: [28.2, 28.55],
  ghost: 12.0,
}
const LINES1 = [
  { t: T.l1, speaker: TWN, text: 'you up?', color: GEM.yellow },
  { t: T.l2, speaker: GEMN, text: 'what if quiet me is *boring?*', color: GEM.yellow },
  { t: T.l3, speaker: TWN, text: 'you’re not boring. you’re *tired.*', color: GEM.yellow },
]
const LINES2 = [
  { t: T.l4, speaker: GEMN, text: 'goodnight, me.', color: GEM.yellow },
  { t: T.l5, speaker: TWN, text: 'goodnight, *also* me.', color: GEM.yellow },
]
const CPS = 24
const ALL = [...LINES1, ...LINES2]
const GEM_HOPS = talkHops(ALL, GEMN, { cps: CPS }), TW_HOPS = talkHops(ALL, TWN, { cps: CPS })
const NOTES = [
  { text: 'things i’m scared of:', at: T.phone + 0.3 },
  { text: '1. being boring', at: T.phone + 1.4 },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 640, y: 1048, where: 'rising behind the nightstand lamp in the dark bedroom' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Which twin is up at *3 AM*?', at: 0, out: T.hookOut, top: 290 })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '3:04 AM', text: 'can’t sleep. neither can *me.*', accentColor: GEM.yellow }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '3:19 AM', text: 'found a note.' }),
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1500, width: 960, height: 250, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1500, width: 960, height: 250, close: T.close2, cps: CPS })
  const last = popText(root, 'Both of me | are *real.*', { top: 330, size: 116, accentSize: 172, at: T.last, gap: 0.09, accentColor: GEM.yellow, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  function glow(cx, cy, r, rgb, a) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
  }
  const HB = ['.k.k.k.', '.k.k.k.k', '.kkkkkk.', 'kkkkkkk.', '.kkkkk..', '..kkkk..']
  function hand(cx, cy, rot, col) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(1.5, 1.5)
    HB.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') rect(-24 + i * 7 - 2, -22 + j * 7 - 2, 11, 11, INK) }))
    HB.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') rect(-24 + i * 7, -22 + j * 7, 7, 7, col) }))
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inDesk = t >= T.desk && t < T.bunks
      const hour = 3 + prog(t, 0, STORY_END) * 0.5
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const L = geminiRoom(inDesk ? 'desk' : 'bedroom')
      // the twins' stars in the window (brighter once the hands meet)
      if (!inDesk) {
        const b = 0.55 + 0.45 * ease.outCubic(prog(t, T.hands, T.hands + 0.8))
        for (const [sx, sy, sz, col] of [[L.win.x + 80, L.win.y + 120, 40, '#ffd9a0'], [L.win.x + 170, L.win.y + 66, 32, '#f4f2ff']]) {
          glow(sx, sy, 70, '255,240,210', 0.35 * b); drawPixelStar(x, sx, sy, sz * (0.9 + 0.1 * Math.sin(t * 4 + sx)) * b, 2, col)
        }
      }
      let z = 1, fx = 540, fy = 1000
      if (!inDesk && t >= T.phone && t < T.phoneOut) { z = 1 + 0.18 * ease.outBack(prog(t, T.phone, T.phone + 0.4)); fx = 420; fy = 1100 }
      if (inDesk) { z = 1.6 + 0.2 * ease.inOutCubic(prog(t, T.desk, T.bunks)); fx = 470; fy = 930 }
      x.save(); x.translate(fx, fy); x.scale(z, z); x.translate(-fx, -fy)
      drawGeminiHome(x, t, { room: inDesk ? 'desk' : 'bedroom', ep: '3am', dark: 1, hour })
      if (inDesk) {
        // a soft moonlight wash on the new note
        glow(500, 956, 150, '255,250,220', 0.4)
      } else {
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        const [bx, by] = L.spots.bunkLow, [tx, ty] = L.spots.bunkTop
        const asleep = t >= T.sleep
        const awake = (t0) => t < t0 ? 'wide' : 'neutral'
        // phone glow on the lower bunk
        if (t < T.l1 + 1) glow(bx + 230, by - 70, 220, '120,170,255', 0.35 * (1 - prog(t, T.l1, T.l1 + 1)))
        const gMood = asleep ? 'sleepy' : t < T.phone ? 'wide' : t < T.l3 + 1.5 ? 'neutral' : t < T.desk ? 'sparkle' : 'happy'
        const tMood = asleep ? 'sleepy' : t < T.l1 ? 'wide' : t < T.l3 ? awake(T.l1) : t < T.desk ? 'happy' : 'happy'
        drawTwin(x, tx + 120, ty - 6, 150, t, { mood: tMood, look: t < T.l1 ? [0, -1] : [0, 1], blink: tMood === 'wide' ? false : undefined, seed: 7, glow: 0.7, hops: TW_HOPS, twitch: false, bob: 1.5 })
        drawStarChar(x, bx + 120, by - 50, 220, t, { ...GEMC, mood: gMood, look: t < T.phone ? [0, -1] : t < T.l1 ? [1, 0] : [0, -1], blink: gMood === 'wide' ? false : undefined, seed: 3, hops: GEM_HOPS, glow: 0.8, bob: asleep ? 1 : undefined })
        // the hands: one reaches up from the bottom bunk, one down from the top, and they hold
        const hp = ease.outBack(prog(t, T.hands, T.hands + 0.7))
        if (t > T.hands && hp > 0.01) {
          const mx = 600, my = 1030
          // arms (a run of cells)
          for (let i = 0; i < 8; i++) { const f = i / 8; rect(lerp(bx + 200, mx, f * hp) - 6, lerp(by - 60, my + 24, f * hp) - 6, 14, 14, GEM.yellowDk) }
          for (let i = 0; i < 8; i++) { const f = i / 8; rect(lerp(tx + 200, mx, f * hp) - 6, lerp(ty + 40, my - 24, f * hp) - 6, 14, 14, GEM.yellowDk) }
          hand(lerp(bx + 200, mx, hp), lerp(by - 60, my + 24, hp), -2.6, GEM.yellow)
          hand(lerp(tx + 200, mx, hp), lerp(ty + 40, my - 24, hp), 0.5, GEM.yellow)
          if (t > T.hands + 0.7 && t < T.hands + 2.2) glow(mx, my, 120, '255,220,140', 0.3 * Math.sin(Math.PI * prog(t, T.hands + 0.7, T.hands + 2.2)))
        }
      }
      x.restore()
      if (!inDesk && t >= T.phone - 0.05 && t < T.phoneOut + 0.3) {
        const k = pop01(t, T.phone, 0.35, 2) * (1 - ease.inCubic(prog(t, T.phoneOut, T.phoneOut + 0.3)))
        phoneScreen(x, t, { x: 770, y: 1090, w: 380, h: 560, app: 'notes', title: 'NOTES', clock: '3:04', lines: NOTES, pop: k, rot: 0.05, glow: 0.8 })
        // the rewatch bait: "2. being too much" types and deletes itself
        const p = prog(t, T.phone + 2.2, T.phoneOut - 0.4)
        if (p > 0 && p < 1 && k > 0.9) {
          const s = '2. being too much', n = Math.round(s.length * (p < 0.5 ? p * 2 : (1 - p) * 2))
          txt(s.slice(0, n) + (Math.floor(t * 4) % 2 ? '|' : ''), 630, 1050, "600 24px Inter", '#2a2440', 'left')
        }
      }
      factChip(x, t, { label: '★ GREEK MYTH', text: 'When Castor died, Pollux shared his immortality so the twins could stay together.', at: T.chip, dur: 5.0, x: 540, y: 290, color: GEM.yellow })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '3:00', to: '3:31', at: 0, dur: STORY_END - 0.6, ampm: 'AM', sign: 'gemini' })
      drawRecFrame(x, t, { battery: 0.15, time: null })
      for (const c of [T.desk, T.bunks]) { const p = prog(t, c - 0.02, c + 0.2); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.25 * (1 - p); x.fillStyle = '#9fb4ff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box1.update(t); box2.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.desk, kind: 'flip' }, { t: T.bunks, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E15' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.008 }),
  ['whoosh', T.phone - 0.05, 0.3, 0.025], ...phoneCues(NOTES, { app: 'notes' }),
  ...stampCues(T.s1[0]),
  ...talkCues(LINES1, { cps: CPS, pitch: { [GEMN]: 880, [TWN]: 740 }, gain: 0.014 }),
  ['tick', T.ghost + 0.05, 0.012],
  ['bell', T.hands + 0.7, 1174.66, 0.03, 2.2, 0], ['bell', T.hands + 0.85, 1479.98, 0.025, 2.2, 0.2], ['glitter', T.hands + 0.6, T.hands + 1.6],
  ...factChipCues(T.chip, { dur: 5.0 }),
  ['whoosh', T.desk - 0.06, 0.35, 0.02], ...stampCues(T.s2[0]), ['pluck', T.desk + 0.6, 1174.66, 0.03, 0.8, -0.2],
  ['whoosh', T.bunks - 0.06, 0.35, 0.02],
  ...talkCues(LINES2, { cps: CPS, pitch: { [GEMN]: 880, [TWN]: 740 }, gain: 0.014 }),
  ['pop', T.last, 739.99, 0.025, 0], ['pop', T.last + 0.09, 880, 0.025, 0], ['pop', T.lastLand, 1174.66, 0.04, 0], ['bell', T.lastLand, 1479.98, 0.025, 1.6, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
