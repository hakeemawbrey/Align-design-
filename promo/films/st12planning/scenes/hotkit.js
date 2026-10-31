// hotkit — the episode engine for Star Talk season 12 "Hot Takes", E08–E14 (promo/films/STARTALK14.md).
// Each of these films carries its own copy (like s7talk.js); every copy is identical. The season's look (the 🔥 stamp,
// the heat meter, the OBJECTION! burst, the VERDICT card, the AGREE / DISAGREE pill) comes from ../../sthot.js; this
// file only lays out one episode from a plain config: the studio set, the two stars, the argument in the retro dialogue
// box, then the verdict, the pill, the last line and the shared end card.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T }
//   cfg = {
//     id, numeral, duration, key,
//     take, takeAccent, heat,            the frame-0 take (≤ 8 words, one *accent*), its accent colour, 1–5 flames
//     pro: CHAR, con: CHAR,               CHAR = { tag, color, draw?(ctx, x, y, size, t, o) → r, prop?(ctx, r, t, T, side), pitch }
//     lines: [[ 'pro' | 'con', text, { hold? } ], …]   2–3 quick lines after the OBJECTION!
//     verdict, last, lastWho ('pro' | 'con'),
//     moods(phase, t, T) → [proOpts, conOpts]   phase: 'take' | line index 0… | 'verdict' | 'last'
//     set?(ctx, t, T, k)                  the episode's own scenery behind the stars (k = 0…1 story fade)
//     front?(ctx, t, T, rp, rc, k)       anything in front of the stars (props they hold, confetti)
//     cues?(T) → extra sound cues
//   }
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, verdictTimes, agreePill, agreeCues, drawHotSet, objectionShake, loadHotFonts } from '../../sthot.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', EMBER = '#ff6b3d'
export const POS = { pro: { x: 286, y: 1176 }, con: { x: 794, y: 1176 } }
export const SIZE = 300
const CPS = 30

export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

/** the schedule (pure; shared by picture and sound) */
export function schedule(cfg) {
  const D = cfg.duration, STORY_END = D - ENDCARD_LEN
  const short = D <= 15
  const T = { STORY_END, obj: cfg.objAt ?? (short ? 1.5 : 2.0) }
  const lines = []
  let t = T.obj + 0.2
  const cast = { pro: cfg.pro, con: cfg.con }
  for (const [who, text, o = {}] of cfg.lines) {
    const L = { t: r3(t + (o.pre || 0)), speaker: cast[who].tag, text, color: cast[who].accent || cast[who].color, who }
    lines.push(L)
    const tm = lineTimes([L], { cps: CPS })[0]
    t = tm.done + (o.hold ?? 1.5)
  }
  T.lines = lines
  T.times = lineTimes(lines, { cps: CPS })
  const lastDone = T.times[T.times.length - 1].done
  T.boxClose = r3(lastDone + 1.5)
  // the end, counted back from the end card: the last line (≥ 1.6 s), the pill over the verdict's tail, the verdict
  T.last = r3(STORY_END - (short ? 1.65 : 1.9))
  T.verdictOut = [r3(T.last - 0.1), r3(T.last + 0.05)]
  T.pillDur = 0.65
  T.pill = r3(T.last - 0.75)
  T.verdict = r3(lastDone + (short ? 0.6 : 0.6))
  T.vt = verdictTimes(T.verdict, cfg.verdict)
  T.takeOut = [r3(T.verdict - 0.3), r3(T.verdict - 0.05)]
  T.out = [r3(STORY_END - 0.4), r3(STORY_END - 0.05)]
  return T
}

export function makeEpisode(cfg) {
  const T = schedule(cfg)
  const { STORY_END } = T
  const LINES = T.lines
  const HOPS = {
    pro: [0.05, ...talkHops(LINES, cfg.pro.tag, { cps: CPS }), ...(cfg.lastWho === 'pro' ? [T.last + 0.05, T.last + 0.5] : [])],
    con: [T.obj + 0.12, ...talkHops(LINES, cfg.con.tag, { cps: CPS }), ...(cfg.lastWho === 'con' ? [T.last + 0.05, T.last + 0.5] : [])],
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.verdict) return 'verdict'
    let p = 'take'
    LINES.forEach((L, i) => { if (t >= L.t - 0.05) p = i })
    return p
  }
  const speaker = t => {                     // who is talking right now (for the ▼ caret)
    if (t >= T.last) return cfg.lastWho
    if (t >= T.verdict) return null
    if (t >= T.obj && t < T.obj + 0.3) return 'con'
    let s = t < T.obj ? 'pro' : null
    LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = L.who })
    return s
  }

  async function build(stage) {
    await loadHotFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const stamp = hotStamp(root, { take: cfg.take, at: 0, out: T.takeOut, accentColor: cfg.takeAccent })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: T.obj + 0.18, close: T.boxClose, cps: CPS, size: 48 })
    const verdict = verdictCard(root, { text: cfg.verdict, at: T.verdict, out: T.verdictOut, dim: 0.35, top: cfg.verdictTop ?? 640 })
    const who = cfg[cfg.lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1420px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1480, size: 92, accentSize: 140, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function studio(t, k) {
      // embers drifting up off the stage
      const fy = 1290
      for (let i = 0; i < 22; i++) {
        const ph = (t * (0.12 + (i % 5) * 0.025) + i * 0.137) % 1
        const ex = (i * 211 + Math.sin(t * 0.9 + i) * 30) % 1080, ey = fy - ph * 700
        x.globalAlpha = k * Math.sin(Math.PI * ph) * 0.7
        R(x, i % 3 ? EMBER : GOLD, ex, ey, i % 4 ? 4 : 6, i % 4 ? 4 : 6)
      }
      x.globalAlpha = 1
    }
    function caret(r, color, t) {
      const y = r.top - 30 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }))

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const sp = speaker(t)
        const shake = objectionShake(t, T.obj)
        x.save(); x.translate(shake, 0)
        drawHotSet(x, t, { heat: 0.25 + 0.12 * cfg.heat, dim: 0.35, spot: sp === 'pro' ? 'left' : sp === 'con' ? 'right' : null })
        studio(t, ok)
        const ph = phaseAt(t)
        const [mp, mc] = cfg.moods(ph, t, T)
        const dim = 1 - 0.45 * clamp(prog(t, T.verdict, T.verdict + 0.25)) * outK(t, T.verdictOut[0], T.verdictOut[1] + 0.2)
        x.save(); x.globalAlpha = ok * dim
        if (cfg.set) cfg.set(x, t, T, ok)
        const rp = drawOf(cfg.pro)(x, POS.pro.x, POS.pro.y, SIZE, t, { seed: 3, hops: HOPS.pro, ...mp })
        const conPop = pop01(t, T.obj, 0.4, 2.4)
        const conX = POS.con.x + (1 - ease.outCubic(prog(t, T.obj, T.obj + 0.3))) * 360
        const rc = conPop > 0 ? drawOf(cfg.con)(x, conX, POS.con.y, SIZE, t, { seed: 9, hops: HOPS.con, pop: conPop, ...mc }) : null
        if (cfg.pro.prop) cfg.pro.prop(x, rp, t, T, 'pro')
        if (rc && cfg.con.prop) cfg.con.prop(x, rc, t, T, 'con')
        if (cfg.front) cfg.front(x, t, T, rp, rc, ok)
        if (sp === 'pro') caret(rp, cfg.pro.color, t)
        if (sp === 'con' && rc) caret(rc, cfg.con.color, t)
        x.restore(); x.restore()
        // the season kit on top: the heat meter, the burst, the pill
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        heatMeter(x2, t, { level: cfg.heat, at: 0.15 })
        objection(x2, t, { at: T.obj, x: 640, y: 960, dur: 1.2 })
        agreePill(x2, t, { at: T.pill, dur: T.pillDur, y: 1560 })
        x2.restore()
        stamp.update(t)
        box.update(t)
        verdict.update(t)
        const on = t >= T.last && ok > 0
        tag.style.display = on ? 'block' : 'none'
        if (on) { const p = clamp(prog(t, T.last, T.last + 0.2)); tag.style.opacity = String(p * ok); tag.style.transform = `translateY(${(1 - p) * 14}px)` }
        last.update(t, ok)
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: cfg.numeral })]

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [cfg.pro.tag]: cfg.pro.pitch || 660, [cfg.con.tag]: cfg.con.pitch || 440 }
  const CUES = [
    ...hotCues(0, { key: cfg.key, level: cfg.heat, meterAt: 0.15 }),
    ...objectionCues(T.obj, { key: cfg.key }),
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...verdictCues(T.verdict, { text: cfg.verdict, key: cfg.key }),
    ...agreeCues(T.pill, { dur: T.pillDur }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...endcardCues(STORY_END),
  ]
  return { DURATION: cfg.duration, SCENES, CUES, T }
}
