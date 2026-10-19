// Two entry points over one engine:
//  - the player: deals reels forever, plays them live with sound, records one
//  - render mode (?render): exposes window.ZEXE for the headless exporter
import { createReelRenderer } from './reel.js'
import { scheduleSoundtrack, renderSoundtrackOffline } from './audio.js'
import { loadLibrary, makeDealer } from './library.js'
import { SIGNS, GLYPH, captionFor } from './signs.js'
import { createExporter } from './exporter.js'
import { createApprovals, saveFile, zipAll, baseName, glyphFor } from './approvals.js'

const params = new URLSearchParams(location.search)

if (params.has('render')) {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const W = +(params.get('w') || 1080), H = +(params.get('h') || 1920)
  const reel = createReelRenderer(canvas, { width: W, height: H, internal: +(params.get('internal') || 0.5) })
  let plan = null
  window.ZEXE = {
    async prepare(item, opts = {}) {
      const r = await reel.load(item, opts)
      plan = r.plan
      return { duration: r.duration, world: r.world, caption: captionFor(item) }
    },
    async audio() {
      const wav = await renderSoundtrackOffline(plan)
      let s = ''
      for (let i = 0; i < wav.length; i += 0x8000) s += String.fromCharCode.apply(null, wav.subarray(i, i + 0x8000))
      return btoa(s)
    },
    frame(t, quality = 0.92) {
      reel.renderAt(t)
      return canvas.toDataURL('image/jpeg', quality).slice(23)
    },
  }
  window.ZEXE_READY = true
} else {
  startPlayer()
}

async function startPlayer() {
  const $ = (s) => document.querySelector(s)
  const canvas = $('#reel')
  const reel = createReelRenderer(canvas, { width: 720, height: 1280, internal: 0.62 })
  const lines = await loadLibrary()
  const dealer = makeDealer(lines)
  const handle = $('#handle')

  let audio = null
  let mix = null
  let current = null
  let duration = 8
  let plan = null
  let startedAt = 0
  let paused = false
  let pausedAt = 0
  let history = []
  let hIndex = -1
  let soundOn = false
  let currentWorld = ''

  const now = () => (audio && soundOn ? audio.currentTime : performance.now() / 1000)

  // Sign chips
  const chips = $('#signs')
  for (const s of ['all', ...SIGNS]) {
    const b = document.createElement('button')
    b.className = 'chip'
    b.type = 'button'
    b.dataset.sign = s
    b.id = 'sign-' + s
    b.title = s
    b.innerHTML = s === 'all' ? '<span class="g">✦</span><span>all</span>' : `<span class="g">${GLYPH[s]}&#xFE0E;</span><span>${s}</span>`
    b.addEventListener('click', () => {
      dealer.setFilter({ sign: s })
      syncChips()
      next()
    })
    chips.appendChild(b)
  }
  const syncChips = () => {
    for (const b of chips.children) b.setAttribute('aria-pressed', String(b.dataset.sign === dealer.filter.sign))
    for (const b of document.querySelectorAll('[data-topic]')) b.setAttribute('aria-pressed', String(b.dataset.topic === dealer.filter.topic))
    $('#poolcount').textContent = `${dealer.count()} lines in this deck`
  }
  for (const b of document.querySelectorAll('[data-topic]')) {
    b.addEventListener('click', () => {
      dealer.setFilter({ topic: b.dataset.topic })
      syncChips()
      next()
    })
  }
  syncChips()
  $('#total').textContent = String(lines.length)

  async function play(item) {
    current = item
    const r = await reel.load(item, { handle: handle.value.trim() })
    duration = r.duration
    plan = r.plan
    currentWorld = r.world
    startedAt = now()
    paused = false
    $('#pause').textContent = 'Pause'
    $('#nowtitle').textContent = `${item.sign}.exe`
    $('#world').textContent = r.world
    $('#topic').textContent = item.topic === 'love' ? 'love' : 'self'
    $('#line').textContent = item.text
    $('#caption').value = captionFor(item)
    syncDecision()
    if (soundOn) scheduleSoundtrack(audio, mix, plan, audio.currentTime + 0.02)
  }

  function next() {
    const item = dealer.next()
    if (!item) return
    history = history.slice(0, hIndex + 1)
    history.push(item)
    hIndex = history.length - 1
    play(item)
  }
  function prev() {
    if (hIndex > 0) play(history[--hIndex])
  }

  function frame() {
    requestAnimationFrame(frame)
    if (!current) return
    const t = paused ? pausedAt : now() - startedAt
    if (t >= duration && !paused) {
      if ($('#auto').checked) {
        if (hIndex < history.length - 1) play(history[++hIndex])
        else next()
      } else {
        startedAt = now()
        if (soundOn) scheduleSoundtrack(audio, mix, plan, audio.currentTime + 0.02)
      }
      return
    }
    reel.renderAt(Math.max(0, t))
    $('#bar').style.transform = `scaleX(${Math.min(1, t / duration)})`
  }

  async function enableSound() {
    if (!audio) {
      audio = new AudioContext()
      mix = audio.createGain()
      mix.connect(audio.destination)
    }
    await audio.resume()
    soundOn = true
    $('#sound').textContent = 'Sound on'
    $('#sound').setAttribute('aria-pressed', 'true')
    if (current) play(current)
  }
  function disableSound() {
    soundOn = false
    audio?.suspend()
    $('#sound').textContent = 'Sound off'
    $('#sound').setAttribute('aria-pressed', 'false')
    if (current) play(current)
  }

  $('#start').addEventListener('click', async () => {
    $('#gate').hidden = true
    await enableSound()
  })
  $('#gate-mute').addEventListener('click', () => {
    $('#gate').hidden = true
  })
  $('#sound').addEventListener('click', () => (soundOn ? disableSound() : enableSound()))
  $('#next').addEventListener('click', next)
  $('#prev').addEventListener('click', prev)
  $('#pause').addEventListener('click', () => {
    if (!paused) {
      pausedAt = now() - startedAt
      paused = true
      audio?.suspend()
      $('#pause').textContent = 'Play'
    } else {
      startedAt = now() - pausedAt
      paused = false
      if (soundOn) audio.resume()
      $('#pause').textContent = 'Pause'
    }
  })
  $('#replay').addEventListener('click', () => current && play(current))
  handle.addEventListener('change', () => current && play(current))
  $('#copy').addEventListener('click', async () => {
    const ta = $('#caption')
    try {
      await navigator.clipboard.writeText(ta.value)
      $('#copy').textContent = 'Copied'
    } catch {
      ta.select()
      $('#copy').textContent = 'Selected, press Ctrl+C'
    }
    setTimeout(() => ($('#copy').textContent = 'Copy caption'), 1600)
  })

  // ---- review: approve or skip, and the approved tray ----
  const approvals = await createApprovals()
  const exporter = createExporter({ onProgress: (job, p) => setJob(job.item.seed, { status: 'rendering', progress: p }) })
  const jobs = new Map() // seed -> { status, progress, blob, ext, job }
  const setJob = (seed, patch) => {
    jobs.set(String(seed), { ...(jobs.get(String(seed)) || {}), ...patch })
    renderTray(approvals.rows)
  }
  const makeVideo = (row) => {
    const seed = String(row.seed)
    const j = jobs.get(seed)
    if (j && j.status !== 'error') return
    if (!exporter.supported) return setJob(seed, { status: 'error', error: 'This browser can’t record video. Try Chrome or Edge.' })
    const job = exporter.add({ ...row, seed }, { handle: handle.value.trim() })
    setJob(seed, { status: 'queued', progress: 0, job })
    job.promise.then(
      ({ blob, ext }) => setJob(seed, { status: 'ready', blob, ext }),
      (e) => setJob(seed, { status: 'error', error: e?.message || 'Recording failed' }),
    )
  }

  function syncDecision() {
    const kept = current && approvals.has(current)
    $('#approve').setAttribute('aria-pressed', String(!!kept))
    $('#approve span').textContent = kept ? '✓ Approved' : '✓ Approve'
  }

  async function approve() {
    if (!current) return
    const item = current
    if (!approvals.has(item)) {
      flash('Approved')
      next()
      await approvals.add(item, currentWorld)
      if ($('#autovideo').checked) makeVideo(item)
      return
    }
    next()
  }
  function skip() {
    flash('Skipped')
    next()
  }
  let flashTimer = 0
  function flash(text) {
    const el = $('#flash')
    el.textContent = text
    el.dataset.kind = text === 'Approved' ? 'ok' : 'skip'
    el.hidden = false
    clearTimeout(flashTimer)
    flashTimer = setTimeout(() => (el.hidden = true), 650)
  }
  $('#approve').addEventListener('click', approve)
  $('#skip').addEventListener('click', skip)

  const statusText = (j) => {
    if (!j) return 'Video not made yet'
    if (j.status === 'queued') return 'Waiting to make video…'
    if (j.status === 'rendering') return `Making video ${Math.round((j.progress || 0) * 100)}%`
    if (j.status === 'ready') return `Ready · ${(j.blob.size / 1e6).toFixed(1)} MB .${j.ext}`
    return j.error || 'Could not make the video'
  }

  function renderTray(rows) {
    $('#approvedcount').textContent = String(rows.length)
    const ready = rows.filter((r) => jobs.get(String(r.seed))?.status === 'ready').length
    $('#saveall').textContent = ready ? `Save ${ready} as .zip` : 'Save all as .zip'
    $('#saveall').disabled = !ready
    $('#makeall').disabled = !rows.some((r) => !jobs.has(String(r.seed)))
    $('#exportlist').disabled = !rows.length
    $('#tray-empty').hidden = rows.length > 0
    $('#tray').replaceChildren(
      ...rows.map((r) => {
        const j = jobs.get(String(r.seed))
        const li = document.createElement('li')
        li.className = 'item'
        const g = document.createElement('span')
        g.className = 'g'
        g.textContent = glyphFor(r.sign)
        const body = document.createElement('div')
        body.className = 'rowbody'
        const t = document.createElement('p')
        t.className = 'rowtext'
        t.textContent = r.text
        const st = document.createElement('span')
        st.className = 'rowstatus' + (j?.status === 'ready' ? ' ok' : j?.status === 'error' ? ' bad' : '')
        st.textContent = statusText(j)
        body.append(t, st)
        if (j?.status === 'rendering' || j?.status === 'queued') {
          const bar = document.createElement('span')
          bar.className = 'rowbar'
          bar.style.setProperty('--p', String(j.progress || 0))
          body.append(bar)
        }
        const acts = document.createElement('div')
        acts.className = 'rowacts'
        const btn = (label, fn, cls = '') => {
          const b = document.createElement('button')
          b.type = 'button'
          b.className = 'btn small ' + cls
          b.textContent = label
          b.addEventListener('click', fn)
          return b
        }
        if (j?.status === 'ready') {
          acts.append(btn('Save', async (e) => {
            const b = e.currentTarget
            try {
              const res = await saveFile(`${baseName(r)}.${j.ext}`, j.blob)
              if (res === 'saved') b.textContent = 'Saved ✓'
            } catch {
              b.textContent = 'Couldn’t save'
            }
          }, 'primary'))
        } else if (!j || j.status === 'error') {
          acts.append(btn('Make video', () => makeVideo(r)))
        }
        acts.append(btn('Play', () => {
          history = history.slice(0, hIndex + 1)
          history.push({ ...r })
          hIndex = history.length - 1
          play({ ...r })
        }))
        acts.append(btn('Remove', () => {
          const jj = jobs.get(String(r.seed))
          if (jj?.job) exporter.cancel(jj.job)
          jobs.delete(String(r.seed))
          approvals.remove(r.key)
        }))
        li.append(g, body, acts)
        return li
      }),
    )
    if (current) syncDecision()
  }
  approvals.onChange(renderTray)
  $('#storenote').textContent = approvals.shared
    ? 'Approvals are saved with this page, so they’re here next time too.'
    : 'Approvals are saved in this browser.'

  $('#makeall').addEventListener('click', () => approvals.rows.forEach((r) => makeVideo(r)))
  $('#saveall').addEventListener('click', async () => {
    const entries = approvals.rows
      .map((r) => ({ item: r, j: jobs.get(String(r.seed)) }))
      .filter((e) => e.j?.status === 'ready')
      .map((e) => ({ item: e.item, blob: e.j.blob, ext: e.j.ext }))
    if (!entries.length) return
    const b = $('#saveall')
    b.disabled = true
    b.textContent = 'Zipping…'
    try {
      const zip = await zipAll(entries)
      await saveFile(`align-reels-${new Date().toISOString().slice(0, 10)}.zip`, zip)
    } catch {
      // no zip library here: hand them over one at a time instead
      for (const e of entries) await saveFile(`${baseName(e.item)}.${e.ext}`, e.blob).catch(() => {})
    }
    renderTray(approvals.rows)
  })
  $('#exportlist').addEventListener('click', () => saveFile('approved.json', approvals.exportList()))

  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return
    if (e.metaKey || e.ctrlKey || e.altKey) return
    const k = e.key.toLowerCase()
    if (k === 'a' || e.key === 'ArrowUp') {
      e.preventDefault()
      approve()
    }
    if (k === 's' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      skip()
    }
    if (e.key === 'ArrowLeft') prev()
    if (e.key === ' ') {
      e.preventDefault()
      $('#pause').click()
    }
  })

  next()
  frame()
}
