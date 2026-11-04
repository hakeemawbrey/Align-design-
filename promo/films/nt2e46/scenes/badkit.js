// EXPLAIN IT BADLY: the shared look of Trends Vol. 2 episodes nt2e46–nt2e50 (promo/films/next30/b13.md §10).
// The other four films import this file from here.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.10   hook: the caption "Explain *<thing>* badly." is on screen from frame 0; the hero at a whiteboard, mid-action.
//   2.10–10.95  three explanations, each a jump cut + numbered sticker + a terrible marker doodle on the board
//               (rule of three: the third is accidentally wise). The third starts under the one card cut (7.6).
//   10.95–15.5  THE STARS' rubber stamp "…*accurate.*" slams on the board; THE STARS say the last line;
//               Pisces (front row, taking notes, crying) holds up an "A+".
//
//   makeBad(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hero, cfg.thing ('a first date'), cfg.accent, cfg.deep, cfg.last
//     cfg.steps: [{ caption, doodle(x, t, S), cues }] × 3   S = { u (s since the step began), p (0…1 draw-on), hero, ... }
//     cfg.hookDoodle(x, t) optional, cfg.prop(x, t, F) optional extra on the hero (F = sprite frame)
import { el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import * as B from '../../nt2e41/scenes/b13base.js'
const { R, box, shadow, sparkles, pisces, buildBug, buildSticker, buildStamp, drawStampTool, drawBar, pop01, outK, popOut, clamp, lerp, prog, ease, drawStarChar, signStar, STAR, r3, GOLD, BONE, PINK, INK, RED, INTER, MONO } = B

export const DURATION = 18
export const STORY_END = DURATION - ENDCARD_SHORT_LEN
export const T = {
  bug: 0.3, h0Out: [10.85, 11.05],
  steps: [[2.1, 4.85], [4.85, 7.6], [7.6, 10.95]],
  cut: 7.6,
  stampDrop: [11.0, 11.32], stamp: 11.35, starsIn: 11.5, pisIn: 11.6, score: 12.4,
  last: 11.95, boxClose: 15.1, out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const CPS = 30
// the whiteboard
export const BX = 120, BY = 420, BW = 840, BH = 600
export const MARKER = ['#2f6fe0', '#e8344e', '#1f9e6a']

/** a marker polyline drawn on up to p (0…1) of its length */
export function scribble(x, pts, p, col = MARKER[0], w = 9) {
  if (p <= 0 || pts.length < 2) return
  let L = 0; const seg = []
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d }
  let left = L * clamp(p)
  x.save(); x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'
  x.beginPath(); x.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length && left > 0; i++) {
    const k = Math.min(1, left / seg[i - 1])
    x.lineTo(lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)); left -= seg[i - 1]
  }
  x.stroke(); x.restore()
}
/** a marker circle (wobbly), drawn on up to p */
export function circle(x, cx, cy, r, p, col = MARKER[0], w = 9) {
  const pts = []; for (let i = 0; i <= 40; i++) { const a = -Math.PI / 2 + i / 40 * Math.PI * 2.1; pts.push([cx + Math.cos(a) * r * (1 + 0.04 * Math.sin(i * 1.7)), cy + Math.sin(a) * r * (1 + 0.04 * Math.cos(i * 2.3))]) }
  scribble(x, pts, p, col, w)
}
/** a stick figure (marker), drawn on up to p */
export function stick(x, cx, cy, s, p, col = MARKER[0], w = 8) {
  circle(x, cx, cy - s * 0.75, s * 0.18, clamp(p * 4), col, w)
  scribble(x, [[cx, cy - s * 0.57], [cx, cy - s * 0.1]], clamp(p * 4 - 1), col, w)
  scribble(x, [[cx - s * 0.25, cy - s * 0.4], [cx, cy - s * 0.47], [cx + s * 0.25, cy - s * 0.4]], clamp(p * 4 - 2), col, w)
  scribble(x, [[cx - s * 0.2, cy + s * 0.2], [cx, cy - s * 0.1], [cx + s * 0.2, cy + s * 0.2]], clamp(p * 4 - 3), col, w)
}
/** handwritten-ish board text revealed left to right (p) */
export function write(x, text, cx, cy, p, { size = 40, col = MARKER[0], align = 'center', rot = 0 } = {}) {
  if (p <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
  const w = x.measureText(text).width, x0 = align === 'center' ? -w / 2 : align === 'right' ? -w : 0
  x.beginPath(); x.rect(x0 - 4, -size, (w + 8) * clamp(p), size * 2); x.clip()
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** an arrow */
export function arrow(x, a, b, p, col = MARKER[1], w = 9) {
  scribble(x, [a, b], clamp(p * 1.4), col, w)
  if (p > 0.7) { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); scribble(x, [[b[0] - 30 * Math.cos(ang - 0.5), b[1] - 30 * Math.sin(ang - 0.5)], b, [b[0] - 30 * Math.cos(ang + 0.5), b[1] - 30 * Math.sin(ang + 0.5)]], clamp((p - 0.7) / 0.3), col, w) }
}

function board(x, t) {
  // easel legs
  for (const [lx, rot] of [[260, 0.12], [820, -0.12]]) { x.save(); x.translate(lx, BY + BH); x.rotate(rot); R(x, INK, -12, -20, 24, 360); R(x, '#a07850', -6, -20, 12, 356); x.restore() }
  box(x, BX - 18, BY - 18, BW + 36, BH + 36, '#c9cfe0', { b: 8 })
  R(x, '#fbfaf6', BX, BY, BW, BH)
  R(x, 'rgba(160,170,200,0.12)', BX, BY + BH - 60, BW, 60)
  // marker tray
  box(x, BX + 40, BY + BH + 18, BW - 80, 22, '#aeb6cc', { b: 6 })
  MARKER.forEach((c, i) => { R(x, INK, BX + 520 + i * 70 - 4, BY + BH + 4, 58, 20); R(x, c, BX + 520 + i * 70, BY + BH + 8, 50, 12) })
  void t
}

export function makeBad(cfg) {
  const HERO = signStar(cfg.hero)
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  // the hero holds a marker (pixel) up to the board
  function heroAt(x, t, o, markerCol = MARKER[0]) {
    hero(x, t, o)
    const F = B.starFrame(o.x, o.y, o.s, t, o)
    B.inSprite(x, F, () => {
      x.save(); x.translate(31, 14); x.rotate(-0.7 + (o.writing ? 0.15 * Math.sin(t * 22) : 0))
      x.fillStyle = INK; x.fillRect(-1.6, -7.6, 3.2, 11.2); x.fillStyle = '#f4f1ff'; x.fillRect(-1, -7, 2, 10); x.fillStyle = markerCol; x.fillRect(-1, -7, 2, 3); x.fillRect(-0.5, -8.4, 1, 1.6)
      x.restore()
    })
    if (cfg.prop) cfg.prop(x, t, F)
  }

  async function build(stage) {
    try {
      await Promise.all(["800 78px Inter", "800 50px Inter", "800 28px Inter", "italic 500 112px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, `Explain *${cfg.thing}* | badly.`, { top: 160, size: 78, accentSize: 108, at: -1, gap: 0, accentColor: cfg.accent || HERO.color, fit: true })
    const stickers = cfg.steps.map((s, i) => buildSticker(root, { badgeText: i + 1, text: s.caption, deep: cfg.deep || RED, badge: i === 2 ? PINK : (cfg.badge || HERO.color), at: T.steps[i][0] + (i === 2 ? 0.55 : 0.3), out: [T.steps[i][1] - 0.18, T.steps[i][1]], tilt: [-2.2, 1.8, -1.4][i], top: 1360, size: 46 }))
    const stamp = buildStamp(root, { html: `…<span style="font:italic 500 170px 'EB Garamond',serif;letter-spacing:0">accurate.</span>`, ink: cfg.stampInk || RED, at: T.stamp, out: T.out, top: 560 })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1430, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug, 'EXPLAIN IT BADLY')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        R(x, 'rgba(20,14,44,0.55)', 0, 1180, 1080, 740)
        const dS = t - T.stamp, shake = dS > 0 && dS < 0.45 ? 18 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        board(x, t)
        // board contents
        x.save(); x.beginPath(); x.rect(BX, BY, BW, BH); x.clip()
        if (t < T.steps[0][0]) { write(x, 'TODAY:', BX + 40, BY + 60, 1, { size: 34, align: 'left', col: '#8a8fb0' }); if (cfg.hookDoodle) cfg.hookDoodle(x, t) }
        let stepIdx = -1
        cfg.steps.forEach((s, i) => {
          const a = T.steps[i][0], b = i === 2 ? T.out[1] : T.steps[i][1]
          if (t < a || t >= b) return
          stepIdx = i
          const u = t - a
          write(x, `${i + 1}.`, BX + 44, BY + 60, 1, { size: 40, align: 'left', col: '#8a8fb0' })
          s.doodle(x, t, { u, p: Math.max(0, (u - 0.1) / 1.5), i, hero })
        })
        x.restore()
        // the hero, writing
        const writing = stepIdx >= 0 && t - T.steps[stepIdx][0] < 1.9 && t < T.stamp
        const hk = 1
        shadow(x, 190, 1300, 200)
        const mood = t >= T.stamp ? (t > T.stamp + 0.15 ? 'sparkle' : 'wide') : stepIdx === 2 && t - T.steps[2][0] > 1.9 ? 'sparkle' : writing ? 'squint' : 'happy'
        heroAt(x, t, { x: 190, y: 1130 + (writing ? 4 * Math.sin(t * 20) : 0), s: 230, pop: hk, mood, look: writing ? [1, -1] : [1, 0], writing, hops: [0.5, 1.4, ...T.steps.map(s => s[0] + 0.05), T.stamp + 0.04, T.last + 1.6] }, MARKER[Math.max(0, stepIdx) % 3])
        // Pisces: front row with a notebook, sniffling; fountains + A+ at the end
        const pk = pop01(t, 2.4, 0.3, 2)
        if (pk > 0.01) {
          const fin = t >= T.pisIn
          const F = pisces(x, t, { x: 900, y: fin ? 1260 : 1600, s: fin ? 150 : 130, pop: pk * (fin ? popOut(t, T.out) : 1), hops: [2.7, 7.65, T.pisIn + 0.3, T.score + 0.02] }, fin ? 3 : stepIdx === 2 ? 2 : 1, fin ? 'sparkle' : 'happy', [-1, -1])
          if (!fin) { box(x, 900 - 120, F.cy + 10, 90, 64, BONE, { b: 5 }); for (let i = 0; i < 3; i++) R(x, '#8a8fb0', 900 - 110, F.cy + 24 + i * 14, 66, 4) }
          const ck = pop01(t, T.score, 0.3, 2.6) * popOut(t, T.out)
          if (ck > 0.01) {
            x.save(); x.translate(904, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
            box(x, -70, -50, 140, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70)
            x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('A+', 0, 4)
            x.restore()
          }
        }
        // THE STARS
        const sk = pop01(t, T.starsIn, 0.38, 2.1) * popOut(t, T.out)
        if (sk > 0.01) drawStarChar(x, 540, 1270, 150, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [-1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
        x.restore()
        drawBar(x, t, [...T.steps, [T.steps[2][1], T.boxClose]], B.BUG_PINK, outK(t, T.out))
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.translate(0, shake); drawStampTool(tx, t, T.stampDrop[0], T.stamp, cfg.stampInk || RED, 720); tx.restore()
        sparkles(tx, t, 540, 720, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        stickers.forEach(s => s.update(t))
        stamp.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.steps[0][0], T.steps[1][0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), t >= T.stamp && t < T.stamp + 0.1 ? 0.6 * (1 - (t - T.stamp) / 0.1) : 0)
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
  const squeak = (a, n) => Array.from({ length: n }, (_, i) => ['chip', r3(a + 0.15 + i * 0.22), NOTE[(i * 2) % NOTE.length] * 2, 0.08, { wave: 'square', duty: 0.125, slide: 8, gain: 0.012, decay: 0.05, sustain: 0.2, bus: 'fx' }])
  const CUES = [
    ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['pop', 0.5, 987.77, 0.03, 0], ['pluck', 1.4, 1318.51, 0.03, 0.4, 0.2],
    ...cfg.steps.flatMap((s, i) => {
      const a = T.steps[i][0], st = a + (i === 2 ? 0.55 : 0.3)
      return [
        ...(i < 2 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ...squeak(a, 7),
        ...(s.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ['whoosh', T.stampDrop[0], 0.32, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
    ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pop', T.score, 1318.51, 0.045, 0.4], ['pop', r3(T.score + 0.08), 1760, 0.035, 0.4], ['glitter', T.score, r3(T.score + 0.3)],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
export { B }
void lerp; void ease
