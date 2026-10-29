// st9geminiam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E11: Gemini · MORNING) · story 0–17.6, then
// the shared end card. The vlog parody: REC frame, a fast-forwarding clock, timestamped captions (st9day.js), in Gemini's
// home (st9geminihome.js).
//   0.00  frame 0 = the thumbnail: "POV: a Gemini's brain at 7 AM: *47* tabs." The ♊ star sits up in the bottom bunk,
//         wide-eyed, browser tabs already swarming its head (47 on the counter); the twin snores on the top bunk.
//   3.00  punch-in: the tabs flood the room and the window (counter → 63). "7:04 AM — 63 tabs. still in bed."
//   6.40  cut to the kitchen: brushing its teeth while three chats ping on the phone (Sag, Mom, Libra).
//   9.60  a winged Mercury zips past the window with a letter → ★ ASTROLOGY SAYS: Gemini is ruled by Mercury, the messenger.
//         GEMINI: "ruled by the *messenger.* explains the phone."
//  12.80  back in the bedroom: it closes the tabs, pop · pop · pop, 63 → 1. One tab left: "today".
//  14.80  "One tab at a *time*." The same bunk as frame 0, one tab instead of 47 (the rhyme). End card at 17.6.
// Rewatch bait: the tabs (one reads "how to tell twins apart"), the twin's mustache pillow, the grocery list ("2x").
// Ghost: leans out from behind the fridge's left edge in the kitchen.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawTwin } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawGeminiHome, geminiRoom, GEM } from '../../st9geminihome.js'

export const DURATION = 22
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 17.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const GEMC = signStar('gemini')
const GEMN = '♊ GEMINI'

const T = {
  hookOut: 2.95, punch: 3.0, flood: [3.0, 5.6], s1: [3.25, 6.25],
  kitchen: 6.4, s2: [6.6, 9.5], chats: [6.95, 7.55, 8.15],
  mercury: [9.55, 10.75], chip: 9.8, line: 10.25, close: 12.55,
  bedroom2: 12.8, closeTabs: [12.95, 14.45],
  s3: 15.4, last: 14.8, lastLand: 15.1, out: [17.25, 17.55],
  ghost: 7.6,
}
const LINES = [{ t: T.line, speaker: GEMN, text: 'ruled by the *messenger.* explains the phone.', color: GEM.yellow }]
const CPS = 30
const CHATS = [
  { from: '♐ SAG', text: 'trivia tonight?', at: 6.95 },
  { from: 'MOM', text: 'call me!! ♥', at: 7.55 },
  { from: '♎ LIBRA', text: 'brunch? or not? or yes', at: 8.15 },
]
const HOPS = [T.punch + 0.05, ...talkHops(LINES, GEMN, { cps: CPS }), T.lastLand]

// the tabs: a fixed swarm (index order = the order they open; the first 8 are open at frame 0)
const TAB_TXT = ['octopus sleep??', 'cheap flights', 'learn guitar', 'my horoscope', 'is cereal soup', 'how to tell twins apart', 'brunch spots', 'podcast ideas',
  'who invented mail', 'dog memes', 'italian in 3 days', 'tiny houses', 'today', 'why is the sky', 'new hobby', 'pen pals', 'trivia night', 'renew passport']
const TAB_XY = [[230, 700], [720, 690], [880, 830], [180, 1000], [760, 960], [800, 1230], [560, 830], [210, 1300],
  [400, 760], [900, 1090], [300, 900], [650, 1330], [560, 1050], [860, 620], [180, 1150], [720, 1410], [300, 620], [420, 1440]]
const TABS = TAB_TXT.map((s, i) => ({ s, i, x: TAB_XY[i][0], y: TAB_XY[i][1], rot: ((i * 37) % 9 - 4) * 0.025, at: i < 8 ? -1 : T.flood[0] + (i - 8) * 0.22 }))
const TODAY = TABS.find(b => b.s === 'today')
const closeAt = b => b === TODAY ? 1e9 : T.closeTabs[0] + ((b.i * 7) % 17) / 17 * (T.closeTabs[1] - T.closeTabs[0])

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 960, y: 744, where: 'rising over the top of the fridge, kitchen (the 2x grocery-list fridge)' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Gemini’s brain at 7 AM: *47* tabs.', at: 0, out: T.hookOut, top: 270 })
  const caps = [
    stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '7:04 AM', text: '63 tabs. still in bed.' }),
    stampCaption(root, { at: T.s2[0], out: T.s2[1], time: '7:15 AM', text: 'brushing + texting 3 people' }),
    stampCaption(root, { at: T.s3, out: T.out[1], time: '7:40 AM', text: 'one tab open: *today.*', accentColor: GEM.yellow }),
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.line - 0.2, close: T.close, cps: CPS })
  const last = popText(root, 'One tab | at a *time.*', { top: 330, size: 112, accentSize: 160, at: T.last, gap: 0.08, accentColor: GEM.yellow, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function tab(b, k, today = b === TODAY) {
    if (k <= 0.02) return
    x.save(); x.translate(b.x, b.y); x.rotate(b.rot); x.scale(k, k)
    x.font = "700 22px 'Space Mono', monospace"
    const w = Math.max(150, x.measureText(b.s).width + 70), h = 50
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = today ? GEM.yellow : BONE; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = ['#ff8fb1', '#7fe0c4', '#9fe0ff', '#b9a4f0'][b.i % 4]; x.fillRect(-w / 2 + 12, -9, 18, 18)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(b.s, -w / 2 + 40, 1)
    x.fillStyle = '#8a7fa8'; x.textAlign = 'right'; x.fillText('×', w / 2 - 10, 0)
    x.restore()
  }
  function tabCounter(t, n, k = 1) {
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(758, 584, 262, 74); x.fillStyle = '#ff3d6e'; x.fillRect(764, 590, 250, 62)
    x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'
    x.fillText(`${n} TAB${n === 1 ? '' : 'S'}`, 889, 622); x.restore()
  }
  function tabCount(t) {
    if (t < T.flood[0]) return 47
    if (t < T.closeTabs[0]) return Math.round(lerp(47, 63, prog(t, T.flood[0], T.flood[1])))
    return Math.max(1, Math.round(lerp(63, 1, prog(t, T.closeTabs[0], T.closeTabs[1]))))
  }
  function toothbrush(t, cx, cy) {
    const sc = Math.sin(t * 22) * 10
    x.save(); x.translate(cx + sc, cy); x.rotate(-0.25)
    x.fillStyle = INK; x.fillRect(-8, -84, 22, 128); x.fillStyle = GEM.mint; x.fillRect(-3, -40, 12, 80)
    x.fillStyle = BONE; x.fillRect(-3, -78, 12, 34); x.restore()
    for (let i = 0; i < 6; i++) { const ph = (t * 1.3 + i / 6) % 1; x.globalAlpha = 1 - ph; x.fillStyle = '#ffffff'; x.fillRect(cx - 50 + i * 18, cy - 70 - ph * 60, 10, 10); x.globalAlpha = 1 }
  }
  function mercury(t) {
    const p = prog(t, ...T.mercury)
    if (p <= 0 || p >= 1) return
    const mx0 = lerp(-160, 1240, ease.inOutQuad(p)), my0 = 640 - Math.sin(p * Math.PI) * 80
    x.save(); x.translate(mx0, my0); x.scale(1.7, 1.7); const mx = 0, my = 0
    x.fillStyle = INK; x.beginPath(); x.arc(mx, my, 40, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c9c3d9'; x.beginPath(); x.arc(mx, my, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#a49cb8'; x.fillRect(mx - 14, my - 10, 10, 10); x.fillRect(mx + 8, my + 8, 8, 8)
    const flap = Math.sin(t * 40) * 10
    for (const s of [-1, 1]) { x.fillStyle = BONE; x.fillRect(mx - 18 + s * 6 - 28, my - 46 - flap * (s > 0 ? 1 : 0.6), 34, 14); x.fillRect(mx - 18 + s * 6 - 18, my - 58 - flap, 24, 12) }
    x.fillStyle = INK; x.fillRect(mx + 32, my + 4, 58, 40); x.fillStyle = BONE; x.fillRect(mx + 36, my + 8, 50, 32)
    x.fillStyle = '#ff3d6e'; x.fillRect(mx + 56, my + 20, 10, 10)
    for (let i = 1; i < 5; i++) { x.globalAlpha = 0.5 - i * 0.1; x.fillStyle = GOLD; x.fillRect(mx - 40 - i * 34, my - 4, 22, 8) }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inKitchen = t >= T.kitchen && t < T.bedroom2
      const room = inKitchen ? 'kitchen' : 'bedroom'
      const hour = 7 + prog(t, 0, STORY_END) * 0.66
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      // the punch-in on the brain (3.0 → 6.4), a gentle settle after the cuts
      const z = t < T.kitchen ? 1 + 0.16 * ease.outBack(prog(t, T.punch, T.punch + 0.35)) : 1 + 0.04 * (1 - ease.outCubic(prog(t, T.kitchen, T.kitchen + 0.6)))
      const L = geminiRoom(room)
      x.save(); x.translate(540, 900); x.scale(z, z); x.translate(-540, -900)
      drawGeminiHome(x, t, { room, ep: 'am', hour })
      if (room === 'bedroom') {
        const [bx, by] = L.spots.bunkLow, [tx, ty] = L.spots.bunkTop
        drawTwin(x, tx + 120, ty - 10, 130, t, { mood: 'sleepy', bob: 1.5, seed: 7, glow: 0.4, twitch: false })
        const after = t >= T.bedroom2
        const mood = t < T.punch ? 'wide' : after ? (t < T.last ? 'squint' : 'happy') : 'wide'
        drawStarChar(x, bx + 120, by - 50, 220, t, { ...GEMC, mood, look: t < T.punch ? [1, -1] : [0, -1], blink: mood === 'wide' ? false : undefined, seed: 3, hops: HOPS })
      } else {
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        const [sx, sy] = L.spots.stage
        drawStarChar(x, sx - 150, sy - 20, 250, t, { ...GEMC, mood: t < T.mercury[0] ? 'happy' : t < T.line ? 'wide' : 'wink', look: t < T.mercury[0] ? [1, 1] : [-1, -1], seed: 3, hops: HOPS })
        if (t < T.mercury[0] + 0.4) toothbrush(t, sx - 190, sy + 10)
        mercury(t)
      }
      x.restore()
      // the tabs over everything in the bedroom (flood, then close)
      if (!inKitchen) for (const b of TABS) {
        let k = b.at < 0 ? 1 : pop01(t, b.at, 0.3, 2.2)
        if (t >= T.bedroom2) k = b === TODAY ? 1 : 1 - ease.inCubic(prog(t, closeAt(b), closeAt(b) + 0.16))
        if (t >= T.last && b === TODAY) {                                                  // the one tab drifts into the bunk shot
          const p = ease.inOutCubic(prog(t, T.last - 0.1, T.last + 0.6))
          tab({ ...b, x: lerp(b.x, 700, p), y: lerp(b.y, 940, p), rot: lerp(b.rot, -0.05, p) }, 1 + 0.35 * p, true)
          continue
        }
        if (t < T.kitchen || t >= T.bedroom2) tab(b, k)
      }
      if (!inKitchen) tabCounter(t, tabCount(t), t < T.last ? 1 : 1 - prog(t, T.last, T.last + 0.3))
      if (inKitchen) phoneScreen(x, t, { x: 820, y: 1150, w: 340, h: 560, app: 'chat', title: '3 CHATS', clock: '7:15', lines: CHATS, rot: 0.06, pop: pop01(t, T.kitchen + 0.1, 0.35, 2) })
      factChip(x, t, { label: '★ ASTROLOGY SAYS', text: 'Gemini is ruled by Mercury, the messenger.', at: T.chip, dur: 2.6, x: 540, y: 300, color: GEM.yellow })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '7:00', to: '7:40', at: 0, dur: STORY_END - 0.6, ampm: 'AM', sign: 'gemini' })
      drawRecFrame(x, t, { battery: 0.9 - 0.2 * prog(t, 0, STORY_END) })
      // the cuts: a quick white flash for the vlog jump-cut
      for (const c of [T.kitchen, T.bedroom2]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.5 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }, { t: T.bedroom2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E11' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell follow the key)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['whoosh', T.punch - 0.05, 0.3, 0.03], ['pop', T.punch, 1318.51, 0.04, 0],
  ...TABS.filter(b => b.at >= 0).map((b, i) => ['pop', r3(b.at + 0.02), NOTE[i % NOTE.length], 0.022, (b.x - 540) / 600]),
  ...stampCues(T.s1[0]), ...clockCues(0, STORY_END - 0.6, { gain: 0.012 }),
  ['whoosh', T.kitchen - 0.08, 0.35, 0.03], ...stampCues(T.s2[0]), ...stampCues(T.s3), ...phoneCues(CHATS, { app: 'chat' }),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.mercury[0] + 0.2, 0.6, 0.04], ['bell', T.mercury[0] + 0.5, 1975.53, 0.03, 1.2, 0.3], ...factChipCues(T.chip, { dur: 2.6 }),
  ...talkCues(LINES, { cps: CPS, pitch: { [GEMN]: 988 } }),
  ['whoosh', T.bedroom2 - 0.08, 0.35, 0.03],
  ...TABS.filter(b => b !== TODAY).map((b, i) => ['pop', r3(closeAt(b) + 0.04), NOTE[(NOTE.length - 1 - (i % NOTE.length))], 0.02, (b.x - 540) / 600]),
  ['bell', T.closeTabs[1] + 0.1, 1318.51, 0.03, 1.4, 0],
  ['pop', T.last, 987.77, 0.03, 0], ['pop', T.last + 0.08, 1108.73, 0.03, 0], ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 1318.51, 0.04, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void clamp
