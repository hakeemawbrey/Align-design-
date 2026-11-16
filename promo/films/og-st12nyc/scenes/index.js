// og-st12nyc: the social rework of st12nyc (15 s, Star Talk "Hot Takes", Star Advice) · story 0–10.6, no end card.
//   HOOK (static outline, 0–2.45) "NYC dates: sprint. | Houston: *traffic.*" replaces the HOT TAKE stamp; no HEAT meter,
//   no AGREE pill, no word-pop bursts, nothing fades out at the end (the film ends on the side-by-side stroll).
//   The street scene is lifted 180 px (car, stars and dialogue box inside the safe zone); the car stops further left.
//   Crazier lines: HOUSTON "not slow. *savoring.* i packed snacks."  NYC "three dates. one *lunch.* and a meeting."
// Rewatch bait: a pixel snail on the curb overtakes the Houston star's car.
// One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 15
export const KEY = 'Bb'
const NUMERAL = ''
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CYAN = '#7fe0ff', RED = '#ff4a4a'
const W = 1080

const T = {
  takeOut: [2.5, 2.65],
  obj: 2.5, carIn: [2.3, 3.2], 
  open: 2.6, l1: 2.75, l2: 5.13, close: 7.64,
  verdict: 7.59, verdictOut: [9.2, 9.38],   // og: clears before the last line so the film ends on the stroll
  pill: 9.14, pillDur: 0.6,
  last: 9.29, lastLand: 9.54, share: 7.59, out: [99, 99.1],   // og: nothing fades out
}
const NYC = 'NYC STAR', HOU = 'HOUSTON STAR'
const LINES = [
  { t: T.l1, speaker: HOU, text: 'not slow. *savoring.* i packed snacks.', color: GOLD },
  { t: T.l2, speaker: NYC, text: 'three dates. one *lunch.* and a meeting.', color: CYAN },
]
const CPS = 29
const HEAT = 3, PICK = 'agree'
const VERDICT = 'find your pace together. | fast or slow, just *match.*'

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

const CUP = ['.LLLL.', 'LLLLLL', '.cccc.', '.cBBc.', '.cccc.', '..cc..']
const CUP_C = { L: '#efe6d6', c: '#c98a5a', B: '#efe6d6' }
const SNAIL = ['..ss...', '.sSSs..', 'sSssSs.', 'sSSSSs.', 'bbbbbbb']
const SNAIL_C = { s: '#c98a5a', S: '#8a5a2a', b: '#9fd07a' }

// scroll position: fast until the share, then an easy stroll (integrated so it's continuous)
const SPEED_FAST = 900, SPEED_SLOW = 160
const scrollAt = t => t < 9.0 ? t * SPEED_FAST : 9.0 * SPEED_FAST + (t - 9.0) * SPEED_SLOW
const LIFT = 180   // og: the whole street sits higher (the bottom is under the app caption)
const NYC_P = { x: 320, y: 1190, s: 340 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  // og: no HOT TAKE stamp (the static HOOK owns frame 0)
  const box = dialogueBox(root, { lines: LINES, y: 1330, width: 880, W: 1040, height: 230, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut, dim: 0.35 })
  const LAST = popText(root, 'Same *pace*. | Any city.', { top: 210, size: 104, accentSize: 156, fit: true, at: T.last, wobble: true, gap: 0.08, accentColor: GOLD, lineHeight: 0.98 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const NYC_HOPS = [...talkHops(LINES, NYC, { cps: CPS }), T.lastLand]
  const HOU_HOPS = [T.carIn[1], ...talkHops(LINES, HOU, { cps: CPS }), T.lastLand + 0.1]

  // a deterministic skyline strip, tiled
  const TOWERS = Array.from({ length: 14 }, (_, i) => ({ w: 70 + (i * 37 % 60), h: 220 + (i * 71 % 260), win: i % 3 }))
  const TILE = TOWERS.reduce((a, b) => a + b.w + 8, 0)
  function skyline(t, scroll) {
    const off = (scroll * 0.35) % TILE
    let xx = -off
    while (xx < W) {
      for (const tw of TOWERS) {
        const top = 1140 - tw.h
        if (xx + tw.w > 0 && xx < W) {
          x.fillStyle = '#1a1340'; x.fillRect(Math.round(xx), top, tw.w, tw.h)
          for (let wy = top + 16; wy < 1130; wy += 30) for (let wx = xx + 10; wx < xx + tw.w - 14; wx += 22) {
            if (((wx * 7 + wy * 3) | 0) % 5 === tw.win) continue
            x.fillStyle = 'rgba(255,217,138,0.55)'; x.fillRect(Math.round(wx), wy, 10, 14)
          }
        }
        xx += tw.w + 8
      }
    }
  }
  function street(t, scroll) {
    x.fillStyle = '#2a2350'; x.fillRect(0, 1140, W, 150)                          // sidewalk
    x.fillStyle = '#3a3168'
    const off = scroll % 120
    for (let xx = -off; xx < W; xx += 120) x.fillRect(Math.round(xx), 1140, 6, 150)
    x.fillStyle = '#140c2c'; x.fillRect(0, 1290, W, 14)                           // curb
    x.fillStyle = '#100a24'; x.fillRect(0, 1304, W, 800)                          // road
    x.fillStyle = 'rgba(242,199,92,0.5)'
    const off2 = (scroll * 0.6) % 160
    for (let xx = -off2; xx < W; xx += 160) x.fillRect(Math.round(xx), 1560, 80, 10)
  }
  function speedLines(t, k) {
    if (k <= 0) return
    x.strokeStyle = `rgba(239,230,214,${0.35 * k})`; x.lineWidth = 4
    for (let i = 0; i < 7; i++) {
      const y = 1040 + i * 32, ph = (t * 3 + i * 0.37) % 1
      x.beginPath(); x.moveTo(NYC_P.x - 180 - ph * 160, y); x.lineTo(NYC_P.x - 100 - ph * 160, y); x.stroke()
    }
  }
  function car(cx, cy, t, a) {
    x.save(); x.globalAlpha *= a
    x.fillStyle = INK; x.fillRect(cx - 200, cy - 70, 400, 120)
    x.fillStyle = '#c8352c'; x.fillRect(cx - 194, cy - 64, 388, 108)
    x.fillStyle = INK; x.fillRect(cx - 130, cy - 150, 250, 86)
    x.fillStyle = '#e04a3a'; x.fillRect(cx - 124, cy - 144, 238, 80)
    x.fillStyle = 'rgba(127,224,255,0.45)'; x.fillRect(cx - 110, cy - 134, 100, 66)   // the window the star leans out of
    for (const wx of [-120, 120]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, cy + 52, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a5470'; x.beginPath(); x.arc(cx + wx, cy + 52, 16, 0, Math.PI * 2); x.fill() }
    // brake lights, glowing (traffic)
    const g = x.createRadialGradient(cx + 196, cy - 30, 0, cx + 196, cy - 30, 70)
    g.addColorStop(0, 'rgba(255,74,74,0.7)'); g.addColorStop(1, 'rgba(255,74,74,0)')
    x.fillStyle = g; x.fillRect(cx + 126, cy - 100, 140, 140)
    x.fillStyle = RED; x.fillRect(cx + 184, cy - 44, 16, 28)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      x.save(); x.translate(0, -LIFT)   // og: the street, car and stars sit higher
      const sharing = t > T.share
      const scroll = scrollAt(t)
      skyline(t, scroll)
      street(t, scroll)
      const ok = outK(t, T.out)
      // the snail (rewatch bait): crawls along the curb and passes the car
      const snailX = Math.round(lerp(600, 980, prog(t, 2.6, 8.8)))
      drawBits(x, SNAIL, SNAIL_C, snailX, 1282, 5, { flip: true })
      // the Houston car crawls in (before the share), the Houston star leans out of the window
      const houIn = ease.outCubic(prog(t, ...T.carIn))
      let rh = null
      if (!sharing && t > T.carIn[0]) {
        const cx = lerp(1350, 740, houIn) + Math.sin(t * 2) * 3
        car(cx, 1400, t, ok)
        rh = cityStar(x, cx - 60, 1250, 240, t, { city: 'HOU', mood: t > T.l2 ? 'squint' : 'happy', look: [-1, 0], hops: HOU_HOPS, seed: 7, alpha: ok })
      }
      // NYC star: speed-walk bounce until the share, then a stroll beside the Houston star
      const walkF = sharing ? 2.4 : 9
      const bounce = Math.abs(Math.sin(t * walkF)) * (sharing ? 10 : 22)
      const nx = sharing ? lerp(NYC_P.x, 360, prog(t, T.share, T.share + 0.4)) : NYC_P.x
      speedLines(t, sharing ? 0 : 1)
      const nycMood = sharing ? 'happy' : t > T.l2 ? 'wink' : t > T.obj ? 'wide' : 'wink'
      const rn = cityStar(x, nx, NYC_P.y - bounce, NYC_P.s, t, { city: 'NYC', mood: nycMood, look: t > T.obj && !sharing ? [1, 0] : sharing ? [1, 0] : [0, 0], hops: NYC_HOPS, seed: 2, alpha: ok, bob: 0 })
      if (sharing) {
        const sb = Math.abs(Math.sin(t * walkF + 1.2)) * 10
        const hp = ease.outBack(prog(t, T.share, T.share + 0.35))
        cityStar(x, lerp(1200, 720, hp), NYC_P.y - sb, 280, t, { city: 'HOU', mood: 'happy', look: [-1, 0], hops: HOU_HOPS, seed: 7, alpha: ok, bob: 0 })
      }
      x.restore()
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.out))
      ox.clearRect(0, 0, W, 1920)
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      drawGrain(gx, t)
    },
  }
}

const CUTS = []
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' })]

const NOTE_HZ = [587.33, 698.46, 783.99, 932.33, 1046.5, 1174.66, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.1 + i * 0.22).toFixed(2), 0.012]),       // fast footsteps
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.carIn[0], 0.6, 0.02],
  ...talkCues(LINES, { cps: CPS, pitch: { [NYC]: 932.33, [HOU]: 698.46 } }),
  ['whoosh', T.share, 0.4, 0.02],
  ...endcardCues(STORY_END),
]

// social hook: static caption from frame 0
export const HOOK = 'NYC dates: sprint. | Houston: *traffic.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.45
