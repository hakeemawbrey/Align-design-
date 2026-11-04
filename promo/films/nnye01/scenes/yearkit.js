// NEW YEAR, SAME HEART: the shared look of the twelve star_advice films nnye01–nnye12 (one per sign, 20 s each,
// promo/films/next30/b37.md). Every episode imports this kit from nnye01; nothing here touches another film's folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.40   hook (frame 0 is the thumbnail): the episode's hook caption is already up, the sign star is mid-hop
//               over two boxes: a cardboard box marked LEAVING and a gift box marked KEEPING. A pixel heart sits
//               between them and never moves (the "same heart"). Snow falls. Pisces sniffles in the corner.
//   2.40–6.60   "What I'm | *leaving.*"  Two luggage tags pop up, are read, and drop into LEAVING. The box slides
//               off frame (the hero waves it off).
//   6.60        the one card cut.
//   6.60–10.80  "What I'm | *keeping.*"  One tag pops up, the hero hugs it, it drops into the gift box, the lid
//               closes, the box glows.
//   10.80–15.50 "New year. | Same *heart.*"  The heart pulses big; THE STARS pop in and say the last line; Pisces
//               hops onto the gift box and fountains (happy tears).
//
//   makeYear(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.sign ('aries'…), cfg.name ('Aries'), cfg.hook ('*Aries*, | before you sprint…'), cfg.leave [a, b], cfg.keep,
//     cfg.last (THE STARS), cfg.accent (headline accent), cfg.quips [{ t, text, dx?, dy? }] (hero speech bubbles),
//     cfg.hookPose ({ dx, dy, rot, mood, look, s }), cfg.prop(x, t, S) (extra hero prop, drawn after the hero),
//     cfg.heroIsPisces (Pisces is the hero: no corner Pisces, the hero cries instead).
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { fill } from '../../../src/scenes/common.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, RED, INTER, MONO, r3, pop01, outK, popOut, clamp, lerp, prog, ease, el, easeOutBack,
  R, box, drawBits, HEART, sparkles, hearts, bubble, label, shadow, starFrame, inSprite, tearsCells, buildBug, snow, tag,
} from './pix.js'

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  h0: -0.9, h0Out: [2.25, 2.45],
  h1: 2.45, h1Out: [6.35, 6.55],
  tagA: 2.75, flyA: [4.05, 4.45],
  tagB: 4.5, flyB: [5.75, 6.15],
  wave: 6.05, boxOff: [6.15, 6.6],
  cut: 6.6,
  h2: 6.7, h2Out: [10.6, 10.8],
  tagK: 7.05, hug: 7.9, flyK: [9.1, 9.5], lid: 9.65,
  h3: 10.85, h3Land: 11.35, heart: 10.85, starsIn: 11.0, pisHop: 11.2, last: 11.75,
  boxClose: 15.1, out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const CPS = 30
const HERO_AT = { x: 540, y: 880, s: 290 }
const LBOX = { cx: 255, y: 1110, w: 360, h: 250 }      // y = top of the box
const KBOX = { cx: 830, y: 1110, w: 340, h: 250 }
const HEART_AT = { x: 540, y: 1245 }
const PIS_CORNER = { x: 940, y: 1640, s: 130 }

// ── the boxes
function leaveBox(x, t, cx, Y, w, h, front) {
  const L = cx - w / 2
  if (!front) {
    // open flaps + dark inside
    R(x, INK, L - 6, Y - 6, w + 12, 40); R(x, '#4a3424', L, Y, w, 30)
    x.save(); x.translate(L, Y); x.rotate(-0.5); box(x, -w * 0.42, -8, w * 0.42, 22, '#c99a68', { b: 5 }); x.restore()
    x.save(); x.translate(L + w, Y); x.rotate(0.5); box(x, 0, -8, w * 0.42, 22, '#c99a68', { b: 5 }); x.restore()
    return
  }
  box(x, L, Y + 22, w, h - 22, '#b9875a', { b: 6, hi: '#d3a474', lo: '#9b6e46' })
  R(x, '#e0c79a', cx - 22, Y + 22, 44, h - 22)                      // tape
  box(x, cx - 112, Y + 114, 224, 58, BONE, { b: 5 })                  // label
  label(x, 'LEAVING', cx, Y + 144, { size: 34, col: INK, font: MONO, weight: 700 })
  void t
}
function keepBox(x, t, cx, Y, w, h, front, lid, glow) {
  const L = cx - w / 2
  if (!front) {
    if (glow > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, Y + h / 2, 10, cx, Y + h / 2, w * 1.1)
      g.addColorStop(0, `rgba(255,214,150,${0.32 * glow})`); g.addColorStop(1, 'rgba(255,214,150,0)')
      x.fillStyle = g; x.fillRect(cx - w * 1.2, Y - w * 0.8, w * 2.4, h + w * 1.6); x.restore()
    }
    R(x, INK, L - 6, Y - 6, w + 12, 40); R(x, '#5a1020', L, Y, w, 30)
    return
  }
  box(x, L, Y + 22, w, h - 22, RED, { b: 6, hi: '#ff6b7f', lo: '#b8243a' })
  R(x, GOLD, cx - 20, Y + 22, 40, h - 22)                            // ribbon
  box(x, cx - 112, Y + 114, 224, 58, BONE, { b: 5 })
  label(x, 'KEEPING', cx, Y + 144, { size: 34, col: INK, font: MONO, weight: 700 })
  // the lid: leaning against the box until it closes
  const lx = lerp(cx + w * 0.62, cx, lid), ly = lerp(Y + 40, Y - 16, lid), lr = lerp(1.25, 0, lid)
  x.save(); x.translate(lx, ly); x.rotate(lr)
  box(x, -w / 2 - 14, -26, w + 28, 46, RED, { b: 6, hi: '#ff6b7f' })
  R(x, GOLD, -20, -26, 40, 46)
  if (lid > 0.98) drawBits(x, ['GG...GG', 'GGG.GGG', '.GGGGG.', 'GGG.GGG', 'GG...GG'], { G: GOLD }, 0, -50, 9)
  x.restore()
  void t
}

export function makeYear(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const quips = cfg.quips || []
  const HERO_HOPS = [-0.12, 1.1, T.tagA + 0.05, T.flyA[0], T.tagB + 0.05, T.flyB[0], T.wave, T.wave + 0.35, T.tagK + 0.05, T.hug, T.flyK[0], T.lid + 0.05, T.heart + 0.1, T.last + 1.5, ...quips.map(q => q.t)]
  const hp = cfg.hookPose || {}

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  function tissues(x, cx, cy, s) {
    box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
    R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const acc = cfg.accent || HERO.color
    const H0 = popText(root, cfg.hook, { top: 160, size: 84, accentSize: 120, at: T.h0, gap: 0.06, accentColor: acc, fit: true })
    const H1 = popText(root, 'What I’m | *leaving.*', { top: 170, size: 92, accentSize: 140, at: T.h1, gap: 0.08, accentColor: '#c99a68' })
    const H2 = popText(root, 'What I’m | *keeping.*', { top: 170, size: 92, accentSize: 140, at: T.h2, gap: 0.08, accentColor: PINK })
    const H3 = popText(root, 'New year. | Same *heart.*', { top: 170, size: 96, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, gap: 0.09, accentColor: '#ff5c8a' })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
    const box1 = dialogueBox(root, { lines: LINES, y: 1430, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, 0, 'NEW YEAR,', 'SAME HEART')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    const hero = (t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: HERO.glyph, seed: 3, glow: 1.1, ...o })

    function heroPose(t) {
      const P = { x: HERO_AT.x, y: HERO_AT.y, s: HERO_AT.s, rot: 0 }
      // hook pose eases into the standing pose
      const h = 1 - ease.inOutCubic(prog(t, 1.6, 2.4))
      P.x += (hp.dx || 0) * h; P.y += (hp.dy || 0) * h; P.s = lerp(P.s, hp.s || P.s, h); P.rot = (hp.rot || 0) * h
      // lean toward the box each tag drops into
      const lean = (a, d) => Math.sin(Math.PI * prog(t, a[0] - 0.15, a[1] + 0.2)) * d
      P.x += lean(T.flyA, -40) + lean(T.flyB, -40) + lean(T.flyK, 40)
      // finale: step up a little
      const f = ease.inOutCubic(prog(t, T.heart, T.heart + 0.5))
      P.y = lerp(P.y, 860, f); P.s = lerp(P.s, 260, f)
      P.k = popOut(t, T.out)
      return P
    }
    function heroMood(t) {
      if (t < 2.4) return { mood: hp.mood || 'happy', look: hp.look }
      if (t < T.tagA + 0.3) return { mood: 'neutral', look: [0, -1] }
      if (t < T.flyA[1]) return { mood: 'squint', look: [-1, -0.3] }
      if (t < T.tagB + 0.3) return { mood: 'neutral', look: [0, -1] }
      if (t < T.flyB[1]) return { mood: 'eyeroll' }
      if (t < T.boxOff[1]) return { mood: 'wink', look: [-1, 0] }
      if (t < T.hug) return { mood: 'wide', look: [0, -1] }
      if (t < T.flyK[1]) return { mood: 'heart', look: [0, -1] }
      if (t < T.heart) return { mood: 'happy', look: [1, 0.4] }
      return { mood: 'sparkle', look: [0, 0.8] }
    }

    // a tag: pops up over the hero, holds, flies into its box
    function flyTag(t, text, t0, fly, box0, { col = BONE, accent = RED, hold = { x: 540, y: 610 }, rot0 = -0.04 } = {}) {
      if (t < t0 || t > fly[1] + 0.02) return
      const k = easeOutBack(prog(t, t0, t0 + 0.32), 2.4)
      const f = ease.inCubic(prog(t, ...fly))
      const cx = lerp(hold.x, box0.cx, f), cy = lerp(hold.y, box0.y + 40, f) - Math.sin(Math.PI * f) * 120
      const sc = lerp(1, 0.32, f) * k, rot = lerp(rot0 + 0.03 * Math.sin(t * 4), (box0.cx < 540 ? -1 : 1) * 0.9, f)
      tag(x, text, cx, cy, sc, { rot, col, accent })
    }

    function pisCorner(t) {
      if (cfg.heroIsPisces || t > T.pisHop) return
      const k = pop01(t, -0.5, 0.3, 2)
      tissues(x, PIS_CORNER.x - 95, PIS_CORNER.y + 32, 66)
      const tears = t < T.cut ? (t > T.flyB[0] ? 2 : 1) : 2
      pisces(x, t, { ...PIS_CORNER, pop: k, hops: [T.flyA[1], T.boxOff[0] + 0.1, T.lid + 0.05] }, tears, t > T.cut ? 'sparkle' : 'wide', [-1, -1])
    }

    function scene(t) {
      const lidK = easeOutBack(prog(t, T.lid - 0.2, T.lid), 1.6)
      const glow = clamp(prog(t, T.lid, T.lid + 0.4)) * (0.75 + 0.25 * Math.sin(t * 4))
      // the LEAVING box slides off at the end of its beat
      const off = ease.inCubic(prog(t, ...T.boxOff))
      const lcx = LBOX.cx - off * 700, lrot = -0.2 * off
      const showL = off < 1
      // finale: the gift box drifts right a touch so Pisces can sit on it
      const kfx = KBOX.cx
      // shadows
      if (showL) shadow(x, lcx, LBOX.y + LBOX.h + 6, LBOX.w * 1.05)
      shadow(x, kfx, KBOX.y + KBOX.h + 6, KBOX.w * 1.05)
      // box backs
      if (showL) { x.save(); x.translate(lcx, LBOX.y + LBOX.h); x.rotate(lrot); x.translate(-lcx, -(LBOX.y + LBOX.h)); leaveBox(x, t, lcx, LBOX.y, LBOX.w, LBOX.h, false); x.restore() }
      keepBox(x, t, kfx, KBOX.y, KBOX.w, KBOX.h, false, lidK, glow)
      // the heart between them: it never moves
      const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 5.2)) ** 6
      const big = 1 + 0.55 * ease.outBack(prog(t, T.heart, T.heart + 0.45))
      const hk = big * beat
      if (t > T.heart) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(HEART_AT.x, HEART_AT.y, 5, HEART_AT.x, HEART_AT.y, 220)
        g.addColorStop(0, `rgba(255,92,138,${0.35 * clamp(prog(t, T.heart, T.heart + 0.5))})`); g.addColorStop(1, 'rgba(255,92,138,0)')
        x.fillStyle = g; x.fillRect(HEART_AT.x - 240, HEART_AT.y - 240, 480, 480); x.restore()
      }
      drawBits(x, HEART, { H: '#ff5c8a' }, HEART_AT.x, HEART_AT.y, 13 * hk * popOut(t, T.out))
      drawBits(x, ['HH', 'H.'], { H: '#ffd0dd' }, HEART_AT.x - 22 * hk, HEART_AT.y - 16 * hk, 6 * hk * popOut(t, T.out), { outline: null })
      hearts(x, t, T.heart + 0.1, HEART_AT.x, HEART_AT.y - 40, { n: 6 })
      // tags (between box backs and fronts)
      flyTag(t, cfg.leave[0], T.tagA, T.flyA, LBOX, { accent: '#9b6e46', rot0: -0.05 })
      flyTag(t, cfg.leave[1], T.tagB, T.flyB, LBOX, { accent: '#9b6e46', rot0: 0.04 })
      if (t >= T.flyK[0]) flyTag(t, cfg.keep, T.tagK, T.flyK, KBOX, { col: '#fff1c8', accent: RED, rot0: 0 })
      // box fronts
      if (showL) { x.save(); x.translate(lcx, LBOX.y + LBOX.h); x.rotate(lrot); x.translate(-lcx, -(LBOX.y + LBOX.h)); leaveBox(x, t, lcx, LBOX.y, LBOX.w, LBOX.h, true); x.restore() }
      keepBox(x, t, kfx, KBOX.y, KBOX.w, KBOX.h, true, lidK, glow)
      sparkles(x, t, kfx, KBOX.y, T.lid + 0.02, 12, 190, 1, [GOLD, BONE, PINK])
      if (t > T.boxOff[0] - 0.1 && t < T.boxOff[1] + 0.5) label(x, 'bye!', lerp(300, 120, off), 1000 - 40 * off, { size: 40, col: BONE, font: INTER, weight: 800, alpha: 1 - prog(t, T.boxOff[1], T.boxOff[1] + 0.4), rot: -0.15 })
      // the hero
      const P = heroPose(t)
      if (P.k > 0.01) {
        const M = heroMood(t)
        shadow(x, P.x, P.y + P.s * 0.48, P.s * 0.85 * P.k)
        x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.translate(-P.x, -P.y)
        const o = { x: P.x, y: P.y, s: P.s, pop: P.k, mood: M.mood, look: M.look, hops: HERO_HOPS, blush: M.mood === 'heart' ? 1 : undefined }
        hero(t, o)
        if (cfg.heroIsPisces) { const F = starFrame(P.x, P.y, P.s, t, { ...o, seed: 3 }); inSprite(x, F, () => tearsCells(x, t, t > T.heart ? 3 : t > T.hug ? 2 : 1)) }
        if (cfg.prop) cfg.prop(x, t, { ...P, o, hero: (tt, oo) => hero(tt, oo), starFrame, inSprite })
        x.restore()
      }
      // the KEEPING tag sits in the hero's arms before it flies (in front of the hero)
      if (t < T.flyK[0]) {
        const hugK = ease.inOutCubic(prog(t, T.hug - 0.3, T.hug + 0.1))
        if (t >= T.tagK) {
          const k = easeOutBack(prog(t, T.tagK, T.tagK + 0.34), 2.6)
          const sq = t > T.hug && t < T.hug + 0.3 ? 1 + 0.06 * Math.sin((t - T.hug) * 30) : 1
          tag(x, cfg.keep, 540, lerp(610, 990, hugK), k * lerp(1.08, 0.82, hugK) * sq, { rot: lerp(-0.02, 0.05, hugK), col: '#fff1c8', accent: RED })
          if (t > T.hug) hearts(x, t, T.hug, 540, 760, { n: 5, spread: 320 })
        }
      }
      // quips
      for (const q of quips) bubble(x, t, 540 + (q.dx ?? 250), 640 + (q.dy ?? 0), q.t, q.t + (q.d || 1.4), q.text, { size: 32, tail: q.tail ?? -0.5 })
    }

    function finale(t) {
      if (t < T.starsIn || t > T.out[1]) return
      const ok = popOut(t, T.out)
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 200, 1220, 170, t, { color: STAR.sky, mood: t > T.last + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      if (cfg.heroIsPisces) {
        // the hero is Pisces: a little friend hops onto the gift box instead (a pixel tissue box with a bow)
        const k = pop01(t, T.pisHop, 0.36, 2.2) * ok
        if (k > 0.01) { x.save(); x.translate(KBOX.cx, KBOX.y - 70); x.scale(k, k); tissues(x, 0, 0, 120); x.restore() }
        return
      }
      const hk = ease.outBack(prog(t, T.pisHop, T.pisHop + 0.45))
      const px = lerp(PIS_CORNER.x, KBOX.cx + 10, hk), py = lerp(PIS_CORNER.y, KBOX.y - 85, hk) - Math.sin(Math.PI * clamp(hk)) * 160
      pisces(x, t, { x: px, y: py, s: lerp(130, 150, hk), pop: ok, hops: [T.pisHop + 0.5, T.last + 0.8] }, 3, 'sparkle', [-1, 0])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
        drawSky(x, t, base)
        snow(x, t, { a: 0.45 })
        const dL = t - T.lid, shake = dL > 0 && dL < 0.35 ? 10 * Math.exp(-dL * 10) * Math.sin(dL * 55) : 0
        x.save(); x.translate(0, shake)
        x.globalAlpha = 1 - ease.inQuad(prog(t, ...T.out))
        pisCorner(t)
        if (t < T.out[1]) { scene(t); finale(t) }
        x.restore()
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.h1, T.h3].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const tagCues = (t0, fly, hi) => [['whoosh', r3(t0 - 0.05), 0.25, 0.03], ['pop', r3(t0 + 0.04), hi, 0.045, 0], ['pluck', r3(t0 + 0.12), hi * 1.5, 0.025, 0.4, 0.2],
    ['whoosh', fly[0], 0.3, 0.035], ['tom', r3(fly[1] - 0.02), 120, { gain: 0.18, decay: 0.18 }], ['tick', fly[1], 0.06]]
  const CUES = [
    ['pop', 0.02, 987.77, 0.04, 0], ['glitter', 0.05, 0.45], ['pop', 1.1, 1174.66, 0.03, 0.2],
    ['whoosh', r3(T.h1 - 0.08), 0.28, 0.035], ...wordPops(T.h1, 3, 0.08, 0),
    ...tagCues(T.tagA, T.flyA, 880), ...tagCues(T.tagB, T.flyB, 987.77),
    ['whoosh', T.boxOff[0], 0.45, 0.04], ['pop', T.wave, 1318.51, 0.03, -0.4],
    ...wordPops(T.h2, 3, 0.08, 2),
    ['pop', r3(T.tagK + 0.04), 1174.66, 0.05, 0], ['glitter', T.tagK, r3(T.tagK + 0.4)],
    ['pluck', T.hug, 1174.66, 0.04, 0.5, 0], ['pluck', r3(T.hug + 0.12), 1567.98, 0.035, 0.5, 0],
    ['whoosh', T.flyK[0], 0.3, 0.035], ['tom', r3(T.flyK[1] - 0.02), 110, { gain: 0.2, decay: 0.2 }],
    ['boom', T.lid, 0.22], ['tick', T.lid, 0.07], ['bell', r3(T.lid + 0.06), 1760, 0.03, 1.1, 0.3], ['glitter', r3(T.lid + 0.05), r3(T.lid + 0.5)],
    ['whoosh', r3(T.h3 - 0.08), 0.3, 0.035], ...wordPops(T.h3, 4, 0.09, 1), ['pop', T.h3Land, 1567.98, 0.045, 0],
    ['bell', r3(T.heart + 0.05), 1174.66, 0.035, 1.4, 0], ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4],
    ['pop', r3(T.pisHop + 0.05), 987.77, 0.03, 0.4], ['tick', r3(T.pisHop + 0.45), 0.05], ['glitter', r3(T.pisHop + 0.45), r3(T.pisHop + 0.8)],
    ...quips.flatMap(q => [['pop', q.t, 1318.51, 0.035, 0.3], ['pop', r3(q.t + 0.06), 1760, 0.02, 0.3]]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
void [MONO, INTER]
