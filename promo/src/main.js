import { prog, ease } from './lib.js'
import * as S from './scenes/index.js'

export const DURATION = 30
const stage = document.getElementById('stage')
const fx = document.getElementById('fx')
const ctx = fx.getContext('2d')
const params = new URLSearchParams(location.search)
const RENDER = params.has('render')
if (RENDER) document.body.classList.add('render')

function fit() {
  const s = RENDER ? 1 : Math.min(innerWidth / 1920, innerHeight / 1080)
  window.__stageScale = s
  stage.style.transform = `scale(${s})`
}
fit(); addEventListener('resize', fit)

/** optional captured app assets: use whichever exist */
async function probe(paths) {
  const ok = await Promise.all(paths.map(p => new Promise(res => { const i = new Image(); i.onload = () => res(p); i.onerror = () => res(null); i.src = p })))
  return ok.filter(Boolean)
}

async function boot() {
  const cards = await probe(Array.from({ length: 8 }, (_, i) => `assets/card-profile-${i + 1}.png`))
  const screens = await probe(['assets/screen-match.png', 'assets/screen-reveal.png', 'assets/screen-chat.png', 'assets/screen-deck.png'])
  const assets = { cards, screen: screens[0], screens }
  const mk = [
    [S.sceneImagine, {}],
    [S.sceneIntro, {}],
    [S.sceneVeil, {}],
    [S.sceneBirth, { fadeIn: 0.2 }],
    [S.sceneReading, { circle: 0.5 }],
    [S.sceneDeck, {}],
    [S.sceneTagline, {}],
    [S.sceneEnd, {}],
  ]
  const scenes = mk.map(([f, o], i) => { const s = f(stage, assets); s.root.style.zIndex = String(10 + i); stage.appendChild(fx); return Object.assign(s, o) })
  stage.appendChild(fx)
  await document.fonts.ready
  await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r })))

  window.seek = (t) => {
    for (const s of scenes) {
      const on = t >= s.start && t < s.end
      s.root.style.display = on ? 'block' : 'none'
      if (!on) continue
      s.update(t)
      if (s.fadeIn) s.root.style.opacity = String(prog(t, s.start, s.start + s.fadeIn))
      if (s.circle) {
        const p = ease.inOutQuad(prog(t, s.start, s.start + s.circle))
        s.root.style.clipPath = p >= 1 ? 'none' : `circle(${36 + p * 1150}px at 50% 50%)`
      }
    }
    ctx.clearRect(0, 0, 1920, 1080)
    S.fxStairWipe(ctx, t, { start: 2.95, dur: 0.6, color: '#ebe5dc' })
    if (t < 6.86) S.fxMound(ctx, t, { start: 6.15, dur: 0.7 })
    S.fxDots(ctx, t, { start: 17.2, dur: 0.75 })
    S.fxStairWipe(ctx, t, { start: 26.58, dur: 0.36, color: '#0b0620', fromBottom: true, seed: 9 })
  }
  window.ready = true

  if (!RENDER) {
    const hud = document.getElementById('hud')
    let t = Number(params.get('t') || 0), playing = !params.has('pause'), last = performance.now()
    addEventListener('keydown', e => {
      if (e.key === ' ') playing = !playing
      if (e.key === 'ArrowRight') t += e.shiftKey ? 1 : 1 / 30
      if (e.key === 'ArrowLeft') t -= e.shiftKey ? 1 : 1 / 30
      if (e.key === '0') t = 0
    })
    const loop = (now) => {
      if (playing) t += (now - last) / 1000
      last = now
      if (t >= DURATION) t = 0
      window.seek(t)
      hud.textContent = t.toFixed(2) + 's  [space] play/pause  [←/→] frame'
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
}
boot()
