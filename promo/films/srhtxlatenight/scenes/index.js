// srhtxlatenight (20 s vertical, Star Talk Remix of htxlatenight "2 AM taco run") · story 0–15.6, then the shared end card.
// ♉ Taurus (the food sign) is your guide at the late-night truck; ♓ Pisces is up late too (and crying, as always).
//   0.00–4.40  "2 AM | taco run. | *Alone.* *Again.*"  A generic food truck glows, its neon TACOS sign buzzing. One taco hops
//              out of the window onto the counter; Taurus goes heart-eyed at it. Box: "2 AM. one taco. honestly? *perfect*
//              date." Then the sign's S sputters out (TACO, singular). Double take. Taurus looks up.
//   4.40–9.30  the camera tilts into the sky; Taurus floats up with you, taco and all. "Tonight's deck | is already
//              *dealt.*" Seven card backs streak in like shooting stars and fan out; the centre one lifts and glows.
//              Pisces is crying up here (it's 2 AM). Box: "someone else is up *this* late too."
//   9.30–15.4  (card cut 9.30) back at the truck: the glowing card falls as a star and pops into ♋ Cancer beside Taurus.
//              "Next run's | for *two.*"  Box: "next run, order *two*. trust me."  A second taco pops out, the tacos clink
//              (heart), and the S flickers back on: TACOS. Everyone hops; Pisces happy-cries. Out by 15.42.
// One canvas (sky + truck + cards + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, taco, heart, drawTruck, TRUCK, BONE, GOLD, PINK, AMBER, TEAL, VIOLET, CYAN } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const TAU_S = signStar('taurus'), CAN = signStar('cancer'), PIS = signStar('pisces')

const T = {
  h0: 0.1, h0Late: BEAT(2), h0Out: [4.25, 4.42],
  truck: 0.15, tau: 0.4, taco1: [0.95, 1.3], crush: 1.4, l1: 2.0, open: 1.8,
  sput: [3.05, 3.4], double: 3.45, lookUp: 4.0,
  tilt: [4.4, 5.2], h1: 4.85, h1Late: BEAT(8.5), h1Out: [9.05, 9.25],
  pis: 5.0, cards: 5.15, cardGap: 0.12, lift: [6.9, 7.4], l2: 5.75,
  cut: 9.3,
  h2: 9.4, h2Late: BEAT(16.5), fall: [9.35, 9.95], can: 9.95, l3: 10.1,
  taco2: [10.55, 10.9], clink: [11.2, 11.55], relight: [12.15, 12.5], cheer: BEAT(21.5), close: 13.0,
  out: [15.0, 15.42], h2Out: [15.22, 15.42],
}
const TAU_NAME = '♉ TAURUS STAR'
const LINES = [
  { t: T.l1, speaker: TAU_NAME, text: '2 AM. one taco. honestly? *perfect* date.' },
  { t: T.l2, speaker: TAU_NAME, text: 'someone else is up *this* late too.' },
  { t: T.l3, speaker: TAU_NAME, text: 'next run, order *two*. trust me.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const TSEAT = { x: 290, y: 1236, size: 230 }
const CSEAT = { x: 820, y: 1240, size: 210 }
const PSKY = { x: 905, y: 1235, size: 150 }      // Pisces in the sky view
const PST = { x: 960, y: 650, size: 130 }        // Pisces over the truck (final beat)
const TACO1 = { x: 480, y: 1068 }, TACO2 = { x: 650, y: 1068 }
const FAN = { px: 540, py: 1640, R: 760, n: 7, spread: 0.46, w: 180 }
const TILT = 1250

const camY = t => (t >= T.cut ? 0 : ease.inOutCubic(prog(t, ...T.tilt)))
const TAU_HOPS = [T.tau + 0.3, T.crush, ...talkHops(LINES, TAU_NAME, { cps: CPS }), T.cheer, T.cheer + 0.6, T.cheer + 1.2]
const CAN_HOPS = [T.can + 0.35, T.clink[1], T.cheer + 0.1, T.cheer + 0.7, T.cheer + 1.3]
const PIS_HOPS = [T.pis + 0.3, T.lift[1], T.cheer + 0.15, T.cheer + 0.75]

function tauState(t) {
  if (t < T.taco1[1]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.sput[0]) return { mood: 'heart' }
  if (t < T.double) return { mood: 'squint', look: [1, -1] }
  if (t < T.lookUp) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.cards) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.lift[0]) return { mood: 'wide', look: [1, -1] }
  if (t < T.cut) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.can) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.clink[1]) return { mood: 'happy' }
  if (t < T.relight[0]) return { mood: 'heart' }
  if (t < T.cheer) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'happy' }
}
function signLit(t) {
  const s = t < T.sput[0] ? 1 : t < T.sput[1] ? (Math.sin(t * 70) > 0.2 ? 1 : 0) : t < T.relight[0] ? 0 : t < T.relight[1] ? (Math.sin(t * 60) > -0.1 ? 1 : 0) : 1
  return [1, 1, 1, 1, s]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const back = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-back.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, '2 AM | taco run. | *Alone.* *Again.*', { top: 130, size: 112, accentSize: 140, at: T.h0, gap: 0.08, accentColor: PINK, wobble: true, late: 2, lateAt: T.h0Late, lateGap: 0.28, lineHeight: 0.98 })
  const H1 = popText(root, "Tonight's deck | is already *dealt.*", { top: 150, size: 108, accentSize: 140, at: T.h1, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h1Late })
  const H2 = popText(root, "Next run's | for *two.*", { top: 150, size: 120, accentSize: 160, at: T.h2, gap: 0.08, accentColor: AMBER, wobble: true, late: 1, lateAt: T.h2Late })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // Taurus: on the street; during the tilt it floats up with the camera (stays on screen)
  function tauPos(t) {
    const c = camY(t)
    return { x: TSEAT.x - 40 * c, y: TSEAT.y + 10 * c - Math.sin(Math.PI * c) * 120 }
  }
  // taco 1: hops out of the window onto the counter; rides with Taurus in the sky; clinks in the last beat
  function taco1Pos(t) {
    if (t < T.cut) {
      const p = prog(t, ...T.taco1)
      let px = lerp(TRUCK.win.x + 160, TACO1.x, p), py = lerp(TRUCK.win.y + 80, TACO1.y, p) - Math.sin(Math.PI * p) * 140
      const c = camY(t)
      if (c > 0) { const tp = tauPos(t); px = lerp(px, tp.x + 150, c); py = lerp(py + c * TILT, tp.y - 30, c) }
      return { x: px, y: py, rot: c * 0.3 }
    }
    const k = ease.inOutCubic(prog(t, ...T.clink))
    return { x: lerp(TACO1.x, 500, k), y: lerp(TACO1.y, 990, k) - 10 * Math.sin(Math.PI * k), rot: -0.35 * k }
  }
  function taco2Pos(t) {
    const p = prog(t, ...T.taco2)
    const k = ease.inOutCubic(prog(t, ...T.clink))
    const bx = lerp(TRUCK.win.x + 200, TACO2.x, p), by = lerp(TRUCK.win.y + 80, TACO2.y, p) - Math.sin(Math.PI * p) * 140
    return { x: lerp(bx, 620, k), y: lerp(by, 990, k) - 10 * Math.sin(Math.PI * k), rot: 0.35 * k }
  }

  function drawCards(t, ok) {
    if (t < T.cards || t >= T.cut || !back) return
    const c = camY(t)
    const ch = FAN.w * back.height / back.width
    for (let i = 0; i < FAN.n; i++) {
      const order = [3, 2, 4, 1, 5, 0, 6][i]
      const t0 = T.cards + i * T.cardGap
      const p = prog(t, t0, t0 + 0.5)
      if (p <= 0) continue
      const u = (order / (FAN.n - 1) - 0.5) * 2
      const an = u * FAN.spread
      let tx = FAN.px + Math.sin(an) * FAN.R, ty = FAN.py - Math.cos(an) * FAN.R
      const fromX = order < 3 ? -300 : order > 3 ? 1380 : 540, fromY = -400
      const e = ease.outCubic(p)
      let cx = lerp(fromX, tx, e), cy = lerp(fromY, ty, e) + (1 - c) * TILT
      let rot = an * e + (1 - e) * (order < 3 ? -0.8 : 0.8), sc = 1
      const center = order === 3
      if (center) {
        const lp = ease.outBack(prog(t, ...T.lift))
        cy -= 120 * lp; sc = 1 + 0.35 * lp
      }
      // streak trail while flying
      if (p < 1) {
        x.save(); x.globalAlpha = 0.5 * (1 - p) * ok
        x.strokeStyle = GOLD; x.lineWidth = 10; x.shadowColor = GOLD; x.shadowBlur = 20; x.lineCap = 'round'
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx - (tx - fromX) * 0.25, cy - (ty - fromY) * 0.25); x.stroke(); x.restore()
      }
      if (center && t > T.lift[0]) {
        const gk = ease.outCubic(prog(t, ...T.lift))
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(cx, cy, 20, cx, cy, 420)
        g.addColorStop(0, `rgba(255,190,220,${0.45 * gk * ok})`); g.addColorStop(1, 'rgba(242,199,92,0)')
        x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 420, 0, Math.PI * 2); x.fill(); x.restore()
      }
      x.save(); x.globalAlpha = ok * (center || t < T.lift[0] ? 1 : 1 - 0.35 * prog(t, ...T.lift)); x.translate(cx, cy); x.rotate(center ? rot * (1 - prog(t, ...T.lift)) : rot); x.scale(sc, sc)
      x.drawImage(back, -FAN.w / 2, -ch / 2, FAN.w, ch); x.restore()
    }
  }

  function drawTaurus(t, ok) {
    const tp = pop01(t, T.tau, 0.38, 2.2) * ok
    if (tp <= 0.02) return
    const st = tauState(t), p = tauPos(t)
    let squash = 0
    if (t >= T.double && t < T.double + 0.4) squash = -0.2 * Math.exp(-(t - T.double) * 7) * Math.cos((t - T.double) * 24)
    const opts = { hops: TAU_HOPS, seed: 2, pop: tp, squash }
    drawStarChar(x, p.x, p.y, TSEAT.size, t, { color: TAU_S.color, glyph: TAU_S.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 1.0, ...opts })
    if (t >= T.sput[1] && t < T.lookUp + 0.4) inSprite(x, starFrame(p.x, p.y, TSEAT.size, t, opts), () => sweatCells(x, t))
  }
  function drawCancer(t, ok) {
    if (t < T.can) return
    const cp = pop01(t, T.can, 0.4, 2.4) * ok
    const st = t < T.clink[1] ? { mood: 'wide', look: [-1, -1] } : t < T.relight[0] ? { mood: 'heart' } : t < T.cheer ? { mood: 'wide', look: [-1, -1], blink: false } : { mood: 'happy' }
    drawStarChar(x, CSEAT.x, CSEAT.y, CSEAT.size, t, { color: CAN.color, glyph: CAN.glyph, mood: st.mood, look: st.look, blink: st.blink, hops: CAN_HOPS, seed: 5, pop: cp, glow: 1.0 })
  }
  function drawPisces(t, ok) {
    const sky = t < T.cut
    const S = sky ? PSKY : PST
    const t0 = sky ? T.pis : T.l3 + 0.4
    const pp = pop01(t, t0, 0.36, 2.1) * ok * (sky ? clamp(camY(t) * 3 - 1.5) : 1)
    if (pp <= 0.02) return
    const st = sky ? (t < T.lift[0] ? { mood: 'squint', tears: 3 } : { mood: 'heart', tears: 1 }) : (t < T.cheer ? { mood: 'heart', tears: 0 } : { mood: 'happy', tears: 3 })
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, S.x, S.y, S.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, glow: 0.9, ...opts })
    inSprite(x, starFrame(S.x, S.y, S.size, t, opts), () => tearsCells(x, t, st.tears))
  }

  function drawFallingStar(t, ok) {
    if (t < T.fall[0] || t > T.can + 0.05) return
    const p = ease.inQuad(prog(t, ...T.fall))
    const fx = lerp(560, CSEAT.x, p), fy = lerp(-80, CSEAT.y, p)
    x.save(); x.globalAlpha = ok
    x.strokeStyle = GOLD; x.lineWidth = 12; x.shadowColor = GOLD; x.shadowBlur = 24; x.lineCap = 'round'
    x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx - (CSEAT.x - 560) * 0.3, fy - 360); x.stroke()
    drawPixelStar(x, fx, fy, 60, 2, GOLD); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const c = camY(t)
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        if (c < 0.999) drawTruck(x, t, { dy: c * TILT, k: pop01(t, T.truck, 0.5, 1.7) * ok, lit: signLit(t) })
        drawCards(t, ok)
        drawFallingStar(t, ok)
        sparkles(t, CSEAT.x, CSEAT.y, T.can, 14, 200, 1, [GOLD, CAN.color, BONE])
        drawPisces(t, ok)
        drawCancer(t, ok)
        drawTaurus(t, ok)
        // tacos (in front of the stars)
        if (t >= T.taco1[0]) { const p = taco1Pos(t); taco(x, p.x, p.y, 0.9 * pop01(t, T.taco1[0], 0.3, 2) * ok, { rot: p.rot, steam: 1, t }) }
        if (t >= T.taco2[0]) { const p = taco2Pos(t); taco(x, p.x, p.y, 0.9 * pop01(t, T.taco2[0], 0.3, 2) * ok, { rot: p.rot, steam: 1, t }) }
        if (t >= T.clink[1]) {
          sparkles(t, 560, 960, T.clink[1], 10, 120, 2, [AMBER, GOLD, BONE])
          const hk = easeOutBack(prog(t, T.clink[1], T.clink[1] + 0.35), 2.6)
          heart(x, 560, 860 - 8 * Math.sin(t * 4), 12 * hk, ok)
        }
        if (t >= T.relight[1]) sparkles(t, 540 + 200, TRUCK.y - 90, T.relight[1], 10, 150, 3, [PINK, BONE, GOLD])
        if (t > T.lift[0] && t < T.cut) {
          for (let i = 0; i < 6; i++) {
            const born = T.lift[0] + i * 0.33, p = (t - born) / 1.3
            if (p < 0 || p >= 1) continue
            const tp = tauPos(t)
            const hx = (i % 2 ? PSKY.x : tp.x) + Math.sin(p * 6 + i) * 30, hy = (i % 2 ? PSKY.y - 80 : tp.y - 130) - p * 200
            x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, hx, hy, 22, 2, PINK); x.restore()
          }
        }
        if (t >= T.cheer) sparkles(t, 540, 1100, T.cheer, 14, 420, 4, [TEAL, GOLD, PINK, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.3 (taco run → the sky), 9.3 (the deck → back at the truck), 12.9.
// cardfx keeps one for a 20 s film: the 9.3 flip, which hides the camera snapping back down to the truck.
const CUTS = [4.3, { t: 9.3, kind: 'flip' }, 12.9]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [466.16, 523.25, 587.33, 698.46, 783.99, 932.33, 1046.5]   // Bb major
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 932.33, 0.05, 0], ['pluck', land, 932.33, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const buzz = (t0, t1) => { const o = []; for (let s = t0; s < t1; s += 0.06) o.push(['chip', +s.toFixed(3), 120, 0.04, { ...FX, wave: 'square', duty: 0.5, gain: 0.012, decay: 0.03, sustain: 0.4 }]); return o }
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...wordPops(T.h0, 4, 0.08, 0, 0.026), ['pop', T.h0Late, 587.33, 0.05, 0], ['pop', T.h0Late + 0.28, 466.16, 0.05, 0], ['boom', T.h0Late + 0.28, 0.08],
  ['pop', T.truck + 0.05, 466.16, 0.035, 0], ...buzz(0.2, 0.5),
  ['pop', T.tau + 0.05, 698.46, 0.04, -0.3],
  ['whoosh', T.taco1[0], 0.2, 0.04], ['pop', T.taco1[1], 1046.5, 0.045, 0], ['pluck', T.crush, 1396.91, 0.035, 0.5, -0.2], ['pluck', T.crush + 0.1, 1864.66, 0.03, 0.5, -0.2],
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [TAU_NAME]: 520 } }),
  // the S sputters out
  ...buzz(T.sput[0], T.sput[1]), ['chip', T.sput[1], 220, 0.3, { ...FX, wave: 'square', duty: 0.25, slide: -12, gain: 0.02, decay: 0.2, sustain: 0.5 }],
  ['boom', T.double, 0.08], ['pluck', T.double + 0.04, 466.16, 0.04, 0.5, 0],
  // tilt into the sky + the deck
  ['whoosh', T.tilt[0], 0.7, 0.06], ['riser', T.tilt[0], T.tilt[1], 0.03],
  ...head(T.h1, 4, 0.08, T.h1Late, 2),
  ...Array.from({ length: 7 }, (_, i) => ['whoosh', +(T.cards + i * T.cardGap).toFixed(3), 0.18, 0.04]),
  ...Array.from({ length: 7 }, (_, i) => ['pop', +(T.cards + i * T.cardGap + 0.45).toFixed(3), NOTE[i], 0.03, (i - 3) * 0.12]),
  ['pop', T.pis + 0.05, 1046.5, 0.035, 0.4], ...sob(T.pis + 0.4, 1400), ...sob(T.pis + 1.6, 1320, 2),
  ['bell', T.lift[0] + 0.1, 1396.91, 0.045, 1.8, 0], ['glitter', T.lift[0], T.lift[0] + 0.8],
  // back at the truck
  ['whoosh', T.fall[0], 0.55, 0.06], ['bell', T.can, 1174.66, 0.04, 1.4, 0.3], ['glitter', T.can, T.can + 0.6], ['pop', T.can + 0.05, 783.99, 0.045, 0.3],
  ...head(T.h2, 2, 0.08, T.h2Late, 4),
  ['whoosh', T.taco2[0], 0.2, 0.04], ['pop', T.taco2[1], 1046.5, 0.045, 0],
  ['bell', T.clink[1], 2093, 0.05, 1.2, 0], ['bell', T.clink[1] + 0.02, 1567.98, 0.035, 1.2, 0], ['pluck', T.clink[1] + 0.12, 1396.91, 0.04, 0.5, 0],
  ...buzz(T.relight[0], T.relight[1]), ['pop', T.relight[1], 1396.91, 0.05, 0.2], ['glitter', T.relight[1], T.relight[1] + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...cheers(T.cheer, T.cheer + 1.5), ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
