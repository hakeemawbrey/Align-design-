// ogcut: OG social-cut helpers for this film only (Moonlight Lane S2). The story keeps its own clock (story time);
// the render runs on film time, with the "previously on" + title-card window cut out and the end on the lane tag.
//   ogCut([[a, b], …])  cut story windows [a, b): .t(film) → story, .ft(story) → film (inside a cut → its start),
//                       .cues(list) remaps a CUES list (cues inside a cut are dropped), .end(story) → film time.
//   stub()              an element that is never shown (no series bug, title card, previously-on, next-time card).
//   advLayer(root, ADVISE, buildAdvise, s)  THE STARS ADVISE scaled into the safe zone (y ~255–1545), on its own
//                       full-frame gradient so the scaled panel has no visible edge.
export function ogCut(cuts) {
  const t = f => { let s = f; for (const [a, b] of cuts) if (s >= a) s += b - a; return s }
  const map = s => { let f = s; for (const [a, b] of cuts) { if (s >= b) f -= b - a; else if (s >= a) return null } return f }
  const ft = s => { const f = map(s); if (f != null) return f; const c = cuts.find(([a, b]) => s >= a && s < b); return map(c[0] - 1e-6) }
  const TWO = new Set(['glitter', 'riser', 'vinyl', 'swell', 'strings'])
  const r3 = v => Math.round(v * 1000) / 1000
  const cues = list => list.flatMap(c => {
    const t0 = map(c[1]); if (t0 == null) return []
    const o = [...c]; o[1] = r3(t0)
    if (TWO.has(c[0]) && typeof c[2] === 'number') { const t1 = map(c[2]); o[2] = t1 == null ? r3(t0 + 0.3) : r3(t1) }
    return [o]
  })
  return { t, ft, cues, end: s => r3(ft(s)) }
}
export const stub = () => ({ update() {}, on: () => false })

const clamp01 = v => Math.max(0, Math.min(1, v))
const inOutQuad = p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
export function advLayer(root, ADVISE, buildAdvise, s = 0.82) {
  const OUT = ADVISE.out || [ADVISE.at + 20, ADVISE.at + 20.3]
  const back = document.createElement('div')
  Object.assign(back.style, { position: 'absolute', left: '0', top: '0', width: '1080px', height: '1920px', display: 'none', pointerEvents: 'none',
    background: 'linear-gradient(180deg, #070c2e 0%, #0e1850 60%, #141a5a 100%)' })
  root.appendChild(back)
  const wrap = document.createElement('div')
  Object.assign(wrap.style, { position: 'absolute', left: '0', top: '0', width: '1080px', height: '1920px', pointerEvents: 'none',
    transformOrigin: '50% 0', transform: `translateY(${(255 - 170 * s).toFixed(1)}px) scale(${s})` })
  root.appendChild(wrap)
  const adv = buildAdvise(wrap, ADVISE)
  return {
    update(t) {
      const on = t >= ADVISE.at && t < OUT[1]
      back.style.display = on ? 'block' : 'none'
      if (on) back.style.opacity = String(inOutQuad(clamp01((t - ADVISE.at) / 0.6)) * (1 - clamp01((t - OUT[0]) / (OUT[1] - OUT[0]))))
      adv.update(t)
    },
  }
}

// liftScene: the whole scene canvas sits 160 px higher (so the dialogue box clears the characters and the box clears
// the app's caption band); the bottom strip is the scene's own ground, mirrored. Call the returned fn after drawing.
export function liftScene(cv, dy = 160) {
  cv.style.transform = `translateY(-${dy}px)`
  const f = document.createElement('canvas'); f.width = 1080; f.height = dy
  Object.assign(f.style, { position: 'absolute', left: '0', top: (1920 - dy) + 'px', width: '1080px', height: dy + 'px', pointerEvents: 'none' })
  cv.after(f)
  const fx = f.getContext('2d')
  return () => { fx.save(); fx.setTransform(1, 0, 0, -1, 0, dy); fx.drawImage(cv, 0, 1920 - dy, 1080, dy, 0, 0, 1080, dy); fx.restore() }
}
