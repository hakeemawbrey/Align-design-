// st7opposites (75 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 10) · story 0–70.6, then the shared end card.
//   Virgo × Pisces (the season-4 couple, opposite signs: earth and water, the list and the dream) on a long night walk.
//   Their first real fight, done right: they stop, say the "always" things, hear how it landed, look up, then repair with
//   specifics. The real fact: opposite signs sit 180° apart on the zodiac, and the sky opposite the Sun is up all night,
//   so with the Sun in Pisces, Virgo's side of the sky rises at dusk. Virgo's brightest star is Spica, "the ear of
//   wheat" (the harvest).
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♍ × ♓ · "a long walk, after dinner"
//   2.7        "The *long* | walk."  VIRGO (left) and PISCES (right) walk a park path; lamps and trees scroll by.
//   ~15        "First real | *fight.*"  They stop and step apart. "always" ×2, then "…ouch."
//   ~33        "Look *up.*"  Facing south: west on the right, where the Sun has set (it's in Pisces); in the east on
//              the left, the real Virgo rises over the horizon, Spica labelled. SKY NOTEs (opposites; up all night).
//   ~47        "The *repair.*"  Sorry + why, what do you need, a small deal. They walk on, close, holding hands.
//   ~67        PISCES: "Different maps. | *Same* walk home."  Plain sky at 70.6, end card.
// One canvas (sky + seed constellation + the park + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawStarMap, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 75
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN       // 70.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const VIR = signStar('virgo'), PIS = signStar('pisces')
const CAST = {
  VIRGO: { tag: '♍ VIRGO', color: VIR.color, side: 'L', pitch: 659.25 },
  PISCES: { tag: '♓ PISCES', color: PIS.color, side: 'R', pitch: 830.61 },
}
const CPS = 28
const V = (x, o = {}) => ({ s: 'VIRGO', x, ...o }), P = (x, o = {}) => ({ s: 'PISCES', x, ...o })
const SCRIPT = seq(3.05, [
  V('okay. forty minutes, then home. i made a *route.*'),
  P('or… we follow the *moon* and see.'),
  V('the moon isn’t a *route,* babe.', { hold: 1.5 }),
  { mark: 'fight' },
  V('you were forty minutes late tonight. *again.*', { pre: 0.6 }),
  P('i got lost in a thought. it was a *nice* one.'),
  V('you *always* drift off.', { hold: 1.3 }),
  P('and you *always* correct me. like a typo.', { hold: 1.5 }),
  V('…ouch.', { hold: 1.4 }),
  P('…yeah. that came out *mean.* sorry.', { hold: 1.6 }),
  { mark: 'sky' },
  P('hey. look. your stars are *rising.*', { pre: 0.8, hold: 1.8 }),
  V('Spica. the ear of *wheat.* the harvest.', { hold: 2.0 }),
  P('the Sun’s in *my* part of the sky right now.', { hold: 1.6 }),
  V('so when it sets on yours, mine’s up *all night.*', { hold: 2.0 }),
  { mark: 'repair' },
  V('i’m sorry. i get scared when plans *slip.*', { pre: 0.5 }),
  P('i drift when i’m *overwhelmed.* not from you.'),
  V('what do you need from me?', { hold: 1.4 }),
  P('a heads-up, not a red pen. *you?*'),
  V('a text if you’re late. that’s *it.*'),
  { mark: 'walk' },
  P('deal. and one walk a week with *no* route.', { hold: 1.4 }),
  V('…fine. *one.*', { hold: 1.4 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  fight: M.fight, h2: M.fight - 0.05, h2Land: M.fight + 0.25,
  sky: M.sky, h3: M.sky - 0.05, rise: M.sky + 0.2,
  repair: M.repair, h4: M.repair - 0.05, h4Land: M.repair + 0.25,
  walk: M.walk, close: SCRIPT.end - 0.1,
}
T.h1Out = [T.fight - 0.4, T.fight - 0.15]
T.h2Out = [T.fight + 4.4, T.fight + 4.6]
T.h3Out = [T.sky + 2.6, T.sky + 2.8]
T.note1 = T.sky + 3.0; T.note1Out = [LINES[11].t - 0.3, LINES[11].t - 0.05]
T.note2 = LINES[11].t + 0.2; T.note2Out = [T.repair - 0.3, T.repair - 0.05]
T.h4Out = [T.repair + 4.4, T.repair + 4.6]
T.last = SCRIPT.end + 0.2; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[8].t + 2.2
export const BEATS = T
const LAST = { text: 'Different maps. | *Same* walk home.' }
const NOTE1 = 'Virgo and Pisces are *opposite signs:* | 180° apart on the zodiac.'
const NOTE2 = 'The sky opposite the Sun is up all night: | with the Sun in Pisces, *Virgo’s side rises.*'

// ── the walk: the world scrolls while they walk (speed 0 while they stand and talk it out)
const HORIZON = 1150, PATH = 1300
const walkK = t => prog(t, OPENER_LEN, OPENER_LEN + 0.6) * (1 - ease.inOutCubic(prog(t, T.fight - 0.6, T.fight + 0.2))) + ease.inOutCubic(prog(t, T.walk - 0.4, T.walk + 0.6))
const SPEED = 120
const offAt = t => { let s = 0; for (let u = 0; u < t; u += 0.05) s += walkK(u) * SPEED * Math.min(0.05, t - u); return s }
const STOP_OFF = offAt(T.fight + 0.5)
const BENCH_X = STOP_OFF + 540                 // a bench that ends up between them while they stand still
export const GHOST = { at: T.ghost, x: 540, y: PATH - 92, where: 'peeking over the park bench between Virgo and Pisces, in the quiet after the fight' }
// Virgo, real positions (RA h, Dec °, mag), east to the left
const RAW = [
  [13.420, -11.16, 0.97], [12.694, -1.45, 2.74], [13.036, 10.96, 2.85], [12.927, 3.40, 3.38], [13.578, -0.60, 3.37],  // 0 Spica, Porrima, Vindemiatrix, δ, ζ
  [11.845, 1.76, 3.6], [12.332, -0.67, 3.9], [11.764, 6.53, 4.0], [13.165, -5.54, 4.4], [14.028, 1.54, 4.3],             // 5 Zavijava β, η, ν, θ, τ
  [14.771, 1.89, 3.7], [14.267, -6.0, 4.1], [14.718, -5.66, 3.9],                                                     // 10 109, ι, μ
]
const VLINKS = [[7, 5], [5, 6], [6, 1], [1, 3], [3, 2], [1, 8], [8, 0], [3, 4], [4, 9], [9, 10], [4, 11], [11, 12]]
const proj = (rise) => { const ra0 = 13.25 * 15, k = 17, cx = 520, cy = lerp(HORIZON + 260, 760, rise); return ([ra, de]) => ({ x: Math.round(cx - (ra * 15 - ra0) * k), y: Math.round(cy - de * k) }) }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { VIRGO: [OPENER_LEN + 0.3, ...talkHops(LINES, CAST.VIRGO.tag, { cps: CPS })], PISCES: [OPENER_LEN + 0.45, ...talkHops(LINES, CAST.PISCES.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const up = [0, -1]
  const tb = [   // [virgo, pisces]
    [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, -1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0], blink: false }],
    [{ mood: 'wide', look: [1, 0], blink: false }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'neutral', look: [0, 1] }, { mood: 'wide', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 1] }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'neutral', look: [-1, -1] }, { mood: 'sparkle', look: [-1, -1] }],
    [{ mood: 'sparkle', look: [-1, -1] }, { mood: 'happy', look: [-1, -1] }],
    [{ mood: 'neutral', look: [1, -1] }, { mood: 'happy', look: [1, -1] }],
    [{ mood: 'wide', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'heart' }],
    [{ mood: 'eyeroll' }, { mood: 'sparkle', look: [-1, 0] }],
    [{ mood: 'heart' }, { mood: 'happy', look: [-1, 0] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  if (t >= T.last) return [{ mood: 'heart' }, { mood: 'sparkle', look: [-1, 0] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'The *long* | walk.', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: lite(PIS.color, 0.25), wobble: true, fit: true })
  const H2 = popText(root, 'First real | *fight.*', { top: 196, size: 112, accentSize: 180, at: T.h2, gap: 0.08, accentColor: '#ff8f8f', wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, 'Look *up.*', { top: 196, size: 112, accentSize: 176, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const H4 = popText(root, 'The | *repair.*', { top: 196, size: 112, accentSize: 180, at: T.h4, gap: 0.08, accentColor: lite(VIR.color, 0.25), wobble: true, late: 1, lateAt: T.h4Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♍', name: 'Virgo', color: VIR.color }, { glyph: '♓', name: 'Pisces', color: PIS.color }], place: 'a long walk, after dinner' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 940 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.PISCES.tag, color: PIS.color, top: 1450, size: 100, accentSize: 170 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const lbl = (s, cx, cy, size, col, align = 'center', font = `700 ${size}px 'Space Mono', monospace`) => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, cx + 2, cy + 3); x.fillStyle = col; x.fillText(s, cx, cy) }

  function skyBits(t) {
    // west (right): the afterglow where the Sun went down; it is in Pisces this time of year
    const g = x.createRadialGradient(980, HORIZON, 10, 980, HORIZON, 420); g.addColorStop(0, 'rgba(255,150,110,0.42)'); g.addColorStop(1, 'rgba(255,150,110,0)')
    x.fillStyle = g; x.fillRect(560, HORIZON - 420, 520, 420)
    const sk = prog(t, T.rise + 3.5, T.rise + 4.0) * (1 - prog(t, T.repair, T.repair + 0.6))
    if (sk > 0) { x.save(); x.globalAlpha *= sk; lbl('↓ THE SUN', 880, HORIZON - 250, 26, '#ffc49a'); lbl('just set, in Pisces', 880, HORIZON - 214, 24, BONE, 'center', `italic 500 32px 'EB Garamond', serif`); lbl('WEST', 990, HORIZON + 40, 22, 'rgba(239,230,214,0.7)'); lbl('EAST', 90, HORIZON + 40, 22, 'rgba(239,230,214,0.7)'); x.restore() }
    // east (left): Virgo rising, clipped at the horizon
    const rise = ease.outCubic(prog(t, T.rise, T.rise + 3.0))
    if (rise <= 0) return
    const fade = 1 - 0.5 * prog(t, T.repair + 1, T.repair + 2)
    const pj = proj(rise), vc = lite(VIR.color, 0.25)
    x.save(); x.beginPath(); x.rect(0, 0, 1080, HORIZON); x.clip()
    drawStarMap(x, t, { stars: RAW.map(r => ({ ...pj(r), mag: r[2], color: r === RAW[0] ? '#d6f0ff' : vc })), links: VLINKS, color: vc, at: T.rise + 0.4, dur: 2.4, k: fade, lineW: 6,
      labels: [{ i: 0, text: 'SPICA', sub: 'the ear of wheat', dx: 30, dy: 0, at: LINES[11].t + 0.2, color: '#d6f0ff' }, { i: 2, text: 'VIRGO', dx: 0, dy: -40, align: 'center', at: T.rise + 2.6, color: vc, size: 26 }] })
    x.restore()
  }
  function park(t, off) {
    // far trees (slow parallax), the lawn, the path, lamps + a bench (full speed)
    x.fillStyle = '#141236'
    for (let i = -1; i < 9; i++) { const tx = ((i * 150 - off * 0.3) % 1350 + 1350) % 1350 - 135; x.beginPath(); x.moveTo(tx, HORIZON); x.lineTo(tx + 60, HORIZON - 120 - (i % 3) * 30); x.lineTo(tx + 120, HORIZON); x.fill() }
    R(INK, 0, HORIZON - 4, 1080, 6); R('#1d2a3a', 0, HORIZON, 1080, PATH - HORIZON - 40); R('#26364a', 0, HORIZON, 1080, 10)
    R('#3a3456', 0, PATH - 40, 1080, 100); R('#4a4370', 0, PATH - 40, 1080, 8)
    for (let i = -1; i < 12; i++) R('#332e4c', ((i * 110 - off) % 1210 + 1210) % 1210 - 110, PATH + 10, 60, 6)
    // lamps
    for (let i = -1; i < 4; i++) {
      const lx = ((i * 560 - off + 200) % 1680 + 1680) % 1680 - 280
      R(INK, lx - 8, PATH - 400, 16, 370); R('#5a5480', lx - 4, PATH - 396, 8, 362)
      R(INK, lx - 26, PATH - 430, 52, 40); R('#ffe7a8', lx - 20, PATH - 424, 40, 28)
      const lg = x.createRadialGradient(lx, PATH - 410, 4, lx, PATH - 410, 200); lg.addColorStop(0, 'rgba(255,231,168,0.28)'); lg.addColorStop(1, 'rgba(255,231,168,0)'); x.fillStyle = lg; x.fillRect(lx - 200, PATH - 610, 400, 400)
    }
  }
  function bench(t, off) {
    const bx = BENCH_X - off
    if (bx < -200 || bx > 1280) return
    drawGhostCameo(x, t, { x: bx, y: GHOST.y + 2, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    R(INK, bx - 110, PATH - 96, 220, 16); R('#8a5a36', bx - 106, PATH - 92, 212, 10)
    R(INK, bx - 116, PATH - 66, 232, 18); R('#a8703f', bx - 112, PATH - 62, 224, 12)
    for (const lx of [bx - 96, bx + 84]) { R(INK, lx, PATH - 50, 14, 52); R('#4a3a5a', lx + 3, PATH - 48, 8, 48) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        const off = offAt(t), wk = walkK(t)
        skyBits(t)
        park(t, off)
        bench(t, off)
        // spacing: side by side → apart in the fight → back together → close for the walk home
        const apart = ease.inOutCubic(prog(t, T.fight + 0.3, T.fight + 1.3)) * (1 - ease.inOutCubic(prog(t, T.repair, T.repair + 1.2)))
        const near = ease.inOutCubic(prog(t, T.walk - 0.4, T.walk + 0.6))
        const vx = 330 - apart * 110 + near * 60, px = 750 + apart * 110 - near * 60
        const step = k => -Math.abs(Math.sin(t * 7 + k)) * 16 * wk
        const [mv, mp] = moods(t)
        if (near > 0) { x.save(); x.globalAlpha *= near; R(GOLD, vx + 70, 1206 + step(0) * 0.5, px - vx - 140, 6); x.restore() }   // holding hands
        const rv = drawStarChar(x, vx, 1190 + step(0), 230, t, { ...VIR, ...mv, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 11, hops: HOPS.VIRGO, glow: 0.9 })
        const rp = drawStarChar(x, px, 1190 + step(1.6), 230, t, { ...PIS, ...mp, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 7, hops: HOPS.PISCES, glow: 0.9 })
        drawTalkMarks(x, rv.x, rv.top, t, speaking(LINES, 'VIRGO', t, { cps: CPS }), VIR.color)
        drawTalkMarks(x, rp.x, rp.top, t, Math.max(speaking(LINES, 'PISCES', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), PIS.color)
        x.restore()
      }
      open.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      thread.update(t)
      for (const n of notes) n.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the fight, the sky, the repair, the hand-off to the last line
const CUTS = [{ t: T.fight - 0.08, kind: 'flip' }, { t: T.sky - 0.08, kind: 'deal' }, { t: T.repair - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E10' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 698.46, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 1108.73, 0.04, 0.4],
  ...wordPops(T.h1, 3, 0.08, 0),
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...wordPops(T.h2, 2, 0.08, 2), ['tick', r3(T.fight + 0.3), 0.03],
  ...wordPops(T.h3, 2, 0.08, 4), ['glitter', r3(T.rise + 0.4), r3(T.rise + 2.8)], ['bell', r3(LINES[11].t + 0.25), 1661.22, 0.03, 1.6, -0.3],
  ...noteCues(T.note1, T.note1Out),
  ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h4, 2, 0.08, 1),
  ['pluck', r3(T.walk + 0.3), 830.61, 0.04, 0.7, 0], ['glitter', r3(T.walk + 0.2), r3(T.walk + 0.8)],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
