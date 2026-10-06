/* Align reel — compositor. renderFrame(i) draws frame i onto #stage. */
(function () {
  const A = window.ALIGN
  const { W, H } = A
  const stage = document.getElementById('stage')
  stage.width = W; stage.height = H
  const out = stage.getContext('2d')
  const bgC = A.makeCanvas(W, H), fgC = A.makeCanvas(W, H)
  const bg = bgC.getContext('2d'), fg = fgC.getContext('2d')

  /** global flash/shake hooks scenes can set per frame */
  A.fx = { flash: 0, shake: 0, flashColor: '#ffffff', halftoneCell: 9 }

  A.renderFrame = function (frame) {
    const T = frame / A.FPS
    A.fx.flash = 0; A.fx.shake = 0; A.fx.flashColor = '#ffffff'; A.fx.halftoneCell = 9; A.fx.halftone = true
    bg.setTransform(1, 0, 0, 1, 0, 0); fg.setTransform(1, 0, 0, 1, 0, 0)
    bg.globalAlpha = 1; fg.globalAlpha = 1
    bg.globalCompositeOperation = 'source-over'; fg.globalCompositeOperation = 'source-over'
    bg.fillStyle = '#000'; bg.fillRect(0, 0, W, H)
    fg.clearRect(0, 0, W, H)

    for (const s of A.scenes) {
      if (T < s.start || T >= s.start + s.duration) continue
      const t = T - s.start
      const env = { bg, fg, t, p: t / s.duration, T, frame, W, H, dur: s.duration }
      bg.save(); fg.save()
      try { s.draw(env) } catch (e) { console.error(`[scene ${s.id}]`, e) }
      bg.restore(); fg.restore()
    }

    // 1. ink: deep indigo-black paper
    out.setTransform(1, 0, 0, 1, 0, 0)
    out.globalAlpha = 1
    out.globalCompositeOperation = 'source-over'
    out.fillStyle = '#07040f'
    out.fillRect(0, 0, W, H)
    const sh = A.fx.shake
    const sx = sh ? (A.hash(frame * 3.1) - 0.5) * sh : 0, sy = sh ? (A.hash(frame * 7.7) - 0.5) * sh : 0
    out.translate(sx, sy)
    // 2. background through the halftone screen
    if (A.fx.halftone) A.halftone(out, bgC, { cell: A.fx.halftoneCell })
    else out.drawImage(bgC, 0, 0)
    // 3. foreground with a hair of riso misregistration
    out.save()
    out.globalAlpha = 0.35
    out.globalCompositeOperation = 'lighter'
    out.filter = 'hue-rotate(-25deg)'
    out.drawImage(fgC, -3, 2)
    out.restore()
    out.drawImage(fgC, 0, 0)
    out.setTransform(1, 0, 0, 1, 0, 0)
    // 4. flash, vignette, grain
    if (A.fx.flash > 0) { out.save(); out.globalAlpha = A.clamp(A.fx.flash); out.fillStyle = A.fx.flashColor; out.fillRect(0, 0, W, H); out.restore() }
    A.vignette(out, 0.55)
    A.grain(out, frame, 0.18)
  }

  A.totalFrames = () => Math.round(A.TL.duration * A.FPS)
  A.ready = document.fonts.ready.then(() => Promise.all([
    "500 40px 'EB Garamond'", "italic 400 40px 'EB Garamond'", "600 40px 'EB Garamond'", "400 40px 'Space Mono'", "700 40px 'Space Mono'",
  ].map((f) => document.fonts.load(f))))
})()
