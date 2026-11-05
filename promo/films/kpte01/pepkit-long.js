// THE 10-SECOND PEP TALK, long format: "the full pep talk" (kpte16–kpte20, 60–90 s). Imported read-only by those films.
// Built on ./pepkit.js pieces + ../hookkit.js (chapter stickers, the first-second break, countdown, loop seam).
//
//   0.0–3.2    THE GRAB: frame 0 mid-chaos (cfg.hook draws the set + both stars mid-action), the slam hook line, a pattern
//              break at 0.42 (cfg.brk), and the promise chip at 1.15 ("stay for | *the last line*").
//   chapters   cfg.chapters = [{ title, len, set(x, t, S), props(x, t, S), lines: [[rel t, 'C'|'L'|'P', text]], mood,
//              fx: [[kitEffectName, opts with rel times]], cues: [[kind, rel t, …]] }]. Each chapter opens with a hookkit
//              chapter sticker ("1 · THE CALL") and a whip punch; the dialogue box carries every line (speaker tag per
//              line); the coach is left, the listener right (cfg.chapters[i].pos overrides), Pisces in the back crying.
//              S.u = time into the chapter, S.k = chapter index.
//   the end    the last chapter is built by the kit: "N · THE LAST LINE" sticker, a 3-2-1 countdown, the last line slams
//              in big (cfg.last), the listener glows, Pisces fountains; a ~1.2 s hold, then a hard cut or a loop.
// makeLong(cfg) → { DURATION, SCENES, CUES, T }
import {
  GOLD, BONE, PINK, INK, PEP, MINT, r3, pop01, outK, clamp, lerp, prog, ease, drawStarChar, signStar, el, popText, dialogueBox,
  talkCues, talkHops, drawSky, drawGrain, layerCanvas, fill, SKY_H, GRAIN_H, speaker, starFrame, inSprite, tearsCells,
  tissues, shadow, sparkles, confetti, glow, speedLines, buildBug, premiseChip, loadFonts, room,
} from './pepkit.js'
import * as HK from '../hookkit.js'

const CPS = 30
const HOOK_END = 3.2

export function makeLong(cfg) {
  const LS = signStar(cfg.sign), CS = signStar(cfg.coach), PIS = signStar('pisces')
  const coachP = cfg.coach === 'pisces', listP = cfg.sign === 'pisces'
  const loop = cfg.end === 'loop'
  const LOOP_LEN = 0.45
  // ── the timeline
  const CH = []
  let at = HOOK_END
  for (const c of cfg.chapters) { CH.push({ ...c, t0: r3(at), t1: r3(at + c.len) }); at += c.len }
  const LASTC = { t0: r3(at), title: 'THE LAST LINE' }
  const COUNT = { at: r3(at + 0.6), from: 3, gap: 0.5, go: null, y: 900, color: PEP }
  const LAST_AT = r3(COUNT.at + 1.6)
  const DURATION = r3(LAST_AT + 0.9 + 1.3 + (loop ? LOOP_LEN : 0))
  LASTC.t1 = DURATION
  const T = { hook: [0, HOOK_END], brk: 0.42, coachBack: [0.95, 1.45], promise: 1.15, chapters: CH, lastCh: LASTC, lastAt: LAST_AT, D: DURATION }

  // ── the lines (absolute), one dialogue box
  const SPK = { C: speaker(cfg.coach), L: speaker(cfg.sign), P: `${PIS.glyph}︎ PISCES` }
  if (coachP) SPK.P = SPK.C
  const COLS = { C: CS.color, L: LS.color, P: '#b9a6ff' }
  const LINES = []
  CH.forEach(c => (c.lines || []).forEach(([rt, who, text]) => LINES.push({ t: r3(c.t0 + rt), speaker: SPK[who], text, color: COLS[who] === '#1b1236' ? PEP : (cfg.accent || PEP), who })))
  LINES.sort((a, b) => a.t - b.t)
  const C_HOPS = talkHops(LINES, SPK.C, { cps: CPS }), L_HOPS = talkHops(LINES, SPK.L, { cps: CPS }), P_HOPS = coachP ? C_HOPS : talkHops(LINES, SPK.P, { cps: CPS })
  const boxOpen = r3(LINES[0].t - 0.25), boxClose = r3(CH[CH.length - 1].t1 - 0.15)

  // stars
  const L = (x, t, o = {}) => {
    const r = drawStarChar(x, o.x, o.y, o.s, t, { color: LS.color, glyph: o.s >= 150 && o.glyph !== false ? LS.glyph : null, seed: 3, glow: 1.1, hops: L_HOPS, ...o })
    if (listP && o.tears !== 0) inSprite(x, starFrame(o.x, o.y, o.s, t, { seed: 3, hops: L_HOPS, ...o }), () => tearsCells(x, t, o.tears || 2))
    return r
  }
  const C = (x, t, o = {}) => {
    const r = drawStarChar(x, o.x, o.y, o.s, t, { color: CS.color, glyph: o.s >= 150 && o.glyph !== false ? CS.glyph : null, seed: 7, glow: 1.1, hops: C_HOPS, ...o })
    if (coachP && o.tears !== 0) inSprite(x, starFrame(o.x, o.y, o.s, t, { seed: 7, hops: C_HOPS, ...o }), () => tearsCells(x, t, o.tears || 2))
    return r
  }
  const star = (x, t, sign, o = {}) => { const s = signStar(sign); return drawStarChar(x, o.x, o.y, o.s, t, { color: s.color, glyph: o.s >= 150 && o.glyph !== false ? s.glyph : null, seed: o.seed ?? 5, glow: 1, ...o }) }
  function pisces(x, t, P, tears, mood = 'wide', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, hops: P.hops || P_HOPS, tips: false, glyph: P.s >= 150 ? PIS.glyph : null, squash: P.squash || 0 }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(x, t, tears))
  }
  const S0 = { L, C, star, pisces, LS, CS, T, DURATION }

  function grab(x, t) {
    if (cfg.hook) cfg.hook(x, t, S0)
    const b = ease.inOutCubic(prog(t, ...T.coachBack)), lunge = 1 - b
    if (!coachP && !listP) { tissues(x, 800, 1610, 80); pisces(x, t, { x: 930, y: 1560, s: 165 }, 2, 'wide', [-1, -0.6]) }
    if (cfg.grabber === 'none') return
    const cx = lerp(560, 230, b) + lunge * 14 * Math.sin(t * 31), cy = lerp(1330, 1300, b), s = lerp(720, 250, b)
    if (lunge > 0.02) speedLines(x, t, cx, cy - 200, 0.7 * lunge, { r0: 420 })
    x.save(); x.translate(cx, cy); x.rotate(lerp(-0.16, 0, b)); x.translate(-cx, -cy)
    C(x, t, { x: cx, y: cy, s, mood: t < T.coachBack[1] ? 'wide' : 'happy', look: t < T.coachBack[0] ? [0, 0] : [1, -0.4], blink: false, glyph: s < 400, hops: [T.coachBack[1] + 0.05, 2.0], squash: lunge * 0.06 * Math.sin(t * 18), tears: coachP ? 3 : 0 })
    x.restore()
  }

  function chapterScene(x, t, c, k) {
    const u = t - c.t0
    const S = { ...S0, u, k, t0: c.t0, t1: c.t1 }
    const lineStarts = LINES.filter(l => l.t >= c.t0 && l.t < c.t1).map(l => l.t)
    const punch = 1 + 0.06 * Math.max(0, ...lineStarts.map(v => (t >= v && t < v + 0.3) ? 1 - ease.outCubic((t - v) / 0.3) : 0), (u < 0.35 ? 1 - ease.outCubic(u / 0.35) : 0))
    x.save(); x.translate(540, 960); x.scale(punch, punch); x.translate(-540, -960)
    if (c.set) c.set(x, t, S)
    else room(x, t, { win: { x: 120, y: 470, w: 260, h: 300 }, floorY: 1330 })
    if (c.props) c.props(x, t, S)
    if (c.stars !== false) {
      const P = c.pos || {}
      const LP = P.L || { x: 760, y: 1110, s: 270 }, CP = P.C || { x: 290, y: 1120, s: 260 }
      shadow(x, LP.x, LP.y + LP.s * 0.75, LP.s * 0.9); shadow(x, CP.x, CP.y + CP.s * 0.75, CP.s * 0.9)
      if (P.C !== null) C(x, t, { ...CP, mood: c.cmood || 'sparkle', look: [1, -0.2], tears: coachP ? 2 : 0 })
      if (P.L !== null) L(x, t, { ...LP, mood: c.mood || 'neutral', look: c.look || [-1, -0.2], squash: c.slump ?? 0, tears: listP ? 2 : 0 })
      if (!coachP && !listP && P.P !== null) { const PP = P.P || { x: 960, y: 820, s: 115 }; tissues(x, PP.x - PP.s * 0.75, PP.y + PP.s * 0.28, PP.s * 0.5); pisces(x, t, PP, c.ptears || 2, c.pmood || 'wide', [-1, 0.5]) }
    }
    if (c.top) c.top(x, t, S)
    x.restore()
  }

  function lastScene(x, t) {
    const a = LASTC.t0, u = t - a
    if (cfg.lastSet) cfg.lastSet(x, t, { ...S0, u, t0: a })
    x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1060, 540, 0.24 * clamp(prog(t, LAST_AT - 0.2, LAST_AT + 0.4)), '255,138,92'); x.restore()
    const rise = ease.outBack(prog(t, LAST_AT, LAST_AT + 0.5))
    shadow(x, 540, 1340, 300)
    L(x, t, { x: 540, y: lerp(1150, 1080, rise), s: lerp(280, 340, rise), mood: t < LAST_AT ? 'wide' : 'sparkle', look: [0, 0], hops: [LAST_AT + 0.05, LAST_AT + 0.7], tears: listP ? 3 : 0 })
    sparkles(x, t, 540, 1040, LAST_AT + 0.05, 14, 300, 1, [PEP, GOLD, BONE])
    confetti(x, t, LAST_AT + 0.05, 540, 900)
    C(x, t, { x: 185, y: 1450, s: 170, mood: 'happy', look: [1, -0.6], hops: [LAST_AT + 0.3, LAST_AT + 0.9], tears: coachP ? 3 : 0 })
    if (listP) C(x, t, { x: 895, y: 1450, s: 0.001 })
    else if (!coachP) pisces(x, t, { x: 895, y: 1450, s: 170, hops: [LAST_AT + 0.4, LAST_AT + 1.0] }, 3, 'sparkle', [-1, -0.8])
    else star(x, t, cfg.extra || 'leo', { x: 895, y: 1450, s: 160, mood: 'happy', look: [-1, -0.6], hops: [LAST_AT + 0.4] })
  }

  async function build(stage) {
    await loadFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const PRO = premiseChip(root, cfg.promise || 'stay for | *the last line*', { top: 420, at: T.promise })
    const H3 = popText(root, cfg.last, { top: 200, size: 98, accentSize: 136, at: LAST_AT, gap: 0.08, late: cfg.lastLate ?? 1, lateAt: r3(LAST_AT + 0.35), wobble: true, accentColor: cfg.accent || PEP, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box = dialogueBox(root, { lines: LINES.map(({ t, speaker: s, text, color }) => ({ t, speaker: s, text, color })), y: 1400, open: boxOpen, close: boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 3))) } : SKY_H)
        const lunge = 1 - prog(t, ...T.coachBack)
        x.save(); x.translate(lunge * 9 * Math.sin(t * 47), lunge * 7 * Math.cos(t * 39))
        if (t < HOOK_END) grab(x, t)
        else {
          const k = CH.findIndex(c => t >= c.t0 && t < c.t1)
          if (k >= 0) chapterScene(x, t, CH[k], k)
          else lastScene(x, t)
        }
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, S0)
        PRO.update(t, outK(t, [HOOK_END - 0.2, HOOK_END]))
        H3.update(t, t >= LAST_AT ? 1 : 0)
        box.update(t)
        bug.update(t)
        const cuts = [HOOK_END, ...CH.map(c => c.t1)]
        const fl = Math.max(0, ...cuts.map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.background = '#fff6ea'
        flash.style.opacity = String(clamp(0.5 * fl))
        drawGrain(gx, t)
      },
    }
  }

  // ── the hook kit layers
  const HOOK = { at: -1, text: cfg.hookLine, top: 150, size: cfg.hookSize || 108, accentColor: cfg.accent || PEP, out: [HOOK_END - 0.2, HOOK_END] }
  const brk = cfg.brk || 'whip'
  const FX0 = {
    whip: { at: T.brk, len: 0.45, from: 1.45 },
    scratch: { at: T.brk, len: 1.0, caption: cfg.scratchCap || 'yep. *that’s you.*', top: 1560 },
    glitch: { at: T.brk, len: 0.55, dialog: false },
    shake: { at: T.brk, len: 0.55, amp: 30 },
  }[brk]
  const STICK = [...CH.map((c, i) => ({ at: r3(c.t0 + 0.15), out: [r3(c.t1 - 0.25), r3(c.t1 - 0.05)], n: i + 1, title: c.title, x: 70, y: 230, color: GOLD })),
    { at: r3(LASTC.t0 + 0.15), out: [r3(LAST_AT - 0.3), r3(LAST_AT - 0.1)], n: CH.length + 1, title: LASTC.title, x: 70, y: 230, color: PEP }]
  const EXTRA = []
  CH.forEach(c => (c.fx || []).forEach(([name, o]) => {
    const abs = { ...o }
    for (const key of ['at', 'answerAt', 'declineAt', 'start']) if (abs[key] != null) abs[key] = r3(c.t0 + abs[key])
    if (abs.out) abs.out = abs.out.map(v => r3(c.t0 + v))
    if (abs.splits) abs.splits = abs.splits.map(s => ({ ...s, at: r3(c.t0 + s.at) }))
    EXTRA.push([name, abs])
  }))
  const main = brk === 'scratch' ? HK.frozen(build, [FX0]) : build
  const fxScene = { whip: HK.whipZoom, scratch: HK.recordScratch, glitch: HK.glitch, shake: HK.screenShake }[brk]
  const SCENES = [main, HK.slamTitle(HOOK), fxScene(FX0), ...STICK.map(o => HK.chapter(o)), HK.countdown(COUNT), ...EXTRA.map(([n, o]) => HK[n](o)),
    ...(loop ? [HK.loopBack([build, HK.slamTitle(HOOK)], { duration: DURATION, len: LOOP_LEN })] : [])]

  // ── sound
  const cueOf = { whip: HK.whipZoomCues, scratch: HK.recordScratchCues, glitch: HK.glitchCues, shake: HK.shakeCues }
  const fxCue = { loadingBar: HK.loadingBarCues, notification: HK.notificationCues, incomingCall: HK.incomingCallCues, achievement: HK.achievementCues, caught: HK.caughtCues, screenShake: HK.shakeCues, countdown: HK.countdownCues, glitch: HK.glitchCues, whipZoom: HK.whipZoomCues, recordScratch: HK.recordScratchCues, newsDesk: HK.newsDeskCues, slamTitle: HK.slamTitleCues }
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const nw = s => s.replace(/\|/g, ' ').trim().split(/\s+/).length
  const CUES = [
    ['whoosh', 0.0, 0.3, 0.05], ['tom', 0.05, 100, { gain: 0.2, decay: 0.2 }], ['pop', 0.08, 880, 0.03, -0.3],
    ...cueOf[brk](FX0), ...HK.slamTitleCues(HOOK),
    ['whoosh', T.coachBack[0], 0.4, 0.03], ['pop', T.promise, 1174.66, 0.04, 0], ['tick', r3(T.promise + 0.05), 0.04],
    ...CH.flatMap(c => [['whoosh', r3(c.t0 - 0.1), 0.3, 0.035], ['tick', c.t0, 0.05]]),
    ...STICK.flatMap(o => HK.chapterCues(o)),
    ...talkCues(LINES.map(({ t, speaker: s, text }) => ({ t, speaker: s, text })), { cps: CPS }),
    ...EXTRA.flatMap(([n, o]) => fxCue[n] ? fxCue[n](o) : []),
    ...CH.flatMap(c => (c.cues || []).map(q => [q[0], r3(c.t0 + q[1]), ...q.slice(2)])),
    ['whoosh', r3(LASTC.t0 - 0.1), 0.3, 0.035], ['tick', LASTC.t0, 0.05],
    ...HK.countdownCues(COUNT),
    ['boom', LAST_AT, 0.22], ['glitter', LAST_AT, r3(LAST_AT + 0.6)], ['bell', LAST_AT, 2349.32, 0.04, 1.4, 0],
    ...Array.from({ length: Math.max(1, nw(cfg.last) - 1) }, (_, i) => ['pop', r3(LAST_AT + i * 0.08), NOTE[i % 7], 0.024, i % 2 ? 0.15 : -0.15]),
    ['pop', r3(LAST_AT + 0.35), 1174.66, 0.05, 0], ['pop', r3(LAST_AT + 0.43), 1567.98, 0.04, 0],
    ['pluck', r3(LAST_AT + 0.6), 1567.98, 0.03, 0.4, 0.4], ['pluck', r3(LAST_AT + 0.72), 2093, 0.025, 0.4, 0.4],
    ...(loop ? HK.loopCues({ duration: DURATION, len: LOOP_LEN }) : []),
    ...(cfg.cues || []),
  ]
  return { DURATION, SCENES, CUES, T }
}
