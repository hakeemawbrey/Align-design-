// achengine — the episode engine of ACHIEVEMENT UNLOCKED: SINGLE LIFE (kaue01–kaue20). Owned by kaue01, read-only for
// the rest of the batch. A film is a table of beats + its own painters; the engine runs the camera, the time warps
// (freeze frames), the series chrome (bug, XP bar, achievement toasts, the Pisces spectator cam), the type (hook, talk,
// last line, chapter stickers) and the ending (hard cut, or a seamless loop back into frame 0). No end card.
//
//   import { makeAch } from '../../kaue01/achengine.js'
//   export const { DURATION, SCENES, CUES } = makeAch(cfg)   (then cues.js imports DURATION + CUES as usual)
//
// cfg:
//   dur                story length (s): the video length. Nothing is added after it.
//   ending             'cut' (the last frame is the last story frame) | 'loop' (the last `loopLen` s ease back into frame 0)
//   loopLen            default 0.4
//   key                music key, only used for the toast jingles' root
//   shots              [{ at, cam: [z, cx, cy] | (t) => [z, cx, cy], push = 0.03, ...anything }] the camera per shot
//   punch              [{ at, dur, z, x, y }] quick punch-ins
//   whips              [t] whip zooms (a snap zoom + speed lines + a whoosh), the pattern break
//   freezes            [{ at, dur, text = null, circle: { x, y, r } | null }] record scratch: world time stops, the frame
//                      desaturates, "⏸ " + text tag, an optional red "caught" circle (screen coords)
//   shakes             [{ at, dur = 0.4, amp = 16 }]
//   flashes            [{ at, col, a, dur }]
//   scene(x, wt, S)    world painter (camera space), wt = warped world time, S = { shot, i, t }
//   overlay(x, t, S)   screen-space painter above the world (before the chrome)
//   achs               [{ at, title, xp, sub = null, out = at + 2.4, icon = 'trophy' | 'star' | 'heart' }] toasts
//   level              starting level (default 1)
//   cams               [{ at, out, line, lineAt, lineOut, tears, x, y, w, h, mood }] Pisces spectator cam appearances
//   hook               { text, out, top = 250, size = 92, accentSize = 128, color }  ON at frame 0 (thumbnail)
//   lines + boxes      dialogue (startalk dialogueBox): lines [{ t, speaker, text, color }], boxes [{ from, to, open, close, y, h }]
//   bubbles            [{ at, out, x, y, text, tail, size, col }] canvas speech bubbles (screen space)
//   last               { at, text, top = 300, size = 104, accentSize = 160, color, out = dur + 1 }
//   chapters           [{ at, out, n, text }] chapter stickers (long films)
//   promise            { at, out, text } a small "wait for…" tag under the bug (long films)
//   cues               extra sound cues
//   chrome             { bugOut, xpY } overrides
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { dialogueBox, talkCues } from '../startalk.js'
import { popText } from '../lesson.js'
import * as K from '../hookkit.js'
import { R, box, drawBits, label, bubble, piscesCam, achBug, xpBar, speedLines, TROPHY, HEART, INK, BONE, GOLD, GREEN, PINK, RED, INTER, SERIF, MONO, r3, pop01, outK } from './achkit.js'

const PITCH = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
const hzOf = (key, semis) => +(523.25 * Math.pow(2, (((PITCH[(key || 'C').replace('m', '')] ?? 0) + semis) % 12) / 12) * (semis >= 12 ? 2 : 1)).toFixed(2)
const STAR5 = ['...G...', '..GGG..', 'GGGGGGG', '.GGGGG.', '.GG.GG.', 'G.....G']

// ── the achievement toast (canvas): slides down from the top, holds, slides back up
function drawToast(x, t, a, { y = 330 } = {}) {
  const out = a.out ?? a.at + 2.4
  if (t < a.at || t > out + 0.3) return
  const k = easeOutBack(prog(t, a.at, a.at + 0.32), 2.2), o = 1 - ease.inCubic(prog(t, out, out + 0.28))
  const W = 900, H = 168
  const yy = lerp(-260, y, k) + (1 - o) * -320
  x.save(); x.translate(540, yy)
  // shadow + plate
  R(x, 'rgba(6,4,18,0.6)', -W / 2 + 14, 16, W, H)
  box(x, -W / 2, 0, W, H, '#140d30', { b: 8 })
  R(x, GOLD, -W / 2, 0, W, 6); R(x, GOLD, -W / 2, H - 6, W, 6)
  // shine sweep
  const sw = prog(t, a.at + 0.25, a.at + 0.9)
  if (sw > 0 && sw < 1) { x.save(); x.beginPath(); x.rect(-W / 2, 0, W, H); x.clip(); x.globalAlpha = 0.25; x.fillStyle = '#fff'; const sx = lerp(-W / 2 - 120, W / 2 + 120, sw); x.beginPath(); x.moveTo(sx, 0); x.lineTo(sx + 70, 0); x.lineTo(sx + 10, H); x.lineTo(sx - 60, H); x.closePath(); x.fill(); x.restore() }
  // the icon tile
  box(x, -W / 2 + 26, 24, 120, 120, '#2a1f5a', { b: 6 })
  const pulse = 1 + 0.12 * Math.exp(-(t - a.at - 0.3) * 5) * Math.sin((t - a.at) * 22)
  const icon = a.icon === 'heart' ? HEART : a.icon === 'star' ? STAR5 : TROPHY
  drawBits(x, icon, { G: GOLD, H: a.icon === 'heart' ? '#ff5c8a' : '#fff6c8', B: '#c98a3a' }, -W / 2 + 86, 84, 11 * pulse)
  // text
  x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText('ACHIEVEMENT UNLOCKED', -W / 2 + 172, 56)
  x.font = `800 ${a.size ?? 44}px ${INTER}`; x.fillStyle = BONE
  x.fillText(a.title, -W / 2 + 172, 108, W - 360)
  if (a.sub) { x.font = `600 24px ${INTER}`; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText(a.sub, -W / 2 + 172, 142, W - 360) }
  // XP chip
  x.textAlign = 'right'; x.font = `700 34px ${MONO}`
  const xpk = easeOutBack(prog(t, a.at + 0.35, a.at + 0.65), 3)
  x.save(); x.translate(W / 2 - 28, 120); x.scale(xpk, xpk); x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(`+${a.xp} XP`, 3, 4); x.fillStyle = GREEN; x.fillText(`+${a.xp} XP`, 0, 0); x.restore()
  x.restore()
}
const toastCues = (a, key) => [
  ['whoosh', r3(a.at - 0.04), 0.22, 0.022],
  ...[0, 4, 7, 12].map((s, i) => ['pop', r3(a.at + 0.06 + i * 0.075), hzOf(key, s), 0.04, (i - 1.5) * 0.12]),
  ['bell', r3(a.at + 0.38), hzOf(key, 19) , 0.03, 1.1, 0], ['tick', r3(a.at + 0.5), 0.03],
  ['whoosh', r3((a.out ?? a.at + 2.4) - 0.02), 0.2, 0.012],
]

// ── chapter sticker (canvas)
function drawChapter(x, t, c) {
  if (t < c.at || t > c.out + 0.3) return
  const k = easeOutBack(prog(t, c.at, c.at + 0.34), 2.6), o = 1 - ease.inCubic(prog(t, c.out, c.out + 0.25))
  x.save(); x.translate(540, 1690); x.rotate(-0.04); x.scale(k * lerp(0.6, 1, o), k * lerp(0.6, 1, o)); x.globalAlpha = clamp(o * 1.5)
  x.font = `800 44px ${INTER}`
  const tw = x.measureText(c.text).width, W = Math.min(980, tw + 220), H = 104
  R(x, 'rgba(6,4,18,0.6)', -W / 2 + 10, -H / 2 + 12, W, H)
  box(x, -W / 2, -H / 2, W, H, BONE, { b: 7 })
  box(x, -W / 2 + 16, -H / 2 + 16, 150, H - 32, c.col ?? PINK, { b: 4 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.fillText(c.n != null ? `CH. ${c.n}` : 'BOSS', -W / 2 + 91, 2)
  x.font = `800 44px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK; x.fillText(c.text, -W / 2 + 190, 3, W - 220)
  x.restore()
}

export function makeAch(cfg) {
  const D = cfg.dur, LOOP = cfg.ending === 'loop', LL = cfg.loopLen ?? 0.4
  const SHOTS = cfg.shots || [{ at: 0, cam: [1, 540, 960] }]
  const PUNCH = cfg.punch || [], WHIPS = cfg.whips || [], FREEZES = cfg.freezes || [], SHAKES = cfg.shakes || [], FLASHES = cfg.flashes || []
  const ACHS = cfg.achs || [], CAMS = cfg.cams || [], CH = cfg.chapters || [], BUBBLES = cfg.bubbles || []
  const LINES = cfg.lines || []
  const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
  const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : D }
  function applyCam(x, t, sh) {
    let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : sh.cam
    z *= 1 + (sh.push ?? 0.03) * prog(t, sh.at, nextAt(sh))
    for (const p of PUNCH) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
      if (k <= 0) continue
      z *= 1 + p.z * k; cx = lerp(cx, p.x ?? cx, k); cy = lerp(cy, p.y ?? cy, k)
    }
    const sx = 0, sy = 0
    x.translate(540 + sx, 960 + sy); x.scale(z, z); x.translate(-cx, -cy)
  }
  function world(x, t) {
    const wt = t, sh = shotAt(wt), i = SHOTS.indexOf(sh)
    if (cfg.sky !== false) drawSky(x, wt, SKY_H)
    x.save(); applyCam(x, t, sh); cfg.scene(x, wt, { shot: sh, i, t }); x.restore()
    // cut blink
    const cp = prog(wt, sh.at, sh.at + 0.12)
    if (sh.at > 0 && cp < 1 && !sh.noBlink) { x.save(); x.globalAlpha = 0.3 * (1 - cp); x.fillStyle = '#fff8ee'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    if (cfg.overlay) cfg.overlay(x, t, { shot: sh, i, wt })
    { const g = x.createLinearGradient(0, 0, 0, 260); g.addColorStop(0, 'rgba(6,4,18,0.78)'); g.addColorStop(1, 'rgba(6,4,18,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 260) }
    for (const f of FLASHES) { const p = prog(t, f.at, f.at + (f.dur ?? 0.16)); if (p > 0 && p < 1) { x.save(); x.globalAlpha = (f.a ?? 0.85) * (1 - p); x.fillStyle = f.col ?? '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
    for (const b of BUBBLES) bubble(x, t, b.x, b.y, b.at, b.out, b.text, { size: b.size ?? 40, tail: b.tail ?? 0, col: b.col ?? BONE, maxW: b.maxW ?? 980 })
    for (const c of CAMS) piscesCam(x, t, { tears: 3, ...c })
    xpBar(x, t, { gains: ACHS, level: cfg.level ?? 1, y: cfg.chrome?.xpY ?? 128, alpha: 1 })
    if (cfg.promise && t >= cfg.promise.at && t < cfg.promise.out) {
      const k = pop01(t, cfg.promise.at, 0.3, 2) * outK(t, [cfg.promise.out - 0.2, cfg.promise.out])
      x.save(); x.globalAlpha = clamp(k); x.translate(58, 186); x.font = `800 30px ${INTER}`
      const w = x.measureText(cfg.promise.text).width + 40
      R(x, RED, 0, 0, w, 50); x.fillStyle = '#fff'; x.textBaseline = 'middle'; x.fillText(cfg.promise.text, 20, 27); x.restore()
    }
    for (const a of ACHS) drawToast(x, t, a, { y: a.y ?? cfg.toastY ?? 330 })
  }

  async function build(stage) {
    try { await Promise.all(["800 92px Inter", "800 44px Inter", "600 24px Inter", "italic 500 128px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const boxes = (cfg.boxes || (LINES.length ? [{ from: 0, to: LINES.length }] : [])).map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 250, open: b.open, close: b.close, cps: cfg.cps ?? 28 }))
    const L = cfg.last
    const last = L ? popText(root, L.text, { top: L.top ?? 300, size: L.size ?? 104, accentSize: L.accentSize ?? 160, at: L.at, gap: 0.08, accentColor: L.color ?? GOLD, wobble: true, late: 1, lateAt: L.at + 0.35, fit: true }) : null
    const bug = achBug(root, -1)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        world(x, t)
        for (const b of boxes) b.update(t)
        if (last) last.update(t, L.out ? outK(t, [L.out - 0.25, L.out]) : 1)
        bug.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  // ── the hook kit layers
  const HOOK = cfg.hook ? { at: -1, top: 250, size: 104, ...cfg.hook, out: cfg.hook.out != null ? (Array.isArray(cfg.hook.out) ? cfg.hook.out : [cfg.hook.out - 0.2, cfg.hook.out]) : null } : null
  const RECS = FREEZES.map(f => ({ at: f.at, len: f.dur, caption: f.text ?? 'yep.', sub: f.sub ?? null, top: f.top ?? 1500 }))
  const KIT = [
    ...WHIPS.map(w => ['whipZoom', typeof w === 'number' ? { at: w } : w]),
    ...SHAKES.map(s => ['screenShake', { at: s.at, len: s.dur ?? 0.45, amp: s.amp ?? 24 }]),
    ...RECS.map(r => ['recordScratch', r]),
    ...FREEZES.filter(f => f.circle).map(f => ['caught', { at: f.at + 0.1, x: f.circle.x, y: f.circle.y, r: f.circle.r, out: [f.at + f.dur - 0.15, f.at + f.dur], label: f.circle.label ?? 'CAUGHT IN 4K', arrow: f.circle.arrow ?? 'tl', rec: false }]),
    ...CH.map(c => ['chapter', { at: c.at, out: Array.isArray(c.out) ? c.out : [c.out - 0.15, c.out], n: c.n, title: c.text, color: c.col ?? GOLD }]),
    ...(cfg.kit || []),
  ]
  const cueName = { whipZoom: 'whipZoomCues', screenShake: 'shakeCues', recordScratch: 'recordScratchCues', caught: 'caughtCues', chapter: 'chapterCues', notification: 'notificationCues', loadingBar: 'loadingBarCues', countdown: 'countdownCues', gameHud: 'gameHudCues', incomingCall: 'incomingCallCues', glitch: 'glitchCues', newsDesk: 'newsDeskCues', achievement: 'achievementCues', slamTitle: 'slamTitleCues' }
  const base = RECS.length ? K.frozen(build, RECS) : build
  const SCENES = [base, ...KIT.map(([f, o]) => K[f](o)), ...(HOOK ? [K.slamTitle(HOOK)] : [])]
  if (LOOP) SCENES.push(K.loopBack([build, ...(HOOK ? [K.slamTitle(HOOK)] : [])], { duration: D, len: LL }))
  const CUES = [
    ...(HOOK ? K.slamTitleCues(HOOK) : []),
    ...KIT.flatMap(([f, o]) => K[cueName[f]] ? K[cueName[f]](o) : []),
    ...(LOOP ? K.loopCues({ duration: D, len: LL }) : []),
    ...SHOTS.filter(s => s.at > 0 && !s.silent).flatMap(s => [['whoosh', r3(s.at - 0.06), 0.24, 0.026], ['tick', r3(s.at), 0.03]]),
    ...PUNCH.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.02], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...ACHS.flatMap(a => toastCues(a, cfg.key)),
    ...CAMS.flatMap(c => [['pop', r3(c.at), 880, 0.035, 0.4], ['glitter', r3(c.at + 0.1), r3(c.at + 0.9)], ...(c.line ? [['pop', r3(c.lineAt ?? c.at + 0.5), 1046.5, 0.03, 0.4]] : [])]),
    ...BUBBLES.map(b => ['pop', r3(b.at), 739.99, 0.035, (b.tail ?? 0) * 0.3]),
    ...(cfg.boxes || (LINES.length ? [{ from: 0, to: LINES.length }] : [])).map(b => ['pop', r3(b.open ?? LINES[b.from].t - 0.22), 739.99, 0.035, 0]),
    ...(LINES.length ? talkCues(LINES, { cps: cfg.cps ?? 28, pitch: cfg.pitch || {} }) : []),
    ...(cfg.last ? [...[0, 1, 2].map(i => ['pop', r3(cfg.last.at + i * 0.08), hzOf(cfg.key, [7, 9, 12][i]), 0.028, i % 2 ? 0.15 : -0.15]), ['pop', r3(cfg.last.at + 0.35), hzOf(cfg.key, 16), 0.05, 0], ['bell', r3(cfg.last.at + 0.37), hzOf(cfg.key, 19), 0.025, 1.2, 0]] : []),
    ...(cfg.cues || []),
  ].filter(c => typeof c[1] !== 'number' || (c[1] >= 0 && c[1] < D))

  return { DURATION: D, SCENES, CUES, world }
}
