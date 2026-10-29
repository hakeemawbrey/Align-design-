// st9sagam (22 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E41) · story 0–17.6, then the end card.
//   MORNING with Sagittarius. "POV: a Sag wakes up in a *different* city."  The vlog chrome (../../st9day.js) on Sag's
//   home (../../st9saghome.js, ep 'am': three pins on the map, one postcard on the fridge).
//   0.00  Frame 0 / thumbnail: the bedroom at dawn, Sag bolt upright in bed, sleep mask pushed up, wide-eyed, "?" marks.
//         SAG: "wait. where *am* i?"
//   2.75  An airport split-flap board drops in: ARRIVING · LISBON · KYOTO · LIMA · OSLO · CAIRO…  punch-in on the window.
//   5.20  It lands: HOME. SAG: "oh. it’s *home.* hi, home."  7:03 AM — it’s home, actually.
//   7.90  whip → the kitchen. Breakfast standing up, backpack ON (packed since… always). "you never *know.*"
//         (the ghost leans out from behind the postcard fridge; rewatch bait: the one postcard reads "FROM: HERE")
//  11.30  Jupiter peeks into the kitchen window: ★ REAL SKY — Sag’s ruler, Jupiter, is the biggest planet.
//  14.20  whip → the bedroom again (rhymes with frame 0): the backpack comes off, onto the floor, thump. Sag sits on the
//         bed, smiling, in the same pose as frame 0.  LAST: "Adventure starts at *home,* too."
// One canvas (sky + day tint + home + cast + chrome), DOM type (hook, stamps, last line), grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { SAG, SAG_SPOTS, drawSagHome, drawSagHomeFront, drawSag, drawBackpack, jupiterLamp, R, blk, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'

export const DURATION = 22
const KEY = 'Am'
const STORY_END = DURATION - ENDCARD_LEN       // 17.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', ORANGE = '#ffb36a'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  hookOut: 2.6, board: 2.75, punch: 4.55, land: 5.2, boardOut: 7.55,
  kitchen: 7.9, ghost: 9.4, jup: 11.3, bed: 14.2, drop: 14.75, last: 15.05, out: [17.15, 17.55],
}
const B = [
  { at: 0.55, out: 2.55, x: 470, y: 960, text: 'wait. where *am* i?', tag: SAG.tag, tagColor: SAG.color, w: 520 },
  { at: 5.35, out: 7.55, x: 470, y: 960, text: 'oh. it’s *home.* hi, home.', tag: SAG.tag, tagColor: SAG.color, w: 560 },
  { at: 8.25, out: 11.1, x: 640, y: 990, text: 'the backpack stays on. you never *know.*', tag: SAG.tag, tagColor: SAG.color, w: 600 },
]
const STAMPS = [
  { at: 5.45, out: 7.6, time: '7:03 AM', text: 'it’s *home,* actually' },
  { at: 8.7, out: 11.15, time: '7:20 AM', text: 'breakfast. *standing.*' },
]
const FACT = { at: T.jup + 0.3, dur: 2.2, text: 'Sag’s ruler, Jupiter, is the biggest planet in our solar system.', label: '★ REAL SKY', y: 1320 }
const LAST = 'Adventure starts | at *home,* too.'
const CLOCK = [
  { t: 0, from: '7:02', to: '7:03', at: T.land - 0.3, dur: 0.4 },
  { t: T.kitchen, from: '7:03', to: '7:20', at: T.kitchen + 0.05, dur: 0.8 },
  { t: T.bed, from: '7:20', to: '7:31', at: T.bed + 0.05, dur: 0.6 },
]
const CITIES = ['LISBON', 'KYOTO', 'LIMA', 'OSLO', 'CAIRO', 'HOME']
const BOARD = { x0: 120, x1: 960, y: 300 }
export const GHOST = { at: T.ghost, ...SAG_SPOTS.kitchen }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const room = t => (t < T.kitchen ? 'bed' : t < T.bed ? 'kitchen' : 'bed')
const hour = t => lerp(6.4, 7.6, t / STORY_END)

/** the split-flap board: each tile spins while a city lands, the last city is HOME */
function board(x, t) {
  if (t < T.board || t > T.boardOut + 0.3) return
  const k = popIn(t, T.board, 0.35, 2) * (1 - ease.inCubic(prog(t, T.boardOut, T.boardOut + 0.3)))
  const { x0, x1, y } = BOARD, w = x1 - x0, h = 190
  x.save(); x.translate(540, y + h / 2); x.scale(k, k); x.translate(-540, -(y + h / 2))
  blk(x, x0, y, w, h, '#16122a', { o: 8 })
  R(x, '#2a2448', x0, y, w, 46)
  x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillText('✈ ARRIVING IN', x0 + 24, y + 24)
  x.textAlign = 'right'; x.fillStyle = '#7dffb8'; x.fillText(t < T.land ? 'BOARDING…' : 'ON TIME', x1 - 24, y + 24)
  const per = (T.land - T.board - 0.25) / (CITIES.length - 1)
  const idx = t >= T.land ? CITIES.length - 1 : Math.min(CITIES.length - 2, Math.floor((t - T.board - 0.25) / per))
  const city = idx < 0 ? '' : CITIES[idx], since = t >= T.land ? t - T.land : (t - T.board - 0.25) - idx * per
  const N = 6, tw = (w - 60) / N
  for (let i = 0; i < N; i++) {
    const cx = x0 + 30 + i * tw, cy = y + 64
    R(x, '#0b0918', cx + 4, cy, tw - 8, 110); R(x, '#1f1a36', cx + 4, cy + 54, tw - 8, 4)
    const pad = Math.floor((N - city.length) / 2), ch = city[i - pad] || ' '
    const spinning = since < 0.12 + i * 0.03
    const shown = spinning ? 'ABCDEFGHIKLMNOPRSTUVY'[Math.floor((t * 40 + i * 7)) % 21] : ch
    x.font = `700 84px ${MONO}`; x.textAlign = 'center'; x.fillStyle = t >= T.land && !spinning ? GOLD : BONE
    x.fillText(shown, cx + tw / 2, cy + 58)
  }
  x.restore(); x.textAlign = 'left'; x.textBaseline = 'alphabetic'
}
/** the "?" marks over a just-woken head (already up at frame 0) */
function questions(x, t, cx, top) {
  if (t > 2.4) return
  for (let i = 0; i < 3; i++) {
    const ph = (t * 0.9 + i * 0.33) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * Math.min(1, ph + 0.15)) * (1 - prog(t, 2.0, 2.4))
    x.font = `800 ${60 + i * 10}px Inter`; x.fillStyle = [GOLD, PINK, BONE][i]; x.textAlign = 'center'
    x.fillText('?', cx - 90 + i * 90, top - 20 - ph * 60 - (i % 2) * 20)
    x.restore()
  }
}
function sleepMask(x, r) { blk(x, r.x - r.size * 0.24, r.top + r.size * 0.2, r.size * 0.48, r.size * 0.1, '#ff9db8', { o: 4, hi: '#ffd1de' }) }
/** cereal bowl + spoon, held */
function bowl(x, t, cx, cy) {
  blk(x, cx - 46, cy, 92, 40, BONE, { o: 6, lo: '#cfc6b4' }); R(x, '#ffd27a', cx - 40, cy - 4, 80, 8)
  const sp = Math.round(Math.sin(t * 7) * 10)
  R(x, INK, cx + 10, cy - 46 + sp, 8, 50); R(x, '#cfd6e4', cx + 12, cy - 44 + sp, 4, 46)
}
/** the rewatch postcard: WISH YOU WERE HERE · FROM: HERE */
function herePostcard(x) {
  blk(x, 172, 1000, 96, 64, BONE, { o: 4 }); R(x, '#ff9db8', 178, 1006, 36, 26)
  x.font = `700 11px ${MONO}`; x.fillStyle = INK; x.fillText('WISH YOU', 218, 1016); x.fillText('WERE HERE', 218, 1030); x.fillText('FROM: HERE', 178, 1056)
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 84px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Sag wakes up in a *different* city.', at: 0, out: T.hookOut, accentColor: ORANGE, size: 82, accentSize: 122 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: ORANGE }))
  const last = popText(root, LAST, { top: 262, size: 100, accentSize: 156, at: T.last, gap: 0.08, accentColor: ORANGE, wobble: true, late: 2, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  void el

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const rm = room(t), ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: hour(t) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.punch, dur: 1.0, x: 790, y: 800, amount: 0.22, follow: 0.3 })
      const z2 = gaspZoom(t, { at: T.jup + 0.1, dur: 1.3, x: 720, y: 790, amount: 0.28, follow: 0.4 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      if (rm === 'bed' && t < T.kitchen) {
        drawSagHome(x, t, { room: 'bed', ep: 'am' })
        const wake = t < 2.5
        const r = drawSag(x, 400, 1080, 270, t, { pack: false, mood: wake ? 'wide' : t < T.land ? 'squint' : 'happy', look: wake ? [Math.sin(t * 5) > 0 ? 1 : -1, -0.5] : t < T.land ? [1, -1] : [0, 0], blink: wake ? false : undefined, hops: [0.15, 1.0, T.land + 0.05, T.land + 0.4], seed: 3 })
        sleepMask(x, r)
        drawSagHomeFront(x, t, { room: 'bed' })
        questions(x, t, r.x, r.top)
      } else if (rm === 'kitchen') {
        drawSagHome(x, t, { room: 'kitchen', ep: 'am', noPack: true })
        herePostcard(x)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        // Jupiter peeks into the window (the real biggest planet, Sag's ruler)
        const jp = popIn(t, T.jup, 0.5, 1.6) * (1 - ease.inCubic(prog(t, T.bed - 0.6, T.bed - 0.2)))
        if (jp > 0.02) { x.save(); x.beginPath(); x.rect(540, 640, 360, 290); x.clip(); jupiterLamp(x, 720, lerp(1020, 790, jp), 96, t, 0.8 * jp); x.restore() }
        const look = t > T.jup + 0.1 ? [1, -1] : [0, 0]
        const r = drawSag(x, 620, 1150, 260, t, { mood: t > T.jup + 0.1 && t < T.jup + 1.6 ? 'wide' : 'happy', look, hops: [T.kitchen + 0.1, 8.5, 9.4, 10.2, T.jup + 0.1], seed: 3 })
        bowl(x, t, r.x - 150, r.y + 10)
      } else {
        // the last shot rhymes with frame 0: same bed, same framing, now calm; the backpack comes off and lands
        drawSagHome(x, t, { room: 'bed', ep: 'am', noPack: true })
        const dp = prog(t, T.bed + 0.15, T.drop)
        const bx = lerp(560, 940, ease.outQuad(dp)), by = lerp(1060, 1236, ease.inQuad(dp)) - Math.sin(Math.PI * dp) * 120
        drawBackpack(x, bx, by, 7, t)
        const sq = Math.exp(-Math.max(0, t - T.drop) * 9) * (t > T.drop ? 0.12 : 0)
        const r = drawSag(x, 400, 1080, 270, t, { pack: false, mood: 'happy', look: [0, 0], squash: sq, hops: [T.bed + 0.1, T.last + 0.35], seed: 3 })
        sleepMask(x, r)
        drawSagHomeFront(x, t, { room: 'bed' })
      }
      bubble(x, t, B[0]); bubble(x, t, B[1]); bubble(x, t, B[2])
      x.restore()
      board(x, t)
      factChip(x, t, FACT)
      whip(x, t, T.kitchen, { dir: 1 }); whip(x, t, T.bed, { dir: -1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'sag' })
      drawRecFrame(x, t, { battery: lerp(0.9, 0.75, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }, { t: T.bed, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E41' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5]
const boardTicks = () => { const o = []; for (let t = T.board + 0.25; t < T.land + 0.25; t += 0.045) o.push(['tick', r3(t), 0.014]); return o }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [SAG.tag]: 740 } }),
  ['whoosh', T.board + 0.1, 0.35, 0.03], ['pop', T.board + 0.2, 880, 0.04, 0], ...boardTicks(),
  ['whoosh', T.punch + 0.05, 0.3, 0.02],
  ['bell', T.land, 1318.51, 0.05, 1.6, 0], ['bell', T.land + 0.12, 1760, 0.035, 1.6, 0], ['pluck', T.land, 659.25, 0.05, 0.6, 0],
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...whipCues(T.kitchen), ...whipCues(T.bed),
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.jup - 0.5, T.jup + 0.1, 0.05], ['pop', T.jup + 0.12, 523.25, 0.05, 0.3], ['whoosh', T.jup + 0.12, 0.3, 0.02],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['boom', T.drop, 0.18], ['tick', T.drop, 0.05],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 1046.5, 0.05, 0], ['pluck', r3(T.last + 0.35), 880, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1760, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
