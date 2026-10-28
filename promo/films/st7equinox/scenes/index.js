// st7equinox (45 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 04) · story 0–40.6, then the shared end card.
//   Aries × Libra, the season-4 couple, on a playground seesaw at night: a real fight about pace. They are the equinox
//   signs: in the tropical zodiac Aries season starts at the March equinox and Libra season at the September equinox, when
//   day and night are about the same length. The seesaw only levels when both of them move.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♈ × ♎ · "a seesaw, after dark"
//   2.7        "Same seesaw. | *Different* speeds."  Aries slams its end down; Libra is stuck in the air.
//   ~15        SKY NOTEs: the equinox starts, then "about the same length". The day/night disc above them is lopsided.
//   ~27        "Both | *move.*"  Aries scoots in, Libra scoots back: the plank wobbles level, the disc splits evenly.
//   ~36        ARIES: "Balance takes *both* | of us moving."  Plain sky at 40.6, end card.
// One canvas (sky + seed constellation + playground + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
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
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 45
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', NIGHT = '#2c3b8f'
const ARI = signStar('aries'), LIB = signStar('libra')
const CAST = {
  ARIES: { tag: '♈ ARIES', color: ARI.color, side: 'L', pitch: 659.25 },
  LIBRA: { tag: '♎ LIBRA', color: LIB.color, side: 'R', pitch: 987.77 },
}
const CPS = 29

const A = (x, o = {}) => ({ s: 'ARIES', x, ...o }), L = (x, o = {}) => ({ s: 'LIBRA', x, ...o })
const SCRIPT = seq(3.05, [
  A('can we just GO? i planned the whole *weekend.*'),
  L('you planned it. you didn’t *ask* me.'),
  A('asking takes forever. you take *forever.*'),
  L('and you never let my feet *touch the ground.*', { hold: 1.5 }),
  { mark: 'eq' },
  L('you know we’re both *equinox* signs?', { pre: 0.3, hold: 2.2 }),
  A('the days when day and night are *even?*', { hold: 2.4 }),
  L('even. not one of us *winning.*', { hold: 1.5 }),
  { mark: 'move' },
  A('okay. i scoot in. you scoot *back?*', { pre: 0.4 }),
  L('deal. and next time? ask me *first.*'),
  A('you pick saturday. i pick *sunday.*', { hold: 1.5 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0, slam: LINES[0].t + 0.3,
  eq: M.eq, move: M.move, h3: M.move - 0.05, h3Land: M.move + 0.25,
  scoot: LINES[7].t + 1.2, level: LINES[7].t + 2.2,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.eq - 0.4, T.eq - 0.2]
T.note1 = T.eq; T.note1Out = [LINES[5].t + 0.6, LINES[5].t + 0.85]
T.note2 = LINES[5].t + 1.0; T.note2Out = [T.move - 0.3, T.move - 0.05]
T.h3Out = [T.move + 4.2, T.move + 4.4]
T.last = SCRIPT.end + 0.25; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[1].t + 1.2
const LAST = { text: 'Balance takes *both* | of us moving.' }
const NOTE1 = 'Aries season starts at the *March* equinox; | Libra’s at the *September* one.'
const NOTE2 = 'At an equinox, day and night | are about the *same length.*'

// ── the playground
const PIV = { x: 540, y: 1196 }
const DISC = { x: 540, y: 690, r: 138 }
const SIGNB = { x0: 906, x1: 1032, y0: 600, y1: 700 }
export const GHOST = { at: T.ghost, x: SIGNB.x0, y: 650, where: 'leaning out from behind the playground sign board, right edge, beside the day/night disc' }

/** the plank angle (+ = Aries' left end down) and where each rider sits along it */
function plank(t) {
  const slam = easeOutBack(prog(t, T.slam, T.slam + 0.45), 2.4)
  const lev = prog(t, T.level - 0.4, T.level + 1.4)
  let th = 0.24 * slam * (1 - ease.inOutQuad(lev))
  if (lev > 0 && lev < 1) th += 0.07 * Math.sin(lev * 14) * (1 - lev)          // the wobble as it levels
  // before the fix it creeps a little with every Aries line (impatient bounces)
  th += 0.02 * Math.sin(t * 3) * (1 - lev) * slam
  const sc = ease.inOutQuad(prog(t, T.scoot, T.scoot + 0.7))
  th = -th
  return { th, dL: lerp(352, 292, sc), dR: lerp(330, 372, sc), lev }
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { ARIES: [T.slam, ...talkHops(LINES, CAST.ARIES.tag, { cps: CPS }), T.scoot, T.last + 0.1, T.last + 0.6, T.last + 1.1], LIBRA: [T.h1 + 0.35, ...talkHops(LINES, CAST.LIBRA.tag, { cps: CPS }), T.scoot + 0.15] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [aries, libra]
    [{ mood: 'happy', look: [1, -1] }, { mood: 'wide', look: [-1, 1], blink: false }],
    [{ mood: 'neutral', look: [1, -1] }, { mood: 'squint', look: [-1, 1] }],
    [{ mood: 'eyeroll' }, { mood: 'squint', look: [-1, 1] }],
    [{ mood: 'wide', look: [1, -1] }, { mood: 'neutral', look: [0, 1] }],
    [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [0, -1] }],
    [{ mood: 'neutral', look: [0, -1] }, { mood: 'happy', look: [-1, 1] }],
    [{ mood: 'neutral', look: [0, 1] }, { mood: 'sparkle', look: [-1, 1] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }],
    [{ mood: 'heart' }, { mood: 'happy', look: [-1, 0] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  if (t >= T.last) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'heart' }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'Same seesaw. | *Different* speeds.', { top: 196, size: 104, accentSize: 166, at: T.h1, gap: 0.08, accentColor: lite(ARI.color, 0.2), wobble: true, late: 2, lateAt: T.h1Land, fit: true })
  const H3 = popText(root, 'Both | *move.*', { top: 196, size: 116, accentSize: 180, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♈', name: 'Aries', color: ARI.color }, { glyph: '♎', name: 'Libra', color: LIB.color }], place: 'a seesaw, after dark' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.ARIES.tag, color: ARI.color, top: 1450, size: 100, accentSize: 164 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

  /** the day/night disc: the split leans with the plank and straightens when it levels */
  function disc(t, P) {
    const { x: cx, y: cy, r } = DISC
    const k = ease.outCubic(prog(t, OPENER_LEN, OPENER_LEN + 0.5))
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
    // day share: a chord offset by the tilt
    const off = -P.th * r * 1.7, dc = (off - r) / 2, nc = (off + r) / 2
    x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
    x.fillStyle = NIGHT; x.fillRect(-r, -r, 2 * r, 2 * r)
    x.fillStyle = '#ffcf5a'; x.fillRect(-r, -r, r + off, 2 * r)
    // stars on the night side, rays on the day side
    for (let i = 0; i < 7; i++) { R(BONE, off + 14 + (i * 41) % (r - 20), -r + 30 + (i * 67) % (2 * r - 60), 6, 6) }
    x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(dc, -10, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.arc(nc, -10, 30, 0, Math.PI * 2); x.fill()
    x.fillStyle = NIGHT; x.beginPath(); x.arc(nc + 14, -18, 26, 0, Math.PI * 2); x.fill()
    x.restore()
    x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, r + 3, 0, Math.PI * 2); x.stroke()
    // labels
    x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = '#5a3b00'; x.fillText('DAY', dc, 54)
    x.fillStyle = BONE; x.font = `700 ${Math.round(clamp((r - off) / 4.6, 16, 26))}px 'Space Mono', monospace`; x.fillText('NIGHT', nc, 54)
    x.restore()
    // the "EVEN" tick once it balances
    const ev = easeOutBack(prog(t, T.level + 1.0, T.level + 1.4), 2.6)
    if (ev > 0) { x.save(); x.translate(cx, cy + r + 46); x.scale(ev, ev); x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('= EVEN =', 2, 3); x.fillStyle = GOLD; x.fillText('= EVEN =', 0, 0); x.restore() }
  }
  function playground(t) {
    R('rgba(20,40,40,0.35)', 60, 1290, 960, 40); R('rgba(120,200,140,0.25)', 60, 1290, 960, 6)          // grass line
    // lamp post + sign board (right)
    R(INK, 960, SIGNB.y1, 18, 600); R('#6c7590', 964, SIGNB.y1, 10, 600)
    R(INK, SIGNB.x0 - 6, SIGNB.y0 - 6, SIGNB.x1 - SIGNB.x0 + 12, SIGNB.y1 - SIGNB.y0 + 12)
    R('#2f6e4e', SIGNB.x0, SIGNB.y0, SIGNB.x1 - SIGNB.x0, SIGNB.y1 - SIGNB.y0)
    x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText('PARK', (SIGNB.x0 + SIGNB.x1) / 2, SIGNB.y0 + 40); x.fillText('CLOSES', (SIGNB.x0 + SIGNB.x1) / 2, SIGNB.y0 + 66)
    void t
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        playground(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
        const P = plank(t)
        disc(t, P)
        // the pivot
        drawBits(x, PIVOT, PIVOT_C, PIV.x, PIV.y + 56, 12)
        // the plank + riders, rotated about the pivot
        const c = Math.cos(P.th), s = Math.sin(P.th)
        const at = (d, lift) => ({ x: PIV.x + d * c + lift * s, y: PIV.y + d * s - lift * c })
        x.save(); x.translate(PIV.x, PIV.y); x.rotate(P.th)
        R(INK, -430, -16, 860, 32); R('#d2633d', -424, -10, 848, 20); R('#ef8a5e', -424, -10, 848, 6)
        for (const e of [-1, 1]) { R(INK, e * 404 - 14, -70, 28, 60); R('#9aa0b0', e * 404 - 8, -64, 16, 54); R(INK, e * 404 - 30, -76, 60, 16) }   // handles
        x.restore()
        const [ma, ml] = moods(t)
        const pa = at(-P.dL, 118), pl = at(P.dR, 118)
        const ra = drawStarChar(x, pa.x, pa.y, 250, t, { ...ARI, ...ma, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 4, hops: HOPS.ARIES, glow: 0.9 })
        const rl = drawStarChar(x, pl.x, pl.y, 250, t, { ...LIB, ...ml, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 12, hops: HOPS.LIBRA, glow: 0.9 })
        drawTalkMarks(x, ra.x, ra.top, t, Math.max(speaking(LINES, 'ARIES', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), ARI.color)
        drawTalkMarks(x, rl.x, rl.top, t, speaking(LINES, 'LIBRA', t, { cps: CPS }), LIB.color)
        // the slam dust
        const dp = prog(t, T.slam + 0.15, T.slam + 0.75)
        if (dp > 0 && dp < 1) { x.globalAlpha *= 1 - dp; for (let i = 0; i < 6; i++) R('#cfc6e8', 110 + i * 22 - dp * 40 * (3 - i), 1290 - dp * 40 - (i % 2) * 14, 10, 10); x.globalAlpha = setK * (0.25 + 0.75 * ok) }
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

const PIVOT = ['....GG....', '...GGGG...', '..GGGGGG..', '..GGHHGG..', '.GGGHHGGG.', '.GGGGGGGG.', 'GGGGGGGGGG', 'DDDDDDDDDD']
const PIVOT_C = { G: '#7d86a8', H: '#2a2346', D: '#4a5170' }

// card-motif candidates: the equinox beat, the "both move" beat, the hand-off to the last line
const CUTS = [{ t: T.eq - 0.1, kind: 'flip' }, { t: T.move - 0.1, kind: 'deal' }, { t: T.last - 0.08, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E04' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 587.33, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 880, 0.04, 0.4],
  ...wordPops(T.h1, 2, 0.08, 0), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.04, 0],
  ['boom', r3(T.slam + 0.2), 0.3], ['tick', r3(T.slam + 0.2), 0.06],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...noteCues(T.note1, T.note1Out), ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 1, 0.08, 3), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['whoosh', r3(T.scoot), 0.4, 0.025], ['tick', r3(T.scoot + 0.7), 0.04],
  ['riser', r3(T.level - 0.4), r3(T.level + 0.9), 0.04], ['bell', r3(T.level + 1.0), 1760, 0.03, 1.6, 0], ['pluck', r3(T.level + 1.05), 1174.66, 0.04, 0.8, 0], ['glitter', r3(T.level + 1.0), r3(T.level + 1.6)],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
