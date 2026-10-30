// guidefilm — the frame every "Your Star Guide" note shares (promo/films/STARTALK13.md), copied into each guide<sign><n>
// folder like kit.js so each film stays self-contained. It lays out: the note chip (top), the frame-0 hook headline,
// your sign's star (sign colour, carrying the gold lantern from stguide.js), the RPG box ("♋ YOUR STAR"), the
// "★ ASTROLOGY SAYS" chip, the last line, the card cut and the shared end card. The film passes its timeline,
// its lines and its gag as draw hooks. Pure f(t); nothing touches `document` at module top level.
import { clamp, prog } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { drawGuide, drawLantern, noteChip, guideHook, factChip, guideCues, loadGuideFonts } from '../../stguide.js'
import { GOLD, BONE, INK, loadFonts, popOut, outK, popText, sparkles, wordPops } from './kit.js'

/**
 * cfg = {
 *   duration, sign ('cancer' | … | null for an element talk), n (note number), color/glyph/speaker (overrides),
 *   chip: { … } extra noteChip opts (element talks), hook: '*Cancer,* your star has a note.',
 *   lines: [{ t, text }], cps, T: { hookOut: [a, b], open, close, fact: [at, dur], last, lastLand, out: [a, b], cut },
 *   fact: 'CANCER: CARDINAL WATER · RULED BY THE MOON', factY, last: 'Care for | *you,* too.', lastTop, lastSize,
 *   hero: { x, y, size } or t => { x, y, size }, mood: t => drawStarChar opts, lantern: (t, r) => { x, y, size, glow } | null,
 *   back(x, t, S), front(x, t, S), dom(root) → { update(t) }, cues: [], music
 * }   S = { r (hero rect), color, ok (star pop), …kit }
 */
export function guideFilm(cfg) {
  const DURATION = cfg.duration
  const STORY_END = DURATION - ENDCARD_LEN
  const sg = cfg.sign ? signStar(cfg.sign) : { color: STAR.sky, glyph: '★' }
  const COLOR = cfg.color || sg.color, GLYPH = cfg.glyph || sg.glyph, ACCENT = cfg.accent || COLOR
  const SPEAK = cfg.speaker || `${GLYPH} YOUR STAR`
  const T = cfg.T, CPS = cfg.cps || 28
  const LINES = cfg.lines.map(L => ({ speaker: SPEAK, color: ACCENT, ...L }))
  const HOPS = [0.25, ...talkHops(LINES, SPEAK, { cps: CPS }), T.lastLand, ...(cfg.hops || [])]
  const heroAt = typeof cfg.hero === 'function' ? cfg.hero : () => cfg.hero

  async function build(stage) {
    await loadFonts(); await loadGuideFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const extra = cfg.dom ? cfg.dom(root) : null
    const CHIP = noteChip(root, { sign: cfg.sign || '', glyph: GLYPH, n: cfg.n, of: 3, at: 0, out: T.chipOut || [T.cut - 0.12, T.cut], ...(cfg.chip || {}) })
    const HOOK = guideHook(root, { text: cfg.hook, at: 0, out: T.hookOut, accentColor: ACCENT, ...(cfg.hookOpts || {}) })
    const box = dialogueBox(root, { lines: LINES, y: cfg.boxY || 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
    const LAST = popText(root, cfg.last, { top: cfg.lastTop ?? 200, size: cfg.lastSize || 124, accentSize: cfg.lastAccent || 180, at: T.last, gap: 0.08, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: ACCENT, lineHeight: 1 })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.7 })
        const ok = popOut(t, T.out)
        const H = heroAt(t)
        const S = { color: COLOR, glyph: GLYPH, ok, H, r: { x: H.x, y: H.y, size: H.size, top: H.y - H.size / 2 } }
        if (cfg.back) cfg.back(x, t, S)
        if (ok > 0) {
          const custom = cfg.lantern ? cfg.lantern(t, H) : null
          const g = cfg.guide ? cfg.guide(t) : {}
          S.r = drawGuide(x, H.x, H.y, H.size, t, { color: COLOR, glyph: GLYPH, mood: 'happy', seed: cfg.seed || 3, glow: 1.1, pop: ok, hops: HOPS, ...(cfg.mood ? cfg.mood(t) : {}) },
            { lantern: cfg.lantern === null || custom ? 0 : (g.lantern ?? 1), side: g.side ?? cfg.side ?? 1, flame: g.flame ?? 1, glow: g.glow ?? 1 })
          if (custom) { const L = drawLantern(x, custom.x, custom.y, custom.size * ok, t, { glow: custom.glow ?? 1, swing: custom.swing || 0 }); S.r.lx = L.x; S.r.ly = L.y }
        }
        if (cfg.front) cfg.front(x, t, S)
        factChip(x, t, { text: cfg.fact, at: T.fact[0], dur: T.fact[1], x: 540, y: cfg.factY || 1340 })
        sparkles(x, drawPixelStar, t, S.r.x, S.r.y, T.lastLand, 12, S.r.size * 0.7, 2, [GOLD, BONE, COLOR])
        if (extra) extra.update(t, S)
        CHIP.update(t)
        HOOK.update(t)
        box.update(t)
        LAST.update(t, outK(t, [T.out[0] + 0.12, T.out[1]]))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = T.cut ? [{ t: T.cut, kind: 'flip' }] : []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
  const CUES = [
    ...guideCues(0.05), ...guideCues(T.lastLand + 0.05, { gain: 0.025 }),
    ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ['pluck', T.fact[0], 1174.66, 0.04, 0.5, 0],
    ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
    ...wordPops(T.last, 3, 0.08, 1, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.05, 0.7, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION, STORY_END, SCENES, CUES, LINES, COLOR, GLYPH }
}

/** a comic speech bubble on the canvas: s = scale (0 hides), tail = 'bl' | 'br' | 'none', thought = dotted tail */
export function bubble(x, cx, cy, s, text, { w, h = 92, tail = 'bl', color = '#3d3170', size = 50, rot = 0.03, thought = false, font } = {}) {
  if (s <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(rot)
  x.font = font || `italic 500 ${size}px 'EB Garamond', serif`
  const W2 = (w || x.measureText(text).width + 70) / 2, H2 = h / 2
  x.fillStyle = INK; x.beginPath(); x.roundRect(-W2 - 8, -H2 - 8, 2 * W2 + 16, 2 * H2 + 16, 24); x.fill()
  x.fillStyle = '#f5eedf'; x.beginPath(); x.roundRect(-W2, -H2, 2 * W2, 2 * H2, 18); x.fill()
  const sx = tail === 'br' ? 1 : -1
  if (thought && tail !== 'none') {
    [[0.45, 22, 16], [0.62, 46, 10]].forEach(([u, dy, rr]) => { x.fillStyle = INK; x.beginPath(); x.arc(sx * W2 * u, H2 + dy, rr + 6, 0, 7); x.fill(); x.fillStyle = '#f5eedf'; x.beginPath(); x.arc(sx * W2 * u, H2 + dy, rr, 0, 7); x.fill() })
  } else if (tail !== 'none') {
    x.fillStyle = INK; x.beginPath(); x.moveTo(sx * (W2 * 0.35 - 6), H2); x.lineTo(sx * (W2 * 0.35 + 62), H2); x.lineTo(sx * (W2 * 0.35 + 70), H2 + 62); x.closePath(); x.fill()
    x.fillStyle = '#f5eedf'; x.beginPath(); x.moveTo(sx * W2 * 0.35, H2 - 8); x.lineTo(sx * (W2 * 0.35 + 50), H2 - 8); x.lineTo(sx * (W2 * 0.35 + 60), H2 + 46); x.closePath(); x.fill()
  }
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

export { clamp, prog }
