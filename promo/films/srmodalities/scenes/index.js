// srmodalities (20 s vertical, Star Talk Remix of "Starters, keepers, changers.") · story 0–15.6, then the end card.
//   0.00–2.82  "Starters, | keepers, | *changers.*"  ♈ with a START button, ♉ with a padlock, ♊ with shuffle arrows pop in
//              one per word and each does its thing once. Box (THE STARS): "every team needs three kinds of star."
//   2.82  CARDINAL "Cardinal: *start it.*"  ♈ drops onto a giant START button: press (▶) … press … press (×3).
//   5.60  FIXED    "Fixed: *keep it going.*"  ♉ clicks a padlock shut and will not move; a tiny ♊ tries to tug it open
//              and flops. Box (♉): "i'm not stubborn. i'm *committed.*"  A loop arrow keeps circling.
//   8.38  MUTABLE  "Mutable: *switch it up.*"  ♊ teleports left, right, centre with the shuffle arrows flipping;
//              a tiny ♓ in the corner switches to crying (the running gag).
//  11.16  "Every team | needs *all three.*"  The three in a row fire together: press, click, shuffle → a star shower.
//              Box (THE STARS): "love's a group project. *team up.*" → heart-eyes. Out by 15.5.
// One canvas (sky + stars + props), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, drawTears, sparkles, pop01, popOut, outK, startButton, padlock, shuffle, loopArrow, playTri, label } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const beat = n => +(0.6 + n * 0.5556).toFixed(3)
const CPS = 30
const RED = '#ff6b5a', LILAC = '#c9a6ff', SKYB = '#7fd0f0'

const C0 = beat(4), F0 = beat(9), M0 = beat(14), END_T = beat(19)       // 2.822 5.600 8.378 11.156
const ACC = 0.83
const T = {
  h0: [0.15, 0.4], h0Acc: 0.65, h0Out: [2.55, 2.76],
  hookAct: [1.45, 1.75, 2.05],
  l1: 0.72,
  drop: C0 + 0.08, press: [C0 + ACC, C0 + 1.39, C0 + 1.67], wideA: C0 + 2.0,
  click: F0 + 0.5, tug: [F0 + 1.35, F0 + 2.3], flop: F0 + 2.3, l2: F0 + 0.72,
  tele: [M0, M0 + 0.556, M0 + 1.111, M0 + 1.667], piscesCry: M0 + 0.9,
  fin: [END_T + 0.95, END_T + 1.25, END_T + 1.55], shower: END_T + 1.85,
  l3: END_T + 0.6, hearts: END_T + 2.55,
  out: [15.1, 15.5],
}
const panelOut = P => [P + 2.55, P + 2.74]
const inPanel = (t, P) => t >= P - 0.02 && t < P + 2.78

const C = { aries: signStar('aries'), taurus: signStar('taurus'), gemini: signStar('gemini'), pisces: signStar('pisces') }
const LINES_A = [{ t: T.l1, speaker: 'THE STARS', text: 'every team needs three kinds of *star.*' }]
const LINES_B = [{ t: T.l2, speaker: '♉ TAURUS STAR', text: "i'm not stubborn. i'm *committed.*", color: '#ffd98a' }]
const LINES_C = [{ t: T.l3, speaker: 'THE STARS', text: "love's a group project. *team up.*" }]
const TA = lineTimes(LINES_A, { cps: CPS }), TB = lineTimes(LINES_B, { cps: CPS }), TC = lineTimes(LINES_C, { cps: CPS })
const CLOSE_A = +(TA[0].done + 1.6).toFixed(3), CLOSE_B = +(TB[0].done + 1.6).toFixed(3), CLOSE_C = 15.3
const TAURUS_HOPS = talkHops(LINES_B, '♉ TAURUS STAR', { cps: CPS })

/** a press bump 0…1 from the nearest press time in a list (fast down, springy up) */
function pressAt(t, list, d = 0.26) {
  let v = 0
  for (const p of list) {
    const k = t - p
    if (k < 0 || k > d) continue
    v = Math.max(v, k < 0.06 ? ease.outCubic(k / 0.06) : 1 - ease.inOutQuad((k - 0.06) / (d - 0.06)))
  }
  return v
}
const flipAt = (t, list) => { let f = 1; for (const p of list) if (t >= p) f = -f; const last = list.filter(p => t >= p).pop(); if (last === undefined) return 1; const k = prog(t, last, last + 0.22); return -f * Math.cos(Math.PI * k) }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const HEADS = [
    [popText(root, 'Starters, | keepers, | *changers.*', { top: 170, size: 112, accentSize: 150, at: T.h0[0], gap: 0.25, late: 1, lateAt: T.h0Acc, wobble: true, accentColor: LILAC }), T.h0Out],
  ]
  const PAN = [
    { P: C0, head: 'Cardinal: | *start it.*', names: 'Aries, Cancer, Libra, Capricorn.', col: RED },
    { P: F0, head: 'Fixed: | *keep it going.*', names: 'Taurus, Leo, Scorpio, Aquarius.', col: GOLD },
    { P: M0, head: 'Mutable: | *switch it up.*', names: 'Gemini, Virgo, Sagittarius, Pisces.', col: LILAC },
  ]
  PAN.forEach(p => {
    HEADS.push([popText(root, p.head, { top: 170, size: 116, accentSize: 150, at: p.P + 0.04, late: 1, lateAt: p.P + ACC, wobble: true, accentColor: p.col, fit: true }), panelOut(p.P)])
    HEADS.push([popText(root, p.names, { top: 470, size: 46, at: p.P + 0.3, gap: 0.09, fit: true }), panelOut(p.P)])
  })
  HEADS.push([popText(root, 'Every team | needs *all three.*', { top: 200, size: 116, accentSize: 156, at: END_T + 0.08, gap: 0.08, late: 2, lateAt: END_T + 0.5, lateGap: 0.14, wobble: true, fit: true }), T.out])
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1400, open: T.l1 - 0.2, close: CLOSE_A, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1400, open: T.l2 - 0.2, close: CLOSE_B, cps: CPS })
  const boxC = dialogueBox(root, { lines: LINES_C, y: 1400, open: T.l3 - 0.2, close: CLOSE_C, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const star = (cx, cy, size, t, c, o) => drawStarChar(x, cx, cy, size, t, { color: c.color, glyph: size >= 120 ? c.glyph : null, ...o })
  const ripple = (cx, cy, t0, t, col = RED) => {
    const d = t - t0
    if (d < 0 || d > 0.5) return
    x.save(); x.globalAlpha *= 1 - d / 0.5; x.strokeStyle = col; x.lineWidth = 8
    x.beginPath(); x.ellipse(cx, cy, 120 + d * 360, 30 + d * 90, 0, 0, Math.PI * 2); x.stroke(); x.restore()
  }

  // ── hook: the three with their props
  function drawHook(t) {
    if (t > T.h0Out[1] + 0.05) return
    const ok = popOut(t, [T.h0Out[0] - 0.05, T.h0Out[1]])
    const at = [T.h0[0], T.h0[1], T.h0Acc]
    const row = [[C.aries, 230], [C.taurus, 540], [C.gemini, 850]]
    row.forEach(([c, cx], i) => {
      const pk = pop01(t, at[i], 0.34) * ok
      const act = T.hookAct[i]
      const pr = i === 0 ? pressAt(t, [act]) : 0
      const mood = t > act ? ['squint', 'happy', 'wide'][i] : 'neutral'
      star(cx, 960 + pr * 24, 210, t, c, { mood, look: [0, 0], pop: pk, squash: pr * 0.14, seed: 2 + i, hops: i === 2 ? [act] : null })
      if (i === 0) { startButton(x, cx, 1180, 0.8 * pk, pr); ripple(cx, 1180, act, t) }
      if (i === 1) padlock(x, cx, 1130, 0.75 * pk, prog(t, act, act + 0.12))
      if (i === 2) shuffle(x, cx, 1190, 0.72 * pk, flipAt(t, [act]))
    })
  }

  // ── CARDINAL: Aries on the big START button
  function drawCardinal(t) {
    const P = C0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    const pk = pop01(t, P, 0.3) * ok
    const pr = pressAt(t, T.press)
    startButton(x, 540, 1250, 1.6 * pk, pr, { glow: pressAt(t, T.press, 0.5) })
    T.press.forEach((p, i) => ripple(540, 1250, p, t))
    const dropK = ease.inQuad(prog(t, T.drop, T.drop + 0.36))
    const land = t - (T.drop + 0.36)
    let y = lerp(-260, 1000, dropK), sq = 0
    if (land > 0 && land < 0.5) sq += 0.2 * Math.exp(-land * 8) * Math.cos(land * 24)
    y += pr * 46; sq += pr * 0.16
    const mood = t < T.press[0] ? 'squint' : t < T.wideA ? (t > T.press[1] ? 'squint' : 'happy') : 'wide'
    star(540, y, 300, t, C.aries, { mood, look: t < T.wideA ? [0, 1] : [0, 0], pop: ok, squash: sq, blink: false, seed: 4, glow: 1.2 })
    // ▶ on the first press, the counter on the next two
    const pt = T.press[0]
    playTri(x, 820, 880, easeOutBack(prog(t, pt, pt + 0.3), 2.6) * 2.1, { alpha: ok })
    if (t > T.press[1]) label(x, t > T.press[2] ? '×3' : '×2', 830, 1040, 64 * (1 + 0.4 * pressAt(t, T.press.slice(1), 0.3)), RED, { alpha: ok, rot: -0.12 })
    sparkles(x, t, 540, 1150, pt, { n: 10, R: 260, seed: 1, cols: [RED, GOLD, BONE, '#ffa23a'] })
  }

  // ── FIXED: Taurus clicks the lock shut and will not move
  function drawFixed(t) {
    const P = F0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    const pk = pop01(t, P, 0.3) * ok
    loopArrow(x, t, 540, 1120, 400, prog(t, T.click + 0.2, T.click + 0.6) * ok)
    const shut = ease.inQuad(prog(t, T.click - 0.12, T.click))
    const tugK = t > T.tug[0] && t < T.tug[1] ? Math.sin((t - T.tug[0]) * 30) : 0
    padlock(x, 540 + tugK * 4, 1190, 1.5 * pk, shut)
    if (t > T.click && t < T.click + 0.9) label(x, 'CLICK!', 790, 1100, 56 * easeOutBack(prog(t, T.click, T.click + 0.25), 2.6), GOLD, { alpha: 1 - prog(t, T.click + 0.6, T.click + 0.9), rot: -0.15 })
    const cl = t - T.click
    const sq = cl > 0 && cl < 0.5 ? 0.12 * Math.exp(-cl * 8) * Math.cos(cl * 22) : 0
    const mood = t < T.click ? 'squint' : t < T.tug[0] + 0.2 ? 'happy' : t < T.flop + 0.3 ? 'eyeroll' : 'happy'
    star(540, 930, 300, t, C.taurus, { mood, look: [0, 0], pop: pk, squash: sq + 0.06, hops: TAURUS_HOPS, bob: 2, seed: 7 })
    // a tiny Gemini tries to tug the padlock open, then flops
    if (t > T.tug[0] - 0.3) {
      const inK = ease.outCubic(prog(t, T.tug[0] - 0.3, T.tug[0]))
      const fl = prog(t, T.flop, T.flop + 0.25)
      const gxp = lerp(1200, 700, inK) + tugK * 10 + fl * 60
      star(gxp, 1150 + fl * 90, 130, t, C.gemini, { mood: fl > 0 ? 'sleepy' : 'squint', look: [-1, 0], pop: ok, squash: -0.1 * Math.abs(tugK) + fl * 0.3, zzz: false, seed: 8, blink: false })
    }
  }

  // ── MUTABLE: Gemini teleports; Pisces switches to crying
  const TP = [540, 250, 830, 540]
  function drawMutable(t) {
    const P = M0
    if (!inPanel(t, P)) return
    const ok = outK(t, panelOut(P))
    shuffle(x, 540, 1260, 1.45 * pop01(t, P, 0.3) * ok, flipAt(t, T.tele.slice(1)))
    let idx = 0
    T.tele.forEach((p, i) => { if (t >= p) idx = i })
    const since = t - T.tele[idx]
    const tk = idx === 0 ? pop01(t, P, 0.3) : easeOutBack(prog(t, T.tele[idx], T.tele[idx] + 0.22), 2.4)
    if (idx > 0) sparkles(x, t, TP[idx - 1], 960, T.tele[idx] - 0.02, { n: 8, R: 120, seed: idx, cols: [LILAC, SKYB, BONE], size: 22 })
    const mood = idx === 3 ? (since > 0.35 ? 'happy' : 'wide') : 'wide'
    star(TP[idx], 960, 280, t, C.gemini, { mood, look: idx === 1 ? [1, 0] : idx === 2 ? [-1, 0] : [0, 0], pop: tk * ok, squash: -0.15 * Math.exp(-since * 8), seed: 10 })
    // tiny Pisces, bottom-left: content … then switches to crying
    const pp = pop01(t, P + 0.3, 0.3) * ok
    const crying = t > T.piscesCry
    const r = star(150, 1290, 130, t, C.pisces, { mood: crying ? 'sparkle' : 'happy', look: [1, -1], pop: pp, seed: 11, hops: crying ? [T.piscesCry] : null })
    if (crying) drawTears(x, t, r, { amount: pp, seed: 2, fountain: true, scale: 1.6 })
  }

  // ── FINALE: all three
  function drawFinale(t) {
    if (t < END_T - 0.02 || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const heart = t > T.hearts
    const row = [[C.aries, 220, 'CARDINAL', RED], [C.taurus, 540, 'FIXED', GOLD], [C.gemini, 860, 'MUTABLE', LILAC]]
    row.forEach(([c, cx, lab, col], i) => {
      const pk = pop01(t, END_T + 0.06 + i * 0.09, 0.32) * ok
      const act = T.fin[i]
      const pr = i === 0 ? pressAt(t, [act]) : 0
      let mood = t < act ? 'neutral' : ['squint', 'happy', 'wide'][i]
      if (t > T.shower) mood = 'happy'
      if (heart) mood = 'heart'
      const hops = [act, T.shower + i * 0.05, ...(heart ? [T.hearts + i * 0.06] : [])]
      star(cx, 930 + pr * 22, 220, t, c, { mood, look: [0, 0], pop: pk, squash: pr * 0.14, hops, seed: 20 + i, glow: 1.15 })
      if (i === 0) { startButton(x, cx, 1170, 0.82 * pk, pr, { glow: pressAt(t, [act], 0.6) }); ripple(cx, 1170, act, t) }
      if (i === 1) padlock(x, cx, 1110, 0.78 * pk, prog(t, act - 0.1, act))
      if (i === 2) shuffle(x, cx, 1180, 0.74 * pk, flipAt(t, [act]))
      label(x, lab, cx, 1300, 34, col, { alpha: pk * clamp((t - act) * 4) })
    })
    sparkles(x, t, 540, 1000, T.shower, { n: 16, R: 420, seed: 3, size: 30 })
    if (heart) sparkles(x, t, 540, 960, T.hearts, { n: 12, R: 330, seed: 6 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const shake = pressAt(t, T.press) > 0.9 ? 4 : 0
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) + shake } : { ...SKY_H, dy: shake })
      drawHook(t); drawCardinal(t); drawFixed(t); drawMutable(t); drawFinale(t)
      boxA.update(t); boxB.update(t); boxC.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: into "Every team needs all three." (the one cut a 20 s film keeps). End card flips at 15.6.
const CUTS = [{ t: +(END_T - 0.07).toFixed(3), kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const pressCue = t => [['tom', +t.toFixed(3), 110, { gain: 0.22 }], ['pop', +(t + 0.01).toFixed(3), 440, 0.04, 0], ['tick', +t.toFixed(3), 0.05]]
const clickCue = t => [['rim', +t.toFixed(3), { gain: 0.16 }], ['tick', +t.toFixed(3), 0.07], ['pop', +(t + 0.02).toFixed(3), 1318.51, 0.035, 0]]
const flipCue = t => [['whoosh', +t.toFixed(3), 0.25, 0.035], ['pop', +(t + 0.05).toFixed(3), 987.77, 0.03, 0.3]]
export const CUES = [
  ['pop', T.h0[0], 739.99, 0.035, -0.3], ['pop', T.h0[1], 880, 0.035, 0], ['pop', T.h0Acc, 1174.66, 0.05, 0.3], ['pluck', T.h0Acc, 880, 0.035, 0.6, 0],
  ...pressCue(T.hookAct[0]), ...clickCue(T.hookAct[1]), ...flipCue(T.hookAct[2]),
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }), ...talkCues(LINES_C, { cps: CPS }),
  ...[C0, F0, M0].flatMap((P, i) => [['pop', P + 0.04, NOTE[i], 0.035, 0], ...wordPops(P + 0.3, 4, 0.09, i + 1, 0.016), ['pop', P + ACC, 1174.66, 0.05, 0], ['pluck', P + ACC, [880, 659.25, 987.77][i], 0.04, 0.6, 0]]),
  // cardinal
  ['whoosh', T.drop, 0.35, 0.04], ['boom', T.drop + 0.36, 0.1],
  ...T.press.flatMap(pressCue), ['glitter', T.press[0], T.press[0] + 0.4], ['bell', T.press[0] + 0.03, 1318.51, 0.025, 1.0, 0],
  ['pop', T.wideA, 1318.51, 0.035, 0],
  // fixed
  ...clickCue(T.click), ['bell', T.click + 0.04, 1760, 0.02, 0.9, 0.3],
  ['whoosh', T.tug[0] - 0.3, 0.3, 0.03], ...[0, 0.2, 0.4, 0.6, 0.8].map(d => ['tick', +(T.tug[0] + d).toFixed(3), 0.03]), ['boom', T.flop + 0.2, 0.06], ['pop', T.flop + 0.22, 293.66, 0.035, 0.4],
  // mutable
  ...T.tele.slice(1).flatMap(flipCue), ['pop', T.piscesCry, 1318.51, 0.03, -0.4], ['pop', T.piscesCry + 0.1, 1174.66, 0.025, -0.4],
  // finale
  ...wordPops(END_T + 0.08, 3, 0.08, 2), ['pop', END_T + 0.5, 1174.66, 0.045, 0], ['pop', END_T + 0.64, 1318.51, 0.05, 0], ['pluck', END_T + 0.64, 1174.66, 0.04, 0.7, 0],
  ...pressCue(T.fin[0]), ...clickCue(T.fin[1]), ...flipCue(T.fin[2]),
  ['glitter', T.shower, T.shower + 0.6], ['bell', T.shower, 1318.51, 0.035, 1.4, 0], ['bell', T.shower + 0.08, 1760, 0.025, 1.2, 0], ['crash', T.shower, { gain: 0.04 }],
  ['glitter', T.hearts, T.hearts + 0.4], ['pluck', T.hearts, 1318.51, 0.035, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
