// Teaser player: teaser.html?t=<id>  (vertical 1080×1920; `v` is added automatically)
import { TEASERS } from './index.js'
import { W, H } from '../src/scenes/common.js'

const params = new URLSearchParams(location.search)
if (!params.has('v')) { params.set('v', ''); location.search = params.toString() }
const RENDER = params.has('render')
if (RENDER) document.body.classList.add('render')
const stage = document.getElementById('stage'), fx = document.getElementById('fx'), ctx = fx.getContext('2d')
const fit = () => { const s = RENDER ? 1 : Math.min(innerWidth / W, innerHeight / H); window.__stageScale = s; stage.style.transform = `scale(${s})` }
fit(); addEventListener('resize', fit)

async function boot() {
  const id = params.get('t') || Object.keys(TEASERS)[0]
  const T = TEASERS[id]
  if (!T) { document.body.innerHTML = `<p style="color:#fff;font:16px monospace;padding:20px">Unknown teaser "${id}". Available: ${Object.keys(TEASERS).join(', ')}</p>`; return }
  document.title = `Align — ${T.title}`
  window.DURATION = T.duration
  const scene = await T.build(stage)
  stage.appendChild(fx)
  await document.fonts.ready
  await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r })))
  window.seek = (t) => {
    scene.update(t)
    ctx.clearRect(0, 0, W, H)
    if (scene.fx) scene.fx(ctx, t)
  }
  window.ready = true
  if (!RENDER) {
    const hud = document.getElementById('hud')
    let t = Number(params.get('at') || 0), playing = !params.has('pause'), last = performance.now()
    addEventListener('keydown', e => {
      if (e.key === ' ') playing = !playing
      if (e.key === 'ArrowRight') t += e.shiftKey ? 1 : 1 / 30
      if (e.key === 'ArrowLeft') t -= e.shiftKey ? 1 : 1 / 30
      if (e.key === '0') t = 0
    })
    const loop = (now) => {
      if (playing) t += (now - last) / 1000
      last = now
      if (t >= T.duration) t = 0
      window.seek(t)
      hud.textContent = `${id}  ${t.toFixed(2)}s / ${T.duration}s  [space] play/pause  [←/→] frame`
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
}
boot()
