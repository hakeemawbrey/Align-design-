// HEALING ERA: the long-format engine for khee16–khee20 (Month 2 boost, batch m15, star_advice posts, 60–90 s).
// "30 days in 60–90 seconds". Rows: promo/films/month2/m15.md. Sets and props: ./healset.js. Read-only for other films.
// No end card, no card transition, no logo, no CTA: DURATION is the story, and every long film loops back to frame 0.
//
// The format:
//   0 – ch1       the same crazy first second as the shorts: frame 0 is the day-1 kitchen floor, mid-action, mid whip
//                 zoom, the hook line (the kit's slamTitle) up; a record-scratch freeze at cfg.brk.at with a caption,
//                 then the PROMISE sticker ("wait for *day 30.*") slaps on and stays until the first chapter.
//   chapters      cfg.chapters [{ at, n, title, day, paint(x, t, S), lines: [{ t, text }], caps: [{ at, out, text }] }]:
//                 the kit's chapter sticker at each `at`, a running DAY pad (top right) that tears forward to the
//                 chapter's day, THE STARS' dialogue lines (a box per chapter), canvas bubbles (cfg.bubbles) and the
//                 chapter painter (S.u = time inside the chapter). Beats every 8–10 s live in the painters / bubbles.
//   cfg.finAt – L the payoff: the last line (cfg.last) lands at L − 1.9, then the last 0.42 s eases back into frame 0
//                 (the kit's loopBack), so the film ends where it began: day 1, now smiling.
//   makeHealLong(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign, cfg.len, cfg.accent, cfg.hook, cfg.brk { at, len, text }, cfg.whip { x, y }, cfg.promise,
//     cfg.chapters, cfg.fin(x, t, S) (the payoff painter), cfg.finAt, cfg.last, cfg.bubbles, cfg.top(x, t, S),
//     cfg.kit / cfg.kitCues (extra kit effects), cfg.cues, cfg.zoom / cfg.camY (base camera).
// Pure f(t); DOM / canvases only inside build().
import { el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H } from '../wheel.js'
import { dialogueBox, talkCues, talkHops } from '../startalk.js'
import { popText } from '../lesson.js'
import {
  clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, R, bubble, label, ink, shadow, glow, sparkles,
  starFrame, inSprite, tearsCells, tissues, pop01, outK, r3, GOLD, BONE, PINK, INK, INTER,
} from '../nste01/singlekit.js'
import { bigCal } from './healset.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, R, bubble, label, ink, shadow, glow, sparkles, starFrame, inSprite, tearsCells, tissues, pop01, outK, r3, GOLD, BONE, PINK, INK }
const BUG_COL = '#ff9fc4', CPS = 30

function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,159,196,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HEALING<span style="color:rgba(255,255,255,0.75)">&nbsp;ERA</span>')
}

export function makeHealLong(cfg) {
  const L = cfg.len, DURATION = L
  const HERO = signStar(cfg.sign)
  const accent = cfg.accent || HERO.color
  const CH = cfg.chapters
  const ch1 = CH[0].at
  const finAt = cfg.finAt
  const lastAt = L - 1.9
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop || 170, size: cfg.hookSize || 100, accentColor: accent, out: [ch1 - 0.25, ch1] }
  const WHIP0 = { at: -0.14, len: 0.5, from: 1.35, blur: 6, cx: (cfg.whip || {}).x ?? 540, cy: (cfg.whip || {}).y ?? 1150, flash: 0 }
  const REC = { at: 0.6, len: 1.3, top: 1500, ...(cfg.brk || {}), caption: (cfg.brk || {}).text }
  const CHAPS = CH.map((c, i) => ({ at: c.at, out: [(CH[i + 1] ? CH[i + 1].at : finAt) - 0.3, (CH[i + 1] ? CH[i + 1].at : finAt) - 0.1], n: c.n ?? i + 1, title: c.title, x: 70, y: 150 }))
  const BUBBLES = cfg.bubbles || []
  const SPEAK = 'THE STARS'
  const segs = [{ at: 0, end: ch1, paint: cfg.open, day: CH[0].day0 ?? 1 }, ...CH.map((c, i) => ({ ...c, end: CH[i + 1] ? CH[i + 1].at : finAt })), { at: finAt, end: L + 1, paint: cfg.fin, day: cfg.finDay ?? 30, fin: true }]
  // the running DAY pad: flips to each chapter's day as the chapter starts
  const FLIPS = CH.map(c => ({ at: c.at + 0.35, to: c.day, dur: 0.6 })).concat([{ at: finAt + 0.3, to: cfg.finDay ?? 30, dur: 0.6 }])
  const BOXES = CH.map((c, i) => ({ lines: (c.lines || []).map(l => ({ t: l.t, speaker: SPEAK, text: l.text })), open: (c.lines || [])[0] ? c.lines[0].t - 0.22 : 0, close: segs[i + 1].end - 0.25 })).filter(b => b.lines.length)
  const ALL_LINES = BOXES.flatMap(b => b.lines)
  const STARS_HOPS = talkHops(ALL_LINES, SPEAK, { cps: CPS })

  const star = (x, t, sign, o = {}) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o }) }
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 && o.glyph !== false ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const crier = (x, t, sign, o = {}, k = 2) => {
    const s = signStar(sign)
    const opts = { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 6, glow: 0.9, tips: false, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (k > 0) inSprite(x, starFrame(o.x, o.y, o.s, t, opts), () => tearsCells(x, t, k))
  }
  const S0 = { hero, star, crier, HERO, lastAt, finAt, L }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "800 50px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const caps = CH.flatMap(c => (c.caps || []).map(k => ({ ...k, p: popText(root, k.text, { top: k.top || 300, size: k.size || 76, accentSize: (k.size || 76) * 1.4, at: k.at, gap: 0.07, accentColor: k.color || accent, fit: true }) })))
    const H3 = popText(root, cfg.last, { top: cfg.lastTop || 240, size: cfg.lastSize || 92, accentSize: cfg.lastAccent || 124, at: finAt + 0.4, gap: 0.09, late: cfg.late ?? 1, lateAt: lastAt, wobble: true, accentColor: BUG_COL, fit: true })
    const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1430, open: b.open, close: b.close, cps: CPS }))
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const sg = segs.find(s => t >= s.at && t < s.end) || segs[segs.length - 1]
        const i = segs.indexOf(sg)
        x.save()
        const u = t - sg.at, len = sg.end - sg.at
        const z = (cfg.zoom ?? 1.16) * (1 + 0.035 * prog(u, 0, Math.min(len, 12)) + (i > 0 ? 0.07 * (1 - ease.outCubic(prog(u, 0, 0.35))) : 0))
        x.translate(540, 960); x.scale(z, z); x.translate(-540, -(cfg.camY ?? 1090))
        if (sg.paint) sg.paint(x, t, { ...S0, u, t0: sg.at, t1: sg.end, seg: sg })
        x.restore()
        // THE STARS, small, beside the box while a line is up
        const bx = BOXES.find(b => t >= b.open && t < b.close)
        if (bx) { const k = pop01(t, bx.open, 0.35, 2.1) * outK(t, [bx.close - 0.2, bx.close]); if (k > 0.01) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 960, 1340, 160, 0.2 * k, '247,207,104'); x.restore(); drawStarChar(x, 960, 1350, 130, t, { color: STAR.sky, mood: 'happy', look: [-1, 0.3], hops: STARS_HOPS, pop: k, seed: 2, glow: 1.1 }) } }
        // top layer: bubbles, the promise sticker, the running DAY pad
        tx.clearRect(0, 0, 1080, 1920)
        for (const B of BUBBLES) bubble(tx, t, B.x, B.y, B.t0, B.t1, B.text, B)
        if (cfg.top) cfg.top(tx, t, S0)
        const pk = pop01(t, (cfg.promiseAt ?? 2.0), 0.3, 2.6) * outK(t, [ch1 - 0.25, ch1])
        if (pk > 0.01) {
          tx.save(); tx.translate(540, cfg.promiseY ?? 1250); tx.rotate(-0.05); tx.scale(pk, pk)
          tx.font = `800 46px ${INTER}`; const w = tx.measureText(cfg.promise).width + 80
          R(tx, INK, -w / 2 - 8, -50, w + 16, 100); R(tx, BUG_COL, -w / 2, -42, w, 84)
          ink(tx, cfg.promise, 0, 2, { size: 46 }); tx.restore()
        }
        const dk = pop01(t, ch1 + 0.1, 0.3, 2.2) * outK(t, [finAt + 1.2, finAt + 1.5])
        if (dk > 0.01) { tx.save(); tx.translate(950, 300); tx.scale(dk, dk); bigCal(tx, t, 0, 0, { day: CH[0].day0 ?? 1, flips: FLIPS, s: 0.62, rot: 0.06 }); tx.restore() }
        for (const c of caps) c.p.update(t, outK(t, c.out))
        H3.update(t)
        for (const b of boxes) b.update(t)
        const fl = Math.max(0, ...segs.slice(1).map(s => (t >= s.at && t < s.at + 0.12) ? 1 - (t - s.at) / 0.12 : 0))
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }
  const bugScene = async stage => { const root = fill(stage, { pointerEvents: 'none' }); root.dataset.hookcam = 'off'; buildBug(root); return { start: 0, end: DURATION + 1, root, update() {} } }
  const frame0 = [build, whipZoom(WHIP0), slamTitle(HOOK), bugScene]
  const SCENES = [frozen(build, [REC]), whipZoom(WHIP0), slamTitle(HOOK), recordScratch(REC), ...CHAPS.map(c => chapter(c)), ...(cfg.kit || []), bugScene, loopBack(frame0, { duration: DURATION, len: 0.42 })]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...recordScratchCues(REC),
    ['pop', r3(cfg.promiseAt ?? 2.0), 1174.66, 0.05, 0], ['tick', r3((cfg.promiseAt ?? 2.0) + 0.02), 0.06],
    ...CHAPS.flatMap(c => chapterCues(c)),
    ...segs.slice(1).flatMap(s => [['whoosh', r3(s.at - 0.12), 0.3, 0.035], ['tick', r3(s.at), 0.05]]),
    ...FLIPS.flatMap(f => [...Array.from({ length: 4 }, (_, i) => ['tick', r3(f.at + i * 0.08), 0.03]), ['whoosh', r3(f.at), 0.4, 0.02]]),
    ...BUBBLES.flatMap((B, i) => [['pop', r3(B.t0), NOTE[(i * 2 + 1) % 7], 0.04, B.x < 540 ? -0.25 : 0.25], ['tick', r3(B.t0 + 0.02), 0.03]]),
    ...BOXES.flatMap(b => [['pop', r3(b.open), 739.99, 0.035, 0.3]]), ...talkCues(ALL_LINES, { cps: CPS }),
    ...CH.flatMap(c => (c.caps || []).map(k => ['pop', r3(k.at), 987.77, 0.035, 0])),
    ['glitter', r3(finAt + 0.1), r3(finAt + 0.5)], ['pop', r3(lastAt), 1174.66, 0.05, 0], ['pop', r3(lastAt + 0.08), 1567.98, 0.04, 0], ['bell', r3(lastAt + 0.1), 2349.32, 0.03, 1.2, 0], ['glitter', r3(lastAt), r3(lastAt + 0.4)],
    ...loopCues({ duration: DURATION, len: 0.42 }),
    ...(cfg.kitCues || []),
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
  ]
  return { DURATION, SCENES, CUES }
}
