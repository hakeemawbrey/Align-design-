// Film 2 — "Flip it" (16:9, 30s). Every frame is a pure function of t: window.seek(t).
// Scenes live in ./scenes/fN-*.js and default-export build(stage) → { start, end, update(t), fx?(ctx, t), fadeIn? }.
// Later scenes stack above earlier ones; the #fx canvas sits on top of everything (transitions, stars).
import { prog } from '../src/lib.js'
import { W, H } from '../src/scenes/common.js'
import { SCENES, DURATION } from './scenes/index.js'

const stage = document.getElementById('stage'), fx = document.getElementById('fx'), ctx = fx.getContext('2d')
const params = new URLSearchParams(location.search)
const RENDER = params.has('render')
if (RENDER) document.body.classList.add('render')
stage.style.width = fx.style.width = W + 'px'; stage.style.height = fx.style.height = H + 'px'; fx.width = W; fx.height = H
const fit = () => { const s = RENDER ? 1 : Math.min(innerWidth / W, innerHeight / H); window.__stageScale = s; stage.style.transform = `scale(${s})` }
fit(); addEventListener('resize', fit)

async function boot() {
  window.DURATION = DURATION
  const scenes = []
  for (const [i, build] of SCENES.entries()) { const s = await build(stage); s.root && (s.root.style.zIndex = String(10 + i)); scenes.push(s) }
  stage.appendChild(fx)
  await document.fonts.ready
  await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r })))
  window.seek = (t) => {
    for (const s of scenes) {
      const on = t >= s.start && t < s.end
      if (s.root) s.root.style.display = on ? 'block' : 'none'
      if (!on) continue
      s.update(t)
      if (s.root && s.fadeIn) s.root.style.opacity = String(prog(t, s.start, s.start + s.fadeIn))
    }
    ctx.clearRect(0, 0, W, H)
    for (const s of scenes) if (s.fx && t >= (s.fxStart ?? s.start) && t < (s.fxEnd ?? s.end)) s.fx(ctx, t)
  }
  window.ready = true
  if (!RENDER) {
    const hud = document.getElementById('hud')
    let t = Number(params.get('t') || 0), playing = !params.has('pause'), last = performance.now()
    addEventListener('keydown', e => { if (e.key === ' ') playing = !playing; if (e.key === 'ArrowRight') t += e.shiftKey ? 1 : 1 / 30; if (e.key === 'ArrowLeft') t -= e.shiftKey ? 1 : 1 / 30; if (e.key === '0') t = 0 })
    const loop = (now) => { if (playing) t += (now - last) / 1000; last = now; if (t >= DURATION) t = 0; window.seek(t); hud.textContent = `${t.toFixed(2)}s / ${DURATION}s  [space] [←/→]`; requestAnimationFrame(loop) }
    requestAnimationFrame(loop)
  }
}
boot()
