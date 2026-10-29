// st9canceram (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E16: Cancer · MORNING) · story 0–17.6, then
// the shared end card. The vlog parody (st9day.js) in Cancer's home (st9cancerhome.js).
//   0.00  frame 0: "POV: a Cancer checks on everyone before *8 AM*." The ♋ star sits up in its pillow mountain, phone
//         out, good-morning texts already flying ("SENT 7/12"), little hearts sailing out the window.
//   3.00  the burst: five more, every sign gets one ("gm ♑ you got this"). "6:52 AM — 12 good mornings sent."
//   6.40  cut to the kitchen: soup in a thermos for a sick friend ("FOR ♓ · GET WELL"). "7:20 AM — soup delivery prep."
//   9.70  ★ ASTROLOGY SAYS: Cancer is ruled by the Moon. (the morning Moon glints in the window)
//  10.30  its own tummy growls. An empty bowl. Capricorn texts: "did YOU eat?" CANCER: "oh. i forgot *me.*"
//  13.40  it ladles a bowl for itself, and texts itself: "gm, me ♥ eat something".
//  14.60  "Check on *you*, too." The rhyme: frame 0's phone, now with one text to "ME".
// Rewatch bait: one of the twelve texts goes to the ghost ("gm 👻 i see you"); the fridge has five photos today.
// Ghost: rises over the shelf beside the crab shell, bedroom.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawMoon } from '../../sky.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawCancerHome, cancerRoom, CAN } from '../../st9cancerhome.js'

export const DURATION = 22
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 17.6
const INK = '#1b1236', BONE = '#efe6d6'
const CANC = signStar('cancer')
const CANN = '♋ CANCER'

const T = {
  hookOut: 2.9, burst: 3.0, s1: [3.2, 6.2],
  kitchen: 6.4, s2: [6.6, 9.5], ladle: 6.8,
  chip: 9.7, growl: 10.3, capText: 10.8, l1: 11.4, close: 13.3,
  bowl: 13.4, selfText: 14.0, last: 14.6, lastLand: 15.0, out: [17.2, 17.55],
  ghost: 4.6,
}
const GM = [
  ['♈', 'gm! drink water'], ['♉', 'gm ♥ slow morning ok'], ['♊', 'gm!! one tab today'], ['♌', 'gm superstar'],
  ['♍', 'gm, you’re doing great'], ['♎', 'gm, wear the blue one'], ['♏', 'gm. i see you ♥'],
  ['♐', 'gm! where are you??'], ['♑', 'gm ♥ you got this'], ['♒', 'gm genius'], ['♓', 'gm, feel better!!'], ['👻', 'gm ghost, i see you'],
]
const sentAt = i => i < 7 ? -3 + i * 0.4 : T.burst + 0.2 + (i - 7) * 0.5
const CHAT = GM.map(([g, s], i) => ({ from: 'me', text: `${g} ${s}`, at: sentAt(i) }))
const LINES = [{ t: T.l1, speaker: CANN, text: 'oh. i forgot *me.*', color: '#8fd6f6' }]
const CPS = 24
const HOPS = [T.burst + 0.05, T.kitchen + 0.2, T.growl, ...talkHops(LINES, CANN, { cps: CPS }), T.bowl + 0.2, T.lastLand]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 470, y: 884, where: 'rising over the bedroom shelf, beside the crab shell' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Cancer checks on everyone before *8 AM*.', at: 0, out: T.hookOut, top: 262, size: 82, accentSize: 120, accentColor: '#8fd6f6' })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '6:52 AM', text: '12 good mornings sent.' }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '7:20 AM', text: 'soup delivery prep.' }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 230, close: T.close, cps: CPS })
  const last = popText(root, 'Check on | *you,* too.', { top: 330, size: 120, accentSize: 180, at: T.last, gap: 0.08, accentColor: '#8fd6f6', wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  function chip(cx, cy, s, k, bg = '#ff5d73', fg = '#fff') {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = "700 30px 'Space Mono', monospace"; const w = x.measureText(s).width + 40
    rect(-w / 2 - 5, -31, w + 10, 62, INK); rect(-w / 2, -26, w, 52, bg); txt(s, 0, 2, "700 30px 'Space Mono', monospace", fg)
    x.restore()
  }
  const HEART = ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..']
  function heart(cx, cy, c, col = '#ff7aa2') { HEART.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'H') rect(cx + (i - 2.5) * c, cy + (j - 2.5) * c, c, c, col) })) }
  function thermos(cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-36, -110, 72, 116, INK); rect(-30, -104, 60, 104, CAN.sea); rect(-30, -104, 60, 18, CAN.seaDk)
    rect(-40, -126, 80, 22, INK); rect(-34, -122, 68, 14, CAN.silver)
    rect(-26, -70, 52, 44, BONE); txt('FOR ♓', 0, -56, "700 13px 'Space Mono', monospace", INK); txt('GET WELL', 0, -38, "700 11px 'Space Mono', monospace", INK)
    x.restore()
  }
  function bowl(cx, cy, k, full, t) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-66, -10, 132, 16, INK); rect(-60, -6, 120, 10, full ? CAN.coral : '#d8d2e6')
    rect(-56, 4, 112, 34, INK); rect(-50, 4, 100, 28, BONE); rect(-30, 36, 60, 10, INK)
    if (full) for (let k2 = 0; k2 < 3; k2++) { const ph = (t * 0.9 + k2 / 3) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); rect(-30 + k2 * 26, -30 - ph * 70, 8, 18, BONE); x.globalAlpha = 1 }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inKitchen = t >= T.kitchen
      const hour = 6.75 + prog(t, 0, STORY_END) * 0.95
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const room = inKitchen ? 'kitchen' : 'bedroom'
      const L = cancerRoom(room)
      if (inKitchen) {                                            // the morning Moon (a waning crescent) in the kitchen window
        const k = 1 + 0.25 * Math.sin(Math.PI * prog(t, T.chip, T.chip + 1.2))
        drawMoon(x, L.win.x + 230, L.win.y + 80, 34 * k, 0.86, { alpha: 0.9, glow: 2, earthshine: 0.6, darkAlpha: 0.5 })
      }
      const z = !inKitchen && t >= T.burst ? 1 + 0.1 * ease.outBack(prog(t, T.burst, T.burst + 0.35)) : 1
      x.save(); x.translate(540, 1150); x.scale(z, z); x.translate(-540, -1150)
      drawCancerHome(x, t, { room, ep: 'am', hour })
      if (!inKitchen) {
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        const [bx, by] = L.spots.bed
        drawStarChar(x, bx, by - 30, 250, t, { ...CANC, mood: t < T.burst ? 'happy' : 'sparkle', look: [1, 0], seed: 4, hops: HOPS })
        // little hearts sail out of the window, one per text
        for (let i = 0; i < GM.length; i++) {
          const p = prog(t, sentAt(i) + 2.6, sentAt(i) + 4.2) || (i < 7 && t < 0.01 ? [0.3, 0.55, 0.8][i % 3] : 0)
          const q = i < 7 && t < T.burst ? ((t + 3 - i * 0.4) / 1.6) % 1 : p
          if (q > 0 && q < 1) heart(lerp(bx + 180, L.win.x + 240, q), lerp(by - 120, L.win.y + 80, q) - Math.sin(Math.PI * q) * 120, 7 * (1 - 0.5 * q), ['#ff7aa2', '#ffd1de', CAN.coral][i % 3])
        }
      } else {
        const [sx, sy] = L.spots.stage
        const mood = t < T.growl ? 'happy' : t < T.l1 ? 'wide' : t < T.bowl ? 'neutral' : 'happy'
        const rC = drawStarChar(x, sx - 80, sy - 30, 250, t, { ...CANC, mood, look: t < T.growl ? [-1, 1] : t < T.bowl ? [0, 1] : [0, 0], blink: mood === 'wide' ? false : undefined, seed: 4, hops: HOPS })
        // the ladle in hand while cooking
        if (t < T.growl) { const a = 0.35 + 0.2 * Math.sin(t * 4); x.save(); x.translate(250, 1060); x.rotate(a); rect(-6, -130, 12, 130, INK); rect(-3, -126, 6, 122, CAN.silver); rect(-24, -150, 48, 30, INK); rect(-18, -146, 36, 22, CAN.silver); x.restore() }
        thermos(700, 1186, pop01(t, T.ladle + 0.8, 0.35, 2.2))
        // the tummy growl
        if (t >= T.growl && t < T.growl + 1.0) { const k = pop01(t, T.growl, 0.2, 3) * (1 - prog(t, T.growl + 0.8, T.growl + 1.0)); x.save(); x.translate(rC.x + 20 + Math.sin(t * 50) * 4, rC.y + 110); x.scale(k, k); rect(-90, -28, 180, 56, INK); rect(-84, -22, 168, 44, '#ffd98a'); txt('GRRRR', 0, 2, "800 34px Inter", INK); x.restore() }
        bowl(600, 1172, t >= T.growl ? pop01(t, T.growl + 0.3, 0.3, 2) : 0, t >= T.bowl, t)
        if (t >= T.bowl && t < T.last + 2) for (let i = 0; i < 3; i++) { const p = ((t - T.bowl) * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p); heart(rC.x - 60 + i * 60, rC.top - 20 - p * 100, 6); x.globalAlpha = 1 }
      }
      x.restore()
      if (!inKitchen) {
        phoneScreen(x, t, { x: 790, y: 1150, w: 360, h: 620, app: 'chat', title: 'GOOD MORNINGS', clock: '6:52', lines: CHAT, rot: 0.04, size: 24 })
        const n = GM.filter((_, i) => t >= sentAt(i)).length
        chip(790, 800, `SENT ${n}/12 ♥`, 1, n >= 12 ? '#6fdc6a' : '#ff5d73', n >= 12 ? INK : '#fff')
      } else {
        // Capricorn checks back, then Cancer texts itself (the rhyme)
        const lines = [{ from: '♑ CAPRICORN', text: 'did YOU eat?', at: T.capText }, { from: 'me', text: 'to: ME · gm ♥ eat something', at: T.selfText }]
        const k = pop01(t, T.capText - 0.6, 0.35, 2)
        if (k > 0.02) phoneScreen(x, t, { x: 885, y: 1120, w: 300, h: 460, app: 'chat', title: 'MESSAGES', clock: '7:41', lines, pop: k, rot: 0.05, size: 24 })
      }
      factChip(x, t, { label: '★ ASTROLOGY SAYS', text: 'Cancer is ruled by the Moon.', at: T.chip, dur: 2.4, x: 540, y: 300, color: '#8fd6f6' })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '6:45', to: '7:41', at: 0, dur: STORY_END - 0.6, ampm: 'AM', sign: 'cancer' })
      drawRecFrame(x, t, { battery: 0.95 - 0.15 * prog(t, 0, STORY_END) })
      { const p = prog(t, T.kitchen - 0.02, T.kitchen + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.5 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E16' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.01 }),
  ...phoneCues(CHAT.filter(c => c.at > 0), { app: 'chat' }),
  ['whoosh', T.burst - 0.05, 0.3, 0.025], ...stampCues(T.s1[0]), ['bell', sentAt(11) + 0.1, 1760, 0.03, 1.2, 0.3],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.kitchen - 0.08, 0.35, 0.03], ...stampCues(T.s2[0]), ['pop', T.ladle + 0.85, 987.77, 0.04, 0.3],
  ...factChipCues(T.chip, { dur: 2.4 }), ['bell', T.chip + 0.1, 1318.51, 0.025, 1.4, 0.2],
  ['tick', T.growl, 0.06], ['tick', T.growl + 0.06, 0.05], ['tick', T.growl + 0.12, 0.05], ['pop', T.growl + 0.3, 659.25, 0.035, 0],
  ...phoneCues([{ from: '♑', text: 'x', at: T.capText }, { from: 'me', text: 'x', at: T.selfText }], { app: 'chat' }),
  ...talkCues(LINES, { cps: CPS, pitch: { [CANN]: 740 } }),
  ['pluck', T.bowl, 1174.66, 0.035, 0.6, 0], ['glitter', T.bowl, T.bowl + 0.6],
  ['pop', T.last, 739.99, 0.03, 0], ['pop', T.last + 0.08, 880, 0.03, 0], ['pop', T.lastLand, 1174.66, 0.05, 0], ['bell', T.lastLand, 1479.98, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
