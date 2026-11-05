// HEALING ERA: the short-format engine for khee01–khee15 (Month 2 boost, batch m15, star_advice posts, 20–26 s).
// Rows: promo/films/month2/m15.md. Sets and props: ./healset.js. Read-only for other films.
// No end card, no card transition, no logo, no CTA: DURATION is the story, and it ends on a hard cut or a loop.
//
// The format (len L):
//   0 – 6.4       THE FLOOR: frame 0 is the thumbnail, the sign is mid-action on a floor after a breakup, the hook line
//                 (≤ 7 words, the hook kit's slamTitle) is up, frame 0 is mid whip zoom, the bug sits top-left. A pattern
//                 break from promo/films/hookkit.js lands at cfg.brk.at (default 0.6 s): 'scratch' (recordScratch +
//                 frozen(), cfg.brk.text = the caption) or 'whip' (a second whip zoom); cfg.brk.shake adds a screen shake,
//                 cfg.caught a "caught" circle, cfg.kit / cfg.kitCues any other kit effects. Pisces sniffles (cfg.pis1).
//   6.4 – A       THE STARS: a top caption (cfg.h1), THE STARS pop in, two dialogue lines of warm advice (cfg.lines),
//                 the sign listening in the dimmed scene (cfg.s2).
//   A – L−3.6     THE STEP: the sign tries one small healthy thing (cfg.s3), a top caption (cfg.h2), and the DAY calendar
//                 tears forward (cfg.day → cfg.dayTo). Pisces is there again (cfg.pis3).
//   L−3.6 – L     THE LINE: the last line pops in big (cfg.last), the sign glows, Pisces cries happy tears.
//                 cfg.ending 'cut': the line's accent lands at L − 0.95 and holds to the last frame.
//                 cfg.ending 'loop': the line lands at L − 1.75, then the last 0.42 s eases back into frame 0 exactly
//                 (the kit's loopBack, fed the frame-0 builders: the film, the frame-0 whip, the hook title, the bug).
//
//   makeHeal(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign, cfg.name, cfg.len, cfg.accent, cfg.hook ('Day 1. I’m *totally* fine.' · | = line break),
//     cfg.h1, cfg.h2, cfg.lines [a, b] (THE STARS, ≤ 45 chars), cfg.last, cfg.day, cfg.dayTo, cfg.ending,
//     cfg.s1/s2/s3/fin(x, t, S) painters (S = { u, t0, t1, hero, star, pisces, T, frame0 }), cfg.top(x, t, S) top layer,
//     cfg.bubbles [{ t0, t1, x, y, text, col, size, tail, up, think }], cfg.pis1/pis3 { x, y, s, noTissues, look, mood },
//     cfg.pisces (the hero IS Pisces), cfg.brk { kind, at, text }, cfg.cues (extra sound cues), cfg.calAt { x, y, s }.
// Pure f(t); DOM / canvases only inside build().
import { el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H } from '../wheel.js'
import { dialogueBox, talkCues, talkHops } from '../startalk.js'
import { popText } from '../lesson.js'
import {
  clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, R, bubble, label, ink, shadow, glow, sparkles, hearts,
  starFrame, inSprite, tearsCells, tissues, pop01, outK, popOut, r3, GOLD, BONE, PINK, INK, LAV, MINT, SKYB, RED, INTER, MONO,
} from '../nste01/singlekit.js'
import { bigCal } from './healset.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, caught, caughtCues, screenShake, shakeCues, loopBack, loopCues } from '../hookkit.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, R, bubble, label, ink, shadow, glow, sparkles, hearts, starFrame, inSprite, tearsCells, tissues, pop01, outK, popOut, r3, GOLD, BONE, PINK, INK, LAV, MINT, SKYB, RED, INTER, MONO }
export const BUG_COL = '#ff9fc4'   // the series colour: a soft rose
export const CPS = 30

/** the fixed beats for a length L */
export function healTimes(L, ending = 'cut') {
  const s1 = 6.4, fin = L - (ending === 'loop' ? 2.9 : 2.3), mid = fin - s1, A = s1 + mid * 0.56
  const lastAt = ending === 'loop' ? L - 1.75 : L - 0.95
  return {
    L, s1: [0, s1], s2: [s1, A], s3: [A, fin], fin: [fin, L],
    h1: s1 + 0.12, lineA: s1 + 0.4, lineB: s1 + 0.4 + (A - s1 - 0.4) * 0.5, box1: [s1 + 0.2, A - 0.08],
    h2: A + 0.1, flip: A + 0.55, cal: [A + 0.2, fin - 0.1],
    lastAt, lastWords: fin + 0.3, loop: ending === 'loop' ? [L - 0.42, L] : null,
  }
}

// ── the series bug: "HEALING ERA" (Inter 800 small caps, letter-spaced, top-left)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,159,196,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HEALING<span style="color:rgba(255,255,255,0.75)">&nbsp;ERA</span>')
  return b
}

export function makeHeal(cfg) {
  const L = cfg.len, DURATION = L
  const T = healTimes(L, cfg.ending)
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES1 = [{ t: T.lineA, speaker: SPEAK, text: cfg.lines[0] }, { t: T.lineB, speaker: SPEAK, text: cfg.lines[1] }]
  const STARS_HOPS = [T.s2[0] + 0.3, ...talkHops(LINES1, SPEAK, { cps: CPS })]
  const accent = cfg.accent || HERO.color
  const BUBBLES = cfg.bubbles || []
  // the kit effects (one opts object each, shared by picture and sound)
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop || 170, size: cfg.hookSize || 100, accentColor: accent, out: [T.s1[1] - 0.2, T.s1[1]] }
  const WHIP0 = { at: -0.14, len: 0.5, from: 1.35, blur: 6, cx: (cfg.whip || {}).x ?? 540, cy: (cfg.whip || {}).y ?? 1150, flash: 0 }
  const BRK = { kind: 'scratch', at: 0.6, len: 1.3, ...(cfg.brk || {}) }
  const REC = BRK.kind === 'scratch' ? { at: BRK.at, len: BRK.len, caption: BRK.text, sub: BRK.sub ?? null, top: BRK.top ?? 1500 } : null
  const WHIP1 = BRK.kind === 'whip' ? { at: BRK.at, len: 0.45, from: 1.7, cx: BRK.x ?? 540, cy: BRK.y ?? 1100 } : null
  const SHAKE = BRK.shake ? { at: BRK.shake, len: 0.45, amp: 24 } : null
  const CAUGHT = cfg.caught || null

  const star = (x, t, sign, o = {}) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o }) }
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 && o.glyph !== false ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  /** a star with tears (k 1 sniffle · 2 streams · 3 fountains) */
  const crier = (x, t, sign, o = {}, k = 2) => {
    const s = signStar(sign)
    const opts = { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 6, glow: 0.9, tips: false, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (k > 0) inSprite(x, starFrame(o.x, o.y, o.s, t, opts), () => tearsCells(x, t, k))
  }
  const pisces = (x, t, P, tears = 2, mood = 'wide', look = [-1, -0.5]) => crier(x, t, 'pisces', { x: P.x, y: P.y, s: P.s, mood: P.mood || mood, look: P.look || look, pop: P.pop ?? 1, hops: P.hops, seed: 6 }, tears)


  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const H1 = popText(root, cfg.h1, { top: 160, size: 80, accentSize: 116, at: T.h1, gap: 0.08, accentColor: GOLD, fit: true })
    const H2 = popText(root, cfg.h2, { top: 160, size: 80, accentSize: 116, at: T.h2, gap: 0.08, accentColor: accent, fit: true })
    const nw = cfg.last.replace(/\|/g, ' ').trim().split(/\s+/).length
    const H3 = popText(root, cfg.last, { top: cfg.lastTop || 230, size: 96, accentSize: 150, at: T.lastWords, gap: 0.09, late: cfg.late ?? 1, lateAt: T.lastAt, wobble: true, accentColor: BUG_COL, fit: true })
    const box1 = dialogueBox(root, { lines: LINES1, y: cfg.boxY || 1420, open: T.box1[0], close: T.box1[1], cps: CPS })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S0 = { hero, star, pisces, crier, T, HERO }

    function bgPisces(x, t, P, a, b, tears) {
      if (cfg.pisces || !P) return
      const pk = (a === 0 ? 1 : pop01(t, a + 0.3, 0.3, 2)) * outK(t, [b - 0.15, b])
      if (pk <= 0.01) return
      if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
      pisces(x, t, { ...P, pop: pk }, tears)
    }
    function starsBeat(x, t) {
      const [a, b] = T.s2
      const k = pop01(t, a + 0.12, 0.4, 2.1) * outK(t, [b - 0.2, b])
      const P = cfg.starsAt || { x: 540, y: 720, s: 230 }
      if (k <= 0.01) return
      x.save(); x.globalCompositeOperation = 'lighter'; glow(x, P.x, P.y, 330, 0.16 * k, '247,207,104'); x.restore()
      drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood: t > T.lineB + 1.4 ? 'happy' : 'neutral', look: [0, 0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1.15 })
      sparkles(x, t, P.x, P.y, a + 0.15, 10, P.s * 0.9, 2, [GOLD, BONE])
    }

    /** the whole canvas picture at time t (also used, at t = 0, for the loop-back) */
    function paint(x, t) {
      const ft = t
      drawSky(x, ft, SKY_H)
      const scenes = [['s1', T.s1, cfg.pis1, 2], ['s2', T.s2, null, 0], ['s3', T.s3, cfg.pis3, 2]]
      for (const [key, [a, b], P, tears] of scenes) {
        if (ft < a || ft >= b) continue
        x.save()
        const z = (cfg.zoom ?? 1.16) * (key === 's1' ? 1 : 1 + 0.06 * (1 - ease.outCubic(prog(t, a, a + 0.3))))
        x.translate(540, 960); x.scale(z, z); x.translate(-540, -(cfg.camY ?? 1090))
        const S = { ...S0, u: ft - a, t0: a, t1: b, k: 1 }
        if (cfg[key]) cfg[key](x, ft, S)
        if (key === 's2') starsBeat(x, ft)
        bgPisces(x, ft, P, a, b, tears)
        if (key === 's3') {
          const C = cfg.calAt || { x: 880, y: 640, s: 0.85 }
          const ck = pop01(ft, T.cal[0], 0.3, 2.2) * outK(ft, [T.cal[1] - 0.2, T.cal[1]])
          if (ck > 0.01) { x.save(); x.translate(C.x, C.y); x.scale(ck, ck); bigCal(x, ft, 0, 0, { day: cfg.day, flips: [{ at: T.flip, to: cfg.dayTo, dur: 0.7 }], s: C.s, rot: 0.05 }); x.restore() }
        }
        x.restore()
      }
      // THE LINE
      if (ft >= T.fin[0]) {
        const a = T.fin[0], ok = 1
        const z = cfg.zoom ?? 1.16
        x.save(); x.translate(540, 960); x.scale(z, z); x.translate(-540, -(cfg.camY ?? 1090))
        x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1060, 480, 0.2, '255,159,196'); x.restore()
        const S = { ...S0, ok, u: ft - a, t0: a, t1: L }
        if (cfg.fin) cfg.fin(x, ft, S)
        else { shadow(x, 540, 1290, 280); hero(x, ft, { x: 540, y: 1100, s: 320, mood: 'happy', look: [0, 0], hops: [a + 0.1, T.lastAt + 0.05] }) }
        sparkles(x, ft, 540, 1080, a + 0.12, 12, 280, 1, [BUG_COL, GOLD, BONE])
        sparkles(x, ft, 540, 1080, T.lastAt, 10, 330, 3, [BUG_COL, GOLD, BONE])
        if (!cfg.pisces && !cfg.noFinPisces) { const pk = pop01(ft, a + 0.25, 0.36, 2.2); if (pk > 0.01) pisces(x, ft, { x: 900, y: 1420, s: 160, pop: pk, hops: [a + 0.55, T.lastAt + 0.1] }, 3, 'sparkle', [-1, -1]) }
        const sk = pop01(ft, a + 0.1, 0.38, 2.1)
        if (sk > 0.01 && !cfg.noFinStars) drawStarChar(x, 170, 1440, 150, ft, { color: STAR.sky, mood: 'happy', look: [1, -0.3], hops: [a + 0.35, T.lastAt], pop: sk, seed: 2, glow: 1.05 })
        x.restore()
      }
    }
    function paintTop(tx, t) {
      tx.clearRect(0, 0, 1080, 1920)
      for (const B of BUBBLES) bubble(tx, t, B.x, B.y, B.t0, B.t1, B.text, B)
      if (cfg.top) cfg.top(tx, t, { ...S0, t })
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        paint(x, t)
        paintTop(tx, t)
        H1.update(t, outK(t, [T.s2[1] - 0.2, T.s2[1]]))
        H2.update(t, outK(t, [T.s3[1] - 0.2, T.s3[1]]))
        H3.update(t)
        box1.update(t)
        // white flash on the hard cuts
        const fl = Math.max(0, ...[T.s2[0], T.s3[0], T.fin[0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // the bug sits outside the camera (steady through the whips and the freeze)
  const bugScene = async stage => { const root = fill(stage, { pointerEvents: 'none' }); root.dataset.hookcam = 'off'; buildBug(root); return { start: 0, end: DURATION + 1, root, update() {} } }
  const frame0 = [build, whipZoom(WHIP0), slamTitle(HOOK), bugScene]
  const SCENES = [
    REC ? frozen(build, [REC]) : build, whipZoom(WHIP0), ...(WHIP1 ? [whipZoom(WHIP1)] : []), ...(SHAKE ? [screenShake(SHAKE)] : []),
    slamTitle(HOOK), ...(REC ? [recordScratch(REC)] : []), ...(CAUGHT ? [caught(CAUGHT)] : []), ...(cfg.kit || []), bugScene,
    ...(cfg.ending === 'loop' ? [loopBack(frame0, { duration: DURATION, len: 0.42 })] : []),
  ]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nwords = s => s.replace(/\|/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...(REC ? recordScratchCues(REC) : []), ...(WHIP1 ? whipZoomCues(WHIP1) : []),
    ...(SHAKE ? shakeCues(SHAKE) : []), ...(CAUGHT ? caughtCues(CAUGHT) : []), ...(cfg.kitCues || []),
    ...BUBBLES.flatMap((B, i) => [['pop', r3(B.t0), NOTE[(i * 2 + 1) % 7], 0.04, B.x < 540 ? -0.25 : 0.25], ['tick', r3(B.t0 + 0.02), 0.03]]),
    ['whoosh', r3(T.s2[0] - 0.12), 0.3, 0.035], ['tick', r3(T.s2[0]), 0.05],
    ...wordPops(T.h1, Math.min(8, nwords(cfg.h1)), 0.08, 1),
    ['pop', r3(T.s2[0] + 0.17), 739.99, 0.04, 0], ['bell', r3(T.s2[0] + 0.2), 1760, 0.025, 1.0, 0], ['glitter', r3(T.s2[0] + 0.1), r3(T.s2[0] + 0.5)],
    ...talkCues(LINES1, { cps: CPS }),
    ['whoosh', r3(T.s3[0] - 0.1), 0.3, 0.035], ['tick', r3(T.s3[0]), 0.05],
    ...wordPops(T.h2, Math.min(8, nwords(cfg.h2)), 0.08, 2),
    ['pop', r3(T.cal[0] + 0.05), 987.77, 0.035, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.flip + i * 0.08), 0.035]), ['whoosh', r3(T.flip), 0.5, 0.03], ['bell', r3(T.flip + 0.72), 2349.32, 0.03, 1.0, 0.3],
    ['whoosh', r3(T.fin[0] - 0.1), 0.3, 0.03], ['tick', r3(T.fin[0]), 0.05], ['glitter', r3(T.fin[0] + 0.1), r3(T.fin[0] + 0.5)],
    ...wordPops(T.lastWords, Math.max(0, nwords(cfg.last) - (cfg.late ?? 1)), 0.09, 0),
    ['pop', r3(T.lastAt), 1174.66, 0.05, 0], ['pop', r3(T.lastAt + 0.08), 1567.98, 0.04, 0], ['bell', r3(T.lastAt + 0.1), 2349.32, 0.03, 1.2, 0], ['glitter', r3(T.lastAt), r3(T.lastAt + 0.4)],
    ...(T.loop ? loopCues({ duration: DURATION, len: 0.42 }) : []),
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
  ]
  return { DURATION, SCENES, CUES, T }
}
