// st12la (15 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E33) · story 0–10.6, then the shared end card
// ("SIGN UP TO VOTE YOUR CITY").
//   0.00   🔥 HOT TAKE "LA dates are about being seen. Houston's are about being *fed*."  The LA star, mid-smirk in pixel
//          sunglasses, poses on a little velvet-rope carpet under palm trees while camera flashes pop. Heat: 4 flames.
//   2.45   OBJECTION! (record scratch) The Houston star slides in from the right, napkin tucked in, a heaped plate up.
//          HOUSTON: "you can't eat a *photo.*"   LA: "you can *post* one, though."
//   7.35   THE STARS RULE: "the best date is where you actually talk."
//   8.85   🔥 AGREE · 🧊 DISAGREE?
//   9.10   "Be *seen*. Be fed. | Be heard."  The frame-0 pose again, changed: the LA star sits at a little table with the
//          Houston star, sunglasses pushed up, a speech bubble with a heart between them, one shared plate.
// Rewatch bait: the "paparazzo" behind the rope is a tiny Houston star photographing the plate, not the LA star.
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
export const KEY = 'Db'
const NUMERAL = 'S12 E33'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#7fe0ff'
const W = 1080

const T = {
  takeOut: [2.5, 2.65],
  obj: 2.5, houIn: [2.5, 2.85], 
  open: 2.6, l1: 2.75, l2: 5.06, close: 7.61,
  verdict: 7.56, verdictOut: [10.4, 10.58],
  pill: 9.04, pillDur: 0.6,
  last: 9.19, lastLand: 9.44, share: 7.56, out: [10.4, 10.58],
}
const LA = 'LA STAR', HOU = 'HOUSTON STAR'
const LINES = [
  { t: T.l1, speaker: HOU, text: "you can't eat a *photo.*", color: GOLD },
  { t: T.l2, speaker: LA, text: 'you can *post* one, though.', color: PINK },
]
const CPS = 27
const HEAT = 4, PICK = null
const VERDICT = 'the best date is where | you actually *talk.*'
const FLASHES = [0.15, 0.7, 1.35, 1.9, 5.9, 6.5]

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

const SHADES = ['KKKKKKKKKKKKKK', 'KppKK..KKppKK.', '.KKK....KKKK..']
const PLATE = ['..yyoogg..', '.yyooggrr.', 'WWWWWWWWWW', '.WWWWWWWW.']
const PLATE_C = { y: '#f2c75c', o: '#ff9f43', g: '#7dd06a', r: '#e0402c', W: '#efe6d6' }
const NAPKIN = ['WWWWWW', '.WWWW.', '..WW..']
const CAMERA = ['..KK..', 'KKKKKK', 'KgggoK', 'KgKKgK', 'KKKKKK']
const CAMERA_C = { K: '#2a2156', g: '#5a5470', o: '#7fe0ff' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

const LA_P = { x: 320, y: 1200, s: 360 }, HOU_P = { x: 790, y: 1210, s: 340 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: "LA dates are about being seen. Houston's are about being *fed*.", at: 0, out: T.takeOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut, dim: 0.35 })
  const LAST = popText(root, 'Be *seen*. Be fed. | Be heard.', { top: 210, size: 92, accentSize: 132, fit: true, at: T.last, gap: 0.08, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const LA_HOPS = [0.3, ...talkHops(LINES, LA, { cps: CPS }), T.last + 0.3]
  const HOU_HOPS = [T.houIn[1], ...talkHops(LINES, HOU, { cps: CPS }), T.last + 0.4]

  function sunset() {
    const g = x.createLinearGradient(0, 300, 0, 1150)
    g.addColorStop(0, 'rgba(120,60,200,0)'); g.addColorStop(0.6, 'rgba(255,95,160,0.32)'); g.addColorStop(1, 'rgba(255,170,90,0.45)')
    x.fillStyle = g; x.fillRect(0, 300, W, 850)
    // striped setting sun
    const cx = 540, cy = 1000
    for (let j = -12; j <= 0; j++) {
      if (j % 3 === -1) continue
      const w = Math.round(Math.sqrt(144 - j * j)) * 14
      x.fillStyle = j > -4 ? '#ff7a8a' : '#ffb36a'; x.fillRect(cx - w, cy + j * 14, w * 2, 14)
    }
  }
  function palm(px, py, s, t) {
    x.fillStyle = '#140c2c'
    for (let k = 0; k < 14; k++) x.fillRect(Math.round(px + Math.sin(k * 0.25) * 18 * s), Math.round(py - k * 26 * s), Math.round(22 * s), Math.round(28 * s))
    const tx = px + Math.sin(14 * 0.25) * 18 * s, ty = py - 14 * 26 * s
    for (let f = 0; f < 6; f++) {
      const a = -Math.PI + f * (Math.PI / 5) + Math.sin(t * 1.2 + f) * 0.05
      for (let k = 0; k < 9; k++) {
        const rr = k * 18 * s, dy = k * k * 1.4 * s
        x.fillRect(Math.round(tx + Math.cos(a) * rr), Math.round(ty + Math.sin(a) * rr * 0.5 + dy), Math.round(18 * s), Math.round(12 * s))
      }
    }
  }
  function carpet() {
    x.fillStyle = '#0f0a24'; x.fillRect(0, 1150, W, 800)
    x.fillStyle = '#a0203a'; x.beginPath(); x.moveTo(150, 1150); x.lineTo(500, 1150); x.lineTo(560, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
    // the velvet rope
    for (const px of [80, 520]) { x.fillStyle = GOLD; x.fillRect(px - 8, 1020, 16, 140); x.fillRect(px - 16, 1150, 32, 12); x.fillRect(px - 12, 1010, 24, 16) }
    x.strokeStyle = '#a0203a'; x.lineWidth = 12; x.beginPath(); x.moveTo(88, 1030); x.quadraticCurveTo(300, 1110, 512, 1030); x.stroke()
  }
  function flashes(t) {
    for (const f of FLASHES) {
      const u = t - f
      if (u < 0 || u > 0.25) continue
      const k = 1 - u / 0.25
      x.fillStyle = `rgba(255,255,255,${0.12 * k})`; x.fillRect(0, 0, W, 1920)
      const g = x.createRadialGradient(180, 980, 0, 180, 980, 160)
      g.addColorStop(0, `rgba(255,255,255,${0.9 * k})`); g.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = g; x.fillRect(20, 820, 320, 320)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.45, moon: null })
      sunset()
      palm(130, 1150, 1.0, t); palm(960, 1150, 1.15, t)
      carpet()
      const ok = outK(t, T.out)
      const sharing = t > T.share
      // the tiny "paparazzo" behind the rope (rewatch bait): a little Houston star with a camera, aimed at the plate
      if (!sharing) {
        const pr = cityStar(x, 120, 1000, 90, t, { city: 'HOU', mood: 'squint', look: t > T.houIn[1] ? [1, 0] : [1, -1], seed: 11, alpha: ok, glyph: null })
        drawBits(x, CAMERA, CAMERA_C, Math.round(pr.x + 40), Math.round(pr.y - 6), 5, { alpha: ok })
      }
      // a little table at the end
      if (sharing) {
        const tp = pop01(t, T.share, 0.3)
        x.fillStyle = INK; x.fillRect(380, 1250, 320, 22 * tp); x.fillStyle = BONE; x.fillRect(384, 1246, 312, 12 * tp)
        x.fillStyle = '#5a3a24'; x.fillRect(530, 1270, 20, 160 * tp)
        drawBits(x, PLATE, PLATE_C, 540, 1226, 9 * tp, { alpha: ok })
      }
      const laMood = sharing ? 'happy' : t > T.l2 ? 'wink' : t > T.obj ? 'wide' : 'wink'
      const lx = sharing ? lerp(LA_P.x, 330, prog(t, T.share, T.share + 0.35)) : LA_P.x
      const rl = cityStar(x, lx, LA_P.y, LA_P.s, t, { city: 'LA', prop: sharing ? false : 'shades', mood: laMood, look: t > T.obj ? [1, 0] : [0, 0], hops: LA_HOPS, seed: 3, alpha: ok })
      const up = sharing ? ease.outBack(prog(t, T.share, T.share + 0.3)) : 0
      if (sharing) drawBits(x, SHADES, { K: INK, p: '#ff5fd2' }, Math.round(rl.x), Math.round(rl.y - LA_P.s * 0.04 - up * LA_P.s * 0.22), 7, { outline: null, alpha: ok })
      if (t > T.houIn[0]) {
        const hi = ease.outBack(prog(t, ...T.houIn))
        const hx = sharing ? lerp(HOU_P.x, 750, prog(t, T.share, T.share + 0.35)) : lerp(1320, HOU_P.x, hi)
        const houMood = sharing ? 'happy' : t > T.l2 ? 'squint' : 'sparkle'
        const rh = cityStar(x, hx, HOU_P.y, HOU_P.s, t, { city: 'HOU', prop: ['hat', 'napkin'], mood: houMood, look: [-1, 0], hops: HOU_HOPS, seed: 7, alpha: ok })
        if (!sharing) drawBits(x, PLATE, PLATE_C, Math.round(rh.x - 150), Math.round(rh.y - 90 + Math.sin(t * 4) * 4), 9, { rot: -0.1, alpha: ok })
      }
      if (sharing) {
        // the speech bubble with a heart between them: they're talking
        const bp = pop01(t, T.share + 0.35, 0.3)
        x.save(); x.translate(540, 860); x.scale(bp, bp)
        x.fillStyle = INK; x.fillRect(-70, -48, 140, 96); x.fillStyle = BONE; x.fillRect(-62, -40, 124, 80); x.fillRect(-20, 40, 18, 16)
        x.restore()
        if (bp > 0.2) drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, 860, 10 * bp)
      }
      flashes(t)
      take.update(t)
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.out))
      ox.clearRect(0, 0, W, 1920)
      heatMeter(ox, t, { level: HEAT, at: -1, out: [T.verdict - 0.2, T.verdict] })
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      agreePill(ox, t, { at: T.pill, dur: T.pillDur, pick: PICK })
      drawGrain(gx, t)
    },
  }
}

const CUTS = []
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' })]

const NOTE_HZ = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ...FLASHES.map(f => ['tick', f, 0.03]),
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.houIn[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [LA]: 1108.73, [HOU]: 698.46 } }),
  ['bell', T.share + 0.4, 1661.22, 0.025, 1.0, 0],
  ...wordPops(T.last, 6, 0.08, 0, 0.026),
  ...endcardCues(STORY_END),
]
