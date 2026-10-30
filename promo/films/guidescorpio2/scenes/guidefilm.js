// guidefilm.js — the frame of one "Your Star Guide" film (Star Talk, promo/films/STARTALK13.md). A copy lives in each
// guide<sign><n> folder this session built (Libra, Scorpio, Sagittarius, air) so every film stands alone. It builds on the
// shared kit stguide.js (hook, note chip, lantern, fact chip, chime) and on startalk/cardfx/endcard/sky; it edits none.
//
//   guideFilm(S) → { DURATION, SCENES, CUES, STORY_END }
//   S = {
//     duration, speaker ('♎ YOUR STAR'), color (the guide's sign colour), accent (lighter, for box accents),
//     chip { sign, glyph, n, of }            the gold STAR GUIDE header chip (stguide noteChip), on screen from t = 0
//     hook { text, out }                      the frame-0 headline (stguide guideHook)
//     lines [{ t, text }], open, close, cps   the RPG box, in the guide's voice
//     fact { text, at, dur, x, y }            the ★ ASTROLOGY SAYS chip (stguide factChip)
//     heads [{ text, at, out: [a, b], top, size, accentSize, accentColor, late, lateAt }]   big Inter lines (the last line)
//     guide(t) → { x, y, size, mood, look, squash, pop, alpha, side: 1 | -1, lantern: 0…1, flame, lanternGlow }   the hero
//     drawBack(x, t, K), drawMid(x, t, K), drawFront(x, t, K)   the film's canvas layers (behind / just behind / in front of the guide)
//     cuts, cues
//   }
//   K = { drawBits, sparkles, burst, bubble, talkCard, guide, star(opts), lantern(x, y, size, t, glow), pop01, popOut, outK, root, W, HOPS }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawLantern, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, drawBits, drawBurst, sparkles, wordPops,
  pop01, outK, popOut, W, GOLD, BONE, PINK, INK, LAV, INTER, MONO, SERIF, GLYPH } from '../../stguide.js'
export { drawBits, drawBurst, sparkles, wordPops, pop01, outK, popOut, W, GOLD, BONE, PINK, INK, LAV, INTER, MONO, SERIF, GLYPH }
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, left = 60, width = W - 120, color = BONE }) {
  const box = el('div', { position: 'absolute', left: left + 'px', width: width + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.includes('*')
    const style = { display: 'inline-block', margin: '0 0.11em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.12) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}




function wrap(x, text, maxW) {
  const out = []
  for (const para of text.split('\n')) {
    let line = ''
    for (const w of para.split(' ')) { const tryL = line ? line + ' ' + w : w; if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL }
    out.push(line)
  }
  return out
}

/** a little Align talk card on the canvas. flip 0 = face up, 1 = back. */
export function drawTalkCard(x, cx, cy, w, { rot = 0, flip = 0, kicker = 'TALK CARD', text = '', color = GOLD, alpha = 1, scale = 1, foot = '' } = {}) {
  if (alpha <= 0 || scale <= 0) return
  const h = w * 1.42, r = w * 0.08
  const sx = Math.cos(Math.PI * clamp(flip))
  const back = flip > 0.5
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale * Math.max(0.02, Math.abs(sx)), scale)
  x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  const rr = () => { x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r) }
  rr(); x.fillStyle = back ? '#241653' : '#f5eedf'; x.fill()
  x.shadowColor = 'transparent'
  x.lineWidth = w * 0.022; x.strokeStyle = back ? GOLD : color; rr(); x.stroke()
  if (back) {
    x.strokeStyle = 'rgba(242,199,92,0.85)'; x.lineWidth = w * 0.012
    const R = w * 0.16
    for (let i = 0; i < 7; i++) { const a = i * Math.PI / 3; const ox = i === 6 ? 0 : Math.cos(a) * R, oy = i === 6 ? 0 : Math.sin(a) * R; x.beginPath(); x.arc(ox, oy - h * 0.04, R, 0, Math.PI * 2); x.stroke() }
    if (text) { x.fillStyle = BONE; x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, h * 0.34) }
  } else {
    x.fillStyle = color; x.font = `700 ${Math.round(w * 0.07)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'top'
    x.fillText(kicker, 0, -h / 2 + w * 0.1)
    x.fillStyle = INK; x.font = `italic 500 ${Math.round(w * 0.135)}px ${SERIF}`; x.textBaseline = 'middle'
    const ls = wrap(x, text, w * 0.82), lh = w * 0.15
    ls.forEach((l, i) => x.fillText(l, 0, (i - (ls.length - 1) / 2) * lh + h * 0.02))
    if (foot) { x.fillStyle = '#7a6aa8'; x.font = `700 ${Math.round(w * 0.058)}px ${MONO}`; x.textBaseline = 'bottom'; x.fillText(foot, 0, h / 2 - w * 0.09) }
  }
  x.restore()
}

/** pixel speech bubble on the canvas (bone, ink outline, stepped tail toward (tx, ty)) */
export function drawBubble(x, cx, cy, text, { size = 44, pad = 26, k = 1, color = INK, font = INTER, weight = 800, tail = 'down' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const tw = x.measureText(text).width, w = Math.round(tw + pad * 2), h = Math.round(size + pad * 1.4)
  const px = 6
  const slab = (i, col) => {
    x.fillStyle = col
    x.fillRect(-w / 2 + i + px, -h / 2 + i, w - 2 * i - 2 * px, h - 2 * i)
    x.fillRect(-w / 2 + i, -h / 2 + i + px, w - 2 * i, h - 2 * i - 2 * px)
  }
  slab(-px, INK); slab(0, '#f5eedf')
  x.fillStyle = INK
  const sgn = tail === 'down' ? 1 : -1
  for (let s = 0; s < 4; s++) x.fillRect(-18 + s * px * 0.5, sgn * (h / 2 + s * px) - (sgn < 0 ? px : 0), (5 - s) * px, px)
  x.fillStyle = '#f5eedf'
  for (let s = 0; s < 3; s++) x.fillRect(-12 + s * px * 0.5, sgn * (h / 2 - px + s * px) - (sgn < 0 ? px : 0), (3 - s) * px, px)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

export function guideFilm(S) {
  const DURATION = S.duration, STORY_END = DURATION - ENDCARD_LEN
  const CPS = S.cps || 30
  const LINES = S.lines.map(l => ({ speaker: S.speaker, color: S.accent || S.color, ...l }))
  const HOPS = talkHops(LINES, S.speaker, { cps: CPS }).filter(h => h > LINES[0].t + 0.25)

  async function build(stage) {
    await loadGuideFonts()
    try { await Promise.all(["800 112px Inter", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')

    const star = (o) => drawStarChar(x, o.x, o.y, o.size, o.t, { hops: HOPS, ...o })
    const lantern = (lx, ly, size, t, glow = 1) => drawLantern(x, lx, ly, size, t, { glow })
    const K = { drawBits: (...a) => drawBits(x, ...a), sparkles: (...a) => sparkles(x, ...a), burst: (...a) => drawBurst(x, ...a), guide: (...a) => drawGuide(x, ...a), bubble: (...a) => drawBubble(x, ...a), talkCard: (...a) => drawTalkCard(x, ...a), pop01, popOut, outK, star, lantern, root, W, HOPS }

    const hook = guideHook(root, { accentColor: S.color, ...S.hook, at: 0 })
    const chip = noteChip(root, { ...S.chip, at: 0, out: S.chip.out ?? [STORY_END - 0.45, STORY_END - 0.15] })
    const heads = (S.heads || []).map(H => [popText(root, H.text, { wobble: true, gap: 0.08, ...H }), H.out])
    const box = dialogueBox(root, { lines: LINES, y: S.boxY || 1470, width: 960, height: S.boxH || 260, open: S.open, close: S.close, cps: CPS })
    const extra = S.dom ? S.dom(root) : null
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function guideNow(t) {
      const g = S.guide(t)
      if (!g || g.hidden) return null
      const pop = g.pop ?? 1
      if (pop <= 0.01) return null
      return drawGuide(x, g.x, g.y, g.size, t, { color: S.color, glyph: S.glyph, hops: HOPS, seed: 3, glow: 1.1, ...g, pop },
        { lantern: g.lantern ?? 1, side: g.side ?? 1, glow: g.lanternGlow ?? 1, flame: g.flame ?? 1, lanternSize: g.lanternSize })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.85, ...(S.sky ? S.sky(t) : {}) })
        if (S.drawBack) S.drawBack(x, t, K)
        if (S.drawMid) S.drawMid(x, t, K)
        const r = guideNow(t)
        if (S.drawFront) S.drawFront(x, t, K, r)
        if (S.fact) factChip(x, t, S.fact)
        hook.update(t)
        chip.update(t)
        if (extra) extra.update(t)
        box.update(t)
        for (const [h, o] of heads) h.update(t, outK(t, o))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = S.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
  const headCues = (S.heads || []).flatMap(H => {
    const n = H.text.split(' ').filter(w => w !== '|').length - (H.late || 0)
    return [...wordPops(H.at, n, H.gap || 0.08, 2, 0.026), ...(H.late ? [['pop', H.lateAt, 1318.51, 0.05, 0], ['pluck', H.lateAt, 1174.66, 0.045, 0.6, 0], ['bell', H.lateAt + 0.3, 1760, 0.02, 1.0, 0]] : [])]
  })
  const open = S.open ?? LINES[0].t - 0.22
  const CUES = [
    ...guideCues(0.02),
    ['pop', open, 739.99, 0.04, 0], ['pop', open + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...(S.close ? [['pop', S.close, 880, 0.03, 0], ['pop', S.close + 0.07, 587.33, 0.03, 0]] : []),
    ...(S.fact ? [['pop', S.fact.at, 987.77, 0.035, 0], ['bell', S.fact.at + 0.05, 1760, 0.018, 1.0, 0.2]] : []),
    ...headCues,
    ...(S.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, STORY_END, LINES, CPS }
}
