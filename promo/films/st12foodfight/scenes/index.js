// st12foodfight (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E29) · story 0–15.6, then the shared end
// card ("SIGN UP TO VOTE YOUR CITY").
//   0.00      🔥 HOT TAKE "Houston food beats *Austin* food."  The Houston star, mid-smirk, holds up a pixel crawfish at
//             one end of a long picnic table (a HOU pennant on its side, an ATX pennant on the far side). Heat: 5 flames.
//   2.60      OBJECTION! (record scratch) The Austin star slides in from the right with a breakfast taco.
//             AUSTIN: "breakfast tacos. *case closed.*"   HOUSTON: "crawfish. noodles. kolaches. *everything.*"
//   8.75      The food fight: tacos, noodles, crawfish and brisket arc across the table both ways, pixel splats.
//  10.05      THE STARS RULE: "the real winner is sharing a plate with someone you like."
//  12.55      🔥 AGREE · 🧊 DISAGREE?
//  13.00      "Eat both. *Together*."  The frame-0 pose again, changed: the Houston star still holds up the crawfish, but
//             now the Austin star leans in beside it and they share one plate, sauce on both faces.
// Rewatch bait: a pixel pigeon on the pennant line steals one noodle during the food fight and is back, chewing, at the end.
// One canvas (sky + table + cast + sthot devices), DOM type (the take, the box, the verdict, the last line), grain on top.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 20
export const KEY = 'Em'
const NUMERAL = 'S12 E29'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff5a4a', CYAN = '#7fe0ff'
const W = 1080

// ── the timeline (funk, ~0.5 s beats)
const T = {
  takeOut: [2.5, 2.65], heat: 0.55,
  obj: 2.5, atxIn: [2.5, 2.85],
  open: 2.85, l1: 3.0, l2: 5.75, close: 8.85,
  fight: [8.8, 9.9], verdict: 9.95, verdictOut: [13.75, 13.95],
  pill: 13.6, pillDur: 0.6,
  last: 13.8, lastLand: 14.1, share: 12.0, lastOut: [15.35, 15.55], out: [15.35, 15.58],
}
const HOU = 'HOUSTON STAR', ATX = 'AUSTIN STAR'
const LINES = [
  { t: T.l1, speaker: ATX, text: 'breakfast tacos. *case closed.*', color: CYAN },
  { t: T.l2, speaker: HOU, text: 'crawfish. noodles. kolaches. *everything.*', color: GOLD },
]
const CPS = 27
const HEAT = 5, PICK = 'agree'
const VERDICT = 'the real winner is sharing a plate | with someone you *like.*'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── food pixels
const CRAW = [
  '.r.....r..',
  'rr.....rr.',
  '.rrr.rrr..',
  '...rRRr...',
  '...RRRR...',
  '..rRRRRr..',
  '...RRRR...',
  '...RrrR...',
  '....RR....',
  '...rRRr...',
]
const CRAW_C = { r: '#ff7a4a', R: '#e0402c' }
const TACO = [
  '...TTTTTT...',
  '..TgLgLgLT..',
  '.TyLmymLmyT.',
  'TyyyyyyyyyyT',
  'TyyyyyyyyyyT',
  '.TTTTTTTTTT.',
]
const TACO_C = { T: '#c98a2a', y: '#f2c75c', g: '#7dd06a', L: '#5fb84f', m: '#c9542a' }
const BOWL = [
  'n.n..n.n..',
  '.n.nn.n.n.',
  'BBBBBBBBBB',
  'BwwwwwwwwB',
  '.BwwwwwwB.',
  '..BBBBBB..',
]
const BOWL_C = { n: '#ffe7a8', B: '#3f8fd8', w: '#efe6d6' }
const BRISKET = [
  '.KKKKKKK.',
  'KbbbbbbbK',
  'KbppppbbK',
  'KbbbbbbbK',
  '.KKKKKKK.',
]
const BRISKET_C = { K: '#3a1a10', b: '#8a3a22', p: '#ff8fb1' }
const KOLACHE = ['.dddd.', 'ddoodd', 'dooood', 'ddoodd', '.dddd.']
const KOLACHE_C = { d: '#e8b86a', o: '#ff6a5a' }
const PLATE = [
  '..WWWWWWWWWWWW..',
  '.WsssssssssssW..',
  'WsssssssssssssW.',
  '.WWWWWWWWWWWWWW.',
]
const PLATE_C = { W: '#efe6d6', s: '#ffffff' }
const PIGEON = [
  '..GG..',
  '.GGkG.',
  '.GGGGo',
  'GGGGG.',
  '.GGG..',
  '..y.y.',
]
const PIGEON_C = { G: '#8d8aa6', k: '#1b1236', o: '#f2a53a', y: '#f2a53a' }
const PENNANT = (col, txtCol) => [col, txtCol]

// the food fight: deterministic arcs
const FOODS = [
  { bm: TACO, c: TACO_C, from: 1, t0: 8.8, cell: 6 },
  { bm: CRAW, c: CRAW_C, from: 0, t0: 8.95, cell: 6 },
  { bm: BRISKET, c: BRISKET_C, from: 1, t0: 9.1, cell: 7 },
  { bm: BOWL, c: BOWL_C, from: 0, t0: 9.22, cell: 6 },
  { bm: KOLACHE, c: KOLACHE_C, from: 0, t0: 9.4, cell: 7 },
  { bm: TACO, c: TACO_C, from: 1, t0: 9.5, cell: 5 },
]
const FLY = 0.55

// ── layout
const HOU_P = { x: 300, y: 1215, s: 380 }, ATX_P = { x: 790, y: 1215, s: 360 }
const TABLE = { y: 1400, h: 84 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: 'Houston food | beats *Austin* food.', at: 0, out: T.takeOut, accentColor: CYAN })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const LAST = popText(root, 'Eat both. | *Together*.', { top: 220, size: 128, accentSize: 200, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const HOU_HOPS = [0.35, ...talkHops(LINES, HOU, { cps: CPS }), T.lastLand]
  const ATX_HOPS = [T.atxIn[1], ...talkHops(LINES, ATX, { cps: CPS }), T.lastLand + 0.12]

  function pennants(t) {
    // a string of little triangle flags along the top of the scene, alternating HOU red / ATX teal
    x.strokeStyle = '#2a2156'; x.lineWidth = 4; x.beginPath()
    for (let xx = -20; xx <= 1100; xx += 20) { const u = (xx + 20) / 1120, y = 690 + 70 * 4 * u * (1 - u); xx === -20 ? x.moveTo(xx, y) : x.lineTo(xx, y) }
    x.stroke()
    for (let i = 0; i < 12; i++) {
      const xx = 20 + i * 92, u = (xx + 20) / 1120, y = 690 + 70 * 4 * u * (1 - u)
      const sw = Math.sin(t * 3 + i) * 4
      x.fillStyle = i < 6 ? (i % 2 ? '#c8352c' : '#f2c75c') : (i % 2 ? '#3fb8a8' : '#efe6d6')
      x.beginPath(); x.moveTo(xx - 22, y); x.lineTo(xx + 22, y); x.lineTo(xx + sw, y + 44); x.closePath(); x.fill()
    }
  }
  function table() {
    const { y, h } = TABLE
    x.fillStyle = '#140c2c'; x.fillRect(40, y - 6, W - 80, h + 12)
    // gingham tablecloth: red on the Houston half, teal on the Austin half
    for (let i = 0; i < 25; i++) for (let j = 0; j < 4; j++) {
      const left = i < 12.5
      const on = (i + j) % 2 === 0
      x.fillStyle = on ? (left ? '#d8463a' : '#36a89a') : BONE
      x.fillRect(46 + i * 40, y + j * (h / 4), 40, h / 4)
    }
    x.fillStyle = '#0b0820'; x.fillRect(0, y + h, W, 1920 - y - h)
    x.fillStyle = '#5a3a24'; x.fillRect(120, y + h, 26, 1920); x.fillRect(W - 146, y + h, 26, 1920)
    // grass tufts on the ground
    x.fillStyle = '#1a2a3a'; for (let i = 0; i < 24; i++) x.fillRect(10 + i * 45, 1700 + (i * 37 % 120), 12, 18)
    // the middle line + two little table tents
    x.fillStyle = INK; x.fillRect(W / 2 - 3, y, 6, h)
  }
  function splats(t, cx, cy, at, col, seed) {
    if (t < at) return
    const k = clamp((t - at) / 0.18)
    for (let i = 0; i < 5; i++) {
      const a = seed * 1.7 + i * 1.3, r = 18 + (i * 13 % 26)
      x.fillStyle = col
      const s = Math.round((10 + (i % 3) * 5) * k)
      x.fillRect(Math.round(cx + Math.cos(a) * r * k), Math.round(cy + Math.sin(a) * r * k), s, s)
    }
  }
  function foodFight(t) {
    for (const [i, f] of FOODS.entries()) {
      const p = prog(t, f.t0, f.t0 + FLY)
      if (p <= 0 || p >= 1) continue
      const x0 = f.from === 0 ? HOU_P.x + 60 : ATX_P.x - 60, x1 = f.from === 0 ? ATX_P.x - 10 : HOU_P.x + 10
      const px = lerp(x0, x1, p), py = lerp(1180, 1150, p) - Math.sin(Math.PI * p) * (260 + i * 30)
      drawBits(x, f.bm, f.c, Math.round(px), Math.round(py), f.cell * 1.6, { rot: (f.from ? -1 : 1) * p * 6 })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      x.save(); x.translate(objectionShake(t, T.obj) + slamShake(t, T.verdict + 0.32, 6), 0)
      // sunset-ish warm glow low in the sky (cookout hour)
      const g = x.createLinearGradient(0, 600, 0, 1270)
      g.addColorStop(0, 'rgba(255,120,80,0)'); g.addColorStop(1, 'rgba(255,120,80,0.22)')
      x.fillStyle = g; x.fillRect(0, 600, W, 670)
      pennants(t)
      // the pigeon on the pennant line (rewatch bait): steals a noodle mid-fight, chewing at the end
      const pigX = 880, pigY = 736
      drawBits(x, PIGEON, PIGEON_C, pigX, pigY, 6, { flip: t > 9.5 })
      if (t > 9.45) { x.fillStyle = '#ffe7a8'; x.fillRect(pigX + (t > 9.5 ? -30 : 20), pigY + 4 + Math.round(Math.sin(t * 20) * 2), 22, 4) }

      const fight = t > T.fight[0] && t < T.fight[1] + 0.4
      const sharing = t > T.share
      const ok = outK(t, T.out)
      // HOUSTON (left): mid-smirk at frame 0, crawfish held high
      const houMood = sharing ? 'happy' : fight ? 'wide' : t > T.l2 ? 'squint' : t > T.obj ? 'wide' : 'wink'
      const houX = sharing ? lerp(HOU_P.x, 360, ease.inOutCubic(prog(t, T.share, T.share + 0.4))) : HOU_P.x
      const rh = cityStar(x, houX, HOU_P.y, HOU_P.s, t, { city: 'HOU', mood: houMood, look: t > T.obj ? [1, 0] : [0, 0], hops: HOU_HOPS, seed: 3, alpha: ok })
      // ATX (right): slides in on the objection
      const ai = ease.outBack(prog(t, ...T.atxIn))
      const atxX = sharing ? lerp(ATX_P.x, 730, ease.inOutCubic(prog(t, T.share, T.share + 0.4))) : lerp(1300, ATX_P.x, ai)
      let ra = null
      if (t > T.atxIn[0]) {
        const atxMood = sharing ? 'happy' : fight ? 'wide' : t > T.l2 ? 'eyeroll' : 'squint'
        ra = cityStar(x, atxX, ATX_P.y, ATX_P.s, t, { city: 'ATX', mood: atxMood, look: [-1, 0], hops: ATX_HOPS, seed: 8, alpha: ok })
      }
      // props
      if (!sharing) {
        const lift = t < T.obj ? Math.sin(t * 5) * 6 : 0
        drawBits(x, CRAW, CRAW_C, Math.round(rh.x + 190), Math.round(rh.y - 110 + lift), 12, { rot: 0.25, alpha: ok })
        if (ra) drawBits(x, TACO, TACO_C, Math.round(ra.x - 200), Math.round(ra.y - 70), 11, { rot: -0.2, alpha: ok })
      } else if (ra) {
        // one shared plate between them: half crawfish, half taco
        const sp = pop01(t, T.share + 0.2, 0.35)
        drawBits(x, PLATE, PLATE_C, 545, 1372, 16 * sp, { alpha: ok })
        drawBits(x, CRAW, CRAW_C, 485, 1318, 9 * sp, { rot: -0.3, alpha: ok })
        drawBits(x, TACO, TACO_C, 610, 1330, 9 * sp, { alpha: ok })
      }
      // sauce on both faces after the fight
      splats(t, rh.x - 40, rh.y - 10, 9.1, '#ff6a3a', 1)
      if (ra) splats(t, ra.x + 30, ra.y + 10, 9.3, '#ffe7a8', 2)
      foodFight(t)
      table()
      x.restore()


      take.update(t)
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.lastOut))
      ox.clearRect(0, 0, W, 1920)
      heatMeter(ox, t, { level: HEAT, at: -1, out: [T.verdict - 0.2, T.verdict] })
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      agreePill(ox, t, { at: T.pill, dur: T.pillDur, pick: PICK })
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: 9.93, kind: 'deal' }, 13.85]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE_HZ = [659.25, 739.99, 783.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...objectionCues(T.obj, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ['whoosh', T.atxIn[0], 0.4, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [HOU]: 659.25, [ATX]: 987.77 } }),
  ...FOODS.map(f => ['whoosh', f.t0, 0.3, 0.022]),
  ...FOODS.map((f, i) => ['pop', +(f.t0 + FLY).toFixed(3), NOTE_HZ[i % 7] / 2, 0.04, f.from ? -0.5 : 0.5]),
  ['tick', 9.48, 0.02],
  ['pop', T.share + 0.2, 880, 0.035, 0],
  ...wordPops(T.last, 2, 0.08, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand + 0.1, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
