// SIGN SWAP film engine (batch m11). makeSwap(cfg) → { DURATION, SCENES, CUES }. No end card, no card cut, no logo.
// Built on the shared hook kit (promo/films/hookkit.js, read-only): slam titles, whip zoom, record scratch, shake,
// notifications, chapter stickers, loading bars, the loop-back helper.
//   cfg.duration          story length (s) = DURATION; nothing is added after it
//   cfg.ending            'cut' (hard cut on the last frame) | 'loop' (the last 0.4 s cross-blend into frame 0)
//   cfg.hook              { text, out: [a, b], top, size }: the slam title, already landed on frame 0
//   cfg.caps              [{ at, out: [a, b], text, top, size }] more slam captions
//   cfg.shots             [{ at, room, roomOpts, cam: [z, cx, cy] | t => [...], push, sky, draw(x, t, S), noBlink }]
//   cfg.punch             [{ at, dur, z, x, y }] camera punch-ins on my canvas
//   cfg.fx                [{ kind, ...kit opts }] kit effects: whip · shake · rec · notify · chapter · load · call ·
//                         count · caught · glitch · ach · news · hud   (rec windows also freeze my clock)
//   cfg.flash             [{ at, col, a }] colour flashes (full frame, my canvas)
//   cfg.overlay(x, t, S)  screen-space painter on my canvas
//   cfg.shade             0…1: a soft dark band behind the top captions (off when omitted)
//   cfg.last              { at, text, top }: the last line (a slam title that stays)
//   cfg.cues              extra sound cues
import { prog, ease, lerp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  caught, caughtCues, incomingCall, incomingCallCues, notification, notificationCues, loadingBar, loadingBarCues,
  countdown, countdownCues, newsDesk, newsDeskCues, gameHud, gameHudCues, achievement, achievementCues, chapter,
  chapterCues, glitch, glitchCues, loopBack, loopCues,
} from '../../hookkit.js'
import { room, buildBug, r3 } from './swapkit.js'

const KIT = {
  whip: [whipZoom, whipZoomCues], shake: [screenShake, shakeCues], rec: [recordScratch, recordScratchCues],
  notify: [notification, notificationCues], chapter: [chapter, chapterCues], load: [loadingBar, loadingBarCues],
  call: [incomingCall, incomingCallCues], count: [countdown, countdownCues], caught: [caught, caughtCues],
  glitch: [glitch, glitchCues], ach: [achievement, achievementCues], news: [newsDesk, newsDeskCues], hud: [gameHud, gameHudCues],
}

export function makeSwap(cfg) {
  const D = cfg.duration
  const SHOTS = cfg.shots, PUNCH = cfg.punch ?? [], FLASH = cfg.flash ?? [], FX = cfg.fx ?? []
  const HOOK = { at: -1, top: 250, size: 104, ...cfg.hook }
  const CAPS = (cfg.caps ?? []).map(c => ({ top: 250, size: 92, ...c }))
  const LAST = cfg.last ? { top: 290, size: 100, ...cfg.last, out: cfg.ending === 'loop' ? [D - 0.45, D - 0.3] : null } : null
  const RECS = FX.filter(f => f.kind === 'rec')

  const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
  const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : D }
  function camera(x, t, sh) {
    let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : (sh.cam ?? [1, 540, 960])
    z *= 1 + (sh.push ?? 0.04) * prog(t, sh.at, nextAt(sh))
    for (const p of PUNCH) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.14)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
      if (k <= 0) continue
      const s2 = Math.sin((t - p.at) * 70) * 6 * (1 - prog(t, p.at, p.at + 0.25))
      z *= 1 + p.z * k; cx = lerp(cx, p.x, k) + s2; cy = lerp(cy, p.y, k)
    }
    x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
  }
  function paint(x, t) {
    const sh = shotAt(t)
    const S = { t, shot: sh, k: prog(t, sh.at, nextAt(sh)), u: t - sh.at, i: SHOTS.indexOf(sh) }
    drawSky(x, t, { ...SKY_H, ...(sh.sky || {}) })
    x.save(); camera(x, t, sh)
    if (sh.room) room(x, t, sh.room, typeof sh.roomOpts === 'function' ? sh.roomOpts(t) : (sh.roomOpts || {}))
    sh.draw?.(x, t, S)
    x.restore()
    cfg.overlay?.(x, t, S)
    if (cfg.shade) { const g = x.createLinearGradient(0, 100, 0, 560); g.addColorStop(0, `rgba(10,6,30,${0.72 * cfg.shade})`); g.addColorStop(0.65, `rgba(10,6,30,${0.45 * cfg.shade})`); g.addColorStop(1, 'rgba(10,6,30,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 560) }
    const cp = prog(t, sh.at, sh.at + 0.12)
    if (sh.at > 0 && cp < 1 && !sh.noBlink) { x.save(); x.globalAlpha = 0.3 * (1 - cp); x.fillStyle = '#fff8ee'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    for (const f of FLASH) { const tt = t - f.at; if (tt < 0 || tt > 0.3) continue; x.save(); x.globalAlpha = (f.a ?? 0.7) * (1 - tt / 0.3); x.fillStyle = f.col ?? '#fffaf0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "italic 500 176px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return { start: 0, end: D + 0.01, root, update(t) { paint(x, t); bug.update(t); drawGrain(gx, t) } }
  }
  const MAIN = RECS.length ? frozen(build, RECS) : build
  const fxScenes = FX.map(f => KIT[f.kind][0](f))
  const whip0 = FX.filter(f => f.kind === 'whip' && f.at <= 0).map(f => whipZoom(f))
  const SCENES = [MAIN, ...fxScenes, slamTitle(HOOK), ...CAPS.map(c => slamTitle(c)), ...(LAST ? [slamTitle(LAST)] : [])]
  if (cfg.ending === 'loop') SCENES.push(loopBack([MAIN, ...whip0, slamTitle(HOOK)], { duration: D }))

  const CUES = [
    ...SHOTS.filter(s => s.at > 0 && !s.noBlink).flatMap(s => [['whoosh', r3(s.at - 0.06), 0.22, 0.022], ['tick', r3(s.at), 0.025]]),
    ...PUNCH.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.16, 0.02], ['pop', r3(p.at + 0.04), 1318.51, 0.028, 0]]),
    ...FX.flatMap(f => KIT[f.kind][1](f)),
    ...slamTitleCues(HOOK), ...CAPS.flatMap(c => slamTitleCues(c)), ...(LAST ? slamTitleCues(LAST) : []),
    ...(cfg.ending === 'loop' ? loopCues({ duration: D }) : []),
    ...(cfg.cues ?? []),
  ]
  return { DURATION: D, SCENES, CUES }
}
