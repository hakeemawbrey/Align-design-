// st8meteor (30 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E04: infomercial) · story 0–25.6, then the end card.
//   Hook (frame 0): "Tired of *slow,* | steady love?"  The black-and-white BEFORE shot: Ophiuchus yawning through a slow date,
//   while the Meteor bursts in, in full colour, flame trail and all, with a "NEW!" starburst.
//   2.5   AS SEEN ON TV. METEOR: "introducing: INSTANT ROMANCE™. it’s *fast.*"
//   5.9   the products slam onto the demo counter, each with a starburst: flowers, fireworks, a ring box "SOULMATE · DAY 1".
//         METEOR: "flowers! fireworks! “soulmate” on *day one!*"
//   9.4   CALL NOW! 1-800-SOULMATE, flashing. Ophiuchus goes heart-eyed. OPHIUCHUS: "omg. it’s so *bright.*"
//   12.4  "BUT WAIT—" (record scratch). The real fact chip: most meteors are dust or pebbles burning up in the air.
//         THE STARS: "most meteors are just dust, burning up in the *air.*"
//   15.8  the Meteor burns down to a pebble (a puff of smoke). METEOR (a pebble now): "…okay. maybe i’ll go *slower.*"
//   21.0  the fine print scrolls up big: "*results may fade."
//   22.6  frame 0's framing in colour, AFTER: Ophiuchus calm, the pebble beside it. "Fast and bright still *burns out.*"
//   Hidden comet: crosses the top at 3.4. Ghost: rises over the demo counter's top edge (right) at 7.6.
//   Rewatch bait: the counter's little calendar: "DAY 1 soulmate · DAY 2 ? · DAY 3 who?"
// One canvas, DOM type (hook, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawBits, drawOphiuchus, OPH } from '../../st5cast.js'
import { METEOR, drawMeteor, drawComet, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues, EX_RED } from '../../st8cast.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', YEL = '#ffe14a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

const T = {
  hookOut: [2.3, 2.55], color: 2.45, l1: 2.8, comet: 3.4,
  prod: [5.9, 6.4, 6.9], l2: 6.3, ghost: 7.6,
  call: 9.4, l3: 9.9,
  wait: 12.4, fact: 12.55, l4: 12.8,
  burn: [15.8, 18.1], l5: 18.2, close: 20.9,
  fine: [21.0, 22.55],
  last: 22.65, lastOut: [25.25, 25.55],
}
const MN = METEOR.tag, OPHN = OPH.tag, NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: MN, text: 'introducing: INSTANT ROMANCE™. it’s *fast.*', color: METEOR.tagColor },
  { t: T.l2, speaker: MN, text: 'flowers! fireworks! “soulmate” on *day one!*', color: METEOR.tagColor },
  { t: T.l3, speaker: OPHN, text: 'omg. it’s so *bright.*', color: OPH.tagColor },
  { t: T.l4, speaker: NARR, text: 'most meteors are just dust, burning up in the *air.*' },
  { t: T.l5, speaker: MN, text: '…okay. maybe i’ll go *slower.*', color: METEOR.tagColor },
]
const CPS = 28
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const COUNTER = { x0: 60, x1: 1020, y0: 1230, y1: 1420 }
const OP = { x: 260, y: 1060, s: 270 }
export const GHOST = { at: T.ghost, x: 900, y: COUNTER.y0, where: 'rising over the demo counter’s top edge, right' }

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "800 90px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Tired of *slow,* | steady love?', at: 0, out: T.hookOut, size: 110, accentSize: 170, top: 178, accentColor: YEL })
  const last = hookCard(root, { text: 'Fast and bright | still *burns out.*', at: T.last, out: T.lastOut, size: 100, accentSize: 156, top: 178, accentColor: '#ffb36a' })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function text(s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1, stroke = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (stroke) { x.lineWidth = Math.max(4, size * 0.14); x.strokeStyle = INK; x.lineJoin = 'round'; x.strokeText(s, X, Y) }
    x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  function starburst(cx, cy, r, t, lines, { col = YEL, ink = '#c81e3a', k = 1, rot = -0.2, size = 34 } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot + Math.sin(t * 4) * 0.04); x.scale(k * (1 + 0.04 * Math.sin(t * 9)), k * (1 + 0.04 * Math.sin(t * 9)))
    x.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, rr = i % 2 ? r * 0.78 : r; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath()
    x.fillStyle = INK; x.save(); x.translate(4, 6); x.fill(); x.restore(); x.fillStyle = col; x.fill(); x.lineWidth = 5; x.strokeStyle = INK; x.stroke()
    lines.forEach((s, i) => text(s, 0, (i - (lines.length - 1) / 2) * size * 1.05, { size, color: ink, font: INTER, weight: 800, stroke: false }))
    x.restore()
  }
  function counter(t) {
    const { x0, x1, y0, y1 } = COUNTER
    px(x0, y0, x1 - x0, y1 - y0, INK); px(x0 + 6, y0 + 6, x1 - x0 - 12, 30, '#e8e0f4'); px(x0 + 6, y0 + 36, x1 - x0 - 12, y1 - y0 - 42, '#c81e3a')
    for (let i = x0 + 40; i < x1; i += 80) px(i, y0 + 50, 40, y1 - y0 - 70, '#a81530')
    text('★ INSTANT ROMANCE™ ★', 540, y0 + 110, { size: 40, color: YEL })
    // rewatch bait: the little calendar
    x.save(); x.translate(150, y0 - 48); x.rotate(-0.04); px(-70, -44, 140, 92, INK); px(-66, -40, 132, 84, BONE); px(-66, -40, 132, 18, EX_RED)
    x.font = `700 13px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('DAY 1 soulmate', -60, -6); x.fillText('DAY 2 ?', -60, 14); x.fillText('DAY 3 who?', -60, 34); x.restore()
  }
  function products(t) {
    const P = [
      { at: T.prod[0], x: 360, bm: ['.R.P.Y.', 'RRRPYYY', '.R.P.Y.', '..GGG..', '...G...', '..GGG..', '..GGG..'], c: { R: '#ff3d6e', P: '#ff8fd8', Y: YEL, G: '#5fd06a' }, cell: 16, burst: ['FLOWERS!'] },
      { at: T.prod[1], x: 600, fw: true, burst: ['FIREWORKS!'] },
      { at: T.prod[2], x: 850, bm: ['..WWW..', '.W...W.', '..WWW..', 'IIIIIII', 'IVVVVVI', 'IIIIIII'], c: { W: '#bff0ff', I: INK, V: '#8a2a5a' }, cell: 16, burst: ['SOULMATE', 'DAY 1!'] },
    ]
    for (const p of P) {
      const k = pop01(t, p.at, 0.35, 2.4)
      if (k <= 0.01) continue
      const y = COUNTER.y0 - 70
      if (p.fw) {
        const R = rng(Math.floor((t - p.at) * 3) + 5)
        for (let b = 0; b < 3; b++) {
          const ph = ((t - p.at) * 1.1 + b / 3) % 1, cx = p.x + (R() - 0.5) * 160, cy = y - 140 - R() * 120
          x.save(); x.globalAlpha = (1 - ph) * k
          for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, d = 20 + ph * 110; px(cx + Math.cos(a) * d - 5, cy + Math.sin(a) * d - 5, 10, 10, [PINK, YEL, '#7fe0ff', '#fffbea'][(i + b) % 4]) }
          x.restore()
        }
        drawBits(x, ['.R.', 'RRR', 'RYR', 'RRR', 'RYR', 'RRR'], { R: '#c81e3a', Y: YEL }, p.x, y + 10, 14 * k)
      } else drawBits(x, p.bm, p.c, p.x, y, p.cell * k)
      starburst(p.x, y - 190 + (p.fw ? -60 : 0), 92, t, p.burst, { k: pop01(t, p.at + 0.15, 0.3, 2.6), size: p.burst.length > 1 ? 26 : 26, rot: -0.15 + (p.x % 3) * 0.1 })
    }
  }
  function callNow(t) {
    const k = pop01(t, T.call, 0.3, 2.2) * (1 - prog(t, T.wait - 0.15, T.wait))
    if (k <= 0.01) return
    const fl = (t * 3) % 1 < 0.5
    x.save(); x.translate(540, 560); x.scale(k, k); x.rotate(-0.05)
    px(-430, -110, 860, 220, INK); px(-422, -102, 844, 204, fl ? '#c81e3a' : YEL)
    text('CALL NOW!', 0, -36, { size: 92, color: fl ? YEL : '#c81e3a', font: INTER, weight: 800 })
    text('1-800-SOULMATE', 0, 54, { size: 44, color: fl ? '#ffffff' : INK, stroke: false })
    x.restore()
  }
  function factChip(t) {
    const k = pop01(t, T.fact, 0.35, 2.2) * (1 - prog(t, T.burn[1], T.burn[1] + 0.3))
    if (k <= 0.01) return
    x.save(); x.translate(540, 450); x.scale(k, k); x.rotate(0.03)
    px(-440, -96, 880, 192, INK); px(-432, -88, 864, 176, '#10233a'); px(-432, -88, 864, 8, '#7fe0ff')
    text('REAL:', 0, -46, { size: 30, color: '#7fe0ff', stroke: false })
    text('most meteors are dust or pebbles', 0, 0, { size: 32, color: BONE, stroke: false })
    text('burning up in the air', 0, 42, { size: 32, color: BONE, stroke: false })
    x.restore()
  }
  function butWait(t) {
    const p = prog(t, T.wait - 0.05, T.wait + 0.9)
    if (p <= 0 || p >= 1) return
    x.save(); x.translate(540, 900); x.rotate(-0.1); const s = 0.6 + 0.4 * easeOutBack(clamp(p * 5), 2.4); x.scale(s, s); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.7, 1))
    text('BUT WAIT—', 0, 0, { size: 120, color: YEL, font: INTER, weight: 800 })
    x.restore()
  }
  function finePrint(t) {
    const p = prog(t, ...T.fine)
    if (p <= 0 || p >= 1) return
    const k = ease.outCubic(prog(p, 0, 0.35)), o = 1 - ease.inQuad(prog(p, 0.85, 1))
    x.save(); x.globalAlpha = o
    px(0, 0, 1080, 1920, `rgba(6,4,18,${0.75 * k})`)
    x.translate(540, lerp(1700, 900, k)); x.scale(lerp(0.3, 1, k), lerp(0.3, 1, k)); x.rotate(-0.04)
    text('*results may fade.', 0, 0, { size: 96, color: BONE, font: INTER, weight: 800 })
    text('sparks sold separately · offer ends day 3', 0, 90, { size: 30, color: '#cfc8dc' })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const before = t < T.color
      x.save()
      drawSky(x, t, { ...SKY_H, dim: before ? 0.45 : 0.6 }); drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const cp = prog(t, T.comet, T.comet + 2.0)
      if (cp > 0 && cp < 1) drawComet(x, lerp(1110, 600, cp), lerp(450, 500, cp), 28, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [-1, 0.1], bob: 0 })
      // studio floor glow
      if (!before) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1150, 0, 540, 1150, 700); g.addColorStop(0, 'rgba(255,120,60,0.22)'); g.addColorStop(1, 'rgba(255,120,60,0)'); x.fillStyle = g; x.fillRect(0, 400, 1080, 1400); x.restore() }
      counter(t)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
      // Ophiuchus
      const end = t >= T.last
      const ost = before ? { mood: 'sleepy', look: [0, 0] } : t < T.l3 - 0.3 ? { mood: 'neutral', look: [1, -1] } : t < T.wait ? { mood: 'heart' } : t < T.burn[0] ? { mood: 'wide', look: [1, 0], blink: false } : end ? (t < T.last + 0.5 ? { mood: 'neutral', look: [0, 0] } : { mood: 'happy' }) : { mood: 'neutral', look: [1, 0] }
      drawOphiuchus(x, OP.x, OP.y, OP.s, t, { ...ost, hops: [T.color + 0.05, ...talkHops(LINES, OPHN, { cps: CPS }), T.last + 0.4], glitter: before ? 0.3 : 1 })
      x.restore()
      if (before) { x.save(); x.globalCompositeOperation = 'saturation'; x.fillStyle = '#808080'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      if (before) {
        x.save(); x.translate(OP.x, OP.y - 210); x.rotate(-0.12); px(-110, -36, 220, 72, INK); px(-104, -30, 208, 60, BONE); text('BEFORE', 0, 2, { size: 40, color: INK, stroke: false }); x.restore()
        // the slow date: a snail crossing the counter
        drawBits(x, ['..SS.', '.S..S', 'S.SS.S', 'S.S..S', '.SSSSS', 'BBBBBBBB'], { S: '#c8c0d8', B: '#8a8296' }, 300 + t * 6, COUNTER.y0 - 34, 7)
      }
      if (end) { x.save(); x.translate(OP.x, OP.y - 210); x.rotate(-0.12); px(-100, -36, 200, 72, INK); px(-94, -30, 188, 60, '#8ff0b4'); text('AFTER', 0, 2, { size: 40, color: INK, stroke: false }); x.restore() }
      if (!before && !end) products(t)
      // the Meteor
      const bp = prog(t, ...T.burn)
      let mx, my, ms = 230, mood = 'happy'
      if (before) { const p = prog(t, -1.0, T.color); mx = lerp(1180, 760, ease.outCubic(p)); my = lerp(360, 740, ease.outCubic(p)) }
      else if (t < T.burn[0]) { mx = 740 + Math.sin(t * 2.2) * 20; my = 730 + Math.sin(t * 3.1) * 14; mood = t < T.wait ? (t % 2 < 1.6 ? 'happy' : 'smug') : 'wide' }
      else { mx = lerp(740, 700, bp); my = lerp(730, COUNTER.y0 - 40, ease.inQuad(prog(bp, 0.5, 1))); mood = bp < 0.9 ? 'wide' : (t < T.l5 ? 'sad' : 'happy') }
      if (end) { mx = 540; my = COUNTER.y0 - 40; ms = 320; mood = 'happy' }
      drawMeteor(x, mx, my, ms, t, { mood, look: [-1, 0], burn: end ? 1 : bp, dir: before ? 2.0 : 2.5, trail: before ? 520 : 360, hops: talkHops(LINES, MN, { cps: CPS }), exPin: !(end || bp >= 1), aura: !(end || bp >= 1), seed: 17 })
      if (before) starburst(820, 1010, 96, t, ['NEW!'], { size: 46 })
      callNow(t); butWait(t); factChip(t); finePrint(t)
      // infomercial chrome
      if (!before) genreBug(x, t, { text: 'AS SEEN ON TV', x: 70, y: 112, color: '#c81e3a', size: 22, blink: false })
      else genreBug(x, t, { text: 'BEFORE', x: 70, y: 112, color: '#5a5470', size: 22, blink: false })
      drawDayChip(x, t, { day: 8, phase: 'retro', y: 112 })
      drawTicker(x, t, { text: '*results may fade · sparks sold separately · “soulmate” is not a legal term · side effects may include whiplash', y: 1790, speed: 140, label: 'FINE PRINT', color: '#5a5470', size: 26 })
      hook.update(t); last.update(t); box.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E04', fadeIn: 0 })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['whoosh', 0.2, 0.6, 0.05],
  ...stingerCues(T.color, { key: KEY, kind: 'gameshow' }),
  ['tick', T.comet + 0.5, 0.012],
  ...T.prod.flatMap((p, i) => [['pop', p, [880, 1046.5, 1318.51][i], 0.05, (i - 1) * 0.4], ['tom', p, 140 + i * 20, { gain: 0.24, decay: 0.2 }]]),
  ...[0, 1, 2].map(i => ['crash', r3(T.prod[1] + 0.3 + i * 0.6), { gain: 0.02, len: 0.8 }]),
  ...stingerCues(T.call, { key: KEY, kind: 'news' }),
  ['chip', T.wait - 0.1, 520, 0.08, { wave: 'noise', slide: -420, gain: 0.05 }],
  ['pop', T.fact, 1174.66, 0.045, 0], ['bell', T.fact + 0.05, 1760, 0.025, 1.2, 0],
  ['riser', T.burn[0], T.burn[1] - 0.4, 0.04], ['boom', T.burn[1] - 0.3, 0.2], ['whoosh', T.burn[1] - 0.35, 0.5, 0.04], ['tick', T.burn[1] - 0.1, 0.04],
  ['whoosh', T.fine[0], 0.5, 0.05], ['pop', T.fine[0] + 0.3, 523.25, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MN]: 1174.66, [OPHN]: 1046.5, [NARR]: 784 } }),
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', r3(T.last + 0.5), 1318.51, 0.03, 1.6, 0],
  ...endcardCues(STORY_END),
]
