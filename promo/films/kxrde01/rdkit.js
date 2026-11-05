// RATE MY DATE IDEA: EXTENDED kit (star_talk posts kxrde01–kxrde06, promo/films/month2/m42.md). Lives in kxrde01; the
// other five films import it from here (read-only for everyone else).
// It continues Rate My Date Idea (nrde*): the pink bug, "Rate my *date idea:*" + the pitch sticker in quotes, the tilted
// beat stickers, THE STARS' rubber stamp with the joke score + italic word, Pisces' 10/10 sign. The old kit imports
// endcard.js / cardfx.js, which Month 2 forbids, so the format pieces are copied here (drawing helpers come from
// ../kxsre01/srkit.js, this session's own Silent Review kit). hookkit.js is imported read-only.
//
// The format (75 s, no end card, no card transition): the date is actually PLAYED OUT, then rated.
//   0.0–3.0     HOOK: frame 0 mid-action (cfg.hook), mid-whip-zoom, with the caption + pitch sticker already on screen;
//               0.55 record scratch with the promise as its caption ("wait for *the rating.*").
//   3.0–63.0    six chapters of 10 s (hookkit chapter stickers): 1 THE PLAN · 2–3 the stops · 4 BUT… · 5 THE SAVE ·
//               6 THE MOMENT. Each has a bottom beat sticker (cfg caption), a scene (cfg draw) and speech bubbles.
//               cfg chapters may add jump cuts (punch + flash) at `cuts`.
//   63.0–75.0   THE RATING: the stamp drops (63.4) and slams (63.8) "score · *word*"; Pisces pops up with its own 10/10,
//               crying; THE STARS comment in the dialogue box (66.3); an epilogue gag (cfg.epilogue, 69.5); the last line
//               slams at 73.4 and holds to the hard cut at 75. cfg.loop: hookkit loopBack eases into frame 0 instead.
//
//   makeRD(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign (pitcher), cfg.date, cfg.idea ('The bus to the *last stop.* Wherever.'), cfg.accent, cfg.deep
//     cfg.hook: (x, t, S) the mid-action tableau; cfg.chapters: [{ title, caption, draw(x, t, S), bubbles: [[u0, u1, text,
//       { x, y, tail }]], cuts: [u…], pis: { x, y, s, tears, hidden }, cues }] × 6   (S = { u, t0, t1, i, hero, date, pis })
//     cfg.score, cfg.word, cfg.starsLine, cfg.finale(x, t, S), cfg.epilogue(x, t, S), cfg.last, cfg.loop, cfg.fx, cfg.sky
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'
import { R, box, drawBits, HEART, sparkles, hearts, label, shadow, glow, bubble, starFrame, inSprite, tearsCells, mug, browsCells, mouthCells, scrawl, pop01, outK, popOut, r3, GOLD, BONE, PINK, INK, LAV, RED, SKYB, CREAM, INTER, SERIF, MONO, BUG_PINK } from '../kxsre01/srkit.js'

export { R, box, drawBits, HEART, sparkles, hearts, label, shadow, glow, bubble, starFrame, inSprite, tearsCells, mug, browsCells, mouthCells, scrawl, pop01, outK, popOut, r3, GOLD, BONE, PINK, INK, LAV, RED, SKYB, CREAM, INTER, SERIF, MONO }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR }

// ── the fixed timeline
export const DURATION = 75
export const T = {
  hook: [0, 3.0], rec: [0.55, 1.35], h0Out: [2.75, 2.95],
  chapters: [[3, 13], [13, 23], [23, 33], [33, 43], [43, 53], [53, 63]],
  rating: 63.0, stampDrop: [63.4, 63.78], stamp: 63.8, pisIn: 64.6, pisScore: 65.2, starsIn: 65.8, starsLine: 66.3, boxClose: 69.3,
  epi: 69.5, last: 73.4, loop: [74.6, 75.0],
}
const SEGS = [...T.chapters, [T.rating, DURATION]]

// ── extra props
export function snow(x, t, { n = 40, a = 0.7, x0 = 0, x1 = 1080, y0 = 0, y1 = 1920 } = {}) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) {
    const sp = 60 + (i * 37) % 70, ph = (i * 0.618) % 1
    const py = y0 + (((t * sp) / (y1 - y0) + ph) % 1) * (y1 - y0)
    const px = x0 + ((i * 97) % (x1 - x0)) + Math.sin(t * 1.3 + i) * 18
    R(x, i % 4 ? '#ffffff' : '#dff2ff', px, py, 6 + (i % 3) * 3, 6 + (i % 3) * 3)
  }
  x.restore()
}
/** slanted rain streaks */
export function rain(x, t, { n = 70, a = 0.55, slant = 0.25, speed = 1900, frozenAt = null } = {}) {
  const tt = frozenAt ?? t
  x.save(); x.globalAlpha = a; x.fillStyle = '#bfe3ff'
  for (let i = 0; i < n; i++) {
    const ph = (i * 0.618) % 1, py = ((tt * speed / 2100 + ph) % 1) * 2100 - 100, px = ((i * 137) % 1180) - 50 + py * slant
    x.save(); x.translate(px, py); x.rotate(-slant); x.fillRect(0, 0, 4, 46); x.restore()
  }
  x.restore()
}
export function speedLines(x, cx, cy, dir = -1, n = 4, len = 120, a = 0.6) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < n; i++) R(x, BONE, cx + dir * (60 + i * 24), cy - 50 + i * 30, dir * len * (1 - i * 0.15), 6)
  x.restore()
}
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
export function floor(x, y, col = '#2a2148', line = '#3a2f62', h = 1920 - y) { R(x, col, 0, y, 1080, h); R(x, line, 0, y, 1080, 8) }
export function card(x, cx, cy, w, h, text, { col = BONE, ink = INK, size = 30, rot = 0, font = INTER, weight = 800, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, col, { b: 5 })
  x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = ink
  String(text).split('\n').forEach((ln, i, a) => x.fillText(ln, 0, (i - (a.length - 1) / 2) * size * 1.15 + 2))
  x.restore()
}
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.restore()
}
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── DOM pieces (same look as the nrde kit)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_PINK, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,126,182,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_PINK, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'RATE&nbsp;MY<span style="color:rgba(255,255,255,0.6)">&nbsp;DATE&nbsp;IDEA&nbsp;·&nbsp;EXTENDED</span>')
}
function buildPitch(root, { text, deep }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '330px', width: '1080px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { maxWidth: '900px', padding: '20px 36px 24px', background: BONE, border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, textAlign: 'center' }, wrap)
  const html = '“' + text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 66px ${SERIF};color:${deep};letter-spacing:0">$1</span>`) + '”'
  el('div', { font: `800 52px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t, out = 1) {
      wrap.style.display = out <= 0.01 ? 'none' : 'flex'
      if (out <= 0.01) return
      st.style.opacity = String(out)
      st.style.transform = `translateY(${((1 - out) * -24).toFixed(1)}px) rotate(${(-1.6 + 1.2 * Math.sin(t * 7) * Math.exp(-Math.max(0, t) * 2)).toFixed(3)}deg) scale(${lerp(0.86, 1, out).toFixed(4)})`
    },
  }
}
function buildSticker(root, { tag, text, deep, badge, at, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1440px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '980px', padding: '18px 34px 20px 20px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 rgba(6,4,18,0.7)` }, wrap)
  el('div', { flex: '0 0 auto', padding: '10px 18px 12px', borderRadius: '40px', background: badge, border: `5px solid ${INK}`, font: `800 30px ${INTER}`, letterSpacing: '0.06em', color: INK, whiteSpace: 'nowrap' }, st, tag)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 60px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 46px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}
function buildStamp(root, { score, word, ink, out }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '300px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 46px 22px', border: `12px solid ${ink}`, outline: `5px solid ${ink}`, outlineOffset: '10px', borderRadius: '10px', color: ink, textAlign: 'center', background: 'rgba(255,255,255,0.03)', textShadow: '0 4px 18px rgba(6,4,18,0.6)', whiteSpace: 'nowrap' }, wrap)
  el('div', { font: `800 34px ${INTER}`, letterSpacing: '0.3em', lineHeight: '1.2' }, st, 'THE STARS RATE IT')
  el('div', { font: `800 150px ${INTER}`, letterSpacing: '-0.03em', lineHeight: '1' }, st, score)
  el('div', { font: `italic 500 70px ${SERIF}`, lineHeight: '1.05' }, st, word)
  let fitK = null
  return {
    update(t) {
      const on = t >= T.stamp - 0.02 && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      if (fitK === null) fitK = Math.min(1, 960 / Math.max(1, st.offsetWidth || 1))
      const p = prog(t, T.stamp - 0.02, T.stamp + 0.06), o = popOut(t, out)
      const sc = lerp(1.25, 1, ease.outCubic(p)) * (1 + 0.03 * Math.exp(-(t - T.stamp) * 8) * Math.sin((t - T.stamp) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `rotate(-5deg) scale(${(sc * fitK * Math.max(0.01, o)).toFixed(4)})`
    },
  }
}
function drawStampTool(x, t, ink) {
  const [a] = T.stampDrop, b = T.stamp
  if (t < a || t > b + 0.6) return
  let y, rot = -0.1
  if (t < b) { const p = ease.inCubic(prog(t, a, b)); y = lerp(-420, 480, p); rot = lerp(-0.35, -0.1, p) }
  else { const q = ease.inOutCubic(prog(t, b + 0.1, b + 0.6)); y = lerp(480, -460, q); rot = lerp(-0.1, 0.25, q) }
  const sq = t >= b && t < b + 0.1 ? 0.12 * Math.sin(Math.PI * (t - b) / 0.1) : 0
  x.save(); x.translate(540, y); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -330, -40, 660, 110, '#6b4a2f', { b: 8, hi: '#8a6440' })
  R(x, ink, -330, 70, 660, 20)
  box(x, -50, -170, 100, 130, '#7b5634', { b: 8, hi: '#98704a' })
  box(x, -110, -260, 220, 100, RED, { b: 8, hi: '#ff6b7f' })
  x.restore()
}
function drawBar(x, t, col) {
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === n - 1 ? col : BONE, sx, Y, w * f, Hh)
  })
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeRD(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces'), DATE = signStar(cfg.date)
  const heroIsPis = cfg.sign === 'pisces'
  const CH = cfg.chapters
  const LINES = [{ t: T.starsLine, speaker: 'THE STARS', text: cfg.starsLine }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: 30 })]
  const OUT = [T.last - 0.45, T.last - 0.1]          // the stamp clears just before the last line slams in

  const star = (col, glyph, seed, glowK) => (x, t, o = {}) => {
    const opts = { color: col, seed, glow: glowK, ...o, glyph: o.glyph !== undefined ? o.glyph : (o.s >= 150 ? glyph : null) }
    x.save(); if (o.rot) { x.translate(o.x, o.y); x.rotate(o.rot); x.translate(-o.x, -o.y) }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    if (o.tears || o.brows || o.mouth || o.extra) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => { if (o.brows) browsCells(x, o.brows); if (o.mouth) mouthCells(x, t, o.mouth); if (o.tears) tearsCells(x, t, o.tears); if (o.extra) o.extra(x, t) }) }
    x.restore()
  }
  const hero = star(HERO.color, HERO.glyph, 3, 1.1)
  const date = star(DATE.color, DATE.glyph, 7, 1)
  const pisStar = star(PIS.color, PIS.glyph, 6, 0.8)
  const pisces = (x, t, o = {}) => pisStar(x, t, { mood: 'sparkle', look: [-1, -0.5], tips: false, tears: 1, ...o })

  function phaseAt(t) {
    if (t < T.hook[1]) return { ph: 'hook', i: -1, u: t, t0: 0, t1: T.hook[1] }
    for (let i = 0; i < 6; i++) if (t < T.chapters[i][1]) return { ph: 'ch', i, u: t - T.chapters[i][0], t0: T.chapters[i][0], t1: T.chapters[i][1] }
    return { ph: 'rating', i: 6, u: t - T.rating, t0: T.rating, t1: DURATION }
  }
  const CUTS = [...T.chapters.map(c => c[0]), ...CH.flatMap((c, i) => (c.cuts || []).map(u => r3(T.chapters[i][0] + u)))]

  async function build(stage) {
    try {
      await Promise.all(["800 84px Inter", "800 52px Inter", "800 46px Inter", "800 150px Inter", "800 34px Inter", "800 30px Inter", "800 28px Inter", "italic 500 120px 'EB Garamond'", "italic 500 70px 'EB Garamond'", "italic 500 66px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, 'Rate my *date idea:*', { top: 180, size: 84, accentSize: 120, at: -1, gap: 0.0, accentColor: cfg.accent || HERO.color, fit: true })
    const pitch = buildPitch(root, { text: cfg.idea, deep: cfg.deep || RED })
    const stickers = CH.map((c, i) => buildSticker(root, { tag: c.tag || (i === 3 ? 'BUT…' : c.title), text: c.caption, deep: cfg.deep || RED, badge: i === 3 ? PINK : i === 0 ? (cfg.badge || HERO.color) : GOLD, at: T.chapters[i][0] + 0.5, out: [T.chapters[i][1] - 0.2, T.chapters[i][1]], tilt: i % 2 ? 1.6 : -1.8 }))
    const stamp = buildStamp(root, { score: cfg.score, word: cfg.word, ink: cfg.stampInk || RED, out: OUT })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.starsLine - 0.22, close: T.boxClose, cps: 30 })
    buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function speech(t, P) {
      if (P.ph !== 'ch') return
      for (const [u0, u1, text, o] of CH[P.i].bubbles || []) {
        tx.font = `800 40px ${INTER}`
        bubble(tx, t, clamp(o?.x ?? 540, 200, 880), o?.y ?? 760, P.t0 + u0, P.t0 + u1, text, { size: 40, tail: o?.tail ?? 0, maxW: 640 })
      }
    }
    function pisCorner(t, P) {
      if (heroIsPis || P.ph !== 'ch') return
      const pc = { x: 940, y: 1250, s: 150, tears: Math.min(3, 1 + Math.floor(P.i / 2)), ...(CH[P.i].pis || {}) }
      if (pc.hidden) return
      const k = pop01(t, P.t0 + 0.4, 0.3, 2) * outK(t, [P.t1 - 0.15, P.t1])
      if (k <= 0.01) return
      tissues(x, pc.x - pc.s * 0.72, pc.y + pc.s * 0.25, pc.s * 0.5 * Math.min(1, k))
      pisces(x, t, { ...pc, pop: k, mood: pc.mood || (P.i === 3 ? 'wide' : 'sparkle'), look: pc.look || [-1, -0.6], hops: [P.t0 + 0.7, P.t0 + 5.2] })
    }
    function rating(t) {
      if (t < T.stamp) return
      const ok = cfg.loop ? popOut(t, [T.loop[0] - 0.25, T.loop[0]]) : 1
      if (ok <= 0) return
      const S = { hero, date, pisces, ok, t0: T.rating }
      if (cfg.epilogue) cfg.epilogue(x, t, S)
      if (cfg.finale) cfg.finale(x, t, S)
      else {
        shadow(x, 400, 1170, 220 * ok); shadow(x, 690, 1180, 200 * ok)
        hero(x, t, { x: 400, y: 990, s: 250, pop: ok, mood: t > T.stamp + 0.15 ? 'happy' : 'wide', look: [1, 0], hops: [T.stamp + 0.04, T.stamp + 0.5, T.epi + 0.2], tears: heroIsPis ? 3 : 0 })
        date(x, t, { x: 690, y: 1000, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.epi + 0.3] })
      }
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok * outK(t, [T.last - 0.3, T.last])
      if (sk > 0.01) drawStarChar(x, 190, 1300, 170, t, { color: STAR.sky, mood: t > T.starsLine + 1.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      if (!heroIsPis) {
        const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
        if (pk > 0.01) {
          pisces(x, t, { x: 900, y: 1300, s: 160, pop: pk, tears: t > T.pisScore ? 3 : 2, look: [-1, -1], hops: [T.pisIn + 0.3, T.pisScore + 0.02, T.pisScore + 0.6, T.last + 0.2] })
          const ck = pop01(t, T.pisScore, 0.3, 2.6) * ok
          if (ck > 0.01) {
            x.save(); x.translate(904, 1110 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
            box(x, -82, -50, 164, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70)
            x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText(cfg.pisScore || (cfg.score === '10/10' ? '11/10' : '10/10'), 0, 4)
            x.restore()
          }
        }
      }
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const P = phaseAt(t)
        drawSky(x, t, { ...SKY_H, ...(cfg.sky || {}) })
        const dS = t - T.stamp, shake = dS > 0 && dS < 0.45 ? 18 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        let lastCut = -9
        for (const c of CUTS) if (t >= c && c > lastCut) lastCut = c
        const punch = 1 + 0.07 * (1 - ease.outCubic(clamp((t - lastCut) / 0.28))) + (P.ph === 'ch' ? 0.03 * prog(P.u, 0, 10) : 0)
        x.save(); x.translate(540, 960 + shake); x.scale(punch, punch); x.translate(-540, -960)
        const S = { u: P.u, t0: P.t0, t1: P.t1, i: P.i, hero, date, pisces, HERO, DATE }
        if (P.ph === 'hook') cfg.hook(x, t, S)
        else if (P.ph === 'ch') CH[P.i].draw(x, t, S)
        else { if (cfg.ratingBg) cfg.ratingBg(x, t, S); rating(t) }
        pisCorner(t, P)
        x.restore()
        drawBar(x, t, BUG_PINK)
        tx.clearRect(0, 0, 1080, 1920)
        speech(t, P)
        if (P.ph === 'ch' && CH[P.i].over) CH[P.i].over(tx, t, S)
        if (cfg.over) cfg.over(tx, t, P)
        tx.save(); tx.translate(0, shake); drawStampTool(tx, t, cfg.stampInk || RED); tx.restore()
        sparkles(tx, t, 540, 480, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
        const hOut = outK(t, T.h0Out)
        H0.update(t, hOut); pitch.update(t, hOut)
        stickers.forEach(s => s.update(t))
        stamp.update(t)
        box1.update(t)
        let fl = 0
        for (const c of CUTS) if (t >= c && t < c + 0.1) fl = Math.max(fl, 1 - (t - c) / 0.1)
        if (t >= T.stamp && t < T.stamp + 0.1) fl = Math.max(fl, 0.6 * (1 - (t - T.stamp) / 0.1))
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const WHIP = { at: -0.2, len: 0.5, from: 1.5, blur: 10 }
  const REC = { at: T.rec[0], len: T.rec[1] - T.rec[0], caption: cfg.promise || 'wait for *the rating.*', sub: cfg.recSub || 'is this a good idea? let’s find out', top: 1480 }
  const CHAPS = CH.map((c, i) => ({ at: T.chapters[i][0] + 0.05, out: [T.chapters[i][0] + 3.0, T.chapters[i][0] + 3.15], n: i + 1, title: c.title, y: 170 }))
  const LAST = { at: T.last, text: cfg.last, top: 220, size: 100, accentColor: cfg.accent || HERO.color, ...(cfg.loop ? { out: [T.loop[0] - 0.2, T.loop[0]] } : {}) }
  const RECS = (cfg.recs || []).map(r => ({ len: 1.4, top: 1480, ...r }))
  const MAIN = frozen(build, [REC, ...RECS])
  const FX = cfg.fx || []
  const SCENES = [MAIN, whipZoom(WHIP), recordScratch(REC), ...RECS.map(recordScratch), ...FX.map(f => f.scene), ...CHAPS.map(chapter), slamTitle(LAST),
    ...(cfg.loop ? [loopBack([MAIN, whipZoom(WHIP)], { duration: DURATION })] : [])]

  const CUES = [
    ['pop', 0.02, 987.77, 0.04, 0], ['pluck', 0.1, 1567.98, 0.03, 0.4, 0.2], ['glitter', 0.05, 0.4],
    ...(cfg.hookCues || []),
    ...CUTS.map(c => ['whoosh', r3(c - 0.06), 0.26, 0.03]),
    ...CH.flatMap((c, i) => {
      const a = T.chapters[i][0], st = a + 0.5
      return [['pop', r3(st), 1174.66, 0.04, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ...(c.bubbles || []).map(b => ['pop', r3(a + b[0]), 880, 0.03, 0.2]),
        ...(c.cues || []).map(q => [q[0], r3(q[1] + a), ...q.slice(2)])]
    }),
    ['whoosh', T.stampDrop[0], 0.32, 0.04], ['boom', T.stamp, 0.32], ['tom', T.stamp, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.stamp, 0.08],
    ['bell', r3(T.stamp + 0.08), 1760, 0.03, 1.2, 0], ['glitter', r3(T.stamp + 0.05), r3(T.stamp + 0.55)],
    ...(heroIsPis ? [] : [['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4], ['pop', T.pisScore, 1318.51, 0.045, 0.4], ['glitter', T.pisScore, r3(T.pisScore + 0.3)]]),
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4],
    ...talkCues(LINES, { cps: 30 }),
    ...(cfg.extraCues || []),
    ...whipZoomCues(WHIP), ...recordScratchCues(REC), ...RECS.flatMap(recordScratchCues), ...CHAPS.flatMap(chapterCues), ...slamTitleCues(LAST), ...FX.flatMap(f => f.cues || []),
    ...(cfg.loop ? loopCues({ duration: DURATION }) : []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  return { DURATION, SCENES, CUES, T }
}
