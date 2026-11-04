// MAIN CHARACTER MOMENT: the shared look of Trends Vol. 2 episodes nt2e41–nt2e45 (promo/films/next30/b13.md §9).
// The other four films import this file from here.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.20   hook: the bold caption "*Main character moment:* | <moment>." is on screen from frame 0, the hero mid-action.
//   2.20–7.60   THE MOVIE: letterbox bars slide in, warm grade + vignette, slow motion, a serif title card
//               ("LEO · The Winter Arc"), a caption sticker. Strings. Pisces watches from a cinema seat with popcorn.
//   7.30–7.60   the record scratch: freeze, tape stop.  7.60 the one card cut.
//   7.60–11.00  REALITY: bars gone, normal speed, a REALITY sticker; something goes wrong.
//   11.00–15.6  THE PAYOFF: someone shares the moment; a bubble from them; THE STARS say the last line; Pisces fountains.
//
//   makeMC(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hero (sign id), cfg.date (sign id), cfg.moment ('first scarf day'), cfg.accent (headline accent)
//     cfg.title: ['LEO', 'The Winter Arc'], cfg.movieCap / cfg.realCap (sticker text, *accent*), cfg.payLine (date bubble)
//     cfg.bg(x, t, S) the set behind everything (S.phase: 'hook' | 'movie' | 'real' | 'pay'), cfg.hook / movie / real / pay
//     (x, t, S) draws, S = { u, t0, tm (slow-mo time), hero, date, ... }, cfg.last, cfg.cues: { hook, movie, real, pay }
import { el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import * as B from './b13base.js'
const { R, box, shadow, sparkles, hearts, pisces, buildBug, buildSticker, drawBar, pop01, outK, popOut, clamp, lerp, prog, ease, drawStarChar, signStar, STAR, r3, GOLD, BONE, PINK, INK, RED, INTER, SERIF } = B

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  h0Out: [2.0, 2.2], bug: 0.3,
  movie: [2.2, 7.6], bars: [2.2, 2.65], title: [3.0, 6.9], movieCap: 2.75,
  scratch: 7.3, cut: 7.6,
  real: [7.6, 11.0], realCap: 7.85,
  pay: [11.0, STORY_END], payLine: 11.25, starsIn: 11.5, last: 12.15, pisIn: 11.35,
  boxClose: 15.1, out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const CPS = 30
const SLOW = 0.3

/** the cinema seat Pisces watches from, with a striped popcorn tub (no brand) */
export function cinemaSeat(x, t, cx, cy, s, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -s * 0.62, -s * 0.15, s * 1.24, s * 0.62, '#8e2340', { b: 6, hi: '#b8355a' })
  box(x, -s * 0.75, s * 0.2, s * 0.22, s * 0.36, '#6d1a31', { b: 5 }); box(x, s * 0.53, s * 0.2, s * 0.22, s * 0.36, '#6d1a31', { b: 5 })
  x.restore()
}
export function popcorn(x, t, cx, cy, s) {
  const w = s * 0.5, h = s * 0.5
  R(x, INK, cx - w / 2 - 5, cy - h / 2 - 5, w + 10, h + 10)
  for (let i = 0; i < 5; i++) R(x, i % 2 ? '#ffffff' : RED, cx - w / 2 + i * w / 5, cy - h / 2, w / 5 + 0.5, h)
  for (let i = 0; i < 6; i++) { const px = cx - w / 2 + 6 + (i * w / 6), py = cy - h / 2 - 10 - (i % 2) * 8; R(x, INK, px - 3, py - 3, 18, 18); R(x, '#fff3b0', px, py, 12, 12) }
  void t
}

export function makeMC(cfg) {
  const HERO = signStar(cfg.hero), DATE = signStar(cfg.date)
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const date = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: DATE.color, glyph: o.s >= 150 ? DATE.glyph : null, seed: 7, glow: 1, ...o })
  const phaseOf = t => t < T.movie[0] ? 'hook' : t < T.real[0] ? 'movie' : t < T.pay[0] ? 'real' : 'pay'

  async function build(stage) {
    try {
      await Promise.all(["800 78px Inter", "800 50px Inter", "800 28px Inter", "italic 500 112px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "italic 500 96px 'EB Garamond'", "700 32px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, `*Main character moment:* | ${cfg.moment}`, { top: 170, size: 74, accentSize: 100, at: -1, gap: 0.0, accentColor: cfg.accent || HERO.color, fit: true })
    // the film title card (DOM): small-caps name + italic serif subtitle, centred in the upper frame
    const title = el('div', { position: 'absolute', left: '0', top: '300px', width: '1080px', display: 'none', flexDirection: 'column', alignItems: 'center', gap: '6px', pointerEvents: 'none' }, root)
    el('div', { font: `800 34px ${INTER}`, letterSpacing: '0.42em', color: 'rgba(255,240,214,0.92)', textShadow: '0 3px 18px rgba(0,0,0,0.9)', fontVariant: 'small-caps' }, title, cfg.title[0])
    el('div', { font: `italic 500 96px ${SERIF}`, color: '#fff3dc', textShadow: '0 4px 26px rgba(0,0,0,0.95)', whiteSpace: 'nowrap' }, title, cfg.title[1])
    const movieCap = buildSticker(root, { text: cfg.movieCap, deep: cfg.deep || RED, at: T.movieCap, out: [T.movie[1] - 0.45, T.movie[1] - 0.3], tilt: -2, top: 1400, badgeText: '▶', badge: GOLD })
    const realCap = buildSticker(root, { text: cfg.realCap, deep: cfg.deep || RED, at: T.realCap, out: [T.real[1] - 0.18, T.real[1]], tilt: 1.6, top: 1330, badgeText: 'REALITY', badge: PINK })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1430, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug, 'MAIN CHARACTER MOMENT')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function S0(t) {
      const ph = phaseOf(t)
      const t0 = ph === 'hook' ? 0 : ph === 'movie' ? T.movie[0] : ph === 'real' ? T.real[0] : T.pay[0]
      const u = t - t0
      // slow motion inside the movie (and frozen on the scratch)
      const tm = ph === 'movie' ? T.movie[0] + Math.min(u, T.scratch - T.movie[0]) * SLOW : t
      return { phase: ph, t0, u, tm, hero, date, HERO, DATE, slow: ph === 'movie' }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const S = S0(t)
        drawSky(x, S.tm, SKY_H)
        x.save()
        if (cfg.bg) cfg.bg(x, S.tm, S, t)
        const fnc = cfg[S.phase]
        if (fnc) fnc(x, S.phase === 'movie' ? S.tm : t, S, t)
        x.restore()
        // Pisces at the pictures: from the movie on
        if (t >= T.movie[0] + 0.3 && t < T.pay[0]) {
          const k = pop01(t, T.movie[0] + 0.3, 0.3, 2) * outK(t, [T.pay[0] - 0.15, T.pay[0]])
          const py = S.phase === 'movie' ? 1600 : 1640
          cinemaSeat(x, t, 920, py + 30, 150, k)
          const F = pisces(x, S.tm, { x: 920, y: py, s: 120 * k, hops: [T.real[0] + 0.05] }, S.phase === 'movie' ? 2 : 1, S.phase === 'movie' ? 'sparkle' : 'wide', [-1, -0.7])
          if (k > 0.5) popcorn(x, t, 920 - 92, F.cy + 26, 110)
        }
        // payoff: THE STARS and Pisces (fountains)
        if (t >= T.pay[0]) {
          const ok = popOut(t, T.out)
          const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
          if (sk > 0.01) drawStarChar(x, 170, 1290, 150, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
          const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
          if (pk > 0.01) { B.tissues(x, 1000, 1330, 70 * pk); pisces(x, t, { x: 910, y: 1290, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.payLine + 0.5] }, 3, 'sparkle', [-1, -1]) }
        }
        // movie grade: warm wash, vignette, letterbox bars
        const bk = t < T.movie[0] ? 0 : t < T.cut ? ease.outCubic(prog(t, ...T.bars)) : 1 - ease.inCubic(prog(t, T.cut, T.cut + 0.2))
        if (bk > 0) {
          x.save()
          x.globalAlpha = 0.18 * bk; x.fillStyle = '#ff9a3c'; x.globalCompositeOperation = 'soft-light'; x.fillRect(0, 0, 1080, 1920)
          x.globalCompositeOperation = 'source-over'; x.globalAlpha = 0.55 * bk
          const g = x.createRadialGradient(540, 900, 380, 540, 900, 1150); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)')
          x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
          x.restore()
          const bh = 210 * bk
          R(x, '#000', 0, 0, 1080, bh); R(x, '#000', 0, 1920 - bh, 1080, bh)
        }
        // the freeze: a pause chip during the scratch
        if (t >= T.scratch && t < T.cut) {
          const k = pop01(t, T.scratch, 0.15, 2.4)
          x.save(); x.translate(540, 980); x.scale(k, k); x.rotate(-0.05)
          box(x, -210, -50, 420, 100, BONE, { b: 7 })
          x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('♪ SCRRRATCH', 0, 4)
          x.restore()
        }
        drawBar(x, t, [[0, T.movie[0]], [T.movie[0], T.cut], [T.cut, T.pay[0]], [T.pay[0], T.boxClose]], B.BUG_PINK, outK(t, T.out))
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, S)
        sparkles(tx, t, 540, 900, T.pay[0] + 0.05, 12, 380, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        const tk = t >= T.title[0] && t < T.title[1] ? clamp(prog(t, T.title[0], T.title[0] + 0.6)) * (1 - prog(t, T.title[1] - 0.5, T.title[1])) : 0
        title.style.display = tk > 0.01 ? 'flex' : 'none'
        if (tk > 0.01) { title.style.opacity = String(tk); title.style.transform = `scale(${(1.06 - 0.06 * ease.outCubic(clamp(prog(t, T.title[0], T.title[1])))).toFixed(4)})` }
        movieCap.update(t); realCap.update(t)
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.movie[0], T.pay[0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
  const sh = (list, a) => (list || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])
  const CUES = [
    ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...sh(cfg.cues?.hook, 0),
    // the movie: bars, the title swell, the sticker
    ['whoosh', T.movie[0] - 0.05, 0.5, 0.04], ['tick', T.movie[0], 0.05], ['tom', T.bars[1], 70, { gain: 0.22, decay: 0.5 }],
    ['swell', T.title[0] - 0.3, T.title[0] + 1.2, { gain: 0.04, f0: 300, f1: 4000 }], ['bell', T.title[0] + 0.1, 880, 0.03, 2.4, 0],
    ['pop', T.movieCap, 1174.66, 0.04, 0.1], ['tick', r3(T.movieCap + 0.02), 0.04],
    ...sh(cfg.cues?.movie, T.movie[0]),
    // the scratch
    ['tapeStop', T.scratch - 0.02, 0.3], ['chip', T.scratch, 1400, 0.2, { wave: 'sawtooth', slide: -60, gain: 0.03, decay: 0.15, sustain: 0.3, bus: 'fx' }],
    ['chip', r3(T.scratch + 0.12), 900, 0.12, { wave: 'noise', slide: 30, gain: 0.025, decay: 0.08, sustain: 0.2, bus: 'fx' }],
    // reality
    ['pop', T.realCap, 1318.51, 0.045, -0.1], ['pop', r3(T.realCap + 0.07), 987.77, 0.03, 0.1], ['tick', r3(T.realCap + 0.02), 0.04],
    ...sh(cfg.cues?.real, T.real[0]),
    // payoff
    ['whoosh', T.pay[0] - 0.08, 0.3, 0.03], ['glitter', T.pay[0], T.pay[0] + 0.6], ['bell', r3(T.pay[0] + 0.05), 1318.51, 0.03, 1.4, 0],
    ['pop', T.payLine, 1174.66, 0.035, 0.3], ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ...sh(cfg.cues?.pay, T.pay[0]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
export { B }
void hearts; void shadow; void lerp
