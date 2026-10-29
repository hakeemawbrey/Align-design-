// st9lskit — the episode kit for Libra's and Scorpio's season-9 days (st9libra* · st9scorpio*, STARTALK10.md). It wires
// one day-in-the-life episode from a plain spec: the sign's home (st9librahome.js / st9scorpiohome.js), the vlog chrome
// (st9day.js: REC frame, clock, hook, stamps, fact chip), the Star Talk dialogue box, the last line, the season eggs
// (seed constellation, ghost, cardFrame numeral), the card cuts and the end card. Each episode only writes its beats and
// gags. Owned by the Libra + Scorpio session; nothing here is needed by anyone else.
//
//   import { makeDay, star, T3 } from '../../st9lskit.js'
//   const EP = makeDay({ ...spec })   →   export const { DURATION, SCENES, CUES } = EP
//
// spec
//   numeral 'S9 E31'      sign 'libra'    ep 'am'|'work'|'love'|'crew'|'3am'    home  the sign's drawXHome
//   duration (incl. the 4.4 s end card)   key 'F'
//   hook   { text, out }                  last  { at, text, accentColor }        (last line: Inter 800 + Garamond accent)
//   shots  [{ at, room, dark, hour, zoom: { x, y, s }, punch = true, home: {extra home opts}, set }]  hard cuts; each one
//          (set: (x, t, shot) => anchors paints a location that isn't the home)
//          opens with a small camera punch (a pattern interrupt) and a whoosh.
//   clock  [{ at, dur, from, to }]       segments; the clock fast-forwards at each (hidden from `clockOut` on)
//   stamps [{ at, out, time, text }]      lines [{ t, speaker, text, color }]  box { y, height, open, close }
//   fact   { at, dur, text, label, y }    ghost { at, x, y, from, dur }         battery 0…1   cuts [{ t, kind }]
//   draw(x, t, a, shot)   the episode's world, inside the camera (a = the home's anchors)
//   over(x, t, shot)      screen-space overlays after the camera (phones, HUDs)
//   cues  [...]           the episode's own sound
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, prog, ease, el } from '../src/lib.js'
import { fill } from '../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from './sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from './wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from './endcard.js'
import { cardCuts, cardCutCues, cardFrame } from './cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from './startalk.js'
import { drawSeedConstellation, drawGhostCameo } from './stlore.js'
import { popText } from './lesson.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from './st9day.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', MINT = '#8fe3c8'
const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const env = (t, a, b, fi = 0.25, fo = 0.25) => t < a || t > b ? 0 : Math.min(easeOutBack(prog(t, a, a + fi), 1.8), 1 - ease.inCubic(prog(t, b - fo, b)))

/** a sign star (id = 'libra' …) with its colour and glyph; returns drawStarChar's { x, y, size, top } */
export function star(x, id, cx, cy, size, t, opts = {}) {
  const s = signStar(id)
  return drawStarChar(x, cx, cy, size, t, { color: s.color, glyph: size >= 120 ? s.glyph : null, ...opts })
}
/** the tag text for a sign: '♎ LIBRA' */
export const tag = id => { const s = signStar(id); return `${s.glyph} ${id === 'sagittarius' ? 'SAG' : id.toUpperCase()}` }

/** the active shot at t */
function shotAt(shots, t) { let s = shots[0]; for (const v of shots) if (v.at <= t) s = v; return s }

export function makeDay(spec) {
  const DURATION = spec.duration, STORY_END = DURATION - ENDCARD_LEN
  const shots = spec.shots, lines = spec.lines || [], CPS = spec.cps || 26
  const clockOut = spec.clockOut ?? (spec.last ? spec.last.at - 0.2 : STORY_END)
  const LASTP = spec.last ? { top: spec.last.top ?? 300, size: spec.last.size ?? 104, accentSize: spec.last.accentSize ?? 150 } : null

  async function build(stage) {
    try { await Promise.all([...DAY_FONTS, "700 52px 'Space Mono'", "800 112px Inter", "italic 500 190px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), xo = top.getContext('2d')            // screen-space overlays + chrome
    const hook = hookPOV(root, { text: spec.hook.text, at: 0, out: spec.hook.out, top: spec.hook.top ?? 260, size: spec.hook.size ?? 96, accentSize: spec.hook.accentSize ?? 140, accentColor: spec.hook.accentColor ?? GOLD })
    const stamps = (spec.stamps || []).map(s => stampCaption(root, { top: spec.stampTop ?? 1300, ...s }))
    const box = lines.length ? dialogueBox(root, { lines, y: spec.box?.y ?? 1420, width: 960, height: spec.box?.height ?? 270, open: spec.box?.open, close: spec.box?.close, cps: CPS, size: spec.box?.size ?? 48 }) : null
    const last = spec.last ? popText(root, spec.last.text, { top: LASTP.top, size: LASTP.size, accentSize: LASTP.accentSize, at: spec.last.at, gap: 0.09, accentColor: spec.last.accentColor ?? GOLD, wobble: true, fit: true }) : null
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    void el
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const sh = shotAt(shots, t)
        const hour = typeof sh.hour === 'function' ? sh.hour(t) : sh.hour
        x.save()
        // the camera: the shot's framing, plus a quick punch-in as it opens
        const z = sh.zoom || { x: 540, y: 960, s: 1 }
        const pk = sh.punch === false || sh.at === 0 ? 0 : 0.07 * (1 - ease.outCubic(prog(t, sh.at, sh.at + 0.35)))
        const s = (typeof z.s === 'function' ? z.s(t) : z.s) * (1 + pk)
        x.translate(540, 960); x.scale(s, s); x.translate(-z.x, -z.y)
        const skyFn = (c) => { drawSky(c, t, SKY_H); daySky(c, t, { hour }) }
        const a = sh.set ? sh.set(x, t, { ...sh, sky: skyFn, hour }) : spec.home(x, t, {
          room: sh.room, ep: spec.ep, dark: typeof sh.dark === 'function' ? sh.dark(t) : (sh.dark || 0), hour,
          sky: skyFn, ...(sh.home || {}), ...(spec.homeOpts ? spec.homeOpts(t, sh) : {}),
        })
        if (spec.ghost && sh.room === spec.ghost.room) drawGhostCameo(x, t, { cell: 3, dur: 1.5, ...spec.ghost })
        spec.draw?.(x, t, a, sh)
        x.restore()
        // screen space
        xo.clearRect(0, 0, 1080, 1920)
        drawSeedConstellation(xo, t, 100, { alpha: 0.45 })
        spec.over?.(xo, t, sh)
        if (spec.fact) factChip(xo, t, { y: 330, ...spec.fact })
        drawRecFrame(xo, t, { battery: spec.battery ?? 0.8, time: '00:' + String(Math.floor(t)).padStart(2, '0') })
        if (t < clockOut) {
          let seg = spec.clock[0]; for (const c of spec.clock) if (c.at <= t) seg = c
          drawClock(xo, t, { ...seg, sign: spec.sign, alpha: 1 - prog(t, clockOut - 0.25, clockOut) })
        }
        hook.update(t)
        for (const st of stamps) st.update(t)
        box?.update(t)
        last?.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = spec.cuts || []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: spec.numeral }), cardCuts(CUTS)]
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const lastWords = spec.last ? spec.last.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length : 0
  const CUES = [
    ...hookPOVCues(0, { key: spec.key }),
    ...spec.clock.filter(c => c.dur > 0 && c.to && c.to !== c.from).flatMap(c => clockCues(c.at, c.dur)),
    ...(spec.stamps || []).flatMap(s => stampCues(s.at)),
    ...shots.filter(s => s.at > 0 && s.punch !== false).flatMap(s => [['whoosh', r3(s.at - 0.12), 0.25, 0.03], ['tick', r3(s.at), 0.05]]),
    ...(lines.length ? talkCues(lines, { cps: CPS, pitch: spec.pitch || {} }) : []),
    ...(spec.fact ? factChipCues(spec.fact.at, { dur: spec.fact.dur ?? 2.4 }) : []),
    ...(spec.ghost ? [['tick', r3(spec.ghost.at + 0.05), 0.015]] : []),
    ...(spec.last ? [...Array.from({ length: lastWords }, (_, i) => ['pop', r3(spec.last.at + i * 0.09), NOTE[i % NOTE.length], 0.035, 0]), ['bell', r3(spec.last.at + 0.1), 1567.98, 0.025, 1.4, 0]] : []),
    ...(spec.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].sort((p, q) => p[1] - q[1])
  return { DURATION, STORY_END, SCENES, CUES }
}

/** a little helper for the cues.js of each episode */
export function music(id, DURATION, { style, key, seed, drop, lift = null }) {
  return { id, duration: DURATION, music: { style, key, seed, sections: { drop, ...(lift != null ? { lift } : {}), outroAt: DURATION - 4.4 } } }
}
export const T3 = r3
void clamp; void BONE; void INK; void PINK; void MINT
