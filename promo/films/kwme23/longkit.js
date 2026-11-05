// longkit — the 60 s WAIT, THAT'S ME format (kwme23, kwme24). Owned by batch m26; read-only for everyone else.
// Same look as ../kwme01/wmkit.js, but the film is a run of STAGES: each stage whips in, slaps a hook-kit chapter
// sticker, plays its gag, then the hero does the series' slow turn to camera and a stage punchline types under it.
// The hook line is huge on frame 0, shrinks to a header after HOOK_SHRINK, and grows back during the loop seam.
// The last LOOP_LEN s cross-fade the canvas into the frame at t − dur (frame 0's pre-roll), via the kit's loopK.
//
//   makeLong({ id, dur, hook, hookSize, wash,
//              stages: [{ t0, t1, sign, x, y, s, face, turn, turnLen, line, chapter: { n, title } | null,
//                         heroOpts(t, u) → { mood, look, hops, squash, tilt, blush }, back(x, t, u, S), front(x, t, u, S),
//                         after(x, t, u, F, k) }],
//              intro: (x, t, S) → bool (draw a custom frame-0 scene; return true to skip the stage hero),
//              pis: { x, y, s } | false, pisTears(t), cues })
//   u = t − stage.t0 (stage-local time).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { drawStarChar, signStar, lineTimes, talkCues } from '../startalk.js'
import { popText } from '../lesson.js'
import { loopK, loopCues, whipZoomCam, whipZoomCues, chapter, chapterCues } from '../hookkit.js'
import { pisces, starFrame, sine, hexA, BONE, MONO, GOLD } from '../kwme01/wmkit.js'

export const LOOP_LEN = 0.45, HOOK_SHRINK = [2.6, 3.1]

export function makeLong(cfg) {
  const { id, dur, hook, stages, wash = null, pis = { x: 925, y: 1490, s: 230 }, cues = [] } = cfg
  const LOOP = [dur - LOOP_LEN, dur]
  const stageAt = t => stages.find(s => t >= s.t0 && t < s.t1) || (t < stages[0].t0 ? stages[0] : stages[stages.length - 1])
  const turnK = (st, t) => sine(prog(t, st.turn, st.turn + (st.turnLen || 1.3)))
  const WHIPS = stages.map((s, i) => ({ at: i === 0 && s.t0 < 0.5 ? -0.12 : s.t0 - 0.06, len: 0.5, from: 1.5 }))
  const INTRO_WHIP = { at: -0.12, len: 0.6, from: 1.55 }
  const lines = stages.filter(s => s.line).map(s => ({ st: s, at: s.turn + (s.turnLen || 1.3) + 0.1 }))
  const LT = lines.map(l => lineTimes([{ t: l.at, speaker: 'x', text: l.st.line }], { cps: 26 })[0])

  function cam(t, st) {
    let z = 1, fx = 540, fy = 960
    const i = stages.indexOf(st), intro = t < stages[0].t0, W = whipZoomCam(t, intro ? INTRO_WHIP : WHIPS[i])
    if (W) z = W.s
    else if (intro && t < INTRO_WHIP.at) z = INTRO_WHIP.from
    else if (i === 0 && t < WHIPS[0].at && stages[0].t0 < 0.5) z = WHIPS[0].from
    if (intro) return { z, fx, fy }
    const tk = ease.inOutCubic(prog(t, st.turn - 0.1, st.turn + (st.turnLen || 1.3) + 0.6)) * (1 - ease.inOutCubic(prog(t, st.t1 - 0.45, st.t1)))
    z += (st.push ?? 0.3) * tk
    fx = lerp(540, st.x, tk); fy = lerp(960, st.y - st.s * 0.08, tk)
    return { z, fx, fy }
  }

  function hero(x, t, st) {
    const u = t - st.t0, k = turnK(st, t), face = st.face ?? 1
    const busy = (st.heroOpts && st.heroOpts(t, u)) || {}
    const S = signStar(st.sign)
    const hx = busy.x ?? st.x, hy = busy.y ?? st.y
    const look = k < 0.55 ? (busy.look || [face, 0]) : [0, 0]
    const mood = k > 0.25 ? (busy.endMood && k > 0.95 ? busy.endMood : 'neutral') : (busy.mood || 'neutral')
    x.save(); x.translate(hx, 0); x.scale(lerp(0.74, 1, k), 1); x.translate(-hx, 0)
    const tilt = (1 - k) * (busy.tilt ?? 0.06 * face)
    if (tilt) { x.translate(hx, hy); x.rotate(tilt); x.translate(-hx, -hy) }
    const o = { color: S.color, glyph: st.s >= 120 ? S.glyph : null, mood, look, blink: k > 0.05 ? 0 : busy.blink, hops: k > 0.05 ? null : busy.hops, squash: busy.squash || 0, seed: st.seed || 3, bob: k > 0.2 ? 2 : undefined, blush: busy.blush }
    drawStarChar(x, hx, hy, st.s, t, o)
    if (st.after) st.after(x, t, u, starFrame(hx, hy, st.s, t, o), k)
    x.restore()
  }

  async function build(stage) {
    try { await Promise.all(["800 92px Inter", "800 30px Inter", "italic 500 100px 'EB Garamond'", "700 44px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cA = layerCanvas(root), xA = cA.getContext('2d'), cB = layerCanvas(root), xB = cB.getContext('2d')
    const HOOK = popText(root, hook, { top: 150, size: cfg.hookSize || 86, accentSize: (cfg.hookSize || 86) * 1.16, at: -3, accentColor: cfg.hookAccent || GOLD, fit: true })
    HOOK.root.style.transformOrigin = '50% 0%'
    const subs = lines.map(() => el('div', { position: 'absolute', left: '40px', width: '780px', top: '1470px', textAlign: 'center', font: `700 44px ${MONO}`, color: BONE, textShadow: '0 3px 14px rgba(6,4,18,0.98), 0 0 3px rgba(6,4,18,0.9)', whiteSpace: 'pre-wrap', pointerEvents: 'none' }, root))
    const bug = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
    el('div', { width: '18px', height: '18px', background: GOLD, boxShadow: '0 0 0 4px #1b1236' }, bug)
    el('div', { font: "800 30px Inter", fontVariant: 'small-caps', letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.95)' }, bug, 'wait, that’s me')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const S = { turnK, stages, signStar }

    function scene(x, t) {
      const st = stageAt(t), u = t - st.t0, c = cam(t, st)
      x.setTransform(1, 0, 0, 1, 0, 0)
      drawSky(x, t, { zoom: 1.45 * (1 + (c.z - 1) * 0.3), dim: 0.5, moon: null })
      const w = st.wash || wash
      if (w) { const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, hexA(w, 0)); g.addColorStop(0.55, hexA(w, 0.22)); g.addColorStop(1, hexA(w, 0.5)); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
      x.save(); x.translate(540, 960); x.scale(c.z, c.z); x.translate(-c.fx, -c.fy)
      if (cfg.intro && t < stages[0].t0) cfg.intro(x, t, S)
      else {
        if (st.back) st.back(x, t, u, S)
        if (!st.noHero) hero(x, t, st)
        if (st.front) st.front(x, t, u, S)
      }
      x.restore()
      if (st.hud && !(cfg.intro && t < stages[0].t0)) st.hud(x, t, u, S)
      if (pis && !(st.sign === 'pisces' && t >= st.t0) && !(cfg.intro && t < stages[0].t0)) {
        const lvl = cfg.pisTears ? cfg.pisTears(t) : 2
        pisces(x, t, { x: pis.x, y: pis.y + 6 * Math.sin(t * 2.4), s: pis.s }, lvl, { mood: lvl >= 3 ? 'wide' : 'sparkle', look: turnK(st, t) > 0.5 ? [0, 0] : [-1, -1] })
      }
    }

    return {
      start: 0, end: dur + 0.01, root,
      update(t) {
        scene(xA, t)
        const lk = loopK(t, dur, LOOP_LEN)
        cB.style.opacity = String(lk)
        if (lk > 0) scene(xB, t - dur)
        const hs = lerp(1, 0.62, ease.inOutCubic(prog(t, ...HOOK_SHRINK)) * (1 - lk))
        HOOK.update(t); HOOK.root.style.transform = `translateY(${((1 - hs) * -60).toFixed(1)}px) scale(${hs.toFixed(3)})`
        lines.forEach((l, i) => {
          const end = l.st.t1 - 0.25, n = t < end ? LT[i].chars.filter(c => c <= t).length : 0
          subs[i].textContent = n ? [...l.st.line].slice(0, n).join('') : ''
          subs[i].style.opacity = String(1 - lk)
        })
        drawGrain(gx, t >= LOOP[0] ? t - dur : t)
      },
    }
  }

  const CH = stages.filter(s => s.chapter).map(s => ({ at: s.t0 + 0.35, out: [(s.chapter.until ?? s.t1) - 0.4, (s.chapter.until ?? s.t1) - 0.2], n: s.chapter.n, title: s.chapter.title, x: 60, y: 360, color: s.chapter.color || GOLD }))
  const SCENES = [build, ...CH.map(o => chapter(o))]
  const CUES = [
    ...(cfg.intro ? whipZoomCues(INTRO_WHIP).map(c => c.map(v => typeof v === 'number' ? Math.max(0, v) : v)) : []),
    ...stages.flatMap((s, i) => whipZoomCues(WHIPS[i]).map(c => c.map(v => typeof v === 'number' ? Math.max(0, v) : v))),
    ...CH.flatMap(o => chapterCues(o)),
    ...stages.filter(s => s.turn != null).flatMap(s => [['tom', s.turn, 70, { gain: 0.2, decay: 0.45 }], ['riser', s.turn + 0.1, s.turn + (s.turnLen || 1.3), 0.01]]),
    ...lines.flatMap(l => talkCues([{ t: l.at, speaker: 'last', text: l.st.line }], { cps: 26, gain: 0.014 })),
    ...loopCues({ duration: dur, len: LOOP_LEN }),
    ...cues,
  ]
  return { DURATION: dur, SCENES, CUES, LOOP }
}
export { clamp, lerp, prog, ease }
