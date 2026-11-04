// RATE THE EXCUSE: the shared look of Trends Vol. 2 episodes nt2e51–nt2e55 (promo/films/next30/b13.md §11).
// The other four films import this file from here.
//
// The format (25 s, story 0–20.6, then the shared end card):
//   0.00–2.30   hook: the caption "Rate the *excuse*: | <situation>." is on screen from frame 0, the hero mid-action, and
//               three friends on a couch below (Pisces always on the right, with tissues).
//   2.30–16.0   three excuses arrive as big message bubbles; after each, the couch holds up scorecards one by one.
//               Excuse 1 is cute, excuse 2 is worse, excuse 3 is the honest truth: 10 · 10 · 10, confetti, Pisces sobs.
//               Excuse 3 starts under the one card cut (11.7).
//   16.0–20.6   the payoff (cfg.finale), THE STARS say the last line.
//
//   makeExcuse(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.hero, cfg.situation, cfg.accent, cfg.judges: [left, middle] sign ids (Pisces sits right)
//     cfg.excuses: [{ text, scores: [a, b, c], mood, draw?(x, t, S) }] × 3, cfg.hook(x, t, S), cfg.finale(x, t, S), cfg.last
import { el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import * as B from '../../nt2e41/scenes/b13base.js'
const { R, box, shadow, sparkles, confetti, pisces, tissues, buildBug, drawBar, pop01, outK, popOut, clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, r3, GOLD, BONE, PINK, INK, RED, INTER, SERIF } = B

export const DURATION = 25
export const STORY_END = DURATION - ENDCARD_LEN          // 20.6
export const T = {
  bug: 0.3, h0Out: [15.85, 16.05],
  ex: [[2.3, 7.0], [7.0, 11.7], [11.7, 16.0]],
  bubbleAt: 0.2, scoreAt: 2.3, scoreGap: 0.28,
  cut: 11.7,
  fin: [16.0, STORY_END], starsIn: 16.2, last: 16.7,
  boxClose: 20.1, out: [20.1, 20.5], bugOut: [20.2, 20.5],
}
const CPS = 30
export const HX = 540, HY = 800, HS = 250          // the hero's spot
const SEATS = [270, 540, 810], JY = 1215, JS = 165

function couch(x) {
  box(x, 120, 1170, 840, 150, '#5d3f8a', { b: 8, hi: '#7454a8' })          // back
  box(x, 90, 1290, 900, 120, '#6b4a9e', { b: 8, hi: '#8a66c0' })           // seat
  box(x, 70, 1230, 90, 190, '#553784', { b: 8 }); box(x, 920, 1230, 90, 190, '#553784', { b: 8 })   // arms
  R(x, INK, 130, 1418, 26, 40); R(x, INK, 924, 1418, 26, 40)
}
function scorecard(x, t, cx, cy, n, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -7, 40, 14, 90); R(x, '#a07850', -3, 40, 6, 86)
  box(x, -62, -52, 124, 104, BONE, { b: 6 })
  x.font = `800 ${n >= 10 ? 62 : 72}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = n >= 10 ? RED : INK; x.fillText(String(n), 0, 4)
  x.restore()
}

export function makeExcuse(cfg) {
  const HERO = signStar(cfg.hero)
  const JUDGES = [...cfg.judges, 'pisces']
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const hero = (x, t, o = {}) => drawStarChar(x, o.x ?? HX, o.y ?? HY, o.s ?? HS, t, { color: HERO.color, glyph: (o.s ?? HS) >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const exIdx = t => T.ex.findIndex(([a, b]) => t >= a && t < b)
  const scoreT = (i, j) => T.ex[i][0] + T.scoreAt + j * T.scoreGap

  async function build(stage) {
    try {
      await Promise.all(["800 78px Inter", "800 48px Inter", "800 28px Inter", "800 72px Inter", "italic 500 106px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 26px 'Space Mono'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, `Rate the *excuse:* | ${cfg.situation}`, { top: 160, size: 70, accentSize: 100, at: -1, gap: 0, accentColor: cfg.accent || HERO.color, fit: true })
    // the excuse bubbles (DOM): a big message bubble with a small "EXCUSE #n" tag
    const bubbles = cfg.excuses.map((e, i) => {
      const wrap = el('div', { position: 'absolute', left: '0', top: '400px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
      const bb = el('div', { position: 'relative', maxWidth: '880px', padding: '22px 34px 26px', background: i === 2 ? '#fff4f7' : BONE, border: `6px solid ${INK}`, borderRadius: '30px 30px 30px 8px', boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '10% 100%' }, wrap)
      el('div', { font: `700 24px 'Space Mono', monospace`, letterSpacing: '0.12em', color: i === 2 ? RED : '#7a6f9a', marginBottom: '6px' }, bb, i === 2 ? 'EXCUSE #3 · (THE TRUTH)' : `EXCUSE #${i + 1}`)
      const html = e.text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 60px ${SERIF};color:${cfg.deep || RED}">$1</span>`)
      el('div', { font: `800 46px ${INTER}`, lineHeight: '1.12', color: INK, letterSpacing: '-0.01em' }, bb, `“${html}”`)
      const at = T.ex[i][0] + T.bubbleAt, out = [T.ex[i][1] - 0.2, T.ex[i][1]]
      return {
        update(t) {
          const on = t >= at && t < out[1]
          wrap.style.display = on ? 'flex' : 'none'
          if (!on) return
          const k = easeOutBack(prog(t, at, at + 0.36), 2.4), o = outK(t, out)
          bb.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
          bb.style.transform = `scale(${(lerp(0.3, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${[-1.5, 1.2, -0.8][i]}deg)`
        },
      }
    })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1490, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug, 'RATE THE EXCUSE')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        // a cosy living room: wall + floor
        R(x, 'rgba(32,22,62,0.75)', 0, 0, 1080, 1920); R(x, '#2a1e4c', 0, 1360, 1080, 560)
        for (let i = 0; i < 6; i++) R(x, 'rgba(255,214,140,0.05)', 0, 120 + i * 200, 1080, 100)
        const i = exIdx(t), fin = t >= T.fin[0]
        const S = { i, u: i >= 0 ? t - T.ex[i][0] : t - (fin ? T.fin[0] : 0), hero, HERO, fin }
        // the hero
        x.save()
        if (t < T.ex[0][0]) cfg.hook(x, t, S)
        else if (fin) cfg.finale(x, t, S)
        else {
          const e = cfg.excuses[i]
          const sc = t >= scoreT(i, 0)
          shadow(x, HX, HY + 140, 220)
          hero(x, t, { mood: sc ? (i === 2 ? 'happy' : 'wide') : e.mood || 'happy', look: sc ? [0, 1] : [0, 0], blush: i === 2 ? 1 : undefined, hops: [T.ex[i][0] + 0.25, scoreT(i, 2) + 0.05] })
          if (e.draw) e.draw(x, t, S)
        }
        x.restore()
        // the couch + judges + scorecards
        couch(x)
        tissues(x, 965, 1220, 70)
        JUDGES.forEach((id, j) => {
          const isP = id === 'pisces', Sg = signStar(id)
          let mood = 'neutral', look = [0, -1], tears = isP ? 1 : 0
          const hopsJ = []
          if (i >= 0 || fin) {
            const ii = fin ? 2 : i, n = cfg.excuses[ii].scores[j], shown = t >= scoreT(ii, j)
            if (shown) { mood = n >= 10 ? 'heart' : n <= 3 ? 'eyeroll' : n <= 5 ? 'squint' : 'happy'; hopsJ.push(scoreT(ii, j)) }
            if (isP) tears = ii === 2 && shown ? 3 : ii === 2 ? 2 : 1
            const k = (shown ? pop01(t, scoreT(ii, j), 0.3, 2.6) : 0) * (fin ? popOut(t, T.out) : outK(t, [T.ex[ii][1] - 0.2, T.ex[ii][1]]))
            if (isP) pisces(x, t, { x: SEATS[j], y: JY, s: JS, hops: hopsJ }, tears, mood === 'neutral' ? 'sparkle' : mood, look)
            else drawStarChar(x, SEATS[j], JY, JS, t, { color: Sg.color, glyph: Sg.glyph, mood, look, seed: 4 + j, glow: 0.9, hops: hopsJ })
            scorecard(x, t, SEATS[j] + (j - 1) * 10, JY - 175 - 6 * Math.sin(t * 4 + j), n, k, (j - 1) * 0.08 + 0.04 * Math.sin(t * 3 + j))
          } else {
            if (isP) pisces(x, t, { x: SEATS[j], y: JY, s: JS }, 1, 'sparkle', [0, -1])
            else drawStarChar(x, SEATS[j], JY, JS, t, { color: Sg.color, glyph: Sg.glyph, mood: 'happy', look: [0, -1], seed: 4 + j, glow: 0.9 })
          }
        })
        // THE STARS in the payoff
        const sk = pop01(t, T.starsIn, 0.38, 2.1) * popOut(t, T.out)
        if (sk > 0.01) drawStarChar(x, 140, 980, 140, t, { color: STAR.sky, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
        drawBar(x, t, [...T.ex, [T.fin[0], T.boxClose]], B.BUG_PINK, outK(t, T.out))
        tx.clearRect(0, 0, 1080, 1920)
        confetti(tx, t, scoreT(2, 2) + 0.05, 540, 1000)
        sparkles(tx, t, 540, 1050, scoreT(2, 2), 14, 380, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        bubbles.forEach(b => b.update(t))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.ex[0][0], T.ex[1][0], T.fin[0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
  const CUES = [
    ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...(cfg.hookCues || []),
    ...cfg.excuses.flatMap((e, i) => {
      const a = T.ex[i][0]
      return [
        ...(i !== 2 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(a + T.bubbleAt), 1318.51, 0.045, -0.2], ['pop', r3(a + T.bubbleAt + 0.07), 1760, 0.03, -0.2],
        ...e.scores.map((n, j) => n >= 10 ? ['bell', r3(scoreT(i, j)), [1318.51, 1567.98, 2093.0][j], 0.04, 0.8, (j - 1) * 0.4] : ['pop', r3(scoreT(i, j)), [659.25, 587.33, 523.25][j] * (n <= 3 ? 0.75 : 1), 0.045, (j - 1) * 0.4]),
        ...(i === 2 ? [['glitter', r3(scoreT(2, 2)), r3(scoreT(2, 2) + 0.7)], ['crash', r3(scoreT(2, 2)), { gain: 0.05 }], ['clap', r3(scoreT(2, 2) + 0.2), { gain: 0.1 }], ['clap', r3(scoreT(2, 2) + 0.45), { gain: 0.1 }]] : [['rim', r3(scoreT(i, 2) + 0.3), { gain: 0.08 }]]),
        ...(e.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ['whoosh', T.fin[0] - 0.08, 0.3, 0.03], ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4],
    ...(cfg.finCues || []).map(c => [c[0], r3(c[1] + T.fin[0]), ...c.slice(2)]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
export { B }
void ease
