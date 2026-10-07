/* Preview / export harness shared by every reel page. */
  const A = window.ALIGN
  if (location.hash === '#export') document.body.classList.add('export')
  A.ready.then(() => {
    window.__ready = true
    if (document.body.classList.contains('export')) return
    const scrub = document.getElementById('scrub'), tc = document.getElementById('tc'), btn = document.getElementById('play')
    const N = A.totalFrames()
    scrub.max = N - 1
    let playing = true, f = 0, last = performance.now(), acc = 0
    const audio = new Audio(A.TL.audio || 'out/soundtrack.wav'); audio.loop = false
    const t0 = parseFloat(new URLSearchParams(location.search).get('t') || '0'); f = Math.round(t0 * A.FPS)
    function show() { A.renderFrame(f); scrub.value = f; tc.textContent = (f / A.FPS).toFixed(2) + 's' }
    btn.onclick = () => { playing = !playing; btn.textContent = playing ? 'Pause' : 'Play'; if (playing) { audio.currentTime = f / A.FPS; audio.play().catch(() => {}) } else audio.pause() }
    scrub.oninput = () => { f = +scrub.value; audio.currentTime = f / A.FPS; show() }
    document.body.addEventListener('click', () => { if (playing && audio.paused) { audio.currentTime = f / A.FPS; audio.play().catch(() => {}) } }, { once: true })
    function loop(now) {
      if (playing) { acc += now - last; while (acc > 1000 / A.FPS) { acc -= 1000 / A.FPS; f = (f + 1) % N; if (f === 0) { audio.currentTime = 0 } } show() }
      last = now; requestAnimationFrame(loop)
    }
    show(); requestAnimationFrame(loop)
  })
