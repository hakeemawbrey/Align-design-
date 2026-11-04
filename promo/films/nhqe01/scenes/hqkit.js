// HOLIDAYS THEN VS NOW (quick cuts): the shared look of the eighteen star_advice trial reels nhqe01–nhqe18
// (promo/films/next30/b48.md). Lives in nhqe01; the other films import it from here. Drawing helpers come from the
// Pisces Cries kit (../../npce01/scenes/criekit.js).
//
// The format (13 s, story 0–10.6, then the short 2.4 s end card; no card-back cut):
//   0.00–2.30   hook (frame 0 = thumbnail): the caption "<who> <what>: | then vs now" over a split screen — THEN on top
//               (desaturated, warm, scanlines, a THEN tag), NOW below (clean, a NOW tag), both scenes mid-action.
//   2.30–5.00   THEN full screen (white flash + zoom punch), sticker "then: …".
//   5.00        a white flash + zoom punch into NOW (no card transition).
//   5.00–7.70   NOW full screen, sticker "now: …".
//   7.70–10.60  NOW keeps playing; THE STARS pop in bottom-right and say the last line (box 7.85 → 10.2).
// Pisces cries in every film: a small Pisces in the corner sniffles through THEN and happy-cries through NOW
// (cfg.noPis when Pisces is in the scene already).
//
//   makeHQ(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hook ('*Aries* in December: | then vs now'), cfg.accent, cfg.deep
//     cfg.then(x, t, S), cfg.now(x, t, S): draw a full 1080×1920 frame's content (keep it in y 430–1300).
//         S = { u (s since the shot started), split (true in the hook panels), star(x, t, sign, o), pis(x, t, o) }
//     cfg.thenCap / cfg.nowCap: sticker texts with one *accent*;  cfg.last: THE STARS' line;  cfg.cues: extra (absolute)
//     cfg.pisThen / cfg.pisNow: { x, y, s } for the corner Pisces;  cfg.noPis
import { el, clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { pop01, outK, popOut, starFrame, inSprite, tearsCells, sparkles, r3, R, box, INK, BONE, GOLD, PINK, INTER, SERIF, MONO, TEAR } from '../../npce01/scenes/criekit.js'
export * from '../../npce01/scenes/criekit.js'

export const DURATION = 13
export const STORY_END = DURATION - ENDCARD_SHORT_LEN         // 10.6
export const T = {
  h0: -2, h0Out: [2.1, 2.3],
  then: [2.3, 5.0], now: [5.0, 10.6], cut: 5.0,
  thenCap: 2.55, nowCap: 5.3, capOut: [[4.8, 5.0], [7.5, 7.7]],
  starsIn: 7.72, last: 7.9, boxClose: 10.15,
  out: [10.15, 10.55], bugOut: [10.2, 10.55],
}
const CPS = 30
const THEN_COL = '#e8b46b', NOW_COL = '#7fe0c0'

function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: THEN_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(232,180,107,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: THEN_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'HOLIDAYS<span style="color:rgba(255,255,255,0.6)">&nbsp;THEN&nbsp;VS&nbsp;NOW</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}
function buildSticker(root, { text, badge, deep, at, out, tilt, tag }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 rgba(6,4,18,0.7)` }, wrap)
  el('div', { flex: '0 0 auto', padding: '10px 16px', borderRadius: '10px', background: badge, border: `5px solid ${INK}`, font: `800 30px ${INTER}`, letterSpacing: '0.08em', color: INK }, st, tag)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 62px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 48px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
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
/** the old-footage look over a region: desaturate, warm it, scanlines */
function oldLook(x, X, Y, w, h, t) {
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  x.globalCompositeOperation = 'saturation'; x.fillStyle = 'rgba(128,128,128,0.75)'; x.fillRect(X, Y, w, h)
  x.globalCompositeOperation = 'multiply'; x.fillStyle = '#f0c890'; x.fillRect(X, Y, w, h)
  x.globalCompositeOperation = 'source-over'
  for (let yy = Y; yy < Y + h; yy += 8) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(X, yy, w, 3) }
  const jy = (t * 220) % h; x.fillStyle = 'rgba(255,240,210,0.08)'; x.fillRect(X, Y + jy, w, 26)
  x.restore()
}
function tag(x, text, X, Y, col, t, rec = false) {
  x.save(); x.font = `800 34px ${INTER}`; const w = x.measureText(text).width + (rec ? 74 : 40)
  box(x, X, Y, w, 56, col, { b: 5 })
  if (rec && Math.floor(t * 2) % 2 === 0) { x.fillStyle = '#e8344e'; x.beginPath(); x.arc(X + 28, Y + 28, 11, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, X + (rec ? 52 : 20), Y + 30)
  x.restore()
}

export function makeHQ(cfg) {
  const PIS = signStar('pisces')
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const star = (x, t, sign, o = {}) => { const S = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: o.s >= 150 ? S.glyph : null, seed: o.seed ?? 4, glow: 1, ...o }) }
  const pis = (x, t, o = {}) => {
    const opts = { color: PIS.color, glyph: o.s >= 150 ? PIS.glyph : null, mood: o.mood || 'sparkle', look: o.look, seed: 6, glow: 0.9, pop: o.pop ?? 1, hops: o.hops, alpha: o.alpha ?? 1 }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return F
  }
  const PT = { x: 950, y: 1210, s: 120, ...(cfg.pisThen || {}) }, PN = { x: 950, y: 1210, s: 130, ...(cfg.pisNow || {}) }
  const cornerPis = (x, t, now, k = 1) => {
    if (cfg.noPis || k <= 0.01) return
    const P = now ? PN : PT
    pis(x, t, { ...P, pop: k, mood: now ? 'happy' : 'neutral', look: [-1, 0.4], tears: now ? 3 : 2, hops: now ? [5.3, 6.4, 7.0] : [2.6, 3.8] })
  }

  async function build(stage) {
    try {
      await Promise.all(["800 72px Inter", "800 48px Inter", "800 34px Inter", "800 28px Inter", "italic 500 100px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 150, size: 70, accentSize: 100, at: T.h0, gap: 0.05, accentColor: cfg.accent || THEN_COL, fit: true })
    const s1 = buildSticker(root, { text: cfg.thenCap, badge: THEN_COL, deep: cfg.deep || '#9a5a1a', at: T.thenCap, out: T.capOut[0], tilt: -1.8, tag: 'THEN' })
    const s2 = buildSticker(root, { text: cfg.nowCap, badge: NOW_COL, deep: cfg.deepNow || '#1f7a5a', at: T.nowCap, out: T.capOut[1], tilt: 1.6, tag: 'NOW' })
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // a scene into a panel: content region y 420–1320 → panel (X, Y, W, H)
    function panel(t, draw, P, now) {
      const sc = P.h / 900
      x.save(); x.beginPath(); x.rect(P.x, P.y, P.w, P.h); x.clip()
      drawSky(x, t, { ...SKY_H, dim: 0.75 })
      x.translate(540, P.y); x.scale(sc, sc); x.translate(-540, -420)
      draw(x, t, { u: 1.3 + t * 0.6, split: true, star, pis })
      cornerPis(x, t, now)
      x.restore()
      if (!now) oldLook(x, P.x, P.y, P.w, P.h, t)
      x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.strokeRect(P.x, P.y, P.w, P.h); x.strokeStyle = now ? NOW_COL : THEN_COL; x.lineWidth = 4; x.strokeRect(P.x + 7, P.y + 7, P.w - 14, P.h - 14); x.restore()
      tag(x, now ? 'NOW' : 'THEN', P.x + 26, P.y + 24, now ? NOW_COL : THEN_COL, t, !now)
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        if (t < T.then[0]) {
          panel(t, cfg.then, { x: 40, y: 400, w: 1000, h: 700 }, false)
          panel(t, cfg.now, { x: 40, y: 1140, w: 1000, h: 700 }, true)
        } else {
          const now = t >= T.cut, a = now ? T.now[0] : T.then[0]
          const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          ;(now ? cfg.now : cfg.then)(x, t, { u: t - a, split: false, star, pis })
          cornerPis(x, t, now, pop01(t, a + 0.25, 0.3, 2) * (now ? popOut(t, T.out) : outK(t, [T.cut - 0.12, T.cut])))
          x.restore()
          if (!now) { oldLook(x, 0, 0, 1080, 1920, t); tag(x, 'THEN', 56, 130, THEN_COL, t, true) }
          else tag(x, 'NOW', 56, 130, NOW_COL, t)
          // THE STARS
          const sk = pop01(t, T.starsIn, 0.38, 2.1) * popOut(t, T.out)
          if (sk > 0.01) drawStarChar(x, 140, 1330, 150, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
          sparkles(x, t, 140, 1300, T.starsIn + 0.05, 8, 130, 0.3, [GOLD, BONE, PINK])
        }
        H0.update(t, outK(t, T.h0Out))
        s1.update(t); s2.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(...[T.then[0], T.cut].map(c => t >= c && t < c + 0.14 ? 1 - (t - c) / 0.14 : 0))
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br', fadeIn: 0 })]
  const CUES = [
    ['pluck', 0.05, 1174.66, 0.03, 0, 0.4],
    ['whoosh', r3(T.then[0] - 0.08), 0.28, 0.04], ['tick', T.then[0], 0.06], ['boom', T.then[0], 0.18],
    ['pop', T.thenCap, 880, 0.045, -0.1], ['pop', r3(T.thenCap + 0.07), 1174.66, 0.03, 0.1],
    ['pop', T.nowCap, 1174.66, 0.045, 0.1], ['pop', r3(T.nowCap + 0.07), 1567.98, 0.03, -0.1], ['glitter', T.nowCap, r3(T.nowCap + 0.4)],
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, 0.4],
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ['whoosh', r3(T.cut - 0.1), 0.3, 0.035], ['tick', T.cut, 0.06],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
void [R, MONO, TEAR]
