// Align Wisdom, live: the same engine as the MP4s, playing forever in a
// browser. One sign at a time, every sign in its own colour, each reel a new
// seed. The browser's own voice speaks (word boundaries move the typing when
// the voice reports them; otherwise the timing is estimated), and a small
// WebAudio chiptune plays underneath.

import { createEngine } from './engine.js'
import { SIGNS, compose, plain, lineWords, pagesOf } from './bank.mjs'
import GLYPHS from './glyphs.js'

const LEAD_FIRST = 0.9, LEAD = 0.55, TAIL = 0.7, END_HOLD = 2.6, OUTRO = 0.6
const $ = (s) => document.querySelector(s)
const canvas = $('#c')
const eng = createEngine(canvas, { glyphs: GLYPHS })

const store = {
  get(k, d) { try { const v = localStorage.getItem('wisdom:' + k); return v === null ? d : JSON.parse(v) } catch { return d } },
  set(k, v) { try { localStorage.setItem('wisdom:' + k, JSON.stringify(v)) } catch { /* private window */ } },
}
const state = {
  n: store.get('n', Math.floor(Math.random() * 12)),   // position in the endless order
  lock: store.get('lock', null),                       // a sign id, or null = rotate through all twelve
  voice: store.get('voice', true),
  music: store.get('music', true),
  voiceName: store.get('voiceName', ''),
  paused: false,
  started: false,
}
const seeds = store.get('seeds', {})                    // per sign, how many reels it has had

// ───────────── clock that can pause
let base = 0, pausedAt = 0
const now = () => (state.paused ? pausedAt : (performance.now() / 1000) - base)

// ───────────── the reel being played
let reel, TL, page, words, utter, guard
function nextReel() {
  const id = state.lock || SIGNS[state.n % 12].id
  const seed = seeds[id] ?? Math.floor(Math.random() * 400)
  seeds[id] = seed + 1
  store.set('seeds', seeds)
  if (!state.lock) { state.n++; store.set('n', state.n) }
  reel = compose(id, seed)
  const pages = pagesOf(reel)
  TL = { intro: true, outro: true, duration: Infinity, beats: [], lines: [] }
  pages.forEach((p, i) => {
    TL.beats.push({ kind: p.kind, start: i ? Infinity : 0, at: i ? Infinity : LEAD_FIRST, end: Infinity, text: plain(p.text) })
    TL.lines.push({ beat: i, words: lineWords(p.text).map((w) => ({ ...w, s: Infinity, e: Infinity })) })
  })
  eng.load(reel, TL)
  page = -1
  base = performance.now() / 1000; pausedAt = 0
  if (state.paused) pausedAt = 0
  paintChips()
  music.key(SIGNS.findIndex((s) => s.id === id))
  $('#caption').textContent = `${reel.hook.replace(/\*/g, '')}`
}

// estimate when each word is said: proportional to its letters, plus pauses at punctuation
function estimate(i, from) {
  const ws = TL.lines[i].words
  const rate = 13.5 * (utter?.rate || 1)   // characters a second
  let t = from
  for (const w of ws) {
    const d = Math.max(0.16, (w.w.length + 1) / rate)
    w.s = t; w.e = t + d * 0.92
    t += d + (/[.,;:?]$/.test(w.w) ? 0.28 : 0)
  }
  eng.retime()
  return t
}

function startPage(i) {
  page = i
  const b = TL.beats[i]
  const at = b.at
  const estEnd = estimate(i, at)
  words = { i, estEnd, done: false, blip: 0 }
  music.chirp()
  if (state.voice && 'speechSynthesis' in window) {
    const text = b.text
    // where each word starts in the spoken text, so boundary events can find it
    const offs = []
    let p = 0
    for (const w of TL.lines[i].words) { p = text.indexOf(w.w, p); offs.push(p); p += w.w.length }
    utter = new SpeechSynthesisUtterance(text)
    const v = pickVoice()
    if (v) { utter.voice = v; utter.lang = v.lang }
    utter.rate = 0.95; utter.pitch = 1.05
    let spokeAt = null
    utter.onstart = () => { spokeAt = now(); const d = spokeAt - at; if (Math.abs(d) > 0.05) shift(i, 0, d) }
    utter.onboundary = (e) => {
      if (e.name && e.name !== 'word') return
      let k = 0
      while (k + 1 < offs.length && offs[k + 1] <= e.charIndex) k++
      const d = now() - TL.lines[i].words[k].s
      shift(i, k, d)
    }
    utter.onend = () => finishPage(i, now())
    utter.onerror = () => finishPage(i, Math.max(now(), words.estEnd))
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
    // some voices never fire onend: give up waiting after a while
    guard = { i, at: estEnd + 4 }
  } else {
    guard = { i, at: estEnd, silent: true }
  }
}

function shift(i, from, d) {
  const ws = TL.lines[i].words
  for (let k = from; k < ws.length; k++) { ws[k].s += d; ws[k].e += d }
  words.estEnd = ws[ws.length - 1].e
  if (guard && guard.i === i) guard.at = Math.max(guard.at, words.estEnd + (guard.silent ? 0 : 4))
  eng.retime()
}

function finishPage(i, t) {
  if (i !== page || TL.beats[i].end !== Infinity) return
  const ws = TL.lines[i].words
  // the voice is done: anything still untyped finishes now
  for (const w of ws) if (w.s > t) { w.s = t; w.e = t + 0.05 } else if (w.e > t + 0.3) w.e = t
  const last = i === TL.beats.length - 1
  const end = Math.max(t, ws[ws.length - 1].e) + (last ? END_HOLD : TAIL)
  TL.beats[i].end = end
  if (last) { TL.duration = end + OUTRO; music.coin() }
  else { TL.beats[i + 1].start = end; TL.beats[i + 1].at = end + LEAD }
  eng.retime()
}

function tick() {
  requestAnimationFrame(tick)
  const t = now()
  if (state.started && !state.paused) {
    if (page < TL.beats.length - 1 && t >= TL.beats[page + 1].at) startPage(page + 1)
    if (guard && guard.i === page && t >= guard.at) { guard = null; finishPage(page, t) }
    // a soft blip as each word starts typing
    if (page >= 0 && state.music) {
      const ws = TL.lines[page].words
      while (words.blip < ws.length && ws[words.blip].s <= t) { music.blip(words.blip); words.blip++ }
    }
    if (t >= TL.duration) nextReel()
  }
  eng.paint(t)
}

// ───────────── voices
let VOICES = []
function loadVoices() {
  VOICES = ('speechSynthesis' in window ? speechSynthesis.getVoices() : []).filter((v) => /^en/i.test(v.lang))
  const sel = $('#voice-pick')
  sel.innerHTML = ''
  const best = pickVoice()
  for (const v of VOICES) {
    const o = document.createElement('option')
    o.value = v.name; o.textContent = `${v.name.replace(/^(Microsoft|Google)\s+/, '')} (${v.lang})`
    if (best && v.name === best.name) o.selected = true
    sel.appendChild(o)
  }
  sel.hidden = !VOICES.length
}
function pickVoice() {
  if (!VOICES.length) return null
  const chosen = VOICES.find((v) => v.name === state.voiceName)
  if (chosen) return chosen
  const prefer = ['Ava', 'Samantha', 'Allison', 'Aria', 'Jenny', 'Serena', 'Google US English', 'Karen', 'Moira', 'Zira']
  for (const p of prefer) { const v = VOICES.find((x) => x.name.includes(p)); if (v) return v }
  return VOICES.find((v) => v.localService) || VOICES[0]
}

// ───────────── music: a tiny chiptune, in each sign's key
const music = (() => {
  let ac, out, timer, key = 0, step = 0, nextAt = 0
  const MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10]
  const PROG = [0, 5, 3, 4]
  let scale = MAJ
  const hz = (m) => 440 * 2 ** ((m - 69) / 12)
  const note = (d, oct = 0) => 60 + (key > 6 ? key - 12 : key) + scale[((d % 7) + 7) % 7] + 12 * Math.floor(d / 7) + 12 * oct
  function voice(f, t, dur, gain, type = 'square', dest = out) {
    const o = ac.createOscillator(), g = ac.createGain()
    o.type = type; o.frequency.value = f
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(gain, t + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(dest); o.start(t); o.stop(t + dur + 0.02)
  }
  function schedule() {
    if (!ac) return
    const beat = 60 / 84
    while (nextAt < ac.currentTime + 0.3) {
      const bar = Math.floor(step / 8), deg = PROG[bar % 4], i = step % 8
      const ch = [deg, deg + 2, deg + 4, deg + 7]
      voice(hz(note(ch[[0, 1, 2, 1, 3, 2, 1, 2][i]], 1)), nextAt, beat * 0.45, 0.035)
      if (i === 0 || i === 4) voice(hz(note(deg, -1)), nextAt, beat * 1.6, 0.09, 'triangle')
      nextAt += beat / 2
      step++
    }
  }
  return {
    start() {
      if (ac) return
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return
      ac = new AC()
      out = ac.createGain(); out.gain.value = state.music ? 0.55 : 0
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400
      out.connect(lp).connect(ac.destination)
      nextAt = ac.currentTime + 0.1
      timer = setInterval(schedule, 80)
    },
    // earth and water signs (Taurus, Cancer, Virgo, ...) play in minor
    key(k) { key = k; scale = k % 2 ? MIN : MAJ },
    on(v) { if (out) out.gain.setTargetAtTime(v ? 0.55 : 0, ac.currentTime, 0.05) },
    suspend(v) { if (ac) v ? ac.suspend() : ac.resume() },
    blip(i) { if (ac && state.music) voice(hz(note([0, 2, 4, 2, 1, 4][i % 6], 2)), ac.currentTime, 0.04, 0.02) },
    chirp() { if (ac && state.music) { voice(hz(note(4, 1)), ac.currentTime, 0.06, 0.03); voice(hz(note(7, 1)), ac.currentTime + 0.06, 0.07, 0.03) } },
    coin() { if (ac && state.music) { voice(hz(note(4, 2)), ac.currentTime, 0.1, 0.05); voice(hz(note(9, 2)), ac.currentTime + 0.08, 0.5, 0.05) } },
    stopTimer() { clearInterval(timer) },
  }
})()

// ───────────── controls
function paintChips() {
  const cur = reel ? reel.sign : null
  document.querySelectorAll('.chip').forEach((b) => {
    const id = b.dataset.sign
    b.setAttribute('aria-pressed', String(id === 'all' ? !state.lock : state.lock === id))
    b.classList.toggle('now', id === cur)
  })
  const S = SIGNS.find((s) => s.id === cur)
  if (S) {
    document.documentElement.style.setProperty('--sign', S.color)
    document.documentElement.style.setProperty('--sign-light', S.light)
    document.documentElement.style.setProperty('--sign-dark', S.dark)
  }
}
function buildChips() {
  const row = $('#signs')
  const all = document.createElement('button')
  all.className = 'chip all'; all.dataset.sign = 'all'; all.textContent = 'ALL'
  all.title = 'Every sign in turn'
  row.appendChild(all)
  for (const s of SIGNS) {
    const b = document.createElement('button')
    b.className = 'chip'; b.dataset.sign = s.id
    b.style.setProperty('--c', s.color)
    b.textContent = s.glyph + '︎'
    b.title = `Only ${s.name}`
    b.setAttribute('aria-label', `Only ${s.name}`)
    row.appendChild(b)
  }
  row.addEventListener('click', (e) => {
    const b = e.target.closest('.chip')
    if (!b) return
    state.lock = b.dataset.sign === 'all' ? null : b.dataset.sign
    store.set('lock', state.lock)
    if (state.started) { speechSynthesis?.cancel(); nextReel() } else paintChips()
  })
}
function setToggle(id, on) { const b = $(id); b.setAttribute('aria-pressed', String(on)) }

function start() {
  if (state.started) return
  state.started = true
  $('#gate').hidden = true
  music.start()
  nextReel()
  idle()
}

$('#play').addEventListener('click', start)
$('#t-voice').addEventListener('click', () => {
  state.voice = !state.voice; store.set('voice', state.voice); setToggle('#t-voice', state.voice)
  if (!state.voice) speechSynthesis?.cancel()
})
$('#t-music').addEventListener('click', () => { state.music = !state.music; store.set('music', state.music); setToggle('#t-music', state.music); music.on(state.music) })
$('#t-pause').addEventListener('click', () => {
  if (!state.started) return start()
  state.paused = !state.paused
  if (state.paused) { pausedAt = performance.now() / 1000 - base; speechSynthesis?.pause() }
  else { base = performance.now() / 1000 - pausedAt; speechSynthesis?.resume() }
  music.suspend(state.paused)
  $('#t-pause').textContent = state.paused ? 'PLAY' : 'PAUSE'
  setToggle('#t-pause', state.paused)
})
$('#t-skip').addEventListener('click', () => { if (!state.started) return start(); speechSynthesis?.cancel(); nextReel() })
$('#t-full').addEventListener('click', () => {
  const el = $('#stage')
  try { document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.().catch(() => {}) } catch { /* not allowed here */ }
})
$('#voice-pick').addEventListener('change', (e) => { state.voiceName = e.target.value; store.set('voiceName', state.voiceName) })

// controls fade away after a few quiet seconds, so the stage records clean
let idleT
function idle() {
  document.body.classList.remove('quiet')
  clearTimeout(idleT)
  if (state.started) idleT = setTimeout(() => document.body.classList.add('quiet'), 3500)
}
for (const ev of ['pointermove', 'pointerdown', 'keydown']) window.addEventListener(ev, idle)
window.addEventListener('keydown', (e) => {
  if (e.key === ' ') { e.preventDefault(); $('#t-pause').click() }
  if (e.key === 'ArrowRight') $('#t-skip').click()
})

buildChips()
setToggle('#t-voice', state.voice); setToggle('#t-music', state.music)
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices } else $('#voice-pick').hidden = true

// before the first tap: a still of the next sign, so the page is never empty
reel = compose(state.lock || SIGNS[state.n % 12].id, seeds[state.lock || SIGNS[state.n % 12].id] ?? 0)
{
  const pages = pagesOf(reel)
  let t = 0.9
  TL = { beats: [], lines: [], duration: Infinity }
  pages.forEach((p, i) => {
    const ws = lineWords(p.text).map((w) => { const s = t; t += (w.w.length + 1) / 13; return { ...w, s, e: t - 0.05 } })
    TL.beats.push({ kind: p.kind, start: i ? t - 999 : 0, at: i ? t - 998 : 0.9, end: Infinity })
    TL.lines.push({ beat: i, words: ws })
  })
  // hold on the first wisdom page, fully typed
  TL.beats.forEach((b, i) => { b.start = i === 1 ? 0 : i === 0 ? -10 : 1e9; b.at = i === 1 ? 0 : i === 0 ? -9 : 1e9 })
  TL.lines[1].words.forEach((w) => { w.s -= 1e3; w.e -= 1e3 })
  eng.load(reel, TL)
  base = performance.now() / 1000 - 3
  state.paused = true; pausedAt = 3
  paintChips()
}
$('#play').addEventListener('click', () => { state.paused = false; base = performance.now() / 1000 }, { capture: true })
requestAnimationFrame(tick)
