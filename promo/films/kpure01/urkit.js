// urkit — the shared look of "Planet Talk: Uranus" (batch p08, kpure01–kpure12). Built on promo/films/planetkit.js
// (the cast, space, bubbles, entrances) and promo/films/hookkit.js (slam titles, glitch, whip, chapters, loop-back).
// Imported read-only by every Uranus film. No end card, no card cut, no logo: DURATION is the story.
//
//   import { urFilm } from '../../kpure01/urkit.js'
//   const F = urFilm({ ...cfg });  export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
//
// cfg: {
//   id, sign, dur, ending: 'cut' | 'loop',
//   hook:   { text, top?, size?, out? }            the call-out line, on screen at frame 0 (hookkit slamTitle, at −1)
//   entry:  { kind, at, len?, from?: 'left'|'right', roll?: true, x, y, size }
//           Uranus mid-entrance at frame 0 (planetkit entrance kinds; roll = a 'slide' that spins like a bowling ball,
//           because Uranus really does go round the Sun tipped on its side). x, y, size = where it lands.
//   debris: [{ label?, w, h, color, x, y, vx, vy, spin?, t0? }]   things that "went flying" (already mid-air at t = 0)
//   bg(x, t, K)      the set (default: Uranus-tinted space)
//   paint(x, t, K)   the characters + props (world = screen, 1080×1920). K.uranus(x, t, o) draws Uranus with the
//                    entrance applied; K.sign / K.pisces / K.planet draw the others.
//   over(x, t, K)    screen overlays above the cast (phones, cards, HUDs), under the bubbles
//   lines:  [{ t0, t1, who, text, x, y, tail?, tailUp?, size?, maxW? }]   speech bubbles (planetkit speech)
//   heads:  [{ at, text, out?, top?, size? }]     pop captions (hookkit slamTitle)
//   fx:     [{ f, c, o }]                         extra hookkit effects (factory, cue fn, opts)
//   brk:    pattern-break glitch opts (default { at: 0.45, len: 0.5 }); false = none
//   cues, music
// }
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, entranceLand, planetSize, PLANETS } from '../planetkit.js'
import { slamTitle, slamTitleCues, glitch, glitchCues, loopBack, loopCues } from '../hookkit.js'
import { box, rect, rrect, txt, rich, phone, label, loading, pop01, outK, inOut } from '../kdwe01/dwkit.js'
export * as HK from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#140c28', RED = '#ff3b4e', PINK = '#ff8fb1'
export const CYAN = PLANETS.uranus.color, TEAL = PLANETS.uranus.rim, ZAP = '#e9fdff'
export const INTER = "'Inter', system-ui, sans-serif", MONO = "'Space Mono', ui-monospace, monospace", SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
export const r3 = v => +v.toFixed(3)
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

/** keyframe track: keys = [[t, { x, y, size, … }], …]; numbers ease between keys, other values switch at the key */
export function track(t, keys) {
  if (t <= keys[0][0]) return { ...keys[0][1] }
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, a] = keys[i], [tb, b] = keys[i + 1]
    if (t < tb) {
      const dur = b.dur ?? Math.min(0.45, tb - ta), k = ease.inOutCubic(prog(t, tb - dur, tb))
      const o = { ...a }
      for (const kk of Object.keys(b)) if (typeof b[kk] === 'number' && typeof a[kk] === 'number') o[kk] = lerp(a[kk], b[kk], k); else if (k >= 1) o[kk] = b[kk]
      return o
    }
  }
  return { ...keys[keys.length - 1][1] }
}
/** in a window [a, b] with pop in / out: 0…1 */
export const win = (t, a, b, d = 0.3) => (t < a || t > b + 0.3) ? 0 : pop01(t, a, d) * outK(t, [b, b + 0.25])

/** Uranus's static: little cyan lightning zigzags crackling round it (the chaotic-genius energy) */
function sparks(x, t, X, Y, r, k = 1, seed = 3) {
  if (k <= 0) return
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round'
  for (let i = 0; i < 5; i++) {
    const ph = (t * 1.7 + fr(i, seed)) % 1
    if (ph > 0.45) continue
    const a = fr(i + Math.floor(t * 1.7 + fr(i, seed)) * 7, seed + 1) * TAU
    const r0 = r * 1.08, r1 = r * (1.35 + 0.2 * fr(i, seed + 2))
    x.globalAlpha = k * (1 - ph / 0.45)
    x.beginPath()
    for (let j = 0; j <= 4; j++) {
      const rr = lerp(r0, r1, j / 4), off = (j % 2 ? 1 : -1) * 0.07 * (j > 0 && j < 4 ? 1 : 0)
      const px = X + Math.cos(a + off) * rr, py = Y + Math.sin(a + off) * rr
      j ? x.lineTo(px, py) : x.moveTo(px, py)
    }
    x.strokeStyle = INK; x.lineWidth = 14; x.stroke()
    x.strokeStyle = ZAP; x.lineWidth = 7; x.stroke()
  }
  x.restore()
}

function buildBug(root) {
  const c = layerCanvas(root, { pointerEvents: 'none' }); c.dataset.hookcam = 'off'
  const x = c.getContext('2d')
  return {
    draw() {
      x.clearRect(0, 0, 1080, 200)
      x.save(); x.font = `800 26px ${INTER}`; x.letterSpacing = '6px'; x.textBaseline = 'middle'
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
      x.fillStyle = CYAN; x.beginPath(); x.arc(70, 84, 13, 0, TAU); x.fill()
      x.shadowBlur = 0; x.strokeStyle = '#dff8f9'; x.lineWidth = 3; x.beginPath(); x.ellipse(70, 84, 6, 21, 0.15, 0, TAU); x.stroke()
      x.fillStyle = '#dff8f9'; x.fillText('PLANET TALK · URANUS', 98, 84)
      x.restore()
    },
  }
}

export function urFilm(cfg) {
  const D = cfg.dur, SIGN = cfg.sign, LOOP = cfg.ending === 'loop'
  const E = { kind: 'slide', at: -0.3, x: 540, y: 640, size: planetSize('uranus', 560), from: 'right', ...cfg.entry }
  const kitKind = E.roll ? 'slide' : E.kind
  const LAND = entranceLand(kitKind, E)
  const lines = cfg.lines || []
  const uLines = lines.filter(l => l.who === 'uranus').map(l => ({ t: l.t0, who: 'uranus', text: l.text }))
  const HOOK = { at: -1, top: 250, size: 104, out: [2.5, 2.75], ...cfg.hook }
  const BRK = cfg.brk === false ? null : { at: 0.45, len: 0.5, dialog: false, amp: 1, ...(cfg.brk || {}) }
  const heads = (cfg.heads || []).map(h => ({ top: 250, size: 96, ...h }))

  /** Uranus with the entrance applied (o.x, o.y, o.size = where it is after landing) */
  function uranus(x, t, o = {}) {
    const X = o.x ?? E.x, Y = o.y ?? E.y, S = o.size ?? E.size
    let P = { x: X, y: Y, size: S, rot: 0, squash: 0, alpha: 1 }
    if (t < LAND + 1.2 && !o.noEntry) {
      const IN = { at: E.at, len: E.len, x: X, y: Y, size: S }
      const fx = () => drawEntranceFx(x, 'uranus', kitKind, t, IN)
      if (E.from === 'left') { x.save(); x.translate(2 * X, 0); x.scale(-1, 1); fx(); x.restore() } else fx()
      P = entrance(kitKind, t, IN)
      if (E.from === 'left') P.x = 2 * X - P.x
      if (E.roll) P.rot += (E.from === 'left' ? 1 : -1) * (1 - ease.outCubic(prog(t, E.at, LAND))) * 9
      if (E.flip) P.rot += Math.PI * (1 - ease.outBack(prog(t, LAND - 0.1, LAND + 0.35)))
    }
    const { x: _x, y: _y, size: _s, noEntry, spark = 1, ...rest } = o
    sparks(x, t, P.x, P.y, P.size / 2, spark * (t < LAND ? 1 : 0.9))
    return drawPlanet(x, 'uranus', P.x, P.y, P.size, t, { lines: uLines, cps: 32, mood: 'sly', ...rest, rot: (rest.rot ?? 0) + P.rot, squash: (rest.squash ?? 0) + P.squash, alpha: (rest.alpha ?? 1) * P.alpha })
  }
  const sign = (x, t, id, o = {}) => { const { x: X, y: Y, s, ...r } = o; return drawSign(x, id, X, Y, s ?? 300, t, r) }
  const pisces = (x, t, o = {}) => sign(x, t, 'pisces', { mood: 'sparkle', tears: 3, look: [0, -1], seed: 6, ...o })
  const planet = (x, t, id, o = {}) => { const { x: X, y: Y, size, ...r } = o; return drawPlanet(x, id, X, Y, size, t, r) }

  function debris(x, t) {
    for (const [i, d] of (cfg.debris || []).entries()) {
      const dt = t - (d.t0 ?? -0.4)
      if (dt < 0 || dt > 2.6) continue
      const X = d.x + d.vx * dt, Y = d.y + d.vy * dt + 1600 * dt * dt
      if (Y > 2200 || X < -400 || X > 1480) continue
      x.save(); x.translate(X, Y); x.rotate((d.spin ?? 6) * dt + i)
      if (d.draw) d.draw(x, t)
      else {
        box(x, -d.w / 2, -d.h / 2, d.w, d.h, d.color || BONE, { o: 5 })
        if (d.label) txt(x, d.label, 0, 2, { size: d.size ?? 26, color: d.ink ?? INK, font: INTER, weight: 900 })
      }
      x.restore()
    }
  }

  const K = { D, SIGN, LAND, E, uranus, sign, pisces, planet, track, win, box, rect, rrect, txt, rich, phone, label, loading, pop01, outK, inOut, drawSpace, GOLD, BONE, INK, RED, PINK, CYAN, TEAL, MONO, INTER, SERIF, sparks }

  async function build(stage) {
    try { await Promise.all(['800 60px Inter', '900 60px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07041a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const bug = buildBug(root)
    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 1080, 1920)
        if (cfg.bg) cfg.bg(x, t, K); else drawSpace(x, t, { planet: 'uranus', seed: 8 })
        debris(x, t)
        cfg.paint(x, t, K)
        if (cfg.over) cfg.over(x, t, K)
        for (const l of lines) speech(x, t, { size: 44, maxW: 700, ...l })
        if (cfg.top) cfg.top(x, t, K)
        drawGrain(gx, t)
        bug.draw()
      },
    }
  }

  const fx = cfg.fx || []
  const SCENES = [
    build,
    ...(BRK ? [glitch(BRK)] : []),
    ...fx.map(e => e.f(e.o)),
    slamTitle(HOOK),
    ...heads.map(h => slamTitle(h)),
  ]
  if (LOOP) SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: D, len: cfg.loopLen ?? 0.45 }))
  const CUES = [
    ...entranceCues(kitKind, E),
    ...(cfg.debris || []).slice(0, 4).map((d, i) => ['pop', r3(Math.max(0.02, 0.05 + i * 0.07)), 700 + i * 150, 0.03, (i % 2 ? 0.3 : -0.3)]),
    ...(BRK ? glitchCues(BRK) : []),
    ...fx.flatMap(e => e.c ? e.c(e.o) : []),
    ...slamTitleCues(HOOK),
    ...heads.flatMap(h => slamTitleCues(h)),
    ...speechCues(lines),
    ...(LOOP ? loopCues({ duration: D, len: cfg.loopLen ?? 0.45 }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const MUSIC = { ...cfg.music, sections: { ...(cfg.music.sections || {}), outroAt: cfg.music.sections?.outroAt ?? Math.max(1.5, D - 1.6) } }
  return { DURATION: D, SCENES, CUES, MUSIC, K }
}
