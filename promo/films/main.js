// Generic film player: promo/film.html?f=<name> loads promo/films/<name>/scenes/index.js (16:9).
// Every frame is a pure function of t: window.seek(t). Scenes and default-export build(stage) → { start, end, update(t), fx?(ctx, t), fadeIn? }.
// Later scenes stack above earlier ones; the #fx canvas sits on top of everything (transitions, stars).
import { prog } from '../src/lib.js'
import { W, H } from '../src/scenes/common.js'

const stage = document.getElementById('stage'), fx = document.getElementById('fx'), ctx = fx.getContext('2d')
const params = new URLSearchParams(location.search)
const FILM = await import(`./${params.get('f')}/scenes/index.js`)
const { SCENES } = FILM
let { DURATION } = FILM
const { socialEnd } = await import('./social.js')
const RENDER = params.has('render')
const SPEED = Number(params.get('speed') || 1)   // render.mjs --calm: the whole film plays slower (0.8 = 25% longer)
if (RENDER) document.body.classList.add('render')
stage.style.width = fx.style.width = W + 'px'; stage.style.height = fx.style.height = H + 'px'; fx.width = W; fx.height = H
const fit = () => { const s = RENDER ? 1 : Math.min(innerWidth / W, innerHeight / H); window.__stageScale = s; stage.style.transform = `scale(${s})` }
fit(); addEventListener('resize', fit)

async function boot() {
  window.DURATION = DURATION / SPEED
  await Promise.all(['800 100px Inter', '900 100px Inter', '700 100px Inter', 'italic 500 100px "EB Garamond"', 'italic 600 100px "EB Garamond"', 'bold 58px "EB Garamond"', '700 30px "Space Mono"'].map(f => document.fonts.load(f).catch(() => {})))
  const scenes = []
  for (const [i, build] of SCENES.entries()) { const s = await build(stage); s.root && (s.root.style.zIndex = String(10 + i)); scenes.push(s) }
  stage.appendChild(fx)
  // ?pad=<scale> (social cut): the film's sky fills the WHOLE frame, the story (every scene layer + fx) is scaled into the
  // middle and its edges fade into that full-frame sky, so the app's UI never covers the story. No blur, no box.
  let padSky = null, overlayParent = stage
  if (params.has('pad')) {
    // the whole #stage (all scene layers, so show kits' own camera moves still work) is scaled into the middle and
    // masked soft at the edges; a full-frame sky + grain sits behind it in <body>; hook + watermark go on top, full size
    const P = Number(params.get('pad')) || 0.66
    const { drawSky, drawGrain, layerCanvas } = await import('./sky.js')
    const { SKY_H, GRAIN_H } = await import('./wheel.js')
    const fe = 130
    const g = d => `linear-gradient(${d}, transparent 0, #000 ${fe}px, #000 calc(100% - ${fe}px), transparent 100%)`
    Object.assign(stage.style, { transformOrigin: '50% 50%', transform: `translateY(-30px) scale(${P})`, zIndex: '5',
      maskImage: `${g('to right')}, ${g('to bottom')}`, webkitMaskImage: `${g('to right')}, ${g('to bottom')}`, maskComposite: 'intersect', webkitMaskComposite: 'source-in' })
    removeEventListener('resize', fit)
    const back = document.createElement('div'); Object.assign(back.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px', zIndex: '1', overflow: 'hidden' })
    document.body.insertBefore(back, stage)
    const sk = layerCanvas(back).getContext('2d'), gk = layerCanvas(back, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
    const front = document.createElement('div'); Object.assign(front.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px', zIndex: '6', pointerEvents: 'none' })
    document.body.appendChild(front); overlayParent = front
    padSky = t => { drawSky(sk, t, SKY_H); drawGrain(gk, t) }
  }
  // social mode: the film ends where its story ends (the end card's start); films may also export STORY_END
  if (params.has('social')) { const e = Math.min(socialEnd.t, FILM.STORY_END ?? Infinity); if (e < DURATION) { DURATION = e; window.DURATION = DURATION / SPEED } }
  // HOOK: a TikTok/Instagram-style hook caption, fully on screen from frame 1 (no animation) until HOOK_UNTIL (film s).
  //   export const HOOK = 'Gemini is on trial | for a *meme.*'   (' | ' = line break, *word* = yellow accent)
  //   export const HOOK_STYLE = 'outline' (white, thick black outline) | 'box' (white on a solid black box) | 'light' (black on white)
  //   export const HOOK_UNTIL = 3.5 · HOOK_TOP = 260 (px from the top of the 1080×1920 frame)
  // social mode: a faint invite under the picture, the only Align mark (replaces end cards and CTAs)
  if (params.has('social') && FILM.WATERMARK !== false) {
    const wm = document.createElement('div')
    wm.textContent = '✦ come align · join the beta ✦'
    wm.style.cssText = "position:absolute;left:0;right:0;bottom:" + (params.has('pad') ? 250 : 46) + "px;z-index:2999;text-align:center;font:700 34px 'Space Mono',ui-monospace,monospace;letter-spacing:.16em;color:#efe6d6;opacity:.34;pointer-events:none;white-space:nowrap"
    overlayParent.appendChild(wm)
  }
  if (FILM.HOOK) {
    const st = FILM.HOOK_STYLE || 'outline', esc = v => v.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
    const lines = String(FILM.HOOK).split('|').map(l => esc(l.trim()).replace(/\*([^*]+)\*/g, (_, w) => `<span class="hk-acc">${w}</span>`))
    const hk = document.createElement('div'); hk.className = 'hk hk-' + st
    hk.innerHTML = lines.map(l => `<div class="hk-line"><span>${l}</span></div>`).join('')
    const css = document.createElement('style')
    css.textContent = `.hk{position:absolute;left:0;right:0;top:${params.has('pad') ? 232 : (FILM.HOOK_TOP ?? 260)}px;z-index:3000;text-align:center;font:900 84px/1.14 Inter,'Helvetica Neue',Arial,sans-serif;pointer-events:none}
      .hk-line{margin:0 auto 10px;max-width:960px}
      .hk-outline span{color:#fff;text-shadow:7.0px 0.0px 0 #000,6.5px 2.7px 0 #000,4.9px 4.9px 0 #000,2.7px 6.5px 0 #000,-0.0px 7.0px 0 #000,-2.7px 6.5px 0 #000,-4.9px 4.9px 0 #000,-6.5px 2.7px 0 #000,-7.0px -0.0px 0 #000,-6.5px -2.7px 0 #000,-4.9px -4.9px 0 #000,-2.7px -6.5px 0 #000,0.0px -7.0px 0 #000,2.7px -6.5px 0 #000,4.9px -4.9px 0 #000,6.5px -2.7px 0 #000,0 9px 0 #000}
      .hk-outline .hk-acc{color:#ffd23a}
      .hk-box span{display:inline;color:#fff;background:#000;padding:6px 22px;border-radius:18px;box-decoration-break:clone;-webkit-box-decoration-break:clone;line-height:1.42}
      .hk-box .hk-acc{color:#ffd23a;padding:0;background:none}
      .hk-light span{display:inline;color:#111;background:#fff;padding:6px 22px;border-radius:18px;box-decoration-break:clone;-webkit-box-decoration-break:clone;line-height:1.42}
      .hk-light .hk-acc{color:#b8008f;padding:0;background:none}`
    document.head.appendChild(css); overlayParent.appendChild(hk)
    window.__hook = { el: hk, until: FILM.HOOK_UNTIL ?? 3.5 }
  }
  await document.fonts.ready
  await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r })))
  window.seek = (t) => {
    t *= SPEED
    for (const s of scenes) {
      const on = t >= s.start && t < s.end
      if (s.root) s.root.style.display = on ? 'block' : 'none'
      if (!on) continue
      s.update(t)
      if (s.root && s.fadeIn) s.root.style.opacity = String(prog(t, s.start, s.start + s.fadeIn))
    }
    ctx.clearRect(0, 0, W, H)
    if (padSky) padSky(t)
    if (window.__hook) window.__hook.el.style.display = t < window.__hook.until ? 'block' : 'none'
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
