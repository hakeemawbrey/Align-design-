// FAKE AD, the long cut (60 s): the full late-night infomercial. Used by kfae23 and kfae24 (read-only for kfae24).
// Built on ../kfae01/adkit.js (the show look) and ../hookkit.js (slam title, record scratch, whip zoom, chapter stickers,
// incoming call, countdown, shake, loop-back). Pure f(t); no `document` at module top level.
//
//   0.0    frame 0: B&W BEFORE footage, a 2×2 grid of four signs mid-meltdown + the hook (promises the payoff)
//   0.55   record scratch + freeze ("sound familiar?")
//   2.6    "There’s GOT to be | a better way!" slams, the grid shakes
//   6.0    whip zoom into colour: INTRODUCING… (bundle name)
//   7, 16, 25, 34   four product chapters (sticker, box slam, open, tip card, demo, Pisces reaction louder each time);
//          chapter 3 opens on "BUT WAIT, THERE’S MORE!". Each finished box lands on the shelf along the bottom.
//   43     CALL NOW: a full-screen incoming call from Pisces, answered; Pisces sobs a testimonial on air
//   51     THE PRICE: countdown, the tag scrambles, slams the payoff; all four signs cheer
//   59     the last line lands; hard cut at 60 (or ease back into frame 0 for a loop)
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H } from '../wheel.js'
import {
  star, bubble, motion, label, block, R, drawBox, drawTipCard, drawStarburst, burstBadge, beforeChrome, BWLayer, compositeBW,
  buildBug, buildHead, buildFine, sparkles, hearts, pop01, outK, r3, clamp, lerp, prog, ease, easeOutBack, HK,
  BONE, INK, YEL, RED, CYAN, MONO, INTER,
} from '../kfae01/adkit.js'

export const LONG = { dur: 60, flip: 6.0, P: [7, 16, 25, 34], segLen: 9, call: 43, answer: 44.3, price: 51, last: 58.7 }
const SHELF = [150, 390, 630, 870], SHELF_Y = 1640

export function makeLongAd(cfg) {
  const L = { ...LONG, ...(cfg.times || {}) }, D = L.dur
  const LOOP = cfg.ending === 'loop'
  const HOOK = { at: -1, text: cfg.hook, top: 300, size: 104, accentColor: YEL, out: [2.5, 2.6] }
  const REC = { at: 0.55, len: 0.9, caption: cfg.rec || 'sound *familiar?*', top: 1480 }
  const BETTER = { at: 2.65, text: cfg.better || 'There’s GOT to be | *a better way!*', top: 300, size: 104, accentColor: YEL, out: [5.85, 5.98] }
  const WHIP = { at: L.flip, from: 1.8, flash: 0.6 }
  const SHAKES = [{ at: 0.02, len: 0.45, amp: 16 }, { at: 3.0, len: 0.5, amp: 22 }, ...L.P.map((p, i) => ({ at: r3(p + boxAt(i) + 0.25), len: 0.4, amp: 22 }))]
  const CHAPS = [
    { at: 0.0, out: [5.8, 5.95], n: 1, title: cfg.chapters?.[0] || 'THE PROBLEM', y: 160 },
    ...cfg.products.map((p, i) => ({ at: L.P[i] + 0.05, out: [L.P[i] + L.segLen - 0.3, L.P[i] + L.segLen - 0.15], n: i + 2, title: p.chapter, y: 160 })),
    { at: L.call + 0.05, out: [L.price - 0.3, L.price - 0.15], n: 6, title: cfg.callChapter || 'CALL NOW', y: 160 },
    { at: L.price + 0.05, out: [D - 0.2, D - 0.05], n: 7, title: cfg.priceChapter || 'THE PRICE', y: 160 },
  ]
  CHAPS[0].at = -1                                     // the first sticker is already on frame 0
  const CALL = { at: L.call, out: [L.call + 2.2, L.call + 2.3], name: '♓︎ *Pisces*', sub: 'line 1 · studio audience', glyph: '♓', color: '#8a6cf0', answerAt: L.answer }
  const COUNT = { at: L.price + 0.4, from: 3, gap: 0.5, go: null, y: 1000, color: YEL }
  const MORE = { at: L.P[2] + 0.1, text: 'BUT WAIT, | *THERE’S MORE!*', top: 300, size: 110, accentColor: YEL, out: [L.P[2] + 1.15, L.P[2] + 1.3] }
  function boxAt(i) { return i === 2 ? 1.35 : 0.3 }

  async function build(stage) {
    try { await Promise.all(["900 92px Inter", "800 58px Inter", "700 30px Inter", "italic 500 100px 'EB Garamond'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const BW = BWLayer()
    const intro = buildHead(root, `INTRODUCING… | *${cfg.bundle}*`, { top: 300, size: 92, color: YEL })
    const last = buildHead(root, cfg.last, { top: 200, size: cfg.lastSize || 92 })
    const fine = buildFine(root, cfg.fine)
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function before(t) {
      const bx = BW.x
      drawSky(bx, t, { ...SKY_H, zoom: 1.6, dim: 0.9 })
      // the 2×2 grid of meltdowns
      const Q = [[270, 810], [810, 810], [270, 1345], [810, 1345]]
      cfg.grid.forEach((g, i) => {
        const [cx, cy] = Q[i]
        bx.save(); bx.beginPath(); bx.rect(cx - 262, cy - 262, 524, 524); bx.clip()
        g(bx, t, cx, cy)
        bx.restore()
        bx.strokeStyle = BONE; bx.lineWidth = 6; bx.strokeRect(cx - 262, cy - 262, 524, 524)
      })
    }
    // a product segment (i) at time t
    function product(t, i) {
      const p = cfg.products[i], P0 = L.P[i], u = t - P0
      if (u < 0 || u > L.segLen) return
      const bA = P0 + boxAt(i), op = bA + 0.8, tip = bA + 0.9, dem = bA + 2.3, end = P0 + L.segLen
      const slam = easeOutBack(prog(t, bA, bA + 0.3), 1.2)
      const toShelf = ease.inOutCubic(prog(t, end - 0.7, end - 0.2))
      const shrink = ease.inOutCubic(prog(t, dem - 0.3, dem + 0.1))
      let bxp = { x: lerp(540, 200, shrink), y: lerp(lerp(-400, 1100, slam), 1430, shrink), k: lerp(1, 0.42, shrink) }
      if (toShelf > 0) bxp = { x: lerp(bxp.x, SHELF[i], toShelf), y: lerp(bxp.y, SHELF_Y, toShelf), k: lerp(bxp.k, 0.3, toShelf) }
      if (t >= bA) {
        drawBox(x, t, bxp.x, bxp.y, { name: p.name, sub: p.sub, icon: p.icon, col: p.col, col2: p.col2, lid: ease.outCubic(prog(t, op, op + 0.25)), k: bxp.k, rot: -0.03 + 0.02 * Math.sin(t * 3), badge: i === 3 ? 'BONUS!' : 'NEW!' })
        sparkles(x, t, 540, 1100, bA + 0.28, 12, 260, i + 1, [YEL, BONE, CYAN])
      }
      if (t >= dem - 0.05) p.demo(x, t, { u: t - dem, t0: dem, end, star, S: cfg })
      if (t >= tip && t < end - 0.2) {
        const r = easeOutBack(prog(t, tip, tip + 0.42), 1.5), up = ease.inOutCubic(prog(t, dem - 0.3, dem + 0.05)), out = ease.inCubic(prog(t, end - 0.55, end - 0.25))
        drawTipCard(x, t, 540, lerp(lerp(1000, 700, r), 470, up) - out * 900, p.tip, { k: lerp(0.3, 1, r) * lerp(1, 0.9, up), size: 54, rot: -0.02 + 0.015 * Math.sin(t * 2.4), kicker: `PRODUCT ${i + 1} CONTAINS:` })
      }
      // Pisces reacts (louder every chapter)
      const pr = dem + 2.0
      if (t >= dem) {
        star(x, t, { sign: 'pisces', x: 880, y: 1400, s: 180, pop: pop01(t, dem, 0.3, 2) * outK(t, [end - 0.3, end - 0.1]), mood: 'happy', look: [-1, 0], tears: Math.min(3, 1 + i), hops: [pr, pr + 0.6], seed: 6 })
        bubble(x, t, 820, 1250, pr, end - 0.2, p.pisces, { size: 32, maxW: 360, col: '#ffffff', tail: 0.4 })
      }
    }
    function shelf(t) {
      for (let i = 0; i < 4; i++) {
        const done = L.P[i] + L.segLen - 0.2
        if (t < done || t > L.call + 0.05 && t < L.call + 2.4) continue
        const p = cfg.products[i]
        const jump = t > L.price + 2.4 ? 30 * Math.abs(Math.sin((t - L.price) * 6 + i)) : 0
        drawBox(x, t, SHELF[i], SHELF_Y - jump, { name: p.name, sub: null, icon: p.icon, col: p.col, col2: p.col2, k: 0.3, badge: false })
      }
    }
    function callSeg(t) {
      if (t < L.answer + 0.1 || t >= L.price) return
      const u = t - L.answer
      R(x, 'rgba(10,6,22,0.25)', 0, 0, 1080, 1920)
      label(x, '● ON AIR', 540, 520, { size: 44, col: RED, k: pop01(t, L.answer + 0.2, 0.3, 2), stroke: INK })
      star(x, t, { sign: 'pisces', x: 540, y: 1050, s: 380, pop: pop01(t, L.answer + 0.15, 0.4, 2), mood: 'happy', tears: 3, hops: cfg.call.map((_, k) => L.answer + 0.9 + k * 1.55), seed: 6 })
      cfg.call.forEach((q, k) => { const a = L.answer + 0.7 + k * 1.55; bubble(x, t, k % 2 ? 690 : 390, 700 + (k % 2) * 40, a, a + 1.5, q, { size: 38, maxW: 460, col: '#ffffff', tail: k % 2 ? -0.3 : 0.3 }) })
      void u
    }
    function priceSeg(t) {
      if (t < L.price) return
      const sc = L.price + 2.6, slam = easeOutBack(prog(t, sc, sc + 0.3), 1.3)
      // the tag: scrambles, then slams the payoff
      if (t > COUNT.at + 1.6) {
        x.save(); x.translate(540, 900); x.rotate(-0.08 + 0.03 * Math.sin(t * 4)); const k = t < sc ? 0.9 + 0.05 * Math.sin(t * 40) : lerp(1.6, 1, slam); x.scale(k, k)
        block(x, -330, -150, 660, 300, t < sc ? BONE : YEL, { bw: 10 })
        R(x, INK, -300, -150, 30, 30)
        x.font = `900 ${t < sc ? 120 : 150}px ${INTER}`; x.fillStyle = t < sc ? INK : RED; x.textAlign = 'center'; x.textBaseline = 'middle'
        const SCR = ['$$$', '$$$$', '??', '$$$$$', '…']
        x.fillText(t < sc ? SCR[Math.floor(t * 14) % SCR.length] : cfg.price, 0, 8)
        x.restore()
        if (t >= sc) { sparkles(x, t, 540, 900, sc + 0.05, 14, 330, 2, [YEL, BONE, RED]); burstBadge(x, t, 800, 740, cfg.priceBadge || 'WOW!', { k: pop01(t, sc + 0.3, 0.3, 2), r: 100, size: 30 }) }
      }
      // everyone cheers
      if (t > sc + 0.4) {
        const cheer = (k) => [sc + 0.5 + k * 0.1, sc + 1.3 + k * 0.1, sc + 2.1 + k * 0.1, sc + 2.9 + k * 0.1]
        cfg.cast.forEach((s, k) => star(x, t, { sign: s, x: 170 + k * 247, y: 1300, s: 190, pop: pop01(t, sc + 0.4 + k * 0.08, 0.3, 2), mood: 'happy', hops: cheer(k), seed: k + 2 }))
        star(x, t, { sign: 'pisces', x: 540, y: 1480, s: 150, pop: pop01(t, sc + 0.8, 0.3, 2), mood: 'happy', tears: 3, hops: cheer(5), seed: 6 })
        hearts(x, t, 540, 1150, sc + 0.6, { n: 6 })
      }
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        if (t < L.flip) { before(t); compositeBW(x, BW); beforeChrome(x, t) }
        else {
          drawStarburst(x, t, 540, 1000, { k: 1, cols: cfg.burst || ['#ff2f8a', '#ff7a2f'], spin: 0.2 })
          R(x, 'rgba(20,8,40,0.35)', 0, 1560, 1080, 360)
          for (let i = 0; i < 4; i++) product(t, i)
          shelf(t); callSeg(t); priceSeg(t)
        }
        const ik = t >= L.flip && t < L.P[0] + 0.2 ? easeOutBack(prog(t, L.flip + 0.05, L.flip + 0.3), 2.4) * outK(t, [L.P[0], L.P[0] + 0.2]) : 0
        intro.update(t, ik, { rot: -3 })
        last.update(t, t >= L.last ? easeOutBack(prog(t, L.last, L.last + 0.3), 2.2) : 0, { rot: t >= L.last ? 2 * Math.sin((t - L.last) * 14) * Math.exp(-(t - L.last) * 4) : 0 })
        fine.update(t, t >= L.price + 4.4 ? prog(t, L.price + 4.4, L.price + 4.6) : 0)
        bug.update(t, t >= REC.at && t < REC.at + REC.len ? 0 : 1)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [HK.frozen(build, [REC]), ...SHAKES.map(s => HK.screenShake(s)), HK.whipZoom(WHIP), HK.slamTitle(HOOK), HK.slamTitle(BETTER), HK.slamTitle(MORE),
    HK.recordScratch(REC), ...CHAPS.map(c => HK.chapter(c)), HK.incomingCall(CALL), HK.countdown(COUNT)]
  if (LOOP) SCENES.push(HK.loopBack([build, HK.slamTitle(HOOK), HK.chapter(CHAPS[0])], { duration: D }))

  const sc = L.price + 2.6
  const C = [
    ['boom', 0.0, 0.18], ['whoosh', 0.0, 0.4, 0.05],
    ...HK.recordScratchCues(REC), ...HK.slamTitleCues(BETTER), ...HK.whipZoomCues(WHIP), ...HK.slamTitleCues(MORE),
    ...SHAKES.slice(1).flatMap(s => HK.shakeCues(s)), ...CHAPS.filter(c => c.at >= 0).flatMap(c => HK.chapterCues(c)),
    ['crash', L.flip, { gain: 0.05 }], ['pop', L.flip + 0.1, 880, 0.04, -0.2], ['pop', L.flip + 0.2, 1174.66, 0.04, 0.2],
    ...cfg.products.flatMap((p, i) => {
      const bA = L.P[i] + boxAt(i), dem = bA + 2.3
      return [['whoosh', r3(bA), 0.25, 0.05], ['glitter', r3(bA + 0.28), r3(bA + 0.7)], ['tick', r3(bA + 0.8), 0.06], ['riser', r3(bA + 0.8), r3(bA + 1.2), 0.03],
        ['bell', r3(bA + 1.2), 2349.32, 0.03, 1.1, 0], ['whoosh', r3(dem - 0.3), 0.3, 0.035], ['pop', r3(dem), 659.25, 0.04, 0.4],
        ['pluck', r3(dem + 2.0), 987.77, 0.03, 0.5, 0.4], ['pluck', r3(dem + 2.12), 880, 0.03, 0.5, 0.4], ['pluck', r3(dem + 2.24), 739.99, 0.03, 0.6, 0.4],
        ...(p.cues || []).map(([k, rel, ...a]) => [k, r3(dem + rel), ...a]),
        ['whoosh', r3(L.P[i] + L.segLen - 0.7), 0.4, 0.03], ['tick', r3(L.P[i] + L.segLen - 0.2), 0.05]]
    }),
    ...HK.incomingCallCues(CALL), ['pop', L.answer + 0.2, 1318.51, 0.04, 0],
    ...cfg.call.map((_, k) => ['pluck', r3(L.answer + 0.7 + k * 1.55), [987.77, 880, 1174.66, 739.99, 1318.51][k % 5], 0.035, 0.5, 0]),
    ...HK.countdownCues(COUNT),
    ['whoosh', r3(sc - 0.2), 0.3, 0.05], ['boom', r3(sc), 0.3], ['crash', r3(sc), { gain: 0.06 }], ['bell', r3(sc + 0.05), 2349.32, 0.04, 1.4, 0], ['glitter', r3(sc + 0.05), r3(sc + 0.8)],
    ...[0.5, 1.3, 2.1, 2.9].map(d => ['clap', r3(sc + d), { gain: 0.12 }]),
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(L.price + 4.4 + i * 0.05), 0.025]),
    ['pop', r3(L.last + 0.02), 1174.66, 0.05, 0], ['pop', r3(L.last + 0.12), 1567.98, 0.045, 0], ['bell', r3(L.last + 0.14), 2349.32, 0.03, 1.2, 0],
    ...(LOOP ? HK.loopCues({ duration: D }) : []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const music = { style: cfg.style, key: cfg.key, seed: cfg.seed, sections: { drop: L.flip, breakdown: [L.call], lift: [L.P[2], sc], outroAt: D - 0.6 }, hits: [sc, L.last] }
  return { DURATION: D, SCENES, CUES: C, music, L }
}

/** a mini before-quadrant helper: a sign mid-meltdown with a prop line */
export function quad(sign, line, { mood = 'wide', tears = 0, rot = 0.25, prop = null } = {}) {
  return (x, t, cx, cy) => {
    if (prop) prop(x, t, cx, cy)
    motion(x, t, cx, cy + 40, { r0: 110, r1: 150, n: 8, w: 6 })
    star(x, t, { sign, x: cx, y: cy + 40, s: 200, mood, tears, rot: rot * Math.sin(t * 9 + cx), look: [Math.sin(t * 5), -0.5] })
    label(x, line, cx, cy + 200, { size: 34, col: BONE })
  }
}
void [MONO, clamp]
