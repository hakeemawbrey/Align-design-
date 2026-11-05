// sidekit — the episode engine for "Moonlight Lane: Side Stories" (Month 2 boost, batch m48: kxmle01–kxmle06, 90 s).
// Rows: promo/films/month2/m48.md. Lives in the first episode's folder; the others import it read-only:
//   import { makeSide, … } from '../../kxmle01/scenes/sidekit.js'
// It plays the Moonlight Lane show (mlpilot/scenes/mlkit.js + nml2e01/scenes/winter.js, read-only) on the Month 2 rules:
//   · NO end card, NO card frame, NO card transition, no logo, no CTA, never the word "Align". DURATION = the story.
//   · HARD CUT: the last caption lands and holds ~0.9 s; the last frame is a story frame.
//   · FRAME 0 (hookkit.js, read-only): the lead mid-chaos (cfg.scenes[0]), mid whip zoom, the hook line slammed on screen;
//     a shake at 0.25; at cfg.rec.at a record scratch + freeze frame ("yep. that's <sign>.") with a caught circle.
//   · A promise sticker ("WAIT FOR …") and chapter stickers (cfg.chapters), THE STARS ADVISE as chapter 3, the LESSON chip.
//   · The bug: "MOONLIGHT LANE · SIDE STORIES" (Inter 800 small caps, letter-spaced), no episode or season number.
//
//   makeSide(cfg) → { DURATION, SCENES, CUES, MUSIC, CHECK }
//   cfg = { id, duration = 90, music: { style, key, seed, hits }, lastAt (when the last caption lands: the outro),
//           hook: { text, top }, rec: { at, len, caption, sub }, caught: { x, y, r, label, arrow }, promise: 'wait for …',
//           chapters: [{ at, title, y? }], scenes: [[t0, fn(x, t)]…] (canvas draws; each runs until the next t0),
//           boxes: [[lines, open, close]…] with lines { t, who: 'gemini', text } (who: a sign or 'stars'),
//           caps: [buildCaption opts…], advise: { at, out, cards, lines }, lesson: { at, out, text, chip },
//           fx: [[factory, opts, cuesFn]…] (any other hookkit effect, on top), cues: [extra sound cues] }
// Helpers for the scenes: lane(), cafe(), apt(), star() (= winter.js actor), cry() (tears on any star), phone(), sticker().
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, MONO, INTER, SERIF, r3, pop01, outK, bump, loadFonts, mixHex,
  drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  buildCaption, captionCues, buildAdvise, adviseCues, drawBubble, drawPhone, drawPastry, sparkles, starFrame, inSprite, tearsCells,
} from '../../mlpilot/scenes/mlkit.js'
import { snowfall, laneSnow, windowSnow, actor, key, drawMug, drawTalkCard, drawBlanket } from '../../nml2e01/scenes/winter.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, caught, caughtCues, screenShake, shakeCues,
  slamTitle, slamTitleCues, chapter, chapterCues,
} from '../../hookkit.js'

export { ML_GOLD, BONE, INK, PINK, MONO, INTER, SERIF, r3, pop01, outK, bump, mixHex, LANE, standY, drawSign, drawPisces, CAFE, APT,
  drawCafeTable, drawBubble, drawPastry, sparkles, drawMug, drawTalkCard, drawBlanket, key, snowfall, clamp, lerp, prog, ease, signStar }

export const CPS = 28
const PITCH = { aries: 784, taurus: 523.25, gemini: 1046.5, cancer: 880, leo: 932, virgo: 987.77, libra: 830.61, scorpio: 587.33,
  sagittarius: 659.25, capricorn: 493.88, aquarius: 698.46, pisces: 1174.66, stars: 440 }
/** a speaker's box label + colour */
export function who(sign) {
  if (sign === 'stars') return { speaker: 'THE STARS', color: ML_GOLD }
  const S = signStar(sign)
  return { speaker: `${S.glyph}︎ ${sign.toUpperCase()}`, color: mixHex(S.color, '#ffffff', 0.35) }
}
export const lines = arr => arr.map(L => ({ t: L.t, text: L.text, ...who(L.who) }))
/** talk hops for a sign over every box line */
export const hopsOf = (all, sign) => talkHops(all, who(sign).speaker, { cps: CPS })

// ── scene helpers (all canvas, pure f(t))
/** the lane with snow; fg(c) draws in WORLD coordinates. opts = drawLane opts + { depth, snow, flakes } */
export function lane(x, t, opts = {}, fg = null) {
  const { depth = 0.6, flakes = 110, snow = true, seed = 3, ...o } = opts
  const r = drawLane(x, t, { time: 'night', ...o }, c => { if (snow) laneSnow(c, t, { depth }); if (fg) fg(c) })
  if (snow && flakes) snowfall(x, t, { n: flakes, seed })
  return r
}
export function cafe(x, t, opts = {}) {
  const { snow = 0.6, ...o } = opts
  drawCafe(x, t, { lights: 1, ...o })
  if (snow) windowSnow(x, t, [CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h], { depth: snow, seed: 9, n: 40 })
}
export function apt(x, t, opts = {}) {
  const { snow = 0.6, ...o } = opts
  drawApartment(x, t, { lamp: 1, ...o })
  if (snow) windowSnow(x, t, [APT.window.x, APT.window.y, APT.window.w, APT.window.h], { depth: snow, seed: 8, n: 36 })
}
/** a keyframed star (winter.js actor): { sign, size, x, y, moods, hops, walk, wear, … } */
export const star = (c, t, spec) => actor(c, t, spec)
/** tears on ANY star (k: 1 sniffle · 2 streams · 3 fountains), same sprite grid as Pisces' */
export function cry(c, x, y, size, t, k, opts = {}) {
  if (k <= 0) return
  const F = starFrame(x, y, size, t, opts)
  inSprite(c, F, () => tearsCells(c, t, k))
}
/** Pisces, crying (k tears), standing with feet at fy */
export const pisces = (c, x, fy, size, t, o = {}) => drawPisces(c, x, standY(size, fy), size, t, { tears: 2, ...o })
export function phone(x, cx, cy, w, h, t, o) { drawPhone(x, cx, cy, w, h, t, o) }
/** a paper sticker / sign: text centred at (cx, cy), tilted */
export function sticker(x, cx, cy, text, { size = 34, bg = '#fff4dc', fg = INK, rot = -0.04, k = 1, pad = 22, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const ls = String(text).split('|').map(s => s.trim()), w = Math.max(...ls.map(s => x.measureText(s).width)) + pad * 2, h = ls.length * size * 1.18 + pad * 1.3
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'
  ls.forEach((s, i) => x.fillText(s, 0, (i - (ls.length - 1) / 2) * size * 1.18 + 2))
  x.restore()
}
/** a pixel tear drop falling from y0 at t0 (Pisces upstairs) */
export function drip(x, X, y0, y1, t, t0, len = 0.7) {
  const p = prog(t, t0, t0 + len); if (p <= 0 || p >= 1) return
  const y = lerp(y0, y1, p * p)
  x.fillStyle = INK; x.fillRect(X - 9, y - 9, 18, 26); x.fillStyle = '#8fe3ff'; x.fillRect(X - 6, y - 6, 12, 20); x.fillStyle = '#fff'; x.fillRect(X - 6, y - 6, 5, 5)
}

// ── the bug + the promise sticker (DOM)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: '1',
    textShadow: '0 2px 10px rgba(6,4,18,0.9), 0 0 18px rgba(255,207,110,0.35)' }, root)
  el('span', { fontFamily: INTER, fontWeight: '800', letterSpacing: '0.22em', color: ML_GOLD, fontVariantCaps: 'all-small-caps', fontSize: '40px' }, b, 'Moonlight Lane')
  el('span', { fontFamily: INTER, fontWeight: '800', fontSize: '25px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.62)' }, b, ' · SIDE STORIES')
  return b
}
function buildPromise(root, { at, out, text }) {
  const w = el('div', { position: 'absolute', right: '56px', top: '560px', display: 'none', pointerEvents: 'none', transformOrigin: '100% 50%' }, root)
  const p = el('div', { padding: '14px 26px 12px', font: `800 34px ${INTER}`, letterSpacing: '0.08em', color: INK, background: ML_GOLD, borderRadius: '14px',
    boxShadow: `0 0 0 5px ${INK}, 0 12px 26px rgba(4,2,14,0.6)`, textTransform: 'uppercase', whiteSpace: 'nowrap' }, w)
  p.innerHTML = '▶ ' + String(text).replace(/\*([^*]+)\*/g, `<span style="font-family:${SERIF};font-style:italic;font-weight:600;text-transform:none;font-size:44px;color:#7a1f4a">$1</span>`)
  return {
    update(t) {
      const k = pop01(t, at, 0.34, 2.4) * outK(t, out)
      w.style.display = t >= at && k > 0.01 ? 'block' : 'none'
      const wob = Math.sin((t - at) * 5) * 0.012
      w.style.transform = `rotate(${(-0.05 + wob).toFixed(3)}rad) scale(${clamp(k, 0, 2).toFixed(3)})`
    },
  }
}

export function makeSide(cfg) {
  const DURATION = cfg.duration ?? 90
  const ALL = cfg.boxes.flatMap(b => b[0])
  const HOOK = { at: -1, top: 250, size: 112, out: [3.3, 3.55], ...cfg.hook }
  const WHIP = { at: -0.16, len: 0.5, from: 1.55, blur: 12, ...cfg.whip }
  const SHAKE = { at: 0.22, len: 0.45, amp: 24 }
  const REC = { at: 0.75, len: 1.45, top: 1520, ...cfg.rec }
  const CAUGHT = { arrow: 'bl', ...cfg.caught, at: REC.at + 0.15, out: [REC.at + REC.len - 0.05, REC.at + REC.len + 0.1] }
  const PROMISE = { at: 3.25, out: [7.8, 8.05], text: cfg.promise }
  const CH = cfg.chapters.map((c, i, a) => ({ n: i + 1, x: 70, y: 130, ...c, out: c.out || [c.at + 3.0, c.at + 3.2] }))
  const scenes = [...cfg.scenes].sort((a, b) => a[0] - b[0])
  const adv = cfg.advise

  async function build(stage) {
    await loadFonts(["700 26px 'Space Mono'", "700 22px 'Space Mono'", '700 30px Inter', "italic 600 40px 'EB Garamond'", "italic 600 44px 'EB Garamond'"])
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const caps = cfg.caps.map(c => buildCaption(root, { size: 92, top: 300, ...c }))
    const boxes = cfg.boxes.map(([ls, open, close]) => dialogueBox(root, { lines: ls, y: 1480, width: 960, height: 250, open, close, cps: CPS }))
    const advise = buildAdvise(root, adv)
    const lesson = buildLesson(root, { ...cfg.lesson, accentColor: ML_GOLD, dim: 0.6 })
    const promise = buildPromise(root, PROMISE)
    buildBug(root)
    const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const inAdv = t >= adv.at + 0.7 && t < adv.out[0]
        if (inAdv) drawSky(x, t, SKY_H)
        else {
          let fn = scenes[0][1]
          for (const [t0, f] of scenes) if (t >= t0) fn = f
          x.save(); fn(x, t); x.restore()
        }
        for (const c of caps) c.update(t)
        for (const b of boxes) b.update(t)
        advise.update(t)
        lesson.update(t)
        promise.update(t)
        drawGrain(gx, t)
      },
    }
  }

  const fx = cfg.fx || []
  const SCENES = [
    frozen(build, [REC]),
    whipZoom(WHIP), screenShake(SHAKE), recordScratch(REC), caught(CAUGHT),
    ...fx.map(([f, o]) => f(o)),
    ...CH.map(c => chapter(c)),
    slamTitle(HOOK),
  ]
  const CUES = [
    ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...caughtCues(CAUGHT),
    ['pop', PROMISE.at, 1318.51, 0.045, 0.3], ['tick', r3(PROMISE.at + 0.05), 0.04],
    ...CH.flatMap(c => chapterCues(c)),
    ...fx.flatMap(([, o, cf]) => (cf ? cf(o) : [])),
    ...cfg.caps.flatMap(c => captionCues({ size: 92, top: 300, ...c })),
    ...adviseCues(adv),
    ...lessonCues(cfg.lesson.at, { ...cfg.lesson, key: cfg.music.key }),
    ...talkCues(ALL, { cps: CPS, pitch: Object.fromEntries(Object.entries(PITCH).map(([s, f]) => [who(s).speaker, f])) }),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  const MUSIC = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed,
    sections: { drop: REC.at + REC.len, breakdown: [adv.at], lift: [adv.out[1]], outroAt: cfg.lastAt }, hits: cfg.music.hits || [] }
  const CHECK = Object.fromEntries([...cfg.boxes.map(([l, , c], i) => ['box' + i, [l, c]]), ['advise', [adv.lines, adv.out[0]]], ['lesson', cfg.lesson]])
  return { DURATION, SCENES, CUES, MUSIC, CHECK, ALL }
}
